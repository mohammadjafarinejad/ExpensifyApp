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
var react_1 = require("react");
var react_native_1 = require("react-native");
var HeaderWithBackButton_1 = require("@components/HeaderWithBackButton");
var ScreenWrapper_1 = require("@components/ScreenWrapper");
var SelectionListWithSections_1 = require("@components/SelectionListWithSections");
var UserListItem_1 = require("@components/SelectionListWithSections/UserListItem");
var useArchivedReportsIdSet_1 = require("@hooks/useArchivedReportsIdSet");
var useLocalize_1 = require("@hooks/useLocalize");
var useNetwork_1 = require("@hooks/useNetwork");
var useOnyx_1 = require("@hooks/useOnyx");
var useSearchSelector_1 = require("@hooks/useSearchSelector");
var useThemeStyles_1 = require("@hooks/useThemeStyles");
var Report_1 = require("@libs/actions/Report");
var types_1 = require("@libs/API/types");
var HttpUtils_1 = require("@libs/HttpUtils");
var Navigation_1 = require("@libs/Navigation/Navigation");
var OptionsListUtils_1 = require("@libs/OptionsListUtils");
var ReportUtils_1 = require("@libs/ReportUtils");
var Task_1 = require("@userActions/Task");
var CONST_1 = require("@src/CONST");
var ONYXKEYS_1 = require("@src/ONYXKEYS");
var ROUTES_1 = require("@src/ROUTES");
var selectReportHandler = function (option) {
    HttpUtils_1.default.cancelPendingRequests(types_1.READ_COMMANDS.SEARCH_FOR_REPORTS);
    var optionItem = option;
    if (!optionItem || !(optionItem === null || optionItem === void 0 ? void 0 : optionItem.reportID)) {
        return;
    }
    (0, Task_1.setShareDestinationValue)(optionItem === null || optionItem === void 0 ? void 0 : optionItem.reportID);
    Navigation_1.default.goBack(ROUTES_1.default.NEW_TASK.getRoute());
};
var reportFilter = function (reportOptions, archivedReportsIDList) {
    return (reportOptions !== null && reportOptions !== void 0 ? reportOptions : []).reduce(function (filtered, option) {
        var report = option.item;
        var isReportArchived = archivedReportsIDList.has("".concat(ONYXKEYS_1.default.COLLECTION.REPORT_NAME_VALUE_PAIRS).concat(report === null || report === void 0 ? void 0 : report.reportID));
        if ((0, ReportUtils_1.canUserPerformWriteAction)(report, isReportArchived) && (0, ReportUtils_1.canCreateTaskInReport)(report) && !(0, ReportUtils_1.isCanceledTaskReport)(report)) {
            filtered.push(option);
        }
        return filtered;
    }, []);
};
function TaskShareDestinationSelectorModal() {
    var _a = (0, react_1.useState)(false), didScreenTransitionEnd = _a[0], setDidScreenTransitionEnd = _a[1];
    var styles = (0, useThemeStyles_1.default)();
    var translate = (0, useLocalize_1.default)().translate;
    var isOffline = (0, useNetwork_1.default)().isOffline;
    var isSearchingForReports = (0, useOnyx_1.default)(ONYXKEYS_1.default.IS_SEARCHING_FOR_REPORTS, { initWithStoredValues: false, canBeMissing: true })[0];
    var _b = (0, useOnyx_1.default)(ONYXKEYS_1.default.COUNTRY_CODE, { canBeMissing: false })[0], countryCode = _b === void 0 ? CONST_1.default.DEFAULT_COUNTRY_CODE : _b;
    var _c = (0, useSearchSelector_1.default)({
        selectionMode: CONST_1.default.SEARCH_SELECTOR.SELECTION_MODE_SINGLE,
        searchContext: CONST_1.default.SEARCH_SELECTOR.SEARCH_CONTEXT_SHARE_DESTINATION,
        includeUserToInvite: false,
        excludeLogins: CONST_1.default.EXPENSIFY_EMAILS_OBJECT,
        shouldInitialize: didScreenTransitionEnd,
        onSingleSelect: selectReportHandler,
    }), searchTerm = _c.searchTerm, setSearchTerm = _c.setSearchTerm, availableOptions = _c.availableOptions, areOptionsInitialized = _c.areOptionsInitialized, onListEndReached = _c.onListEndReached;
    var archivedReportsIdSet = (0, useArchivedReportsIdSet_1.default)();
    var filteredOptions = (0, react_1.useMemo)(function () {
        var filteredReports = reportFilter(availableOptions.recentReports, archivedReportsIdSet);
        return __assign(__assign({}, availableOptions), { recentReports: filteredReports !== null && filteredReports !== void 0 ? filteredReports : [] });
    }, [availableOptions, archivedReportsIdSet]);
    var textInputHint = (0, react_1.useMemo)(function () { return (isOffline ? "".concat(translate('common.youAppearToBeOffline'), " ").concat(translate('search.resultsAreLimited')) : ''); }, [isOffline, translate]);
    var headerMessage = (0, react_1.useMemo)(function () {
        return (0, OptionsListUtils_1.getHeaderMessage)(filteredOptions.recentReports && filteredOptions.recentReports.length !== 0, false, searchTerm, countryCode, false);
    }, [filteredOptions.recentReports, searchTerm, countryCode]);
    var sections = (0, react_1.useMemo)(function () {
        return filteredOptions.recentReports && filteredOptions.recentReports.length > 0
            ? [
                {
                    data: filteredOptions.recentReports.map(function (option) {
                        var _a, _b, _c, _d, _e, _f;
                        return (__assign(__assign({}, option), { text: (_a = option.text) !== null && _a !== void 0 ? _a : '', alternateText: (_b = option.alternateText) !== null && _b !== void 0 ? _b : undefined, keyForList: (_c = option.keyForList) !== null && _c !== void 0 ? _c : '', isDisabled: (_d = option.isDisabled) !== null && _d !== void 0 ? _d : undefined, login: (_e = option.login) !== null && _e !== void 0 ? _e : undefined, shouldShowSubscript: (_f = option.shouldShowSubscript) !== null && _f !== void 0 ? _f : undefined }));
                    }),
                    shouldShow: true,
                },
            ]
            : [];
    }, [filteredOptions.recentReports]);
    (0, react_1.useEffect)(function () {
        (0, Report_1.searchInServer)(searchTerm);
    }, [searchTerm]);
    return (<ScreenWrapper_1.default includeSafeAreaPaddingBottom={false} testID="TaskShareDestinationSelectorModal" onEntryTransitionEnd={function () { return setDidScreenTransitionEnd(true); }}>
            <>
                <HeaderWithBackButton_1.default title={translate('common.share')} onBackButtonPress={function () { return Navigation_1.default.goBack(ROUTES_1.default.NEW_TASK.getRoute()); }}/>
                <react_native_1.View style={[styles.flex1, styles.w100, styles.pRelative]}>
                    <SelectionListWithSections_1.default ListItem={UserListItem_1.default} sections={areOptionsInitialized ? sections : []} onSelectRow={selectReportHandler} shouldSingleExecuteRowSelect onChangeText={setSearchTerm} textInputValue={searchTerm} headerMessage={headerMessage} textInputLabel={translate('selectionList.nameEmailOrPhoneNumber')} showLoadingPlaceholder={areOptionsInitialized && searchTerm.trim() === '' ? false : !didScreenTransitionEnd} isLoadingNewOptions={!!isSearchingForReports} textInputHint={textInputHint} onEndReached={onListEndReached}/>
                </react_native_1.View>
            </>
        </ScreenWrapper_1.default>);
}
TaskShareDestinationSelectorModal.displayName = 'TaskShareDestinationSelectorModal';
exports.default = TaskShareDestinationSelectorModal;
