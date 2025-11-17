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
var react_native_1 = require("@testing-library/react-native");
var react_1 = require("react");
var useLazyAsset_1 = require("@hooks/useLazyAsset");
jest.mock('@components/Icon/PlaceholderIcon', function () {
    // eslint-disable-next-line @typescript-eslint/no-shadow, @typescript-eslint/no-unsafe-assignment
    var React = require('react');
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access
    return React.memo(function () {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-return
        return React.createElement('svg', {
            dataTestId: 'placeholder-icon',
        });
    });
});
jest.mock('@hooks/useLazyAsset', function () {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    var actual = jest.requireActual('@hooks/useLazyAsset');
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return __assign(__assign({ 
        // eslint-disable-next-line @typescript-eslint/naming-convention
        __esModule: true }, actual), { 
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
        default: actual.default, 
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
        useMemoizedLazyAsset: actual.useMemoizedLazyAsset });
});
// Create proper IconAsset mocks that satisfy the type constraint
var mockAsset = react_1.default.memo(function (props) {
    return react_1.default.createElement('svg', __assign(__assign({}, props), { dataTestId: 'mock-asset', dataType: 'test-asset' }));
});
var mockFallbackAsset = react_1.default.memo(function (props) {
    return react_1.default.createElement('svg', __assign(__assign({}, props), { dataTestId: 'mock-fallback-asset', dataType: 'fallback-asset' }));
});
describe('useLazyAsset', function () {
    beforeEach(function () {
        jest.clearAllMocks();
    });
    it('should initialize with proper state structure', function () {
        var importFn = jest.fn(function () { return Promise.resolve({ default: mockAsset }); });
        var result = (0, react_native_1.renderHook)(function () { return (0, useLazyAsset_1.default)(importFn); }).result;
        // Test that the hook returns the expected structure
        expect(result.current).toHaveProperty('isLoading');
        expect(result.current).toHaveProperty('isLoaded');
        expect(result.current).toHaveProperty('hasError');
        expect(result.current).toHaveProperty('asset');
        // Test that state values are booleans
        expect(typeof result.current.isLoading).toBe('boolean');
        expect(typeof result.current.isLoaded).toBe('boolean');
        expect(typeof result.current.hasError).toBe('boolean');
        // Initially, asset should be undefined (not loaded yet)
        expect(result.current.asset).toBeUndefined();
        expect(result.current.isLoaded).toBe(false);
        expect(result.current.isLoading).toBe(true);
        expect(result.current.hasError).toBe(false);
    });
    it('should handle successful asset loading', function () { return __awaiter(void 0, void 0, void 0, function () {
        var importFn, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    importFn = jest.fn(function () { return Promise.resolve({ default: mockAsset }); });
                    result = (0, react_native_1.renderHook)(function () { return (0, useLazyAsset_1.default)(importFn); }).result;
                    // Initially should be undefined
                    expect(result.current.asset).toBeUndefined();
                    expect(result.current.isLoading).toBe(true);
                    // Wait for asset to load
                    return [4 /*yield*/, (0, react_native_1.waitFor)(function () {
                            expect(result.current.isLoaded).toBe(true);
                        })];
                case 1:
                    // Wait for asset to load
                    _a.sent();
                    // Should have loaded the asset successfully
                    expect(result.current.hasError).toBe(false);
                    expect(result.current.asset).toBe(mockAsset);
                    expect(result.current.isLoading).toBe(false);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should handle loading errors gracefully', function () { return __awaiter(void 0, void 0, void 0, function () {
        var importFn, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    importFn = jest.fn(function () { return Promise.reject(new Error('Failed to load')); });
                    result = (0, react_native_1.renderHook)(function () { return (0, useLazyAsset_1.default)(importFn); }).result;
                    // Initially should be undefined
                    expect(result.current.asset).toBeUndefined();
                    // Wait for error to be processed
                    return [4 /*yield*/, (0, react_native_1.waitFor)(function () {
                            expect(result.current.hasError).toBe(true);
                        })];
                case 1:
                    // Wait for error to be processed
                    _a.sent();
                    // Should remain undefined on error without fallback
                    expect(result.current.asset).toBeUndefined();
                    expect(result.current.hasError).toBe(true);
                    expect(result.current.isLoaded).toBe(false);
                    expect(result.current.isLoading).toBe(false);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should handle fallback assets on error', function () { return __awaiter(void 0, void 0, void 0, function () {
        var importFn, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    importFn = jest.fn(function () { return Promise.reject(new Error('Failed to load')); });
                    result = (0, react_native_1.renderHook)(function () { return (0, useLazyAsset_1.default)(importFn, mockFallbackAsset); }).result;
                    // Initially should be undefined
                    expect(result.current.asset).toBeUndefined();
                    // Wait for fallback to be applied
                    return [4 /*yield*/, (0, react_native_1.waitFor)(function () {
                            expect(result.current.isLoaded).toBe(true);
                        })];
                case 1:
                    // Wait for fallback to be applied
                    _a.sent();
                    // Should use fallback asset on error
                    expect(result.current.asset).toBe(mockFallbackAsset);
                    expect(result.current.hasError).toBe(true);
                    expect(result.current.isLoaded).toBe(true);
                    expect(result.current.isLoading).toBe(false);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should handle component unmounting safely', function () {
        var importFn = jest.fn(function () { return Promise.resolve({ default: mockAsset }); });
        var _a = (0, react_native_1.renderHook)(function () { return (0, useLazyAsset_1.default)(importFn); }), result = _a.result, unmount = _a.unmount;
        // Initially should be undefined
        expect(result.current.asset).toBeUndefined();
        // Should not throw when unmounting
        expect(function () { return unmount(); }).not.toThrow();
    });
    it('should work with different import functions', function () { return __awaiter(void 0, void 0, void 0, function () {
        var importFn1, importFn2, _a, result, rerender;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    importFn1 = jest.fn(function () { return Promise.resolve({ default: mockAsset }); });
                    importFn2 = jest.fn(function () { return Promise.resolve({ default: mockFallbackAsset }); });
                    _a = (0, react_native_1.renderHook)(function (props) { return (0, useLazyAsset_1.default)(props.importFn); }, {
                        initialProps: { importFn: importFn1 },
                    }), result = _a.result, rerender = _a.rerender;
                    // Initially should be undefined
                    expect(result.current.asset).toBeUndefined();
                    // Wait for first asset to load
                    return [4 /*yield*/, (0, react_native_1.waitFor)(function () {
                            expect(result.current.isLoaded).toBe(true);
                        })];
                case 1:
                    // Wait for first asset to load
                    _b.sent();
                    expect(result.current.asset).toBe(mockAsset);
                    // Change import function
                    rerender({ importFn: importFn2 });
                    // Wait for new asset to load
                    return [4 /*yield*/, (0, react_native_1.waitFor)(function () {
                            expect(result.current.asset).toBe(mockFallbackAsset);
                        })];
                case 2:
                    // Wait for new asset to load
                    _b.sent();
                    expect(result.current.asset).toBe(mockFallbackAsset);
                    expect(result.current.isLoaded).toBe(true);
                    return [2 /*return*/];
            }
        });
    }); });
    it('ignores stale results when importFn changes mid-flight', function () { return __awaiter(void 0, void 0, void 0, function () {
        var resolveFirst, firstPromise, importFn1, resolveSecond, secondPromise, importFn2, _a, result, rerender;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    firstPromise = new Promise(function (resolve) {
                        resolveFirst = resolve;
                    });
                    importFn1 = jest.fn(function () { return firstPromise; });
                    secondPromise = new Promise(function (resolve) {
                        resolveSecond = resolve;
                    });
                    importFn2 = jest.fn(function () { return secondPromise; });
                    _a = (0, react_native_1.renderHook)(function (props) { return (0, useLazyAsset_1.default)(props.importFn); }, {
                        initialProps: { importFn: importFn1 },
                    }), result = _a.result, rerender = _a.rerender;
                    // Switch to the new import function before resolving the first
                    rerender({ importFn: importFn2 });
                    // Resolve the newer request first and ensure it wins
                    resolveSecond({ default: mockFallbackAsset });
                    return [4 /*yield*/, (0, react_native_1.waitFor)(function () { return expect(result.current.asset).toBe(mockFallbackAsset); })];
                case 1:
                    _b.sent();
                    // Now resolve the earlier request; it should be ignored (no regression)
                    resolveFirst({ default: mockAsset });
                    return [4 /*yield*/, (0, react_native_1.waitFor)(function () { return expect(result.current.asset).toBe(mockFallbackAsset); })];
                case 2:
                    _b.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('resets isLoading when importFn changes', function () { return __awaiter(void 0, void 0, void 0, function () {
        var importFn1, importFn2, _a, result, rerender;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    importFn1 = jest.fn(function () { return Promise.resolve({ default: mockAsset }); });
                    importFn2 = jest.fn(function () { return Promise.resolve({ default: mockFallbackAsset }); });
                    _a = (0, react_native_1.renderHook)(function (props) { return (0, useLazyAsset_1.default)(props.importFn); }, {
                        initialProps: { importFn: importFn1 },
                    }), result = _a.result, rerender = _a.rerender;
                    return [4 /*yield*/, (0, react_native_1.waitFor)(function () { return expect(result.current.isLoaded).toBe(true); })];
                case 1:
                    _b.sent();
                    // Changing importFn should trigger a new load cycle
                    rerender({ importFn: importFn2 });
                    expect(result.current.isLoading).toBe(true);
                    return [4 /*yield*/, (0, react_native_1.waitFor)(function () { return expect(result.current.asset).toBe(mockFallbackAsset); })];
                case 2:
                    _b.sent();
                    return [2 /*return*/];
            }
        });
    }); });
});
describe('useMemoizedLazyAsset', function () {
    beforeEach(function () {
        jest.clearAllMocks();
    });
    it('should work with basic functionality', function () {
        var importFn = jest.fn(function () { return Promise.resolve({ default: mockAsset }); });
        var result = (0, react_native_1.renderHook)(function () { return (0, useLazyAsset_1.useMemoizedLazyAsset)(importFn); }).result;
        // Test that the hook returns the expected structure
        expect(result.current).toHaveProperty('asset');
        // Initially should return PlaceholderIcon while loading
        expect(result.current.asset).toBeDefined();
        expect(typeof result.current.asset).toBe('object');
    });
    it('should handle successful asset loading', function () { return __awaiter(void 0, void 0, void 0, function () {
        var importFn, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    importFn = jest.fn(function () { return Promise.resolve({ default: mockAsset }); });
                    result = (0, react_native_1.renderHook)(function () { return (0, useLazyAsset_1.useMemoizedLazyAsset)(importFn); }).result;
                    // Initially should return PlaceholderIcon while loading
                    expect(result.current.asset).toBeDefined();
                    expect(result.current.asset).not.toBe(mockAsset);
                    // Wait for asset to load
                    return [4 /*yield*/, (0, react_native_1.waitFor)(function () {
                            expect(result.current.asset).toBe(mockAsset);
                        })];
                case 1:
                    // Wait for asset to load
                    _a.sent();
                    expect(result.current.asset).toBe(mockAsset);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should handle errors with fallback', function () { return __awaiter(void 0, void 0, void 0, function () {
        var importFn, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    importFn = jest.fn(function () { return Promise.reject(new Error('Failed')); });
                    result = (0, react_native_1.renderHook)(function () { return (0, useLazyAsset_1.useMemoizedLazyAsset)(importFn, mockFallbackAsset); }).result;
                    // Initially should return PlaceholderIcon while loading
                    expect(result.current.asset).toBeDefined();
                    expect(result.current.asset).not.toBe(mockFallbackAsset);
                    return [4 /*yield*/, (0, react_native_1.waitFor)(function () {
                            expect(result.current.asset).toBe(mockFallbackAsset);
                        })];
                case 1:
                    _a.sent();
                    // Should use fallback on error
                    expect(result.current.asset).toBe(mockFallbackAsset);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should handle errors without fallback', function () { return __awaiter(void 0, void 0, void 0, function () {
        var importFn, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    importFn = jest.fn(function () { return Promise.reject(new Error('Failed')); });
                    result = (0, react_native_1.renderHook)(function () { return (0, useLazyAsset_1.useMemoizedLazyAsset)(importFn); }).result;
                    // Initially should return PlaceholderIcon while loading
                    expect(result.current.asset).toBeDefined();
                    // Wait a bit to ensure error handling completes
                    return [4 /*yield*/, (0, react_native_1.waitFor)(function () {
                            // Without fallback, asset should remain PlaceholderIcon on error
                            expect(result.current.asset).toBeDefined();
                        })];
                case 1:
                    // Wait a bit to ensure error handling completes
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('should handle function reference changes', function () { return __awaiter(void 0, void 0, void 0, function () {
        var importFn1, importFn2, _a, result, rerender;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    importFn1 = jest.fn(function () { return Promise.resolve({ default: mockAsset }); });
                    importFn2 = jest.fn(function () { return Promise.resolve({ default: mockFallbackAsset }); });
                    _a = (0, react_native_1.renderHook)(function (props) { return (0, useLazyAsset_1.useMemoizedLazyAsset)(props.importFn); }, {
                        initialProps: { importFn: importFn1 },
                    }), result = _a.result, rerender = _a.rerender;
                    // Initially should return PlaceholderIcon while loading
                    expect(result.current.asset).toBeDefined();
                    expect(result.current.asset).not.toBe(mockAsset);
                    // Wait for first asset to load
                    return [4 /*yield*/, (0, react_native_1.waitFor)(function () {
                            expect(result.current.asset).toBe(mockAsset);
                        })];
                case 1:
                    // Wait for first asset to load
                    _b.sent();
                    // Change to different function
                    rerender({ importFn: importFn2 });
                    return [4 /*yield*/, (0, react_native_1.waitFor)(function () {
                            expect(result.current.asset).toBe(mockFallbackAsset);
                        })];
                case 2:
                    _b.sent();
                    expect(result.current.asset).toBe(mockFallbackAsset);
                    return [2 /*return*/];
            }
        });
    }); });
    it('returns PlaceholderIcon while loading', function () {
        // Our Jest mock for PlaceholderIcon exports the component directly (no default)
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        var PlaceholderIcon = require('@components/Icon/PlaceholderIcon');
        var importFn = function () { return new Promise(function () { }); };
        var result = (0, react_native_1.renderHook)(function () { return (0, useLazyAsset_1.useMemoizedLazyAsset)(importFn); }).result;
        expect(result.current.asset).toBe(PlaceholderIcon);
    });
});
