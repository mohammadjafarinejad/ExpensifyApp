"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = useIsScrollLikelyLayoutTriggered;
var react_1 = require("react");
var useDebounce_1 = require("./useDebounce");
function useIsScrollLikelyLayoutTriggered() {
    // A flag to indicate whether the onScroll callback is likely triggered by a layout change (caused by text change) or not
    var isScrollLayoutTriggered = (0, react_1.useRef)(false);
    /**
     * Reset isScrollLikelyLayoutTriggered to false.
     *
     * The function is debounced with a handpicked wait time to address 2 issues:
     * 1. There is a slight delay between onChangeText and onScroll
     * 2. Layout change will trigger onScroll multiple times
     */
    var debouncedLowerIsScrollLayoutTriggered = (0, useDebounce_1.default)((0, react_1.useCallback)(function () { return (isScrollLayoutTriggered.current = false); }, []), 500);
    var raiseIsScrollLayoutTriggered = (0, react_1.useCallback)(function () {
        isScrollLayoutTriggered.current = true;
        debouncedLowerIsScrollLayoutTriggered();
    }, [debouncedLowerIsScrollLayoutTriggered]);
    return { isScrollLayoutTriggered: isScrollLayoutTriggered, raiseIsScrollLayoutTriggered: raiseIsScrollLayoutTriggered };
}
