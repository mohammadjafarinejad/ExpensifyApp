"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var ONYXKEYS_1 = require("@src/ONYXKEYS");
var useOnyx_1 = require("./useOnyx");
function useTransactionsByID(transactionIDs) {
    var transactionsSelector = (0, react_1.useCallback)(function (transactions) { var _a; return (_a = transactionIDs === null || transactionIDs === void 0 ? void 0 : transactionIDs.map(function (id) { return transactions === null || transactions === void 0 ? void 0 : transactions["".concat(ONYXKEYS_1.default.COLLECTION.TRANSACTION).concat(id)]; })) !== null && _a !== void 0 ? _a : []; }, [transactionIDs]);
    var transactions = (0, useOnyx_1.default)(ONYXKEYS_1.default.COLLECTION.TRANSACTION, {
        selector: transactionsSelector,
        canBeMissing: true,
    }, [transactionsSelector])[0];
    return [transactions];
}
exports.default = useTransactionsByID;
