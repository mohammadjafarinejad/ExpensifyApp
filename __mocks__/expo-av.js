"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.VideoFullscreenUpdate = exports.Video = exports.Audio = exports.ResizeMode = void 0;
var react_native_1 = require("react-native");
var ResizeMode = {
    CONTAIN: 'contain',
    COVER: 'cover',
    STRETCH: 'stretch',
    CENTER: 'center',
};
exports.ResizeMode = ResizeMode;
var Video = /** @class */ (function (_super) {
    __extends(class_1, _super);
    function class_1() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.setStatusAsync = jest.fn(function () { return Promise.resolve(); });
        return _this;
    }
    return class_1;
}(react_native_1.View));
exports.Video = Video;
var VideoFullscreenUpdate = {
    PLAYER_WILL_PRESENT: 0,
    PLAYER_DID_PRESENT: 1,
    PLAYER_WILL_DISMISS: 2,
    PLAYER_DID_DISMISS: 3,
};
exports.VideoFullscreenUpdate = VideoFullscreenUpdate;
var Audio = {
    getPermissionsAsync: jest.fn(function () { return Promise.resolve({ granted: true }); }),
    requestPermissionsAsync: jest.fn(function () { return Promise.resolve(); }),
    setAudioModeAsync: jest.fn(function () { return Promise.resolve(); }),
    setIsEnabledAsync: jest.fn(function () { return Promise.resolve(); }),
};
exports.Audio = Audio;
exports.default = { ResizeMode: ResizeMode, Audio: Audio, Video: Video, VideoFullscreenUpdate: VideoFullscreenUpdate };
