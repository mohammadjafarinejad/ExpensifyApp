"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var mapValues_1 = require("lodash/mapValues");
var react_1 = require("react");
var react_native_1 = require("react-native");
var ConfirmModal_1 = require("@components/ConfirmModal");
var OfflineWithFeedback_1 = require("@components/OfflineWithFeedback");
var ReceiptAudit_1 = require("@components/ReceiptAudit");
var ReceiptEmptyState_1 = require("@components/ReceiptEmptyState");
var useActiveRoute_1 = require("@hooks/useActiveRoute");
var useEnvironment_1 = require("@hooks/useEnvironment");
var useGetIOUReportFromReportAction_1 = require("@hooks/useGetIOUReportFromReportAction");
var useLocalize_1 = require("@hooks/useLocalize");
var useOnyx_1 = require("@hooks/useOnyx");
var useReportIsArchived_1 = require("@hooks/useReportIsArchived");
var useResponsiveLayout_1 = require("@hooks/useResponsiveLayout");
var useThemeStyles_1 = require("@hooks/useThemeStyles");
var useTransactionViolations_1 = require("@hooks/useTransactionViolations");
var ErrorUtils_1 = require("@libs/ErrorUtils");
var getNonEmptyStringOnyxID_1 = require("@libs/getNonEmptyStringOnyxID");
var ReceiptUtils_1 = require("@libs/ReceiptUtils");
var ReportActionsUtils_1 = require("@libs/ReportActionsUtils");
var ReportUtils_1 = require("@libs/ReportUtils");
var TransactionUtils_1 = require("@libs/TransactionUtils");
var ViolationsUtils_1 = require("@libs/Violations/ViolationsUtils");
var Navigation_1 = require("@navigation/Navigation");
var IOU_1 = require("@userActions/IOU");
var Report_1 = require("@userActions/Report");
var ReportActions_1 = require("@userActions/ReportActions");
var Transaction_1 = require("@userActions/Transaction");
var CONST_1 = require("@src/CONST");
var ONYXKEYS_1 = require("@src/ONYXKEYS");
var ROUTES_1 = require("@src/ROUTES");
var EmptyObject_1 = require("@src/types/utils/EmptyObject");
var ReportActionItemImage_1 = require("./ReportActionItemImage");
var receiptImageViolationNames = new Set([
    CONST_1.default.VIOLATIONS.RECEIPT_REQUIRED,
    CONST_1.default.VIOLATIONS.RECEIPT_NOT_SMART_SCANNED,
    CONST_1.default.VIOLATIONS.CASH_EXPENSE_WITH_NO_RECEIPT,
    CONST_1.default.VIOLATIONS.SMARTSCAN_FAILED,
    CONST_1.default.VIOLATIONS.PROHIBITED_EXPENSE,
    CONST_1.default.VIOLATIONS.RECEIPT_GENERATED_WITH_AI,
]);
var receiptFieldViolationNames = new Set([CONST_1.default.VIOLATIONS.MODIFIED_AMOUNT, CONST_1.default.VIOLATIONS.MODIFIED_DATE]);
function MoneyRequestReceiptView(_a) {
    var _b, _c;
    var allReports = _a.allReports, report = _a.report, _d = _a.readonly, readonly = _d === void 0 ? false : _d, updatedTransaction = _a.updatedTransaction, _e = _a.isFromReviewDuplicates, isFromReviewDuplicates = _e === void 0 ? false : _e, _f = _a.fillSpace, fillSpace = _f === void 0 ? false : _f, mergeTransactionID = _a.mergeTransactionID, _g = _a.isDisplayedInWideRHP, isDisplayedInWideRHP = _g === void 0 ? false : _g;
    var styles = (0, useThemeStyles_1.default)();
    var translate = (0, useLocalize_1.default)().translate;
    var environmentURL = (0, useEnvironment_1.default)().environmentURL;
    var _h = (0, useResponsiveLayout_1.default)(), shouldUseNarrowLayout = _h.shouldUseNarrowLayout, isInNarrowPaneModal = _h.isInNarrowPaneModal;
    var getReportRHPActiveRoute = (0, useActiveRoute_1.default)().getReportRHPActiveRoute;
    var parentReportID = report === null || report === void 0 ? void 0 : report.parentReportID;
    var parentReport = allReports === null || allReports === void 0 ? void 0 : allReports["".concat(ONYXKEYS_1.default.COLLECTION.REPORT).concat(parentReportID)];
    var chatReport = allReports === null || allReports === void 0 ? void 0 : allReports["".concat(ONYXKEYS_1.default.COLLECTION.REPORT).concat(parentReport === null || parentReport === void 0 ? void 0 : parentReport.parentReportID)];
    var parentReportActions = (0, useOnyx_1.default)("".concat(ONYXKEYS_1.default.COLLECTION.REPORT_ACTIONS).concat(parentReportID), {
        canEvict: false,
        canBeMissing: true,
    })[0];
    var _j = (0, react_1.useState)(true), isLoading = _j[0], setIsLoading = _j[1];
    var parentReportAction = (report === null || report === void 0 ? void 0 : report.parentReportActionID) ? parentReportActions === null || parentReportActions === void 0 ? void 0 : parentReportActions[report.parentReportActionID] : undefined;
    var _k = (0, useGetIOUReportFromReportAction_1.default)(parentReportAction), iouReport = _k.iouReport, chatIOUReport = _k.chatReport, isChatIOUReportArchived = _k.isChatIOUReportArchived;
    var isTrackExpense = (0, ReportUtils_1.isTrackExpenseReport)(report);
    var moneyRequestReport = parentReport;
    var linkedTransactionID = (0, react_1.useMemo)(function () {
        if (!parentReportAction) {
            return undefined;
        }
        var originalMessage = parentReportAction && (0, ReportActionsUtils_1.isMoneyRequestAction)(parentReportAction) ? (0, ReportActionsUtils_1.getOriginalMessage)(parentReportAction) : undefined;
        return originalMessage === null || originalMessage === void 0 ? void 0 : originalMessage.IOUTransactionID;
    }, [parentReportAction]);
    var transaction = (0, useOnyx_1.default)("".concat(ONYXKEYS_1.default.COLLECTION.TRANSACTION).concat((0, getNonEmptyStringOnyxID_1.default)(linkedTransactionID)), { canBeMissing: true })[0];
    var policy = (0, useOnyx_1.default)("".concat(ONYXKEYS_1.default.COLLECTION.POLICY).concat(moneyRequestReport === null || moneyRequestReport === void 0 ? void 0 : moneyRequestReport.policyID), { canBeMissing: true })[0];
    var transactionViolations = (0, useTransactionViolations_1.default)(transaction === null || transaction === void 0 ? void 0 : transaction.transactionID);
    var isDistanceRequest = (0, TransactionUtils_1.isDistanceRequest)(transaction);
    var hasReceipt = (0, TransactionUtils_1.hasReceipt)(updatedTransaction !== null && updatedTransaction !== void 0 ? updatedTransaction : transaction);
    var isTransactionScanning = (0, TransactionUtils_1.isScanning)(updatedTransaction !== null && updatedTransaction !== void 0 ? updatedTransaction : transaction);
    var didReceiptScanSucceed = hasReceipt && (0, TransactionUtils_1.didReceiptScanSucceed)(transaction);
    var isInvoice = (0, ReportUtils_1.isInvoiceReport)(moneyRequestReport);
    var isChatReportArchived = (0, useReportIsArchived_1.default)(moneyRequestReport === null || moneyRequestReport === void 0 ? void 0 : moneyRequestReport.chatReportID);
    // Flags for allowing or disallowing editing an expense
    // Used for non-restricted fields such as: description, category, tag, billable, etc...
    var isReportArchived = (0, useReportIsArchived_1.default)(report === null || report === void 0 ? void 0 : report.reportID);
    var isEditable = !!(0, ReportUtils_1.canUserPerformWriteAction)(report, isReportArchived) && !readonly;
    var canEdit = (0, ReportActionsUtils_1.isMoneyRequestAction)(parentReportAction) && (0, ReportUtils_1.canEditMoneyRequest)(parentReportAction, isChatReportArchived, moneyRequestReport, policy, transaction) && isEditable;
    var companyCardPageURL = "".concat(environmentURL, "/").concat(ROUTES_1.default.WORKSPACE_COMPANY_CARDS.getRoute(report === null || report === void 0 ? void 0 : report.policyID));
    var canEditReceipt = isEditable && (0, ReportUtils_1.canEditFieldOfMoneyRequest)(parentReportAction, CONST_1.default.EDIT_REQUEST_FIELD.RECEIPT, undefined, isChatReportArchived);
    var iouType = (0, react_1.useMemo)(function () {
        if (isTrackExpense) {
            return CONST_1.default.IOU.TYPE.TRACK;
        }
        if (isInvoice) {
            return CONST_1.default.IOU.TYPE.INVOICE;
        }
        return CONST_1.default.IOU.TYPE.SUBMIT;
    }, [isTrackExpense, isInvoice]);
    var receiptURIs;
    if (hasReceipt) {
        receiptURIs = (0, ReceiptUtils_1.getThumbnailAndImageURIs)(updatedTransaction !== null && updatedTransaction !== void 0 ? updatedTransaction : transaction);
    }
    var pendingAction = transaction === null || transaction === void 0 ? void 0 : transaction.pendingAction;
    // Need to return undefined when we have pendingAction to avoid the duplicate pending action
    var getPendingFieldAction = function (fieldPath) { var _a; return (pendingAction ? undefined : (_a = transaction === null || transaction === void 0 ? void 0 : transaction.pendingFields) === null || _a === void 0 ? void 0 : _a[fieldPath]); };
    var transactionToCheck = updatedTransaction !== null && updatedTransaction !== void 0 ? updatedTransaction : transaction;
    var doesTransactionHaveReceipt = !!(transactionToCheck === null || transactionToCheck === void 0 ? void 0 : transactionToCheck.receipt) && !(0, EmptyObject_1.isEmptyObject)(transactionToCheck === null || transactionToCheck === void 0 ? void 0 : transactionToCheck.receipt);
    var shouldShowReceiptEmptyState = !isInvoice && !hasReceipt && !!transaction && !doesTransactionHaveReceipt;
    var _l = (0, react_1.useMemo)(function () {
        var imageViolations = [];
        var allViolations = [];
        for (var _i = 0, _a = transactionViolations !== null && transactionViolations !== void 0 ? transactionViolations : []; _i < _a.length; _i++) {
            var violation = _a[_i];
            var isReceiptFieldViolation = receiptFieldViolationNames.has(violation.name);
            var isReceiptImageViolation = receiptImageViolationNames.has(violation.name);
            if (isReceiptFieldViolation || isReceiptImageViolation) {
                var violationMessage = ViolationsUtils_1.default.getViolationTranslation(violation, translate, canEdit, undefined, companyCardPageURL);
                allViolations.push(violationMessage);
                if (isReceiptImageViolation) {
                    imageViolations.push(violationMessage);
                }
            }
        }
        return [imageViolations, allViolations];
    }, [transactionViolations, translate, canEdit, companyCardPageURL]), receiptImageViolations = _l[0], receiptViolations = _l[1];
    var receiptRequiredViolation = transactionViolations === null || transactionViolations === void 0 ? void 0 : transactionViolations.some(function (violation) { return violation.name === CONST_1.default.VIOLATIONS.RECEIPT_REQUIRED; });
    var customRulesViolation = transactionViolations === null || transactionViolations === void 0 ? void 0 : transactionViolations.some(function (violation) { return violation.name === CONST_1.default.VIOLATIONS.CUSTOM_RULES; });
    // Whether to show receipt audit result (e.g.`Verified`, `Issue Found`) and messages (e.g. `Receipt not verified. Please confirm accuracy.`)
    // `!!(receiptViolations.length || didReceiptScanSucceed)` is for not showing `Verified` when `receiptViolations` is empty and `didReceiptScanSucceed` is false.
    var shouldShowAuditMessage = !isTransactionScanning && (hasReceipt || !!receiptRequiredViolation || !!customRulesViolation) && !!(receiptViolations.length || didReceiptScanSucceed) && (0, ReportUtils_1.isPaidGroupPolicy)(report);
    var shouldShowReceiptAudit = !isInvoice && (shouldShowReceiptEmptyState || hasReceipt);
    var errorsWithoutReportCreation = (0, react_1.useMemo)(function () {
        var _a, _b, _c, _d;
        return (__assign(__assign({}, ((_d = (_b = (_a = transaction === null || transaction === void 0 ? void 0 : transaction.errorFields) === null || _a === void 0 ? void 0 : _a.route) !== null && _b !== void 0 ? _b : (_c = transaction === null || transaction === void 0 ? void 0 : transaction.errorFields) === null || _c === void 0 ? void 0 : _c.waypoints) !== null && _d !== void 0 ? _d : transaction === null || transaction === void 0 ? void 0 : transaction.errors)), parentReportAction === null || parentReportAction === void 0 ? void 0 : parentReportAction.errors));
    }, [(_b = transaction === null || transaction === void 0 ? void 0 : transaction.errorFields) === null || _b === void 0 ? void 0 : _b.route, (_c = transaction === null || transaction === void 0 ? void 0 : transaction.errorFields) === null || _c === void 0 ? void 0 : _c.waypoints, transaction === null || transaction === void 0 ? void 0 : transaction.errors, parentReportAction === null || parentReportAction === void 0 ? void 0 : parentReportAction.errors]);
    var reportCreationError = (0, react_1.useMemo)(function () { return ((0, ReportUtils_1.getCreationReportErrors)(report) ? (0, ErrorUtils_1.getMicroSecondOnyxErrorWithTranslationKey)('report.genericCreateReportFailureMessage') : {}); }, [report]);
    var errors = (0, react_1.useMemo)(function () { return (__assign(__assign({}, errorsWithoutReportCreation), reportCreationError)); }, [errorsWithoutReportCreation, reportCreationError]);
    var showReceiptErrorWithEmptyState = shouldShowReceiptEmptyState && !hasReceipt && !(0, EmptyObject_1.isEmptyObject)(errors);
    var _m = (0, react_1.useState)(false), showConfirmDismissReceiptError = _m[0], setShowConfirmDismissReceiptError = _m[1];
    var dismissReceiptError = (0, react_1.useCallback)(function () {
        var _a;
        if (!(report === null || report === void 0 ? void 0 : report.reportID)) {
            return;
        }
        if ((transaction === null || transaction === void 0 ? void 0 : transaction.pendingAction) === CONST_1.default.RED_BRICK_ROAD_PENDING_ACTION.ADD) {
            if ((chatReport === null || chatReport === void 0 ? void 0 : chatReport.reportID) && (0, ReportUtils_1.getCreationReportErrors)(chatReport)) {
                (0, Report_1.navigateToConciergeChatAndDeleteReport)(chatReport.reportID, true, true);
                return;
            }
            if (parentReportAction) {
                (0, IOU_1.cleanUpMoneyRequest)((_a = transaction === null || transaction === void 0 ? void 0 : transaction.transactionID) !== null && _a !== void 0 ? _a : linkedTransactionID, parentReportAction, report.reportID, iouReport, chatIOUReport, isChatIOUReportArchived, true);
                return;
            }
        }
        if (!(transaction === null || transaction === void 0 ? void 0 : transaction.transactionID)) {
            if (!linkedTransactionID) {
                return;
            }
            (0, Transaction_1.clearError)(linkedTransactionID);
            (0, ReportActions_1.clearAllRelatedReportActionErrors)(report.reportID, parentReportAction);
            return;
        }
        if (!(0, EmptyObject_1.isEmptyObject)(errorsWithoutReportCreation)) {
            (0, Transaction_1.revert)(transaction, (0, Transaction_1.getLastModifiedExpense)(report === null || report === void 0 ? void 0 : report.reportID));
            (0, Transaction_1.clearError)(transaction.transactionID);
            (0, ReportActions_1.clearAllRelatedReportActionErrors)(report.reportID, parentReportAction);
        }
        if (!(0, EmptyObject_1.isEmptyObject)(reportCreationError)) {
            if (isInNarrowPaneModal) {
                Navigation_1.default.goBack();
            }
            (0, Report_1.navigateToConciergeChatAndDeleteReport)(report.reportID, true, true);
        }
    }, [
        transaction,
        chatReport,
        parentReportAction,
        linkedTransactionID,
        report === null || report === void 0 ? void 0 : report.reportID,
        iouReport,
        chatIOUReport,
        isChatIOUReportArchived,
        errorsWithoutReportCreation,
        reportCreationError,
        isInNarrowPaneModal,
    ]);
    var receiptStyle;
    if (fillSpace && shouldShowReceiptEmptyState) {
        receiptStyle = styles.h100;
    }
    else if (fillSpace) {
        receiptStyle = styles.flexibleHeight;
    }
    else {
        receiptStyle = shouldUseNarrowLayout ? styles.expenseViewImageSmall : styles.expenseViewImage;
    }
    var showBorderlessLoading = isLoading && fillSpace;
    var receiptAuditMessagesRow = (<react_native_1.View style={[styles.mt3, (0, EmptyObject_1.isEmptyObject)(errors) && isDisplayedInWideRHP && styles.mb3]}>
            <ReceiptAudit_1.ReceiptAuditMessages notes={receiptImageViolations}/>
        </react_native_1.View>);
    // For empty receipt should be fullHeight
    // For the rest, expand to match the content
    return (<react_native_1.View style={fillSpace ? styles.flex1 : styles.pRelative}>
            {shouldShowReceiptAudit && (<OfflineWithFeedback_1.default pendingAction={getPendingFieldAction('receipt')}>
                    <ReceiptAudit_1.default notes={receiptViolations} shouldShowAuditResult={!!shouldShowAuditMessage}/>
                </OfflineWithFeedback_1.default>)}
            {shouldShowReceiptEmptyState && (<OfflineWithFeedback_1.default pendingAction={getPendingFieldAction('receipt')} style={[styles.mt3, (0, EmptyObject_1.isEmptyObject)(errors) && styles.mb3, styles.flex1]} contentContainerStyle={styles.flex1}>
                    <ReceiptEmptyState_1.default disabled={!canEditReceipt} onPress={function () {
                if (!(transaction === null || transaction === void 0 ? void 0 : transaction.transactionID) || !(report === null || report === void 0 ? void 0 : report.reportID)) {
                    return;
                }
                Navigation_1.default.navigate(ROUTES_1.default.MONEY_REQUEST_STEP_SCAN.getRoute(CONST_1.default.IOU.ACTION.EDIT, iouType, transaction.transactionID, report.reportID, getReportRHPActiveRoute()));
            }} isThumbnail={!canEditReceipt} isInMoneyRequestView style={receiptStyle}/>
                </OfflineWithFeedback_1.default>)}
            {(hasReceipt || !(0, EmptyObject_1.isEmptyObject)(errors)) && (<OfflineWithFeedback_1.default pendingAction={isDistanceRequest ? getPendingFieldAction('waypoints') : getPendingFieldAction('receipt')} errors={errors} errorRowStyles={[styles.mh4, !shouldShowReceiptEmptyState && styles.mt3]} onClose={function () {
                if (!(transaction === null || transaction === void 0 ? void 0 : transaction.transactionID) && !linkedTransactionID) {
                    return;
                }
                var errorEntries = Object.entries(errors !== null && errors !== void 0 ? errors : {});
                var errorMessages = (0, mapValues_1.default)(Object.fromEntries(errorEntries), function (error) { return error; });
                var hasReceiptError = Object.values(errorMessages).some(function (error) { return (0, ErrorUtils_1.isReceiptError)(error); });
                if (hasReceiptError) {
                    setShowConfirmDismissReceiptError(true);
                }
                else {
                    dismissReceiptError();
                }
            }} dismissError={dismissReceiptError} style={[shouldShowAuditMessage ? styles.mt3 : styles.mv3, !showReceiptErrorWithEmptyState && styles.flex1]} contentContainerStyle={styles.flex1}>
                    {hasReceipt && (<react_native_1.View style={[styles.getMoneyRequestViewImage(showBorderlessLoading), receiptStyle, showBorderlessLoading && styles.flex1]}>
                            <ReportActionItemImage_1.default shouldUseThumbnailImage={!fillSpace} shouldUseFullHeight={fillSpace} thumbnail={receiptURIs === null || receiptURIs === void 0 ? void 0 : receiptURIs.thumbnail} fileExtension={receiptURIs === null || receiptURIs === void 0 ? void 0 : receiptURIs.fileExtension} isThumbnail={receiptURIs === null || receiptURIs === void 0 ? void 0 : receiptURIs.isThumbnail} image={receiptURIs === null || receiptURIs === void 0 ? void 0 : receiptURIs.image} isLocalFile={receiptURIs === null || receiptURIs === void 0 ? void 0 : receiptURIs.isLocalFile} filename={receiptURIs === null || receiptURIs === void 0 ? void 0 : receiptURIs.filename} transaction={updatedTransaction !== null && updatedTransaction !== void 0 ? updatedTransaction : transaction} enablePreviewModal readonly={readonly || !canEditReceipt} isFromReviewDuplicates={isFromReviewDuplicates} mergeTransactionID={mergeTransactionID} report={report} onLoad={function () { return setIsLoading(false); }} onLoadFailure={function () { return setIsLoading(false); }}/>
                        </react_native_1.View>)}
                    {/* For WideRHP (fillSpace is true), we need to wait for the image to load to get the correct size, then display the violation message to avoid the jumping issue.
                Otherwise (when fillSpace is false), we use a fixed size, so there's no need to wait for the image to load. */}
                    {!!shouldShowAuditMessage && hasReceipt && (!isLoading || !fillSpace) && receiptAuditMessagesRow}
                </OfflineWithFeedback_1.default>)}
            {!shouldShowReceiptEmptyState && !hasReceipt && <react_native_1.View style={{ marginVertical: 6 }}/>}
            {!!shouldShowAuditMessage && !hasReceipt && receiptAuditMessagesRow}
            <ConfirmModal_1.default isVisible={showConfirmDismissReceiptError} onConfirm={function () {
            dismissReceiptError();
            setShowConfirmDismissReceiptError(false);
        }} onCancel={function () {
            setShowConfirmDismissReceiptError(false);
        }} title={translate('iou.dismissReceiptError')} prompt={translate('iou.dismissReceiptErrorConfirmation')} confirmText={translate('common.dismiss')} cancelText={translate('common.cancel')} shouldShowCancelButton danger/>
        </react_native_1.View>);
}
MoneyRequestReceiptView.displayName = 'MoneyRequestReceiptView';
exports.default = MoneyRequestReceiptView;
