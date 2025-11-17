"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var expensify_common_1 = require("expensify-common");
var react_1 = require("react");
var react_native_1 = require("react-native");
var PressableWithFeedback_1 = require("@components/Pressable/PressableWithFeedback");
var RenderHTML_1 = require("@components/RenderHTML");
var Text_1 = require("@components/Text");
var useKeyboardState_1 = require("@hooks/useKeyboardState");
var useLocalize_1 = require("@hooks/useLocalize");
var useOnyx_1 = require("@hooks/useOnyx");
var useThemeStyles_1 = require("@hooks/useThemeStyles");
var Session_1 = require("@userActions/Session");
var ONYXKEYS_1 = require("@src/ONYXKEYS");
function EmailDeliveryFailurePage() {
    var credentials = (0, useOnyx_1.default)(ONYXKEYS_1.default.CREDENTIALS, { canBeMissing: true })[0];
    var styles = (0, useThemeStyles_1.default)();
    var isKeyboardShown = (0, useKeyboardState_1.default)().isKeyboardShown;
    var translate = (0, useLocalize_1.default)().translate;
    var login = (0, react_1.useMemo)(function () {
        if (!(credentials === null || credentials === void 0 ? void 0 : credentials.login)) {
            return '';
        }
        return expensify_common_1.Str.isSMSLogin(credentials.login) ? expensify_common_1.Str.removeSMSDomain(credentials.login) : credentials.login;
    }, [credentials === null || credentials === void 0 ? void 0 : credentials.login]);
    // This view doesn't have a field for user input, so dismiss the device keyboard if shown
    (0, react_1.useEffect)(function () {
        if (!isKeyboardShown) {
            return;
        }
        react_native_1.Keyboard.dismiss();
    }, [isKeyboardShown]);
    return (<>
            <react_native_1.View style={[styles.mv3, styles.flexRow]}>
                <react_native_1.View style={[styles.flex1]}>
                    <Text_1.default>{translate('emailDeliveryFailurePage.ourEmailProvider', { login: login })}</Text_1.default>
                    <react_native_1.View style={[styles.mt5, styles.renderHTML]}>
                        <RenderHTML_1.default html={translate('emailDeliveryFailurePage.confirmThat', { login: login })}/>
                    </react_native_1.View>
                    <react_native_1.View style={[styles.mt5, styles.renderHTML]}>
                        <RenderHTML_1.default html={translate('emailDeliveryFailurePage.ensureYourEmailClient')}/>
                    </react_native_1.View>
                    <react_native_1.View style={[styles.mt5, styles.renderHTML]}>
                        <RenderHTML_1.default html={translate('emailDeliveryFailurePage.onceTheAbove')}/>
                    </react_native_1.View>
                </react_native_1.View>
            </react_native_1.View>
            <react_native_1.View style={[styles.mv4, styles.flexRow, styles.justifyContentBetween, styles.alignItemsCenter]}>
                <PressableWithFeedback_1.default onPress={function () { return (0, Session_1.clearSignInData)(); }} role="button" accessibilityLabel={translate('common.back')} 
    // disable hover dim for switch
    hoverDimmingValue={1} pressDimmingValue={0.2}>
                    <Text_1.default style={[styles.link]}>{translate('common.back')}</Text_1.default>
                </PressableWithFeedback_1.default>
            </react_native_1.View>
        </>);
}
EmailDeliveryFailurePage.displayName = 'EmailDeliveryFailurePage';
exports.default = EmailDeliveryFailurePage;
