"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setIsOpenAppFailureModalOpen = setIsOpenAppFailureModalOpen;
var react_native_onyx_1 = require("react-native-onyx");
var ONYXKEYS_1 = require("@src/ONYXKEYS");
function setIsOpenAppFailureModalOpen(isOpen) {
    react_native_onyx_1.default.merge(ONYXKEYS_1.default.IS_OPEN_APP_FAILURE_MODAL_OPEN, isOpen);
}
