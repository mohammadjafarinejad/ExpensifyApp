"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.openOldDotLink = openOldDotLink;
exports.openExternalLink = openExternalLink;
exports.openLink = openLink;
exports.getInternalNewExpensifyPath = getInternalNewExpensifyPath;
exports.getInternalExpensifyPath = getInternalExpensifyPath;
exports.openTravelDotLink = openTravelDotLink;
exports.buildTravelDotURL = buildTravelDotURL;
exports.openExternalLinkWithToken = openExternalLinkWithToken;
exports.getTravelDotLink = getTravelDotLink;
exports.buildOldDotURL = buildOldDotURL;
exports.openReportFromDeepLink = openReportFromDeepLink;
var native_1 = require("@react-navigation/native");
var react_native_1 = require("react-native");
var react_native_onyx_1 = require("react-native-onyx");
var API = require("@libs/API");
var types_1 = require("@libs/API/types");
var asyncOpenURL_1 = require("@libs/asyncOpenURL");
var Environment = require("@libs/Environment/Environment");
var isPublicScreenRoute_1 = require("@libs/isPublicScreenRoute");
var isNavigatorName_1 = require("@libs/Navigation/helpers/isNavigatorName");
var normalizePath_1 = require("@libs/Navigation/helpers/normalizePath");
var shouldOpenOnAdminRoom_1 = require("@libs/Navigation/helpers/shouldOpenOnAdminRoom");
var Navigation_1 = require("@libs/Navigation/Navigation");
var navigationRef_1 = require("@libs/Navigation/navigationRef");
var ReportUtils_1 = require("@libs/ReportUtils");
var shouldSkipDeepLinkNavigation_1 = require("@libs/shouldSkipDeepLinkNavigation");
var Url = require("@libs/Url");
var UrlUtils_1 = require("@libs/UrlUtils");
var CONFIG_1 = require("@src/CONFIG");
var CONST_1 = require("@src/CONST");
var NAVIGATORS_1 = require("@src/NAVIGATORS");
var ONYXKEYS_1 = require("@src/ONYXKEYS");
var ROUTES_1 = require("@src/ROUTES");
var Report_1 = require("./Report");
var Session_1 = require("./Session");
var Welcome_1 = require("./Welcome");
var OnboardingFlow_1 = require("./Welcome/OnboardingFlow");
var isNetworkOffline = false;
var networkStatus;
// Use connectWithoutView since this is to open an external link and doesn't affect any UI
react_native_onyx_1.default.connectWithoutView({
    key: ONYXKEYS_1.default.NETWORK,
    callback: function (value) {
        var _a, _b;
        isNetworkOffline = (_a = value === null || value === void 0 ? void 0 : value.isOffline) !== null && _a !== void 0 ? _a : false;
        networkStatus = (_b = value === null || value === void 0 ? void 0 : value.networkStatus) !== null && _b !== void 0 ? _b : CONST_1.default.NETWORK.NETWORK_STATUS.UNKNOWN;
    },
});
var currentUserEmail = '';
var currentUserAccountID = CONST_1.default.DEFAULT_NUMBER_ID;
// Use connectWithoutView since this is to open an external link and doesn't affect any UI
react_native_onyx_1.default.connectWithoutView({
    key: ONYXKEYS_1.default.SESSION,
    callback: function (value) {
        var _a, _b;
        currentUserEmail = (_a = value === null || value === void 0 ? void 0 : value.email) !== null && _a !== void 0 ? _a : '';
        currentUserAccountID = (_b = value === null || value === void 0 ? void 0 : value.accountID) !== null && _b !== void 0 ? _b : CONST_1.default.DEFAULT_NUMBER_ID;
    },
});
var account;
// Use connectWithoutView to subscribe to account data without affecting UI
react_native_onyx_1.default.connectWithoutView({
    key: ONYXKEYS_1.default.ACCOUNT,
    callback: function (value) {
        account = value;
    },
});
function buildOldDotURL(url, shortLivedAuthToken) {
    var hashIndex = url.lastIndexOf('#');
    var hasHashParams = hashIndex !== -1;
    var hasURLParams = url.indexOf('?') !== -1;
    var originURL = url;
    var hashParams = '';
    if (hasHashParams) {
        originURL = url.substring(0, hashIndex);
        hashParams = url.substring(hashIndex);
    }
    var authTokenParam = shortLivedAuthToken ? "authToken=".concat(shortLivedAuthToken) : '';
    var emailParam = "email=".concat(encodeURIComponent(currentUserEmail));
    var paramsArray = [authTokenParam, emailParam];
    var params = paramsArray.filter(Boolean).join('&');
    return Environment.getOldDotEnvironmentURL().then(function (environmentURL) {
        var oldDotDomain = (0, UrlUtils_1.default)(environmentURL);
        // If the URL contains # or ?, we can assume they don't need to have the `?` token to start listing url parameters.
        return "".concat(oldDotDomain).concat(originURL).concat(hasURLParams ? '&' : '?').concat(params).concat(hashParams);
    });
}
/**
 * @param shouldSkipCustomSafariLogic When true, we will use `Linking.openURL` even if the browser is Safari.
 */
