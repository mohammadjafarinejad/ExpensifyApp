"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CONST_1 = require("@src/CONST");
var emailDomainFilter = function (event) {
    var _a;
    var email = (_a = event.user) === null || _a === void 0 ? void 0 : _a.email;
    var lowerEmail = typeof email === 'string' ? email.toLowerCase() : '';
    if (lowerEmail !== 'applausetester@applause.expensifail.com' && (lowerEmail.endsWith(CONST_1.default.EMAIL.QA_DOMAIN) || lowerEmail.endsWith('applauseauto.com'))) {
        return null;
    }
    return event;
};
exports.default = emailDomainFilter;
