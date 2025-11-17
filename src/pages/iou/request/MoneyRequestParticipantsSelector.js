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
var Attributes_1 = require("@selectors/Attributes");
var Session_1 = require("@selectors/Session");
var TransactionDraft_1 = require("@selectors/TransactionDraft");
var fast_equals_1 = require("fast-equals");
var pick_1 = require("lodash/pick");
var react_1 = require("react");
var react_native_1 = require("react-native");
var react_native_permissions_1 = require("react-native-permissions");
var Button_1 = require("@components/Button");
var ContactPermissionModal_1 = require("@components/ContactPermissionModal");
var EmptySelectionListContent_1 = require("@components/EmptySelectionListContent");
var FormHelpMessage_1 = require("@components/FormHelpMessage");
var Expensicons_1 = require("@components/Icon/Expensicons");
var MenuItem_1 = require("@components/MenuItem");
var OnyxListItemProvider_1 = require("@components/OnyxListItemProvider");
var ReferralProgramCTA_1 = require("@components/ReferralProgramCTA");
var SelectionListWithSections_1 = require("@components/SelectionListWithSections");
var InviteMemberListItem_1 = require("@components/SelectionListWithSections/InviteMemberListItem");
var useContactImport_1 = require("@hooks/useContactImport");
var useDismissedReferralBanners_1 = require("@hooks/useDismissedReferralBanners");
var useLocalize_1 = require("@hooks/useLocalize");
var useNetwork_1 = require("@hooks/useNetwork");
var useOnyx_1 = require("@hooks/useOnyx");
var usePreferredPolicy_1 = require("@hooks/usePreferredPolicy");
var useScreenWrapperTransitionStatus_1 = require("@hooks/useScreenWrapperTransitionStatus");
var useSearchSelector_1 = require("@hooks/useSearchSelector");
var useThemeStyles_1 = require("@hooks/useThemeStyles");
var DeviceCapabilities_1 = require("@libs/DeviceCapabilities");
var getPlatform_1 = require("@libs/getPlatform");
var goToSettings_1 = require("@libs/goToSettings");
var IOUUtils_1 = require("@libs/IOUUtils");
var Navigation_1 = require("@libs/Navigation/Navigation");
var OptionsListUtils_1 = require("@libs/OptionsListUtils");
var PolicyUtils_1 = require("@libs/PolicyUtils");
var ReportUtils_1 = require("@libs/ReportUtils");
var SubscriptionUtils_1 = require("@libs/SubscriptionUtils");
var Policy_1 = require("@userActions/Policy/Policy");
var Report_1 = require("@userActions/Report");
var CONST_1 = require("@src/CONST");
var ONYXKEYS_1 = require("@src/ONYXKEYS");
var ROUTES_1 = require("@src/ROUTES");
var EmptyObject_1 = require("@src/types/utils/EmptyObject");
var ImportContactButton_1 = require("./ImportContactButton");
var sanitizedSelectedParticipant = function (option, iouType) { return (__assign(__assign({}, (0, pick_1.default)(option, 'accountID', 'login', 'isPolicyExpenseChat', 'reportID', 'searchText', 'policyID', 'isSelfDM', 'text', 'phoneNumber', 'displayName')), { selected: true, iouType: iouType })); };
function MoneyRequestParticipantsSelector(_a) {
    var _b, _c, _d, _e, _f, _g;
    var _h = _a.participants, participants = _h === void 0 ? CONST_1.default.EMPTY_ARRAY : _h, 
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _j = _a.onFinish, 
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onFinish = _j === void 0 ? function (_value) { } : _j, onParticipantsAdded = _a.onParticipantsAdded, iouType = _a.iouType, action = _a.action, _k = _a.isPerDiemRequest, isPerDiemRequest = _k === void 0 ? false : _k, _l = _a.isWorkspacesOnly, isWorkspacesOnly = _l === void 0 ? false : _l, _m = _a.isCorporateCardTransaction, isCorporateCardTransaction = _m === void 0 ? false : _m, ref = _a.ref;
    var translate = (0, useLocalize_1.default)().translate;
    var styles = (0, useThemeStyles_1.default)();
    var _o = (0, useContactImport_1.default)(), contactPermissionState = _o.contactPermissionState, contacts = _o.contacts, setContactPermissionState = _o.setContactPermissionState, importAndSaveContacts = _o.importAndSaveContacts;
    var platform = (0, getPlatform_1.default)();
    var isNative = platform === CONST_1.default.PLATFORM.ANDROID || platform === CONST_1.default.PLATFORM.IOS;
    var referralContentType = CONST_1.default.REFERRAL_PROGRAM.CONTENT_TYPES.SUBMIT_EXPENSE;
    var isOffline = (0, useNetwork_1.default)().isOffline;
    var personalDetails = (0, OnyxListItemProvider_1.usePersonalDetails)();
    var isDismissed = (0, useDismissedReferralBanners_1.default)({ referralContentType: referralContentType }).isDismissed;
    var _p = (0, usePreferredPolicy_1.default)(), isRestrictedToPreferredPolicy = _p.isRestrictedToPreferredPolicy, preferredPolicyID = _p.preferredPolicyID;
    var didScreenTransitionEnd = (0, useScreenWrapperTransitionStatus_1.default)().didScreenTransitionEnd;
    var activePolicyID = (0, useOnyx_1.default)(ONYXKEYS_1.default.NVP_ACTIVE_POLICY_ID, { canBeMissing: true })[0];
    var allPolicies = (0, useOnyx_1.default)(ONYXKEYS_1.default.COLLECTION.POLICY, { canBeMissing: true })[0];
    var policy = allPolicies === null || allPolicies === void 0 ? void 0 : allPolicies["".concat(ONYXKEYS_1.default.COLLECTION.POLICY).concat(activePolicyID)];
    var isSearchingForReports = (0, useOnyx_1.default)(ONYXKEYS_1.default.IS_SEARCHING_FOR_REPORTS, { canBeMissing: true, initWithStoredValues: false })[0];
    var currentUserLogin = (0, useOnyx_1.default)(ONYXKEYS_1.default.SESSION, { canBeMissing: true, selector: Session_1.emailSelector })[0];
    var reportAttributesDerived = (0, useOnyx_1.default)(ONYXKEYS_1.default.DERIVED.REPORT_ATTRIBUTES, { canBeMissing: true, selector: Attributes_1.default })[0];
    var _q = (0, useOnyx_1.default)(ONYXKEYS_1.default.COUNTRY_CODE, { canBeMissing: false })[0], countryCode = _q === void 0 ? CONST_1.default.DEFAULT_COUNTRY_CODE : _q;
    var _r = (0, react_1.useState)(!isNative), textInputAutoFocus = _r[0], setTextInputAutoFocus = _r[1];
    var selectionListRef = (0, react_1.useRef)(null);
    var offlineMessage = isOffline ? "".concat(translate('common.youAppearToBeOffline'), " ").concat(translate('search.resultsAreLimited')) : '';
    var isPaidGroupPolicy = (0, react_1.useMemo)(function () { return (0, PolicyUtils_1.isPaidGroupPolicy)(policy); }, [policy]);
    var activeAdminWorkspaces = (0, react_1.useMemo)(function () { return (0, PolicyUtils_1.getActiveAdminWorkspaces)(allPolicies, currentUserLogin); }, [allPolicies, currentUserLogin]);
    var isIOUSplit = iouType === CONST_1.default.IOU.TYPE.SPLIT;
    var isCategorizeOrShareAction = [CONST_1.default.IOU.ACTION.CATEGORIZE, CONST_1.default.IOU.ACTION.SHARE].some(function (option) { return option === action; });
    var tryNewDot = (0, useOnyx_1.default)(ONYXKEYS_1.default.NVP_TRY_NEW_DOT, { canBeMissing: true })[0];
    var hasBeenAddedToNudgeMigration = !!((_b = tryNewDot === null || tryNewDot === void 0 ? void 0 : tryNewDot.nudgeMigration) === null || _b === void 0 ? void 0 : _b.timestamp);
    var optimisticTransactions = (0, useOnyx_1.default)(ONYXKEYS_1.default.COLLECTION.TRANSACTION_DRAFT, {
        selector: TransactionDraft_1.transactionDraftValuesSelector,
        canBeMissing: true,
    })[0];
    // This is necessary to prevent showing the Manager McTest when there are multiple transactions being created
    var hasMultipleTransactions = (optimisticTransactions !== null && optimisticTransactions !== void 0 ? optimisticTransactions : []).length > 1;
    var canShowManagerMcTest = (0, react_1.useMemo)(function () { return !hasBeenAddedToNudgeMigration && action !== CONST_1.default.IOU.ACTION.SUBMIT; }, [hasBeenAddedToNudgeMigration, action]) && !hasMultipleTransactions;
    /**
     * Adds a single participant to the expense
     *
     * @param {Object} option
     */
    var addSingleParticipant = (0, react_1.useCallback)(function (option) {
        var _a;
        var newParticipants = [sanitizedSelectedParticipant(option, iouType)];
        if (iouType === CONST_1.default.IOU.TYPE.INVOICE) {
            var policyID = option.item && (0, ReportUtils_1.isInvoiceRoom)(option.item) ? option.policyID : (_a = (0, Policy_1.getInvoicePrimaryWorkspace)(policy, activeAdminWorkspaces)) === null || _a === void 0 ? void 0 : _a.id;
            newParticipants.push({
                policyID: policyID,
                isSender: true,
                selected: false,
                iouType: iouType,
            });
        }
        onParticipantsAdded(newParticipants);
        if (!option.isSelfDM) {
            onFinish();
        }
    }, 
    // eslint-disable-next-line react-compiler/react-compiler, react-hooks/exhaustive-deps -- we don't want to trigger this callback when iouType changes
    [onFinish, onParticipantsAdded, policy, activeAdminWorkspaces]);
    var getValidOptionsConfig = (0, react_1.useMemo)(function () { return ({
        selectedOptions: participants,
        excludeLogins: CONST_1.default.EXPENSIFY_EMAILS_OBJECT,
        includeOwnedWorkspaceChats: iouType === CONST_1.default.IOU.TYPE.SUBMIT || iouType === CONST_1.default.IOU.TYPE.CREATE || iouType === CONST_1.default.IOU.TYPE.SPLIT,
        excludeNonAdminWorkspaces: action === CONST_1.default.IOU.ACTION.SHARE,
        includeP2P: !isCategorizeOrShareAction && !isPerDiemRequest && !isCorporateCardTransaction,
        includeInvoiceRooms: iouType === CONST_1.default.IOU.TYPE.INVOICE,
        action: action,
        shouldSeparateSelfDMChat: iouType !== CONST_1.default.IOU.TYPE.INVOICE,
        shouldSeparateWorkspaceChat: true,
        includeSelfDM: !(0, IOUUtils_1.isMovingTransactionFromTrackExpense)(action) && iouType !== CONST_1.default.IOU.TYPE.INVOICE,
        canShowManagerMcTest: canShowManagerMcTest,
        isPerDiemRequest: isPerDiemRequest,
        showRBR: false,
        preferPolicyExpenseChat: isPaidGroupPolicy,
        preferRecentExpenseReports: action === CONST_1.default.IOU.ACTION.CREATE,
        isRestrictedToPreferredPolicy: isRestrictedToPreferredPolicy,
        preferredPolicyID: preferredPolicyID,
    }); }, [
        participants,
        iouType,
        action,
        isCategorizeOrShareAction,
        isPerDiemRequest,
        isCorporateCardTransaction,
        canShowManagerMcTest,
        isPaidGroupPolicy,
        isRestrictedToPreferredPolicy,
        preferredPolicyID,
    ]);
    var handleSelectionChange = (0, react_1.useCallback)(function (options) {
        if (!isIOUSplit) {
            return;
        }
        var sanitizedParticipants = options.map(function (option) { return sanitizedSelectedParticipant(option, iouType); });
        onParticipantsAdded(sanitizedParticipants);
    }, [isIOUSplit, iouType, onParticipantsAdded]);
    var _s = (0, useSearchSelector_1.default)({
        selectionMode: isIOUSplit ? CONST_1.default.SEARCH_SELECTOR.SELECTION_MODE_MULTI : CONST_1.default.SEARCH_SELECTOR.SELECTION_MODE_SINGLE,
        searchContext: CONST_1.default.SEARCH_SELECTOR.SEARCH_CONTEXT_GENERAL,
        includeUserToInvite: !isCategorizeOrShareAction && !isPerDiemRequest,
        excludeLogins: CONST_1.default.EXPENSIFY_EMAILS_OBJECT,
        includeRecentReports: true,
        maxRecentReportsToShow: CONST_1.default.IOU.MAX_RECENT_REPORTS_TO_SHOW,
        getValidOptionsConfig: getValidOptionsConfig,
        shouldInitialize: didScreenTransitionEnd,
        enablePhoneContacts: isNative,
        contactOptions: contacts,
        initialSelected: participants,
        onSelectionChange: handleSelectionChange,
        onSingleSelect: function (option) {
            if (isIOUSplit) {
                return;
            }
            addSingleParticipant(option);
        },
    }), searchTerm = _s.searchTerm, setSearchTerm = _s.setSearchTerm, availableOptions = _s.availableOptions, selectedOptions = _s.selectedOptions, toggleSelection = _s.toggleSelection, areOptionsInitialized = _s.areOptionsInitialized, onListEndReached = _s.onListEndReached, contactState = _s.contactState;
    var cleanSearchTerm = (0, react_1.useMemo)(function () { return searchTerm.trim().toLowerCase(); }, [searchTerm]);
    (0, react_1.useEffect)(function () {
        (0, Report_1.searchInServer)(searchTerm.trim());
    }, [searchTerm]);
    var inputHelperText = (0, react_1.useMemo)(function () {
        var _a, _b, _c;
        return (0, OptionsListUtils_1.getHeaderMessage)(((_a = availableOptions.personalDetails) !== null && _a !== void 0 ? _a : []).length + ((_b = availableOptions.recentReports) !== null && _b !== void 0 ? _b : []).length + ((_c = availableOptions.workspaceChats) !== null && _c !== void 0 ? _c : []).length !== 0 ||
            !(0, EmptyObject_1.isEmptyObject)(availableOptions.selfDMChat), !!(availableOptions === null || availableOptions === void 0 ? void 0 : availableOptions.userToInvite), searchTerm.trim(), countryCode, participants.some(function (participant) { return (0, OptionsListUtils_1.getPersonalDetailSearchTerms)(participant).join(' ').toLowerCase().includes(cleanSearchTerm); }));
    }, 
    // eslint-disable-next-line react-compiler/react-compiler
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
        (_c = availableOptions.personalDetails) === null || _c === void 0 ? void 0 : _c.length,
        (_d = availableOptions.recentReports) === null || _d === void 0 ? void 0 : _d.length,
        availableOptions.selfDMChat,
        availableOptions === null || availableOptions === void 0 ? void 0 : availableOptions.userToInvite,
        availableOptions.workspaceChats,
        cleanSearchTerm,
        searchTerm,
        participants,
        countryCode,
    ]);
    var showImportContacts = isNative &&
        !isCategorizeOrShareAction &&
        !(contactPermissionState === react_native_permissions_1.RESULTS.GRANTED || contactPermissionState === react_native_permissions_1.RESULTS.LIMITED) &&
        inputHelperText === translate('common.noResultsFound');
    /**
     * Returns the sections needed for the OptionsSelector
     * @returns {Array}
     */
    var _t = (0, react_1.useMemo)(function () {
        var _a, _b, _c, _d, _e, _f;
        var newSections = [];
        if (!areOptionsInitialized || !didScreenTransitionEnd) {
            return [newSections, ''];
        }
        var formatResults = (0, OptionsListUtils_1.formatSectionsFromSearchTerm)(searchTerm, participants.map(function (participant) { return (__assign(__assign({}, participant), { reportID: participant.reportID })); }), [], [], personalDetails, true, undefined, reportAttributesDerived);
        newSections.push(formatResults.section);
        newSections.push({
            title: translate('workspace.common.workspace'),
            data: (_a = availableOptions.workspaceChats) !== null && _a !== void 0 ? _a : [],
            shouldShow: ((_b = availableOptions.workspaceChats) !== null && _b !== void 0 ? _b : []).length > 0,
        });
        newSections.push({
            title: translate('workspace.invoices.paymentMethods.personal'),
            data: availableOptions.selfDMChat ? [availableOptions.selfDMChat] : [],
            shouldShow: !!availableOptions.selfDMChat,
        });
        if (!isWorkspacesOnly) {
            newSections.push({
                title: translate('common.recents'),
                data: isPerDiemRequest ? availableOptions.recentReports.filter(function (report) { return report.isPolicyExpenseChat; }) : availableOptions.recentReports,
                shouldShow: (isPerDiemRequest ? availableOptions.recentReports.filter(function (report) { return report.isPolicyExpenseChat; }) : availableOptions.recentReports).length > 0,
            });
            newSections.push({
                title: translate('common.contacts'),
                data: availableOptions.personalDetails,
                shouldShow: availableOptions.personalDetails.length > 0 && !isPerDiemRequest,
            });
        }
        if (!isWorkspacesOnly &&
            availableOptions.userToInvite &&
            !(0, OptionsListUtils_1.isCurrentUser)(__assign(__assign({}, availableOptions.userToInvite), { accountID: (_d = (_c = availableOptions.userToInvite) === null || _c === void 0 ? void 0 : _c.accountID) !== null && _d !== void 0 ? _d : CONST_1.default.DEFAULT_NUMBER_ID, status: (_f = (_e = availableOptions.userToInvite) === null || _e === void 0 ? void 0 : _e.status) !== null && _f !== void 0 ? _f : undefined })) &&
            !isPerDiemRequest) {
            newSections.push({
                title: undefined,
                data: [availableOptions.userToInvite].map(function (participant) {
                    var _a;
                    var isPolicyExpenseChat = (_a = participant === null || participant === void 0 ? void 0 : participant.isPolicyExpenseChat) !== null && _a !== void 0 ? _a : false;
                    return isPolicyExpenseChat ? (0, OptionsListUtils_1.getPolicyExpenseReportOption)(participant, reportAttributesDerived) : (0, OptionsListUtils_1.getParticipantsOption)(participant, personalDetails);
                }),
                shouldShow: true,
            });
        }
        var headerMessage = '';
        if (!showImportContacts) {
            headerMessage = inputHelperText;
        }
        return [newSections, headerMessage];
    }, [
        areOptionsInitialized,
        didScreenTransitionEnd,
        searchTerm,
        participants,
        personalDetails,
        reportAttributesDerived,
        translate,
        availableOptions.workspaceChats,
        availableOptions.selfDMChat,
        availableOptions.userToInvite,
        availableOptions.recentReports,
        availableOptions.personalDetails,
        isWorkspacesOnly,
        isPerDiemRequest,
        showImportContacts,
        inputHelperText,
    ]), sections = _t[0], header = _t[1];
    /**
     * Removes a selected option from list if already selected. If not already selected add this option to the list.
     * @param {Object} option
     */
    var addParticipantToSelection = (0, react_1.useCallback)(function (option) {
        toggleSelection(option);
    }, [toggleSelection]);
    // Right now you can't split a request with a workspace and other additional participants
    // This is getting properly fixed in https://github.com/Expensify/App/issues/27508, but as a stop-gap to prevent
    // the app from crashing on native when you try to do this, we'll going to hide the button if you have a workspace and other participants
    var hasPolicyExpenseChatParticipant = selectedOptions.some(function (participant) { return participant.isPolicyExpenseChat; });
    var shouldShowSplitBillErrorMessage = selectedOptions.length > 1 && hasPolicyExpenseChatParticipant;
    var isAllowedToSplit = ![CONST_1.default.IOU.TYPE.PAY, CONST_1.default.IOU.TYPE.TRACK, CONST_1.default.IOU.TYPE.INVOICE].some(function (option) { return option === iouType; }) &&
        ![CONST_1.default.IOU.ACTION.SHARE, CONST_1.default.IOU.ACTION.SUBMIT, CONST_1.default.IOU.ACTION.CATEGORIZE].some(function (option) { return option === action; });
    var handleConfirmSelection = (0, react_1.useCallback)(function (keyEvent, option) {
        var shouldAddSingleParticipant = option && !selectedOptions.length;
        if (shouldShowSplitBillErrorMessage || (!selectedOptions.length && !option)) {
            return;
        }
        if (shouldAddSingleParticipant) {
            addSingleParticipant(option);
            return;
        }
        onFinish(CONST_1.default.IOU.TYPE.SPLIT);
    }, [shouldShowSplitBillErrorMessage, onFinish, addSingleParticipant, selectedOptions]);
    var showLoadingPlaceholder = (0, react_1.useMemo)(function () { return !areOptionsInitialized || !didScreenTransitionEnd; }, [areOptionsInitialized, didScreenTransitionEnd]);
    var optionLength = (0, react_1.useMemo)(function () {
        if (!areOptionsInitialized) {
            return 0;
        }
        var length = 0;
        sections.forEach(function (section) {
            length += section.data.length;
        });
        return length;
    }, [areOptionsInitialized, sections]);
    var shouldShowListEmptyContent = (0, react_1.useMemo)(function () { return optionLength === 0 && !showLoadingPlaceholder; }, [optionLength, showLoadingPlaceholder]);
    var shouldShowReferralBanner = !isDismissed && iouType !== CONST_1.default.IOU.TYPE.INVOICE && !shouldShowListEmptyContent;
    var initiateContactImportAndSetState = (0, react_1.useCallback)(function () {
        setContactPermissionState(react_native_permissions_1.RESULTS.GRANTED);
        // eslint-disable-next-line @typescript-eslint/no-deprecated
        react_native_1.InteractionManager.runAfterInteractions(importAndSaveContacts);
    }, [importAndSaveContacts, setContactPermissionState]);
    var footerContent = (0, react_1.useMemo)(function () {
        if (isDismissed && !shouldShowSplitBillErrorMessage && !selectedOptions.length) {
            return;
        }
        return (<>
                {shouldShowReferralBanner && !isCategorizeOrShareAction && (<ReferralProgramCTA_1.default referralContentType={referralContentType} style={[styles.flexShrink0, !!selectedOptions.length && !shouldShowSplitBillErrorMessage && styles.mb5]}/>)}

                {shouldShowSplitBillErrorMessage && (<FormHelpMessage_1.default style={[styles.ph1, styles.mb2]} isError message={translate('iou.error.splitExpenseMultipleParticipantsErrorMessage')}/>)}

                {!!selectedOptions.length && !isCategorizeOrShareAction && (<Button_1.default success text={translate('common.next')} onPress={handleConfirmSelection} pressOnEnter large isDisabled={shouldShowSplitBillErrorMessage}/>)}
                {isCategorizeOrShareAction && (<Button_1.default success text={translate('workspace.new.newWorkspace')} onPress={function () { return onFinish(); }} pressOnEnter large/>)}
            </>);
    }, [
        handleConfirmSelection,
        selectedOptions.length,
        isDismissed,
        referralContentType,
        shouldShowSplitBillErrorMessage,
        styles,
        translate,
        shouldShowReferralBanner,
        isCategorizeOrShareAction,
        onFinish,
    ]);
    var onSelectRow = (0, react_1.useCallback)(function (option) {
        if (option.isPolicyExpenseChat && option.policyID && (0, SubscriptionUtils_1.shouldRestrictUserBillableActions)(option.policyID)) {
            Navigation_1.default.navigate(ROUTES_1.default.RESTRICTED_ACTION.getRoute(option.policyID));
            return;
        }
        if (isIOUSplit) {
            addParticipantToSelection(option);
            return;
        }
        addSingleParticipant(option);
    }, [isIOUSplit, addParticipantToSelection, addSingleParticipant]);
    var footerContentAbovePaginationComponent = (0, react_1.useMemo)(function () {
        var _a;
        var shouldShowImportContactsButton = (_a = contactState === null || contactState === void 0 ? void 0 : contactState.showImportUI) !== null && _a !== void 0 ? _a : showImportContacts;
        if (!shouldShowImportContactsButton) {
            return null;
        }
        return (<MenuItem_1.default title={translate('contact.importContacts')} icon={Expensicons_1.UserPlus} onPress={goToSettings_1.default} shouldShowRightIcon style={styles.mb3}/>);
    }, [contactState === null || contactState === void 0 ? void 0 : contactState.showImportUI, showImportContacts, styles.mb3, translate]);
    var ClickableImportContactTextComponent = (0, react_1.useMemo)(function () {
        var _a;
        if (searchTerm.length || isSearchingForReports) {
            return;
        }
        return (<ImportContactButton_1.default showImportContacts={(_a = contactState === null || contactState === void 0 ? void 0 : contactState.showImportUI) !== null && _a !== void 0 ? _a : showImportContacts} inputHelperText={translate('contact.importContactsTitle')} isInSearch={false}/>);
    }, [searchTerm, isSearchingForReports, contactState === null || contactState === void 0 ? void 0 : contactState.showImportUI, showImportContacts, translate]);
    var EmptySelectionListContentWithPermission = (0, react_1.useMemo)(function () {
        return (<>
                {ClickableImportContactTextComponent}
                <EmptySelectionListContent_1.default contentType={iouType}/>
            </>);
    }, [iouType, ClickableImportContactTextComponent]);
    (0, react_1.useImperativeHandle)(ref, function () { return ({
        focus: function () {
            var _a, _b;
            if (!textInputAutoFocus) {
                return;
            }
            (_b = (_a = selectionListRef.current) === null || _a === void 0 ? void 0 : _a.focusTextInput) === null || _b === void 0 ? void 0 : _b.call(_a);
        },
    }); });
    return (<>
            <ContactPermissionModal_1.default onGrant={(_e = contactState === null || contactState === void 0 ? void 0 : contactState.importContacts) !== null && _e !== void 0 ? _e : initiateContactImportAndSetState} onDeny={(_f = contactState === null || contactState === void 0 ? void 0 : contactState.setContactPermissionState) !== null && _f !== void 0 ? _f : setContactPermissionState} onFocusTextInput={function () {
            setTextInputAutoFocus(true);
        }}/>
            <SelectionListWithSections_1.default onConfirm={handleConfirmSelection} sections={areOptionsInitialized ? sections : CONST_1.default.EMPTY_ARRAY} ListItem={InviteMemberListItem_1.default} textInputValue={searchTerm} textInputLabel={translate('selectionList.nameEmailOrPhoneNumber')} textInputHint={offlineMessage} onChangeText={setSearchTerm} shouldPreventDefaultFocusOnSelectRow={!(0, DeviceCapabilities_1.canUseTouchScreen)()} onSelectRow={onSelectRow} shouldSingleExecuteRowSelect canShowProductTrainingTooltip={canShowManagerMcTest} headerContent={<ImportContactButton_1.default showImportContacts={(_g = contactState === null || contactState === void 0 ? void 0 : contactState.showImportUI) !== null && _g !== void 0 ? _g : showImportContacts} inputHelperText={inputHelperText} isInSearch/>} footerContent={footerContent} listEmptyContent={EmptySelectionListContentWithPermission} footerContentAbovePagination={footerContentAbovePaginationComponent} headerMessage={header} showLoadingPlaceholder={showLoadingPlaceholder} canSelectMultiple={isIOUSplit && isAllowedToSplit} isLoadingNewOptions={!!isSearchingForReports} shouldShowListEmptyContent={shouldShowListEmptyContent} textInputAutoFocus={textInputAutoFocus} ref={selectionListRef} onEndReached={onListEndReached}/>
        </>);
}
MoneyRequestParticipantsSelector.displayName = 'MoneyRequestParticipantsSelector';
exports.default = (0, react_1.memo)(MoneyRequestParticipantsSelector, function (prevProps, nextProps) {
    return (0, fast_equals_1.deepEqual)(prevProps.participants, nextProps.participants) &&
        prevProps.iouType === nextProps.iouType &&
        prevProps.isWorkspacesOnly === nextProps.isWorkspacesOnly &&
        prevProps.onParticipantsAdded === nextProps.onParticipantsAdded &&
        prevProps.onFinish === nextProps.onFinish;
});
