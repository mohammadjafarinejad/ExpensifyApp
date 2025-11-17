"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_native_1 = require("@testing-library/react-native");
var react_1 = require("react");
var Icon_1 = require("@components/Icon");
var InitialAvatars_1 = require("@libs/Avatars/InitialAvatars");
describe('getInitialFromText', function () {
    it('returns the first valid letter or number', function () {
        expect((0, InitialAvatars_1.getInitialFromText)('John')).toBe('J');
        expect((0, InitialAvatars_1.getInitialFromText)(' Ringo')).toBe('R');
        expect((0, InitialAvatars_1.getInitialFromText)('123George')).toBe('1');
        expect((0, InitialAvatars_1.getInitialFromText)('!@#Paul')).toBe('P');
    });
    it('falls back to DEFAULT_INITIAL for empty or invalid input', function () {
        expect((0, InitialAvatars_1.getInitialFromText)('')).toBe(InitialAvatars_1.DEFAULT_INITIAL);
        expect((0, InitialAvatars_1.getInitialFromText)(null)).toBe(InitialAvatars_1.DEFAULT_INITIAL);
        expect((0, InitialAvatars_1.getInitialFromText)(undefined)).toBe(InitialAvatars_1.DEFAULT_INITIAL);
        expect((0, InitialAvatars_1.getInitialFromText)('!@#$')).toBe(InitialAvatars_1.DEFAULT_INITIAL);
    });
    it('ignores non-ASCII leading characters', function () {
        expect((0, InitialAvatars_1.getInitialFromText)('éJohn')).toBe('J'); // diacritic ignored
        expect((0, InitialAvatars_1.getInitialFromText)('你好')).toBe(InitialAvatars_1.DEFAULT_INITIAL);
    });
});
describe('getInitialAvatarSvg', function () {
    it('resolves a component for a valid initial', function () {
        var AvatarComponent = (0, InitialAvatars_1.getInitialAvatarSvg)('J');
        expect(AvatarComponent).toBeDefined();
        expect(typeof AvatarComponent).toBe('function');
    });
    it('renders a letter avatar component', function () {
        var AvatarComponent = (0, InitialAvatars_1.getInitialAvatarSvg)('J');
        var toJSON = (0, react_native_1.render)(<Icon_1.default src={AvatarComponent}/>).toJSON;
        expect(toJSON()).toBeTruthy();
    });
    it('matches snapshot for a letter avatar', function () {
        var AvatarComponent = (0, InitialAvatars_1.getInitialAvatarSvg)('J');
        var toJSON = (0, react_native_1.render)(<Icon_1.default src={AvatarComponent}/>).toJSON;
        expect(toJSON()).toMatchSnapshot();
    });
});
