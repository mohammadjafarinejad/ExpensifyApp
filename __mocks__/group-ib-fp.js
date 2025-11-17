"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FPAttributeFormat = exports.FP = exports.Capability = exports.AndroidCapability = void 0;
var Capability = {
    BatteryStatus: 0,
    Cellular: 1,
    Call: 2,
    Passcode: 3,
    WebView: 4,
    Network: 5,
    Motion: 6,
    Swizzle: 7,
    Location: 8,
    Audio: 9,
    CloudIdentifier: 10,
    DeviceStatus: 11,
    Capture: 12,
    Apps: 13,
    Proxy: 14,
    Keyboard: 15,
    Behavior: 16,
    PreventScreenshots: 17,
    Security: 18,
    Advertise: 19,
    PortScan: 20,
    GlobalId: 21,
};
exports.Capability = Capability;
var FPAttributeFormat = {
    ClearText: 0,
    Hashed: 1,
    Encrypted: 2,
};
exports.FPAttributeFormat = FPAttributeFormat;
var AndroidCapability = {
    CellsCollection: 0,
    AccessPointsCollection: 1,
    Location: 2,
    GlobalIdentification: 3,
    CloudIdentification: 4,
    CallIdentification: 5,
    ActivityCollection: 6,
    MotionCollection: 7,
    PackageCollection: 8,
};
exports.AndroidCapability = AndroidCapability;
var FP = /** @class */ (function () {
    function FP() {
    }
    FP.getInstance = function () {
        return new FP();
    };
    FP.prototype.enableDebugLogs = function () { };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    FP.prototype.enableCapability = function () {
        var _a = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            _a[_i] = arguments[_i];
        }
    };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    FP.prototype.enableAndroidCapability = function () {
        var _a = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            _a[_i] = arguments[_i];
        }
    };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    FP.prototype.setCustomerId = function () {
        var _a = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            _a[_i] = arguments[_i];
        }
    };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    FP.prototype.setTargetURL = function () {
        var _a = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            _a[_i] = arguments[_i];
        }
    };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    FP.prototype.setGlobalIdURL = function () {
        var _a = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            _a[_i] = arguments[_i];
        }
    };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    FP.prototype.setSessionId = function () {
        var _a = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            _a[_i] = arguments[_i];
        }
    };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    FP.prototype.setAttributeTitle = function () {
        var _a = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            _a[_i] = arguments[_i];
        }
    };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    FP.prototype.setLogin = function () {
        var _a = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            _a[_i] = arguments[_i];
        }
    };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    FP.prototype.setCustomEvent = function () {
        var _a = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            _a[_i] = arguments[_i];
        }
    };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    FP.prototype.run = function () {
        var _a = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            _a[_i] = arguments[_i];
        }
    };
    return FP;
}());
exports.FP = FP;
