"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
var types_1 = require("@libs/API/types");
var FraudProtection_1 = require("@libs/FraudProtection");
var CONST_1 = require("@src/CONST");
var fraudSignalFactoryByApiCommand = (_a = {},
    _a[types_1.READ_COMMANDS.SIGN_IN_WITH_SUPPORT_AUTH_TOKEN] = function () { return ({ event: CONST_1.FRAUD_PROTECTION_EVENT.START_SUPPORT_SESSION }); },
    _a[types_1.SIDE_EFFECT_REQUEST_COMMANDS.CONNECT_AS_DELEGATE] = function () { return ({ event: CONST_1.FRAUD_PROTECTION_EVENT.START_COPILOT_SESSION }); },
    _a[types_1.SIDE_EFFECT_REQUEST_COMMANDS.DISCONNECT_AS_DELEGATE] = function () { return ({ event: CONST_1.FRAUD_PROTECTION_EVENT.STOP_COPILOT_SESSION }); },
    _a[types_1.WRITE_COMMANDS.CREATE_EXPENSIFY_CARD] = function () { return ({ event: CONST_1.FRAUD_PROTECTION_EVENT.ISSUE_EXPENSIFY_CARD }); },
    _a[types_1.WRITE_COMMANDS.CREATE_ADMIN_ISSUED_VIRTUAL_CARD] = function () { return ({ event: CONST_1.FRAUD_PROTECTION_EVENT.ISSUE_ADMIN_ISSUED_VIRTUAL_CARD }); },
    _a[types_1.WRITE_COMMANDS.REQUEST_REPLACEMENT_EXPENSIFY_CARD] = function () { return ({ event: CONST_1.FRAUD_PROTECTION_EVENT.REQUEST_NEW_PHYSICAL_EXPENSIFY_CARD }); },
    _a[types_1.WRITE_COMMANDS.REPORT_VIRTUAL_EXPENSIFY_CARD_FRAUD] = function () { return ({ event: CONST_1.FRAUD_PROTECTION_EVENT.REQUEST_NEW_VIRTUAL_EXPENSIFY_CARD }); },
    _a[types_1.WRITE_COMMANDS.MERGE_WITH_VALIDATE_CODE] = function () { return ({ event: CONST_1.FRAUD_PROTECTION_EVENT.MERGE_ACCOUNT }); },
    _a[types_1.WRITE_COMMANDS.ENABLE_TWO_FACTOR_AUTH] = function () { return ({ event: CONST_1.FRAUD_PROTECTION_EVENT.TOGGLE_TWO_FACTOR_AUTH }); },
    _a[types_1.WRITE_COMMANDS.ADD_NEW_CONTACT_METHOD] = function () { return ({ event: CONST_1.FRAUD_PROTECTION_EVENT.ADD_SECONDARY_LOGIN }); },
    _a[types_1.WRITE_COMMANDS.UPDATE_EXPENSIFY_CARD_LIMIT] = function (requestData) {
        return (requestData === null || requestData === void 0 ? void 0 : requestData.isVirtualCard) === true ? { event: CONST_1.FRAUD_PROTECTION_EVENT.EDIT_LIMIT_ADMIN_ISSUE_VIRTUAL_CARD } : { event: CONST_1.FRAUD_PROTECTION_EVENT.EDIT_EXPENSIFY_CARD_LIMIT };
    },
    _a[types_1.WRITE_COMMANDS.ADD_PAYMENT_CARD] = function () { return ({ event: CONST_1.FRAUD_PROTECTION_EVENT.ADD_BILLING_CARD }); },
    _a[types_1.WRITE_COMMANDS.ADD_PAYMENT_CARD_SCA] = function () { return ({ event: CONST_1.FRAUD_PROTECTION_EVENT.ADD_BILLING_CARD }); },
    _a[types_1.SIDE_EFFECT_REQUEST_COMMANDS.REVEAL_EXPENSIFY_CARD_DETAILS] = function (_, responseData) {
        var panAttribute = (responseData === null || responseData === void 0 ? void 0 : responseData.pan) ? { key: 'hashed_card_number', value: responseData === null || responseData === void 0 ? void 0 : responseData.pan, shouldHash: true } : undefined;
        return { event: CONST_1.FRAUD_PROTECTION_EVENT.VIEW_VIRTUAL_CARD_PAN, attribute: panAttribute };
    },
    _a[types_1.WRITE_COMMANDS.FINISH_CORPAY_BANK_ACCOUNT_ONBOARDING] = function () { return ({ event: CONST_1.FRAUD_PROTECTION_EVENT.BUSINESS_BANK_ACCOUNT_SETUP }); },
    _a[types_1.WRITE_COMMANDS.CONNECT_BANK_ACCOUNT_MANUALLY] = function () { return ({ event: CONST_1.FRAUD_PROTECTION_EVENT.BUSINESS_BANK_ACCOUNT_SETUP }); },
    _a[types_1.WRITE_COMMANDS.CONNECT_BANK_ACCOUNT_WITH_PLAID] = function () { return ({ event: CONST_1.FRAUD_PROTECTION_EVENT.BUSINESS_BANK_ACCOUNT_SETUP }); },
    _a[types_1.WRITE_COMMANDS.ADD_PERSONAL_BANK_ACCOUNT] = function () { return ({ event: CONST_1.FRAUD_PROTECTION_EVENT.PERSONAL_BANK_ACCOUNT_SETUP }); },
    _a[types_1.WRITE_COMMANDS.INVITE_TO_GROUP_CHAT] = function (_, responseData) {
        var newAccountCountAttribute = (responseData === null || responseData === void 0 ? void 0 : responseData.newAccountCount) ? { key: 'new_account_count', value: responseData === null || responseData === void 0 ? void 0 : responseData.newAccountCount } : undefined;
        return { event: CONST_1.FRAUD_PROTECTION_EVENT.NEW_EMAILS_INVITED, attribute: newAccountCountAttribute };
    },
    _a[types_1.WRITE_COMMANDS.INVITE_TO_ROOM] = function (_, responseData) {
        var newAccountCountAttribute = (responseData === null || responseData === void 0 ? void 0 : responseData.newAccountCount) ? { key: 'new_account_count', value: responseData === null || responseData === void 0 ? void 0 : responseData.newAccountCount } : undefined;
        return { event: CONST_1.FRAUD_PROTECTION_EVENT.NEW_EMAILS_INVITED, attribute: newAccountCountAttribute };
    },
    _a);
var FraudMonitoring = function (response, request) {
    return response.then(function (responseData) {
        if (!responseData || responseData.jsonCode !== CONST_1.default.JSON_CODE.SUCCESS) {
            return responseData;
        }
        var createFraudSignal = fraudSignalFactoryByApiCommand[request.command];
        if (!createFraudSignal) {
            return responseData;
        }
        var signal = createFraudSignal(request.data, responseData);
        FraudProtection_1.default.sendEvent(signal.event);
        if (!signal.attribute) {
            return responseData;
        }
        FraudProtection_1.default.setAttribute(signal.attribute.key, signal.attribute.value, signal.attribute.shouldHash);
        return responseData;
    });
};
exports.default = FraudMonitoring;
