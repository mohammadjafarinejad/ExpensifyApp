"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_native_1 = require("react-native");
var OnyxListItemProvider_1 = require("@components/OnyxListItemProvider");
var SearchContext_1 = require("@components/Search/SearchContext");
var useConditionalCreateEmptyReportConfirmation_1 = require("@hooks/useConditionalCreateEmptyReportConfirmation");
var useCurrentUserPersonalDetails_1 = require("@hooks/useCurrentUserPersonalDetails");
var useOnyx_1 = require("@hooks/useOnyx");
var usePermissions_1 = require("@hooks/usePermissions");
var usePolicyForMovingExpenses_1 = require("@hooks/usePolicyForMovingExpenses");
var Report_1 = require("@libs/actions/Report");
var Transaction_1 = require("@libs/actions/Transaction");
var setNavigationActionToMicrotaskQueue_1 = require("@libs/Navigation/helpers/setNavigationActionToMicrotaskQueue");
var Navigation_1 = require("@libs/Navigation/Navigation");
var ReportUtils_1 = require("@libs/ReportUtils");
var SubscriptionUtils_1 = require("@libs/SubscriptionUtils");
var IOURequestEditReportCommon_1 = require("@pages/iou/request/step/IOURequestEditReportCommon");
var CONST_1 = require("@src/CONST");
var ONYXKEYS_1 = require("@src/ONYXKEYS");
var ROUTES_1 = require("@src/ROUTES");
function SearchTransactionsChangeReport() {
    var _a, _b;
    var _c = (0, SearchContext_1.useSearchContext)(), selectedTransactions = _c.selectedTransactions, clearSelectedTransactions = _c.clearSelectedTransactions;
    var selectedTransactionsKeys = (0, react_1.useMemo)(function () { return Object.keys(selectedTransactions); }, [selectedTransactions]);
    var allReportNextSteps = (0, useOnyx_1.default)(ONYXKEYS_1.default.COLLECTION.NEXT_STEP, { canBeMissing: true })[0];
    var allReports = (0, useOnyx_1.default)(ONYXKEYS_1.default.COLLECTION.REPORT, { canBeMissing: false })[0];
    var allPolicies = (0, useOnyx_1.default)(ONYXKEYS_1.default.COLLECTION.POLICY, { canBeMissing: true })[0];
    var allPolicyCategories = (0, useOnyx_1.default)("".concat(ONYXKEYS_1.default.COLLECTION.POLICY_CATEGORIES), { canBeMissing: true })[0];
    var _d = (0, usePolicyForMovingExpenses_1.default)(), policyForMovingExpensesID = _d.policyForMovingExpensesID, shouldSelectPolicy = _d.shouldSelectPolicy;
    var transactionViolations = (0, useOnyx_1.default)(ONYXKEYS_1.default.COLLECTION.TRANSACTION_VIOLATIONS, { canBeMissing: true })[0];
    var hasViolations = (0, ReportUtils_1.hasViolations)(undefined, transactionViolations);
    var isBetaEnabled = (0, usePermissions_1.default)().isBetaEnabled;
    var isASAPSubmitBetaEnabled = isBetaEnabled(CONST_1.default.BETAS.ASAP_SUBMIT);
    var session = (0, OnyxListItemProvider_1.useSession)();
    var currentUserPersonalDetails = (0, useCurrentUserPersonalDetails_1.default)();
    var policyForMovingExpenses = policyForMovingExpensesID ? allPolicies === null || allPolicies === void 0 ? void 0 : allPolicies["".concat(ONYXKEYS_1.default.COLLECTION.POLICY).concat(policyForMovingExpensesID)] : undefined;
    var firstTransactionKey = selectedTransactionsKeys.at(0);
    var firstTransactionReportID = firstTransactionKey ? (_a = selectedTransactions[firstTransactionKey]) === null || _a === void 0 ? void 0 : _a.reportID : undefined;
    var selectedReportID = Object.values(selectedTransactions).every(function (transaction) { return transaction.reportID === firstTransactionReportID; }) && firstTransactionReportID !== CONST_1.default.REPORT.UNREPORTED_REPORT_ID
        ? firstTransactionReportID
        : undefined;
    var areAllTransactionsUnreported = selectedTransactionsKeys.length > 0 && selectedTransactionsKeys.every(function (transactionKey) { var _a; return ((_a = selectedTransactions[transactionKey]) === null || _a === void 0 ? void 0 : _a.reportID) === CONST_1.default.REPORT.UNREPORTED_REPORT_ID; });
    var targetOwnerAccountID = (0, react_1.useMemo)(function () {
        if (selectedTransactionsKeys.length === 0) {
            return undefined;
        }
        // Prefer owner metadata attached to each selection (handles unreported expenses)
        var ownerFromSelection = selectedTransactionsKeys.map(function (transactionKey) { var _a; return (_a = selectedTransactions[transactionKey]) === null || _a === void 0 ? void 0 : _a.ownerAccountID; }).find(function (ownerID) { return typeof ownerID === 'number'; });
        if (ownerFromSelection !== undefined) {
            return ownerFromSelection;
        }
        var reportIDWithOwner = selectedTransactionsKeys
            .map(function (transactionKey) { var _a; return (_a = selectedTransactions[transactionKey]) === null || _a === void 0 ? void 0 : _a.reportID; })
            .find(function (reportID) { return reportID && reportID !== CONST_1.default.REPORT.UNREPORTED_REPORT_ID; });
        if (!reportIDWithOwner) {
            return undefined;
        }
        var report = (0, ReportUtils_1.getReportOrDraftReport)(reportIDWithOwner);
        return report === null || report === void 0 ? void 0 : report.ownerAccountID;
    }, [selectedTransactions, selectedTransactionsKeys]);
    var createReportForPolicy = function () {
        var optimisticReport = (0, Report_1.createNewReport)(currentUserPersonalDetails, hasViolations, isASAPSubmitBetaEnabled, policyForMovingExpensesID);
        var reportNextStep = allReportNextSteps === null || allReportNextSteps === void 0 ? void 0 : allReportNextSteps["".concat(ONYXKEYS_1.default.COLLECTION.NEXT_STEP).concat(optimisticReport.reportID)];
        (0, setNavigationActionToMicrotaskQueue_1.default)(function () {
            var _a, _b;
            (0, Transaction_1.changeTransactionsReport)(selectedTransactionsKeys, isASAPSubmitBetaEnabled, (_a = session === null || session === void 0 ? void 0 : session.accountID) !== null && _a !== void 0 ? _a : CONST_1.default.DEFAULT_NUMBER_ID, (_b = session === null || session === void 0 ? void 0 : session.email) !== null && _b !== void 0 ? _b : '', optimisticReport, policyForMovingExpensesID ? allPolicies === null || allPolicies === void 0 ? void 0 : allPolicies["".concat(ONYXKEYS_1.default.COLLECTION.POLICY).concat(policyForMovingExpensesID)] : undefined, reportNextStep, undefined);
            clearSelectedTransactions();
        });
        Navigation_1.default.goBack();
    };
    var _e = (0, useConditionalCreateEmptyReportConfirmation_1.default)({
        policyID: policyForMovingExpensesID,
        policyName: (_b = policyForMovingExpenses === null || policyForMovingExpenses === void 0 ? void 0 : policyForMovingExpenses.name) !== null && _b !== void 0 ? _b : '',
        onCreateReport: createReportForPolicy,
        shouldBypassConfirmation: true,
    }), handleCreateReport = _e.handleCreateReport, CreateReportConfirmationModal = _e.CreateReportConfirmationModal;
    var createReport = function () {
        if (shouldSelectPolicy) {
            Navigation_1.default.navigate(ROUTES_1.default.NEW_REPORT_WORKSPACE_SELECTION.getRoute(true));
            return;
        }
        if (policyForMovingExpensesID && (0, SubscriptionUtils_1.shouldRestrictUserBillableActions)(policyForMovingExpensesID)) {
            Navigation_1.default.navigate(ROUTES_1.default.RESTRICTED_ACTION.getRoute(policyForMovingExpensesID));
            return;
        }
        handleCreateReport();
    };
    var selectReport = function (item) {
        var _a, _b;
        if (selectedTransactionsKeys.length === 0) {
            return;
        }
        var reportNextStep = allReportNextSteps === null || allReportNextSteps === void 0 ? void 0 : allReportNextSteps["".concat(ONYXKEYS_1.default.COLLECTION.NEXT_STEP).concat(item.value)];
        var destinationReport = allReports === null || allReports === void 0 ? void 0 : allReports["".concat(ONYXKEYS_1.default.COLLECTION.REPORT).concat(item.value)];
        (0, Transaction_1.changeTransactionsReport)(selectedTransactionsKeys, isASAPSubmitBetaEnabled, (_a = session === null || session === void 0 ? void 0 : session.accountID) !== null && _a !== void 0 ? _a : CONST_1.default.DEFAULT_NUMBER_ID, (_b = session === null || session === void 0 ? void 0 : session.email) !== null && _b !== void 0 ? _b : '', destinationReport, allPolicies === null || allPolicies === void 0 ? void 0 : allPolicies["".concat(ONYXKEYS_1.default.COLLECTION.POLICY).concat(item.policyID)], reportNextStep, allPolicyCategories === null || allPolicyCategories === void 0 ? void 0 : allPolicyCategories["".concat(ONYXKEYS_1.default.COLLECTION.POLICY_CATEGORIES).concat(item.policyID)]);
        // eslint-disable-next-line @typescript-eslint/no-deprecated
        react_native_1.InteractionManager.runAfterInteractions(function () {
            clearSelectedTransactions();
        });
        Navigation_1.default.goBack();
    };
    var removeFromReport = function () {
        var _a, _b;
        if (selectedTransactionsKeys.length === 0) {
            return;
        }
        (0, Transaction_1.changeTransactionsReport)(selectedTransactionsKeys, isASAPSubmitBetaEnabled, (_a = session === null || session === void 0 ? void 0 : session.accountID) !== null && _a !== void 0 ? _a : CONST_1.default.DEFAULT_NUMBER_ID, (_b = session === null || session === void 0 ? void 0 : session.email) !== null && _b !== void 0 ? _b : '');
        clearSelectedTransactions();
        Navigation_1.default.goBack();
    };
    return (<>
            {CreateReportConfirmationModal}
            <IOURequestEditReportCommon_1.default backTo={undefined} transactionIDs={selectedTransactionsKeys} selectedReportID={selectedReportID} selectReport={selectReport} removeFromReport={removeFromReport} createReport={createReport} isEditing isUnreported={areAllTransactionsUnreported} targetOwnerAccountID={targetOwnerAccountID}/>
        </>);
}
SearchTransactionsChangeReport.displayName = 'SearchTransactionsChangeReport';
exports.default = SearchTransactionsChangeReport;
