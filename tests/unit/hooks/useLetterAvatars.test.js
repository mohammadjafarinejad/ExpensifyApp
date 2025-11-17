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
var react_native_1 = require("@testing-library/react-native");
var react_1 = require("react");
var useLetterAvatars_1 = require("@hooks/useLetterAvatars");
// eslint-disable-next-line no-restricted-syntax -- For mocking
var PresetAvatarCatalog = require("@libs/Avatars/PresetAvatarCatalog");
var mockAvatarComponent = react_1.default.memo(function (props) {
    return react_1.default.createElement('svg', __assign(__assign({}, props), { dataTestId: 'letter-avatar' }));
});
describe('useLetterAvatars', function () {
    beforeEach(function () {
        jest.clearAllMocks();
    });
    describe('basic functionality', function () {
        it('should return the expected structure', function () {
            jest.spyOn(PresetAvatarCatalog, 'getLetterAvatar').mockReturnValue(mockAvatarComponent);
            var result = (0, react_native_1.renderHook)(function () { return (0, useLetterAvatars_1.default)('John'); }).result;
            expect(result.current).toHaveProperty('avatarList');
            expect(result.current).toHaveProperty('avatarMap');
            expect(Array.isArray(result.current.avatarList)).toBe(true);
            expect(typeof result.current.avatarMap).toBe('object');
            // LETTER_AVATAR_COLOR_OPTIONS has 18 color combinations
            expect(result.current.avatarList).toHaveLength(18);
            expect(Object.keys(result.current.avatarMap)).toHaveLength(18);
        });
        it('should create unique IDs for each avatar variant', function () {
            jest.spyOn(PresetAvatarCatalog, 'getLetterAvatar').mockReturnValue(mockAvatarComponent);
            var result = (0, react_native_1.renderHook)(function () { return (0, useLetterAvatars_1.default)('Bob'); }).result;
            var ids = result.current.avatarList.map(function (item) { return item.id; });
            var uniqueIds = new Set(ids);
            expect(uniqueIds.size).toBe(ids.length);
            // IDs should follow the pattern: letter-avatar-{backgroundColor}-{fillColor}-{initial}
            expect(ids.at(0)).toMatch(/^letter-avatar-#[0-9a-f]{6}-#[0-9a-f]{6}-[a-z0-9]$/i);
        });
        it('should include the StyledLetterAvatar component in each item', function () {
            jest.spyOn(PresetAvatarCatalog, 'getLetterAvatar').mockReturnValue(mockAvatarComponent);
            var result = (0, react_native_1.renderHook)(function () { return (0, useLetterAvatars_1.default)('Charlie'); }).result;
            result.current.avatarList.forEach(function (item) {
                expect(item).toHaveProperty('id');
                expect(item).toHaveProperty('StyledLetterAvatar');
                expect(typeof item.StyledLetterAvatar).toBe('function');
            });
        });
    });
    describe('name handling', function () {
        it.each([
            ['names with special characters', 'Émilie', '-E'],
            ['names starting with numbers', '5th Avenue', '-5'],
            ['single character names', 'X', '-'],
        ])('should handle %s', function (_, name, expectedChar) {
            var _a;
            jest.spyOn(PresetAvatarCatalog, 'getLetterAvatar').mockReturnValue(mockAvatarComponent);
            var result = (0, react_native_1.renderHook)(function () { return (0, useLetterAvatars_1.default)(name); }).result;
            expect(result.current.avatarList).toHaveLength(18);
            expect((_a = result.current.avatarList.at(0)) === null || _a === void 0 ? void 0 : _a.id).toContain(expectedChar);
        });
    });
    describe('edge cases', function () {
        it.each([
            ['undefined string name', undefined],
            ['empty string name', ''],
            ['names with only spaces', '   '],
            ['names with only special characters', '!@#$%'],
        ])('should handle %s', function (_, name) {
            jest.spyOn(PresetAvatarCatalog, 'getLetterAvatar').mockReturnValue(null);
            var result = (0, react_native_1.renderHook)(function () { return (0, useLetterAvatars_1.default)(name); }).result;
            expect(result.current.avatarList).toEqual([]);
            expect(result.current.avatarMap).toEqual({});
        });
    });
});
