"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = getReceiptFilenameFromTransaction;
function getReceiptFilenameFromTransaction(transaction) {
    var _a;
    // Use ||, not ?? since we want empty string to fallback to the legacy transaction.filename
    // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
    return ((_a = transaction === null || transaction === void 0 ? void 0 : transaction.receipt) === null || _a === void 0 ? void 0 : _a.filename) || (transaction === null || transaction === void 0 ? void 0 : transaction.filename);
}
