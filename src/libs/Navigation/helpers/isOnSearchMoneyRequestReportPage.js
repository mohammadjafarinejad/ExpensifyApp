"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Log_1 = require("@libs/Log");
var navigationRef_1 = require("@libs/Navigation/navigationRef");
var SCREENS_1 = require("@src/SCREENS");
var isOnSearchMoneyRequestReportPage = function () {
    var _a, _b;
    if (!navigationRef_1.default.isReady()) {
        Log_1.default.warn('[src/libs/Navigation/helpers/isOnSearchMoneyRequestReportPage.ts] NavigationRef is not ready. Returning false.');
        return false;
    }
    var rootState = navigationRef_1.default.getRootState();
    if (!rootState) {
        return false;
    }
    var lastRootRoute = rootState.routes.at(-1);
    var lastNestedRoute = (_b = (_a = lastRootRoute === null || lastRootRoute === void 0 ? void 0 : lastRootRoute.state) === null || _a === void 0 ? void 0 : _a.routes) === null || _b === void 0 ? void 0 : _b.at(-1);
    return (lastNestedRoute === null || lastNestedRoute === void 0 ? void 0 : lastNestedRoute.name) === SCREENS_1.default.SEARCH.MONEY_REQUEST_REPORT;
};
exports.default = isOnSearchMoneyRequestReportPage;
