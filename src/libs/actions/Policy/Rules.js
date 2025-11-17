"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.openPolicyRulesPage = openPolicyRulesPage;
var API = require("@libs/API");
var types_1 = require("@libs/API/types");
var Log_1 = require("@libs/Log");
/**
 * Fetches policy rules data when the rules page is opened.
 * @param policyID - The ID of the policy to fetch rules for
 */
function openPolicyRulesPage(policyID) {
    if (!policyID) {
        Log_1.default.warn('Invalid params for openPolicyRulesPage', { policyID: policyID });
        return;
    }
    var params = { policyID: policyID };
    API.read(types_1.READ_COMMANDS.OPEN_POLICY_RULES_PAGE, params);
}
