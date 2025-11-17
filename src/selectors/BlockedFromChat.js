"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isBlockedFromChatSelector = void 0;
var Log_1 = require("@libs/Log");
var CONST_1 = require("@src/CONST");
var ONYXKEYS_1 = require("@src/ONYXKEYS");
var isBlockedFromChatSelector = function (dateString) {
    if (!dateString) {
        return false;
    }
    try {
        return new Date(dateString) >= new Date();
    }
    catch (error) {
        // If the NVP is malformed, we'll assume the user is not blocked from chat. This is not expected, so if it happens we'll log an alert.
        Log_1.default.alert("[".concat(CONST_1.default.ERROR.ENSURE_BUG_BOT, "] Found malformed ").concat(ONYXKEYS_1.default.NVP_BLOCKED_FROM_CHAT, " nvp"), dateString);
        return false;
    }
};
exports.isBlockedFromChatSelector = isBlockedFromChatSelector;
