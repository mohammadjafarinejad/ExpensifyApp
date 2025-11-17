"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.detectAndRewritePaste = exports.toMarkdownLink = exports.sanitizeUrlForMarkdown = exports.escapeLinkText = exports.isStandaloneURL = void 0;
var expensify_common_1 = require("expensify-common");
/**
 * Returns true if `text` is a single token URL (no whitespace), allowing optional angle-bracket wrappers.
 */
var isStandaloneURL = function (text) {
    if (!text) {
        return false;
    }
    var trimmed = text.trim();
    if (/\s/.test(trimmed)) {
        return false;
    }
    var unwrapped = trimmed.replace(/^<|>$/g, '');
    // Reject if contains emoji or any non-ASCII characters
    // (valid URLs per RFC 3986 should be ASCII-only)
    // eslint-disable-next-line no-control-regex
    if (/[^\x00-\x7F]/.test(unwrapped)) {
        return false;
    }
    return expensify_common_1.Str.isValidURL(unwrapped);
};
exports.isStandaloneURL = isStandaloneURL;
/**
 * Collapse newlines to spaces, collapse repeated whitespace to single space, trim,
 * and replace opening &#91; and closing &#93; square brackets with HTML codes, which would otherwise break Markdown link text.
 */
var escapeLinkText = function (text) {
    if (!text) {
        return '';
    }
    var collapsed = text
        .replace(/\r?\n+/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();
    return collapsed.replace(/\[/g, '&#91;').replace(/\]/g, '&#93;');
};
exports.escapeLinkText = escapeLinkText;
/**
 * Sanitize the URL for Markdown link. Remove surrounding < > if present and encode it
 * to avoid raw spaces or other invalid characters inside the parentheses.
 * We won't alter semantics otherwise.
 */
var sanitizeUrlForMarkdown = function (url) {
    if (!isStandaloneURL(url)) {
        return url;
    }
    var trimmed = (url || '').trim();
    var unwrapped = trimmed.replace(/^<|>$/g, '');
    try {
        return encodeURI(unwrapped);
    }
    catch (_a) {
        return unwrapped;
    }
};
exports.sanitizeUrlForMarkdown = sanitizeUrlForMarkdown;
/**
 * Build a Markdown link: [escaped-selected-text](sanitized-url)
 * We do NOT wrap the URL in < > here — angle brackets are only valid for "auto links", not inside link destinations.
 */
var toMarkdownLink = function (selectedText, url) {
    var safeText = escapeLinkText(selectedText);
    var safeUrl = sanitizeUrlForMarkdown(url);
    return "[".concat(safeText, "](").concat(safeUrl, ")");
};
exports.toMarkdownLink = toMarkdownLink;
/**
 * Given prevText and a selection (start/end) and the insertedText (e.g. diff),
 * returns a rewritten text if this looks like "selection replaced by a single URL" and we should turn it into a markdown link.
 */
var detectAndRewritePaste = function (prevText, selectionStart, selectionEnd, insertedText) {
    if (!insertedText || !isStandaloneURL(insertedText)) {
        return { text: null, didReplace: false };
    }
    var replacedSelectionLength = Math.max(0, selectionEnd - selectionStart);
    if (replacedSelectionLength === 0) {
        // nothing replaced (user pasted URL without selecting text) -> don't rewrite
        return { text: null, didReplace: false };
    }
    var selectedText = prevText.substring(selectionStart, selectionEnd);
    var replacement = toMarkdownLink(selectedText, insertedText);
    var newText = prevText.slice(0, selectionStart) + replacement + prevText.slice(selectionEnd);
    return { text: newText, didReplace: true };
};
exports.detectAndRewritePaste = detectAndRewritePaste;
