"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var SageIntacctAutoSyncPageBase_1 = require("@pages/workspace/accounting/intacct/advanced/SageIntacctAutoSyncPageBase");
var withPolicyConnections_1 = require("@pages/workspace/withPolicyConnections");
var CONST_1 = require("@src/CONST");
var ROUTES_1 = require("@src/ROUTES");
function CardReconciliationSageIntacctAutoSyncPage(_a) {
    var policy = _a.policy;
    var policyID = policy === null || policy === void 0 ? void 0 : policy.id;
    return (<SageIntacctAutoSyncPageBase_1.default policy={policy} navigateBackTo={ROUTES_1.default.WORKSPACE_ACCOUNTING_CARD_RECONCILIATION.getRoute(policyID, CONST_1.default.POLICY.CONNECTIONS.ROUTE.SAGE_INTACCT)}/>);
}
CardReconciliationSageIntacctAutoSyncPage.displayName = 'CardReconciliationSageIntacctAutoSyncPage';
exports.default = (0, withPolicyConnections_1.default)(CardReconciliationSageIntacctAutoSyncPage);
