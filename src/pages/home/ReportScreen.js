"use strict";
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
var portal_1 = require("@gorhom/portal");
var native_1 = require("@react-navigation/native");
var Session_1 = require("@selectors/Session");
var fast_equals_1 = require("fast-equals");
var react_1 = require("react");
// We use Animated for all functionality related to wide RHP to make it easier
// to interact with react-navigation components (e.g., CardContainer, interpolator), which also use Animated.
// eslint-disable-next-line no-restricted-imports
var react_native_1 = require("react-native");
var Banner_1 = require("@components/Banner");
var FullPageNotFoundView_1 = require("@components/BlockingViews/FullPageNotFoundView");
var Provider_1 = require("@components/DragAndDrop/Provider");
var Expensicons = require("@components/Icon/Expensicons");
var MoneyReportHeader_1 = require("@components/MoneyReportHeader");
var MoneyRequestHeader_1 = require("@components/MoneyRequestHeader");
var MoneyRequestReportActionsList_1 = require("@components/MoneyRequestReportView/MoneyRequestReportActionsList");
var OfflineWithFeedback_1 = require("@components/OfflineWithFeedback");
var MoneyRequestReceiptView_1 = require("@components/ReportActionItem/MoneyRequestReceiptView");
var ReportActionsSkeletonView_1 = require("@components/ReportActionsSkeletonView");
var ScreenWrapper_1 = require("@components/ScreenWrapper");
var ScrollView_1 = require("@components/ScrollView");
var WideRHPContextProvider_1 = require("@components/WideRHPContextProvider");
var useAppFocusEvent_1 = require("@hooks/useAppFocusEvent");
var useCurrentReportID_1 = require("@hooks/useCurrentReportID");
var useDeepCompareRef_1 = require("@hooks/useDeepCompareRef");
var useIsAnonymousUser_1 = require("@hooks/useIsAnonymousUser");
var useIsReportReadyToDisplay_1 = require("@hooks/useIsReportReadyToDisplay");
var useLocalize_1 = require("@hooks/useLocalize");
var useNetwork_1 = require("@hooks/useNetwork");
var useNewTransactions_1 = require("@hooks/useNewTransactions");
var useOnyx_1 = require("@hooks/useOnyx");
var usePaginatedReportActions_1 = require("@hooks/usePaginatedReportActions");
var useParentReportAction_1 = require("@hooks/useParentReportAction");
var usePermissions_1 = require("@hooks/usePermissions");
var usePrevious_1 = require("@hooks/usePrevious");
var useReportIsArchived_1 = require("@hooks/useReportIsArchived");
var useResponsiveLayout_1 = require("@hooks/useResponsiveLayout");
var useThemeStyles_1 = require("@hooks/useThemeStyles");
var useTransactionsAndViolationsForReport_1 = require("@hooks/useTransactionsAndViolationsForReport");
var useViewportOffsetTop_1 = require("@hooks/useViewportOffsetTop");
var EmojiPickerAction_1 = require("@libs/actions/EmojiPickerAction");
var getNonEmptyStringOnyxID_1 = require("@libs/getNonEmptyStringOnyxID");
var Log_1 = require("@libs/Log");
var MoneyRequestReportUtils_1 = require("@libs/MoneyRequestReportUtils");
var Navigation_1 = require("@libs/Navigation/Navigation");
var clearReportNotifications_1 = require("@libs/Notification/clearReportNotifications");
var OptionsListUtils_1 = require("@libs/OptionsListUtils");
var PersonalDetailsUtils_1 = require("@libs/PersonalDetailsUtils");
var ReportActionsUtils_1 = require("@libs/ReportActionsUtils");
var ReportUtils_1 = require("@libs/ReportUtils");
var ValidationUtils_1 = require("@libs/ValidationUtils");
var Composer_1 = require("@userActions/Composer");
var Report_1 = require("@userActions/Report");
var CONST_1 = require("@src/CONST");
var ONYXKEYS_1 = require("@src/ONYXKEYS");
var ROUTES_1 = require("@src/ROUTES");
var SCREENS_1 = require("@src/SCREENS");
var EmptyObject_1 = require("@src/types/utils/EmptyObject");
var HeaderView_1 = require("./HeaderView");
var ReactionListWrapper_1 = require("./ReactionListWrapper");
var ReportActionsView_1 = require("./report/ReportActionsView");
var ReportFooter_1 = require("./report/ReportFooter");
var ReportScreenContext_1 = require("./ReportScreenContext");
var defaultReportMetadata = {
    hasOnceLoadedReportActions: false,
    isLoadingInitialReportActions: true,
    isLoadingOlderReportActions: false,
    hasLoadingOlderReportActionsError: false,
    isLoadingNewerReportActions: false,
    hasLoadingNewerReportActionsError: false,
    isOptimisticReport: false,
};
var reportDetailScreens = __spreadArray(__spreadArray(__spreadArray(__spreadArray([], Object.values(SCREENS_1.default.REPORT_DETAILS), true), Object.values(SCREENS_1.default.REPORT_SETTINGS), true), Object.values(SCREENS_1.default.PRIVATE_NOTES), true), Object.values(SCREENS_1.default.REPORT_PARTICIPANTS), true);
/**
 * Check is the report is deleted.
 * We currently use useMemo to memorize every properties of the report
 * so we can't check using isEmpty.
 *
 * @param report
 */
