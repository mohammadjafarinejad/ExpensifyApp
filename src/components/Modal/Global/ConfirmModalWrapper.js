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
var ConfirmModal_1 = require("@components/ConfirmModal");
var useActiveElementRole_1 = require("@hooks/useActiveElementRole");
var useKeyboardShortcut_1 = require("@hooks/useKeyboardShortcut");
var CONST_1 = require("@src/CONST");
var ModalContext_1 = require("./ModalContext");
// This wrapper bridges the ConfirmModal API with the global modal system, providing handlers for the onConfirm and onCancel callbacks to ConfirmModal.
// TODOS after migrating all ConfirmModal instances to use showConfirmModal:
// - handle closeModal inside ConfirmModal
// - remove ConfirmModalWrapper
function ConfirmModalWrapper(_a) {
    var closeModal = _a.closeModal, props = __rest(_a, ["closeModal"]);
    var activeElementRole = (0, useActiveElementRole_1.default)();
    var _b = (0, react_1.useState)(true), isVisible = _b[0], setIsVisible = _b[1];
    var _c = (0, react_1.useState)(ModalContext_1.ModalActions.CLOSE), closeAction = _c[0], setCloseAction = _c[1];
    var handleConfirm = function () {
        setCloseAction(ModalContext_1.ModalActions.CONFIRM);
        setIsVisible(false);
    };
    var handleCancel = function () {
        setCloseAction(ModalContext_1.ModalActions.CLOSE);
        setIsVisible(false);
    };
    var handleModalHide = function () {
        if (isVisible) {
            return;
        }
        closeModal({ action: closeAction });
    };
    var shortcutConfig = {
        isActive: activeElementRole !== CONST_1.default.ROLE.BUTTON,
        shouldPreventDefault: false,
        shouldBubble: false,
    };
    (0, useKeyboardShortcut_1.default)(CONST_1.default.KEYBOARD_SHORTCUTS.ENTER, handleConfirm, shortcutConfig);
    return (<ConfirmModal_1.default 
    // eslint-disable-next-line react/jsx-props-no-spreading
    {...props} isVisible={isVisible} onConfirm={handleConfirm} onCancel={handleCancel} onModalHide={handleModalHide}/>);
}
ConfirmModalWrapper.displayName = 'ConfirmModalWrapper';
exports.default = ConfirmModalWrapper;
