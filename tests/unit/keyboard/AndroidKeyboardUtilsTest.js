"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var mockKeyboardListeners = {};
var mockKeyboardControllerListeners = {};
var mockDismissKeyboard = jest.fn();
jest.mock('react-native', function () { return ({
    Keyboard: {
        dismiss: mockDismissKeyboard,
        addListener: jest.fn(function (event, handler) {
            mockKeyboardListeners[event] = mockKeyboardListeners[event] || [];
            mockKeyboardListeners[event].push(handler);
            return {
                remove: jest.fn(function () {
                    mockKeyboardListeners[event] = mockKeyboardListeners[event].filter(function (h) { return h !== handler; });
                }),
            };
        }),
    },
    Platform: {
        Version: 35,
    },
}); });
// Mock react-native-keyboard-controller
jest.mock('react-native-keyboard-controller', function () { return ({
    KeyboardEvents: {
        addListener: jest.fn(function (event, handler) {
            mockKeyboardControllerListeners[event] = mockKeyboardControllerListeners[event] || [];
            mockKeyboardControllerListeners[event].push(handler);
            return {
                remove: jest.fn(function () {
                    mockKeyboardControllerListeners[event] = mockKeyboardControllerListeners[event].filter(function (h) { return h !== handler; });
                }),
            };
        }),
    },
}); });
var triggerKeyboardEvent = function (event, data) {
    if (data === void 0) { data = {}; }
    (mockKeyboardListeners[event] || []).forEach(function (handler) { return handler(data); });
};
var triggerKeyboardControllerEvent = function (event, data) {
    if (data === void 0) { data = {}; }
    (mockKeyboardControllerListeners[event] || []).forEach(function (handler) { return handler(data); });
};
var clearListeners = function () {
    Object.keys(mockKeyboardListeners).forEach(function (key) {
        mockKeyboardListeners[key] = [];
    });
    Object.keys(mockKeyboardControllerListeners).forEach(function (key) {
        mockKeyboardControllerListeners[key] = [];
    });
};
describe('Keyboard utils: Android', function () {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    var utils;
    beforeEach(function () {
        // Clear all mocks
        jest.clearAllMocks();
        clearListeners();
        // Clear module cache and reimport to reset isVisible state
        jest.resetModules();
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        utils = require('@src/utils/keyboard/index.android').default;
    });
    describe('dismiss', function () {
        it('should resolve immediately when keyboard is not visible', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: 
                    // Keyboard starts as not visible (isVisible = false)
                    return [4 /*yield*/, expect(utils.dismiss()).resolves.toBeUndefined()];
                    case 1:
                        // Keyboard starts as not visible (isVisible = false)
                        _a.sent();
                        expect(mockDismissKeyboard).not.toHaveBeenCalled();
                        return [2 /*return*/];
                }
            });
        }); });
        it('should wait for keyboardDidHide event when keyboard is visible', function () { return __awaiter(void 0, void 0, void 0, function () {
            var dismissPromise, resolved;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        triggerKeyboardEvent('keyboardDidShow');
                        dismissPromise = utils.dismiss();
                        resolved = false;
                        dismissPromise.then(function () {
                            resolved = true;
                        });
                        expect(resolved).toBe(false);
                        expect(mockDismissKeyboard).toHaveBeenCalledTimes(1);
                        triggerKeyboardEvent('keyboardDidHide');
                        return [4 /*yield*/, dismissPromise];
                    case 1:
                        _a.sent();
                        expect(resolved).toBe(true);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should remove listener after keyboard is hidden', function () { return __awaiter(void 0, void 0, void 0, function () {
            var dismissPromise, subscriptionsCount;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        triggerKeyboardEvent('keyboardDidShow');
                        dismissPromise = utils.dismiss();
                        subscriptionsCount = mockKeyboardListeners.keyboardDidHide.length;
                        triggerKeyboardEvent('keyboardDidHide');
                        return [4 /*yield*/, dismissPromise];
                    case 1:
                        _a.sent();
                        expect(mockKeyboardListeners.keyboardDidHide.length).toBe(subscriptionsCount - 1);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should handle multiple concurrent dismiss calls', function () { return __awaiter(void 0, void 0, void 0, function () {
            var promise1, promise2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        triggerKeyboardEvent('keyboardDidShow');
                        promise1 = utils.dismiss();
                        promise2 = utils.dismiss();
                        triggerKeyboardEvent('keyboardDidHide');
                        return [4 /*yield*/, expect(Promise.all([promise1, promise2])).resolves.toEqual([undefined, undefined])];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('dismissKeyboardAndExecute', function () {
        it('should execute callback immediately when keyboard is not visible', function () { return __awaiter(void 0, void 0, void 0, function () {
            var callback;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        callback = jest.fn();
                        return [4 /*yield*/, utils.dismissKeyboardAndExecute(callback)];
                    case 1:
                        _a.sent();
                        expect(callback).toHaveBeenCalledTimes(1);
                        expect(mockDismissKeyboard).not.toHaveBeenCalled();
                        return [2 /*return*/];
                }
            });
        }); });
        it('should wait for keyboardDidHide with height=0 on Android when keyboard is visible', function () { return __awaiter(void 0, void 0, void 0, function () {
            var callback, executePromise;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        triggerKeyboardEvent('keyboardDidShow');
                        callback = jest.fn();
                        executePromise = utils.dismissKeyboardAndExecute(callback);
                        expect(callback).not.toHaveBeenCalled();
                        expect(mockDismissKeyboard).toHaveBeenCalledTimes(1);
                        triggerKeyboardControllerEvent('keyboardDidHide', { height: 0 });
                        return [4 /*yield*/, executePromise];
                    case 1:
                        _a.sent();
                        expect(callback).toHaveBeenCalledTimes(1);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should ignore keyboardDidHide event when height is not 0', function () { return __awaiter(void 0, void 0, void 0, function () {
            var callback, executePromise;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        triggerKeyboardEvent('keyboardDidShow');
                        callback = jest.fn();
                        executePromise = utils.dismissKeyboardAndExecute(callback);
                        // Trigger hide with height != 0
                        triggerKeyboardControllerEvent('keyboardDidHide', { height: 100 });
                        return [4 /*yield*/, executePromise];
                    case 1:
                        _a.sent();
                        expect(callback).not.toHaveBeenCalled();
                        triggerKeyboardControllerEvent('keyboardDidHide', { height: 0 });
                        expect(callback).toHaveBeenCalledTimes(1);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should remove listener after callback is executed', function () { return __awaiter(void 0, void 0, void 0, function () {
            var callback, executePromise, subscriptionsCount;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        triggerKeyboardEvent('keyboardDidShow');
                        callback = jest.fn();
                        executePromise = utils.dismissKeyboardAndExecute(callback);
                        subscriptionsCount = mockKeyboardControllerListeners.keyboardDidHide.length;
                        expect(callback).not.toHaveBeenCalled();
                        triggerKeyboardControllerEvent('keyboardDidHide', { height: 0 });
                        expect(mockDismissKeyboard).toHaveBeenCalledTimes(1);
                        return [4 /*yield*/, executePromise];
                    case 1:
                        _a.sent();
                        expect(callback).toHaveBeenCalledTimes(1);
                        expect(mockKeyboardControllerListeners.keyboardDidHide.length).toBe(subscriptionsCount - 1);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should handle multiple events before height=0', function () { return __awaiter(void 0, void 0, void 0, function () {
            var callback, executePromise;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        triggerKeyboardEvent('keyboardDidShow');
                        callback = jest.fn();
                        executePromise = utils.dismissKeyboardAndExecute(callback);
                        // Trigger multiple events with wrong height
                        triggerKeyboardControllerEvent('keyboardDidHide', { height: 200 });
                        triggerKeyboardControllerEvent('keyboardDidHide', { height: 150 });
                        triggerKeyboardControllerEvent('keyboardDidHide', { height: 50 });
                        return [4 /*yield*/, executePromise];
                    case 1:
                        _a.sent();
                        expect(callback).not.toHaveBeenCalled();
                        triggerKeyboardControllerEvent('keyboardDidHide', { height: 0 });
                        expect(callback).toHaveBeenCalledTimes(1);
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('isVisible state management', function () {
        it('should track keyboard visibility across multiple show/hide events', function () { return __awaiter(void 0, void 0, void 0, function () {
            var promise1, promise2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, expect(utils.dismiss()).resolves.toBeUndefined()];
                    case 1:
                        _a.sent();
                        triggerKeyboardEvent('keyboardDidShow');
                        promise1 = utils.dismiss();
                        triggerKeyboardEvent('keyboardDidHide');
                        return [4 /*yield*/, promise1];
                    case 2:
                        _a.sent();
                        triggerKeyboardEvent('keyboardDidShow');
                        promise2 = utils.dismiss();
                        triggerKeyboardEvent('keyboardDidHide');
                        return [4 /*yield*/, promise2];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, expect(utils.dismiss()).resolves.toBeUndefined()];
                    case 4:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('should properly track state when dismiss is called while keyboard is showing', function () { return __awaiter(void 0, void 0, void 0, function () {
            var dismissPromise;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        triggerKeyboardEvent('keyboardDidShow');
                        dismissPromise = utils.dismiss();
                        triggerKeyboardEvent('keyboardDidHide');
                        return [4 /*yield*/, dismissPromise];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, expect(utils.dismiss()).resolves.toBeUndefined()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
