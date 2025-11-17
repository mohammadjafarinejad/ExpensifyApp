"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var expensify_common_1 = require("expensify-common");
var react_1 = require("react");
var react_native_1 = require("react-native");
var DelegateNoAccessWrapper_1 = require("@components/DelegateNoAccessWrapper");
var FormProvider_1 = require("@components/Form/FormProvider");
var InputWrapper_1 = require("@components/Form/InputWrapper");
var HeaderWithBackButton_1 = require("@components/HeaderWithBackButton");
var ScreenWrapper_1 = require("@components/ScreenWrapper");
var Text_1 = require("@components/Text");
var TextInput_1 = require("@components/TextInput");
var useLocalize_1 = require("@hooks/useLocalize");
var useOnyx_1 = require("@hooks/useOnyx");
var useThemeStyles_1 = require("@hooks/useThemeStyles");
var ErrorUtils_1 = require("@libs/ErrorUtils");
var LoginUtils_1 = require("@libs/LoginUtils");
var Navigation_1 = require("@libs/Navigation/Navigation");
var User_1 = require("@userActions/User");
var CONST_1 = require("@src/CONST");
var ONYXKEYS_1 = require("@src/ONYXKEYS");
var ROUTES_1 = require("@src/ROUTES");
var NewContactMethodForm_1 = require("@src/types/form/NewContactMethodForm");
function NewContactMethodPage(_a) {
    var _b;
    var route = _a.route;
    var styles = (0, useThemeStyles_1.default)();
    var translate = (0, useLocalize_1.default)().translate;
    var loginInputRef = (0, react_1.useRef)(null);
    var loginList = (0, useOnyx_1.default)(ONYXKEYS_1.default.LOGIN_LIST, { canBeMissing: true })[0];
    var _c = (0, useOnyx_1.default)(ONYXKEYS_1.default.COUNTRY_CODE, { canBeMissing: false })[0], countryCode = _c === void 0 ? CONST_1.default.DEFAULT_COUNTRY_CODE : _c;
    var navigateBackTo = (_b = route === null || route === void 0 ? void 0 : route.params) === null || _b === void 0 ? void 0 : _b.backTo;
    var handleValidateMagicCode = (0, react_1.useCallback)(function (values) {
        var phoneLogin = (0, LoginUtils_1.getPhoneLogin)(values.phoneOrEmail, countryCode);
        var validateIfNumber = (0, LoginUtils_1.validateNumber)(phoneLogin);
        var submitDetail = (validateIfNumber || values.phoneOrEmail).trim().toLowerCase();
        (0, User_1.resetValidateActionCodeSent)();
        (0, User_1.addPendingContactMethod)(submitDetail);
        Navigation_1.default.navigate(ROUTES_1.default.SETTINGS_NEW_CONTACT_METHOD_CONFIRM_MAGIC_CODE.getRoute(submitDetail, navigateBackTo));
    }, [navigateBackTo, countryCode]);
    var validate = (0, react_1.useCallback)(function (values) {
        var phoneLogin = (0, LoginUtils_1.getPhoneLogin)(values.phoneOrEmail, countryCode);
        var validateIfNumber = (0, LoginUtils_1.validateNumber)(phoneLogin);
        var errors = {};
        if (!values.phoneOrEmail) {
            (0, ErrorUtils_1.addErrorMessage)(errors, 'phoneOrEmail', translate('contacts.genericFailureMessages.contactMethodRequired'));
        }
        else if (values.phoneOrEmail.length > CONST_1.default.LOGIN_CHARACTER_LIMIT) {
            (0, ErrorUtils_1.addErrorMessage)(errors, 'phoneOrEmail', translate('common.error.characterLimitExceedCounter', {
                length: values.phoneOrEmail.length,
                limit: CONST_1.default.LOGIN_CHARACTER_LIMIT,
            }));
        }
        if (!!values.phoneOrEmail && !(validateIfNumber || expensify_common_1.Str.isValidEmail(values.phoneOrEmail))) {
            (0, ErrorUtils_1.addErrorMessage)(errors, 'phoneOrEmail', translate('contacts.genericFailureMessages.invalidContactMethod'));
        }
        if (!!values.phoneOrEmail && (loginList === null || loginList === void 0 ? void 0 : loginList[validateIfNumber || values.phoneOrEmail.toLowerCase()])) {
            (0, ErrorUtils_1.addErrorMessage)(errors, 'phoneOrEmail', translate('contacts.genericFailureMessages.enteredMethodIsAlreadySubmitted'));
        }
        return errors;
    }, 
    // We don't need `loginList` because when submitting this form
    // the loginList gets updated, causing this function to run again.
    // https://github.com/Expensify/App/issues/20610
    // eslint-disable-next-line react-compiler/react-compiler, react-hooks/exhaustive-deps
    [translate, countryCode]);
    var onBackButtonPress = (0, react_1.useCallback)(function () {
        Navigation_1.default.goBack(ROUTES_1.default.SETTINGS_CONTACT_METHODS.getRoute(navigateBackTo));
    }, [navigateBackTo]);
    return (<ScreenWrapper_1.default onEntryTransitionEnd={function () { var _a; return (_a = loginInputRef.current) === null || _a === void 0 ? void 0 : _a.focus(); }} includeSafeAreaPaddingBottom shouldEnableMaxHeight shouldShowOfflineIndicatorInWideScreen testID={NewContactMethodPage.displayName}>
            <DelegateNoAccessWrapper_1.default accessDeniedVariants={[CONST_1.default.DELEGATE.DENIED_ACCESS_VARIANTS.DELEGATE]}>
                <HeaderWithBackButton_1.default title={translate('contacts.newContactMethod')} onBackButtonPress={onBackButtonPress}/>
                <FormProvider_1.default formID={ONYXKEYS_1.default.FORMS.NEW_CONTACT_METHOD_FORM} validate={validate} onSubmit={handleValidateMagicCode} submitButtonText={translate('common.add')} style={[styles.flexGrow1, styles.mh5]} shouldHideFixErrorsAlert>
                    <Text_1.default style={styles.mb5}>{translate('common.pleaseEnterEmailOrPhoneNumber')}</Text_1.default>
                    <react_native_1.View style={styles.mb6}>
                        <InputWrapper_1.default InputComponent={TextInput_1.default} label={"".concat(translate('common.email'), "/").concat(translate('common.phoneNumber'))} aria-label={"".concat(translate('common.email'), "/").concat(translate('common.phoneNumber'))} role={CONST_1.default.ROLE.PRESENTATION} inputMode={CONST_1.default.INPUT_MODE.EMAIL} ref={loginInputRef} inputID={NewContactMethodForm_1.default.PHONE_OR_EMAIL} autoCapitalize="none" enterKeyHint="done"/>
                    </react_native_1.View>
                </FormProvider_1.default>
            </DelegateNoAccessWrapper_1.default>
        </ScreenWrapper_1.default>);
}
NewContactMethodPage.displayName = 'NewContactMethodPage';
exports.default = NewContactMethodPage;