function isEmpty(report) {
    if ((0, EmptyObject_1.isEmptyObject)(report)) {
        return true;
    }
    return !Object.values(report).some(function (value) { return value !== undefined && value !== ''; });
}
function ReportScreen(_a) {
    var _b, _c, _d, _e, _f, _g, _h;
    var route = _a.route, navigation = _a.navigation;
    var styles = (0, useThemeStyles_1.default)();
    var translate = (0, useLocalize_1.default)().translate;
    var allReports = (0, useOnyx_1.default)(ONYXKEYS_1.default.COLLECTION.REPORT, { canBeMissing: false })[0];
    var reportIDFromRoute = (0, getNonEmptyStringOnyxID_1.default)((_b = route.params) === null || _b === void 0 ? void 0 : _b.reportID);
    var reportActionIDFromRoute = (_c = route === null || route === void 0 ? void 0 : route.params) === null || _c === void 0 ? void 0 : _c.reportActionID;
    var isFocused = (0, native_1.useIsFocused)();
    var prevIsFocused = (0, usePrevious_1.default)(isFocused);
    var firstRenderRef = (0, react_1.useRef)(true);
    var _j = (0, react_1.useState)(true), firstRender = _j[0], setFirstRender = _j[1];
    var isSkippingOpenReport = (0, react_1.useRef)(false);
    var flatListRef = (0, react_1.useRef)(null);
    var isBetaEnabled = (0, usePermissions_1.default)().isBetaEnabled;
    var isOffline = (0, useNetwork_1.default)().isOffline;
    var _k = (0, useResponsiveLayout_1.default)(), shouldUseNarrowLayout = _k.shouldUseNarrowLayout, isInNarrowPaneModal = _k.isInNarrowPaneModal;
    var currentReportIDValue = (0, useCurrentReportID_1.default)();
    var _l = (0, useOnyx_1.default)("".concat(ONYXKEYS_1.default.COLLECTION.REPORT_IS_COMPOSER_FULL_SIZE).concat(reportIDFromRoute), { canBeMissing: true })[0], isComposerFullSize = _l === void 0 ? false : _l;
    var accountManagerReportID = (0, useOnyx_1.default)(ONYXKEYS_1.default.ACCOUNT_MANAGER_REPORT_ID, { canBeMissing: true })[0];
    var accountManagerReport = (0, useOnyx_1.default)("".concat(ONYXKEYS_1.default.COLLECTION.REPORT).concat((0, getNonEmptyStringOnyxID_1.default)(accountManagerReportID)), { canBeMissing: true })[0];
    var _m = (0, useOnyx_1.default)("".concat(ONYXKEYS_1.default.COLLECTION.REPORT_USER_IS_LEAVING_ROOM).concat(reportIDFromRoute), { canBeMissing: true })[0], userLeavingStatus = _m === void 0 ? false : _m;
    var reportOnyx = (0, useOnyx_1.default)("".concat(ONYXKEYS_1.default.COLLECTION.REPORT).concat(reportIDFromRoute), { allowStaleData: true, canBeMissing: true })[0];
    var reportNameValuePairsOnyx = (0, useOnyx_1.default)("".concat(ONYXKEYS_1.default.COLLECTION.REPORT_NAME_VALUE_PAIRS).concat(reportIDFromRoute), { allowStaleData: true, canBeMissing: true })[0];
    var _o = (0, useOnyx_1.default)("".concat(ONYXKEYS_1.default.COLLECTION.REPORT_METADATA).concat(reportIDFromRoute), { canBeMissing: true, allowStaleData: true })[0], reportMetadata = _o === void 0 ? defaultReportMetadata : _o;
    var _p = (0, useOnyx_1.default)(ONYXKEYS_1.default.COLLECTION.POLICY, { allowStaleData: true, canBeMissing: false })[0], policies = _p === void 0 ? (0, EmptyObject_1.getEmptyObject)() : _p;
    var introSelected = (0, useOnyx_1.default)(ONYXKEYS_1.default.NVP_INTRO_SELECTED, { canBeMissing: true })[0];
    var onboarding = (0, useOnyx_1.default)(ONYXKEYS_1.default.NVP_ONBOARDING, { canBeMissing: false })[0];
    var parentReportAction = (0, useParentReportAction_1.default)(reportOnyx);
    var deletedParentAction = (0, ReportActionsUtils_1.isDeletedParentAction)(parentReportAction);
    var prevDeletedParentAction = (0, usePrevious_1.default)(deletedParentAction);
    var permissions = (0, useDeepCompareRef_1.default)(reportOnyx === null || reportOnyx === void 0 ? void 0 : reportOnyx.permissions);
    var isAnonymousUser = (0, useIsAnonymousUser_1.default)();
    var _q = (0, useOnyx_1.default)(ONYXKEYS_1.default.IS_LOADING_REPORT_DATA, { canBeMissing: true })[0], isLoadingReportData = _q === void 0 ? true : _q;
    var prevIsLoadingReportData = (0, usePrevious_1.default)(isLoadingReportData);
    var prevIsAnonymousUser = (0, react_1.useRef)(false);
    (0, react_1.useEffect)(function () {
        var _a, _b;
        // Don't update if there is a reportID in the params already
        if (route.params.reportID) {
            var reportActionID = (_a = route === null || route === void 0 ? void 0 : route.params) === null || _a === void 0 ? void 0 : _a.reportActionID;
            var isValidReportActionID = reportActionID && (0, ValidationUtils_1.isNumeric)(reportActionID);
            if (reportActionID && !isValidReportActionID) {
                Navigation_1.default.isNavigationReady().then(function () { return navigation.setParams({ reportActionID: '' }); });
            }
            return;
        }
        var lastAccessedReportID = (_b = (0, ReportUtils_1.findLastAccessedReport)(!isBetaEnabled(CONST_1.default.BETAS.DEFAULT_ROOMS), 'openOnAdminRoom' in route.params && !!route.params.openOnAdminRoom)) === null || _b === void 0 ? void 0 : _b.reportID;
        // It's possible that reports aren't fully loaded yet
        // in that case the reportID is undefined
        if (!lastAccessedReportID) {
            return;
        }
        Navigation_1.default.isNavigationReady().then(function () {
            Log_1.default.info("[ReportScreen] no reportID found in params, setting it to lastAccessedReportID: ".concat(lastAccessedReportID));
            navigation.setParams({ reportID: lastAccessedReportID });
        });
    }, [isBetaEnabled, navigation, route]);
    var personalDetails = (0, useOnyx_1.default)(ONYXKEYS_1.default.PERSONAL_DETAILS_LIST, { canBeMissing: true })[0];
    var chatWithAccountManagerText = (0, react_1.useMemo)(function () {
        var _a;
        if (accountManagerReportID) {
            var participants = (0, ReportUtils_1.getParticipantsAccountIDsForDisplay)(accountManagerReport, false, true);
            var participantPersonalDetails = (0, OptionsListUtils_1.getPersonalDetailsForAccountIDs)([(_a = participants === null || participants === void 0 ? void 0 : participants.at(0)) !== null && _a !== void 0 ? _a : -1], personalDetails);
            var participantPersonalDetail = Object.values(participantPersonalDetails).at(0);
            var displayName = (0, PersonalDetailsUtils_1.getDisplayNameOrDefault)(participantPersonalDetail);
            var login = participantPersonalDetail === null || participantPersonalDetail === void 0 ? void 0 : participantPersonalDetail.login;
            if (displayName && login) {
                return translate('common.chatWithAccountManager', { accountManagerDisplayName: "".concat(displayName, " (").concat(login, ")") });
            }
        }
        return '';
    }, [accountManagerReportID, accountManagerReport, personalDetails, translate]);
    /**
     * Create a lightweight Report so as to keep the re-rendering as light as possible by
     * passing in only the required props.
     *
     * Also, this plays nicely in contrast with Onyx,
     * which creates a new object every time collection changes. Because of this we can't
     * put this into onyx selector as it will be the same.
     */
    var report = (0, react_1.useMemo)(function () {
        return reportOnyx && {
            hasParentAccess: reportOnyx.hasParentAccess,
            lastReadTime: reportOnyx.lastReadTime,
            reportID: reportOnyx.reportID,
            policyID: reportOnyx.policyID,
            lastVisibleActionCreated: reportOnyx.lastVisibleActionCreated,
            statusNum: reportOnyx.statusNum,
            stateNum: reportOnyx.stateNum,
            writeCapability: reportOnyx.writeCapability,
            type: reportOnyx.type,
            errorFields: reportOnyx.errorFields,
            parentReportID: reportOnyx.parentReportID,
            parentReportActionID: reportOnyx.parentReportActionID,
            chatType: reportOnyx.chatType,
            pendingFields: reportOnyx.pendingFields,
            isDeletedParentAction: reportOnyx.isDeletedParentAction,
            reportName: reportOnyx.reportName,
            description: reportOnyx.description,
            managerID: reportOnyx.managerID,
            total: reportOnyx.total,
            nonReimbursableTotal: reportOnyx.nonReimbursableTotal,
            fieldList: reportOnyx.fieldList,
            ownerAccountID: reportOnyx.ownerAccountID,
            currency: reportOnyx.currency,
            unheldTotal: reportOnyx.unheldTotal,
            unheldNonReimbursableTotal: reportOnyx.unheldNonReimbursableTotal,
            participants: reportOnyx.participants,
            isWaitingOnBankAccount: reportOnyx.isWaitingOnBankAccount,
            iouReportID: reportOnyx.iouReportID,
            isOwnPolicyExpenseChat: reportOnyx.isOwnPolicyExpenseChat,
            isPinned: reportOnyx.isPinned,
            chatReportID: reportOnyx.chatReportID,
            visibility: reportOnyx.visibility,
            oldPolicyName: reportOnyx.oldPolicyName,
            policyName: reportOnyx.policyName,
            private_isArchived: reportNameValuePairsOnyx === null || reportNameValuePairsOnyx === void 0 ? void 0 : reportNameValuePairsOnyx.private_isArchived,
            lastMentionedTime: reportOnyx.lastMentionedTime,
            avatarUrl: reportOnyx.avatarUrl,
            permissions: permissions,
            invoiceReceiver: reportOnyx.invoiceReceiver,
            policyAvatar: reportOnyx.policyAvatar,
            nextStep: reportOnyx.nextStep,
        };
    }, [reportOnyx, reportNameValuePairsOnyx, permissions]);
    var reportID = report === null || report === void 0 ? void 0 : report.reportID;
    var chatReport = (0, useOnyx_1.default)("".concat(ONYXKEYS_1.default.COLLECTION.REPORT).concat(report === null || report === void 0 ? void 0 : report.chatReportID), { canBeMissing: true })[0];
    var prevReport = (0, usePrevious_1.default)(report);
    var prevUserLeavingStatus = (0, usePrevious_1.default)(userLeavingStatus);
    var lastReportIDFromRoute = (0, usePrevious_1.default)(reportIDFromRoute);
    var _r = (0, react_1.useState)(!!reportActionIDFromRoute), isLinkingToMessage = _r[0], setIsLinkingToMessage = _r[1];
    var _s = (0, useOnyx_1.default)(ONYXKEYS_1.default.SESSION, { selector: Session_1.accountIDSelector, canBeMissing: false })[0], currentUserAccountID = _s === void 0 ? -1 : _s;
    var isLoadingApp = (0, useOnyx_1.default)(ONYXKEYS_1.default.IS_LOADING_APP, { canBeMissing: true })[0];
    var _t = (0, usePaginatedReportActions_1.default)(reportID, reportActionIDFromRoute), unfilteredReportActions = _t.reportActions, linkedAction = _t.linkedAction, sortedAllReportActions = _t.sortedAllReportActions, hasNewerActions = _t.hasNewerActions, hasOlderActions = _t.hasOlderActions;
    // wrapping in useMemo because this is array operation and can cause performance issues
    var reportActions = (0, react_1.useMemo)(function () { return (0, ReportActionsUtils_1.getFilteredReportActionsForReportView)(unfilteredReportActions); }, [unfilteredReportActions]);
    var childReport = (0, useOnyx_1.default)("".concat(ONYXKEYS_1.default.COLLECTION.REPORT).concat(linkedAction === null || linkedAction === void 0 ? void 0 : linkedAction.childReportID), { canBeMissing: true })[0];
    var _u = (0, react_1.useState)(true), isBannerVisible = _u[0], setIsBannerVisible = _u[1];
    var _v = (0, react_1.useState)({}), scrollPosition = _v[0], setScrollPosition = _v[1];
    var wasReportAccessibleRef = (0, react_1.useRef)(false);
    var viewportOffsetTop = (0, useViewportOffsetTop_1.default)();
    var _w = (0, ReportUtils_1.getReportOfflinePendingActionAndErrors)(report), reportPendingAction = _w.reportPendingAction, reportErrors = _w.reportErrors;
    var screenWrapperStyle = [styles.appContent, styles.flex1, { marginTop: viewportOffsetTop }];
    var isOptimisticDelete = (report === null || report === void 0 ? void 0 : report.statusNum) === CONST_1.default.REPORT.STATUS_NUM.CLOSED;
    var indexOfLinkedMessage = (0, react_1.useMemo)(function () { return reportActions.findIndex(function (obj) { return reportActionIDFromRoute && String(obj.reportActionID) === String(reportActionIDFromRoute); }); }, [reportActions, reportActionIDFromRoute]);
    var doesCreatedActionExists = (0, react_1.useCallback)(function () { return !!(reportActions === null || reportActions === void 0 ? void 0 : reportActions.findLast(function (action) { return (0, ReportActionsUtils_1.isCreatedAction)(action); })); }, [reportActions]);
    var isLinkedMessageAvailable = indexOfLinkedMessage > -1;
    // The linked report actions should have at least 15 messages (counting as 1 page) above them to fill the screen.
    // If the count is too high (equal to or exceeds the web pagination size / 50) and there are no cached messages in the report,
    // OpenReport will be called each time the user scrolls up the report a bit, clicks on report preview, and then goes back.
    var isLinkedMessagePageReady = isLinkedMessageAvailable && (reportActions.length - indexOfLinkedMessage >= CONST_1.default.REPORT.MIN_INITIAL_REPORT_ACTION_COUNT || doesCreatedActionExists());
    var _x = (0, useTransactionsAndViolationsForReport_1.default)(reportIDFromRoute), allReportTransactions = _x.transactions, allReportViolations = _x.violations;
    var hasPendingDeletionTransaction = Object.values(allReportTransactions !== null && allReportTransactions !== void 0 ? allReportTransactions : {}).some(function (transaction) { return transaction.pendingAction === CONST_1.default.RED_BRICK_ROAD_PENDING_ACTION.DELETE; });
    var reportTransactions = (0, react_1.useMemo)(function () { return (0, MoneyRequestReportUtils_1.getAllNonDeletedTransactions)(allReportTransactions, reportActions, isOffline); }, [allReportTransactions, reportActions, isOffline]);
    // wrapping in useMemo because this is array operation and can cause performance issues
    var visibleTransactions = (0, react_1.useMemo)(function () { return reportTransactions === null || reportTransactions === void 0 ? void 0 : reportTransactions.filter(function (transaction) { return isOffline || transaction.pendingAction !== CONST_1.default.RED_BRICK_ROAD_PENDING_ACTION.DELETE; }); }, [reportTransactions, isOffline]);
    var reportTransactionIDs = (0, react_1.useMemo)(function () { return visibleTransactions === null || visibleTransactions === void 0 ? void 0 : visibleTransactions.map(function (transaction) { return transaction.transactionID; }); }, [visibleTransactions]);
    var transactionThreadReportID = (0, ReportActionsUtils_1.getOneTransactionThreadReportID)(report, chatReport, reportActions !== null && reportActions !== void 0 ? reportActions : [], isOffline, reportTransactionIDs);
    var transactionThreadReport = (0, useOnyx_1.default)("".concat(ONYXKEYS_1.default.COLLECTION.REPORT).concat(transactionThreadReportID), { canBeMissing: true })[0];
    var _y = (0, useOnyx_1.default)("".concat(ONYXKEYS_1.default.COLLECTION.REPORT_ACTIONS).concat(transactionThreadReportID), {
        canBeMissing: true,
    })[0], transactionThreadReportActions = _y === void 0 ? (0, EmptyObject_1.getEmptyObject)() : _y;
    var combinedReportActions = (0, ReportActionsUtils_1.getCombinedReportActions)(reportActions, transactionThreadReportID !== null && transactionThreadReportID !== void 0 ? transactionThreadReportID : null, Object.values(transactionThreadReportActions));
    var isSentMoneyReport = (0, react_1.useMemo)(function () { return reportActions.some(function (action) { return (0, ReportActionsUtils_1.isSentMoneyReportAction)(action); }); }, [reportActions]);
    var lastReportAction = __spreadArray(__spreadArray([], combinedReportActions, true), [parentReportAction], false).find(function (action) { return (0, ReportUtils_1.canEditReportAction)(action) && !(0, ReportActionsUtils_1.isMoneyRequestAction)(action); });
    // wrapping in useMemo to stabilize children re-rendering
    var policy = policies === null || policies === void 0 ? void 0 : policies["".concat(ONYXKEYS_1.default.COLLECTION.POLICY).concat(report === null || report === void 0 ? void 0 : report.policyID)];
    var isTopMostReportId = (currentReportIDValue === null || currentReportIDValue === void 0 ? void 0 : currentReportIDValue.currentReportID) === reportIDFromRoute;
    var didSubscribeToReportLeavingEvents = (0, react_1.useRef)(false);
    var isTransactionThreadView = (0, ReportUtils_1.isReportTransactionThread)(report);
    var isMoneyRequestOrInvoiceReport = (0, ReportUtils_1.isMoneyRequestReport)(report) || (0, ReportUtils_1.isInvoiceReport)(report);
    // Prevent the empty state flash by ensuring transaction data is fully loaded before deciding which view to render
    // We need to wait for both the selector to finish AND ensure we're not in a loading state where transactions could still populate
    var shouldWaitForTransactions = !isOffline && (0, MoneyRequestReportUtils_1.shouldWaitForTransactions)(report, reportTransactions, reportMetadata);
    var newTransactions = (0, useNewTransactions_1.default)(reportMetadata === null || reportMetadata === void 0 ? void 0 : reportMetadata.hasOnceLoadedReportActions, reportTransactions);
    (0, react_1.useEffect)(function () {
        if (!prevIsFocused || isFocused) {
            return;
        }
        (0, EmojiPickerAction_1.hideEmojiPicker)(true);
    }, [prevIsFocused, isFocused]);
    (0, react_1.useEffect)(function () {
        if (!(report === null || report === void 0 ? void 0 : report.reportID)) {
            wasReportAccessibleRef.current = false;
            return;
        }
        wasReportAccessibleRef.current = true;
    }, [report]);
    var backTo = (_d = route === null || route === void 0 ? void 0 : route.params) === null || _d === void 0 ? void 0 : _d.backTo;
    var onBackButtonPress = (0, react_1.useCallback)(function (prioritizeBackTo) {
        if (prioritizeBackTo === void 0) { prioritizeBackTo = false; }
        if (backTo === SCREENS_1.default.SEARCH.REPORT_RHP) {
            Navigation_1.default.goBack();
            return;
        }
        if (prioritizeBackTo && backTo) {
            Navigation_1.default.goBack(backTo);
            return;
        }
        if (isInNarrowPaneModal) {
            Navigation_1.default.dismissModal();
            return;
        }
        if (backTo) {
            Navigation_1.default.goBack(backTo);
            return;
        }
        if (Navigation_1.default.getShouldPopToSidebar()) {
            Navigation_1.default.popToSidebar();
            return;
        }
        Navigation_1.default.goBack();
    }, [isInNarrowPaneModal, backTo]);
    var headerView = (<HeaderView_1.default reportID={reportIDFromRoute} onNavigationMenuButtonClicked={onBackButtonPress} report={report} parentReportAction={parentReportAction} shouldUseNarrowLayout={shouldUseNarrowLayout}/>);
    if (isTransactionThreadView) {
        headerView = (<MoneyRequestHeader_1.default report={report} policy={policy} parentReportAction={parentReportAction} onBackButtonPress={onBackButtonPress}/>);
    }
    if (isMoneyRequestOrInvoiceReport) {
        headerView = (<MoneyReportHeader_1.default report={report} policy={policy} transactionThreadReportID={transactionThreadReportID} isLoadingInitialReportActions={reportMetadata.isLoadingInitialReportActions} reportActions={reportActions} onBackButtonPress={onBackButtonPress}/>);
    }
    (0, react_1.useEffect)(function () {
        var _a;
        if (!transactionThreadReportID || !((_a = route === null || route === void 0 ? void 0 : route.params) === null || _a === void 0 ? void 0 : _a.reportActionID) || !(0, ReportUtils_1.isOneTransactionThread)(childReport, report, linkedAction)) {
            return;
        }
        navigation.setParams({ reportActionID: '' });
    }, [transactionThreadReportID, (_e = route === null || route === void 0 ? void 0 : route.params) === null || _e === void 0 ? void 0 : _e.reportActionID, linkedAction, reportID, navigation, report, childReport]);
    var isReportArchived = (0, useReportIsArchived_1.default)(report === null || report === void 0 ? void 0 : report.reportID);
    var _z = (0, useIsReportReadyToDisplay_1.default)(report, reportIDFromRoute, isReportArchived), isEditingDisabled = _z.isEditingDisabled, isCurrentReportLoadedFromOnyx = _z.isCurrentReportLoadedFromOnyx;
    var isLinkedActionDeleted = (0, react_1.useMemo)(function () { return !!linkedAction && !(0, ReportActionsUtils_1.shouldReportActionBeVisible)(linkedAction, linkedAction.reportActionID, (0, ReportUtils_1.canUserPerformWriteAction)(report, isReportArchived)); }, [linkedAction, report, isReportArchived]);
    var prevIsLinkedActionDeleted = (0, usePrevious_1.default)(linkedAction ? isLinkedActionDeleted : undefined);
    // eslint-disable-next-line react-compiler/react-compiler
    var lastReportActionIDFromRoute = (0, usePrevious_1.default)(!firstRenderRef.current ? reportActionIDFromRoute : undefined);
    var _0 = (0, react_1.useState)(false), isNavigatingToDeletedAction = _0[0], setIsNavigatingToDeletedAction = _0[1];
    var isLinkedActionInaccessibleWhisper = (0, react_1.useMemo)(function () { var _a; return !!linkedAction && (0, ReportActionsUtils_1.isWhisperAction)(linkedAction) && !((_a = linkedAction === null || linkedAction === void 0 ? void 0 : linkedAction.whisperedToAccountIDs) !== null && _a !== void 0 ? _a : []).includes(currentUserAccountID); }, [currentUserAccountID, linkedAction]);
    var deleteTransactionNavigateBackUrl = (0, useOnyx_1.default)(ONYXKEYS_1.default.NVP_DELETE_TRANSACTION_NAVIGATE_BACK_URL, { canBeMissing: true })[0];
    (0, react_1.useEffect)(function () {
        if (!isFocused || !deleteTransactionNavigateBackUrl) {
            return;
        }
        // Clear the URL after all interactions are processed to ensure all updates are completed before hiding the skeleton
        // eslint-disable-next-line @typescript-eslint/no-deprecated
        react_native_1.InteractionManager.runAfterInteractions(function () {
            requestAnimationFrame(function () {
                (0, Report_1.clearDeleteTransactionNavigateBackUrl)();
            });
        });
    }, [isFocused, deleteTransactionNavigateBackUrl]);
    // eslint-disable-next-line rulesdir/no-negated-variables
    var shouldShowNotFoundLinkedAction = (!isLinkedActionInaccessibleWhisper && isLinkedActionDeleted && isNavigatingToDeletedAction) ||
        (!(reportMetadata === null || reportMetadata === void 0 ? void 0 : reportMetadata.isLoadingInitialReportActions) &&
            !!reportActionIDFromRoute &&
            !!sortedAllReportActions &&
            (sortedAllReportActions === null || sortedAllReportActions === void 0 ? void 0 : sortedAllReportActions.length) > 0 &&
            reportActions.length === 0 &&
            !isLinkingToMessage);
    var currentReportIDFormRoute = (_f = route.params) === null || _f === void 0 ? void 0 : _f.reportID;
    // eslint-disable-next-line rulesdir/no-negated-variables
    var shouldShowNotFoundPage = (0, react_1.useMemo)(function () {
        if (shouldShowNotFoundLinkedAction) {
            return true;
        }
        if (isLoadingApp !== false) {
            return false;
        }
        // eslint-disable-next-line react-compiler/react-compiler
        if (!wasReportAccessibleRef.current && !firstRenderRef.current && !reportID && !isOptimisticDelete && !(reportMetadata === null || reportMetadata === void 0 ? void 0 : reportMetadata.isLoadingInitialReportActions) && !userLeavingStatus) {
            // eslint-disable-next-line react-compiler/react-compiler
            return true;
        }
        return !!currentReportIDFormRoute && !(0, ReportUtils_1.isValidReportIDFromPath)(currentReportIDFormRoute);
    }, 
    // eslint-disable-next-line react-compiler/react-compiler, react-hooks/exhaustive-deps
    [firstRender, shouldShowNotFoundLinkedAction, reportID, isOptimisticDelete, reportMetadata === null || reportMetadata === void 0 ? void 0 : reportMetadata.isLoadingInitialReportActions, userLeavingStatus, currentReportIDFormRoute]);
    var createOneTransactionThreadReport = (0, react_1.useCallback)(function () {
        var _a;
        var currentReportTransaction = (0, ReportUtils_1.getReportTransactions)(reportID).filter(function (transaction) { return transaction.pendingAction !== CONST_1.default.RED_BRICK_ROAD_PENDING_ACTION.DELETE; });
        var oneTransactionID = (_a = currentReportTransaction.at(0)) === null || _a === void 0 ? void 0 : _a.transactionID;
        var iouAction = (0, ReportActionsUtils_1.getIOUActionForReportID)(reportID, oneTransactionID);
        (0, Report_1.createTransactionThreadReport)(report, iouAction);
    }, [report, reportID]);
    var isInviteOnboardingComplete = (_g = introSelected === null || introSelected === void 0 ? void 0 : introSelected.isInviteOnboardingComplete) !== null && _g !== void 0 ? _g : false;
    var isOnboardingCompleted = (_h = onboarding === null || onboarding === void 0 ? void 0 : onboarding.hasCompletedGuidedSetupFlow) !== null && _h !== void 0 ? _h : false;
    var fetchReport = (0, react_1.useCallback)(function () {
        var _a;
        if (reportMetadata.isOptimisticReport && (report === null || report === void 0 ? void 0 : report.type) === CONST_1.default.REPORT.TYPE.CHAT && !(0, ReportUtils_1.isPolicyExpenseChat)(report)) {
            return;
        }
        if (((_a = report === null || report === void 0 ? void 0 : report.errorFields) === null || _a === void 0 ? void 0 : _a.notFound) && isOffline) {
            return;
        }
        // If there is one transaction thread that has not yet been created, we should create it.
        if (transactionThreadReportID === CONST_1.default.FAKE_REPORT_ID && !transactionThreadReport) {
            createOneTransactionThreadReport();
            return;
        }
        // When a user goes through onboarding for the first time, various tasks are created for chatting with Concierge.
        // If this function is called too early (while the application is still loading), we will not have information about policies,
        // which means we will not be able to obtain the correct link for one of the tasks.
        // More information here: https://github.com/Expensify/App/issues/71742
        if (isLoadingApp && introSelected && !isOnboardingCompleted && !isInviteOnboardingComplete) {
            var choice = introSelected.choice, inviteType = introSelected.inviteType;
            var isInviteIOUorInvoice = inviteType === CONST_1.default.ONBOARDING_INVITE_TYPES.IOU || inviteType === CONST_1.default.ONBOARDING_INVITE_TYPES.INVOICE;
            var isInviteChoiceCorrect = choice === CONST_1.default.ONBOARDING_CHOICES.ADMIN || choice === CONST_1.default.ONBOARDING_CHOICES.SUBMIT || choice === CONST_1.default.ONBOARDING_CHOICES.CHAT_SPLIT;
            if (isInviteChoiceCorrect && !isInviteIOUorInvoice) {
                return;
            }
        }
        (0, Report_1.openReport)(reportIDFromRoute, reportActionIDFromRoute);
    }, [
        reportMetadata.isOptimisticReport,
        report,
        isOffline,
        transactionThreadReportID,
        transactionThreadReport,
        reportIDFromRoute,
        reportActionIDFromRoute,
        createOneTransactionThreadReport,
        isLoadingApp,
        introSelected,
        isOnboardingCompleted,
        isInviteOnboardingComplete,
    ]);
    (0, react_1.useEffect)(function () {
        if (!isAnonymousUser) {
            return;
        }
        prevIsAnonymousUser.current = true;
    }, [isAnonymousUser]);
    (0, react_1.useEffect)(function () {
        if (isLoadingReportData || !prevIsLoadingReportData || !prevIsAnonymousUser.current || isAnonymousUser) {
            return;
        }
        // Re-fetch public report data after user signs in and OpenApp API is called to
        // avoid reportActions data being empty for public rooms.
        fetchReport();
    }, [isLoadingReportData, prevIsLoadingReportData, prevIsAnonymousUser, isAnonymousUser, fetchReport]);
    var prevTransactionThreadReportID = (0, usePrevious_1.default)(transactionThreadReportID);
    (0, react_1.useEffect)(function () {
        if (!!prevTransactionThreadReportID || !transactionThreadReportID) {
            return;
        }
        fetchReport();
    }, [fetchReport, prevTransactionThreadReportID, transactionThreadReportID]);
    (0, react_1.useEffect)(function () {
        if (!reportID || !isFocused) {
            return;
        }
        (0, Report_1.updateLastVisitTime)(reportID);
    }, [reportID, isFocused]);
    (0, react_1.useEffect)(function () {
        var skipOpenReportListener = react_native_1.DeviceEventEmitter.addListener("switchToPreExistingReport_".concat(reportID), function (_a) {
            var preexistingReportID = _a.preexistingReportID;
            if (!preexistingReportID) {
                return;
            }
            isSkippingOpenReport.current = true;
        });
        return function () {
            skipOpenReportListener.remove();
        };
    }, [reportID]);
    var dismissBanner = (0, react_1.useCallback)(function () {
        setIsBannerVisible(false);
    }, []);
    var chatWithAccountManager = (0, react_1.useCallback)(function () {
        Navigation_1.default.navigate(ROUTES_1.default.REPORT_WITH_ID.getRoute(accountManagerReportID));
    }, [accountManagerReportID]);
    // Clear notifications for the current report when it's opened and re-focused
    var clearNotifications = (0, react_1.useCallback)(function () {
        // Check if this is the top-most ReportScreen since the Navigator preserves multiple at a time
        if (!isTopMostReportId) {
            return;
        }
        (0, clearReportNotifications_1.default)(reportID);
    }, [reportID, isTopMostReportId]);
    (0, react_1.useEffect)(clearNotifications, [clearNotifications]);
    (0, useAppFocusEvent_1.default)(clearNotifications);
    (0, react_1.useEffect)(function () {
        // eslint-disable-next-line @typescript-eslint/no-deprecated
        var interactionTask = react_native_1.InteractionManager.runAfterInteractions(function () {
            (0, Composer_1.setShouldShowComposeInput)(true);
        });
        return function () {
            interactionTask.cancel();
            if (!didSubscribeToReportLeavingEvents.current) {
                return;
            }
            (0, Report_1.unsubscribeFromLeavingRoomReportChannel)(reportID);
        };
        // I'm disabling the warning, as it expects to use exhaustive deps, even though we want this useEffect to run only on the first render.
        // eslint-disable-next-line react-compiler/react-compiler, react-hooks/exhaustive-deps
    }, []);
    (0, react_1.useEffect)(function () {
        // This function is triggered when a user clicks on a link to navigate to a report.
        // For each link click, we retrieve the report data again, even though it may already be cached.
        // There should be only one openReport execution per page start or navigating
        fetchReport();
        // eslint-disable-next-line react-compiler/react-compiler, react-hooks/exhaustive-deps
    }, [route, isLinkedMessagePageReady, reportActionIDFromRoute]);
    var prevReportActions = (0, usePrevious_1.default)(reportActions);
    (0, react_1.useEffect)(function () {
        var _a;
        // This function is only triggered when a user is invited to a room after opening the link.
        // When a user opens a room they are not a member of, and the admin then invites them, only the INVITE_TO_ROOM action is available, so the background will be empty and room description is not available.
        // See https://github.com/Expensify/App/issues/57769 for more details
        if (prevReportActions.length !== 0 || reportActions.length !== 1 || ((_a = reportActions.at(0)) === null || _a === void 0 ? void 0 : _a.actionName) !== CONST_1.default.REPORT.ACTIONS.TYPE.ROOM_CHANGE_LOG.INVITE_TO_ROOM) {
            return;
        }
        fetchReport();
    }, [prevReportActions, reportActions, fetchReport]);
    // If a user has chosen to leave a thread, and then returns to it (e.g. with the back button), we need to call `openReport` again in order to allow the user to rejoin and to receive real-time updates
    (0, react_1.useEffect)(function () {
        if (!shouldUseNarrowLayout || !isFocused || prevIsFocused || !(0, ReportUtils_1.isChatThread)(report) || !(0, ReportUtils_1.isHiddenForCurrentUser)(report) || isTransactionThreadView) {
            return;
        }
        (0, Report_1.openReport)(reportID);
        // We don't want to run this useEffect every time `report` is changed
        // Excluding shouldUseNarrowLayout from the dependency list to prevent re-triggering on screen resize events.
        // eslint-disable-next-line react-compiler/react-compiler, react-hooks/exhaustive-deps
    }, [prevIsFocused, report === null || report === void 0 ? void 0 : report.participants, isFocused, isTransactionThreadView, reportID]);
    (0, react_1.useEffect)(function () {
        // We don't want this effect to run on the first render.
        if (firstRenderRef.current) {
            firstRenderRef.current = false;
            setFirstRender(false);
            return;
        }
        var onyxReportID = report === null || report === void 0 ? void 0 : report.reportID;
        var prevOnyxReportID = prevReport === null || prevReport === void 0 ? void 0 : prevReport.reportID;
        var wasReportRemoved = !!prevOnyxReportID && prevOnyxReportID === reportIDFromRoute && !onyxReportID;
        var isRemovalExpectedForReportType = isEmpty(report) && ((0, ReportUtils_1.isMoneyRequest)(prevReport) || (0, ReportUtils_1.isMoneyRequestReport)(prevReport) || (0, ReportUtils_1.isPolicyExpenseChat)(prevReport) || (0, ReportUtils_1.isGroupChat)(prevReport) || (0, ReportUtils_1.isAdminRoom)(prevReport));
        var didReportClose = wasReportRemoved && prevReport.statusNum === CONST_1.default.REPORT.STATUS_NUM.OPEN && (report === null || report === void 0 ? void 0 : report.statusNum) === CONST_1.default.REPORT.STATUS_NUM.CLOSED;
        var isTopLevelPolicyRoomWithNoStatus = !(report === null || report === void 0 ? void 0 : report.statusNum) && !(prevReport === null || prevReport === void 0 ? void 0 : prevReport.parentReportID) && (prevReport === null || prevReport === void 0 ? void 0 : prevReport.chatType) === CONST_1.default.REPORT.CHAT_TYPE.POLICY_ROOM;
        var isClosedTopLevelPolicyRoom = wasReportRemoved && prevReport.statusNum === CONST_1.default.REPORT.STATUS_NUM.OPEN && isTopLevelPolicyRoomWithNoStatus;
        // Navigate to the Concierge chat if the room was removed from another device (e.g. user leaving a room or removed from a room)
        if (
        // non-optimistic case
        (!prevUserLeavingStatus && !!userLeavingStatus) ||
            didReportClose ||
            isRemovalExpectedForReportType ||
            isClosedTopLevelPolicyRoom ||
            (prevDeletedParentAction && !deletedParentAction)) {
            var currentRoute_1 = Navigation_1.navigationRef.getCurrentRoute();
            var isReportDetailOpenInRHP = isTopMostReportId &&
                reportDetailScreens.find(function (r) { return r === (currentRoute_1 === null || currentRoute_1 === void 0 ? void 0 : currentRoute_1.name); }) &&
                !!(currentRoute_1 === null || currentRoute_1 === void 0 ? void 0 : currentRoute_1.params) &&
                typeof currentRoute_1.params === 'object' &&
                'reportID' in currentRoute_1.params &&
                reportIDFromRoute === currentRoute_1.params.reportID;
            // Early return if the report we're passing isn't in a focused state. We only want to navigate to Concierge if the user leaves the room from another device or gets removed from the room while the report is in a focused state.
            // Prevent auto navigation for report in RHP
            if ((!isFocused && !isReportDetailOpenInRHP) || isInNarrowPaneModal) {
                return;
            }
            Navigation_1.default.dismissModal();
            if (Navigation_1.default.getTopmostReportId() === prevOnyxReportID) {
                Navigation_1.default.isNavigationReady().then(function () {
                    Navigation_1.default.popToSidebar();
                });
            }
            if (prevReport === null || prevReport === void 0 ? void 0 : prevReport.parentReportID) {
                // Prevent navigation to the IOU/Expense Report if it is pending deletion.
                if ((0, ReportUtils_1.isMoneyRequestReportPendingDeletion)(prevReport.parentReportID)) {
                    return;
                }
                Navigation_1.default.isNavigationReady().then(function () {
                    Navigation_1.default.navigate(ROUTES_1.default.REPORT_WITH_ID.getRoute(prevReport.parentReportID));
                });
                return;
            }
            Navigation_1.default.isNavigationReady().then(function () {
                (0, Report_1.navigateToConciergeChat)();
            });
            return;
        }
        // If you already have a report open and are deeplinking to a new report on native,
        // the ReportScreen never actually unmounts and the reportID in the route also doesn't change.
        // Therefore, we need to compare if the existing reportID is the same as the one in the route
        // before deciding that we shouldn't call OpenReport.
        if (reportIDFromRoute === lastReportIDFromRoute && (!onyxReportID || onyxReportID === reportIDFromRoute)) {
            return;
        }
        (0, Composer_1.setShouldShowComposeInput)(true);
        // eslint-disable-next-line react-compiler/react-compiler, react-hooks/exhaustive-deps
    }, [
        route,
        report,
        prevReport === null || prevReport === void 0 ? void 0 : prevReport.reportID,
        prevUserLeavingStatus,
        userLeavingStatus,
        prevReport === null || prevReport === void 0 ? void 0 : prevReport.statusNum,
        prevReport === null || prevReport === void 0 ? void 0 : prevReport.parentReportID,
        prevReport === null || prevReport === void 0 ? void 0 : prevReport.chatType,
        prevReport,
        reportIDFromRoute,
        lastReportIDFromRoute,
        isFocused,
        deletedParentAction,
        prevDeletedParentAction,
    ]);
    (0, react_1.useEffect)(function () {
        var _a;
        if (!(0, ReportUtils_1.isValidReportIDFromPath)(reportIDFromRoute)) {
            return;
        }
        // Ensures the optimistic report is created successfully
        if (reportIDFromRoute !== (report === null || report === void 0 ? void 0 : report.reportID) || ((_a = report === null || report === void 0 ? void 0 : report.pendingFields) === null || _a === void 0 ? void 0 : _a.createChat)) {
            return;
        }
        // Ensures subscription event succeeds when the report/workspace room is created optimistically.
        // Check if the optimistic `OpenReport` or `AddWorkspaceRoom` has succeeded by confirming
        // any `pendingFields.createChat` or `pendingFields.addWorkspaceRoom` fields are set to null.
        // Existing reports created will have empty fields for `pendingFields`.
        var didCreateReportSuccessfully = !(report === null || report === void 0 ? void 0 : report.pendingFields) || (!(report === null || report === void 0 ? void 0 : report.pendingFields.addWorkspaceRoom) && !(report === null || report === void 0 ? void 0 : report.pendingFields.createChat));
        // eslint-disable-next-line @typescript-eslint/no-deprecated
        var interactionTask = null;
        if (!didSubscribeToReportLeavingEvents.current && didCreateReportSuccessfully) {
            // eslint-disable-next-line @typescript-eslint/no-deprecated
            interactionTask = react_native_1.InteractionManager.runAfterInteractions(function () {
                (0, Report_1.subscribeToReportLeavingEvents)(reportIDFromRoute);
                didSubscribeToReportLeavingEvents.current = true;
            });
        }
        return function () {
            if (!interactionTask) {
                return;
            }
            interactionTask.cancel();
        };
    }, [report, didSubscribeToReportLeavingEvents, reportIDFromRoute]);
    var actionListValue = (0, react_1.useMemo)(function () { return ({ flatListRef: flatListRef, scrollPosition: scrollPosition, setScrollPosition: setScrollPosition }); }, [flatListRef, scrollPosition, setScrollPosition]);
    // This helps in tracking from the moment 'route' triggers useMemo until isLoadingInitialReportActions becomes true. It prevents blinking when loading reportActions from cache.
    (0, react_1.useEffect)(function () {
        // eslint-disable-next-line @typescript-eslint/no-deprecated
        react_native_1.InteractionManager.runAfterInteractions(function () {
            setIsLinkingToMessage(false);
        });
    }, [reportMetadata === null || reportMetadata === void 0 ? void 0 : reportMetadata.isLoadingInitialReportActions]);
    var navigateToEndOfReport = (0, react_1.useCallback)(function () {
        Navigation_1.default.setParams({ reportActionID: '' });
        fetchReport();
    }, [fetchReport]);
    (0, react_1.useEffect)(function () {
        // Only handle deletion cases when there's a deleted action
        if (!isLinkedActionDeleted) {
            setIsNavigatingToDeletedAction(false);
            return;
        }
        // we want to do this distinguish between normal navigation and delete behavior
        if (lastReportActionIDFromRoute !== reportActionIDFromRoute) {
            setIsNavigatingToDeletedAction(true);
            return;
        }
        // Clear params when action gets deleted while highlighting
        if (!isNavigatingToDeletedAction && prevIsLinkedActionDeleted === false) {
            Navigation_1.default.setParams({ reportActionID: '' });
        }
    }, [isLinkedActionDeleted, prevIsLinkedActionDeleted, lastReportActionIDFromRoute, reportActionIDFromRoute, isNavigatingToDeletedAction]);
    // If user redirects to an inaccessible whisper via a deeplink, on a report they have access to,
    // then we set reportActionID as empty string, so we display them the report and not the "Not found page".
    (0, react_1.useEffect)(function () {
        if (!isLinkedActionInaccessibleWhisper) {
            return;
        }
        Navigation_1.default.isNavigationReady().then(function () {
            Navigation_1.default.setParams({ reportActionID: '' });
        });
    }, [isLinkedActionInaccessibleWhisper]);
    (0, react_1.useEffect)(function () {
        if (!!(report === null || report === void 0 ? void 0 : report.lastReadTime) || !(0, ReportUtils_1.isTaskReport)(report)) {
            return;
        }
        // After creating the task report then navigating to task detail we don't have any report actions and the last read time is empty so We need to update the initial last read time when opening the task report detail.
        (0, Report_1.readNewestAction)(report === null || report === void 0 ? void 0 : report.reportID);
    }, [report]);
    var lastRoute = (0, usePrevious_1.default)(route);
    // wrapping into useMemo to stabilize children re-renders as reportMetadata is changed frequently
    var showReportActionsLoadingState = (0, react_1.useMemo)(function () { return (reportMetadata === null || reportMetadata === void 0 ? void 0 : reportMetadata.isLoadingInitialReportActions) && !(reportMetadata === null || reportMetadata === void 0 ? void 0 : reportMetadata.hasOnceLoadedReportActions); }, [reportMetadata === null || reportMetadata === void 0 ? void 0 : reportMetadata.isLoadingInitialReportActions, reportMetadata === null || reportMetadata === void 0 ? void 0 : reportMetadata.hasOnceLoadedReportActions]);
    // In this case we want to use this value. The  shouldUseNarrowLayout will always be true as this case is handled when we display ReportScreen in RHP.
    // eslint-disable-next-line rulesdir/prefer-shouldUseNarrowLayout-instead-of-isSmallScreenWidth
    var isSmallScreenWidth = (0, useResponsiveLayout_1.default)().isSmallScreenWidth;
    // If true reports that are considered MoneyRequest | InvoiceReport will get the new report table view
    var shouldDisplayMoneyRequestActionsList = isMoneyRequestOrInvoiceReport && (0, MoneyRequestReportUtils_1.shouldDisplayReportTableView)(report, visibleTransactions !== null && visibleTransactions !== void 0 ? visibleTransactions : []);
    // WideRHP should be visible only on wide layout when report is opened in RHP and contains only one expense.
    // This view is only available for reports of type CONST.REPORT.TYPE.EXPENSE or CONST.REPORT.TYPE.IOU.
    var shouldShowWideRHP = route.name === SCREENS_1.default.SEARCH.REPORT_RHP &&
        !isSmallScreenWidth &&
        !shouldDisplayMoneyRequestActionsList &&
        ((0, ReportActionsUtils_1.isTransactionThread)(parentReportAction) ||
            (parentReportAction === null || parentReportAction === void 0 ? void 0 : parentReportAction.childType) === CONST_1.default.REPORT.TYPE.EXPENSE ||
            (parentReportAction === null || parentReportAction === void 0 ? void 0 : parentReportAction.childType) === CONST_1.default.REPORT.TYPE.IOU ||
            (report === null || report === void 0 ? void 0 : report.type) === CONST_1.default.REPORT.TYPE.EXPENSE ||
            (report === null || report === void 0 ? void 0 : report.type) === CONST_1.default.REPORT.TYPE.IOU);
    (0, WideRHPContextProvider_1.useShowWideRHPVersion)(shouldShowWideRHP);
    // Define here because reportActions are recalculated before mount, allowing data to display faster than useEffect can trigger.
    // If we have cached reportActions, they will be shown immediately.
    // We aim to display a loader first, then fetch relevant reportActions, and finally show them.
    if ((lastRoute !== route || lastReportActionIDFromRoute !== reportActionIDFromRoute) && isLinkingToMessage !== !!reportActionIDFromRoute) {
        setIsLinkingToMessage(!!reportActionIDFromRoute);
        return null;
    }
    return (<ReportScreenContext_1.ActionListContext.Provider value={actionListValue}>
            <ReactionListWrapper_1.default>
                <ScreenWrapper_1.default navigation={navigation} style={screenWrapperStyle} shouldEnableKeyboardAvoidingView={isTopMostReportId || isInNarrowPaneModal} testID={"report-screen-".concat(reportID)}>
                    <FullPageNotFoundView_1.default shouldShow={shouldShowNotFoundPage} subtitleKey={shouldShowNotFoundLinkedAction ? 'notFound.commentYouLookingForCannotBeFound' : 'notFound.noAccess'} subtitleStyle={[styles.textSupporting]} shouldShowBackButton={shouldUseNarrowLayout} onBackButtonPress={shouldShowNotFoundLinkedAction ? navigateToEndOfReport : Navigation_1.default.goBack} shouldShowLink={shouldShowNotFoundLinkedAction} linkTranslationKey="notFound.goToChatInstead" subtitleKeyBelowLink={shouldShowNotFoundLinkedAction ? 'notFound.contactConcierge' : ''} onLinkPress={navigateToEndOfReport} shouldDisplaySearchRouter>
                        <Provider_1.default isDisabled={isEditingDisabled}>
                            <OfflineWithFeedback_1.default pendingAction={reportPendingAction} errors={reportErrors} shouldShowErrorMessages={false} needsOffscreenAlphaCompositing>
                                {headerView}
                            </OfflineWithFeedback_1.default>
                            {!!accountManagerReportID && (0, ReportUtils_1.isConciergeChatReport)(report) && isBannerVisible && (<Banner_1.default containerStyles={[styles.mh4, styles.mt4, styles.p4, styles.br2]} text={chatWithAccountManagerText} onClose={dismissBanner} onButtonPress={chatWithAccountManager} shouldShowCloseButton icon={Expensicons.Lightbulb} shouldShowIcon shouldShowButton/>)}
                            <react_native_1.View style={[styles.flex1, styles.flexRow]}>
                                {shouldShowWideRHP && (<react_native_1.Animated.View style={styles.wideRHPMoneyRequestReceiptViewContainer}>
                                        <ScrollView_1.default contentContainerStyle={styles.wideRHPMoneyRequestReceiptViewScrollViewContainer}>
                                            <MoneyRequestReceiptView_1.default allReports={allReports} report={transactionThreadReport !== null && transactionThreadReport !== void 0 ? transactionThreadReport : report} fillSpace isDisplayedInWideRHP/>
                                        </ScrollView_1.default>
                                    </react_native_1.Animated.View>)}
                                <react_native_1.View style={[styles.flex1, styles.justifyContentEnd, styles.overflowHidden]} testID="report-actions-view-wrapper">
                                    {(!report || shouldWaitForTransactions) && <ReportActionsSkeletonView_1.default />}
                                    {!!report && !shouldDisplayMoneyRequestActionsList && !shouldWaitForTransactions ? (<ReportActionsView_1.default report={report} reportActions={reportActions} isLoadingInitialReportActions={reportMetadata === null || reportMetadata === void 0 ? void 0 : reportMetadata.isLoadingInitialReportActions} hasNewerActions={hasNewerActions} hasOlderActions={hasOlderActions} parentReportAction={parentReportAction} transactionThreadReportID={transactionThreadReportID} isReportTransactionThread={isTransactionThreadView}/>) : null}
                                    {!!report && shouldDisplayMoneyRequestActionsList && !shouldWaitForTransactions ? (<MoneyRequestReportActionsList_1.default report={report} hasPendingDeletionTransaction={hasPendingDeletionTransaction} policy={policy} reportActions={reportActions} transactions={visibleTransactions} newTransactions={newTransactions} violations={allReportViolations} hasOlderActions={hasOlderActions} hasNewerActions={hasNewerActions} showReportActionsLoadingState={showReportActionsLoadingState}/>) : null}
                                    {isCurrentReportLoadedFromOnyx ? (<ReportFooter_1.default report={report} reportMetadata={reportMetadata} policy={policy} pendingAction={reportPendingAction} isComposerFullSize={!!isComposerFullSize} lastReportAction={lastReportAction} reportTransactions={reportTransactions} 
        // If the report is from the 'Send Money' flow, we add the comment to the `iou` report because for these we don't combine reportActions even if there is a single transaction (they always have a single transaction)
        transactionThreadReportID={isSentMoneyReport ? undefined : transactionThreadReportID}/>) : null}
                                </react_native_1.View>
                            </react_native_1.View>
                            <portal_1.PortalHost name="suggestions"/>
                        </Provider_1.default>
                    </FullPageNotFoundView_1.default>
                </ScreenWrapper_1.default>
            </ReactionListWrapper_1.default>
        </ReportScreenContext_1.ActionListContext.Provider>);
}
ReportScreen.displayName = 'ReportScreen';
exports.default = (0, react_1.memo)(ReportScreen, function (prevProps, nextProps) { return (0, fast_equals_1.deepEqual)(prevProps.route, nextProps.route); });
