"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDefaultCompanyWebsite = getDefaultCompanyWebsite;
exports.getLastFourDigits = getLastFourDigits;
var expensify_common_1 = require("expensify-common");
function getDefaultCompanyWebsite(session, account, shouldShowPublicDomain) {
    var _a;
    if (shouldShowPublicDomain === void 0) { shouldShowPublicDomain = false; }
    return (account === null || account === void 0 ? void 0 : account.isFromPublicDomain) && !shouldShowPublicDomain ? '' : "https://www.".concat(expensify_common_1.Str.extractEmailDomain((_a = session === null || session === void 0 ? void 0 : session.email) !== null && _a !== void 0 ? _a : ''));
}
function getLastFourDigits(bankAccountNumber) {
    return bankAccountNumber ? bankAccountNumber.slice(-4) : '';
}
