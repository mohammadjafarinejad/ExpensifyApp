#!/usr/bin/env ts-node
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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * React Compiler Compliance Checker
 *
 * This script tracks which components can be compiled by React Compiler and which cannot.
 * It provides both CI and local development tools to enforce Rules of React compliance.
 */
var child_process_1 = require("child_process");
var fs_1 = require("fs");
var path_1 = require("path");
var CLI_1 = require("./utils/CLI");
var Git_1 = require("./utils/Git");
var Logger_1 = require("./utils/Logger");
var TAB = '    ';
var DEFAULT_REPORT_FILENAME = 'react-compiler-report.json';
var SUPPRESSED_COMPILER_ERRORS = [
    // This error is caused by an internal limitation of React Compiler
    // https://github.com/facebook/react/issues/29583
    '(BuildHIR::lowerExpression) Expected Identifier, got MemberExpression key in ObjectExpression',
];
var ESLINT_DISABLE_PATTERNS = {
    FILE_KEYWORDS: ['// eslint-disable ', '/* eslint-disable '],
    LINE_KEYWORDS: ['// eslint-disable-next-line ', '/* eslint-disable-next-line '],
    LINT_RULES: ['react-compiler/react-compiler', 'react-hooks'],
};
var VERBOSE_OUTPUT_LINE_REGEXES = {
    SUCCESS: /Successfully compiled (?:hook|component) \[([^\]]+)\]\(([^)]+)\)/,
    FAILURE_WITH_REASON: /Failed to compile ([^:]+):(\d+):(\d+)\. Reason: (.+)/,
    FAILURE_WITHOUT_REASON: /Failed to compile ([^:]+):(\d+):(\d+)\./,
    REASON: /Reason: (.+)/,
};
function check(_a) {
    return __awaiter(this, arguments, void 0, function (_b) {
        var src, results, mainBaseCommitHash, diffFilteringCommits, isPassed;
        var files = _b.files, _c = _b.shouldGenerateReport, shouldGenerateReport = _c === void 0 ? false : _c, _d = _b.reportFileName, reportFileName = _d === void 0 ? DEFAULT_REPORT_FILENAME : _d, _e = _b.shouldFilterByDiff, shouldFilterByDiff = _e === void 0 ? false : _e, remote = _b.remote, _f = _b.shouldPrintSuccesses, shouldPrintSuccesses = _f === void 0 ? false : _f, _g = _b.shouldPrintSuppressedErrors, shouldPrintSuppressedErrors = _g === void 0 ? false : _g;
        return __generator(this, function (_h) {
            switch (_h.label) {
                case 0:
                    if (files) {
                        (0, Logger_1.info)("Running React Compiler check for ".concat(files.length, " files or glob patterns..."));
                    }
                    else {
                        (0, Logger_1.info)('Running React Compiler check for all files...');
                    }
                    src = createFilesGlob(files);
                    results = runCompilerHealthcheck(src);
                    if (!shouldFilterByDiff) return [3 /*break*/, 3];
                    return [4 /*yield*/, Git_1.default.getMainBranchCommitHash(remote)];
                case 1:
                    mainBaseCommitHash = _h.sent();
                    diffFilteringCommits = { fromRef: mainBaseCommitHash };
                    return [4 /*yield*/, filterResultsByDiff(results, diffFilteringCommits, { shouldPrintSuccesses: shouldPrintSuccesses, shouldPrintSuppressedErrors: shouldPrintSuppressedErrors })];
                case 2:
                    results = _h.sent();
                    _h.label = 3;
                case 3:
                    printResults(results, { shouldPrintSuccesses: shouldPrintSuccesses, shouldPrintSuppressedErrors: shouldPrintSuppressedErrors });
                    if (shouldGenerateReport) {
                        generateReport(results, reportFileName);
                    }
                    isPassed = results.failures.size === 0;
                    return [2 /*return*/, isPassed];
            }
        });
    });
}
function checkChangedFiles(_a) {
    return __awaiter(this, void 0, void 0, function () {
        var mainBaseCommitHash, changedFiles;
        var remote = _a.remote, restOptions = __rest(_a, ["remote"]);
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    (0, Logger_1.info)('Checking changed files for React Compiler compliance...');
                    return [4 /*yield*/, Git_1.default.getMainBranchCommitHash(remote)];
                case 1:
                    mainBaseCommitHash = _b.sent();
                    return [4 /*yield*/, Git_1.default.getChangedFileNames(mainBaseCommitHash)];
                case 2:
                    changedFiles = _b.sent();
                    if (changedFiles.length === 0) {
                        (0, Logger_1.success)('No React files changed, skipping check.');
                        return [2 /*return*/, true];
                    }
                    return [2 /*return*/, check(__assign({ files: changedFiles }, restOptions))];
            }
        });
    });
}
function runCompilerHealthcheck(src) {
    var srcString = src;
    if (srcString) {
        srcString = (srcString === null || srcString === void 0 ? void 0 : srcString.startsWith('"')) ? srcString : "\"".concat(srcString);
        srcString = (srcString === null || srcString === void 0 ? void 0 : srcString.endsWith('"')) ? srcString : "".concat(srcString, "\"");
    }
    var command = "npx react-compiler-healthcheck ".concat(src ? "--src ".concat(srcString) : '', " --verbose");
    var output = (0, child_process_1.execSync)(command, {
        encoding: 'utf8',
        cwd: process.cwd(),
    });
    return parseHealthcheckOutput(output);
}
// eslint-disable-next-line rulesdir/no-negated-variables
function addFailureIfDoesNotExist(failureMap, newFailure) {
    var key = getUniqueFileKey(newFailure);
    var existingFailure = failureMap.get(key);
    if (existingFailure) {
        var isReasonSet = !!existingFailure.reason;
        var isNewReasonSet = !!newFailure.reason;
        if (!isReasonSet && isNewReasonSet) {
            failureMap.set(key, newFailure);
            return true;
        }
        return false;
    }
    failureMap.set(key, newFailure);
    return true;
}
function parseHealthcheckOutput(output) {
    var lines = output.split('\n');
    var results = {
        success: new Set(),
        failures: new Map(),
        suppressedFailures: new Map(),
    };
    var currentFailureWithoutReason = null;
    // Parse verbose output
    for (var _i = 0, lines_1 = lines; _i < lines_1.length; _i++) {
        var line = lines_1[_i];
        // Parse successful file paths
        var successMatch = line.match(VERBOSE_OUTPUT_LINE_REGEXES.SUCCESS);
        if (successMatch) {
            var filePath = successMatch[2];
            results.success.add(filePath);
            continue;
        }
        // Parse failed file paths with file, location, and reason all on one line
        var failureWithReasonMatch = line.match(VERBOSE_OUTPUT_LINE_REGEXES.FAILURE_WITH_REASON);
        if (failureWithReasonMatch) {
            var newFailure = {
                file: failureWithReasonMatch[1],
                line: parseInt(failureWithReasonMatch[2], 10),
                column: parseInt(failureWithReasonMatch[3], 10),
                reason: failureWithReasonMatch[4],
            };
            // If we already have a reason, we don't want to set the reason again
            currentFailureWithoutReason = null;
            if (shouldSuppressCompilerError(newFailure.reason)) {
                addFailureIfDoesNotExist(results.suppressedFailures, newFailure);
                continue;
            }
            // Only add if failure does not exist already, or if existing one has no reason
            addFailureIfDoesNotExist(results.failures, newFailure);
        }
        // Parse failed compilation with file and location only (fallback)
        var failureWithoutReasonMatch = line.match(VERBOSE_OUTPUT_LINE_REGEXES.FAILURE_WITHOUT_REASON);
        if (failureWithoutReasonMatch) {
            var newFailure = {
                file: failureWithoutReasonMatch[1],
                line: parseInt(failureWithoutReasonMatch[2], 10),
                column: parseInt(failureWithoutReasonMatch[3], 10),
            };
            currentFailureWithoutReason = newFailure;
            // Only create new failure if it doesn't exist
            addFailureIfDoesNotExist(results.failures, newFailure);
            continue;
        }
        // Parse reason line (fallback for multi-line reasons)
        var reasonMatch = line.match(VERBOSE_OUTPUT_LINE_REGEXES.REASON);
        if (reasonMatch && currentFailureWithoutReason) {
            var reason = reasonMatch[1];
            var currentFailure = {
                file: currentFailureWithoutReason.file,
                line: currentFailureWithoutReason.line,
                column: currentFailureWithoutReason.column,
                reason: reason,
            };
            currentFailureWithoutReason = null;
            if (shouldSuppressCompilerError(reason)) {
                addFailureIfDoesNotExist(results.suppressedFailures, currentFailure);
                continue;
            }
            addFailureIfDoesNotExist(results.failures, currentFailure);
        }
    }
    return results;
}
function shouldSuppressCompilerError(reason) {
    if (!reason) {
        return false;
    }
    // Check if the error reason matches any of the suppressed error patterns
    return SUPPRESSED_COMPILER_ERRORS.some(function (suppressedError) { return reason.includes(suppressedError); });
}
function getUniqueFileKey(_a) {
    var file = _a.file, line = _a.line, column = _a.column;
    var isLineSet = line !== undefined;
    var isLineAndColumnSet = isLineSet && column !== undefined;
    return file + (isLineSet ? ":".concat(line) : '') + (isLineAndColumnSet ? ":".concat(column) : '');
}
function createFilesGlob(files) {
    if (!files || files.length === 0) {
        return undefined;
    }
    if (files.length === 1) {
        return files.at(0);
    }
    return "**/+(".concat(files.join('|'), ")");
}
/**
 * Filters compiler results to only include failures for lines that were changed in the git diff.
 * This helps focus on new issues introduced by the current changes rather than pre-existing issues.
 *
 * Additionally includes failures when:
 * - Any chunk in a file contains eslint-disable react-compiler/react-compiler comment
 * - A line contains eslint-disable-next-line react-compiler/react-compiler comment (includes the next line)
 *
 * @param results - The compiler results to filter
 * @param diffFilteringCommits - The commit range to diff (from and to)
 * @returns Filtered compiler results containing only failures in changed lines or eslint-disabled areas
 */
