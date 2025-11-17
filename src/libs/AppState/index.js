"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var native_1 = require("@react-navigation/native");
var react_native_onyx_1 = require("react-native-onyx");
var Log_1 = require("@libs/Log");
var linkingConfig_1 = require("@libs/Navigation/linkingConfig");
var Navigation_1 = require("@libs/Navigation/Navigation");
var NetworkStore_1 = require("@libs/Network/NetworkStore");
var CONST_1 = require("@src/CONST");
var ONYXKEYS_1 = require("@src/ONYXKEYS");
var RequestsQueuesState_1 = require("./RequestsQueuesState");
var currentSession;
var currentNetwork;
// We have opted for connectWithoutView here as this is strictly non-UI and only for logging.
react_native_onyx_1.default.connectWithoutView({
    key: ONYXKEYS_1.default.SESSION,
    callback: function (value) {
        currentSession = value;
    },
});
// We have opted for connectWithoutView here as this is strictly non-UI and only for logging.
react_native_onyx_1.default.connectWithoutView({
    key: ONYXKEYS_1.default.NETWORK,
    callback: function (value) {
        currentNetwork = value;
    },
});
/**
 * Captures current navigation state.
 */
function captureNavigationState() {
    var _a;
    try {
        var currentRoute = (_a = Navigation_1.navigationRef.current) === null || _a === void 0 ? void 0 : _a.getCurrentRoute();
        if (!(currentRoute === null || currentRoute === void 0 ? void 0 : currentRoute.name)) {
            return { currentPath: undefined };
        }
        var routeFromState = (0, native_1.getPathFromState)(Navigation_1.navigationRef.getRootState(), linkingConfig_1.linkingConfig.config);
        return {
            currentPath: routeFromState || undefined,
        };
    }
    catch (error) {
        return { currentPath: undefined };
    }
}
/**
 * Captures current session authentication state.
 */
function captureSessionState() {
    // Check multiple authentication states to get complete picture
    var isSessionLoading = !!(currentSession === null || currentSession === void 0 ? void 0 : currentSession.loading);
    var isAuthenticatingWithShortLivedToken = !!(currentSession === null || currentSession === void 0 ? void 0 : currentSession.isAuthenticatingWithShortLivedToken);
    var isAuthenticatingFromNetworkStore = (0, NetworkStore_1.isAuthenticating)();
    return {
        isSessionLoading: isSessionLoading,
        isAuthenticatingWithShortLivedToken: isAuthenticatingWithShortLivedToken,
        isAuthenticatingFromNetworkStore: isAuthenticatingFromNetworkStore,
    };
}
/**
 * Captures current network connectivity state.
 */
function captureNetworkState() {
    var _a;
    return {
        networkStatus: ((_a = currentNetwork === null || currentNetwork === void 0 ? void 0 : currentNetwork.networkStatus) !== null && _a !== void 0 ? _a : CONST_1.default.NETWORK.NETWORK_STATUS.UNKNOWN),
        timeSkew: currentNetwork === null || currentNetwork === void 0 ? void 0 : currentNetwork.timeSkew,
        shouldForceOffline: currentNetwork === null || currentNetwork === void 0 ? void 0 : currentNetwork.shouldForceOffline,
        shouldSimulatePoorConnection: currentNetwork === null || currentNetwork === void 0 ? void 0 : currentNetwork.shouldSimulatePoorConnection,
        shouldFailAllRequests: currentNetwork === null || currentNetwork === void 0 ? void 0 : currentNetwork.shouldFailAllRequests,
    };
}
/**
 * Captures current global state of the app including navigation, session, network, and request queues.
 */
function captureAppState() {
    return {
        navigation: captureNavigationState(),
        session: captureSessionState(),
        network: captureNetworkState(),
        requestQueues: (0, RequestsQueuesState_1.default)(),
    };
}
function logAppStateOnLongLoading(extraLoadingContext, timeout) {
    Log_1.default.warn('ActivityIndicator has been shown for longer than expected', {
        timeoutMs: timeout,
        extraLoadingContext: extraLoadingContext,
        appState: captureAppState(),
    });
}
exports.default = logAppStateOnLongLoading;
