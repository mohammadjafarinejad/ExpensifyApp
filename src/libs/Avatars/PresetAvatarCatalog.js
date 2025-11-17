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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAvatarURL = exports.getAvatarLocal = exports.DEFAULT_AVATAR_PREFIX = exports.LETTER_DEFAULTS = exports.LETTER_AVATAR_COLOR_OPTIONS = exports.PRESET_AVATAR_CATALOG_ORDERED = exports.PRESET_AVATAR_CATALOG = void 0;
exports.getLetterAvatar = getLetterAvatar;
exports.isPresetAvatarID = isPresetAvatarID;
var SeasonF1 = require("@components/Icon/CustomAvatars/SeasonF1");
var DefaultAvatars = require("@components/Icon/DefaultAvatars");
var LetterDefaultAvatars = require("@components/Icon/WorkspaceDefaultAvatars");
var getFirstAlphaNumericCharacter_1 = require("@libs/getFirstAlphaNumericCharacter");
var colors_1 = require("@styles/theme/colors");
var CONST_1 = require("@src/CONST");
var CDN_DEFAULT_AVATARS = "".concat(CONST_1.default.CLOUDFRONT_URL, "/images/avatars");
var CDN_SEASON_F1 = "".concat(CONST_1.default.CLOUDFRONT_URL, "/images/avatars/custom-avatars/season-f1");
var DEFAULT_AVATAR_PREFIX = "default-avatar";
exports.DEFAULT_AVATAR_PREFIX = DEFAULT_AVATAR_PREFIX;
var LETTER_AVATAR_COLOR_OPTIONS = [
    { backgroundColor: colors_1.default.blue100, fillColor: colors_1.default.blue600 },
    { backgroundColor: colors_1.default.blue400, fillColor: colors_1.default.blue700 },
    { backgroundColor: colors_1.default.blue700, fillColor: colors_1.default.blue200 },
    { backgroundColor: colors_1.default.green100, fillColor: colors_1.default.green600 },
    { backgroundColor: colors_1.default.green400, fillColor: colors_1.default.green700 },
    { backgroundColor: colors_1.default.green700, fillColor: colors_1.default.green200 },
    { backgroundColor: colors_1.default.yellow100, fillColor: colors_1.default.yellow600 },
    { backgroundColor: colors_1.default.yellow400, fillColor: colors_1.default.yellow700 },
    { backgroundColor: colors_1.default.yellow700, fillColor: colors_1.default.yellow200 },
    { backgroundColor: colors_1.default.tangerine100, fillColor: colors_1.default.tangerine600 },
    { backgroundColor: colors_1.default.tangerine400, fillColor: colors_1.default.tangerine700 },
    { backgroundColor: colors_1.default.tangerine700, fillColor: colors_1.default.tangerine200 },
    { backgroundColor: colors_1.default.pink100, fillColor: colors_1.default.pink600 },
    { backgroundColor: colors_1.default.pink400, fillColor: colors_1.default.pink700 },
    { backgroundColor: colors_1.default.pink700, fillColor: colors_1.default.pink200 },
    { backgroundColor: colors_1.default.ice100, fillColor: colors_1.default.ice600 },
    { backgroundColor: colors_1.default.ice400, fillColor: colors_1.default.ice700 },
    { backgroundColor: colors_1.default.ice700, fillColor: colors_1.default.ice200 },
];
exports.LETTER_AVATAR_COLOR_OPTIONS = LETTER_AVATAR_COLOR_OPTIONS;
var DEFAULTS = {
    'default-avatar_1': { local: DefaultAvatars.Avatar1, url: "".concat(CDN_DEFAULT_AVATARS, "/default-avatar_1.png") },
    'default-avatar_2': { local: DefaultAvatars.Avatar2, url: "".concat(CDN_DEFAULT_AVATARS, "/default-avatar_2.png") },
    'default-avatar_3': { local: DefaultAvatars.Avatar3, url: "".concat(CDN_DEFAULT_AVATARS, "/default-avatar_3.png") },
    'default-avatar_4': { local: DefaultAvatars.Avatar4, url: "".concat(CDN_DEFAULT_AVATARS, "/default-avatar_4.png") },
    'default-avatar_5': { local: DefaultAvatars.Avatar5, url: "".concat(CDN_DEFAULT_AVATARS, "/default-avatar_5.png") },
    'default-avatar_6': { local: DefaultAvatars.Avatar6, url: "".concat(CDN_DEFAULT_AVATARS, "/default-avatar_6.png") },
    'default-avatar_7': { local: DefaultAvatars.Avatar7, url: "".concat(CDN_DEFAULT_AVATARS, "/default-avatar_7.png") },
    'default-avatar_8': { local: DefaultAvatars.Avatar8, url: "".concat(CDN_DEFAULT_AVATARS, "/default-avatar_8.png") },
    'default-avatar_9': { local: DefaultAvatars.Avatar9, url: "".concat(CDN_DEFAULT_AVATARS, "/default-avatar_9.png") },
    'default-avatar_10': { local: DefaultAvatars.Avatar10, url: "".concat(CDN_DEFAULT_AVATARS, "/default-avatar_10.png") },
    'default-avatar_11': { local: DefaultAvatars.Avatar11, url: "".concat(CDN_DEFAULT_AVATARS, "/default-avatar_11.png") },
    'default-avatar_12': { local: DefaultAvatars.Avatar12, url: "".concat(CDN_DEFAULT_AVATARS, "/default-avatar_12.png") },
    'default-avatar_13': { local: DefaultAvatars.Avatar13, url: "".concat(CDN_DEFAULT_AVATARS, "/default-avatar_13.png") },
    'default-avatar_14': { local: DefaultAvatars.Avatar14, url: "".concat(CDN_DEFAULT_AVATARS, "/default-avatar_14.png") },
    'default-avatar_15': { local: DefaultAvatars.Avatar15, url: "".concat(CDN_DEFAULT_AVATARS, "/default-avatar_15.png") },
    'default-avatar_16': { local: DefaultAvatars.Avatar16, url: "".concat(CDN_DEFAULT_AVATARS, "/default-avatar_16.png") },
    'default-avatar_17': { local: DefaultAvatars.Avatar17, url: "".concat(CDN_DEFAULT_AVATARS, "/default-avatar_17.png") },
    'default-avatar_18': { local: DefaultAvatars.Avatar18, url: "".concat(CDN_DEFAULT_AVATARS, "/default-avatar_18.png") },
    'default-avatar_19': { local: DefaultAvatars.Avatar19, url: "".concat(CDN_DEFAULT_AVATARS, "/default-avatar_19.png") },
    'default-avatar_20': { local: DefaultAvatars.Avatar20, url: "".concat(CDN_DEFAULT_AVATARS, "/default-avatar_20.png") },
    'default-avatar_21': { local: DefaultAvatars.Avatar21, url: "".concat(CDN_DEFAULT_AVATARS, "/default-avatar_21.png") },
    'default-avatar_22': { local: DefaultAvatars.Avatar22, url: "".concat(CDN_DEFAULT_AVATARS, "/default-avatar_22.png") },
    'default-avatar_23': { local: DefaultAvatars.Avatar23, url: "".concat(CDN_DEFAULT_AVATARS, "/default-avatar_23.png") },
    'default-avatar_24': { local: DefaultAvatars.Avatar24, url: "".concat(CDN_DEFAULT_AVATARS, "/default-avatar_24.png") },
};
var SEASON_F1 = {
    'car-blue100': { local: SeasonF1.CarBlue100, url: "".concat(CDN_SEASON_F1, "/car-blue100.png") },
    'car-green100': { local: SeasonF1.CarGreen100, url: "".concat(CDN_SEASON_F1, "/car-green100.png") },
    'car-ice100': { local: SeasonF1.CarIce100, url: "".concat(CDN_SEASON_F1, "/car-ice100.png") },
    'car-pink100': { local: SeasonF1.CarPink100, url: "".concat(CDN_SEASON_F1, "/car-pink100.png") },
    'car-tangerine100': { local: SeasonF1.CarTangerine100, url: "".concat(CDN_SEASON_F1, "/car-tangerine100.png") },
    'car-yellow100': { local: SeasonF1.CarYellow100, url: "".concat(CDN_SEASON_F1, "/car-yellow100.png") },
    'champagne-green400': { local: SeasonF1.ChampagneGreen400, url: "".concat(CDN_SEASON_F1, "/champagne-green400.png") },
    'cone-tangerine700': { local: SeasonF1.ConeTangerine700, url: "".concat(CDN_SEASON_F1, "/cone-tangerine700.png") },
    'flag-blue600': { local: SeasonF1.FlagBlue600, url: "".concat(CDN_SEASON_F1, "/flag-blue600.png") },
    'gasoline-tangerine400': { local: SeasonF1.GasolineTangerine400, url: "".concat(CDN_SEASON_F1, "/gasoline-tangerine400.png") },
    'helmet-blue400': { local: SeasonF1.HelmetBlue400, url: "".concat(CDN_SEASON_F1, "/helmet-blue400.png") },
    'helmet-green400': { local: SeasonF1.HelmetGreen400, url: "".concat(CDN_SEASON_F1, "/helmet-green400.png") },
    'helmet-ice400': { local: SeasonF1.HelmetIce400, url: "".concat(CDN_SEASON_F1, "/helmet-ice400.png") },
    'helmet-pink400': { local: SeasonF1.HelmetPink400, url: "".concat(CDN_SEASON_F1, "/helmet-pink400.png") },
    'helmet-tangerine400': { local: SeasonF1.HelmetTangerine400, url: "".concat(CDN_SEASON_F1, "/helmet-tangerine400.png") },
    'helmet-yellow400': { local: SeasonF1.HelmetYellow400, url: "".concat(CDN_SEASON_F1, "/helmet-yellow400.png") },
    'medal-yellow400': { local: SeasonF1.MedalYellow400, url: "".concat(CDN_SEASON_F1, "/medal-yellow400.png") },
    'podium-blue400': { local: SeasonF1.PodiumBlue400, url: "".concat(CDN_SEASON_F1, "/podium-blue400.png") },
    'speedometer-ice400': { local: SeasonF1.SpeedometerIce400, url: "".concat(CDN_SEASON_F1, "/speedometer-ice400.png") },
    'steeringwheel-pink400': { local: SeasonF1.SteeringWheelPink400, url: "".concat(CDN_SEASON_F1, "/steeringwheel-pink400.png") },
    'stopwatch-ice600': { local: SeasonF1.StopwatchIce600, url: "".concat(CDN_SEASON_F1, "/stopwatch-ice600.png") },
    'tire-green400': { local: SeasonF1.TireGreen400, url: "".concat(CDN_SEASON_F1, "/tire-green400.png") },
    'trophy-yellow600': { local: SeasonF1.TrophyYellow600, url: "".concat(CDN_SEASON_F1, "/trophy-yellow600.png") },
    'wrenches-pink600': { local: SeasonF1.WrenchesPink600, url: "".concat(CDN_SEASON_F1, "/wrenches-pink600.png") },
};
var LETTER_DEFAULTS = {
    'letter-default-avatar_0': { local: LetterDefaultAvatars.Workspace0 },
    'letter-default-avatar_1': { local: LetterDefaultAvatars.Workspace1 },
    'letter-default-avatar_2': { local: LetterDefaultAvatars.Workspace2 },
    'letter-default-avatar_3': { local: LetterDefaultAvatars.Workspace3 },
    'letter-default-avatar_4': { local: LetterDefaultAvatars.Workspace4 },
    'letter-default-avatar_5': { local: LetterDefaultAvatars.Workspace5 },
    'letter-default-avatar_6': { local: LetterDefaultAvatars.Workspace6 },
    'letter-default-avatar_7': { local: LetterDefaultAvatars.Workspace7 },
    'letter-default-avatar_8': { local: LetterDefaultAvatars.Workspace8 },
    'letter-default-avatar_9': { local: LetterDefaultAvatars.Workspace9 },
    'letter-default-avatar_a': { local: LetterDefaultAvatars.WorkspaceA },
    'letter-default-avatar_b': { local: LetterDefaultAvatars.WorkspaceB },
    'letter-default-avatar_c': { local: LetterDefaultAvatars.WorkspaceC },
    'letter-default-avatar_d': { local: LetterDefaultAvatars.WorkspaceD },
    'letter-default-avatar_e': { local: LetterDefaultAvatars.WorkspaceE },
    'letter-default-avatar_f': { local: LetterDefaultAvatars.WorkspaceF },
    'letter-default-avatar_g': { local: LetterDefaultAvatars.WorkspaceG },
    'letter-default-avatar_h': { local: LetterDefaultAvatars.WorkspaceH },
    'letter-default-avatar_i': { local: LetterDefaultAvatars.WorkspaceI },
    'letter-default-avatar_j': { local: LetterDefaultAvatars.WorkspaceJ },
    'letter-default-avatar_k': { local: LetterDefaultAvatars.WorkspaceK },
    'letter-default-avatar_l': { local: LetterDefaultAvatars.WorkspaceL },
    'letter-default-avatar_m': { local: LetterDefaultAvatars.WorkspaceM },
    'letter-default-avatar_n': { local: LetterDefaultAvatars.WorkspaceN },
    'letter-default-avatar_o': { local: LetterDefaultAvatars.WorkspaceO },
    'letter-default-avatar_p': { local: LetterDefaultAvatars.WorkspaceP },
    'letter-default-avatar_q': { local: LetterDefaultAvatars.WorkspaceQ },
    'letter-default-avatar_r': { local: LetterDefaultAvatars.WorkspaceR },
    'letter-default-avatar_s': { local: LetterDefaultAvatars.WorkspaceS },
    'letter-default-avatar_t': { local: LetterDefaultAvatars.WorkspaceT },
    'letter-default-avatar_u': { local: LetterDefaultAvatars.WorkspaceU },
    'letter-default-avatar_v': { local: LetterDefaultAvatars.WorkspaceV },
    'letter-default-avatar_w': { local: LetterDefaultAvatars.WorkspaceW },
    'letter-default-avatar_x': { local: LetterDefaultAvatars.WorkspaceX },
    'letter-default-avatar_y': { local: LetterDefaultAvatars.WorkspaceY },
    'letter-default-avatar_z': { local: LetterDefaultAvatars.WorkspaceZ },
};
exports.LETTER_DEFAULTS = LETTER_DEFAULTS;
var DISPLAY_ORDER = [
    'car-blue100',
    'default-avatar_1',
    'helmet-blue400',
    'default-avatar_13',
    'default-avatar_7',
    'podium-blue400',
    'flag-blue600',
    'default-avatar_19',
    'car-green100',
    'default-avatar_2',
    'helmet-green400',
    'default-avatar_14',
    'default-avatar_8',
    'tire-green400',
    'champagne-green400',
    'default-avatar_20',
    'car-yellow100',
    'default-avatar_3',
    'helmet-yellow400',
    'default-avatar_15',
    'default-avatar_9',
    'medal-yellow400',
    'trophy-yellow600',
    'default-avatar_21',
    'car-tangerine100',
    'default-avatar_4',
    'helmet-tangerine400',
    'default-avatar_16',
    'default-avatar_10',
    'gasoline-tangerine400',
    'cone-tangerine700',
    'default-avatar_22',
    'car-pink100',
    'default-avatar_5',
    'helmet-pink400',
    'default-avatar_17',
    'default-avatar_11',
    'steeringwheel-pink400',
    'wrenches-pink600',
    'default-avatar_23',
    'car-ice100',
    'default-avatar_6',
    'helmet-ice400',
    'default-avatar_18',
    'default-avatar_12',
    'speedometer-ice400',
    'stopwatch-ice600',
    'default-avatar_24',
];
var PRESET_AVATAR_CATALOG = __assign(__assign({}, DEFAULTS), SEASON_F1);
exports.PRESET_AVATAR_CATALOG = PRESET_AVATAR_CATALOG;
var buildOrderedAvatars = function () {
    var allIDS = Object.keys(PRESET_AVATAR_CATALOG);
    var explicit = DISPLAY_ORDER.filter(function (id) { return id in PRESET_AVATAR_CATALOG; });
    var explicitSet = new Set(explicit);
    var leftovers = allIDS.filter(function (id) { return !explicitSet.has(id); }).sort();
    var finalIDOrder = __spreadArray(__spreadArray([], explicit, true), leftovers, true);
    return finalIDOrder.map(function (id) { return (__assign({ id: id }, PRESET_AVATAR_CATALOG[id])); });
};
/**
 * Returns a letter avatar component based on the first letter of the provided name.
 * @param name - The name to extract first letter/character from. (Expected 0-9, A-Z)
 * @returns Letter avatar component or null if no valid initial is found.
 */
