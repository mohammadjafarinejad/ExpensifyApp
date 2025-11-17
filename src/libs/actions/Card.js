"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestReplacementExpensifyCard = requestReplacementExpensifyCard;
exports.activatePhysicalExpensifyCard = activatePhysicalExpensifyCard;
exports.clearCardListErrors = clearCardListErrors;
exports.clearReportVirtualCardFraudForm = clearReportVirtualCardFraudForm;
exports.clearIssueNewCardError = clearIssueNewCardError;
exports.reportVirtualExpensifyCardFraud = reportVirtualExpensifyCardFraud;
exports.revealVirtualCardDetails = revealVirtualCardDetails;
exports.updateSettlementFrequency = updateSettlementFrequency;
exports.setIssueNewCardStepAndData = setIssueNewCardStepAndData;
exports.clearIssueNewCardFlow = clearIssueNewCardFlow;
exports.updateExpensifyCardLimit = updateExpensifyCardLimit;
exports.updateExpensifyCardTitle = updateExpensifyCardTitle;
exports.updateSettlementAccount = updateSettlementAccount;
exports.startIssueNewCardFlow = startIssueNewCardFlow;
exports.configureExpensifyCardsForPolicy = configureExpensifyCardsForPolicy;
exports.issueExpensifyCard = issueExpensifyCard;
exports.openCardDetailsPage = openCardDetailsPage;
exports.clearActivatedCardPin = clearActivatedCardPin;
exports.toggleContinuousReconciliation = toggleContinuousReconciliation;
exports.updateExpensifyCardLimitType = updateExpensifyCardLimitType;
exports.updateSelectedFeed = updateSelectedFeed;
exports.updateSelectedExpensifyCardFeed = updateSelectedExpensifyCardFeed;
exports.deactivateCard = deactivateCard;
exports.getCardDefaultName = getCardDefaultName;
exports.queueExpensifyCardForBilling = queueExpensifyCardForBilling;
exports.clearIssueNewCardFormData = clearIssueNewCardFormData;
exports.resolveFraudAlert = resolveFraudAlert;
var react_native_onyx_1 = require("react-native-onyx");
var API = require("@libs/API");
var types_1 = require("@libs/API/types");
var ErrorUtils = require("@libs/ErrorUtils");
var Log_1 = require("@libs/Log");
var NetworkStore = require("@libs/Network/NetworkStore");
var PolicyUtils = require("@libs/PolicyUtils");
var CONST_1 = require("@src/CONST");
var ONYXKEYS_1 = require("@src/ONYXKEYS");
function reportVirtualExpensifyCardFraud(card, validateCode) {
    var _a;
    var cardID = (_a = card === null || card === void 0 ? void 0 : card.cardID) !== null && _a !== void 0 ? _a : CONST_1.default.DEFAULT_NUMBER_ID;
    var optimisticData = [
        // @ts-expect-error - will be solved in https://github.com/Expensify/App/issues/73830
        {
            onyxMethod: react_native_onyx_1.default.METHOD.MERGE,
            key: ONYXKEYS_1.default.FORMS.REPORT_VIRTUAL_CARD_FRAUD,
            value: {
                cardID: cardID,
                isLoading: true,
                errors: null,
            },
        },
        {
            onyxMethod: react_native_onyx_1.default.METHOD.MERGE,
            key: ONYXKEYS_1.default.ACCOUNT,
            value: { isLoading: true },
        },
    ];
    var successData = [
        {
            onyxMethod: react_native_onyx_1.default.METHOD.MERGE,
            key: ONYXKEYS_1.default.FORMS.REPORT_VIRTUAL_CARD_FRAUD,
            value: {
                isLoading: false,
            },
        },
        {
            onyxMethod: react_native_onyx_1.default.METHOD.MERGE,
            key: ONYXKEYS_1.default.ACCOUNT,
            value: { isLoading: false },
        },
    ];
    var failureData = [
        {
            onyxMethod: react_native_onyx_1.default.METHOD.MERGE,
            key: ONYXKEYS_1.default.FORMS.REPORT_VIRTUAL_CARD_FRAUD,
            value: {
                isLoading: false,
            },
        },
        {
            onyxMethod: react_native_onyx_1.default.METHOD.MERGE,
            key: ONYXKEYS_1.default.ACCOUNT,
            value: { isLoading: false },
        },
    ];
    var parameters = {
        cardID: cardID,
        validateCode: validateCode,
    };
    API.write(types_1.WRITE_COMMANDS.REPORT_VIRTUAL_EXPENSIFY_CARD_FRAUD, parameters, {
        optimisticData: optimisticData,
        successData: successData,
        failureData: failureData,
    });
}
/**
 * Call the API to deactivate the card and request a new one
 * @param cardID - id of the card that is going to be replaced
 * @param reason - reason for replacement
 */
