"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var Expensicons_1 = require("@components/Icon/Expensicons");
var getPlatform_1 = require("@libs/getPlatform");
var CONST_1 = require("@src/CONST");
var BaseFloatingCameraButton_1 = require("./BaseFloatingCameraButton");
function FloatingCameraButton() {
    var platform = (0, getPlatform_1.default)(true);
    var icon = platform === CONST_1.default.PLATFORM.MOBILE_WEB ? Expensicons_1.Camera : Expensicons_1.ReceiptPlus;
    return <BaseFloatingCameraButton_1.default icon={icon}/>;
}
FloatingCameraButton.displayName = 'FloatingCameraButton';
exports.default = FloatingCameraButton;
