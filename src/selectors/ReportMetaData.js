"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isActionLoadingSetSelector = exports.isActionLoadingSelector = void 0;
var isActionLoadingSelector = function (reportMetadata) { var _a; return (_a = reportMetadata === null || reportMetadata === void 0 ? void 0 : reportMetadata.isActionLoading) !== null && _a !== void 0 ? _a : false; };
exports.isActionLoadingSelector = isActionLoadingSelector;
var isActionLoadingSetSelector = function (all) {
    var ids = new Set();
    if (!all) {
        return ids;
    }
    for (var _i = 0, _a = Object.entries(all); _i < _a.length; _i++) {
        var _b = _a[_i], key = _b[0], value = _b[1];
        if (value === null || value === void 0 ? void 0 : value.isActionLoading) {
            ids.add(key);
        }
    }
    return ids;
};
exports.isActionLoadingSetSelector = isActionLoadingSetSelector;
