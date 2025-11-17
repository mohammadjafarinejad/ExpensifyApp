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
var truncate_1 = require("lodash/truncate");
var react_1 = require("react");
var Expensicons_1 = require("@components/Icon/Expensicons");
var Policy_1 = require("@libs/actions/Policy/Policy");
var Navigation_1 = require("@libs/Navigation/Navigation");
var PaymentUtils_1 = require("@libs/PaymentUtils");
var ReportActionsUtils_1 = require("@libs/ReportActionsUtils");
var ReportUtils_1 = require("@libs/ReportUtils");
var SettlementButtonUtils_1 = require("@libs/SettlementButtonUtils");
var CONST_1 = require("@src/CONST");
var ONYXKEYS_1 = require("@src/ONYXKEYS");
var useCurrentUserPersonalDetails_1 = require("./useCurrentUserPersonalDetails");
var useLocalize_1 = require("./useLocalize");
var useOnyx_1 = require("./useOnyx");
var usePolicy_1 = require("./usePolicy");
var useThemeStyles_1 = require("./useThemeStyles");
/**
 * Returns the payment options for the selected reports or transactions when they are being paid for the first time.
 */
function useBulkPayOptions(_a) {
    var _b;
    var selectedPolicyID = _a.selectedPolicyID, selectedReportID = _a.selectedReportID, activeAdminPolicies = _a.activeAdminPolicies, isCurrencySupportedWallet = _a.isCurrencySupportedWallet, currency = _a.currency, formattedAmount = _a.formattedAmount;
    var translate = (0, useLocalize_1.default)().translate;
    var styles = (0, useThemeStyles_1.default)();
    var accountID = (0, useCurrentUserPersonalDetails_1.default)().accountID;
    var userWallet = (0, useOnyx_1.default)(ONYXKEYS_1.default.USER_WALLET, { canBeMissing: true })[0];
    var hasActivatedWallet = [CONST_1.default.WALLET.TIER_NAME.GOLD, CONST_1.default.WALLET.TIER_NAME.PLATINUM].includes((_b = userWallet === null || userWallet === void 0 ? void 0 : userWallet.tierName) !== null && _b !== void 0 ? _b : '');
    var fundList = (0, useOnyx_1.default)(ONYXKEYS_1.default.FUND_LIST, { canBeMissing: true })[0];
    var bankAccountList = (0, useOnyx_1.default)(ONYXKEYS_1.default.BANK_ACCOUNT_LIST, { canBeMissing: true })[0];
    var policy = (0, usePolicy_1.default)(selectedPolicyID);
    var iouReport = (0, useOnyx_1.default)("".concat(ONYXKEYS_1.default.COLLECTION.REPORT).concat(selectedReportID), { canBeMissing: true })[0];
    var chatReport = (0, useOnyx_1.default)("".concat(ONYXKEYS_1.default.COLLECTION.REPORT).concat(iouReport === null || iouReport === void 0 ? void 0 : iouReport.chatReportID), { canBeMissing: true })[0];
    var isIOUReport = (0, ReportUtils_1.isIOUReport)(selectedReportID);
    var isExpenseReport = (0, ReportUtils_1.isExpenseReport)(selectedReportID);
    var isInvoiceReport = (0, ReportUtils_1.isInvoiceReport)(selectedReportID);
    var shouldShowPayElsewhereOption = !isInvoiceReport;
    var canUseBusinessBankAccount = isExpenseReport || (isIOUReport && selectedReportID && !(0, ReportActionsUtils_1.hasRequestFromCurrentAccount)(selectedReportID, accountID !== null && accountID !== void 0 ? accountID : CONST_1.default.DEFAULT_NUMBER_ID));
    var canUsePersonalBankAccount = isIOUReport;
    var isPersonalOnlyOption = canUsePersonalBankAccount && !canUseBusinessBankAccount;
    var shouldShowBusinessBankAccountOptions = isExpenseReport && !isPersonalOnlyOption;
    var formattedPaymentMethods = (0, PaymentUtils_1.formatPaymentMethods)(bankAccountList !== null && bankAccountList !== void 0 ? bankAccountList : {}, fundList !== null && fundList !== void 0 ? fundList : {}, styles, translate);
    var canUseWallet = !isExpenseReport && !isInvoiceReport && isCurrencySupportedWallet;
    var hasSinglePolicy = !isExpenseReport && activeAdminPolicies.length === 1;
    var hasMultiplePolicies = !isExpenseReport && activeAdminPolicies.length > 1;
    function getLatestBankAccountItem() {
        var _a;
        if (!((_a = policy === null || policy === void 0 ? void 0 : policy.achAccount) === null || _a === void 0 ? void 0 : _a.bankAccountID)) {
            return;
        }
        var policyBankAccounts = formattedPaymentMethods.filter(function (method) { var _a; return method.methodID === ((_a = policy === null || policy === void 0 ? void 0 : policy.achAccount) === null || _a === void 0 ? void 0 : _a.bankAccountID); });
        return policyBankAccounts.map(function (formattedPaymentMethod) {
            var _a = formattedPaymentMethod !== null && formattedPaymentMethod !== void 0 ? formattedPaymentMethod : {}, icon = _a.icon, title = _a.title, description = _a.description, methodID = _a.methodID;
            return {
                text: title !== null && title !== void 0 ? title : '',
                description: description !== null && description !== void 0 ? description : '',
                icon: typeof icon === 'number' ? Expensicons_1.Bank : icon,
                methodID: methodID,
                value: CONST_1.default.PAYMENT_METHODS.BUSINESS_BANK_ACCOUNT,
            };
        });
    }
    var getPaymentSubitems = (0, react_1.useCallback)(function (payAsBusiness) {
        var requiredAccountType = payAsBusiness ? CONST_1.default.BANK_ACCOUNT.TYPE.BUSINESS : CONST_1.default.BANK_ACCOUNT.TYPE.PERSONAL;
        return formattedPaymentMethods
            .filter(function (method) {
            var accountData = method === null || method === void 0 ? void 0 : method.accountData;
            return (accountData === null || accountData === void 0 ? void 0 : accountData.type) === requiredAccountType;
        })
            .map(function (formattedPaymentMethod) {
            var _a, _b;
            return ({
                text: (_a = formattedPaymentMethod === null || formattedPaymentMethod === void 0 ? void 0 : formattedPaymentMethod.title) !== null && _a !== void 0 ? _a : '',
                description: (_b = formattedPaymentMethod === null || formattedPaymentMethod === void 0 ? void 0 : formattedPaymentMethod.description) !== null && _b !== void 0 ? _b : '',
                icon: formattedPaymentMethod === null || formattedPaymentMethod === void 0 ? void 0 : formattedPaymentMethod.icon,
                shouldUpdateSelectedIndex: true,
                iconStyles: formattedPaymentMethod === null || formattedPaymentMethod === void 0 ? void 0 : formattedPaymentMethod.iconStyles,
                iconHeight: formattedPaymentMethod === null || formattedPaymentMethod === void 0 ? void 0 : formattedPaymentMethod.iconSize,
                iconWidth: formattedPaymentMethod === null || formattedPaymentMethod === void 0 ? void 0 : formattedPaymentMethod.iconSize,
                key: CONST_1.default.IOU.PAYMENT_TYPE.EXPENSIFY,
                additionalData: {
                    payAsBusiness: payAsBusiness,
                    methodID: formattedPaymentMethod.methodID,
                    paymentMethod: formattedPaymentMethod.accountType,
                },
            });
        });
    }, [formattedPaymentMethods]);
    var latestBankItems = getLatestBankAccountItem();
    var personalBankAccountList = formattedPaymentMethods.filter(function (ba) { var _a; return ((_a = ba.accountData) === null || _a === void 0 ? void 0 : _a.type) === CONST_1.default.BANK_ACCOUNT.TYPE.PERSONAL; });
    var bulkPayButtonOptions = (0, react_1.useMemo)(function () {
        var buttonOptions = [];
        var paymentMethods = (0, SettlementButtonUtils_1.getSettlementButtonPaymentMethods)(hasActivatedWallet, translate);
        if (!selectedReportID || !selectedPolicyID) {
            return undefined;
        }
        if (shouldShowBusinessBankAccountOptions) {
            buttonOptions.push(paymentMethods[CONST_1.default.PAYMENT_METHODS.BUSINESS_BANK_ACCOUNT]);
        }
        if (canUseWallet) {
            if (personalBankAccountList.length && canUsePersonalBankAccount) {
                buttonOptions.push({
                    text: translate('iou.settleWallet', { formattedAmount: '' }),
                    key: CONST_1.default.PAYMENT_METHODS.PERSONAL_BANK_ACCOUNT,
                    icon: Expensicons_1.Wallet,
                });
            }
            else if (canUsePersonalBankAccount) {
                buttonOptions.push(paymentMethods[CONST_1.default.PAYMENT_METHODS.PERSONAL_BANK_ACCOUNT]);
            }
            if (activeAdminPolicies.length === 0 && !isPersonalOnlyOption) {
                buttonOptions.push(paymentMethods[CONST_1.default.PAYMENT_METHODS.BUSINESS_BANK_ACCOUNT]);
            }
        }
        if ((hasMultiplePolicies || hasSinglePolicy) && canUseWallet && !isPersonalOnlyOption) {
            activeAdminPolicies.forEach(function (activePolicy) {
                var policyName = activePolicy.name;
                buttonOptions.push({
                    text: translate('iou.payWithPolicy', { policyName: (0, truncate_1.default)(policyName, { length: CONST_1.default.ADDITIONAL_ALLOWED_CHARACTERS }), formattedAmount: '' }),
                    icon: Expensicons_1.Building,
                    key: activePolicy.id,
                    shouldUpdateSelectedIndex: false,
                });
            });
        }
        if (shouldShowPayElsewhereOption) {
            buttonOptions.push(paymentMethods[CONST_1.default.IOU.PAYMENT_TYPE.ELSEWHERE]);
        }
        if (isInvoiceReport) {
            var isCurrencySupported_1 = (0, Policy_1.isCurrencySupportedForDirectReimbursement)(currency);
            var getInvoicesOptions = function (payAsBusiness) {
                var addBankAccountItem = {
                    text: translate('bankAccount.addBankAccount'),
                    icon: Expensicons_1.Bank,
                    onSelected: function () {
                        var bankAccountRoute = (0, ReportUtils_1.getBankAccountRoute)(chatReport);
                        Navigation_1.default.navigate(bankAccountRoute);
                    },
                };
                return __spreadArray(__spreadArray(__spreadArray([], (isCurrencySupported_1 ? getPaymentSubitems(payAsBusiness) : []), true), (isCurrencySupported_1 ? [addBankAccountItem] : []), true), [
                    {
                        text: translate('iou.payElsewhere', { formattedAmount: '' }),
                        icon: Expensicons_1.Cash,
                        key: CONST_1.default.IOU.PAYMENT_TYPE.ELSEWHERE,
                        additionalData: {
                            payAsBusiness: payAsBusiness,
                        },
                    },
                ], false);
            };
            if ((0, ReportUtils_1.isIndividualInvoiceRoom)(chatReport)) {
                buttonOptions.push({
                    text: translate('iou.settlePersonal', { formattedAmount: formattedAmount }),
                    icon: Expensicons_1.User,
                    backButtonText: translate('iou.individual'),
                    subMenuItems: getInvoicesOptions(false),
                });
                buttonOptions.push({
                    text: translate('iou.settleBusiness', { formattedAmount: formattedAmount }),
                    icon: Expensicons_1.Building,
                    backButtonText: translate('iou.business'),
                    subMenuItems: getInvoicesOptions(true),
                });
            }
            else {
                // If there is pay as business option, we should show the submenu items instead.
                buttonOptions.push.apply(buttonOptions, getInvoicesOptions(true));
            }
        }
        return buttonOptions;
    }, [
        hasActivatedWallet,
        translate,
        selectedReportID,
        selectedPolicyID,
        shouldShowBusinessBankAccountOptions,
        canUseWallet,
        hasMultiplePolicies,
        hasSinglePolicy,
        isPersonalOnlyOption,
        shouldShowPayElsewhereOption,
        isInvoiceReport,
        personalBankAccountList.length,
        canUsePersonalBankAccount,
        activeAdminPolicies,
        currency,
        chatReport,
        getPaymentSubitems,
        formattedAmount,
    ]);
    return {
        bulkPayButtonOptions: bulkPayButtonOptions,
        latestBankItems: latestBankItems,
    };
}
exports.default = useBulkPayOptions;
