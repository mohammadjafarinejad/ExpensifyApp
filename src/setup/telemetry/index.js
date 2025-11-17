"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.navigationIntegration = void 0;
exports.default = default_1;
var SentryReact = require("@sentry/react");
var Sentry = require("@sentry/react-native");
var react_native_1 = require("react-native");
var Environment_1 = require("@libs/Environment/Environment");
var middlewares_1 = require("@libs/telemetry/middlewares");
var CONFIG_1 = require("@src/CONFIG");
var package_json_1 = require("../../../package.json");
var navigationIntegration = Sentry.reactNavigationIntegration({
    enableTimeToInitialDisplay: true,
});
exports.navigationIntegration = navigationIntegration;
function default_1() {
    if ((0, Environment_1.isDevelopment)()) {
        return;
    }
    Sentry.init({
        dsn: CONFIG_1.default.SENTRY_DSN,
        tracesSampleRate: 1.0,
        profilesSampleRate: react_native_1.Platform.OS === 'android' ? 0 : 1.0,
        enableAutoPerformanceTracing: true,
        enableUserInteractionTracing: true,
        integrations: [navigationIntegration, SentryReact.browserProfilingIntegration(), SentryReact.browserTracingIntegration()],
        environment: CONFIG_1.default.ENVIRONMENT,
        release: "".concat(package_json_1.default.name, "@").concat(package_json_1.default.version),
        beforeSendTransaction: middlewares_1.default,
    });
}
