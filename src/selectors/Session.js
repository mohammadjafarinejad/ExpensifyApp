"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.accountIDSelector = exports.emailSelector = void 0;
var emailSelector = function (session) { return session === null || session === void 0 ? void 0 : session.email; };
exports.emailSelector = emailSelector;
var accountIDSelector = function (session) { return session === null || session === void 0 ? void 0 : session.accountID; };
exports.accountIDSelector = accountIDSelector;
