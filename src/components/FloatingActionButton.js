"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_native_1 = require("react-native");
var react_native_reanimated_1 = require("react-native-reanimated");
var react_native_svg_1 = require("react-native-svg");
var useLocalize_1 = require("@hooks/useLocalize");
var useResponsiveLayout_1 = require("@hooks/useResponsiveLayout");
var useTheme_1 = require("@hooks/useTheme");
var useThemeStyles_1 = require("@hooks/useThemeStyles");
var DeviceCapabilities_1 = require("@libs/DeviceCapabilities");
var variables_1 = require("@styles/variables");
var CONST_1 = require("@src/CONST");
var Icon_1 = require("./Icon");
var Expensicons_1 = require("./Icon/Expensicons");
var Pressable_1 = require("./Pressable");
var Text_1 = require("./Text");
var FAB_PATH = 'M12,3c0-1.1-0.9-2-2-2C8.9,1,8,1.9,8,3v5H3c-1.1,0-2,0.9-2,2c0,1.1,0.9,2,2,2h5v5c0,1.1,0.9,2,2,2c1.1,0,2-0.9,2-2v-5h5c1.1,0,2-0.9,2-2c0-1.1-0.9-2-2-2h-5V3z';
var SMALL_FAB_PATH = 'M9.6 13.6002C9.6 14.4839 8.88366 15.2002 8 15.2002C7.11635 15.2002 6.4 14.4839 6.4 13.6002V9.6002H2.4C1.51635 9.6002 0.800003 8.88385 0.800003 8.0002C0.800003 7.11654 1.51635 6.4002 2.4 6.4002H6.4V2.4002C6.4 1.51654 7.11635 0.800196 8 0.800196C8.88366 0.800196 9.6 1.51654 9.6 2.4002V6.4002H13.6C14.4837 6.4002 15.2 7.11654 15.2 8.0002C15.2 8.88385 14.4837 9.6002 13.6 9.6002H9.6V13.6002Z';
var AnimatedPath = react_native_reanimated_1.default.createAnimatedComponent(react_native_svg_1.Path);
AnimatedPath.displayName = 'AnimatedPath';
function FloatingActionButton(_a) {
    var onPress = _a.onPress, onLongPress = _a.onLongPress, isActive = _a.isActive, accessibilityLabel = _a.accessibilityLabel, role = _a.role, ref = _a.ref;
    var _b = (0, useTheme_1.default)(), buttonDefaultBG = _b.buttonDefaultBG, buttonHoveredBG = _b.buttonHoveredBG, icon = _b.icon;
    var styles = (0, useThemeStyles_1.default)();
    var borderRadius = styles.floatingActionButton.borderRadius;
    var fabPressable = (0, react_1.useRef)(null);
    var shouldUseNarrowLayout = (0, useResponsiveLayout_1.default)().shouldUseNarrowLayout;
    var isLHBVisible = !shouldUseNarrowLayout;
    var translate = (0, useLocalize_1.default)().translate;
    var fabSize = isLHBVisible ? variables_1.default.iconSizeSmall : variables_1.default.iconSizeNormal;
    var sharedValue = (0, react_native_reanimated_1.useSharedValue)(isActive ? 1 : 0);
    var isHovered = (0, react_native_reanimated_1.useSharedValue)(false);
    var buttonRef = ref;
    (0, react_1.useEffect)(function () {
        sharedValue.set((0, react_native_reanimated_1.withTiming)(isActive ? 1 : 0, {
            duration: 340,
            easing: react_native_reanimated_1.Easing.inOut(react_native_reanimated_1.Easing.ease),
        }));
    }, [isActive, sharedValue]);
    var animatedStyle = (0, react_native_reanimated_1.useAnimatedStyle)(function () {
        var backgroundColor = isHovered.get() && !sharedValue.get() ? buttonHoveredBG : (0, react_native_reanimated_1.interpolateColor)(sharedValue.get(), [0, 1], [buttonDefaultBG, buttonHoveredBG]);
        return {
            transform: [{ rotate: "".concat(sharedValue.get() * 135, "deg") }],
            backgroundColor: backgroundColor,
        };
    });
    var toggleFabAction = function (event) {
        var _a;
        // Drop focus to avoid blue focus ring.
        (_a = fabPressable.current) === null || _a === void 0 ? void 0 : _a.blur();
        onPress(event);
    };
    var longPressFabAction = function (event) {
        var _a;
        // Only execute on narrow layout - prevent event from firing on wide screens
        if (isLHBVisible) {
            return;
        }
        // Drop focus to avoid blue focus ring.
        (_a = fabPressable.current) === null || _a === void 0 ? void 0 : _a.blur();
        onLongPress === null || onLongPress === void 0 ? void 0 : onLongPress(event);
    };
    if (isLHBVisible) {
        return (<Pressable_1.PressableWithoutFeedback ref={function (el) {
                fabPressable.current = el !== null && el !== void 0 ? el : null;
                if (buttonRef && 'current' in buttonRef) {
                    buttonRef.current = el !== null && el !== void 0 ? el : null;
                }
            }} style={[
                styles.navigationTabBarFABItem,
                // Prevent text selection on touch devices (e.g. on long press)
                (0, DeviceCapabilities_1.canUseTouchScreen)() && styles.userSelectNone,
                styles.flex1,
            ]} accessibilityLabel={accessibilityLabel} onPress={toggleFabAction} onLongPress={longPressFabAction} role={role} shouldUseHapticsOnLongPress testID="floating-action-button">
                {function (_a) {
                var hovered = _a.hovered;
                isHovered.set(hovered);
                return (<react_native_reanimated_1.default.View style={[styles.floatingActionButton, { borderRadius: borderRadius }, styles.floatingActionButtonSmall, animatedStyle]} testID="fab-animated-container">
                            <react_native_svg_1.default width={fabSize} height={fabSize}>
                                <AnimatedPath d={isLHBVisible ? SMALL_FAB_PATH : FAB_PATH} fill={icon}/>
                            </react_native_svg_1.default>
                        </react_native_reanimated_1.default.View>);
            }}
            </Pressable_1.PressableWithoutFeedback>);
    }
    return (<Pressable_1.PressableWithFeedback onPress={onPress} role={CONST_1.default.ROLE.BUTTON} accessibilityLabel={translate('common.create')} wrapperStyle={styles.flex1} style={[
            styles.navigationTabBarFABItem,
            // Prevent text selection on touch devices (e.g. on long press)
            (0, DeviceCapabilities_1.canUseTouchScreen)() && styles.userSelectNone,
            styles.flex1,
        ]} testID="create-action-button">
            <react_native_1.View testID="fab-container" style={styles.navigationTabBarItem}>
                <react_native_1.View>
                    <Icon_1.default src={Expensicons_1.PlusCircle} fill={icon} width={variables_1.default.iconBottomBar} height={variables_1.default.iconBottomBar}/>
                </react_native_1.View>
                <Text_1.default numberOfLines={1} style={[styles.textSmall, styles.textAlignCenter, styles.mt1Half, styles.textSupporting, styles.navigationTabBarLabel]}>
                    {translate('common.create')}
                </Text_1.default>
            </react_native_1.View>
        </Pressable_1.PressableWithFeedback>);
}
FloatingActionButton.displayName = 'FloatingActionButton';
exports.default = FloatingActionButton;
