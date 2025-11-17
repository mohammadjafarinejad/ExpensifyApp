"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var expensify_common_1 = require("expensify-common");
var ONYXKEYS_1 = require("@src/ONYXKEYS");
var useOnyx_1 = require("./useOnyx");
/**
 * Hook to get the preferred policy settings from the user's domain security group
 */
function usePreferredPolicy() {
    var myDomainSecurityGroups = (0, useOnyx_1.default)(ONYXKEYS_1.default.MY_DOMAIN_SECURITY_GROUPS, { canBeMissing: true })[0];
    var securityGroups = (0, useOnyx_1.default)(ONYXKEYS_1.default.COLLECTION.SECURITY_GROUP, { canBeMissing: true })[0];
    var session = (0, useOnyx_1.default)(ONYXKEYS_1.default.SESSION, { canBeMissing: true })[0];
    // Get the user's domain from their email
    var userDomain = (session === null || session === void 0 ? void 0 : session.email) ? expensify_common_1.Str.extractEmailDomain(session.email) : undefined;
    // Get the security group ID for the user's domain
    var securityGroupID = userDomain && (myDomainSecurityGroups === null || myDomainSecurityGroups === void 0 ? void 0 : myDomainSecurityGroups[userDomain]);
    // Get the security group details
    var securityGroupKey = "".concat(ONYXKEYS_1.default.COLLECTION.SECURITY_GROUP).concat(securityGroupID);
    var securityGroup = securityGroupID ? securityGroups === null || securityGroups === void 0 ? void 0 : securityGroups[securityGroupKey] : null;
    // Only restrict if both enableRestrictedPrimaryPolicy is true AND we have a valid policy ID
    var restrictedPolicyID = securityGroup === null || securityGroup === void 0 ? void 0 : securityGroup.restrictedPrimaryPolicyID;
    var hasValidPolicyID = !!restrictedPolicyID && typeof restrictedPolicyID === 'string' && restrictedPolicyID.trim() !== '';
    var isRestrictionEnabled = (securityGroup === null || securityGroup === void 0 ? void 0 : securityGroup.enableRestrictedPrimaryPolicy) === true;
    return {
        isRestrictedToPreferredPolicy: isRestrictionEnabled && hasValidPolicyID,
        preferredPolicyID: restrictedPolicyID,
        isRestrictedPolicyCreation: (securityGroup === null || securityGroup === void 0 ? void 0 : securityGroup.enableRestrictedPolicyCreation) === true,
    };
}
exports.default = usePreferredPolicy;
