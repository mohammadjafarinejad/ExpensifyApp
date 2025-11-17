"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_native_1 = require("react-native");
var FocusTrapForScreen_1 = require("@components/FocusTrap/FocusTrapForScreen");
var useThemeStyles_1 = require("@hooks/useThemeStyles");
var createSplitNavigator_1 = require("@libs/Navigation/AppNavigator/createSplitNavigator");
var useSplitNavigatorScreenOptions_1 = require("@libs/Navigation/AppNavigator/useSplitNavigatorScreenOptions");
var useNoAnimationWhenOpenedFromTabBar_1 = require("@libs/Navigation/helpers/useNoAnimationWhenOpenedFromTabBar");
var SCREENS_1 = require("@src/SCREENS");
var loadDomainInitialPage = function () { return require('../../../../pages/domain/DomainInitialPage').default; };
var loadDomainSamlPage = function () { return require('../../../../pages/domain/DomainSamlPage').default; };
var Split = (0, createSplitNavigator_1.default)();
function DomainSplitNavigator(_a) {
    var route = _a.route, navigation = _a.navigation;
    var splitNavigatorScreenOptions = (0, useSplitNavigatorScreenOptions_1.default)();
    var styles = (0, useThemeStyles_1.default)();
    (0, useNoAnimationWhenOpenedFromTabBar_1.default)(navigation, route.key);
    return (<FocusTrapForScreen_1.default>
            <react_native_1.View style={styles.flex1}>
                <Split.Navigator persistentScreens={[SCREENS_1.default.DOMAIN.INITIAL]} sidebarScreen={SCREENS_1.default.DOMAIN.INITIAL} defaultCentralScreen={SCREENS_1.default.DOMAIN.SAML} parentRoute={route} screenOptions={splitNavigatorScreenOptions.centralScreen}>
                    <Split.Screen name={SCREENS_1.default.DOMAIN.INITIAL} getComponent={loadDomainInitialPage} options={splitNavigatorScreenOptions.sidebarScreen}/>

                    <Split.Screen key={SCREENS_1.default.DOMAIN.SAML} name={SCREENS_1.default.DOMAIN.SAML} getComponent={loadDomainSamlPage}/>
                </Split.Navigator>
            </react_native_1.View>
        </FocusTrapForScreen_1.default>);
}
DomainSplitNavigator.displayName = 'DomainSplitNavigator';
exports.default = DomainSplitNavigator;