function openExternalLink(url, shouldSkipCustomSafariLogic, shouldOpenInSameTab) {
    if (shouldSkipCustomSafariLogic === void 0) { shouldSkipCustomSafariLogic = false; }
    if (shouldOpenInSameTab === void 0) { shouldOpenInSameTab = false; }
    (0, asyncOpenURL_1.default)(Promise.resolve(), url, shouldSkipCustomSafariLogic, shouldOpenInSameTab);
}
function openOldDotLink(url, shouldOpenInSameTab) {
    if (shouldOpenInSameTab === void 0) { shouldOpenInSameTab = false; }
    if (isNetworkOffline) {
        buildOldDotURL(url).then(function (oldDotURL) { return openExternalLink(oldDotURL, undefined, shouldOpenInSameTab); });
        return;
    }
    // If shortLivedAuthToken is not accessible, fallback to opening the link without the token.
    (0, asyncOpenURL_1.default)(
    // eslint-disable-next-line rulesdir/no-api-side-effects-method
    API.makeRequestWithSideEffects(types_1.SIDE_EFFECT_REQUEST_COMMANDS.OPEN_OLD_DOT_LINK, {}, {})
        .then(function (response) { return (response ? buildOldDotURL(url, response.shortLivedAuthToken) : buildOldDotURL(url)); })
        .catch(function () { return buildOldDotURL(url); }), function (oldDotURL) { return oldDotURL; }, undefined, shouldOpenInSameTab);
}
function buildTravelDotURL(spotnanaToken, isTestAccount, postLoginPath) {
    var environmentURL = isTestAccount ? CONST_1.default.STAGING_TRAVEL_DOT_URL : CONST_1.default.TRAVEL_DOT_URL;
    var tmcID = isTestAccount ? CONST_1.default.STAGING_SPOTNANA_TMC_ID : CONST_1.default.SPOTNANA_TMC_ID;
    var authCode = "authCode=".concat(spotnanaToken);
    var tmcIDParam = "tmcId=".concat(tmcID);
    var redirectURL = postLoginPath ? "redirectUrl=".concat(Url.addLeadingForwardSlash(postLoginPath)) : '';
    var paramsArray = [authCode, tmcIDParam, redirectURL];
    var params = paramsArray.filter(Boolean).join('&');
    var travelDotDomain = (0, UrlUtils_1.default)(environmentURL);
    return "".concat(travelDotDomain, "auth/code?").concat(params);
}
/**
 * @param postLoginPath When provided, we will redirect the user to this path post login on travelDot. eg: 'trips/:tripID'
 */
