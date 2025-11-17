"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isFileObjectWithGetAsFile = void 0;
var isFileObjectWithGetAsFile = function (item) {
    var _a;
    return 'getAsFile' in item && typeof item.getAsFile === 'function' && ((_a = item.getAsFile) === null || _a === void 0 ? void 0 : _a.call(item)) !== null;
};
exports.isFileObjectWithGetAsFile = isFileObjectWithGetAsFile;
