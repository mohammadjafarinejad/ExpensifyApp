"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var native_1 = require("@react-navigation/native");
var react_native_1 = require("@testing-library/react-native");
var react_1 = require("react");
var FloatingReceiptButton_1 = require("@components/FloatingReceiptButton");
var colors_1 = require("@styles/theme/colors");
var CONST_1 = require("@src/CONST");
describe('FloatingReceiptButton hover', function () {
    var onPress = jest.fn();
    var renderFAB = function () {
        return (0, react_native_1.render)(<native_1.NavigationContainer>
                <FloatingReceiptButton_1.default onPress={onPress} accessibilityLabel="fab" role={CONST_1.default.ROLE.BUTTON}/>
            </native_1.NavigationContainer>);
    };
    afterEach(function () {
        (0, react_native_1.cleanup)();
        jest.clearAllMocks();
    });
    it('changes background color on hover', function () {
        renderFAB();
        // Get the receipt button by testID
        var frb = react_native_1.screen.getByTestId('floating-receipt-button');
        // Get the container by testID
        var container = react_native_1.screen.getByTestId('floating-receipt-button-container');
        // Before hover, should not have greenHover background
        expect(container).not.toHaveStyle({ backgroundColor: colors_1.default.greenHover });
        // Test hover in
        (0, react_native_1.fireEvent)(frb, 'hoverIn');
        expect(container).toHaveStyle({ backgroundColor: colors_1.default.greenHover });
        // Test hover out
        (0, react_native_1.fireEvent)(frb, 'hoverOut');
        expect(container).not.toHaveStyle({ backgroundColor: colors_1.default.greenHover });
    });
});
