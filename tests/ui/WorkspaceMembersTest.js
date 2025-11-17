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
var LocaleContextProvider_1 = require("@components/LocaleContextProvider");
var OnyxListItemProvider_1 = require("@components/OnyxListItemProvider");
var useCurrentReportID_1 = require("@hooks/useCurrentReportID");
var useResponsiveLayoutModule = require("@hooks/useResponsiveLayout");
var createPlatformStackNavigator_1 = require("@libs/Navigation/PlatformStackNavigation/createPlatformStackNavigator");
var WorkspaceMembersPage_1 = require("@pages/workspace/WorkspaceMembersPage");
var CONST_1 = require("@src/CONST");
var ONYXKEYS_1 = require("@src/ONYXKEYS");
var SCREENS_1 = require("@src/SCREENS");
var LHNTestUtils = require("../utils/LHNTestUtils");
var TestHelper = require("../utils/TestHelper");
var waitForBatchedUpdatesWithAct_1 = require("../utils/waitForBatchedUpdatesWithAct");
jest.unmock('react-native-reanimated');
jest.mock('@src/components/ConfirmedRoute.tsx');
TestHelper.setupGlobalFetchMock();
var Stack = (0, createPlatformStackNavigator_1.default)();
var renderPage = function (initialRouteName, initialParams) {
    return (0, react_native_1.render)(<ComposeProviders_1.default components={[OnyxListItemProvider_1.default, LocaleContextProvider_1.LocaleContextProvider, useCurrentReportID_1.CurrentReportIDContextProvider]}>
            <portal_1.PortalProvider>
                <native_1.NavigationContainer>
                    <Stack.Navigator initialRouteName={initialRouteName}>
                        <Stack.Screen name={SCREENS_1.default.WORKSPACE.MEMBERS} component={WorkspaceMembersPage_1.default} initialParams={initialParams}/>
                    </Stack.Navigator>
                </native_1.NavigationContainer>
            </portal_1.PortalProvider>
        </ComposeProviders_1.default>);
};
describe('WorkspaceMembers', function () {
    var _a;
    var ownerAccountID = 1;
    var ownerEmail = 'owner@gmail.com';
    var adminAccountID = 1234;
    var adminEmail = 'admin@example.com';
    var auditorAccountID = 1235;
    var auditorEmail = 'auditor@example.com';
    var userAccountID = 1236;
    var userEmail = 'user@example.com';
    var selfAccountID = 1206;
    var selfEmail = 'test@example.com';
    var ADMIN_OPTION = 'Admin User';
    var AUDITOR_OPTION = 'Auditor User';
    var USER_OPTION = 'Member User';
    var policy = __assign(__assign({}, LHNTestUtils.getFakePolicy()), { role: CONST_1.default.POLICY.ROLE.ADMIN, owner: ownerEmail, ownerAccountID: ownerAccountID, type: CONST_1.default.POLICY.TYPE.CORPORATE, employeeList: (_a = {},
            _a[ownerEmail] = { email: ownerEmail, role: CONST_1.default.POLICY.ROLE.ADMIN },
            _a[adminEmail] = { email: adminEmail, role: CONST_1.default.POLICY.ROLE.ADMIN },
            _a[auditorEmail] = { email: auditorEmail, role: CONST_1.default.POLICY.ROLE.AUDITOR },
            _a[userEmail] = { email: userEmail, role: CONST_1.default.POLICY.ROLE.USER },
            _a[selfEmail] = { email: selfEmail, role: CONST_1.default.POLICY.ROLE.ADMIN },
            _a) });
    beforeAll(function () {
        react_native_onyx_1.default.init({
            keys: ONYXKEYS_1.default,
        });
    });
    beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, TestHelper.signInWithTestUser(selfAccountID, selfEmail, undefined, 'Self')];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, (0, react_native_1.act)(function () { return __awaiter(void 0, void 0, void 0, function () {
                            var _a;
                            return __generator(this, function (_b) {
                                switch (_b.label) {
                                    case 0: return [4 /*yield*/, react_native_onyx_1.default.set(ONYXKEYS_1.default.NVP_PREFERRED_LOCALE, CONST_1.default.LOCALES.EN)];
                                    case 1:
                                        _b.sent();
                                        return [4 /*yield*/, react_native_onyx_1.default.set("".concat(ONYXKEYS_1.default.PERSONAL_DETAILS_LIST), (_a = {},
                                                _a[ownerAccountID] = TestHelper.buildPersonalDetails(ownerEmail, ownerAccountID, 'Owner'),
                                                _a[adminAccountID] = TestHelper.buildPersonalDetails(adminEmail, adminAccountID, 'Admin'),
                                                _a[auditorAccountID] = TestHelper.buildPersonalDetails(auditorEmail, auditorAccountID, 'Auditor'),
                                                _a[userAccountID] = TestHelper.buildPersonalDetails(userEmail, userAccountID, 'Member'),
                                                _a[selfAccountID] = TestHelper.buildPersonalDetails(selfEmail, selfAccountID, 'Self'),
                                                _a))];
                                    case 2:
                                        _b.sent();
                                        return [4 /*yield*/, react_native_onyx_1.default.merge("".concat(ONYXKEYS_1.default.COLLECTION.POLICY).concat(policy.id), policy)];
                                    case 3:
                                        _b.sent();
                                        return [2 /*return*/];
                                }
                            });
                        }); })];
                case 2:
                    _a.sent();
                    jest.spyOn(useResponsiveLayoutModule, 'default').mockReturnValue({
                        isSmallScreenWidth: false,
                        shouldUseNarrowLayout: false,
                    });
                    return [2 /*return*/];
            }
        });
    }); });
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
    describe('Changing roles options', function () {
        it('should show Make member/auditor when admin is selected', function () { return __awaiter(void 0, void 0, void 0, function () {
            var unmount, dropdownMenuButtonTestID, dropdownButton, makeMemberMenuItem, makeAuditorMenuItem, makeAdminMenuItem;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        unmount = renderPage(SCREENS_1.default.WORKSPACE.MEMBERS, { policyID: policy.id }).unmount;
                        return [4 /*yield*/, (0, waitForBatchedUpdatesWithAct_1.default)()];
                    case 1:
                        _a.sent();
                        // Wait for initial render and verify members are visible
                        return [4 /*yield*/, (0, react_native_1.waitFor)(function () {
                                expect(react_native_1.screen.getByText(ADMIN_OPTION)).toBeOnTheScreen();
                            })];
                    case 2:
                        // Wait for initial render and verify members are visible
                        _a.sent();
                        // Select admin option by clicking their checkboxes
                        react_native_1.fireEvent.press(react_native_1.screen.getByTestId("TableListItemCheckbox-".concat(ADMIN_OPTION)));
                        dropdownMenuButtonTestID = 'WorkspaceMembersPage-header-dropdown-menu-button';
                        // Wait for selection mode to be active and click the dropdown menu button
                        return [4 /*yield*/, (0, react_native_1.waitFor)(function () {
                                expect(react_native_1.screen.getByTestId(dropdownMenuButtonTestID)).toBeOnTheScreen();
                            })];
                    case 3:
                        // Wait for selection mode to be active and click the dropdown menu button
                        _a.sent();
                        dropdownButton = react_native_1.screen.getByTestId(dropdownMenuButtonTestID);
                        react_native_1.fireEvent.press(dropdownButton);
                        return [4 /*yield*/, (0, waitForBatchedUpdatesWithAct_1.default)()];
                    case 4:
                        _a.sent();
                        // Wait for menu items to be visible
                        return [4 /*yield*/, (0, react_native_1.waitFor)(function () {
                                var makeMemberText = TestHelper.translateLocal('workspace.people.makeMember');
                                expect(react_native_1.screen.getByText(makeMemberText)).toBeOnTheScreen();
                            })];
                    case 5:
                        // Wait for menu items to be visible
                        _a.sent();
                        makeMemberMenuItem = react_native_1.screen.getByTestId('PopoverMenuItem-Make member');
                        expect(makeMemberMenuItem).toBeOnTheScreen();
                        makeAuditorMenuItem = react_native_1.screen.getByTestId('PopoverMenuItem-Make auditor');
                        expect(makeAuditorMenuItem).toBeOnTheScreen();
                        makeAdminMenuItem = react_native_1.screen.queryByTestId('PopoverMenuItem-Make admin');
                        expect(makeAdminMenuItem).not.toBeOnTheScreen();
                        unmount();
                        return [4 /*yield*/, (0, waitForBatchedUpdatesWithAct_1.default)()];
                    case 6:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('should show Make admin/auditor when member is selected', function () { return __awaiter(void 0, void 0, void 0, function () {
            var unmount, dropdownMenuButtonTestID, dropdownButton, makeAdminMenuItem, makeAuditorMenuItem, makeMemberMenuItem;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        unmount = renderPage(SCREENS_1.default.WORKSPACE.MEMBERS, { policyID: policy.id }).unmount;
                        return [4 /*yield*/, (0, waitForBatchedUpdatesWithAct_1.default)()];
                    case 1:
                        _a.sent();
                        // Wait for initial render and verify members are visible
                        return [4 /*yield*/, (0, react_native_1.waitFor)(function () {
                                expect(react_native_1.screen.getByText(USER_OPTION)).toBeOnTheScreen();
                            })];
                    case 2:
                        // Wait for initial render and verify members are visible
                        _a.sent();
                        // Select member option by clicking their checkboxes
                        react_native_1.fireEvent.press(react_native_1.screen.getByTestId("TableListItemCheckbox-".concat(USER_OPTION)));
                        dropdownMenuButtonTestID = 'WorkspaceMembersPage-header-dropdown-menu-button';
                        // Wait for selection mode to be active and click the dropdown menu button
                        return [4 /*yield*/, (0, react_native_1.waitFor)(function () {
                                expect(react_native_1.screen.getByTestId(dropdownMenuButtonTestID)).toBeOnTheScreen();
                            })];
                    case 3:
                        // Wait for selection mode to be active and click the dropdown menu button
                        _a.sent();
                        dropdownButton = react_native_1.screen.getByTestId(dropdownMenuButtonTestID);
                        react_native_1.fireEvent.press(dropdownButton);
                        return [4 /*yield*/, (0, waitForBatchedUpdatesWithAct_1.default)()];
                    case 4:
                        _a.sent();
                        // Wait for menu items to be visible
                        return [4 /*yield*/, (0, react_native_1.waitFor)(function () {
                                var makeAdminText = TestHelper.translateLocal('workspace.people.makeAdmin');
                                expect(react_native_1.screen.getByText(makeAdminText)).toBeOnTheScreen();
                            })];
                    case 5:
                        // Wait for menu items to be visible
                        _a.sent();
                        makeAdminMenuItem = react_native_1.screen.getByTestId('PopoverMenuItem-Make admin');
                        expect(makeAdminMenuItem).toBeOnTheScreen();
                        makeAuditorMenuItem = react_native_1.screen.getByTestId('PopoverMenuItem-Make auditor');
                        expect(makeAuditorMenuItem).toBeOnTheScreen();
                        makeMemberMenuItem = react_native_1.screen.queryByTestId('PopoverMenuItem-Make member');
                        expect(makeMemberMenuItem).not.toBeOnTheScreen();
                        unmount();
                        return [4 /*yield*/, (0, waitForBatchedUpdatesWithAct_1.default)()];
                    case 6:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('should show Make member/admin when auditor is selected', function () { return __awaiter(void 0, void 0, void 0, function () {
            var unmount, dropdownMenuButtonTestID, dropdownButton, makeMemberMenuItem, makeAdminMenuItem, makeAuditorMenuItem;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        unmount = renderPage(SCREENS_1.default.WORKSPACE.MEMBERS, { policyID: policy.id }).unmount;
                        return [4 /*yield*/, (0, waitForBatchedUpdatesWithAct_1.default)()];
                    case 1:
                        _a.sent();
                        // Wait for initial render and verify members are visible
                        return [4 /*yield*/, (0, react_native_1.waitFor)(function () {
                                expect(react_native_1.screen.getByText(AUDITOR_OPTION)).toBeOnTheScreen();
                            })];
                    case 2:
                        // Wait for initial render and verify members are visible
                        _a.sent();
                        // Select auditor option by clicking their checkboxes
                        react_native_1.fireEvent.press(react_native_1.screen.getByTestId("TableListItemCheckbox-".concat(AUDITOR_OPTION)));
                        dropdownMenuButtonTestID = 'WorkspaceMembersPage-header-dropdown-menu-button';
                        // Wait for selection mode to be active and click the dropdown menu button
                        return [4 /*yield*/, (0, react_native_1.waitFor)(function () {
                                expect(react_native_1.screen.getByTestId(dropdownMenuButtonTestID)).toBeOnTheScreen();
                            })];
                    case 3:
                        // Wait for selection mode to be active and click the dropdown menu button
                        _a.sent();
                        dropdownButton = react_native_1.screen.getByTestId(dropdownMenuButtonTestID);
                        react_native_1.fireEvent.press(dropdownButton);
                        return [4 /*yield*/, (0, waitForBatchedUpdatesWithAct_1.default)()];
                    case 4:
                        _a.sent();
                        // Wait for menu items to be visible
                        return [4 /*yield*/, (0, react_native_1.waitFor)(function () {
                                var makeMemberText = TestHelper.translateLocal('workspace.people.makeMember');
                                expect(react_native_1.screen.getByText(makeMemberText)).toBeOnTheScreen();
                            })];
                    case 5:
                        // Wait for menu items to be visible
                        _a.sent();
                        makeMemberMenuItem = react_native_1.screen.getByTestId('PopoverMenuItem-Make member');
                        expect(makeMemberMenuItem).toBeOnTheScreen();
                        makeAdminMenuItem = react_native_1.screen.getByTestId('PopoverMenuItem-Make admin');
                        expect(makeAdminMenuItem).toBeOnTheScreen();
                        makeAuditorMenuItem = react_native_1.screen.queryByTestId('PopoverMenuItem-Make auditor');
                        expect(makeAuditorMenuItem).not.toBeOnTheScreen();
                        unmount();
                        return [4 /*yield*/, (0, waitForBatchedUpdatesWithAct_1.default)()];
                    case 6:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('should show Make member/admin/auditor when mix is selected', function () { return __awaiter(void 0, void 0, void 0, function () {
            var unmount, dropdownMenuButtonTestID, dropdownButton, makeMemberMenuItem, makeAdminMenuItem, makeAuditorMenuItem;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        unmount = renderPage(SCREENS_1.default.WORKSPACE.MEMBERS, { policyID: policy.id }).unmount;
                        return [4 /*yield*/, (0, waitForBatchedUpdatesWithAct_1.default)()];
                    case 1:
                        _a.sent();
                        // Wait for initial render and verify members are visible
                        return [4 /*yield*/, (0, react_native_1.waitFor)(function () {
                                expect(react_native_1.screen.getByText(AUDITOR_OPTION)).toBeOnTheScreen();
                            })];
                    case 2:
                        // Wait for initial render and verify members are visible
                        _a.sent();
                        return [4 /*yield*/, (0, react_native_1.waitFor)(function () {
                                expect(react_native_1.screen.getByText(ADMIN_OPTION)).toBeOnTheScreen();
                            })];
                    case 3:
                        _a.sent();
                        // Select options by clicking their checkboxes
                        react_native_1.fireEvent.press(react_native_1.screen.getByTestId("TableListItemCheckbox-".concat(AUDITOR_OPTION)));
                        react_native_1.fireEvent.press(react_native_1.screen.getByTestId("TableListItemCheckbox-".concat(ADMIN_OPTION)));
                        dropdownMenuButtonTestID = 'WorkspaceMembersPage-header-dropdown-menu-button';
                        // Wait for selection mode to be active and click the dropdown menu button
                        return [4 /*yield*/, (0, react_native_1.waitFor)(function () {
                                expect(react_native_1.screen.getByTestId(dropdownMenuButtonTestID)).toBeOnTheScreen();
                            })];
                    case 4:
                        // Wait for selection mode to be active and click the dropdown menu button
                        _a.sent();
                        dropdownButton = react_native_1.screen.getByTestId(dropdownMenuButtonTestID);
                        react_native_1.fireEvent.press(dropdownButton);
                        return [4 /*yield*/, (0, waitForBatchedUpdatesWithAct_1.default)()];
                    case 5:
                        _a.sent();
                        // Wait for menu items to be visible
                        return [4 /*yield*/, (0, react_native_1.waitFor)(function () {
                                var makeMemberText = TestHelper.translateLocal('workspace.people.makeMember');
                                expect(react_native_1.screen.getByText(makeMemberText)).toBeOnTheScreen();
                            })];
                    case 6:
                        // Wait for menu items to be visible
                        _a.sent();
                        makeMemberMenuItem = react_native_1.screen.getByTestId('PopoverMenuItem-Make member');
                        expect(makeMemberMenuItem).toBeOnTheScreen();
                        makeAdminMenuItem = react_native_1.screen.getByTestId('PopoverMenuItem-Make admin');
                        expect(makeAdminMenuItem).toBeOnTheScreen();
                        makeAuditorMenuItem = react_native_1.screen.getByTestId('PopoverMenuItem-Make auditor');
                        expect(makeAuditorMenuItem).toBeOnTheScreen();
                        unmount();
                        return [4 /*yield*/, (0, waitForBatchedUpdatesWithAct_1.default)()];
                    case 7:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
