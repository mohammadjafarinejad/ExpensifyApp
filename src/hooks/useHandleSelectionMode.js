"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var native_1 = require("@react-navigation/native");
var react_1 = require("react");
var MobileSelectionMode_1 = require("@libs/actions/MobileSelectionMode");
var useMobileSelectionMode_1 = require("./useMobileSelectionMode");
var useResponsiveLayout_1 = require("./useResponsiveLayout");
function useHandleSelectionMode(selectedItems) {
    // eslint-disable-next-line rulesdir/prefer-shouldUseNarrowLayout-instead-of-isSmallScreenWidth
    var isSmallScreenWidth = (0, useResponsiveLayout_1.default)().isSmallScreenWidth;
    var isFocused = (0, native_1.useIsFocused)();
    var isMobileSelectionModeEnabled = (0, useMobileSelectionMode_1.default)();
    // Check if selection should be on when the modal is opened
    var wasSelectionOnRef = (0, react_1.useRef)(false);
    (0, react_1.useEffect)(function () {
        if (!isSmallScreenWidth) {
            if (selectedItems.length === 0 && isMobileSelectionModeEnabled) {
                (0, MobileSelectionMode_1.turnOffMobileSelectionMode)();
            }
            return;
        }
        if (!isFocused) {
            return;
        }
        if (!wasSelectionOnRef.current && selectedItems.length > 0) {
            wasSelectionOnRef.current = true;
        }
        if (selectedItems.length > 0 && !isMobileSelectionModeEnabled) {
            (0, MobileSelectionMode_1.turnOnMobileSelectionMode)();
        }
        else if (selectedItems.length === 0 && isMobileSelectionModeEnabled && !wasSelectionOnRef.current) {
            (0, MobileSelectionMode_1.turnOffMobileSelectionMode)();
        }
    }, [isMobileSelectionModeEnabled, isSmallScreenWidth, isFocused, selectedItems.length]);
    (0, react_1.useEffect)(function () { return function () { return (0, MobileSelectionMode_1.turnOffMobileSelectionMode)(); }; }, []);
}
exports.default = useHandleSelectionMode;
