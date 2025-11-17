"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.init = init;
exports.sendEvent = sendEvent;
exports.setAttribute = setAttribute;
exports.setAuthenticationData = setAuthenticationData;
var Environment_1 = require("@libs/Environment/Environment");
var getEnvironment_1 = require("@libs/Environment/getEnvironment");
var Log_1 = require("@libs/Log");
var CONST_1 = require("@src/CONST");
var cidMap_1 = require("./cidMap");
var getScriptURL_1 = require("./getScriptURL");
function loadGroupIBScript() {
    return new Promise(function (resolve, reject) {
        if (typeof document === 'undefined') {
            resolve();
            return;
        }
        var script = document.createElement('script');
        script.async = true;
        script.src = (0, getScriptURL_1.default)();
        script.onload = function () { return resolve(); };
        script.onerror = function () {
            Log_1.default.warn('[Fraud Protection] Failed to load the gib.js script.');
            reject(new Error('Failed to load the gib.js script.'));
        };
        document.head.appendChild(script);
    });
}
var resolveFpInstancePromise = function () { };
var fpInstancePromise = new Promise(function (resolve) {
    resolveFpInstancePromise = resolve;
});
function init() {
    if (typeof document === 'undefined') {
        resolveFpInstancePromise(undefined);
        return Promise.resolve();
    }
    return Promise.all([(0, getEnvironment_1.default)(), (0, Environment_1.getOldDotEnvironmentURL)(), loadGroupIBScript()]).then(function (_a) {
        var _b, _c;
        var env = _a[0], oldDotURL = _a[1];
        var fp = window.gib;
        var cid = (_b = cidMap_1.default[env]) !== null && _b !== void 0 ? _b : cidMap_1.default[CONST_1.default.ENVIRONMENT.DEV];
        (_c = fp === null || fp === void 0 ? void 0 : fp.init) === null || _c === void 0 ? void 0 : _c.call(fp, { cid: cid, backUrl: "".concat(oldDotURL.replace('https://', '//'), "/api/fl"), gafUrl: '//eu.id.group-ib.com/id.html' });
        resolveFpInstancePromise(fp);
    });
}
function setAuthenticationData(identity, sessionID) {
    fpInstancePromise.then(function (fp) {
        var _a, _b, _c;
        var status = identity !== '' ? fp === null || fp === void 0 ? void 0 : fp.IS_AUTHORIZED : fp === null || fp === void 0 ? void 0 : fp.IS_GUEST;
        // The order of these calls is important. Do not change it unless you check in the GroupIB SDK documentation.
        (_a = fp === null || fp === void 0 ? void 0 : fp.setAuthStatus) === null || _a === void 0 ? void 0 : _a.call(fp, status !== null && status !== void 0 ? status : 0);
        (_b = fp === null || fp === void 0 ? void 0 : fp.setIdentity) === null || _b === void 0 ? void 0 : _b.call(fp, identity);
        (_c = fp === null || fp === void 0 ? void 0 : fp.setSessionID) === null || _c === void 0 ? void 0 : _c.call(fp, sessionID);
    });
}
function setAttribute(key, value, shouldHash, persist) {
    fpInstancePromise.then(function (fp) {
        var _a;
        var options = { persist: persist === true };
        if (shouldHash) {
            options.encryption = 'sha1';
        }
        (_a = fp === null || fp === void 0 ? void 0 : fp.setAttribute) === null || _a === void 0 ? void 0 : _a.call(fp, key, value, options);
    });
}
function sendEvent(event) {
    setAttribute('event_type', event);
}
