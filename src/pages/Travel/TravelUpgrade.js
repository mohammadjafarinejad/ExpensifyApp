"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var HeaderWithBackButton_1 = require("@components/HeaderWithBackButton");
var ScreenWrapper_1 = require("@components/ScreenWrapper");
var ScrollView_1 = require("@components/ScrollView");
var useCurrentUserPersonalDetails_1 = require("@hooks/useCurrentUserPersonalDetails");
var useLocalize_1 = require("@hooks/useLocalize");
var useNetwork_1 = require("@hooks/useNetwork");
var useOnyx_1 = require("@hooks/useOnyx");
var useThemeStyles_1 = require("@hooks/useThemeStyles");
var Navigation_1 = require("@libs/Navigation/Navigation");
var PolicyUtils_1 = require("@libs/PolicyUtils");
var UpgradeConfirmation_1 = require("@pages/workspace/upgrade/UpgradeConfirmation");
var UpgradeIntro_1 = require("@pages/workspace/upgrade/UpgradeIntro");
var CONST_1 = require("@src/CONST");
var ONYXKEYS_1 = require("@src/ONYXKEYS");
var ROUTES_1 = require("@src/ROUTES");
function TravelUpgrade(_a) {
    var route = _a.route;
    var styles = (0, useThemeStyles_1.default)();
    var feature = CONST_1.default.UPGRADE_FEATURE_INTRO_MAPPING.travel;
    var translate = (0, useLocalize_1.default)().translate;
    var isOffline = (0, useNetwork_1.default)().isOffline;
    var policies = (0, useOnyx_1.default)(ONYXKEYS_1.default.COLLECTION.POLICY, { canBeMissing: false })[0];
    var currentUserLogin = (0, useCurrentUserPersonalDetails_1.default)().login;
    var groupPaidPolicies = (0, PolicyUtils_1.getActivePolicies)(policies, currentUserLogin).filter(PolicyUtils_1.isPaidGroupPolicy);
    var _b = (0, react_1.useState)(false), isUpgraded = _b[0], setIsUpgraded = _b[1];
    (0, react_1.useEffect)(function () {
        if (groupPaidPolicies.length < 1) {
            return;
        }
        setIsUpgraded(true);
    }, [groupPaidPolicies.length]);
    var openWorkspaceConfirmation = function () {
        Navigation_1.default.navigate(ROUTES_1.default.TRAVEL_WORKSPACE_CONFIRMATION);
    };
    return (<ScreenWrapper_1.default shouldShowOfflineIndicator testID={TravelUpgrade.displayName} offlineIndicatorStyle={styles.mtAuto} shouldShowOfflineIndicatorInWideScreen={!isUpgraded}>
            <HeaderWithBackButton_1.default title={translate('common.upgrade')} onBackButtonPress={function () { return Navigation_1.default.goBack(route.params.backTo); }}/>
            <ScrollView_1.default contentContainerStyle={styles.flexGrow1}>
                {isUpgraded ? (<UpgradeConfirmation_1.default afterUpgradeAcknowledged={function () { return Navigation_1.default.goBack(); }} policyName="" isTravelUpgrade/>) : (<UpgradeIntro_1.default feature={feature} onUpgrade={openWorkspaceConfirmation} buttonDisabled={isOffline} loading={false} isCategorizing/>)}
            </ScrollView_1.default>
        </ScreenWrapper_1.default>);
}
TravelUpgrade.displayName = 'TravelUpgrade';
exports.default = TravelUpgrade;
