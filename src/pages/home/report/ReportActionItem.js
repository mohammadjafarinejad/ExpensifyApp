"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var Session_1 = require("@selectors/Session");
var react_1 = require("react");
var OnyxListItemProvider_1 = require("@components/OnyxListItemProvider");
var useOnyx_1 = require("@hooks/useOnyx");
var useOriginalReportID_1 = require("@hooks/useOriginalReportID");
var usePolicyForMovingExpenses_1 = require("@hooks/usePolicyForMovingExpenses");
var useReportIsArchived_1 = require("@hooks/useReportIsArchived");
var ModifiedExpenseMessage_1 = require("@libs/ModifiedExpenseMessage");
var ReportActionsUtils_1 = require("@libs/ReportActionsUtils");
var ReportUtils_1 = require("@libs/ReportUtils");
var Report_1 = require("@userActions/Report");
var ReportActions_1 = require("@userActions/ReportActions");
var Transaction_1 = require("@userActions/Transaction");
var CONST_1 = require("@src/CONST");
var ONYXKEYS_1 = require("@src/ONYXKEYS");
var PureReportActionItem_1 = require("./PureReportActionItem");
function ReportActionItem(_a) {
    var allReports = _a.allReports, policies = _a.policies, action = _a.action, report = _a.report, transactions = _a.transactions, draftMessage = _a.draftMessage, emojiReactions = _a.emojiReactions, userWalletTierName = _a.userWalletTierName, isUserValidated = _a.isUserValidated, personalDetails = _a.personalDetails, linkedTransactionRouteError = _a.linkedTransactionRouteError, userBillingFundID = _a.userBillingFundID, isTryNewDotNVPDismissed = _a.isTryNewDotNVPDismissed, props = __rest(_a, ["allReports", "policies", "action", "report", "transactions", "draftMessage", "emojiReactions", "userWalletTierName", "isUserValidated", "personalDetails", "linkedTransactionRouteError", "userBillingFundID", "isTryNewDotNVPDismissed"]);
    var reportID = report === null || report === void 0 ? void 0 : report.reportID;
    var originalMessage = (0, ReportActionsUtils_1.getOriginalMessage)(action);
    var originalReportID = (0, useOriginalReportID_1.default)(reportID, action);
    var originalReport = allReports === null || allReports === void 0 ? void 0 : allReports["".concat(ONYXKEYS_1.default.COLLECTION.REPORT).concat(originalReportID)];
    var isOriginalReportArchived = (0, useReportIsArchived_1.default)(originalReportID);
    var currentUserAccountID = (0, useOnyx_1.default)(ONYXKEYS_1.default.SESSION, { canBeMissing: false, selector: Session_1.accountIDSelector })[0];
    var introSelected = (0, useOnyx_1.default)(ONYXKEYS_1.default.NVP_INTRO_SELECTED, { canBeMissing: true })[0];
    var iouReport = allReports === null || allReports === void 0 ? void 0 : allReports["".concat(ONYXKEYS_1.default.COLLECTION.REPORT).concat((0, ReportActionsUtils_1.getIOUReportIDFromReportActionPreview)(action))];
    var movedFromReport = allReports === null || allReports === void 0 ? void 0 : allReports["".concat(ONYXKEYS_1.default.COLLECTION.REPORT).concat((0, ModifiedExpenseMessage_1.getMovedReportID)(action, CONST_1.default.REPORT.MOVE_TYPE.FROM))];
    var movedToReport = allReports === null || allReports === void 0 ? void 0 : allReports["".concat(ONYXKEYS_1.default.COLLECTION.REPORT).concat((0, ModifiedExpenseMessage_1.getMovedReportID)(action, CONST_1.default.REPORT.MOVE_TYPE.TO))];
    var policy = policies === null || policies === void 0 ? void 0 : policies["".concat(ONYXKEYS_1.default.COLLECTION.POLICY).concat(report === null || report === void 0 ? void 0 : report.policyID)];
    var bankAccountList = (0, useOnyx_1.default)(ONYXKEYS_1.default.BANK_ACCOUNT_LIST, { canBeMissing: true })[0];
    var policyForMovingExpensesID = (0, usePolicyForMovingExpenses_1.default)().policyForMovingExpensesID;
    // The app would crash due to subscribing to the entire report collection if parentReportID is an empty string. So we should have a fallback ID here.
    // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
    var parentReport = allReports === null || allReports === void 0 ? void 0 : allReports["".concat(ONYXKEYS_1.default.COLLECTION.REPORT).concat((report === null || report === void 0 ? void 0 : report.parentReportID) || undefined)];
    var blockedFromConcierge = (0, OnyxListItemProvider_1.useBlockedFromConcierge)();
    var targetReport = (0, ReportUtils_1.isChatThread)(report) ? parentReport : report;
    var missingPaymentMethod = (0, ReportUtils_1.getIndicatedMissingPaymentMethod)(userWalletTierName, targetReport === null || targetReport === void 0 ? void 0 : targetReport.reportID, action, bankAccountList);
    var taskReport = originalMessage && 'taskReportID' in originalMessage ? allReports === null || allReports === void 0 ? void 0 : allReports["".concat(ONYXKEYS_1.default.COLLECTION.REPORT).concat(originalMessage.taskReportID)] : undefined;
    var linkedReport = originalMessage && 'linkedReportID' in originalMessage ? allReports === null || allReports === void 0 ? void 0 : allReports["".concat(ONYXKEYS_1.default.COLLECTION.REPORT).concat(originalMessage.linkedReportID)] : undefined;
    var iouReportOfLinkedReport = linkedReport && 'iouReportID' in linkedReport ? allReports === null || allReports === void 0 ? void 0 : allReports["".concat(ONYXKEYS_1.default.COLLECTION.REPORT).concat(linkedReport.iouReportID)] : undefined;
    return (<PureReportActionItem_1.default 
    // eslint-disable-next-line react/jsx-props-no-spreading
    {...props} allReports={allReports} introSelected={introSelected} policies={policies} action={action} report={report} policy={policy} currentUserAccountID={currentUserAccountID} draftMessage={draftMessage} iouReport={iouReport} taskReport={taskReport} linkedReport={linkedReport} iouReportOfLinkedReport={iouReportOfLinkedReport} emojiReactions={emojiReactions} linkedTransactionRouteError={linkedTransactionRouteError} isUserValidated={isUserValidated} parentReport={parentReport} personalDetails={personalDetails} blockedFromConcierge={blockedFromConcierge} originalReportID={originalReportID} deleteReportActionDraft={Report_1.deleteReportActionDraft} isArchivedRoom={(0, ReportUtils_1.isArchivedNonExpenseReport)(originalReport, isOriginalReportArchived)} isChronosReport={(0, ReportUtils_1.chatIncludesChronosWithID)(originalReportID)} toggleEmojiReaction={Report_1.toggleEmojiReaction} createDraftTransactionAndNavigateToParticipantSelector={ReportUtils_1.createDraftTransactionAndNavigateToParticipantSelector} resolveActionableReportMentionWhisper={Report_1.resolveActionableReportMentionWhisper} resolveActionableMentionWhisper={Report_1.resolveActionableMentionWhisper} isClosedExpenseReportWithNoExpenses={(0, ReportUtils_1.isClosedExpenseReportWithNoExpenses)(iouReport, transactions)} isCurrentUserTheOnlyParticipant={ReportUtils_1.isCurrentUserTheOnlyParticipant} missingPaymentMethod={missingPaymentMethod} reimbursementDeQueuedOrCanceledActionMessage={(0, ReportUtils_1.getReimbursementDeQueuedOrCanceledActionMessage)(action, report)} modifiedExpenseMessage={(0, ModifiedExpenseMessage_1.getForReportAction)({
            reportAction: action,
            policyID: report === null || report === void 0 ? void 0 : report.policyID,
            movedFromReport: movedFromReport,
            movedToReport: movedToReport,
            policyForMovingExpensesID: policyForMovingExpensesID,
        })} getTransactionsWithReceipts={ReportUtils_1.getTransactionsWithReceipts} clearError={Transaction_1.clearError} clearAllRelatedReportActionErrors={ReportActions_1.clearAllRelatedReportActionErrors} dismissTrackExpenseActionableWhisper={Report_1.dismissTrackExpenseActionableWhisper} userBillingFundID={userBillingFundID} isTryNewDotNVPDismissed={isTryNewDotNVPDismissed} bankAccountList={bankAccountList}/>);
}
exports.default = ReportActionItem;
