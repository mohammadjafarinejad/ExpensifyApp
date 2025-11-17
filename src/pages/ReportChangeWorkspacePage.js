"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var FullscreenLoadingIndicator_1 = require("@components/FullscreenLoadingIndicator");
var HeaderWithBackButton_1 = require("@components/HeaderWithBackButton");
var OnyxListItemProvider_1 = require("@components/OnyxListItemProvider");
var ScreenWrapper_1 = require("@components/ScreenWrapper");
var SelectionListWithSections_1 = require("@components/SelectionListWithSections");
var UserListItem_1 = require("@components/SelectionListWithSections/UserListItem");
var useDebouncedState_1 = require("@hooks/useDebouncedState");
var useLocalize_1 = require("@hooks/useLocalize");
var useNetwork_1 = require("@hooks/useNetwork");
var useOnyx_1 = require("@hooks/useOnyx");
var usePermissions_1 = require("@hooks/usePermissions");
var useReportIsArchived_1 = require("@hooks/useReportIsArchived");
var useThemeStyles_1 = require("@hooks/useThemeStyles");
var useWorkspaceList_1 = require("@hooks/useWorkspaceList");
var Report_1 = require("@libs/actions/Report");
var Navigation_1 = require("@libs/Navigation/Navigation");
var PersonalDetailsUtils_1 = require("@libs/PersonalDetailsUtils");
var PolicyUtils_1 = require("@libs/PolicyUtils");
var ReportUtils_1 = require("@libs/ReportUtils");
var CONST_1 = require("@src/CONST");
var ONYXKEYS_1 = require("@src/ONYXKEYS");
var NotFoundPage_1 = require("./ErrorPage/NotFoundPage");
var withReportOrNotFound_1 = require("./home/report/withReportOrNotFound");
var changePolicyTrainingModalDismissedSelector = function (nvpDismissedProductTraining) {
    return !!(nvpDismissedProductTraining === null || nvpDismissedProductTraining === void 0 ? void 0 : nvpDismissedProductTraining[CONST_1.default.CHANGE_POLICY_TRAINING_MODAL]);
};
function ReportChangeWorkspacePage(_a) {
    var report = _a.report, route = _a.route;
    var reportID = report === null || report === void 0 ? void 0 : report.reportID;
    var isOffline = (0, useNetwork_1.default)().isOffline;
    var styles = (0, useThemeStyles_1.default)();
    var _b = (0, useDebouncedState_1.default)(''), searchTerm = _b[0], debouncedSearchTerm = _b[1], setSearchTerm = _b[2];
    var _c = (0, useLocalize_1.default)(), translate = _c.translate, formatPhoneNumber = _c.formatPhoneNumber, localeCompare = _c.localeCompare;
    var _d = (0, useOnyx_1.default)(ONYXKEYS_1.default.COLLECTION.POLICY, { canBeMissing: false }), policies = _d[0], fetchStatus = _d[1];
    var reportNextStep = (0, useOnyx_1.default)("".concat(ONYXKEYS_1.default.COLLECTION.NEXT_STEP).concat(reportID), { canBeMissing: true })[0];
    var _e = (0, useOnyx_1.default)(ONYXKEYS_1.default.NVP_DISMISSED_PRODUCT_TRAINING, { canBeMissing: true, selector: changePolicyTrainingModalDismissedSelector })[0], isChangePolicyTrainingModalDismissed = _e === void 0 ? false : _e;
    var isLoadingApp = (0, useOnyx_1.default)(ONYXKEYS_1.default.IS_LOADING_APP, { canBeMissing: false })[0];
    var transactionViolations = (0, useOnyx_1.default)(ONYXKEYS_1.default.COLLECTION.TRANSACTION_VIOLATIONS, { canBeMissing: true })[0];
    var isReportLastVisibleArchived = (0, useReportIsArchived_1.default)(report === null || report === void 0 ? void 0 : report.parentReportID);
    var submitterEmailSelector = (0, react_1.useCallback)(function (personalDetailsList) { var _a, _b; return (_b = personalDetailsList === null || personalDetailsList === void 0 ? void 0 : personalDetailsList[(_a = report === null || report === void 0 ? void 0 : report.ownerAccountID) !== null && _a !== void 0 ? _a : CONST_1.default.DEFAULT_NUMBER_ID]) === null || _b === void 0 ? void 0 : _b.login; }, [report === null || report === void 0 ? void 0 : report.ownerAccountID]);
    var submitterEmail = (0, useOnyx_1.default)(ONYXKEYS_1.default.PERSONAL_DETAILS_LIST, { canBeMissing: false, selector: submitterEmailSelector }, [submitterEmailSelector])[0];
    var shouldShowLoadingIndicator = isLoadingApp && !isOffline;
    var isBetaEnabled = (0, usePermissions_1.default)().isBetaEnabled;
    var isASAPSubmitBetaEnabled = isBetaEnabled(CONST_1.default.BETAS.ASAP_SUBMIT);
    var session = (0, OnyxListItemProvider_1.useSession)();
    var hasViolations = (0, ReportUtils_1.hasViolations)(report === null || report === void 0 ? void 0 : report.reportID, transactionViolations);
    var selectPolicy = (0, react_1.useCallback)(function (policyID) {
        var _a, _b, _c, _d;
        var policy = policies === null || policies === void 0 ? void 0 : policies["".concat(ONYXKEYS_1.default.COLLECTION.POLICY).concat(policyID)];
        if (!policyID || !policy) {
            return;
        }
        var backTo = route.params.backTo;
        Navigation_1.default.goBack(backTo);
        if ((0, ReportUtils_1.isIOUReport)(reportID)) {
            var invite = (0, Report_1.moveIOUReportToPolicyAndInviteSubmitter)(reportID, policy, formatPhoneNumber);
            if (!(invite === null || invite === void 0 ? void 0 : invite.policyExpenseChatReportID)) {
                (0, Report_1.moveIOUReportToPolicy)(reportID, policy);
            }
            // This will be fixed as part of https://github.com/Expensify/Expensify/issues/507850
            // eslint-disable-next-line @typescript-eslint/no-deprecated
        }
        else if ((0, ReportUtils_1.isExpenseReport)(report) && (0, PolicyUtils_1.isPolicyAdmin)(policy) && report.ownerAccountID && !(0, PolicyUtils_1.isPolicyMember)(policy, (0, PersonalDetailsUtils_1.getLoginByAccountID)(report.ownerAccountID))) {
            var employeeList = policy === null || policy === void 0 ? void 0 : policy.employeeList;
            (0, Report_1.changeReportPolicyAndInviteSubmitter)(report, policy, (_a = session === null || session === void 0 ? void 0 : session.accountID) !== null && _a !== void 0 ? _a : CONST_1.default.DEFAULT_NUMBER_ID, (_b = session === null || session === void 0 ? void 0 : session.email) !== null && _b !== void 0 ? _b : '', hasViolations, isChangePolicyTrainingModalDismissed, isASAPSubmitBetaEnabled, employeeList, formatPhoneNumber, isReportLastVisibleArchived);
        }
        else {
            (0, Report_1.changeReportPolicy)(report, policy, (_c = session === null || session === void 0 ? void 0 : session.accountID) !== null && _c !== void 0 ? _c : CONST_1.default.DEFAULT_NUMBER_ID, (_d = session === null || session === void 0 ? void 0 : session.email) !== null && _d !== void 0 ? _d : '', hasViolations, isChangePolicyTrainingModalDismissed, isASAPSubmitBetaEnabled, reportNextStep, isReportLastVisibleArchived);
        }
    }, [
        policies,
        route.params,
        reportID,
        report,
        formatPhoneNumber,
        isReportLastVisibleArchived,
        session === null || session === void 0 ? void 0 : session.accountID,
        session === null || session === void 0 ? void 0 : session.email,
        hasViolations,
        isASAPSubmitBetaEnabled,
        reportNextStep,
        isChangePolicyTrainingModalDismissed,
    ]);
    var _f = (0, useWorkspaceList_1.default)({
        policies: policies,
        currentUserLogin: session === null || session === void 0 ? void 0 : session.email,
        shouldShowPendingDeletePolicy: false,
        selectedPolicyIDs: report.policyID ? [report.policyID] : undefined,
        searchTerm: debouncedSearchTerm,
        localeCompare: localeCompare,
        additionalFilter: function (newPolicy) { return (0, ReportUtils_1.isWorkspaceEligibleForReportChange)(submitterEmail, newPolicy); },
    }), sections = _f.sections, shouldShowNoResultsFoundMessage = _f.shouldShowNoResultsFoundMessage, shouldShowSearchInput = _f.shouldShowSearchInput;
    if (!(0, ReportUtils_1.isMoneyRequestReport)(report) || (0, ReportUtils_1.isMoneyRequestReportPendingDeletion)(report)) {
        return <NotFoundPage_1.default />;
    }
    return (<ScreenWrapper_1.default testID={ReportChangeWorkspacePage.displayName} includeSafeAreaPaddingBottom shouldEnableMaxHeight>
            {function (_a) {
            var didScreenTransitionEnd = _a.didScreenTransitionEnd;
            return (<>
                    <HeaderWithBackButton_1.default title={translate('iou.changeWorkspace')} onBackButtonPress={function () {
                    var backTo = route.params.backTo;
                    Navigation_1.default.goBack(backTo);
                }}/>
                    {shouldShowLoadingIndicator ? (<FullscreenLoadingIndicator_1.default style={[styles.flex1, styles.pRelative]}/>) : (<SelectionListWithSections_1.default ListItem={UserListItem_1.default} sections={sections} onSelectRow={function (option) { return selectPolicy(option.policyID); }} textInputLabel={shouldShowSearchInput ? translate('common.search') : undefined} textInputValue={searchTerm} onChangeText={setSearchTerm} headerMessage={shouldShowNoResultsFoundMessage ? translate('common.noResultsFound') : ''} initiallyFocusedOptionKey={report.policyID} showLoadingPlaceholder={fetchStatus.status === 'loading' || !didScreenTransitionEnd}/>)}
                </>);
        }}
        </ScreenWrapper_1.default>);
}
ReportChangeWorkspacePage.displayName = 'ReportChangeWorkspacePage';
exports.default = (0, withReportOrNotFound_1.default)()(ReportChangeWorkspacePage);
