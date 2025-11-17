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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
var react_native_1 = require("@testing-library/react-native");
var react_native_onyx_1 = require("react-native-onyx");
var OnyxUtils_1 = require("react-native-onyx/dist/OnyxUtils");
var useOnyx_1 = require("@hooks/useOnyx");
var Transaction_1 = require("@libs/actions/Transaction");
var DateUtils_1 = require("@libs/DateUtils");
var MoneyRequestReportUtils_1 = require("@libs/MoneyRequestReportUtils");
var NumberUtils_1 = require("@libs/NumberUtils");
var ReportActionsUtils_1 = require("@libs/ReportActionsUtils");
var CONST_1 = require("@src/CONST");
var ONYXKEYS_1 = require("@src/ONYXKEYS");
var TransactionUtils = require("../../src/libs/TransactionUtils");
var reports_1 = require("../utils/collections/reports");
var waitForBatchedUpdates_1 = require("../utils/waitForBatchedUpdates");
function generateTransaction(values) {
    if (values === void 0) { values = {}; }
    var reportID = '1';
    var amount = 100;
    var currency = 'USD';
    var comment = '';
    var attendees = [];
    var created = '2023-10-01';
    var baseValues = TransactionUtils.buildOptimisticTransaction({
        transactionParams: {
            amount: amount,
            currency: currency,
            reportID: reportID,
            comment: comment,
            attendees: attendees,
            created: created,
        },
    });
    return __assign(__assign({}, baseValues), values);
}
var CURRENT_USER_ID = 1;
var FAKE_NEW_REPORT_ID = '2';
var FAKE_OLD_REPORT_ID = '3';
var FAKE_SELF_DM_REPORT_ID = '4';
var newReport = {
    reportID: FAKE_NEW_REPORT_ID,
    ownerAccountID: CURRENT_USER_ID,
    type: CONST_1.default.REPORT.TYPE.EXPENSE,
    stateNum: CONST_1.default.REPORT.STATE_NUM.OPEN,
    statusNum: CONST_1.default.REPORT.STATUS_NUM.OPEN,
};
var selfDM = {
    reportID: FAKE_SELF_DM_REPORT_ID,
    ownerAccountID: CURRENT_USER_ID,
    chatType: CONST_1.default.REPORT.CHAT_TYPE.SELF_DM,
};
var reportCollectionDataSet = (_a = {},
    _a["".concat(ONYXKEYS_1.default.COLLECTION.REPORT).concat(FAKE_NEW_REPORT_ID)] = newReport,
    _a["".concat(ONYXKEYS_1.default.COLLECTION.REPORT).concat(FAKE_SELF_DM_REPORT_ID)] = selfDM,
    _a);
