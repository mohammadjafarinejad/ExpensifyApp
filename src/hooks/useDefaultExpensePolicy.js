"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = useDefaultExpensePolicy;
var PolicyUtils_1 = require("@libs/PolicyUtils");
var ONYXKEYS_1 = require("@src/ONYXKEYS");
var useOnyx_1 = require("./useOnyx");
function useDefaultExpensePolicy() {
    var activePolicyID = (0, useOnyx_1.default)(ONYXKEYS_1.default.NVP_ACTIVE_POLICY_ID, { canBeMissing: true })[0];
    var activePolicy = (0, useOnyx_1.default)("".concat(ONYXKEYS_1.default.COLLECTION.POLICY).concat(activePolicyID), { canBeMissing: true })[0];
    var allPolicies = (0, useOnyx_1.default)(ONYXKEYS_1.default.COLLECTION.POLICY, { canBeMissing: true })[0];
    if ((0, PolicyUtils_1.isPaidGroupPolicy)(activePolicy)) {
        return activePolicy;
    }
    // If there is exactly one group policy, use that as the default expense policy
    var groupPolicies = Object.values(allPolicies !== null && allPolicies !== void 0 ? allPolicies : {}).filter(PolicyUtils_1.isPaidGroupPolicy);
    if (groupPolicies.length === 1) {
        return groupPolicies.at(0);
    }
    return null;
}
