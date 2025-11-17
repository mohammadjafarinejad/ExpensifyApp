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
var native_1 = require("@react-navigation/native");
var react_1 = require("react");
var react_native_1 = require("react-native");
var react_webcam_1 = require("react-webcam");
var useThemeStyles_1 = require("@hooks/useThemeStyles");
// Wraps a camera that will only be active when the tab is focused or as soon as it starts to become focused.
function WebCamera(_a) {
    var itemRef = _a.itemRef, ref = _a.ref, props = __rest(_a, ["itemRef", "ref"]);
    var _b = (0, react_1.useState)(false), isInitialized = _b[0], setIsInitialized = _b[1];
    var shouldShowCamera = (0, native_1.useIsFocused)();
    var styles = (0, useThemeStyles_1.default)();
    if (!shouldShowCamera) {
        return null;
    }
    return (
    // Hide the camera during initialization to prevent random failures on some iOS versions.
    <react_native_1.View style={isInitialized ? [styles.dFlex, styles.flex1] : styles.dNone}>
            <react_webcam_1.default 
    // eslint-disable-next-line react/jsx-props-no-spreading
    {...props} onResize={function () { return setIsInitialized(true); }} ref={ref}/>
        </react_native_1.View>);
}
WebCamera.displayName = 'NavigationAwareCamera';
exports.default = WebCamera;
