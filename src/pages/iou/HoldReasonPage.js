"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var SearchContext_1 = require("@components/Search/SearchContext");
var useLocalize_1 = require("@hooks/useLocalize");
var useOnyx_1 = require("@hooks/useOnyx");
var ErrorUtils_1 = require("@libs/ErrorUtils");
var Navigation_1 = require("@libs/Navigation/Navigation");
var ReportActionsUtils_1 = require("@libs/ReportActionsUtils");
var ReportUtils_1 = require("@libs/ReportUtils");
var ValidationUtils_1 = require("@libs/ValidationUtils");
var FormActions_1 = require("@userActions/FormActions");
var IOU_1 = require("@userActions/IOU");
var ONYXKEYS_1 = require("@src/ONYXKEYS");
var MoneyRequestHoldReasonForm_1 = require("@src/types/form/MoneyRequestHoldReasonForm");
var HoldReasonFormView_1 = require("./HoldReasonFormView");
function HoldReasonPage(_a) {
    var route = _a.route;
    var translate = (0, useLocalize_1.default)().translate;
    var _b = route.params, transactionID = _b.transactionID, reportID = _b.reportID, backTo = _b.backTo, searchHash = _b.searchHash;
    var report = (0, useOnyx_1.default)("".concat(ONYXKEYS_1.default.COLLECTION.REPORT).concat(reportID), { canBeMissing: true })[0];
    var selectedTransactionIDs = (0, SearchContext_1.useSearchContext)().selectedTransactionIDs;
    // We first check if the report is part of a policy - if not, then it's a personal request (1:1 request)
    // For personal requests, we need to allow both users to put the request on hold
    var isWorkspaceRequest = (0, ReportUtils_1.isReportInGroupPolicy)(report);
    var parentReportAction = (0, ReportActionsUtils_1.getReportAction)(report === null || report === void 0 ? void 0 : report.parentReportID, report === null || report === void 0 ? void 0 : report.parentReportActionID);
    var onSubmit = function (values) {
        // We have extra isWorkspaceRequest condition since, for 1:1 requests, canEditMoneyRequest will rightly return false
        // as we do not allow requestee to edit fields like description and amount.
        // But, we still want the requestee to be able to put the request on hold
        if ((0, ReportActionsUtils_1.isMoneyRequestAction)(parentReportAction) && !(0, ReportUtils_1.canEditMoneyRequest)(parentReportAction) && isWorkspaceRequest) {
            return;
        }
        (0, IOU_1.putOnHold)(transactionID, values.comment, reportID, searchHash);
        Navigation_1.default.goBack(backTo);
    };
    var validate = (0, react_1.useCallback)(function (values) {
        var errors = (0, ValidationUtils_1.getFieldRequiredErrors)(values, [MoneyRequestHoldReasonForm_1.default.COMMENT]);
        if (!values.comment) {
            errors.comment = translate('common.error.fieldRequired');
        }
        // We have extra isWorkspaceRequest condition since, for 1:1 requests, canEditMoneyRequest will rightly return false
        // as we do not allow requestee to edit fields like description and amount.
        // But, we still want the requestee to be able to put the request on hold
        if ((0, ReportActionsUtils_1.isMoneyRequestAction)(parentReportAction) && !(0, ReportUtils_1.canEditMoneyRequest)(parentReportAction) && isWorkspaceRequest) {
            var formErrors = {};
            (0, ErrorUtils_1.addErrorMessage)(formErrors, 'reportModified', translate('common.error.requestModified'));
            (0, FormActions_1.setErrors)(ONYXKEYS_1.default.FORMS.MONEY_REQUEST_HOLD_FORM, formErrors);
        }
        return errors;
    }, [parentReportAction, isWorkspaceRequest, translate]);
    (0, react_1.useEffect)(function () {
        (0, FormActions_1.clearErrors)(ONYXKEYS_1.default.FORMS.MONEY_REQUEST_HOLD_FORM);
        (0, FormActions_1.clearErrorFields)(ONYXKEYS_1.default.FORMS.MONEY_REQUEST_HOLD_FORM);
    }, []);
    return (<HoldReasonFormView_1.default onSubmit={onSubmit} validate={validate} backTo={backTo} expenseCount={selectedTransactionIDs.length}/>);
}
HoldReasonPage.displayName = 'MoneyRequestHoldReasonPage';
exports.default = HoldReasonPage;
