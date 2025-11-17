"use strict";
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
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
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
var react_native_1 = require("@testing-library/react-native");
var react_native_onyx_1 = require("react-native-onyx");
var useParentReport_1 = require("@hooks/useParentReport");
var useReportIsArchived_1 = require("@hooks/useReportIsArchived");
var Task_1 = require("@libs/actions/Task");
// eslint-disable-next-line no-restricted-syntax -- this is required to allow mocking
var API = require("@libs/API");
// eslint-disable-next-line no-restricted-syntax -- this is required to allow mocking
var DateUtils_1 = require("@libs/DateUtils");
var Navigation_1 = require("@libs/Navigation/Navigation");
// eslint-disable-next-line no-restricted-syntax -- this is required to allow mocking
var ReportUtils = require("@libs/ReportUtils");
var OnyxDerived_1 = require("@userActions/OnyxDerived");
var CONST_1 = require("@src/CONST");
var OnyxUpdateManager_1 = require("@src/libs/actions/OnyxUpdateManager");
var ONYXKEYS_1 = require("@src/ONYXKEYS");
var LHNTestUtils_1 = require("../utils/LHNTestUtils");
var TestHelper_1 = require("../utils/TestHelper");
var waitForBatchedUpdates_1 = require("../utils/waitForBatchedUpdates");
var waitForBatchedUpdatesWithAct_1 = require("../utils/waitForBatchedUpdatesWithAct");
// Mock API and Navigation
jest.mock('@libs/API');
jest.mock('@libs/Navigation/Navigation');
jest.mock('@libs/Sound');
jest.mock('@libs/ErrorUtils');
jest.mock('@libs/actions/Welcome');
// Keep OnyxDerived real initialization below
jest.mock('@components/Icon/Expensicons');
jest.mock('@components/LocaleContextProvider');
// ReportUtils spies used in createTaskAndNavigate tests
var mockBuildOptimisticTaskReport = jest.fn();
var mockBuildOptimisticCreatedReportAction = jest.fn();
var mockBuildOptimisticTaskCommentReportAction = jest.fn();
var mockGetTaskAssigneeChatOnyxData = jest.fn();
var mockGetOptimisticDataForParentReportAction = jest.fn();
var mockIsHiddenForCurrentUser = jest.fn();
var mockFormatReportLastMessageText = jest.fn();
jest.spyOn(ReportUtils, 'buildOptimisticTaskReport').mockImplementation(mockBuildOptimisticTaskReport);
jest.spyOn(ReportUtils, 'buildOptimisticCreatedReportAction').mockImplementation(mockBuildOptimisticCreatedReportAction);
jest.spyOn(ReportUtils, 'buildOptimisticTaskCommentReportAction').mockImplementation(mockBuildOptimisticTaskCommentReportAction);
jest.spyOn(ReportUtils, 'getTaskAssigneeChatOnyxData').mockImplementation(mockGetTaskAssigneeChatOnyxData);
jest.spyOn(ReportUtils, 'getOptimisticDataForParentReportAction').mockImplementation(mockGetOptimisticDataForParentReportAction);
jest.spyOn(ReportUtils, 'isHiddenForCurrentUser').mockImplementation(mockIsHiddenForCurrentUser);
jest.spyOn(ReportUtils, 'formatReportLastMessageText').mockImplementation(mockFormatReportLastMessageText);
// Spy on API.write but allow calls to go through
var writeSpy = jest.spyOn(API, 'write');
(0, OnyxUpdateManager_1.default)();
describe('actions/Task', function () {
    beforeAll(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    react_native_onyx_1.default.init({
                        keys: ONYXKEYS_1.default,
                    });
                    (0, OnyxDerived_1.default)();
                    return [4 /*yield*/, (0, waitForBatchedUpdatesWithAct_1.default)()];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    describe('canModify and canAction task', function () {
        var managerAccountID = 1;
        var employeeAccountID = 2;
        var taskAssigneeAccountID = 3;
        // TaskReport with a non-archived parent
        var taskReport = __assign(__assign({}, (0, LHNTestUtils_1.getFakeReport)([managerAccountID, employeeAccountID])), { type: CONST_1.default.REPORT.TYPE.TASK });
        var taskReportParent = (0, LHNTestUtils_1.getFakeReport)([managerAccountID, employeeAccountID]);
        // Cancelled Task report with a non-archived parent
        var taskReportCancelled = __assign(__assign({}, (0, LHNTestUtils_1.getFakeReport)([managerAccountID, employeeAccountID])), { type: CONST_1.default.REPORT.TYPE.TASK });
        var taskReportCancelledParent = (0, LHNTestUtils_1.getFakeReport)([managerAccountID, employeeAccountID]);
        // Task report with an archived parent
        var taskReportArchived = __assign(__assign({}, (0, LHNTestUtils_1.getFakeReport)([managerAccountID, employeeAccountID])), { type: CONST_1.default.REPORT.TYPE.TASK });
        var taskReportArchivedParent = (0, LHNTestUtils_1.getFakeReport)([managerAccountID, employeeAccountID]);
        // This report has no parent
        var taskReportWithNoParent = __assign(__assign({}, (0, LHNTestUtils_1.getFakeReport)([managerAccountID, employeeAccountID])), { type: CONST_1.default.REPORT.TYPE.TASK });
        // Set the manager as the owner of each report
        taskReport.ownerAccountID = managerAccountID;
        taskReportCancelled.ownerAccountID = managerAccountID;
        taskReportArchived.ownerAccountID = managerAccountID;
        taskReportWithNoParent.ownerAccountID = managerAccountID;
        // Set the parent report ID of each report
        taskReport.parentReportID = taskReportParent.reportID;
        taskReportCancelled.parentReportID = taskReportCancelledParent.reportID;
        taskReportArchived.parentReportID = taskReportArchivedParent.reportID;
        // This is what indicates that the report is a cancelled task report (see ReportUtils.isCanceledTaskReport())
        taskReportCancelled.isDeletedParentAction = true;
        beforeAll(function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        react_native_onyx_1.default.init({
                            keys: ONYXKEYS_1.default,
                        });
                        (0, OnyxDerived_1.default)();
                        // Store all the necessary data in Onyx
                        return [4 /*yield*/, (0, react_native_1.act)(function () { return __awaiter(void 0, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, react_native_onyx_1.default.set("".concat(ONYXKEYS_1.default.COLLECTION.REPORT).concat(taskReportWithNoParent.reportID), taskReportWithNoParent)];
                                        case 1:
                                            _a.sent();
                                            return [4 /*yield*/, react_native_onyx_1.default.set("".concat(ONYXKEYS_1.default.COLLECTION.REPORT).concat(taskReport.reportID), taskReport)];
                                        case 2:
                                            _a.sent();
                                            return [4 /*yield*/, react_native_onyx_1.default.set("".concat(ONYXKEYS_1.default.COLLECTION.REPORT).concat(taskReportParent.reportID), taskReportParent)];
                                        case 3:
                                            _a.sent();
                                            return [4 /*yield*/, react_native_onyx_1.default.set("".concat(ONYXKEYS_1.default.COLLECTION.REPORT).concat(taskReportCancelled.reportID), taskReportCancelled)];
                                        case 4:
                                            _a.sent();
                                            return [4 /*yield*/, react_native_onyx_1.default.set("".concat(ONYXKEYS_1.default.COLLECTION.REPORT).concat(taskReportCancelledParent.reportID), taskReportCancelledParent)];
                                        case 5:
                                            _a.sent();
                                            return [4 /*yield*/, react_native_onyx_1.default.set("".concat(ONYXKEYS_1.default.COLLECTION.REPORT).concat(taskReportArchived.reportID), taskReportArchived)];
                                        case 6:
                                            _a.sent();
                                            return [4 /*yield*/, react_native_onyx_1.default.set("".concat(ONYXKEYS_1.default.COLLECTION.REPORT).concat(taskReportArchivedParent.reportID), taskReportArchivedParent)];
                                        case 7:
                                            _a.sent();
                                            // This is what indicates that a report is archived (see ReportUtils.isArchivedReport())
                                            return [4 /*yield*/, react_native_onyx_1.default.set("".concat(ONYXKEYS_1.default.COLLECTION.REPORT_NAME_VALUE_PAIRS).concat(taskReportArchivedParent.reportID), {
                                                    private_isArchived: new Date().toString(),
                                                })];
                                        case 8:
                                            // This is what indicates that a report is archived (see ReportUtils.isArchivedReport())
                                            _a.sent();
                                            return [2 /*return*/];
                                    }
                                });
                            }); })];
                    case 1:
                        // Store all the necessary data in Onyx
                        _a.sent();
                        return [4 /*yield*/, (0, waitForBatchedUpdatesWithAct_1.default)()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        describe('canModifyTask', function () {
            it('returns false if the user modifying the task is not the author', function () {
                // Simulate how components call canModifyTask() by using the hook useReportIsArchived() to see if the report is archived
                var isReportArchived = (0, react_native_1.renderHook)(function () { return (0, useReportIsArchived_1.default)(taskReport === null || taskReport === void 0 ? void 0 : taskReport.parentReportID); }).result;
                expect((0, Task_1.canModifyTask)(taskReport, employeeAccountID, isReportArchived.current)).toBe(false);
            });
            it('returns false if the parent report is archived', function () {
                var isReportArchived = (0, react_native_1.renderHook)(function () { return (0, useReportIsArchived_1.default)(taskReportArchived === null || taskReportArchived === void 0 ? void 0 : taskReportArchived.parentReportID); }).result;
                expect((0, Task_1.canModifyTask)(taskReportArchived, managerAccountID, isReportArchived.current)).toBe(false);
            });
            it('returns false if the report is a cancelled task report', function () {
                var isReportArchived = (0, react_native_1.renderHook)(function () { return (0, useReportIsArchived_1.default)(taskReportCancelled === null || taskReportCancelled === void 0 ? void 0 : taskReportCancelled.parentReportID); }).result;
                expect((0, Task_1.canModifyTask)(taskReportCancelled, managerAccountID, isReportArchived.current)).toBe(false);
            });
            it('returns true if the user modifying the task is the author and the parent report is not archived or cancelled', function () {
                var isReportArchived = (0, react_native_1.renderHook)(function () { return (0, useReportIsArchived_1.default)(taskReport === null || taskReport === void 0 ? void 0 : taskReport.parentReportID); }).result;
                expect((0, Task_1.canModifyTask)(taskReport, managerAccountID, isReportArchived.current)).toBe(true);
            });
        });
        describe('canActionTask', function () {
            it('returns false if there is no logged in user', function () {
                expect((0, Task_1.canActionTask)(taskReportCancelled)).toBe(false);
            });
            it('returns false if parentReport is undefined and taskReport has no parentReportID', function () {
                var task = __assign(__assign({}, taskReport), { parentReportID: undefined });
                expect((0, Task_1.canActionTask)(task, taskAssigneeAccountID, undefined, false)).toBe(false);
            });
            it('returns false if the report is a cancelled task report', function () {
                // The accountID doesn't matter here because the code will do an early return for the cancelled report
                expect((0, Task_1.canActionTask)(taskReportCancelled, 0)).toBe(false);
            });
            it('returns false if the report has an archived parent report', function () {
                // The accountID doesn't matter here because the code will do an early return for the archived report
                expect((0, Task_1.canActionTask)(taskReportArchived, 0)).toBe(false);
            });
            it('returns false if the user modifying the task is not the author', function () {
                var parentReport = (0, react_native_1.renderHook)(function () { return (0, useParentReport_1.default)(taskReport.reportID); }).result;
                var isParentReportArchived = (0, react_native_1.renderHook)(function () { var _a; return (0, useReportIsArchived_1.default)((_a = parentReport.current) === null || _a === void 0 ? void 0 : _a.reportID); }).result;
                expect((0, Task_1.canActionTask)(taskReport, employeeAccountID, parentReport.current, isParentReportArchived.current)).toBe(false);
            });
            it('returns true if the user modifying the task is the author', function () {
                var parentReport = (0, react_native_1.renderHook)(function () { return (0, useParentReport_1.default)(taskReport.reportID); }).result;
                var isParentReportArchived = (0, react_native_1.renderHook)(function () { var _a; return (0, useReportIsArchived_1.default)((_a = parentReport.current) === null || _a === void 0 ? void 0 : _a.reportID); }).result;
                expect((0, Task_1.canActionTask)(taskReport, managerAccountID, parentReport.current, isParentReportArchived.current)).toBe(true);
            });
            // Looking up the task assignee is usually based on the report action
            describe('testing with report action', function () {
                beforeAll(function () { return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                taskReport.parentReportActionID = 'a1';
                                return [4 /*yield*/, (0, react_native_1.act)(function () { return __awaiter(void 0, void 0, void 0, function () {
                                        return __generator(this, function (_a) {
                                            switch (_a.label) {
                                                case 0: return [4 /*yield*/, react_native_onyx_1.default.set("".concat(ONYXKEYS_1.default.COLLECTION.REPORT).concat(taskReport.reportID), taskReport)];
                                                case 1:
                                                    _a.sent();
                                                    // Given that the task is assigned to a user who is not the author of the task
                                                    return [4 /*yield*/, react_native_onyx_1.default.set("".concat(ONYXKEYS_1.default.COLLECTION.REPORT_ACTIONS).concat(taskReport.parentReportID), {
                                                            a1: __assign(__assign({}, (0, LHNTestUtils_1.getFakeReportAction)()), { reportID: taskReport.parentReportID, childManagerAccountID: taskAssigneeAccountID }),
                                                        })];
                                                case 2:
                                                    // Given that the task is assigned to a user who is not the author of the task
                                                    _a.sent();
                                                    return [2 /*return*/];
                                            }
                                        });
                                    }); })];
                            case 1:
                                _a.sent();
                                return [4 /*yield*/, (0, waitForBatchedUpdatesWithAct_1.default)()];
                            case 2:
                                _a.sent();
                                return [2 /*return*/];
                        }
                    });
                }); });
                it('returns false if the logged in user is not the author or the one assigned to the task', function () {
                    var parentReport = (0, react_native_1.renderHook)(function () { return (0, useParentReport_1.default)(taskReport.reportID); }).result;
                    var isParentReportArchived = (0, react_native_1.renderHook)(function () { var _a; return (0, useReportIsArchived_1.default)((_a = parentReport.current) === null || _a === void 0 ? void 0 : _a.reportID); }).result;
                    expect((0, Task_1.canActionTask)(taskReport, employeeAccountID, parentReport.current, isParentReportArchived.current)).toBe(false);
                });
                it('returns true if the logged in user is the one assigned to the task', function () {
                    var parentReport = (0, react_native_1.renderHook)(function () { return (0, useParentReport_1.default)(taskReport.reportID); }).result;
                    var isParentReportArchived = (0, react_native_1.renderHook)(function () { var _a; return (0, useReportIsArchived_1.default)((_a = parentReport.current) === null || _a === void 0 ? void 0 : _a.reportID); }).result;
                    expect((0, Task_1.canActionTask)(taskReport, taskAssigneeAccountID, parentReport.current, isParentReportArchived.current)).toBe(true);
                });
            });
            // Some old reports might only have report.managerID so be sure it's still supported
            describe('testing with report.managerID', function () {
                beforeAll(function () { return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                taskReport.managerID = taskAssigneeAccountID;
                                return [4 /*yield*/, (0, react_native_1.act)(function () { return __awaiter(void 0, void 0, void 0, function () {
                                        return __generator(this, function (_a) {
                                            switch (_a.label) {
                                                case 0: return [4 /*yield*/, react_native_onyx_1.default.set("".concat(ONYXKEYS_1.default.COLLECTION.REPORT).concat(taskReport.reportID), taskReport)];
                                                case 1:
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
                it('returns false if the logged in user is not the author or the one assigned to the task', function () {
                    var parentReport = (0, react_native_1.renderHook)(function () { return (0, useParentReport_1.default)(taskReport.reportID); }).result;
                    var isParentReportArchived = (0, react_native_1.renderHook)(function () { var _a; return (0, useReportIsArchived_1.default)((_a = parentReport.current) === null || _a === void 0 ? void 0 : _a.reportID); }).result;
                    expect((0, Task_1.canActionTask)(taskReport, employeeAccountID, parentReport.current, isParentReportArchived.current)).toBe(false);
                });
                it('returns true if the logged in user is the one assigned to the task', function () {
                    var parentReport = (0, react_native_1.renderHook)(function () { return (0, useParentReport_1.default)(taskReport.reportID); }).result;
                    var isParentReportArchived = (0, react_native_1.renderHook)(function () { var _a; return (0, useReportIsArchived_1.default)((_a = parentReport.current) === null || _a === void 0 ? void 0 : _a.reportID); }).result;
                    expect((0, Task_1.canActionTask)(taskReport, taskAssigneeAccountID, parentReport.current, isParentReportArchived.current)).toBe(true);
                });
            });
        });
    });
    describe('completeTestDriveTask', function () {
        var accountID = 2;
        var conciergeChatReport = (0, LHNTestUtils_1.getFakeReport)([accountID, CONST_1.default.ACCOUNT_ID.CONCIERGE]);
        var testDriveTaskReport = __assign(__assign({}, (0, LHNTestUtils_1.getFakeReport)()), { ownerAccountID: accountID });
        it('Completes test drive task', function () {
            (0, Task_1.completeTestDriveTask)(testDriveTaskReport, conciergeChatReport, false, accountID);
            expect(Object.values((0, Task_1.getFinishOnboardingTaskOnyxData)(testDriveTaskReport, conciergeChatReport, false, 0)).length).toBe(0);
        });
    });
    describe('getFinishOnboardingTaskOnyxData', function () {
        var parentReport = (0, LHNTestUtils_1.getFakeReport)();
        var taskReport = __assign(__assign({}, (0, LHNTestUtils_1.getFakeReport)()), { type: CONST_1.default.REPORT.TYPE.TASK, ownerAccountID: 1, managerID: 2, parentReportID: parentReport.reportID });
        beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, react_native_onyx_1.default.clear()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, react_native_onyx_1.default.set(ONYXKEYS_1.default.SESSION, { email: 'user1@gmail.com', accountID: 2 })];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, (0, waitForBatchedUpdates_1.default)()];
                    case 3:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('Return not empty object', function () {
            expect(Object.values((0, Task_1.getFinishOnboardingTaskOnyxData)(taskReport, parentReport, false, 2)).length).toBeGreaterThan(0);
        });
        it('Return empty object', function () {
            expect(Object.values((0, Task_1.getFinishOnboardingTaskOnyxData)(taskReport, parentReport, true, 2)).length).toBe(0);
        });
    });
    describe('createTaskAndNavigate', function () {
        var mockParentReportID = 'parent_report_123';
        var mockTitle = 'Test Task';
        var mockDescription = 'This is a test task description';
        var mockAssigneeEmail = 'assignee@example.com';
        var mockAssigneeAccountID = 456;
        var mockPolicyID = 'policy_123';
        var mockCurrentUserAccountID = 123;
        var mockCurrentUserEmail = 'creator@example.com';
        beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        jest.clearAllMocks();
                        writeSpy.mockClear();
                        global.fetch = (0, TestHelper_1.getGlobalFetchMock)();
                        // Setup ReportUtils mocks
                        mockBuildOptimisticTaskReport.mockReturnValue({
                            reportID: 'task_report_123',
                            reportName: mockTitle,
                            description: mockDescription,
                            managerID: mockAssigneeAccountID,
                            type: CONST_1.default.REPORT.TYPE.TASK,
                            parentReportID: mockParentReportID,
                        });
                        mockBuildOptimisticCreatedReportAction.mockReturnValue({
                            reportActionID: 'created_action_123',
                            reportAction: {
                                reportActionID: 'created_action_123',
                                actionName: CONST_1.default.REPORT.ACTIONS.TYPE.CREATED,
                                created: DateUtils_1.default.getDBTime(),
                            },
                        });
                        mockBuildOptimisticTaskCommentReportAction.mockReturnValue({
                            reportAction: {
                                reportActionID: 'comment_action_123',
                                actionName: CONST_1.default.REPORT.ACTIONS.TYPE.ADD_COMMENT,
                                created: DateUtils_1.default.getDBTime(),
                                message: [{ type: 'text', text: "task for ".concat(mockTitle) }],
                            },
                        });
                        mockGetTaskAssigneeChatOnyxData.mockReturnValue({
                            optimisticData: [],
                            successData: [],
                            failureData: [],
                            optimisticAssigneeAddComment: {
                                reportAction: {
                                    reportActionID: 'assignee_comment_123',
                                },
                            },
                            optimisticChatCreatedReportAction: {
                                reportActionID: 'chat_created_123',
                            },
                        });
                        mockGetOptimisticDataForParentReportAction.mockReturnValue([]);
                        mockIsHiddenForCurrentUser.mockReturnValue(false);
                        mockFormatReportLastMessageText.mockReturnValue('Last message text');
                        return [4 /*yield*/, (0, react_native_1.act)(function () { return __awaiter(void 0, void 0, void 0, function () {
                                var _a;
                                return __generator(this, function (_b) {
                                    switch (_b.label) {
                                        case 0: return [4 /*yield*/, react_native_onyx_1.default.clear()];
                                        case 1:
                                            _b.sent();
                                            return [4 /*yield*/, react_native_onyx_1.default.set(ONYXKEYS_1.default.SESSION, {
                                                    email: mockCurrentUserEmail,
                                                    accountID: mockCurrentUserAccountID,
                                                })];
                                        case 2:
                                            _b.sent();
                                            return [4 /*yield*/, react_native_onyx_1.default.set("".concat(ONYXKEYS_1.default.COLLECTION.REPORT).concat(mockParentReportID), {
                                                    reportID: mockParentReportID,
                                                    type: CONST_1.default.REPORT.TYPE.CHAT,
                                                    participants: (_a = {},
                                                        _a[mockCurrentUserAccountID] = {
                                                            role: CONST_1.default.REPORT.ROLE.MEMBER,
                                                            notificationPreference: CONST_1.default.REPORT.NOTIFICATION_PREFERENCE.ALWAYS,
                                                        },
                                                        _a),
                                                })];
                                        case 3:
                                            _b.sent();
                                            return [2 /*return*/];
                                    }
                                });
                            }); })];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, (0, waitForBatchedUpdatesWithAct_1.default)()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('should create task and navigate successfully with basic parameters', function () {
            var _a;
            // Given: Basic task creation parameters
            var mockAssigneeChatReport = {
                reportID: 'assignee_chat_123',
                type: CONST_1.default.REPORT.TYPE.CHAT,
                participants: (_a = {},
                    _a[mockAssigneeAccountID] = {
                        accountID: mockAssigneeAccountID,
                        role: CONST_1.default.REPORT.ROLE.MEMBER,
                        notificationPreference: CONST_1.default.REPORT.NOTIFICATION_PREFERENCE.ALWAYS,
                    },
                    _a),
            };
            // When: Call createTaskAndNavigate
            (0, Task_1.createTaskAndNavigate)({
                parentReportID: mockParentReportID,
                title: mockTitle,
                description: mockDescription,
                assigneeEmail: mockAssigneeEmail,
                currentUserAccountID: mockCurrentUserAccountID,
                currentUserEmail: mockCurrentUserEmail,
                assigneeAccountID: mockAssigneeAccountID,
                assigneeChatReport: mockAssigneeChatReport,
                policyID: mockPolicyID,
                isCreatedUsingMarkdown: false,
                quickAction: {},
            });
            // Then: Verify API.write called with expected arguments
            var calls = API.write.mock.calls;
            expect(calls.length).toBe(1);
            var _b = calls.at(0), command = _b[0], params = _b[1], onyx = _b[2];
            expect(command).toBe('CreateTask');
            expect(params).toEqual(expect.objectContaining({
                parentReportID: mockParentReportID,
                htmlTitle: mockTitle,
                description: mockDescription,
                assignee: mockAssigneeEmail,
                assigneeAccountID: mockAssigneeAccountID,
                assigneeChatReportID: mockAssigneeChatReport.reportID,
            }));
            expect(onyx).toEqual(expect.objectContaining({
                optimisticData: expect.any(Array),
                successData: expect.any(Array),
                failureData: expect.any(Array),
            }));
        });
        it('should handle task creation without assignee chat report', function () { return __awaiter(void 0, void 0, void 0, function () {
            var mockQuickAction;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        mockQuickAction = {
                            action: CONST_1.default.QUICK_ACTIONS.ASSIGN_TASK,
                            chatReportID: 'quick_action_chat_123',
                            targetAccountID: 789,
                        };
                        // When: Call createTaskAndNavigate without assignee chat report
                        (0, Task_1.createTaskAndNavigate)({
                            parentReportID: mockParentReportID,
                            title: mockTitle,
                            description: mockDescription,
                            assigneeEmail: mockAssigneeEmail,
                            currentUserAccountID: mockCurrentUserAccountID,
                            currentUserEmail: mockCurrentUserEmail,
                            assigneeAccountID: mockAssigneeAccountID,
                            assigneeChatReport: undefined,
                            policyID: mockPolicyID,
                            isCreatedUsingMarkdown: false,
                            quickAction: mockQuickAction,
                        });
                        return [4 /*yield*/, (0, waitForBatchedUpdatesWithAct_1.default)()];
                    case 1:
                        _a.sent();
                        // eslint-disable-next-line rulesdir/no-multiple-api-calls
                        expect(API.write).toHaveBeenCalledWith('CreateTask', expect.objectContaining({
                            parentReportID: mockParentReportID,
                            htmlTitle: mockTitle,
                            description: mockDescription,
                            assignee: mockAssigneeEmail,
                            assigneeAccountID: mockAssigneeAccountID,
                            assigneeChatReportID: undefined,
                            assigneeChatReportActionID: undefined,
                            assigneeChatCreatedReportActionID: undefined,
                        }), expect.objectContaining({
                            optimisticData: expect.arrayContaining([
                                expect.objectContaining({
                                    key: ONYXKEYS_1.default.NVP_QUICK_ACTION_GLOBAL_CREATE,
                                    value: expect.objectContaining({
                                        action: CONST_1.default.QUICK_ACTIONS.ASSIGN_TASK,
                                        chatReportID: mockParentReportID,
                                        isFirstQuickAction: false,
                                        targetAccountID: mockAssigneeAccountID,
                                    }),
                                }),
                            ]),
                        }));
                        return [2 /*return*/];
                }
            });
        }); });
        it('should handle task creation with markdown', function () { return __awaiter(void 0, void 0, void 0, function () {
            var mockAssigneeChatReport;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        mockAssigneeChatReport = {
                            reportID: 'assignee_chat_456',
                            type: CONST_1.default.REPORT.TYPE.CHAT,
                            participants: (_a = {},
                                _a[mockAssigneeAccountID] = {
                                    accountID: mockAssigneeAccountID,
                                    role: CONST_1.default.REPORT.ROLE.MEMBER,
                                    notificationPreference: CONST_1.default.REPORT.NOTIFICATION_PREFERENCE.ALWAYS,
                                },
                                _a),
                        };
                        // When: Call createTaskAndNavigate with markdown flag
                        (0, Task_1.createTaskAndNavigate)({
                            parentReportID: mockParentReportID,
                            title: mockTitle,
                            description: mockDescription,
                            assigneeEmail: mockAssigneeEmail,
                            currentUserAccountID: mockCurrentUserAccountID,
                            currentUserEmail: mockCurrentUserEmail,
                            assigneeAccountID: mockAssigneeAccountID,
                            assigneeChatReport: mockAssigneeChatReport,
                            policyID: mockPolicyID,
                            isCreatedUsingMarkdown: true,
                            quickAction: {},
                        });
                        return [4 /*yield*/, (0, waitForBatchedUpdatesWithAct_1.default)()];
                    case 1:
                        _b.sent();
                        // eslint-disable-next-line rulesdir/no-multiple-api-calls
                        expect(API.write).toHaveBeenCalledWith('CreateTask', expect.any(Object), expect.any(Object));
                        // Verify that Navigation.dismissModalWithReport was NOT called (since isCreatedUsingMarkdown is true)
                        expect(Navigation_1.default.dismissModalWithReport).not.toHaveBeenCalled();
                        return [2 /*return*/];
                }
            });
        }); });
        it('should handle task creation with default policy ID', function () { return __awaiter(void 0, void 0, void 0, function () {
            var mockAssigneeChatReport;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        mockAssigneeChatReport = {
                            reportID: 'assignee_chat_789',
                            type: CONST_1.default.REPORT.TYPE.CHAT,
                            participants: (_a = {},
                                _a[mockAssigneeAccountID] = {
                                    accountID: mockAssigneeAccountID,
                                    role: CONST_1.default.REPORT.ROLE.MEMBER,
                                    notificationPreference: CONST_1.default.REPORT.NOTIFICATION_PREFERENCE.ALWAYS,
                                },
                                _a),
                        };
                        // When: Call createTaskAndNavigate with default policy ID
                        (0, Task_1.createTaskAndNavigate)({
                            parentReportID: mockParentReportID,
                            title: mockTitle,
                            description: mockDescription,
                            assigneeEmail: mockAssigneeEmail,
                            currentUserAccountID: mockCurrentUserAccountID,
                            currentUserEmail: mockCurrentUserEmail,
                            assigneeAccountID: mockAssigneeAccountID,
                            assigneeChatReport: mockAssigneeChatReport,
                            policyID: CONST_1.default.POLICY.OWNER_EMAIL_FAKE,
                            isCreatedUsingMarkdown: false,
                            quickAction: {},
                        });
                        return [4 /*yield*/, (0, waitForBatchedUpdatesWithAct_1.default)()];
                    case 1:
                        _b.sent();
                        // eslint-disable-next-line rulesdir/no-multiple-api-calls
                        expect(API.write).toHaveBeenCalledWith('CreateTask', expect.objectContaining({
                            parentReportID: mockParentReportID,
                            htmlTitle: mockTitle,
                            description: mockDescription,
                            assignee: mockAssigneeEmail,
                            assigneeAccountID: mockAssigneeAccountID,
                        }), expect.any(Object));
                        return [2 /*return*/];
                }
            });
        }); });
        it('should handle task creation with assignee as current user', function () { return __awaiter(void 0, void 0, void 0, function () {
            var mockAssigneeChatReport, calls, _a, command, params, onyx;
            var _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        mockAssigneeChatReport = {
                            reportID: 'assignee_chat_self',
                            type: CONST_1.default.REPORT.TYPE.CHAT,
                            participants: (_b = {},
                                _b[mockCurrentUserAccountID] = {
                                    accountID: mockCurrentUserAccountID,
                                    role: CONST_1.default.REPORT.ROLE.MEMBER,
                                    notificationPreference: CONST_1.default.REPORT.NOTIFICATION_PREFERENCE.ALWAYS,
                                },
                                _b),
                        };
                        // When: Call createTaskAndNavigate with assignee as current user
                        (0, Task_1.createTaskAndNavigate)({
                            parentReportID: mockParentReportID,
                            title: mockTitle,
                            description: mockDescription,
                            assigneeEmail: mockCurrentUserEmail,
                            currentUserAccountID: mockCurrentUserAccountID,
                            currentUserEmail: mockCurrentUserEmail,
                            assigneeAccountID: mockCurrentUserAccountID, // assignee is current user
                            assigneeChatReport: mockAssigneeChatReport,
                            policyID: mockPolicyID,
                            isCreatedUsingMarkdown: false,
                            quickAction: {},
                        });
                        return [4 /*yield*/, (0, waitForBatchedUpdatesWithAct_1.default)()];
                    case 1:
                        _c.sent();
                        calls = API.write.mock.calls;
                        expect(calls.length).toBe(1);
                        _a = calls.at(0), command = _a[0], params = _a[1], onyx = _a[2];
                        expect(command).toBe('CreateTask');
                        expect(params).toEqual(expect.objectContaining({
                            parentReportID: mockParentReportID,
                            htmlTitle: mockTitle,
                            description: mockDescription,
                            assignee: mockCurrentUserEmail,
                            assigneeAccountID: mockCurrentUserAccountID,
                        }));
                        expect(onyx.optimisticData).toEqual(expect.arrayContaining([
                            expect.objectContaining({
                                key: "".concat(ONYXKEYS_1.default.COLLECTION.REPORT).concat(mockParentReportID),
                                value: expect.objectContaining({ hasOutstandingChildTask: true }),
                            }),
                        ]));
                        return [2 /*return*/];
                }
            });
        }); });
        it('should return early when parentReportID is undefined', function () { return __awaiter(void 0, void 0, void 0, function () {
            var mockAssigneeChatReport;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        mockAssigneeChatReport = {
                            reportID: 'assignee_chat_undefined',
                            type: CONST_1.default.REPORT.TYPE.CHAT,
                            participants: (_a = {},
                                _a[mockAssigneeAccountID] = {
                                    accountID: mockAssigneeAccountID,
                                    role: CONST_1.default.REPORT.ROLE.MEMBER,
                                    notificationPreference: CONST_1.default.REPORT.NOTIFICATION_PREFERENCE.ALWAYS,
                                },
                                _a),
                        };
                        // When: Call createTaskAndNavigate with undefined parent report ID
                        (0, Task_1.createTaskAndNavigate)({
                            parentReportID: undefined, // parentReportID is undefined
                            title: mockTitle,
                            description: mockDescription,
                            assigneeEmail: mockAssigneeEmail,
                            currentUserAccountID: mockCurrentUserAccountID,
                            currentUserEmail: mockCurrentUserEmail,
                            assigneeAccountID: mockAssigneeAccountID,
                            assigneeChatReport: mockAssigneeChatReport,
                            policyID: mockPolicyID,
                            isCreatedUsingMarkdown: false,
                            quickAction: {},
                        });
                        return [4 /*yield*/, (0, waitForBatchedUpdatesWithAct_1.default)()];
                    case 1:
                        _b.sent();
                        // eslint-disable-next-line rulesdir/no-multiple-api-calls
                        expect(API.write).not.toHaveBeenCalled();
                        return [2 /*return*/];
                }
            });
        }); });
        it('should handle task creation with first quick action', function () { return __awaiter(void 0, void 0, void 0, function () {
            var mockAssigneeChatReport;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        mockAssigneeChatReport = {
                            reportID: 'assignee_chat_first',
                            type: CONST_1.default.REPORT.TYPE.CHAT,
                            participants: (_a = {},
                                _a[mockAssigneeAccountID] = {
                                    accountID: mockAssigneeAccountID,
                                    role: CONST_1.default.REPORT.ROLE.MEMBER,
                                    notificationPreference: CONST_1.default.REPORT.NOTIFICATION_PREFERENCE.ALWAYS,
                                },
                                _a),
                        };
                        // When: Call createTaskAndNavigate with empty quick action
                        (0, Task_1.createTaskAndNavigate)({
                            parentReportID: mockParentReportID,
                            title: mockTitle,
                            description: mockDescription,
                            assigneeEmail: mockAssigneeEmail,
                            currentUserAccountID: mockCurrentUserAccountID,
                            currentUserEmail: mockCurrentUserEmail,
                            assigneeAccountID: mockAssigneeAccountID,
                            assigneeChatReport: mockAssigneeChatReport,
                            policyID: mockPolicyID,
                            isCreatedUsingMarkdown: false,
                            quickAction: {}, // quickAction is empty
                        });
                        return [4 /*yield*/, (0, waitForBatchedUpdatesWithAct_1.default)()];
                    case 1:
                        _b.sent();
                        // eslint-disable-next-line rulesdir/no-multiple-api-calls
                        expect(API.write).toHaveBeenCalledWith('CreateTask', expect.any(Object), expect.objectContaining({
                            optimisticData: expect.arrayContaining([
                                expect.objectContaining({
                                    key: ONYXKEYS_1.default.NVP_QUICK_ACTION_GLOBAL_CREATE,
                                    value: expect.objectContaining({
                                        action: CONST_1.default.QUICK_ACTIONS.ASSIGN_TASK,
                                        chatReportID: mockParentReportID,
                                        isFirstQuickAction: true, // Should be true for empty quick action
                                        targetAccountID: mockAssigneeAccountID,
                                    }),
                                }),
                            ]),
                        }));
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('completeTask', function () {
        var mockTaskReportID = 'task_report_456';
        var mockParentReportID = 'parent_report_789';
        var mockParentReportActionID = 'parent_action_123';
        beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        jest.clearAllMocks();
                        writeSpy.mockClear();
                        global.fetch = (0, TestHelper_1.getGlobalFetchMock)();
                        return [4 /*yield*/, (0, react_native_1.act)(function () { return __awaiter(void 0, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, react_native_onyx_1.default.clear()];
                                        case 1:
                                            _a.sent();
                                            return [4 /*yield*/, react_native_onyx_1.default.set(ONYXKEYS_1.default.SESSION, {
                                                    email: 'user@example.com',
                                                    accountID: 123,
                                                })];
                                        case 2:
                                            _a.sent();
                                            return [2 /*return*/];
                                    }
                                });
                            }); })];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, (0, waitForBatchedUpdatesWithAct_1.default)()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('should update childStateNum and childStatusNum to APPROVED when completing a task with parent report action', function () { return __awaiter(void 0, void 0, void 0, function () {
            var taskReport, parentReport, parentReportAction, calls, _a, onyxData, optimisticData, parentReportActionUpdate, failureData, parentReportActionFailure;
            var _b, _c;
            var _d, _e;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0:
                        taskReport = {
                            reportID: mockTaskReportID,
                            type: CONST_1.default.REPORT.TYPE.TASK,
                            parentReportID: mockParentReportID,
                            parentReportActionID: mockParentReportActionID,
                            stateNum: CONST_1.default.REPORT.STATE_NUM.OPEN,
                            statusNum: CONST_1.default.REPORT.STATUS_NUM.OPEN,
                            ownerAccountID: 123,
                            managerID: 456,
                        };
                        parentReport = {
                            reportID: mockParentReportID,
                            type: CONST_1.default.REPORT.TYPE.CHAT,
                        };
                        parentReportAction = {
                            reportActionID: mockParentReportActionID,
                            reportID: mockParentReportID,
                            childReportID: mockTaskReportID,
                            childType: CONST_1.default.REPORT.TYPE.TASK,
                            childStateNum: CONST_1.default.REPORT.STATE_NUM.OPEN,
                            childStatusNum: CONST_1.default.REPORT.STATUS_NUM.OPEN,
                        };
                        return [4 /*yield*/, (0, react_native_1.act)(function () { return __awaiter(void 0, void 0, void 0, function () {
                                var _a;
                                return __generator(this, function (_b) {
                                    switch (_b.label) {
                                        case 0: return [4 /*yield*/, react_native_onyx_1.default.set("".concat(ONYXKEYS_1.default.COLLECTION.REPORT).concat(mockTaskReportID), taskReport)];
                                        case 1:
                                            _b.sent();
                                            return [4 /*yield*/, react_native_onyx_1.default.set("".concat(ONYXKEYS_1.default.COLLECTION.REPORT).concat(mockParentReportID), parentReport)];
                                        case 2:
                                            _b.sent();
                                            return [4 /*yield*/, react_native_onyx_1.default.set("".concat(ONYXKEYS_1.default.COLLECTION.REPORT_ACTIONS).concat(mockParentReportID), (_a = {},
                                                    _a[mockParentReportActionID] = parentReportAction,
                                                    _a))];
                                        case 3:
                                            _b.sent();
                                            return [2 /*return*/];
                                    }
                                });
                            }); })];
                    case 1:
                        _f.sent();
                        return [4 /*yield*/, (0, waitForBatchedUpdatesWithAct_1.default)()];
                    case 2:
                        _f.sent();
                        // When: Call completeTask
                        (0, Task_1.completeTask)(taskReport);
                        return [4 /*yield*/, (0, waitForBatchedUpdatesWithAct_1.default)()];
                    case 3:
                        _f.sent();
                        // Then: Verify API.write was called with correct parameters
                        // eslint-disable-next-line rulesdir/no-multiple-api-calls
                        expect(API.write).toHaveBeenCalledWith('CompleteTask', expect.objectContaining({
                            taskReportID: mockTaskReportID,
                        }), expect.objectContaining({
                            optimisticData: expect.any(Array),
                            successData: expect.any(Array),
                            failureData: expect.any(Array),
                        }));
                        calls = API.write.mock.calls;
                        _a = calls.at(0), onyxData = _a[2];
                        optimisticData = (_d = onyxData.optimisticData) !== null && _d !== void 0 ? _d : [];
                        parentReportActionUpdate = optimisticData.find(function (update) { return update.key === "".concat(ONYXKEYS_1.default.COLLECTION.REPORT_ACTIONS).concat(mockParentReportID); });
                        expect(parentReportActionUpdate).toBeDefined();
                        expect(parentReportActionUpdate === null || parentReportActionUpdate === void 0 ? void 0 : parentReportActionUpdate.value).toEqual((_b = {},
                            _b[mockParentReportActionID] = {
                                childStateNum: CONST_1.default.REPORT.STATE_NUM.APPROVED,
                                childStatusNum: CONST_1.default.REPORT.STATUS_NUM.APPROVED,
                            },
                            _b));
                        failureData = (_e = onyxData.failureData) !== null && _e !== void 0 ? _e : [];
                        parentReportActionFailure = failureData.find(function (update) { return update.key === "".concat(ONYXKEYS_1.default.COLLECTION.REPORT_ACTIONS).concat(mockParentReportID); });
                        expect(parentReportActionFailure).toBeDefined();
                        expect(parentReportActionFailure === null || parentReportActionFailure === void 0 ? void 0 : parentReportActionFailure.value).toEqual((_c = {},
                            _c[mockParentReportActionID] = {
                                childStateNum: CONST_1.default.REPORT.STATE_NUM.OPEN,
                                childStatusNum: CONST_1.default.REPORT.STATUS_NUM.OPEN,
                            },
                            _c));
                        return [2 /*return*/];
                }
            });
        }); });
        it('should not update childStateNum and childStatusNum when task has no parent report action', function () { return __awaiter(void 0, void 0, void 0, function () {
            var taskReport, calls, _a, onyxData, optimisticData, parentReportActionUpdate;
            var _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        taskReport = {
                            reportID: mockTaskReportID,
                            type: CONST_1.default.REPORT.TYPE.TASK,
                            stateNum: CONST_1.default.REPORT.STATE_NUM.OPEN,
                            statusNum: CONST_1.default.REPORT.STATUS_NUM.OPEN,
                            ownerAccountID: 123,
                            managerID: 456,
                        };
                        return [4 /*yield*/, (0, react_native_1.act)(function () { return __awaiter(void 0, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, react_native_onyx_1.default.set("".concat(ONYXKEYS_1.default.COLLECTION.REPORT).concat(mockTaskReportID), taskReport)];
                                        case 1:
                                            _a.sent();
                                            return [2 /*return*/];
                                    }
                                });
                            }); })];
                    case 1:
                        _c.sent();
                        return [4 /*yield*/, (0, waitForBatchedUpdatesWithAct_1.default)()];
                    case 2:
                        _c.sent();
                        // When: Call completeTask
                        (0, Task_1.completeTask)(taskReport);
                        return [4 /*yield*/, (0, waitForBatchedUpdatesWithAct_1.default)()];
                    case 3:
                        _c.sent();
                        // Then: Verify API.write was called
                        // eslint-disable-next-line rulesdir/no-multiple-api-calls
                        expect(API.write).toHaveBeenCalledWith('CompleteTask', expect.objectContaining({
                            taskReportID: mockTaskReportID,
                        }), expect.any(Object));
                        calls = API.write.mock.calls;
                        _a = calls.at(0), onyxData = _a[2];
                        optimisticData = (_b = onyxData.optimisticData) !== null && _b !== void 0 ? _b : [];
                        parentReportActionUpdate = optimisticData.find(function (update) { var _a; return ((_a = update.key) === null || _a === void 0 ? void 0 : _a.includes('reportActions_')) && update.key !== "".concat(ONYXKEYS_1.default.COLLECTION.REPORT_ACTIONS).concat(mockTaskReportID); });
                        expect(parentReportActionUpdate).toBeUndefined();
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
