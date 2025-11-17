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
var native_1 = require("@react-navigation/native");
var react_1 = require("react");
var PrevNextButtons_1 = require("@components/PrevNextButtons");
var WideRHPContextProvider_1 = require("@components/WideRHPContextProvider");
var useOnyx_1 = require("@hooks/useOnyx");
var Report_1 = require("@libs/actions/Report");
var TransactionThreadNavigation_1 = require("@libs/actions/TransactionThreadNavigation");
var ReportActionsUtils_1 = require("@libs/ReportActionsUtils");
var Navigation_1 = require("@navigation/Navigation");
var navigationRef_1 = require("@navigation/navigationRef");
var ONYXKEYS_1 = require("@src/ONYXKEYS");
var ROUTES_1 = require("@src/ROUTES");
var SCREENS_1 = require("@src/SCREENS");
var getEmptyArray_1 = require("@src/types/utils/getEmptyArray");
var parentReportActionIDsSelector = function (reportActions) {
    var _a;
    var parentActions = new Map();
    for (var _i = 0, _b = Object.values(reportActions !== null && reportActions !== void 0 ? reportActions : {}); _i < _b.length; _i++) {
        var action = _b[_i];
        var transactionID = (0, ReportActionsUtils_1.isMoneyRequestAction)(action) ? (_a = (0, ReportActionsUtils_1.getOriginalMessage)(action)) === null || _a === void 0 ? void 0 : _a.IOUTransactionID : undefined;
        if (!transactionID) {
            continue;
        }
        parentActions.set(transactionID, action);
    }
    return parentActions;
};
function MoneyRequestReportTransactionsNavigation(_a) {
    var currentTransactionID = _a.currentTransactionID, isFromReviewDuplicates = _a.isFromReviewDuplicates;
    var _b = (0, useOnyx_1.default)(ONYXKEYS_1.default.TRANSACTION_THREAD_NAVIGATION_TRANSACTION_IDS, {
        canBeMissing: true,
    })[0], transactionIDsList = _b === void 0 ? (0, getEmptyArray_1.default)() : _b;
    var markReportIDAsExpense = (0, react_1.useContext)(WideRHPContextProvider_1.WideRHPContext).markReportIDAsExpense;
    var _c = (0, react_1.useMemo)(function () {
        if (!transactionIDsList || transactionIDsList.length < 2) {
            return { prevTransactionID: undefined, nextTransactionID: undefined };
        }
        var currentTransactionIndex = transactionIDsList.findIndex(function (id) { return id === currentTransactionID; });
        var prevID = currentTransactionIndex > 0 ? transactionIDsList.at(currentTransactionIndex - 1) : undefined;
        var nextID = transactionIDsList.at(currentTransactionIndex + 1);
        return {
            prevTransactionID: prevID,
            nextTransactionID: nextID,
        };
    }, [currentTransactionID, transactionIDsList]), prevTransactionID = _c.prevTransactionID, nextTransactionID = _c.nextTransactionID;
    var prevNextTransactionsSelector = (0, react_1.useCallback)(function (allTransactions) {
        return [currentTransactionID, prevTransactionID, nextTransactionID].map(function (transactionID) { return allTransactions === null || allTransactions === void 0 ? void 0 : allTransactions["".concat(ONYXKEYS_1.default.COLLECTION.TRANSACTION).concat(transactionID)]; });
    }, [currentTransactionID, nextTransactionID, prevTransactionID]);
    var _d = (0, useOnyx_1.default)(ONYXKEYS_1.default.COLLECTION.TRANSACTION, {
        canBeMissing: true,
        selector: prevNextTransactionsSelector,
    })[0], _e = _d === void 0 ? (0, getEmptyArray_1.default)() : _d, currentTransaction = _e[0], prevTransaction = _e[1], nextTransaction = _e[2];
    var parentReportActionsSelector = (0, react_1.useCallback)(function (allReportActions) {
        var reportActions = {};
        for (var _i = 0, _a = [currentTransaction, prevTransaction, nextTransaction]; _i < _a.length; _i++) {
            var transaction = _a[_i];
            reportActions = __assign(__assign({}, reportActions), allReportActions === null || allReportActions === void 0 ? void 0 : allReportActions["".concat(ONYXKEYS_1.default.COLLECTION.REPORT_ACTIONS).concat(transaction === null || transaction === void 0 ? void 0 : transaction.reportID)]);
        }
        return parentReportActionIDsSelector(reportActions);
    }, [currentTransaction, nextTransaction, prevTransaction]);
    var _f = (0, useOnyx_1.default)(ONYXKEYS_1.default.COLLECTION.REPORT_ACTIONS, {
        canBeMissing: true,
        selector: parentReportActionsSelector,
    })[0], parentReportActions = _f === void 0 ? new Map() : _f;
    var _g = (0, react_1.useMemo)(function () {
        if (!transactionIDsList || transactionIDsList.length < 2) {
            return { prevParentReportAction: undefined, nextParentReportAction: undefined };
        }
        return {
            prevParentReportAction: prevTransactionID ? parentReportActions.get(prevTransactionID) : undefined,
            nextParentReportAction: nextTransactionID ? parentReportActions.get(nextTransactionID) : undefined,
        };
    }, [nextTransactionID, parentReportActions, prevTransactionID, transactionIDsList]), prevParentReportAction = _g.prevParentReportAction, nextParentReportAction = _g.nextParentReportAction;
    var parentReport = (0, useOnyx_1.default)("".concat(ONYXKEYS_1.default.COLLECTION.REPORT).concat(currentTransaction === null || currentTransaction === void 0 ? void 0 : currentTransaction.reportID), { canBeMissing: true })[0];
    var prevThreadReport = (0, useOnyx_1.default)("".concat(ONYXKEYS_1.default.COLLECTION.REPORT).concat(prevParentReportAction === null || prevParentReportAction === void 0 ? void 0 : prevParentReportAction.childReportID), { canBeMissing: true })[0];
    var nextThreadReport = (0, useOnyx_1.default)("".concat(ONYXKEYS_1.default.COLLECTION.REPORT).concat(nextParentReportAction === null || nextParentReportAction === void 0 ? void 0 : nextParentReportAction.childReportID), { canBeMissing: true })[0];
    /**
     * We clear the sibling transactionThreadIDs when unmounting this component
     * only when the mount actually goes to a different SCREEN (and not a different version of the same SCREEN)
     */
    (0, react_1.useEffect)(function () {
        return function () {
            var focusedRoute = (0, native_1.findFocusedRoute)(navigationRef_1.default.getRootState());
            if ((focusedRoute === null || focusedRoute === void 0 ? void 0 : focusedRoute.name) === SCREENS_1.default.SEARCH.REPORT_RHP || (focusedRoute === null || focusedRoute === void 0 ? void 0 : focusedRoute.name) === SCREENS_1.default.TRANSACTION_DUPLICATE.REVIEW) {
                return;
            }
            (0, TransactionThreadNavigation_1.clearActiveTransactionIDs)();
        };
    }, []);
    if (transactionIDsList.length < 2) {
        return;
    }
    var onNext = function (e) {
        var _a;
        e === null || e === void 0 ? void 0 : e.preventDefault();
        var backTo = Navigation_1.default.getActiveRoute();
        if (isFromReviewDuplicates) {
            var currentRoute = navigationRef_1.default.getCurrentRoute();
            var params = currentRoute === null || currentRoute === void 0 ? void 0 : currentRoute.params;
            backTo = (_a = params === null || params === void 0 ? void 0 : params.backTo) !== null && _a !== void 0 ? _a : backTo;
        }
        var nextThreadReportID = nextParentReportAction === null || nextParentReportAction === void 0 ? void 0 : nextParentReportAction.childReportID;
        var navigationParams = { reportID: nextThreadReportID, backTo: backTo };
        if (nextThreadReportID) {
            markReportIDAsExpense(nextThreadReportID);
        }
        // We know that the next thread report exists, it just wasn't fetched to Onyx yet, so we set it optimistically.
        if (!nextThreadReport && nextThreadReportID) {
            (0, Report_1.setOptimisticTransactionThread)(nextThreadReportID, parentReport === null || parentReport === void 0 ? void 0 : parentReport.reportID, nextParentReportAction === null || nextParentReportAction === void 0 ? void 0 : nextParentReportAction.reportActionID, parentReport === null || parentReport === void 0 ? void 0 : parentReport.policyID);
        }
        // The transaction thread doesn't exist yet, so we should create it
        if (!nextThreadReportID) {
            var transactionThreadReport = (0, Report_1.createTransactionThreadReport)(parentReport, nextParentReportAction);
            navigationParams.reportID = transactionThreadReport === null || transactionThreadReport === void 0 ? void 0 : transactionThreadReport.reportID;
        }
        // Wait for the next frame to ensure Onyx has processed the optimistic data updates from setOptimisticTransactionThread or createTransactionThreadReport before navigating
        requestAnimationFrame(function () { return Navigation_1.default.navigate(ROUTES_1.default.SEARCH_REPORT.getRoute(navigationParams), { forceReplace: true }); });
    };
    var onPrevious = function (e) {
        var _a;
        e === null || e === void 0 ? void 0 : e.preventDefault();
        var backTo = Navigation_1.default.getActiveRoute();
        if (isFromReviewDuplicates) {
            var currentRoute = navigationRef_1.default.getCurrentRoute();
            var params = currentRoute === null || currentRoute === void 0 ? void 0 : currentRoute.params;
            backTo = (_a = params === null || params === void 0 ? void 0 : params.backTo) !== null && _a !== void 0 ? _a : backTo;
        }
        var prevThreadReportID = prevParentReportAction === null || prevParentReportAction === void 0 ? void 0 : prevParentReportAction.childReportID;
        var navigationParams = { reportID: prevThreadReportID, backTo: backTo };
        if (prevThreadReportID) {
            markReportIDAsExpense(prevThreadReportID);
        }
        // We know that the previous thread report exists, it just wasn't fetched to Onyx yet, so we set it optimistically.
        if (!prevThreadReport && prevThreadReportID) {
            (0, Report_1.setOptimisticTransactionThread)(prevThreadReportID, parentReport === null || parentReport === void 0 ? void 0 : parentReport.reportID, prevParentReportAction === null || prevParentReportAction === void 0 ? void 0 : prevParentReportAction.reportActionID, parentReport === null || parentReport === void 0 ? void 0 : parentReport.policyID);
        }
        // The transaction thread doesn't exist yet, so we should create it
        if (!prevThreadReportID) {
            var transactionThreadReport = (0, Report_1.createTransactionThreadReport)(parentReport, prevParentReportAction);
            navigationParams.reportID = transactionThreadReport === null || transactionThreadReport === void 0 ? void 0 : transactionThreadReport.reportID;
        }
        // Wait for the next frame to ensure Onyx has processed the optimistic data updates from setOptimisticTransactionThread or createTransactionThreadReport before navigating
        requestAnimationFrame(function () { return Navigation_1.default.navigate(ROUTES_1.default.SEARCH_REPORT.getRoute(navigationParams), { forceReplace: true }); });
    };
    return (<PrevNextButtons_1.default isPrevButtonDisabled={!prevTransactionID} isNextButtonDisabled={!nextTransactionID} onNext={onNext} onPrevious={onPrevious}/>);
}
MoneyRequestReportTransactionsNavigation.displayName = 'MoneyRequestReportTransactionsNavigation';
exports.default = MoneyRequestReportTransactionsNavigation;
