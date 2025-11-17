"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSecondaryReportActions = getSecondaryReportActions;
exports.getSecondaryTransactionThreadActions = getSecondaryTransactionThreadActions;
exports.isMergeAction = isMergeAction;
exports.getSecondaryExportReportActions = getSecondaryExportReportActions;
exports.isSplitAction = isSplitAction;
var CONST_1 = require("@src/CONST");
var ONYXKEYS_1 = require("@src/ONYXKEYS");
var Member_1 = require("./actions/Policy/Member");
var Report_1 = require("./actions/Report");
var PersonalDetailsUtils_1 = require("./PersonalDetailsUtils");
var PolicyUtils_1 = require("./PolicyUtils");
var ReportActionsUtils_1 = require("./ReportActionsUtils");
var ReportPrimaryActionUtils_1 = require("./ReportPrimaryActionUtils");
var ReportUtils_1 = require("./ReportUtils");
var SessionUtils_1 = require("./SessionUtils");
var TransactionUtils_1 = require("./TransactionUtils");
function isAddExpenseAction(report, reportTransactions, isReportArchived) {
    if (isReportArchived === void 0) { isReportArchived = false; }
    var isReportSubmitter = (0, ReportUtils_1.isCurrentUserSubmitter)(report);
    if (!isReportSubmitter) {
        return false;
    }
    return (0, ReportUtils_1.canAddTransaction)(report, isReportArchived);
}
function isSplitAction(report, reportTransactions, policy) {
    var _a, _b;
    if (Number(reportTransactions === null || reportTransactions === void 0 ? void 0 : reportTransactions.length) !== 1) {
        return false;
    }
    var reportTransaction = reportTransactions.at(0);
    var isScanning = (0, TransactionUtils_1.hasReceipt)(reportTransaction) && (0, TransactionUtils_1.isReceiptBeingScanned)(reportTransaction);
    if ((0, TransactionUtils_1.isPending)(reportTransaction) || isScanning || !!(reportTransaction === null || reportTransaction === void 0 ? void 0 : reportTransaction.errors)) {
        return false;
    }
    var amount = ((_a = (0, ReportUtils_1.getTransactionDetails)(reportTransaction)) !== null && _a !== void 0 ? _a : {}).amount;
    if (!amount) {
        return false;
    }
    var isBillSplit = (0, TransactionUtils_1.getOriginalTransactionWithSplitInfo)(reportTransaction).isBillSplit;
    if (isBillSplit) {
        return false;
    }
    if (!(0, ReportUtils_1.isExpenseReport)(report)) {
        return false;
    }
    if (report.statusNum && report.statusNum >= CONST_1.default.REPORT.STATUS_NUM.CLOSED) {
        return false;
    }
    if ((0, ReportUtils_1.hasOnlyNonReimbursableTransactions)(report.reportID) && (0, PolicyUtils_1.isSubmitAndClose)(policy) && (0, PolicyUtils_1.isInstantSubmitEnabled)(policy)) {
        return false;
    }
    var isSubmitter = (0, ReportUtils_1.isCurrentUserSubmitter)(report);
    var isAdmin = (policy === null || policy === void 0 ? void 0 : policy.role) === CONST_1.default.POLICY.ROLE.ADMIN;
    var isManager = ((_b = report.managerID) !== null && _b !== void 0 ? _b : CONST_1.default.DEFAULT_NUMBER_ID) === (0, Report_1.getCurrentUserAccountID)();
    var isOpenReport = (0, ReportUtils_1.isOpenReport)(report);
    var isPolicyExpenseChat = !!(policy === null || policy === void 0 ? void 0 : policy.isPolicyExpenseChatEnabled);
    var currentUserEmail = (0, Report_1.getCurrentUserEmail)();
    var userIsPolicyMember = (0, PolicyUtils_1.isPolicyMember)(policy, currentUserEmail);
    if (!(userIsPolicyMember && isPolicyExpenseChat)) {
        return false;
    }
    if (isOpenReport) {
        return isSubmitter || isAdmin;
    }
    // Hide split option for the submitter if the report is forwarded
    return (isSubmitter && (0, ReportUtils_1.isAwaitingFirstLevelApproval)(report)) || isAdmin || isManager;
}
function isSubmitAction(report, reportTransactions, policy, reportNameValuePairs, reportActions, isChatReportArchived, primaryAction) {
    var _a;
    if (isChatReportArchived === void 0) { isChatReportArchived = false; }
    if ((0, ReportUtils_1.isArchivedReport)(reportNameValuePairs) || isChatReportArchived) {
        return false;
    }
    var transactionAreComplete = reportTransactions.every(function (transaction) { return transaction.amount !== 0 || transaction.modifiedAmount !== 0; });
    if (!transactionAreComplete) {
        return false;
    }
    if (primaryAction === CONST_1.default.REPORT.PRIMARY_ACTIONS.MARK_AS_RESOLVED) {
        return false;
    }
    if (reportTransactions.length > 0 && reportTransactions.every(function (transaction) { return (0, TransactionUtils_1.isPending)(transaction); })) {
        return false;
    }
    var isExpenseReport = (0, ReportUtils_1.isExpenseReport)(report);
    if (!isExpenseReport || (report === null || report === void 0 ? void 0 : report.total) === 0) {
        return false;
    }
    var isReportSubmitter = (0, ReportUtils_1.isCurrentUserSubmitter)(report);
    var isAdmin = (policy === null || policy === void 0 ? void 0 : policy.role) === CONST_1.default.POLICY.ROLE.ADMIN;
    var isManager = report.managerID === (0, Report_1.getCurrentUserAccountID)();
    if (!isReportSubmitter && !isAdmin && !isManager) {
        return false;
    }
    var isOpenReport = (0, ReportUtils_1.isOpenReport)(report);
    if (!isOpenReport) {
        return false;
    }
    var submitToAccountID = (0, PolicyUtils_1.getSubmitToAccountID)(policy, report);
    if (submitToAccountID === report.ownerAccountID && (policy === null || policy === void 0 ? void 0 : policy.preventSelfApproval)) {
        return false;
    }
    var hasReportBeenRetracted = (0, ReportUtils_1.hasReportBeenReopened)(report, reportActions) || (0, ReportUtils_1.hasReportBeenRetracted)(report, reportActions);
    var isPrimarySubmitAction = primaryAction === CONST_1.default.REPORT.PRIMARY_ACTIONS.SUBMIT;
    if (hasReportBeenRetracted && isReportSubmitter && isPrimarySubmitAction) {
        return false;
    }
    if (hasReportBeenRetracted && isReportSubmitter && !isPrimarySubmitAction) {
        return true;
    }
    if (isAdmin || isManager) {
        return true;
    }
    var autoReportingFrequency = (0, PolicyUtils_1.getCorrectedAutoReportingFrequency)(policy);
    var isScheduledSubmitEnabled = ((_a = policy === null || policy === void 0 ? void 0 : policy.harvesting) === null || _a === void 0 ? void 0 : _a.enabled) && autoReportingFrequency !== CONST_1.default.POLICY.AUTO_REPORTING_FREQUENCIES.MANUAL;
    return !!isScheduledSubmitEnabled || !isPrimarySubmitAction;
}
function isApproveAction(currentUserLogin, report, reportTransactions, violations, policy) {
    var _a;
    var isAnyReceiptBeingScanned = reportTransactions === null || reportTransactions === void 0 ? void 0 : reportTransactions.some(function (transaction) { return (0, TransactionUtils_1.isReceiptBeingScanned)(transaction); });
    if (isAnyReceiptBeingScanned) {
        return false;
    }
    var currentUserAccountID = (0, Report_1.getCurrentUserAccountID)();
    var managerID = (_a = report === null || report === void 0 ? void 0 : report.managerID) !== null && _a !== void 0 ? _a : CONST_1.default.DEFAULT_NUMBER_ID;
    var isCurrentUserManager = managerID === currentUserAccountID;
    if (!isCurrentUserManager) {
        return false;
    }
    var isProcessingReport = (0, ReportUtils_1.isProcessingReport)(report);
    if (!isProcessingReport) {
        return false;
    }
    var isPreventSelfApprovalEnabled = policy === null || policy === void 0 ? void 0 : policy.preventSelfApproval;
    var isReportSubmitter = (0, ReportUtils_1.isCurrentUserSubmitter)(report);
    if (isPreventSelfApprovalEnabled && isReportSubmitter) {
        return false;
    }
    var isExpenseReport = (0, ReportUtils_1.isExpenseReport)(report);
    var reportHasDuplicatedTransactions = reportTransactions.some(function (transaction) { return (0, TransactionUtils_1.isDuplicate)(transaction); });
    if (isExpenseReport && isProcessingReport && reportHasDuplicatedTransactions) {
        return true;
    }
    if (reportTransactions.length > 0 && reportTransactions.every(function (transaction) { return (0, TransactionUtils_1.isPending)(transaction); })) {
        return false;
    }
    var transactionIDs = reportTransactions.map(function (t) { return t.transactionID; });
    var hasAllPendingRTERViolations = (0, TransactionUtils_1.allHavePendingRTERViolation)(reportTransactions, violations);
    if (hasAllPendingRTERViolations) {
        return true;
    }
    var isAdmin = (policy === null || policy === void 0 ? void 0 : policy.role) === CONST_1.default.POLICY.ROLE.ADMIN;
    var shouldShowBrokenConnectionViolation = (0, TransactionUtils_1.shouldShowBrokenConnectionViolationForMultipleTransactions)(transactionIDs, report, policy, violations);
    var isReportApprover = (0, Member_1.isApprover)(policy, currentUserLogin);
    var userControlsReport = isReportApprover || isAdmin;
    return userControlsReport && shouldShowBrokenConnectionViolation;
}
function isUnapproveAction(currentUserLogin, report, policy) {
    var isExpenseReport = (0, ReportUtils_1.isExpenseReport)(report);
    var isReportApprover = (0, Member_1.isApprover)(policy, currentUserLogin);
    var isReportApproved = (0, ReportUtils_1.isReportApproved)({ report: report });
    var isReportSettled = (0, ReportUtils_1.isSettled)(report);
    var isPaymentProcessing = report.isWaitingOnBankAccount && report.statusNum === CONST_1.default.REPORT.STATUS_NUM.APPROVED;
    var isAdmin = (policy === null || policy === void 0 ? void 0 : policy.role) === CONST_1.default.POLICY.ROLE.ADMIN;
    var isManager = report.managerID === (0, Report_1.getCurrentUserAccountID)();
    if (isReportSettled || !isExpenseReport || !isReportApproved || isPaymentProcessing) {
        return false;
    }
    if (report.statusNum === CONST_1.default.REPORT.STATUS_NUM.APPROVED) {
        return isManager || isAdmin;
    }
    return isReportApprover;
}
function isCancelPaymentAction(report, reportTransactions, policy) {
    var isExpenseReport = (0, ReportUtils_1.isExpenseReport)(report);
    if (!isExpenseReport) {
        return false;
    }
    var isAdmin = (policy === null || policy === void 0 ? void 0 : policy.role) === CONST_1.default.POLICY.ROLE.ADMIN;
    var isPayer = (0, ReportUtils_1.isPayer)((0, SessionUtils_1.getSession)(), report, false, policy);
    if (!isAdmin || !isPayer) {
        return false;
    }
    var isReportPaidElsewhere = report.stateNum === CONST_1.default.REPORT.STATE_NUM.APPROVED && report.statusNum === CONST_1.default.REPORT.STATUS_NUM.REIMBURSED;
    if (isReportPaidElsewhere) {
        return true;
    }
    var isPaymentProcessing = !!report.isWaitingOnBankAccount && report.statusNum === CONST_1.default.REPORT.STATUS_NUM.APPROVED;
    var payActions = reportTransactions.reduce(function (acc, transaction) {
        var action = (0, ReportActionsUtils_1.getIOUActionForReportID)(report.reportID, transaction.transactionID);
        if (action && (0, ReportActionsUtils_1.isPayAction)(action)) {
            acc.push(action);
        }
        return acc;
    }, []);
    var hasDailyNachaCutoffPassed = payActions.some(function (action) {
        var now = new Date();
        var paymentDatetime = new Date(action.created);
        var nowUTC = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds()));
        var cutoffTimeUTC = new Date(Date.UTC(paymentDatetime.getUTCFullYear(), paymentDatetime.getUTCMonth(), paymentDatetime.getUTCDate(), 23, 45, 0));
        return nowUTC.getTime() < cutoffTimeUTC.getTime();
    });
    return isPaymentProcessing && !hasDailyNachaCutoffPassed;
}
function isExportAction(report, policy) {
    if (!policy) {
        return false;
    }
    var hasAccountingConnection = !!(0, PolicyUtils_1.getValidConnectedIntegration)(policy);
    if (!hasAccountingConnection) {
        return false;
    }
    var isInvoiceReport = (0, ReportUtils_1.isInvoiceReport)(report);
    // We don't allow export to accounting for invoice reports in OD so we want to align with that here.
    if (isInvoiceReport) {
        return false;
    }
    var isExpenseReport = (0, ReportUtils_1.isExpenseReport)(report);
    if (!isExpenseReport) {
        return false;
    }
    var isReportApproved = (0, ReportUtils_1.isReportApproved)({ report: report });
    var isReportPayer = (0, ReportUtils_1.isPayer)((0, SessionUtils_1.getSession)(), report, false, policy);
    var arePaymentsEnabled = (0, PolicyUtils_1.arePaymentsEnabled)(policy);
    var isReportClosed = (0, ReportUtils_1.isClosedReport)(report);
    var isReportSettled = (0, ReportUtils_1.isSettled)(report);
    if (isReportPayer && arePaymentsEnabled && (isReportApproved || isReportClosed || isReportSettled)) {
        return true;
    }
    var isAdmin = (policy === null || policy === void 0 ? void 0 : policy.role) === CONST_1.default.POLICY.ROLE.ADMIN;
    var isReportReimbursed = report.statusNum === CONST_1.default.REPORT.STATUS_NUM.REIMBURSED;
    var connectedIntegration = (0, PolicyUtils_1.getConnectedIntegration)(policy);
    var syncEnabled = (0, PolicyUtils_1.hasIntegrationAutoSync)(policy, connectedIntegration);
    var isReportFinished = isReportApproved || isReportReimbursed || isReportClosed;
    return isAdmin && isReportFinished && syncEnabled;
}
function isMarkAsExportedAction(report, policy) {
    if (!policy) {
        return false;
    }
    var hasAccountingConnection = !!(0, PolicyUtils_1.getValidConnectedIntegration)(policy);
    if (!hasAccountingConnection) {
        return false;
    }
    var isInvoiceReport = (0, ReportUtils_1.isInvoiceReport)(report);
    var isReportSender = (0, ReportUtils_1.isCurrentUserSubmitter)(report);
    if (isInvoiceReport && isReportSender) {
        return true;
    }
    var isExpenseReport = (0, ReportUtils_1.isExpenseReport)(report);
    if (!isExpenseReport) {
        return false;
    }
    var isReportPayer = (0, ReportUtils_1.isPayer)((0, SessionUtils_1.getSession)(), report, false, policy);
    var arePaymentsEnabled = (0, PolicyUtils_1.arePaymentsEnabled)(policy);
    var isReportApproved = (0, ReportUtils_1.isReportApproved)({ report: report });
    var isReportClosed = (0, ReportUtils_1.isClosedReport)(report);
    var isReportClosedOrApproved = isReportClosed || isReportApproved;
    if (isReportPayer && arePaymentsEnabled && isReportClosedOrApproved) {
        return true;
    }
    var isReportReimbursed = (0, ReportUtils_1.isSettled)(report);
    var connectedIntegration = (0, PolicyUtils_1.getConnectedIntegration)(policy);
    var syncEnabled = (0, PolicyUtils_1.hasIntegrationAutoSync)(policy, connectedIntegration);
    var isReportFinished = isReportClosedOrApproved || isReportReimbursed;
    if (!isReportFinished) {
        return false;
    }
    var isAdmin = (policy === null || policy === void 0 ? void 0 : policy.role) === CONST_1.default.POLICY.ROLE.ADMIN;
    var isExporter = (0, PolicyUtils_1.isPreferredExporter)(policy);
    return (isAdmin && syncEnabled) || (isExporter && !syncEnabled);
}
function isHoldAction(report, chatReport, reportTransactions, reportActions) {
    var transactionThreadReportID = (0, ReportActionsUtils_1.getOneTransactionThreadReportID)(report, chatReport, reportActions);
    var isOneExpenseReport = reportTransactions.length === 1;
    var transaction = reportTransactions.at(0);
    if ((!!reportActions && !transactionThreadReportID) || !isOneExpenseReport || !transaction) {
        return false;
    }
    var action = !!reportActions && (0, ReportActionsUtils_1.getIOUActionForTransactionID)(reportActions, transaction.transactionID);
    return !!action && isHoldActionForTransaction(report, transaction, action);
}
function isHoldActionForTransaction(report, reportTransaction, reportAction) {
    var isExpenseReport = (0, ReportUtils_1.isExpenseReport)(report);
    var isIOUReport = (0, ReportUtils_1.isIOUReport)(report);
    var iouOrExpenseReport = isExpenseReport || isIOUReport;
    var canHoldRequest = (0, ReportUtils_1.canHoldUnholdReportAction)(reportAction).canHoldRequest;
    if (!iouOrExpenseReport || !canHoldRequest) {
        return false;
    }
    var isReportOnHold = (0, TransactionUtils_1.isOnHold)(reportTransaction);
    if (isReportOnHold) {
        return false;
    }
    var isOpenReport = (0, ReportUtils_1.isOpenReport)(report);
    var isSubmitter = (0, ReportUtils_1.isCurrentUserSubmitter)(report);
    var isReportManager = (0, ReportUtils_1.isReportManager)(report);
    if (isOpenReport && (isSubmitter || isReportManager)) {
        return true;
    }
    var isProcessingReport = (0, ReportUtils_1.isProcessingReport)(report);
    return isProcessingReport;
}
function isChangeWorkspaceAction(report, policies, reportActions) {
    var _a, _b;
    // We can't move the iou report to the workspace if both users from the iou report create the expense
    if ((0, ReportUtils_1.isIOUReport)(report) && (0, ReportUtils_1.doesReportContainRequestsFromMultipleUsers)(report)) {
        return false;
    }
    var submitterEmail = (0, PersonalDetailsUtils_1.getLoginByAccountID)((_a = report === null || report === void 0 ? void 0 : report.ownerAccountID) !== null && _a !== void 0 ? _a : CONST_1.default.DEFAULT_NUMBER_ID);
    var availablePolicies = Object.values(policies !== null && policies !== void 0 ? policies : {}).filter(function (newPolicy) { return (0, ReportUtils_1.isWorkspaceEligibleForReportChange)(submitterEmail, newPolicy); });
    var hasAvailablePolicies = availablePolicies.length > 1;
    if (!hasAvailablePolicies && availablePolicies.length === 1) {
        hasAvailablePolicies = !report.policyID || report.policyID !== ((_b = availablePolicies === null || availablePolicies === void 0 ? void 0 : availablePolicies.at(0)) === null || _b === void 0 ? void 0 : _b.id);
    }
    var reportPolicy = policies === null || policies === void 0 ? void 0 : policies["".concat(ONYXKEYS_1.default.COLLECTION.POLICY).concat(report.policyID)];
    return hasAvailablePolicies && (0, ReportUtils_1.canEditReportPolicy)(report, reportPolicy) && !(0, ReportUtils_1.isExported)(reportActions);
}
function isDeleteAction(report, reportTransactions, reportActions, policy) {
    return (0, ReportUtils_1.canDeleteMoneyRequestReport)(report, reportTransactions, reportActions, policy);
}
function isRetractAction(report, policy) {
    var isExpenseReport = (0, ReportUtils_1.isExpenseReport)(report);
    // This should be removed after we change how instant submit works
    var isInstantSubmit = (0, PolicyUtils_1.isInstantSubmitEnabled)(policy);
    if (!isExpenseReport || isInstantSubmit) {
        return false;
    }
    var isReportSubmitter = (0, ReportUtils_1.isCurrentUserSubmitter)(report);
    if (!isReportSubmitter) {
        return false;
    }
    var isProcessingReport = (0, ReportUtils_1.isProcessingReport)(report);
    if (!isProcessingReport) {
        return false;
    }
    return true;
}
function isReopenAction(report, policy) {
    var isExpenseReport = (0, ReportUtils_1.isExpenseReport)(report);
    if (!isExpenseReport) {
        return false;
    }
    var isClosedReport = (0, ReportUtils_1.isClosedReport)(report);
    if (!isClosedReport) {
        return false;
    }
    var isAdmin = (policy === null || policy === void 0 ? void 0 : policy.role) === CONST_1.default.POLICY.ROLE.ADMIN;
    if (!isAdmin) {
        return false;
    }
    return true;
}
/**
 * Checks whether the supplied report supports merging transactions from it.
 */
