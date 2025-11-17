"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.navigateToQuickAction = navigateToQuickAction;
exports.getQuickActionRequestType = getQuickActionRequestType;
var ReportUtils_1 = require("@libs/ReportUtils");
var CONST_1 = require("@src/CONST");
var IOU_1 = require("./IOU");
var Task_1 = require("./Task");
function getQuickActionRequestType(action, lastDistanceExpenseType) {
    if (!action) {
        return;
    }
    var requestType;
    if ([CONST_1.default.QUICK_ACTIONS.REQUEST_MANUAL, CONST_1.default.QUICK_ACTIONS.SPLIT_MANUAL, CONST_1.default.QUICK_ACTIONS.TRACK_MANUAL].some(function (a) { return a === action; })) {
        requestType = CONST_1.default.IOU.REQUEST_TYPE.MANUAL;
    }
    else if ([CONST_1.default.QUICK_ACTIONS.REQUEST_SCAN, CONST_1.default.QUICK_ACTIONS.SPLIT_SCAN, CONST_1.default.QUICK_ACTIONS.TRACK_SCAN].some(function (a) { return a === action; })) {
        requestType = CONST_1.default.IOU.REQUEST_TYPE.SCAN;
    }
    else if ([CONST_1.default.QUICK_ACTIONS.REQUEST_DISTANCE, CONST_1.default.QUICK_ACTIONS.SPLIT_DISTANCE, CONST_1.default.QUICK_ACTIONS.TRACK_DISTANCE].some(function (a) { return a === action; })) {
        requestType = lastDistanceExpenseType !== null && lastDistanceExpenseType !== void 0 ? lastDistanceExpenseType : CONST_1.default.IOU.REQUEST_TYPE.DISTANCE_MAP;
    }
    else if (action === CONST_1.default.QUICK_ACTIONS.PER_DIEM) {
        requestType = CONST_1.default.IOU.REQUEST_TYPE.PER_DIEM;
    }
    return requestType;
}
function navigateToQuickAction(params) {
    var isValidReport = params.isValidReport, quickAction = params.quickAction, selectOption = params.selectOption, lastDistanceExpenseType = params.lastDistanceExpenseType, targetAccountPersonalDetails = params.targetAccountPersonalDetails, currentUserAccountID = params.currentUserAccountID;
    var reportID = isValidReport && (quickAction === null || quickAction === void 0 ? void 0 : quickAction.chatReportID) ? quickAction === null || quickAction === void 0 ? void 0 : quickAction.chatReportID : (0, ReportUtils_1.generateReportID)();
    var requestType = getQuickActionRequestType(quickAction === null || quickAction === void 0 ? void 0 : quickAction.action, lastDistanceExpenseType);
    switch (quickAction === null || quickAction === void 0 ? void 0 : quickAction.action) {
        case CONST_1.default.QUICK_ACTIONS.REQUEST_MANUAL:
        case CONST_1.default.QUICK_ACTIONS.REQUEST_SCAN:
        case CONST_1.default.QUICK_ACTIONS.PER_DIEM:
            selectOption(function () { return (0, IOU_1.startMoneyRequest)(CONST_1.default.IOU.TYPE.SUBMIT, reportID, requestType, true); }, true);
            break;
        case CONST_1.default.QUICK_ACTIONS.SPLIT_MANUAL:
        case CONST_1.default.QUICK_ACTIONS.SPLIT_SCAN:
        case CONST_1.default.QUICK_ACTIONS.SPLIT_DISTANCE:
            selectOption(function () { return (0, IOU_1.startMoneyRequest)(CONST_1.default.IOU.TYPE.SPLIT, reportID, requestType, true); }, true);
            break;
        case CONST_1.default.QUICK_ACTIONS.SEND_MONEY:
            selectOption(function () { return (0, IOU_1.startMoneyRequest)(CONST_1.default.IOU.TYPE.PAY, reportID, undefined, true); }, false);
            break;
        case CONST_1.default.QUICK_ACTIONS.ASSIGN_TASK:
            selectOption(function () { return (0, Task_1.startOutCreateTaskQuickAction)(currentUserAccountID, isValidReport ? reportID : '', targetAccountPersonalDetails); }, false);
            break;
        case CONST_1.default.QUICK_ACTIONS.TRACK_MANUAL:
        case CONST_1.default.QUICK_ACTIONS.TRACK_SCAN:
            selectOption(function () { return (0, IOU_1.startMoneyRequest)(CONST_1.default.IOU.TYPE.TRACK, reportID, requestType, true); }, false);
            break;
        case CONST_1.default.QUICK_ACTIONS.REQUEST_DISTANCE:
            selectOption(function () { return (0, IOU_1.startDistanceRequest)(CONST_1.default.IOU.TYPE.SUBMIT, reportID, requestType, true); }, false);
            break;
        case CONST_1.default.QUICK_ACTIONS.TRACK_DISTANCE:
            selectOption(function () { return (0, IOU_1.startDistanceRequest)(CONST_1.default.IOU.TYPE.TRACK, reportID, requestType, true); }, false);
            break;
        default:
    }
}
