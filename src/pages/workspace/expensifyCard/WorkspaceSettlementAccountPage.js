"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_native_1 = require("react-native");
var HeaderWithBackButton_1 = require("@components/HeaderWithBackButton");
var Icon_1 = require("@components/Icon");
var BankIcons_1 = require("@components/Icon/BankIcons");
var RenderHTML_1 = require("@components/RenderHTML");
var ScreenWrapper_1 = require("@components/ScreenWrapper");
var SelectionList_1 = require("@components/SelectionList");
var RadioListItem_1 = require("@components/SelectionList/ListItem/RadioListItem");
var Text_1 = require("@components/Text");
var useDefaultFundID_1 = require("@hooks/useDefaultFundID");
var useEnvironment_1 = require("@hooks/useEnvironment");
var useExpensifyCardUkEuSupported_1 = require("@hooks/useExpensifyCardUkEuSupported");
var useLocalize_1 = require("@hooks/useLocalize");
var useOnyx_1 = require("@hooks/useOnyx");
var useThemeStyles_1 = require("@hooks/useThemeStyles");
var AccountingUtils_1 = require("@libs/AccountingUtils");
var PolicyConnections_1 = require("@libs/actions/PolicyConnections");
var BankAccountUtils_1 = require("@libs/BankAccountUtils");
var CardUtils_1 = require("@libs/CardUtils");
var PolicyUtils_1 = require("@libs/PolicyUtils");
var Navigation_1 = require("@navigation/Navigation");
var AccessOrNotFoundWrapper_1 = require("@pages/workspace/AccessOrNotFoundWrapper");
var Card_1 = require("@userActions/Card");
var CONST_1 = require("@src/CONST");
var ONYXKEYS_1 = require("@src/ONYXKEYS");
var ROUTES_1 = require("@src/ROUTES");
function BankAccountListItemLeftElement(_a) {
    var bankName = _a.bankName;
    var styles = (0, useThemeStyles_1.default)();
    var _b = (0, BankIcons_1.default)({ bankName: bankName, styles: styles }), icon = _b.icon, iconSize = _b.iconSize, iconStyles = _b.iconStyles;
    return (<react_native_1.View style={[styles.flexRow, styles.alignItemsCenter, styles.mr3]}>
            <Icon_1.default src={icon} width={iconSize} height={iconSize} additionalStyles={iconStyles}/>
        </react_native_1.View>);
}
function WorkspaceSettlementAccountPage(_a) {
    var _b, _c, _d, _e, _f, _g, _h, _j;
    var route = _a.route;
    var styles = (0, useThemeStyles_1.default)();
    var translate = (0, useLocalize_1.default)().translate;
    var environmentURL = (0, useEnvironment_1.default)().environmentURL;
    var policyID = (_b = route.params) === null || _b === void 0 ? void 0 : _b.policyID;
    var defaultFundID = (0, useDefaultFundID_1.default)(policyID);
    var policy = (0, useOnyx_1.default)("".concat(ONYXKEYS_1.default.COLLECTION.POLICY).concat(policyID), { canBeMissing: true })[0];
    var bankAccountsList = (0, useOnyx_1.default)(ONYXKEYS_1.default.BANK_ACCOUNT_LIST, { canBeMissing: true })[0];
    var cardSettings = (0, useOnyx_1.default)("".concat(ONYXKEYS_1.default.COLLECTION.PRIVATE_EXPENSIFY_CARD_SETTINGS).concat(defaultFundID), { canBeMissing: true })[0];
    var isUsingContinuousReconciliation = (0, useOnyx_1.default)("".concat(ONYXKEYS_1.default.COLLECTION.EXPENSIFY_CARD_USE_CONTINUOUS_RECONCILIATION).concat(defaultFundID), { canBeMissing: true })[0];
    var reconciliationConnection = (0, useOnyx_1.default)("".concat(ONYXKEYS_1.default.COLLECTION.EXPENSIFY_CARD_CONTINUOUS_RECONCILIATION_CONNECTION).concat(defaultFundID), { canBeMissing: true })[0];
    var isUkEuCurrencySupported = (0, useExpensifyCardUkEuSupported_1.default)(policyID);
    var paymentBankAccountID = cardSettings === null || cardSettings === void 0 ? void 0 : cardSettings.paymentBankAccountID;
    var paymentBankAccountNumberFromCardSettings = cardSettings === null || cardSettings === void 0 ? void 0 : cardSettings.paymentBankAccountNumber;
    var paymentBankAccountAddressName = cardSettings === null || cardSettings === void 0 ? void 0 : cardSettings.paymentBankAccountAddressName;
    var paymentBankAccountNumber = (_g = (_f = (_e = (_d = bankAccountsList === null || bankAccountsList === void 0 ? void 0 : bankAccountsList[(_c = paymentBankAccountID === null || paymentBankAccountID === void 0 ? void 0 : paymentBankAccountID.toString()) !== null && _c !== void 0 ? _c : '']) === null || _d === void 0 ? void 0 : _d.accountData) === null || _e === void 0 ? void 0 : _e.accountNumber) !== null && _f !== void 0 ? _f : paymentBankAccountNumberFromCardSettings) !== null && _g !== void 0 ? _g : '';
    var eligibleBankAccounts = isUkEuCurrencySupported ? (0, CardUtils_1.getEligibleBankAccountsForUkEuCard)(bankAccountsList, policy === null || policy === void 0 ? void 0 : policy.outputCurrency) : (0, CardUtils_1.getEligibleBankAccountsForCard)(bankAccountsList);
    var domainName = (_h = cardSettings === null || cardSettings === void 0 ? void 0 : cardSettings.domainName) !== null && _h !== void 0 ? _h : (0, PolicyUtils_1.getDomainNameForPolicy)(policyID);
    var hasActiveAccountingConnection = !!((policy === null || policy === void 0 ? void 0 : policy.connections) && Object.keys(policy.connections).length > 0);
    var fetchPolicyAccountingData = (0, react_1.useCallback)(function () {
        if (!policyID) {
            return;
        }
        (0, PolicyConnections_1.openPolicyAccountingPage)(policyID);
    }, [policyID]);
    (0, react_1.useEffect)(function () {
        if (!cardSettings || !hasActiveAccountingConnection || isUsingContinuousReconciliation !== undefined || reconciliationConnection !== undefined) {
            return;
        }
        fetchPolicyAccountingData();
    }, [cardSettings, hasActiveAccountingConnection, isUsingContinuousReconciliation, reconciliationConnection, fetchPolicyAccountingData]);
    var eligibleBankAccountsOptions = eligibleBankAccounts.map(function (bankAccount) {
        var _a, _b, _c, _d, _e, _f, _g;
        var bankName = ((_b = (_a = bankAccount.accountData) === null || _a === void 0 ? void 0 : _a.addressName) !== null && _b !== void 0 ? _b : '');
        var bankAccountNumber = (_d = (_c = bankAccount.accountData) === null || _c === void 0 ? void 0 : _c.accountNumber) !== null && _d !== void 0 ? _d : '';
        var bankAccountID = (_f = (_e = bankAccount.accountData) === null || _e === void 0 ? void 0 : _e.bankAccountID) !== null && _f !== void 0 ? _f : bankAccount.methodID;
        return {
            value: bankAccountID,
            text: bankAccount.title,
            leftElement: <BankAccountListItemLeftElement bankName={bankName}/>,
            alternateText: "".concat(translate('workspace.expensifyCard.accountEndingIn'), " ").concat((0, BankAccountUtils_1.getLastFourDigits)(bankAccountNumber)),
            keyForList: (_g = bankAccountID === null || bankAccountID === void 0 ? void 0 : bankAccountID.toString()) !== null && _g !== void 0 ? _g : '',
            isSelected: bankAccountID === paymentBankAccountID,
        };
    });
    var fallbackBankAccountOption = {
        value: paymentBankAccountID,
        text: paymentBankAccountAddressName,
        leftElement: <BankAccountListItemLeftElement bankName={(paymentBankAccountAddressName !== null && paymentBankAccountAddressName !== void 0 ? paymentBankAccountAddressName : '')}/>,
        alternateText: "".concat(translate('workspace.expensifyCard.accountEndingIn'), " ").concat((0, BankAccountUtils_1.getLastFourDigits)(paymentBankAccountNumberFromCardSettings !== null && paymentBankAccountNumberFromCardSettings !== void 0 ? paymentBankAccountNumberFromCardSettings : '')),
        keyForList: (_j = paymentBankAccountID === null || paymentBankAccountID === void 0 ? void 0 : paymentBankAccountID.toString()) !== null && _j !== void 0 ? _j : '',
        isSelected: true,
    };
    var listOptions = eligibleBankAccountsOptions.length > 0 ? eligibleBankAccountsOptions : [fallbackBankAccountOption];
    var updateSettlementAccount = function (value) {
        (0, Card_1.updateSettlementAccount)(domainName, defaultFundID, policyID, value, paymentBankAccountID);
        Navigation_1.default.goBack();
    };
    var customListHeaderContent = (0, react_1.useMemo)(function () {
        var connectionName = reconciliationConnection !== null && reconciliationConnection !== void 0 ? reconciliationConnection : '';
        var connectionParam = (0, AccountingUtils_1.getRouteParamForConnection)(connectionName);
        return (<>
                <Text_1.default style={[styles.mh5, styles.mv4]}>{translate('workspace.expensifyCard.settlementAccountDescription')}</Text_1.default>
                {!!isUsingContinuousReconciliation && !!connectionParam && hasActiveAccountingConnection && (<react_native_1.View style={[styles.renderHTML, styles.mh5, styles.mb6]}>
                        <RenderHTML_1.default html={translate('workspace.expensifyCard.settlementAccountInfo', {
                    reconciliationAccountSettingsLink: "".concat(environmentURL, "/").concat(ROUTES_1.default.WORKSPACE_ACCOUNTING_RECONCILIATION_ACCOUNT_SETTINGS.getRoute(policyID, connectionParam, Navigation_1.default.getActiveRoute())),
                    accountNumber: "".concat(CONST_1.default.MASKED_PAN_PREFIX).concat((0, BankAccountUtils_1.getLastFourDigits)(paymentBankAccountNumber)),
                })}/>
                    </react_native_1.View>)}
            </>);
    }, [isUsingContinuousReconciliation, reconciliationConnection, environmentURL, paymentBankAccountNumber, translate, hasActiveAccountingConnection, policyID, styles]);
    return (<AccessOrNotFoundWrapper_1.default accessVariants={[CONST_1.default.POLICY.ACCESS_VARIANTS.ADMIN, CONST_1.default.POLICY.ACCESS_VARIANTS.PAID]} policyID={policyID} featureName={CONST_1.default.POLICY.MORE_FEATURES.ARE_EXPENSIFY_CARDS_ENABLED}>
            <ScreenWrapper_1.default testID={WorkspaceSettlementAccountPage.displayName} enableEdgeToEdgeBottomSafeAreaPadding shouldEnableMaxHeight>
                <HeaderWithBackButton_1.default title={translate('workspace.expensifyCard.settlementAccount')} onBackButtonPress={function () {
            var _a;
            if ((_a = route.params) === null || _a === void 0 ? void 0 : _a.backTo) {
                Navigation_1.default.goBack(route.params.backTo);
                return;
            }
            Navigation_1.default.goBack(ROUTES_1.default.WORKSPACE_EXPENSIFY_CARD_SETTINGS.getRoute(policyID));
        }}/>
                <SelectionList_1.default addBottomSafeAreaPadding data={listOptions} ListItem={RadioListItem_1.default} onSelectRow={function (_a) {
        var value = _a.value;
        return updateSettlementAccount(value !== null && value !== void 0 ? value : 0);
    }} shouldSingleExecuteRowSelect initiallyFocusedItemKey={paymentBankAccountID === null || paymentBankAccountID === void 0 ? void 0 : paymentBankAccountID.toString()} customListHeaderContent={customListHeaderContent}/>
            </ScreenWrapper_1.default>
        </AccessOrNotFoundWrapper_1.default>);
}
WorkspaceSettlementAccountPage.displayName = 'WorkspaceSettlementAccountPage';
exports.default = WorkspaceSettlementAccountPage;
