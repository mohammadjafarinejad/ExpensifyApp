"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-unsafe-call */
var react_native_1 = require("@testing-library/react-native");
var react_1 = require("react");
var AvatarSelector_1 = require("@components/AvatarSelector");
var ComposeProviders_1 = require("@components/ComposeProviders");
var LocaleContextProvider_1 = require("@components/LocaleContextProvider");
var OnyxListItemProvider_1 = require("@components/OnyxListItemProvider");
var PresetAvatarCatalog_1 = require("@libs/Avatars/PresetAvatarCatalog");
var getFirstAlphaNumericCharacter_1 = require("@libs/getFirstAlphaNumericCharacter");
var waitForBatchedUpdates_1 = require("../utils/waitForBatchedUpdates");
jest.mock('@hooks/useLetterAvatars', function () { return ({
    // eslint-disable-next-line @typescript-eslint/naming-convention
    __esModule: true,
    default: function (name) {
        var _a;
        if (!name) {
            return { avatarList: [], avatarMap: {} };
        }
        var firstChar = (_a = name.at(0)) === null || _a === void 0 ? void 0 : _a.toLowerCase();
        var avatarList = [
            { backgroundColor: '#B0D9FF', fillColor: '#0164BF' },
            { backgroundColor: '#0185FF', fillColor: '#003C73' },
            { backgroundColor: '#003C73', fillColor: '#8DC8FF' },
        ].map(function (_a) {
            var fillColor = _a.fillColor, backgroundColor = _a.backgroundColor;
            var id = "letter-avatar-".concat(backgroundColor, "-").concat(fillColor, "-").concat(firstChar);
            function StyledLetterAvatar() {
                // eslint-disable-next-line react/jsx-no-useless-fragment
                return <>{id}</>;
            }
            return { id: id, StyledLetterAvatar: StyledLetterAvatar };
        });
        return { avatarList: avatarList, avatarMap: {} };
    },
}); });
var mockName = 'Alice';
describe('AvatarSelector', function () {
    var onSelectMock = jest.fn();
    beforeEach(function () {
        jest.clearAllMocks();
    });
    var renderAvatarSelector = function (props) {
        if (props === void 0) { props = {}; }
        return (0, react_native_1.render)(<ComposeProviders_1.default components={[OnyxListItemProvider_1.default, LocaleContextProvider_1.LocaleContextProvider]}>
                <AvatarSelector_1.default onSelect={onSelectMock} 
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...props}/>
            </ComposeProviders_1.default>);
    };
    describe('Common behavior', function () {
        it('renders with label when provided', function () { return __awaiter(void 0, void 0, void 0, function () {
            var label;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        label = 'Choose an avatar';
                        renderAvatarSelector({ label: label, name: mockName });
                        return [4 /*yield*/, (0, waitForBatchedUpdates_1.default)()];
                    case 1:
                        _a.sent();
                        expect(react_native_1.screen.getByText(label)).toBeOnTheScreen();
                        return [2 /*return*/];
                }
            });
        }); });
        it('does not render label when not provided', function () { return __awaiter(void 0, void 0, void 0, function () {
            var text;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        renderAvatarSelector();
                        return [4 /*yield*/, (0, waitForBatchedUpdates_1.default)()];
                    case 1:
                        _a.sent();
                        text = react_native_1.screen.queryByText('Choose an avatar');
                        expect(text).not.toBeOnTheScreen();
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('PRESET_AVATAR_CATALOG_ORDERED avatars', function () {
        it('renders all avatars from custom catalog', function () { return __awaiter(void 0, void 0, void 0, function () {
            var avatars;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        renderAvatarSelector();
                        return [4 /*yield*/, (0, waitForBatchedUpdates_1.default)()];
                    case 1:
                        _a.sent();
                        avatars = Object.keys(PresetAvatarCatalog_1.PRESET_AVATAR_CATALOG);
                        avatars.forEach(function (id) {
                            expect(react_native_1.screen.getByTestId("AvatarSelector_".concat(id))).toBeOnTheScreen();
                        });
                        return [2 /*return*/];
                }
            });
        }); });
        it('calls onSelect when custom avatar is pressed', function () { return __awaiter(void 0, void 0, void 0, function () {
            var avatars, firstAvatarId, firstAvatar;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        renderAvatarSelector();
                        return [4 /*yield*/, (0, waitForBatchedUpdates_1.default)()];
                    case 1:
                        _b.sent();
                        avatars = Object.keys(PresetAvatarCatalog_1.PRESET_AVATAR_CATALOG);
                        firstAvatarId = avatars.at(0);
                        firstAvatar = react_native_1.screen.getByTestId("AvatarSelector_".concat(firstAvatarId));
                        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion, @typescript-eslint/no-non-null-asserted-optional-chain
                        react_native_1.fireEvent.press((_a = firstAvatar.parent) === null || _a === void 0 ? void 0 : _a.parent);
                        return [4 /*yield*/, (0, waitForBatchedUpdates_1.default)()];
                    case 2:
                        _b.sent();
                        expect(onSelectMock).toHaveBeenCalledWith(firstAvatarId);
                        expect(onSelectMock).toHaveBeenCalledTimes(1);
                        return [2 /*return*/];
                }
            });
        }); });
        it('shows selected custom avatar with border styling', function () { return __awaiter(void 0, void 0, void 0, function () {
            var avatars, selectedId, selectedAvatar;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        avatars = Object.keys(PresetAvatarCatalog_1.PRESET_AVATAR_CATALOG);
                        selectedId = avatars.at(1);
                        renderAvatarSelector({ selectedID: selectedId });
                        return [4 /*yield*/, (0, waitForBatchedUpdates_1.default)()];
                    case 1:
                        _a.sent();
                        selectedAvatar = react_native_1.screen.getByTestId("AvatarSelector_".concat(selectedId));
                        expect(selectedAvatar).toBeOnTheScreen();
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('avatarList (letter avatars)', function () {
        var firstChar = (0, getFirstAlphaNumericCharacter_1.default)(mockName).toLowerCase();
        it('letter avatars have correct ID format when they are rendered', function () { return __awaiter(void 0, void 0, void 0, function () {
            var allAvatars, letterAvatars, _i, letterAvatars_1, avatar;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        renderAvatarSelector({ name: mockName });
                        return [4 /*yield*/, (0, waitForBatchedUpdates_1.default)()];
                    case 1:
                        _a.sent();
                        allAvatars = react_native_1.screen.queryAllByTestId(/^AvatarSelector_/);
                        letterAvatars = allAvatars.filter(function (node) { var _a; return (_a = node.props.testID) === null || _a === void 0 ? void 0 : _a.includes('letter-avatar'); });
                        expect(letterAvatars).toHaveLength(3);
                        for (_i = 0, letterAvatars_1 = letterAvatars; _i < letterAvatars_1.length; _i++) {
                            avatar = letterAvatars_1[_i];
                            expect(avatar.props.testID).toMatch(/^AvatarSelector_letter-avatar-#[0-9A-F]{6}-#[0-9A-F]{6}-[a-z0-9]$/i);
                            expect(avatar.props.testID).toContain(firstChar);
                        }
                        return [2 /*return*/];
                }
            });
        }); });
        it('does not render letter avatars when firstName is not provided', function () { return __awaiter(void 0, void 0, void 0, function () {
            var allAvatars, letterAvatars;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        renderAvatarSelector();
                        return [4 /*yield*/, (0, waitForBatchedUpdates_1.default)()];
                    case 1:
                        _a.sent();
                        allAvatars = react_native_1.screen.queryAllByTestId(/^AvatarSelector_/);
                        letterAvatars = allAvatars.filter(function (node) { var _a; return (_a = node.props.testID) === null || _a === void 0 ? void 0 : _a.includes('letter-avatar'); });
                        expect(letterAvatars).toHaveLength(0);
                        return [2 /*return*/];
                }
            });
        }); });
        it('calls onSelect when letter avatar is pressed (if rendered)', function () { return __awaiter(void 0, void 0, void 0, function () {
            var allAvatars, letterAvatars, firstLetterAvatar, expectedId;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        renderAvatarSelector({ name: mockName });
                        return [4 /*yield*/, (0, waitForBatchedUpdates_1.default)()];
                    case 1:
                        _c.sent();
                        allAvatars = react_native_1.screen.queryAllByTestId(/^AvatarSelector_/);
                        letterAvatars = allAvatars.filter(function (node) { var _a; return (_a = node.props.testID) === null || _a === void 0 ? void 0 : _a.includes('letter-avatar'); });
                        firstLetterAvatar = letterAvatars.at(0);
                        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion, @typescript-eslint/no-non-null-asserted-optional-chain
                        react_native_1.fireEvent.press((_a = firstLetterAvatar === null || firstLetterAvatar === void 0 ? void 0 : firstLetterAvatar.parent) === null || _a === void 0 ? void 0 : _a.parent);
                        return [4 /*yield*/, (0, waitForBatchedUpdates_1.default)()];
                    case 2:
                        _c.sent();
                        expectedId = (_b = firstLetterAvatar === null || firstLetterAvatar === void 0 ? void 0 : firstLetterAvatar.props.testID) === null || _b === void 0 ? void 0 : _b.replace('AvatarSelector_', '');
                        expect(onSelectMock).toHaveBeenCalledWith(expectedId);
                        expect(onSelectMock).toHaveBeenCalledTimes(1);
                        return [2 /*return*/];
                }
            });
        }); });
        it('shows selected letter avatar with border styling (if rendered)', function () { return __awaiter(void 0, void 0, void 0, function () {
            var allAvatars, letterAvatars, letterAvatarId, selectedAvatar;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        renderAvatarSelector({ name: mockName });
                        return [4 /*yield*/, (0, waitForBatchedUpdates_1.default)()];
                    case 1:
                        _b.sent();
                        allAvatars = react_native_1.screen.queryAllByTestId(/^AvatarSelector_/);
                        letterAvatars = allAvatars.filter(function (node) { var _a; return (_a = node.props.testID) === null || _a === void 0 ? void 0 : _a.includes('letter-avatar'); });
                        letterAvatarId = ((_a = letterAvatars.at(2)) === null || _a === void 0 ? void 0 : _a.props.testID).replace('AvatarSelector_', '');
                        react_native_1.screen.unmount();
                        renderAvatarSelector({
                            name: mockName,
                            selectedID: letterAvatarId,
                        });
                        return [4 /*yield*/, (0, waitForBatchedUpdates_1.default)()];
                    case 2:
                        _b.sent();
                        selectedAvatar = react_native_1.screen.getByTestId("AvatarSelector_".concat(letterAvatarId));
                        expect(selectedAvatar).toBeOnTheScreen();
                        return [2 /*return*/];
                }
            });
        }); });
        it('renders both custom and letter avatars when firstName is provided', function () { return __awaiter(void 0, void 0, void 0, function () {
            var presetAvatars, allAvatars, letterAvatars;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        renderAvatarSelector({ name: mockName });
                        return [4 /*yield*/, (0, waitForBatchedUpdates_1.default)()];
                    case 1:
                        _b.sent();
                        presetAvatars = Object.keys(PresetAvatarCatalog_1.PRESET_AVATAR_CATALOG);
                        expect(react_native_1.screen.getByTestId("AvatarSelector_".concat(presetAvatars.at(0)))).toBeOnTheScreen();
                        allAvatars = react_native_1.screen.queryAllByTestId(/^AvatarSelector_/);
                        letterAvatars = allAvatars.filter(function (node) { var _a; return (_a = node.props.testID) === null || _a === void 0 ? void 0 : _a.includes('letter-avatar'); });
                        expect((_a = letterAvatars.at(0)) === null || _a === void 0 ? void 0 : _a.props.testID).toMatch(/^AvatarSelector_letter-avatar-/);
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
