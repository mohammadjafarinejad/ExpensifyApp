"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Native does NOT automatically handle image rotation based on device orientation
 * On Android, react-native-image-size already returns the rotation of the image
 */
var getDeviceOrientationAwareImageSize = function (_a) {
    var imageSize = _a.imageSize, aspectRatioWidth = _a.aspectRatioWidth, aspectRatioHeight = _a.aspectRatioHeight;
    var width = imageSize.width, height = imageSize.height, rotation = imageSize.rotation;
    var isRotated = rotation === 90 || rotation === 270;
    return {
        imageWidth: isRotated ? height : width,
        imageHeight: isRotated ? width : height,
        aspectRatioWidth: isRotated ? aspectRatioWidth : aspectRatioHeight,
        aspectRatioHeight: isRotated ? aspectRatioHeight : aspectRatioWidth,
    };
};
exports.default = getDeviceOrientationAwareImageSize;
