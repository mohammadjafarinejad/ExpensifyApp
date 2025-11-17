"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_native_1 = require("react-native");
var useTheme_1 = require("@hooks/useTheme");
var useThemeStyles_1 = require("@hooks/useThemeStyles");
var DeviceCapabilities_1 = require("@libs/DeviceCapabilities");
var variables_1 = require("@styles/variables");
var Icon_1 = require("./Icon");
var Expensicons_1 = require("./Icon/Expensicons");
var Pressable_1 = require("./Pressable");
function FloatingReceiptButton(_a) {
    var onPress = _a.onPress, accessibilityLabel = _a.accessibilityLabel, role = _a.role;
    var _b = (0, useTheme_1.default)(), successHover = _b.successHover, textLight = _b.textLight;
    var styles = (0, useThemeStyles_1.default)();
    var borderRadius = styles.floatingActionButton.borderRadius;
    var fabPressable = (0, react_1.useRef)(null);
    var toggleFabAction = function (event) {
        var _a;
        // Drop focus to avoid blue focus ring.
        (_a = fabPressable.current) === null || _a === void 0 ? void 0 : _a.blur();
        onPress(event);
    };
    return (<Pressable_1.PressableWithoutFeedback ref={function (el) {
            fabPressable.current = el !== null && el !== void 0 ? el : null;
        }} style={[
            styles.navigationTabBarFABItem,
            // Prevent text selection on touch devices (e.g. on long press)
            (0, DeviceCapabilities_1.canUseTouchScreen)() && styles.userSelectNone,
        ]} accessibilityLabel={accessibilityLabel} onPress={toggleFabAction} role={role} shouldUseHapticsOnLongPress testID="floating-receipt-button">
            {function (_a) {
            var hovered = _a.hovered;
            return (<react_native_1.View style={[styles.floatingActionButton, { borderRadius: borderRadius }, styles.floatingActionButtonSmall, hovered && { backgroundColor: successHover }]} testID="floating-receipt-button-container">
                    <Icon_1.default fill={textLight} src={Expensicons_1.ReceiptPlus} width={variables_1.default.iconSizeSmall} height={variables_1.default.iconSizeSmall}/>
                </react_native_1.View>);
        }}
        </Pressable_1.PressableWithoutFeedback>);
}
FloatingReceiptButton.displayName = 'FloatingReceiptButton';
exports.default = FloatingReceiptButton;