function openTravelDotLink(policyID, postLoginPath) {
    if (policyID === null || policyID === undefined) {
        return;
    }
    var parameters = {
        policyID: policyID,
    };
    return new Promise(function (resolve, reject) {
        var error = new Error('Failed to generate spotnana token.');
        (0, asyncOpenURL_1.default)(
        // eslint-disable-next-line rulesdir/no-api-side-effects-method
        API.makeRequestWithSideEffects(types_1.SIDE_EFFECT_REQUEST_COMMANDS.GENERATE_SPOTNANA_TOKEN, parameters, {})
            .then(function (response) {
            var _a;
            if (!(response === null || response === void 0 ? void 0 : response.spotnanaToken)) {
                reject(error);
                throw error;
            }
            var travelURL = buildTravelDotURL(response.spotnanaToken, (_a = response.isTestAccount) !== null && _a !== void 0 ? _a : false, postLoginPath);
            resolve(undefined);
            return travelURL;
        })
            .catch(function () {
            reject(error);
            throw error;
        }), function (travelDotURL) { return travelDotURL !== null && travelDotURL !== void 0 ? travelDotURL : ''; });
    });
}
function getInternalNewExpensifyPath(href) {
    if (!href) {
        return '';
    }
    var attrPath = Url.getPathFromURL(href);
    return (Url.hasSameExpensifyOrigin(href, CONST_1.default.NEW_EXPENSIFY_URL) || Url.hasSameExpensifyOrigin(href, CONST_1.default.STAGING_NEW_EXPENSIFY_URL) || href.startsWith(CONST_1.default.DEV_NEW_EXPENSIFY_URL)) &&
        !CONST_1.default.PATHS_TO_TREAT_AS_EXTERNAL.find(function (path) { return attrPath.startsWith(path); })
        ? attrPath
        : '';
}
function getInternalExpensifyPath(href) {
    if (!href) {
        return '';
    }
    var attrPath = Url.getPathFromURL(href);
    var hasExpensifyOrigin = Url.hasSameExpensifyOrigin(href, CONFIG_1.default.EXPENSIFY.EXPENSIFY_URL) || Url.hasSameExpensifyOrigin(href, CONFIG_1.default.EXPENSIFY.STAGING_API_ROOT);
    if (!hasExpensifyOrigin || attrPath.startsWith(CONFIG_1.default.EXPENSIFY.CONCIERGE_URL_PATHNAME) || attrPath.startsWith(CONFIG_1.default.EXPENSIFY.DEVPORTAL_URL_PATHNAME)) {
        return '';
    }
    return attrPath;
}
function openLink(href, environmentURL, isAttachment) {
    if (isAttachment === void 0) { isAttachment = false; }
    var hasSameOrigin = Url.hasSameExpensifyOrigin(href, environmentURL);
    var hasExpensifyOrigin = Url.hasSameExpensifyOrigin(href, CONFIG_1.default.EXPENSIFY.EXPENSIFY_URL) || Url.hasSameExpensifyOrigin(href, CONFIG_1.default.EXPENSIFY.STAGING_API_ROOT);
    var internalNewExpensifyPath = getInternalNewExpensifyPath(href);
    var internalExpensifyPath = getInternalExpensifyPath(href);
    // There can be messages from Concierge with links to specific NewDot reports. Those URLs look like this:
    // https://www.expensify.com.dev/newdotreport?reportID=3429600449838908 and they have a target="_blank" attribute. This is so that when a user is on OldDot,
    // clicking on the link will open the chat in NewDot. However, when a user is in NewDot and clicks on the concierge link, the link needs to be handled differently.
    // Normally, the link would be sent to Link.openOldDotLink() and opened in a new tab, and that's jarring to the user. Since the intention is to link to a specific NewDot chat,
    // the reportID is extracted from the URL and then opened as an internal link, taking the user straight to the chat in the same tab.
    if (hasExpensifyOrigin && href.indexOf('newdotreport?reportID=') > -1) {
        var reportID = href.split('newdotreport?reportID=').pop();
        var reportRoute = ROUTES_1.default.REPORT_WITH_ID.getRoute(reportID);
        Navigation_1.default.navigate(reportRoute);
        return;
    }
    // If we are handling a New Expensify link then we will assume this should be opened by the app internally. This ensures that the links are opened internally via react-navigation
    // instead of in a new tab or with a page refresh (which is the default behavior of an anchor tag)
    if (internalNewExpensifyPath && hasSameOrigin) {
        if ((0, Session_1.isAnonymousUser)() && !(0, Session_1.canAnonymousUserAccessRoute)(internalNewExpensifyPath)) {
            (0, Session_1.signOutAndRedirectToSignIn)();
            return;
        }
        Navigation_1.default.navigate(internalNewExpensifyPath);
        return;
    }
    // If we are handling an old dot Expensify link we need to open it with openOldDotLink() so we can navigate to it with the user already logged in.
    // As attachments also use expensify.com we don't want it working the same as links.
    var isPublicOldDotURL = Object.values(CONST_1.default.OLD_DOT_PUBLIC_URLS).includes(href);
    if (internalExpensifyPath && !isAttachment && !isPublicOldDotURL) {
        openOldDotLink(internalExpensifyPath);
        return;
    }
    openExternalLink(href);
}
function openReportFromDeepLink(url, currentOnboardingPurposeSelected, currentOnboardingCompanySize, onboardingInitialPath, reports, isAuthenticated) {
    var reportID = (0, ReportUtils_1.getReportIDFromLink)(url);
    if (reportID && !isAuthenticated) {
        // Call the OpenReport command to check in the server if it's a public room. If so, we'll open it as an anonymous user
        (0, Report_1.openReport)(reportID, '', [], undefined, '0', true);
        // Show the sign-in page if the app is offline
        if (networkStatus === CONST_1.default.NETWORK.NETWORK_STATUS.OFFLINE) {
            (0, Report_1.doneCheckingPublicRoom)();
        }
    }
    else {
        // If we're not opening a public room (no reportID) or the user is authenticated, we unblock the UI (hide splash screen)
        (0, Report_1.doneCheckingPublicRoom)();
    }
    var route = (0, ReportUtils_1.getRouteFromLink)(url);
    // Bing search results still link to /signin when searching for “Expensify”, but the /signin route no longer exists in our repo, so we redirect it to the home page to avoid showing a Not Found page.
    if ((0, normalizePath_1.default)(route) === CONST_1.default.SIGNIN_ROUTE) {
        route = '';
    }
    // If we are not authenticated and are navigating to a public screen, we don't want to navigate again to the screen after sign-in/sign-up
    if (!isAuthenticated && (0, isPublicScreenRoute_1.default)(route)) {
        return;
    }
    // If the route is the transition route, we don't want to navigate and start the onboarding flow
    if (route === null || route === void 0 ? void 0 : route.includes(ROUTES_1.default.TRANSITION_BETWEEN_APPS)) {
        return;
    }
    // Navigate to the report after sign-in/sign-up.
    // eslint-disable-next-line @typescript-eslint/no-deprecated
    react_native_1.InteractionManager.runAfterInteractions(function () {
        (0, Session_1.waitForUserSignIn)().then(function () {
            // Subscribe to onboarding data using connectWithoutView to determine if user has completed the onboarding flow without affecting UI
            var connection = react_native_onyx_1.default.connectWithoutView({
                key: ONYXKEYS_1.default.NVP_ONBOARDING,
                callback: function (val) {
                    if (!val && !(0, Session_1.isAnonymousUser)()) {
                        return;
                    }
                    Navigation_1.default.waitForProtectedRoutes().then(function () {
                        if (route && (0, Session_1.isAnonymousUser)() && !(0, Session_1.canAnonymousUserAccessRoute)(route)) {
                            (0, Session_1.signOutAndRedirectToSignIn)(true);
                            return;
                        }
                        // We don't want to navigate to the exitTo route when creating a new workspace from a deep link,
                        // because we already handle creating the optimistic policy and navigating to it in App.setUpPoliciesAndNavigate,
                        // which is already called when AuthScreens mounts.
                        if (!CONFIG_1.default.IS_HYBRID_APP && url && new URL(url).searchParams.get('exitTo') === ROUTES_1.default.WORKSPACE_NEW) {
                            return;
                        }
                        var handleDeeplinkNavigation = function () {
                            var _a;
                            // We want to disconnect the connection so it won't trigger the deeplink again
                            // every time the data is changed, for example, when re-login.
                            react_native_onyx_1.default.disconnect(connection);
                            var state = navigationRef_1.default.getRootState();
                            var currentFocusedRoute = (0, native_1.findFocusedRoute)(state);
                            if ((0, isNavigatorName_1.isOnboardingFlowName)(currentFocusedRoute === null || currentFocusedRoute === void 0 ? void 0 : currentFocusedRoute.name)) {
                                (0, Welcome_1.setOnboardingErrorMessage)('onboarding.purpose.errorBackButton');
                                return;
                            }
                            if ((0, shouldSkipDeepLinkNavigation_1.default)(route)) {
                                return;
                            }
                            // Navigation for signed users is handled by react-navigation.
                            if (isAuthenticated) {
                                return;
                            }
                            var navigateHandler = function (reportParam) {
                                var _a, _b, _c;
                                // Check if the report exists in the collection
                                var report = reportParam !== null && reportParam !== void 0 ? reportParam : reports === null || reports === void 0 ? void 0 : reports["".concat(ONYXKEYS_1.default.COLLECTION.REPORT).concat(reportID)];
                                // If the report does not exist, navigate to the last accessed report or Concierge chat
                                if (reportID && (!(report === null || report === void 0 ? void 0 : report.reportID) || ((_a = report.errorFields) === null || _a === void 0 ? void 0 : _a.notFound))) {
                                    var lastAccessedReportID = (_b = (0, ReportUtils_1.findLastAccessedReport)(false, (0, shouldOpenOnAdminRoom_1.default)(), undefined, reportID)) === null || _b === void 0 ? void 0 : _b.reportID;
                                    if (lastAccessedReportID) {
                                        var lastAccessedReportRoute = ROUTES_1.default.REPORT_WITH_ID.getRoute(lastAccessedReportID);
                                        Navigation_1.default.navigate(lastAccessedReportRoute);
                                        return;
                                    }
                                    (0, Report_1.navigateToConciergeChat)(false, function () { return true; });
                                    return;
                                }
                                // If the last route is an RHP, we want to replace it so it won't be covered by the full-screen navigator.
                                var forceReplace = ((_c = navigationRef_1.default.getRootState().routes.at(-1)) === null || _c === void 0 ? void 0 : _c.name) === NAVIGATORS_1.default.RIGHT_MODAL_NAVIGATOR;
                                Navigation_1.default.navigate(route, { forceReplace: forceReplace });
                            };
                            // If we log with deeplink with reportID and data for this report is not available yet,
                            // then we will wait for Onyx to completely merge data from OpenReport API with OpenApp API in AuthScreens
                            if (reportID &&
                                !isAuthenticated &&
                                (!(reports === null || reports === void 0 ? void 0 : reports["".concat(ONYXKEYS_1.default.COLLECTION.REPORT).concat(reportID)]) || !((_a = reports === null || reports === void 0 ? void 0 : reports["".concat(ONYXKEYS_1.default.COLLECTION.REPORT).concat(reportID)]) === null || _a === void 0 ? void 0 : _a.reportID))) {
                                var reportConnection_1 = react_native_onyx_1.default.connectWithoutView({
                                    key: "".concat(ONYXKEYS_1.default.COLLECTION.REPORT).concat(reportID),
                                    // eslint-disable-next-line rulesdir/prefer-early-return
                                    callback: function (report) {
                                        var _a;
                                        // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
                                        if (((_a = report === null || report === void 0 ? void 0 : report.errorFields) === null || _a === void 0 ? void 0 : _a.notFound) || (report === null || report === void 0 ? void 0 : report.reportID)) {
                                            react_native_onyx_1.default.disconnect(reportConnection_1);
                                            navigateHandler(report);
                                        }
                                    },
                                });
                            }
                            else {
                                navigateHandler();
                            }
                        };
                        if ((0, Session_1.isAnonymousUser)()) {
                            handleDeeplinkNavigation();
                            return;
                        }
                        // We need skip deeplinking if the user hasn't completed the guided setup flow.
                        (0, Welcome_1.isOnboardingFlowCompleted)({
                            onNotCompleted: function () {
                                return (0, OnboardingFlow_1.startOnboardingFlow)({
                                    onboardingValuesParam: val,
                                    hasAccessiblePolicies: !!(account === null || account === void 0 ? void 0 : account.hasAccessibleDomainPolicies),
                                    isUserFromPublicDomain: !!(account === null || account === void 0 ? void 0 : account.isFromPublicDomain),
                                    currentOnboardingPurposeSelected: currentOnboardingPurposeSelected,
                                    currentOnboardingCompanySize: currentOnboardingCompanySize,
                                    onboardingInitialPath: onboardingInitialPath,
                                    onboardingValues: val,
                                });
                            },
                            onCompleted: handleDeeplinkNavigation,
                            onCanceled: handleDeeplinkNavigation,
                        });
                    });
                },
            });
        });
    });
}
function buildURLWithAuthToken(url, shortLivedAuthToken) {
    var authTokenParam = shortLivedAuthToken ? "shortLivedAuthToken=".concat(shortLivedAuthToken) : '';
    var emailParam = "email=".concat(encodeURIComponent(currentUserEmail));
    var exitTo = "exitTo=".concat(encodeURIComponent(url));
    var accountID = "accountID=".concat(currentUserAccountID);
    var referrer = 'referrer=desktop';
    var paramsArray = [accountID, emailParam, authTokenParam, exitTo, referrer];
    var params = paramsArray.filter(Boolean).join('&');
    return "".concat(CONFIG_1.default.EXPENSIFY.NEW_EXPENSIFY_URL, "transition?").concat(params);
}
/**
 * @param shouldSkipCustomSafariLogic When true, we will use `Linking.openURL` even if the browser is Safari.
 */
