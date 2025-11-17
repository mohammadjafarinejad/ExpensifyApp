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
var react_native_onyx_1 = require("react-native-onyx");
var Delegate_1 = require("@libs/actions/Delegate");
var SequentialQueue_1 = require("@libs/Network/SequentialQueue");
var CONST_1 = require("@src/CONST");
var OnyxUpdateManager_1 = require("@src/libs/actions/OnyxUpdateManager");
var ONYXKEYS_1 = require("@src/ONYXKEYS");
var waitForBatchedUpdates_1 = require("../utils/waitForBatchedUpdates");
(0, OnyxUpdateManager_1.default)();
describe('actions/Delegate', function () {
    beforeAll(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    react_native_onyx_1.default.init({
                        keys: ONYXKEYS_1.default,
                    });
                    return [4 /*yield*/, (0, waitForBatchedUpdates_1.default)()];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, react_native_onyx_1.default.clear()];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, (0, waitForBatchedUpdates_1.default)()];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    describe('clearDelegatorErrors', function () {
        it('should clear delegator errors', function () { return __awaiter(void 0, void 0, void 0, function () {
            var delegatedAccess;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        delegatedAccess = {
                            delegators: [
                                {
                                    email: 'test@test.com',
                                    // @ts-expect-error - errorFields is not defined in the type
                                    errorFields: {
                                        addDelegate: {
                                            // eslint-disable-next-line @typescript-eslint/naming-convention
                                            '12211': {
                                                email: 'Invalid email address',
                                            },
                                        },
                                    },
                                },
                            ],
                        };
                        return [4 /*yield*/, react_native_onyx_1.default.merge(ONYXKEYS_1.default.ACCOUNT, { delegatedAccess: delegatedAccess })];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, (0, waitForBatchedUpdates_1.default)()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, new Promise(function (resolve) {
                                var connection = react_native_onyx_1.default.connect({
                                    key: ONYXKEYS_1.default.ACCOUNT,
                                    callback: function (account) {
                                        var _a, _b, _c;
                                        // @ts-expect-error - errorFields is not defined in the type
                                        expect((_c = (_b = (_a = account === null || account === void 0 ? void 0 : account.delegatedAccess) === null || _a === void 0 ? void 0 : _a.delegators) === null || _b === void 0 ? void 0 : _b.at(0)) === null || _c === void 0 ? void 0 : _c.errorFields).toBeDefined();
                                        react_native_onyx_1.default.disconnect(connection);
                                        resolve();
                                    },
                                });
                            })];
                    case 3:
                        _a.sent();
                        (0, Delegate_1.clearDelegatorErrors)({ delegatedAccess: delegatedAccess });
                        return [4 /*yield*/, (0, waitForBatchedUpdates_1.default)()];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, new Promise(function (resolve) {
                                var connection = react_native_onyx_1.default.connect({
                                    key: ONYXKEYS_1.default.ACCOUNT,
                                    callback: function (account) {
                                        var _a, _b, _c;
                                        // @ts-expect-error - errorFields is not defined in the type
                                        expect((_c = (_b = (_a = account === null || account === void 0 ? void 0 : account.delegatedAccess) === null || _a === void 0 ? void 0 : _a.delegators) === null || _b === void 0 ? void 0 : _b.at(0)) === null || _c === void 0 ? void 0 : _c.errorFields).toBeUndefined();
                                        react_native_onyx_1.default.disconnect(connection);
                                        resolve();
                                    },
                                });
                            })];
                    case 5:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('addDelegate', function () {
        it('should add a delegate', function () { return __awaiter(void 0, void 0, void 0, function () {
            var delegatedAccess;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        delegatedAccess = {
                            delegates: [],
                        };
                        return [4 /*yield*/, (0, waitForBatchedUpdates_1.default)()];
                    case 1:
                        _a.sent();
                        (0, Delegate_1.addDelegate)({ email: 'test@test.com', role: CONST_1.default.DELEGATE_ROLE.ALL, validateCode: '123456', delegatedAccess: delegatedAccess });
                        return [4 /*yield*/, (0, waitForBatchedUpdates_1.default)()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, new Promise(function (resolve) {
                                var connection = react_native_onyx_1.default.connect({
                                    key: ONYXKEYS_1.default.ACCOUNT,
                                    callback: function (account) {
                                        var _a, _b, _c, _d, _e, _f;
                                        expect((_c = (_b = (_a = account === null || account === void 0 ? void 0 : account.delegatedAccess) === null || _a === void 0 ? void 0 : _a.delegates) === null || _b === void 0 ? void 0 : _b.at(0)) === null || _c === void 0 ? void 0 : _c.email).toBe('test@test.com');
                                        expect((_f = (_e = (_d = account === null || account === void 0 ? void 0 : account.delegatedAccess) === null || _d === void 0 ? void 0 : _d.delegates) === null || _e === void 0 ? void 0 : _e.at(0)) === null || _f === void 0 ? void 0 : _f.role).toBe(CONST_1.default.DELEGATE_ROLE.ALL);
                                        react_native_onyx_1.default.disconnect(connection);
                                        resolve();
                                    },
                                });
                            })];
                    case 3:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('removeDelegate', function () {
        it('should remove a delegate', function () { return __awaiter(void 0, void 0, void 0, function () {
            var delegatedAccess;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        delegatedAccess = {
                            delegates: [
                                {
                                    email: 'test@test.com',
                                    role: CONST_1.default.DELEGATE_ROLE.ALL,
                                },
                            ],
                        };
                        return [4 /*yield*/, react_native_onyx_1.default.merge(ONYXKEYS_1.default.ACCOUNT, { delegatedAccess: delegatedAccess })];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, (0, waitForBatchedUpdates_1.default)()];
                    case 2:
                        _a.sent();
                        (0, SequentialQueue_1.pause)();
                        (0, Delegate_1.removeDelegate)({ email: 'test@test.com', delegatedAccess: delegatedAccess });
                        return [4 /*yield*/, (0, waitForBatchedUpdates_1.default)()];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, new Promise(function (resolve) {
                                var connection = react_native_onyx_1.default.connect({
                                    key: ONYXKEYS_1.default.ACCOUNT,
                                    callback: function (account) {
                                        var _a, _b, _c;
                                        expect((_c = (_b = (_a = account === null || account === void 0 ? void 0 : account.delegatedAccess) === null || _a === void 0 ? void 0 : _a.delegates) === null || _b === void 0 ? void 0 : _b.at(0)) === null || _c === void 0 ? void 0 : _c.pendingAction).toBe(CONST_1.default.RED_BRICK_ROAD_PENDING_ACTION.DELETE);
                                        react_native_onyx_1.default.disconnect(connection);
                                        resolve();
                                    },
                                });
                            })];
                    case 4:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        (0, SequentialQueue_1.resetQueue)();
    });
    describe('clearDelegateErrorsByField', function () {
        it('should clear a delegate error by field', function () { return __awaiter(void 0, void 0, void 0, function () {
            var delegatedAccess;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        delegatedAccess = {
                            delegates: [
                                {
                                    email: 'test@test.com',
                                    role: CONST_1.default.DELEGATE_ROLE.ALL,
                                },
                            ],
                            errorFields: {
                                addDelegate: {
                                    // eslint-disable-next-line @typescript-eslint/naming-convention
                                    'test@test.com': {
                                        email: 'Invalid email address',
                                    },
                                },
                            },
                        };
                        // Set initial Onyx state
                        return [4 /*yield*/, react_native_onyx_1.default.merge(ONYXKEYS_1.default.ACCOUNT, { delegatedAccess: delegatedAccess })];
                    case 1:
                        // Set initial Onyx state
                        _a.sent();
                        return [4 /*yield*/, (0, waitForBatchedUpdates_1.default)()];
                    case 2:
                        _a.sent();
                        // Clear an error in a simple field
                        (0, Delegate_1.clearDelegateErrorsByField)({
                            email: 'test@test.com',
                            fieldName: 'addDelegate',
                            delegatedAccess: delegatedAccess,
                        });
                        return [4 /*yield*/, (0, waitForBatchedUpdates_1.default)()];
                    case 3:
                        _a.sent();
                        // Assert
                        return [4 /*yield*/, new Promise(function (resolve) {
                                var connection = react_native_onyx_1.default.connect({
                                    key: ONYXKEYS_1.default.ACCOUNT,
                                    callback: function (account) {
                                        var _a, _b;
                                        var errorFields = (_a = account === null || account === void 0 ? void 0 : account.delegatedAccess) === null || _a === void 0 ? void 0 : _a.errorFields;
                                        // The targeted errors should be cleared
                                        expect((_b = errorFields === null || errorFields === void 0 ? void 0 : errorFields.addDelegate) === null || _b === void 0 ? void 0 : _b['test@test.com']).toBeUndefined();
                                        react_native_onyx_1.default.disconnect(connection);
                                        resolve();
                                    },
                                });
                            })];
                    case 4:
                        // Assert
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('updateDelegateRole', function () {
        it('should update a delegate role', function () { return __awaiter(void 0, void 0, void 0, function () {
            var delegatedAccess;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        delegatedAccess = {
                            delegates: [
                                {
                                    email: 'test@test.com',
                                    role: CONST_1.default.DELEGATE_ROLE.ALL,
                                },
                            ],
                        };
                        return [4 /*yield*/, react_native_onyx_1.default.merge(ONYXKEYS_1.default.ACCOUNT, { delegatedAccess: delegatedAccess })];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, (0, waitForBatchedUpdates_1.default)()];
                    case 2:
                        _a.sent();
                        (0, SequentialQueue_1.pause)();
                        (0, Delegate_1.updateDelegateRole)({ email: 'test@test.com', role: CONST_1.default.DELEGATE_ROLE.SUBMITTER, validateCode: '123456', delegatedAccess: delegatedAccess });
                        return [4 /*yield*/, (0, waitForBatchedUpdates_1.default)()];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, new Promise(function (resolve) {
                                var connection = react_native_onyx_1.default.connect({
                                    key: ONYXKEYS_1.default.ACCOUNT,
                                    callback: function (account) {
                                        var _a, _b, _c;
                                        var firstDelegate = (_b = (_a = account === null || account === void 0 ? void 0 : account.delegatedAccess) === null || _a === void 0 ? void 0 : _a.delegates) === null || _b === void 0 ? void 0 : _b.at(0);
                                        expect(firstDelegate === null || firstDelegate === void 0 ? void 0 : firstDelegate.pendingAction).toBe(CONST_1.default.RED_BRICK_ROAD_PENDING_ACTION.UPDATE);
                                        expect((_c = firstDelegate === null || firstDelegate === void 0 ? void 0 : firstDelegate.pendingFields) === null || _c === void 0 ? void 0 : _c.role).toBe(CONST_1.default.RED_BRICK_ROAD_PENDING_ACTION.UPDATE);
                                        react_native_onyx_1.default.disconnect(connection);
                                        resolve();
                                    },
                                });
                            })];
                    case 4:
                        _a.sent();
                        (0, SequentialQueue_1.resetQueue)();
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('isConnectedAsDelegate', function () {
        it('should return true if the user is connected as a delegate', function () { return __awaiter(void 0, void 0, void 0, function () {
            var delegatedAccess;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        delegatedAccess = {
                            delegates: [
                                {
                                    email: 'test@test.com',
                                    role: CONST_1.default.DELEGATE_ROLE.ALL,
                                },
                            ],
                        };
                        return [4 /*yield*/, react_native_onyx_1.default.merge(ONYXKEYS_1.default.ACCOUNT, { delegatedAccess: delegatedAccess })];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, (0, waitForBatchedUpdates_1.default)()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, new Promise(function (resolve) {
                                var connection = react_native_onyx_1.default.connect({
                                    key: ONYXKEYS_1.default.ACCOUNT,
                                    callback: function (account) {
                                        expect((0, Delegate_1.isConnectedAsDelegate)({ delegatedAccess: account === null || account === void 0 ? void 0 : account.delegatedAccess })).toBe(false);
                                        react_native_onyx_1.default.disconnect(connection);
                                        resolve();
                                    },
                                });
                            })];
                    case 3:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
