"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Policy_1 = require("@selectors/Policy");
var react_1 = require("react");
var CONST_1 = require("@src/CONST");
var ONYXKEYS_1 = require("@src/ONYXKEYS");
var useOnyx_1 = require("./useOnyx");
var policySelector = function (policy) {
    return (policy && {
        id: policy.id,
        type: policy.type,
        autoReporting: policy.autoReporting,
    });
};
var allPoliciesSelector = function (policies) { return (0, Policy_1.createPoliciesSelector)(policies, policySelector); };
function usePersonalPolicy() {
    var allPolicies = (0, useOnyx_1.default)(ONYXKEYS_1.default.COLLECTION.POLICY, { selector: allPoliciesSelector, canBeMissing: true })[0];
    var personalPolicy = (0, react_1.useMemo)(function () { return Object.values(allPolicies !== null && allPolicies !== void 0 ? allPolicies : {}).find(function (policy) { return (policy === null || policy === void 0 ? void 0 : policy.type) === CONST_1.default.POLICY.TYPE.PERSONAL; }); }, [allPolicies]);
    return personalPolicy;
}
exports.default = usePersonalPolicy;
