"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setActiveTransactionIDs = setActiveTransactionIDs;
exports.clearActiveTransactionIDs = clearActiveTransactionIDs;
var react_native_onyx_1 = require("react-native-onyx");
var ONYXKEYS_1 = require("@src/ONYXKEYS");
/**
 * When a single transaction report is displayed in RHP it may need extra context in case user navigated to it from MoneyRequestReportView or Reports
 * This context is the list of "sibling" transactions ids.
 * These "siblings" are transactions connected to the same parent Report that the original transaction.
 *
 * We save this value in onyx, so that we can correctly display navigation UI in transaction thread RHP.
 */
function setActiveTransactionIDs(ids) {
    return react_native_onyx_1.default.set(ONYXKEYS_1.default.TRANSACTION_THREAD_NAVIGATION_TRANSACTION_IDS, ids);
}
function clearActiveTransactionIDs() {
    return react_native_onyx_1.default.set(ONYXKEYS_1.default.TRANSACTION_THREAD_NAVIGATION_TRANSACTION_IDS, null);
}