function openExternalLinkWithToken(url, shouldSkipCustomSafariLogic) {
    if (shouldSkipCustomSafariLogic === void 0) { shouldSkipCustomSafariLogic = false; }
    (0, asyncOpenURL_1.default)(
    // eslint-disable-next-line rulesdir/no-api-side-effects-method
    API.makeRequestWithSideEffects(types_1.SIDE_EFFECT_REQUEST_COMMANDS.OPEN_OLD_DOT_LINK, {}, {})
        .then(function (response) { return (response ? buildURLWithAuthToken(url, response.shortLivedAuthToken) : buildURLWithAuthToken(url)); })
        .catch(function () { return buildURLWithAuthToken(url); }), function (link) { return link; }, shouldSkipCustomSafariLogic);
}
function getTravelDotLink(policyID) {
    if (policyID === null || policyID === undefined) {
        return Promise.reject(new Error('Policy ID is required'));
    }
    var parameters = {
        policyID: policyID,
    };
    // eslint-disable-next-line rulesdir/no-api-side-effects-method
    return API.makeRequestWithSideEffects(types_1.SIDE_EFFECT_REQUEST_COMMANDS.GENERATE_SPOTNANA_TOKEN, parameters, {}).then(function (response) {
        if (!(response === null || response === void 0 ? void 0 : response.spotnanaToken)) {
            throw new Error('Failed to generate spotnana token.');
        }
        return response;
    });
}
