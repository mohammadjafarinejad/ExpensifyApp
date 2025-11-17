"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAvatar = getAvatar;
exports.getAvatarURL = getAvatarURL;
exports.getDefaultAvatarName = getDefaultAvatarName;
exports.getDefaultAvatarURL = getDefaultAvatarURL;
exports.getPresetAvatarNameFromURL = getPresetAvatarNameFromURL;
exports.getFullSizeAvatar = getFullSizeAvatar;
exports.getSmallSizeAvatar = getSmallSizeAvatar;
exports.isPresetAvatar = isPresetAvatar;
exports.isDefaultAvatar = isDefaultAvatar;
exports.isLetterAvatar = isLetterAvatar;
var expensify_common_1 = require("expensify-common");
var Expensicons_1 = require("@components/Icon/Expensicons");
var CONST_1 = require("@src/CONST");
var PresetAvatarCatalog_1 = require("./Avatars/PresetAvatarCatalog");
var DEFAULT_AVATAR_URL_PATTERNS = ['images/avatars/avatar_', 'images/avatars/default-avatar_', 'images/avatars/user/default'];
var LETTER_AVATAR_NAME_REGEX = /^letter-avatar-#[0-9A-F]{6}-#[0-9A-F]{6}-[A-Z]\.png$/;
/**
 * Calculates which avatar bucket an account belongs to based on accountID, email, or existing avatar URL.
 * There are 24 possible default avatars, distributed using modulo operation.
 *
 * @param args - Object containing parameters
 * @param args.accountID - The user's account ID
 * @param args.accountEmail - The user's email address (for consistency with backend logic, used for hash calculation if provided)
 * @param args.avatarURL - Existing avatar URL (parsed to extract avatar number if available)
 * @returns A number from 1-24 indicating which avatar bucket the account belongs to
 */
function getAccountIDHashBucket(_a) {
    // There are 24 possible default avatars, so we choose which one this user has based
    // on a simple modulo operation of their login number. Note that Avatar count starts at 1.
    var _b = _a.accountID, accountID = _b === void 0 ? CONST_1.default.DEFAULT_NUMBER_ID : _b, accountEmail = _a.accountEmail, avatarURL = _a.avatarURL;
    // When creating a chat the backend response will return the actual user ID.
    // But the avatar link still corresponds to the original ID-generated link. So we extract the SVG image number from the backend's link instead of using the user ID directly
    var accountIDHashBucket = 1;
    if (avatarURL) {
        var match = avatarURL.match(/(default-avatar_|avatar_)(\d+)(?=\.)/);
        var lastDigit = match && parseInt(match[2], 10);
        accountIDHashBucket = lastDigit;
    }
    else if (accountEmail) {
        var intVal = Number.parseInt((0, expensify_common_1.md5)(accountEmail).substring(0, 4), 16);
        accountIDHashBucket = ((intVal % CONST_1.default.DEFAULT_AVATAR_COUNT) + 1);
    }
    else if (accountID > 0) {
        accountIDHashBucket = ((accountID % CONST_1.default.DEFAULT_AVATAR_COUNT) + 1);
    }
    return accountIDHashBucket;
}
/**
 * Returns the default avatar asset associated with the given accountID.
 * Special accounts (Concierge, Notifications) have dedicated avatars.
 * Other accounts get an avatar from the default avatar set based on their accountID hash bucket.
 *
 * @param args - Object containing avatar parameters
 * @param args.accountID - The user's account ID
 * @param args.accountEmail - The user's email address (for consistency with backend logic, used for avatar calculation if provided)
 * @param args.avatarURL - Existing avatar URL (parsed to extract avatar number if available)
 * @returns The avatar icon asset (SVG component), or undefined if no default avatar matches
 */
function getDefaultAvatar(_a) {
    var _b = _a.accountID, accountID = _b === void 0 ? CONST_1.default.DEFAULT_NUMBER_ID : _b, accountEmail = _a.accountEmail, avatarURL = _a.avatarURL;
    if (accountID === CONST_1.default.ACCOUNT_ID.CONCIERGE) {
        return Expensicons_1.ConciergeAvatar;
    }
    if (accountID === CONST_1.default.ACCOUNT_ID.NOTIFICATIONS) {
        return Expensicons_1.NotificationsAvatar;
    }
    return (0, PresetAvatarCatalog_1.getAvatarLocal)(getDefaultAvatarName({ accountID: accountID, accountEmail: accountEmail, avatarURL: avatarURL }));
}
/**
 * Returns the custom avatar name (e.g., "default-avatar_5") associated with an account.
 * This name corresponds to assets in the PresetAvatarCatalog.
 *
 * @param args - Object containing avatar parameters
 * @param args.accountID - The user's account ID
 * @param args.accountEmail - The user's email address (for consistency with backend logic, used for hash calculation if provided)
 * @param args.avatarURL - Existing avatar URL (parsed to extract avatar number if available)
 * @returns The custom avatar name identifier (e.g., "default-avatar_5")
 */
