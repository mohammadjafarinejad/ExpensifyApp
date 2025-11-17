"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupMergeTransactionData = setupMergeTransactionData;
exports.setMergeTransactionKey = setMergeTransactionKey;
exports.getTransactionsForMerging = getTransactionsForMerging;
exports.mergeTransactionRequest = mergeTransactionRequest;
exports.areTransactionsEligibleForMerge = areTransactionsEligibleForMerge;
var fast_equals_1 = require("fast-equals");
var react_native_onyx_1 = require("react-native-onyx");
var API = require("@libs/API");
var types_1 = require("@libs/API/types");
var MergeTransactionUtils_1 = require("@libs/MergeTransactionUtils");
var PolicyUtils_1 = require("@libs/PolicyUtils");
var ReportActionsUtils_1 = require("@libs/ReportActionsUtils");
var ReportUtils_1 = require("@libs/ReportUtils");
var CONST_1 = require("@src/CONST");
var TransactionUtils_1 = require("@src/libs/TransactionUtils");
var ONYXKEYS_1 = require("@src/ONYXKEYS");
var IOU_1 = require("./IOU");
/**
 * Setup merge transaction data for merging flow
 */
function setupMergeTransactionData(transactionID, values) {
    react_native_onyx_1.default.set("".concat(ONYXKEYS_1.default.COLLECTION.MERGE_TRANSACTION).concat(transactionID), values);
}
/**
 * Sets merge transaction data for a specific transaction
 */
function setMergeTransactionKey(transactionID, values) {
    react_native_onyx_1.default.merge("".concat(ONYXKEYS_1.default.COLLECTION.MERGE_TRANSACTION).concat(transactionID), values);
}
/**
 * Fetches eligible transactions for merging
 */
function getTransactionsForMergingFromAPI(transactionID) {
    var parameters = {
        transactionID: transactionID,
    };
    API.read(types_1.READ_COMMANDS.GET_TRANSACTIONS_FOR_MERGING, parameters);
}
function areTransactionsEligibleForMerge(transaction1, transaction2) {
    // Do not allow merging two card transactions
    if ((0, TransactionUtils_1.isManagedCardTransaction)(transaction1) && (0, TransactionUtils_1.isManagedCardTransaction)(transaction2)) {
        return false;
    }
    // Do not allow merging two $0 transactions
    if ((0, TransactionUtils_1.getAmount)(transaction1, false, false) === 0 && (0, TransactionUtils_1.getAmount)(transaction2, false, false) === 0) {
        return false;
    }
    // Do not allow merging a per diem and a card transaction
    if (((0, TransactionUtils_1.isPerDiemRequest)(transaction1) && (0, TransactionUtils_1.isManagedCardTransaction)(transaction2)) || ((0, TransactionUtils_1.isPerDiemRequest)(transaction2) && (0, TransactionUtils_1.isManagedCardTransaction)(transaction1))) {
        return false;
    }
    // Temporary exclude IOU reports from eligible list
    // See: https://github.com/Expensify/App/issues/70329#issuecomment-3277062003
    if ((0, ReportUtils_1.isIOUReport)(transaction1.reportID) || (0, ReportUtils_1.isIOUReport)(transaction2.reportID)) {
        return false;
    }
    if ((0, TransactionUtils_1.isDistanceRequest)(transaction1) !== (0, TransactionUtils_1.isDistanceRequest)(transaction2)) {
        return false;
    }
    return true;
}
/**
 * Fetches eligible transactions for merging locally
 * This is FE version of READ_COMMANDS.GET_TRANSACTIONS_FOR_MERGING API call
 */
