"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateCropRect = calculateCropRect;
exports.cropImageToAspectRatio = cropImageToAspectRatio;
var react_native_image_size_1 = require("react-native-image-size");
var cropOrRotateImage_1 = require("@libs/cropOrRotateImage");
var getDeviceOrientationAwareImageSize_1 = require("@libs/cropOrRotateImage/getDeviceOrientationAwareImageSize");
function calculateCropRect(imageWidth, imageHeight, aspectRatioWidth, aspectRatioHeight, shouldAlignTop) {
    var sourceAspectRatio = imageWidth / imageHeight;
    var targetAspectRatio = aspectRatioWidth / aspectRatioHeight;
    var width = imageWidth;
    var height = imageHeight;
    var originX = 0;
    var originY = 0;
    if (sourceAspectRatio > targetAspectRatio) {
        width = height * targetAspectRatio;
        originX = (imageWidth - width) / 2;
    }
    else {
        height = width * (aspectRatioHeight / aspectRatioWidth);
        originY = shouldAlignTop ? 0 : (imageHeight - height) / 2;
    }
    return { width: width, height: height, originX: originX, originY: originY };
}
var IMAGE_TYPE = 'image/jpeg';
function cropImageToAspectRatio(
/** Source image */
image, 
/** Width portion of the target aspect ratio (e.g., 16 for 16:9) */
aspectRatioWidth, 
/** Height portion of the target aspect ratio (e.g., 9 for 16:9) */
aspectRatioHeight, 
/** Vertically align the crop to the top (true) or center (false) */
shouldAlignTop, 
/** Image orientation determined by react-native-image-size that depends on device orientation */
orientation) {
    return react_native_image_size_1.default.getSize(image.source)
        .then(function (imageSize) {
        var _a = (0, getDeviceOrientationAwareImageSize_1.default)({ imageSize: imageSize, orientation: orientation, aspectRatioWidth: aspectRatioWidth, aspectRatioHeight: aspectRatioHeight }), imageWidth = _a.imageWidth, imageHeight = _a.imageHeight, ratioWidth = _a.aspectRatioWidth, ratioHeight = _a.aspectRatioHeight;
        if (!imageWidth || !imageHeight || !ratioWidth || !ratioHeight) {
            return image;
        }
        var crop = calculateCropRect(imageWidth, imageHeight, ratioWidth, ratioHeight, shouldAlignTop);
        var croppedFilename = "receipt_cropped_".concat(Date.now(), ".jpeg");
        return (0, cropOrRotateImage_1.default)(image.source, [{ crop: crop }], { compress: 1, name: croppedFilename, type: IMAGE_TYPE }).then(function (croppedImage) {
            if (!(croppedImage === null || croppedImage === void 0 ? void 0 : croppedImage.uri) || !(croppedImage === null || croppedImage === void 0 ? void 0 : croppedImage.name)) {
                return image;
            }
            return { file: croppedImage, filename: croppedImage.name, source: croppedImage.uri };
        });
    })
        .catch(function () { return image; });
}
