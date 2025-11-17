"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var IOU_1 = require("@libs/actions/IOU");
var getNonEmptyStringOnyxID_1 = require("@libs/getNonEmptyStringOnyxID");
var ReportActionsUtils_1 = require("@libs/ReportActionsUtils");
var TransactionUtils_1 = require("@libs/TransactionUtils");
var CONST_1 = require("@src/CONST");
var ONYXKEYS_1 = require("@src/ONYXKEYS");
var useArchivedReportsIdSet_1 = require("./useArchivedReportsIdSet");
var useOnyx_1 = require("./useOnyx");
var usePermissions_1 = require("./usePermissions");
/**
 * Pure hook for deleting transactions
 * All data must be provided through function parameters
 */
function useDeleteTransactions(_a) {
    var report = _a.report, reportActions = _a.reportActions, policy = _a.policy;
    var allTransactions = (0, useOnyx_1.default)(ONYXKEYS_1.default.COLLECTION.TRANSACTION, { canBeMissing: false })[0];
    var allReports = (0, useOnyx_1.default)(ONYXKEYS_1.default.COLLECTION.REPORT, { canBeMissing: true })[0];
    var policyCategories = (0, useOnyx_1.default)("".concat(ONYXKEYS_1.default.COLLECTION.POLICY_CATEGORIES).concat((0, getNonEmptyStringOnyxID_1.default)(report === null || report === void 0 ? void 0 : report.policyID)), { canBeMissing: true })[0];
    var allPolicyRecentlyUsedCategories = (0, useOnyx_1.default)(ONYXKEYS_1.default.COLLECTION.POLICY_RECENTLY_USED_CATEGORIES, { canBeMissing: true })[0];
    var allReportNameValuePairs = (0, useOnyx_1.default)(ONYXKEYS_1.default.COLLECTION.REPORT_NAME_VALUE_PAIRS, { canBeMissing: true })[0];
    var isBetaEnabled = (0, usePermissions_1.default)().isBetaEnabled;
    var archivedReportsIdSet = (0, useArchivedReportsIdSet_1.default)();
    /**
     * Delete transactions by IDs
     * @param transactionIDs - Array of transaction IDs to delete
     * @param duplicateTransactions - Collection of duplicate transactions
     * @param duplicateTransactionViolations - Collection of duplicate transaction violations
     * @param currentSearchHash - Current search hash for updating split transactions
     * @param onClearSelection - Optional callback to clear selection after deletion
     * @param isSingleTransactionView - Optional flag indicating if the deletion is from a single transaction view
     * @returns Array of deleted transaction thread report IDs for navigation handling
     */
    var deleteTransactions = (0, react_1.useCallback)(function (transactionIDs, duplicateTransactions, duplicateTransactionViolations, currentSearchHash, isSingleTransactionView) {
        if (!transactionIDs.length) {
            return [];
        }
        var iouActions = reportActions.filter(function (action) { return (0, ReportActionsUtils_1.isMoneyRequestAction)(action); });
        var transactionsWithActions = transactionIDs.map(function (transactionID) { return ({
            transactionID: transactionID,
            transaction: allTransactions === null || allTransactions === void 0 ? void 0 : allTransactions["".concat(ONYXKEYS_1.default.COLLECTION.TRANSACTION).concat(transactionID)],
            action: iouActions.find(function (action) {
                var _a;
                var IOUTransactionID = (_a = (0, ReportActionsUtils_1.getOriginalMessage)(action)) === null || _a === void 0 ? void 0 : _a.IOUTransactionID;
                return transactionID === IOUTransactionID;
            }),
        }); });
        var deletedTransactionIDs = [];
        var deletedTransactionThreadReportIDs = new Set();
        var _a = transactionsWithActions.reduce(function (acc, item) {
            var _a, _b;
            var _c;
            var transaction = item.transaction;
            var isExpenseSplit = (0, TransactionUtils_1.getOriginalTransactionWithSplitInfo)(transaction).isExpenseSplit;
            var originalTransactionID = (_a = transaction === null || transaction === void 0 ? void 0 : transaction.comment) === null || _a === void 0 ? void 0 : _a.originalTransactionID;
            if (isExpenseSplit && originalTransactionID) {
                (_b = (_c = acc.splitTransactionsByOriginalTransactionID)[originalTransactionID]) !== null && _b !== void 0 ? _b : (_c[originalTransactionID] = []);
                acc.splitTransactionsByOriginalTransactionID[originalTransactionID].push(item);
            }
            else {
                acc.nonSplitTransactions.push(item);
            }
            return acc;
        }, { splitTransactionsByOriginalTransactionID: {}, nonSplitTransactions: [] }), splitTransactionsByOriginalTransactionID = _a.splitTransactionsByOriginalTransactionID, nonSplitTransactions = _a.nonSplitTransactions;
        Object.keys(splitTransactionsByOriginalTransactionID).forEach(function (transactionID) {
            var _a, _b, _c, _d;
            var splitIDs = new Set(((_a = splitTransactionsByOriginalTransactionID[transactionID]) !== null && _a !== void 0 ? _a : []).map(function (transaction) { return transaction.transactionID; }));
            var childTransactions = (0, TransactionUtils_1.getChildTransactions)(allTransactions, allReports, transactionID).filter(function (transaction) { var _a; return !splitIDs.has((_a = transaction === null || transaction === void 0 ? void 0 : transaction.transactionID) !== null && _a !== void 0 ? _a : String(CONST_1.default.DEFAULT_NUMBER_ID)); });
            if (childTransactions.length === 0) {
                nonSplitTransactions.push.apply(nonSplitTransactions, splitTransactionsByOriginalTransactionID[transactionID]);
                return;
            }
            var originalTransaction = allTransactions === null || allTransactions === void 0 ? void 0 : allTransactions["".concat(ONYXKEYS_1.default.COLLECTION.TRANSACTION).concat(transactionID)];
            var originalTransactionIouActions = (0, IOU_1.getIOUActionForTransactions)([transactionID], report === null || report === void 0 ? void 0 : report.reportID);
            var iouReportID = (0, ReportActionsUtils_1.isMoneyRequestAction)(originalTransactionIouActions.at(0)) ? (_b = (0, ReportActionsUtils_1.getOriginalMessage)(originalTransactionIouActions.at(0))) === null || _b === void 0 ? void 0 : _b.IOUReportID : undefined;
            var iouReport = allReports === null || allReports === void 0 ? void 0 : allReports["".concat(ONYXKEYS_1.default.COLLECTION.REPORT).concat(iouReportID)];
            var policyRecentlyUsedCategories = (_c = allPolicyRecentlyUsedCategories === null || allPolicyRecentlyUsedCategories === void 0 ? void 0 : allPolicyRecentlyUsedCategories["".concat(ONYXKEYS_1.default.COLLECTION.POLICY_RECENTLY_USED_CATEGORIES).concat((0, getNonEmptyStringOnyxID_1.default)((0, IOU_1.getIOURequestPolicyID)(originalTransaction, report)))]) !== null && _c !== void 0 ? _c : [];
            (0, IOU_1.updateSplitTransactions)({
                allTransactionsList: allTransactions,
                allReportsList: allReports,
                allReportNameValuePairsList: allReportNameValuePairs,
                transactionData: {
                    reportID: (_d = report === null || report === void 0 ? void 0 : report.reportID) !== null && _d !== void 0 ? _d : String(CONST_1.default.DEFAULT_NUMBER_ID),
                    originalTransactionID: transactionID,
                    splitExpenses: childTransactions.map(function (childTransaction) { return (0, IOU_1.initSplitExpenseItemData)(childTransaction); }),
                },
                hash: currentSearchHash !== null && currentSearchHash !== void 0 ? currentSearchHash : 0,
                policyCategories: policyCategories,
                policy: policy,
                policyRecentlyUsedCategories: policyRecentlyUsedCategories,
                iouReport: iouReport,
                firstIOU: originalTransactionIouActions.at(0),
                isASAPSubmitBetaEnabled: isBetaEnabled(CONST_1.default.BETAS.ASAP_SUBMIT),
            });
        });
        nonSplitTransactions.forEach(function (_a) {
            var _b;
            var transactionID = _a.transactionID, action = _a.action;
            if (!action) {
                return;
            }
            var iouReportID = (0, ReportActionsUtils_1.isMoneyRequestAction)(action) ? (_b = (0, ReportActionsUtils_1.getOriginalMessage)(action)) === null || _b === void 0 ? void 0 : _b.IOUReportID : undefined;
            var iouReport = allReports === null || allReports === void 0 ? void 0 : allReports["".concat(ONYXKEYS_1.default.COLLECTION.REPORT).concat(iouReportID)];
            var chatReport = allReports === null || allReports === void 0 ? void 0 : allReports["".concat(ONYXKEYS_1.default.COLLECTION.REPORT).concat(iouReport === null || iouReport === void 0 ? void 0 : iouReport.chatReportID)];
            var chatIOUReportID = chatReport === null || chatReport === void 0 ? void 0 : chatReport.reportID;
            var isChatIOUReportArchived = archivedReportsIdSet.has("".concat(ONYXKEYS_1.default.COLLECTION.REPORT_NAME_VALUE_PAIRS).concat(chatIOUReportID));
            (0, IOU_1.deleteMoneyRequest)(transactionID, action, duplicateTransactions, duplicateTransactionViolations, iouReport, chatReport, isChatIOUReportArchived, isSingleTransactionView, deletedTransactionIDs, transactionIDs);
            deletedTransactionIDs.push(transactionID);
            if (action.childReportID) {
                deletedTransactionThreadReportIDs.add(action.childReportID);
            }
        });
        return Array.from(deletedTransactionThreadReportIDs);
    }, [reportActions, allTransactions, allReports, report, allReportNameValuePairs, allPolicyRecentlyUsedCategories, policyCategories, policy, archivedReportsIdSet, isBetaEnabled]);
    return {
        deleteTransactions: deleteTransactions,
    };
}
exports.default = useDeleteTransactions;
