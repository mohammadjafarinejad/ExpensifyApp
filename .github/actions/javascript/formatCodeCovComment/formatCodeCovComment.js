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
var CONST_1 = require("@github/libs/CONST");
var GithubUtils_1 = require("@github/libs/GithubUtils");
/**
 * Extracts the Coverage Δ table from a CodeCov comment
 */
function extractCoverageDeltaTable(body) {
    var _a;
    // Match the table that contains "Coverage Δ" - handle both markdown tables (with |) and plain text
    // The regex accounts for markdown link syntax like [Files with missing lines](url)
    var tableHeaderRegex = /[|\s]*\[?Files with missing lines\]?(?:\([^)]*\))?[|\s]*Coverage Δ[|\s]*/i;
    var tableMatch = body.match(tableHeaderRegex);
    if (!tableMatch) {
        return null;
    }
    var startIndex = (_a = tableMatch.index) !== null && _a !== void 0 ? _a : 0;
    // Find the table by looking for the header line and extracting everything until we hit the "New features" section or two consecutive newlines
    var remainingText = body.slice(startIndex);
    var lines = remainingText.split('\n');
    var tableLines = [];
    var emptyLineCount = 0;
    var foundTableStart = false;
    for (var _i = 0, lines_1 = lines; _i < lines_1.length; _i++) {
        var line = lines_1[_i];
        var trimmedLine = line.trim();
        // Skip lines until we find the actual table header (line starting with |)
        if (!foundTableStart) {
            if (trimmedLine.startsWith('|') && trimmedLine.includes('Coverage Δ')) {
                foundTableStart = true;
            }
            else {
                continue;
            }
        }
        // Stop at the "New features" section (can be emoji or <details> tag)
        if (trimmedLine.includes('🚀 New features') || trimmedLine.includes(':rocket: New features') || trimmedLine.startsWith('<details>')) {
            break;
        }
        // Track empty lines
        if (trimmedLine === '') {
            emptyLineCount++;
            // Stop if we hit 2 consecutive empty lines
            if (emptyLineCount >= 2) {
                break;
            }
            continue;
        }
        else {
            emptyLineCount = 0;
        }
        tableLines.push(line);
    }
    // Filter out any empty or whitespace-only lines to ensure proper table formatting
    var cleanedLines = tableLines.filter(function (line) { return line.trim() !== ''; });
    var result = cleanedLines.join('\n').trim();
    // Return null if no valid table content was found
    return result.length > 0 ? result : null;
}
/**
 * Checks if the comment contains any downward arrows (decreased coverage)
 */
function hasDecreasedCoverage(body) {
    // Check for both emoji and markdown syntax
    return body.includes('⬇️') || body.includes(':arrow_down:');
}
/**
 * Extracts the header from a CodeCov comment (preserves the markdown link)
 */
