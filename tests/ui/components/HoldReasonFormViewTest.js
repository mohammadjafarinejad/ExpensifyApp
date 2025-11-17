"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_native_1 = require("@testing-library/react-native");
var react_1 = require("react");
var LocaleContextProvider_1 = require("@components/LocaleContextProvider");
var HoldReasonFormView_1 = require("@pages/iou/HoldReasonFormView");
var TestHelper_1 = require("../../utils/TestHelper");
jest.mock('@src/hooks/useResponsiveLayout');
jest.mock('@react-navigation/native', function () { return ({
    createNavigationContainerRef: jest.fn(),
    useIsFocused: function () { return true; },
    useNavigation: function () { return ({ navigate: jest.fn(), addListener: jest.fn(), goBack: jest.fn() }); },
    useFocusEffect: jest.fn(),
    usePreventRemove: jest.fn(),
}); });
describe('HoldReasonFormView', function () {
    var onSubmit = jest.fn();
    var validate = jest.fn();
    var backTo = '';
    it('renders singular copy when one expense is selected', function () {
        (0, react_native_1.render)(<LocaleContextProvider_1.LocaleContextProvider>
                <HoldReasonFormView_1.default onSubmit={onSubmit} validate={validate} backTo={backTo} expenseCount={1}/>
            </LocaleContextProvider_1.LocaleContextProvider>);
        expect(react_native_1.screen.getByText((0, TestHelper_1.translateLocal)('iou.explainHold', { count: 1 }))).toBeTruthy();
        var holdExpenseElements = react_native_1.screen.getAllByText((0, TestHelper_1.translateLocal)('iou.holdExpense', { count: 1 }));
        expect(holdExpenseElements.length).toBeGreaterThanOrEqual(2); // Title and button
    });
    it('renders plural copy when multiple expenses are selected', function () {
        (0, react_native_1.render)(<LocaleContextProvider_1.LocaleContextProvider>
                <HoldReasonFormView_1.default onSubmit={onSubmit} validate={validate} backTo={backTo} expenseCount={2}/>
            </LocaleContextProvider_1.LocaleContextProvider>);
        expect(react_native_1.screen.getByText((0, TestHelper_1.translateLocal)('iou.explainHold', { count: 2 }))).toBeTruthy();
        var holdExpenseElements = react_native_1.screen.getAllByText((0, TestHelper_1.translateLocal)('iou.holdExpense', { count: 2 }));
        expect(holdExpenseElements.length).toBeGreaterThanOrEqual(2); // Title and button
    });
});
