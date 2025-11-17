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
Object.defineProperty(exports, "__esModule", { value: true });
var ConfirmModalWrapper_1 = require("@components/Modal/Global/ConfirmModalWrapper");
var ModalContext_1 = require("@components/Modal/Global/ModalContext");
var useConfirmModal = function () {
    var context = (0, ModalContext_1.useModal)();
    var showConfirmModal = function (options) {
        return context.showModal({
            component: ConfirmModalWrapper_1.default,
            props: options,
        });
    };
    return __assign(__assign({}, context), { showConfirmModal: showConfirmModal });
};
exports.default = useConfirmModal;
