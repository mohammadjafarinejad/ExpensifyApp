"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getQBONonReimbursableExportAccountType = getQBONonReimbursableExportAccountType;
exports.getQBDNonReimbursableExportAccountType = getQBDNonReimbursableExportAccountType;
var CONST_1 = require("@src/CONST");
// eslint-disable-next-line @typescript-eslint/no-deprecated
var Localize_1 = require("./Localize");
function getQBONonReimbursableExportAccountType(exportDestination) {
    switch (exportDestination) {
        case CONST_1.default.QUICKBOOKS_NON_REIMBURSABLE_EXPORT_ACCOUNT_TYPE.DEBIT_CARD:
            // eslint-disable-next-line @typescript-eslint/no-deprecated
            return (0, Localize_1.translateLocal)('workspace.qbo.bankAccount');
        case CONST_1.default.QUICKBOOKS_NON_REIMBURSABLE_EXPORT_ACCOUNT_TYPE.CREDIT_CARD:
            // eslint-disable-next-line @typescript-eslint/no-deprecated
            return (0, Localize_1.translateLocal)('workspace.qbo.creditCardAccount');
        case CONST_1.default.QUICKBOOKS_NON_REIMBURSABLE_EXPORT_ACCOUNT_TYPE.VENDOR_BILL:
            // eslint-disable-next-line @typescript-eslint/no-deprecated
            return (0, Localize_1.translateLocal)('workspace.qbo.accountsPayable');
        default:
            // eslint-disable-next-line @typescript-eslint/no-deprecated
            return (0, Localize_1.translateLocal)('workspace.qbo.account');
    }
}
function getQBDNonReimbursableExportAccountType(exportDestination) {
    switch (exportDestination) {
        case CONST_1.default.QUICKBOOKS_DESKTOP_NON_REIMBURSABLE_EXPORT_ACCOUNT_TYPE.CHECK:
            // eslint-disable-next-line @typescript-eslint/no-deprecated
            return (0, Localize_1.translateLocal)('workspace.qbd.bankAccount');
        case CONST_1.default.QUICKBOOKS_DESKTOP_NON_REIMBURSABLE_EXPORT_ACCOUNT_TYPE.CREDIT_CARD:
            // eslint-disable-next-line @typescript-eslint/no-deprecated
            return (0, Localize_1.translateLocal)('workspace.qbd.creditCardAccount');
        case CONST_1.default.QUICKBOOKS_DESKTOP_NON_REIMBURSABLE_EXPORT_ACCOUNT_TYPE.VENDOR_BILL:
            // eslint-disable-next-line @typescript-eslint/no-deprecated
            return (0, Localize_1.translateLocal)('workspace.qbd.accountsPayable');
        default:
            // eslint-disable-next-line @typescript-eslint/no-deprecated
            return (0, Localize_1.translateLocal)('workspace.qbd.account');
    }
}
