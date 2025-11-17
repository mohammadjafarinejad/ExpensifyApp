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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
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
exports.saveSearch = saveSearch;
exports.search = search;
exports.updateSearchResultsWithTransactionThreadReportID = updateSearchResultsWithTransactionThreadReportID;
exports.deleteMoneyRequestOnSearch = deleteMoneyRequestOnSearch;
exports.holdMoneyRequestOnSearch = holdMoneyRequestOnSearch;
exports.unholdMoneyRequestOnSearch = unholdMoneyRequestOnSearch;
exports.exportSearchItemsToCSV = exportSearchItemsToCSV;
exports.queueExportSearchItemsToCSV = queueExportSearchItemsToCSV;
exports.queueExportSearchWithTemplate = queueExportSearchWithTemplate;
exports.updateAdvancedFilters = updateAdvancedFilters;
exports.clearAllFilters = clearAllFilters;
exports.clearAdvancedFilters = clearAdvancedFilters;
exports.deleteSavedSearch = deleteSavedSearch;
exports.payMoneyRequestOnSearch = payMoneyRequestOnSearch;
exports.approveMoneyRequestOnSearch = approveMoneyRequestOnSearch;
exports.handleActionButtonPress = handleActionButtonPress;
exports.submitMoneyRequestOnSearch = submitMoneyRequestOnSearch;
exports.openSearch = openSearchPage;
exports.getLastPolicyPaymentMethod = getLastPolicyPaymentMethod;
exports.getLastPolicyBankAccountID = getLastPolicyBankAccountID;
exports.exportToIntegrationOnSearch = exportToIntegrationOnSearch;
exports.getPayOption = getPayOption;
exports.isValidBulkPayOption = isValidBulkPayOption;
exports.handleBulkPayItemSelected = handleBulkPayItemSelected;
exports.isCurrencySupportWalletBulkPay = isCurrencySupportWalletBulkPay;
exports.getExportTemplates = getExportTemplates;
exports.getReportType = getReportType;
exports.getTotalFormattedAmount = getTotalFormattedAmount;
exports.setOptimisticDataForTransactionThreadPreview = setOptimisticDataForTransactionThreadPreview;
exports.getPayMoneyOnSearchInvoiceParams = getPayMoneyOnSearchInvoiceParams;
var isEmpty_1 = require("lodash/isEmpty");
var react_native_onyx_1 = require("react-native-onyx");
var API = require("@libs/API");
var API_1 = require("@libs/API");
var types_1 = require("@libs/API/types");
var ApiUtils_1 = require("@libs/ApiUtils");
var CurrencyUtils_1 = require("@libs/CurrencyUtils");
var ErrorUtils_1 = require("@libs/ErrorUtils");
var fileDownload_1 = require("@libs/fileDownload");
var Navigation_1 = require("@libs/Navigation/Navigation");
var enhanceParameters_1 = require("@libs/Network/enhanceParameters");
var NumberUtils_1 = require("@libs/NumberUtils");
var PaymentUtils_1 = require("@libs/PaymentUtils");
var PolicyUtils_1 = require("@libs/PolicyUtils");
var ReportActionsUtils_1 = require("@libs/ReportActionsUtils");
var ReportUtils_1 = require("@libs/ReportUtils");
var SearchUIUtils_1 = require("@libs/SearchUIUtils");
var Sound_1 = require("@libs/Sound");
var SubscriptionUtils_1 = require("@libs/SubscriptionUtils");
var CONST_1 = require("@src/CONST");
var ONYXKEYS_1 = require("@src/ONYXKEYS");
var ROUTES_1 = require("@src/ROUTES");
var SearchAdvancedFiltersForm_1 = require("@src/types/form/SearchAdvancedFiltersForm");
var SafeString_1 = require("@src/utils/SafeString");
var BankAccounts_1 = require("./BankAccounts");
var Report_1 = require("./Report");
var ReportNavigation_1 = require("./ReportNavigation");
function handleActionButtonPress(hash, item, goToItem, 
// eslint-disable-next-line @typescript-eslint/no-deprecated
snapshotReport, snapshotPolicy, lastPaymentMethod, currentSearchKey, onDEWModalOpen) {
    // The transactionIDList is needed to handle actions taken on `status:""` where transactions on single expense reports can be approved/paid.
    // We need the transactionID to display the loading indicator for that list item's action.
    var transactionID = (0, SearchUIUtils_1.isTransactionListItemType)(item) ? [item.transactionID] : undefined;
    var allReportTransactions = ((0, SearchUIUtils_1.isTransactionGroupListItemType)(item) ? item.transactions : [item]);
    var hasHeldExpense = (0, ReportUtils_1.hasHeldExpenses)('', allReportTransactions);
    if (hasHeldExpense) {
        goToItem();
        return;
    }
    switch (item.action) {
        case CONST_1.default.SEARCH.ACTION_TYPES.PAY:
            getPayActionCallback(hash, item, goToItem, snapshotReport, snapshotPolicy, lastPaymentMethod, currentSearchKey);
            return;
        case CONST_1.default.SEARCH.ACTION_TYPES.APPROVE:
            if ((0, PolicyUtils_1.hasDynamicExternalWorkflow)(snapshotPolicy)) {
                onDEWModalOpen === null || onDEWModalOpen === void 0 ? void 0 : onDEWModalOpen();
                return;
            }
            approveMoneyRequestOnSearch(hash, [item.reportID], transactionID, currentSearchKey);
            return;
        case CONST_1.default.SEARCH.ACTION_TYPES.SUBMIT: {
            if ((0, PolicyUtils_1.hasDynamicExternalWorkflow)(snapshotPolicy)) {
                onDEWModalOpen === null || onDEWModalOpen === void 0 ? void 0 : onDEWModalOpen();
                return;
            }
            submitMoneyRequestOnSearch(hash, [item], [snapshotPolicy], transactionID, currentSearchKey);
            return;
        }
        case CONST_1.default.SEARCH.ACTION_TYPES.EXPORT_TO_ACCOUNTING: {
            if (!item) {
                return;
            }
            var policy = snapshotPolicy !== null && snapshotPolicy !== void 0 ? snapshotPolicy : {};
            var connectedIntegration = (0, PolicyUtils_1.getValidConnectedIntegration)(policy);
            if (!connectedIntegration) {
                return;
            }
            exportToIntegrationOnSearch(hash, item.reportID, connectedIntegration, currentSearchKey);
            return;
        }
        default:
            goToItem();
    }
}
function getLastPolicyBankAccountID(policyID, lastPaymentMethods, reportType) {
    var _a;
    if (reportType === void 0) { reportType = 'lastUsed'; }
    if (!policyID) {
        return undefined;
    }
    var lastPolicyPaymentMethod = lastPaymentMethods === null || lastPaymentMethods === void 0 ? void 0 : lastPaymentMethods[policyID];
    return typeof lastPolicyPaymentMethod === 'string' ? undefined : (_a = lastPolicyPaymentMethod === null || lastPolicyPaymentMethod === void 0 ? void 0 : lastPolicyPaymentMethod[reportType]) === null || _a === void 0 ? void 0 : _a.bankAccountID;
}
function getLastPolicyPaymentMethod(policyID, lastPaymentMethods, reportType, isIOUReport) {
    var _a, _b;
    if (reportType === void 0) { reportType = 'lastUsed'; }
    if (!policyID) {
        return undefined;
    }
    var personalPolicy = (0, PolicyUtils_1.getPersonalPolicy)();
    var lastPolicyPaymentMethod = (_a = lastPaymentMethods === null || lastPaymentMethods === void 0 ? void 0 : lastPaymentMethods[policyID]) !== null && _a !== void 0 ? _a : (isIOUReport && personalPolicy ? lastPaymentMethods === null || lastPaymentMethods === void 0 ? void 0 : lastPaymentMethods[personalPolicy.id] : undefined);
    var result = typeof lastPolicyPaymentMethod === 'string' ? lastPolicyPaymentMethod : (_b = lastPolicyPaymentMethod === null || lastPolicyPaymentMethod === void 0 ? void 0 : lastPolicyPaymentMethod[reportType]) === null || _b === void 0 ? void 0 : _b.name;
    return result;
}
function getReportType(reportID) {
    if ((0, ReportUtils_1.isIOUReport)(reportID)) {
        return CONST_1.default.REPORT.TYPE.IOU;
    }
    if ((0, ReportUtils_1.isInvoiceReport)(reportID)) {
        return CONST_1.default.REPORT.TYPE.INVOICE;
    }
    if ((0, ReportUtils_1.isExpenseReport)(reportID)) {
        return CONST_1.default.REPORT.TYPE.EXPENSE;
    }
    return undefined;
}
function getPayActionCallback(hash, item, goToItem, 
// eslint-disable-next-line @typescript-eslint/no-deprecated
snapshotReport, snapshotPolicy, lastPaymentMethod, currentSearchKey) {
    var _a, _b, _c;
    var lastPolicyPaymentMethod = getLastPolicyPaymentMethod(item.policyID, lastPaymentMethod, getReportType(item.reportID));
    if (!lastPolicyPaymentMethod || !Object.values(CONST_1.default.IOU.PAYMENT_TYPE).includes(lastPolicyPaymentMethod)) {
        goToItem();
        return;
    }
    var amount = Math.abs(((_a = snapshotReport === null || snapshotReport === void 0 ? void 0 : snapshotReport.total) !== null && _a !== void 0 ? _a : 0) - ((_b = snapshotReport === null || snapshotReport === void 0 ? void 0 : snapshotReport.nonReimbursableTotal) !== null && _b !== void 0 ? _b : 0));
    var transactionID = (0, SearchUIUtils_1.isTransactionListItemType)(item) ? [item.transactionID] : undefined;
    if (lastPolicyPaymentMethod === CONST_1.default.IOU.PAYMENT_TYPE.ELSEWHERE) {
        payMoneyRequestOnSearch(hash, [{ reportID: item.reportID, amount: amount, paymentType: lastPolicyPaymentMethod }], transactionID, currentSearchKey);
        return;
    }
    var hasVBBA = !!((_c = snapshotPolicy === null || snapshotPolicy === void 0 ? void 0 : snapshotPolicy.achAccount) === null || _c === void 0 ? void 0 : _c.bankAccountID);
    if (hasVBBA) {
        payMoneyRequestOnSearch(hash, [{ reportID: item.reportID, amount: amount, paymentType: lastPolicyPaymentMethod }], transactionID, currentSearchKey);
        return;
    }
    goToItem();
}
function getOnyxLoadingData(hash, queryJSON, offset, isOffline) {
    var optimisticData = [
        {
            onyxMethod: react_native_onyx_1.default.METHOD.MERGE,
            key: "".concat(ONYXKEYS_1.default.COLLECTION.SNAPSHOT).concat(hash),
            value: {
                search: __assign({ isLoading: true }, (offset ? { offset: offset } : {})),
            },
        },
        {
            onyxMethod: react_native_onyx_1.default.METHOD.MERGE,
            key: "".concat(ONYXKEYS_1.default.COLLECTION.SNAPSHOT).concat(hash),
            value: {
                errors: null,
            },
        },
    ];
    var finallyData = [
        {
            onyxMethod: react_native_onyx_1.default.METHOD.MERGE,
            key: "".concat(ONYXKEYS_1.default.COLLECTION.SNAPSHOT).concat(hash),
            value: {
                search: {
                    isLoading: false,
                },
            },
        },
    ];
    var failureData = [
        // @ts-expect-error - will be solved in https://github.com/Expensify/App/issues/73830
        {
            onyxMethod: react_native_onyx_1.default.METHOD.MERGE,
            key: "".concat(ONYXKEYS_1.default.COLLECTION.SNAPSHOT).concat(hash),
            value: __assign(__assign({}, (isOffline ? {} : { data: [] })), { search: {
                    status: queryJSON === null || queryJSON === void 0 ? void 0 : queryJSON.status,
                    type: queryJSON === null || queryJSON === void 0 ? void 0 : queryJSON.type,
                    isLoading: false,
                }, errors: (0, ErrorUtils_1.getMicroSecondOnyxErrorWithTranslationKey)('common.genericErrorMessage') }),
        },
    ];
    return { optimisticData: optimisticData, finallyData: finallyData, failureData: failureData };
}
function saveSearch(_a) {
    var _b, _c, _d;
    var _e;
    var queryJSON = _a.queryJSON, newName = _a.newName;
    var saveSearchName = (_e = newName !== null && newName !== void 0 ? newName : queryJSON === null || queryJSON === void 0 ? void 0 : queryJSON.inputQuery) !== null && _e !== void 0 ? _e : '';
    var jsonQuery = JSON.stringify(queryJSON);
    var optimisticData = [
        {
            onyxMethod: react_native_onyx_1.default.METHOD.MERGE,
            key: "".concat(ONYXKEYS_1.default.SAVED_SEARCHES),
            value: (_b = {},
                _b[queryJSON.hash] = {
                    pendingAction: CONST_1.default.RED_BRICK_ROAD_PENDING_ACTION.ADD,
                    name: saveSearchName,
                    query: queryJSON.inputQuery,
                },
                _b),
        },
    ];
    var failureData = [
        {
            onyxMethod: react_native_onyx_1.default.METHOD.MERGE,
            key: "".concat(ONYXKEYS_1.default.SAVED_SEARCHES),
            value: (_c = {},
                _c[queryJSON.hash] = null,
                _c),
        },
    ];
    var successData = [
        {
            onyxMethod: react_native_onyx_1.default.METHOD.MERGE,
            key: "".concat(ONYXKEYS_1.default.SAVED_SEARCHES),
            value: (_d = {},
                _d[queryJSON.hash] = {
                    pendingAction: null,
                },
                _d),
        },
    ];
    API.write(types_1.WRITE_COMMANDS.SAVE_SEARCH, { jsonQuery: jsonQuery, newName: saveSearchName }, { optimisticData: optimisticData, failureData: failureData, successData: successData });
}
function deleteSavedSearch(hash) {
    var _a, _b, _c;
    var optimisticData = [
        {
            onyxMethod: react_native_onyx_1.default.METHOD.MERGE,
            key: "".concat(ONYXKEYS_1.default.SAVED_SEARCHES),
            value: (_a = {},
                _a[hash] = {
                    pendingAction: CONST_1.default.RED_BRICK_ROAD_PENDING_ACTION.DELETE,
                },
                _a),
        },
    ];
    var successData = [
        {
            onyxMethod: react_native_onyx_1.default.METHOD.MERGE,
            key: "".concat(ONYXKEYS_1.default.SAVED_SEARCHES),
            value: (_b = {},
                _b[hash] = null,
                _b),
        },
    ];
    var failureData = [
        {
            onyxMethod: react_native_onyx_1.default.METHOD.MERGE,
            key: "".concat(ONYXKEYS_1.default.SAVED_SEARCHES),
            value: (_c = {},
                _c[hash] = {
                    pendingAction: null,
                },
                _c),
        },
    ];
    API.write(types_1.WRITE_COMMANDS.DELETE_SAVED_SEARCH, { hash: hash }, { optimisticData: optimisticData, failureData: failureData, successData: successData });
}
function openSearchPage() {
    API.read(types_1.READ_COMMANDS.OPEN_SEARCH_PAGE, null);
}
function search(_a) {
    var _b;
    var queryJSON = _a.queryJSON, searchKey = _a.searchKey, offset = _a.offset, _c = _a.shouldCalculateTotals, shouldCalculateTotals = _c === void 0 ? false : _c, prevReportsLength = _a.prevReportsLength, _d = _a.isOffline, isOffline = _d === void 0 ? false : _d;
    var _e = getOnyxLoadingData(queryJSON.hash, queryJSON, offset, isOffline), optimisticData = _e.optimisticData, finallyData = _e.finallyData, failureData = _e.failureData;
    var flatFilters = queryJSON.flatFilters, queryJSONWithoutFlatFilters = __rest(queryJSON, ["flatFilters"]);
    var query = __assign(__assign({}, queryJSONWithoutFlatFilters), { searchKey: searchKey, offset: offset, filters: (_b = queryJSONWithoutFlatFilters.filters) !== null && _b !== void 0 ? _b : null, shouldCalculateTotals: shouldCalculateTotals });
    var jsonQuery = JSON.stringify(query);
    (0, ReportNavigation_1.saveLastSearchParams)({
        queryJSON: queryJSON,
        offset: offset,
        allowPostSearchRecount: false,
    });
    return (0, API_1.waitForWrites)(types_1.READ_COMMANDS.SEARCH).then(function () {
        // eslint-disable-next-line rulesdir/no-api-side-effects-method
        return API.makeRequestWithSideEffects(types_1.READ_COMMANDS.SEARCH, { hash: queryJSON.hash, jsonQuery: jsonQuery }, { optimisticData: optimisticData, finallyData: finallyData, failureData: failureData }).then(function (result) {
            var _a, _b, _c, _d, _e, _f;
            var response = (_b = (_a = result === null || result === void 0 ? void 0 : result.onyxData) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.value;
            var reports = Object.keys((_c = response === null || response === void 0 ? void 0 : response.data) !== null && _c !== void 0 ? _c : {})
                .filter(function (key) { return key.startsWith(ONYXKEYS_1.default.COLLECTION.REPORT); })
                .map(function (key) { return key.replace(ONYXKEYS_1.default.COLLECTION.REPORT, ''); });
            if ((_d = response === null || response === void 0 ? void 0 : response.search) === null || _d === void 0 ? void 0 : _d.offset) {
                // Indicates that search results are extended from the Report view (with navigation between reports),
                // using previous results to enable correct counter behavior.
                if (prevReportsLength) {
                    (0, ReportNavigation_1.saveLastSearchParams)({
                        queryJSON: queryJSON,
                        offset: offset,
                        hasMoreResults: !!((_e = response === null || response === void 0 ? void 0 : response.search) === null || _e === void 0 ? void 0 : _e.hasMoreResults),
                        previousLengthOfResults: prevReportsLength,
                        allowPostSearchRecount: false,
                    });
                }
            }
            else {
                // Applies to all searches from the Search View
                (0, ReportNavigation_1.saveLastSearchParams)({
                    queryJSON: queryJSON,
                    offset: offset,
                    hasMoreResults: !!((_f = response === null || response === void 0 ? void 0 : response.search) === null || _f === void 0 ? void 0 : _f.hasMoreResults),
                    previousLengthOfResults: reports.length,
                    allowPostSearchRecount: true,
                });
            }
            return result === null || result === void 0 ? void 0 : result.jsonCode;
        });
    });
}
/**
 * It's possible that we return legacy transactions that don't have a transaction thread created yet.
 * In that case, when users select the search result row, we need to create the transaction thread on the fly and update the search result with the new transactionThreadReport
 */
function updateSearchResultsWithTransactionThreadReportID(hash, transactionID, reportID) {
    var _a;
    var onyxUpdate = {
        data: (_a = {},
            _a["".concat(ONYXKEYS_1.default.COLLECTION.TRANSACTION).concat(transactionID)] = {
                transactionThreadReportID: reportID,
            },
            _a),
    };
    react_native_onyx_1.default.merge("".concat(ONYXKEYS_1.default.COLLECTION.SNAPSHOT).concat(hash), onyxUpdate);
}
function holdMoneyRequestOnSearch(hash, transactionIDList, comment, allTransactions, allReportActions) {
    var _a = getOnyxLoadingData(hash), optimisticData = _a.optimisticData, finallyData = _a.finallyData;
    transactionIDList.forEach(function (transactionID) {
        var _a;
        var _b, _c;
        var transaction = allTransactions === null || allTransactions === void 0 ? void 0 : allTransactions["".concat(ONYXKEYS_1.default.COLLECTION.TRANSACTION).concat(transactionID)];
        var reportActions = (_b = allReportActions === null || allReportActions === void 0 ? void 0 : allReportActions["".concat(ONYXKEYS_1.default.COLLECTION.REPORT_ACTIONS).concat(transaction === null || transaction === void 0 ? void 0 : transaction.reportID)]) !== null && _b !== void 0 ? _b : {};
        var iouReportAction = (0, ReportActionsUtils_1.getIOUActionForTransactionID)(Object.values(reportActions !== null && reportActions !== void 0 ? reportActions : {}), transactionID);
        if (iouReportAction) {
            optimisticData.push({
                key: "".concat(ONYXKEYS_1.default.COLLECTION.REPORT_ACTIONS).concat(transaction === null || transaction === void 0 ? void 0 : transaction.reportID),
                onyxMethod: react_native_onyx_1.default.METHOD.MERGE,
                value: (_a = {},
                    _a[iouReportAction.reportActionID] = {
                        childVisibleActionCount: ((_c = iouReportAction === null || iouReportAction === void 0 ? void 0 : iouReportAction.childVisibleActionCount) !== null && _c !== void 0 ? _c : 0) + 1,
                    },
                    _a),
            });
        }
    });
    API.write(types_1.WRITE_COMMANDS.HOLD_MONEY_REQUEST_ON_SEARCH, { hash: hash, transactionIDList: transactionIDList, comment: comment }, { optimisticData: optimisticData, finallyData: finallyData });
}
// eslint-disable-next-line @typescript-eslint/no-deprecated
function submitMoneyRequestOnSearch(hash, reportList, policy, transactionIDList, currentSearchKey) {
    var _a, _b;
    // eslint-disable-next-line @typescript-eslint/no-deprecated
    var createOnyxData = function (update, shouldRemoveReportFromView) {
        if (shouldRemoveReportFromView === void 0) { shouldRemoveReportFromView = false; }
        // eslint-disable-next-line @typescript-eslint/no-deprecated
        var data;
        if (transactionIDList) {
            data = Object.fromEntries(transactionIDList.map(function (transactionID) { return ["".concat(ONYXKEYS_1.default.COLLECTION.TRANSACTION).concat(transactionID), update]; }));
        }
        else if (shouldRemoveReportFromView) {
            // eslint-disable-next-line @typescript-eslint/no-deprecated
            data = Object.fromEntries(reportList.map(function (report) { return ["".concat(ONYXKEYS_1.default.COLLECTION.REPORT).concat(report.reportID), null]; }));
        }
        var optimisticData = [
            {
                onyxMethod: react_native_onyx_1.default.METHOD.MERGE,
                key: "".concat(ONYXKEYS_1.default.COLLECTION.SNAPSHOT).concat(hash),
                value: {
                    data: data,
                },
            },
        ];
        reportList.forEach(function (report) {
            optimisticData.push({
                onyxMethod: react_native_onyx_1.default.METHOD.MERGE,
                key: "".concat(ONYXKEYS_1.default.COLLECTION.REPORT_METADATA).concat(report.reportID),
                value: __assign({}, update),
            });
        });
        return optimisticData;
    };
    var optimisticData = createOnyxData({ isActionLoading: true });
    var failureData = createOnyxData({ isActionLoading: false });
    // If we are on the 'Submit' suggested search, remove the report from the view once the action is taken, don't wait for the view to be re-fetched via Search
    var successData = currentSearchKey === CONST_1.default.SEARCH.SEARCH_KEYS.SUBMIT ? createOnyxData({ isActionLoading: false }, true) : createOnyxData({ isActionLoading: false });
    // eslint-disable-next-line @typescript-eslint/no-deprecated
    var report = ((_a = reportList.at(0)) !== null && _a !== void 0 ? _a : {});
    var parameters = {
        reportID: report.reportID,
        managerAccountID: (_b = (0, PolicyUtils_1.getSubmitToAccountID)(policy.at(0), report)) !== null && _b !== void 0 ? _b : report === null || report === void 0 ? void 0 : report.managerID,
        reportActionID: (0, NumberUtils_1.rand64)(),
    };
    // The SubmitReport command is not 1:1:1 yet, which means creating a separate SubmitMoneyRequestOnSearch command is not feasible until https://github.com/Expensify/Expensify/issues/451223 is done.
    // In the meantime, we'll call SubmitReport which works for a single expense only, so not bulk actions are possible.
    API.write(types_1.WRITE_COMMANDS.SUBMIT_REPORT, parameters, { optimisticData: optimisticData, successData: successData, failureData: failureData });
}
function approveMoneyRequestOnSearch(hash, reportIDList, transactionIDList, currentSearchKey) {
    // eslint-disable-next-line @typescript-eslint/no-deprecated
    var createOnyxData = function (update, shouldRemoveReportFromView) {
        if (shouldRemoveReportFromView === void 0) { shouldRemoveReportFromView = false; }
        // eslint-disable-next-line @typescript-eslint/no-deprecated
        var data;
        if (transactionIDList) {
            data = Object.fromEntries(transactionIDList.map(function (transactionID) { return ["".concat(ONYXKEYS_1.default.COLLECTION.TRANSACTION).concat(transactionID), update]; }));
        }
        else if (shouldRemoveReportFromView) {
            // eslint-disable-next-line @typescript-eslint/no-deprecated
            data = Object.fromEntries(reportIDList.map(function (reportID) { return ["".concat(ONYXKEYS_1.default.COLLECTION.REPORT).concat(reportID), null]; }));
        }
        var optimisticData = [
            {
                onyxMethod: react_native_onyx_1.default.METHOD.MERGE,
                key: "".concat(ONYXKEYS_1.default.COLLECTION.SNAPSHOT).concat(hash),
                value: {
                    data: data,
                },
            },
        ];
        reportIDList.forEach(function (reportID) {
            optimisticData.push({
                onyxMethod: react_native_onyx_1.default.METHOD.MERGE,
                key: "".concat(ONYXKEYS_1.default.COLLECTION.REPORT_METADATA).concat(reportID),
                value: __assign({}, update),
            });
        });
        return optimisticData;
    };
    var optimisticData = createOnyxData({ isActionLoading: true });
    var failureData = createOnyxData({ isActionLoading: false, errors: (0, ErrorUtils_1.getMicroSecondOnyxErrorWithTranslationKey)('common.genericErrorMessage') });
    // If we are on the 'Approve', `Unapproved cash` or the `Unapproved company cards` suggested search, remove the report from the view once the action is taken, don't wait for the view to be re-fetched via Search
    var approveActionSuggestedSearches = [CONST_1.default.SEARCH.SEARCH_KEYS.APPROVE, CONST_1.default.SEARCH.SEARCH_KEYS.UNAPPROVED_CASH, CONST_1.default.SEARCH.SEARCH_KEYS.UNAPPROVED_CARD];
    var successData = approveActionSuggestedSearches.includes(currentSearchKey) ? createOnyxData({ isActionLoading: false }, true) : createOnyxData({ isActionLoading: false });
    (0, Sound_1.default)(Sound_1.SOUNDS.SUCCESS);
    API.write(types_1.WRITE_COMMANDS.APPROVE_MONEY_REQUEST_ON_SEARCH, { hash: hash, reportIDList: reportIDList }, { optimisticData: optimisticData, failureData: failureData, successData: successData });
}
function exportToIntegrationOnSearch(hash, reportID, connectionName, currentSearchKey) {
    var _a;
    var optimisticAction = (0, ReportUtils_1.buildOptimisticExportIntegrationAction)(connectionName);
    var successAction = __assign(__assign({}, optimisticAction), { pendingAction: null });
    var optimisticReportActionID = optimisticAction.reportActionID;
    var createOnyxData = function (update, reportAction, shouldRemoveReportFromView) {
        var _a, _b;
        if (shouldRemoveReportFromView === void 0) { shouldRemoveReportFromView = false; }
        var optimisticData = [
            {
                onyxMethod: react_native_onyx_1.default.METHOD.MERGE,
                key: "".concat(ONYXKEYS_1.default.COLLECTION.REPORT_METADATA).concat(reportID),
                value: __assign({}, update),
            },
            {
                onyxMethod: react_native_onyx_1.default.METHOD.MERGE,
                key: "".concat(ONYXKEYS_1.default.COLLECTION.REPORT_ACTIONS).concat(reportID),
                value: (_a = {},
                    _a[optimisticReportActionID] = reportAction,
                    _a),
            },
        ];
        if (shouldRemoveReportFromView) {
            optimisticData.push({
                onyxMethod: react_native_onyx_1.default.METHOD.MERGE,
                key: "".concat(ONYXKEYS_1.default.COLLECTION.SNAPSHOT).concat(hash),
                value: {
                    data: (_b = {},
                        _b["".concat(ONYXKEYS_1.default.COLLECTION.REPORT).concat(reportID)] = null,
                        _b),
                },
            });
        }
        return optimisticData;
    };
    var optimisticData = createOnyxData({ isActionLoading: true }, optimisticAction);
    var failureData = createOnyxData({ errors: (0, ErrorUtils_1.getMicroSecondOnyxErrorWithTranslationKey)('common.genericErrorMessage'), isActionLoading: false }, null);
    // If we are on the 'Export' suggested search, remove the report from the view once the action is taken, don't wait for the view to be re-fetched via Search
    var successData = currentSearchKey === CONST_1.default.SEARCH.SEARCH_KEYS.EXPORT ? createOnyxData({ isActionLoading: false }, successAction, true) : createOnyxData({ isActionLoading: false }, successAction);
    var params = {
        reportIDList: reportID,
        connectionName: connectionName,
        type: 'MANUAL',
        optimisticReportActions: JSON.stringify((_a = {},
            _a[reportID] = optimisticReportActionID,
            _a)),
    };
    API.write(types_1.WRITE_COMMANDS.REPORT_EXPORT, params, { optimisticData: optimisticData, failureData: failureData, successData: successData });
}
function payMoneyRequestOnSearch(hash, paymentData, transactionIDList, currentSearchKey) {
    // eslint-disable-next-line @typescript-eslint/no-deprecated
    var createOnyxData = function (update, shouldRemoveReportFromView) {
        if (shouldRemoveReportFromView === void 0) { shouldRemoveReportFromView = false; }
        // eslint-disable-next-line @typescript-eslint/no-deprecated
        var data;
        if (transactionIDList) {
            data = Object.fromEntries(transactionIDList.map(function (transactionID) { return ["".concat(ONYXKEYS_1.default.COLLECTION.TRANSACTION).concat(transactionID), update]; }));
        }
        else if (shouldRemoveReportFromView) {
            // eslint-disable-next-line @typescript-eslint/no-deprecated
            data = Object.fromEntries(paymentData.map(function (item) { return ["".concat(ONYXKEYS_1.default.COLLECTION.REPORT).concat(item.reportID), null]; }));
        }
        var optimisticData = [
            {
                onyxMethod: react_native_onyx_1.default.METHOD.MERGE,
                key: "".concat(ONYXKEYS_1.default.COLLECTION.SNAPSHOT).concat(hash),
                value: {
                    data: data,
                },
            },
        ];
        paymentData.forEach(function (item) {
            optimisticData.push({
                onyxMethod: react_native_onyx_1.default.METHOD.MERGE,
                key: "".concat(ONYXKEYS_1.default.COLLECTION.REPORT_METADATA).concat(item.reportID),
                value: __assign({}, update),
            });
        });
        return optimisticData;
    };
    var optimisticData = createOnyxData({ isActionLoading: true });
    var failureData = createOnyxData({ isActionLoading: false, errors: (0, ErrorUtils_1.getMicroSecondOnyxErrorWithTranslationKey)('common.genericErrorMessage') });
    // If we are on the 'Pay' suggested search, remove the report from the view once the action is taken, don't wait for the view to be re-fetched via Search
    var successData = currentSearchKey === CONST_1.default.SEARCH.SEARCH_KEYS.PAY ? createOnyxData({ isActionLoading: false }, true) : createOnyxData({ isActionLoading: false });
    // eslint-disable-next-line rulesdir/no-api-side-effects-method
    API.makeRequestWithSideEffects(types_1.SIDE_EFFECT_REQUEST_COMMANDS.PAY_MONEY_REQUEST_ON_SEARCH, { hash: hash, paymentData: JSON.stringify(paymentData) }, { optimisticData: optimisticData, failureData: failureData, successData: successData }).then(function (response) {
        if ((response === null || response === void 0 ? void 0 : response.jsonCode) !== CONST_1.default.JSON_CODE.SUCCESS) {
            return;
        }
        (0, Sound_1.default)(Sound_1.SOUNDS.SUCCESS);
    });
}
function unholdMoneyRequestOnSearch(hash, transactionIDList) {
    var _a = getOnyxLoadingData(hash), optimisticData = _a.optimisticData, finallyData = _a.finallyData;
    API.write(types_1.WRITE_COMMANDS.UNHOLD_MONEY_REQUEST_ON_SEARCH, { hash: hash, transactionIDList: transactionIDList }, { optimisticData: optimisticData, finallyData: finallyData });
}
function deleteMoneyRequestOnSearch(hash, transactionIDList, currentSearchResults) {
    var _a, _b;
    var currentMetadata = currentSearchResults === null || currentSearchResults === void 0 ? void 0 : currentSearchResults.search;
    // Calculate total amount of transactions being deleted
    var deletedTotal = transactionIDList.reduce(function (sum, transactionID) {
        var _a, _b;
        var transaction = (_a = currentSearchResults === null || currentSearchResults === void 0 ? void 0 : currentSearchResults.data) === null || _a === void 0 ? void 0 : _a["".concat(ONYXKEYS_1.default.COLLECTION.TRANSACTION).concat(transactionID)];
        return sum - ((_b = transaction === null || transaction === void 0 ? void 0 : transaction.convertedAmount) !== null && _b !== void 0 ? _b : 0);
    }, 0);
    var _c = getOnyxLoadingData(hash), loadingOptimisticData = _c.optimisticData, finallyData = _c.finallyData;
    // @ts-expect-error - will be solved in https://github.com/Expensify/App/issues/73830
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    var optimisticData = __spreadArray(__spreadArray([], loadingOptimisticData, true), [
        {
            onyxMethod: react_native_onyx_1.default.METHOD.MERGE,
            key: "".concat(ONYXKEYS_1.default.COLLECTION.SNAPSHOT).concat(hash),
            value: {
                data: Object.fromEntries(transactionIDList.map(function (transactionID) { return ["".concat(ONYXKEYS_1.default.COLLECTION.TRANSACTION).concat(transactionID), { pendingAction: CONST_1.default.RED_BRICK_ROAD_PENDING_ACTION.DELETE }]; })),
                search: __assign(__assign({}, (currentMetadata !== null && currentMetadata !== void 0 ? currentMetadata : {})), { count: Math.max(0, ((_a = currentMetadata === null || currentMetadata === void 0 ? void 0 : currentMetadata.count) !== null && _a !== void 0 ? _a : 0) - transactionIDList.length), total: ((_b = currentMetadata === null || currentMetadata === void 0 ? void 0 : currentMetadata.total) !== null && _b !== void 0 ? _b : 0) - deletedTotal }),
            },
        },
    ], false);
    var failureData = [
        {
            onyxMethod: react_native_onyx_1.default.METHOD.MERGE,
            key: "".concat(ONYXKEYS_1.default.COLLECTION.SNAPSHOT).concat(hash),
            value: {
                data: Object.fromEntries(transactionIDList.map(function (transactionID) { return ["".concat(ONYXKEYS_1.default.COLLECTION.TRANSACTION).concat(transactionID), { pendingAction: null }]; })),
                search: currentMetadata,
            },
        },
    ];
    API.write(types_1.WRITE_COMMANDS.DELETE_MONEY_REQUEST_ON_SEARCH, { hash: hash, transactionIDList: transactionIDList }, { optimisticData: optimisticData, failureData: failureData, finallyData: finallyData });
}
function exportSearchItemsToCSV(_a, onDownloadFailed) {
    var query = _a.query, jsonQuery = _a.jsonQuery, reportIDList = _a.reportIDList, transactionIDList = _a.transactionIDList;
    var reportIDListParams = [];
    reportIDList.forEach(function (reportID) {
        var allReportTransactions = (0, ReportUtils_1.getReportTransactions)(reportID).filter(function (transaction) { return transaction.pendingAction !== CONST_1.default.RED_BRICK_ROAD_PENDING_ACTION.DELETE; });
        var allTransactionIDs = allReportTransactions.map(function (transaction) { return transaction.transactionID; });
        if (allTransactionIDs.every(function (transactionID) { return transactionIDList.includes(transactionID); })) {
            if (reportIDListParams.includes(reportID)) {
                return;
            }
            reportIDListParams.push(reportID);
        }
    });
    var finalParameters = (0, enhanceParameters_1.default)(types_1.WRITE_COMMANDS.EXPORT_SEARCH_ITEMS_TO_CSV, {
        query: query,
        jsonQuery: jsonQuery,
        reportIDList: reportIDListParams,
        transactionIDList: transactionIDList,
    });
    var formData = new FormData();
    Object.entries(finalParameters).forEach(function (_a) {
        var key = _a[0], value = _a[1];
        if (Array.isArray(value)) {
            formData.append(key, value.join(','));
        }
        else {
            formData.append(key, (0, SafeString_1.default)(value));
        }
    });
    (0, fileDownload_1.default)((0, ApiUtils_1.getCommandURL)({ command: types_1.WRITE_COMMANDS.EXPORT_SEARCH_ITEMS_TO_CSV }), 'Expensify.csv', '', false, formData, CONST_1.default.NETWORK.METHOD.POST, onDownloadFailed);
}
function queueExportSearchItemsToCSV(_a) {
    var query = _a.query, jsonQuery = _a.jsonQuery, reportIDList = _a.reportIDList, transactionIDList = _a.transactionIDList;
    var finalParameters = (0, enhanceParameters_1.default)(types_1.WRITE_COMMANDS.EXPORT_SEARCH_ITEMS_TO_CSV, {
        query: query,
        jsonQuery: jsonQuery,
        reportIDList: reportIDList,
        transactionIDList: transactionIDList,
    });
    API.write(types_1.WRITE_COMMANDS.QUEUE_EXPORT_SEARCH_ITEMS_TO_CSV, finalParameters);
}
function queueExportSearchWithTemplate(_a) {
    var templateName = _a.templateName, templateType = _a.templateType, jsonQuery = _a.jsonQuery, reportIDList = _a.reportIDList, transactionIDList = _a.transactionIDList, policyID = _a.policyID;
    var finalParameters = (0, enhanceParameters_1.default)(types_1.WRITE_COMMANDS.QUEUE_EXPORT_SEARCH_WITH_TEMPLATE, {
        templateName: templateName,
        templateType: templateType,
        jsonQuery: jsonQuery,
        reportIDList: reportIDList,
        transactionIDList: transactionIDList,
        policyID: policyID,
    });
    API.write(types_1.WRITE_COMMANDS.QUEUE_EXPORT_SEARCH_WITH_TEMPLATE, finalParameters);
}
/**
 * Collates a list of export templates available to the user from their account, policy, and custom integrations templates
 * @param integrationsExportTemplates - The user's custom integrations export templates
 * @param csvExportLayouts - The user's custom account level export templates
 * @param policy - The user's policy
 * @param includeReportLevelExport - Whether to include the report level export template
 * @returns
 */
function getExportTemplates(integrationsExportTemplates, csvExportLayouts, translate, policy, includeReportLevelExport) {
    var _a;
    if (includeReportLevelExport === void 0) { includeReportLevelExport = true; }
    // Helper function to normalize template data into consistent ExportTemplate format
    var normalizeTemplate = function (templateName, template, type, description, policyID) {
        if (description === void 0) { description = ''; }
        return (__assign(__assign({}, template), { templateName: templateName, description: description, policyID: policyID, type: type }));
    };
    // By default, we always include the expense level export template
    var exportTemplates = [
        normalizeTemplate(CONST_1.default.REPORT.EXPORT_OPTIONS.EXPENSE_LEVEL_EXPORT, { name: translate('export.expenseLevelExport') }, CONST_1.default.EXPORT_TEMPLATE_TYPES.INTEGRATIONS),
    ];
    // Conditionally include the report level export template
    if (includeReportLevelExport) {
        exportTemplates.push(normalizeTemplate(CONST_1.default.REPORT.EXPORT_OPTIONS.REPORT_LEVEL_EXPORT, { name: translate('export.reportLevelExport') }, CONST_1.default.EXPORT_TEMPLATE_TYPES.INTEGRATIONS));
    }
    // Collate a list of the user's account level in-app export templates, excluding the Default CSV template
    var accountInAppTemplates = Object.entries(csvExportLayouts !== null && csvExportLayouts !== void 0 ? csvExportLayouts : {})
        .filter(function (_a) {
        var layout = _a[1];
        return layout.name !== CONST_1.default.REPORT.EXPORT_OPTION_LABELS.DEFAULT_CSV;
    })
        .map(function (_a) {
        var templateName = _a[0], layout = _a[1];
        return normalizeTemplate(templateName, layout, CONST_1.default.EXPORT_TEMPLATE_TYPES.IN_APP);
    });
    // If we have a policy, collate a list of the policy-level in-app export templates
    var policyInAppTemplates = policy
        ? Object.entries((_a = policy.exportLayouts) !== null && _a !== void 0 ? _a : {}).map(function (_a) {
            var templateName = _a[0], layout = _a[1];
            return normalizeTemplate(templateName, layout, CONST_1.default.EXPORT_TEMPLATE_TYPES.IN_APP, policy.name, policy.id);
        })
        : [];
    // Update the integrations export templates to include the name, description, policyID, and type
    var integrationsTemplates = integrationsExportTemplates.map(function (template) { return normalizeTemplate(template.name, template, CONST_1.default.EXPORT_TEMPLATE_TYPES.INTEGRATIONS); });
    return __spreadArray(__spreadArray(__spreadArray(__spreadArray([], exportTemplates, true), integrationsTemplates, true), accountInAppTemplates, true), policyInAppTemplates, true);
}
/**
 * Updates the form values for the advanced filters search form.
 */
function updateAdvancedFilters(values, shouldUseOnyxSetMethod) {
    if (shouldUseOnyxSetMethod === void 0) { shouldUseOnyxSetMethod = false; }
    if (shouldUseOnyxSetMethod) {
        react_native_onyx_1.default.set(ONYXKEYS_1.default.FORMS.SEARCH_ADVANCED_FILTERS_FORM, values);
        return;
    }
    react_native_onyx_1.default.merge(ONYXKEYS_1.default.FORMS.SEARCH_ADVANCED_FILTERS_FORM, values);
}
/**
 * Clears all values for the advanced filters search form.
 */
function clearAllFilters() {
    react_native_onyx_1.default.set(ONYXKEYS_1.default.FORMS.SEARCH_ADVANCED_FILTERS_FORM, null);
}
function clearAdvancedFilters() {
    var values = {};
    Object.values(SearchAdvancedFiltersForm_1.FILTER_KEYS)
        .filter(function (key) { return key !== SearchAdvancedFiltersForm_1.FILTER_KEYS.GROUP_BY; })
        .forEach(function (key) {
        if (key === SearchAdvancedFiltersForm_1.FILTER_KEYS.TYPE) {
            values[key] = CONST_1.default.SEARCH.DATA_TYPES.EXPENSE;
            return;
        }
        if (key === SearchAdvancedFiltersForm_1.FILTER_KEYS.STATUS) {
            values[key] = CONST_1.default.SEARCH.STATUS.EXPENSE.ALL;
            return;
        }
        values[key] = null;
    });
    react_native_onyx_1.default.merge(ONYXKEYS_1.default.FORMS.SEARCH_ADVANCED_FILTERS_FORM, values);
}
/**
 * For Expense reports, user can choose both expense and transaction, in this case we need to check for both selected reports and transactions
 * This function checks if all remaining selected transactions (not included in selectedReports) are eligible for bulk pay
 */
function shouldShowBulkOptionForRemainingTransactions(selectedTransactions, selectedReportIDs, transactionKeys) {
    if (!selectedTransactions || (0, isEmpty_1.default)(selectedTransactions)) {
        return true;
    }
    var neededFilterTransactions = transactionKeys === null || transactionKeys === void 0 ? void 0 : transactionKeys.filter(function (transactionIDKey) { return !(selectedReportIDs === null || selectedReportIDs === void 0 ? void 0 : selectedReportIDs.includes(selectedTransactions[transactionIDKey].reportID)); });
    if (!(neededFilterTransactions === null || neededFilterTransactions === void 0 ? void 0 : neededFilterTransactions.length)) {
        return true;
    }
    return neededFilterTransactions.every(function (transactionIDKey) { return selectedTransactions[transactionIDKey].action === CONST_1.default.SEARCH.ACTION_TYPES.PAY; });
}
/**
 * Checks if the current selected reports/transactions are eligible for bulk pay.
 */
function getPayOption(selectedReports, selectedTransactions, lastPaymentMethods, selectedReportIDs) {
    var _a;
    var transactionKeys = Object.keys(selectedTransactions !== null && selectedTransactions !== void 0 ? selectedTransactions : {});
    var firstTransaction = selectedTransactions === null || selectedTransactions === void 0 ? void 0 : selectedTransactions[(_a = transactionKeys.at(0)) !== null && _a !== void 0 ? _a : ''];
    var firstReport = selectedReports.at(0);
    var hasLastPaymentMethod = selectedReports.length > 0
        ? selectedReports.every(function (report) { return !!getLastPolicyPaymentMethod(report.policyID, lastPaymentMethods); })
        : transactionKeys.every(function (transactionIDKey) { return !!getLastPolicyPaymentMethod(selectedTransactions[transactionIDKey].policyID, lastPaymentMethods); });
    var shouldShowBulkPayOption = selectedReports.length > 0
        ? selectedReports.every(function (report) {
            return report.allActions.includes(CONST_1.default.SEARCH.ACTION_TYPES.PAY) &&
                // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
                ((hasLastPaymentMethod && report.policyID) || (getReportType(report.reportID) === getReportType(firstReport === null || firstReport === void 0 ? void 0 : firstReport.reportID) && report.policyID === (firstReport === null || firstReport === void 0 ? void 0 : firstReport.policyID))) &&
                shouldShowBulkOptionForRemainingTransactions(selectedTransactions, selectedReportIDs, transactionKeys);
        })
        : transactionKeys.every(function (transactionIDKey) {
            return selectedTransactions[transactionIDKey].action === CONST_1.default.SEARCH.ACTION_TYPES.PAY &&
                // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
                ((hasLastPaymentMethod && selectedTransactions[transactionIDKey].policyID) ||
                    (getReportType(selectedTransactions[transactionIDKey].reportID) === getReportType(firstTransaction === null || firstTransaction === void 0 ? void 0 : firstTransaction.reportID) &&
                        selectedTransactions[transactionIDKey].policyID === (firstTransaction === null || firstTransaction === void 0 ? void 0 : firstTransaction.policyID)));
        });
    return {
        shouldEnableBulkPayOption: shouldShowBulkPayOption,
        isFirstTimePayment: !hasLastPaymentMethod,
    };
}
/**
 * Checks if current menu item is a valid bulk pay option
 */
function isValidBulkPayOption(item) {
    if (!item.key) {
        return false;
    }
    return Object.values(CONST_1.default.PAYMENT_METHODS).includes(item.key) || Object.values(CONST_1.default.IOU.PAYMENT_TYPE).includes(item.key);
}
/**
 * Handles the click event when user selects bulk pay action.
 */
function handleBulkPayItemSelected(item, triggerKYCFlow, isAccountLocked, showLockedAccountModal, policy, latestBankItems, activeAdminPolicies, isUserValidated, confirmPayment) {
    var _a = (0, PaymentUtils_1.getActivePaymentType)(item.key, activeAdminPolicies, latestBankItems), paymentType = _a.paymentType, selectedPolicy = _a.selectedPolicy, shouldSelectPaymentMethod = _a.shouldSelectPaymentMethod;
    // Policy id is also a last payment method so we shouldn't early return here for that case.
    if (!isValidBulkPayOption(item) && !selectedPolicy) {
        return;
    }
    if (isAccountLocked) {
        showLockedAccountModal();
        return;
    }
    if (policy && (0, SubscriptionUtils_1.shouldRestrictUserBillableActions)(policy === null || policy === void 0 ? void 0 : policy.id)) {
        Navigation_1.default.navigate(ROUTES_1.default.RESTRICTED_ACTION.getRoute(policy === null || policy === void 0 ? void 0 : policy.id));
        return;
    }
    if (!!selectedPolicy || shouldSelectPaymentMethod) {
        if (!isUserValidated) {
            Navigation_1.default.navigate(ROUTES_1.default.SETTINGS_CONTACT_METHOD_VERIFY_ACCOUNT.getRoute(Navigation_1.default.getActiveRoute()));
            return;
        }
        triggerKYCFlow({
            event: undefined,
            iouPaymentType: paymentType,
            paymentMethod: item.key,
            policy: selectedPolicy,
        });
        if (paymentType === CONST_1.default.IOU.PAYMENT_TYPE.EXPENSIFY || paymentType === CONST_1.default.IOU.PAYMENT_TYPE.VBBA) {
            (0, BankAccounts_1.setPersonalBankAccountContinueKYCOnSuccess)(ROUTES_1.default.ENABLE_PAYMENTS);
        }
        return;
    }
    confirmPayment === null || confirmPayment === void 0 ? void 0 : confirmPayment(paymentType, item === null || item === void 0 ? void 0 : item.additionalData);
}
/**
 * Return true if selected reports/transactions have the same USD currency.
 */
function isCurrencySupportWalletBulkPay(selectedReports, selectedTransactions) {
    return (selectedReports === null || selectedReports === void 0 ? void 0 : selectedReports.length) > 0
        ? Object.values(selectedReports).every(function (report) { return (report === null || report === void 0 ? void 0 : report.currency) === CONST_1.default.CURRENCY.USD; })
        : Object.values(selectedTransactions).every(function (transaction) { return transaction.currency === CONST_1.default.CURRENCY.USD; });
}
/**
 * Return the payment params for paying invoice reports on Search.
 */
function getPayMoneyOnSearchInvoiceParams(policyID, payAsBusiness, methodID, paymentMethod) {
    var invoiceParams = {
        policyID: policyID,
        payAsBusiness: payAsBusiness,
    };
    if (paymentMethod === CONST_1.default.PAYMENT_METHODS.PERSONAL_BANK_ACCOUNT) {
        invoiceParams.bankAccountID = methodID;
    }
    if (paymentMethod === CONST_1.default.PAYMENT_METHODS.DEBIT_CARD) {
        invoiceParams.fundID = methodID;
    }
    return invoiceParams;
}
/**
 * Return the total amount of selected transactions/reports.
 */
function getTotalFormattedAmount(selectedReports, selectedTransactions, currency) {
    var transactionKeys = Object.keys(selectedTransactions !== null && selectedTransactions !== void 0 ? selectedTransactions : {});
    var totalAmount = selectedReports.length > 0
        ? selectedReports.reduce(function (acc, report) { var _a; return acc + ((_a = Math.abs(report.total)) !== null && _a !== void 0 ? _a : 0); }, 0)
        : transactionKeys.reduce(function (acc, transactionIdKey) { var _a; return acc + ((_a = Math.abs(selectedTransactions[transactionIdKey].amount)) !== null && _a !== void 0 ? _a : 0); }, 0);
    var formattedAmount = (0, CurrencyUtils_1.convertToDisplayString)(totalAmount, currency);
    return formattedAmount !== null && formattedAmount !== void 0 ? formattedAmount : '';
}
/* Optimistically sets the data necessary to show the transaction thread report right away if user opens it from the Search tab.
 *
 * When we open a transaction thread from the Search tab we already have all necessary information to show its preview without waiting for OpenReport API call to be finished.
 * So we generate necessary data optimistically: parent report, parent report action, transaction, and transaction thread report.
 * This way we provide users instant responsiveness when clicking search results.
 *
 * Note: we don't create anything new, we just optimistically generate the data that we know will be returned by API.
 */
function setOptimisticDataForTransactionThreadPreview(item, transactionPreviewData) {
    var _a;
    var moneyRequestReportActionID = item.moneyRequestReportActionID, reportID = item.reportID, report = item.report, amount = item.amount, currency = item.currency, transactionID = item.transactionID, created = item.created, transactionThreadReportID = item.transactionThreadReportID, policyID = item.policyID;
    var hasParentReport = transactionPreviewData.hasParentReport, hasParentReportAction = transactionPreviewData.hasParentReportAction, hasTransaction = transactionPreviewData.hasTransaction, hasTransactionThreadReport = transactionPreviewData.hasTransactionThreadReport;
    var onyxUpdates = [];
    // Set optimistic parent report
    if (!hasParentReport) {
        // @ts-expect-error - will be solved in https://github.com/Expensify/App/issues/73830
        onyxUpdates.push({
            onyxMethod: react_native_onyx_1.default.METHOD.MERGE,
            key: "".concat(ONYXKEYS_1.default.COLLECTION.REPORT).concat(reportID),
            value: report,
        });
    }
    // Set optimistic parent report action
    if (!hasParentReportAction && moneyRequestReportActionID) {
        var optimisticIOUAction = (0, ReportUtils_1.buildOptimisticIOUReportAction)({
            type: CONST_1.default.IOU.REPORT_ACTION_TYPE.CREATE,
            amount: amount,
            currency: currency,
            comment: '',
            participants: [],
            transactionID: transactionID,
            iouReportID: reportID,
            created: created,
            reportActionID: moneyRequestReportActionID,
            linkedExpenseReportAction: { childReportID: transactionThreadReportID },
        });
        optimisticIOUAction.pendingAction = undefined;
        onyxUpdates.push({
            onyxMethod: react_native_onyx_1.default.METHOD.MERGE,
            key: "".concat(ONYXKEYS_1.default.COLLECTION.REPORT_ACTIONS).concat(reportID),
            value: (_a = {}, _a[optimisticIOUAction.reportActionID] = optimisticIOUAction, _a),
        });
    }
    // Set optimistic transaction
    if (!hasTransaction) {
        onyxUpdates.push({
            onyxMethod: react_native_onyx_1.default.METHOD.MERGE,
            key: "".concat(ONYXKEYS_1.default.COLLECTION.TRANSACTION).concat(transactionID),
            value: item,
        });
    }
    // Set optimistic transaction thread report
    if (!hasTransactionThreadReport) {
        (0, Report_1.setOptimisticTransactionThread)(transactionThreadReportID, reportID, moneyRequestReportActionID, policyID);
    }
    react_native_onyx_1.default.update(onyxUpdates);
}
