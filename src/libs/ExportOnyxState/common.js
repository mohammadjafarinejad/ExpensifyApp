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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.emailRegex = exports.maskOnyxState = void 0;
var expensify_common_1 = require("expensify-common");
var ONYXKEYS_1 = require("@src/ONYXKEYS");
var MASKING_PATTERN = '***';
var ONYX_KEY_EXPORT_RULES = (_a = {},
    _a[ONYXKEYS_1.default.SESSION] = {
        allowList: ['email', 'accountID', 'loading', 'creationDate', 'errors'],
        maskList: [],
    },
    _a[ONYXKEYS_1.default.STASHED_SESSION] = {
        allowList: ['email', 'accountID', 'loading', 'creationDate', 'errors'],
        maskList: [],
    },
    _a[ONYXKEYS_1.default.CREDENTIALS] = {
        allowList: ['login', 'accountID'],
        maskList: [],
    },
    _a[ONYXKEYS_1.default.STASHED_CREDENTIALS] = {
        allowList: ['login', 'accountID'],
        maskList: [],
    },
    _a[ONYXKEYS_1.default.ACCOUNT] = {
        allowList: ['validated', 'isFromPublicDomain', 'isUsingExpensifyCard'],
        maskList: ['primaryLogin'],
    },
    _a[ONYXKEYS_1.default.PERSONAL_DETAILS_LIST] = {
        allowList: ['accountID', 'timezone', 'status', 'pronouns'],
        maskList: ['firstName', 'lastName', 'displayName', 'avatar', 'login'],
    },
    _a[ONYXKEYS_1.default.COLLECTION.REPORT] = {
        allowList: [
            'reportID',
            'type',
            'chatType',
            'lastActorAccountID',
            'participants',
            'pendingFields',
            'ownerAccountID',
            'stateNum',
            'statusNum',
            'isOwnPolicyExpenseChat',
            'participantAccountIDs',
            'created',
        ],
        maskList: ['reportName', 'description', 'ownerAccountID', 'managerID'],
    },
    _a[ONYXKEYS_1.default.COLLECTION.TRANSACTION] = {
        allowList: ['transactionID', 'reportID', 'created', 'category', 'tag', 'billable'],
        maskList: ['merchant', 'description', 'comment'],
    },
    _a[ONYXKEYS_1.default.COLLECTION.POLICY] = {
        allowList: ['id', 'type', 'role', 'outputCurrency', 'isPolicyExpenseChatEnabled', 'areCategoriesEnabled', 'areTagsEnabled'],
        maskList: ['name', 'avatar'],
    },
    _a[ONYXKEYS_1.default.USER_WALLET] = {
        allowList: ['currentBalance', 'availableBalance', 'tierName'],
        maskList: [],
    },
    _a[ONYXKEYS_1.default.BANK_ACCOUNT_LIST] = {
        allowList: ['accountType', 'currency'],
        maskList: ['accountNumber', 'routingNumber', 'addressName'],
    },
    _a[ONYXKEYS_1.default.CARD_LIST] = {
        allowList: ['accountID', 'bank', 'isVirtual', 'cardID'],
        maskList: ['lastFourPAN', 'nameOnCard'],
    },
    _a);
