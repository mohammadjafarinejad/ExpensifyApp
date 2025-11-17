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
var ApiUtils_1 = require("@libs/ApiUtils");
var CONST_1 = require("@src/CONST");
var AvatarUtils_1 = require("@src/libs/AvatarUtils");
var FileUtils = require("@src/libs/fileDownload/FileUtils");
var getImageResolution = require("@src/libs/fileDownload/getImageResolution");
jest.mock('@src/libs/fileDownload/FileUtils');
jest.mock('@src/libs/fileDownload/getImageResolution');
describe('AvatarUtils', function () {
    var mockFileUtils = FileUtils;
    var mockGetImageResolution = getImageResolution;
    beforeEach(function () {
        jest.clearAllMocks();
    });
    describe('isValidExtension', function () {
        beforeEach(function () {
            mockFileUtils.splitExtensionFromFileName.mockImplementation(function (fileName) {
                var parts = fileName.split('.');
                var extension = parts.at(parts.length - 1);
                var name = parts.slice(0, -1).join('.');
                return { fileName: name, fileExtension: extension !== null && extension !== void 0 ? extension : '' };
            });
        });
        it.each(['jpg', 'jpeg', 'png', 'gif', 'bmp', 'svg', 'JPG', 'JPEG', 'PNG', 'GIF', 'BMP', 'SVG', 'JpG', 'PnG', 'GiF', 'bMp'])('should return true for allowed extension (case insensitive): %s', function (ext) {
            var image = { name: "test.".concat(ext) };
            expect((0, AvatarUtils_1.isValidExtension)(image)).toBe(true);
        });
        it.each(['pdf', 'doc', 'txt', 'exe', 'zip'])('should return false for disallowed extension: %s', function (ext) {
            var image = { name: "test.".concat(ext) };
            expect((0, AvatarUtils_1.isValidExtension)(image)).toBe(false);
        });
        it('should return false for file without an extension', function () {
            var image = { name: 'test' };
            expect((0, AvatarUtils_1.isValidExtension)(image)).toBe(false);
        });
        it('should handle undefined name', function () {
            var image = {};
            expect((0, AvatarUtils_1.isValidExtension)(image)).toBe(false);
        });
        it('should handle files with multiple dots in name', function () {
            var image = { name: 'test.file.name.jpg' };
            expect((0, AvatarUtils_1.isValidExtension)(image)).toBe(true);
        });
    });
    describe('isValidSize', function () {
        it.each([0, 1000, 1024 * 1024, CONST_1.default.AVATAR_MAX_ATTACHMENT_SIZE - 1])('should return true for files within size limit: %i bytes', function (size) {
            var image = { size: size };
            expect((0, AvatarUtils_1.isValidSize)(image)).toBe(true);
        });
        it.each([CONST_1.default.AVATAR_MAX_ATTACHMENT_SIZE, CONST_1.default.AVATAR_MAX_ATTACHMENT_SIZE + 1, CONST_1.default.AVATAR_MAX_ATTACHMENT_SIZE * 2])('should return false for files exceeding size limit: %i bytes', function (size) {
            var image = { size: size };
            expect((0, AvatarUtils_1.isValidSize)(image)).toBe(false);
        });
        it('should handle undefined size as 0', function () {
            var image = {};
            expect((0, AvatarUtils_1.isValidSize)(image)).toBe(true);
        });
        it('should handle null size as 0', function () {
            var image = { size: null };
            expect((0, AvatarUtils_1.isValidSize)(image)).toBe(true);
        });
    });
    describe('isValidResolution', function () {
        it.each([
            { width: 800, height: 800, description: 'valid resolution within bounds' },
            { width: CONST_1.default.AVATAR_MIN_WIDTH_PX, height: CONST_1.default.AVATAR_MIN_HEIGHT_PX, description: 'minimum valid resolution' },
            { width: CONST_1.default.AVATAR_MAX_WIDTH_PX, height: CONST_1.default.AVATAR_MAX_HEIGHT_PX, description: 'maximum valid resolution' },
            {
                width: 1000,
                height: 500,
                description: 'rectangular images within bounds',
            },
        ])('should return true for $description', function (_a) {
            var width = _a.width, height = _a.height;
            mockGetImageResolution.default.mockResolvedValue({ width: width, height: height });
            var image = { name: 'test.jpg' };
            return expect((0, AvatarUtils_1.isValidResolution)(image)).resolves.toBe(true);
        });
        it.each([
            { width: CONST_1.default.AVATAR_MIN_WIDTH_PX, height: CONST_1.default.AVATAR_MIN_HEIGHT_PX - 1, description: 'height below minimum' },
            { width: CONST_1.default.AVATAR_MIN_WIDTH_PX - 1, height: CONST_1.default.AVATAR_MIN_HEIGHT_PX, description: 'width below minimum' },
            { width: CONST_1.default.AVATAR_MAX_WIDTH_PX, height: CONST_1.default.AVATAR_MAX_HEIGHT_PX + 1, description: 'height above maximum' },
            { width: CONST_1.default.AVATAR_MAX_WIDTH_PX + 1, height: CONST_1.default.AVATAR_MAX_HEIGHT_PX, description: 'width above maximum' },
            { width: 1, height: 1, description: 'very small images' },
            { width: 10000, height: 10000, description: 'very large images' },
        ])('should return false for $description', function (_a) {
            var width = _a.width, height = _a.height;
            mockGetImageResolution.default.mockResolvedValue({ width: width, height: height });
            var image = { name: 'test.jpg' };
            return expect((0, AvatarUtils_1.isValidResolution)(image)).resolves.toBe(false);
        });
        it('should return false when getImageResolution throws error', function () {
            mockGetImageResolution.default.mockRejectedValue(new Error('Failed to get resolution'));
            var image = { name: 'test.jpg' };
            return expect((0, AvatarUtils_1.isValidResolution)(image)).resolves.toBe(false);
        });
    });
    describe('validateAvatarImage', function () {
        beforeEach(function () {
            mockFileUtils.splitExtensionFromFileName.mockImplementation(function (fileName) {
                var parts = fileName.split('.');
                var extension = parts.at(parts.length - 1);
                var name = parts.slice(0, -1).join('.');
                return { fileName: name, fileExtension: extension !== null && extension !== void 0 ? extension : '' };
            });
            mockGetImageResolution.default.mockResolvedValue({
                width: 800,
                height: 800,
            });
            mockFileUtils.validateImageForCorruption.mockResolvedValue(undefined);
        });
        it('should return valid result for valid image', function () { return __awaiter(void 0, void 0, void 0, function () {
            var image, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        image = {
                            name: 'avatar.jpg',
                            size: 1024 * 1024,
                        };
                        return [4 /*yield*/, (0, AvatarUtils_1.validateAvatarImage)(image)];
                    case 1:
                        result = _a.sent();
                        expect(result).toEqual({ isValid: true });
                        return [2 /*return*/];
                }
            });
        }); });
        it('should return error for invalid extension', function () { return __awaiter(void 0, void 0, void 0, function () {
            var image, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        image = {
                            name: 'avatar.pdf',
                            size: 1024 * 1024,
                        };
                        return [4 /*yield*/, (0, AvatarUtils_1.validateAvatarImage)(image)];
                    case 1:
                        result = _a.sent();
                        expect(result).toEqual({
                            isValid: false,
                            errorKey: 'avatarWithImagePicker.notAllowedExtension',
                            errorParams: { allowedExtensions: CONST_1.default.AVATAR_ALLOWED_EXTENSIONS },
                        });
                        return [2 /*return*/];
                }
            });
        }); });
        it('should return error for file size exceeding limit', function () { return __awaiter(void 0, void 0, void 0, function () {
            var image, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        image = {
                            name: 'avatar.jpg',
                            size: CONST_1.default.AVATAR_MAX_ATTACHMENT_SIZE + 1,
                        };
                        return [4 /*yield*/, (0, AvatarUtils_1.validateAvatarImage)(image)];
                    case 1:
                        result = _a.sent();
                        expect(result).toEqual({
                            isValid: false,
                            errorKey: 'avatarWithImagePicker.sizeExceeded',
                            errorParams: { maxUploadSizeInMB: CONST_1.default.AVATAR_MAX_ATTACHMENT_SIZE / (1024 * 1024) },
                        });
                        return [2 /*return*/];
                }
            });
        }); });
        it('should return error for corrupted image', function () { return __awaiter(void 0, void 0, void 0, function () {
            var image, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        mockFileUtils.validateImageForCorruption.mockRejectedValue(new Error('Corrupted image'));
                        image = {
                            name: 'avatar.jpg',
                            size: 1024 * 1024,
                        };
                        return [4 /*yield*/, (0, AvatarUtils_1.validateAvatarImage)(image)];
                    case 1:
                        result = _a.sent();
                        expect(result).toEqual({
                            isValid: false,
                            errorKey: 'attachmentPicker.errorWhileSelectingCorruptedAttachment',
                            errorParams: {},
                        });
                        return [2 /*return*/];
                }
            });
        }); });
        it('should return error for invalid resolution', function () { return __awaiter(void 0, void 0, void 0, function () {
            var image, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        mockGetImageResolution.default.mockResolvedValue({
                            width: 50,
                            height: 50,
                        });
                        image = {
                            name: 'avatar.jpg',
                            size: 1024 * 1024,
                        };
                        return [4 /*yield*/, (0, AvatarUtils_1.validateAvatarImage)(image)];
                    case 1:
                        result = _a.sent();
                        expect(result).toEqual({
                            isValid: false,
                            errorKey: 'avatarWithImagePicker.resolutionConstraints',
                            errorParams: {
                                minHeightInPx: CONST_1.default.AVATAR_MIN_HEIGHT_PX,
                                minWidthInPx: CONST_1.default.AVATAR_MIN_WIDTH_PX,
                                maxHeightInPx: CONST_1.default.AVATAR_MAX_HEIGHT_PX,
                                maxWidthInPx: CONST_1.default.AVATAR_MAX_WIDTH_PX,
                            },
                        });
                        return [2 /*return*/];
                }
            });
        }); });
        it('should validate extension before size', function () { return __awaiter(void 0, void 0, void 0, function () {
            var image, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        image = {
                            name: 'avatar.pdf',
                            size: CONST_1.default.AVATAR_MAX_ATTACHMENT_SIZE + 1,
                        };
                        return [4 /*yield*/, (0, AvatarUtils_1.validateAvatarImage)(image)];
                    case 1:
                        result = _a.sent();
                        expect(result.errorKey).toBe('avatarWithImagePicker.notAllowedExtension');
                        return [2 /*return*/];
                }
            });
        }); });
        it('should validate size before corruption check', function () { return __awaiter(void 0, void 0, void 0, function () {
            var image, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        mockFileUtils.validateImageForCorruption.mockRejectedValue(new Error('Corrupted image'));
                        image = {
                            name: 'avatar.jpg',
                            size: CONST_1.default.AVATAR_MAX_ATTACHMENT_SIZE + 1,
                        };
                        return [4 /*yield*/, (0, AvatarUtils_1.validateAvatarImage)(image)];
                    case 1:
                        result = _a.sent();
                        expect(result.errorKey).toBe('avatarWithImagePicker.sizeExceeded');
                        expect(mockFileUtils.validateImageForCorruption).not.toHaveBeenCalled();
                        return [2 /*return*/];
                }
            });
        }); });
        it('should validate corruption before resolution', function () { return __awaiter(void 0, void 0, void 0, function () {
            var image, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        mockFileUtils.validateImageForCorruption.mockRejectedValue(new Error('Corrupted image'));
                        mockGetImageResolution.default.mockResolvedValue({
                            width: 50,
                            height: 50,
                        });
                        image = {
                            name: 'avatar.jpg',
                            size: 1024 * 1024,
                        };
                        return [4 /*yield*/, (0, AvatarUtils_1.validateAvatarImage)(image)];
                    case 1:
                        result = _a.sent();
                        expect(result.errorKey).toBe('attachmentPicker.errorWhileSelectingCorruptedAttachment');
                        expect(mockGetImageResolution.default).not.toHaveBeenCalled();
                        return [2 /*return*/];
                }
            });
        }); });
        it('should validate all checks in order for a valid image', function () { return __awaiter(void 0, void 0, void 0, function () {
            var image;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        image = {
                            name: 'avatar.jpg',
                            size: 1024 * 1024,
                        };
                        return [4 /*yield*/, (0, AvatarUtils_1.validateAvatarImage)(image)];
                    case 1:
                        _a.sent();
                        expect(mockFileUtils.splitExtensionFromFileName).toHaveBeenCalledWith('avatar.jpg');
                        expect(mockFileUtils.validateImageForCorruption).toHaveBeenCalledWith(image);
                        expect(mockGetImageResolution.default).toHaveBeenCalledWith(image);
                        return [2 /*return*/];
                }
            });
        }); });
        it.each(['png', 'gif', 'bmp', 'svg', 'jpeg', 'JPG', 'JpG'])('should handle %s images', function (extension) { return __awaiter(void 0, void 0, void 0, function () {
            var image, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        image = {
                            name: "avatar.".concat(extension),
                            size: 1024 * 1024,
                        };
                        return [4 /*yield*/, (0, AvatarUtils_1.validateAvatarImage)(image)];
                    case 1:
                        result = _a.sent();
                        expect(result.isValid).toBe(true);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should handle images at minimum valid dimensions', function () { return __awaiter(void 0, void 0, void 0, function () {
            var image, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        mockGetImageResolution.default.mockResolvedValue({
                            width: CONST_1.default.AVATAR_MIN_WIDTH_PX,
                            height: CONST_1.default.AVATAR_MIN_HEIGHT_PX,
                        });
                        image = {
                            name: 'avatar.jpg',
                            size: 1024,
                        };
                        return [4 /*yield*/, (0, AvatarUtils_1.validateAvatarImage)(image)];
                    case 1:
                        result = _a.sent();
                        expect(result.isValid).toBe(true);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should handle images at maximum valid dimensions', function () { return __awaiter(void 0, void 0, void 0, function () {
            var image, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        mockGetImageResolution.default.mockResolvedValue({
                            width: CONST_1.default.AVATAR_MAX_WIDTH_PX,
                            height: CONST_1.default.AVATAR_MAX_HEIGHT_PX,
                        });
                        image = {
                            name: 'avatar.jpg',
                            size: CONST_1.default.AVATAR_MAX_ATTACHMENT_SIZE - 1,
                        };
                        return [4 /*yield*/, (0, AvatarUtils_1.validateAvatarImage)(image)];
                    case 1:
                        result = _a.sent();
                        expect(result.isValid).toBe(true);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should handle resolution check failure gracefully', function () { return __awaiter(void 0, void 0, void 0, function () {
            var image, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        mockGetImageResolution.default.mockRejectedValue(new Error('Failed to read image'));
                        image = {
                            name: 'avatar.jpg',
                            size: 1024 * 1024,
                        };
                        return [4 /*yield*/, (0, AvatarUtils_1.validateAvatarImage)(image)];
                    case 1:
                        result = _a.sent();
                        expect(result).toEqual({
                            isValid: false,
                            errorKey: 'avatarWithImagePicker.resolutionConstraints',
                            errorParams: {
                                minHeightInPx: CONST_1.default.AVATAR_MIN_HEIGHT_PX,
                                minWidthInPx: CONST_1.default.AVATAR_MIN_WIDTH_PX,
                                maxHeightInPx: CONST_1.default.AVATAR_MAX_HEIGHT_PX,
                                maxWidthInPx: CONST_1.default.AVATAR_MAX_WIDTH_PX,
                            },
                        });
                        return [2 /*return*/];
                }
            });
        }); });
        it('should handle image with zero size', function () { return __awaiter(void 0, void 0, void 0, function () {
            var image, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        image = {
                            name: 'avatar.jpg',
                            size: 0,
                        };
                        return [4 /*yield*/, (0, AvatarUtils_1.validateAvatarImage)(image)];
                    case 1:
                        result = _a.sent();
                        expect(result.isValid).toBe(true);
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('getValidatedImageSource', function () {
        it('should validate number sources', function () {
            expect((0, AvatarUtils_1.getValidatedImageSource)(0)).toBe(undefined);
            expect((0, AvatarUtils_1.getValidatedImageSource)(1)).toBe(1);
        });
        it('should decode string source', function () {
            var encodedImageFileName = 'avatar.jpg%3Fv%3D123';
            var decodedImageFileName = decodeURIComponent(encodedImageFileName);
            expect((0, AvatarUtils_1.getValidatedImageSource)(encodedImageFileName)).toBe(decodedImageFileName);
        });
        it('should validate string source', function () {
            var imageFileName = 'avatar.jpg';
            var absoluteImageFilePath = "/".concat(imageFileName);
            var encodedImageFileName = encodeURIComponent(imageFileName);
            var absoluteEncodedImageFilePath = "/".concat(encodedImageFileName);
            var apiRoot = (0, ApiUtils_1.getApiRoot)({ shouldUseSecure: false });
            var prodImageFileUrl = "".concat(apiRoot).concat(imageFileName);
            var encodedProdImageFileUrl = "".concat(apiRoot).concat(encodedImageFileName);
            expect((0, AvatarUtils_1.getValidatedImageSource)(absoluteImageFilePath)).toBe(prodImageFileUrl);
            expect((0, AvatarUtils_1.getValidatedImageSource)(absoluteEncodedImageFilePath)).toBe(encodedProdImageFileUrl);
            expect((0, AvatarUtils_1.getValidatedImageSource)(prodImageFileUrl)).toBe(prodImageFileUrl);
            expect((0, AvatarUtils_1.getValidatedImageSource)(encodedProdImageFileUrl)).toBe(prodImageFileUrl);
        });
    });
});