function requestReplacementExpensifyCard(cardID, reason, validateCode) {
    var optimisticData = [
        {
            onyxMethod: react_native_onyx_1.default.METHOD.MERGE,
            key: ONYXKEYS_1.default.FORMS.REPORT_PHYSICAL_CARD_FORM,
            value: {
                isLoading: true,
                errors: null,
            },
        },
        {
            onyxMethod: react_native_onyx_1.default.METHOD.MERGE,
            key: ONYXKEYS_1.default.VALIDATE_ACTION_CODE,
            value: {
                validateCodeSent: null,
            },
        },
    ];
    var successData = [
        {
            onyxMethod: react_native_onyx_1.default.METHOD.MERGE,
            key: ONYXKEYS_1.default.FORMS.REPORT_PHYSICAL_CARD_FORM,
            value: {
                isLoading: false,
            },
        },
    ];
    var failureData = [
        {
            onyxMethod: react_native_onyx_1.default.METHOD.MERGE,
            key: ONYXKEYS_1.default.FORMS.REPORT_PHYSICAL_CARD_FORM,
            value: {
                isLoading: false,
            },
        },
    ];
    var parameters = {
        cardID: cardID,
        reason: reason,
        validateCode: validateCode,
    };
    API.write(types_1.WRITE_COMMANDS.REQUEST_REPLACEMENT_EXPENSIFY_CARD, parameters, {
        optimisticData: optimisticData,
        successData: successData,
        failureData: failureData,
    });
}
/**
 * Activates the physical Expensify card based on the last four digits of the card number
 */
function activatePhysicalExpensifyCard(cardLastFourDigits, cardID) {
    var _a, _b, _c;
    var optimisticData = [
        {
            onyxMethod: react_native_onyx_1.default.METHOD.MERGE,
            key: ONYXKEYS_1.default.CARD_LIST,
            value: (_a = {},
                _a[cardID] = {
                    errors: null,
                    isLoading: true,
                },
                _a),
        },
    ];
    var successData = [
        {
            onyxMethod: react_native_onyx_1.default.METHOD.MERGE,
            key: ONYXKEYS_1.default.CARD_LIST,
            value: (_b = {},
                _b[cardID] = {
                    isLoading: false,
                },
                _b),
        },
    ];
    var failureData = [
        {
            onyxMethod: react_native_onyx_1.default.METHOD.MERGE,
            key: ONYXKEYS_1.default.CARD_LIST,
            value: (_c = {},
                _c[cardID] = {
                    isLoading: false,
                },
                _c),
        },
    ];
    var parameters = {
        cardLastFourDigits: cardLastFourDigits,
        cardID: cardID,
    };
    // eslint-disable-next-line rulesdir/no-api-side-effects-method
    API.makeRequestWithSideEffects(types_1.SIDE_EFFECT_REQUEST_COMMANDS.ACTIVATE_PHYSICAL_EXPENSIFY_CARD, parameters, {
        optimisticData: optimisticData,
        successData: successData,
        failureData: failureData,
    }).then(function (response) {
        if (!response) {
            return;
        }
        if (response.pin) {
            react_native_onyx_1.default.set(ONYXKEYS_1.default.ACTIVATED_CARD_PIN, response.pin);
        }
    });
}
/**
 * Clears errors for a specific cardID
 */
function clearCardListErrors(cardID) {
    var _a;
    react_native_onyx_1.default.merge(ONYXKEYS_1.default.CARD_LIST, (_a = {}, _a[cardID] = { errors: null, isLoading: false }, _a));
}
/**
 * Clears the PIN for an activated card
 */
function clearActivatedCardPin() {
    react_native_onyx_1.default.set(ONYXKEYS_1.default.ACTIVATED_CARD_PIN, '');
}
function clearReportVirtualCardFraudForm() {
    react_native_onyx_1.default.merge(ONYXKEYS_1.default.FORMS.REPORT_VIRTUAL_CARD_FRAUD, { cardID: null, isLoading: false, errors: null });
}
/**
 * Makes an API call to get virtual card details (pan, cvv, expiration date, address)
 * This function purposefully uses `makeRequestWithSideEffects` method. For security reason
 * card details cannot be persisted in Onyx and have to be asked for each time a user want's to
 * reveal them.
 *
 * @param cardID - virtual card ID
 *
 * @returns promise with card details object
 */
