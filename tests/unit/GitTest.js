"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @jest-environment node
 */
var child_process_1 = require("child_process");
var dedent_1 = require("@libs/StringUtils/dedent");
var Git_1 = require("@scripts/utils/Git");
// Mock execSync to control git diff output
jest.mock('child_process');
var mockExecSync = child_process_1.execSync;
describe('Git', function () {
    beforeEach(function () {
        jest.clearAllMocks();
    });
    describe('isValidRef', function () {
        it('returns true for valid git references', function () {
            mockExecSync.mockReturnValue('abc123def456\n');
            var result = Git_1.default.isValidRef('main');
            expect(result).toBe(true);
            expect(mockExecSync).toHaveBeenCalledWith('git rev-parse --verify "main^{object}"', {
                encoding: 'utf8',
                cwd: process.cwd(),
                stdio: 'pipe',
            });
        });
        it('returns false for invalid git references', function () {
            mockExecSync.mockImplementation(function () {
                throw new Error("fatal: bad revision 'invalid-ref'");
            });
            var result = Git_1.default.isValidRef('invalid-ref');
            expect(result).toBe(false);
        });
        it('returns true for commit hashes', function () {
            mockExecSync.mockReturnValue('abc123def456\n');
            var result = Git_1.default.isValidRef('abc123def456');
            expect(result).toBe(true);
        });
        it('returns true for tags', function () {
            mockExecSync.mockReturnValue('abc123def456\n');
            var result = Git_1.default.isValidRef('v1.0.0');
            expect(result).toBe(true);
        });
    });
    describe('diff', function () {
        it('returns empty result when no changes exist', function () {
            mockExecSync.mockReturnValue('');
            var result = Git_1.default.diff('main');
            expect(result).toEqual({
                files: [],
                hasChanges: false,
            });
            expect(mockExecSync).toHaveBeenCalledWith('git diff -U0 main', {
                encoding: 'utf8',
                cwd: process.cwd(),
            });
        });
        it('handles simple single file diff with additions and removals', function () {
            var mockDiffOutput = (0, dedent_1.default)("\n                diff --git a/src/file.ts b/src/file.ts\n                index 1234567..abcdefg 100644\n                --- a/src/file.ts\n                +++ b/src/file.ts\n                @@ -2,1 +2,2 @@\n                -const farewell = 'Goodbye';\n                +const farewell = 'Farewell';\n                +const newLine = 'New';\n            ");
            mockExecSync.mockReturnValue(mockDiffOutput);
            var result = Git_1.default.diff('main', 'feature');
            expect(result.hasChanges).toBe(true);
            expect(result.files).toHaveLength(1);
            var file = result.files.at(0);
            expect(file).toBeDefined();
            if (!file) {
                return;
            }
            expect(file.filePath).toBe('src/file.ts');
            expect(file.hunks).toHaveLength(1);
            var hunk = file.hunks.at(0);
            expect(hunk).toBeDefined();
            if (!hunk) {
                return;
            }
            expect(hunk.oldStart).toBe(2);
            expect(hunk.oldCount).toBe(1);
            expect(hunk.newStart).toBe(2);
            expect(hunk.newCount).toBe(2);
            expect(hunk.lines).toHaveLength(3);
            expect(hunk.lines.at(0)).toEqual({
                number: 2,
                type: 'removed',
                content: "const farewell = 'Goodbye';",
            });
            expect(hunk.lines.at(1)).toEqual({
                number: 2,
                type: 'added',
                content: "const farewell = 'Farewell';",
            });
            expect(hunk.lines.at(2)).toEqual({
                number: 3,
                type: 'added',
                content: "const newLine = 'New';",
            });
            // 1 removed, 2 added = 1 modified + 1 added
            expect(file.modifiedLines.size).toBe(1);
            expect(Array.from(file.addedLines)).toEqual([3]);
            expect(Array.from(file.removedLines)).toEqual([]);
        });
        it('handles multiple hunks in a single file', function () {
            var mockDiffOutput = (0, dedent_1.default)("\n                diff --git a/src/file.ts b/src/file.ts\n                index 1234567..abcdefg 100644\n                --- a/src/file.ts\n                +++ b/src/file.ts\n                @@ -1,1 +1,1 @@\n                -const old1 = 'old';\n                +const new1 = 'new';\n                @@ -10,1 +10,2 @@\n                -const old2 = 'old';\n                +const new2 = 'new';\n                +const added = 'added';\n            ");
            mockExecSync.mockReturnValue(mockDiffOutput);
            var result = Git_1.default.diff('main');
            expect(result.hasChanges).toBe(true);
            expect(result.files).toHaveLength(1);
            var file = result.files.at(0);
            expect(file).toBeDefined();
            if (!file) {
                return;
            }
            expect(file.hunks).toHaveLength(2);
            // First hunk
            var firstHunk = file.hunks.at(0);
            expect(firstHunk).toBeDefined();
            if (firstHunk) {
                expect(firstHunk.oldStart).toBe(1);
                expect(firstHunk.newStart).toBe(1);
            }
            // Second hunk
            var secondHunk = file.hunks.at(1);
            expect(secondHunk).toBeDefined();
            if (secondHunk) {
                expect(secondHunk.oldStart).toBe(10);
                expect(secondHunk.newStart).toBe(10);
            }
            // First hunk: 1 removed, 1 added = 1 modified
            // Second hunk: 1 removed, 2 added = 1 modified + 1 added
            expect(file.modifiedLines.size).toBe(2);
            expect(Array.from(file.addedLines)).toEqual([11]);
            expect(Array.from(file.removedLines)).toEqual([]);
        });
        it('handles multiple files in diff', function () {
            var mockDiffOutput = (0, dedent_1.default)("\n                diff --git a/src/file1.ts b/src/file1.ts\n                index 1234567..abcdefg 100644\n                --- a/src/file1.ts\n                +++ b/src/file1.ts\n                @@ -1,1 +1,1 @@\n                -old content\n                +new content\n                diff --git a/src/file2.ts b/src/file2.ts\n                index 7890abc..word123 100644\n                --- a/src/file2.ts\n                +++ b/src/file2.ts\n                @@ -2,0 +2,1 @@\n                +added line\n            ");
            mockExecSync.mockReturnValue(mockDiffOutput);
            var result = Git_1.default.diff('main', 'HEAD');
            expect(result.hasChanges).toBe(true);
            expect(result.files).toHaveLength(2);
            var file1 = result.files.at(0);
            var file2 = result.files.at(1);
            expect(file1).toBeDefined();
            expect(file2).toBeDefined();
            if (!file1 || !file2) {
                return;
            }
            expect(file1.filePath).toBe('src/file1.ts');
            expect(file2.filePath).toBe('src/file2.ts');
            // 1 removed, 1 added = 1 modified
            expect(file1.modifiedLines.size).toBe(1);
            expect(Array.from(file1.addedLines)).toEqual([]);
            expect(Array.from(file1.removedLines)).toEqual([]);
            expect(Array.from(file2.addedLines)).toEqual([2]);
            expect(file2.removedLines.size).toBe(0);
        });
        it('handles diff with specific file path', function () {
            var mockDiffOutput = (0, dedent_1.default)("\n                diff --git a/src/languages/en.ts b/src/languages/en.ts\n                index 1234567..abcdefg 100644\n                --- a/src/languages/en.ts\n                +++ b/src/languages/en.ts\n                @@ -6,0 +6,1 @@\n                +    newKey: 'New value',\n            ");
            mockExecSync.mockReturnValue(mockDiffOutput);
            var result = Git_1.default.diff('main', undefined, 'src/languages/en.ts');
            expect(mockExecSync).toHaveBeenCalledWith('git diff -U0 main -- "src/languages/en.ts"', {
                encoding: 'utf8',
                cwd: process.cwd(),
            });
            expect(result.hasChanges).toBe(true);
            expect(result.files).toHaveLength(1);
            var file = result.files.at(0);
            expect(file).toBeDefined();
            if (!file) {
                return;
            }
            expect(file.filePath).toBe('src/languages/en.ts');
            expect(Array.from(file.addedLines)).toEqual([6]);
        });
        it('throws error when git command fails with invalid ref', function () {
            mockExecSync.mockImplementation(function () {
                var error = new Error("fatal: bad revision 'invalid-ref'");
                // Simulate execSync behavior with non-zero exit code
                error.status = 128;
                throw error;
            });
            expect(function () { return Git_1.default.diff('invalid-ref'); }).toThrow("fatal: bad revision 'invalid-ref'");
        });
        it('throws error when git command fails with other errors', function () {
            mockExecSync.mockImplementation(function () {
                var error = new Error('fatal: not a git repository');
                error.status = 128;
                throw error;
            });
            expect(function () { return Git_1.default.diff('main'); }).toThrow('fatal: not a git repository');
        });
        it('throws error when file path does not exist', function () {
            mockExecSync.mockImplementation(function () {
                var error = new Error("fatal: pathspec 'nonexistent.ts' did not match any files");
                error.status = 1;
                throw error;
            });
            expect(function () { return Git_1.default.diff('main', undefined, 'nonexistent.ts'); }).toThrow("fatal: pathspec 'nonexistent.ts' did not match any files");
        });
        it('handles unified diff format without context lines', function () {
            var mockDiffOutput = (0, dedent_1.default)("\n                diff --git a/test.ts b/test.ts\n                index 1234567..abcdefg 100644\n                --- a/test.ts\n                +++ b/test.ts\n                @@ -4,1 +4,2 @@\n                -line 1 old\n                +line 1 new\n                +line 2 added\n            ");
            mockExecSync.mockReturnValue(mockDiffOutput);
            var result = Git_1.default.diff('HEAD~1');
            var file = result.files.at(0);
            expect(file).toBeDefined();
            if (!file) {
                return;
            }
            var hunk = file.hunks.at(0);
            expect(hunk).toBeDefined();
            if (!hunk) {
                return;
            }
            expect(hunk.lines).toHaveLength(3);
            // Check removed line
            expect(hunk.lines.at(0)).toEqual({
                number: 4,
                type: 'removed',
                content: 'line 1 old',
            });
            // Check added lines
            expect(hunk.lines.at(1)).toEqual({
                number: 4,
                type: 'added',
                content: 'line 1 new',
            });
            expect(hunk.lines.at(2)).toEqual({
                number: 5,
                type: 'added',
                content: 'line 2 added',
            });
        });
        it('calculates modified lines correctly when lines are replaced', function () {
            // 2 lines removed, 2 lines added = 2 modified lines
            var mockDiffOutput = (0, dedent_1.default)("\n                diff --git a/test.ts b/test.ts\n                index 1234567..abcdefg 100644\n                --- a/test.ts\n                +++ b/test.ts\n                @@ -2,2 +2,2 @@\n                -old line1\n                -old line2\n                +new line1\n                +new line2\n            ");
            mockExecSync.mockReturnValue(mockDiffOutput);
            var result = Git_1.default.diff('main');
            var file = result.files.at(0);
            expect(file).toBeDefined();
            if (!file) {
                return;
            }
            // Should have 2 modified lines (the minimum of 2 removed and 2 added)
            expect(file.modifiedLines.size).toBe(2);
            expect(file.addedLines.size).toBe(0); // No net additions since all were modifications
            expect(file.removedLines.size).toBe(0); // No net removals since all were modifications
        });
        it('calculates modified lines with net additions', function () {
            // 1 line removed, 3 lines added = 1 modified line + 2 added lines
            var mockDiffOutput = (0, dedent_1.default)("\n                diff --git a/test.ts b/test.ts\n                index 1234567..abcdefg 100644\n                --- a/test.ts\n                +++ b/test.ts\n                @@ -2,1 +2,3 @@\n                -old line1\n                +new line1\n                +additional line2\n                +additional line3\n            ");
            mockExecSync.mockReturnValue(mockDiffOutput);
            var result = Git_1.default.diff('main');
            var file = result.files.at(0);
            expect(file).toBeDefined();
            if (!file) {
                return;
            }
            // Should have 1 modified line + 2 net additions
            expect(file.modifiedLines.size).toBe(1);
            expect(file.addedLines.size).toBe(2);
            expect(file.removedLines.size).toBe(0);
        });
        it('calculates modified lines with net removals', function () {
            // 3 lines removed, 1 line added = 1 modified line + 2 removed lines
            var mockDiffOutput = (0, dedent_1.default)("\n                diff --git a/test.ts b/test.ts\n                index 1234567..abcdefg 100644\n                --- a/test.ts\n                +++ b/test.ts\n                @@ -2,3 +2,1 @@\n                -old line1\n                -old line2\n                -old line3\n                +new line1\n            ");
            mockExecSync.mockReturnValue(mockDiffOutput);
            var result = Git_1.default.diff('main');
            var file = result.files.at(0);
            expect(file).toBeDefined();
            if (!file) {
                return;
            }
            // Should have 1 modified line + 2 net removals
            expect(file.modifiedLines.size).toBe(1);
            expect(file.addedLines.size).toBe(0);
            expect(file.removedLines.size).toBe(2);
        });
        it('handles pure additions correctly', function () {
            // 0 lines removed, 2 lines added = 0 modified lines + 2 added lines
            var mockDiffOutput = (0, dedent_1.default)("\n                diff --git a/test.ts b/test.ts\n                index 1234567..abcdefg 100644\n                --- a/test.ts\n                +++ b/test.ts\n                @@ -2,0 +3,2 @@\n                +new line1\n                +new line2\n            ");
            mockExecSync.mockReturnValue(mockDiffOutput);
            var result = Git_1.default.diff('main');
            var file = result.files.at(0);
            expect(file).toBeDefined();
            if (!file) {
                return;
            }
            expect(file.modifiedLines.size).toBe(0);
            expect(file.addedLines.size).toBe(2);
            expect(file.removedLines.size).toBe(0);
        });
        it('handles pure removals correctly', function () {
            // 2 lines removed, 0 lines added = 0 modified lines + 2 removed lines
            var mockDiffOutput = (0, dedent_1.default)("\n                diff --git a/test.ts b/test.ts\n                index 1234567..abcdefg 100644\n                --- a/test.ts\n                +++ b/test.ts\n                @@ -3,2 +3,0 @@\n                -line1\n                -line2\n            ");
            mockExecSync.mockReturnValue(mockDiffOutput);
            var result = Git_1.default.diff('main');
            var file = result.files.at(0);
            expect(file).toBeDefined();
            if (!file) {
                return;
            }
            expect(file.modifiedLines.size).toBe(0);
            expect(file.addedLines.size).toBe(0);
            expect(file.removedLines.size).toBe(2);
        });
        it('handles interleaved additions and removals correctly', function () {
            // Non-consecutive additions and removals within a hunk (with -U0, they're in separate hunks)
            var mockDiffOutput = (0, dedent_1.default)("\n                diff --git a/test.ts b/test.ts\n                index 1234567..abcdefg 100644\n                --- a/test.ts\n                +++ b/test.ts\n                @@ -1,1 +1,1 @@\n                -removed1\n                +added1\n                @@ -3,1 +3,2 @@\n                -removed2\n                +added2\n                +added3\n            ");
            mockExecSync.mockReturnValue(mockDiffOutput);
            var result = Git_1.default.diff('main');
            var file = result.files.at(0);
            expect(file).toBeDefined();
            if (!file) {
                return;
            }
            // 2 removed, 3 added = 2 modified + 1 added
            expect(file.modifiedLines.size).toBe(2);
            expect(file.addedLines.size).toBe(1);
            expect(file.removedLines.size).toBe(0);
        });
    });
});
