"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = useEnvironment;
var react_1 = require("react");
var EnvironmentContext_1 = require("@components/EnvironmentContext");
var CONST_1 = require("@src/CONST");
function useEnvironment() {
    var _a = (0, react_1.useContext)(EnvironmentContext_1.EnvironmentContext), environment = _a.environment, environmentURL = _a.environmentURL, adjustExpensifyLinksForEnv = _a.adjustExpensifyLinksForEnv;
    return {
        environment: environment,
        environmentURL: environmentURL,
        isProduction: environment === CONST_1.default.ENVIRONMENT.PRODUCTION,
        isDevelopment: environment === CONST_1.default.ENVIRONMENT.DEV,
        adjustExpensifyLinksForEnv: adjustExpensifyLinksForEnv,
    };
}
