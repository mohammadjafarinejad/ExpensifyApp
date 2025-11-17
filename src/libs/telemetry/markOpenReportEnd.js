"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Timing_1 = require("@libs/actions/Timing");
var Performance_1 = require("@libs/Performance");
var CONST_1 = require("@src/CONST");
var activeSpans_1 = require("./activeSpans");
/**
 * Mark all 'open_report*' performance events as finished using both Performance (local) and Timing (remote) tracking.
 */
function markOpenReportEnd(reportId) {
    (0, activeSpans_1.endSpan)("".concat(CONST_1.default.TELEMETRY.SPAN_OPEN_REPORT, "_").concat(reportId));
    Performance_1.default.markEnd(CONST_1.default.TIMING.OPEN_REPORT);
    Timing_1.default.end(CONST_1.default.TIMING.OPEN_REPORT);
    Performance_1.default.markEnd(CONST_1.default.TIMING.OPEN_REPORT_THREAD);
    Timing_1.default.end(CONST_1.default.TIMING.OPEN_REPORT_THREAD);
    Performance_1.default.markEnd(CONST_1.default.TIMING.OPEN_REPORT_FROM_PREVIEW);
    Timing_1.default.end(CONST_1.default.TIMING.OPEN_REPORT_FROM_PREVIEW);
    Performance_1.default.markEnd(CONST_1.default.TIMING.OPEN_REPORT_SEARCH);
    Timing_1.default.end(CONST_1.default.TIMING.OPEN_REPORT_SEARCH);
}
exports.default = markOpenReportEnd;
