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
var react_native_1 = require("react-native");
var ConfirmModal_1 = require("@components/ConfirmModal");
var Expensicons = require("@components/Icon/Expensicons");
var MenuItem_1 = require("@components/MenuItem");
var Popover_1 = require("@components/Popover");
var Section_1 = require("@components/Section");
var useLocalize_1 = require("@hooks/useLocalize");
var useOnyx_1 = require("@hooks/useOnyx");
var usePaymentMethodState_1 = require("@hooks/usePaymentMethodState");
var useResponsiveLayout_1 = require("@hooks/useResponsiveLayout");
var useThemeStyles_1 = require("@hooks/useThemeStyles");
var useWindowDimensions_1 = require("@hooks/useWindowDimensions");
var ReimbursementAccount_1 = require("@libs/actions/ReimbursementAccount");
var getClickedTargetLocation_1 = require("@libs/getClickedTargetLocation");
var PaymentUtils_1 = require("@libs/PaymentUtils");
var PaymentMethodList_1 = require("@pages/settings/Wallet/PaymentMethodList");
var variables_1 = require("@styles/variables");
var BankAccounts_1 = require("@userActions/BankAccounts");
var Modal_1 = require("@userActions/Modal");
var PaymentMethods_1 = require("@userActions/PaymentMethods");
var CONST_1 = require("@src/CONST");
var ONYXKEYS_1 = require("@src/ONYXKEYS");
var ROUTES_1 = require("@src/ROUTES");
var EmptyObject_1 = require("@src/types/utils/EmptyObject");
function WorkspaceInvoiceVBASection(_a) {
    var _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
    var policyID = _a.policyID;
    var styles = (0, useThemeStyles_1.default)();
    var shouldUseNarrowLayout = (0, useResponsiveLayout_1.default)().shouldUseNarrowLayout;
    var windowWidth = (0, useWindowDimensions_1.default)().windowWidth;
    var translate = (0, useLocalize_1.default)().translate;
    var policy = (0, useOnyx_1.default)("".concat(ONYXKEYS_1.default.COLLECTION.POLICY).concat(policyID), { canBeMissing: true })[0];
    var bankAccountList = (0, useOnyx_1.default)(ONYXKEYS_1.default.BANK_ACCOUNT_LIST, { canBeMissing: true })[0];
    var _o = (0, usePaymentMethodState_1.default)(), paymentMethod = _o.paymentMethod, setPaymentMethod = _o.setPaymentMethod, resetSelectedPaymentMethodData = _o.resetSelectedPaymentMethodData;
    var paymentMethodButtonRef = (0, react_1.useRef)(null);
    var _p = (0, react_1.useState)(false), showConfirmDeleteModal = _p[0], setShowConfirmDeleteModal = _p[1];
    var _q = (0, react_1.useState)(false), shouldShowDefaultDeleteMenu = _q[0], setShouldShowDefaultDeleteMenu = _q[1];
    var _r = (0, react_1.useState)({
        anchorPositionHorizontal: 0,
        anchorPositionVertical: 0,
        anchorPositionTop: 0,
        anchorPositionRight: 0,
    }), anchorPosition = _r[0], setAnchorPosition = _r[1];
    var hasBankAccount = !(0, EmptyObject_1.isEmptyObject)(bankAccountList);
    var shouldShowEmptyState = !hasBankAccount;
    // Determines whether or not the modal popup is mounted from the bottom of the screen instead of the side mount on Web or Desktop screens
    var isPopoverBottomMount = anchorPosition.anchorPositionTop === 0 || shouldUseNarrowLayout;
    var shouldShowMakeDefaultButton = !paymentMethod.isSelectedPaymentMethodDefault;
    var transferBankAccountID = (_d = (_c = (_b = policy === null || policy === void 0 ? void 0 : policy.invoice) === null || _b === void 0 ? void 0 : _b.bankAccount) === null || _c === void 0 ? void 0 : _c.transferBankAccountID) !== null && _d !== void 0 ? _d : CONST_1.default.DEFAULT_NUMBER_ID;
    /**
     * Set position of the payment menu
     */
    var setMenuPosition = (0, react_1.useCallback)(function () {
        if (!paymentMethodButtonRef.current) {
            return;
        }
        var position = (0, getClickedTargetLocation_1.default)(paymentMethodButtonRef.current);
        setAnchorPosition({
            anchorPositionTop: position.top + position.height - variables_1.default.bankAccountActionPopoverTopSpacing,
            // We want the position to be 23px to the right of the left border
            anchorPositionRight: windowWidth - position.right + variables_1.default.bankAccountActionPopoverRightSpacing,
            anchorPositionHorizontal: position.x + (shouldShowEmptyState ? -variables_1.default.addPaymentMethodLeftSpacing : variables_1.default.addBankAccountLeftSpacing),
            anchorPositionVertical: position.y,
        });
    }, [shouldShowEmptyState, windowWidth]);
    /**
     * Display the delete/default menu, or the add payment method menu
     */
    var paymentMethodPressed = function (_a) {
        var _b;
        var event = _a.event, accountData = _a.accountData, accountType = _a.accountType, methodID = _a.methodID, icon = _a.icon, description = _a.description;
        if (shouldShowDefaultDeleteMenu) {
            setShouldShowDefaultDeleteMenu(false);
            return;
        }
        paymentMethodButtonRef.current = event === null || event === void 0 ? void 0 : event.currentTarget;
        // The delete/default menu
        if (accountType) {
            var formattedSelectedPaymentMethod = {
                title: '',
            };
            if (accountType === CONST_1.default.PAYMENT_METHODS.PERSONAL_BANK_ACCOUNT) {
                formattedSelectedPaymentMethod = {
                    title: (_b = accountData === null || accountData === void 0 ? void 0 : accountData.addressName) !== null && _b !== void 0 ? _b : '',
                    icon: icon,
                    description: description !== null && description !== void 0 ? description : (0, PaymentUtils_1.getPaymentMethodDescription)(accountType, accountData, translate),
                    type: CONST_1.default.PAYMENT_METHODS.PERSONAL_BANK_ACCOUNT,
                };
            }
            setPaymentMethod({
                isSelectedPaymentMethodDefault: transferBankAccountID === methodID,
                selectedPaymentMethod: accountData !== null && accountData !== void 0 ? accountData : {},
                selectedPaymentMethodType: accountType,
                formattedSelectedPaymentMethod: formattedSelectedPaymentMethod,
                methodID: methodID !== null && methodID !== void 0 ? methodID : CONST_1.default.DEFAULT_NUMBER_ID,
            });
            setShouldShowDefaultDeleteMenu(true);
            setMenuPosition();
        }
    };
    /**
     * Hide the default / delete modal
     */
    var hideDefaultDeleteMenu = (0, react_1.useCallback)(function () {
        setShouldShowDefaultDeleteMenu(false);
        setShowConfirmDeleteModal(false);
    }, [setShouldShowDefaultDeleteMenu, setShowConfirmDeleteModal]);
    var deletePaymentMethod = (0, react_1.useCallback)(function () {
        var bankAccountID = paymentMethod.selectedPaymentMethod.bankAccountID;
        if (paymentMethod.selectedPaymentMethodType === CONST_1.default.PAYMENT_METHODS.PERSONAL_BANK_ACCOUNT && bankAccountID) {
            (0, BankAccounts_1.deletePaymentBankAccount)(bankAccountID);
        }
    }, [paymentMethod.selectedPaymentMethod.bankAccountID, paymentMethod.selectedPaymentMethodType]);
    var makeDefaultPaymentMethod = (0, react_1.useCallback)(function () {
        var _a, _b;
        // Find the previous default payment method so we can revert if the MakeDefaultPaymentMethod command errors
        var paymentMethods = (0, PaymentUtils_1.formatPaymentMethods)(bankAccountList !== null && bankAccountList !== void 0 ? bankAccountList : {}, {}, styles, translate);
        var previousPaymentMethod = paymentMethods.find(function (method) { return !!method.isDefault; });
        var currentPaymentMethod = paymentMethods.find(function (method) { return method.methodID === paymentMethod.methodID; });
        if (paymentMethod.selectedPaymentMethodType === CONST_1.default.PAYMENT_METHODS.PERSONAL_BANK_ACCOUNT) {
            (0, PaymentMethods_1.setInvoicingTransferBankAccount)((_a = currentPaymentMethod === null || currentPaymentMethod === void 0 ? void 0 : currentPaymentMethod.methodID) !== null && _a !== void 0 ? _a : CONST_1.default.DEFAULT_NUMBER_ID, policyID, (_b = previousPaymentMethod === null || previousPaymentMethod === void 0 ? void 0 : previousPaymentMethod.methodID) !== null && _b !== void 0 ? _b : CONST_1.default.DEFAULT_NUMBER_ID);
        }
    }, [bankAccountList, styles, translate, paymentMethod.selectedPaymentMethodType, paymentMethod.methodID, policyID]);
    var onAddBankAccountPress = function () {
        if (shouldShowDefaultDeleteMenu) {
            setShouldShowDefaultDeleteMenu(false);
            return;
        }
        (0, ReimbursementAccount_1.navigateToBankAccountRoute)(policyID, ROUTES_1.default.WORKSPACE_INVOICES.getRoute(policyID));
    };
    return (<Section_1.default title={translate('common.bankAccounts')} subtitle={translate('workspace.invoices.bankAccountsSubtitle')} isCentralPane titleStyles={styles.accountSettingsSectionTitle} subtitleMuted>
            <PaymentMethodList_1.default onPress={paymentMethodPressed} onAddBankAccountPress={onAddBankAccountPress} invoiceTransferBankAccountID={transferBankAccountID} activePaymentMethodID={transferBankAccountID} actionPaymentMethodType={shouldShowDefaultDeleteMenu ? paymentMethod.selectedPaymentMethodType : ''} style={[styles.mt5, shouldUseNarrowLayout ? styles.mhn5 : styles.mhn8]} listItemStyle={shouldUseNarrowLayout ? styles.ph5 : styles.ph8} policyID={policyID} filterType={CONST_1.default.BANK_ACCOUNT.TYPE.BUSINESS}/>
            <Popover_1.default isVisible={shouldShowDefaultDeleteMenu} onClose={hideDefaultDeleteMenu} anchorPosition={{
            top: anchorPosition.anchorPositionTop,
            right: anchorPosition.anchorPositionRight,
        }} anchorRef={paymentMethodButtonRef}>
                {!showConfirmDeleteModal && (<react_native_1.View style={[
                !shouldUseNarrowLayout
                    ? __assign(__assign({}, styles.sidebarPopover), styles.pv4) : styles.pt5,
            ]}>
                        {isPopoverBottomMount && (<MenuItem_1.default title={paymentMethod.formattedSelectedPaymentMethod.title} icon={(_e = paymentMethod.formattedSelectedPaymentMethod.icon) === null || _e === void 0 ? void 0 : _e.icon} iconHeight={(_g = (_f = paymentMethod.formattedSelectedPaymentMethod.icon) === null || _f === void 0 ? void 0 : _f.iconHeight) !== null && _g !== void 0 ? _g : (_h = paymentMethod.formattedSelectedPaymentMethod.icon) === null || _h === void 0 ? void 0 : _h.iconSize} iconWidth={(_k = (_j = paymentMethod.formattedSelectedPaymentMethod.icon) === null || _j === void 0 ? void 0 : _j.iconWidth) !== null && _k !== void 0 ? _k : (_l = paymentMethod.formattedSelectedPaymentMethod.icon) === null || _l === void 0 ? void 0 : _l.iconSize} iconStyles={(_m = paymentMethod.formattedSelectedPaymentMethod.icon) === null || _m === void 0 ? void 0 : _m.iconStyles} description={paymentMethod.formattedSelectedPaymentMethod.description} wrapperStyle={[styles.mb4, styles.ph5, styles.pv0]} interactive={false} displayInDefaultIconColor/>)}
                        {shouldShowMakeDefaultButton && (<MenuItem_1.default title={translate('walletPage.setDefaultConfirmation')} icon={Expensicons.Star} onPress={function () {
                    makeDefaultPaymentMethod();
                    setShouldShowDefaultDeleteMenu(false);
                }} wrapperStyle={[styles.pv3, styles.ph5, !shouldUseNarrowLayout ? styles.sidebarPopover : {}]}/>)}
                        <MenuItem_1.default title={translate('common.delete')} icon={Expensicons.Trashcan} onPress={function () { return (0, Modal_1.close)(function () { return setShowConfirmDeleteModal(true); }); }} wrapperStyle={[styles.pv3, styles.ph5, !shouldUseNarrowLayout ? styles.sidebarPopover : {}]}/>
                    </react_native_1.View>)}
            </Popover_1.default>
            <ConfirmModal_1.default isVisible={showConfirmDeleteModal} onConfirm={function () {
            deletePaymentMethod();
            hideDefaultDeleteMenu();
        }} onCancel={hideDefaultDeleteMenu} title={translate('walletPage.deleteAccount')} prompt={translate('walletPage.deleteConfirmation')} confirmText={translate('common.delete')} cancelText={translate('common.cancel')} shouldShowCancelButton danger onModalHide={resetSelectedPaymentMethodData}/>
        </Section_1.default>);
}
WorkspaceInvoiceVBASection.displayName = 'WorkspaceInvoiceVBASection';
exports.default = WorkspaceInvoiceVBASection;
