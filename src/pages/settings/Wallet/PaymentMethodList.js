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
var flash_list_1 = require("@shopify/flash-list");
var sortBy_1 = require("lodash/sortBy");
var react_1 = require("react");
var react_native_1 = require("react-native");
var Expensicons = require("@components/Icon/Expensicons");
var MenuItem_1 = require("@components/MenuItem");
var OfflineWithFeedback_1 = require("@components/OfflineWithFeedback");
var Text_1 = require("@components/Text");
var useLocalize_1 = require("@hooks/useLocalize");
var useNetwork_1 = require("@hooks/useNetwork");
var useOnyx_1 = require("@hooks/useOnyx");
var useStyleUtils_1 = require("@hooks/useStyleUtils");
var useThemeIllustrations_1 = require("@hooks/useThemeIllustrations");
var useThemeStyles_1 = require("@hooks/useThemeStyles");
var PaymentMethods_1 = require("@libs/actions/PaymentMethods");
var CardUtils_1 = require("@libs/CardUtils");
var Log_1 = require("@libs/Log");
var Navigation_1 = require("@libs/Navigation/Navigation");
var PaymentUtils_1 = require("@libs/PaymentUtils");
var PolicyUtils_1 = require("@libs/PolicyUtils");
var variables_1 = require("@styles/variables");
var CONST_1 = require("@src/CONST");
var ONYXKEYS_1 = require("@src/ONYXKEYS");
var ROUTES_1 = require("@src/ROUTES");
var EmptyObject_1 = require("@src/types/utils/EmptyObject");
var isLoadingOnyxValue_1 = require("@src/types/utils/isLoadingOnyxValue");
function dismissError(item) {
    var _a, _b;
    if (item.cardID) {
        (0, PaymentMethods_1.clearDeletePaymentMethodError)(ONYXKEYS_1.default.CARD_LIST, item.cardID);
        return;
    }
    var isBankAccount = item.accountType === CONST_1.default.PAYMENT_METHODS.PERSONAL_BANK_ACCOUNT;
    var paymentList = isBankAccount ? ONYXKEYS_1.default.BANK_ACCOUNT_LIST : ONYXKEYS_1.default.FUND_LIST;
    var paymentID = isBankAccount ? (_a = item.accountData) === null || _a === void 0 ? void 0 : _a.bankAccountID : (_b = item.accountData) === null || _b === void 0 ? void 0 : _b.fundID;
    if (!paymentID) {
        Log_1.default.info('Unable to clear payment method error: ', undefined, item);
        return;
    }
    if (item.pendingAction === CONST_1.default.RED_BRICK_ROAD_PENDING_ACTION.DELETE) {
        (0, PaymentMethods_1.clearDeletePaymentMethodError)(paymentList, paymentID);
        if (!isBankAccount) {
            (0, PaymentMethods_1.clearDeletePaymentMethodError)(ONYXKEYS_1.default.FUND_LIST, paymentID);
        }
    }
    else {
        (0, PaymentMethods_1.clearAddPaymentMethodError)(paymentList, paymentID);
        if (!isBankAccount) {
            (0, PaymentMethods_1.clearAddPaymentMethodError)(ONYXKEYS_1.default.FUND_LIST, paymentID);
        }
    }
}
function shouldShowDefaultBadge(filteredPaymentMethods, isDefault, shouldHideDefaultBadge) {
    if (isDefault === void 0) { isDefault = false; }
    if (shouldHideDefaultBadge === void 0) { shouldHideDefaultBadge = false; }
    if (!isDefault || shouldHideDefaultBadge) {
        return false;
    }
    var defaultPaymentMethodCount = filteredPaymentMethods.filter(function (method) { return method.accountType === CONST_1.default.PAYMENT_METHODS.PERSONAL_BANK_ACCOUNT || method.accountType === CONST_1.default.PAYMENT_METHODS.DEBIT_CARD; }).length;
    return defaultPaymentMethodCount > 1;
}
function isPaymentMethodActive(actionPaymentMethodType, activePaymentMethodID, paymentMethod) {
    return paymentMethod.accountType === actionPaymentMethodType && paymentMethod.methodID === activePaymentMethodID;
}
function keyExtractor(item) {
    var _a;
    if (typeof item === 'string') {
        return item;
    }
    return (_a = item.key) !== null && _a !== void 0 ? _a : '';
}
function PaymentMethodList(_a) {
    var _b = _a.actionPaymentMethodType, actionPaymentMethodType = _b === void 0 ? '' : _b, _c = _a.activePaymentMethodID, activePaymentMethodID = _c === void 0 ? '' : _c, listHeaderComponent = _a.listHeaderComponent, onPress = _a.onPress, _d = _a.shouldShowSelectedState, shouldShowSelectedState = _d === void 0 ? false : _d, _e = _a.shouldShowAddBankAccount, shouldShowAddBankAccount = _e === void 0 ? true : _e, _f = _a.shouldShowAssignedCards, shouldShowAssignedCards = _f === void 0 ? false : _f, _g = _a.selectedMethodID, selectedMethodID = _g === void 0 ? '' : _g, _h = _a.onListContentSizeChange, onListContentSizeChange = _h === void 0 ? function () { } : _h, _j = _a.style, style = _j === void 0 ? {} : _j, _k = _a.listItemStyle, listItemStyle = _k === void 0 ? {} : _k, _l = _a.shouldShowRightIcon, shouldShowRightIcon = _l === void 0 ? true : _l, invoiceTransferBankAccountID = _a.invoiceTransferBankAccountID, _m = _a.shouldShowBankAccountSections, shouldShowBankAccountSections = _m === void 0 ? false : _m, _o = _a.policyID, policyID = _o === void 0 ? '' : _o, _p = _a.onAddBankAccountPress, onAddBankAccountPress = _p === void 0 ? function () { } : _p, itemIconRight = _a.itemIconRight, filterType = _a.filterType, _q = _a.shouldHideDefaultBadge, shouldHideDefaultBadge = _q === void 0 ? false : _q;
    var styles = (0, useThemeStyles_1.default)();
    var StyleUtils = (0, useStyleUtils_1.default)();
    var translate = (0, useLocalize_1.default)().translate;
    var isOffline = (0, useNetwork_1.default)().isOffline;
    var illustrations = (0, useThemeIllustrations_1.default)();
    var isUserValidated = (0, useOnyx_1.default)(ONYXKEYS_1.default.ACCOUNT, {
        selector: Account_1.isUserValidatedSelector,
        canBeMissing: true,
    })[0];
    var _r = (0, useOnyx_1.default)(ONYXKEYS_1.default.BANK_ACCOUNT_LIST, { canBeMissing: true }), _s = _r[0], bankAccountList = _s === void 0 ? (0, EmptyObject_1.getEmptyObject)() : _s, bankAccountListResult = _r[1];
    var userWallet = (0, useOnyx_1.default)(ONYXKEYS_1.default.USER_WALLET, { canBeMissing: true })[0];
    var isLoadingBankAccountList = (0, isLoadingOnyxValue_1.default)(bankAccountListResult);
    var _t = (0, useOnyx_1.default)(ONYXKEYS_1.default.CARD_LIST, { canBeMissing: true }), _u = _t[0], cardList = _u === void 0 ? (0, EmptyObject_1.getEmptyObject)() : _u, cardListResult = _t[1];
    var isLoadingCardList = (0, isLoadingOnyxValue_1.default)(cardListResult);
    // Temporarily disabled because P2P debit cards are disabled.
    // const [fundList = getEmptyObject<FundList>()] = useOnyx(ONYXKEYS.FUND_LIST);
    var filteredPaymentMethods = (0, react_1.useMemo)(function () {
        if (shouldShowAssignedCards) {
            var assignedCards = Object.values(isLoadingCardList ? {} : (cardList !== null && cardList !== void 0 ? cardList : {}))
                // Filter by active cards associated with a domain
                .filter(function (card) { var _a; return !!card.domainName && CONST_1.default.EXPENSIFY_CARD.ACTIVE_STATES.includes((_a = card.state) !== null && _a !== void 0 ? _a : 0); });
            var assignedCardsSorted = (0, sortBy_1.default)(assignedCards, CardUtils_1.getAssignedCardSortKey);
            var assignedCardsGrouped_1 = [];
            assignedCardsSorted.forEach(function (card) {
                var _a, _b, _c, _d, _e, _f, _g;
                var isDisabled = card.pendingAction === CONST_1.default.RED_BRICK_ROAD_PENDING_ACTION.DELETE;
                var icon = (0, CardUtils_1.getCardFeedIcon)(card.bank, illustrations);
                if (!(0, CardUtils_1.isExpensifyCard)(card)) {
                    var pressHandler_1 = onPress;
                    var lastFourPAN = (0, CardUtils_1.lastFourNumbersFromCardName)(card.cardName);
                    var plaidUrl = (0, CardUtils_1.getPlaidInstitutionIconUrl)(card.bank);
                    assignedCardsGrouped_1.push({
                        key: card.cardID.toString(),
                        plaidUrl: plaidUrl,
                        title: (0, CardUtils_1.maskCardNumber)(card.cardName, card.bank),
                        description: lastFourPAN
                            ? "".concat(lastFourPAN, " ").concat(CONST_1.default.DOT_SEPARATOR, " ").concat((0, PolicyUtils_1.getDescriptionForPolicyDomainCard)(card.domainName))
                            : (0, PolicyUtils_1.getDescriptionForPolicyDomainCard)(card.domainName),
                        interactive: !isDisabled,
                        disabled: isDisabled,
                        canDismissError: false,
                        shouldShowRightIcon: shouldShowRightIcon,
                        errors: card.errors,
                        pendingAction: card.pendingAction,
                        brickRoadIndicator: card.fraud === CONST_1.default.EXPENSIFY_CARD.FRAUD_TYPES.DOMAIN || card.fraud === CONST_1.default.EXPENSIFY_CARD.FRAUD_TYPES.INDIVIDUAL || !!card.errors
                            ? CONST_1.default.BRICK_ROAD_INDICATOR_STATUS.ERROR
                            : undefined,
                        icon: icon,
                        iconStyles: [styles.cardIcon],
                        iconWidth: variables_1.default.cardIconWidth,
                        iconHeight: variables_1.default.cardIconHeight,
                        iconRight: itemIconRight !== null && itemIconRight !== void 0 ? itemIconRight : Expensicons.ThreeDots,
                        isMethodActive: activePaymentMethodID === card.cardID,
                        onPress: function (e) {
                            return pressHandler_1({
                                event: e,
                                cardData: card,
                                icon: {
                                    icon: icon,
                                    iconStyles: [styles.cardIcon],
                                    iconWidth: variables_1.default.cardIconWidth,
                                    iconHeight: variables_1.default.cardIconHeight,
                                },
                                cardID: card.cardID,
                            });
                        },
                    });
                    return;
                }
                var isAdminIssuedVirtualCard = !!((_a = card === null || card === void 0 ? void 0 : card.nameValuePairs) === null || _a === void 0 ? void 0 : _a.issuedBy) && !!((_b = card === null || card === void 0 ? void 0 : card.nameValuePairs) === null || _b === void 0 ? void 0 : _b.isVirtual);
                var isTravelCard = !!((_c = card === null || card === void 0 ? void 0 : card.nameValuePairs) === null || _c === void 0 ? void 0 : _c.isVirtual) && !!((_d = card === null || card === void 0 ? void 0 : card.nameValuePairs) === null || _d === void 0 ? void 0 : _d.isTravelCard);
                // The card should be grouped to a specific domain and such domain already exists in a assignedCardsGrouped
                if (assignedCardsGrouped_1.some(function (item) { return item.isGroupedCardDomain && item.description === card.domainName; }) && !isAdminIssuedVirtualCard && !isTravelCard) {
                    var domainGroupIndex = assignedCardsGrouped_1.findIndex(function (item) { return item.isGroupedCardDomain && item.description === card.domainName; });
                    var assignedCardsGroupedItem = assignedCardsGrouped_1.at(domainGroupIndex);
                    if (domainGroupIndex >= 0 && assignedCardsGroupedItem) {
                        assignedCardsGroupedItem.errors = __assign(__assign({}, (_e = assignedCardsGrouped_1.at(domainGroupIndex)) === null || _e === void 0 ? void 0 : _e.errors), card.errors);
                        if (card.fraud === CONST_1.default.EXPENSIFY_CARD.FRAUD_TYPES.DOMAIN ||
                            card.fraud === CONST_1.default.EXPENSIFY_CARD.FRAUD_TYPES.INDIVIDUAL ||
                            Object.keys(assignedCardsGroupedItem.errors).length > 0) {
                            assignedCardsGroupedItem.brickRoadIndicator = CONST_1.default.BRICK_ROAD_INDICATOR_STATUS.ERROR;
                        }
                    }
                    return;
                }
                // The card shouldn't be grouped or it's domain group doesn't exist yet
                var cardDescription = ((_f = card === null || card === void 0 ? void 0 : card.nameValuePairs) === null || _f === void 0 ? void 0 : _f.issuedBy) && (card === null || card === void 0 ? void 0 : card.lastFourPAN)
                    ? "".concat(card === null || card === void 0 ? void 0 : card.lastFourPAN, " ").concat(CONST_1.default.DOT_SEPARATOR, " ").concat((0, PolicyUtils_1.getDescriptionForPolicyDomainCard)(card.domainName))
                    : (0, PolicyUtils_1.getDescriptionForPolicyDomainCard)(card.domainName);
                assignedCardsGrouped_1.push({
                    key: card.cardID.toString(),
                    // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
                    title: isTravelCard ? translate('cardPage.expensifyTravelCard') : ((_g = card === null || card === void 0 ? void 0 : card.nameValuePairs) === null || _g === void 0 ? void 0 : _g.cardTitle) || card.bank,
                    description: isTravelCard ? translate('cardPage.expensifyTravelCard') : cardDescription,
                    onPress: function () { return Navigation_1.default.navigate(ROUTES_1.default.SETTINGS_WALLET_DOMAIN_CARD.getRoute(String(card.cardID))); },
                    cardID: card.cardID,
                    isGroupedCardDomain: !isAdminIssuedVirtualCard && !isTravelCard,
                    shouldShowRightIcon: true,
                    interactive: !isDisabled,
                    disabled: isDisabled,
                    canDismissError: true,
                    errors: card.errors,
                    pendingAction: card.pendingAction,
                    brickRoadIndicator: card.fraud === CONST_1.default.EXPENSIFY_CARD.FRAUD_TYPES.DOMAIN || card.fraud === CONST_1.default.EXPENSIFY_CARD.FRAUD_TYPES.INDIVIDUAL || !!card.errors
                        ? CONST_1.default.BRICK_ROAD_INDICATOR_STATUS.ERROR
                        : undefined,
                    icon: icon,
                    iconStyles: [styles.cardIcon],
                    iconWidth: variables_1.default.cardIconWidth,
                    iconHeight: variables_1.default.cardIconHeight,
                });
            });
            return assignedCardsGrouped_1;
        }
        // Hide any billing cards that are not P2P debit cards for now because you cannot make them your default method, or delete them
        // All payment cards are temporarily disabled for use as a payment method
        // const paymentCardList = fundList ?? {};
        // const filteredCardList = Object.values(paymentCardList).filter((card) => !!card.accountData?.additionalData?.isP2PDebitCard);
        var filteredCardList = {};
        var combinedPaymentMethods = (0, PaymentUtils_1.formatPaymentMethods)(isLoadingBankAccountList ? {} : (bankAccountList !== null && bankAccountList !== void 0 ? bankAccountList : {}), filteredCardList, styles, translate);
        if (!isOffline) {
            combinedPaymentMethods = combinedPaymentMethods.filter(function (paymentMethod) { return paymentMethod.pendingAction !== CONST_1.default.RED_BRICK_ROAD_PENDING_ACTION.DELETE || !(0, EmptyObject_1.isEmptyObject)(paymentMethod.errors); });
        }
        if (filterType) {
            combinedPaymentMethods = combinedPaymentMethods.filter(function (paymentMethod) { var _a; return ((_a = paymentMethod.accountData) === null || _a === void 0 ? void 0 : _a.type) === filterType; });
        }
        combinedPaymentMethods = combinedPaymentMethods.map(function (paymentMethod) {
            var pressHandler = onPress;
            var isMethodActive = isPaymentMethodActive(actionPaymentMethodType, activePaymentMethodID, paymentMethod);
            return __assign(__assign({}, paymentMethod), { onPress: function (e) {
                    return pressHandler({
                        event: e,
                        accountType: paymentMethod.accountType,
                        accountData: paymentMethod.accountData,
                        icon: {
                            icon: paymentMethod.icon,
                            iconHeight: paymentMethod === null || paymentMethod === void 0 ? void 0 : paymentMethod.iconHeight,
                            iconWidth: paymentMethod === null || paymentMethod === void 0 ? void 0 : paymentMethod.iconWidth,
                            iconStyles: paymentMethod === null || paymentMethod === void 0 ? void 0 : paymentMethod.iconStyles,
                            iconSize: paymentMethod === null || paymentMethod === void 0 ? void 0 : paymentMethod.iconSize,
                        },
                        isDefault: paymentMethod.isDefault,
                        methodID: paymentMethod.methodID,
                        description: paymentMethod.description,
                    });
                }, wrapperStyle: isMethodActive ? [StyleUtils.getButtonBackgroundColorStyle(CONST_1.default.BUTTON_STATES.PRESSED)] : null, disabled: paymentMethod.pendingAction === CONST_1.default.RED_BRICK_ROAD_PENDING_ACTION.DELETE, isMethodActive: isMethodActive, iconRight: itemIconRight !== null && itemIconRight !== void 0 ? itemIconRight : Expensicons.ThreeDots, shouldShowRightIcon: shouldShowRightIcon });
        });
        return combinedPaymentMethods;
    }, [
        shouldShowAssignedCards,
        isLoadingBankAccountList,
        bankAccountList,
        styles,
        isOffline,
        filterType,
        isLoadingCardList,
        cardList,
        illustrations,
        translate,
        onPress,
        shouldShowRightIcon,
        itemIconRight,
        activePaymentMethodID,
        actionPaymentMethodType,
        StyleUtils,
    ]);
    var onPressItem = (0, react_1.useCallback)(function () {
        if (!isUserValidated) {
            var path = Navigation_1.default.getActiveRoute();
            if (path.includes(ROUTES_1.default.WORKSPACES_LIST.route) && policyID) {
                Navigation_1.default.navigate(ROUTES_1.default.WORKSPACE_INVOICES_VERIFY_ACCOUNT.getRoute(policyID));
            }
            else {
                Navigation_1.default.navigate(ROUTES_1.default.SETTINGS_ADD_BANK_ACCOUNT_VERIFY_ACCOUNT);
            }
            return;
        }
        onAddBankAccountPress();
    }, [isUserValidated, onAddBankAccountPress, policyID]);
    var renderListFooterComponent = (0, react_1.useCallback)(function () { return (<MenuItem_1.default onPress={onPressItem} title={translate('bankAccount.addBankAccount')} icon={Expensicons.Plus} wrapperStyle={[styles.paymentMethod, listItemStyle]}/>); }, [onPressItem, translate, styles.paymentMethod, listItemStyle]);
    var itemsToRender = (0, react_1.useMemo)(function () {
        if (!shouldShowBankAccountSections) {
            return filteredPaymentMethods;
        }
        if (filteredPaymentMethods.find(function (method) { var _a; return ((_a = method.accountData) === null || _a === void 0 ? void 0 : _a.type) === CONST_1.default.BANK_ACCOUNT.TYPE.PERSONAL; }) &&
            filteredPaymentMethods.find(function (method) { var _a; return ((_a = method.accountData) === null || _a === void 0 ? void 0 : _a.type) === CONST_1.default.BANK_ACCOUNT.TYPE.BUSINESS; })) {
            return __spreadArray(__spreadArray(__spreadArray([
                translate('walletPage.personalBankAccounts')
            ], filteredPaymentMethods.filter(function (method) { var _a; return ((_a = method.accountData) === null || _a === void 0 ? void 0 : _a.type) === CONST_1.default.BANK_ACCOUNT.TYPE.PERSONAL; }), true), [
                translate('walletPage.businessBankAccounts')
            ], false), filteredPaymentMethods.filter(function (method) { var _a; return ((_a = method.accountData) === null || _a === void 0 ? void 0 : _a.type) === CONST_1.default.BANK_ACCOUNT.TYPE.BUSINESS; }), true);
        }
        return filteredPaymentMethods;
    }, [filteredPaymentMethods, shouldShowBankAccountSections, translate]);
    /**
     * Create a menuItem for each passed paymentMethod
     */
    var renderItem = (0, react_1.useCallback)(function (_a) {
        var _b, _c, _d;
        var item = _a.item, index = _a.index;
        if (typeof item === 'string') {
            return (<react_native_1.View style={[listItemStyle, index === 0 ? styles.mt4 : styles.mt6, styles.mb1]}>
                        <Text_1.default style={[styles.textLabel, styles.colorMuted]}>{item}</Text_1.default>
                    </react_native_1.View>);
        }
        return (<OfflineWithFeedback_1.default onClose={function () { return dismissError(item); }} pendingAction={item.pendingAction} errors={item.errors} errorRowStyles={styles.ph6} shouldShowErrorMessages={false} canDismissError={item.canDismissError}>
                    <MenuItem_1.default onPress={item.onPress} title={item.title} description={item.description} icon={item.icon} plaidUrl={item.plaidUrl} disabled={item.disabled} iconType={item.plaidUrl ? CONST_1.default.ICON_TYPE_PLAID : CONST_1.default.ICON_TYPE_ICON} displayInDefaultIconColor iconHeight={(_b = item.iconHeight) !== null && _b !== void 0 ? _b : item.iconSize} iconWidth={(_c = item.iconWidth) !== null && _c !== void 0 ? _c : item.iconSize} iconStyles={item.iconStyles} badgeText={shouldShowDefaultBadge(filteredPaymentMethods, invoiceTransferBankAccountID ? invoiceTransferBankAccountID === item.methodID : item.methodID === (userWallet === null || userWallet === void 0 ? void 0 : userWallet.walletLinkedAccountID), shouldHideDefaultBadge)
                ? translate('paymentMethodList.defaultPaymentMethod')
                : undefined} wrapperStyle={[styles.paymentMethod, listItemStyle]} iconRight={item.iconRight} badgeStyle={styles.badgeBordered} shouldShowRightIcon={item.shouldShowRightIcon} shouldShowSelectedState={shouldShowSelectedState} isSelected={selectedMethodID.toString() === ((_d = item.methodID) === null || _d === void 0 ? void 0 : _d.toString())} interactive={item.interactive} brickRoadIndicator={item.brickRoadIndicator} success={item.isMethodActive}/>
                </OfflineWithFeedback_1.default>);
    }, [
        styles.ph6,
        styles.paymentMethod,
        styles.badgeBordered,
        styles.mt4,
        styles.mt6,
        styles.mb1,
        styles.textLabel,
        styles.colorMuted,
        filteredPaymentMethods,
        invoiceTransferBankAccountID,
        userWallet === null || userWallet === void 0 ? void 0 : userWallet.walletLinkedAccountID,
        translate,
        listItemStyle,
        shouldShowSelectedState,
        selectedMethodID,
        shouldHideDefaultBadge,
    ]);
    return (<react_native_1.View style={[style, { minHeight: (filteredPaymentMethods.length + (shouldShowAddBankAccount ? 1 : 0)) * variables_1.default.optionRowHeight }]}>
            <flash_list_1.FlashList data={itemsToRender} renderItem={renderItem} keyExtractor={keyExtractor} ListHeaderComponent={listHeaderComponent} ListFooterComponent={shouldShowAddBankAccount ? renderListFooterComponent : null} onContentSizeChange={onListContentSizeChange}/>
        </react_native_1.View>);
}
PaymentMethodList.displayName = 'PaymentMethodList';
exports.default = PaymentMethodList;
