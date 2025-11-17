"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getFirstAlphaNumericCharacter(str) {
    var _a;
    if (str === void 0) { str = ''; }
    return ((_a = str
        .normalize('NFD')
        .replace(/[^0-9a-z]/gi, '')
        .toUpperCase()[0]) !== null && _a !== void 0 ? _a : '');
}
exports.default = getFirstAlphaNumericCharacter;
