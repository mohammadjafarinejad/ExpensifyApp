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
var BaseInvertedFlatList_1 = require("./BaseInvertedFlatList");
var CellRendererComponent_1 = require("./CellRendererComponent");
function BaseInvertedFlatListWithRef(_a) {
    var ref = _a.ref, props = __rest(_a, ["ref"]);
    return (<BaseInvertedFlatList_1.default 
    // eslint-disable-next-line react/jsx-props-no-spreading
    {...props} ref={ref} CellRendererComponent={CellRendererComponent_1.default} 
    /**
     * To achieve absolute positioning and handle overflows for list items, the property must be disabled
     * for Android native builds.
     * Source: https://reactnative.dev/docs/0.71/optimizing-flatlist-configuration#removeclippedsubviews
     */
    removeClippedSubviews={false}/>);
}
BaseInvertedFlatListWithRef.displayName = 'BaseInvertedFlatListWithRef';
exports.default = BaseInvertedFlatListWithRef;
