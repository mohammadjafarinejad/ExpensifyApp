"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var VerifyAccountPageBase_1 = require("@pages/settings/VerifyAccountPageBase");
var ROUTES_1 = require("@src/ROUTES");
function WorkspaceInvoicesVerifyAccountPage(_a) {
    var route = _a.route;
    var workspaceInvoicePath = ROUTES_1.default.WORKSPACE_INVOICES.getRoute(route.params.policyID);
    return (<VerifyAccountPageBase_1.default navigateBackTo={workspaceInvoicePath} navigateForwardTo={ROUTES_1.default.SETTINGS_ADD_BANK_ACCOUNT.getRoute(workspaceInvoicePath)}/>);
}
WorkspaceInvoicesVerifyAccountPage.displayName = 'WorkspaceInvoicesVerifyAccountPage';
exports.default = WorkspaceInvoicesVerifyAccountPage;
