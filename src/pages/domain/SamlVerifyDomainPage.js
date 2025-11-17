"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var ROUTES_1 = require("@src/ROUTES");
var BaseVerifyDomainPage_1 = require("./BaseVerifyDomainPage");
function SamlVerifyDomainPage(_a) {
    var route = _a.route;
    var accountID = route.params.accountID;
    return (<BaseVerifyDomainPage_1.default accountID={accountID} forwardTo={ROUTES_1.default.DOMAIN_VERIFIED.getRoute(route.params.accountID)}/>);
}
SamlVerifyDomainPage.displayName = 'SamlVerifyDomainPage';
exports.default = SamlVerifyDomainPage;
