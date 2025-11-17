"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_native_1 = require("react-native");
var react_native_keyboard_controller_1 = require("react-native-keyboard-controller");
var isVisible = false;
react_native_1.Keyboard.addListener('keyboardDidHide', function () {
    isVisible = false;
});
react_native_1.Keyboard.addListener('keyboardDidShow', function () {
    isVisible = true;
});
var dismiss = function () {
    return new Promise(function (resolve) {
        if (!isVisible) {
            resolve();
            return;
        }
        var subscription = react_native_1.Keyboard.addListener('keyboardDidHide', function () {
            resolve();
            subscription.remove();
        });
        react_native_1.Keyboard.dismiss();
    });
};
var dismissKeyboardAndExecute = function (cb) {
    return new Promise(function (resolve) {
        // This fixes a bug specific to Android < 16 (Platform.Version < 36)
        // https://github.com/Expensify/App/issues/70692
        if (!isVisible || Number(react_native_1.Platform.Version) >= 36) {
            cb();
            resolve();
            return;
        }
        var keyboardDidHideSubscription = react_native_keyboard_controller_1.KeyboardEvents.addListener('keyboardDidHide', function (e) {
            if (e.height !== 0) {
                resolve();
                return;
            }
            cb();
            keyboardDidHideSubscription.remove();
            resolve();
        });
        react_native_1.Keyboard.dismiss();
    });
};
var utils = { dismiss: dismiss, dismissKeyboardAndExecute: dismissKeyboardAndExecute };
exports.default = utils;
