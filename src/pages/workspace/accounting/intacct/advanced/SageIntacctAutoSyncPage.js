"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var withPolicyConnections_1 = require("@pages/workspace/withPolicyConnections");
var SageIntacctAutoSyncPageBase_1 = require("./SageIntacctAutoSyncPageBase");
function SageIntacctAutoSyncPage(_a) {
    var policy = _a.policy;
    return <SageIntacctAutoSyncPageBase_1.default policy={policy}/>;
}
SageIntacctAutoSyncPage.displayName = 'SageIntacctAutoSyncPage';
exports.default = (0, withPolicyConnections_1.default)(SageIntacctAutoSyncPage);
