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
var native_1 = require("@react-navigation/native");
var fast_equals_1 = require("fast-equals");
var react_1 = require("react");
var react_native_1 = require("react-native");
var useCurrentUserPersonalDetails_1 = require("@hooks/useCurrentUserPersonalDetails");
var useDebouncedState_1 = require("@hooks/useDebouncedState");
var useLocalize_1 = require("@hooks/useLocalize");
var useMouseContext_1 = require("@hooks/useMouseContext");
var useOnyx_1 = require("@hooks/useOnyx");
var usePermissions_1 = require("@hooks/usePermissions");
var usePolicyForMovingExpenses_1 = require("@hooks/usePolicyForMovingExpenses");
var usePreferredPolicy_1 = require("@hooks/usePreferredPolicy");
var usePrevious_1 = require("@hooks/usePrevious");
var useThemeStyles_1 = require("@hooks/useThemeStyles");
var blurActiveElement_1 = require("@libs/Accessibility/blurActiveElement");
var IOU_1 = require("@libs/actions/IOU");
var CategoryUtils_1 = require("@libs/CategoryUtils");
var CurrencyUtils_1 = require("@libs/CurrencyUtils");
var DistanceRequestUtils_1 = require("@libs/DistanceRequestUtils");
var IOUUtils_1 = require("@libs/IOUUtils");
var Log_1 = require("@libs/Log");
var MoneyRequestUtils_1 = require("@libs/MoneyRequestUtils");
var Navigation_1 = require("@libs/Navigation/Navigation");
var OptionsListUtils_1 = require("@libs/OptionsListUtils");
var PolicyUtils_1 = require("@libs/PolicyUtils");
var ReportUtils_1 = require("@libs/ReportUtils");
var TagsOptionsListUtils_1 = require("@libs/TagsOptionsListUtils");
var TransactionUtils_1 = require("@libs/TransactionUtils");
var Policy_1 = require("@userActions/Policy/Policy");
var CONST_1 = require("@src/CONST");
var ONYXKEYS_1 = require("@src/ONYXKEYS");
var ROUTES_1 = require("@src/ROUTES");
var Button_1 = require("./Button");
var ButtonWithDropdownMenu_1 = require("./ButtonWithDropdownMenu");
var DelegateNoAccessModalProvider_1 = require("./DelegateNoAccessModalProvider");
var FormHelpMessage_1 = require("./FormHelpMessage");
var MoneyRequestAmountInput_1 = require("./MoneyRequestAmountInput");
var MoneyRequestConfirmationListFooter_1 = require("./MoneyRequestConfirmationListFooter");
var Pressable_1 = require("./Pressable");
var ProductTrainingContext_1 = require("./ProductTrainingContext");
var SelectionListWithSections_1 = require("./SelectionListWithSections");
var UserListItem_1 = require("./SelectionListWithSections/UserListItem");
var SettlementButton_1 = require("./SettlementButton");
var Text_1 = require("./Text");
var EducationalTooltip_1 = require("./Tooltip/EducationalTooltip");
var mileageRateSelector = function (policy) { return DistanceRequestUtils_1.default.getDefaultMileageRate(policy); };
function MoneyRequestConfirmationList(_a) {
    var _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q;
    var transaction = _a.transaction, onSendMoney = _a.onSendMoney, onConfirm = _a.onConfirm, _r = _a.iouType, iouType = _r === void 0 ? CONST_1.default.IOU.TYPE.SUBMIT : _r, iouAmount = _a.iouAmount, isDistanceRequest = _a.isDistanceRequest, isManualDistanceRequest = _a.isManualDistanceRequest, _s = _a.isPerDiemRequest, isPerDiemRequest = _s === void 0 ? false : _s, _t = _a.isPolicyExpenseChat, isPolicyExpenseChat = _t === void 0 ? false : _t, _u = _a.iouCategory, iouCategory = _u === void 0 ? '' : _u, _v = _a.shouldShowSmartScanFields, shouldShowSmartScanFields = _v === void 0 ? true : _v, isEditingSplitBill = _a.isEditingSplitBill, iouCurrencyCode = _a.iouCurrencyCode, isReceiptEditable = _a.isReceiptEditable, iouMerchant = _a.iouMerchant, selectedParticipantsProp = _a.selectedParticipants, payeePersonalDetailsProp = _a.payeePersonalDetails, _w = _a.isReadOnly, isReadOnly = _w === void 0 ? false : _w, policyID = _a.policyID, _x = _a.reportID, reportID = _x === void 0 ? '' : _x, _y = _a.receiptPath, receiptPath = _y === void 0 ? '' : _y, iouAttendees = _a.iouAttendees, iouComment = _a.iouComment, _z = _a.receiptFilename, receiptFilename = _z === void 0 ? '' : _z, iouCreated = _a.iouCreated, _0 = _a.iouIsBillable, iouIsBillable = _0 === void 0 ? false : _0, onToggleBillable = _a.onToggleBillable, hasSmartScanFailed = _a.hasSmartScanFailed, reportActionID = _a.reportActionID, _1 = _a.action, action = _1 === void 0 ? CONST_1.default.IOU.ACTION.CREATE : _1, _2 = _a.shouldDisplayReceipt, shouldDisplayReceipt = _2 === void 0 ? false : _2, _3 = _a.expensesNumber, expensesNumber = _3 === void 0 ? 0 : _3, isConfirmed = _a.isConfirmed, isConfirming = _a.isConfirming, onPDFLoadError = _a.onPDFLoadError, onPDFPassword = _a.onPDFPassword, _4 = _a.iouIsReimbursable, iouIsReimbursable = _4 === void 0 ? true : _4, onToggleReimbursable = _a.onToggleReimbursable, showRemoveExpenseConfirmModal = _a.showRemoveExpenseConfirmModal;
    var policyCategoriesReal = (0, useOnyx_1.default)("".concat(ONYXKEYS_1.default.COLLECTION.POLICY_CATEGORIES).concat(policyID), { canBeMissing: true })[0];
    var policyTags = (0, useOnyx_1.default)("".concat(ONYXKEYS_1.default.COLLECTION.POLICY_TAGS).concat(policyID), { canBeMissing: true })[0];
    var policyReal = (0, useOnyx_1.default)("".concat(ONYXKEYS_1.default.COLLECTION.POLICY).concat(policyID), { canBeMissing: true })[0];
    var policyDraft = (0, useOnyx_1.default)("".concat(ONYXKEYS_1.default.COLLECTION.POLICY_DRAFTS).concat(policyID), { canBeMissing: true })[0];
    var defaultMileageRateDraft = (0, useOnyx_1.default)("".concat(ONYXKEYS_1.default.COLLECTION.POLICY_DRAFTS).concat(policyID), {
        selector: mileageRateSelector,
        canBeMissing: true,
    })[0];
    var defaultMileageRateReal = (0, useOnyx_1.default)("".concat(ONYXKEYS_1.default.COLLECTION.POLICY).concat(policyID), {
        selector: mileageRateSelector,
        canBeMissing: true,
    })[0];
    var policyCategoriesDraft = (0, useOnyx_1.default)("".concat(ONYXKEYS_1.default.COLLECTION.POLICY_CATEGORIES_DRAFT).concat(policyID), { canBeMissing: true })[0];
    var lastSelectedDistanceRates = (0, useOnyx_1.default)(ONYXKEYS_1.default.NVP_LAST_SELECTED_DISTANCE_RATES, { canBeMissing: true })[0];
    var currencyList = (0, useOnyx_1.default)(ONYXKEYS_1.default.CURRENCY_LIST, { canBeMissing: false })[0];
    var isBetaEnabled = (0, usePermissions_1.default)().isBetaEnabled;
    var _5 = (0, react_1.useContext)(DelegateNoAccessModalProvider_1.DelegateNoAccessContext), isDelegateAccessRestricted = _5.isDelegateAccessRestricted, showDelegateNoAccessModal = _5.showDelegateNoAccessModal;
    var isTestReceipt = (0, react_1.useMemo)(function () {
        var _a, _b;
        return (_b = (_a = transaction === null || transaction === void 0 ? void 0 : transaction.receipt) === null || _a === void 0 ? void 0 : _a.isTestReceipt) !== null && _b !== void 0 ? _b : false;
    }, [(_b = transaction === null || transaction === void 0 ? void 0 : transaction.receipt) === null || _b === void 0 ? void 0 : _b.isTestReceipt]);
    var isTestDriveReceipt = (0, react_1.useMemo)(function () {
        var _a, _b;
        return (_b = (_a = transaction === null || transaction === void 0 ? void 0 : transaction.receipt) === null || _a === void 0 ? void 0 : _a.isTestDriveReceipt) !== null && _b !== void 0 ? _b : false;
    }, [(_c = transaction === null || transaction === void 0 ? void 0 : transaction.receipt) === null || _c === void 0 ? void 0 : _c.isTestDriveReceipt]);
    var isManagerMcTestReceipt = (0, react_1.useMemo)(function () {
        return isBetaEnabled(CONST_1.default.BETAS.NEWDOT_MANAGER_MCTEST) && selectedParticipantsProp.some(function (participant) { return (0, ReportUtils_1.isSelectedManagerMcTest)(participant.login); });
    }, [isBetaEnabled, selectedParticipantsProp]);
    var _6 = (0, ProductTrainingContext_1.useProductTrainingContext)(isTestDriveReceipt ? CONST_1.default.PRODUCT_TRAINING_TOOLTIP_NAMES.SCAN_TEST_DRIVE_CONFIRMATION : CONST_1.default.PRODUCT_TRAINING_TOOLTIP_NAMES.SCAN_TEST_CONFIRMATION, isTestDriveReceipt || isManagerMcTestReceipt), shouldShowProductTrainingTooltip = _6.shouldShowProductTrainingTooltip, renderProductTrainingTooltip = _6.renderProductTrainingTooltip;
    var policyForMovingExpenses = (0, usePolicyForMovingExpenses_1.default)().policyForMovingExpenses;
    var isTrackExpense = iouType === CONST_1.default.IOU.TYPE.TRACK;
    var policy = isTrackExpense ? policyForMovingExpenses : (policyReal !== null && policyReal !== void 0 ? policyReal : policyDraft);
    var policyCategories = policyCategoriesReal !== null && policyCategoriesReal !== void 0 ? policyCategoriesReal : policyCategoriesDraft;
    var defaultMileageRate = defaultMileageRateDraft !== null && defaultMileageRateDraft !== void 0 ? defaultMileageRateDraft : defaultMileageRateReal;
    var styles = (0, useThemeStyles_1.default)();
    var _7 = (0, useLocalize_1.default)(), translate = _7.translate, toLocaleDigit = _7.toLocaleDigit;
    var currentUserPersonalDetails = (0, useCurrentUserPersonalDetails_1.default)();
    var isRestrictedToPreferredPolicy = (0, usePreferredPolicy_1.default)().isRestrictedToPreferredPolicy;
    var isTypeRequest = iouType === CONST_1.default.IOU.TYPE.SUBMIT;
    var isTypeSplit = iouType === CONST_1.default.IOU.TYPE.SPLIT;
    var isTypeSend = iouType === CONST_1.default.IOU.TYPE.PAY;
    var isTypeTrackExpense = iouType === CONST_1.default.IOU.TYPE.TRACK;
    var isTypeInvoice = iouType === CONST_1.default.IOU.TYPE.INVOICE;
    var isScanRequest = (0, react_1.useMemo)(function () { return (0, TransactionUtils_1.isScanRequest)(transaction); }, [transaction]);
    var isCreateExpenseFlow = !!(transaction === null || transaction === void 0 ? void 0 : transaction.isFromGlobalCreate) && !isPerDiemRequest;
    var transactionID = transaction === null || transaction === void 0 ? void 0 : transaction.transactionID;
    var customUnitRateID = (0, TransactionUtils_1.getRateID)(transaction);
    var subRates = (_f = (_e = (_d = transaction === null || transaction === void 0 ? void 0 : transaction.comment) === null || _d === void 0 ? void 0 : _d.customUnit) === null || _e === void 0 ? void 0 : _e.subRates) !== null && _f !== void 0 ? _f : [];
    (0, react_1.useEffect)(function () {
        var _a;
        if (customUnitRateID !== '-1' || !isDistanceRequest || !transactionID || !(policy === null || policy === void 0 ? void 0 : policy.id)) {
            return;
        }
        var defaultRate = defaultMileageRate === null || defaultMileageRate === void 0 ? void 0 : defaultMileageRate.customUnitRateID;
        var lastSelectedRate = (_a = lastSelectedDistanceRates === null || lastSelectedDistanceRates === void 0 ? void 0 : lastSelectedDistanceRates[policy.id]) !== null && _a !== void 0 ? _a : defaultRate;
        var rateID = lastSelectedRate;
        if (!rateID) {
            return;
        }
        (0, IOU_1.setCustomUnitRateID)(transactionID, rateID);
    }, [defaultMileageRate, customUnitRateID, lastSelectedDistanceRates, policy === null || policy === void 0 ? void 0 : policy.id, transactionID, isDistanceRequest]);
    var mileageRate = DistanceRequestUtils_1.default.getRate({ transaction: transaction, policy: policy, policyDraft: policyDraft });
    var rate = mileageRate.rate;
    var prevRate = (0, usePrevious_1.default)(rate);
    var unit = mileageRate.unit;
    var prevUnit = (0, usePrevious_1.default)(unit);
    var currency = (_g = mileageRate.currency) !== null && _g !== void 0 ? _g : CONST_1.default.CURRENCY.USD;
    var prevCurrency = (0, usePrevious_1.default)(currency);
    var prevSubRates = (0, usePrevious_1.default)(subRates);
    var shouldSelectPolicy = (0, usePolicyForMovingExpenses_1.default)().shouldSelectPolicy;
    // A flag for showing the categories field
    var shouldShowCategories = isTrackExpense
        ? !policy || shouldSelectPolicy || (0, OptionsListUtils_1.hasEnabledOptions)(Object.values(policyCategories !== null && policyCategories !== void 0 ? policyCategories : {}))
        : (isPolicyExpenseChat || isTypeInvoice) && (!!iouCategory || (0, OptionsListUtils_1.hasEnabledOptions)(Object.values(policyCategories !== null && policyCategories !== void 0 ? policyCategories : {})));
    var shouldShowMerchant = (shouldShowSmartScanFields || isTypeSend) && !isDistanceRequest && !isPerDiemRequest;
    var policyTagLists = (0, react_1.useMemo)(function () { return (0, PolicyUtils_1.getTagLists)(policyTags); }, [policyTags]);
    var shouldShowTax = (0, PolicyUtils_1.isTaxTrackingEnabled)(isPolicyExpenseChat, policy, isDistanceRequest, isPerDiemRequest);
    // Update the tax code when the default changes (for example, because the transaction currency changed)
    var defaultTaxCode = (_h = (0, TransactionUtils_1.getDefaultTaxCode)(policy, transaction)) !== null && _h !== void 0 ? _h : '';
    (0, react_1.useEffect)(function () {
        if (!transactionID || isReadOnly) {
            return;
        }
        (0, IOU_1.setMoneyRequestTaxRate)(transactionID, defaultTaxCode);
    }, [defaultTaxCode, transactionID, isReadOnly]);
    var isMovingTransactionFromTrackExpense = (0, IOUUtils_1.isMovingTransactionFromTrackExpense)(action);
    var distance = (0, TransactionUtils_1.getDistanceInMeters)(transaction, unit);
    var prevDistance = (0, usePrevious_1.default)(distance);
    var shouldCalculateDistanceAmount = isDistanceRequest && (iouAmount === 0 || prevRate !== rate || prevDistance !== distance || prevCurrency !== currency || prevUnit !== unit);
    var shouldCalculatePerDiemAmount = isPerDiemRequest && (iouAmount === 0 || JSON.stringify(prevSubRates) !== JSON.stringify(subRates) || prevCurrency !== currency);
    var hasRoute = (0, TransactionUtils_1.hasRoute)(transaction, isDistanceRequest);
    var isDistanceRequestWithPendingRoute = isDistanceRequest && (!hasRoute || !rate) && !isMovingTransactionFromTrackExpense;
    var distanceRequestAmount = DistanceRequestUtils_1.default.getDistanceRequestAmount(distance, unit !== null && unit !== void 0 ? unit : CONST_1.default.CUSTOM_UNITS.DISTANCE_UNIT_MILES, rate !== null && rate !== void 0 ? rate : 0);
    var amountToBeUsed = iouAmount;
    if (shouldCalculateDistanceAmount) {
        amountToBeUsed = distanceRequestAmount;
    }
    else if (shouldCalculatePerDiemAmount) {
        var perDiemRequestAmount = (0, IOU_1.computePerDiemExpenseAmount)({ subRates: subRates });
        amountToBeUsed = perDiemRequestAmount;
    }
    var formattedAmount = isDistanceRequestWithPendingRoute ? '' : (0, CurrencyUtils_1.convertToDisplayString)(amountToBeUsed, isDistanceRequest ? currency : iouCurrencyCode);
    var formattedAmountPerAttendee = isDistanceRequestWithPendingRoute || isScanRequest
        ? ''
        : (0, CurrencyUtils_1.convertToDisplayString)(amountToBeUsed / ((iouAttendees === null || iouAttendees === void 0 ? void 0 : iouAttendees.length) && iouAttendees.length > 0 ? iouAttendees.length : 1), isDistanceRequest ? currency : iouCurrencyCode);
    var isFocused = (0, native_1.useIsFocused)();
    var _8 = (0, useDebouncedState_1.default)(''), formError = _8[0], debouncedFormError = _8[1], setFormError = _8[2];
    var _9 = (0, react_1.useState)(isConfirmed), didConfirm = _9[0], setDidConfirm = _9[1];
    var _10 = (0, react_1.useState)(false), didConfirmSplit = _10[0], setDidConfirmSplit = _10[1];
    // Clear the form error if it's set to one among the list passed as an argument
    var clearFormErrors = (0, react_1.useCallback)(function (errors) {
        if (!errors.includes(formError)) {
            return;
        }
        setFormError('');
    }, [formError, setFormError]);
    var shouldDisplayFieldError = (0, react_1.useMemo)(function () {
        if (!isEditingSplitBill) {
            return false;
        }
        return (!!hasSmartScanFailed && (0, TransactionUtils_1.hasMissingSmartscanFields)(transaction)) || (didConfirmSplit && (0, TransactionUtils_1.areRequiredFieldsEmpty)(transaction));
    }, [isEditingSplitBill, hasSmartScanFailed, transaction, didConfirmSplit]);
    var isMerchantEmpty = (0, react_1.useMemo)(function () { return !iouMerchant || (0, TransactionUtils_1.isMerchantMissing)(transaction); }, [transaction, iouMerchant]);
    var isMerchantRequired = isPolicyExpenseChat && (!isScanRequest || isEditingSplitBill) && shouldShowMerchant;
    var isCategoryRequired = !!(policy === null || policy === void 0 ? void 0 : policy.requiresCategory) && !isTypeInvoice;
    var isDescriptionRequired = (0, react_1.useMemo)(function () { return (0, CategoryUtils_1.isCategoryDescriptionRequired)(policyCategories, iouCategory, policy === null || policy === void 0 ? void 0 : policy.areRulesEnabled); }, [iouCategory, policyCategories, policy === null || policy === void 0 ? void 0 : policy.areRulesEnabled]);
    (0, react_1.useEffect)(function () {
        if (shouldDisplayFieldError && didConfirmSplit) {
            setFormError('iou.error.genericSmartscanFailureMessage');
            return;
        }
        if (shouldDisplayFieldError && hasSmartScanFailed) {
            setFormError('iou.receiptScanningFailed');
            return;
        }
        // reset the form error whenever the screen gains or loses focus
        setFormError('');
        // eslint-disable-next-line react-compiler/react-compiler, react-hooks/exhaustive-deps -- we don't want this effect to run if it's just setFormError that changes
    }, [isFocused, transaction, shouldDisplayFieldError, hasSmartScanFailed, didConfirmSplit]);
    (0, react_1.useEffect)(function () {
        // We want this effect to run only when the transaction is moving from Self DM to a expense chat
        if (!transactionID || !isDistanceRequest || !isMovingTransactionFromTrackExpense || !isPolicyExpenseChat) {
            return;
        }
        var errorKey = 'iou.error.invalidRate';
        var policyRates = DistanceRequestUtils_1.default.getMileageRates(policy);
        // If the selected rate belongs to the policy, clear the error
        if (customUnitRateID && customUnitRateID in policyRates) {
            clearFormErrors([errorKey]);
            return;
        }
        // If there is a distance rate in the policy that matches the rate and unit of the currently selected mileage rate, select it automatically
        var matchingRate = Object.values(policyRates).find(function (policyRate) { return policyRate.rate === mileageRate.rate && policyRate.unit === mileageRate.unit; });
        if (matchingRate === null || matchingRate === void 0 ? void 0 : matchingRate.customUnitRateID) {
            (0, IOU_1.setCustomUnitRateID)(transactionID, matchingRate.customUnitRateID);
            return;
        }
        // If none of the above conditions are met, display the rate error
        setFormError(errorKey);
    }, [isDistanceRequest, isPolicyExpenseChat, transactionID, mileageRate, customUnitRateID, policy, isMovingTransactionFromTrackExpense, setFormError, clearFormErrors]);
    var routeError = Object.values((_k = (_j = transaction === null || transaction === void 0 ? void 0 : transaction.errorFields) === null || _j === void 0 ? void 0 : _j.route) !== null && _k !== void 0 ? _k : {}).at(0);
    var isFirstUpdatedDistanceAmount = (0, react_1.useRef)(false);
    (0, react_1.useEffect)(function () {
        if (isFirstUpdatedDistanceAmount.current) {
            return;
        }
        if (!isDistanceRequest || !transactionID) {
            return;
        }
        if (isReadOnly) {
            return;
        }
        var amount = DistanceRequestUtils_1.default.getDistanceRequestAmount(distance, unit !== null && unit !== void 0 ? unit : CONST_1.default.CUSTOM_UNITS.DISTANCE_UNIT_MILES, rate !== null && rate !== void 0 ? rate : 0);
        (0, IOU_1.setMoneyRequestAmount)(transactionID, amount, currency !== null && currency !== void 0 ? currency : '');
        isFirstUpdatedDistanceAmount.current = true;
    }, [distance, rate, isReadOnly, unit, transactionID, currency, isDistanceRequest]);
    (0, react_1.useEffect)(function () {
        if (!shouldCalculateDistanceAmount || !transactionID || isReadOnly) {
            return;
        }
        var amount = distanceRequestAmount;
        (0, IOU_1.setMoneyRequestAmount)(transactionID, amount, currency !== null && currency !== void 0 ? currency : '');
        // If it's a split request among individuals, set the split shares
        var participantAccountIDs = selectedParticipantsProp.map(function (participant) { var _a; return (_a = participant.accountID) !== null && _a !== void 0 ? _a : CONST_1.default.DEFAULT_NUMBER_ID; });
        if (isTypeSplit && !isPolicyExpenseChat && amount && (transaction === null || transaction === void 0 ? void 0 : transaction.currency)) {
            (0, IOU_1.setSplitShares)(transaction, amount, currency, participantAccountIDs);
        }
    }, [shouldCalculateDistanceAmount, isReadOnly, distanceRequestAmount, transactionID, currency, isTypeSplit, isPolicyExpenseChat, selectedParticipantsProp, transaction]);
    // Calculate and set tax amount in transaction draft
    var taxableAmount = isDistanceRequest ? DistanceRequestUtils_1.default.getTaxableAmount(policy, customUnitRateID, distance) : ((_l = transaction === null || transaction === void 0 ? void 0 : transaction.amount) !== null && _l !== void 0 ? _l : 0);
    var taxPercentage = (_o = (0, TransactionUtils_1.getTaxValue)(policy, transaction, (_m = transaction === null || transaction === void 0 ? void 0 : transaction.taxCode) !== null && _m !== void 0 ? _m : defaultTaxCode)) !== null && _o !== void 0 ? _o : '';
    var taxAmount = (0, TransactionUtils_1.calculateTaxAmount)(taxPercentage, taxableAmount, (_p = transaction === null || transaction === void 0 ? void 0 : transaction.currency) !== null && _p !== void 0 ? _p : CONST_1.default.CURRENCY.USD);
    var taxAmountInSmallestCurrencyUnits = (0, CurrencyUtils_1.convertToBackendAmount)(Number.parseFloat(taxAmount.toString()));
    (0, react_1.useEffect)(function () {
        if (!transactionID || isReadOnly) {
            return;
        }
        (0, IOU_1.setMoneyRequestTaxAmount)(transactionID, taxAmountInSmallestCurrencyUnits);
    }, [transactionID, taxAmountInSmallestCurrencyUnits, isReadOnly]);
    // If completing a split expense fails, set didConfirm to false to allow the user to edit the fields again
    if (isEditingSplitBill && didConfirm) {
        setDidConfirm(false);
    }
    (0, react_1.useEffect)(function () {
        setDidConfirm(isConfirmed);
    }, [isConfirmed]);
    var splitOrRequestOptions = (0, react_1.useMemo)(function () {
        var text;
        if (expensesNumber > 1) {
            text = translate('iou.createExpenses', { expensesNumber: expensesNumber });
        }
        else if (isTypeInvoice) {
            if ((0, Policy_1.hasInvoicingDetails)(policy)) {
                text = translate('iou.sendInvoice', { amount: formattedAmount });
            }
            else {
                text = translate('common.next');
            }
        }
        else if (isTypeTrackExpense) {
            text = translate('iou.createExpense');
            if (iouAmount !== 0) {
                text = translate('iou.createExpenseWithAmount', { amount: formattedAmount });
            }
        }
        else if (isTypeSplit && iouAmount === 0) {
            text = translate('iou.splitExpense');
        }
        else if ((receiptPath && isTypeRequest) || isDistanceRequestWithPendingRoute || isPerDiemRequest) {
            text = translate('iou.createExpense');
            if (iouAmount !== 0) {
                text = translate('iou.createExpenseWithAmount', { amount: formattedAmount });
            }
        }
        else {
            var translationKey = isTypeSplit ? 'iou.splitAmount' : 'iou.createExpenseWithAmount';
            text = translate(translationKey, { amount: formattedAmount });
        }
        return [
            {
                text: text[0].toUpperCase() + text.slice(1),
                value: iouType,
            },
        ];
    }, [
        isTypeInvoice,
        isTypeTrackExpense,
        isTypeSplit,
        expensesNumber,
        iouAmount,
        receiptPath,
        isTypeRequest,
        isDistanceRequestWithPendingRoute,
        isPerDiemRequest,
        iouType,
        policy,
        translate,
        formattedAmount,
    ]);
    var onSplitShareChange = (0, react_1.useCallback)(function (accountID, value) {
        if (!(transaction === null || transaction === void 0 ? void 0 : transaction.transactionID)) {
            return;
        }
        var amountInCents = (0, CurrencyUtils_1.convertToBackendAmount)(value);
        (0, IOU_1.setIndividualShare)(transaction === null || transaction === void 0 ? void 0 : transaction.transactionID, accountID, amountInCents);
    }, [transaction]);
    (0, react_1.useEffect)(function () {
        var _a, _b, _c;
        if (!isTypeSplit || !(transaction === null || transaction === void 0 ? void 0 : transaction.splitShares) || !isFocused) {
            return;
        }
        var splitSharesMap = transaction.splitShares;
        var shares = Object.values(splitSharesMap).map(function (splitShare) { var _a; return (_a = splitShare === null || splitShare === void 0 ? void 0 : splitShare.amount) !== null && _a !== void 0 ? _a : 0; });
        var sumOfShares = shares === null || shares === void 0 ? void 0 : shares.reduce(function (prev, current) { return prev + current; }, 0);
        if (sumOfShares !== iouAmount) {
            setFormError('iou.error.invalidSplit');
            return;
        }
        var participantsWithAmount = Object.keys((_a = transaction === null || transaction === void 0 ? void 0 : transaction.splitShares) !== null && _a !== void 0 ? _a : {})
            .filter(function (accountID) { var _a, _b, _c; return ((_c = (_b = (_a = transaction === null || transaction === void 0 ? void 0 : transaction.splitShares) === null || _a === void 0 ? void 0 : _a[Number(accountID)]) === null || _b === void 0 ? void 0 : _b.amount) !== null && _c !== void 0 ? _c : 0) > 0; })
            .map(function (accountID) { return Number(accountID); });
        // A split must have at least two participants with amounts bigger than 0
        if (participantsWithAmount.length === 1) {
            setFormError('iou.error.invalidSplitParticipants');
            return;
        }
        // Amounts should be bigger than 0 for the split bill creator (yourself)
        if ((transaction === null || transaction === void 0 ? void 0 : transaction.splitShares[currentUserPersonalDetails.accountID]) && ((_c = (_b = transaction.splitShares[currentUserPersonalDetails.accountID]) === null || _b === void 0 ? void 0 : _b.amount) !== null && _c !== void 0 ? _c : 0) === 0) {
            setFormError('iou.error.invalidSplitYourself');
            return;
        }
        setFormError('');
    }, [isFocused, transaction, isTypeSplit, transaction === null || transaction === void 0 ? void 0 : transaction.splitShares, currentUserPersonalDetails.accountID, iouAmount, iouCurrencyCode, setFormError, translate]);
    (0, react_1.useEffect)(function () {
        if (!isTypeSplit || !(transaction === null || transaction === void 0 ? void 0 : transaction.splitShares)) {
            return;
        }
        (0, IOU_1.adjustRemainingSplitShares)(transaction);
    }, [isTypeSplit, transaction]);
    var selectedParticipants = (0, react_1.useMemo)(function () { return selectedParticipantsProp.filter(function (participant) { return participant.selected; }); }, [selectedParticipantsProp]);
    var payeePersonalDetails = (0, react_1.useMemo)(function () { return payeePersonalDetailsProp !== null && payeePersonalDetailsProp !== void 0 ? payeePersonalDetailsProp : currentUserPersonalDetails; }, [payeePersonalDetailsProp, currentUserPersonalDetails]);
    var shouldShowReadOnlySplits = (0, react_1.useMemo)(function () { return isPolicyExpenseChat || isReadOnly || isScanRequest; }, [isPolicyExpenseChat, isReadOnly, isScanRequest]);
    var splitParticipants = (0, react_1.useMemo)(function () {
        var _a, _b;
        if (!isTypeSplit) {
            return [];
        }
        var payeeOption = (0, OptionsListUtils_1.getIOUConfirmationOptionsFromPayeePersonalDetail)(payeePersonalDetails);
        if (shouldShowReadOnlySplits) {
            return __spreadArray([payeeOption], selectedParticipants, true).map(function (participantOption) {
                var _a, _b, _c, _d;
                var isPayer = participantOption.accountID === payeeOption.accountID;
                var amount = 0;
                if (iouAmount > 0) {
                    amount =
                        (_d = (_c = (_b = (_a = transaction === null || transaction === void 0 ? void 0 : transaction.comment) === null || _a === void 0 ? void 0 : _a.splits) === null || _b === void 0 ? void 0 : _b.find(function (split) { return split.accountID === participantOption.accountID; })) === null || _c === void 0 ? void 0 : _c.amount) !== null && _d !== void 0 ? _d : (0, IOUUtils_1.calculateAmount)(selectedParticipants.length, iouAmount, iouCurrencyCode !== null && iouCurrencyCode !== void 0 ? iouCurrencyCode : '', isPayer);
                }
                return __assign(__assign({}, participantOption), { isSelected: false, isInteractive: false, rightElement: (<react_native_1.View style={[styles.flexWrap, styles.pl2]}>
                            <Text_1.default style={[styles.textLabel]}>{amount ? (0, CurrencyUtils_1.convertToDisplayString)(amount, iouCurrencyCode) : ''}</Text_1.default>
                        </react_native_1.View>) });
            });
        }
        var currencySymbol = (_b = (_a = currencyList === null || currencyList === void 0 ? void 0 : currencyList[iouCurrencyCode !== null && iouCurrencyCode !== void 0 ? iouCurrencyCode : '']) === null || _a === void 0 ? void 0 : _a.symbol) !== null && _b !== void 0 ? _b : iouCurrencyCode;
        var formattedTotalAmount = (0, CurrencyUtils_1.convertToDisplayStringWithoutCurrency)(iouAmount, iouCurrencyCode);
        return __spreadArray([payeeOption], selectedParticipants, true).map(function (participantOption) {
            var _a, _b, _c;
            return (__assign(__assign({}, participantOption), { tabIndex: -1, isSelected: false, isInteractive: false, rightElement: (<MoneyRequestAmountInput_1.default autoGrow={false} amount={(_c = (_a = transaction === null || transaction === void 0 ? void 0 : transaction.splitShares) === null || _a === void 0 ? void 0 : _a[(_b = participantOption.accountID) !== null && _b !== void 0 ? _b : CONST_1.default.DEFAULT_NUMBER_ID]) === null || _c === void 0 ? void 0 : _c.amount} currency={iouCurrencyCode} prefixCharacter={currencySymbol} disableKeyboard={false} isCurrencyPressable={false} hideFocusedState={false} hideCurrencySymbol formatAmountOnBlur prefixContainerStyle={[styles.pv0, styles.h100]} prefixStyle={styles.lineHeightUndefined} inputStyle={[styles.optionRowAmountInput, styles.lineHeightUndefined]} containerStyle={[styles.textInputContainer, styles.pl2, styles.pr1]} touchableInputWrapperStyle={[styles.ml3]} onFormatAmount={CurrencyUtils_1.convertToDisplayStringWithoutCurrency} onAmountChange={function (value) { var _a; return onSplitShareChange((_a = participantOption.accountID) !== null && _a !== void 0 ? _a : CONST_1.default.DEFAULT_NUMBER_ID, Number(value)); }} maxLength={formattedTotalAmount.length + 1} contentWidth={(formattedTotalAmount.length + 1) * CONST_1.default.CHARACTER_WIDTH} shouldApplyPaddingToContainer shouldUseDefaultLineHeightForPrefix={false} shouldWrapInputInContainer={false}/>) }));
        });
    }, [
        isTypeSplit,
        payeePersonalDetails,
        shouldShowReadOnlySplits,
        currencyList,
        iouCurrencyCode,
        iouAmount,
        selectedParticipants,
        styles.flexWrap,
        styles.pl2,
        styles.pr1,
        styles.h100,
        styles.textLabel,
        styles.pv0,
        styles.lineHeightUndefined,
        styles.optionRowAmountInput,
        styles.textInputContainer,
        styles.ml3,
        (_q = transaction === null || transaction === void 0 ? void 0 : transaction.comment) === null || _q === void 0 ? void 0 : _q.splits,
        transaction === null || transaction === void 0 ? void 0 : transaction.splitShares,
        onSplitShareChange,
    ]);
    var isSplitModified = (0, react_1.useMemo)(function () {
        if (!(transaction === null || transaction === void 0 ? void 0 : transaction.splitShares)) {
            return;
        }
        return Object.keys(transaction.splitShares).some(function (key) { var _a, _b, _c; return (_c = (_a = transaction.splitShares) === null || _a === void 0 ? void 0 : _a[(_b = Number(key)) !== null && _b !== void 0 ? _b : -1]) === null || _c === void 0 ? void 0 : _c.isModified; });
    }, [transaction === null || transaction === void 0 ? void 0 : transaction.splitShares]);
    var getSplitSectionHeader = (0, react_1.useCallback)(function () { return (<react_native_1.View style={[styles.mt2, styles.mb1, styles.flexRow, styles.justifyContentBetween]}>
                <Text_1.default style={[styles.ph5, styles.textLabelSupporting]}>{translate('iou.participants')}</Text_1.default>
                {!shouldShowReadOnlySplits && !!isSplitModified && (<Pressable_1.PressableWithFeedback onPress={function () {
                (0, IOU_1.resetSplitShares)(transaction);
            }} accessibilityLabel={CONST_1.default.ROLE.BUTTON} role={CONST_1.default.ROLE.BUTTON} shouldUseAutoHitSlop>
                        <Text_1.default style={[styles.pr5, styles.textLabelSupporting, styles.link]}>{translate('common.reset')}</Text_1.default>
                    </Pressable_1.PressableWithFeedback>)}
            </react_native_1.View>); }, [
        isSplitModified,
        shouldShowReadOnlySplits,
        styles.flexRow,
        styles.justifyContentBetween,
        styles.link,
        styles.mb1,
        styles.mt2,
        styles.ph5,
        styles.pr5,
        styles.textLabelSupporting,
        transaction,
        translate,
    ]);
    var sections = (0, react_1.useMemo)(function () {
        var options = [];
        if (isTypeSplit) {
            options.push.apply(options, [
                {
                    title: translate('moneyRequestConfirmationList.paidBy'),
                    data: [(0, OptionsListUtils_1.getIOUConfirmationOptionsFromPayeePersonalDetail)(payeePersonalDetails)],
                    shouldShow: true,
                },
                {
                    CustomSectionHeader: getSplitSectionHeader,
                    data: splitParticipants,
                    shouldShow: true,
                },
            ]);
            options.push();
        }
        else {
            var formattedSelectedParticipants = selectedParticipants.map(function (participant) { return (__assign(__assign({}, participant), { isSelected: false, isInteractive: isCreateExpenseFlow && !isTestReceipt && (!isRestrictedToPreferredPolicy || isTypeInvoice), shouldShowRightIcon: isCreateExpenseFlow && !isTestReceipt && (!isRestrictedToPreferredPolicy || isTypeInvoice) })); });
            options.push({
                title: translate('common.to'),
                data: formattedSelectedParticipants,
                shouldShow: true,
            });
        }
        return options;
    }, [
        isTypeSplit,
        translate,
        payeePersonalDetails,
        getSplitSectionHeader,
        splitParticipants,
        selectedParticipants,
        isCreateExpenseFlow,
        isTestReceipt,
        isRestrictedToPreferredPolicy,
        isTypeInvoice,
    ]);
    (0, react_1.useEffect)(function () {
        if (!isDistanceRequest || (isMovingTransactionFromTrackExpense && !isPolicyExpenseChat) || !transactionID || isReadOnly) {
            // We don't want to recalculate the distance merchant when moving a transaction from Track Expense to a 1:1 chat, because the distance rate will be the same default P2P rate.
            // When moving to a policy chat (e.g. sharing with an accountant), we should recalculate the distance merchant with the policy's rate.
            return;
        }
        /*
         Set pending waypoints based on the route status. We should handle this dynamically to cover cases such as:
         When the user completes the initial steps of the IOU flow offline and then goes online on the confirmation page.
         In this scenario, the route will be fetched from the server, and the waypoints will no longer be pending.
        */
        (0, IOU_1.setMoneyRequestPendingFields)(transactionID, { waypoints: isDistanceRequestWithPendingRoute ? CONST_1.default.RED_BRICK_ROAD_PENDING_ACTION.ADD : null });
        var distanceMerchant = DistanceRequestUtils_1.default.getDistanceMerchant(hasRoute, distance, unit, rate !== null && rate !== void 0 ? rate : 0, currency !== null && currency !== void 0 ? currency : CONST_1.default.CURRENCY.USD, translate, toLocaleDigit);
        (0, IOU_1.setMoneyRequestMerchant)(transactionID, distanceMerchant, true);
    }, [
        isDistanceRequestWithPendingRoute,
        hasRoute,
        distance,
        unit,
        rate,
        currency,
        translate,
        toLocaleDigit,
        isDistanceRequest,
        isPolicyExpenseChat,
        transaction,
        transactionID,
        action,
        isReadOnly,
        isMovingTransactionFromTrackExpense,
    ]);
    // Auto select the category if there is only one enabled category and it is required
    (0, react_1.useEffect)(function () {
        var _a, _b;
        var enabledCategories = Object.values(policyCategories !== null && policyCategories !== void 0 ? policyCategories : {}).filter(function (category) { return category.enabled; });
        if (!transactionID || iouCategory || !shouldShowCategories || enabledCategories.length !== 1 || !isCategoryRequired) {
            return;
        }
        (0, IOU_1.setMoneyRequestCategory)(transactionID, (_b = (_a = enabledCategories.at(0)) === null || _a === void 0 ? void 0 : _a.name) !== null && _b !== void 0 ? _b : '', policy === null || policy === void 0 ? void 0 : policy.id);
        // Keep 'transaction' out to ensure that we auto select the option only once
        // eslint-disable-next-line react-compiler/react-compiler, react-hooks/exhaustive-deps
    }, [shouldShowCategories, policyCategories, isCategoryRequired, policy === null || policy === void 0 ? void 0 : policy.id]);
    // Auto select the tag if there is only one enabled tag and it is required
    (0, react_1.useEffect)(function () {
        if (!transactionID) {
            return;
        }
        var updatedTagsString = (0, TransactionUtils_1.getTag)(transaction);
        policyTagLists.forEach(function (tagList, index) {
            var _a, _b, _c, _d;
            var isTagListRequired = (_a = tagList.required) !== null && _a !== void 0 ? _a : false;
            if (!isTagListRequired) {
                return;
            }
            var enabledTags = Object.values(tagList.tags).filter(function (tag) { return tag.enabled; });
            if (enabledTags.length !== 1 || (0, TransactionUtils_1.getTag)(transaction, index)) {
                return;
            }
            updatedTagsString = (0, IOUUtils_1.insertTagIntoTransactionTagsString)(updatedTagsString, (_c = (_b = enabledTags.at(0)) === null || _b === void 0 ? void 0 : _b.name) !== null && _c !== void 0 ? _c : '', index, (_d = policy === null || policy === void 0 ? void 0 : policy.hasMultipleTagLists) !== null && _d !== void 0 ? _d : false);
        });
        if (updatedTagsString !== (0, TransactionUtils_1.getTag)(transaction) && updatedTagsString) {
            (0, IOU_1.setMoneyRequestTag)(transactionID, updatedTagsString);
        }
        // Keep 'transaction' out to ensure that we auto select the option only once
        // eslint-disable-next-line react-compiler/react-compiler, react-hooks/exhaustive-deps
    }, [transactionID, policyTagLists, policyTags]);
    /**
     * Navigate to the participant step
     */
    var navigateToParticipantPage = function () {
        if (!isCreateExpenseFlow) {
            return;
        }
        var newIOUType = iouType === CONST_1.default.IOU.TYPE.SUBMIT || iouType === CONST_1.default.IOU.TYPE.TRACK ? CONST_1.default.IOU.TYPE.CREATE : iouType;
        Navigation_1.default.navigate(ROUTES_1.default.MONEY_REQUEST_STEP_PARTICIPANTS.getRoute(newIOUType, transactionID, transaction.reportID, Navigation_1.default.getActiveRoute()));
    };
    /**
     * @param {String} paymentMethod
     */
    var confirm = (0, react_1.useCallback)(function (paymentMethod) {
        var _a, _b, _c;
        if (!!routeError || !transactionID) {
            return;
        }
        if (iouType === CONST_1.default.IOU.TYPE.INVOICE && !(0, Policy_1.hasInvoicingDetails)(policy)) {
            Navigation_1.default.navigate(ROUTES_1.default.MONEY_REQUEST_STEP_COMPANY_INFO.getRoute(iouType, transactionID, reportID, Navigation_1.default.getActiveRoute()));
            return;
        }
        if (selectedParticipants.length === 0) {
            setFormError('iou.error.noParticipantSelected');
            return;
        }
        if (!isEditingSplitBill && isMerchantRequired && (isMerchantEmpty || (shouldDisplayFieldError && (0, TransactionUtils_1.isMerchantMissing)(transaction)))) {
            setFormError('iou.error.invalidMerchant');
            return;
        }
        if (iouCategory.length > CONST_1.default.API_TRANSACTION_CATEGORY_MAX_LENGTH) {
            setFormError('iou.error.invalidCategoryLength');
            return;
        }
        var transactionTag = (0, TransactionUtils_1.getTag)(transaction);
        if (transactionTag.length > CONST_1.default.API_TRANSACTION_TAG_MAX_LENGTH) {
            setFormError('iou.error.invalidTagLength');
            return;
        }
        if (transactionTag && (0, TagsOptionsListUtils_1.hasEnabledTags)(policyTagLists) && !(0, TagsOptionsListUtils_1.hasMatchingTag)(policyTags, transactionTag)) {
            setFormError('violations.tagOutOfPolicy');
            return;
        }
        if (isPerDiemRequest && ((_c = (_b = (_a = transaction.comment) === null || _a === void 0 ? void 0 : _a.customUnit) === null || _b === void 0 ? void 0 : _b.subRates) !== null && _c !== void 0 ? _c : []).length === 0) {
            setFormError('iou.error.invalidSubrateLength');
            return;
        }
        if (iouType !== CONST_1.default.IOU.TYPE.PAY) {
            // validate the amount for distance expenses
            var decimals = (0, CurrencyUtils_1.getCurrencyDecimals)(iouCurrencyCode);
            if (isDistanceRequest && !isDistanceRequestWithPendingRoute && !(0, MoneyRequestUtils_1.validateAmount)(String(iouAmount), decimals, CONST_1.default.IOU.DISTANCE_REQUEST_AMOUNT_MAX_LENGTH)) {
                setFormError('common.error.invalidAmount');
                return;
            }
            if (isEditingSplitBill && (0, TransactionUtils_1.areRequiredFieldsEmpty)(transaction)) {
                setDidConfirmSplit(true);
                setFormError('iou.error.genericSmartscanFailureMessage');
                return;
            }
            if (formError) {
                return;
            }
            onConfirm === null || onConfirm === void 0 ? void 0 : onConfirm(selectedParticipants);
        }
        else {
            if (!paymentMethod) {
                return;
            }
            if (isDelegateAccessRestricted) {
                showDelegateNoAccessModal();
                return;
            }
            if (formError) {
                return;
            }
            Log_1.default.info("[IOU] Sending money via: ".concat(paymentMethod));
            onSendMoney === null || onSendMoney === void 0 ? void 0 : onSendMoney(paymentMethod);
        }
    }, [
        routeError,
        transactionID,
        iouType,
        policy,
        policyTagLists,
        selectedParticipants,
        isEditingSplitBill,
        isMerchantRequired,
        isMerchantEmpty,
        shouldDisplayFieldError,
        transaction,
        iouCategory.length,
        policyTags,
        isPerDiemRequest,
        reportID,
        setFormError,
        iouCurrencyCode,
        isDistanceRequest,
        isDistanceRequestWithPendingRoute,
        iouAmount,
        formError,
        onConfirm,
        isDelegateAccessRestricted,
        onSendMoney,
        showDelegateNoAccessModal,
    ]);
    var focusTimeoutRef = (0, react_1.useRef)(null);
    (0, native_1.useFocusEffect)((0, react_1.useCallback)(function () {
        focusTimeoutRef.current = setTimeout(function () {
            // eslint-disable-next-line @typescript-eslint/no-deprecated
            react_native_1.InteractionManager.runAfterInteractions(function () {
                (0, blurActiveElement_1.default)();
            });
        }, CONST_1.default.ANIMATED_TRANSITION);
        return function () { return focusTimeoutRef.current && clearTimeout(focusTimeoutRef.current); };
    }, []));
    var errorMessage = (0, react_1.useMemo)(function () {
        if (routeError) {
            return routeError;
        }
        if (isTypeSplit && !shouldShowReadOnlySplits) {
            return debouncedFormError && translate(debouncedFormError);
        }
        return formError && translate(formError);
    }, [routeError, isTypeSplit, shouldShowReadOnlySplits, debouncedFormError, formError, translate]);
    var footerContent = (0, react_1.useMemo)(function () {
        if (isReadOnly) {
            return;
        }
        var shouldShowSettlementButton = iouType === CONST_1.default.IOU.TYPE.PAY;
        var button = shouldShowSettlementButton ? (<SettlementButton_1.default pressOnEnter onPress={confirm} enablePaymentsRoute={ROUTES_1.default.ENABLE_PAYMENTS} chatReportID={reportID} shouldShowPersonalBankAccountOption currency={iouCurrencyCode} policyID={policyID} buttonSize={CONST_1.default.DROPDOWN_BUTTON_SIZE.LARGE} kycWallAnchorAlignment={{
                horizontal: CONST_1.default.MODAL.ANCHOR_ORIGIN_HORIZONTAL.LEFT,
                vertical: CONST_1.default.MODAL.ANCHOR_ORIGIN_VERTICAL.BOTTOM,
            }} paymentMethodDropdownAnchorAlignment={{
                horizontal: CONST_1.default.MODAL.ANCHOR_ORIGIN_HORIZONTAL.RIGHT,
                vertical: CONST_1.default.MODAL.ANCHOR_ORIGIN_VERTICAL.BOTTOM,
            }} enterKeyEventListenerPriority={1} useKeyboardShortcuts 
        // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
        isLoading={isConfirmed || isConfirming}/>) : (<>
                {expensesNumber > 1 && (<Button_1.default large text={translate('iou.removeThisExpense')} onPress={showRemoveExpenseConfirmModal} style={styles.mb3}/>)}
                <EducationalTooltip_1.default shouldRender={shouldShowProductTrainingTooltip} renderTooltipContent={renderProductTrainingTooltip} anchorAlignment={{
                horizontal: CONST_1.default.MODAL.ANCHOR_ORIGIN_HORIZONTAL.CENTER,
                vertical: CONST_1.default.MODAL.ANCHOR_ORIGIN_VERTICAL.BOTTOM,
            }} wrapperStyle={styles.productTrainingTooltipWrapper} shouldHideOnNavigate shiftVertical={-10}>
                    <react_native_1.View>
                        <ButtonWithDropdownMenu_1.default pressOnEnter onPress={function (event, value) { return confirm(value); }} options={splitOrRequestOptions} buttonSize={CONST_1.default.DROPDOWN_BUTTON_SIZE.LARGE} enterKeyEventListenerPriority={1} useKeyboardShortcuts 
        // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
        isLoading={isConfirmed || isConfirming}/>
                    </react_native_1.View>
                </EducationalTooltip_1.default>
            </>);
        return (<>
                {!!errorMessage && (<FormHelpMessage_1.default style={[styles.ph1, styles.mb2]} isError message={errorMessage}/>)}
                <react_native_1.View>{button}</react_native_1.View>
            </>);
    }, [
        isReadOnly,
        iouType,
        confirm,
        iouCurrencyCode,
        policyID,
        isConfirmed,
        splitOrRequestOptions,
        errorMessage,
        expensesNumber,
        translate,
        showRemoveExpenseConfirmModal,
        styles.mb3,
        styles.ph1,
        styles.mb2,
        styles.productTrainingTooltipWrapper,
        shouldShowProductTrainingTooltip,
        renderProductTrainingTooltip,
        isConfirming,
        reportID,
    ]);
    var listFooterContent = (<MoneyRequestConfirmationListFooter_1.default action={action} currency={currency} didConfirm={!!didConfirm} distance={distance} formattedAmount={formattedAmount} formattedAmountPerAttendee={formattedAmountPerAttendee} formError={formError} hasRoute={hasRoute} iouAttendees={iouAttendees} iouCategory={iouCategory} iouComment={iouComment} iouCreated={iouCreated} iouCurrencyCode={iouCurrencyCode} iouIsBillable={iouIsBillable} iouMerchant={iouMerchant} iouType={iouType} isCategoryRequired={isCategoryRequired} isDistanceRequest={isDistanceRequest} isManualDistanceRequest={isManualDistanceRequest} isPerDiemRequest={isPerDiemRequest} isMerchantEmpty={isMerchantEmpty} isMerchantRequired={isMerchantRequired} isPolicyExpenseChat={isPolicyExpenseChat} isReadOnly={isReadOnly} isTypeInvoice={isTypeInvoice} onToggleBillable={onToggleBillable} policy={policy} policyTags={policyTags} policyTagLists={policyTagLists} rate={rate} receiptFilename={receiptFilename} receiptPath={receiptPath} reportActionID={reportActionID} reportID={reportID} selectedParticipants={selectedParticipantsProp} shouldDisplayFieldError={shouldDisplayFieldError} shouldDisplayReceipt={shouldDisplayReceipt} shouldShowCategories={shouldShowCategories} shouldShowMerchant={shouldShowMerchant} shouldShowSmartScanFields={shouldShowSmartScanFields} shouldShowAmountField={!isPerDiemRequest} shouldShowTax={shouldShowTax} transaction={transaction} transactionID={transactionID} unit={unit} onPDFLoadError={onPDFLoadError} onPDFPassword={onPDFPassword} iouIsReimbursable={iouIsReimbursable} onToggleReimbursable={onToggleReimbursable} isReceiptEditable={isReceiptEditable} isDescriptionRequired={isDescriptionRequired}/>);
    return (<useMouseContext_1.MouseProvider>
            <SelectionListWithSections_1.default sections={sections} ListItem={UserListItem_1.default} onSelectRow={navigateToParticipantPage} shouldSingleExecuteRowSelect canSelectMultiple={false} shouldPreventDefaultFocusOnSelectRow shouldShowListEmptyContent={false} footerContent={footerContent} listFooterContent={listFooterContent} containerStyle={[styles.flexBasisAuto]} removeClippedSubviews={false} disableKeyboardShortcuts/>
        </useMouseContext_1.MouseProvider>);
}
MoneyRequestConfirmationList.displayName = 'MoneyRequestConfirmationList';
exports.default = (0, react_1.memo)(MoneyRequestConfirmationList, function (prevProps, nextProps) {
    return (0, fast_equals_1.deepEqual)(prevProps.transaction, nextProps.transaction) &&
        prevProps.onSendMoney === nextProps.onSendMoney &&
        prevProps.onConfirm === nextProps.onConfirm &&
        prevProps.iouType === nextProps.iouType &&
        prevProps.iouAmount === nextProps.iouAmount &&
        prevProps.isDistanceRequest === nextProps.isDistanceRequest &&
        prevProps.isPolicyExpenseChat === nextProps.isPolicyExpenseChat &&
        prevProps.expensesNumber === nextProps.expensesNumber &&
        prevProps.iouCategory === nextProps.iouCategory &&
        prevProps.shouldShowSmartScanFields === nextProps.shouldShowSmartScanFields &&
        prevProps.isEditingSplitBill === nextProps.isEditingSplitBill &&
        prevProps.iouCurrencyCode === nextProps.iouCurrencyCode &&
        prevProps.iouMerchant === nextProps.iouMerchant &&
        (0, fast_equals_1.deepEqual)(prevProps.selectedParticipants, nextProps.selectedParticipants) &&
        (0, fast_equals_1.deepEqual)(prevProps.payeePersonalDetails, nextProps.payeePersonalDetails) &&
        prevProps.isReadOnly === nextProps.isReadOnly &&
        prevProps.policyID === nextProps.policyID &&
        prevProps.reportID === nextProps.reportID &&
        prevProps.receiptPath === nextProps.receiptPath &&
        prevProps.iouAttendees === nextProps.iouAttendees &&
        prevProps.iouComment === nextProps.iouComment &&
        prevProps.receiptFilename === nextProps.receiptFilename &&
        prevProps.iouCreated === nextProps.iouCreated &&
        prevProps.iouIsBillable === nextProps.iouIsBillable &&
        prevProps.onToggleBillable === nextProps.onToggleBillable &&
        prevProps.hasSmartScanFailed === nextProps.hasSmartScanFailed &&
        prevProps.reportActionID === nextProps.reportActionID &&
        (0, fast_equals_1.deepEqual)(prevProps.action, nextProps.action) &&
        prevProps.shouldDisplayReceipt === nextProps.shouldDisplayReceipt;
});
