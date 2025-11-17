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
var native_1 = require("@react-navigation/native");
var Account_1 = require("@selectors/Account");
var Session_1 = require("@selectors/Session");
var Snapshot_1 = require("@selectors/Snapshot");
var react_1 = require("react");
var react_native_1 = require("react-native");
var Button_1 = require("@components/Button");
var ButtonWithDropdownMenu_1 = require("@components/ButtonWithDropdownMenu");
var Expensicons = require("@components/Icon/Expensicons");
var KYCWall_1 = require("@components/KYCWall");
var KYCWallContext_1 = require("@components/KYCWall/KYCWallContext");
var LockedAccountModalProvider_1 = require("@components/LockedAccountModalProvider");
var OnyxListItemProvider_1 = require("@components/OnyxListItemProvider");
var ScrollView_1 = require("@components/ScrollView");
var DateSelectPopup_1 = require("@components/Search/FilterDropdowns/DateSelectPopup");
var DropdownButton_1 = require("@components/Search/FilterDropdowns/DropdownButton");
var MultiSelectPopup_1 = require("@components/Search/FilterDropdowns/MultiSelectPopup");
var SingleSelectPopup_1 = require("@components/Search/FilterDropdowns/SingleSelectPopup");
var UserSelectPopup_1 = require("@components/Search/FilterDropdowns/UserSelectPopup");
var SearchContext_1 = require("@components/Search/SearchContext");
var SearchFiltersSkeleton_1 = require("@components/Skeletons/SearchFiltersSkeleton");
var useAdvancedSearchFilters_1 = require("@hooks/useAdvancedSearchFilters");
var useCurrentUserPersonalDetails_1 = require("@hooks/useCurrentUserPersonalDetails");
var useLocalize_1 = require("@hooks/useLocalize");
var useNetwork_1 = require("@hooks/useNetwork");
var useOnyx_1 = require("@hooks/useOnyx");
var usePolicy_1 = require("@hooks/usePolicy");
var useResponsiveLayout_1 = require("@hooks/useResponsiveLayout");
var useTheme_1 = require("@hooks/useTheme");
var useThemeStyles_1 = require("@hooks/useThemeStyles");
var Modal_1 = require("@libs/actions/Modal");
var Search_1 = require("@libs/actions/Search");
var CardUtils_1 = require("@libs/CardUtils");
var DateUtils_1 = require("@libs/DateUtils");
var Navigation_1 = require("@libs/Navigation/Navigation");
var PersonalDetailsUtils_1 = require("@libs/PersonalDetailsUtils");
var PolicyUtils_1 = require("@libs/PolicyUtils");
var ReportUtils_1 = require("@libs/ReportUtils");
var SearchQueryUtils_1 = require("@libs/SearchQueryUtils");
var SearchUIUtils_1 = require("@libs/SearchUIUtils");
var CONST_1 = require("@src/CONST");
var ONYXKEYS_1 = require("@src/ONYXKEYS");
var ROUTES_1 = require("@src/ROUTES");
var SearchAdvancedFiltersForm_1 = require("@src/types/form/SearchAdvancedFiltersForm");
var EmptyObject_1 = require("@src/types/utils/EmptyObject");
function SearchFiltersBar(_a) {
    var queryJSON = _a.queryJSON, headerButtonsOptions = _a.headerButtonsOptions, isMobileSelectionModeEnabled = _a.isMobileSelectionModeEnabled, currentSelectedPolicyID = _a.currentSelectedPolicyID, currentSelectedReportID = _a.currentSelectedReportID, confirmPayment = _a.confirmPayment, latestBankItems = _a.latestBankItems;
    var isFocused = (0, native_1.useIsFocused)();
    var scrollRef = (0, react_1.useRef)(null);
    var currentPolicy = (0, usePolicy_1.default)(currentSelectedPolicyID);
    var isUserValidated = (0, useOnyx_1.default)(ONYXKEYS_1.default.ACCOUNT, { selector: Account_1.isUserValidatedSelector, canBeMissing: true })[0];
    // type, groupBy and status values are not guaranteed to respect the ts type as they come from user input
    var hash = queryJSON.hash, unsafeType = queryJSON.type, unsafeGroupBy = queryJSON.groupBy, unsafeStatus = queryJSON.status, flatFilters = queryJSON.flatFilters;
    var selectedIOUReport = (0, useOnyx_1.default)("".concat(ONYXKEYS_1.default.COLLECTION.REPORT).concat(currentSelectedReportID), { canBeMissing: true })[0];
    var isCurrentSelectedExpenseReport = (0, ReportUtils_1.isExpenseReport)(currentSelectedReportID);
    var theme = (0, useTheme_1.default)();
    var styles = (0, useThemeStyles_1.default)();
    var _b = (0, useLocalize_1.default)(), translate = _b.translate, localeCompare = _b.localeCompare;
    var kycWallRef = (0, react_1.useContext)(KYCWallContext_1.KYCWallContext);
    var isOffline = (0, useNetwork_1.default)().isOffline;
    var personalDetails = (0, OnyxListItemProvider_1.usePersonalDetails)();
    var shouldUseNarrowLayout = (0, useResponsiveLayout_1.default)().shouldUseNarrowLayout;
    var _c = (0, SearchContext_1.useSearchContext)(), selectedTransactions = _c.selectedTransactions, selectAllMatchingItems = _c.selectAllMatchingItems, areAllMatchingItemsSelected = _c.areAllMatchingItemsSelected, showSelectAllMatchingItems = _c.showSelectAllMatchingItems, shouldShowFiltersBarLoading = _c.shouldShowFiltersBarLoading;
    var email = (0, useOnyx_1.default)(ONYXKEYS_1.default.SESSION, { canBeMissing: true, selector: Session_1.emailSelector })[0];
    var userCardList = (0, useOnyx_1.default)(ONYXKEYS_1.default.CARD_LIST, { canBeMissing: true })[0];
    var reports = (0, useOnyx_1.default)(ONYXKEYS_1.default.COLLECTION.REPORT, { canBeMissing: false })[0];
    var allPolicies = (0, useOnyx_1.default)(ONYXKEYS_1.default.COLLECTION.POLICY, { canBeMissing: true })[0];
    var _d = (0, useOnyx_1.default)(ONYXKEYS_1.default.CURRENCY_LIST, { canBeMissing: true })[0], currencyList = _d === void 0 ? (0, EmptyObject_1.getEmptyObject)() : _d;
    var policyTagsLists = (0, useOnyx_1.default)(ONYXKEYS_1.default.COLLECTION.POLICY_TAGS, { canBeMissing: true })[0];
    var policyCategories = (0, useOnyx_1.default)(ONYXKEYS_1.default.COLLECTION.POLICY_CATEGORIES, { canBeMissing: true })[0];
    var workspaceCardFeeds = (0, useOnyx_1.default)(ONYXKEYS_1.default.COLLECTION.WORKSPACE_CARDS_LIST, { canBeMissing: true })[0];
    var allFeeds = (0, useOnyx_1.default)(ONYXKEYS_1.default.COLLECTION.SHARED_NVP_PRIVATE_DOMAIN_MEMBER, { canBeMissing: true })[0];
    var _e = (0, react_1.useContext)(LockedAccountModalProvider_1.LockedAccountContext), isAccountLocked = _e.isAccountLocked, showLockedAccountModal = _e.showLockedAccountModal;
    var searchResultsErrors = (0, useOnyx_1.default)("".concat(ONYXKEYS_1.default.COLLECTION.SNAPSHOT).concat(hash), { canBeMissing: true, selector: Snapshot_1.searchResultsErrorSelector })[0];
    var taxRates = (0, PolicyUtils_1.getAllTaxRates)();
    var allCards = (0, react_1.useMemo)(function () { return (0, CardUtils_1.mergeCardListWithWorkspaceFeeds)(workspaceCardFeeds !== null && workspaceCardFeeds !== void 0 ? workspaceCardFeeds : CONST_1.default.EMPTY_OBJECT, userCardList); }, [userCardList, workspaceCardFeeds]);
    var selectedTransactionsKeys = (0, react_1.useMemo)(function () { return Object.keys(selectedTransactions !== null && selectedTransactions !== void 0 ? selectedTransactions : {}); }, [selectedTransactions]);
    var hasMultipleOutputCurrency = (0, react_1.useMemo)(function () {
        var _a;
        var policies = Object.values(allPolicies !== null && allPolicies !== void 0 ? allPolicies : {}).filter(function (policy) { return (0, PolicyUtils_1.isPaidGroupPolicy)(policy); });
        var outputCurrency = (_a = policies.at(0)) === null || _a === void 0 ? void 0 : _a.outputCurrency;
        return policies.some(function (policy) { return policy.outputCurrency !== outputCurrency; });
    }, [allPolicies]);
    var filterFormValues = (0, react_1.useMemo)(function () {
        return (0, SearchQueryUtils_1.buildFilterFormValuesFromQuery)(queryJSON, policyCategories, policyTagsLists, currencyList, personalDetails, allCards, reports, taxRates);
    }, [allCards, currencyList, personalDetails, policyCategories, policyTagsLists, queryJSON, reports, taxRates]);
    var hasErrors = Object.keys(searchResultsErrors !== null && searchResultsErrors !== void 0 ? searchResultsErrors : {}).length > 0 && !isOffline;
    var shouldShowSelectedDropdown = headerButtonsOptions.length > 0 && (!shouldUseNarrowLayout || isMobileSelectionModeEnabled);
    var _f = (0, react_1.useMemo)(function () {
        var _a;
        var options = (0, SearchUIUtils_1.getTypeOptions)(allPolicies, email);
        var value = (_a = options.find(function (option) { return option.value === unsafeType; })) !== null && _a !== void 0 ? _a : null;
        return [options, value];
    }, [allPolicies, email, unsafeType]), typeOptions = _f[0], type = _f[1];
    var isExpenseReportType = (0, react_1.useMemo)(function () { return (type === null || type === void 0 ? void 0 : type.value) === CONST_1.default.SEARCH.DATA_TYPES.EXPENSE_REPORT; }, [type]);
    var selectedItemsCount = (0, react_1.useMemo)(function () {
        if (!selectedTransactions) {
            return 0;
        }
        if (isExpenseReportType) {
            // In expense report mode, count unique reports instead of individual transactions
            var reportIDs = new Set(Object.values(selectedTransactions)
                .map(function (transaction) { return transaction === null || transaction === void 0 ? void 0 : transaction.reportID; })
                .filter(function (reportID) { return !!reportID; }));
            return reportIDs.size;
        }
        // Otherwise count transactions
        return selectedTransactionsKeys.length;
    }, [selectedTransactions, isExpenseReportType, selectedTransactionsKeys.length]);
    var _g = (0, react_1.useMemo)(function () {
        var _a;
        var options = (0, SearchUIUtils_1.getGroupByOptions)();
        var value = (_a = options.find(function (option) { return option.value === unsafeGroupBy; })) !== null && _a !== void 0 ? _a : null;
        return [options, value];
    }, [unsafeGroupBy]), groupByOptions = _g[0], groupBy = _g[1];
    var _h = (0, react_1.useMemo)(function () {
        var _a;
        var options = (0, SearchUIUtils_1.getGroupCurrencyOptions)(currencyList);
        var value = (_a = options.find(function (option) { return option.value === filterFormValues.groupCurrency; })) !== null && _a !== void 0 ? _a : null;
        return [options, value];
    }, [filterFormValues.groupCurrency, currencyList]), groupCurrencyOptions = _h[0], groupCurrency = _h[1];
    var _j = (0, react_1.useMemo)(function () {
        var _a, _b;
        var feedFilterValues = (_b = (_a = flatFilters.find(function (filter) { return filter.key === CONST_1.default.SEARCH.SYNTAX_FILTER_KEYS.FEED; })) === null || _a === void 0 ? void 0 : _a.filters) === null || _b === void 0 ? void 0 : _b.map(function (filter) { return filter.value; });
        var options = (0, SearchUIUtils_1.getFeedOptions)(allFeeds, allCards);
        var value = feedFilterValues ? options.filter(function (option) { return feedFilterValues.includes(option.value); }) : [];
        return [options, value];
    }, [flatFilters, allFeeds, allCards]), feedOptions = _j[0], feed = _j[1];
    var _k = (0, react_1.useMemo)(function () {
        var _a;
        var options = type ? (0, SearchUIUtils_1.getStatusOptions)(translate, type.value) : [];
        var value = [
            Array.isArray(unsafeStatus) ? options.filter(function (option) { return unsafeStatus.includes(option.value); }) : ((_a = options.find(function (option) { return option.value === unsafeStatus; })) !== null && _a !== void 0 ? _a : []),
        ].flat();
        return [options, value];
    }, [translate, unsafeStatus, type]), statusOptions = _k[0], status = _k[1];
    var _l = (0, react_1.useMemo)(function () {
        var _a, _b, _c;
        var hasFilterValues = (_b = (_a = flatFilters.find(function (filter) { return filter.key === CONST_1.default.SEARCH.SYNTAX_FILTER_KEYS.HAS; })) === null || _a === void 0 ? void 0 : _a.filters) === null || _b === void 0 ? void 0 : _b.map(function (filter) { return filter.value; });
        var options = (0, SearchUIUtils_1.getHasOptions)((_c = type === null || type === void 0 ? void 0 : type.value) !== null && _c !== void 0 ? _c : CONST_1.default.SEARCH.DATA_TYPES.EXPENSE);
        var value = hasFilterValues ? options.filter(function (option) { return hasFilterValues.includes(option.value); }) : [];
        return [options, value];
    }, [flatFilters, type]), hasOptions = _l[0], has = _l[1];
    var _m = (0, react_1.useMemo)(function () {
        var _a, _b;
        var isFilterValues = (_b = (_a = flatFilters.find(function (filter) { return filter.key === CONST_1.default.SEARCH.SYNTAX_FILTER_KEYS.IS; })) === null || _a === void 0 ? void 0 : _a.filters) === null || _b === void 0 ? void 0 : _b.map(function (filter) { return filter.value; });
        var options = Object.values(CONST_1.default.SEARCH.IS_VALUES).map(function (value) { return ({ text: translate("common.".concat(value)), value: value }); });
        var value = isFilterValues ? options.filter(function (option) { return isFilterValues.includes(option.value); }) : [];
        return [options, value];
    }, [flatFilters, translate]), isOptions = _m[0], is = _m[1];
    var createDateDisplayValue = (0, react_1.useCallback)(function (filterValues) {
        var _a;
        var value = (_a = {},
            _a[CONST_1.default.SEARCH.DATE_MODIFIERS.ON] = filterValues.on,
            _a[CONST_1.default.SEARCH.DATE_MODIFIERS.AFTER] = filterValues.after,
            _a[CONST_1.default.SEARCH.DATE_MODIFIERS.BEFORE] = filterValues.before,
            _a);
        var displayText = [];
        if (value.On) {
            displayText.push((0, SearchQueryUtils_1.isSearchDatePreset)(value.On) ? translate("search.filters.date.presets.".concat(value.On)) : "".concat(translate('common.on'), " ").concat(DateUtils_1.default.formatToReadableString(value.On)));
        }
        if (value.After) {
            displayText.push("".concat(translate('common.after'), " ").concat(DateUtils_1.default.formatToReadableString(value.After)));
        }
        if (value.Before) {
            displayText.push("".concat(translate('common.before'), " ").concat(DateUtils_1.default.formatToReadableString(value.Before)));
        }
        return [value, displayText];
    }, [translate]);
    var _o = (0, react_1.useMemo)(function () {
        return createDateDisplayValue({
            on: filterFormValues.dateOn,
            after: filterFormValues.dateAfter,
            before: filterFormValues.dateBefore,
        });
    }, [filterFormValues.dateOn, filterFormValues.dateAfter, filterFormValues.dateBefore, createDateDisplayValue]), date = _o[0], displayDate = _o[1];
    var _p = (0, react_1.useMemo)(function () {
        return createDateDisplayValue({
            on: filterFormValues.postedOn,
            after: filterFormValues.postedAfter,
            before: filterFormValues.postedBefore,
        });
    }, [filterFormValues.postedOn, filterFormValues.postedAfter, filterFormValues.postedBefore, createDateDisplayValue]), posted = _p[0], displayPosted = _p[1];
    var _q = (0, react_1.useMemo)(function () {
        return createDateDisplayValue({
            on: filterFormValues.withdrawnOn,
            after: filterFormValues.withdrawnAfter,
            before: filterFormValues.withdrawnBefore,
        });
    }, [filterFormValues.withdrawnOn, filterFormValues.withdrawnAfter, filterFormValues.withdrawnBefore, createDateDisplayValue]), withdrawn = _q[0], displayWithdrawn = _q[1];
    var _r = (0, react_1.useMemo)(function () {
        var _a;
        var options = (0, SearchUIUtils_1.getWithdrawalTypeOptions)(translate);
        var value = (_a = options.find(function (option) { return option.value === filterFormValues.withdrawalType; })) !== null && _a !== void 0 ? _a : null;
        return [options, value];
    }, [translate, filterFormValues.withdrawalType]), withdrawalTypeOptions = _r[0], withdrawalType = _r[1];
    var accountID = (0, useCurrentUserPersonalDetails_1.default)().accountID;
    var activeAdminPolicies = (0, PolicyUtils_1.getActiveAdminWorkspaces)(allPolicies, accountID.toString()).sort(function (a, b) { return localeCompare(a.name || '', b.name || ''); });
    var updateFilterForm = (0, react_1.useCallback)(function (values) {
        var updatedFilterFormValues = __assign(__assign({}, filterFormValues), values);
        // If the type has changed, reset the status so we dont have an invalid status selected
        if (updatedFilterFormValues.type !== filterFormValues.type) {
            updatedFilterFormValues.status = CONST_1.default.SEARCH.STATUS.EXPENSE.ALL;
        }
        var queryString = (0, SearchQueryUtils_1.buildQueryStringFromFilterFormValues)(updatedFilterFormValues);
        (0, Modal_1.close)(function () {
            Navigation_1.default.setParams({ q: queryString });
        });
    }, [filterFormValues]);
    var openAdvancedFilters = (0, react_1.useCallback)(function () {
        (0, Search_1.updateAdvancedFilters)(filterFormValues, true);
        Navigation_1.default.navigate(ROUTES_1.default.SEARCH_ADVANCED_FILTERS.getRoute());
    }, [filterFormValues]);
    var isFormInitializedRef = (0, react_1.useRef)(false);
    (0, react_1.useEffect)(function () {
        if (isFormInitializedRef.current) {
            return;
        }
        if (filterFormValues && Object.keys(filterFormValues).length > 0) {
            if (isFocused) {
                (0, Search_1.updateAdvancedFilters)(filterFormValues, true);
            }
            isFormInitializedRef.current = true;
        }
    }, [queryJSON, filterFormValues, isFocused]);
    var typeComponent = (0, react_1.useCallback)(function (_a) {
        var closeOverlay = _a.closeOverlay;
        return (<SingleSelectPopup_1.default label={translate('common.type')} value={type} items={typeOptions} closeOverlay={closeOverlay} onChange={function (item) { var _a; return updateFilterForm({ type: (_a = item === null || item === void 0 ? void 0 : item.value) !== null && _a !== void 0 ? _a : CONST_1.default.SEARCH.DATA_TYPES.EXPENSE }); }}/>);
    }, [translate, typeOptions, type, updateFilterForm]);
    var groupByComponent = (0, react_1.useCallback)(function (_a) {
        var closeOverlay = _a.closeOverlay;
        return (<SingleSelectPopup_1.default label={translate('search.groupBy')} items={groupByOptions} value={groupBy} closeOverlay={closeOverlay} onChange={function (item) {
                var newValue = item === null || item === void 0 ? void 0 : item.value;
                if (!newValue) {
                    // groupCurrency depends on groupBy. Without groupBy groupCurrency makes no sense
                    updateFilterForm({ groupBy: undefined, groupCurrency: undefined });
                }
                else {
                    updateFilterForm({ groupBy: newValue });
                }
            }}/>);
    }, [translate, groupByOptions, groupBy, updateFilterForm]);
    var groupCurrencyComponent = (0, react_1.useCallback)(function (_a) {
        var closeOverlay = _a.closeOverlay;
        return (<SingleSelectPopup_1.default label={translate('common.groupCurrency')} items={groupCurrencyOptions} value={groupCurrency} closeOverlay={closeOverlay} onChange={function (item) { return updateFilterForm({ groupCurrency: item === null || item === void 0 ? void 0 : item.value }); }} isSearchable searchPlaceholder={translate('common.groupCurrency')}/>);
    }, [translate, groupCurrencyOptions, groupCurrency, updateFilterForm]);
    var createDatePickerComponent = (0, react_1.useCallback)(function (filterKey, value, translationKey) {
        return function (_a) {
            var closeOverlay = _a.closeOverlay;
            var onChange = function (selectedDates) {
                var _a;
                var dateFormValues = (_a = {},
                    _a["".concat(filterKey, "On")] = selectedDates[CONST_1.default.SEARCH.DATE_MODIFIERS.ON],
                    _a["".concat(filterKey, "After")] = selectedDates[CONST_1.default.SEARCH.DATE_MODIFIERS.AFTER],
                    _a["".concat(filterKey, "Before")] = selectedDates[CONST_1.default.SEARCH.DATE_MODIFIERS.BEFORE],
                    _a);
                updateFilterForm(dateFormValues);
            };
            return (<DateSelectPopup_1.default label={translate(translationKey)} value={value} onChange={onChange} closeOverlay={closeOverlay} presets={(0, SearchUIUtils_1.getDatePresets)(filterKey, true)}/>);
        };
    }, [translate, updateFilterForm]);
    var createMultiSelectComponent = (0, react_1.useCallback)(function (translationKey, items, value, onChangeCallback) {
        return function (_a) {
            var closeOverlay = _a.closeOverlay;
            return (<MultiSelectPopup_1.default label={translate(translationKey)} items={items} value={value} closeOverlay={closeOverlay} onChange={onChangeCallback}/>);
        };
    }, [translate]);
    var feedComponent = (0, react_1.useMemo)(function () {
        var updateFeedFilterForm = function (items) {
            updateFilterForm({ feed: items.map(function (item) { return item.value; }) });
        };
        return createMultiSelectComponent('search.filters.feed', feedOptions, feed, updateFeedFilterForm);
    }, [createMultiSelectComponent, feedOptions, feed, updateFilterForm]);
    var datePickerComponent = (0, react_1.useMemo)(function () { return createDatePickerComponent(CONST_1.default.SEARCH.SYNTAX_FILTER_KEYS.DATE, date, 'common.date'); }, [createDatePickerComponent, date]);
    var postedPickerComponent = (0, react_1.useMemo)(function () { return createDatePickerComponent(CONST_1.default.SEARCH.SYNTAX_FILTER_KEYS.POSTED, posted, 'search.filters.posted'); }, [createDatePickerComponent, posted]);
    var withdrawnPickerComponent = (0, react_1.useMemo)(function () { return createDatePickerComponent(CONST_1.default.SEARCH.SYNTAX_FILTER_KEYS.WITHDRAWN, withdrawn, 'search.filters.withdrawn'); }, [createDatePickerComponent, withdrawn]);
    var withdrawalTypeComponent = (0, react_1.useCallback)(function (_a) {
        var closeOverlay = _a.closeOverlay;
        return (<SingleSelectPopup_1.default label={translate('search.withdrawalType')} items={withdrawalTypeOptions} value={withdrawalType} closeOverlay={closeOverlay} onChange={function (item) { return updateFilterForm({ withdrawalType: item === null || item === void 0 ? void 0 : item.value }); }}/>);
    }, [translate, withdrawalTypeOptions, withdrawalType, updateFilterForm]);
    var statusComponent = (0, react_1.useMemo)(function () {
        var updateStatusFilterForm = function (selectedItems) {
            var newStatus = selectedItems.length ? selectedItems.map(function (i) { return i.value; }) : CONST_1.default.SEARCH.STATUS.EXPENSE.ALL;
            updateFilterForm({ status: newStatus });
        };
        return createMultiSelectComponent('common.status', statusOptions, status, updateStatusFilterForm);
    }, [createMultiSelectComponent, statusOptions, status, updateFilterForm]);
    var hasComponent = (0, react_1.useMemo)(function () {
        var updateHasFilterForm = function (selectedItems) {
            updateFilterForm({ has: selectedItems.map(function (item) { return item.value; }) });
        };
        return createMultiSelectComponent('search.has', hasOptions, has, updateHasFilterForm);
    }, [createMultiSelectComponent, hasOptions, has, updateFilterForm]);
    var isComponent = (0, react_1.useMemo)(function () {
        var updateIsFilterForm = function (selectedItems) {
            updateFilterForm({ is: selectedItems.map(function (item) { return item.value; }) });
        };
        return createMultiSelectComponent('search.filters.is', isOptions, is, updateIsFilterForm);
    }, [createMultiSelectComponent, isOptions, is, updateFilterForm]);
    var userPickerComponent = (0, react_1.useCallback)(function (_a) {
        var _b;
        var closeOverlay = _a.closeOverlay;
        var value = (_b = filterFormValues.from) !== null && _b !== void 0 ? _b : [];
        return (<UserSelectPopup_1.default value={value} closeOverlay={closeOverlay} onChange={function (selectedUsers) { return updateFilterForm({ from: selectedUsers }); }}/>);
    }, [filterFormValues.from, updateFilterForm]);
    var typeFiltersKeys = (0, useAdvancedSearchFilters_1.default)().typeFiltersKeys;
    /**
     * Builds the list of all filter chips to be displayed in the
     * filter bar
     */
    var filters = (0, react_1.useMemo)(function () {
        var _a, _b, _c, _d, _e, _f;
        var fromValue = (_b = (_a = filterFormValues.from) === null || _a === void 0 ? void 0 : _a.map(function (currentAccountID) { return (0, PersonalDetailsUtils_1.getDisplayNameOrDefault)(personalDetails === null || personalDetails === void 0 ? void 0 : personalDetails[currentAccountID], currentAccountID, false); })) !== null && _b !== void 0 ? _b : [];
        var shouldDisplayGroupByFilter = !!(groupBy === null || groupBy === void 0 ? void 0 : groupBy.value);
        var shouldDisplayGroupCurrencyFilter = shouldDisplayGroupByFilter && hasMultipleOutputCurrency;
        var shouldDisplayFeedFilter = feedOptions.length > 1 && !!filterFormValues.feed;
        var shouldDisplayPostedFilter = !!filterFormValues.feed && (!!filterFormValues.postedOn || !!filterFormValues.postedAfter || !!filterFormValues.postedBefore);
        var shouldDisplayWithdrawalTypeFilter = !!filterFormValues.withdrawalType;
        var shouldDisplayWithdrawnFilter = !!filterFormValues.withdrawnOn || !!filterFormValues.withdrawnAfter || !!filterFormValues.withdrawnBefore;
        var filterList = __spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray([
            {
                label: translate('common.type'),
                PopoverComponent: typeComponent,
                value: (_c = type === null || type === void 0 ? void 0 : type.text) !== null && _c !== void 0 ? _c : null,
                filterKey: SearchAdvancedFiltersForm_1.default.TYPE,
            }
        ], (shouldDisplayGroupByFilter
            ? [
                {
                    label: translate('search.groupBy'),
                    PopoverComponent: groupByComponent,
                    value: (_d = groupBy === null || groupBy === void 0 ? void 0 : groupBy.text) !== null && _d !== void 0 ? _d : null,
                    filterKey: SearchAdvancedFiltersForm_1.default.GROUP_BY,
                },
            ]
            : []), true), (shouldDisplayGroupCurrencyFilter
            ? [
                {
                    label: translate('common.groupCurrency'),
                    PopoverComponent: groupCurrencyComponent,
                    value: (_e = groupCurrency === null || groupCurrency === void 0 ? void 0 : groupCurrency.value) !== null && _e !== void 0 ? _e : null,
                    filterKey: SearchAdvancedFiltersForm_1.default.GROUP_CURRENCY,
                },
            ]
            : []), true), (shouldDisplayFeedFilter
            ? [
                {
                    label: translate('search.filters.feed'),
                    PopoverComponent: feedComponent,
                    value: feed.map(function (option) { return option.text; }),
                    filterKey: SearchAdvancedFiltersForm_1.default.FEED,
                },
            ]
            : []), true), (shouldDisplayPostedFilter
            ? [
                {
                    label: translate('search.filters.posted'),
                    PopoverComponent: postedPickerComponent,
                    value: displayPosted,
                    filterKey: SearchAdvancedFiltersForm_1.default.POSTED_ON,
                },
            ]
            : []), true), (shouldDisplayWithdrawalTypeFilter
            ? [
                {
                    label: translate('search.withdrawalType'),
                    PopoverComponent: withdrawalTypeComponent,
                    value: (_f = withdrawalType === null || withdrawalType === void 0 ? void 0 : withdrawalType.text) !== null && _f !== void 0 ? _f : null,
                    filterKey: SearchAdvancedFiltersForm_1.default.WITHDRAWAL_TYPE,
                },
            ]
            : []), true), (shouldDisplayWithdrawnFilter
            ? [
                {
                    label: translate('search.filters.withdrawn'),
                    PopoverComponent: withdrawnPickerComponent,
                    value: displayWithdrawn,
                    filterKey: SearchAdvancedFiltersForm_1.default.WITHDRAWN_ON,
                },
            ]
            : []), true), [
            {
                label: translate('common.status'),
                PopoverComponent: statusComponent,
                value: status.map(function (option) { return option.text; }),
                filterKey: SearchAdvancedFiltersForm_1.default.STATUS,
            }
        ], false), ((type === null || type === void 0 ? void 0 : type.value) === CONST_1.default.SEARCH.DATA_TYPES.CHAT
            ? [
                {
                    label: translate('search.has'),
                    PopoverComponent: hasComponent,
                    value: has.map(function (option) { return option.text; }),
                    filterKey: SearchAdvancedFiltersForm_1.default.HAS,
                },
            ]
            : []), true), ((type === null || type === void 0 ? void 0 : type.value) === CONST_1.default.SEARCH.DATA_TYPES.CHAT
            ? [
                {
                    label: translate('search.filters.is'),
                    PopoverComponent: isComponent,
                    value: is.map(function (option) { return option.text; }),
                    filterKey: SearchAdvancedFiltersForm_1.default.IS,
                },
            ]
            : []), true), [
            {
                label: translate('common.date'),
                PopoverComponent: datePickerComponent,
                value: displayDate,
                filterKey: SearchAdvancedFiltersForm_1.default.DATE_ON,
            },
            {
                label: translate('common.from'),
                PopoverComponent: userPickerComponent,
                value: fromValue,
                filterKey: SearchAdvancedFiltersForm_1.default.FROM,
            },
        ], false).filter(function (filterItem) { var _a; return (0, SearchQueryUtils_1.isFilterSupported)(filterItem.filterKey, (_a = type === null || type === void 0 ? void 0 : type.value) !== null && _a !== void 0 ? _a : CONST_1.default.SEARCH.DATA_TYPES.EXPENSE); });
        return filterList;
    }, [
        type,
        groupBy,
        groupCurrency,
        withdrawalType,
        displayDate,
        displayPosted,
        displayWithdrawn,
        filterFormValues.from,
        filterFormValues.feed,
        filterFormValues.postedOn,
        filterFormValues.postedAfter,
        filterFormValues.postedBefore,
        filterFormValues.withdrawalType,
        filterFormValues.withdrawnOn,
        filterFormValues.withdrawnAfter,
        filterFormValues.withdrawnBefore,
        translate,
        hasComponent,
        isComponent,
        typeComponent,
        groupByComponent,
        groupCurrencyComponent,
        statusComponent,
        datePickerComponent,
        userPickerComponent,
        postedPickerComponent,
        withdrawalTypeComponent,
        withdrawnPickerComponent,
        status,
        personalDetails,
        feed,
        feedComponent,
        feedOptions.length,
        hasMultipleOutputCurrency,
        has,
        is,
    ]);
    var hiddenSelectedFilters = (0, react_1.useMemo)(function () {
        var advancedSearchFiltersKeys = typeFiltersKeys.flat();
        var exposedFiltersKeys = new Set(filters.flatMap(function (filter) {
            var dateFilterKey = SearchAdvancedFiltersForm_1.DATE_FILTER_KEYS.find(function (key) { return filter.filterKey.startsWith(key); });
            if (dateFilterKey) {
                return dateFilterKey;
            }
            return filter.filterKey;
        }));
        var hiddenFilters = advancedSearchFiltersKeys.filter(function (key) { return !exposedFiltersKeys.has(key); });
        var hasReportFields = Object.keys(filterFormValues).some(function (key) { return key.startsWith(CONST_1.default.SEARCH.REPORT_FIELD.GLOBAL_PREFIX) && !key.startsWith(CONST_1.default.SEARCH.REPORT_FIELD.NOT_PREFIX); });
        return hiddenFilters.filter(function (key) {
            var _a, _b, _c, _d;
            var dateFilterKey = SearchAdvancedFiltersForm_1.DATE_FILTER_KEYS.find(function (dateKey) { return key === dateKey; });
            if (dateFilterKey) {
                return (_b = (_a = filterFormValues["".concat(dateFilterKey, "On")]) !== null && _a !== void 0 ? _a : filterFormValues["".concat(dateFilterKey, "After")]) !== null && _b !== void 0 ? _b : filterFormValues["".concat(dateFilterKey, "Before")];
            }
            if (key === CONST_1.default.SEARCH.SYNTAX_FILTER_KEYS.REPORT_FIELD) {
                return hasReportFields;
            }
            var amountFilterKey = SearchAdvancedFiltersForm_1.AMOUNT_FILTER_KEYS.find(function (amountKey) { return key === amountKey; });
            if (amountFilterKey) {
                return ((_d = (_c = filterFormValues["".concat(amountFilterKey).concat(CONST_1.default.SEARCH.AMOUNT_MODIFIERS.EQUAL_TO)]) !== null && _c !== void 0 ? _c : filterFormValues["".concat(amountFilterKey).concat(CONST_1.default.SEARCH.AMOUNT_MODIFIERS.GREATER_THAN)]) !== null && _d !== void 0 ? _d : filterFormValues["".concat(amountFilterKey).concat(CONST_1.default.SEARCH.AMOUNT_MODIFIERS.LESS_THAN)]);
            }
            return filterFormValues[key];
        });
    }, [filterFormValues, filters, typeFiltersKeys]);
    if (hasErrors) {
        return null;
    }
    if (shouldShowFiltersBarLoading) {
        return <SearchFiltersSkeleton_1.default shouldAnimate/>;
    }
    var selectionButtonText = areAllMatchingItemsSelected ? translate('search.exportAll.allMatchingItemsSelected') : translate('workspace.common.selected', { count: selectedItemsCount });
    return (<react_native_1.View style={[shouldShowSelectedDropdown && styles.ph5, styles.mb2, styles.searchFiltersBarContainer]}>
            {shouldShowSelectedDropdown ? (<KYCWall_1.default ref={kycWallRef} chatReportID={currentSelectedReportID} enablePaymentsRoute={ROUTES_1.default.ENABLE_PAYMENTS} iouReport={selectedIOUReport} addBankAccountRoute={isCurrentSelectedExpenseReport ? ROUTES_1.default.BANK_ACCOUNT_WITH_STEP_TO_OPEN.getRoute(currentSelectedPolicyID, undefined, Navigation_1.default.getActiveRoute()) : undefined} onSuccessfulKYC={function (paymentType) { return confirmPayment === null || confirmPayment === void 0 ? void 0 : confirmPayment(paymentType); }}>
                    {function (triggerKYCFlow, buttonRef) { return (<react_native_1.View style={[styles.flexRow, styles.gap3]}>
                            <ButtonWithDropdownMenu_1.default onPress={function () { return null; }} shouldAlwaysShowDropdownMenu buttonSize={CONST_1.default.DROPDOWN_BUTTON_SIZE.SMALL} customText={selectionButtonText} options={headerButtonsOptions} onSubItemSelected={function (subItem) {
                    return (0, Search_1.handleBulkPayItemSelected)(subItem, triggerKYCFlow, isAccountLocked, showLockedAccountModal, currentPolicy, latestBankItems, activeAdminPolicies, isUserValidated, confirmPayment);
                }} isSplitButton={false} buttonRef={buttonRef} anchorAlignment={{
                    horizontal: CONST_1.default.MODAL.ANCHOR_ORIGIN_HORIZONTAL.LEFT,
                    vertical: CONST_1.default.MODAL.ANCHOR_ORIGIN_VERTICAL.TOP,
                }}/>
                            {!areAllMatchingItemsSelected && showSelectAllMatchingItems && (<Button_1.default link small shouldUseDefaultHover={false} innerStyles={styles.p0} onPress={function () { return selectAllMatchingItems(true); }} text={translate('search.exportAll.selectAllMatchingItems')}/>)}
                        </react_native_1.View>); }}
                </KYCWall_1.default>) : (<ScrollView_1.default horizontal keyboardShouldPersistTaps="always" style={[styles.flexRow, styles.overflowScroll, styles.flexGrow0]} contentContainerStyle={[styles.flexRow, styles.flexGrow0, styles.gap2, styles.ph5]} ref={scrollRef} showsHorizontalScrollIndicator={false}>
                    {filters.map(function (filter) { return (<DropdownButton_1.default key={filter.label} label={filter.label} value={filter.value} PopoverComponent={filter.PopoverComponent}/>); })}

                    <Button_1.default link small shouldUseDefaultHover={false} text={translate('search.filtersHeader') + (hiddenSelectedFilters.length > 0 ? " (".concat(hiddenSelectedFilters.length, ")") : '')} iconFill={theme.link} iconHoverFill={theme.linkHover} icon={Expensicons.Filter} textStyles={[styles.textMicroBold]} onPress={openAdvancedFilters}/>
                </ScrollView_1.default>)}
        </react_native_1.View>);
}
SearchFiltersBar.displayName = 'SearchFiltersBar';
exports.default = SearchFiltersBar;
