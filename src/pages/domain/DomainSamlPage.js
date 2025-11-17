"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var expensify_common_1 = require("expensify-common");
var react_1 = require("react");
var react_native_1 = require("react-native");
var FullPageNotFoundView_1 = require("@components/BlockingViews/FullPageNotFoundView");
var FeatureList_1 = require("@components/FeatureList");
var HeaderWithBackButton_1 = require("@components/HeaderWithBackButton");
var Illustrations_1 = require("@components/Icon/Illustrations");
var RenderHTML_1 = require("@components/RenderHTML");
var ScreenWrapper_1 = require("@components/ScreenWrapper");
var ScrollViewWithContext_1 = require("@components/ScrollViewWithContext");
var useLocalize_1 = require("@hooks/useLocalize");
var useOnyx_1 = require("@hooks/useOnyx");
var useResponsiveLayout_1 = require("@hooks/useResponsiveLayout");
var useThemeStyles_1 = require("@hooks/useThemeStyles");
var Navigation_1 = require("@libs/Navigation/Navigation");
var colors_1 = require("@styles/theme/colors");
var ONYXKEYS_1 = require("@src/ONYXKEYS");
var ROUTES_1 = require("@src/ROUTES");
var isLoadingOnyxValue_1 = require("@src/types/utils/isLoadingOnyxValue");
var samlFeatures = [
    {
        icon: Illustrations_1.OpenSafe,
        translationKey: 'domain.samlFeatureList.fasterAndEasierLogin',
    },
    {
        icon: Illustrations_1.ShieldYellow,
        translationKey: 'domain.samlFeatureList.moreSecurityAndControl',
    },
    {
        icon: Illustrations_1.LockClosed,
        translationKey: 'domain.samlFeatureList.onePasswordForAnything',
    },
];
function DomainSamlPage(_a) {
    var route = _a.route;
    var styles = (0, useThemeStyles_1.default)();
    var shouldUseNarrowLayout = (0, useResponsiveLayout_1.default)().shouldUseNarrowLayout;
    var translate = (0, useLocalize_1.default)().translate;
    var accountID = route.params.accountID;
    var _b = (0, useOnyx_1.default)("".concat(ONYXKEYS_1.default.COLLECTION.DOMAIN).concat(accountID), { canBeMissing: true }), domain = _b[0], domainResults = _b[1];
    var _c = (0, useOnyx_1.default)("".concat(ONYXKEYS_1.default.COLLECTION.SHARED_NVP_PRIVATE_ADMIN_ACCESS).concat(accountID), { canBeMissing: false }), isAdmin = _c[0], isAdminResults = _c[1];
    var domainName = domain ? expensify_common_1.Str.extractEmailDomain(domain.email) : undefined;
    var doesDomainExist = !!domain;
    return (<ScreenWrapper_1.default enableEdgeToEdgeBottomSafeAreaPadding shouldEnableMaxHeight testID={DomainSamlPage.displayName}>
            <FullPageNotFoundView_1.default onBackButtonPress={function () { return Navigation_1.default.goBack(ROUTES_1.default.WORKSPACES_LIST.route); }} shouldShow={!(0, isLoadingOnyxValue_1.default)(domainResults, isAdminResults) && (!doesDomainExist || !isAdmin)} shouldForceFullScreen shouldDisplaySearchRouter>
                <HeaderWithBackButton_1.default title={translate('domain.saml')} onBackButtonPress={Navigation_1.default.popToSidebar} icon={Illustrations_1.LockClosed} shouldShowBackButton={shouldUseNarrowLayout}/>

                <ScrollViewWithContext_1.default keyboardShouldPersistTaps="handled" style={[styles.settingsPageBackground, styles.flex1, styles.w100]}>
                    <react_native_1.View style={shouldUseNarrowLayout ? styles.workspaceSectionMobile : styles.workspaceSection}>
                        <FeatureList_1.default menuItems={samlFeatures} title={translate('domain.samlFeatureList.title')} renderSubtitle={function () { return (<react_native_1.View style={styles.pt3}>
                                    <RenderHTML_1.default html={translate('domain.samlFeatureList.subtitle', { domainName: "@".concat(domainName !== null && domainName !== void 0 ? domainName : '') })}/>
                                </react_native_1.View>); }} ctaText={translate('domain.verifyDomain.title')} ctaAccessibilityLabel={translate('domain.verifyDomain.title')} onCtaPress={function () {
            Navigation_1.default.navigate(ROUTES_1.default.DOMAIN_VERIFY.getRoute(accountID));
        }} illustrationBackgroundColor={colors_1.default.blue700} illustration={Illustrations_1.LaptopOnDeskWithCoffeeAndKey} illustrationStyle={styles.emptyStateSamlIllustration} illustrationContainerStyle={[styles.emptyStateCardIllustrationContainer, styles.justifyContentCenter]} titleStyles={styles.textHeadlineH1}/>
                    </react_native_1.View>
                </ScrollViewWithContext_1.default>
            </FullPageNotFoundView_1.default>
        </ScreenWrapper_1.default>);
}
DomainSamlPage.displayName = 'DomainSamlPage';
exports.default = DomainSamlPage;
