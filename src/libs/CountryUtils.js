"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalizeCountryCode = normalizeCountryCode;
exports.getCountryCode = getCountryCode;
var CONST_1 = require("@src/CONST");
/**
 * Normalizes the address containing a country field by converting country names to country codes.
 * Handles the case where old data has "United States" instead of "US".
 */
function normalizeCountryCode(data) {
    if (!(data === null || data === void 0 ? void 0 : data.country)) {
        return data;
    }
    var normalizedCountry = getCountryCode(data.country);
    if (!normalizedCountry) {
        return data;
    }
    return __assign(__assign({}, data), { country: normalizedCountry });
}
function getCountryCode(countryValue) {
    for (var _i = 0, _a = Object.entries(CONST_1.default.ALL_COUNTRIES); _i < _a.length; _i++) {
        var _b = _a[_i], code = _b[0], name_1 = _b[1];
        if (name_1 === countryValue) {
            return code;
        }
    }
    return countryValue;
}
