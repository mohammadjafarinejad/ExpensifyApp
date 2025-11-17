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
/* eslint-disable max-classes-per-file */
var core = require("@actions/core");
require("@shopify/flash-list/jestSetup");
require("react-native-gesture-handler/jestSetup");
var __mocks__1 = require("react-native-onyx/dist/storage/__mocks__");
require("setimmediate");
var setupMockFullstoryLib_1 = require("./setupMockFullstoryLib");
var setupMockImages_1 = require("./setupMockImages");
// Needed for tests to have the necessary environment variables set
if (!('GITHUB_REPOSITORY' in process.env)) {
    process.env.GITHUB_REPOSITORY_OWNER = 'Expensify';
    process.env.GITHUB_REPOSITORY = 'Expensify/App';
}
(0, setupMockImages_1.default)();
(0, setupMockFullstoryLib_1.default)();
// This mock is required as per setup instructions for react-navigation testing
// https://reactnavigation.org/docs/testing/#mocking-native-modules
jest.mock('react-native/src/private/animated/NativeAnimatedHelper');
// Mock react-native-onyx storage layer because the SQLite storage layer doesn't work in jest.
// Mocking this file in __mocks__ does not work because jest doesn't support mocking files that are not directly used in the testing project,
// and we only want to mock the storage layer, not the whole Onyx module.
jest.mock('react-native-onyx/dist/storage', function () { return __mocks__1.default; });
// Mock NativeEventEmitter as it is needed to provide mocks of libraries which include it
jest.mock('react-native/Libraries/EventEmitter/NativeEventEmitter');
// Needed for: https://stackoverflow.com/questions/76903168/mocking-libraries-in-jest
jest.mock('react-native/Libraries/LogBox/LogBox', function () { return ({
    // eslint-disable-next-line @typescript-eslint/naming-convention
    __esModule: true,
    default: {
        ignoreLogs: jest.fn(),
        ignoreAllLogs: jest.fn(),
    },
}); });
var isVerbose = process.env.JEST_VERBOSE === 'true';
if (!isVerbose) {
    jest.spyOn(core, 'startGroup').mockImplementation(function () { });
    jest.spyOn(core, 'endGroup').mockImplementation(function () { });
    jest.spyOn(core, 'group').mockImplementation(function (_title, fn) { return fn(); });
    jest.spyOn(core, 'info').mockImplementation(function () { });
    jest.spyOn(core, 'setOutput').mockImplementation(function () { });
    // Make them global to override module-level console calls
    global.console = __assign(__assign({}, console), { log: jest.fn(), info: jest.fn(), debug: jest.fn(), warn: jest.fn() });
}
// This mock is required for mocking file systems when running tests
jest.mock('react-native-fs', function () { return ({
    unlink: jest.fn(function () {
        return new Promise(function (res) {
            res();
        });
    }),
    CachesDirectoryPath: jest.fn(),
}); });
jest.mock('react-native-sound', function () {
    var SoundMock = /** @class */ (function () {
        function SoundMock() {
            this.play = jest.fn();
        }
        return SoundMock;
    }());
    return SoundMock;
});
jest.mock('react-native-share', function () { return ({
    default: jest.fn(),
}); });
jest.mock('react-native-reanimated', function () { return (__assign(__assign({}, jest.requireActual('react-native-reanimated/mock')), { createAnimatedPropAdapter: jest.fn, useReducedMotion: jest.fn, useScrollViewOffset: jest.fn(function () { return 0; }), useAnimatedRef: jest.fn(function () { return jest.fn(); }), LayoutAnimationConfig: jest.fn, makeShareableCloneRecursive: jest.fn })); });
jest.mock('react-native-keyboard-controller', function () { return require('react-native-keyboard-controller/jest'); });
jest.mock('react-native-app-logs', function () { return require('react-native-app-logs/jest'); });
jest.mock('@libs/runOnLiveMarkdownRuntime', function () {
    var runOnLiveMarkdownRuntime = function (worklet) { return worklet; };
    return runOnLiveMarkdownRuntime;
});
jest.mock('@src/libs/actions/Timing', function () { return ({
    start: jest.fn(),
    end: jest.fn(),
    clearData: jest.fn(),
}); });
jest.mock('@src/setup/telemetry', function () { return ({
    // eslint-disable-next-line @typescript-eslint/naming-convention
    __esModule: true,
    default: jest.fn(),
    navigationIntegration: {
        registerNavigationContainer: jest.fn(),
    },
}); });
jest.mock('../modules/background-task/src/NativeReactNativeBackgroundTask', function () { return ({
    defineTask: jest.fn(),
    onBackgroundTaskExecution: jest.fn(),
}); });
jest.mock('../modules/hybrid-app/src/NativeReactNativeHybridApp', function () { return ({
    isHybridApp: jest.fn(),
    closeReactNativeApp: jest.fn(),
    completeOnboarding: jest.fn(),
    switchAccount: jest.fn(),
    clearOldDotAfterSignOut: jest.fn(),
}); });
// Mock lazy asset loading to be synchronous in tests
jest.mock('../src/hooks/useLazyAsset.ts', function () { return ({
    useMemoizedLazyAsset: jest.fn(function () {
        // Return a mock asset immediately to avoid async loading in tests
        var mockAsset = {
            src: 'mock-icon',
            testID: 'mock-asset',
            // Add common icon properties that tests might expect
            height: 20,
            width: 20,
        };
        return {
            asset: mockAsset,
            isLoaded: true,
            isLoading: false,
            hasError: false,
        };
    }),
    useMemoizedLazyIllustrations: jest.fn(function (names) {
        // Return a Record with all requested illustration names
        var mockIllustrations = {};
        names.forEach(function (name) {
            mockIllustrations[name] = {
                src: "mock-".concat(name),
                testID: "mock-illustration-".concat(name),
                height: 20,
                width: 20,
            };
        });
        return mockIllustrations;
    }),
    useMemoizedLazyExpensifyIcons: jest.fn(function (names) {
        // Return a Record with all requested icon names
        var mockIcons = {};
        names.forEach(function (name) {
            mockIcons[name] = {
                src: "mock-".concat(name),
                testID: "mock-expensify-icon-".concat(name),
                height: 20,
                width: 20,
            };
        });
        return mockIcons;
    }),
    default: jest.fn(function () {
        var mockAsset = { src: 'mock-icon', testID: 'mock-asset' };
        return {
            asset: mockAsset,
            isLoaded: true,
            isLoading: false,
            hasError: false,
        };
    }),
}); });
// Mock icon loading functions to resolve immediately
jest.mock('../src/components/Icon/ExpensifyIconLoader.ts', function () { return ({
    loadExpensifyIcon: jest.fn(function (iconName) {
        var mockIcon = {
            src: "mock-".concat(iconName),
            testID: "mock-icon-".concat(iconName),
            height: 20,
            width: 20,
        };
        return Promise.resolve({ default: mockIcon });
    }),
}); });
jest.mock('@components/InvertedFlatList/BaseInvertedFlatList/RenderTaskQueue', function () {
    return /** @class */ (function () {
        function SyncRenderTaskQueue() {
            this.handler = function () { };
        }
        SyncRenderTaskQueue.prototype.add = function (info) {
            this.handler(info);
        };
        SyncRenderTaskQueue.prototype.setHandler = function (handler) {
            this.handler = handler;
        };
        SyncRenderTaskQueue.prototype.cancel = function () { };
        return SyncRenderTaskQueue;
    }());
});
jest.mock('@libs/prepareRequestPayload/index.native.ts', function () { return ({
    // eslint-disable-next-line @typescript-eslint/naming-convention
    __esModule: true,
    default: jest.fn(function (command, data) {
        var formData = new FormData();
        Object.keys(data).forEach(function (key) {
            var value = data[key];
            if (value === undefined) {
                return;
            }
            formData.append(key, value);
        });
        return Promise.resolve(formData);
    }),
}); });
// This keeps the error "@rnmapbox/maps native code not available." from causing the tests to fail
jest.mock('@components/ConfirmedRoute.tsx');
jest.mock('@src/hooks/useWorkletStateMachine/executeOnUIRuntimeSync', function () { return ({
    // eslint-disable-next-line @typescript-eslint/naming-convention
    __esModule: true,
    default: jest.fn(function () { return jest.fn(); }), // Return a function that returns a function
}); });
jest.mock('react-native-nitro-sqlite', function () { return ({
    open: jest.fn(),
}); });
// Provide a default global fetch mock for tests that do not explicitly set it up
// This avoids ReferenceError: fetch is not defined in CI when coverage is enabled
var globalWithOptionalFetch = globalThis;
if (typeof globalWithOptionalFetch.fetch !== 'function') {
    var mockResponse_1 = {
        ok: true,
        status: 200,
        statusText: 'OK',
        headers: { get: function () { return null; } },
        // Return a minimal shape our code expects
        json: function () { return Promise.resolve({ jsonCode: 200 }); },
    };
    Object.defineProperty(globalWithOptionalFetch, 'fetch', {
        value: jest.fn(function () { return Promise.resolve(mockResponse_1); }),
        writable: true,
        configurable: true,
    });
}
