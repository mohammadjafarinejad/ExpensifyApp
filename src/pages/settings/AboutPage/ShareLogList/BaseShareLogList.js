"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var HeaderWithBackButton_1 = require("@components/HeaderWithBackButton");
var ScreenWrapper_1 = require("@components/ScreenWrapper");
var SelectionListWithSections_1 = require("@components/SelectionListWithSections");
var UserListItem_1 = require("@components/SelectionListWithSections/UserListItem");
var useLocalize_1 = require("@hooks/useLocalize");
var useNetwork_1 = require("@hooks/useNetwork");
var useOnyx_1 = require("@hooks/useOnyx");
var useSearchSelector_1 = require("@hooks/useSearchSelector");
var Report_1 = require("@libs/actions/Report");
var FileUtils_1 = require("@libs/fileDownload/FileUtils");
var Navigation_1 = require("@libs/Navigation/Navigation");
var OptionsListUtils_1 = require("@libs/OptionsListUtils");
var CONST_1 = require("@src/CONST");
var ONYXKEYS_1 = require("@src/ONYXKEYS");
var ROUTES_1 = require("@src/ROUTES");
function BaseShareLogList(_a) {
    var _b, _c;
    var onAttachLogToReport = _a.onAttachLogToReport;
    var isOffline = (0, useNetwork_1.default)().isOffline;
    var translate = (0, useLocalize_1.default)().translate;
    var isSearchingForReports = (0, useOnyx_1.default)(ONYXKEYS_1.default.IS_SEARCHING_FOR_REPORTS, { initWithStoredValues: false, canBeMissing: true })[0];
    var _d = (0, useOnyx_1.default)(ONYXKEYS_1.default.COUNTRY_CODE, { canBeMissing: false })[0], countryCode = _d === void 0 ? CONST_1.default.DEFAULT_COUNTRY_CODE : _d;
    var _e = (0, useSearchSelector_1.default)({
        selectionMode: CONST_1.default.SEARCH_SELECTOR.SELECTION_MODE_SINGLE,
        searchContext: CONST_1.default.SEARCH_SELECTOR.SEARCH_CONTEXT_SHARE_LOG,
        includeUserToInvite: false,
    }), searchTerm = _e.searchTerm, debouncedSearchTerm = _e.debouncedSearchTerm, setSearchTerm = _e.setSearchTerm, availableOptions = _e.availableOptions, areOptionsInitialized = _e.areOptionsInitialized;
    var sections = (0, react_1.useMemo)(function () {
        if (!areOptionsInitialized) {
            return CONST_1.default.EMPTY_ARRAY;
        }
        var sectionsList = [];
        sectionsList.push({
            title: translate('common.recents'),
            data: availableOptions.recentReports,
            shouldShow: availableOptions.recentReports.length > 0,
        });
        sectionsList.push({
            title: translate('common.contacts'),
            data: availableOptions.personalDetails,
            shouldShow: availableOptions.personalDetails.length > 0,
        });
        if (availableOptions.userToInvite) {
            sectionsList.push({
                title: undefined,
                data: [availableOptions.userToInvite],
                shouldShow: true,
            });
        }
        return sectionsList;
    }, [areOptionsInitialized, translate, availableOptions.recentReports, availableOptions.personalDetails, availableOptions.userToInvite]);
    var headerMessage = (0, react_1.useMemo)(function () {
        var _a, _b;
        if (!areOptionsInitialized) {
            return '';
        }
        return (0, OptionsListUtils_1.getHeaderMessage)((((_a = availableOptions.recentReports) === null || _a === void 0 ? void 0 : _a.length) || 0) + (((_b = availableOptions.personalDetails) === null || _b === void 0 ? void 0 : _b.length) || 0) !== 0, !!availableOptions.userToInvite, debouncedSearchTerm.trim(), countryCode);
    }, [areOptionsInitialized, (_b = availableOptions.personalDetails) === null || _b === void 0 ? void 0 : _b.length, (_c = availableOptions.recentReports) === null || _c === void 0 ? void 0 : _c.length, availableOptions.userToInvite, countryCode, debouncedSearchTerm]);
    var attachLogToReport = function (option) {
        if (!option.reportID) {
            return;
        }
        var filename = (0, FileUtils_1.appendTimeToFileName)('logs.txt');
        onAttachLogToReport(option.reportID, filename);
    };
    (0, react_1.useEffect)(function () {
        (0, Report_1.searchInServer)(debouncedSearchTerm);
    }, [debouncedSearchTerm]);
    return (<ScreenWrapper_1.default testID={BaseShareLogList.displayName} includeSafeAreaPaddingBottom={false}>
            {function (_a) {
            var didScreenTransitionEnd = _a.didScreenTransitionEnd;
            return (<>
                    <HeaderWithBackButton_1.default title={translate('initialSettingsPage.debugConsole.shareLog')} onBackButtonPress={function () { return Navigation_1.default.goBack(ROUTES_1.default.SETTINGS_CONSOLE.getRoute()); }}/>
                    <SelectionListWithSections_1.default ListItem={UserListItem_1.default} sections={sections} onSelectRow={attachLogToReport} shouldSingleExecuteRowSelect onChangeText={setSearchTerm} textInputValue={searchTerm} headerMessage={headerMessage} textInputLabel={translate('selectionList.nameEmailOrPhoneNumber')} textInputHint={isOffline ? "".concat(translate('common.youAppearToBeOffline'), " ").concat(translate('search.resultsAreLimited')) : ''} showLoadingPlaceholder={!didScreenTransitionEnd} isLoadingNewOptions={!!isSearchingForReports}/>
                </>);
        }}
        </ScreenWrapper_1.default>);
}
BaseShareLogList.displayName = 'ShareLogPage';
exports.default = BaseShareLogList;
