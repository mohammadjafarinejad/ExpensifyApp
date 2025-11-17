"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_native_1 = require("@testing-library/react-native");
var react_1 = require("react");
var ReceiptAlternativeMethods_1 = require("@components/ReceiptAlternativeMethods");
var useHasLoggedIntoMobileApp_1 = require("@hooks/useHasLoggedIntoMobileApp");
var useHasPhoneNumberLogin_1 = require("@hooks/useHasPhoneNumberLogin");
var CONST_1 = require("@src/CONST");
jest.mock('@hooks/useHasLoggedIntoMobileApp');
jest.mock('@hooks/useHasPhoneNumberLogin');
jest.mock('@components/RenderHTML', function () {
    var ReactMock = require('react');
    var Text = require('react-native').Text;
    return function (_a) {
        var html = _a.html;
        var plainText = html.replace(/<[^>]*>/g, '');
        return ReactMock.createElement(Text, null, plainText);
    };
});
jest.mock('@hooks/useEnvironment', function () { return jest.fn(function () { return ({ environmentURL: 'https://new.expensify.com' }); }); });
jest.mock('@hooks/useTheme', function () { return jest.fn(function () { return ({ textSupporting: '#123456' }); }); });
jest.mock('@hooks/useThemeStyles', function () {
    return jest.fn(function () { return ({
        mt2: {},
        ph0: {},
        mh0: {},
        textLabelSupporting: {},
        mb3: {},
        textAlignCenter: {},
        alignSelfStretch: {},
        alignItemsStart: {},
        flexRow: {},
        alignItemsCenter: {},
        mr3: {},
        textBlue: {},
        flex1: {},
        flexWrap: {},
        mb0: {},
    }); });
});
jest.mock('@hooks/useLocalize', function () {
    return jest.fn(function () { return ({
        translate: function (key, params) {
            var translations = {};
            translations['receipt.alternativeMethodsTitle'] = 'Other ways to add receipts:';
            translations['receipt.alternativeMethodsDownloadApp'] = 'Download the app to scan from your phone';
            translations['receipt.alternativeMethodsForwardReceipts'] = function (_a) {
                var _b = _a === void 0 ? {} : _a, email = _b.email;
                return "Forward receipts to ".concat(email);
            };
            translations['receipt.alternativeMethodsAddPhoneNumber'] = function (_a) {
                var _b = _a === void 0 ? {} : _a, phoneNumber = _b.phoneNumber;
                return "Add your number to text receipts to ".concat(phoneNumber);
            };
            translations['receipt.alternativeMethodsTextReceipts'] = function (_a) {
                var _b = _a === void 0 ? {} : _a, phoneNumber = _b.phoneNumber;
                return "Text receipts to ".concat(phoneNumber, " (US numbers only)");
            };
            var translation = translations[key];
            if (typeof translation === 'function') {
                return translation(params);
            }
            if (typeof translation === 'string') {
                return translation;
            }
            return key;
        },
    }); });
});
var mockUseHasLoggedIntoMobileApp = useHasLoggedIntoMobileApp_1.default;
var mockUseHasPhoneNumberLogin = useHasPhoneNumberLogin_1.default;
describe('ReceiptAlternativeMethods', function () {
    afterEach(function () {
        (0, react_native_1.cleanup)();
        jest.clearAllMocks();
    });
    it('renders all options when user has neither app nor phone number', function () {
        mockUseHasLoggedIntoMobileApp.mockReturnValue({ hasLoggedIntoMobileApp: false, isLastMobileAppLoginLoaded: true });
        mockUseHasPhoneNumberLogin.mockReturnValue({ hasPhoneNumberLogin: false, isPhoneNumberLoaded: true });
        (0, react_native_1.render)(<ReceiptAlternativeMethods_1.default />);
        expect(react_native_1.screen.getByText('Other ways to add receipts:')).toBeTruthy();
        expect(react_native_1.screen.getByText('Download the app to scan from your phone')).toBeTruthy();
        expect(react_native_1.screen.getByText("Forward receipts to ".concat(CONST_1.default.EMAIL.RECEIPTS))).toBeTruthy();
        expect(react_native_1.screen.getByText("Add your number to text receipts to ".concat(CONST_1.default.SMS.RECEIPTS_PHONE_NUMBER))).toBeTruthy();
        expect(react_native_1.screen.queryByText("Text receipts to ".concat(CONST_1.default.SMS.RECEIPTS_PHONE_NUMBER, " (US numbers only)"))).toBeNull();
    });
    it('shows add number option when user has app but no phone number', function () {
        mockUseHasLoggedIntoMobileApp.mockReturnValue({ hasLoggedIntoMobileApp: true, isLastMobileAppLoginLoaded: true });
        mockUseHasPhoneNumberLogin.mockReturnValue({ hasPhoneNumberLogin: false, isPhoneNumberLoaded: true });
        (0, react_native_1.render)(<ReceiptAlternativeMethods_1.default />);
        expect(react_native_1.screen.queryByText('Download the app to scan from your phone')).toBeNull();
        expect(react_native_1.screen.getByText("Add your number to text receipts to ".concat(CONST_1.default.SMS.RECEIPTS_PHONE_NUMBER))).toBeTruthy();
        expect(react_native_1.screen.queryByText("Text receipts to ".concat(CONST_1.default.SMS.RECEIPTS_PHONE_NUMBER, " (US numbers only)"))).toBeNull();
    });
    it('shows SMS instructions when user has phone but no app login', function () {
        mockUseHasLoggedIntoMobileApp.mockReturnValue({ hasLoggedIntoMobileApp: false, isLastMobileAppLoginLoaded: true });
        mockUseHasPhoneNumberLogin.mockReturnValue({ hasPhoneNumberLogin: true, isPhoneNumberLoaded: true });
        (0, react_native_1.render)(<ReceiptAlternativeMethods_1.default />);
        expect(react_native_1.screen.getByText('Download the app to scan from your phone')).toBeTruthy();
        expect(react_native_1.screen.getByText("Text receipts to ".concat(CONST_1.default.SMS.RECEIPTS_PHONE_NUMBER, " (US numbers only)"))).toBeTruthy();
        expect(react_native_1.screen.queryByText('Add your number')).toBeNull();
    });
    it('shows minimal options when user has both app and phone number', function () {
        mockUseHasLoggedIntoMobileApp.mockReturnValue({ hasLoggedIntoMobileApp: true, isLastMobileAppLoginLoaded: true });
        mockUseHasPhoneNumberLogin.mockReturnValue({ hasPhoneNumberLogin: true, isPhoneNumberLoaded: true });
        (0, react_native_1.render)(<ReceiptAlternativeMethods_1.default />);
        expect(react_native_1.screen.queryByText('Download the app to scan from your phone')).toBeNull();
        expect(react_native_1.screen.queryByText('Add your number')).toBeNull();
        expect(react_native_1.screen.getByText("Text receipts to ".concat(CONST_1.default.SMS.RECEIPTS_PHONE_NUMBER, " (US numbers only)"))).toBeTruthy();
    });
    it('does not render until hooks have loaded', function () {
        mockUseHasLoggedIntoMobileApp.mockReturnValue({ hasLoggedIntoMobileApp: false, isLastMobileAppLoginLoaded: false });
        mockUseHasPhoneNumberLogin.mockReturnValue({ hasPhoneNumberLogin: false, isPhoneNumberLoaded: false });
        var toJSON = (0, react_native_1.render)(<ReceiptAlternativeMethods_1.default />).toJSON;
        expect(toJSON()).toBeNull();
    });
});
