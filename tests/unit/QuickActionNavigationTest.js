"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var IOU_1 = require("@libs/actions/IOU");
var QuickActionNavigation_1 = require("@libs/actions/QuickActionNavigation");
var Task_1 = require("@libs/actions/Task");
var ReportUtils_1 = require("@libs/ReportUtils");
var CONST_1 = require("@src/CONST");
var personalDetails_1 = require("../utils/collections/personalDetails");
jest.mock('@libs/actions/IOU', function () { return ({
    startMoneyRequest: jest.fn(),
    startDistanceRequest: jest.fn(),
}); });
jest.mock('@libs/actions/Report', function () { return ({
    createNewReport: jest.fn(),
}); });
jest.mock('@libs/actions/Task', function () { return ({
    startOutCreateTaskQuickAction: jest.fn(),
}); });
describe('IOU Utils', function () {
    // Given navigateToQuickAction is called with quick action argument when clicking on quick action button from Global create menu
    describe('navigateToQuickAction', function () {
        var reportID = (0, ReportUtils_1.generateReportID)();
        it('should be navigated to Manual Submit Expense', function () {
            // When the quick action is REQUEST_MANUAL
            (0, QuickActionNavigation_1.navigateToQuickAction)({
                isValidReport: true,
                quickAction: { action: CONST_1.default.QUICK_ACTIONS.REQUEST_MANUAL, chatReportID: reportID },
                selectOption: function (onSelected) {
                    onSelected();
                },
                targetAccountPersonalDetails: (0, personalDetails_1.default)(1),
                currentUserAccountID: CONST_1.default.DEFAULT_NUMBER_ID,
            });
            // Then we should start manual submit request flow
            expect(IOU_1.startMoneyRequest).toHaveBeenCalledWith(CONST_1.default.IOU.TYPE.SUBMIT, reportID, CONST_1.default.IOU.REQUEST_TYPE.MANUAL, true);
        });
        it('should be navigated to Scan receipt Split Expense', function () {
            // When the quick action is SPLIT_SCAN
            (0, QuickActionNavigation_1.navigateToQuickAction)({
                isValidReport: true,
                quickAction: { action: CONST_1.default.QUICK_ACTIONS.SPLIT_SCAN, chatReportID: reportID },
                selectOption: function (onSelected) {
                    onSelected();
                },
                targetAccountPersonalDetails: (0, personalDetails_1.default)(1),
                currentUserAccountID: CONST_1.default.DEFAULT_NUMBER_ID,
            });
            // Then we should start scan split request flow
            expect(IOU_1.startMoneyRequest).toHaveBeenCalledWith(CONST_1.default.IOU.TYPE.SPLIT, reportID, CONST_1.default.IOU.REQUEST_TYPE.SCAN, true);
        });
        it('should be navigated to Track distance Expense', function () {
            // When the quick action is TRACK_DISTANCE
            (0, QuickActionNavigation_1.navigateToQuickAction)({
                isValidReport: true,
                quickAction: { action: CONST_1.default.QUICK_ACTIONS.TRACK_DISTANCE, chatReportID: reportID },
                selectOption: function (onSelected) {
                    onSelected();
                },
                targetAccountPersonalDetails: (0, personalDetails_1.default)(1),
                currentUserAccountID: CONST_1.default.DEFAULT_NUMBER_ID,
            });
            // Then we should start distance track request flow
            expect(IOU_1.startDistanceRequest).toHaveBeenCalledWith(CONST_1.default.IOU.TYPE.TRACK, reportID, CONST_1.default.IOU.REQUEST_TYPE.DISTANCE_MAP, true);
        });
        it('should be navigated to Map distance Expense by default', function () {
            // When the quick action is REQUEST_DISTANCE
            (0, QuickActionNavigation_1.navigateToQuickAction)({
                isValidReport: true,
                quickAction: { action: CONST_1.default.QUICK_ACTIONS.REQUEST_DISTANCE, chatReportID: reportID },
                selectOption: function (onSelected) {
                    onSelected();
                },
                targetAccountPersonalDetails: (0, personalDetails_1.default)(1),
                currentUserAccountID: CONST_1.default.DEFAULT_NUMBER_ID,
            });
            // Then we should start map distance request flow
            expect(IOU_1.startDistanceRequest).toHaveBeenCalledWith(CONST_1.default.IOU.TYPE.SUBMIT, reportID, CONST_1.default.IOU.REQUEST_TYPE.DISTANCE_MAP, true);
        });
        it('should be navigated to request distance Expense depending on lastDistanceExpenseType', function () {
            // When the quick action is REQUEST_DISTANCE
            (0, QuickActionNavigation_1.navigateToQuickAction)({
                isValidReport: true,
                quickAction: { action: CONST_1.default.QUICK_ACTIONS.REQUEST_DISTANCE, chatReportID: reportID },
                selectOption: function (onSelected) {
                    onSelected();
                },
                targetAccountPersonalDetails: (0, personalDetails_1.default)(1),
                lastDistanceExpenseType: CONST_1.default.IOU.REQUEST_TYPE.DISTANCE_MANUAL,
                currentUserAccountID: CONST_1.default.DEFAULT_NUMBER_ID,
            });
            // Then we should start manual distance request flow
            expect(IOU_1.startDistanceRequest).toHaveBeenCalledWith(CONST_1.default.IOU.TYPE.SUBMIT, reportID, CONST_1.default.IOU.REQUEST_TYPE.DISTANCE_MANUAL, true);
        });
        it('should be navigated to Per Diem Expense', function () {
            // When the quick action is PER_DIEM
            (0, QuickActionNavigation_1.navigateToQuickAction)({
                isValidReport: true,
                quickAction: { action: CONST_1.default.QUICK_ACTIONS.PER_DIEM, chatReportID: reportID },
                selectOption: function (onSelected) {
                    onSelected();
                },
                targetAccountPersonalDetails: (0, personalDetails_1.default)(1),
                currentUserAccountID: CONST_1.default.DEFAULT_NUMBER_ID,
            });
            // Then we should start per diem request flow
            expect(IOU_1.startMoneyRequest).toHaveBeenCalledWith(CONST_1.default.IOU.TYPE.SUBMIT, reportID, CONST_1.default.IOU.REQUEST_TYPE.PER_DIEM, true);
        });
    });
});
describe('Non IOU quickActions test:', function () {
    describe('navigateToQuickAction', function () {
        it('starts create task flow for "assignTask" quick action', function () {
            (0, QuickActionNavigation_1.navigateToQuickAction)({
                isValidReport: true,
                quickAction: { action: CONST_1.default.QUICK_ACTIONS.ASSIGN_TASK, targetAccountID: 123 },
                selectOption: function (onSelected) {
                    onSelected();
                },
                targetAccountPersonalDetails: (0, personalDetails_1.default)(123),
                currentUserAccountID: CONST_1.default.DEFAULT_NUMBER_ID,
            });
            expect(Task_1.startOutCreateTaskQuickAction).toHaveBeenCalled();
        });
    });
});