function extractCodeCovHeader(body) {
    // Extract the header line (## [Codecov](url) Report)
    var headerMatch = body.match(/^##\s*\[Codecov\]\([^)]*\)\s*Report/m);
    if (headerMatch) {
        return headerMatch[0];
    }
    // Fallback to plain header
    return '## Codecov Report';
}
/**
 * Formats a CodeCov comment for the "all lines covered" case (no table)
 */
function formatAllLinesCoveredComment(originalBody) {
    // Extract the original header
    var header = extractCodeCovHeader(originalBody);
    // Extract everything between the header and the "New features" section
    var lines = originalBody.split('\n');
    var contentLines = [];
    var foundHeader = false;
    for (var _i = 0, lines_2 = lines; _i < lines_2.length; _i++) {
        var line = lines_2[_i];
        var trimmedLine = line.trim();
        // Skip until we find content after the header
        if (!foundHeader) {
            if (trimmedLine.startsWith('##') && trimmedLine.includes('Codecov')) {
                foundHeader = true;
            }
            continue;
        }
        // Stop at "New features" section
        if (trimmedLine.includes(':rocket:') || trimmedLine.includes('🚀') || trimmedLine.startsWith('<details>')) {
            break;
        }
        // Skip empty lines at the start
        if (contentLines.length === 0 && trimmedLine === '') {
            continue;
        }
        contentLines.push(line);
    }
    // Clean up content and build the formatted comment
    var content = contentLines.join('\n').trim();
    return "".concat(header, "\n").concat(content);
}
/**
 * Formats a CodeCov comment according to specifications
 */
function formatCodeCovComment(originalBody) {
    // Extract the original header to preserve the link
    var header = extractCodeCovHeader(originalBody);
    // Check if this is the "all lines covered" case (no table)
    if (originalBody.includes('All modified and coverable lines are covered by tests')) {
        var hasCoverageTable = originalBody.includes('Coverage Δ');
        if (!hasCoverageTable) {
            // Format it by removing "New features" section but keeping the rest
            return formatAllLinesCoveredComment(originalBody);
        }
    }
    // Extract the Coverage Δ table
    var coverageTable = extractCoverageDeltaTable(originalBody);
    if (!coverageTable) {
        return null;
    }
    // Determine the message based on decreased coverage
    var message;
    if (hasDecreasedCoverage(originalBody)) {
        message =
            "❌ Looks like you've decreased code coverage for some files. Please write tests to increase, or at least maintain, the existing level of code coverage. See our documentation [here](https://github.com/Expensify/App/blob/main/contributingGuides/CodeCov.md) for how to interpret this table.";
    }
    else {
        message = '✅ Changes either increased or maintained existing code coverage, great job!';
    }
    // Build the new comment body with the original header
    var newBody = "".concat(header, "\n\n").concat(message, "\n\n").concat(coverageTable);
    return newBody;
}
function run() {
    return __awaiter(this, void 0, void 0, function () {
        var commentId, commentBody, commentUser, commentAuthor, isCodeCovReport, formattedBody, error_1;
        var _a, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    _d.trys.push([0, 2, , 3]);
                    // Check if this is a comment event
                    if (github_1.context.eventName !== 'issue_comment') {
                        console.log('This action only runs on issue_comment events');
                        return [2 /*return*/];
                    }
                    commentId = (_a = github_1.context.payload.comment) === null || _a === void 0 ? void 0 : _a.id;
                    commentBody = (_b = github_1.context.payload.comment) === null || _b === void 0 ? void 0 : _b.body;
                    commentUser = (_c = github_1.context.payload.comment) === null || _c === void 0 ? void 0 : _c.user;
                    commentAuthor = commentUser === null || commentUser === void 0 ? void 0 : commentUser.login;
                    // Validate required fields
                    if (!commentBody || !commentId || typeof commentBody !== 'string' || typeof commentId !== 'number') {
                        console.log('Missing or invalid comment data');
                        return [2 /*return*/];
                    }
                    if (commentAuthor !== 'codecov[bot]') {
                        console.log("Comment is not from CodeCov (author: ".concat(commentAuthor, ")"));
                        return [2 /*return*/];
                    }
                    isCodeCovReport = commentBody.includes('Codecov') &&
                        commentBody.includes('Report') &&
                        (commentBody.includes('Coverage Δ') || commentBody.includes('All modified and coverable lines are covered by tests'));
                    if (!isCodeCovReport) {
                        console.log('Comment does not appear to be a CodeCov report');
                        return [2 /*return*/];
                    }
                    console.log('Found a CodeCov comment, formatting...');
                    formattedBody = formatCodeCovComment(commentBody);
                    if (!formattedBody || formattedBody.trim() === '') {
                        console.log('Comment should remain unchanged or formatting failed');
                        return [2 /*return*/];
                    }
                    // Safety check: Don't update if formatted body is identical to original
                    if (formattedBody === commentBody) {
                        console.log('Formatted body is identical to original, no update needed');
                        return [2 /*return*/];
                    }
                    // Update the comment
                    return [4 /*yield*/, GithubUtils_1.default.octokit.issues.updateComment({
                            owner: CONST_1.default.GITHUB_OWNER,
                            repo: CONST_1.default.APP_REPO,
                            // eslint-disable-next-line @typescript-eslint/naming-convention
                            comment_id: commentId,
                            body: formattedBody,
                        })];
                case 1:
                    // Update the comment
                    _d.sent();
                    console.log('Successfully formatted CodeCov comment! 🎉');
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _d.sent();
                    console.error('Error formatting CodeCov comment:', error_1);
                    if (error_1 instanceof Error) {
                        core.setFailed(error_1.message);
                    }
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
if (require.main === module) {
    run();
}
exports.default = run;
