"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var ConfirmationPage_1 = require("@components/ConfirmationPage");
var Illustrations_1 = require("@components/Icon/Illustrations");
var Text_1 = require("@components/Text");
var TextLink_1 = require("@components/TextLink");
var useCardFeeds_1 = require("@hooks/useCardFeeds");
var useCardsList_1 = require("@hooks/useCardsList");
var useLocalize_1 = require("@hooks/useLocalize");
var usePolicy_1 = require("@hooks/usePolicy");
var useThemeStyles_1 = require("@hooks/useThemeStyles");
var CardUtils_1 = require("@libs/CardUtils");
var Navigation_1 = require("@navigation/Navigation");
var CompanyCards_1 = require("@userActions/CompanyCards");
var Policy_1 = require("@userActions/Policy/Policy");
var CONST_1 = require("@src/CONST");
var ROUTES_1 = require("@src/ROUTES");
function WorkspaceCompanyCardsErrorConfirmation(_a) {
    var _b;
    var policyID = _a.policyID, newFeed = _a.newFeed;
    var translate = (0, useLocalize_1.default)().translate;
    var styles = (0, useThemeStyles_1.default)();
    var policy = (0, usePolicy_1.default)(policyID);
    var isExpensifyCardFeatureEnabled = !!(policy === null || policy === void 0 ? void 0 : policy.areExpensifyCardsEnabled);
    var cardsList = (0, useCardsList_1.default)(policyID, newFeed)[0];
    var cardFeeds = (0, useCardFeeds_1.default)(policyID)[0];
    var workspaceAccountID = (_b = policy === null || policy === void 0 ? void 0 : policy.workspaceAccountID) !== null && _b !== void 0 ? _b : CONST_1.default.DEFAULT_NUMBER_ID;
    var companyFeeds = (0, CardUtils_1.getCompanyFeeds)(cardFeeds);
    var selectedFeedData = newFeed ? companyFeeds[newFeed] : undefined;
    var domainOrWorkspaceAccountID = (0, CardUtils_1.getDomainOrWorkspaceAccountID)(workspaceAccountID, selectedFeedData);
    var deleteCompanyCardFeed = function () {
        if (!policyID || !newFeed) {
            return;
        }
        var _a = cardsList !== null && cardsList !== void 0 ? cardsList : {}, cardList = _a.cardList, cards = __rest(_a, ["cardList"]);
        var cardIDs = Object.keys(cards);
        var feedToOpen = Object.keys(companyFeeds).find(function (feed) { var _a; return feed !== newFeed && ((_a = companyFeeds[feed]) === null || _a === void 0 ? void 0 : _a.pendingAction) !== CONST_1.default.RED_BRICK_ROAD_PENDING_ACTION.DELETE; });
        (0, CompanyCards_1.deleteWorkspaceCompanyCardFeed)(policyID, domainOrWorkspaceAccountID, newFeed, cardIDs, feedToOpen);
    };
    var onButtonPress = function () {
        deleteCompanyCardFeed();
        Navigation_1.default.closeRHPFlow();
    };
    var openPlaidLink = function () {
        if (!policyID) {
            return;
        }
        (0, CompanyCards_1.setAddNewCompanyCardStepAndData)({
            step: CONST_1.default.COMPANY_CARDS.STEP.PLAID_CONNECTION,
            data: {
                selectedBank: CONST_1.default.COMPANY_CARDS.BANKS.OTHER,
                cardTitle: undefined,
                feedType: undefined,
            },
            isEditing: false,
        });
    };
    var openExpensifyCardLink = function () {
        onButtonPress();
        if (!policyID) {
            return;
        }
        if (!isExpensifyCardFeatureEnabled) {
            (0, Policy_1.enableExpensifyCard)(policyID, true, true);
            return;
        }
        Navigation_1.default.navigate(ROUTES_1.default.WORKSPACE_EXPENSIFY_CARD.getRoute(policyID));
    };
    return (<ConfirmationPage_1.default heading={translate('workspace.moreFeatures.companyCards.bankConnectionError')} description={<Text_1.default style={[styles.textSupporting, styles.textAlignCenter]}>
                    {translate('workspace.moreFeatures.companyCards.bankConnectionDescription')}{' '}
                    <TextLink_1.default style={[styles.link]} onPress={openPlaidLink}>
                        {translate('workspace.moreFeatures.companyCards.connectWithPlaid')}
                    </TextLink_1.default>{' '}
                    <Text_1.default style={styles.textSupporting}>{translate('common.or')}</Text_1.default>{' '}
                    <TextLink_1.default style={[styles.link]} onPress={openExpensifyCardLink}>
                        {translate('workspace.moreFeatures.companyCards.connectWithExpensifyCard')}
                    </TextLink_1.default>
                </Text_1.default>} illustration={Illustrations_1.BrokenCompanyCardBankConnection} shouldShowButton illustrationStyle={styles.errorStateCardIllustration} onButtonPress={onButtonPress} buttonText={translate('common.buttonConfirm')} containerStyle={styles.h100}/>);
}
exports.default = WorkspaceCompanyCardsErrorConfirmation;
