"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var ONYXKEYS_1 = require("@src/ONYXKEYS");
var getEmptyArray_1 = require("@src/types/utils/getEmptyArray");
var useOnyx_1 = require("./useOnyx");
/**
 * Hook to fetch transactions associated with a specific `tripRoom` report.
 *
 * Since trip rooms and their transactions lack a direct connection, this hook
 * fetches all child reports and transactions from Onyx and filters them to derive
 * relevant transactions for the given trip room.
 *
 * @param reportID - The trip room's reportID.
 * @returns Transactions linked to the specified trip room.
 */
function useTripTransactions(reportID) {
    var tripTransactionReportIDsSelector = (0, react_1.useCallback)(function (reports) {
        return Object.values(reports !== null && reports !== void 0 ? reports : {})
            .filter(function (report) { return report && report.chatReportID === reportID; })
            .map(function (report) { return report === null || report === void 0 ? void 0 : report.reportID; });
    }, [reportID]);
    var _a = (0, useOnyx_1.default)(ONYXKEYS_1.default.COLLECTION.REPORT, {
        selector: tripTransactionReportIDsSelector,
        canBeMissing: true,
    })[0], tripTransactionReportIDs = _a === void 0 ? (0, getEmptyArray_1.default)() : _a;
    var tripTransactionsSelector = (0, react_1.useCallback)(function (transactions) {
        if (!tripTransactionReportIDs.length) {
            return [];
        }
        return Object.values(transactions !== null && transactions !== void 0 ? transactions : {}).filter(function (transaction) { return !!transaction && tripTransactionReportIDs.includes(transaction.reportID); });
    }, [tripTransactionReportIDs]);
    var _b = (0, useOnyx_1.default)(ONYXKEYS_1.default.COLLECTION.TRANSACTION, {
        selector: tripTransactionsSelector,
        canBeMissing: true,
    }, [tripTransactionsSelector])[0], tripTransactions = _b === void 0 ? (0, getEmptyArray_1.default)() : _b;
    return tripTransactions;
}
exports.default = useTripTransactions;
