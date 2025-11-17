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
var globals_1 = require("@jest/globals");
var react_native_1 = require("@testing-library/react-native");
var useResponsiveLayout_1 = require("@hooks/useResponsiveLayout");
var getIsNarrowLayout_1 = require("@libs/getIsNarrowLayout");
var CONST_1 = require("@src/CONST");
var Navigation_1 = require("@src/libs/Navigation/Navigation");
var navigationRef_1 = require("@src/libs/Navigation/navigationRef");
var NAVIGATORS_1 = require("@src/NAVIGATORS");
var SCREENS_1 = require("@src/SCREENS");
var TestNavigationContainer_1 = require("../utils/TestNavigationContainer");
jest.mock('@hooks/useResponsiveLayout', function () { return jest.fn(); });
jest.mock('@libs/getIsNarrowLayout', function () { return jest.fn(); });
jest.mock('@pages/home/sidebar/NavigationTabBarAvatar');
jest.mock('@src/components/Navigation/TopLevelNavigationTabBar');
var mockedGetIsNarrowLayout = getIsNarrowLayout_1.default;
var mockedUseResponsiveLayout = useResponsiveLayout_1.default;
(0, globals_1.describe)('Navigation', function () {
    afterEach(function () {
        // Ensure mounted components are unmounted
        (0, react_native_1.cleanup)();
        // Clear timers and restore real timers (in case fake timers are used anywhere)
        jest.clearAllTimers();
        jest.useRealTimers();
        // Reset any mocks used by this file
        jest.restoreAllMocks();
        jest.resetModules();
        // Clear the navigation ref so listeners/hooks attached to it don't keep the worker alive.
        // This is intentionally type-unsafe to forcibly drop the ref between tests.
        if (navigationRef_1.default.current) {
            navigationRef_1.default.current = null;
        }
    });
    beforeEach(function () {
        mockedGetIsNarrowLayout.mockReturnValue(true);
        mockedUseResponsiveLayout.mockReturnValue(__assign(__assign({}, CONST_1.default.NAVIGATION_TESTS.DEFAULT_USE_RESPONSIVE_LAYOUT_VALUE), { shouldUseNarrowLayout: true }));
    });
    it('Should correctly identify active routes', function () {
        // Given current active route is "/settings/profile?backTo=settings%2profile"
        (0, react_native_1.render)(<TestNavigationContainer_1.default initialState={{
                index: 0,
                routes: [
                    {
                        name: NAVIGATORS_1.default.SETTINGS_SPLIT_NAVIGATOR,
                        state: {
                            index: 1,
                            routes: [
                                {
                                    name: SCREENS_1.default.SETTINGS.ROOT,
                                },
                                {
                                    name: SCREENS_1.default.SETTINGS.PROFILE.ROOT,
                                    params: {
                                        backTo: 'settings/profile',
                                    },
                                },
                            ],
                        },
                    },
                ],
            }}/>);
        (0, globals_1.expect)(Navigation_1.default.isActiveRoute('settings/profile')).toBe(true);
        (0, globals_1.expect)(Navigation_1.default.isActiveRoute('settings/profile/')).toBe(true);
        (0, globals_1.expect)(Navigation_1.default.isActiveRoute('settings/profile?param=1')).toBe(true);
        (0, globals_1.expect)(Navigation_1.default.isActiveRoute('settings/profile/display-name')).toBe(false);
        (0, globals_1.expect)(Navigation_1.default.isActiveRoute('settings/profile/display-name/')).toBe(false);
        (0, globals_1.expect)(Navigation_1.default.isActiveRoute('settings/preferences')).toBe(false);
        (0, globals_1.expect)(Navigation_1.default.isActiveRoute('settings/preferences/')).toBe(false);
        (0, globals_1.expect)(Navigation_1.default.isActiveRoute('report')).toBe(false);
        (0, globals_1.expect)(Navigation_1.default.isActiveRoute('report/123/')).toBe(false);
        (0, globals_1.expect)(Navigation_1.default.isActiveRoute('report/123')).toBe(false);
    });
});
