"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var FileUtils_1 = require("@libs/fileDownload/FileUtils");
var CONST_1 = require("@src/CONST");
var getHeicConverter = function () {
    // Use the CSP variant to ensure the library is loaded in a secure context. See https://github.com/hoppergee/heic-to?tab=readme-ov-file#cotent-security-policy
    // Use webpackMode: "eager" to ensure the library is loaded immediately without evaluating the code. See https://github.com/Expensify/App/pull/68727#issuecomment-3227196372
    return Promise.resolve().then(function () { return require(/* webpackMode: "eager" */ 'heic-to/csp'); }).then(function (_a) {
        var heicTo = _a.heicTo, isHeic = _a.isHeic;
        return ({ heicTo: heicTo, isHeic: isHeic });
    });
};
/**
 * Web implementation for converting HEIC/HEIF images to JPEG
 * @param file - The file to check and potentially convert
 * @param callbacks - Object containing callback functions for different stages of conversion
 */
var convertHeicImage = function (file, _a) {
    var _b = _a === void 0 ? {} : _a, _c = _b.onSuccess, onSuccess = _c === void 0 ? function () { } : _c, _d = _b.onError, onError = _d === void 0 ? function () { } : _d, _e = _b.onStart, onStart = _e === void 0 ? function () { } : _e, _f = _b.onFinish, onFinish = _f === void 0 ? function () { } : _f;
    if (!file.uri || !(0, FileUtils_1.hasHeicOrHeifExtension)(file)) {
        onSuccess(file);
        return;
    }
    onStart();
    if (!file.uri) {
        onError(new Error('File URI is undefined'), file);
        onFinish();
        return;
    }
    // Start loading the conversion library in parallel with fetching the file
    var libraryPromise = getHeicConverter().catch(function (importError) {
        console.error('Error loading heic-to library:', importError);
        // Re-throw a normalized error so the outer catch can handle it uniformly
        throw new Error('HEIC conversion library unavailable');
    });
    var fetchBlobPromise = fetch(file.uri).then(function (response) { return response.blob(); });
    Promise.all([libraryPromise, fetchBlobPromise])
        .then(function (_a) {
        var _b;
        var heicConverter = _a[0], blob = _a[1];
        var fileName = (_b = file.name) !== null && _b !== void 0 ? _b : 'temp-file.heic';
        var fileFromBlob = new File([blob], fileName, { type: blob.type });
        // Strategy 1: Try heic-to library
        if (heicConverter && typeof heicConverter.heicTo === 'function') {
            return heicConverter.isHeic(fileFromBlob).then(function (isHEIC) {
                if (isHEIC || (0, FileUtils_1.hasHeicOrHeifExtension)(file)) {
                    return heicConverter
                        .heicTo({ blob: blob, type: CONST_1.default.IMAGE_FILE_FORMAT.JPEG })
                        .then(function (convertedBlob) {
                        var jpegFile = Object.assign(new File([convertedBlob], fileName.replace(/\.(heic|heif)$/i, '.jpg'), { type: CONST_1.default.IMAGE_FILE_FORMAT.JPEG }), {
                            uri: URL.createObjectURL(convertedBlob),
                        });
                        onSuccess(jpegFile);
                    })
                        .catch(function () {
                        // Strategy 2: Canvas fallback
                        return (0, FileUtils_1.canvasFallback)(fileFromBlob, fileName)
                            .then(onSuccess)
                            .catch(function (err) {
                            console.error('Canvas fallback failed:', err);
                            onError(err, file);
                        });
                    });
                }
                // Not a HEIC file, return original
                onSuccess(file);
            });
        }
        // No library - use canvas fallback
        return (0, FileUtils_1.canvasFallback)(fileFromBlob, fileName)
            .then(onSuccess)
            .catch(function (err) {
            console.error('Canvas fallback failed:', err);
            onError(err, file);
        });
    })
        .catch(function (err) {
        console.error('Error processing the file:', err);
        onError(err, file);
    })
        .finally(function () {
        onFinish();
    });
};
exports.default = convertHeicImage;
