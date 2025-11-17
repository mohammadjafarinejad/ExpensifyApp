"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_native_1 = require("react-native");
var FullscreenLoadingIndicator_1 = require("@components/FullscreenLoadingIndicator");
var HeaderWithBackButton_1 = require("@components/HeaderWithBackButton");
var ScreenWrapper_1 = require("@components/ScreenWrapper");
var ScrollView_1 = require("@components/ScrollView");
var useLazyAsset_1 = require("@hooks/useLazyAsset");
var useLocalize_1 = require("@hooks/useLocalize");
var useOnyx_1 = require("@hooks/useOnyx");
var useResponsiveLayout_1 = require("@hooks/useResponsiveLayout");
var useSubscriptionPlan_1 = require("@hooks/useSubscriptionPlan");
var useThemeStyles_1 = require("@hooks/useThemeStyles");
var Subscription_1 = require("@libs/actions/Subscription");
var Navigation_1 = require("@libs/Navigation/Navigation");
var ONYXKEYS_1 = require("@src/ONYXKEYS");
var SCREENS_1 = require("@src/SCREENS");
var CardSection_1 = require("./CardSection/CardSection");
var SubscriptionPlan_1 = require("./SubscriptionPlan");
function SubscriptionSettingsPage(_a) {
    var _b;
    var route = _a.route;
    var backTo = (_b = route === null || route === void 0 ? void 0 : route.params) === null || _b === void 0 ? void 0 : _b.backTo;
    var shouldUseNarrowLayout = (0, useResponsiveLayout_1.default)().shouldUseNarrowLayout;
    var translate = (0, useLocalize_1.default)().translate;
    var styles = (0, useThemeStyles_1.default)();
    var subscriptionPlan = (0, useSubscriptionPlan_1.default)();
    var illustrations = (0, useLazyAsset_1.useMemoizedLazyIllustrations)(['CreditCardsNew']);
    (0, react_1.useEffect)(function () {
        (0, Subscription_1.openSubscriptionPage)();
    }, []);
    var _c = (0, useOnyx_1.default)(ONYXKEYS_1.default.IS_LOADING_APP, { canBeMissing: false })[0], isAppLoading = _c === void 0 ? true : _c;
    (0, react_1.useEffect)(function () {
        if (subscriptionPlan !== null && subscriptionPlan !== void 0 ? subscriptionPlan : isAppLoading) {
            return;
        }
        Navigation_1.default.removeScreenFromNavigationState(SCREENS_1.default.SETTINGS.SUBSCRIPTION.ROOT);
    }, [isAppLoading, subscriptionPlan]);
    if (!subscriptionPlan && isAppLoading) {
        return <FullscreenLoadingIndicator_1.default />;
    }
    if (!subscriptionPlan) {
        return null;
    }
    return (<ScreenWrapper_1.default testID={SubscriptionSettingsPage.displayName} shouldShowOfflineIndicatorInWideScreen>
            <HeaderWithBackButton_1.default title={translate('workspace.common.subscription')} onBackButtonPress={function () {
            if (Navigation_1.default.getShouldPopToSidebar()) {
                Navigation_1.default.popToSidebar();
                return;
            }
            Navigation_1.default.goBack(backTo);
        }} shouldShowBackButton={shouldUseNarrowLayout} shouldDisplaySearchRouter icon={illustrations.CreditCardsNew} shouldUseHeadlineHeader/>
            <ScrollView_1.default style={styles.pt3}>
                <react_native_1.View style={[styles.flex1, shouldUseNarrowLayout ? styles.workspaceSectionMobile : styles.workspaceSection]}>
                    <CardSection_1.default />
                    <SubscriptionPlan_1.default />
                </react_native_1.View>
            </ScrollView_1.default>
        </ScreenWrapper_1.default>);
}
SubscriptionSettingsPage.displayName = 'SubscriptionSettingsPage';
exports.default = SubscriptionSettingsPage;
