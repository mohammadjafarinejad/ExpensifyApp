"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTitleFieldFromRNVP = getTitleFieldFromRNVP;
exports.removeTitleFieldFromReport = removeTitleFieldFromReport;
exports.shouldUpdateTitleField = shouldUpdateTitleField;
exports.updateTitleFieldToMatchPolicy = updateTitleFieldToMatchPolicy;
var react_native_onyx_1 = require("react-native-onyx");
var CONST_1 = require("@src/CONST");
var ONYXKEYS_1 = require("@src/ONYXKEYS");
var Permissions_1 = require("./Permissions");
var ReportUtils_1 = require("./ReportUtils");
var allReportNameValuePairs = {};
var betas = [];
var betaConfiguration = {};
/**
 * We use Onyx.connectWithoutView because we do not use this in React components and this logic is not tied directly to the UI.
 * We need up to date report name value pairs of reports to correctly determine if further updates to report's titles should be made.
 * It wouldn't be possible without connection directly to Onyx.
 */
react_native_onyx_1.default.connectWithoutView({
    key: ONYXKEYS_1.default.COLLECTION.REPORT_NAME_VALUE_PAIRS,
    waitForCollectionCallback: true,
    callback: function (val) {
        var _a;
        allReportNameValuePairs = (_a = val) !== null && _a !== void 0 ? _a : {};
    },
});
react_native_onyx_1.default.connectWithoutView({
    key: ONYXKEYS_1.default.BETAS,
    callback: function (val) {
        betas = val !== null && val !== void 0 ? val : [];
    },
});
react_native_onyx_1.default.connectWithoutView({
    key: ONYXKEYS_1.default.BETA_CONFIGURATION,
    callback: function (val) {
        betaConfiguration = val !== null && val !== void 0 ? val : {};
    },
});
/**
 * Get the title field from report name value pairs
 */
function getTitleFieldFromRNVP(reportID) {
    var reportNameValuePairs = allReportNameValuePairs["".concat(ONYXKEYS_1.default.COLLECTION.REPORT_NAME_VALUE_PAIRS).concat(reportID)];
    // eslint-disable-next-line @typescript-eslint/naming-convention
    return reportNameValuePairs === null || reportNameValuePairs === void 0 ? void 0 : reportNameValuePairs.expensify_text_title;
}
/**
 * Update title field in report's rNVP to match the policy's title field configuration
 * This is the JavaScript equivalent of the backend updateTitleFieldToMatchPolicy function
 */
function updateTitleFieldToMatchPolicy(reportID, policy) {
    var _a;
    if (!Permissions_1.default.isBetaEnabled(CONST_1.default.BETAS.CUSTOM_REPORT_NAMES, betas, betaConfiguration)) {
        return [];
    }
    if (!reportID || !policy) {
        return [];
    }
    // Get the policy's title field configuration
    var reportTitleField = (0, ReportUtils_1.getTitleReportField)((_a = policy.fieldList) !== null && _a !== void 0 ? _a : {});
    // Early return if policy doesn't have a title field
    if (!reportTitleField) {
        return [];
    }
    // Create the update to set/update the title field in rNVP
    var optimisticData = [
        {
            onyxMethod: react_native_onyx_1.default.METHOD.MERGE,
            key: "".concat(ONYXKEYS_1.default.COLLECTION.REPORT_NAME_VALUE_PAIRS).concat(reportID),
            value: {
                // eslint-disable-next-line @typescript-eslint/naming-convention
                expensify_text_title: reportTitleField,
            },
        },
    ];
    return optimisticData;
}
/**
 * Remove title field from report's rNVP when report is manually renamed to indicate that the manual name should be preserved, and the custom report name formula should no longer update the name.
 */
function removeTitleFieldFromReport(reportID) {
    if (!Permissions_1.default.isBetaEnabled(CONST_1.default.BETAS.CUSTOM_REPORT_NAMES, betas, betaConfiguration)) {
        return [];
    }
    if (!reportID) {
        return [];
    }
    var optimisticData = [
        {
            onyxMethod: react_native_onyx_1.default.METHOD.MERGE,
            key: "".concat(ONYXKEYS_1.default.COLLECTION.REPORT_NAME_VALUE_PAIRS).concat(reportID),
            value: {
                // eslint-disable-next-line @typescript-eslint/naming-convention
                expensify_text_title: null,
            },
        },
    ];
    return optimisticData;
}
/**
 * Check if a report should have its title field updated based on conditions
 */
function shouldUpdateTitleField(report) {
    // todo: this should be more sophisticated function. check for iou etc
    if (!report) {
        return false;
    }
    // Skip chat reports
    if ((0, ReportUtils_1.isChatReport)(report)) {
        return false;
    }
    // Skip if report has statement card ID (backend check: !getValue(db, reportID, NVP_STATEMENT_CARD_ID).empty())
    // This would need to be implemented based on how statement card IDs are stored in the frontend
    var reportTitleField = getTitleFieldFromRNVP(report.reportID);
    if (!reportTitleField) {
        return false;
    }
    return true;
}
