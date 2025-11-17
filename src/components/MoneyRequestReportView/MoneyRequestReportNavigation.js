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
var PrevNextButtons_1 = require("@components/PrevNextButtons");
var Text_1 = require("@components/Text");
var useArchivedReportsIdSet_1 = require("@hooks/useArchivedReportsIdSet");
var useCurrentUserPersonalDetails_1 = require("@hooks/useCurrentUserPersonalDetails");
var useLocalize_1 = require("@hooks/useLocalize");
var useOnyx_1 = require("@hooks/useOnyx");
var useThemeStyles_1 = require("@hooks/useThemeStyles");
var ReportUtils_1 = require("@libs/ReportUtils");
var SearchUIUtils_1 = require("@libs/SearchUIUtils");
var Navigation_1 = require("@navigation/Navigation");
var ReportNavigation_1 = require("@userActions/ReportNavigation");
var Search_1 = require("@userActions/Search");
var CONST_1 = require("@src/CONST");
var ONYXKEYS_1 = require("@src/ONYXKEYS");
var ReportMetaData_1 = require("@src/selectors/ReportMetaData");
function MoneyRequestReportNavigation(_a) {
    var _b, _c, _d, _e;
    var reportID = _a.reportID, shouldDisplayNarrowVersion = _a.shouldDisplayNarrowVersion;
    var lastSearchQuery = (0, useOnyx_1.default)(ONYXKEYS_1.default.REPORT_NAVIGATION_LAST_SEARCH_QUERY, { canBeMissing: true })[0];
    var currentSearchResults = (0, useOnyx_1.default)("".concat(ONYXKEYS_1.default.COLLECTION.SNAPSHOT).concat((_b = lastSearchQuery === null || lastSearchQuery === void 0 ? void 0 : lastSearchQuery.queryJSON) === null || _b === void 0 ? void 0 : _b.hash), { canBeMissing: true })[0];
    var currentUserDetails = (0, useCurrentUserPersonalDetails_1.default)();
    var _f = (0, useLocalize_1.default)(), localeCompare = _f.localeCompare, formatPhoneNumber = _f.formatPhoneNumber;
    var _g = (0, useOnyx_1.default)("".concat(ONYXKEYS_1.default.COLLECTION.REPORT_METADATA), { canBeMissing: true, selector: ReportMetaData_1.isActionLoadingSetSelector })[0], isActionLoadingSet = _g === void 0 ? new Set() : _g;
    var exportReportActions = (0, useOnyx_1.default)(ONYXKEYS_1.default.COLLECTION.REPORT_ACTIONS, {
        canEvict: false,
        canBeMissing: true,
        selector: ReportUtils_1.selectFilteredReportActions,
    })[0];
    var archivedReportsIdSet = (0, useArchivedReportsIdSet_1.default)();
    var _h = (_c = lastSearchQuery === null || lastSearchQuery === void 0 ? void 0 : lastSearchQuery.queryJSON) !== null && _c !== void 0 ? _c : {}, type = _h.type, status = _h.status, sortBy = _h.sortBy, sortOrder = _h.sortOrder, groupBy = _h.groupBy;
    var results = [];
    if (!!type && !!(currentSearchResults === null || currentSearchResults === void 0 ? void 0 : currentSearchResults.data) && !!(currentSearchResults === null || currentSearchResults === void 0 ? void 0 : currentSearchResults.search)) {
        var searchData = (0, SearchUIUtils_1.getSections)({
            type: type,
            data: currentSearchResults.data,
            currentAccountID: currentUserDetails.accountID,
            currentUserEmail: (_d = currentUserDetails.email) !== null && _d !== void 0 ? _d : '',
            formatPhoneNumber: formatPhoneNumber,
            groupBy: groupBy,
            reportActions: exportReportActions,
            currentSearch: lastSearchQuery === null || lastSearchQuery === void 0 ? void 0 : lastSearchQuery.searchKey,
            archivedReportsIDList: archivedReportsIdSet,
            isActionLoadingSet: isActionLoadingSet,
        });
        results = (0, SearchUIUtils_1.getSortedSections)(type, status !== null && status !== void 0 ? status : '', searchData, localeCompare, sortBy, sortOrder, groupBy).map(function (value) { return value.reportID; });
    }
    var allReports = results;
    var currentIndex = allReports.indexOf(reportID);
    var allReportsCount = (_e = lastSearchQuery === null || lastSearchQuery === void 0 ? void 0 : lastSearchQuery.previousLengthOfResults) !== null && _e !== void 0 ? _e : 0;
    var hideNextButton = !(lastSearchQuery === null || lastSearchQuery === void 0 ? void 0 : lastSearchQuery.hasMoreResults) && currentIndex === allReports.length - 1;
    var hidePrevButton = currentIndex === 0;
    var styles = (0, useThemeStyles_1.default)();
    var isChatSearch = type === CONST_1.default.SEARCH.DATA_TYPES.CHAT;
    var shouldDisplayNavigationArrows = !isChatSearch && allReports && allReports.length > 1 && currentIndex !== -1 && !!(lastSearchQuery === null || lastSearchQuery === void 0 ? void 0 : lastSearchQuery.queryJSON);
    (0, react_1.useEffect)(function () {
        if (!(lastSearchQuery === null || lastSearchQuery === void 0 ? void 0 : lastSearchQuery.queryJSON)) {
            return;
        }
        if (lastSearchQuery.allowPostSearchRecount) {
            (0, ReportNavigation_1.saveLastSearchParams)(__assign(__assign({}, lastSearchQuery), { allowPostSearchRecount: false, previousLengthOfResults: allReports.length }));
            return;
        }
        if (currentIndex < allReportsCount - 1) {
            return;
        }
        (0, ReportNavigation_1.saveLastSearchParams)(__assign(__assign({}, lastSearchQuery), { previousLengthOfResults: allReports.length }));
    }, [currentIndex, allReportsCount, allReports.length, lastSearchQuery === null || lastSearchQuery === void 0 ? void 0 : lastSearchQuery.queryJSON, lastSearchQuery]);
    var goToReportId = function (reportId) {
        if (!reportId) {
            return;
        }
        Navigation_1.default.setParams({
            reportID: reportId,
        });
    };
    var goToNextReport = function () {
        var _a;
        if (currentIndex === -1 || allReports.length === 0 || !(lastSearchQuery === null || lastSearchQuery === void 0 ? void 0 : lastSearchQuery.queryJSON)) {
            return;
        }
        var threshold = Math.min(allReports.length * 0.75, allReports.length - 2);
        if (currentIndex + 1 >= threshold && (lastSearchQuery === null || lastSearchQuery === void 0 ? void 0 : lastSearchQuery.hasMoreResults)) {
            var newOffset = ((_a = lastSearchQuery.offset) !== null && _a !== void 0 ? _a : 0) + CONST_1.default.SEARCH.RESULTS_PAGE_SIZE;
            (0, Search_1.search)({
                queryJSON: lastSearchQuery.queryJSON,
                offset: newOffset,
                prevReportsLength: allReports.length,
                shouldCalculateTotals: false,
                searchKey: lastSearchQuery.searchKey,
            });
        }
        var nextIndex = (currentIndex + 1) % allReports.length;
        goToReportId(allReports.at(nextIndex));
    };
    var goToPrevReport = function () {
        if (currentIndex === -1 || allReports.length === 0) {
            return;
        }
        var prevIndex = (currentIndex - 1) % allReports.length;
        goToReportId(allReports.at(prevIndex));
    };
    return (shouldDisplayNavigationArrows && (<react_native_1.View style={[styles.flexRow, styles.alignItemsCenter, styles.gap2]}>
                {!shouldDisplayNarrowVersion && <Text_1.default style={styles.mutedTextLabel}>{"".concat(currentIndex + 1, " of ").concat(allReportsCount)}</Text_1.default>}
                <PrevNextButtons_1.default isPrevButtonDisabled={hidePrevButton} isNextButtonDisabled={hideNextButton} onNext={goToNextReport} onPrevious={goToPrevReport}/>
            </react_native_1.View>));
}
MoneyRequestReportNavigation.displayName = 'MoneyRequestReportNavigation';
exports.default = MoneyRequestReportNavigation;
