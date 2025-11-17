"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var expensify_common_1 = require("expensify-common");
var CONST_1 = require("@src/CONST");
var ONYXKEYS_1 = require("@src/ONYXKEYS");
var useOnyx_1 = require("./useOnyx");
var useHasPhoneNumberLogin = function () {
    var _a;
    var _b = (0, useOnyx_1.default)(ONYXKEYS_1.default.LOGIN_LIST, { canBeMissing: true }), loginList = _b[0], loginListResult = _b[1];
    var _c = (0, useOnyx_1.default)(ONYXKEYS_1.default.SESSION, { canBeMissing: true }), session = _c[0], sessionResult = _c[1];
    var isPrimaryEmailPhone = expensify_common_1.Str.endsWith((_a = session === null || session === void 0 ? void 0 : session.email) !== null && _a !== void 0 ? _a : '', CONST_1.default.SMS.DOMAIN);
    var smsLoginExists = Object.keys(loginList !== null && loginList !== void 0 ? loginList : {}).some(function (login) { return expensify_common_1.Str.isSMSLogin(login); });
    var hasPhoneNumberLogin = isPrimaryEmailPhone || smsLoginExists;
    var isPhoneNumberLoaded = loginListResult.status !== 'loading' && sessionResult.status !== 'loading';
    return { hasPhoneNumberLogin: hasPhoneNumberLogin, isPhoneNumberLoaded: isPhoneNumberLoaded };
};
exports.default = useHasPhoneNumberLogin;
