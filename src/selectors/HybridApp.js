"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isClosingReactNativeAppSelector = exports.isSingleNewDotEntrySelector = void 0;
var isSingleNewDotEntrySelector = function (hybridApp) { return hybridApp === null || hybridApp === void 0 ? void 0 : hybridApp.isSingleNewDotEntry; };
exports.isSingleNewDotEntrySelector = isSingleNewDotEntrySelector;
var isClosingReactNativeAppSelector = function (hybridApp) { return hybridApp === null || hybridApp === void 0 ? void 0 : hybridApp.closingReactNativeApp; };
exports.isClosingReactNativeAppSelector = isClosingReactNativeAppSelector;