function getTransactionsForMergingLocally(transactionID, targetTransaction, transactions) {
    var transactionsArray = Object.values(transactions !== null && transactions !== void 0 ? transactions : {});
    var eligibleTransactions = transactionsArray.filter(function (transaction) {
        if (!transaction || transaction.transactionID === targetTransaction.transactionID) {
            return false;
        }
        var isUnreportedExpense = !(transaction === null || transaction === void 0 ? void 0 : transaction.reportID) || (transaction === null || transaction === void 0 ? void 0 : transaction.reportID) === CONST_1.default.REPORT.UNREPORTED_REPORT_ID;
        return (areTransactionsEligibleForMerge(targetTransaction, transaction) &&
            !(0, TransactionUtils_1.isTransactionPendingDelete)(transaction) &&
            (isUnreportedExpense || (!!transaction.reportID && (0, ReportUtils_1.isMoneyRequestReportEligibleForMerge)(transaction.reportID, false))));
    });
    react_native_onyx_1.default.merge("".concat(ONYXKEYS_1.default.COLLECTION.MERGE_TRANSACTION).concat(transactionID), {
        eligibleTransactions: eligibleTransactions,
    });
}
function getTransactionsForMerging(_a) {
    var isOffline = _a.isOffline, targetTransaction = _a.targetTransaction, transactions = _a.transactions, policy = _a.policy, report = _a.report, currentUserLogin = _a.currentUserLogin;
    var transactionID = targetTransaction.transactionID;
    // Collect/Control workspaces:
    // - Admins and approvers: The list of eligible expenses will only contain the expenses from the report that the admin/approver triggered the merge from. This is intentionally limited since they’ll only be reviewing one report at a time.
    // - Submitters will see all their editable expenses, including their IOUs/unreported expenses
    // IOU:
    // - There are no admins/approvers outside of the submitter in these cases, so there’s no consideration for different roles.
    // - The submitter, who is also the admin, will see all their editable expenses, including their IOUs/unreported expenses
    var isAdmin = (0, PolicyUtils_1.isPolicyAdmin)(policy, currentUserLogin);
    var isManager = (0, ReportUtils_1.isReportManager)(report);
    if ((0, PolicyUtils_1.isPaidGroupPolicy)(policy) && (isAdmin || isManager) && !(0, ReportUtils_1.isCurrentUserSubmitter)(report)) {
        var reportTransactions = (0, ReportUtils_1.getReportTransactions)(report === null || report === void 0 ? void 0 : report.reportID);
        var eligibleTransactions = reportTransactions.filter(function (transaction) {
            if (!transaction || transaction.transactionID === transactionID) {
                return false;
            }
            return areTransactionsEligibleForMerge(targetTransaction, transaction);
        });
        react_native_onyx_1.default.merge("".concat(ONYXKEYS_1.default.COLLECTION.MERGE_TRANSACTION).concat(transactionID), {
            eligibleTransactions: eligibleTransactions,
        });
        return;
    }
    if (isOffline) {
        getTransactionsForMergingLocally(transactionID, targetTransaction, transactions);
    }
    else {
        getTransactionsForMergingFromAPI(transactionID);
    }
}
function getOnyxTargetTransactionData(targetTransaction, mergeTransaction, policy, policyTags, policyCategories) {
    var _a, _b, _c, _d, _e, _f, _g;
    var data;
    var isUnreportedExpense = !mergeTransaction.reportID || mergeTransaction.reportID === CONST_1.default.REPORT.UNREPORTED_REPORT_ID;
    var transactionThreadReportID = (0, MergeTransactionUtils_1.getTransactionThreadReportID)(targetTransaction);
    var violations = (0, TransactionUtils_1.getTransactionViolationsOfTransaction)(targetTransaction.transactionID);
    // Compare mergeTransaction with targetTransaction and remove fields with same values
    var targetTransactionDetails = (0, ReportUtils_1.getTransactionDetails)(targetTransaction);
    var filteredTransactionChanges = Object.fromEntries(Object.entries(mergeTransaction).filter(function (_a) {
        var key = _a[0], mergeValue = _a[1];
        if (!MergeTransactionUtils_1.MERGE_FIELDS.includes(key)) {
            return false;
        }
        var targetValue = (0, MergeTransactionUtils_1.getMergeFieldValue)(targetTransactionDetails, targetTransaction, key);
        return !(0, fast_equals_1.deepEqual)(mergeValue, targetValue);
    }));
    filteredTransactionChanges.comment = filteredTransactionChanges.description;
    var shouldBuildOptimisticModifiedExpenseReportAction = false;
    if (isUnreportedExpense) {
        data = (0, IOU_1.getUpdateTrackExpenseParams)(targetTransaction.transactionID, transactionThreadReportID, filteredTransactionChanges, policy, shouldBuildOptimisticModifiedExpenseReportAction);
    }
    else {
        data = (0, IOU_1.getUpdateMoneyRequestParams)({
            transactionID: targetTransaction.transactionID,
            transactionThreadReportID: transactionThreadReportID,
            transactionChanges: filteredTransactionChanges,
            policy: policy,
            policyTagList: policyTags,
            policyCategories: policyCategories,
            violations: violations,
            shouldBuildOptimisticModifiedExpenseReportAction: shouldBuildOptimisticModifiedExpenseReportAction,
        });
    }
    var onyxData = data.onyxData;
    (_a = onyxData.optimisticData) === null || _a === void 0 ? void 0 : _a.push({
        onyxMethod: react_native_onyx_1.default.METHOD.MERGE,
        key: "".concat(ONYXKEYS_1.default.COLLECTION.TRANSACTION).concat(targetTransaction.transactionID),
        value: {
            receipt: (_b = mergeTransaction.receipt) !== null && _b !== void 0 ? _b : null,
        },
    });
    // getUpdateMoneyRequestParams currently derives optimistic distance data from transaction.routes.
    // In the merge flow, the selected merchant determines waypoints/customUnit => we can optimistic distance data from the selected merchant's waypoints/customUnit instead of transaction.routes
    if ((0, TransactionUtils_1.isDistanceRequest)(targetTransaction)) {
        (_c = onyxData.optimisticData) === null || _c === void 0 ? void 0 : _c.push({
            onyxMethod: react_native_onyx_1.default.METHOD.MERGE,
            key: "".concat(ONYXKEYS_1.default.COLLECTION.TRANSACTION).concat(targetTransaction.transactionID),
            value: {
                comment: {
                    waypoints: (_d = mergeTransaction.waypoints) !== null && _d !== void 0 ? _d : null,
                    customUnit: (_e = mergeTransaction.customUnit) !== null && _e !== void 0 ? _e : null,
                },
                routes: (_f = mergeTransaction.routes) !== null && _f !== void 0 ? _f : null,
                iouRequestType: (_g = mergeTransaction.iouRequestType) !== null && _g !== void 0 ? _g : null,
            },
        });
    }
    return onyxData;
}
/**
 * Merges two transactions by updating the target transaction with selected fields and deleting the source transaction
 */
