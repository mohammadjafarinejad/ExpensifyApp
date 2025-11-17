"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PhoneNumber_1 = require("@libs/PhoneNumber");
var CONST_1 = require("@src/CONST");
/**
 * Decodes the contact method from the route params
 */
function getDecodedContactMethodFromUriParam(contactMethodParam) {
    var _a;
    // We find the number of times the url is encoded based on the last % sign and remove them.
    var lastPercentIndex = contactMethodParam.lastIndexOf('%');
    var encodePercents = contactMethodParam.substring(lastPercentIndex).match(/25/g);
    var numberEncodePercents = (_a = encodePercents === null || encodePercents === void 0 ? void 0 : encodePercents.length) !== null && _a !== void 0 ? _a : 0;
    var beforeAtSign = contactMethodParam.substring(0, lastPercentIndex).replace(CONST_1.default.REGEX.ENCODE_PERCENT_CHARACTER, function (match) {
        if (numberEncodePercents > 0) {
            numberEncodePercents--;
            return '%';
        }
        return match;
    });
    var afterAtSign = contactMethodParam.substring(lastPercentIndex).replace(CONST_1.default.REGEX.ENCODE_PERCENT_CHARACTER, '%');
    return (0, PhoneNumber_1.addSMSDomainIfPhoneNumber)(decodeURIComponent(beforeAtSign + afterAtSign));
}
exports.default = getDecodedContactMethodFromUriParam;
