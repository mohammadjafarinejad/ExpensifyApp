"use strict";
/* eslint-disable no-underscore-dangle */
Object.defineProperty(exports, "__esModule", { value: true });
exports.VideoView = void 0;
exports.useVideoPlayer = useVideoPlayer;
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-compiler/react-compiler */
var react_1 = require("react");
var react_native_1 = require("react-native");
function createMockPlayer() {
    var _isPlaying = false;
    var _isMuted = false;
    var _currentTime = 0;
    return {
        get isPlaying() {
            return _isPlaying;
        },
        get isMuted() {
            return _isMuted;
        },
        get currentTime() {
            return _currentTime;
        },
        play: jest.fn(function () {
            _isPlaying = true;
        }),
        pause: jest.fn(function () {
            _isPlaying = false;
        }),
        replace: jest.fn(function (_opts) {
            // no-op; exist to satisfy code that calls it
        }),
        seekTo: jest.fn(function (time) {
            _currentTime = time;
        }),
        setIsMuted: jest.fn(function (muted) {
            _isMuted = muted;
        }),
        addListener: jest.fn(function (_event, _cb) {
            // minimal, enough for code that calls .remove()
            return { remove: function () { } };
        }),
    };
}
/**
 * Mocked hook – returns a stable mock player instance.
 * Signature accepts any args to match real API calls.
 */
function useVideoPlayer() {
    var _args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        _args[_i] = arguments[_i];
    }
    var ref = (0, react_1.useRef)(null);
    if (!ref.current) {
        ref.current = createMockPlayer();
    }
    return ref.current;
}
var VideoView = (0, react_1.forwardRef)(function (props, ref) { return (
// eslint-disable-next-line react/jsx-props-no-spreading
<react_native_1.View ref={ref} accessibilityLabel="MockVideoView" 
// eslint-disable-next-line react/jsx-props-no-spreading
{...props}/>); });
exports.VideoView = VideoView;
