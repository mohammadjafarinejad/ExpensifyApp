"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = useConditionalCreateEmptyReportConfirmation;
var Session_1 = require("@selectors/Session");
var react_1 = require("react");
var ReportUtils_1 = require("@libs/ReportUtils");
var ONYXKEYS_1 = require("@src/ONYXKEYS");
var getEmptyArray_1 = require("@src/types/utils/getEmptyArray");
var useCreateEmptyReportConfirmation_1 = require("./useCreateEmptyReportConfirmation");
var useOnyx_1 = require("./useOnyx");
/**
 * Hook that combines the empty report detection logic with the confirmation modal.
 * It ensures the provided callback is only executed after the user confirms creation when necessary.
 */
function useConditionalCreateEmptyReportConfirmation(_a) {
    var policyID = _a.policyID, policyName = _a.policyName, onCreateReport = _a.onCreateReport, onCancel = _a.onCancel, _b = _a.shouldBypassConfirmation, shouldBypassConfirmation = _b === void 0 ? false : _b;
    var accountID = (0, useOnyx_1.default)(ONYXKEYS_1.default.SESSION, { selector: Session_1.accountIDSelector, canBeMissing: true })[0];
    var _c = (0, useOnyx_1.default)(ONYXKEYS_1.default.COLLECTION.REPORT, {
        canBeMissing: true,
        selector: ReportUtils_1.reportSummariesOnyxSelector,
    })[0], reportSummaries = _c === void 0 ? (0, getEmptyArray_1.default)() : _c;
    var hasEmptyReport = (0, react_1.useMemo)(function () { return (0, ReportUtils_1.hasEmptyReportsForPolicy)(reportSummaries, policyID, accountID); }, [accountID, policyID, reportSummaries]);
    var _d = (0, useCreateEmptyReportConfirmation_1.default)({
        policyID: policyID,
        policyName: policyName,
        onConfirm: onCreateReport,
        onCancel: onCancel,
    }), openCreateReportConfirmation = _d.openCreateReportConfirmation, CreateReportConfirmationModal = _d.CreateReportConfirmationModal;
    var handleCreateReport = (0, react_1.useCallback)(function () {
        if (hasEmptyReport && !shouldBypassConfirmation) {
            openCreateReportConfirmation();
            return;
        }
        onCreateReport();
    }, [hasEmptyReport, onCreateReport, openCreateReportConfirmation, shouldBypassConfirmation]);
    return {
        handleCreateReport: handleCreateReport,
        hasEmptyReport: hasEmptyReport,
        CreateReportConfirmationModal: CreateReportConfirmationModal,
    };
}
