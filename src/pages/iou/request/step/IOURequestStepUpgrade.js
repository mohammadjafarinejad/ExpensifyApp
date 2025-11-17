"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var HeaderWithBackButton_1 = require("@components/HeaderWithBackButton");
var OnyxListItemProvider_1 = require("@components/OnyxListItemProvider");
var ScreenWrapper_1 = require("@components/ScreenWrapper");
var ScrollView_1 = require("@components/ScrollView");
var WorkspaceConfirmationForm_1 = require("@components/WorkspaceConfirmationForm");
var useCurrentUserPersonalDetails_1 = require("@hooks/useCurrentUserPersonalDetails");
var useLocalize_1 = require("@hooks/useLocalize");
var useNetwork_1 = require("@hooks/useNetwork");
var useOnyx_1 = require("@hooks/useOnyx");
var useThemeStyles_1 = require("@hooks/useThemeStyles");
var Transaction_1 = require("@libs/actions/Transaction");
var getPlatform_1 = require("@libs/getPlatform");
var Navigation_1 = require("@libs/Navigation/Navigation");
var OptionsListUtils_1 = require("@libs/OptionsListUtils");
var UpgradeConfirmation_1 = require("@pages/workspace/upgrade/UpgradeConfirmation");
var UpgradeIntro_1 = require("@pages/workspace/upgrade/UpgradeIntro");
var IOU_1 = require("@userActions/IOU");
var CONST_1 = require("@src/CONST");
var Policy = require("@src/libs/actions/Policy/Policy");
var ONYXKEYS_1 = require("@src/ONYXKEYS");
var ROUTES_1 = require("@src/ROUTES");
function IOURequestStepUpgrade(_a) {
    var _b;
    var _c = _a.route.params, transactionID = _c.transactionID, action = _c.action, reportID = _c.reportID, shouldSubmitExpense = _c.shouldSubmitExpense, upgradePath = _c.upgradePath, backTo = _c.backTo;
    var styles = (0, useThemeStyles_1.default)();
    var translate = (0, useLocalize_1.default)().translate;
    var isOffline = (0, useNetwork_1.default)().isOffline;
    var currentUserPersonalDetails = (0, useCurrentUserPersonalDetails_1.default)();
    var personalDetails = (0, OnyxListItemProvider_1.usePersonalDetails)();
    var transaction = (0, useOnyx_1.default)("".concat(ONYXKEYS_1.default.COLLECTION.TRANSACTION_DRAFT).concat(transactionID), { canBeMissing: true })[0];
    var _d = (0, react_1.useState)(false), isUpgraded = _d[0], setIsUpgraded = _d[1];
    var _e = (0, react_1.useState)(false), showConfirmationForm = _e[0], setShowConfirmationForm = _e[1];
    var _f = (0, react_1.useState)(''), createdPolicyName = _f[0], setCreatedPolicyName = _f[1];
    var policyDataRef = (0, react_1.useRef)(null);
    var isDistanceRateUpgrade = upgradePath === CONST_1.default.UPGRADE_PATHS.DISTANCE_RATES;
    var isCategorizing = upgradePath === CONST_1.default.UPGRADE_PATHS.CATEGORIES;
    var isReporting = upgradePath === CONST_1.default.UPGRADE_PATHS.REPORTS;
    var platform = (0, getPlatform_1.default)();
    var isWebOrDesktop = platform === CONST_1.default.PLATFORM.WEB || platform === CONST_1.default.PLATFORM.DESKTOP;
    var feature = (0, react_1.useMemo)(function () {
        return Object.values(CONST_1.default.UPGRADE_FEATURE_INTRO_MAPPING)
            .filter(function (value) { return value.id !== CONST_1.default.UPGRADE_FEATURE_INTRO_MAPPING.policyPreventMemberChangingTitle.id; })
            .find(function (f) { return f.alias === upgradePath; });
    }, [upgradePath]);
    var navigateWithMicrotask = (0, react_1.useCallback)(function (route) {
        if (isWebOrDesktop) {
            Navigation_1.default.setNavigationActionToMicrotaskQueue(function () { return Navigation_1.default.navigate(route); });
        }
        else {
            Navigation_1.default.navigate(route);
        }
    }, [isWebOrDesktop]);
    var afterUpgradeAcknowledged = (0, react_1.useCallback)(function () {
        var _a, _b, _c, _d, _e;
        var expenseReportID = (_b = (_a = policyDataRef.current) === null || _a === void 0 ? void 0 : _a.expenseChatReportID) !== null && _b !== void 0 ? _b : reportID;
        var policyID = (_c = policyDataRef.current) === null || _c === void 0 ? void 0 : _c.policyID;
        if (shouldSubmitExpense) {
            (0, IOU_1.setMoneyRequestParticipants)(transactionID, [
                {
                    selected: true,
                    accountID: 0,
                    isPolicyExpenseChat: true,
                    reportID: expenseReportID,
                    policyID: (_d = policyDataRef.current) === null || _d === void 0 ? void 0 : _d.policyID,
                    searchText: (_e = policyDataRef.current) === null || _e === void 0 ? void 0 : _e.policyName,
                },
            ]);
        }
        Navigation_1.default.goBack();
        switch (upgradePath) {
            case CONST_1.default.UPGRADE_PATHS.DISTANCE_RATES: {
                if (!policyID || !reportID) {
                    return;
                }
                (0, Transaction_1.setTransactionReport)(transactionID, { reportID: expenseReportID }, true);
                // Let the confirmation step decide the distance rate because policy data is not fully available at this step
                (0, IOU_1.setCustomUnitRateID)(transactionID, '-1');
                Navigation_1.default.setParams({ reportID: expenseReportID });
                navigateWithMicrotask(ROUTES_1.default.WORKSPACE_CREATE_DISTANCE_RATE.getRoute(policyID, transactionID, expenseReportID));
                break;
            }
            case CONST_1.default.UPGRADE_PATHS.REPORTS:
                navigateWithMicrotask(ROUTES_1.default.MONEY_REQUEST_STEP_REPORT.getRoute(action, CONST_1.default.IOU.TYPE.SUBMIT, transactionID, reportID));
                break;
            case CONST_1.default.UPGRADE_PATHS.CATEGORIES:
                navigateWithMicrotask(backTo !== null && backTo !== void 0 ? backTo : ROUTES_1.default.MONEY_REQUEST_STEP_CATEGORY.getRoute(action, CONST_1.default.IOU.TYPE.SUBMIT, transactionID, reportID));
                break;
            default:
        }
    }, [action, backTo, navigateWithMicrotask, reportID, shouldSubmitExpense, transactionID, upgradePath]);
    var adminParticipant = (0, react_1.useMemo)(function () {
        var _a;
        var participant = (_a = transaction === null || transaction === void 0 ? void 0 : transaction.participants) === null || _a === void 0 ? void 0 : _a[0];
        if (!isDistanceRateUpgrade || !(participant === null || participant === void 0 ? void 0 : participant.accountID)) {
            return;
        }
        return (0, OptionsListUtils_1.getParticipantsOption)(participant, personalDetails);
    }, [isDistanceRateUpgrade, transaction === null || transaction === void 0 ? void 0 : transaction.participants, personalDetails]);
    var onUpgrade = (0, react_1.useCallback)(function () {
        var _a;
        if (isCategorizing || isReporting) {
            setShowConfirmationForm(true);
            return;
        }
        var policyData = Policy.createWorkspace({
            policyOwnerEmail: undefined,
            policyName: undefined,
            policyID: undefined,
            engagementChoice: CONST_1.default.ONBOARDING_CHOICES.TRACK_WORKSPACE,
            currency: (_a = currentUserPersonalDetails === null || currentUserPersonalDetails === void 0 ? void 0 : currentUserPersonalDetails.localCurrencyCode) !== null && _a !== void 0 ? _a : '',
            featuresMap: [
                {
                    id: CONST_1.default.POLICY.MORE_FEATURES.ARE_DISTANCE_RATES_ENABLED,
                    enabled: isDistanceRateUpgrade,
                },
            ],
            adminParticipant: adminParticipant,
            hasOutstandingChildRequest: false,
        });
        setIsUpgraded(true);
        policyDataRef.current = policyData;
    }, [isCategorizing, isReporting, currentUserPersonalDetails === null || currentUserPersonalDetails === void 0 ? void 0 : currentUserPersonalDetails.localCurrencyCode, isDistanceRateUpgrade, adminParticipant]);
    var session = (0, useOnyx_1.default)(ONYXKEYS_1.default.SESSION, { canBeMissing: false })[0];
    var onWorkspaceConfirmationSubmit = function (params) {
        var policyData = Policy.createWorkspace({
            policyOwnerEmail: undefined,
            makeMeAdmin: false,
            policyName: params.name,
            policyID: params.policyID,
            currency: params.currency,
            file: params.avatarFile,
            engagementChoice: CONST_1.default.ONBOARDING_CHOICES.TRACK_WORKSPACE,
        });
        policyDataRef.current = policyData;
        setCreatedPolicyName(params.name);
        setShowConfirmationForm(false);
        setIsUpgraded(true);
    };
    return (<ScreenWrapper_1.default shouldShowOfflineIndicator testID="workspaceUpgradePage" offlineIndicatorStyle={styles.mtAuto} shouldShowOfflineIndicatorInWideScreen={!isUpgraded && !showConfirmationForm}>
            {(!!isUpgraded || !showConfirmationForm) && (<HeaderWithBackButton_1.default title={translate('common.upgrade')} onBackButtonPress={function () { return Navigation_1.default.goBack(); }}/>)}
            {!showConfirmationForm && (<ScrollView_1.default contentContainerStyle={styles.flexGrow1}>
                    {!!isUpgraded && (<UpgradeConfirmation_1.default afterUpgradeAcknowledged={afterUpgradeAcknowledged} policyName={createdPolicyName} isCategorizing={isCategorizing} isReporting={isReporting} isDistanceRateUpgrade={isDistanceRateUpgrade}/>)}
                    {!isUpgraded && (<UpgradeIntro_1.default feature={feature} onUpgrade={onUpgrade} buttonDisabled={isOffline} loading={false} isCategorizing={isCategorizing} isReporting={isReporting} isDistanceRateUpgrade={isDistanceRateUpgrade}/>)}
                </ScrollView_1.default>)}
            {!isUpgraded && showConfirmationForm && (<WorkspaceConfirmationForm_1.default policyOwnerEmail={(_b = session === null || session === void 0 ? void 0 : session.email) !== null && _b !== void 0 ? _b : ''} onSubmit={onWorkspaceConfirmationSubmit} onBackButtonPress={function () { return setShowConfirmationForm(false); }} addBottomSafeAreaPadding={false}/>)}
        </ScreenWrapper_1.default>);
}
exports.default = IOURequestStepUpgrade;
