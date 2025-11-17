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
exports.transactionDraftReceiptsViewSelector = exports.transactionDraftReceiptsSelector = exports.transactionDraftValuesSelector = void 0;
var transactionDraftValuesSelector = function (items) { return Object.values(items !== null && items !== void 0 ? items : {}); };
exports.transactionDraftValuesSelector = transactionDraftValuesSelector;
var transactionDraftReceiptsSelector = function (items) {
    return Object.values(items !== null && items !== void 0 ? items : {})
        .map(function (transaction) { return ((transaction === null || transaction === void 0 ? void 0 : transaction.receipt) ? __assign(__assign({}, transaction === null || transaction === void 0 ? void 0 : transaction.receipt), { transactionID: transaction.transactionID }) : undefined); })
        .filter(function (receipt) { return !!receipt; });
};
exports.transactionDraftReceiptsSelector = transactionDraftReceiptsSelector;
var transactionDraftReceiptsViewSelector = function (items) {
    return Object.values(items !== null && items !== void 0 ? items : {})
        .map(function (transaction) { return ((transaction === null || transaction === void 0 ? void 0 : transaction.receipt) ? __assign(__assign({}, transaction === null || transaction === void 0 ? void 0 : transaction.receipt), { transactionID: transaction.transactionID }) : undefined); })
        .filter(function (receipt) { return !!receipt; });
};
exports.transactionDraftReceiptsViewSelector = transactionDraftReceiptsViewSelector;
