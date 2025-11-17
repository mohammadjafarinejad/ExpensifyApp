"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var useOnyx_1 = require("@hooks/useOnyx");
var ReportActionsUtils_1 = require("@libs/ReportActionsUtils");
var ONYXKEYS_1 = require("@src/ONYXKEYS");
/**
 * Traverses up the report hierarchy with the `parentReportID` until the root report,
 * then returns the ancestor reports and their associated actions based on `parentReportActionID`.
 *
 * @param report - The report for which to fetch ancestor reports and actions.
 * @param shouldExcludeAncestor - Callback to determine if an ancestor should be excluded.
 */
function useAncestors(report, shouldExcludeAncestorReportActionCallback) {
    if (shouldExcludeAncestorReportActionCallback === void 0) { shouldExcludeAncestorReportActionCallback = function () { return false; }; }
    var reportCollection = (0, useOnyx_1.default)(ONYXKEYS_1.default.COLLECTION.REPORT, { canBeMissing: false })[0];
    var reportDraftCollection = (0, useOnyx_1.default)(ONYXKEYS_1.default.COLLECTION.REPORT_DRAFT, { canBeMissing: true })[0];
    var reportActionsCollection = (0, useOnyx_1.default)(ONYXKEYS_1.default.COLLECTION.REPORT_ACTIONS, { canBeMissing: false })[0];
    return (0, react_1.useMemo)(function () {
        var _a, _b;
        if (!reportActionsCollection || (!reportCollection && !reportDraftCollection)) {
            return [];
        }
        var ancestors = [];
        var currentReport = report;
        // Traverse up the report hierarchy until currentReport has no parent
        while ((currentReport === null || currentReport === void 0 ? void 0 : currentReport.parentReportID) && (currentReport === null || currentReport === void 0 ? void 0 : currentReport.parentReportActionID)) {
            var currentReportAction = (_a = reportActionsCollection["".concat(ONYXKEYS_1.default.COLLECTION.REPORT_ACTIONS).concat(currentReport.parentReportID)]) === null || _a === void 0 ? void 0 : _a["".concat(currentReport.parentReportActionID)];
            // As we traverse up the report hierarchy, we need to reassign `currentReport`
            // to the parent's own report.
            currentReport =
                (_b = reportCollection === null || reportCollection === void 0 ? void 0 : reportCollection["".concat(ONYXKEYS_1.default.COLLECTION.REPORT).concat(currentReport.parentReportID)]) !== null && _b !== void 0 ? _b : reportDraftCollection === null || reportDraftCollection === void 0 ? void 0 : reportDraftCollection["".concat(ONYXKEYS_1.default.COLLECTION.REPORT_DRAFT).concat(currentReport.parentReportID)];
            if (!currentReport || !currentReportAction || shouldExcludeAncestorReportActionCallback(currentReportAction, ancestors.length === 0)) {
                break;
            }
            // To maintain the order from the top-most ancestor down to the immediate parent
            // we `unshift` (push) each ancestor to the start of the array.
            ancestors.unshift({
                report: currentReport,
                reportAction: currentReportAction,
                shouldDisplayNewMarker: (0, ReportActionsUtils_1.isCurrentActionUnread)(currentReport, currentReportAction),
            });
        }
        return ancestors;
    }, [report, reportCollection, reportDraftCollection, reportActionsCollection, shouldExcludeAncestorReportActionCallback]);
}
exports.default = useAncestors;
