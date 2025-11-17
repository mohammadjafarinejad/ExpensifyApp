"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var ValidateCodeActionContent_1 = require("@components/ValidateCodeActionModal/ValidateCodeActionContent");
var useLocalize_1 = require("@hooks/useLocalize");
var useOnyx_1 = require("@hooks/useOnyx");
var FormActions_1 = require("@libs/actions/FormActions");
var PersonalDetails_1 = require("@libs/actions/PersonalDetails");
var User_1 = require("@libs/actions/User");
var CountryUtils_1 = require("@libs/CountryUtils");
var ErrorUtils_1 = require("@libs/ErrorUtils");
var Navigation_1 = require("@libs/Navigation/Navigation");
var PersonalDetailsUtils_1 = require("@libs/PersonalDetailsUtils");
var CONST_1 = require("@src/CONST");
var ONYXKEYS_1 = require("@src/ONYXKEYS");
var ROUTES_1 = require("@src/ROUTES");
var Account_1 = require("@src/selectors/Account");
var EmptyObject_1 = require("@src/types/utils/EmptyObject");
var utils_1 = require("./utils");
var areAllCardsShippedSelector = function (cardList) { var _a; return (_a = Object.values(cardList !== null && cardList !== void 0 ? cardList : {})) === null || _a === void 0 ? void 0 : _a.every(function (card) { return (card === null || card === void 0 ? void 0 : card.state) !== CONST_1.default.EXPENSIFY_CARD.STATE.STATE_NOT_ISSUED; }); };
function MissingPersonalDetailsMagicCodePage() {
    var _a;
    var translate = (0, useLocalize_1.default)().translate;
    var privatePersonalDetails = (0, useOnyx_1.default)(ONYXKEYS_1.default.PRIVATE_PERSONAL_DETAILS, { canBeMissing: false })[0];
    var draftValues = (0, useOnyx_1.default)(ONYXKEYS_1.default.FORMS.PERSONAL_DETAILS_FORM_DRAFT, { canBeMissing: false })[0];
    var _b = (0, useOnyx_1.default)(ONYXKEYS_1.default.COUNTRY_CODE, { canBeMissing: false })[0], countryCode = _b === void 0 ? CONST_1.default.DEFAULT_COUNTRY_CODE : _b;
    var areAllCardsShipped = (0, useOnyx_1.default)(ONYXKEYS_1.default.CARD_LIST, { selector: areAllCardsShippedSelector, canBeMissing: true })[0];
    var primaryLogin = (0, useOnyx_1.default)(ONYXKEYS_1.default.ACCOUNT, { selector: Account_1.primaryLoginSelector, canBeMissing: true })[0];
    var validateCodeAction = (0, useOnyx_1.default)(ONYXKEYS_1.default.VALIDATE_ACTION_CODE, { canBeMissing: true })[0];
    var privateDetailsErrors = (_a = privatePersonalDetails === null || privatePersonalDetails === void 0 ? void 0 : privatePersonalDetails.errors) !== null && _a !== void 0 ? _a : undefined;
    var validateLoginError = (0, ErrorUtils_1.getLatestError)(privateDetailsErrors);
    var missingDetails = (0, PersonalDetailsUtils_1.arePersonalDetailsMissing)(privatePersonalDetails);
    (0, react_1.useEffect)(function () {
        if (missingDetails || !!privateDetailsErrors || !areAllCardsShipped) {
            return;
        }
        (0, FormActions_1.clearDraftValues)(ONYXKEYS_1.default.FORMS.PERSONAL_DETAILS_FORM);
        Navigation_1.default.dismissModal();
    }, [missingDetails, privateDetailsErrors, areAllCardsShipped]);
    var clearError = function () {
        if ((0, EmptyObject_1.isEmptyObject)(validateLoginError) && (0, EmptyObject_1.isEmptyObject)(validateCodeAction === null || validateCodeAction === void 0 ? void 0 : validateCodeAction.errorFields)) {
            return;
        }
        (0, PersonalDetails_1.clearPersonalDetailsErrors)();
    };
    var values = (0, react_1.useMemo)(function () { return (0, CountryUtils_1.normalizeCountryCode)((0, utils_1.getSubstepValues)(privatePersonalDetails, draftValues)); }, [privatePersonalDetails, draftValues]);
    var handleSubmitForm = (0, react_1.useCallback)(function (validateCode) {
        (0, PersonalDetails_1.updatePersonalDetailsAndShipExpensifyCards)(values, validateCode, countryCode);
    }, [countryCode, values]);
    return (<ValidateCodeActionContent_1.default title={translate('cardPage.validateCardTitle')} descriptionPrimary={translate('cardPage.enterMagicCode', { contactMethod: primaryLogin !== null && primaryLogin !== void 0 ? primaryLogin : '' })} sendValidateCode={function () { return (0, User_1.requestValidateCodeAction)(); }} validateCodeActionErrorField="personalDetails" handleSubmitForm={handleSubmitForm} validateError={validateLoginError} clearError={clearError} onClose={function () {
            (0, User_1.resetValidateActionCodeSent)();
            Navigation_1.default.goBack(ROUTES_1.default.MISSING_PERSONAL_DETAILS);
        }} isLoading={privatePersonalDetails === null || privatePersonalDetails === void 0 ? void 0 : privatePersonalDetails.isLoading}/>);
}
MissingPersonalDetailsMagicCodePage.displayName = 'MissingPersonalDetailsMagicCodePage';
exports.default = MissingPersonalDetailsMagicCodePage;
