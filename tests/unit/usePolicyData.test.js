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
var _a, _b, _c, _d, _e, _f, _g, _h, _j;
var _k, _l;
Object.defineProperty(exports, "__esModule", { value: true });
var react_native_1 = require("@testing-library/react-native");
var react_native_onyx_1 = require("react-native-onyx");
var OnyxListItemProvider_1 = require("@components/OnyxListItemProvider");
var usePolicyData_1 = require("@hooks/usePolicyData");
var OnyxDerived_1 = require("@libs/actions/OnyxDerived");
var ONYXKEYS_1 = require("@src/ONYXKEYS");
var actions_1 = require("../../__mocks__/reportData/actions");
var reports_1 = require("../../__mocks__/reportData/reports");
var transactions_1 = require("../../__mocks__/reportData/transactions");
var policies_1 = require("../utils/collections/policies");
var policyCategory_1 = require("../utils/collections/policyCategory");
var policyTags_1 = require("../utils/collections/policyTags");
var reports_2 = require("../utils/collections/reports");
var waitForBatchedUpdates_1 = require("../utils/waitForBatchedUpdates");
// Mock data id
var mockPolicy = (0, policies_1.default)(0);
var mockPolicyTagLists = (0, policyTags_1.default)('Tags', 8);
var mockPolicyCategories = (0, policyCategory_1.default)(8);
var mockIOUReport = __assign(__assign({}, reports_1.iouReportR14932), { policyID: mockPolicy.id });
var mockAdminsRoom = __assign(__assign({}, (0, reports_2.createAdminRoom)(1234)), { policyID: mockPolicy.id });
var mockAnnounceRoom = __assign(__assign({}, (0, reports_2.createAnnounceRoom)(5678)), { policyID: mockPolicy.id });
var mockTransaction = __assign(__assign({}, transactions_1.transactionR14932), { reportID: mockIOUReport.reportID, category: (_k = Object.values(mockPolicyCategories).at(0)) === null || _k === void 0 ? void 0 : _k.name, tag: (_l = Object.values(mockPolicyTagLists).at(0)) === null || _l === void 0 ? void 0 : _l.name });
var expectedTransactionsAndViolations = (_a = {},
    _a[mockIOUReport.reportID] = {
        transactions: (_b = {},
            _b["".concat(ONYXKEYS_1.default.COLLECTION.TRANSACTION).concat(mockTransaction.transactionID)] = mockTransaction,
            _b),
        violations: {},
    },
    _a);
var reportsCollection = (_c = {},
    _c["".concat(ONYXKEYS_1.default.COLLECTION.REPORT).concat(mockIOUReport.reportID)] = mockIOUReport,
    _c["".concat(ONYXKEYS_1.default.COLLECTION.REPORT).concat(mockAdminsRoom.reportID)] = mockAdminsRoom,
    _c["".concat(ONYXKEYS_1.default.COLLECTION.REPORT).concat(mockAnnounceRoom.reportID)] = mockAnnounceRoom,
    _c);
var reportActionsCollection = (_d = {},
    _d["".concat(ONYXKEYS_1.default.COLLECTION.REPORT_ACTIONS).concat(mockIOUReport.reportID)] = (_e = {},
        _e[actions_1.actionR14932.reportActionID] = actions_1.actionR14932,
        _e),
    _d);
var policiesCollection = (_f = {},
    _f["".concat(ONYXKEYS_1.default.COLLECTION.POLICY).concat(mockPolicy.id)] = mockPolicy,
    _f);
var policiesTagListsCollection = (_g = {},
    _g["".concat(ONYXKEYS_1.default.COLLECTION.POLICY_TAGS).concat(mockPolicy.id)] = mockPolicyTagLists,
    _g);
var policiesCategoriesCollection = (_h = {},
    _h["".concat(ONYXKEYS_1.default.COLLECTION.POLICY_CATEGORIES).concat(mockPolicy.id)] = mockPolicyCategories,
    _h);
var transactionsCollection = (_j = {},
    _j["".concat(ONYXKEYS_1.default.COLLECTION.TRANSACTION).concat(mockTransaction.transactionID)] = mockTransaction,
    _j);
describe('usePolicyData', function () {
    beforeAll(function () {
        react_native_onyx_1.default.init({ keys: ONYXKEYS_1.default });
        (0, OnyxDerived_1.default)();
    });
    beforeEach(function () {
        react_native_onyx_1.default.clear();
        return (0, waitForBatchedUpdates_1.default)();
    });
    test('returns data given a policy ID that exists in the onyx', function () { return __awaiter(void 0, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, react_native_onyx_1.default.multiSet(__assign(__assign(__assign(__assign(__assign(__assign({}, reportsCollection), reportActionsCollection), policiesCollection), policiesTagListsCollection), policiesCategoriesCollection), transactionsCollection))];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, (0, waitForBatchedUpdates_1.default)()];
                case 2:
                    _a.sent();
                    result = (0, react_native_1.renderHook)(function () { return (0, usePolicyData_1.default)(mockPolicy.id); }, { wrapper: OnyxListItemProvider_1.default }).result;
                    return [4 /*yield*/, (0, waitForBatchedUpdates_1.default)()];
                case 3:
                    _a.sent();
                    expect(result.current.policy).toEqual(mockPolicy);
                    expect(result.current.tags).toEqual(mockPolicyTagLists);
                    expect(result.current.categories).toEqual(mockPolicyCategories);
                    expect(result.current.reports).toHaveLength(1);
                    expect(result.current.reports.at(0)).toEqual(mockIOUReport);
                    expect(result.current.transactionsAndViolations).toEqual(expectedTransactionsAndViolations);
                    return [2 /*return*/];
            }
        });
    }); });
    test('returns default empty values when policy ID does not exist in the onyx', function () {
        var result = (0, react_native_1.renderHook)(function () { return (0, usePolicyData_1.default)('non_existent_policy_id'); }, { wrapper: OnyxListItemProvider_1.default }).result;
        expect(result.current.reports).toEqual([]);
        expect(result.current.tags).toEqual({});
        expect(result.current.categories).toEqual({});
        expect(result.current.policy).toBeUndefined();
        expect(result.current.transactionsAndViolations).toEqual({});
    });
    test('returns default empty values when policyID is undefined', function () {
        var result = (0, react_native_1.renderHook)(function () { return (0, usePolicyData_1.default)(undefined); }, { wrapper: OnyxListItemProvider_1.default }).result;
        expect(result.current.reports).toEqual([]);
        expect(result.current.tags).toEqual({});
        expect(result.current.categories).toEqual({});
        expect(result.current.policy).toBeUndefined();
        expect(result.current.transactionsAndViolations).toEqual({});
    });
});
