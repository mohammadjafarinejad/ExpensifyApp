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
var Onboarding_1 = require("@selectors/Onboarding");
var Session_1 = require("@selectors/Session");
var react_1 = require("react");
var react_native_1 = require("react-native");
var BookTravelButton_1 = require("@components/BookTravelButton");
var ConfirmModal_1 = require("@components/ConfirmModal");
var EmptyStateComponent_1 = require("@components/EmptyStateComponent");
var Illustrations_1 = require("@components/Icon/Illustrations");
var LottieAnimations_1 = require("@components/LottieAnimations");
var MenuItem_1 = require("@components/MenuItem");
var PressableWithSecondaryInteraction_1 = require("@components/PressableWithSecondaryInteraction");
var ScrollView_1 = require("@components/ScrollView");
var SearchScopeProvider_1 = require("@components/Search/SearchScopeProvider");
var SearchRowSkeleton_1 = require("@components/Skeletons/SearchRowSkeleton");
var Text_1 = require("@components/Text");
var TextLink_1 = require("@components/TextLink");
var useCreateEmptyReportConfirmation_1 = require("@hooks/useCreateEmptyReportConfirmation");
var useCurrentUserPersonalDetails_1 = require("@hooks/useCurrentUserPersonalDetails");
var useIsPaidPolicyAdmin_1 = require("@hooks/useIsPaidPolicyAdmin");
var useLocalize_1 = require("@hooks/useLocalize");
var useOnyx_1 = require("@hooks/useOnyx");
var usePermissions_1 = require("@hooks/usePermissions");
var useSearchTypeMenuSections_1 = require("@hooks/useSearchTypeMenuSections");
var useStyleUtils_1 = require("@hooks/useStyleUtils");
var useTheme_1 = require("@hooks/useTheme");
var useThemeStyles_1 = require("@hooks/useThemeStyles");
var IOU_1 = require("@libs/actions/IOU");
var Link_1 = require("@libs/actions/Link");
var Report_1 = require("@libs/actions/Report");
var Tour_1 = require("@libs/actions/Tour");
var interceptAnonymousUser_1 = require("@libs/interceptAnonymousUser");
var Navigation_1 = require("@libs/Navigation/Navigation");
var PolicyUtils_1 = require("@libs/PolicyUtils");
var ReportUtils_1 = require("@libs/ReportUtils");
var SubscriptionUtils_1 = require("@libs/SubscriptionUtils");
var ReportActionContextMenu_1 = require("@pages/home/report/ContextMenu/ReportActionContextMenu");
var variables_1 = require("@styles/variables");
var CONST_1 = require("@src/CONST");
var ONYXKEYS_1 = require("@src/ONYXKEYS");
var ROUTES_1 = require("@src/ROUTES");
var getEmptyArray_1 = require("@src/types/utils/getEmptyArray");
var tripsFeatures = [
    {
        icon: Illustrations_1.PiggyBank,
        translationKey: 'travel.features.saveMoney',
    },
    {
        icon: Illustrations_1.Alert,
        translationKey: 'travel.features.alerts',
    },
];
function EmptySearchView(_a) {
    var similarSearchHash = _a.similarSearchHash, type = _a.type, hasResults = _a.hasResults;
    var currentUserPersonalDetails = (0, useCurrentUserPersonalDetails_1.default)();
    var _b = (0, useSearchTypeMenuSections_1.default)(), typeMenuSections = _b.typeMenuSections, SearchMenuCreateReportConfirmationModal = _b.CreateReportConfirmationModal;
    var allPolicies = (0, useOnyx_1.default)(ONYXKEYS_1.default.COLLECTION.POLICY, { canBeMissing: false })[0];
    var activePolicyID = (0, useOnyx_1.default)(ONYXKEYS_1.default.NVP_ACTIVE_POLICY_ID, { canBeMissing: true })[0];
    var activePolicy = (0, useOnyx_1.default)("".concat(ONYXKEYS_1.default.COLLECTION.POLICY).concat(activePolicyID), { canBeMissing: true })[0];
    var groupPoliciesWithChatEnabled = (0, react_1.useMemo)(function () { return (0, PolicyUtils_1.getGroupPaidPoliciesWithExpenseChatEnabled)(allPolicies); }, [allPolicies]);
    var introSelected = (0, useOnyx_1.default)(ONYXKEYS_1.default.NVP_INTRO_SELECTED, { canBeMissing: true })[0];
    var _c = (0, useOnyx_1.default)(ONYXKEYS_1.default.NVP_ONBOARDING, {
        selector: Onboarding_1.hasSeenTourSelector,
        canBeMissing: true,
    })[0], hasSeenTour = _c === void 0 ? false : _c;
    var isUserPaidPolicyMember = (0, useIsPaidPolicyAdmin_1.default)();
    return (<SearchScopeProvider_1.SearchScopeProvider>
            <EmptySearchViewContent similarSearchHash={similarSearchHash} type={type} hasResults={hasResults} currentUserPersonalDetails={currentUserPersonalDetails} typeMenuSections={typeMenuSections} allPolicies={allPolicies} isUserPaidPolicyMember={isUserPaidPolicyMember} activePolicy={activePolicy} groupPoliciesWithChatEnabled={groupPoliciesWithChatEnabled} introSelected={introSelected} hasSeenTour={hasSeenTour} searchMenuCreateReportConfirmationModal={SearchMenuCreateReportConfirmationModal}/>
        </SearchScopeProvider_1.SearchScopeProvider>);
}
var hasTransactionsSelector = function (transactions) {
    return Object.values(transactions !== null && transactions !== void 0 ? transactions : {}).filter(function (transaction) { return (transaction === null || transaction === void 0 ? void 0 : transaction.pendingAction) !== CONST_1.default.RED_BRICK_ROAD_PENDING_ACTION.DELETE; }).length > 0;
};
var hasExpenseReportsSelector = function (reports) {
    return Object.values(reports !== null && reports !== void 0 ? reports : {}).filter(function (report) { return (report === null || report === void 0 ? void 0 : report.type) === CONST_1.default.SEARCH.DATA_TYPES.EXPENSE_REPORT && (report === null || report === void 0 ? void 0 : report.pendingAction) !== CONST_1.default.RED_BRICK_ROAD_PENDING_ACTION.DELETE; }).length >
        0;
};
function EmptySearchViewContent(_a) {
    var _b;
    var similarSearchHash = _a.similarSearchHash, type = _a.type, hasResults = _a.hasResults, currentUserPersonalDetails = _a.currentUserPersonalDetails, typeMenuSections = _a.typeMenuSections, allPolicies = _a.allPolicies, isUserPaidPolicyMember = _a.isUserPaidPolicyMember, activePolicy = _a.activePolicy, groupPoliciesWithChatEnabled = _a.groupPoliciesWithChatEnabled, introSelected = _a.introSelected, hasSeenTour = _a.hasSeenTour, searchMenuCreateReportConfirmationModal = _a.searchMenuCreateReportConfirmationModal;
    var theme = (0, useTheme_1.default)();
    var StyleUtils = (0, useStyleUtils_1.default)();
    var translate = (0, useLocalize_1.default)().translate;
    var styles = (0, useThemeStyles_1.default)();
    var _c = (0, react_1.useState)(null), contextMenuAnchor = _c[0], setContextMenuAnchor = _c[1];
    var handleContextMenuAnchorRef = (0, react_1.useCallback)(function (node) {
        setContextMenuAnchor(node);
    }, []);
    var _d = (0, react_1.useState)(false), modalVisible = _d[0], setModalVisible = _d[1];
    var transactionViolations = (0, useOnyx_1.default)(ONYXKEYS_1.default.COLLECTION.TRANSACTION_VIOLATIONS, { canBeMissing: true })[0];
    var isBetaEnabled = (0, usePermissions_1.default)().isBetaEnabled;
    var isASAPSubmitBetaEnabled = isBetaEnabled(CONST_1.default.BETAS.ASAP_SUBMIT);
    var hasViolations = (0, ReportUtils_1.hasViolations)(undefined, transactionViolations);
    var hasTransactions = (0, useOnyx_1.default)(ONYXKEYS_1.default.COLLECTION.TRANSACTION, {
        canBeMissing: true,
        selector: hasTransactionsSelector,
    })[0];
    var hasExpenseReports = (0, useOnyx_1.default)(ONYXKEYS_1.default.COLLECTION.REPORT, {
        canBeMissing: true,
        selector: hasExpenseReportsSelector,
    })[0];
    var tryNewDot = (0, useOnyx_1.default)(ONYXKEYS_1.default.NVP_TRY_NEW_DOT, { selector: Onboarding_1.tryNewDotOnyxSelector, canBeMissing: true })[0];
    var shouldRedirectToExpensifyClassic = (0, react_1.useMemo)(function () {
        return (0, PolicyUtils_1.areAllGroupPoliciesExpenseChatDisabled)(allPolicies !== null && allPolicies !== void 0 ? allPolicies : {});
    }, [allPolicies]);
    var defaultChatEnabledPolicy = (0, react_1.useMemo)(function () { return (0, PolicyUtils_1.getDefaultChatEnabledPolicy)(groupPoliciesWithChatEnabled, activePolicy); }, [activePolicy, groupPoliciesWithChatEnabled]);
    var defaultChatEnabledPolicyID = defaultChatEnabledPolicy === null || defaultChatEnabledPolicy === void 0 ? void 0 : defaultChatEnabledPolicy.id;
    var accountID = (0, useOnyx_1.default)(ONYXKEYS_1.default.SESSION, { selector: Session_1.accountIDSelector, canBeMissing: true })[0];
    var _e = (0, useOnyx_1.default)(ONYXKEYS_1.default.COLLECTION.REPORT, {
        canBeMissing: true,
        selector: ReportUtils_1.reportSummariesOnyxSelector,
    })[0], reportSummaries = _e === void 0 ? (0, getEmptyArray_1.default)() : _e;
    var hasEmptyReport = (0, react_1.useMemo)(function () { return (0, ReportUtils_1.hasEmptyReportsForPolicy)(reportSummaries, defaultChatEnabledPolicyID, accountID); }, [accountID, defaultChatEnabledPolicyID, reportSummaries]);
    var handleCreateWorkspaceReport = (0, react_1.useCallback)(function () {
        if (!defaultChatEnabledPolicyID) {
            return;
        }
        var createdReportID = (0, Report_1.createNewReport)(currentUserPersonalDetails, hasViolations, isASAPSubmitBetaEnabled, defaultChatEnabledPolicyID).reportID;
        Navigation_1.default.setNavigationActionToMicrotaskQueue(function () {
            Navigation_1.default.navigate(ROUTES_1.default.SEARCH_MONEY_REQUEST_REPORT.getRoute({ reportID: createdReportID, backTo: Navigation_1.default.getActiveRoute() }));
        });
    }, [currentUserPersonalDetails, hasViolations, defaultChatEnabledPolicyID, isASAPSubmitBetaEnabled]);
    var _f = (0, useCreateEmptyReportConfirmation_1.default)({
        policyID: defaultChatEnabledPolicyID,
        policyName: (_b = defaultChatEnabledPolicy === null || defaultChatEnabledPolicy === void 0 ? void 0 : defaultChatEnabledPolicy.name) !== null && _b !== void 0 ? _b : '',
        onConfirm: handleCreateWorkspaceReport,
    }), openCreateReportFromSearch = _f.openCreateReportConfirmation, CreateReportConfirmationModal = _f.CreateReportConfirmationModal;
    var handleCreateReportClick = (0, react_1.useCallback)(function () {
        if (hasEmptyReport) {
            openCreateReportFromSearch();
        }
        else {
            handleCreateWorkspaceReport();
        }
    }, [hasEmptyReport, handleCreateWorkspaceReport, openCreateReportFromSearch]);
    var typeMenuItems = (0, react_1.useMemo)(function () {
        return typeMenuSections.map(function (section) { return section.menuItems; }).flat();
    }, [typeMenuSections]);
    var tripViewChildren = (0, react_1.useMemo)(function () {
        var onLongPress = function (event) {
            if (!contextMenuAnchor) {
                return;
            }
            (0, ReportActionContextMenu_1.showContextMenu)({
                type: CONST_1.default.CONTEXT_MENU_TYPES.LINK,
                event: event,
                selection: CONST_1.default.BOOK_TRAVEL_DEMO_URL,
                contextMenuAnchor: contextMenuAnchor,
            });
        };
        return (<>
                <Text_1.default style={[styles.textSupporting, styles.textNormal]}>
                    {translate('travel.subtitle')}{' '}
                    <PressableWithSecondaryInteraction_1.default inline onSecondaryInteraction={onLongPress} accessible accessibilityLabel={translate('travel.bookADemo')}>
                        <TextLink_1.default onLongPress={onLongPress} onPress={function () {
                react_native_1.Linking.openURL(CONST_1.default.BOOK_TRAVEL_DEMO_URL);
            }} ref={handleContextMenuAnchorRef}>
                            {translate('travel.bookADemo')}
                        </TextLink_1.default>
                    </PressableWithSecondaryInteraction_1.default>
                    {translate('travel.toLearnMore')}
                </Text_1.default>
                <react_native_1.View style={[styles.flex1, styles.flexRow, styles.flexWrap, styles.rowGap4, styles.pt4, styles.pl1, styles.mb5]}>
                    {tripsFeatures.map(function (tripsFeature) { return (<react_native_1.View key={tripsFeature.translationKey} style={styles.w100}>
                            <MenuItem_1.default title={translate(tripsFeature.translationKey)} icon={tripsFeature.icon} iconWidth={variables_1.default.menuIconSize} iconHeight={variables_1.default.menuIconSize} interactive={false} displayInDefaultIconColor wrapperStyle={[styles.p0, styles.cursorAuto]} containerStyle={[styles.m0, styles.wAuto]} numberOfLinesTitle={0}/>
                        </react_native_1.View>); })}
                </react_native_1.View>
                <SearchScopeProvider_1.SearchScopeProvider isOnSearch={false}>
                    <BookTravelButton_1.default text={translate('search.searchResults.emptyTripResults.buttonText')}/>
                </SearchScopeProvider_1.SearchScopeProvider>
            </>);
    }, [contextMenuAnchor, handleContextMenuAnchorRef, styles, translate]);
    // Default 'Folder' lottie animation, along with its background styles
    var defaultViewItemHeader = (0, react_1.useMemo)(function () { return ({
        headerMedia: LottieAnimations_1.default.GenericEmptyState,
        headerContentStyles: [styles.emptyStateFolderWebStyles, StyleUtils.getBackgroundColorStyle(theme.emptyFolderBG)],
        lottieWebViewStyles: __assign({ backgroundColor: theme.emptyFolderBG }, styles.emptyStateFolderWebStyles),
    }); }, [StyleUtils, styles.emptyStateFolderWebStyles, theme.emptyFolderBG]);
    var content = (0, react_1.useMemo)(function () {
        var _a;
        // Begin by going through all of our To-do searches, and returning their empty state
        // if it exists
        for (var _i = 0, typeMenuItems_1 = typeMenuItems; _i < typeMenuItems_1.length; _i++) {
            var menuItem = typeMenuItems_1[_i];
            if (menuItem.similarSearchHash === similarSearchHash && menuItem.emptyState) {
                return {
                    headerMedia: menuItem.emptyState.headerMedia,
                    title: translate(menuItem.emptyState.title),
                    subtitle: translate(menuItem.emptyState.subtitle),
                    headerStyles: StyleUtils.getBackgroundColorStyle(theme.todoBG),
                    headerContentStyles: [StyleUtils.getWidthAndHeightStyle(375, 240), StyleUtils.getBackgroundColorStyle(theme.todoBG)],
                    lottieWebViewStyles: styles.emptyStateFireworksWebStyles,
                    buttons: (_a = menuItem.emptyState.buttons) === null || _a === void 0 ? void 0 : _a.map(function (button) { return (__assign(__assign({}, button), { buttonText: translate(button.buttonText) })); }),
                };
            }
        }
        var startTestDriveAction = function () {
            var _a;
            (0, Tour_1.startTestDrive)(introSelected, (_a = tryNewDot === null || tryNewDot === void 0 ? void 0 : tryNewDot.hasBeenAddedToNudgeMigration) !== null && _a !== void 0 ? _a : false, isUserPaidPolicyMember);
        };
        // If we didn't match a specific search hash, show a specific message based on the type of the data
        switch (type) {
            case CONST_1.default.SEARCH.DATA_TYPES.TRIP:
                return {
                    headerMedia: LottieAnimations_1.default.TripsEmptyState,
                    headerContentStyles: [styles.emptyStateFolderWebStyles, StyleUtils.getBackgroundColorStyle(theme.travelBG)],
                    title: translate('travel.title'),
                    titleStyles: __assign({}, styles.textAlignLeft),
                    children: tripViewChildren,
                    lottieWebViewStyles: __assign(__assign({ backgroundColor: theme.travelBG }, styles.emptyStateFolderWebStyles), styles.tripEmptyStateLottieWebView),
                };
            case CONST_1.default.SEARCH.DATA_TYPES.EXPENSE_REPORT:
                if (hasResults) {
                    return __assign(__assign({}, defaultViewItemHeader), { title: translate('search.searchResults.emptyResults.title'), subtitle: translate('search.searchResults.emptyResults.subtitle') });
                }
                if (!hasResults || !hasExpenseReports) {
                    return __assign(__assign({}, defaultViewItemHeader), { title: translate('search.searchResults.emptyReportResults.title'), subtitle: translate(hasSeenTour ? 'search.searchResults.emptyReportResults.subtitleWithOnlyCreateButton' : 'search.searchResults.emptyReportResults.subtitle'), buttons: __spreadArray(__spreadArray([], (!hasSeenTour
                            ? [
                                {
                                    buttonText: translate('emptySearchView.takeATestDrive'),
                                    buttonAction: startTestDriveAction,
                                },
                            ]
                            : []), true), (groupPoliciesWithChatEnabled.length > 0
                            ? [
                                {
                                    buttonText: translate('quickAction.createReport'),
                                    buttonAction: function () {
                                        (0, interceptAnonymousUser_1.default)(function () {
                                            var workspaceIDForReportCreation = defaultChatEnabledPolicyID;
                                            if (!workspaceIDForReportCreation ||
                                                ((0, SubscriptionUtils_1.shouldRestrictUserBillableActions)(workspaceIDForReportCreation) && groupPoliciesWithChatEnabled.length > 1)) {
                                                // If we couldn't guess the workspace to create the report, or a guessed workspace is past it's grace period and we have other workspaces to choose from
                                                Navigation_1.default.navigate(ROUTES_1.default.NEW_REPORT_WORKSPACE_SELECTION.getRoute());
                                                return;
                                            }
                                            if (!(0, SubscriptionUtils_1.shouldRestrictUserBillableActions)(workspaceIDForReportCreation)) {
                                                handleCreateReportClick();
                                            }
                                            else {
                                                Navigation_1.default.navigate(ROUTES_1.default.RESTRICTED_ACTION.getRoute(workspaceIDForReportCreation));
                                            }
                                        });
                                    },
                                    success: true,
                                },
                            ]
                            : []), true) });
                }
            // eslint-disable-next-line no-fallthrough
            case CONST_1.default.SEARCH.DATA_TYPES.EXPENSE:
                if (hasResults) {
                    return __assign(__assign({}, defaultViewItemHeader), { title: translate('search.searchResults.emptyResults.title'), subtitle: translate('search.searchResults.emptyResults.subtitle') });
                }
                if (!hasResults || !hasTransactions) {
                    return __assign(__assign({}, defaultViewItemHeader), { title: translate('search.searchResults.emptyExpenseResults.title'), subtitle: translate(hasSeenTour ? 'search.searchResults.emptyExpenseResults.subtitleWithOnlyCreateButton' : 'search.searchResults.emptyExpenseResults.subtitle'), buttons: __spreadArray(__spreadArray([], (!hasSeenTour
                            ? [
                                {
                                    buttonText: translate('emptySearchView.takeATestDrive'),
                                    buttonAction: startTestDriveAction,
                                },
                            ]
                            : []), true), [
                            {
                                buttonText: translate('iou.createExpense'),
                                buttonAction: function () {
                                    return (0, interceptAnonymousUser_1.default)(function () {
                                        if (shouldRedirectToExpensifyClassic) {
                                            setModalVisible(true);
                                            return;
                                        }
                                        (0, IOU_1.startMoneyRequest)(CONST_1.default.IOU.TYPE.CREATE, (0, ReportUtils_1.generateReportID)());
                                    });
                                },
                                success: true,
                            },
                        ], false) });
                }
            // We want to display the default nothing to show message if there is any filter applied.
            // eslint-disable-next-line no-fallthrough
            case CONST_1.default.SEARCH.DATA_TYPES.INVOICE:
                if (!hasResults) {
                    return __assign({ title: translate('search.searchResults.emptyInvoiceResults.title'), subtitle: translate(hasSeenTour ? 'search.searchResults.emptyInvoiceResults.subtitleWithOnlyCreateButton' : 'search.searchResults.emptyInvoiceResults.subtitle'), buttons: __spreadArray(__spreadArray([], (!hasSeenTour
                            ? [
                                {
                                    buttonText: translate('emptySearchView.takeATestDrive'),
                                    buttonAction: startTestDriveAction,
                                },
                            ]
                            : []), true), [
                            {
                                buttonText: translate('workspace.invoices.sendInvoice'),
                                buttonAction: function () {
                                    return (0, interceptAnonymousUser_1.default)(function () {
                                        if (shouldRedirectToExpensifyClassic) {
                                            setModalVisible(true);
                                            return;
                                        }
                                        (0, IOU_1.startMoneyRequest)(CONST_1.default.IOU.TYPE.INVOICE, (0, ReportUtils_1.generateReportID)());
                                    });
                                },
                                success: true,
                            },
                        ], false) }, defaultViewItemHeader);
                }
            // eslint-disable-next-line no-fallthrough
            case CONST_1.default.SEARCH.DATA_TYPES.CHAT:
            default:
                return __assign(__assign({}, defaultViewItemHeader), { title: translate('search.searchResults.emptyResults.title'), subtitle: translate('search.searchResults.emptyResults.subtitle') });
        }
    }, [
        type,
        typeMenuItems,
        similarSearchHash,
        translate,
        StyleUtils,
        theme.todoBG,
        theme.travelBG,
        styles.emptyStateFireworksWebStyles,
        styles.emptyStateFolderWebStyles,
        styles.textAlignLeft,
        styles.tripEmptyStateLottieWebView,
        introSelected,
        tryNewDot === null || tryNewDot === void 0 ? void 0 : tryNewDot.hasBeenAddedToNudgeMigration,
        isUserPaidPolicyMember,
        hasResults,
        defaultViewItemHeader,
        hasSeenTour,
        groupPoliciesWithChatEnabled,
        tripViewChildren,
        hasTransactions,
        shouldRedirectToExpensifyClassic,
        hasExpenseReports,
        defaultChatEnabledPolicyID,
        handleCreateReportClick,
    ]);
    return (<>
            {searchMenuCreateReportConfirmationModal}
            <ScrollView_1.default showsVerticalScrollIndicator={false} contentContainerStyle={[styles.flexGrow1, styles.flexShrink0]}>
                <EmptyStateComponent_1.default SkeletonComponent={SearchRowSkeleton_1.default} headerMediaType={CONST_1.default.EMPTY_STATE_MEDIA.ANIMATION} headerMedia={content.headerMedia} headerStyles={[styles.emptyStateCardIllustrationContainer, styles.overflowHidden, content.headerStyles]} title={content.title} titleStyles={content.titleStyles} subtitle={content.subtitle} buttons={content.buttons} headerContentStyles={__spreadArray([styles.h100, styles.w100], content.headerContentStyles, true)} lottieWebViewStyles={content.lottieWebViewStyles}>
                    {content.children}
                </EmptyStateComponent_1.default>
            </ScrollView_1.default>
            {CreateReportConfirmationModal}
            <ConfirmModal_1.default prompt={translate('sidebarScreen.redirectToExpensifyClassicModal.description')} isVisible={modalVisible} onConfirm={function () {
            setModalVisible(false);
            (0, Link_1.openOldDotLink)(CONST_1.default.OLDDOT_URLS.INBOX);
        }} onCancel={function () { return setModalVisible(false); }} title={translate('sidebarScreen.redirectToExpensifyClassicModal.title')} confirmText={translate('exitSurvey.goToExpensifyClassic')} cancelText={translate('common.cancel')}/>
        </>);
}
EmptySearchView.displayName = 'EmptySearchView';
exports.default = EmptySearchView;
