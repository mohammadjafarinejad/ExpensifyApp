"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.clearAvatarErrors = clearAvatarErrors;
exports.deleteAvatar = deleteAvatar;
exports.openPublicProfilePage = openPublicProfilePage;
exports.updateAddress = updateAddress;
exports.updateAutomaticTimezone = updateAutomaticTimezone;
exports.updateAvatar = updateAvatar;
exports.updateDateOfBirth = updateDateOfBirth;
exports.setDisplayName = setDisplayName;
exports.updateDisplayName = updateDisplayName;
exports.updateLegalName = updateLegalName;
exports.updatePhoneNumber = updatePhoneNumber;
exports.clearPhoneNumberError = clearPhoneNumberError;
exports.updatePronouns = updatePronouns;
exports.updateSelectedTimezone = updateSelectedTimezone;
exports.updatePersonalDetailsAndShipExpensifyCards = updatePersonalDetailsAndShipExpensifyCards;
exports.setPersonalDetailsAndRevealExpensifyCard = setPersonalDetailsAndRevealExpensifyCard;
exports.clearPersonalDetailsErrors = clearPersonalDetailsErrors;
var react_native_onyx_1 = require("react-native-onyx");
var API = require("@libs/API");
var types_1 = require("@libs/API/types");
var DateUtils_1 = require("@libs/DateUtils");
var ErrorUtils = require("@libs/ErrorUtils");
var LoginUtils = require("@libs/LoginUtils");
var Navigation_1 = require("@libs/Navigation/Navigation");
var PersonalDetailsUtils = require("@libs/PersonalDetailsUtils");
var UserAvatarUtils = require("@libs/UserAvatarUtils");
var CONST_1 = require("@src/CONST");
var ONYXKEYS_1 = require("@src/ONYXKEYS");
var ROUTES_1 = require("@src/ROUTES");
function updatePronouns(pronouns, currentUserAccountID) {
    var _a;
    if (!currentUserAccountID) {
        return;
    }
    var parameters = { pronouns: pronouns };
    API.write(types_1.WRITE_COMMANDS.UPDATE_PRONOUNS, parameters, {
        optimisticData: [
            {
                onyxMethod: react_native_onyx_1.default.METHOD.MERGE,
                key: ONYXKEYS_1.default.PERSONAL_DETAILS_LIST,
                value: (_a = {},
                    _a[currentUserAccountID] = {
                        pronouns: pronouns,
                    },
                    _a),
            },
        ],
    });
}
function setDisplayName(firstName, lastName, formatPhoneNumber, currentUserAccountID, currentUserEmail) {
    var _a;
    if (!currentUserAccountID) {
        return;
    }
    react_native_onyx_1.default.merge(ONYXKEYS_1.default.PERSONAL_DETAILS_LIST, (_a = {},
        _a[currentUserAccountID] = {
            firstName: firstName,
            lastName: lastName,
            displayName: PersonalDetailsUtils.createDisplayName(currentUserEmail !== null && currentUserEmail !== void 0 ? currentUserEmail : '', {
                firstName: firstName,
                lastName: lastName,
            }, formatPhoneNumber),
        },
        _a));
}
function updateDisplayName(firstName, lastName, formatPhoneNumber, currentUserAccountID, currentUserEmail) {
    var _a;
    if (!currentUserAccountID) {
        return;
    }
    var parameters = { firstName: firstName, lastName: lastName };
    API.write(types_1.WRITE_COMMANDS.UPDATE_DISPLAY_NAME, parameters, {
        optimisticData: [
            {
                onyxMethod: react_native_onyx_1.default.METHOD.MERGE,
                key: ONYXKEYS_1.default.PERSONAL_DETAILS_LIST,
                value: (_a = {},
                    _a[currentUserAccountID] = {
                        firstName: firstName,
                        lastName: lastName,
                        displayName: PersonalDetailsUtils.createDisplayName(currentUserEmail !== null && currentUserEmail !== void 0 ? currentUserEmail : '', {
                            firstName: firstName,
                            lastName: lastName,
                        }, formatPhoneNumber),
                    },
                    _a),
            },
        ],
    });
}
function updateLegalName(legalFirstName, legalLastName, formatPhoneNumber, currentUserPersonalDetail) {
    var _a;
    var _b;
    var parameters = { legalFirstName: legalFirstName, legalLastName: legalLastName };
    var optimisticData = [
        {
            onyxMethod: react_native_onyx_1.default.METHOD.MERGE,
            key: ONYXKEYS_1.default.PRIVATE_PERSONAL_DETAILS,
            value: {
                legalFirstName: legalFirstName,
                legalLastName: legalLastName,
            },
        },
    ];
    // In case the user does not have a display name, we will update the display name based on the legal name
    if (!(currentUserPersonalDetail === null || currentUserPersonalDetail === void 0 ? void 0 : currentUserPersonalDetail.firstName) && !(currentUserPersonalDetail === null || currentUserPersonalDetail === void 0 ? void 0 : currentUserPersonalDetail.lastName)) {
        optimisticData.push({
            onyxMethod: react_native_onyx_1.default.METHOD.MERGE,
            key: ONYXKEYS_1.default.PERSONAL_DETAILS_LIST,
            value: (_a = {},
                _a[currentUserPersonalDetail.accountID] = {
                    displayName: PersonalDetailsUtils.createDisplayName((_b = currentUserPersonalDetail.email) !== null && _b !== void 0 ? _b : '', {
                        firstName: legalFirstName,
                        lastName: legalLastName,
                    }, formatPhoneNumber),
                    firstName: legalFirstName,
                    lastName: legalLastName,
                },
                _a),
        });
    }
    API.write(types_1.WRITE_COMMANDS.UPDATE_LEGAL_NAME, parameters, {
        optimisticData: optimisticData,
    });
    Navigation_1.default.goBack();
}
/**
 * @param dob - date of birth
 */
