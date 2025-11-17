"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_native_1 = require("react-native");
var App_1 = require("@libs/actions/App");
var isOpenAppFailureModalOpen_1 = require("@libs/actions/isOpenAppFailureModalOpen");
var BaseOpenAppFailureModal_1 = require("./BaseOpenAppFailureModal");
/** Triggers OpenApp reconnection */
var retryOpenApp = function () {
    (0, isOpenAppFailureModalOpen_1.setIsOpenAppFailureModalOpen)(false);
    (0, App_1.openApp)();
};
function OpenAppFailureModal() {
    (0, react_1.useEffect)(function () {
        // Close OpenAppFailureModal if app goes inactive
        var appStateSubscription = react_native_1.AppState.addEventListener('change', function (nextAppState) {
            if (!nextAppState.match(/inactive|background/)) {
                return;
            }
            (0, isOpenAppFailureModalOpen_1.setIsOpenAppFailureModalOpen)(false);
        });
        return function () {
            appStateSubscription.remove();
        };
    }, []);
    return <BaseOpenAppFailureModal_1.default onRefreshAndTryAgainButtonPress={retryOpenApp}/>;
}
OpenAppFailureModal.displayName = 'OpenAppFailureModal';
exports.default = OpenAppFailureModal;
