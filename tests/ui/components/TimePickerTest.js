"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var native_1 = require("@react-navigation/native");
var react_native_1 = require("@testing-library/react-native");
var react_1 = require("react");
var TimePicker_1 = require("@src/components/TimePicker/TimePicker");
// Tests currently run against index.ios.ts source, where functions that call
// native code (such as `isFocused` or `setNativeProps`) are not implemented.
// We need to implement them manually since tests are not run on actual devices.
jest.mock('react-native/Libraries/Components/TextInput/TextInput', function () {
    var originalReact = jest.requireActual('react');
    var TextInputMock = originalReact.forwardRef(function (props, ref) {
        var _a = originalReact.useState(false), isFocused = _a[0], setIsFocused = _a[1];
        originalReact.useImperativeHandle(ref, function () {
            return ({
                focus: function () {
                    setIsFocused(true);
                },
                blur: function () {
                    setIsFocused(false);
                },
                isFocused: function () { return isFocused; },
                setNativeProps: function () { },
                props: props,
            });
        }, [isFocused, props]);
        return null;
    });
    return {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        __esModule: true,
        default: TextInputMock,
    };
});
describe('TimePicker Component', function () {
    var renderTimePicker = function (props, ref) {
        if (props === void 0) { props = {}; }
        return (0, react_native_1.render)(<native_1.NavigationContainer>
                <TimePicker_1.default ref={ref} onSubmit={function () { }} 
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...props}/>
            </native_1.NavigationContainer>);
    };
    afterEach(function () {
        jest.clearAllMocks();
    });
    describe('replaces digits with 0 when the backspace button is pressed', function () {
        function pressBackspaceAndExpect(ref, expected) {
            var _a, _b, _c, _d, _e, _f, _g, _h;
            var backspaceBtn = react_native_1.screen.getByTestId('button_<');
            react_native_1.fireEvent.press(backspaceBtn);
            expect((_b = (_a = ref.current) === null || _a === void 0 ? void 0 : _a.hourRef) === null || _b === void 0 ? void 0 : _b.props.value).toBe(expected.hours);
            expect((_d = (_c = ref.current) === null || _c === void 0 ? void 0 : _c.minuteRef) === null || _d === void 0 ? void 0 : _d.props.value).toBe(expected.minutes);
            expect((_f = (_e = ref.current) === null || _e === void 0 ? void 0 : _e.secondRef) === null || _f === void 0 ? void 0 : _f.props.value).toBe(expected.seconds);
            expect((_h = (_g = ref.current) === null || _g === void 0 ? void 0 : _g.millisecondRef) === null || _h === void 0 ? void 0 : _h.props.value).toBe(expected.milliseconds);
        }
        it('when showFullFormat=true', function () {
            var ref = (0, react_1.createRef)();
            renderTimePicker({ defaultValue: '2025-01-01 12:34:56.789 AM', showFullFormat: true }, ref);
            (0, react_1.act)(function () {
                var _a, _b;
                (_b = (_a = ref.current) === null || _a === void 0 ? void 0 : _a.millisecondRef) === null || _b === void 0 ? void 0 : _b.focus();
            });
            var backspaceBtn = react_native_1.screen.getByTestId('button_<');
            // Milliseconds
            pressBackspaceAndExpect(ref, { hours: '12', minutes: '34', seconds: '56', milliseconds: '780' });
            pressBackspaceAndExpect(ref, { hours: '12', minutes: '34', seconds: '56', milliseconds: '700' });
            pressBackspaceAndExpect(ref, { hours: '12', minutes: '34', seconds: '56', milliseconds: '000' });
            react_native_1.fireEvent.press(backspaceBtn); // Skip separator
            // Seconds
            pressBackspaceAndExpect(ref, { hours: '12', minutes: '34', seconds: '50', milliseconds: '000' });
            pressBackspaceAndExpect(ref, { hours: '12', minutes: '34', seconds: '00', milliseconds: '000' });
            react_native_1.fireEvent.press(backspaceBtn); // Skip separator
            // Minutes
            pressBackspaceAndExpect(ref, { hours: '12', minutes: '30', seconds: '00', milliseconds: '000' });
            pressBackspaceAndExpect(ref, { hours: '12', minutes: '00', seconds: '00', milliseconds: '000' });
            react_native_1.fireEvent.press(backspaceBtn); // Skip separator
            // Hours
            pressBackspaceAndExpect(ref, { hours: '10', minutes: '00', seconds: '00', milliseconds: '000' });
            pressBackspaceAndExpect(ref, { hours: '00', minutes: '00', seconds: '00', milliseconds: '000' });
        });
        it('when showFullFormat=false', function () {
            var ref = (0, react_1.createRef)();
            renderTimePicker({ defaultValue: '2025-01-01 12:34 AM', showFullFormat: false }, ref);
            (0, react_1.act)(function () {
                var _a, _b;
                (_b = (_a = ref.current) === null || _a === void 0 ? void 0 : _a.minuteRef) === null || _b === void 0 ? void 0 : _b.focus();
            });
            var backspaceBtn = react_native_1.screen.getByTestId('button_<');
            // Minutes
            pressBackspaceAndExpect(ref, { hours: '12', minutes: '30' });
            pressBackspaceAndExpect(ref, { hours: '12', minutes: '00' });
            react_native_1.fireEvent.press(backspaceBtn); // Skip separator
            // Hours
            pressBackspaceAndExpect(ref, { hours: '10', minutes: '00' });
            pressBackspaceAndExpect(ref, { hours: '00', minutes: '00' });
        });
    });
});