function updateDateOfBirth(_a) {
    var dob = _a.dob;
    var parameters = { dob: dob };
    API.write(types_1.WRITE_COMMANDS.UPDATE_DATE_OF_BIRTH, parameters, {
        optimisticData: [
            {
                onyxMethod: react_native_onyx_1.default.METHOD.MERGE,
                key: ONYXKEYS_1.default.PRIVATE_PERSONAL_DETAILS,
                value: {
                    dob: dob,
                },
            },
        ],
    });
    Navigation_1.default.goBack();
}
function updatePhoneNumber(phoneNumber, currentPhoneNumber) {
    var parameters = { phoneNumber: phoneNumber };
    API.write(types_1.WRITE_COMMANDS.UPDATE_PHONE_NUMBER, parameters, {
        optimisticData: [
            {
                onyxMethod: react_native_onyx_1.default.METHOD.MERGE,
                key: ONYXKEYS_1.default.PRIVATE_PERSONAL_DETAILS,
                value: {
                    phoneNumber: phoneNumber,
                },
            },
        ],
        failureData: [
            {
                onyxMethod: react_native_onyx_1.default.METHOD.MERGE,
                key: ONYXKEYS_1.default.PRIVATE_PERSONAL_DETAILS,
                value: {
                    phoneNumber: currentPhoneNumber,
                    errorFields: {
                        phoneNumber: ErrorUtils.getMicroSecondOnyxErrorWithTranslationKey('privatePersonalDetails.error.invalidPhoneNumber'),
                    },
                },
            },
        ],
    });
}
function clearPhoneNumberError() {
    react_native_onyx_1.default.merge(ONYXKEYS_1.default.PRIVATE_PERSONAL_DETAILS, {
        errorFields: {
            phoneNumber: null,
        },
    });
}
function updateAddress(addresses, street, street2, city, state, zip, country) {
    var parameters = {
        homeAddressStreet: street,
        addressStreet2: street2,
        homeAddressCity: city,
        addressState: state,
        addressZipCode: zip,
        addressCountry: country,
    };
    // State names for the United States are in the form of two-letter ISO codes
    // State names for other countries except US have full names, so we provide two different params to be handled by server
    if (country !== CONST_1.default.COUNTRY.US) {
        parameters.addressStateLong = state;
    }
    API.write(types_1.WRITE_COMMANDS.UPDATE_HOME_ADDRESS, parameters, {
        optimisticData: [
            {
                onyxMethod: react_native_onyx_1.default.METHOD.MERGE,
                key: ONYXKEYS_1.default.PRIVATE_PERSONAL_DETAILS,
                value: {
                    addresses: __spreadArray(__spreadArray([], addresses, true), [
                        {
                            street: PersonalDetailsUtils.getFormattedStreet(street, street2),
                            city: city,
                            state: state,
                            zip: zip,
                            country: country,
                            current: true,
                        },
                    ], false),
                },
            },
        ],
    });
    Navigation_1.default.goBack();
}
/**
 * Updates timezone's 'automatic' setting, and updates
 * selected timezone if set to automatically update.
 */