var getReportFromUseOnyx = function (reportID) { return __awaiter(void 0, void 0, void 0, function () {
    var result;
    return __generator(this, function (_a) {
        result = (0, react_native_1.renderHook)(function () {
            var report = (0, useOnyx_1.default)("".concat(ONYXKEYS_1.default.COLLECTION.REPORT).concat(reportID), { canBeMissing: true })[0];
            return { report: report };
        }).result;
        return [2 /*return*/, result.current.report];
    });
}); };
describe('Transaction', function () {
    beforeAll(function () {
        var _a;
        react_native_onyx_1.default.init({
            keys: ONYXKEYS_1.default,
            initialKeyStates: __assign((_a = {}, _a[ONYXKEYS_1.default.SESSION] = { accountID: CURRENT_USER_ID }, _a), reportCollectionDataSet),
        });
    });
    beforeEach(function () {
        return react_native_onyx_1.default.clear().then(waitForBatchedUpdates_1.default);
    });
    describe('changeTransactionsReport', function () {
        it('correctly moves the IOU report action when an unreported transaction is added to an expense report', function () { return __awaiter(void 0, void 0, void 0, function () {
            var transaction, oldIOUAction, report, reportActions;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        transaction = generateTransaction({
                            reportID: CONST_1.default.REPORT.UNREPORTED_REPORT_ID,
                        });
                        oldIOUAction = {
                            reportActionID: (0, NumberUtils_1.rand64)(),
                            actionName: CONST_1.default.REPORT.ACTIONS.TYPE.IOU,
                            actorAccountID: CURRENT_USER_ID,
                            created: DateUtils_1.default.getDBTime(),
                            originalMessage: {
                                IOUReportID: '0',
                                IOUTransactionID: transaction.transactionID,
                                amount: transaction.amount,
                                currency: transaction.currency,
                                type: CONST_1.default.IOU.REPORT_ACTION_TYPE.TRACK,
                            },
                        };
                        return [4 /*yield*/, react_native_onyx_1.default.merge("".concat(ONYXKEYS_1.default.COLLECTION.TRANSACTION).concat(transaction.transactionID), transaction)];
                    case 1:
                        _b.sent();
                        return [4 /*yield*/, react_native_onyx_1.default.merge("".concat(ONYXKEYS_1.default.COLLECTION.REPORT_ACTIONS).concat(FAKE_SELF_DM_REPORT_ID), (_a = {}, _a[oldIOUAction.reportActionID] = oldIOUAction, _a))];
                    case 2:
                        _b.sent();
                        return [4 /*yield*/, getReportFromUseOnyx(FAKE_NEW_REPORT_ID)];
                    case 3:
                        report = _b.sent();
                        (0, Transaction_1.changeTransactionsReport)([transaction.transactionID], false, CURRENT_USER_ID, 'test@example.com', report);
                        return [4 /*yield*/, (0, waitForBatchedUpdates_1.default)()];
                    case 4:
                        _b.sent();
                        return [4 /*yield*/, new Promise(function (resolve) {
                                var connection = react_native_onyx_1.default.connect({
                                    key: "".concat(ONYXKEYS_1.default.COLLECTION.REPORT_ACTIONS).concat(FAKE_NEW_REPORT_ID),
                                    callback: function (value) {
                                        react_native_onyx_1.default.disconnect(connection);
                                        resolve(value);
                                    },
                                });
                            })];
                    case 5:
                        reportActions = _b.sent();
                        expect((0, ReportActionsUtils_1.getIOUActionForTransactionID)(Object.values(reportActions !== null && reportActions !== void 0 ? reportActions : {}), transaction.transactionID)).toBeDefined();
                        return [2 /*return*/];
                }
            });
        }); });
        it('correctly moves the IOU report action when a transaction is moved from one expense report to another', function () { return __awaiter(void 0, void 0, void 0, function () {
            var transaction, oldIOUAction, report, reportActions;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        transaction = generateTransaction({
                            reportID: FAKE_OLD_REPORT_ID,
                        });
                        oldIOUAction = {
                            reportActionID: (0, NumberUtils_1.rand64)(),
                            actionName: CONST_1.default.REPORT.ACTIONS.TYPE.IOU,
                            actorAccountID: CURRENT_USER_ID,
                            created: DateUtils_1.default.getDBTime(),
                            originalMessage: {
                                IOUReportID: FAKE_OLD_REPORT_ID,
                                IOUTransactionID: transaction.transactionID,
                                amount: transaction.amount,
                                currency: transaction.currency,
                                type: CONST_1.default.IOU.REPORT_ACTION_TYPE.CREATE,
                            },
                        };
                        return [4 /*yield*/, react_native_onyx_1.default.merge("".concat(ONYXKEYS_1.default.COLLECTION.TRANSACTION).concat(transaction.transactionID), transaction)];
                    case 1:
                        _b.sent();
                        return [4 /*yield*/, react_native_onyx_1.default.merge("".concat(ONYXKEYS_1.default.COLLECTION.REPORT_ACTIONS).concat(FAKE_OLD_REPORT_ID), (_a = {}, _a[oldIOUAction.reportActionID] = oldIOUAction, _a))];
                    case 2:
                        _b.sent();
                        return [4 /*yield*/, getReportFromUseOnyx(FAKE_NEW_REPORT_ID)];
                    case 3:
                        report = _b.sent();
                        (0, Transaction_1.changeTransactionsReport)([transaction.transactionID], false, CURRENT_USER_ID, 'test@example.com', report);
                        return [4 /*yield*/, (0, waitForBatchedUpdates_1.default)()];
                    case 4:
                        _b.sent();
                        return [4 /*yield*/, new Promise(function (resolve) {
                                var connection = react_native_onyx_1.default.connect({
                                    key: "".concat(ONYXKEYS_1.default.COLLECTION.REPORT_ACTIONS).concat(FAKE_NEW_REPORT_ID),
                                    callback: function (value) {
                                        react_native_onyx_1.default.disconnect(connection);
                                        resolve(value);
                                    },
                                });
                            })];
                    case 5:
                        reportActions = _b.sent();
                        expect((0, ReportActionsUtils_1.getIOUActionForTransactionID)(Object.values(reportActions !== null && reportActions !== void 0 ? reportActions : {}), transaction.transactionID)).toBeDefined();
                        return [2 /*return*/];
                }
            });
        }); });
        it('correctly handles reportNextStep parameter when moving transactions between reports', function () { return __awaiter(void 0, void 0, void 0, function () {
            var mockAPIWrite, transaction, oldIOUAction, mockReportNextStep, report, apiWriteCall, failureData, nextStepFailureData;
            var _a;
            var _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        mockAPIWrite = jest.spyOn(require('@libs/API'), 'write').mockImplementation(function () { return Promise.resolve(); });
                        transaction = generateTransaction({
                            reportID: FAKE_OLD_REPORT_ID,
                        });
                        oldIOUAction = {
                            reportActionID: (0, NumberUtils_1.rand64)(),
                            actionName: CONST_1.default.REPORT.ACTIONS.TYPE.IOU,
                            actorAccountID: CURRENT_USER_ID,
                            created: DateUtils_1.default.getDBTime(),
                            originalMessage: {
                                IOUReportID: FAKE_OLD_REPORT_ID,
                                IOUTransactionID: transaction.transactionID,
                                amount: transaction.amount,
                                currency: transaction.currency,
                                type: CONST_1.default.IOU.REPORT_ACTION_TYPE.CREATE,
                            },
                        };
                        mockReportNextStep = {
                            type: 'neutral',
                            icon: CONST_1.default.NEXT_STEP.ICONS.HOURGLASS,
                            message: [
                                {
                                    text: 'Test next step message',
                                },
                            ],
                        };
                        return [4 /*yield*/, react_native_onyx_1.default.merge("".concat(ONYXKEYS_1.default.COLLECTION.TRANSACTION).concat(transaction.transactionID), transaction)];
                    case 1:
                        _c.sent();
                        return [4 /*yield*/, react_native_onyx_1.default.merge("".concat(ONYXKEYS_1.default.COLLECTION.REPORT_ACTIONS).concat(FAKE_OLD_REPORT_ID), (_a = {}, _a[oldIOUAction.reportActionID] = oldIOUAction, _a))];
                    case 2:
                        _c.sent();
                        return [4 /*yield*/, getReportFromUseOnyx(FAKE_NEW_REPORT_ID)];
                    case 3:
                        report = _c.sent();
                        (0, Transaction_1.changeTransactionsReport)([transaction.transactionID], false, CURRENT_USER_ID, 'test@example.com', report, undefined, mockReportNextStep);
                        return [4 /*yield*/, (0, waitForBatchedUpdates_1.default)()];
                    case 4:
                        _c.sent();
                        expect(mockAPIWrite).toHaveBeenCalled();
                        apiWriteCall = mockAPIWrite.mock.calls.at(0);
                        failureData = (_b = apiWriteCall === null || apiWriteCall === void 0 ? void 0 : apiWriteCall[2]) === null || _b === void 0 ? void 0 : _b.failureData;
                        nextStepFailureData = failureData === null || failureData === void 0 ? void 0 : failureData.find(function (data) { return data.key === "".concat(ONYXKEYS_1.default.COLLECTION.NEXT_STEP).concat(FAKE_NEW_REPORT_ID); });
                        expect(nextStepFailureData).toBeDefined();
                        expect(nextStepFailureData === null || nextStepFailureData === void 0 ? void 0 : nextStepFailureData.value).toEqual(mockReportNextStep);
                        mockAPIWrite.mockRestore();
                        return [2 /*return*/];
                }
            });
        }); });
        it('correctly handles reportNextStep parameter when moving transactions to unreported report', function () { return __awaiter(void 0, void 0, void 0, function () {
            var mockAPIWrite, transaction, oldIOUAction, mockReportNextStep, report, apiWriteCall, failureData, nextStepFailureData;
            var _a;
            var _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        mockAPIWrite = jest.spyOn(require('@libs/API'), 'write').mockImplementation(function () { return Promise.resolve(); });
                        transaction = generateTransaction({
                            reportID: FAKE_OLD_REPORT_ID,
                        });
                        oldIOUAction = {
                            reportActionID: (0, NumberUtils_1.rand64)(),
                            actionName: CONST_1.default.REPORT.ACTIONS.TYPE.IOU,
                            actorAccountID: CURRENT_USER_ID,
                            created: DateUtils_1.default.getDBTime(),
                            originalMessage: {
                                IOUReportID: FAKE_OLD_REPORT_ID,
                                IOUTransactionID: transaction.transactionID,
                                amount: transaction.amount,
                                currency: transaction.currency,
                                type: CONST_1.default.IOU.REPORT_ACTION_TYPE.CREATE,
                            },
                        };
                        mockReportNextStep = {
                            type: 'alert',
                            icon: CONST_1.default.NEXT_STEP.ICONS.CHECKMARK,
                            message: [
                                {
                                    text: 'Alert next step message',
                                },
                            ],
                            requiresUserAction: true,
                        };
                        return [4 /*yield*/, react_native_onyx_1.default.merge("".concat(ONYXKEYS_1.default.COLLECTION.TRANSACTION).concat(transaction.transactionID), transaction)];
                    case 1:
                        _c.sent();
                        return [4 /*yield*/, react_native_onyx_1.default.merge("".concat(ONYXKEYS_1.default.COLLECTION.REPORT_ACTIONS).concat(FAKE_OLD_REPORT_ID), (_a = {}, _a[oldIOUAction.reportActionID] = oldIOUAction, _a))];
                    case 2:
                        _c.sent();
                        return [4 /*yield*/, getReportFromUseOnyx(CONST_1.default.REPORT.UNREPORTED_REPORT_ID)];
                    case 3:
                        report = _c.sent();
                        (0, Transaction_1.changeTransactionsReport)([transaction.transactionID], false, CURRENT_USER_ID, 'test@example.com', report, undefined, mockReportNextStep);
                        return [4 /*yield*/, (0, waitForBatchedUpdates_1.default)()];
                    case 4:
                        _c.sent();
                        expect(mockAPIWrite).toHaveBeenCalled();
                        apiWriteCall = mockAPIWrite.mock.calls.at(0);
                        failureData = (_b = apiWriteCall === null || apiWriteCall === void 0 ? void 0 : apiWriteCall[2]) === null || _b === void 0 ? void 0 : _b.failureData;
                        nextStepFailureData = failureData === null || failureData === void 0 ? void 0 : failureData.find(function (data) { return data.key === "".concat(ONYXKEYS_1.default.COLLECTION.NEXT_STEP).concat(CONST_1.default.REPORT.UNREPORTED_REPORT_ID); });
                        expect(nextStepFailureData).toBeDefined();
                        expect(nextStepFailureData === null || nextStepFailureData === void 0 ? void 0 : nextStepFailureData.value).toEqual(mockReportNextStep);
                        mockAPIWrite.mockRestore();
                        return [2 /*return*/];
                }
            });
        }); });
        it('correctly handles undefined reportNextStep parameter', function () { return __awaiter(void 0, void 0, void 0, function () {
            var mockAPIWrite, transaction, oldIOUAction, report, apiWriteCall, failureData, nextStepFailureData;
            var _a;
            var _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        mockAPIWrite = jest.spyOn(require('@libs/API'), 'write').mockImplementation(function () { return Promise.resolve(); });
                        transaction = generateTransaction({
                            reportID: FAKE_OLD_REPORT_ID,
                        });
                        oldIOUAction = {
                            reportActionID: (0, NumberUtils_1.rand64)(),
                            actionName: CONST_1.default.REPORT.ACTIONS.TYPE.IOU,
                            actorAccountID: CURRENT_USER_ID,
                            created: DateUtils_1.default.getDBTime(),
                            originalMessage: {
                                IOUReportID: FAKE_OLD_REPORT_ID,
                                IOUTransactionID: transaction.transactionID,
                                amount: transaction.amount,
                                currency: transaction.currency,
                                type: CONST_1.default.IOU.REPORT_ACTION_TYPE.CREATE,
                            },
                        };
                        return [4 /*yield*/, react_native_onyx_1.default.merge("".concat(ONYXKEYS_1.default.COLLECTION.TRANSACTION).concat(transaction.transactionID), transaction)];
                    case 1:
                        _c.sent();
                        return [4 /*yield*/, react_native_onyx_1.default.merge("".concat(ONYXKEYS_1.default.COLLECTION.REPORT_ACTIONS).concat(FAKE_OLD_REPORT_ID), (_a = {}, _a[oldIOUAction.reportActionID] = oldIOUAction, _a))];
                    case 2:
                        _c.sent();
                        return [4 /*yield*/, getReportFromUseOnyx(FAKE_NEW_REPORT_ID)];
                    case 3:
                        report = _c.sent();
                        (0, Transaction_1.changeTransactionsReport)([transaction.transactionID], false, CURRENT_USER_ID, 'test@example.com', report, undefined, undefined);
                        return [4 /*yield*/, (0, waitForBatchedUpdates_1.default)()];
                    case 4:
                        _c.sent();
                        expect(mockAPIWrite).toHaveBeenCalled();
                        apiWriteCall = mockAPIWrite.mock.calls.at(0);
                        failureData = (_b = apiWriteCall === null || apiWriteCall === void 0 ? void 0 : apiWriteCall[2]) === null || _b === void 0 ? void 0 : _b.failureData;
                        nextStepFailureData = failureData === null || failureData === void 0 ? void 0 : failureData.find(function (data) { return data.key === "".concat(ONYXKEYS_1.default.COLLECTION.NEXT_STEP).concat(FAKE_NEW_REPORT_ID); });
                        expect(nextStepFailureData).toBeDefined();
                        expect(nextStepFailureData === null || nextStepFailureData === void 0 ? void 0 : nextStepFailureData.value).toBeUndefined();
                        mockAPIWrite.mockRestore();
                        return [2 /*return*/];
                }
            });
        }); });
        it('correctly handles ASAP submit beta enabled when moving transactions', function () { return __awaiter(void 0, void 0, void 0, function () {
            var mockAPIWrite, transaction, oldIOUAction, report, apiWriteCall, parameters;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        mockAPIWrite = jest.spyOn(require('@libs/API'), 'write').mockImplementation(function () { return Promise.resolve(); });
                        transaction = generateTransaction({
                            reportID: FAKE_OLD_REPORT_ID,
                        });
                        oldIOUAction = {
                            reportActionID: (0, NumberUtils_1.rand64)(),
                            actionName: CONST_1.default.REPORT.ACTIONS.TYPE.IOU,
                            actorAccountID: CURRENT_USER_ID,
                            created: DateUtils_1.default.getDBTime(),
                            originalMessage: {
                                IOUReportID: FAKE_OLD_REPORT_ID,
                                IOUTransactionID: transaction.transactionID,
                                amount: transaction.amount,
                                currency: transaction.currency,
                                type: CONST_1.default.IOU.REPORT_ACTION_TYPE.CREATE,
                            },
                        };
                        return [4 /*yield*/, react_native_onyx_1.default.merge("".concat(ONYXKEYS_1.default.COLLECTION.TRANSACTION).concat(transaction.transactionID), transaction)];
                    case 1:
                        _b.sent();
                        return [4 /*yield*/, react_native_onyx_1.default.merge("".concat(ONYXKEYS_1.default.COLLECTION.REPORT_ACTIONS).concat(FAKE_OLD_REPORT_ID), (_a = {}, _a[oldIOUAction.reportActionID] = oldIOUAction, _a))];
                    case 2:
                        _b.sent();
                        return [4 /*yield*/, getReportFromUseOnyx(FAKE_NEW_REPORT_ID)];
                    case 3:
                        report = _b.sent();
                        (0, Transaction_1.changeTransactionsReport)([transaction.transactionID], true, CURRENT_USER_ID, 'test@example.com', report);
                        return [4 /*yield*/, (0, waitForBatchedUpdates_1.default)()];
                    case 4:
                        _b.sent();
                        expect(mockAPIWrite).toHaveBeenCalled();
                        apiWriteCall = mockAPIWrite.mock.calls.at(0);
                        parameters = apiWriteCall === null || apiWriteCall === void 0 ? void 0 : apiWriteCall[1];
                        expect(parameters).toBeDefined();
                        expect(parameters.reportID).toBe(FAKE_NEW_REPORT_ID);
                        expect(parameters.transactionList).toBe(transaction.transactionID);
                        mockAPIWrite.mockRestore();
                        return [2 /*return*/];
                }
            });
        }); });
        it('correctly handles different account IDs and emails when moving transactions', function () { return __awaiter(void 0, void 0, void 0, function () {
            var mockAPIWrite, transaction, oldIOUAction, customAccountID, customEmail, report, apiWriteCall, parameters;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        mockAPIWrite = jest.spyOn(require('@libs/API'), 'write').mockImplementation(function () { return Promise.resolve(); });
                        transaction = generateTransaction({
                            reportID: FAKE_OLD_REPORT_ID,
                        });
                        oldIOUAction = {
                            reportActionID: (0, NumberUtils_1.rand64)(),
                            actionName: CONST_1.default.REPORT.ACTIONS.TYPE.IOU,
                            actorAccountID: CURRENT_USER_ID,
                            created: DateUtils_1.default.getDBTime(),
                            originalMessage: {
                                IOUReportID: FAKE_OLD_REPORT_ID,
                                IOUTransactionID: transaction.transactionID,
                                amount: transaction.amount,
                                currency: transaction.currency,
                                type: CONST_1.default.IOU.REPORT_ACTION_TYPE.CREATE,
                            },
                        };
                        return [4 /*yield*/, react_native_onyx_1.default.merge("".concat(ONYXKEYS_1.default.COLLECTION.TRANSACTION).concat(transaction.transactionID), transaction)];
                    case 1:
                        _b.sent();
                        return [4 /*yield*/, react_native_onyx_1.default.merge("".concat(ONYXKEYS_1.default.COLLECTION.REPORT_ACTIONS).concat(FAKE_OLD_REPORT_ID), (_a = {}, _a[oldIOUAction.reportActionID] = oldIOUAction, _a))];
                    case 2:
                        _b.sent();
                        customAccountID = 999;
                        customEmail = 'custom@example.com';
                        return [4 /*yield*/, getReportFromUseOnyx(FAKE_NEW_REPORT_ID)];
                    case 3:
                        report = _b.sent();
                        (0, Transaction_1.changeTransactionsReport)([transaction.transactionID], false, customAccountID, customEmail, report);
                        return [4 /*yield*/, (0, waitForBatchedUpdates_1.default)()];
                    case 4:
                        _b.sent();
                        expect(mockAPIWrite).toHaveBeenCalled();
                        apiWriteCall = mockAPIWrite.mock.calls.at(0);
                        parameters = apiWriteCall === null || apiWriteCall === void 0 ? void 0 : apiWriteCall[1];
                        expect(parameters).toBeDefined();
                        expect(parameters.reportID).toBe(FAKE_NEW_REPORT_ID);
                        expect(parameters.transactionList).toBe(transaction.transactionID);
                        mockAPIWrite.mockRestore();
                        return [2 /*return*/];
                }
            });
        }); });
        it('should update the target report total when the currency is the same', function () { return __awaiter(void 0, void 0, void 0, function () {
            var transaction, oldIOUAction, expenseReport, report;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        transaction = __assign(__assign({}, generateTransaction({
                            reportID: CONST_1.default.REPORT.UNREPORTED_REPORT_ID,
                        })), { amount: -100, currency: CONST_1.default.CURRENCY.USD, reimbursable: false });
                        oldIOUAction = {
                            reportActionID: (0, NumberUtils_1.rand64)(),
                            actionName: CONST_1.default.REPORT.ACTIONS.TYPE.IOU,
                            actorAccountID: CURRENT_USER_ID,
                            created: DateUtils_1.default.getDBTime(),
                            originalMessage: {
                                IOUReportID: '0',
                                IOUTransactionID: transaction.transactionID,
                                amount: transaction.amount,
                                currency: transaction.currency,
                                type: CONST_1.default.IOU.REPORT_ACTION_TYPE.TRACK,
                            },
                        };
                        expenseReport = __assign(__assign({}, (0, reports_1.createRandomReport)(1, undefined)), { total: -200, nonReimbursableTotal: 0, currency: CONST_1.default.CURRENCY.USD });
                        return [4 /*yield*/, react_native_onyx_1.default.merge("".concat(ONYXKEYS_1.default.COLLECTION.TRANSACTION).concat(transaction.transactionID), transaction)];
                    case 1:
                        _b.sent();
                        return [4 /*yield*/, react_native_onyx_1.default.merge("".concat(ONYXKEYS_1.default.COLLECTION.REPORT).concat(expenseReport.reportID), expenseReport)];
                    case 2:
                        _b.sent();
                        return [4 /*yield*/, react_native_onyx_1.default.merge("".concat(ONYXKEYS_1.default.COLLECTION.REPORT_ACTIONS).concat(FAKE_SELF_DM_REPORT_ID), (_a = {}, _a[oldIOUAction.reportActionID] = oldIOUAction, _a))];
                    case 3:
                        _b.sent();
                        (0, Transaction_1.changeTransactionsReport)([transaction.transactionID], false, CURRENT_USER_ID, 'test@example.com', expenseReport);
                        return [4 /*yield*/, (0, waitForBatchedUpdates_1.default)()];
                    case 4:
                        _b.sent();
                        return [4 /*yield*/, new Promise(function (resolve) {
                                var connection = react_native_onyx_1.default.connect({
                                    key: "".concat(ONYXKEYS_1.default.COLLECTION.REPORT).concat(expenseReport.reportID),
                                    callback: function (value) {
                                        react_native_onyx_1.default.disconnect(connection);
                                        resolve(value);
                                    },
                                });
                            })];
                    case 5:
                        report = _b.sent();
                        expect(report === null || report === void 0 ? void 0 : report.total).toBe(expenseReport.total + transaction.amount);
                        expect(report === null || report === void 0 ? void 0 : report.nonReimbursableTotal).toBe(expenseReport.nonReimbursableTotal + transaction.amount);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should not update the target report total when the currency is different', function () { return __awaiter(void 0, void 0, void 0, function () {
            var transaction, oldIOUAction, expenseReport, report;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        transaction = __assign(__assign({}, generateTransaction({
                            reportID: CONST_1.default.REPORT.UNREPORTED_REPORT_ID,
                        })), { currency: 'IDR', reimbursable: false });
                        oldIOUAction = {
                            reportActionID: (0, NumberUtils_1.rand64)(),
                            actionName: CONST_1.default.REPORT.ACTIONS.TYPE.IOU,
                            actorAccountID: CURRENT_USER_ID,
                            created: DateUtils_1.default.getDBTime(),
                            originalMessage: {
                                IOUReportID: '0',
                                IOUTransactionID: transaction.transactionID,
                                amount: transaction.amount,
                                currency: transaction.currency,
                                type: CONST_1.default.IOU.REPORT_ACTION_TYPE.TRACK,
                            },
                        };
                        expenseReport = __assign(__assign({}, (0, reports_1.createRandomReport)(1, undefined)), { total: -200, nonReimbursableTotal: 0, currency: CONST_1.default.CURRENCY.USD });
                        return [4 /*yield*/, react_native_onyx_1.default.merge("".concat(ONYXKEYS_1.default.COLLECTION.TRANSACTION).concat(transaction.transactionID), transaction)];
                    case 1:
                        _b.sent();
                        return [4 /*yield*/, react_native_onyx_1.default.merge("".concat(ONYXKEYS_1.default.COLLECTION.REPORT).concat(expenseReport.reportID), expenseReport)];
                    case 2:
                        _b.sent();
                        return [4 /*yield*/, react_native_onyx_1.default.merge("".concat(ONYXKEYS_1.default.COLLECTION.REPORT_ACTIONS).concat(FAKE_SELF_DM_REPORT_ID), (_a = {}, _a[oldIOUAction.reportActionID] = oldIOUAction, _a))];
                    case 3:
                        _b.sent();
                        (0, Transaction_1.changeTransactionsReport)([transaction.transactionID], false, CURRENT_USER_ID, 'test@example.com', expenseReport);
                        return [4 /*yield*/, (0, waitForBatchedUpdates_1.default)()];
                    case 4:
                        _b.sent();
                        return [4 /*yield*/, new Promise(function (resolve) {
                                var connection = react_native_onyx_1.default.connect({
                                    key: "".concat(ONYXKEYS_1.default.COLLECTION.REPORT).concat(expenseReport.reportID),
                                    callback: function (value) {
                                        react_native_onyx_1.default.disconnect(connection);
                                        resolve(value);
                                    },
                                });
                            })];
                    case 5:
                        report = _b.sent();
                        expect(report === null || report === void 0 ? void 0 : report.total).toBe(expenseReport.total);
                        expect(report === null || report === void 0 ? void 0 : report.nonReimbursableTotal).toBe(expenseReport.nonReimbursableTotal);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should update the old report total when the currency is the same', function () { return __awaiter(void 0, void 0, void 0, function () {
            var oldExpenseReport, transaction, oldIOUAction, fakeReport, report;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        oldExpenseReport = __assign(__assign({}, (0, reports_1.createRandomReport)(1, undefined)), { total: -200, nonReimbursableTotal: -200, currency: CONST_1.default.CURRENCY.USD });
                        transaction = __assign(__assign({}, generateTransaction({
                            reportID: oldExpenseReport.reportID,
                        })), { amount: -100, reimbursable: false });
                        oldIOUAction = {
                            reportActionID: (0, NumberUtils_1.rand64)(),
                            actionName: CONST_1.default.REPORT.ACTIONS.TYPE.IOU,
                            actorAccountID: CURRENT_USER_ID,
                            created: DateUtils_1.default.getDBTime(),
                            originalMessage: {
                                IOUReportID: FAKE_OLD_REPORT_ID,
                                IOUTransactionID: transaction.transactionID,
                                amount: transaction.amount,
                                currency: transaction.currency,
                                type: CONST_1.default.IOU.REPORT_ACTION_TYPE.CREATE,
                            },
                        };
                        return [4 /*yield*/, react_native_onyx_1.default.merge("".concat(ONYXKEYS_1.default.COLLECTION.TRANSACTION).concat(transaction.transactionID), transaction)];
                    case 1:
                        _b.sent();
                        return [4 /*yield*/, react_native_onyx_1.default.merge("".concat(ONYXKEYS_1.default.COLLECTION.REPORT).concat(oldExpenseReport.reportID), oldExpenseReport)];
                    case 2:
                        _b.sent();
                        return [4 /*yield*/, react_native_onyx_1.default.merge("".concat(ONYXKEYS_1.default.COLLECTION.REPORT_ACTIONS).concat(oldExpenseReport.reportID), (_a = {}, _a[oldIOUAction.reportActionID] = oldIOUAction, _a))];
                    case 3:
                        _b.sent();
                        return [4 /*yield*/, getReportFromUseOnyx(FAKE_NEW_REPORT_ID)];
                    case 4:
                        fakeReport = _b.sent();
                        (0, Transaction_1.changeTransactionsReport)([transaction.transactionID], false, CURRENT_USER_ID, 'test@example.com', fakeReport);
                        return [4 /*yield*/, (0, waitForBatchedUpdates_1.default)()];
                    case 5:
                        _b.sent();
                        return [4 /*yield*/, new Promise(function (resolve) {
                                var connection = react_native_onyx_1.default.connect({
                                    key: "".concat(ONYXKEYS_1.default.COLLECTION.REPORT).concat(oldExpenseReport.reportID),
                                    callback: function (value) {
                                        react_native_onyx_1.default.disconnect(connection);
                                        resolve(value);
                                    },
                                });
                            })];
                    case 6:
                        report = _b.sent();
                        expect(report === null || report === void 0 ? void 0 : report.total).toBe(oldExpenseReport.total - transaction.amount);
                        expect(report === null || report === void 0 ? void 0 : report.nonReimbursableTotal).toBe(oldExpenseReport.nonReimbursableTotal - transaction.amount);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should not update the old report total when the currency is different', function () { return __awaiter(void 0, void 0, void 0, function () {
            var oldExpenseReport, transaction, oldIOUAction, fakeReport, report;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        oldExpenseReport = __assign(__assign({}, (0, reports_1.createRandomReport)(1, undefined)), { total: -200, nonReimbursableTotal: -200, currency: CONST_1.default.CURRENCY.USD });
                        transaction = __assign(__assign({}, generateTransaction({
                            reportID: oldExpenseReport.reportID,
                        })), { reimbursable: false, currency: 'IDR' });
                        oldIOUAction = {
                            reportActionID: (0, NumberUtils_1.rand64)(),
                            actionName: CONST_1.default.REPORT.ACTIONS.TYPE.IOU,
                            actorAccountID: CURRENT_USER_ID,
                            created: DateUtils_1.default.getDBTime(),
                            originalMessage: {
                                IOUReportID: FAKE_OLD_REPORT_ID,
                                IOUTransactionID: transaction.transactionID,
                                amount: transaction.amount,
                                currency: transaction.currency,
                                type: CONST_1.default.IOU.REPORT_ACTION_TYPE.CREATE,
                            },
                        };
                        return [4 /*yield*/, react_native_onyx_1.default.merge("".concat(ONYXKEYS_1.default.COLLECTION.TRANSACTION).concat(transaction.transactionID), transaction)];
                    case 1:
                        _b.sent();
                        return [4 /*yield*/, react_native_onyx_1.default.merge("".concat(ONYXKEYS_1.default.COLLECTION.REPORT).concat(oldExpenseReport.reportID), oldExpenseReport)];
                    case 2:
                        _b.sent();
                        return [4 /*yield*/, react_native_onyx_1.default.merge("".concat(ONYXKEYS_1.default.COLLECTION.REPORT_ACTIONS).concat(oldExpenseReport.reportID), (_a = {}, _a[oldIOUAction.reportActionID] = oldIOUAction, _a))];
                    case 3:
                        _b.sent();
                        return [4 /*yield*/, getReportFromUseOnyx(FAKE_NEW_REPORT_ID)];
                    case 4:
                        fakeReport = _b.sent();
                        (0, Transaction_1.changeTransactionsReport)([transaction.transactionID], false, CURRENT_USER_ID, 'test@example.com', fakeReport);
                        return [4 /*yield*/, (0, waitForBatchedUpdates_1.default)()];
                    case 5:
                        _b.sent();
                        return [4 /*yield*/, new Promise(function (resolve) {
                                var connection = react_native_onyx_1.default.connect({
                                    key: "".concat(ONYXKEYS_1.default.COLLECTION.REPORT).concat(oldExpenseReport.reportID),
                                    callback: function (value) {
                                        react_native_onyx_1.default.disconnect(connection);
                                        resolve(value);
                                    },
                                });
                            })];
                    case 6:
                        report = _b.sent();
                        expect(report === null || report === void 0 ? void 0 : report.total).toBe(oldExpenseReport.total);
                        expect(report === null || report === void 0 ? void 0 : report.nonReimbursableTotal).toBe(oldExpenseReport.nonReimbursableTotal);
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('getAllNonDeletedTransactions', function () {
        it('returns the transaction when it has a pending delete action and is offline', function () {
            var _a;
            var transaction = generateTransaction({
                reportID: '1',
            });
            var IOUAction = {
                reportActionID: (0, NumberUtils_1.rand64)(),
                actionName: CONST_1.default.REPORT.ACTIONS.TYPE.IOU,
                actorAccountID: CURRENT_USER_ID,
                created: DateUtils_1.default.getDBTime(),
                originalMessage: {
                    IOUReportID: FAKE_OLD_REPORT_ID,
                    IOUTransactionID: transaction.transactionID,
                    amount: transaction.amount,
                    currency: transaction.currency,
                    type: CONST_1.default.IOU.REPORT_ACTION_TYPE.CREATE,
                },
                pendingAction: CONST_1.default.RED_BRICK_ROAD_PENDING_ACTION.DELETE,
            };
            var result = (0, MoneyRequestReportUtils_1.getAllNonDeletedTransactions)((_a = {}, _a[transaction.transactionID] = transaction, _a), [IOUAction], true);
            expect(result.at(0)).toEqual(transaction);
        });
    });
    describe('saveWaypoint', function () {
        it('should save a waypoint with lat/lng and not YOUR_LOCATION_TEXT', function () { return __awaiter(void 0, void 0, void 0, function () {
            var transactionID, index, waypoint, recentWaypointsList, transaction, updatedRecentWaypoints;
            var _a, _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        transactionID = 'txn1';
                        index = '0';
                        waypoint = {
                            address: '123 Main St',
                            lat: 10,
                            lng: 20,
                        };
                        recentWaypointsList = [];
                        (0, Transaction_1.saveWaypoint)({ transactionID: transactionID, index: index, waypoint: waypoint, isDraft: false, recentWaypointsList: recentWaypointsList });
                        return [4 /*yield*/, (0, waitForBatchedUpdates_1.default)()];
                    case 1:
                        _d.sent();
                        return [4 /*yield*/, OnyxUtils_1.default.get("".concat(ONYXKEYS_1.default.COLLECTION.TRANSACTION).concat(transactionID))];
                    case 2:
                        transaction = _d.sent();
                        return [4 /*yield*/, OnyxUtils_1.default.get(ONYXKEYS_1.default.NVP_RECENT_WAYPOINTS)];
                    case 3:
                        updatedRecentWaypoints = _d.sent();
                        expect((_b = (_a = transaction === null || transaction === void 0 ? void 0 : transaction.comment) === null || _a === void 0 ? void 0 : _a.waypoints) === null || _b === void 0 ? void 0 : _b["waypoint".concat(index)]).toEqual(waypoint);
                        expect((_c = updatedRecentWaypoints === null || updatedRecentWaypoints === void 0 ? void 0 : updatedRecentWaypoints[0]) === null || _c === void 0 ? void 0 : _c.address).toBe('123 Main St');
                        return [2 /*return*/];
                }
            });
        }); });
        it('should not save waypoint if missing lat/lng', function () { return __awaiter(void 0, void 0, void 0, function () {
            var transactionID, index, waypoint, recentWaypointsList, updatedRecentWaypoints;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        transactionID = 'txn2';
                        index = '1';
                        waypoint = {
                            address: 'No LatLng',
                        };
                        recentWaypointsList = [];
                        (0, Transaction_1.saveWaypoint)({ transactionID: transactionID, index: index, waypoint: waypoint, isDraft: false, recentWaypointsList: recentWaypointsList });
                        return [4 /*yield*/, (0, waitForBatchedUpdates_1.default)()];
                    case 1:
                        _b.sent();
                        return [4 /*yield*/, OnyxUtils_1.default.get(ONYXKEYS_1.default.NVP_RECENT_WAYPOINTS)];
                    case 2:
                        updatedRecentWaypoints = _b.sent();
                        expect((_a = updatedRecentWaypoints === null || updatedRecentWaypoints === void 0 ? void 0 : updatedRecentWaypoints.length) !== null && _a !== void 0 ? _a : 0).toBe(0);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should not save waypoint if address is YOUR_LOCATION_TEXT', function () { return __awaiter(void 0, void 0, void 0, function () {
            var transactionID, index, waypoint, recentWaypointsList, updatedRecentWaypoints;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        transactionID = 'txn3';
                        index = '2';
                        waypoint = {
                            address: CONST_1.default.YOUR_LOCATION_TEXT,
                            lat: 1,
                            lng: 2,
                        };
                        recentWaypointsList = [];
                        (0, Transaction_1.saveWaypoint)({ transactionID: transactionID, index: index, waypoint: waypoint, isDraft: false, recentWaypointsList: recentWaypointsList });
                        return [4 /*yield*/, (0, waitForBatchedUpdates_1.default)()];
                    case 1:
                        _b.sent();
                        return [4 /*yield*/, OnyxUtils_1.default.get(ONYXKEYS_1.default.NVP_RECENT_WAYPOINTS)];
                    case 2:
                        updatedRecentWaypoints = _b.sent();
                        expect((_a = updatedRecentWaypoints === null || updatedRecentWaypoints === void 0 ? void 0 : updatedRecentWaypoints.length) !== null && _a !== void 0 ? _a : 0).toBe(0);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should reset amount for draft transactions', function () { return __awaiter(void 0, void 0, void 0, function () {
            var transactionID, index, waypoint, recentWaypointsList, transaction;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        transactionID = 'txn4';
                        index = '0';
                        waypoint = {
                            address: 'Draft Waypoint',
                            lat: 5,
                            lng: 6,
                        };
                        recentWaypointsList = [];
                        (0, Transaction_1.saveWaypoint)({ transactionID: transactionID, index: index, waypoint: waypoint, isDraft: true, recentWaypointsList: recentWaypointsList });
                        return [4 /*yield*/, (0, waitForBatchedUpdates_1.default)()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, OnyxUtils_1.default.get("".concat(ONYXKEYS_1.default.COLLECTION.TRANSACTION_DRAFT).concat(transactionID))];
                    case 2:
                        transaction = _a.sent();
                        expect(transaction === null || transaction === void 0 ? void 0 : transaction.amount).toBe(CONST_1.default.IOU.DEFAULT_AMOUNT);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should clear errorFields and routes', function () { return __awaiter(void 0, void 0, void 0, function () {
            var transactionID, index, waypoint, recentWaypointsList, existingTransaction, transaction;
            var _a, _b, _c, _d, _e, _f, _g, _h, _j;
            return __generator(this, function (_k) {
                switch (_k.label) {
                    case 0:
                        transactionID = 'txn5';
                        index = '0';
                        waypoint = {
                            address: 'Clear Error',
                            lat: 7,
                            lng: 8,
                        };
                        recentWaypointsList = [];
                        existingTransaction = generateTransaction({ transactionID: transactionID, reportID: '1' });
                        // Add errorFields and routes so saveWaypoint can clear them
                        // Populate with realistic non-null values
                        existingTransaction.errorFields = { route: { some: 'value' } };
                        existingTransaction.routes = {
                            route0: {
                                distance: 123,
                                geometry: {
                                    coordinates: [
                                        [0, 0],
                                        [1, 1],
                                    ],
                                },
                            },
                        };
                        return [4 /*yield*/, react_native_onyx_1.default.merge("".concat(ONYXKEYS_1.default.COLLECTION.TRANSACTION).concat(transactionID), existingTransaction)];
                    case 1:
                        _k.sent();
                        (0, Transaction_1.saveWaypoint)({ transactionID: transactionID, index: index, waypoint: waypoint, isDraft: false, recentWaypointsList: recentWaypointsList });
                        return [4 /*yield*/, (0, waitForBatchedUpdates_1.default)()];
                    case 2:
                        _k.sent();
                        return [4 /*yield*/, OnyxUtils_1.default.get("".concat(ONYXKEYS_1.default.COLLECTION.TRANSACTION).concat(transactionID))];
                    case 3:
                        transaction = _k.sent();
                        expect((_b = (_a = transaction === null || transaction === void 0 ? void 0 : transaction.errorFields) === null || _a === void 0 ? void 0 : _a.route) !== null && _b !== void 0 ? _b : null).toBeNull();
                        expect((_e = (_d = (_c = transaction === null || transaction === void 0 ? void 0 : transaction.routes) === null || _c === void 0 ? void 0 : _c.route0) === null || _d === void 0 ? void 0 : _d.distance) !== null && _e !== void 0 ? _e : null).toBeNull();
                        expect((_j = (_h = (_g = (_f = transaction === null || transaction === void 0 ? void 0 : transaction.routes) === null || _f === void 0 ? void 0 : _f.route0) === null || _g === void 0 ? void 0 : _g.geometry) === null || _h === void 0 ? void 0 : _h.coordinates) !== null && _j !== void 0 ? _j : null).toBeNull();
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
