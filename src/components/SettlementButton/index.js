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
var Account_1 = require("@selectors/Account");
var isEmpty_1 = require("lodash/isEmpty");
var truncate_1 = require("lodash/truncate");
var react_1 = require("react");
var ButtonWithDropdownMenu_1 = require("@components/ButtonWithDropdownMenu");
var Expensicons = require("@components/Icon/Expensicons");
var Expensicons_1 = require("@components/Icon/Expensicons");
var KYCWall_1 = require("@components/KYCWall");
var KYCWallContext_1 = require("@components/KYCWall/KYCWallContext");
var LockedAccountModalProvider_1 = require("@components/LockedAccountModalProvider");
var useCurrentUserPersonalDetails_1 = require("@hooks/useCurrentUserPersonalDetails");
var useLocalize_1 = require("@hooks/useLocalize");
var useNetwork_1 = require("@hooks/useNetwork");
var useOnyx_1 = require("@hooks/useOnyx");
var usePermissions_1 = require("@hooks/usePermissions");
var usePolicy_1 = require("@hooks/usePolicy");
var useThemeStyles_1 = require("@hooks/useThemeStyles");
var Policy_1 = require("@libs/actions/Policy/Policy");
var Search_1 = require("@libs/actions/Search");
var Navigation_1 = require("@libs/Navigation/Navigation");
var PaymentUtils_1 = require("@libs/PaymentUtils");
var PolicyUtils_1 = require("@libs/PolicyUtils");
var ReportActionsUtils_1 = require("@libs/ReportActionsUtils");
var ReportUtils_1 = require("@libs/ReportUtils");
var SettlementButtonUtils_1 = require("@libs/SettlementButtonUtils");
var SubscriptionUtils_1 = require("@libs/SubscriptionUtils");
var BankAccounts_1 = require("@userActions/BankAccounts");
var IOU_1 = require("@userActions/IOU");
var CONST_1 = require("@src/CONST");
var ONYXKEYS_1 = require("@src/ONYXKEYS");
var ROUTES_1 = require("@src/ROUTES");
var EmptyObject_1 = require("@src/types/utils/EmptyObject");
var isLoadingOnyxValue_1 = require("@src/types/utils/isLoadingOnyxValue");
function SettlementButton(_a) {
    var _b, _c;
    var _d = _a.addDebitCardRoute, addDebitCardRoute = _d === void 0 ? ROUTES_1.default.IOU_SEND_ADD_DEBIT_CARD : _d, _e = _a.kycWallAnchorAlignment, kycWallAnchorAlignment = _e === void 0 ? {
        horizontal: CONST_1.default.MODAL.ANCHOR_ORIGIN_HORIZONTAL.LEFT, // button is at left, so horizontal anchor is at LEFT
        vertical: CONST_1.default.MODAL.ANCHOR_ORIGIN_VERTICAL.TOP, // we assume that popover menu opens below the button, anchor is at TOP
    } : _e, _f = _a.paymentMethodDropdownAnchorAlignment, paymentMethodDropdownAnchorAlignment = _f === void 0 ? {
        horizontal: CONST_1.default.MODAL.ANCHOR_ORIGIN_HORIZONTAL.RIGHT, // caret for dropdown is at right, so horizontal anchor is at RIGHT
        vertical: CONST_1.default.MODAL.ANCHOR_ORIGIN_VERTICAL.TOP, // we assume that popover menu opens below the button, anchor is at TOP
    } : _f, _g = _a.buttonSize, buttonSize = _g === void 0 ? CONST_1.default.DROPDOWN_BUTTON_SIZE.MEDIUM : _g, _h = _a.extraSmall, extraSmall = _h === void 0 ? false : _h, _j = _a.chatReportID, chatReportID = _j === void 0 ? '' : _j, _k = _a.currency, currency = _k === void 0 ? CONST_1.default.CURRENCY.USD : _k, enablePaymentsRoute = _a.enablePaymentsRoute, iouReport = _a.iouReport, _l = _a.isDisabled, isDisabled = _l === void 0 ? false : _l, _m = _a.shouldStayNormalOnDisable, shouldStayNormalOnDisable = _m === void 0 ? false : _m, _o = _a.isLoading, isLoading = _o === void 0 ? false : _o, _p = _a.formattedAmount, formattedAmount = _p === void 0 ? '' : _p, onPress = _a.onPress, _q = _a.pressOnEnter, pressOnEnter = _q === void 0 ? false : _q, _r = _a.policyID, policyID = _r === void 0 ? '-1' : _r, _s = _a.shouldHidePaymentOptions, shouldHidePaymentOptions = _s === void 0 ? false : _s, _t = _a.shouldShowApproveButton, shouldShowApproveButton = _t === void 0 ? false : _t, _u = _a.shouldDisableApproveButton, shouldDisableApproveButton = _u === void 0 ? false : _u, style = _a.style, disabledStyle = _a.disabledStyle, _v = _a.shouldShowPersonalBankAccountOption, shouldShowPersonalBankAccountOption = _v === void 0 ? false : _v, _w = _a.enterKeyEventListenerPriority, enterKeyEventListenerPriority = _w === void 0 ? 0 : _w, confirmApproval = _a.confirmApproval, _x = _a.useKeyboardShortcuts, useKeyboardShortcuts = _x === void 0 ? false : _x, onPaymentOptionsShow = _a.onPaymentOptionsShow, onPaymentOptionsHide = _a.onPaymentOptionsHide, onlyShowPayElsewhere = _a.onlyShowPayElsewhere, wrapperStyle = _a.wrapperStyle, _y = _a.shouldUseShortForm, shouldUseShortForm = _y === void 0 ? false : _y, _z = _a.hasOnlyHeldExpenses, hasOnlyHeldExpenses = _z === void 0 ? false : _z;
    var styles = (0, useThemeStyles_1.default)();
    var _0 = (0, useLocalize_1.default)(), translate = _0.translate, localeCompare = _0.localeCompare;
    var isOffline = (0, useNetwork_1.default)().isOffline;
    var policy = (0, usePolicy_1.default)(policyID);
    var _1 = (0, useCurrentUserPersonalDetails_1.default)(), accountID = _1.accountID, email = _1.email;
    // The app would crash due to subscribing to the entire report collection if chatReportID is an empty string. So we should have a fallback ID here.
    // eslint-disable-next-line rulesdir/no-default-id-values
    var chatReport = (0, useOnyx_1.default)("".concat(ONYXKEYS_1.default.COLLECTION.REPORT).concat(chatReportID || CONST_1.default.DEFAULT_NUMBER_ID), { canBeMissing: true })[0];
    var isUserValidated = (0, useOnyx_1.default)(ONYXKEYS_1.default.ACCOUNT, { selector: Account_1.isUserValidatedSelector, canBeMissing: true })[0];
    var policyEmployeeAccountIDs = (0, PolicyUtils_1.getPolicyEmployeeAccountIDs)(policy, accountID);
    var reportBelongsToWorkspace = policyID ? (0, ReportUtils_1.doesReportBelongToWorkspace)(chatReport, policyEmployeeAccountIDs, policyID) : false;
    var policyIDKey = reportBelongsToWorkspace ? policyID : ((_b = iouReport === null || iouReport === void 0 ? void 0 : iouReport.policyID) !== null && _b !== void 0 ? _b : CONST_1.default.POLICY.ID_FAKE);
    var userWallet = (0, useOnyx_1.default)(ONYXKEYS_1.default.USER_WALLET, { canBeMissing: true })[0];
    var hasActivatedWallet = [CONST_1.default.WALLET.TIER_NAME.GOLD, CONST_1.default.WALLET.TIER_NAME.PLATINUM].includes((_c = userWallet === null || userWallet === void 0 ? void 0 : userWallet.tierName) !== null && _c !== void 0 ? _c : '');
    var _2 = (0, useOnyx_1.default)(ONYXKEYS_1.default.NVP_LAST_PAYMENT_METHOD, { canBeMissing: true }), lastPaymentMethods = _2[0], lastPaymentMethodResult = _2[1];
    var lastPaymentMethod = (0, react_1.useMemo)(function () {
        if (!(iouReport === null || iouReport === void 0 ? void 0 : iouReport.type)) {
            return;
        }
        return (0, Search_1.getLastPolicyPaymentMethod)(policyIDKey, lastPaymentMethods, iouReport === null || iouReport === void 0 ? void 0 : iouReport.type, (0, ReportUtils_1.isIOUReport)(iouReport));
    }, [policyIDKey, iouReport, lastPaymentMethods]);
    var lastBankAccountID = (0, Search_1.getLastPolicyBankAccountID)(policyIDKey, lastPaymentMethods, iouReport === null || iouReport === void 0 ? void 0 : iouReport.type);
    var fundList = (0, useOnyx_1.default)(ONYXKEYS_1.default.FUND_LIST, { canBeMissing: true })[0];
    var policies = (0, useOnyx_1.default)(ONYXKEYS_1.default.COLLECTION.POLICY, { canBeMissing: true })[0];
    var activeAdminPolicies = (0, PolicyUtils_1.getActiveAdminWorkspaces)(policies, accountID.toString()).sort(function (a, b) { return localeCompare(a.name || '', b.name || ''); });
    var reportID = iouReport === null || iouReport === void 0 ? void 0 : iouReport.reportID;
    var hasPreferredPaymentMethod = !!lastPaymentMethod;
    var isLoadingLastPaymentMethod = (0, isLoadingOnyxValue_1.default)(lastPaymentMethodResult);
    var lastPaymentPolicy = (0, usePolicy_1.default)(lastPaymentMethod);
    var bankAccountList = (0, useOnyx_1.default)(ONYXKEYS_1.default.BANK_ACCOUNT_LIST, { canBeMissing: true })[0];
    var bankAccount = bankAccountList === null || bankAccountList === void 0 ? void 0 : bankAccountList[lastBankAccountID !== null && lastBankAccountID !== void 0 ? lastBankAccountID : CONST_1.default.DEFAULT_NUMBER_ID];
    var isExpenseReport = (0, ReportUtils_1.isExpenseReport)(iouReport);
    // whether the user has single policy and the expense is p2p
    var hasSinglePolicy = !isExpenseReport && activeAdminPolicies.length === 1;
    var hasMultiplePolicies = !isExpenseReport && activeAdminPolicies.length > 1;
    var formattedPaymentMethods = (0, PaymentUtils_1.formatPaymentMethods)(bankAccountList !== null && bankAccountList !== void 0 ? bankAccountList : {}, fundList !== null && fundList !== void 0 ? fundList : {}, styles, translate);
    var hasIntentToPay = ((formattedPaymentMethods.length === 1 && (0, ReportUtils_1.isIOUReport)(iouReport)) || !!(policy === null || policy === void 0 ? void 0 : policy.achAccount)) && !lastPaymentMethod;
    var isBetaEnabled = (0, usePermissions_1.default)().isBetaEnabled;
    var transactionViolations = (0, useOnyx_1.default)(ONYXKEYS_1.default.COLLECTION.TRANSACTION_VIOLATIONS, { canBeMissing: true })[0];
    var isASAPSubmitBetaEnabled = isBetaEnabled(CONST_1.default.BETAS.ASAP_SUBMIT);
    var hasViolations = (0, ReportUtils_1.hasViolations)(iouReport === null || iouReport === void 0 ? void 0 : iouReport.reportID, transactionViolations);
    var isInvoiceReport = (!(0, EmptyObject_1.isEmptyObject)(iouReport) && (0, ReportUtils_1.isInvoiceReport)(iouReport)) || false;
    var _3 = (0, react_1.useContext)(LockedAccountModalProvider_1.LockedAccountContext), isAccountLocked = _3.isAccountLocked, showLockedAccountModal = _3.showLockedAccountModal;
    var kycWallRef = (0, react_1.useContext)(KYCWallContext_1.KYCWallContext);
    var shouldShowPayWithExpensifyOption = !shouldHidePaymentOptions;
    var shouldShowPayElsewhereOption = !shouldHidePaymentOptions && !isInvoiceReport;
    function getLatestBankAccountItem() {
        var _a;
        if (!((_a = policy === null || policy === void 0 ? void 0 : policy.achAccount) === null || _a === void 0 ? void 0 : _a.bankAccountID)) {
            return;
        }
        var policyBankAccounts = formattedPaymentMethods.filter(function (method) { var _a; return method.methodID === ((_a = policy === null || policy === void 0 ? void 0 : policy.achAccount) === null || _a === void 0 ? void 0 : _a.bankAccountID); });
        return policyBankAccounts.map(function (formattedPaymentMethod) {
            var _a = formattedPaymentMethod !== null && formattedPaymentMethod !== void 0 ? formattedPaymentMethod : {}, icon = _a.icon, iconStyles = _a.iconStyles, iconSize = _a.iconSize, title = _a.title, description = _a.description, methodID = _a.methodID;
            return {
                text: title !== null && title !== void 0 ? title : '',
                description: description !== null && description !== void 0 ? description : '',
                icon: typeof icon === 'number' ? Expensicons_1.Bank : icon,
                iconStyles: typeof icon === 'number' ? undefined : iconStyles,
                iconSize: typeof icon === 'number' ? undefined : iconSize,
                onSelected: function () { return onPress(CONST_1.default.IOU.PAYMENT_TYPE.EXPENSIFY, true, undefined); },
                methodID: methodID,
                value: CONST_1.default.PAYMENT_METHODS.BUSINESS_BANK_ACCOUNT,
            };
        });
    }
    function getLatestPersonalBankAccount() {
        return formattedPaymentMethods.filter(function (ba) { var _a; return ((_a = ba.accountData) === null || _a === void 0 ? void 0 : _a.type) === CONST_1.default.BANK_ACCOUNT.TYPE.PERSONAL; });
    }
    var checkForNecessaryAction = (0, react_1.useCallback)(function () {
        if (isAccountLocked) {
            showLockedAccountModal();
            return true;
        }
        if (!isUserValidated) {
            (0, SettlementButtonUtils_1.handleUnvalidatedUserNavigation)(chatReportID, reportID);
            return true;
        }
        if (policy && (0, SubscriptionUtils_1.shouldRestrictUserBillableActions)(policy.id)) {
            Navigation_1.default.navigate(ROUTES_1.default.RESTRICTED_ACTION.getRoute(policy.id));
            return true;
        }
        return false;
    }, [policy, isAccountLocked, isUserValidated, chatReportID, reportID, showLockedAccountModal]);
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
                onSelected: function () {
                    if (checkForNecessaryAction()) {
                        return;
                    }
                    onPress(CONST_1.default.IOU.PAYMENT_TYPE.EXPENSIFY, payAsBusiness, formattedPaymentMethod.methodID, formattedPaymentMethod.accountType, undefined);
                },
                iconStyles: formattedPaymentMethod === null || formattedPaymentMethod === void 0 ? void 0 : formattedPaymentMethod.iconStyles,
                iconHeight: formattedPaymentMethod === null || formattedPaymentMethod === void 0 ? void 0 : formattedPaymentMethod.iconSize,
                iconWidth: formattedPaymentMethod === null || formattedPaymentMethod === void 0 ? void 0 : formattedPaymentMethod.iconSize,
                value: CONST_1.default.IOU.PAYMENT_TYPE.EXPENSIFY,
            });
        });
    }, [formattedPaymentMethods, onPress, checkForNecessaryAction]);
    var personalBankAccountList = getLatestPersonalBankAccount();
    var latestBankItem = getLatestBankAccountItem();
    var paymentButtonOptions = (0, react_1.useMemo)(function () {
        var _a, _b, _c, _d, _e, _f, _g;
        var buttonOptions = [];
        var paymentMethods = (0, SettlementButtonUtils_1.getSettlementButtonPaymentMethods)(hasActivatedWallet, translate);
        var shortFormPayElsewhereButton = {
            text: translate('iou.pay'),
            icon: Expensicons.CheckCircle,
            value: CONST_1.default.IOU.PAYMENT_TYPE.ELSEWHERE,
            shouldUpdateSelectedIndex: false,
        };
        var approveButtonOption = {
            text: translate('iou.approve', { formattedAmount: formattedAmount }),
            icon: Expensicons.ThumbsUp,
            value: CONST_1.default.IOU.REPORT_ACTION_TYPE.APPROVE,
            disabled: !!shouldDisableApproveButton,
        };
        var canUseWallet = !isExpenseReport && !isInvoiceReport && currency === CONST_1.default.CURRENCY.USD;
        var canUseBusinessBankAccount = isExpenseReport || ((0, ReportUtils_1.isIOUReport)(iouReport) && reportID && !(0, ReportActionsUtils_1.hasRequestFromCurrentAccount)(reportID, accountID !== null && accountID !== void 0 ? accountID : CONST_1.default.DEFAULT_NUMBER_ID));
        var canUsePersonalBankAccount = shouldShowPersonalBankAccountOption || (0, ReportUtils_1.isIOUReport)(iouReport);
        var isPersonalOnlyOption = canUsePersonalBankAccount && !canUseBusinessBankAccount;
        // Only show the Approve button if the user cannot pay the expense
        if (shouldHidePaymentOptions && shouldShowApproveButton) {
            return [approveButtonOption];
        }
        if (onlyShowPayElsewhere) {
            return [shouldUseShortForm ? shortFormPayElsewhereButton : paymentMethods[CONST_1.default.IOU.PAYMENT_TYPE.ELSEWHERE]];
        }
        // To achieve the one tap pay experience we need to choose the correct payment type as default.
        if (canUseWallet) {
            if (personalBankAccountList.length && canUsePersonalBankAccount) {
                buttonOptions.push({
                    text: translate('iou.settleWallet', { formattedAmount: '' }),
                    value: CONST_1.default.PAYMENT_METHODS.PERSONAL_BANK_ACCOUNT,
                    icon: Expensicons.Wallet,
                });
            }
            else if (canUsePersonalBankAccount) {
                buttonOptions.push(paymentMethods[CONST_1.default.PAYMENT_METHODS.PERSONAL_BANK_ACCOUNT]);
            }
            if (activeAdminPolicies.length === 0 && !isPersonalOnlyOption) {
                buttonOptions.push(paymentMethods[CONST_1.default.PAYMENT_METHODS.BUSINESS_BANK_ACCOUNT]);
            }
        }
        var shouldShowBusinessBankAccountOptions = isExpenseReport && shouldShowPayWithExpensifyOption && !isPersonalOnlyOption;
        if (shouldShowBusinessBankAccountOptions) {
            if (!(0, isEmpty_1.default)(latestBankItem) && latestBankItem) {
                buttonOptions.push({
                    text: (_b = (_a = latestBankItem.at(0)) === null || _a === void 0 ? void 0 : _a.text) !== null && _b !== void 0 ? _b : '',
                    icon: (_c = latestBankItem.at(0)) === null || _c === void 0 ? void 0 : _c.icon,
                    iconStyles: (_d = latestBankItem.at(0)) === null || _d === void 0 ? void 0 : _d.iconStyles,
                    iconWidth: (_e = latestBankItem.at(0)) === null || _e === void 0 ? void 0 : _e.iconSize,
                    iconHeight: (_f = latestBankItem.at(0)) === null || _f === void 0 ? void 0 : _f.iconSize,
                    value: CONST_1.default.PAYMENT_METHODS.BUSINESS_BANK_ACCOUNT,
                    description: (_g = latestBankItem.at(0)) === null || _g === void 0 ? void 0 : _g.description,
                });
            }
            else {
                buttonOptions.push(paymentMethods[CONST_1.default.PAYMENT_METHODS.BUSINESS_BANK_ACCOUNT]);
            }
        }
        if ((hasMultiplePolicies || hasSinglePolicy) && canUseWallet && !isPersonalOnlyOption) {
            activeAdminPolicies.forEach(function (activePolicy) {
                var policyName = activePolicy.name;
                buttonOptions.push({
                    text: translate('iou.payWithPolicy', { policyName: (0, truncate_1.default)(policyName, { length: CONST_1.default.ADDITIONAL_ALLOWED_CHARACTERS }), formattedAmount: '' }),
                    icon: Expensicons.Building,
                    value: activePolicy.id,
                    shouldUpdateSelectedIndex: false,
                });
            });
        }
        if (shouldShowPayElsewhereOption) {
            buttonOptions.push(__assign(__assign({}, paymentMethods[CONST_1.default.IOU.PAYMENT_TYPE.ELSEWHERE]), (!buttonOptions.length && shouldUseShortForm ? { text: translate('iou.pay') } : {})));
        }
        if (isInvoiceReport) {
            var isCurrencySupported_1 = (0, Policy_1.isCurrencySupportedForDirectReimbursement)(currency);
            var getInvoicesOptions = function (payAsBusiness) {
                var addBankAccountItem = {
                    text: translate('bankAccount.addBankAccount'),
                    icon: Expensicons.Bank,
                    onSelected: function () {
                        var bankAccountRoute = (0, ReportUtils_1.getBankAccountRoute)(chatReport);
                        Navigation_1.default.navigate(bankAccountRoute);
                    },
                    value: CONST_1.default.IOU.PAYMENT_TYPE.ELSEWHERE,
                };
                return __spreadArray(__spreadArray(__spreadArray([], (isCurrencySupported_1 ? getPaymentSubitems(payAsBusiness) : []), true), (isCurrencySupported_1 ? [addBankAccountItem] : []), true), [
                    {
                        text: translate('iou.payElsewhere', { formattedAmount: '' }),
                        icon: Expensicons.Cash,
                        value: CONST_1.default.IOU.PAYMENT_TYPE.ELSEWHERE,
                        shouldUpdateSelectedIndex: true,
                        onSelected: function () {
                            if (checkForNecessaryAction()) {
                                return;
                            }
                            onPress(CONST_1.default.IOU.PAYMENT_TYPE.ELSEWHERE, payAsBusiness, undefined);
                        },
                    },
                ], false);
            };
            if ((0, ReportUtils_1.isIndividualInvoiceRoom)(chatReport)) {
                buttonOptions.push({
                    text: translate('iou.settlePersonal', { formattedAmount: formattedAmount }),
                    icon: Expensicons.User,
                    value: hasIntentToPay ? CONST_1.default.IOU.PAYMENT_TYPE.EXPENSIFY : (lastPaymentMethod !== null && lastPaymentMethod !== void 0 ? lastPaymentMethod : CONST_1.default.IOU.PAYMENT_TYPE.ELSEWHERE),
                    backButtonText: translate('iou.individual'),
                    subMenuItems: getInvoicesOptions(false),
                });
                buttonOptions.push({
                    text: translate('iou.settleBusiness', { formattedAmount: formattedAmount }),
                    icon: Expensicons.Building,
                    value: hasIntentToPay ? CONST_1.default.IOU.PAYMENT_TYPE.EXPENSIFY : (lastPaymentMethod !== null && lastPaymentMethod !== void 0 ? lastPaymentMethod : CONST_1.default.IOU.PAYMENT_TYPE.ELSEWHERE),
                    backButtonText: translate('iou.business'),
                    subMenuItems: getInvoicesOptions(true),
                });
            }
            else {
                // If there is pay as business option, we should show the submenu items instead.
                buttonOptions.push.apply(buttonOptions, getInvoicesOptions(true));
            }
        }
        if (shouldShowApproveButton) {
            buttonOptions.push(approveButtonOption);
        }
        return buttonOptions;
        // We don't want to reorder the options when the preferred payment method changes while the button is still visible except for component initialization when the last payment method is not initialized yet.
        // We need to be sure that onPress should be wrapped in an useCallback to prevent unnecessary updates.
        // eslint-disable-next-line react-compiler/react-compiler, react-hooks/exhaustive-deps
    }, [
        isLoadingLastPaymentMethod,
        iouReport,
        translate,
        formattedAmount,
        shouldDisableApproveButton,
        isInvoiceReport,
        currency,
        shouldHidePaymentOptions,
        shouldShowApproveButton,
        shouldShowPayWithExpensifyOption,
        shouldShowPayElsewhereOption,
        chatReport,
        onPress,
        onlyShowPayElsewhere,
        latestBankItem,
        activeAdminPolicies,
        checkForNecessaryAction,
    ]);
    var selectPaymentType = function (event, iouPaymentType) {
        var _a, _b;
        if (iouPaymentType === CONST_1.default.IOU.REPORT_ACTION_TYPE.APPROVE) {
            if (confirmApproval) {
                confirmApproval();
            }
            else {
                (0, IOU_1.approveMoneyRequest)(iouReport, policy, accountID, email !== null && email !== void 0 ? email : '', hasViolations, isASAPSubmitBetaEnabled, false);
            }
            return;
        }
        if (isInvoiceReport) {
            // if user has intent to pay, we should get the only bank account information to pay the invoice.
            if (hasIntentToPay) {
                var currentBankInformation = formattedPaymentMethods.at(0);
                onPress(CONST_1.default.IOU.PAYMENT_TYPE.EXPENSIFY, ((_a = currentBankInformation.accountData) === null || _a === void 0 ? void 0 : _a.type) === CONST_1.default.BANK_ACCOUNT.TYPE.BUSINESS, currentBankInformation.methodID, currentBankInformation.accountType, undefined);
                return;
            }
            var isBusinessInvoice = ((_b = bankAccount === null || bankAccount === void 0 ? void 0 : bankAccount.accountData) === null || _b === void 0 ? void 0 : _b.type) === CONST_1.default.BANK_ACCOUNT.TYPE.BUSINESS || (0, ReportUtils_1.isBusinessInvoiceRoom)(chatReport);
            if (iouPaymentType === CONST_1.default.IOU.PAYMENT_TYPE.ELSEWHERE) {
                onPress(iouPaymentType, isBusinessInvoice);
                return;
            }
            onPress(iouPaymentType, isBusinessInvoice, lastBankAccountID, CONST_1.default.PAYMENT_METHODS.PERSONAL_BANK_ACCOUNT, policyIDKey);
        }
        else {
            onPress(iouPaymentType, false);
        }
    };
    var selectPaymentMethod = function (event, paymentType, triggerKYCFlow, paymentMethod, selectedPolicy) {
        triggerKYCFlow({
            event: event,
            iouPaymentType: paymentType,
            paymentMethod: paymentMethod,
            policy: selectedPolicy !== null && selectedPolicy !== void 0 ? selectedPolicy : (event ? lastPaymentPolicy : undefined),
        });
        if (paymentType === CONST_1.default.IOU.PAYMENT_TYPE.EXPENSIFY || paymentType === CONST_1.default.IOU.PAYMENT_TYPE.VBBA) {
            (0, BankAccounts_1.setPersonalBankAccountContinueKYCOnSuccess)(ROUTES_1.default.ENABLE_PAYMENTS);
        }
    };
    var getCustomText = function () {
        if (shouldUseShortForm) {
            return translate('iou.pay');
        }
        if (lastPaymentMethod === CONST_1.default.IOU.PAYMENT_TYPE.ELSEWHERE) {
            return translate('iou.payElsewhere', { formattedAmount: formattedAmount });
        }
        return translate('iou.settlePayment', { formattedAmount: formattedAmount });
    };
    var getSecondaryText = function () {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p;
        if (shouldUseShortForm ||
            lastPaymentMethod === CONST_1.default.IOU.PAYMENT_TYPE.ELSEWHERE ||
            (paymentButtonOptions.length === 1 && paymentButtonOptions.every(function (option) { return option.value === CONST_1.default.IOU.PAYMENT_TYPE.ELSEWHERE; })) ||
            (shouldHidePaymentOptions && (shouldShowApproveButton || onlyShowPayElsewhere))) {
            return undefined;
        }
        if (lastPaymentPolicy) {
            return lastPaymentPolicy.name;
        }
        var bankAccountToDisplay = hasIntentToPay ? formattedPaymentMethods.at(0) : bankAccount;
        if (lastPaymentMethod === CONST_1.default.IOU.PAYMENT_TYPE.EXPENSIFY || (hasIntentToPay && (isExpenseReport || isInvoiceReport))) {
            if (isInvoiceReport) {
                var isBusinessBankAccount = ((_a = bankAccountToDisplay === null || bankAccountToDisplay === void 0 ? void 0 : bankAccountToDisplay.accountData) === null || _a === void 0 ? void 0 : _a.type) === CONST_1.default.BANK_ACCOUNT.TYPE.BUSINESS;
                return translate(isBusinessBankAccount ? 'iou.invoiceBusinessBank' : 'iou.invoicePersonalBank', {
                    lastFour: (_d = (_c = (_b = bankAccountToDisplay === null || bankAccountToDisplay === void 0 ? void 0 : bankAccountToDisplay.accountData) === null || _b === void 0 ? void 0 : _b.accountNumber) === null || _c === void 0 ? void 0 : _c.slice(-4)) !== null && _d !== void 0 ? _d : '',
                });
            }
            if (!personalBankAccountList.length) {
                return;
            }
            return translate('common.wallet');
        }
        if ((lastPaymentMethod === CONST_1.default.IOU.PAYMENT_TYPE.VBBA || hasIntentToPay) && !!(policy === null || policy === void 0 ? void 0 : policy.achAccount)) {
            if ((_e = policy === null || policy === void 0 ? void 0 : policy.achAccount) === null || _e === void 0 ? void 0 : _e.accountNumber) {
                return translate('paymentMethodList.bankAccountLastFour', { lastFour: (_g = (_f = policy === null || policy === void 0 ? void 0 : policy.achAccount) === null || _f === void 0 ? void 0 : _f.accountNumber) === null || _g === void 0 ? void 0 : _g.slice(-4) });
            }
            if (!((_h = bankAccountToDisplay === null || bankAccountToDisplay === void 0 ? void 0 : bankAccountToDisplay.accountData) === null || _h === void 0 ? void 0 : _h.accountNumber)) {
                return;
            }
            return translate('paymentMethodList.bankAccountLastFour', { lastFour: (_k = (_j = bankAccountToDisplay === null || bankAccountToDisplay === void 0 ? void 0 : bankAccountToDisplay.accountData) === null || _j === void 0 ? void 0 : _j.accountNumber) === null || _k === void 0 ? void 0 : _k.slice(-4) });
        }
        if (((_l = bankAccount === null || bankAccount === void 0 ? void 0 : bankAccount.accountData) === null || _l === void 0 ? void 0 : _l.type) === CONST_1.default.BANK_ACCOUNT.TYPE.BUSINESS && (0, ReportUtils_1.isExpenseReport)(iouReport)) {
            return translate('paymentMethodList.bankAccountLastFour', { lastFour: (_p = (_o = (_m = bankAccount === null || bankAccount === void 0 ? void 0 : bankAccount.accountData) === null || _m === void 0 ? void 0 : _m.accountNumber) === null || _o === void 0 ? void 0 : _o.slice(-4)) !== null && _p !== void 0 ? _p : '' });
        }
        return undefined;
    };
    var handlePaymentSelection = function (event, selectedOption, triggerKYCFlow) {
        if (checkForNecessaryAction()) {
            return;
        }
        var _a = (0, PaymentUtils_1.getActivePaymentType)(selectedOption, activeAdminPolicies, latestBankItem), paymentType = _a.paymentType, selectedPolicy = _a.selectedPolicy, shouldSelectPaymentMethod = _a.shouldSelectPaymentMethod;
        if (!!selectedPolicy || shouldSelectPaymentMethod) {
            selectPaymentMethod(event, paymentType, triggerKYCFlow, selectedOption, selectedPolicy);
            return;
        }
        selectPaymentType(event, selectedOption);
    };
    var customText = getCustomText();
    var secondaryText = (0, truncate_1.default)(getSecondaryText(), { length: CONST_1.default.FORM_CHARACTER_LIMIT });
    var defaultSelectedIndex = paymentButtonOptions.findIndex(function (paymentOption) {
        var _a;
        if (lastPaymentMethod === CONST_1.default.IOU.PAYMENT_TYPE.ELSEWHERE) {
            return paymentOption.value === CONST_1.default.IOU.PAYMENT_TYPE.ELSEWHERE;
        }
        if (latestBankItem === null || latestBankItem === void 0 ? void 0 : latestBankItem.length) {
            return paymentOption.value === ((_a = latestBankItem.at(0)) === null || _a === void 0 ? void 0 : _a.value);
        }
        if (lastPaymentPolicy === null || lastPaymentPolicy === void 0 ? void 0 : lastPaymentPolicy.id) {
            return paymentOption.value === lastPaymentPolicy.id;
        }
        return false;
    });
    var shouldUseSplitButton = hasPreferredPaymentMethod || !!lastPaymentPolicy || ((isExpenseReport || isInvoiceReport) && hasIntentToPay);
    var shouldLimitWidth = shouldUseShortForm && shouldUseSplitButton && !paymentButtonOptions.length;
    return (<KYCWall_1.default ref={kycWallRef} onSuccessfulKYC={function (paymentType) { return onPress(paymentType, undefined, undefined); }} enablePaymentsRoute={enablePaymentsRoute} addDebitCardRoute={addDebitCardRoute} isDisabled={isOffline} source={CONST_1.default.KYC_WALL_SOURCE.REPORT} chatReportID={chatReportID} addBankAccountRoute={isExpenseReport ? ROUTES_1.default.BANK_ACCOUNT_WITH_STEP_TO_OPEN.getRoute(iouReport === null || iouReport === void 0 ? void 0 : iouReport.policyID, undefined, Navigation_1.default.getActiveRoute()) : undefined} iouReport={iouReport} policy={lastPaymentPolicy} anchorAlignment={kycWallAnchorAlignment} shouldShowPersonalBankAccountOption={shouldShowPersonalBankAccountOption}>
            {function (triggerKYCFlow, buttonRef) { return (<ButtonWithDropdownMenu_1.default onOptionsMenuShow={onPaymentOptionsShow} onOptionsMenuHide={onPaymentOptionsHide} buttonRef={buttonRef} shouldAlwaysShowDropdownMenu={isInvoiceReport && !onlyShowPayElsewhere} customText={customText} menuHeaderText={isInvoiceReport ? translate('workspace.invoices.paymentMethods.chooseInvoiceMethod') : undefined} isSplitButton={shouldUseSplitButton} isDisabled={isDisabled} shouldStayNormalOnDisable={shouldStayNormalOnDisable} isLoading={isLoading} defaultSelectedIndex={defaultSelectedIndex !== -1 ? defaultSelectedIndex : 0} onPress={function (event, iouPaymentType) { return handlePaymentSelection(event, iouPaymentType, triggerKYCFlow); }} success={!hasOnlyHeldExpenses} extraSmall={extraSmall} secondLineText={secondaryText} pressOnEnter={pressOnEnter} options={paymentButtonOptions} onOptionSelected={function (option) {
                if (paymentButtonOptions.length === 1) {
                    return;
                }
                handlePaymentSelection(undefined, option.value, triggerKYCFlow);
            }} style={style} shouldUseShortForm={shouldUseShortForm} shouldPopoverUseScrollView={paymentButtonOptions.length > 5} containerStyles={paymentButtonOptions.length > 5 ? styles.settlementButtonListContainer : {}} wrapperStyle={[wrapperStyle, shouldLimitWidth ? styles.settlementButtonShortFormWidth : {}]} disabledStyle={disabledStyle} buttonSize={buttonSize} anchorAlignment={paymentMethodDropdownAnchorAlignment} enterKeyEventListenerPriority={enterKeyEventListenerPriority} useKeyboardShortcuts={useKeyboardShortcuts} shouldUseModalPaddingStyle={paymentButtonOptions.length <= 5}/>); }}
        </KYCWall_1.default>);
}
SettlementButton.displayName = 'SettlementButton';
exports.default = SettlementButton;
