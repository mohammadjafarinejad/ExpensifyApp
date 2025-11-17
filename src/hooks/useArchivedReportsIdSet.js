"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ReportNameValuePairs_1 = require("@selectors/ReportNameValuePairs");
var ONYXKEYS_1 = require("@src/ONYXKEYS");
var useDeepCompareRef_1 = require("./useDeepCompareRef");
var useOnyx_1 = require("./useOnyx");
/**
 * Hook that returns a Set of archived report IDs
 */
function useArchivedReportsIdSet() {
    var _a;
    var _b = (0, useOnyx_1.default)(ONYXKEYS_1.default.COLLECTION.REPORT_NAME_VALUE_PAIRS, {
        canBeMissing: true,
        selector: ReportNameValuePairs_1.archivedReportsIdSetSelector,
    })[0], archivedReportsIdSet = _b === void 0 ? new Set() : _b;
    // useDeepCompareRef is used here to prevent unnecessary re-renders by maintaining referential equality
    // when the Set contents are the same, even if it's a new Set instance. This is important for performance
    // optimization since Sets are reference types and would normally cause re-renders even with same values
    return (_a = (0, useDeepCompareRef_1.default)(archivedReportsIdSet)) !== null && _a !== void 0 ? _a : new Set();
}
exports.default = useArchivedReportsIdSet;
