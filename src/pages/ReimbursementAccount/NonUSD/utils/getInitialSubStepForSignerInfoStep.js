"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CONST_1 = require("@src/CONST");
var SUBSTEP = CONST_1.default.NON_USD_BANK_ACCOUNT.SIGNER_INFO_STEP.SUBSTEP;
function getInitialSubStepForSignerInfoStep(signerEmail, signerName, secondSignerEmail, policyCurrency) {
    if (policyCurrency === CONST_1.default.CURRENCY.AUD) {
        if (signerEmail === undefined && secondSignerEmail === undefined) {
            return SUBSTEP.IS_DIRECTOR;
        }
        return SUBSTEP.HANG_TIGHT;
    }
    if (signerEmail === undefined || signerName !== undefined) {
        return SUBSTEP.IS_DIRECTOR;
    }
    return SUBSTEP.HANG_TIGHT;
}
exports.default = getInitialSubStepForSignerInfoStep;
