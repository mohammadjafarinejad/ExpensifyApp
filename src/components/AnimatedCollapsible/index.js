"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_native_1 = require("react-native");
var react_native_reanimated_1 = require("react-native-reanimated");
var Icon_1 = require("@components/Icon");
var Expensicons = require("@components/Icon/Expensicons");
var utils_1 = require("@components/Modal/ReanimatedModal/utils");
var Pressable_1 = require("@components/Pressable");
var useTheme_1 = require("@hooks/useTheme");
var useThemeStyles_1 = require("@hooks/useThemeStyles");
var CONST_1 = require("@src/CONST");
function AnimatedCollapsible(_a) {
    var isExpanded = _a.isExpanded, children = _a.children, header = _a.header, _b = _a.duration, duration = _b === void 0 ? 300 : _b, style = _a.style, headerStyle = _a.headerStyle, contentStyle = _a.contentStyle, expandButtonStyle = _a.expandButtonStyle, onPress = _a.onPress, _c = _a.disabled, disabled = _c === void 0 ? false : _c, _d = _a.shouldShowToggleButton, shouldShowToggleButton = _d === void 0 ? true : _d, borderBottomStyle = _a.borderBottomStyle;
    var theme = (0, useTheme_1.default)();
    var styles = (0, useThemeStyles_1.default)();
    var contentHeight = (0, react_native_reanimated_1.useSharedValue)(0);
    var hasExpanded = (0, react_native_reanimated_1.useSharedValue)(isExpanded);
    var _e = react_1.default.useState(isExpanded), isRendered = _e[0], setIsRendered = _e[1];
    (0, react_1.useEffect)(function () {
        hasExpanded.set(isExpanded);
        if (isExpanded) {
            setIsRendered(true);
        }
    }, [isExpanded, hasExpanded]);
    var animatedHeight = (0, react_native_reanimated_1.useDerivedValue)(function () {
        if (!contentHeight.get()) {
            return 0;
        }
        var target = hasExpanded.get() ? contentHeight.get() : 0;
        return (0, react_native_reanimated_1.withTiming)(target, { duration: duration, easing: utils_1.easing }, function (finished) {
            if (!finished || target) {
                return;
            }
            (0, react_native_reanimated_1.runOnJS)(setIsRendered)(false);
        });
    }, []);
    var animatedOpacity = (0, react_native_reanimated_1.useDerivedValue)(function () {
        if (!contentHeight.get()) {
            return 0;
        }
        return (0, react_native_reanimated_1.withTiming)(hasExpanded.get() ? 1 : 0, { duration: duration, easing: utils_1.easing });
    });
    var contentAnimatedStyle = (0, react_native_reanimated_1.useAnimatedStyle)(function () {
        return {
            height: animatedHeight.get(),
            opacity: animatedOpacity.get(),
        };
    });
    return (<react_native_1.View style={style}>
            <react_native_1.View style={[headerStyle, styles.flexRow, styles.alignItemsCenter]}>
                <react_native_1.View style={[styles.flex1]}>{header}</react_native_1.View>
                {shouldShowToggleButton && (<Pressable_1.PressableWithFeedback onPress={onPress} disabled={disabled} style={[styles.p3Half, styles.justifyContentCenter, styles.alignItemsCenter, expandButtonStyle]} accessibilityRole={CONST_1.default.ROLE.BUTTON} accessibilityLabel={isExpanded ? CONST_1.default.ACCESSIBILITY_LABELS.COLLAPSE : CONST_1.default.ACCESSIBILITY_LABELS.EXPAND}>
                        {function (_a) {
                var hovered = _a.hovered;
                return (<Icon_1.default src={isExpanded ? Expensicons.UpArrow : Expensicons.DownArrow} fill={theme.icon} additionalStyles={!hovered && styles.opacitySemiTransparent} small/>);
            }}
                    </Pressable_1.PressableWithFeedback>)}
            </react_native_1.View>
            <react_native_reanimated_1.default.View style={[contentAnimatedStyle, contentStyle]}>
                {isExpanded || isRendered ? (<react_native_reanimated_1.default.View testID={CONST_1.default.ANIMATED_COLLAPSIBLE_CONTENT_TEST_ID} style={styles.stickToTop} onLayout={function (e) {
                var height = e.nativeEvent.layout.height;
                if (height) {
                    contentHeight.set(height);
                }
            }}>
                        <react_native_1.View style={[styles.pv2, styles.ph3, styles.pb1]}>
                            <react_native_1.View style={[styles.borderBottom, borderBottomStyle]}/>
                        </react_native_1.View>
                        {children}
                    </react_native_reanimated_1.default.View>) : null}
            </react_native_reanimated_1.default.View>
        </react_native_1.View>);
}
AnimatedCollapsible.displayName = 'AnimatedCollapsible';
exports.default = AnimatedCollapsible;
