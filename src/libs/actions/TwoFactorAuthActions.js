"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clearTwoFactorAuthData = clearTwoFactorAuthData;
exports.quitAndNavigateBack = quitAndNavigateBack;
exports.setCodesAreCopied = setCodesAreCopied;
var react_native_1 = require("react-native");
var react_native_onyx_1 = require("react-native-onyx");
var Navigation_1 = require("@libs/Navigation/Navigation");
var ONYXKEYS_1 = require("@src/ONYXKEYS");
/**
 * Clear 2FA data if the flow is interrupted without finishing
 */
function clearTwoFactorAuthData(clearProgress) {
    if (clearProgress === void 0) { clearProgress = false; }
    var data = { recoveryCodes: null, twoFactorAuthSecretKey: null, codesAreCopied: false };
    if (clearProgress) {
        data.twoFactorAuthSetupInProgress = null;
    }
    react_native_onyx_1.default.merge(ONYXKEYS_1.default.ACCOUNT, data);
}
function setCodesAreCopied() {
    react_native_onyx_1.default.merge(ONYXKEYS_1.default.ACCOUNT, { codesAreCopied: true, twoFactorAuthSetupInProgress: true });
}
function quitAndNavigateBack(backTo) {
    Navigation_1.default.goBack(backTo);
    // eslint-disable-next-line @typescript-eslint/no-deprecated
    react_native_1.InteractionManager.runAfterInteractions(clearTwoFactorAuthData);
}
