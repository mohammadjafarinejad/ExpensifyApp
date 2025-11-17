"use strict";
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.init = init;
exports.sendEvent = sendEvent;
exports.setAttribute = setAttribute;
exports.setAuthenticationData = setAuthenticationData;
var group_ib_fp_1 = require("group-ib-fp");
var ApiUtils_1 = require("@libs/ApiUtils");
var Environment_1 = require("@libs/Environment/Environment");
var getEnvironment_1 = require("@libs/Environment/getEnvironment");
var Log_1 = require("@libs/Log");
var CONST_1 = require("@src/CONST");
var index_1 = require("./enableCapabilities/index");
// The GroupIB SDK requires us to set both iOS and Android customer IDs when initializing the SDK, instead of just one that the App is running on.
var cidIOSMap = (_a = {},
    _a[CONST_1.default.ENVIRONMENT.PRODUCTION] = 'gib-i-expensify',
    _a[CONST_1.default.ENVIRONMENT.STAGING] = 'gib-i-expensify-stg',
    _a[CONST_1.default.ENVIRONMENT.DEV] = 'gib-i-expensify-uat',
    _a[CONST_1.default.ENVIRONMENT.ADHOC] = 'gib-i-expensify-stg',
    _a);
var cidAndroidMap = (_b = {},
    _b[CONST_1.default.ENVIRONMENT.PRODUCTION] = 'gib-a-expensify',
    _b[CONST_1.default.ENVIRONMENT.STAGING] = 'gib-a-expensify-stg',
    _b[CONST_1.default.ENVIRONMENT.DEV] = 'gib-a-expensify-uat',
    _b[CONST_1.default.ENVIRONMENT.ADHOC] = 'gib-a-expensify-stg',
    _b);
var resolveFpInstancePromise = function () { };
var fpInstancePromise = new Promise(function (resolve) {
    resolveFpInstancePromise = resolve;
});
/** Required configuration to initialize the FraudProtection SDK on native.
 * This block must execute in the order below so the SDK has all identifiers and endpoints before it starts:
 *  1) Set platform customer IDs (iOS/Android)
 *  2) Set collection endpoints (target URL and GlobalId URL)
 *  3) Enable platform capabilities
 *  4) Start the SDK (run)
 */
function init() {
    return Promise.all([(0, getEnvironment_1.default)(), (0, Environment_1.getOldDotEnvironmentURL)()]).then(function (_a) {
        var _b, _c;
        var env = _a[0], oldDotURL = _a[1];
        var iOSCustomerID = (_b = cidIOSMap[env]) !== null && _b !== void 0 ? _b : cidIOSMap[CONST_1.default.ENVIRONMENT.DEV];
        var androidCustomerID = (_c = cidAndroidMap[env]) !== null && _c !== void 0 ? _c : cidAndroidMap[CONST_1.default.ENVIRONMENT.DEV];
        var fp = group_ib_fp_1.FP.getInstance();
        var targetBaseURL = oldDotURL;
        if (env === CONST_1.default.ENVIRONMENT.DEV) {
            targetBaseURL = (0, ApiUtils_1.getApiRoot)();
            Log_1.default.info("[Fraud Protection] Fraud protection backend URL: ".concat(targetBaseURL));
            fp.enableDebugLogs();
        }
        // Set platform-specific customer IDs – It's weird but their documentation requires us to set both of them instead of just one that the App is running on.
        fp.setCustomerId(iOSCustomerID, androidCustomerID, function (error) {
            Log_1.default.warn("[Fraud Protection] setCustomerId error: ".concat(error));
        });
        targetBaseURL = targetBaseURL.endsWith('/') ? targetBaseURL.slice(0, -1) : targetBaseURL;
        fp.setTargetURL("".concat(targetBaseURL, "/api/fl"), function (error) {
            Log_1.default.warn("[Fraud Protection] setTargetURL error: ".concat(error));
        });
        fp.setGlobalIdURL("".concat(targetBaseURL, "/api/fl/id.html"), function (error) {
            Log_1.default.warn("[Fraud Protection] setGlobalIdURL error: ".concat(error));
        });
        (0, index_1.default)(fp);
        fp.run(function (error) {
            Log_1.default.warn("[Fraud Protection] run error: ".concat(error));
        });
        resolveFpInstancePromise(fp);
    });
}
function setAuthenticationData(identity, sessionID) {
    fpInstancePromise.then(function (fp) {
        fp.setAttributeTitle('user_id', identity, group_ib_fp_1.FPAttributeFormat.ClearText, false, function (e) {
            Log_1.default.warn("[Fraud Protection] setAttributeTitle('user_id', [REDACTED], FPAttributeFormat.ClearText) error: ".concat(e));
        });
        fp.setSessionId(sessionID, function (e) {
            Log_1.default.warn("[Fraud Protection] setSessionId([REDACTED]) error: ".concat(e));
        });
    });
}
function setAttribute(key, value, shouldHash, persist) {
    fpInstancePromise.then(function (fp) {
        var format = shouldHash ? group_ib_fp_1.FPAttributeFormat.Hashed : group_ib_fp_1.FPAttributeFormat.ClearText;
        var sendOnceOnly = persist !== true;
        fp.setAttributeTitle(key, value, format, sendOnceOnly, function (e) {
            var formatName = shouldHash ? 'FPAttributeFormat.Hashed' : 'FPAttributeFormat.ClearText';
            Log_1.default.warn("[Fraud Protection] setAttributeTitle(".concat(key, ", [REDACTED], ").concat(formatName, ") error: ").concat(e));
        });
    });
}
function sendEvent(event) {
    setAttribute('event_type', event);
}
