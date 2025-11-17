"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Native does NOT automatically handle image rotation based on device orientation
 * On iOS, react-native-image-size uses RN `Image.getSize` API internally which only provides width and height
 * So we need react-native-vision-camera `orientation` to know if the image is rotated
 */
var getDeviceOrientationAwareImageSize = function (_a) {
    var imageSize = _a.imageSize, orientation = _a.orientation, aspectRatioWidth = _a.aspectRatioWidth, aspectRatioHeight = _a.aspectRatioHeight;
    var isRotated = orientation === 'portrait' || orientation === 'portrait-upside-down';
    return {
        imageWidth: imageSize.width,
        imageHeight: imageSize.height,
        aspectRatioWidth: isRotated ? aspectRatioHeight : aspectRatioWidth,
        aspectRatioHeight: isRotated ? aspectRatioWidth : aspectRatioHeight,
    };
};
exports.default = getDeviceOrientationAwareImageSize;
