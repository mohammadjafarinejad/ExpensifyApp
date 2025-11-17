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
var HeaderWithBackButton_1 = require("@components/HeaderWithBackButton");
var InteractiveStepSubHeader_1 = require("@components/InteractiveStepSubHeader");
var KYCWallContext_1 = require("@components/KYCWall/KYCWallContext");
var ScreenWrapper_1 = require("@components/ScreenWrapper");
var useLocalize_1 = require("@hooks/useLocalize");
var useOnyx_1 = require("@hooks/useOnyx");
var useSubStep_1 = require("@hooks/useSubStep");
var useThemeStyles_1 = require("@hooks/useThemeStyles");
var BankAccounts_1 = require("@libs/actions/BankAccounts");
var PaymentMethods_1 = require("@libs/actions/PaymentMethods");
var Wallet_1 = require("@libs/actions/Wallet");
var Navigation_1 = require("@navigation/Navigation");
var CONST_1 = require("@src/CONST");
var ONYXKEYS_1 = require("@src/ONYXKEYS");
var ROUTES_1 = require("@src/ROUTES");
var SetupMethod_1 = require("./SetupMethod");
var ConfirmationStep_1 = require("./substeps/ConfirmationStep");
var PlaidStep_1 = require("./substeps/PlaidStep");
var plaidSubsteps = [PlaidStep_1.default, ConfirmationStep_1.default];
function AddBankAccount() {
    var plaidData = (0, useOnyx_1.default)(ONYXKEYS_1.default.PLAID_DATA, { canBeMissing: true })[0];
    var personalBankAccount = (0, useOnyx_1.default)(ONYXKEYS_1.default.PERSONAL_BANK_ACCOUNT, { canBeMissing: true })[0];
    var personalBankAccountDraft = (0, useOnyx_1.default)(ONYXKEYS_1.default.FORMS.PERSONAL_BANK_ACCOUNT_FORM_DRAFT, { canBeMissing: true })[0];
    var translate = (0, useLocalize_1.default)().translate;
    var styles = (0, useThemeStyles_1.default)();
    var kycWallRef = (0, react_1.useContext)(KYCWallContext_1.KYCWallContext);
    var submit = (0, react_1.useCallback)(function () {
        var _a, _b;
        var bankAccounts = (_a = plaidData === null || plaidData === void 0 ? void 0 : plaidData.bankAccounts) !== null && _a !== void 0 ? _a : [];
        var selectedPlaidBankAccount = bankAccounts.find(function (bankAccount) { return bankAccount.plaidAccountID === (personalBankAccountDraft === null || personalBankAccountDraft === void 0 ? void 0 : personalBankAccountDraft.plaidAccountID); });
        if (selectedPlaidBankAccount) {
            var bankAccountWithToken = selectedPlaidBankAccount.plaidAccessToken
                ? selectedPlaidBankAccount
                : __assign(__assign({}, selectedPlaidBankAccount), { plaidAccessToken: (_b = plaidData === null || plaidData === void 0 ? void 0 : plaidData.plaidAccessToken) !== null && _b !== void 0 ? _b : '' });
            (0, BankAccounts_1.addPersonalBankAccount)(bankAccountWithToken);
        }
    }, [personalBankAccountDraft === null || personalBankAccountDraft === void 0 ? void 0 : personalBankAccountDraft.plaidAccountID, plaidData === null || plaidData === void 0 ? void 0 : plaidData.bankAccounts, plaidData === null || plaidData === void 0 ? void 0 : plaidData.plaidAccessToken]);
    var isSetupTypeChosen = (personalBankAccountDraft === null || personalBankAccountDraft === void 0 ? void 0 : personalBankAccountDraft.setupType) === CONST_1.default.BANK_ACCOUNT.SETUP_TYPE.PLAID;
    var _a = (0, useSubStep_1.default)({ bodyContent: plaidSubsteps, startFrom: 0, onFinished: submit }), SubStep = _a.componentToRender, isEditing = _a.isEditing, screenIndex = _a.screenIndex, nextScreen = _a.nextScreen, prevScreen = _a.prevScreen, moveTo = _a.moveTo;
    var exitFlow = function (shouldContinue) {
        var _a;
        if (shouldContinue === void 0) { shouldContinue = false; }
        var exitReportID = personalBankAccount === null || personalBankAccount === void 0 ? void 0 : personalBankAccount.exitReportID;
        var onSuccessFallbackRoute = (_a = personalBankAccount === null || personalBankAccount === void 0 ? void 0 : personalBankAccount.onSuccessFallbackRoute) !== null && _a !== void 0 ? _a : '';
        if (exitReportID) {
            Navigation_1.default.dismissModalWithReport({ reportID: exitReportID });
            return;
        }
        if (shouldContinue && onSuccessFallbackRoute) {
            (0, PaymentMethods_1.continueSetup)(kycWallRef, onSuccessFallbackRoute);
            return;
        }
        Navigation_1.default.goBack(ROUTES_1.default.SETTINGS_WALLET);
    };
    var handleBackButtonPress = function () {
        if (!isSetupTypeChosen) {
            exitFlow();
            return;
        }
        if (screenIndex === 0) {
            (0, BankAccounts_1.clearPersonalBankAccount)();
            (0, Wallet_1.updateCurrentStep)(null);
            Navigation_1.default.goBack(ROUTES_1.default.SETTINGS_WALLET);
            return;
        }
        prevScreen();
    };
    return (<ScreenWrapper_1.default testID={AddBankAccount.displayName} includeSafeAreaPaddingBottom={false} shouldEnablePickerAvoiding={false} shouldShowOfflineIndicator shouldShowOfflineIndicatorInWideScreen>
            <HeaderWithBackButton_1.default shouldShowBackButton onBackButtonPress={handleBackButtonPress} title={translate('bankAccount.addBankAccount')}/>
            <react_native_1.View style={styles.flex1}>
                {isSetupTypeChosen ? (<>
                        <react_native_1.View style={[styles.ph5, styles.mb5, styles.mt3, { height: CONST_1.default.BANK_ACCOUNT.STEPS_HEADER_HEIGHT }]}>
                            <InteractiveStepSubHeader_1.default startStepIndex={0} stepNames={CONST_1.default.WALLET.STEP_NAMES}/>
                        </react_native_1.View>
                        <SubStep isEditing={isEditing} onNext={nextScreen} onMove={moveTo}/>
                    </>) : (<SetupMethod_1.default />)}
            </react_native_1.View>
        </ScreenWrapper_1.default>);
}
AddBankAccount.displayName = 'AddBankAccountPage';
exports.default = AddBankAccount;
