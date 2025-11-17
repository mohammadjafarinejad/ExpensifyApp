"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Policy_1 = require("@selectors/Policy");
var react_1 = require("react");
var ReportUtils_1 = require("@libs/ReportUtils");
var SearchUIUtils_1 = require("@libs/SearchUIUtils");
var Report_1 = require("@userActions/Report");
var CONST_1 = require("@src/CONST");
var ONYXKEYS_1 = require("@src/ONYXKEYS");
var useCardFeedsForDisplay_1 = require("./useCardFeedsForDisplay");
var useCreateEmptyReportConfirmation_1 = require("./useCreateEmptyReportConfirmation");
var useNetwork_1 = require("./useNetwork");
var useOnyx_1 = require("./useOnyx");
var usePermissions_1 = require("./usePermissions");
var policySelector = function (policy) {
    return policy && {
        id: policy.id,
        name: policy.name,
        type: policy.type,
        role: policy.role,
        owner: policy.owner,
        connections: policy.connections,
        outputCurrency: policy.outputCurrency,
        isPolicyExpenseChatEnabled: policy.isPolicyExpenseChatEnabled,
        reimburser: policy.reimburser,
        exporter: policy.exporter,
        approver: policy.approver,
        approvalMode: policy.approvalMode,
        employeeList: policy.employeeList,
        reimbursementChoice: policy.reimbursementChoice,
        areCompanyCardsEnabled: policy.areCompanyCardsEnabled,
        areExpensifyCardsEnabled: policy.areExpensifyCardsEnabled,
        achAccount: policy.achAccount,
    };
};
var policiesSelector = function (policies) { return (0, Policy_1.createPoliciesSelector)(policies, policySelector); };
var currentUserLoginAndAccountIDSelector = function (session) { return ({
    email: session === null || session === void 0 ? void 0 : session.email,
    accountID: session === null || session === void 0 ? void 0 : session.accountID,
}); };
/**
 * Get a list of all search groupings, along with their search items. Also returns the
 * currently focused search, based on the hash
 */
