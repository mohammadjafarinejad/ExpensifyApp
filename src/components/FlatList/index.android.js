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
// FlatList wrapped with the freeze component will lose its scroll state when frozen (only for Android).
// CustomFlatList saves the offset and use it for scrollToOffset() when unfrozen.
function CustomFlatList(_a) {
    var ref = _a.ref, props = __rest(_a, ["ref"]);
    var lastScrollOffsetRef = (0, react_1.useRef)(0);
    var onScreenFocus = (0, react_1.useCallback)(function () {
        if (typeof ref === 'function') {
            return;
        }
        if (!(ref === null || ref === void 0 ? void 0 : ref.current) || !lastScrollOffsetRef.current) {
            return;
        }
        if (ref.current && lastScrollOffsetRef.current) {
            ref.current.scrollToOffset({ offset: lastScrollOffsetRef.current, animated: false });
        }
    }, [ref]);
    // eslint-disable-next-line react-compiler/react-compiler, react-hooks/exhaustive-deps
    var onMomentumScrollEnd = (0, react_1.useCallback)(function (event) {
        lastScrollOffsetRef.current = event.nativeEvent.contentOffset.y;
    }, []);
    (0, native_1.useFocusEffect)((0, react_1.useCallback)(function () {
        onScreenFocus();
    }, [onScreenFocus]));
    return (<react_native_1.FlatList 
    // eslint-disable-next-line react/jsx-props-no-spreading
    {...props} onScroll={props.onScroll} onMomentumScrollEnd={onMomentumScrollEnd} ref={ref}/>);
}
CustomFlatList.displayName = 'CustomFlatListWithRef';
exports.default = CustomFlatList;
