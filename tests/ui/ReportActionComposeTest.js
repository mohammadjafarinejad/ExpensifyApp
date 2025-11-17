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
var ComposeProviders_1 = require("@components/ComposeProviders");
var LocaleContextProvider_1 = require("@components/LocaleContextProvider");
var OnyxListItemProvider_1 = require("@components/OnyxListItemProvider");
var ComponentUtils_1 = require("@libs/ComponentUtils");
var ReportActionCompose_1 = require("@pages/home/report/ReportActionCompose/ReportActionCompose");
var CONST_1 = require("@src/CONST");
var ONYXKEYS_1 = require("@src/ONYXKEYS");
var LHNTestUtils = require("../utils/LHNTestUtils");
var TestHelper = require("../utils/TestHelper");
var waitForBatchedUpdatesWithAct_1 = require("../utils/waitForBatchedUpdatesWithAct");
var mockForceClearInput = jest.mocked(ComponentUtils_1.forceClearInput);
jest.mock('@libs/ComponentUtils', function () { return ({
    forceClearInput: jest.fn(),
}); });
jest.mock('@hooks/useLocalize', function () {
    return jest.fn(function () { return ({
        translate: jest.fn(function (key) { return key; }),
        numberFormat: jest.fn(function (num) { return num.toString(); }),
    }); });
});
jest.mock('@react-navigation/native', function () { return (__assign(__assign({}, (function () {
    return jest.requireActual('@react-navigation/native');
})()), { useNavigation: jest.fn(function () { return ({
        navigate: jest.fn(),
        addListener: jest.fn(function () { return jest.fn(); }),
    }); }), useIsFocused: jest.fn(function () { return true; }), useRoute: jest.fn(function () { return ({ key: '', name: '', params: { reportID: '1' } }); }) })); });