function updateAutomaticTimezone(timezone, currentUserAccountID) {
    var _a;
    if (!currentUserAccountID) {
        return;
    }
    var formattedTimezone = DateUtils_1.default.formatToSupportedTimezone(timezone);
    var parameters = {
        timezone: JSON.stringify(formattedTimezone),
    };
    API.write(types_1.WRITE_COMMANDS.UPDATE_AUTOMATIC_TIMEZONE, parameters, {
        optimisticData: [
            {
                onyxMethod: react_native_onyx_1.default.METHOD.MERGE,
                key: ONYXKEYS_1.default.PERSONAL_DETAILS_LIST,
                value: (_a = {},
                    _a[currentUserAccountID] = {
                        timezone: formattedTimezone,
                    },
                    _a),
            },
        ],
    });
}
/**
 * Updates user's 'selected' timezone, then navigates to the
 * initial Timezone page.
 */
function updateSelectedTimezone(selectedTimezone, currentUserAccountID) {
    var _a;
    var timezone = {
        selected: selectedTimezone,
    };
    var parameters = {
        timezone: JSON.stringify(timezone),
    };
    if (currentUserAccountID) {
        API.write(types_1.WRITE_COMMANDS.UPDATE_SELECTED_TIMEZONE, parameters, {
            optimisticData: [
                {
                    onyxMethod: react_native_onyx_1.default.METHOD.MERGE,
                    key: ONYXKEYS_1.default.PERSONAL_DETAILS_LIST,
                    value: (_a = {},
                        _a[currentUserAccountID] = {
                            timezone: timezone,
                        },
                        _a),
                },
            ],
        });
    }
    Navigation_1.default.goBack(ROUTES_1.default.SETTINGS_TIMEZONE);
}
/**
 * Fetches public profile info about a given user.
 * The API will only return the accountID, displayName, and avatar for the user
 * but the profile page will use other info (e.g. contact methods and pronouns) if they are already available in Onyx
 */
function openPublicProfilePage(accountID) {
    var _a, _b, _c;
    var optimisticData = [
        {
            onyxMethod: react_native_onyx_1.default.METHOD.MERGE,
            key: ONYXKEYS_1.default.PERSONAL_DETAILS_METADATA,
            value: (_a = {},
                _a[accountID] = {
                    isLoading: true,
                },
                _a),
        },
    ];
    var successData = [
        {
            onyxMethod: react_native_onyx_1.default.METHOD.MERGE,
            key: ONYXKEYS_1.default.PERSONAL_DETAILS_METADATA,
            value: (_b = {},
                _b[accountID] = {
                    isLoading: false,
                },
                _b),
        },
    ];
    var failureData = [
        {
            onyxMethod: react_native_onyx_1.default.METHOD.MERGE,
            key: ONYXKEYS_1.default.PERSONAL_DETAILS_METADATA,
            value: (_c = {},
                _c[accountID] = {
                    isLoading: false,
                },
                _c),
        },
    ];
    var parameters = { accountID: accountID };
    API.read(types_1.READ_COMMANDS.OPEN_PUBLIC_PROFILE_PAGE, parameters, { optimisticData: optimisticData, successData: successData, failureData: failureData });
}
/**
 * Type guard to check if a file object is a DefaultAvatarResult
 */
function isDefaultAvatarResult(file) {
    return 'customExpensifyAvatarID' in file && typeof file.customExpensifyAvatarID === 'string';
}
/**
 * Updates the user's avatar image
 */
