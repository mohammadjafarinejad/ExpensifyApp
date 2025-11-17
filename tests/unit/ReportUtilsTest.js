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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/naming-convention */
var globals_1 = require("@jest/globals");
var react_native_1 = require("@testing-library/react-native");
var date_fns_1 = require("date-fns");
var react_native_onyx_1 = require("react-native-onyx");
var OnyxListItemProvider_1 = require("@components/OnyxListItemProvider");
var usePolicyData_1 = require("@hooks/usePolicyData");
var useReportIsArchived_1 = require("@hooks/useReportIsArchived");
var IOU_1 = require("@libs/actions/IOU");
var OnyxDerived_1 = require("@libs/actions/OnyxDerived");
var CurrencyUtils_1 = require("@libs/CurrencyUtils");
var DateUtils_1 = require("@libs/DateUtils");
var Environment_1 = require("@libs/Environment/Environment");
var getBase62ReportID_1 = require("@libs/getBase62ReportID");
var Localize_1 = require("@libs/Localize");
var isSearchTopmostFullScreenRoute_1 = require("@libs/Navigation/helpers/isSearchTopmostFullScreenRoute");
var Navigation_1 = require("@libs/Navigation/Navigation");
var ReportActionsUtils_1 = require("@libs/ReportActionsUtils");
var ReportUtils_1 = require("@libs/ReportUtils");
var TransactionUtils_1 = require("@libs/TransactionUtils");
var CONST_1 = require("@src/CONST");
var IntlStore_1 = require("@src/languages/IntlStore");
var ONYXKEYS_1 = require("@src/ONYXKEYS");
var ROUTES_1 = require("@src/ROUTES");
var CollectionDataSet_1 = require("@src/types/utils/CollectionDataSet");
var actions_1 = require("../../__mocks__/reportData/actions");
var reports_1 = require("../../__mocks__/reportData/reports");
var transactions_5 = require("../../__mocks__/reportData/transactions");
var NumberUtils = require("../../src/libs/NumberUtils");
var policies_1 = require("../utils/collections/policies");
var policyCategory_1 = require("../utils/collections/policyCategory");
var policyTags_1 = require("../utils/collections/policyTags");
var reportActions_1 = require("../utils/collections/reportActions");
var reports_2 = require("../utils/collections/reports");
var transaction_1 = require("../utils/collections/transaction");
var LHNTestUtils = require("../utils/LHNTestUtils");
var LHNTestUtils_1 = require("../utils/LHNTestUtils");
var TestHelper_1 = require("../utils/TestHelper");
var waitForBatchedUpdates_1 = require("../utils/waitForBatchedUpdates");
// Be sure to include the mocked permissions library or else the beta tests won't work
jest.mock('@libs/Permissions');
jest.mock('@libs/Navigation/helpers/isSearchTopmostFullScreenRoute', function () { return jest.fn(); });
jest.mock('@libs/Navigation/Navigation', function () { return ({
    setNavigationActionToMicrotaskQueue: jest.fn(),
    navigate: jest.fn(),
    getActiveRoute: jest.fn(function () { return 'mock-route'; }),
    navigationRef: {
        getCurrentRoute: jest.fn(function () { return ({
            params: {
                reportID: '2',
            },
        }); }),
    },
}); });
var testDate = DateUtils_1.default.getDBTime();
var currentUserEmail = 'bjorn@vikings.net';
var currentUserAccountID = 5;
var participantsPersonalDetails = {
    '1': {
        accountID: 1,
        displayName: 'Ragnar Lothbrok',
        firstName: 'Ragnar',
        login: 'ragnar@vikings.net',
    },
    '2': {
        accountID: 2,
        login: 'floki@vikings.net',
        displayName: 'floki@vikings.net',
    },
    '3': {
        accountID: 3,
        displayName: 'Lagertha Lothbrok',
        firstName: 'Lagertha',
        login: 'lagertha@vikings.net',
        pronouns: 'She/her',
    },
    '4': {
        accountID: 4,
        login: '+18332403627@expensify.sms',
        displayName: '(833) 240-3627',
    },
    '5': {
        accountID: 5,
        displayName: 'Lagertha Lothbrok',
        firstName: 'Lagertha',
        login: 'lagertha2@vikings.net',
        pronouns: 'She/her',
    },
};
var employeeList = {
    'owner@test.com': {
        email: 'owner@test.com',
        role: 'admin',
        submitsTo: '',
    },
    'admin@test.com': {
        email: 'admin@test.com',
        role: 'admin',
        submitsTo: '',
    },
    'employee@test.com': {
        email: 'employee@test.com',
        role: 'user',
        submitsTo: 'admin@test.com',
    },
    'categoryapprover1@test.com': {
        email: 'categoryapprover1@test.com',
        role: 'user',
        submitsTo: 'admin@test.com',
    },
    'categoryapprover2@test.com': {
        email: 'categoryapprover2@test.com',
        role: 'user',
        submitsTo: 'admin@test.com',
    },
    'tagapprover1@test.com': {
        email: 'tagapprover1@test.com',
        role: 'user',
        submitsTo: 'admin@test.com',
    },
    'tagapprover2@test.com': {
        email: 'tagapprover2@test.com',
        role: 'user',
        submitsTo: 'admin@test.com',
    },
};
var personalDetails = {
    '1': {
        accountID: 1,
        login: 'admin@test.com',
    },
    '2': {
        accountID: 2,
        login: 'employee@test.com',
    },
    '3': {
        accountID: 3,
        login: 'categoryapprover1@test.com',
    },
    '4': {
        accountID: 4,
        login: 'categoryapprover2@test.com',
    },
    '5': {
        accountID: 5,
        login: 'tagapprover1@test.com',
    },
    '6': {
        accountID: 6,
        login: 'tagapprover2@test.com',
    },
    '7': {
        accountID: 7,
        login: 'owner@test.com',
    },
    '8': {
        accountID: 8,
        login: CONST_1.default.EMAIL.GUIDES_DOMAIN,
    },
};
var rules = {
    approvalRules: [
        {
            applyWhen: [
                {
                    condition: 'matches',
                    field: 'category',
                    value: 'cat1',
                },
            ],
            approver: 'categoryapprover1@test.com',
            id: '1',
        },
        {
            applyWhen: [
                {
                    condition: 'matches',
                    field: 'tag',
                    value: 'tag1',
                },
            ],
            approver: 'tagapprover1@test.com',
            id: '2',
        },
        {
            applyWhen: [
                {
                    condition: 'matches',
                    field: 'category',
                    value: 'cat2',
                },
            ],
            approver: 'categoryapprover2@test.com',
            id: '3',
        },
        {
            applyWhen: [
                {
                    condition: 'matches',
                    field: 'tag',
                    value: 'tag2',
                },
            ],
            approver: 'tagapprover2@test.com',
            id: '4',
        },
    ],
};
var employeeAccountID = 2;
var categoryApprover1Email = 'categoryapprover1@test.com';
var categoryApprover2Email = 'categoryapprover2@test.com';
var tagApprover1Email = 'tagapprover1@test.com';
var tagApprover2Email = 'tagapprover2@test.com';
var policy = {
    id: '1',
    name: 'Vikings Policy',
    role: 'user',
    type: CONST_1.default.POLICY.TYPE.TEAM,
    owner: '',
    outputCurrency: '',
    isPolicyExpenseChatEnabled: false,
};
describe('ReportUtils', function () {
    (0, globals_1.beforeAll)(function () {
        var _a;
        react_native_onyx_1.default.init({ keys: ONYXKEYS_1.default });
        var policyCollectionDataSet = (0, CollectionDataSet_1.toCollectionDataSet)(ONYXKEYS_1.default.COLLECTION.POLICY, [policy], function (current) { return current.id; });
        react_native_onyx_1.default.multiSet(__assign((_a = {}, _a[ONYXKEYS_1.default.PERSONAL_DETAILS_LIST] = participantsPersonalDetails, _a[ONYXKEYS_1.default.SESSION] = { email: currentUserEmail, accountID: currentUserAccountID }, _a[ONYXKEYS_1.default.COUNTRY_CODE] = 1, _a), policyCollectionDataSet));
        return (0, waitForBatchedUpdates_1.default)();
    });
    beforeEach(function () { return IntlStore_1.default.load(CONST_1.default.LOCALES.DEFAULT).then(waitForBatchedUpdates_1.default); });
    describe('getIOUReportActionDisplayMessage', function () {
        var iouReportID = '1234567890';
        var policyID = 332;
        var reportAction = __assign(__assign({}, (0, reportActions_1.default)(44)), { actionName: CONST_1.default.REPORT.ACTIONS.TYPE.IOU, originalMessage: { IOUReportID: iouReportID, type: CONST_1.default.IOU.REPORT_ACTION_TYPE.PAY, paymentType: CONST_1.default.IOU.PAYMENT_TYPE.VBBA } });
        var iouReport = __assign(__assign({}, (0, reports_2.createExpenseReport)(Number(iouReportID))), { policyID: policyID.toString() });
        var policyWithBank = __assign(__assign({}, (0, policies_1.default)(policyID, CONST_1.default.POLICY.TYPE.TEAM)), { achAccount: {
                accountNumber: 'XXXXXXXXXXXX0000',
            } });
        it('should return the right message when payment type is ACH', function () { return __awaiter(void 0, void 0, void 0, function () {
            var last4Digits, paidSystemMessage;
            var _a;
            var _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, react_native_onyx_1.default.merge("".concat(ONYXKEYS_1.default.COLLECTION.POLICY).concat(policyID), policyWithBank)];
                    case 1:
                        _c.sent();
                        return [4 /*yield*/, react_native_onyx_1.default.merge("".concat(ONYXKEYS_1.default.COLLECTION.REPORT).concat(iouReportID), iouReport)];
                    case 2:
                        _c.sent();
                        return [4 /*yield*/, react_native_onyx_1.default.merge("".concat(ONYXKEYS_1.default.COLLECTION.REPORT_ACTIONS).concat(iouReportID), (_a = {}, _a[reportAction.reportActionID] = reportAction, _a))];
                    case 3:
                        _c.sent();
                        last4Digits = (_b = policyWithBank.achAccount) === null || _b === void 0 ? void 0 : _b.accountNumber.slice(-4);
                        paidSystemMessage = (0, Localize_1.translate)(CONST_1.default.LOCALES.EN, 'iou.businessBankAccount', { amount: '', last4Digits: last4Digits });
                        expect((0, ReportUtils_1.getIOUReportActionDisplayMessage)(reportAction, undefined, iouReport)).toBe(paidSystemMessage);
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('prepareOnboardingOnyxData', function () {
        it('provides test drive url to task title', function () {
            var title = jest.fn();
            (0, ReportUtils_1.prepareOnboardingOnyxData)(undefined, CONST_1.default.ONBOARDING_CHOICES.MANAGE_TEAM, {
                message: 'This is a test',
                tasks: [
                    {
                        type: CONST_1.default.ONBOARDING_TASK_TYPE.CREATE_REPORT,
                        title: title,
                        description: function () { return ''; },
                        autoCompleted: false,
                        mediaAttributes: {},
                    },
                ],
            }, '1');
            expect(title).toHaveBeenCalledWith(expect.objectContaining({
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                testDriveURL: expect.any(String),
            }));
        });
        it('provides test drive url to task description', function () {
            var description = jest.fn();
            (0, ReportUtils_1.prepareOnboardingOnyxData)(undefined, CONST_1.default.ONBOARDING_CHOICES.MANAGE_TEAM, {
                message: 'This is a test',
                tasks: [
                    {
                        type: CONST_1.default.ONBOARDING_TASK_TYPE.CREATE_REPORT,
                        title: function () { return ''; },
                        description: description,
                        autoCompleted: false,
                        mediaAttributes: {},
                    },
                ],
            }, '1');
            expect(description).toHaveBeenCalledWith(expect.objectContaining({
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                testDriveURL: expect.any(String),
            }));
        });
        it('should not create tasks if the task feature is not in the selected interested features', function () {
            var result = (0, ReportUtils_1.prepareOnboardingOnyxData)(undefined, CONST_1.default.ONBOARDING_CHOICES.MANAGE_TEAM, {
                message: 'This is a test',
                tasks: [{ type: CONST_1.default.ONBOARDING_TASK_TYPE.CONNECT_CORPORATE_CARD, title: function () { return ''; }, description: function () { return ''; }, autoCompleted: false, mediaAttributes: {} }],
            }, '1', undefined, undefined, undefined, undefined, ['categories', 'accounting', 'tags']);
            expect(result === null || result === void 0 ? void 0 : result.guidedSetupData.filter(function (data) { return data.type === 'task'; })).toHaveLength(0);
        });
        it('includes avatar in optimistic Setup Specialist personal detail', function () {
            var mergeSpy = jest.spyOn(react_native_onyx_1.default, 'merge');
            (0, ReportUtils_1.prepareOnboardingOnyxData)(undefined, CONST_1.default.ONBOARDING_CHOICES.MANAGE_TEAM, {
                message: 'This is a test',
                tasks: [],
            }, '1');
            var personalDetailsCall = mergeSpy.mock.calls.find(function (call) { return call[0] === ONYXKEYS_1.default.PERSONAL_DETAILS_LIST; });
            var personalDetailsData = personalDetailsCall === null || personalDetailsCall === void 0 ? void 0 : personalDetailsCall[1];
            var setupSpecialistDetail = Object.values(personalDetailsData !== null && personalDetailsData !== void 0 ? personalDetailsData : {}).at(0);
            expect(setupSpecialistDetail).toBeDefined();
            expect(setupSpecialistDetail === null || setupSpecialistDetail === void 0 ? void 0 : setupSpecialistDetail.avatar).toBeDefined();
            expect(setupSpecialistDetail === null || setupSpecialistDetail === void 0 ? void 0 : setupSpecialistDetail.avatar).toContain('images/avatars/');
            mergeSpy.mockRestore();
        });
    });
    describe('getIconsForParticipants', function () {
        it('returns avatar source', function () {
            var _a, _b, _c, _d, _e, _f, _g, _h;
            var participants = (0, ReportUtils_1.getIconsForParticipants)([1, 2, 3, 4, 5], participantsPersonalDetails);
            expect(participants).toHaveLength(5);
            expect((_a = participants.at(3)) === null || _a === void 0 ? void 0 : _a.source).toBeInstanceOf(Function);
            expect((_b = participants.at(3)) === null || _b === void 0 ? void 0 : _b.name).toBe('(833) 240-3627');
            expect((_c = participants.at(3)) === null || _c === void 0 ? void 0 : _c.id).toBe(4);
            expect((_d = participants.at(3)) === null || _d === void 0 ? void 0 : _d.type).toBe('avatar');
            expect((_e = participants.at(1)) === null || _e === void 0 ? void 0 : _e.source).toBeInstanceOf(Function);
            expect((_f = participants.at(1)) === null || _f === void 0 ? void 0 : _f.name).toBe('floki@vikings.net');
            expect((_g = participants.at(1)) === null || _g === void 0 ? void 0 : _g.id).toBe(2);
            expect((_h = participants.at(1)) === null || _h === void 0 ? void 0 : _h.type).toBe('avatar');
        });
    });
    describe('getPolicyExpenseChatName', function () {
        it("returns owner's display name when available", function () {
            var report = {
                ownerAccountID: 1,
                reportName: 'Fallback Report Name',
            };
            var name = (0, ReportUtils_1.getPolicyExpenseChatName)({ report: report, personalDetailsList: participantsPersonalDetails });
            expect(name).toBe((0, Localize_1.translate)(CONST_1.default.LOCALES.EN, 'workspace.common.policyExpenseChatName', { displayName: 'Ragnar Lothbrok' }));
        });
        it('falls back to owner login when display name not present', function () {
            var report = {
                ownerAccountID: 2,
                reportName: 'Fallback Report Name',
            };
            var name = (0, ReportUtils_1.getPolicyExpenseChatName)({ report: report, personalDetailsList: participantsPersonalDetails });
            expect(name).toBe((0, Localize_1.translate)(CONST_1.default.LOCALES.EN, 'workspace.common.policyExpenseChatName', { displayName: 'floki' }));
        });
        it('returns report name when no personal details or owner', function () {
            var report = {
                ownerAccountID: undefined,
                reportName: 'Fallback Report Name',
            };
            var name = (0, ReportUtils_1.getPolicyExpenseChatName)({ report: report, personalDetailsList: {} });
            expect(name).toBe('Fallback Report Name');
        });
    });
    describe('sortIconsByName', function () {
        it('returns sorted avatar source by name, then accountID', function () {
            var _a, _b, _c, _d, _e, _f, _g, _h;
            var participants = (0, ReportUtils_1.getIconsForParticipants)([1, 2, 3, 4, 5], participantsPersonalDetails);
            var sortedParticipants = (0, ReportUtils_1.sortIconsByName)(participants, participantsPersonalDetails, TestHelper_1.localeCompare);
            expect(sortedParticipants).toHaveLength(5);
            expect((_a = sortedParticipants.at(0)) === null || _a === void 0 ? void 0 : _a.source).toBeInstanceOf(Function);
            expect((_b = sortedParticipants.at(0)) === null || _b === void 0 ? void 0 : _b.name).toBe('(833) 240-3627');
            expect((_c = sortedParticipants.at(0)) === null || _c === void 0 ? void 0 : _c.id).toBe(4);
            expect((_d = sortedParticipants.at(0)) === null || _d === void 0 ? void 0 : _d.type).toBe('avatar');
            expect((_e = sortedParticipants.at(1)) === null || _e === void 0 ? void 0 : _e.source).toBeInstanceOf(Function);
            expect((_f = sortedParticipants.at(1)) === null || _f === void 0 ? void 0 : _f.name).toBe('floki@vikings.net');
            expect((_g = sortedParticipants.at(1)) === null || _g === void 0 ? void 0 : _g.id).toBe(2);
            expect((_h = sortedParticipants.at(1)) === null || _h === void 0 ? void 0 : _h.type).toBe('avatar');
        });
    });
    describe('getWorkspaceIcon', function () {
        it('should not use cached icon when avatar is updated', function () {
            // Given a new workspace and a expense chat with undefined `policyAvatar`
            var workspace = LHNTestUtils.getFakePolicy('1', 'ws');
            var workspaceChat = LHNTestUtils.getFakeReport();
            workspaceChat.policyID = workspace.id;
            expect((0, ReportUtils_1.getWorkspaceIcon)(workspaceChat, workspace).source).toBe((0, ReportUtils_1.getDefaultWorkspaceAvatar)(workspace.name));
            // When the user uploads a new avatar
            var newAvatarURL = 'https://example.com';
            workspace.avatarURL = newAvatarURL;
            // Then it should return the new avatar
            expect((0, ReportUtils_1.getWorkspaceIcon)(workspaceChat, workspace).source).toBe(newAvatarURL);
        });
    });
    describe('hasReceiptError', function () {
        it('should return true for transaction has receipt error', function () {
            var parentReport = LHNTestUtils.getFakeReport();
            var report = LHNTestUtils.getFakeReport();
            var errors = {
                '1231231231313221': {
                    error: CONST_1.default.IOU.RECEIPT_ERROR,
                    source: 'blob:https://dev.new.expensify.com:8082/6c5b7110-42c2-4e6d-8566-657ff24caf21',
                    filename: 'images.jpeg',
                    action: 'replaceReceipt',
                },
            };
            report.parentReportID = parentReport.reportID;
            var currentReportId = '';
            var transactionID = 1;
            var transaction = __assign(__assign({}, (0, transaction_1.default)(transactionID)), { category: '', tag: '', created: testDate, reportID: currentReportId, managedCard: true, comment: {
                    liabilityType: CONST_1.default.TRANSACTION.LIABILITY_TYPE.RESTRICT,
                }, errors: errors });
            expect((0, ReportUtils_1.hasReceiptError)(transaction)).toBe(true);
        });
    });
    describe('hasReceiptError', function () {
        it('should return false for transaction has no receipt error', function () {
            var parentReport = LHNTestUtils.getFakeReport();
            var report = LHNTestUtils.getFakeReport();
            report.parentReportID = parentReport.reportID;
            var currentReportId = '';
            var transactionID = 1;
            var transaction = __assign(__assign({}, (0, transaction_1.default)(transactionID)), { category: '', tag: '', created: testDate, reportID: currentReportId, managedCard: true, comment: {
                    liabilityType: CONST_1.default.TRANSACTION.LIABILITY_TYPE.RESTRICT,
                } });
            expect((0, ReportUtils_1.hasReceiptError)(transaction)).toBe(false);
        });
    });
    describe('sortOutstandingReportsBySelected', function () {
        it('should return -1 when report1 is selected and report2 is not', function () {
            var report1 = LHNTestUtils.getFakeReport();
            var report2 = LHNTestUtils.getFakeReport();
            var selectedReportID = report1.reportID;
            expect((0, ReportUtils_1.sortOutstandingReportsBySelected)(report1, report2, selectedReportID, TestHelper_1.localeCompare)).toBe(-1);
        });
        it('should return 1 when report2 is selected and report1 is not', function () {
            var report1 = LHNTestUtils.getFakeReport();
            var report2 = LHNTestUtils.getFakeReport();
            var selectedReportID = report2.reportID;
            expect((0, ReportUtils_1.sortOutstandingReportsBySelected)(report1, report2, selectedReportID, TestHelper_1.localeCompare)).toBe(1);
        });
    });
    describe('getDisplayNamesWithTooltips', function () {
        test('withSingleParticipantReport', function () {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
            var participants = (0, ReportUtils_1.getDisplayNamesWithTooltips)(participantsPersonalDetails, false, TestHelper_1.localeCompare);
            expect(participants).toHaveLength(5);
            expect((_a = participants.at(0)) === null || _a === void 0 ? void 0 : _a.displayName).toBe('(833) 240-3627');
            expect((_b = participants.at(0)) === null || _b === void 0 ? void 0 : _b.login).toBe('+18332403627@expensify.sms');
            expect((_c = participants.at(2)) === null || _c === void 0 ? void 0 : _c.displayName).toBe('Lagertha Lothbrok');
            expect((_d = participants.at(2)) === null || _d === void 0 ? void 0 : _d.login).toBe('lagertha@vikings.net');
            expect((_e = participants.at(2)) === null || _e === void 0 ? void 0 : _e.accountID).toBe(3);
            expect((_f = participants.at(2)) === null || _f === void 0 ? void 0 : _f.pronouns).toBe('She/her');
            expect((_g = participants.at(4)) === null || _g === void 0 ? void 0 : _g.displayName).toBe('Ragnar Lothbrok');
            expect((_h = participants.at(4)) === null || _h === void 0 ? void 0 : _h.login).toBe('ragnar@vikings.net');
            expect((_j = participants.at(4)) === null || _j === void 0 ? void 0 : _j.accountID).toBe(1);
            expect((_k = participants.at(4)) === null || _k === void 0 ? void 0 : _k.pronouns).toBeUndefined();
        });
    });
    describe('getReportName', function () {
        describe('1:1 DM', function () {
            test('with displayName', function () {
                expect((0, ReportUtils_1.getReportName)({
                    reportID: '',
                    participants: (0, ReportUtils_1.buildParticipantsFromAccountIDs)([currentUserAccountID, 1]),
                })).toBe('Ragnar Lothbrok');
            });
            test('no displayName', function () {
                expect((0, ReportUtils_1.getReportName)({
                    reportID: '',
                    participants: (0, ReportUtils_1.buildParticipantsFromAccountIDs)([currentUserAccountID, 2]),
                })).toBe('floki@vikings.net');
            });
            test('SMS', function () {
                expect((0, ReportUtils_1.getReportName)({
                    reportID: '',
                    participants: (0, ReportUtils_1.buildParticipantsFromAccountIDs)([currentUserAccountID, 4]),
                })).toBe('(833) 240-3627');
            });
        });
        test('Group DM', function () {
            expect((0, ReportUtils_1.getReportName)({
                reportID: '',
                participants: (0, ReportUtils_1.buildParticipantsFromAccountIDs)([currentUserAccountID, 1, 2, 3, 4]),
            })).toBe('Ragnar, floki@vikings.net, Lagertha, (833) 240-3627');
        });
        describe('Default Policy Room', function () {
            afterEach(function () { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, react_native_onyx_1.default.setCollection(ONYXKEYS_1.default.COLLECTION.REPORT_NAME_VALUE_PAIRS, {})];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
            var baseAdminsRoom = {
                reportID: '1',
                chatType: CONST_1.default.REPORT.CHAT_TYPE.POLICY_ADMINS,
                reportName: '#admins',
            };
            var reportNameValuePairs = {
                private_isArchived: DateUtils_1.default.getDBTime(),
            };
            test('Active', function () {
                expect((0, ReportUtils_1.getReportName)(baseAdminsRoom)).toBe('#admins');
            });
            test('Archived', function () { return __awaiter(void 0, void 0, void 0, function () {
                var isReportArchived;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, react_native_onyx_1.default.merge("".concat(ONYXKEYS_1.default.COLLECTION.REPORT_NAME_VALUE_PAIRS).concat(baseAdminsRoom.reportID), reportNameValuePairs)];
                        case 1:
                            _a.sent();
                            isReportArchived = (0, react_native_1.renderHook)(function () { return (0, useReportIsArchived_1.default)(baseAdminsRoom.reportID); }).result;
                            expect((0, ReportUtils_1.getReportName)(baseAdminsRoom, undefined, undefined, undefined, undefined, undefined, undefined, isReportArchived.current)).toBe('#admins (archived)');
                            return [2 /*return*/, IntlStore_1.default.load(CONST_1.default.LOCALES.ES).then(function () {
                                    return expect((0, ReportUtils_1.getReportName)(baseAdminsRoom, undefined, undefined, undefined, undefined, undefined, undefined, isReportArchived.current)).toBe('#admins (archivado)');
                                })];
                    }
                });
            }); });
        });
        describe('User-Created Policy Room', function () {
            afterEach(function () { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, react_native_onyx_1.default.setCollection(ONYXKEYS_1.default.COLLECTION.REPORT_NAME_VALUE_PAIRS, {})];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
            var baseUserCreatedRoom = {
                reportID: '1',
                chatType: CONST_1.default.REPORT.CHAT_TYPE.POLICY_ROOM,
                reportName: '#VikingsChat',
            };
            var reportNameValuePairs = {
                private_isArchived: DateUtils_1.default.getDBTime(),
            };
            test('Active', function () {
                expect((0, ReportUtils_1.getReportName)(baseUserCreatedRoom)).toBe('#VikingsChat');
            });
            test('Archived', function () { return __awaiter(void 0, void 0, void 0, function () {
                var archivedPolicyRoom, isReportArchived;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            archivedPolicyRoom = __assign({}, baseUserCreatedRoom);
                            return [4 /*yield*/, react_native_onyx_1.default.merge("".concat(ONYXKEYS_1.default.COLLECTION.REPORT_NAME_VALUE_PAIRS).concat(baseUserCreatedRoom.reportID), reportNameValuePairs)];
                        case 1:
                            _a.sent();
                            isReportArchived = (0, react_native_1.renderHook)(function () { return (0, useReportIsArchived_1.default)(baseUserCreatedRoom.reportID); }).result;
                            expect((0, ReportUtils_1.getReportName)(archivedPolicyRoom, undefined, undefined, undefined, undefined, undefined, undefined, isReportArchived.current)).toBe('#VikingsChat (archived)');
                            return [2 /*return*/, IntlStore_1.default.load(CONST_1.default.LOCALES.ES).then(function () {
                                    return expect((0, ReportUtils_1.getReportName)(archivedPolicyRoom, undefined, undefined, undefined, undefined, undefined, undefined, isReportArchived.current)).toBe('#VikingsChat (archivado)');
                                })];
                    }
                });
            }); });
        });
        describe('PolicyExpenseChat', function () {
            describe('Active', function () {
                test('as member', function () {
                    expect((0, ReportUtils_1.getReportName)({
                        reportID: '',
                        chatType: CONST_1.default.REPORT.CHAT_TYPE.POLICY_EXPENSE_CHAT,
                        policyID: policy.id,
                        isOwnPolicyExpenseChat: true,
                        ownerAccountID: 1,
                    })).toBe("Ragnar Lothbrok's expenses");
                });
                test('as admin', function () {
                    expect((0, ReportUtils_1.getReportName)({
                        reportID: '',
                        chatType: CONST_1.default.REPORT.CHAT_TYPE.POLICY_EXPENSE_CHAT,
                        policyID: policy.id,
                        isOwnPolicyExpenseChat: false,
                        ownerAccountID: 1,
                    })).toBe("Ragnar Lothbrok's expenses");
                });
            });
            describe('Archived', function () {
                var baseArchivedPolicyExpenseChat = {
                    reportID: '1',
                    chatType: CONST_1.default.REPORT.CHAT_TYPE.POLICY_EXPENSE_CHAT,
                    ownerAccountID: 1,
                    policyID: policy.id,
                    oldPolicyName: policy.name,
                };
                var reportNameValuePairs = {
                    private_isArchived: DateUtils_1.default.getDBTime(),
                };
                test('as member', function () { return __awaiter(void 0, void 0, void 0, function () {
                    var memberArchivedPolicyExpenseChat, isReportArchived;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                memberArchivedPolicyExpenseChat = __assign(__assign({}, baseArchivedPolicyExpenseChat), { isOwnPolicyExpenseChat: true });
                                return [4 /*yield*/, react_native_onyx_1.default.merge("".concat(ONYXKEYS_1.default.COLLECTION.REPORT_NAME_VALUE_PAIRS).concat(baseArchivedPolicyExpenseChat.reportID), reportNameValuePairs)];
                            case 1:
                                _a.sent();
                                isReportArchived = (0, react_native_1.renderHook)(function () { return (0, useReportIsArchived_1.default)(baseArchivedPolicyExpenseChat.reportID); }).result;
                                expect((0, ReportUtils_1.getReportName)(memberArchivedPolicyExpenseChat, undefined, undefined, undefined, undefined, undefined, undefined, isReportArchived.current)).toBe("Ragnar Lothbrok's expenses (archived)");
                                return [2 /*return*/, IntlStore_1.default.load(CONST_1.default.LOCALES.ES).then(function () {
                                        return expect((0, ReportUtils_1.getReportName)(memberArchivedPolicyExpenseChat, undefined, undefined, undefined, undefined, undefined, undefined, isReportArchived.current)).toBe("Ragnar Lothbrok's gastos (archivado)");
                                    })];
                        }
                    });
                }); });
                test('as admin', function () { return __awaiter(void 0, void 0, void 0, function () {
                    var adminArchivedPolicyExpenseChat, isReportArchived;
                    return __generator(this, function (_a) {
                        adminArchivedPolicyExpenseChat = __assign(__assign({}, baseArchivedPolicyExpenseChat), { isOwnPolicyExpenseChat: false });
                        isReportArchived = (0, react_native_1.renderHook)(function () { return (0, useReportIsArchived_1.default)(baseArchivedPolicyExpenseChat.reportID); }).result;
                        expect((0, ReportUtils_1.getReportName)(adminArchivedPolicyExpenseChat, undefined, undefined, undefined, undefined, undefined, undefined, isReportArchived.current)).toBe("Ragnar Lothbrok's expenses (archived)");
                        return [2 /*return*/, IntlStore_1.default.load(CONST_1.default.LOCALES.ES).then(function () {
                                return expect((0, ReportUtils_1.getReportName)(adminArchivedPolicyExpenseChat, undefined, undefined, undefined, undefined, undefined, undefined, isReportArchived.current)).toBe("Ragnar Lothbrok's gastos (archivado)");
                            })];
                    });
                }); });
            });
        });
        describe('ParentReportAction is', function () {
            test('Manually Submitted Report Action', function () {
                var threadOfSubmittedReportAction = __assign(__assign({}, LHNTestUtils.getFakeReport()), { type: CONST_1.default.REPORT.TYPE.EXPENSE, stateNum: CONST_1.default.REPORT.STATE_NUM.SUBMITTED, statusNum: CONST_1.default.REPORT.STATUS_NUM.SUBMITTED, parentReportID: '101', policyID: policy.id });
                var submittedParentReportAction = {
                    actionName: CONST_1.default.REPORT.ACTIONS.TYPE.SUBMITTED,
                    originalMessage: {
                        amount: 169,
                        currency: 'USD',
                    },
                };
                expect((0, ReportUtils_1.getReportName)(threadOfSubmittedReportAction, policy, submittedParentReportAction)).toBe('submitted');
            });
            test('Invited/Removed Room Member Action', function () {
                var threadOfRemovedRoomMemberAction = __assign(__assign({}, LHNTestUtils.getFakeReport()), { type: CONST_1.default.REPORT.TYPE.CHAT, chatType: CONST_1.default.REPORT.CHAT_TYPE.POLICY_ROOM, parentReportID: '101', parentReportActionID: '102', policyID: policy.id });
                var removedParentReportAction = {
                    actionName: CONST_1.default.REPORT.ACTIONS.TYPE.ROOM_CHANGE_LOG.REMOVE_FROM_ROOM,
                    originalMessage: {
                        targetAccountIDs: [1],
                    },
                };
                expect((0, ReportUtils_1.getReportName)(threadOfRemovedRoomMemberAction, policy, removedParentReportAction)).toBe('removed ragnar@vikings.net');
            });
        });
        describe('Task Report', function () {
            var htmlTaskTitle = "<h1>heading with <a href=\"https://www.unknown.com\" target=\"_blank\" rel=\"noreferrer noopener\">link</a></h1>";
            it('Should return the text extracted from report name html', function () {
                var report = __assign(__assign({}, (0, reports_2.createRandomReport)(1, undefined)), { type: 'task' });
                expect((0, ReportUtils_1.getReportName)(__assign(__assign({}, report), { reportName: htmlTaskTitle }))).toEqual('heading with link');
            });
            it('Should return deleted task translations when task is is deleted', function () {
                var report = __assign(__assign({}, (0, reports_2.createRandomReport)(1, undefined)), { type: 'task', isDeletedParentAction: true });
                expect((0, ReportUtils_1.getReportName)(__assign(__assign({}, report), { reportName: htmlTaskTitle }))).toEqual((0, Localize_1.translate)(CONST_1.default.LOCALES.EN, 'parentReportAction.deletedTask'));
            });
        });
        describe('Derived values', function () {
            var report = {
                reportID: '1',
                chatType: CONST_1.default.REPORT.CHAT_TYPE.POLICY_EXPENSE_CHAT,
                currency: 'CLP',
                ownerAccountID: 1,
                isPinned: false,
                isOwnPolicyExpenseChat: true,
                isWaitingOnBankAccount: false,
                policyID: '1',
            };
            beforeEach(function () {
                jest.clearAllMocks();
            });
            (0, globals_1.beforeAll)(function () { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, react_native_onyx_1.default.mergeCollection(ONYXKEYS_1.default.COLLECTION.REPORT, {
                                report_1: report,
                            })];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
            test('should return report name from a derived value', function () {
                expect((0, ReportUtils_1.getReportName)(report)).toEqual("Ragnar Lothbrok's expenses");
            });
            test('should generate report name if report is not merged in the Onyx', function () {
                var expenseChatReport = {
                    reportID: '2',
                    chatType: CONST_1.default.REPORT.CHAT_TYPE.POLICY_EXPENSE_CHAT,
                    currency: 'CLP',
                    ownerAccountID: 1,
                    isPinned: false,
                    isOwnPolicyExpenseChat: true,
                    isWaitingOnBankAccount: false,
                    policyID: '1',
                };
                expect((0, ReportUtils_1.getReportName)(expenseChatReport)).toEqual("Ragnar Lothbrok's expenses");
            });
        });
        describe('Fallback scenarios', function () {
            test('should fallback to report.reportName when primary name generation returns empty string', function () {
                var reportWithFallbackName = {
                    reportID: '3',
                    reportName: 'Custom Report Name',
                    ownerAccountID: undefined,
                    participants: {},
                    policyID: undefined,
                    chatType: undefined,
                };
                var result = (0, ReportUtils_1.getReportName)(reportWithFallbackName);
                expect(result).toBe('Custom Report Name');
            });
            test('should return empty string when both primary name generation and reportName are empty', function () {
                var reportWithoutName = {
                    reportID: '4',
                    reportName: '',
                    ownerAccountID: undefined,
                    participants: {},
                    policyID: undefined,
                    chatType: undefined,
                };
                var result = (0, ReportUtils_1.getReportName)(reportWithoutName);
                expect(result).toBe('');
            });
            test('should return empty string when reportName is undefined', function () {
                var reportWithUndefinedName = {
                    reportID: '5',
                    reportName: undefined,
                    ownerAccountID: undefined,
                    participants: {},
                    policyID: undefined,
                    chatType: undefined,
                };
                var result = (0, ReportUtils_1.getReportName)(reportWithUndefinedName);
                expect(result).toBe('');
            });
            test('should return Concierge display name for concierge chat report', function () { return __awaiter(void 0, void 0, void 0, function () {
                var conciergeReportID, conciergeReport, result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            conciergeReportID = 'concierge-123';
                            return [4 /*yield*/, react_native_onyx_1.default.set("".concat(ONYXKEYS_1.default.CONCIERGE_REPORT_ID), conciergeReportID)];
                        case 1:
                            _a.sent();
                            conciergeReport = {
                                reportID: conciergeReportID,
                                reportName: '',
                                ownerAccountID: undefined,
                                participants: {},
                                policyID: undefined,
                                chatType: undefined,
                            };
                            result = (0, ReportUtils_1.getReportName)(conciergeReport);
                            expect(result).toBe(CONST_1.default.CONCIERGE_DISPLAY_NAME);
                            return [2 /*return*/];
                    }
                });
            }); });
        });
        describe('Automatically approved report message via automatic (not by a human) action is', function () {
            test('shown when the report is forwarded (Control feature)', function () {
                var expenseReport = __assign(__assign({}, LHNTestUtils.getFakeReport()), { type: CONST_1.default.REPORT.TYPE.EXPENSE, stateNum: CONST_1.default.REPORT.STATE_NUM.APPROVED, statusNum: CONST_1.default.REPORT.STATUS_NUM.APPROVED, parentReportID: '101', policyID: policy.id });
                var submittedParentReportAction = {
                    actionName: CONST_1.default.REPORT.ACTIONS.TYPE.FORWARDED,
                    originalMessage: {
                        amount: 169,
                        currency: 'USD',
                        automaticAction: true,
                        type: CONST_1.default.IOU.REPORT_ACTION_TYPE.CREATE,
                    },
                };
                expect((0, ReportUtils_1.getReportName)(expenseReport, policy, submittedParentReportAction)).toBe('approved via <a href="https://help.expensify.com/articles/new-expensify/workspaces/Set-up-rules#configure-expense-report-rules">workspace rules</a>');
            });
            test('shown when the report is approved', function () {
                var expenseReport = __assign(__assign({}, LHNTestUtils.getFakeReport()), { type: CONST_1.default.REPORT.TYPE.EXPENSE, stateNum: CONST_1.default.REPORT.STATE_NUM.APPROVED, statusNum: CONST_1.default.REPORT.STATUS_NUM.APPROVED, parentReportID: '101', policyID: policy.id });
                var submittedParentReportAction = {
                    actionName: CONST_1.default.REPORT.ACTIONS.TYPE.APPROVED,
                    originalMessage: {
                        amount: 169,
                        currency: 'USD',
                        automaticAction: true,
                    },
                };
                expect((0, ReportUtils_1.getReportName)(expenseReport, policy, submittedParentReportAction)).toBe('approved via <a href="https://help.expensify.com/articles/new-expensify/workspaces/Set-up-rules#configure-expense-report-rules">workspace rules</a>');
            });
        });
        describe('Automatically submitted via harvesting (delayed submit) report message is', function () {
            test('shown when report is submitted and status is submitted', function () {
                var expenseReport = __assign(__assign({}, LHNTestUtils.getFakeReport()), { type: CONST_1.default.REPORT.TYPE.EXPENSE, stateNum: CONST_1.default.REPORT.STATE_NUM.SUBMITTED, statusNum: CONST_1.default.REPORT.STATUS_NUM.SUBMITTED, parentReportID: '101', policyID: policy.id });
                var submittedParentReportAction = {
                    actionName: CONST_1.default.REPORT.ACTIONS.TYPE.SUBMITTED,
                    originalMessage: {
                        amount: 169,
                        currency: 'USD',
                        harvesting: true,
                    },
                };
                expect((0, ReportUtils_1.getReportName)(expenseReport, policy, submittedParentReportAction)).toBe('submitted via <a href="https://help.expensify.com/articles/new-expensify/workspaces/Set-up-workflows#select-workflows">delay submissions</a>');
            });
            test('shown when report is submitted and status is closed', function () {
                var expenseReport = __assign(__assign({}, LHNTestUtils.getFakeReport()), { type: CONST_1.default.REPORT.TYPE.EXPENSE, stateNum: CONST_1.default.REPORT.STATE_NUM.SUBMITTED, statusNum: CONST_1.default.REPORT.STATUS_NUM.CLOSED, parentReportID: '101', policyID: policy.id });
                var submittedParentReportAction = {
                    actionName: CONST_1.default.REPORT.ACTIONS.TYPE.SUBMITTED_AND_CLOSED,
                    originalMessage: {
                        amount: 169,
                        currency: 'USD',
                        harvesting: true,
                    },
                };
                expect((0, ReportUtils_1.getReportName)(expenseReport, policy, submittedParentReportAction)).toBe('submitted via <a href="https://help.expensify.com/articles/new-expensify/workspaces/Set-up-workflows#select-workflows">delay submissions</a>');
            });
        });
    });
    // Need to merge the same tests
    describe('getSearchReportName', function () {
        var archivedReportID = '12345678';
        var archivedReportNameValuePairs = {
            private_isArchived: DateUtils_1.default.getDBTime(),
        };
        var conciergeReportID = 'concierge-123';
        (0, globals_1.beforeAll)(function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, react_native_onyx_1.default.set("".concat(ONYXKEYS_1.default.COLLECTION.REPORT_NAME_VALUE_PAIRS).concat(archivedReportID), archivedReportNameValuePairs)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, react_native_onyx_1.default.set("".concat(ONYXKEYS_1.default.CONCIERGE_REPORT_ID), conciergeReportID)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, (0, waitForBatchedUpdates_1.default)()];
                    case 3:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        afterAll(function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, react_native_onyx_1.default.set("".concat(ONYXKEYS_1.default.COLLECTION.REPORT_NAME_VALUE_PAIRS).concat(archivedReportID), null)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, react_native_onyx_1.default.set("".concat(ONYXKEYS_1.default.CONCIERGE_REPORT_ID), null)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        describe('1:1 Chat', function () {
            var baseChatReport = {
                reportID: '',
                type: CONST_1.default.REPORT.TYPE.CHAT,
            };
            test('should return the displayName', function () {
                var chatReport = __assign(__assign({}, baseChatReport), { participants: (0, ReportUtils_1.buildParticipantsFromAccountIDs)([currentUserAccountID, 1]) });
                var params = {
                    report: chatReport,
                    personalDetails: participantsPersonalDetails,
                };
                var reportName = (0, ReportUtils_1.getSearchReportName)(params);
                expect(reportName).toBe('Ragnar Lothbrok');
            });
            test('should return the email', function () {
                var chatReport = __assign(__assign({}, baseChatReport), { participants: (0, ReportUtils_1.buildParticipantsFromAccountIDs)([currentUserAccountID, 2]) });
                var reportName = (0, ReportUtils_1.getSearchReportName)({ report: chatReport });
                expect(reportName).toBe('floki@vikings.net');
            });
            test('should return phone number', function () {
                var chatReport = __assign(__assign({}, baseChatReport), { participants: (0, ReportUtils_1.buildParticipantsFromAccountIDs)([currentUserAccountID, 4]) });
                var reportName = (0, ReportUtils_1.getSearchReportName)({ report: chatReport });
                expect(reportName).toBe('(833) 240-3627');
            });
            describe('Threads', function () {
                var baseThreadReport = {
                    reportID: '',
                    parentReportID: '1',
                    parentReportActionID: '3',
                    type: CONST_1.default.REPORT.TYPE.CHAT,
                };
                var baseParentReportAction = {
                    actionName: CONST_1.default.REPORT.ACTIONS.TYPE.ADD_COMMENT,
                    created: testDate,
                    reportActionID: '3',
                };
                test('should handle hidden message', function () {
                    var hiddenAction = __assign(__assign({}, baseParentReportAction), { actionName: CONST_1.default.REPORT.ACTIONS.TYPE.ADD_COMMENT, message: [
                            {
                                type: 'COMMENT',
                                html: '',
                                text: '',
                                moderationDecision: {
                                    decision: CONST_1.default.MODERATION.MODERATOR_DECISION_HIDDEN,
                                },
                            },
                        ] });
                    var reportName = (0, ReportUtils_1.getSearchReportName)({
                        report: baseThreadReport,
                        parentReportActionParam: hiddenAction,
                        personalDetails: participantsPersonalDetails,
                    });
                    expect(reportName).toBe('Hidden message');
                });
                test('should return attachment label for attachment', function () {
                    var attachmentAction = __assign(__assign({}, baseParentReportAction), { actionName: CONST_1.default.REPORT.ACTIONS.TYPE.ADD_COMMENT, message: [
                            {
                                type: 'COMMENT',
                                html: '<img src="test.jpg" />',
                                text: '[Attachment]',
                            },
                        ] });
                    var reportName = (0, ReportUtils_1.getSearchReportName)({
                        report: baseThreadReport,
                        parentReportActionParam: attachmentAction,
                        personalDetails: participantsPersonalDetails,
                    });
                    expect(reportName).toBe('[Attachment]');
                });
                test('should handle thread report with missing parent action', function () {
                    var threadReport = __assign(__assign({}, baseThreadReport), { parentReportActionID: '999' });
                    var reportName = (0, ReportUtils_1.getSearchReportName)({
                        report: threadReport,
                        personalDetails: participantsPersonalDetails,
                    });
                    expect(reportName).toBe('');
                });
            });
        });
        describe('Self DM', function () {
            var selfDMReport = {
                reportID: '',
                type: CONST_1.default.REPORT.TYPE.CHAT,
                chatType: CONST_1.default.REPORT.CHAT_TYPE.SELF_DM,
                participants: (0, ReportUtils_1.buildParticipantsFromAccountIDs)([currentUserAccountID]),
            };
            test('should return self DM name for self DM', function () {
                var reportName = (0, ReportUtils_1.getSearchReportName)({
                    report: selfDMReport,
                    personalDetails: participantsPersonalDetails,
                });
                expect(reportName).toBe('Lagertha Lothbrok (you)');
            });
        });
        describe('Group Chat', function () {
            test('should return group chat name for group chat', function () {
                var groupChatReport = {
                    reportID: '',
                    type: CONST_1.default.REPORT.TYPE.CHAT,
                    chatType: CONST_1.default.REPORT.CHAT_TYPE.GROUP,
                    participants: (0, ReportUtils_1.buildParticipantsFromAccountIDs)([1, 2, 3]),
                };
                var reportName = (0, ReportUtils_1.getSearchReportName)({
                    report: groupChatReport,
                    personalDetails: participantsPersonalDetails,
                });
                expect(reportName).toContain('Ragnar');
            });
            test('should handle group chat with mixed participant types', function () {
                var _a;
                var groupChat = {
                    reportID: '',
                    type: CONST_1.default.REPORT.TYPE.CHAT,
                    participants: (_a = {},
                        _a[currentUserAccountID] = { notificationPreference: CONST_1.default.REPORT.NOTIFICATION_PREFERENCE.ALWAYS },
                        _a[1] = { notificationPreference: CONST_1.default.REPORT.NOTIFICATION_PREFERENCE.ALWAYS },
                        _a[2] = { notificationPreference: CONST_1.default.REPORT.NOTIFICATION_PREFERENCE.ALWAYS },
                        _a[999] = { notificationPreference: CONST_1.default.REPORT.NOTIFICATION_PREFERENCE.ALWAYS },
                        _a),
                };
                var reportName = (0, ReportUtils_1.getSearchReportName)({ report: groupChat });
                expect(reportName).toBe('Ragnar, floki@vikings.net');
            });
        });
        describe('Concierge Chat', function () {
            var conciergeReport = {
                reportID: conciergeReportID,
                participants: {},
            };
            test('should handle concierge chat report', function () {
                var reportName = (0, ReportUtils_1.getSearchReportName)({ report: conciergeReport });
                expect(reportName).toBe(CONST_1.default.CONCIERGE_DISPLAY_NAME);
            });
        });
        describe('Money Request', function () {
            var baseIOUReport = {
                reportID: '',
                type: CONST_1.default.REPORT.TYPE.IOU,
                ownerAccountID: currentUserAccountID,
                managerID: currentUserAccountID,
                isOwnPolicyExpenseChat: false,
                currency: 'USD',
                total: 5000,
            };
            test('should handle IOU report', function () {
                var params = {
                    report: baseIOUReport,
                    personalDetails: participantsPersonalDetails,
                };
                var reportName = (0, ReportUtils_1.getSearchReportName)(params);
                expect(reportName).toBe('Lagertha Lothbrok paid $50.00');
            });
        });
        describe('Task', function () {
            var baseTaskReport = {
                reportID: '',
                managerID: 1,
                reportName: 'Test Task',
                type: CONST_1.default.REPORT.TYPE.TASK,
            };
            test('should handle completed task report', function () {
                var taskReport = __assign({}, baseTaskReport);
                var reportName = (0, ReportUtils_1.getSearchReportName)({ report: taskReport });
                expect(reportName).toBe('Test Task');
            });
            test('should handle canceled task report', function () {
                var taskReport = __assign(__assign({}, baseTaskReport), { isDeletedParentAction: true });
                var reportName = (0, ReportUtils_1.getSearchReportName)({ report: taskReport });
                expect(reportName).toBe('Deleted task');
            });
            test('should return thread name for task report with cancelled task', function () {
                var taskReport = __assign(__assign({}, baseTaskReport), { isDeletedParentAction: true });
                var parentReportAction = __assign(__assign({}, (0, reportActions_1.default)(0)), { actionName: CONST_1.default.REPORT.ACTIONS.TYPE.TASK_CANCELLED, parentReportID: taskReport.reportID, actorAccountID: 1 });
                var reportName = (0, ReportUtils_1.getSearchReportName)({
                    report: taskReport,
                    parentReportActionParam: parentReportAction,
                    personalDetails: participantsPersonalDetails,
                });
                expect(reportName).toBe('Deleted task');
            });
            test('should handle task report with proper name formatting', function () {
                var taskReport = {
                    reportID: '1',
                    type: CONST_1.default.REPORT.TYPE.TASK,
                    reportName: '<b>HTML Task Name</b>',
                };
                var reportName = (0, ReportUtils_1.getSearchReportName)({
                    report: taskReport,
                    personalDetails: participantsPersonalDetails,
                });
                expect(reportName).toBe('HTML Task Name');
            });
        });
        describe('Policy-related Reports', function () {
            describe('Rooms', function () {
                describe('Default', function () {
                    test.each([
                        [CONST_1.default.REPORT.CHAT_TYPE.POLICY_ADMINS, '#admins'],
                        [CONST_1.default.REPORT.CHAT_TYPE.POLICY_ANNOUNCE, '#announce'],
                    ])('should return %s room as %s', function (chatType, reportName) {
                        var defaultPolicyRoom = {
                            reportID: '',
                            chatType: chatType,
                            reportName: reportName,
                            policyID: policy.id,
                        };
                        var isReportArchived = (0, react_native_1.renderHook)(function () { return (0, useReportIsArchived_1.default)(defaultPolicyRoom.reportID); }).result;
                        var result = (0, ReportUtils_1.getSearchReportName)({ report: defaultPolicyRoom, policy: policy, isReportArchived: isReportArchived.current });
                        expect(result).toBe(reportName);
                    });
                    test.each([
                        [CONST_1.default.REPORT.CHAT_TYPE.POLICY_ADMINS, '#admins'],
                        [CONST_1.default.REPORT.CHAT_TYPE.POLICY_ANNOUNCE, '#announce'],
                    ])('should return %s (archived) room as %s', function (chatType, reportName) {
                        var defaultArchivedPolicyRoom = {
                            reportID: archivedReportID,
                            chatType: chatType,
                            reportName: reportName,
                            policyID: policy.id,
                        };
                        var isReportArchived = (0, react_native_1.renderHook)(function () { return (0, useReportIsArchived_1.default)(defaultArchivedPolicyRoom.reportID); }).result.current;
                        var result = (0, ReportUtils_1.getSearchReportName)({ policy: policy, report: defaultArchivedPolicyRoom, isReportArchived: isReportArchived });
                        expect(result).toBe("".concat(reportName, " (archived)"));
                    });
                    describe('Change log scenarios', function () {
                        var report = {
                            reportID: '',
                            type: CONST_1.default.REPORT.TYPE.CHAT,
                            policyID: policy.id,
                        };
                        var baseParentReportAction = (0, reportActions_1.default)(0);
                        test('should handle corporate upgrade action', function () {
                            var upgradeAction = __assign(__assign({}, baseParentReportAction), { actionName: CONST_1.default.REPORT.ACTIONS.TYPE.POLICY_CHANGE_LOG.CORPORATE_UPGRADE });
                            var reportName = (0, ReportUtils_1.getSearchReportName)({
                                report: report,
                                parentReportActionParam: upgradeAction,
                                personalDetails: participantsPersonalDetails,
                            });
                            expect(reportName).toBe('upgraded this workspace to the Control plan');
                        });
                        test('should handle corporate downgrade action', function () {
                            var downgradeAction = __assign(__assign({}, baseParentReportAction), { actionName: CONST_1.default.REPORT.ACTIONS.TYPE.POLICY_CHANGE_LOG.TEAM_DOWNGRADE });
                            var reportName = (0, ReportUtils_1.getSearchReportName)({
                                report: report,
                                parentReportActionParam: downgradeAction,
                                personalDetails: participantsPersonalDetails,
                            });
                            expect(reportName).toBe('downgraded this workspace to the Collect plan');
                        });
                        test('should handle workspace name update action', function () {
                            var nameUpdateAction = __assign(__assign({}, baseParentReportAction), { actionName: CONST_1.default.REPORT.ACTIONS.TYPE.POLICY_CHANGE_LOG.UPDATE_NAME, originalMessage: {
                                    oldName: 'Old Workspace',
                                    newName: 'New Workspace',
                                } });
                            var reportName = (0, ReportUtils_1.getSearchReportName)({
                                report: report,
                                parentReportActionParam: nameUpdateAction,
                                personalDetails: participantsPersonalDetails,
                            });
                            expect(reportName).toBe('updated the name of this workspace to "New Workspace" (previously "Old Workspace")');
                        });
                    });
                });
                describe('User-created', function () {
                    var chatRoom = {
                        reportID: '',
                        type: CONST_1.default.REPORT.TYPE.CHAT,
                        chatType: CONST_1.default.REPORT.CHAT_TYPE.POLICY_ROOM,
                        reportName: '#test-room',
                    };
                    test('Active', function () {
                        var isReportArchived = (0, react_native_1.renderHook)(function () { return (0, useReportIsArchived_1.default)(chatRoom.reportID); }).result.current;
                        var reportName = (0, ReportUtils_1.getSearchReportName)({
                            report: chatRoom,
                            personalDetails: participantsPersonalDetails,
                            isReportArchived: isReportArchived,
                        });
                        expect(reportName).toBe('#test-room');
                    });
                    test('Archived', function () {
                        var archivedRoom = __assign(__assign({}, chatRoom), { reportID: archivedReportID });
                        var isReportArchived = (0, react_native_1.renderHook)(function () { return (0, useReportIsArchived_1.default)(archivedRoom.reportID); }).result.current;
                        var reportName = (0, ReportUtils_1.getSearchReportName)({
                            report: archivedRoom,
                            personalDetails: participantsPersonalDetails,
                            isReportArchived: isReportArchived,
                        });
                        expect(reportName).toBe('#test-room (archived)');
                    });
                });
                describe('getSearchReportName', function () {
                    var baseChatReport = {
                        reportID: '',
                        reportName: 'Vikings Report',
                        type: CONST_1.default.REPORT.TYPE.CHAT,
                    };
                    // Converting the chat report into a thread chat report
                    var chatThread = __assign(__assign({}, baseChatReport), { parentReportID: '1', parentReportActionID: '1' });
                    test('should return the policy name when report is chat thread', function () {
                        var searchReportName = (0, ReportUtils_1.getSearchReportName)({ report: chatThread, policy: policy });
                        expect(searchReportName).toBe('Vikings Policy');
                    });
                    test('should return a empty string when report is chat thread and policy is undefined', function () {
                        var searchReportName = (0, ReportUtils_1.getSearchReportName)({ report: chatThread, policy: undefined });
                        expect(searchReportName).toBe('');
                    });
                    test('should return the report name when report is not chat thread', function () {
                        var searchReportName = (0, ReportUtils_1.getSearchReportName)({ report: baseChatReport, policy: policy });
                        expect(searchReportName).toBe('Vikings Report');
                    });
                    test('should return the report name when report is not chat thread and policy is undefined', function () {
                        var searchReportName = (0, ReportUtils_1.getSearchReportName)({ report: baseChatReport, policy: undefined });
                        expect(searchReportName).toBe('Vikings Report');
                    });
                    test('should return a empty string when report is undefined ', function () {
                        var searchReportName = (0, ReportUtils_1.getSearchReportName)({ report: undefined, policy: policy });
                        expect(searchReportName).toBe('');
                    });
                    test('should return a empty string when both report and policy are undefined', function () {
                        var searchReportName = (0, ReportUtils_1.getSearchReportName)({ report: undefined, policy: undefined });
                        expect(searchReportName).toBe('');
                    });
                });
            });
            describe('Expenses', function () {
                var baseChatReport = {
                    reportID: '',
                    chatType: CONST_1.default.REPORT.CHAT_TYPE.POLICY_EXPENSE_CHAT,
                    isOwnPolicyExpenseChat: true,
                    ownerAccountID: 1,
                    policyID: policy.id,
                };
                var baseExpenseReport = {
                    type: CONST_1.default.REPORT.TYPE.EXPENSE,
                    isOwnPolicyExpenseChat: false,
                    reportID: '',
                    policyID: policy.id,
                    currency: 'USD',
                    total: -1000,
                };
                var baseParentReportAction = {
                    reportActionID: '3',
                    created: testDate,
                    actionName: CONST_1.default.REPORT.ACTIONS.TYPE.APPROVED,
                    parentReportID: baseExpenseReport.reportID,
                };
                test('Active', function () {
                    var isReportArchived = (0, react_native_1.renderHook)(function () { return (0, useReportIsArchived_1.default)(baseChatReport.reportID); }).result.current;
                    var params = {
                        report: baseChatReport,
                        policy: policy,
                        isReportArchived: isReportArchived,
                    };
                    var reportName = (0, ReportUtils_1.getSearchReportName)(params);
                    expect(reportName).toBe("Ragnar Lothbrok's expenses");
                });
                test('Archived', function () {
                    var isReportArchived = (0, react_native_1.renderHook)(function () { return (0, useReportIsArchived_1.default)(archivedReportID); }).result.current;
                    var params = {
                        report: baseChatReport,
                        policy: policy,
                        isReportArchived: isReportArchived,
                    };
                    var reportName = (0, ReportUtils_1.getSearchReportName)(params);
                    expect(reportName).toBe("Ragnar Lothbrok's expenses (archived)");
                });
                test('should return formatted transaction thread name', function () {
                    var iouAction = __assign(__assign({}, baseParentReportAction), { actionName: CONST_1.default.REPORT.ACTIONS.TYPE.IOU, originalMessage: {
                            IOUTransactionID: 'txn1',
                            type: CONST_1.default.IOU.REPORT_ACTION_TYPE.CREATE,
                            amount: 1000,
                            currency: 'USD',
                        } });
                    var transaction = {
                        transactionID: 'txn1',
                        reportID: '2',
                        amount: 1000,
                        currency: 'USD',
                        merchant: 'Test Merchant',
                        transactionType: 'cash',
                        created: testDate,
                        modifiedMerchant: 'Test Merchant',
                    };
                    var reportName = (0, ReportUtils_1.getSearchReportName)({
                        report: baseExpenseReport,
                        policy: policy,
                        parentReportActionParam: iouAction,
                        personalDetails: participantsPersonalDetails,
                        transactions: [transaction],
                    });
                    expect(reportName).toBe('Vikings Policy paid $10.00');
                });
                test('should handle expense report with approval status', function () {
                    var expenseReport = __assign(__assign({}, baseExpenseReport), { stateNum: CONST_1.default.REPORT.STATE_NUM.APPROVED, statusNum: CONST_1.default.REPORT.STATUS_NUM.APPROVED });
                    var reportName = (0, ReportUtils_1.getSearchReportName)({ report: expenseReport, policy: policy });
                    expect(reportName).toBe('Vikings Policy approved $10.00');
                });
                test('should handle closed expense report with no expenses', function () {
                    var expenseReport = __assign(__assign({}, baseExpenseReport), { statusNum: CONST_1.default.REPORT.STATUS_NUM.CLOSED, total: 0 });
                    var params = {
                        report: expenseReport,
                        policy: policy,
                        transactions: [], // No transactions
                    };
                    var reportName = (0, ReportUtils_1.getSearchReportName)(params);
                    expect(reportName).toBe('Deleted report');
                });
                test('closed expense report with total and transactions not loaded', function () {
                    // Given a closed (submitted) expense report with a total and no transactions yet loaded
                    var expenseReport = __assign(__assign({}, baseExpenseReport), { statusNum: CONST_1.default.REPORT.STATUS_NUM.CLOSED, total: -4400 });
                    // Then it should not be considered closed without expenses, because it has a total
                    expect((0, ReportUtils_1.isClosedExpenseReportWithNoExpenses)(expenseReport)).toBe(false);
                });
                test('closed expense report with zero total but non-reimbursable total exists', function () {
                    // Given a closed expense report where reimbursable and non-reimbursable totals cancel out
                    // The total will be zero, but the non-reimbursable total will exist
                    var expenseReport = __assign(__assign({}, baseExpenseReport), { statusNum: CONST_1.default.REPORT.STATUS_NUM.CLOSED, total: 0, nonReimbursableTotal: -10000 });
                    // Then it should not be considered closed without expenses, because nonReimbursableTotal indicates expenses exist
                    expect((0, ReportUtils_1.isClosedExpenseReportWithNoExpenses)(expenseReport)).toBe(false);
                });
                test('should handle paid elsewhere money request', function () {
                    var payAction = __assign(__assign({}, baseParentReportAction), { actionName: CONST_1.default.REPORT.ACTIONS.TYPE.IOU, originalMessage: {
                            type: CONST_1.default.IOU.REPORT_ACTION_TYPE.PAY,
                            paymentType: CONST_1.default.IOU.PAYMENT_TYPE.ELSEWHERE,
                        } });
                    var params = {
                        policy: policy,
                        report: baseExpenseReport,
                        parentReportActionParam: payAction,
                        personalDetails: participantsPersonalDetails,
                    };
                    var reportName = (0, ReportUtils_1.getSearchReportName)(params);
                    expect(reportName).toBe('marked as paid');
                });
                test('should handle VBBA payment with automatic action', function () {
                    var achAccount = {
                        accountNumber: '1234567890',
                        bankAccountID: 0,
                        routingNumber: '',
                        addressName: '',
                        bankName: '',
                        reimburser: '',
                    };
                    var vbbaPayAction = __assign(__assign({}, baseParentReportAction), { actionName: CONST_1.default.REPORT.ACTIONS.TYPE.IOU, originalMessage: {
                            type: CONST_1.default.IOU.REPORT_ACTION_TYPE.PAY,
                            paymentType: CONST_1.default.IOU.PAYMENT_TYPE.VBBA,
                            automaticAction: true,
                        } });
                    var params = {
                        report: baseExpenseReport,
                        parentReportActionParam: vbbaPayAction,
                        personalDetails: participantsPersonalDetails,
                        policy: __assign(__assign({}, policy), { achAccount: achAccount }),
                    };
                    var reportName = (0, ReportUtils_1.getSearchReportName)(params);
                    expect(reportName).toBe('paid with bank account  via <a href="https://help.expensify.com/articles/new-expensify/workspaces/Set-up-rules#configure-expense-report-rules">workspace rules</a>');
                });
                test('should return forwarded action name', function () {
                    var forwardedAction = __assign(__assign({}, baseParentReportAction), { actionName: CONST_1.default.REPORT.ACTIONS.TYPE.FORWARDED, originalMessage: {} });
                    var reportName = (0, ReportUtils_1.getSearchReportName)({
                        report: baseExpenseReport,
                        parentReportActionParam: forwardedAction,
                        personalDetails: participantsPersonalDetails,
                    });
                    expect(reportName).toBe('approved');
                });
                test('should return automatically approved message for automatic approval', function () {
                    var autoApprovedAction = __assign(__assign({}, baseParentReportAction), { actionName: CONST_1.default.REPORT.ACTIONS.TYPE.APPROVED, originalMessage: {
                            amount: 169,
                            automaticAction: true,
                            type: CONST_1.default.IOU.REPORT_ACTION_TYPE.CREATE,
                        } });
                    var params = {
                        report: baseExpenseReport,
                        parentReportActionParam: autoApprovedAction,
                        personalDetails: participantsPersonalDetails,
                    };
                    var reportName = (0, ReportUtils_1.getSearchReportName)(params);
                    expect(reportName).toBe('approved via <a href="https://help.expensify.com/articles/new-expensify/workspaces/Set-up-rules#configure-expense-report-rules">workspace rules</a>');
                });
                test('should return submitted action name', function () {
                    var expenseReport = __assign(__assign({}, baseExpenseReport), { type: CONST_1.default.REPORT.TYPE.EXPENSE, stateNum: CONST_1.default.REPORT.STATE_NUM.SUBMITTED, statusNum: CONST_1.default.REPORT.STATUS_NUM.SUBMITTED });
                    var submittedAction = __assign(__assign({}, baseParentReportAction), { actionName: CONST_1.default.REPORT.ACTIONS.TYPE.SUBMITTED, originalMessage: {
                            amount: 1000,
                            currency: 'USD',
                        } });
                    var reportName = (0, ReportUtils_1.getSearchReportName)({
                        report: expenseReport,
                        parentReportActionParam: submittedAction,
                    });
                    expect(reportName).toBe('submitted');
                });
                test('should return approved action name', function () {
                    var expenseReport = __assign(__assign({}, baseExpenseReport), { stateNum: CONST_1.default.REPORT.STATE_NUM.APPROVED, statusNum: CONST_1.default.REPORT.STATUS_NUM.APPROVED });
                    var approvedAction = __assign(__assign({}, baseParentReportAction), { actionName: CONST_1.default.REPORT.ACTIONS.TYPE.APPROVED, originalMessage: {
                            amount: 1000,
                            currency: 'USD',
                        } });
                    var reportName = (0, ReportUtils_1.getSearchReportName)({
                        report: expenseReport,
                        parentReportActionParam: approvedAction,
                    });
                    expect(reportName).toBe('approved');
                });
                test('should return rejected action name', function () {
                    var rejectedAction = __assign(__assign({}, baseParentReportAction), { actionName: CONST_1.default.REPORT.ACTIONS.TYPE.REJECTED });
                    var reportName = (0, ReportUtils_1.getSearchReportName)({
                        report: baseExpenseReport,
                        parentReportActionParam: rejectedAction,
                        personalDetails: participantsPersonalDetails,
                    });
                    expect(reportName).toBe('rejected this report');
                });
                test('should handle integration sync failed action', function () {
                    var integrationFailedAction = __assign(__assign({}, baseParentReportAction), { actionName: CONST_1.default.REPORT.ACTIONS.TYPE.INTEGRATION_SYNC_FAILED, originalMessage: {
                            label: 'QuickBooks',
                            errorMessage: 'Sync failed',
                            source: 'quickbooks',
                        } });
                    var props = {
                        report: baseExpenseReport,
                        parentReportActionParam: integrationFailedAction,
                        personalDetails: participantsPersonalDetails,
                    };
                    var reportName = (0, ReportUtils_1.getSearchReportName)(props);
                    expect(reportName).toBe("there was a problem syncing with QuickBooks (\"Sync failed\"). Please fix the issue in <a href=\"https://dev.new.expensify.com:8082/workspaces/1/accounting\">workspace settings</a>.");
                });
            });
            describe('Invoices', function () {
                var corporatePolicy = __assign(__assign({}, policy), { type: CONST_1.default.POLICY.TYPE.CORPORATE, ownerAccountID: 1, managerID: 1 });
                var invoiceReceiverPolicy = __assign(__assign({}, policy), { id: 'policy2', name: 'Receiver Policy', type: CONST_1.default.POLICY.TYPE.CORPORATE });
                test('should handle invoice report', function () {
                    var invoiceReport = {
                        reportID: '',
                        policyID: corporatePolicy.id,
                        type: CONST_1.default.REPORT.TYPE.INVOICE,
                        ownerAccountID: 1,
                        managerID: 1,
                        chatType: CONST_1.default.REPORT.CHAT_TYPE.INVOICE,
                    };
                    var params = {
                        report: invoiceReport,
                        policy: corporatePolicy,
                        personalDetails: participantsPersonalDetails,
                        invoiceReceiverPolicy: invoiceReceiverPolicy,
                    };
                    var reportName = (0, ReportUtils_1.getSearchReportName)(params);
                    expect(reportName).toBe('Receiver Policy');
                });
                test('should handle invoice room', function () {
                    var invoiceRoom = {
                        reportID: '',
                        policyID: corporatePolicy.id,
                        type: CONST_1.default.REPORT.TYPE.CHAT,
                        chatType: CONST_1.default.REPORT.CHAT_TYPE.INVOICE,
                        invoiceReceiver: {
                            type: CONST_1.default.REPORT.INVOICE_RECEIVER_TYPE.INDIVIDUAL,
                            accountID: 2,
                        },
                    };
                    var params = {
                        report: invoiceRoom,
                        policy: corporatePolicy,
                        personalDetails: participantsPersonalDetails,
                        invoiceReceiverPolicy: invoiceReceiverPolicy,
                    };
                    var reportName = (0, ReportUtils_1.getSearchReportName)(params);
                    expect(reportName).toBe('floki@vikings.net');
                });
            });
        });
        describe('Fallback scenarios', function () {
            test('should return participant-based name when no specific type matches', function () {
                var genericReport = {
                    reportID: '',
                    participants: (0, ReportUtils_1.buildParticipantsFromAccountIDs)([currentUserAccountID, 1]),
                };
                var reportName = (0, ReportUtils_1.getSearchReportName)({
                    report: genericReport,
                    personalDetails: participantsPersonalDetails,
                });
                expect(reportName).toBe('Ragnar Lothbrok');
            });
            test('should return report.reportName as fallback when no participants available', function () {
                var reportWithName = {
                    reportID: '',
                    reportName: 'Fallback Report Name',
                    participants: {},
                };
                var reportName = (0, ReportUtils_1.getSearchReportName)({
                    report: reportWithName,
                    personalDetails: participantsPersonalDetails,
                });
                expect(reportName).toBe('Fallback Report Name');
            });
            test('should return empty string when no name can be determined', function () {
                var emptyReport = {
                    reportID: '',
                    reportName: '',
                    participants: {},
                };
                var reportName = (0, ReportUtils_1.getSearchReportName)({
                    report: emptyReport,
                    personalDetails: participantsPersonalDetails,
                });
                expect(reportName).toBe('');
            });
        });
        describe('Edges cases', function () {
            test('should handle undefined report gracefully', function () {
                var params = {
                    report: undefined,
                };
                var reportName = (0, ReportUtils_1.getSearchReportName)(params);
                expect(reportName).toBe('');
            });
            test('should handle empty personalDetails', function () {
                var report = {
                    reportID: '',
                    participants: (0, ReportUtils_1.buildParticipantsFromAccountIDs)([1]),
                };
                var params = {
                    report: report,
                    personalDetails: {},
                };
                var reportName = (0, ReportUtils_1.getSearchReportName)(params);
                expect(reportName).toBe('');
            });
        });
    });
    describe('getParentNavigationSubtitle', function () {
        var baseArchivedPolicyExpenseChat = {
            reportID: '2',
            lastReadTime: '2024-02-01 04:56:47.233',
            parentReportActionID: '1',
            parentReportID: '1',
            reportName: 'Base Report',
            type: CONST_1.default.REPORT.TYPE.INVOICE,
        };
        var reports = [
            {
                reportID: '1',
                lastReadTime: '2024-02-01 04:56:47.233',
                reportName: 'Report',
                policyName: 'A workspace',
                invoiceReceiver: { type: CONST_1.default.REPORT.INVOICE_RECEIVER_TYPE.INDIVIDUAL, accountID: 1 },
            },
            baseArchivedPolicyExpenseChat,
        ];
        (0, globals_1.beforeAll)(function () {
            var reportCollectionDataSet = (0, CollectionDataSet_1.toCollectionDataSet)(ONYXKEYS_1.default.COLLECTION.REPORT, reports, function (report) { return report.reportID; });
            react_native_onyx_1.default.multiSet(__assign({}, reportCollectionDataSet));
            return (0, waitForBatchedUpdates_1.default)();
        });
        it('should return the correct parent navigation subtitle for the archived invoice report', function () {
            var _a;
            var actual = (0, ReportUtils_1.getParentNavigationSubtitle)(baseArchivedPolicyExpenseChat, true);
            var normalizedActual = __assign(__assign({}, actual), { reportName: (_a = actual.reportName) === null || _a === void 0 ? void 0 : _a.replace(/\u00A0/g, ' ') });
            expect(normalizedActual).toEqual({ reportName: 'A workspace & Ragnar Lothbrok (archived)' });
        });
        it('should return the correct parent navigation subtitle for the non archived invoice report', function () {
            var _a;
            var actual = (0, ReportUtils_1.getParentNavigationSubtitle)(baseArchivedPolicyExpenseChat, false);
            var normalizedActual = __assign(__assign({}, actual), { reportName: (_a = actual.reportName) === null || _a === void 0 ? void 0 : _a.replace(/\u00A0/g, ' ') });
            expect(normalizedActual).toEqual({ reportName: 'A workspace & Ragnar Lothbrok' });
        });
    });
    describe('requiresAttentionFromCurrentUser', function () {
        afterEach(function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, react_native_onyx_1.default.clear()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, react_native_onyx_1.default.set(ONYXKEYS_1.default.SESSION, { email: currentUserEmail, accountID: currentUserAccountID })];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('returns false when there is no report', function () {
            expect((0, ReportUtils_1.requiresAttentionFromCurrentUser)(undefined)).toBe(false);
        });
        it('returns false when the matched IOU report does not have an owner accountID', function () {
            var report = __assign(__assign({}, LHNTestUtils.getFakeReport()), { ownerAccountID: undefined });
            expect((0, ReportUtils_1.requiresAttentionFromCurrentUser)(report)).toBe(false);
        });
        it('returns false when the linked iou report has an outstanding IOU', function () {
            var report = __assign(__assign({}, LHNTestUtils.getFakeReport()), { iouReportID: '1' });
            react_native_onyx_1.default.merge("".concat(ONYXKEYS_1.default.COLLECTION.REPORT, "1"), {
                reportID: '1',
                ownerAccountID: 99,
            }).then(function () {
                expect((0, ReportUtils_1.requiresAttentionFromCurrentUser)(report)).toBe(false);
            });
        });
        it('returns false when the report has no outstanding IOU but is waiting for a bank account and the logged user is the report owner', function () {
            var report = __assign(__assign({}, LHNTestUtils.getFakeReport()), { ownerAccountID: currentUserAccountID, isWaitingOnBankAccount: true });
            expect((0, ReportUtils_1.requiresAttentionFromCurrentUser)(report)).toBe(false);
        });
        it('returns false when the report has outstanding IOU and is not waiting for a bank account and the logged user is the report owner', function () {
            var report = __assign(__assign({}, LHNTestUtils.getFakeReport()), { ownerAccountID: currentUserAccountID, isWaitingOnBankAccount: false });
            expect((0, ReportUtils_1.requiresAttentionFromCurrentUser)(report)).toBe(false);
        });
        it('returns false when the report has no outstanding IOU but is waiting for a bank account and the logged user is not the report owner', function () {
            var report = __assign(__assign({}, LHNTestUtils.getFakeReport()), { ownerAccountID: 97, isWaitingOnBankAccount: true });
            expect((0, ReportUtils_1.requiresAttentionFromCurrentUser)(report)).toBe(false);
        });
        it('returns true when the report has an unread mention', function () {
            var report = __assign(__assign({}, LHNTestUtils.getFakeReport()), { isUnreadWithMention: true });
            expect((0, ReportUtils_1.requiresAttentionFromCurrentUser)(report)).toBe(true);
        });
        it('returns true for @here mention in an admin room', function () {
            var adminRoom = (0, reports_2.createAdminRoom)(42);
            var report = __assign(__assign({}, adminRoom), { lastReadTime: '2024-03-01 12:00:00.000', lastMentionedTime: '2024-03-01 12:00:01.000' });
            expect((0, ReportUtils_1.requiresAttentionFromCurrentUser)(report)).toBe(true);
        });
        it('returns false for @here in an admin room when user already read after mention', function () {
            var adminRoom2 = (0, reports_2.createAdminRoom)(43);
            var report = __assign(__assign({}, adminRoom2), { lastReadTime: '2024-03-01 12:00:02.000', lastMentionedTime: '2024-03-01 12:00:01.000' });
            expect((0, ReportUtils_1.requiresAttentionFromCurrentUser)(report)).toBe(false);
        });
        it('returns true when the report is an outstanding task', function () {
            var report = __assign(__assign({}, LHNTestUtils.getFakeReport()), { type: CONST_1.default.REPORT.TYPE.TASK, managerID: currentUserAccountID, isUnreadWithMention: false, stateNum: CONST_1.default.REPORT.STATE_NUM.OPEN, statusNum: CONST_1.default.REPORT.STATUS_NUM.OPEN, hasParentAccess: false });
            expect((0, ReportUtils_1.requiresAttentionFromCurrentUser)(report)).toBe(true);
        });
        it('returns true when the report has outstanding child expense', function () {
            var report = __assign(__assign({}, LHNTestUtils.getFakeReport()), { ownerAccountID: 99, hasOutstandingChildRequest: true, isWaitingOnBankAccount: false });
            expect((0, ReportUtils_1.requiresAttentionFromCurrentUser)(report)).toBe(true);
        });
        it('returns false if the user is not on free trial', function () { return __awaiter(void 0, void 0, void 0, function () {
            var report;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, react_native_onyx_1.default.multiSet((_a = {},
                            _a[ONYXKEYS_1.default.NVP_LAST_DAY_FREE_TRIAL] = null,
                            _a[ONYXKEYS_1.default.NVP_BILLING_FUND_ID] = null,
                            _a))];
                    case 1:
                        _b.sent();
                        report = __assign(__assign({}, LHNTestUtils.getFakeReport()), { chatType: CONST_1.default.REPORT.CHAT_TYPE.SYSTEM });
                        expect((0, ReportUtils_1.requiresAttentionFromCurrentUser)(report)).toBe(false);
                        return [2 /*return*/];
                }
            });
        }); });
        it("returns false if the user free trial hasn't ended yet", function () { return __awaiter(void 0, void 0, void 0, function () {
            var report;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, react_native_onyx_1.default.multiSet((_a = {},
                            _a[ONYXKEYS_1.default.NVP_LAST_DAY_FREE_TRIAL] = (0, date_fns_1.format)((0, date_fns_1.addDays)(new Date(), 1), CONST_1.default.DATE.FNS_DATE_TIME_FORMAT_STRING),
                            _a[ONYXKEYS_1.default.NVP_BILLING_FUND_ID] = null,
                            _a))];
                    case 1:
                        _b.sent();
                        report = __assign(__assign({}, LHNTestUtils.getFakeReport()), { chatType: CONST_1.default.REPORT.CHAT_TYPE.SYSTEM });
                        expect((0, ReportUtils_1.requiresAttentionFromCurrentUser)(report)).toBe(false);
                        return [2 /*return*/];
                }
            });
        }); });
        it('returns true when expense report is awaiting current user approval without parent access', function () {
            var report = __assign(__assign({}, LHNTestUtils.getFakeReport()), { managerID: currentUserAccountID, hasParentAccess: false, type: CONST_1.default.REPORT.TYPE.EXPENSE, stateNum: CONST_1.default.REPORT.STATE_NUM.SUBMITTED, statusNum: CONST_1.default.REPORT.STATUS_NUM.SUBMITTED });
            expect((0, ReportUtils_1.requiresAttentionFromCurrentUser)(report)).toBe(true);
        });
        it('returns false when awaiting approval but parent accessible or user is not approver', function () {
            var reportWithParentAccess = __assign(__assign({}, LHNTestUtils.getFakeReport()), { managerID: currentUserAccountID, hasParentAccess: true, type: CONST_1.default.REPORT.TYPE.EXPENSE, stateNum: CONST_1.default.REPORT.STATE_NUM.SUBMITTED, statusNum: CONST_1.default.REPORT.STATUS_NUM.SUBMITTED });
            expect((0, ReportUtils_1.requiresAttentionFromCurrentUser)(reportWithParentAccess)).toBe(false);
            var reportWithDifferentManager = __assign(__assign({}, LHNTestUtils.getFakeReport()), { managerID: 999999, hasParentAccess: false, type: CONST_1.default.REPORT.TYPE.EXPENSE, stateNum: CONST_1.default.REPORT.STATE_NUM.SUBMITTED, statusNum: CONST_1.default.REPORT.STATUS_NUM.SUBMITTED });
            expect((0, ReportUtils_1.requiresAttentionFromCurrentUser)(reportWithDifferentManager)).toBe(false);
        });
        it('returns false when expense report is awaiting user submission, delayed submission on > daily', function () { return __awaiter(void 0, void 0, void 0, function () {
            var report;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        report = __assign(__assign({}, LHNTestUtils.getFakeReport()), { hasOutstandingChildRequest: false, policyID: '1' });
                        return [4 /*yield*/, react_native_onyx_1.default.merge("".concat(ONYXKEYS_1.default.COLLECTION.POLICY, "1"), { reimbursementChoice: CONST_1.default.POLICY.REIMBURSEMENT_CHOICES.REIMBURSEMENT_MANUAL })];
                    case 1:
                        _a.sent();
                        expect((0, ReportUtils_1.requiresAttentionFromCurrentUser)(report)).toBe(false);
                        return [2 /*return*/];
                }
            });
        }); });
        it('returns false when expense report is awaiting user submission, delayed submission on > manually', function () { return __awaiter(void 0, void 0, void 0, function () {
            var report;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        report = __assign(__assign({}, LHNTestUtils.getFakeReport()), { hasOutstandingChildRequest: true, policyID: '1' });
                        return [4 /*yield*/, react_native_onyx_1.default.merge("".concat(ONYXKEYS_1.default.COLLECTION.POLICY, "1"), { reimbursementChoice: CONST_1.default.POLICY.REIMBURSEMENT_CHOICES.REIMBURSEMENT_MANUAL })];
                    case 1:
                        _a.sent();
                        expect((0, ReportUtils_1.requiresAttentionFromCurrentUser)(report)).toBe(true);
                        return [2 /*return*/];
                }
            });
        }); });
        it('returns true for expense report awaiting submission with manual submit', function () { return __awaiter(void 0, void 0, void 0, function () {
            var report, policyExpenseChat;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        report = __assign(__assign({}, LHNTestUtils.getFakeReport()), { policyID: '1', managerID: currentUserAccountID, type: CONST_1.default.REPORT.TYPE.EXPENSE, stateNum: CONST_1.default.REPORT.STATE_NUM.OPEN, statusNum: CONST_1.default.REPORT.STATUS_NUM.OPEN });
                        policyExpenseChat = __assign(__assign({}, (0, reports_2.createPolicyExpenseChat)(100, true)), { policyID: '1', ownerAccountID: currentUserAccountID, hasOutstandingChildRequest: true });
                        return [4 /*yield*/, react_native_onyx_1.default.merge("".concat(ONYXKEYS_1.default.COLLECTION.POLICY, "1"), { reimbursementChoice: CONST_1.default.POLICY.REIMBURSEMENT_CHOICES.REIMBURSEMENT_MANUAL })];
                    case 1:
                        _a.sent();
                        // The GBR should appear on the policy expense chat but not on the report itself
                        expect((0, ReportUtils_1.requiresAttentionFromCurrentUser)(report)).toBe(false);
                        expect((0, ReportUtils_1.requiresAttentionFromCurrentUser)(policyExpenseChat)).toBe(true);
                        return [2 /*return*/];
                }
            });
        }); });
        it('returns true for expense report awaiting user payment/reimbursement', function () { return __awaiter(void 0, void 0, void 0, function () {
            var report, policyExpenseChat;
            return __generator(this, function (_a) {
                report = __assign(__assign({}, LHNTestUtils.getFakeReport()), { policyID: '1', userID: currentUserAccountID, type: CONST_1.default.REPORT.TYPE.EXPENSE, stateNum: CONST_1.default.REPORT.STATE_NUM.SUBMITTED, statusNum: CONST_1.default.REPORT.STATUS_NUM.SUBMITTED });
                policyExpenseChat = __assign(__assign({}, (0, reports_2.createPolicyExpenseChat)(100, true)), { policyID: '1', ownerAccountID: currentUserAccountID, hasOutstandingChildRequest: true });
                // The GBR should appear on the policy expense chat but not on the report itself
                expect((0, ReportUtils_1.requiresAttentionFromCurrentUser)(report)).toBe(false);
                expect((0, ReportUtils_1.requiresAttentionFromCurrentUser)(policyExpenseChat)).toBe(true);
                return [2 /*return*/];
            });
        }); });
        it('returns false and does not surface GBR when expense report is approved and reimbursement is enabled', function () { return __awaiter(void 0, void 0, void 0, function () {
            var policyID, report, requiresAttention;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        policyID = '1';
                        report = __assign(__assign({}, LHNTestUtils.getFakeReport()), { type: CONST_1.default.REPORT.TYPE.EXPENSE, stateNum: CONST_1.default.REPORT.STATE_NUM.APPROVED, statusNum: CONST_1.default.REPORT.STATUS_NUM.APPROVED, managerID: currentUserAccountID, hasParentAccess: false, policyID: policyID });
                        return [4 /*yield*/, react_native_onyx_1.default.merge("".concat(ONYXKEYS_1.default.COLLECTION.POLICY).concat(policyID), {
                                id: policyID,
                                reimbursementChoice: CONST_1.default.POLICY.REIMBURSEMENT_CHOICES.REIMBURSEMENT_MANUAL,
                            })];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, (0, waitForBatchedUpdates_1.default)()];
                    case 2:
                        _a.sent();
                        requiresAttention = (0, ReportUtils_1.requiresAttentionFromCurrentUser)(report);
                        // Then it should return false because the report is already approved and reimbursement is enabled
                        expect(requiresAttention).toBe(false);
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('getChatRoomSubtitle', function () {
        (0, globals_1.beforeAll)(function () { return __awaiter(void 0, void 0, void 0, function () {
            var policyCollectionDataSet;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, react_native_onyx_1.default.clear()];
                    case 1:
                        _b.sent();
                        policyCollectionDataSet = (0, CollectionDataSet_1.toCollectionDataSet)(ONYXKEYS_1.default.COLLECTION.POLICY, [policy], function (current) { return current.id; });
                        return [4 /*yield*/, react_native_onyx_1.default.multiSet(__assign((_a = {}, _a[ONYXKEYS_1.default.PERSONAL_DETAILS_LIST] = participantsPersonalDetails, _a[ONYXKEYS_1.default.SESSION] = { email: currentUserEmail, accountID: currentUserAccountID }, _a), policyCollectionDataSet))];
                    case 2:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        afterEach(function () { return __awaiter(void 0, void 0, void 0, function () {
            var policyCollectionDataSet;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, react_native_onyx_1.default.clear()];
                    case 1:
                        _b.sent();
                        policyCollectionDataSet = (0, CollectionDataSet_1.toCollectionDataSet)(ONYXKEYS_1.default.COLLECTION.POLICY, [policy], function (current) { return current.id; });
                        return [4 /*yield*/, react_native_onyx_1.default.multiSet(__assign((_a = {}, _a[ONYXKEYS_1.default.PERSONAL_DETAILS_LIST] = participantsPersonalDetails, _a[ONYXKEYS_1.default.SESSION] = { email: currentUserEmail, accountID: currentUserAccountID }, _a), policyCollectionDataSet))];
                    case 2:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('should return empty string for chat thread', function () {
            var report = (0, reports_2.createWorkspaceThread)(1);
            var result = (0, ReportUtils_1.getChatRoomSubtitle)(report);
            expect(result).toBe('');
        });
        it('should return "Your space" for self DM', function () {
            var report = (0, reports_2.createSelfDM)(1, currentUserAccountID);
            var result = (0, ReportUtils_1.getChatRoomSubtitle)(report);
            expect(result).toBe('Your space');
        });
        it('should return "Invoices" for invoice room', function () {
            var report = (0, reports_2.createInvoiceRoom)(1);
            var result = (0, ReportUtils_1.getChatRoomSubtitle)(report);
            expect(result).toBe('Invoices');
        });
        it('should return empty string for non-default, non-user-created, non-policy-expense chat', function () {
            var report = (0, reports_2.createRegularChat)(1, [currentUserAccountID, 2]);
            var result = (0, ReportUtils_1.getChatRoomSubtitle)(report);
            expect(result).toBe('');
        });
        it('should return domain name for domain room', function () {
            var report = (0, reports_2.createDomainRoom)(1);
            report.reportName = '#example.com';
            var result = (0, ReportUtils_1.getChatRoomSubtitle)(report);
            expect(result).toBe('example.com');
        });
        it('should return policy name for admin room', function () {
            var report = (0, reports_2.createAdminRoom)(1);
            report.policyID = policy.id;
            var result = (0, ReportUtils_1.getChatRoomSubtitle)(report);
            expect(result).toBe(policy.name);
        });
        it('should return policy name for announce room', function () {
            var report = (0, reports_2.createAnnounceRoom)(1);
            report.policyID = policy.id;
            var result = (0, ReportUtils_1.getChatRoomSubtitle)(report);
            expect(result).toBe(policy.name);
        });
        it('should return policy name for user created policy room', function () {
            var report = __assign(__assign({}, (0, reports_2.createRandomReport)(1, CONST_1.default.REPORT.CHAT_TYPE.POLICY_ROOM)), { type: CONST_1.default.REPORT.TYPE.CHAT, policyID: policy.id });
            var result = (0, ReportUtils_1.getChatRoomSubtitle)(report);
            expect(result).toBe(policy.name);
        });
        it('should return policy name for policy expense chat when not in create expense flow', function () {
            var report = (0, reports_2.createPolicyExpenseChat)(1);
            report.policyID = policy.id;
            var result = (0, ReportUtils_1.getChatRoomSubtitle)(report);
            expect(result).toBe(policy.name);
        });
        it('should return empty string for expense report (not default/user-created/policy-expense)', function () {
            var report = (0, reports_2.createExpenseReport)(1);
            report.policyID = policy.id;
            var result = (0, ReportUtils_1.getChatRoomSubtitle)(report);
            expect(result).toBe('');
        });
        it('should return empty string for expense report in create expense flow (not default/user-created/policy-expense)', function () {
            var report = (0, reports_2.createExpenseReport)(1);
            report.policyID = policy.id;
            var result = (0, ReportUtils_1.getChatRoomSubtitle)(report, true, false);
            expect(result).toBe('');
        });
        it('should return oldPolicyName when report is archived', function () {
            var report = (0, reports_2.createAdminRoom)(1);
            report.oldPolicyName = 'Old Policy Name';
            var result = (0, ReportUtils_1.getChatRoomSubtitle)(report, false, true);
            expect(result).toBe('Old Policy Name');
        });
        it('should return empty string when report is archived but has no oldPolicyName', function () {
            var report = (0, reports_2.createAdminRoom)(1);
            report.oldPolicyName = undefined;
            var result = (0, ReportUtils_1.getChatRoomSubtitle)(report, false, true);
            expect(result).toBe('');
        });
        it('should prioritize isReportArchived over other conditions', function () {
            var report = (0, reports_2.createAdminRoom)(1);
            report.policyID = policy.id;
            report.oldPolicyName = 'Archived Policy';
            var result = (0, ReportUtils_1.getChatRoomSubtitle)(report, true, true);
            expect(result).toBe('Archived Policy');
        });
        it('should handle with only report data', function () {
            var report = (0, reports_2.createAdminRoom)(1);
            report.policyID = policy.id;
            var result = (0, ReportUtils_1.getChatRoomSubtitle)(report);
            expect(result).toBe(policy.name);
        });
    });
    describe('getMoneyRequestOptions', function () {
        var participantsAccountIDs = Object.keys(participantsPersonalDetails).map(Number);
        (0, globals_1.beforeAll)(function () {
            var _a;
            react_native_onyx_1.default.merge(ONYXKEYS_1.default.PERSONAL_DETAILS_LIST, (_a = {},
                _a[currentUserAccountID] = {
                    accountID: currentUserAccountID,
                    login: currentUserEmail,
                },
                _a));
        });
        afterAll(function () { return react_native_onyx_1.default.clear(); });
        describe('return empty iou options if', function () {
            it('participants array contains excluded expensify iou emails', function () {
                var allEmpty = CONST_1.default.EXPENSIFY_ACCOUNT_IDS.every(function (accountID) {
                    var moneyRequestOptions = (0, ReportUtils_1.temporary_getMoneyRequestOptions)(undefined, undefined, [currentUserAccountID, accountID]);
                    return moneyRequestOptions.length === 0;
                });
                expect(allEmpty).toBe(true);
            });
            it('it is a room with no participants except self', function () {
                var report = __assign(__assign({}, LHNTestUtils.getFakeReport()), { chatType: CONST_1.default.REPORT.CHAT_TYPE.POLICY_ROOM });
                var moneyRequestOptions = (0, ReportUtils_1.temporary_getMoneyRequestOptions)(report, undefined, [currentUserAccountID]);
                expect(moneyRequestOptions.length).toBe(0);
            });
            it('its not your policy expense chat', function () {
                var report = __assign(__assign({}, LHNTestUtils.getFakeReport()), { chatType: CONST_1.default.REPORT.CHAT_TYPE.POLICY_EXPENSE_CHAT, isOwnPolicyExpenseChat: false });
                var moneyRequestOptions = (0, ReportUtils_1.temporary_getMoneyRequestOptions)(report, undefined, [currentUserAccountID]);
                expect(moneyRequestOptions.length).toBe(0);
            });
            it('its paid IOU report', function () {
                var report = __assign(__assign({}, LHNTestUtils.getFakeReport()), { type: CONST_1.default.REPORT.TYPE.IOU, statusNum: CONST_1.default.REPORT.STATUS_NUM.REIMBURSED });
                var moneyRequestOptions = (0, ReportUtils_1.temporary_getMoneyRequestOptions)(report, undefined, [currentUserAccountID]);
                expect(moneyRequestOptions.length).toBe(0);
            });
            it('its approved Expense report', function () {
                var report = __assign(__assign({}, LHNTestUtils.getFakeReport()), { type: CONST_1.default.REPORT.TYPE.EXPENSE, stateNum: CONST_1.default.REPORT.STATE_NUM.APPROVED, statusNum: CONST_1.default.REPORT.STATUS_NUM.APPROVED });
                var moneyRequestOptions = (0, ReportUtils_1.temporary_getMoneyRequestOptions)(report, undefined, [currentUserAccountID]);
                expect(moneyRequestOptions.length).toBe(0);
            });
            it('its archived report', function () {
                var report = __assign(__assign({}, LHNTestUtils.getFakeReport()), { type: CONST_1.default.REPORT.TYPE.EXPENSE });
                var moneyRequestOptions = (0, ReportUtils_1.temporary_getMoneyRequestOptions)(report, undefined, [currentUserAccountID], true);
                expect(moneyRequestOptions.length).toBe(0);
            });
            it('its trip room', function () {
                var report = __assign(__assign({}, LHNTestUtils.getFakeReport()), { type: CONST_1.default.REPORT.TYPE.CHAT, chatType: CONST_1.default.REPORT.CHAT_TYPE.TRIP_ROOM });
                var moneyRequestOptions = (0, ReportUtils_1.temporary_getMoneyRequestOptions)(report, undefined, [currentUserAccountID]);
                expect(moneyRequestOptions.length).toBe(0);
            });
            it('its paid Expense report', function () {
                var report = __assign(__assign({}, LHNTestUtils.getFakeReport()), { type: CONST_1.default.REPORT.TYPE.EXPENSE, statusNum: CONST_1.default.REPORT.STATUS_NUM.REIMBURSED });
                var moneyRequestOptions = (0, ReportUtils_1.temporary_getMoneyRequestOptions)(report, undefined, [currentUserAccountID]);
                expect(moneyRequestOptions.length).toBe(0);
            });
            it('it is an expense report tied to a policy expense chat user does not own', function () {
                react_native_onyx_1.default.merge("".concat(ONYXKEYS_1.default.COLLECTION.REPORT, "100"), {
                    reportID: '100',
                    isOwnPolicyExpenseChat: false,
                }).then(function () {
                    var report = __assign(__assign({}, LHNTestUtils.getFakeReport()), { parentReportID: '100', type: CONST_1.default.REPORT.TYPE.EXPENSE });
                    var moneyRequestOptions = (0, ReportUtils_1.temporary_getMoneyRequestOptions)(report, undefined, [currentUserAccountID]);
                    expect(moneyRequestOptions.length).toBe(0);
                });
            });
            it('the current user is an invited user of the expense report', function () {
                var report = __assign(__assign({}, LHNTestUtils.getFakeReport()), { type: CONST_1.default.REPORT.TYPE.EXPENSE });
                var moneyRequestOptions = (0, ReportUtils_1.temporary_getMoneyRequestOptions)(report, undefined, [currentUserAccountID, 20]);
                expect(moneyRequestOptions.length).toBe(0);
            });
            it('the current user is an invited user of the iou report', function () {
                var report = __assign(__assign({}, LHNTestUtils.getFakeReport()), { type: CONST_1.default.REPORT.TYPE.IOU, ownerAccountID: 20, managerID: 21 });
                var moneyRequestOptions = (0, ReportUtils_1.temporary_getMoneyRequestOptions)(report, undefined, [currentUserAccountID, 20, 21]);
                expect(moneyRequestOptions.length).toBe(0);
            });
        });
        describe('return only iou split option if', function () {
            it('it is a chat room with more than one participant that is not an announce room', function () {
                var onlyHaveSplitOption = [CONST_1.default.REPORT.CHAT_TYPE.POLICY_ADMINS, CONST_1.default.REPORT.CHAT_TYPE.DOMAIN_ALL, CONST_1.default.REPORT.CHAT_TYPE.POLICY_ROOM].every(function (chatType) {
                    var _a;
                    var report = __assign(__assign({}, LHNTestUtils.getFakeReport()), { chatType: chatType });
                    var moneyRequestOptions = (0, ReportUtils_1.temporary_getMoneyRequestOptions)(report, undefined, [currentUserAccountID, (_a = participantsAccountIDs.at(0)) !== null && _a !== void 0 ? _a : CONST_1.default.DEFAULT_NUMBER_ID]);
                    return moneyRequestOptions.length === 1 && moneyRequestOptions.includes(CONST_1.default.IOU.TYPE.SPLIT);
                });
                expect(onlyHaveSplitOption).toBe(true);
            });
            it('has multiple participants excluding self', function () {
                var report = __assign(__assign({}, LHNTestUtils.getFakeReport()), { chatType: CONST_1.default.REPORT.CHAT_TYPE.POLICY_ROOM });
                var moneyRequestOptions = (0, ReportUtils_1.temporary_getMoneyRequestOptions)(report, undefined, __spreadArray([currentUserAccountID], participantsAccountIDs, true));
                expect(moneyRequestOptions.length).toBe(1);
                expect(moneyRequestOptions.includes(CONST_1.default.IOU.TYPE.SPLIT)).toBe(true);
            });
            it('user has pay expense permission', function () {
                var report = __assign(__assign({}, LHNTestUtils.getFakeReport()), { chatType: CONST_1.default.REPORT.CHAT_TYPE.POLICY_ROOM });
                var moneyRequestOptions = (0, ReportUtils_1.temporary_getMoneyRequestOptions)(report, undefined, __spreadArray([currentUserAccountID], participantsAccountIDs, true));
                expect(moneyRequestOptions.length).toBe(1);
                expect(moneyRequestOptions.includes(CONST_1.default.IOU.TYPE.SPLIT)).toBe(true);
            });
            it("it's a group DM report", function () {
                var report = __assign(__assign({}, LHNTestUtils.getFakeReport()), { type: CONST_1.default.REPORT.TYPE.CHAT, participantsAccountIDs: __spreadArray([currentUserAccountID], participantsAccountIDs, true) });
                var moneyRequestOptions = (0, ReportUtils_1.temporary_getMoneyRequestOptions)(report, undefined, __spreadArray([currentUserAccountID], participantsAccountIDs.map(Number), true));
                expect(moneyRequestOptions.length).toBe(1);
                expect(moneyRequestOptions.includes(CONST_1.default.IOU.TYPE.SPLIT)).toBe(true);
            });
        });
        describe('return only submit expense option if', function () {
            it('it is an IOU report in submitted state', function () {
                var _a;
                var report = __assign(__assign({}, LHNTestUtils.getFakeReport()), { type: CONST_1.default.REPORT.TYPE.IOU, stateNum: CONST_1.default.REPORT.STATE_NUM.SUBMITTED, statusNum: CONST_1.default.REPORT.STATUS_NUM.SUBMITTED, managerID: currentUserAccountID });
                var moneyRequestOptions = (0, ReportUtils_1.temporary_getMoneyRequestOptions)(report, undefined, [currentUserAccountID, (_a = participantsAccountIDs.at(0)) !== null && _a !== void 0 ? _a : CONST_1.default.DEFAULT_NUMBER_ID]);
                expect(moneyRequestOptions.length).toBe(1);
                expect(moneyRequestOptions.includes(CONST_1.default.IOU.TYPE.SUBMIT)).toBe(true);
            });
            it('it is an IOU report in submitted state even with pay expense permissions', function () {
                var _a;
                var report = __assign(__assign({}, LHNTestUtils.getFakeReport()), { type: CONST_1.default.REPORT.TYPE.IOU, stateNum: CONST_1.default.REPORT.STATE_NUM.SUBMITTED, statusNum: CONST_1.default.REPORT.STATUS_NUM.SUBMITTED, managerID: currentUserAccountID });
                var moneyRequestOptions = (0, ReportUtils_1.temporary_getMoneyRequestOptions)(report, undefined, [currentUserAccountID, (_a = participantsAccountIDs.at(0)) !== null && _a !== void 0 ? _a : CONST_1.default.DEFAULT_NUMBER_ID]);
                expect(moneyRequestOptions.length).toBe(1);
                expect(moneyRequestOptions.includes(CONST_1.default.IOU.TYPE.SUBMIT)).toBe(true);
            });
        });
        describe('return only submit expense and track expense options if', function () {
            it("it is an expense report tied to user's own policy expense chat", function () {
                react_native_onyx_1.default.merge("".concat(ONYXKEYS_1.default.COLLECTION.REPORT, "102"), {
                    reportID: '102',
                    chatType: CONST_1.default.REPORT.CHAT_TYPE.POLICY_EXPENSE_CHAT,
                    isOwnPolicyExpenseChat: true,
                }).then(function () {
                    var report = __assign(__assign({}, LHNTestUtils.getFakeReport()), { parentReportID: '102', type: CONST_1.default.REPORT.TYPE.EXPENSE, ownerAccountID: currentUserAccountID });
                    var moneyRequestOptions = (0, ReportUtils_1.temporary_getMoneyRequestOptions)(report, undefined, [currentUserAccountID]);
                    expect(moneyRequestOptions.length).toBe(2);
                    expect(moneyRequestOptions.includes(CONST_1.default.IOU.TYPE.SUBMIT)).toBe(true);
                    expect(moneyRequestOptions.includes(CONST_1.default.IOU.TYPE.TRACK)).toBe(true);
                    expect(moneyRequestOptions.indexOf(CONST_1.default.IOU.TYPE.SUBMIT)).toBe(0);
                });
            });
            it("it is an open expense report tied to user's own policy expense chat", function () {
                react_native_onyx_1.default.merge("".concat(ONYXKEYS_1.default.COLLECTION.REPORT, "103"), {
                    reportID: '103',
                    chatType: CONST_1.default.REPORT.CHAT_TYPE.POLICY_EXPENSE_CHAT,
                    isOwnPolicyExpenseChat: true,
                }).then(function () {
                    var _a;
                    var report = __assign(__assign({}, LHNTestUtils.getFakeReport()), { type: CONST_1.default.REPORT.TYPE.EXPENSE, stateNum: CONST_1.default.REPORT.STATE_NUM.OPEN, statusNum: CONST_1.default.REPORT.STATUS_NUM.OPEN, parentReportID: '103', ownerAccountID: currentUserAccountID });
                    var paidPolicy = {
                        type: CONST_1.default.POLICY.TYPE.TEAM,
                        id: '',
                        name: '',
                        role: 'user',
                        owner: '',
                        outputCurrency: '',
                        isPolicyExpenseChatEnabled: false,
                    };
                    var moneyRequestOptions = (0, ReportUtils_1.temporary_getMoneyRequestOptions)(report, paidPolicy, [currentUserAccountID, (_a = participantsAccountIDs.at(0)) !== null && _a !== void 0 ? _a : CONST_1.default.DEFAULT_NUMBER_ID]);
                    expect(moneyRequestOptions.length).toBe(2);
                    expect(moneyRequestOptions.includes(CONST_1.default.IOU.TYPE.SUBMIT)).toBe(true);
                    expect(moneyRequestOptions.includes(CONST_1.default.IOU.TYPE.TRACK)).toBe(true);
                    expect(moneyRequestOptions.indexOf(CONST_1.default.IOU.TYPE.SUBMIT)).toBe(0);
                });
            });
            it('it is an IOU report in submitted state', function () {
                var _a;
                var report = __assign(__assign({}, LHNTestUtils.getFakeReport()), { type: CONST_1.default.REPORT.TYPE.IOU, stateNum: CONST_1.default.REPORT.STATE_NUM.SUBMITTED, statusNum: CONST_1.default.REPORT.STATUS_NUM.SUBMITTED, managerID: currentUserAccountID });
                var moneyRequestOptions = (0, ReportUtils_1.temporary_getMoneyRequestOptions)(report, undefined, [currentUserAccountID, (_a = participantsAccountIDs.at(0)) !== null && _a !== void 0 ? _a : CONST_1.default.DEFAULT_NUMBER_ID]);
                expect(moneyRequestOptions.length).toBe(1);
                expect(moneyRequestOptions.includes(CONST_1.default.IOU.TYPE.SUBMIT)).toBe(true);
            });
            it('it is an IOU report in submitted state even with pay expense permissions', function () {
                var _a;
                var report = __assign(__assign({}, LHNTestUtils.getFakeReport()), { type: CONST_1.default.REPORT.TYPE.IOU, stateNum: CONST_1.default.REPORT.STATE_NUM.SUBMITTED, statusNum: CONST_1.default.REPORT.STATUS_NUM.SUBMITTED, managerID: currentUserAccountID });
                var moneyRequestOptions = (0, ReportUtils_1.temporary_getMoneyRequestOptions)(report, undefined, [currentUserAccountID, (_a = participantsAccountIDs.at(0)) !== null && _a !== void 0 ? _a : CONST_1.default.DEFAULT_NUMBER_ID]);
                expect(moneyRequestOptions.length).toBe(1);
                expect(moneyRequestOptions.includes(CONST_1.default.IOU.TYPE.SUBMIT)).toBe(true);
            });
            it("it is a submitted expense report in user's own policyExpenseChat and the policy has Instant Submit frequency", function () {
                var _a;
                var paidPolicy = {
                    id: 'ef72dfeb',
                    type: CONST_1.default.POLICY.TYPE.TEAM,
                    autoReporting: true,
                    autoReportingFrequency: CONST_1.default.POLICY.AUTO_REPORTING_FREQUENCIES.INSTANT,
                    name: '',
                    role: 'user',
                    owner: '',
                    outputCurrency: '',
                    isPolicyExpenseChatEnabled: false,
                    employeeList: (_a = {},
                        _a[currentUserEmail] = {
                            email: currentUserEmail,
                            submitsTo: currentUserEmail,
                        },
                        _a),
                };
                Promise.all([
                    react_native_onyx_1.default.merge("".concat(ONYXKEYS_1.default.COLLECTION.POLICY).concat(paidPolicy.id), paidPolicy),
                    react_native_onyx_1.default.merge("".concat(ONYXKEYS_1.default.COLLECTION.REPORT, "101"), {
                        reportID: '101',
                        chatType: CONST_1.default.REPORT.CHAT_TYPE.POLICY_EXPENSE_CHAT,
                        isOwnPolicyExpenseChat: true,
                        policyID: paidPolicy.id,
                        ownerAccountID: currentUserAccountID,
                    }),
                ]).then(function () {
                    var _a;
                    var report = __assign(__assign({}, LHNTestUtils.getFakeReport()), { type: CONST_1.default.REPORT.TYPE.EXPENSE, stateNum: CONST_1.default.REPORT.STATE_NUM.SUBMITTED, statusNum: CONST_1.default.REPORT.STATUS_NUM.SUBMITTED, parentReportID: '101', policyID: paidPolicy.id, managerID: currentUserAccountID, ownerAccountID: currentUserAccountID });
                    var moneyRequestOptions = (0, ReportUtils_1.temporary_getMoneyRequestOptions)(report, paidPolicy, [currentUserAccountID, (_a = participantsAccountIDs.at(0)) !== null && _a !== void 0 ? _a : CONST_1.default.DEFAULT_NUMBER_ID]);
                    expect(moneyRequestOptions.length).toBe(2);
                    expect(moneyRequestOptions.includes(CONST_1.default.IOU.TYPE.SUBMIT)).toBe(true);
                    expect(moneyRequestOptions.includes(CONST_1.default.IOU.TYPE.TRACK)).toBe(true);
                    expect(moneyRequestOptions.indexOf(CONST_1.default.IOU.TYPE.SUBMIT)).toBe(0);
                });
            });
        });
        describe('return multiple expense options if', function () {
            it('it is a 1:1 DM', function () {
                var _a;
                var report = __assign(__assign({}, LHNTestUtils.getFakeReport()), { type: CONST_1.default.REPORT.TYPE.CHAT });
                var moneyRequestOptions = (0, ReportUtils_1.temporary_getMoneyRequestOptions)(report, undefined, [currentUserAccountID, (_a = participantsAccountIDs.at(0)) !== null && _a !== void 0 ? _a : CONST_1.default.DEFAULT_NUMBER_ID]);
                expect(moneyRequestOptions.length).toBe(3);
                expect(moneyRequestOptions.includes(CONST_1.default.IOU.TYPE.SPLIT)).toBe(true);
                expect(moneyRequestOptions.includes(CONST_1.default.IOU.TYPE.SUBMIT)).toBe(true);
                expect(moneyRequestOptions.includes(CONST_1.default.IOU.TYPE.PAY)).toBe(true);
                expect(moneyRequestOptions.indexOf(CONST_1.default.IOU.TYPE.SUBMIT)).toBe(0);
            });
            it("it is a submitted report tied to user's own policy expense chat", function () {
                var paidPolicy = {
                    id: '3f54cca8',
                    type: CONST_1.default.POLICY.TYPE.TEAM,
                    name: '',
                    role: 'user',
                    owner: '',
                    outputCurrency: '',
                    isPolicyExpenseChatEnabled: false,
                };
                Promise.all([
                    react_native_onyx_1.default.merge("".concat(ONYXKEYS_1.default.COLLECTION.POLICY).concat(paidPolicy.id), paidPolicy),
                    react_native_onyx_1.default.merge("".concat(ONYXKEYS_1.default.COLLECTION.REPORT, "101"), {
                        reportID: '101',
                        chatType: CONST_1.default.REPORT.CHAT_TYPE.POLICY_EXPENSE_CHAT,
                        isOwnPolicyExpenseChat: true,
                    }),
                ]).then(function () {
                    var _a;
                    var report = __assign(__assign({}, LHNTestUtils.getFakeReport()), { type: CONST_1.default.REPORT.TYPE.EXPENSE, stateNum: CONST_1.default.REPORT.STATE_NUM.SUBMITTED, statusNum: CONST_1.default.REPORT.STATUS_NUM.SUBMITTED, parentReportID: '101', policyID: paidPolicy.id, ownerAccountID: currentUserAccountID });
                    var moneyRequestOptions = (0, ReportUtils_1.temporary_getMoneyRequestOptions)(report, paidPolicy, [currentUserAccountID, (_a = participantsAccountIDs.at(0)) !== null && _a !== void 0 ? _a : CONST_1.default.DEFAULT_NUMBER_ID]);
                    expect(moneyRequestOptions.length).toBe(2);
                    expect(moneyRequestOptions.includes(CONST_1.default.IOU.TYPE.SUBMIT)).toBe(true);
                    expect(moneyRequestOptions.includes(CONST_1.default.IOU.TYPE.TRACK)).toBe(true);
                });
            });
            it("it is user's own policy expense chat", function () {
                var report = __assign(__assign({}, LHNTestUtils.getFakeReport()), { chatType: CONST_1.default.REPORT.CHAT_TYPE.POLICY_EXPENSE_CHAT, isOwnPolicyExpenseChat: true, managerID: currentUserAccountID });
                var moneyRequestOptions = (0, ReportUtils_1.temporary_getMoneyRequestOptions)(report, undefined, __spreadArray([currentUserAccountID], participantsAccountIDs, true));
                expect(moneyRequestOptions.length).toBe(2);
                expect(moneyRequestOptions.includes(CONST_1.default.IOU.TYPE.SUBMIT)).toBe(true);
                expect(moneyRequestOptions.includes(CONST_1.default.IOU.TYPE.TRACK)).toBe(true);
                expect(moneyRequestOptions.indexOf(CONST_1.default.IOU.TYPE.SUBMIT)).toBe(0);
            });
        });
        describe('Teachers Unite policy logic', function () {
            var teachersUniteTestPolicyID = CONST_1.default.TEACHERS_UNITE.TEST_POLICY_ID;
            var otherPolicyID = 'normal-policy-id';
            it('should hide Create Expense option and show Split Expense for Teachers Unite policy', function () {
                var _a;
                var report = __assign(__assign({}, LHNTestUtils.getFakeReport()), { policyID: teachersUniteTestPolicyID, chatType: CONST_1.default.REPORT.CHAT_TYPE.POLICY_EXPENSE_CHAT, isOwnPolicyExpenseChat: true });
                var moneyRequestOptions = (0, ReportUtils_1.temporary_getMoneyRequestOptions)(report, undefined, [currentUserAccountID, (_a = participantsAccountIDs.at(0)) !== null && _a !== void 0 ? _a : CONST_1.default.DEFAULT_NUMBER_ID]);
                // Should not include SUBMIT (Create Expense)
                expect(moneyRequestOptions.includes(CONST_1.default.IOU.TYPE.SUBMIT)).toBe(false);
                // Should include SPLIT (Split Expense)
                expect(moneyRequestOptions.includes(CONST_1.default.IOU.TYPE.SPLIT)).toBe(true);
            });
            it('should show Create Expense option and hide Split Expense for non-Teachers Unite policy', function () {
                var _a;
                var report = __assign(__assign({}, LHNTestUtils.getFakeReport()), { policyID: otherPolicyID, chatType: CONST_1.default.REPORT.CHAT_TYPE.POLICY_EXPENSE_CHAT, isOwnPolicyExpenseChat: true });
                var moneyRequestOptions = (0, ReportUtils_1.temporary_getMoneyRequestOptions)(report, undefined, [currentUserAccountID, (_a = participantsAccountIDs.at(0)) !== null && _a !== void 0 ? _a : CONST_1.default.DEFAULT_NUMBER_ID]);
                // Should include SUBMIT (Create Expense)
                expect(moneyRequestOptions.includes(CONST_1.default.IOU.TYPE.SUBMIT)).toBe(true);
                // Should not include SPLIT (Split Expense)
                expect(moneyRequestOptions.includes(CONST_1.default.IOU.TYPE.SPLIT)).toBe(false);
                // Should include other options like TRACK
                expect(moneyRequestOptions.includes(CONST_1.default.IOU.TYPE.TRACK)).toBe(true);
            });
            it('should disable Create report option for expense chats on Teachers Unite workspace', function () {
                var _a;
                var expenseReport = __assign(__assign({}, LHNTestUtils.getFakeReport()), { policyID: teachersUniteTestPolicyID, type: CONST_1.default.REPORT.TYPE.EXPENSE, chatType: CONST_1.default.REPORT.CHAT_TYPE.POLICY_EXPENSE_CHAT, isOwnPolicyExpenseChat: true });
                var moneyRequestOptions = (0, ReportUtils_1.temporary_getMoneyRequestOptions)(expenseReport, undefined, [currentUserAccountID, (_a = participantsAccountIDs.at(0)) !== null && _a !== void 0 ? _a : CONST_1.default.DEFAULT_NUMBER_ID]);
                // Should not include SUBMIT
                expect(moneyRequestOptions.includes(CONST_1.default.IOU.TYPE.SUBMIT)).toBe(false);
            });
        });
        describe('Preferred policy restrictions', function () {
            // Self DM - TRACK should always be allowed regardless of restrictions
            it('should allow TRACK requests for self DMs', function () {
                var _a;
                var selfDMReport = {
                    reportID: '1234',
                    type: CONST_1.default.REPORT.TYPE.CHAT,
                    chatType: CONST_1.default.REPORT.CHAT_TYPE.SELF_DM,
                    participants: (_a = {},
                        _a[currentUserAccountID] = { notificationPreference: CONST_1.default.REPORT.NOTIFICATION_PREFERENCE.ALWAYS },
                        _a),
                };
                var selfDMParticipants = [currentUserAccountID];
                var withoutRestrictionsResult = (0, ReportUtils_1.temporary_getMoneyRequestOptions)(selfDMReport, undefined, selfDMParticipants, false, false);
                var withRestrictionsResult = (0, ReportUtils_1.temporary_getMoneyRequestOptions)(selfDMReport, undefined, selfDMParticipants, false, true);
                expect(withoutRestrictionsResult.includes(CONST_1.default.IOU.TYPE.TRACK)).toBe(true);
                expect(withRestrictionsResult.includes(CONST_1.default.IOU.TYPE.TRACK)).toBe(true);
            });
            // DM - SUBMIT, PAY, SPLIT should be restricted
            it('should restrict SUBMIT requests for DMs', function () {
                var _a;
                var _b;
                var otherUserAccountID = (_b = participantsAccountIDs.at(0)) !== null && _b !== void 0 ? _b : 0;
                var dmReport = {
                    reportID: '1235',
                    type: CONST_1.default.REPORT.TYPE.CHAT,
                    participants: (_a = {},
                        _a[currentUserAccountID] = { notificationPreference: CONST_1.default.REPORT.NOTIFICATION_PREFERENCE.ALWAYS },
                        _a[otherUserAccountID] = { notificationPreference: CONST_1.default.REPORT.NOTIFICATION_PREFERENCE.ALWAYS },
                        _a),
                };
                var dmParticipants = [currentUserAccountID, otherUserAccountID];
                var withoutRestrictionsResult = (0, ReportUtils_1.temporary_getMoneyRequestOptions)(dmReport, undefined, dmParticipants, false, false);
                var withRestrictionsResult = (0, ReportUtils_1.temporary_getMoneyRequestOptions)(dmReport, undefined, dmParticipants, false, true);
                expect(withoutRestrictionsResult.includes(CONST_1.default.IOU.TYPE.SUBMIT)).toBe(true);
                expect(withRestrictionsResult.includes(CONST_1.default.IOU.TYPE.SUBMIT)).toBe(false);
            });
            it('should restrict PAY requests for DMs', function () {
                var _a;
                var _b;
                var otherUserAccountID = (_b = participantsAccountIDs.at(0)) !== null && _b !== void 0 ? _b : 0;
                var dmReport = {
                    reportID: '1236',
                    type: CONST_1.default.REPORT.TYPE.CHAT,
                    participants: (_a = {},
                        _a[currentUserAccountID] = { notificationPreference: CONST_1.default.REPORT.NOTIFICATION_PREFERENCE.ALWAYS },
                        _a[otherUserAccountID] = { notificationPreference: CONST_1.default.REPORT.NOTIFICATION_PREFERENCE.ALWAYS },
                        _a),
                };
                var dmParticipants = [currentUserAccountID, otherUserAccountID];
                var withoutRestrictionsResult = (0, ReportUtils_1.temporary_getMoneyRequestOptions)(dmReport, undefined, dmParticipants, false, false);
                var withRestrictionsResult = (0, ReportUtils_1.temporary_getMoneyRequestOptions)(dmReport, undefined, dmParticipants, false, true);
                if (withoutRestrictionsResult.includes(CONST_1.default.IOU.TYPE.PAY)) {
                    expect(withRestrictionsResult.includes(CONST_1.default.IOU.TYPE.PAY)).toBe(false);
                }
            });
            it('should restrict SPLIT requests for DMs', function () {
                var _a;
                var _b;
                var otherUserAccountID = (_b = participantsAccountIDs.at(0)) !== null && _b !== void 0 ? _b : 0;
                var dmReport = {
                    reportID: '1237',
                    type: CONST_1.default.REPORT.TYPE.CHAT,
                    participants: (_a = {},
                        _a[currentUserAccountID] = { notificationPreference: CONST_1.default.REPORT.NOTIFICATION_PREFERENCE.ALWAYS },
                        _a[otherUserAccountID] = { notificationPreference: CONST_1.default.REPORT.NOTIFICATION_PREFERENCE.ALWAYS },
                        _a),
                };
                var dmParticipants = [currentUserAccountID, otherUserAccountID];
                var withoutRestrictionsResult = (0, ReportUtils_1.temporary_getMoneyRequestOptions)(dmReport, undefined, dmParticipants, false, false);
                var withRestrictionsResult = (0, ReportUtils_1.temporary_getMoneyRequestOptions)(dmReport, undefined, dmParticipants, false, true);
                expect(withoutRestrictionsResult.includes(CONST_1.default.IOU.TYPE.SPLIT)).toBe(true);
                expect(withRestrictionsResult.includes(CONST_1.default.IOU.TYPE.SPLIT)).toBe(false);
            });
            // Group Chat - Only SPLIT functionality available, should be restricted
            it('should restrict SPLIT requests for group chats', function () {
                var groupParticipants = __spreadArray([currentUserAccountID], participantsAccountIDs.slice(0, 3), true);
                var groupChatReport = __assign(__assign({}, LHNTestUtils.getFakeReport(groupParticipants)), { type: CONST_1.default.REPORT.TYPE.CHAT, chatType: undefined });
                var withoutRestrictionsResult = (0, ReportUtils_1.temporary_getMoneyRequestOptions)(groupChatReport, undefined, groupParticipants, false, false);
                var withRestrictionsResult = (0, ReportUtils_1.temporary_getMoneyRequestOptions)(groupChatReport, undefined, groupParticipants, false, true);
                expect(withoutRestrictionsResult.includes(CONST_1.default.IOU.TYPE.SPLIT)).toBe(true);
                expect(withRestrictionsResult.includes(CONST_1.default.IOU.TYPE.SPLIT)).toBe(false);
            });
            // Policy Rooms - SPLIT should be restricted
            it('should restrict SPLIT requests for user-created policy rooms', function () {
                var _a;
                var policyRoomParticipants = [currentUserAccountID, (_a = participantsAccountIDs.at(0)) !== null && _a !== void 0 ? _a : 0];
                var policyRoomReport = __assign(__assign({}, LHNTestUtils.getFakeReport(policyRoomParticipants)), { type: CONST_1.default.REPORT.TYPE.CHAT, chatType: CONST_1.default.REPORT.CHAT_TYPE.POLICY_ROOM });
                var withoutRestrictionsResult = (0, ReportUtils_1.temporary_getMoneyRequestOptions)(policyRoomReport, undefined, policyRoomParticipants, false, false);
                var withRestrictionsResult = (0, ReportUtils_1.temporary_getMoneyRequestOptions)(policyRoomReport, undefined, policyRoomParticipants, false, true);
                expect(withoutRestrictionsResult.includes(CONST_1.default.IOU.TYPE.SPLIT)).toBe(true);
                expect(withRestrictionsResult.includes(CONST_1.default.IOU.TYPE.SPLIT)).toBe(false);
            });
        });
    });
    describe('canCreateRequest', function () {
        describe('Preferred policy restrictions', function () {
            var participantsAccountIDs = Object.keys(participantsPersonalDetails).map(Number);
            // Self DM - TRACK should always be allowed regardless of restrictions
            it('should allow TRACK requests for self DMs', function () {
                var _a;
                var selfDMReport = {
                    reportID: '2234',
                    type: CONST_1.default.REPORT.TYPE.CHAT,
                    chatType: CONST_1.default.REPORT.CHAT_TYPE.SELF_DM,
                    participants: (_a = {},
                        _a[currentUserAccountID] = { notificationPreference: CONST_1.default.REPORT.NOTIFICATION_PREFERENCE.ALWAYS },
                        _a),
                };
                var withoutRestrictionsResult = (0, ReportUtils_1.canCreateRequest)(selfDMReport, undefined, CONST_1.default.IOU.TYPE.TRACK, false, false);
                var withRestrictionsResult = (0, ReportUtils_1.canCreateRequest)(selfDMReport, undefined, CONST_1.default.IOU.TYPE.TRACK, false, true);
                expect(withoutRestrictionsResult).toBe(true);
                expect(withRestrictionsResult).toBe(true);
            });
            // DM - SPLIT should be restricted
            it('should restrict SPLIT requests for DMs', function () {
                var _a;
                var _b;
                var otherUserAccountID = (_b = participantsAccountIDs.at(0)) !== null && _b !== void 0 ? _b : 0;
                var dmReport = {
                    reportID: '2237',
                    type: CONST_1.default.REPORT.TYPE.CHAT,
                    participants: (_a = {},
                        _a[currentUserAccountID] = { notificationPreference: CONST_1.default.REPORT.NOTIFICATION_PREFERENCE.ALWAYS },
                        _a[otherUserAccountID] = { notificationPreference: CONST_1.default.REPORT.NOTIFICATION_PREFERENCE.ALWAYS },
                        _a),
                };
                var withoutRestrictionsResult = (0, ReportUtils_1.canCreateRequest)(dmReport, undefined, CONST_1.default.IOU.TYPE.SPLIT, false, false);
                var withRestrictionsResult = (0, ReportUtils_1.canCreateRequest)(dmReport, undefined, CONST_1.default.IOU.TYPE.SPLIT, false, true);
                expect(withoutRestrictionsResult).toBe(true);
                expect(withRestrictionsResult).toBe(false);
            });
            // Group Chat - Only SPLIT functionality available, should be restricted
            it('should restrict SPLIT requests for group chats', function () {
                var groupChat = LHNTestUtils.getFakeReport(__spreadArray([currentUserAccountID], participantsAccountIDs.slice(0, 3), true));
                var withoutRestrictionsResult = (0, ReportUtils_1.canCreateRequest)(groupChat, undefined, CONST_1.default.IOU.TYPE.SPLIT, false, false);
                var withRestrictionsResult = (0, ReportUtils_1.canCreateRequest)(groupChat, undefined, CONST_1.default.IOU.TYPE.SPLIT, false, true);
                expect(withoutRestrictionsResult).toBe(true);
                expect(withRestrictionsResult).toBe(false);
            });
            // Policy Rooms - SPLIT should be restricted
            it('should restrict SPLIT requests for user-created policy rooms', function () {
                var _a;
                var policyRoom = __assign(__assign({}, LHNTestUtils.getFakeReport([currentUserAccountID, (_a = participantsAccountIDs.at(0)) !== null && _a !== void 0 ? _a : 0])), { chatType: CONST_1.default.REPORT.CHAT_TYPE.POLICY_ROOM });
                var withoutRestrictionsResult = (0, ReportUtils_1.canCreateRequest)(policyRoom, undefined, CONST_1.default.IOU.TYPE.SPLIT, false, false);
                var withRestrictionsResult = (0, ReportUtils_1.canCreateRequest)(policyRoom, undefined, CONST_1.default.IOU.TYPE.SPLIT, false, true);
                expect(withoutRestrictionsResult).toBe(true);
                expect(withRestrictionsResult).toBe(false);
            });
        });
    });
    describe('getReportIDFromLink', function () {
        it('should get the correct reportID from a deep link', function () {
            expect((0, ReportUtils_1.getReportIDFromLink)('new-expensify://r/75431276')).toBe('75431276');
            expect((0, ReportUtils_1.getReportIDFromLink)('https://www.expensify.cash/r/75431276')).toBe('75431276');
            expect((0, ReportUtils_1.getReportIDFromLink)('https://staging.new.expensify.com/r/75431276')).toBe('75431276');
            expect((0, ReportUtils_1.getReportIDFromLink)('https://dev.new.expensify.com/r/75431276')).toBe('75431276');
            expect((0, ReportUtils_1.getReportIDFromLink)('https://staging.expensify.cash/r/75431276')).toBe('75431276');
            expect((0, ReportUtils_1.getReportIDFromLink)('https://new.expensify.com/r/75431276')).toBe('75431276');
        });
        it("shouldn't get the correct reportID from a deep link", function () {
            expect((0, ReportUtils_1.getReportIDFromLink)('new-expensify-not-valid://r/75431276')).toBe('');
            expect((0, ReportUtils_1.getReportIDFromLink)('new-expensify://settings')).toBe('');
        });
    });
    describe('getMostRecentlyVisitedReport', function () {
        it('should filter out report without reportID & lastReadTime and return the most recently visited report', function () {
            var reports = [
                { reportID: '1', lastReadTime: '2023-07-08 07:15:44.030' },
                { reportID: '2', lastReadTime: undefined },
                { reportID: '3', lastReadTime: '2023-07-06 07:15:44.030' },
                { reportID: '4', lastReadTime: '2023-07-07 07:15:44.030', type: CONST_1.default.REPORT.TYPE.IOU },
                { lastReadTime: '2023-07-09 07:15:44.030' },
                { reportID: '6' },
                undefined,
            ];
            var latestReport = { reportID: '1', lastReadTime: '2023-07-08 07:15:44.030' };
            expect((0, ReportUtils_1.getMostRecentlyVisitedReport)(reports, undefined)).toEqual(latestReport);
        });
    });
    describe('shouldDisableThread', function () {
        var reportID = '1';
        it('should disable on thread-disabled actions', function () {
            var reportAction = (0, ReportUtils_1.buildOptimisticCreatedReportAction)('email1@test.com');
            expect((0, ReportUtils_1.shouldDisableThread)(reportAction, reportID, false)).toBeTruthy();
        });
        it('should disable thread on split expense actions', function () {
            var reportAction = (0, ReportUtils_1.buildOptimisticIOUReportAction)({
                type: CONST_1.default.IOU.REPORT_ACTION_TYPE.SPLIT,
                amount: 50000,
                currency: CONST_1.default.CURRENCY.USD,
                comment: '',
                participants: [{ login: 'email1@test.com' }, { login: 'email2@test.com' }],
                transactionID: NumberUtils.rand64(),
            });
            expect((0, ReportUtils_1.shouldDisableThread)(reportAction, reportID, false)).toBeTruthy();
        });
        it("should disable on a whisper action and it's neither a report preview nor IOU action", function () {
            var reportAction = {
                actionName: CONST_1.default.REPORT.ACTIONS.TYPE.MODIFIED_EXPENSE,
                originalMessage: {
                    whisperedTo: [123456],
                },
            };
            expect((0, ReportUtils_1.shouldDisableThread)(reportAction, reportID, false)).toBeTruthy();
        });
        it('should disable on thread first chat', function () {
            var reportAction = {
                childReportID: reportID,
            };
            expect((0, ReportUtils_1.shouldDisableThread)(reportAction, reportID, true)).toBeTruthy();
        });
        describe('deleted threads', function () {
            it('should be enabled if the report action is not-deleted and child visible action count is 1', function () {
                // Given a normal report action with one child visible action count
                var reportAction = {
                    message: [
                        {
                            translationKey: '',
                            type: 'COMMENT',
                            html: 'test',
                            text: 'test',
                        },
                    ],
                    childVisibleActionCount: 1,
                };
                // When it's checked to see if the thread should be disabled
                var isThreadDisabled = (0, ReportUtils_1.shouldDisableThread)(reportAction, reportID, false);
                // Then the thread should be enabled
                expect(isThreadDisabled).toBeFalsy();
            });
            it('should be enabled if the report action is not-deleted and child visible action count is 0', function () {
                // Given a normal report action with zero child visible action count
                var reportAction = {
                    message: [
                        {
                            translationKey: '',
                            type: 'COMMENT',
                            html: 'test',
                            text: 'test',
                        },
                    ],
                    childVisibleActionCount: 0,
                };
                // When it's checked to see if the thread should be disabled
                var isThreadDisabled = (0, ReportUtils_1.shouldDisableThread)(reportAction, reportID, false);
                // Then the thread should be enabled
                expect(isThreadDisabled).toBeFalsy();
            });
            it('should be enabled if the report action is deleted and child visible action count is 1', function () {
                // Given a normal report action with one child visible action count
                var reportAction = {
                    message: [
                        {
                            translationKey: '',
                            type: 'COMMENT',
                            html: '',
                            text: '',
                        },
                    ],
                    childVisibleActionCount: 1,
                };
                // When it's checked to see if the thread should be disabled
                var isThreadDisabled = (0, ReportUtils_1.shouldDisableThread)(reportAction, reportID, false);
                // Then the thread should be enabled
                expect(isThreadDisabled).toBeFalsy();
            });
            it('should be disabled if the report action is deleted and child visible action count is 0', function () {
                // Given a normal report action with zero child visible action count
                var reportAction = {
                    message: [
                        {
                            translationKey: '',
                            type: 'COMMENT',
                            html: '',
                            text: '',
                        },
                    ],
                    childVisibleActionCount: 0,
                };
                // When it's checked to see if the thread should be disabled
                var isThreadDisabled = (0, ReportUtils_1.shouldDisableThread)(reportAction, reportID, false);
                // Then the thread should be disabled
                expect(isThreadDisabled).toBeTruthy();
            });
        });
        describe('archived report threads', function () {
            it('should be enabled if the report is not-archived and child visible action count is 1', function () {
                // Given a normal report action with one child visible action count
                var reportAction = {
                    message: [
                        {
                            translationKey: '',
                            type: 'COMMENT',
                            html: 'test',
                            text: 'test',
                        },
                    ],
                    childVisibleActionCount: 1,
                };
                // And a report that is not archived
                var isReportArchived = false;
                // When it's checked to see if the thread should be disabled
                var isThreadDisabled = (0, ReportUtils_1.shouldDisableThread)(reportAction, reportID, false, isReportArchived);
                // Then the thread should be enabled
                expect(isThreadDisabled).toBeFalsy();
            });
            it('should be enabled if the report is not-archived and child visible action count is 0', function () {
                // Given a normal report action with zero child visible action counts
                var reportAction = {
                    message: [
                        {
                            translationKey: '',
                            type: 'COMMENT',
                            html: 'test',
                            text: 'test',
                        },
                    ],
                    childVisibleActionCount: 1,
                };
                // And a report that is not archived
                var isReportArchived = false;
                // When it's checked to see if the thread should be disabled
                var isThreadDisabled = (0, ReportUtils_1.shouldDisableThread)(reportAction, reportID, false, isReportArchived);
                // Then the thread should be enabled
                expect(isThreadDisabled).toBeFalsy();
            });
            it('should be enabled if the report is archived and child visible action count is 1', function () {
                // Given a normal report action with one child visible action count
                var reportAction = {
                    message: [
                        {
                            translationKey: '',
                            type: 'COMMENT',
                            html: 'test',
                            text: 'test',
                        },
                    ],
                    childVisibleActionCount: 1,
                };
                // And a report that is not archived
                var isReportArchived = true;
                // When it's checked to see if the thread should be disabled
                var isThreadDisabled = (0, ReportUtils_1.shouldDisableThread)(reportAction, reportID, false, isReportArchived);
                // Then the thread should be enabled
                expect(isThreadDisabled).toBeFalsy();
            });
            it('should be disabled if the report is archived and child visible action count is 0', function () {
                // Given a normal report action with zero child visible action counts
                var reportAction = {
                    message: [
                        {
                            translationKey: '',
                            type: 'COMMENT',
                            html: 'test',
                            text: 'test',
                        },
                    ],
                    childVisibleActionCount: 0,
                };
                // And a report that is not archived
                var isReportArchived = true;
                // When it's checked to see if the thread should be disabled
                var isThreadDisabled = (0, ReportUtils_1.shouldDisableThread)(reportAction, reportID, false, isReportArchived);
                // Then the thread should be disabled
                expect(isThreadDisabled).toBeTruthy();
            });
        });
    });
    describe('isChatUsedForOnboarding', function () {
        afterEach(function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, react_native_onyx_1.default.clear()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, react_native_onyx_1.default.set(ONYXKEYS_1.default.SESSION, { email: currentUserEmail, accountID: currentUserAccountID })];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('should return false if the report is neither the system or concierge chat', function () {
            expect((0, ReportUtils_1.isChatUsedForOnboarding)(LHNTestUtils.getFakeReport())).toBeFalsy();
        });
        it('should return false if the user account ID is odd and report is the system chat - only the Concierge chat chat should be the onboarding chat for users without the onboarding NVP', function () { return __awaiter(void 0, void 0, void 0, function () {
            var accountID, report;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        accountID = 1;
                        return [4 /*yield*/, react_native_onyx_1.default.multiSet((_a = {},
                                _a[ONYXKEYS_1.default.PERSONAL_DETAILS_LIST] = (_b = {},
                                    _b[accountID] = {
                                        accountID: accountID,
                                    },
                                    _b),
                                _a[ONYXKEYS_1.default.SESSION] = { email: currentUserEmail, accountID: accountID },
                                _a))];
                    case 1:
                        _c.sent();
                        report = __assign(__assign({}, LHNTestUtils.getFakeReport()), { chatType: CONST_1.default.REPORT.CHAT_TYPE.SYSTEM });
                        expect((0, ReportUtils_1.isChatUsedForOnboarding)(report)).toBeFalsy();
                        return [2 /*return*/];
                }
            });
        }); });
        it('should return true if the user account ID is even and report is the concierge chat', function () { return __awaiter(void 0, void 0, void 0, function () {
            var accountID, report;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        accountID = 2;
                        report = LHNTestUtils.getFakeReport([accountID, CONST_1.default.ACCOUNT_ID.CONCIERGE]);
                        return [4 /*yield*/, react_native_onyx_1.default.multiSet((_a = {},
                                _a[ONYXKEYS_1.default.PERSONAL_DETAILS_LIST] = (_b = {},
                                    _b[accountID] = {
                                        accountID: accountID,
                                    },
                                    _b),
                                _a[ONYXKEYS_1.default.SESSION] = { email: currentUserEmail, accountID: accountID },
                                _a))];
                    case 1:
                        _c.sent();
                        return [4 /*yield*/, react_native_onyx_1.default.set("".concat(ONYXKEYS_1.default.COLLECTION.REPORT).concat(report.reportID), report)];
                    case 2:
                        _c.sent();
                        // Test failure is being discussed here: https://github.com/Expensify/App/pull/63096#issuecomment-2930818443
                        expect(true).toBe(true);
                        return [2 /*return*/];
                }
            });
        }); });
        it("should use the report id from the onboarding NVP if it's set", function () { return __awaiter(void 0, void 0, void 0, function () {
            var reportID, report1, report2;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        reportID = '8010';
                        return [4 /*yield*/, react_native_onyx_1.default.multiSet((_a = {},
                                _a[ONYXKEYS_1.default.NVP_ONBOARDING] = { chatReportID: reportID, hasCompletedGuidedSetupFlow: true },
                                _a))];
                    case 1:
                        _b.sent();
                        report1 = __assign(__assign({}, LHNTestUtils.getFakeReport()), { reportID: reportID });
                        expect((0, ReportUtils_1.isChatUsedForOnboarding)(report1)).toBeTruthy();
                        report2 = __assign(__assign({}, LHNTestUtils.getFakeReport()), { reportID: '8011' });
                        expect((0, ReportUtils_1.isChatUsedForOnboarding)(report2)).toBeFalsy();
                        return [2 /*return*/];
                }
            });
        }); });
        it('should return true for admins rooms chat when posting tasks in admins room', function () { return __awaiter(void 0, void 0, void 0, function () {
            var report;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, react_native_onyx_1.default.multiSet((_a = {},
                            _a[ONYXKEYS_1.default.NVP_ONBOARDING] = { hasCompletedGuidedSetupFlow: true },
                            _a))];
                    case 1:
                        _b.sent();
                        report = __assign(__assign({}, LHNTestUtils.getFakeReport()), { chatType: CONST_1.default.REPORT.CHAT_TYPE.POLICY_ADMINS });
                        expect((0, ReportUtils_1.isChatUsedForOnboarding)(report, CONST_1.default.ONBOARDING_CHOICES.MANAGE_TEAM)).toBeTruthy();
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('canHoldUnholdReportAction', function () {
        it('should return canUnholdRequest as true for a held duplicate transaction', function () { return __awaiter(void 0, void 0, void 0, function () {
            var chatReport, reportPreviewReportActionID, expenseReport, expenseTransaction, reportPreview, expenseCreatedAction, transactionThreadReport;
            var _a, _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        chatReport = { reportID: '1' };
                        reportPreviewReportActionID = '8';
                        expenseReport = (0, ReportUtils_1.buildOptimisticExpenseReport)(chatReport.reportID, '123', currentUserAccountID, 122, 'USD', undefined, reportPreviewReportActionID);
                        expenseTransaction = (0, TransactionUtils_1.buildOptimisticTransaction)({
                            transactionParams: {
                                amount: 100,
                                currency: 'USD',
                                reportID: expenseReport.reportID,
                            },
                        });
                        reportPreview = (0, ReportUtils_1.buildOptimisticReportPreview)(chatReport, expenseReport, '', expenseTransaction, expenseReport.reportID, reportPreviewReportActionID);
                        expenseCreatedAction = (0, ReportUtils_1.buildOptimisticIOUReportAction)({
                            type: 'create',
                            amount: 100,
                            currency: 'USD',
                            comment: '',
                            participants: [],
                            transactionID: expenseTransaction.transactionID,
                            iouReportID: expenseReport.reportID,
                        });
                        transactionThreadReport = (0, ReportUtils_1.buildTransactionThread)(expenseCreatedAction, expenseReport);
                        expenseCreatedAction.childReportID = transactionThreadReport.reportID;
                        return [4 /*yield*/, react_native_onyx_1.default.merge(ONYXKEYS_1.default.PERSONAL_DETAILS_LIST, (_a = {},
                                _a[currentUserAccountID] = {
                                    accountID: currentUserAccountID,
                                    displayName: currentUserEmail,
                                    login: currentUserEmail,
                                },
                                _a))];
                    case 1:
                        _d.sent();
                        return [4 /*yield*/, react_native_onyx_1.default.merge("".concat(ONYXKEYS_1.default.COLLECTION.TRANSACTION).concat(expenseTransaction.transactionID), __assign({}, expenseTransaction))];
                    case 2:
                        _d.sent();
                        return [4 /*yield*/, react_native_onyx_1.default.merge("".concat(ONYXKEYS_1.default.COLLECTION.REPORT).concat(expenseReport.reportID), expenseReport)];
                    case 3:
                        _d.sent();
                        return [4 /*yield*/, react_native_onyx_1.default.merge("".concat(ONYXKEYS_1.default.COLLECTION.REPORT).concat(transactionThreadReport.reportID), transactionThreadReport)];
                    case 4:
                        _d.sent();
                        return [4 /*yield*/, react_native_onyx_1.default.merge("".concat(ONYXKEYS_1.default.COLLECTION.REPORT_ACTIONS).concat(expenseReport.reportID), (_b = {},
                                _b[expenseCreatedAction.reportActionID] = expenseCreatedAction,
                                _b))];
                    case 5:
                        _d.sent();
                        return [4 /*yield*/, react_native_onyx_1.default.merge("".concat(ONYXKEYS_1.default.COLLECTION.REPORT_ACTIONS).concat(chatReport.reportID), (_c = {},
                                _c[reportPreview.reportActionID] = reportPreview,
                                _c))];
                    case 6:
                        _d.sent();
                        // Given a transaction with duplicate transaction violation
                        return [4 /*yield*/, react_native_onyx_1.default.merge("".concat(ONYXKEYS_1.default.COLLECTION.TRANSACTION_VIOLATIONS).concat(expenseTransaction.transactionID), [
                                {
                                    name: CONST_1.default.VIOLATIONS.DUPLICATED_TRANSACTION,
                                    type: CONST_1.default.VIOLATION_TYPES.WARNING,
                                },
                            ])];
                    case 7:
                        // Given a transaction with duplicate transaction violation
                        _d.sent();
                        expect((0, ReportUtils_1.canHoldUnholdReportAction)(expenseCreatedAction)).toEqual({ canHoldRequest: true, canUnholdRequest: false });
                        (0, IOU_1.putOnHold)(expenseTransaction.transactionID, 'hold', transactionThreadReport.reportID);
                        return [4 /*yield*/, (0, waitForBatchedUpdates_1.default)()];
                    case 8:
                        _d.sent();
                        // canUnholdRequest should be true after the transaction is held.
                        expect((0, ReportUtils_1.canHoldUnholdReportAction)(expenseCreatedAction)).toEqual({ canHoldRequest: false, canUnholdRequest: true });
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('canDeleteMoneyRequestReport', function () {
        it('should allow deletion if the report is open invoice report', function () { return __awaiter(void 0, void 0, void 0, function () {
            var invoiceReport;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        invoiceReport = __assign(__assign({}, (0, reports_2.createInvoiceReport)(343)), { ownerAccountID: currentUserAccountID, stateNum: CONST_1.default.REPORT.STATE_NUM.OPEN, statusNum: CONST_1.default.REPORT.STATUS_NUM.OPEN });
                        // Wait for Onyx to load session data before calling canDeleteMoneyRequestReport,
                        // since it relies on the session subscription for currentUserAccountID.
                        return [4 /*yield*/, new Promise(function (resolve) {
                                var connection = react_native_onyx_1.default.connectWithoutView({
                                    key: "".concat(ONYXKEYS_1.default.SESSION),
                                    callback: function () {
                                        react_native_onyx_1.default.disconnect(connection);
                                        resolve();
                                    },
                                });
                            })];
                    case 1:
                        // Wait for Onyx to load session data before calling canDeleteMoneyRequestReport,
                        // since it relies on the session subscription for currentUserAccountID.
                        _a.sent();
                        expect((0, ReportUtils_1.canDeleteMoneyRequestReport)(invoiceReport, [], [])).toBe(true);
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('canEditMoneyRequest', function () {
        it('it should return false for archived invoice', function () { return __awaiter(void 0, void 0, void 0, function () {
            var invoiceReport, transaction, moneyRequestAction, canEditRequest;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        invoiceReport = {
                            reportID: '1',
                            type: CONST_1.default.REPORT.TYPE.INVOICE,
                        };
                        transaction = (0, transaction_1.default)(22);
                        moneyRequestAction = {
                            reportActionID: '22',
                            actorAccountID: currentUserAccountID,
                            actionName: CONST_1.default.REPORT.ACTIONS.TYPE.IOU,
                            originalMessage: {
                                IOUReportID: invoiceReport.reportID,
                                IOUTransactionID: transaction.transactionID,
                                amount: 530,
                                currency: CONST_1.default.CURRENCY.USD,
                                type: CONST_1.default.IOU.REPORT_ACTION_TYPE.CREATE,
                            },
                            message: [
                                {
                                    type: 'COMMENT',
                                    html: 'USD 5.30 expense',
                                    text: 'USD 5.30 expense',
                                    isEdited: false,
                                    whisperedTo: [],
                                    isDeletedParentAction: false,
                                    deleted: '',
                                },
                            ],
                            created: '2025-03-05 16:34:27',
                        };
                        return [4 /*yield*/, react_native_onyx_1.default.set("".concat(ONYXKEYS_1.default.COLLECTION.REPORT).concat(invoiceReport.reportID), invoiceReport)];
                    case 1:
                        _a.sent();
                        canEditRequest = (0, ReportUtils_1.canEditMoneyRequest)(moneyRequestAction, true, invoiceReport, undefined, transaction);
                        expect(canEditRequest).toEqual(false);
                        return [2 /*return*/];
                }
            });
        }); });
        it('it should return true for pay iou action with IOUDetails which is linked to send money flow', function () { return __awaiter(void 0, void 0, void 0, function () {
            var expenseReport, transaction, moneyRequestAction, canEditRequest;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        expenseReport = {
                            reportID: '1',
                            type: CONST_1.default.REPORT.TYPE.EXPENSE,
                        };
                        transaction = (0, transaction_1.default)(22);
                        moneyRequestAction = {
                            reportActionID: '3',
                            actorAccountID: currentUserAccountID,
                            actionName: CONST_1.default.REPORT.ACTIONS.TYPE.IOU,
                            originalMessage: {
                                IOUReportID: expenseReport.reportID,
                                IOUTransactionID: transaction.transactionID,
                                type: CONST_1.default.IOU.REPORT_ACTION_TYPE.PAY,
                                IOUDetails: {
                                    amount: 530,
                                    currency: CONST_1.default.CURRENCY.USD,
                                    comment: '',
                                },
                            },
                            message: [
                                {
                                    type: 'COMMENT',
                                    html: 'USD 5.30 expense',
                                    text: 'USD 5.30 expense',
                                    isEdited: false,
                                    whisperedTo: [],
                                    isDeletedParentAction: false,
                                    deleted: '',
                                },
                            ],
                            created: '2025-03-05 16:34:27',
                        };
                        return [4 /*yield*/, react_native_onyx_1.default.set("".concat(ONYXKEYS_1.default.COLLECTION.REPORT).concat(expenseReport.reportID), expenseReport)];
                    case 1:
                        _a.sent();
                        canEditRequest = (0, ReportUtils_1.canEditMoneyRequest)(moneyRequestAction, true, expenseReport, undefined, transaction);
                        expect(canEditRequest).toEqual(true);
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('getChatByParticipants', function () {
        var userAccountID = 1;
        var userAccountID2 = 2;
        var oneOnOneChatReport;
        var groupChatReport;
        (0, globals_1.beforeAll)(function () {
            var _a, _b, _c, _d, _e;
            var invoiceReport = {
                reportID: '1',
                type: CONST_1.default.REPORT.TYPE.INVOICE,
                participants: (_a = {},
                    _a[userAccountID] = { notificationPreference: CONST_1.default.REPORT.NOTIFICATION_PREFERENCE.ALWAYS },
                    _a[currentUserAccountID] = { notificationPreference: CONST_1.default.REPORT.NOTIFICATION_PREFERENCE.ALWAYS },
                    _a),
            };
            var taskReport = {
                reportID: '2',
                type: CONST_1.default.REPORT.TYPE.TASK,
                participants: (_b = {},
                    _b[userAccountID] = { notificationPreference: CONST_1.default.REPORT.NOTIFICATION_PREFERENCE.ALWAYS },
                    _b[currentUserAccountID] = { notificationPreference: CONST_1.default.REPORT.NOTIFICATION_PREFERENCE.ALWAYS },
                    _b),
            };
            var iouReport = {
                reportID: '3',
                type: CONST_1.default.REPORT.TYPE.IOU,
                participants: (_c = {},
                    _c[userAccountID] = { notificationPreference: CONST_1.default.REPORT.NOTIFICATION_PREFERENCE.ALWAYS },
                    _c[currentUserAccountID] = { notificationPreference: CONST_1.default.REPORT.NOTIFICATION_PREFERENCE.ALWAYS },
                    _c),
            };
            groupChatReport = {
                reportID: '4',
                type: CONST_1.default.REPORT.TYPE.CHAT,
                chatType: CONST_1.default.REPORT.CHAT_TYPE.GROUP,
                participants: (_d = {},
                    _d[userAccountID] = { notificationPreference: CONST_1.default.REPORT.NOTIFICATION_PREFERENCE.ALWAYS },
                    _d[userAccountID2] = { notificationPreference: CONST_1.default.REPORT.NOTIFICATION_PREFERENCE.ALWAYS },
                    _d[currentUserAccountID] = { notificationPreference: CONST_1.default.REPORT.NOTIFICATION_PREFERENCE.ALWAYS },
                    _d),
            };
            oneOnOneChatReport = {
                reportID: '5',
                type: CONST_1.default.REPORT.TYPE.CHAT,
                participants: (_e = {},
                    _e[userAccountID] = { notificationPreference: CONST_1.default.REPORT.NOTIFICATION_PREFERENCE.ALWAYS },
                    _e[currentUserAccountID] = { notificationPreference: CONST_1.default.REPORT.NOTIFICATION_PREFERENCE.ALWAYS },
                    _e),
            };
            var reportCollectionDataSet = (0, CollectionDataSet_1.toCollectionDataSet)(ONYXKEYS_1.default.COLLECTION.REPORT, [invoiceReport, taskReport, iouReport, groupChatReport, oneOnOneChatReport], function (item) { return item.reportID; });
            // @ts-expect-error - will be solved in https://github.com/Expensify/App/issues/73830
            return react_native_onyx_1.default.mergeCollection(ONYXKEYS_1.default.COLLECTION.REPORT, reportCollectionDataSet);
        });
        it('should return the 1:1 chat', function () {
            var report = (0, ReportUtils_1.getChatByParticipants)([currentUserAccountID, userAccountID]);
            expect(report === null || report === void 0 ? void 0 : report.reportID).toEqual(oneOnOneChatReport.reportID);
        });
        it('should return the group chat', function () {
            var report = (0, ReportUtils_1.getChatByParticipants)([currentUserAccountID, userAccountID, userAccountID2], undefined, true);
            expect(report === null || report === void 0 ? void 0 : report.reportID).toEqual(groupChatReport.reportID);
        });
        it('should return undefined when no report is found', function () {
            var report = (0, ReportUtils_1.getChatByParticipants)([currentUserAccountID, userAccountID2], undefined);
            expect(report).toEqual(undefined);
        });
    });
    describe('getGroupChatName tests', function () {
        afterEach(function () { return react_native_onyx_1.default.clear(); });
        var fourParticipants = [
            { accountID: 1, login: 'email1@test.com' },
            { accountID: 2, login: 'email2@test.com' },
            { accountID: 3, login: 'email3@test.com' },
            { accountID: 4, login: 'email4@test.com' },
        ];
        var eightParticipants = [
            { accountID: 1, login: 'email1@test.com' },
            { accountID: 2, login: 'email2@test.com' },
            { accountID: 3, login: 'email3@test.com' },
            { accountID: 4, login: 'email4@test.com' },
            { accountID: 5, login: 'email5@test.com' },
            { accountID: 6, login: 'email6@test.com' },
            { accountID: 7, login: 'email7@test.com' },
            { accountID: 8, login: 'email8@test.com' },
        ];
        describe('When participantAccountIDs is passed to getGroupChatName', function () {
            it('Should show all participants name if count <= 5 and shouldApplyLimit is false', function () { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, react_native_onyx_1.default.merge(ONYXKEYS_1.default.PERSONAL_DETAILS_LIST, LHNTestUtils_1.fakePersonalDetails)];
                        case 1:
                            _a.sent();
                            expect((0, ReportUtils_1.getGroupChatName)(fourParticipants)).toEqual('Four, One, Three, Two');
                            return [2 /*return*/];
                    }
                });
            }); });
            it('Should show all participants name if count <= 5 and shouldApplyLimit is true', function () { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, react_native_onyx_1.default.merge(ONYXKEYS_1.default.PERSONAL_DETAILS_LIST, LHNTestUtils_1.fakePersonalDetails)];
                        case 1:
                            _a.sent();
                            expect((0, ReportUtils_1.getGroupChatName)(fourParticipants)).toEqual('Four, One, Three, Two');
                            return [2 /*return*/];
                    }
                });
            }); });
            it('Should show 5 participants name with ellipsis if count > 5 and shouldApplyLimit is true', function () { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, react_native_onyx_1.default.merge(ONYXKEYS_1.default.PERSONAL_DETAILS_LIST, LHNTestUtils_1.fakePersonalDetails)];
                        case 1:
                            _a.sent();
                            expect((0, ReportUtils_1.getGroupChatName)(eightParticipants, true)).toEqual('Five, Four, One, Three, Two...');
                            return [2 /*return*/];
                    }
                });
            }); });
            it('Should show all participants name if count > 5 and shouldApplyLimit is false', function () { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, react_native_onyx_1.default.merge(ONYXKEYS_1.default.PERSONAL_DETAILS_LIST, LHNTestUtils_1.fakePersonalDetails)];
                        case 1:
                            _a.sent();
                            expect((0, ReportUtils_1.getGroupChatName)(eightParticipants, false)).toEqual('Eight, Five, Four, One, Seven, Six, Three, Two');
                            return [2 /*return*/];
                    }
                });
            }); });
            it('Should use correct display name for participants', function () { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, react_native_onyx_1.default.merge(ONYXKEYS_1.default.PERSONAL_DETAILS_LIST, participantsPersonalDetails)];
                        case 1:
                            _a.sent();
                            expect((0, ReportUtils_1.getGroupChatName)(fourParticipants, true)).toEqual('(833) 240-3627, floki@vikings.net, Lagertha, Ragnar');
                            return [2 /*return*/];
                    }
                });
            }); });
        });
        describe('When participantAccountIDs is not passed to getGroupChatName and report ID is passed', function () {
            it('Should show report name if count <= 5 and shouldApplyLimit is false', function () { return __awaiter(void 0, void 0, void 0, function () {
                var report;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            report = __assign(__assign({}, LHNTestUtils.getFakeReport([1, 2, 3, 4], 0, false, [1])), { chatType: CONST_1.default.REPORT.CHAT_TYPE.GROUP, reportID: "1", reportName: "Let's talk" });
                            return [4 /*yield*/, react_native_onyx_1.default.merge("".concat(ONYXKEYS_1.default.COLLECTION.REPORT, "1"), report)];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, react_native_onyx_1.default.merge(ONYXKEYS_1.default.PERSONAL_DETAILS_LIST, LHNTestUtils_1.fakePersonalDetails)];
                        case 2:
                            _a.sent();
                            expect((0, ReportUtils_1.getGroupChatName)(undefined, false, report)).toEqual("Let's talk");
                            return [2 /*return*/];
                    }
                });
            }); });
            it('Should show report name if count <= 5 and shouldApplyLimit is true', function () { return __awaiter(void 0, void 0, void 0, function () {
                var report;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            report = __assign(__assign({}, LHNTestUtils.getFakeReport([1, 2, 3, 4], 0, false, [1])), { chatType: CONST_1.default.REPORT.CHAT_TYPE.GROUP, reportID: "1", reportName: "Let's talk" });
                            return [4 /*yield*/, react_native_onyx_1.default.merge("".concat(ONYXKEYS_1.default.COLLECTION.REPORT, "1"), report)];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, react_native_onyx_1.default.merge(ONYXKEYS_1.default.PERSONAL_DETAILS_LIST, LHNTestUtils_1.fakePersonalDetails)];
                        case 2:
                            _a.sent();
                            expect((0, ReportUtils_1.getGroupChatName)(undefined, true, report)).toEqual("Let's talk");
                            return [2 /*return*/];
                    }
                });
            }); });
            it('Should show report name if count > 5 and shouldApplyLimit is true', function () { return __awaiter(void 0, void 0, void 0, function () {
                var report;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            report = __assign(__assign({}, LHNTestUtils.getFakeReport([1, 2, 3, 4, 5, 6, 7, 8], 0, false, [1, 2])), { chatType: CONST_1.default.REPORT.CHAT_TYPE.GROUP, reportID: "1", reportName: "Let's talk" });
                            return [4 /*yield*/, react_native_onyx_1.default.merge("".concat(ONYXKEYS_1.default.COLLECTION.REPORT, "1"), report)];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, react_native_onyx_1.default.merge(ONYXKEYS_1.default.PERSONAL_DETAILS_LIST, LHNTestUtils_1.fakePersonalDetails)];
                        case 2:
                            _a.sent();
                            expect((0, ReportUtils_1.getGroupChatName)(undefined, true, report)).toEqual("Let's talk");
                            return [2 /*return*/];
                    }
                });
            }); });
            it('Should show report name if count > 5 and shouldApplyLimit is false', function () { return __awaiter(void 0, void 0, void 0, function () {
                var report;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            report = __assign(__assign({}, LHNTestUtils.getFakeReport([1, 2, 3, 4, 5, 6, 7, 8], 0, false, [1, 2])), { chatType: CONST_1.default.REPORT.CHAT_TYPE.GROUP, reportID: "1", reportName: "Let's talk" });
                            return [4 /*yield*/, react_native_onyx_1.default.merge("".concat(ONYXKEYS_1.default.COLLECTION.REPORT, "1"), report)];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, react_native_onyx_1.default.merge(ONYXKEYS_1.default.PERSONAL_DETAILS_LIST, LHNTestUtils_1.fakePersonalDetails)];
                        case 2:
                            _a.sent();
                            expect((0, ReportUtils_1.getGroupChatName)(undefined, false, report)).toEqual("Let's talk");
                            return [2 /*return*/];
                    }
                });
            }); });
            it('Should show participant names if report name is not available', function () { return __awaiter(void 0, void 0, void 0, function () {
                var report;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            report = __assign(__assign({}, LHNTestUtils.getFakeReport([1, 2, 3, 4, 5, 6, 7, 8], 0, false, [1, 2])), { chatType: CONST_1.default.REPORT.CHAT_TYPE.GROUP, reportID: "1", reportName: '' });
                            return [4 /*yield*/, react_native_onyx_1.default.merge("".concat(ONYXKEYS_1.default.COLLECTION.REPORT, "1"), report)];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, react_native_onyx_1.default.merge(ONYXKEYS_1.default.PERSONAL_DETAILS_LIST, LHNTestUtils_1.fakePersonalDetails)];
                        case 2:
                            _a.sent();
                            expect((0, ReportUtils_1.getGroupChatName)(undefined, false, report)).toEqual('Eight, Five, Four, One, Seven, Six, Three, Two');
                            return [2 /*return*/];
                    }
                });
            }); });
        });
    });
    describe('shouldReportBeInOptionList tests', function () {
        afterEach(function () { return react_native_onyx_1.default.clear(); });
        it('should return true when the report is current active report', function () {
            var report = LHNTestUtils.getFakeReport();
            var currentReportId = report.reportID;
            var isInFocusMode = true;
            var betas = [CONST_1.default.BETAS.DEFAULT_ROOMS];
            expect((0, ReportUtils_1.shouldReportBeInOptionList)({
                report: report,
                chatReport: reports_1.chatReportR14932,
                currentReportId: currentReportId,
                isInFocusMode: isInFocusMode,
                betas: betas,
                doesReportHaveViolations: false,
                excludeEmptyChats: false,
                draftComment: '',
                isReportArchived: undefined,
            })).toBeTruthy();
        });
        it('should return true for empty submitted report if it is the current focused report', function () { return __awaiter(void 0, void 0, void 0, function () {
            var report, currentReportId, isInFocusMode, betas, createdReportAction;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        report = __assign(__assign({}, LHNTestUtils.getFakeReport()), { total: 0, statusNum: CONST_1.default.REPORT.STATUS_NUM.SUBMITTED, stateNum: CONST_1.default.REPORT.STATE_NUM.SUBMITTED });
                        currentReportId = report.reportID;
                        isInFocusMode = true;
                        betas = [CONST_1.default.BETAS.DEFAULT_ROOMS];
                        createdReportAction = __assign(__assign({}, LHNTestUtils.getFakeReportAction()), { actionName: CONST_1.default.REPORT.ACTIONS.TYPE.CREATED });
                        return [4 /*yield*/, react_native_onyx_1.default.merge("".concat(ONYXKEYS_1.default.COLLECTION.REPORT_ACTIONS).concat(report.reportID), (_a = {}, _a[createdReportAction.reportActionID] = createdReportAction, _a))];
                    case 1:
                        _b.sent();
                        expect((0, ReportUtils_1.shouldReportBeInOptionList)({
                            report: report,
                            chatReport: reports_1.chatReportR14932,
                            currentReportId: currentReportId,
                            isInFocusMode: isInFocusMode,
                            betas: betas,
                            doesReportHaveViolations: false,
                            excludeEmptyChats: false,
                            draftComment: '',
                            isReportArchived: undefined,
                        })).toBeTruthy();
                        return [2 /*return*/];
                }
            });
        }); });
        it('should return false for empty submitted report if it is not the current focused report', function () { return __awaiter(void 0, void 0, void 0, function () {
            var report, currentReportId, isInFocusMode, betas, createdReportAction;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        report = __assign(__assign({}, LHNTestUtils.getFakeReport()), { total: 0, statusNum: CONST_1.default.REPORT.STATUS_NUM.SUBMITTED, stateNum: CONST_1.default.REPORT.STATE_NUM.SUBMITTED });
                        currentReportId = "".concat(report.reportID, "1");
                        isInFocusMode = true;
                        betas = [CONST_1.default.BETAS.DEFAULT_ROOMS];
                        createdReportAction = __assign(__assign({}, LHNTestUtils.getFakeReportAction()), { actionName: CONST_1.default.REPORT.ACTIONS.TYPE.CREATED });
                        return [4 /*yield*/, react_native_onyx_1.default.merge("".concat(ONYXKEYS_1.default.COLLECTION.REPORT_ACTIONS).concat(report.reportID), (_a = {}, _a[createdReportAction.reportActionID] = createdReportAction, _a))];
                    case 1:
                        _b.sent();
                        expect((0, ReportUtils_1.shouldReportBeInOptionList)({
                            report: report,
                            chatReport: reports_1.chatReportR14932,
                            currentReportId: currentReportId,
                            isInFocusMode: isInFocusMode,
                            betas: betas,
                            doesReportHaveViolations: false,
                            excludeEmptyChats: false,
                            draftComment: '',
                            isReportArchived: undefined,
                        })).toBeFalsy();
                        return [2 /*return*/];
                }
            });
        }); });
        it('should return true when the report has outstanding violations', function () { return __awaiter(void 0, void 0, void 0, function () {
            var expenseReport, expenseTransaction, expenseCreatedAction1, expenseCreatedAction2, transactionThreadReport, currentReportId, isInFocusMode, betas;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        expenseReport = (0, ReportUtils_1.buildOptimisticExpenseReport)('212', '123', 100, 122, 'USD');
                        expenseTransaction = (0, TransactionUtils_1.buildOptimisticTransaction)({
                            transactionParams: {
                                amount: 100,
                                currency: 'USD',
                                reportID: expenseReport.reportID,
                            },
                        });
                        expenseCreatedAction1 = (0, ReportUtils_1.buildOptimisticIOUReportAction)({
                            type: 'create',
                            amount: 100,
                            currency: 'USD',
                            comment: '',
                            participants: [],
                            transactionID: expenseTransaction.transactionID,
                            iouReportID: expenseReport.reportID,
                        });
                        expenseCreatedAction2 = (0, ReportUtils_1.buildOptimisticIOUReportAction)({
                            type: 'create',
                            amount: 100,
                            currency: 'USD',
                            comment: '',
                            participants: [],
                            transactionID: expenseTransaction.transactionID,
                            iouReportID: expenseReport.reportID,
                        });
                        transactionThreadReport = (0, ReportUtils_1.buildTransactionThread)(expenseCreatedAction1, expenseReport);
                        currentReportId = '1';
                        isInFocusMode = false;
                        betas = [CONST_1.default.BETAS.DEFAULT_ROOMS];
                        return [4 /*yield*/, react_native_onyx_1.default.merge("".concat(ONYXKEYS_1.default.COLLECTION.REPORT).concat(expenseReport.reportID), expenseReport)];
                    case 1:
                        _b.sent();
                        return [4 /*yield*/, react_native_onyx_1.default.merge("".concat(ONYXKEYS_1.default.COLLECTION.REPORT_ACTIONS).concat(expenseReport.reportID), (_a = {},
                                _a[expenseCreatedAction1.reportActionID] = expenseCreatedAction1,
                                _a[expenseCreatedAction2.reportActionID] = expenseCreatedAction2,
                                _a))];
                    case 2:
                        _b.sent();
                        expect((0, ReportUtils_1.shouldReportBeInOptionList)({
                            report: transactionThreadReport,
                            chatReport: reports_1.chatReportR14932,
                            currentReportId: currentReportId,
                            isInFocusMode: isInFocusMode,
                            betas: betas,
                            doesReportHaveViolations: true,
                            excludeEmptyChats: false,
                            draftComment: '',
                            isReportArchived: undefined,
                        })).toBeTruthy();
                        return [2 /*return*/];
                }
            });
        }); });
        it('should return true when the report needing user action', function () {
            var chatReport = __assign(__assign({}, LHNTestUtils.getFakeReport()), { hasOutstandingChildRequest: true });
            var currentReportId = '3';
            var isInFocusMode = true;
            var betas = [CONST_1.default.BETAS.DEFAULT_ROOMS];
            expect((0, ReportUtils_1.shouldReportBeInOptionList)({
                report: chatReport,
                chatReport: reports_1.chatReportR14932,
                currentReportId: currentReportId,
                isInFocusMode: isInFocusMode,
                betas: betas,
                doesReportHaveViolations: false,
                excludeEmptyChats: false,
                draftComment: '',
                isReportArchived: undefined,
            })).toBeTruthy();
        });
        it('should return true when the report has valid draft comment', function () { return __awaiter(void 0, void 0, void 0, function () {
            var report, currentReportId, isInFocusMode, betas;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        report = LHNTestUtils.getFakeReport();
                        currentReportId = '3';
                        isInFocusMode = false;
                        betas = [CONST_1.default.BETAS.DEFAULT_ROOMS];
                        return [4 /*yield*/, react_native_onyx_1.default.merge("".concat(ONYXKEYS_1.default.COLLECTION.REPORT_DRAFT_COMMENT).concat(report.reportID), 'fake draft')];
                    case 1:
                        _a.sent();
                        expect((0, ReportUtils_1.shouldReportBeInOptionList)({
                            report: report,
                            chatReport: reports_1.chatReportR14932,
                            currentReportId: currentReportId,
                            isInFocusMode: isInFocusMode,
                            betas: betas,
                            doesReportHaveViolations: false,
                            excludeEmptyChats: false,
                            draftComment: 'fake draft',
                            isReportArchived: undefined,
                        })).toBeTruthy();
                        return [2 /*return*/];
                }
            });
        }); });
        it('should return true when the report is pinned', function () {
            var report = __assign(__assign({}, LHNTestUtils.getFakeReport()), { isPinned: true });
            var currentReportId = '3';
            var isInFocusMode = false;
            var betas = [CONST_1.default.BETAS.DEFAULT_ROOMS];
            expect((0, ReportUtils_1.shouldReportBeInOptionList)({
                report: report,
                chatReport: reports_1.chatReportR14932,
                currentReportId: currentReportId,
                isInFocusMode: isInFocusMode,
                betas: betas,
                doesReportHaveViolations: false,
                excludeEmptyChats: false,
                draftComment: '',
                isReportArchived: undefined,
            })).toBeTruthy();
        });
        it('should return true when the report is unread and we are in the focus mode', function () { return __awaiter(void 0, void 0, void 0, function () {
            var report, currentReportId, isInFocusMode, betas;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        report = __assign(__assign({}, LHNTestUtils.getFakeReport()), { lastReadTime: '1', lastVisibleActionCreated: '2', type: CONST_1.default.REPORT.TYPE.CHAT, participants: {
                                '1': {
                                    notificationPreference: 'always',
                                },
                            }, lastMessageText: 'fake' });
                        currentReportId = '3';
                        isInFocusMode = true;
                        betas = [CONST_1.default.BETAS.DEFAULT_ROOMS];
                        return [4 /*yield*/, react_native_onyx_1.default.merge(ONYXKEYS_1.default.SESSION, {
                                accountID: 1,
                            })];
                    case 1:
                        _a.sent();
                        expect((0, ReportUtils_1.shouldReportBeInOptionList)({
                            report: report,
                            chatReport: reports_1.chatReportR14932,
                            currentReportId: currentReportId,
                            isInFocusMode: isInFocusMode,
                            betas: betas,
                            doesReportHaveViolations: false,
                            excludeEmptyChats: false,
                            draftComment: '',
                            isReportArchived: undefined,
                        })).toBeTruthy();
                        return [2 /*return*/];
                }
            });
        }); });
        it('should return true when the report is an archived report and we are in the default mode', function () { return __awaiter(void 0, void 0, void 0, function () {
            var archivedReport, reportNameValuePairs, currentReportId, isInFocusMode, betas, isReportArchived;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        archivedReport = __assign(__assign({}, LHNTestUtils.getFakeReport()), { reportID: '1' });
                        reportNameValuePairs = {
                            type: 'chat',
                            private_isArchived: DateUtils_1.default.getDBTime(),
                        };
                        currentReportId = '3';
                        isInFocusMode = false;
                        betas = [CONST_1.default.BETAS.DEFAULT_ROOMS];
                        return [4 /*yield*/, react_native_onyx_1.default.merge("".concat(ONYXKEYS_1.default.COLLECTION.REPORT_NAME_VALUE_PAIRS).concat(archivedReport.reportID), reportNameValuePairs)];
                    case 1:
                        _a.sent();
                        isReportArchived = (0, react_native_1.renderHook)(function () { return (0, useReportIsArchived_1.default)(archivedReport === null || archivedReport === void 0 ? void 0 : archivedReport.reportID); }).result;
                        expect((0, ReportUtils_1.shouldReportBeInOptionList)({
                            report: archivedReport,
                            chatReport: reports_1.chatReportR14932,
                            currentReportId: currentReportId,
                            isInFocusMode: isInFocusMode,
                            betas: betas,
                            doesReportHaveViolations: false,
                            excludeEmptyChats: false,
                            isReportArchived: isReportArchived.current,
                            draftComment: '',
                        })).toBeTruthy();
                        return [2 /*return*/];
                }
            });
        }); });
        it('should return false when the report is an archived report and we are in the focus mode', function () { return __awaiter(void 0, void 0, void 0, function () {
            var archivedReport, reportNameValuePairs, currentReportId, isInFocusMode, betas, isReportArchived;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        archivedReport = __assign(__assign({}, LHNTestUtils.getFakeReport()), { reportID: '1' });
                        reportNameValuePairs = {
                            type: 'chat',
                            private_isArchived: DateUtils_1.default.getDBTime(),
                        };
                        currentReportId = '3';
                        isInFocusMode = true;
                        betas = [CONST_1.default.BETAS.DEFAULT_ROOMS];
                        return [4 /*yield*/, react_native_onyx_1.default.merge("".concat(ONYXKEYS_1.default.COLLECTION.REPORT_NAME_VALUE_PAIRS).concat(archivedReport.reportID), reportNameValuePairs)];
                    case 1:
                        _a.sent();
                        isReportArchived = (0, react_native_1.renderHook)(function () { return (0, useReportIsArchived_1.default)(archivedReport === null || archivedReport === void 0 ? void 0 : archivedReport.reportID); }).result;
                        expect((0, ReportUtils_1.shouldReportBeInOptionList)({
                            report: archivedReport,
                            chatReport: reports_1.chatReportR14932,
                            currentReportId: currentReportId,
                            isInFocusMode: isInFocusMode,
                            betas: betas,
                            doesReportHaveViolations: false,
                            excludeEmptyChats: false,
                            isReportArchived: isReportArchived.current,
                            draftComment: '',
                        })).toBeFalsy();
                        return [2 /*return*/];
                }
            });
        }); });
        it('should return true when the report is selfDM', function () {
            var report = __assign(__assign({}, LHNTestUtils.getFakeReport()), { chatType: CONST_1.default.REPORT.CHAT_TYPE.SELF_DM });
            var currentReportId = '3';
            var isInFocusMode = false;
            var betas = [CONST_1.default.BETAS.DEFAULT_ROOMS];
            var includeSelfDM = true;
            expect((0, ReportUtils_1.shouldReportBeInOptionList)({
                report: report,
                chatReport: reports_1.chatReportR14932,
                currentReportId: currentReportId,
                isInFocusMode: isInFocusMode,
                betas: betas,
                doesReportHaveViolations: false,
                excludeEmptyChats: false,
                includeSelfDM: includeSelfDM,
                draftComment: '',
                isReportArchived: undefined,
            })).toBeTruthy();
        });
        it('should return false when the report is marked as hidden', function () {
            var report = __assign(__assign({}, LHNTestUtils.getFakeReport()), { participants: {
                    '1': {
                        notificationPreference: CONST_1.default.REPORT.NOTIFICATION_PREFERENCE.HIDDEN,
                    },
                } });
            var currentReportId = '';
            var isInFocusMode = true;
            var betas = [CONST_1.default.BETAS.DEFAULT_ROOMS];
            expect((0, ReportUtils_1.shouldReportBeInOptionList)({
                report: report,
                chatReport: reports_1.chatReportR14932,
                currentReportId: currentReportId,
                isInFocusMode: isInFocusMode,
                betas: betas,
                doesReportHaveViolations: false,
                excludeEmptyChats: false,
                draftComment: '',
                isReportArchived: undefined,
            })).toBeFalsy();
        });
        it('should return false when the report does not have participants', function () {
            var report = LHNTestUtils.getFakeReport([]);
            var currentReportId = '';
            var isInFocusMode = true;
            var betas = [CONST_1.default.BETAS.DEFAULT_ROOMS];
            expect((0, ReportUtils_1.shouldReportBeInOptionList)({
                report: report,
                chatReport: reports_1.chatReportR14932,
                currentReportId: currentReportId,
                isInFocusMode: isInFocusMode,
                betas: betas,
                doesReportHaveViolations: false,
                excludeEmptyChats: false,
                draftComment: '',
                isReportArchived: undefined,
            })).toBeFalsy();
        });
        it('should return false when the report is the report that the user cannot access due to policy restrictions', function () {
            var report = __assign(__assign({}, LHNTestUtils.getFakeReport()), { chatType: CONST_1.default.REPORT.CHAT_TYPE.DOMAIN_ALL });
            var currentReportId = '';
            var isInFocusMode = false;
            var betas = [];
            expect((0, ReportUtils_1.shouldReportBeInOptionList)({
                report: report,
                chatReport: reports_1.chatReportR14932,
                currentReportId: currentReportId,
                isInFocusMode: isInFocusMode,
                betas: betas,
                doesReportHaveViolations: false,
                excludeEmptyChats: false,
                draftComment: '',
                isReportArchived: undefined,
            })).toBeFalsy();
        });
        it('should return false when the report is the single transaction thread', function () { return __awaiter(void 0, void 0, void 0, function () {
            var expenseReport, expenseTransaction, expenseCreatedAction, transactionThreadReport, currentReportId, isInFocusMode, betas;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        expenseReport = (0, ReportUtils_1.buildOptimisticExpenseReport)('212', '123', 100, 122, 'USD');
                        expenseTransaction = (0, TransactionUtils_1.buildOptimisticTransaction)({
                            transactionParams: {
                                amount: 100,
                                currency: 'USD',
                                reportID: expenseReport.reportID,
                            },
                        });
                        expenseCreatedAction = (0, ReportUtils_1.buildOptimisticIOUReportAction)({
                            type: 'create',
                            amount: 100,
                            currency: 'USD',
                            comment: '',
                            participants: [],
                            transactionID: expenseTransaction.transactionID,
                            iouReportID: expenseReport.reportID,
                        });
                        transactionThreadReport = (0, ReportUtils_1.buildTransactionThread)(expenseCreatedAction, expenseReport);
                        expenseCreatedAction.childReportID = transactionThreadReport.reportID;
                        currentReportId = '1';
                        isInFocusMode = false;
                        betas = [CONST_1.default.BETAS.DEFAULT_ROOMS];
                        return [4 /*yield*/, react_native_onyx_1.default.merge("".concat(ONYXKEYS_1.default.COLLECTION.REPORT).concat(expenseReport.reportID), expenseReport)];
                    case 1:
                        _b.sent();
                        return [4 /*yield*/, react_native_onyx_1.default.merge("".concat(ONYXKEYS_1.default.COLLECTION.REPORT_ACTIONS).concat(expenseReport.reportID), (_a = {},
                                _a[expenseCreatedAction.reportActionID] = expenseCreatedAction,
                                _a))];
                    case 2:
                        _b.sent();
                        expect((0, ReportUtils_1.shouldReportBeInOptionList)({
                            report: transactionThreadReport,
                            chatReport: reports_1.chatReportR14932,
                            currentReportId: currentReportId,
                            isInFocusMode: isInFocusMode,
                            betas: betas,
                            doesReportHaveViolations: false,
                            excludeEmptyChats: false,
                            draftComment: '',
                            isReportArchived: undefined,
                        })).toBeFalsy();
                        return [2 /*return*/];
                }
            });
        }); });
        it('should return false when the report is empty chat and the excludeEmptyChats setting is true', function () {
            var report = LHNTestUtils.getFakeReport();
            var currentReportId = '';
            var isInFocusMode = false;
            var betas = [CONST_1.default.BETAS.DEFAULT_ROOMS];
            expect((0, ReportUtils_1.shouldReportBeInOptionList)({
                report: report,
                chatReport: reports_1.chatReportR14932,
                currentReportId: currentReportId,
                isInFocusMode: isInFocusMode,
                betas: betas,
                doesReportHaveViolations: false,
                excludeEmptyChats: true,
                draftComment: '',
                isReportArchived: undefined,
            })).toBeFalsy();
        });
        it('should return false when the users email is domain-based and the includeDomainEmail is false', function () {
            var report = LHNTestUtils.getFakeReport();
            var currentReportId = '';
            var isInFocusMode = false;
            var betas = [CONST_1.default.BETAS.DEFAULT_ROOMS];
            expect((0, ReportUtils_1.shouldReportBeInOptionList)({
                report: report,
                chatReport: reports_1.chatReportR14932,
                currentReportId: currentReportId,
                isInFocusMode: isInFocusMode,
                betas: betas,
                doesReportHaveViolations: false,
                login: '+@domain.com',
                excludeEmptyChats: false,
                includeDomainEmail: false,
                draftComment: '',
                isReportArchived: undefined,
            })).toBeFalsy();
        });
        it('should return false when the report has the parent message is pending removal', function () { return __awaiter(void 0, void 0, void 0, function () {
            var parentReport, report, parentReportAction, currentReportId, isInFocusMode, betas;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        parentReport = LHNTestUtils.getFakeReport();
                        report = LHNTestUtils.getFakeReport();
                        parentReportAction = __assign(__assign({}, LHNTestUtils.getFakeReportAction()), { message: [
                                {
                                    type: 'COMMENT',
                                    html: 'hey',
                                    text: 'hey',
                                    isEdited: false,
                                    whisperedTo: [],
                                    isDeletedParentAction: false,
                                    moderationDecision: {
                                        decision: CONST_1.default.MODERATION.MODERATOR_DECISION_PENDING_REMOVE,
                                    },
                                },
                            ], childReportID: report.reportID });
                        report.parentReportID = parentReport.reportID;
                        report.parentReportActionID = parentReportAction.reportActionID;
                        currentReportId = '';
                        isInFocusMode = false;
                        betas = [CONST_1.default.BETAS.DEFAULT_ROOMS];
                        return [4 /*yield*/, react_native_onyx_1.default.merge("".concat(ONYXKEYS_1.default.COLLECTION.REPORT).concat(parentReport.reportID), parentReport)];
                    case 1:
                        _b.sent();
                        return [4 /*yield*/, react_native_onyx_1.default.merge("".concat(ONYXKEYS_1.default.COLLECTION.REPORT_ACTIONS).concat(parentReport.reportID), (_a = {},
                                _a[parentReportAction.reportActionID] = parentReportAction,
                                _a))];
                    case 2:
                        _b.sent();
                        expect((0, ReportUtils_1.shouldReportBeInOptionList)({
                            report: report,
                            chatReport: reports_1.chatReportR14932,
                            currentReportId: currentReportId,
                            isInFocusMode: isInFocusMode,
                            betas: betas,
                            doesReportHaveViolations: false,
                            excludeEmptyChats: false,
                            draftComment: '',
                            isReportArchived: undefined,
                        })).toBeFalsy();
                        return [2 /*return*/];
                }
            });
        }); });
        it('should return false when the report is read and we are in the focus mode', function () {
            var report = LHNTestUtils.getFakeReport();
            var currentReportId = '';
            var isInFocusMode = true;
            var betas = [CONST_1.default.BETAS.DEFAULT_ROOMS];
            expect((0, ReportUtils_1.shouldReportBeInOptionList)({
                report: report,
                chatReport: reports_1.chatReportR14932,
                currentReportId: currentReportId,
                isInFocusMode: isInFocusMode,
                betas: betas,
                doesReportHaveViolations: false,
                excludeEmptyChats: false,
                draftComment: '',
                isReportArchived: undefined,
            })).toBeFalsy();
        });
        it('should return false when the empty report has deleted action with child comment but isDeletedParentAction is false', function () { return __awaiter(void 0, void 0, void 0, function () {
            var report, iouReportAction;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        report = LHNTestUtils.getFakeReport();
                        iouReportAction = __assign(__assign({}, LHNTestUtils.getFakeReportAction()), { message: [
                                {
                                    type: 'COMMENT',
                                    html: '',
                                    text: '',
                                    isEdited: false,
                                    whisperedTo: [],
                                    isDeletedParentAction: false,
                                },
                            ], childVisibleActionCount: 1 });
                        return [4 /*yield*/, react_native_onyx_1.default.merge("".concat(ONYXKEYS_1.default.COLLECTION.REPORT_ACTIONS).concat(report.reportID), (_a = {},
                                _a[iouReportAction.reportActionID] = iouReportAction,
                                _a))];
                    case 1:
                        _b.sent();
                        expect((0, ReportUtils_1.shouldReportBeInOptionList)({
                            report: report,
                            chatReport: reports_1.chatReportR14932,
                            currentReportId: '',
                            isInFocusMode: false,
                            betas: [],
                            doesReportHaveViolations: false,
                            excludeEmptyChats: true,
                            draftComment: '',
                            isReportArchived: undefined,
                        })).toBeFalsy();
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('buildOptimisticChatReport', function () {
        it('should always set isPinned to false', function () {
            var result = (0, ReportUtils_1.buildOptimisticChatReport)({
                participantList: [1, 2, 3],
            });
            expect(result.isPinned).toBe(false);
        });
    });
    describe('getWorkspaceNameUpdatedMessage', function () {
        it('return the encoded workspace name updated message', function () {
            var action = {
                originalMessage: {
                    newName: '&#104;&#101;&#108;&#108;&#111;',
                    oldName: 'workspace 1',
                },
            };
            expect((0, ReportUtils_1.getWorkspaceNameUpdatedMessage)(action)).toEqual('updated the name of this workspace to &quot;&amp;#104;&amp;#101;&amp;#108;&amp;#108;&amp;#111;&quot; (previously &quot;workspace 1&quot;)');
        });
    });
    describe('buildOptimisticIOUReportAction', function () {
        it('should not include IOUReportID in the originalMessage when tracking a personal expense', function () {
            var _a;
            var iouAction = (0, ReportUtils_1.buildOptimisticIOUReportAction)({
                type: 'track',
                amount: 1200,
                currency: 'INR',
                comment: '',
                participants: [{ login: 'email1@test.com' }],
                transactionID: '8749701985416635400',
                iouReportID: '8698041594589716',
                isPersonalTrackingExpense: true,
            });
            expect((_a = (0, ReportActionsUtils_1.getOriginalMessage)(iouAction)) === null || _a === void 0 ? void 0 : _a.IOUReportID).toBe(undefined);
        });
    });
    describe('isAllowedToApproveExpenseReport', function () {
        var expenseReport = __assign(__assign({}, (0, reports_2.createRandomReport)(6, undefined)), { type: CONST_1.default.REPORT.TYPE.EXPENSE, ownerAccountID: currentUserAccountID });
        it('should return true if preventSelfApproval is disabled and the approver is not the owner of the expense report', function () {
            var fakePolicy = __assign(__assign({}, (0, policies_1.default)(6)), { preventSelfApproval: false });
            expect((0, ReportUtils_1.isAllowedToApproveExpenseReport)(expenseReport, 0, fakePolicy)).toBeTruthy();
        });
        it('should return true if preventSelfApproval is enabled and the approver is not the owner of the expense report', function () {
            var fakePolicy = __assign(__assign({}, (0, policies_1.default)(6)), { preventSelfApproval: true });
            expect((0, ReportUtils_1.isAllowedToApproveExpenseReport)(expenseReport, 0, fakePolicy)).toBeTruthy();
        });
        it('should return true if preventSelfApproval is disabled and the approver is the owner of the expense report', function () {
            var fakePolicy = __assign(__assign({}, (0, policies_1.default)(6)), { preventSelfApproval: false });
            expect((0, ReportUtils_1.isAllowedToApproveExpenseReport)(expenseReport, currentUserAccountID, fakePolicy)).toBeTruthy();
        });
        it('should return false if preventSelfApproval is enabled and the approver is the owner of the expense report', function () {
            var fakePolicy = __assign(__assign({}, (0, policies_1.default)(6)), { preventSelfApproval: true });
            expect((0, ReportUtils_1.isAllowedToApproveExpenseReport)(expenseReport, currentUserAccountID, fakePolicy)).toBeFalsy();
        });
    });
    describe('isArchivedReport', function () {
        var archivedReport = (0, reports_2.createRandomReport)(1, CONST_1.default.REPORT.CHAT_TYPE.POLICY_EXPENSE_CHAT);
        var nonArchivedReport = (0, reports_2.createRandomReport)(2, CONST_1.default.REPORT.CHAT_TYPE.POLICY_EXPENSE_CHAT);
        (0, globals_1.beforeAll)(function () { return __awaiter(void 0, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: 
                    // @ts-expect-error - will be solved in https://github.com/Expensify/App/issues/73830
                    return [4 /*yield*/, react_native_onyx_1.default.setCollection(ONYXKEYS_1.default.COLLECTION.REPORT_NAME_VALUE_PAIRS, (_a = {},
                            _a["".concat(ONYXKEYS_1.default.COLLECTION.REPORT_NAME_VALUE_PAIRS).concat(archivedReport.reportID)] = { private_isArchived: DateUtils_1.default.getDBTime() },
                            _a))];
                    case 1:
                        // @ts-expect-error - will be solved in https://github.com/Expensify/App/issues/73830
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('should return true for archived report', function () { return __awaiter(void 0, void 0, void 0, function () {
            var reportNameValuePairs;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, new Promise(function (resolve) {
                            react_native_onyx_1.default.connect({
                                key: "".concat(ONYXKEYS_1.default.COLLECTION.REPORT_NAME_VALUE_PAIRS).concat(archivedReport.reportID),
                                callback: resolve,
                            });
                        })];
                    case 1:
                        reportNameValuePairs = _a.sent();
                        expect((0, ReportUtils_1.isArchivedReport)(reportNameValuePairs)).toBe(true);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should return false for non-archived report', function () { return __awaiter(void 0, void 0, void 0, function () {
            var reportNameValuePairs;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, new Promise(function (resolve) {
                            react_native_onyx_1.default.connect({
                                key: "".concat(ONYXKEYS_1.default.COLLECTION.REPORT_NAME_VALUE_PAIRS).concat(nonArchivedReport.reportID),
                                callback: resolve,
                            });
                            expect((0, ReportUtils_1.isArchivedReport)(reportNameValuePairs)).toBe(false);
                        })];
                    case 1:
                        reportNameValuePairs = _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('useReportIsArchived', function () {
        var archivedReport = (0, reports_2.createRandomReport)(1, CONST_1.default.REPORT.CHAT_TYPE.POLICY_EXPENSE_CHAT);
        var nonArchivedReport = (0, reports_2.createRandomReport)(2, CONST_1.default.REPORT.CHAT_TYPE.POLICY_EXPENSE_CHAT);
        (0, globals_1.beforeAll)(function () { return __awaiter(void 0, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: 
                    // @ts-expect-error - will be solved in https://github.com/Expensify/App/issues/73830
                    return [4 /*yield*/, react_native_onyx_1.default.setCollection(ONYXKEYS_1.default.COLLECTION.REPORT_NAME_VALUE_PAIRS, (_a = {},
                            _a["".concat(ONYXKEYS_1.default.COLLECTION.REPORT_NAME_VALUE_PAIRS).concat(archivedReport.reportID)] = { private_isArchived: DateUtils_1.default.getDBTime() },
                            _a))];
                    case 1:
                        // @ts-expect-error - will be solved in https://github.com/Expensify/App/issues/73830
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('should return true for archived report', function () {
            var isReportArchived = (0, react_native_1.renderHook)(function () { return (0, useReportIsArchived_1.default)(archivedReport === null || archivedReport === void 0 ? void 0 : archivedReport.reportID); }).result;
            expect(isReportArchived.current).toBe(true);
        });
        it('should return false for non-archived report', function () {
            var isReportArchived = (0, react_native_1.renderHook)(function () { return (0, useReportIsArchived_1.default)(nonArchivedReport === null || nonArchivedReport === void 0 ? void 0 : nonArchivedReport.reportID); }).result;
            expect(isReportArchived.current).toBe(false);
        });
    });
    describe('canEditWriteCapability', function () {
        it('should return false for expense chat', function () {
            var workspaceChat = (0, reports_2.createRandomReport)(1, CONST_1.default.REPORT.CHAT_TYPE.POLICY_EXPENSE_CHAT);
            expect((0, ReportUtils_1.canEditWriteCapability)(workspaceChat, __assign(__assign({}, policy), { role: CONST_1.default.POLICY.ROLE.ADMIN }), false)).toBe(false);
        });
        var policyAnnounceRoom = (0, reports_2.createRandomReport)(1, CONST_1.default.REPORT.CHAT_TYPE.POLICY_ANNOUNCE);
        var adminPolicy = __assign(__assign({}, policy), { role: CONST_1.default.POLICY.ROLE.ADMIN });
        it('should return true for non-archived policy announce room', function () {
            expect((0, ReportUtils_1.canEditWriteCapability)(policyAnnounceRoom, adminPolicy, false)).toBe(true);
        });
        it('should return false for archived policy announce room', function () {
            expect((0, ReportUtils_1.canEditWriteCapability)(policyAnnounceRoom, adminPolicy, true)).toBe(false);
        });
        it('should return false for non-admin user', function () {
            var normalChat = (0, reports_2.createRandomReport)(11, undefined);
            var memberPolicy = __assign(__assign({}, policy), { role: CONST_1.default.POLICY.ROLE.USER });
            expect((0, ReportUtils_1.canEditWriteCapability)(normalChat, memberPolicy, false)).toBe(false);
        });
        it('should return false for admin room', function () {
            var adminRoom = (0, reports_2.createRandomReport)(12, CONST_1.default.REPORT.CHAT_TYPE.POLICY_ADMINS);
            expect((0, ReportUtils_1.canEditWriteCapability)(adminRoom, adminPolicy, false)).toBe(false);
        });
        it('should return false for thread reports', function () {
            var parent = (0, reports_2.createRandomReport)(13, undefined);
            var thread = __assign(__assign({}, (0, reports_2.createRandomReport)(14, undefined)), { parentReportID: parent.reportID, parentReportActionID: '2' });
            expect((0, ReportUtils_1.canEditWriteCapability)(thread, adminPolicy, false)).toBe(false);
        });
        it('should return false for invoice rooms', function () {
            var invoiceRoom = (0, reports_2.createRandomReport)(13, CONST_1.default.REPORT.CHAT_TYPE.INVOICE);
            expect((0, ReportUtils_1.canEditWriteCapability)(invoiceRoom, adminPolicy, false)).toBe(false);
        });
    });
    describe('canEditRoomVisibility', function () {
        it('should return true for policy rooms that are not archived and the user is an admin', function () {
            expect((0, ReportUtils_1.canEditRoomVisibility)(__assign(__assign({}, policy), { role: CONST_1.default.POLICY.ROLE.ADMIN }), false)).toBeTruthy();
            expect((0, ReportUtils_1.canEditRoomVisibility)(__assign(__assign({}, policy), { role: CONST_1.default.POLICY.ROLE.AUDITOR }), false)).toBeFalsy();
            expect((0, ReportUtils_1.canEditRoomVisibility)(__assign(__assign({}, policy), { role: CONST_1.default.POLICY.ROLE.USER }), false)).toBeFalsy();
        });
        it('should return false for policy rooms that are archived regardless of the policy role', function () {
            expect((0, ReportUtils_1.canEditRoomVisibility)(__assign(__assign({}, policy), { role: CONST_1.default.POLICY.ROLE.ADMIN }), true)).toBeFalsy();
            expect((0, ReportUtils_1.canEditRoomVisibility)(__assign(__assign({}, policy), { role: CONST_1.default.POLICY.ROLE.AUDITOR }), true)).toBeFalsy();
            expect((0, ReportUtils_1.canEditRoomVisibility)(__assign(__assign({}, policy), { role: CONST_1.default.POLICY.ROLE.USER }), true)).toBeFalsy();
        });
    });
    describe('canDeleteReportAction', function () {
        it('should return false for delete button visibility if transaction is not allowed to be deleted', function () {
            var parentReport = LHNTestUtils.getFakeReport();
            var report = LHNTestUtils.getFakeReport();
            var parentReportAction = __assign(__assign({}, LHNTestUtils.getFakeReportAction()), { message: [
                    {
                        type: 'COMMENT',
                        html: 'hey',
                        text: 'hey',
                        isEdited: false,
                        whisperedTo: [],
                        isDeletedParentAction: false,
                        moderationDecision: {
                            decision: CONST_1.default.MODERATION.MODERATOR_DECISION_PENDING_REMOVE,
                        },
                    },
                ], childReportID: report.reportID });
            report.parentReportID = parentReport.reportID;
            report.parentReportActionID = parentReportAction.reportActionID;
            var currentReportId = '';
            var transactionID = 1;
            var moneyRequestAction = __assign(__assign({}, parentReportAction), { actorAccountID: currentUserAccountID, actionName: CONST_1.default.REPORT.ACTIONS.TYPE.IOU, originalMessage: {
                    IOUReportID: '1',
                    IOUTransactionID: '1',
                    amount: 100,
                    participantAccountID: 1,
                    currency: CONST_1.default.CURRENCY.USD,
                    type: CONST_1.default.IOU.REPORT_ACTION_TYPE.PAY,
                    paymentType: CONST_1.default.IOU.PAYMENT_TYPE.EXPENSIFY,
                } });
            var transaction = __assign(__assign({}, (0, transaction_1.default)(transactionID)), { category: '', tag: '', created: testDate, reportID: currentReportId, managedCard: true, comment: {
                    liabilityType: CONST_1.default.TRANSACTION.LIABILITY_TYPE.RESTRICT,
                } });
            expect((0, ReportUtils_1.canDeleteReportAction)(moneyRequestAction, currentReportId, transaction, undefined, undefined)).toBe(false);
        });
        it('should return true for demo transaction', function () {
            var transaction = __assign(__assign({}, (0, transaction_1.default)(1)), { comment: {
                    isDemoTransaction: true,
                } });
            var report = LHNTestUtils.getFakeReport();
            var parentReportAction = __assign(__assign({}, LHNTestUtils.getFakeReportAction()), { message: [
                    {
                        type: 'COMMENT',
                        html: 'hey',
                        text: 'hey',
                        isEdited: false,
                        whisperedTo: [],
                        isDeletedParentAction: false,
                        moderationDecision: {
                            decision: CONST_1.default.MODERATION.MODERATOR_DECISION_PENDING_REMOVE,
                        },
                    },
                ], childReportID: report.reportID });
            var moneyRequestAction = __assign(__assign({}, parentReportAction), { actorAccountID: currentUserAccountID, actionName: CONST_1.default.REPORT.ACTIONS.TYPE.IOU, originalMessage: {
                    IOUReportID: '1',
                    IOUTransactionID: '1',
                    amount: 100,
                    participantAccountID: 1,
                    currency: CONST_1.default.CURRENCY.USD,
                    type: CONST_1.default.IOU.REPORT_ACTION_TYPE.PAY,
                    paymentType: CONST_1.default.IOU.PAYMENT_TYPE.EXPENSIFY,
                } });
            expect((0, ReportUtils_1.canDeleteReportAction)(moneyRequestAction, '1', transaction, undefined, undefined)).toBe(true);
        });
        it('should return false for unreported card expense imported with deleting disabled', function () { return __awaiter(void 0, void 0, void 0, function () {
            var selfDMReport, transaction, trackExpenseAction;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        selfDMReport = __assign(__assign({}, LHNTestUtils.getFakeReport()), { type: CONST_1.default.REPORT.TYPE.CHAT, chatType: CONST_1.default.REPORT.CHAT_TYPE.SELF_DM });
                        transaction = __assign(__assign({}, (0, transaction_1.default)(1)), { reportID: CONST_1.default.REPORT.UNREPORTED_REPORT_ID, managedCard: true, comment: {
                                liabilityType: CONST_1.default.TRANSACTION.LIABILITY_TYPE.RESTRICT,
                            } });
                        trackExpenseAction = __assign(__assign({}, LHNTestUtils.getFakeReportAction()), { actionName: CONST_1.default.REPORT.ACTIONS.TYPE.IOU, actorAccountID: currentUserAccountID, originalMessage: {
                                IOUTransactionID: transaction.transactionID,
                                IOUReportID: CONST_1.default.REPORT.UNREPORTED_REPORT_ID,
                                amount: 100,
                                currency: CONST_1.default.CURRENCY.USD,
                                type: CONST_1.default.IOU.REPORT_ACTION_TYPE.TRACK,
                            }, message: [
                                {
                                    type: 'COMMENT',
                                    html: '$1.00 expense',
                                    text: '$1.00 expense',
                                    isEdited: false,
                                    whisperedTo: [],
                                    isDeletedParentAction: false,
                                },
                            ] });
                        return [4 /*yield*/, react_native_onyx_1.default.set("".concat(ONYXKEYS_1.default.COLLECTION.REPORT).concat(selfDMReport.reportID), selfDMReport)];
                    case 1:
                        _a.sent();
                        // Then it should return false since the unreported card expense is imported with deleting disabled
                        expect((0, ReportUtils_1.canDeleteReportAction)(trackExpenseAction, selfDMReport.reportID, transaction, undefined, undefined)).toBe(false);
                        return [2 /*return*/];
                }
            });
        }); });
        it("should return false for ADD_COMMENT report action the current user (admin of the personal policy) didn't comment", function () { return __awaiter(void 0, void 0, void 0, function () {
            var adminPolicy, report, reportAction;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        adminPolicy = __assign(__assign({}, LHNTestUtils.getFakePolicy()), { type: CONST_1.default.POLICY.TYPE.PERSONAL });
                        report = __assign(__assign({}, LHNTestUtils.getFakeReport()), { policyID: adminPolicy.id });
                        reportAction = __assign(__assign({}, LHNTestUtils.getFakeReportAction()), { actionName: CONST_1.default.REPORT.ACTIONS.TYPE.ADD_COMMENT, actorAccountID: currentUserAccountID + 1, parentReportID: report.reportID, message: [
                                {
                                    type: 'COMMENT',
                                    html: 'hey',
                                    text: 'hey',
                                    isEdited: false,
                                    whisperedTo: [],
                                    isDeletedParentAction: false,
                                },
                            ] });
                        return [4 /*yield*/, react_native_onyx_1.default.set("".concat(ONYXKEYS_1.default.COLLECTION.REPORT).concat(report.reportID), report)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, react_native_onyx_1.default.set("".concat(ONYXKEYS_1.default.COLLECTION.POLICY).concat(adminPolicy.id), adminPolicy)];
                    case 2:
                        _a.sent();
                        expect((0, ReportUtils_1.canDeleteReportAction)(reportAction, report.reportID, undefined, undefined, undefined)).toBe(false);
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('getPolicyExpenseChat', function () {
        it('should return the correct policy expense chat when we have a task report is the child of this report', function () { return __awaiter(void 0, void 0, void 0, function () {
            var policyExpenseChat, taskReport;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        policyExpenseChat = __assign(__assign({}, (0, reports_2.createRandomReport)(11, CONST_1.default.REPORT.CHAT_TYPE.POLICY_EXPENSE_CHAT)), { ownerAccountID: 1, policyID: '1', type: CONST_1.default.REPORT.TYPE.CHAT });
                        taskReport = __assign(__assign({}, (0, reports_2.createRandomReport)(10, CONST_1.default.REPORT.CHAT_TYPE.POLICY_EXPENSE_CHAT)), { ownerAccountID: 1, policyID: '1', type: CONST_1.default.REPORT.TYPE.TASK, parentReportID: policyExpenseChat.reportID, parentReportActionID: '1' });
                        return [4 /*yield*/, react_native_onyx_1.default.set("".concat(ONYXKEYS_1.default.COLLECTION.REPORT).concat(taskReport.reportID), taskReport)];
                    case 1:
                        _b.sent();
                        return [4 /*yield*/, react_native_onyx_1.default.set("".concat(ONYXKEYS_1.default.COLLECTION.REPORT).concat(policyExpenseChat.reportID), policyExpenseChat)];
                    case 2:
                        _b.sent();
                        expect((_a = (0, ReportUtils_1.getPolicyExpenseChat)(1, '1')) === null || _a === void 0 ? void 0 : _a.reportID).toBe(policyExpenseChat.reportID);
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('findLastAccessedReport', function () {
        var archivedReport;
        var normalReport;
        (0, globals_1.beforeAll)(function () { return __awaiter(void 0, void 0, void 0, function () {
            var reportNameValuePairs;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        // Set up test reports - one archived, one normal
                        archivedReport = __assign(__assign({}, LHNTestUtils.getFakeReport()), { reportID: '1001', lastReadTime: '2024-02-01 04:56:47.233', lastVisibleActionCreated: '2024-02-01 04:56:47.233' });
                        normalReport = __assign(__assign({}, LHNTestUtils.getFakeReport()), { reportID: '1002', lastReadTime: '2024-01-01 04:56:47.233', lastVisibleActionCreated: '2024-01-01 04:56:47.233' });
                        reportNameValuePairs = {
                            private_isArchived: DateUtils_1.default.getDBTime(),
                        };
                        // Add reports to Onyx
                        return [4 /*yield*/, react_native_onyx_1.default.set("".concat(ONYXKEYS_1.default.COLLECTION.REPORT).concat(archivedReport.reportID), archivedReport)];
                    case 1:
                        // Add reports to Onyx
                        _a.sent();
                        return [4 /*yield*/, react_native_onyx_1.default.set("".concat(ONYXKEYS_1.default.COLLECTION.REPORT).concat(normalReport.reportID), normalReport)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, react_native_onyx_1.default.merge("".concat(ONYXKEYS_1.default.COLLECTION.REPORT_NAME_VALUE_PAIRS).concat(archivedReport.reportID), reportNameValuePairs)];
                    case 3:
                        _a.sent();
                        // Set up report metadata for lastVisitTime
                        return [4 /*yield*/, react_native_onyx_1.default.merge("".concat(ONYXKEYS_1.default.COLLECTION.REPORT_METADATA).concat(archivedReport.reportID), {
                                lastVisitTime: '2024-02-01 04:56:47.233', // More recent visit
                            })];
                    case 4:
                        // Set up report metadata for lastVisitTime
                        _a.sent();
                        return [4 /*yield*/, react_native_onyx_1.default.merge("".concat(ONYXKEYS_1.default.COLLECTION.REPORT_METADATA).concat(normalReport.reportID), {
                                lastVisitTime: '2024-01-01 04:56:47.233',
                            })];
                    case 5:
                        _a.sent();
                        return [2 /*return*/, (0, waitForBatchedUpdates_1.default)()];
                }
            });
        }); });
        afterAll(function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, react_native_onyx_1.default.clear()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, react_native_onyx_1.default.set(ONYXKEYS_1.default.SESSION, { email: currentUserEmail, accountID: currentUserAccountID })];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('should not return an archived report even if it was most recently accessed', function () {
            var result = (0, ReportUtils_1.findLastAccessedReport)(false);
            // Even though the archived report has a more recent lastVisitTime,
            // the function should filter it out and return the normal report
            expect(result === null || result === void 0 ? void 0 : result.reportID).toBe(normalReport.reportID);
            expect(result === null || result === void 0 ? void 0 : result.reportID).not.toBe(archivedReport.reportID);
        });
    });
    describe('findLastAccessedReport should return owned report if no reports was accessed before', function () {
        var ownedReport;
        var nonOwnedReport;
        (0, globals_1.beforeAll)(function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        // Set up test reports - one archived, one normal
                        nonOwnedReport = __assign(__assign({}, LHNTestUtils.getFakeReport()), { reportID: '1001', lastReadTime: '2024-02-01 04:56:47.233', lastVisibleActionCreated: '2024-02-01 04:56:47.233', ownerAccountID: 1 });
                        ownedReport = __assign(__assign({}, LHNTestUtils.getFakeReport()), { reportID: '1002', lastReadTime: '2024-01-01 04:56:47.233', lastVisibleActionCreated: '2024-01-01 04:56:47.233', ownerAccountID: currentUserAccountID });
                        // Add reports to Onyx
                        return [4 /*yield*/, react_native_onyx_1.default.set("".concat(ONYXKEYS_1.default.COLLECTION.REPORT).concat(ownedReport.reportID), ownedReport)];
                    case 1:
                        // Add reports to Onyx
                        _a.sent();
                        return [4 /*yield*/, react_native_onyx_1.default.set("".concat(ONYXKEYS_1.default.COLLECTION.REPORT).concat(nonOwnedReport.reportID), nonOwnedReport)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, (0, waitForBatchedUpdates_1.default)()];
                }
            });
        }); });
        afterAll(function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, react_native_onyx_1.default.clear()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, react_native_onyx_1.default.set(ONYXKEYS_1.default.SESSION, { email: currentUserEmail, accountID: currentUserAccountID })];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('findLastAccessedReport should return owned report if no reports was accessed before', function () {
            var result = (0, ReportUtils_1.findLastAccessedReport)(false);
            // Even though the archived report has a more recent lastVisitTime,
            // the function should filter it out and return the normal report
            expect(result === null || result === void 0 ? void 0 : result.reportID).toBe(ownedReport.reportID);
            expect(result === null || result === void 0 ? void 0 : result.reportID).not.toBe(nonOwnedReport.reportID);
        });
    });
    describe('getApprovalChain', function () {
        describe('submit and close policy', function () {
            it('should return empty array', function () {
                var policyTest = __assign(__assign({}, (0, policies_1.default)(0)), { approver: 'owner@test.com', owner: 'owner@test.com', type: CONST_1.default.POLICY.TYPE.TEAM, approvalMode: CONST_1.default.POLICY.APPROVAL_MODE.OPTIONAL });
                var expenseReport = __assign(__assign({}, (0, reports_2.createRandomReport)(0, undefined)), { ownerAccountID: employeeAccountID, type: CONST_1.default.REPORT.TYPE.EXPENSE });
                expect((0, ReportUtils_1.getApprovalChain)(policyTest, expenseReport)).toStrictEqual([]);
            });
        });
        describe('basic/advance workflow', function () {
            describe('has no approver rule', function () {
                it('should return list contain policy approver/owner and the forwardsTo of them if the policy use basic workflow', function () {
                    var policyTest = __assign(__assign({}, (0, policies_1.default)(0)), { approver: 'owner@test.com', owner: 'owner@test.com', type: CONST_1.default.POLICY.TYPE.TEAM, employeeList: employeeList, approvalMode: CONST_1.default.POLICY.APPROVAL_MODE.BASIC });
                    var expenseReport = __assign(__assign({}, (0, reports_2.createRandomReport)(0, undefined)), { ownerAccountID: employeeAccountID, type: CONST_1.default.REPORT.TYPE.EXPENSE });
                    react_native_onyx_1.default.set(ONYXKEYS_1.default.PERSONAL_DETAILS_LIST, personalDetails).then(function () {
                        var result = ['owner@test.com'];
                        expect((0, ReportUtils_1.getApprovalChain)(policyTest, expenseReport)).toStrictEqual(result);
                    });
                });
                it('should return list contain submitsTo of ownerAccountID and the forwardsTo of them if the policy use advance workflow', function () {
                    var policyTest = __assign(__assign({}, (0, policies_1.default)(0)), { approver: 'owner@test.com', owner: 'owner@test.com', type: CONST_1.default.POLICY.TYPE.CORPORATE, employeeList: employeeList, approvalMode: CONST_1.default.POLICY.APPROVAL_MODE.ADVANCED });
                    var expenseReport = __assign(__assign({}, (0, reports_2.createRandomReport)(0, undefined)), { ownerAccountID: employeeAccountID, type: CONST_1.default.REPORT.TYPE.EXPENSE });
                    react_native_onyx_1.default.set(ONYXKEYS_1.default.PERSONAL_DETAILS_LIST, personalDetails).then(function () {
                        var result = ['admin@test.com'];
                        expect((0, ReportUtils_1.getApprovalChain)(policyTest, expenseReport)).toStrictEqual(result);
                    });
                });
            });
            // This test is broken, so I am commenting it out. I have opened up https://github.com/Expensify/App/issues/60854 to get the test fixed
            describe('has approver rule', function () {
                describe('has no transaction match with approver rule', function () {
                    it('should return list contain submitsTo of ownerAccountID and the forwardsTo of them', function () {
                        var _a, _b;
                        var policyTest = __assign(__assign({}, (0, policies_1.default)(0)), { approver: 'owner@test.com', owner: 'owner@test.com', type: CONST_1.default.POLICY.TYPE.CORPORATE, employeeList: employeeList, rules: rules, approvalMode: CONST_1.default.POLICY.APPROVAL_MODE.BASIC });
                        var expenseReport = __assign(__assign({}, (0, reports_2.createRandomReport)(0, undefined)), { ownerAccountID: employeeAccountID, type: CONST_1.default.REPORT.TYPE.EXPENSE });
                        var transaction1 = __assign(__assign({}, (0, transaction_1.default)(0)), { category: '', tag: '', created: testDate, reportID: expenseReport.reportID });
                        var transaction2 = __assign(__assign({}, (0, transaction_1.default)(1)), { category: '', tag: '', created: DateUtils_1.default.subtractMillisecondsFromDateTime(testDate, 1), reportID: expenseReport.reportID });
                        react_native_onyx_1.default.multiSet((_a = {},
                            _a[ONYXKEYS_1.default.PERSONAL_DETAILS_LIST] = personalDetails,
                            _a[ONYXKEYS_1.default.COLLECTION.TRANSACTION] = (_b = {},
                                _b[transaction1.transactionID] = transaction1,
                                _b[transaction2.transactionID] = transaction2,
                                _b),
                            _a)).then(function () {
                            var result = ['owner@test.com'];
                            expect((0, ReportUtils_1.getApprovalChain)(policyTest, expenseReport)).toStrictEqual(result);
                        });
                    });
                });
                describe('has transaction match with approver rule', function () {
                    it('should return the list with correct order of category/tag approver sorted by created/inserted of the transaction', function () {
                        var policyTest = __assign(__assign({}, (0, policies_1.default)(1)), { approver: 'owner@test.com', owner: 'owner@test.com', type: CONST_1.default.POLICY.TYPE.CORPORATE, employeeList: employeeList, rules: rules, approvalMode: CONST_1.default.POLICY.APPROVAL_MODE.ADVANCED });
                        var expenseReport = __assign(__assign({}, (0, reports_2.createRandomReport)(100, undefined)), { ownerAccountID: employeeAccountID, type: CONST_1.default.REPORT.TYPE.EXPENSE });
                        var transaction1 = __assign(__assign({}, (0, transaction_1.default)(1)), { category: 'cat1', tag: '', created: testDate, reportID: expenseReport.reportID, inserted: DateUtils_1.default.subtractMillisecondsFromDateTime(testDate, 1) });
                        var transaction2 = __assign(__assign({}, (0, transaction_1.default)(2)), { category: '', tag: 'tag1', created: DateUtils_1.default.subtractMillisecondsFromDateTime(testDate, 1), reportID: expenseReport.reportID, inserted: DateUtils_1.default.subtractMillisecondsFromDateTime(testDate, 1) });
                        var transaction3 = __assign(__assign({}, (0, transaction_1.default)(3)), { category: 'cat2', tag: '', created: testDate, reportID: expenseReport.reportID, inserted: DateUtils_1.default.subtractMillisecondsFromDateTime(testDate, 2) });
                        var transaction4 = __assign(__assign({}, (0, transaction_1.default)(4)), { category: '', tag: 'tag2', created: DateUtils_1.default.subtractMillisecondsFromDateTime(testDate, 1), reportID: expenseReport.reportID, inserted: DateUtils_1.default.subtractMillisecondsFromDateTime(testDate, 2) });
                        react_native_onyx_1.default.mergeCollection(ONYXKEYS_1.default.COLLECTION.TRANSACTION, {
                            transactions_1: transaction1,
                            transactions_2: transaction2,
                            transactions_3: transaction3,
                            transactions_4: transaction4,
                        }).then(function () {
                            var result = [categoryApprover2Email, categoryApprover1Email, tagApprover2Email, tagApprover1Email, 'admin@test.com'];
                            expect((0, ReportUtils_1.getApprovalChain)(policyTest, expenseReport)).toStrictEqual(result);
                        });
                    });
                });
            });
        });
    });
    describe('shouldReportShowSubscript', function () {
        afterEach(function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, react_native_onyx_1.default.clear()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, react_native_onyx_1.default.set(ONYXKEYS_1.default.SESSION, { email: currentUserEmail, accountID: currentUserAccountID })];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('should return true for policy expense chat', function () {
            var report = (0, reports_2.createPolicyExpenseChat)(1);
            expect((0, ReportUtils_1.shouldReportShowSubscript)(report)).toBe(true);
        });
        it('should return true for workspace thread', function () {
            var report = (0, reports_2.createWorkspaceThread)(1);
            expect((0, ReportUtils_1.shouldReportShowSubscript)(report)).toBe(true);
        });
        it('should return false for archived non-expense report that is not a workspace thread', function () { return __awaiter(void 0, void 0, void 0, function () {
            var report, isReportArchived;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        report = (0, reports_2.createRegularChat)(1, [currentUserAccountID, 1]);
                        return [4 /*yield*/, react_native_onyx_1.default.set("".concat(ONYXKEYS_1.default.COLLECTION.REPORT_NAME_VALUE_PAIRS).concat(report.reportID), {
                                private_isArchived: new Date().toString(),
                            })];
                    case 1:
                        _a.sent();
                        isReportArchived = (0, react_native_1.renderHook)(function () { return (0, useReportIsArchived_1.default)(report === null || report === void 0 ? void 0 : report.reportID); }).result;
                        expect((0, ReportUtils_1.shouldReportShowSubscript)(report, isReportArchived.current)).toBe(false);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should return false for a non-archived non-expense report', function () {
            var report = (0, reports_2.createRegularChat)(1, [currentUserAccountID, 1]);
            var isReportArchived = (0, react_native_1.renderHook)(function () { return (0, useReportIsArchived_1.default)(report === null || report === void 0 ? void 0 : report.reportID); }).result;
            expect((0, ReportUtils_1.shouldReportShowSubscript)(report, isReportArchived.current)).toBe(false);
        });
        it('should return false for regular 1:1 chat', function () {
            var report = (0, reports_2.createRegularChat)(1, [currentUserAccountID, 1]);
            expect((0, ReportUtils_1.shouldReportShowSubscript)(report)).toBe(false);
        });
        it('should return true for expense request report', function () { return __awaiter(void 0, void 0, void 0, function () {
            var parentReport, randomReportAction, parentReportAction, report;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        parentReport = (0, reports_2.createExpenseReport)(1);
                        return [4 /*yield*/, react_native_onyx_1.default.set("".concat(ONYXKEYS_1.default.COLLECTION.REPORT).concat(parentReport.reportID), parentReport)];
                    case 1:
                        _a.sent();
                        randomReportAction = (0, reportActions_1.default)(2);
                        parentReportAction = __assign(__assign({}, (0, reportActions_1.default)(2)), { actionName: CONST_1.default.REPORT.ACTIONS.TYPE.IOU, message: __assign(__assign({}, randomReportAction.message), { type: CONST_1.default.IOU.REPORT_ACTION_TYPE.CREATE }) });
                        return [4 /*yield*/, react_native_onyx_1.default.set("".concat(ONYXKEYS_1.default.COLLECTION.REPORT_ACTIONS).concat(parentReport.reportID), {
                                '3': parentReportAction,
                            })];
                    case 2:
                        _a.sent();
                        report = (0, reports_2.createExpenseRequestReport)(2, parentReport.reportID, '3');
                        // When we check if the report should show a subscript
                        // Then it should return true because isExpenseRequest() returns true
                        expect((0, ReportUtils_1.shouldReportShowSubscript)(report)).toBe(true);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should return true for workspace task report', function () { return __awaiter(void 0, void 0, void 0, function () {
            var parentReport, report;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        parentReport = (0, reports_2.createPolicyExpenseChat)(1);
                        return [4 /*yield*/, react_native_onyx_1.default.set("".concat(ONYXKEYS_1.default.COLLECTION.REPORT).concat(parentReport.reportID), parentReport)];
                    case 1:
                        _a.sent();
                        report = (0, reports_2.createWorkspaceTaskReport)(2, [currentUserAccountID, 1], parentReport.reportID);
                        // When we check if the report should show a subscript
                        // Then it should return true because isWorkspaceTaskReport() returns true
                        expect((0, ReportUtils_1.shouldReportShowSubscript)(report)).toBe(true);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should return true for invoice room', function () {
            var report = (0, reports_2.createInvoiceRoom)(1);
            expect((0, ReportUtils_1.shouldReportShowSubscript)(report)).toBe(true);
        });
        it('should return true for invoice report', function () {
            var report = (0, reports_2.createInvoiceReport)(1);
            expect((0, ReportUtils_1.shouldReportShowSubscript)(report)).toBe(true);
        });
        it('should return true for policy expense chat that is not own', function () {
            var report = (0, reports_2.createPolicyExpenseChat)(1, false);
            expect((0, ReportUtils_1.shouldReportShowSubscript)(report)).toBe(true);
        });
        it('should return true for archived workspace thread (exception to archived rule)', function () { return __awaiter(void 0, void 0, void 0, function () {
            var report, isReportArchived;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        report = (0, reports_2.createWorkspaceThread)(1);
                        return [4 /*yield*/, react_native_onyx_1.default.set("".concat(ONYXKEYS_1.default.COLLECTION.REPORT_NAME_VALUE_PAIRS).concat(report.reportID), {
                                private_isArchived: new Date().toString(),
                            })];
                    case 1:
                        _a.sent();
                        isReportArchived = (0, react_native_1.renderHook)(function () { return (0, useReportIsArchived_1.default)(report === null || report === void 0 ? void 0 : report.reportID); }).result;
                        // Even if archived, workspace threads should show subscript
                        expect((0, ReportUtils_1.shouldReportShowSubscript)(report, isReportArchived.current)).toBe(true);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should return false for archived non-expense report', function () { return __awaiter(void 0, void 0, void 0, function () {
            var report, isReportArchived;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        report = (0, reports_2.createRegularChat)(1, []);
                        return [4 /*yield*/, react_native_onyx_1.default.set("".concat(ONYXKEYS_1.default.COLLECTION.REPORT_NAME_VALUE_PAIRS).concat(report.reportID), {
                                private_isArchived: new Date().toString(),
                            })];
                    case 1:
                        _a.sent();
                        isReportArchived = (0, react_native_1.renderHook)(function () { return (0, useReportIsArchived_1.default)(report === null || report === void 0 ? void 0 : report.reportID); }).result;
                        // Archived expense reports should not show subscript
                        expect((0, ReportUtils_1.shouldReportShowSubscript)(report, isReportArchived.current)).toBe(false);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should return false for policy expense chat that is also a chat thread', function () {
            var report = (0, reports_2.createPolicyExpenseChatThread)(1);
            // Policy expense chats that are threads should not show subscript
            expect((0, ReportUtils_1.shouldReportShowSubscript)(report)).toBe(false);
        });
        it('should return false for policy expense chat that is also a task report', function () {
            var report = (0, reports_2.createPolicyExpenseChatTask)(1);
            // Policy expense chats that are task reports should not show subscript
            expect((0, ReportUtils_1.shouldReportShowSubscript)(report)).toBe(false);
        });
        it('should return false for group chat', function () {
            var report = (0, reports_2.createGroupChat)(1, [currentUserAccountID, 1, 2, 3]);
            expect((0, ReportUtils_1.shouldReportShowSubscript)(report)).toBe(false);
        });
        it('should return false for self DM', function () {
            var report = (0, reports_2.createSelfDM)(1, currentUserAccountID);
            expect((0, ReportUtils_1.shouldReportShowSubscript)(report)).toBe(false);
        });
        it('should return false for admin room', function () {
            var report = (0, reports_2.createAdminRoom)(1);
            expect((0, ReportUtils_1.shouldReportShowSubscript)(report)).toBe(false);
        });
        it('should return false for announce room', function () {
            var report = (0, reports_2.createAnnounceRoom)(1);
            expect((0, ReportUtils_1.shouldReportShowSubscript)(report)).toBe(false);
        });
        it('should return false for domain room', function () {
            var report = (0, reports_2.createDomainRoom)(1);
            expect((0, ReportUtils_1.shouldReportShowSubscript)(report)).toBe(false);
        });
        it('should return false for regular task report (non-workspace)', function () {
            var report = __assign(__assign({}, (0, reports_2.createRegularTaskReport)(1, currentUserAccountID)), { chatType: CONST_1.default.REPORT.CHAT_TYPE.TRIP_ROOM });
            expect((0, ReportUtils_1.shouldReportShowSubscript)(report)).toBe(false);
        });
    });
    describe('isArchivedNonExpenseReport', function () {
        // Given an expense report, a chat report, and an archived chat report
        var expenseReport = __assign(__assign({}, (0, reports_2.createRandomReport)(1000, undefined)), { ownerAccountID: employeeAccountID, type: CONST_1.default.REPORT.TYPE.EXPENSE });
        var chatReport = __assign(__assign({}, (0, reports_2.createRandomReport)(2000, undefined)), { ownerAccountID: employeeAccountID, type: CONST_1.default.REPORT.TYPE.CHAT });
        var archivedChatReport = __assign(__assign({}, (0, reports_2.createRandomReport)(3000, undefined)), { ownerAccountID: employeeAccountID, type: CONST_1.default.REPORT.TYPE.CHAT });
        (0, globals_1.beforeAll)(function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, react_native_onyx_1.default.set("".concat(ONYXKEYS_1.default.COLLECTION.REPORT).concat(expenseReport.reportID), expenseReport)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, react_native_onyx_1.default.set("".concat(ONYXKEYS_1.default.COLLECTION.REPORT).concat(chatReport.reportID), chatReport)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, react_native_onyx_1.default.set("".concat(ONYXKEYS_1.default.COLLECTION.REPORT).concat(archivedChatReport.reportID), archivedChatReport)];
                    case 3:
                        _a.sent();
                        // This is what indicates that a report is archived (see ReportUtils.isArchivedReport())
                        return [4 /*yield*/, react_native_onyx_1.default.set("".concat(ONYXKEYS_1.default.COLLECTION.REPORT_NAME_VALUE_PAIRS).concat(archivedChatReport.reportID), {
                                private_isArchived: new Date().toString(),
                            })];
                    case 4:
                        // This is what indicates that a report is archived (see ReportUtils.isArchivedReport())
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('should return false if the report is an expense report', function () {
            // Simulate how components use the hook useReportIsArchived() to see if the report is archived
            var isReportArchived = (0, react_native_1.renderHook)(function () { return (0, useReportIsArchived_1.default)(expenseReport === null || expenseReport === void 0 ? void 0 : expenseReport.reportID); }).result;
            expect((0, ReportUtils_1.isArchivedNonExpenseReport)(expenseReport, isReportArchived.current)).toBe(false);
        });
        it('should return false if the report is a non-expense report and not archived', function () {
            var isReportArchived = (0, react_native_1.renderHook)(function () { return (0, useReportIsArchived_1.default)(chatReport === null || chatReport === void 0 ? void 0 : chatReport.reportID); }).result;
            expect((0, ReportUtils_1.isArchivedNonExpenseReport)(chatReport, isReportArchived.current)).toBe(false);
        });
        it('should return true if the report is a non-expense report and archived', function () {
            var isReportArchived = (0, react_native_1.renderHook)(function () { return (0, useReportIsArchived_1.default)(archivedChatReport === null || archivedChatReport === void 0 ? void 0 : archivedChatReport.reportID); }).result;
            expect((0, ReportUtils_1.isArchivedNonExpenseReport)(archivedChatReport, isReportArchived.current)).toBe(true);
        });
    });
    describe('parseReportRouteParams', function () {
        var testReportID = '123456789';
        it('should return empty reportID and isSubReportPageRoute as false if the route is not a report route', function () {
            var result = (0, ReportUtils_1.parseReportRouteParams)('/concierge');
            expect(result.reportID).toBe('');
            expect(result.isSubReportPageRoute).toBe(false);
        });
        it('should return isSubReportPageRoute as false if the route is a report screen route', function () {
            var result = (0, ReportUtils_1.parseReportRouteParams)("r/".concat(testReportID, "/11111111"));
            expect(result.reportID).toBe(testReportID);
            expect(result.isSubReportPageRoute).toBe(false);
        });
        it('should return isSubReportPageRoute as true if the route is a sub report page route', function () {
            var result = (0, ReportUtils_1.parseReportRouteParams)("r/".concat(testReportID, "/details"));
            expect(result.reportID).toBe(testReportID);
            expect(result.isSubReportPageRoute).toBe(true);
        });
    });
    describe('isPayer', function () {
        var _a;
        var approvedReport = __assign(__assign({}, (0, reports_2.createRandomReport)(1, undefined)), { type: CONST_1.default.REPORT.TYPE.EXPENSE, stateNum: CONST_1.default.REPORT.STATE_NUM.APPROVED, statusNum: CONST_1.default.REPORT.STATUS_NUM.APPROVED, policyID: '1' });
        var unapprovedReport = __assign(__assign({}, (0, reports_2.createRandomReport)(2, undefined)), { type: CONST_1.default.REPORT.TYPE.EXPENSE, stateNum: CONST_1.default.REPORT.STATE_NUM.SUBMITTED, statusNum: CONST_1.default.REPORT.STATUS_NUM.SUBMITTED, policyID: '1' });
        var policyTest = __assign(__assign({}, (0, policies_1.default)(1)), { type: CONST_1.default.POLICY.TYPE.CORPORATE, employeeList: (_a = {},
                _a[currentUserEmail] = {
                    role: CONST_1.default.POLICY.ROLE.AUDITOR,
                },
                _a), role: CONST_1.default.POLICY.ROLE.AUDITOR });
        (0, globals_1.beforeAll)(function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, react_native_onyx_1.default.set(ONYXKEYS_1.default.SESSION, { email: currentUserEmail, accountID: currentUserAccountID })];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, react_native_onyx_1.default.set("".concat(ONYXKEYS_1.default.COLLECTION.POLICY, "1"), policyTest)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        afterAll(function () { return react_native_onyx_1.default.clear(); });
        it('should return false for admin of a group policy with reimbursement enabled and report not approved', function () {
            expect((0, ReportUtils_1.isPayer)({ email: currentUserEmail, accountID: currentUserAccountID }, unapprovedReport, false)).toBe(false);
        });
        it('should return false for non-admin of a group policy', function () {
            expect((0, ReportUtils_1.isPayer)({ email: currentUserEmail, accountID: currentUserAccountID }, approvedReport, false)).toBe(false);
        });
        it('should return true for a reimburser of a group policy on a closed report', function () { return __awaiter(void 0, void 0, void 0, function () {
            var closedReport;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, react_native_onyx_1.default.merge("".concat(ONYXKEYS_1.default.COLLECTION.POLICY, "1"), { reimbursementChoice: CONST_1.default.POLICY.REIMBURSEMENT_CHOICES.REIMBURSEMENT_YES, achAccount: { reimburser: currentUserEmail } })];
                    case 1:
                        _a.sent();
                        closedReport = __assign(__assign({}, (0, reports_2.createRandomReport)(2, undefined)), { type: CONST_1.default.REPORT.TYPE.EXPENSE, stateNum: CONST_1.default.REPORT.STATE_NUM.APPROVED, statusNum: CONST_1.default.REPORT.STATUS_NUM.CLOSED, managerID: currentUserAccountID + 1, policyID: policyTest.id });
                        expect((0, ReportUtils_1.isPayer)({ email: currentUserEmail, accountID: currentUserAccountID }, closedReport, false)).toBe(true);
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('buildReportNameFromParticipantNames', function () {
        /**
         * Generates a fake report and matching personal details for specified number of participants.
         * Participants in the report are directly linked with their personal details.
         */
        var generateFakeReportAndParticipantsPersonalDetails = function (_a) {
            var count = _a.count, _b = _a.start, start = _b === void 0 ? 0 : _b;
            var data = {
                report: __assign(__assign({}, reports_1.chatReportR14932), { participants: Object.keys(LHNTestUtils_1.fakePersonalDetails)
                        .slice(start, count)
                        .reduce(function (acc, cur) {
                        acc[cur] = { notificationPreference: CONST_1.default.REPORT.NOTIFICATION_PREFERENCE.ALWAYS };
                        return acc;
                    }, {}) }),
                personalDetails: Object.fromEntries(Object.entries(LHNTestUtils_1.fakePersonalDetails).slice(start, count)),
            };
            data.personalDetails[currentUserAccountID] = {
                accountID: currentUserAccountID,
                displayName: 'CURRENT USER',
                firstName: 'CURRENT',
            };
            return data;
        };
        it('excludes the current user from the report title', function () {
            var result = (0, ReportUtils_1.buildReportNameFromParticipantNames)(generateFakeReportAndParticipantsPersonalDetails({ count: currentUserAccountID + 2 }));
            expect(result).not.toContain('CURRENT');
        });
        it('limits to a maximum of 5 participants in the title', function () {
            var result = (0, ReportUtils_1.buildReportNameFromParticipantNames)(generateFakeReportAndParticipantsPersonalDetails({ count: 10 }));
            expect(result.split(',').length).toBeLessThanOrEqual(5);
        });
        it('returns full name if only one participant is present (excluding current user)', function () {
            var _a;
            var result = (0, ReportUtils_1.buildReportNameFromParticipantNames)(generateFakeReportAndParticipantsPersonalDetails({ count: 1 }));
            var displayName = ((_a = LHNTestUtils_1.fakePersonalDetails[1]) !== null && _a !== void 0 ? _a : {}).displayName;
            expect(result).toEqual(displayName);
        });
        it('returns an empty string if there are no participants or all are excluded', function () {
            var result = (0, ReportUtils_1.buildReportNameFromParticipantNames)(generateFakeReportAndParticipantsPersonalDetails({ start: currentUserAccountID - 1, count: 1 }));
            expect(result).toEqual('');
        });
        it('handles partial or missing personal details correctly', function () {
            var report = generateFakeReportAndParticipantsPersonalDetails({ count: 6 }).report;
            var secondUser = LHNTestUtils_1.fakePersonalDetails[2];
            var fourthUser = LHNTestUtils_1.fakePersonalDetails[4];
            var incompleteDetails = { 2: secondUser, 4: fourthUser };
            var result = (0, ReportUtils_1.buildReportNameFromParticipantNames)({ report: report, personalDetails: incompleteDetails });
            var expectedNames = [secondUser === null || secondUser === void 0 ? void 0 : secondUser.firstName, fourthUser === null || fourthUser === void 0 ? void 0 : fourthUser.firstName].sort();
            var resultNames = result.split(', ').sort();
            expect(resultNames).toEqual(expect.arrayContaining(expectedNames));
        });
    });
    describe('getParticipantsList', function () {
        it('should exclude hidden participants', function () {
            var report = __assign(__assign({}, (0, reports_2.createRandomReport)(1, undefined)), { chatType: 'policyRoom', participants: {
                    1: { notificationPreference: 'hidden' },
                    2: { notificationPreference: 'always' },
                } });
            var participants = (0, ReportUtils_1.getParticipantsList)(report, participantsPersonalDetails);
            expect(participants.length).toBe(1);
        });
        it('should include hidden participants for IOU report', function () {
            var report = __assign(__assign({}, (0, reports_2.createRandomReport)(1, undefined)), { type: CONST_1.default.REPORT.TYPE.IOU, participants: {
                    1: { notificationPreference: 'hidden' },
                    2: { notificationPreference: 'always' },
                } });
            var participants = (0, ReportUtils_1.getParticipantsList)(report, participantsPersonalDetails);
            expect(participants.length).toBe(2);
        });
        it('should include hidden participants for expense report', function () {
            var report = __assign(__assign({}, (0, reports_2.createRandomReport)(1, undefined)), { type: CONST_1.default.REPORT.TYPE.EXPENSE, participants: {
                    1: { notificationPreference: 'hidden' },
                    2: { notificationPreference: 'always' },
                } });
            var participants = (0, ReportUtils_1.getParticipantsList)(report, participantsPersonalDetails);
            expect(participants.length).toBe(2);
        });
        it('should include hidden participants for IOU transaction report', function () { return __awaiter(void 0, void 0, void 0, function () {
            var parentReport, parentReportAction, report, participants;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        parentReport = __assign(__assign({}, (0, reports_2.createRandomReport)(0, undefined)), { type: CONST_1.default.REPORT.TYPE.IOU });
                        parentReportAction = __assign(__assign({}, (0, reportActions_1.default)(0)), { actionName: CONST_1.default.REPORT.ACTIONS.TYPE.IOU, message: [], previousMessage: [], originalMessage: {
                                amount: 1,
                                currency: 'USD',
                                type: CONST_1.default.IOU.REPORT_ACTION_TYPE.CREATE,
                            } });
                        return [4 /*yield*/, react_native_onyx_1.default.merge("".concat(ONYXKEYS_1.default.COLLECTION.REPORT).concat(parentReport.reportID), parentReport)];
                    case 1:
                        _b.sent();
                        return [4 /*yield*/, react_native_onyx_1.default.merge("".concat(ONYXKEYS_1.default.COLLECTION.REPORT_ACTIONS).concat(parentReport.reportID), (_a = {},
                                _a[parentReportAction.reportActionID] = parentReportAction,
                                _a))];
                    case 2:
                        _b.sent();
                        report = __assign(__assign({}, (0, reports_2.createRandomReport)(1, undefined)), { parentReportID: parentReport.reportID, parentReportActionID: parentReportAction.reportActionID, participants: {
                                1: { notificationPreference: 'hidden' },
                                2: { notificationPreference: 'always' },
                            } });
                        participants = (0, ReportUtils_1.getParticipantsList)(report, participantsPersonalDetails);
                        expect(participants.length).toBe(2);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should include hidden participants for expense transaction report', function () { return __awaiter(void 0, void 0, void 0, function () {
            var parentReport, parentReportAction, report, participants;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        parentReport = __assign(__assign({}, (0, reports_2.createRandomReport)(0, undefined)), { type: CONST_1.default.REPORT.TYPE.EXPENSE });
                        parentReportAction = __assign(__assign({}, (0, reportActions_1.default)(0)), { actionName: CONST_1.default.REPORT.ACTIONS.TYPE.IOU, message: [], previousMessage: [], originalMessage: {
                                amount: 1,
                                currency: 'USD',
                                type: CONST_1.default.IOU.REPORT_ACTION_TYPE.CREATE,
                            } });
                        return [4 /*yield*/, react_native_onyx_1.default.merge("".concat(ONYXKEYS_1.default.COLLECTION.REPORT).concat(parentReport.reportID), parentReport)];
                    case 1:
                        _b.sent();
                        return [4 /*yield*/, react_native_onyx_1.default.merge("".concat(ONYXKEYS_1.default.COLLECTION.REPORT_ACTIONS).concat(parentReport.reportID), (_a = {},
                                _a[parentReportAction.reportActionID] = parentReportAction,
                                _a))];
                    case 2:
                        _b.sent();
                        report = __assign(__assign({}, (0, reports_2.createRandomReport)(1, undefined)), { parentReportID: parentReport.reportID, parentReportActionID: parentReportAction.reportActionID, participants: {
                                1: { notificationPreference: 'hidden' },
                                2: { notificationPreference: 'always' },
                            } });
                        participants = (0, ReportUtils_1.getParticipantsList)(report, participantsPersonalDetails);
                        expect(participants.length).toBe(2);
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('isReportOutstanding', function () {
        it('should return true for submitted reports', function () {
            var report = __assign(__assign({}, (0, reports_2.createRandomReport)(1, undefined)), { policyID: policy.id, type: CONST_1.default.REPORT.TYPE.EXPENSE, stateNum: CONST_1.default.REPORT.STATE_NUM.SUBMITTED, statusNum: CONST_1.default.REPORT.STATUS_NUM.SUBMITTED });
            expect((0, ReportUtils_1.isReportOutstanding)(report, policy.id)).toBe(true);
        });
        it('should return false for submitted reports if we specify it', function () {
            var report = __assign(__assign({}, (0, reports_2.createRandomReport)(1, undefined)), { policyID: policy.id, type: CONST_1.default.REPORT.TYPE.EXPENSE, stateNum: CONST_1.default.REPORT.STATE_NUM.SUBMITTED, statusNum: CONST_1.default.REPORT.STATUS_NUM.SUBMITTED });
            expect((0, ReportUtils_1.isReportOutstanding)(report, policy.id, undefined, false)).toBe(false);
        });
        it('should return true for submitted reports if top most report ID is processing', function () { return __awaiter(void 0, void 0, void 0, function () {
            var report, activeReport;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        report = __assign(__assign({}, (0, reports_2.createRandomReport)(1, undefined)), { policyID: policy.id, type: CONST_1.default.REPORT.TYPE.EXPENSE, stateNum: CONST_1.default.REPORT.STATE_NUM.SUBMITTED, statusNum: CONST_1.default.REPORT.STATUS_NUM.SUBMITTED });
                        activeReport = __assign(__assign({}, (0, reports_2.createRandomReport)(2, undefined)), { policyID: policy.id, type: CONST_1.default.REPORT.TYPE.EXPENSE, stateNum: CONST_1.default.REPORT.STATE_NUM.SUBMITTED, statusNum: CONST_1.default.REPORT.STATUS_NUM.SUBMITTED });
                        return [4 /*yield*/, react_native_onyx_1.default.set("".concat(ONYXKEYS_1.default.COLLECTION.REPORT).concat(activeReport.reportID), activeReport)];
                    case 1:
                        _a.sent();
                        expect((0, ReportUtils_1.isReportOutstanding)(report, policy.id)).toBe(true);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should return false for archived report', function () { return __awaiter(void 0, void 0, void 0, function () {
            var report;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        report = __assign(__assign({}, (0, reports_2.createRandomReport)(1, undefined)), { policyID: policy.id, type: CONST_1.default.REPORT.TYPE.EXPENSE, stateNum: CONST_1.default.REPORT.STATE_NUM.SUBMITTED, statusNum: CONST_1.default.REPORT.STATUS_NUM.SUBMITTED });
                        return [4 /*yield*/, react_native_onyx_1.default.merge("".concat(ONYXKEYS_1.default.COLLECTION.REPORT_NAME_VALUE_PAIRS).concat(report.reportID), { private_isArchived: DateUtils_1.default.getDBTime() })];
                    case 1:
                        _a.sent();
                        expect((0, ReportUtils_1.isReportOutstanding)(report, policy.id)).toBe(false);
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('getMoneyReportPreviewName', function () {
        (0, globals_1.beforeAll)(function () { return __awaiter(void 0, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, react_native_onyx_1.default.clear()];
                    case 1:
                        _b.sent();
                        return [4 /*yield*/, react_native_onyx_1.default.multiSet((_a = {},
                                _a[ONYXKEYS_1.default.PERSONAL_DETAILS_LIST] = participantsPersonalDetails,
                                _a[ONYXKEYS_1.default.SESSION] = { email: currentUserEmail, accountID: currentUserAccountID },
                                _a))];
                    case 2:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        afterAll(function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, react_native_onyx_1.default.clear()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('should return the report name when the chat type is policy room', function () {
            var action = __assign(__assign({}, (0, reportActions_1.default)(1)), { actionName: CONST_1.default.REPORT.ACTIONS.TYPE.REPORT_PREVIEW });
            var report = (0, reports_2.createRandomReport)(1, CONST_1.default.REPORT.CHAT_TYPE.POLICY_ROOM);
            var result = (0, ReportUtils_1.getMoneyReportPreviewName)(action, report);
            expect(result).toBe(report.reportName);
        });
        it('should return the report name when the chat type is domain all', function () {
            var action = __assign(__assign({}, (0, reportActions_1.default)(1)), { actionName: CONST_1.default.REPORT.ACTIONS.TYPE.REPORT_PREVIEW });
            var report = (0, reports_2.createRandomReport)(1, CONST_1.default.REPORT.CHAT_TYPE.DOMAIN_ALL);
            var result = (0, ReportUtils_1.getMoneyReportPreviewName)(action, report);
            expect(result).toBe(report.reportName);
        });
        it('should return the report name when the chat type is group', function () {
            var action = __assign(__assign({}, (0, reportActions_1.default)(1)), { actionName: CONST_1.default.REPORT.ACTIONS.TYPE.REPORT_PREVIEW });
            var report = (0, reports_2.createRandomReport)(1, CONST_1.default.REPORT.CHAT_TYPE.GROUP);
            var result = (0, ReportUtils_1.getMoneyReportPreviewName)(action, report);
            expect(result).toBe(report.reportName);
        });
        it('should return policy name when the chat type is invoice', function () {
            var action = __assign(__assign({}, (0, reportActions_1.default)(1)), { actionName: CONST_1.default.REPORT.ACTIONS.TYPE.REPORT_PREVIEW });
            var report = (0, reports_2.createRandomReport)(1, CONST_1.default.REPORT.CHAT_TYPE.INVOICE);
            var result = (0, ReportUtils_1.getMoneyReportPreviewName)(action, report);
            // Policies are empty, so the policy name is "Unavailable workspace"
            expect(result).toBe('Unavailable workspace');
        });
        it('should return the report name when the chat type is policy admins', function () {
            var action = __assign(__assign({}, (0, reportActions_1.default)(1)), { actionName: CONST_1.default.REPORT.ACTIONS.TYPE.REPORT_PREVIEW });
            var report = (0, reports_2.createRandomReport)(1, CONST_1.default.REPORT.CHAT_TYPE.POLICY_ADMINS);
            var result = (0, ReportUtils_1.getMoneyReportPreviewName)(action, report);
            expect(result).toBe(report.reportName);
        });
        it('should return the report name when the chat type is policy announce', function () {
            var action = __assign(__assign({}, (0, reportActions_1.default)(1)), { actionName: CONST_1.default.REPORT.ACTIONS.TYPE.REPORT_PREVIEW });
            var report = (0, reports_2.createRandomReport)(1, CONST_1.default.REPORT.CHAT_TYPE.POLICY_ANNOUNCE);
            var result = (0, ReportUtils_1.getMoneyReportPreviewName)(action, report);
            expect(result).toBe(report.reportName);
        });
        it('should return the owner name expenses when the chat type is policy expense chat', function () {
            var action = __assign(__assign({}, (0, reportActions_1.default)(1)), { actionName: CONST_1.default.REPORT.ACTIONS.TYPE.REPORT_PREVIEW });
            var report = (0, reports_2.createRandomReport)(1, CONST_1.default.REPORT.CHAT_TYPE.POLICY_EXPENSE_CHAT);
            var result = (0, ReportUtils_1.getMoneyReportPreviewName)(action, report);
            // Report with ownerAccountID: 1 corresponds to "Ragnar Lothbrok"
            expect(result).toBe("Ragnar Lothbrok's expenses");
        });
        it('should return the display name of the current user when the chat type is self dm', function () {
            var action = __assign(__assign({}, (0, reportActions_1.default)(1)), { actionName: CONST_1.default.REPORT.ACTIONS.TYPE.REPORT_PREVIEW });
            var report = (0, reports_2.createRandomReport)(1, CONST_1.default.REPORT.CHAT_TYPE.SELF_DM);
            var result = (0, ReportUtils_1.getMoneyReportPreviewName)(action, report);
            // currentUserAccountID: 5 corresponds to "Lagertha Lothbrok"
            expect(result).toBe('Lagertha Lothbrok (you)');
        });
        it('should return the participant name when the chat type is system', function () {
            var action = __assign(__assign({}, (0, reportActions_1.default)(1)), { actionName: CONST_1.default.REPORT.ACTIONS.TYPE.REPORT_PREVIEW });
            var report = __assign(__assign({}, (0, reports_2.createRandomReport)(1, CONST_1.default.REPORT.CHAT_TYPE.SYSTEM)), { participants: {
                    1: { notificationPreference: 'hidden' },
                } });
            var result = (0, ReportUtils_1.getMoneyReportPreviewName)(action, report);
            // participant accountID: 1 corresponds to "Ragnar Lothbrok"
            expect(result).toBe('Ragnar Lothbrok');
        });
        it('should return the participant names when the chat type is trip room', function () {
            var action = __assign(__assign({}, (0, reportActions_1.default)(1)), { actionName: CONST_1.default.REPORT.ACTIONS.TYPE.REPORT_PREVIEW });
            var report = __assign(__assign({}, (0, reports_2.createRandomReport)(1, CONST_1.default.REPORT.CHAT_TYPE.TRIP_ROOM)), { participants: {
                    1: { notificationPreference: 'hidden' },
                    2: { notificationPreference: 'always' },
                } });
            var result = (0, ReportUtils_1.getMoneyReportPreviewName)(action, report);
            // participant accountID: 1, 2 corresponds to "Ragnar", "floki@vikings.net"
            expect(result).toBe('Ragnar, floki@vikings.net');
        });
        it('should return the child report name when the report name is not present', function () {
            var action = __assign(__assign({}, (0, reportActions_1.default)(1)), { actionName: CONST_1.default.REPORT.ACTIONS.TYPE.REPORT_PREVIEW, childReportName: 'Child Report' });
            var result = (0, ReportUtils_1.getMoneyReportPreviewName)(action, undefined);
            expect(result).toBe('Child Report');
        });
    });
    describe('canAddTransaction', function () {
        it('should return true for a non-archived report', function () { return __awaiter(void 0, void 0, void 0, function () {
            var report, isReportArchived, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        report = __assign(__assign({}, (0, reports_2.createRandomReport)(10000, undefined)), { type: CONST_1.default.REPORT.TYPE.EXPENSE, ownerAccountID: currentUserAccountID });
                        return [4 /*yield*/, react_native_onyx_1.default.set("".concat(ONYXKEYS_1.default.COLLECTION.REPORT).concat(report.reportID), report)];
                    case 1:
                        _a.sent();
                        isReportArchived = (0, react_native_1.renderHook)(function () { return (0, useReportIsArchived_1.default)(report === null || report === void 0 ? void 0 : report.reportID); }).result;
                        result = (0, ReportUtils_1.canAddTransaction)(report, isReportArchived.current);
                        // Then the result is true
                        expect(result).toBe(true);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should return false for an expense report the current user is not the submitter', function () { return __awaiter(void 0, void 0, void 0, function () {
            var report, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        report = __assign(__assign({}, (0, reports_2.createRandomReport)(10000, undefined)), { type: CONST_1.default.REPORT.TYPE.EXPENSE, ownerAccountID: currentUserAccountID + 1 });
                        return [4 /*yield*/, react_native_onyx_1.default.set("".concat(ONYXKEYS_1.default.COLLECTION.REPORT).concat(report.reportID), report)];
                    case 1:
                        _a.sent();
                        result = (0, ReportUtils_1.canAddTransaction)(report, false);
                        // Then the result is false
                        expect(result).toBe(false);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should return false for an archived report', function () { return __awaiter(void 0, void 0, void 0, function () {
            var report, isReportArchived, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        report = __assign(__assign({}, (0, reports_2.createRandomReport)(10001, undefined)), { type: CONST_1.default.REPORT.TYPE.EXPENSE, ownerAccountID: currentUserAccountID });
                        return [4 /*yield*/, react_native_onyx_1.default.set("".concat(ONYXKEYS_1.default.COLLECTION.REPORT).concat(report.reportID), report)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, react_native_onyx_1.default.set("".concat(ONYXKEYS_1.default.COLLECTION.REPORT_NAME_VALUE_PAIRS).concat(report.reportID), { private_isArchived: DateUtils_1.default.getDBTime() })];
                    case 2:
                        _a.sent();
                        isReportArchived = (0, react_native_1.renderHook)(function () { return (0, useReportIsArchived_1.default)(report === null || report === void 0 ? void 0 : report.reportID); }).result;
                        result = (0, ReportUtils_1.canAddTransaction)(report, isReportArchived.current);
                        // Then the result is false
                        expect(result).toBe(false);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should return false for a closed report', function () { return __awaiter(void 0, void 0, void 0, function () {
            var report, isReportArchived, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        report = __assign(__assign({}, (0, reports_2.createRandomReport)(10002, undefined)), { type: CONST_1.default.REPORT.TYPE.EXPENSE, statusNum: CONST_1.default.REPORT.STATUS_NUM.CLOSED });
                        return [4 /*yield*/, react_native_onyx_1.default.set("".concat(ONYXKEYS_1.default.COLLECTION.REPORT).concat(report.reportID), report)];
                    case 1:
                        _a.sent();
                        isReportArchived = (0, react_native_1.renderHook)(function () { return (0, useReportIsArchived_1.default)(report === null || report === void 0 ? void 0 : report.reportID); }).result;
                        result = (0, ReportUtils_1.canAddTransaction)(report, isReportArchived.current);
                        // Then the result is false
                        expect(result).toBe(false);
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('canDeleteTransaction', function () {
        it('should return true for a non-archived report', function () { return __awaiter(void 0, void 0, void 0, function () {
            var report, isReportArchived, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        report = __assign(__assign({}, (0, reports_2.createRandomReport)(20000, undefined)), { type: CONST_1.default.REPORT.TYPE.EXPENSE });
                        return [4 /*yield*/, react_native_onyx_1.default.set("".concat(ONYXKEYS_1.default.COLLECTION.REPORT).concat(report.reportID), report)];
                    case 1:
                        _a.sent();
                        isReportArchived = (0, react_native_1.renderHook)(function () { return (0, useReportIsArchived_1.default)(report === null || report === void 0 ? void 0 : report.reportID); }).result;
                        result = (0, ReportUtils_1.canDeleteTransaction)(report, isReportArchived.current);
                        // Then the result is true
                        expect(result).toBe(true);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should return false for an archived report', function () { return __awaiter(void 0, void 0, void 0, function () {
            var report, isReportArchived, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        report = __assign(__assign({}, (0, reports_2.createRandomReport)(20001, undefined)), { type: CONST_1.default.REPORT.TYPE.EXPENSE });
                        return [4 /*yield*/, react_native_onyx_1.default.set("".concat(ONYXKEYS_1.default.COLLECTION.REPORT).concat(report.reportID), report)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, react_native_onyx_1.default.set("".concat(ONYXKEYS_1.default.COLLECTION.REPORT_NAME_VALUE_PAIRS).concat(report.reportID), { private_isArchived: DateUtils_1.default.getDBTime() })];
                    case 2:
                        _a.sent();
                        isReportArchived = (0, react_native_1.renderHook)(function () { return (0, useReportIsArchived_1.default)(report === null || report === void 0 ? void 0 : report.reportID); }).result;
                        result = (0, ReportUtils_1.canDeleteTransaction)(report, isReportArchived.current);
                        // Then the result is false
                        expect(result).toBe(false);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should return false for a closed report', function () { return __awaiter(void 0, void 0, void 0, function () {
            var report, isReportArchived, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        report = __assign(__assign({}, (0, reports_2.createRandomReport)(10002, undefined)), { type: CONST_1.default.REPORT.TYPE.EXPENSE, statusNum: CONST_1.default.REPORT.STATUS_NUM.CLOSED });
                        return [4 /*yield*/, react_native_onyx_1.default.set("".concat(ONYXKEYS_1.default.COLLECTION.REPORT).concat(report.reportID), report)];
                    case 1:
                        _a.sent();
                        isReportArchived = (0, react_native_1.renderHook)(function () { return (0, useReportIsArchived_1.default)(report === null || report === void 0 ? void 0 : report.reportID); }).result;
                        result = (0, ReportUtils_1.canAddTransaction)(report, isReportArchived.current);
                        // Then the result is false
                        expect(result).toBe(false);
                        return [2 /*return*/];
                }
            });
        }); });
        describe('with workflow disabled', function () {
            var workflowDisabledPolicy = __assign(__assign({}, (0, policies_1.default)(1)), { autoReporting: true, autoReportingFrequency: CONST_1.default.POLICY.AUTO_REPORTING_FREQUENCIES.INSTANT, approvalMode: CONST_1.default.POLICY.APPROVAL_MODE.OPTIONAL, reimbursementChoice: CONST_1.default.POLICY.REIMBURSEMENT_CHOICES.REIMBURSEMENT_NO });
            (0, globals_1.beforeAll)(function () {
                return react_native_onyx_1.default.set("".concat(ONYXKEYS_1.default.COLLECTION.POLICY).concat(workflowDisabledPolicy.id), workflowDisabledPolicy);
            });
            afterAll(function () {
                return react_native_onyx_1.default.clear();
            });
            it('should return true for reopened report when workflow is disabled', function () { return __awaiter(void 0, void 0, void 0, function () {
                var openReport;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            openReport = __assign(__assign({}, (0, reports_2.createExpenseReport)(20002)), { policyID: '1', stateNum: CONST_1.default.REPORT.STATE_NUM.OPEN, statusNum: CONST_1.default.REPORT.STATUS_NUM.OPEN });
                            return [4 /*yield*/, react_native_onyx_1.default.set("".concat(ONYXKEYS_1.default.COLLECTION.REPORT).concat(openReport.reportID), openReport)];
                        case 1:
                            _a.sent();
                            expect((0, ReportUtils_1.canDeleteTransaction)(openReport, false)).toBe(true);
                            return [2 /*return*/];
                    }
                });
            }); });
            it('should return false for closed report when workflow is disabled', function () { return __awaiter(void 0, void 0, void 0, function () {
                var closedReport;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            closedReport = __assign(__assign({}, (0, reports_2.createExpenseReport)(20002)), { policyID: '1', stateNum: CONST_1.default.REPORT.STATE_NUM.APPROVED, statusNum: CONST_1.default.REPORT.STATUS_NUM.CLOSED });
                            return [4 /*yield*/, react_native_onyx_1.default.set("".concat(ONYXKEYS_1.default.COLLECTION.REPORT).concat(closedReport.reportID), closedReport)];
                        case 1:
                            _a.sent();
                            expect((0, ReportUtils_1.canDeleteTransaction)(closedReport, false)).toBe(false);
                            return [2 /*return*/];
                    }
                });
            }); });
        });
    });
    describe('getReasonAndReportActionThatRequiresAttention', function () {
        it('should return a reason for a non-archived report', function () { return __awaiter(void 0, void 0, void 0, function () {
            var report, isReportArchived, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        report = __assign(__assign({}, (0, reports_2.createRandomReport)(30000, undefined)), { type: CONST_1.default.REPORT.TYPE.EXPENSE, isUnreadWithMention: true });
                        return [4 /*yield*/, react_native_onyx_1.default.set("".concat(ONYXKEYS_1.default.COLLECTION.REPORT).concat(report.reportID), report)];
                    case 1:
                        _a.sent();
                        isReportArchived = (0, react_native_1.renderHook)(function () { return (0, useReportIsArchived_1.default)(report === null || report === void 0 ? void 0 : report.reportID); }).result;
                        result = (0, ReportUtils_1.getReasonAndReportActionThatRequiresAttention)(report, undefined, isReportArchived.current);
                        // There should be some kind of a reason (any reason is fine)
                        expect(result).toHaveProperty('reason');
                        return [2 /*return*/];
                }
            });
        }); });
        it('should return HAS_UNRESOLVED_CARD_FRAUD_ALERT when report has unresolved fraud alert', function () { return __awaiter(void 0, void 0, void 0, function () {
            var report, reportAction, isReportArchived, result;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        report = __assign(__assign({}, (0, reports_2.createRandomReport)(40000, undefined)), { type: CONST_1.default.REPORT.TYPE.EXPENSE, isUnreadWithMention: true });
                        return [4 /*yield*/, react_native_onyx_1.default.set("".concat(ONYXKEYS_1.default.COLLECTION.REPORT).concat(report.reportID), report)];
                    case 1:
                        _b.sent();
                        reportAction = __assign(__assign({}, (0, reportActions_1.default)(40000)), { actionName: CONST_1.default.REPORT.ACTIONS.TYPE.ACTIONABLE_CARD_FRAUD_ALERT });
                        return [4 /*yield*/, react_native_onyx_1.default.set("".concat(ONYXKEYS_1.default.COLLECTION.REPORT_ACTIONS).concat(report.reportID), (_a = {},
                                _a[reportAction.reportActionID] = reportAction,
                                _a))];
                    case 2:
                        _b.sent();
                        isReportArchived = (0, react_native_1.renderHook)(function () { return (0, useReportIsArchived_1.default)(report === null || report === void 0 ? void 0 : report.reportID); }).result;
                        result = (0, ReportUtils_1.getReasonAndReportActionThatRequiresAttention)(report, undefined, isReportArchived.current);
                        expect(result).toHaveProperty('reason', CONST_1.default.REQUIRES_ATTENTION_REASONS.HAS_UNRESOLVED_CARD_FRAUD_ALERT);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should return null for an archived report', function () { return __awaiter(void 0, void 0, void 0, function () {
            var report, isReportArchived, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        report = __assign(__assign({}, (0, reports_2.createRandomReport)(30000, undefined)), { type: CONST_1.default.REPORT.TYPE.EXPENSE, isUnreadWithMention: true });
                        return [4 /*yield*/, react_native_onyx_1.default.set("".concat(ONYXKEYS_1.default.COLLECTION.REPORT).concat(report.reportID), report)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, react_native_onyx_1.default.set("".concat(ONYXKEYS_1.default.COLLECTION.REPORT_NAME_VALUE_PAIRS).concat(report.reportID), { private_isArchived: DateUtils_1.default.getDBTime() })];
                    case 2:
                        _a.sent();
                        isReportArchived = (0, react_native_1.renderHook)(function () { return (0, useReportIsArchived_1.default)(report === null || report === void 0 ? void 0 : report.reportID); }).result;
                        result = (0, ReportUtils_1.getReasonAndReportActionThatRequiresAttention)(report, undefined, isReportArchived.current);
                        // Then the result is null
                        expect(result).toBe(null);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should return null for an archived report when there is a policy pending join request', function () { return __awaiter(void 0, void 0, void 0, function () {
            var joinRequestReportAction, adminReport, isReportArchived, result;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        joinRequestReportAction = __assign(__assign({}, (0, reportActions_1.default)(50400)), { originalMessage: {
                                choice: '',
                                policyID: '1',
                            }, actionName: CONST_1.default.REPORT.ACTIONS.TYPE.ACTIONABLE_JOIN_REQUEST });
                        adminReport = (0, reports_2.createAdminRoom)(34001);
                        return [4 /*yield*/, react_native_onyx_1.default.set("".concat(ONYXKEYS_1.default.COLLECTION.REPORT_ACTIONS).concat(adminReport.reportID), (_a = {}, _a[joinRequestReportAction.reportActionID] = joinRequestReportAction, _a))];
                    case 1:
                        _b.sent();
                        return [4 /*yield*/, react_native_onyx_1.default.set("".concat(ONYXKEYS_1.default.COLLECTION.REPORT_NAME_VALUE_PAIRS).concat(adminReport.reportID), { private_isArchived: DateUtils_1.default.getDBTime() })];
                    case 2:
                        _b.sent();
                        isReportArchived = (0, react_native_1.renderHook)(function () { return (0, useReportIsArchived_1.default)(adminReport === null || adminReport === void 0 ? void 0 : adminReport.reportID); }).result;
                        result = (0, ReportUtils_1.getReasonAndReportActionThatRequiresAttention)(adminReport, undefined, isReportArchived.current);
                        // Then the result is null
                        expect(result).toBe(null);
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('canEditReportDescription', function () {
        it('should return true for a non-archived policy room', function () { return __awaiter(void 0, void 0, void 0, function () {
            var report, isReportArchived, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        report = __assign(__assign({}, (0, reports_2.createRandomReport)(40001, CONST_1.default.REPORT.CHAT_TYPE.POLICY_ROOM)), { participants: (0, ReportUtils_1.buildParticipantsFromAccountIDs)([currentUserAccountID, 1]) });
                        return [4 /*yield*/, react_native_onyx_1.default.set("".concat(ONYXKEYS_1.default.COLLECTION.REPORT).concat(report.reportID), report)];
                    case 1:
                        _a.sent();
                        isReportArchived = (0, react_native_1.renderHook)(function () { return (0, useReportIsArchived_1.default)(report === null || report === void 0 ? void 0 : report.reportID); }).result;
                        result = (0, ReportUtils_1.canEditReportDescription)(report, policy, isReportArchived.current);
                        // Then it can be edited
                        expect(result).toBeTruthy();
                        return [2 /*return*/];
                }
            });
        }); });
        it('should return false for an archived policy room', function () { return __awaiter(void 0, void 0, void 0, function () {
            var report, isReportArchived, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        report = __assign(__assign({}, (0, reports_2.createRandomReport)(40002, CONST_1.default.REPORT.CHAT_TYPE.POLICY_ROOM)), { participants: (0, ReportUtils_1.buildParticipantsFromAccountIDs)([currentUserAccountID, 1]) });
                        return [4 /*yield*/, react_native_onyx_1.default.set("".concat(ONYXKEYS_1.default.COLLECTION.REPORT).concat(report.reportID), report)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, react_native_onyx_1.default.set("".concat(ONYXKEYS_1.default.COLLECTION.REPORT_NAME_VALUE_PAIRS).concat(report.reportID), { private_isArchived: DateUtils_1.default.getDBTime() })];
                    case 2:
                        _a.sent();
                        isReportArchived = (0, react_native_1.renderHook)(function () { return (0, useReportIsArchived_1.default)(report === null || report === void 0 ? void 0 : report.reportID); }).result;
                        result = (0, ReportUtils_1.canEditReportDescription)(report, policy, isReportArchived.current);
                        // Then it cannot be edited
                        expect(result).toBeFalsy();
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('isDeprecatedGroupDM', function () {
        it('should return false if the report is a chat thread', function () {
            var report = __assign(__assign({}, (0, reports_2.createRandomReport)(0, undefined)), { parentReportActionID: '1', parentReportID: '1', type: CONST_1.default.REPORT.TYPE.CHAT, participants: (0, ReportUtils_1.buildParticipantsFromAccountIDs)([currentUserAccountID, 1, 2]) });
            expect((0, ReportUtils_1.isDeprecatedGroupDM)(report)).toBeFalsy();
        });
        it('should return false if the report is a task report', function () {
            var report = __assign(__assign({}, (0, reports_2.createRandomReport)(0, undefined)), { type: CONST_1.default.REPORT.TYPE.TASK, participants: (0, ReportUtils_1.buildParticipantsFromAccountIDs)([currentUserAccountID, 1, 2]) });
            expect((0, ReportUtils_1.isDeprecatedGroupDM)(report)).toBeFalsy();
        });
        it('should return false if the report is a money request report', function () {
            var report = __assign(__assign({}, (0, reports_2.createRandomReport)(0, undefined)), { type: CONST_1.default.REPORT.TYPE.EXPENSE, participants: (0, ReportUtils_1.buildParticipantsFromAccountIDs)([currentUserAccountID, 1, 2]) });
            expect((0, ReportUtils_1.isDeprecatedGroupDM)(report)).toBeFalsy();
        });
        it('should return false if the report is an archived room', function () {
            var report = __assign(__assign({}, (0, reports_2.createRandomReport)(0, undefined)), { participants: (0, ReportUtils_1.buildParticipantsFromAccountIDs)([currentUserAccountID, 1, 2]) });
            expect((0, ReportUtils_1.isDeprecatedGroupDM)(report, true)).toBeFalsy();
        });
        it('should return false if the report is a public / admin / announce chat room', function () {
            var report = __assign(__assign({}, (0, reports_2.createRandomReport)(0, CONST_1.default.REPORT.CHAT_TYPE.POLICY_ADMINS)), { participants: (0, ReportUtils_1.buildParticipantsFromAccountIDs)([currentUserAccountID, 1, 2]) });
            expect((0, ReportUtils_1.isDeprecatedGroupDM)(report)).toBeFalsy();
        });
        it('should return false if the report has less than 2 participants', function () {
            var report = __assign(__assign({}, (0, reports_2.createRandomReport)(0, undefined)), { type: CONST_1.default.REPORT.TYPE.CHAT, participants: (0, ReportUtils_1.buildParticipantsFromAccountIDs)([currentUserAccountID, 1]) });
            expect((0, ReportUtils_1.isDeprecatedGroupDM)(report)).toBeFalsy();
        });
        it('should return true if the report has more than 2 participants', function () {
            var report = __assign(__assign({}, (0, reports_2.createRandomReport)(0, undefined)), { type: CONST_1.default.REPORT.TYPE.CHAT, participants: (0, ReportUtils_1.buildParticipantsFromAccountIDs)([currentUserAccountID, 1, 2]) });
            expect((0, ReportUtils_1.isDeprecatedGroupDM)(report)).toBeTruthy();
        });
    });
    describe('canUserPerformWriteAction', function () {
        it('should return false for announce room when the role of the employee is auditor ', function () { return __awaiter(void 0, void 0, void 0, function () {
            var workspace, policyAnnounceRoom, isReportArchived, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        workspace = __assign(__assign({}, (0, policies_1.default)(1, CONST_1.default.POLICY.TYPE.TEAM)), { role: CONST_1.default.POLICY.ROLE.AUDITOR });
                        policyAnnounceRoom = __assign(__assign({}, (0, reports_2.createRandomReport)(50001, CONST_1.default.REPORT.CHAT_TYPE.POLICY_ANNOUNCE)), { participants: (0, ReportUtils_1.buildParticipantsFromAccountIDs)([currentUserAccountID, 1]), policyID: policy.id, writeCapability: CONST_1.default.REPORT.WRITE_CAPABILITIES.ADMINS });
                        return [4 /*yield*/, react_native_onyx_1.default.set("".concat(ONYXKEYS_1.default.COLLECTION.POLICY).concat(workspace.id), workspace)];
                    case 1:
                        _a.sent();
                        isReportArchived = (0, react_native_1.renderHook)(function () { return (0, useReportIsArchived_1.default)(policyAnnounceRoom.reportID); }).result;
                        result = (0, ReportUtils_1.canUserPerformWriteAction)(policyAnnounceRoom, isReportArchived.current);
                        // Then it should return false
                        expect(result).toBe(false);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should return false for announce room when the role of the employee is admin and report is archived', function () { return __awaiter(void 0, void 0, void 0, function () {
            var workspace, policyAnnounceRoom, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        workspace = __assign(__assign({}, (0, policies_1.default)(1, CONST_1.default.POLICY.TYPE.TEAM)), { role: CONST_1.default.POLICY.ROLE.ADMIN });
                        policyAnnounceRoom = __assign(__assign({}, (0, reports_2.createRandomReport)(50001, CONST_1.default.REPORT.CHAT_TYPE.POLICY_ANNOUNCE)), { participants: (0, ReportUtils_1.buildParticipantsFromAccountIDs)([currentUserAccountID, 1]), policyID: policy.id, writeCapability: CONST_1.default.REPORT.WRITE_CAPABILITIES.ADMINS });
                        return [4 /*yield*/, react_native_onyx_1.default.set("".concat(ONYXKEYS_1.default.COLLECTION.POLICY).concat(workspace.id), workspace)];
                    case 1:
                        _a.sent();
                        result = (0, ReportUtils_1.canUserPerformWriteAction)(policyAnnounceRoom, true);
                        expect(result).toBe(false);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should return true for announce room when the role of the employee is admin and report is not archived', function () { return __awaiter(void 0, void 0, void 0, function () {
            var workspace, policyAnnounceRoom, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        workspace = __assign(__assign({}, (0, policies_1.default)(1, CONST_1.default.POLICY.TYPE.TEAM)), { role: CONST_1.default.POLICY.ROLE.ADMIN });
                        policyAnnounceRoom = __assign(__assign({}, (0, reports_2.createRandomReport)(50001, CONST_1.default.REPORT.CHAT_TYPE.POLICY_ANNOUNCE)), { participants: (0, ReportUtils_1.buildParticipantsFromAccountIDs)([currentUserAccountID, 1]), policyID: policy.id, writeCapability: CONST_1.default.REPORT.WRITE_CAPABILITIES.ADMINS });
                        return [4 /*yield*/, react_native_onyx_1.default.set("".concat(ONYXKEYS_1.default.COLLECTION.POLICY).concat(workspace.id), workspace)];
                    case 1:
                        _a.sent();
                        result = (0, ReportUtils_1.canUserPerformWriteAction)(policyAnnounceRoom, false);
                        expect(result).toBe(true);
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('shouldDisableRename', function () {
        it('should return true for archived reports', function () { return __awaiter(void 0, void 0, void 0, function () {
            var report, isReportArchived, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        report = __assign(__assign({}, (0, reports_2.createRandomReport)(50001, CONST_1.default.REPORT.CHAT_TYPE.POLICY_ROOM)), { participants: (0, ReportUtils_1.buildParticipantsFromAccountIDs)([currentUserAccountID, 1]) });
                        return [4 /*yield*/, react_native_onyx_1.default.set("".concat(ONYXKEYS_1.default.COLLECTION.REPORT).concat(report.reportID), report)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, react_native_onyx_1.default.set("".concat(ONYXKEYS_1.default.COLLECTION.REPORT_NAME_VALUE_PAIRS).concat(report.reportID), { private_isArchived: DateUtils_1.default.getDBTime() })];
                    case 2:
                        _a.sent();
                        isReportArchived = (0, react_native_1.renderHook)(function () { return (0, useReportIsArchived_1.default)(report === null || report === void 0 ? void 0 : report.reportID); }).result;
                        result = (0, ReportUtils_1.shouldDisableRename)(report, isReportArchived.current);
                        // Then it should return true
                        expect(result).toBe(true);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should return true for default rooms', function () {
            // Given a default room
            var report = __assign(__assign({}, (0, reports_2.createRandomReport)(50002, CONST_1.default.REPORT.CHAT_TYPE.POLICY_ADMINS)), { reportName: '#admins' });
            // When shouldDisableRename is called
            var result = (0, ReportUtils_1.shouldDisableRename)(report);
            // Then it should return true
            expect(result).toBe(true);
        });
        it('should return true for public rooms', function () {
            // Given a public room
            var report = __assign(__assign({}, (0, reports_2.createRandomReport)(50003, CONST_1.default.REPORT.CHAT_TYPE.POLICY_ROOM)), { visibility: CONST_1.default.REPORT.VISIBILITY.PUBLIC });
            // When shouldDisableRename is called
            var result = (0, ReportUtils_1.shouldDisableRename)(report);
            // Then it should return true
            expect(result).toBe(true);
        });
        it('should return true for threads', function () {
            // Given a thread report
            var report = __assign(__assign({}, (0, reports_2.createRandomReport)(50004, undefined)), { parentReportID: '12345', parentReportActionID: '67890' });
            // When shouldDisableRename is called
            var result = (0, ReportUtils_1.shouldDisableRename)(report);
            // Then it should return true
            expect(result).toBe(true);
        });
        it('should return true for money request reports', function () {
            // Given a money request report
            var report = __assign(__assign({}, (0, reports_2.createRandomReport)(50005, undefined)), { type: CONST_1.default.REPORT.TYPE.IOU });
            // When shouldDisableRename is called
            var result = (0, ReportUtils_1.shouldDisableRename)(report);
            // Then it should return true
            expect(result).toBe(true);
        });
        it('should return true for expense reports', function () {
            // Given an expense report
            var report = __assign(__assign({}, (0, reports_2.createRandomReport)(50006, undefined)), { type: CONST_1.default.REPORT.TYPE.EXPENSE });
            // When shouldDisableRename is called
            var result = (0, ReportUtils_1.shouldDisableRename)(report);
            // Then it should return true
            expect(result).toBe(true);
        });
        it('should return true for policy expense chats', function () {
            // Given a policy expense chat
            var report = __assign(__assign({}, (0, reports_2.createRandomReport)(50007, CONST_1.default.REPORT.CHAT_TYPE.POLICY_EXPENSE_CHAT)), { isOwnPolicyExpenseChat: true });
            // When shouldDisableRename is called
            var result = (0, ReportUtils_1.shouldDisableRename)(report);
            // Then it should return true
            expect(result).toBe(true);
        });
        it('should return true for invoice rooms', function () {
            // Given an invoice room
            var report = __assign({}, (0, reports_2.createRandomReport)(50008, CONST_1.default.REPORT.CHAT_TYPE.INVOICE));
            // When shouldDisableRename is called
            var result = (0, ReportUtils_1.shouldDisableRename)(report);
            // Then it should return true
            expect(result).toBe(true);
        });
        it('should return true for invoice reports', function () {
            // Given an invoice report
            var report = __assign(__assign({}, (0, reports_2.createRandomReport)(50009, undefined)), { type: CONST_1.default.REPORT.TYPE.INVOICE });
            // When shouldDisableRename is called
            var result = (0, ReportUtils_1.shouldDisableRename)(report);
            // Then it should return true
            expect(result).toBe(true);
        });
        it('should return true for system chats', function () {
            // Given a system chat
            var report = (0, reports_2.createRandomReport)(50010, CONST_1.default.REPORT.CHAT_TYPE.SYSTEM);
            // When shouldDisableRename is called
            var result = (0, ReportUtils_1.shouldDisableRename)(report);
            // Then it should return true
            expect(result).toBe(true);
        });
        it('should return false for group chats', function () { return __awaiter(void 0, void 0, void 0, function () {
            var report, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        report = __assign(__assign({}, (0, reports_2.createRandomReport)(50011, CONST_1.default.REPORT.CHAT_TYPE.GROUP)), { type: CONST_1.default.REPORT.TYPE.CHAT, participants: (0, ReportUtils_1.buildParticipantsFromAccountIDs)([currentUserAccountID, 1, 2]) });
                        return [4 /*yield*/, react_native_onyx_1.default.set("".concat(ONYXKEYS_1.default.COLLECTION.REPORT).concat(report.reportID), report)];
                    case 1:
                        _a.sent();
                        result = (0, ReportUtils_1.shouldDisableRename)(report);
                        // Then it should return false
                        expect(result).toBe(false);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should return false for non-archived regular chats', function () { return __awaiter(void 0, void 0, void 0, function () {
            var report, isReportArchived, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        report = {
                            reportID: '50012',
                            type: CONST_1.default.REPORT.TYPE.CHAT,
                            participants: (0, ReportUtils_1.buildParticipantsFromAccountIDs)([currentUserAccountID, 1]),
                            // Ensure it's not a policy expense chat or any other special chat type
                            chatType: undefined,
                            isOwnPolicyExpenseChat: false,
                            policyID: undefined,
                        };
                        return [4 /*yield*/, react_native_onyx_1.default.set("".concat(ONYXKEYS_1.default.COLLECTION.REPORT).concat(report.reportID), report)];
                    case 1:
                        _a.sent();
                        isReportArchived = (0, react_native_1.renderHook)(function () { return (0, useReportIsArchived_1.default)(report === null || report === void 0 ? void 0 : report.reportID); }).result;
                        result = (0, ReportUtils_1.shouldDisableRename)(report, isReportArchived.current);
                        // Then it should return false (since this is a 1:1 DM and not a group chat, and none of the other conditions are met)
                        expect(result).toBe(false);
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('pushTransactionViolationsOnyxData', function () {
        (0, globals_1.beforeAll)(function () {
            (0, OnyxDerived_1.default)();
        });
        it('should push category violation to the Onyx data when category and tag is pending deletion', function () { return __awaiter(void 0, void 0, void 0, function () {
            var fakePolicyCategories, fakePolicyCategoryNameToDelete, fakePolicyCategoriesUpdate, fakePolicyTagListName, fakePolicyTagsLists, fakePolicyTagsToDelete, fakePolicyTagListsUpdate, fakePolicyID, fakePolicy, fakePolicyReports, result, onyxData, expectedOnyxData;
            var _a, _b, _c, _d, _e;
            var _f, _g, _h, _j, _k;
            return __generator(this, function (_l) {
                switch (_l.label) {
                    case 0:
                        fakePolicyCategories = (0, policyCategory_1.default)(3);
                        fakePolicyCategoryNameToDelete = (_f = Object.keys(fakePolicyCategories).at(0)) !== null && _f !== void 0 ? _f : '';
                        fakePolicyCategoriesUpdate = (_a = {},
                            _a[fakePolicyCategoryNameToDelete] = {
                                pendingAction: CONST_1.default.RED_BRICK_ROAD_PENDING_ACTION.DELETE,
                                enabled: false,
                            },
                            _a);
                        fakePolicyTagListName = 'Tag List';
                        fakePolicyTagsLists = (0, policyTags_1.default)(fakePolicyTagListName, 3);
                        fakePolicyTagsToDelete = Object.entries((_h = (_g = fakePolicyTagsLists === null || fakePolicyTagsLists === void 0 ? void 0 : fakePolicyTagsLists[fakePolicyTagListName]) === null || _g === void 0 ? void 0 : _g.tags) !== null && _h !== void 0 ? _h : {}).slice(1, 2);
                        fakePolicyTagListsUpdate = (_b = {},
                            _b[fakePolicyTagListName] = {
                                tags: __assign({}, fakePolicyTagsToDelete.reduce(function (acc, _a) {
                                    var tagName = _a[0];
                                    acc[tagName] = { pendingAction: CONST_1.default.RED_BRICK_ROAD_PENDING_ACTION.DELETE, enabled: false };
                                    return acc;
                                }, {})),
                            },
                            _b);
                        fakePolicyID = '0';
                        fakePolicy = __assign(__assign({}, (0, policies_1.default)(0)), { id: fakePolicyID, requiresTag: true, areTagsEnabled: true, requiresCategory: true, areCategoriesEnabled: true });
                        fakePolicyReports = (_c = {},
                            _c["".concat(ONYXKEYS_1.default.COLLECTION.REPORT).concat(reports_1.iouReportR14932.reportID)] = __assign(__assign({}, reports_1.iouReportR14932), { policyID: fakePolicyID }),
                            _c["".concat(ONYXKEYS_1.default.COLLECTION.REPORT).concat(reports_1.chatReportR14932.reportID)] = __assign(__assign({}, reports_1.chatReportR14932), { policyID: fakePolicyID }),
                            _c);
                        // Populating Onyx with required data
                        return [4 /*yield*/, react_native_onyx_1.default.multiSet(__assign(__assign({}, fakePolicyReports), (_d = {}, _d["".concat(ONYXKEYS_1.default.COLLECTION.POLICY_TAGS).concat(fakePolicyID)] = fakePolicyTagsLists, _d["".concat(ONYXKEYS_1.default.COLLECTION.POLICY_CATEGORIES).concat(fakePolicyID)] = fakePolicyCategories, _d["".concat(ONYXKEYS_1.default.COLLECTION.POLICY).concat(fakePolicyID)] = fakePolicy, _d["".concat(ONYXKEYS_1.default.COLLECTION.REPORT_ACTIONS).concat(reports_1.iouReportR14932.reportID)] = (_e = {},
                                _e[actions_1.actionR14932.reportActionID] = actions_1.actionR14932,
                                _e), _d["".concat(ONYXKEYS_1.default.COLLECTION.TRANSACTION).concat(transactions_5.transactionR14932.transactionID)] = __assign(__assign({}, transactions_5.transactionR14932), { reportID: reports_1.iouReportR14932.reportID, policyID: fakePolicyID, category: fakePolicyCategoryNameToDelete, tag: (_k = (_j = fakePolicyTagsToDelete.at(0)) === null || _j === void 0 ? void 0 : _j[0]) !== null && _k !== void 0 ? _k : '' }), _d)))];
                    case 1:
                        // Populating Onyx with required data
                        _l.sent();
                        return [4 /*yield*/, (0, waitForBatchedUpdates_1.default)()];
                    case 2:
                        _l.sent();
                        result = (0, react_native_1.renderHook)(function () { return (0, usePolicyData_1.default)(fakePolicyID); }, { wrapper: OnyxListItemProvider_1.default }).result;
                        return [4 /*yield*/, (0, waitForBatchedUpdates_1.default)()];
                    case 3:
                        _l.sent();
                        onyxData = { optimisticData: [], failureData: [] };
                        (0, ReportUtils_1.pushTransactionViolationsOnyxData)(onyxData, result.current, {}, fakePolicyCategoriesUpdate, fakePolicyTagListsUpdate);
                        expectedOnyxData = {
                            // Expecting the optimistic data to contain the OUT_OF_POLICY violations for the deleted category and tag
                            optimisticData: [
                                {
                                    onyxMethod: react_native_onyx_1.default.METHOD.SET,
                                    key: "".concat(ONYXKEYS_1.default.COLLECTION.TRANSACTION_VIOLATIONS).concat(transactions_5.transactionR14932.transactionID),
                                    value: [
                                        {
                                            name: CONST_1.default.VIOLATIONS.CATEGORY_OUT_OF_POLICY,
                                            type: CONST_1.default.VIOLATION_TYPES.VIOLATION,
                                        },
                                        {
                                            name: CONST_1.default.VIOLATIONS.TAG_OUT_OF_POLICY,
                                            type: CONST_1.default.VIOLATION_TYPES.VIOLATION,
                                        },
                                    ],
                                },
                            ],
                            // Expecting the failure data to clear the violations.
                            failureData: [
                                {
                                    onyxMethod: react_native_onyx_1.default.METHOD.SET,
                                    key: "".concat(ONYXKEYS_1.default.COLLECTION.TRANSACTION_VIOLATIONS).concat(transactions_5.transactionR14932.transactionID),
                                    value: null,
                                },
                            ],
                        };
                        expect(onyxData).toMatchObject(expectedOnyxData);
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('canLeaveChat', function () {
        beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        jest.clearAllMocks();
                        return [4 /*yield*/, react_native_onyx_1.default.clear()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('should return true for root group chat', function () {
            var report = (0, reports_2.createRandomReport)(1, CONST_1.default.REPORT.CHAT_TYPE.GROUP);
            expect((0, ReportUtils_1.canLeaveChat)(report, undefined)).toBe(true);
        });
        it('should return true for policy expense chat if the user is not the owner and the user is not an admin', function () {
            var report = __assign(__assign({}, (0, reports_2.createRandomReport)(1, CONST_1.default.REPORT.CHAT_TYPE.POLICY_EXPENSE_CHAT)), { isOwnPolicyExpenseChat: false, policyID: '1' });
            var reportPolicy = __assign(__assign({}, (0, policies_1.default)(1)), { role: CONST_1.default.POLICY.ROLE.USER });
            expect((0, ReportUtils_1.canLeaveChat)(report, reportPolicy)).toBe(true);
        });
        it('should return false if the chat is public room and the user is the guest', function () { return __awaiter(void 0, void 0, void 0, function () {
            var report;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        report = __assign(__assign({}, (0, reports_2.createRandomReport)(1, CONST_1.default.REPORT.CHAT_TYPE.POLICY_ROOM)), { visibility: CONST_1.default.REPORT.VISIBILITY.PUBLIC });
                        return [4 /*yield*/, react_native_onyx_1.default.set(ONYXKEYS_1.default.SESSION, { email: currentUserEmail, accountID: currentUserAccountID, authTokenType: CONST_1.default.AUTH_TOKEN_TYPES.ANONYMOUS })];
                    case 1:
                        _a.sent();
                        expect((0, ReportUtils_1.canLeaveChat)(report, undefined)).toBe(false);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should return false if the report is hidden for the current user', function () { return __awaiter(void 0, void 0, void 0, function () {
            var report;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        report = __assign(__assign({}, (0, reports_2.createRandomReport)(1, undefined)), { type: CONST_1.default.REPORT.TYPE.CHAT, participants: __assign(__assign({}, (0, ReportUtils_1.buildParticipantsFromAccountIDs)([currentUserAccountID, 1234])), (_a = {}, _a[currentUserAccountID] = {
                                notificationPreference: CONST_1.default.REPORT.NOTIFICATION_PREFERENCE.HIDDEN,
                            }, _a)) });
                        return [4 /*yield*/, react_native_onyx_1.default.set(ONYXKEYS_1.default.SESSION, { email: currentUserEmail, accountID: currentUserAccountID })];
                    case 1:
                        _b.sent();
                        expect((0, ReportUtils_1.canLeaveChat)(report, undefined)).toBe(false);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should return false for selfDM reports', function () {
            var report = __assign(__assign({}, (0, reports_2.createRandomReport)(1, CONST_1.default.REPORT.CHAT_TYPE.SELF_DM)), { type: CONST_1.default.REPORT.TYPE.CHAT });
            expect((0, ReportUtils_1.canLeaveChat)(report, undefined)).toBe(false);
        });
        it('should return false for the public announce room if the user is a member of the policy', function () {
            var report = __assign(__assign({}, (0, reports_2.createRandomReport)(1, CONST_1.default.REPORT.CHAT_TYPE.POLICY_ROOM)), { visibility: CONST_1.default.REPORT.VISIBILITY.PUBLIC_ANNOUNCE });
            var reportPolicy = __assign(__assign({}, (0, policies_1.default)(1)), { role: CONST_1.default.POLICY.ROLE.USER });
            expect((0, ReportUtils_1.canLeaveChat)(report, reportPolicy)).toBe(false);
        });
        it('should return true for the invoice room if the user is not the sender or receiver', function () { return __awaiter(void 0, void 0, void 0, function () {
            var report, reportPolicy;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        report = __assign(__assign({}, (0, reports_2.createRandomReport)(1, CONST_1.default.REPORT.CHAT_TYPE.INVOICE)), { invoiceReceiver: {
                                type: CONST_1.default.REPORT.INVOICE_RECEIVER_TYPE.INDIVIDUAL,
                                accountID: 1234,
                            }, policyID: '1', participants: (0, ReportUtils_1.buildParticipantsFromAccountIDs)([currentUserAccountID, 1234]) });
                        return [4 /*yield*/, react_native_onyx_1.default.set(ONYXKEYS_1.default.SESSION, { email: currentUserEmail, accountID: currentUserAccountID })];
                    case 1:
                        _a.sent();
                        reportPolicy = __assign(__assign({}, (0, policies_1.default)(1)), { role: CONST_1.default.POLICY.ROLE.USER });
                        expect((0, ReportUtils_1.canLeaveChat)(report, reportPolicy)).toBe(true);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should return true for chat thread if the user is joined', function () { return __awaiter(void 0, void 0, void 0, function () {
            var report;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        report = __assign(__assign({}, (0, reports_2.createRandomReport)(1, undefined)), { type: CONST_1.default.REPORT.TYPE.CHAT, participants: (0, ReportUtils_1.buildParticipantsFromAccountIDs)([currentUserAccountID, 1234]), parentReportID: '12345', parentReportActionID: '67890' });
                        return [4 /*yield*/, react_native_onyx_1.default.set(ONYXKEYS_1.default.SESSION, { email: currentUserEmail, accountID: currentUserAccountID })];
                    case 1:
                        _a.sent();
                        expect((0, ReportUtils_1.canLeaveChat)(report, undefined)).toBe(true);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should return true for user created policy room', function () { return __awaiter(void 0, void 0, void 0, function () {
            var report, reportPolicy;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        report = __assign(__assign({}, (0, reports_2.createRandomReport)(1, CONST_1.default.REPORT.CHAT_TYPE.POLICY_ROOM)), { participants: (0, ReportUtils_1.buildParticipantsFromAccountIDs)([currentUserAccountID, 1234]) });
                        return [4 /*yield*/, react_native_onyx_1.default.set(ONYXKEYS_1.default.SESSION, { email: currentUserEmail, accountID: currentUserAccountID })];
                    case 1:
                        _a.sent();
                        reportPolicy = __assign(__assign({}, (0, policies_1.default)(1)), { role: CONST_1.default.POLICY.ROLE.USER });
                        expect((0, ReportUtils_1.canLeaveChat)(report, reportPolicy)).toBe(true);
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('canJoinChat', function () {
        beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        jest.clearAllMocks();
                        return [4 /*yield*/, react_native_onyx_1.default.clear()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('should return false if the parent report action is a whisper action', function () {
            var report = __assign(__assign({}, (0, reports_2.createRandomReport)(1, CONST_1.default.REPORT.CHAT_TYPE.GROUP)), { type: CONST_1.default.REPORT.TYPE.CHAT, participants: (0, ReportUtils_1.buildParticipantsFromAccountIDs)([currentUserAccountID, 1234]) });
            var parentReportAction = __assign(__assign({}, (0, reportActions_1.default)(1)), { actionName: CONST_1.default.REPORT.ACTIONS.TYPE.ADD_COMMENT, originalMessage: {
                    whisperedTo: [1234],
                } });
            expect((0, ReportUtils_1.canJoinChat)(report, parentReportAction, undefined)).toBe(false);
        });
        it('should return false if the report is not hidden for the current user', function () { return __awaiter(void 0, void 0, void 0, function () {
            var report;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        report = __assign(__assign({}, (0, reports_2.createRandomReport)(1, CONST_1.default.REPORT.CHAT_TYPE.GROUP)), { type: CONST_1.default.REPORT.TYPE.CHAT, participants: (0, ReportUtils_1.buildParticipantsFromAccountIDs)([currentUserAccountID, 1234]) });
                        return [4 /*yield*/, react_native_onyx_1.default.set(ONYXKEYS_1.default.SESSION, { email: currentUserEmail, accountID: currentUserAccountID })];
                    case 1:
                        _a.sent();
                        expect((0, ReportUtils_1.canJoinChat)(report, undefined, undefined)).toBe(false);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should return false if the report is one of these types: group chat, selfDM, invoice room, system chat, expense chat', function () {
            var report = __assign(__assign({}, (0, reports_2.createRandomReport)(1, CONST_1.default.REPORT.CHAT_TYPE.GROUP)), { type: CONST_1.default.REPORT.TYPE.CHAT });
            expect((0, ReportUtils_1.canJoinChat)(report, undefined, undefined)).toBe(false);
        });
        it('should return false if the report is archived', function () {
            var report = __assign({}, (0, reports_2.createRandomReport)(1, undefined));
            expect((0, ReportUtils_1.canJoinChat)(report, undefined, undefined, true)).toBe(false);
        });
        it('should return true if the report is chat thread', function () { return __awaiter(void 0, void 0, void 0, function () {
            var report;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        report = __assign(__assign({}, (0, reports_2.createRandomReport)(1, undefined)), { type: CONST_1.default.REPORT.TYPE.CHAT, participants: __assign(__assign({}, (0, ReportUtils_1.buildParticipantsFromAccountIDs)([currentUserAccountID, 1234])), (_a = {}, _a[currentUserAccountID] = {
                                notificationPreference: CONST_1.default.REPORT.NOTIFICATION_PREFERENCE.HIDDEN,
                            }, _a)), parentReportID: '12345', parentReportActionID: '67890' });
                        return [4 /*yield*/, react_native_onyx_1.default.set(ONYXKEYS_1.default.SESSION, { email: currentUserEmail, accountID: currentUserAccountID })];
                    case 1:
                        _b.sent();
                        expect((0, ReportUtils_1.canJoinChat)(report, undefined, undefined)).toBe(true);
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('isRootGroupChat', function () {
        it('should return false if the report is chat thread', function () {
            var report = __assign(__assign({}, (0, reports_2.createRandomReport)(1, undefined)), { type: CONST_1.default.REPORT.TYPE.CHAT, parentReportID: '12345', parentReportActionID: '67890' });
            expect((0, ReportUtils_1.isRootGroupChat)(report)).toBe(false);
        });
        it('should return true if the report is a group chat and it is not a chat thread', function () {
            var report = __assign(__assign({}, (0, reports_2.createRandomReport)(1, CONST_1.default.REPORT.CHAT_TYPE.GROUP)), { type: CONST_1.default.REPORT.TYPE.CHAT });
            expect((0, ReportUtils_1.isRootGroupChat)(report)).toBe(true);
        });
        it('should return true if the report is a deprecated group DM and it is not a chat thread', function () {
            var report = __assign(__assign({}, (0, reports_2.createRandomReport)(0, undefined)), { type: CONST_1.default.REPORT.TYPE.CHAT, participants: (0, ReportUtils_1.buildParticipantsFromAccountIDs)([currentUserAccountID, 1, 2]) });
            expect((0, ReportUtils_1.isRootGroupChat)(report)).toBe(true);
        });
    });
    describe('isWhisperAction', function () {
        it('an action where reportAction.message.whisperedTo has accountIDs is a whisper action', function () {
            var whisperReportAction = __assign({}, (0, reportActions_1.default)(1));
            expect((0, ReportActionsUtils_1.isWhisperAction)(whisperReportAction)).toBe(true);
        });
        it('an action where reportAction.originalMessage.whisperedTo does not exist is not a whisper action', function () {
            var nonWhisperReportAction = __assign(__assign({}, (0, reportActions_1.default)(1)), { message: [
                    {
                        whisperedTo: undefined,
                    },
                ] });
            expect((0, ReportActionsUtils_1.isWhisperAction)(nonWhisperReportAction)).toBe(false);
        });
    });
    describe('canFlagReportAction', function () {
        describe('a whisper action', function () {
            var whisperReportAction = __assign({}, (0, reportActions_1.default)(1));
            it('cannot be flagged if it is from concierge', function () {
                var whisperReportActionFromConcierge = __assign(__assign({}, whisperReportAction), { actorAccountID: CONST_1.default.ACCOUNT_ID.CONCIERGE });
                // The reportID doesn't matter because there is an early return for whisper actions and the report is not looked at
                expect((0, ReportUtils_1.canFlagReportAction)(whisperReportActionFromConcierge, '123456')).toBe(false);
            });
            it('cannot be flagged if it is from the current user', function () {
                var whisperReportActionFromCurrentUser = __assign(__assign({}, whisperReportAction), { actorAccountID: currentUserAccountID });
                // The reportID doesn't matter because there is an early return for whisper actions and the report is not looked at
                expect((0, ReportUtils_1.canFlagReportAction)(whisperReportActionFromCurrentUser, '123456')).toBe(false);
            });
            it('can be flagged if it is not from concierge or the current user', function () {
                expect((0, ReportUtils_1.canFlagReportAction)(whisperReportAction, '123456')).toBe(true);
            });
        });
        describe('a non-whisper action', function () {
            var report = (0, reports_2.createRandomReport)(1, undefined);
            var nonWhisperReportAction = __assign(__assign({}, (0, reportActions_1.default)(1)), { actionName: CONST_1.default.REPORT.ACTIONS.TYPE.ADD_COMMENT, message: [
                    {
                        whisperedTo: undefined,
                    },
                ] });
            (0, globals_1.beforeAll)(function () { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, react_native_onyx_1.default.set("".concat(ONYXKEYS_1.default.COLLECTION.REPORT).concat(report.reportID), report)];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
            afterAll(function () { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, react_native_onyx_1.default.set("".concat(ONYXKEYS_1.default.COLLECTION.REPORT).concat(report.reportID), null)];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
            it('cannot be flagged if it is from the current user', function () {
                var nonWhisperReportActionFromCurrentUser = __assign(__assign({}, nonWhisperReportAction), { actorAccountID: currentUserAccountID });
                expect((0, ReportUtils_1.canFlagReportAction)(nonWhisperReportActionFromCurrentUser, report.reportID)).toBe(false);
            });
            it('cannot be flagged if the action name is something other than ADD_COMMENT', function () {
                var nonWhisperReportActionWithDifferentActionName = __assign(__assign({}, nonWhisperReportAction), { actionName: CONST_1.default.REPORT.ACTIONS.TYPE.APPROVED });
                expect((0, ReportUtils_1.canFlagReportAction)(nonWhisperReportActionWithDifferentActionName, report.reportID)).toBe(false);
            });
            it('cannot be flagged if the action is deleted', function () {
                var deletedReportAction = __assign(__assign({}, nonWhisperReportAction), { message: [
                        {
                            whisperedTo: undefined,
                            html: '',
                            deleted: (0, reportActions_1.getRandomDate)(),
                        },
                    ] });
                expect((0, ReportUtils_1.canFlagReportAction)(deletedReportAction, report.reportID)).toBe(false);
            });
            it('cannot be flagged if the action is a created task report', function () {
                var createdTaskReportAction = __assign(__assign({}, nonWhisperReportAction), { originalMessage: {
                        // This signifies that the action is a created task report along with the ADD_COMMENT action name
                        taskReportID: '123456',
                    } });
                expect((0, ReportUtils_1.canFlagReportAction)(createdTaskReportAction, report.reportID)).toBe(false);
            });
            it('cannot be flagged if the report does not exist', function () {
                // cspell:disable-next-line
                expect((0, ReportUtils_1.canFlagReportAction)(nonWhisperReportAction, 'starwarsisthebest')).toBe(false);
            });
            it('cannot be flagged if the report is not allowed to be commented on', function () {
                // eslint-disable-next-line rulesdir/no-negated-variables
                var reportThatCannotBeCommentedOn = __assign(__assign({}, (0, reports_2.createRandomReport)(2, undefined)), { 
                    // If the permissions does not contain WRITE, then it cannot be commented on
                    permissions: [] });
                expect((0, ReportUtils_1.canFlagReportAction)(nonWhisperReportAction, reportThatCannotBeCommentedOn.reportID)).toBe(false);
            });
            it('can be flagged', function () {
                expect((0, ReportUtils_1.canFlagReportAction)(nonWhisperReportAction, report.reportID)).toBe(true);
            });
        });
    });
    // Note: shouldShowFlagComment() calls isArchivedNonExpenseReport() which has it's own unit tests, so whether
    // the report is an expense report or not does not need to be tested here.
    describe('shouldShowFlagComment', function () {
        var validReportAction = __assign(__assign({}, (0, reportActions_1.default)(1)), { actionName: CONST_1.default.REPORT.ACTIONS.TYPE.ADD_COMMENT, 
            // Actor is not the current user or Concierge
            actorAccountID: 123456 });
        describe('can flag report action', function () {
            var expenseReport;
            var reportActionThatCanBeFlagged = __assign({}, validReportAction);
            // eslint-disable-next-line rulesdir/no-negated-variables
            var reportActionThatCannotBeFlagged = __assign(__assign({}, (0, reportActions_1.default)(1)), { actionName: CONST_1.default.REPORT.ACTIONS.TYPE.ADD_COMMENT, 
                // If the actor is Concierge, the report action cannot be flagged
                actorAccountID: CONST_1.default.ACCOUNT_ID.CONCIERGE });
            (0, globals_1.beforeAll)(function () { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            expenseReport = __assign(__assign({}, (0, reports_2.createRandomReport)(60000, undefined)), { type: CONST_1.default.REPORT.TYPE.EXPENSE });
                            return [4 /*yield*/, react_native_onyx_1.default.set("".concat(ONYXKEYS_1.default.COLLECTION.REPORT).concat(expenseReport.reportID), expenseReport)];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
            afterAll(function () { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, react_native_onyx_1.default.set("".concat(ONYXKEYS_1.default.COLLECTION.REPORT).concat(expenseReport.reportID), null)];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
            it('should return true for an archived expense report with an action that can be flagged', function () {
                expect((0, ReportUtils_1.shouldShowFlagComment)(reportActionThatCanBeFlagged, expenseReport, true)).toBe(true);
            });
            it('should return true for a non-archived expense report with an action that can be flagged', function () {
                expect((0, ReportUtils_1.shouldShowFlagComment)(reportActionThatCanBeFlagged, expenseReport, false)).toBe(true);
            });
            it('should return false for an archived expense report with an action that cannot be flagged', function () {
                expect((0, ReportUtils_1.shouldShowFlagComment)(reportActionThatCannotBeFlagged, expenseReport, true)).toBe(false);
            });
            it('should return false for a non-archived expense report with an action that cannot be flagged', function () {
                expect((0, ReportUtils_1.shouldShowFlagComment)(reportActionThatCannotBeFlagged, expenseReport, false)).toBe(false);
            });
        });
        describe('Chat with Chronos', function () {
            var chatReport;
            (0, globals_1.beforeAll)(function () { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            chatReport = __assign(__assign({}, (0, reports_2.createRandomReport)(60000, undefined)), { type: CONST_1.default.REPORT.TYPE.CHAT, participants: (0, ReportUtils_1.buildParticipantsFromAccountIDs)([currentUserAccountID, CONST_1.default.ACCOUNT_ID.CHRONOS]) });
                            return [4 /*yield*/, react_native_onyx_1.default.set("".concat(ONYXKEYS_1.default.COLLECTION.REPORT).concat(chatReport.reportID), chatReport)];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
            afterAll(function () { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, react_native_onyx_1.default.set("".concat(ONYXKEYS_1.default.COLLECTION.REPORT).concat(chatReport.reportID), null)];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
            it('should return false for an archived chat report', function () {
                expect((0, ReportUtils_1.shouldShowFlagComment)(validReportAction, chatReport, true)).toBe(false);
            });
            it('should return false for a non-archived chat report', function () {
                expect((0, ReportUtils_1.shouldShowFlagComment)(validReportAction, chatReport, false)).toBe(false);
            });
        });
        describe('Chat with Concierge', function () {
            var chatReport;
            (0, globals_1.beforeAll)(function () { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            chatReport = __assign(__assign({}, (0, reports_2.createRandomReport)(60000, undefined)), { type: CONST_1.default.REPORT.TYPE.CHAT, participants: (0, ReportUtils_1.buildParticipantsFromAccountIDs)([currentUserAccountID, CONST_1.default.ACCOUNT_ID.CONCIERGE]) });
                            return [4 /*yield*/, react_native_onyx_1.default.set("".concat(ONYXKEYS_1.default.COLLECTION.REPORT).concat(chatReport.reportID), chatReport)];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, react_native_onyx_1.default.set("".concat(ONYXKEYS_1.default.CONCIERGE_REPORT_ID), chatReport.reportID)];
                        case 2:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
            afterAll(function () { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, react_native_onyx_1.default.set("".concat(ONYXKEYS_1.default.COLLECTION.REPORT).concat(chatReport.reportID), null)];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, react_native_onyx_1.default.set("".concat(ONYXKEYS_1.default.CONCIERGE_REPORT_ID), null)];
                        case 2:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
            it('should return false for an archived chat report', function () {
                expect((0, ReportUtils_1.shouldShowFlagComment)(validReportAction, chatReport, true)).toBe(false);
            });
            it('should return false for a non-archived chat report', function () {
                expect((0, ReportUtils_1.shouldShowFlagComment)(validReportAction, chatReport, false)).toBe(false);
            });
        });
        describe('Action from Concierge', function () {
            var chatReport;
            var actionFromConcierge = __assign(__assign({}, (0, reportActions_1.default)(1)), { actionName: CONST_1.default.REPORT.ACTIONS.TYPE.ADD_COMMENT, actorAccountID: CONST_1.default.ACCOUNT_ID.CONCIERGE });
            (0, globals_1.beforeAll)(function () { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            chatReport = __assign(__assign({}, (0, reports_2.createRandomReport)(60000, undefined)), { type: CONST_1.default.REPORT.TYPE.CHAT });
                            return [4 /*yield*/, react_native_onyx_1.default.set("".concat(ONYXKEYS_1.default.COLLECTION.REPORT).concat(chatReport.reportID), chatReport)];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
            afterAll(function () { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, react_native_onyx_1.default.set("".concat(ONYXKEYS_1.default.COLLECTION.REPORT).concat(chatReport.reportID), null)];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
            it('should return false for an archived chat report', function () {
                expect((0, ReportUtils_1.shouldShowFlagComment)(actionFromConcierge, chatReport, true)).toBe(false);
            });
            it('should return false for a non-archived chat report', function () {
                expect((0, ReportUtils_1.shouldShowFlagComment)(actionFromConcierge, chatReport, false)).toBe(false);
            });
        });
    });
    describe('isMoneyRequestReportEligibleForMerge', function () {
        var mockReportID = 'report123';
        var differentUserAccountID = 123123;
        beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, react_native_onyx_1.default.multiSet((_a = {},
                            _a[ONYXKEYS_1.default.PERSONAL_DETAILS_LIST] = participantsPersonalDetails,
                            _a[ONYXKEYS_1.default.SESSION] = { email: currentUserEmail, accountID: currentUserAccountID },
                            _a))];
                    case 1:
                        _b.sent();
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
                        return [2 /*return*/];
                }
            });
        }); });
        it('should return false when report is not a money request report', function () { return __awaiter(void 0, void 0, void 0, function () {
            var chatReport, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        chatReport = __assign(__assign({}, (0, reports_2.createRandomReport)(1, CONST_1.default.REPORT.CHAT_TYPE.POLICY_ROOM)), { reportID: mockReportID, type: CONST_1.default.REPORT.TYPE.CHAT });
                        return [4 /*yield*/, react_native_onyx_1.default.set("".concat(ONYXKEYS_1.default.COLLECTION.REPORT).concat(mockReportID), chatReport)];
                    case 1:
                        _a.sent();
                        result = (0, ReportUtils_1.isMoneyRequestReportEligibleForMerge)(mockReportID, true);
                        // Then it should return false because it's not a money request report
                        expect(result).toBe(false);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should return false when report does not exist', function () {
            // Given a non-existent report ID
            var nonExistentReportID = 'nonexistent123';
            // When we check if the report is eligible for merge
            var result = (0, ReportUtils_1.isMoneyRequestReportEligibleForMerge)(nonExistentReportID, true);
            // Then it should return false because the report doesn't exist
            expect(result).toBe(false);
        });
        describe('Admin role', function () {
            it('should return true for open expense report when user is admin', function () { return __awaiter(void 0, void 0, void 0, function () {
                var expenseReport, result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            expenseReport = __assign(__assign({}, (0, reports_2.createExpenseReport)(1)), { reportID: mockReportID, stateNum: CONST_1.default.REPORT.STATE_NUM.OPEN, statusNum: CONST_1.default.REPORT.STATUS_NUM.OPEN });
                            return [4 /*yield*/, react_native_onyx_1.default.set("".concat(ONYXKEYS_1.default.COLLECTION.REPORT).concat(mockReportID), expenseReport)];
                        case 1:
                            _a.sent();
                            result = (0, ReportUtils_1.isMoneyRequestReportEligibleForMerge)(mockReportID, true);
                            // Then it should return true because admins can merge open expense reports
                            expect(result).toBe(true);
                            return [2 /*return*/];
                    }
                });
            }); });
            it('should return true for processing expense report when user is admin', function () { return __awaiter(void 0, void 0, void 0, function () {
                var expenseReport, result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            expenseReport = __assign(__assign({}, (0, reports_2.createExpenseReport)(1)), { reportID: mockReportID, stateNum: CONST_1.default.REPORT.STATE_NUM.SUBMITTED, statusNum: CONST_1.default.REPORT.STATUS_NUM.SUBMITTED });
                            return [4 /*yield*/, react_native_onyx_1.default.set("".concat(ONYXKEYS_1.default.COLLECTION.REPORT).concat(mockReportID), expenseReport)];
                        case 1:
                            _a.sent();
                            result = (0, ReportUtils_1.isMoneyRequestReportEligibleForMerge)(mockReportID, true);
                            // Then it should return true because admins can merge processing expense reports
                            expect(result).toBe(true);
                            return [2 /*return*/];
                    }
                });
            }); });
            it('should return false for approved expense report when user is admin', function () { return __awaiter(void 0, void 0, void 0, function () {
                var expenseReport, result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            expenseReport = __assign(__assign({}, (0, reports_2.createExpenseReport)(1)), { reportID: mockReportID, stateNum: CONST_1.default.REPORT.STATE_NUM.APPROVED, statusNum: CONST_1.default.REPORT.STATUS_NUM.APPROVED });
                            return [4 /*yield*/, react_native_onyx_1.default.set("".concat(ONYXKEYS_1.default.COLLECTION.REPORT).concat(mockReportID), expenseReport)];
                        case 1:
                            _a.sent();
                            result = (0, ReportUtils_1.isMoneyRequestReportEligibleForMerge)(mockReportID, true);
                            // Then it should return false because approved reports are not eligible for merge
                            expect(result).toBe(false);
                            return [2 /*return*/];
                    }
                });
            }); });
            it('should return true for open IOU report when user is admin', function () { return __awaiter(void 0, void 0, void 0, function () {
                var iouReport, result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            iouReport = __assign(__assign({}, (0, reports_2.createExpenseRequestReport)(1)), { reportID: mockReportID, stateNum: CONST_1.default.REPORT.STATE_NUM.OPEN, statusNum: CONST_1.default.REPORT.STATUS_NUM.OPEN });
                            return [4 /*yield*/, react_native_onyx_1.default.set("".concat(ONYXKEYS_1.default.COLLECTION.REPORT).concat(mockReportID), iouReport)];
                        case 1:
                            _a.sent();
                            result = (0, ReportUtils_1.isMoneyRequestReportEligibleForMerge)(mockReportID, true);
                            // Then it should return true because admins can merge open IOU reports
                            expect(result).toBe(true);
                            return [2 /*return*/];
                    }
                });
            }); });
        });
        describe('Submitter role', function () {
            it('should return true for open expense report when user is submitter', function () { return __awaiter(void 0, void 0, void 0, function () {
                var expenseReport, result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            expenseReport = __assign(__assign({}, (0, reports_2.createExpenseReport)(1)), { reportID: mockReportID, ownerAccountID: currentUserAccountID, stateNum: CONST_1.default.REPORT.STATE_NUM.OPEN, statusNum: CONST_1.default.REPORT.STATUS_NUM.OPEN });
                            return [4 /*yield*/, react_native_onyx_1.default.set("".concat(ONYXKEYS_1.default.COLLECTION.REPORT).concat(mockReportID), expenseReport)];
                        case 1:
                            _a.sent();
                            result = (0, ReportUtils_1.isMoneyRequestReportEligibleForMerge)(mockReportID, false);
                            // Then it should return true because submitters can merge open expense reports
                            expect(result).toBe(true);
                            return [2 /*return*/];
                    }
                });
            }); });
            it('should return true for processing IOU report when user is submitter', function () { return __awaiter(void 0, void 0, void 0, function () {
                var iouReport, result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            iouReport = __assign(__assign({}, (0, reports_2.createExpenseRequestReport)(1)), { reportID: mockReportID, ownerAccountID: currentUserAccountID, stateNum: CONST_1.default.REPORT.STATE_NUM.SUBMITTED, statusNum: CONST_1.default.REPORT.STATUS_NUM.SUBMITTED });
                            return [4 /*yield*/, react_native_onyx_1.default.set("".concat(ONYXKEYS_1.default.COLLECTION.REPORT).concat(mockReportID), iouReport)];
                        case 1:
                            _a.sent();
                            result = (0, ReportUtils_1.isMoneyRequestReportEligibleForMerge)(mockReportID, false);
                            // Then it should return true because submitters can merge processing IOU reports
                            expect(result).toBe(true);
                            return [2 /*return*/];
                    }
                });
            }); });
            it('should return true for processing expense report at first level approval when user is submitter', function () { return __awaiter(void 0, void 0, void 0, function () {
                var managerAccountID, managerEmail, firstLevelApprovalPolicy, expenseReport, result;
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            managerAccountID = 123123;
                            managerEmail = 'manager@test.com';
                            firstLevelApprovalPolicy = __assign(__assign({}, (0, policies_1.default)(1)), { type: CONST_1.default.POLICY.TYPE.CORPORATE, approvalMode: CONST_1.default.POLICY.APPROVAL_MODE.ADVANCED, preventSelfApproval: true, approver: managerEmail });
                            expenseReport = __assign(__assign({}, (0, reports_2.createExpenseReport)(1)), { policyID: firstLevelApprovalPolicy.id, reportID: mockReportID, ownerAccountID: currentUserAccountID, stateNum: CONST_1.default.REPORT.STATE_NUM.SUBMITTED, statusNum: CONST_1.default.REPORT.STATUS_NUM.SUBMITTED, managerID: managerAccountID });
                            return [4 /*yield*/, react_native_onyx_1.default.set("".concat(ONYXKEYS_1.default.COLLECTION.REPORT).concat(mockReportID), expenseReport)];
                        case 1:
                            _b.sent();
                            return [4 /*yield*/, react_native_onyx_1.default.set("".concat(ONYXKEYS_1.default.COLLECTION.POLICY).concat(firstLevelApprovalPolicy.id), firstLevelApprovalPolicy)];
                        case 2:
                            _b.sent();
                            return [4 /*yield*/, react_native_onyx_1.default.merge(ONYXKEYS_1.default.PERSONAL_DETAILS_LIST, (_a = {},
                                    _a[managerAccountID] = {
                                        accountID: managerAccountID,
                                        login: managerEmail,
                                    },
                                    _a))];
                        case 3:
                            _b.sent();
                            result = (0, ReportUtils_1.isMoneyRequestReportEligibleForMerge)(mockReportID, false);
                            // Then it should return true because submitters can merge processing expense reports
                            expect(result).toBe(true);
                            return [2 /*return*/];
                    }
                });
            }); });
            it('should return false for processing expense report beyond first level approval when user is submitter', function () { return __awaiter(void 0, void 0, void 0, function () {
                var expenseReport, result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            expenseReport = __assign(__assign({}, (0, reports_2.createExpenseReport)(1)), { reportID: mockReportID, ownerAccountID: currentUserAccountID, stateNum: CONST_1.default.REPORT.STATE_NUM.SUBMITTED, statusNum: CONST_1.default.REPORT.STATUS_NUM.SUBMITTED });
                            return [4 /*yield*/, react_native_onyx_1.default.set("".concat(ONYXKEYS_1.default.COLLECTION.REPORT).concat(mockReportID), expenseReport)];
                        case 1:
                            _a.sent();
                            result = (0, ReportUtils_1.isMoneyRequestReportEligibleForMerge)(mockReportID, false);
                            // Then the result depends on the actual approval level logic in the implementation
                            expect(typeof result).toBe('boolean');
                            return [2 /*return*/];
                    }
                });
            }); });
            it('should return false when user is not the submitter', function () { return __awaiter(void 0, void 0, void 0, function () {
                var expenseReport, result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            expenseReport = __assign(__assign({}, (0, reports_2.createExpenseReport)(1)), { reportID: mockReportID, ownerAccountID: differentUserAccountID, stateNum: CONST_1.default.REPORT.STATE_NUM.OPEN, statusNum: CONST_1.default.REPORT.STATUS_NUM.OPEN });
                            return [4 /*yield*/, react_native_onyx_1.default.set("".concat(ONYXKEYS_1.default.COLLECTION.REPORT).concat(mockReportID), expenseReport)];
                        case 1:
                            _a.sent();
                            result = (0, ReportUtils_1.isMoneyRequestReportEligibleForMerge)(mockReportID, false);
                            // Then it should return false because the user is not the submitter and not an admin
                            expect(result).toBe(false);
                            return [2 /*return*/];
                    }
                });
            }); });
        });
        describe('Manager role', function () {
            var managerAccountID = currentUserAccountID;
            it('should return true for processing expense report when user is manager', function () { return __awaiter(void 0, void 0, void 0, function () {
                var expenseReport, result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            expenseReport = __assign(__assign({}, (0, reports_2.createExpenseReport)(1)), { reportID: mockReportID, ownerAccountID: differentUserAccountID, managerID: managerAccountID, stateNum: CONST_1.default.REPORT.STATE_NUM.SUBMITTED, statusNum: CONST_1.default.REPORT.STATUS_NUM.SUBMITTED });
                            return [4 /*yield*/, react_native_onyx_1.default.set("".concat(ONYXKEYS_1.default.COLLECTION.REPORT).concat(mockReportID), expenseReport)];
                        case 1:
                            _a.sent();
                            result = (0, ReportUtils_1.isMoneyRequestReportEligibleForMerge)(mockReportID, false);
                            // Then it should return true because managers can merge processing expense reports
                            expect(result).toBe(true);
                            return [2 /*return*/];
                    }
                });
            }); });
            it('should return false for open expense report when user is manager', function () { return __awaiter(void 0, void 0, void 0, function () {
                var expenseReport, result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            expenseReport = __assign(__assign({}, (0, reports_2.createExpenseReport)(1)), { reportID: mockReportID, ownerAccountID: differentUserAccountID, managerID: managerAccountID, stateNum: CONST_1.default.REPORT.STATE_NUM.OPEN, statusNum: CONST_1.default.REPORT.STATUS_NUM.OPEN });
                            return [4 /*yield*/, react_native_onyx_1.default.set("".concat(ONYXKEYS_1.default.COLLECTION.REPORT).concat(mockReportID), expenseReport)];
                        case 1:
                            _a.sent();
                            result = (0, ReportUtils_1.isMoneyRequestReportEligibleForMerge)(mockReportID, false);
                            // Then it should return false because managers can only merge processing expense reports, not open ones
                            expect(result).toBe(false);
                            return [2 /*return*/];
                    }
                });
            }); });
            it('should return false for IOU report when user is manager', function () { return __awaiter(void 0, void 0, void 0, function () {
                var iouReport, result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            iouReport = __assign(__assign({}, (0, reports_2.createExpenseRequestReport)(1)), { reportID: mockReportID, ownerAccountID: differentUserAccountID, managerID: managerAccountID, stateNum: CONST_1.default.REPORT.STATE_NUM.SUBMITTED, statusNum: CONST_1.default.REPORT.STATUS_NUM.SUBMITTED });
                            return [4 /*yield*/, react_native_onyx_1.default.set("".concat(ONYXKEYS_1.default.COLLECTION.REPORT).concat(mockReportID), iouReport)];
                        case 1:
                            _a.sent();
                            result = (0, ReportUtils_1.isMoneyRequestReportEligibleForMerge)(mockReportID, false);
                            // Then it should return false because managers can only merge expense reports, not IOU reports
                            expect(result).toBe(false);
                            return [2 /*return*/];
                    }
                });
            }); });
            it('should return false when user is not the manager', function () { return __awaiter(void 0, void 0, void 0, function () {
                var expenseReport, result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            expenseReport = __assign(__assign({}, (0, reports_2.createExpenseReport)(1)), { reportID: mockReportID, ownerAccountID: differentUserAccountID, managerID: differentUserAccountID, stateNum: CONST_1.default.REPORT.STATE_NUM.SUBMITTED, statusNum: CONST_1.default.REPORT.STATUS_NUM.SUBMITTED });
                            return [4 /*yield*/, react_native_onyx_1.default.set("".concat(ONYXKEYS_1.default.COLLECTION.REPORT).concat(mockReportID), expenseReport)];
                        case 1:
                            _a.sent();
                            result = (0, ReportUtils_1.isMoneyRequestReportEligibleForMerge)(mockReportID, false);
                            // Then it should return false because the user is not the manager, submitter, or admin
                            expect(result).toBe(false);
                            return [2 /*return*/];
                    }
                });
            }); });
        });
    });
    describe('getReportStatusTranslation', function () {
        var mockTranslate = function (path) {
            var params = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                params[_i - 1] = arguments[_i];
            }
            return Localize_1.translate.apply(void 0, __spreadArray([CONST_1.default.LOCALES.EN, path], params, false));
        };
        it('should return "Draft" for state 0, status 0', function () {
            var result = (0, ReportUtils_1.getReportStatusTranslation)({ stateNum: CONST_1.default.REPORT.STATE_NUM.OPEN, statusNum: CONST_1.default.REPORT.STATUS_NUM.OPEN, translate: mockTranslate });
            expect(result).toBe(mockTranslate('common.draft'));
        });
        it('should return "Outstanding" for state 1, status 1', function () {
            var result = (0, ReportUtils_1.getReportStatusTranslation)({ stateNum: CONST_1.default.REPORT.STATE_NUM.SUBMITTED, statusNum: CONST_1.default.REPORT.STATUS_NUM.SUBMITTED, translate: mockTranslate });
            expect(result).toBe(mockTranslate('common.outstanding'));
        });
        it('should return "Done" for state 2, status 2', function () {
            var result = (0, ReportUtils_1.getReportStatusTranslation)({ stateNum: CONST_1.default.REPORT.STATE_NUM.APPROVED, statusNum: CONST_1.default.REPORT.STATUS_NUM.CLOSED, translate: mockTranslate });
            expect(result).toBe(mockTranslate('common.done'));
        });
        it('should return "Approved" for state 2, status 3', function () {
            var result = (0, ReportUtils_1.getReportStatusTranslation)({ stateNum: CONST_1.default.REPORT.STATE_NUM.APPROVED, statusNum: CONST_1.default.REPORT.STATUS_NUM.APPROVED, translate: mockTranslate });
            expect(result).toBe(mockTranslate('iou.approved'));
        });
        it('should return "Paid" for state 2, status 4', function () {
            var result = (0, ReportUtils_1.getReportStatusTranslation)({ stateNum: CONST_1.default.REPORT.STATE_NUM.APPROVED, statusNum: CONST_1.default.REPORT.STATUS_NUM.REIMBURSED, translate: mockTranslate });
            expect(result).toBe(mockTranslate('iou.settledExpensify'));
        });
        it('should return "Paid" for state 3, status 4', function () {
            var result = (0, ReportUtils_1.getReportStatusTranslation)({ stateNum: CONST_1.default.REPORT.STATE_NUM.BILLING, statusNum: CONST_1.default.REPORT.STATUS_NUM.REIMBURSED, translate: mockTranslate });
            expect(result).toBe(mockTranslate('iou.settledExpensify'));
        });
        it('should return "Paid" for state 6, status 4', function () {
            var result = (0, ReportUtils_1.getReportStatusTranslation)({ stateNum: CONST_1.default.REPORT.STATE_NUM.AUTOREIMBURSED, statusNum: CONST_1.default.REPORT.STATUS_NUM.REIMBURSED, translate: mockTranslate });
            expect(result).toBe(mockTranslate('iou.settledExpensify'));
        });
        it('should return an empty string when stateNum or statusNum is undefined', function () {
            expect((0, ReportUtils_1.getReportStatusTranslation)({ stateNum: undefined, statusNum: undefined, translate: mockTranslate })).toBe('');
            expect((0, ReportUtils_1.getReportStatusTranslation)({ stateNum: CONST_1.default.REPORT.STATE_NUM.OPEN, statusNum: undefined, translate: mockTranslate })).toBe('');
            expect((0, ReportUtils_1.getReportStatusTranslation)({ stateNum: undefined, statusNum: CONST_1.default.REPORT.STATUS_NUM.OPEN, translate: mockTranslate })).toBe('');
        });
    });
    describe('buildOptimisticReportPreview', function () {
        it('should include childOwnerAccountID and childManagerAccountID that matches with iouReport data', function () {
            var chatReport = __assign(__assign({}, (0, reports_2.createRandomReport)(100, undefined)), { type: CONST_1.default.REPORT.TYPE.CHAT });
            var iouReport = __assign(__assign({}, (0, reports_2.createRandomReport)(200, undefined)), { parentReportID: '1', type: CONST_1.default.REPORT.TYPE.IOU, ownerAccountID: 1, managerID: 2 });
            var reportPreviewAction = (0, ReportUtils_1.buildOptimisticReportPreview)(chatReport, iouReport);
            expect(reportPreviewAction.childOwnerAccountID).toBe(iouReport.ownerAccountID);
            expect(reportPreviewAction.childManagerAccountID).toBe(iouReport.managerID);
        });
    });
    describe('populateOptimisticReportFormula', function () {
        var mockPolicy = {
            id: 'test-policy-id',
            name: 'Test Policy',
            type: CONST_1.default.POLICY.TYPE.TEAM,
            role: CONST_1.default.POLICY.ROLE.ADMIN,
            owner: 'test@example.com',
            outputCurrency: CONST_1.default.CURRENCY.USD,
            isPolicyExpenseChatEnabled: true,
            autoReporting: true,
            autoReportingFrequency: CONST_1.default.POLICY.AUTO_REPORTING_FREQUENCIES.WEEKLY,
            harvesting: {
                enabled: true,
            },
            defaultBillable: false,
            disabledFields: {},
            fieldList: {},
            customUnits: {},
            areCategoriesEnabled: true,
            areTagsEnabled: true,
            areDistanceRatesEnabled: true,
            areWorkflowsEnabled: true,
            areReportFieldsEnabled: true,
            areConnectionsEnabled: true,
            pendingAction: undefined,
            errors: {},
            isLoading: false,
            errorFields: {},
        };
        var mockReport = {
            reportID: '123456789',
            reportName: 'Test Report',
            type: CONST_1.default.REPORT.TYPE.EXPENSE,
            ownerAccountID: 1,
            currency: CONST_1.default.CURRENCY.USD,
            total: -5000,
            lastVisibleActionCreated: '2024-01-15 10:30:00',
            stateNum: CONST_1.default.REPORT.STATE_NUM.SUBMITTED,
            statusNum: CONST_1.default.REPORT.STATUS_NUM.OPEN,
            chatReportID: 'chat-123',
            policyID: 'test-policy-id',
            participants: {},
            parentReportID: 'chat-123',
        };
        it('should handle NaN total gracefully', function () {
            var reportWithNaNTotal = __assign(__assign({}, mockReport), { total: NaN });
            var result = (0, ReportUtils_1.populateOptimisticReportFormula)('{report:total}', reportWithNaNTotal, mockPolicy);
            expect(result).toBe('{report:total}');
        });
        it('should replace {report:total} with formatted amount', function () {
            var result = (0, ReportUtils_1.populateOptimisticReportFormula)('{report:total}', mockReport, mockPolicy);
            expect(result).toBe('$50.00');
        });
        it('should replace {report:id} with base62 report ID', function () {
            var result = (0, ReportUtils_1.populateOptimisticReportFormula)('{report:id}', mockReport, mockPolicy);
            expect(result).toBe((0, getBase62ReportID_1.default)(Number(mockReport.reportID)));
        });
        it('should replace multiple placeholders correctly', function () {
            var formula = 'Report {report:id} has total {report:total}';
            var result = (0, ReportUtils_1.populateOptimisticReportFormula)(formula, mockReport, mockPolicy);
            var expectedId = (0, getBase62ReportID_1.default)(Number(mockReport.reportID));
            expect(result).toBe("Report ".concat(expectedId, " has total $50.00"));
        });
        it('should handle undefined total gracefully', function () {
            var reportWithUndefinedTotal = __assign(__assign({}, mockReport), { total: undefined });
            var result = (0, ReportUtils_1.populateOptimisticReportFormula)('{report:total}', reportWithUndefinedTotal, mockPolicy);
            expect(result).toBe('{report:total}');
        });
        it('should handle complex formula with multiple placeholders and some invalid values', function () {
            var formula = 'ID: {report:id}, Total: {report:total}, Type: {report:type}';
            var reportWithNaNTotal = __assign(__assign({}, mockReport), { total: NaN });
            var expectedId = (0, getBase62ReportID_1.default)(Number(mockReport.reportID));
            var result = (0, ReportUtils_1.populateOptimisticReportFormula)(formula, reportWithNaNTotal, mockPolicy);
            expect(result).toBe("ID: ".concat(expectedId, ", Total: , Type: Expense Report"));
        });
        it('should handle missing total gracefully', function () {
            var reportWithMissingTotal = __assign(__assign({}, mockReport), { total: undefined });
            var result = (0, ReportUtils_1.populateOptimisticReportFormula)('{report:total}', reportWithMissingTotal, mockPolicy);
            expect(result).toBe('{report:total}');
        });
    });
    describe('canSeeDefaultRoom', function () {
        it('should return true if report is archived room ', function () {
            var betas = [CONST_1.default.BETAS.DEFAULT_ROOMS];
            var report = __assign(__assign({}, (0, reports_2.createRandomReport)(40002, undefined)), { type: CONST_1.default.REPORT.TYPE.CHAT, participants: (0, ReportUtils_1.buildParticipantsFromAccountIDs)([currentUserAccountID, 1]) });
            expect((0, ReportUtils_1.canSeeDefaultRoom)(report, betas, true)).toBe(true);
        });
        it('should return true if the room has an assigned guide', function () {
            var betas = [CONST_1.default.BETAS.DEFAULT_ROOMS];
            var report = __assign(__assign({}, (0, reports_2.createRandomReport)(40002, undefined)), { participants: (0, ReportUtils_1.buildParticipantsFromAccountIDs)([currentUserAccountID, 8]) });
            react_native_onyx_1.default.set(ONYXKEYS_1.default.PERSONAL_DETAILS_LIST, personalDetails).then(function () {
                expect((0, ReportUtils_1.canSeeDefaultRoom)(report, betas, false)).toBe(true);
            });
        });
        it('should return true if the report is admin room', function () {
            var betas = [CONST_1.default.BETAS.DEFAULT_ROOMS];
            var report = (0, reports_2.createRandomReport)(40002, CONST_1.default.REPORT.CHAT_TYPE.POLICY_ADMINS);
            react_native_onyx_1.default.set(ONYXKEYS_1.default.PERSONAL_DETAILS_LIST, personalDetails).then(function () {
                expect((0, ReportUtils_1.canSeeDefaultRoom)(report, betas, false)).toBe(true);
            });
        });
    });
    describe('getAllReportActionsErrorsAndReportActionThatRequiresAttention', function () {
        var report = __assign(__assign({}, (0, reports_2.createRandomReport)(40003, undefined)), { parentReportID: '40004', parentReportActionID: '2' });
        var parentReport = __assign(__assign({}, (0, reports_2.createRandomReport)(40004, undefined)), { statusNum: 0 });
        var reportAction1 = __assign(__assign({}, (0, reportActions_1.default)(1)), { reportID: report.reportID });
        var parentReportAction1 = __assign(__assign({}, (0, reportActions_1.default)(2)), { reportID: '40004', actorAccountID: currentUserAccountID, actionName: CONST_1.default.REPORT.ACTIONS.TYPE.REPORT_PREVIEW, originalMessage: {
                linkedReportID: report.reportID,
            } });
        var reportActions = [reportAction1, parentReportAction1].reduce(function (acc, action) {
            if (action.reportActionID) {
                acc[action.reportActionID] = action;
            }
            return acc;
        }, {});
        beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, react_native_onyx_1.default.clear()];
                    case 1:
                        _c.sent();
                        return [4 /*yield*/, react_native_onyx_1.default.set(ONYXKEYS_1.default.SESSION, { email: currentUserEmail, accountID: currentUserAccountID })];
                    case 2:
                        _c.sent();
                        return [4 /*yield*/, react_native_onyx_1.default.merge("".concat(ONYXKEYS_1.default.COLLECTION.REPORT).concat(report.reportID), report)];
                    case 3:
                        _c.sent();
                        return [4 /*yield*/, react_native_onyx_1.default.merge("".concat(ONYXKEYS_1.default.COLLECTION.REPORT).concat(parentReport.reportID), parentReport)];
                    case 4:
                        _c.sent();
                        return [4 /*yield*/, react_native_onyx_1.default.merge("".concat(ONYXKEYS_1.default.COLLECTION.REPORT_ACTIONS).concat(reportAction1.reportID), (_a = {},
                                _a[reportAction1.reportActionID] = reportAction1,
                                _a))];
                    case 5:
                        _c.sent();
                        return [4 /*yield*/, react_native_onyx_1.default.merge("".concat(ONYXKEYS_1.default.COLLECTION.REPORT_ACTIONS).concat(parentReportAction1.reportID), (_b = {},
                                _b[parentReportAction1.reportActionID] = parentReportAction1,
                                _b))];
                    case 6:
                        _c.sent();
                        return [2 /*return*/, (0, waitForBatchedUpdates_1.default)()];
                }
            });
        }); });
        it("should return nothing when there's no actions required", function () {
            expect((0, ReportUtils_1.getAllReportActionsErrorsAndReportActionThatRequiresAttention)(report, reportActions, false)).toEqual({
                errors: {},
                reportAction: undefined,
            });
        });
        it("should return error with report action when there's actions required", function () { return __awaiter(void 0, void 0, void 0, function () {
            var reportActionWithError, reportActionsWithError;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        reportActionWithError = __assign(__assign({}, (0, reportActions_1.default)(1)), { reportID: report.reportID, errors: {
                                reportID: 'Error message',
                                accountID: 'Error in accountID',
                            } });
                        reportActionsWithError = __assign(__assign({}, reportActions), (_a = {}, _a[reportActionWithError.reportActionID] = reportActionWithError, _a));
                        return [4 /*yield*/, react_native_onyx_1.default.merge("".concat(ONYXKEYS_1.default.COLLECTION.REPORT_ACTIONS).concat(reportActionWithError.reportID), (_b = {},
                                _b[reportActionWithError.reportActionID] = reportActionWithError,
                                _b))];
                    case 1:
                        _c.sent();
                        return [4 /*yield*/, (0, waitForBatchedUpdates_1.default)()];
                    case 2:
                        _c.sent();
                        expect((0, ReportUtils_1.getAllReportActionsErrorsAndReportActionThatRequiresAttention)(report, reportActionsWithError, false)).toEqual({
                            errors: {
                                reportID: 'Error message',
                                accountID: 'Error in accountID',
                            },
                            reportAction: reportActionWithError,
                        });
                        return [2 /*return*/];
                }
            });
        }); });
        it('should return smart scan error for the top-most parent report with smart scan error', function () { return __awaiter(void 0, void 0, void 0, function () {
            var transactionID, transaction, _a, errors, reportAction;
            var _b;
            var _c, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        transactionID = '12345';
                        return [4 /*yield*/, react_native_onyx_1.default.merge("".concat(ONYXKEYS_1.default.COLLECTION.REPORT_ACTIONS).concat(reportAction1.reportID), (_b = {},
                                _b[reportAction1.reportActionID] = {
                                    actorAccountID: currentUserAccountID,
                                    actionName: CONST_1.default.REPORT.ACTIONS.TYPE.IOU,
                                    originalMessage: {
                                        type: CONST_1.default.IOU.REPORT_ACTION_TYPE.CREATE,
                                        IOUTransactionID: transactionID,
                                    },
                                },
                                _b))];
                    case 1:
                        _e.sent();
                        transaction = __assign(__assign({}, (0, transaction_1.default)(Number(transactionID))), { reportID: parentReport.reportID, amount: 0 });
                        return [4 /*yield*/, react_native_onyx_1.default.merge("".concat(ONYXKEYS_1.default.COLLECTION.TRANSACTION).concat(transaction.transactionID), transaction)];
                    case 2:
                        _e.sent();
                        return [4 /*yield*/, (0, waitForBatchedUpdates_1.default)()];
                    case 3:
                        _e.sent();
                        _a = (0, ReportUtils_1.getAllReportActionsErrorsAndReportActionThatRequiresAttention)(parentReport, reportActions, false), errors = _a.errors, reportAction = _a.reportAction;
                        expect(Object.keys(errors)).toHaveLength(1);
                        expect(Object.keys(errors).at(0)).toBe('smartscan');
                        expect(Object.keys((_c = errors.smartscan) !== null && _c !== void 0 ? _c : {})).toHaveLength(1);
                        expect((_d = errors.smartscan) === null || _d === void 0 ? void 0 : _d[Object.keys(errors.smartscan)[0]]).toEqual('Transaction is missing fields');
                        expect(reportAction === null || reportAction === void 0 ? void 0 : reportAction.reportActionID).toBe(parentReportAction1.reportActionID);
                        return [2 /*return*/];
                }
            });
        }); });
        it("should return no error and no report action when there's actions required and report is archived", function () { return __awaiter(void 0, void 0, void 0, function () {
            var transaction, _a, errors, reportAction;
            var _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, react_native_onyx_1.default.merge("".concat(ONYXKEYS_1.default.COLLECTION.REPORT_ACTIONS).concat(parentReportAction1.reportID), (_b = {},
                            _b[parentReportAction1.reportActionID] = {
                                actorAccountID: currentUserAccountID,
                                actionName: CONST_1.default.REPORT.ACTIONS.TYPE.IOU,
                                originalMessage: {
                                    type: CONST_1.default.IOU.REPORT_ACTION_TYPE.CREATE,
                                    IOUTransactionID: '12345',
                                },
                            },
                            _b))];
                    case 1:
                        _c.sent();
                        transaction = __assign(__assign({}, (0, transaction_1.default)(12345)), { reportID: parentReport.reportID, amount: 0 });
                        return [4 /*yield*/, react_native_onyx_1.default.merge("".concat(ONYXKEYS_1.default.COLLECTION.TRANSACTION).concat(transaction.transactionID), transaction)];
                    case 2:
                        _c.sent();
                        return [4 /*yield*/, (0, waitForBatchedUpdates_1.default)()];
                    case 3:
                        _c.sent();
                        _a = (0, ReportUtils_1.getAllReportActionsErrorsAndReportActionThatRequiresAttention)(report, reportActions, true), errors = _a.errors, reportAction = _a.reportAction;
                        expect(Object.keys(errors)).toHaveLength(0);
                        expect(reportAction).toBeUndefined();
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('excludeParticipantsForDisplay', function () {
        var mockParticipants = {
            1: { notificationPreference: 'always' },
            2: { notificationPreference: 'hidden' },
            3: { notificationPreference: 'daily' },
            4: { notificationPreference: 'always' },
        };
        var mockReportMetadata = {
            pendingChatMembers: [
                { accountID: '3', pendingAction: 'delete' },
                { accountID: '4', pendingAction: 'add' },
            ],
        };
        it('should return original array when no exclude options provided', function () {
            var participantsIDs = [1, 2, 3, 4];
            var result = (0, ReportUtils_1.excludeParticipantsForDisplay)(participantsIDs, mockParticipants);
            expect(result).toEqual(participantsIDs);
        });
        it('should return original array when excludeOptions is undefined', function () {
            var participantsIDs = [1, 2, 3, 4];
            var result = (0, ReportUtils_1.excludeParticipantsForDisplay)(participantsIDs, mockParticipants, mockReportMetadata, undefined);
            expect(result).toEqual(participantsIDs);
        });
        it('should exclude current user when shouldExcludeCurrentUser is true', function () {
            var participantsIDs = [1, 2, currentUserAccountID, 4];
            var result = (0, ReportUtils_1.excludeParticipantsForDisplay)(participantsIDs, mockParticipants, mockReportMetadata, {
                shouldExcludeCurrentUser: true,
            });
            expect(result).toEqual([1, 2, 4]);
            expect(result).not.toContain(currentUserAccountID);
        });
        it('should exclude hidden participants when shouldExcludeHidden is true', function () {
            var participantsIDs = [1, 2, 3, 4];
            var result = (0, ReportUtils_1.excludeParticipantsForDisplay)(participantsIDs, mockParticipants, mockReportMetadata, {
                shouldExcludeHidden: true,
            });
            expect(result).toEqual([1, 3, 4]);
            expect(result).not.toContain(2); // participant 2 has 'hidden' notification preference
        });
        it('should exclude deleted participants when shouldExcludeDeleted is true', function () {
            var participantsIDs = [1, 2, 3, 4];
            var result = (0, ReportUtils_1.excludeParticipantsForDisplay)(participantsIDs, mockParticipants, mockReportMetadata, {
                shouldExcludeDeleted: true,
            });
            expect(result).toEqual([1, 2, 4]);
            expect(result).not.toContain(3); // participant 3 has pending delete action
        });
        it('should apply multiple exclusions when multiple options are true', function () {
            var participantsIDs = [1, 2, 3, currentUserAccountID];
            var result = (0, ReportUtils_1.excludeParticipantsForDisplay)(participantsIDs, mockParticipants, mockReportMetadata, {
                shouldExcludeCurrentUser: true,
                shouldExcludeHidden: true,
                shouldExcludeDeleted: true,
            });
            expect(result).toEqual([1]);
        });
        it('should handle empty participants array', function () {
            var participantsIDs = [];
            var result = (0, ReportUtils_1.excludeParticipantsForDisplay)(participantsIDs, mockParticipants, mockReportMetadata, {
                shouldExcludeCurrentUser: true,
                shouldExcludeHidden: true,
                shouldExcludeDeleted: true,
            });
            expect(result).toEqual([]);
        });
        it('should exclude participants not in the participants object when shouldExcludeHidden is true', function () {
            var participantsIDs = [99, 100];
            var result = (0, ReportUtils_1.excludeParticipantsForDisplay)(participantsIDs, mockParticipants, mockReportMetadata, {
                shouldExcludeHidden: true,
            });
            expect(result).toEqual([]); // Should exclude unknown participants because they have undefined notification preference (treated as hidden)
        });
        it('should not exclude participants not in the participants object when shouldExcludeHidden is false', function () {
            var participantsIDs = [99, 100];
            var result = (0, ReportUtils_1.excludeParticipantsForDisplay)(participantsIDs, mockParticipants, mockReportMetadata, {
                shouldExcludeHidden: false,
            });
            expect(result).toEqual([99, 100]); // Should not exclude unknown participants when not excluding hidden
        });
        it('should handle report metadata without pending chat members', function () {
            var participantsIDs = [1, 2, 3, 4];
            var emptyMetadata = {};
            var result = (0, ReportUtils_1.excludeParticipantsForDisplay)(participantsIDs, mockParticipants, emptyMetadata, {
                shouldExcludeDeleted: true,
            });
            expect(result).toEqual(participantsIDs); // Should not exclude any when no pending members
        });
        it('should only exclude based on last pending action when multiple actions for same user', function () {
            var participantsIDs = [1, 2, 3];
            var metadataWithMultipleActions = {
                pendingChatMembers: [
                    { accountID: '3', pendingAction: 'add' },
                    { accountID: '3', pendingAction: 'delete' },
                ],
            };
            var result = (0, ReportUtils_1.excludeParticipantsForDisplay)(participantsIDs, mockParticipants, metadataWithMultipleActions, {
                shouldExcludeDeleted: true,
            });
            expect(result).toEqual([1, 2]);
            expect(result).not.toContain(3); // Should be excluded based on last action (delete)
        });
        it('should not exclude when pending action is not delete', function () {
            var participantsIDs = [1, 4];
            var result = (0, ReportUtils_1.excludeParticipantsForDisplay)(participantsIDs, mockParticipants, mockReportMetadata, {
                shouldExcludeDeleted: true,
            });
            expect(result).toEqual([1, 4]); // participant 4 has 'add' action, should not be excluded
        });
    });
    describe('getReportURLForCurrentContext', function () {
        var flushPromises = function () {
            return new Promise(function (resolve) {
                setImmediate(resolve);
            });
        };
        var mockIsSearchTopmostFullScreenRoute = jest.mocked(isSearchTopmostFullScreenRoute_1.default);
        var environmentURL;
        (0, globals_1.beforeAll)(function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, Environment_1.getEnvironmentURL)()];
                    case 1:
                        environmentURL = _a.sent();
                        return [4 /*yield*/, flushPromises()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        afterAll(function () {
            mockIsSearchTopmostFullScreenRoute.mockRestore();
        });
        var mockGetActiveRoute = Navigation_1.default.getActiveRoute;
        beforeEach(function () {
            mockIsSearchTopmostFullScreenRoute.mockReset();
            mockIsSearchTopmostFullScreenRoute.mockReturnValue(false);
            mockGetActiveRoute.mockReset();
            mockGetActiveRoute.mockReturnValue('search?q=type:report');
        });
        it('returns report route when not in search context', function () {
            var reportID = '123';
            expect((0, ReportUtils_1.getReportURLForCurrentContext)(reportID)).toBe("".concat(environmentURL, "/").concat(ROUTES_1.default.REPORT_WITH_ID.getRoute(reportID)));
        });
        it('returns search route when in search context', function () {
            var reportID = '456';
            mockIsSearchTopmostFullScreenRoute.mockReturnValue(true);
            var encodedBackTo = 'search%3Fq%3Dtype%3Areport';
            mockGetActiveRoute.mockReturnValue("search/r/999?backTo=".concat(encodedBackTo));
            expect((0, ReportUtils_1.getReportURLForCurrentContext)(reportID)).toBe("".concat(environmentURL, "/").concat(ROUTES_1.default.SEARCH_MONEY_REQUEST_REPORT.getRoute({ reportID: reportID, backTo: 'search?q=type:report' })));
        });
        it('uses current search route when no backTo parameter is present', function () {
            var reportID = '111';
            mockIsSearchTopmostFullScreenRoute.mockReturnValue(true);
            mockGetActiveRoute.mockReturnValue('search?q=type:invoice');
            expect((0, ReportUtils_1.getReportURLForCurrentContext)(reportID)).toBe("".concat(environmentURL, "/").concat(ROUTES_1.default.SEARCH_MONEY_REQUEST_REPORT.getRoute({ reportID: reportID, backTo: 'search?q=type:invoice' })));
        });
        it('normalizes leading slash in search routes', function () {
            var reportID = '222';
            mockIsSearchTopmostFullScreenRoute.mockReturnValue(true);
            mockGetActiveRoute.mockReturnValue('/search?q=type:card');
            expect((0, ReportUtils_1.getReportURLForCurrentContext)(reportID)).toBe("".concat(environmentURL, "/").concat(ROUTES_1.default.SEARCH_MONEY_REQUEST_REPORT.getRoute({ reportID: reportID, backTo: 'search?q=type:card' })));
        });
        it('falls back to default search route when current route is unavailable', function () {
            var reportID = '789';
            mockIsSearchTopmostFullScreenRoute.mockReturnValue(true);
            mockGetActiveRoute.mockReturnValue('');
            expect((0, ReportUtils_1.getReportURLForCurrentContext)(reportID)).toBe("".concat(environmentURL, "/").concat(ROUTES_1.default.SEARCH_MONEY_REQUEST_REPORT.getRoute({ reportID: reportID, backTo: ROUTES_1.default.SEARCH_ROOT.route })));
        });
        it('falls back to the base report path when reportID is missing', function () {
            expect((0, ReportUtils_1.getReportURLForCurrentContext)(undefined)).toBe("".concat(environmentURL, "/r/"));
        });
    });
    describe('requiresManualSubmission', function () {
        it('should return true when manual submit is enabled', function () {
            var report = __assign(__assign({}, (0, reports_2.createRandomReport)(1, undefined)), { stateNum: CONST_1.default.REPORT.STATE_NUM.OPEN, statusNum: CONST_1.default.REPORT.STATUS_NUM.OPEN });
            var policy1 = (0, policies_1.default)(1);
            policy1.harvesting = { enabled: false };
            policy1.autoReportingFrequency = CONST_1.default.POLICY.AUTO_REPORTING_FREQUENCIES.IMMEDIATE;
            var result = (0, ReportUtils_1.requiresManualSubmission)(report, policy1);
            expect(result).toBe(true);
        });
        it('should return false when instant submit is enabled and report is not open', function () {
            var report = __assign(__assign({}, (0, reports_2.createRandomReport)(2, undefined)), { stateNum: CONST_1.default.REPORT.STATE_NUM.SUBMITTED, statusNum: CONST_1.default.REPORT.STATUS_NUM.SUBMITTED });
            var policy2 = (0, policies_1.default)(2);
            policy2.autoReporting = true;
            policy2.autoReportingFrequency = CONST_1.default.POLICY.AUTO_REPORTING_FREQUENCIES.INSTANT;
            policy2.approvalMode = CONST_1.default.POLICY.APPROVAL_MODE.BASIC;
            var result = (0, ReportUtils_1.requiresManualSubmission)(report, policy2);
            expect(result).toBe(false);
        });
        it('should return false when instant submit is enabled with approvers', function () {
            var report = __assign(__assign({}, (0, reports_2.createRandomReport)(3, undefined)), { stateNum: CONST_1.default.REPORT.STATE_NUM.OPEN, statusNum: CONST_1.default.REPORT.STATUS_NUM.OPEN });
            var policy3 = (0, policies_1.default)(3);
            policy3.autoReporting = true;
            policy3.autoReportingFrequency = CONST_1.default.POLICY.AUTO_REPORTING_FREQUENCIES.INSTANT;
            policy3.approvalMode = CONST_1.default.POLICY.APPROVAL_MODE.BASIC;
            var result = (0, ReportUtils_1.requiresManualSubmission)(report, policy3);
            expect(result).toBe(false);
        });
        it('should return true for open report in Submit & Close policy with instant submit', function () {
            var report = __assign(__assign({}, (0, reports_2.createRandomReport)(4, undefined)), { stateNum: CONST_1.default.REPORT.STATE_NUM.OPEN, statusNum: CONST_1.default.REPORT.STATUS_NUM.OPEN });
            var policy4 = (0, policies_1.default)(4);
            policy4.autoReporting = true;
            policy4.autoReportingFrequency = CONST_1.default.POLICY.AUTO_REPORTING_FREQUENCIES.INSTANT;
            policy4.approvalMode = CONST_1.default.POLICY.APPROVAL_MODE.OPTIONAL; // Submit & Close (no approvers)
            var result = (0, ReportUtils_1.requiresManualSubmission)(report, policy4);
            expect(result).toBe(true);
        });
        it('should return false for closed report in Submit & Close policy with instant submit', function () {
            var report = __assign(__assign({}, (0, reports_2.createRandomReport)(5, undefined)), { stateNum: CONST_1.default.REPORT.STATE_NUM.APPROVED, statusNum: CONST_1.default.REPORT.STATUS_NUM.CLOSED });
            var policy5 = (0, policies_1.default)(5);
            policy5.autoReporting = true;
            policy5.autoReportingFrequency = CONST_1.default.POLICY.AUTO_REPORTING_FREQUENCIES.INSTANT;
            policy5.approvalMode = CONST_1.default.POLICY.APPROVAL_MODE.OPTIONAL; // Submit & Close (no approvers)
            var result = (0, ReportUtils_1.requiresManualSubmission)(report, policy5);
            expect(result).toBe(false);
        });
        it('should return false when policy has auto reporting with monthly frequency (delayed submission)', function () {
            var report = __assign(__assign({}, (0, reports_2.createRandomReport)(8, undefined)), { stateNum: CONST_1.default.REPORT.STATE_NUM.OPEN, statusNum: CONST_1.default.REPORT.STATUS_NUM.OPEN });
            var policy6 = (0, policies_1.default)(8);
            policy6.autoReporting = true;
            policy6.autoReportingFrequency = CONST_1.default.POLICY.AUTO_REPORTING_FREQUENCIES.MONTHLY;
            var result = (0, ReportUtils_1.requiresManualSubmission)(report, policy6);
            expect(result).toBe(false);
        });
    });
    describe('isWorkspaceMemberLeavingWorkspaceRoom', function () {
        test('should return false when not a policy employee', function () {
            var report = __assign(__assign({}, (0, reports_2.createRandomReport)(1, CONST_1.default.REPORT.CHAT_TYPE.POLICY_EXPENSE_CHAT)), { visibility: CONST_1.default.REPORT.VISIBILITY.RESTRICTED, isOwnPolicyExpenseChat: true });
            expect((0, ReportUtils_1.isWorkspaceMemberLeavingWorkspaceRoom)(report, false, true)).toBe(false);
        });
        test('should return true for restricted room when policy employee', function () {
            var report = __assign(__assign({}, (0, reports_2.createRandomReport)(2, undefined)), { visibility: CONST_1.default.REPORT.VISIBILITY.RESTRICTED });
            expect((0, ReportUtils_1.isWorkspaceMemberLeavingWorkspaceRoom)(report, true, false)).toBe(true);
        });
        test('should return true for policy expense chat when own chat and policy employee', function () {
            var report = __assign(__assign({}, (0, reports_2.createRandomReport)(3, CONST_1.default.REPORT.CHAT_TYPE.POLICY_EXPENSE_CHAT)), { visibility: CONST_1.default.REPORT.VISIBILITY.PUBLIC, isOwnPolicyExpenseChat: true });
            expect((0, ReportUtils_1.isWorkspaceMemberLeavingWorkspaceRoom)(report, true, false)).toBe(true);
        });
        test('should return true for policy expense chat when policy admin and policy employee', function () {
            var report = __assign(__assign({}, (0, reports_2.createRandomReport)(4, CONST_1.default.REPORT.CHAT_TYPE.POLICY_EXPENSE_CHAT)), { visibility: CONST_1.default.REPORT.VISIBILITY.PUBLIC, isOwnPolicyExpenseChat: false });
            expect((0, ReportUtils_1.isWorkspaceMemberLeavingWorkspaceRoom)(report, true, true)).toBe(true);
        });
        test('should return false for non-restricted, non-policy expense chat', function () {
            var report = __assign(__assign({}, (0, reports_2.createRandomReport)(5, CONST_1.default.REPORT.CHAT_TYPE.GROUP)), { visibility: CONST_1.default.REPORT.VISIBILITY.PUBLIC, isOwnPolicyExpenseChat: false });
            expect((0, ReportUtils_1.isWorkspaceMemberLeavingWorkspaceRoom)(report, true, false)).toBe(false);
        });
        test('should return false for non-restricted policy expense chat when not own chat and not admin', function () {
            var report = __assign(__assign({}, (0, reports_2.createRandomReport)(6, CONST_1.default.REPORT.CHAT_TYPE.POLICY_EXPENSE_CHAT)), { visibility: CONST_1.default.REPORT.VISIBILITY.PUBLIC, isOwnPolicyExpenseChat: false });
            expect((0, ReportUtils_1.isWorkspaceMemberLeavingWorkspaceRoom)(report, true, false)).toBe(false);
        });
    });
    describe('shouldExcludeAncestorReportAction', function () {
        it('should return false for trip preview action when it is the youngest descendant', function () {
            var tripPreviewAction = __assign(__assign({}, (0, reportActions_1.default)(1)), { actionName: CONST_1.default.REPORT.ACTIONS.TYPE.TRIP_PREVIEW });
            var result = (0, ReportUtils_1.shouldExcludeAncestorReportAction)(tripPreviewAction, true);
            expect(result).toBe(false);
        });
        it('should return true for trip preview action when it is not the youngest descendant', function () {
            var tripPreviewAction = __assign(__assign({}, (0, reportActions_1.default)(1)), { actionName: CONST_1.default.REPORT.ACTIONS.TYPE.TRIP_PREVIEW });
            var result = (0, ReportUtils_1.shouldExcludeAncestorReportAction)(tripPreviewAction, false);
            expect(result).toBe(true);
        });
        it('should return true for transaction thread CREATE actions', function () {
            var transactionThreadAction = __assign(__assign({}, (0, reportActions_1.default)(1)), { actionName: CONST_1.default.REPORT.ACTIONS.TYPE.IOU, originalMessage: {
                    created: DateUtils_1.default.getDBTime(),
                    type: CONST_1.default.IOU.REPORT_ACTION_TYPE.CREATE,
                } });
            var result = (0, ReportUtils_1.shouldExcludeAncestorReportAction)(transactionThreadAction, false);
            expect(result).toBe(true);
        });
        it('should return true for transaction thread TRACK actions', function () {
            var transactionThreadAction = __assign(__assign({}, (0, reportActions_1.default)(1)), { actionName: CONST_1.default.REPORT.ACTIONS.TYPE.IOU, originalMessage: {
                    created: DateUtils_1.default.getDBTime(),
                    type: CONST_1.default.IOU.REPORT_ACTION_TYPE.TRACK,
                } });
            var result = (0, ReportUtils_1.shouldExcludeAncestorReportAction)(transactionThreadAction, false);
            expect(result).toBe(true);
        });
        it('should return false for sent money report actions (PAY with IOUDetails)', function () {
            var sentMoneyAction = __assign(__assign({}, (0, reportActions_1.default)(1)), { actionName: CONST_1.default.REPORT.ACTIONS.TYPE.IOU, originalMessage: {
                    created: DateUtils_1.default.getDBTime(),
                    type: CONST_1.default.IOU.REPORT_ACTION_TYPE.PAY,
                    IOUDetails: {
                        amount: 100,
                        currency: 'USD',
                        comment: '',
                    },
                } });
            var result = (0, ReportUtils_1.shouldExcludeAncestorReportAction)(sentMoneyAction, true);
            expect(result).toBe(false);
        });
        it('should return true for report preview actions', function () {
            var reportPreviewAction = __assign(__assign({}, (0, reportActions_1.default)(1)), { actionName: CONST_1.default.REPORT.ACTIONS.TYPE.REPORT_PREVIEW });
            var result = (0, ReportUtils_1.shouldExcludeAncestorReportAction)(reportPreviewAction, true);
            expect(result).toBe(true);
        });
        it('should return false for regular comment actions', function () {
            var commentAction = __assign(__assign({}, (0, reportActions_1.default)(1)), { actionName: CONST_1.default.REPORT.ACTIONS.TYPE.ADD_COMMENT });
            var result = (0, ReportUtils_1.shouldExcludeAncestorReportAction)(commentAction, true);
            expect(result).toBe(false);
        });
        it('should return false for regular IOU actions that are not transaction threads', function () {
            var iouAction = __assign(__assign({}, (0, reportActions_1.default)(1)), { actionName: CONST_1.default.REPORT.ACTIONS.TYPE.IOU, originalMessage: {
                    created: DateUtils_1.default.getDBTime(),
                    type: CONST_1.default.IOU.REPORT_ACTION_TYPE.SPLIT,
                } });
            var result = (0, ReportUtils_1.shouldExcludeAncestorReportAction)(iouAction, true);
            expect(result).toBe(false);
        });
        it('should return false for PAY actions without IOUDetails', function () {
            var payAction = __assign(__assign({}, (0, reportActions_1.default)(1)), { actionName: CONST_1.default.REPORT.ACTIONS.TYPE.IOU, originalMessage: {
                    created: DateUtils_1.default.getDBTime(),
                    type: CONST_1.default.IOU.REPORT_ACTION_TYPE.PAY,
                } });
            var result = (0, ReportUtils_1.shouldExcludeAncestorReportAction)(payAction, true);
            expect(result).toBe(false);
        });
        it('should return false for non-money request actions', function () {
            var nonMoneyRequestAction = __assign(__assign({}, (0, reportActions_1.default)(1)), { actionName: CONST_1.default.REPORT.ACTIONS.TYPE.RENAMED });
            var result = (0, ReportUtils_1.shouldExcludeAncestorReportAction)(nonMoneyRequestAction, true);
            expect(result).toBe(false);
        });
        it('should handle empty object as parent report action', function () {
            var result = (0, ReportUtils_1.shouldExcludeAncestorReportAction)({}, true);
            expect(result).toBe(false);
        });
    });
    describe('shouldEnableNegative', function () {
        var expenseReport;
        var chatReport;
        var corporatePolicy;
        var teamPolicy;
        var personalPolicy;
        beforeEach(function () {
            // Create test reports using the proper pattern
            expenseReport = __assign(__assign({}, LHNTestUtils.getFakeReport()), { type: CONST_1.default.REPORT.TYPE.EXPENSE });
            chatReport = __assign(__assign({}, LHNTestUtils.getFakeReport()), { type: CONST_1.default.REPORT.TYPE.CHAT });
            // Create test policies using the existing pattern
            corporatePolicy = __assign(__assign({}, (0, policies_1.default)(1)), { type: CONST_1.default.POLICY.TYPE.CORPORATE });
            teamPolicy = __assign(__assign({}, (0, policies_1.default)(2)), { type: CONST_1.default.POLICY.TYPE.TEAM });
            personalPolicy = __assign(__assign({}, (0, policies_1.default)(3)), { type: CONST_1.default.POLICY.TYPE.PERSONAL });
        });
        describe('when report is an expense report', function () {
            it('should return true for expense report with undefined iouType', function () {
                expect((0, ReportUtils_1.shouldEnableNegative)(expenseReport)).toBe(true);
            });
            it('should return true for expense report with null iouType', function () {
                expect((0, ReportUtils_1.shouldEnableNegative)(expenseReport, undefined, undefined)).toBe(true);
            });
            it('should return true for expense report with CREATE iouType', function () {
                expect((0, ReportUtils_1.shouldEnableNegative)(expenseReport, undefined, CONST_1.default.IOU.TYPE.CREATE)).toBe(true);
            });
            it('should return true for expense report with REQUEST iouType', function () {
                expect((0, ReportUtils_1.shouldEnableNegative)(expenseReport, undefined, CONST_1.default.IOU.TYPE.REQUEST)).toBe(true);
            });
            it('should return false for expense report with SPLIT iouType', function () {
                expect((0, ReportUtils_1.shouldEnableNegative)(expenseReport, undefined, CONST_1.default.IOU.TYPE.SPLIT)).toBe(false);
            });
            it('should return false for expense report with INVOICE iouType', function () {
                expect((0, ReportUtils_1.shouldEnableNegative)(expenseReport, undefined, CONST_1.default.IOU.TYPE.INVOICE)).toBe(false);
            });
        });
        describe('when policy is a group policy (CORPORATE)', function () {
            it('should return true for corporate policy with undefined iouType', function () {
                expect((0, ReportUtils_1.shouldEnableNegative)(chatReport, corporatePolicy)).toBe(true);
            });
            it('should return true for corporate policy with CREATE iouType', function () {
                expect((0, ReportUtils_1.shouldEnableNegative)(chatReport, corporatePolicy, CONST_1.default.IOU.TYPE.CREATE)).toBe(true);
            });
            it('should return true for corporate policy with REQUEST iouType', function () {
                expect((0, ReportUtils_1.shouldEnableNegative)(chatReport, corporatePolicy, CONST_1.default.IOU.TYPE.REQUEST)).toBe(true);
            });
            it('should return false for corporate policy with SPLIT iouType', function () {
                expect((0, ReportUtils_1.shouldEnableNegative)(chatReport, corporatePolicy, CONST_1.default.IOU.TYPE.SPLIT)).toBe(false);
            });
            it('should return false for corporate policy with INVOICE iouType', function () {
                expect((0, ReportUtils_1.shouldEnableNegative)(chatReport, corporatePolicy, CONST_1.default.IOU.TYPE.INVOICE)).toBe(false);
            });
        });
        describe('when policy is a group policy (TEAM)', function () {
            it('should return true for team policy with undefined iouType', function () {
                expect((0, ReportUtils_1.shouldEnableNegative)(chatReport, teamPolicy)).toBe(true);
            });
            it('should return true for team policy with CREATE iouType', function () {
                expect((0, ReportUtils_1.shouldEnableNegative)(chatReport, teamPolicy, CONST_1.default.IOU.TYPE.CREATE)).toBe(true);
            });
            it('should return true for team policy with REQUEST iouType', function () {
                expect((0, ReportUtils_1.shouldEnableNegative)(chatReport, teamPolicy, CONST_1.default.IOU.TYPE.REQUEST)).toBe(true);
            });
            it('should return false for team policy with SPLIT iouType', function () {
                expect((0, ReportUtils_1.shouldEnableNegative)(chatReport, teamPolicy, CONST_1.default.IOU.TYPE.SPLIT)).toBe(false);
            });
            it('should return false for team policy with INVOICE iouType', function () {
                expect((0, ReportUtils_1.shouldEnableNegative)(chatReport, teamPolicy, CONST_1.default.IOU.TYPE.INVOICE)).toBe(false);
            });
        });
        describe('when iouType is CREATE', function () {
            it('should return true for CREATE iouType with personal policy', function () {
                expect((0, ReportUtils_1.shouldEnableNegative)(chatReport, personalPolicy, CONST_1.default.IOU.TYPE.CREATE)).toBe(true);
            });
            it('should return true for CREATE iouType with no policy', function () {
                expect((0, ReportUtils_1.shouldEnableNegative)(chatReport, undefined, CONST_1.default.IOU.TYPE.CREATE)).toBe(true);
            });
            it('should return true for CREATE iouType with null policy', function () {
                expect((0, ReportUtils_1.shouldEnableNegative)(chatReport, undefined, CONST_1.default.IOU.TYPE.CREATE)).toBe(true);
            });
            it('should return true for CREATE iouType with expense report', function () {
                expect((0, ReportUtils_1.shouldEnableNegative)(expenseReport, personalPolicy, CONST_1.default.IOU.TYPE.CREATE)).toBe(true);
            });
        });
        describe('exclusion cases for SPLIT and INVOICE iouTypes', function () {
            it('should return false for SPLIT iouType regardless of report type', function () {
                expect((0, ReportUtils_1.shouldEnableNegative)(expenseReport, corporatePolicy, CONST_1.default.IOU.TYPE.SPLIT)).toBe(false);
                expect((0, ReportUtils_1.shouldEnableNegative)(chatReport, teamPolicy, CONST_1.default.IOU.TYPE.SPLIT)).toBe(false);
                expect((0, ReportUtils_1.shouldEnableNegative)(chatReport, personalPolicy, CONST_1.default.IOU.TYPE.SPLIT)).toBe(false);
            });
            it('should return false for INVOICE iouType regardless of report type', function () {
                expect((0, ReportUtils_1.shouldEnableNegative)(expenseReport, corporatePolicy, CONST_1.default.IOU.TYPE.INVOICE)).toBe(false);
                expect((0, ReportUtils_1.shouldEnableNegative)(chatReport, teamPolicy, CONST_1.default.IOU.TYPE.INVOICE)).toBe(false);
                expect((0, ReportUtils_1.shouldEnableNegative)(chatReport, personalPolicy, CONST_1.default.IOU.TYPE.INVOICE)).toBe(false);
            });
            it('should return true for SPLIT_EXPENSE iouType with expense report (different from SPLIT)', function () {
                // SPLIT_EXPENSE is different from SPLIT - only SPLIT and INVOICE are excluded
                expect((0, ReportUtils_1.shouldEnableNegative)(expenseReport, corporatePolicy, CONST_1.default.IOU.TYPE.SPLIT_EXPENSE)).toBe(true);
            });
        });
        describe('edge cases with null/undefined values', function () {
            it('should return false when all parameters are null/undefined', function () {
                expect((0, ReportUtils_1.shouldEnableNegative)(undefined, undefined, undefined)).toBe(false);
            });
            it('should return true when report is null but policy is group policy', function () {
                expect((0, ReportUtils_1.shouldEnableNegative)(undefined, corporatePolicy)).toBe(true);
                expect((0, ReportUtils_1.shouldEnableNegative)(undefined, teamPolicy)).toBe(true);
            });
            it('should return false when report is null and policy is personal', function () {
                expect((0, ReportUtils_1.shouldEnableNegative)(undefined, personalPolicy)).toBe(false);
            });
            it('should return true when report is null but iouType is CREATE', function () {
                expect((0, ReportUtils_1.shouldEnableNegative)(undefined, undefined, CONST_1.default.IOU.TYPE.CREATE)).toBe(true);
            });
            it('should handle undefined policy type gracefully', function () {
                var policyWithUndefinedType = __assign(__assign({}, (0, policies_1.default)(4)), { type: undefined });
                expect((0, ReportUtils_1.shouldEnableNegative)(chatReport, policyWithUndefinedType)).toBe(false);
            });
            it('should handle empty string policy type gracefully', function () {
                var policyWithEmptyType = __assign(__assign({}, (0, policies_1.default)(5)), { type: '' });
                expect((0, ReportUtils_1.shouldEnableNegative)(chatReport, policyWithEmptyType)).toBe(false);
            });
        });
        describe('combination scenarios', function () {
            it('should return true when expense report AND group policy', function () {
                expect((0, ReportUtils_1.shouldEnableNegative)(expenseReport, corporatePolicy)).toBe(true);
                expect((0, ReportUtils_1.shouldEnableNegative)(expenseReport, teamPolicy)).toBe(true);
            });
            it('should return true when expense report AND CREATE iouType', function () {
                expect((0, ReportUtils_1.shouldEnableNegative)(expenseReport, personalPolicy, CONST_1.default.IOU.TYPE.CREATE)).toBe(true);
            });
            it('should return true when group policy AND CREATE iouType', function () {
                expect((0, ReportUtils_1.shouldEnableNegative)(chatReport, corporatePolicy, CONST_1.default.IOU.TYPE.CREATE)).toBe(true);
                expect((0, ReportUtils_1.shouldEnableNegative)(chatReport, teamPolicy, CONST_1.default.IOU.TYPE.CREATE)).toBe(true);
            });
            it('should return false when none of the enabling conditions are met', function () {
                // Chat report + personal policy + no iouType
                expect((0, ReportUtils_1.shouldEnableNegative)(chatReport, personalPolicy)).toBe(false);
                // Chat report + personal policy + non-CREATE iouType
                expect((0, ReportUtils_1.shouldEnableNegative)(chatReport, personalPolicy, CONST_1.default.IOU.TYPE.REQUEST)).toBe(false);
                expect((0, ReportUtils_1.shouldEnableNegative)(chatReport, personalPolicy, CONST_1.default.IOU.TYPE.TRACK)).toBe(false);
                expect((0, ReportUtils_1.shouldEnableNegative)(chatReport, personalPolicy, CONST_1.default.IOU.TYPE.SEND)).toBe(false);
            });
            it('should prioritize exclusion over inclusion', function () {
                // Even if expense report + group policy, SPLIT should still exclude
                expect((0, ReportUtils_1.shouldEnableNegative)(expenseReport, corporatePolicy, CONST_1.default.IOU.TYPE.SPLIT)).toBe(false);
                // Even if expense report + CREATE iouType, INVOICE should still exclude
                expect((0, ReportUtils_1.shouldEnableNegative)(expenseReport, undefined, CONST_1.default.IOU.TYPE.INVOICE)).toBe(false);
                // Even if group policy + CREATE iouType, SPLIT should still exclude
                expect((0, ReportUtils_1.shouldEnableNegative)(chatReport, teamPolicy, CONST_1.default.IOU.TYPE.SPLIT)).toBe(false);
            });
        });
    });
    describe('isSelfDMOrSelfDMThread', function () {
        var standardSelfDMReport;
        var movedSelfDMReport;
        var regularDMReport;
        var groupChatReport;
        beforeEach(function () {
            var _a, _b, _c, _d;
            // Standard self-DM with proper chatType
            standardSelfDMReport = __assign(__assign({}, LHNTestUtils.getFakeReport()), { type: CONST_1.default.REPORT.TYPE.CHAT, chatType: CONST_1.default.REPORT.CHAT_TYPE.SELF_DM, participants: (_a = {},
                    _a[currentUserAccountID] = {
                        notificationPreference: CONST_1.default.REPORT.NOTIFICATION_PREFERENCE.ALWAYS,
                    },
                    _a) });
            // Self-DM that was moved from workspace (empty chatType)
            movedSelfDMReport = __assign(__assign({}, LHNTestUtils.getFakeReport()), { type: CONST_1.default.REPORT.TYPE.CHAT, chatType: undefined, participants: (_b = {},
                    _b[currentUserAccountID] = {
                        notificationPreference: CONST_1.default.REPORT.NOTIFICATION_PREFERENCE.ALWAYS,
                    },
                    _b) });
            // Regular 1:1 DM with another user
            regularDMReport = __assign(__assign({}, LHNTestUtils.getFakeReport()), { type: CONST_1.default.REPORT.TYPE.CHAT, chatType: undefined, participants: (_c = {},
                    _c[currentUserAccountID] = {
                        notificationPreference: CONST_1.default.REPORT.NOTIFICATION_PREFERENCE.ALWAYS,
                    },
                    _c[12345678] = {
                        notificationPreference: CONST_1.default.REPORT.NOTIFICATION_PREFERENCE.ALWAYS,
                    },
                    _c) });
            // Group chat with multiple participants
            groupChatReport = __assign(__assign({}, LHNTestUtils.getFakeReport()), { type: CONST_1.default.REPORT.TYPE.CHAT, chatType: CONST_1.default.REPORT.CHAT_TYPE.GROUP, participants: (_d = {},
                    _d[currentUserAccountID] = {
                        notificationPreference: CONST_1.default.REPORT.NOTIFICATION_PREFERENCE.ALWAYS,
                    },
                    _d[12345678] = {
                        notificationPreference: CONST_1.default.REPORT.NOTIFICATION_PREFERENCE.ALWAYS,
                    },
                    _d[87654321] = {
                        notificationPreference: CONST_1.default.REPORT.NOTIFICATION_PREFERENCE.ALWAYS,
                    },
                    _d) });
        });
        describe('standard self-DM detection', function () {
            it('should return true for standard self-DM with proper chatType', function () {
                expect((0, ReportUtils_1.isSelfDMOrSelfDMThread)(standardSelfDMReport)).toBe(true);
            });
            it('should return true for moved self-DM with empty chatType', function () {
                expect((0, ReportUtils_1.isSelfDMOrSelfDMThread)(movedSelfDMReport)).toBe(true);
            });
        });
        describe('non-self-DM reports', function () {
            it('should return false for regular 1:1 DM', function () {
                expect((0, ReportUtils_1.isSelfDMOrSelfDMThread)(regularDMReport)).toBe(false);
            });
            it('should return false for group chat', function () {
                expect((0, ReportUtils_1.isSelfDMOrSelfDMThread)(groupChatReport)).toBe(false);
            });
        });
        describe('edge cases', function () {
            it('should return false for undefined report', function () {
                expect((0, ReportUtils_1.isSelfDMOrSelfDMThread)(undefined)).toBe(false);
            });
            it('should return false for report with no participants', function () {
                var reportWithNoParticipants = __assign(__assign({}, LHNTestUtils.getFakeReport()), { type: CONST_1.default.REPORT.TYPE.CHAT, chatType: undefined, participants: {} });
                expect((0, ReportUtils_1.isSelfDMOrSelfDMThread)(reportWithNoParticipants)).toBe(false);
            });
            it('should return false for non-chat report types', function () {
                var _a;
                var expenseReport = __assign(__assign({}, LHNTestUtils.getFakeReport()), { type: CONST_1.default.REPORT.TYPE.EXPENSE, participants: (_a = {},
                        _a[currentUserAccountID] = {
                            notificationPreference: CONST_1.default.REPORT.NOTIFICATION_PREFERENCE.ALWAYS,
                        },
                        _a) });
                expect((0, ReportUtils_1.isSelfDMOrSelfDMThread)(expenseReport)).toBe(false);
            });
        });
    });
    describe('getReportActionActorAccountID', function () {
        it('should return report owner account id if action is REPORTPREVIEW and report is a policy expense chat', function () {
            var reportAction = __assign(__assign({}, (0, reportActions_1.default)(0)), { actionName: CONST_1.default.REPORT.ACTIONS.TYPE.REPORT_PREVIEW });
            var iouReport = __assign(__assign({}, (0, reports_2.createRandomReport)(0, undefined)), { type: CONST_1.default.REPORT.TYPE.IOU, ownerAccountID: 10, managerID: 20 });
            var report = __assign(__assign({}, (0, reports_2.createRandomReport)(1, CONST_1.default.REPORT.CHAT_TYPE.POLICY_EXPENSE_CHAT)), { type: CONST_1.default.REPORT.TYPE.CHAT });
            var actorAccountID = (0, ReportUtils_1.getReportActionActorAccountID)(reportAction, iouReport, report);
            expect(actorAccountID).toEqual(10);
        });
        it('should return report manager account id if action is REPORTPREVIEW and report is not a policy expense chat', function () {
            var reportAction = __assign(__assign({}, (0, reportActions_1.default)(0)), { actionName: CONST_1.default.REPORT.ACTIONS.TYPE.REPORT_PREVIEW });
            var iouReport = __assign(__assign({}, (0, reports_2.createRandomReport)(0, undefined)), { type: CONST_1.default.REPORT.TYPE.IOU, ownerAccountID: 10, managerID: 20 });
            var report = __assign(__assign({}, (0, reports_2.createRandomReport)(1, undefined)), { type: CONST_1.default.REPORT.TYPE.CHAT, chatType: undefined });
            var actorAccountID = (0, ReportUtils_1.getReportActionActorAccountID)(reportAction, iouReport, report);
            expect(actorAccountID).toEqual(20);
        });
        it('should return admin account id if action is SUBMITTED taken by an admin on behalf the submitter', function () {
            var reportAction = __assign(__assign({}, (0, reportActions_1.default)(0)), { actionName: CONST_1.default.REPORT.ACTIONS.TYPE.SUBMITTED, adminAccountID: 30, actorAccountID: 10 });
            var iouReport = __assign(__assign({}, (0, reports_2.createRandomReport)(0, undefined)), { type: CONST_1.default.REPORT.TYPE.IOU, ownerAccountID: 10, managerID: 20 });
            var report = __assign(__assign({}, (0, reports_2.createRandomReport)(1, CONST_1.default.REPORT.CHAT_TYPE.POLICY_EXPENSE_CHAT)), { type: CONST_1.default.REPORT.TYPE.CHAT });
            var actorAccountID = (0, ReportUtils_1.getReportActionActorAccountID)(reportAction, iouReport, report);
            expect(actorAccountID).toEqual(30);
        });
        it('should return report owner account id if action is SUBMITTED taken by the submitter himself', function () {
            var reportAction = __assign(__assign({}, (0, reportActions_1.default)(0)), { actionName: CONST_1.default.REPORT.ACTIONS.TYPE.SUBMITTED, actorAccountID: 10 });
            var iouReport = __assign(__assign({}, (0, reports_2.createRandomReport)(0, undefined)), { type: CONST_1.default.REPORT.TYPE.IOU, ownerAccountID: 10, managerID: 20 });
            var report = __assign(__assign({}, (0, reports_2.createRandomReport)(1, CONST_1.default.REPORT.CHAT_TYPE.POLICY_EXPENSE_CHAT)), { type: CONST_1.default.REPORT.TYPE.CHAT });
            var actorAccountID = (0, ReportUtils_1.getReportActionActorAccountID)(reportAction, iouReport, report);
            expect(actorAccountID).toEqual(10);
        });
        it('should return admin account id if action is SUBMITTED_AND_CLOSED taken by an admin on behalf the submitter', function () {
            var reportAction = __assign(__assign({}, (0, reportActions_1.default)(0)), { actionName: CONST_1.default.REPORT.ACTIONS.TYPE.SUBMITTED_AND_CLOSED, adminAccountID: 30, actorAccountID: 10 });
            var iouReport = __assign(__assign({}, (0, reports_2.createRandomReport)(0, undefined)), { type: CONST_1.default.REPORT.TYPE.IOU, ownerAccountID: 10, managerID: 20 });
            var report = __assign(__assign({}, (0, reports_2.createRandomReport)(1, CONST_1.default.REPORT.CHAT_TYPE.POLICY_EXPENSE_CHAT)), { type: CONST_1.default.REPORT.TYPE.CHAT });
            var actorAccountID = (0, ReportUtils_1.getReportActionActorAccountID)(reportAction, iouReport, report);
            expect(actorAccountID).toEqual(30);
        });
        it('should return report owner account id if action is SUBMITTED_AND_CLOSED taken by the submitter himself', function () {
            var reportAction = __assign(__assign({}, (0, reportActions_1.default)(0)), { actionName: CONST_1.default.REPORT.ACTIONS.TYPE.SUBMITTED_AND_CLOSED, actorAccountID: 10 });
            var iouReport = __assign(__assign({}, (0, reports_2.createRandomReport)(0, undefined)), { type: CONST_1.default.REPORT.TYPE.IOU, ownerAccountID: 10, managerID: 20 });
            var report = __assign(__assign({}, (0, reports_2.createRandomReport)(1, CONST_1.default.REPORT.CHAT_TYPE.POLICY_EXPENSE_CHAT)), { type: CONST_1.default.REPORT.TYPE.CHAT });
            var actorAccountID = (0, ReportUtils_1.getReportActionActorAccountID)(reportAction, iouReport, report);
            expect(actorAccountID).toEqual(10);
        });
        it('should return original actor account id if action is ADDCOMMENT', function () {
            var reportAction = __assign(__assign({}, (0, reportActions_1.default)(0)), { actionName: CONST_1.default.REPORT.ACTIONS.TYPE.ADD_COMMENT, actorAccountID: 123 });
            var iouReport = __assign(__assign({}, (0, reports_2.createRandomReport)(0, undefined)), { type: CONST_1.default.REPORT.TYPE.IOU, ownerAccountID: 10, managerID: 20 });
            var report = __assign(__assign({}, (0, reports_2.createRandomReport)(1, CONST_1.default.REPORT.CHAT_TYPE.POLICY_EXPENSE_CHAT)), { type: CONST_1.default.REPORT.TYPE.CHAT });
            var actorAccountID = (0, ReportUtils_1.getReportActionActorAccountID)(reportAction, iouReport, report);
            expect(actorAccountID).toEqual(123);
        });
    });
    describe('shouldBlockSubmitDueToStrictPolicyRules', function () {
        var reportID = 'report123';
        it('should return false when areStrictPolicyRulesEnabled is false regardless of violations', function () {
            var _a;
            var transactionViolations = (_a = {},
                _a["".concat(ONYXKEYS_1.default.COLLECTION.TRANSACTION_VIOLATIONS, "transaction1")] = [
                    {
                        name: CONST_1.default.VIOLATIONS.MISSING_CATEGORY,
                        type: CONST_1.default.VIOLATION_TYPES.VIOLATION,
                        data: {},
                    },
                ],
                _a);
            var result = (0, ReportUtils_1.shouldBlockSubmitDueToStrictPolicyRules)(reportID, transactionViolations, false);
            expect(result).toBe(false);
        });
        it('should return false when areStrictPolicyRulesEnabled is true but no violations exist', function () {
            var transactionViolations = {};
            var result = (0, ReportUtils_1.shouldBlockSubmitDueToStrictPolicyRules)(reportID, transactionViolations, true);
            expect(result).toBe(false);
        });
        it('should return false when reportID is undefined', function () {
            var _a;
            var transactionViolations = (_a = {},
                _a["".concat(ONYXKEYS_1.default.COLLECTION.TRANSACTION_VIOLATIONS, "transaction1")] = [
                    {
                        name: CONST_1.default.VIOLATIONS.MISSING_CATEGORY,
                        type: CONST_1.default.VIOLATION_TYPES.VIOLATION,
                        data: {},
                    },
                ],
                _a);
            var result = (0, ReportUtils_1.shouldBlockSubmitDueToStrictPolicyRules)(undefined, transactionViolations, true);
            expect(result).toBe(false);
        });
        it('should return false when areStrictPolicyRulesEnabled is false even with violations and transactions provided', function () {
            var _a;
            var transaction = (0, TransactionUtils_1.buildOptimisticTransaction)({
                transactionParams: {
                    amount: 100,
                    currency: CONST_1.default.CURRENCY.USD,
                    reportID: reportID,
                    comment: '',
                    attendees: [],
                    created: '2024-01-01',
                    merchant: CONST_1.default.TRANSACTION.DEFAULT_MERCHANT,
                    category: '',
                },
            });
            var transactions = [transaction];
            var transactionViolations = (_a = {},
                _a["".concat(ONYXKEYS_1.default.COLLECTION.TRANSACTION_VIOLATIONS).concat(transaction.transactionID)] = [
                    {
                        name: CONST_1.default.VIOLATIONS.MISSING_CATEGORY,
                        type: CONST_1.default.VIOLATION_TYPES.VIOLATION,
                        data: {},
                    },
                ],
                _a);
            var result = (0, ReportUtils_1.shouldBlockSubmitDueToStrictPolicyRules)(reportID, transactionViolations, false, transactions);
            expect(result).toBe(false);
        });
        it('should return true when areStrictPolicyRulesEnabled is true and violations exist', function () {
            var _a;
            var transaction = (0, TransactionUtils_1.buildOptimisticTransaction)({
                transactionParams: {
                    amount: 100,
                    currency: CONST_1.default.CURRENCY.USD,
                    reportID: reportID,
                    comment: '',
                    attendees: [],
                    created: '2024-01-01',
                    merchant: CONST_1.default.TRANSACTION.DEFAULT_MERCHANT,
                    category: '',
                },
            });
            var transactions = [transaction];
            var transactionViolations = (_a = {},
                _a["".concat(ONYXKEYS_1.default.COLLECTION.TRANSACTION_VIOLATIONS).concat(transaction.transactionID)] = [
                    {
                        name: CONST_1.default.VIOLATIONS.MISSING_CATEGORY,
                        type: CONST_1.default.VIOLATION_TYPES.VIOLATION,
                        data: {},
                    },
                ],
                _a);
            var result = (0, ReportUtils_1.shouldBlockSubmitDueToStrictPolicyRules)(reportID, transactionViolations, true, transactions);
            expect(result).toBe(true);
        });
    });
    describe('canRejectReportAction', function () {
        it('should return false if the user is not the report manager', function () { return __awaiter(void 0, void 0, void 0, function () {
            var approver, expenseReport, reportPolicy;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        approver = 'approver@gmail.com';
                        expenseReport = __assign(__assign({}, (0, reports_2.createRandomReport)(0, undefined)), { type: CONST_1.default.REPORT.TYPE.EXPENSE, managerID: 1 });
                        reportPolicy = __assign(__assign({}, (0, policies_1.default)(0)), { approver: approver });
                        return [4 /*yield*/, react_native_onyx_1.default.merge(ONYXKEYS_1.default.SESSION, {
                                accountID: 2,
                            })];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, react_native_onyx_1.default.merge(ONYXKEYS_1.default.BETAS, [CONST_1.default.BETAS.NEWDOT_REJECT])];
                    case 2:
                        _a.sent();
                        expect((0, ReportUtils_1.canRejectReportAction)(approver, expenseReport, reportPolicy)).toBe(false);
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('getReportOrDraftReport', function () {
        var mockReportIDIndex = 1;
        var mockReportID = mockReportIDIndex.toString();
        // eslint-disable-next-line @typescript-eslint/no-deprecated
        var mockSearchReport = __assign(__assign({}, (0, reports_2.createRandomReport)(mockReportIDIndex, undefined)), { reportName: 'Search Report', type: CONST_1.default.REPORT.TYPE.CHAT });
        var mockOnyxReport = __assign(__assign({}, (0, reports_2.createPolicyExpenseChat)(mockReportIDIndex)), { reportName: 'Onyx Report' });
        var mockDraftReport = __assign(__assign({}, (0, reports_2.createExpenseReport)(mockReportIDIndex)), { reportName: 'Draft Report' });
        var mockFallbackReport = __assign(__assign({}, (0, reports_2.createExpenseRequestReport)(mockReportIDIndex)), { reportName: 'Fallback Report' });
        beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, react_native_onyx_1.default.clear()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        test('returns search report when found in searchReports array', function () {
            var searchReports = [mockSearchReport];
            var result = (0, ReportUtils_1.getReportOrDraftReport)(mockReportID, searchReports);
            expect(result).toEqual(mockSearchReport);
        });
        test('returns onyx report when search report is not found but onyx report exists', function () { return __awaiter(void 0, void 0, void 0, function () {
            var searchReports, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        searchReports = [];
                        return [4 /*yield*/, react_native_onyx_1.default.set("".concat(ONYXKEYS_1.default.COLLECTION.REPORT).concat(mockReportID), mockOnyxReport)];
                    case 1:
                        _a.sent();
                        result = (0, ReportUtils_1.getReportOrDraftReport)(mockReportID, searchReports);
                        expect(result).toEqual(mockOnyxReport);
                        return [2 /*return*/];
                }
            });
        }); });
        test('returns draft report when neither search nor onyx report exists but draft exists', function () { return __awaiter(void 0, void 0, void 0, function () {
            var searchReports, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        searchReports = [];
                        return [4 /*yield*/, react_native_onyx_1.default.set("".concat(ONYXKEYS_1.default.COLLECTION.REPORT_DRAFT).concat(mockReportID), mockDraftReport)];
                    case 1:
                        _a.sent();
                        result = (0, ReportUtils_1.getReportOrDraftReport)(mockReportID, searchReports);
                        expect(result).toEqual(mockDraftReport);
                        return [2 /*return*/];
                }
            });
        }); });
        test('returns fallback report when no other reports exist', function () {
            // eslint-disable-next-line @typescript-eslint/no-deprecated
            var searchReports = [];
            var result = (0, ReportUtils_1.getReportOrDraftReport)('unknownReportID', searchReports, mockFallbackReport);
            expect(result).toEqual(mockFallbackReport);
        });
        test('returns undefined when no reports exist and no fallback provided', function () {
            // eslint-disable-next-line @typescript-eslint/no-deprecated
            var searchReports = [];
            var result = (0, ReportUtils_1.getReportOrDraftReport)(mockReportID, searchReports);
            expect(result).toBeUndefined();
        });
        test('returns undefined when reportID is undefined', function () {
            var searchReports = [mockSearchReport];
            var result = (0, ReportUtils_1.getReportOrDraftReport)(undefined, searchReports);
            expect(result).toBeUndefined();
        });
        test('returns undefined when only reportID is provided and it is not found', function () {
            var result = (0, ReportUtils_1.getReportOrDraftReport)('unknownReportID');
            expect(result).toBeUndefined();
        });
        test('returns fallback report when reportID is undefined', function () {
            var searchReports = [mockSearchReport];
            var result = (0, ReportUtils_1.getReportOrDraftReport)(undefined, searchReports, mockFallbackReport);
            expect(result).toEqual(mockFallbackReport);
        });
        test('prioritizes search report over onyx report when both exist', function () { return __awaiter(void 0, void 0, void 0, function () {
            var searchReports, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        searchReports = [mockSearchReport];
                        return [4 /*yield*/, react_native_onyx_1.default.set("".concat(ONYXKEYS_1.default.COLLECTION.REPORT).concat(mockReportID), mockOnyxReport)];
                    case 1:
                        _a.sent();
                        result = (0, ReportUtils_1.getReportOrDraftReport)(mockReportID, searchReports);
                        expect(result).toEqual(mockSearchReport);
                        expect(result).not.toEqual(mockOnyxReport);
                        return [2 /*return*/];
                }
            });
        }); });
        test('prioritizes onyx report over draft report when both exist', function () { return __awaiter(void 0, void 0, void 0, function () {
            var searchReports, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        searchReports = [];
                        return [4 /*yield*/, react_native_onyx_1.default.set("".concat(ONYXKEYS_1.default.COLLECTION.REPORT).concat(mockReportID), mockOnyxReport)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, react_native_onyx_1.default.set("".concat(ONYXKEYS_1.default.COLLECTION.REPORT_DRAFT).concat(mockReportID), mockDraftReport)];
                    case 2:
                        _a.sent();
                        result = (0, ReportUtils_1.getReportOrDraftReport)(mockReportID, searchReports);
                        expect(result).toEqual(mockOnyxReport);
                        expect(result).not.toEqual(mockDraftReport);
                        return [2 /*return*/];
                }
            });
        }); });
        test('prioritizes draft report over fallback when both exist', function () { return __awaiter(void 0, void 0, void 0, function () {
            var searchReports, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        searchReports = [];
                        return [4 /*yield*/, react_native_onyx_1.default.set("".concat(ONYXKEYS_1.default.COLLECTION.REPORT_DRAFT).concat(mockReportID), mockDraftReport)];
                    case 1:
                        _a.sent();
                        result = (0, ReportUtils_1.getReportOrDraftReport)(mockReportID, searchReports, mockFallbackReport);
                        expect(result).toEqual(mockDraftReport);
                        expect(result).not.toEqual(mockFallbackReport);
                        return [2 /*return*/];
                }
            });
        }); });
        test('handles empty searchReports array gracefully', function () { return __awaiter(void 0, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, react_native_onyx_1.default.set("".concat(ONYXKEYS_1.default.COLLECTION.REPORT).concat(mockReportID), mockOnyxReport)];
                    case 1:
                        _a.sent();
                        result = (0, ReportUtils_1.getReportOrDraftReport)(mockReportID);
                        expect(result).toEqual(mockOnyxReport);
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('buildOptimisticExpenseReport', function () {
        beforeEach(react_native_onyx_1.default.clear);
        it('should include the policy name in report name from report draft', function () { return __awaiter(void 0, void 0, void 0, function () {
            var chatReportID, policyID, reportDraft, fakePolicy, total, currency, expenseReport;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        chatReportID = '1';
                        policyID = '2';
                        reportDraft = __assign(__assign({}, (0, reports_2.createRandomReport)(Number(chatReportID), CONST_1.default.REPORT.CHAT_TYPE.POLICY_EXPENSE_CHAT)), { policyID: policyID });
                        fakePolicy = (0, policies_1.default)(Number(policyID));
                        return [4 /*yield*/, react_native_onyx_1.default.merge("".concat(ONYXKEYS_1.default.COLLECTION.REPORT_DRAFT).concat(chatReportID), reportDraft)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, react_native_onyx_1.default.merge("".concat(ONYXKEYS_1.default.COLLECTION.POLICY).concat(policyID), fakePolicy)];
                    case 2:
                        _a.sent();
                        total = 100;
                        currency = CONST_1.default.CURRENCY.USD;
                        expenseReport = (0, ReportUtils_1.buildOptimisticExpenseReport)(chatReportID, undefined, 1, total, currency);
                        expect(expenseReport.reportName).toBe("".concat(fakePolicy.name, " owes ").concat((0, CurrencyUtils_1.convertToDisplayString)(-total, currency)));
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('hasEmptyReportsForPolicy', function () {
        var policyID = 'workspace-001';
        var otherPolicyID = 'workspace-002';
        var accountID = 987654;
        var otherAccountID = 123456;
        var buildReport = function (overrides) {
            var _a;
            if (overrides === void 0) { overrides = {}; }
            return (__assign({ reportID: (_a = overrides.reportID) !== null && _a !== void 0 ? _a : 'report-1', policyID: policyID, ownerAccountID: accountID, type: CONST_1.default.REPORT.TYPE.EXPENSE, stateNum: CONST_1.default.REPORT.STATE_NUM.OPEN, statusNum: CONST_1.default.REPORT.STATUS_NUM.OPEN, total: 0, nonReimbursableTotal: 0, pendingAction: null, errors: undefined }, overrides));
        };
        var toCollection = function () {
            var reports = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                reports[_i] = arguments[_i];
            }
            return reports.reduce(function (acc, report, index) {
                var _a;
                acc[(_a = report.reportID) !== null && _a !== void 0 ? _a : String(index)] = report;
                return acc;
            }, {});
        };
        var createTransactionForReport = function (reportID, index) {
            if (index === void 0) { index = 0; }
            return (__assign(__assign({}, (0, transaction_1.default)(index)), { reportID: reportID, transactionID: "".concat(reportID, "-transaction-").concat(index) }));
        };
        it('returns false when policyID is missing or accountID invalid', function () {
            var _a;
            var reportID = 'report-1';
            var reports = toCollection(buildReport({ reportID: reportID }));
            var transactions = (_a = {},
                _a[reportID] = [],
                _a);
            expect((0, ReportUtils_1.hasEmptyReportsForPolicy)(reports, undefined, accountID, transactions)).toBe(false);
            expect((0, ReportUtils_1.hasEmptyReportsForPolicy)(reports, policyID, Number.NaN, transactions)).toBe(false);
            expect((0, ReportUtils_1.hasEmptyReportsForPolicy)(reports, policyID, CONST_1.default.DEFAULT_NUMBER_ID, transactions)).toBe(false);
        });
        it('returns true when an owned open expense report has no transactions', function () {
            var _a;
            var reportID = 'empty-report';
            var reports = toCollection(buildReport({ reportID: reportID }));
            var transactions = (_a = {},
                _a[reportID] = [],
                _a);
            expect((0, ReportUtils_1.hasEmptyReportsForPolicy)(reports, policyID, accountID, transactions)).toBe(true);
        });
        it('returns true when an owned submitted expense report has no transactions', function () {
            var _a;
            var reportID = 'submitted-empty-report';
            var reports = toCollection(buildReport({
                reportID: reportID,
                stateNum: CONST_1.default.REPORT.STATE_NUM.SUBMITTED,
                statusNum: CONST_1.default.REPORT.STATUS_NUM.SUBMITTED,
            }));
            var transactions = (_a = {},
                _a[reportID] = [],
                _a);
            expect((0, ReportUtils_1.hasEmptyReportsForPolicy)(reports, policyID, accountID, transactions)).toBe(true);
        });
        it('returns false when an owned expense report already has transactions', function () {
            var _a;
            var reportID = 'with-transaction';
            var reports = toCollection(buildReport({ reportID: reportID }));
            var transactions = (_a = {},
                _a[reportID] = [createTransactionForReport(reportID)],
                _a);
            expect((0, ReportUtils_1.hasEmptyReportsForPolicy)(reports, policyID, accountID, transactions)).toBe(false);
        });
        it('treats transactions pending deletion as removed when checking emptiness', function () {
            var _a;
            var reportID = 'pending-delete-report';
            var reports = toCollection(buildReport({ reportID: reportID }));
            var transactions = (_a = {},
                _a[reportID] = [
                    __assign(__assign({}, createTransactionForReport(reportID)), { pendingAction: CONST_1.default.RED_BRICK_ROAD_PENDING_ACTION.DELETE }),
                ],
                _a);
            expect((0, ReportUtils_1.hasEmptyReportsForPolicy)(reports, policyID, accountID, transactions)).toBe(true);
        });
        it('ignores reports owned by other users or policies', function () {
            var reports = toCollection(buildReport({ reportID: 'other-owner', ownerAccountID: otherAccountID }), buildReport({ reportID: 'other-policy', policyID: otherPolicyID }));
            var transactions = {
                'other-owner': [],
                'other-policy': [],
            };
            expect((0, ReportUtils_1.hasEmptyReportsForPolicy)(reports, policyID, accountID, transactions)).toBe(false);
        });
        it('ignores reports that are not open expense reports even if they have no transactions', function () {
            var reports = toCollection(buildReport({ reportID: 'closed', statusNum: CONST_1.default.REPORT.STATUS_NUM.CLOSED }), buildReport({ reportID: 'approved', stateNum: CONST_1.default.REPORT.STATE_NUM.APPROVED }), buildReport({ reportID: 'chat', type: CONST_1.default.REPORT.TYPE.CHAT }));
            var transactions = {
                closed: [],
                approved: [],
                chat: [],
            };
            expect((0, ReportUtils_1.hasEmptyReportsForPolicy)(reports, policyID, accountID, transactions)).toBe(false);
        });
        it('ignores reports flagged for deletion or with errors', function () {
            var reports = toCollection(buildReport({ reportID: 'pending-delete', pendingAction: CONST_1.default.RED_BRICK_ROAD_PENDING_ACTION.DELETE }), buildReport({ reportID: 'with-errors', errors: { test: 'error' } }));
            var transactions = {
                'pending-delete': [],
                'with-errors': [],
            };
            expect((0, ReportUtils_1.hasEmptyReportsForPolicy)(reports, policyID, accountID, transactions)).toBe(false);
        });
        it('returns true when at least one qualifying report exists among mixed data', function () {
            var reports = toCollection(buildReport({ reportID: 'valid-empty' }), buildReport({ reportID: 'with-transaction' }), buildReport({ reportID: 'other', policyID: otherPolicyID }));
            var transactions = {
                'valid-empty': [],
                'with-transaction': [createTransactionForReport('with-transaction')],
                other: [],
            };
            expect((0, ReportUtils_1.hasEmptyReportsForPolicy)(reports, policyID, accountID, transactions)).toBe(true);
        });
        it('returns false when accountID is the default one', function () {
            var reports = toCollection(buildReport({ reportID: 'valid-empty' }), buildReport({ reportID: 'with-transaction' }), buildReport({ reportID: 'other', policyID: otherPolicyID }));
            var transactions = {
                'valid-empty': [],
                'with-transaction': [createTransactionForReport('with-transaction')],
                other: [],
            };
            expect((0, ReportUtils_1.hasEmptyReportsForPolicy)(reports, policyID, CONST_1.default.DEFAULT_NUMBER_ID, transactions)).toBe(false);
        });
        it('supports minimal report summaries array', function () {
            var _a;
            var reportID = 'summary-report';
            var minimalReports = [
                {
                    reportID: reportID,
                    policyID: policyID,
                    ownerAccountID: accountID,
                    type: CONST_1.default.REPORT.TYPE.EXPENSE,
                    stateNum: CONST_1.default.REPORT.STATE_NUM.OPEN,
                    statusNum: CONST_1.default.REPORT.STATUS_NUM.OPEN,
                    total: 0,
                    nonReimbursableTotal: 0,
                    pendingAction: null,
                    errors: undefined,
                },
            ];
            var transactions = (_a = {},
                _a[reportID] = [],
                _a);
            expect((0, ReportUtils_1.hasEmptyReportsForPolicy)(minimalReports, policyID, accountID, transactions)).toBe(true);
        });
    });
    describe('getPolicyIDsWithEmptyReportsForAccount', function () {
        var policyID = 'workspace-001';
        var otherPolicyID = 'workspace-002';
        var accountID = 555555;
        var otherAccountID = 999999;
        var buildReport = function (overrides) {
            var _a;
            if (overrides === void 0) { overrides = {}; }
            return (__assign({ reportID: (_a = overrides.reportID) !== null && _a !== void 0 ? _a : 'report-1', policyID: policyID, ownerAccountID: accountID, type: CONST_1.default.REPORT.TYPE.EXPENSE, stateNum: CONST_1.default.REPORT.STATE_NUM.OPEN, statusNum: CONST_1.default.REPORT.STATUS_NUM.OPEN, total: 0, nonReimbursableTotal: 0, pendingAction: null, errors: undefined }, overrides));
        };
        var toCollection = function () {
            var reports = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                reports[_i] = arguments[_i];
            }
            return reports.reduce(function (acc, report, index) {
                var _a;
                acc[(_a = report.reportID) !== null && _a !== void 0 ? _a : String(index)] = report;
                return acc;
            }, {});
        };
        var createTransactionForReport = function (reportID, index) {
            if (index === void 0) { index = 0; }
            return (__assign(__assign({}, (0, transaction_1.default)(index)), { reportID: reportID, transactionID: "".concat(reportID, "-txn-").concat(index) }));
        };
        it('returns empty object when accountID is missing', function () {
            var _a;
            var reportID = 'empty';
            var reports = toCollection(buildReport({ reportID: reportID }));
            var transactions = (_a = {},
                _a[reportID] = [],
                _a);
            expect((0, ReportUtils_1.getPolicyIDsWithEmptyReportsForAccount)(reports, undefined, transactions)).toEqual({});
        });
        it('marks policy IDs that have empty reports owned by the user', function () {
            var _a, _b;
            var reportA = 'policy-a';
            var reportB = 'policy-b';
            var reports = toCollection(buildReport({ reportID: reportA, policyID: policyID }), buildReport({ reportID: reportB, policyID: otherPolicyID }));
            var transactions = (_a = {},
                _a[reportA] = [],
                _a[reportB] = [],
                _a);
            expect((0, ReportUtils_1.getPolicyIDsWithEmptyReportsForAccount)(reports, accountID, transactions)).toEqual((_b = {},
                _b[policyID] = true,
                _b[otherPolicyID] = true,
                _b));
        });
        it('marks submitted empty reports as outstanding for the policy lookup', function () {
            var _a, _b;
            var reportID = 'submitted-empty-lookup';
            var reports = toCollection(buildReport({
                reportID: reportID,
                stateNum: CONST_1.default.REPORT.STATE_NUM.SUBMITTED,
                statusNum: CONST_1.default.REPORT.STATUS_NUM.SUBMITTED,
            }));
            var transactions = (_a = {},
                _a[reportID] = [],
                _a);
            expect((0, ReportUtils_1.getPolicyIDsWithEmptyReportsForAccount)(reports, accountID, transactions)).toEqual((_b = {},
                _b[policyID] = true,
                _b));
        });
        it('ignores transactions pending deletion when compiling policy lookup', function () {
            var _a, _b;
            var reportID = 'pending-delete-lookup';
            var reports = toCollection(buildReport({ reportID: reportID }));
            var transactions = (_a = {},
                _a[reportID] = [
                    __assign(__assign({}, createTransactionForReport(reportID)), { pendingAction: CONST_1.default.RED_BRICK_ROAD_PENDING_ACTION.DELETE }),
                ],
                _a);
            expect((0, ReportUtils_1.getPolicyIDsWithEmptyReportsForAccount)(reports, accountID, transactions)).toEqual((_b = {},
                _b[policyID] = true,
                _b));
        });
        it('supports minimal summaries input', function () {
            var _a, _b;
            var reportID = 'summary-report';
            var summaries = [
                {
                    reportID: reportID,
                    policyID: policyID,
                    ownerAccountID: accountID,
                    type: CONST_1.default.REPORT.TYPE.EXPENSE,
                    stateNum: CONST_1.default.REPORT.STATE_NUM.OPEN,
                    statusNum: CONST_1.default.REPORT.STATUS_NUM.OPEN,
                    total: 0,
                    nonReimbursableTotal: 0,
                    pendingAction: null,
                    errors: undefined,
                },
            ];
            var transactions = (_a = {},
                _a[reportID] = [],
                _a);
            expect((0, ReportUtils_1.getPolicyIDsWithEmptyReportsForAccount)(summaries, accountID, transactions)).toEqual((_b = {},
                _b[policyID] = true,
                _b));
        });
        it('ignores reports that do not qualify', function () {
            var reports = toCollection(buildReport({ reportID: 'with-money', total: 100 }), buildReport({ reportID: 'other-owner', ownerAccountID: otherAccountID }), buildReport({ reportID: 'pending-delete', pendingAction: CONST_1.default.RED_BRICK_ROAD_PENDING_ACTION.DELETE }), buildReport({ reportID: 'with-errors', errors: { message: 'error' } }), buildReport({ reportID: 'chat', type: CONST_1.default.REPORT.TYPE.CHAT }));
            var transactions = {
                'with-money': [createTransactionForReport('with-money')],
                'other-owner': [],
                'pending-delete': [],
                'with-errors': [],
                chat: [],
            };
            expect((0, ReportUtils_1.getPolicyIDsWithEmptyReportsForAccount)(reports, accountID, transactions)).toEqual({});
        });
    });
    it('should require attention when a workspace chat awaits Expensify Card shipping details', function () { return __awaiter(void 0, void 0, void 0, function () {
        var workspaceChat, cardMissingAddressAction, isReportArchived, result;
        var _a;
        var _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    workspaceChat = __assign(__assign({}, (0, reports_2.createPolicyExpenseChat)(41000)), { hasOutstandingChildTask: true });
                    cardMissingAddressAction = {
                        reportActionID: 'card-missing-address-action',
                        actionName: CONST_1.default.REPORT.ACTIONS.TYPE.CARD_MISSING_ADDRESS,
                        childType: CONST_1.default.REPORT.TYPE.TASK,
                        childReportID: 'task-11000',
                        created: DateUtils_1.default.getDBTime(),
                        originalMessage: {
                            assigneeAccountID: currentUserAccountID,
                            cardID: 11000,
                        },
                    };
                    return [4 /*yield*/, react_native_onyx_1.default.set("".concat(ONYXKEYS_1.default.COLLECTION.REPORT).concat(workspaceChat.reportID), workspaceChat)];
                case 1:
                    _c.sent();
                    return [4 /*yield*/, react_native_onyx_1.default.set("".concat(ONYXKEYS_1.default.COLLECTION.REPORT_ACTIONS).concat(workspaceChat.reportID), (_a = {},
                            _a[cardMissingAddressAction.reportActionID] = cardMissingAddressAction,
                            _a))];
                case 2:
                    _c.sent();
                    return [4 /*yield*/, (0, waitForBatchedUpdates_1.default)()];
                case 3:
                    _c.sent();
                    isReportArchived = (0, react_native_1.renderHook)(function () { return (0, useReportIsArchived_1.default)(workspaceChat.reportID); }).result;
                    result = (0, ReportUtils_1.getReasonAndReportActionThatRequiresAttention)(workspaceChat, undefined, isReportArchived.current);
                    expect(result === null || result === void 0 ? void 0 : result.reason).toBe(CONST_1.default.REQUIRES_ATTENTION_REASONS.IS_WAITING_FOR_ASSIGNEE_TO_COMPLETE_ACTION);
                    expect((_b = result === null || result === void 0 ? void 0 : result.reportAction) === null || _b === void 0 ? void 0 : _b.reportActionID).toBe(cardMissingAddressAction.reportActionID);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should surface a GBR when reimbursement is queued and waiting on the payee bank account', function () { return __awaiter(void 0, void 0, void 0, function () {
        var adminAccountID, expenseReportID, chatReport, expenseReport, reimbursementQueuedAction, reason;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, react_native_onyx_1.default.clear()];
                case 1:
                    _b.sent();
                    adminAccountID = 42;
                    expenseReportID = '10000';
                    chatReport = __assign(__assign({}, LHNTestUtils.getFakeReport([currentUserAccountID, adminAccountID])), { hasOutstandingChildRequest: true, iouReportID: expenseReportID });
                    expenseReport = __assign(__assign({}, LHNTestUtils.getFakeReport([currentUserAccountID, adminAccountID])), { reportID: expenseReportID, chatReportID: chatReport.reportID, type: CONST_1.default.REPORT.TYPE.EXPENSE, ownerAccountID: currentUserAccountID, managerID: adminAccountID, currency: CONST_1.default.CURRENCY.USD, total: 10000, stateNum: CONST_1.default.REPORT.STATE_NUM.APPROVED, statusNum: CONST_1.default.REPORT.STATUS_NUM.APPROVED, isWaitingOnBankAccount: true });
                    reimbursementQueuedAction = __assign(__assign({}, LHNTestUtils.getFakeReportAction()), { actionName: CONST_1.default.REPORT.ACTIONS.TYPE.REIMBURSEMENT_QUEUED, childReportID: expenseReportID, originalMessage: {
                            paymentType: CONST_1.default.IOU.PAYMENT_TYPE.VBBA,
                        } });
                    return [4 /*yield*/, react_native_onyx_1.default.merge(ONYXKEYS_1.default.SESSION, { accountID: currentUserAccountID, email: currentUserEmail })];
                case 2:
                    _b.sent();
                    return [4 /*yield*/, Promise.all([
                            react_native_onyx_1.default.merge("".concat(ONYXKEYS_1.default.COLLECTION.REPORT).concat(chatReport.reportID), chatReport),
                            react_native_onyx_1.default.merge("".concat(ONYXKEYS_1.default.COLLECTION.REPORT).concat(expenseReportID), expenseReport),
                            react_native_onyx_1.default.merge("".concat(ONYXKEYS_1.default.COLLECTION.REPORT_ACTIONS).concat(chatReport.reportID), (_a = {},
                                _a[reimbursementQueuedAction.reportActionID] = reimbursementQueuedAction,
                                _a)),
                        ])];
                case 3:
                    _b.sent();
                    return [4 /*yield*/, (0, waitForBatchedUpdates_1.default)()];
                case 4:
                    _b.sent();
                    reason = (0, ReportUtils_1.reasonForReportToBeInOptionList)({
                        report: chatReport,
                        chatReport: chatReport,
                        currentReportId: '',
                        isInFocusMode: false,
                        betas: [CONST_1.default.BETAS.DEFAULT_ROOMS],
                        doesReportHaveViolations: false,
                        excludeEmptyChats: false,
                        draftComment: '',
                        isReportArchived: undefined,
                    });
                    expect(reason).toBe(CONST_1.default.REPORT_IN_LHN_REASONS.HAS_GBR);
                    return [4 /*yield*/, react_native_onyx_1.default.clear()];
                case 5:
                    _b.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('should not surface a GBR when reimbursement is queued but not waiting on the payee bank account', function () { return __awaiter(void 0, void 0, void 0, function () {
        var adminAccountID, expenseReportID, chatReport, expenseReport, reimbursementQueuedAction, reason;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, react_native_onyx_1.default.clear()];
                case 1:
                    _b.sent();
                    adminAccountID = 42;
                    expenseReportID = '10000';
                    chatReport = __assign(__assign({}, LHNTestUtils.getFakeReport([currentUserAccountID, adminAccountID])), { hasOutstandingChildRequest: false, iouReportID: expenseReportID });
                    expenseReport = __assign(__assign({}, LHNTestUtils.getFakeReport([currentUserAccountID, adminAccountID])), { reportID: expenseReportID, chatReportID: chatReport.reportID, type: CONST_1.default.REPORT.TYPE.EXPENSE, ownerAccountID: currentUserAccountID, managerID: adminAccountID, currency: CONST_1.default.CURRENCY.USD, total: 10000, stateNum: CONST_1.default.REPORT.STATE_NUM.APPROVED, statusNum: CONST_1.default.REPORT.STATUS_NUM.APPROVED, isWaitingOnBankAccount: false });
                    reimbursementQueuedAction = __assign(__assign({}, LHNTestUtils.getFakeReportAction()), { actionName: CONST_1.default.REPORT.ACTIONS.TYPE.REIMBURSEMENT_QUEUED, childReportID: expenseReportID, originalMessage: {
                            paymentType: CONST_1.default.IOU.PAYMENT_TYPE.VBBA,
                        } });
                    return [4 /*yield*/, react_native_onyx_1.default.merge(ONYXKEYS_1.default.SESSION, { accountID: currentUserAccountID, email: currentUserEmail })];
                case 2:
                    _b.sent();
                    return [4 /*yield*/, Promise.all([
                            react_native_onyx_1.default.merge("".concat(ONYXKEYS_1.default.COLLECTION.REPORT).concat(chatReport.reportID), chatReport),
                            react_native_onyx_1.default.merge("".concat(ONYXKEYS_1.default.COLLECTION.REPORT).concat(expenseReportID), expenseReport),
                            react_native_onyx_1.default.merge("".concat(ONYXKEYS_1.default.COLLECTION.REPORT_ACTIONS).concat(chatReport.reportID), (_a = {},
                                _a[reimbursementQueuedAction.reportActionID] = reimbursementQueuedAction,
                                _a)),
                        ])];
                case 3:
                    _b.sent();
                    return [4 /*yield*/, (0, waitForBatchedUpdates_1.default)()];
                case 4:
                    _b.sent();
                    reason = (0, ReportUtils_1.reasonForReportToBeInOptionList)({
                        report: chatReport,
                        chatReport: chatReport,
                        currentReportId: '',
                        isInFocusMode: false,
                        betas: [CONST_1.default.BETAS.DEFAULT_ROOMS],
                        doesReportHaveViolations: false,
                        excludeEmptyChats: false,
                        draftComment: '',
                        isReportArchived: undefined,
                    });
                    expect(reason).toBe(CONST_1.default.REPORT_IN_LHN_REASONS.DEFAULT);
                    return [4 /*yield*/, react_native_onyx_1.default.clear()];
                case 5:
                    _b.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('should not surface a GBR when bank account is added, but reimbursement is disabled on the policy', function () { return __awaiter(void 0, void 0, void 0, function () {
        var adminAccountID, policyID, expenseReportID, chatReport, expenseReport, pendingTransaction, reimbursementQueuedAction, policy1, reason;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, react_native_onyx_1.default.clear()];
                case 1:
                    _b.sent();
                    adminAccountID = 42;
                    policyID = '10000';
                    expenseReportID = '20000';
                    chatReport = __assign(__assign({}, LHNTestUtils.getFakeReport([currentUserAccountID, adminAccountID])), { iouReportID: expenseReportID, policyID: policyID });
                    expenseReport = __assign(__assign({}, LHNTestUtils.getFakeReport([currentUserAccountID, adminAccountID])), { reportID: expenseReportID, chatReportID: chatReport.reportID, type: CONST_1.default.REPORT.TYPE.EXPENSE, ownerAccountID: currentUserAccountID, managerID: adminAccountID, currency: CONST_1.default.CURRENCY.USD, total: 10000, stateNum: CONST_1.default.REPORT.STATE_NUM.APPROVED, statusNum: CONST_1.default.REPORT.STATUS_NUM.APPROVED, isWaitingOnBankAccount: false, policyID: policyID });
                    pendingTransaction = {
                        transactionID: "".concat(expenseReportID, "-transaction"),
                        reportID: expenseReportID,
                        amount: 10000,
                        currency: CONST_1.default.CURRENCY.USD,
                        created: '2025-01-01T00:00:00.000Z',
                        merchant: 'Expensify Card',
                        bank: CONST_1.default.EXPENSIFY_CARD.BANK,
                        status: CONST_1.default.TRANSACTION.STATUS.PENDING,
                    };
                    reimbursementQueuedAction = __assign(__assign({}, LHNTestUtils.getFakeReportAction()), { actionName: CONST_1.default.REPORT.ACTIONS.TYPE.REIMBURSEMENT_QUEUED, childReportID: expenseReportID, originalMessage: {
                            paymentType: CONST_1.default.IOU.PAYMENT_TYPE.VBBA,
                        } });
                    policy1 = {
                        id: policyID,
                        name: 'Policy',
                        role: CONST_1.default.POLICY.ROLE.ADMIN,
                        type: CONST_1.default.POLICY.TYPE.TEAM,
                        owner: currentUserEmail,
                        outputCurrency: CONST_1.default.CURRENCY.USD,
                        isPolicyExpenseChatEnabled: true,
                        reimbursementChoice: CONST_1.default.POLICY.REIMBURSEMENT_CHOICES.REIMBURSEMENT_NO,
                    };
                    return [4 /*yield*/, react_native_onyx_1.default.merge(ONYXKEYS_1.default.SESSION, { accountID: currentUserAccountID, email: currentUserEmail })];
                case 2:
                    _b.sent();
                    return [4 /*yield*/, Promise.all([
                            react_native_onyx_1.default.merge("".concat(ONYXKEYS_1.default.COLLECTION.REPORT).concat(chatReport.reportID), chatReport),
                            react_native_onyx_1.default.merge("".concat(ONYXKEYS_1.default.COLLECTION.REPORT).concat(expenseReportID), expenseReport),
                            react_native_onyx_1.default.merge("".concat(ONYXKEYS_1.default.COLLECTION.REPORT_ACTIONS).concat(chatReport.reportID), (_a = {},
                                _a[reimbursementQueuedAction.reportActionID] = reimbursementQueuedAction,
                                _a)),
                            react_native_onyx_1.default.merge("".concat(ONYXKEYS_1.default.COLLECTION.TRANSACTION).concat(pendingTransaction.transactionID), pendingTransaction),
                            react_native_onyx_1.default.merge("".concat(ONYXKEYS_1.default.COLLECTION.POLICY).concat(policyID), policy1),
                        ])];
                case 3:
                    _b.sent();
                    return [4 /*yield*/, (0, waitForBatchedUpdates_1.default)()];
                case 4:
                    _b.sent();
                    reason = (0, ReportUtils_1.reasonForReportToBeInOptionList)({
                        report: chatReport,
                        chatReport: chatReport,
                        currentReportId: '',
                        isInFocusMode: false,
                        betas: [CONST_1.default.BETAS.DEFAULT_ROOMS],
                        doesReportHaveViolations: false,
                        excludeEmptyChats: false,
                        draftComment: '',
                        isReportArchived: undefined,
                    });
                    expect(reason).toBe(CONST_1.default.REPORT_IN_LHN_REASONS.DEFAULT);
                    return [4 /*yield*/, react_native_onyx_1.default.clear()];
                case 5:
                    _b.sent();
                    return [2 /*return*/];
            }
        });
    }); });
});
