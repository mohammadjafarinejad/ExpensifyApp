"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var VerifyAccountPageBase_1 = require("@pages/settings/VerifyAccountPageBase");
var ROUTES_1 = require("@src/ROUTES");
function VerifyAccountPage(_a) {
    var _b, _c, _d, _e;
    var route = _a.route;
    return (<VerifyAccountPageBase_1.default navigateBackTo={(_c = (_b = route === null || route === void 0 ? void 0 : route.params) === null || _b === void 0 ? void 0 : _b.backTo) !== null && _c !== void 0 ? _c : ROUTES_1.default.SETTINGS_SECURITY} navigateForwardTo={(_e = (_d = route === null || route === void 0 ? void 0 : route.params) === null || _d === void 0 ? void 0 : _d.forwardTo) !== null && _e !== void 0 ? _e : ROUTES_1.default.SETTINGS_2FA_ROOT.getRoute()}/>);
}
VerifyAccountPage.displayName = 'VerifyAccountPage';
exports.default = VerifyAccountPage;
