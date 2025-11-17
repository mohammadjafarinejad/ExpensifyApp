"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var MoneyRequestReportUtils_1 = require("@libs/MoneyRequestReportUtils");
var ReportActionsUtils_1 = require("@libs/ReportActionsUtils");
var CONST_1 = require("@src/CONST");
var ONYXKEYS_1 = require("@src/ONYXKEYS");
var useNetwork_1 = require("./useNetwork");
var useOnyx_1 = require("./useOnyx");
var useTransactionsAndViolationsForReport_1 = require("./useTransactionsAndViolationsForReport");
/**
 * This hook is for finding the "original reportID" for a given reportActionID. The reportID usually is the report we are looking at,
 * and in most cases it will be the same as the original reportID. However, in these cases the original reportID is different:
 * - When viewing an expense report with a single transaction, the reportActions from the transaction thread and the expense report are merged, so in that case the
 * reportAction's report may be different from the report we are viewing.
 * - When viewing a thread report, the original reportID is the parent reportID, because the reportAction that created the thread belongs to the parent report.
 *
 * @param reportID The reportID of the report we are viewing
 * @param reportAction The reportAction we want to find the original reportID for
 * @returns The original reportID for the given reportAction, or undefined if not found
 *
 */
function useOriginalReportID(reportID, reportAction) {
    var _a;
    var reportActions = (0, useOnyx_1.default)("".concat(ONYXKEYS_1.default.COLLECTION.REPORT_ACTIONS).concat(reportID), { canBeMissing: true })[0];
    var report = (0, useOnyx_1.default)("".concat(ONYXKEYS_1.default.COLLECTION.REPORT).concat(reportID), { canBeMissing: true })[0];
    var chatReport = (0, useOnyx_1.default)("".concat(ONYXKEYS_1.default.COLLECTION.REPORT).concat(report === null || report === void 0 ? void 0 : report.chatReportID), { canBeMissing: true })[0];
    var isOffline = (0, useNetwork_1.default)().isOffline;
    var allReportTransactions = (0, useTransactionsAndViolationsForReport_1.default)(reportID).transactions;
    var reportActionID = reportAction === null || reportAction === void 0 ? void 0 : reportAction.reportActionID;
    var currentReportAction = reportActionID ? reportActions === null || reportActions === void 0 ? void 0 : reportActions[reportActionID] : undefined;
    var reportActionBelongsCurrentReport = Object.keys(currentReportAction !== null && currentReportAction !== void 0 ? currentReportAction : {}).length > 0;
    var isThreadReportParentAction = ((_a = reportAction === null || reportAction === void 0 ? void 0 : reportAction.childReportID) === null || _a === void 0 ? void 0 : _a.toString()) === reportID;
    // This will only be found if the report with reportID is a report with a single transaction and we are merging reportActions
    var uniqueTransactionThreadReportID = (0, react_1.useMemo)(function () {
        // These conditions are repeated with the conditions that make us return early below because there is no need to do expensive calculations
        // on the transactions and reportActions if we are not going to use uniqueTransactionThreadReportID.
        if (!reportID || reportActionBelongsCurrentReport || isThreadReportParentAction || !reportActionID) {
            return undefined;
        }
        var visibleTransactionsIDs = (0, MoneyRequestReportUtils_1.getAllNonDeletedTransactions)(allReportTransactions, Object.values(reportActions !== null && reportActions !== void 0 ? reportActions : {}))
            .filter(function (transaction) { return isOffline || transaction.pendingAction !== CONST_1.default.RED_BRICK_ROAD_PENDING_ACTION.DELETE; })
            .map(function (transaction) { return transaction.transactionID; });
        return (0, ReportActionsUtils_1.getOneTransactionThreadReportID)({ type: report === null || report === void 0 ? void 0 : report.type }, chatReport, reportActions !== null && reportActions !== void 0 ? reportActions : [], isOffline, visibleTransactionsIDs);
    }, [reportID, reportActionBelongsCurrentReport, isThreadReportParentAction, reportActionID, allReportTransactions, reportActions, report === null || report === void 0 ? void 0 : report.type, chatReport, isOffline]);
    var uniqueTransactionThreadReportActions = (0, useOnyx_1.default)("".concat(ONYXKEYS_1.default.COLLECTION.REPORT_ACTIONS).concat(uniqueTransactionThreadReportID), { canBeMissing: true })[0];
    if (!reportID) {
        return undefined;
    }
    if (reportActionBelongsCurrentReport) {
        // the reportActionID does belong to reportID
        return reportID;
    }
    if (isThreadReportParentAction) {
        // This reportAction is the parent action of a thread report, so the original reportID is the parentReportID
        return report === null || report === void 0 ? void 0 : report.parentReportID;
    }
    // If we have a uniqueTransactionThreadReportID, then we are viewing an expense report with a single transaction and merging reportActions
    // In that case, we need to check if the reportActionID belongs to the transaction thread.
    if (uniqueTransactionThreadReportID && reportActionID) {
        var uniqueTransactionThreadReportAction = uniqueTransactionThreadReportActions === null || uniqueTransactionThreadReportActions === void 0 ? void 0 : uniqueTransactionThreadReportActions[reportActionID];
        if (Object.keys(uniqueTransactionThreadReportAction !== null && uniqueTransactionThreadReportAction !== void 0 ? uniqueTransactionThreadReportAction : {}).length > 0) {
            return uniqueTransactionThreadReportID;
        }
    }
    // If we reach here, we couldn't find the original reportID
    return undefined;
}
exports.default = useOriginalReportID;
