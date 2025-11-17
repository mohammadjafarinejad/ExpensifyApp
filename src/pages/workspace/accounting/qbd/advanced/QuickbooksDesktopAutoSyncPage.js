"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var withPolicyConnections_1 = require("@pages/workspace/withPolicyConnections");
var QuickbooksDesktopAutoSyncPageBase_1 = require("./QuickbooksDesktopAutoSyncPageBase");
function QuickbooksDesktopAutoSyncPage(_a) {
    var policy = _a.policy;
    return <QuickbooksDesktopAutoSyncPageBase_1.default policy={policy}/>;
}
QuickbooksDesktopAutoSyncPage.displayName = 'QuickbooksDesktopAutoSyncPage';
exports.default = (0, withPolicyConnections_1.default)(QuickbooksDesktopAutoSyncPage);
