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
var react_native_onyx_1 = require("react-native-onyx");
var ReportTitleUtils_1 = require("@libs/ReportTitleUtils");
// eslint-disable-next-line no-restricted-syntax -- disabled because we need ReportUtils to mock
var ReportUtils = require("@libs/ReportUtils");
var CONST_1 = require("@src/CONST");
var ONYXKEYS_1 = require("@src/ONYXKEYS");
// Mock dependencies
jest.mock('@libs/ReportUtils', function () { return ({
    getTitleReportField: jest.fn(),
    isChatReport: jest.fn(),
}); });
jest.mock('@libs/Permissions', function () { return ({
    isBetaEnabled: jest.fn().mockReturnValue(true),
}); });
var mockedReportUtils = ReportUtils;
describe('ReportTitleUtils', function () {
    beforeAll(function () { return __awaiter(void 0, void 0, void 0, function () {
        var mergedCollection;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    mergedCollection = {};
                    mergedCollection["".concat(ONYXKEYS_1.default.COLLECTION.REPORT_NAME_VALUE_PAIRS, "12345")] = {
                        // eslint-disable-next-line @typescript-eslint/naming-convention
                        expensify_text_title: {
                            defaultValue: 'Report {report:total}',
                        },
                    };
                    return [4 /*yield*/, react_native_onyx_1.default.merge(ONYXKEYS_1.default.COLLECTION.REPORT_NAME_VALUE_PAIRS, mergedCollection)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    beforeEach(function () {
        jest.clearAllMocks();
    });
    describe('getTitleFieldFromRNVP', function () {
        var mockReportID = '12345';
        var mockTitleField = {
            defaultValue: 'Report {report:total}',
        };
        it('should return title field when RNVP exists with title field', function () {
            var result = (0, ReportTitleUtils_1.getTitleFieldFromRNVP)(mockReportID);
            expect(result).toEqual(mockTitleField);
        });
        it('should return undefined when RNVP is undefined', function () {
            var result = (0, ReportTitleUtils_1.getTitleFieldFromRNVP)('55555');
            expect(result).toBeUndefined();
        });
    });
    describe('updateTitleFieldToMatchPolicy', function () {
        var mockReportID = '12345';
        var mockTitleField = {
            defaultValue: 'Test report Title',
        };
        it('should return optimistic update when valid inputs provided', function () {
            var mockPolicy = {
                id: 'policy123',
                fieldList: {
                    // eslint-disable-next-line @typescript-eslint/naming-convention
                    text_title: mockTitleField,
                },
            };
            mockedReportUtils.getTitleReportField.mockReturnValue(mockTitleField);
            var result = (0, ReportTitleUtils_1.updateTitleFieldToMatchPolicy)(mockReportID, mockPolicy);
            expect(mockedReportUtils.getTitleReportField).toHaveBeenCalledWith(mockPolicy.fieldList);
            expect(result).toHaveLength(1);
            expect(result.at(0)).toEqual({
                onyxMethod: react_native_onyx_1.default.METHOD.MERGE,
                key: "".concat(ONYXKEYS_1.default.COLLECTION.REPORT_NAME_VALUE_PAIRS).concat(mockReportID),
                value: {
                    // eslint-disable-next-line @typescript-eslint/naming-convention
                    expensify_text_title: mockTitleField,
                },
            });
        });
        it('should return empty array when policy is undefined', function () {
            var result = (0, ReportTitleUtils_1.updateTitleFieldToMatchPolicy)(mockReportID, undefined);
            expect(result).toEqual([]);
            expect(mockedReportUtils.getTitleReportField).not.toHaveBeenCalled();
        });
    });
    describe('removeTitleFieldFromReport', function () {
        var mockReportID = '12345';
        it('should return optimistic update with null value for valid reportID', function () {
            var result = (0, ReportTitleUtils_1.removeTitleFieldFromReport)(mockReportID);
            expect(result).toHaveLength(1);
            expect(result.at(0)).toEqual({
                onyxMethod: react_native_onyx_1.default.METHOD.MERGE,
                key: "".concat(ONYXKEYS_1.default.COLLECTION.REPORT_NAME_VALUE_PAIRS).concat(mockReportID),
                value: {
                    // eslint-disable-next-line @typescript-eslint/naming-convention
                    expensify_text_title: null,
                },
            });
        });
    });
    describe('shouldUpdateTitleField', function () {
        var mockReportID = '12345';
        it('should return false when report is chat report', function () {
            var mockReport = {
                reportID: mockReportID,
                type: CONST_1.default.REPORT.TYPE.CHAT,
            };
            mockedReportUtils.isChatReport.mockReturnValue(true);
            var result = (0, ReportTitleUtils_1.shouldUpdateTitleField)(mockReport);
            expect(mockedReportUtils.isChatReport).toHaveBeenCalledWith(mockReport);
            expect(result).toBe(false);
        });
        it('should return false when report has no title field in RNVP', function () {
            var mockReport = {
                reportID: '5555',
                type: CONST_1.default.REPORT.TYPE.EXPENSE,
            };
            mockedReportUtils.isChatReport.mockReturnValue(false);
            var result = (0, ReportTitleUtils_1.shouldUpdateTitleField)(mockReport);
            expect(result).toBe(false);
        });
        it('should return true when non-chat report has title field', function () {
            var mockReport = {
                reportID: mockReportID,
                type: CONST_1.default.REPORT.TYPE.EXPENSE,
            };
            mockedReportUtils.isChatReport.mockReturnValue(false);
            var result = (0, ReportTitleUtils_1.shouldUpdateTitleField)(mockReport);
            expect(result).toBe(true);
        });
    });
});
