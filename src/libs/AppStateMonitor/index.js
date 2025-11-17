"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_native_1 = require("react-native");
var CONST_1 = require("@src/CONST");
var shouldReportActivity_1 = require("./shouldReportActivity");
/**
 * Listener that will only fire the callback when the user has become active.
 * @returns callback to unsubscribe
 */
function addBecameActiveListener(callback) {
    var _a;
    var previousAppState = (_a = react_native_1.AppState.currentState) !== null && _a !== void 0 ? _a : CONST_1.default.APP_STATE.ACTIVE;
    function appStateChangeCallback(state) {
        if (shouldReportActivity_1.default && (previousAppState === CONST_1.default.APP_STATE.INACTIVE || previousAppState === CONST_1.default.APP_STATE.BACKGROUND) && state === CONST_1.default.APP_STATE.ACTIVE) {
            callback();
        }
        previousAppState = state;
    }
    var appStateChangeSubscription = react_native_1.AppState.addEventListener('change', appStateChangeCallback);
    return function () {
        if (!appStateChangeSubscription) {
            return;
        }
        appStateChangeSubscription.remove();
    };
}
exports.default = {
    addBecameActiveListener: addBecameActiveListener,
};