function getLetterAvatar(name) {
    if (!name || name.length === 0) {
        return null;
    }
    var firstChar = (0, getFirstAlphaNumericCharacter_1.default)(name).toLowerCase();
    var workspaceKey = "letter-default-avatar_".concat(firstChar);
    if (!(workspaceKey in LETTER_DEFAULTS)) {
        return null;
    }
    return LETTER_DEFAULTS[workspaceKey].local;
}
var PRESET_AVATAR_CATALOG_ORDERED = buildOrderedAvatars();
exports.PRESET_AVATAR_CATALOG_ORDERED = PRESET_AVATAR_CATALOG_ORDERED;
var getAvatarLocal = function (id) { var _a; return (_a = PRESET_AVATAR_CATALOG[id]) === null || _a === void 0 ? void 0 : _a.local; };
exports.getAvatarLocal = getAvatarLocal;
var getAvatarURL = function (id) { var _a; return (_a = PRESET_AVATAR_CATALOG[id]) === null || _a === void 0 ? void 0 : _a.url; };
exports.getAvatarURL = getAvatarURL;
/**
 * Type guard to check if a value is a valid PresetAvatarID
 * @param value - The value to check
 * @returns True if the value is a valid PresetAvatarID
 */
function isPresetAvatarID(value) {
    return typeof value === 'string' && value in PRESET_AVATAR_CATALOG;
}
