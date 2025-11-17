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
var react_native_1 = require("react-native");
var CONST_1 = require("../../src/CONST");
var DateUtils_1 = require("../../src/libs/DateUtils");
var FileUtils = require("../../src/libs/fileDownload/FileUtils");
jest.useFakeTimers();
var createMockFile = function (name, size) { return ({
    name: name,
    size: size,
}); };
var createFileNameFromLength = function (_a) {
    var length = _a.length, extension = _a.extension;
    return "".concat('a'.repeat(length)).concat(extension ? ".".concat(extension) : '');
};
describe('FileUtils', function () {
    describe('splitExtensionFromFileName', function () {
        it('should return correct file name and extension', function () {
            var file = FileUtils.splitExtensionFromFileName('image.jpg');
            expect(file.fileName).toEqual('image');
            expect(file.fileExtension).toEqual('jpg');
        });
        it('should return correct file name and extension even with multiple dots on the file name', function () {
            var file = FileUtils.splitExtensionFromFileName('image.pdf.jpg');
            expect(file.fileName).toEqual('image.pdf');
            expect(file.fileExtension).toEqual('jpg');
        });
        it('should return empty extension if the file name does not have it', function () {
            var file = FileUtils.splitExtensionFromFileName('image');
            expect(file.fileName).toEqual('image');
            expect(file.fileExtension).toEqual('');
        });
    });
    describe('appendTimeToFileName', function () {
        it('should append current time to the end of the file name', function () {
            var actualFileName = FileUtils.appendTimeToFileName('image.jpg');
            var expectedFileName = "image-".concat(DateUtils_1.default.getDBTime(), ".jpg");
            expect(actualFileName).toEqual(expectedFileName.replace(CONST_1.default.REGEX.ILLEGAL_FILENAME_CHARACTERS, '_'));
        });
        it('should append current time to the end of the file name without extension', function () {
            var actualFileName = FileUtils.appendTimeToFileName('image');
            var expectedFileName = "image-".concat(DateUtils_1.default.getDBTime());
            expect(actualFileName).toEqual(expectedFileName.replace(CONST_1.default.REGEX.ILLEGAL_FILENAME_CHARACTERS, '_'));
        });
        describe('on Android', function () {
            var platformReplaceProperty;
            beforeEach(function () {
                platformReplaceProperty = jest.replaceProperty(react_native_1.Platform, 'OS', 'android');
            });
            afterEach(function () {
                platformReplaceProperty.restore();
            });
            it('should truncate the file name to safe length when length exceeds the safe length', function () {
                var fileNameExceedingSafeLength = createFileNameFromLength({ length: FileUtils.ANDROID_SAFE_FILE_NAME_LENGTH + 1, extension: 'doc' });
                var actualFileName = FileUtils.appendTimeToFileName(fileNameExceedingSafeLength);
                var expectedTruncatedFileName = "".concat(createFileNameFromLength({ length: FileUtils.ANDROID_SAFE_FILE_NAME_LENGTH - 24 }), "-").concat(DateUtils_1.default.getDBTime(), ".doc");
                expect(actualFileName).toEqual(expectedTruncatedFileName.replace(CONST_1.default.REGEX.ILLEGAL_FILENAME_CHARACTERS, '_'));
            });
        });
        describe('on Non-Android', function () {
            var nonAndroidPlatforms = ['ios', 'macos', 'windows', 'web'];
            describe.each(nonAndroidPlatforms)('%s', function (platform) {
                var platformReplaceProperty;
                beforeEach(function () {
                    platformReplaceProperty = jest.replaceProperty(react_native_1.Platform, 'OS', platform);
                });
                afterEach(function () {
                    platformReplaceProperty.restore();
                });
                it('should not truncate the file name even when length exceeds the Android safe length', function () {
                    var fileNameExceedingAndroidSafeLength = createFileNameFromLength({ length: FileUtils.ANDROID_SAFE_FILE_NAME_LENGTH + 1, extension: 'doc' });
                    var actualFileName = FileUtils.appendTimeToFileName(fileNameExceedingAndroidSafeLength);
                    var expectedFileName = "".concat(createFileNameFromLength({ length: FileUtils.ANDROID_SAFE_FILE_NAME_LENGTH + 1 }), "-").concat(DateUtils_1.default.getDBTime(), ".doc");
                    expect(actualFileName).toEqual(expectedFileName.replace(CONST_1.default.REGEX.ILLEGAL_FILENAME_CHARACTERS, '_'));
                });
            });
        });
    });
    describe('validateAttachment', function () {
        it('should not return FILE_TOO_SMALL when validating small attachment', function () {
            var file = createMockFile('file.csv', CONST_1.default.API_ATTACHMENT_VALIDATIONS.MIN_SIZE - 1);
            var error = FileUtils.validateAttachment(file, { isValidatingMultipleFiles: false, isValidatingReceipts: false });
            expect(error).not.toBe(CONST_1.default.FILE_VALIDATION_ERRORS.FILE_TOO_SMALL);
        });
        it('should return FILE_TOO_SMALL when validating small receipt', function () {
            var file = createMockFile('receipt.jpg', CONST_1.default.API_ATTACHMENT_VALIDATIONS.MIN_SIZE - 1);
            var error = FileUtils.validateAttachment(file, { isValidatingMultipleFiles: false, isValidatingReceipts: true });
            expect(error).toBe(CONST_1.default.FILE_VALIDATION_ERRORS.FILE_TOO_SMALL);
        });
        it('should return FILE_TOO_LARGE for large non-image file', function () {
            var file = createMockFile('file.pdf', CONST_1.default.API_ATTACHMENT_VALIDATIONS.MAX_SIZE + 1);
            var error = FileUtils.validateAttachment(file);
            expect(error).toBe(CONST_1.default.FILE_VALIDATION_ERRORS.FILE_TOO_LARGE);
        });
        it('should return FILE_TOO_LARGE_MULTIPLE when checking multiple files', function () {
            var file = createMockFile('file.pdf', CONST_1.default.API_ATTACHMENT_VALIDATIONS.MAX_SIZE + 1);
            var error = FileUtils.validateAttachment(file, { isValidatingMultipleFiles: true, isValidatingReceipts: false });
            expect(error).toBe(CONST_1.default.FILE_VALIDATION_ERRORS.FILE_TOO_LARGE_MULTIPLE);
        });
        it('should return WRONG_FILE_TYPE for invalid receipt extension', function () {
            var file = createMockFile('receipt.exe', CONST_1.default.API_ATTACHMENT_VALIDATIONS.RECEIPT_MAX_SIZE - 1);
            var error = FileUtils.validateAttachment(file, { isValidatingMultipleFiles: false, isValidatingReceipts: true });
            expect(error).toBe(CONST_1.default.FILE_VALIDATION_ERRORS.WRONG_FILE_TYPE);
        });
        it('should prioritize WRONG_FILE_TYPE over FILE_TOO_LARGE for receipts', function () {
            var file = createMockFile('receipt.exe', CONST_1.default.API_ATTACHMENT_VALIDATIONS.RECEIPT_MAX_SIZE + 10);
            var error = FileUtils.validateAttachment(file, { isValidatingMultipleFiles: false, isValidatingReceipts: true });
            expect(error).toBe(CONST_1.default.FILE_VALIDATION_ERRORS.WRONG_FILE_TYPE);
        });
        it('should return WRONG_FILE_TYPE_MULTIPLE when checking multiple invalid receipt files', function () {
            var file = createMockFile('receipt.exe', CONST_1.default.API_ATTACHMENT_VALIDATIONS.RECEIPT_MAX_SIZE + 10);
            var error = FileUtils.validateAttachment(file, { isValidatingMultipleFiles: true, isValidatingReceipts: true });
            expect(error).toBe(CONST_1.default.FILE_VALIDATION_ERRORS.WRONG_FILE_TYPE_MULTIPLE);
        });
        it('should return empty string for valid image receipt', function () {
            var file = createMockFile('receipt.jpg', CONST_1.default.API_ATTACHMENT_VALIDATIONS.RECEIPT_MAX_SIZE - 1);
            var error = FileUtils.validateAttachment(file, { isValidatingMultipleFiles: false, isValidatingReceipts: true });
            expect(error).toBe('');
        });
    });
    describe('canvasFallback', function () {
        var mockCreateImageBitmap = jest.fn();
        var mockCanvas = {
            width: 0,
            height: 0,
            getContext: jest.fn(),
            toBlob: jest.fn(),
        };
        var mockCtx = {
            drawImage: jest.fn(),
        };
        var mockCreateElement = jest.fn();
        var mockURL = {
            createObjectURL: jest.fn(function () { return 'blob:mock-url'; }),
        };
        beforeEach(function () {
            jest.clearAllMocks();
            // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-member-access
            global.createImageBitmap = mockCreateImageBitmap;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-member-access
            global.document = {
                createElement: mockCreateElement,
            };
            // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-member-access
            global.URL = mockURL;
            mockCreateElement.mockReturnValue(mockCanvas);
            mockCanvas.getContext.mockReturnValue(mockCtx);
            mockCreateImageBitmap.mockResolvedValue({
                width: 1000,
                height: 800,
                close: jest.fn(),
            });
        });
        afterEach(function () {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-member-access
            delete global.createImageBitmap;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-member-access
            delete global.document;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-member-access
            delete global.URL;
        });
        it('should reject when createImageBitmap is undefined', function () { return __awaiter(void 0, void 0, void 0, function () {
            var blob;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-member-access
                        delete global.createImageBitmap;
                        blob = new Blob(['test'], { type: 'image/heic' });
                        return [4 /*yield*/, expect(FileUtils.canvasFallback(blob, 'test.heic')).rejects.toThrow('Canvas fallback not supported in this browser')];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('should successfully convert HEIC to JPEG', function () { return __awaiter(void 0, void 0, void 0, function () {
            var blob, mockBlob, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        blob = new Blob(['test'], { type: 'image/heic' });
                        mockBlob = new Blob(['converted'], { type: 'image/jpeg' });
                        mockCanvas.toBlob.mockImplementation(function (callback) { return callback(mockBlob); });
                        return [4 /*yield*/, FileUtils.canvasFallback(blob, 'expense.heic')];
                    case 1:
                        result = _a.sent();
                        expect(result).toBeInstanceOf(File);
                        expect(result.type).toBe(CONST_1.default.IMAGE_FILE_FORMAT.JPEG);
                        expect(result.name).toBe('expense.jpg');
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-member-access
                        expect(result.uri).toBe('blob:mock-url');
                        return [2 /*return*/];
                }
            });
        }); });
        it('should scale down large images', function () { return __awaiter(void 0, void 0, void 0, function () {
            var blob, mockImageBitmap, mockBlob;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        blob = new Blob(['test'], { type: 'image/heic' });
                        mockImageBitmap = { width: 8192, height: 4000, close: jest.fn() };
                        mockCreateImageBitmap.mockResolvedValue(mockImageBitmap);
                        mockBlob = new Blob(['converted'], { type: 'image/jpeg' });
                        mockCanvas.toBlob.mockImplementation(function (callback) { return callback(mockBlob); });
                        return [4 /*yield*/, FileUtils.canvasFallback(blob, 'test.heic')];
                    case 1:
                        _a.sent();
                        expect(mockCanvas.width).toBe(4096);
                        expect(mockCanvas.height).toBe(2000);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should reject when canvas context is null', function () { return __awaiter(void 0, void 0, void 0, function () {
            var blob;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        blob = new Blob(['test'], { type: 'image/heic' });
                        mockCanvas.getContext.mockReturnValue(null);
                        return [4 /*yield*/, expect(FileUtils.canvasFallback(blob, 'test.heic')).rejects.toThrow('Could not get canvas context')];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('should reject when toBlob returns null', function () { return __awaiter(void 0, void 0, void 0, function () {
            var blob;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        blob = new Blob(['test'], { type: 'image/heic' });
                        mockCanvas.toBlob.mockImplementation(function (callback) { return callback(null); });
                        return [4 /*yield*/, expect(FileUtils.canvasFallback(blob, 'test.heic')).rejects.toThrow('Canvas conversion failed - returned null blob')];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
