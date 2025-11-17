"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var VerifyAccountPageBase_1 = require("@pages/settings/VerifyAccountPageBase");
var ROUTES_1 = require("@src/ROUTES");
function SearchRootVerifyAccountPage() {
    return <VerifyAccountPageBase_1.default navigateBackTo={ROUTES_1.default.SEARCH_ROOT.getRoute({ query: '' })}/>;
}
SearchRootVerifyAccountPage.displayName = 'SearchRootVerifyAccountPage';
exports.default = SearchRootVerifyAccountPage;
