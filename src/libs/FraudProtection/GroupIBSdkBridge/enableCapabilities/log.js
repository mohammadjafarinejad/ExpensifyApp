"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Log_1 = require("@libs/Log");
function logCapability(capabilityName, e, isRun) {
    if (e !== null && e !== undefined && e !== '') {
        Log_1.default.warn("[Fraud Protection] ".concat(capabilityName, " capability error: ").concat(e));
        return;
    }
    Log_1.default.info("[Fraud Protection] ".concat(capabilityName, " capability status: ").concat(isRun ? 'Enabled' : 'Disabled'));
}
exports.default = logCapability;
