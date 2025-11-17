"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MarkdownLinkHelpers_1 = require("@libs/MarkdownLinkHelpers");
describe('markdownLinkHelpers', function () {
    describe('isStandaloneURL', function () {
        it('accepts a valid URL like https://example.com', function () {
            expect((0, MarkdownLinkHelpers_1.isStandaloneURL)('https://example.com')).toBe(true);
        });
        it('rejects a URL with whitespace like https://exa mple.com', function () {
            expect((0, MarkdownLinkHelpers_1.isStandaloneURL)('https://exa mple.com')).toBe(false);
        });
        it('accepts a valid URL with angle-bracket wrappers like <https://example.com>', function () {
            expect((0, MarkdownLinkHelpers_1.isStandaloneURL)('<https://example.com>')).toBe(true);
        });
        it('rejects an empty string', function () {
            expect((0, MarkdownLinkHelpers_1.isStandaloneURL)('')).toBe(false);
        });
        it('rejects text with multiple words', function () {
            expect((0, MarkdownLinkHelpers_1.isStandaloneURL)('hello world')).toBe(false);
        });
        it('rejects invalid URL without protocol', function () {
            expect((0, MarkdownLinkHelpers_1.isStandaloneURL)('example.com')).toBe(false);
        });
    });
    describe('escapeLinkText', function () {
        it('escapes opening and closing square brackets', function () {
            expect((0, MarkdownLinkHelpers_1.escapeLinkText)('a[b]c')).toBe('a&#91;b&#93;c');
        });
        it('collapses newlines to spaces', function () {
            expect((0, MarkdownLinkHelpers_1.escapeLinkText)('line1\nline2\r\nline3')).toBe('line1 line2 line3');
        });
        it('collapses repeated whitespace to single space and trims', function () {
            expect((0, MarkdownLinkHelpers_1.escapeLinkText)('  foo   bar  ')).toBe('foo bar');
        });
        it('handles empty string', function () {
            expect((0, MarkdownLinkHelpers_1.escapeLinkText)('')).toBe('');
        });
        it('does not alter text without special characters or whitespace issues', function () {
            expect((0, MarkdownLinkHelpers_1.escapeLinkText)('normal text')).toBe('normal text');
        });
    });
    describe('sanitizeUrlForMarkdown', function () {
        it('removes surrounding angle brackets if present', function () {
            expect((0, MarkdownLinkHelpers_1.sanitizeUrlForMarkdown)('<https://example.com>')).toBe('https://example.com');
        });
        it('encodes special characters', function () {
            expect((0, MarkdownLinkHelpers_1.sanitizeUrlForMarkdown)('https://example.com/path?query=val&other=2')).toBe('https://example.com/path?query=val&other=2');
        });
        it('handles invalid URLs gracefully without encoding', function () {
            expect((0, MarkdownLinkHelpers_1.sanitizeUrlForMarkdown)('invalid url')).toBe('invalid url');
        });
        it('trims whitespace', function () {
            expect((0, MarkdownLinkHelpers_1.sanitizeUrlForMarkdown)(' https://example.com ')).toBe('https://example.com');
        });
    });
    describe('toMarkdownLink', function () {
        it('builds a correct Markdown link with escaped text and sanitized URL', function () {
            expect((0, MarkdownLinkHelpers_1.toMarkdownLink)('example text', 'https://example.com')).toBe('[example text](https://example.com)');
        });
        it('escapes ] in text', function () {
            expect((0, MarkdownLinkHelpers_1.toMarkdownLink)('a]b', 'https://example.com')).toBe('[a&#93;b](https://example.com)');
        });
        it('collapses newlines in selected text', function () {
            expect((0, MarkdownLinkHelpers_1.toMarkdownLink)('line1\nline2', 'https://example.com')).toBe('[line1 line2](https://example.com)');
        });
        it('handles empty text or URL', function () {
            expect((0, MarkdownLinkHelpers_1.toMarkdownLink)('', 'https://example.com')).toBe('[](https://example.com)');
            expect((0, MarkdownLinkHelpers_1.toMarkdownLink)('text', '')).toBe('[text]()');
        });
    });
    describe('detectAndRewritePaste', function () {
        it('replaces when there is a selection and inserted text is a single URL', function () {
            var prevText = 'This is some selected text here.';
            var selectionStart = 13;
            var selectionEnd = 26;
            var insertedText = 'https://example.com';
            var result = (0, MarkdownLinkHelpers_1.detectAndRewritePaste)(prevText, selectionStart, selectionEnd, insertedText);
            expect(result.didReplace).toBe(true);
            expect(result.text).toBe('This is some [selected text](https://example.com) here.');
        });
        it('does not replace when there is no selection', function () {
            var prevText = 'Insert here';
            var selectionStart = 7;
            var selectionEnd = 7;
            var insertedText = 'https://example.com';
            var result = (0, MarkdownLinkHelpers_1.detectAndRewritePaste)(prevText, selectionStart, selectionEnd, insertedText);
            expect(result.didReplace).toBe(false);
            expect(result.text).toBe(null);
        });
        it('does not replace if inserted text is not a standalone URL', function () {
            var prevText = 'Selected text';
            var selectionStart = 0;
            var selectionEnd = 13;
            var insertedText = 'not a url';
            var result = (0, MarkdownLinkHelpers_1.detectAndRewritePaste)(prevText, selectionStart, selectionEnd, insertedText);
            expect(result.didReplace).toBe(false);
            expect(result.text).toBe(null);
        });
        it('handles negative selection length gracefully', function () {
            var prevText = 'Text';
            var selectionStart = 5;
            var selectionEnd = 0;
            var insertedText = 'https://example.com';
            var result = (0, MarkdownLinkHelpers_1.detectAndRewritePaste)(prevText, selectionStart, selectionEnd, insertedText);
            expect(result.didReplace).toBe(false);
            expect(result.text).toBe(null);
        });
    });
});
