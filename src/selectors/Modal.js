"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isModalCenteredVisibleSelector = exports.isRHPVisibleSelector = exports.willAlertModalBecomeVisibleSelector = void 0;
var CONST_1 = require("@src/CONST");
var willAlertModalBecomeVisibleSelector = function (modal) { return modal === null || modal === void 0 ? void 0 : modal.willAlertModalBecomeVisible; };
exports.willAlertModalBecomeVisibleSelector = willAlertModalBecomeVisibleSelector;
var isRHPVisibleSelector = function (modal) { return (modal === null || modal === void 0 ? void 0 : modal.type) === CONST_1.default.MODAL.MODAL_TYPE.RIGHT_DOCKED; };
exports.isRHPVisibleSelector = isRHPVisibleSelector;
var isModalCenteredVisibleSelector = function (modal) {
    return (modal === null || modal === void 0 ? void 0 : modal.type) === CONST_1.default.MODAL.MODAL_TYPE.CENTERED_SWIPEABLE_TO_RIGHT ||
        (modal === null || modal === void 0 ? void 0 : modal.type) === CONST_1.default.MODAL.MODAL_TYPE.CENTERED_UNSWIPEABLE ||
        (modal === null || modal === void 0 ? void 0 : modal.type) === CONST_1.default.MODAL.MODAL_TYPE.CENTERED_SMALL ||
        (modal === null || modal === void 0 ? void 0 : modal.type) === CONST_1.default.MODAL.MODAL_TYPE.CENTERED;
};
exports.isModalCenteredVisibleSelector = isModalCenteredVisibleSelector;