function revealVirtualCardDetails(cardID, validateCode) {
    return new Promise(function (resolve, reject) {
        var parameters = { cardID: cardID, validateCode: validateCode };
        var optimisticData = [
            {
                onyxMethod: react_native_onyx_1.default.METHOD.MERGE,
                key: ONYXKEYS_1.default.ACCOUNT,
                value: { isLoading: true },
            },
        ];
        var successData = [
            {
                onyxMethod: react_native_onyx_1.default.METHOD.MERGE,
                key: ONYXKEYS_1.default.ACCOUNT,
                value: { isLoading: false },
            },
        ];
        var failureData = [
            {
                onyxMethod: react_native_onyx_1.default.METHOD.MERGE,
                key: ONYXKEYS_1.default.ACCOUNT,
                value: { isLoading: false },
            },
        ];
        // eslint-disable-next-line rulesdir/no-api-side-effects-method
        API.makeRequestWithSideEffects(types_1.SIDE_EFFECT_REQUEST_COMMANDS.REVEAL_EXPENSIFY_CARD_DETAILS, parameters, {
            optimisticData: optimisticData,
            successData: successData,
            failureData: failureData,
        })
            .then(function (response) {
            if ((response === null || response === void 0 ? void 0 : response.jsonCode) !== CONST_1.default.JSON_CODE.SUCCESS) {
                if ((response === null || response === void 0 ? void 0 : response.jsonCode) === CONST_1.default.JSON_CODE.INCORRECT_MAGIC_CODE) {
                    // eslint-disable-next-line prefer-promise-reject-errors
                    reject('validateCodeForm.error.incorrectMagicCode');
                    return;
                }
                if ((response === null || response === void 0 ? void 0 : response.jsonCode) === 404) {
                    // eslint-disable-next-line prefer-promise-reject-errors
                    reject('cardPage.missingPrivateDetails');
                    return;
                }
                if ((response === null || response === void 0 ? void 0 : response.jsonCode) === 500) {
                    // eslint-disable-next-line prefer-promise-reject-errors
                    reject('cardPage.unexpectedError');
                    return;
                }
                // eslint-disable-next-line prefer-promise-reject-errors
                reject('cardPage.cardDetailsLoadingFailure');
                return;
            }
            resolve(response);
        })
            // eslint-disable-next-line prefer-promise-reject-errors
            .catch(function () { return reject('cardPage.cardDetailsLoadingFailure'); });
    });
}
function updateSettlementFrequency(workspaceAccountID, settlementFrequency, currentFrequency) {
    var monthlySettlementDate = settlementFrequency === CONST_1.default.EXPENSIFY_CARD.FREQUENCY_SETTING.DAILY ? null : new Date();
    var optimisticData = [
        {
            onyxMethod: react_native_onyx_1.default.METHOD.MERGE,
            key: "".concat(ONYXKEYS_1.default.COLLECTION.PRIVATE_EXPENSIFY_CARD_SETTINGS).concat(workspaceAccountID),
            value: {
                monthlySettlementDate: monthlySettlementDate,
            },
        },
    ];
    var successData = [
        {
            onyxMethod: react_native_onyx_1.default.METHOD.MERGE,
            key: "".concat(ONYXKEYS_1.default.COLLECTION.PRIVATE_EXPENSIFY_CARD_SETTINGS).concat(workspaceAccountID),
            value: {
                monthlySettlementDate: monthlySettlementDate,
            },
        },
    ];
    var failureData = [
        {
            onyxMethod: react_native_onyx_1.default.METHOD.MERGE,
            key: "".concat(ONYXKEYS_1.default.COLLECTION.PRIVATE_EXPENSIFY_CARD_SETTINGS).concat(workspaceAccountID),
            value: {
                monthlySettlementDate: currentFrequency,
            },
        },
    ];
    var parameters = {
        workspaceAccountID: workspaceAccountID,
        settlementFrequency: settlementFrequency,
    };
    API.write(types_1.WRITE_COMMANDS.UPDATE_CARD_SETTLEMENT_FREQUENCY, parameters, { optimisticData: optimisticData, successData: successData, failureData: failureData });
}
function updateSettlementAccount(domainName, workspaceAccountID, policyID, settlementBankAccountID, currentSettlementBankAccountID) {
    if (!settlementBankAccountID) {
        return;
    }
    var optimisticData = [
        {
            onyxMethod: react_native_onyx_1.default.METHOD.MERGE,
            key: "".concat(ONYXKEYS_1.default.COLLECTION.PRIVATE_EXPENSIFY_CARD_SETTINGS).concat(workspaceAccountID),
            value: {
                paymentBankAccountID: settlementBankAccountID,
                isLoading: true,
            },
        },
    ];
    var successData = [
        {
            onyxMethod: react_native_onyx_1.default.METHOD.MERGE,
            key: "".concat(ONYXKEYS_1.default.COLLECTION.PRIVATE_EXPENSIFY_CARD_SETTINGS).concat(workspaceAccountID),
            value: {
                paymentBankAccountID: settlementBankAccountID,
                isLoading: false,
            },
        },
    ];
    var failureData = [
        {
            onyxMethod: react_native_onyx_1.default.METHOD.MERGE,
            key: "".concat(ONYXKEYS_1.default.COLLECTION.PRIVATE_EXPENSIFY_CARD_SETTINGS).concat(workspaceAccountID),
            value: {
                paymentBankAccountID: currentSettlementBankAccountID,
                isLoading: false,
                errors: ErrorUtils.getMicroSecondOnyxErrorWithTranslationKey('common.genericErrorMessage'),
            },
        },
    ];
    var parameters = {
        domainName: domainName,
        settlementBankAccountID: settlementBankAccountID,
    };
    API.write(types_1.WRITE_COMMANDS.UPDATE_CARD_SETTLEMENT_ACCOUNT, parameters, { optimisticData: optimisticData, successData: successData, failureData: failureData });
}
function getCardDefaultName(userName) {
    if (!userName) {
        return '';
    }
    return "".concat(userName, "'s Card");
}
function setIssueNewCardStepAndData(_a) {
    var data = _a.data, isEditing = _a.isEditing, step = _a.step, policyID = _a.policyID, isChangeAssigneeDisabled = _a.isChangeAssigneeDisabled;
    react_native_onyx_1.default.merge("".concat(ONYXKEYS_1.default.COLLECTION.ISSUE_NEW_EXPENSIFY_CARD).concat(policyID), {
        data: data,
        isEditing: isEditing,
        currentStep: step,
        errors: null,
        isChangeAssigneeDisabled: isChangeAssigneeDisabled,
    });
}
function clearIssueNewCardFlow(policyID) {
    react_native_onyx_1.default.set("".concat(ONYXKEYS_1.default.COLLECTION.ISSUE_NEW_EXPENSIFY_CARD).concat(policyID), {
        currentStep: null,
        data: {},
    });
}
function clearIssueNewCardFormData() {
    react_native_onyx_1.default.set(ONYXKEYS_1.default.FORMS.ISSUE_NEW_EXPENSIFY_CARD_FORM, {});
}
function clearIssueNewCardError(policyID) {
    react_native_onyx_1.default.merge("".concat(ONYXKEYS_1.default.COLLECTION.ISSUE_NEW_EXPENSIFY_CARD).concat(policyID), { errors: null });
}
function updateExpensifyCardLimit(workspaceAccountID, cardID, newLimit, newAvailableSpend, oldLimit, oldAvailableSpend, isVirtualCard) {
    var _a, _b, _c;
    var authToken = NetworkStore.getAuthToken();
    if (!authToken) {
        return;
    }
    var optimisticData = [
        {
            onyxMethod: react_native_onyx_1.default.METHOD.MERGE,
            key: "".concat(ONYXKEYS_1.default.COLLECTION.WORKSPACE_CARDS_LIST).concat(workspaceAccountID, "_").concat(CONST_1.default.EXPENSIFY_CARD.BANK),
            value: (_a = {},
                _a[cardID] = {
                    availableSpend: newAvailableSpend,
                    nameValuePairs: {
                        unapprovedExpenseLimit: newLimit,
                        pendingFields: { unapprovedExpenseLimit: CONST_1.default.RED_BRICK_ROAD_PENDING_ACTION.UPDATE },
                    },
                    pendingAction: CONST_1.default.RED_BRICK_ROAD_PENDING_ACTION.UPDATE,
                    pendingFields: { availableSpend: CONST_1.default.RED_BRICK_ROAD_PENDING_ACTION.UPDATE },
                    isLoading: true,
                    errors: null,
                },
                _a),
        },
    ];
    var successData = [
        {
            onyxMethod: react_native_onyx_1.default.METHOD.MERGE,
            key: "".concat(ONYXKEYS_1.default.COLLECTION.WORKSPACE_CARDS_LIST).concat(workspaceAccountID, "_").concat(CONST_1.default.EXPENSIFY_CARD.BANK),
            value: (_b = {},
                _b[cardID] = {
                    nameValuePairs: {
                        pendingFields: { unapprovedExpenseLimit: null },
                    },
                    pendingAction: null,
                    pendingFields: { availableSpend: null },
                    isLoading: false,
                },
                _b),
        },
    ];
    var failureData = [
        {
            onyxMethod: react_native_onyx_1.default.METHOD.MERGE,
            key: "".concat(ONYXKEYS_1.default.COLLECTION.WORKSPACE_CARDS_LIST).concat(workspaceAccountID, "_").concat(CONST_1.default.EXPENSIFY_CARD.BANK),
            value: (_c = {},
                _c[cardID] = {
                    availableSpend: oldAvailableSpend,
                    nameValuePairs: {
                        unapprovedExpenseLimit: oldLimit,
                        pendingFields: { unapprovedExpenseLimit: null },
                    },
                    pendingAction: null,
                    pendingFields: { availableSpend: null },
                    isLoading: false,
                    errors: ErrorUtils.getMicroSecondOnyxErrorWithTranslationKey('common.genericErrorMessage'),
                },
                _c),
        },
    ];
    var parameters = {
        authToken: authToken,
        cardID: cardID,
        limit: newLimit,
        isVirtualCard: isVirtualCard !== null && isVirtualCard !== void 0 ? isVirtualCard : false,
    };
    API.write(types_1.WRITE_COMMANDS.UPDATE_EXPENSIFY_CARD_LIMIT, parameters, { optimisticData: optimisticData, successData: successData, failureData: failureData });
}
function updateExpensifyCardTitle(workspaceAccountID, cardID, newCardTitle, oldCardTitle) {
    var _a, _b, _c;
    var authToken = NetworkStore.getAuthToken();
    if (!authToken) {
        return;
    }
    var optimisticData = [
        {
            onyxMethod: react_native_onyx_1.default.METHOD.MERGE,
            key: "".concat(ONYXKEYS_1.default.COLLECTION.WORKSPACE_CARDS_LIST).concat(workspaceAccountID, "_").concat(CONST_1.default.EXPENSIFY_CARD.BANK),
            value: (_a = {},
                _a[cardID] = {
                    nameValuePairs: {
                        cardTitle: newCardTitle,
                        pendingFields: { cardTitle: CONST_1.default.RED_BRICK_ROAD_PENDING_ACTION.UPDATE },
                    },
                    pendingAction: CONST_1.default.RED_BRICK_ROAD_PENDING_ACTION.UPDATE,
                    isLoading: true,
                    errors: null,
                },
                _a),
        },
    ];
    var successData = [
        {
            onyxMethod: react_native_onyx_1.default.METHOD.MERGE,
            key: "".concat(ONYXKEYS_1.default.COLLECTION.WORKSPACE_CARDS_LIST).concat(workspaceAccountID, "_").concat(CONST_1.default.EXPENSIFY_CARD.BANK),
            value: (_b = {},
                _b[cardID] = {
                    nameValuePairs: {
                        pendingFields: { cardTitle: null },
                    },
                    pendingAction: null,
                    isLoading: false,
                },
                _b),
        },
    ];
    var failureData = [
        {
            onyxMethod: react_native_onyx_1.default.METHOD.MERGE,
            key: "".concat(ONYXKEYS_1.default.COLLECTION.WORKSPACE_CARDS_LIST).concat(workspaceAccountID, "_").concat(CONST_1.default.EXPENSIFY_CARD.BANK),
            value: (_c = {},
                _c[cardID] = {
                    nameValuePairs: {
                        cardTitle: oldCardTitle,
                        pendingFields: { cardTitle: null },
                    },
                    pendingAction: null,
                    isLoading: false,
                    errors: ErrorUtils.getMicroSecondOnyxErrorWithTranslationKey('common.genericErrorMessage'),
                },
                _c),
        },
    ];
    var parameters = {
        authToken: authToken,
        cardID: cardID,
        cardTitle: newCardTitle,
    };
    API.write(types_1.WRITE_COMMANDS.UPDATE_EXPENSIFY_CARD_TITLE, parameters, { optimisticData: optimisticData, successData: successData, failureData: failureData });
}
function updateExpensifyCardLimitType(workspaceAccountID, cardID, newLimitType, oldLimitType) {
    var _a, _b, _c;
    var authToken = NetworkStore.getAuthToken();
    if (!authToken) {
        return;
    }
    var optimisticData = [
        {
            onyxMethod: react_native_onyx_1.default.METHOD.MERGE,
            key: "".concat(ONYXKEYS_1.default.COLLECTION.WORKSPACE_CARDS_LIST).concat(workspaceAccountID, "_").concat(CONST_1.default.EXPENSIFY_CARD.BANK),
            value: (_a = {},
                _a[cardID] = {
                    nameValuePairs: {
                        limitType: newLimitType,
                        pendingFields: { limitType: CONST_1.default.RED_BRICK_ROAD_PENDING_ACTION.UPDATE },
                    },
                    pendingAction: CONST_1.default.RED_BRICK_ROAD_PENDING_ACTION.UPDATE,
                    pendingFields: { availableSpend: CONST_1.default.RED_BRICK_ROAD_PENDING_ACTION.UPDATE },
                    isLoading: true,
                    errors: null,
                },
                _a),
        },
    ];
    var successData = [
        {
            onyxMethod: react_native_onyx_1.default.METHOD.MERGE,
            key: "".concat(ONYXKEYS_1.default.COLLECTION.WORKSPACE_CARDS_LIST).concat(workspaceAccountID, "_").concat(CONST_1.default.EXPENSIFY_CARD.BANK),
            value: (_b = {},
                _b[cardID] = {
                    isLoading: false,
                    nameValuePairs: {
                        pendingFields: { limitType: null },
                    },
                    pendingAction: null,
                    pendingFields: { availableSpend: null },
                },
                _b),
        },
    ];
    var failureData = [
        {
            onyxMethod: react_native_onyx_1.default.METHOD.MERGE,
            key: "".concat(ONYXKEYS_1.default.COLLECTION.WORKSPACE_CARDS_LIST).concat(workspaceAccountID, "_").concat(CONST_1.default.EXPENSIFY_CARD.BANK),
            value: (_c = {},
                _c[cardID] = {
                    nameValuePairs: {
                        limitType: oldLimitType,
                        pendingFields: { limitType: null },
                    },
                    pendingFields: { availableSpend: null },
                    pendingAction: null,
                    isLoading: false,
                    errors: ErrorUtils.getMicroSecondOnyxErrorWithTranslationKey('common.genericErrorMessage'),
                },
                _c),
        },
    ];
    var parameters = {
        authToken: authToken,
        cardID: cardID,
        limitType: newLimitType,
    };
    API.write(types_1.WRITE_COMMANDS.UPDATE_EXPENSIFY_CARD_LIMIT_TYPE, parameters, { optimisticData: optimisticData, successData: successData, failureData: failureData });
}
function deactivateCard(workspaceAccountID, card) {
    var _a, _b, _c, _d;
    var _e;
    var authToken = NetworkStore.getAuthToken();
    var cardID = (_e = card === null || card === void 0 ? void 0 : card.cardID) !== null && _e !== void 0 ? _e : CONST_1.default.DEFAULT_NUMBER_ID;
    if (!authToken) {
        return;
    }
    var optimisticData = [
        {
            onyxMethod: react_native_onyx_1.default.METHOD.MERGE,
            key: "".concat(ONYXKEYS_1.default.COLLECTION.WORKSPACE_CARDS_LIST).concat(workspaceAccountID, "_").concat(CONST_1.default.EXPENSIFY_CARD.BANK),
            value: (_a = {},
                _a[cardID] = null,
                _a),
        },
        {
            onyxMethod: react_native_onyx_1.default.METHOD.MERGE,
            key: ONYXKEYS_1.default.CARD_LIST,
            value: (_b = {},
                _b[cardID] = null,
                _b),
        },
    ];
    var failureData = [
        {
            onyxMethod: react_native_onyx_1.default.METHOD.MERGE,
            key: "".concat(ONYXKEYS_1.default.COLLECTION.WORKSPACE_CARDS_LIST).concat(workspaceAccountID, "_").concat(CONST_1.default.EXPENSIFY_CARD.BANK),
            value: (_c = {},
                _c[cardID] = __assign(__assign({}, card), { errors: ErrorUtils.getMicroSecondOnyxErrorWithTranslationKey('common.genericErrorMessage') }),
                _c),
        },
        {
            onyxMethod: react_native_onyx_1.default.METHOD.MERGE,
            key: ONYXKEYS_1.default.CARD_LIST,
            value: (_d = {},
                _d[cardID] = __assign(__assign({}, card), { errors: ErrorUtils.getMicroSecondOnyxErrorWithTranslationKey('common.genericErrorMessage') }),
                _d),
        },
    ];
    var parameters = {
        authToken: authToken,
        cardID: cardID,
    };
    API.write(types_1.WRITE_COMMANDS.CARD_DEACTIVATE, parameters, { optimisticData: optimisticData, failureData: failureData });
}
function startIssueNewCardFlow(policyID) {
    var parameters = {
        policyID: policyID,
    };
    API.read(types_1.READ_COMMANDS.START_ISSUE_NEW_CARD_FLOW, parameters);
}
function configureExpensifyCardsForPolicy(policyID, bankAccountID) {
    if (!bankAccountID) {
        return;
    }
    var workspaceAccountID = PolicyUtils.getWorkspaceAccountID(policyID);
    var optimisticData = [
        {
            onyxMethod: react_native_onyx_1.default.METHOD.MERGE,
            key: "".concat(ONYXKEYS_1.default.COLLECTION.PRIVATE_EXPENSIFY_CARD_SETTINGS).concat(workspaceAccountID),
            value: {
                isLoading: true,
            },
        },
        {
            onyxMethod: react_native_onyx_1.default.METHOD.MERGE,
            key: "".concat(ONYXKEYS_1.default.COLLECTION.EXPENSIFY_CARD_BANK_ACCOUNT_METADATA).concat(workspaceAccountID),
            value: {
                isLoading: true,
                isSuccess: false,
            },
        },
    ];
    var successData = [
        {
            onyxMethod: react_native_onyx_1.default.METHOD.MERGE,
            key: "".concat(ONYXKEYS_1.default.COLLECTION.PRIVATE_EXPENSIFY_CARD_SETTINGS).concat(workspaceAccountID),
            value: {
                isLoading: false,
            },
        },
        {
            onyxMethod: react_native_onyx_1.default.METHOD.MERGE,
            key: "".concat(ONYXKEYS_1.default.COLLECTION.EXPENSIFY_CARD_BANK_ACCOUNT_METADATA).concat(workspaceAccountID),
            value: {
                isLoading: false,
                isSuccess: true,
            },
        },
    ];
    var failureData = [
        {
            onyxMethod: react_native_onyx_1.default.METHOD.MERGE,
            key: "".concat(ONYXKEYS_1.default.COLLECTION.PRIVATE_EXPENSIFY_CARD_SETTINGS).concat(workspaceAccountID),
            value: {
                isLoading: false,
                errors: ErrorUtils.getMicroSecondOnyxErrorWithTranslationKey('common.genericErrorMessage'),
            },
        },
        {
            onyxMethod: react_native_onyx_1.default.METHOD.MERGE,
            key: "".concat(ONYXKEYS_1.default.COLLECTION.EXPENSIFY_CARD_BANK_ACCOUNT_METADATA).concat(workspaceAccountID),
            value: {
                isLoading: false,
                isSuccess: false,
            },
        },
    ];
    var parameters = {
        policyID: policyID,
        bankAccountID: bankAccountID,
    };
    API.write(types_1.WRITE_COMMANDS.CONFIGURE_EXPENSIFY_CARDS_FOR_POLICY, parameters, {
        optimisticData: optimisticData,
        successData: successData,
        failureData: failureData,
    });
}
function issueExpensifyCard(domainAccountID, policyID, feedCountry, validateCode, data) {
    if (!data) {
        return;
    }
    var assigneeEmail = data.assigneeEmail, limit = data.limit, limitType = data.limitType, cardTitle = data.cardTitle, cardType = data.cardType;
    var optimisticData = [
        {
            onyxMethod: react_native_onyx_1.default.METHOD.MERGE,
            key: "".concat(ONYXKEYS_1.default.COLLECTION.ISSUE_NEW_EXPENSIFY_CARD).concat(policyID),
            value: {
                isLoading: true,
                errors: null,
                isSuccessful: null,
            },
        },
    ];
    var successData = [
        {
            onyxMethod: react_native_onyx_1.default.METHOD.MERGE,
            key: "".concat(ONYXKEYS_1.default.COLLECTION.ISSUE_NEW_EXPENSIFY_CARD).concat(policyID),
            value: {
                isLoading: false,
                isSuccessful: true,
            },
        },
    ];
    var failureData = [
        {
            onyxMethod: react_native_onyx_1.default.METHOD.MERGE,
            key: "".concat(ONYXKEYS_1.default.COLLECTION.ISSUE_NEW_EXPENSIFY_CARD).concat(policyID),
            value: {
                isLoading: false,
                errors: ErrorUtils.getMicroSecondOnyxErrorWithTranslationKey('common.genericErrorMessage'),
            },
        },
    ];
    var parameters = {
        assigneeEmail: assigneeEmail,
        limit: limit,
        limitType: limitType,
        cardTitle: cardTitle,
        validateCode: validateCode,
        domainAccountID: domainAccountID,
    };
    if (cardType === CONST_1.default.EXPENSIFY_CARD.CARD_TYPE.PHYSICAL) {
        API.write(types_1.WRITE_COMMANDS.CREATE_EXPENSIFY_CARD, __assign(__assign({}, parameters), { feedCountry: feedCountry }), {
            optimisticData: optimisticData,
            successData: successData,
            failureData: failureData,
        });
        return;
    }
    // eslint-disable-next-line rulesdir/no-multiple-api-calls
    API.write(types_1.WRITE_COMMANDS.CREATE_ADMIN_ISSUED_VIRTUAL_CARD, __assign(__assign({}, parameters), { policyID: policyID }), {
        optimisticData: optimisticData,
        successData: successData,
        failureData: failureData,
    });
}
function openCardDetailsPage(cardID) {
    var authToken = NetworkStore.getAuthToken();
    if (!authToken) {
        return;
    }
    var parameters = {
        authToken: authToken,
        cardID: cardID,
    };
    API.read(types_1.READ_COMMANDS.OPEN_CARD_DETAILS_PAGE, parameters);
}
function toggleContinuousReconciliation(workspaceAccountID, shouldUseContinuousReconciliation, connectionName, oldConnectionName) {
    var parameters = shouldUseContinuousReconciliation
        ? {
            workspaceAccountID: workspaceAccountID,
            shouldUseContinuousReconciliation: shouldUseContinuousReconciliation,
            expensifyCardContinuousReconciliationConnection: connectionName,
        }
        : {
            workspaceAccountID: workspaceAccountID,
            shouldUseContinuousReconciliation: shouldUseContinuousReconciliation,
        };
    var optimisticData = [
        {
            onyxMethod: react_native_onyx_1.default.METHOD.MERGE,
            key: "".concat(ONYXKEYS_1.default.COLLECTION.EXPENSIFY_CARD_USE_CONTINUOUS_RECONCILIATION).concat(workspaceAccountID),
            value: shouldUseContinuousReconciliation,
        },
        {
            onyxMethod: react_native_onyx_1.default.METHOD.MERGE,
            key: "".concat(ONYXKEYS_1.default.COLLECTION.EXPENSIFY_CARD_CONTINUOUS_RECONCILIATION_CONNECTION).concat(workspaceAccountID),
            value: connectionName,
        },
    ];
    var successData = [
        {
            onyxMethod: react_native_onyx_1.default.METHOD.MERGE,
            key: "".concat(ONYXKEYS_1.default.COLLECTION.EXPENSIFY_CARD_USE_CONTINUOUS_RECONCILIATION).concat(workspaceAccountID),
            value: shouldUseContinuousReconciliation,
        },
        {
            onyxMethod: react_native_onyx_1.default.METHOD.MERGE,
            key: "".concat(ONYXKEYS_1.default.COLLECTION.EXPENSIFY_CARD_CONTINUOUS_RECONCILIATION_CONNECTION).concat(workspaceAccountID),
            value: connectionName,
        },
    ];
    var failureData = [
        {
            onyxMethod: react_native_onyx_1.default.METHOD.MERGE,
            key: "".concat(ONYXKEYS_1.default.COLLECTION.EXPENSIFY_CARD_USE_CONTINUOUS_RECONCILIATION).concat(workspaceAccountID),
            value: !shouldUseContinuousReconciliation,
        },
        {
            onyxMethod: react_native_onyx_1.default.METHOD.MERGE,
            key: "".concat(ONYXKEYS_1.default.COLLECTION.EXPENSIFY_CARD_CONTINUOUS_RECONCILIATION_CONNECTION).concat(workspaceAccountID),
            value: oldConnectionName !== null && oldConnectionName !== void 0 ? oldConnectionName : null,
        },
    ];
    API.write(types_1.WRITE_COMMANDS.TOGGLE_CARD_CONTINUOUS_RECONCILIATION, parameters, {
        optimisticData: optimisticData,
        successData: successData,
        failureData: failureData,
    });
}
function updateSelectedFeed(feed, policyID) {
    if (!policyID) {
        return;
    }
    react_native_onyx_1.default.update([
        {
            onyxMethod: react_native_onyx_1.default.METHOD.MERGE,
            key: "".concat(ONYXKEYS_1.default.COLLECTION.LAST_SELECTED_FEED).concat(policyID),
            value: feed,
        },
    ]);
}
function updateSelectedExpensifyCardFeed(feed, policyID) {
    if (!policyID) {
        return;
    }
    react_native_onyx_1.default.update([
        {
            onyxMethod: react_native_onyx_1.default.METHOD.MERGE,
            key: "".concat(ONYXKEYS_1.default.COLLECTION.LAST_SELECTED_EXPENSIFY_CARD_FEED).concat(policyID),
            value: feed,
        },
    ]);
}
function queueExpensifyCardForBilling(feedCountry, domainAccountID) {
    var parameters = {
        feedCountry: feedCountry,
        domainAccountID: domainAccountID,
    };
    API.write(types_1.WRITE_COMMANDS.QUEUE_EXPENSIFY_CARD_FOR_BILLING, parameters);
}
/**
 * Resolves a fraud alert for a given card.
 * When the user clicks on the whisper it sets the optimistic data to the resolution and calls the API
 */
