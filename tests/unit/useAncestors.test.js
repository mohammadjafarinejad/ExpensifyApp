"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
var react_native_1 = require("@testing-library/react-native");
var react_native_onyx_1 = require("react-native-onyx");
var useAncestors_1 = require("@hooks/useAncestors");
var DateUtils_1 = require("@libs/DateUtils");
var CONST_1 = require("@src/CONST");
var ONYXKEYS_1 = require("@src/ONYXKEYS");
var waitForBatchedUpdates_1 = require("../utils/waitForBatchedUpdates");
var numberOfMockReports = 11;
var mockReports = {};
var mockReportActions = {};
var parentReportID;
var parentReportActionID;
for (var reportNum = 1; reportNum <= numberOfMockReports; reportNum++) {
    var reportID = "".concat(reportNum);
    var report = {
        reportID: reportID,
        parentReportID: parentReportID,
        parentReportActionID: parentReportActionID,
    };
    var reportAction = {
        reportID: reportID,
        parentReportID: parentReportID,
        reportActionID: "".concat(reportNum),
        actionName: CONST_1.default.REPORT.ACTIONS.TYPE.ADD_COMMENT,
        created: DateUtils_1.default.getDBTime(),
    };
    var reportActions = (_a = {},
        _a[reportAction.reportActionID] = reportAction,
        _a);
    mockReports["".concat(ONYXKEYS_1.default.COLLECTION.REPORT).concat(reportID)] = report;
    mockReportActions["".concat(ONYXKEYS_1.default.COLLECTION.REPORT_ACTIONS).concat(reportID)] = reportActions;
    parentReportID = reportID;
    parentReportActionID = reportAction.reportActionID;
}
describe('useAncestors', function () {
    beforeAll(function () {
        var _a;
        react_native_onyx_1.default.multiSet((_a = {},
            _a[ONYXKEYS_1.default.COLLECTION.REPORT] = mockReports,
            _a[ONYXKEYS_1.default.COLLECTION.REPORT_ACTIONS] = mockReportActions,
            _a));
        return (0, waitForBatchedUpdates_1.default)();
    });
    afterAll(react_native_onyx_1.default.clear);
    test('returns correct ancestor reports and actions', function () {
        var _a, _b, _c, _d, _e, _f;
        var reportNum = 8;
        var mockReport = mockReports["".concat(ONYXKEYS_1.default.COLLECTION.REPORT).concat(reportNum)];
        var ancestors = (0, react_native_1.renderHook)(function () { return (0, useAncestors_1.default)(mockReport); }).result.current;
        // Check the oldest ancestor (should be reportID 1)
        var _g = (_a = ancestors.at(0)) !== null && _a !== void 0 ? _a : {}, oldestAncestorReport = _g.report, oldestAncestorReportAction = _g.reportAction;
        expect(oldestAncestorReport).toEqual(mockReports["".concat(ONYXKEYS_1.default.COLLECTION.REPORT, "1")]);
        expect(oldestAncestorReportAction).toEqual((_b = mockReportActions === null || mockReportActions === void 0 ? void 0 : mockReportActions["".concat(ONYXKEYS_1.default.COLLECTION.REPORT_ACTIONS, "1")]) === null || _b === void 0 ? void 0 : _b['1']);
        reportNum -= 1; // 8->7
        // Check the youngest ancestor (should be reportID 7)
        var _h = (_c = ancestors.at(-1)) !== null && _c !== void 0 ? _c : {}, youngestAncestorReport = _h.report, youngestAncestorReportAction = _h.reportAction;
        expect(youngestAncestorReport).toEqual(mockReports["".concat(ONYXKEYS_1.default.COLLECTION.REPORT).concat(reportNum)]);
        expect(youngestAncestorReportAction).toEqual((_d = mockReportActions === null || mockReportActions === void 0 ? void 0 : mockReportActions["".concat(ONYXKEYS_1.default.COLLECTION.REPORT_ACTIONS).concat(reportNum)]) === null || _d === void 0 ? void 0 : _d["".concat(reportNum)]);
        // Check the rest of the ancestors
        while (reportNum > 2) {
            reportNum -= 1;
            var _j = (_e = ancestors.at(reportNum - 1)) !== null && _e !== void 0 ? _e : {}, ancestorReport = _j.report, ancestorReportAction = _j.reportAction;
            expect(ancestorReport).toEqual(mockReports["".concat(ONYXKEYS_1.default.COLLECTION.REPORT).concat(reportNum)]);
            expect(ancestorReportAction).toEqual((_f = mockReportActions === null || mockReportActions === void 0 ? void 0 : mockReportActions["".concat(ONYXKEYS_1.default.COLLECTION.REPORT_ACTIONS).concat(reportNum)]) === null || _f === void 0 ? void 0 : _f["".concat(reportNum)]);
        }
    });
    test('if no ancestor reports', function () {
        var mockReport = mockReports["".concat(ONYXKEYS_1.default.COLLECTION.REPORT, "1")]; // First report, should have no ancestors
        var ancestors = (0, react_native_1.renderHook)(function () { return (0, useAncestors_1.default)(mockReport); }).result.current;
        expect(ancestors).toHaveLength(0);
    });
    test('if report is empty', function () {
        var emptyReport = { reportID: '' };
        var ancestors = (0, react_native_1.renderHook)(function () { return (0, useAncestors_1.default)(emptyReport); }).result.current;
        expect(ancestors).toHaveLength(0);
    });
    test('if report is non-existent', function () {
        var nonExistentReport = {
            reportID: 'non-existent',
        };
        var ancestors = (0, react_native_1.renderHook)(function () { return (0, useAncestors_1.default)(nonExistentReport); }).result.current;
        expect(ancestors).toHaveLength(0);
    });
    test('if report is undefined', function () {
        var ancestors = (0, react_native_1.renderHook)(function () { return (0, useAncestors_1.default)(undefined); }).result.current;
        expect(ancestors).toHaveLength(0);
    });
});
