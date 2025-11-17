"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.startSpan = startSpan;
exports.endSpan = endSpan;
var Sentry = require("@sentry/react-native");
var activeSpans = new Map();
function startSpan(spanId, options) {
    // End any existing span for this name
    endSpan(spanId);
    var span = Sentry.startInactiveSpan(options);
    if (span) {
        activeSpans.set(spanId, span);
    }
    return span;
}
function endSpan(spanId) {
    var span = activeSpans.get(spanId);
    if (!span) {
        return;
    }
    span.end();
    activeSpans.delete(spanId);
}
