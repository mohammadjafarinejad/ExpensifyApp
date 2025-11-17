"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var useFilesValidation_1 = require("@hooks/useFilesValidation");
var useLocalize_1 = require("@hooks/useLocalize");
var useOnyx_1 = require("@hooks/useOnyx");
var FileUtils_1 = require("@libs/fileDownload/FileUtils");
var ReportUtils_1 = require("@libs/ReportUtils");
var SubscriptionUtils_1 = require("@libs/SubscriptionUtils");
var Navigation_1 = require("@navigation/Navigation");
var AttachmentModalContext_1 = require("@pages/media/AttachmentModalScreen/AttachmentModalContext");
var IOU_1 = require("@userActions/IOU");
var TransactionEdit_1 = require("@userActions/TransactionEdit");
var CONST_1 = require("@src/CONST");
var ONYXKEYS_1 = require("@src/ONYXKEYS");
var ROUTES_1 = require("@src/ROUTES");
function useAttachmentUploadValidation(_a) {
    var policy = _a.policy, reportID = _a.reportID, addAttachment = _a.addAttachment, onAttachmentPreviewClose = _a.onAttachmentPreviewClose, exceededMaxLength = _a.exceededMaxLength, shouldAddOrReplaceReceipt = _a.shouldAddOrReplaceReceipt, transactionID = _a.transactionID, report = _a.report, newParentReport = _a.newParentReport, currentDate = _a.currentDate, currentUserPersonalDetails = _a.currentUserPersonalDetails, isAttachmentPreviewActive = _a.isAttachmentPreviewActive, setIsAttachmentPreviewActive = _a.setIsAttachmentPreviewActive;
    var translate = (0, useLocalize_1.default)().translate;
    var policyCategories = (0, useOnyx_1.default)("".concat(ONYXKEYS_1.default.COLLECTION.POLICY_CATEGORIES).concat(policy === null || policy === void 0 ? void 0 : policy.id), { canBeMissing: true })[0];
    var reportAttachmentsContext = (0, react_1.useContext)(AttachmentModalContext_1.default);
    var showAttachmentModalScreen = (0, react_1.useCallback)(function (file, dataTransferItems) {
        reportAttachmentsContext.setCurrentAttachment({
            reportID: reportID,
            file: file,
            dataTransferItems: dataTransferItems,
            headerTitle: translate('reportActionCompose.sendAttachment'),
            onConfirm: addAttachment,
            onShow: function () { return setIsAttachmentPreviewActive(true); },
            onClose: onAttachmentPreviewClose,
            shouldDisableSendButton: !!exceededMaxLength,
        });
        Navigation_1.default.navigate(ROUTES_1.default.REPORT_ADD_ATTACHMENT.getRoute(reportID));
    }, [addAttachment, exceededMaxLength, onAttachmentPreviewClose, reportAttachmentsContext, reportID, setIsAttachmentPreviewActive, translate]);
    var attachmentUploadType = (0, react_1.useRef)(undefined);
    var onFilesValidated = function (files, dataTransferItems) {
        if (files.length === 0) {
            return;
        }
        if (attachmentUploadType.current === 'attachment') {
            showAttachmentModalScreen(files, dataTransferItems);
            return;
        }
        if (shouldAddOrReplaceReceipt && transactionID) {
            var source = URL.createObjectURL(files.at(0));
            (0, IOU_1.replaceReceipt)({ transactionID: transactionID, file: files.at(0), source: source, transactionPolicyCategories: policyCategories });
            return;
        }
        var initialTransaction = (0, IOU_1.initMoneyRequest)({
            reportID: reportID,
            newIouRequestType: CONST_1.default.IOU.REQUEST_TYPE.SCAN,
            report: report,
            parentReport: newParentReport,
            currentDate: currentDate,
            currentUserPersonalDetails: currentUserPersonalDetails,
        });
        files.forEach(function (file, index) {
            var _a, _b;
            var source = URL.createObjectURL(file);
            var newTransaction = index === 0
                ? initialTransaction
                : (0, TransactionEdit_1.buildOptimisticTransactionAndCreateDraft)({
                    initialTransaction: initialTransaction,
                    currentUserPersonalDetails: currentUserPersonalDetails,
                    reportID: reportID,
                });
            var newTransactionID = (_a = newTransaction === null || newTransaction === void 0 ? void 0 : newTransaction.transactionID) !== null && _a !== void 0 ? _a : CONST_1.default.IOU.OPTIMISTIC_TRANSACTION_ID;
            (0, IOU_1.setMoneyRequestReceipt)(newTransactionID, source, (_b = file.name) !== null && _b !== void 0 ? _b : '', true, file.type);
            (0, IOU_1.setMoneyRequestParticipantsFromReport)(newTransactionID, report);
        });
        Navigation_1.default.navigate(ROUTES_1.default.MONEY_REQUEST_STEP_CONFIRMATION.getRoute(CONST_1.default.IOU.ACTION.CREATE, (0, ReportUtils_1.isSelfDM)(report) ? CONST_1.default.IOU.TYPE.TRACK : CONST_1.default.IOU.TYPE.SUBMIT, CONST_1.default.IOU.OPTIMISTIC_TRANSACTION_ID, reportID));
    };
    var _b = (0, useFilesValidation_1.default)(onFilesValidated), validateFiles = _b.validateFiles, PDFValidationComponent = _b.PDFValidationComponent, ErrorModal = _b.ErrorModal;
    var validateAttachments = (0, react_1.useCallback)(function (_a) {
        var _b, _c;
        var dragEvent = _a.dragEvent, files = _a.files;
        if (isAttachmentPreviewActive) {
            return;
        }
        var extractedFiles = [];
        if (files) {
            extractedFiles = Array.isArray(files) ? files : [files];
        }
        else {
            if (!dragEvent) {
                return;
            }
            extractedFiles = (0, FileUtils_1.getFilesFromClipboardEvent)(dragEvent);
        }
        var dataTransferItems = Array.from((_c = (_b = dragEvent === null || dragEvent === void 0 ? void 0 : dragEvent.dataTransfer) === null || _b === void 0 ? void 0 : _b.items) !== null && _c !== void 0 ? _c : []);
        if (extractedFiles.length === 0) {
            return;
        }
        var validIndices = [];
        var fileObjects = extractedFiles
            .map(function (item, index) {
            var fileObject = (0, FileUtils_1.cleanFileObject)(item);
            var cleanedFileObject = (0, FileUtils_1.cleanFileObjectName)(fileObject);
            if (cleanedFileObject !== null) {
                validIndices.push(index);
            }
            return cleanedFileObject;
        })
            .filter(function (fileObject) { return fileObject !== null; });
        if (!fileObjects.length) {
            return;
        }
        // Create a filtered items array that matches the fileObjects
        var filteredItems = dataTransferItems && validIndices.length > 0 ? validIndices.map(function (index) { var _a; return (_a = dataTransferItems.at(index)) !== null && _a !== void 0 ? _a : {}; }) : undefined;
        attachmentUploadType.current = 'attachment';
        validateFiles(fileObjects, filteredItems, { isValidatingReceipts: false });
    }, [isAttachmentPreviewActive, validateFiles]);
    var onReceiptDropped = (0, react_1.useCallback)(function (e) {
        var _a, _b;
        if (policy && (0, SubscriptionUtils_1.shouldRestrictUserBillableActions)(policy.id)) {
            Navigation_1.default.navigate(ROUTES_1.default.RESTRICTED_ACTION.getRoute(policy.id));
            return;
        }
        var files = (0, FileUtils_1.getFilesFromClipboardEvent)(e);
        var items = Array.from((_b = (_a = e.dataTransfer) === null || _a === void 0 ? void 0 : _a.items) !== null && _b !== void 0 ? _b : []);
        if (shouldAddOrReplaceReceipt && transactionID) {
            var file = files.at(0);
            if (!file) {
                return;
            }
            attachmentUploadType.current = 'receipt';
            validateFiles([file], items);
        }
        attachmentUploadType.current = 'receipt';
        validateFiles(files, items, { isValidatingReceipts: true });
    }, [policy, shouldAddOrReplaceReceipt, transactionID, validateFiles]);
    return {
        validateAttachments: validateAttachments,
        onReceiptDropped: onReceiptDropped,
        PDFValidationComponent: PDFValidationComponent,
        ErrorModal: ErrorModal,
    };
}
exports.default = useAttachmentUploadValidation;
