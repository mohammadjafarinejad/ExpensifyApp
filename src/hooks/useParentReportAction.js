"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ReportAction_1 = require("@selectors/ReportAction");
var react_1 = require("react");
var getNonEmptyStringOnyxID_1 = require("@libs/getNonEmptyStringOnyxID");
var ONYXKEYS_1 = require("@src/ONYXKEYS");
var useOnyx_1 = require("./useOnyx");
function useParentReportAction(report) {
    var getParentReportAction = (0, react_1.useCallback)(function (parentReportActions) { return (0, ReportAction_1.getParentReportActionSelector)(parentReportActions, report === null || report === void 0 ? void 0 : report.parentReportActionID); }, [report === null || report === void 0 ? void 0 : report.parentReportActionID]);
    var parentReportAction = (0, useOnyx_1.default)("".concat(ONYXKEYS_1.default.COLLECTION.REPORT_ACTIONS).concat((0, getNonEmptyStringOnyxID_1.default)(report === null || report === void 0 ? void 0 : report.parentReportID)), {
        canEvict: false,
        canBeMissing: true,
        selector: getParentReportAction,
    }, [getParentReportAction])[0];
    return parentReportAction;
}
exports.default = useParentReportAction;
