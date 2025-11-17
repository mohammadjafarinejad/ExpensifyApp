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
var react_native_1 = require("@testing-library/react-native");
var react_native_onyx_1 = require("react-native-onyx");
var usePreferredPolicy_1 = require("@hooks/usePreferredPolicy");
var ONYXKEYS_1 = require("@src/ONYXKEYS");
var waitForBatchedUpdates_1 = require("../utils/waitForBatchedUpdates");
describe('usePreferredPolicy', function () {
    beforeAll(function () {
        react_native_onyx_1.default.init({
            keys: ONYXKEYS_1.default,
        });
        return (0, waitForBatchedUpdates_1.default)();
    });
    beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, react_native_onyx_1.default.clear()];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('should return default values when no security groups are configured', function () {
        var result = (0, react_native_1.renderHook)(function () { return (0, usePreferredPolicy_1.default)(); }).result;
        expect(result.current.isRestrictedToPreferredPolicy).toBe(false);
        expect(result.current.preferredPolicyID).toBeUndefined();
    });
    it('should return default values when domain has no security groups', function () { return __awaiter(void 0, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, react_native_onyx_1.default.set(ONYXKEYS_1.default.SESSION, {
                        email: 'user@example.com',
                    })];
                case 1:
                    _a.sent();
                    result = (0, react_native_1.renderHook)(function () { return (0, usePreferredPolicy_1.default)(); }).result;
                    expect(result.current.isRestrictedToPreferredPolicy).toBe(false);
                    expect(result.current.preferredPolicyID).toBeUndefined();
                    return [2 /*return*/];
            }
        });
    }); });
    it('should return restricted workspace when security group has enableRestrictedPrimaryPolicy enabled', function () { return __awaiter(void 0, void 0, void 0, function () {
        var securityGroupID, restrictedPolicyID, domainSecurityGroups, securityGroupKey, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    securityGroupID = 'securityGroup123';
                    restrictedPolicyID = 'policy456';
                    return [4 /*yield*/, react_native_onyx_1.default.set(ONYXKEYS_1.default.SESSION, {
                            email: 'user@example.com',
                        })];
                case 1:
                    _a.sent();
                    domainSecurityGroups = {};
                    domainSecurityGroups['example.com'] = securityGroupID;
                    return [4 /*yield*/, react_native_onyx_1.default.set(ONYXKEYS_1.default.MY_DOMAIN_SECURITY_GROUPS, domainSecurityGroups)];
                case 2:
                    _a.sent();
                    securityGroupKey = "".concat(ONYXKEYS_1.default.COLLECTION.SECURITY_GROUP).concat(securityGroupID);
                    return [4 /*yield*/, react_native_onyx_1.default.set(securityGroupKey, {
                            enableRestrictedPrimaryPolicy: true,
                            restrictedPrimaryPolicyID: restrictedPolicyID,
                        })];
                case 3:
                    _a.sent();
                    result = (0, react_native_1.renderHook)(function () { return (0, usePreferredPolicy_1.default)(); }).result;
                    expect(result.current.isRestrictedToPreferredPolicy).toBe(true);
                    expect(result.current.preferredPolicyID).toBe(restrictedPolicyID);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should return false when security group has enableRestrictedPrimaryPolicy disabled', function () { return __awaiter(void 0, void 0, void 0, function () {
        var securityGroupID, restrictedPolicyID, domainSecurityGroups, securityGroupKey, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    securityGroupID = 'securityGroup123';
                    restrictedPolicyID = 'policy456';
                    return [4 /*yield*/, react_native_onyx_1.default.set(ONYXKEYS_1.default.SESSION, {
                            email: 'user@example.com',
                        })];
                case 1:
                    _a.sent();
                    domainSecurityGroups = {};
                    domainSecurityGroups['example.com'] = securityGroupID;
                    return [4 /*yield*/, react_native_onyx_1.default.set(ONYXKEYS_1.default.MY_DOMAIN_SECURITY_GROUPS, domainSecurityGroups)];
                case 2:
                    _a.sent();
                    securityGroupKey = "".concat(ONYXKEYS_1.default.COLLECTION.SECURITY_GROUP).concat(securityGroupID);
                    return [4 /*yield*/, react_native_onyx_1.default.set(securityGroupKey, {
                            enableRestrictedPrimaryPolicy: false,
                            restrictedPrimaryPolicyID: restrictedPolicyID,
                        })];
                case 3:
                    _a.sent();
                    result = (0, react_native_1.renderHook)(function () { return (0, usePreferredPolicy_1.default)(); }).result;
                    expect(result.current.isRestrictedToPreferredPolicy).toBe(false);
                    expect(result.current.preferredPolicyID).toBe(restrictedPolicyID);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should return default values when security group is not found', function () { return __awaiter(void 0, void 0, void 0, function () {
        var securityGroupID, domainSecurityGroups, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    securityGroupID = 'nonExistentGroup';
                    return [4 /*yield*/, react_native_onyx_1.default.set(ONYXKEYS_1.default.SESSION, {
                            email: 'user@example.com',
                        })];
                case 1:
                    _a.sent();
                    domainSecurityGroups = {};
                    domainSecurityGroups['example.com'] = securityGroupID;
                    return [4 /*yield*/, react_native_onyx_1.default.set(ONYXKEYS_1.default.MY_DOMAIN_SECURITY_GROUPS, domainSecurityGroups)];
                case 2:
                    _a.sent();
                    result = (0, react_native_1.renderHook)(function () { return (0, usePreferredPolicy_1.default)(); }).result;
                    expect(result.current.isRestrictedToPreferredPolicy).toBe(false);
                    expect(result.current.preferredPolicyID).toBeUndefined();
                    return [2 /*return*/];
            }
        });
    }); });
    describe('Edge cases', function () {
        it('should handle null enableRestrictedPrimaryPolicy', function () { return __awaiter(void 0, void 0, void 0, function () {
            var securityGroupID, restrictedPolicyID, domainSecurityGroups, securityGroupKey, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        securityGroupID = 'securityGroup123';
                        restrictedPolicyID = 'policy456';
                        return [4 /*yield*/, react_native_onyx_1.default.set(ONYXKEYS_1.default.SESSION, {
                                email: 'user@example.com',
                            })];
                    case 1:
                        _a.sent();
                        domainSecurityGroups = {};
                        domainSecurityGroups['example.com'] = securityGroupID;
                        return [4 /*yield*/, react_native_onyx_1.default.set(ONYXKEYS_1.default.MY_DOMAIN_SECURITY_GROUPS, domainSecurityGroups)];
                    case 2:
                        _a.sent();
                        securityGroupKey = "".concat(ONYXKEYS_1.default.COLLECTION.SECURITY_GROUP).concat(securityGroupID);
                        return [4 /*yield*/, react_native_onyx_1.default.set(securityGroupKey, {
                                enableRestrictedPrimaryPolicy: null,
                                restrictedPrimaryPolicyID: restrictedPolicyID,
                            })];
                    case 3:
                        _a.sent();
                        result = (0, react_native_1.renderHook)(function () { return (0, usePreferredPolicy_1.default)(); }).result;
                        expect(result.current.isRestrictedToPreferredPolicy).toBe(false);
                        expect(result.current.preferredPolicyID).toBe(restrictedPolicyID);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should handle undefined enableRestrictedPrimaryPolicy', function () { return __awaiter(void 0, void 0, void 0, function () {
            var securityGroupID, restrictedPolicyID, domainSecurityGroups, securityGroupKey, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        securityGroupID = 'securityGroup123';
                        restrictedPolicyID = 'policy456';
                        return [4 /*yield*/, react_native_onyx_1.default.set(ONYXKEYS_1.default.SESSION, {
                                email: 'user@example.com',
                            })];
                    case 1:
                        _a.sent();
                        domainSecurityGroups = {};
                        domainSecurityGroups['example.com'] = securityGroupID;
                        return [4 /*yield*/, react_native_onyx_1.default.set(ONYXKEYS_1.default.MY_DOMAIN_SECURITY_GROUPS, domainSecurityGroups)];
                    case 2:
                        _a.sent();
                        securityGroupKey = "".concat(ONYXKEYS_1.default.COLLECTION.SECURITY_GROUP).concat(securityGroupID);
                        return [4 /*yield*/, react_native_onyx_1.default.set(securityGroupKey, {
                                restrictedPrimaryPolicyID: restrictedPolicyID,
                            })];
                    case 3:
                        _a.sent();
                        result = (0, react_native_1.renderHook)(function () { return (0, usePreferredPolicy_1.default)(); }).result;
                        expect(result.current.isRestrictedToPreferredPolicy).toBe(false);
                        expect(result.current.preferredPolicyID).toBe(restrictedPolicyID);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should handle missing restrictedPrimaryPolicyID when enableRestrictedPrimaryPolicy is true', function () { return __awaiter(void 0, void 0, void 0, function () {
            var securityGroupID, domainSecurityGroups, securityGroupKey, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        securityGroupID = 'securityGroup123';
                        return [4 /*yield*/, react_native_onyx_1.default.set(ONYXKEYS_1.default.SESSION, {
                                email: 'user@example.com',
                            })];
                    case 1:
                        _a.sent();
                        domainSecurityGroups = {};
                        domainSecurityGroups['example.com'] = securityGroupID;
                        return [4 /*yield*/, react_native_onyx_1.default.set(ONYXKEYS_1.default.MY_DOMAIN_SECURITY_GROUPS, domainSecurityGroups)];
                    case 2:
                        _a.sent();
                        securityGroupKey = "".concat(ONYXKEYS_1.default.COLLECTION.SECURITY_GROUP).concat(securityGroupID);
                        return [4 /*yield*/, react_native_onyx_1.default.set(securityGroupKey, {
                                enableRestrictedPrimaryPolicy: true,
                            })];
                    case 3:
                        _a.sent();
                        result = (0, react_native_1.renderHook)(function () { return (0, usePreferredPolicy_1.default)(); }).result;
                        expect(result.current.isRestrictedToPreferredPolicy).toBe(false);
                        expect(result.current.preferredPolicyID).toBeUndefined();
                        return [2 /*return*/];
                }
            });
        }); });
        it('should handle null restrictedPrimaryPolicyID', function () { return __awaiter(void 0, void 0, void 0, function () {
            var securityGroupID, domainSecurityGroups, securityGroupKey, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        securityGroupID = 'securityGroup123';
                        return [4 /*yield*/, react_native_onyx_1.default.set(ONYXKEYS_1.default.SESSION, {
                                email: 'user@example.com',
                            })];
                    case 1:
                        _a.sent();
                        domainSecurityGroups = {};
                        domainSecurityGroups['example.com'] = securityGroupID;
                        return [4 /*yield*/, react_native_onyx_1.default.set(ONYXKEYS_1.default.MY_DOMAIN_SECURITY_GROUPS, domainSecurityGroups)];
                    case 2:
                        _a.sent();
                        securityGroupKey = "".concat(ONYXKEYS_1.default.COLLECTION.SECURITY_GROUP).concat(securityGroupID);
                        return [4 /*yield*/, react_native_onyx_1.default.set(securityGroupKey, {
                                enableRestrictedPrimaryPolicy: true,
                                restrictedPrimaryPolicyID: null,
                            })];
                    case 3:
                        _a.sent();
                        result = (0, react_native_1.renderHook)(function () { return (0, usePreferredPolicy_1.default)(); }).result;
                        expect(result.current.isRestrictedToPreferredPolicy).toBe(false);
                        expect(result.current.preferredPolicyID).toBeUndefined();
                        return [2 /*return*/];
                }
            });
        }); });
        it('should handle empty string restrictedPrimaryPolicyID', function () { return __awaiter(void 0, void 0, void 0, function () {
            var securityGroupID, domainSecurityGroups, securityGroupKey, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        securityGroupID = 'securityGroup123';
                        return [4 /*yield*/, react_native_onyx_1.default.set(ONYXKEYS_1.default.SESSION, {
                                email: 'user@example.com',
                            })];
                    case 1:
                        _a.sent();
                        domainSecurityGroups = {};
                        domainSecurityGroups['example.com'] = securityGroupID;
                        return [4 /*yield*/, react_native_onyx_1.default.set(ONYXKEYS_1.default.MY_DOMAIN_SECURITY_GROUPS, domainSecurityGroups)];
                    case 2:
                        _a.sent();
                        securityGroupKey = "".concat(ONYXKEYS_1.default.COLLECTION.SECURITY_GROUP).concat(securityGroupID);
                        return [4 /*yield*/, react_native_onyx_1.default.set(securityGroupKey, {
                                enableRestrictedPrimaryPolicy: true,
                                restrictedPrimaryPolicyID: '',
                            })];
                    case 3:
                        _a.sent();
                        result = (0, react_native_1.renderHook)(function () { return (0, usePreferredPolicy_1.default)(); }).result;
                        expect(result.current.isRestrictedToPreferredPolicy).toBe(false);
                        expect(result.current.preferredPolicyID).toBe('');
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
