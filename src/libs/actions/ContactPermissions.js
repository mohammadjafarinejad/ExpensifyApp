"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setHasDeniedContactImportPrompt = setHasDeniedContactImportPrompt;
var react_native_onyx_1 = require("react-native-onyx");
var ONYXKEYS_1 = require("@src/ONYXKEYS");
/**
 * Updates whether the user has denied the contact import prompt.
 * This is used to prevent showing the prompt again after the user has explicitly denied it.
 */
function setHasDeniedContactImportPrompt(value) {
    react_native_onyx_1.default.set(ONYXKEYS_1.default.HAS_DENIED_CONTACT_IMPORT_PROMPT, value);
}
