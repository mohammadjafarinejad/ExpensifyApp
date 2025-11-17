"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var TaxPicker_1 = require("@components/TaxPicker");
var useLocalize_1 = require("@hooks/useLocalize");
var useOnyx_1 = require("@hooks/useOnyx");
var useRestartOnReceiptFailure_1 = require("@hooks/useRestartOnReceiptFailure");
var CurrencyUtils_1 = require("@libs/CurrencyUtils");
var Navigation_1 = require("@libs/Navigation/Navigation");
var TransactionUtils_1 = require("@libs/TransactionUtils");
var IOU_1 = require("@userActions/IOU");
var CONST_1 = require("@src/CONST");
var ONYXKEYS_1 = require("@src/ONYXKEYS");
var EmptyObject_1 = require("@src/types/utils/EmptyObject");
var StepScreenWrapper_1 = require("./StepScreenWrapper");
var withFullTransactionOrNotFound_1 = require("./withFullTransactionOrNotFound");
var withWritableReportOrNotFound_1 = require("./withWritableReportOrNotFound");
function getTaxAmount(policy, transaction, selectedTaxCode, amount) {
    var taxPercentage = (0, TransactionUtils_1.getTaxValue)(policy, transaction, selectedTaxCode);
    if (taxPercentage) {
        return (0, TransactionUtils_1.calculateTaxAmount)(taxPercentage, amount, (0, TransactionUtils_1.getCurrency)(transaction));
    }
}
function IOURequestStepTaxRatePage(_a) {
    var _b = _a.route.params, action = _b.action, backTo = _b.backTo, iouType = _b.iouType, transactionID = _b.transactionID, reportIDFromRoute = _b.reportID, transaction = _a.transaction, report = _a.report;
    var translate = (0, useLocalize_1.default)().translate;
    var policy = (0, useOnyx_1.default)("".concat(ONYXKEYS_1.default.COLLECTION.POLICY).concat(report === null || report === void 0 ? void 0 : report.policyID), { canBeMissing: true })[0];
    var policyCategories = (0, useOnyx_1.default)("".concat(ONYXKEYS_1.default.COLLECTION.POLICY_CATEGORIES).concat(policy === null || policy === void 0 ? void 0 : policy.id), { canBeMissing: true })[0];
    var policyTags = (0, useOnyx_1.default)("".concat(ONYXKEYS_1.default.COLLECTION.POLICY_TAGS).concat(policy === null || policy === void 0 ? void 0 : policy.id), { canBeMissing: true })[0];
    var splitDraftTransaction = (0, useOnyx_1.default)("".concat(ONYXKEYS_1.default.COLLECTION.SPLIT_TRANSACTION_DRAFT).concat(transactionID), { canBeMissing: true })[0];
    (0, useRestartOnReceiptFailure_1.default)(transaction, reportIDFromRoute, iouType, action);
    var isEditing = action === CONST_1.default.IOU.ACTION.EDIT;
    var isEditingSplitBill = isEditing && iouType === CONST_1.default.IOU.TYPE.SPLIT;
    var currentTransaction = isEditingSplitBill && !(0, EmptyObject_1.isEmptyObject)(splitDraftTransaction) ? splitDraftTransaction : transaction;
    var taxRates = policy === null || policy === void 0 ? void 0 : policy.taxRates;
    var navigateBack = function () {
        Navigation_1.default.goBack(backTo);
    };
    var taxRateTitle = (0, TransactionUtils_1.getTaxName)(policy, currentTransaction);
    var updateTaxRates = function (taxes) {
        var _a;
        if (!currentTransaction || !taxes.code || !taxRates) {
            Navigation_1.default.goBack();
            return;
        }
        var taxAmount = getTaxAmount(policy, currentTransaction, taxes.code, (0, TransactionUtils_1.getAmount)(currentTransaction, false, true));
        if (isEditingSplitBill) {
            (0, IOU_1.setDraftSplitTransaction)(currentTransaction.transactionID, splitDraftTransaction, {
                taxAmount: (0, CurrencyUtils_1.convertToBackendAmount)(taxAmount !== null && taxAmount !== void 0 ? taxAmount : 0),
                taxCode: taxes.code,
            });
            navigateBack();
            return;
        }
        if (isEditing) {
            var newTaxCode = taxes.code;
            (0, IOU_1.updateMoneyRequestTaxRate)({
                transactionID: currentTransaction === null || currentTransaction === void 0 ? void 0 : currentTransaction.transactionID,
                optimisticReportActionID: report === null || report === void 0 ? void 0 : report.reportID,
                taxCode: newTaxCode,
                taxAmount: (0, CurrencyUtils_1.convertToBackendAmount)(taxAmount !== null && taxAmount !== void 0 ? taxAmount : 0),
                policy: policy,
                policyTagList: policyTags,
                policyCategories: policyCategories,
            });
            navigateBack();
            return;
        }
        if (taxAmount === undefined) {
            navigateBack();
            return;
        }
        var amountInSmallestCurrencyUnits = (0, CurrencyUtils_1.convertToBackendAmount)(taxAmount);
        (0, IOU_1.setMoneyRequestTaxRate)(currentTransaction === null || currentTransaction === void 0 ? void 0 : currentTransaction.transactionID, (_a = taxes === null || taxes === void 0 ? void 0 : taxes.code) !== null && _a !== void 0 ? _a : '');
        (0, IOU_1.setMoneyRequestTaxAmount)(currentTransaction.transactionID, amountInSmallestCurrencyUnits);
        navigateBack();
    };
    return (<StepScreenWrapper_1.default headerTitle={translate('iou.taxRate')} onBackButtonPress={navigateBack} shouldShowWrapper testID={IOURequestStepTaxRatePage.displayName}>
            <TaxPicker_1.default selectedTaxRate={taxRateTitle} policyID={policy === null || policy === void 0 ? void 0 : policy.id} transactionID={currentTransaction === null || currentTransaction === void 0 ? void 0 : currentTransaction.transactionID} onSubmit={updateTaxRates} action={action} iouType={iouType} onDismiss={navigateBack}/>
        </StepScreenWrapper_1.default>);
}
IOURequestStepTaxRatePage.displayName = 'IOURequestStepTaxRatePage';
// eslint-disable-next-line rulesdir/no-negated-variables
var IOURequestStepTaxRatePageWithWritableReportOrNotFound = (0, withWritableReportOrNotFound_1.default)(IOURequestStepTaxRatePage);
// eslint-disable-next-line rulesdir/no-negated-variables
var IOURequestStepTaxRatePageWithFullTransactionOrNotFound = (0, withFullTransactionOrNotFound_1.default)(IOURequestStepTaxRatePageWithWritableReportOrNotFound);
exports.default = IOURequestStepTaxRatePageWithFullTransactionOrNotFound;
