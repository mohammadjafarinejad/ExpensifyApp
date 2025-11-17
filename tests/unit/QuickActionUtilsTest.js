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
Object.defineProperty(exports, "__esModule", { value: true });
// eslint-disable-next-line no-restricted-syntax
var react_native_onyx_1 = require("react-native-onyx");
// eslint-disable-next-line no-restricted-syntax
var PolicyUtils = require("@libs/PolicyUtils");
var QuickActionUtils_1 = require("@libs/QuickActionUtils");
var CONST_1 = require("@src/CONST");
var ONYXKEYS_1 = require("@src/ONYXKEYS");
var LHNTestUtils = require("../utils/LHNTestUtils");
var waitForBatchedUpdates_1 = require("../utils/waitForBatchedUpdates");
// Mock the PolicyUtils module
jest.mock('@libs/PolicyUtils');
var mockedPolicyUtils = PolicyUtils;
describe('QuickActionUtils', function () {
    describe('isQuickActionAllowed', function () {
        describe('Manager McTest restrictions', function () {
            var _a;
            var requestScanAction = {
                action: CONST_1.default.QUICK_ACTIONS.REQUEST_SCAN,
                isFirstQuickAction: false,
            };
            // Given a report with Manager McTest
            var reportWithManagerMcTest = {
                reportID: '1',
                participants: (_a = {},
                    _a[CONST_1.default.ACCOUNT_ID.MANAGER_MCTEST] = {
                        notificationPreference: CONST_1.default.REPORT.NOTIFICATION_PREFERENCE.ALWAYS,
                    },
                    _a),
            };
            beforeEach(function () {
                jest.clearAllMocks();
            });
            it('should return false when report contains Manager McTest', function () {
                mockedPolicyUtils.shouldShowPolicy.mockReturnValue(false);
                // When the report contains Manager McTest
                var result = (0, QuickActionUtils_1.isQuickActionAllowed)(requestScanAction, reportWithManagerMcTest, undefined, undefined);
                // Then it should return false
                expect(result).toBe(false);
            });
        });
        describe('Preferred policy restrictions', function () {
            var _a;
            var requestManualAction = {
                action: CONST_1.default.QUICK_ACTIONS.REQUEST_MANUAL,
                isFirstQuickAction: false,
            };
            var splitManualAction = {
                action: CONST_1.default.QUICK_ACTIONS.SPLIT_MANUAL,
                isFirstQuickAction: false,
            };
            var sendMoneyAction = {
                action: CONST_1.default.QUICK_ACTIONS.SEND_MONEY,
                isFirstQuickAction: false,
            };
            var RORY_EMAIL = 'rory@expensifail.com';
            var RORY_ACCOUNT_ID = 3;
            var RORY_PARTICIPANT = { notificationPreference: CONST_1.default.REPORT.NOTIFICATION_PREFERENCE.ALWAYS, role: 'admin' };
            var VIT_ACCOUNT_ID = 4;
            var VIT_PARTICIPANT = { notificationPreference: CONST_1.default.REPORT.NOTIFICATION_PREFERENCE.ALWAYS, role: 'member' };
            beforeAll(function () {
                var _a, _b;
                react_native_onyx_1.default.init({
                    keys: ONYXKEYS_1.default,
                    initialKeyStates: (_a = {},
                        _a[ONYXKEYS_1.default.SESSION] = { accountID: RORY_ACCOUNT_ID, email: RORY_EMAIL },
                        _a[ONYXKEYS_1.default.PERSONAL_DETAILS_LIST] = (_b = {}, _b[RORY_ACCOUNT_ID] = { accountID: RORY_ACCOUNT_ID, login: RORY_EMAIL }, _b),
                        _a),
                });
                return (0, waitForBatchedUpdates_1.default)();
            });
            beforeEach(function () {
                jest.clearAllMocks();
            });
            var DMReport = {
                reportID: '1234',
                type: CONST_1.default.REPORT.TYPE.CHAT,
                participants: (_a = {},
                    _a[RORY_ACCOUNT_ID] = RORY_PARTICIPANT,
                    _a[VIT_ACCOUNT_ID] = VIT_PARTICIPANT,
                    _a),
            };
            it('should restrict REQUEST action on DMs', function () {
                var withoutRestrictionsResult = (0, QuickActionUtils_1.isQuickActionAllowed)(requestManualAction, DMReport, undefined, false, false);
                var withRestrictionsResult = (0, QuickActionUtils_1.isQuickActionAllowed)(requestManualAction, DMReport, undefined, false, true);
                expect(withoutRestrictionsResult).toBe(true);
                expect(withRestrictionsResult).toBe(false);
            });
            it('should restrict SPLIT action on DMs', function () {
                var withoutRestrictionsResult = (0, QuickActionUtils_1.isQuickActionAllowed)(splitManualAction, DMReport, undefined, false, false);
                var withRestrictionsResult = (0, QuickActionUtils_1.isQuickActionAllowed)(splitManualAction, DMReport, undefined, false, true);
                expect(withoutRestrictionsResult).toBe(true);
                expect(withRestrictionsResult).toBe(false);
            });
            it('should restrict SEND_MONEY action on DMs', function () {
                var withoutRestrictionsResult = (0, QuickActionUtils_1.isQuickActionAllowed)(sendMoneyAction, DMReport, undefined, false, false);
                var withRestrictionsResult = (0, QuickActionUtils_1.isQuickActionAllowed)(sendMoneyAction, DMReport, undefined, false, true);
                expect(withoutRestrictionsResult).toBe(true);
                expect(withRestrictionsResult).toBe(false);
            });
            it('should restrict SPLIT action on Group chats', function () {
                var groupChatReport = LHNTestUtils.getFakeReport([1, 2, 3, 4]);
                var withoutRestrictionsResult = (0, QuickActionUtils_1.isQuickActionAllowed)(splitManualAction, groupChatReport, undefined, false, false);
                var withRestrictionsResult = (0, QuickActionUtils_1.isQuickActionAllowed)(splitManualAction, groupChatReport, undefined, false, true);
                expect(withoutRestrictionsResult).toBe(true);
                expect(withRestrictionsResult).toBe(false);
            });
            it('should restrict SPLIT action on user-created policy rooms', function () {
                var policyRoomReport = __assign(__assign({}, LHNTestUtils.getFakeReport([1, 2])), { chatType: CONST_1.default.REPORT.CHAT_TYPE.POLICY_ROOM });
                var withoutRestrictionsResult = (0, QuickActionUtils_1.isQuickActionAllowed)(splitManualAction, policyRoomReport, undefined, false, false);
                var withRestrictionsResult = (0, QuickActionUtils_1.isQuickActionAllowed)(splitManualAction, policyRoomReport, undefined, false, true);
                expect(withoutRestrictionsResult).toBe(true);
                expect(withRestrictionsResult).toBe(false);
            });
        });
    });
});
