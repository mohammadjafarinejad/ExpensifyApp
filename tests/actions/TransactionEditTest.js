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
var OnyxUpdateManager_1 = require("@libs/actions/OnyxUpdateManager");
var TransactionEdit_1 = require("@libs/actions/TransactionEdit");
var OnyxDerived_1 = require("@userActions/OnyxDerived");
var SequentialQueue = require("@src/libs/Network/SequentialQueue");
var ONYXKEYS_1 = require("@src/ONYXKEYS");
var transaction_1 = require("../utils/collections/transaction");
var getOnyxValue_1 = require("../utils/getOnyxValue");
var TestHelper = require("../utils/TestHelper");
var waitForBatchedUpdates_1 = require("../utils/waitForBatchedUpdates");
(0, OnyxUpdateManager_1.default)();
describe('actions/TransactionEdit', function () {
    beforeAll(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    react_native_onyx_1.default.init({
                        keys: ONYXKEYS_1.default,
                    });
                    (0, OnyxDerived_1.default)();
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
                case 0:
                    global.fetch = TestHelper.getGlobalFetchMock();
                    SequentialQueue.resetQueue();
                    return [4 /*yield*/, react_native_onyx_1.default.clear()];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, (0, waitForBatchedUpdates_1.default)()];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    describe('Transaction backup', function () {
        describe('createBackupTransaction', function () {
            var transactionOriginal = (0, transaction_1.default)(1);
            it('should create a backup transaction when none exists', function () { return __awaiter(void 0, void 0, void 0, function () {
                var transaction, isDraft, backup;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            transaction = __assign(__assign({}, transactionOriginal), { amount: 100 });
                            isDraft = false;
                            (0, TransactionEdit_1.createBackupTransaction)(transaction, isDraft);
                            return [4 /*yield*/, (0, waitForBatchedUpdates_1.default)()];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, (0, getOnyxValue_1.default)("".concat(ONYXKEYS_1.default.COLLECTION.TRANSACTION_BACKUP).concat(transaction.transactionID))];
                        case 2:
                            backup = _a.sent();
                            expect(backup).toEqual(transaction);
                            return [2 /*return*/];
                    }
                });
            }); });
            it('should restore the transaction from backup if one exists', function () { return __awaiter(void 0, void 0, void 0, function () {
                var transaction, transactionBackup, isDraft, transactionDraft;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            transaction = __assign(__assign({}, transactionOriginal), { amount: 100 });
                            transactionBackup = __assign(__assign({}, transactionOriginal), { amount: 200 });
                            isDraft = true;
                            return [4 /*yield*/, react_native_onyx_1.default.set("".concat(ONYXKEYS_1.default.COLLECTION.TRANSACTION_BACKUP).concat(transaction.transactionID), transactionBackup)];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, (0, waitForBatchedUpdates_1.default)()];
                        case 2:
                            _a.sent();
                            (0, TransactionEdit_1.createBackupTransaction)(transaction, isDraft);
                            return [4 /*yield*/, (0, waitForBatchedUpdates_1.default)()];
                        case 3:
                            _a.sent();
                            return [4 /*yield*/, (0, getOnyxValue_1.default)("".concat(ONYXKEYS_1.default.COLLECTION.TRANSACTION_DRAFT).concat(transaction.transactionID))];
                        case 4:
                            transactionDraft = _a.sent();
                            expect(transactionDraft).not.toBeUndefined();
                            expect(transactionDraft === null || transactionDraft === void 0 ? void 0 : transactionDraft.amount).toBe(transactionBackup.amount);
                            return [2 /*return*/];
                    }
                });
            }); });
            it('should handle null transaction gracefully', function () { return __awaiter(void 0, void 0, void 0, function () {
                var backups;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            (0, TransactionEdit_1.createBackupTransaction)(undefined, false);
                            return [4 /*yield*/, (0, waitForBatchedUpdates_1.default)()];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, (0, getOnyxValue_1.default)("".concat(ONYXKEYS_1.default.COLLECTION.TRANSACTION_BACKUP))];
                        case 2:
                            backups = _a.sent();
                            expect(backups).toBeUndefined();
                            return [2 /*return*/];
                    }
                });
            }); });
        });
        describe('restoreOriginalTransactionFromBackup', function () {
            var transactionOriginal = (0, transaction_1.default)(1);
            it('should restore the original transaction from backup', function () { return __awaiter(void 0, void 0, void 0, function () {
                var transactionBackup, isDraft, restoredTransaction, backupTransaction;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            transactionBackup = __assign(__assign({}, transactionOriginal), { amount: 200 });
                            isDraft = false;
                            return [4 /*yield*/, react_native_onyx_1.default.set("".concat(ONYXKEYS_1.default.COLLECTION.TRANSACTION_BACKUP).concat(transactionOriginal.transactionID), transactionBackup)];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, (0, waitForBatchedUpdates_1.default)()];
                        case 2:
                            _a.sent();
                            (0, TransactionEdit_1.restoreOriginalTransactionFromBackup)(transactionOriginal.transactionID, isDraft);
                            return [4 /*yield*/, (0, waitForBatchedUpdates_1.default)()];
                        case 3:
                            _a.sent();
                            return [4 /*yield*/, (0, getOnyxValue_1.default)("".concat(ONYXKEYS_1.default.COLLECTION.TRANSACTION).concat(transactionOriginal.transactionID))];
                        case 4:
                            restoredTransaction = _a.sent();
                            return [4 /*yield*/, (0, getOnyxValue_1.default)("".concat(ONYXKEYS_1.default.COLLECTION.TRANSACTION_BACKUP).concat(transactionOriginal.transactionID))];
                        case 5:
                            backupTransaction = _a.sent();
                            expect(restoredTransaction).not.toBeUndefined();
                            expect(restoredTransaction === null || restoredTransaction === void 0 ? void 0 : restoredTransaction.amount).toBe(transactionBackup.amount);
                            expect(backupTransaction).toBeUndefined();
                            return [2 /*return*/];
                    }
                });
            }); });
            it('should restore the draft transaction from backup', function () { return __awaiter(void 0, void 0, void 0, function () {
                var transactionBackup, isDraft, restoredDraftTransaction, backupTransaction;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            transactionBackup = __assign(__assign({}, transactionOriginal), { amount: 300 });
                            isDraft = true;
                            return [4 /*yield*/, react_native_onyx_1.default.set("".concat(ONYXKEYS_1.default.COLLECTION.TRANSACTION_BACKUP).concat(transactionOriginal.transactionID), transactionBackup)];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, (0, waitForBatchedUpdates_1.default)()];
                        case 2:
                            _a.sent();
                            (0, TransactionEdit_1.restoreOriginalTransactionFromBackup)(transactionOriginal.transactionID, isDraft);
                            return [4 /*yield*/, (0, waitForBatchedUpdates_1.default)()];
                        case 3:
                            _a.sent();
                            return [4 /*yield*/, (0, getOnyxValue_1.default)("".concat(ONYXKEYS_1.default.COLLECTION.TRANSACTION_DRAFT).concat(transactionOriginal.transactionID))];
                        case 4:
                            restoredDraftTransaction = _a.sent();
                            return [4 /*yield*/, (0, getOnyxValue_1.default)("".concat(ONYXKEYS_1.default.COLLECTION.TRANSACTION_BACKUP).concat(transactionOriginal.transactionID))];
                        case 5:
                            backupTransaction = _a.sent();
                            expect(restoredDraftTransaction).not.toBeUndefined();
                            expect(restoredDraftTransaction === null || restoredDraftTransaction === void 0 ? void 0 : restoredDraftTransaction.amount).toBe(transactionBackup.amount);
                            expect(backupTransaction).toBeUndefined();
                            return [2 /*return*/];
                    }
                });
            }); });
            it('should handle missing backup gracefully', function () { return __awaiter(void 0, void 0, void 0, function () {
                var isDraft, restoredTransaction;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            isDraft = false;
                            (0, TransactionEdit_1.restoreOriginalTransactionFromBackup)(transactionOriginal.transactionID, isDraft);
                            return [4 /*yield*/, (0, waitForBatchedUpdates_1.default)()];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, (0, getOnyxValue_1.default)("".concat(ONYXKEYS_1.default.COLLECTION.TRANSACTION).concat(transactionOriginal.transactionID))];
                        case 2:
                            restoredTransaction = _a.sent();
                            expect(restoredTransaction).toBeUndefined();
                            return [2 /*return*/];
                    }
                });
            }); });
            it('should handle null transactionID gracefully', function () { return __awaiter(void 0, void 0, void 0, function () {
                var transactions;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            (0, TransactionEdit_1.restoreOriginalTransactionFromBackup)(undefined, false);
                            return [4 /*yield*/, (0, waitForBatchedUpdates_1.default)()];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, (0, getOnyxValue_1.default)("".concat(ONYXKEYS_1.default.COLLECTION.TRANSACTION))];
                        case 2:
                            transactions = _a.sent();
                            expect(transactions).toBeUndefined();
                            return [2 /*return*/];
                    }
                });
            }); });
        });
    });
});