function getDefaultAvatarName(_a) {
    var _b = _a.accountID, accountID = _b === void 0 ? CONST_1.default.DEFAULT_NUMBER_ID : _b, accountEmail = _a.accountEmail, avatarURL = _a.avatarURL;
    return "".concat(PresetAvatarCatalog_1.DEFAULT_AVATAR_PREFIX, "_").concat(getAccountIDHashBucket({ accountID: accountID, accountEmail: accountEmail, avatarURL: avatarURL }));
}
/**
 * Returns the CloudFront CDN URL for a custom/default avatar.
 * This function is used when you need the actual URL string (e.g., for sharing, external display).
 * Concierge account gets a special hardcoded URL.
 *
 * @param args - Object containing avatar parameters
 * @param args.accountID - The user's account ID
 * @param args.accountEmail - The user's email address (for consistency with backend logic, used for avatar calculation if provided)
 * @param args.avatarURL - Existing avatar URL (parsed to extract avatar number if available)
 * @returns The CloudFront CDN URL for the avatar image
 *
 */
function getDefaultAvatarURL(_a) {
    var _b = _a.accountID, accountID = _b === void 0 ? CONST_1.default.DEFAULT_NUMBER_ID : _b, accountEmail = _a.accountEmail, avatarURL = _a.avatarURL;
    if (Number(accountID) === CONST_1.default.ACCOUNT_ID.CONCIERGE) {
        return CONST_1.default.CONCIERGE_ICON_URL;
    }
    return (0, PresetAvatarCatalog_1.getAvatarURL)(getDefaultAvatarName({ accountID: accountID, accountEmail: accountEmail, avatarURL: avatarURL }));
}
/**
 * Extracts the custom avatar name from a CloudFront avatar URL.
 * Useful for identifying which default avatar a URL points to.
 *
 * @param avatarURL - The avatar URL
 * @returns The avatar name (e.g., 'default-avatar_5') or undefined if not a valid custom avatar URL
 */
function getPresetAvatarNameFromURL(avatarURL) {
    var _a, _b, _c;
    if (!avatarURL || typeof avatarURL !== 'string' || avatarURL === CONST_1.default.CONCIERGE_ICON_URL) {
        return undefined;
    }
    // Extract avatar name from CloudFront URL and make sure it's one of defaults
    var match = ((_c = (_b = (_a = avatarURL.split('/').at(-1)) === null || _a === void 0 ? void 0 : _a.split('.')) === null || _b === void 0 ? void 0 : _b[0]) !== null && _c !== void 0 ? _c : '');
    if (PresetAvatarCatalog_1.PRESET_AVATAR_CATALOG[match]) {
        return match;
    }
}
/**
 * Determines if an avatar source points to a default avatar (not user-uploaded).
 * Default avatars include numbered avatars (avatar_X, default-avatar_X) and Concierge avatars.
 *
 * @param avatarSource - The avatar source (URL string or SVG asset)
 * @returns True if the avatar is a default avatar, false otherwise
 */
function isDefaultAvatar(avatarSource) {
    if (typeof avatarSource === 'string') {
        for (var _i = 0, DEFAULT_AVATAR_URL_PATTERNS_1 = DEFAULT_AVATAR_URL_PATTERNS; _i < DEFAULT_AVATAR_URL_PATTERNS_1.length; _i++) {
            var avatarPattern = DEFAULT_AVATAR_URL_PATTERNS_1[_i];
            if (avatarSource.includes(avatarPattern)) {
                return true;
            }
        }
        // We use a hardcoded "default" Concierge avatar
        if (avatarSource === CONST_1.default.CONCIERGE_ICON_URL_2021 || avatarSource === CONST_1.default.CONCIERGE_ICON_URL) {
            return true;
        }
    }
    return false;
}
/**
 * Determines if an avatar source is a custom avatar from the PresetAvatarCatalog.
 * Custom avatars are a specific set of default avatars that can be identified by their URL.
 *
 * @param avatarSource - The avatar source to check
 * @returns True if the avatar is a custom avatar from the catalog
 */
function isPresetAvatar(avatarSource) {
    return !!getPresetAvatarNameFromURL(avatarSource);
}
/**
 * Determines if an avatar is a letter avatar based on its original filename.
 * Letter avatars follow the pattern: letter-avatar-#RRGGBB-#RRGGBB-X.png
 * where RRGGBB are hex colors and X is a letter.
 *
 * @param originalFileName - The original filename of the avatar
 * @returns True if the filename matches the letter avatar pattern
 */
