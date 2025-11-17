"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var PolicyUtils_1 = require("@libs/PolicyUtils");
var ONYXKEYS_1 = require("@src/ONYXKEYS");
var useCurrentUserPersonalDetails_1 = require("./useCurrentUserPersonalDetails");
var useOnyx_1 = require("./useOnyx");
/**
 * Custom hook to check if the current user is an admin of any paid policy
 */
function useIsPaidPolicyAdmin() {
    var currentUserPersonalDetails = (0, useCurrentUserPersonalDetails_1.default)();
    var isUserPaidPolicyAdminSelector = (0, react_1.useCallback)(function (policies) {
        return Object.values(policies !== null && policies !== void 0 ? policies : {}).some(function (policy) { return (0, PolicyUtils_1.isPaidGroupPolicy)(policy) && (0, PolicyUtils_1.isPolicyAdmin)(policy, currentUserPersonalDetails.login); });
    }, [currentUserPersonalDetails === null || currentUserPersonalDetails === void 0 ? void 0 : currentUserPersonalDetails.login]);
    var _a = (0, useOnyx_1.default)(ONYXKEYS_1.default.COLLECTION.POLICY, {
        canBeMissing: true,
        selector: isUserPaidPolicyAdminSelector,
    })[0], isCurrentUserPolicyAdmin = _a === void 0 ? false : _a;
    return isCurrentUserPolicyAdmin;
}
exports.default = useIsPaidPolicyAdmin;
