"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_native_1 = require("react-native");
var DelegateNoAccessWrapper_1 = require("@components/DelegateNoAccessWrapper");
var FormAlertWithSubmitButton_1 = require("@components/FormAlertWithSubmitButton");
var HeaderWithBackButton_1 = require("@components/HeaderWithBackButton");
var ScreenWrapper_1 = require("@components/ScreenWrapper");
var Text_1 = require("@components/Text");
var useLocalize_1 = require("@hooks/useLocalize");
var useOnyx_1 = require("@hooks/useOnyx");
var useThemeStyles_1 = require("@hooks/useThemeStyles");
var ErrorUtils_1 = require("@libs/ErrorUtils");
var Navigation_1 = require("@libs/Navigation/Navigation");
var NotFoundPage_1 = require("@pages/ErrorPage/NotFoundPage");
var Card_1 = require("@userActions/Card");
var CONST_1 = require("@src/CONST");
var ONYXKEYS_1 = require("@src/ONYXKEYS");
var ROUTES_1 = require("@src/ROUTES");
var SCREENS_1 = require("@src/SCREENS");
var EmptyObject_1 = require("@src/types/utils/EmptyObject");
function ReportVirtualCardFraudPage(_a) {
    var route = _a.route;
    var _b = route.params.cardID, cardID = _b === void 0 ? '' : _b;
    var styles = (0, useThemeStyles_1.default)();
    var translate = (0, useLocalize_1.default)().translate;
    var cardList = (0, useOnyx_1.default)(ONYXKEYS_1.default.CARD_LIST, { canBeMissing: false })[0];
    var formData = (0, useOnyx_1.default)(ONYXKEYS_1.default.FORMS.REPORT_VIRTUAL_CARD_FRAUD, { canBeMissing: true })[0];
    var virtualCard = cardList === null || cardList === void 0 ? void 0 : cardList[cardID];
    var virtualCardError = (0, ErrorUtils_1.getLatestErrorMessage)(virtualCard);
    (0, react_1.useEffect)(function () {
        (0, Card_1.clearReportVirtualCardFraudForm)();
    }, []);
    var handleSubmit = (0, react_1.useCallback)(function () {
        Navigation_1.default.navigate(ROUTES_1.default.SETTINGS_REPORT_FRAUD_VERIFY_ACCOUNT.getRoute(String(cardID)));
    }, [cardID]);
    if ((0, EmptyObject_1.isEmptyObject)(virtualCard) && !(formData === null || formData === void 0 ? void 0 : formData.cardID)) {
        return <NotFoundPage_1.default />;
    }
    return (<ScreenWrapper_1.default testID={ReportVirtualCardFraudPage.displayName}>
            <DelegateNoAccessWrapper_1.default accessDeniedVariants={[CONST_1.default.DELEGATE.DENIED_ACCESS_VARIANTS.DELEGATE]}>
                <HeaderWithBackButton_1.default title={translate('reportFraudPage.title')} onBackButtonPress={function () {
            if (route.name === SCREENS_1.default.DOMAIN_CARD.DOMAIN_CARD_REPORT_FRAUD) {
                Navigation_1.default.goBack(ROUTES_1.default.SETTINGS_DOMAIN_CARD_DETAIL.getRoute(cardID));
                return;
            }
            Navigation_1.default.goBack(ROUTES_1.default.SETTINGS_WALLET_DOMAIN_CARD.getRoute(cardID));
        }}/>
                <react_native_1.View style={[styles.flex1, styles.justifyContentBetween]}>
                    <Text_1.default style={[styles.webViewStyles.baseFontStyle, styles.mh5]}>{translate('reportFraudPage.description')}</Text_1.default>
                    <FormAlertWithSubmitButton_1.default isAlertVisible={!!virtualCardError} onSubmit={handleSubmit} message={virtualCardError} buttonText={translate('reportFraudPage.deactivateCard')} containerStyles={[styles.m5]}/>
                </react_native_1.View>
            </DelegateNoAccessWrapper_1.default>
        </ScreenWrapper_1.default>);
}
ReportVirtualCardFraudPage.displayName = 'ReportVirtualCardFraudPage';
exports.default = ReportVirtualCardFraudPage;
