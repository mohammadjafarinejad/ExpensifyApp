"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ReportActionsUtils_1 = require("@libs/ReportActionsUtils");
var ONYXKEYS_1 = require("@src/ONYXKEYS");
var useOnyx_1 = require("./useOnyx");
var useReportIsArchived_1 = require("./useReportIsArchived");
function useGetIOUReportFromReportAction(reportAction) {
    var _a, _b;
    var iouReportID = (0, ReportActionsUtils_1.isMoneyRequestAction)(reportAction) ? (_a = (0, ReportActionsUtils_1.getOriginalMessage)(reportAction)) === null || _a === void 0 ? void 0 : _a.IOUReportID : undefined;
    var iouReport = ((_b = (0, useOnyx_1.default)("".concat(ONYXKEYS_1.default.COLLECTION.REPORT).concat(iouReportID), { canBeMissing: true })) !== null && _b !== void 0 ? _b : null)[0];
    var isChatIOUReportArchived = (0, useReportIsArchived_1.default)(iouReportID);
    var chatReport = (0, useOnyx_1.default)("".concat(ONYXKEYS_1.default.COLLECTION.REPORT).concat(iouReport === null || iouReport === void 0 ? void 0 : iouReport.chatReportID), { canBeMissing: true })[0];
    return { iouReport: iouReport, chatReport: chatReport, isChatIOUReportArchived: isChatIOUReportArchived };
}
exports.default = useGetIOUReportFromReportAction;
