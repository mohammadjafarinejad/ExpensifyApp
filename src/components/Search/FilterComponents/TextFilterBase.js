"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_native_1 = require("react-native");
var FormProvider_1 = require("@components/Form/FormProvider");
var InputWrapper_1 = require("@components/Form/InputWrapper");
var TextInput_1 = require("@components/TextInput");
var useAutoFocusInput_1 = require("@hooks/useAutoFocusInput");
var useLocalize_1 = require("@hooks/useLocalize");
var useOnyx_1 = require("@hooks/useOnyx");
var useThemeStyles_1 = require("@hooks/useThemeStyles");
var ValidationUtils_1 = require("@libs/ValidationUtils");
var CONST_1 = require("@src/CONST");
var ONYXKEYS_1 = require("@src/ONYXKEYS");
function TextFilterBase(_a) {
    var _b;
    var filterKey = _a.filterKey, title = _a.title, onSubmit = _a.onSubmit, _c = _a.characterLimit, characterLimit = _c === void 0 ? CONST_1.default.MERCHANT_NAME_MAX_BYTES : _c;
    var styles = (0, useThemeStyles_1.default)();
    var translate = (0, useLocalize_1.default)().translate;
    var searchAdvancedFiltersForm = (0, useOnyx_1.default)(ONYXKEYS_1.default.FORMS.SEARCH_ADVANCED_FILTERS_FORM, { canBeMissing: false })[0];
    var currentValue = (_b = searchAdvancedFiltersForm === null || searchAdvancedFiltersForm === void 0 ? void 0 : searchAdvancedFiltersForm[filterKey]) !== null && _b !== void 0 ? _b : '';
    var inputCallbackRef = (0, useAutoFocusInput_1.default)().inputCallbackRef;
    var validate = function (values) {
        var _a;
        var errors = {};
        var fieldValue = (_a = values[filterKey]) !== null && _a !== void 0 ? _a : '';
        var trimmedValue = fieldValue.trim();
        var _b = (0, ValidationUtils_1.isValidInputLength)(trimmedValue, characterLimit), isValid = _b.isValid, byteLength = _b.byteLength;
        if (!isValid) {
            errors[filterKey] = translate('common.error.characterLimitExceedCounter', { length: byteLength, limit: characterLimit });
        }
        return errors;
    };
    return (<FormProvider_1.default style={[styles.flex1, styles.ph5]} formID={ONYXKEYS_1.default.FORMS.SEARCH_ADVANCED_FILTERS_FORM} validate={validate} onSubmit={onSubmit} submitButtonText={translate('common.save')} enabledWhenOffline shouldHideFixErrorsAlert>
            <react_native_1.View style={styles.mb5}>
                <InputWrapper_1.default InputComponent={TextInput_1.default} inputID={filterKey} name={filterKey} defaultValue={currentValue} label={title} accessibilityLabel={title} role={CONST_1.default.ROLE.PRESENTATION} ref={inputCallbackRef}/>
            </react_native_1.View>
        </FormProvider_1.default>);
}
TextFilterBase.displayName = 'TextFilterBase';
exports.default = TextFilterBase;
