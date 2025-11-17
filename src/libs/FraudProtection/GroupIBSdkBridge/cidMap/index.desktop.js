"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
var CONST_1 = require("@src/CONST");
var cidMap = (_a = {},
    _a[CONST_1.default.ENVIRONMENT.PRODUCTION] = 'gib-w-expensify-desk',
    _a[CONST_1.default.ENVIRONMENT.STAGING] = 'gib-w-expensify-desk-stg',
    _a[CONST_1.default.ENVIRONMENT.DEV] = 'gib-w-expensify-desk-uat',
    _a[CONST_1.default.ENVIRONMENT.ADHOC] = 'gib-w-expensify-desk-uat',
    _a);
exports.default = cidMap;
