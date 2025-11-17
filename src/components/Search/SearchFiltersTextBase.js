"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var HeaderWithBackButton_1 = require("@components/HeaderWithBackButton");
var ScreenWrapper_1 = require("@components/ScreenWrapper");
var useLocalize_1 = require("@hooks/useLocalize");
var useThemeStyles_1 = require("@hooks/useThemeStyles");
var Search_1 = require("@libs/actions/Search");
var Navigation_1 = require("@libs/Navigation/Navigation");
var CONST_1 = require("@src/CONST");
var ROUTES_1 = require("@src/ROUTES");
var TextFilterBase_1 = require("./FilterComponents/TextFilterBase");
function SearchFiltersTextBase(_a) {
    var filterKey = _a.filterKey, titleKey = _a.titleKey, testID = _a.testID, _b = _a.characterLimit, characterLimit = _b === void 0 ? CONST_1.default.MERCHANT_NAME_MAX_BYTES : _b;
    var styles = (0, useThemeStyles_1.default)();
    var translate = (0, useLocalize_1.default)().translate;
    var updateFilter = function (values) {
        (0, Search_1.updateAdvancedFilters)(values);
        Navigation_1.default.goBack(ROUTES_1.default.SEARCH_ADVANCED_FILTERS.getRoute());
    };
    return (<ScreenWrapper_1.default testID={testID} shouldShowOfflineIndicatorInWideScreen offlineIndicatorStyle={styles.mtAuto} includeSafeAreaPaddingBottom shouldEnableMaxHeight>
            <HeaderWithBackButton_1.default title={translate(titleKey)} onBackButtonPress={function () {
            Navigation_1.default.goBack(ROUTES_1.default.SEARCH_ADVANCED_FILTERS.getRoute());
        }}/>
            <TextFilterBase_1.default filterKey={filterKey} onSubmit={updateFilter} title={translate(titleKey)} characterLimit={characterLimit}/>
        </ScreenWrapper_1.default>);
}
SearchFiltersTextBase.displayName = 'SearchFiltersTextBase';
exports.default = SearchFiltersTextBase;
