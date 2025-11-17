"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_native_1 = require("react-native");
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
        // For iOS and other platforms, execute callback immediately
        cb();
        resolve();
    });
};
var utils = { dismiss: dismiss, dismissKeyboardAndExecute: dismissKeyboardAndExecute };
exports.default = utils;
