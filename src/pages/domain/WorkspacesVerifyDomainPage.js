"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var ROUTES_1 = require("@src/ROUTES");
var BaseVerifyDomainPage_1 = require("./BaseVerifyDomainPage");
function WorkspacesVerifyDomainPage(_a) {
    var route = _a.route;
    var accountID = route.params.accountID;
    return (<BaseVerifyDomainPage_1.default accountID={accountID} forwardTo={ROUTES_1.default.WORKSPACES_DOMAIN_VERIFIED.getRoute(accountID)}/>);
}
WorkspacesVerifyDomainPage.displayName = 'WorkspacesVerifyDomainPage';
exports.default = WorkspacesVerifyDomainPage;
