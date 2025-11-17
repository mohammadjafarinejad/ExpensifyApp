"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.personalDetailsByEmailSelector = exports.createPersonalDetailsSelector = void 0;
var mapKeys_1 = require("lodash/mapKeys");
var mapOnyxCollectionItems_1 = require("@src/utils/mapOnyxCollectionItems");
var createPersonalDetailsSelector = function (personalDetails, personalDetailsSelector) {
    return (0, mapOnyxCollectionItems_1.default)(personalDetails, personalDetailsSelector);
};
exports.createPersonalDetailsSelector = createPersonalDetailsSelector;
var personalDetailsByEmailSelector = function (personalDetails) {
    return personalDetails ? (0, mapKeys_1.default)(personalDetails, function (value, key) { var _a; return (_a = value === null || value === void 0 ? void 0 : value.login) !== null && _a !== void 0 ? _a : key; }) : undefined;
};
exports.personalDetailsByEmailSelector = personalDetailsByEmailSelector;
