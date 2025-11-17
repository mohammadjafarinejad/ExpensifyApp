"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Session_1 = require("@selectors/Session");
var react_1 = require("react");
var FullscreenLoadingIndicator_1 = require("@components/FullscreenLoadingIndicator");
var HeaderWithBackButton_1 = require("@components/HeaderWithBackButton");
var Expensicons = require("@components/Icon/Expensicons");
var ScreenWrapper_1 = require("@components/ScreenWrapper");
var SearchContext_1 = require("@components/Search/SearchContext");
var SelectionListWithSections_1 = require("@components/SelectionListWithSections");
var UserListItem_1 = require("@components/SelectionListWithSections/UserListItem");
var Text_1 = require("@components/Text");
var useCreateEmptyReportConfirmation_1 = require("@hooks/useCreateEmptyReportConfirmation");
var useCurrentUserPersonalDetails_1 = require("@hooks/useCurrentUserPersonalDetails");
var useDebouncedState_1 = require("@hooks/useDebouncedState");
var useLocalize_1 = require("@hooks/useLocalize");
var useNetwork_1 = require("@hooks/useNetwork");
var useOnyx_1 = require("@hooks/useOnyx");
var usePermissions_1 = require("@hooks/usePermissions");
var useResponsiveLayout_1 = require("@hooks/useResponsiveLayout");
var useThemeStyles_1 = require("@hooks/useThemeStyles");
var Report_1 = require("@libs/actions/Report");
var setNavigationActionToMicrotaskQueue_1 = require("@libs/Navigation/helpers/setNavigationActionToMicrotaskQueue");
var Navigation_1 = require("@libs/Navigation/Navigation");
var OptionsListUtils_1 = require("@libs/OptionsListUtils");
var PolicyUtils_1 = require("@libs/PolicyUtils");
var ReportUtils_1 = require("@libs/ReportUtils");
var SearchQueryUtils_1 = require("@libs/SearchQueryUtils");
var SubscriptionUtils_1 = require("@libs/SubscriptionUtils");
var TransactionUtils_1 = require("@libs/TransactionUtils");
var isRHPOnSearchMoneyRequestReportPage_1 = require("@navigation/helpers/isRHPOnSearchMoneyRequestReportPage");
var Transaction_1 = require("@userActions/Transaction");
var User_1 = require("@userActions/User");
var CONST_1 = require("@src/CONST");
var ONYXKEYS_1 = require("@src/ONYXKEYS");
var ROUTES_1 = require("@src/ROUTES");
var EmptyObject_1 = require("@src/types/utils/EmptyObject");
function NewReportWorkspaceSelectionPage(_a) {
    var _b, _c;
    var route = _a.route;
    var _d = (_b = route.params) !== null && _b !== void 0 ? _b : {}, isMovingExpenses = _d.isMovingExpenses, backTo = _d.backTo;
    var isOffline = (0, useNetwork_1.default)().isOffline;
    var _e = (0, SearchContext_1.useSearchContext)(), selectedTransactions = _e.selectedTransactions, selectedTransactionIDs = _e.selectedTransactionIDs, clearSelectedTransactions = _e.clearSelectedTransactions;
    var styles = (0, useThemeStyles_1.default)();
    var _f = (0, useDebouncedState_1.default)(''), searchTerm = _f[0], debouncedSearchTerm = _f[1], setSearchTerm = _f[2];
    var _g = (0, useLocalize_1.default)(), translate = _g.translate, localeCompare = _g.localeCompare;
    var shouldUseNarrowLayout = (0, useResponsiveLayout_1.default)().shouldUseNarrowLayout;
    var allReportNextSteps = (0, useOnyx_1.default)(ONYXKEYS_1.default.COLLECTION.NEXT_STEP, { canBeMissing: true })[0];
    var isRHPOnReportInSearch = (0, isRHPOnSearchMoneyRequestReportPage_1.default)();
    var transactionViolations = (0, useOnyx_1.default)(ONYXKEYS_1.default.COLLECTION.TRANSACTION_VIOLATIONS, { canBeMissing: true })[0];
    var isBetaEnabled = (0, usePermissions_1.default)().isBetaEnabled;
    var isASAPSubmitBetaEnabled = isBetaEnabled(CONST_1.default.BETAS.ASAP_SUBMIT);
    var hasViolations = (0, ReportUtils_1.hasViolations)(undefined, transactionViolations);
    var activePolicyID = (0, useOnyx_1.default)(ONYXKEYS_1.default.NVP_ACTIVE_POLICY_ID, { canBeMissing: true })[0];
    var _h = (0, useOnyx_1.default)(ONYXKEYS_1.default.COLLECTION.POLICY, { canBeMissing: true }), policies = _h[0], fetchStatus = _h[1];
    var allTransactions = (0, useOnyx_1.default)(ONYXKEYS_1.default.COLLECTION.TRANSACTION, { canBeMissing: true })[0];
    var currentUserPersonalDetails = (0, useCurrentUserPersonalDetails_1.default)();
    var isLoadingApp = (0, useOnyx_1.default)(ONYXKEYS_1.default.IS_LOADING_APP, { canBeMissing: true })[0];
    var shouldShowLoadingIndicator = isLoadingApp && !isOffline;
    var _j = (0, react_1.useState)(null), pendingPolicySelection = _j[0], setPendingPolicySelection = _j[1];
    var accountID = (0, useOnyx_1.default)(ONYXKEYS_1.default.SESSION, { selector: Session_1.accountIDSelector, canBeMissing: true })[0];
    var policiesWithEmptyReportsSelector = (0, react_1.useCallback)(function (reports) {
        if (!accountID) {
            return {};
        }
        return (0, ReportUtils_1.getPolicyIDsWithEmptyReportsForAccount)(reports, accountID);
    }, [accountID]);
    var policiesWithEmptyReports = (0, useOnyx_1.default)(ONYXKEYS_1.default.COLLECTION.REPORT, {
        canBeMissing: true,
        selector: policiesWithEmptyReportsSelector,
    }, [policiesWithEmptyReportsSelector])[0];
    var navigateToNewReport = (0, react_1.useCallback)(function (optimisticReportID) {
        if (isRHPOnReportInSearch) {
            Navigation_1.default.setNavigationActionToMicrotaskQueue(function () {
                Navigation_1.default.dismissModal();
            });
        }
        Navigation_1.default.setNavigationActionToMicrotaskQueue(function () {
            Navigation_1.default.navigate(ROUTES_1.default.SEARCH_MONEY_REQUEST_REPORT.getRoute({ reportID: optimisticReportID }), { forceReplace: isRHPOnReportInSearch || shouldUseNarrowLayout });
        });
    }, [isRHPOnReportInSearch, shouldUseNarrowLayout]);
    var createReport = (0, react_1.useCallback)(function (policyID) {
        var optimisticReport = (0, Report_1.createNewReport)(currentUserPersonalDetails, isASAPSubmitBetaEnabled, hasViolations, policyID);
        var selectedTransactionsKeys = Object.keys(selectedTransactions);
        if (isMovingExpenses && (!!selectedTransactionsKeys.length || !!selectedTransactionIDs.length)) {
            var reportNextStep_1 = allReportNextSteps === null || allReportNextSteps === void 0 ? void 0 : allReportNextSteps["".concat(ONYXKEYS_1.default.COLLECTION.NEXT_STEP).concat(optimisticReport.reportID)];
            (0, setNavigationActionToMicrotaskQueue_1.default)(function () {
                var _a, _b;
                (0, Transaction_1.changeTransactionsReport)(selectedTransactionsKeys.length ? selectedTransactionsKeys : selectedTransactionIDs, isASAPSubmitBetaEnabled, (_a = currentUserPersonalDetails === null || currentUserPersonalDetails === void 0 ? void 0 : currentUserPersonalDetails.accountID) !== null && _a !== void 0 ? _a : CONST_1.default.DEFAULT_NUMBER_ID, (_b = currentUserPersonalDetails === null || currentUserPersonalDetails === void 0 ? void 0 : currentUserPersonalDetails.email) !== null && _b !== void 0 ? _b : '', optimisticReport, policies === null || policies === void 0 ? void 0 : policies["".concat(ONYXKEYS_1.default.COLLECTION.POLICY).concat(policyID)], reportNextStep_1, undefined);
                // eslint-disable-next-line rulesdir/no-default-id-values
                (0, User_1.setNameValuePair)(ONYXKEYS_1.default.NVP_ACTIVE_POLICY_ID, policyID, activePolicyID !== null && activePolicyID !== void 0 ? activePolicyID : '');
                if (selectedTransactionIDs.length) {
                    clearSelectedTransactions(true);
                }
                if (selectedTransactionsKeys.length) {
                    clearSelectedTransactions();
                }
            });
            Navigation_1.default.dismissModal();
            Navigation_1.default.goBack(backTo !== null && backTo !== void 0 ? backTo : ROUTES_1.default.SEARCH_ROOT.getRoute({ query: (0, SearchQueryUtils_1.buildCannedSearchQuery)() }));
            return;
        }
        navigateToNewReport(optimisticReport.reportID);
    }, [
        activePolicyID,
        currentUserPersonalDetails,
        isASAPSubmitBetaEnabled,
        hasViolations,
        selectedTransactions,
        isMovingExpenses,
        selectedTransactionIDs,
        navigateToNewReport,
        allReportNextSteps,
        policies,
        clearSelectedTransactions,
        backTo,
    ]);
    var handleConfirmCreateReport = (0, react_1.useCallback)(function () {
        if (!(pendingPolicySelection === null || pendingPolicySelection === void 0 ? void 0 : pendingPolicySelection.policy.policyID)) {
            return;
        }
        createReport(pendingPolicySelection.policy.policyID);
        setPendingPolicySelection(null);
    }, [createReport, pendingPolicySelection === null || pendingPolicySelection === void 0 ? void 0 : pendingPolicySelection.policy.policyID]);
    var handleCancelCreateReport = (0, react_1.useCallback)(function () {
        setPendingPolicySelection(null);
    }, []);
    var _k = (0, useCreateEmptyReportConfirmation_1.default)({
        policyID: pendingPolicySelection === null || pendingPolicySelection === void 0 ? void 0 : pendingPolicySelection.policy.policyID,
        policyName: (_c = pendingPolicySelection === null || pendingPolicySelection === void 0 ? void 0 : pendingPolicySelection.policy.text) !== null && _c !== void 0 ? _c : '',
        onConfirm: handleConfirmCreateReport,
        onCancel: handleCancelCreateReport,
    }), openCreateReportConfirmation = _k.openCreateReportConfirmation, CreateReportConfirmationModal = _k.CreateReportConfirmationModal;
    (0, react_1.useEffect)(function () {
        if (!pendingPolicySelection) {
            return;
        }
        var policy = pendingPolicySelection.policy, shouldShowEmptyReportConfirmation = pendingPolicySelection.shouldShowEmptyReportConfirmation;
        var policyID = policy.policyID;
        if (!policyID) {
            return;
        }
        if (!shouldShowEmptyReportConfirmation) {
            // No empty report confirmation needed - create report directly and clear pending selection
            // policyID is guaranteed to be defined by the check above
            createReport(policyID);
            setPendingPolicySelection(null);
            return;
        }
        // Empty report confirmation needed - open confirmation modal (modal handles clearing pending selection via onConfirm/onCancel)
        openCreateReportConfirmation();
    }, [createReport, openCreateReportConfirmation, pendingPolicySelection]);
    var selectPolicy = (0, react_1.useCallback)(function (policy) {
        if (!(policy === null || policy === void 0 ? void 0 : policy.policyID)) {
            return;
        }
        if ((0, SubscriptionUtils_1.shouldRestrictUserBillableActions)(policy.policyID)) {
            Navigation_1.default.navigate(ROUTES_1.default.RESTRICTED_ACTION.getRoute(policy.policyID));
            return;
        }
        // Capture the decision about whether to show empty report confirmation
        setPendingPolicySelection({
            policy: policy,
            shouldShowEmptyReportConfirmation: !!(policiesWithEmptyReports === null || policiesWithEmptyReports === void 0 ? void 0 : policiesWithEmptyReports[policy.policyID]),
        });
    }, [policiesWithEmptyReports]);
    var hasPerDiemTransactions = (0, react_1.useMemo)(function () {
        if (selectedTransactionIDs && selectedTransactionIDs.length > 0 && allTransactions) {
            return selectedTransactionIDs.some(function (transactionID) {
                var transaction = allTransactions["".concat(ONYXKEYS_1.default.COLLECTION.TRANSACTION).concat(transactionID)];
                return transaction && (0, TransactionUtils_1.isPerDiemRequest)(transaction);
            });
        }
        return false;
    }, [selectedTransactionIDs, allTransactions]);
    var usersWorkspaces = (0, react_1.useMemo)(function () {
        if (!policies || (0, EmptyObject_1.isEmptyObject)(policies)) {
            return [];
        }
        return Object.values(policies)
            .filter(function (policy) {
            return (0, PolicyUtils_1.shouldShowPolicy)(policy, !!isOffline, currentUserPersonalDetails === null || currentUserPersonalDetails === void 0 ? void 0 : currentUserPersonalDetails.login) &&
                !(policy === null || policy === void 0 ? void 0 : policy.isJoinRequestPending) &&
                (policy === null || policy === void 0 ? void 0 : policy.isPolicyExpenseChatEnabled) &&
                (!hasPerDiemTransactions || (0, PolicyUtils_1.canSubmitPerDiemExpenseFromWorkspace)(policy));
        })
            .map(function (policy) {
            var _a;
            return ({
                text: (_a = policy === null || policy === void 0 ? void 0 : policy.name) !== null && _a !== void 0 ? _a : '',
                policyID: policy === null || policy === void 0 ? void 0 : policy.id,
                icons: [
                    {
                        source: (policy === null || policy === void 0 ? void 0 : policy.avatarURL) ? policy.avatarURL : (0, ReportUtils_1.getDefaultWorkspaceAvatar)(policy === null || policy === void 0 ? void 0 : policy.name),
                        fallbackIcon: Expensicons.FallbackWorkspaceAvatar,
                        name: policy === null || policy === void 0 ? void 0 : policy.name,
                        type: CONST_1.default.ICON_TYPE_WORKSPACE,
                        id: policy === null || policy === void 0 ? void 0 : policy.id,
                    },
                ],
                keyForList: policy === null || policy === void 0 ? void 0 : policy.id,
                isPolicyAdmin: (0, PolicyUtils_1.isPolicyAdmin)(policy),
                shouldSyncFocus: true,
            });
        })
            .sort(function (a, b) { return localeCompare(a.text, b.text); });
    }, [policies, isOffline, currentUserPersonalDetails === null || currentUserPersonalDetails === void 0 ? void 0 : currentUserPersonalDetails.login, localeCompare, hasPerDiemTransactions]);
    var filteredAndSortedUserWorkspaces = (0, react_1.useMemo)(function () { return usersWorkspaces.filter(function (policy) { var _a, _b; return (_a = policy.text) === null || _a === void 0 ? void 0 : _a.toLowerCase().includes((_b = debouncedSearchTerm === null || debouncedSearchTerm === void 0 ? void 0 : debouncedSearchTerm.toLowerCase()) !== null && _b !== void 0 ? _b : ''); }); }, [debouncedSearchTerm, usersWorkspaces]);
    var sections = (0, react_1.useMemo)(function () {
        var options = [
            {
                data: filteredAndSortedUserWorkspaces,
                shouldShow: true,
            },
        ];
        return options;
    }, [filteredAndSortedUserWorkspaces]);
    var areResultsFound = filteredAndSortedUserWorkspaces.length > 0;
    var headerMessage = (0, OptionsListUtils_1.getHeaderMessageForNonUserList)(areResultsFound, debouncedSearchTerm);
    return (<ScreenWrapper_1.default testID={NewReportWorkspaceSelectionPage.displayName} includeSafeAreaPaddingBottom shouldEnableMaxHeight>
            {function (_a) {
            var didScreenTransitionEnd = _a.didScreenTransitionEnd;
            return (<>
                    <HeaderWithBackButton_1.default title={translate('report.newReport.createReport')} onBackButtonPress={Navigation_1.default.goBack}/>
                    {CreateReportConfirmationModal}
                    {shouldShowLoadingIndicator ? (<FullscreenLoadingIndicator_1.default style={[styles.flex1, styles.pRelative]}/>) : (<>
                            <Text_1.default style={[styles.ph5, styles.mb3]}>{translate('report.newReport.chooseWorkspace')}</Text_1.default>
                            <SelectionListWithSections_1.default ListItem={UserListItem_1.default} sections={sections} onSelectRow={selectPolicy} textInputLabel={usersWorkspaces.length >= CONST_1.default.STANDARD_LIST_ITEM_LIMIT ? translate('common.search') : undefined} textInputValue={searchTerm} onChangeText={setSearchTerm} headerMessage={headerMessage} showLoadingPlaceholder={fetchStatus.status === 'loading' || !didScreenTransitionEnd}/>
                        </>)}
                </>);
        }}
        </ScreenWrapper_1.default>);
}
NewReportWorkspaceSelectionPage.displayName = 'NewReportWorkspaceSelectionPage';
exports.default = NewReportWorkspaceSelectionPage;
