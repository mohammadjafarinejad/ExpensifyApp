"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var expensify_common_1 = require("expensify-common");
var react_1 = require("react");
var react_native_1 = require("react-native");
var Button_1 = require("@components/Button");
var CopyableTextField_1 = require("@components/Domain/CopyableTextField");
var FormAlertWithSubmitButton_1 = require("@components/FormAlertWithSubmitButton");
var FormHelpMessage_1 = require("@components/FormHelpMessage");
var FullscreenLoadingIndicator_1 = require("@components/FullscreenLoadingIndicator");
var HeaderWithBackButton_1 = require("@components/HeaderWithBackButton");
var Icon_1 = require("@components/Icon");
var Expensicons_1 = require("@components/Icon/Expensicons");
var RenderHTML_1 = require("@components/RenderHTML");
var ScreenWrapper_1 = require("@components/ScreenWrapper");
var ScrollView_1 = require("@components/ScrollView");
var Text_1 = require("@components/Text");
var useLocalize_1 = require("@hooks/useLocalize");
var useNetwork_1 = require("@hooks/useNetwork");
var useOnyx_1 = require("@hooks/useOnyx");
var useTheme_1 = require("@hooks/useTheme");
var useThemeStyles_1 = require("@hooks/useThemeStyles");
var Domain_1 = require("@libs/actions/Domain");
var ErrorUtils_1 = require("@libs/ErrorUtils");
var Navigation_1 = require("@libs/Navigation/Navigation");
var NotFoundPage_1 = require("@pages/ErrorPage/NotFoundPage");
var ONYXKEYS_1 = require("@src/ONYXKEYS");
var isLoadingOnyxValue_1 = require("@src/types/utils/isLoadingOnyxValue");
function OrderedListRow(_a) {
    var index = _a.index, children = _a.children;
    var styles = (0, useThemeStyles_1.default)();
    return (<react_native_1.View style={[styles.flexRow, styles.flex1]}>
            <Text_1.default style={styles.pr1}>{index}.</Text_1.default>
            {children}
        </react_native_1.View>);
}
function BaseVerifyDomainPage(_a) {
    var accountID = _a.accountID, forwardTo = _a.forwardTo;
    var styles = (0, useThemeStyles_1.default)();
    var theme = (0, useTheme_1.default)();
    var translate = (0, useLocalize_1.default)().translate;
    var _b = (0, useOnyx_1.default)("".concat(ONYXKEYS_1.default.COLLECTION.DOMAIN).concat(accountID), { canBeMissing: true }), domain = _b[0], domainMetadata = _b[1];
    var domainName = domain ? expensify_common_1.Str.extractEmailDomain(domain.email) : '';
    var isOffline = (0, useNetwork_1.default)().isOffline;
    var _c = (0, useOnyx_1.default)("".concat(ONYXKEYS_1.default.COLLECTION.SHARED_NVP_PRIVATE_ADMIN_ACCESS).concat(accountID), { canBeMissing: false }), isAdmin = _c[0], isAdminMetadata = _c[1];
    var doesDomainExist = !!domain;
    (0, react_1.useEffect)(function () {
        if (!(domain === null || domain === void 0 ? void 0 : domain.validated)) {
            return;
        }
        Navigation_1.default.setNavigationActionToMicrotaskQueue(function () { return Navigation_1.default.navigate(forwardTo, { forceReplace: true }); });
    }, [accountID, domain === null || domain === void 0 ? void 0 : domain.validated, forwardTo]);
    (0, react_1.useEffect)(function () {
        if (!doesDomainExist) {
            return;
        }
        (0, Domain_1.getDomainValidationCode)(accountID, domainName);
    }, [accountID, domainName, doesDomainExist]);
    (0, react_1.useEffect)(function () {
        if (!doesDomainExist) {
            return;
        }
        (0, Domain_1.resetDomainValidationError)(accountID);
    }, [accountID, doesDomainExist]);
    if ((0, isLoadingOnyxValue_1.default)(domainMetadata, isAdminMetadata)) {
        return <FullscreenLoadingIndicator_1.default />;
    }
    if (!domain || !isAdmin) {
        return <NotFoundPage_1.default onLinkPress={function () { return Navigation_1.default.dismissModal(); }}/>;
    }
    return (<ScreenWrapper_1.default testID={BaseVerifyDomainPage.displayName} shouldShowOfflineIndicatorInWideScreen offlineIndicatorStyle={styles.mtAuto}>
            <HeaderWithBackButton_1.default title={translate('domain.verifyDomain.title')} onBackButtonPress={Navigation_1.default.goBack}/>
            <react_native_1.View style={[styles.ph5, styles.flex1]}>
                <ScrollView_1.default contentContainerStyle={styles.flexGrow1} keyboardShouldPersistTaps="always">
                    <react_native_1.View style={[styles.pt3, styles.gap5]}>
                        <Text_1.default style={styles.webViewStyles.baseFontStyle}>
                            <RenderHTML_1.default html={translate('domain.verifyDomain.beforeProceeding', { domainName: domainName })}/>
                        </Text_1.default>

                        <Text_1.default style={styles.webViewStyles.baseFontStyle}>
                            <OrderedListRow index={1}>
                                <RenderHTML_1.default html={translate('domain.verifyDomain.accessYourDNS', { domainName: domainName })}/>
                            </OrderedListRow>
                        </Text_1.default>

                        <react_native_1.View>
                            <OrderedListRow index={2}>
                                <react_native_1.View style={styles.flex1}>
                                    <Text_1.default style={[styles.webViewStyles.baseFontStyle, styles.pb3]}>{translate('domain.verifyDomain.addTXTRecord')}</Text_1.default>

                                    {!domain.validateCodeError && (<CopyableTextField_1.default value={domain.validateCode} isLoading={domain.isValidateCodeLoading}/>)}
                                </react_native_1.View>
                            </OrderedListRow>

                            {!!domain.validateCodeError && (<react_native_1.View style={[styles.flexRow, styles.justifyContentBetween, styles.gap3]}>
                                    <FormHelpMessage_1.default message={(0, ErrorUtils_1.getLatestErrorMessage)({ errors: domain.validateCodeError })} style={[styles.mt0, styles.mb0]}/>
                                    <Button_1.default small text={translate('domain.retry')} onPress={function () { return (0, Domain_1.getDomainValidationCode)(accountID, domainName); }} isDisabled={isOffline}/>
                                </react_native_1.View>)}
                        </react_native_1.View>

                        <OrderedListRow index={3}>
                            <Text_1.default style={styles.webViewStyles.baseFontStyle}>{translate('domain.verifyDomain.saveChanges')}</Text_1.default>
                        </OrderedListRow>

                        <RenderHTML_1.default html={translate('domain.verifyDomain.youMayNeedToConsult')}/>

                        <react_native_1.View style={[styles.flexRow, styles.alignItemsCenter, styles.gap3]}>
                            <Icon_1.default src={Expensicons_1.Exclamation} fill={theme.icon} medium/>
                            <Text_1.default style={styles.mutedNormalTextLabel}>{translate('domain.verifyDomain.warning')}</Text_1.default>
                        </react_native_1.View>
                    </react_native_1.View>
                </ScrollView_1.default>

                <FormAlertWithSubmitButton_1.default buttonText={translate('domain.verifyDomain.title')} onSubmit={function () { return (0, Domain_1.validateDomain)(accountID, domainName); }} message={(0, ErrorUtils_1.getLatestErrorMessage)({ errors: domain.domainValidationError })} isAlertVisible={!!domain.domainValidationError} containerStyles={styles.mb5} isLoading={domain.isValidationPending}/>
            </react_native_1.View>
        </ScreenWrapper_1.default>);
}
BaseVerifyDomainPage.displayName = 'BaseVerifyDomainPage';
exports.default = BaseVerifyDomainPage;
