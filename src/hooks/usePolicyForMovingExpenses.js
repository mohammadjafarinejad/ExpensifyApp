"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Policy_1 = require("@selectors/Policy");
var OnyxListItemProvider_1 = require("@components/OnyxListItemProvider");
var PolicyUtils_1 = require("@libs/PolicyUtils");
var CONST_1 = require("@src/CONST");
var ONYXKEYS_1 = require("@src/ONYXKEYS");
var EmptyObject_1 = require("@src/types/utils/EmptyObject");
var useOnyx_1 = require("./useOnyx");
// TODO: temporary util - if we don't have employeeList object we don't check for the pending delete
function checkForUserPendingDelete(login, policy) {
    if ((0, EmptyObject_1.isEmptyObject)(policy === null || policy === void 0 ? void 0 : policy.employeeList)) {
        return true;
    }
    return (0, PolicyUtils_1.isPolicyMemberWithoutPendingDelete)(login, policy);
}
function isPolicyMemberByRole(policy) {
    return !!(policy === null || policy === void 0 ? void 0 : policy.role) && Object.values(CONST_1.default.POLICY.ROLE).includes(policy.role);
}
function usePolicyForMovingExpenses(isPerDiemRequest) {
    var _a, _b;
    var allPolicies = (0, useOnyx_1.default)(ONYXKEYS_1.default.COLLECTION.POLICY, { canBeMissing: true })[0];
    var activePolicyID = (0, useOnyx_1.default)(ONYXKEYS_1.default.NVP_ACTIVE_POLICY_ID, { canBeMissing: true })[0];
    var activePolicy = (0, useOnyx_1.default)("".concat(ONYXKEYS_1.default.COLLECTION.POLICY).concat(activePolicyID), {
        canBeMissing: true,
        selector: Policy_1.activePolicySelector,
    })[0];
    var session = (0, OnyxListItemProvider_1.useSession)();
    var login = (_a = session === null || session === void 0 ? void 0 : session.email) !== null && _a !== void 0 ? _a : '';
    var userPolicies = Object.values(allPolicies !== null && allPolicies !== void 0 ? allPolicies : {}).filter(function (policy) {
        return checkForUserPendingDelete(login, policy) &&
            isPolicyMemberByRole(policy) &&
            (0, PolicyUtils_1.isPaidGroupPolicy)(policy) &&
            (policy === null || policy === void 0 ? void 0 : policy.pendingAction) !== CONST_1.default.RED_BRICK_ROAD_PENDING_ACTION.DELETE &&
            (!isPerDiemRequest || (0, PolicyUtils_1.canSubmitPerDiemExpenseFromWorkspace)(policy));
    });
    var isMemberOfMoreThanOnePolicy = userPolicies.length > 1;
    if (activePolicy && (!isPerDiemRequest || (0, PolicyUtils_1.canSubmitPerDiemExpenseFromWorkspace)(activePolicy))) {
        return { policyForMovingExpensesID: activePolicyID, policyForMovingExpenses: activePolicy, shouldSelectPolicy: false };
    }
    if (userPolicies.length === 1) {
        return { policyForMovingExpensesID: (_b = userPolicies.at(0)) === null || _b === void 0 ? void 0 : _b.id, policyForMovingExpenses: userPolicies.at(0), shouldSelectPolicy: false };
    }
    if (isMemberOfMoreThanOnePolicy) {
        return { policyForMovingExpensesID: undefined, policyForMovingExpenses: undefined, shouldSelectPolicy: true };
    }
    return { policyForMovingExpensesID: undefined, policyForMovingExpenses: undefined, shouldSelectPolicy: false };
}
exports.default = usePolicyForMovingExpenses;
