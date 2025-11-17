"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
function usePlaybackContextVideoRefs(resetCallback) {
    var currentVideoPlayerRef = (0, react_1.useRef)(null);
    var currentVideoViewRef = (0, react_1.useRef)(null);
    var playVideo = (0, react_1.useCallback)(function () {
        var _a;
        (_a = currentVideoPlayerRef.current) === null || _a === void 0 ? void 0 : _a.play();
    }, []);
    var pauseVideo = (0, react_1.useCallback)(function () {
        var _a;
        (_a = currentVideoPlayerRef.current) === null || _a === void 0 ? void 0 : _a.pause();
    }, []);
    var replayVideo = (0, react_1.useCallback)(function () {
        var _a;
        (_a = currentVideoPlayerRef.current) === null || _a === void 0 ? void 0 : _a.replay();
    }, []);
    var stopVideo = (0, react_1.useCallback)(function () {
        if (!currentVideoPlayerRef.current) {
            return;
        }
        currentVideoPlayerRef.current.pause();
        currentVideoPlayerRef.current.currentTime = 0;
    }, [currentVideoPlayerRef]);
    var checkIfVideoIsPlaying = (0, react_1.useCallback)(function (statusCallback) { var _a, _b; return statusCallback((_b = (_a = currentVideoPlayerRef.current) === null || _a === void 0 ? void 0 : _a.playing) !== null && _b !== void 0 ? _b : false); }, [currentVideoPlayerRef]);
    var resetVideoPlayerData = (0, react_1.useCallback)(function () {
        stopVideo();
        currentVideoPlayerRef.current = null;
        currentVideoViewRef.current = null;
        resetCallback();
    }, [resetCallback, stopVideo]);
    var updateCurrentVideoPlayerRefs = function (playerRef, viewRef) {
        currentVideoPlayerRef.current = playerRef;
        currentVideoViewRef.current = viewRef;
    };
    return (0, react_1.useMemo)(function () { return ({
        playerRef: currentVideoPlayerRef,
        viewRef: currentVideoViewRef,
        play: playVideo,
        pause: pauseVideo,
        replay: replayVideo,
        stop: stopVideo,
        isPlaying: checkIfVideoIsPlaying,
        resetPlayerData: resetVideoPlayerData,
        updateRefs: updateCurrentVideoPlayerRefs,
    }); }, [checkIfVideoIsPlaying, pauseVideo, playVideo, replayVideo, resetVideoPlayerData, stopVideo]);
}
exports.default = usePlaybackContextVideoRefs;
