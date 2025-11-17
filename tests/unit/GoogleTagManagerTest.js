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
var native_1 = require("@react-navigation/native");
var react_native_1 = require("@testing-library/react-native");
var react_native_onyx_1 = require("react-native-onyx");
var IOU_1 = require("@libs/actions/IOU");
var PaymentMethods_1 = require("@libs/actions/PaymentMethods");
var Policy_1 = require("@libs/actions/Policy/Policy");
var GoogleTagManager_1 = require("@libs/GoogleTagManager");
var OnboardingModalNavigator_1 = require("@libs/Navigation/AppNavigator/Navigators/OnboardingModalNavigator");
var navigationRef_1 = require("@libs/Navigation/navigationRef");
var SubscriptionUtils_1 = require("@libs/SubscriptionUtils");
var CONST_1 = require("@src/CONST");
var ONYXKEYS_1 = require("@src/ONYXKEYS");
var waitForBatchedUpdatesWithAct_1 = require("../utils/waitForBatchedUpdatesWithAct");
jest.mock('@libs/GoogleTagManager');
// Mock the Overlay since it doesn't work in tests
jest.mock('@libs/Navigation/AppNavigator/Navigators/Overlay');
jest.mock('@src/components/ConfirmedRoute.tsx');
// Mock navigation ref to prevent navigation errors
jest.mock('@libs/Navigation/navigationRef', function () { return ({
    // eslint-disable-next-line @typescript-eslint/naming-convention
    __esModule: true,
    default: {
        getRootState: jest.fn(function () { return ({
            routes: [
                {
                    name: 'Main',
                    state: {
                        routes: [
                            {
                                name: 'Home',
                                params: {},
                            },
                        ],
                        index: 0,
                    },
                },
            ],
            index: 0,
        }); }),
        resetRoot: jest.fn(),
        navigate: jest.fn(),
        addListener: jest.fn(),
        isReady: jest.fn(function () { return true; }),
        getCurrentRoute: jest.fn(function () { return ({ name: 'Home' }); }),
    },
}); });
// Mock react-navigation/native to prevent navigation errors
jest.mock('@react-navigation/native', function () {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    var actualNav = jest.requireActual('@react-navigation/native');
    return __assign(__assign({}, actualNav), { useNavigationState: function () { return true; }, useRoute: jest.fn(), useFocusEffect: jest.fn(), useIsFocused: function () { return true; }, useNavigation: function () { return ({
            navigate: jest.fn(),
            addListener: jest.fn(),
        }); }, createNavigationContainerRef: jest.fn(), createNavigatorFactory: jest.fn(function () { return jest.fn(); }) });
});
// Mock react-navigation/stack to prevent navigation errors
jest.mock('@react-navigation/stack', function () { return ({
    createStackNavigator: jest.fn(function () {
        var Stack = {
            Navigator: function (_a) {
                var children = _a.children;
                return children;
            },
            Screen: function (_a) {
                var children = _a.children;
                return children;
            },
        };
        return Stack;
    }),
    CardStyleInterpolators: {
        forHorizontalIOS: jest.fn(),
        forVerticalIOS: jest.fn(),
        forModalPresentationIOS: jest.fn(),
        forFadeFromBottomAndroid: jest.fn(),
        forRevealFromBottomAndroid: jest.fn(),
        forScaleFromCenterAndroid: jest.fn(),
        forNoAnimation: jest.fn(),
    },
}); });
// Mock createPlatformStackNavigator
jest.mock('@libs/Navigation/PlatformStackNavigation/createPlatformStackNavigator', function () {
    return jest.fn(function () {
        var Stack = {
            Navigator: function (_a) {
                var children = _a.children;
                return children;
            },
            Screen: function (_a) {
                var children = _a.children;
                return children;
            },
        };
        return Stack;
    });
});
var FUND_LIST = {
    defaultCard: {
        isDefault: true,
        accountData: {
            cardYear: new Date().getFullYear(),
            cardMonth: new Date().getMonth() + 1,
            additionalData: {
                isBillingCard: true,
            },
        },
    },
};
describe('GoogleTagManagerTest', function () {
    var accountID = 123456;
    beforeAll(function () {
        react_native_onyx_1.default.init({
            keys: ONYXKEYS_1.default,
            initialKeyStates: {
                session: { accountID: accountID },
            },
        });
    });
    beforeEach(function () {
        jest.clearAllMocks();
    });
    test('sign_up', function () { return __awaiter(void 0, void 0, void 0, function () {
        var rerender;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    rerender = (0, react_native_1.render)(<native_1.NavigationContainer ref={navigationRef_1.default}>
                <OnboardingModalNavigator_1.default />
            </native_1.NavigationContainer>).rerender;
                    rerender(<native_1.NavigationContainer ref={navigationRef_1.default}>
                <OnboardingModalNavigator_1.default />
            </native_1.NavigationContainer>);
                    rerender(<native_1.NavigationContainer ref={navigationRef_1.default}>
                <OnboardingModalNavigator_1.default />
            </native_1.NavigationContainer>);
                    return [4 /*yield*/, (0, waitForBatchedUpdatesWithAct_1.default)()];
                case 1:
                    _a.sent();
                    // Then we publish the sign_up event only once
                    expect(GoogleTagManager_1.default.publishEvent).toHaveBeenCalledTimes(1);
                    expect(GoogleTagManager_1.default.publishEvent).toHaveBeenCalledWith(CONST_1.default.ANALYTICS.EVENT.SIGN_UP, accountID);
                    return [2 /*return*/];
            }
        });
    }); });
    test('workspace_created', function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    // When we run the createWorkspace action a few times
                    (0, Policy_1.createWorkspace)({});
                    return [4 /*yield*/, (0, waitForBatchedUpdatesWithAct_1.default)()];
                case 1:
                    _a.sent();
                    (0, Policy_1.createWorkspace)({});
                    return [4 /*yield*/, (0, waitForBatchedUpdatesWithAct_1.default)()];
                case 2:
                    _a.sent();
                    (0, Policy_1.createWorkspace)({});
                    return [4 /*yield*/, (0, waitForBatchedUpdatesWithAct_1.default)()];
                case 3:
                    _a.sent();
                    // Then we publish a workspace_created event only once
                    expect(GoogleTagManager_1.default.publishEvent).toHaveBeenCalledTimes(1);
                    expect(GoogleTagManager_1.default.publishEvent).toHaveBeenCalledWith(CONST_1.default.ANALYTICS.EVENT.WORKSPACE_CREATED, accountID);
                    return [2 /*return*/];
            }
        });
    }); });
    test('workspace_created - categorizeTrackedExpense', function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    (0, IOU_1.trackExpense)({
                        report: { reportID: '123' },
                        isDraftPolicy: true,
                        action: CONST_1.default.IOU.ACTION.CATEGORIZE,
                        participantParams: {
                            payeeEmail: undefined,
                            payeeAccountID: 0,
                            participant: { accountID: accountID },
                        },
                        transactionParams: {
                            amount: 1000,
                            currency: 'USD',
                            created: '2024-10-30',
                            merchant: 'merchant',
                            comment: 'comment',
                            category: 'category',
                            tag: 'tag',
                            taxCode: 'taxCode',
                            actionableWhisperReportActionID: 'actionableWhisperReportActionID',
                            linkedTrackedExpenseReportAction: { actionName: 'IOU', reportActionID: 'linkedTrackedExpenseReportAction', created: '2024-10-30' },
                            linkedTrackedExpenseReportID: 'linkedTrackedExpenseReportID',
                        },
                        isASAPSubmitBetaEnabled: false,
                    });
                    return [4 /*yield*/, (0, waitForBatchedUpdatesWithAct_1.default)()];
                case 1:
                    _a.sent();
                    // Then we publish a workspace_created event only once
                    expect(GoogleTagManager_1.default.publishEvent).toHaveBeenCalledTimes(1);
                    expect(GoogleTagManager_1.default.publishEvent).toHaveBeenCalledWith('workspace_created', accountID);
                    return [2 /*return*/];
            }
        });
    }); });
    test('paid_adoption - addPaymentCard', function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    // When we add a payment card
                    (0, PaymentMethods_1.addPaymentCard)(accountID, {
                        expirationDate: '2077-10-30',
                        addressZipCode: 'addressZipCode',
                        cardNumber: 'cardNumber',
                        nameOnCard: 'nameOnCard',
                        securityCode: 'securityCode',
                    });
                    return [4 /*yield*/, (0, waitForBatchedUpdatesWithAct_1.default)()];
                case 1:
                    _a.sent();
                    // Then we publish a paid_adoption event only once
                    expect(GoogleTagManager_1.default.publishEvent).toHaveBeenCalledTimes(1);
                    expect(GoogleTagManager_1.default.publishEvent).toHaveBeenCalledWith(CONST_1.default.ANALYTICS.EVENT.PAID_ADOPTION, accountID);
                    return [2 /*return*/];
            }
        });
    }); });
    test('paid_adoption - addSubscriptionPaymentCard', function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    // When we add a payment card
                    (0, PaymentMethods_1.addSubscriptionPaymentCard)(accountID, {
                        cardNumber: 'cardNumber',
                        cardYear: 'cardYear',
                        cardMonth: 'cardMonth',
                        cardCVV: 'cardCVV',
                        addressName: 'addressName',
                        addressZip: 'addressZip',
                        currency: 'USD',
                    });
                    return [4 /*yield*/, (0, waitForBatchedUpdatesWithAct_1.default)()];
                case 1:
                    _a.sent();
                    // Then we publish a paid_adoption event only once
                    expect(GoogleTagManager_1.default.publishEvent).toHaveBeenCalledTimes(1);
                    expect(GoogleTagManager_1.default.publishEvent).toHaveBeenCalledWith(CONST_1.default.ANALYTICS.EVENT.PAID_ADOPTION, accountID);
                    return [2 /*return*/];
            }
        });
    }); });
    it('addSubscriptionPaymentCard when changing payment card, will not publish event paid_adoption', function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, react_native_1.act)(function () { return __awaiter(void 0, void 0, void 0, function () {
                        var _a;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0: return [4 /*yield*/, react_native_onyx_1.default.multiSet((_a = {},
                                        _a[ONYXKEYS_1.default.FUND_LIST] = FUND_LIST,
                                        _a))];
                                case 1:
                                    _b.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }); })];
                case 1:
                    _a.sent();
                    (0, PaymentMethods_1.addSubscriptionPaymentCard)(accountID, {
                        cardNumber: 'cardNumber',
                        cardYear: 'cardYear',
                        cardMonth: 'cardMonth',
                        cardCVV: 'cardCVV',
                        addressName: 'addressName',
                        addressZip: 'addressZip',
                        currency: 'USD',
                    });
                    return [4 /*yield*/, (0, waitForBatchedUpdatesWithAct_1.default)()];
                case 2:
                    _a.sent();
                    expect(!!(0, SubscriptionUtils_1.getCardForSubscriptionBilling)()).toBe(true);
                    expect(GoogleTagManager_1.default.publishEvent).toHaveBeenCalledTimes(0);
                    return [2 /*return*/];
            }
        });
    }); });
});