function updateAvatar(file, currentUserPersonalDetails) {
    var _a, _b, _c;
    var _d;
    if (!currentUserPersonalDetails.accountID) {
        return;
    }
    var optimisticData = [
        {
            onyxMethod: react_native_onyx_1.default.METHOD.MERGE,
            key: ONYXKEYS_1.default.PERSONAL_DETAILS_LIST,
            value: (_a = {},
                _a[currentUserPersonalDetails.accountID] = {
                    avatar: file.uri,
                    avatarThumbnail: file.uri,
                    originalFileName: file.name,
                    errorFields: {
                        avatar: null,
                    },
                    pendingFields: {
                        avatar: CONST_1.default.RED_BRICK_ROAD_PENDING_ACTION.UPDATE,
                        originalFileName: null,
                    },
                    fallbackIcon: file.uri,
                },
                _a),
        },
    ];
    var successData = [
        {
            onyxMethod: react_native_onyx_1.default.METHOD.MERGE,
            key: ONYXKEYS_1.default.PERSONAL_DETAILS_LIST,
            value: (_b = {},
                _b[currentUserPersonalDetails.accountID] = {
                    pendingFields: {
                        avatar: null,
                    },
                },
                _b),
        },
    ];
    var failureData = [
        {
            onyxMethod: react_native_onyx_1.default.METHOD.MERGE,
            key: ONYXKEYS_1.default.PERSONAL_DETAILS_LIST,
            value: (_c = {},
                _c[currentUserPersonalDetails.accountID] = {
                    avatar: currentUserPersonalDetails === null || currentUserPersonalDetails === void 0 ? void 0 : currentUserPersonalDetails.avatar,
                    avatarThumbnail: (_d = currentUserPersonalDetails === null || currentUserPersonalDetails === void 0 ? void 0 : currentUserPersonalDetails.avatarThumbnail) !== null && _d !== void 0 ? _d : currentUserPersonalDetails === null || currentUserPersonalDetails === void 0 ? void 0 : currentUserPersonalDetails.avatar,
                    pendingFields: {
                        avatar: null,
                    },
                },
                _c),
        },
    ];
    var parameters = isDefaultAvatarResult(file) ? { customExpensifyAvatarID: file.customExpensifyAvatarID } : { file: file };
    API.write(types_1.WRITE_COMMANDS.UPDATE_USER_AVATAR, parameters, { optimisticData: optimisticData, successData: successData, failureData: failureData });
}
// TODO remove when no longer needed
/**
 * Replaces the user's avatar image with a default avatar
 */
function deleteAvatar(currentUserPersonalDetails) {
    var _a, _b;
    if (!currentUserPersonalDetails.accountID) {
        return;
    }
    // We want to use the old dot avatar here as this affects both platforms.
    var defaultAvatar = UserAvatarUtils.getDefaultAvatarURL({ accountID: currentUserPersonalDetails.accountID, accountEmail: currentUserPersonalDetails.email });
    var optimisticData = [
        {
            onyxMethod: react_native_onyx_1.default.METHOD.MERGE,
            key: ONYXKEYS_1.default.PERSONAL_DETAILS_LIST,
            value: (_a = {},
                _a[currentUserPersonalDetails.accountID] = {
                    avatar: defaultAvatar,
                    fallbackIcon: null,
                },
                _a),
        },
    ];
    var failureData = [
        {
            onyxMethod: react_native_onyx_1.default.METHOD.MERGE,
            key: ONYXKEYS_1.default.PERSONAL_DETAILS_LIST,
            value: (_b = {},
                _b[currentUserPersonalDetails.accountID] = {
                    avatar: currentUserPersonalDetails === null || currentUserPersonalDetails === void 0 ? void 0 : currentUserPersonalDetails.avatar,
                    fallbackIcon: currentUserPersonalDetails === null || currentUserPersonalDetails === void 0 ? void 0 : currentUserPersonalDetails.fallbackIcon,
                },
                _b),
        },
    ];
    API.write(types_1.WRITE_COMMANDS.DELETE_USER_AVATAR, null, { optimisticData: optimisticData, failureData: failureData });
}
/**
 * Clear error and pending fields for the current user's avatar
 */
function clearAvatarErrors(currentUserAccountID) {
    var _a;
    if (!currentUserAccountID) {
        return;
    }
    react_native_onyx_1.default.merge(ONYXKEYS_1.default.PERSONAL_DETAILS_LIST, (_a = {},
        _a[currentUserAccountID] = {
            errorFields: {
                avatar: null,
            },
            pendingFields: {
                avatar: null,
            },
        },
        _a));
}
/**
 * Clear errors for the current user's personal details
 */
