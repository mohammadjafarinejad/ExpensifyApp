"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clearLastSearchParams = clearLastSearchParams;
exports.saveLastSearchParams = saveLastSearchParams;
var react_native_onyx_1 = require("react-native-onyx");
var ONYXKEYS_1 = require("@src/ONYXKEYS");
function saveLastSearchParams(value) {
    react_native_onyx_1.default.set(ONYXKEYS_1.default.REPORT_NAVIGATION_LAST_SEARCH_QUERY, value);
}
function clearLastSearchParams() {
    react_native_onyx_1.default.set(ONYXKEYS_1.default.REPORT_NAVIGATION_LAST_SEARCH_QUERY, {});
}
