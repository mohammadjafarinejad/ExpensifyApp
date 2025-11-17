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
var ComposeProviders_1 = require("@components/ComposeProviders");
var DelegateNoAccessModalProvider_1 = require("@components/DelegateNoAccessModalProvider");
var FullscreenLoadingIndicator_1 = require("@components/FullscreenLoadingIndicator");
var InitialURLContextProvider_1 = require("@components/InitialURLContextProvider");
var LockedAccountModalProvider_1 = require("@components/LockedAccountModalProvider");
var OpenAppFailureModal_1 = require("@components/OpenAppFailureModal");
var OptionListContextProvider_1 = require("@components/OptionListContextProvider");
var PriorityModeController_1 = require("@components/PriorityModeController");
var SearchContext_1 = require("@components/Search/SearchContext");
var SearchRouterContext_1 = require("@components/Search/SearchRouter/SearchRouterContext");
var SearchRouterModal_1 = require("@components/Search/SearchRouter/SearchRouterModal");
var SupportalPermissionDeniedModalProvider_1 = require("@components/SupportalPermissionDeniedModalProvider");
var WideRHPContextProvider_1 = require("@components/WideRHPContextProvider");
var useArchivedReportsIdSet_1 = require("@hooks/useArchivedReportsIdSet");
var useAutoUpdateTimezone_1 = require("@hooks/useAutoUpdateTimezone");
var useCurrentUserPersonalDetails_1 = require("@hooks/useCurrentUserPersonalDetails");
var useOnboardingFlow_1 = require("@hooks/useOnboardingFlow");
var useOnyx_1 = require("@hooks/useOnyx");
var useResponsiveLayout_1 = require("@hooks/useResponsiveLayout");
var useSidebarOrderedReports_1 = require("@hooks/useSidebarOrderedReports");
var useStyleUtils_1 = require("@hooks/useStyleUtils");
var useTheme_1 = require("@hooks/useTheme");
var Delegate_1 = require("@libs/actions/Delegate");
var setFullscreenVisibility_1 = require("@libs/actions/setFullscreenVisibility");
var ActiveClientManager_1 = require("@libs/ActiveClientManager");
var types_1 = require("@libs/API/types");
var HttpUtils_1 = require("@libs/HttpUtils");
var KeyboardShortcut_1 = require("@libs/KeyboardShortcut");
var Log_1 = require("@libs/Log");
var NavBarManager_1 = require("@libs/NavBarManager");
var currentUrl_1 = require("@libs/Navigation/currentUrl");
var Navigation_1 = require("@libs/Navigation/Navigation");
var animation_1 = require("@libs/Navigation/PlatformStackNavigation/navigationOptions/animation");
var NetworkConnection_1 = require("@libs/NetworkConnection");
var Pusher_1 = require("@libs/Pusher");
var PusherConnectionManager_1 = require("@libs/PusherConnectionManager");
var ReportUtils_1 = require("@libs/ReportUtils");
var SessionUtils = require("@libs/SessionUtils");
var Url_1 = require("@libs/Url");
var ConnectionCompletePage_1 = require("@pages/ConnectionCompletePage");
var NotFoundPage_1 = require("@pages/ErrorPage/NotFoundPage");
var RequireTwoFactorAuthenticationPage_1 = require("@pages/RequireTwoFactorAuthenticationPage");
var DesktopSignInRedirectPage_1 = require("@pages/signin/DesktopSignInRedirectPage");
var WorkspacesListPage_1 = require("@pages/workspace/WorkspacesListPage");
var App = require("@userActions/App");
var Download = require("@userActions/Download");
var Modal = require("@userActions/Modal");
var Report = require("@userActions/Report");
var Session = require("@userActions/Session");
var User = require("@userActions/User");
var CONFIG_1 = require("@src/CONFIG");
var CONST_1 = require("@src/CONST");
require("@src/libs/subscribeToFullReconnect");
var NAVIGATORS_1 = require("@src/NAVIGATORS");
var ONYXKEYS_1 = require("@src/ONYXKEYS");
var ROUTES_1 = require("@src/ROUTES");
var SCREENS_1 = require("@src/SCREENS");
var attachmentModalScreenOptions_1 = require("./attachmentModalScreenOptions");
var createRootStackNavigator_1 = require("./createRootStackNavigator");
var GetStateForActionHandlers_1 = require("./createRootStackNavigator/GetStateForActionHandlers");
var defaultScreenOptions_1 = require("./defaultScreenOptions");
var ModalStackNavigators_1 = require("./ModalStackNavigators");
var ExplanationModalNavigator_1 = require("./Navigators/ExplanationModalNavigator");
var FeatureTrainingModalNavigator_1 = require("./Navigators/FeatureTrainingModalNavigator");
var MigratedUserWelcomeModalNavigator_1 = require("./Navigators/MigratedUserWelcomeModalNavigator");
var OnboardingModalNavigator_1 = require("./Navigators/OnboardingModalNavigator");
var RightModalNavigator_1 = require("./Navigators/RightModalNavigator");
var TestDriveModalNavigator_1 = require("./Navigators/TestDriveModalNavigator");
var TestToolsModalNavigator_1 = require("./Navigators/TestToolsModalNavigator");
var TestDriveDemoNavigator_1 = require("./TestDriveDemoNavigator");
var useModalCardStyleInterpolator_1 = require("./useModalCardStyleInterpolator");
var useRootNavigatorScreenOptions_1 = require("./useRootNavigatorScreenOptions");
var loadAttachmentModalScreen = function () { return require('../../../pages/media/AttachmentModalScreen').default; };
var loadValidateLoginPage = function () { return require('../../../pages/ValidateLoginPage').default; };
var loadLogOutPreviousUserPage = function () { return require('../../../pages/LogOutPreviousUserPage').default; };
var loadConciergePage = function () { return require('../../../pages/ConciergePage').default; };
var loadTrackExpensePage = function () { return require('../../../pages/TrackExpensePage').default; };
var loadSubmitExpensePage = function () { return require('../../../pages/SubmitExpensePage').default; };
var loadWorkspaceJoinUser = function () { return require('@pages/workspace/WorkspaceJoinUserPage').default; };
var loadReportSplitNavigator = function () { return require('./Navigators/ReportsSplitNavigator').default; };
var loadSettingsSplitNavigator = function () { return require('./Navigators/SettingsSplitNavigator').default; };
var loadWorkspaceSplitNavigator = function () { return require('./Navigators/WorkspaceSplitNavigator').default; };
var loadDomainSplitNavigator = function () { return require('./Navigators/DomainSplitNavigator').default; };
var loadSearchNavigator = function () { return require('./Navigators/SearchFullscreenNavigator').default; };
function initializePusher() {
    return Pusher_1.default.init({
        appKey: CONFIG_1.default.PUSHER.APP_KEY,
        cluster: CONFIG_1.default.PUSHER.CLUSTER,
        authEndpoint: "".concat(CONFIG_1.default.EXPENSIFY.DEFAULT_API_ROOT, "api/AuthenticatePusher?"),
    }).then(function () {
        User.subscribeToUserEvents();
    });
}
var RootStack = (0, createRootStackNavigator_1.default)();
// We want to delay the re-rendering for components(e.g. ReportActionCompose)
// that depends on modal visibility until Modal is completely closed and its focused
// When modal screen is focused, update modal visibility in Onyx
// https://reactnavigation.org/docs/navigation-events/
var modalScreenListeners = {
    focus: function () {
        Modal.setModalVisibility(true, CONST_1.default.MODAL.MODAL_TYPE.RIGHT_DOCKED);
    },
    blur: function () {
        Modal.setModalVisibility(false);
    },
    beforeRemove: function () {
        Modal.setModalVisibility(false);
        Modal.willAlertModalBecomeVisible(false);
    },
};
var fullScreenListeners = {
    focus: function () {
        (0, setFullscreenVisibility_1.default)(true);
    },
    beforeRemove: function () {
        (0, setFullscreenVisibility_1.default)(false);
    },
};
// Extended modal screen listeners with additional cancellation of pending requests
var modalScreenListenersWithCancelSearch = __assign(__assign({}, modalScreenListeners), { beforeRemove: function () {
        modalScreenListeners.beforeRemove();
        HttpUtils_1.default.cancelPendingRequests(types_1.READ_COMMANDS.SEARCH_FOR_REPORTS);
    } });
