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
var react_native_onyx_1 = require("react-native-onyx");
var OnyxListItemProvider_1 = require("@components/OnyxListItemProvider");
var BaseTwoFactorAuthForm_1 = require("@pages/settings/Security/TwoFactorAuth/TwoFactorAuthForm/BaseTwoFactorAuthForm");
var Session_1 = require("@userActions/Session");
var ONYXKEYS_1 = require("@src/ONYXKEYS");
var waitForBatchedUpdates_1 = require("../utils/waitForBatchedUpdates");
jest.mock('@react-navigation/native', function () {
    var actualNav = jest.requireActual('@react-navigation/native');
    return __assign(__assign({}, actualNav), { useFocusEffect: function (callback) {
            callback();
        } });
});
jest.mock('@hooks/useLocalize', function () {
    return jest.fn(function () { return ({
        translate: jest.fn(function (key) {
            switch (key) {
                case 'recoveryCodeForm.useRecoveryCode':
                    return 'Use recovery code';
                case 'recoveryCodeForm.use2fa':
                    return 'Use two-factor authentication code';
                case 'recoveryCodeForm.error.pleaseFillRecoveryCode':
                    return 'Please enter your recovery code';
                case 'twoFactorAuthForm.error.pleaseFillTwoFactorAuth':
                    return 'Please enter your two-factor authentication code';
                case 'twoFactorAuthForm.error.incorrect2fa':
                    return 'Incorrect two-factor authentication code. Please try again.';
                case 'twoFactorAuth.explainProcessToRemove':
                    return 'In order to disable two-factor authentication (2FA), please enter a valid code from your authentication app.';
                case 'twoFactorAuth.explainProcessToRemoveWithRecovery':
                    return 'In order to disable two-factor authentication (2FA), please enter a valid recovery code.';
                default:
                    return key;
            }
        }),
        numberFormat: jest.fn(),
    }); });
});
jest.mock('@userActions/Session', function () { return ({
    toggleTwoFactorAuth: jest.fn(),
    validateTwoFactorAuth: jest.fn(),
}); });
var mockToggleTwoFactorAuth = Session_1.toggleTwoFactorAuth;
var mockValidateTwoFactorAuth = Session_1.validateTwoFactorAuth;
var RECOVERY_TOGGLE_LABEL = 'Use recovery code';
var RECOVERY_BACK_LABEL = 'Use two-factor authentication code';
var RECOVERY_ERROR_TEXT = 'Please enter your recovery code';
var TWO_FACTOR_ERROR_TEXT = 'Please enter your two-factor authentication code';
var AUTH_HELP_TEXT = 'In order to disable two-factor authentication (2FA), please enter a valid code from your authentication app.';
var RECOVERY_HELP_TEXT = 'In order to disable two-factor authentication (2FA), please enter a valid recovery code.';
var renderForm = function () {
    var formRef = (0, react_1.createRef)();
    (0, react_native_1.render)(<OnyxListItemProvider_1.default>
            <BaseTwoFactorAuthForm_1.default ref={formRef} autoComplete="one-time-code" validateInsteadOfDisable={false} shouldAutoFocusOnMobile={false}/>
        </OnyxListItemProvider_1.default>);
    return { formRef: formRef };
};
describe('BaseTwoFactorAuthForm', function () {
    beforeAll(function () {
        react_native_onyx_1.default.init({ keys: ONYXKEYS_1.default });
    });
    beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    jest.clearAllMocks();
                    return [4 /*yield*/, react_native_onyx_1.default.set(ONYXKEYS_1.default.ACCOUNT, {
                            requiresTwoFactorAuth: true,
                            errors: null,
                            isLoading: false,
                            errorFields: {},
                        })];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, (0, waitForBatchedUpdates_1.default)()];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('submits the two-factor authenticator code when provided', function () {
        var formRef = renderForm().formRef;
        expect(react_native_1.screen.getByText(AUTH_HELP_TEXT)).toBeTruthy();
        var authenticatorInput = react_native_1.screen.getByTestId('twoFactorAuthCodeInput');
        react_native_1.fireEvent.changeText(authenticatorInput, '123456');
        (0, react_native_1.act)(function () {
            var _a;
            (_a = formRef.current) === null || _a === void 0 ? void 0 : _a.validateAndSubmitForm();
        });
        expect(mockValidateTwoFactorAuth).not.toHaveBeenCalled();
        expect(mockToggleTwoFactorAuth).toHaveBeenCalledWith(false, '123456');
    });
    it('allows submitting a recovery code after toggling inputs', function () { return __awaiter(void 0, void 0, void 0, function () {
        var formRef, recoveryInput;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    formRef = renderForm().formRef;
                    react_native_1.fireEvent.press(react_native_1.screen.getByText(RECOVERY_TOGGLE_LABEL));
                    return [4 /*yield*/, react_native_1.screen.findByTestId('recoveryCodeInput')];
                case 1:
                    recoveryInput = _a.sent();
                    expect(react_native_1.screen.getByText(RECOVERY_HELP_TEXT)).toBeTruthy();
                    react_native_1.fireEvent.changeText(recoveryInput, 'abc12345');
                    (0, react_native_1.act)(function () {
                        var _a;
                        (_a = formRef.current) === null || _a === void 0 ? void 0 : _a.validateAndSubmitForm();
                    });
                    expect(mockToggleTwoFactorAuth).toHaveBeenLastCalledWith(false, 'abc12345');
                    return [2 /*return*/];
            }
        });
    }); });
    it('validates empty authenticator codes and clears the error when switching to recovery mode', function () { return __awaiter(void 0, void 0, void 0, function () {
        var formRef;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    formRef = renderForm().formRef;
                    (0, react_native_1.act)(function () {
                        var _a;
                        (_a = formRef.current) === null || _a === void 0 ? void 0 : _a.validateAndSubmitForm();
                    });
                    expect(react_native_1.screen.getByText(TWO_FACTOR_ERROR_TEXT)).toBeTruthy();
                    react_native_1.fireEvent.press(react_native_1.screen.getByText(RECOVERY_TOGGLE_LABEL));
                    return [4 /*yield*/, react_native_1.screen.findByTestId('recoveryCodeInput')];
                case 1:
                    _a.sent();
                    expect(react_native_1.screen.queryByText(TWO_FACTOR_ERROR_TEXT)).toBeNull();
                    expect(react_native_1.screen.getByText(RECOVERY_HELP_TEXT)).toBeTruthy();
                    return [2 /*return*/];
            }
        });
    }); });
    it('shows validation feedback when recovery code is missing', function () { return __awaiter(void 0, void 0, void 0, function () {
        var formRef;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    formRef = renderForm().formRef;
                    react_native_1.fireEvent.press(react_native_1.screen.getByText(RECOVERY_TOGGLE_LABEL));
                    return [4 /*yield*/, react_native_1.screen.findByTestId('recoveryCodeInput')];
                case 1:
                    _a.sent();
                    (0, react_native_1.act)(function () {
                        var _a;
                        (_a = formRef.current) === null || _a === void 0 ? void 0 : _a.validateAndSubmitForm();
                    });
                    return [4 /*yield*/, (0, react_native_1.waitFor)(function () {
                            expect(react_native_1.screen.getByText(RECOVERY_ERROR_TEXT)).toBeTruthy();
                        })];
                case 2:
                    _a.sent();
                    expect(mockToggleTwoFactorAuth).not.toHaveBeenCalled();
                    // Switch back to authenticator mode to ensure toggle works in both directions.
                    react_native_1.fireEvent.press(react_native_1.screen.getByText(RECOVERY_BACK_LABEL));
                    expect(react_native_1.screen.queryByTestId('recoveryCodeInput')).toBeNull();
                    expect(react_native_1.screen.getByTestId('twoFactorAuthCodeInput')).toBeTruthy();
                    expect(react_native_1.screen.queryByText(RECOVERY_ERROR_TEXT)).toBeNull();
                    expect(react_native_1.screen.getByText(AUTH_HELP_TEXT)).toBeTruthy();
                    return [2 /*return*/];
            }
        });
    }); });
});
