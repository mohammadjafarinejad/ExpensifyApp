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
var index_1 = require("../../src/libs/cropOrRotateImage/getDeviceOrientationAwareImageSize/index");
var index_android_1 = require("../../src/libs/cropOrRotateImage/getDeviceOrientationAwareImageSize/index.android");
var index_ios_1 = require("../../src/libs/cropOrRotateImage/getDeviceOrientationAwareImageSize/index.ios");
var mockImageSize = {
    width: 1920,
    height: 1080,
};
var mockImageSizeWithRotation = {
    width: 1920,
    height: 1080,
    rotation: 0,
};
describe('getDeviceOrientationAwareImageSize', function () {
    describe('Web Platform', function () {
        it('should return original dimensions with no rotation', function () {
            var params = {
                imageSize: mockImageSize,
                aspectRatioWidth: 16,
                aspectRatioHeight: 9,
            };
            var result = (0, index_1.default)(params);
            expect(result).toEqual({
                imageWidth: 1920,
                imageHeight: 1080,
                aspectRatioWidth: 16,
                aspectRatioHeight: 9,
            });
        });
    });
    describe('iOS Platform', function () {
        describe('Portrait orientations (rotated)', function () {
            it('should detect rotation for portrait orientation', function () {
                var params = {
                    imageSize: mockImageSize,
                    orientation: 'portrait',
                    aspectRatioWidth: 16,
                    aspectRatioHeight: 9,
                };
                var result = (0, index_ios_1.default)(params);
                expect(result).toEqual({
                    imageWidth: 1920,
                    imageHeight: 1080,
                    aspectRatioWidth: 9,
                    aspectRatioHeight: 16,
                });
            });
            it('should detect rotation for portrait-upside-down orientation', function () {
                var params = {
                    imageSize: mockImageSize,
                    orientation: 'portrait-upside-down',
                    aspectRatioWidth: 4,
                    aspectRatioHeight: 3,
                };
                var result = (0, index_ios_1.default)(params);
                expect(result).toEqual({
                    imageWidth: 1920,
                    imageHeight: 1080,
                    aspectRatioWidth: 3,
                    aspectRatioHeight: 4,
                });
            });
        });
        describe('Landscape orientations (not rotated)', function () {
            it('should not detect rotation for landscape-left orientation', function () {
                var params = {
                    imageSize: mockImageSize,
                    orientation: 'landscape-left',
                    aspectRatioWidth: 16,
                    aspectRatioHeight: 9,
                };
                var result = (0, index_ios_1.default)(params);
                expect(result).toEqual({
                    imageWidth: 1920,
                    imageHeight: 1080,
                    aspectRatioWidth: 16,
                    aspectRatioHeight: 9,
                });
            });
            it('should not detect rotation for landscape-right orientation', function () {
                var params = {
                    imageSize: mockImageSize,
                    orientation: 'landscape-right',
                    aspectRatioWidth: 21,
                    aspectRatioHeight: 9,
                };
                var result = (0, index_ios_1.default)(params);
                expect(result).toEqual({
                    imageWidth: 1920,
                    imageHeight: 1080,
                    aspectRatioWidth: 21,
                    aspectRatioHeight: 9,
                });
            });
        });
    });
    describe('Android Platform', function () {
        describe('Non-rotated images (0° and 180°)', function () {
            it('should handle 0 degree rotation', function () {
                var params = {
                    imageSize: __assign(__assign({}, mockImageSizeWithRotation), { rotation: 0 }),
                    aspectRatioWidth: 16,
                    aspectRatioHeight: 9,
                };
                var result = (0, index_android_1.default)(params);
                expect(result).toEqual({
                    imageWidth: 1920,
                    imageHeight: 1080,
                    aspectRatioWidth: 9,
                    aspectRatioHeight: 16,
                });
            });
            it('should handle 180 degree rotation', function () {
                var params = {
                    imageSize: __assign(__assign({}, mockImageSizeWithRotation), { rotation: 180 }),
                    aspectRatioWidth: 4,
                    aspectRatioHeight: 3,
                };
                var result = (0, index_android_1.default)(params);
                expect(result).toEqual({
                    imageWidth: 1920,
                    imageHeight: 1080,
                    aspectRatioWidth: 3,
                    aspectRatioHeight: 4,
                });
            });
        });
        describe('Rotated images (90° and 270°)', function () {
            it('should handle 90 degree rotation with dimension and aspect ratio swapping', function () {
                var params = {
                    imageSize: __assign(__assign({}, mockImageSizeWithRotation), { rotation: 90 }),
                    aspectRatioWidth: 16,
                    aspectRatioHeight: 9,
                };
                var result = (0, index_android_1.default)(params);
                expect(result).toEqual({
                    imageWidth: 1080,
                    imageHeight: 1920,
                    aspectRatioWidth: 16,
                    aspectRatioHeight: 9,
                });
            });
            it('should handle 270 degree rotation with dimension and aspect ratio swapping', function () {
                var params = {
                    imageSize: __assign(__assign({}, mockImageSizeWithRotation), { rotation: 270 }),
                    aspectRatioWidth: 21,
                    aspectRatioHeight: 9,
                };
                var result = (0, index_android_1.default)(params);
                expect(result).toEqual({
                    imageWidth: 1080,
                    imageHeight: 1920,
                    aspectRatioWidth: 21,
                    aspectRatioHeight: 9,
                });
            });
        });
    });
});
