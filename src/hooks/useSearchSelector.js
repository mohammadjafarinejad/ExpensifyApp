"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var useSearchSelector_base_1 = require("./useSearchSelector.base");
/**
 * Hook that combines search functionality with selection logic for option lists.
 * Leverages heap optimization for performance with large datasets.
 * Web/desktop version without phone contacts integration.
 *
 * @param config - Configuration object for the hook
 * @returns Object with search and selection utilities
 */
function useSearchSelector(config) {
    return (0, useSearchSelector_base_1.default)(config);
}
exports.default = useSearchSelector;
