"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Account_1 = require("@selectors/Account");
var react_1 = require("react");
var react_native_1 = require("react-native");
var ConfirmModal_1 = require("@components/ConfirmModal");
var DelegateNoAccessWrapper_1 = require("@components/DelegateNoAccessWrapper");
var FullscreenLoadingIndicator_1 = require("@components/FullscreenLoadingIndicator");
var ScreenWrapper_1 = require("@components/ScreenWrapper");
var useLocalize_1 = require("@hooks/useLocalize");
var useOnyx_1 = require("@hooks/useOnyx");
var usePermissions_1 = require("@hooks/usePermissions");
var useThemeStyles_1 = require("@hooks/useThemeStyles");
var useWorkspaceAccountID_1 = require("@hooks/useWorkspaceAccountID");
var Report_1 = require("@libs/actions/Report");
var BankConnection_1 = require("@pages/workspace/companyCards/BankConnection");
var withPolicyAndFullscreenLoading_1 = require("@pages/workspace/withPolicyAndFullscreenLoading");
var CompanyCards_1 = require("@userActions/CompanyCards");
var CONST_1 = require("@src/CONST");
var ONYXKEYS_1 = require("@src/ONYXKEYS");
var isLoadingOnyxValue_1 = require("@src/types/utils/isLoadingOnyxValue");
var AmexCustomFeed_1 = require("./AmexCustomFeed");
var CardInstructionsStep_1 = require("./CardInstructionsStep");
var CardNameStep_1 = require("./CardNameStep");
var CardTypeStep_1 = require("./CardTypeStep");
var DetailsStep_1 = require("./DetailsStep");
var DirectStatementCloseDatePage_1 = require("./DirectStatementCloseDatePage");
var PlaidConnectionStep_1 = require("./PlaidConnectionStep");
var SelectBankStep_1 = require("./SelectBankStep");
var SelectCountryStep_1 = require("./SelectCountryStep");
var SelectFeedType_1 = require("./SelectFeedType");
var StatementCloseDateStep_1 = require("./StatementCloseDateStep");
function AddNewCardPage(_a) {
    var policy = _a.policy;
    var policyID = policy === null || policy === void 0 ? void 0 : policy.id;
    var styles = (0, useThemeStyles_1.default)();
    var workspaceAccountID = (0, useWorkspaceAccountID_1.default)(policyID);
    var _b = (0, useOnyx_1.default)(ONYXKEYS_1.default.ADD_NEW_COMPANY_CARD, { canBeMissing: false }), addNewCardFeed = _b[0], addNewCardFeedMetadata = _b[1];
    var currentStep = (addNewCardFeed !== null && addNewCardFeed !== void 0 ? addNewCardFeed : {}).currentStep;
    var isBetaEnabled = (0, usePermissions_1.default)().isBetaEnabled;
    var _c = (0, react_1.useState)(false), isModalVisible = _c[0], setIsModalVisible = _c[1];
    var translate = (0, useLocalize_1.default)().translate;
    var isActingAsDelegate = (0, useOnyx_1.default)(ONYXKEYS_1.default.ACCOUNT, { selector: Account_1.isActingAsDelegateSelector, canBeMissing: false })[0];
    var isAddCardFeedLoading = (0, isLoadingOnyxValue_1.default)(addNewCardFeedMetadata);
    (0, react_1.useEffect)(function () {
        return function () {
            (0, CompanyCards_1.clearAddNewCardFlow)();
        };
    }, []);
    (0, react_1.useEffect)(function () {
        // If the user only has a domain feed, a workspace account may not have been created yet.
        // However, adding a workspace feed requires a workspace account.
        // Calling openPolicyAddCardFeedPage will trigger the creation of a workspace account.
        if (workspaceAccountID) {
            return;
        }
        (0, CompanyCards_1.openPolicyAddCardFeedPage)(policyID);
    }, [workspaceAccountID, policyID]);
    if (isAddCardFeedLoading) {
        return <FullscreenLoadingIndicator_1.default />;
    }
    if (isActingAsDelegate) {
        return (<ScreenWrapper_1.default testID={AddNewCardPage.displayName} enableEdgeToEdgeBottomSafeAreaPadding shouldEnablePickerAvoiding={false}>
                <DelegateNoAccessWrapper_1.default accessDeniedVariants={[CONST_1.default.DELEGATE.DENIED_ACCESS_VARIANTS.DELEGATE]}/>
            </ScreenWrapper_1.default>);
    }
    var CurrentStep;
    switch (currentStep) {
        case CONST_1.default.COMPANY_CARDS.STEP.SELECT_BANK:
            CurrentStep = <SelectBankStep_1.default />;
            break;
        case CONST_1.default.COMPANY_CARDS.STEP.SELECT_FEED_TYPE:
            CurrentStep = <SelectFeedType_1.default />;
            break;
        case CONST_1.default.COMPANY_CARDS.STEP.CARD_TYPE:
            CurrentStep = <CardTypeStep_1.default />;
            break;
        case CONST_1.default.COMPANY_CARDS.STEP.BANK_CONNECTION:
            CurrentStep = <BankConnection_1.default policyID={policyID}/>;
            break;
        case CONST_1.default.COMPANY_CARDS.STEP.CARD_INSTRUCTIONS:
            CurrentStep = <CardInstructionsStep_1.default policyID={policyID}/>;
            break;
        case CONST_1.default.COMPANY_CARDS.STEP.CARD_NAME:
            CurrentStep = <CardNameStep_1.default />;
            break;
        case CONST_1.default.COMPANY_CARDS.STEP.CARD_DETAILS:
            CurrentStep = <DetailsStep_1.default />;
            break;
        case CONST_1.default.COMPANY_CARDS.STEP.AMEX_CUSTOM_FEED:
            CurrentStep = <AmexCustomFeed_1.default />;
            break;
        case CONST_1.default.COMPANY_CARDS.STEP.PLAID_CONNECTION:
            CurrentStep = <PlaidConnectionStep_1.default onExit={function () { return setIsModalVisible(true); }}/>;
            break;
        case CONST_1.default.COMPANY_CARDS.STEP.SELECT_STATEMENT_CLOSE_DATE:
            CurrentStep = <StatementCloseDateStep_1.default policyID={policyID}/>;
            break;
        case CONST_1.default.COMPANY_CARDS.STEP.SELECT_DIRECT_STATEMENT_CLOSE_DATE:
            CurrentStep = <DirectStatementCloseDatePage_1.default policyID={policyID}/>;
            break;
        default:
            CurrentStep = isBetaEnabled(CONST_1.default.BETAS.PLAID_COMPANY_CARDS) ? <SelectCountryStep_1.default policyID={policyID}/> : <SelectBankStep_1.default />;
            break;
    }
    return (<>
            <react_native_1.View style={styles.flex1} fsClass={CONST_1.default.FULLSTORY.CLASS.MASK}>
                {CurrentStep}
            </react_native_1.View>
            <ConfirmModal_1.default isVisible={isModalVisible} title={translate('workspace.companyCards.addNewCard.exitModal.title')} success confirmText={translate('workspace.companyCards.addNewCard.exitModal.confirmText')} cancelText={translate('workspace.companyCards.addNewCard.exitModal.cancelText')} prompt={translate('workspace.companyCards.addNewCard.exitModal.prompt')} onCancel={function () { return setIsModalVisible(false); }} onConfirm={function () {
            setIsModalVisible(false);
            (0, Report_1.navigateToConciergeChat)();
        }}/>
        </>);
}
AddNewCardPage.displayName = 'AddNewCardPage';
exports.default = (0, withPolicyAndFullscreenLoading_1.default)(AddNewCardPage);
