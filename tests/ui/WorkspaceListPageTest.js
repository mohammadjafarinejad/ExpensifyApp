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
var portal_1 = require("@gorhom/portal");
var native_1 = require("@react-navigation/native");
var react_native_1 = require("@testing-library/react-native");
var react_native_onyx_1 = require("react-native-onyx");
var ComposeProviders_1 = require("@components/ComposeProviders");
var LocaleContextProvider_1 = require("@components/LocaleContextProvider");
var OnyxListItemProvider_1 = require("@components/OnyxListItemProvider");
var createPlatformStackNavigator_1 = require("@libs/Navigation/PlatformStackNavigation/createPlatformStackNavigator");
var WorkspacesListPage_1 = require("@pages/workspace/WorkspacesListPage");
var ONYXKEYS_1 = require("@src/ONYXKEYS");
var SCREENS_1 = require("@src/SCREENS");
var waitForBatchedUpdatesWithAct_1 = require("../utils/waitForBatchedUpdatesWithAct");
var Stack = (0, createPlatformStackNavigator_1.default)();
var renderPage = function (initialRouteName) {
    if (initialRouteName === void 0) { initialRouteName = SCREENS_1.default.WORKSPACES_LIST; }
    return (0, react_native_1.render)(<ComposeProviders_1.default components={[OnyxListItemProvider_1.default, LocaleContextProvider_1.LocaleContextProvider]}>
            <portal_1.PortalProvider>
                <native_1.NavigationContainer>
                    <Stack.Navigator initialRouteName={initialRouteName}>
                        <Stack.Screen name={SCREENS_1.default.WORKSPACES_LIST} component={WorkspacesListPage_1.default}/>
                    </Stack.Navigator>
                </native_1.NavigationContainer>
            </portal_1.PortalProvider>
        </ComposeProviders_1.default>);
};
describe('WorkspaceListPage', function () {
    beforeAll(function () {
        react_native_onyx_1.default.init({
            keys: ONYXKEYS_1.default,
        });
    });
    afterAll(function () {
        react_native_onyx_1.default.clear();
    });
    it('should not show new workspace button when the restrict creation policy in the group domain is enabled', function () { return __awaiter(void 0, void 0, void 0, function () {
        var TEST_DOMAIN, TEST_SECURITY_GROUP_ID, TEST_POLICY_ID, TEST_EMAIL, TEST_ACCOUNT_ID, newWorkspaceButton;
        var _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    TEST_DOMAIN = 'domain.com';
                    TEST_SECURITY_GROUP_ID = 'test-id';
                    TEST_POLICY_ID = 'test-policy-id';
                    TEST_EMAIL = 'test@domain.com';
                    TEST_ACCOUNT_ID = 1;
                    return [4 /*yield*/, react_native_onyx_1.default.set(ONYXKEYS_1.default.MY_DOMAIN_SECURITY_GROUPS, (_a = {},
                            _a[TEST_DOMAIN] = TEST_SECURITY_GROUP_ID,
                            _a))];
                case 1:
                    _c.sent();
                    return [4 /*yield*/, react_native_onyx_1.default.set("".concat(ONYXKEYS_1.default.COLLECTION.SECURITY_GROUP).concat(TEST_SECURITY_GROUP_ID), {
                            enableRestrictedPolicyCreation: true,
                        })];
                case 2:
                    _c.sent();
                    return [4 /*yield*/, react_native_onyx_1.default.set("".concat(ONYXKEYS_1.default.COLLECTION.POLICY).concat(TEST_POLICY_ID), {
                            id: TEST_POLICY_ID,
                            name: 'Test Policy',
                            role: 'admin',
                        })];
                case 3:
                    _c.sent();
                    return [4 /*yield*/, react_native_onyx_1.default.set("".concat(ONYXKEYS_1.default.SESSION), {
                            email: TEST_EMAIL,
                            accountID: TEST_ACCOUNT_ID,
                        })];
                case 4:
                    _c.sent();
                    return [4 /*yield*/, react_native_onyx_1.default.set(ONYXKEYS_1.default.PERSONAL_DETAILS_LIST, (_b = {},
                            _b[TEST_ACCOUNT_ID] = {
                                login: TEST_EMAIL,
                                accountID: TEST_ACCOUNT_ID,
                                displayName: TEST_EMAIL,
                            },
                            _b))];
                case 5:
                    _c.sent();
                    renderPage();
                    return [4 /*yield*/, (0, waitForBatchedUpdatesWithAct_1.default)()];
                case 6:
                    _c.sent();
                    newWorkspaceButton = react_native_1.screen.queryByAccessibilityHint('New workspace');
                    expect(newWorkspaceButton).not.toBeOnTheScreen();
                    return [2 /*return*/];
            }
        });
    }); });
    it('should show new workspace button when the restrict creation policy in the group domain is disabled', function () { return __awaiter(void 0, void 0, void 0, function () {
        var TEST_DOMAIN, TEST_SECURITY_GROUP_ID, TEST_POLICY_ID, TEST_EMAIL, TEST_ACCOUNT_ID, newWorkspaceButton;
        var _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    TEST_DOMAIN = 'domain.com';
                    TEST_SECURITY_GROUP_ID = 'test-id';
                    TEST_POLICY_ID = 'test-policy-id';
                    TEST_EMAIL = 'test@domain.com';
                    TEST_ACCOUNT_ID = 1;
                    return [4 /*yield*/, react_native_onyx_1.default.set(ONYXKEYS_1.default.MY_DOMAIN_SECURITY_GROUPS, (_a = {},
                            _a[TEST_DOMAIN] = TEST_SECURITY_GROUP_ID,
                            _a))];
                case 1:
                    _c.sent();
                    return [4 /*yield*/, react_native_onyx_1.default.set("".concat(ONYXKEYS_1.default.COLLECTION.SECURITY_GROUP).concat(TEST_SECURITY_GROUP_ID), {
                            enableRestrictedPolicyCreation: false,
                        })];
                case 2:
                    _c.sent();
                    return [4 /*yield*/, react_native_onyx_1.default.set("".concat(ONYXKEYS_1.default.COLLECTION.POLICY).concat(TEST_POLICY_ID), {
                            id: TEST_POLICY_ID,
                            name: 'Test Policy',
                            role: 'admin',
                        })];
                case 3:
                    _c.sent();
                    return [4 /*yield*/, react_native_onyx_1.default.set("".concat(ONYXKEYS_1.default.SESSION), {
                            email: TEST_EMAIL,
                            accountID: TEST_ACCOUNT_ID,
                        })];
                case 4:
                    _c.sent();
                    return [4 /*yield*/, react_native_onyx_1.default.set(ONYXKEYS_1.default.PERSONAL_DETAILS_LIST, (_b = {},
                            _b[TEST_ACCOUNT_ID] = {
                                login: TEST_EMAIL,
                                accountID: TEST_ACCOUNT_ID,
                                displayName: TEST_EMAIL,
                            },
                            _b))];
                case 5:
                    _c.sent();
                    renderPage();
                    return [4 /*yield*/, (0, waitForBatchedUpdatesWithAct_1.default)()];
                case 6:
                    _c.sent();
                    newWorkspaceButton = react_native_1.screen.queryByAccessibilityHint('New workspace');
                    expect(newWorkspaceButton).toBeOnTheScreen();
                    return [2 /*return*/];
            }
        });
    }); });
});
