"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Account_1 = require("@selectors/Account");
var react_1 = require("react");
var useLocalize_1 = require("@hooks/useLocalize");
var useOnyx_1 = require("@hooks/useOnyx");
var usePolicy_1 = require("@hooks/usePolicy");
var Travel_1 = require("@libs/actions/Travel");
var Navigation_1 = require("@libs/Navigation/Navigation");
var AddressPage_1 = require("@pages/AddressPage");
var Policy_1 = require("@userActions/Policy/Policy");
var CONST_1 = require("@src/CONST");
var ONYXKEYS_1 = require("@src/ONYXKEYS");
var ROUTES_1 = require("@src/ROUTES");
function WorkspaceAddressForTravelPage(_a) {
    var route = _a.route;
    var translate = (0, useLocalize_1.default)().translate;
    var activePolicyID = (0, useOnyx_1.default)(ONYXKEYS_1.default.NVP_ACTIVE_POLICY_ID, { canBeMissing: true })[0];
    var policy = (0, usePolicy_1.default)(activePolicyID);
    var isUserValidated = (0, useOnyx_1.default)(ONYXKEYS_1.default.ACCOUNT, { selector: Account_1.isUserValidatedSelector, canBeMissing: true })[0];
    var updatePolicyAddress = function (values) {
        var _a, _b, _c, _d, _e, _f, _g;
        if (!policy) {
            return;
        }
        // Always validate OTP first before allowing address submission
        if (!isUserValidated) {
            // After OTP validation, redirect back to this address page
            var currentRoute = ROUTES_1.default.TRAVEL_WORKSPACE_ADDRESS.getRoute(route.params.domain, route.params.backTo);
            (0, Travel_1.setTravelProvisioningNextStep)(currentRoute);
            Navigation_1.default.navigate(ROUTES_1.default.TRAVEL_VERIFY_ACCOUNT.getRoute(route.params.domain));
            return;
        }
        (0, Policy_1.updateAddress)(policy === null || policy === void 0 ? void 0 : policy.id, {
            addressStreet: "".concat((_b = (_a = values.addressLine1) === null || _a === void 0 ? void 0 : _a.trim()) !== null && _b !== void 0 ? _b : '', "\n").concat((_d = (_c = values.addressLine2) === null || _c === void 0 ? void 0 : _c.trim()) !== null && _d !== void 0 ? _d : ''),
            city: values.city.trim(),
            state: values.state.trim(),
            zipCode: (_f = (_e = values === null || values === void 0 ? void 0 : values.zipPostCode) === null || _e === void 0 ? void 0 : _e.trim().toUpperCase()) !== null && _f !== void 0 ? _f : '',
            country: values.country,
        });
        Navigation_1.default.navigate(ROUTES_1.default.TRAVEL_TCS.getRoute((_g = route.params.domain) !== null && _g !== void 0 ? _g : CONST_1.default.TRAVEL.DEFAULT_DOMAIN), { forceReplace: true });
    };
    return (<AddressPage_1.default isLoadingApp={false} updateAddress={updatePolicyAddress} title={translate('common.companyAddress')} backTo={route.params.backTo}/>);
}
WorkspaceAddressForTravelPage.displayName = 'WorkspaceAddressForTravelPage';
exports.default = WorkspaceAddressForTravelPage;
