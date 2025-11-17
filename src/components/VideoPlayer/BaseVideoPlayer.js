"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var expo_1 = require("expo");
var expo_video_1 = require("expo-video");
var debounce_1 = require("lodash/debounce");
var react_1 = require("react");
var react_native_1 = require("react-native");
var react_native_reanimated_1 = require("react-native-reanimated");
var react_native_worklets_1 = require("react-native-worklets");
var AttachmentOfflineIndicator_1 = require("@components/AttachmentOfflineIndicator");
var FullscreenLoadingIndicator_1 = require("@components/FullscreenLoadingIndicator");
var Hoverable_1 = require("@components/Hoverable");
var PressableWithoutFeedback_1 = require("@components/Pressable/PressableWithoutFeedback");
var FullScreenContext_1 = require("@components/VideoPlayerContexts/FullScreenContext");
var PlaybackContext_1 = require("@components/VideoPlayerContexts/PlaybackContext");
var VideoPopoverMenuContext_1 = require("@components/VideoPlayerContexts/VideoPopoverMenuContext");
var VolumeContext_1 = require("@components/VideoPlayerContexts/VolumeContext");
var VideoPopoverMenu_1 = require("@components/VideoPopoverMenu");
var useNetwork_1 = require("@hooks/useNetwork");
var useThemeStyles_1 = require("@hooks/useThemeStyles");
var addEncryptedAuthTokenToURL_1 = require("@libs/addEncryptedAuthTokenToURL");
var Browser_1 = require("@libs/Browser");
var DeviceCapabilities_1 = require("@libs/DeviceCapabilities");
var CONST_1 = require("@src/CONST");
var useHandleNativeVideoControls_1 = require("./useHandleNativeVideoControls");
var VideoUtils = require("./utils");
var VideoErrorIndicator_1 = require("./VideoErrorIndicator");
var VideoPlayerControls_1 = require("./VideoPlayerControls");
function BaseVideoPlayer(_a) {
    var url = _a.url, onSourceLoaded = _a.onSourceLoaded, _b = _a.isLooping, isLooping = _b === void 0 ? false : _b, style = _a.style, videoPlayerStyle = _a.videoPlayerStyle, videoControlsStyle = _a.videoControlsStyle, _c = _a.videoDuration, videoDuration = _c === void 0 ? 0 : _c, _d = _a.shouldUseSharedVideoElement, shouldUseSharedVideoElement = _d === void 0 ? false : _d, _e = _a.shouldUseSmallVideoControls, shouldUseSmallVideoControls = _e === void 0 ? false : _e, 
    // TODO: investigate what is the root cause of the bug with unexpected video switching
    // isVideoHovered caused a bug with unexpected video switching. We are investigating the root cause of the issue,
    // but current workaround is just not to use it here for now. This causes not displaying the video controls when
    // user hovers the mouse over the carousel arrows, but this UI bug feels much less troublesome for now.
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _f = _a.isVideoHovered, 
    // TODO: investigate what is the root cause of the bug with unexpected video switching
    // isVideoHovered caused a bug with unexpected video switching. We are investigating the root cause of the issue,
    // but current workaround is just not to use it here for now. This causes not displaying the video controls when
    // user hovers the mouse over the carousel arrows, but this UI bug feels much less troublesome for now.
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    isVideoHovered = _f === void 0 ? false : _f, _g = _a.controlsStatus, controlsStatus = _g === void 0 ? CONST_1.default.VIDEO_PLAYER.CONTROLS_STATUS.SHOW : _g, shouldPlay = _a.shouldPlay, isPreview = _a.isPreview, reportID = _a.reportID;
    var styles = (0, useThemeStyles_1.default)();
    var _h = (0, PlaybackContext_1.usePlaybackContext)(), pauseVideo = _h.pauseVideo, playVideo = _h.playVideo, replayVideo = _h.replayVideo, currentlyPlayingURL = _h.currentlyPlayingURL, sharedElement = _h.sharedElement, originalParent = _h.originalParent, shareVideoPlayerElements = _h.shareVideoPlayerElements, currentVideoPlayerRef = _h.currentVideoPlayerRef, currentVideoViewRef = _h.currentVideoViewRef, updateCurrentURLAndReportID = _h.updateCurrentURLAndReportID, setCurrentlyPlayingURL = _h.setCurrentlyPlayingURL, mountedVideoPlayersRef = _h.mountedVideoPlayersRef;
    var isFullScreenRef = (0, FullScreenContext_1.useFullScreenContext)().isFullScreenRef;
    var isOffline = (0, useNetwork_1.default)().isOffline;
    var _j = (0, react_1.useState)(videoDuration), duration = _j[0], setDuration = _j[1];
    var _k = (0, react_1.useState)(false), isEnded = _k[0], setIsEnded = _k[1];
    var _l = (0, react_1.useState)(true), isFirstLoad = _l[0], setIsFirstLoad = _l[1];
    // we add "#t=0.001" at the end of the URL to skip first millisecond of the video and always be able to show proper video preview when video is paused at the beginning
    var sourceURL = (0, react_1.useState)(function () { return VideoUtils.addSkipTimeTagToURL(url.includes('blob:') || url.includes('file:///') ? url : (0, addEncryptedAuthTokenToURL_1.default)(url), 0.001); })[0];
    var _m = (0, react_1.useState)(false), isPopoverVisible = _m[0], setIsPopoverVisible = _m[1];
    var _o = (0, react_1.useState)({ horizontal: 0, vertical: 0 }), popoverAnchorPosition = _o[0], setPopoverAnchorPosition = _o[1];
    var _p = (0, react_1.useState)(controlsStatus), controlStatusState = _p[0], setControlStatusState = _p[1];
    var controlsOpacity = (0, react_native_reanimated_1.useSharedValue)(1);
    var controlsAnimatedStyle = (0, react_native_reanimated_1.useAnimatedStyle)(function () { return ({
        opacity: controlsOpacity.get(),
    }); });
    /* eslint-disable no-param-reassign */
    var videoPlayerRef = (0, react_1.useRef)((0, expo_video_1.useVideoPlayer)(sourceURL, function (player) {
        player.loop = isLooping;
        player.muted = true;
        player.timeUpdateEventInterval = 0.1;
    }));
    /* eslint-enable no-param-reassign */
    var isPlaying = videoPlayerRef.current.playing;
    var _q = (0, expo_1.useEvent)(videoPlayerRef.current, 'timeUpdate', { currentTime: 0, bufferedPosition: 0 }), currentTime = _q.currentTime, bufferedPosition = _q.bufferedPosition;
    var status = (0, expo_1.useEvent)(videoPlayerRef.current, 'statusChange', { status: 'idle' }).status;
    var _r = (0, react_1.useState)(false), isSafariLoading = _r[0], setIsSafariLoading = _r[1];
    var isLoading = (0, react_1.useMemo)(function () {
        return status === 'loading' || isSafariLoading;
    }, [isSafariLoading, status]);
    var hasError = (0, react_1.useMemo)(function () {
        // No need to set hasError while offline, since the offline indicator is already shown.
        // Once the user reconnects, if the video is unsupported, the error will be triggered again.
        return status === 'error' && !isOffline;
    }, [isOffline, status]);
    var isBuffering = (0, react_1.useMemo)(function () {
        return bufferedPosition <= 0;
    }, [bufferedPosition]);
    var videoViewRef = (0, react_1.useRef)(null);
    var videoPlayerElementParentRef = (0, react_1.useRef)(null);
    var videoPlayerElementRef = (0, react_1.useRef)(null);
    var sharedVideoPlayerParentRef = (0, react_1.useRef)(null);
    var isReadyForDisplayRef = (0, react_1.useRef)(false);
    var canUseTouchScreen = (0, DeviceCapabilities_1.canUseTouchScreen)();
    var isCurrentlyURLSet = currentlyPlayingURL === url;
    var isUploading = CONST_1.default.ATTACHMENT_LOCAL_URL_PREFIX.some(function (prefix) { return url.startsWith(prefix); });
    var shouldShowLoadingIndicator = (0, react_1.useMemo)(function () {
        return !isPlaying && !isOffline && !hasError && isLoading;
    }, [hasError, isLoading, isOffline, isPlaying]);
    var _s = (0, VolumeContext_1.useVolumeContext)(), updateVolume = _s.updateVolume, lastNonZeroVolume = _s.lastNonZeroVolume;
    (0, useHandleNativeVideoControls_1.default)({
        videoViewRef: videoViewRef,
        isOffline: isOffline,
        isLocalFile: isUploading,
    });
    var _t = (0, VideoPopoverMenuContext_1.useVideoPopoverMenuContext)(), updateVideoPopoverMenuPlayerRef = _t.updateVideoPopoverMenuPlayerRef, updatePlaybackSpeed = _t.updatePlaybackSpeed, updatePopoverMenuSource = _t.updateSource;
    var togglePlayCurrentVideo = (0, react_1.useCallback)(function () {
        if (!isCurrentlyURLSet) {
            updateCurrentURLAndReportID(url, reportID);
            return;
        }
        var player = videoPlayerRef.current;
        if (isLoading || !player) {
            return;
        }
        if (player.playing) {
            pauseVideo();
            return;
        }
        if (isEnded) {
            replayVideo();
            return;
        }
        playVideo();
    }, [isCurrentlyURLSet, isLoading, updateCurrentURLAndReportID, url, reportID, pauseVideo, isEnded, playVideo, replayVideo]);
    var hideControl = (0, react_1.useCallback)(function () {
        if (isEnded) {
            return;
        }
        controlsOpacity.set((0, react_native_reanimated_1.withTiming)(0, { duration: 500 }, function () { return (0, react_native_worklets_1.scheduleOnRN)(setControlStatusState, CONST_1.default.VIDEO_PLAYER.CONTROLS_STATUS.HIDE); }));
    }, [controlsOpacity, isEnded]);
    var debouncedHideControl = (0, react_1.useMemo)(function () { return (0, debounce_1.default)(hideControl, 1500); }, [hideControl]);
    (0, react_1.useEffect)(function () {
        if (canUseTouchScreen) {
            return;
        }
        // If the device cannot use touch screen, always set the control status as 'show'.
        // Then if user hover over the video, controls is shown.
        setControlStatusState(CONST_1.default.VIDEO_PLAYER.CONTROLS_STATUS.SHOW);
    }, [canUseTouchScreen]);
    (0, react_1.useEffect)(function () {
        // We only auto hide the control if the device can use touch screen.
        if (!canUseTouchScreen) {
            return;
        }
        if (controlStatusState !== CONST_1.default.VIDEO_PLAYER.CONTROLS_STATUS.SHOW) {
            return;
        }
        if (!isPlaying || isPopoverVisible) {
            debouncedHideControl.cancel();
            return;
        }
        debouncedHideControl();
    }, [isPlaying, debouncedHideControl, controlStatusState, isPopoverVisible, canUseTouchScreen]);
    var stopWheelPropagation = (0, react_1.useCallback)(function (ev) { return ev.stopPropagation(); }, []);
    var toggleControl = (0, react_1.useCallback)(function () {
        if (controlStatusState === CONST_1.default.VIDEO_PLAYER.CONTROLS_STATUS.SHOW) {
            hideControl();
            return;
        }
        setControlStatusState(CONST_1.default.VIDEO_PLAYER.CONTROLS_STATUS.SHOW);
        controlsOpacity.set(1);
    }, [controlStatusState, controlsOpacity, hideControl]);
    var showPopoverMenu = function (event) {
        var _a;
        updateVideoPopoverMenuPlayerRef(videoPlayerRef.current);
        if (!((_a = videoPlayerRef.current) === null || _a === void 0 ? void 0 : _a.playbackRate)) {
            return;
        }
        updatePlaybackSpeed(videoPlayerRef.current.playbackRate);
        setIsPopoverVisible(true);
        updatePopoverMenuSource(url);
        if (!event || !('nativeEvent' in event)) {
            return;
        }
        setPopoverAnchorPosition({ horizontal: event.nativeEvent.pageX, vertical: event.nativeEvent.pageY });
    };
    (0, expo_1.useEventListener)(videoPlayerRef.current, 'mutedChange', function (payload) {
        if (payload.muted || !payload.oldMuted) {
            return;
        }
        updateVolume(lastNonZeroVolume.get());
    });
    (0, expo_1.useEventListener)(videoPlayerRef.current, 'playingChange', function (payload) {
        var isVideoPlaying = payload.isPlaying;
        if (isVideoPlaying && isEnded) {
            setIsEnded(false);
        }
    });
    (0, expo_1.useEventListener)(videoPlayerRef.current, 'statusChange', function (payload) {
        if (isSafariLoading) {
            setIsSafariLoading(false);
        }
        if (payload.status !== 'readyToPlay') {
            return;
        }
        isReadyForDisplayRef.current = true;
        if (videoPlayerRef.current === currentVideoPlayerRef.current && isFirstLoad) {
            playVideo();
            setIsFirstLoad(false);
        }
    });
    (0, expo_1.useEventListener)(videoPlayerRef.current, 'playToEnd', function () {
        setIsEnded(true);
        setControlStatusState(CONST_1.default.VIDEO_PLAYER.CONTROLS_STATUS.SHOW);
        controlsOpacity.set(1);
    });
    (0, expo_1.useEventListener)(videoPlayerRef.current, 'sourceLoad', function (event) {
        onSourceLoaded === null || onSourceLoaded === void 0 ? void 0 : onSourceLoaded(event);
    });
    (0, react_1.useEffect)(function () {
        if (!videoPlayerRef.current.duration) {
            return;
        }
        setDuration(videoPlayerRef.current.duration);
    }, [videoPlayerRef.current.duration]);
    (0, react_1.useEffect)(function () {
        mountedVideoPlayersRef.current.push(url);
        return function () {
            var mountedVideoPlayersCurrentRef = mountedVideoPlayersRef;
            var urlIndex = mountedVideoPlayersCurrentRef.current.indexOf(url);
            mountedVideoPlayersCurrentRef.current.splice(urlIndex, 1);
        };
    }, [mountedVideoPlayersRef, url]);
    // use `useLayoutEffect` instead of `useEffect` because ref is null when unmount in `useEffect` hook
    // ref url: https://reactjs.org/blog/2020/08/10/react-v17-rc.html#effect-cleanup-timing
    (0, react_1.useLayoutEffect)(function () { return function () {
        if (shouldUseSharedVideoElement || videoPlayerRef.current !== currentVideoPlayerRef.current) {
            return;
        }
        if (currentVideoPlayerRef.current) {
            currentVideoPlayerRef.current.pause();
            // eslint-disable-next-line react-compiler/react-compiler
            currentVideoPlayerRef.current.currentTime = 0;
            currentVideoPlayerRef.current = null;
        }
    }; }, [currentVideoPlayerRef, mountedVideoPlayersRef, shouldUseSharedVideoElement, url]);
    (0, react_1.useEffect)(function () {
        if (!isUploading || !videoPlayerRef.current) {
            return;
        }
        // If we are uploading a new video, we want to pause previous playing video and immediately set the video player ref.
        if (currentVideoPlayerRef.current) {
            pauseVideo();
        }
        currentVideoPlayerRef.current = videoPlayerRef.current;
        currentVideoViewRef.current = videoViewRef.current;
    }, [url, currentVideoPlayerRef, isUploading, pauseVideo, currentVideoViewRef]);
    var isCurrentlyURLSetRef = (0, react_1.useRef)(undefined);
    isCurrentlyURLSetRef.current = isCurrentlyURLSet;
    (0, react_1.useEffect)(function () { return function () {
        if (shouldUseSharedVideoElement || !isCurrentlyURLSetRef.current) {
            return;
        }
        setCurrentlyPlayingURL(null);
    }; }, [setCurrentlyPlayingURL, shouldUseSharedVideoElement]);
    // update shared video elements
    (0, react_1.useEffect)(function () {
        // On mobile safari, we need to auto-play when sharing video element here
        shareVideoPlayerElements(videoPlayerRef.current, videoViewRef.current, videoPlayerElementParentRef.current, videoPlayerElementRef.current, isUploading || isFullScreenRef.current || !isReadyForDisplayRef.current || hasError, { shouldUseSharedVideoElement: shouldUseSharedVideoElement, url: url, reportID: reportID });
    }, [currentlyPlayingURL, shouldUseSharedVideoElement, shareVideoPlayerElements, url, isUploading, reportID, videoPlayerRef, isFullScreenRef, hasError]);
    // append shared video element to new parent (used for example in attachment modal)
    (0, react_1.useEffect)(function () {
        var _a, _b;
        if (url !== currentlyPlayingURL || !sharedElement || isFullScreenRef.current) {
            return;
        }
        var newParentRef = sharedVideoPlayerParentRef.current;
        if (!shouldUseSharedVideoElement) {
            if (newParentRef && 'childNodes' in newParentRef && newParentRef.childNodes[0]) {
                (_a = newParentRef.childNodes[0]) === null || _a === void 0 ? void 0 : _a.remove();
            }
            return;
        }
        if (currentVideoPlayerRef.current) {
            videoPlayerRef.current = currentVideoPlayerRef.current;
            videoViewRef.current = currentVideoViewRef.current;
        }
        if (currentlyPlayingURL === url && newParentRef && 'appendChild' in newParentRef) {
            if (newParentRef.hasChildNodes()) {
                (_b = newParentRef.firstElementChild) === null || _b === void 0 ? void 0 : _b.replaceWith(sharedElement);
            }
            else {
                newParentRef.appendChild(sharedElement);
            }
        }
        return function () {
            var _a;
            if (!originalParent || !('appendChild' in originalParent)) {
                return;
            }
            originalParent.appendChild(sharedElement);
            if (!newParentRef || !('childNodes' in newParentRef)) {
                return;
            }
            var mountedVideoPlayersCurrentRef = mountedVideoPlayersRef;
            if (mountedVideoPlayersCurrentRef.current.filter(function (u) { return u === url; }).length > 0) {
                return;
            }
            (_a = newParentRef.childNodes[0]) === null || _a === void 0 ? void 0 : _a.remove();
        };
    }, [currentVideoPlayerRef, currentVideoViewRef, currentlyPlayingURL, isFullScreenRef, mountedVideoPlayersRef, originalParent, reportID, sharedElement, shouldUseSharedVideoElement, url]);
    (0, react_1.useEffect)(function () {
        if (!shouldPlay) {
            return;
        }
        updateCurrentURLAndReportID(url, reportID);
    }, [reportID, shouldPlay, updateCurrentURLAndReportID, url]);
    // ensure that video loads after page refresh on iOS Safari
    (0, react_1.useEffect)(function () {
        var _a, _b;
        var videoElement = (_b = (_a = videoViewRef.current) === null || _a === void 0 ? void 0 : _a.nativeRef) === null || _b === void 0 ? void 0 : _b.current;
        if (!videoElement || hasError || !(0, Browser_1.isSafari)() || sharedElement) {
            return;
        }
        videoElement.load();
        setIsSafariLoading(true);
    }, [hasError, sharedElement]);
    return (<>
            {/* We need to wrap the video component in a component that will catch unhandled pointer events. Otherwise, these
        events will bubble up the tree, and it will cause unexpected press behavior. */}
            <PressableWithoutFeedback_1.default accessible={false} style={[styles.cursorDefault, style]}>
                <Hoverable_1.default shouldFreezeCapture={isPopoverVisible}>
                    {function (isHovered) { return (<react_native_1.View style={[styles.w100, styles.h100]}>
                            <PressableWithoutFeedback_1.default accessibilityRole="button" accessible={false} onPress={function () {
                if (isFullScreenRef.current) {
                    return;
                }
                if (!canUseTouchScreen) {
                    togglePlayCurrentVideo();
                    return;
                }
                toggleControl();
            }} style={[styles.flex1, styles.noSelect]}>
                                {shouldUseSharedVideoElement ? (<>
                                        <react_native_1.View ref={sharedVideoPlayerParentRef} style={[styles.flex1]}/>
                                        {/* We are adding transparent absolute View between appended video component and control buttons to enable
            catching onMouse events from Attachment Carousel. Due to late appending React doesn't handle
            element's events properly. */}
                                        <react_native_1.View style={[styles.w100, styles.h100, styles.pAbsolute]}/>
                                    </>) : (<react_native_1.View fsClass={CONST_1.default.FULLSTORY.CLASS.EXCLUDE} style={styles.flex1} ref={function (el) {
                    if (!el) {
                        return;
                    }
                    var elHTML = el;
                    if ('childNodes' in elHTML && elHTML.childNodes[0]) {
                        videoPlayerElementRef.current = elHTML.childNodes[0];
                    }
                    videoPlayerElementParentRef.current = el;
                }}>
                                        <expo_video_1.VideoView allowsFullscreen player={videoPlayerRef.current} style={[styles.w100, styles.h100, videoPlayerStyle]} nativeControls={isFullScreenRef.current} playsInline testID={CONST_1.default.VIDEO_PLAYER_TEST_ID} ref={videoViewRef} contentFit="contain" onFullscreenEnter={function () {
                    isFullScreenRef.current = true;
                    if (!(videoPlayerElementParentRef.current && 'addEventListener' in videoPlayerElementParentRef.current)) {
                        return;
                    }
                    // When the video is in fullscreen, we don't want the scroll to be captured by the InvertedFlatList of report screen.
                    // This will also allow the user to scroll the video playback speed.
                    videoPlayerElementParentRef.current.addEventListener('wheel', stopWheelPropagation);
                }} onFullscreenExit={function () {
                    isFullScreenRef.current = false;
                    if (videoPlayerElementParentRef.current && 'removeEventListener' in videoPlayerElementParentRef.current) {
                        videoPlayerElementParentRef.current.removeEventListener('wheel', stopWheelPropagation);
                    }
                    // Sync volume updates in full screen mode after leaving it
                    updateVolume(videoPlayerRef.current.muted ? 0 : videoPlayerRef.current.volume || 1);
                }}/>
                                    </react_native_1.View>)}
                            </PressableWithoutFeedback_1.default>
                            {hasError && !isOffline && <VideoErrorIndicator_1.default isPreview={isPreview}/>}
                            {shouldShowLoadingIndicator && (<FullscreenLoadingIndicator_1.default style={[styles.opacity1, styles.bgTransparent]} shouldUseGoBackButton={false}/>)}
                            {!isLoading && (isOffline || !isBuffering) && <AttachmentOfflineIndicator_1.default isPreview={isPreview}/>}
                            {controlStatusState !== CONST_1.default.VIDEO_PLAYER.CONTROLS_STATUS.HIDE &&
                !shouldShowLoadingIndicator &&
                !(hasError && !isOffline) &&
                (isPopoverVisible || isHovered || canUseTouchScreen || isEnded) && (<VideoPlayerControls_1.default duration={duration !== null && duration !== void 0 ? duration : 0} position={currentTime !== null && currentTime !== void 0 ? currentTime : 0} url={url} videoPlayerRef={videoPlayerRef} videoViewRef={videoViewRef} isPlaying={isPlaying} small={shouldUseSmallVideoControls} style={[videoControlsStyle, controlsAnimatedStyle]} togglePlayCurrentVideo={togglePlayCurrentVideo} controlsStatus={controlStatusState} showPopoverMenu={showPopoverMenu} reportID={reportID}/>)}
                        </react_native_1.View>); }}
                </Hoverable_1.default>
            </PressableWithoutFeedback_1.default>
            <VideoPopoverMenu_1.default isPopoverVisible={isPopoverVisible} hidePopover={function () { return setIsPopoverVisible(false); }} anchorPosition={popoverAnchorPosition}/>
        </>);
}
BaseVideoPlayer.displayName = 'BaseVideoPlayer';
exports.default = BaseVideoPlayer;
