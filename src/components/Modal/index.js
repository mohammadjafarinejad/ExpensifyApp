"use strict";
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
var react_1 = require("react");
var useStyleUtils_1 = require("@hooks/useStyleUtils");
var useTheme_1 = require("@hooks/useTheme");
var StatusBar_1 = require("@libs/StatusBar");
var CONST_1 = require("@src/CONST");
var BaseModal_1 = require("./BaseModal");
function Modal(_a) {
    var _b = _a.fullscreen, fullscreen = _b === void 0 ? true : _b, _c = _a.onModalHide, onModalHide = _c === void 0 ? function () { } : _c, type = _a.type, _d = _a.onModalShow, onModalShow = _d === void 0 ? function () { } : _d, children = _a.children, shouldHandleNavigationBack = _a.shouldHandleNavigationBack, rest = __rest(_a, ["fullscreen", "onModalHide", "type", "onModalShow", "children", "shouldHandleNavigationBack"]);
    var theme = (0, useTheme_1.default)();
    var StyleUtils = (0, useStyleUtils_1.default)();
    var _e = (0, react_1.useState)(), previousStatusBarColor = _e[0], setPreviousStatusBarColor = _e[1];
    var setStatusBarColor = function (color) {
        if (color === void 0) { color = theme.appBG; }
        if (!fullscreen) {
            return;
        }
        StatusBar_1.default.setBackgroundColor(color);
    };
    var hideModal = function () {
        onModalHide();
    };
    var handlePopStateRef = (0, react_1.useRef)(function () {
        var _a;
        (_a = rest.onClose) === null || _a === void 0 ? void 0 : _a.call(rest);
    });
    // This useEffect is needed so that when the onClose function changes, the ref contains the current value of this function.
    // More information can be found here: https://github.com/Expensify/App/issues/69781
    (0, react_1.useEffect)(function () {
        handlePopStateRef.current = function () {
            var _a;
            (_a = rest.onClose) === null || _a === void 0 ? void 0 : _a.call(rest);
        };
        // eslint-disable-next-line react-compiler/react-compiler
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [rest.onClose]);
    // We use a stable callback here to avoid issues with stale closures in event listeners.
    // If we directly passed `handlePopStateRef.current` to addEventListener, the listener would
    // capture the value of `onClose` at the time it was registered and would not update when
    // `onClose` changes. By wrapping it in a stable useCallback and referencing
    // handlePopStateRef.current inside, we ensure that the listener always calls the latest
    // version of `onClose` without needing to reattach the event listener.
    var handlePopState = (0, react_1.useCallback)(function () {
        handlePopStateRef.current();
    }, []);
    var showModal = function () {
        if (shouldHandleNavigationBack) {
            window.history.pushState({ shouldGoBack: true }, '', null);
            window.addEventListener('popstate', handlePopState);
        }
        onModalShow === null || onModalShow === void 0 ? void 0 : onModalShow();
    };
    (0, react_1.useEffect)(function () { return function () {
        window.removeEventListener('popstate', handlePopState);
    }; }, [handlePopState]);
    var onModalWillShow = function () {
        var _a, _b;
        var statusBarColor = (_a = StatusBar_1.default.getBackgroundColor()) !== null && _a !== void 0 ? _a : theme.appBG;
        var isFullScreenModal = type === CONST_1.default.MODAL.MODAL_TYPE.CENTERED ||
            type === CONST_1.default.MODAL.MODAL_TYPE.CENTERED_UNSWIPEABLE ||
            type === CONST_1.default.MODAL.MODAL_TYPE.RIGHT_DOCKED ||
            type === CONST_1.default.MODAL.MODAL_TYPE.CENTERED_SWIPEABLE_TO_RIGHT;
        if (statusBarColor) {
            setPreviousStatusBarColor(statusBarColor);
            // If it is a full screen modal then match it with appBG, otherwise we use the backdrop color
            setStatusBarColor(isFullScreenModal ? theme.appBG : StyleUtils.getThemeBackgroundColor(statusBarColor));
        }
        (_b = rest.onModalWillShow) === null || _b === void 0 ? void 0 : _b.call(rest);
    };
    var onModalWillHide = function () {
        var _a, _b;
        setStatusBarColor(previousStatusBarColor);
        (_a = rest.onModalWillHide) === null || _a === void 0 ? void 0 : _a.call(rest);
        if (((_b = window.history.state) === null || _b === void 0 ? void 0 : _b.shouldGoBack) && shouldHandleNavigationBack) {
            window.history.back();
        }
    };
    return (<BaseModal_1.default 
    // eslint-disable-next-line react/jsx-props-no-spreading
    {...rest} onModalHide={hideModal} onModalShow={showModal} onModalWillShow={onModalWillShow} onModalWillHide={onModalWillHide} avoidKeyboard={false} fullscreen={fullscreen} type={type}>
            {children}
        </BaseModal_1.default>);
}
Modal.displayName = 'Modal';
exports.default = Modal;
