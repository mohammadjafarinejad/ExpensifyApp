"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isActiveTaskEditRoute = isActiveTaskEditRoute;
exports.getTaskReportActionMessage = getTaskReportActionMessage;
exports.getTaskTitle = getTaskTitle;
exports.getTaskTitleFromReport = getTaskTitleFromReport;
exports.getTaskCreatedMessage = getTaskCreatedMessage;
var CONST_1 = require("@src/CONST");
var ROUTES_1 = require("@src/ROUTES");
// eslint-disable-next-line @typescript-eslint/no-deprecated
var Localize_1 = require("./Localize");
var Navigation_1 = require("./Navigation/Navigation");
var Parser_1 = require("./Parser");
var ReportActionsUtils_1 = require("./ReportActionsUtils");
/**
 * Check if the active route belongs to task edit flow.
 */
function isActiveTaskEditRoute(reportID) {
    if (!reportID) {
        return false;
    }
    return [ROUTES_1.default.TASK_TITLE, ROUTES_1.default.TASK_ASSIGNEE, ROUTES_1.default.REPORT_DESCRIPTION].map(function (route) { return route.getRoute(reportID); }).some(Navigation_1.default.isActiveRoute);
}
/**
 * Given the Task reportAction name, return the appropriate message to be displayed and copied to clipboard.
 */
function getTaskReportActionMessage(action) {
    switch (action === null || action === void 0 ? void 0 : action.actionName) {
        case CONST_1.default.REPORT.ACTIONS.TYPE.TASK_COMPLETED:
            // eslint-disable-next-line @typescript-eslint/no-deprecated
            return { text: (0, Localize_1.translateLocal)('task.messages.completed') };
        case CONST_1.default.REPORT.ACTIONS.TYPE.TASK_CANCELLED:
            // eslint-disable-next-line @typescript-eslint/no-deprecated
            return { text: (0, Localize_1.translateLocal)('task.messages.canceled') };
        case CONST_1.default.REPORT.ACTIONS.TYPE.TASK_REOPENED:
            // eslint-disable-next-line @typescript-eslint/no-deprecated
            return { text: (0, Localize_1.translateLocal)('task.messages.reopened') };
        case CONST_1.default.REPORT.ACTIONS.TYPE.TASK_EDITED:
            return {
                text: (0, ReportActionsUtils_1.getReportActionText)(action),
                html: (0, ReportActionsUtils_1.getReportActionHtml)(action),
            };
        default:
            // eslint-disable-next-line @typescript-eslint/no-deprecated
            return { text: (0, Localize_1.translateLocal)('task.task') };
    }
}
function getTaskTitleFromReport(taskReport, fallbackTitle, shouldReturnMarkdown) {
    if (fallbackTitle === void 0) { fallbackTitle = ''; }
    if (shouldReturnMarkdown === void 0) { shouldReturnMarkdown = false; }
    // We need to check for reportID, not just reportName, because when a receiver opens the task for the first time,
    // an optimistic report is created with the only property - reportName: 'Chat report',
    // and it will be displayed as the task title without checking for reportID to be present.
    var title = (taskReport === null || taskReport === void 0 ? void 0 : taskReport.reportID) && taskReport.reportName ? taskReport.reportName : fallbackTitle;
    return shouldReturnMarkdown ? Parser_1.default.htmlToMarkdown(title) : Parser_1.default.htmlToText(title).trim();
}
function getTaskTitle(taskReport, fallbackTitle, shouldReturnMarkdown) {
    if (fallbackTitle === void 0) { fallbackTitle = ''; }
    if (shouldReturnMarkdown === void 0) { shouldReturnMarkdown = false; }
    return getTaskTitleFromReport(taskReport, fallbackTitle, shouldReturnMarkdown);
}
function getTaskCreatedMessage(reportAction, taskReport, shouldReturnMarkdown) {
    if (shouldReturnMarkdown === void 0) { shouldReturnMarkdown = false; }
    var taskTitle = getTaskTitle(taskReport, reportAction === null || reportAction === void 0 ? void 0 : reportAction.childReportName, shouldReturnMarkdown);
    // eslint-disable-next-line @typescript-eslint/no-deprecated
    return taskTitle ? (0, Localize_1.translateLocal)('task.messages.created', { title: taskTitle }) : '';
}
