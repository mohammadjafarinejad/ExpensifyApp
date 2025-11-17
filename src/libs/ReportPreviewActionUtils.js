"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.canReview = canReview;
exports.getReportPreviewAction = getReportPreviewAction;
var CONST_1 = require("@src/CONST");
var Report_1 = require("./actions/Report");
var PolicyUtils_1 = require("./PolicyUtils");
var ReportPrimaryActionUtils_1 = require("./ReportPrimaryActionUtils");
var ReportUtils_1 = require("./ReportUtils");
var SessionUtils_1 = require("./SessionUtils");
var TransactionUtils_1 = require("./TransactionUtils");
var ViolationsUtils_1 = require("./Violations/ViolationsUtils");
function canSubmit(report, violations, isReportArchived, policy, transactions) {
    if (isReportArchived) {
        return false;
    }
    var isExpense = (0, ReportUtils_1.isExpenseReport)(report);
    var isSubmitter = (0, ReportUtils_1.isCurrentUserSubmitter)(report);
    var isOpen = (0, ReportUtils_1.isOpenReport)(report);
    var isManager = report.managerID === (0, Report_1.getCurrentUserAccountID)();
    var isAdmin = (policy === null || policy === void 0 ? void 0 : policy.role) === CONST_1.default.POLICY.ROLE.ADMIN;
    if (!!transactions && (transactions === null || transactions === void 0 ? void 0 : transactions.length) > 0 && transactions.every(function (transaction) { return (0, TransactionUtils_1.isPending)(transaction); })) {
        return false;
    }
    var hasAnyViolations = (0, ReportUtils_1.hasMissingSmartscanFields)(report.reportID, transactions) || (0, ReportUtils_1.hasAnyViolations)(report.reportID, violations);
    var isAnyReceiptBeingScanned = transactions === null || transactions === void 0 ? void 0 : transactions.some(function (transaction) { return (0, TransactionUtils_1.isScanning)(transaction); });
    var submitToAccountID = (0, PolicyUtils_1.getSubmitToAccountID)(policy, report);
    if (submitToAccountID === report.ownerAccountID && (policy === null || policy === void 0 ? void 0 : policy.preventSelfApproval)) {
        return false;
    }
    return isExpense && (isSubmitter || isManager || isAdmin) && isOpen && !hasAnyViolations && !isAnyReceiptBeingScanned && !!transactions && transactions.length > 0;
}
function canApprove(report, violations, policy, transactions, shouldConsiderViolations) {
    var _a;
    if (shouldConsiderViolations === void 0) { shouldConsiderViolations = true; }
    var currentUserID = (0, Report_1.getCurrentUserAccountID)();
    var isExpense = (0, ReportUtils_1.isExpenseReport)(report);
    var isProcessing = (0, ReportUtils_1.isProcessingReport)(report);
    var isApprovalEnabled = policy ? policy.approvalMode && policy.approvalMode !== CONST_1.default.POLICY.APPROVAL_MODE.OPTIONAL : false;
    var managerID = (_a = report === null || report === void 0 ? void 0 : report.managerID) !== null && _a !== void 0 ? _a : CONST_1.default.DEFAULT_NUMBER_ID;
    var isCurrentUserManager = managerID === currentUserID;
    var hasAnyViolations = (0, ReportUtils_1.hasMissingSmartscanFields)(report.reportID, transactions) || (0, ReportUtils_1.hasAnyViolations)(report.reportID, violations);
    var reportTransactions = transactions !== null && transactions !== void 0 ? transactions : (0, ReportUtils_1.getReportTransactions)(report === null || report === void 0 ? void 0 : report.reportID);
    var isAnyReceiptBeingScanned = transactions === null || transactions === void 0 ? void 0 : transactions.some(function (transaction) { return (0, TransactionUtils_1.isScanning)(transaction); });
    if (isAnyReceiptBeingScanned) {
        return false;
    }
    if (!!transactions && (transactions === null || transactions === void 0 ? void 0 : transactions.length) > 0 && transactions.every(function (transaction) { return (0, TransactionUtils_1.isPending)(transaction); })) {
        return false;
    }
    var isPreventSelfApprovalEnabled = policy === null || policy === void 0 ? void 0 : policy.preventSelfApproval;
    var isReportSubmitter = (0, ReportUtils_1.isCurrentUserSubmitter)(report);
    if (isPreventSelfApprovalEnabled && isReportSubmitter) {
        return false;
    }
    return isExpense && isProcessing && !!isApprovalEnabled && (!hasAnyViolations || !shouldConsiderViolations) && reportTransactions.length > 0 && isCurrentUserManager;
}
function canPay(report, violations, isReportArchived, policy, invoiceReceiverPolicy, shouldConsiderViolations) {
    var _a, _b;
    if (shouldConsiderViolations === void 0) { shouldConsiderViolations = true; }
    if (isReportArchived) {
        return false;
    }
    var isReportPayer = (0, ReportUtils_1.isPayer)((0, SessionUtils_1.getSession)(), report, false, policy);
    var isExpense = (0, ReportUtils_1.isExpenseReport)(report);
    var isPaymentsEnabled = (0, PolicyUtils_1.arePaymentsEnabled)(policy);
    var isProcessing = (0, ReportUtils_1.isProcessingReport)(report);
    var isApprovalEnabled = policy ? policy.approvalMode && policy.approvalMode !== CONST_1.default.POLICY.APPROVAL_MODE.OPTIONAL : false;
    var isSubmittedWithoutApprovalsEnabled = !isApprovalEnabled && isProcessing;
    var isApproved = (0, ReportUtils_1.isReportApproved)({ report: report }) || isSubmittedWithoutApprovalsEnabled;
    var isClosed = (0, ReportUtils_1.isClosedReport)(report);
    var isReportFinished = (isApproved || isClosed) && !report.isWaitingOnBankAccount;
    var reimbursableSpend = (0, ReportUtils_1.getMoneyRequestSpendBreakdown)(report).reimbursableSpend;
    var isReimbursed = (0, ReportUtils_1.isSettled)(report);
    var hasAnyViolations = (0, ReportUtils_1.hasAnyViolations)(report.reportID, violations);
    if (isExpense && isReportPayer && isPaymentsEnabled && isReportFinished && (!hasAnyViolations || !shouldConsiderViolations) && reimbursableSpend !== 0) {
        return true;
    }
    if (!isProcessing) {
        return false;
    }
    var isIOU = (0, ReportUtils_1.isIOUReport)(report);
    if (isIOU && isReportPayer && !isReimbursed && reimbursableSpend > 0) {
        return true;
    }
    var isInvoice = (0, ReportUtils_1.isInvoiceReport)(report);
    if (!isInvoice) {
        return false;
    }
    var parentReport = (0, ReportUtils_1.getParentReport)(report);
    if (((_a = parentReport === null || parentReport === void 0 ? void 0 : parentReport.invoiceReceiver) === null || _a === void 0 ? void 0 : _a.type) === CONST_1.default.REPORT.INVOICE_RECEIVER_TYPE.INDIVIDUAL && reimbursableSpend > 0) {
        return ((_b = parentReport === null || parentReport === void 0 ? void 0 : parentReport.invoiceReceiver) === null || _b === void 0 ? void 0 : _b.accountID) === (0, Report_1.getCurrentUserAccountID)();
    }
    return (invoiceReceiverPolicy === null || invoiceReceiverPolicy === void 0 ? void 0 : invoiceReceiverPolicy.role) === CONST_1.default.POLICY.ROLE.ADMIN && reimbursableSpend > 0;
}
function canExport(report, violations, policy) {
    var _a, _b;
    var isExpense = (0, ReportUtils_1.isExpenseReport)(report);
    var isExporter = policy ? (0, PolicyUtils_1.isPreferredExporter)(policy) : false;
    var isReimbursed = (0, ReportUtils_1.isSettled)(report);
    var isClosed = (0, ReportUtils_1.isClosedReport)(report);
    var isApproved = (0, ReportUtils_1.isReportApproved)({ report: report });
    var connectedIntegration = (0, PolicyUtils_1.getValidConnectedIntegration)(policy);
    var syncEnabled = (0, PolicyUtils_1.hasIntegrationAutoSync)(policy, connectedIntegration);
    var hasAnyViolations = (0, ReportUtils_1.hasAnyViolations)(report.reportID, violations);
    if (!connectedIntegration || !isExpense || !isExporter) {
        return false;
    }
    var isExported = (_a = report.isExportedToIntegration) !== null && _a !== void 0 ? _a : false;
    if (isExported) {
        return false;
    }
    var hasExportError = (_b = report.hasExportError) !== null && _b !== void 0 ? _b : false;
    if (syncEnabled && !hasExportError) {
        return false;
    }
    if (report.isWaitingOnBankAccount) {
        return false;
    }
    return (isApproved || isReimbursed || isClosed) && !hasAnyViolations;
}
function canReview(report, violations, isReportArchived, currentUserEmail, policy, transactions) {
    var _a;
    var hasAnyViolations = (0, ReportUtils_1.hasMissingSmartscanFields)(report.reportID, transactions) || (0, ReportUtils_1.hasAnyViolations)(report.reportID, violations);
    var hasVisibleViolations = hasAnyViolations && ViolationsUtils_1.default.hasVisibleViolationsForUser(report, violations, currentUserEmail, policy, transactions);
    var isSubmitter = (0, ReportUtils_1.isCurrentUserSubmitter)(report);
    var isOpen = (0, ReportUtils_1.isOpenExpenseReport)(report);
    var isReimbursed = (0, ReportUtils_1.isSettled)(report);
    if (!hasVisibleViolations ||
        isReimbursed ||
        (!(isSubmitter && isOpen && (policy === null || policy === void 0 ? void 0 : policy.areWorkflowsEnabled)) &&
            !canApprove(report, violations, policy, transactions, false) &&
            !canPay(report, violations, isReportArchived, policy, policy, false))) {
        return false;
    }
    // We handle RTER violations independently because those are not configured via policy workflows
    var isAdmin = (0, PolicyUtils_1.isPolicyAdmin)(policy);
    var transactionIDs = (_a = transactions === null || transactions === void 0 ? void 0 : transactions.map(function (transaction) { return transaction.transactionID; })) !== null && _a !== void 0 ? _a : [];
    var hasAllPendingRTERViolations = (0, TransactionUtils_1.allHavePendingRTERViolation)(transactions, violations);
    var shouldShowBrokenConnectionViolation = (0, TransactionUtils_1.shouldShowBrokenConnectionViolationForMultipleTransactions)(transactionIDs, report, policy, violations);
    if (hasAllPendingRTERViolations || (shouldShowBrokenConnectionViolation && (!isAdmin || isSubmitter) && !(0, ReportUtils_1.isReportApproved)({ report: report }) && !(0, ReportUtils_1.isReportManuallyReimbursed)(report))) {
        return true;
    }
    if (policy) {
        return !!policy.areWorkflowsEnabled || isSubmitter;
    }
    return true;
}
// eslint-disable-next-line @typescript-eslint/max-params
function getReportPreviewAction(violations, isReportArchived, currentUserEmail, report, policy, transactions, invoiceReceiverPolicy, isPaidAnimationRunning, isApprovedAnimationRunning, isSubmittingAnimationRunning, areStrictPolicyRulesEnabled) {
    if (!report) {
        return CONST_1.default.REPORT.REPORT_PREVIEW_ACTIONS.VIEW;
    }
    // We want to have action displayed for either paid or approved animations
    // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
    if (isPaidAnimationRunning || isApprovedAnimationRunning) {
        return CONST_1.default.REPORT.REPORT_PREVIEW_ACTIONS.PAY;
    }
    if (isSubmittingAnimationRunning) {
        return CONST_1.default.REPORT.REPORT_PREVIEW_ACTIONS.SUBMIT;
    }
    if ((0, ReportPrimaryActionUtils_1.isAddExpenseAction)(report, transactions !== null && transactions !== void 0 ? transactions : [], isReportArchived)) {
        return CONST_1.default.REPORT.REPORT_PREVIEW_ACTIONS.ADD_EXPENSE;
    }
    // When strict policy rules are enabled and there are violations, show REVIEW button instead of SUBMIT
    var shouldBlockSubmit = (0, ReportUtils_1.shouldBlockSubmitDueToStrictPolicyRules)(report.reportID, violations, areStrictPolicyRulesEnabled !== null && areStrictPolicyRulesEnabled !== void 0 ? areStrictPolicyRulesEnabled : false, transactions);
    if (shouldBlockSubmit && canReview(report, violations, isReportArchived, currentUserEmail, policy, transactions)) {
        return CONST_1.default.REPORT.REPORT_PREVIEW_ACTIONS.REVIEW;
    }
    if (canSubmit(report, violations, isReportArchived, policy, transactions)) {
        return CONST_1.default.REPORT.REPORT_PREVIEW_ACTIONS.SUBMIT;
    }
    if (canApprove(report, violations, policy, transactions)) {
        return CONST_1.default.REPORT.REPORT_PREVIEW_ACTIONS.APPROVE;
    }
    if (canPay(report, violations, isReportArchived, policy, invoiceReceiverPolicy)) {
        return CONST_1.default.REPORT.REPORT_PREVIEW_ACTIONS.PAY;
    }
    if (canExport(report, violations, policy)) {
        return CONST_1.default.REPORT.REPORT_PREVIEW_ACTIONS.EXPORT_TO_ACCOUNTING;
    }
    if (canReview(report, violations, isReportArchived, currentUserEmail, policy, transactions)) {
        return CONST_1.default.REPORT.REPORT_PREVIEW_ACTIONS.REVIEW;
    }
    return CONST_1.default.REPORT.REPORT_PREVIEW_ACTIONS.VIEW;
}
