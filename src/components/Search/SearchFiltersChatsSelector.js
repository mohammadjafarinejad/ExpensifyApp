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
var Attributes_1 = require("@selectors/Attributes");
var react_1 = require("react");
var OnyxListItemProvider_1 = require("@components/OnyxListItemProvider");
var OptionListContextProvider_1 = require("@components/OptionListContextProvider");
var SelectionListWithSections_1 = require("@components/SelectionListWithSections");
var InviteMemberListItem_1 = require("@components/SelectionListWithSections/InviteMemberListItem");
var useArchivedReportsIdSet_1 = require("@hooks/useArchivedReportsIdSet");
var useDebouncedState_1 = require("@hooks/useDebouncedState");
var useLocalize_1 = require("@hooks/useLocalize");
var useOnyx_1 = require("@hooks/useOnyx");
var useScreenWrapperTransitionStatus_1 = require("@hooks/useScreenWrapperTransitionStatus");
var DeviceCapabilities_1 = require("@libs/DeviceCapabilities");
var OptionsListUtils_1 = require("@libs/OptionsListUtils");
var Navigation_1 = require("@navigation/Navigation");
var Report_1 = require("@userActions/Report");
var CONST_1 = require("@src/CONST");
var ONYXKEYS_1 = require("@src/ONYXKEYS");
var ROUTES_1 = require("@src/ROUTES");
var SearchFilterPageFooterButtons_1 = require("./SearchFilterPageFooterButtons");
var defaultListOptions = {
    recentReports: [],
    personalDetails: [],
    userToInvite: null,
    currentUserOption: null,
    headerMessage: '',
};
function getSelectedOptionData(option) {
    var _a;
    // eslint-disable-next-line rulesdir/no-default-id-values
    return __assign(__assign({}, option), { isSelected: true, reportID: (_a = option.reportID) !== null && _a !== void 0 ? _a : '-1' });
}
function SearchFiltersChatsSelector(_a) {
    var initialReportIDs = _a.initialReportIDs, onFiltersUpdate = _a.onFiltersUpdate, isScreenTransitionEnd = _a.isScreenTransitionEnd;
    var translate = (0, useLocalize_1.default)().translate;
    var personalDetails = (0, OnyxListItemProvider_1.usePersonalDetails)();
    var didScreenTransitionEnd = (0, useScreenWrapperTransitionStatus_1.default)().didScreenTransitionEnd;
    var _b = (0, OptionListContextProvider_1.useOptionsList)({
        shouldInitialize: didScreenTransitionEnd,
    }), options = _b.options, areOptionsInitialized = _b.areOptionsInitialized;
    var reports = (0, useOnyx_1.default)(ONYXKEYS_1.default.COLLECTION.REPORT, { canBeMissing: true })[0];
    var _c = (0, useOnyx_1.default)(ONYXKEYS_1.default.COUNTRY_CODE, { canBeMissing: false })[0], countryCode = _c === void 0 ? CONST_1.default.DEFAULT_COUNTRY_CODE : _c;
    var isSearchingForReports = (0, useOnyx_1.default)(ONYXKEYS_1.default.IS_SEARCHING_FOR_REPORTS, { initWithStoredValues: false, canBeMissing: true })[0];
    var reportAttributesDerived = (0, useOnyx_1.default)(ONYXKEYS_1.default.DERIVED.REPORT_ATTRIBUTES, { canBeMissing: true, selector: Attributes_1.default })[0];
    var _d = (0, react_1.useState)(initialReportIDs), selectedReportIDs = _d[0], setSelectedReportIDs = _d[1];
    var _e = (0, useDebouncedState_1.default)(''), searchTerm = _e[0], debouncedSearchTerm = _e[1], setSearchTerm = _e[2];
    var cleanSearchTerm = (0, react_1.useMemo)(function () { return searchTerm.trim().toLowerCase(); }, [searchTerm]);
    var draftComments = (0, useOnyx_1.default)(ONYXKEYS_1.default.COLLECTION.REPORT_DRAFT_COMMENT, { canBeMissing: true })[0];
    var archivedReportsIdSet = (0, useArchivedReportsIdSet_1.default)();
    var nvpDismissedProductTraining = (0, useOnyx_1.default)(ONYXKEYS_1.default.NVP_DISMISSED_PRODUCT_TRAINING, { canBeMissing: true })[0];
    var selectedOptions = (0, react_1.useMemo)(function () {
        return selectedReportIDs.map(function (id) {
            var report = getSelectedOptionData((0, OptionsListUtils_1.createOptionFromReport)(__assign(__assign({}, reports === null || reports === void 0 ? void 0 : reports["".concat(ONYXKEYS_1.default.COLLECTION.REPORT).concat(id)]), { reportID: id }), personalDetails, reportAttributesDerived));
            var isReportArchived = archivedReportsIdSet.has("".concat(ONYXKEYS_1.default.COLLECTION.REPORT_NAME_VALUE_PAIRS).concat(report.reportID));
            var alternateText = (0, OptionsListUtils_1.getAlternateText)(report, {}, isReportArchived, {});
            return __assign(__assign({}, report), { alternateText: alternateText });
        });
    }, [archivedReportsIdSet, personalDetails, reportAttributesDerived, reports, selectedReportIDs]);
    var defaultOptions = (0, react_1.useMemo)(function () {
        if (!areOptionsInitialized || !isScreenTransitionEnd) {
            return defaultListOptions;
        }
        return (0, OptionsListUtils_1.getSearchOptions)({ options: options, draftComments: draftComments, nvpDismissedProductTraining: nvpDismissedProductTraining, betas: undefined, isUsedInChatFinder: false, countryCode: countryCode });
    }, [areOptionsInitialized, draftComments, nvpDismissedProductTraining, isScreenTransitionEnd, options, countryCode]);
    var chatOptions = (0, react_1.useMemo)(function () {
        return (0, OptionsListUtils_1.filterAndOrderOptions)(defaultOptions, cleanSearchTerm, countryCode, {
            selectedOptions: selectedOptions,
            excludeLogins: CONST_1.default.EXPENSIFY_EMAILS_OBJECT,
        });
    }, [defaultOptions, cleanSearchTerm, selectedOptions, countryCode]);
    var _f = (0, react_1.useMemo)(function () {
        var newSections = [];
        if (!areOptionsInitialized) {
            return { sections: [], headerMessage: undefined };
        }
        var formattedResults = (0, OptionsListUtils_1.formatSectionsFromSearchTerm)(cleanSearchTerm, selectedOptions, chatOptions.recentReports, chatOptions.personalDetails, personalDetails, false, undefined, reportAttributesDerived);
        newSections.push(formattedResults.section);
        var visibleReportsWhenSearchTermNonEmpty = chatOptions.recentReports.map(function (report) { return (selectedReportIDs.includes(report.reportID) ? getSelectedOptionData(report) : report); });
        var visibleReportsWhenSearchTermEmpty = chatOptions.recentReports.filter(function (report) { return !selectedReportIDs.includes(report.reportID); });
        var reportsFiltered = cleanSearchTerm === '' ? visibleReportsWhenSearchTermEmpty : visibleReportsWhenSearchTermNonEmpty;
        newSections.push({
            title: undefined,
            data: reportsFiltered,
            shouldShow: chatOptions.recentReports.length > 0,
        });
        var areResultsFound = didScreenTransitionEnd && formattedResults.section.data.length === 0 && reportsFiltered.length === 0;
        var message = areResultsFound ? translate('common.noResultsFound') : undefined;
        return {
            sections: newSections,
            headerMessage: message,
        };
    }, [
        areOptionsInitialized,
        chatOptions.personalDetails,
        chatOptions.recentReports,
        cleanSearchTerm,
        didScreenTransitionEnd,
        personalDetails,
        reportAttributesDerived,
        selectedOptions,
        selectedReportIDs,
        translate,
    ]), sections = _f.sections, headerMessage = _f.headerMessage;
    (0, react_1.useEffect)(function () {
        (0, Report_1.searchInServer)(debouncedSearchTerm.trim());
    }, [debouncedSearchTerm]);
    var handleParticipantSelection = (0, react_1.useCallback)(function (selectedOption) {
        var optionReportID = selectedOption.reportID;
        if (!optionReportID) {
            return;
        }
        var foundOptionIndex = selectedReportIDs.findIndex(function (reportID) {
            return reportID && reportID !== '' && selectedOption.reportID === reportID;
        });
        if (foundOptionIndex < 0) {
            setSelectedReportIDs(__spreadArray(__spreadArray([], selectedReportIDs, true), [optionReportID], false));
        }
        else {
            var newSelectedReports = __spreadArray(__spreadArray([], selectedReportIDs.slice(0, foundOptionIndex), true), selectedReportIDs.slice(foundOptionIndex + 1), true);
            setSelectedReportIDs(newSelectedReports);
        }
    }, [selectedReportIDs]);
    var applyChanges = (0, react_1.useCallback)(function () {
        onFiltersUpdate(selectedReportIDs);
        Navigation_1.default.goBack(ROUTES_1.default.SEARCH_ADVANCED_FILTERS.getRoute());
    }, [onFiltersUpdate, selectedReportIDs]);
    var resetChanges = (0, react_1.useCallback)(function () {
        setSelectedReportIDs([]);
    }, []);
    var footerContent = (0, react_1.useMemo)(function () { return (<SearchFilterPageFooterButtons_1.default applyChanges={applyChanges} resetChanges={resetChanges}/>); }, [resetChanges, applyChanges]);
    var isLoadingNewOptions = !!isSearchingForReports;
    var showLoadingPlaceholder = !didScreenTransitionEnd || !areOptionsInitialized || !initialReportIDs || !personalDetails;
    return (<SelectionListWithSections_1.default canSelectMultiple sections={sections} ListItem={InviteMemberListItem_1.default} textInputLabel={translate('selectionList.nameEmailOrPhoneNumber')} headerMessage={headerMessage} textInputValue={searchTerm} footerContent={footerContent} showScrollIndicator shouldPreventDefaultFocusOnSelectRow={!(0, DeviceCapabilities_1.canUseTouchScreen)()} onChangeText={function (value) {
            setSearchTerm(value);
        }} onSelectRow={handleParticipantSelection} isLoadingNewOptions={isLoadingNewOptions} showLoadingPlaceholder={showLoadingPlaceholder}/>);
}
SearchFiltersChatsSelector.displayName = 'SearchFiltersChatsSelector';
exports.default = SearchFiltersChatsSelector;
