"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ONYXKEYS_1 = require("@src/ONYXKEYS");
var useOnyx_1 = require("./useOnyx");
var useReportIsArchived_1 = require("./useReportIsArchived");
function useOnboardingTaskInformation(taskName) {
    var introSelected = (0, useOnyx_1.default)(ONYXKEYS_1.default.NVP_INTRO_SELECTED, { canBeMissing: true })[0];
    var taskReportID = introSelected === null || introSelected === void 0 ? void 0 : introSelected[taskName];
    var taskReport = (0, useOnyx_1.default)("".concat(ONYXKEYS_1.default.COLLECTION.REPORT).concat(taskReportID), { canBeMissing: true }, [taskReportID])[0];
    var taskParentReport = (0, useOnyx_1.default)("".concat(ONYXKEYS_1.default.COLLECTION.REPORT).concat(taskReport === null || taskReport === void 0 ? void 0 : taskReport.parentReportID), { canBeMissing: true })[0];
    var isOnboardingTaskParentReportArchived = (0, useReportIsArchived_1.default)(taskParentReport === null || taskParentReport === void 0 ? void 0 : taskParentReport.reportID);
    return {
        taskReport: taskReport,
        taskParentReport: taskParentReport,
        isOnboardingTaskParentReportArchived: isOnboardingTaskParentReportArchived,
    };
}
exports.default = useOnboardingTaskInformation;
