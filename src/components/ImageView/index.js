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
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_native_1 = require("react-native");
var AttachmentOfflineIndicator_1 = require("@components/AttachmentOfflineIndicator");
var FullscreenLoadingIndicator_1 = require("@components/FullscreenLoadingIndicator");
var Image_1 = require("@components/Image");
var resizeModes_1 = require("@components/Image/resizeModes");
var Lightbox_1 = require("@components/Lightbox");
var PressableWithoutFeedback_1 = require("@components/Pressable/PressableWithoutFeedback");
var useNetwork_1 = require("@hooks/useNetwork");
var useStyleUtils_1 = require("@hooks/useStyleUtils");
var useThemeStyles_1 = require("@hooks/useThemeStyles");
var DeviceCapabilities_1 = require("@libs/DeviceCapabilities");
var FileUtils_1 = require("@libs/fileDownload/FileUtils");
var CONST_1 = require("@src/CONST");
function calculateZoomScale(containerSize, imageSize) {
    if (!containerSize.width || !containerSize.height || !imageSize.width || !imageSize.height) {
        return 0;
    }
    return Math.min(containerSize.width / imageSize.width, containerSize.height / imageSize.height);
}
function ImageView(_a) {
    var _b = _a.isAuthTokenRequired, isAuthTokenRequired = _b === void 0 ? false : _b, url = _a.url, fileName = _a.fileName, onError = _a.onError;
    var styles = (0, useThemeStyles_1.default)();
    var StyleUtils = (0, useStyleUtils_1.default)();
    var isOffline = (0, useNetwork_1.default)().isOffline;
    var scrollableRef = (0, react_1.useRef)(null);
    var canUseTouchScreen = (0, DeviceCapabilities_1.canUseTouchScreen)();
    var _c = (0, react_1.useState)(true), isLoading = _c[0], setIsLoading = _c[1];
    var _d = (0, react_1.useState)(false), isZoomed = _d[0], setIsZoomed = _d[1];
    var _e = (0, react_1.useState)(false), isDragging = _e[0], setIsDragging = _e[1];
    var _f = (0, react_1.useState)(false), isMouseDown = _f[0], setIsMouseDown = _f[1];
    var _g = (0, react_1.useState)(0), initialScrollLeft = _g[0], setInitialScrollLeft = _g[1];
    var _h = (0, react_1.useState)(0), initialScrollTop = _h[0], setInitialScrollTop = _h[1];
    var _j = (0, react_1.useState)(0), initialX = _j[0], setInitialX = _j[1];
    var _k = (0, react_1.useState)(0), initialY = _k[0], setInitialY = _k[1];
    var _l = (0, react_1.useState)({ width: 0, height: 0 }), containerSize = _l[0], setContainerSize = _l[1];
    var _m = (0, react_1.useState)({ width: 0, height: 0 }), imageSize = _m[0], setImageSize = _m[1];
    var _o = (0, react_1.useState)(), zoomDelta = _o[0], setZoomDelta = _o[1];
    var zoomScale = calculateZoomScale(containerSize, imageSize);
    var onContainerLayoutChanged = function (e) {
        setContainerSize(e.nativeEvent.layout);
    };
    var imageLoadingStart = function () {
        if (!isLoading) {
            return;
        }
        setImageSize({ width: 0, height: 0 });
        setIsLoading(true);
        setIsZoomed(false);
    };
    var imageLoad = function (_a) {
        var size = _a.nativeEvent;
        setImageSize(size);
        setIsLoading(false);
    };
    var onContainerPressIn = function (e) {
        var _a, _b, _c, _d;
        var _e = e.nativeEvent, pageX = _e.pageX, pageY = _e.pageY;
        setIsMouseDown(true);
        setInitialX(pageX);
        setInitialY(pageY);
        setInitialScrollLeft((_b = (_a = scrollableRef.current) === null || _a === void 0 ? void 0 : _a.scrollLeft) !== null && _b !== void 0 ? _b : 0);
        setInitialScrollTop((_d = (_c = scrollableRef.current) === null || _c === void 0 ? void 0 : _c.scrollTop) !== null && _d !== void 0 ? _d : 0);
    };
    /**
     * Convert touch point to zoomed point
     * @param x point when click zoom
     * @param y point when click zoom
     * @returns converted touch point
     */
    var getScrollOffset = function (x, y) {
        var offsetX = 0;
        var offsetY = 0;
        // Container size bigger than clicked position offset
        if (x <= containerSize.width / 2) {
            offsetX = 0;
        }
        else if (x > containerSize.width / 2) {
            // Minus half of container size because we want to be center clicked position
            offsetX = x - containerSize.width / 2;
        }
        if (y <= containerSize.height / 2) {
            offsetY = 0;
        }
        else if (y > containerSize.height / 2) {
            // Minus half of container size because we want to be center clicked position
            offsetY = y - containerSize.height / 2;
        }
        return { offsetX: offsetX, offsetY: offsetY };
    };
    var onContainerPress = function (e) {
        if (!isZoomed && !isDragging) {
            if (e && 'nativeEvent' in e && e.nativeEvent instanceof PointerEvent) {
                var _a = e.nativeEvent, offsetX = _a.offsetX, offsetY = _a.offsetY;
                // Dividing clicked positions by the zoom scale to get coordinates
                // so that once we zoom we will scroll to the clicked location.
                var delta = getScrollOffset(offsetX / zoomScale, offsetY / zoomScale);
                setZoomDelta(delta);
            }
            else {
                setZoomDelta({ offsetX: 0, offsetY: 0 });
            }
        }
        if (isZoomed && isDragging && isMouseDown) {
            setIsDragging(false);
            setIsMouseDown(false);
        }
        else {
            // We first zoom and once its done then we scroll to the location the user clicked.
            setIsZoomed(!isZoomed);
            setIsMouseDown(false);
        }
    };
    var trackPointerPosition = (0, react_1.useCallback)(function (event) {
        var _a;
        // Whether the pointer is released inside the ImageView
        var isInsideImageView = (_a = scrollableRef.current) === null || _a === void 0 ? void 0 : _a.contains(event.target);
        if (!isInsideImageView && isZoomed && isDragging && isMouseDown) {
            setIsDragging(false);
            setIsMouseDown(false);
        }
    }, [isDragging, isMouseDown, isZoomed]);
    var trackMovement = (0, react_1.useCallback)(function (event) {
        if (!isZoomed) {
            return;
        }
        if (isDragging && isMouseDown && scrollableRef.current) {
            var x = event.x;
            var y = event.y;
            var moveX = initialX - x;
            var moveY = initialY - y;
            scrollableRef.current.scrollLeft = initialScrollLeft + moveX;
            scrollableRef.current.scrollTop = initialScrollTop + moveY;
        }
        setIsDragging(isMouseDown);
    }, [initialScrollLeft, initialScrollTop, initialX, initialY, isDragging, isMouseDown, isZoomed]);
    (0, react_1.useEffect)(function () {
        if (!isZoomed || !zoomDelta || !scrollableRef.current) {
            return;
        }
        scrollableRef.current.scrollLeft = zoomDelta.offsetX;
        scrollableRef.current.scrollTop = zoomDelta.offsetY;
    }, [zoomDelta, isZoomed]);
    (0, react_1.useEffect)(function () {
        if (canUseTouchScreen) {
            return;
        }
        document.addEventListener('mousemove', trackMovement);
        document.addEventListener('mouseup', trackPointerPosition);
        return function () {
            document.removeEventListener('mousemove', trackMovement);
            document.removeEventListener('mouseup', trackPointerPosition);
        };
    }, [canUseTouchScreen, trackMovement, trackPointerPosition]);
    // isLocalToUserDeviceFile means the file is located on the user device,
    // not loaded on the server yet (the user is offline when loading this file in fact)
    var isLocalToUserDeviceFile = (0, FileUtils_1.isLocalFile)(url);
    if (isLocalToUserDeviceFile && typeof url === 'string' && url.startsWith('/chat-attachments')) {
        isLocalToUserDeviceFile = false;
    }
    if (canUseTouchScreen) {
        return (<Lightbox_1.default uri={url} isAuthTokenRequired={isAuthTokenRequired} onError={onError}/>);
    }
    return (<react_native_1.View ref={scrollableRef} onLayout={onContainerLayoutChanged} style={[styles.imageViewContainer, styles.overflowAuto, styles.pRelative]}>
            <PressableWithoutFeedback_1.default style={__assign(__assign(__assign(__assign({}, StyleUtils.getZoomSizingStyle({ imageSize: imageSize, containerSize: containerSize, isZoomed: isZoomed, zoomScale: zoomScale, isLoading: isLoading })), StyleUtils.getZoomCursorStyle(isZoomed, isDragging)), (isZoomed && zoomScale >= 1 ? styles.pRelative : styles.pAbsolute)), styles.flex1)} onPressIn={onContainerPressIn} onPress={onContainerPress} role={CONST_1.default.ROLE.IMG} accessibilityLabel={fileName}>
                <Image_1.default source={{ uri: url }} isAuthTokenRequired={isAuthTokenRequired} style={[styles.h100, styles.w100]} resizeMode={resizeModes_1.default.contain} onLoadStart={imageLoadingStart} onLoad={imageLoad} waitForSession={function () {
            setImageSize({ width: 0, height: 0 });
            setIsLoading(true);
            setIsZoomed(false);
        }} onError={onError}/>
            </PressableWithoutFeedback_1.default>

            {isLoading && (!isOffline || isLocalToUserDeviceFile) && <FullscreenLoadingIndicator_1.default style={[styles.opacity1, styles.bgTransparent]}/>}
            {isLoading && !isLocalToUserDeviceFile && <AttachmentOfflineIndicator_1.default />}
        </react_native_1.View>);
}
ImageView.displayName = 'ImageView';
exports.default = ImageView;