var useSearchTypeMenuSections = function () {
    var _a;
    var _b = (0, useCardFeedsForDisplay_1.default)(), defaultCardFeed = _b.defaultCardFeed, cardFeedsByPolicy = _b.cardFeedsByPolicy, defaultExpensifyCard = _b.defaultExpensifyCard;
    var isOffline = (0, useNetwork_1.default)().isOffline;
    var allPolicies = (0, useOnyx_1.default)(ONYXKEYS_1.default.COLLECTION.POLICY, { selector: policiesSelector, canBeMissing: true })[0];
    var currentUserLoginAndAccountID = (0, useOnyx_1.default)(ONYXKEYS_1.default.SESSION, { selector: currentUserLoginAndAccountIDSelector, canBeMissing: false })[0];
    var activePolicyID = (0, useOnyx_1.default)(ONYXKEYS_1.default.NVP_ACTIVE_POLICY_ID, { canBeMissing: true })[0];
    var savedSearches = (0, useOnyx_1.default)(ONYXKEYS_1.default.SAVED_SEARCHES, { canBeMissing: true })[0];
    var reports = (0, useOnyx_1.default)(ONYXKEYS_1.default.COLLECTION.REPORT, { canBeMissing: true })[0];
    var transactionViolations = (0, useOnyx_1.default)(ONYXKEYS_1.default.COLLECTION.TRANSACTION_VIOLATIONS, { canBeMissing: true })[0];
    var isBetaEnabled = (0, usePermissions_1.default)().isBetaEnabled;
    var isASAPSubmitBetaEnabled = isBetaEnabled(CONST_1.default.BETAS.ASAP_SUBMIT);
    var hasViolations = (0, ReportUtils_1.hasViolations)(undefined, transactionViolations);
    var _c = (0, react_1.useState)(null), pendingReportCreation = _c[0], setPendingReportCreation = _c[1];
    var handlePendingConfirm = (0, react_1.useCallback)(function () {
        pendingReportCreation === null || pendingReportCreation === void 0 ? void 0 : pendingReportCreation.onConfirm();
        setPendingReportCreation(null);
    }, [pendingReportCreation, setPendingReportCreation]);
    var handlePendingCancel = (0, react_1.useCallback)(function () {
        setPendingReportCreation(null);
    }, [setPendingReportCreation]);
    var _d = (0, useCreateEmptyReportConfirmation_1.default)({
        policyID: pendingReportCreation === null || pendingReportCreation === void 0 ? void 0 : pendingReportCreation.policyID,
        policyName: (_a = pendingReportCreation === null || pendingReportCreation === void 0 ? void 0 : pendingReportCreation.policyName) !== null && _a !== void 0 ? _a : '',
        onConfirm: handlePendingConfirm,
        onCancel: handlePendingCancel,
    }), openCreateReportConfirmation = _d.openCreateReportConfirmation, CreateReportConfirmationModal = _d.CreateReportConfirmationModal;
    var createReportWithConfirmation = (0, react_1.useCallback)(function (_a) {
        var policyID = _a.policyID, policyName = _a.policyName, onSuccess = _a.onSuccess, personalDetails = _a.personalDetails;
        var accountID = currentUserLoginAndAccountID === null || currentUserLoginAndAccountID === void 0 ? void 0 : currentUserLoginAndAccountID.accountID;
        if (!accountID) {
            return;
        }
        var personalDetailsForCreation = personalDetails !== null && personalDetails !== void 0 ? personalDetails : (0, ReportUtils_1.getPersonalDetailsForAccountID)(accountID);
        if (!personalDetailsForCreation) {
            return;
        }
        var executeCreate = function () {
            var createdReportID = (0, Report_1.createNewReport)(personalDetailsForCreation, isASAPSubmitBetaEnabled, hasViolations, policyID).reportID;
            onSuccess(createdReportID);
        };
        if ((0, ReportUtils_1.hasEmptyReportsForPolicy)(reports, policyID, accountID)) {
            setPendingReportCreation({
                policyID: policyID,
                policyName: policyName,
                onConfirm: executeCreate,
            });
            return;
        }
        executeCreate();
    }, [currentUserLoginAndAccountID === null || currentUserLoginAndAccountID === void 0 ? void 0 : currentUserLoginAndAccountID.accountID, hasViolations, isASAPSubmitBetaEnabled, reports, setPendingReportCreation]);
    (0, react_1.useEffect)(function () {
        if (!pendingReportCreation) {
            return;
        }
        openCreateReportConfirmation();
    }, [pendingReportCreation, openCreateReportConfirmation]);
    var typeMenuSections = (0, react_1.useMemo)(function () {
        return (0, SearchUIUtils_1.createTypeMenuSections)(currentUserLoginAndAccountID === null || currentUserLoginAndAccountID === void 0 ? void 0 : currentUserLoginAndAccountID.email, currentUserLoginAndAccountID === null || currentUserLoginAndAccountID === void 0 ? void 0 : currentUserLoginAndAccountID.accountID, cardFeedsByPolicy, defaultCardFeed !== null && defaultCardFeed !== void 0 ? defaultCardFeed : defaultExpensifyCard, allPolicies, activePolicyID, savedSearches, isOffline, defaultExpensifyCard, isASAPSubmitBetaEnabled, hasViolations, createReportWithConfirmation);
    }, [
        currentUserLoginAndAccountID === null || currentUserLoginAndAccountID === void 0 ? void 0 : currentUserLoginAndAccountID.email,
        currentUserLoginAndAccountID === null || currentUserLoginAndAccountID === void 0 ? void 0 : currentUserLoginAndAccountID.accountID,
        cardFeedsByPolicy,
        defaultCardFeed,
        defaultExpensifyCard,
        allPolicies,
        activePolicyID,
        savedSearches,
        isOffline,
        isASAPSubmitBetaEnabled,
        hasViolations,
        createReportWithConfirmation,
    ]);
    return { typeMenuSections: typeMenuSections, CreateReportConfirmationModal: CreateReportConfirmationModal };
};
exports.default = useSearchTypeMenuSections;
