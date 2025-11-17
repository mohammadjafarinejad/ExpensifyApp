"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var useCurrentUserPersonalDetails_1 = require("@hooks/useCurrentUserPersonalDetails");
var Navigation_1 = require("@libs/Navigation/Navigation");
var Report_1 = require("@userActions/Report");
var ROUTES_1 = require("@src/ROUTES");
var BaseShareLogList_1 = require("./BaseShareLogList");
function ShareLogList(_a) {
    var logSource = _a.logSource;
    var personalDetail = (0, useCurrentUserPersonalDetails_1.default)();
    var onAttachLogToReport = function (reportID, filename) {
        if (!reportID || !logSource) {
            return;
        }
        var src = "file://".concat(logSource);
        (0, Report_1.addAttachmentWithComment)(reportID, reportID, { name: filename, source: src, uri: src, type: 'text/plain' }, undefined, personalDetail.timezone);
        var routeToNavigate = ROUTES_1.default.REPORT_WITH_ID.getRoute(reportID);
        Navigation_1.default.navigate(routeToNavigate);
    };
    return <BaseShareLogList_1.default onAttachLogToReport={onAttachLogToReport}/>;
}
exports.default = ShareLogList;
