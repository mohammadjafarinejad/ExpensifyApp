"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
// eslint-disable-next-line no-restricted-imports
var react_native_1 = require("react-native");
var useTheme_1 = require("@hooks/useTheme");
var AppState_1 = require("@libs/AppState");
var CONST_1 = require("@src/CONST");
function ActivityIndicator(_a) {
    var _b = _a.timeout, timeout = _b === void 0 ? CONST_1.default.TIMING.ACTIVITY_INDICATOR_TIMEOUT : _b, extraLoadingContext = _a.extraLoadingContext, rest = __rest(_a, ["timeout", "extraLoadingContext"]);
    var theme = (0, useTheme_1.default)();
    (0, react_1.useEffect)(function () {
        var timeoutId = setTimeout(function () {
            (0, AppState_1.default)(extraLoadingContext, timeout);
        }, timeout);
        return function () {
            clearTimeout(timeoutId);
        };
    }, [extraLoadingContext, timeout]);
    return (<react_native_1.ActivityIndicator color={theme.spinner} 
    // eslint-disable-next-line react/jsx-props-no-spreading
    {...rest}/>);
}
ActivityIndicator.displayName = 'ActivityIndicator';
exports.default = ActivityIndicator;
