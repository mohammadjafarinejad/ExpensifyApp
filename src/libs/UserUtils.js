"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateAccountID = generateAccountID;
exports.getLoginListBrickRoadIndicator = getLoginListBrickRoadIndicator;
exports.getProfilePageBrickRoadIndicator = getProfilePageBrickRoadIndicator;
exports.getSecondaryPhoneLogin = getSecondaryPhoneLogin;
exports.hasLoginListError = hasLoginListError;
exports.hasLoginListInfo = hasLoginListInfo;
exports.hashText = hashText;
exports.getContactMethod = getContactMethod;
exports.isCurrentUserValidated = isCurrentUserValidated;
exports.getContactMethodsOptions = getContactMethodsOptions;
var expensify_common_1 = require("expensify-common");
var CONST_1 = require("@src/CONST");
var EmptyObject_1 = require("@src/types/utils/EmptyObject");
var hashCode_1 = require("./hashCode");
var LocalePhoneNumber_1 = require("./LocalePhoneNumber");
/**
 * Searches through given loginList for any contact method / login with an error.
 *
 * Example that should return false:
 * {{
 *      test@test.com: {
 *          errorFields: {
 *              validateCodeSent: null
 *          }
 *      }
 * }}
 *
 * Example that should return true:
 * {{
 *      test@test.com: {
 *          errorFields: {
 *              validateCodeSent: { 18092081290: 'An error' }
 *          }
 *      }
 * }}
 */
function hasLoginListError(loginList) {
    return Object.values(loginList !== null && loginList !== void 0 ? loginList : {}).some(function (loginData) { var _a; return Object.values((_a = loginData.errorFields) !== null && _a !== void 0 ? _a : {}).some(function (field) { return Object.keys(field !== null && field !== void 0 ? field : {}).length > 0; }); });
}
/**
 * Searches through given loginList for any contact method / login that requires
 * an Info brick road status indicator. Currently this only applies if the user
 * has an unvalidated contact method.
 */
function hasLoginListInfo(loginList, email) {
    return Object.values(loginList !== null && loginList !== void 0 ? loginList : {}).some(function (login) { return login.partnerUserID && email !== login.partnerUserID && !login.validatedDate; });
}
/**
 * Checks if the current user has a validated the primary contact method
 */
function isCurrentUserValidated(loginList, email) {
    var _a;
    if (!loginList || !email) {
        return false;
    }
    return !!((_a = loginList === null || loginList === void 0 ? void 0 : loginList[email]) === null || _a === void 0 ? void 0 : _a.validatedDate);
}
/**
 * Gets the appropriate brick road indicator status for a given loginList.
 * Error status is higher priority, so we check for that first.
 */
function getLoginListBrickRoadIndicator(loginList, email) {
    if (hasLoginListError(loginList)) {
        return CONST_1.default.BRICK_ROAD_INDICATOR_STATUS.ERROR;
    }
    if (hasLoginListInfo(loginList, email)) {
        return CONST_1.default.BRICK_ROAD_INDICATOR_STATUS.INFO;
    }
    return undefined;
}
/**
 * Gets the appropriate brick road indicator status for the Profile section.
 * Error status is higher priority, so we check for that first.
 */
function getProfilePageBrickRoadIndicator(loginList, privatePersonalDetails, vacationDelegate, email) {
    var _a;
    var hasPhoneNumberError = !!((_a = privatePersonalDetails === null || privatePersonalDetails === void 0 ? void 0 : privatePersonalDetails.errorFields) === null || _a === void 0 ? void 0 : _a.phoneNumber);
    if (hasLoginListError(loginList) || hasPhoneNumberError || !(0, EmptyObject_1.isEmptyObject)(vacationDelegate === null || vacationDelegate === void 0 ? void 0 : vacationDelegate.errors)) {
        return CONST_1.default.BRICK_ROAD_INDICATOR_STATUS.ERROR;
    }
    if (hasLoginListInfo(loginList, email)) {
        return CONST_1.default.BRICK_ROAD_INDICATOR_STATUS.INFO;
    }
    return undefined;
}
/**
 * Hashes provided string and returns a value between [0, range)
 */
