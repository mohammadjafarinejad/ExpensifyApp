"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Web automatically rotates images based on device orientation
 */
var getDeviceOrientationAwareImageSize = function (_a) {
    var imageSize = _a.imageSize, aspectRatioWidth = _a.aspectRatioWidth, aspectRatioHeight = _a.aspectRatioHeight;
    return ({
        imageWidth: imageSize.width,
        imageHeight: imageSize.height,
        aspectRatioWidth: aspectRatioWidth,
        aspectRatioHeight: aspectRatioHeight,
    });
};
exports.default = getDeviceOrientationAwareImageSize;
