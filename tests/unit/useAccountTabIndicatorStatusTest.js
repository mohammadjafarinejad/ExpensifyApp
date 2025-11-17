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
var useAccountTabIndicatorStatus_1 = require("@hooks/useAccountTabIndicatorStatus");
// eslint-disable-next-line no-restricted-imports
var theme_1 = require("@styles/theme");
var CONST_1 = require("@src/CONST");
var ONYXKEYS_1 = require("@src/ONYXKEYS");
var waitForBatchedUpdatesWithAct_1 = require("../utils/waitForBatchedUpdatesWithAct");
var getMockForStatus = function (status) {
    var _a;
    return (_a = {},
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
            chatReportID: status === CONST_1.default.INDICATOR_STATUS.HAS_WALLET_TERMS_ERRORS ? undefined : '123',
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
            // eslint-disable-next-line @typescript-eslint/naming-convention
            'otheruser@expensify.com': {
                partnerName: 'Other User',
                partnerUserID: status === CONST_1.default.INDICATOR_STATUS.HAS_LOGIN_LIST_INFO ? 'different@expensify.com' : 'otheruser@expensify.com',
                validatedDate: status === CONST_1.default.INDICATOR_STATUS.HAS_LOGIN_LIST_INFO ? undefined : new Date().toISOString(),
                errorFields: undefined,
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
        _a[ONYXKEYS_1.default.PRIVATE_PERSONAL_DETAILS] = {
            errorFields: status === CONST_1.default.INDICATOR_STATUS.HAS_PHONE_NUMBER_ERROR
                ? {
                    phoneNumber: 'Invalid phone number',
                }
                : undefined,
        },
        _a["".concat(ONYXKEYS_1.default.CARD_LIST)] = {
            // eslint-disable-next-line @typescript-eslint/naming-convention
            card123: {
                bank: 'OTHER_BANK',
                lastScrapeResult: status === CONST_1.default.INDICATOR_STATUS.HAS_CARD_CONNECTION_ERROR ? 403 : 200,
            },
            // eslint-disable-next-line @typescript-eslint/naming-convention
            card456: {
                bank: 'ANOTHER_BANK',
                lastScrapeResult: status === CONST_1.default.INDICATOR_STATUS.HAS_CARD_CONNECTION_ERROR ? 403 : 200,
            },
        },
        _a[ONYXKEYS_1.default.SESSION] = {
            email: 'johndoe12@expensify.com',
        },
        _a);
};
var TEST_CASES = [
    {
        name: 'has user wallet errors',
        indicatorColor: theme_1.defaultTheme.danger,
        status: CONST_1.default.INDICATOR_STATUS.HAS_USER_WALLET_ERRORS,
    },
    {
        name: 'has payment method error',
        indicatorColor: theme_1.defaultTheme.danger,
        status: CONST_1.default.INDICATOR_STATUS.HAS_PAYMENT_METHOD_ERROR,
    },
    {
        name: 'has reimbursement account errors',
        indicatorColor: theme_1.defaultTheme.danger,
        status: CONST_1.default.INDICATOR_STATUS.HAS_REIMBURSEMENT_ACCOUNT_ERRORS,
    },
    {
        name: 'has login list error',
        indicatorColor: theme_1.defaultTheme.danger,
        status: CONST_1.default.INDICATOR_STATUS.HAS_LOGIN_LIST_ERROR,
    },
    {
        name: 'has wallet terms errors',
        indicatorColor: theme_1.defaultTheme.danger,
        status: CONST_1.default.INDICATOR_STATUS.HAS_WALLET_TERMS_ERRORS,
    },
    {
        name: 'has card connection error',
        indicatorColor: theme_1.defaultTheme.danger,
        status: CONST_1.default.INDICATOR_STATUS.HAS_CARD_CONNECTION_ERROR,
    },
    {
        name: 'has phone number error',
        indicatorColor: theme_1.defaultTheme.danger,
        status: CONST_1.default.INDICATOR_STATUS.HAS_PHONE_NUMBER_ERROR,
    },
    {
        name: 'has login list info',
        indicatorColor: theme_1.defaultTheme.success,
        status: CONST_1.default.INDICATOR_STATUS.HAS_LOGIN_LIST_INFO,
    },
];
describe('useAccountTabIndicatorStatus', function () {
    beforeAll(function () {
        react_native_onyx_1.default.init({
            keys: ONYXKEYS_1.default,
        });
    });
    describe.each(TEST_CASES)('$name', function (testCase) {
        beforeAll(function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, react_native_1.act)(function () { return __awaiter(void 0, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, react_native_onyx_1.default.multiSet(getMockForStatus(testCase.status))];
                                    case 1:
                                        _a.sent();
                                        return [4 /*yield*/, (0, waitForBatchedUpdatesWithAct_1.default)()];
                                    case 2:
                                        _a.sent();
                                        return [2 /*return*/];
                                }
                            });
                        }); })];
                    case 1:
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
                        result = (0, react_native_1.renderHook)(function () { return (0, useAccountTabIndicatorStatus_1.default)(); }).result;
                        return [4 /*yield*/, (0, waitForBatchedUpdatesWithAct_1.default)()];
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
                        result = (0, react_native_1.renderHook)(function () { return (0, useAccountTabIndicatorStatus_1.default)(); }).result;
                        return [4 /*yield*/, (0, waitForBatchedUpdatesWithAct_1.default)()];
                    case 1:
                        _a.sent();
                        status = result.current.status;
                        expect(status).toBe(testCase.status);
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('no errors or info', function () {
        beforeAll(function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, react_native_1.act)(function () { return __awaiter(void 0, void 0, void 0, function () {
                            var _a;
                            return __generator(this, function (_b) {
                                switch (_b.label) {
                                    case 0: return [4 /*yield*/, react_native_onyx_1.default.multiSet((_a = {},
                                            _a[ONYXKEYS_1.default.BANK_ACCOUNT_LIST] = {},
                                            _a[ONYXKEYS_1.default.USER_WALLET] = {},
                                            _a[ONYXKEYS_1.default.WALLET_TERMS] = {},
                                            _a[ONYXKEYS_1.default.LOGIN_LIST] = {},
                                            _a[ONYXKEYS_1.default.REIMBURSEMENT_ACCOUNT] = {},
                                            _a[ONYXKEYS_1.default.PRIVATE_PERSONAL_DETAILS] = {},
                                            _a["".concat(ONYXKEYS_1.default.CARD_LIST)] = {},
                                            _a[ONYXKEYS_1.default.SESSION] = {
                                                email: 'johndoe12@expensify.com',
                                            },
                                            _a))];
                                    case 1:
                                        _b.sent();
                                        return [4 /*yield*/, (0, waitForBatchedUpdatesWithAct_1.default)()];
                                    case 2:
                                        _b.sent();
                                        return [2 /*return*/];
                                }
                            });
                        }); })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('returns undefined status when no errors or info exist', function () { return __awaiter(void 0, void 0, void 0, function () {
            var result, status;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        result = (0, react_native_1.renderHook)(function () { return (0, useAccountTabIndicatorStatus_1.default)(); }).result;
                        return [4 /*yield*/, (0, waitForBatchedUpdatesWithAct_1.default)()];
                    case 1:
                        _a.sent();
                        status = result.current.status;
                        expect(status).toBeUndefined();
                        return [2 /*return*/];
                }
            });
        }); });
        it('returns success color when no errors or info exist', function () { return __awaiter(void 0, void 0, void 0, function () {
            var result, indicatorColor;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        result = (0, react_native_1.renderHook)(function () { return (0, useAccountTabIndicatorStatus_1.default)(); }).result;
                        return [4 /*yield*/, (0, waitForBatchedUpdatesWithAct_1.default)()];
                    case 1:
                        _a.sent();
                        indicatorColor = result.current.indicatorColor;
                        expect(indicatorColor).toBe(theme_1.defaultTheme.success);
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('wallet terms with chatReportID', function () {
        beforeAll(function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, react_native_1.act)(function () { return __awaiter(void 0, void 0, void 0, function () {
                            var _a;
                            return __generator(this, function (_b) {
                                switch (_b.label) {
                                    case 0: return [4 /*yield*/, react_native_onyx_1.default.multiSet((_a = {},
                                            _a[ONYXKEYS_1.default.BANK_ACCOUNT_LIST] = {},
                                            _a[ONYXKEYS_1.default.USER_WALLET] = {},
                                            _a[ONYXKEYS_1.default.WALLET_TERMS] = {
                                                errors: {
                                                    error: 'Something went wrong',
                                                },
                                                chatReportID: '123',
                                            },
                                            _a[ONYXKEYS_1.default.LOGIN_LIST] = {},
                                            _a[ONYXKEYS_1.default.REIMBURSEMENT_ACCOUNT] = {},
                                            _a[ONYXKEYS_1.default.PRIVATE_PERSONAL_DETAILS] = {},
                                            _a["".concat(ONYXKEYS_1.default.CARD_LIST)] = {},
                                            _a[ONYXKEYS_1.default.SESSION] = {
                                                email: 'johndoe12@expensify.com',
                                            },
                                            _a))];
                                    case 1:
                                        _b.sent();
                                        return [4 /*yield*/, (0, waitForBatchedUpdatesWithAct_1.default)()];
                                    case 2:
                                        _b.sent();
                                        return [2 /*return*/];
                                }
                            });
                        }); })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('does not show wallet terms error when chatReportID exists', function () { return __awaiter(void 0, void 0, void 0, function () {
            var result, status;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        result = (0, react_native_1.renderHook)(function () { return (0, useAccountTabIndicatorStatus_1.default)(); }).result;
                        return [4 /*yield*/, (0, waitForBatchedUpdatesWithAct_1.default)()];
                    case 1:
                        _a.sent();
                        status = result.current.status;
                        expect(status).toBeUndefined();
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('multiple errors', function () {
        beforeAll(function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, react_native_1.act)(function () { return __awaiter(void 0, void 0, void 0, function () {
                            var _a;
                            return __generator(this, function (_b) {
                                switch (_b.label) {
                                    case 0: return [4 /*yield*/, react_native_onyx_1.default.multiSet((_a = {},
                                            _a[ONYXKEYS_1.default.BANK_ACCOUNT_LIST] = {
                                                // eslint-disable-next-line @typescript-eslint/naming-convention
                                                12345: {
                                                    methodID: 12345,
                                                    errors: {
                                                        error: 'Payment method error',
                                                    },
                                                },
                                            },
                                            _a[ONYXKEYS_1.default.USER_WALLET] = {
                                                bankAccountID: 12345,
                                                errors: {
                                                    error: 'Wallet error',
                                                },
                                            },
                                            _a[ONYXKEYS_1.default.WALLET_TERMS] = {},
                                            _a[ONYXKEYS_1.default.LOGIN_LIST] = {},
                                            _a[ONYXKEYS_1.default.REIMBURSEMENT_ACCOUNT] = {},
                                            _a[ONYXKEYS_1.default.PRIVATE_PERSONAL_DETAILS] = {},
                                            _a["".concat(ONYXKEYS_1.default.CARD_LIST)] = {},
                                            _a[ONYXKEYS_1.default.SESSION] = {
                                                email: 'johndoe12@expensify.com',
                                            },
                                            _a))];
                                    case 1:
                                        _b.sent();
                                        return [4 /*yield*/, (0, waitForBatchedUpdatesWithAct_1.default)()];
                                    case 2:
                                        _b.sent();
                                        return [2 /*return*/];
                                }
                            });
                        }); })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('returns the first error status found', function () { return __awaiter(void 0, void 0, void 0, function () {
            var result, status;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        result = (0, react_native_1.renderHook)(function () { return (0, useAccountTabIndicatorStatus_1.default)(); }).result;
                        return [4 /*yield*/, (0, waitForBatchedUpdatesWithAct_1.default)()];
                    case 1:
                        _a.sent();
                        status = result.current.status;
                        // Should return the first error in the errorChecking object
                        expect(status).toBe(CONST_1.default.INDICATOR_STATUS.HAS_USER_WALLET_ERRORS);
                        return [2 /*return*/];
                }
            });
        }); });
        it('returns danger color for multiple errors', function () { return __awaiter(void 0, void 0, void 0, function () {
            var result, indicatorColor;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        result = (0, react_native_1.renderHook)(function () { return (0, useAccountTabIndicatorStatus_1.default)(); }).result;
                        return [4 /*yield*/, (0, waitForBatchedUpdatesWithAct_1.default)()];
                    case 1:
                        _a.sent();
                        indicatorColor = result.current.indicatorColor;
                        expect(indicatorColor).toBe(theme_1.defaultTheme.danger);
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('error takes priority over info', function () {
        beforeAll(function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, react_native_1.act)(function () { return __awaiter(void 0, void 0, void 0, function () {
                            var _a;
                            return __generator(this, function (_b) {
                                switch (_b.label) {
                                    case 0: return [4 /*yield*/, react_native_onyx_1.default.multiSet((_a = {},
                                            _a[ONYXKEYS_1.default.BANK_ACCOUNT_LIST] = {},
                                            _a[ONYXKEYS_1.default.USER_WALLET] = {
                                                bankAccountID: 12345,
                                                errors: {
                                                    error: 'Wallet error',
                                                },
                                            },
                                            _a[ONYXKEYS_1.default.WALLET_TERMS] = {},
                                            _a[ONYXKEYS_1.default.LOGIN_LIST] = {
                                                // eslint-disable-next-line @typescript-eslint/naming-convention
                                                'johndoe12@expensify.com': {
                                                    partnerName: 'John Doe',
                                                    partnerUserID: 'johndoe12@expensify.com',
                                                    validatedDate: undefined, // This would trigger info status
                                                },
                                            },
                                            _a[ONYXKEYS_1.default.REIMBURSEMENT_ACCOUNT] = {},
                                            _a[ONYXKEYS_1.default.PRIVATE_PERSONAL_DETAILS] = {},
                                            _a["".concat(ONYXKEYS_1.default.CARD_LIST)] = {},
                                            _a[ONYXKEYS_1.default.SESSION] = {
                                                email: 'johndoe12@expensify.com',
                                            },
                                            _a))];
                                    case 1:
                                        _b.sent();
                                        return [4 /*yield*/, (0, waitForBatchedUpdatesWithAct_1.default)()];
                                    case 2:
                                        _b.sent();
                                        return [2 /*return*/];
                                }
                            });
                        }); })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('returns error status when both error and info exist', function () { return __awaiter(void 0, void 0, void 0, function () {
            var result, status;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        result = (0, react_native_1.renderHook)(function () { return (0, useAccountTabIndicatorStatus_1.default)(); }).result;
                        return [4 /*yield*/, (0, waitForBatchedUpdatesWithAct_1.default)()];
                    case 1:
                        _a.sent();
                        status = result.current.status;
                        expect(status).toBe(CONST_1.default.INDICATOR_STATUS.HAS_USER_WALLET_ERRORS);
                        return [2 /*return*/];
                }
            });
        }); });
        it('returns danger color when error takes priority', function () { return __awaiter(void 0, void 0, void 0, function () {
            var result, indicatorColor;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        result = (0, react_native_1.renderHook)(function () { return (0, useAccountTabIndicatorStatus_1.default)(); }).result;
                        return [4 /*yield*/, (0, waitForBatchedUpdatesWithAct_1.default)()];
                    case 1:
                        _a.sent();
                        indicatorColor = result.current.indicatorColor;
                        expect(indicatorColor).toBe(theme_1.defaultTheme.danger);
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('missing data', function () {
        beforeAll(function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, react_native_1.act)(function () { return __awaiter(void 0, void 0, void 0, function () {
                            var _a;
                            return __generator(this, function (_b) {
                                switch (_b.label) {
                                    case 0: return [4 /*yield*/, react_native_onyx_1.default.multiSet((_a = {},
                                            _a[ONYXKEYS_1.default.BANK_ACCOUNT_LIST] = null,
                                            _a[ONYXKEYS_1.default.USER_WALLET] = null,
                                            _a[ONYXKEYS_1.default.WALLET_TERMS] = null,
                                            _a[ONYXKEYS_1.default.LOGIN_LIST] = null,
                                            _a[ONYXKEYS_1.default.REIMBURSEMENT_ACCOUNT] = null,
                                            _a[ONYXKEYS_1.default.PRIVATE_PERSONAL_DETAILS] = null,
                                            _a["".concat(ONYXKEYS_1.default.CARD_LIST)] = null,
                                            _a[ONYXKEYS_1.default.SESSION] = null,
                                            _a))];
                                    case 1:
                                        _b.sent();
                                        return [4 /*yield*/, (0, waitForBatchedUpdatesWithAct_1.default)()];
                                    case 2:
                                        _b.sent();
                                        return [2 /*return*/];
                                }
                            });
                        }); })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('handles missing data gracefully', function () { return __awaiter(void 0, void 0, void 0, function () {
            var result, _a, status, indicatorColor;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        result = (0, react_native_1.renderHook)(function () { return (0, useAccountTabIndicatorStatus_1.default)(); }).result;
                        return [4 /*yield*/, (0, waitForBatchedUpdatesWithAct_1.default)()];
                    case 1:
                        _b.sent();
                        _a = result.current, status = _a.status, indicatorColor = _a.indicatorColor;
                        expect(status).toBeUndefined();
                        expect(indicatorColor).toBe(theme_1.defaultTheme.success);
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
