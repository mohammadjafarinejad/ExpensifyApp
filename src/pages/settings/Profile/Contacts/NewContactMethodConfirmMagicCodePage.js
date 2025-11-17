"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var ValidateCodeActionContent_1 = require("@components/ValidateCodeActionModal/ValidateCodeActionContent");
var useLocalize_1 = require("@hooks/useLocalize");
var useOnyx_1 = require("@hooks/useOnyx");
var usePrevious_1 = require("@hooks/usePrevious");
var User_1 = require("@libs/actions/User");
var ErrorUtils_1 = require("@libs/ErrorUtils");
var Navigation_1 = require("@libs/Navigation/Navigation");
var PhoneNumber_1 = require("@libs/PhoneNumber");
var UserUtils_1 = require("@libs/UserUtils");
var ONYXKEYS_1 = require("@src/ONYXKEYS");
var ROUTES_1 = require("@src/ROUTES");
var utils_1 = require("./utils");
function NewContactMethodConfirmMagicCodePage(_a) {
    var _b, _c;
    var route = _a.route;
    var translate = (0, useLocalize_1.default)().translate;
    var navigateBackTo = (_b = route === null || route === void 0 ? void 0 : route.params) === null || _b === void 0 ? void 0 : _b.backTo;
    var account = (0, useOnyx_1.default)(ONYXKEYS_1.default.ACCOUNT, { canBeMissing: false })[0];
    var session = (0, useOnyx_1.default)(ONYXKEYS_1.default.SESSION, { canBeMissing: false })[0];
    var contactMethod = (0, UserUtils_1.getContactMethod)(account === null || account === void 0 ? void 0 : account.primaryLogin, session === null || session === void 0 ? void 0 : session.email);
    var newContactMethod = (0, react_1.useMemo)(function () { return (0, utils_1.default)(route.params.newContactMethod); }, [route.params.newContactMethod]);
    var pendingContactAction = (0, useOnyx_1.default)(ONYXKEYS_1.default.PENDING_CONTACT_ACTION, { canBeMissing: false })[0];
    var loginList = (0, useOnyx_1.default)(ONYXKEYS_1.default.LOGIN_LIST, { canBeMissing: true })[0];
    var prevPendingContactAction = (0, usePrevious_1.default)(pendingContactAction);
    var loginData = loginList === null || loginList === void 0 ? void 0 : loginList[(_c = pendingContactAction === null || pendingContactAction === void 0 ? void 0 : pendingContactAction.contactMethod) !== null && _c !== void 0 ? _c : newContactMethod];
    var validateLoginError = (0, ErrorUtils_1.getLatestErrorField)(loginData, 'addedLogin');
    var addNewContactMethod = (0, react_1.useCallback)(function (magicCode) {
        (0, User_1.addNewContactMethod)((0, PhoneNumber_1.addSMSDomainIfPhoneNumber)(newContactMethod), magicCode);
    }, [newContactMethod]);
    (0, react_1.useEffect)(function () {
        if (!(pendingContactAction === null || pendingContactAction === void 0 ? void 0 : pendingContactAction.actionVerified)) {
            return;
        }
        (0, User_1.clearUnvalidatedNewContactMethodAction)();
        Navigation_1.default.goBack(ROUTES_1.default.SETTINGS_CONTACT_METHOD_DETAILS.getRoute((0, PhoneNumber_1.addSMSDomainIfPhoneNumber)(newContactMethod), navigateBackTo, true));
    }, [navigateBackTo, newContactMethod, pendingContactAction, pendingContactAction === null || pendingContactAction === void 0 ? void 0 : pendingContactAction.actionVerified, prevPendingContactAction === null || prevPendingContactAction === void 0 ? void 0 : prevPendingContactAction.contactMethod]);
    return (<ValidateCodeActionContent_1.default title={translate('delegate.makeSureItIsYou')} sendValidateCode={function () { return (0, User_1.requestValidateCodeAction)(); }} descriptionPrimary={translate('contacts.enterMagicCode', { contactMethod: contactMethod })} validateCodeActionErrorField="addedLogin" validateError={validateLoginError} handleSubmitForm={addNewContactMethod} clearError={function () {
            if (!(pendingContactAction === null || pendingContactAction === void 0 ? void 0 : pendingContactAction.contactMethod)) {
                return;
            }
            (0, User_1.clearContactMethod)(newContactMethod);
        }} onClose={function () {
            if (!(pendingContactAction === null || pendingContactAction === void 0 ? void 0 : pendingContactAction.contactMethod)) {
                return;
            }
            (0, User_1.clearContactMethod)(newContactMethod);
            (0, User_1.clearUnvalidatedNewContactMethodAction)();
            Navigation_1.default.goBack(ROUTES_1.default.SETTINGS_NEW_CONTACT_METHOD.getRoute(navigateBackTo));
        }}/>);
}
NewContactMethodConfirmMagicCodePage.displayName = 'NewContactMethodConfirmMagicCodePage';
exports.default = NewContactMethodConfirmMagicCodePage;