function AuthScreens() {
    var _a;
    var theme = (0, useTheme_1.default)();
    var StyleUtils = (0, useStyleUtils_1.default)();
    var shouldUseNarrowLayout = (0, useResponsiveLayout_1.default)().shouldUseNarrowLayout;
    var rootNavigatorScreenOptions = (0, useRootNavigatorScreenOptions_1.default)();
    var currentUserPersonalDetails = (0, useCurrentUserPersonalDetails_1.default)();
    var toggleSearch = (0, SearchRouterContext_1.useSearchRouterContext)().toggleSearch;
    var currentUrl = (0, currentUrl_1.default)();
    var delegatorEmail = (0, Url_1.getSearchParamFromUrl)(currentUrl, 'delegatorEmail');
    var credentials = (0, useOnyx_1.default)(ONYXKEYS_1.default.CREDENTIALS, { canBeMissing: true })[0];
    var account = (0, useOnyx_1.default)(ONYXKEYS_1.default.ACCOUNT, {
        canBeMissing: true,
    })[0];
    var _b = (0, useOnboardingFlow_1.default)(), isOnboardingCompleted = _b.isOnboardingCompleted, shouldShowRequire2FAPage = _b.shouldShowRequire2FAPage;
    var _c = (0, react_1.useContext)(InitialURLContextProvider_1.InitialURLContext), initialURL = _c.initialURL, isAuthenticatedAtStartup = _c.isAuthenticatedAtStartup, setIsAuthenticatedAtStartup = _c.setIsAuthenticatedAtStartup;
    var modalCardStyleInterpolator = (0, useModalCardStyleInterpolator_1.default)();
    var archivedReportsIdSet = (0, useArchivedReportsIdSet_1.default)();
    var _d = (0, react_1.useContext)(WideRHPContextProvider_1.WideRHPContext), shouldRenderSecondaryOverlay = _d.shouldRenderSecondaryOverlay, dismissToWideReport = _d.dismissToWideReport;
    // State to track whether the delegator's authentication is completed before displaying data
    var _e = (0, react_1.useState)(false), isDelegatorFromOldDotIsReady = _e[0], setIsDelegatorFromOldDotIsReady = _e[1];
    var session = (0, useOnyx_1.default)(ONYXKEYS_1.default.SESSION, { canBeMissing: true })[0];
    var introSelected = (0, useOnyx_1.default)(ONYXKEYS_1.default.NVP_INTRO_SELECTED, { canBeMissing: true })[0];
    var initialLastUpdateIDAppliedToClient = (0, useOnyx_1.default)(ONYXKEYS_1.default.ONYX_UPDATES_LAST_UPDATE_ID_APPLIED_TO_CLIENT, { canBeMissing: true })[0];
    var modal = (0, useOnyx_1.default)(ONYXKEYS_1.default.MODAL, { canBeMissing: true })[0];
    var activePolicyID = (0, useOnyx_1.default)(ONYXKEYS_1.default.NVP_ACTIVE_POLICY_ID, { canBeMissing: true })[0];
    var lastUpdateIDAppliedToClient = (0, useOnyx_1.default)(ONYXKEYS_1.default.ONYX_UPDATES_LAST_UPDATE_ID_APPLIED_TO_CLIENT, { canBeMissing: true })[0];
    var isLoadingApp = (0, useOnyx_1.default)(ONYXKEYS_1.default.IS_LOADING_APP, { canBeMissing: true })[0];
    var lastUpdateIDAppliedToClientRef = (0, react_1.useRef)(lastUpdateIDAppliedToClient);
    var isLoadingAppRef = (0, react_1.useRef)(isLoadingApp);
    // eslint-disable-next-line react-compiler/react-compiler
    lastUpdateIDAppliedToClientRef.current = lastUpdateIDAppliedToClient;
    // eslint-disable-next-line react-compiler/react-compiler
    isLoadingAppRef.current = isLoadingApp;
    var handleNetworkReconnect = function () {
        if (isLoadingAppRef.current) {
            App.openApp();
        }
        else {
            Log_1.default.info('[handleNetworkReconnect] Sending ReconnectApp');
            App.reconnectApp(lastUpdateIDAppliedToClientRef.current);
        }
    };
    (0, react_1.useEffect)(function () {
        if (!Navigation_1.default.isActiveRoute(ROUTES_1.default.SIGN_IN_MODAL)) {
            return;
        }
        // This means sign in in RHP was successful, so we can subscribe to user events
        initializePusher();
        // eslint-disable-next-line react-compiler/react-compiler, react-hooks/exhaustive-deps
    }, [session]);
    (0, useAutoUpdateTimezone_1.default)();
    (0, react_1.useEffect)(function () {
        NavBarManager_1.default.setButtonStyle(theme.navigationBarButtonsStyle);
        return function () {
            NavBarManager_1.default.setButtonStyle(CONST_1.default.NAVIGATION_BAR_BUTTONS_STYLE.LIGHT);
        };
    }, [theme]);
    (0, react_1.useEffect)(function () {
        var _a;
        var shortcutsOverviewShortcutConfig = CONST_1.default.KEYBOARD_SHORTCUTS.SHORTCUTS;
        var searchShortcutConfig = CONST_1.default.KEYBOARD_SHORTCUTS.SEARCH;
        var chatShortcutConfig = CONST_1.default.KEYBOARD_SHORTCUTS.NEW_CHAT;
        var markAllMessagesAsReadShortcutConfig = CONST_1.default.KEYBOARD_SHORTCUTS.MARK_ALL_MESSAGES_AS_READ;
        var isLoggingInAsNewUser = !!(session === null || session === void 0 ? void 0 : session.email) && SessionUtils.isLoggingInAsNewUser(currentUrl, session.email);
        // Sign out the current user if we're transitioning with a different user
        var isTransitioning = currentUrl.includes(ROUTES_1.default.TRANSITION_BETWEEN_APPS);
        var isSupportalTransition = currentUrl.includes('authTokenType=support');
        if (isLoggingInAsNewUser && isTransitioning) {
            Session.signOutAndRedirectToSignIn(false, isSupportalTransition);
            return;
        }
        NetworkConnection_1.default.listenForReconnect();
        NetworkConnection_1.default.onReconnect(function () { return handleNetworkReconnect(); });
        PusherConnectionManager_1.default.init();
        initializePusher();
        // Sometimes when we transition from old dot to new dot, the client is not the leader
        // so we need to initialize the client again
        if (!(0, ActiveClientManager_1.isClientTheLeader)() && isTransitioning) {
            (0, ActiveClientManager_1.init)();
        }
        // If we are on this screen then we are "logged in", but the user might not have "just logged in". They could be reopening the app
        // or returning from background. If so, we'll assume they have some app data already and we can call reconnectApp() instead of openApp() and connect() for delegator from OldDot.
        if (SessionUtils.didUserLogInDuringSession() || delegatorEmail) {
            if (delegatorEmail) {
                (_a = (0, Delegate_1.connect)({ email: delegatorEmail, delegatedAccess: account === null || account === void 0 ? void 0 : account.delegatedAccess, credentials: credentials, session: session, activePolicyID: activePolicyID, isFromOldDot: true })) === null || _a === void 0 ? void 0 : _a.then(function (success) {
                    App.setAppLoading(!!success);
                }).finally(function () {
                    setIsDelegatorFromOldDotIsReady(true);
                });
            }
            else {
                var reportID = (0, ReportUtils_1.getReportIDFromLink)(initialURL !== null && initialURL !== void 0 ? initialURL : null);
                if (reportID && !isAuthenticatedAtStartup) {
                    Report.openReport(reportID);
                    // Don't want to call `openReport` again when logging out and then logging in
                    setIsAuthenticatedAtStartup(true);
                }
                App.openApp();
            }
        }
        else {
            Log_1.default.info('[AuthScreens] Sending ReconnectApp');
            App.reconnectApp(initialLastUpdateIDAppliedToClient);
        }
        App.setUpPoliciesAndNavigate(session, introSelected);
        App.redirectThirdPartyDesktopSignIn();
        Download.clearDownloads();
        // Listen to keyboard shortcuts for opening certain pages
        var unsubscribeShortcutsOverviewShortcut = KeyboardShortcut_1.default.subscribe(shortcutsOverviewShortcutConfig.shortcutKey, function () {
            Modal.close(function () {
                if (Navigation_1.default.isOnboardingFlow()) {
                    return;
                }
                if (Navigation_1.default.isActiveRoute(ROUTES_1.default.KEYBOARD_SHORTCUTS.getRoute(Navigation_1.default.getActiveRoute()))) {
                    return;
                }
                return Navigation_1.default.navigate(ROUTES_1.default.KEYBOARD_SHORTCUTS.getRoute(Navigation_1.default.getActiveRoute()));
            });
        }, shortcutsOverviewShortcutConfig.descriptionKey, shortcutsOverviewShortcutConfig.modifiers, true);
        // Listen for the key K being pressed so that focus can be given to
        // Search Router, or new group chat
        // based on the key modifiers pressed and the operating system
        var unsubscribeSearchShortcut = KeyboardShortcut_1.default.subscribe(searchShortcutConfig.shortcutKey, function () {
            Session.callFunctionIfActionIsAllowed(function () {
                if (Navigation_1.default.isOnboardingFlow()) {
                    return;
                }
                toggleSearch();
            })();
        }, shortcutsOverviewShortcutConfig.descriptionKey, shortcutsOverviewShortcutConfig.modifiers, true);
        var unsubscribeChatShortcut = KeyboardShortcut_1.default.subscribe(chatShortcutConfig.shortcutKey, function () {
            if (Navigation_1.default.isOnboardingFlow()) {
                return;
            }
            Modal.close(Session.callFunctionIfActionIsAllowed(function () { return Navigation_1.default.navigate(ROUTES_1.default.NEW); }));
        }, chatShortcutConfig.descriptionKey, chatShortcutConfig.modifiers, true);
        var unsubscribeMarkAllMessagesAsReadShortcut = KeyboardShortcut_1.default.subscribe(markAllMessagesAsReadShortcutConfig.shortcutKey, function () { return Report.markAllMessagesAsRead(archivedReportsIdSet); }, markAllMessagesAsReadShortcutConfig.descriptionKey, markAllMessagesAsReadShortcutConfig.modifiers, true);
        return function () {
            unsubscribeShortcutsOverviewShortcut();
            unsubscribeSearchShortcut();
            unsubscribeChatShortcut();
            unsubscribeMarkAllMessagesAsReadShortcut();
            Session.cleanupSession();
        };
        // Rule disabled because this effect is only for component did mount & will component unmount lifecycle event
        // eslint-disable-next-line react-compiler/react-compiler, react-hooks/exhaustive-deps
    }, []);
    (0, react_1.useEffect)(function () {
        var shortcutConfig = CONST_1.default.KEYBOARD_SHORTCUTS.ESCAPE;
        var unsubscribeEscapeKey = KeyboardShortcut_1.default.subscribe(shortcutConfig.shortcutKey, function () {
            if (modal === null || modal === void 0 ? void 0 : modal.willAlertModalBecomeVisible) {
                return;
            }
            if (modal === null || modal === void 0 ? void 0 : modal.disableDismissOnEscape) {
                return;
            }
            if (shouldRenderSecondaryOverlay) {
                dismissToWideReport();
                return;
            }
            Navigation_1.default.dismissModal();
        }, shortcutConfig.descriptionKey, shortcutConfig.modifiers, true, true);
        return function () { return unsubscribeEscapeKey(); };
    }, [dismissToWideReport, modal === null || modal === void 0 ? void 0 : modal.disableDismissOnEscape, modal === null || modal === void 0 ? void 0 : modal.willAlertModalBecomeVisible, shouldRenderSecondaryOverlay]);
    // Animation is disabled when navigating to the sidebar screen
    var getWorkspaceOrDomainSplitNavigatorOptions = function (_a) {
        var route = _a.route;
        // We don't need to do anything special for the wide screen.
        if (!shouldUseNarrowLayout) {
            return rootNavigatorScreenOptions.splitNavigator;
        }
        // On the narrow screen, we want to animate this navigator if it is opened from the settings split.
        // If it is opened from other tab, we don't want to animate it on the entry.
        // There is a hook inside the workspace navigator that changes animation to SLIDE_FROM_RIGHT after entering.
        // This way it can be animated properly when going back to the settings split.
        var animationEnabled = !GetStateForActionHandlers_1.workspaceOrDomainSplitsWithoutEnteringAnimation.has(route.key);
        return __assign(__assign({}, rootNavigatorScreenOptions.splitNavigator), { animation: animationEnabled ? animation_1.default.SLIDE_FROM_RIGHT : animation_1.default.NONE, web: __assign(__assign({}, rootNavigatorScreenOptions.splitNavigator.web), { cardStyleInterpolator: function (props) { return modalCardStyleInterpolator({ props: props, isFullScreenModal: true, animationEnabled: animationEnabled }); } }) });
    };
    // Animation is enabled when navigating to any screen different than split sidebar screen
    var getFullscreenNavigatorOptions = function (_a) {
        var route = _a.route;
        // We don't need to do anything special for the wide screen.
        if (!shouldUseNarrowLayout) {
            return rootNavigatorScreenOptions.splitNavigator;
        }
        // On the narrow screen, we want to animate this navigator if pushed SplitNavigator includes desired screen
        var animationEnabled = GetStateForActionHandlers_1.screensWithEnteringAnimation.has(route.key);
        return __assign(__assign({}, rootNavigatorScreenOptions.splitNavigator), { animation: animationEnabled ? animation_1.default.SLIDE_FROM_RIGHT : animation_1.default.NONE, web: __assign(__assign({}, rootNavigatorScreenOptions.splitNavigator.web), { cardStyleInterpolator: function (props) { return modalCardStyleInterpolator({ props: props, isFullScreenModal: true, animationEnabled: animationEnabled }); } }) });
    };
    var clearStatus = function () {
        User.clearCustomStatus();
        User.clearDraftCustomStatus();
    };
    (0, react_1.useEffect)(function () {
        var _a;
        if (!((_a = currentUserPersonalDetails.status) === null || _a === void 0 ? void 0 : _a.clearAfter)) {
            return;
        }
        var currentTime = new Date();
        var clearAfterTime = new Date(currentUserPersonalDetails.status.clearAfter);
        if (Number.isNaN(clearAfterTime.getTime())) {
            return;
        }
        var subMillisecondsTime = clearAfterTime.getTime() - currentTime.getTime();
        if (subMillisecondsTime > 0) {
            var intervalId_1 = null;
            var timeoutId_1 = null;
            if (subMillisecondsTime > CONST_1.default.LIMIT_TIMEOUT) {
                intervalId_1 = setInterval(function () {
                    var now = new Date();
                    var remainingTime = clearAfterTime.getTime() - now.getTime();
                    if (remainingTime <= 0) {
                        clearStatus();
                        if (intervalId_1) {
                            clearInterval(intervalId_1);
                        }
                    }
                    else if (remainingTime <= CONST_1.default.LIMIT_TIMEOUT) {
                        if (intervalId_1) {
                            clearInterval(intervalId_1);
                        }
                        timeoutId_1 = setTimeout(function () {
                            clearStatus();
                        }, remainingTime);
                    }
                }, CONST_1.default.LIMIT_TIMEOUT);
            }
            else {
                timeoutId_1 = setTimeout(function () {
                    clearStatus();
                }, subMillisecondsTime);
            }
            return function () {
                if (intervalId_1) {
                    clearInterval(intervalId_1);
                }
                if (timeoutId_1) {
                    clearTimeout(timeoutId_1);
                }
            };
        }
        clearStatus();
    }, [(_a = currentUserPersonalDetails.status) === null || _a === void 0 ? void 0 : _a.clearAfter]);
    if (delegatorEmail && !isDelegatorFromOldDotIsReady) {
        return <FullscreenLoadingIndicator_1.default />;
    }
    return (<ComposeProviders_1.default components={[
            OptionListContextProvider_1.default,
            useSidebarOrderedReports_1.SidebarOrderedReportsContextProvider,
            SearchContext_1.SearchContextProvider,
            LockedAccountModalProvider_1.default,
            DelegateNoAccessModalProvider_1.default,
            SupportalPermissionDeniedModalProvider_1.default,
        ]}>
            <RootStack.Navigator persistentScreens={[
            NAVIGATORS_1.default.REPORTS_SPLIT_NAVIGATOR,
            NAVIGATORS_1.default.SETTINGS_SPLIT_NAVIGATOR,
            NAVIGATORS_1.default.WORKSPACE_SPLIT_NAVIGATOR,
            NAVIGATORS_1.default.DOMAIN_SPLIT_NAVIGATOR,
            NAVIGATORS_1.default.SEARCH_FULLSCREEN_NAVIGATOR,
            NAVIGATORS_1.default.RIGHT_MODAL_NAVIGATOR,
            SCREENS_1.default.WORKSPACES_LIST,
            SCREENS_1.default.SEARCH.ROOT,
        ]}>
                {/* This has to be the first navigator in auth screens. */}
                <RootStack.Screen name={NAVIGATORS_1.default.REPORTS_SPLIT_NAVIGATOR} options={getFullscreenNavigatorOptions} getComponent={loadReportSplitNavigator}/>
                <RootStack.Screen name={NAVIGATORS_1.default.SETTINGS_SPLIT_NAVIGATOR} options={getFullscreenNavigatorOptions} getComponent={loadSettingsSplitNavigator}/>
                <RootStack.Screen name={NAVIGATORS_1.default.SEARCH_FULLSCREEN_NAVIGATOR} options={getFullscreenNavigatorOptions} getComponent={loadSearchNavigator}/>
                <RootStack.Screen name={NAVIGATORS_1.default.WORKSPACE_SPLIT_NAVIGATOR} options={getWorkspaceOrDomainSplitNavigatorOptions} getComponent={loadWorkspaceSplitNavigator}/>
                <RootStack.Screen name={NAVIGATORS_1.default.DOMAIN_SPLIT_NAVIGATOR} options={getWorkspaceOrDomainSplitNavigatorOptions} getComponent={loadDomainSplitNavigator}/>
                <RootStack.Screen name={SCREENS_1.default.VALIDATE_LOGIN} options={__assign(__assign({}, rootNavigatorScreenOptions.fullScreen), { headerShown: false, title: 'New Expensify' })} listeners={fullScreenListeners} getComponent={loadValidateLoginPage}/>
                <RootStack.Screen name={SCREENS_1.default.WORKSPACES_LIST} options={rootNavigatorScreenOptions.workspacesListPage} component={WorkspacesListPage_1.default}/>
                <RootStack.Screen name={SCREENS_1.default.TRANSITION_BETWEEN_APPS} options={defaultScreenOptions_1.default} getComponent={loadLogOutPreviousUserPage}/>
                <RootStack.Screen name={SCREENS_1.default.CONCIERGE} options={defaultScreenOptions_1.default} getComponent={loadConciergePage}/>
                <RootStack.Screen name={SCREENS_1.default.TRACK_EXPENSE} options={defaultScreenOptions_1.default} getComponent={loadTrackExpensePage}/>
                <RootStack.Screen name={SCREENS_1.default.SUBMIT_EXPENSE} options={defaultScreenOptions_1.default} getComponent={loadSubmitExpensePage}/>
                <RootStack.Screen name={SCREENS_1.default.REPORT_ATTACHMENTS} options={attachmentModalScreenOptions_1.default} getComponent={loadAttachmentModalScreen} listeners={modalScreenListeners}/>
                <RootStack.Screen name={SCREENS_1.default.REPORT_ADD_ATTACHMENT} options={attachmentModalScreenOptions_1.default} getComponent={loadAttachmentModalScreen} listeners={modalScreenListeners}/>
                <RootStack.Screen name={SCREENS_1.default.REPORT_AVATAR} options={attachmentModalScreenOptions_1.default} getComponent={loadAttachmentModalScreen} listeners={modalScreenListeners}/>
                <RootStack.Screen name={SCREENS_1.default.PROFILE_AVATAR} options={attachmentModalScreenOptions_1.default} getComponent={loadAttachmentModalScreen} listeners={modalScreenListeners}/>
                <RootStack.Screen name={SCREENS_1.default.WORKSPACE_AVATAR} options={attachmentModalScreenOptions_1.default} getComponent={loadAttachmentModalScreen} listeners={modalScreenListeners}/>
                <RootStack.Screen name={SCREENS_1.default.TRANSACTION_RECEIPT} options={attachmentModalScreenOptions_1.default} getComponent={loadAttachmentModalScreen} listeners={modalScreenListeners}/>
                <RootStack.Screen name={SCREENS_1.default.MONEY_REQUEST.RECEIPT_PREVIEW} options={attachmentModalScreenOptions_1.default} getComponent={loadAttachmentModalScreen} listeners={modalScreenListeners}/>
                <RootStack.Screen name={SCREENS_1.default.NOT_FOUND} options={rootNavigatorScreenOptions.fullScreen} component={NotFoundPage_1.default}/>
                <RootStack.Screen name={NAVIGATORS_1.default.RIGHT_MODAL_NAVIGATOR} options={rootNavigatorScreenOptions.rightModalNavigator} component={RightModalNavigator_1.default} listeners={modalScreenListenersWithCancelSearch}/>
                <RootStack.Screen name={SCREENS_1.default.DESKTOP_SIGN_IN_REDIRECT} options={rootNavigatorScreenOptions.fullScreen} component={DesktopSignInRedirectPage_1.default}/>
                <RootStack.Screen name={NAVIGATORS_1.default.SHARE_MODAL_NAVIGATOR} options={rootNavigatorScreenOptions.fullScreen} component={ModalStackNavigators_1.ShareModalStackNavigator} listeners={modalScreenListeners}/>
                <RootStack.Screen name={NAVIGATORS_1.default.EXPLANATION_MODAL_NAVIGATOR} options={rootNavigatorScreenOptions.basicModalNavigator} component={ExplanationModalNavigator_1.default}/>
                <RootStack.Screen name={NAVIGATORS_1.default.MIGRATED_USER_MODAL_NAVIGATOR} options={rootNavigatorScreenOptions.basicModalNavigator} component={MigratedUserWelcomeModalNavigator_1.default}/>
                <RootStack.Screen name={NAVIGATORS_1.default.TEST_DRIVE_MODAL_NAVIGATOR} options={rootNavigatorScreenOptions.basicModalNavigator} component={TestDriveModalNavigator_1.default}/>
                <RootStack.Screen name={NAVIGATORS_1.default.TEST_DRIVE_DEMO_NAVIGATOR} options={rootNavigatorScreenOptions.basicModalNavigator} component={TestDriveDemoNavigator_1.default}/>
                <RootStack.Screen name={NAVIGATORS_1.default.FEATURE_TRAINING_MODAL_NAVIGATOR} options={rootNavigatorScreenOptions.basicModalNavigator} component={FeatureTrainingModalNavigator_1.default} listeners={modalScreenListeners}/>
                {isOnboardingCompleted === false && !Navigation_1.default.isValidateLoginFlow() && (<RootStack.Screen name={NAVIGATORS_1.default.ONBOARDING_MODAL_NAVIGATOR} options={__assign(__assign({}, rootNavigatorScreenOptions.basicModalNavigator), { gestureEnabled: false })} component={OnboardingModalNavigator_1.default} listeners={{
                focus: function () {
                    Modal.setDisableDismissOnEscape(true);
                },
            }}/>)}
                {shouldShowRequire2FAPage && (<RootStack.Screen name={SCREENS_1.default.REQUIRE_TWO_FACTOR_AUTH} options={__assign(__assign({}, rootNavigatorScreenOptions.fullScreen), { gestureEnabled: false })} component={RequireTwoFactorAuthenticationPage_1.default}/>)}
                <RootStack.Screen name={SCREENS_1.default.WORKSPACE_JOIN_USER} options={{
            headerShown: false,
        }} listeners={modalScreenListeners} getComponent={loadWorkspaceJoinUser}/>
                <RootStack.Screen name={SCREENS_1.default.CONNECTION_COMPLETE} options={rootNavigatorScreenOptions.fullScreen} component={ConnectionCompletePage_1.default}/>
                <RootStack.Screen name={SCREENS_1.default.BANK_CONNECTION_COMPLETE} options={rootNavigatorScreenOptions.fullScreen} component={ConnectionCompletePage_1.default}/>
                <RootStack.Screen name={NAVIGATORS_1.default.TEST_TOOLS_MODAL_NAVIGATOR} options={__assign(__assign({}, rootNavigatorScreenOptions.basicModalNavigator), { native: {
                contentStyle: __assign({}, StyleUtils.getBackgroundColorWithOpacityStyle(theme.overlay, 0.72)),
                animation: animation_1.InternalPlatformAnimations.FADE,
            }, web: {
                cardStyle: __assign({}, StyleUtils.getBackgroundColorWithOpacityStyle(theme.overlay, 0.72)),
                animation: animation_1.InternalPlatformAnimations.FADE,
            } })} component={TestToolsModalNavigator_1.default} listeners={modalScreenListeners}/>
            </RootStack.Navigator>
            <SearchRouterModal_1.default />
            <OpenAppFailureModal_1.default />
            <PriorityModeController_1.default />
        </ComposeProviders_1.default>);
}
AuthScreens.displayName = 'AuthScreens';
var AuthScreensMemoized = (0, react_1.memo)(AuthScreens, function () { return true; });
exports.default = AuthScreensMemoized;
