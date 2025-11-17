"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var str_1 = require("expensify-common/dist/str");
var react_1 = require("react");
var react_native_1 = require("react-native");
var react_native_gesture_handler_1 = require("react-native-gesture-handler");
var FullPageNotFoundView_1 = require("@components/BlockingViews/FullPageNotFoundView");
var CheckboxWithLabel_1 = require("@components/CheckboxWithLabel");
var ConfirmModal_1 = require("@components/ConfirmModal");
var FormAlertWithSubmitButton_1 = require("@components/FormAlertWithSubmitButton");
var HeaderWithBackButton_1 = require("@components/HeaderWithBackButton");
var Illustrations_1 = require("@components/Icon/Illustrations");
var RenderHTML_1 = require("@components/RenderHTML");
var ScreenWrapper_1 = require("@components/ScreenWrapper");
var Text_1 = require("@components/Text");
var useLocalize_1 = require("@hooks/useLocalize");
var useOnyx_1 = require("@hooks/useOnyx");
var usePermissions_1 = require("@hooks/usePermissions");
var useStyleUtils_1 = require("@hooks/useStyleUtils");
var useThemeStyles_1 = require("@hooks/useThemeStyles");
var Link_1 = require("@libs/actions/Link");
var Report_1 = require("@libs/actions/Report");
var Travel_1 = require("@libs/actions/Travel");
var asyncOpenURL_1 = require("@libs/asyncOpenURL");
var ErrorUtils_1 = require("@libs/ErrorUtils");
var Navigation_1 = require("@libs/Navigation/Navigation");
var colors_1 = require("@styles/theme/colors");
var CONFIG_1 = require("@src/CONFIG");
var CONST_1 = require("@src/CONST");
var ONYXKEYS_1 = require("@src/ONYXKEYS");
var ROUTES_1 = require("@src/ROUTES");
function TravelTerms(_a) {
    var route = _a.route;
    var styles = (0, useThemeStyles_1.default)();
    var translate = (0, useLocalize_1.default)().translate;
    var StyleUtils = (0, useStyleUtils_1.default)();
    var isBetaEnabled = (0, usePermissions_1.default)().isBetaEnabled;
    var isBlockedFromSpotnanaTravel = isBetaEnabled(CONST_1.default.BETAS.PREVENT_SPOTNANA_TRAVEL);
    var _b = (0, react_1.useState)(false), hasAcceptedTravelTerms = _b[0], setHasAcceptedTravelTerms = _b[1];
    var _c = (0, react_1.useState)(''), errorMessage = _c[0], setErrorMessage = _c[1];
    var _d = (0, react_1.useState)(false), showVerifyCompanyModal = _d[0], setShowVerifyCompanyModal = _d[1];
    var travelProvisioning = (0, useOnyx_1.default)(ONYXKEYS_1.default.TRAVEL_PROVISIONING, { canBeMissing: true })[0];
    var isLoading = travelProvisioning === null || travelProvisioning === void 0 ? void 0 : travelProvisioning.isLoading;
    var domain = route.params.domain === CONST_1.default.TRAVEL.DEFAULT_DOMAIN ? undefined : route.params.domain;
    var account = (0, useOnyx_1.default)(ONYXKEYS_1.default.ACCOUNT, { canBeMissing: true })[0];
    var conciergeReportID = (0, useOnyx_1.default)(ONYXKEYS_1.default.CONCIERGE_REPORT_ID, { canBeMissing: true })[0];
    var createTravelEnablementIssue = (0, react_1.useCallback)(function () {
        var _a;
        if (!conciergeReportID) {
            return;
        }
        var message = translate('travel.verifyCompany.conciergeMessage', { domain: str_1.default.extractEmailDomain((_a = account === null || account === void 0 ? void 0 : account.primaryLogin) !== null && _a !== void 0 ? _a : '') });
        (0, Report_1.addComment)(conciergeReportID, conciergeReportID, message, CONST_1.default.DEFAULT_TIME_ZONE);
        Navigation_1.default.navigate(ROUTES_1.default.REPORT_WITH_ID.getRoute(conciergeReportID));
    }, [translate, account === null || account === void 0 ? void 0 : account.primaryLogin, conciergeReportID]);
    (0, react_1.useEffect)(function () {
        if ((travelProvisioning === null || travelProvisioning === void 0 ? void 0 : travelProvisioning.error) === CONST_1.default.TRAVEL.PROVISIONING.ERROR_PERMISSION_DENIED && domain) {
            Navigation_1.default.navigate(ROUTES_1.default.TRAVEL_DOMAIN_PERMISSION_INFO.getRoute(domain));
            (0, Travel_1.cleanupTravelProvisioningSession)();
        }
        if ((travelProvisioning === null || travelProvisioning === void 0 ? void 0 : travelProvisioning.error) === CONST_1.default.TRAVEL.PROVISIONING.ERROR_ADDITIONAL_VERIFICATION_REQUIRED) {
            setShowVerifyCompanyModal(true);
        }
        if (travelProvisioning === null || travelProvisioning === void 0 ? void 0 : travelProvisioning.spotnanaToken) {
            Navigation_1.default.closeRHPFlow();
            (0, Travel_1.cleanupTravelProvisioningSession)();
        }
        if ((travelProvisioning === null || travelProvisioning === void 0 ? void 0 : travelProvisioning.errors) && !(travelProvisioning === null || travelProvisioning === void 0 ? void 0 : travelProvisioning.error)) {
            setErrorMessage((0, ErrorUtils_1.getLatestErrorMessage)(travelProvisioning));
        }
    }, [travelProvisioning, domain]);
    var toggleTravelTerms = function () {
        setHasAcceptedTravelTerms(!hasAcceptedTravelTerms);
    };
    (0, react_1.useEffect)(function () {
        if (!hasAcceptedTravelTerms) {
            return;
        }
        setErrorMessage('');
    }, [hasAcceptedTravelTerms]);
    // Add beta support for FullPageNotFound that is universal across travel pages
    return (<>
            <ScreenWrapper_1.default shouldEnableMaxHeight testID={TravelTerms.displayName}>
                <FullPageNotFoundView_1.default shouldShow={!CONFIG_1.default.IS_HYBRID_APP && isBlockedFromSpotnanaTravel}>
                    <HeaderWithBackButton_1.default title={translate('travel.termsAndConditions.header')} onBackButtonPress={function () { return Navigation_1.default.goBack(); }}/>
                    <react_native_gesture_handler_1.ScrollView contentContainerStyle={[styles.flexGrow1, styles.ph5, styles.pb5]}>
                        <react_native_1.View style={styles.flex1}>
                            <Text_1.default style={styles.headerAnonymousFooter}>{"".concat(translate('travel.termsAndConditions.title'))}</Text_1.default>
                            <react_native_1.View style={[styles.renderHTML, styles.mt4]}>
                                <RenderHTML_1.default html={translate('travel.termsAndConditions.subtitle')}/>
                            </react_native_1.View>
                            <CheckboxWithLabel_1.default style={styles.mt6} accessibilityLabel={translate('travel.termsAndConditions.label')} onInputChange={toggleTravelTerms} label={translate('travel.termsAndConditions.label')}/>
                        </react_native_1.View>

                        <FormAlertWithSubmitButton_1.default buttonText={translate('common.continue')} isDisabled={!hasAcceptedTravelTerms} onSubmit={function () {
            if (!hasAcceptedTravelTerms) {
                setErrorMessage(translate('travel.termsAndConditions.error'));
                return;
            }
            if (errorMessage) {
                setErrorMessage('');
            }
            (0, asyncOpenURL_1.default)((0, Travel_1.acceptSpotnanaTerms)(domain).then(function (response) {
                var _a;
                if ((response === null || response === void 0 ? void 0 : response.jsonCode) !== 200) {
                    return Promise.reject();
                }
                if (response === null || response === void 0 ? void 0 : response.spotnanaToken) {
                    return (0, Link_1.buildTravelDotURL)(response.spotnanaToken, (_a = response.isTestAccount) !== null && _a !== void 0 ? _a : false);
                }
            }), function (travelDotURL) { return travelDotURL !== null && travelDotURL !== void 0 ? travelDotURL : ''; });
        }} message={errorMessage} isAlertVisible={!!errorMessage} containerStyles={[styles.mh0, styles.mt5]} isLoading={isLoading}/>
                    </react_native_gesture_handler_1.ScrollView>
                </FullPageNotFoundView_1.default>
            </ScreenWrapper_1.default>

            <ConfirmModal_1.default isVisible={showVerifyCompanyModal} onConfirm={function () {
            createTravelEnablementIssue();
            setShowVerifyCompanyModal(false);
        }} onCancel={function () {
            setShowVerifyCompanyModal(false);
        }} title={translate('travel.verifyCompany.title')} titleStyles={styles.textHeadlineH1} titleContainerStyles={styles.mb2} prompt={translate('travel.verifyCompany.message')} promptStyles={styles.mb2} confirmText={translate('travel.verifyCompany.confirmText')} shouldShowCancelButton={false} image={Illustrations_1.RocketDude} imageStyles={StyleUtils.getBackgroundColorStyle(colors_1.default.ice600)}/>
        </>);
}
TravelTerms.displayName = 'TravelMenu';
exports.default = TravelTerms;
