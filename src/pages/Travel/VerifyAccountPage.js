"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var useOnyx_1 = require("@hooks/useOnyx");
var Travel_1 = require("@libs/actions/Travel");
var VerifyAccountPageBase_1 = require("@pages/settings/VerifyAccountPageBase");
var ONYXKEYS_1 = require("@src/ONYXKEYS");
var ROUTES_1 = require("@src/ROUTES");
function VerifyAccountPage(_a) {
    var _b;
    var route = _a.route;
    var domain = route.params.domain;
    var travelProvisioning = (0, useOnyx_1.default)(ONYXKEYS_1.default.TRAVEL_PROVISIONING, { canBeMissing: true })[0];
    (0, react_1.useEffect)(function () {
        return function () {
            (0, Travel_1.setTravelProvisioningNextStep)();
        };
    }, []);
    // Determine where to navigate after successful OTP validation
    var navigateForwardTo = (_b = travelProvisioning === null || travelProvisioning === void 0 ? void 0 : travelProvisioning.nextStepRoute) !== null && _b !== void 0 ? _b : ROUTES_1.default.TRAVEL_TCS.getRoute(domain);
    return (<VerifyAccountPageBase_1.default navigateBackTo={ROUTES_1.default.TRAVEL_MY_TRIPS} navigateForwardTo={navigateForwardTo}/>);
}
VerifyAccountPage.displayName = 'VerifyAccountPage';
exports.default = VerifyAccountPage;
