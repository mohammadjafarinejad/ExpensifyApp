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
exports.networkStatusSelector = void 0;
var CONST_1 = require("@src/CONST");
var networkStatusSelector = function (networkData) {
    if (!networkData) {
        return __assign(__assign({}, CONST_1.default.DEFAULT_NETWORK_DATA), { networkStatus: CONST_1.default.NETWORK.NETWORK_STATUS.UNKNOWN });
    }
    return {
        isOffline: networkData.isOffline,
        networkStatus: networkData.networkStatus,
        lastOfflineAt: networkData.lastOfflineAt,
    };
};
exports.networkStatusSelector = networkStatusSelector;
