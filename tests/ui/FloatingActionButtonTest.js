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
var native_1 = require("@react-navigation/native");
var react_native_1 = require("@testing-library/react-native");
var react_1 = require("react");
var FloatingActionButton_1 = require("@components/FloatingActionButton");
var useResponsiveLayout_1 = require("@hooks/useResponsiveLayout");
var colors_1 = require("@styles/theme/colors");
var CONST_1 = require("@src/CONST");
// FloatingActionButton relies on ProductTrainingContext, so provide a minimal mock.
jest.mock('@components/ProductTrainingContext', function () { return ({
    // eslint-disable-next-line @typescript-eslint/naming-convention
    useProductTrainingContext: function () { return ({
        renderProductTrainingTooltip: function () { return null; },
        shouldShowProductTrainingTooltip: false,
        hideProductTrainingTooltip: function () { },
    }); },
}); });
// useResponsiveLayout determines LHB visibility. Mock a wide layout to keep behaviour deterministic.
jest.mock('@hooks/useResponsiveLayout', function () { return jest.fn(); });
var mockedUseResponsiveLayout = useResponsiveLayout_1.default;
// Mock useIsHomeRouteActive to avoid navigation state issues
jest.mock('@navigation/helpers/useIsHomeRouteActive', function () { return function () { return false; }; });
var mockUseAnimatedStyleUpdater;
// Silence react-native-reanimated warnings in Jest
jest.mock('react-native-reanimated', function () {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return __assign(__assign({}, require('react-native-reanimated/mock')), { interpolateColor: function (value, input, output) {
            var inputMax = input[1];
            var colorMin = output[0], colorMax = output[1];
            if (value >= inputMax) {
                return colorMax;
            }
            return colorMin;
        }, useAnimatedStyle: function (updater) {
            mockUseAnimatedStyleUpdater = updater;
            return updater();
        } });
});
describe('FloatingActionButton hover', function () {
    var onPress = jest.fn();
    var renderFAB = function () {
        return (0, react_native_1.render)(<native_1.NavigationContainer>
                <FloatingActionButton_1.default onPress={onPress} isActive={false} accessibilityLabel="fab" role={CONST_1.default.ROLE.BUTTON}/>
            </native_1.NavigationContainer>);
    };
    afterEach(function () {
        (0, react_native_1.cleanup)();
        jest.clearAllMocks();
    });
    beforeAll(function () {
        mockedUseResponsiveLayout.mockReturnValue(__assign(__assign({}, CONST_1.default.NAVIGATION_TESTS.DEFAULT_USE_RESPONSIVE_LAYOUT_VALUE), { shouldUseNarrowLayout: false }));
    });
    it('changes background color on hover', function () {
        renderFAB();
        var fab = react_native_1.screen.getByTestId('floating-action-button');
        // Get the animated container by testID
        var animatedContainer = react_native_1.screen.getByTestId('fab-animated-container');
        // Before hover, should not have successHover background
        expect(animatedContainer).not.toHaveStyle({ backgroundColor: colors_1.default.productDark500 });
        expect(mockUseAnimatedStyleUpdater()).not.toEqual(expect.objectContaining({ backgroundColor: colors_1.default.productDark500 }));
        // Test hover in
        (0, react_native_1.fireEvent)(fab, 'hoverIn');
        expect(mockUseAnimatedStyleUpdater()).toEqual(expect.objectContaining({ backgroundColor: colors_1.default.productDark500 }));
        // Test hover out
        (0, react_native_1.fireEvent)(fab, 'hoverOut');
        expect(mockUseAnimatedStyleUpdater()).not.toEqual(expect.objectContaining({ backgroundColor: colors_1.default.productDark500 }));
    });
    it('should render animated button if LHB is visible', function () {
        renderFAB();
        // Get the animated container by testID
        var animatedContainer = react_native_1.screen.getByTestId('fab-animated-container');
        expect(animatedContainer).toBeVisible();
    });
    it('should render regular button if LHB is not visible', function () {
        mockedUseResponsiveLayout.mockReturnValue(__assign(__assign({}, CONST_1.default.NAVIGATION_TESTS.DEFAULT_USE_RESPONSIVE_LAYOUT_VALUE), { shouldUseNarrowLayout: true }));
        renderFAB();
        // Get the container by testID
        var container = react_native_1.screen.getByTestId('fab-container');
        expect(container).toBeVisible();
    });
});
