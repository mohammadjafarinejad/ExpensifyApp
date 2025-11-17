"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var native_1 = require("@react-navigation/native");
var CONST_1 = require("@src/CONST");
/** We added a delay to focus on text input to allow navigation/modal animations to get completed,
see issue https://github.com/Expensify/App/issues/65855 for more details */
var useFocusAfterNav = function (ref, shouldDelayFocus) {
    if (shouldDelayFocus === void 0) { shouldDelayFocus = true; }
    (0, native_1.useFocusEffect)(function () {
        if (!shouldDelayFocus) {
            return;
        }
        var timeoutId = setTimeout(function () {
            var _a;
            (_a = ref.current) === null || _a === void 0 ? void 0 : _a.focus();
        }, CONST_1.default.ANIMATED_TRANSITION);
        return function () { return clearTimeout(timeoutId); };
    });
    return false;
};
exports.default = useFocusAfterNav;
