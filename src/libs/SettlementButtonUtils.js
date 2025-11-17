"use strict";
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
exports.getSettlementButtonPaymentMethods = exports.handleUnvalidatedUserNavigation = void 0;
var Expensicons = require("@components/Icon/Expensicons");
var CONST_1 = require("@src/CONST");
var ROUTES_1 = require("@src/ROUTES");
var Log_1 = require("./Log");
var Navigation_1 = require("./Navigation/Navigation");
/**
 * Retrieves an array of available RouteMappings for an unvalidated user.
 * Each mapping contains a `check` function that determines whether the activeRoute matches the given mapping and a `navigate` function that executes navigation to the corresponding route.
 * @param chatReportID - The chat or workspace ID from which the unvalidated user makes a payment via SettlementButton
 * @param reportID - The expense report ID that the user pays using SettlementButton (optional)
 * @return An array of available RouteMappings suitable for an unvalidated user
 */
var getRouteMappings = function (chatReportID, reportID) {
    var nonReportIdRouteMappings = [
        {
            check: function (activeRoute) { return activeRoute.includes(ROUTES_1.default.SEARCH_ROOT.getRoute({ query: '' })); },
            navigate: function () { return Navigation_1.default.navigate(ROUTES_1.default.SEARCH_ROOT_VERIFY_ACCOUNT); },
        },
        {
            check: function (activeRoute) {
                return activeRoute.includes(ROUTES_1.default.MONEY_REQUEST_STEP_CONFIRMATION.getRoute(CONST_1.default.IOU.ACTION.CREATE, CONST_1.default.IOU.TYPE.PAY, CONST_1.default.IOU.OPTIMISTIC_TRANSACTION_ID, chatReportID));
            },
            navigate: function () {
                return Navigation_1.default.navigate(ROUTES_1.default.MONEY_REQUEST_STEP_CONFIRMATION_VERIFY_ACCOUNT.getRoute(CONST_1.default.IOU.ACTION.CREATE, CONST_1.default.IOU.TYPE.PAY, CONST_1.default.IOU.OPTIMISTIC_TRANSACTION_ID, chatReportID));
            },
        },
        {
            check: function (activeRoute) { return activeRoute.includes(ROUTES_1.default.REPORT_WITH_ID.getRoute(chatReportID)); },
            navigate: function () { return Navigation_1.default.navigate(ROUTES_1.default.REPORT_VERIFY_ACCOUNT.getRoute(chatReportID)); },
        },
    ];
    if (reportID === undefined) {
        return nonReportIdRouteMappings;
    }
    var reportIdRouteMappings = [
        {
            check: function (activeRoute) { return activeRoute.includes(ROUTES_1.default.SEARCH_MONEY_REQUEST_REPORT.getRoute({ reportID: reportID })); },
            navigate: function () { return Navigation_1.default.navigate(ROUTES_1.default.SEARCH_MONEY_REQUEST_REPORT_VERIFY_ACCOUNT.getRoute(reportID)); },
        },
        {
            check: function (activeRoute) { return activeRoute.includes(ROUTES_1.default.SEARCH_REPORT.getRoute({ reportID: reportID })); },
            navigate: function () { return Navigation_1.default.navigate(ROUTES_1.default.SEARCH_REPORT_VERIFY_ACCOUNT.getRoute(reportID)); },
        },
        {
            check: function (activeRoute) { return activeRoute.includes(ROUTES_1.default.REPORT_WITH_ID.getRoute(reportID)); },
            navigate: function () { return Navigation_1.default.navigate(ROUTES_1.default.REPORT_VERIFY_ACCOUNT.getRoute(reportID)); },
        },
    ];
    return __spreadArray(__spreadArray([], nonReportIdRouteMappings, true), reportIdRouteMappings, true);
};
/**
 * Handles SettlementButton navigation for unvalidated users based on the active route and current chatID, reportID (optional).
 */
var handleUnvalidatedUserNavigation = function (chatReportID, reportID) {
    var activeRoute = Navigation_1.default.getActiveRoute();
    var matchedRoute = getRouteMappings(chatReportID, reportID).find(function (mapping) { return mapping.check(activeRoute); });
    if (matchedRoute) {
        matchedRoute.navigate();
        return;
    }
    Log_1.default.warn('Failed to navigate to the correct path');
};
exports.handleUnvalidatedUserNavigation = handleUnvalidatedUserNavigation;
/**
 * Retrieves SettlementButton payment methods.
 */
var getSettlementButtonPaymentMethods = function (hasActivatedWallet, translate) {
    var _a;
    return _a = {},
        _a[CONST_1.default.PAYMENT_METHODS.PERSONAL_BANK_ACCOUNT] = {
            text: hasActivatedWallet ? translate('iou.settleWallet', { formattedAmount: '' }) : translate('iou.settlePersonal', { formattedAmount: '' }),
            icon: Expensicons.User,
            value: CONST_1.default.PAYMENT_METHODS.PERSONAL_BANK_ACCOUNT,
        },
        _a[CONST_1.default.PAYMENT_METHODS.BUSINESS_BANK_ACCOUNT] = {
            text: translate('iou.settleBusiness', { formattedAmount: '' }),
            icon: Expensicons.Building,
            value: CONST_1.default.PAYMENT_METHODS.BUSINESS_BANK_ACCOUNT,
        },
        _a[CONST_1.default.IOU.PAYMENT_TYPE.ELSEWHERE] = {
            text: translate('iou.payElsewhere', { formattedAmount: '' }),
            icon: Expensicons.CheckCircle,
            value: CONST_1.default.IOU.PAYMENT_TYPE.ELSEWHERE,
            shouldUpdateSelectedIndex: false,
        },
        _a;
};
exports.getSettlementButtonPaymentMethods = getSettlementButtonPaymentMethods;
