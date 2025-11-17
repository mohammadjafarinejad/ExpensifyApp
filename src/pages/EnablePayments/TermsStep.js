"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var CheckboxWithLabel_1 = require("@components/CheckboxWithLabel");
var FormAlertWithSubmitButton_1 = require("@components/FormAlertWithSubmitButton");
var HeaderWithBackButton_1 = require("@components/HeaderWithBackButton");
var RenderHTML_1 = require("@components/RenderHTML");
var ScrollView_1 = require("@components/ScrollView");
var useLocalize_1 = require("@hooks/useLocalize");
var useOnyx_1 = require("@hooks/useOnyx");
var useThemeStyles_1 = require("@hooks/useThemeStyles");
var ErrorUtils_1 = require("@libs/ErrorUtils");
var BankAccounts_1 = require("@userActions/BankAccounts");
var CONST_1 = require("@src/CONST");
var ONYXKEYS_1 = require("@src/ONYXKEYS");
var LongTermsForm_1 = require("./TermsPage/LongTermsForm");
var ShortTermsForm_1 = require("./TermsPage/ShortTermsForm");
function HaveReadAndAgreeLabel() {
    var translate = (0, useLocalize_1.default)().translate;
    return <RenderHTML_1.default html={"".concat(translate('termsStep.haveReadAndAgree'))}/>;
}
function AgreeToTheLabel() {
    var translate = (0, useLocalize_1.default)().translate;
    var userWallet = (0, useOnyx_1.default)(ONYXKEYS_1.default.USER_WALLET, { canBeMissing: true })[0];
    var walletAgreementUrl = (userWallet === null || userWallet === void 0 ? void 0 : userWallet.walletProgramID) && (userWallet === null || userWallet === void 0 ? void 0 : userWallet.walletProgramID) === CONST_1.default.WALLET.BANCORP_WALLET_PROGRAM_ID
        ? CONST_1.default.OLD_DOT_PUBLIC_URLS.BANCORP_WALLET_AGREEMENT_URL
        : CONST_1.default.OLD_DOT_PUBLIC_URLS.WALLET_AGREEMENT_URL;
    return <RenderHTML_1.default html={"".concat(translate('termsStep.agreeToThe', { walletAgreementUrl: walletAgreementUrl }))}/>;
}
function TermsStep(props) {
    var _a;
    var styles = (0, useThemeStyles_1.default)();
    var _b = (0, react_1.useState)(false), hasAcceptedDisclosure = _b[0], setHasAcceptedDisclosure = _b[1];
    var _c = (0, react_1.useState)(false), hasAcceptedPrivacyPolicyAndWalletAgreement = _c[0], setHasAcceptedPrivacyPolicyAndWalletAgreement = _c[1];
    var _d = (0, react_1.useState)(false), error = _d[0], setError = _d[1];
    var translate = (0, useLocalize_1.default)().translate;
    var walletTerms = (0, useOnyx_1.default)(ONYXKEYS_1.default.WALLET_TERMS, { canBeMissing: true })[0];
    var errorMessage = error ? translate('common.error.acceptTerms') : ((_a = (0, ErrorUtils_1.getLatestErrorMessage)(walletTerms !== null && walletTerms !== void 0 ? walletTerms : {})) !== null && _a !== void 0 ? _a : '');
    var toggleDisclosure = function () {
        setHasAcceptedDisclosure(!hasAcceptedDisclosure);
    };
    var togglePrivacyPolicy = function () {
        setHasAcceptedPrivacyPolicyAndWalletAgreement(!hasAcceptedPrivacyPolicyAndWalletAgreement);
    };
    /** clear error */
    (0, react_1.useEffect)(function () {
        if (!hasAcceptedDisclosure || !hasAcceptedPrivacyPolicyAndWalletAgreement) {
            return;
        }
        setError(false);
    }, [hasAcceptedDisclosure, hasAcceptedPrivacyPolicyAndWalletAgreement]);
    return (<>
            <HeaderWithBackButton_1.default title={translate('termsStep.headerTitle')}/>

            <ScrollView_1.default style={styles.flex1} contentContainerStyle={styles.ph5}>
                <ShortTermsForm_1.default userWallet={props.userWallet}/>
                <LongTermsForm_1.default />
                <CheckboxWithLabel_1.default accessibilityLabel={translate('termsStep.haveReadAndAgreePlain')} style={[styles.mb4, styles.mt4]} onInputChange={toggleDisclosure} LabelComponent={HaveReadAndAgreeLabel}/>
                <CheckboxWithLabel_1.default accessibilityLabel={translate('termsStep.agreeToThePlain')} onInputChange={togglePrivacyPolicy} LabelComponent={AgreeToTheLabel}/>
                <FormAlertWithSubmitButton_1.default buttonText={translate('termsStep.enablePayments')} onSubmit={function () {
            var _a;
            if (!hasAcceptedDisclosure || !hasAcceptedPrivacyPolicyAndWalletAgreement) {
                setError(true);
                return;
            }
            setError(false);
            (0, BankAccounts_1.acceptWalletTerms)({
                hasAcceptedTerms: hasAcceptedDisclosure && hasAcceptedPrivacyPolicyAndWalletAgreement,
                // eslint-disable-next-line rulesdir/no-default-id-values
                reportID: (_a = walletTerms === null || walletTerms === void 0 ? void 0 : walletTerms.chatReportID) !== null && _a !== void 0 ? _a : '',
            });
        }} message={errorMessage} isAlertVisible={error || !!errorMessage} isLoading={!!(walletTerms === null || walletTerms === void 0 ? void 0 : walletTerms.isLoading)} containerStyles={[styles.mh0, styles.mv4]}/>
            </ScrollView_1.default>
        </>);
}
TermsStep.displayName = 'TermsPage';
exports.default = TermsStep;
