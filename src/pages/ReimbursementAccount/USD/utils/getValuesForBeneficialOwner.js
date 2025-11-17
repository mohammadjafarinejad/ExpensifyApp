"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CONST_1 = require("@src/CONST");
var SafeString_1 = require("@src/utils/SafeString");
function getValuesForBeneficialOwner(beneficialOwnerBeingModifiedID, reimbursementAccountDraft) {
    if (!reimbursementAccountDraft) {
        return {
            firstName: '',
            lastName: '',
            dob: '',
            ssnLast4: '',
            street: '',
            city: '',
            state: '',
            zipCode: '',
        };
    }
    var beneficialOwnerPrefix = CONST_1.default.BANK_ACCOUNT.BENEFICIAL_OWNER_INFO_STEP.BENEFICIAL_OWNER_DATA.PREFIX;
    var beneficialOwnerInfoKey = CONST_1.default.BANK_ACCOUNT.BENEFICIAL_OWNER_INFO_STEP.BENEFICIAL_OWNER_DATA;
    var INPUT_KEYS = {
        firstName: "".concat(beneficialOwnerPrefix, "_").concat(beneficialOwnerBeingModifiedID, "_").concat(beneficialOwnerInfoKey.FIRST_NAME),
        lastName: "".concat(beneficialOwnerPrefix, "_").concat(beneficialOwnerBeingModifiedID, "_").concat(beneficialOwnerInfoKey.LAST_NAME),
        dob: "".concat(beneficialOwnerPrefix, "_").concat(beneficialOwnerBeingModifiedID, "_").concat(beneficialOwnerInfoKey.DOB),
        ssnLast4: "".concat(beneficialOwnerPrefix, "_").concat(beneficialOwnerBeingModifiedID, "_").concat(beneficialOwnerInfoKey.SSN_LAST_4),
        street: "".concat(beneficialOwnerPrefix, "_").concat(beneficialOwnerBeingModifiedID, "_").concat(beneficialOwnerInfoKey.STREET),
        city: "".concat(beneficialOwnerPrefix, "_").concat(beneficialOwnerBeingModifiedID, "_").concat(beneficialOwnerInfoKey.CITY),
        state: "".concat(beneficialOwnerPrefix, "_").concat(beneficialOwnerBeingModifiedID, "_").concat(beneficialOwnerInfoKey.STATE),
        zipCode: "".concat(beneficialOwnerPrefix, "_").concat(beneficialOwnerBeingModifiedID, "_").concat(beneficialOwnerInfoKey.ZIP_CODE),
    };
    return {
        firstName: (0, SafeString_1.default)(reimbursementAccountDraft[INPUT_KEYS.firstName]),
        lastName: (0, SafeString_1.default)(reimbursementAccountDraft[INPUT_KEYS.lastName]),
        dob: (0, SafeString_1.default)(reimbursementAccountDraft[INPUT_KEYS.dob]),
        ssnLast4: (0, SafeString_1.default)(reimbursementAccountDraft[INPUT_KEYS.ssnLast4]),
        street: (0, SafeString_1.default)(reimbursementAccountDraft[INPUT_KEYS.street]),
        city: (0, SafeString_1.default)(reimbursementAccountDraft[INPUT_KEYS.city]),
        state: (0, SafeString_1.default)(reimbursementAccountDraft[INPUT_KEYS.state]),
        zipCode: (0, SafeString_1.default)(reimbursementAccountDraft[INPUT_KEYS.zipCode]),
    };
}
exports.default = getValuesForBeneficialOwner;
