"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getParentReportActionSelector = getParentReportActionSelector;
exports.getLastClosedReportAction = getLastClosedReportAction;
var findLast_1 = require("lodash/findLast");
var ReportActionsUtils_1 = require("@libs/ReportActionsUtils");
var CONST_1 = require("@src/CONST");
function getParentReportActionSelector(parentReportActions, parentReportActionID) {
    if (!parentReportActions || !parentReportActionID) {
        return;
    }
    return parentReportActions[parentReportActionID];
}
/**
 * In some cases, there can be multiple closed report actions in a chat report.
 * This method returns the last closed report action so we can always show the correct archived report reason.
 * Additionally, archived #admins and #announce do not have the closed report action so we will return null if none is found.
 *
 */
function getLastClosedReportAction(reportActions) {
    // If closed report action is not present, return early
    if (!Object.values(reportActions !== null && reportActions !== void 0 ? reportActions : {}).some(function (action) {
        return (action === null || action === void 0 ? void 0 : action.actionName) === CONST_1.default.REPORT.ACTIONS.TYPE.CLOSED;
    })) {
        return undefined;
    }
    var filteredReportActions = (0, ReportActionsUtils_1.filterOutDeprecatedReportActions)(reportActions);
    var sortedReportActions = (0, ReportActionsUtils_1.getSortedReportActions)(filteredReportActions);
    return (0, findLast_1.default)(sortedReportActions, function (action) { return action.actionName === CONST_1.default.REPORT.ACTIONS.TYPE.CLOSED; });
}
