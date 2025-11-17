"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var OnyxListItemProvider_1 = require("@components/OnyxListItemProvider");
var useOnyx_1 = require("@hooks/useOnyx");
var usePolicy_1 = require("@hooks/usePolicy");
var ONYXKEYS_1 = require("@src/ONYXKEYS");
/**
 * Retrieves policy tags, categories, reports and their associated transactions and violations.
 * @param policyID The ID of the policy to retrieve data for.
 * @returns An object containing policy data
 */
function usePolicyData(policyID) {
    var policy = (0, usePolicy_1.default)(policyID);
    var allReportsTransactionsAndViolations = (0, OnyxListItemProvider_1.useAllReportsTransactionsAndViolations)();
    // Stable selector for useOnyx to avoid defining the selector inline
    var reportsSelectorCallback = (0, react_1.useCallback)(function (allReports) {
        if (!policyID || !allReports || !allReportsTransactionsAndViolations) {
            return {};
        }
        // Filter reports to only include those that belong to the specified policy and have associated transactions
        return Object.keys(allReportsTransactionsAndViolations).reduce(function (acc, reportID) {
            var policyReport = allReports["".concat(ONYXKEYS_1.default.COLLECTION.REPORT).concat(reportID)];
            if ((policyReport === null || policyReport === void 0 ? void 0 : policyReport.policyID) === policyID) {
                acc[reportID] = policyReport;
            }
            return acc;
        }, {});
    }, [policyID, allReportsTransactionsAndViolations]);
    var tags = (0, useOnyx_1.default)("".concat(ONYXKEYS_1.default.COLLECTION.POLICY_TAGS).concat(policyID), { canBeMissing: true }, [policyID])[0];
    var categories = (0, useOnyx_1.default)("".concat(ONYXKEYS_1.default.COLLECTION.POLICY_CATEGORIES).concat(policyID), { canBeMissing: true }, [policyID])[0];
    var reports = (0, useOnyx_1.default)(ONYXKEYS_1.default.COLLECTION.REPORT, { canBeMissing: true, selector: reportsSelectorCallback }, [policyID, allReportsTransactionsAndViolations])[0];
    var transactionsAndViolations = (0, react_1.useMemo)(function () {
        if (!reports || !allReportsTransactionsAndViolations) {
            return {};
        }
        return Object.keys(reports).reduce(function (acc, reportID) {
            if (allReportsTransactionsAndViolations[reportID]) {
                acc[reportID] = allReportsTransactionsAndViolations[reportID];
            }
            return acc;
        }, {});
    }, [reports, allReportsTransactionsAndViolations]);
    return {
        transactionsAndViolations: transactionsAndViolations,
        tags: tags !== null && tags !== void 0 ? tags : {},
        categories: categories !== null && categories !== void 0 ? categories : {},
        policy: policy,
        reports: Object.values(reports !== null && reports !== void 0 ? reports : {}),
    };
}
exports.default = usePolicyData;
