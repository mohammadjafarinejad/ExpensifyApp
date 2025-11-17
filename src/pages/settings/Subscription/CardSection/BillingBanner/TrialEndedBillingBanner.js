"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var Illustrations = require("@components/Icon/Illustrations");
var useLocalize_1 = require("@hooks/useLocalize");
var useOnyx_1 = require("@hooks/useOnyx");
var SubscriptionUtils_1 = require("@libs/SubscriptionUtils");
var ONYXKEYS_1 = require("@src/ONYXKEYS");
var BillingBanner_1 = require("./BillingBanner");
function TrialEndedBillingBanner() {
    var translate = (0, useLocalize_1.default)().translate;
    var userBillingFundID = (0, useOnyx_1.default)(ONYXKEYS_1.default.NVP_BILLING_FUND_ID, { canBeMissing: true })[0];
    if ((0, SubscriptionUtils_1.doesUserHavePaymentCardAdded)(userBillingFundID)) {
        return null;
    }
    return (<BillingBanner_1.default title={translate('subscription.billingBanner.trialEnded.title')} subtitle={translate('subscription.billingBanner.trialEnded.subtitle')} icon={Illustrations.Tire}/>);
}
TrialEndedBillingBanner.displayName = 'TrialEndedBillingBanner';
exports.default = TrialEndedBillingBanner;
