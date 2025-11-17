"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var VerifyAccountPageBase_1 = require("@pages/settings/VerifyAccountPageBase");
var ROUTES_1 = require("@src/ROUTES");
function ReportVerifyAccountPage(_a) {
    var route = _a.route;
    return <VerifyAccountPageBase_1.default navigateBackTo={ROUTES_1.default.REPORT_WITH_ID.getRoute(route.params.reportID)}/>;
}
ReportVerifyAccountPage.displayName = 'ReportVerifyAccountPage';
exports.default = ReportVerifyAccountPage;
