"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var native_1 = require("@react-navigation/native");
var react_1 = require("react");
var react_native_1 = require("react-native");
var Expensicons = require("@components/Icon/Expensicons");
var SearchScopeProvider_1 = require("@components/Search/SearchScopeProvider");
var VideoPlayer_1 = require("@components/VideoPlayer");
var IconButton_1 = require("@components/VideoPlayer/IconButton");
var PlaybackContext_1 = require("@components/VideoPlayerContexts/PlaybackContext");
var useCheckIfRouteHasRemainedUnchanged_1 = require("@hooks/useCheckIfRouteHasRemainedUnchanged");
var useLocalize_1 = require("@hooks/useLocalize");
var useResponsiveLayout_1 = require("@hooks/useResponsiveLayout");
var useThemeStyles_1 = require("@hooks/useThemeStyles");
var useThumbnailDimensions_1 = require("@hooks/useThumbnailDimensions");
var getPlatform_1 = require("@libs/getPlatform");
var Navigation_1 = require("@navigation/Navigation");
var CONST_1 = require("@src/CONST");
var ROUTES_1 = require("@src/ROUTES");
var VideoPlayerThumbnail_1 = require("./VideoPlayerThumbnail");
var isOnAttachmentRoute = function () { return Navigation_1.default.getActiveRouteWithoutParams() === "/".concat(ROUTES_1.default.REPORT_ATTACHMENTS.route); };
function VideoPlayerPreview(_a) {
    var videoUrl = _a.videoUrl, thumbnailUrl = _a.thumbnailUrl, reportID = _a.reportID, fileName = _a.fileName, videoDimensions = _a.videoDimensions, videoDuration = _a.videoDuration, onShowModalPress = _a.onShowModalPress, isDeleted = _a.isDeleted;
    var styles = (0, useThemeStyles_1.default)();
    var translate = (0, useLocalize_1.default)().translate;
    var _b = (0, PlaybackContext_1.usePlaybackContext)(), currentlyPlayingURL = _b.currentlyPlayingURL, currentRouteReportID = _b.currentRouteReportID, updateCurrentURLAndReportID = _b.updateCurrentURLAndReportID;
    /* This needs to be isSmallScreenWidth because we want to be able to play video in chat (not in attachment modal) when preview is inside an RHP */
    // eslint-disable-next-line rulesdir/prefer-shouldUseNarrowLayout-instead-of-isSmallScreenWidth
    var isSmallScreenWidth = (0, useResponsiveLayout_1.default)().isSmallScreenWidth;
    var _c = (0, react_1.useState)(true), isThumbnail = _c[0], setIsThumbnail = _c[1];
    var _d = (0, react_1.useState)(videoDimensions), measuredDimensions = _d[0], setMeasuredDimensions = _d[1];
    var thumbnailDimensionsStyles = (0, useThumbnailDimensions_1.default)(measuredDimensions.width, measuredDimensions.height).thumbnailDimensionsStyles;
    var isOnSearch = (0, SearchScopeProvider_1.useIsOnSearch)();
    var navigation = (0, native_1.useNavigation)();
    (0, react_1.useEffect)(function () {
        var platform = (0, getPlatform_1.default)();
        // On web and desktop platforms, we can use the DOM video element to get accurate video dimensions
        // by loading the video metadata. On mobile platforms, we rely on the provided videoDimensions
        // since document.createElement is not available in React Native environments.
        if (videoUrl && (platform === CONST_1.default.PLATFORM.WEB || platform === CONST_1.default.PLATFORM.DESKTOP)) {
            var video_1 = document.createElement('video');
            video_1.onloadedmetadata = function () {
                if (video_1.videoWidth === measuredDimensions.width && video_1.videoHeight === measuredDimensions.height) {
                    return;
                }
                setMeasuredDimensions({
                    width: video_1.videoWidth,
                    height: video_1.videoHeight,
                });
            };
            video_1.src = videoUrl;
            video_1.load();
            return function () {
                video_1.src = '';
            };
        }
        setMeasuredDimensions(videoDimensions);
    }, [videoUrl, measuredDimensions.width, measuredDimensions.height, videoDimensions]);
    // We want to play the video only when the user is on the page where it was initially rendered
    var doesUserRemainOnFirstRenderRoute = (0, useCheckIfRouteHasRemainedUnchanged_1.default)(videoUrl);
    // `onSourceLoaded` is passed to VideoPlayerPreview's `Video` element which is displayed only on web.
    // VideoReadyForDisplayEvent type is lacking srcElement, that's why it's added here
    var onSourceLoaded = function (event) {
        var track = event.availableVideoTracks.at(0);
        if (!track) {
            return;
        }
        setMeasuredDimensions({ width: track.size.width, height: track.size.height });
    };
    var handleOnPress = function () {
        updateCurrentURLAndReportID(videoUrl, reportID);
        if (isSmallScreenWidth) {
            onShowModalPress();
        }
    };
    (0, react_1.useEffect)(function () {
        return navigation.addListener('blur', function () { return !isOnAttachmentRoute() && setIsThumbnail(true); });
    }, [navigation]);
    (0, react_1.useEffect)(function () {
        var isFocused = doesUserRemainOnFirstRenderRoute();
        if (videoUrl !== currentlyPlayingURL || reportID !== currentRouteReportID || !isFocused) {
            return;
        }
        setIsThumbnail(false);
    }, [currentlyPlayingURL, currentRouteReportID, updateCurrentURLAndReportID, videoUrl, reportID, doesUserRemainOnFirstRenderRoute, isOnSearch]);
    return (<react_native_1.View style={[styles.webViewStyles.tagStyles.video, thumbnailDimensionsStyles]}>
            {isSmallScreenWidth || isThumbnail || isDeleted ? (<VideoPlayerThumbnail_1.default thumbnailUrl={thumbnailUrl} onPress={handleOnPress} accessibilityLabel={fileName} isDeleted={isDeleted}/>) : (<react_native_1.View style={styles.flex1}>
                    <VideoPlayer_1.default url={videoUrl} onSourceLoaded={onSourceLoaded} videoDuration={videoDuration} shouldUseSmallVideoControls style={[styles.w100, styles.h100]} isPreview videoPlayerStyle={styles.videoPlayerPreview} reportID={reportID}/>
                    <react_native_1.View style={[styles.pAbsolute, styles.w100]}>
                        <IconButton_1.default src={Expensicons.Expand} style={[styles.videoExpandButton]} tooltipText={translate('videoPlayer.expand')} onPress={onShowModalPress} small/>
                    </react_native_1.View>
                </react_native_1.View>)}
        </react_native_1.View>);
}
VideoPlayerPreview.displayName = 'VideoPlayerPreview';
exports.default = VideoPlayerPreview;
