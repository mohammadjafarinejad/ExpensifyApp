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
var useLocalize_1 = require("@hooks/useLocalize");
var useOnyx_1 = require("@hooks/useOnyx");
var PersonalDetails_1 = require("@libs/actions/PersonalDetails");
var Navigation_1 = require("@libs/Navigation/Navigation");
var MissingPersonalDetailsContent_1 = require("@pages/MissingPersonalDetails/MissingPersonalDetailsContent");
var CONST_1 = require("@src/CONST");
var ONYXKEYS_1 = require("@src/ONYXKEYS");
var ROUTES_1 = require("@src/ROUTES");
var useExpensifyCardContext_1 = require("./useExpensifyCardContext");
function ExpensifyCardMissingDetailsPage(_a) {
    var _b = _a.route.params.cardID, cardID = _b === void 0 ? '' : _b;
    var translate = (0, useLocalize_1.default)().translate;
    var privatePersonalDetails = (0, useOnyx_1.default)(ONYXKEYS_1.default.PRIVATE_PERSONAL_DETAILS, { canBeMissing: false })[0];
    var draftValues = (0, useOnyx_1.default)(ONYXKEYS_1.default.FORMS.PERSONAL_DETAILS_FORM_DRAFT, { canBeMissing: true })[0];
    var _c = (0, useOnyx_1.default)(ONYXKEYS_1.default.COUNTRY_CODE, { canBeMissing: false })[0], countryCode = _c === void 0 ? CONST_1.default.DEFAULT_COUNTRY_CODE : _c;
    var _d = (0, useExpensifyCardContext_1.default)(), setIsCardDetailsLoading = _d.setIsCardDetailsLoading, setCardsDetails = _d.setCardsDetails, setCardsDetailsErrors = _d.setCardsDetailsErrors;
    var handleComplete = (0, react_1.useCallback)(function (values, validateCode) {
        setIsCardDetailsLoading(function (prevState) {
            var _a;
            return (__assign(__assign({}, prevState), (_a = {}, _a[cardID] = true, _a)));
        });
        (0, PersonalDetails_1.setPersonalDetailsAndRevealExpensifyCard)(values, validateCode, countryCode, Number.parseInt(cardID, 10))
            .then(function (value) {
            setCardsDetails(function (prevState) {
                var _a;
                return (__assign(__assign({}, prevState), (_a = {}, _a[cardID] = value, _a)));
            });
            setCardsDetailsErrors(function (prevState) {
                var _a;
                return (__assign(__assign({}, prevState), (_a = {}, _a[cardID] = '', _a)));
            });
            Navigation_1.default.goBack(ROUTES_1.default.SETTINGS_WALLET_DOMAIN_CARD.getRoute(cardID));
        })
            .catch(function (error) {
            setCardsDetailsErrors(function (prevState) {
                var _a;
                return (__assign(__assign({}, prevState), (_a = {}, _a[cardID] = error, _a)));
            });
            Navigation_1.default.goBack(ROUTES_1.default.SETTINGS_WALLET_DOMAIN_CARD.getRoute(cardID));
        })
            .finally(function () {
            setIsCardDetailsLoading(function (prevState) {
                var _a;
                return (__assign(__assign({}, prevState), (_a = {}, _a[cardID] = false, _a)));
            });
        });
    }, [cardID, countryCode, setCardsDetails, setCardsDetailsErrors, setIsCardDetailsLoading]);
    return (<MissingPersonalDetailsContent_1.default privatePersonalDetails={privatePersonalDetails} draftValues={draftValues} headerTitle={translate('cardPage.cardDetails.revealDetails')} onComplete={handleComplete}/>);
}
ExpensifyCardMissingDetailsPage.displayName = 'ExpensifyCardMissingDetailsPage';
exports.default = ExpensifyCardMissingDetailsPage;
