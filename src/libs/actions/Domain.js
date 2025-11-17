"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDomainValidationCode = getDomainValidationCode;
exports.validateDomain = validateDomain;
exports.resetDomainValidationError = resetDomainValidationError;
var react_native_onyx_1 = require("react-native-onyx");
var API = require("@libs/API");
var types_1 = require("@libs/API/types");
var ErrorUtils_1 = require("@libs/ErrorUtils");
var ONYXKEYS_1 = require("@src/ONYXKEYS");
/**
 * Fetches a validation code that the user is supposed to put in the domain's DNS records to verify it
 */
function getDomainValidationCode(accountID, domainName) {
    var optimisticData = [
        {
            onyxMethod: react_native_onyx_1.default.METHOD.MERGE,
            key: "".concat(ONYXKEYS_1.default.COLLECTION.DOMAIN).concat(accountID),
            value: { isValidateCodeLoading: true, validateCodeError: null },
        },
    ];
    var successData = [
        {
            onyxMethod: react_native_onyx_1.default.METHOD.MERGE,
            key: "".concat(ONYXKEYS_1.default.COLLECTION.DOMAIN).concat(accountID),
            value: { isValidateCodeLoading: null },
        },
    ];
    var failureData = [
        {
            onyxMethod: react_native_onyx_1.default.METHOD.MERGE,
            key: "".concat(ONYXKEYS_1.default.COLLECTION.DOMAIN).concat(accountID),
            value: {
                isValidateCodeLoading: null,
                validateCodeError: (0, ErrorUtils_1.getMicroSecondOnyxErrorWithTranslationKey)('domain.verifyDomain.codeFetchError'),
            },
        },
    ];
    API.read(types_1.READ_COMMANDS.GET_DOMAIN_VALIDATE_CODE, { domainName: domainName }, { optimisticData: optimisticData, successData: successData, failureData: failureData });
}
/**
 * Checks if the validation code is present in the domain's DNS records to mark the domain as validated and the user as a verified admin
 */
function validateDomain(accountID, domainName) {
    var optimisticData = [
        {
            onyxMethod: react_native_onyx_1.default.METHOD.MERGE,
            key: "".concat(ONYXKEYS_1.default.COLLECTION.DOMAIN).concat(accountID),
            value: { isValidationPending: true, domainValidationError: null },
        },
    ];
    var successData = [
        {
            onyxMethod: react_native_onyx_1.default.METHOD.MERGE,
            key: "".concat(ONYXKEYS_1.default.COLLECTION.DOMAIN).concat(accountID),
            value: { isValidationPending: null },
        },
    ];
    var failureData = [
        {
            onyxMethod: react_native_onyx_1.default.METHOD.MERGE,
            key: "".concat(ONYXKEYS_1.default.COLLECTION.DOMAIN).concat(accountID),
            value: {
                isValidationPending: null,
                domainValidationError: (0, ErrorUtils_1.getMicroSecondOnyxErrorWithTranslationKey)('domain.verifyDomain.genericError'),
            },
        },
    ];
    API.write(types_1.WRITE_COMMANDS.VALIDATE_DOMAIN, { domainName: domainName }, { optimisticData: optimisticData, successData: successData, failureData: failureData });
}
function resetDomainValidationError(accountID) {
    react_native_onyx_1.default.merge("".concat(ONYXKEYS_1.default.COLLECTION.DOMAIN).concat(accountID), { domainValidationError: null });
}
