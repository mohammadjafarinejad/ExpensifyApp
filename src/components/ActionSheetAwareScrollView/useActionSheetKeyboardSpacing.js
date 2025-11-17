"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_native_keyboard_controller_1 = require("react-native-keyboard-controller");
var react_native_reanimated_1 = require("react-native-reanimated");
var useSafeAreaPaddings_1 = require("@hooks/useSafeAreaPaddings");
var useWindowDimensions_1 = require("@hooks/useWindowDimensions");
var ActionSheetAwareScrollViewContext_1 = require("./ActionSheetAwareScrollViewContext");
var KeyboardState = {
    UNKNOWN: 0,
    OPENING: 1,
    OPEN: 2,
    CLOSING: 3,
    CLOSED: 4,
};
var SPRING_CONFIG = {
    mass: 3,
    stiffness: 1000,
    damping: 500,
};
var useAnimatedKeyboard = function () {
    var state = (0, react_native_reanimated_1.useSharedValue)(KeyboardState.UNKNOWN);
    var height = (0, react_native_reanimated_1.useSharedValue)(0);
    var maxOpenHeight = (0, react_native_reanimated_1.useSharedValue)(0);
    (0, react_native_keyboard_controller_1.useKeyboardHandler)({
        onStart: function (e) {
            'worklet';
            if (e.height > 0) {
                state.set(KeyboardState.OPEN);
                height.set(0);
                if (e.height > maxOpenHeight.get()) {
                    maxOpenHeight.set(e.height);
                }
                return;
            }
            state.set(KeyboardState.CLOSED);
            height.set(maxOpenHeight.get());
        },
        onMove: function (e) {
            'worklet';
            height.set(e.height);
        },
        onEnd: function (e) {
            'worklet';
            state.set(e.height > 0 ? KeyboardState.OPEN : KeyboardState.CLOSED);
            height.set(e.height);
        },
    }, []);
    return { state: state, height: height, maxOpenHeight: maxOpenHeight };
};
function useActionSheetKeyboardSpacing(scrollViewAnimatedRef) {
    var _a = (0, useSafeAreaPaddings_1.default)().unmodifiedPaddings, _b = _a.top, paddingTop = _b === void 0 ? 0 : _b, _c = _a.bottom, paddingBottom = _c === void 0 ? 0 : _c;
    // Similar to using `global` in worklet but it's just a local object
    var syncLocalWorkletState = (0, react_native_reanimated_1.useSharedValue)(KeyboardState.UNKNOWN);
    var windowHeight = (0, useWindowDimensions_1.default)().windowHeight;
    var _d = (0, react_1.useContext)(ActionSheetAwareScrollViewContext_1.ActionSheetAwareScrollViewContext), currentActionSheetState = _d.currentActionSheetState, transition = _d.transitionActionSheetStateWorklet, resetStateMachine = _d.resetStateMachine;
    // Reset state machine when component unmounts
    // eslint-disable-next-line arrow-body-style
    (0, react_1.useEffect)(function () {
        return function () { return resetStateMachine(); };
    }, [resetStateMachine]);
    var keyboard = useAnimatedKeyboard();
    (0, react_native_reanimated_1.useAnimatedReaction)(function () { return keyboard.state.get(); }, function (lastState) {
        if (lastState === syncLocalWorkletState.get()) {
            return;
        }
        // eslint-disable-next-line react-compiler/react-compiler
        syncLocalWorkletState.set(lastState);
        if (lastState === KeyboardState.OPEN) {
            transition({ type: ActionSheetAwareScrollViewContext_1.Actions.OPEN_KEYBOARD });
        }
        else if (lastState === KeyboardState.CLOSED) {
            transition({ type: ActionSheetAwareScrollViewContext_1.Actions.CLOSE_KEYBOARD });
        }
    }, []);
    var position = (0, react_native_reanimated_1.useScrollViewOffset)(scrollViewAnimatedRef);
    var spacing = (0, react_native_reanimated_1.useDerivedValue)(function () {
        var _a, _b;
        var _c = currentActionSheetState.get(), current = _c.current, previous = _c.previous;
        // We don't need to run any additional logic. it will always return 0 for idle state
        if (current.state === ActionSheetAwareScrollViewContext_1.States.IDLE) {
            return (0, react_native_reanimated_1.withSpring)(0, SPRING_CONFIG);
        }
        var isKeyboardOpen = keyboard.state.get() === KeyboardState.OPEN;
        var isKeyboardClosed = keyboard.state.get() === KeyboardState.CLOSED;
        var keyboardHeight = keyboard.height.get() === 0 ? 0 : keyboard.height.get() - paddingBottom;
        // Sometimes we need to know the last keyboard height
        var maxOpenKeyboardHeight = keyboard.maxOpenHeight.get() - paddingBottom;
        var _d = (_a = current.payload) !== null && _a !== void 0 ? _a : {}, _e = _d.popoverHeight, popoverHeight = _e === void 0 ? 0 : _e, frameY = _d.frameY, height = _d.height;
        var invertedKeyboardHeight = isKeyboardClosed ? maxOpenKeyboardHeight : 0;
        var elementOffset = frameY !== undefined && height !== undefined && popoverHeight !== undefined ? frameY + paddingTop + height - (windowHeight - popoverHeight) : 0;
        // when the state is not idle we know for sure we have the previous state
        var previousPayload = (_b = previous.payload) !== null && _b !== void 0 ? _b : {};
        var previousElementOffset = previousPayload.frameY !== undefined && previousPayload.height !== undefined && previousPayload.popoverHeight !== undefined
            ? previousPayload.frameY + paddingTop + previousPayload.height - (windowHeight - previousPayload.popoverHeight)
            : 0;
        var isOpeningKeyboard = syncLocalWorkletState.get() === 1;
        var isClosingKeyboard = syncLocalWorkletState.get() === 3;
        var isClosedKeyboard = syncLocalWorkletState.get() === 4;
        // Depending on the current and sometimes previous state we can return
        // either animation or just a value
        switch (current.state) {
            case ActionSheetAwareScrollViewContext_1.States.KEYBOARD_OPEN: {
                if (isClosedKeyboard && elementOffset < 0) {
                    return maxOpenKeyboardHeight - keyboardHeight;
                }
                if (isClosedKeyboard || isOpeningKeyboard) {
                    return (0, react_native_reanimated_1.withSpring)(0, SPRING_CONFIG);
                }
                if (previous.state === ActionSheetAwareScrollViewContext_1.States.KEYBOARD_CLOSING_POPOVER || (previous.state === ActionSheetAwareScrollViewContext_1.States.KEYBOARD_OPEN && elementOffset < 0)) {
                    var returnValue = Math.max(keyboard.maxOpenHeight.get() - keyboard.height.get() - paddingBottom, 0) + Math.max(elementOffset, 0);
                    return returnValue;
                }
                return (0, react_native_reanimated_1.withSpring)(0, SPRING_CONFIG);
            }
            case ActionSheetAwareScrollViewContext_1.States.POPOVER_CLOSED: {
                return (0, react_native_reanimated_1.withSpring)(0, SPRING_CONFIG, function () {
                    transition({
                        type: ActionSheetAwareScrollViewContext_1.Actions.END_TRANSITION,
                    });
                });
            }
            case ActionSheetAwareScrollViewContext_1.States.TRANSITIONING_POPOVER:
            case ActionSheetAwareScrollViewContext_1.States.TRANSITIONING_POPOVER_DONE:
            case ActionSheetAwareScrollViewContext_1.States.POPOVER_OPEN: {
                if (popoverHeight) {
                    if (previousElementOffset !== 0 || elementOffset > previousElementOffset) {
                        var returnValue_1 = elementOffset < 0 ? 0 : elementOffset;
                        return (0, react_native_reanimated_1.withSpring)(returnValue_1, SPRING_CONFIG);
                    }
                    var returnValue = Math.max(previousElementOffset, 0);
                    return (0, react_native_reanimated_1.withSpring)(returnValue, SPRING_CONFIG);
                }
                return 0;
            }
            case ActionSheetAwareScrollViewContext_1.States.TRANSITIONING_POPOVER_KEYBOARD_OPEN:
            case ActionSheetAwareScrollViewContext_1.States.TRANSITIONING_POPOVER_KEYBOARD_OPEN_DONE:
            case ActionSheetAwareScrollViewContext_1.States.KEYBOARD_POPOVER_OPEN: {
                var nextOffset = elementOffset + maxOpenKeyboardHeight;
                if (isKeyboardOpen) {
                    if (popoverHeight === 0 && nextOffset > invertedKeyboardHeight) {
                        return keyboardHeight;
                    }
                    return maxOpenKeyboardHeight - keyboardHeight;
                }
                var scrollOffset = position.get();
                // Check if there's a space not filled by content and we need to move
                var hasWhiteGap = popoverHeight &&
                    // Content would go too far up (beyond popover bounds)
                    (nextOffset < -popoverHeight ||
                        // Or content would go below top of screen (only if not significantly scrolled)
                        (nextOffset > 0 && popoverHeight < maxOpenKeyboardHeight && scrollOffset < popoverHeight) ||
                        // Or content would create a gap by being positioned above minimum allowed position
                        (popoverHeight < maxOpenKeyboardHeight && nextOffset > -popoverHeight && scrollOffset < popoverHeight) ||
                        // Or there's a significant gap considering scroll position
                        (popoverHeight < maxOpenKeyboardHeight &&
                            scrollOffset > 0 &&
                            scrollOffset < popoverHeight &&
                            // When scrolled, check if the gap between content and keyboard would be too large
                            (nextOffset + scrollOffset > popoverHeight / 2 ||
                                // Or if content would be pushed too far down relative to scroll
                                elementOffset + scrollOffset > -popoverHeight / 2)));
                if (isKeyboardClosed) {
                    if (hasWhiteGap) {
                        return (0, react_native_reanimated_1.withSpring)(nextOffset, SPRING_CONFIG);
                    }
                    if (nextOffset > invertedKeyboardHeight) {
                        return (0, react_native_reanimated_1.withSpring)(nextOffset < 0 ? 0 : nextOffset, SPRING_CONFIG);
                    }
                }
                if (elementOffset < 0) {
                    var heightDifference = (frameY !== null && frameY !== void 0 ? frameY : 0) - keyboardHeight - paddingTop - paddingBottom;
                    if (isClosingKeyboard) {
                        if (hasWhiteGap) {
                            var targetOffset = Math.max(heightDifference - (scrollOffset > 0 ? scrollOffset / 2 : 0), -popoverHeight);
                            return (0, react_native_reanimated_1.withSequence)((0, react_native_reanimated_1.withTiming)(keyboardHeight, { duration: 0 }), (0, react_native_reanimated_1.withSpring)(targetOffset, SPRING_CONFIG));
                        }
                        return maxOpenKeyboardHeight - keyboardHeight;
                    }
                    if (hasWhiteGap && heightDifference > paddingTop) {
                        return (0, react_native_reanimated_1.withSequence)((0, react_native_reanimated_1.withTiming)(maxOpenKeyboardHeight - keyboardHeight, { duration: 0 }), (0, react_native_reanimated_1.withSpring)(Math.max(heightDifference, -popoverHeight), SPRING_CONFIG));
                    }
                    return maxOpenKeyboardHeight - keyboardHeight;
                }
                return (0, react_native_reanimated_1.withSequence)((0, react_native_reanimated_1.withTiming)(keyboardHeight, { duration: 0 }), (0, react_native_reanimated_1.withSpring)(nextOffset, SPRING_CONFIG));
            }
            case ActionSheetAwareScrollViewContext_1.States.KEYBOARD_CLOSING_POPOVER: {
                if (elementOffset < 0) {
                    transition({ type: ActionSheetAwareScrollViewContext_1.Actions.END_TRANSITION });
                    return maxOpenKeyboardHeight - keyboardHeight;
                }
                if (isKeyboardClosed) {
                    var returnValue = elementOffset + maxOpenKeyboardHeight;
                    return returnValue;
                }
                if (keyboard.height.get() > 0) {
                    var returnValue = keyboard.maxOpenHeight.get() - keyboard.height.get();
                    return returnValue;
                }
                return (0, react_native_reanimated_1.withTiming)(elementOffset + maxOpenKeyboardHeight, {
                    duration: 0,
                });
            }
            default:
                return 0;
        }
    }, []);
    return spacing;
}
exports.default = useActionSheetKeyboardSpacing;
