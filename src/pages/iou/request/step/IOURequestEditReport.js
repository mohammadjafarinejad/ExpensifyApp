"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var OnyxListItemProvider_1 = require("@components/OnyxListItemProvider");
var SearchContext_1 = require("@components/Search/SearchContext");
var useConditionalCreateEmptyReportConfirmation_1 = require("@hooks/useConditionalCreateEmptyReportConfirmation");
var useCurrentUserPersonalDetails_1 = require("@hooks/useCurrentUserPersonalDetails");
var useOnyx_1 = require("@hooks/useOnyx");
var usePermissions_1 = require("@hooks/usePermissions");
var usePolicyForMovingExpenses_1 = require("@hooks/usePolicyForMovingExpenses");
var MobileSelectionMode_1 = require("@libs/actions/MobileSelectionMode");
var Transaction_1 = require("@libs/actions/Transaction");
var setNavigationActionToMicrotaskQueue_1 = require("@libs/Navigation/helpers/setNavigationActionToMicrotaskQueue");
var Navigation_1 = require("@libs/Navigation/Navigation");
var ReportUtils_1 = require("@libs/ReportUtils");
var SubscriptionUtils_1 = require("@libs/SubscriptionUtils");
var TransactionUtils_1 = require("@libs/TransactionUtils");
var Report_1 = require("@userActions/Report");
var CONST_1 = require("@src/CONST");
var ONYXKEYS_1 = require("@src/ONYXKEYS");
var ROUTES_1 = require("@src/ROUTES");
var IOURequestEditReportCommon_1 = require("./IOURequestEditReportCommon");
var withWritableReportOrNotFound_1 = require("./withWritableReportOrNotFound");
function IOURequestEditReport(_a) {
    var _b;
    var route = _a.route;
    var _c = route.params, backTo = _c.backTo, reportID = _c.reportID, action = _c.action, shouldTurnOffSelectionMode = _c.shouldTurnOffSelectionMode;
    var _d = (0, SearchContext_1.useSearchContext)(), selectedTransactionIDs = _d.selectedTransactionIDs, clearSelectedTransactions = _d.clearSelectedTransactions;
    var allReports = (0, useOnyx_1.default)("".concat(ONYXKEYS_1.default.COLLECTION.REPORT), { canBeMissing: false })[0];
    var selectedReport = (0, useOnyx_1.default)("".concat(ONYXKEYS_1.default.COLLECTION.REPORT).concat(reportID), { canBeMissing: false })[0];
    var reportNextStep = (0, useOnyx_1.default)("".concat(ONYXKEYS_1.default.COLLECTION.NEXT_STEP).concat(reportID), { canBeMissing: true })[0];
    var isBetaEnabled = (0, usePermissions_1.default)().isBetaEnabled;
    var isASAPSubmitBetaEnabled = isBetaEnabled(CONST_1.default.BETAS.ASAP_SUBMIT);
    var session = (0, OnyxListItemProvider_1.useSession)();
    var allPolicies = (0, useOnyx_1.default)(ONYXKEYS_1.default.COLLECTION.POLICY, { canBeMissing: true })[0];
    var allPolicyCategories = (0, useOnyx_1.default)("".concat(ONYXKEYS_1.default.COLLECTION.POLICY_CATEGORIES), { canBeMissing: true })[0];
    var allTransactions = (0, useOnyx_1.default)(ONYXKEYS_1.default.COLLECTION.TRANSACTION, { canBeMissing: true })[0];
    var currentUserPersonalDetails = (0, useCurrentUserPersonalDetails_1.default)();
    var hasPerDiemTransactions = (0, react_1.useMemo)(function () {
        return selectedTransactionIDs.some(function (transactionID) {
            var transaction = allTransactions === null || allTransactions === void 0 ? void 0 : allTransactions["".concat(ONYXKEYS_1.default.COLLECTION.TRANSACTION).concat(transactionID)];
            return transaction && (0, TransactionUtils_1.isPerDiemRequest)(transaction);
        });
    }, [selectedTransactionIDs, allTransactions]);
    var _e = (0, usePolicyForMovingExpenses_1.default)(hasPerDiemTransactions), policyForMovingExpensesID = _e.policyForMovingExpensesID, shouldSelectPolicy = _e.shouldSelectPolicy;
    var transactionViolations = (0, useOnyx_1.default)(ONYXKEYS_1.default.COLLECTION.TRANSACTION_VIOLATIONS, { canBeMissing: true })[0];
    var hasViolations = (0, ReportUtils_1.hasViolations)(undefined, transactionViolations);
    var policyForMovingExpenses = policyForMovingExpensesID ? allPolicies === null || allPolicies === void 0 ? void 0 : allPolicies["".concat(ONYXKEYS_1.default.COLLECTION.POLICY).concat(policyForMovingExpensesID)] : undefined;
    var selectReport = function (item, report) {
        if (selectedTransactionIDs.length === 0 || item.value === reportID) {
            Navigation_1.default.dismissModal();
            return;
        }
        var newReport = report !== null && report !== void 0 ? report : allReports === null || allReports === void 0 ? void 0 : allReports["".concat(ONYXKEYS_1.default.COLLECTION.REPORT).concat(item.value)];
        (0, setNavigationActionToMicrotaskQueue_1.default)(function () {
            var _a, _b;
            (0, Transaction_1.changeTransactionsReport)(selectedTransactionIDs, isASAPSubmitBetaEnabled, (_a = session === null || session === void 0 ? void 0 : session.accountID) !== null && _a !== void 0 ? _a : CONST_1.default.DEFAULT_NUMBER_ID, (_b = session === null || session === void 0 ? void 0 : session.email) !== null && _b !== void 0 ? _b : '', newReport, allPolicies === null || allPolicies === void 0 ? void 0 : allPolicies["".concat(ONYXKEYS_1.default.COLLECTION.POLICY).concat(item.policyID)], reportNextStep, allPolicyCategories === null || allPolicyCategories === void 0 ? void 0 : allPolicyCategories["".concat(ONYXKEYS_1.default.COLLECTION.POLICY_CATEGORIES).concat(item.policyID)]);
            (0, MobileSelectionMode_1.turnOffMobileSelectionMode)();
            clearSelectedTransactions(true);
        });
        Navigation_1.default.dismissModal();
    };
    var removeFromReport = function () {
        var _a, _b;
        if (!selectedReport || selectedTransactionIDs.length === 0) {
            return;
        }
        (0, Transaction_1.changeTransactionsReport)(selectedTransactionIDs, isASAPSubmitBetaEnabled, (_a = session === null || session === void 0 ? void 0 : session.accountID) !== null && _a !== void 0 ? _a : CONST_1.default.DEFAULT_NUMBER_ID, (_b = session === null || session === void 0 ? void 0 : session.email) !== null && _b !== void 0 ? _b : '');
        if (shouldTurnOffSelectionMode) {
            (0, MobileSelectionMode_1.turnOffMobileSelectionMode)();
        }
        clearSelectedTransactions(true);
        Navigation_1.default.dismissModal();
    };
    var createReportForPolicy = function () {
        if (!policyForMovingExpensesID) {
            return;
        }
        var optimisticReport = (0, Report_1.createNewReport)(currentUserPersonalDetails, hasViolations, isASAPSubmitBetaEnabled, policyForMovingExpensesID);
        selectReport({ value: optimisticReport.reportID }, optimisticReport);
    };
    var _f = (0, useConditionalCreateEmptyReportConfirmation_1.default)({
        policyID: policyForMovingExpensesID,
        policyName: (_b = policyForMovingExpenses === null || policyForMovingExpenses === void 0 ? void 0 : policyForMovingExpenses.name) !== null && _b !== void 0 ? _b : '',
        onCreateReport: createReportForPolicy,
        shouldBypassConfirmation: true,
    }), handleCreateReport = _f.handleCreateReport, CreateReportConfirmationModal = _f.CreateReportConfirmationModal;
    var createReport = function () {
        if (!policyForMovingExpensesID && !shouldSelectPolicy) {
            return;
        }
        if (shouldSelectPolicy) {
            Navigation_1.default.navigate(ROUTES_1.default.NEW_REPORT_WORKSPACE_SELECTION.getRoute(true, backTo));
            return;
        }
        if (policyForMovingExpensesID && (0, SubscriptionUtils_1.shouldRestrictUserBillableActions)(policyForMovingExpensesID)) {
            Navigation_1.default.navigate(ROUTES_1.default.RESTRICTED_ACTION.getRoute(policyForMovingExpensesID));
            return;
        }
        handleCreateReport();
    };
    return (<>
            {CreateReportConfirmationModal}
            <IOURequestEditReportCommon_1.default backTo={backTo} selectedReportID={reportID} transactionIDs={selectedTransactionIDs} selectReport={selectReport} removeFromReport={removeFromReport} isEditing={action === CONST_1.default.IOU.ACTION.EDIT} createReport={createReport} isPerDiemRequest={hasPerDiemTransactions}/>
        </>);
}
IOURequestEditReport.displayName = 'IOURequestEditReport';
exports.default = (0, withWritableReportOrNotFound_1.default)(IOURequestEditReport);
