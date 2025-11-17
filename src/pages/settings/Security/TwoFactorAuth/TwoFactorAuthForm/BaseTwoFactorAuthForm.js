"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var native_1 = require("@react-navigation/native");
var react_1 = require("react");
var MagicCodeInput_1 = require("@components/MagicCodeInput");
var PressableWithFeedback_1 = require("@components/Pressable/PressableWithFeedback");
var Text_1 = require("@components/Text");
var TextInput_1 = require("@components/TextInput");
var useLocalize_1 = require("@hooks/useLocalize");
var useOnyx_1 = require("@hooks/useOnyx");
var useThemeStyles_1 = require("@hooks/useThemeStyles");
var Browser_1 = require("@libs/Browser");
var canFocusInputOnScreenFocus_1 = require("@libs/canFocusInputOnScreenFocus");
var ErrorUtils_1 = require("@libs/ErrorUtils");
var ValidationUtils_1 = require("@libs/ValidationUtils");
var Session_1 = require("@userActions/Session");
var CONST_1 = require("@src/CONST");
var ONYXKEYS_1 = require("@src/ONYXKEYS");
var isMobile = !(0, canFocusInputOnScreenFocus_1.default)();
function BaseTwoFactorAuthForm(_a) {
    var _b, _c, _d;
    var autoComplete = _a.autoComplete, validateInsteadOfDisable = _a.validateInsteadOfDisable, onFocus = _a.onFocus, _e = _a.shouldAutoFocusOnMobile, shouldAutoFocusOnMobile = _e === void 0 ? true : _e, ref = _a.ref;
    var translate = (0, useLocalize_1.default)().translate;
    var styles = (0, useThemeStyles_1.default)();
    var _f = (0, react_1.useState)({}), formError = _f[0], setFormError = _f[1];
    var account = (0, useOnyx_1.default)(ONYXKEYS_1.default.ACCOUNT, { canBeMissing: false })[0];
    var _g = (0, react_1.useState)(''), twoFactorAuthCode = _g[0], setTwoFactorAuthCode = _g[1];
    var _h = (0, react_1.useState)(''), recoveryCode = _h[0], setRecoveryCode = _h[1];
    var _j = (0, react_1.useState)(false), isUsingRecoveryCode = _j[0], setIsUsingRecoveryCode = _j[1];
    var inputRef = (0, react_1.useRef)(null);
    var recoveryInputRef = (0, react_1.useRef)(null);
    var shouldClearData = (_b = account === null || account === void 0 ? void 0 : account.needsTwoFactorAuthSetup) !== null && _b !== void 0 ? _b : false;
    var shouldAllowRecoveryCode = validateInsteadOfDisable === false;
    var focusRecoveryInput = (0, react_1.useCallback)(function () {
        if (!recoveryInputRef.current) {
            return;
        }
        if ('focus' in recoveryInputRef.current && typeof recoveryInputRef.current.focus === 'function') {
            recoveryInputRef.current.focus();
        }
    }, []);
    /**
     * Handle text input and clear formError upon text change
     */
    var clearAccountErrorsIfPresent = (0, react_1.useCallback)(function () {
        if (!(account === null || account === void 0 ? void 0 : account.errors)) {
            return;
        }
        (0, Session_1.clearAccountMessages)();
    }, [account === null || account === void 0 ? void 0 : account.errors]);
    var onTwoFactorCodeInput = (0, react_1.useCallback)(function (text) {
        setTwoFactorAuthCode(text);
        setFormError(function (prev) { return (__assign(__assign({}, prev), { twoFactorAuthCode: undefined })); });
        clearAccountErrorsIfPresent();
    }, [clearAccountErrorsIfPresent]);
    var onRecoveryCodeInput = (0, react_1.useCallback)(function (text) {
        setRecoveryCode(text);
        setFormError(function (prev) { return (__assign(__assign({}, prev), { recoveryCode: undefined })); });
        clearAccountErrorsIfPresent();
    }, [clearAccountErrorsIfPresent]);
    var validateAndSubmitAuthAppCode = (0, react_1.useCallback)(function () {
        if (inputRef.current) {
            inputRef.current.blur();
        }
        var sanitizedTwoFactorCode = twoFactorAuthCode.trim();
        if (!sanitizedTwoFactorCode) {
            setFormError({ twoFactorAuthCode: translate('twoFactorAuthForm.error.pleaseFillTwoFactorAuth') });
            return;
        }
        if (!(0, ValidationUtils_1.isValidTwoFactorCode)(sanitizedTwoFactorCode)) {
            setFormError({ twoFactorAuthCode: translate('twoFactorAuthForm.error.incorrect2fa') });
            return;
        }
        setFormError({});
        if (validateInsteadOfDisable !== false) {
            (0, Session_1.validateTwoFactorAuth)(sanitizedTwoFactorCode, shouldClearData);
            return;
        }
        (0, Session_1.toggleTwoFactorAuth)(false, sanitizedTwoFactorCode);
    }, [translate, twoFactorAuthCode, validateInsteadOfDisable, shouldClearData]);
    var validateAndSubmitRecoveryCode = (0, react_1.useCallback)(function () {
        if (recoveryInputRef.current && 'blur' in recoveryInputRef.current && typeof recoveryInputRef.current.blur === 'function') {
            recoveryInputRef.current.blur();
        }
        var sanitizedRecoveryCode = recoveryCode.trim();
        if (!sanitizedRecoveryCode) {
            setFormError({ recoveryCode: translate('recoveryCodeForm.error.pleaseFillRecoveryCode') });
            return;
        }
        if (!(0, ValidationUtils_1.isValidRecoveryCode)(sanitizedRecoveryCode)) {
            setFormError({ recoveryCode: translate('recoveryCodeForm.error.incorrectRecoveryCode') });
            return;
        }
        setFormError({});
        (0, Session_1.toggleTwoFactorAuth)(false, sanitizedRecoveryCode);
    }, [recoveryCode, translate]);
    /**
     * Check that all the form fields are valid, then trigger the submit callback
     */
    var validateAndSubmitForm = (0, react_1.useCallback)(function () {
        if (shouldAllowRecoveryCode && isUsingRecoveryCode) {
            validateAndSubmitRecoveryCode();
            return;
        }
        validateAndSubmitAuthAppCode();
    }, [isUsingRecoveryCode, shouldAllowRecoveryCode, validateAndSubmitAuthAppCode, validateAndSubmitRecoveryCode]);
    (0, react_1.useImperativeHandle)(ref, function () { return ({
        validateAndSubmitForm: function () {
            validateAndSubmitForm();
        },
        focus: function () {
            var _a;
            if (shouldAllowRecoveryCode && isUsingRecoveryCode) {
                focusRecoveryInput();
                return;
            }
            (_a = inputRef.current) === null || _a === void 0 ? void 0 : _a.focus();
        },
        focusLastSelected: function () {
            if (shouldAllowRecoveryCode && isUsingRecoveryCode) {
                focusRecoveryInput();
                return;
            }
            setTimeout(function () {
                var _a;
                (_a = inputRef.current) === null || _a === void 0 ? void 0 : _a.focusLastSelected();
            }, CONST_1.default.ANIMATED_TRANSITION);
        },
    }); });
    (0, native_1.useFocusEffect)((0, react_1.useCallback)(function () {
        var _a;
        if (shouldAllowRecoveryCode && isUsingRecoveryCode) {
            if (!recoveryInputRef.current || (isMobile && !shouldAutoFocusOnMobile)) {
                return;
            }
            // Keyboard won't show if we focus the input with a delay, so we need to focus immediately.
            // This is the same condition as in BaseValidateCodeForm
            if (!(0, Browser_1.isMobileSafari)()) {
                setTimeout(function () {
                    focusRecoveryInput();
                }, CONST_1.default.ANIMATED_TRANSITION);
            }
            else {
                focusRecoveryInput();
            }
            return;
        }
        if (!inputRef.current || (isMobile && !shouldAutoFocusOnMobile)) {
            return;
        }
        // Keyboard won't show if we focus the input with a delay, so we need to focus immediately.
        if (!(0, Browser_1.isMobileSafari)()) {
            setTimeout(function () {
                var _a;
                (_a = inputRef.current) === null || _a === void 0 ? void 0 : _a.focusLastSelected();
            }, CONST_1.default.ANIMATED_TRANSITION);
        }
        else {
            (_a = inputRef.current) === null || _a === void 0 ? void 0 : _a.focusLastSelected();
        }
    }, [focusRecoveryInput, isUsingRecoveryCode, shouldAllowRecoveryCode, shouldAutoFocusOnMobile]));
    var errorMessage = (0, ErrorUtils_1.getLatestErrorMessage)(account);
    var handleToggleInputType = (0, react_1.useCallback)(function () {
        if (!shouldAllowRecoveryCode) {
            return;
        }
        setIsUsingRecoveryCode(function (prev) {
            var nextValue = !prev;
            if (nextValue) {
                setTwoFactorAuthCode('');
            }
            else {
                setRecoveryCode('');
            }
            return nextValue;
        });
        setFormError({});
        clearAccountErrorsIfPresent();
    }, [clearAccountErrorsIfPresent, shouldAllowRecoveryCode]);
    var toggleLabelKey = isUsingRecoveryCode ? 'recoveryCodeForm.use2fa' : 'recoveryCodeForm.useRecoveryCode';
    return (<>
            {shouldAllowRecoveryCode && (<Text_1.default style={[styles.mb3]}>{translate(isUsingRecoveryCode ? 'twoFactorAuth.explainProcessToRemoveWithRecovery' : 'twoFactorAuth.explainProcessToRemove')}</Text_1.default>)}
            {shouldAllowRecoveryCode && isUsingRecoveryCode ? (<TextInput_1.default ref={function (input) {
                recoveryInputRef.current = input;
            }} value={recoveryCode} onChangeText={onRecoveryCodeInput} onFocus={onFocus} autoFocus={shouldAllowRecoveryCode && isUsingRecoveryCode && (!isMobile || shouldAutoFocusOnMobile)} autoCapitalize="characters" label={translate('recoveryCodeForm.recoveryCode')} maxLength={CONST_1.default.FORM_CHARACTER_LIMIT} errorText={(_c = formError.recoveryCode) !== null && _c !== void 0 ? _c : errorMessage} onSubmitEditing={validateAndSubmitForm} accessibilityLabel={translate('recoveryCodeForm.recoveryCode')} role={CONST_1.default.ROLE.PRESENTATION} testID="recoveryCodeInput"/>) : (<MagicCodeInput_1.default autoComplete={autoComplete} name="twoFactorAuthCode" value={twoFactorAuthCode} onChangeText={onTwoFactorCodeInput} onFocus={onFocus} onFulfill={validateAndSubmitForm} errorText={(_d = formError.twoFactorAuthCode) !== null && _d !== void 0 ? _d : errorMessage} ref={inputRef} autoFocus={false} testID="twoFactorAuthCodeInput"/>)}
            {shouldAllowRecoveryCode && (<PressableWithFeedback_1.default style={[styles.mt2]} onPress={handleToggleInputType} hoverDimmingValue={1} accessibilityLabel={translate(toggleLabelKey)}>
                    <Text_1.default style={[styles.link]}>{translate(toggleLabelKey)}</Text_1.default>
                </PressableWithFeedback_1.default>)}
        </>);
}
exports.default = BaseTwoFactorAuthForm;
