"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var VerifyAccountPageBase_1 = require("@pages/settings/VerifyAccountPageBase");
var ROUTES_1 = require("@src/ROUTES");
function NewBankAccountVerifyAccountPage() {
    return (<VerifyAccountPageBase_1.default navigateBackTo={ROUTES_1.default.SETTINGS_WALLET} navigateForwardTo={ROUTES_1.default.SETTINGS_ADD_BANK_ACCOUNT.route}/>);
}
NewBankAccountVerifyAccountPage.displayName = 'NewBankAccountVerifyAccountPage';
exports.default = NewBankAccountVerifyAccountPage;
