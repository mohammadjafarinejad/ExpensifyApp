"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var expensify_common_1 = require("expensify-common");
var react_1 = require("react");
var react_native_1 = require("react-native");
var ConfirmationPage_1 = require("@components/ConfirmationPage");
var FullscreenLoadingIndicator_1 = require("@components/FullscreenLoadingIndicator");
var HeaderWithBackButton_1 = require("@components/HeaderWithBackButton");
var LottieAnimations_1 = require("@components/LottieAnimations");
var RenderHTML_1 = require("@components/RenderHTML");
var ScreenWrapper_1 = require("@components/ScreenWrapper");
var useLocalize_1 = require("@hooks/useLocalize");
var useOnyx_1 = require("@hooks/useOnyx");
var useThemeStyles_1 = require("@hooks/useThemeStyles");
var Navigation_1 = require("@libs/Navigation/Navigation");
var NotFoundPage_1 = require("@pages/ErrorPage/NotFoundPage");
var ONYXKEYS_1 = require("@src/ONYXKEYS");
var isLoadingOnyxValue_1 = require("@src/types/utils/isLoadingOnyxValue");
function BaseDomainVerifiedPage(_a) {
    var accountID = _a.accountID, redirectTo = _a.redirectTo, navigateAfterConfirmation = _a.navigateAfterConfirmation;
    var translate = (0, useLocalize_1.default)().translate;
    var styles = (0, useThemeStyles_1.default)();
    var _b = (0, useOnyx_1.default)("".concat(ONYXKEYS_1.default.COLLECTION.DOMAIN).concat(accountID), { canBeMissing: false }), domain = _b[0], domainMetadata = _b[1];
    var _c = (0, useOnyx_1.default)("".concat(ONYXKEYS_1.default.COLLECTION.SHARED_NVP_PRIVATE_ADMIN_ACCESS).concat(accountID), { canBeMissing: false }), isAdmin = _c[0], isAdminMetadata = _c[1];
    var doesDomainExist = !!domain;
    (0, react_1.useEffect)(function () {
        if (!doesDomainExist || (domain === null || domain === void 0 ? void 0 : domain.validated)) {
            return;
        }
        Navigation_1.default.setNavigationActionToMicrotaskQueue(function () { return Navigation_1.default.navigate(redirectTo, { forceReplace: true }); });
    }, [accountID, domain === null || domain === void 0 ? void 0 : domain.validated, doesDomainExist, redirectTo]);
    if ((0, isLoadingOnyxValue_1.default)(domainMetadata, isAdminMetadata)) {
        return <FullscreenLoadingIndicator_1.default />;
    }
    if (!domain || !isAdmin) {
        return <NotFoundPage_1.default onLinkPress={function () { return Navigation_1.default.dismissModal(); }}/>;
    }
    return (<ScreenWrapper_1.default testID={BaseDomainVerifiedPage.displayName} shouldShowOfflineIndicator={false}>
            <HeaderWithBackButton_1.default title={translate('domain.domainVerified.title')}/>
            <ConfirmationPage_1.default illustration={LottieAnimations_1.default.Fireworks} heading={translate('domain.domainVerified.header')} descriptionComponent={<react_native_1.View style={[styles.renderHTML, styles.flexRow]}>
                        <RenderHTML_1.default html={translate('domain.domainVerified.description', { domainName: expensify_common_1.Str.extractEmailDomain(domain.email) })}/>
                    </react_native_1.View>} innerContainerStyle={styles.p10} buttonText={translate('common.buttonConfirm')} shouldShowButton onButtonPress={navigateAfterConfirmation}/>
        </ScreenWrapper_1.default>);
}
BaseDomainVerifiedPage.displayName = 'BaseDomainVerifiedPage';
exports.default = BaseDomainVerifiedPage;
