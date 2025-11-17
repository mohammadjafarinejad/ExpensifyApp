"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var ApproverSelectionList_1 = require("@components/ApproverSelectionList");
var Badge_1 = require("@components/Badge");
var FormAlertWithSubmitButton_1 = require("@components/FormAlertWithSubmitButton");
var Expensicons_1 = require("@components/Icon/Expensicons");
var Text_1 = require("@components/Text");
var useCurrentUserPersonalDetails_1 = require("@hooks/useCurrentUserPersonalDetails");
var useLocalize_1 = require("@hooks/useLocalize");
var useOnyx_1 = require("@hooks/useOnyx");
var usePermissions_1 = require("@hooks/usePermissions");
var useThemeStyles_1 = require("@hooks/useThemeStyles");
var IOU_1 = require("@libs/actions/IOU");
var Navigation_1 = require("@libs/Navigation/Navigation");
var PolicyUtils_1 = require("@libs/PolicyUtils");
var ReportUtils_1 = require("@libs/ReportUtils");
var CONST_1 = require("@src/CONST");
var ONYXKEYS_1 = require("@src/ONYXKEYS");
var ROUTES_1 = require("@src/ROUTES");
var withReportOrNotFound_1 = require("./home/report/withReportOrNotFound");
function ReportAddApproverPage(_a) {
    var report = _a.report, isLoadingReportData = _a.isLoadingReportData, policy = _a.policy;
    var styles = (0, useThemeStyles_1.default)();
    var translate = (0, useLocalize_1.default)().translate;
    var _b = (0, react_1.useState)(undefined), selectedApproverEmail = _b[0], setSelectedApproverEmail = _b[1];
    var personalDetails = (0, useOnyx_1.default)(ONYXKEYS_1.default.PERSONAL_DETAILS_LIST, { canBeMissing: false })[0];
    var isBetaEnabled = (0, usePermissions_1.default)().isBetaEnabled;
    var transactionViolations = (0, useOnyx_1.default)(ONYXKEYS_1.default.COLLECTION.TRANSACTION_VIOLATIONS, { canBeMissing: true })[0];
    var isASAPSubmitBetaEnabled = isBetaEnabled(CONST_1.default.BETAS.ASAP_SUBMIT);
    var hasViolations = (0, ReportUtils_1.hasViolations)(report === null || report === void 0 ? void 0 : report.reportID, transactionViolations);
    var currentUserDetails = (0, useCurrentUserPersonalDetails_1.default)();
    var employeeList = policy === null || policy === void 0 ? void 0 : policy.employeeList;
    var allApprovers = (0, react_1.useMemo)(function () {
        if (!employeeList) {
            return [];
        }
        var policyMemberEmailsToAccountIDs = (0, PolicyUtils_1.getMemberAccountIDsForWorkspace)(employeeList, true, false);
        return Object.values(employeeList)
            .map(function (employee) {
            var _a, _b, _c;
            var isAdmin = (employee === null || employee === void 0 ? void 0 : employee.role) === CONST_1.default.REPORT.ROLE.ADMIN;
            var email = employee.email;
            if (!email) {
                return null;
            }
            var accountID = Number((_a = policyMemberEmailsToAccountIDs[email]) !== null && _a !== void 0 ? _a : CONST_1.default.DEFAULT_NUMBER_ID);
            var isPendingDelete = ((_b = employeeList === null || employeeList === void 0 ? void 0 : employeeList[accountID]) === null || _b === void 0 ? void 0 : _b.pendingAction) === CONST_1.default.RED_BRICK_ROAD_PENDING_ACTION.DELETE;
            // Filter the current report approver and members which are pending for deletion
            if (report.managerID === accountID || isPendingDelete || !(0, ReportUtils_1.isAllowedToApproveExpenseReport)(report, accountID, policy)) {
                return null;
            }
            var avatar = ((_c = personalDetails === null || personalDetails === void 0 ? void 0 : personalDetails[accountID]) !== null && _c !== void 0 ? _c : {}).avatar;
            var displayName = (0, ReportUtils_1.getDisplayNameForParticipant)({ accountID: accountID, personalDetailsData: personalDetails });
            return {
                text: displayName,
                alternateText: email,
                keyForList: email,
                isSelected: selectedApproverEmail === email,
                login: email,
                value: accountID,
                icons: [{ source: avatar !== null && avatar !== void 0 ? avatar : Expensicons_1.FallbackAvatar, type: CONST_1.default.ICON_TYPE_AVATAR, name: displayName, id: accountID }],
                rightElement: isAdmin ? <Badge_1.default text={translate('common.admin')}/> : undefined,
            };
        })
            .filter(function (approver) { return !!approver; });
    }, [employeeList, report, policy, personalDetails, selectedApproverEmail, translate]);
    var addApprover = (0, react_1.useCallback)(function () {
        var _a, _b;
        var employeeAccountID = (_a = allApprovers.find(function (approver) { return approver.login === selectedApproverEmail; })) === null || _a === void 0 ? void 0 : _a.value;
        if (!selectedApproverEmail || !employeeAccountID) {
            return;
        }
        (0, IOU_1.addReportApprover)(report, selectedApproverEmail, Number(employeeAccountID), currentUserDetails.accountID, (_b = currentUserDetails.email) !== null && _b !== void 0 ? _b : '', policy, hasViolations, isASAPSubmitBetaEnabled);
        Navigation_1.default.dismissModal();
    }, [allApprovers, selectedApproverEmail, report, currentUserDetails.accountID, currentUserDetails.email, policy, hasViolations, isASAPSubmitBetaEnabled]);
    var button = (0, react_1.useMemo)(function () {
        return (<FormAlertWithSubmitButton_1.default isDisabled={!selectedApproverEmail} buttonText={translate('common.save')} onSubmit={addApprover} containerStyles={[styles.flexReset, styles.flexGrow0, styles.flexShrink0, styles.flexBasisAuto]} enabledWhenOffline shouldBlendOpacity/>);
    }, [addApprover, selectedApproverEmail, styles.flexBasisAuto, styles.flexGrow0, styles.flexReset, styles.flexShrink0, translate]);
    var toggleApprover = (0, react_1.useCallback)(function (approvers) {
        var _a;
        setSelectedApproverEmail(approvers.length ? (_a = approvers.at(0)) === null || _a === void 0 ? void 0 : _a.login : undefined);
    }, []);
    // eslint-disable-next-line rulesdir/no-negated-variables
    var shouldShowNotFoundView = !(0, ReportUtils_1.isMoneyRequestReport)(report) || (0, ReportUtils_1.isMoneyRequestReportPendingDeletion)(report);
    return (<ApproverSelectionList_1.default testID={ReportAddApproverPage.displayName} headerTitle={translate('iou.changeApprover.actions.addApprover')} onBackButtonPress={function () {
            Navigation_1.default.goBack(ROUTES_1.default.REPORT_CHANGE_APPROVER.getRoute(report.reportID), { compareParams: false });
        }} subtitle={<Text_1.default style={[styles.ph5, styles.pb3]}>{translate('iou.changeApprover.addApprover.subtitle')}</Text_1.default>} isLoadingReportData={isLoadingReportData} policy={policy} initiallyFocusedOptionKey={selectedApproverEmail} shouldShowNotFoundViewLink={false} shouldShowNotFoundView={shouldShowNotFoundView} allApprovers={allApprovers} listEmptyContentSubtitle={translate('workflowsPage.emptyContent.approverSubtitle')} allowMultipleSelection={false} onSelectApprover={toggleApprover} footerContent={button}/>);
}
ReportAddApproverPage.displayName = 'ReportAddApproverPage';
exports.default = (0, withReportOrNotFound_1.default)()(ReportAddApproverPage);
