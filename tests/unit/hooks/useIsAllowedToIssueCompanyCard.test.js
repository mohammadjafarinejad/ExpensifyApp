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
var useCardFeeds_1 = require("@hooks/useCardFeeds");
var useIsAllowedToIssueCompanyCard_1 = require("@hooks/useIsAllowedToIssueCompanyCard");
var CONST_1 = require("@src/CONST");
var ONYXKEYS_1 = require("@src/ONYXKEYS");
var policies_1 = require("../../utils/collections/policies");
var mockPolicyID = '123456';
var mockPolicy = __assign(__assign({}, (0, policies_1.default)(Number(mockPolicyID), CONST_1.default.POLICY.TYPE.TEAM, 'TestPolicy')), { policyID: mockPolicyID });
jest.mock('@hooks/useCardFeeds', function () { return ({
    // eslint-disable-next-line @typescript-eslint/naming-convention
    __esModule: true,
    default: jest.fn(),
}); });
describe('useIsAllowedToIssueCompanyCard', function () {
    beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, react_native_onyx_1.default.merge("".concat(ONYXKEYS_1.default.COLLECTION.POLICY).concat(mockPolicy === null || mockPolicy === void 0 ? void 0 : mockPolicy.policyID), mockPolicy)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, react_native_onyx_1.default.merge("".concat(ONYXKEYS_1.default.COLLECTION.LAST_SELECTED_FEED).concat(mockPolicy === null || mockPolicy === void 0 ? void 0 : mockPolicy.policyID), 'vcf')];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('should return true if domain feed and access is granted', function () { return __awaiter(void 0, void 0, void 0, function () {
        var domainID, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    domainID = 19475968;
                    return [4 /*yield*/, react_native_onyx_1.default.merge("".concat(ONYXKEYS_1.default.COLLECTION.SHARED_NVP_PRIVATE_ADMIN_ACCESS).concat(domainID), true)];
                case 1:
                    _a.sent();
                    useCardFeeds_1.default.mockReturnValue([
                        {
                            settings: {
                                companyCards: {
                                    vcf: {
                                        asrEnabled: false,
                                        country: 'US',
                                        domainID: domainID,
                                        forceReimbursable: 'force_no',
                                        liabilityType: 'corporate',
                                        preferredPolicy: '135CA2196CD21C88',
                                        reportTitleFormat: '',
                                        shouldApplyCashbackToBill: true,
                                        statementPeriodEndDay: 'LAST_DAY_OF_MONTH',
                                        uploadLayoutSettings: [],
                                    },
                                },
                                companyCardNicknames: {},
                                oAuthAccountDetails: {},
                            },
                        },
                        { status: 'loaded' },
                    ]);
                    result = (0, react_native_1.renderHook)(function () { return (0, useIsAllowedToIssueCompanyCard_1.default)({ policyID: mockPolicyID }); }).result;
                    expect(result === null || result === void 0 ? void 0 : result.current).toBe(true);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should return false if domain feed and access is not granted', function () { return __awaiter(void 0, void 0, void 0, function () {
        var domainID, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    domainID = 19475968;
                    return [4 /*yield*/, react_native_onyx_1.default.merge("".concat(ONYXKEYS_1.default.COLLECTION.SHARED_NVP_PRIVATE_ADMIN_ACCESS).concat(domainID), false)];
                case 1:
                    _a.sent();
                    useCardFeeds_1.default.mockReturnValue([
                        {
                            settings: {
                                companyCards: {
                                    vcf: {
                                        asrEnabled: false,
                                        country: 'US',
                                        domainID: domainID,
                                        forceReimbursable: 'force_no',
                                        liabilityType: 'corporate',
                                        preferredPolicy: '135CA2196CD21C88',
                                        reportTitleFormat: '',
                                        shouldApplyCashbackToBill: true,
                                        statementPeriodEndDay: 'LAST_DAY_OF_MONTH',
                                        uploadLayoutSettings: [],
                                    },
                                },
                                companyCardNicknames: {},
                                oAuthAccountDetails: {},
                            },
                        },
                        { status: 'loaded' },
                    ]);
                    result = (0, react_native_1.renderHook)(function () { return (0, useIsAllowedToIssueCompanyCard_1.default)({ policyID: mockPolicyID }); }).result;
                    expect(result === null || result === void 0 ? void 0 : result.current).toBe(false);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should return true if workspace feed and user is admin', function () { return __awaiter(void 0, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, react_native_onyx_1.default.merge("".concat(ONYXKEYS_1.default.COLLECTION.POLICY).concat(mockPolicy === null || mockPolicy === void 0 ? void 0 : mockPolicy.policyID), {
                        role: CONST_1.default.POLICY.ROLE.ADMIN,
                    })];
                case 1:
                    _a.sent();
                    useCardFeeds_1.default.mockReturnValue([
                        {
                            settings: {
                                companyCards: {
                                    vcf: {
                                        asrEnabled: false,
                                        country: 'US',
                                        forceReimbursable: 'force_no',
                                        liabilityType: 'corporate',
                                        preferredPolicy: '135CA2196CD21C88',
                                        reportTitleFormat: '',
                                        shouldApplyCashbackToBill: true,
                                        statementPeriodEndDay: 'LAST_DAY_OF_MONTH',
                                        uploadLayoutSettings: [],
                                    },
                                },
                                companyCardNicknames: {},
                                oAuthAccountDetails: {},
                            },
                        },
                        { status: 'loaded' },
                    ]);
                    result = (0, react_native_1.renderHook)(function () { return (0, useIsAllowedToIssueCompanyCard_1.default)({ policyID: mockPolicyID }); }).result;
                    expect(result === null || result === void 0 ? void 0 : result.current).toBe(true);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should return false if workspace feed and user is not an admin', function () { return __awaiter(void 0, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, react_native_onyx_1.default.merge("".concat(ONYXKEYS_1.default.COLLECTION.POLICY).concat(mockPolicy === null || mockPolicy === void 0 ? void 0 : mockPolicy.policyID), {
                        role: CONST_1.default.POLICY.ROLE.USER,
                    })];
                case 1:
                    _a.sent();
                    useCardFeeds_1.default.mockReturnValue([
                        {
                            settings: {
                                companyCards: {
                                    vcf: {
                                        asrEnabled: false,
                                        country: 'US',
                                        forceReimbursable: 'force_no',
                                        liabilityType: 'corporate',
                                        preferredPolicy: '135CA2196CD21C88',
                                        reportTitleFormat: '',
                                        shouldApplyCashbackToBill: true,
                                        statementPeriodEndDay: 'LAST_DAY_OF_MONTH',
                                        uploadLayoutSettings: [],
                                    },
                                },
                                companyCardNicknames: {},
                                oAuthAccountDetails: {},
                            },
                        },
                        { status: 'loaded' },
                    ]);
                    result = (0, react_native_1.renderHook)(function () { return (0, useIsAllowedToIssueCompanyCard_1.default)({ policyID: mockPolicyID }); }).result;
                    expect(result === null || result === void 0 ? void 0 : result.current).toBe(false);
                    return [2 /*return*/];
            }
        });
    }); });
});
