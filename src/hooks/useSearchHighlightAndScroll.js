"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var native_1 = require("@react-navigation/native");
var react_1 = require("react");
var react_native_1 = require("react-native");
var Search_1 = require("@libs/actions/Search");
var SearchUIUtils_1 = require("@libs/SearchUIUtils");
var CONST_1 = require("@src/CONST");
var ONYXKEYS_1 = require("@src/ONYXKEYS");
var useNetwork_1 = require("./useNetwork");
var usePrevious_1 = require("./usePrevious");
/**
 * Hook used to trigger a search when a new transaction or report action is added and handle highlighting and scrolling.
 */
function useSearchHighlightAndScroll(_a) {
    var searchResults = _a.searchResults, transactions = _a.transactions, previousTransactions = _a.previousTransactions, reportActions = _a.reportActions, previousReportActions = _a.previousReportActions, queryJSON = _a.queryJSON, searchKey = _a.searchKey, offset = _a.offset, shouldCalculateTotals = _a.shouldCalculateTotals;
    var isFocused = (0, native_1.useIsFocused)();
    var isOffline = (0, useNetwork_1.default)().isOffline;
    // Ref to track if the search was triggered by this hook
    var triggeredByHookRef = (0, react_1.useRef)(false);
    var searchTriggeredRef = (0, react_1.useRef)(false);
    var hasNewItemsRef = (0, react_1.useRef)(false);
    var previousSearchResults = (0, usePrevious_1.default)(searchResults === null || searchResults === void 0 ? void 0 : searchResults.data);
    var _b = (0, react_1.useState)(null), newSearchResultKeys = _b[0], setNewSearchResultKeys = _b[1];
    var highlightedIDs = (0, react_1.useRef)(new Set());
    var initializedRef = (0, react_1.useRef)(false);
    var hasPendingSearchRef = (0, react_1.useRef)(false);
    var isChat = queryJSON.type === CONST_1.default.SEARCH.DATA_TYPES.CHAT;
    var existingSearchResultIDs = (0, react_1.useMemo)(function () {
        if (!(searchResults === null || searchResults === void 0 ? void 0 : searchResults.data)) {
            return [];
        }
        return isChat ? extractReportActionIDsFromSearchResults(searchResults.data) : extractTransactionIDsFromSearchResults(searchResults.data);
    }, [searchResults === null || searchResults === void 0 ? void 0 : searchResults.data, isChat]);
    var newTransactions = (0, react_1.useMemo)(function () {
        var previousTransactionsIDs = Object.keys(previousTransactions !== null && previousTransactions !== void 0 ? previousTransactions : {});
        if (previousTransactionsIDs.length === 0) {
            return [];
        }
        var previousIDs = new Set(previousTransactionsIDs);
        var result = [];
        for (var _i = 0, _a = Object.entries(transactions !== null && transactions !== void 0 ? transactions : {}); _i < _a.length; _i++) {
            var _b = _a[_i], id = _b[0], transaction = _b[1];
            if (!previousIDs.has(id) && transaction) {
                result.push(transaction);
            }
        }
        return result;
    }, [previousTransactions, transactions]);
    // Trigger search when a new report action is added while on chat or when a new transaction is added for the other search types.
    (0, react_1.useEffect)(function () {
        var previousTransactionsIDs = Object.keys(previousTransactions !== null && previousTransactions !== void 0 ? previousTransactions : {});
        var transactionsIDs = Object.keys(transactions !== null && transactions !== void 0 ? transactions : {});
        var reportActionsIDs = Object.values(reportActions !== null && reportActions !== void 0 ? reportActions : {})
            .map(function (actions) { return Object.keys(actions !== null && actions !== void 0 ? actions : {}); })
            .flat();
        var previousReportActionsIDs = Object.values(previousReportActions !== null && previousReportActions !== void 0 ? previousReportActions : {})
            .map(function (actions) { return Object.keys(actions !== null && actions !== void 0 ? actions : {}); })
            .flat();
        // Only proceed if we have previous data to compare against
        // This prevents triggering on initial data load
        if (previousTransactionsIDs.length === 0 && previousReportActionsIDs.length === 0) {
            return;
        }
        var previousTransactionsIDsSet = new Set(previousTransactionsIDs);
        var previousReportActionsIDsSet = new Set(previousReportActionsIDs);
        var hasTransactionsIDsChange = transactionsIDs.length !== previousTransactionsIDs.length || transactionsIDs.some(function (id) { return !previousTransactionsIDsSet.has(id); });
        var hasReportActionsIDsChange = reportActionsIDs.some(function (id) { return !previousReportActionsIDsSet.has(id); });
        // Check if there is a change in the transactions or report actions list
        if ((!isChat && hasTransactionsIDsChange) || hasReportActionsIDsChange || hasPendingSearchRef.current) {
            // If we're not focused or offline, don't trigger search
            if (!isFocused || isOffline) {
                hasPendingSearchRef.current = true;
                return;
            }
            hasPendingSearchRef.current = false;
            var newIDs = isChat ? reportActionsIDs : transactionsIDs;
            var existingSearchResultIDsSet_1 = new Set(existingSearchResultIDs);
            var hasAGenuinelyNewID = newIDs.some(function (id) { return !existingSearchResultIDsSet_1.has(id); });
            // Only skip search if there are no new items AND search results aren't empty
            // This ensures deletions that result in empty data still trigger search
            if (!hasAGenuinelyNewID && existingSearchResultIDs.length > 0) {
                var newIDsSet_1 = new Set(newIDs);
                var hasDeletedID = existingSearchResultIDs.some(function (id) { return !newIDsSet_1.has(id); });
                if (!hasDeletedID) {
                    return;
                }
            }
            // We only want to highlight new items if the addition of transactions or report actions triggered the search.
            // This is because, on deletion of items, the backend sometimes returns old items in place of the deleted ones.
            // We don't want to highlight these old items, even if they appear new in the current search results.
            hasNewItemsRef.current = isChat ? reportActionsIDs.length > previousReportActionsIDs.length : transactionsIDs.length > previousTransactionsIDs.length;
            // Set the flag indicating the search is triggered by the hook
            triggeredByHookRef.current = true;
            // Trigger the search
            // eslint-disable-next-line @typescript-eslint/no-deprecated
            react_native_1.InteractionManager.runAfterInteractions(function () {
                (0, Search_1.search)({ queryJSON: queryJSON, searchKey: searchKey, offset: offset, shouldCalculateTotals: shouldCalculateTotals });
            });
            // Set the ref to prevent further triggers until reset
            searchTriggeredRef.current = true;
        }
    }, [
        isFocused,
        transactions,
        previousTransactions,
        queryJSON,
        searchKey,
        offset,
        shouldCalculateTotals,
        reportActions,
        previousReportActions,
        isChat,
        searchResults === null || searchResults === void 0 ? void 0 : searchResults.data,
        existingSearchResultIDs,
        isOffline,
    ]);
    // Initialize the set with existing IDs only once
    (0, react_1.useEffect)(function () {
        if (initializedRef.current || !(searchResults === null || searchResults === void 0 ? void 0 : searchResults.data)) {
            return;
        }
        highlightedIDs.current = new Set(existingSearchResultIDs);
        initializedRef.current = true;
    }, [searchResults === null || searchResults === void 0 ? void 0 : searchResults.data, isChat, existingSearchResultIDs]);
    // Detect new items (transactions or report actions)
    (0, react_1.useEffect)(function () {
        if (!previousSearchResults || !(searchResults === null || searchResults === void 0 ? void 0 : searchResults.data)) {
            return;
        }
        if (isChat) {
            var previousReportActionIDs_1 = extractReportActionIDsFromSearchResults(previousSearchResults);
            var currentReportActionIDs = extractReportActionIDsFromSearchResults(searchResults.data);
            // Find new report action IDs that are not in the previousReportActionIDs and not already highlighted
            var newReportActionIDs = currentReportActionIDs.filter(function (id) { return !previousReportActionIDs_1.includes(id) && !highlightedIDs.current.has(id); });
            if (!triggeredByHookRef.current || newReportActionIDs.length === 0 || !hasNewItemsRef.current) {
                return;
            }
            var newKeys_1 = new Set();
            newReportActionIDs.forEach(function (id) {
                var newReportActionKey = "".concat(ONYXKEYS_1.default.COLLECTION.REPORT_ACTIONS).concat(id);
                highlightedIDs.current.add(newReportActionKey);
                newKeys_1.add(newReportActionKey);
            });
            setNewSearchResultKeys(newKeys_1);
        }
        else {
            var previousTransactionIDs_1 = extractTransactionIDsFromSearchResults(previousSearchResults);
            var currentTransactionIDs = extractTransactionIDsFromSearchResults(searchResults.data);
            // Find new transaction IDs that are not in the previousTransactionIDs and not already highlighted
            var newTransactionIDs = currentTransactionIDs.filter(function (id) { return !previousTransactionIDs_1.includes(id) && !highlightedIDs.current.has(id); });
            if (!triggeredByHookRef.current || newTransactionIDs.length === 0 || !hasNewItemsRef.current) {
                return;
            }
            var newKeys_2 = new Set();
            newTransactionIDs.forEach(function (id) {
                var newTransactionKey = "".concat(ONYXKEYS_1.default.COLLECTION.TRANSACTION).concat(id);
                highlightedIDs.current.add(newTransactionKey);
                newKeys_2.add(newTransactionKey);
            });
            setNewSearchResultKeys(newKeys_2);
        }
    }, [searchResults === null || searchResults === void 0 ? void 0 : searchResults.data, previousSearchResults, isChat]);
    // Reset newSearchResultKey after it's been used
    (0, react_1.useEffect)(function () {
        if (newSearchResultKeys === null) {
            return;
        }
        var timer = setTimeout(function () {
            setNewSearchResultKeys(null);
        }, CONST_1.default.ANIMATED_HIGHLIGHT_START_DURATION);
        return function () { return clearTimeout(timer); };
    }, [newSearchResultKeys]);
    /**
     * Callback to handle scrolling to the new search result.
     */
    var handleSelectionListScroll = (0, react_1.useCallback)(function (data, ref) {
        // Early return if there's no ref, new transaction wasn't brought in by this hook
        // or there's no new search result key
        var newSearchResultKey = newSearchResultKeys === null || newSearchResultKeys === void 0 ? void 0 : newSearchResultKeys.values().next().value;
        if (!ref || !triggeredByHookRef.current || !newSearchResultKey) {
            return;
        }
        // Extract the transaction/report action ID from the newSearchResultKey
        var newID = newSearchResultKey.replace(isChat ? ONYXKEYS_1.default.COLLECTION.REPORT_ACTIONS : ONYXKEYS_1.default.COLLECTION.TRANSACTION, '');
        // Find the index of the new transaction/report action in the data array
        var indexOfNewItem = data.findIndex(function (item) {
            if (isChat) {
                if ('reportActionID' in item && item.reportActionID === newID) {
                    return true;
                }
            }
            else {
                // Handle TransactionListItemType
                if ('transactionID' in item && item.transactionID === newID) {
                    return true;
                }
                // Handle TransactionGroupListItemType with transactions array
                if ('transactions' in item && Array.isArray(item.transactions)) {
                    return item.transactions.some(function (transaction) { return (transaction === null || transaction === void 0 ? void 0 : transaction.transactionID) === newID; });
                }
            }
            return false;
        });
        // Early return if the new item is not found in the data array
        if (indexOfNewItem <= 0) {
            return;
        }
        // Perform the scrolling action
        ref.scrollToIndex(indexOfNewItem);
        // Reset the trigger flag to prevent unintended future scrolls and highlights
        triggeredByHookRef.current = false;
    }, [newSearchResultKeys, isChat]);
    return { newSearchResultKeys: newSearchResultKeys, handleSelectionListScroll: handleSelectionListScroll, newTransactions: newTransactions };
}
/**
 * Helper function to extract transaction IDs from search results data.
 */
function extractTransactionIDsFromSearchResults(searchResultsData) {
    var transactionIDs = [];
    Object.values(searchResultsData).forEach(function (item) {
        // Check for transactionID directly on the item (TransactionListItemType)
        if (item === null || item === void 0 ? void 0 : item.transactionID) {
            transactionIDs.push(item.transactionID);
        }
        // Check for transactions array within the item (TransactionGroupListItemType)
        if (Array.isArray(item === null || item === void 0 ? void 0 : item.transactions)) {
            item.transactions.forEach(function (transaction) {
                if (!(transaction === null || transaction === void 0 ? void 0 : transaction.transactionID)) {
                    return;
                }
                transactionIDs.push(transaction.transactionID);
            });
        }
    });
    return transactionIDs;
}
/**
 * Helper function to extract report action IDs from search results data.
 */
function extractReportActionIDsFromSearchResults(searchResultsData) {
    return Object.keys(searchResultsData !== null && searchResultsData !== void 0 ? searchResultsData : {})
        .filter(SearchUIUtils_1.isReportActionEntry)
        .map(function (key) { var _a; return Object.keys((_a = searchResultsData[key]) !== null && _a !== void 0 ? _a : {}); })
        .flat();
}
exports.default = useSearchHighlightAndScroll;
