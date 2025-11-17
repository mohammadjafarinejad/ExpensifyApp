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
var usePrevious_1 = require("@hooks/usePrevious");
var Card_1 = require("@libs/actions/Card");
var User_1 = require("@libs/actions/User");
var ErrorUtils_1 = require("@libs/ErrorUtils");
var Navigation_1 = require("@libs/Navigation/Navigation");
var User_2 = require("@userActions/User");
var ONYXKEYS_1 = require("@src/ONYXKEYS");
var ROUTES_1 = require("@src/ROUTES");
var SCREENS_1 = require("@src/SCREENS");
var EmptyObject_1 = require("@src/types/utils/EmptyObject");
function ReportVirtualCardFraudVerifyAccountPage(_a) {
    var _b, _c;
    var _d = _a.route.params.cardID, cardID = _d === void 0 ? '' : _d;
    var cardList = (0, useOnyx_1.default)(ONYXKEYS_1.default.CARD_LIST, { canBeMissing: false })[0];
    var virtualCard = cardList === null || cardList === void 0 ? void 0 : cardList[cardID];
    var translate = (0, useLocalize_1.default)().translate;
    var account = (0, useOnyx_1.default)(ONYXKEYS_1.default.ACCOUNT, { canBeMissing: false })[0];
    var validateCodeAction = (0, useOnyx_1.default)(ONYXKEYS_1.default.VALIDATE_ACTION_CODE, { canBeMissing: true })[0];
    var formData = (0, useOnyx_1.default)(ONYXKEYS_1.default.FORMS.REPORT_VIRTUAL_CARD_FRAUD, { canBeMissing: true })[0];
    var latestIssuedVirtualCardID = (_b = Object.keys(cardList !== null && cardList !== void 0 ? cardList : {})) === null || _b === void 0 ? void 0 : _b.pop();
    var primaryLogin = (_c = account === null || account === void 0 ? void 0 : account.primaryLogin) !== null && _c !== void 0 ? _c : '';
    var cardError = (0, ErrorUtils_1.getLatestErrorFieldForAnyField)(virtualCard);
    var codeError = (0, ErrorUtils_1.getLatestErrorFieldForAnyField)(validateCodeAction);
    var prevIsLoading = (0, usePrevious_1.default)(formData === null || formData === void 0 ? void 0 : formData.isLoading);
    (0, react_1.useEffect)(function () {
        // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
        if (!prevIsLoading || (formData === null || formData === void 0 ? void 0 : formData.isLoading)) {
            return;
        }
        if (!(0, EmptyObject_1.isEmptyObject)(cardError) || !(0, EmptyObject_1.isEmptyObject)(codeError)) {
            return;
        }
        if (latestIssuedVirtualCardID) {
            Navigation_1.default.removeScreenFromNavigationState(SCREENS_1.default.SETTINGS.WALLET.DOMAIN_CARD);
            Navigation_1.default.goBack(ROUTES_1.default.SETTINGS_REPORT_FRAUD_CONFIRMATION.getRoute(latestIssuedVirtualCardID));
        }
    }, [formData === null || formData === void 0 ? void 0 : formData.isLoading, latestIssuedVirtualCardID, cardError, codeError, prevIsLoading]);
    var handleValidateCodeEntered = (0, react_1.useCallback)(function (validateCode) {
        if (!virtualCard) {
            return;
        }
        (0, Card_1.reportVirtualExpensifyCardFraud)(virtualCard, validateCode);
    }, [virtualCard]);
    var handleClearError = (0, react_1.useCallback)(function () {
        (0, User_2.clearValidateCodeActionError)(ONYXKEYS_1.default.VALIDATE_ACTION_CODE);
        if (!(virtualCard === null || virtualCard === void 0 ? void 0 : virtualCard.cardID)) {
            return;
        }
        (0, Card_1.clearCardListErrors)(virtualCard.cardID);
    }, [virtualCard === null || virtualCard === void 0 ? void 0 : virtualCard.cardID]);
    return (<ValidateCodeActionContent_1.default title={translate('cardPage.validateCardTitle')} descriptionPrimary={translate('cardPage.enterMagicCode', { contactMethod: primaryLogin })} sendValidateCode={function () { return (0, User_1.requestValidateCodeAction)(); }} validateCodeActionErrorField="reportVirtualCard" handleSubmitForm={handleValidateCodeEntered} validateError={__assign(__assign({}, cardError), codeError)} clearError={handleClearError} onClose={function () {
            (0, User_1.resetValidateActionCodeSent)();
            Navigation_1.default.goBack(ROUTES_1.default.SETTINGS_REPORT_FRAUD.getRoute(cardID));
        }}/>);
}
ReportVirtualCardFraudVerifyAccountPage.displayName = 'ReportVirtualCardFraudVerifyAccountPage';
exports.default = ReportVirtualCardFraudVerifyAccountPage;
