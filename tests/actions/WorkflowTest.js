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
var react_native_onyx_1 = require("react-native-onyx");
var WorkflowUtils_1 = require("@libs/WorkflowUtils");
var OnyxUpdateManager_1 = require("@src/libs/actions/OnyxUpdateManager");
var Policy_1 = require("@src/libs/actions/Policy/Policy");
var Workflow_1 = require("@src/libs/actions/Workflow");
var WorkflowUtils_2 = require("@src/libs/WorkflowUtils");
var ONYXKEYS_1 = require("@src/ONYXKEYS");
var policies_1 = require("../utils/collections/policies");
var TestHelper_1 = require("../utils/TestHelper");
var waitForBatchedUpdates_1 = require("../utils/waitForBatchedUpdates");
jest.mock('@src/libs/WorkflowUtils', function () {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    var actual = jest.requireActual('@src/libs/WorkflowUtils');
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return __assign(__assign({}, actual), { calculateApprovers: jest.fn() });
});
var calculateApproversMock = WorkflowUtils_2.calculateApprovers;
(0, OnyxUpdateManager_1.default)();
var employee1Email = 'test1@gmail.com';
var employee2Email = 'test2@gmail.com';
var employee3Email = 'test3@gmail.com';
var ownerEmail = 'owner@gmail.com';
describe('actions/Workflow', function () {
    function getApprovalWorkflowState() {
        return new Promise(function (resolve) {
            var connection = react_native_onyx_1.default.connect({
                key: ONYXKEYS_1.default.APPROVAL_WORKFLOW,
                callback: function (workflow) {
                    if (!workflow) {
                        return;
                    }
                    react_native_onyx_1.default.disconnect(connection);
                    resolve(workflow);
                },
            });
        });
    }
    beforeAll(function () {
        react_native_onyx_1.default.init({
            keys: ONYXKEYS_1.default,
        });
    });
    var mockFetch;
    beforeEach(function () {
        global.fetch = (0, TestHelper_1.getGlobalFetchMock)();
        mockFetch = fetch;
        calculateApproversMock.mockClear();
        calculateApproversMock.mockImplementation(function () { return []; });
        return react_native_onyx_1.default.clear().then(waitForBatchedUpdates_1.default);
    });
    describe('clearApprovalWorkflowApprover', function () {
        it('should clear an approver', function () { return __awaiter(void 0, void 0, void 0, function () {
            var currentApprovalWorkflow, approvalWorkflow;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        mockFetch.pause();
                        currentApprovalWorkflow = __assign(__assign({}, WorkflowUtils_1.INITIAL_APPROVAL_WORKFLOW), { approvers: [
                                {
                                    email: 'approver1@example.com',
                                    avatar: 'avatar1',
                                    displayName: 'Approver 1',
                                },
                            ] });
                        react_native_onyx_1.default.merge(ONYXKEYS_1.default.APPROVAL_WORKFLOW, currentApprovalWorkflow);
                        return [4 /*yield*/, (0, waitForBatchedUpdates_1.default)()];
                    case 1:
                        _a.sent();
                        (0, Workflow_1.clearApprovalWorkflowApprover)({ approverIndex: 0, currentApprovalWorkflow: currentApprovalWorkflow });
                        return [4 /*yield*/, (0, waitForBatchedUpdates_1.default)()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, getApprovalWorkflowState()];
                    case 3:
                        approvalWorkflow = _a.sent();
                        expect(approvalWorkflow === null || approvalWorkflow === void 0 ? void 0 : approvalWorkflow.approvers).toEqual([]);
                        expect(approvalWorkflow === null || approvalWorkflow === void 0 ? void 0 : approvalWorkflow.errors).toBeUndefined();
                        return [4 /*yield*/, mockFetch.resume()];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, (0, waitForBatchedUpdates_1.default)()];
                    case 5:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('setApprovalWorkflowApprover', function () {
        it('should add an approver at an empty index', function () { return __awaiter(void 0, void 0, void 0, function () {
            var policyID, newApprover, approverIndex, currentApprovalWorkflow, personalDetailsByEmail, fakePolicy, approvalWorkflow;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        mockFetch.pause();
                        policyID = (0, Policy_1.generatePolicyID)();
                        newApprover = {
                            email: 'newapprover@example.com',
                            displayName: 'New Approver',
                        };
                        approverIndex = 0;
                        currentApprovalWorkflow = __assign(__assign({}, WorkflowUtils_1.INITIAL_APPROVAL_WORKFLOW), { approvers: [], errors: undefined });
                        react_native_onyx_1.default.merge(ONYXKEYS_1.default.APPROVAL_WORKFLOW, currentApprovalWorkflow);
                        personalDetailsByEmail = (_a = {},
                            _a[newApprover.email] = {
                                login: newApprover.email,
                                displayName: newApprover.displayName,
                                avatar: newApprover.avatar,
                                accountID: 1,
                            },
                            _a);
                        fakePolicy = __assign(__assign({}, (0, policies_1.default)(1)), { id: policyID, employeeList: {} });
                        react_native_onyx_1.default.set("".concat(ONYXKEYS_1.default.COLLECTION.POLICY).concat(policyID), fakePolicy);
                        return [4 /*yield*/, (0, waitForBatchedUpdates_1.default)()];
                    case 1:
                        _b.sent();
                        (0, Workflow_1.setApprovalWorkflowApprover)({ approver: newApprover, approverIndex: approverIndex, policy: fakePolicy, currentApprovalWorkflow: currentApprovalWorkflow, personalDetailsByEmail: personalDetailsByEmail });
                        return [4 /*yield*/, (0, waitForBatchedUpdates_1.default)()];
                    case 2:
                        _b.sent();
                        return [4 /*yield*/, getApprovalWorkflowState()];
                    case 3:
                        approvalWorkflow = _b.sent();
                        expect(approvalWorkflow === null || approvalWorkflow === void 0 ? void 0 : approvalWorkflow.approvers).toEqual([__assign(__assign({}, newApprover), { isCircularReference: false })]);
                        expect(approvalWorkflow === null || approvalWorkflow === void 0 ? void 0 : approvalWorkflow.errors).toEqual({});
                        expect(calculateApproversMock).not.toHaveBeenCalled();
                        return [4 /*yield*/, mockFetch.resume()];
                    case 4:
                        _b.sent();
                        return [4 /*yield*/, (0, waitForBatchedUpdates_1.default)()];
                    case 5:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('createApprovalWorkflow', function () {
        it('should clear pendingFields when the API is success', function () { return __awaiter(void 0, void 0, void 0, function () {
            var policy, approvalWorkflow, updatedPolicy;
            var _a;
            var _b, _c, _d, _e;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0:
                        mockFetch.pause();
                        policy = {
                            id: '123456789',
                            name: "Mkzie2+bnmsn@gmail.com's Workspace",
                            role: 'admin',
                            type: 'corporate',
                            owner: ownerEmail,
                            employeeList: (_a = {},
                                _a[ownerEmail] = {
                                    email: ownerEmail,
                                    forwardsTo: '',
                                    role: 'admin',
                                    submitsTo: ownerEmail,
                                },
                                _a[employee1Email] = {
                                    email: employee1Email,
                                    forwardsTo: '',
                                    role: 'user',
                                    submitsTo: ownerEmail,
                                },
                                _a[employee2Email] = {
                                    email: employee2Email,
                                    role: 'user',
                                    submitsTo: ownerEmail,
                                    forwardsTo: '',
                                },
                                _a[employee3Email] = {
                                    email: employee3Email,
                                    role: 'user',
                                    submitsTo: ownerEmail,
                                    forwardsTo: '',
                                },
                                _a),
                        };
                        approvalWorkflow = {
                            members: [
                                {
                                    displayName: employee1Email,
                                    email: employee1Email,
                                },
                            ],
                            approvers: [
                                {
                                    email: employee1Email,
                                    displayName: employee1Email,
                                    isCircularReference: false,
                                },
                                {
                                    email: employee2Email,
                                    displayName: employee2Email,
                                    isCircularReference: false,
                                },
                            ],
                            availableMembers: [
                                {
                                    email: ownerEmail,
                                    displayName: ownerEmail,
                                },
                                {
                                    email: employee1Email,
                                    displayName: employee1Email,
                                },
                                {
                                    email: employee2Email,
                                    displayName: employee2Email,
                                },
                                {
                                    email: employee3Email,
                                    displayName: employee3Email,
                                },
                            ],
                            usedApproverEmails: [ownerEmail],
                            isDefault: false,
                            action: 'create',
                            originalApprovers: [],
                        };
                        return [4 /*yield*/, react_native_onyx_1.default.set("".concat(ONYXKEYS_1.default.COLLECTION.POLICY).concat(policy.id), policy)];
                    case 1:
                        _f.sent();
                        return [4 /*yield*/, react_native_onyx_1.default.merge(ONYXKEYS_1.default.SESSION, { authToken: '123456789' })];
                    case 2:
                        _f.sent();
                        return [4 /*yield*/, (0, waitForBatchedUpdates_1.default)()];
                    case 3:
                        _f.sent();
                        (0, Workflow_1.createApprovalWorkflow)(approvalWorkflow, policy);
                        return [4 /*yield*/, mockFetch.resume()];
                    case 4:
                        _f.sent();
                        return [4 /*yield*/, (0, TestHelper_1.getOnyxData)({
                                key: "".concat(ONYXKEYS_1.default.COLLECTION.POLICY).concat(policy.id),
                                callback: function (val) { return (updatedPolicy = val); },
                            })];
                    case 5:
                        _f.sent();
                        expect((_c = (_b = updatedPolicy === null || updatedPolicy === void 0 ? void 0 : updatedPolicy.employeeList) === null || _b === void 0 ? void 0 : _b[employee1Email]) === null || _c === void 0 ? void 0 : _c.pendingFields).toBeUndefined();
                        expect((_e = (_d = updatedPolicy === null || updatedPolicy === void 0 ? void 0 : updatedPolicy.employeeList) === null || _d === void 0 ? void 0 : _d[employee2Email]) === null || _e === void 0 ? void 0 : _e.pendingFields).toBeUndefined();
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
