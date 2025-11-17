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
/* eslint-disable @typescript-eslint/naming-convention */
var native_1 = require("@react-navigation/native");
var react_native_1 = require("@testing-library/react-native");
var react_1 = require("react");
var react_native_onyx_1 = require("react-native-onyx");
var ComposeProviders_1 = require("@components/ComposeProviders");
var HTMLEngineProvider_1 = require("@components/HTMLEngineProvider");
var LocaleContextProvider_1 = require("@components/LocaleContextProvider");
var types_1 = require("@libs/API/types");
var CurrencyUtils_1 = require("@libs/CurrencyUtils");
var createPlatformStackNavigator_1 = require("@libs/Navigation/PlatformStackNavigation/createPlatformStackNavigator");
var SequentialQueue_1 = require("@libs/Network/SequentialQueue");
var WorkspaceUpgradePage_1 = require("@pages/workspace/upgrade/WorkspaceUpgradePage");
var CONST_1 = require("@src/CONST");
var ONYXKEYS_1 = require("@src/ONYXKEYS");
var SCREENS_1 = require("@src/SCREENS");
var LHNTestUtils = require("../utils/LHNTestUtils");
var TestHelper = require("../utils/TestHelper");
var waitForBatchedUpdates_1 = require("../utils/waitForBatchedUpdates");
var waitForBatchedUpdatesWithAct_1 = require("../utils/waitForBatchedUpdatesWithAct");
jest.mock('@components/RenderHTML', function () {
    var ReactMock = require('react');
    var Text = require('react-native').Text;
    return function (_a) {
        var html = _a.html;
        var plainText = html.replace(/<[^>]*>/g, '');
        return ReactMock.createElement(Text, null, plainText);
    };
});
TestHelper.setupGlobalFetchMock();
var Stack = (0, createPlatformStackNavigator_1.default)();
var renderPage = function (initialRouteName, initialParams) {
    return (0, react_native_1.render)(<ComposeProviders_1.default components={[LocaleContextProvider_1.LocaleContextProvider, HTMLEngineProvider_1.default]}>
            <native_1.NavigationContainer>
                <Stack.Navigator initialRouteName={initialRouteName}>
                    <Stack.Screen name={SCREENS_1.default.WORKSPACE.UPGRADE} component={WorkspaceUpgradePage_1.default} initialParams={initialParams}/>
                </Stack.Navigator>
            </native_1.NavigationContainer>
        </ComposeProviders_1.default>);
};
describe('WorkspaceUpgrade', function () {
    beforeAll(function () {
        react_native_onyx_1.default.init({
            keys: ONYXKEYS_1.default,
        });
    });
    afterEach(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, SequentialQueue_1.waitForIdle)()];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, (0, react_native_1.act)(function () { return __awaiter(void 0, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, react_native_onyx_1.default.clear()];
                                    case 1:
                                        _a.sent();
                                        return [2 /*return*/];
                                }
                            });
                        }); })];
                case 2:
                    _a.sent();
                    jest.clearAllMocks();
                    return [2 /*return*/];
            }
        });
    }); });
    it('should enable policy rules', function () { return __awaiter(void 0, void 0, void 0, function () {
        var policy, unmount;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    policy = LHNTestUtils.getFakePolicy();
                    // Given that a policy is initialized in Onyx
                    return [4 /*yield*/, (0, react_native_1.act)(function () { return __awaiter(void 0, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, react_native_onyx_1.default.merge("".concat(ONYXKEYS_1.default.COLLECTION.POLICY).concat(policy.id), policy)];
                                    case 1:
                                        _a.sent();
                                        return [2 /*return*/];
                                }
                            });
                        }); })];
                case 1:
                    // Given that a policy is initialized in Onyx
                    _a.sent();
                    unmount = renderPage(SCREENS_1.default.WORKSPACE.UPGRADE, { policyID: policy.id, featureName: 'rules' }).unmount;
                    // When the policy is upgraded by clicking on the Upgrade button
                    react_native_1.fireEvent.press(react_native_1.screen.getByTestId('upgrade-button'));
                    return [4 /*yield*/, (0, waitForBatchedUpdatesWithAct_1.default)()];
                case 2:
                    _a.sent();
                    // Then "Upgrade to Corporate" API request should be made
                    TestHelper.expectAPICommandToHaveBeenCalled(types_1.WRITE_COMMANDS.UPGRADE_TO_CORPORATE, 1);
                    // When WorkspaceUpgradePage is unmounted
                    unmount();
                    return [4 /*yield*/, (0, waitForBatchedUpdates_1.default)()];
                case 3:
                    _a.sent();
                    // Then "Set policy rules enabled" API request should be made
                    TestHelper.expectAPICommandToHaveBeenCalled(types_1.WRITE_COMMANDS.SET_POLICY_RULES_ENABLED, 1);
                    return [2 /*return*/];
            }
        });
    }); });
    it("should show the upgrade corporate plan price is in the user's local currency", function () { return __awaiter(void 0, void 0, void 0, function () {
        var policy, expectedPrice, _a, _loop_1, _i, _b, currency;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    policy = LHNTestUtils.getFakePolicy();
                    // Given that a policy is initialized in Onyx
                    return [4 /*yield*/, (0, react_native_1.act)(function () { return __awaiter(void 0, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, react_native_onyx_1.default.merge("".concat(ONYXKEYS_1.default.COLLECTION.POLICY).concat(policy.id), policy)];
                                    case 1:
                                        _a.sent();
                                        return [2 /*return*/];
                                }
                            });
                        }); })];
                case 1:
                    // Given that a policy is initialized in Onyx
                    _c.sent();
                    // Render the WorkspaceUpgradePage without initializing user's preferred currency
                    renderPage(SCREENS_1.default.WORKSPACE.UPGRADE, { policyID: policy.id });
                    return [4 /*yield*/, (0, waitForBatchedUpdatesWithAct_1.default)()];
                case 2:
                    _c.sent();
                    expectedPrice = (0, CurrencyUtils_1.convertToShortDisplayString)(CONST_1.default.SUBSCRIPTION_PRICES[CONST_1.default.PAYMENT_CARD_CURRENCY.USD][CONST_1.default.POLICY.TYPE.CORPORATE][CONST_1.default.SUBSCRIPTION.TYPE.ANNUAL], CONST_1.default.PAYMENT_CARD_CURRENCY.USD);
                    _a = expect;
                    return [4 /*yield*/, react_native_1.screen.findByText(expectedPrice, { exact: false })];
                case 3:
                    _a.apply(void 0, [_c.sent()]).toBeTruthy();
                    _loop_1 = function (currency) {
                        var price, _d, unmount, _e;
                        return __generator(this, function (_f) {
                            switch (_f.label) {
                                case 0:
                                    price = (0, CurrencyUtils_1.convertToShortDisplayString)(CONST_1.default.SUBSCRIPTION_PRICES[currency][CONST_1.default.POLICY.TYPE.CORPORATE][CONST_1.default.SUBSCRIPTION.TYPE.ANNUAL], currency);
                                    // Initialized the user's preferred currency to another payment card currency
                                    return [4 /*yield*/, (0, react_native_1.act)(function () { return __awaiter(void 0, void 0, void 0, function () {
                                            var _a;
                                            return __generator(this, function (_b) {
                                                switch (_b.label) {
                                                    case 0: return [4 /*yield*/, react_native_onyx_1.default.merge(ONYXKEYS_1.default.PERSONAL_DETAILS_LIST, (_a = {}, _a[CONST_1.default.DEFAULT_NUMBER_ID] = { localCurrencyCode: currency }, _a))];
                                                    case 1:
                                                        _b.sent();
                                                        return [2 /*return*/];
                                                }
                                            });
                                        }); })];
                                case 1:
                                    // Initialized the user's preferred currency to another payment card currency
                                    _f.sent();
                                    // Render the WorkspaceUpgradePage without a feature to render GenericFeaturesView
                                    renderPage(SCREENS_1.default.WORKSPACE.UPGRADE, { policyID: policy.id });
                                    return [4 /*yield*/, (0, waitForBatchedUpdatesWithAct_1.default)()];
                                case 2:
                                    _f.sent();
                                    _d = expect;
                                    return [4 /*yield*/, react_native_1.screen.findByText(price, { exact: false })];
                                case 3:
                                    _d.apply(void 0, [_f.sent()]).toBeTruthy();
                                    unmount = renderPage(SCREENS_1.default.WORKSPACE.UPGRADE, { policyID: policy.id, featureName: 'rules' }).unmount;
                                    return [4 /*yield*/, (0, waitForBatchedUpdatesWithAct_1.default)()];
                                case 4:
                                    _f.sent();
                                    _e = expect;
                                    return [4 /*yield*/, react_native_1.screen.findByText(price, { exact: false })];
                                case 5:
                                    _e.apply(void 0, [_f.sent()]).toBeTruthy();
                                    unmount();
                                    return [2 /*return*/];
                            }
                        });
                    };
                    _i = 0, _b = Object.values(CONST_1.default.PAYMENT_CARD_CURRENCY);
                    _c.label = 4;
                case 4:
                    if (!(_i < _b.length)) return [3 /*break*/, 7];
                    currency = _b[_i];
                    return [5 /*yield**/, _loop_1(currency)];
                case 5:
                    _c.sent();
                    _c.label = 6;
                case 6:
                    _i++;
                    return [3 /*break*/, 4];
                case 7: return [4 /*yield*/, (0, waitForBatchedUpdates_1.default)()];
                case 8:
                    _c.sent();
                    return [2 /*return*/];
            }
        });
    }); });
});