function isLetterAvatar(originalFileName) {
    return !!(originalFileName && LETTER_AVATAR_NAME_REGEX.test(originalFileName));
}
/**
 * Returns the appropriate avatar source (SVG asset or URL) for rendering in React components.
 *
 * **This is the primary function for getting avatar sources throughout the application.**
 *
 * **Behavior**:
 * - For default/custom avatars: Returns local SVG component for optimal performance
 * - For uploaded avatars: Returns the URL string
 * - For undefined sources: Returns undefined
 *
 * **Performance**: Default avatars are served as local SVG assets to avoid network requests
 * and provide instant rendering.
 *
 * @param args - Object containing avatar parameters
 * @param args.accountID - The user's account ID
 * @param args.accountEmail - The user's email address (for consistency with backend logic, used for avatar calculation if provided)
 * @param args.avatarSource - The avatar source (URL or SVG component)
 * @returns The avatar source ready for rendering (SVG component for defaults, URL string for uploads)
 *
 */
function getAvatar(_a) {
    var avatarSource = _a.avatarSource, _b = _a.accountID, accountID = _b === void 0 ? CONST_1.default.DEFAULT_NUMBER_ID : _b, accountEmail = _a.accountEmail;
    if (isDefaultAvatar(avatarSource)) {
        return getDefaultAvatar({ accountID: accountID, accountEmail: accountEmail, avatarURL: avatarSource });
    }
    var maybePresetAvatarName = getPresetAvatarNameFromURL(avatarSource);
    if (maybePresetAvatarName) {
        return (0, PresetAvatarCatalog_1.getAvatarLocal)(maybePresetAvatarName);
    }
    return avatarSource;
}
/**
 * Returns the URL string for an avatar.
 * If the avatar is a custom avatar, returns the CloudFront CDN URL.
 * Otherwise, returns the original avatar source URL.
 *
 * @param args - Object containing avatar parameters
 * @param args.accountID - The user's account ID
 * @param args.accountEmail - The user's email address (for consistency with backend logic, used for avatar calculation if provided)
 * @param args.avatarSource - The avatar source (URL or SVG component)
 * @returns The avatar URL string
 */
function getAvatarURL(_a) {
    var _b = _a.accountID, accountID = _b === void 0 ? CONST_1.default.DEFAULT_NUMBER_ID : _b, avatarSource = _a.avatarSource, accountEmail = _a.accountEmail;
    if (isDefaultAvatar(avatarSource)) {
        return getDefaultAvatarURL({ accountID: accountID, accountEmail: accountEmail, avatarURL: avatarSource });
    }
    var maybePresetAvatarName = getPresetAvatarNameFromURL(avatarSource);
    if (maybePresetAvatarName) {
        return (0, PresetAvatarCatalog_1.getAvatarURL)(maybePresetAvatarName);
    }
    return avatarSource;
}
/**
 * Returns the full-size version of an avatar by removing the _128 size suffix.
 * User-uploaded avatars have _128 appended for small versions returned by the asset server.
 * This function removes that suffix to load the full-resolution image.
 *
 * @param args - Object containing avatar parameters
 * @param args.accountID - The user's account ID
 * @param args.accountEmail - The user's email address (for consistency with backend logic, used for avatar calculation if provided)
 * @param args.avatarSource - The avatar source (URL or SVG component)
 * @returns The full-size avatar source
 */
function getFullSizeAvatar(args) {
    var source = getAvatar(args);
    if (typeof source !== 'string') {
        return source;
    }
    return source.replace('_128', '');
}
/**
 * Returns the small-size version of an avatar by adding _128 suffix before the file extension.
 * Small avatars are 128px versions used for better performance in lists and thumbnails.
 * Only works for CloudFront URLs; other URLs are returned as-is.
 *
 * @param args - Object containing avatar parameters
 * @param args.accountID - The user's account ID
 * @param args.accountEmail - The user's email address (for consistency with backend logic, used for avatar calculation if provided)
 * @param args.avatarSource - The avatar source (URL or SVG component)
 * @returns The small-size avatar source with _128 suffix (if applicable)
 */
function getSmallSizeAvatar(args) {
    var source = getAvatar(args);
    if (typeof source !== 'string') {
        return source;
    }
    // Because other urls than CloudFront do not support dynamic image sizing (_SIZE suffix), the current source is already what we want to use here.
    if (!CONST_1.default.CLOUDFRONT_DOMAIN_REGEX.test(source)) {
        return source;
    }
    // If image source already has _128 at the end, the given avatar URL is already what we want to use here.
    var lastPeriodIndex = source.lastIndexOf('.');
    if (source.substring(lastPeriodIndex - 4, lastPeriodIndex) === '_128') {
        return source;
    }
    return "".concat(source.substring(0, lastPeriodIndex), "_128").concat(source.substring(lastPeriodIndex));
}
