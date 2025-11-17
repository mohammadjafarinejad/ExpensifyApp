"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var expensify_common_1 = require("expensify-common");
var react_native_onyx_1 = require("react-native-onyx");
var ONYXKEYS_1 = require("@src/ONYXKEYS");
var GroupIBSdkBridge_1 = require("./GroupIBSdkBridge");
var sessionID;
var identity;
// We use `connectWithoutView` here since this connection only sends the new session data to the Fraud Protection backend, and doesn't need to trigger component re-renders.
react_native_onyx_1.default.connectWithoutView({
    key: ONYXKEYS_1.default.SESSION,
    callback: function (session) {
        var _a, _b, _c;
        var isAuthenticated = !!((_a = session === null || session === void 0 ? void 0 : session.authToken) !== null && _a !== void 0 ? _a : null);
        var newIdentity = isAuthenticated ? ((_c = (_b = session === null || session === void 0 ? void 0 : session.accountID) === null || _b === void 0 ? void 0 : _b.toString()) !== null && _c !== void 0 ? _c : '') : '';
        if (newIdentity !== identity) {
            identity = newIdentity;
            sessionID = typeof identity === 'string' && identity.length > 0 ? expensify_common_1.Str.guid() : '';
            (0, GroupIBSdkBridge_1.setAuthenticationData)(identity, sessionID);
        }
    },
});
// We use `connectWithoutView` here since this connection only sends the new email and mfa data to the Fraud Protection backend, and doesn't need to trigger component re-renders.
react_native_onyx_1.default.connectWithoutView({
    key: ONYXKEYS_1.default.ACCOUNT,
    callback: function (account) {
        var _a;
        (0, GroupIBSdkBridge_1.setAttribute)('email', (_a = account === null || account === void 0 ? void 0 : account.primaryLogin) !== null && _a !== void 0 ? _a : '', false, true);
        (0, GroupIBSdkBridge_1.setAttribute)('mfa', (account === null || account === void 0 ? void 0 : account.requiresTwoFactorAuth) ? '2fa_enabled' : '2fa_disabled', false, true);
        (0, GroupIBSdkBridge_1.setAttribute)('is_validated', (account === null || account === void 0 ? void 0 : account.validated) ? 'true' : 'false', false, true);
    },
});
exports.default = { init: GroupIBSdkBridge_1.init, sendEvent: GroupIBSdkBridge_1.sendEvent, setAttribute: GroupIBSdkBridge_1.setAttribute };