function hashText(text, range) {
    return Math.abs((0, hashCode_1.default)(text.toLowerCase())) % range;
}
/**
 * Generate a random accountID base on searchValue.
 */
function generateAccountID(searchValue) {
    return hashText(searchValue, Math.pow(2, 32));
}
/**
 * Gets the secondary phone login number
 */
function getSecondaryPhoneLogin(loginList) {
    var parsedLoginList = Object.keys(loginList !== null && loginList !== void 0 ? loginList : {}).map(function (login) { return expensify_common_1.Str.removeSMSDomain(login); });
    return parsedLoginList.find(function (login) { return expensify_common_1.Str.isValidE164Phone(login); });
}
/**
 * Gets the contact method
 */
function getContactMethod(primaryLogin, email) {
    var _a;
    return (_a = primaryLogin !== null && primaryLogin !== void 0 ? primaryLogin : email) !== null && _a !== void 0 ? _a : '';
}
/**
 * Gets details about contact methods to be displayed as MenuItems
 */
function getContactMethodsOptions(translate, loginList, defaultEmail) {
    if (!loginList) {
        return [];
    }
    // Sort the login list by placing the one corresponding to the default contact method as the first item.
    // The default contact method is determined by checking against the session email (the current login).
    var sortedLoginList = Object.entries(loginList).sort(function (_a) {
        var loginData = _a[1];
        return (loginData.partnerUserID === defaultEmail ? -1 : 1);
    });
    return sortedLoginList.map(function (_a) {
        var _b, _c, _d, _e, _f, _g;
        var loginName = _a[0], login = _a[1];
        var isDefaultContactMethod = defaultEmail === (login === null || login === void 0 ? void 0 : login.partnerUserID);
        var pendingAction = (_e = (_c = (_b = login === null || login === void 0 ? void 0 : login.pendingFields) === null || _b === void 0 ? void 0 : _b.deletedLogin) !== null && _c !== void 0 ? _c : (_d = login === null || login === void 0 ? void 0 : login.pendingFields) === null || _d === void 0 ? void 0 : _d.addedLogin) !== null && _e !== void 0 ? _e : undefined;
        if (!(login === null || login === void 0 ? void 0 : login.partnerUserID) && !pendingAction) {
            return null;
        }
        var description = '';
        if (defaultEmail === (login === null || login === void 0 ? void 0 : login.partnerUserID)) {
            description = translate('contacts.getInTouch');
        }
        else if ((_f = login === null || login === void 0 ? void 0 : login.errorFields) === null || _f === void 0 ? void 0 : _f.addedLogin) {
            description = translate('contacts.failedNewContact');
        }
        else if (!(login === null || login === void 0 ? void 0 : login.validatedDate)) {
            description = translate('contacts.pleaseVerify');
        }
        var indicator;
        if (Object.values((_g = login === null || login === void 0 ? void 0 : login.errorFields) !== null && _g !== void 0 ? _g : {}).some(function (errorField) { return !(0, EmptyObject_1.isEmptyObject)(errorField); })) {
            indicator = CONST_1.default.BRICK_ROAD_INDICATOR_STATUS.ERROR;
        }
        else if (!(login === null || login === void 0 ? void 0 : login.validatedDate) && !isDefaultContactMethod) {
            indicator = CONST_1.default.BRICK_ROAD_INDICATOR_STATUS.INFO;
        }
        else if (!(login === null || login === void 0 ? void 0 : login.validatedDate) && isDefaultContactMethod && sortedLoginList.length > 1) {
            indicator = CONST_1.default.BRICK_ROAD_INDICATOR_STATUS.INFO;
        }
        // Default to using login key if we deleted login.partnerUserID optimistically
        // but still need to show the pending login being deleted while offline.
        // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
        var partnerUserID = (login === null || login === void 0 ? void 0 : login.partnerUserID) || loginName;
        var menuItemTitle = expensify_common_1.Str.isSMSLogin(partnerUserID) ? (0, LocalePhoneNumber_1.formatPhoneNumber)(partnerUserID) : partnerUserID;
        return {
            partnerUserID: partnerUserID,
            menuItemTitle: menuItemTitle,
            description: description,
            indicator: indicator,
            pendingAction: pendingAction,
        };
    });
}
