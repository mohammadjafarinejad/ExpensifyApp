"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
// Animated required for side panel navigation
// eslint-disable-next-line no-restricted-imports
var react_native_1 = require("react-native");
var ColorSchemeWrapper_1 = require("@components/ColorSchemeWrapper");
var NavigationBar_1 = require("@components/NavigationBar");
var ScreenWrapperOfflineIndicatorContext_1 = require("@components/ScreenWrapper/ScreenWrapperOfflineIndicatorContext");
var useKeyboardState_1 = require("@hooks/useKeyboardState");
var usePrevious_1 = require("@hooks/usePrevious");
var useResponsiveLayout_1 = require("@hooks/useResponsiveLayout");
var useSafeAreaInsets_1 = require("@hooks/useSafeAreaInsets");
var useSidePanel_1 = require("@hooks/useSidePanel");
var useStyleUtils_1 = require("@hooks/useStyleUtils");
var useTheme_1 = require("@hooks/useTheme");
var useThemeStyles_1 = require("@hooks/useThemeStyles");
var useWindowDimensions_1 = require("@hooks/useWindowDimensions");
var ComposerFocusManager_1 = require("@libs/ComposerFocusManager");
var DeviceCapabilities_1 = require("@libs/DeviceCapabilities");
var NarrowPaneContext_1 = require("@libs/Navigation/AppNavigator/Navigators/NarrowPaneContext");
var Overlay_1 = require("@libs/Navigation/AppNavigator/Navigators/Overlay");
var Navigation_1 = require("@libs/Navigation/Navigation");
var Modal_1 = require("@userActions/Modal");
var CONST_1 = require("@src/CONST");
var ModalContext_1 = require("./ModalContext");
var ReanimatedModal_1 = require("./ReanimatedModal");
function BaseModal(_a) {
    var isVisible = _a.isVisible, onClose = _a.onClose, _b = _a.shouldSetModalVisibility, shouldSetModalVisibility = _b === void 0 ? true : _b, _c = _a.onModalHide, onModalHide = _c === void 0 ? function () { } : _c, type = _a.type, _d = _a.popoverAnchorPosition, popoverAnchorPosition = _d === void 0 ? {} : _d, _e = _a.innerContainerStyle, innerContainerStyle = _e === void 0 ? {} : _e, outerStyle = _a.outerStyle, _f = _a.onModalShow, onModalShow = _f === void 0 ? function () { } : _f, onModalWillShow = _a.onModalWillShow, onModalWillHide = _a.onModalWillHide, _g = _a.fullscreen, fullscreen = _g === void 0 ? true : _g, animationIn = _a.animationIn, animationOut = _a.animationOut, _h = _a.hideModalContentWhileAnimating, hideModalContentWhileAnimating = _h === void 0 ? false : _h, animationInTiming = _a.animationInTiming, animationOutTiming = _a.animationOutTiming, animationInDelay = _a.animationInDelay, _j = _a.statusBarTranslucent, statusBarTranslucent = _j === void 0 ? true : _j, _k = _a.navigationBarTranslucent, navigationBarTranslucent = _k === void 0 ? true : _k, onLayout = _a.onLayout, _l = _a.avoidKeyboard, avoidKeyboard = _l === void 0 ? false : _l, children = _a.children, _m = _a.shouldUseCustomBackdrop, shouldUseCustomBackdrop = _m === void 0 ? false : _m, onBackdropPress = _a.onBackdropPress, modalId = _a.modalId, _o = _a.shouldEnableNewFocusManagement, shouldEnableNewFocusManagement = _o === void 0 ? false : _o, restoreFocusType = _a.restoreFocusType, _p = _a.shouldUseModalPaddingStyle, shouldUseModalPaddingStyle = _p === void 0 ? true : _p, _q = _a.initialFocus, initialFocus = _q === void 0 ? false : _q, _r = _a.swipeThreshold, swipeThreshold = _r === void 0 ? 150 : _r, swipeDirection = _a.swipeDirection, _s = _a.shouldPreventScrollOnFocus, shouldPreventScrollOnFocus = _s === void 0 ? false : _s, enableEdgeToEdgeBottomSafeAreaPadding = _a.enableEdgeToEdgeBottomSafeAreaPadding, _t = _a.shouldApplySidePanelOffset, shouldApplySidePanelOffset = _t === void 0 ? type === CONST_1.default.MODAL.MODAL_TYPE.RIGHT_DOCKED : _t, hasBackdrop = _a.hasBackdrop, backdropOpacity = _a.backdropOpacity, _u = _a.shouldDisableBottomSafeAreaPadding, shouldDisableBottomSafeAreaPadding = _u === void 0 ? false : _u, _v = _a.shouldIgnoreBackHandlerDuringTransition, shouldIgnoreBackHandlerDuringTransition = _v === void 0 ? false : _v, _w = _a.forwardedFSClass, forwardedFSClass = _w === void 0 ? CONST_1.default.FULLSTORY.CLASS.UNMASK : _w, ref = _a.ref;
    // When the `enableEdgeToEdgeBottomSafeAreaPadding` prop is explicitly set, we enable edge-to-edge mode.
    var isUsingEdgeToEdgeMode = enableEdgeToEdgeBottomSafeAreaPadding !== undefined;
    var theme = (0, useTheme_1.default)();
    var styles = (0, useThemeStyles_1.default)();
    var StyleUtils = (0, useStyleUtils_1.default)();
    var _x = (0, useWindowDimensions_1.default)(), windowWidth = _x.windowWidth, windowHeight = _x.windowHeight;
    // We need to use isSmallScreenWidth instead of shouldUseNarrowLayout to apply correct modal width
    var canUseTouchScreen = (0, DeviceCapabilities_1.canUseTouchScreen)();
    // eslint-disable-next-line rulesdir/prefer-shouldUseNarrowLayout-instead-of-isSmallScreenWidth
    var _y = (0, useResponsiveLayout_1.default)(), isSmallScreenWidth = _y.isSmallScreenWidth, shouldUseNarrowLayout = _y.shouldUseNarrowLayout, isInNarrowPaneModal = _y.isInNarrowPaneModal;
    var sidePanelOffset = (0, useSidePanel_1.default)().sidePanelOffset;
    var sidePanelAnimatedStyle = shouldApplySidePanelOffset && !isSmallScreenWidth ? { transform: [{ translateX: react_native_1.Animated.multiply(sidePanelOffset.current, -1) }] } : undefined;
    var keyboardStateContextValue = (0, useKeyboardState_1.default)();
    var _z = (0, react_1.useState)(false), modalOverlapsWithTopSafeArea = _z[0], setModalOverlapsWithTopSafeArea = _z[1];
    var _0 = (0, react_1.useState)(0), modalHeight = _0[0], setModalHeight = _0[1];
    var insets = (0, useSafeAreaInsets_1.default)();
    var shouldCallHideModalOnUnmount = (0, react_1.useRef)(false);
    var hideModalCallbackRef = (0, react_1.useRef)(undefined);
    var wasVisible = (0, usePrevious_1.default)(isVisible);
    var uniqueModalId = (0, react_1.useMemo)(function () { return modalId !== null && modalId !== void 0 ? modalId : ComposerFocusManager_1.default.getId(); }, [modalId]);
    var saveFocusState = (0, react_1.useCallback)(function () {
        if (shouldEnableNewFocusManagement) {
            ComposerFocusManager_1.default.saveFocusState(uniqueModalId);
        }
        ComposerFocusManager_1.default.resetReadyToFocus(uniqueModalId);
    }, [shouldEnableNewFocusManagement, uniqueModalId]);
    /**
     * Hides modal
     * @param callHideCallback - Should we call the onModalHide callback
     */
    var hideModal = (0, react_1.useCallback)(function (callHideCallback) {
        if (callHideCallback === void 0) { callHideCallback = true; }
        shouldCallHideModalOnUnmount.current = false;
        if ((0, Modal_1.areAllModalsHidden)()) {
            if (shouldSetModalVisibility && !Navigation_1.default.isTopmostRouteModalScreen()) {
                (0, Modal_1.setModalVisibility)(false);
            }
        }
        if (callHideCallback) {
            onModalHide();
        }
        (0, Modal_1.onModalDidClose)();
        ComposerFocusManager_1.default.refocusAfterModalFullyClosed(uniqueModalId, restoreFocusType);
    }, [shouldSetModalVisibility, onModalHide, restoreFocusType, uniqueModalId]);
    (0, react_1.useEffect)(function () {
        var removeOnCloseListener;
        if (isVisible) {
            shouldCallHideModalOnUnmount.current = true;
            (0, Modal_1.willAlertModalBecomeVisible)(true, type === CONST_1.default.MODAL.MODAL_TYPE.POPOVER || type === CONST_1.default.MODAL.MODAL_TYPE.BOTTOM_DOCKED);
            // To handle closing any modal already visible when this modal is mounted, i.e. PopoverReportActionContextMenu
            if (onClose) {
                removeOnCloseListener = (0, Modal_1.setCloseModal)(onClose);
            }
        }
        return function () {
            if (!removeOnCloseListener) {
                return;
            }
            removeOnCloseListener();
        };
    }, [isVisible, wasVisible, onClose, type]);
    (0, react_1.useEffect)(function () {
        hideModalCallbackRef.current = hideModal;
    }, [hideModal]);
    (0, react_1.useEffect)(function () { return function () {
        var _a;
        if (!shouldCallHideModalOnUnmount.current) {
            return;
        }
        (_a = hideModalCallbackRef.current) === null || _a === void 0 ? void 0 : _a.call(hideModalCallbackRef, true);
    }; }, 
    // eslint-disable-next-line react-compiler/react-compiler, react-hooks/exhaustive-deps
    []);
    var handleShowModal = (0, react_1.useCallback)(function () {
        if (shouldSetModalVisibility) {
            (0, Modal_1.setModalVisibility)(true, type);
        }
        onModalShow();
    }, [onModalShow, shouldSetModalVisibility, type]);
    var handleBackdropPress = function (e) {
        if ((e === null || e === void 0 ? void 0 : e.key) === CONST_1.default.KEYBOARD_SHORTCUTS.ENTER.shortcutKey) {
            return;
        }
        if (onBackdropPress) {
            onBackdropPress();
        }
        else {
            onClose === null || onClose === void 0 ? void 0 : onClose();
        }
    };
    var handleDismissModal = function () {
        ComposerFocusManager_1.default.setReadyToFocus(uniqueModalId);
    };
    // Checks if modal overlaps with topSafeArea. Used to offset tall bottom docked modals with keyboard.
    (0, react_1.useEffect)(function () {
        if (type !== CONST_1.default.MODAL.MODAL_TYPE.BOTTOM_DOCKED || !canUseTouchScreen || !isSmallScreenWidth) {
            return;
        }
        var paddingTop = StyleUtils.getPlatformSafeAreaPadding(insets).paddingTop;
        var availableHeight = windowHeight - modalHeight - keyboardStateContextValue.keyboardActiveHeight - paddingTop;
        setModalOverlapsWithTopSafeArea((keyboardStateContextValue.isKeyboardAnimatingRef.current || keyboardStateContextValue.isKeyboardActive) && Math.floor(availableHeight) <= 0);
    }, [
        StyleUtils,
        insets,
        keyboardStateContextValue.isKeyboardActive,
        keyboardStateContextValue.isKeyboardAnimatingRef,
        keyboardStateContextValue.keyboardActiveHeight,
        modalHeight,
        type,
        windowHeight,
        modalOverlapsWithTopSafeArea,
        canUseTouchScreen,
        isSmallScreenWidth,
    ]);
    var onViewLayout = function (e) {
        setModalHeight(e.nativeEvent.layout.height);
    };
    var _1 = (0, react_1.useMemo)(function () {
        return StyleUtils.getModalStyles(type, {
            windowWidth: windowWidth,
            windowHeight: windowHeight,
            isSmallScreenWidth: isSmallScreenWidth,
            shouldUseNarrowLayout: shouldUseNarrowLayout,
        }, popoverAnchorPosition, innerContainerStyle, outerStyle, shouldUseModalPaddingStyle, {
            modalOverlapsWithTopSafeArea: modalOverlapsWithTopSafeArea,
            shouldDisableBottomSafeAreaPadding: !!shouldDisableBottomSafeAreaPadding,
        });
    }, [
        StyleUtils,
        type,
        windowWidth,
        windowHeight,
        isSmallScreenWidth,
        shouldUseNarrowLayout,
        popoverAnchorPosition,
        innerContainerStyle,
        outerStyle,
        shouldUseModalPaddingStyle,
        modalOverlapsWithTopSafeArea,
        shouldDisableBottomSafeAreaPadding,
    ]), modalStyle = _1.modalStyle, modalContainerStyle = _1.modalContainerStyle, modalStyleAnimationIn = _1.animationIn, modalStyleAnimationOut = _1.animationOut, shouldAddTopSafeAreaMargin = _1.shouldAddTopSafeAreaMargin, shouldAddBottomSafeAreaMargin = _1.shouldAddBottomSafeAreaMargin, shouldAddTopSafeAreaPadding = _1.shouldAddTopSafeAreaPadding, shouldAddBottomSafeAreaPadding = _1.shouldAddBottomSafeAreaPadding, hideBackdrop = _1.hideBackdrop;
    var modalPaddingStyles = (0, react_1.useMemo)(function () {
        var paddings = StyleUtils.getModalPaddingStyles({
            shouldAddBottomSafeAreaMargin: shouldAddBottomSafeAreaMargin,
            shouldAddTopSafeAreaMargin: shouldAddTopSafeAreaMargin,
            // enableEdgeToEdgeBottomSafeAreaPadding is used as a temporary solution to disable safe area bottom spacing on modals, to allow edge-to-edge content
            shouldAddBottomSafeAreaPadding: !isUsingEdgeToEdgeMode && (!avoidKeyboard || !keyboardStateContextValue.isKeyboardActive) && shouldAddBottomSafeAreaPadding,
            shouldAddTopSafeAreaPadding: shouldAddTopSafeAreaPadding,
            modalContainerStyle: modalContainerStyle,
            insets: insets,
        });
        return shouldUseModalPaddingStyle ? paddings : { paddingLeft: paddings.paddingLeft, paddingRight: paddings.paddingRight };
    }, [
        StyleUtils,
        avoidKeyboard,
        insets,
        isUsingEdgeToEdgeMode,
        keyboardStateContextValue.isKeyboardActive,
        modalContainerStyle,
        shouldAddBottomSafeAreaMargin,
        shouldAddBottomSafeAreaPadding,
        shouldAddTopSafeAreaMargin,
        shouldAddTopSafeAreaPadding,
        shouldUseModalPaddingStyle,
    ]);
    var modalContextValue = (0, react_1.useMemo)(function () { return ({
        activeModalType: isVisible ? type : undefined,
        default: false,
    }); }, [isVisible, type]);
    // In Modals we need to reset the ScreenWrapperOfflineIndicatorContext to allow nested ScreenWrapper components to render offline indicators,
    // except if we are in a narrow pane navigator. In this case, we use the narrow pane's original values.
    var isInNarrowPane = (0, react_1.useContext)(NarrowPaneContext_1.default).isInNarrowPane;
    var originalValues = (0, react_1.useContext)(ScreenWrapperOfflineIndicatorContext_1.default).originalValues;
    var offlineIndicatorContextValue = (0, react_1.useMemo)(function () { return (isInNarrowPane ? (originalValues !== null && originalValues !== void 0 ? originalValues : {}) : {}); }, [isInNarrowPane, originalValues]);
    var backdropOpacityAdjusted = hideBackdrop || (type === CONST_1.default.MODAL.MODAL_TYPE.RIGHT_DOCKED && !isSmallScreenWidth && (isInNarrowPane || isInNarrowPaneModal)) // right_docked modals shouldn't add backdrops when opened in same-width RHP
        ? 0
        : backdropOpacity;
    var dragArea = type === CONST_1.default.MODAL.MODAL_TYPE.CENTERED || type === CONST_1.default.MODAL.MODAL_TYPE.CENTERED_UNSWIPEABLE ? undefined : false;
    return (<ModalContext_1.default.Provider value={modalContextValue}>
            <ScreenWrapperOfflineIndicatorContext_1.default.Provider value={offlineIndicatorContextValue}>
                <react_native_1.View 
    // this is a workaround for modal not being visible on the new arch in some cases
    // it's necessary to have a non-collapsible view as a parent of the modal to prevent
    // a conflict between RN core and Reanimated shadow tree operations
    // position absolute is needed to prevent the view from interfering with flex layout
    collapsable={false} style={[styles.pAbsolute, { zIndex: 1 }]}>
                    <ReanimatedModal_1.default dataSet={{ dragArea: dragArea }} 
    // Prevent the parent element to capture a click. This is useful when the modal component is put inside a pressable.
    onClick={function (e) { return e.stopPropagation(); }} onBackdropPress={handleBackdropPress} 
    // Note: Escape key on web/desktop will trigger onBackButtonPress callback
    onBackButtonPress={Modal_1.closeTop} onModalShow={handleShowModal} onModalHide={hideModal} onModalWillShow={function () {
            saveFocusState();
            onModalWillShow === null || onModalWillShow === void 0 ? void 0 : onModalWillShow();
        }} onModalWillHide={function () {
            // Reset willAlertModalBecomeVisible when modal is about to hide
            // This ensures it's cleared before any other components check its value
            if ((0, Modal_1.areAllModalsHidden)()) {
                (0, Modal_1.willAlertModalBecomeVisible)(false);
            }
            onModalWillHide === null || onModalWillHide === void 0 ? void 0 : onModalWillHide();
        }} onDismiss={handleDismissModal} onSwipeComplete={onClose} swipeDirection={swipeDirection} shouldPreventScrollOnFocus={shouldPreventScrollOnFocus} initialFocus={initialFocus} swipeThreshold={swipeThreshold} isVisible={isVisible} backdropColor={theme.overlay} backdropOpacity={backdropOpacityAdjusted} backdropTransitionOutTiming={0} hasBackdrop={hasBackdrop !== null && hasBackdrop !== void 0 ? hasBackdrop : fullscreen} coverScreen={fullscreen} style={modalStyle} deviceHeight={windowHeight} deviceWidth={windowWidth} animationIn={animationIn !== null && animationIn !== void 0 ? animationIn : modalStyleAnimationIn} animationInTiming={animationInTiming} animationInDelay={animationInDelay} animationOut={animationOut !== null && animationOut !== void 0 ? animationOut : modalStyleAnimationOut} animationOutTiming={animationOutTiming} hideModalContentWhileAnimating={hideModalContentWhileAnimating} statusBarTranslucent={statusBarTranslucent} navigationBarTranslucent={navigationBarTranslucent} onLayout={onLayout} avoidKeyboard={avoidKeyboard} customBackdrop={shouldUseCustomBackdrop ? <Overlay_1.default onPress={handleBackdropPress}/> : undefined} type={type} shouldIgnoreBackHandlerDuringTransition={shouldIgnoreBackHandlerDuringTransition} shouldEnableNewFocusManagement={shouldEnableNewFocusManagement}>
                        <react_native_1.Animated.View onLayout={onViewLayout} style={[styles.defaultModalContainer, modalContainerStyle, modalPaddingStyles, !isVisible && styles.pointerEventsNone, sidePanelAnimatedStyle]} ref={ref} fsClass={forwardedFSClass}>
                            <ColorSchemeWrapper_1.default>{children}</ColorSchemeWrapper_1.default>
                        </react_native_1.Animated.View>
                        {!(keyboardStateContextValue === null || keyboardStateContextValue === void 0 ? void 0 : keyboardStateContextValue.isKeyboardActive) && <NavigationBar_1.default />}
                    </ReanimatedModal_1.default>
                </react_native_1.View>
            </ScreenWrapperOfflineIndicatorContext_1.default.Provider>
        </ModalContext_1.default.Provider>);
}
BaseModal.displayName = 'BaseModalWithRef';
exports.default = BaseModal;
