"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var useLocalize_1 = require("@hooks/useLocalize");
var useOnyx_1 = require("@hooks/useOnyx");
var useThemeStyles_1 = require("@hooks/useThemeStyles");
var Navigation_1 = require("@libs/Navigation/Navigation");
var variables_1 = require("@styles/variables");
var Welcome_1 = require("@userActions/Welcome");
var ONYXKEYS_1 = require("@src/ONYXKEYS");
var ROUTES_1 = require("@src/ROUTES");
var BlockingView_1 = require("./BlockingViews/BlockingView");
var Button_1 = require("./Button");
var Illustrations_1 = require("./Icon/Illustrations");
function OnboardingMergingAccountBlockedView(_a) {
    var workEmail = _a.workEmail, isVsb = _a.isVsb;
    var styles = (0, useThemeStyles_1.default)();
    var translate = (0, useLocalize_1.default)().translate;
    var onboardingErrorMessage = (0, useOnyx_1.default)(ONYXKEYS_1.default.ONBOARDING_ERROR_MESSAGE_TRANSLATION_KEY, { canBeMissing: true })[0];
    var getErrorSubtitle = function () {
        if (onboardingErrorMessage) {
            return translate(onboardingErrorMessage);
        }
        // Fallback to generic error message
        return translate('onboarding.mergeBlockScreen.subtitle', { workEmail: workEmail });
    };
    return (<>
            <BlockingView_1.default icon={Illustrations_1.ToddBehindCloud} iconWidth={variables_1.default.modalTopIconWidth} iconHeight={variables_1.default.modalTopIconHeight} title={translate('onboarding.mergeBlockScreen.title')} subtitle={getErrorSubtitle()} subtitleStyle={[styles.colorMuted]}/>
            <Button_1.default success large style={[styles.mb5]} text={translate('common.buttonConfirm')} onPress={function () {
            (0, Welcome_1.setOnboardingErrorMessage)(null);
            if (isVsb) {
                Navigation_1.default.navigate(ROUTES_1.default.ONBOARDING_ACCOUNTING.getRoute());
                return;
            }
            Navigation_1.default.navigate(ROUTES_1.default.ONBOARDING_PURPOSE.getRoute());
        }}/>
        </>);
}
OnboardingMergingAccountBlockedView.displayName = 'OnboardingMergingAccountBlockedView';
exports.default = OnboardingMergingAccountBlockedView;
