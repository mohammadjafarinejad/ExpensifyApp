"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var ValidateCodeActionContent_1 = require("@components/ValidateCodeActionModal/ValidateCodeActionContent");
var useLocalize_1 = require("@hooks/useLocalize");
var useOnyx_1 = require("@hooks/useOnyx");
var Card_1 = require("@libs/actions/Card");
var User_1 = require("@libs/actions/User");
var Navigation_1 = require("@libs/Navigation/Navigation");
var ONYXKEYS_1 = require("@src/ONYXKEYS");
var ROUTES_1 = require("@src/ROUTES");
var SCREENS_1 = require("@src/SCREENS");
var useExpensifyCardContext_1 = require("./useExpensifyCardContext");
function ExpensifyCardVerifyAccountPage(_a) {
    var _b;
    var route = _a.route;
    var cardID = route.params.cardID;
    var translate = (0, useLocalize_1.default)().translate;
    var _c = (0, react_1.useState)({}), validateError = _c[0], setValidateError = _c[1];
    var account = (0, useOnyx_1.default)(ONYXKEYS_1.default.ACCOUNT, { canBeMissing: false })[0];
    var primaryLogin = (_b = account === null || account === void 0 ? void 0 : account.primaryLogin) !== null && _b !== void 0 ? _b : '';
    var _d = (0, useExpensifyCardContext_1.default)(), setIsCardDetailsLoading = _d.setIsCardDetailsLoading, setCardsDetails = _d.setCardsDetails, setCardsDetailsErrors = _d.setCardsDetailsErrors;
    var navigateBack = function () {
        if (route.name === SCREENS_1.default.DOMAIN_CARD.DOMAIN_CARD_CONFIRM_MAGIC_CODE) {
            Navigation_1.default.goBack(ROUTES_1.default.SETTINGS_DOMAIN_CARD_DETAIL.getRoute(cardID));
            return;
        }
        Navigation_1.default.goBack(ROUTES_1.default.SETTINGS_WALLET_DOMAIN_CARD.getRoute(cardID));
    };
    var handleRevealCardDetails = function (validateCode) {
        setIsCardDetailsLoading(function (prevState) {
            var _a;
            return (__assign(__assign({}, prevState), (_a = {}, _a[cardID] = true, _a)));
        });
        // We can't store the response in Onyx for security reasons.
        // That is why this action is handled manually and the response is stored in a local state.
        // Hence eslint disable here.
        // eslint-disable-next-line rulesdir/no-thenable-actions-in-views
        (0, Card_1.revealVirtualCardDetails)(Number.parseInt(cardID, 10), validateCode)
            .then(function (value) {
            setCardsDetails(function (prevState) {
                var _a;
                return (__assign(__assign({}, prevState), (_a = {}, _a[cardID] = value, _a)));
            });
            setCardsDetailsErrors(function (prevState) {
                var _a;
                return (__assign(__assign({}, prevState), (_a = {}, _a[cardID] = '', _a)));
            });
            navigateBack();
        })
            .catch(function (error) {
            // Displaying magic code errors is handled in the modal, no need to set it on the card
            setCardsDetailsErrors(function (prevState) {
                var _a;
                return (__assign(__assign({}, prevState), (_a = {}, _a[cardID] = error, _a)));
            });
            navigateBack();
        })
            .finally(function () {
            setIsCardDetailsLoading(function (prevState) {
                var _a;
                return (__assign(__assign({}, prevState), (_a = {}, _a[cardID] = false, _a)));
            });
        });
    };
    return (<ValidateCodeActionContent_1.default title={translate('cardPage.validateCardTitle')} descriptionPrimary={translate('cardPage.enterMagicCode', { contactMethod: primaryLogin })} sendValidateCode={function () { return (0, User_1.requestValidateCodeAction)(); }} validateCodeActionErrorField="revealExpensifyCardDetails" handleSubmitForm={handleRevealCardDetails} validateError={validateError} clearError={function () { return setValidateError({}); }} onClose={function () {
            (0, User_1.resetValidateActionCodeSent)();
            navigateBack();
        }}/>);
}
ExpensifyCardVerifyAccountPage.displayName = 'ExpensifyCardVerifyAccountPage';
exports.default = ExpensifyCardVerifyAccountPage;
