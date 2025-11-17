"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ownerPoliciesSelector = exports.createAllPolicyReportFieldsSelector = exports.createPoliciesSelector = exports.activePolicySelector = void 0;
var PolicyUtils_1 = require("@libs/PolicyUtils");
var CONST_1 = require("@src/CONST");
var mapOnyxCollectionItems_1 = require("@src/utils/mapOnyxCollectionItems");
var createPoliciesSelector = function (policies, policySelector) { return (0, mapOnyxCollectionItems_1.default)(policies, policySelector); };
exports.createPoliciesSelector = createPoliciesSelector;
var activePolicySelector = function (policy) { return ((policy === null || policy === void 0 ? void 0 : policy.type) !== CONST_1.default.POLICY.TYPE.PERSONAL ? policy : undefined); };
exports.activePolicySelector = activePolicySelector;
var ownerPoliciesSelector = function (policies, currentUserAccountID) { return (0, PolicyUtils_1.getOwnedPaidPolicies)(policies, currentUserAccountID); };
exports.ownerPoliciesSelector = ownerPoliciesSelector;
/**
 * Creates a selector that aggregates all non-formula policy report fields from all policies,
 * sorted alphabetically by field key using the provided locale compare function
 */
var createAllPolicyReportFieldsSelector = function (policies, localeCompare) {
    var allPolicyReportFields = Object.values(policies !== null && policies !== void 0 ? policies : {}).reduce(function (acc, policy) {
        var _a;
        Object.assign(acc, (_a = policy === null || policy === void 0 ? void 0 : policy.fieldList) !== null && _a !== void 0 ? _a : {});
        return acc;
    }, {});
    var nonFormulaReportFields = Object.entries(allPolicyReportFields)
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        .filter(function (_a) {
        var _ = _a[0], value = _a[1];
        return value.type !== CONST_1.default.POLICY.DEFAULT_FIELD_LIST_TYPE;
    })
        .sort(function (_a, _b) {
        var aKey = _a[0];
        var bKey = _b[0];
        return localeCompare(aKey, bKey);
    });
    return Object.fromEntries(nonFormulaReportFields);
};
exports.createAllPolicyReportFieldsSelector = createAllPolicyReportFieldsSelector;
