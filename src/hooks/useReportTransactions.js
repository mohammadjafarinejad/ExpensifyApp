"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var ONYXKEYS_1 = require("@src/ONYXKEYS");
var getEmptyArray_1 = require("@src/types/utils/getEmptyArray");
var useOnyx_1 = require("./useOnyx");
/**
 * Hook to get all transactions for a specific report
 */
function useReportTransactions(reportID) {
    var reportTransactionsSelector = (0, react_1.useCallback)(function (transactions) {
        if (!transactions || !reportID) {
            return [];
        }
        return Object.values(transactions).filter(function (transaction) { return !!transaction && transaction.reportID === reportID; });
    }, [reportID]);
    var _a = (0, useOnyx_1.default)(ONYXKEYS_1.default.COLLECTION.TRANSACTION, {
        selector: reportTransactionsSelector,
        canBeMissing: true,
    }, [reportTransactionsSelector])[0], reportTransactions = _a === void 0 ? (0, getEmptyArray_1.default)() : _a;
    return reportTransactions;
}
exports.default = useReportTransactions;
