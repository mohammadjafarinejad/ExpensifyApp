"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_native_onyx_1 = require("react-native-onyx");
var ONYXKEYS_1 = require("@src/ONYXKEYS");
var types_1 = require("./API/types");
var Pagination_1 = require("./Middleware/Pagination");
var ReportActionsUtils_1 = require("./ReportActionsUtils");
var ReportUtils_1 = require("./ReportUtils");
/**
 * This connection is exclusively used within the `registerPaginationConfig` function.
 * Using connectWithoutView() is appropriate here since these values are not directly
 * bound to any UI components.
 */
var allReports;
react_native_onyx_1.default.connectWithoutView({
    key: ONYXKEYS_1.default.COLLECTION.REPORT,
    waitForCollectionCallback: true,
    callback: function (value) {
        allReports = value;
    },
});
var allReportNameValuePairs;
/**
 * This connection is exclusively used within the `registerPaginationConfig` function.
 * Using connectWithoutView() is appropriate here since these values are not directly
 * bound to any UI components.
 */
react_native_onyx_1.default.connectWithoutView({
    key: ONYXKEYS_1.default.COLLECTION.REPORT_NAME_VALUE_PAIRS,
    waitForCollectionCallback: true,
    callback: function (value) {
        allReportNameValuePairs = value;
    },
});
(0, Pagination_1.registerPaginationConfig)({
    initialCommand: types_1.WRITE_COMMANDS.OPEN_REPORT,
    previousCommand: types_1.READ_COMMANDS.GET_OLDER_ACTIONS,
    nextCommand: types_1.READ_COMMANDS.GET_NEWER_ACTIONS,
    resourceCollectionKey: ONYXKEYS_1.default.COLLECTION.REPORT_ACTIONS,
    pageCollectionKey: ONYXKEYS_1.default.COLLECTION.REPORT_ACTIONS_PAGES,
    sortItems: function (reportActions, reportID) {
        var report = allReports === null || allReports === void 0 ? void 0 : allReports["".concat(ONYXKEYS_1.default.COLLECTION.REPORT).concat(reportID)];
        var reportNameValuePairs = allReportNameValuePairs === null || allReportNameValuePairs === void 0 ? void 0 : allReportNameValuePairs["".concat(ONYXKEYS_1.default.COLLECTION.REPORT_NAME_VALUE_PAIRS).concat(reportID)];
        var isReportArchived = !!(reportNameValuePairs === null || reportNameValuePairs === void 0 ? void 0 : reportNameValuePairs.private_isArchived);
        var canUserPerformWriteAction = (0, ReportUtils_1.canUserPerformWriteAction)(report, isReportArchived);
        return (0, ReportActionsUtils_1.getSortedReportActionsForDisplay)(reportActions, canUserPerformWriteAction, true);
    },
    getItemID: function (reportAction) { return reportAction.reportActionID; },
});
