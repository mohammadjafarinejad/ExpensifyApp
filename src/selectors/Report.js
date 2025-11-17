"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ReportActionsUtils_1 = require("@libs/ReportActionsUtils");
var CONST_1 = require("@src/CONST");
var ReportAction_1 = require("./ReportAction");
function getArchiveReason(reportActions) {
    var _a;
    var lastClosedReportAction = (0, ReportAction_1.getLastClosedReportAction)(reportActions);
    if (!lastClosedReportAction) {
        return undefined;
    }
    return (0, ReportActionsUtils_1.isClosedAction)(lastClosedReportAction) ? (_a = (0, ReportActionsUtils_1.getOriginalMessage)(lastClosedReportAction)) === null || _a === void 0 ? void 0 : _a.reason : CONST_1.default.REPORT.ARCHIVE_REASON.DEFAULT;
}
exports.default = getArchiveReason;
