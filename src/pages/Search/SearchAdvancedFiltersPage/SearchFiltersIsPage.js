"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_native_1 = require("react-native");
var FixedFooter_1 = require("@components/FixedFooter");
var FullscreenLoadingIndicator_1 = require("@components/FullscreenLoadingIndicator");
var HeaderWithBackButton_1 = require("@components/HeaderWithBackButton");
var ScreenWrapper_1 = require("@components/ScreenWrapper");
var SearchFilterPageFooterButtons_1 = require("@components/Search/SearchFilterPageFooterButtons");
var SelectionListWithSections_1 = require("@components/SelectionListWithSections");
var MultiSelectListItem_1 = require("@components/SelectionListWithSections/MultiSelectListItem");
var useLocalize_1 = require("@hooks/useLocalize");
var useOnyx_1 = require("@hooks/useOnyx");
var useThemeStyles_1 = require("@hooks/useThemeStyles");
var Search_1 = require("@libs/actions/Search");
var Navigation_1 = require("@libs/Navigation/Navigation");
var CONST_1 = require("@src/CONST");
var ONYXKEYS_1 = require("@src/ONYXKEYS");
var ROUTES_1 = require("@src/ROUTES");
function SearchFiltersIsPage() {
    var styles = (0, useThemeStyles_1.default)();
    var translate = (0, useLocalize_1.default)().translate;
    var _a = (0, useOnyx_1.default)(ONYXKEYS_1.default.FORMS.SEARCH_ADVANCED_FILTERS_FORM, { canBeMissing: true }), searchAdvancedFiltersForm = _a[0], searchAdvancedFiltersFormResult = _a[1];
    var _b = (0, react_1.useState)(function () {
        if (!(searchAdvancedFiltersForm === null || searchAdvancedFiltersForm === void 0 ? void 0 : searchAdvancedFiltersForm.is)) {
            return [];
        }
        return searchAdvancedFiltersForm.is;
    }), selectedItems = _b[0], setSelectedItems = _b[1];
    var items = (0, react_1.useMemo)(function () { return [
        { text: translate('common.read'), value: CONST_1.default.SEARCH.IS_VALUES.READ },
        { text: translate('common.unread'), value: CONST_1.default.SEARCH.IS_VALUES.UNREAD },
        { text: translate('common.pinned'), value: CONST_1.default.SEARCH.IS_VALUES.PINNED },
    ]; }, [translate]);
    var listData = (0, react_1.useMemo)(function () {
        return items.map(function (isOption) { return ({
            text: isOption.text,
            keyForList: isOption.value,
            isSelected: selectedItems.includes(isOption.value),
        }); });
    }, [items, selectedItems]);
    var updateSelectedItems = (0, react_1.useCallback)(function (listItem) {
        var _a;
        if (listItem.isSelected) {
            setSelectedItems(selectedItems.filter(function (i) { return i !== listItem.keyForList; }));
            return;
        }
        var newItem = (_a = items.find(function (i) { return i.value === listItem.keyForList; })) === null || _a === void 0 ? void 0 : _a.value;
        if (newItem) {
            setSelectedItems(__spreadArray(__spreadArray([], selectedItems, true), [newItem], false));
        }
    }, [items, selectedItems]);
    var resetChanges = (0, react_1.useCallback)(function () {
        setSelectedItems([]);
    }, []);
    var applyChanges = (0, react_1.useCallback)(function () {
        (0, Search_1.updateAdvancedFilters)({ is: selectedItems });
        Navigation_1.default.goBack(ROUTES_1.default.SEARCH_ADVANCED_FILTERS.getRoute());
    }, [selectedItems]);
    if (searchAdvancedFiltersFormResult.status === 'loading') {
        return <FullscreenLoadingIndicator_1.default />;
    }
    return (<ScreenWrapper_1.default testID={SearchFiltersIsPage.displayName} shouldShowOfflineIndicatorInWideScreen offlineIndicatorStyle={styles.mtAuto} shouldEnableMaxHeight>
            <HeaderWithBackButton_1.default title={translate('search.filters.is')} onBackButtonPress={function () {
            Navigation_1.default.goBack(ROUTES_1.default.SEARCH_ADVANCED_FILTERS.getRoute());
        }}/>
            <react_native_1.View style={[styles.flex1]}>
                <SelectionListWithSections_1.default shouldSingleExecuteRowSelect sections={[{ data: listData }]} ListItem={MultiSelectListItem_1.default} onSelectRow={updateSelectedItems}/>
            </react_native_1.View>
            <FixedFooter_1.default style={styles.mtAuto}>
                <SearchFilterPageFooterButtons_1.default resetChanges={resetChanges} applyChanges={applyChanges}/>
            </FixedFooter_1.default>
        </ScreenWrapper_1.default>);
}
SearchFiltersIsPage.displayName = 'SearchFiltersIsPage';
exports.default = SearchFiltersIsPage;
