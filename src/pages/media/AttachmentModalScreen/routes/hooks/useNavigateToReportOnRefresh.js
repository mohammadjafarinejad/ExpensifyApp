"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var Navigation_1 = require("@libs/Navigation/Navigation");
var ROUTES_1 = require("@src/ROUTES");
// If the user refreshes during the send attachment flow, we need to navigate back to the report or home
function useNavigateToReportOnRefresh(_a) {
    var source = _a.source, file = _a.file, reportID = _a.reportID;
    (0, react_1.useEffect)(function () {
        if (!!source || !!file) {
            return;
        }
        Navigation_1.default.isNavigationReady().then(function () {
            if (reportID) {
                Navigation_1.default.goBack(ROUTES_1.default.REPORT_WITH_ID.getRoute(reportID));
            }
            else {
                Navigation_1.default.goBack(ROUTES_1.default.HOME);
            }
        });
    }, [source, reportID, file]);
}
exports.default = useNavigateToReportOnRefresh;
