"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var native_1 = require("@react-navigation/native");
var Session_1 = require("@selectors/Session");
var react_1 = require("react");
var react_native_1 = require("react-native");
var Avatar_1 = require("@components/Avatar");
var AvatarWithImagePicker_1 = require("@components/AvatarWithImagePicker");
var ButtonWithDropdownMenu_1 = require("@components/ButtonWithDropdownMenu");
var ConfirmModal_1 = require("@components/ConfirmModal");
var Expensicons = require("@components/Icon/Expensicons");
var LockedAccountModalProvider_1 = require("@components/LockedAccountModalProvider");
var MenuItemWithTopDescription_1 = require("@components/MenuItemWithTopDescription");
var OfflineWithFeedback_1 = require("@components/OfflineWithFeedback");
var OnyxListItemProvider_1 = require("@components/OnyxListItemProvider");
var Section_1 = require("@components/Section");
var useCardFeeds_1 = require("@hooks/useCardFeeds");
var useCurrentUserPersonalDetails_1 = require("@hooks/useCurrentUserPersonalDetails");
var useDefaultFundID_1 = require("@hooks/useDefaultFundID");
var useLazyAsset_1 = require("@hooks/useLazyAsset");
var useLocalize_1 = require("@hooks/useLocalize");
var useNetwork_1 = require("@hooks/useNetwork");
var useOnyx_1 = require("@hooks/useOnyx");
var usePayAndDowngrade_1 = require("@hooks/usePayAndDowngrade");
var usePermissions_1 = require("@hooks/usePermissions");
var usePrevious_1 = require("@hooks/usePrevious");
var useResponsiveLayout_1 = require("@hooks/useResponsiveLayout");
var useThemeIllustrations_1 = require("@hooks/useThemeIllustrations");
var useThemeStyles_1 = require("@hooks/useThemeStyles");
var useTransactionViolationOfWorkspace_1 = require("@hooks/useTransactionViolationOfWorkspace");
var Modal_1 = require("@libs/actions/Modal");
var Member_1 = require("@libs/actions/Policy/Member");
var Policy_1 = require("@libs/actions/Policy/Policy");
var CardUtils_1 = require("@libs/CardUtils");
var ErrorUtils_1 = require("@libs/ErrorUtils");
var Navigation_1 = require("@libs/Navigation/Navigation");
var PolicyUtils_1 = require("@libs/PolicyUtils");
var ReportUtils_1 = require("@libs/ReportUtils");
var shouldRenderTransferOwnerButton_1 = require("@libs/shouldRenderTransferOwnerButton");
var StringUtils_1 = require("@libs/StringUtils");
var SubscriptionUtils_1 = require("@libs/SubscriptionUtils");
var CONST_1 = require("@src/CONST");
var ONYXKEYS_1 = require("@src/ONYXKEYS");
var ROUTES_1 = require("@src/ROUTES");
var ReimbursementAccount_1 = require("@src/selectors/ReimbursementAccount");
var EmptyObject_1 = require("@src/types/utils/EmptyObject");
var WorkspaceReceiptPartnersPromotionBanner_1 = require("./receiptPartners/WorkspaceReceiptPartnersPromotionBanner");
var withPolicy_1 = require("./withPolicy");
var WorkspacePageWithSections_1 = require("./WorkspacePageWithSections");
function WorkspaceOverviewPage(_a) {
    var _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
    var policyDraft = _a.policyDraft, policyProp = _a.policy, route = _a.route;
    var styles = (0, useThemeStyles_1.default)();
    var translate = (0, useLocalize_1.default)().translate;
    var shouldUseNarrowLayout = (0, useResponsiveLayout_1.default)().shouldUseNarrowLayout;
    var currentUserPersonalDetails = (0, useCurrentUserPersonalDetails_1.default)();
    var illustrations = (0, useThemeIllustrations_1.default)();
    var illustrationIcons = (0, useLazyAsset_1.useMemoizedLazyIllustrations)(['Building']);
    var expensifyIcons = (0, useLazyAsset_1.useMemoizedLazyExpensifyIcons)(['FallbackWorkspaceAvatar', 'ImageCropSquareMask', 'QrCode', 'Transfer', 'Trashcan', 'UserPlus']);
    var backTo = route.params.backTo;
    var _o = (0, useOnyx_1.default)(ONYXKEYS_1.default.CURRENCY_LIST, { canBeMissing: true })[0], currencyList = _o === void 0 ? (0, EmptyObject_1.getEmptyObject)() : _o;
    var account = (0, useOnyx_1.default)(ONYXKEYS_1.default.ACCOUNT, { canBeMissing: true })[0];
    var _p = (0, useOnyx_1.default)(ONYXKEYS_1.default.SESSION, {
        selector: Session_1.accountIDSelector,
        canBeMissing: true,
    })[0], currentUserAccountID = _p === void 0 ? -1 : _p;
    var fundList = (0, useOnyx_1.default)(ONYXKEYS_1.default.FUND_LIST, { canBeMissing: true })[0];
    var isComingFromGlobalReimbursementsFlow = (0, useOnyx_1.default)(ONYXKEYS_1.default.IS_COMING_FROM_GLOBAL_REIMBURSEMENTS_FLOW, { canBeMissing: true })[0];
    var lastAccessedWorkspacePolicyID = (0, useOnyx_1.default)(ONYXKEYS_1.default.LAST_ACCESSED_WORKSPACE_POLICY_ID, { canBeMissing: true })[0];
    var reimbursementAccountError = (0, useOnyx_1.default)(ONYXKEYS_1.default.REIMBURSEMENT_ACCOUNT, { canBeMissing: true, selector: ReimbursementAccount_1.reimbursementAccountErrorSelector })[0];
    // When we create a new workspace, the policy prop will be empty on the first render. Therefore, we have to use policyDraft until policy has been set in Onyx.
    var policy = (policyDraft === null || policyDraft === void 0 ? void 0 : policyDraft.id) ? policyDraft : policyProp;
    var defaultFundID = (0, useDefaultFundID_1.default)(policy === null || policy === void 0 ? void 0 : policy.id);
    var cardSettings = (0, useOnyx_1.default)("".concat(ONYXKEYS_1.default.COLLECTION.PRIVATE_EXPENSIFY_CARD_SETTINGS).concat(defaultFundID), { canBeMissing: true })[0];
    var isBankAccountVerified = !!(cardSettings === null || cardSettings === void 0 ? void 0 : cardSettings.paymentBankAccountID);
    var isPolicyAdmin = (0, PolicyUtils_1.isPolicyAdmin)(policy);
    var outputCurrency = (_b = policy === null || policy === void 0 ? void 0 : policy.outputCurrency) !== null && _b !== void 0 ? _b : '';
    var currencySymbol = (_d = (_c = currencyList === null || currencyList === void 0 ? void 0 : currencyList[outputCurrency]) === null || _c === void 0 ? void 0 : _c.symbol) !== null && _d !== void 0 ? _d : '';
    var formattedCurrency = !(0, EmptyObject_1.isEmptyObject)(policy) && !(0, EmptyObject_1.isEmptyObject)(currencyList) ? "".concat(outputCurrency, " - ").concat(currencySymbol) : '';
    // We need this to update translation for deleting a workspace when it has third party card feeds or expensify card assigned.
    var workspaceAccountID = (_e = policy === null || policy === void 0 ? void 0 : policy.workspaceAccountID) !== null && _e !== void 0 ? _e : CONST_1.default.DEFAULT_NUMBER_ID;
    var _q = (0, useCardFeeds_1.default)(policy === null || policy === void 0 ? void 0 : policy.id), cardFeeds = _q[0], defaultCardFeeds = _q[2];
    var cardsList = (0, useOnyx_1.default)("".concat(ONYXKEYS_1.default.COLLECTION.WORKSPACE_CARDS_LIST).concat(workspaceAccountID, "_").concat(CONST_1.default.EXPENSIFY_CARD.BANK), {
        selector: CardUtils_1.filterInactiveCards,
        canBeMissing: true,
    })[0];
    var hasCardFeedOrExpensifyCard = 
    // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
    !(0, EmptyObject_1.isEmptyObject)(cardFeeds) || !(0, EmptyObject_1.isEmptyObject)(cardsList) || (((policy === null || policy === void 0 ? void 0 : policy.areExpensifyCardsEnabled) || (policy === null || policy === void 0 ? void 0 : policy.areCompanyCardsEnabled)) && (policy === null || policy === void 0 ? void 0 : policy.workspaceAccountID));
    var _r = ((_g = (_f = policy === null || policy === void 0 ? void 0 : policy.address) === null || _f === void 0 ? void 0 : _f.addressStreet) !== null && _g !== void 0 ? _g : '').split('\n'), street1 = _r[0], street2 = _r[1];
    var formattedAddress = !(0, EmptyObject_1.isEmptyObject)(policy) && !(0, EmptyObject_1.isEmptyObject)(policy.address)
        ? "".concat(street1 === null || street1 === void 0 ? void 0 : street1.trim(), ", ").concat(street2 ? "".concat(street2.trim(), ", ") : '').concat(policy.address.city, ", ").concat(policy.address.state, " ").concat((_h = policy.address.zipCode) !== null && _h !== void 0 ? _h : '')
        : '';
    var _s = (0, useTransactionViolationOfWorkspace_1.default)(policy === null || policy === void 0 ? void 0 : policy.id), reportsToArchive = _s.reportsToArchive, transactionViolations = _s.transactionViolations;
    var onPressCurrency = (0, react_1.useCallback)(function () {
        if (!(policy === null || policy === void 0 ? void 0 : policy.id)) {
            return;
        }
        Navigation_1.default.navigate(ROUTES_1.default.WORKSPACE_OVERVIEW_CURRENCY.getRoute(policy.id));
    }, [policy === null || policy === void 0 ? void 0 : policy.id]);
    var onPressAddress = (0, react_1.useCallback)(function () {
        if (!(policy === null || policy === void 0 ? void 0 : policy.id)) {
            return;
        }
        Navigation_1.default.navigate(ROUTES_1.default.WORKSPACE_OVERVIEW_ADDRESS.getRoute(policy.id));
    }, [policy === null || policy === void 0 ? void 0 : policy.id]);
    var onPressName = (0, react_1.useCallback)(function () {
        if (!(policy === null || policy === void 0 ? void 0 : policy.id)) {
            return;
        }
        Navigation_1.default.navigate(ROUTES_1.default.WORKSPACE_OVERVIEW_NAME.getRoute(policy.id));
    }, [policy === null || policy === void 0 ? void 0 : policy.id]);
    var onPressDescription = (0, react_1.useCallback)(function () {
        if (!(policy === null || policy === void 0 ? void 0 : policy.id)) {
            return;
        }
        Navigation_1.default.navigate(ROUTES_1.default.WORKSPACE_OVERVIEW_DESCRIPTION.getRoute(policy.id));
    }, [policy === null || policy === void 0 ? void 0 : policy.id]);
    var onPressShare = (0, react_1.useCallback)(function () {
        if (!(policy === null || policy === void 0 ? void 0 : policy.id)) {
            return;
        }
        Navigation_1.default.navigate(ROUTES_1.default.WORKSPACE_OVERVIEW_SHARE.getRoute(policy.id));
    }, [policy === null || policy === void 0 ? void 0 : policy.id]);
    var onPressPlanType = (0, react_1.useCallback)(function () {
        if (!(policy === null || policy === void 0 ? void 0 : policy.id)) {
            return;
        }
        Navigation_1.default.navigate(ROUTES_1.default.WORKSPACE_OVERVIEW_PLAN.getRoute(policy.id));
    }, [policy === null || policy === void 0 ? void 0 : policy.id]);
    var policyName = (_j = policy === null || policy === void 0 ? void 0 : policy.name) !== null && _j !== void 0 ? _j : '';
    var policyDescription = (_k = policy === null || policy === void 0 ? void 0 : policy.description) !== null && _k !== void 0 ? _k : translate('workspace.common.defaultDescription');
    var policyCurrency = (_l = policy === null || policy === void 0 ? void 0 : policy.outputCurrency) !== null && _l !== void 0 ? _l : '';
    var readOnly = !(0, PolicyUtils_1.isPolicyAdmin)(policy);
    var currencyReadOnly = readOnly || isBankAccountVerified;
    var isOwner = (0, PolicyUtils_1.isPolicyOwner)(policy, currentUserAccountID);
    var imageStyle = shouldUseNarrowLayout ? [styles.mhv12, styles.mhn5, styles.mbn5] : [styles.mhv8, styles.mhn8, styles.mbn5];
    var shouldShowAddress = !readOnly || !!formattedAddress;
    var _t = (0, react_1.useContext)(LockedAccountModalProvider_1.LockedAccountContext), isAccountLocked = _t.isAccountLocked, showLockedAccountModal = _t.showLockedAccountModal;
    var lastPaymentMethod = (0, useOnyx_1.default)(ONYXKEYS_1.default.NVP_LAST_PAYMENT_METHOD, { canBeMissing: true })[0];
    var isBetaEnabled = (0, usePermissions_1.default)().isBetaEnabled;
    var _u = (0, react_1.useState)(false), isLeaveModalOpen = _u[0], setIsLeaveModalOpen = _u[1];
    var session = (0, useOnyx_1.default)(ONYXKEYS_1.default.SESSION, { canBeMissing: true })[0];
    var personalDetails = (0, OnyxListItemProvider_1.usePersonalDetails)();
    var _v = (0, react_1.useState)(false), isCannotLeaveWorkspaceModalOpen = _v[0], setIsCannotLeaveWorkspaceModalOpen = _v[1];
    var isFocused = (0, native_1.useIsFocused)();
    var isPendingDelete = (0, PolicyUtils_1.isPendingDeletePolicy)(policy);
    var prevIsPendingDelete = (0, usePrevious_1.default)(isPendingDelete);
    var _w = (0, react_1.useState)(false), isDeleteWorkspaceErrorModalOpen = _w[0], setIsDeleteWorkspaceErrorModalOpen = _w[1];
    var policyLastErrorMessage = (0, ErrorUtils_1.getLatestErrorMessage)(policy);
    var fetchPolicyData = (0, react_1.useCallback)(function () {
        if (policyDraft === null || policyDraft === void 0 ? void 0 : policyDraft.id) {
            return;
        }
        (0, Policy_1.openPolicyProfilePage)(route.params.policyID);
    }, [policyDraft === null || policyDraft === void 0 ? void 0 : policyDraft.id, route.params.policyID]);
    var isOffline = (0, useNetwork_1.default)({ onReconnect: fetchPolicyData }).isOffline;
    // We have the same focus effect in the WorkspaceInitialPage, this way we can get the policy data in narrow
    // as well as in the wide layout when looking at policy settings.
    (0, native_1.useFocusEffect)((0, react_1.useCallback)(function () {
        fetchPolicyData();
    }, [fetchPolicyData]));
    var DefaultAvatar = (0, react_1.useCallback)(function () { return (<Avatar_1.default containerStyles={styles.avatarXLarge} imageStyles={[styles.avatarXLarge, styles.alignSelfCenter]} 
    // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing -- nullish coalescing cannot be used if left side can be empty string
    source={(policy === null || policy === void 0 ? void 0 : policy.avatarURL) || (0, ReportUtils_1.getDefaultWorkspaceAvatar)(policyName)} fallbackIcon={expensifyIcons.FallbackWorkspaceAvatar} size={CONST_1.default.AVATAR_SIZE.X_LARGE} name={policyName} avatarID={policy === null || policy === void 0 ? void 0 : policy.id} type={CONST_1.default.ICON_TYPE_WORKSPACE}/>); }, [expensifyIcons.FallbackWorkspaceAvatar, policy === null || policy === void 0 ? void 0 : policy.avatarURL, policy === null || policy === void 0 ? void 0 : policy.id, policyName, styles.alignSelfCenter, styles.avatarXLarge]);
    var _x = (0, react_1.useState)(false), isDeleteModalOpen = _x[0], setIsDeleteModalOpen = _x[1];
    var continueDeleteWorkspace = (0, react_1.useCallback)(function () {
        setIsDeleteModalOpen(true);
    }, []);
    var _y = (0, usePayAndDowngrade_1.default)(continueDeleteWorkspace), setIsDeletingPaidWorkspace = _y.setIsDeletingPaidWorkspace, isLoadingBill = _y.isLoadingBill;
    var dropdownMenuRef = (0, react_1.useRef)(null);
    var activePolicyID = (0, useOnyx_1.default)(ONYXKEYS_1.default.NVP_ACTIVE_POLICY_ID, { canBeMissing: true })[0];
    var confirmDelete = (0, react_1.useCallback)(function () {
        if (!(policy === null || policy === void 0 ? void 0 : policy.id) || !policyName) {
            return;
        }
        (0, Policy_1.deleteWorkspace)({
            policyID: policy.id,
            activePolicyID: activePolicyID,
            policyName: policyName,
            lastAccessedWorkspacePolicyID: lastAccessedWorkspacePolicyID,
            policyCardFeeds: defaultCardFeeds,
            reportsToArchive: reportsToArchive,
            transactionViolations: transactionViolations,
            reimbursementAccountError: reimbursementAccountError,
            lastUsedPaymentMethods: lastPaymentMethod,
        });
        if (isOffline) {
            setIsDeleteModalOpen(false);
            (0, PolicyUtils_1.goBackFromInvalidPolicy)();
        }
    }, [
        policy === null || policy === void 0 ? void 0 : policy.id,
        policyName,
        lastAccessedWorkspacePolicyID,
        defaultCardFeeds,
        reportsToArchive,
        transactionViolations,
        reimbursementAccountError,
        lastPaymentMethod,
        isOffline,
        activePolicyID,
    ]);
    var handleLeaveWorkspace = (0, react_1.useCallback)(function () {
        if (!(policy === null || policy === void 0 ? void 0 : policy.id)) {
            return;
        }
        (0, Policy_1.leaveWorkspace)(policy.id);
        setIsLeaveModalOpen(false);
        (0, PolicyUtils_1.goBackFromInvalidPolicy)();
    }, [policy === null || policy === void 0 ? void 0 : policy.id]);
    var hideDeleteWorkspaceErrorModal = function () {
        setIsDeleteWorkspaceErrorModalOpen(false);
        (0, Policy_1.clearDeleteWorkspaceError)(policy === null || policy === void 0 ? void 0 : policy.id);
    };
    (0, react_1.useEffect)(function () {
        var _a;
        if (isLoadingBill) {
            return;
        }
        (_a = dropdownMenuRef.current) === null || _a === void 0 ? void 0 : _a.setIsMenuVisible(false);
    }, [isLoadingBill]);
    (0, react_1.useEffect)(function () {
        if (!isFocused || !prevIsPendingDelete || isPendingDelete) {
            return;
        }
        setIsDeleteModalOpen(false);
        if (!policyLastErrorMessage) {
            (0, PolicyUtils_1.goBackFromInvalidPolicy)();
            return;
        }
        setIsDeleteWorkspaceErrorModalOpen(true);
    }, [isFocused, isPendingDelete, prevIsPendingDelete, policyLastErrorMessage]);
    var onDeleteWorkspace = (0, react_1.useCallback)(function () {
        if ((0, SubscriptionUtils_1.shouldCalculateBillNewDot)(account === null || account === void 0 ? void 0 : account.canDowngrade)) {
            setIsDeletingPaidWorkspace(true);
            (0, Policy_1.calculateBillNewDot)();
            return;
        }
        continueDeleteWorkspace();
    }, [continueDeleteWorkspace, setIsDeletingPaidWorkspace, account === null || account === void 0 ? void 0 : account.canDowngrade]);
    var handleBackButtonPress = function () {
        if (isComingFromGlobalReimbursementsFlow) {
            (0, Policy_1.setIsComingFromGlobalReimbursementsFlow)(false);
            Navigation_1.default.goBack();
            return;
        }
        if (backTo) {
            Navigation_1.default.goBack(backTo);
            return;
        }
        Navigation_1.default.popToSidebar();
    };
    var startChangeOwnershipFlow = (0, react_1.useCallback)(function () {
        var policyID = policy === null || policy === void 0 ? void 0 : policy.id;
        (0, Member_1.clearWorkspaceOwnerChangeFlow)(policyID);
        (0, Member_1.requestWorkspaceOwnerChange)(policyID);
        Navigation_1.default.navigate(ROUTES_1.default.WORKSPACE_OWNER_CHANGE_CHECK.getRoute(policyID, currentUserAccountID, 'amountOwed', Navigation_1.default.getActiveRoute()));
    }, [currentUserAccountID, policy === null || policy === void 0 ? void 0 : policy.id]);
    var handleLeave = (0, react_1.useCallback)(function () {
        var _a;
        var isReimburser = ((_a = policy === null || policy === void 0 ? void 0 : policy.achAccount) === null || _a === void 0 ? void 0 : _a.reimburser) === (session === null || session === void 0 ? void 0 : session.email);
        if (isReimburser) {
            setIsCannotLeaveWorkspaceModalOpen(true);
            return;
        }
        setIsLeaveModalOpen(true);
    }, [(_m = policy === null || policy === void 0 ? void 0 : policy.achAccount) === null || _m === void 0 ? void 0 : _m.reimburser, session === null || session === void 0 ? void 0 : session.email]);
    var confirmModalPrompt = function () {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y;
        var exporters = [
            (_d = (_c = (_b = (_a = policy === null || policy === void 0 ? void 0 : policy.connections) === null || _a === void 0 ? void 0 : _a.intacct) === null || _b === void 0 ? void 0 : _b.config) === null || _c === void 0 ? void 0 : _c.export) === null || _d === void 0 ? void 0 : _d.exporter,
            (_h = (_g = (_f = (_e = policy === null || policy === void 0 ? void 0 : policy.connections) === null || _e === void 0 ? void 0 : _e.quickbooksDesktop) === null || _f === void 0 ? void 0 : _f.config) === null || _g === void 0 ? void 0 : _g.export) === null || _h === void 0 ? void 0 : _h.exporter,
            (_m = (_l = (_k = (_j = policy === null || policy === void 0 ? void 0 : policy.connections) === null || _j === void 0 ? void 0 : _j.quickbooksOnline) === null || _k === void 0 ? void 0 : _k.config) === null || _l === void 0 ? void 0 : _l.export) === null || _m === void 0 ? void 0 : _m.exporter,
            (_r = (_q = (_p = (_o = policy === null || policy === void 0 ? void 0 : policy.connections) === null || _o === void 0 ? void 0 : _o.xero) === null || _p === void 0 ? void 0 : _p.config) === null || _q === void 0 ? void 0 : _q.export) === null || _r === void 0 ? void 0 : _r.exporter,
            (_t = (_s = policy === null || policy === void 0 ? void 0 : policy.connections) === null || _s === void 0 ? void 0 : _s.netsuite) === null || _t === void 0 ? void 0 : _t.options.config.exporter,
        ];
        var policyOwnerDisplayName = (_w = (_v = personalDetails === null || personalDetails === void 0 ? void 0 : personalDetails[(_u = policy === null || policy === void 0 ? void 0 : policy.ownerAccountID) !== null && _u !== void 0 ? _u : CONST_1.default.DEFAULT_NUMBER_ID]) === null || _v === void 0 ? void 0 : _v.displayName) !== null && _w !== void 0 ? _w : '';
        var technicalContact = policy === null || policy === void 0 ? void 0 : policy.technicalContact;
        var isCurrentUserReimburser = ((_x = policy === null || policy === void 0 ? void 0 : policy.achAccount) === null || _x === void 0 ? void 0 : _x.reimburser) === (session === null || session === void 0 ? void 0 : session.email);
        var userEmail = (_y = session === null || session === void 0 ? void 0 : session.email) !== null && _y !== void 0 ? _y : '';
        var isApprover = (0, Member_1.isApprover)(policy, userEmail);
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
        if ((0, PolicyUtils_1.isPolicyAdmin)(policy)) {
            return translate('common.leaveWorkspaceConfirmationAdmin');
        }
        if ((0, PolicyUtils_1.isPolicyAuditor)(policy)) {
            return translate('common.leaveWorkspaceConfirmationAuditor');
        }
        return translate('common.leaveWorkspaceConfirmation');
    };
    var renderDropdownMenu = function (options) { return (<react_native_1.View style={[!shouldUseNarrowLayout && styles.flexRow, !shouldUseNarrowLayout && styles.gap2]}>
            <ButtonWithDropdownMenu_1.default ref={dropdownMenuRef} success={false} onPress={function () { }} shouldAlwaysShowDropdownMenu customText={translate('common.more')} options={options} isSplitButton={false} wrapperStyle={styles.flexGrow1}/>
        </react_native_1.View>); };
    var getHeaderButtons = function () {
        var _a, _b, _c;
        var secondaryActions = [];
        var canLeave = !isOwner;
        if (readOnly) {
            if (canLeave) {
                secondaryActions.push({
                    value: 'leave',
                    text: translate('common.leave'),
                    icon: Expensicons.Exit,
                    onSelected: function () { return (0, Modal_1.close)(handleLeave); },
                });
                return renderDropdownMenu(secondaryActions);
            }
            return null;
        }
        if (isPolicyAdmin) {
            secondaryActions.push({
                value: 'invite',
                text: translate('common.invite'),
                icon: expensifyIcons.UserPlus,
                onSelected: function () {
                    if (isAccountLocked) {
                        showLockedAccountModal();
                        return;
                    }
                    (0, Member_1.clearInviteDraft)(route.params.policyID);
                    Navigation_1.default.navigate(ROUTES_1.default.WORKSPACE_INVITE.getRoute(route.params.policyID, Navigation_1.default.getActiveRouteWithoutParams()));
                },
            });
        }
        secondaryActions.push({
            value: 'share',
            text: translate('common.share'),
            icon: expensifyIcons.QrCode,
            onSelected: isAccountLocked ? showLockedAccountModal : onPressShare,
        });
        if (isOwner) {
            secondaryActions.push({
                value: 'delete',
                text: translate('common.delete'),
                icon: expensifyIcons.Trashcan,
                onSelected: onDeleteWorkspace,
                disabled: isLoadingBill,
                shouldShowLoadingSpinnerIcon: isLoadingBill,
                shouldCloseModalOnSelect: !(0, SubscriptionUtils_1.shouldCalculateBillNewDot)(account === null || account === void 0 ? void 0 : account.canDowngrade),
            });
        }
        var isCurrentUserAdmin = ((_c = (_a = policy === null || policy === void 0 ? void 0 : policy.employeeList) === null || _a === void 0 ? void 0 : _a[(_b = currentUserPersonalDetails === null || currentUserPersonalDetails === void 0 ? void 0 : currentUserPersonalDetails.login) !== null && _b !== void 0 ? _b : '']) === null || _c === void 0 ? void 0 : _c.role) === CONST_1.default.POLICY.ROLE.ADMIN;
        var isCurrentUserOwner = (policy === null || policy === void 0 ? void 0 : policy.owner) === (currentUserPersonalDetails === null || currentUserPersonalDetails === void 0 ? void 0 : currentUserPersonalDetails.login);
        if (isCurrentUserAdmin && !isCurrentUserOwner && (0, shouldRenderTransferOwnerButton_1.default)(fundList)) {
            secondaryActions.push({
                value: 'transferOwner',
                text: translate('workspace.people.transferOwner'),
                icon: expensifyIcons.Transfer,
                onSelected: startChangeOwnershipFlow,
            });
        }
        if (canLeave) {
            secondaryActions.push({
                value: 'leave',
                text: translate('common.leave'),
                icon: Expensicons.Exit,
                onSelected: function () { return (0, Modal_1.close)(handleLeave); },
            });
        }
        return renderDropdownMenu(secondaryActions);
    };
    return (<WorkspacePageWithSections_1.default headerText={translate('workspace.common.profile')} route={route} 
    // When we create a new workspaces, the policy prop will not be set on the first render. Therefore, we have to delay rendering until it has been set in Onyx.
    shouldShowLoading={policy === undefined} shouldUseScrollView shouldShowOfflineIndicatorInWideScreen shouldShowNonAdmin icon={illustrationIcons.Building} shouldShowNotFoundPage={policy === undefined} onBackButtonPress={handleBackButtonPress} addBottomSafeAreaPadding headerContent={!shouldUseNarrowLayout && getHeaderButtons()}>
            {function (hasVBA) {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o;
            return (<react_native_1.View style={[styles.flex1, styles.mt3, shouldUseNarrowLayout ? styles.workspaceSectionMobile : styles.workspaceSection]}>
                    {shouldUseNarrowLayout && <react_native_1.View style={[styles.pl5, styles.pr5, styles.pb5]}>{getHeaderButtons()}</react_native_1.View>}
                    <WorkspaceReceiptPartnersPromotionBanner_1.default policy={policy} readOnly={readOnly}/>
                    <Section_1.default isCentralPane title="">
                        <react_native_1.Image style={react_native_1.StyleSheet.flatten([styles.wAuto, styles.h68, imageStyle])} source={illustrations.WorkspaceProfile} resizeMode="cover"/>
                        <AvatarWithImagePicker_1.default onViewPhotoPress={function () {
                    if (!(policy === null || policy === void 0 ? void 0 : policy.id)) {
                        return;
                    }
                    Navigation_1.default.navigate(ROUTES_1.default.WORKSPACE_AVATAR.getRoute(policy.id));
                }} source={(_a = policy === null || policy === void 0 ? void 0 : policy.avatarURL) !== null && _a !== void 0 ? _a : ''} avatarID={policy === null || policy === void 0 ? void 0 : policy.id} size={CONST_1.default.AVATAR_SIZE.X_LARGE} name={policyName} avatarStyle={styles.avatarXLarge} enablePreview DefaultAvatar={DefaultAvatar} type={CONST_1.default.ICON_TYPE_WORKSPACE} fallbackIcon={expensifyIcons.FallbackWorkspaceAvatar} style={[
                    ((_c = (_b = policy === null || policy === void 0 ? void 0 : policy.errorFields) === null || _b === void 0 ? void 0 : _b.avatarURL) !== null && _c !== void 0 ? _c : shouldUseNarrowLayout) ? styles.mb1 : styles.mb3,
                    shouldUseNarrowLayout ? styles.mtn17 : styles.mtn20,
                    styles.alignItemsStart,
                    styles.sectionMenuItemTopDescription,
                ]} editIconStyle={styles.smallEditIconWorkspace} isUsingDefaultAvatar={!(policy === null || policy === void 0 ? void 0 : policy.avatarURL)} onImageSelected={function (file) {
                    if (!(policy === null || policy === void 0 ? void 0 : policy.id)) {
                        return;
                    }
                    (0, Policy_1.updateWorkspaceAvatar)(policy.id, file);
                }} onImageRemoved={function () {
                    if (!(policy === null || policy === void 0 ? void 0 : policy.id)) {
                        return;
                    }
                    (0, Policy_1.deleteWorkspaceAvatar)(policy.id);
                }} editorMaskImage={expensifyIcons.ImageCropSquareMask} pendingAction={(_d = policy === null || policy === void 0 ? void 0 : policy.pendingFields) === null || _d === void 0 ? void 0 : _d.avatarURL} errors={(_e = policy === null || policy === void 0 ? void 0 : policy.errorFields) === null || _e === void 0 ? void 0 : _e.avatarURL} onErrorClose={function () {
                    if (!(policy === null || policy === void 0 ? void 0 : policy.id)) {
                        return;
                    }
                    (0, Policy_1.clearAvatarErrors)(policy.id);
                }} disabled={readOnly} disabledStyle={styles.cursorDefault} errorRowStyles={styles.mt3}/>
                        <OfflineWithFeedback_1.default pendingAction={(_f = policy === null || policy === void 0 ? void 0 : policy.pendingFields) === null || _f === void 0 ? void 0 : _f.name}>
                            <MenuItemWithTopDescription_1.default title={policyName} titleStyle={styles.workspaceTitleStyle} description={translate('workspace.common.workspaceName')} shouldShowRightIcon={!readOnly} interactive={!readOnly} wrapperStyle={[styles.sectionMenuItemTopDescription, shouldUseNarrowLayout ? styles.mt3 : {}]} onPress={onPressName} shouldBreakWord numberOfLinesTitle={0}/>
                        </OfflineWithFeedback_1.default>
                        {(!StringUtils_1.default.isEmptyString((_g = policy === null || policy === void 0 ? void 0 : policy.description) !== null && _g !== void 0 ? _g : '') || !readOnly) && (<OfflineWithFeedback_1.default pendingAction={(_h = policy === null || policy === void 0 ? void 0 : policy.pendingFields) === null || _h === void 0 ? void 0 : _h.description} errors={(0, ErrorUtils_1.getLatestErrorField)(policy !== null && policy !== void 0 ? policy : {}, CONST_1.default.POLICY.COLLECTION_KEYS.DESCRIPTION)} onClose={function () {
                        if (!(policy === null || policy === void 0 ? void 0 : policy.id)) {
                            return;
                        }
                        (0, Policy_1.clearPolicyErrorField)(policy.id, CONST_1.default.POLICY.COLLECTION_KEYS.DESCRIPTION);
                    }}>
                                <MenuItemWithTopDescription_1.default title={policyDescription} description={translate('workspace.editor.descriptionInputLabel')} shouldShowRightIcon={!readOnly} interactive={!readOnly} wrapperStyle={styles.sectionMenuItemTopDescription} onPress={onPressDescription} shouldRenderAsHTML/>
                            </OfflineWithFeedback_1.default>)}
                        <OfflineWithFeedback_1.default pendingAction={(_j = policy === null || policy === void 0 ? void 0 : policy.pendingFields) === null || _j === void 0 ? void 0 : _j.outputCurrency} errors={(0, ErrorUtils_1.getLatestErrorField)(policy !== null && policy !== void 0 ? policy : {}, CONST_1.default.POLICY.COLLECTION_KEYS.GENERAL_SETTINGS)} onClose={function () {
                    if (!(policy === null || policy === void 0 ? void 0 : policy.id)) {
                        return;
                    }
                    (0, Policy_1.clearPolicyErrorField)(policy.id, CONST_1.default.POLICY.COLLECTION_KEYS.GENERAL_SETTINGS);
                }} errorRowStyles={[styles.mt2]}>
                            <react_native_1.View>
                                <MenuItemWithTopDescription_1.default title={formattedCurrency} description={translate('workspace.editor.currencyInputLabel')} shouldShowRightIcon={hasVBA ? false : !currencyReadOnly} interactive={hasVBA ? false : !currencyReadOnly} wrapperStyle={styles.sectionMenuItemTopDescription} onPress={onPressCurrency} hintText={
                // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
                hasVBA || isBankAccountVerified
                    ? translate('workspace.editor.currencyInputDisabledText', { currency: policyCurrency })
                    : translate('workspace.editor.currencyInputHelpText')}/>
                            </react_native_1.View>
                        </OfflineWithFeedback_1.default>
                        {shouldShowAddress && (<OfflineWithFeedback_1.default pendingAction={(_k = policy === null || policy === void 0 ? void 0 : policy.pendingFields) === null || _k === void 0 ? void 0 : _k.address}>
                                <react_native_1.View>
                                    <MenuItemWithTopDescription_1.default title={formattedAddress} description={translate('common.companyAddress')} shouldShowRightIcon={!readOnly} interactive={!readOnly} wrapperStyle={styles.sectionMenuItemTopDescription} onPress={onPressAddress} copyValue={readOnly ? formattedAddress : undefined} copyable={readOnly && !!formattedAddress}/>
                                </react_native_1.View>
                            </OfflineWithFeedback_1.default>)}

                        {!readOnly && !!(policy === null || policy === void 0 ? void 0 : policy.type) && (<OfflineWithFeedback_1.default pendingAction={(_l = policy === null || policy === void 0 ? void 0 : policy.pendingFields) === null || _l === void 0 ? void 0 : _l.type}>
                                <react_native_1.View>
                                    <MenuItemWithTopDescription_1.default title={(0, PolicyUtils_1.getUserFriendlyWorkspaceType)(policy.type, translate)} description={translate('workspace.common.planType')} shouldShowRightIcon wrapperStyle={styles.sectionMenuItemTopDescription} onPress={onPressPlanType}/>
                                </react_native_1.View>
                            </OfflineWithFeedback_1.default>)}
                    </Section_1.default>
                    {isBetaEnabled(CONST_1.default.BETAS.CUSTOM_RULES) ? (<Section_1.default isCentralPane title={translate('workspace.editor.policy')} titleStyles={[styles.textHeadline, styles.cardSectionTitle, styles.accountSettingsSectionTitle, styles.mb0]} subtitle={translate('workspace.rules.customRules.cardSubtitle')} subtitleStyles={[styles.mb6]} subtitleTextStyles={[styles.textNormal, styles.colorMuted, styles.mr5]} containerStyles={shouldUseNarrowLayout ? styles.p5 : styles.p8}>
                            <OfflineWithFeedback_1.default pendingAction={(_m = policy === null || policy === void 0 ? void 0 : policy.pendingFields) === null || _m === void 0 ? void 0 : _m.customRules}>
                                <MenuItemWithTopDescription_1.default title={(_o = policy === null || policy === void 0 ? void 0 : policy.customRules) !== null && _o !== void 0 ? _o : ''} description={translate('workspace.editor.policy')} shouldShowRightIcon={!readOnly} interactive={!readOnly} wrapperStyle={styles.sectionMenuItemTopDescription} onPress={function () { return Navigation_1.default.navigate(ROUTES_1.default.RULES_CUSTOM.getRoute(route.params.policyID)); }} shouldRenderAsHTML/>
                            </OfflineWithFeedback_1.default>
                        </Section_1.default>) : null}
                    <ConfirmModal_1.default title={translate('workspace.common.delete')} isVisible={isDeleteModalOpen} onConfirm={confirmDelete} onCancel={function () { return setIsDeleteModalOpen(false); }} prompt={hasCardFeedOrExpensifyCard ? translate('workspace.common.deleteWithCardsConfirmation') : translate('workspace.common.deleteConfirmation')} confirmText={translate('common.delete')} cancelText={translate('common.cancel')} isConfirmLoading={(0, PolicyUtils_1.isPendingDeletePolicy)(policy)} danger/>
                    <ConfirmModal_1.default title={translate('common.leaveWorkspace')} isVisible={isLeaveModalOpen} onConfirm={handleLeaveWorkspace} onCancel={function () { return setIsLeaveModalOpen(false); }} prompt={confirmModalPrompt()} confirmText={translate('common.leave')} cancelText={translate('common.cancel')} danger/>
                    <ConfirmModal_1.default title={translate('common.leaveWorkspace')} isVisible={isCannotLeaveWorkspaceModalOpen} onConfirm={function () {
                    setIsCannotLeaveWorkspaceModalOpen(false);
                }} prompt={confirmModalPrompt()} confirmText={translate('common.buttonConfirm')} shouldShowCancelButton={false} success/>
                    <ConfirmModal_1.default title={translate('workspace.common.delete')} isVisible={isDeleteWorkspaceErrorModalOpen} onConfirm={hideDeleteWorkspaceErrorModal} onCancel={hideDeleteWorkspaceErrorModal} prompt={policyLastErrorMessage} confirmText={translate('common.buttonConfirm')} shouldShowCancelButton={false} success={false}/>
                </react_native_1.View>);
        }}
        </WorkspacePageWithSections_1.default>);
}
WorkspaceOverviewPage.displayName = 'WorkspaceOverviewPage';
exports.default = (0, withPolicy_1.default)(WorkspaceOverviewPage);
