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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_native_1 = require("@testing-library/react-native");
var react_native_onyx_1 = require("react-native-onyx");
var useTransactionViolations_1 = require("@hooks/useTransactionViolations");
var TransactionUtils_1 = require("@libs/TransactionUtils");
var CONST_1 = require("@src/CONST");
var ONYXKEYS_1 = require("@src/ONYXKEYS");
var waitForBatchedUpdates_1 = require("../utils/waitForBatchedUpdates");
jest.mock('@libs/TransactionUtils', function () {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    var CONST_MOCK = jest.requireActual('@src/CONST').default;
    return {
        isViolationDismissed: jest.fn(),
        shouldShowViolation: jest.fn(),
        mergeProhibitedViolations: function (transactionViolations) {
            var prohibitedViolations = transactionViolations.filter(function (violation) { return violation.name === CONST_MOCK.VIOLATIONS.PROHIBITED_EXPENSE; });
            if (prohibitedViolations.length === 0) {
                return transactionViolations;
            }
            var prohibitedExpenses = prohibitedViolations.flatMap(function (violation) {
                var _a;
                var rule = (_a = violation.data) === null || _a === void 0 ? void 0 : _a.prohibitedExpenseRule;
                if (!rule) {
                    return [];
                }
                return Array.isArray(rule) ? rule : [rule];
            });
            var mergedProhibitedViolations = {
                name: CONST_MOCK.VIOLATIONS.PROHIBITED_EXPENSE,
                data: {
                    prohibitedExpenseRule: prohibitedExpenses,
                },
                type: CONST_MOCK.VIOLATION_TYPES.VIOLATION,
            };
            return __spreadArray(__spreadArray([], transactionViolations.filter(function (violation) { return violation.name !== CONST_MOCK.VIOLATIONS.PROHIBITED_EXPENSE; }), true), [mergedProhibitedViolations], false);
        },
    };
});
jest.mock('@hooks/useCurrentUserPersonalDetails', function () { return ({
    // eslint-disable-next-line @typescript-eslint/naming-convention
    __esModule: true,
    default: jest.fn(function () { return ({
        email: 'test@example.com',
        accountID: 1,
    }); }),
}); });
describe('useTransactionViolations', function () {
    beforeAll(function () {
        react_native_onyx_1.default.init({
            keys: ONYXKEYS_1.default,
        });
    });
    beforeEach(function () {
        jest.clearAllMocks();
        react_native_onyx_1.default.clear();
        // Default mock implementations
        TransactionUtils_1.isViolationDismissed.mockReturnValue(false);
        TransactionUtils_1.shouldShowViolation.mockReturnValue(true);
    });
    describe('mergeProhibitedViolations', function () {
        it('should return original array when there are no prohibited violations', function () { return __awaiter(void 0, void 0, void 0, function () {
            var transactionID, violations, result;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        transactionID = '123';
                        violations = [
                            {
                                name: CONST_1.default.VIOLATIONS.MISSING_CATEGORY,
                                type: CONST_1.default.VIOLATION_TYPES.VIOLATION,
                            },
                            {
                                name: CONST_1.default.VIOLATIONS.MISSING_TAG,
                                type: CONST_1.default.VIOLATION_TYPES.VIOLATION,
                            },
                        ];
                        return [4 /*yield*/, react_native_onyx_1.default.set("".concat(ONYXKEYS_1.default.COLLECTION.TRANSACTION).concat(transactionID), {
                                transactionID: transactionID,
                            })];
                    case 1:
                        _c.sent();
                        return [4 /*yield*/, react_native_onyx_1.default.set("".concat(ONYXKEYS_1.default.COLLECTION.TRANSACTION_VIOLATIONS).concat(transactionID), violations)];
                    case 2:
                        _c.sent();
                        return [4 /*yield*/, (0, waitForBatchedUpdates_1.default)()];
                    case 3:
                        _c.sent();
                        result = (0, react_native_1.renderHook)(function () { return (0, useTransactionViolations_1.default)(transactionID); }).result;
                        expect(result.current).toHaveLength(2);
                        expect((_a = result.current.at(0)) === null || _a === void 0 ? void 0 : _a.name).toBe(CONST_1.default.VIOLATIONS.MISSING_CATEGORY);
                        expect((_b = result.current.at(1)) === null || _b === void 0 ? void 0 : _b.name).toBe(CONST_1.default.VIOLATIONS.MISSING_TAG);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should handle a single prohibited violation correctly', function () { return __awaiter(void 0, void 0, void 0, function () {
            var transactionID, violations, result;
            var _a, _b, _c, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        transactionID = '123';
                        violations = [
                            {
                                name: CONST_1.default.VIOLATIONS.PROHIBITED_EXPENSE,
                                type: CONST_1.default.VIOLATION_TYPES.VIOLATION,
                                data: {
                                    prohibitedExpenseRule: 'alcohol',
                                },
                            },
                        ];
                        return [4 /*yield*/, react_native_onyx_1.default.set("".concat(ONYXKEYS_1.default.COLLECTION.TRANSACTION).concat(transactionID), {
                                transactionID: transactionID,
                            })];
                    case 1:
                        _e.sent();
                        return [4 /*yield*/, react_native_onyx_1.default.set("".concat(ONYXKEYS_1.default.COLLECTION.TRANSACTION_VIOLATIONS).concat(transactionID), violations)];
                    case 2:
                        _e.sent();
                        return [4 /*yield*/, (0, waitForBatchedUpdates_1.default)()];
                    case 3:
                        _e.sent();
                        result = (0, react_native_1.renderHook)(function () { return (0, useTransactionViolations_1.default)(transactionID); }).result;
                        expect(result.current).toHaveLength(1);
                        expect((_a = result.current.at(0)) === null || _a === void 0 ? void 0 : _a.name).toBe(CONST_1.default.VIOLATIONS.PROHIBITED_EXPENSE);
                        expect((_c = (_b = result.current.at(0)) === null || _b === void 0 ? void 0 : _b.data) === null || _c === void 0 ? void 0 : _c.prohibitedExpenseRule).toEqual(['alcohol']);
                        expect((_d = result.current.at(0)) === null || _d === void 0 ? void 0 : _d.type).toBe(CONST_1.default.VIOLATION_TYPES.VIOLATION);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should merge multiple prohibited violations into one', function () { return __awaiter(void 0, void 0, void 0, function () {
            var transactionID, violations, result;
            var _a, _b, _c, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        transactionID = '123';
                        violations = [
                            {
                                name: CONST_1.default.VIOLATIONS.PROHIBITED_EXPENSE,
                                type: CONST_1.default.VIOLATION_TYPES.VIOLATION,
                                data: {
                                    prohibitedExpenseRule: 'alcohol',
                                },
                            },
                            {
                                name: CONST_1.default.VIOLATIONS.PROHIBITED_EXPENSE,
                                type: CONST_1.default.VIOLATION_TYPES.VIOLATION,
                                data: {
                                    prohibitedExpenseRule: 'gambling',
                                },
                            },
                            {
                                name: CONST_1.default.VIOLATIONS.PROHIBITED_EXPENSE,
                                type: CONST_1.default.VIOLATION_TYPES.VIOLATION,
                                data: {
                                    prohibitedExpenseRule: 'tobacco',
                                },
                            },
                        ];
                        return [4 /*yield*/, react_native_onyx_1.default.set("".concat(ONYXKEYS_1.default.COLLECTION.TRANSACTION).concat(transactionID), {
                                transactionID: transactionID,
                            })];
                    case 1:
                        _e.sent();
                        return [4 /*yield*/, react_native_onyx_1.default.set("".concat(ONYXKEYS_1.default.COLLECTION.TRANSACTION_VIOLATIONS).concat(transactionID), violations)];
                    case 2:
                        _e.sent();
                        return [4 /*yield*/, (0, waitForBatchedUpdates_1.default)()];
                    case 3:
                        _e.sent();
                        result = (0, react_native_1.renderHook)(function () { return (0, useTransactionViolations_1.default)(transactionID); }).result;
                        expect(result.current).toHaveLength(1);
                        expect((_a = result.current.at(0)) === null || _a === void 0 ? void 0 : _a.name).toBe(CONST_1.default.VIOLATIONS.PROHIBITED_EXPENSE);
                        expect((_c = (_b = result.current.at(0)) === null || _b === void 0 ? void 0 : _b.data) === null || _c === void 0 ? void 0 : _c.prohibitedExpenseRule).toEqual(['alcohol', 'gambling', 'tobacco']);
                        expect((_d = result.current.at(0)) === null || _d === void 0 ? void 0 : _d.type).toBe(CONST_1.default.VIOLATION_TYPES.VIOLATION);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should handle empty prohibitedExpenseRule arrays', function () { return __awaiter(void 0, void 0, void 0, function () {
            var transactionID, violations, result;
            var _a, _b, _c, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        transactionID = '123';
                        violations = [
                            {
                                name: CONST_1.default.VIOLATIONS.PROHIBITED_EXPENSE,
                                type: CONST_1.default.VIOLATION_TYPES.VIOLATION,
                                data: {
                                    prohibitedExpenseRule: undefined,
                                },
                            },
                            {
                                name: CONST_1.default.VIOLATIONS.PROHIBITED_EXPENSE,
                                type: CONST_1.default.VIOLATION_TYPES.VIOLATION,
                                data: {},
                            },
                        ];
                        return [4 /*yield*/, react_native_onyx_1.default.set("".concat(ONYXKEYS_1.default.COLLECTION.TRANSACTION).concat(transactionID), {
                                transactionID: transactionID,
                            })];
                    case 1:
                        _e.sent();
                        return [4 /*yield*/, react_native_onyx_1.default.set("".concat(ONYXKEYS_1.default.COLLECTION.TRANSACTION_VIOLATIONS).concat(transactionID), violations)];
                    case 2:
                        _e.sent();
                        return [4 /*yield*/, (0, waitForBatchedUpdates_1.default)()];
                    case 3:
                        _e.sent();
                        result = (0, react_native_1.renderHook)(function () { return (0, useTransactionViolations_1.default)(transactionID); }).result;
                        expect(result.current).toHaveLength(1);
                        expect((_a = result.current.at(0)) === null || _a === void 0 ? void 0 : _a.name).toBe(CONST_1.default.VIOLATIONS.PROHIBITED_EXPENSE);
                        expect((_c = (_b = result.current.at(0)) === null || _b === void 0 ? void 0 : _b.data) === null || _c === void 0 ? void 0 : _c.prohibitedExpenseRule).toEqual([]);
                        expect((_d = result.current.at(0)) === null || _d === void 0 ? void 0 : _d.type).toBe(CONST_1.default.VIOLATION_TYPES.VIOLATION);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should handle mixed violations (some prohibited, some not)', function () { return __awaiter(void 0, void 0, void 0, function () {
            var transactionID, violations, result, violationNames, prohibitedViolation;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        transactionID = '123';
                        violations = [
                            {
                                name: CONST_1.default.VIOLATIONS.MISSING_CATEGORY,
                                type: CONST_1.default.VIOLATION_TYPES.VIOLATION,
                            },
                            {
                                name: CONST_1.default.VIOLATIONS.PROHIBITED_EXPENSE,
                                type: CONST_1.default.VIOLATION_TYPES.VIOLATION,
                                data: {
                                    prohibitedExpenseRule: 'alcohol',
                                },
                            },
                            {
                                name: CONST_1.default.VIOLATIONS.MISSING_TAG,
                                type: CONST_1.default.VIOLATION_TYPES.VIOLATION,
                            },
                            {
                                name: CONST_1.default.VIOLATIONS.PROHIBITED_EXPENSE,
                                type: CONST_1.default.VIOLATION_TYPES.VIOLATION,
                                data: {
                                    prohibitedExpenseRule: 'gambling',
                                },
                            },
                            {
                                name: CONST_1.default.VIOLATIONS.MISSING_COMMENT,
                                type: CONST_1.default.VIOLATION_TYPES.VIOLATION,
                            },
                        ];
                        return [4 /*yield*/, react_native_onyx_1.default.set("".concat(ONYXKEYS_1.default.COLLECTION.TRANSACTION).concat(transactionID), {
                                transactionID: transactionID,
                            })];
                    case 1:
                        _b.sent();
                        return [4 /*yield*/, react_native_onyx_1.default.set("".concat(ONYXKEYS_1.default.COLLECTION.TRANSACTION_VIOLATIONS).concat(transactionID), violations)];
                    case 2:
                        _b.sent();
                        return [4 /*yield*/, (0, waitForBatchedUpdates_1.default)()];
                    case 3:
                        _b.sent();
                        result = (0, react_native_1.renderHook)(function () { return (0, useTransactionViolations_1.default)(transactionID); }).result;
                        expect(result.current).toHaveLength(4);
                        violationNames = result.current.map(function (v) { return v.name; });
                        expect(violationNames).toContain(CONST_1.default.VIOLATIONS.MISSING_CATEGORY);
                        expect(violationNames).toContain(CONST_1.default.VIOLATIONS.MISSING_TAG);
                        expect(violationNames).toContain(CONST_1.default.VIOLATIONS.MISSING_COMMENT);
                        expect(violationNames).toContain(CONST_1.default.VIOLATIONS.PROHIBITED_EXPENSE);
                        prohibitedViolation = result.current.find(function (v) { return v.name === CONST_1.default.VIOLATIONS.PROHIBITED_EXPENSE; });
                        expect((_a = prohibitedViolation === null || prohibitedViolation === void 0 ? void 0 : prohibitedViolation.data) === null || _a === void 0 ? void 0 : _a.prohibitedExpenseRule).toEqual(['alcohol', 'gambling']);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should handle prohibitedExpenseRule as an array', function () { return __awaiter(void 0, void 0, void 0, function () {
            var transactionID, violations, result;
            var _a, _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        transactionID = '123';
                        violations = [
                            {
                                name: CONST_1.default.VIOLATIONS.PROHIBITED_EXPENSE,
                                type: CONST_1.default.VIOLATION_TYPES.VIOLATION,
                                data: {
                                    prohibitedExpenseRule: ['alcohol', 'tobacco'],
                                },
                            },
                            {
                                name: CONST_1.default.VIOLATIONS.PROHIBITED_EXPENSE,
                                type: CONST_1.default.VIOLATION_TYPES.VIOLATION,
                                data: {
                                    prohibitedExpenseRule: 'gambling',
                                },
                            },
                        ];
                        return [4 /*yield*/, react_native_onyx_1.default.set("".concat(ONYXKEYS_1.default.COLLECTION.TRANSACTION).concat(transactionID), {
                                transactionID: transactionID,
                            })];
                    case 1:
                        _d.sent();
                        return [4 /*yield*/, react_native_onyx_1.default.set("".concat(ONYXKEYS_1.default.COLLECTION.TRANSACTION_VIOLATIONS).concat(transactionID), violations)];
                    case 2:
                        _d.sent();
                        return [4 /*yield*/, (0, waitForBatchedUpdates_1.default)()];
                    case 3:
                        _d.sent();
                        result = (0, react_native_1.renderHook)(function () { return (0, useTransactionViolations_1.default)(transactionID); }).result;
                        expect(result.current).toHaveLength(1);
                        expect((_a = result.current.at(0)) === null || _a === void 0 ? void 0 : _a.name).toBe(CONST_1.default.VIOLATIONS.PROHIBITED_EXPENSE);
                        expect((_c = (_b = result.current.at(0)) === null || _b === void 0 ? void 0 : _b.data) === null || _c === void 0 ? void 0 : _c.prohibitedExpenseRule).toEqual(['alcohol', 'tobacco', 'gambling']);
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('full hook behavior', function () {
        it('should filter out dismissed violations', function () { return __awaiter(void 0, void 0, void 0, function () {
            var transactionID, violations, result;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        transactionID = '123';
                        violations = [
                            {
                                name: CONST_1.default.VIOLATIONS.MISSING_CATEGORY,
                                type: CONST_1.default.VIOLATION_TYPES.VIOLATION,
                            },
                            {
                                name: CONST_1.default.VIOLATIONS.MISSING_TAG,
                                type: CONST_1.default.VIOLATION_TYPES.VIOLATION,
                            },
                        ];
                        // Mock the first violation as dismissed
                        TransactionUtils_1.isViolationDismissed.mockImplementation(function (transaction, violation) {
                            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                            return violation.name === CONST_1.default.VIOLATIONS.MISSING_CATEGORY;
                        });
                        return [4 /*yield*/, react_native_onyx_1.default.set("".concat(ONYXKEYS_1.default.COLLECTION.TRANSACTION).concat(transactionID), {
                                transactionID: transactionID,
                            })];
                    case 1:
                        _b.sent();
                        return [4 /*yield*/, react_native_onyx_1.default.set("".concat(ONYXKEYS_1.default.COLLECTION.TRANSACTION_VIOLATIONS).concat(transactionID), violations)];
                    case 2:
                        _b.sent();
                        return [4 /*yield*/, (0, waitForBatchedUpdates_1.default)()];
                    case 3:
                        _b.sent();
                        result = (0, react_native_1.renderHook)(function () { return (0, useTransactionViolations_1.default)(transactionID); }).result;
                        expect(result.current).toHaveLength(1);
                        expect((_a = result.current.at(0)) === null || _a === void 0 ? void 0 : _a.name).toBe(CONST_1.default.VIOLATIONS.MISSING_TAG);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should filter violations based on shouldShowViolation', function () { return __awaiter(void 0, void 0, void 0, function () {
            var transactionID, reportID, policyID, violations, result;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        transactionID = '123';
                        reportID = 'report123';
                        policyID = 'policy123';
                        violations = [
                            {
                                name: CONST_1.default.VIOLATIONS.MISSING_CATEGORY,
                                type: CONST_1.default.VIOLATION_TYPES.VIOLATION,
                            },
                            {
                                name: CONST_1.default.VIOLATIONS.RTER,
                                type: CONST_1.default.VIOLATION_TYPES.VIOLATION,
                            },
                        ];
                        // Mock shouldShowViolation to hide RTER violations
                        TransactionUtils_1.shouldShowViolation.mockImplementation(function (iouReport, policy, violationName) {
                            return violationName !== CONST_1.default.VIOLATIONS.RTER;
                        });
                        return [4 /*yield*/, react_native_onyx_1.default.set("".concat(ONYXKEYS_1.default.COLLECTION.TRANSACTION).concat(transactionID), {
                                transactionID: transactionID,
                                reportID: reportID,
                            })];
                    case 1:
                        _b.sent();
                        return [4 /*yield*/, react_native_onyx_1.default.set("".concat(ONYXKEYS_1.default.COLLECTION.REPORT).concat(reportID), {
                                reportID: reportID,
                                policyID: policyID,
                            })];
                    case 2:
                        _b.sent();
                        return [4 /*yield*/, react_native_onyx_1.default.set("".concat(ONYXKEYS_1.default.COLLECTION.POLICY).concat(policyID), {})];
                    case 3:
                        _b.sent();
                        return [4 /*yield*/, react_native_onyx_1.default.set("".concat(ONYXKEYS_1.default.COLLECTION.TRANSACTION_VIOLATIONS).concat(transactionID), violations)];
                    case 4:
                        _b.sent();
                        return [4 /*yield*/, (0, waitForBatchedUpdates_1.default)()];
                    case 5:
                        _b.sent();
                        result = (0, react_native_1.renderHook)(function () { return (0, useTransactionViolations_1.default)(transactionID); }).result;
                        expect(result.current).toHaveLength(1);
                        expect((_a = result.current.at(0)) === null || _a === void 0 ? void 0 : _a.name).toBe(CONST_1.default.VIOLATIONS.MISSING_CATEGORY);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should return empty array when transactionID is undefined', function () { return __awaiter(void 0, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, waitForBatchedUpdates_1.default)()];
                    case 1:
                        _a.sent();
                        result = (0, react_native_1.renderHook)(function () { return (0, useTransactionViolations_1.default)(undefined); }).result;
                        expect(result.current).toEqual([]);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should handle empty violations array', function () { return __awaiter(void 0, void 0, void 0, function () {
            var transactionID, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        transactionID = '123';
                        return [4 /*yield*/, react_native_onyx_1.default.set("".concat(ONYXKEYS_1.default.COLLECTION.TRANSACTION).concat(transactionID), {
                                transactionID: transactionID,
                            })];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, react_native_onyx_1.default.set("".concat(ONYXKEYS_1.default.COLLECTION.TRANSACTION_VIOLATIONS).concat(transactionID), [])];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, (0, waitForBatchedUpdates_1.default)()];
                    case 3:
                        _a.sent();
                        result = (0, react_native_1.renderHook)(function () { return (0, useTransactionViolations_1.default)(transactionID); }).result;
                        expect(result.current).toEqual([]);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should update when violations change', function () { return __awaiter(void 0, void 0, void 0, function () {
            var transactionID, initialViolations, _a, result, rerender, updatedViolations;
            var _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        transactionID = '123';
                        initialViolations = [
                            {
                                name: CONST_1.default.VIOLATIONS.MISSING_CATEGORY,
                                type: CONST_1.default.VIOLATION_TYPES.VIOLATION,
                            },
                        ];
                        return [4 /*yield*/, react_native_onyx_1.default.set("".concat(ONYXKEYS_1.default.COLLECTION.TRANSACTION).concat(transactionID), {
                                transactionID: transactionID,
                            })];
                    case 1:
                        _d.sent();
                        return [4 /*yield*/, react_native_onyx_1.default.set("".concat(ONYXKEYS_1.default.COLLECTION.TRANSACTION_VIOLATIONS).concat(transactionID), initialViolations)];
                    case 2:
                        _d.sent();
                        return [4 /*yield*/, (0, waitForBatchedUpdates_1.default)()];
                    case 3:
                        _d.sent();
                        _a = (0, react_native_1.renderHook)(function () { return (0, useTransactionViolations_1.default)(transactionID); }), result = _a.result, rerender = _a.rerender;
                        expect(result.current).toHaveLength(1);
                        expect((_b = result.current.at(0)) === null || _b === void 0 ? void 0 : _b.name).toBe(CONST_1.default.VIOLATIONS.MISSING_CATEGORY);
                        updatedViolations = [
                            {
                                name: CONST_1.default.VIOLATIONS.MISSING_TAG,
                                type: CONST_1.default.VIOLATION_TYPES.VIOLATION,
                            },
                        ];
                        return [4 /*yield*/, react_native_onyx_1.default.set("".concat(ONYXKEYS_1.default.COLLECTION.TRANSACTION_VIOLATIONS).concat(transactionID), updatedViolations)];
                    case 4:
                        _d.sent();
                        return [4 /*yield*/, (0, waitForBatchedUpdates_1.default)()];
                    case 5:
                        _d.sent();
                        rerender(undefined);
                        expect(result.current).toHaveLength(1);
                        expect((_c = result.current.at(0)) === null || _c === void 0 ? void 0 : _c.name).toBe(CONST_1.default.VIOLATIONS.MISSING_TAG);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should respect shouldShowRterForSettledReport parameter', function () { return __awaiter(void 0, void 0, void 0, function () {
            var transactionID, reportID, policyID, violations, capturedShouldShowRterParam;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        transactionID = '123';
                        reportID = 'report123';
                        policyID = 'policy123';
                        violations = [
                            {
                                name: CONST_1.default.VIOLATIONS.RTER,
                                type: CONST_1.default.VIOLATION_TYPES.VIOLATION,
                            },
                        ];
                        TransactionUtils_1.shouldShowViolation.mockImplementation(function (iouReport, policy, violationName, email, shouldShowRter) {
                            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                            capturedShouldShowRterParam = shouldShowRter;
                            return true;
                        });
                        return [4 /*yield*/, react_native_onyx_1.default.set("".concat(ONYXKEYS_1.default.COLLECTION.TRANSACTION).concat(transactionID), {
                                transactionID: transactionID,
                                reportID: reportID,
                            })];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, react_native_onyx_1.default.set("".concat(ONYXKEYS_1.default.COLLECTION.REPORT).concat(reportID), {
                                reportID: reportID,
                                policyID: policyID,
                            })];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, react_native_onyx_1.default.set("".concat(ONYXKEYS_1.default.COLLECTION.POLICY).concat(policyID), {})];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, react_native_onyx_1.default.set("".concat(ONYXKEYS_1.default.COLLECTION.TRANSACTION_VIOLATIONS).concat(transactionID), violations)];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, (0, waitForBatchedUpdates_1.default)()];
                    case 5:
                        _a.sent();
                        // Test with default (true)
                        (0, react_native_1.renderHook)(function () { return (0, useTransactionViolations_1.default)(transactionID); });
                        expect(capturedShouldShowRterParam).toBe(true);
                        // Test with explicit false
                        (0, react_native_1.renderHook)(function () { return (0, useTransactionViolations_1.default)(transactionID, false); });
                        expect(capturedShouldShowRterParam).toBe(false);
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('edge cases', function () {
        it('should handle violations with no data property', function () { return __awaiter(void 0, void 0, void 0, function () {
            var transactionID, violations, result;
            var _a, _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        transactionID = '123';
                        violations = [
                            {
                                name: CONST_1.default.VIOLATIONS.PROHIBITED_EXPENSE,
                                type: CONST_1.default.VIOLATION_TYPES.VIOLATION,
                            },
                        ];
                        return [4 /*yield*/, react_native_onyx_1.default.set("".concat(ONYXKEYS_1.default.COLLECTION.TRANSACTION).concat(transactionID), {
                                transactionID: transactionID,
                            })];
                    case 1:
                        _d.sent();
                        return [4 /*yield*/, react_native_onyx_1.default.set("".concat(ONYXKEYS_1.default.COLLECTION.TRANSACTION_VIOLATIONS).concat(transactionID), violations)];
                    case 2:
                        _d.sent();
                        return [4 /*yield*/, (0, waitForBatchedUpdates_1.default)()];
                    case 3:
                        _d.sent();
                        result = (0, react_native_1.renderHook)(function () { return (0, useTransactionViolations_1.default)(transactionID); }).result;
                        expect(result.current).toHaveLength(1);
                        expect((_a = result.current.at(0)) === null || _a === void 0 ? void 0 : _a.name).toBe(CONST_1.default.VIOLATIONS.PROHIBITED_EXPENSE);
                        expect((_c = (_b = result.current.at(0)) === null || _b === void 0 ? void 0 : _b.data) === null || _c === void 0 ? void 0 : _c.prohibitedExpenseRule).toEqual([]);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should handle complex scenario with all violation types', function () { return __awaiter(void 0, void 0, void 0, function () {
            var transactionID, violations, result, violationNames, prohibitedViolation;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        transactionID = '123';
                        violations = [
                            {
                                name: CONST_1.default.VIOLATIONS.MISSING_CATEGORY,
                                type: CONST_1.default.VIOLATION_TYPES.VIOLATION,
                            },
                            {
                                name: CONST_1.default.VIOLATIONS.PROHIBITED_EXPENSE,
                                type: CONST_1.default.VIOLATION_TYPES.VIOLATION,
                                data: {
                                    prohibitedExpenseRule: ['alcohol', 'tobacco'],
                                },
                            },
                            {
                                name: CONST_1.default.VIOLATIONS.MISSING_TAG,
                                type: CONST_1.default.VIOLATION_TYPES.NOTICE,
                            },
                            {
                                name: CONST_1.default.VIOLATIONS.PROHIBITED_EXPENSE,
                                type: CONST_1.default.VIOLATION_TYPES.VIOLATION,
                                data: {
                                    prohibitedExpenseRule: 'gambling',
                                },
                            },
                            {
                                name: CONST_1.default.VIOLATIONS.SOME_TAG_LEVELS_REQUIRED,
                                type: CONST_1.default.VIOLATION_TYPES.WARNING,
                            },
                            {
                                name: CONST_1.default.VIOLATIONS.PROHIBITED_EXPENSE,
                                type: CONST_1.default.VIOLATION_TYPES.VIOLATION,
                                data: {},
                            },
                        ];
                        return [4 /*yield*/, react_native_onyx_1.default.set("".concat(ONYXKEYS_1.default.COLLECTION.TRANSACTION).concat(transactionID), {
                                transactionID: transactionID,
                            })];
                    case 1:
                        _b.sent();
                        return [4 /*yield*/, react_native_onyx_1.default.set("".concat(ONYXKEYS_1.default.COLLECTION.TRANSACTION_VIOLATIONS).concat(transactionID), violations)];
                    case 2:
                        _b.sent();
                        return [4 /*yield*/, (0, waitForBatchedUpdates_1.default)()];
                    case 3:
                        _b.sent();
                        result = (0, react_native_1.renderHook)(function () { return (0, useTransactionViolations_1.default)(transactionID); }).result;
                        expect(result.current).toHaveLength(4);
                        violationNames = result.current.map(function (v) { return v.name; });
                        expect(violationNames).toContain(CONST_1.default.VIOLATIONS.MISSING_CATEGORY);
                        expect(violationNames).toContain(CONST_1.default.VIOLATIONS.MISSING_TAG);
                        expect(violationNames).toContain(CONST_1.default.VIOLATIONS.SOME_TAG_LEVELS_REQUIRED);
                        expect(violationNames).toContain(CONST_1.default.VIOLATIONS.PROHIBITED_EXPENSE);
                        prohibitedViolation = result.current.find(function (v) { return v.name === CONST_1.default.VIOLATIONS.PROHIBITED_EXPENSE; });
                        expect((_a = prohibitedViolation === null || prohibitedViolation === void 0 ? void 0 : prohibitedViolation.data) === null || _a === void 0 ? void 0 : _a.prohibitedExpenseRule).toEqual(['alcohol', 'tobacco', 'gambling']);
                        expect(prohibitedViolation === null || prohibitedViolation === void 0 ? void 0 : prohibitedViolation.type).toBe(CONST_1.default.VIOLATION_TYPES.VIOLATION);
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
