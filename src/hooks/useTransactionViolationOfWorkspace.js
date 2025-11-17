"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var CollectionUtils_1 = require("@libs/CollectionUtils");
var ReportUtils_1 = require("@libs/ReportUtils");
var ONYXKEYS_1 = require("@src/ONYXKEYS");
var useOnyx_1 = require("./useOnyx");
function useTransactionViolationOfWorkspace(policyID) {
    var allReports = (0, useOnyx_1.default)(ONYXKEYS_1.default.COLLECTION.REPORT, { canBeMissing: true })[0];
    var reportsToArchive = Object.values(allReports !== null && allReports !== void 0 ? allReports : {}).filter(function (report) { return report != null && (0, ReportUtils_1.isPolicyRelatedReport)(report, policyID) && ((0, ReportUtils_1.isChatRoom)(report) || (0, ReportUtils_1.isPolicyExpenseChat)(report) || (0, ReportUtils_1.isTaskReport)(report)); });
    var transactionIDSet = new Set();
    reportsToArchive.forEach(function (report) {
        if (!(report === null || report === void 0 ? void 0 : report.iouReportID)) {
            return;
        }
        var reportTransactions = (0, ReportUtils_1.getReportTransactions)(report.iouReportID);
        for (var _i = 0, reportTransactions_1 = reportTransactions; _i < reportTransactions_1.length; _i++) {
            var transaction = reportTransactions_1[_i];
            transactionIDSet.add(transaction.transactionID);
        }
    });
    var transactionViolationSelector = (0, react_1.useCallback)(function (violations) {
        if (!violations) {
            return {};
        }
        var filteredViolationKeys = Object.keys(violations).filter(function (violationKey) {
            var transactionID = (0, CollectionUtils_1.extractCollectionItemID)(violationKey);
            return transactionIDSet.has(transactionID);
        });
        var filteredViolations = filteredViolationKeys.reduce(function (acc, key) {
            acc[key] = violations[key];
            return acc;
        }, {});
        return filteredViolations;
    }, [transactionIDSet]);
    var transactionViolations = (0, useOnyx_1.default)(ONYXKEYS_1.default.COLLECTION.TRANSACTION_VIOLATIONS, {
        selector: transactionViolationSelector,
        canBeMissing: true,
    }, [transactionIDSet])[0];
    return {
        reportsToArchive: reportsToArchive,
        transactionViolations: transactionViolations,
    };
}
exports.default = useTransactionViolationOfWorkspace;
