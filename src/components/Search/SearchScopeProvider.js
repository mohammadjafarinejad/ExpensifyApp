"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useIsOnSearch = useIsOnSearch;
exports.SearchScopeProvider = SearchScopeProvider;
var react_1 = require("react");
var defaultSearchContext = {
    isOnSearch: false,
};
var SearchScopeContext = react_1.default.createContext(defaultSearchContext);
function SearchScopeProvider(_a) {
    var children = _a.children, _b = _a.isOnSearch, isOnSearch = _b === void 0 ? true : _b;
    var searchContext = (0, react_1.useMemo)(function () { return ({
        isOnSearch: isOnSearch,
    }); }, [isOnSearch]);
    return <SearchScopeContext.Provider value={searchContext}>{children}</SearchScopeContext.Provider>;
}
function useIsOnSearch() {
    var isOnSearch = (0, react_1.useContext)(SearchScopeContext).isOnSearch;
    return isOnSearch;
}
SearchScopeProvider.displayName = 'SearchScopeProvider';
