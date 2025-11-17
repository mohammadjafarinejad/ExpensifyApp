"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var Expensicons_1 = require("@components/Icon/Expensicons");
var BaseFloatingCameraButton_1 = require("./BaseFloatingCameraButton");
function FloatingCameraButton() {
    return <BaseFloatingCameraButton_1.default icon={Expensicons_1.Camera}/>;
}
FloatingCameraButton.displayName = 'FloatingCameraButton';
exports.default = FloatingCameraButton;
