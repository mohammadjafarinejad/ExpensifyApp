"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Policy_1 = require("@selectors/Policy");
var react_1 = require("react");
var Button_1 = require("@components/Button");
var FormAlertWithSubmitButton_1 = require("@components/FormAlertWithSubmitButton");
var HeaderWithBackButton_1 = require("@components/HeaderWithBackButton");
var MenuItem_1 = require("@components/MenuItem");
var ScreenWrapper_1 = require("@components/ScreenWrapper");
var ScrollView_1 = require("@components/ScrollView");
var useLocalize_1 = require("@hooks/useLocalize");
var useOnyx_1 = require("@hooks/useOnyx");
var useThemeStyles_1 = require("@hooks/useThemeStyles");
var Search_1 = require("@libs/actions/Search");
var Navigation_1 = require("@libs/Navigation/Navigation");
var SearchQueryUtils_1 = require("@libs/SearchQueryUtils");
var CONST_1 = require("@src/CONST");
var ONYXKEYS_1 = require("@src/ONYXKEYS");
var ROUTES_1 = require("@src/ROUTES");
var ReportFieldDate_1 = require("./ReportFieldDate");
var ReportFieldList_1 = require("./ReportFieldList");
var ReportFieldText_1 = require("./ReportFieldText");
function SearchFiltersReportFieldPage() {
    var _a;
    var styles = (0, useThemeStyles_1.default)();
    var _b = (0, useLocalize_1.default)(), translate = _b.translate, localeCompare = _b.localeCompare;
    var _c = (0, react_1.useState)(null), selectedField = _c[0], setSelectedField = _c[1];
    var advancedFiltersForm = (0, useOnyx_1.default)(ONYXKEYS_1.default.FORMS.SEARCH_ADVANCED_FILTERS_FORM, { canBeMissing: false })[0];
    var policyReportFieldsSelector = (0, react_1.useCallback)(function (policies) { return (0, Policy_1.createAllPolicyReportFieldsSelector)(policies, localeCompare); }, [localeCompare]);
    var fieldList = (0, useOnyx_1.default)(ONYXKEYS_1.default.COLLECTION.POLICY, {
        canBeMissing: false,
        selector: policyReportFieldsSelector,
    })[0];
    var listItems = (0, react_1.useMemo)(function () {
        return Object.values(fieldList !== null && fieldList !== void 0 ? fieldList : {}).map(function (field) {
            var suffix = field.name.toLowerCase().replaceAll(' ', '-');
            if (field.type === CONST_1.default.REPORT_FIELD_TYPES.DATE) {
                var dateValues = [];
                var onValue = advancedFiltersForm === null || advancedFiltersForm === void 0 ? void 0 : advancedFiltersForm["".concat(CONST_1.default.SEARCH.REPORT_FIELD.ON_PREFIX).concat(suffix)];
                var afterValue = advancedFiltersForm === null || advancedFiltersForm === void 0 ? void 0 : advancedFiltersForm["".concat(CONST_1.default.SEARCH.REPORT_FIELD.AFTER_PREFIX).concat(suffix)];
                var beforeValue = advancedFiltersForm === null || advancedFiltersForm === void 0 ? void 0 : advancedFiltersForm["".concat(CONST_1.default.SEARCH.REPORT_FIELD.BEFORE_PREFIX).concat(suffix)];
                if (onValue) {
                    dateValues.push((0, SearchQueryUtils_1.isSearchDatePreset)(onValue) ? translate("search.filters.date.presets.".concat(onValue)) : translate('search.filters.date.on', { date: onValue }));
                }
                if (afterValue) {
                    dateValues.push(translate('search.filters.date.after', { date: afterValue }));
                }
                if (beforeValue) {
                    dateValues.push(translate('search.filters.date.before', { date: beforeValue }));
                }
                return { key: field.fieldID, name: field.name, value: dateValues.join(', '), field: field };
            }
            var formKey = "".concat(CONST_1.default.SEARCH.REPORT_FIELD.DEFAULT_PREFIX).concat(suffix);
            var formValue = advancedFiltersForm === null || advancedFiltersForm === void 0 ? void 0 : advancedFiltersForm[formKey];
            return { key: field.fieldID, name: field.name, value: formValue, field: field };
        });
    }, [advancedFiltersForm, fieldList, translate]);
    var resetValues = function () {
        var clearedAdvancedFiltersForm = Object.keys(advancedFiltersForm !== null && advancedFiltersForm !== void 0 ? advancedFiltersForm : {}).reduce(function (acc, key) {
            var _a;
            if (key.startsWith(CONST_1.default.SEARCH.REPORT_FIELD.GLOBAL_PREFIX)) {
                return Object.assign(acc, (_a = {}, _a[key] = null, _a));
            }
            return acc;
        }, {});
        (0, Search_1.updateAdvancedFilters)(clearedAdvancedFiltersForm);
    };
    /**
     * Changes are automatically saved to the advanced filters form, so we can
     * just navigate back
     */
    var saveChanges = function () {
        Navigation_1.default.goBack(ROUTES_1.default.SEARCH_ADVANCED_FILTERS.getRoute());
    };
    if (selectedField) {
        // We only support list, date, & text for report fields, no other types
        var fieldType = selectedField.type;
        var UpdateReportFieldComponent = (_a = {},
            _a[CONST_1.default.REPORT_FIELD_TYPES.LIST] = ReportFieldList_1.default,
            _a[CONST_1.default.REPORT_FIELD_TYPES.DATE] = ReportFieldDate_1.default,
            _a[CONST_1.default.REPORT_FIELD_TYPES.TEXT] = ReportFieldText_1.default,
            _a)[fieldType];
        return (<ScreenWrapper_1.default testID={SearchFiltersReportFieldPage.displayName} shouldShowOfflineIndicatorInWideScreen offlineIndicatorStyle={styles.mtAuto} includeSafeAreaPaddingBottom shouldEnableMaxHeight>
                <UpdateReportFieldComponent field={selectedField} close={function () { return setSelectedField(null); }}/>
            </ScreenWrapper_1.default>);
    }
    return (<ScreenWrapper_1.default testID={SearchFiltersReportFieldPage.displayName} shouldShowOfflineIndicatorInWideScreen offlineIndicatorStyle={styles.mtAuto} includeSafeAreaPaddingBottom shouldEnableMaxHeight>
            <HeaderWithBackButton_1.default title={translate('workspace.common.reportField')} onBackButtonPress={function () {
            resetValues();
            Navigation_1.default.goBack(ROUTES_1.default.SEARCH_ADVANCED_FILTERS.getRoute());
        }}/>
            <ScrollView_1.default contentContainerStyle={[styles.flexGrow1]}>
                {listItems.map(function (item) { return (<MenuItem_1.default key={item.key} shouldShowRightIcon viewMode={CONST_1.default.OPTION_MODE.COMPACT} title={item.name} description={item.value} onPress={function () { return setSelectedField(item.field); }}/>); })}
            </ScrollView_1.default>
            <Button_1.default large text={translate('common.reset')} style={[styles.mh4, styles.mt4]} onPress={resetValues}/>
            <FormAlertWithSubmitButton_1.default buttonText={translate('common.save')} containerStyles={[styles.m4, styles.mt3, styles.mb5]} onSubmit={saveChanges} enabledWhenOffline/>
        </ScreenWrapper_1.default>);
}
SearchFiltersReportFieldPage.displayName = 'SearchFiltersReportFieldPage';
exports.default = SearchFiltersReportFieldPage;
