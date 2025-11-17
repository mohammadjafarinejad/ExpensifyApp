"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var native_1 = require("@react-navigation/native");
var react_1 = require("react");
var ApproverSelectionList_1 = require("@components/ApproverSelectionList");
var Expensicons_1 = require("@components/Icon/Expensicons");
var Text_1 = require("@components/Text");
var useLocalize_1 = require("@hooks/useLocalize");
var useOnyx_1 = require("@hooks/useOnyx");
var useThemeStyles_1 = require("@hooks/useThemeStyles");
var Workflow_1 = require("@libs/actions/Workflow");
var Navigation_1 = require("@libs/Navigation/Navigation");
var PolicyUtils_1 = require("@libs/PolicyUtils");
var AccessOrNotFoundWrapper_1 = require("@pages/workspace/AccessOrNotFoundWrapper");
var MemberRightIcon_1 = require("@pages/workspace/MemberRightIcon");
var withPolicyAndFullscreenLoading_1 = require("@pages/workspace/withPolicyAndFullscreenLoading");
var CONST_1 = require("@src/CONST");
var ONYXKEYS_1 = require("@src/ONYXKEYS");
var ROUTES_1 = require("@src/ROUTES");
var PersonalDetails_1 = require("@src/selectors/PersonalDetails");
var isLoadingOnyxValue_1 = require("@src/types/utils/isLoadingOnyxValue");
function WorkspaceWorkflowsApprovalsApproverPage(_a) {
    var _b, _c, _d, _e;
    var policy = _a.policy, personalDetails = _a.personalDetails, _f = _a.isLoadingReportData, isLoadingReportData = _f === void 0 ? true : _f, route = _a.route;
    var styles = (0, useThemeStyles_1.default)();
    var translate = (0, useLocalize_1.default)().translate;
    var _g = (0, useOnyx_1.default)(ONYXKEYS_1.default.APPROVAL_WORKFLOW, { canBeMissing: true }), approvalWorkflow = _g[0], approvalWorkflowMetadata = _g[1];
    var isApprovalWorkflowLoading = (0, isLoadingOnyxValue_1.default)(approvalWorkflowMetadata);
    var currentApprovalWorkflow = (0, useOnyx_1.default)(ONYXKEYS_1.default.APPROVAL_WORKFLOW, { canBeMissing: true })[0];
    var personalDetailsByEmail = (0, useOnyx_1.default)(ONYXKEYS_1.default.PERSONAL_DETAILS_LIST, {
        canBeMissing: true,
        selector: PersonalDetails_1.personalDetailsByEmailSelector,
    })[0];
    var _h = (0, react_1.useState)(undefined), selectedApproverEmail = _h[0], setSelectedApproverEmail = _h[1];
    var approverIndex = (_b = Number(route.params.approverIndex)) !== null && _b !== void 0 ? _b : 0;
    var isInitialCreationFlow = (approvalWorkflow === null || approvalWorkflow === void 0 ? void 0 : approvalWorkflow.action) === CONST_1.default.APPROVAL_WORKFLOW.ACTION.CREATE && !route.params.backTo;
    var defaultApprover = (0, PolicyUtils_1.getDefaultApprover)(policy);
    var firstApprover = (_e = (_d = (_c = approvalWorkflow === null || approvalWorkflow === void 0 ? void 0 : approvalWorkflow.approvers) === null || _c === void 0 ? void 0 : _c[0]) === null || _d === void 0 ? void 0 : _d.email) !== null && _e !== void 0 ? _e : '';
    var rhpRoutes = (0, native_1.useNavigationState)(function (state) { return state.routes; });
    (0, react_1.useEffect)(function () {
        var currentApprover = approvalWorkflow === null || approvalWorkflow === void 0 ? void 0 : approvalWorkflow.approvers[approverIndex];
        if (!currentApprover) {
            return;
        }
        setSelectedApproverEmail(currentApprover.email);
    }, [approvalWorkflow === null || approvalWorkflow === void 0 ? void 0 : approvalWorkflow.approvers, approverIndex]);
    var employeeList = policy === null || policy === void 0 ? void 0 : policy.employeeList;
    var approversFromWorkflow = approvalWorkflow === null || approvalWorkflow === void 0 ? void 0 : approvalWorkflow.approvers;
    var isDefault = approvalWorkflow === null || approvalWorkflow === void 0 ? void 0 : approvalWorkflow.isDefault;
    var membersEmail = (0, react_1.useMemo)(function () { return approvalWorkflow === null || approvalWorkflow === void 0 ? void 0 : approvalWorkflow.members.map(function (member) { return member.email; }); }, [approvalWorkflow === null || approvalWorkflow === void 0 ? void 0 : approvalWorkflow.members]);
    var allApprovers = (0, react_1.useMemo)(function () {
        if (isApprovalWorkflowLoading || !employeeList) {
            return [];
        }
        return Object.values(employeeList)
            .map(function (employee) {
            var _a, _b;
            var email = employee.email;
            if (!email) {
                return null;
            }
            if (!isDefault && (policy === null || policy === void 0 ? void 0 : policy.preventSelfApproval) && (membersEmail === null || membersEmail === void 0 ? void 0 : membersEmail.includes(email))) {
                return null;
            }
            // Do not allow the same email to be added twice
            var isEmailAlreadyInApprovers = approversFromWorkflow === null || approversFromWorkflow === void 0 ? void 0 : approversFromWorkflow.some(function (approver, index) { return (approver === null || approver === void 0 ? void 0 : approver.email) === email && index !== approverIndex; });
            if (isEmailAlreadyInApprovers && selectedApproverEmail !== email) {
                return null;
            }
            // Do not allow the default approver to be added as the first approver
            if (!isDefault && approverIndex === 0 && defaultApprover === email) {
                return null;
            }
            var policyMemberEmailsToAccountIDs = (0, PolicyUtils_1.getMemberAccountIDsForWorkspace)(employeeList);
            var accountID = Number((_a = policyMemberEmailsToAccountIDs[email]) !== null && _a !== void 0 ? _a : '');
            var _c = (_b = personalDetails === null || personalDetails === void 0 ? void 0 : personalDetails[accountID]) !== null && _b !== void 0 ? _b : {}, avatar = _c.avatar, _d = _c.displayName, displayName = _d === void 0 ? email : _d, login = _c.login;
            return {
                text: displayName,
                alternateText: email,
                keyForList: email,
                isSelected: selectedApproverEmail === email,
                login: email,
                icons: [{ source: avatar !== null && avatar !== void 0 ? avatar : Expensicons_1.FallbackAvatar, type: CONST_1.default.ICON_TYPE_AVATAR, name: displayName, id: accountID }],
                rightElement: (<MemberRightIcon_1.default role={employee.role} owner={policy === null || policy === void 0 ? void 0 : policy.owner} login={login}/>),
            };
        })
            .filter(function (approver) { return !!approver; });
    }, [
        isApprovalWorkflowLoading,
        employeeList,
        policy === null || policy === void 0 ? void 0 : policy.preventSelfApproval,
        policy === null || policy === void 0 ? void 0 : policy.owner,
        membersEmail,
        approversFromWorkflow,
        selectedApproverEmail,
        isDefault,
        approverIndex,
        defaultApprover,
        personalDetails,
    ]);
    var shouldShowListEmptyContent = !!approvalWorkflow && !isApprovalWorkflowLoading;
    var goBack = (0, react_1.useCallback)(function () {
        var backTo;
        if (isInitialCreationFlow) {
            backTo = ROUTES_1.default.WORKSPACE_WORKFLOWS_APPROVALS_EXPENSES_FROM.getRoute(route.params.policyID);
            (0, Workflow_1.clearApprovalWorkflowApprovers)();
        }
        else if ((approvalWorkflow === null || approvalWorkflow === void 0 ? void 0 : approvalWorkflow.action) === CONST_1.default.APPROVAL_WORKFLOW.ACTION.EDIT) {
            backTo = rhpRoutes.length > 1 ? undefined : ROUTES_1.default.WORKSPACE_WORKFLOWS_APPROVALS_EDIT.getRoute(route.params.policyID, firstApprover);
        }
        else {
            backTo = ROUTES_1.default.WORKSPACE_WORKFLOWS_APPROVALS_NEW.getRoute(route.params.policyID);
        }
        Navigation_1.default.goBack(backTo);
    }, [isInitialCreationFlow, approvalWorkflow === null || approvalWorkflow === void 0 ? void 0 : approvalWorkflow.action, route.params.policyID, rhpRoutes.length, firstApprover]);
    var toggleApprover = (0, react_1.useCallback)(function (approvers) {
        var _a, _b;
        var approver = approvers.at(0);
        if (selectedApproverEmail === (approver === null || approver === void 0 ? void 0 : approver.login)) {
            (0, Workflow_1.clearApprovalWorkflowApprover)({ approverIndex: approverIndex, currentApprovalWorkflow: currentApprovalWorkflow });
        }
        else {
            var newSelectedEmail = (_a = approver === null || approver === void 0 ? void 0 : approver.login) !== null && _a !== void 0 ? _a : '';
            var policyMemberEmailsToAccountIDs = (0, PolicyUtils_1.getMemberAccountIDsForWorkspace)(employeeList);
            var accountID = Number(newSelectedEmail ? policyMemberEmailsToAccountIDs[newSelectedEmail] : '');
            var _c = (_b = personalDetails === null || personalDetails === void 0 ? void 0 : personalDetails[accountID]) !== null && _b !== void 0 ? _b : {}, avatar = _c.avatar, _d = _c.displayName, displayName = _d === void 0 ? newSelectedEmail : _d;
            (0, Workflow_1.setApprovalWorkflowApprover)({
                approver: {
                    email: newSelectedEmail,
                    avatar: avatar,
                    displayName: displayName,
                },
                approverIndex: approverIndex,
                currentApprovalWorkflow: currentApprovalWorkflow,
                policy: policy,
                personalDetailsByEmail: personalDetailsByEmail,
            });
        }
        if (isInitialCreationFlow) {
            Navigation_1.default.navigate(ROUTES_1.default.WORKSPACE_WORKFLOWS_APPROVALS_NEW.getRoute(route.params.policyID));
        }
        else {
            goBack();
        }
    }, [selectedApproverEmail, isInitialCreationFlow, approverIndex, currentApprovalWorkflow, employeeList, personalDetails, policy, route.params.policyID, goBack, personalDetailsByEmail]);
    var subtitle = (0, react_1.useMemo)(function () {
        return (approvalWorkflow === null || approvalWorkflow === void 0 ? void 0 : approvalWorkflow.action) === CONST_1.default.APPROVAL_WORKFLOW.ACTION.CREATE &&
            !shouldShowListEmptyContent && <Text_1.default style={[styles.textHeadlineH1, styles.mh5, styles.mv3]}>{translate('workflowsApproverPage.header')}</Text_1.default>;
    }, [approvalWorkflow === null || approvalWorkflow === void 0 ? void 0 : approvalWorkflow.action, shouldShowListEmptyContent, translate, styles.textHeadlineH1, styles.mh5, styles.mv3]);
    return (<AccessOrNotFoundWrapper_1.default policyID={route.params.policyID} featureName={CONST_1.default.POLICY.MORE_FEATURES.ARE_WORKFLOWS_ENABLED}>
            <ApproverSelectionList_1.default testID={WorkspaceWorkflowsApprovalsApproverPage.displayName} headerTitle={translate('workflowsPage.approver')} subtitle={subtitle} isLoadingReportData={isLoadingReportData} policy={policy} initiallyFocusedOptionKey={selectedApproverEmail} shouldShowNotFoundViewLink allApprovers={allApprovers} onBackButtonPress={goBack} shouldShowListEmptyContent={shouldShowListEmptyContent} listEmptyContentSubtitle={translate('workflowsPage.emptyContent.approverSubtitle')} allowMultipleSelection={false} onSelectApprover={toggleApprover}/>
        </AccessOrNotFoundWrapper_1.default>);
}
WorkspaceWorkflowsApprovalsApproverPage.displayName = 'WorkspaceWorkflowsApprovalsApproverPage';
exports.default = (0, withPolicyAndFullscreenLoading_1.default)(WorkspaceWorkflowsApprovalsApproverPage);