function filterResultsByDiff(results_1, diffFilteringCommits_1, _a) {
    return __awaiter(this, arguments, void 0, function (results, diffFilteringCommits, _b) {
        // Filter failures to only include those on changed lines and files/chunks for which an eslint-disable comment is was removed
        function filterFailuresByChangedLines(failures) {
            // Filter failures to only include those on changed lines
            var filteredFailures = new Map();
            failures.forEach(function (failure, key) {
                var _a;
                var changedLines = changedLinesMap.get(failure.file);
                // If the file is not in the diff, skip this failure
                if (!changedLines) {
                    return;
                }
                // If the file has eslint-disable comment, include ALL failures for this file
                if (filesWithEslintDisable.has(failure.file)) {
                    filteredFailures.set(key, failure);
                    return;
                }
                // If the failure has a line number, check if it's in the changed lines or eslint-disable-next-line
                if (failure.line !== undefined) {
                    var isLineChanged = changedLines.has(failure.line);
                    var isLineEslintDisabled = (_a = linesWithEslintDisableNextLine.get(failure.file)) === null || _a === void 0 ? void 0 : _a.has(failure.line);
                    if (isLineChanged || isLineEslintDisabled) {
                        filteredFailures.set(key, failure);
                    }
                    return;
                }
                // If there's no line number, include the failure if the file has changes
                filteredFailures.set(key, failure);
            });
            return filteredFailures;
        }
        var diffResult, changedLinesMap, filesWithEslintDisable, linesWithEslintDisableNextLine, _i, _c, file, changedLines, _d, _e, hunk, _loop_1, _f, _g, line, filteredFailures, filteredSuppressedFailures, changedFiles, filteredSuccesses;
        var _h;
        var shouldPrintSuccesses = _b.shouldPrintSuccesses, shouldPrintSuppressedErrors = _b.shouldPrintSuppressedErrors;
        return __generator(this, function (_j) {
            (0, Logger_1.info)("Filtering results by diff between ".concat(diffFilteringCommits.fromRef, " and ").concat((_h = diffFilteringCommits.toRef) !== null && _h !== void 0 ? _h : 'the working tree', "..."));
            diffResult = Git_1.default.diff(diffFilteringCommits.fromRef, diffFilteringCommits.toRef);
            // If there are no changes, return empty results
            if (!diffResult.hasChanges) {
                return [2 /*return*/, {
                        success: new Set(),
                        failures: new Map(),
                        suppressedFailures: new Map(),
                    }];
            }
            changedLinesMap = new Map();
            filesWithEslintDisable = new Set();
            linesWithEslintDisableNextLine = new Map();
            for (_i = 0, _c = diffResult.files; _i < _c.length; _i++) {
                file = _c[_i];
                changedLines = new Set(__spreadArray(__spreadArray([], file.addedLines, true), file.modifiedLines, true));
                changedLinesMap.set(file.filePath, changedLines);
                for (_d = 0, _e = file.hunks; _d < _e.length; _d++) {
                    hunk = _e[_d];
                    _loop_1 = function (line) {
                        function doesLineIncludeEslintDisableComment(isFileLevel) {
                            var trimmedContent = line.content.trim();
                            var includesKeyword = false;
                            if (isFileLevel) {
                                includesKeyword = ESLINT_DISABLE_PATTERNS.FILE_KEYWORDS.some(function (keyword) { return trimmedContent.startsWith(keyword); });
                            }
                            else {
                                includesKeyword = ESLINT_DISABLE_PATTERNS.LINE_KEYWORDS.some(function (keyword) { return trimmedContent.startsWith(keyword); });
                            }
                            return includesKeyword && ESLINT_DISABLE_PATTERNS.LINT_RULES.some(function (rule) { return trimmedContent.includes(rule); });
                        }
                        // Check for file-level eslint-disable comment
                        if (doesLineIncludeEslintDisableComment(true)) {
                            filesWithEslintDisable.add(file.filePath);
                        }
                        // Check for line-level eslint-disable-next-line comment
                        if (doesLineIncludeEslintDisableComment(false)) {
                            if (!linesWithEslintDisableNextLine.has(file.filePath)) {
                                linesWithEslintDisableNextLine.set(file.filePath, new Set());
                            }
                            // Include the next line (current line + 1)
                            var disabledLines = linesWithEslintDisableNextLine.get(file.filePath);
                            if (!disabledLines) {
                                return "continue";
                            }
                            // When the eslint-disable-next-line comment is removed, the react compiler error line number is the line number of the next line
                            var reactCompilerErrorLineNumber = line.type === 'removed' ? line.number + hunk.newCount : line.number + hunk.newCount + 1;
                            disabledLines.add(reactCompilerErrorLineNumber);
                        }
                    };
                    for (_f = 0, _g = hunk.lines; _f < _g.length; _f++) {
                        line = _g[_f];
                        _loop_1(line);
                    }
                }
            }
            filteredFailures = filterFailuresByChangedLines(results.failures);
            filteredSuppressedFailures = filterFailuresByChangedLines(results.suppressedFailures);
            changedFiles = new Set(diffResult.files.map(function (file) { return file.filePath; }));
            filteredSuccesses = new Set();
            results.success.forEach(function (file) {
                if (!changedFiles.has(file)) {
                    return;
                }
                filteredSuccesses.add(file);
            });
            if (shouldPrintSuccesses) {
                if (filteredSuccesses.size === 0) {
                    (0, Logger_1.info)('No successes remain after filtering by diff.');
                }
                else {
                    (0, Logger_1.info)("".concat(filteredSuccesses.size, " out of ").concat(results.success.size, " successes remain after filtering by diff."));
                }
            }
            if (shouldPrintSuppressedErrors) {
                if (filteredSuppressedFailures.size === 0) {
                    (0, Logger_1.info)('No suppressed errors remain after filtering by diff.');
                }
                else {
                    (0, Logger_1.info)("".concat(filteredSuppressedFailures.size, " out of ").concat(results.suppressedFailures.size, " successes remain after filtering by diff."));
                }
            }
            if (filteredFailures.size === 0) {
                (0, Logger_1.info)('No failures remain after filtering by diff.');
            }
            else {
                (0, Logger_1.info)("".concat(filteredFailures.size, " out of ").concat(results.failures.size, " failures remain after filtering by diff."));
            }
            return [2 /*return*/, {
                    success: filteredSuccesses,
                    failures: filteredFailures,
                    suppressedFailures: filteredSuppressedFailures,
                }];
        });
    });
}
function printResults(_a, _b) {
    var success = _a.success, failures = _a.failures, suppressedFailures = _a.suppressedFailures;
    var shouldPrintSuccesses = _b.shouldPrintSuccesses, shouldPrintSuppressedErrors = _b.shouldPrintSuppressedErrors;
    if (shouldPrintSuccesses && success.size > 0) {
        (0, Logger_1.log)();
        (0, Logger_1.success)("Successfully compiled ".concat(success.size, " files with React Compiler:"));
        (0, Logger_1.log)();
        success.forEach(function (successFile) {
            (0, Logger_1.success)("".concat(successFile));
        });
        (0, Logger_1.log)();
    }
    if (shouldPrintSuppressedErrors && suppressedFailures.size > 0) {
        // Create a Map of suppressed error type -> Failure[] with distinct errors and a list of failures with that error
        var suppressedErrorMap_1 = new Map();
        suppressedFailures.forEach(function (failure) {
            var _a;
            if (!failure.reason) {
                return;
            }
            if (!suppressedErrorMap_1.has(failure.reason)) {
                suppressedErrorMap_1.set(failure.reason, []);
            }
            (_a = suppressedErrorMap_1.get(failure.reason)) === null || _a === void 0 ? void 0 : _a.push(failure);
        });
        (0, Logger_1.log)();
        (0, Logger_1.warn)("Suppressed the following errors in these files:");
        (0, Logger_1.log)();
        for (var _i = 0, _c = suppressedErrorMap_1.entries(); _i < _c.length; _i++) {
            var _d = _c[_i], error = _d[0], suppressedErrorFiles = _d[1];
            (0, Logger_1.bold)(error);
            var filesLine = suppressedErrorFiles.map(function (failure) { return getUniqueFileKey(failure); }).join(', ');
            (0, Logger_1.note)("".concat(TAB, " - ").concat(filesLine));
        }
        (0, Logger_1.log)();
    }
    var isPassed = failures.size === 0;
    if (isPassed) {
        (0, Logger_1.success)('All files pass React Compiler compliance check!');
        return;
    }
    var distinctFileNames = new Set();
    failures.forEach(function (failure) {
        distinctFileNames.add(failure.file);
    });
    (0, Logger_1.log)();
    (0, Logger_1.error)("Failed to compile ".concat(distinctFileNames.size, " files with React Compiler:"));
    (0, Logger_1.log)();
    failures.forEach(function (failure) {
        var _a;
        var location = failure.line && failure.column ? ":".concat(failure.line, ":").concat(failure.column) : '';
        (0, Logger_1.bold)("".concat(failure.file).concat(location));
        (0, Logger_1.note)("".concat(TAB).concat((_a = failure.reason) !== null && _a !== void 0 ? _a : 'No reason provided'));
    });
    (0, Logger_1.log)();
    (0, Logger_1.error)('The files above failed to compile with React Compiler, probably because of Rules of React violations. Please fix the issues and run the check again.');
}
function generateReport(results, outputFileName) {
    if (outputFileName === void 0) { outputFileName = DEFAULT_REPORT_FILENAME; }
    (0, Logger_1.log)('\n');
    (0, Logger_1.info)('Creating React Compiler Compliance Check report:');
    // Save detailed report
    var reportFile = (0, path_1.join)(process.cwd(), outputFileName);
    (0, fs_1.writeFileSync)(reportFile, JSON.stringify({
        timestamp: new Date().toISOString(),
        summary: {
            total: results.success.size + results.failures.size,
            success: results.success.size,
            failure: results.failures.size,
        },
        success: results.success,
        failures: results.failures,
    }, null, 2));
    (0, Logger_1.success)("Detailed report saved to: ".concat(reportFile));
}
var Checker = {
    check: check,
    checkChangedFiles: checkChangedFiles,
};
var CLI_COMMANDS = ['check', 'check-changed'];
// CLI interface
function main() {
    return __awaiter(this, void 0, void 0, function () {
        function runCommand() {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (command) {
                        case 'check':
                            return [2 /*return*/, Checker.check(__assign({ files: file ? [file] : undefined }, commonOptions))];
                        case 'check-changed':
                            return [2 /*return*/, Checker.checkChangedFiles(__assign({ remote: remote }, commonOptions))];
                        default:
                            (0, Logger_1.error)("Unknown command: ".concat(String(command)));
                            return [2 /*return*/, Promise.resolve(false)];
                    }
                    return [2 /*return*/];
                });
            });
        }
        var cli, _a, command, file, _b, remote, reportFileName, _c, shouldGenerateReport, shouldFilterByDiff, shouldPrintSuccesses, shouldPrintSuppressedErrors, commonOptions, isPassed, error_1;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    cli = new CLI_1.default({
                        positionalArgs: [
                            {
                                name: 'command',
                                description: 'Command to run',
                                required: false,
                                default: 'check',
                                parse: function (val) {
                                    if (!CLI_COMMANDS.includes(val)) {
                                        throw new Error("Invalid command. Must be one of: ".concat(CLI_COMMANDS.join(', ')));
                                    }
                                    return val;
                                },
                            },
                            {
                                name: 'file',
                                description: 'File path or glob pattern to check',
                                required: false,
                                default: '',
                            },
                        ],
                        namedArgs: {
                            remote: {
                                description: 'Git remote name to use for main branch (default: no remote locally and origin in CI)',
                                required: false,
                                supersedes: ['check-changed'],
                            },
                            reportFileName: {
                                description: 'File name to save the report to',
                                required: false,
                                default: DEFAULT_REPORT_FILENAME,
                            },
                        },
                        flags: {
                            filterByDiff: {
                                description: 'Filter the files to check by the diff between the current commit/PR and the main branch',
                                required: false,
                                default: false,
                            },
                            report: {
                                description: 'Generate a report of the results',
                                required: false,
                                default: false,
                            },
                            printSuccesses: {
                                description: 'Print the successes',
                                required: false,
                                default: false,
                            },
                            printSuppressedErrors: {
                                description: 'Print suppressed errors',
                                required: false,
                                default: false,
                            },
                        },
                    });
                    _a = cli.positionalArgs, command = _a.command, file = _a.file;
                    _b = cli.namedArgs, remote = _b.remote, reportFileName = _b.reportFileName;
                    _c = cli.flags, shouldGenerateReport = _c.report, shouldFilterByDiff = _c.filterByDiff, shouldPrintSuccesses = _c.printSuccesses, shouldPrintSuppressedErrors = _c.printSuppressedErrors;
                    commonOptions = { shouldGenerateReport: shouldGenerateReport, reportFileName: reportFileName, shouldFilterByDiff: shouldFilterByDiff, shouldPrintSuccesses: shouldPrintSuccesses, shouldPrintSuppressedErrors: shouldPrintSuppressedErrors };
                    _d.label = 1;
                case 1:
                    _d.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, runCommand()];
                case 2:
                    isPassed = _d.sent();
                    process.exit(isPassed ? 0 : 1);
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _d.sent();
                    (0, Logger_1.error)('Error running react-compiler-compliance-check:', error_1);
                    process.exit(1);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
if (require.main === module) {
    main();
}
exports.default = Checker;
