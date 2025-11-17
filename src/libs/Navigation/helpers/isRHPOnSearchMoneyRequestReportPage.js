"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Navigation_1 = require("@libs/Navigation/Navigation");
var SCREENS_1 = require("@src/SCREENS");
var isRHPOnSearchMoneyRequestReportPage = function () {
    var _a, _b;
    var rootState = Navigation_1.navigationRef.getRootState();
    if (!rootState) {
        return false;
    }
    var lastRootRoute = rootState.routes.at(-2);
    var lastNestedRoute = (_b = (_a = lastRootRoute === null || lastRootRoute === void 0 ? void 0 : lastRootRoute.state) === null || _a === void 0 ? void 0 : _a.routes) === null || _b === void 0 ? void 0 : _b.at(-1);
    return (lastNestedRoute === null || lastNestedRoute === void 0 ? void 0 : lastNestedRoute.name) === SCREENS_1.default.SEARCH.MONEY_REQUEST_REPORT;
};
exports.default = isRHPOnSearchMoneyRequestReportPage;
