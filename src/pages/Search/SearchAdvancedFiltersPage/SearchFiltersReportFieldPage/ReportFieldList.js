"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_native_1 = require("react-native");
var FixedFooter_1 = require("@components/FixedFooter");
var HeaderWithBackButton_1 = require("@components/HeaderWithBackButton");
var SearchFilterPageFooterButtons_1 = require("@components/Search/SearchFilterPageFooterButtons");
var SelectionList_1 = require("@components/SelectionList");
var SingleSelectListItem_1 = require("@components/SelectionListWithSections/SingleSelectListItem");
var useOnyx_1 = require("@hooks/useOnyx");
var useThemeStyles_1 = require("@hooks/useThemeStyles");
var Search_1 = require("@libs/actions/Search");
var CONST_1 = require("@src/CONST");
var ONYXKEYS_1 = require("@src/ONYXKEYS");
function ReportFieldList(_a) {
    var field = _a.field, close = _a.close;
    var formKey = "".concat(CONST_1.default.SEARCH.REPORT_FIELD.DEFAULT_PREFIX).concat(field.name.toLowerCase().replaceAll(' ', '-'));
    var formSelector = (0, react_1.useCallback)(function (form) { return form === null || form === void 0 ? void 0 : form[formKey]; }, [formKey]);
    var _b = (0, useOnyx_1.default)(ONYXKEYS_1.default.FORMS.SEARCH_ADVANCED_FILTERS_FORM, { canBeMissing: true, selector: formSelector }, [formKey])[0], value = _b === void 0 ? null : _b;
    var styles = (0, useThemeStyles_1.default)();
    var _c = (0, react_1.useState)(value), selectedItem = _c[0], setSelectedItem = _c[1];
    var items = (0, react_1.useMemo)(function () {
        return field.values.map(function (fieldValue) { return ({
            value: fieldValue,
            text: fieldValue,
            keyForList: fieldValue,
            isSelected: selectedItem === fieldValue,
        }); });
    }, [field.values, selectedItem]);
    var updateFilter = (0, react_1.useCallback)(function (selectedFilter) {
        var newValue = selectedFilter.isSelected ? null : selectedFilter.value;
        setSelectedItem(newValue);
    }, []);
    var resetChanges = (0, react_1.useCallback)(function () {
        setSelectedItem(null);
    }, []);
    var saveChanges = (0, react_1.useCallback)(function () {
        var _a;
        (0, Search_1.updateAdvancedFilters)((_a = {},
            _a[formKey] = selectedItem !== null && selectedItem !== void 0 ? selectedItem : null,
            _a));
        close();
    }, [formKey, selectedItem, close]);
    return (<>
            <HeaderWithBackButton_1.default title={field.name} onBackButtonPress={close}/>
            <react_native_1.View style={[styles.flex1]}>
                <SelectionList_1.default shouldSingleExecuteRowSelect data={items} ListItem={SingleSelectListItem_1.default} onSelectRow={updateFilter}/>
            </react_native_1.View>
            <FixedFooter_1.default style={styles.mtAuto}>
                <SearchFilterPageFooterButtons_1.default applyChanges={saveChanges} resetChanges={resetChanges}/>
            </FixedFooter_1.default>
        </>);
}
ReportFieldList.displayName = 'SearchFiltersReportFieldPage';
exports.default = ReportFieldList;
