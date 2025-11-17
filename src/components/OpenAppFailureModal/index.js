"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var BaseOpenAppFailureModal_1 = require("./BaseOpenAppFailureModal");
/** Reloads the app to trigger OpenApp reconnection */
var reloadApp = function () {
    window.location.reload();
};
function OpenAppFailureModal() {
    return <BaseOpenAppFailureModal_1.default onRefreshAndTryAgainButtonPress={reloadApp}/>;
}
OpenAppFailureModal.displayName = 'OpenAppFailureModal';
exports.default = OpenAppFailureModal;
