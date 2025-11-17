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
var native_1 = require("@react-navigation/native");
var expensify_common_1 = require("expensify-common");
var react_1 = require("react");
var react_native_1 = require("react-native");
var Button_1 = require("@components/Button");
var ConfirmModal_1 = require("@components/ConfirmModal");
var DomainMenuItem_1 = require("@components/Domain/DomainMenuItem");
var FullscreenLoadingIndicator_1 = require("@components/FullscreenLoadingIndicator");
var Expensicons = require("@components/Icon/Expensicons");
var NavigationTabBar_1 = require("@components/Navigation/NavigationTabBar");
var NAVIGATION_TABS_1 = require("@components/Navigation/NavigationTabBar/NAVIGATION_TABS");
var TopBar_1 = require("@components/Navigation/TopBar");
var OfflineWithFeedback_1 = require("@components/OfflineWithFeedback");
var OnyxListItemProvider_1 = require("@components/OnyxListItemProvider");
var Pressable_1 = require("@components/Pressable");
var ScreenWrapper_1 = require("@components/ScreenWrapper");
var ScrollView_1 = require("@components/ScrollView");
var SearchBar_1 = require("@components/SearchBar");
var Text_1 = require("@components/Text");
var WorkspacesEmptyStateComponent_1 = require("@components/WorkspacesEmptyStateComponent");
var useCardFeeds_1 = require("@hooks/useCardFeeds");
var useHandleBackButton_1 = require("@hooks/useHandleBackButton");
var useLocalize_1 = require("@hooks/useLocalize");
var useNetwork_1 = require("@hooks/useNetwork");
var useOnyx_1 = require("@hooks/useOnyx");
var usePayAndDowngrade_1 = require("@hooks/usePayAndDowngrade");
var usePreferredPolicy_1 = require("@hooks/usePreferredPolicy");
var usePrevious_1 = require("@hooks/usePrevious");
var useResponsiveLayout_1 = require("@hooks/useResponsiveLayout");
var useSearchResults_1 = require("@hooks/useSearchResults");
var useTheme_1 = require("@hooks/useTheme");
var useThemeStyles_1 = require("@hooks/useThemeStyles");
var useTransactionViolationOfWorkspace_1 = require("@hooks/useTransactionViolationOfWorkspace");
var connections_1 = require("@libs/actions/connections");
var Link_1 = require("@libs/actions/Link");
var Modal_1 = require("@libs/actions/Modal");
var Member_1 = require("@libs/actions/Policy/Member");
var Policy_1 = require("@libs/actions/Policy/Policy");
var Session_1 = require("@libs/actions/Session");
var CardUtils_1 = require("@libs/CardUtils");
var ErrorUtils_1 = require("@libs/ErrorUtils");
var interceptAnonymousUser_1 = require("@libs/interceptAnonymousUser");
var usePreloadFullScreenNavigators_1 = require("@libs/Navigation/AppNavigator/usePreloadFullScreenNavigators");
var Navigation_1 = require("@libs/Navigation/Navigation");
var PolicyUtils_1 = require("@libs/PolicyUtils");
var ReportUtils_1 = require("@libs/ReportUtils");
var shouldRenderTransferOwnerButton_1 = require("@libs/shouldRenderTransferOwnerButton");
var SubscriptionUtils_1 = require("@libs/SubscriptionUtils");
var User_1 = require("@userActions/User");
var CONST_1 = require("@src/CONST");
var ONYXKEYS_1 = require("@src/ONYXKEYS");
var ROUTES_1 = require("@src/ROUTES");
var ReimbursementAccount_1 = require("@src/selectors/ReimbursementAccount");
var EmptyObject_1 = require("@src/types/utils/EmptyObject");
var WorkspacesListRow_1 = require("./WorkspacesListRow");
/**
 * Dismisses the errors on one item
 */
