"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_native_1 = require("react-native");
var AmountWithoutCurrencyInput_1 = require("@components/AmountWithoutCurrencyInput");
var Button_1 = require("@components/Button");
var FormProvider_1 = require("@components/Form/FormProvider");
var InputWrapper_1 = require("@components/Form/InputWrapper");
var FormAlertWithSubmitButton_1 = require("@components/FormAlertWithSubmitButton");
var HeaderWithBackButton_1 = require("@components/HeaderWithBackButton");
var MenuItem_1 = require("@components/MenuItem");
var ScreenWrapper_1 = require("@components/ScreenWrapper");
var useAutoFocusInput_1 = require("@hooks/useAutoFocusInput");
var useLocalize_1 = require("@hooks/useLocalize");
var useOnyx_1 = require("@hooks/useOnyx");
var useThemeStyles_1 = require("@hooks/useThemeStyles");
var Search_1 = require("@libs/actions/Search");
var CurrencyUtils_1 = require("@libs/CurrencyUtils");
var Navigation_1 = require("@libs/Navigation/Navigation");
var CONST_1 = require("@src/CONST");
var ONYXKEYS_1 = require("@src/ONYXKEYS");
var ROUTES_1 = require("@src/ROUTES");
function SearchFiltersAmountBase(_a) {
    var title = _a.title, filterKey = _a.filterKey, testID = _a.testID;
    var styles = (0, useThemeStyles_1.default)();
    var translate = (0, useLocalize_1.default)().translate;
    var inputCallbackRef = (0, useAutoFocusInput_1.default)().inputCallbackRef;
    var _b = (0, react_1.useState)(null), selectedModifier = _b[0], setSelectedModifier = _b[1];
    var searchAdvancedFiltersForm = (0, useOnyx_1.default)(ONYXKEYS_1.default.FORMS.SEARCH_ADVANCED_FILTERS_FORM, { canBeMissing: false })[0];
    var equalToKey = "".concat(filterKey).concat(CONST_1.default.SEARCH.AMOUNT_MODIFIERS.EQUAL_TO);
    var greaterThanKey = "".concat(filterKey).concat(CONST_1.default.SEARCH.AMOUNT_MODIFIERS.GREATER_THAN);
    var lessThanKey = "".concat(filterKey).concat(CONST_1.default.SEARCH.AMOUNT_MODIFIERS.LESS_THAN);
    var equalTo = searchAdvancedFiltersForm === null || searchAdvancedFiltersForm === void 0 ? void 0 : searchAdvancedFiltersForm[equalToKey];
    var equalToFormattedAmount = equalTo ? (0, CurrencyUtils_1.convertToFrontendAmountAsString)(Number(equalTo)) : undefined;
    var greaterThan = searchAdvancedFiltersForm === null || searchAdvancedFiltersForm === void 0 ? void 0 : searchAdvancedFiltersForm[greaterThanKey];
    var greaterThanFormattedAmount = greaterThan ? (0, CurrencyUtils_1.convertToFrontendAmountAsString)(Number(greaterThan)) : undefined;
    var lessThan = searchAdvancedFiltersForm === null || searchAdvancedFiltersForm === void 0 ? void 0 : searchAdvancedFiltersForm[lessThanKey];
    var lessThanFormattedAmount = lessThan ? (0, CurrencyUtils_1.convertToFrontendAmountAsString)(Number(lessThan)) : undefined;
    var goBack = function () {
        if (selectedModifier) {
            setSelectedModifier(null);
        }
        else {
            Navigation_1.default.goBack(ROUTES_1.default.SEARCH_ADVANCED_FILTERS.getRoute());
        }
    };
    var updateAmountFilter = function (values) {
        var _a, _b;
        if (!selectedModifier) {
            return;
        }
        var fieldKey = "".concat(filterKey).concat(selectedModifier);
        var fieldValue = values[fieldKey];
        var rawAmount = String(fieldValue !== null && fieldValue !== void 0 ? fieldValue : '');
        var isAmountEmpty = rawAmount.trim() === '';
        if (isAmountEmpty) {
            (0, Search_1.updateAdvancedFilters)((_a = {}, _a[fieldKey] = null, _a));
            goBack();
            return;
        }
        // Build updates: clear on empty, otherwise persist formatted amount.
        var updates = (_b = {},
            _b[fieldKey] = (0, CurrencyUtils_1.convertToBackendAmount)(Number(rawAmount)).toString(),
            _b);
        // When setting an Equal To value, clear Greater Than and Less Than to avoid conflicting filters.
        if (selectedModifier === CONST_1.default.SEARCH.AMOUNT_MODIFIERS.EQUAL_TO) {
            updates[greaterThanKey] = null;
            updates[lessThanKey] = null;
        }
        // When setting Greater Than or Less Than, clear Equal To to avoid conflicting filters.
        if (selectedModifier === CONST_1.default.SEARCH.AMOUNT_MODIFIERS.GREATER_THAN || selectedModifier === CONST_1.default.SEARCH.AMOUNT_MODIFIERS.LESS_THAN) {
            updates[equalToKey] = null;
        }
        (0, Search_1.updateAdvancedFilters)(updates);
        goBack();
    };
    var reset = function () {
        var _a;
        (0, Search_1.updateAdvancedFilters)((_a = {},
            _a[equalToKey] = null,
            _a[greaterThanKey] = null,
            _a[lessThanKey] = null,
            _a));
    };
    var save = function () {
        Navigation_1.default.goBack(ROUTES_1.default.SEARCH_ADVANCED_FILTERS.getRoute());
    };
    var fieldTitle = (0, react_1.useMemo)(function () {
        switch (selectedModifier) {
            case CONST_1.default.SEARCH.AMOUNT_MODIFIERS.EQUAL_TO:
                return translate('search.filters.amount.equalTo');
            case CONST_1.default.SEARCH.AMOUNT_MODIFIERS.GREATER_THAN:
                return translate('search.filters.amount.greaterThan');
            case CONST_1.default.SEARCH.AMOUNT_MODIFIERS.LESS_THAN:
                return translate('search.filters.amount.lessThan');
            default:
                return translate(title);
        }
    }, [selectedModifier, title, translate]);
    var getCurrentValue = function () {
        if (!selectedModifier) {
            return undefined;
        }
        switch (selectedModifier) {
            case CONST_1.default.SEARCH.AMOUNT_MODIFIERS.EQUAL_TO:
                return equalToFormattedAmount;
            case CONST_1.default.SEARCH.AMOUNT_MODIFIERS.GREATER_THAN:
                return greaterThanFormattedAmount;
            case CONST_1.default.SEARCH.AMOUNT_MODIFIERS.LESS_THAN:
                return lessThanFormattedAmount;
            default:
                return undefined;
        }
    };
    var handleModifierSelect = function (modifier) {
        setSelectedModifier(modifier);
    };
    var modifierConfig = [
        {
            modifier: CONST_1.default.SEARCH.AMOUNT_MODIFIERS.EQUAL_TO,
            titleKey: 'search.filters.amount.equalTo',
            description: equalToFormattedAmount,
        },
        {
            modifier: CONST_1.default.SEARCH.AMOUNT_MODIFIERS.GREATER_THAN,
            titleKey: 'search.filters.amount.greaterThan',
            description: greaterThanFormattedAmount,
        },
        {
            modifier: CONST_1.default.SEARCH.AMOUNT_MODIFIERS.LESS_THAN,
            titleKey: 'search.filters.amount.lessThan',
            description: lessThanFormattedAmount,
        },
    ];
    if (!selectedModifier) {
        return (<ScreenWrapper_1.default testID={testID} shouldShowOfflineIndicatorInWideScreen offlineIndicatorStyle={styles.mtAuto} includeSafeAreaPaddingBottom shouldEnableMaxHeight>
                <HeaderWithBackButton_1.default title={fieldTitle} onBackButtonPress={function () { return Navigation_1.default.goBack(ROUTES_1.default.SEARCH_ADVANCED_FILTERS.getRoute()); }}/>
                <react_native_1.View style={styles.flex1}>
                    <react_native_1.View style={styles.flexGrow1}>
                        {modifierConfig.map(function (_a) {
                var modifier = _a.modifier, titleKey = _a.titleKey, description = _a.description;
                return (<MenuItem_1.default key={modifier} title={translate(titleKey)} description={description} onPress={function () { return handleModifierSelect(modifier); }} shouldShowRightIcon viewMode={CONST_1.default.OPTION_MODE.COMPACT}/>);
            })}
                    </react_native_1.View>
                    <Button_1.default text={translate('common.reset')} onPress={reset} style={[styles.mh4, styles.mt4]} large/>
                    <FormAlertWithSubmitButton_1.default buttonText={translate('common.save')} containerStyles={[styles.m4, styles.mt3, styles.mb5]} onSubmit={save} enabledWhenOffline/>
                </react_native_1.View>
            </ScreenWrapper_1.default>);
    }
    return (<ScreenWrapper_1.default testID={testID} shouldShowOfflineIndicatorInWideScreen offlineIndicatorStyle={styles.mtAuto} includeSafeAreaPaddingBottom shouldEnableMaxHeight>
            <HeaderWithBackButton_1.default onBackButtonPress={goBack} title={fieldTitle}/>
            <FormProvider_1.default style={[styles.flex1, styles.ph4]} formID={ONYXKEYS_1.default.FORMS.SEARCH_ADVANCED_FILTERS_FORM} onSubmit={updateAmountFilter} submitButtonText={translate('common.save')} enabledWhenOffline>
                <react_native_1.View style={styles.mb5}>
                    <InputWrapper_1.default InputComponent={AmountWithoutCurrencyInput_1.default} inputID={"".concat(filterKey).concat(selectedModifier)} name={"".concat(filterKey).concat(selectedModifier)} defaultValue={getCurrentValue()} label={fieldTitle} accessibilityLabel={fieldTitle} role={CONST_1.default.ROLE.PRESENTATION} ref={inputCallbackRef} inputMode={CONST_1.default.INPUT_MODE.DECIMAL} autoFocus uncontrolled/>
                </react_native_1.View>
            </FormProvider_1.default>
        </ScreenWrapper_1.default>);
}
SearchFiltersAmountBase.displayName = 'SearchFiltersAmountBase';
exports.default = SearchFiltersAmountBase;
