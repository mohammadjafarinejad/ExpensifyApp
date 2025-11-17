"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// eslint-disable-next-line @typescript-eslint/no-restricted-types
function typedEntries(obj) {
    return Object.entries(obj);
}
function hasMethod(value, methodName) {
    return value != null && typeof value[methodName] === 'function';
}
exports.default = {
    typedEntries: typedEntries,
    hasMethod: hasMethod,
};
