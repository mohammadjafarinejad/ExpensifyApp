"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var OnyxListItemProvider_1 = require("@components/OnyxListItemProvider");
var TransactionUtils_1 = require("@libs/TransactionUtils");
var ONYXKEYS_1 = require("@src/ONYXKEYS");
var useCurrentUserPersonalDetails_1 = require("./useCurrentUserPersonalDetails");
var DEFAULT_RETURN_VALUE = { transactions: {}, violations: {} };
function useTransactionsAndViolationsForReport(reportID) {
    var _a;
    var allReportsTransactionsAndViolations = (0, OnyxListItemProvider_1.useAllReportsTransactionsAndViolations)();
    var currentUserDetails = (0, useCurrentUserPersonalDetails_1.default)();
    var _b = reportID ? ((_a = allReportsTransactionsAndViolations === null || allReportsTransactionsAndViolations === void 0 ? void 0 : allReportsTransactionsAndViolations[reportID]) !== null && _a !== void 0 ? _a : DEFAULT_RETURN_VALUE) : DEFAULT_RETURN_VALUE, transactions = _b.transactions, violations = _b.violations;
    var transactionsAndViolations = (0, react_1.useMemo)(function () {
        var filteredViolations = Object.keys(violations).reduce(function (filteredTransactionViolations, transactionViolationKey) {
            var _a, _b, _c;
            var transactionID = (_a = transactionViolationKey.split('_').at(1)) !== null && _a !== void 0 ? _a : '';
            var transaction = transactions["".concat(ONYXKEYS_1.default.COLLECTION.TRANSACTION).concat(transactionID)];
            // This is our accumulator, it's okay to reassign
            // eslint-disable-next-line no-param-reassign
            filteredTransactionViolations[transactionViolationKey] = (_c = (0, TransactionUtils_1.getTransactionViolations)(transaction, violations, (_b = currentUserDetails.email) !== null && _b !== void 0 ? _b : '')) !== null && _c !== void 0 ? _c : [];
            return filteredTransactionViolations;
        }, {});
        return { transactions: transactions, violations: filteredViolations };
    }, [transactions, violations, currentUserDetails === null || currentUserDetails === void 0 ? void 0 : currentUserDetails.email]);
    return transactionsAndViolations;
}
exports.default = useTransactionsAndViolationsForReport;
