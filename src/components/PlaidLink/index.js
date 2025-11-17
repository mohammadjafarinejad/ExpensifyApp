"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_native_1 = require("react-native");
var react_plaid_link_1 = require("react-plaid-link");
var ActivityIndicator_1 = require("@components/ActivityIndicator");
var useThemeStyles_1 = require("@hooks/useThemeStyles");
var Browser_1 = require("@libs/Browser");
var Log_1 = require("@libs/Log");
var CONST_1 = require("@src/CONST");
// Helper to remove the state added by Plaid on Safari after the Plaid flow ends.
// We need to manually clear it because Plaid doesn't remove it on its own after exiting on Safari,
// which may cause the navigation state to reload when a Modal with the `shouldHandleNavigationBack` prop is used immediately afterward.
function clearSafariHistoryState() {
    var isSafariBrowser = (0, Browser_1.isSafari)() || (0, Browser_1.isMobileSafari)();
    if (window.history.state === null && isSafariBrowser) {
        window.history.back();
    }
}
function PlaidLink(_a) {
    var token = _a.token, _b = _a.onSuccess, onSuccess = _b === void 0 ? function () { } : _b, _c = _a.onError, onError = _c === void 0 ? function () { } : _c, _d = _a.onExit, onExit = _d === void 0 ? function () { } : _d, onEvent = _a.onEvent, receivedRedirectURI = _a.receivedRedirectURI;
    var _e = (0, react_1.useState)(false), isPlaidLoaded = _e[0], setIsPlaidLoaded = _e[1];
    var styles = (0, useThemeStyles_1.default)();
    var successCallback = (0, react_1.useCallback)(function (publicToken, metadata) {
        clearSafariHistoryState();
        onSuccess({ publicToken: publicToken, metadata: metadata });
    }, [onSuccess]);
    var _f = (0, react_plaid_link_1.usePlaidLink)({
        token: token,
        onSuccess: successCallback,
        onExit: function (exitError, metadata) {
            Log_1.default.info('[PlaidLink] Exit: ', false, { exitError: exitError, metadata: metadata });
            clearSafariHistoryState();
            onExit();
        },
        onEvent: function (event, metadata) {
            Log_1.default.info('[PlaidLink] Event: ', false, { event: event, metadata: metadata });
            onEvent(event, metadata);
        },
        onLoad: function () { return setIsPlaidLoaded(true); },
        // The redirect URI with an OAuth state ID. Needed to re-initialize the PlaidLink after directing the
        // user to their respective bank platform
        receivedRedirectUri: receivedRedirectURI,
    }), open = _f.open, ready = _f.ready, error = _f.error;
    (0, react_1.useEffect)(function () {
        if (error) {
            onError(error);
            return;
        }
        if (!ready) {
            return;
        }
        if (!isPlaidLoaded) {
            return;
        }
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        open();
    }, [ready, error, isPlaidLoaded, open, onError]);
    return (<react_native_1.View style={[styles.flex1, styles.alignItemsCenter, styles.justifyContentCenter]}>
            <ActivityIndicator_1.default size={CONST_1.default.ACTIVITY_INDICATOR_SIZE.LARGE}/>
        </react_native_1.View>);
}
PlaidLink.displayName = 'PlaidLink';
exports.default = PlaidLink;
