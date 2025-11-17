"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_native_1 = require("react-native");
var FullscreenLoadingIndicator_1 = require("@components/FullscreenLoadingIndicator");
var HeaderWithBackButton_1 = require("@components/HeaderWithBackButton");
var ScreenWrapper_1 = require("@components/ScreenWrapper");
var useLocalize_1 = require("@hooks/useLocalize");
var useNetwork_1 = require("@hooks/useNetwork");
var useOnyx_1 = require("@hooks/useOnyx");
var useThemeStyles_1 = require("@hooks/useThemeStyles");
var Navigation_1 = require("@libs/Navigation/Navigation");
var PaymentUtils_1 = require("@libs/PaymentUtils");
var Wallet_1 = require("@userActions/Wallet");
var CONST_1 = require("@src/CONST");
var ONYXKEYS_1 = require("@src/ONYXKEYS");
var ROUTES_1 = require("@src/ROUTES");
var EmptyObject_1 = require("@src/types/utils/EmptyObject");
var AddBankAccount_1 = require("./AddBankAccount/AddBankAccount");
var FailedKYC_1 = require("./FailedKYC");
var FeesAndTerms_1 = require("./FeesAndTerms/FeesAndTerms");
var PersonalInfo_1 = require("./PersonalInfo/PersonalInfo");
var VerifyIdentity_1 = require("./VerifyIdentity/VerifyIdentity");
function EnablePaymentsPage() {
    var _a;
    var styles = (0, useThemeStyles_1.default)();
    var translate = (0, useLocalize_1.default)().translate;
    var isOffline = (0, useNetwork_1.default)().isOffline;
    var userWallet = (0, useOnyx_1.default)(ONYXKEYS_1.default.USER_WALLET, { canBeMissing: true })[0];
    var bankAccountList = (0, useOnyx_1.default)(ONYXKEYS_1.default.BANK_ACCOUNT_LIST, { canBeMissing: true })[0];
    var fundList = (0, useOnyx_1.default)(ONYXKEYS_1.default.FUND_LIST, { canBeMissing: true })[0];
    var paymentCardList = fundList !== null && fundList !== void 0 ? fundList : {};
    (0, react_1.useEffect)(function () {
        if (isOffline) {
            return;
        }
        if ((0, EmptyObject_1.isEmptyObject)(userWallet)) {
            (0, Wallet_1.openEnablePaymentsPage)();
        }
    }, [isOffline, userWallet]);
    if ((0, EmptyObject_1.isEmptyObject)(userWallet)) {
        return <FullscreenLoadingIndicator_1.default />;
    }
    if ((userWallet === null || userWallet === void 0 ? void 0 : userWallet.errorCode) === CONST_1.default.WALLET.ERROR.KYC) {
        return (<ScreenWrapper_1.default testID={EnablePaymentsPage.displayName} includeSafeAreaPaddingBottom={false} shouldEnablePickerAvoiding={false}>
                <HeaderWithBackButton_1.default title={translate('personalInfoStep.personalInfo')} onBackButtonPress={function () { return Navigation_1.default.goBack(ROUTES_1.default.SETTINGS_WALLET); }}/>
                <FailedKYC_1.default />
            </ScreenWrapper_1.default>);
    }
    var hasActivatedWallet = [CONST_1.default.WALLET.TIER_NAME.GOLD, CONST_1.default.WALLET.TIER_NAME.PLATINUM].includes((_a = userWallet === null || userWallet === void 0 ? void 0 : userWallet.tierName) !== null && _a !== void 0 ? _a : '');
    var enablePaymentsStep = !(0, PaymentUtils_1.hasExpensifyPaymentMethod)(paymentCardList, bankAccountList !== null && bankAccountList !== void 0 ? bankAccountList : {}, hasActivatedWallet)
        ? CONST_1.default.WALLET.STEP.ADD_BANK_ACCOUNT
        : (userWallet === null || userWallet === void 0 ? void 0 : userWallet.currentStep) || CONST_1.default.WALLET.STEP.ADDITIONAL_DETAILS;
    var CurrentStep;
    switch (enablePaymentsStep) {
        case CONST_1.default.WALLET.STEP.ADD_BANK_ACCOUNT:
            CurrentStep = <AddBankAccount_1.default />;
            break;
        case CONST_1.default.WALLET.STEP.ADDITIONAL_DETAILS:
        case CONST_1.default.WALLET.STEP.ADDITIONAL_DETAILS_KBA:
            CurrentStep = <PersonalInfo_1.default />;
            break;
        case CONST_1.default.WALLET.STEP.ONFIDO:
            CurrentStep = <VerifyIdentity_1.default />;
            break;
        case CONST_1.default.WALLET.STEP.TERMS:
            CurrentStep = <FeesAndTerms_1.default />;
            break;
        default:
            CurrentStep = null;
            break;
    }
    if (CurrentStep) {
        return (<react_native_1.View style={styles.flex1} fsClass={CONST_1.default.FULLSTORY.CLASS.MASK}>
                {CurrentStep}
            </react_native_1.View>);
    }
    return null;
}
EnablePaymentsPage.displayName = 'EnablePaymentsPage';
exports.default = EnablePaymentsPage;
