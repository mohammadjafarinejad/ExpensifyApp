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
/**
 * @jest-environment node
 */
var core = require("@actions/core");
var github_1 = require("@actions/github");
var getPullRequestIncrementalChanges_1 = require("@github/actions/javascript/getPullRequestIncrementalChanges/getPullRequestIncrementalChanges");
var GithubUtils_1 = require("@github/libs/GithubUtils");
var Git_1 = require("@scripts/utils/Git");
// Mock all dependencies
jest.mock('@actions/core');
jest.mock('@actions/github');
jest.mock('@github/libs/GithubUtils');
jest.mock('@scripts/utils/Git');
var mockSetOutput = core.setOutput;
var mockGetInput = jest.fn();
// Mock @actions/core getInput
core.getInput = mockGetInput;
// Mock Git methods
var mockGitEnsureRef = jest.fn();
var mockGitDiff = jest.fn();
var mockGitParseDiff = jest.fn();
Git_1.default.ensureRef = mockGitEnsureRef;
Git_1.default.diff = mockGitDiff;
Git_1.default.parseDiff = mockGitParseDiff;
// Mock GitHubUtils methods
var mockGetPullRequestDiff = jest.fn();
GithubUtils_1.default.getPullRequestDiff = mockGetPullRequestDiff;
describe('getPullRequestIncrementalChanges', function () {
    beforeEach(function () {
        jest.clearAllMocks();
        // Set up default context for synchronize events
        github_1.context.eventName = 'pull_request';
        github_1.context.payload = {
            action: 'synchronize',
            // eslint-disable-next-line @typescript-eslint/naming-convention
            pull_request: { number: 123 },
            before: 'abc123',
            after: 'def456',
        };
        // Default mocks
        mockGetInput.mockReturnValue(null);
        mockGitEnsureRef.mockResolvedValue(undefined);
    });
    it('returns empty array when no local changes', function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    mockGitDiff.mockReturnValue({ files: [], hasChanges: false });
                    return [4 /*yield*/, (0, getPullRequestIncrementalChanges_1.default)()];
                case 1:
                    _a.sent();
                    expect(mockSetOutput).toHaveBeenCalledWith('CHANGED_FILES', JSON.stringify([]));
                    expect(mockGetPullRequestDiff).not.toHaveBeenCalled();
                    return [2 /*return*/];
            }
        });
    }); });
    it('detects overlapping content changes', function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    // Local diff has a file with specific content
                    mockGitDiff.mockReturnValue({
                        files: [
                            {
                                filePath: 'test.ts',
                                hunks: [
                                    {
                                        oldStart: 1,
                                        oldCount: 0,
                                        newStart: 1,
                                        newCount: 1,
                                        lines: [{ lineNumber: 1, type: 'added', content: 'new content' }],
                                    },
                                ],
                                addedLines: new Set([1]),
                                removedLines: new Set(),
                                modifiedLines: new Set(),
                            },
                        ],
                        hasChanges: true,
                    });
                    // PR diff has the same content
                    mockGitParseDiff.mockReturnValue({
                        files: [
                            {
                                filePath: 'test.ts',
                                hunks: [
                                    {
                                        oldStart: 1,
                                        oldCount: 0,
                                        newStart: 1,
                                        newCount: 1,
                                        lines: [{ lineNumber: 1, type: 'added', content: 'new content' }],
                                    },
                                ],
                                addedLines: new Set([1]),
                                removedLines: new Set(),
                                modifiedLines: new Set(),
                            },
                        ],
                        hasChanges: true,
                    });
                    mockGetPullRequestDiff.mockResolvedValue('mock-diff-string');
                    return [4 /*yield*/, (0, getPullRequestIncrementalChanges_1.default)()];
                case 1:
                    _a.sent();
                    expect(mockSetOutput).toHaveBeenCalledWith('CHANGED_FILES', JSON.stringify(['test.ts']));
                    return [2 /*return*/];
            }
        });
    }); });
    it('filters out non-overlapping changes', function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    // Local diff has different content than PR diff
                    mockGitDiff.mockReturnValue({
                        files: [
                            {
                                filePath: 'test.ts',
                                hunks: [
                                    {
                                        oldStart: 1,
                                        oldCount: 0,
                                        newStart: 1,
                                        newCount: 1,
                                        lines: [{ lineNumber: 1, type: 'added', content: 'local content' }],
                                    },
                                ],
                                addedLines: new Set([1]),
                                removedLines: new Set(),
                                modifiedLines: new Set(),
                            },
                        ],
                        hasChanges: true,
                    });
                    // PR diff has different content
                    mockGitParseDiff.mockReturnValue({
                        files: [
                            {
                                filePath: 'test.ts',
                                hunks: [
                                    {
                                        oldStart: 1,
                                        oldCount: 0,
                                        newStart: 1,
                                        newCount: 1,
                                        lines: [{ lineNumber: 1, type: 'added', content: 'pr content' }],
                                    },
                                ],
                                addedLines: new Set([1]),
                                removedLines: new Set(),
                                modifiedLines: new Set(),
                            },
                        ],
                        hasChanges: true,
                    });
                    mockGetPullRequestDiff.mockResolvedValue('mock-diff-string');
                    return [4 /*yield*/, (0, getPullRequestIncrementalChanges_1.default)()];
                case 1:
                    _a.sent();
                    expect(mockSetOutput).toHaveBeenCalledWith('CHANGED_FILES', JSON.stringify([]));
                    return [2 /*return*/];
            }
        });
    }); });
    it('handles error when Git.ensureRef fails', function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    mockGitEnsureRef.mockRejectedValue(new Error('Failed to fetch ref'));
                    return [4 /*yield*/, expect((0, getPullRequestIncrementalChanges_1.default)()).rejects.toThrow('Failed to fetch ref')];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('handles error when Git.diff fails', function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    mockGitDiff.mockImplementation(function () {
                        throw new Error('Git diff failed');
                    });
                    return [4 /*yield*/, expect((0, getPullRequestIncrementalChanges_1.default)()).rejects.toThrow('Git diff failed')];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('handles opened action correctly', function () { return __awaiter(void 0, void 0, void 0, function () {
        var mockPaginate;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    // Set up opened action context
                    github_1.context.payload = {
                        action: 'opened',
                        // eslint-disable-next-line @typescript-eslint/naming-convention
                        pull_request: { number: 123 },
                    };
                    mockPaginate = jest.fn().mockResolvedValue([{ filename: 'src/file1.ts' }, { filename: 'src/file2.ts' }]);
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any
                    GithubUtils_1.default.paginate = mockPaginate;
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any
                    GithubUtils_1.default.octokit = { pulls: { listFiles: jest.fn() } };
                    return [4 /*yield*/, (0, getPullRequestIncrementalChanges_1.default)()];
                case 1:
                    _a.sent();
                    expect(mockSetOutput).toHaveBeenCalledWith('CHANGED_FILES', JSON.stringify(['src/file1.ts', 'src/file2.ts']));
                    expect(mockGitDiff).not.toHaveBeenCalled(); // Should not do git operations for opened
                    return [2 /*return*/];
            }
        });
    }); });
    it('validates event type', function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    github_1.context.eventName = 'push';
                    return [4 /*yield*/, expect((0, getPullRequestIncrementalChanges_1.default)()).rejects.toThrow('This action can only be run on pull_request events, but was run on: push')];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('validates action type', function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    // Reset mocks to default behavior for this test
                    mockGitDiff.mockReturnValue({ files: [], hasChanges: false });
                    github_1.context.payload = {
                        action: 'closed',
                        // eslint-disable-next-line @typescript-eslint/naming-convention
                        pull_request: { number: 123 },
                    };
                    return [4 /*yield*/, expect((0, getPullRequestIncrementalChanges_1.default)()).rejects.toThrow('This action can only be run on pull_request opened or synchronize events, but was run on: closed')];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('works with PULL_REQUEST_NUMBER input on non-pull_request events', function () { return __awaiter(void 0, void 0, void 0, function () {
        var mockPaginate;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    // Set up a non-pull_request event
                    github_1.context.eventName = 'workflow_dispatch';
                    github_1.context.payload = {};
                    // Provide PULL_REQUEST_NUMBER input
                    mockGetInput.mockImplementation(function (inputName) {
                        if (inputName === 'PULL_REQUEST_NUMBER') {
                            return '456';
                        }
                        return null;
                    });
                    mockPaginate = jest.fn().mockResolvedValue([{ filename: 'src/test.ts' }]);
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any
                    GithubUtils_1.default.paginate = mockPaginate;
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any
                    GithubUtils_1.default.octokit = { pulls: { listFiles: jest.fn() } };
                    return [4 /*yield*/, (0, getPullRequestIncrementalChanges_1.default)()];
                case 1:
                    _a.sent();
                    expect(mockSetOutput).toHaveBeenCalledWith('CHANGED_FILES', JSON.stringify(['src/test.ts']));
                    expect(mockGitDiff).not.toHaveBeenCalled(); // Should not do git operations when PR number is provided
                    return [2 /*return*/];
            }
        });
    }); });
    it('throws error when no PULL_REQUEST_NUMBER and not pull_request event', function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    github_1.context.eventName = 'workflow_dispatch';
                    github_1.context.payload = {};
                    return [4 /*yield*/, expect((0, getPullRequestIncrementalChanges_1.default)()).rejects.toThrow('This action can only be run on pull_request events, but was run on: workflow_dispatch. Provide PULL_REQUEST_NUMBER input to use with other event types.')];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
});
