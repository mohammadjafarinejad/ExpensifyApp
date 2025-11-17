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
var index_1 = require("@components/AddToWalletButton/index");
var Button_1 = require("@components/Button");
var CardPreview_1 = require("@components/CardPreview");
var DotIndicatorMessage_1 = require("@components/DotIndicatorMessage");
var FormHelpMessage_1 = require("@components/FormHelpMessage");
var HeaderWithBackButton_1 = require("@components/HeaderWithBackButton");
var LockedAccountModalProvider_1 = require("@components/LockedAccountModalProvider");
var MenuItem_1 = require("@components/MenuItem");
var MenuItemWithTopDescription_1 = require("@components/MenuItemWithTopDescription");
var ScreenWrapper_1 = require("@components/ScreenWrapper");
var ScrollView_1 = require("@components/ScrollView");
var useBeforeRemove_1 = require("@hooks/useBeforeRemove");
var useCurrentUserPersonalDetails_1 = require("@hooks/useCurrentUserPersonalDetails");
var useEnvironment_1 = require("@hooks/useEnvironment");
var useLazyAsset_1 = require("@hooks/useLazyAsset");
var useLocalize_1 = require("@hooks/useLocalize");
var useNetwork_1 = require("@hooks/useNetwork");
var useOnyx_1 = require("@hooks/useOnyx");
var useThemeStyles_1 = require("@hooks/useThemeStyles");
var User_1 = require("@libs/actions/User");
var CardUtils_1 = require("@libs/CardUtils");
var CurrencyUtils_1 = require("@libs/CurrencyUtils");
var Navigation_1 = require("@libs/Navigation/Navigation");
var PersonalDetailsUtils_1 = require("@libs/PersonalDetailsUtils");
var SearchQueryUtils_1 = require("@libs/SearchQueryUtils");
var NotFoundPage_1 = require("@pages/ErrorPage/NotFoundPage");
var RedDotCardSection_1 = require("@pages/settings/Wallet/RedDotCardSection");
var CardDetails_1 = require("@pages/settings/Wallet/WalletPage/CardDetails");
var Card_1 = require("@userActions/Card");
var Link_1 = require("@userActions/Link");
var CONST_1 = require("@src/CONST");
var ONYXKEYS_1 = require("@src/ONYXKEYS");
var ROUTES_1 = require("@src/ROUTES");
var SCREENS_1 = require("@src/SCREENS");
var EmptyObject_1 = require("@src/types/utils/EmptyObject");
var useExpensifyCardContext_1 = require("./useExpensifyCardContext");
/**
 * Determines if the user should be redirected to the missing details page
 * before revealing their card details (for UK/EU cards only).
 */
