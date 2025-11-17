"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * This file contains the logic for sending additional data to Sentry.
 *
 * It uses Onyx.connectWithoutView as nothing here is related to the UI. We only send data to the external provider and want to keep this outside of the render loop.
 */
var Sentry = require("@sentry/react-native");
var react_native_onyx_1 = require("react-native-onyx");
var PolicyUtils_1 = require("@libs/PolicyUtils");
var CONST_1 = require("@src/CONST");
var ONYXKEYS_1 = require("@src/ONYXKEYS");
/**
 * Connect to Onyx to retrieve information about the user's active policies.
 */
var session;
var activePolicyID;
var policies;
react_native_onyx_1.default.connectWithoutView({
    key: ONYXKEYS_1.default.NVP_ACTIVE_POLICY_ID,
    callback: function (value) {
        if (!value) {
            return;
        }
        activePolicyID = value;
        sendPoliciesContext();
    },
});
react_native_onyx_1.default.connectWithoutView({
    key: ONYXKEYS_1.default.SESSION,
    callback: function (value) {
        if (!(value === null || value === void 0 ? void 0 : value.email)) {
            return;
        }
        session = value;
        sendPoliciesContext();
    },
});
react_native_onyx_1.default.connectWithoutView({
    key: ONYXKEYS_1.default.COLLECTION.POLICY,
    waitForCollectionCallback: true,
    callback: function (value) {
        if (!value) {
            return;
        }
        policies = value;
        sendPoliciesContext();
    },
});
function sendPoliciesContext() {
    if (!policies || !(session === null || session === void 0 ? void 0 : session.email) || !activePolicyID) {
        return;
    }
    var activePolicies = (0, PolicyUtils_1.getActivePolicies)(policies, session.email).map(function (policy) { return policy.id; });
    Sentry.setTag(CONST_1.default.TELEMETRY.TAG_ACTIVE_POLICY, activePolicyID);
    Sentry.setContext(CONST_1.default.TELEMETRY.CONTEXT_POLICIES, { activePolicyID: activePolicyID, activePolicies: activePolicies });
}
