"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var native_1 = require("@react-navigation/native");
var react_1 = require("react");
var react_native_1 = require("react-native");
var ActivityIndicator_1 = require("@components/ActivityIndicator");
var Icon_1 = require("@components/Icon");
var Expensicons = require("@components/Icon/Expensicons");
var PressableWithFeedback_1 = require("@components/Pressable/PressableWithFeedback");
var Text_1 = require("@components/Text");
var withNavigationFallback_1 = require("@components/withNavigationFallback");
var useActiveElementRole_1 = require("@hooks/useActiveElementRole");
var useKeyboardShortcut_1 = require("@hooks/useKeyboardShortcut");
var useStyleUtils_1 = require("@hooks/useStyleUtils");
var useTheme_1 = require("@hooks/useTheme");
var useThemeStyles_1 = require("@hooks/useThemeStyles");
var HapticFeedback_1 = require("@libs/HapticFeedback");
var CONST_1 = require("@src/CONST");
var utils_1 = require("./utils");
var validateSubmitShortcut_1 = require("./validateSubmitShortcut");
var accessibilityRoles = Object.values(CONST_1.default.ROLE);
function KeyboardShortcutComponent(_a) {
    var _b = _a.isDisabled, isDisabled = _b === void 0 ? false : _b, _c = _a.isLoading, isLoading = _c === void 0 ? false : _c, _d = _a.onPress, onPress = _d === void 0 ? function () { } : _d, pressOnEnter = _a.pressOnEnter, allowBubble = _a.allowBubble, enterKeyEventListenerPriority = _a.enterKeyEventListenerPriority, _e = _a.isPressOnEnterActive, isPressOnEnterActive = _e === void 0 ? false : _e;
    var isFocused = (0, native_1.useIsFocused)();
    var activeElementRole = (0, useActiveElementRole_1.default)();
    var shouldDisableEnterShortcut = (0, react_1.useMemo)(function () { return accessibilityRoles.includes(activeElementRole !== null && activeElementRole !== void 0 ? activeElementRole : '') && activeElementRole !== CONST_1.default.ROLE.PRESENTATION; }, [activeElementRole]);
    var keyboardShortcutCallback = (0, react_1.useCallback)(function (event) {
        if (!(0, validateSubmitShortcut_1.default)(isDisabled, isLoading, event)) {
            return;
        }
        onPress();
    }, [isDisabled, isLoading, onPress]);
    var config = (0, react_1.useMemo)(function () { return ({
        isActive: pressOnEnter && !shouldDisableEnterShortcut && (isFocused || isPressOnEnterActive),
        shouldBubble: allowBubble,
        priority: enterKeyEventListenerPriority,
        shouldPreventDefault: false,
    }); }, 
    // eslint-disable-next-line react-compiler/react-compiler, react-hooks/exhaustive-deps
    [shouldDisableEnterShortcut, isFocused]);
    (0, useKeyboardShortcut_1.default)(CONST_1.default.KEYBOARD_SHORTCUTS.ENTER, keyboardShortcutCallback, config);
    return null;
}
KeyboardShortcutComponent.displayName = 'KeyboardShortcutComponent';
function Button(_a) {
    var _b = _a.allowBubble, allowBubble = _b === void 0 ? false : _b, _c = _a.iconRight, iconRight = _c === void 0 ? Expensicons.ArrowRight : _c, iconFill = _a.iconFill, iconHoverFill = _a.iconHoverFill, _d = _a.icon, icon = _d === void 0 ? null : _d, _e = _a.iconStyles, iconStyles = _e === void 0 ? [] : _e, _f = _a.iconRightStyles, iconRightStyles = _f === void 0 ? [] : _f, _g = _a.iconWrapperStyles, iconWrapperStyles = _g === void 0 ? [] : _g, _h = _a.text, text = _h === void 0 ? '' : _h, _j = _a.extraSmall, extraSmall = _j === void 0 ? false : _j, _k = _a.small, small = _k === void 0 ? false : _k, _l = _a.large, large = _l === void 0 ? false : _l, _m = _a.medium, medium = _m === void 0 ? !extraSmall && !small && !large : _m, _o = _a.isLoading, isLoading = _o === void 0 ? false : _o, _p = _a.isDisabled, isDisabled = _p === void 0 ? false : _p, _q = _a.onLayout, onLayout = _q === void 0 ? function () { } : _q, _r = _a.onPress, onPress = _r === void 0 ? function () { } : _r, _s = _a.onLongPress, onLongPress = _s === void 0 ? function () { } : _s, _t = _a.onPressIn, onPressIn = _t === void 0 ? function () { } : _t, _u = _a.onPressOut, onPressOut = _u === void 0 ? function () { } : _u, _v = _a.onMouseDown, onMouseDown = _v === void 0 ? undefined : _v, _w = _a.pressOnEnter, pressOnEnter = _w === void 0 ? false : _w, _x = _a.enterKeyEventListenerPriority, enterKeyEventListenerPriority = _x === void 0 ? 0 : _x, _y = _a.style, style = _y === void 0 ? [] : _y, disabledStyle = _a.disabledStyle, _z = _a.innerStyles, innerStyles = _z === void 0 ? [] : _z, _0 = _a.textStyles, textStyles = _0 === void 0 ? [] : _0, _1 = _a.textHoverStyles, textHoverStyles = _1 === void 0 ? [] : _1, _2 = _a.shouldUseDefaultHover, shouldUseDefaultHover = _2 === void 0 ? true : _2, _3 = _a.hoverStyles, hoverStyles = _3 === void 0 ? undefined : _3, _4 = _a.success, success = _4 === void 0 ? false : _4, _5 = _a.danger, danger = _5 === void 0 ? false : _5, _6 = _a.shouldRemoveRightBorderRadius, shouldRemoveRightBorderRadius = _6 === void 0 ? false : _6, _7 = _a.shouldRemoveLeftBorderRadius, shouldRemoveLeftBorderRadius = _7 === void 0 ? false : _7, _8 = _a.shouldEnableHapticFeedback, shouldEnableHapticFeedback = _8 === void 0 ? false : _8, _9 = _a.isLongPressDisabled, isLongPressDisabled = _9 === void 0 ? false : _9, _10 = _a.shouldShowRightIcon, shouldShowRightIcon = _10 === void 0 ? false : _10, _11 = _a.id, id = _11 === void 0 ? '' : _11, _12 = _a.testID, testID = _12 === void 0 ? undefined : _12, _13 = _a.accessibilityLabel, accessibilityLabel = _13 === void 0 ? '' : _13, _14 = _a.isSplitButton, isSplitButton = _14 === void 0 ? false : _14, _15 = _a.link, link = _15 === void 0 ? false : _15, _16 = _a.isContentCentered, isContentCentered = _16 === void 0 ? false : _16, isPressOnEnterActive = _a.isPressOnEnterActive, _17 = _a.isNested, isNested = _17 === void 0 ? false : _17, _18 = _a.secondLineText, secondLineText = _18 === void 0 ? '' : _18, _19 = _a.shouldBlendOpacity, shouldBlendOpacity = _19 === void 0 ? false : _19, _20 = _a.shouldStayNormalOnDisable, shouldStayNormalOnDisable = _20 === void 0 ? false : _20, ref = _a.ref, rest = __rest(_a, ["allowBubble", "iconRight", "iconFill", "iconHoverFill", "icon", "iconStyles", "iconRightStyles", "iconWrapperStyles", "text", "extraSmall", "small", "large", "medium", "isLoading", "isDisabled", "onLayout", "onPress", "onLongPress", "onPressIn", "onPressOut", "onMouseDown", "pressOnEnter", "enterKeyEventListenerPriority", "style", "disabledStyle", "innerStyles", "textStyles", "textHoverStyles", "shouldUseDefaultHover", "hoverStyles", "success", "danger", "shouldRemoveRightBorderRadius", "shouldRemoveLeftBorderRadius", "shouldEnableHapticFeedback", "isLongPressDisabled", "shouldShowRightIcon", "id", "testID", "accessibilityLabel", "isSplitButton", "link", "isContentCentered", "isPressOnEnterActive", "isNested", "secondLineText", "shouldBlendOpacity", "shouldStayNormalOnDisable", "ref"]);
    var theme = (0, useTheme_1.default)();
    var styles = (0, useThemeStyles_1.default)();
    var StyleUtils = (0, useStyleUtils_1.default)();
    var _21 = (0, react_1.useState)(false), isHovered = _21[0], setIsHovered = _21[1];
    var renderContent = function () {
        var _a;
        if ('children' in rest) {
            return rest.children;
        }
        var primaryText = (<Text_1.default numberOfLines={1} style={[
                isLoading && styles.opacity0,
                styles.pointerEventsNone,
                styles.buttonText,
                extraSmall && styles.buttonExtraSmallText,
                small && styles.buttonSmallText,
                medium && styles.buttonMediumText,
                large && styles.buttonLargeText,
                success && styles.buttonSuccessText,
                danger && styles.buttonDangerText,
                !!icon && styles.textAlignLeft,
                !!secondLineText && styles.noPaddingBottom,
                isHovered && textHoverStyles,
                link && styles.fontWeightNormal,
                link && styles.fontSizeLabel,
                textStyles,
                link && styles.link,
                link && isHovered && StyleUtils.getColorStyle(theme.linkHover),
            ]} dataSet={_a = {}, _a[CONST_1.default.SELECTION_SCRAPER_HIDDEN_ELEMENT] = true, _a}>
                {text}
            </Text_1.default>);
        var textComponent = secondLineText ? (<react_native_1.View style={[styles.alignItemsCenter, styles.flexColumn, styles.flexShrink1, styles.mw100]}>
                {primaryText}
                <Text_1.default style={[
                isLoading && styles.opacity0,
                styles.pointerEventsNone,
                styles.fontWeightNormal,
                styles.textDoubleDecker,
                !!secondLineText && styles.textExtraSmallSupporting,
                styles.textWhite,
                styles.textBold,
            ]} numberOfLines={1}>
                    {secondLineText}
                </Text_1.default>
            </react_native_1.View>) : (primaryText);
        var defaultFill = success || danger ? theme.textLight : theme.icon;
        // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
        if (icon || shouldShowRightIcon) {
            return (<react_native_1.View style={[isContentCentered ? styles.justifyContentCenter : styles.justifyContentBetween, styles.flexRow, iconWrapperStyles, styles.mw100]}>
                    <react_native_1.View style={[styles.alignItemsCenter, styles.flexRow, styles.flexShrink1]}>
                        {!!icon && (<react_native_1.View style={[extraSmall ? styles.mr1 : styles.mr2, !text && styles.mr0, iconStyles]}>
                                <Icon_1.default src={icon} fill={isHovered ? (iconHoverFill !== null && iconHoverFill !== void 0 ? iconHoverFill : defaultFill) : (iconFill !== null && iconFill !== void 0 ? iconFill : defaultFill)} extraSmall={extraSmall} small={small} medium={medium} large={large} isButtonIcon/>
                            </react_native_1.View>)}
                        {!!text && textComponent}
                    </react_native_1.View>
                    {shouldShowRightIcon && (<react_native_1.View style={[styles.justifyContentCenter, large ? styles.ml2 : styles.ml1, iconRightStyles]}>
                            {!isSplitButton ? (<Icon_1.default src={iconRight} fill={isHovered ? (iconHoverFill !== null && iconHoverFill !== void 0 ? iconHoverFill : defaultFill) : (iconFill !== null && iconFill !== void 0 ? iconFill : defaultFill)} extraSmall={extraSmall} small={small} medium={medium} large={large} isButtonIcon/>) : (<Icon_1.default src={iconRight} fill={isHovered ? (iconHoverFill !== null && iconHoverFill !== void 0 ? iconHoverFill : defaultFill) : (iconFill !== null && iconFill !== void 0 ? iconFill : defaultFill)} extraSmall={extraSmall} small={small} medium={medium} large={large} isButtonIcon/>)}
                        </react_native_1.View>)}
                </react_native_1.View>);
        }
        return textComponent;
    };
    var buttonStyles = (0, react_1.useMemo)(function () { return [
        styles.button,
        StyleUtils.getButtonStyleWithIcon(styles, extraSmall, small, medium, large, !!icon, !!((text === null || text === void 0 ? void 0 : text.length) > 0), shouldShowRightIcon),
        success ? styles.buttonSuccess : undefined,
        danger ? styles.buttonDanger : undefined,
        isDisabled && !shouldStayNormalOnDisable ? styles.buttonOpacityDisabled : undefined,
        isDisabled && !danger && !success && !shouldStayNormalOnDisable ? styles.buttonDisabled : undefined,
        shouldRemoveRightBorderRadius ? styles.noRightBorderRadius : undefined,
        shouldRemoveLeftBorderRadius ? styles.noLeftBorderRadius : undefined,
        text && shouldShowRightIcon ? styles.alignItemsStretch : undefined,
        innerStyles,
        link && styles.bgTransparent,
    ]; }, [
        StyleUtils,
        danger,
        icon,
        innerStyles,
        isDisabled,
        large,
        link,
        medium,
        shouldRemoveLeftBorderRadius,
        shouldRemoveRightBorderRadius,
        shouldShowRightIcon,
        small,
        extraSmall,
        styles,
        success,
        text,
        shouldStayNormalOnDisable,
    ]);
    var buttonContainerStyles = (0, react_1.useMemo)(function () { return [buttonStyles, shouldBlendOpacity && styles.buttonBlendContainer]; }, [buttonStyles, shouldBlendOpacity, styles.buttonBlendContainer]);
    var buttonBlendForegroundStyle = (0, react_1.useMemo)(function () {
        if (!shouldBlendOpacity) {
            return undefined;
        }
        var _a = react_native_1.StyleSheet.flatten(buttonStyles), backgroundColor = _a.backgroundColor, opacity = _a.opacity;
        return {
            backgroundColor: backgroundColor,
            opacity: opacity,
        };
    }, [buttonStyles, shouldBlendOpacity]);
    return (<>
            {pressOnEnter && (<KeyboardShortcutComponent isDisabled={isDisabled} isLoading={isLoading} allowBubble={allowBubble} onPress={onPress} pressOnEnter={pressOnEnter} enterKeyEventListenerPriority={enterKeyEventListenerPriority} isPressOnEnterActive={isPressOnEnterActive}/>)}
            <PressableWithFeedback_1.default dataSet={{
            listener: pressOnEnter ? CONST_1.default.KEYBOARD_SHORTCUTS.ENTER.shortcutKey : undefined,
        }} ref={ref} onLayout={onLayout} onPress={function (event) {
            if ((event === null || event === void 0 ? void 0 : event.type) === 'click') {
                var currentTarget = event === null || event === void 0 ? void 0 : event.currentTarget;
                currentTarget === null || currentTarget === void 0 ? void 0 : currentTarget.blur();
            }
            if (shouldEnableHapticFeedback) {
                HapticFeedback_1.default.press();
            }
            if (isDisabled || isLoading) {
                return; // Prevent the onPress from being triggered when the button is disabled or in a loading state
            }
            return onPress(event);
        }} onLongPress={function (event) {
            if (isLongPressDisabled) {
                return;
            }
            if (shouldEnableHapticFeedback) {
                HapticFeedback_1.default.longPress();
            }
            onLongPress(event);
        }} onPressIn={onPressIn} onPressOut={onPressOut} onMouseDown={onMouseDown} shouldBlendOpacity={shouldBlendOpacity} disabled={isLoading || isDisabled} wrapperStyle={[
            isDisabled && !shouldStayNormalOnDisable ? __assign(__assign({}, styles.cursorDisabled), styles.noSelect) : {},
            styles.buttonContainer,
            shouldRemoveRightBorderRadius ? styles.noRightBorderRadius : undefined,
            shouldRemoveLeftBorderRadius ? styles.noLeftBorderRadius : undefined,
            style,
        ]} style={buttonContainerStyles} isNested={isNested} hoverStyle={!isDisabled || !shouldStayNormalOnDisable
            ? [
                shouldUseDefaultHover && !isDisabled ? styles.buttonDefaultHovered : undefined,
                success && !isDisabled ? styles.buttonSuccessHovered : undefined,
                danger && !isDisabled ? styles.buttonDangerHovered : undefined,
                hoverStyles,
            ]
            : []} disabledStyle={!shouldStayNormalOnDisable ? disabledStyle : undefined} id={id} testID={testID} accessibilityLabel={accessibilityLabel} role={(0, utils_1.getButtonRole)(isNested)} hoverDimmingValue={1} onHoverIn={!isDisabled || !shouldStayNormalOnDisable ? function () { return setIsHovered(true); } : undefined} onHoverOut={!isDisabled || !shouldStayNormalOnDisable ? function () { return setIsHovered(false); } : undefined}>
                {shouldBlendOpacity && <react_native_1.View style={[react_native_1.StyleSheet.absoluteFill, buttonBlendForegroundStyle]}/>}
                {renderContent()}
                {isLoading && (<ActivityIndicator_1.default color={success || danger ? theme.textLight : theme.text} style={[styles.pAbsolute, styles.l0, styles.r0]} size={extraSmall ? 12 : undefined}/>)}
            </PressableWithFeedback_1.default>
        </>);
}
Button.displayName = 'Button';
exports.default = (0, withNavigationFallback_1.default)(Button);