function shouldShowMissingDetailsPage(card, privatePersonalDetails) {
    var _a;
    var isUKOrEUCard = ((_a = card === null || card === void 0 ? void 0 : card.nameValuePairs) === null || _a === void 0 ? void 0 : _a.feedCountry) === 'GB';
    var hasMissingDetails = (0, PersonalDetailsUtils_1.arePersonalDetailsMissing)(privatePersonalDetails);
    return hasMissingDetails && isUKOrEUCard;
}
function getLimitTypeTranslationKeys(limitType) {
    switch (limitType) {
        case CONST_1.default.EXPENSIFY_CARD.LIMIT_TYPES.SMART:
            return { limitNameKey: 'cardPage.smartLimit.name', limitTitleKey: 'cardPage.smartLimit.title' };
        case CONST_1.default.EXPENSIFY_CARD.LIMIT_TYPES.MONTHLY:
            return { limitNameKey: 'cardPage.monthlyLimit.name', limitTitleKey: 'cardPage.monthlyLimit.title' };
        case CONST_1.default.EXPENSIFY_CARD.LIMIT_TYPES.FIXED:
            return { limitNameKey: 'cardPage.fixedLimit.name', limitTitleKey: 'cardPage.fixedLimit.title' };
        default:
            return { limitNameKey: undefined, limitTitleKey: undefined };
    }
}
function ExpensifyCardPage(_a) {
    var _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s;
    var route = _a.route;
    var cardID = route.params.cardID;
    var account = (0, useOnyx_1.default)(ONYXKEYS_1.default.ACCOUNT, { canBeMissing: false })[0];
    var cardList = (0, useOnyx_1.default)(ONYXKEYS_1.default.CARD_LIST, { canBeMissing: false })[0];
    var _t = (0, useOnyx_1.default)(ONYXKEYS_1.default.CURRENCY_LIST, { canBeMissing: true })[0], currencyList = _t === void 0 ? (0, EmptyObject_1.getEmptyObject)() : _t;
    var pin = (0, useOnyx_1.default)(ONYXKEYS_1.default.ACTIVATED_CARD_PIN, { canBeMissing: true })[0];
    var privatePersonalDetails = (0, useOnyx_1.default)(ONYXKEYS_1.default.PRIVATE_PERSONAL_DETAILS, { canBeMissing: false })[0];
    var styles = (0, useThemeStyles_1.default)();
    var isOffline = (0, useNetwork_1.default)().isOffline;
    var translate = (0, useLocalize_1.default)().translate;
    var environmentURL = (0, useEnvironment_1.default)().environmentURL;
    var isTravelCard = (_c = (_b = cardList === null || cardList === void 0 ? void 0 : cardList[cardID]) === null || _b === void 0 ? void 0 : _b.nameValuePairs) === null || _c === void 0 ? void 0 : _c.isTravelCard;
    var shouldDisplayCardDomain = !isTravelCard && (!((_e = (_d = cardList === null || cardList === void 0 ? void 0 : cardList[cardID]) === null || _d === void 0 ? void 0 : _d.nameValuePairs) === null || _e === void 0 ? void 0 : _e.issuedBy) || !((_g = (_f = cardList === null || cardList === void 0 ? void 0 : cardList[cardID]) === null || _f === void 0 ? void 0 : _f.nameValuePairs) === null || _g === void 0 ? void 0 : _g.isVirtual));
    var domain = (_j = (_h = cardList === null || cardList === void 0 ? void 0 : cardList[cardID]) === null || _h === void 0 ? void 0 : _h.domainName) !== null && _j !== void 0 ? _j : '';
    var expensifyCardTitle = isTravelCard ? translate('cardPage.expensifyTravelCard') : translate('cardPage.expensifyCard');
    var pageTitle = shouldDisplayCardDomain ? expensifyCardTitle : ((_m = (_l = (_k = cardList === null || cardList === void 0 ? void 0 : cardList[cardID]) === null || _k === void 0 ? void 0 : _k.nameValuePairs) === null || _l === void 0 ? void 0 : _l.cardTitle) !== null && _m !== void 0 ? _m : expensifyCardTitle);
    var displayName = (0, useCurrentUserPersonalDetails_1.default)().displayName;
    var expensifyIcons = (0, useLazyAsset_1.useMemoizedLazyExpensifyIcons)(['Flag', 'MoneySearch']);
    var _u = (0, react_1.useState)(false), isNotFound = _u[0], setIsNotFound = _u[1];
    var cardsToShow = (0, react_1.useMemo)(function () {
        var _a, _b;
        if (shouldDisplayCardDomain) {
            return (_b = (_a = (0, CardUtils_1.getDomainCards)(cardList)[domain]) === null || _a === void 0 ? void 0 : _a.filter(function (card) { var _a, _b; return !((_a = card === null || card === void 0 ? void 0 : card.nameValuePairs) === null || _a === void 0 ? void 0 : _a.issuedBy) || !((_b = card === null || card === void 0 ? void 0 : card.nameValuePairs) === null || _b === void 0 ? void 0 : _b.isVirtual); })) !== null && _b !== void 0 ? _b : [];
        }
        return [cardList === null || cardList === void 0 ? void 0 : cardList[cardID]];
    }, [shouldDisplayCardDomain, cardList, cardID, domain]);
    var currentCard = (0, react_1.useMemo)(function () { var _a; return (_a = cardsToShow === null || cardsToShow === void 0 ? void 0 : cardsToShow.find(function (card) { return String(card === null || card === void 0 ? void 0 : card.cardID) === cardID; })) !== null && _a !== void 0 ? _a : cardsToShow === null || cardsToShow === void 0 ? void 0 : cardsToShow.at(0); }, [cardsToShow, cardID]);
    (0, react_1.useEffect)(function () {
        return function () {
            if (!pin) {
                return;
            }
            (0, Card_1.clearActivatedCardPin)();
        };
    }, [pin]);
    (0, react_1.useEffect)(function () {
        setIsNotFound(!currentCard);
    }, [cardList, cardsToShow, currentCard]);
    (0, react_1.useEffect)(function () {
        (0, User_1.resetValidateActionCodeSent)();
    }, []);
    var virtualCards = (0, react_1.useMemo)(function () { return cardsToShow === null || cardsToShow === void 0 ? void 0 : cardsToShow.filter(function (card) { var _a, _b; return ((_a = card === null || card === void 0 ? void 0 : card.nameValuePairs) === null || _a === void 0 ? void 0 : _a.isVirtual) && !((_b = card === null || card === void 0 ? void 0 : card.nameValuePairs) === null || _b === void 0 ? void 0 : _b.isTravelCard); }); }, [cardsToShow]);
    var travelCards = (0, react_1.useMemo)(function () { return cardsToShow === null || cardsToShow === void 0 ? void 0 : cardsToShow.filter(function (card) { var _a, _b; return ((_a = card === null || card === void 0 ? void 0 : card.nameValuePairs) === null || _a === void 0 ? void 0 : _a.isVirtual) && ((_b = card === null || card === void 0 ? void 0 : card.nameValuePairs) === null || _b === void 0 ? void 0 : _b.isTravelCard); }); }, [cardsToShow]);
    var physicalCards = (0, react_1.useMemo)(function () { return cardsToShow === null || cardsToShow === void 0 ? void 0 : cardsToShow.filter(function (card) { var _a; return !((_a = card === null || card === void 0 ? void 0 : card.nameValuePairs) === null || _a === void 0 ? void 0 : _a.isVirtual); }); }, [cardsToShow]);
    var cardToAdd = (0, react_1.useMemo)(function () {
        return virtualCards === null || virtualCards === void 0 ? void 0 : virtualCards.at(0);
    }, [virtualCards]);
    var _v = (0, useExpensifyCardContext_1.default)(), cardsDetails = _v.cardsDetails, setCardsDetails = _v.setCardsDetails, isCardDetailsLoading = _v.isCardDetailsLoading, cardsDetailsErrors = _v.cardsDetailsErrors;
    // This resets card details when we exit the page.
    (0, useBeforeRemove_1.default)(function () {
        setCardsDetails(function (oldCardDetails) {
            var _a;
            return (__assign(__assign({}, oldCardDetails), (_a = {}, _a[cardID] = null, _a)));
        });
    });
    var _w = (0, react_1.useContext)(LockedAccountModalProvider_1.LockedAccountContext), isAccountLocked = _w.isAccountLocked, showLockedAccountModal = _w.showLockedAccountModal;
    var hasDetectedDomainFraud = cardsToShow === null || cardsToShow === void 0 ? void 0 : cardsToShow.some(function (card) { return (card === null || card === void 0 ? void 0 : card.fraud) === CONST_1.default.EXPENSIFY_CARD.FRAUD_TYPES.DOMAIN; });
    var hasDetectedIndividualFraud = cardsToShow === null || cardsToShow === void 0 ? void 0 : cardsToShow.some(function (card) { return (card === null || card === void 0 ? void 0 : card.fraud) === CONST_1.default.EXPENSIFY_CARD.FRAUD_TYPES.INDIVIDUAL; });
    var currentPhysicalCard = physicalCards === null || physicalCards === void 0 ? void 0 : physicalCards.find(function (card) { return String(card === null || card === void 0 ? void 0 : card.cardID) === cardID; });
    // Cards that are already activated and working (OPEN) and cards shipped but not activated yet can be reported as missing or damaged
    var shouldShowReportLostCardButton = (currentPhysicalCard === null || currentPhysicalCard === void 0 ? void 0 : currentPhysicalCard.state) === CONST_1.default.EXPENSIFY_CARD.STATE.NOT_ACTIVATED || (currentPhysicalCard === null || currentPhysicalCard === void 0 ? void 0 : currentPhysicalCard.state) === CONST_1.default.EXPENSIFY_CARD.STATE.OPEN;
    var currency = (0, CurrencyUtils_1.getCurrencyKeyByCountryCode)(currencyList, (_p = (_o = currentCard === null || currentCard === void 0 ? void 0 : currentCard.nameValuePairs) === null || _o === void 0 ? void 0 : _o.country) !== null && _p !== void 0 ? _p : (_q = currentCard === null || currentCard === void 0 ? void 0 : currentCard.nameValuePairs) === null || _q === void 0 ? void 0 : _q.feedCountry);
    var shouldShowPIN = currency !== CONST_1.default.CURRENCY.USD;
    var formattedAvailableSpendAmount = (0, CurrencyUtils_1.convertToDisplayString)(currentCard === null || currentCard === void 0 ? void 0 : currentCard.availableSpend, currency);
    var _x = getLimitTypeTranslationKeys((_r = currentCard === null || currentCard === void 0 ? void 0 : currentCard.nameValuePairs) === null || _r === void 0 ? void 0 : _r.limitType), limitNameKey = _x.limitNameKey, limitTitleKey = _x.limitTitleKey;
    var isSignedInAsDelegate = !!((_s = account === null || account === void 0 ? void 0 : account.delegatedAccess) === null || _s === void 0 ? void 0 : _s.delegate) || false;
    if (isNotFound) {
        return <NotFoundPage_1.default onBackButtonPress={function () { return Navigation_1.default.goBack(ROUTES_1.default.SETTINGS_WALLET); }}/>;
    }
    return (<ScreenWrapper_1.default testID={ExpensifyCardPage.displayName}>
            <HeaderWithBackButton_1.default title={pageTitle} onBackButtonPress={function () { return Navigation_1.default.closeRHPFlow(); }}/>
            <ScrollView_1.default>
                <react_native_1.View style={[styles.flex1, styles.mb9, styles.mt9]}>
                    <CardPreview_1.default />
                </react_native_1.View>

                {hasDetectedDomainFraud && (<DotIndicatorMessage_1.default style={styles.pageWrapper} textStyles={styles.walletLockedMessage} messages={{ error: translate('cardPage.cardLocked') }} type="error"/>)}

                {hasDetectedIndividualFraud && !hasDetectedDomainFraud && (<>
                        <RedDotCardSection_1.default title={translate('cardPage.suspiciousBannerTitle')} description={translate('cardPage.suspiciousBannerDescription')}/>

                        <Button_1.default style={[styles.mh5, styles.mb5]} text={translate('cardPage.reviewTransaction')} onPress={function () { return (0, Link_1.openOldDotLink)(CONST_1.default.OLDDOT_URLS.INBOX); }}/>
                    </>)}

                {!hasDetectedDomainFraud && (<>
                        <MenuItemWithTopDescription_1.default description={translate('cardPage.availableSpend')} title={formattedAvailableSpendAmount} interactive={false} titleStyle={styles.newKansasLarge}/>
                        {!!limitNameKey && !!limitTitleKey && (<MenuItemWithTopDescription_1.default description={translate(limitNameKey)} title={translate(limitTitleKey, { formattedLimit: formattedAvailableSpendAmount })} interactive={false} titleStyle={styles.walletCardLimit} numberOfLinesTitle={3}/>)}
                        {virtualCards.map(function (card) {
                var _a, _b, _c, _d, _e;
                return (<react_1.default.Fragment key={card.cardID}>
                                {!!cardsDetails[card.cardID] && ((_a = cardsDetails[card.cardID]) === null || _a === void 0 ? void 0 : _a.pan) ? (<CardDetails_1.default pan={(_b = cardsDetails[card.cardID]) === null || _b === void 0 ? void 0 : _b.pan} expiration={(0, CardUtils_1.formatCardExpiration)((_d = (_c = cardsDetails[card.cardID]) === null || _c === void 0 ? void 0 : _c.expiration) !== null && _d !== void 0 ? _d : '')} cvv={(_e = cardsDetails[card.cardID]) === null || _e === void 0 ? void 0 : _e.cvv} onUpdateAddressPress={function () {
                            if (route.name === SCREENS_1.default.DOMAIN_CARD.DOMAIN_CARD_DETAIL) {
                                Navigation_1.default.navigate(ROUTES_1.default.SETTINGS_DOMAIN_CARD_UPDATE_ADDRESS.getRoute(String(card.cardID)));
                                return;
                            }
                            Navigation_1.default.navigate(ROUTES_1.default.SETTINGS_WALLET_CARD_DIGITAL_DETAILS_UPDATE_ADDRESS.getRoute(domain));
                        }}/>) : (<>
                                        <MenuItemWithTopDescription_1.default description={translate('cardPage.virtualCardNumber')} title={(0, CardUtils_1.maskCard)('')} interactive={false} titleStyle={styles.walletCardNumber} shouldShowRightComponent rightComponent={!isSignedInAsDelegate ? (<Button_1.default text={translate('cardPage.cardDetails.revealDetails')} onPress={function () {
                                if (isAccountLocked) {
                                    showLockedAccountModal();
                                    return;
                                }
                                // Check if user needs to add personal details first (UK/EU cards only)
                                if (shouldShowMissingDetailsPage(card, privatePersonalDetails)) {
                                    Navigation_1.default.navigate(ROUTES_1.default.SETTINGS_WALLET_CARD_MISSING_DETAILS.getRoute(String(card.cardID)));
                                    return;
                                }
                                if (route.name === SCREENS_1.default.DOMAIN_CARD.DOMAIN_CARD_DETAIL) {
                                    Navigation_1.default.navigate(ROUTES_1.default.SETTINGS_DOMAIN_CARD_CONFIRM_MAGIC_CODE.getRoute(String(card.cardID)));
                                    return;
                                }
                                Navigation_1.default.navigate(ROUTES_1.default.SETTINGS_WALLET_DOMAIN_CARD_CONFIRM_MAGIC_CODE.getRoute(String(card.cardID)));
                            }} isDisabled={isCardDetailsLoading[card.cardID] || isOffline} isLoading={isCardDetailsLoading[card.cardID]}/>) : undefined}/>
                                        {cardsDetailsErrors[card.cardID] === 'cardPage.missingPrivateDetails' ? (<FormHelpMessage_1.default isError shouldShowRedDotIndicator message={translate('cardPage.missingPrivateDetails', {
                                missingDetailsLink: "".concat(environmentURL, "/").concat(ROUTES_1.default.SETTINGS_WALLET_CARD_MISSING_DETAILS.getRoute(String(card.cardID))),
                            })} style={[styles.ph5, styles.mv2]} shouldRenderMessageAsHTML/>) : (<DotIndicatorMessage_1.default messages={cardsDetailsErrors[card.cardID] ? { error: translate(cardsDetailsErrors[card.cardID]) } : {}} type="error" style={[styles.ph5, styles.mv2]}/>)}
                                    </>)}
                                {!isSignedInAsDelegate && (<MenuItemWithTopDescription_1.default title={translate('cardPage.reportFraud')} titleStyle={styles.walletCardMenuItem} icon={expensifyIcons.Flag} shouldShowRightIcon onPress={function () {
                            if (isAccountLocked) {
                                showLockedAccountModal();
                                return;
                            }
                            if (route.name === SCREENS_1.default.DOMAIN_CARD.DOMAIN_CARD_DETAIL) {
                                Navigation_1.default.navigate(ROUTES_1.default.SETTINGS_DOMAIN_CARD_REPORT_FRAUD.getRoute(String(card.cardID)));
                                return;
                            }
                            Navigation_1.default.navigate(ROUTES_1.default.SETTINGS_REPORT_FRAUD.getRoute(String(card.cardID)));
                        }}/>)}
                            </react_1.default.Fragment>);
            })}
                        {isTravelCard &&
                travelCards.map(function (card) {
                    var _a, _b;
                    return (<react_1.default.Fragment key={card.cardID}>
                                    {!!cardsDetails[card.cardID] && ((_a = cardsDetails[card.cardID]) === null || _a === void 0 ? void 0 : _a.cvv) ? (<CardDetails_1.default cvv={(_b = cardsDetails[card.cardID]) === null || _b === void 0 ? void 0 : _b.cvv}/>) : (<>
                                            <MenuItemWithTopDescription_1.default description={translate('cardPage.travelCardCvv')} title="•••" interactive={false} titleStyle={styles.walletCardNumber} shouldShowRightComponent rightComponent={!isSignedInAsDelegate ? (<Button_1.default text={translate('cardPage.cardDetails.revealCvv')} onPress={function () { return Navigation_1.default.navigate(ROUTES_1.default.SETTINGS_WALLET_DOMAIN_CARD_CONFIRM_MAGIC_CODE.getRoute(String(card.cardID))); }} isDisabled={isCardDetailsLoading[card.cardID] || isOffline} isLoading={isCardDetailsLoading[card.cardID]}/>) : undefined}/>
                                            <DotIndicatorMessage_1.default messages={cardsDetailsErrors[card.cardID] ? { error: translate(cardsDetailsErrors[card.cardID]) } : {}} type="error" style={[styles.ph5]}/>
                                        </>)}
                                    {!isSignedInAsDelegate && (<MenuItemWithTopDescription_1.default title={translate('cardPage.reportTravelFraud')} titleStyle={styles.walletCardMenuItem} icon={expensifyIcons.Flag} shouldShowRightIcon onPress={function () { return Navigation_1.default.navigate(ROUTES_1.default.SETTINGS_REPORT_FRAUD.getRoute(String(card.cardID))); }}/>)}
                                </react_1.default.Fragment>);
                })}
                        {shouldShowReportLostCardButton && (<>
                                <MenuItemWithTopDescription_1.default description={translate('cardPage.physicalCardNumber')} title={(0, CardUtils_1.maskCard)(currentPhysicalCard === null || currentPhysicalCard === void 0 ? void 0 : currentPhysicalCard.lastFourPAN)} interactive={false} titleStyle={styles.walletCardNumber}/>
                                {shouldShowPIN && (<MenuItemWithTopDescription_1.default description={translate('cardPage.physicalCardPin')} title={(0, CardUtils_1.maskPin)(pin)} interactive={false} titleStyle={styles.walletCardNumber}/>)}
                                <MenuItem_1.default title={translate('reportCardLostOrDamaged.screenTitle')} icon={expensifyIcons.Flag} shouldShowRightIcon onPress={function () {
                    if (isAccountLocked) {
                        showLockedAccountModal();
                        return;
                    }
                    Navigation_1.default.navigate(ROUTES_1.default.SETTINGS_WALLET_REPORT_CARD_LOST_OR_DAMAGED.getRoute(String(currentPhysicalCard === null || currentPhysicalCard === void 0 ? void 0 : currentPhysicalCard.cardID)));
                }}/>
                            </>)}
                        <MenuItem_1.default icon={expensifyIcons.MoneySearch} title={translate('workspace.common.viewTransactions')} style={styles.mt3} onPress={function () {
                Navigation_1.default.navigate(ROUTES_1.default.SEARCH_ROOT.getRoute({
                    query: (0, SearchQueryUtils_1.buildCannedSearchQuery)({ type: CONST_1.default.SEARCH.DATA_TYPES.EXPENSE, status: CONST_1.default.SEARCH.STATUS.EXPENSE.ALL, cardID: cardID }),
                }));
            }}/>
                    </>)}
                {cardToAdd !== undefined && (<index_1.default card={cardToAdd} style={styles.alignSelfCenter} cardHolderName={displayName !== null && displayName !== void 0 ? displayName : ''} cardDescription={expensifyCardTitle}/>)}
            </ScrollView_1.default>
            {(currentPhysicalCard === null || currentPhysicalCard === void 0 ? void 0 : currentPhysicalCard.state) === CONST_1.default.EXPENSIFY_CARD.STATE.NOT_ACTIVATED && (<Button_1.default success large style={[styles.w100, styles.p5]} onPress={function () { return Navigation_1.default.navigate(ROUTES_1.default.SETTINGS_WALLET_CARD_ACTIVATE.getRoute(String(currentPhysicalCard === null || currentPhysicalCard === void 0 ? void 0 : currentPhysicalCard.cardID))); }} text={translate('activateCardPage.activatePhysicalCard')}/>)}
            {(currentPhysicalCard === null || currentPhysicalCard === void 0 ? void 0 : currentPhysicalCard.state) === CONST_1.default.EXPENSIFY_CARD.STATE.STATE_NOT_ISSUED && (<Button_1.default success large text={translate('cardPage.getPhysicalCard')} pressOnEnter onPress={function () { return Navigation_1.default.navigate(ROUTES_1.default.MISSING_PERSONAL_DETAILS); }} style={[styles.mh5, styles.mb5]}/>)}
        </ScreenWrapper_1.default>);
}
ExpensifyCardPage.displayName = 'ExpensifyCardPage';
exports.default = ExpensifyCardPage;
