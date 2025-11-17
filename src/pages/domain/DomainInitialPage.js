"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var native_1 = require("@react-navigation/native");
var expensify_common_1 = require("expensify-common");
var react_1 = require("react");
var react_native_1 = require("react-native");
var FullPageNotFoundView_1 = require("@components/BlockingViews/FullPageNotFoundView");
var HeaderWithBackButton_1 = require("@components/HeaderWithBackButton");
var HighlightableMenuItem_1 = require("@components/HighlightableMenuItem");
var Expensicons_1 = require("@components/Icon/Expensicons");
var NavigationTabBar_1 = require("@components/Navigation/NavigationTabBar");
var NAVIGATION_TABS_1 = require("@components/Navigation/NavigationTabBar/NAVIGATION_TABS");
var ScreenWrapper_1 = require("@components/ScreenWrapper");
var ScrollView_1 = require("@components/ScrollView");
var useLocalize_1 = require("@hooks/useLocalize");
var useOnyx_1 = require("@hooks/useOnyx");
var useResponsiveLayout_1 = require("@hooks/useResponsiveLayout");
var useSingleExecution_1 = require("@hooks/useSingleExecution");
var useThemeStyles_1 = require("@hooks/useThemeStyles");
var useWaitForNavigation_1 = require("@hooks/useWaitForNavigation");
var App_1 = require("@libs/actions/App");
var Navigation_1 = require("@libs/Navigation/Navigation");
var ONYXKEYS_1 = require("@src/ONYXKEYS");
var ROUTES_1 = require("@src/ROUTES");
var SCREENS_1 = require("@src/SCREENS");
function DomainInitialPage(_a) {
    var _b;
    var route = _a.route;
    var styles = (0, useThemeStyles_1.default)();
    var waitForNavigate = (0, useWaitForNavigation_1.default)();
    var _c = (0, useSingleExecution_1.default)(), singleExecution = _c.singleExecution, isExecuting = _c.isExecuting;
    var activeRoute = (0, native_1.useNavigationState)(function (state) { var _a; return (_a = (0, native_1.findFocusedRoute)(state)) === null || _a === void 0 ? void 0 : _a.name; });
    var shouldUseNarrowLayout = (0, useResponsiveLayout_1.default)().shouldUseNarrowLayout;
    var translate = (0, useLocalize_1.default)().translate;
    var shouldDisplayLHB = !shouldUseNarrowLayout;
    var accountID = (_b = route.params) === null || _b === void 0 ? void 0 : _b.accountID;
    var domain = (0, useOnyx_1.default)("".concat(ONYXKEYS_1.default.COLLECTION.DOMAIN).concat(accountID), { canBeMissing: true })[0];
    var domainName = domain ? expensify_common_1.Str.extractEmailDomain(domain.email) : undefined;
    var isAdmin = (0, useOnyx_1.default)("".concat(ONYXKEYS_1.default.COLLECTION.SHARED_NVP_PRIVATE_ADMIN_ACCESS).concat(accountID), { canBeMissing: false })[0];
    var domainMenuItems = (0, react_1.useMemo)(function () {
        var menuItems = [
            {
                translationKey: 'domain.saml',
                icon: Expensicons_1.UserLock,
                action: singleExecution(waitForNavigate(function () { return Navigation_1.default.navigate(ROUTES_1.default.DOMAIN_SAML.getRoute(accountID)); })),
                screenName: SCREENS_1.default.DOMAIN.SAML,
            },
        ];
        return menuItems;
    }, [accountID, singleExecution, waitForNavigate]);
    (0, react_1.useEffect)(function () {
        (0, App_1.confirmReadyToOpenApp)();
    }, []);
    return (<ScreenWrapper_1.default testID={DomainInitialPage.displayName} enableEdgeToEdgeBottomSafeAreaPadding={false} bottomContent={!shouldDisplayLHB && <NavigationTabBar_1.default selectedTab={NAVIGATION_TABS_1.default.WORKSPACES}/>}>
            <FullPageNotFoundView_1.default onBackButtonPress={function () { return Navigation_1.default.dismissModal(); }} onLinkPress={Navigation_1.default.goBackToHome} shouldShow={!domain || !isAdmin} addBottomSafeAreaPadding shouldForceFullScreen shouldDisplaySearchRouter>
                <HeaderWithBackButton_1.default title={domainName} onBackButtonPress={function () { return Navigation_1.default.goBack(ROUTES_1.default.WORKSPACES_LIST.route); }} shouldDisplayHelpButton={shouldUseNarrowLayout}/>

                <ScrollView_1.default contentContainerStyle={[styles.flexColumn]}>
                    <react_native_1.View style={[styles.pb4, styles.mh3, styles.mt3]}>
                        {/*
            Ideally we should use MenuList component for MenuItems with singleExecution/Navigation actions.
            In this case where user can click on menu items, we need to have a check for `isExecuting`. So, we are directly mapping menuItems.
        */}
                        {domainMenuItems.map(function (item) { return (<HighlightableMenuItem_1.default key={item.translationKey} disabled={isExecuting} title={translate(item.translationKey)} icon={item.icon} onPress={item.action} brickRoadIndicator={item.brickRoadIndicator} wrapperStyle={styles.sectionMenuItem} highlighted={!!(item === null || item === void 0 ? void 0 : item.highlighted)} focused={!!(item.screenName && (activeRoute === null || activeRoute === void 0 ? void 0 : activeRoute.startsWith(item.screenName)))} badgeText={item.badgeText} shouldIconUseAutoWidthStyle/>); })}
                    </react_native_1.View>
                </ScrollView_1.default>
                {shouldDisplayLHB && <NavigationTabBar_1.default selectedTab={NAVIGATION_TABS_1.default.WORKSPACES}/>}
            </FullPageNotFoundView_1.default>
        </ScreenWrapper_1.default>);
}
DomainInitialPage.displayName = 'DomainInitialPage';
exports.default = DomainInitialPage;
