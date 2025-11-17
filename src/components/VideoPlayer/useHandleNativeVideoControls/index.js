"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
/**
 * Web implementation for managing native video controls.
 * This hook hides the download button on the native video player in full-screen mode
 * when playing a local or offline video.
 */
var useHandleNativeVideoControls = function (_a) {
    var videoViewRef = _a.videoViewRef, isLocalFile = _a.isLocalFile, isOffline = _a.isOffline;
    (0, react_1.useEffect)(function () {
        var _a;
        var videoElement = (_a = videoViewRef === null || videoViewRef === void 0 ? void 0 : videoViewRef.current) === null || _a === void 0 ? void 0 : _a.nativeRef.current;
        if (!videoElement) {
            return;
        }
        if (isOffline || isLocalFile) {
            videoElement.setAttribute('controlsList', 'nodownload');
        }
        else {
            videoElement.removeAttribute('controlsList');
        }
        // eslint-disable-next-line react-compiler/react-compiler, react-hooks/exhaustive-deps
    }, [isOffline, isLocalFile]);
};
exports.default = useHandleNativeVideoControls;
