"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var VerifyAccountPageBase_1 = require("@pages/settings/VerifyAccountPageBase");
var ROUTES_1 = require("@src/ROUTES");
function MoneyRequestStepConfirmationVerifyAccountPage(_a) {
    var route = _a.route;
    return (<VerifyAccountPageBase_1.default navigateBackTo={ROUTES_1.default.MONEY_REQUEST_STEP_CONFIRMATION.getRoute(route.params.action, route.params.iouType, route.params.transactionID, route.params.reportID)}/>);
}
MoneyRequestStepConfirmationVerifyAccountPage.displayName = 'MoneyRequestStepConfirmationVerifyAccountPage';
exports.default = MoneyRequestStepConfirmationVerifyAccountPage;
