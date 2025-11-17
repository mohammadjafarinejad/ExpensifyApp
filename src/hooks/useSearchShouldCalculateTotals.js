"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var SearchQueryUtils_1 = require("@libs/SearchQueryUtils");
var CONST_1 = require("@src/CONST");
var ONYXKEYS_1 = require("@src/ONYXKEYS");
var useOnyx_1 = require("./useOnyx");
function useSearchShouldCalculateTotals(searchKey, similarSearchHash, enabled) {
    var savedSearches = (0, useOnyx_1.default)(ONYXKEYS_1.default.SAVED_SEARCHES, { canBeMissing: true })[0];
    var shouldCalculateTotals = (0, react_1.useMemo)(function () {
        if (!enabled) {
            return false;
        }
        var savedSearchValues = Object.values(savedSearches !== null && savedSearches !== void 0 ? savedSearches : {});
        if (!savedSearchValues.length && !searchKey) {
            return false;
        }
        var eligibleSearchKeys = [
            CONST_1.default.SEARCH.SEARCH_KEYS.SUBMIT,
            CONST_1.default.SEARCH.SEARCH_KEYS.APPROVE,
            CONST_1.default.SEARCH.SEARCH_KEYS.PAY,
            CONST_1.default.SEARCH.SEARCH_KEYS.EXPORT,
            CONST_1.default.SEARCH.SEARCH_KEYS.STATEMENTS,
            CONST_1.default.SEARCH.SEARCH_KEYS.UNAPPROVED_CASH,
            CONST_1.default.SEARCH.SEARCH_KEYS.UNAPPROVED_CARD,
            CONST_1.default.SEARCH.SEARCH_KEYS.RECONCILIATION,
        ];
        if (eligibleSearchKeys.includes(searchKey)) {
            return true;
        }
        for (var _i = 0, savedSearchValues_1 = savedSearchValues; _i < savedSearchValues_1.length; _i++) {
            var savedSearch = savedSearchValues_1[_i];
            var searchData = (0, SearchQueryUtils_1.buildSearchQueryJSON)(savedSearch.query);
            if (searchData && searchData.similarSearchHash === similarSearchHash) {
                return true;
            }
        }
        return false;
    }, [enabled, savedSearches, searchKey, similarSearchHash]);
    return shouldCalculateTotals;
}
exports.default = useSearchShouldCalculateTotals;
