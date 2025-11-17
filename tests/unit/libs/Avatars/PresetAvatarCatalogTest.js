"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_native_1 = require("@testing-library/react-native");
var react_1 = require("react");
var Icon_1 = require("@components/Icon");
var PresetAvatarCatalog_1 = require("@libs/Avatars/PresetAvatarCatalog");
var SAMPLE_DEFAULT_ID = 'default-avatar_1';
var SAMPLE_SEASON_ID = 'car-blue100';
describe('PresetAvatarCatalog', function () {
    it('resolves a local component for a default avatar ID', function () {
        var AvatarComponent = (0, PresetAvatarCatalog_1.getAvatarLocal)(SAMPLE_DEFAULT_ID);
        expect(AvatarComponent).toBeDefined();
        expect(typeof AvatarComponent).toBe('function');
    });
    it('resolves a CDN URL for a default avatar ID', function () {
        var avatarUrl = (0, PresetAvatarCatalog_1.getAvatarURL)(SAMPLE_DEFAULT_ID);
        expect(avatarUrl).toContain("/images/avatars/".concat(SAMPLE_DEFAULT_ID));
    });
    it('renders a default avatar component', function () {
        var AvatarComponent = (0, PresetAvatarCatalog_1.getAvatarLocal)(SAMPLE_DEFAULT_ID);
        var toJSON = (0, react_native_1.render)(<Icon_1.default src={AvatarComponent}/>).toJSON;
        expect(toJSON()).toBeTruthy();
    });
    it('matches snapshot for a default avatar', function () {
        var AvatarComponent = (0, PresetAvatarCatalog_1.getAvatarLocal)(SAMPLE_DEFAULT_ID);
        var toJSON = (0, react_native_1.render)(<Icon_1.default src={AvatarComponent}/>).toJSON;
        expect(toJSON()).toMatchSnapshot();
    });
    it('resolves a local component for a seasonal avatar ID', function () {
        var AvatarComponent = (0, PresetAvatarCatalog_1.getAvatarLocal)(SAMPLE_SEASON_ID);
        expect(AvatarComponent).toBeDefined();
        expect(typeof AvatarComponent).toBe('function');
    });
    it('resolves a CDN URL for a seasonal avatar ID', function () {
        var avatarUrl = (0, PresetAvatarCatalog_1.getAvatarURL)(SAMPLE_SEASON_ID);
        expect(avatarUrl).toContain("/images/avatars/custom-avatars/season-f1/".concat(SAMPLE_SEASON_ID));
    });
    it('renders a seasonal avatar component', function () {
        var AvatarComponent = (0, PresetAvatarCatalog_1.getAvatarLocal)(SAMPLE_SEASON_ID);
        var toJSON = (0, react_native_1.render)(<Icon_1.default src={AvatarComponent}/>).toJSON;
        expect(toJSON()).toBeTruthy();
    });
    it('throws or returns undefined for an unknown ID', function () {
        // @ts-expect-error - This is a test for an unknown ID
        expect((0, PresetAvatarCatalog_1.getAvatarLocal)('not-a-real-id')).toBeUndefined();
        // @ts-expect-error - This is a test for an unknown ID
        expect((0, PresetAvatarCatalog_1.getAvatarURL)('not-a-real-id')).toBeUndefined();
    });
    it('ALL contains both default and seasonal IDs', function () {
        expect(Object.keys(PresetAvatarCatalog_1.PRESET_AVATAR_CATALOG)).toEqual(expect.arrayContaining([SAMPLE_DEFAULT_ID, SAMPLE_SEASON_ID]));
    });
});
