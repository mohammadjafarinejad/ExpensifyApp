"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * This will prevent the composer's text input from focusing the next time it becomes the
 * first responder in the UIResponder chain. (iOS only, no-op on Android and web)
 */
var preventTextInputFocusOnFirstResponderOnce = function (composerRef) {
    var _a;
    (_a = composerRef.current) === null || _a === void 0 ? void 0 : _a.preventFocusOnFirstResponderOnce();
};
exports.default = preventTextInputFocusOnFirstResponderOnce;
