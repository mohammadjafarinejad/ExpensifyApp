"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var useCurrentUserPersonalDetails_1 = require("@hooks/useCurrentUserPersonalDetails");
var useLocalize_1 = require("@hooks/useLocalize");
var useOnyx_1 = require("@hooks/useOnyx");
var usePermissions_1 = require("@hooks/usePermissions");
var usePolicy_1 = require("@hooks/usePolicy");
var useResponsiveLayout_1 = require("@hooks/useResponsiveLayout");
var ReportUtils_1 = require("@libs/ReportUtils");
var IOU_1 = require("@userActions/IOU");
var CONST_1 = require("@src/CONST");
var ONYXKEYS_1 = require("@src/ONYXKEYS");
var DecisionModal_1 = require("./DecisionModal");
function ProcessMoneyReportHoldMenu(_a) {
    var requestType = _a.requestType, nonHeldAmount = _a.nonHeldAmount, fullAmount = _a.fullAmount, onClose = _a.onClose, isVisible = _a.isVisible, paymentType = _a.paymentType, chatReport = _a.chatReport, moneyRequestReport = _a.moneyRequestReport, transactionCount = _a.transactionCount, startAnimation = _a.startAnimation;
    var translate = (0, useLocalize_1.default)().translate;
    var isApprove = requestType === CONST_1.default.IOU.REPORT_ACTION_TYPE.APPROVE;
    // We need to use isSmallScreenWidth instead of shouldUseNarrowLayout to apply the correct modal type
    // eslint-disable-next-line rulesdir/prefer-shouldUseNarrowLayout-instead-of-isSmallScreenWidth
    var isSmallScreenWidth = (0, useResponsiveLayout_1.default)().isSmallScreenWidth;
    var activePolicyID = (0, useOnyx_1.default)(ONYXKEYS_1.default.NVP_ACTIVE_POLICY_ID, { canBeMissing: true })[0];
    var activePolicy = (0, usePolicy_1.default)(activePolicyID);
    var introSelected = (0, useOnyx_1.default)(ONYXKEYS_1.default.NVP_INTRO_SELECTED, { canBeMissing: true })[0];
    var isBetaEnabled = (0, usePermissions_1.default)().isBetaEnabled;
    var transactionViolations = (0, useOnyx_1.default)(ONYXKEYS_1.default.COLLECTION.TRANSACTION_VIOLATIONS, { canBeMissing: true })[0];
    var isASAPSubmitBetaEnabled = isBetaEnabled(CONST_1.default.BETAS.ASAP_SUBMIT);
    var hasViolations = (0, ReportUtils_1.hasViolations)(moneyRequestReport === null || moneyRequestReport === void 0 ? void 0 : moneyRequestReport.reportID, transactionViolations);
    var currentUserDetails = (0, useCurrentUserPersonalDetails_1.default)();
    var onSubmit = function (full) {
        var _a;
        if (isApprove) {
            if (startAnimation) {
                startAnimation();
            }
            (0, IOU_1.approveMoneyRequest)(moneyRequestReport, activePolicy, currentUserDetails.accountID, (_a = currentUserDetails.email) !== null && _a !== void 0 ? _a : '', hasViolations, isASAPSubmitBetaEnabled, full);
        }
        else if (chatReport && paymentType) {
            if (startAnimation) {
                startAnimation();
            }
            (0, IOU_1.payMoneyRequest)(paymentType, chatReport, moneyRequestReport, introSelected, undefined, full, activePolicy);
        }
        onClose();
    };
    var promptText = (0, react_1.useMemo)(function () {
        if (nonHeldAmount) {
            return translate(isApprove ? 'iou.confirmApprovalAmount' : 'iou.confirmPayAmount');
        }
        return translate(isApprove ? 'iou.confirmApprovalAllHoldAmount' : 'iou.confirmPayAllHoldAmount', { count: transactionCount });
    }, [nonHeldAmount, transactionCount, translate, isApprove]);
    return (<DecisionModal_1.default title={translate(isApprove ? 'iou.confirmApprove' : 'iou.confirmPay')} onClose={onClose} isVisible={isVisible} prompt={promptText} firstOptionText={nonHeldAmount ? "".concat(translate(isApprove ? 'iou.approveOnly' : 'iou.payOnly'), " ").concat(nonHeldAmount) : undefined} secondOptionText={"".concat(translate(isApprove ? 'iou.approve' : 'iou.pay'), " ").concat(fullAmount)} onFirstOptionSubmit={function () { return onSubmit(false); }} onSecondOptionSubmit={function () { return onSubmit(true); }} isSmallScreenWidth={isSmallScreenWidth}/>);
}
ProcessMoneyReportHoldMenu.displayName = 'ProcessMoneyReportHoldMenu';
exports.default = ProcessMoneyReportHoldMenu;
