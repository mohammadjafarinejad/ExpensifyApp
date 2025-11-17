"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var github_1 = require("@actions/github");
var child_process_1 = require("child_process");
var util_1 = require("util");
var CONST_1 = require("@github/libs/CONST");
var GithubUtils_1 = require("@github/libs/GithubUtils");
var Logger_1 = require("./Logger");
function exec(command, options) {
    var optionsWithEncoding = __assign({ encoding: 'utf8', cwd: process.cwd() }, options);
    return (0, util_1.promisify)(child_process_1.exec)(command, optionsWithEncoding);
}
function execSync(command, options) {
    var optionsWithEncoding = __assign(__assign({}, options), { encoding: 'utf8', cwd: process.cwd() });
    return (0, child_process_1.execSync)(command, optionsWithEncoding);
}
var IS_CI = process.env.CI === 'true';
var GITHUB_BASE_REF = process.env.GITHUB_BASE_REF;
/**
 * Utility class for git operations.
 */
var Git = /** @class */ (function () {
    function Git() {
    }
    /**
     * Check if a git reference is valid.
     *
     * @param ref - The git reference to validate (branch, tag, commit hash, etc.)
     * @returns true if the reference exists, false otherwise
     */
    Git.isValidRef = function (ref) {
        try {
            execSync("git rev-parse --verify \"".concat(ref, "^{object}\""), {
                stdio: 'pipe', // Suppress output
            });
            return true;
        }
        catch (error) {
            return false;
        }
    };
    /**
     * Execute a git diff between two refs and return structured diff information.
     *
     * @param fromRef - The starting reference (commit, branch, tag, etc.)
     * @param toRef - The ending reference (defaults to working directory if not provided)
     * @param filePaths - Optional specific file path(s) to diff (relative to git repo root)
     * @returns Structured diff result with line numbers and change information
     * @throws Error when git command fails (invalid refs, not a git repo, file not found, etc.)
     */
    Git.diff = function (fromRef, toRef, filePaths) {
        // Build git diff command (with 0 context lines for easier parsing)
        var command = "git diff -U0 ".concat(fromRef);
        if (toRef) {
            command += " ".concat(toRef);
        }
        if (filePaths) {
            var pathsArray = Array.isArray(filePaths) ? filePaths : [filePaths];
            var quotedPaths = pathsArray.map(function (path) { return "\"".concat(path, "\""); }).join(' ');
            command += " -- ".concat(quotedPaths);
        }
        // Execute git diff with unified format - let errors bubble up
        var diffOutput = execSync(command);
        return Git.parseDiff(diffOutput);
    };
    /**
     * Parse git diff output into structured format.
     *
     * @param diffOutput - Raw git diff output string
     * @returns Structured diff result with line numbers and change information
     */
    Git.parseDiff = function (diffOutput) {
        // Parse the diff output inline
        if (!diffOutput.trim()) {
            return {
                files: [],
                hasChanges: false,
            };
        }
        var lines = diffOutput.split('\n');
        var files = [];
        var currentFile = null;
        var currentHunk = null;
        for (var _i = 0, lines_1 = lines; _i < lines_1.length; _i++) {
            var line = lines_1[_i];
            // File header: diff --git a/file b/file
            if (line.startsWith('diff --git')) {
                if (currentFile) {
                    // Push the current hunk to the current file before processing the new file
                    if (currentHunk) {
                        currentFile.hunks.push(currentHunk);
                    }
                    files.push(currentFile);
                }
                currentFile = null;
                currentHunk = null;
                continue;
            }
            // File path: +++ b/file
            if (line.startsWith('+++ b/')) {
                var diffFilePath = line.slice(6); // Remove '+++ b/'
                currentFile = {
                    filePath: diffFilePath,
                    hunks: [],
                    addedLines: new Set(),
                    removedLines: new Set(),
                    modifiedLines: new Set(),
                };
                continue;
            }
            // Hunk header: @@ -oldStart,oldCount +newStart,newCount @@
            if (line.startsWith('@@')) {
                var hunkMatch = line.match(/^@@ -(\d+)(?:,(\d+))? \+(\d+)(?:,(\d+))? @@/);
                if (hunkMatch && currentFile) {
                    if (currentHunk) {
                        currentFile.hunks.push(currentHunk);
                    }
                    var oldStart = parseInt(hunkMatch[1], 10);
                    var oldCount = hunkMatch[2] ? parseInt(hunkMatch[2], 10) : 1;
                    var newStart = parseInt(hunkMatch[3], 10);
                    var newCount = hunkMatch[4] ? parseInt(hunkMatch[4], 10) : 1;
                    currentHunk = {
                        oldStart: oldStart,
                        oldCount: oldCount,
                        newStart: newStart,
                        newCount: newCount,
                        lines: [],
                    };
                }
                continue;
            }
            // Diff content lines
            if (currentHunk && currentFile && line.length > 0) {
                var firstChar = line[0];
                var content = line.slice(1); // Remove the +/- prefix
                if (firstChar === '+') {
                    // For added lines, use new file line numbers
                    var lineNumber = this.calculateLineNumber(currentHunk, 'added');
                    currentHunk.lines.push({
                        number: lineNumber,
                        type: 'added',
                        content: content,
                    });
                }
                else if (firstChar === '-') {
                    // For removed lines, use old file line numbers
                    var lineNumber = this.calculateLineNumber(currentHunk, 'removed');
                    currentHunk.lines.push({
                        number: lineNumber,
                        type: 'removed',
                        content: content,
                    });
                }
                else if (firstChar === ' ') {
                    // Context line - skip it (we only care about added/removed lines)
                    continue;
                }
                else {
                    throw new Error("Unknown line type! First character of line is ".concat(firstChar));
                }
            }
        }
        // Add the last file and hunk
        if (currentHunk && currentFile) {
            currentFile.hunks.push(currentHunk);
        }
        if (currentFile) {
            files.push(currentFile);
        }
        // Calculate modified, added, and removed lines
        for (var _a = 0, files_1 = files; _a < files_1.length; _a++) {
            var file = files_1[_a];
            for (var _b = 0, _c = file.hunks; _b < _c.length; _b++) {
                var hunk = _c[_b];
                // Collect all removed and added lines from this hunk
                var removedLines = hunk.lines.filter(function (line) { return line.type === 'removed'; });
                var addedLines = hunk.lines.filter(function (line) { return line.type === 'added'; });
                var removedCount = removedLines.length;
                var addedCount = addedLines.length;
                var modifiedCount = Math.min(removedCount, addedCount);
                // Mark modified lines (use added line numbers for the new file)
                for (var j = 0; j < modifiedCount; j++) {
                    var addedLine = addedLines.at(j);
                    if (addedLine) {
                        file.modifiedLines.add(addedLine.number);
                    }
                }
                // Handle net additions
                for (var j = modifiedCount; j < addedCount; j++) {
                    var addedLine = addedLines.at(j);
                    if (addedLine) {
                        file.addedLines.add(addedLine.number);
                    }
                }
                // Handle net removals
                for (var j = modifiedCount; j < removedCount; j++) {
                    var removedLine = removedLines.at(j);
                    if (removedLine) {
                        file.removedLines.add(removedLine.number);
                    }
                }
            }
        }
        return {
            files: files,
            hasChanges: files.length > 0,
        };
    };
    /**
     * Calculate the line number for a diff line based on the hunk and line type.
     */
    Git.calculateLineNumber = function (hunk, lineType) {
        var addedCount = hunk.lines.filter(function (l) { return l.type === 'added'; }).length;
        var removedCount = hunk.lines.filter(function (l) { return l.type === 'removed'; }).length;
        switch (lineType) {
            case 'added':
                return hunk.newStart + addedCount;
            case 'removed':
                return hunk.oldStart + removedCount;
            default:
                throw new Error("Unknown line type: ".concat(String(lineType)));
        }
    };
    /**
     * Get the content of a file at a specific git reference.
     */
    Git.show = function (ref, filePath) {
        try {
            return execSync("git show ".concat(ref, ":").concat(filePath));
        }
        catch (error) {
            throw new Error("Failed to get file content from git: ".concat(error instanceof Error ? error.message : String(error)));
        }
    };
    /**
     * Ensure a git reference is available locally, fetching it if necessary.
     *
     * @param ref - The git reference to ensure is available (commit hash, branch, tag, etc.)
     * @param remote - The remote to fetch from (defaults to 'origin')
     * @throws Error when the reference cannot be fetched or is invalid
     */
    Git.ensureRef = function (ref_1) {
        return __awaiter(this, arguments, void 0, function (ref, remote) {
            var error_1;
            if (remote === void 0) { remote = 'origin'; }
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.isValidRef(ref)) {
                            return [2 /*return*/]; // Reference is already available locally
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        (0, Logger_1.log)("\uD83D\uDD04 Fetching missing ref: ".concat(ref));
                        return [4 /*yield*/, exec("git fetch ".concat(remote, " ").concat(ref, " --no-tags --depth=1 --quiet"))];
                    case 2:
                        _a.sent();
                        // Verify the ref is now available
                        if (!this.isValidRef(ref)) {
                            throw new Error("Reference ".concat(ref, " is still not valid after fetching from remote ").concat(remote));
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _a.sent();
                        throw new Error("Failed to fetch git reference ".concat(ref, ": ").concat(error_1 instanceof Error ? error_1.message : String(error_1)));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    Git.getMainBranchCommitHash = function (remote) {
        return __awaiter(this, void 0, void 0, function () {
            var baseRefName, mainBaseRef_1, revParseOutput, mergeBaseHash_1, error_2, mainBaseRef, mergeBaseHash, mergeBaseOutput, _a, revParseOutput, fallbackError_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        baseRefName = GITHUB_BASE_REF !== null && GITHUB_BASE_REF !== void 0 ? GITHUB_BASE_REF : 'main';
                        if (!(IS_CI || remote)) return [3 /*break*/, 2];
                        return [4 /*yield*/, exec("git fetch ".concat(remote !== null && remote !== void 0 ? remote : 'origin', " ").concat(baseRefName, " --no-tags --depth=1"))];
                    case 1:
                        _b.sent();
                        _b.label = 2;
                    case 2:
                        if (!IS_CI) return [3 /*break*/, 6];
                        mainBaseRef_1 = remote ? "".concat(remote, "/").concat(baseRefName) : "origin/".concat(baseRefName);
                        _b.label = 3;
                    case 3:
                        _b.trys.push([3, 5, , 6]);
                        return [4 /*yield*/, exec("git rev-parse ".concat(mainBaseRef_1))];
                    case 4:
                        revParseOutput = (_b.sent()).stdout;
                        mergeBaseHash_1 = revParseOutput.trim();
                        // Validate the output is a proper SHA hash
                        if (!mergeBaseHash_1 || !/^[a-fA-F0-9]{40}$/.test(mergeBaseHash_1)) {
                            throw new Error("git rev-parse returned unexpected output: ".concat(mergeBaseHash_1));
                        }
                        return [2 /*return*/, mergeBaseHash_1];
                    case 5:
                        error_2 = _b.sent();
                        (0, Logger_1.error)("Failed to get commit hash for ".concat(mainBaseRef_1, ":"), error_2);
                        throw new Error("Could not get commit hash for ".concat(mainBaseRef_1));
                    case 6:
                        mainBaseRef = remote ? "".concat(remote, "/").concat(baseRefName) : baseRefName;
                        _b.label = 7;
                    case 7:
                        _b.trys.push([7, 9, , 14]);
                        return [4 /*yield*/, exec("git merge-base ".concat(mainBaseRef, " HEAD"))];
                    case 8:
                        mergeBaseOutput = (_b.sent()).stdout;
                        mergeBaseHash = mergeBaseOutput.trim();
                        return [3 /*break*/, 14];
                    case 9:
                        _a = _b.sent();
                        (0, Logger_1.warn)("Warning: Could not find merge base between ".concat(mainBaseRef, " and HEAD."));
                        _b.label = 10;
                    case 10:
                        _b.trys.push([10, 12, , 13]);
                        return [4 /*yield*/, exec("git rev-parse ".concat(mainBaseRef))];
                    case 11:
                        revParseOutput = (_b.sent()).stdout;
                        mergeBaseHash = revParseOutput.trim();
                        return [3 /*break*/, 13];
                    case 12:
                        fallbackError_1 = _b.sent();
                        (0, Logger_1.error)("Failed to find merge base with ".concat(mainBaseRef, ":"), fallbackError_1);
                        throw new Error("Could not determine merge base with ".concat(mainBaseRef));
                    case 13: return [3 /*break*/, 14];
                    case 14:
                        // Validate the output is a proper SHA hash
                        if (!mergeBaseHash || !/^[a-fA-F0-9]{40}$/.test(mergeBaseHash)) {
                            throw new Error("git merge-base returned unexpected output: ".concat(mergeBaseHash));
                        }
                        return [2 /*return*/, mergeBaseHash];
                }
            });
        });
    };
    /**
     * Check if there are any uncommitted changes (both staged and unstaged).
     *
     * @returns true if there are uncommitted changes, false otherwise
     */
    Git.hasUncommittedChanges = function () {
        return __awaiter(this, void 0, void 0, function () {
            var stdout, status_1, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, exec('git status --porcelain')];
                    case 1:
                        stdout = (_a.sent()).stdout;
                        status_1 = stdout.trim();
                        return [2 /*return*/, status_1.length > 0];
                    case 2:
                        error_3 = _a.sent();
                        return [2 /*return*/, false];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Git.getChangedFileNames = function (fromRef, toRef) {
        return __awaiter(this, void 0, void 0, function () {
            var changedFiles, diffResult, files;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (!IS_CI) return [3 /*break*/, 2];
                        return [4 /*yield*/, GithubUtils_1.default.octokit.pulls.listFiles({
                                owner: CONST_1.default.GITHUB_OWNER,
                                repo: CONST_1.default.APP_REPO,
                                // eslint-disable-next-line @typescript-eslint/naming-convention
                                pull_number: (_b = (_a = github_1.context.payload.pull_request) === null || _a === void 0 ? void 0 : _a.number) !== null && _b !== void 0 ? _b : 0,
                            })];
                    case 1:
                        changedFiles = (_c.sent()).data;
                        return [2 /*return*/, changedFiles.map(function (file) { return file.filename; })];
                    case 2:
                        diffResult = this.diff(fromRef, toRef);
                        files = diffResult.files.map(function (file) { return file.filePath; });
                        return [2 /*return*/, files];
                }
            });
        });
    };
    return Git;
}());
exports.default = Git;
