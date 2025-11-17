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
var react_1 = require("react");
var react_native_1 = require("react-native");
var ConfirmModal_1 = require("@components/ConfirmModal");
var Expensicons = require("@components/Icon/Expensicons");
var useLocalize_1 = require("@hooks/useLocalize");
var useNetwork_1 = require("@hooks/useNetwork");
var useOnyx_1 = require("@hooks/useOnyx");
var IOU_1 = require("@libs/actions/IOU");
var Report_1 = require("@libs/actions/Report");
var getReceiptFilenameFromTransaction_1 = require("@libs/getReceiptFilenameFromTransaction");
var MergeTransactionUtils_1 = require("@libs/MergeTransactionUtils");
var Navigation_1 = require("@libs/Navigation/Navigation");
var ReceiptUtils_1 = require("@libs/ReceiptUtils");
var ReportActionsUtils_1 = require("@libs/ReportActionsUtils");
var ReportUtils_1 = require("@libs/ReportUtils");
var TransactionUtils_1 = require("@libs/TransactionUtils");
var tryResolveUrlFromApiRoot_1 = require("@libs/tryResolveUrlFromApiRoot");
var AttachmentModalContainer_1 = require("@pages/media/AttachmentModalScreen/AttachmentModalContainer");
var CONST_1 = require("@src/CONST");
var ONYXKEYS_1 = require("@src/ONYXKEYS");
var ROUTES_1 = require("@src/ROUTES");
var useDownloadAttachment_1 = require("./hooks/useDownloadAttachment");
function TransactionReceiptModalContent(_a) {
    var _b, _c, _d, _e, _f;
    var navigation = _a.navigation, route = _a.route;
    var _g = route.params, reportID = _g.reportID, transactionID = _g.transactionID, action = _g.action, iouTypeParam = _g.iouType, readonlyParam = _g.readonly, isFromReviewDuplicatesParam = _g.isFromReviewDuplicates, mergeTransactionID = _g.mergeTransactionID;
    var translate = (0, useLocalize_1.default)().translate;
    var isOffline = (0, useNetwork_1.default)().isOffline;
    var report = (0, useOnyx_1.default)("".concat(ONYXKEYS_1.default.COLLECTION.REPORT).concat(reportID), { canBeMissing: true })[0];
    var transactionMain = (0, useOnyx_1.default)("".concat(ONYXKEYS_1.default.COLLECTION.TRANSACTION).concat(transactionID), { canBeMissing: true })[0];
    var transactionDraft = (0, useOnyx_1.default)("".concat(ONYXKEYS_1.default.COLLECTION.TRANSACTION_DRAFT).concat(transactionID), { canBeMissing: true })[0];
    var _h = (0, useOnyx_1.default)("".concat(ONYXKEYS_1.default.COLLECTION.REPORT_METADATA).concat(reportID), { canBeMissing: true })[0], reportMetadata = _h === void 0 ? CONST_1.default.DEFAULT_REPORT_METADATA : _h;
    var policyCategories = (0, useOnyx_1.default)("".concat(ONYXKEYS_1.default.COLLECTION.POLICY_CATEGORIES).concat(report === null || report === void 0 ? void 0 : report.policyID), { canBeMissing: true })[0];
    // If we have a merge transaction, we need to use the receipt from the merge transaction
    var mergeTransaction = (0, useOnyx_1.default)("".concat(ONYXKEYS_1.default.COLLECTION.MERGE_TRANSACTION).concat(mergeTransactionID), { canBeMissing: true })[0];
    var isDraftTransaction = !!action;
    var draftTransactionID = isDraftTransaction ? transactionID : undefined;
    // Determine which transaction to use based on the scenario
    var transaction = (0, react_1.useMemo)(function () {
        if (isDraftTransaction) {
            return transactionDraft;
        }
        if (mergeTransactionID && mergeTransaction && transactionMain) {
            // If we have a merge transaction, we need to use the receipt from the merge transaction
            return __assign(__assign({}, transactionMain), { receipt: mergeTransaction.receipt, filename: (0, MergeTransactionUtils_1.getReceiptFileName)(mergeTransaction.receipt) });
        }
        return transactionMain;
    }, [isDraftTransaction, mergeTransaction, mergeTransactionID, transactionDraft, transactionMain]);
    var receiptURIs = (0, ReceiptUtils_1.getThumbnailAndImageURIs)(transaction);
    var isLocalFile = receiptURIs.isLocalFile;
    var isAuthTokenRequired = !isLocalFile && !isDraftTransaction;
    var readonly = readonlyParam === 'true';
    var isFromReviewDuplicates = isFromReviewDuplicatesParam === 'true';
    var source = isDraftTransaction ? (_b = transactionDraft === null || transactionDraft === void 0 ? void 0 : transactionDraft.receipt) === null || _b === void 0 ? void 0 : _b.source : (0, tryResolveUrlFromApiRoot_1.default)((_c = receiptURIs.image) !== null && _c !== void 0 ? _c : '');
    var parentReportAction = (0, ReportActionsUtils_1.getReportAction)(report === null || report === void 0 ? void 0 : report.parentReportID, report === null || report === void 0 ? void 0 : report.parentReportActionID);
    var canEditReceipt = (0, ReportUtils_1.canEditFieldOfMoneyRequest)(parentReportAction, CONST_1.default.EDIT_REQUEST_FIELD.RECEIPT);
    var canDeleteReceipt = (0, ReportUtils_1.canEditFieldOfMoneyRequest)(parentReportAction, CONST_1.default.EDIT_REQUEST_FIELD.RECEIPT, true);
    var shouldShowReplaceReceiptButton = ((canEditReceipt && !readonly) || isDraftTransaction) && !((_d = transaction === null || transaction === void 0 ? void 0 : transaction.receipt) === null || _d === void 0 ? void 0 : _d.isTestDriveReceipt);
    var shouldShowDeleteReceiptButton = canDeleteReceipt && !readonly && !isDraftTransaction && !((_e = transaction === null || transaction === void 0 ? void 0 : transaction.receipt) === null || _e === void 0 ? void 0 : _e.isTestDriveReceipt);
    var isEReceipt = transaction && !(0, TransactionUtils_1.hasReceiptSource)(transaction) && (0, TransactionUtils_1.hasEReceipt)(transaction);
    var isTrackExpenseActionValue = (0, ReportActionsUtils_1.isTrackExpenseAction)(parentReportAction);
    var iouType = (0, react_1.useMemo)(function () { return iouTypeParam !== null && iouTypeParam !== void 0 ? iouTypeParam : (isTrackExpenseActionValue ? CONST_1.default.IOU.TYPE.TRACK : CONST_1.default.IOU.TYPE.SUBMIT); }, [isTrackExpenseActionValue, iouTypeParam]);
    var _j = (0, react_1.useState)(false), isDeleteReceiptConfirmModalVisible = _j[0], setIsDeleteReceiptConfirmModalVisible = _j[1];
    (0, react_1.useEffect)(function () {
        if ((!!report && !!transaction) || isDraftTransaction) {
            return;
        }
        (0, Report_1.openReport)(reportID);
        // I'm disabling the warning, as it expects to use exhaustive deps, even though we want this useEffect to run only on the first render.
        // eslint-disable-next-line react-compiler/react-compiler, react-hooks/exhaustive-deps
    }, []);
    var receiptPath = (_f = transaction === null || transaction === void 0 ? void 0 : transaction.receipt) === null || _f === void 0 ? void 0 : _f.source;
    (0, react_1.useEffect)(function () {
        var _a;
        if (!isDraftTransaction || !iouType || !transaction) {
            return;
        }
        var requestType = (0, TransactionUtils_1.getRequestType)(transaction);
        var receiptFilename = (0, getReceiptFilenameFromTransaction_1.default)(transaction);
        var receiptType = (_a = transaction === null || transaction === void 0 ? void 0 : transaction.receipt) === null || _a === void 0 ? void 0 : _a.type;
        (0, IOU_1.navigateToStartStepIfScanFileCannotBeRead)(receiptFilename, receiptPath, function () { }, requestType, iouType, transactionID, reportID, receiptType, function () {
            return Navigation_1.default.goBack(ROUTES_1.default.MONEY_REQUEST_STEP_SCAN.getRoute(CONST_1.default.IOU.ACTION.CREATE, iouType, transactionID, reportID, ROUTES_1.default.MONEY_REQUEST_STEP_CONFIRMATION.getRoute(action, iouType, transactionID, reportID)));
        });
        // eslint-disable-next-line react-compiler/react-compiler
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [receiptPath]);
    var moneyRequestReportID = (0, ReportUtils_1.isMoneyRequestReport)(report) ? report === null || report === void 0 ? void 0 : report.reportID : report === null || report === void 0 ? void 0 : report.parentReportID;
    var isTrackExpenseReportValue = (0, ReportUtils_1.isTrackExpenseReport)(report);
    // eslint-disable-next-line rulesdir/no-negated-variables
    var shouldShowNotFoundPage = isTrackExpenseReportValue || isDraftTransaction || (transaction === null || transaction === void 0 ? void 0 : transaction.reportID) === CONST_1.default.REPORT.SPLIT_REPORT_ID || isFromReviewDuplicates
        ? !transaction
        : moneyRequestReportID !== (transaction === null || transaction === void 0 ? void 0 : transaction.reportID);
    var originalFileName = isDraftTransaction ? (0, getReceiptFilenameFromTransaction_1.default)(transaction) : receiptURIs === null || receiptURIs === void 0 ? void 0 : receiptURIs.filename;
    var headerTitle = translate('common.receipt');
    /**
     * Detach the receipt and close the modal.
     */
    var deleteReceiptAndClose = (0, react_1.useCallback)(function () {
        (0, IOU_1.detachReceipt)(transaction === null || transaction === void 0 ? void 0 : transaction.transactionID, policyCategories);
        navigation.goBack();
    }, [navigation, transaction === null || transaction === void 0 ? void 0 : transaction.transactionID, policyCategories]);
    var onDownloadAttachment = (0, useDownloadAttachment_1.default)({
        isAuthTokenRequired: isAuthTokenRequired,
        draftTransactionID: draftTransactionID,
    });
    var allowDownload = !isEReceipt;
    var threeDotsMenuItems = (0, react_1.useCallback)(function (_a) {
        var file = _a.file, innerSource = _a.source, isLocalSource = _a.isLocalSource;
        var menuItems = [];
        if (shouldShowReplaceReceiptButton) {
            menuItems.push({
                icon: Expensicons.Camera,
                text: translate('common.replace'),
                onSelected: function () {
                    Navigation_1.default.dismissModal();
                    // eslint-disable-next-line @typescript-eslint/no-deprecated
                    react_native_1.InteractionManager.runAfterInteractions(function () {
                        Navigation_1.default.navigate(ROUTES_1.default.MONEY_REQUEST_STEP_SCAN.getRoute(action !== null && action !== void 0 ? action : CONST_1.default.IOU.ACTION.EDIT, iouType, draftTransactionID !== null && draftTransactionID !== void 0 ? draftTransactionID : transaction === null || transaction === void 0 ? void 0 : transaction.transactionID, report === null || report === void 0 ? void 0 : report.reportID, Navigation_1.default.getActiveRoute()));
                    });
                },
            });
        }
        if ((!isOffline && allowDownload && !isLocalSource) || !!draftTransactionID) {
            menuItems.push({
                icon: Expensicons.Download,
                text: translate('common.download'),
                onSelected: function () { return onDownloadAttachment({ source: innerSource, file: file }); },
            });
        }
        var hasOnlyEReceipt = (0, TransactionUtils_1.hasEReceipt)(transaction) && !(0, TransactionUtils_1.hasReceiptSource)(transaction);
        if (shouldShowDeleteReceiptButton && !hasOnlyEReceipt && (0, TransactionUtils_1.hasReceipt)(transaction) && !(0, TransactionUtils_1.isReceiptBeingScanned)(transaction) && !(0, TransactionUtils_1.hasMissingSmartscanFields)(transaction)) {
            menuItems.push({
                icon: Expensicons.Trashcan,
                text: translate('receipt.deleteReceipt'),
                onSelected: function () { return setIsDeleteReceiptConfirmModalVisible === null || setIsDeleteReceiptConfirmModalVisible === void 0 ? void 0 : setIsDeleteReceiptConfirmModalVisible(true); },
                shouldCallAfterModalHide: true,
            });
        }
        return menuItems;
        // eslint-disable-next-line react-compiler/react-compiler, react-hooks/exhaustive-deps
    }, [
        shouldShowReplaceReceiptButton,
        isOffline,
        allowDownload,
        draftTransactionID,
        transaction,
        shouldShowDeleteReceiptButton,
        translate,
        action,
        iouType,
        report === null || report === void 0 ? void 0 : report.reportID,
        onDownloadAttachment,
    ]);
    var ExtraContent = (0, react_1.useMemo)(function () { return (<ConfirmModal_1.default title={translate('receipt.deleteReceipt')} isVisible={isDeleteReceiptConfirmModalVisible} onConfirm={function () { return deleteReceiptAndClose(); }} onCancel={function () { return setIsDeleteReceiptConfirmModalVisible === null || setIsDeleteReceiptConfirmModalVisible === void 0 ? void 0 : setIsDeleteReceiptConfirmModalVisible(false); }} prompt={translate('receipt.deleteConfirmation')} confirmText={translate('common.delete')} cancelText={translate('common.cancel')} danger/>); }, [deleteReceiptAndClose, isDeleteReceiptConfirmModalVisible, translate]);
    var contentProps = (0, react_1.useMemo)(function () { return ({
        source: source,
        originalFileName: originalFileName,
        report: report,
        headerTitle: headerTitle,
        threeDotsMenuItems: threeDotsMenuItems,
        isAuthTokenRequired: isAuthTokenRequired,
        isTrackExpenseAction: isTrackExpenseActionValue,
        isLoading: !transaction && (reportMetadata === null || reportMetadata === void 0 ? void 0 : reportMetadata.isLoadingInitialReportActions),
        shouldShowNotFoundPage: shouldShowNotFoundPage,
        shouldShowCarousel: false,
        onDownloadAttachment: allowDownload ? undefined : onDownloadAttachment,
        transaction: transaction,
    }); }, [
        allowDownload,
        headerTitle,
        isAuthTokenRequired,
        isTrackExpenseActionValue,
        onDownloadAttachment,
        originalFileName,
        report,
        reportMetadata === null || reportMetadata === void 0 ? void 0 : reportMetadata.isLoadingInitialReportActions,
        shouldShowNotFoundPage,
        source,
        threeDotsMenuItems,
        transaction,
    ]);
    return (<AttachmentModalContainer_1.default navigation={navigation} contentProps={contentProps} ExtraContent={ExtraContent}/>);
}
TransactionReceiptModalContent.displayName = 'TransactionReceiptModalContent';
exports.default = TransactionReceiptModalContent;
