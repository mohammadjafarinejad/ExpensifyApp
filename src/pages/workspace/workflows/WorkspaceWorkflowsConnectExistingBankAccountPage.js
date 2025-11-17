"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var HeaderWithBackButton_1 = require("@components/HeaderWithBackButton");
var Expensicons = require("@components/Icon/Expensicons");
var ScreenWrapper_1 = require("@components/ScreenWrapper");
var ScrollView_1 = require("@components/ScrollView");
var Text_1 = require("@components/Text");
var useLocalize_1 = require("@hooks/useLocalize");
var useOnyx_1 = require("@hooks/useOnyx");
var useResponsiveLayout_1 = require("@hooks/useResponsiveLayout");
var useThemeStyles_1 = require("@hooks/useThemeStyles");
var Navigation_1 = require("@navigation/Navigation");
var PaymentMethodList_1 = require("@pages/settings/Wallet/PaymentMethodList");
var Policy_1 = require("@userActions/Policy/Policy");
var ReimbursementAccount_1 = require("@userActions/ReimbursementAccount");
var CONST_1 = require("@src/CONST");
var ONYXKEYS_1 = require("@src/ONYXKEYS");
var ROUTES_1 = require("@src/ROUTES");
function WorkspaceWorkflowsConnectExistingBankAccountPage(_a) {
    var _b, _c;
    var route = _a.route;
    var policyID = (_b = route.params) === null || _b === void 0 ? void 0 : _b.policyID;
    var policy = (0, useOnyx_1.default)("".concat(ONYXKEYS_1.default.COLLECTION.POLICY).concat(policyID), { canBeMissing: false })[0];
    var lastPaymentMethod = (0, useOnyx_1.default)(ONYXKEYS_1.default.NVP_LAST_PAYMENT_METHOD, { canBeMissing: true })[0];
    var policyName = (_c = policy === null || policy === void 0 ? void 0 : policy.name) !== null && _c !== void 0 ? _c : '';
    var shouldUseNarrowLayout = (0, useResponsiveLayout_1.default)().shouldUseNarrowLayout;
    var styles = (0, useThemeStyles_1.default)();
    var translate = (0, useLocalize_1.default)().translate;
    var handleAddBankAccountPress = function () {
        (0, ReimbursementAccount_1.navigateToBankAccountRoute)(route.params.policyID, ROUTES_1.default.WORKSPACE_WORKFLOWS.getRoute(route.params.policyID));
    };
    var handleItemPress = function (_a) {
        var _b, _c, _d;
        var methodID = _a.methodID;
        var newReimburserEmail = (_d = (_c = (_b = policy === null || policy === void 0 ? void 0 : policy.achAccount) === null || _b === void 0 ? void 0 : _b.reimburser) !== null && _c !== void 0 ? _c : policy === null || policy === void 0 ? void 0 : policy.owner) !== null && _d !== void 0 ? _d : '';
        (0, Policy_1.setWorkspaceReimbursement)({
            policyID: route.params.policyID,
            reimbursementChoice: CONST_1.default.POLICY.REIMBURSEMENT_CHOICES.REIMBURSEMENT_YES,
            bankAccountID: methodID !== null && methodID !== void 0 ? methodID : CONST_1.default.DEFAULT_NUMBER_ID,
            reimburserEmail: newReimburserEmail,
            lastPaymentMethod: lastPaymentMethod === null || lastPaymentMethod === void 0 ? void 0 : lastPaymentMethod[policyID],
            shouldUpdateLastPaymentMethod: true,
        });
        Navigation_1.default.setNavigationActionToMicrotaskQueue(function () { return Navigation_1.default.goBack(ROUTES_1.default.WORKSPACE_WORKFLOWS.getRoute(policyID)); });
    };
    return (<ScreenWrapper_1.default includeSafeAreaPaddingBottom={false} testID={WorkspaceWorkflowsConnectExistingBankAccountPage.displayName}>
            <HeaderWithBackButton_1.default title={translate('bankAccount.addBankAccount')} subtitle={policyName} onBackButtonPress={Navigation_1.default.goBack}/>
            <ScrollView_1.default style={[styles.w100, shouldUseNarrowLayout ? [styles.pt3, styles.ph5, styles.pb5] : [styles.pt5, styles.ph8, styles.pb8]]}>
                <Text_1.default>{translate('workspace.bankAccount.chooseAnExisting')}</Text_1.default>
                <PaymentMethodList_1.default onPress={handleItemPress} onAddBankAccountPress={handleAddBankAccountPress} style={[styles.mt5, [shouldUseNarrowLayout ? styles.mhn5 : styles.mhn8]]} listItemStyle={shouldUseNarrowLayout ? styles.ph5 : styles.ph8} itemIconRight={Expensicons.ArrowRight} filterType={CONST_1.default.BANK_ACCOUNT.TYPE.BUSINESS} shouldHideDefaultBadge/>
            </ScrollView_1.default>
        </ScreenWrapper_1.default>);
}
WorkspaceWorkflowsConnectExistingBankAccountPage.displayName = 'WorkspaceWorkflowsConnectExistingBankAccountPage';
exports.default = WorkspaceWorkflowsConnectExistingBankAccountPage;