function mergeTransactionRequest(_a) {
    var _b, _c, _d;
    var _e, _f, _g, _h, _j;
    var mergeTransactionID = _a.mergeTransactionID, mergeTransaction = _a.mergeTransaction, targetTransaction = _a.targetTransaction, sourceTransaction = _a.sourceTransaction, policy = _a.policy, policyTags = _a.policyTags, policyCategories = _a.policyCategories;
    // For both unreported expenses and expense reports, negate the display amount when storing
    // This preserves the user's chosen sign while following the storage convention
    var finalAmount = -mergeTransaction.amount;
    // Call the merge transaction action
    var params = {
        transactionID: mergeTransaction.targetTransactionID,
        transactionIDList: [mergeTransaction.sourceTransactionID],
        created: mergeTransaction.created,
        merchant: mergeTransaction.merchant,
        amount: finalAmount,
        currency: mergeTransaction.currency,
        category: mergeTransaction.category,
        comment: JSON.stringify(__assign(__assign({}, targetTransaction.comment), { comment: mergeTransaction.description, customUnit: mergeTransaction.customUnit, waypoints: (_e = mergeTransaction.waypoints) !== null && _e !== void 0 ? _e : null, attendees: mergeTransaction.attendees })),
        billable: mergeTransaction.billable,
        reimbursable: mergeTransaction.reimbursable,
        tag: mergeTransaction.tag,
        receiptID: (_f = mergeTransaction.receipt) === null || _f === void 0 ? void 0 : _f.receiptID,
        reportID: mergeTransaction.reportID,
    };
    var onyxTargetTransactionData = getOnyxTargetTransactionData(targetTransaction, mergeTransaction, policy, policyTags, policyCategories);
    // Optimistic delete the source transaction and also delete its report if it was a single expense report
    var optimisticSourceTransactionData = {
        onyxMethod: react_native_onyx_1.default.METHOD.SET,
        key: "".concat(ONYXKEYS_1.default.COLLECTION.TRANSACTION).concat(sourceTransaction.transactionID),
        value: null,
    };
    var failureSourceTransactionData = {
        onyxMethod: react_native_onyx_1.default.METHOD.SET,
        key: "".concat(ONYXKEYS_1.default.COLLECTION.TRANSACTION).concat(sourceTransaction.transactionID),
        value: sourceTransaction,
    };
    var transactionsOfSourceReport = (0, ReportUtils_1.getReportTransactions)(sourceTransaction.reportID);
    var optimisticSourceReportData = transactionsOfSourceReport.length === 1
        ? [
            {
                onyxMethod: react_native_onyx_1.default.METHOD.SET,
                key: "".concat(ONYXKEYS_1.default.COLLECTION.REPORT).concat(sourceTransaction.reportID),
                value: null,
            },
        ]
        : [];
    // @ts-expect-error - will be solved in https://github.com/Expensify/App/issues/73830
    var failureSourceReportData = transactionsOfSourceReport.length === 1
        ? [
            {
                onyxMethod: react_native_onyx_1.default.METHOD.SET,
                key: "".concat(ONYXKEYS_1.default.COLLECTION.REPORT).concat(sourceTransaction.reportID),
                value: (0, ReportUtils_1.getReportOrDraftReport)(sourceTransaction.reportID),
            },
        ]
        : [];
    var iouActionOfSourceTransaction = (0, ReportActionsUtils_1.getIOUActionForReportID)(sourceTransaction.reportID, sourceTransaction.transactionID);
    var optimisticSourceReportActionData = iouActionOfSourceTransaction
        ? [
            {
                onyxMethod: react_native_onyx_1.default.METHOD.MERGE,
                key: "".concat(ONYXKEYS_1.default.COLLECTION.REPORT_ACTIONS).concat(sourceTransaction.reportID),
                value: (_b = {},
                    _b[iouActionOfSourceTransaction.reportActionID] = {
                        pendingAction: CONST_1.default.RED_BRICK_ROAD_PENDING_ACTION.DELETE,
                    },
                    _b),
            },
        ]
        : [];
    var successSourceReportActionData = iouActionOfSourceTransaction
        ? [
            {
                onyxMethod: react_native_onyx_1.default.METHOD.MERGE,
                key: "".concat(ONYXKEYS_1.default.COLLECTION.REPORT_ACTIONS).concat(sourceTransaction.reportID),
                value: (_c = {},
                    _c[iouActionOfSourceTransaction.reportActionID] = {
                        pendingAction: null,
                    },
                    _c),
            },
        ]
        : [];
    var failureSourceReportActionData = iouActionOfSourceTransaction
        ? [
            {
                onyxMethod: react_native_onyx_1.default.METHOD.MERGE,
                key: "".concat(ONYXKEYS_1.default.COLLECTION.REPORT_ACTIONS).concat(sourceTransaction.reportID),
                value: (_d = {},
                    _d[iouActionOfSourceTransaction.reportActionID] = {
                        pendingAction: null,
                    },
                    _d),
            },
        ]
        : [];
    // Optimistic delete the merge transaction
    var optimisticMergeTransactionData = {
        onyxMethod: react_native_onyx_1.default.METHOD.SET,
        key: "".concat(ONYXKEYS_1.default.COLLECTION.MERGE_TRANSACTION).concat(mergeTransactionID),
        value: null,
    };
    // Optimistic delete duplicated transaction violations
    var optimisticTransactionViolations = [targetTransaction.transactionID, sourceTransaction.transactionID].map(function (id) {
        var violations = (0, TransactionUtils_1.getTransactionViolationsOfTransaction)(id);
        return {
            onyxMethod: react_native_onyx_1.default.METHOD.MERGE,
            key: "".concat(ONYXKEYS_1.default.COLLECTION.TRANSACTION_VIOLATIONS).concat(id),
            // @ts-expect-error - will be solved in https://github.com/Expensify/App/issues/73830
            value: violations.filter(function (violation) { return violation.name !== CONST_1.default.VIOLATIONS.DUPLICATED_TRANSACTION; }),
        };
    });
    var failureTransactionViolations = [targetTransaction.transactionID, sourceTransaction.transactionID].map(function (id) {
        var violations = (0, TransactionUtils_1.getTransactionViolationsOfTransaction)(id);
        return {
            onyxMethod: react_native_onyx_1.default.METHOD.MERGE,
            key: "".concat(ONYXKEYS_1.default.COLLECTION.TRANSACTION_VIOLATIONS).concat(id),
            value: violations,
        };
    });
    // @ts-expect-error - will be solved in https://github.com/Expensify/App/issues/73830
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    var optimisticData = __spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray([], ((_g = onyxTargetTransactionData.optimisticData) !== null && _g !== void 0 ? _g : []), true), [
        optimisticSourceTransactionData
    ], false), optimisticSourceReportData, true), [
        optimisticMergeTransactionData
    ], false), optimisticTransactionViolations, true), optimisticSourceReportActionData, true);
    // @ts-expect-error - will be solved in https://github.com/Expensify/App/issues/73830
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    var failureData = __spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray([], ((_h = onyxTargetTransactionData.failureData) !== null && _h !== void 0 ? _h : []), true), [
        failureSourceTransactionData
    ], false), failureSourceReportData, true), failureTransactionViolations, true), failureSourceReportActionData, true);
    var successData = [];
    successData.push.apply(successData, successSourceReportActionData);
    successData.push.apply(successData, ((_j = onyxTargetTransactionData.successData) !== null && _j !== void 0 ? _j : []));
    API.write(types_1.WRITE_COMMANDS.MERGE_TRANSACTION, params, { optimisticData: optimisticData, failureData: failureData, successData: successData });
}
