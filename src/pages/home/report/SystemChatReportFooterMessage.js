"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Session_1 = require("@selectors/Session");
var react_1 = require("react");
var Banner_1 = require("@components/Banner");
var Expensicons_1 = require("@components/Icon/Expensicons");
var RenderHTML_1 = require("@components/RenderHTML");
var Text_1 = require("@components/Text");
var useEnvironment_1 = require("@hooks/useEnvironment");
var useLocalize_1 = require("@hooks/useLocalize");
var useOnyx_1 = require("@hooks/useOnyx");
var useThemeStyles_1 = require("@hooks/useThemeStyles");
var PolicyUtils_1 = require("@libs/PolicyUtils");
var CONST_1 = require("@src/CONST");
var ONYXKEYS_1 = require("@src/ONYXKEYS");
var ROUTES_1 = require("@src/ROUTES");
function SystemChatReportFooterMessage() {
    var translate = (0, useLocalize_1.default)().translate;
    var styles = (0, useThemeStyles_1.default)();
    var environmentURL = (0, useEnvironment_1.default)().environmentURL;
    var currentUserLogin = (0, useOnyx_1.default)(ONYXKEYS_1.default.SESSION, { selector: Session_1.emailSelector, canBeMissing: true })[0];
    var choice = (0, useOnyx_1.default)(ONYXKEYS_1.default.ONBOARDING_PURPOSE_SELECTED, { canBeMissing: true })[0];
    var policies = (0, useOnyx_1.default)(ONYXKEYS_1.default.COLLECTION.POLICY, { canBeMissing: true })[0];
    var activePolicyID = (0, useOnyx_1.default)(ONYXKEYS_1.default.NVP_ACTIVE_POLICY_ID, { canBeMissing: true })[0];
    var adminChatReportID = (0, react_1.useMemo)(function () {
        var _a;
        var adminPolicy = activePolicyID
            ? // This will be fixed as part of https://github.com/Expensify/Expensify/issues/507850
                // eslint-disable-next-line @typescript-eslint/no-deprecated
                (0, PolicyUtils_1.getPolicy)(activePolicyID)
            : Object.values(policies !== null && policies !== void 0 ? policies : {}).find(function (policy) { return (0, PolicyUtils_1.shouldShowPolicy)(policy, false, currentUserLogin) && (policy === null || policy === void 0 ? void 0 : policy.role) === CONST_1.default.POLICY.ROLE.ADMIN && (policy === null || policy === void 0 ? void 0 : policy.chatReportIDAdmins); });
        return String((_a = adminPolicy === null || adminPolicy === void 0 ? void 0 : adminPolicy.chatReportIDAdmins) !== null && _a !== void 0 ? _a : -1);
    }, [activePolicyID, policies, currentUserLogin]);
    var adminChatReport = (0, useOnyx_1.default)("".concat(ONYXKEYS_1.default.COLLECTION.REPORT).concat(adminChatReportID), { canBeMissing: true })[0];
    var content = (0, react_1.useMemo)(function () {
        var _a;
        switch (choice) {
            case CONST_1.default.ONBOARDING_CHOICES.MANAGE_TEAM:
                return (<RenderHTML_1.default html={translate('systemChatFooterMessage.newDotManageTeam', {
                        adminReportName: (_a = adminChatReport === null || adminChatReport === void 0 ? void 0 : adminChatReport.reportName) !== null && _a !== void 0 ? _a : CONST_1.default.REPORT.WORKSPACE_CHAT_ROOMS.ADMINS,
                        href: "".concat(environmentURL, "/").concat(ROUTES_1.default.REPORT_WITH_ID.getRoute(adminChatReport === null || adminChatReport === void 0 ? void 0 : adminChatReport.reportID)),
                    })}/>);
            default:
                return <RenderHTML_1.default html={translate('systemChatFooterMessage.default')}/>;
        }
    }, [adminChatReport === null || adminChatReport === void 0 ? void 0 : adminChatReport.reportName, adminChatReport === null || adminChatReport === void 0 ? void 0 : adminChatReport.reportID, choice, translate, environmentURL]);
    return (<Banner_1.default containerStyles={[styles.chatFooterBanner]} shouldShowIcon icon={Expensicons_1.Lightbulb} content={<Text_1.default suppressHighlighting style={styles.flex1}>
                    {content}
                </Text_1.default>}/>);
}
SystemChatReportFooterMessage.displayName = 'SystemChatReportFooterMessage';
exports.default = SystemChatReportFooterMessage;
