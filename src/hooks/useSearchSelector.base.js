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
var react_1 = require("react");
var OptionListContextProvider_1 = require("@components/OptionListContextProvider");
var OptionsListUtils_1 = require("@libs/OptionsListUtils");
var CONST_1 = require("@src/CONST");
var ONYXKEYS_1 = require("@src/ONYXKEYS");
var useDebouncedState_1 = require("./useDebouncedState");
var useOnyx_1 = require("./useOnyx");
/**
 * Base hook that provides search functionality with selection logic for option lists.
 * This contains the core logic without platform-specific dependencies.
 */
function useSearchSelectorBase(_a) {
    var selectionMode = _a.selectionMode, _b = _a.maxResultsPerPage, maxResultsPerPage = _b === void 0 ? CONST_1.default.MAX_SELECTION_LIST_PAGE_LENGTH : _b, maxRecentReportsToShow = _a.maxRecentReportsToShow, _c = _a.searchContext, searchContext = _c === void 0 ? 'search' : _c, _d = _a.includeUserToInvite, includeUserToInvite = _d === void 0 ? true : _d, _e = _a.excludeLogins, excludeLogins = _e === void 0 ? CONST_1.default.EMPTY_OBJECT : _e, _f = _a.includeRecentReports, includeRecentReports = _f === void 0 ? false : _f, _g = _a.getValidOptionsConfig, getValidOptionsConfig = _g === void 0 ? CONST_1.default.EMPTY_OBJECT : _g, onSelectionChange = _a.onSelectionChange, onSingleSelect = _a.onSingleSelect, initialSelected = _a.initialSelected, _h = _a.shouldInitialize, shouldInitialize = _h === void 0 ? true : _h, contactOptions = _a.contactOptions;
    var _j = (0, OptionListContextProvider_1.useOptionsList)({
        shouldInitialize: shouldInitialize,
    }), defaultOptions = _j.options, areOptionsInitialized = _j.areOptionsInitialized;
    var optionsWithContacts = (0, react_1.useMemo)(function () {
        if (!(contactOptions === null || contactOptions === void 0 ? void 0 : contactOptions.length) || !areOptionsInitialized) {
            return defaultOptions;
        }
        var personalDetailsWithContacts = defaultOptions.personalDetails.concat(contactOptions);
        return __assign(__assign({}, defaultOptions), { personalDetails: personalDetailsWithContacts });
    }, [areOptionsInitialized, defaultOptions, contactOptions]);
    var betas = (0, useOnyx_1.default)(ONYXKEYS_1.default.BETAS, { canBeMissing: true })[0];
    var _k = (0, useDebouncedState_1.default)(''), searchTerm = _k[0], debouncedSearchTerm = _k[1], setSearchTerm = _k[2];
    var _l = (0, react_1.useState)(initialSelected !== null && initialSelected !== void 0 ? initialSelected : []), selectedOptions = _l[0], setSelectedOptions = _l[1];
    var _m = (0, react_1.useState)(maxResultsPerPage), maxResults = _m[0], setMaxResults = _m[1];
    var _o = (0, useOnyx_1.default)(ONYXKEYS_1.default.COUNTRY_CODE, { canBeMissing: false })[0], countryCode = _o === void 0 ? CONST_1.default.DEFAULT_COUNTRY_CODE : _o;
    var draftComments = (0, useOnyx_1.default)(ONYXKEYS_1.default.COLLECTION.REPORT_DRAFT_COMMENT, { canBeMissing: true })[0];
    var nvpDismissedProductTraining = (0, useOnyx_1.default)(ONYXKEYS_1.default.NVP_DISMISSED_PRODUCT_TRAINING, { canBeMissing: true })[0];
    var onListEndReached = (0, react_1.useCallback)(function () {
        setMaxResults(function (previous) { return previous + maxResultsPerPage; });
    }, [maxResultsPerPage]);
    var computedSearchTerm = (0, react_1.useMemo)(function () {
        return (0, OptionsListUtils_1.getSearchValueForPhoneOrEmail)(debouncedSearchTerm, countryCode);
    }, [debouncedSearchTerm, countryCode]);
    var baseOptions = (0, react_1.useMemo)(function () {
        if (!areOptionsInitialized) {
            return (0, OptionsListUtils_1.getEmptyOptions)();
        }
        switch (searchContext) {
            case CONST_1.default.SEARCH_SELECTOR.SEARCH_CONTEXT_SEARCH:
                return (0, OptionsListUtils_1.getSearchOptions)({
                    options: optionsWithContacts,
                    draftComments: draftComments,
                    nvpDismissedProductTraining: nvpDismissedProductTraining,
                    betas: betas !== null && betas !== void 0 ? betas : [],
                    isUsedInChatFinder: true,
                    includeReadOnly: true,
                    searchQuery: computedSearchTerm,
                    maxResults: maxResults,
                    includeUserToInvite: includeUserToInvite,
                    countryCode: countryCode,
                });
            case CONST_1.default.SEARCH_SELECTOR.SEARCH_CONTEXT_MEMBER_INVITE:
                return (0, OptionsListUtils_1.getValidOptions)(optionsWithContacts, draftComments, nvpDismissedProductTraining, {
                    betas: betas !== null && betas !== void 0 ? betas : [],
                    includeP2P: true,
                    includeSelectedOptions: false,
                    excludeLogins: excludeLogins,
                    includeRecentReports: includeRecentReports,
                    maxElements: maxResults,
                    maxRecentReportElements: maxRecentReportsToShow,
                    searchString: computedSearchTerm,
                    includeUserToInvite: includeUserToInvite,
                });
            case CONST_1.default.SEARCH_SELECTOR.SEARCH_CONTEXT_GENERAL:
                return (0, OptionsListUtils_1.getValidOptions)(optionsWithContacts, draftComments, nvpDismissedProductTraining, __assign(__assign({}, getValidOptionsConfig), { betas: betas !== null && betas !== void 0 ? betas : [], searchString: computedSearchTerm, maxElements: maxResults, maxRecentReportElements: maxRecentReportsToShow, includeUserToInvite: includeUserToInvite, excludeLogins: excludeLogins }));
            case CONST_1.default.SEARCH_SELECTOR.SEARCH_CONTEXT_SHARE_LOG:
                return (0, OptionsListUtils_1.getValidOptions)(optionsWithContacts, draftComments, nvpDismissedProductTraining, {
                    betas: betas,
                    includeMultipleParticipantReports: true,
                    includeP2P: true,
                    forcePolicyNamePreview: true,
                    includeOwnedWorkspaceChats: true,
                    includeSelfDM: true,
                    includeThreads: true,
                    includeReadOnly: false,
                    searchString: computedSearchTerm,
                    maxElements: maxResults,
                    includeUserToInvite: includeUserToInvite,
                }, countryCode);
            case CONST_1.default.SEARCH_SELECTOR.SEARCH_CONTEXT_SHARE_DESTINATION:
                return (0, OptionsListUtils_1.getValidOptions)(optionsWithContacts, draftComments, nvpDismissedProductTraining, {
                    betas: betas,
                    selectedOptions: selectedOptions,
                    includeMultipleParticipantReports: true,
                    showChatPreviewLine: true,
                    forcePolicyNamePreview: true,
                    includeThreads: true,
                    includeMoneyRequests: true,
                    includeTasks: true,
                    excludeLogins: excludeLogins,
                    loginsToExclude: excludeLogins,
                    includeOwnedWorkspaceChats: true,
                    includeSelfDM: true,
                    searchString: computedSearchTerm,
                    maxElements: maxResults,
                    includeUserToInvite: includeUserToInvite,
                });
            default:
                return (0, OptionsListUtils_1.getEmptyOptions)();
        }
    }, [
        areOptionsInitialized,
        searchContext,
        optionsWithContacts,
        draftComments,
        nvpDismissedProductTraining,
        betas,
        computedSearchTerm,
        maxResults,
        includeUserToInvite,
        countryCode,
        excludeLogins,
        includeRecentReports,
        maxRecentReportsToShow,
        getValidOptionsConfig,
        selectedOptions,
    ]);
    var isOptionSelected = (0, react_1.useMemo)(function () {
        return function (option) {
            return selectedOptions.some(function (selected) {
                return (selected.accountID && selected.accountID === option.accountID) || // eslint-disable-line @typescript-eslint/prefer-nullish-coalescing -- this is boolean comparison
                    (selected.reportID && selected.reportID === option.reportID) || // eslint-disable-line @typescript-eslint/prefer-nullish-coalescing -- this is boolean comparison
                    (selected.login && selected.login === option.login);
            });
        };
    }, [selectedOptions]);
    var searchOptions = (0, react_1.useMemo)(function () {
        return __assign(__assign({}, baseOptions), { personalDetails: baseOptions.personalDetails.map(function (option) { return (__assign(__assign({}, option), { isSelected: isOptionSelected(option) })); }), recentReports: baseOptions.recentReports.map(function (option) { return (__assign(__assign({}, option), { isSelected: isOptionSelected(option) })); }), userToInvite: baseOptions.userToInvite
                ? __assign(__assign({}, baseOptions.userToInvite), { isSelected: isOptionSelected(baseOptions.userToInvite) }) : null });
    }, [baseOptions, isOptionSelected]);
    var availableOptions = (0, react_1.useMemo)(function () {
        var _a;
        var unselectedRecentReports = searchOptions.recentReports.filter(function (option) { return !option.isSelected; });
        // Filter out people who appear in recent reports from personal details (recents take priority)
        var recentReportLogins = new Set(unselectedRecentReports.map(function (option) { return option.login; }).filter(Boolean));
        var unselectedPersonalDetails = searchOptions.personalDetails.filter(function (option) { return !option.isSelected && !recentReportLogins.has(option.login); });
        return __assign(__assign({}, searchOptions), { personalDetails: unselectedPersonalDetails, recentReports: unselectedRecentReports, userToInvite: ((_a = searchOptions.userToInvite) === null || _a === void 0 ? void 0 : _a.isSelected) ? null : searchOptions.userToInvite });
    }, [searchOptions]);
    /**
     * Toggle selection state of option based on selection mode
     */
    var toggleSelection = (0, react_1.useCallback)(function (option) {
        if (selectionMode === CONST_1.default.SEARCH_SELECTOR.SELECTION_MODE_SINGLE) {
            onSingleSelect === null || onSingleSelect === void 0 ? void 0 : onSingleSelect(option);
            return;
        }
        var isSelected = selectedOptions.some(function (selected) {
            return (selected.accountID && selected.accountID === option.accountID) || // eslint-disable-line @typescript-eslint/prefer-nullish-coalescing -- this is boolean comparison
                (selected.reportID && selected.reportID === option.reportID) || // eslint-disable-line @typescript-eslint/prefer-nullish-coalescing -- this is boolean comparison
                (selected.login && selected.login === option.login);
        });
        var newSelected = isSelected
            ? selectedOptions.filter(function (selected) {
                return !((selected.accountID && selected.accountID === option.accountID) || // eslint-disable-line @typescript-eslint/prefer-nullish-coalescing -- this is boolean comparison
                    (selected.reportID && selected.reportID === option.reportID) || // eslint-disable-line @typescript-eslint/prefer-nullish-coalescing -- this is boolean comparison
                    (selected.login && selected.login === option.login));
            })
            : __spreadArray(__spreadArray([], selectedOptions, true), [__assign(__assign({}, option), { isSelected: true })], false);
        setSelectedOptions(newSelected);
        onSelectionChange === null || onSelectionChange === void 0 ? void 0 : onSelectionChange(newSelected);
    }, [selectedOptions, selectionMode, onSelectionChange, onSingleSelect]);
    var selectedOptionsForDisplay = (0, react_1.useMemo)(function () {
        return selectedOptions.filter(function (option) {
            var _a, _b;
            return !!((_a = option.text) === null || _a === void 0 ? void 0 : _a.toLowerCase().includes(computedSearchTerm)) || !!((_b = option.login) === null || _b === void 0 ? void 0 : _b.toLowerCase().includes(computedSearchTerm));
        });
    }, [selectedOptions, computedSearchTerm]);
    return {
        searchTerm: searchTerm,
        debouncedSearchTerm: debouncedSearchTerm,
        setSearchTerm: setSearchTerm,
        searchOptions: searchOptions,
        availableOptions: availableOptions,
        selectedOptions: selectedOptions,
        setSelectedOptions: setSelectedOptions,
        toggleSelection: toggleSelection,
        areOptionsInitialized: areOptionsInitialized,
        contactState: undefined,
        onListEndReached: onListEndReached,
        selectedOptionsForDisplay: selectedOptionsForDisplay,
    };
}
exports.default = useSearchSelectorBase;