var onyxKeysToRemove = new Set([
    ONYXKEYS_1.default.NVP_PRIVATE_PUSH_NOTIFICATION_ID,
    ONYXKEYS_1.default.NVP_PRIVATE_STRIPE_CUSTOMER_ID,
    ONYXKEYS_1.default.NVP_PRIVATE_BILLING_DISPUTE_PENDING,
    ONYXKEYS_1.default.NVP_PRIVATE_BILLING_STATUS,
    ONYXKEYS_1.default.PLAID_LINK_TOKEN,
    ONYXKEYS_1.default.ONFIDO_TOKEN,
    ONYXKEYS_1.default.ONFIDO_APPLICANT_ID,
]);
var keysToMask = new Set([
    'addressCity',
    'addressName',
    'addressStreet',
    'addressZipCode',
    'avatar',
    'avatarURL',
    'bank',
    'cardName',
    'cardNumber',
    'childReportName',
    'city',
    'comment',
    'description',
    'displayName',
    'edits',
    'firstName',
    'lastMessageHtml',
    'lastMessageText',
    'lastName',
    'legalFirstName',
    'legalLastName',
    'merchant',
    'modifiedMerchant',
    'name',
    'oldPolicyName',
    'owner',
    'phoneNumber',
    'plaidAccessToken',
    'plaidAccountID',
    'plaidLinkToken',
    'policyAvatar',
    'policyName',
    'primaryLogin',
    'reportName',
    'routingNumber',
    'source',
    'state',
    'street',
    'title',
    'validateCode',
    'zip',
    'zipCode',
]);
var amountKeysToRandomize = new Set(['amount', 'modifiedAmount', 'originalAmount', 'total', 'unheldTotal', 'unheldNonReimbursableTotal', 'nonReimbursableTotal']);
var nodesToFullyMask = new Set(['reservationList']);
var emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;
exports.emailRegex = emailRegex;
var getRandomLetter = function () { return String.fromCharCode(97 + Math.floor(Math.random() * 26)); };
function getRandomString(length) {
    var result = '';
    for (var i = 0; i < length; i++) {
        result += getRandomLetter();
    }
    return result;
}
function maskValuePreservingLength(value) {
    if (typeof value !== 'string') {
        return MASKING_PATTERN;
    }
    return getRandomString(value.length);
}
function randomizeAmount(amount) {
    if (!Number.isFinite(amount)) {
        return 0;
    }
    var randomizedValue = Math.floor(Math.random() * 999999) + 1;
    return amount < 0 ? -randomizedValue : randomizedValue;
}
function stringContainsEmail(text) {
    return emailRegex.test(text);
}
function extractEmail(text) {
    var match = text.match(emailRegex);
    return match ? match[0] : null; // Return the email if found, otherwise null
}
var randomizeEmail = function (email) {
    var _a = email.split('@'), localPart = _a[0], domain = _a[1];
    var _b = domain.split('.'), domainName = _b[0], tld = _b[1];
    var randomizePart = function (part) { return __spreadArray([], part, true).map(function (c) { return (/[a-zA-Z0-9]/.test(c) ? getRandomLetter() : c); }).join(''); };
    var randomLocal = randomizePart(localPart);
    var randomDomain = randomizePart(domainName);
    return "".concat(randomLocal, "@").concat(randomDomain, ".").concat(tld);
};
function replaceEmailInString(text, emailReplacement) {
    return text.replace(emailRegex, emailReplacement);
}
var isDateValue = function (value) {
    if (typeof value !== 'string') {
        return false;
    }
    var datePatterns = [
        /^\d{4}-\d{2}-\d{2}/, // ISO date
        /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/, // ISO datetime
    ];
    return datePatterns.some(function (pattern) { return pattern.test(value); });
};
var getCurrentDate = function () {
    return new Date().toISOString();
};
var processOnyxKeyWithRule = function (key, data, rule) {
    if (data === null || data === undefined) {
        return data;
    }
    if (Array.isArray(data)) {
        return data.map(function (item) { return (typeof item === 'object' ? processOnyxKeyWithRule(key, item, rule) : item); });
    }
    if (typeof data === 'object') {
        var processedData_1 = {};
        Object.keys(data).forEach(function (fieldKey) {
            var fieldValue = data[fieldKey];
            if (rule.maskList.includes(fieldKey)) {
                processedData_1[fieldKey] = maskValuePreservingLength(fieldValue);
            }
            else if (rule.allowList.includes(fieldKey)) {
                processedData_1[fieldKey] = fieldValue;
            }
            else if (typeof fieldValue === 'object' && fieldValue !== null) {
                // If it's an object and not in allowList/maskList, recursively process it
                processedData_1[fieldKey] = processOnyxKeyWithRule(key, fieldValue, rule);
            }
            else if (typeof fieldValue === 'number') {
                processedData_1[fieldKey] = randomizeAmount(fieldValue);
            }
            else if (typeof fieldValue === 'string' && isDateValue(fieldValue)) {
                processedData_1[fieldKey] = getCurrentDate();
            }
            else if (typeof fieldValue === 'string') {
                processedData_1[fieldKey] = maskValuePreservingLength(fieldValue);
            }
            else {
                // Default: redact to '***' for anything else
                processedData_1[fieldKey] = MASKING_PATTERN;
            }
        });
        return processedData_1;
    }
    return data;
};
var maskEmail = function (email, emailMap) {
    var maskedEmail = '';
    if (!emailMap.has(email)) {
        maskedEmail = randomizeEmail(email);
        emailMap.set(email, maskedEmail);
    }
    else {
        // eslint-disable-next-line @typescript-eslint/non-nullable-type-assertion-style
        maskedEmail = emailMap.get(email);
    }
    return maskedEmail;
};
var maskFragileData = function (data, emailMap, parentKey) {
    if (data === null) {
        return data;
    }
    if (Array.isArray(data)) {
        return data.map(function (item) {
            if (typeof item === 'string' && expensify_common_1.Str.isValidEmail(item)) {
                return maskEmail(item, emailMap);
            }
            return typeof item === 'object' ? maskFragileData(item, emailMap, parentKey) : item;
        });
    }
    var maskedData = {};
    Object.keys(data).forEach(function (sourceKey) {
        var _a;
        if (!Object.prototype.hasOwnProperty.call(data, sourceKey)) {
            return;
        }
        // Read value from source using the original key
        var value = data[sourceKey];
        // Determine the destination key - mask it if it's an email
        // (e.g., in loginList where email addresses are used as object keys)
        var destinationKey = expensify_common_1.Str.isValidEmail(sourceKey) ? maskEmail(sourceKey, emailMap) : sourceKey;
        // Skip values that are already masked as MASKING_PATTERN
        if (value === MASKING_PATTERN) {
            maskedData[destinationKey] = value;
            return;
        }
        // Handle collection nodes (reportActions, reports, transactions)
        if (sourceKey.startsWith(ONYXKEYS_1.default.COLLECTION.REPORT_ACTIONS) && typeof value === 'object') {
            maskedData[destinationKey] = maskFragileData(value, emailMap, sourceKey);
        }
        else if (sourceKey.startsWith(ONYXKEYS_1.default.COLLECTION.REPORT) && typeof value === 'object') {
            maskedData[destinationKey] = maskFragileData(value, emailMap, sourceKey);
        }
        else if (sourceKey.startsWith(ONYXKEYS_1.default.COLLECTION.TRANSACTION) && typeof value === 'object') {
            maskedData[destinationKey] = maskFragileData(value, emailMap, sourceKey);
        }
        else if (amountKeysToRandomize.has(sourceKey) && typeof value === 'number') {
            maskedData[destinationKey] = randomizeAmount(value);
            // Handle expensify_text_title masking
        }
        else if (parentKey === 'expensify_text_title' && sourceKey === 'value' && typeof value === 'string') {
            maskedData[destinationKey] = maskValuePreservingLength(value);
        }
        else if (sourceKey === 'expensify_text_title' && typeof value === 'object') {
            maskedData[destinationKey] = maskFragileData(value, emailMap, 'expensify_text_title');
            // Handle nodes that need full masking
        }
        else if (nodesToFullyMask.has(sourceKey) && typeof value === 'object') {
            maskedData[destinationKey] = maskFragileData(value, emailMap, sourceKey);
        }
        else if (parentKey && nodesToFullyMask.has(parentKey) && typeof value === 'string' && isDateValue(value)) {
            maskedData[destinationKey] = getCurrentDate();
        }
        else if (parentKey && nodesToFullyMask.has(parentKey) && typeof value === 'string') {
            maskedData[destinationKey] = maskValuePreservingLength(value);
        }
        else if (parentKey && nodesToFullyMask.has(parentKey) && typeof value === 'object') {
            maskedData[destinationKey] = maskFragileData(value, emailMap, parentKey);
        }
        else if (keysToMask.has(sourceKey)) {
            if (Array.isArray(value)) {
                maskedData[destinationKey] = value.map(function () { return MASKING_PATTERN; });
            }
            else if (typeof value === 'object') {
                // If the value is an object, don't mask it as a string - recursively process it
                maskedData[destinationKey] = maskFragileData(value, emailMap, sourceKey);
            }
            else {
                maskedData[destinationKey] = maskValuePreservingLength(value);
            }
        }
        else if (typeof value === 'string' && expensify_common_1.Str.isValidEmail(value)) {
            maskedData[destinationKey] = maskEmail(value, emailMap);
        }
        else if (typeof value === 'string' && stringContainsEmail(value)) {
            maskedData[destinationKey] = replaceEmailInString(value, maskEmail((_a = extractEmail(value)) !== null && _a !== void 0 ? _a : '', emailMap));
        }
        else if (parentKey && parentKey.includes(ONYXKEYS_1.default.COLLECTION.REPORT_ACTIONS) && (destinationKey === 'text' || destinationKey === 'html')) {
            maskedData[destinationKey] = MASKING_PATTERN;
        }
        else if (typeof value === 'object') {
            maskedData[destinationKey] = maskFragileData(value, emailMap, destinationKey.includes(ONYXKEYS_1.default.COLLECTION.REPORT_ACTIONS) ? destinationKey : parentKey);
        }
        else {
            maskedData[destinationKey] = value;
        }
    });
    return maskedData;
};
var removePrivateOnyxKeys = function (onyxState) {
    var newState = {};
    Object.keys(onyxState).forEach(function (key) {
        if (onyxKeysToRemove.has(key)) {
            return;
        }
        newState[key] = onyxState[key];
    });
    return newState;
};
var maskOnyxState = function (data, isMaskingFragileDataEnabled) {
    var emailMap = new Map();
    try {
        var onyxState_1 = __assign({}, data);
        onyxState_1 = removePrivateOnyxKeys(onyxState_1);
        var keysWithRules_1 = new Set();
        Object.keys(onyxState_1).forEach(function (key) {
            var ruleKey = key;
            var collectionKey = Object.values(ONYXKEYS_1.default.COLLECTION).find(function (cKey) { return key.startsWith(cKey); });
            if (collectionKey) {
                ruleKey = collectionKey;
            }
            var rule = ONYX_KEY_EXPORT_RULES[ruleKey];
            if (rule) {
                onyxState_1[key] = processOnyxKeyWithRule(key, onyxState_1[key], rule);
                keysWithRules_1.add(key);
            }
        });
        if (isMaskingFragileDataEnabled) {
            // Only apply maskFragileData to keys that don't have export rules
            var maskedState_1 = {};
            Object.keys(onyxState_1).forEach(function (key) {
                var _a;
                if (keysWithRules_1.has(key)) {
                    maskedState_1[key] = onyxState_1[key];
                }
                else {
                    var masked = maskFragileData((_a = {}, _a[key] = onyxState_1[key], _a), emailMap);
                    maskedState_1[key] = masked[key];
                }
            });
            onyxState_1 = maskedState_1;
        }
        return onyxState_1;
    }
    finally {
        // Always clear the email map, even if an error occurred
        emailMap.clear();
    }
};
exports.maskOnyxState = maskOnyxState;
