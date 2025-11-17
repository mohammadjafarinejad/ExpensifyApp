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
var useIndicatorStatus_1 = require("@hooks/useIndicatorStatus");
// eslint-disable-next-line no-restricted-imports
var theme_1 = require("@styles/theme");
var CONST_1 = require("@src/CONST");
var ONYXKEYS_1 = require("@src/ONYXKEYS");
var waitForBatchedUpdates_1 = require("../utils/waitForBatchedUpdates");
var getMockForStatus = function (status, isAdmin) {
    var _a;
    if (isAdmin === void 0) { isAdmin = true; }
    return (_a = {},
        _a["".concat(ONYXKEYS_1.default.COLLECTION.POLICY, "1")] = {
            id: '1',
            name: 'Workspace 1',
            owner: 'johndoe12@expensify.com',
            role: isAdmin ? 'admin' : 'user',
            customUnits: status === CONST_1.default.INDICATOR_STATUS.HAS_CUSTOM_UNITS_ERROR
                ? {
                    errors: {
                        error: 'Something went wrong',
                    },
                }
                : undefined,
        },
        _a["".concat(ONYXKEYS_1.default.COLLECTION.POLICY, "2")] = {
            id: '2',
            name: 'Workspace 2',
            owner: 'johndoe12@expensify.com',
            role: isAdmin ? 'admin' : 'user',
            errors: status === CONST_1.default.INDICATOR_STATUS.HAS_POLICY_ERRORS
                ? {
                    error: 'Something went wrong',
                }
                : undefined,
        },
        _a["".concat(ONYXKEYS_1.default.COLLECTION.POLICY, "3")] = {
            id: '3',
            name: 'Workspace 3',
            owner: 'johndoe12@expensify.com',
            role: isAdmin ? 'admin' : 'user',
            employeeList: {
                // eslint-disable-next-line @typescript-eslint/naming-convention
                'johndoe12@expensify.com': {
                    email: 'johndoe12@expensify.com',
                    errors: status === CONST_1.default.INDICATOR_STATUS.HAS_EMPLOYEE_LIST_ERROR
                        ? {
                            error: 'Something went wrong',
                        }
                        : undefined,
                },
            },
        },
        _a["".concat(ONYXKEYS_1.default.COLLECTION.POLICY, "4")] = {
            id: '4',
            name: 'Workspace 4',
            owner: 'johndoe12@expensify.com',
            role: isAdmin ? 'admin' : 'auditor',
            connections: status === CONST_1.default.INDICATOR_STATUS.HAS_SYNC_ERRORS
                ? {
                    xero: {
                        lastSync: {
                            isSuccessful: false,
                            errorDate: new Date().toISOString(),
                        },
                    },
                }
                : undefined,
        },
        _a[ONYXKEYS_1.default.BANK_ACCOUNT_LIST] = {
            // eslint-disable-next-line @typescript-eslint/naming-convention
            12345: {
                methodID: 12345,
                errors: status === CONST_1.default.INDICATOR_STATUS.HAS_PAYMENT_METHOD_ERROR
                    ? {
                        error: 'Something went wrong',
                    }
                    : undefined,
            },
        },
        _a[ONYXKEYS_1.default.USER_WALLET] = {
            bankAccountID: 12345,
            errors: status === CONST_1.default.INDICATOR_STATUS.HAS_USER_WALLET_ERRORS
                ? {
                    error: 'Something went wrong',
                }
                : undefined,
        },
        _a[ONYXKEYS_1.default.WALLET_TERMS] = {
            errors: status === CONST_1.default.INDICATOR_STATUS.HAS_WALLET_TERMS_ERRORS
                ? {
                    error: 'Something went wrong',
                }
                : undefined,
        },
        _a[ONYXKEYS_1.default.LOGIN_LIST] = {
            // eslint-disable-next-line @typescript-eslint/naming-convention
            'johndoe12@expensify.com': {
                partnerName: 'John Doe',
                partnerUserID: 'johndoe12@expensify.com',
                validatedDate: status !== CONST_1.default.INDICATOR_STATUS.HAS_LOGIN_LIST_INFO ? new Date().toISOString() : undefined,
                errorFields: status === CONST_1.default.INDICATOR_STATUS.HAS_LOGIN_LIST_ERROR
                    ? {
                        field: {
                            error: 'Something went wrong',
                        },
                    }
                    : undefined,
            },
        },
        _a[ONYXKEYS_1.default.REIMBURSEMENT_ACCOUNT] = {
            achData: {
                bankAccountID: 12345,
            },
            errors: status === CONST_1.default.INDICATOR_STATUS.HAS_REIMBURSEMENT_ACCOUNT_ERRORS
                ? {
                    error: 'Something went wrong',
                }
                : undefined,
        },
        _a[ONYXKEYS_1.default.SUBSCRIPTION_RETRY_BILLING_STATUS_SUCCESSFUL] = status === CONST_1.default.INDICATOR_STATUS.HAS_SUBSCRIPTION_INFO,
        _a[ONYXKEYS_1.default.SUBSCRIPTION_RETRY_BILLING_STATUS_FAILED] = status === CONST_1.default.INDICATOR_STATUS.HAS_SUBSCRIPTION_ERRORS,
        _a);
};
var TEST_CASES = [
    {
        name: 'has policy errors',
        indicatorColor: theme_1.defaultTheme.danger,
        status: CONST_1.default.INDICATOR_STATUS.HAS_POLICY_ERRORS,
        policyIDWithErrors: '2',
    },
    {
        name: 'has custom units error',
        indicatorColor: theme_1.defaultTheme.danger,
        status: CONST_1.default.INDICATOR_STATUS.HAS_CUSTOM_UNITS_ERROR,
        policyIDWithErrors: '1',
    },
    {
        name: 'has employee list error',
        indicatorColor: theme_1.defaultTheme.danger,
        status: CONST_1.default.INDICATOR_STATUS.HAS_EMPLOYEE_LIST_ERROR,
        policyIDWithErrors: '3',
    },
    {
        name: 'has sync errors',
        indicatorColor: theme_1.defaultTheme.danger,
        status: CONST_1.default.INDICATOR_STATUS.HAS_SYNC_ERRORS,
        policyIDWithErrors: '4',
    },
    {
        name: 'has user wallet errors',
        indicatorColor: theme_1.defaultTheme.danger,
        status: CONST_1.default.INDICATOR_STATUS.HAS_USER_WALLET_ERRORS,
        policyIDWithErrors: undefined,
    },
    {
        name: 'has payment method error',
        indicatorColor: theme_1.defaultTheme.danger,
        status: CONST_1.default.INDICATOR_STATUS.HAS_PAYMENT_METHOD_ERROR,
        policyIDWithErrors: undefined,
    },
    {
        name: 'has subscription errors',
        indicatorColor: theme_1.defaultTheme.danger,
        status: CONST_1.default.INDICATOR_STATUS.HAS_SUBSCRIPTION_ERRORS,
        policyIDWithErrors: undefined,
    },
    {
        name: 'has reimbursement account errors',
        indicatorColor: theme_1.defaultTheme.danger,
        status: CONST_1.default.INDICATOR_STATUS.HAS_REIMBURSEMENT_ACCOUNT_ERRORS,
        policyIDWithErrors: undefined,
    },
    {
        name: 'has login list error',
        indicatorColor: theme_1.defaultTheme.danger,
        status: CONST_1.default.INDICATOR_STATUS.HAS_LOGIN_LIST_ERROR,
        policyIDWithErrors: undefined,
    },
    {
        name: 'has wallet terms errors',
        indicatorColor: theme_1.defaultTheme.danger,
        status: CONST_1.default.INDICATOR_STATUS.HAS_WALLET_TERMS_ERRORS,
        policyIDWithErrors: undefined,
    },
    {
        name: 'has login list info',
        indicatorColor: theme_1.defaultTheme.success,
        status: CONST_1.default.INDICATOR_STATUS.HAS_LOGIN_LIST_INFO,
        policyIDWithErrors: undefined,
    },
    {
        name: 'has subscription info',
        indicatorColor: theme_1.defaultTheme.success,
        status: CONST_1.default.INDICATOR_STATUS.HAS_SUBSCRIPTION_INFO,
        policyIDWithErrors: undefined,
    },
];
var TEST_CASES_NON_ADMIN = [
    {
        name: 'has custom units error but not an admin so no RBR',
        indicatorColor: theme_1.defaultTheme.success,
        status: CONST_1.default.INDICATOR_STATUS.HAS_CUSTOM_UNITS_ERROR,
    },
    {
        name: 'has policy errors but not an admin so no RBR',
        indicatorColor: theme_1.defaultTheme.success,
        status: CONST_1.default.INDICATOR_STATUS.HAS_POLICY_ERRORS,
    },
    {
        name: 'has employee list error but not an admin so no RBR',
        indicatorColor: theme_1.defaultTheme.success,
        status: CONST_1.default.INDICATOR_STATUS.HAS_EMPLOYEE_LIST_ERROR,
    },
    {
        name: 'has sync errors but not an admin so no RBR',
        indicatorColor: theme_1.defaultTheme.success,
        status: CONST_1.default.INDICATOR_STATUS.HAS_SYNC_ERRORS,
    },
];
describe('useIndicatorStatusTest', function () {
    beforeAll(function () {
        react_native_onyx_1.default.init({
            keys: ONYXKEYS_1.default,
        });
    });
    describe.each(TEST_CASES)('$name', function (testCase) {
        beforeAll(function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, react_native_onyx_1.default.multiSet(getMockForStatus(testCase.status))];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, (0, waitForBatchedUpdates_1.default)()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('returns correct indicatorColor', function () { return __awaiter(void 0, void 0, void 0, function () {
            var result, indicatorColor;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        result = (0, react_native_1.renderHook)(function () { return (0, useIndicatorStatus_1.default)(); }).result;
                        return [4 /*yield*/, (0, react_native_1.act)(function () { return __awaiter(void 0, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, (0, waitForBatchedUpdates_1.default)()];
                                        case 1:
                                            _a.sent();
                                            return [2 /*return*/];
                                    }
                                });
                            }); })];
                    case 1:
                        _a.sent();
                        indicatorColor = result.current.indicatorColor;
                        expect(indicatorColor).toBe(testCase.indicatorColor);
                        return [2 /*return*/];
                }
            });
        }); });
        it('returns correct status', function () { return __awaiter(void 0, void 0, void 0, function () {
            var result, status;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        result = (0, react_native_1.renderHook)(function () { return (0, useIndicatorStatus_1.default)(); }).result;
                        return [4 /*yield*/, (0, react_native_1.act)(function () { return __awaiter(void 0, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, (0, waitForBatchedUpdates_1.default)()];
                                        case 1:
                                            _a.sent();
                                            return [2 /*return*/];
                                    }
                                });
                            }); })];
                    case 1:
                        _a.sent();
                        status = result.current.status;
                        expect(status).toBe(testCase.status);
                        return [2 /*return*/];
                }
            });
        }); });
        it('returns correct policyIDWithErrors', function () { return __awaiter(void 0, void 0, void 0, function () {
            var result, policyIDWithErrors;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        result = (0, react_native_1.renderHook)(function () { return (0, useIndicatorStatus_1.default)(); }).result;
                        return [4 /*yield*/, (0, react_native_1.act)(function () { return __awaiter(void 0, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, (0, waitForBatchedUpdates_1.default)()];
                                        case 1:
                                            _a.sent();
                                            return [2 /*return*/];
                                    }
                                });
                            }); })];
                    case 1:
                        _a.sent();
                        policyIDWithErrors = result.current.policyIDWithErrors;
                        expect(policyIDWithErrors).toBe(testCase.policyIDWithErrors);
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe.each(TEST_CASES_NON_ADMIN)('$name', function (testCase) {
        beforeAll(function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, react_native_onyx_1.default.multiSet(getMockForStatus(testCase.status, false))];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, (0, waitForBatchedUpdates_1.default)()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('returns correct indicatorColor', function () { return __awaiter(void 0, void 0, void 0, function () {
            var result, indicatorColor;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        result = (0, react_native_1.renderHook)(function () { return (0, useIndicatorStatus_1.default)(); }).result;
                        return [4 /*yield*/, (0, react_native_1.act)(function () { return __awaiter(void 0, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, (0, waitForBatchedUpdates_1.default)()];
                                        case 1:
                                            _a.sent();
                                            return [2 /*return*/];
                                    }
                                });
                            }); })];
                    case 1:
                        _a.sent();
                        indicatorColor = result.current.indicatorColor;
                        expect(indicatorColor).toBe(testCase.indicatorColor);
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
