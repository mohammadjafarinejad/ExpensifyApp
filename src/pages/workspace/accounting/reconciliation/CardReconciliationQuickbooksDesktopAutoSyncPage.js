"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var QuickbooksDesktopAutoSyncPageBase_1 = require("@pages/workspace/accounting/qbd/advanced/QuickbooksDesktopAutoSyncPageBase");
var withPolicyConnections_1 = require("@pages/workspace/withPolicyConnections");
var CONST_1 = require("@src/CONST");
var ROUTES_1 = require("@src/ROUTES");
function CardReconciliationQuickbooksDesktopAutoSyncPage(_a) {
    var policy = _a.policy;
    var policyID = policy === null || policy === void 0 ? void 0 : policy.id;
    return (<QuickbooksDesktopAutoSyncPageBase_1.default policy={policy} navigateBackTo={ROUTES_1.default.WORKSPACE_ACCOUNTING_CARD_RECONCILIATION.getRoute(policyID, CONST_1.default.POLICY.CONNECTIONS.ROUTE.QBD)}/>);
}
CardReconciliationQuickbooksDesktopAutoSyncPage.displayName = 'CardReconciliationQuickbooksDesktopAutoSyncPage';
exports.default = (0, withPolicyConnections_1.default)(CardReconciliationQuickbooksDesktopAutoSyncPage);
