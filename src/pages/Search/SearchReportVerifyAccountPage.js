"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var VerifyAccountPageBase_1 = require("@pages/settings/VerifyAccountPageBase");
var ROUTES_1 = require("@src/ROUTES");
function SearchReportVerifyAccountPage(_a) {
    var route = _a.route;
    return <VerifyAccountPageBase_1.default navigateBackTo={ROUTES_1.default.SEARCH_REPORT.getRoute({ reportID: route.params.reportID })}/>;
}
SearchReportVerifyAccountPage.displayName = 'SearchReportVerifyAccountPage';
exports.default = SearchReportVerifyAccountPage;
