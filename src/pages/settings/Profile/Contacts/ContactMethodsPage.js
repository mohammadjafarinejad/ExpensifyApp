"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Account_1 = require("@selectors/Account");
var react_1 = require("react");
var react_native_1 = require("react-native");
var Button_1 = require("@components/Button");
var DelegateNoAccessModalProvider_1 = require("@components/DelegateNoAccessModalProvider");
var FixedFooter_1 = require("@components/FixedFooter");
var HeaderWithBackButton_1 = require("@components/HeaderWithBackButton");
var LockedAccountModalProvider_1 = require("@components/LockedAccountModalProvider");
var MenuItem_1 = require("@components/MenuItem");
var OfflineWithFeedback_1 = require("@components/OfflineWithFeedback");
var RenderHTML_1 = require("@components/RenderHTML");
var ScreenWrapper_1 = require("@components/ScreenWrapper");
var ScrollView_1 = require("@components/ScrollView");
var useLocalize_1 = require("@hooks/useLocalize");
var useOnyx_1 = require("@hooks/useOnyx");
var useThemeStyles_1 = require("@hooks/useThemeStyles");
var Navigation_1 = require("@libs/Navigation/Navigation");
var UserUtils_1 = require("@libs/UserUtils");
var CONST_1 = require("@src/CONST");
var ONYXKEYS_1 = require("@src/ONYXKEYS");
var ROUTES_1 = require("@src/ROUTES");
function ContactMethodsPage(_a) {
    var _b;
    var route = _a.route;
    var styles = (0, useThemeStyles_1.default)();
    var translate = (0, useLocalize_1.default)().translate;
    var loginList = (0, useOnyx_1.default)(ONYXKEYS_1.default.LOGIN_LIST, { canBeMissing: false })[0];
    var session = (0, useOnyx_1.default)(ONYXKEYS_1.default.SESSION, { canBeMissing: false })[0];
    var navigateBackTo = (_b = route === null || route === void 0 ? void 0 : route.params) === null || _b === void 0 ? void 0 : _b.backTo;
    var _c = (0, react_1.useContext)(DelegateNoAccessModalProvider_1.DelegateNoAccessContext), isActingAsDelegate = _c.isActingAsDelegate, showDelegateNoAccessModal = _c.showDelegateNoAccessModal;
    var isUserValidated = (0, useOnyx_1.default)(ONYXKEYS_1.default.ACCOUNT, { selector: Account_1.isUserValidatedSelector, canBeMissing: false })[0];
    var _d = (0, react_1.useContext)(LockedAccountModalProvider_1.LockedAccountContext), isAccountLocked = _d.isAccountLocked, showLockedAccountModal = _d.showLockedAccountModal;
    var options = (0, react_1.useMemo)(function () { return (0, UserUtils_1.getContactMethodsOptions)(translate, loginList, session === null || session === void 0 ? void 0 : session.email); }, [translate, loginList, session === null || session === void 0 ? void 0 : session.email]);
    var onNewContactMethodButtonPress = (0, react_1.useCallback)(function () {
        if (isActingAsDelegate) {
            showDelegateNoAccessModal();
            return;
        }
        if (isAccountLocked) {
            showLockedAccountModal();
            return;
        }
        if (!isUserValidated) {
            Navigation_1.default.navigate(ROUTES_1.default.SETTINGS_CONTACT_METHOD_VERIFY_ACCOUNT.getRoute(Navigation_1.default.getActiveRoute(), ROUTES_1.default.SETTINGS_NEW_CONTACT_METHOD.getRoute(navigateBackTo)));
            return;
        }
        Navigation_1.default.navigate(ROUTES_1.default.SETTINGS_NEW_CONTACT_METHOD.getRoute(navigateBackTo));
    }, [navigateBackTo, isActingAsDelegate, showDelegateNoAccessModal, isAccountLocked, isUserValidated, showLockedAccountModal]);
    return (<ScreenWrapper_1.default shouldEnableKeyboardAvoidingView={false} testID={ContactMethodsPage.displayName}>
            <HeaderWithBackButton_1.default title={translate('contacts.contactMethods')} onBackButtonPress={function () { return Navigation_1.default.goBack(); }}/>
            <ScrollView_1.default contentContainerStyle={styles.flexGrow1}>
                <react_native_1.View style={[styles.ph5, styles.mv3, styles.flexRow, styles.flexWrap]}>
                    <RenderHTML_1.default html={translate('contacts.helpText', { email: CONST_1.default.EMAIL.RECEIPTS })}/>
                </react_native_1.View>
                {options.map(function (option) {
            return !!option && (<OfflineWithFeedback_1.default pendingAction={option.pendingAction} key={option.partnerUserID}>
                                <MenuItem_1.default title={option.menuItemTitle} description={option.description} onPress={function () { return Navigation_1.default.navigate(ROUTES_1.default.SETTINGS_CONTACT_METHOD_DETAILS.getRoute(option.partnerUserID, navigateBackTo)); }} brickRoadIndicator={option.indicator} shouldShowBasicTitle shouldShowRightIcon disabled={!!option.pendingAction}/>
                            </OfflineWithFeedback_1.default>);
        })}
                <FixedFooter_1.default style={[styles.mtAuto, styles.pt5]}>
                    <Button_1.default large success text={translate('contacts.newContactMethod')} onPress={onNewContactMethodButtonPress} pressOnEnter/>
                </FixedFooter_1.default>
            </ScrollView_1.default>
        </ScreenWrapper_1.default>);
}
ContactMethodsPage.displayName = 'ContactMethodsPage';
exports.default = ContactMethodsPage;
