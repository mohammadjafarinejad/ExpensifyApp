"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var Navigation_1 = require("@libs/Navigation/Navigation");
var ROUTES_1 = require("@src/ROUTES");
var BaseDomainVerifiedPage_1 = require("./BaseDomainVerifiedPage");
function WorkspacesDomainVerifiedPage(_a) {
    var route = _a.route;
    var accountID = route.params.accountID;
    return (<BaseDomainVerifiedPage_1.default accountID={accountID} redirectTo={ROUTES_1.default.WORKSPACES_VERIFY_DOMAIN.getRoute(accountID)} navigateAfterConfirmation={function () { return Navigation_1.default.dismissModal(); }}/>);
}
WorkspacesDomainVerifiedPage.displayName = 'WorkspacesDomainVerifiedPage';
exports.default = WorkspacesDomainVerifiedPage;
