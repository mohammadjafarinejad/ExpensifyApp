"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var PushRowFieldsStep_1 = require("@components/SubStepForms/PushRowFieldsStep");
var useLocalize_1 = require("@hooks/useLocalize");
var useOnyx_1 = require("@hooks/useOnyx");
var useReimbursementAccountStepFormSubmit_1 = require("@hooks/useReimbursementAccountStepFormSubmit");
var getListOptionsFromCorpayPicklist_1 = require("@pages/ReimbursementAccount/NonUSD/utils/getListOptionsFromCorpayPicklist");
var CONST_1 = require("@src/CONST");
var ONYXKEYS_1 = require("@src/ONYXKEYS");
var ReimbursementAccountForm_1 = require("@src/types/form/ReimbursementAccountForm");
var COUNTRY = ReimbursementAccountForm_1.default.ADDITIONAL_DATA.COUNTRY;
var _a = ReimbursementAccountForm_1.default.ADDITIONAL_DATA.CORPAY, BUSINESS_CATEGORY = _a.BUSINESS_CATEGORY, APPLICANT_TYPE_ID = _a.APPLICANT_TYPE_ID, BUSINESS_TYPE_ID = _a.BUSINESS_TYPE_ID;
var STEP_FIELDS_WITHOUT_BUSINESS_TYPE = [BUSINESS_CATEGORY, APPLICANT_TYPE_ID];
var STEP_FIELDS = [BUSINESS_CATEGORY, APPLICANT_TYPE_ID, BUSINESS_TYPE_ID];
function BusinessType(_a) {
    var _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o;
    var onNext = _a.onNext, isEditing = _a.isEditing, onMove = _a.onMove;
    var translate = (0, useLocalize_1.default)().translate;
    var reimbursementAccount = (0, useOnyx_1.default)(ONYXKEYS_1.default.REIMBURSEMENT_ACCOUNT, { canBeMissing: false })[0];
    var reimbursementAccountDraft = (0, useOnyx_1.default)(ONYXKEYS_1.default.REIMBURSEMENT_ACCOUNT, { canBeMissing: true })[0];
    var corpayOnboardingFields = (0, useOnyx_1.default)(ONYXKEYS_1.default.CORPAY_ONBOARDING_FIELDS, { canBeMissing: false })[0];
    var country = (_d = (_b = reimbursementAccountDraft === null || reimbursementAccountDraft === void 0 ? void 0 : reimbursementAccountDraft[COUNTRY]) !== null && _b !== void 0 ? _b : (_c = reimbursementAccount === null || reimbursementAccount === void 0 ? void 0 : reimbursementAccount.achData) === null || _c === void 0 ? void 0 : _c[COUNTRY]) !== null && _d !== void 0 ? _d : '';
    var isBusinessTypeRequired = country !== CONST_1.default.COUNTRY.CA;
    var incorporationTypeListOptions = (0, react_1.useMemo)(function () { return (0, getListOptionsFromCorpayPicklist_1.default)(corpayOnboardingFields === null || corpayOnboardingFields === void 0 ? void 0 : corpayOnboardingFields.picklists.ApplicantType); }, [corpayOnboardingFields]);
    var natureOfBusinessListOptions = (0, react_1.useMemo)(function () { return (0, getListOptionsFromCorpayPicklist_1.default)(corpayOnboardingFields === null || corpayOnboardingFields === void 0 ? void 0 : corpayOnboardingFields.picklists.NatureOfBusiness); }, [corpayOnboardingFields]);
    var businessTypeListOptions = (0, react_1.useMemo)(function () { return (0, getListOptionsFromCorpayPicklist_1.default)(corpayOnboardingFields === null || corpayOnboardingFields === void 0 ? void 0 : corpayOnboardingFields.picklists.BusinessType); }, [corpayOnboardingFields]);
    var incorporationTypeDefaultValue = (_g = (_f = (_e = reimbursementAccount === null || reimbursementAccount === void 0 ? void 0 : reimbursementAccount.achData) === null || _e === void 0 ? void 0 : _e.corpay) === null || _f === void 0 ? void 0 : _f[APPLICANT_TYPE_ID]) !== null && _g !== void 0 ? _g : '';
    var businessCategoryDefaultValue = (_k = (_j = (_h = reimbursementAccount === null || reimbursementAccount === void 0 ? void 0 : reimbursementAccount.achData) === null || _h === void 0 ? void 0 : _h.corpay) === null || _j === void 0 ? void 0 : _j[BUSINESS_CATEGORY]) !== null && _k !== void 0 ? _k : '';
    var businessTypeDefaultValue = (_o = (_m = (_l = reimbursementAccount === null || reimbursementAccount === void 0 ? void 0 : reimbursementAccount.achData) === null || _l === void 0 ? void 0 : _l.corpay) === null || _m === void 0 ? void 0 : _m[BUSINESS_TYPE_ID]) !== null && _o !== void 0 ? _o : '';
    var pushRowFields = (0, react_1.useMemo)(function () { return __spreadArray([
        {
            inputID: APPLICANT_TYPE_ID,
            defaultValue: incorporationTypeDefaultValue,
            options: incorporationTypeListOptions,
            description: translate('businessInfoStep.incorporationTypeName'),
            modalHeaderTitle: translate('businessInfoStep.selectIncorporationType'),
            searchInputTitle: translate('businessInfoStep.findIncorporationType'),
        },
        {
            inputID: BUSINESS_CATEGORY,
            defaultValue: businessCategoryDefaultValue,
            options: natureOfBusinessListOptions,
            description: translate('businessInfoStep.businessCategory'),
            modalHeaderTitle: translate('businessInfoStep.selectBusinessCategory'),
            searchInputTitle: translate('businessInfoStep.findBusinessCategory'),
        }
    ], (isBusinessTypeRequired
        ? [
            {
                inputID: BUSINESS_TYPE_ID,
                defaultValue: businessTypeDefaultValue,
                options: businessTypeListOptions,
                description: translate('businessInfoStep.businessType'),
                modalHeaderTitle: translate('businessInfoStep.selectBusinessType'),
                searchInputTitle: translate('businessInfoStep.findBusinessType'),
            },
        ]
        : []), true); }, [
        businessCategoryDefaultValue,
        businessTypeDefaultValue,
        businessTypeListOptions,
        incorporationTypeDefaultValue,
        incorporationTypeListOptions,
        isBusinessTypeRequired,
        natureOfBusinessListOptions,
        translate,
    ]);
    var handleSubmit = (0, useReimbursementAccountStepFormSubmit_1.default)({
        fieldIds: isBusinessTypeRequired ? STEP_FIELDS : STEP_FIELDS_WITHOUT_BUSINESS_TYPE,
        onNext: onNext,
        shouldSaveDraft: isEditing,
    });
    if (corpayOnboardingFields === undefined) {
        return null;
    }
    return (<PushRowFieldsStep_1.default isEditing={isEditing} onNext={onNext} onMove={onMove} formID={ONYXKEYS_1.default.FORMS.REIMBURSEMENT_ACCOUNT_FORM} formTitle={translate('businessInfoStep.whatTypeOfBusinessIsIt')} onSubmit={handleSubmit} pushRowFields={pushRowFields}/>);
}
BusinessType.displayName = 'BusinessType';
exports.default = BusinessType;