function dismissWorkspaceError(policyID, pendingAction) {
    if (pendingAction === CONST_1.default.RED_BRICK_ROAD_PENDING_ACTION.DELETE) {
        (0, Policy_1.clearDeleteWorkspaceError)(policyID);
        return;
    }
    if (pendingAction === CONST_1.default.RED_BRICK_ROAD_PENDING_ACTION.ADD) {
        (0, Policy_1.removeWorkspace)(policyID);
        return;
    }
    (0, Policy_1.clearErrors)(policyID);
}
function isUserReimburserForPolicy(policies, policyID, userEmail) {
    var _a;
    if (!policies || !policyID || !userEmail) {
        return false;
    }
    var policy = policies["".concat(ONYXKEYS_1.default.COLLECTION.POLICY).concat(policyID)];
    if (!policy) {
        return false;
    }
    return ((_a = policy.achAccount) === null || _a === void 0 ? void 0 : _a.reimburser) === userEmail;
}
function WorkspacesListPage() {
    var _a, _b, _c, _d;
    var theme = (0, useTheme_1.default)();
    var styles = (0, useThemeStyles_1.default)();
    var _e = (0, useLocalize_1.default)(), translate = _e.translate, localeCompare = _e.localeCompare;
    var isOffline = (0, useNetwork_1.default)().isOffline;
    var isFocused = (0, native_1.useIsFocused)();
    var _f = (0, useResponsiveLayout_1.default)(), shouldUseNarrowLayout = _f.shouldUseNarrowLayout, isMediumScreenWidth = _f.isMediumScreenWidth;
    var allConnectionSyncProgresses = (0, useOnyx_1.default)(ONYXKEYS_1.default.COLLECTION.POLICY_CONNECTION_SYNC_PROGRESS, { canBeMissing: true })[0];
    var policies = (0, useOnyx_1.default)(ONYXKEYS_1.default.COLLECTION.POLICY, { canBeMissing: true })[0];
    var reimbursementAccount = (0, useOnyx_1.default)(ONYXKEYS_1.default.REIMBURSEMENT_ACCOUNT, { canBeMissing: true })[0];
    var session = (0, useOnyx_1.default)(ONYXKEYS_1.default.SESSION, { canBeMissing: true })[0];
    var activePolicyID = (0, useOnyx_1.default)(ONYXKEYS_1.default.NVP_ACTIVE_POLICY_ID, { canBeMissing: true })[0];
    var isLoadingApp = (0, useOnyx_1.default)(ONYXKEYS_1.default.IS_LOADING_APP, { canBeMissing: true })[0];
    var lastPaymentMethod = (0, useOnyx_1.default)(ONYXKEYS_1.default.NVP_LAST_PAYMENT_METHOD, { canBeMissing: true })[0];
    var shouldShowLoadingIndicator = isLoadingApp && !isOffline;
    var route = (0, native_1.useRoute)();
    var fundList = (0, useOnyx_1.default)(ONYXKEYS_1.default.FUND_LIST, { canBeMissing: true })[0];
    var duplicateWorkspace = (0, useOnyx_1.default)(ONYXKEYS_1.default.DUPLICATE_WORKSPACE, { canBeMissing: true })[0];
    var _g = (0, usePreferredPolicy_1.default)(), isRestrictedToPreferredPolicy = _g.isRestrictedToPreferredPolicy, preferredPolicyID = _g.preferredPolicyID, isRestrictedPolicyCreation = _g.isRestrictedPolicyCreation;
    var account = (0, useOnyx_1.default)(ONYXKEYS_1.default.ACCOUNT, { canBeMissing: true })[0];
    var reimbursementAccountError = (0, useOnyx_1.default)(ONYXKEYS_1.default.REIMBURSEMENT_ACCOUNT, { canBeMissing: true, selector: ReimbursementAccount_1.reimbursementAccountErrorSelector })[0];
    var allDomains = (0, useOnyx_1.default)(ONYXKEYS_1.default.COLLECTION.DOMAIN, { canBeMissing: false })[0];
    var adminAccess = (0, useOnyx_1.default)(ONYXKEYS_1.default.COLLECTION.SHARED_NVP_PRIVATE_ADMIN_ACCESS, { canBeMissing: false })[0];
    // This hook preloads the screens of adjacent tabs to make changing tabs faster.
    (0, usePreloadFullScreenNavigators_1.default)();
    var _h = (0, react_1.useState)(false), isDeleteModalOpen = _h[0], setIsDeleteModalOpen = _h[1];
    var _j = (0, react_1.useState)(false), isDeleteWorkspaceErrorModalOpen = _j[0], setIsDeleteWorkspaceErrorModalOpen = _j[1];
    var _k = (0, react_1.useState)(), policyIDToDelete = _k[0], setPolicyIDToDelete = _k[1];
    // The workspace was deleted in this page
    var _l = (0, react_1.useState)(), policyNameToDelete = _l[0], setPolicyNameToDelete = _l[1];
    var continueDeleteWorkspace = (0, react_1.useCallback)(function () {
        setIsDeleteModalOpen(true);
    }, []);
    var _m = (0, useTransactionViolationOfWorkspace_1.default)(policyIDToDelete), reportsToArchive = _m.reportsToArchive, transactionViolations = _m.transactionViolations;
    var _o = (0, usePayAndDowngrade_1.default)(continueDeleteWorkspace), setIsDeletingPaidWorkspace = _o.setIsDeletingPaidWorkspace, isLoadingBill = _o.isLoadingBill;
    var _p = (0, react_1.useState)(null), loadingSpinnerIconIndex = _p[0], setLoadingSpinnerIconIndex = _p[1];
    var isLessThanMediumScreen = isMediumScreenWidth || shouldUseNarrowLayout;
    var shouldDisplayLHB = !shouldUseNarrowLayout;
    var policyToDelete = policies === null || policies === void 0 ? void 0 : policies["".concat(ONYXKEYS_1.default.COLLECTION.POLICY).concat(policyIDToDelete)];
    // We need this to update translation for deleting a workspace when it has third party card feeds or expensify card assigned.
    var workspaceAccountID = (_a = policyToDelete === null || policyToDelete === void 0 ? void 0 : policyToDelete.workspaceAccountID) !== null && _a !== void 0 ? _a : CONST_1.default.DEFAULT_NUMBER_ID;
    var _q = (0, useCardFeeds_1.default)(policyIDToDelete), cardFeeds = _q[0], defaultCardFeeds = _q[2];
    var cardsList = (0, useOnyx_1.default)("".concat(ONYXKEYS_1.default.COLLECTION.WORKSPACE_CARDS_LIST).concat(workspaceAccountID, "_").concat(CONST_1.default.EXPENSIFY_CARD.BANK), {
        selector: CardUtils_1.filterInactiveCards,
        canBeMissing: true,
    })[0];
    var flatlistRef = (0, react_1.useRef)(null);
    var lastAccessedWorkspacePolicyID = (0, useOnyx_1.default)(ONYXKEYS_1.default.LAST_ACCESSED_WORKSPACE_POLICY_ID, { canBeMissing: true })[0];
    var prevPolicyToDelete = (0, usePrevious_1.default)(policyToDelete);
    var hasCardFeedOrExpensifyCard = !(0, EmptyObject_1.isEmptyObject)(cardFeeds) ||
        !(0, EmptyObject_1.isEmptyObject)(cardsList) ||
        // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
        ((((_b = policies === null || policies === void 0 ? void 0 : policies["".concat(ONYXKEYS_1.default.COLLECTION.POLICY).concat(policyIDToDelete)]) === null || _b === void 0 ? void 0 : _b.areExpensifyCardsEnabled) ||
            ((_c = policies === null || policies === void 0 ? void 0 : policies["".concat(ONYXKEYS_1.default.COLLECTION.POLICY).concat(policyIDToDelete)]) === null || _c === void 0 ? void 0 : _c.areCompanyCardsEnabled)) &&
            ((_d = policies === null || policies === void 0 ? void 0 : policies["".concat(ONYXKEYS_1.default.COLLECTION.POLICY).concat(policyIDToDelete)]) === null || _d === void 0 ? void 0 : _d.workspaceAccountID));
    var personalDetails = (0, OnyxListItemProvider_1.usePersonalDetails)();
    var _r = (0, react_1.useState)(false), isLeaveModalOpen = _r[0], setIsLeaveModalOpen = _r[1];
    var _s = (0, react_1.useState)(false), isCannotLeaveWorkspaceModalOpen = _s[0], setIsCannotLeaveWorkspaceModalOpen = _s[1];
    var _t = (0, react_1.useState)(), policyIDToLeave = _t[0], setPolicyIDToLeave = _t[1];
    var policyToLeave = policies === null || policies === void 0 ? void 0 : policies["".concat(ONYXKEYS_1.default.COLLECTION.POLICY).concat(policyIDToLeave)];
    var policyToDeleteLatestErrorMessage = (0, ErrorUtils_1.getLatestErrorMessage)(policyToDelete);
    var isPendingDelete = (0, PolicyUtils_1.isPendingDeletePolicy)(policyToDelete);
    var prevIsPendingDelete = (0, PolicyUtils_1.isPendingDeletePolicy)(prevPolicyToDelete);
    var confirmDelete = function () {
        if (!policyIDToDelete || !policyNameToDelete) {
            return;
        }
        (0, Policy_1.deleteWorkspace)({
            policyID: policyIDToDelete,
            activePolicyID: activePolicyID,
            policyName: policyNameToDelete,
            lastAccessedWorkspacePolicyID: lastAccessedWorkspacePolicyID,
            policyCardFeeds: defaultCardFeeds,
            reportsToArchive: reportsToArchive,
            transactionViolations: transactionViolations,
            reimbursementAccountError: reimbursementAccountError,
            lastUsedPaymentMethods: lastPaymentMethod,
        });
        if (isOffline) {
            setIsDeleteModalOpen(false);
            setPolicyIDToDelete(undefined);
            setPolicyNameToDelete(undefined);
        }
    };
    var hideDeleteWorkspaceErrorModal = function () {
        setIsDeleteWorkspaceErrorModalOpen(false);
        setPolicyIDToDelete(undefined);
        if (!policyToDelete) {
            return;
        }
        dismissWorkspaceError(policyToDelete.id, policyToDelete.pendingAction);
    };
    var confirmLeaveAndHideModal = function () {
        if (!policyIDToLeave) {
            return;
        }
        (0, Policy_1.leaveWorkspace)(policyIDToLeave);
        setIsLeaveModalOpen(false);
    };
    var confirmModalPrompt = function () {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x;
        var exporters = [
            (_d = (_c = (_b = (_a = policyToLeave === null || policyToLeave === void 0 ? void 0 : policyToLeave.connections) === null || _a === void 0 ? void 0 : _a.intacct) === null || _b === void 0 ? void 0 : _b.config) === null || _c === void 0 ? void 0 : _c.export) === null || _d === void 0 ? void 0 : _d.exporter,
            (_h = (_g = (_f = (_e = policyToLeave === null || policyToLeave === void 0 ? void 0 : policyToLeave.connections) === null || _e === void 0 ? void 0 : _e.quickbooksDesktop) === null || _f === void 0 ? void 0 : _f.config) === null || _g === void 0 ? void 0 : _g.export) === null || _h === void 0 ? void 0 : _h.exporter,
            (_m = (_l = (_k = (_j = policyToLeave === null || policyToLeave === void 0 ? void 0 : policyToLeave.connections) === null || _j === void 0 ? void 0 : _j.quickbooksOnline) === null || _k === void 0 ? void 0 : _k.config) === null || _l === void 0 ? void 0 : _l.export) === null || _m === void 0 ? void 0 : _m.exporter,
            (_r = (_q = (_p = (_o = policyToLeave === null || policyToLeave === void 0 ? void 0 : policyToLeave.connections) === null || _o === void 0 ? void 0 : _o.xero) === null || _p === void 0 ? void 0 : _p.config) === null || _q === void 0 ? void 0 : _q.export) === null || _r === void 0 ? void 0 : _r.exporter,
            (_t = (_s = policyToLeave === null || policyToLeave === void 0 ? void 0 : policyToLeave.connections) === null || _s === void 0 ? void 0 : _s.netsuite) === null || _t === void 0 ? void 0 : _t.options.config.exporter,
        ];
        var policyOwnerDisplayName = (_w = (_v = personalDetails === null || personalDetails === void 0 ? void 0 : personalDetails[(_u = policyToLeave === null || policyToLeave === void 0 ? void 0 : policyToLeave.ownerAccountID) !== null && _u !== void 0 ? _u : CONST_1.default.DEFAULT_NUMBER_ID]) === null || _v === void 0 ? void 0 : _v.displayName) !== null && _w !== void 0 ? _w : '';
        var technicalContact = policyToLeave === null || policyToLeave === void 0 ? void 0 : policyToLeave.technicalContact;
        var isCurrentUserReimburser = isUserReimburserForPolicy(policies, policyIDToLeave, session === null || session === void 0 ? void 0 : session.email);
        var userEmail = (_x = session === null || session === void 0 ? void 0 : session.email) !== null && _x !== void 0 ? _x : '';
        var isApprover = (0, Member_1.isApprover)(policyToLeave, userEmail);
        if (isCurrentUserReimburser) {
            return translate('common.leaveWorkspaceReimburser');
        }
        if (technicalContact === userEmail) {
            return translate('common.leaveWorkspaceConfirmationTechContact', {
                workspaceOwner: policyOwnerDisplayName,
            });
        }
        if (exporters.some(function (exporter) { return exporter === userEmail; })) {
            return translate('common.leaveWorkspaceConfirmationExporter', {
                workspaceOwner: policyOwnerDisplayName,
            });
        }
        if (isApprover) {
            return translate('common.leaveWorkspaceConfirmationApprover', {
                workspaceOwner: policyOwnerDisplayName,
            });
        }
        if ((0, PolicyUtils_1.isPolicyAdmin)(policyToLeave)) {
            return translate('common.leaveWorkspaceConfirmationAdmin');
        }
        if ((0, PolicyUtils_1.isPolicyAuditor)(policyToLeave)) {
            return translate('common.leaveWorkspaceConfirmationAuditor');
        }
        return translate('common.leaveWorkspaceConfirmation');
    };
    var shouldCalculateBillNewDot = (0, SubscriptionUtils_1.shouldCalculateBillNewDot)(account === null || account === void 0 ? void 0 : account.canDowngrade);
    var resetLoadingSpinnerIconIndex = (0, react_1.useCallback)(function () {
        setLoadingSpinnerIconIndex(null);
    }, []);
    var startChangeOwnershipFlow = (0, react_1.useCallback)(function (policyID) {
        var _a;
        if (!policyID) {
            return;
        }
        (0, Member_1.clearWorkspaceOwnerChangeFlow)(policyID);
        (0, Member_1.requestWorkspaceOwnerChange)(policyID);
        Navigation_1.default.navigate(ROUTES_1.default.WORKSPACE_OWNER_CHANGE_CHECK.getRoute(policyID, (_a = session === null || session === void 0 ? void 0 : session.accountID) !== null && _a !== void 0 ? _a : CONST_1.default.DEFAULT_NUMBER_ID, 'amountOwed', Navigation_1.default.getActiveRoute()));
    }, [session === null || session === void 0 ? void 0 : session.accountID]);
    (0, react_1.useEffect)(function () {
        if (!prevIsPendingDelete || isPendingDelete || !policyIDToDelete) {
            return;
        }
        setIsDeleteModalOpen(false);
        if (!isFocused || !policyToDeleteLatestErrorMessage) {
            return;
        }
        setIsDeleteWorkspaceErrorModalOpen(true);
    }, [isPendingDelete, prevIsPendingDelete, isFocused, policyToDeleteLatestErrorMessage, policyIDToDelete]);
    /**
     * Gets the menu item for each workspace
     */
    var getWorkspaceMenuItem = (0, react_1.useCallback)(function (_a) {
        var item = _a.item, index = _a.index;
        var isAdmin = (0, PolicyUtils_1.isPolicyAdmin)(item, session === null || session === void 0 ? void 0 : session.email);
        var isOwner = item.ownerAccountID === (session === null || session === void 0 ? void 0 : session.accountID);
        var isDefault = activePolicyID === item.policyID;
        var shouldAnimateInHighlight = (duplicateWorkspace === null || duplicateWorkspace === void 0 ? void 0 : duplicateWorkspace.policyID) === item.policyID;
        var threeDotsMenuItems = [
            {
                icon: Expensicons.Building,
                text: translate('workspace.common.goToWorkspace'),
                onSelected: item.action,
            },
        ];
        if (!isOwner && (item.policyID !== preferredPolicyID || !isRestrictedToPreferredPolicy)) {
            threeDotsMenuItems.push({
                icon: Expensicons.Exit,
                text: translate('common.leave'),
                onSelected: (0, Session_1.callFunctionIfActionIsAllowed)(function () {
                    (0, Modal_1.close)(function () {
                        var isReimburser = isUserReimburserForPolicy(policies, item.policyID, session === null || session === void 0 ? void 0 : session.email);
                        setPolicyIDToLeave(item.policyID);
                        if (isReimburser) {
                            setIsCannotLeaveWorkspaceModalOpen(true);
                            return;
                        }
                        setIsLeaveModalOpen(true);
                    });
                }),
            });
        }
        if (isAdmin) {
            threeDotsMenuItems.push({
                icon: Expensicons.Copy,
                text: translate('workspace.common.duplicateWorkspace'),
                onSelected: function () { return (item.policyID ? Navigation_1.default.navigate(ROUTES_1.default.WORKSPACE_DUPLICATE.getRoute(item.policyID)) : undefined); },
            });
        }
        if (!isDefault && !(item === null || item === void 0 ? void 0 : item.isJoinRequestPending) && !isRestrictedToPreferredPolicy) {
            threeDotsMenuItems.push({
                icon: Expensicons.Star,
                text: translate('workspace.common.setAsDefault'),
                onSelected: function () {
                    if (!item.policyID || !activePolicyID) {
                        return;
                    }
                    (0, User_1.setNameValuePair)(ONYXKEYS_1.default.NVP_ACTIVE_POLICY_ID, item.policyID, activePolicyID);
                },
            });
        }
        if (isOwner) {
            threeDotsMenuItems.push({
                icon: Expensicons.Trashcan,
                text: translate('workspace.common.delete'),
                shouldShowLoadingSpinnerIcon: loadingSpinnerIconIndex === index,
                onSelected: function () {
                    if (loadingSpinnerIconIndex !== null) {
                        return;
                    }
                    setPolicyIDToDelete(item.policyID);
                    setPolicyNameToDelete(item.title);
                    if (shouldCalculateBillNewDot) {
                        setIsDeletingPaidWorkspace(true);
                        (0, Policy_1.calculateBillNewDot)();
                        setLoadingSpinnerIconIndex(index);
                        return;
                    }
                    continueDeleteWorkspace();
                },
                shouldKeepModalOpen: shouldCalculateBillNewDot,
                shouldCallAfterModalHide: !shouldCalculateBillNewDot,
            });
        }
        if (isAdmin && !isOwner && (0, shouldRenderTransferOwnerButton_1.default)(fundList)) {
            threeDotsMenuItems.push({
                icon: Expensicons.Transfer,
                text: translate('workspace.people.transferOwner'),
                onSelected: function () { return startChangeOwnershipFlow(item.policyID); },
            });
        }
        return (<OfflineWithFeedback_1.default key={"".concat(item.title, "_").concat(index)} pendingAction={item.pendingAction} errorRowStyles={styles.ph5} onClose={item.dismissError} errors={item.errors} style={styles.mb2} shouldShowErrorMessages={item.policyID !== policyIDToDelete} shouldHideOnDelete={false}>
                    <Pressable_1.PressableWithoutFeedback role={CONST_1.default.ROLE.BUTTON} accessibilityLabel="row" style={[styles.mh5]} disabled={item.disabled} onPress={item.action}>
                        {function (_a) {
                var hovered = _a.hovered;
                return (<WorkspacesListRow_1.default title={item.title} policyID={item.policyID} menuItems={threeDotsMenuItems} workspaceIcon={item.icon} ownerAccountID={item.ownerAccountID} workspaceType={item.type} shouldAnimateInHighlight={shouldAnimateInHighlight} isJoinRequestPending={item === null || item === void 0 ? void 0 : item.isJoinRequestPending} rowStyles={hovered && styles.hoveredComponentBG} layoutWidth={isLessThanMediumScreen ? CONST_1.default.LAYOUT_WIDTH.NARROW : CONST_1.default.LAYOUT_WIDTH.WIDE} brickRoadIndicator={item.brickRoadIndicator} shouldDisableThreeDotsMenu={item.disabled} style={[item.pendingAction === CONST_1.default.RED_BRICK_ROAD_PENDING_ACTION.DELETE ? styles.offlineFeedbackDeleted : {}]} isDefault={isDefault} isLoadingBill={isLoadingBill} resetLoadingSpinnerIconIndex={resetLoadingSpinnerIconIndex} isHovered={hovered}/>);
            }}
                    </Pressable_1.PressableWithoutFeedback>
                </OfflineWithFeedback_1.default>);
    }, [
        session === null || session === void 0 ? void 0 : session.email,
        session === null || session === void 0 ? void 0 : session.accountID,
        activePolicyID,
        duplicateWorkspace === null || duplicateWorkspace === void 0 ? void 0 : duplicateWorkspace.policyID,
        translate,
        policies,
        fundList,
        styles,
        loadingSpinnerIconIndex,
        shouldCalculateBillNewDot,
        setIsDeletingPaidWorkspace,
        startChangeOwnershipFlow,
        isLessThanMediumScreen,
        isLoadingBill,
        resetLoadingSpinnerIconIndex,
        continueDeleteWorkspace,
        isRestrictedToPreferredPolicy,
        policyIDToDelete,
        preferredPolicyID,
    ]);
    var navigateToWorkspace = (0, react_1.useCallback)(function (policyID) {
        // On the wide layout, we always want to open the Profile page when opening workspace settings from the list
        if (shouldUseNarrowLayout) {
            Navigation_1.default.navigate(ROUTES_1.default.WORKSPACE_INITIAL.getRoute(policyID));
            return;
        }
        Navigation_1.default.navigate(ROUTES_1.default.WORKSPACE_OVERVIEW.getRoute(policyID));
    }, [shouldUseNarrowLayout]);
    var navigateToDomain = (0, react_1.useCallback)(function (_a) {
        var accountID = _a.accountID, isValidated = _a.isValidated;
        if (isValidated) {
            return (0, Link_1.openOldDotLink)(CONST_1.default.OLDDOT_URLS.ADMIN_DOMAINS_URL);
        }
        Navigation_1.default.navigate(ROUTES_1.default.DOMAIN_INITIAL.getRoute(accountID));
    }, []);
    /**
     * Add free policies (workspaces) to the list of menu items and returns the list of menu items
     */
    var workspaces = (0, react_1.useMemo)(function () {
        var reimbursementAccountBrickRoadIndicator = !(0, EmptyObject_1.isEmptyObject)(reimbursementAccount === null || reimbursementAccount === void 0 ? void 0 : reimbursementAccount.errors) ? CONST_1.default.BRICK_ROAD_INDICATOR_STATUS.ERROR : undefined;
        if ((0, EmptyObject_1.isEmptyObject)(policies)) {
            return [];
        }
        return Object.values(policies)
            .filter(function (policy) { return (0, PolicyUtils_1.shouldShowPolicy)(policy, true, session === null || session === void 0 ? void 0 : session.email); })
            .map(function (policy) {
            var _a, _b;
            var receiptUberBrickRoadIndicator = (0, PolicyUtils_1.getUberConnectionErrorDirectlyFromPolicy)(policy) ? CONST_1.default.BRICK_ROAD_INDICATOR_STATUS.ERROR : undefined;
            if ((policy === null || policy === void 0 ? void 0 : policy.isJoinRequestPending) && (policy === null || policy === void 0 ? void 0 : policy.policyDetailsForNonMembers)) {
                var policyInfo = Object.values(policy.policyDetailsForNonMembers).at(0);
                var id = Object.keys(policy.policyDetailsForNonMembers).at(0);
                return {
                    listItemType: 'workspace',
                    title: policyInfo.name,
                    icon: (policyInfo === null || policyInfo === void 0 ? void 0 : policyInfo.avatar) ? policyInfo.avatar : (0, ReportUtils_1.getDefaultWorkspaceAvatar)(policy.name),
                    disabled: true,
                    ownerAccountID: policyInfo.ownerAccountID,
                    type: policyInfo.type,
                    iconType: (policyInfo === null || policyInfo === void 0 ? void 0 : policyInfo.avatar) ? CONST_1.default.ICON_TYPE_AVATAR : CONST_1.default.ICON_TYPE_ICON,
                    iconFill: theme.textLight,
                    fallbackIcon: Expensicons.FallbackWorkspaceAvatar,
                    policyID: id,
                    role: CONST_1.default.POLICY.ROLE.USER,
                    errors: undefined,
                    action: function () { return null; },
                    dismissError: function () { return null; },
                    isJoinRequestPending: true,
                };
            }
            return {
                listItemType: 'workspace',
                title: policy.name,
                icon: policy.avatarURL ? policy.avatarURL : (0, ReportUtils_1.getDefaultWorkspaceAvatar)(policy.name),
                action: function () { return navigateToWorkspace(policy.id); },
                brickRoadIndicator: !(0, PolicyUtils_1.isPolicyAdmin)(policy)
                    ? undefined
                    : ((_b = (_a = reimbursementAccountBrickRoadIndicator !== null && reimbursementAccountBrickRoadIndicator !== void 0 ? reimbursementAccountBrickRoadIndicator : receiptUberBrickRoadIndicator) !== null && _a !== void 0 ? _a : ((0, PolicyUtils_1.shouldShowEmployeeListError)(policy) ? CONST_1.default.BRICK_ROAD_INDICATOR_STATUS.ERROR : undefined)) !== null && _b !== void 0 ? _b : (0, PolicyUtils_1.getPolicyBrickRoadIndicatorStatus)(policy, (0, connections_1.isConnectionInProgress)(allConnectionSyncProgresses === null || allConnectionSyncProgresses === void 0 ? void 0 : allConnectionSyncProgresses["".concat(ONYXKEYS_1.default.COLLECTION.POLICY_CONNECTION_SYNC_PROGRESS).concat(policy.id)], policy))),
                pendingAction: policy.pendingAction,
                errors: policy.errors,
                dismissError: function () { return dismissWorkspaceError(policy.id, policy.pendingAction); },
                disabled: policy.pendingAction === CONST_1.default.RED_BRICK_ROAD_PENDING_ACTION.DELETE,
                iconType: policy.avatarURL ? CONST_1.default.ICON_TYPE_AVATAR : CONST_1.default.ICON_TYPE_ICON,
                iconFill: theme.textLight,
                fallbackIcon: Expensicons.FallbackWorkspaceAvatar,
                policyID: policy.id,
                ownerAccountID: policy.ownerAccountID,
                role: policy.role,
                type: policy.type,
                employeeList: policy.employeeList,
            };
        });
    }, [reimbursementAccount === null || reimbursementAccount === void 0 ? void 0 : reimbursementAccount.errors, policies, session === null || session === void 0 ? void 0 : session.email, allConnectionSyncProgresses, theme.textLight, navigateToWorkspace]);
    var filterWorkspace = (0, react_1.useCallback)(function (workspace, inputValue) { return workspace.title.toLowerCase().includes(inputValue); }, []);
    var sortWorkspace = (0, react_1.useCallback)(function (workspaceItems) { return workspaceItems.sort(function (a, b) { return localeCompare(a.title, b.title); }); }, [localeCompare]);
    var _u = (0, useSearchResults_1.default)(workspaces, filterWorkspace, sortWorkspace), inputValue = _u[0], setInputValue = _u[1], filteredWorkspaces = _u[2];
    var domains = (0, react_1.useMemo)(function () {
        if (!allDomains) {
            return [];
        }
        return Object.values(allDomains).reduce(function (domainItems, domain) {
            if (!domain) {
                return domainItems;
            }
            var isAdmin = !!(adminAccess === null || adminAccess === void 0 ? void 0 : adminAccess["".concat(ONYXKEYS_1.default.COLLECTION.SHARED_NVP_PRIVATE_ADMIN_ACCESS).concat(domain.accountID)]);
            domainItems.push({
                listItemType: 'domain',
                accountID: domain.accountID,
                title: expensify_common_1.Str.extractEmailDomain(domain.email),
                action: function () { return navigateToDomain({ accountID: domain.accountID, isValidated: domain.validated }); },
                isAdmin: isAdmin,
                isValidated: domain.validated,
                pendingAction: domain.pendingAction,
            });
            return domainItems;
        }, []);
    }, [navigateToDomain, allDomains, adminAccess]);
    (0, react_1.useEffect)(function () {
        var _a;
        if ((0, EmptyObject_1.isEmptyObject)(duplicateWorkspace) || !filteredWorkspaces.length || !isFocused) {
            return;
        }
        var duplicateWorkspaceIndex = filteredWorkspaces.findIndex(function (workspace) { return workspace.policyID === duplicateWorkspace.policyID; });
        if (duplicateWorkspaceIndex > 0) {
            (_a = flatlistRef.current) === null || _a === void 0 ? void 0 : _a.scrollToIndex({ index: duplicateWorkspaceIndex, animated: false });
            // eslint-disable-next-line @typescript-eslint/no-deprecated
            react_native_1.InteractionManager.runAfterInteractions(function () {
                (0, Policy_1.clearDuplicateWorkspace)();
            });
        }
    }, [duplicateWorkspace, isFocused, filteredWorkspaces]);
    var listHeaderComponent = (<>
            {isLessThanMediumScreen && <react_native_1.View style={styles.mt3}/>}
            {workspaces.length > CONST_1.default.SEARCH_ITEM_LIMIT && (<SearchBar_1.default label={translate('workspace.common.findWorkspace')} inputValue={inputValue} onChangeText={setInputValue} shouldShowEmptyState={filteredWorkspaces.length === 0 && inputValue.length > 0}/>)}
            {!isLessThanMediumScreen && filteredWorkspaces.length > 0 && (<react_native_1.View style={[styles.flexRow, styles.gap5, styles.pt2, styles.pb3, styles.pr5, styles.pl10, styles.appBG]}>
                    <react_native_1.View style={[styles.flexRow, styles.flex2]}>
                        <Text_1.default numberOfLines={1} style={[styles.flexGrow1, styles.textLabelSupporting]}>
                            {translate('workspace.common.workspaceName')}
                        </Text_1.default>
                    </react_native_1.View>
                    <react_native_1.View style={[styles.flexRow, styles.flex1, styles.workspaceOwnerSectionTitle, styles.workspaceOwnerSectionMinWidth]}>
                        <Text_1.default numberOfLines={1} style={[styles.flexGrow1, styles.textLabelSupporting]}>
                            {translate('workspace.common.workspaceOwner')}
                        </Text_1.default>
                    </react_native_1.View>
                    <react_native_1.View style={[styles.flexRow, styles.flex1, styles.workspaceTypeSectionTitle]}>
                        <Text_1.default numberOfLines={1} style={[styles.flexGrow1, styles.textLabelSupporting]}>
                            {translate('workspace.common.workspaceType')}
                        </Text_1.default>
                    </react_native_1.View>
                    <react_native_1.View style={[styles.workspaceRightColumn, styles.mr7]}/>
                </react_native_1.View>)}
        </>);
    var getHeaderButton = function () {
        if (isRestrictedPolicyCreation || workspaces.length === 0) {
            return null;
        }
        return (<Button_1.default accessibilityLabel={translate('workspace.new.newWorkspace')} text={translate('workspace.new.newWorkspace')} onPress={function () { return (0, interceptAnonymousUser_1.default)(function () { return Navigation_1.default.navigate(ROUTES_1.default.WORKSPACE_CONFIRMATION.getRoute(ROUTES_1.default.WORKSPACES_LIST.route)); }); }} icon={Expensicons.Plus} style={shouldUseNarrowLayout && [styles.flexGrow1, styles.mb3]}/>);
    };
    var onBackButtonPress = function () {
        var _a;
        Navigation_1.default.goBack((_a = route.params) === null || _a === void 0 ? void 0 : _a.backTo);
        return true;
    };
    (0, useHandleBackButton_1.default)(onBackButtonPress);
    var data = (0, react_1.useMemo)(function () {
        var shouldShowDomainsSection = !inputValue.trim().length && domains.length;
        return [
            // workspaces empty state
            !workspaces.length ? [{ listItemType: 'workspaces-empty-state' }] : [],
            // workspaces
            filteredWorkspaces,
            // domains header and domains
            shouldShowDomainsSection ? __spreadArray([{ listItemType: 'domains-header' }], domains, true) : [],
        ].flat();
    }, [domains, filteredWorkspaces, workspaces.length, inputValue]);
    var renderItem = (0, react_1.useCallback)(
    // eslint-disable-next-line react/no-unused-prop-types
    function (_a) {
        var item = _a.item, index = _a.index;
        switch (item.listItemType) {
            case 'workspace': {
                return getWorkspaceMenuItem({ item: item, index: index });
            }
            case 'domain': {
                return (<DomainMenuItem_1.default item={item} index={index}/>);
            }
            case 'domains-header': {
                return (<react_native_1.View style={[styles.optionsListSectionHeader, styles.justifyContentCenter, styles.ph5, styles.pv3, styles.mt0, styles.mb0]}>
                            <Text_1.default style={[styles.ph5, styles.textLabelSupporting]}>{translate('common.domains')}</Text_1.default>
                        </react_native_1.View>);
            }
            case 'workspaces-empty-state': {
                return <WorkspacesEmptyStateComponent_1.default />;
            }
            default:
                return null;
        }
    }, [getWorkspaceMenuItem, styles, translate]);
    if (!workspaces.length && !domains.length) {
        return (<ScreenWrapper_1.default shouldEnablePickerAvoiding={false} shouldEnableMaxHeight testID={WorkspacesListPage.displayName} shouldShowOfflineIndicatorInWideScreen bottomContent={shouldUseNarrowLayout && (<NavigationTabBar_1.default selectedTab={NAVIGATION_TABS_1.default.WORKSPACES} shouldShowFloatingCameraButton={false}/>)} enableEdgeToEdgeBottomSafeAreaPadding={false}>
                <react_native_1.View style={styles.topBarWrapper}>
                    <TopBar_1.default breadcrumbLabel={translate('common.workspaces')}/>
                </react_native_1.View>
                {shouldShowLoadingIndicator ? (<react_native_1.View style={[styles.flex1]}>
                        <FullscreenLoadingIndicator_1.default style={[styles.flex1, styles.pRelative]}/>
                    </react_native_1.View>) : (<ScrollView_1.default contentContainerStyle={[styles.pt2, styles.flexGrow1, styles.flexShrink0]}>
                        <WorkspacesEmptyStateComponent_1.default />
                    </ScrollView_1.default>)}
                {shouldDisplayLHB && <NavigationTabBar_1.default selectedTab={NAVIGATION_TABS_1.default.WORKSPACES}/>}
            </ScreenWrapper_1.default>);
    }
    return (<ScreenWrapper_1.default shouldEnablePickerAvoiding={false} shouldShowOfflineIndicatorInWideScreen testID={WorkspacesListPage.displayName} enableEdgeToEdgeBottomSafeAreaPadding={false} bottomContent={shouldUseNarrowLayout && (<NavigationTabBar_1.default selectedTab={NAVIGATION_TABS_1.default.WORKSPACES} shouldShowFloatingCameraButton={false}/>)}>
            <react_native_1.View style={styles.flex1}>
                <TopBar_1.default breadcrumbLabel={translate('common.workspaces')}>{!shouldUseNarrowLayout && <react_native_1.View style={[styles.pr2]}>{getHeaderButton()}</react_native_1.View>}</TopBar_1.default>
                {shouldUseNarrowLayout && <react_native_1.View style={[styles.ph5, styles.pt2]}>{getHeaderButton()}</react_native_1.View>}
                <react_native_1.FlatList ref={flatlistRef} data={data} onScrollToIndexFailed={function (info) {
            var _a;
            (_a = flatlistRef.current) === null || _a === void 0 ? void 0 : _a.scrollToOffset({
                offset: info.averageItemLength * info.index,
                animated: true,
            });
        }} renderItem={renderItem} ListHeaderComponent={listHeaderComponent} keyboardShouldPersistTaps="handled" contentContainerStyle={styles.pb20}/>
            </react_native_1.View>
            <ConfirmModal_1.default title={translate('workspace.common.delete')} isVisible={isDeleteModalOpen} onConfirm={confirmDelete} onCancel={function () { return setIsDeleteModalOpen(false); }} prompt={hasCardFeedOrExpensifyCard ? translate('workspace.common.deleteWithCardsConfirmation') : translate('workspace.common.deleteConfirmation')} confirmText={translate('common.delete')} cancelText={translate('common.cancel')} isConfirmLoading={isPendingDelete} danger/>
            <ConfirmModal_1.default title={translate('common.leaveWorkspace')} isVisible={isLeaveModalOpen} onConfirm={confirmLeaveAndHideModal} onCancel={function () { return setIsLeaveModalOpen(false); }} prompt={confirmModalPrompt()} confirmText={translate('common.leaveWorkspace')} cancelText={translate('common.cancel')} danger/>
            <ConfirmModal_1.default title={translate('common.leaveWorkspace')} isVisible={isCannotLeaveWorkspaceModalOpen} onConfirm={function () { return setIsCannotLeaveWorkspaceModalOpen(false); }} prompt={confirmModalPrompt()} confirmText={translate('common.buttonConfirm')} shouldShowCancelButton={false} success/>
            <ConfirmModal_1.default title={translate('workspace.common.delete')} isVisible={isDeleteWorkspaceErrorModalOpen} onConfirm={hideDeleteWorkspaceErrorModal} onCancel={hideDeleteWorkspaceErrorModal} prompt={policyToDeleteLatestErrorMessage} confirmText={translate('common.buttonConfirm')} shouldShowCancelButton={false} success={false}/>
            {shouldDisplayLHB && <NavigationTabBar_1.default selectedTab={NAVIGATION_TABS_1.default.WORKSPACES}/>}
        </ScreenWrapper_1.default>);
}
WorkspacesListPage.displayName = 'WorkspacesListPage';
exports.default = WorkspacesListPage;
