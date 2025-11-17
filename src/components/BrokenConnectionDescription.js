"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var useEnvironment_1 = require("@hooks/useEnvironment");
var useLocalize_1 = require("@hooks/useLocalize");
var useTransactionViolations_1 = require("@hooks/useTransactionViolations");
var PolicyUtils_1 = require("@libs/PolicyUtils");
var ReportUtils_1 = require("@libs/ReportUtils");
var CONST_1 = require("@src/CONST");
var ROUTES_1 = require("@src/ROUTES");
var RenderHTML_1 = require("./RenderHTML");
function BrokenConnectionDescription(_a) {
    var transactionID = _a.transactionID, policy = _a.policy, report = _a.report;
    var translate = (0, useLocalize_1.default)().translate;
    var transactionViolations = (0, useTransactionViolations_1.default)(transactionID);
    var environmentURL = (0, useEnvironment_1.default)().environmentURL;
    var brokenConnection530Error = transactionViolations === null || transactionViolations === void 0 ? void 0 : transactionViolations.find(function (violation) { var _a; return ((_a = violation.data) === null || _a === void 0 ? void 0 : _a.rterType) === CONST_1.default.RTER_VIOLATION_TYPES.BROKEN_CARD_CONNECTION_530; });
    var brokenConnectionError = transactionViolations === null || transactionViolations === void 0 ? void 0 : transactionViolations.find(function (violation) { var _a; return ((_a = violation.data) === null || _a === void 0 ? void 0 : _a.rterType) === CONST_1.default.RTER_VIOLATION_TYPES.BROKEN_CARD_CONNECTION; });
    var isPolicyAdmin = (0, PolicyUtils_1.isPolicyAdmin)(policy);
    var workspaceCompanyCardRoute = "".concat(environmentURL, "/").concat(ROUTES_1.default.WORKSPACE_COMPANY_CARDS.getRoute(policy === null || policy === void 0 ? void 0 : policy.id));
    if (!brokenConnection530Error && !brokenConnectionError) {
        return '';
    }
    if (brokenConnection530Error) {
        return translate('violations.brokenConnection530Error');
    }
    if (isPolicyAdmin && !(0, ReportUtils_1.isCurrentUserSubmitter)(report)) {
        return <RenderHTML_1.default html={translate('violations.adminBrokenConnectionError', { workspaceCompanyCardRoute: workspaceCompanyCardRoute })}/>;
    }
    if ((0, ReportUtils_1.isReportApproved)({ report: report }) || (0, ReportUtils_1.isReportManuallyReimbursed)(report)) {
        return translate('violations.memberBrokenConnectionError');
    }
    return "".concat(translate('violations.memberBrokenConnectionError'), " ").concat(translate('violations.markAsCashToIgnore'));
}
BrokenConnectionDescription.displayName = 'BrokenConnectionDescription';
exports.default = BrokenConnectionDescription;
