"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.primaryLoginSelector = exports.isUserValidatedSelector = exports.isActingAsDelegateSelector = void 0;
var isActingAsDelegateSelector = function (account) { var _a; return !!((_a = account === null || account === void 0 ? void 0 : account.delegatedAccess) === null || _a === void 0 ? void 0 : _a.delegate); };
exports.isActingAsDelegateSelector = isActingAsDelegateSelector;
var isUserValidatedSelector = function (account) { return account === null || account === void 0 ? void 0 : account.validated; };
exports.isUserValidatedSelector = isUserValidatedSelector;
var primaryLoginSelector = function (account) { return account === null || account === void 0 ? void 0 : account.primaryLogin; };
exports.primaryLoginSelector = primaryLoginSelector;