function isMergeAction(parentReport, reportTransactions, policy) {
    // Do not show merge action if there are multiple transactions
    if (reportTransactions.length !== 1) {
        return false;
    }
    // Temporary disable merge action for IOU reports
    // See: https://github.com/Expensify/App/issues/70329#issuecomment-3277062003
    if ((0, ReportUtils_1.isIOUReport)(parentReport)) {
        return false;
    }
    // Do not show merge action for transactions with negative amounts
    var transactionDetails = (0, ReportUtils_1.getTransactionDetails)(reportTransactions.at(0));
    if (transactionDetails) {
        var transactionAmount = transactionDetails === null || transactionDetails === void 0 ? void 0 : transactionDetails.amount;
        if (transactionAmount < 0) {
            return false;
        }
    }
    var isAnyReceiptBeingScanned = reportTransactions === null || reportTransactions === void 0 ? void 0 : reportTransactions.some(function (transaction) { return (0, TransactionUtils_1.isReceiptBeingScanned)(transaction); });
    if (isAnyReceiptBeingScanned) {
        return false;
    }
    if ((0, ReportUtils_1.isSelfDM)(parentReport)) {
        return true;
    }
    if ((0, ReportUtils_1.hasOnlyNonReimbursableTransactions)(parentReport.reportID) && (0, PolicyUtils_1.isSubmitAndClose)(policy) && (0, PolicyUtils_1.isInstantSubmitEnabled)(policy)) {
        return false;
    }
    var isAdmin = (policy === null || policy === void 0 ? void 0 : policy.role) === CONST_1.default.POLICY.ROLE.ADMIN;
    return (0, ReportUtils_1.isMoneyRequestReportEligibleForMerge)(parentReport.reportID, isAdmin);
}
function isRemoveHoldAction(report, chatReport, reportTransactions, reportActions, policy, primaryAction) {
    var isReportOnHold = reportTransactions.some(TransactionUtils_1.isOnHold);
    if (!isReportOnHold) {
        return false;
    }
    var transactionThreadReportID = (0, ReportActionsUtils_1.getOneTransactionThreadReportID)(report, chatReport, reportActions);
    if (!transactionThreadReportID) {
        return false;
    }
    var isHolder = reportTransactions.some(function (transaction) { return (0, ReportUtils_1.isHoldCreator)(transaction, transactionThreadReportID); });
    var isPrimaryActionRemoveHold = primaryAction === CONST_1.default.REPORT.PRIMARY_ACTIONS.REMOVE_HOLD;
    if (isHolder) {
        return !isPrimaryActionRemoveHold;
    }
    return (policy === null || policy === void 0 ? void 0 : policy.role) === CONST_1.default.POLICY.ROLE.ADMIN;
}
function isRemoveHoldActionForTransaction(report, reportTransaction, policy) {
    return (0, TransactionUtils_1.isOnHold)(reportTransaction) && (policy === null || policy === void 0 ? void 0 : policy.role) === CONST_1.default.POLICY.ROLE.ADMIN && !(0, ReportUtils_1.isHoldCreator)(reportTransaction, report.reportID);
}
function getSecondaryReportActions(_a) {
    var currentUserEmail = _a.currentUserEmail, report = _a.report, chatReport = _a.chatReport, reportTransactions = _a.reportTransactions, violations = _a.violations, policy = _a.policy, reportNameValuePairs = _a.reportNameValuePairs, reportActions = _a.reportActions, policies = _a.policies, _b = _a.isChatReportArchived, isChatReportArchived = _b === void 0 ? false : _b;
    var options = [];
    if ((0, ReportPrimaryActionUtils_1.isPrimaryPayAction)(report, policy, reportNameValuePairs) && (0, ReportUtils_1.hasOnlyHeldExpenses)(report === null || report === void 0 ? void 0 : report.reportID)) {
        options.push(CONST_1.default.REPORT.SECONDARY_ACTIONS.PAY);
    }
    if (isAddExpenseAction(report, reportTransactions, isChatReportArchived || (0, ReportUtils_1.isArchivedReport)(reportNameValuePairs))) {
        options.push(CONST_1.default.REPORT.SECONDARY_ACTIONS.ADD_EXPENSE);
    }
    var primaryAction = (0, ReportPrimaryActionUtils_1.getReportPrimaryAction)({
        currentUserEmail: currentUserEmail,
        report: report,
        chatReport: chatReport,
        reportTransactions: reportTransactions,
        violations: violations,
        policy: policy,
        reportNameValuePairs: reportNameValuePairs,
        reportActions: reportActions,
        isChatReportArchived: isChatReportArchived,
    });
    if (isSubmitAction(report, reportTransactions, policy, reportNameValuePairs, reportActions, isChatReportArchived, primaryAction)) {
        options.push(CONST_1.default.REPORT.SECONDARY_ACTIONS.SUBMIT);
    }
    if (isApproveAction(currentUserEmail, report, reportTransactions, violations, policy)) {
        options.push(CONST_1.default.REPORT.SECONDARY_ACTIONS.APPROVE);
    }
    if (isUnapproveAction(currentUserEmail, report, policy)) {
        options.push(CONST_1.default.REPORT.SECONDARY_ACTIONS.UNAPPROVE);
    }
    if (isCancelPaymentAction(report, reportTransactions, policy)) {
        options.push(CONST_1.default.REPORT.SECONDARY_ACTIONS.CANCEL_PAYMENT);
    }
    if (isRetractAction(report, policy)) {
        options.push(CONST_1.default.REPORT.SECONDARY_ACTIONS.RETRACT);
    }
    if (isReopenAction(report, policy)) {
        options.push(CONST_1.default.REPORT.SECONDARY_ACTIONS.REOPEN);
    }
    if (isHoldAction(report, chatReport, reportTransactions, reportActions)) {
        options.push(CONST_1.default.REPORT.SECONDARY_ACTIONS.HOLD);
    }
    if (isRemoveHoldAction(report, chatReport, reportTransactions, reportActions, policy, primaryAction)) {
        options.push(CONST_1.default.REPORT.SECONDARY_ACTIONS.REMOVE_HOLD);
    }
    if ((0, ReportUtils_1.canRejectReportAction)(currentUserEmail, report, policy)) {
        options.push(CONST_1.default.REPORT.SECONDARY_ACTIONS.REJECT);
    }
    if (isSplitAction(report, reportTransactions, policy)) {
        options.push(CONST_1.default.REPORT.SECONDARY_ACTIONS.SPLIT);
    }
    if (isMergeAction(report, reportTransactions, policy)) {
        options.push(CONST_1.default.REPORT.SECONDARY_ACTIONS.MERGE);
    }
    options.push(CONST_1.default.REPORT.SECONDARY_ACTIONS.EXPORT);
    options.push(CONST_1.default.REPORT.SECONDARY_ACTIONS.DOWNLOAD_PDF);
    if (isChangeWorkspaceAction(report, policies, reportActions)) {
        options.push(CONST_1.default.REPORT.SECONDARY_ACTIONS.CHANGE_WORKSPACE);
    }
    if ((0, ReportUtils_1.isExpenseReport)(report) && (0, ReportUtils_1.isProcessingReport)(report) && (0, PolicyUtils_1.isPolicyAdmin)(policy)) {
        options.push(CONST_1.default.REPORT.SECONDARY_ACTIONS.CHANGE_APPROVER);
    }
    options.push(CONST_1.default.REPORT.SECONDARY_ACTIONS.VIEW_DETAILS);
    if (isDeleteAction(report, reportTransactions, reportActions !== null && reportActions !== void 0 ? reportActions : [], policy)) {
        options.push(CONST_1.default.REPORT.SECONDARY_ACTIONS.DELETE);
    }
    return options;
}
function getSecondaryExportReportActions(report, policy, exportTemplates) {
    if (exportTemplates === void 0) { exportTemplates = []; }
    var options = [];
    if (isExportAction(report, policy)) {
        options.push(CONST_1.default.REPORT.EXPORT_OPTIONS.EXPORT_TO_INTEGRATION);
    }
    if (isMarkAsExportedAction(report, policy)) {
        options.push(CONST_1.default.REPORT.EXPORT_OPTIONS.MARK_AS_EXPORTED);
    }
    options.push(CONST_1.default.REPORT.EXPORT_OPTIONS.DOWNLOAD_CSV);
    // Add any custom IS templates that have been added to the user's account as export options
    for (var _i = 0, exportTemplates_1 = exportTemplates; _i < exportTemplates_1.length; _i++) {
        var template = exportTemplates_1[_i];
        options.push(template.name);
    }
    return options;
}
function getSecondaryTransactionThreadActions(currentUserEmail, parentReport, reportTransaction, reportAction, policy, transactionThreadReport) {
    var options = [];
    if (!!reportAction && isHoldActionForTransaction(parentReport, reportTransaction, reportAction)) {
        options.push(CONST_1.default.REPORT.TRANSACTION_SECONDARY_ACTIONS.HOLD);
    }
    if (transactionThreadReport && isRemoveHoldActionForTransaction(transactionThreadReport, reportTransaction, policy)) {
        options.push(CONST_1.default.REPORT.TRANSACTION_SECONDARY_ACTIONS.REMOVE_HOLD);
    }
    if ((0, ReportUtils_1.canRejectReportAction)(currentUserEmail, parentReport, policy)) {
        options.push(CONST_1.default.REPORT.TRANSACTION_SECONDARY_ACTIONS.REJECT);
    }
    if (isSplitAction(parentReport, [reportTransaction], policy)) {
        options.push(CONST_1.default.REPORT.TRANSACTION_SECONDARY_ACTIONS.SPLIT);
    }
    if (isMergeAction(parentReport, [reportTransaction], policy)) {
        options.push(CONST_1.default.REPORT.TRANSACTION_SECONDARY_ACTIONS.MERGE);
    }
    options.push(CONST_1.default.REPORT.TRANSACTION_SECONDARY_ACTIONS.VIEW_DETAILS);
    if (isDeleteAction(parentReport, [reportTransaction], reportAction ? [reportAction] : [])) {
        options.push(CONST_1.default.REPORT.TRANSACTION_SECONDARY_ACTIONS.DELETE);
    }
    return options;
}