TestHelper.setupGlobalFetchMock();
var defaultReport = LHNTestUtils.getFakeReport();
var defaultProps = {
    onSubmit: jest.fn(),
    isComposerFullSize: false,
    reportID: defaultReport.reportID,
    report: defaultReport,
};
var renderReportActionCompose = function (props) {
    return (0, react_native_1.render)(<ComposeProviders_1.default components={[OnyxListItemProvider_1.default, LocaleContextProvider_1.LocaleContextProvider]}>
            <ReportActionCompose_1.default 
    // eslint-disable-next-line react/jsx-props-no-spreading
    {...defaultProps} 
    // eslint-disable-next-line react/jsx-props-no-spreading
    {...props}/>
        </ComposeProviders_1.default>);
};
// Helper function to simulate text selection
var simulateSelection = function (composer, start, end) {
    (0, react_native_1.fireEvent)(composer, 'selectionChange', {
        nativeEvent: { selection: { start: start, end: end } },
    });
};
describe('ReportActionCompose Integration Tests', function () {
    beforeAll(function () {
        react_native_onyx_1.default.init({
            keys: ONYXKEYS_1.default,
            evictableKeys: [ONYXKEYS_1.default.COLLECTION.REPORT_ACTIONS],
        });
    });
    afterEach(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, react_native_1.act)(function () { return __awaiter(void 0, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, react_native_onyx_1.default.clear()];
                                case 1:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }); })];
                case 1:
                    _a.sent();
                    jest.clearAllMocks();
                    return [2 /*return*/];
            }
        });
    }); });
    describe('Paste Behavior with Selection updateComment logic', function () {
        it('should format pasted URL as Markdown link when text is selected', function () { return __awaiter(void 0, void 0, void 0, function () {
            var unmount, composer;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        unmount = renderReportActionCompose().unmount;
                        return [4 /*yield*/, (0, waitForBatchedUpdatesWithAct_1.default)()];
                    case 1:
                        _a.sent();
                        composer = react_native_1.screen.getByTestId('composer');
                        react_native_1.fireEvent.changeText(composer, 'Selected text');
                        simulateSelection(composer, 0, 8);
                        react_native_1.fireEvent.changeText(composer, 'https://example.com');
                        return [4 /*yield*/, (0, react_native_1.waitFor)(function () {
                                expect(react_native_1.screen.getByTestId('composer').props.value).toBe('[Selected](https://example.com) text');
                            })];
                    case 2:
                        _a.sent();
                        unmount();
                        return [4 /*yield*/, (0, waitForBatchedUpdatesWithAct_1.default)()];
                    case 3:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('should insert raw URL when no text is selected', function () { return __awaiter(void 0, void 0, void 0, function () {
            var unmount, composer;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        unmount = renderReportActionCompose().unmount;
                        return [4 /*yield*/, (0, waitForBatchedUpdatesWithAct_1.default)()];
                    case 1:
                        _a.sent();
                        composer = react_native_1.screen.getByTestId('composer');
                        react_native_1.fireEvent.changeText(composer, '');
                        react_native_1.fireEvent.changeText(composer, 'https://example.com');
                        return [4 /*yield*/, (0, react_native_1.waitFor)(function () {
                                expect(react_native_1.screen.getByTestId('composer').props.value).toBe('https://example.com');
                            })];
                    case 2:
                        _a.sent();
                        unmount();
                        return [4 /*yield*/, (0, waitForBatchedUpdatesWithAct_1.default)()];
                    case 3:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('should insert raw text when non-URL text is pasted', function () { return __awaiter(void 0, void 0, void 0, function () {
            var unmount, composer, prevText, pastedText, merged;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        unmount = renderReportActionCompose().unmount;
                        return [4 /*yield*/, (0, waitForBatchedUpdatesWithAct_1.default)()];
                    case 1:
                        _a.sent();
                        composer = react_native_1.screen.getByTestId('composer');
                        react_native_1.fireEvent.changeText(composer, 'what you do');
                        simulateSelection(composer, 0, 4);
                        prevText = 'what you do';
                        pastedText = 'Hello world';
                        merged = prevText.slice(0, 0) + pastedText + prevText.slice(4);
                        react_native_1.fireEvent.changeText(composer, merged);
                        return [4 /*yield*/, (0, react_native_1.waitFor)(function () {
                                expect(react_native_1.screen.getByTestId('composer').props.value).toBe('Hello world you do');
                            })];
                    case 2:
                        _a.sent();
                        unmount();
                        return [4 /*yield*/, (0, waitForBatchedUpdatesWithAct_1.default)()];
                    case 3:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('should format pasted URL as Markdown link when replacing entire selected text', function () { return __awaiter(void 0, void 0, void 0, function () {
            var unmount, composer;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        unmount = renderReportActionCompose().unmount;
                        return [4 /*yield*/, (0, waitForBatchedUpdatesWithAct_1.default)()];
                    case 1:
                        _a.sent();
                        composer = react_native_1.screen.getByTestId('composer');
                        react_native_1.fireEvent.changeText(composer, 'Selected text');
                        simulateSelection(composer, 0, 13);
                        react_native_1.fireEvent.changeText(composer, 'https://example.com');
                        return [4 /*yield*/, (0, react_native_1.waitFor)(function () {
                                expect(react_native_1.screen.getByTestId('composer').props.value).toBe('[Selected text](https://example.com)');
                            })];
                    case 2:
                        _a.sent();
                        unmount();
                        return [4 /*yield*/, (0, waitForBatchedUpdatesWithAct_1.default)()];
                    case 3:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('should insert raw URL with emoji when pasted with selection', function () { return __awaiter(void 0, void 0, void 0, function () {
            var unmount, composer, prevText, pastedText, merged;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        unmount = renderReportActionCompose().unmount;
                        return [4 /*yield*/, (0, waitForBatchedUpdatesWithAct_1.default)()];
                    case 1:
                        _a.sent();
                        composer = react_native_1.screen.getByTestId('composer');
                        prevText = 'Emoji text 😀';
                        react_native_1.fireEvent.changeText(composer, prevText);
                        simulateSelection(composer, 0, 5);
                        pastedText = 'https://example.com 😀';
                        merged = prevText.slice(0, 0) + pastedText + prevText.slice(5);
                        react_native_1.fireEvent.changeText(composer, merged);
                        return [4 /*yield*/, (0, react_native_1.waitFor)(function () {
                                expect(react_native_1.screen.getByTestId('composer').props.value).toBe(merged);
                            })];
                    case 2:
                        _a.sent();
                        unmount();
                        return [4 /*yield*/, (0, waitForBatchedUpdatesWithAct_1.default)()];
                    case 3:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('should format pasted URL as Markdown link when selected text contains square brackets', function () { return __awaiter(void 0, void 0, void 0, function () {
            var unmount, composer;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        unmount = renderReportActionCompose().unmount;
                        return [4 /*yield*/, (0, waitForBatchedUpdatesWithAct_1.default)()];
                    case 1:
                        _a.sent();
                        composer = react_native_1.screen.getByTestId('composer');
                        react_native_1.fireEvent.changeText(composer, 'Select]ed[ text');
                        simulateSelection(composer, 0, 15);
                        react_native_1.fireEvent.changeText(composer, 'https://example.com');
                        return [4 /*yield*/, (0, react_native_1.waitFor)(function () {
                                expect(react_native_1.screen.getByTestId('composer').props.value).toBe('[Select&#93;ed&#91; text](https://example.com)');
                            })];
                    case 2:
                        _a.sent();
                        unmount();
                        return [4 /*yield*/, (0, waitForBatchedUpdatesWithAct_1.default)()];
                    case 3:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('should format pasted URL as Markdown link when selected text contains parentheses', function () { return __awaiter(void 0, void 0, void 0, function () {
            var unmount, composer;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        unmount = renderReportActionCompose().unmount;
                        return [4 /*yield*/, (0, waitForBatchedUpdatesWithAct_1.default)()];
                    case 1:
                        _a.sent();
                        composer = react_native_1.screen.getByTestId('composer');
                        react_native_1.fireEvent.changeText(composer, 'Selected () text');
                        simulateSelection(composer, 0, 16);
                        react_native_1.fireEvent.changeText(composer, 'https://example.com');
                        return [4 /*yield*/, (0, react_native_1.waitFor)(function () {
                                expect(react_native_1.screen.getByTestId('composer').props.value).toBe('[Selected () text](https://example.com)');
                            })];
                    case 2:
                        _a.sent();
                        unmount();
                        return [4 /*yield*/, (0, waitForBatchedUpdatesWithAct_1.default)()];
                    case 3:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('should format pasted URL as Markdown link when selected text contains curly braces', function () { return __awaiter(void 0, void 0, void 0, function () {
            var unmount, composer;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        unmount = renderReportActionCompose().unmount;
                        return [4 /*yield*/, (0, waitForBatchedUpdatesWithAct_1.default)()];
                    case 1:
                        _a.sent();
                        composer = react_native_1.screen.getByTestId('composer');
                        react_native_1.fireEvent.changeText(composer, 'Selec}ted {text');
                        simulateSelection(composer, 0, 15);
                        react_native_1.fireEvent.changeText(composer, 'https://example.com');
                        return [4 /*yield*/, (0, react_native_1.waitFor)(function () {
                                expect(react_native_1.screen.getByTestId('composer').props.value).toBe('[Selec}ted {text](https://example.com)');
                            })];
                    case 2:
                        _a.sent();
                        unmount();
                        return [4 /*yield*/, (0, waitForBatchedUpdatesWithAct_1.default)()];
                    case 3:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('Message validation', function () {
        it('should send when length is within the limit', function () { return __awaiter(void 0, void 0, void 0, function () {
            var composer, validMessage;
            return __generator(this, function (_a) {
                renderReportActionCompose();
                composer = react_native_1.screen.getByTestId('composer');
                validMessage = 'x'.repeat(CONST_1.default.MAX_COMMENT_LENGTH);
                react_native_1.fireEvent.changeText(composer, validMessage);
                // When the message is submitted
                (0, react_native_1.act)(ReportActionCompose_1.onSubmitAction);
                // Then the message should be sent
                expect(mockForceClearInput).toHaveBeenCalledTimes(1);
                return [2 /*return*/];
            });
        }); });
        it('should not send when length exceeds the limit', function () { return __awaiter(void 0, void 0, void 0, function () {
            var composer, invalidMessage;
            return __generator(this, function (_a) {
                renderReportActionCompose();
                composer = react_native_1.screen.getByTestId('composer');
                invalidMessage = 'x'.repeat(CONST_1.default.MAX_COMMENT_LENGTH + 1);
                react_native_1.fireEvent.changeText(composer, invalidMessage);
                // When the message is submitted
                (0, react_native_1.act)(ReportActionCompose_1.onSubmitAction);
                // Then the message should NOT be sent
                expect(mockForceClearInput).toHaveBeenCalledTimes(0);
                // And the error should be displayed
                expect(react_native_1.screen.getByText('composer.commentExceededMaxLength')).toBeOnTheScreen();
                return [2 /*return*/];
            });
        }); });
    });
});
