"use strict";
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
var EnvironmentContext_1 = require("@components/EnvironmentContext");
var CONST_1 = require("@src/CONST");
// Mock getEnvironment and getEnvironmentURL
var mockGetEnvironment = jest.fn();
var mockGetEnvironmentURL = jest.fn();
jest.mock('@libs/Environment/getEnvironment', function () { return ({
    // eslint-disable-next-line @typescript-eslint/naming-convention
    __esModule: true,
    default: jest.fn(function () { return mockGetEnvironment(); }),
}); });
jest.mock('@libs/Environment/Environment', function () { return ({
    getEnvironmentURL: jest.fn().mockImplementation(function () { return mockGetEnvironmentURL(); }),
}); });
describe('EnvironmentProvider', function () {
    describe('adjustExpensifyLinksForEnv', function () {
        var adjustExpensifyLinksForEnv;
        var setupTest = function (environment, environmentURL) { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        // Assign mock implementations
                        mockGetEnvironment.mockReset().mockResolvedValue(environment);
                        mockGetEnvironmentURL.mockReset().mockResolvedValue(environmentURL);
                        (0, react_native_1.render)(<EnvironmentContext_1.EnvironmentProvider>
                    <EnvironmentContext_1.EnvironmentContext.Consumer>
                        {function (_a) {
                                var fn = _a.adjustExpensifyLinksForEnv;
                                adjustExpensifyLinksForEnv = fn;
                                return null;
                            }}
                    </EnvironmentContext_1.EnvironmentContext.Consumer>
                </EnvironmentContext_1.EnvironmentProvider>);
                        // Wait for useEffect to resolve mocked promises
                        return [4 /*yield*/, (0, react_native_1.waitFor)(function () {
                                expect(mockGetEnvironment).toHaveBeenCalled();
                                // eslint-disable-next-line testing-library/no-wait-for-multiple-assertions
                                expect(mockGetEnvironmentURL).toHaveBeenCalled();
                            })];
                    case 1:
                        // Wait for useEffect to resolve mocked promises
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); };
        beforeEach(function () {
            jest.clearAllMocks();
            mockGetEnvironment.mockReset();
            mockGetEnvironmentURL.mockReset();
        });
        it('should not modify URLs in production environment', function () { return __awaiter(void 0, void 0, void 0, function () {
            var inputHtml, expectedOutput;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, setupTest(CONST_1.default.ENVIRONMENT.PRODUCTION, CONST_1.default.NEW_EXPENSIFY_URL)];
                    case 1:
                        _a.sent();
                        inputHtml = '<a href="https://new.expensify.com/workspaces/123/more-features">More Features</a>';
                        expectedOutput = '<a href="https://new.expensify.com/workspaces/123/more-features">More Features</a>';
                        expect(adjustExpensifyLinksForEnv(inputHtml)).toBe(expectedOutput);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should replace new.expensify.com with staging environment URL', function () { return __awaiter(void 0, void 0, void 0, function () {
            var inputHtml, expectedOutput;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, setupTest(CONST_1.default.ENVIRONMENT.STAGING, 'https://staging.new.expensify.com')];
                    case 1:
                        _a.sent();
                        inputHtml = '<a href="https://new.expensify.com/workspaces/123/more-features">More Features</a>';
                        expectedOutput = '<a href="https://staging.new.expensify.com/workspaces/123/more-features">More Features</a>';
                        expect(adjustExpensifyLinksForEnv(inputHtml)).toBe(expectedOutput);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should replace new.expensify.com with dev environment URL', function () { return __awaiter(void 0, void 0, void 0, function () {
            var inputHtml, expectedOutput;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, setupTest(CONST_1.default.ENVIRONMENT.DEV, 'https://dev.new.expensify.com')];
                    case 1:
                        _a.sent();
                        inputHtml = '<a href="https://new.expensify.com/workspaces/123/more-features">More Features</a>';
                        expectedOutput = '<a href="https://dev.new.expensify.com/workspaces/123/more-features">More Features</a>';
                        expect(adjustExpensifyLinksForEnv(inputHtml)).toBe(expectedOutput);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should handle multiple links in the HTML', function () { return __awaiter(void 0, void 0, void 0, function () {
            var inputHtml, expectedOutput;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, setupTest(CONST_1.default.ENVIRONMENT.STAGING, 'https://staging.new.expensify.com')];
                    case 1:
                        _a.sent();
                        inputHtml = '<a href="https://new.expensify.com/settings">Settings</a><a href="https://new.expensify.com/profile">Profile</a>';
                        expectedOutput = '<a href="https://staging.new.expensify.com/settings">Settings</a><a href="https://staging.new.expensify.com/profile">Profile</a>';
                        expect(adjustExpensifyLinksForEnv(inputHtml)).toBe(expectedOutput);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should not modify non-expensify URLs', function () { return __awaiter(void 0, void 0, void 0, function () {
            var inputHtml;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, setupTest(CONST_1.default.ENVIRONMENT.STAGING, 'https://staging.new.expensify.com')];
                    case 1:
                        _a.sent();
                        inputHtml = '<a href="https://example.com">Example</a>';
                        expect(adjustExpensifyLinksForEnv(inputHtml)).toBe(inputHtml);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should handle empty HTML string', function () { return __awaiter(void 0, void 0, void 0, function () {
            var inputHtml;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, setupTest(CONST_1.default.ENVIRONMENT.STAGING, 'https://staging.new.expensify.com')];
                    case 1:
                        _a.sent();
                        inputHtml = '';
                        expect(adjustExpensifyLinksForEnv(inputHtml)).toBe('');
                        return [2 /*return*/];
                }
            });
        }); });
        it('should handle HTML without href attributes', function () { return __awaiter(void 0, void 0, void 0, function () {
            var inputHtml;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, setupTest(CONST_1.default.ENVIRONMENT.STAGING, 'https://staging.new.expensify.com')];
                    case 1:
                        _a.sent();
                        inputHtml = '<a>Link without href</a>';
                        expect(adjustExpensifyLinksForEnv(inputHtml)).toBe(inputHtml);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should handle complex HTML with mixed content', function () { return __awaiter(void 0, void 0, void 0, function () {
            var inputHtml, expectedOutput;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, setupTest(CONST_1.default.ENVIRONMENT.DEV, 'https://dev.new.expensify.com')];
                    case 1:
                        _a.sent();
                        inputHtml = '<p>Visit <a href="https://new.expensify.com/workspaces/123/more-features">More Features</a> and <a href="https://example.com">Example</a></p>';
                        expectedOutput = '<p>Visit <a href="https://dev.new.expensify.com/workspaces/123/more-features">More Features</a> and <a href="https://example.com">Example</a></p>';
                        expect(adjustExpensifyLinksForEnv(inputHtml)).toBe(expectedOutput);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should preserve additional attributes in anchor tags', function () { return __awaiter(void 0, void 0, void 0, function () {
            var inputHtml, expectedOutput;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, setupTest(CONST_1.default.ENVIRONMENT.STAGING, 'https://staging.new.expensify.com')];
                    case 1:
                        _a.sent();
                        inputHtml = '<a class="link" href="https://new.expensify.com/workspaces/123/more-features" target="_blank">More Features</a>';
                        expectedOutput = '<a class="link" href="https://staging.new.expensify.com/workspaces/123/more-features" target="_blank">More Features</a>';
                        expect(adjustExpensifyLinksForEnv(inputHtml)).toBe(expectedOutput);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should handle URLs with query parameters', function () { return __awaiter(void 0, void 0, void 0, function () {
            var inputHtml, expectedOutput;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, setupTest(CONST_1.default.ENVIRONMENT.DEV, 'https://dev.new.expensify.com')];
                    case 1:
                        _a.sent();
                        inputHtml = '<a href="https://new.expensify.com/workspaces/123/more-features?param=value">More Features</a>';
                        expectedOutput = '<a href="https://dev.new.expensify.com/workspaces/123/more-features?param=value">More Features</a>';
                        expect(adjustExpensifyLinksForEnv(inputHtml)).toBe(expectedOutput);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should handle partial HTML with a single Expensify link', function () { return __awaiter(void 0, void 0, void 0, function () {
            var inputHtml, expectedOutput;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, setupTest(CONST_1.default.ENVIRONMENT.STAGING, 'https://staging.new.expensify.com')];
                    case 1:
                        _a.sent();
                        inputHtml = 'Read up on <a href="https://new.expensify.com/help">Expensify Help</a> to find out more.';
                        expectedOutput = 'Read up on <a href="https://staging.new.expensify.com/help">Expensify Help</a> to find out more.';
                        expect(adjustExpensifyLinksForEnv(inputHtml)).toBe(expectedOutput);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should handle partial HTML with multiple Expensify links', function () { return __awaiter(void 0, void 0, void 0, function () {
            var inputHtml, expectedOutput;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, setupTest(CONST_1.default.ENVIRONMENT.DEV, 'https://dev.new.expensify.com')];
                    case 1:
                        _a.sent();
                        inputHtml = 'Check <a href="https://new.expensify.com/help">Help</a> or <a href="https://new.expensify.com/support">Support</a>.';
                        expectedOutput = 'Check <a href="https://dev.new.expensify.com/help">Help</a> or <a href="https://dev.new.expensify.com/support">Support</a>.';
                        expect(adjustExpensifyLinksForEnv(inputHtml)).toBe(expectedOutput);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should handle partial HTML with mixed Expensify and non-Expensify links', function () { return __awaiter(void 0, void 0, void 0, function () {
            var inputHtml, expectedOutput;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, setupTest(CONST_1.default.ENVIRONMENT.STAGING, 'https://staging.new.expensify.com')];
                    case 1:
                        _a.sent();
                        inputHtml = 'Visit <a href="https://new.expensify.com/help">Expensify Help</a> or <a href="https://example.com">Example</a> for more info.';
                        expectedOutput = 'Visit <a href="https://staging.new.expensify.com/help">Expensify Help</a> or <a href="https://example.com">Example</a> for more info.';
                        expect(adjustExpensifyLinksForEnv(inputHtml)).toBe(expectedOutput);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should handle partial HTML with no HTML tags', function () { return __awaiter(void 0, void 0, void 0, function () {
            var inputHtml;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, setupTest(CONST_1.default.ENVIRONMENT.DEV, 'https://dev.new.expensify.com')];
                    case 1:
                        _a.sent();
                        inputHtml = 'Just text with no links or tags.';
                        expect(adjustExpensifyLinksForEnv(inputHtml)).toBe(inputHtml);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should handle partial HTML with incomplete anchor tags', function () { return __awaiter(void 0, void 0, void 0, function () {
            var inputHtml, expectedOutput;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, setupTest(CONST_1.default.ENVIRONMENT.STAGING, 'https://staging.new.expensify.com')];
                    case 1:
                        _a.sent();
                        inputHtml = 'Link: <a href="https://new.expensify.com/help">Help</a> and <a>broken link</a>.';
                        expectedOutput = 'Link: <a href="https://staging.new.expensify.com/help">Help</a> and <a>broken link</a>.';
                        expect(adjustExpensifyLinksForEnv(inputHtml)).toBe(expectedOutput);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should not modify custom tags like <mention-user /> or <emoji>', function () { return __awaiter(void 0, void 0, void 0, function () {
            var inputHtml, expectedOutput;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, setupTest(CONST_1.default.ENVIRONMENT.STAGING, 'https://staging.new.expensify.com')];
                    case 1:
                        _a.sent();
                        inputHtml = '<mention-user accountID="20565304"/><emoji ismedium>😃</emoji><a href="https://new.expensify.com/help">Help</a>';
                        expectedOutput = '<mention-user accountID="20565304"/><emoji ismedium>😃</emoji><a href="https://staging.new.expensify.com/help">Help</a>';
                        expect(adjustExpensifyLinksForEnv(inputHtml)).toBe(expectedOutput);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should not modify HTML without any href attributes', function () { return __awaiter(void 0, void 0, void 0, function () {
            var inputHtml;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, setupTest(CONST_1.default.ENVIRONMENT.DEV, 'https://dev.new.expensify.com')];
                    case 1:
                        _a.sent();
                        inputHtml = '<p>No links here</p><div><span>Just text</span></div>';
                        expect(adjustExpensifyLinksForEnv(inputHtml)).toBe(inputHtml);
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
