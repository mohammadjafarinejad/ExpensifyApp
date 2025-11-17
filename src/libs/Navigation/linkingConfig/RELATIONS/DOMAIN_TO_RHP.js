"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
var SCREENS_1 = require("@src/SCREENS");
// This file is used to define relation between domain split navigator's central screens and RHP screens.
var DOMAIN_TO_RHP = (_a = {},
    _a[SCREENS_1.default.DOMAIN.INITIAL] = [],
    _a[SCREENS_1.default.DOMAIN.SAML] = [SCREENS_1.default.DOMAIN.VERIFY, SCREENS_1.default.DOMAIN.VERIFIED],
    _a);
exports.default = DOMAIN_TO_RHP;
