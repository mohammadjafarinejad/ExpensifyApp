"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidExtension = isValidExtension;
exports.isValidSize = isValidSize;
exports.isValidResolution = isValidResolution;
exports.validateAvatarImage = validateAvatarImage;
exports.getValidatedImageSource = getValidatedImageSource;
var CONST_1 = require("@src/CONST");
var FileUtils_1 = require("./fileDownload/FileUtils");
var getImageResolution_1 = require("./fileDownload/getImageResolution");
var tryResolveUrlFromApiRoot_1 = require("./tryResolveUrlFromApiRoot");
/**
 * Validates if an image file has an allowed extension.
 *
 * @param image - The image file object to validate
 * @returns true if the file extension is in the allowed list
 */
function isValidExtension(image) {
    var _a;
    var fileExtension = (0, FileUtils_1.splitExtensionFromFileName)((_a = image === null || image === void 0 ? void 0 : image.name) !== null && _a !== void 0 ? _a : '').fileExtension;
    return CONST_1.default.AVATAR_ALLOWED_EXTENSIONS.some(function (extension) { return extension === fileExtension.toLowerCase(); });
}
/**
 * Validates if an image file size is within allowed limits.
 *
 * @param image - The image file object to validate
 * @returns true if the file size is less than the maximum allowed
 */
function isValidSize(image) {
    var _a;
    return ((_a = image === null || image === void 0 ? void 0 : image.size) !== null && _a !== void 0 ? _a : 0) < CONST_1.default.AVATAR_MAX_ATTACHMENT_SIZE;
}
/**
 * Validates if an image resolution meets the avatar constraints.
 *
 * @param image - The image file object to validate
 * @returns Promise resolving to true if resolution is within bounds
 */
function isValidResolution(image) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, height, width, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, (0, getImageResolution_1.default)(image)];
                case 1:
                    _a = _c.sent(), height = _a.height, width = _a.width;
                    return [2 /*return*/, height >= CONST_1.default.AVATAR_MIN_HEIGHT_PX && width >= CONST_1.default.AVATAR_MIN_WIDTH_PX && height <= CONST_1.default.AVATAR_MAX_HEIGHT_PX && width <= CONST_1.default.AVATAR_MAX_WIDTH_PX];
                case 2:
                    _b = _c.sent();
                    return [2 /*return*/, false];
                case 3: return [2 /*return*/];
            }
        });
    });
}
/**
 * Comprehensively validates an avatar image file.
 * Checks extension, size, corruption, and resolution.
 *
 * @param image - The image file object to validate
 * @returns Promise resolving to ValidationResult with error details if validation fails
 *
 * @example
 * ```typescript
 * const result = await validateAvatarImage(file);
 * if (!result.isValid) {
 *   showError(result.errorKey, result.errorParams);
 * }
 * ```
 */
function validateAvatarImage(image) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, validResolution;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    if (!isValidExtension(image)) {
                        return [2 /*return*/, {
                                isValid: false,
                                errorKey: 'avatarWithImagePicker.notAllowedExtension',
                                errorParams: { allowedExtensions: CONST_1.default.AVATAR_ALLOWED_EXTENSIONS },
                            }];
                    }
                    if (!isValidSize(image)) {
                        return [2 /*return*/, {
                                isValid: false,
                                errorKey: 'avatarWithImagePicker.sizeExceeded',
                                errorParams: { maxUploadSizeInMB: CONST_1.default.AVATAR_MAX_ATTACHMENT_SIZE / (1024 * 1024) },
                            }];
                    }
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, (0, FileUtils_1.validateImageForCorruption)(image)];
                case 2:
                    _b.sent();
                    return [3 /*break*/, 4];
                case 3:
                    _a = _b.sent();
                    return [2 /*return*/, {
                            isValid: false,
                            errorKey: 'attachmentPicker.errorWhileSelectingCorruptedAttachment',
                            errorParams: {},
                        }];
                case 4: return [4 /*yield*/, isValidResolution(image)];
                case 5:
                    validResolution = _b.sent();
                    if (!validResolution) {
                        return [2 /*return*/, {
                                isValid: false,
                                errorKey: 'avatarWithImagePicker.resolutionConstraints',
                                errorParams: {
                                    minHeightInPx: CONST_1.default.AVATAR_MIN_HEIGHT_PX,
                                    minWidthInPx: CONST_1.default.AVATAR_MIN_WIDTH_PX,
                                    maxHeightInPx: CONST_1.default.AVATAR_MAX_HEIGHT_PX,
                                    maxWidthInPx: CONST_1.default.AVATAR_MAX_WIDTH_PX,
                                },
                            }];
                    }
                    return [2 /*return*/, { isValid: true }];
            }
        });
    });
}
function getValidatedImageSource(source) {
    var numberSource = Number(source);
    if (!Number.isNaN(numberSource) && numberSource !== 0) {
        return numberSource;
    }
    if (typeof source === 'string') {
        return (0, tryResolveUrlFromApiRoot_1.default)(decodeURIComponent(source));
    }
    return undefined;
}