function resolveFraudAlert(cardID, isFraud, reportID, reportActionID) {
    var _a, _b, _c;
    if (!reportID || !reportActionID || !cardID) {
        Log_1.default.hmmm('[resolveFraudAlert] Missing required parameters');
        return;
    }
    var resolution = isFraud ? CONST_1.default.CARD_FRAUD_ALERT_RESOLUTION.FRAUD : CONST_1.default.CARD_FRAUD_ALERT_RESOLUTION.RECOGNIZED;
    var optimisticData = [
        {
            onyxMethod: react_native_onyx_1.default.METHOD.MERGE,
            key: "".concat(ONYXKEYS_1.default.COLLECTION.REPORT_ACTIONS).concat(reportID),
            value: (_a = {},
                _a[reportActionID] = {
                    originalMessage: {
                        resolution: resolution,
                    },
                    pendingAction: CONST_1.default.RED_BRICK_ROAD_PENDING_ACTION.UPDATE,
                },
                _a),
        },
    ];
    var successData = [
        {
            onyxMethod: react_native_onyx_1.default.METHOD.MERGE,
            key: "".concat(ONYXKEYS_1.default.COLLECTION.REPORT_ACTIONS).concat(reportID),
            value: (_b = {},
                _b[reportActionID] = {
                    pendingAction: null,
                },
                _b),
        },
    ];
    var failureData = [
        {
            onyxMethod: react_native_onyx_1.default.METHOD.MERGE,
            key: "".concat(ONYXKEYS_1.default.COLLECTION.REPORT_ACTIONS).concat(reportID),
            value: (_c = {},
                _c[reportActionID] = {
                    originalMessage: {
                        resolution: null,
                    },
                    pendingAction: null,
                    errors: ErrorUtils.getMicroSecondOnyxErrorWithTranslationKey('common.genericErrorMessage'),
                },
                _c),
        },
    ];
    var parameters = {
        cardID: cardID,
        isFraud: isFraud,
    };
    API.write(types_1.WRITE_COMMANDS.RESOLVE_FRAUD_ALERT, parameters, { optimisticData: optimisticData, successData: successData, failureData: failureData });
}
