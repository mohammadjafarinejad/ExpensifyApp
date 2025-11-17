"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var defaultAvatars = require("@components/Icon/DefaultAvatars");
var CONST_1 = require("@src/CONST");
var UserAvatarUtils = require("@src/libs/UserAvatarUtils");
describe('UserAvatarUtils', function () {
    describe('getAvatar', function () {
        it('should return default avatar if the url is for default avatar', function () {
            var avatarURL = 'https://d2k5nsl2zxldvw.cloudfront.net/images/avatars/default-avatar_7.png';
            var defaultAvatar = UserAvatarUtils.getAvatar({ avatarSource: avatarURL, accountID: 1 });
            expect(typeof defaultAvatar).toBe('function');
            // Both defaultAvatar and defaultAvatarUrl must be `defaultAvatars.Avatar7`
            expect(defaultAvatar === defaultAvatars.Avatar7).toBeTruthy();
        });
        it('should return the same url if url is not for default avatar', function () {
            var avatarURL = 'https://test.com/images/some_avatar.png';
            var avatar = UserAvatarUtils.getAvatar({ avatarSource: avatarURL, accountID: 1 });
            expect(avatar).toEqual('https://test.com/images/some_avatar.png');
        });
        it('should return default avatar for Concierge URLs', function () {
            var avatar = UserAvatarUtils.getAvatar({ avatarSource: CONST_1.default.CONCIERGE_ICON_URL, accountID: CONST_1.default.ACCOUNT_ID.CONCIERGE });
            expect(avatar).toBeDefined();
        });
        it('should return default avatar SVG for default avatar URL', function () {
            var avatar = UserAvatarUtils.getAvatar({ avatarSource: 'https://d2k5nsl2zxldvw.cloudfront.net/images/avatars/avatar_2.png', accountID: 2 });
            expect(typeof avatar).toBe('function');
            expect(avatar).toBe(defaultAvatars.Avatar2);
        });
        it('should return default avatar SVG for default avatar URL regardless of accountEmail or accountId provided', function () {
            var defaultAvatarURL = 'https://d2k5nsl2zxldvw.cloudfront.net/images/avatars/user/default-avatar_5.png';
            var avatarByEmail = UserAvatarUtils.getAvatar({ avatarSource: defaultAvatarURL, accountID: 5, accountEmail: 'alice@example.com' });
            var avatarById = UserAvatarUtils.getAvatar({ avatarSource: defaultAvatarURL, accountID: 5 });
            expect(avatarByEmail).toBe(defaultAvatars.Avatar5);
            expect(avatarById).toBe(defaultAvatars.Avatar5);
        });
    });
    describe('getAvatarUrl', function () {
        it('should return default avatar URL when url is for default avatar', function () {
            var avatarURL = 'https://d2k5nsl2zxldvw.cloudfront.net/images/avatars/default-avatar_7.png';
            var defaultAvatarUrl = UserAvatarUtils.getAvatarURL({ avatarSource: avatarURL, accountID: 1 });
            expect(defaultAvatarUrl).toBe('https://d2k5nsl2zxldvw.cloudfront.net/images/avatars/default-avatar_7.png');
        });
        it('should return the same url if url is not for default avatar', function () {
            var avatarURL = 'https://test.com/images/some_avatar.png';
            var avatarUrl = UserAvatarUtils.getAvatarURL({ avatarSource: avatarURL, accountID: 1 });
            expect(avatarUrl).toEqual('https://test.com/images/some_avatar.png');
        });
    });
    describe('getPresetAvatarURL', function () {
        it('should return Concierge icon URL for Concierge account', function () {
            var url = UserAvatarUtils.getDefaultAvatarURL({ accountID: CONST_1.default.ACCOUNT_ID.CONCIERGE });
            expect(url).toBe(CONST_1.default.CONCIERGE_ICON_URL);
        });
        it('should return default avatar URL for regular account', function () {
            var url = UserAvatarUtils.getDefaultAvatarURL({ accountID: 1 });
            expect(url).toContain('default-avatar_');
            expect(url).toContain('.png');
        });
        it('should extract avatar number from avatarURL when provided', function () {
            var url = UserAvatarUtils.getDefaultAvatarURL({ accountID: 999, avatarURL: 'https://example.com/default-avatar_5.png' });
            expect(url).toContain('default-avatar_5.png');
        });
        it('should prioritize avatarURL parameter over accountID', function () {
            var urlWithAvatar = UserAvatarUtils.getDefaultAvatarURL({ accountID: 1, avatarURL: 'https://example.com/avatar_10.png' });
            var urlWithoutAvatar = UserAvatarUtils.getDefaultAvatarURL({ accountID: 1 });
            expect(urlWithAvatar).toContain('default-avatar_10.png');
            expect(urlWithoutAvatar).toContain('default-avatar_2.png');
        });
        it('should use accountID modulo when only accountID is provided', function () {
            var url1 = UserAvatarUtils.getDefaultAvatarURL({ accountID: 1 });
            var url25 = UserAvatarUtils.getDefaultAvatarURL({ accountID: 25 }); // 25 % 24 + 1 = 2
            expect(url1).toContain('default-avatar_2.png'); // 1 % 24 + 1 = 2
            expect(url25).toContain('default-avatar_2.png'); // 25 % 24 + 1 = 2
            expect(url1).toBe(url25); // Same modulo result
        });
        it('should use accountEmail hash instead of accountID when email is provided', function () {
            var urlByID = UserAvatarUtils.getDefaultAvatarURL({ accountID: 10 });
            var urlByEmail = UserAvatarUtils.getDefaultAvatarURL({ accountID: 10, accountEmail: 'john.doe@example.com' });
            expect(urlByID).toContain('default-avatar_');
            expect(urlByEmail).toContain('default-avatar_');
            expect(urlByID).not.toBe(urlByEmail);
        });
        it('should produce consistent avatar for same email', function () {
            var url1 = UserAvatarUtils.getDefaultAvatarURL({ accountID: 1, accountEmail: 'consistent@example.com' });
            var url2 = UserAvatarUtils.getDefaultAvatarURL({ accountID: 999, accountEmail: 'consistent@example.com' });
            expect(url1).toBe(url2);
        });
    });
    describe('isDefaultAvatar', function () {
        it('should return true for default avatar URLs with avatar_ prefix', function () {
            expect(UserAvatarUtils.isDefaultAvatar('https://d2k5nsl2zxldvw.cloudfront.net/images/avatars/avatar_7.png')).toBe(true);
        });
        it('should return true for default avatar URLs with default-avatar_ prefix', function () {
            expect(UserAvatarUtils.isDefaultAvatar('https://d2k5nsl2zxldvw.cloudfront.net/images/avatars/default-avatar_7.png')).toBe(true);
        });
        it('should return true for user default avatar URLs', function () {
            expect(UserAvatarUtils.isDefaultAvatar('https://d2k5nsl2zxldvw.cloudfront.net/images/avatars/user/default-avatar_7.png')).toBe(true);
        });
        it('should return true for Concierge icon URL', function () {
            expect(UserAvatarUtils.isDefaultAvatar(CONST_1.default.CONCIERGE_ICON_URL)).toBe(true);
        });
        it('should return true for legacy Concierge icon URL', function () {
            expect(UserAvatarUtils.isDefaultAvatar(CONST_1.default.CONCIERGE_ICON_URL_2021)).toBe(true);
        });
        it('should return false for custom avatar URLs', function () {
            expect(UserAvatarUtils.isDefaultAvatar('https://example.com/custom-avatar.png')).toBe(false);
        });
        it('should return false for undefined', function () {
            expect(UserAvatarUtils.isDefaultAvatar(undefined)).toBe(false);
        });
    });
    describe('isPresetAvatar', function () {
        it('should return true for custom avatar URLs in catalog', function () {
            var customURL = 'https://d2k5nsl2zxldvw.cloudfront.net/images/avatars/default-avatar_5.png';
            expect(UserAvatarUtils.isPresetAvatar(customURL)).toBe(true);
        });
        it('should return false for non-custom URLs', function () {
            expect(UserAvatarUtils.isPresetAvatar('https://example.com/random.png')).toBe(false);
        });
        it('should return false for Concierge URL', function () {
            expect(UserAvatarUtils.isPresetAvatar(CONST_1.default.CONCIERGE_ICON_URL)).toBe(false);
        });
        it('should return false for undefined', function () {
            expect(UserAvatarUtils.isPresetAvatar(undefined)).toBe(false);
        });
    });
    describe('isLetterAvatar', function () {
        it('should return true for valid letter avatar filenames', function () {
            expect(UserAvatarUtils.isLetterAvatar('letter-avatar-#FF5733-#C70039-A.png')).toBe(true);
            expect(UserAvatarUtils.isLetterAvatar('letter-avatar-#000000-#FFFFFF-Z.png')).toBe(true);
        });
        it('should return false for invalid letter avatar filenames', function () {
            expect(UserAvatarUtils.isLetterAvatar('letter-avatar-#FF5733-#C70039-a.png')).toBe(false); // lowercase letter
            expect(UserAvatarUtils.isLetterAvatar('letter-avatar-#FF573-#C70039-A.png')).toBe(false); // invalid hex
            expect(UserAvatarUtils.isLetterAvatar('random-avatar.png')).toBe(false);
        });
        it('should return false for undefined', function () {
            expect(UserAvatarUtils.isLetterAvatar(undefined)).toBe(false);
        });
        it('should return false for empty string', function () {
            expect(UserAvatarUtils.isLetterAvatar('')).toBe(false);
        });
    });
    describe('getSmallSizeAvatar', function () {
        it('should add _128 suffix to CloudFront avatars', function () {
            var source = 'https://d2k5nsl2zxldvw.cloudfront.net/images/avatar.png';
            var result = UserAvatarUtils.getSmallSizeAvatar({ avatarSource: source, accountID: 1 });
            expect(result).toBe('https://d2k5nsl2zxldvw.cloudfront.net/images/avatar_128.png');
        });
        it('should not add _128 to non-CloudFront URLs', function () {
            var source = 'https://example.com/avatar.png';
            var result = UserAvatarUtils.getSmallSizeAvatar({ avatarSource: source, accountID: 1 });
            expect(result).toBe(source);
        });
        it('should not duplicate _128 suffix', function () {
            var source = 'https://d2k5nsl2zxldvw.cloudfront.net/images/avatar_128.png';
            var result = UserAvatarUtils.getSmallSizeAvatar({ avatarSource: source, accountID: 1 });
            expect(result).toBe(source);
        });
        it('should return SVG component as-is for default avatars', function () {
            var defaultAvatarURL = 'https://d2k5nsl2zxldvw.cloudfront.net/images/avatars/default-avatar_5.png';
            var result = UserAvatarUtils.getSmallSizeAvatar({ avatarSource: defaultAvatarURL, accountID: 5 });
            expect(typeof result).toBe('function'); // SVG component
        });
    });
    describe('getFullSizeAvatar', function () {
        it('should remove _128 suffix from avatar URLs', function () {
            var source = 'https://example.com/avatar_128.png';
            var result = UserAvatarUtils.getFullSizeAvatar({ avatarSource: source, accountID: 1 });
            expect(result).toBe('https://example.com/avatar.png');
        });
        it('should return avatar as-is if no _128 suffix', function () {
            var source = 'https://example.com/avatar.png';
            var result = UserAvatarUtils.getFullSizeAvatar({ avatarSource: source, accountID: 1 });
            expect(result).toBe(source);
        });
        it('should return SVG component as-is for default avatars', function () {
            var defaultAvatarURL = 'https://d2k5nsl2zxldvw.cloudfront.net/images/avatars/default-avatar_3.png';
            var result = UserAvatarUtils.getFullSizeAvatar({ avatarSource: defaultAvatarURL, accountID: 3 });
            expect(typeof result).toBe('function'); // SVG component
            expect(result).toBe(defaultAvatars.Avatar3);
        });
    });
    describe('getPresetAvatarNameFromURL', function () {
        it('should extract custom avatar name from CloudFront URL', function () {
            var url = 'https://d2k5nsl2zxldvw.cloudfront.net/images/avatars/default-avatar_5.png';
            var result = UserAvatarUtils.getPresetAvatarNameFromURL(url);
            expect(result).toBe('default-avatar_5');
        });
        it('should return undefined for non-custom avatar URLs', function () {
            var url = 'https://example.com/custom-upload.png';
            var result = UserAvatarUtils.getPresetAvatarNameFromURL(url);
            expect(result).toBeUndefined();
        });
        it('should return undefined for Concierge URL', function () {
            var result = UserAvatarUtils.getPresetAvatarNameFromURL(CONST_1.default.CONCIERGE_ICON_URL);
            expect(result).toBeUndefined();
        });
        it('should return undefined for undefined input', function () {
            var result = UserAvatarUtils.getPresetAvatarNameFromURL(undefined);
            expect(result).toBeUndefined();
        });
    });
    describe('getDefaultAvatarName', function () {
        it('should return avatar name for account ID', function () {
            var name = UserAvatarUtils.getDefaultAvatarName({ accountID: 1 });
            expect(name).toBe('default-avatar_2'); // (1 % 24) + 1 = 2
        });
        it('should return avatar name using email hash when provided', function () {
            var name1 = UserAvatarUtils.getDefaultAvatarName({ accountID: 1, accountEmail: 'test@example.com' });
            var name2 = UserAvatarUtils.getDefaultAvatarName({ accountID: 999, accountEmail: 'test@example.com' });
            expect(name1).toBe(name2); // Same email = same avatar
            expect(name1).toContain('default-avatar_');
        });
        it('should extract avatar number from existing avatarURL', function () {
            var name = UserAvatarUtils.getDefaultAvatarName({ accountID: 999, avatarURL: 'https://example.com/avatar_12.png' });
            expect(name).toBe('default-avatar_12');
        });
        it('should prioritize avatarURL over accountID and email', function () {
            var name = UserAvatarUtils.getDefaultAvatarName({ accountID: 1, accountEmail: 'test@example.com', avatarURL: 'https://example.com/default-avatar_20.png' });
            expect(name).toBe('default-avatar_20');
        });
    });
});