function clearPersonalDetailsErrors() {
    react_native_onyx_1.default.merge(ONYXKEYS_1.default.PRIVATE_PERSONAL_DETAILS, {
        errors: null,
    });
}
function updatePersonalDetailsAndShipExpensifyCards(values, validateCode, countryCode) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
    var parameters = {
        legalFirstName: (_b = (_a = values.legalFirstName) === null || _a === void 0 ? void 0 : _a.trim()) !== null && _b !== void 0 ? _b : '',
        legalLastName: (_d = (_c = values.legalLastName) === null || _c === void 0 ? void 0 : _c.trim()) !== null && _d !== void 0 ? _d : '',
        phoneNumber: LoginUtils.appendCountryCode((_f = (_e = values.phoneNumber) === null || _e === void 0 ? void 0 : _e.trim()) !== null && _f !== void 0 ? _f : '', countryCode),
        addressCity: values.city.trim(),
        addressStreet: (_h = (_g = values.addressLine1) === null || _g === void 0 ? void 0 : _g.trim()) !== null && _h !== void 0 ? _h : '',
        addressStreet2: (_k = (_j = values.addressLine2) === null || _j === void 0 ? void 0 : _j.trim()) !== null && _k !== void 0 ? _k : '',
        addressZip: (_m = (_l = values.zipPostCode) === null || _l === void 0 ? void 0 : _l.trim().toUpperCase()) !== null && _m !== void 0 ? _m : '',
        addressCountry: values.country,
        addressState: values.state.trim(),
        dob: values.dob,
        validateCode: validateCode,
    };
    API.write(types_1.WRITE_COMMANDS.SET_PERSONAL_DETAILS_AND_SHIP_EXPENSIFY_CARDS, parameters, {
        optimisticData: [
            {
                onyxMethod: react_native_onyx_1.default.METHOD.MERGE,
                key: ONYXKEYS_1.default.PRIVATE_PERSONAL_DETAILS,
                value: {
                    isLoading: true,
                },
            },
        ],
        finallyData: [
            {
                onyxMethod: react_native_onyx_1.default.METHOD.MERGE,
                key: ONYXKEYS_1.default.PRIVATE_PERSONAL_DETAILS,
                value: {
                    isLoading: false,
                },
            },
        ],
    });
}
function setPersonalDetailsAndRevealExpensifyCard(values, validateCode, countryCode, cardID) {
    return new Promise(function (resolve, reject) {
        var _a;
        var _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o;
        var parameters = {
            legalFirstName: (_c = (_b = values.legalFirstName) === null || _b === void 0 ? void 0 : _b.trim()) !== null && _c !== void 0 ? _c : '',
            legalLastName: (_e = (_d = values.legalLastName) === null || _d === void 0 ? void 0 : _d.trim()) !== null && _e !== void 0 ? _e : '',
            phoneNumber: LoginUtils.appendCountryCode((_g = (_f = values.phoneNumber) === null || _f === void 0 ? void 0 : _f.trim()) !== null && _g !== void 0 ? _g : '', countryCode),
            addressCity: values.city.trim(),
            addressStreet: (_j = (_h = values.addressLine1) === null || _h === void 0 ? void 0 : _h.trim()) !== null && _j !== void 0 ? _j : '',
            addressStreet2: (_l = (_k = values.addressLine2) === null || _k === void 0 ? void 0 : _k.trim()) !== null && _l !== void 0 ? _l : '',
            addressZip: (_o = (_m = values.zipPostCode) === null || _m === void 0 ? void 0 : _m.trim().toUpperCase()) !== null && _o !== void 0 ? _o : '',
            addressCountry: values.country,
            addressState: values.state.trim(),
            dob: values.dob,
            validateCode: validateCode,
            cardID: cardID,
        };
        var optimisticData = [
            {
                onyxMethod: react_native_onyx_1.default.METHOD.MERGE,
                key: ONYXKEYS_1.default.PRIVATE_PERSONAL_DETAILS,
                value: {
                    isLoading: true,
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
                key: ONYXKEYS_1.default.PRIVATE_PERSONAL_DETAILS,
                value: {
                    isLoading: false,
                },
            },
            {
                onyxMethod: react_native_onyx_1.default.METHOD.MERGE,
                key: ONYXKEYS_1.default.ACCOUNT,
                value: { isLoading: false },
            },
            {
                onyxMethod: react_native_onyx_1.default.METHOD.MERGE,
                key: ONYXKEYS_1.default.CARD_LIST,
                value: (_a = {}, _a[cardID] = { errors: null }, _a),
            },
        ];
        var failureData = [
            {
                onyxMethod: react_native_onyx_1.default.METHOD.MERGE,
                key: ONYXKEYS_1.default.PRIVATE_PERSONAL_DETAILS,
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
        // eslint-disable-next-line rulesdir/no-api-side-effects-method
        API.makeRequestWithSideEffects(types_1.SIDE_EFFECT_REQUEST_COMMANDS.SET_PERSONAL_DETAILS_AND_REVEAL_EXPENSIFY_CARD, parameters, {
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
                // eslint-disable-next-line prefer-promise-reject-errors
                reject('cardPage.unexpectedError');
                return;
            }
            resolve(response);
        })
            .catch(function () {
            // eslint-disable-next-line prefer-promise-reject-errors
            reject('cardPage.cardDetailsLoadingFailure');
        });
    });
}
