"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_native_1 = require("react-native");
var Text_1 = require("@components/Text");
var TextInput_1 = require("@components/TextInput");
var useLocalize_1 = require("@hooks/useLocalize");
var useThemeStyles_1 = require("@hooks/useThemeStyles");
var CONST_1 = require("@src/CONST");
function TextInput(_a) {
    var ref = _a.ref, options = _a.options, accessibilityLabel = _a.accessibilityLabel, _b = _a.isLoading, isLoading = _b === void 0 ? false : _b, dataLength = _a.dataLength, onSubmit = _a.onSubmit, onKeyPress = _a.onKeyPress, onFocusChange = _a.onFocusChange, showLoadingPlaceholder = _a.showLoadingPlaceholder, isLoadingNewOptions = _a.isLoadingNewOptions, shouldShowTextInput = _a.shouldShowTextInput;
    var styles = (0, useThemeStyles_1.default)();
    var translate = (0, useLocalize_1.default)().translate;
    var headerMessage = options === null || options === void 0 ? void 0 : options.headerMessage;
    var resultsFound = headerMessage !== translate('common.noResultsFound');
    var noData = dataLength === 0 && !showLoadingPlaceholder;
    var shouldShowHeaderMessage = !!headerMessage && !isLoadingNewOptions && resultsFound && !noData;
    if (!shouldShowTextInput) {
        return null;
    }
    return (<react_native_1.View style={[styles.ph5, styles.pb3]}>
            <TextInput_1.default ref={ref} onKeyPress={onKeyPress} onFocus={function () { return onFocusChange === null || onFocusChange === void 0 ? void 0 : onFocusChange(true); }} onBlur={function () { return onFocusChange === null || onFocusChange === void 0 ? void 0 : onFocusChange(false); }} label={options === null || options === void 0 ? void 0 : options.label} accessibilityLabel={accessibilityLabel} hint={options === null || options === void 0 ? void 0 : options.hint} role={CONST_1.default.ROLE.PRESENTATION} value={options === null || options === void 0 ? void 0 : options.value} placeholder={options === null || options === void 0 ? void 0 : options.placeholder} maxLength={options === null || options === void 0 ? void 0 : options.maxLength} onChangeText={options === null || options === void 0 ? void 0 : options.onChangeText} inputMode={options === null || options === void 0 ? void 0 : options.inputMode} selectTextOnFocus spellCheck={false} onSubmitEditing={onSubmit} submitBehavior={dataLength ? 'blurAndSubmit' : 'submit'} isLoading={isLoading} testID="selection-list-text-input" errorText={options === null || options === void 0 ? void 0 : options.errorText} shouldInterceptSwipe={false}/>
            {shouldShowHeaderMessage && (<react_native_1.View style={[styles.ph5, styles.pb5]}>
                    <Text_1.default style={[styles.textLabel, styles.colorMuted, styles.minHeight5]}>{headerMessage}</Text_1.default>
                </react_native_1.View>)}
        </react_native_1.View>);
}
TextInput.displayName = 'TextInput';
exports.default = TextInput;
