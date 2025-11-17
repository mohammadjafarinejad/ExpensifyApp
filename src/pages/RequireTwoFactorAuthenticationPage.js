"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Account_1 = require("@selectors/Account");
var react_1 = require("react");
var react_native_1 = require("react-native");
var Button_1 = require("@components/Button");
var Icon_1 = require("@components/Icon");
var Illustrations_1 = require("@components/Icon/Illustrations");
var ScreenWrapper_1 = require("@components/ScreenWrapper");
var Text_1 = require("@components/Text");
var useLocalize_1 = require("@hooks/useLocalize");
var useOnyx_1 = require("@hooks/useOnyx");
var useThemeStyles_1 = require("@hooks/useThemeStyles");
var Navigation_1 = require("@libs/Navigation/Navigation");
var variables_1 = require("@styles/variables");
var CONST_1 = require("@src/CONST");
var ONYXKEYS_1 = require("@src/ONYXKEYS");
var ROUTES_1 = require("@src/ROUTES");
var Session_1 = require("@src/selectors/Session");
/**
 * Checks if the 2FA is required because of Xero.
 * - User is an admin of a workspace
 * - Xero connection is enabled in the workspace
 */
var is2FARequiredBecauseOfXeroSelector = function (email) {
    return function (workspaces) {
        var _a;
        return (_a = Object.values(workspaces !== null && workspaces !== void 0 ? workspaces : {})) === null || _a === void 0 ? void 0 : _a.some(function (workspace) {
            var _a, _b, _c;
            var isXeroConnectionEnabled = (_a = workspace === null || workspace === void 0 ? void 0 : workspace.connections) === null || _a === void 0 ? void 0 : _a.xero;
            var isAdmin = email && ((_c = (_b = workspace === null || workspace === void 0 ? void 0 : workspace.employeeList) === null || _b === void 0 ? void 0 : _b[email]) === null || _c === void 0 ? void 0 : _c.role) === CONST_1.default.POLICY.ROLE.ADMIN;
            return !!isXeroConnectionEnabled && !!isAdmin;
        });
    };
};
function RequireTwoFactorAuthenticationPage() {
    var styles = (0, useThemeStyles_1.default)();
    var translate = (0, useLocalize_1.default)().translate;
    var _a = (0, useOnyx_1.default)(ONYXKEYS_1.default.ACCOUNT, { selector: Account_1.isUserValidatedSelector, canBeMissing: true })[0], isUserValidated = _a === void 0 ? false : _a;
    var email = (0, useOnyx_1.default)(ONYXKEYS_1.default.SESSION, { selector: Session_1.emailSelector, canBeMissing: true })[0];
    var _b = (0, useOnyx_1.default)(ONYXKEYS_1.default.COLLECTION.POLICY, { selector: is2FARequiredBecauseOfXeroSelector(email), canBeMissing: true })[0], is2FARequiredBecauseOfXero = _b === void 0 ? false : _b;
    var handleOnPress = (0, react_1.useCallback)(function () {
        if (isUserValidated) {
            Navigation_1.default.navigate(ROUTES_1.default.SETTINGS_2FA_ROOT.getRoute(ROUTES_1.default.REQUIRE_TWO_FACTOR_AUTH));
            return;
        }
        Navigation_1.default.navigate(ROUTES_1.default.SETTINGS_2FA_VERIFY_ACCOUNT.getRoute({ backTo: ROUTES_1.default.REQUIRE_TWO_FACTOR_AUTH, forwardTo: ROUTES_1.default.SETTINGS_2FA_ROOT.getRoute() }));
    }, [isUserValidated]);
    return (<ScreenWrapper_1.default testID={RequireTwoFactorAuthenticationPage.displayName}>
            <react_native_1.View style={styles.twoFARequiredContainer}>
                <react_native_1.View style={[styles.twoFAIllustration, styles.alignItemsCenter]}>
                    <Icon_1.default src={Illustrations_1.Encryption} width={variables_1.default.twoFAIconHeight} height={variables_1.default.twoFAIconHeight}/>
                </react_native_1.View>
                <react_native_1.View style={[styles.mt2, styles.mh5, styles.dFlex, styles.alignItemsCenter]}>
                    <react_native_1.View style={styles.mb5}>
                        <Text_1.default style={[styles.textHeadlineH1, styles.textAlignCenter, styles.mv2]}>{translate('twoFactorAuth.twoFactorAuthIsRequiredForAdminsHeader')}</Text_1.default>
                        <Text_1.default style={[styles.textSupporting, styles.textAlignCenter]}>
                            {translate(is2FARequiredBecauseOfXero ? 'twoFactorAuth.twoFactorAuthIsRequiredXero' : 'twoFactorAuth.twoFactorAuthIsRequiredCompany')}
                        </Text_1.default>
                    </react_native_1.View>
                    <Button_1.default large success pressOnEnter onPress={handleOnPress} text={translate('twoFactorAuth.enableTwoFactorAuth')}/>
                </react_native_1.View>
            </react_native_1.View>
        </ScreenWrapper_1.default>);
}
RequireTwoFactorAuthenticationPage.displayName = 'RequireTwoFactorAuthenticationPage';
exports.default = RequireTwoFactorAuthenticationPage;
