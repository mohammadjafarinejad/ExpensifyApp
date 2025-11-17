"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
var react_native_onyx_1 = require("react-native-onyx");
var Log_1 = require("@libs/Log");
var ONYXKEYS_1 = require("@src/ONYXKEYS");
var EmptyObject_1 = require("@src/types/utils/EmptyObject");
// This migration moves filename from the transaction root to transaction.receipt.filename to match the database structure.
function default_1() {
    return new Promise(function (resolve) {
        // Connect to the TRANSACTION collection key in Onyx to get all of the stored transactions.
        // Go through each transaction and change the property name
        var connection = react_native_onyx_1.default.connectWithoutView({
            key: ONYXKEYS_1.default.COLLECTION.TRANSACTION,
            waitForCollectionCallback: true,
            callback: function (transactions) {
                react_native_onyx_1.default.disconnect(connection);
                if (!transactions || (0, EmptyObject_1.isEmptyObject)(transactions)) {
                    Log_1.default.info('[Migrate Onyx] Skipped migration RenameReceiptFilename because there are no transactions');
                    return resolve();
                }
                var transactionsWithReceipt = Object.values(transactions).filter(function (transaction) { return transaction === null || transaction === void 0 ? void 0 : transaction.filename; });
                if (!(transactionsWithReceipt === null || transactionsWithReceipt === void 0 ? void 0 : transactionsWithReceipt.length)) {
                    Log_1.default.info('[Migrate Onyx] Skipped migration RenameReceiptFilename because there were no transactions with the filename property');
                    return resolve();
                }
                Log_1.default.info('[Migrate Onyx] Running  RenameReceiptFilename migration');
                var dataToSave = transactionsWithReceipt === null || transactionsWithReceipt === void 0 ? void 0 : transactionsWithReceipt.reduce(function (acc, transaction) {
                    if (!transaction) {
                        return acc;
                    }
                    Log_1.default.info("[Migrate Onyx] Renaming filename ".concat(transaction.filename, " to receipt.filename"));
                    acc["".concat(ONYXKEYS_1.default.COLLECTION.TRANSACTION).concat(transaction.transactionID)] = {
                        receipt: {
                            filename: transaction.filename,
                        },
                        filename: null,
                    };
                    return acc;
                }, {});
                // eslint-disable-next-line rulesdir/prefer-actions-set-data
                react_native_onyx_1.default.mergeCollection(ONYXKEYS_1.default.COLLECTION.TRANSACTION, dataToSave).then(function () {
                    var _a;
                    Log_1.default.info("[Migrate Onyx] Ran migration RenameReceiptFilename and renamed ".concat((_a = Object.keys(dataToSave)) === null || _a === void 0 ? void 0 : _a.length, " properties"));
                    resolve();
                });
            },
        });
    });
}
