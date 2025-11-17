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
var react_native_onyx_1 = require("react-native-onyx");
var DateUtils_1 = require("@libs/DateUtils");
var OnyxDerived_1 = require("@userActions/OnyxDerived");
var CONST_1 = require("@src/CONST");
var ONYXKEYS_1 = require("@src/ONYXKEYS");
var LHNTestUtils = require("../utils/LHNTestUtils");
var TestHelper = require("../utils/TestHelper");
var waitForBatchedUpdatesWithAct_1 = require("../utils/waitForBatchedUpdatesWithAct");
var wrapOnyxWithWaitForBatchedUpdates_1 = require("../utils/wrapOnyxWithWaitForBatchedUpdates");
// Be sure to include the mocked Permissions and Expensicons libraries or else the beta tests won't work
jest.mock('@src/libs/Permissions');
jest.mock('@src/components/Icon/Expensicons');
jest.mock('@src/hooks/useRootNavigationState');
var TEST_USER_ACCOUNT_ID = 1;
var TEST_USER_LOGIN = 'email1@test.com';
describe('Sidebar', function () {
    beforeAll(function () {
        react_native_onyx_1.default.init({
            keys: ONYXKEYS_1.default,
            evictableKeys: [ONYXKEYS_1.default.COLLECTION.REPORT_ACTIONS],
        });
        (0, OnyxDerived_1.default)();
    });
    beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    // Wrap Onyx each onyx action with waitForBatchedUpdates
                    (0, wrapOnyxWithWaitForBatchedUpdates_1.default)(react_native_onyx_1.default);
                    return [4 /*yield*/, (0, react_native_1.act)(function () { return __awaiter(void 0, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, react_native_onyx_1.default.set(ONYXKEYS_1.default.NVP_PREFERRED_LOCALE, CONST_1.default.LOCALES.EN)];
                                    case 1:
                                        _a.sent();
                                        // Initialize the network key for OfflineWithFeedback
                                        return [4 /*yield*/, TestHelper.signInWithTestUser(TEST_USER_ACCOUNT_ID, TEST_USER_LOGIN)];
                                    case 2:
                                        // Initialize the network key for OfflineWithFeedback
                                        _a.sent();
                                        return [4 /*yield*/, react_native_onyx_1.default.merge(ONYXKEYS_1.default.NETWORK, { isOffline: false })];
                                    case 3:
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
    // Clear out Onyx after each test so that each test starts with a clean slate
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
                    return [4 /*yield*/, (0, waitForBatchedUpdatesWithAct_1.default)()];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    describe('archived chats', function () {
        it('renders the archive reason as the preview message of the chat', function () {
            var report = __assign(__assign({}, LHNTestUtils.getFakeReport([1, 2], 3, true)), { chatType: CONST_1.default.REPORT.CHAT_TYPE.POLICY_ROOM, lastMessageText: 'test' });
            var action = __assign(__assign({}, LHNTestUtils.getFakeReportAction('email1@test.com', 3)), { actionName: 'CLOSED', originalMessage: {
                    reason: CONST_1.default.REPORT.ARCHIVE_REASON.DEFAULT,
                } });
            var reportNameValuePairs = {
                private_isArchived: DateUtils_1.default.getDBTime(),
            };
            // Given the user is in all betas
            var betas = [CONST_1.default.BETAS.DEFAULT_ROOMS];
            return ((0, waitForBatchedUpdatesWithAct_1.default)()
                .then(function () { return LHNTestUtils.getDefaultRenderedSidebarLinks('0'); })
                // When Onyx is updated with the data and the sidebar re-renders
                .then(function () {
                var _a, _b, _c, _d;
                var reportCollection = (_a = {},
                    _a["".concat(ONYXKEYS_1.default.COLLECTION.REPORT).concat(report.reportID)] = report,
                    _a);
                var reportAction = (_b = {},
                    _b["".concat(ONYXKEYS_1.default.COLLECTION.REPORT_ACTIONS).concat(report.reportID)] = (_c = {}, _c[action.reportActionID] = action, _c),
                    _b);
                var reportNameValuePairsCollection = (_d = {},
                    _d["".concat(ONYXKEYS_1.default.COLLECTION.REPORT_NAME_VALUE_PAIRS).concat(report.reportID)] = reportNameValuePairs,
                    _d);
                return (0, react_native_1.act)(function () { return __awaiter(void 0, void 0, void 0, function () {
                    var _a;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0: return [4 /*yield*/, react_native_onyx_1.default.multiSet(__assign(__assign(__assign((_a = {}, _a[ONYXKEYS_1.default.BETAS] = betas, _a[ONYXKEYS_1.default.NVP_PRIORITY_MODE] = CONST_1.default.PRIORITY_MODE.GSD, _a[ONYXKEYS_1.default.PERSONAL_DETAILS_LIST] = LHNTestUtils.fakePersonalDetails, _a[ONYXKEYS_1.default.IS_LOADING_APP] = false, _a), reportNameValuePairsCollection), reportCollection), reportAction))];
                            case 1:
                                _b.sent();
                                return [2 /*return*/];
                        }
                    });
                }); });
            })
                .then(function () {
                var hintText = TestHelper.translateLocal('accessibilityHints.chatUserDisplayNames');
                var displayNames = react_native_1.screen.queryAllByLabelText(hintText);
                expect(displayNames.at(0)).toHaveTextContent('Report (archived)');
                var hintMessagePreviewText = TestHelper.translateLocal('accessibilityHints.lastChatMessagePreview');
                var messagePreviewTexts = react_native_1.screen.queryAllByLabelText(hintMessagePreviewText);
                expect(messagePreviewTexts.at(0)).toHaveTextContent('This chat room has been archived.');
            }));
        });
        it('renders the policy deleted archive reason as the preview message of the chat', function () {
            var report = __assign(__assign({}, LHNTestUtils.getFakeReport([1, 2], 3, true)), { policyName: 'Vikings Policy', chatType: CONST_1.default.REPORT.CHAT_TYPE.POLICY_ROOM, statusNum: CONST_1.default.REPORT.STATUS_NUM.CLOSED, stateNum: CONST_1.default.REPORT.STATE_NUM.APPROVED, private_isArchived: DateUtils_1.default.getDBTime(), lastMessageText: 'test' });
            var action = __assign(__assign({}, LHNTestUtils.getFakeReportAction('email1@test.com', 3)), { actionName: 'CLOSED', originalMessage: {
                    policyName: 'Vikings Policy',
                    reason: 'policyDeleted',
                } });
            var reportNameValuePairs = {
                private_isArchived: DateUtils_1.default.getDBTime(),
            };
            // Given the user is in all betas
            var betas = [CONST_1.default.BETAS.DEFAULT_ROOMS];
            return ((0, waitForBatchedUpdatesWithAct_1.default)()
                .then(function () { return LHNTestUtils.getDefaultRenderedSidebarLinks('0'); })
                // When Onyx is updated with the data and the sidebar re-renders
                .then(function () {
                var _a, _b, _c, _d;
                var reportCollection = (_a = {},
                    _a["".concat(ONYXKEYS_1.default.COLLECTION.REPORT).concat(report.reportID)] = report,
                    _a);
                var reportAction = (_b = {},
                    _b["".concat(ONYXKEYS_1.default.COLLECTION.REPORT_ACTIONS).concat(report.reportID)] = (_c = {}, _c[action.reportActionID] = action, _c),
                    _b);
                var reportNameValuePairsCollection = (_d = {},
                    _d["".concat(ONYXKEYS_1.default.COLLECTION.REPORT_NAME_VALUE_PAIRS).concat(report.reportID)] = reportNameValuePairs,
                    _d);
                return (0, react_native_1.act)(function () { return __awaiter(void 0, void 0, void 0, function () {
                    var _a;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0: return [4 /*yield*/, react_native_onyx_1.default.multiSet(__assign(__assign(__assign((_a = {}, _a[ONYXKEYS_1.default.BETAS] = betas, _a[ONYXKEYS_1.default.NVP_PRIORITY_MODE] = CONST_1.default.PRIORITY_MODE.GSD, _a[ONYXKEYS_1.default.PERSONAL_DETAILS_LIST] = LHNTestUtils.fakePersonalDetails, _a[ONYXKEYS_1.default.IS_LOADING_APP] = false, _a), reportNameValuePairsCollection), reportCollection), reportAction))];
                            case 1:
                                _b.sent();
                                return [2 /*return*/];
                        }
                    });
                }); });
            })
                .then(function () {
                var hintText = TestHelper.translateLocal('accessibilityHints.chatUserDisplayNames');
                var displayNames = react_native_1.screen.queryAllByLabelText(hintText);
                expect(displayNames.at(0)).toHaveTextContent('Report (archived)');
                var hintMessagePreviewText = TestHelper.translateLocal('accessibilityHints.lastChatMessagePreview');
                var messagePreviewTexts = react_native_1.screen.queryAllByLabelText(hintMessagePreviewText);
                expect(messagePreviewTexts.at(0)).toHaveTextContent('This chat is no longer active because Vikings Policy is no longer an active workspace.');
            }));
        });
    });
});
