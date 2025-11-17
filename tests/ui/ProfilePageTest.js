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
var portal_1 = require("@gorhom/portal");
var native_1 = require("@react-navigation/native");
var react_native_1 = require("@testing-library/react-native");
var react_1 = require("react");
var react_native_onyx_1 = require("react-native-onyx");
var ComposeProviders_1 = require("@components/ComposeProviders");
var DelegateNoAccessModalProvider_1 = require("@components/DelegateNoAccessModalProvider");
var LocaleContextProvider_1 = require("@components/LocaleContextProvider");
var OnyxListItemProvider_1 = require("@components/OnyxListItemProvider");
var useCurrentReportID_1 = require("@hooks/useCurrentReportID");
var Navigation_1 = require("@libs/Navigation/Navigation");
var createPlatformStackNavigator_1 = require("@libs/Navigation/PlatformStackNavigation/createPlatformStackNavigator");
var ProfilePage_1 = require("@pages/settings/Profile/ProfilePage");
var ONYXKEYS_1 = require("@src/ONYXKEYS");
var SCREENS_1 = require("@src/SCREENS");
var TestHelper = require("../utils/TestHelper");
var waitForBatchedUpdates_1 = require("../utils/waitForBatchedUpdates");
var waitForBatchedUpdatesWithAct_1 = require("../utils/waitForBatchedUpdatesWithAct");
jest.mock('@libs/Navigation/Navigation', function () { return ({
    navigate: jest.fn(),
    goBack: jest.fn(),
    getActiveRoute: jest.fn(function () { return ''; }),
    getShouldPopToSidebar: jest.fn(function () { return false; }),
    popToSidebar: jest.fn(),
}); });
jest.mock('@react-navigation/native', function () {
    var actualNav = jest.requireActual('@react-navigation/native');
    return __assign(__assign({}, actualNav), { useRoute: jest.fn(), createNavigationContainerRef: function () { return ({
            getState: function () { return jest.fn(); },
        }); }, usePreventRemove: jest.fn() });
});
jest.mock('@components/Icon/Illustrations');
// Replace MenuItemWithTopDescription with a simple test double that exposes props in the tree
jest.mock('@components/MenuItemWithTopDescription', function () {
    var ReactMock = require('react');
    var Text = require('react-native').Text;
    return function (_a) {
        var pressableTestID = _a.pressableTestID, brickRoadIndicator = _a.brickRoadIndicator;
        return ReactMock.createElement(Text, { testID: pressableTestID }, "".concat(brickRoadIndicator !== null && brickRoadIndicator !== void 0 ? brickRoadIndicator : 'none', "-brickRoadIndicator"));
    };
});
describe('ProfilePage contact method indicator', function () {
    beforeAll(function () {
        react_native_onyx_1.default.init({
            keys: ONYXKEYS_1.default,
        });
    });
    beforeEach(function () {
        return react_native_onyx_1.default.clear();
    });
    function renderPage() {
        return (0, react_native_1.render)(<native_1.NavigationContainer>
                <ComposeProviders_1.default components={[DelegateNoAccessModalProvider_1.default]}>
                    <ProfilePage_1.default 
        // @ts-expect-error - route typing is not necessary for this test
        route={{}} navigation={{}}/>
                </ComposeProviders_1.default>
            </native_1.NavigationContainer>);
    }
    it('shows error when login list has errors', function () { return __awaiter(void 0, void 0, void 0, function () {
        var email, node;
        var _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    email = 'user@example.com';
                    // Current user provided by mocked hook uses the same email
                    react_native_onyx_1.default.merge(ONYXKEYS_1.default.LOGIN_LIST, (_a = {},
                        _a[email] = {
                            partnerUserID: email,
                            validatedDate: '',
                            errorFields: { anyError: { message: 'oops' } },
                        },
                        _a));
                    return [4 /*yield*/, (0, waitForBatchedUpdates_1.default)()];
                case 1:
                    _c.sent();
                    renderPage();
                    node = react_native_1.screen.getByText('error-brickRoadIndicator');
                    expect(node).toBeDefined();
                    // Verify that RBR disappears
                    react_native_onyx_1.default.merge(ONYXKEYS_1.default.LOGIN_LIST, (_b = {},
                        _b[email] = {
                            partnerUserID: email,
                            validatedDate: '2024-02-02',
                            errorFields: null,
                        },
                        _b));
                    return [4 /*yield*/, (0, react_native_1.waitFor)(function () {
                            node = react_native_1.screen.getByTestId('contact-method-menu-item');
                            // ContactMethodsPage sets brickRoadIndicator to 'info' for non-default unvalidated logins
                            expect(node).toHaveTextContent('none-brickRoadIndicator');
                        })];
                case 2:
                    _c.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('shows info when there is an unvalidated secondary login', function () { return __awaiter(void 0, void 0, void 0, function () {
        var defaultEmail, otherEmail, node;
        var _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    defaultEmail = 'user@example.com';
                    otherEmail = 'other@example.com';
                    react_native_onyx_1.default.merge(ONYXKEYS_1.default.LOGIN_LIST, (_a = {},
                        _a[defaultEmail] = {
                            partnerUserID: defaultEmail,
                            validatedDate: '2024-01-01',
                        },
                        _a[otherEmail] = {
                            partnerUserID: otherEmail,
                            validatedDate: '',
                        },
                        _a));
                    return [4 /*yield*/, (0, waitForBatchedUpdates_1.default)()];
                case 1:
                    _c.sent();
                    renderPage();
                    node = react_native_1.screen.getByText('info-brickRoadIndicator');
                    expect(node).toBeDefined();
                    // Verify that GBR disappears
                    react_native_onyx_1.default.merge(ONYXKEYS_1.default.LOGIN_LIST, (_b = {},
                        _b[otherEmail] = {
                            partnerUserID: otherEmail,
                            validatedDate: '2024-02-02',
                        },
                        _b));
                    return [4 /*yield*/, (0, react_native_1.waitFor)(function () {
                            node = react_native_1.screen.getByTestId('contact-method-menu-item');
                            // ContactMethodsPage sets brickRoadIndicator to 'info' for non-default unvalidated logins
                            expect(node).toHaveTextContent('none-brickRoadIndicator');
                        })];
                case 2:
                    _c.sent();
                    return [2 /*return*/];
            }
        });
    }); });
});
var Stack = (0, createPlatformStackNavigator_1.default)();
var renderPageWithNavigation = function (initialRouteName) {
    return (0, react_native_1.render)(<ComposeProviders_1.default components={[OnyxListItemProvider_1.default, LocaleContextProvider_1.LocaleContextProvider, useCurrentReportID_1.CurrentReportIDContextProvider]}>
            <portal_1.PortalProvider>
                <native_1.NavigationContainer ref={Navigation_1.navigationRef}>
                    <Stack.Navigator initialRouteName={initialRouteName}>
                        <Stack.Screen name={SCREENS_1.default.SETTINGS.PROFILE.ROOT} component={ProfilePage_1.default}/>
                    </Stack.Navigator>
                </native_1.NavigationContainer>
            </portal_1.PortalProvider>
        </ComposeProviders_1.default>);
};
describe('ProfilePage - SMS domain handling', function () {
    beforeAll(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    react_native_onyx_1.default.init({
                        keys: ONYXKEYS_1.default,
                    });
                    return [4 /*yield*/, (0, react_native_1.act)(function () { return __awaiter(void 0, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, react_native_onyx_1.default.set(ONYXKEYS_1.default.NVP_PREFERRED_LOCALE, 'en')];
                                    case 1:
                                        _a.sent();
                                        return [2 /*return*/];
                                }
                            });
                        }); })];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, (0, waitForBatchedUpdatesWithAct_1.default)()];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    afterEach(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, react_native_onyx_1.default.clear()];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, (0, waitForBatchedUpdatesWithAct_1.default)()];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('should not display @expensify.sms domain for phone number users', function () { return __awaiter(void 0, void 0, void 0, function () {
        var phoneNumber, accountID, personalDetails, tree, treeString;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    phoneNumber = '+15857527441';
                    accountID = 123;
                    return [4 /*yield*/, TestHelper.signInWithTestUser(accountID, "".concat(phoneNumber, "@expensify.sms"))];
                case 1:
                    _b.sent();
                    personalDetails = (_a = {},
                        _a[accountID] = {
                            accountID: accountID,
                            login: "".concat(phoneNumber, "@expensify.sms"),
                            displayName: "".concat(phoneNumber, "@expensify.sms"),
                            avatar: 'https://example.com/avatar.png',
                            avatarThumbnail: 'https://example.com/avatar.png',
                        },
                        _a);
                    return [4 /*yield*/, (0, react_native_1.act)(function () { return __awaiter(void 0, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, react_native_onyx_1.default.merge(ONYXKEYS_1.default.PERSONAL_DETAILS_LIST, personalDetails)];
                                    case 1:
                                        _a.sent();
                                        return [4 /*yield*/, react_native_onyx_1.default.merge(ONYXKEYS_1.default.IS_LOADING_APP, false)];
                                    case 2:
                                        _a.sent();
                                        return [2 /*return*/];
                                }
                            });
                        }); })];
                case 2:
                    _b.sent();
                    return [4 /*yield*/, (0, waitForBatchedUpdatesWithAct_1.default)()];
                case 3:
                    _b.sent();
                    renderPageWithNavigation(SCREENS_1.default.SETTINGS.PROFILE.ROOT);
                    return [4 /*yield*/, (0, waitForBatchedUpdatesWithAct_1.default)()];
                case 4:
                    _b.sent();
                    tree = react_native_1.screen.toJSON();
                    treeString = JSON.stringify(tree);
                    // Verify @expensify.sms is NOT present in the display name field
                    // The display name field should show the formatted phone number without the domain
                    expect(treeString).not.toContain("".concat(phoneNumber, "@expensify.sms"));
                    expect(treeString).not.toContain('@expensify.sms');
                    return [2 /*return*/];
            }
        });
    }); });
    it('should not display @expensify.sms domain when user has custom display name', function () { return __awaiter(void 0, void 0, void 0, function () {
        var phoneNumber, accountID, customDisplayName, personalDetails, tree, treeString;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    phoneNumber = '+15857527441';
                    accountID = 123;
                    customDisplayName = 'John Doe';
                    return [4 /*yield*/, TestHelper.signInWithTestUser(accountID, "".concat(phoneNumber, "@expensify.sms"))];
                case 1:
                    _b.sent();
                    personalDetails = (_a = {},
                        _a[accountID] = {
                            accountID: accountID,
                            login: "".concat(phoneNumber, "@expensify.sms"),
                            displayName: customDisplayName,
                            firstName: 'John',
                            lastName: 'Doe',
                            avatar: 'https://example.com/avatar.png',
                            avatarThumbnail: 'https://example.com/avatar.png',
                        },
                        _a);
                    return [4 /*yield*/, (0, react_native_1.act)(function () { return __awaiter(void 0, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, react_native_onyx_1.default.merge(ONYXKEYS_1.default.PERSONAL_DETAILS_LIST, personalDetails)];
                                    case 1:
                                        _a.sent();
                                        return [4 /*yield*/, react_native_onyx_1.default.merge(ONYXKEYS_1.default.IS_LOADING_APP, false)];
                                    case 2:
                                        _a.sent();
                                        return [2 /*return*/];
                                }
                            });
                        }); })];
                case 2:
                    _b.sent();
                    return [4 /*yield*/, (0, waitForBatchedUpdatesWithAct_1.default)()];
                case 3:
                    _b.sent();
                    renderPageWithNavigation(SCREENS_1.default.SETTINGS.PROFILE.ROOT);
                    return [4 /*yield*/, (0, waitForBatchedUpdatesWithAct_1.default)()];
                case 4:
                    _b.sent();
                    tree = react_native_1.screen.toJSON();
                    treeString = JSON.stringify(tree);
                    expect(treeString).not.toContain('@expensify.sms');
                    expect(treeString).not.toContain("".concat(phoneNumber, "@expensify.sms"));
                    return [2 /*return*/];
            }
        });
    }); });
});
