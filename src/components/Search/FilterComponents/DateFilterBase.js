"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var Button_1 = require("@components/Button");
var FormAlertWithSubmitButton_1 = require("@components/FormAlertWithSubmitButton");
var HeaderWithBackButton_1 = require("@components/HeaderWithBackButton");
var ScrollView_1 = require("@components/ScrollView");
var useLocalize_1 = require("@hooks/useLocalize");
var useOnyx_1 = require("@hooks/useOnyx");
var useThemeStyles_1 = require("@hooks/useThemeStyles");
var SearchUIUtils_1 = require("@libs/SearchUIUtils");
var CONST_1 = require("@src/CONST");
var ONYXKEYS_1 = require("@src/ONYXKEYS");
var isLoadingOnyxValue_1 = require("@src/types/utils/isLoadingOnyxValue");
var DatePresetFilterBase_1 = require("./DatePresetFilterBase");
function DateFilterBase(_a) {
    var title = _a.title, dateKey = _a.dateKey, back = _a.back, onSubmit = _a.onSubmit;
    var styles = (0, useThemeStyles_1.default)();
    var translate = (0, useLocalize_1.default)().translate;
    var searchDatePresetFilterBaseRef = (0, react_1.useRef)(null);
    var _b = (0, useOnyx_1.default)(ONYXKEYS_1.default.FORMS.SEARCH_ADVANCED_FILTERS_FORM, { canBeMissing: true }), searchAdvancedFiltersForm = _b[0], searchAdvancedFiltersFormMetadata = _b[1];
    var isSearchAdvancedFiltersFormLoading = (0, isLoadingOnyxValue_1.default)(searchAdvancedFiltersFormMetadata);
    var _c = (0, react_1.useState)(null), selectedDateModifier = _c[0], setSelectedDateModifier = _c[1];
    var dateOnKey = dateKey.startsWith(CONST_1.default.SEARCH.REPORT_FIELD.GLOBAL_PREFIX)
        ? dateKey.replace(CONST_1.default.SEARCH.REPORT_FIELD.DEFAULT_PREFIX, CONST_1.default.SEARCH.REPORT_FIELD.ON_PREFIX)
        : "".concat(dateKey).concat(CONST_1.default.SEARCH.DATE_MODIFIERS.ON);
    var dateBeforeKey = dateKey.startsWith(CONST_1.default.SEARCH.REPORT_FIELD.GLOBAL_PREFIX)
        ? dateKey.replace(CONST_1.default.SEARCH.REPORT_FIELD.DEFAULT_PREFIX, CONST_1.default.SEARCH.REPORT_FIELD.BEFORE_PREFIX)
        : "".concat(dateKey).concat(CONST_1.default.SEARCH.DATE_MODIFIERS.BEFORE);
    var dateAfterKey = dateKey.startsWith(CONST_1.default.SEARCH.REPORT_FIELD.GLOBAL_PREFIX)
        ? dateKey.replace(CONST_1.default.SEARCH.REPORT_FIELD.DEFAULT_PREFIX, CONST_1.default.SEARCH.REPORT_FIELD.AFTER_PREFIX)
        : "".concat(dateKey).concat(CONST_1.default.SEARCH.DATE_MODIFIERS.AFTER);
    var dateOnValue = searchAdvancedFiltersForm === null || searchAdvancedFiltersForm === void 0 ? void 0 : searchAdvancedFiltersForm[dateOnKey];
    var dateBeforeValue = searchAdvancedFiltersForm === null || searchAdvancedFiltersForm === void 0 ? void 0 : searchAdvancedFiltersForm[dateBeforeKey];
    var dateAfterValue = searchAdvancedFiltersForm === null || searchAdvancedFiltersForm === void 0 ? void 0 : searchAdvancedFiltersForm[dateAfterKey];
    var defaultDateValues = (0, react_1.useMemo)(function () {
        var _a;
        return (_a = {},
            _a[CONST_1.default.SEARCH.DATE_MODIFIERS.ON] = dateOnValue,
            _a[CONST_1.default.SEARCH.DATE_MODIFIERS.BEFORE] = dateBeforeValue,
            _a[CONST_1.default.SEARCH.DATE_MODIFIERS.AFTER] = dateAfterValue,
            _a);
    }, [dateAfterValue, dateBeforeValue, dateOnValue]);
    var presets = (0, react_1.useMemo)(function () {
        var _a;
        var hasFeed = !!((_a = searchAdvancedFiltersForm === null || searchAdvancedFiltersForm === void 0 ? void 0 : searchAdvancedFiltersForm.feed) === null || _a === void 0 ? void 0 : _a.length);
        return (0, SearchUIUtils_1.getDatePresets)(dateKey, hasFeed);
    }, [dateKey, searchAdvancedFiltersForm === null || searchAdvancedFiltersForm === void 0 ? void 0 : searchAdvancedFiltersForm.feed]);
    var computedTitle = (0, react_1.useMemo)(function () {
        if (selectedDateModifier) {
            return translate("common.".concat(selectedDateModifier.toLowerCase()));
        }
        return title;
    }, [selectedDateModifier, title, translate]);
    var reset = (0, react_1.useCallback)(function () {
        if (!searchDatePresetFilterBaseRef.current) {
            return;
        }
        if (selectedDateModifier) {
            searchDatePresetFilterBaseRef.current.clearDateValueOfSelectedDateModifier();
            setSelectedDateModifier(null);
            return;
        }
        searchDatePresetFilterBaseRef.current.clearDateValues();
    }, [selectedDateModifier]);
    var save = (0, react_1.useCallback)(function () {
        var _a;
        var _b, _c, _d;
        if (!searchDatePresetFilterBaseRef.current) {
            return;
        }
        if (selectedDateModifier) {
            searchDatePresetFilterBaseRef.current.setDateValueOfSelectedDateModifier();
            setSelectedDateModifier(null);
            return;
        }
        var dateValues = searchDatePresetFilterBaseRef.current.getDateValues();
        onSubmit((_a = {},
            _a[dateOnKey] = (_b = dateValues[CONST_1.default.SEARCH.DATE_MODIFIERS.ON]) !== null && _b !== void 0 ? _b : null,
            _a[dateBeforeKey] = (_c = dateValues[CONST_1.default.SEARCH.DATE_MODIFIERS.BEFORE]) !== null && _c !== void 0 ? _c : null,
            _a[dateAfterKey] = (_d = dateValues[CONST_1.default.SEARCH.DATE_MODIFIERS.AFTER]) !== null && _d !== void 0 ? _d : null,
            _a));
    }, [selectedDateModifier, dateOnKey, dateBeforeKey, dateAfterKey, onSubmit]);
    var goBack = function () {
        if (selectedDateModifier) {
            setSelectedDateModifier(null);
            return;
        }
        back();
    };
    return (<>
            <HeaderWithBackButton_1.default title={computedTitle} onBackButtonPress={goBack}/>
            <ScrollView_1.default contentContainerStyle={[styles.flexGrow1]}>
                <DatePresetFilterBase_1.default ref={searchDatePresetFilterBaseRef} defaultDateValues={defaultDateValues} selectedDateModifier={selectedDateModifier} onSelectDateModifier={setSelectedDateModifier} presets={presets} isSearchAdvancedFiltersFormLoading={isSearchAdvancedFiltersFormLoading}/>
            </ScrollView_1.default>
            <Button_1.default text={translate('common.reset')} onPress={reset} style={[styles.mh4, styles.mt4]} large/>
            <FormAlertWithSubmitButton_1.default buttonText={translate('common.save')} containerStyles={[styles.m4, styles.mt3, styles.mb5]} onSubmit={save} enabledWhenOffline/>
        </>);
}
DateFilterBase.displayName = 'SearchDatePresetFilterBasePage';
exports.default = DateFilterBase;
