"use strict";
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
var core = require("@actions/core");
var github_1 = require("@actions/github");
var ActionUtils_1 = require("@github/libs/ActionUtils");
var CONST_1 = require("@github/libs/CONST");
var GithubUtils_1 = require("@github/libs/GithubUtils");
var Git_1 = require("@scripts/utils/Git");
/**
 * Main function to check all specified files
 */
function run() {
    return __awaiter(this, void 0, void 0, function () {
        var filePathsInput, pullRequestNumberInput, prNumber, isOpenedAction, eventPayload, changedFiles, eventPayload, beforeSha, afterSha, localDiff, localChangedFiles, _i, _a, file, prDiff, _b, _c, _loop_1, _d, _e, prFileDiff;
        return __generator(this, function (_f) {
            switch (_f.label) {
                case 0:
                    filePathsInput = (0, ActionUtils_1.getJSONInput)('FILE_PATHS', { required: false });
                    pullRequestNumberInput = (0, ActionUtils_1.getJSONInput)('PULL_REQUEST_NUMBER', { required: false });
                    isOpenedAction = false;
                    if (pullRequestNumberInput) {
                        // PULL_REQUEST_NUMBER provided - treat as opened action regardless of event type
                        prNumber = pullRequestNumberInput;
                        isOpenedAction = true;
                        console.log("\uD83D\uDD22 Using provided PR number ".concat(prNumber, " - treating as opened action"));
                    }
                    else {
                        // No PULL_REQUEST_NUMBER - must be a pull_request event
                        if (github_1.context.eventName !== 'pull_request') {
                            throw new Error("This action can only be run on pull_request events, but was run on: ".concat(github_1.context.eventName, ". Provide PULL_REQUEST_NUMBER input to use with other event types."));
                        }
                        eventPayload = github_1.context.payload;
                        prNumber = eventPayload.pull_request.number;
                        isOpenedAction = eventPayload.action === 'opened';
                        // Validate that it's an opened or synchronize action
                        if (eventPayload.action !== 'opened' && eventPayload.action !== 'synchronize') {
                            throw new Error("This action can only be run on pull_request opened or synchronize events, but was run on: ".concat(eventPayload.action));
                        }
                    }
                    changedFiles = [];
                    if (!isOpenedAction) return [3 /*break*/, 2];
                    console.log('🆕 PR treated as opened, including all files in the PR');
                    return [4 /*yield*/, GithubUtils_1.default.paginate(GithubUtils_1.default.octokit.pulls.listFiles, {
                            owner: CONST_1.default.GITHUB_OWNER,
                            repo: CONST_1.default.APP_REPO,
                            // eslint-disable-next-line @typescript-eslint/naming-convention
                            pull_number: prNumber,
                            // eslint-disable-next-line @typescript-eslint/naming-convention
                            per_page: 100,
                        })];
                case 1:
                    changedFiles = (_f.sent()).map(function (file) { return file.filename; });
                    if (filePathsInput) {
                        changedFiles = changedFiles.filter(function (file) { return filePathsInput.includes(file); });
                    }
                    return [3 /*break*/, 5];
                case 2:
                    console.log('🔄 PR was updated, checking only the new commits');
                    // For synchronize events, we need before/after SHAs from the payload
                    if (github_1.context.eventName !== 'pull_request' || github_1.context.payload.action !== 'synchronize') {
                        throw new Error('Synchronize logic requires pull_request event context');
                    }
                    eventPayload = github_1.context.payload;
                    beforeSha = eventPayload.before;
                    afterSha = eventPayload.after;
                    // Ensure we have valid git refs, fetching them if needed
                    console.log("\uD83D\uDD0D Checking for local changes with push range ".concat(beforeSha, "..").concat(afterSha).concat(filePathsInput ? ", looking for files ".concat(JSON.stringify(filePathsInput)) : ''));
                    return [4 /*yield*/, Promise.all([Git_1.default.ensureRef(beforeSha), Git_1.default.ensureRef(afterSha)])];
                case 3:
                    _f.sent();
                    localDiff = Git_1.default.diff(beforeSha, afterSha, filePathsInput);
                    localChangedFiles = new Map();
                    for (_i = 0, _a = localDiff.files; _i < _a.length; _i++) {
                        file = _a[_i];
                        localChangedFiles.set(file.filePath, file);
                    }
                    console.log("\uD83D\uDCDD Found ".concat(localChangedFiles.size, " files with local changes in push"));
                    // If no files changed locally, we can skip all API calls
                    if (localChangedFiles.size === 0) {
                        console.log("\u23ED\uFE0F No files changed in push - skipping API validation");
                        core.setOutput('CHANGED_FILES', JSON.stringify([]));
                        return [2 /*return*/];
                    }
                    // Now we know there are local changes - get PR diff from the GitHub API to compare
                    console.log("\uD83C\uDF10 Using GitHub API to validate ".concat(localChangedFiles.size, " files with local changes"));
                    _c = (_b = Git_1.default).parseDiff;
                    return [4 /*yield*/, GithubUtils_1.default.getPullRequestDiff(prNumber)];
                case 4:
                    prDiff = _c.apply(_b, [_f.sent()]);
                    _loop_1 = function (prFileDiff) {
                        var filePath = prFileDiff.filePath;
                        var localFileDiff = localChangedFiles.get(filePath);
                        if (!localFileDiff) {
                            return "continue";
                        }
                        // Extract all modified content from both diffs (regardless of add/remove)
                        var localModifiedContent = new Set();
                        var prModifiedContent = new Set();
                        // Get local diff content
                        for (var _g = 0, _h = localFileDiff.hunks; _g < _h.length; _g++) {
                            var hunk = _h[_g];
                            for (var _j = 0, _k = hunk.lines; _j < _k.length; _j++) {
                                var line = _k[_j];
                                localModifiedContent.add(line.content);
                            }
                        }
                        // Get PR diff content
                        for (var _l = 0, _m = prFileDiff.hunks; _l < _m.length; _l++) {
                            var hunk = _m[_l];
                            for (var _o = 0, _p = hunk.lines; _o < _p.length; _o++) {
                                var line = _p[_o];
                                prModifiedContent.add(line.content);
                            }
                        }
                        // Check if any content overlaps between push and PR
                        var hasOverlappingContent = Array.from(localModifiedContent).some(function (content) { return prModifiedContent.has(content); });
                        if (hasOverlappingContent) {
                            console.log("\u2705 ".concat(filePath, " has overlapping content changes in both push and PR"));
                            changedFiles.push(filePath);
                        }
                        else {
                            console.log("\u23ED\uFE0F ".concat(filePath, " has changes in both push and PR but no overlapping content - likely from merged commits"));
                        }
                    };
                    // Compare the local push diff with the PR diff and collect changed files, checking for overlapping content changes at the line level
                    for (_d = 0, _e = prDiff.files; _d < _e.length; _d++) {
                        prFileDiff = _e[_d];
                        _loop_1(prFileDiff);
                    }
                    _f.label = 5;
                case 5:
                    console.log("\uD83D\uDCC8 Total files changed: ".concat(changedFiles.length));
                    core.startGroup('📊 Changed files:');
                    console.log(changedFiles);
                    core.endGroup();
                    // Set output
                    core.setOutput('CHANGED_FILES', JSON.stringify(changedFiles));
                    core.setOutput('HAS_CHANGES', changedFiles.length > 0);
                    return [2 /*return*/];
            }
        });
    });
}
if (require.main === module) {
    run().catch(function (error) {
        console.error('Action failed:', error);
        core.setFailed(error instanceof Error ? error.message : String(error));
    });
}
exports.default = run;
