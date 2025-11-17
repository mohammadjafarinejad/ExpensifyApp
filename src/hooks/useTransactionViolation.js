"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var ONYXKEYS_1 = require("@src/ONYXKEYS");
var useOnyx_1 = require("./useOnyx");
var transactionViolationsSelector = function (violations, eligibleTransactionIDs) {
    if (!eligibleTransactionIDs || eligibleTransactionIDs.size === 0) {
        return undefined;
    }
    return Object.fromEntries(Object.entries(violations !== null && violations !== void 0 ? violations : {}).filter(function (_a) {
        var key = _a[0];
        var id = key.replace(ONYXKEYS_1.default.COLLECTION.TRANSACTION_VIOLATIONS, '');
        return eligibleTransactionIDs === null || eligibleTransactionIDs === void 0 ? void 0 : eligibleTransactionIDs.has(id);
    }));
};
function useTransactionViolation(eligibleTransactionIDs) {
    var transactionViolationSelector = (0, react_1.useCallback)(function (violations) { return transactionViolationsSelector(violations, eligibleTransactionIDs); }, [eligibleTransactionIDs]);
    var transactionViolations = (0, useOnyx_1.default)(ONYXKEYS_1.default.COLLECTION.TRANSACTION_VIOLATIONS, {
        selector: transactionViolationSelector,
        canBeMissing: true,
    }, [transactionViolationSelector])[0];
    return transactionViolations;
}
exports.default = useTransactionViolation;
