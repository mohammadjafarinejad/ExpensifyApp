"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_native_1 = require("@testing-library/react-native");
var react_1 = require("react");
var CheckboxWithLabel_1 = require("@src/components/CheckboxWithLabel");
var Text_1 = require("@src/components/Text");
var LABEL = 'Agree to Terms';
describe('CheckboxWithLabel Component', function () {
    var mockOnInputChange = jest.fn();
    var renderCheckboxWithLabel = function (props) {
        if (props === void 0) { props = {}; }
        return (0, react_native_1.render)(<CheckboxWithLabel_1.default label={LABEL} onInputChange={mockOnInputChange} 
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...props}/>);
    };
    afterEach(function () {
        jest.clearAllMocks();
    });
    it('renders the checkbox with label', function () {
        // Given the component is rendered
        renderCheckboxWithLabel();
        // Then the label is displayed
        expect(react_native_1.screen.getByText(LABEL)).toBeOnTheScreen();
    });
    it('calls onInputChange when the checkbox is pressed', function () {
        // Given the component is rendered
        renderCheckboxWithLabel();
        // When the checkbox is pressed
        var checkbox = react_native_1.screen.getByText(LABEL);
        react_native_1.fireEvent.press(checkbox);
        // Then the onInputChange function should be called with 'true' (checked)
        expect(mockOnInputChange).toHaveBeenCalledWith(true);
        // And when the checkbox is pressed again
        react_native_1.fireEvent.press(checkbox);
        // Then the onInputChange function should be called with 'false' (unchecked)
        expect(mockOnInputChange).toHaveBeenCalledWith(false);
    });
    it('displays error message when errorText is provided', function () {
        // Given the component is rendered with an error message
        var errorText = 'This field is required';
        renderCheckboxWithLabel({ errorText: errorText });
        // Then the error message is displayed
        expect(react_native_1.screen.getByText(errorText)).toBeOnTheScreen();
    });
    it('renders custom LabelComponent if provided', function () {
        // Given the component is rendered with a custom LabelComponent
        function MockLabelComponent() {
            return <Text_1.default>Mock Label Component</Text_1.default>;
        }
        renderCheckboxWithLabel({ LabelComponent: MockLabelComponent });
        // Then the custom LabelComponent is displayed
        expect(react_native_1.screen.getByText('Mock Label Component')).toBeOnTheScreen();
    });
    it('is accessible and has the correct accessibility label', function () {
        // Given the component is rendered with an accessibility label
        var accessibilityLabel = 'checkbox-agree-to-terms';
        renderCheckboxWithLabel({ accessibilityLabel: accessibilityLabel });
        // Then the checkbox should be accessible using the provided label
        var checkbox = react_native_1.screen.getByLabelText(accessibilityLabel);
        expect(checkbox).toBeOnTheScreen();
    });
    it('works as controlled component when value prop is provided', function () {
        // Given the component is rendered as controlled with value=false
        var rerender = renderCheckboxWithLabel({ value: false }).rerender;
        // When the checkbox is pressed
        var checkbox = react_native_1.screen.getByText(LABEL);
        react_native_1.fireEvent.press(checkbox);
        // Then onInputChange should be called with true
        expect(mockOnInputChange).toHaveBeenCalledWith(true);
        // When the component is re-rendered with value=true
        rerender(<CheckboxWithLabel_1.default label={LABEL} onInputChange={mockOnInputChange} value/>);
        // And the checkbox is pressed again
        react_native_1.fireEvent.press(checkbox);
        // Then onInputChange should be called with false
        expect(mockOnInputChange).toHaveBeenCalledWith(false);
    });
    it('works as uncontrolled component when value prop is not provided', function () {
        // Given the component is rendered as uncontrolled (no value prop)
        renderCheckboxWithLabel();
        // When the checkbox is pressed
        var checkbox = react_native_1.screen.getByText(LABEL);
        react_native_1.fireEvent.press(checkbox);
        // Then onInputChange should be called with true
        expect(mockOnInputChange).toHaveBeenCalledWith(true);
        // When the checkbox is pressed again
        react_native_1.fireEvent.press(checkbox);
        // Then onInputChange should be called with false
        expect(mockOnInputChange).toHaveBeenCalledWith(false);
    });
    it('maintains correct checked state in controlled mode', function () {
        // Given the component is rendered as controlled with value=true
        var rerender = renderCheckboxWithLabel({ value: true }).rerender;
        // When the checkbox is pressed
        var checkbox = react_native_1.screen.getByText(LABEL);
        react_native_1.fireEvent.press(checkbox);
        // Then onInputChange should be called with false
        expect(mockOnInputChange).toHaveBeenCalledWith(false);
        // When the component is re-rendered with the same value (parent doesn't update)
        rerender(<CheckboxWithLabel_1.default label={LABEL} onInputChange={mockOnInputChange} value/>);
        // And the checkbox is pressed again
        react_native_1.fireEvent.press(checkbox);
        // Then onInputChange should still be called with false (controlled by parent)
        expect(mockOnInputChange).toHaveBeenCalledWith(false);
    });
});
