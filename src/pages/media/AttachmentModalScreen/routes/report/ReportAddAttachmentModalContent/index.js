"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var useNetwork_1 = require("@hooks/useNetwork");
var useOnyx_1 = require("@hooks/useOnyx");
var Report_1 = require("@libs/actions/Report");
var AttachmentUtils_1 = require("@libs/AttachmentUtils");
var AvatarUtils_1 = require("@libs/AvatarUtils");
var ReportUtils_1 = require("@libs/ReportUtils");
var AttachmentModalContainer_1 = require("@pages/media/AttachmentModalScreen/AttachmentModalContainer");
var useDownloadAttachment_1 = require("@pages/media/AttachmentModalScreen/routes/hooks/useDownloadAttachment");
var useNavigateToReportOnRefresh_1 = require("@pages/media/AttachmentModalScreen/routes/hooks/useNavigateToReportOnRefresh");
var useReportAttachmentModalType_1 = require("@pages/media/AttachmentModalScreen/routes/hooks/useReportAttachmentModalType");
var CONST_1 = require("@src/CONST");
var ONYXKEYS_1 = require("@src/ONYXKEYS");
var EmptyObject_1 = require("@src/types/utils/EmptyObject");
var AddAttachmentModalCarouselView_1 = require("./AddAttachmentModalCarouselView");
function ReportAddAttachmentModalContent(_a) {
    var route = _a.route, navigation = _a.navigation;
    var _b = route.params, attachmentID = _b.attachmentID, fileParam = _b.file, sourceParam = _b.source, isAuthTokenRequired = _b.isAuthTokenRequired, attachmentLink = _b.attachmentLink, originalFileName = _b.originalFileName, _c = _b.accountID, accountID = _c === void 0 ? CONST_1.default.DEFAULT_NUMBER_ID : _c, reportID = _b.reportID, shouldDisableSendButton = _b.shouldDisableSendButton, headerTitle = _b.headerTitle, onConfirmParam = _b.onConfirm, onShow = _b.onShow, onClose = _b.onClose;
    var report = (0, useOnyx_1.default)("".concat(ONYXKEYS_1.default.COLLECTION.REPORT).concat(reportID), { canBeMissing: false })[0];
    var reportActions = (0, useOnyx_1.default)("".concat(ONYXKEYS_1.default.COLLECTION.REPORT_ACTIONS).concat(reportID), {
        canEvict: false,
        canBeMissing: true,
    })[0];
    var reportMetadata = (0, useOnyx_1.default)("".concat(ONYXKEYS_1.default.COLLECTION.REPORT_METADATA).concat(reportID), {
        canBeMissing: false,
    })[0];
    var isLoadingApp = (0, useOnyx_1.default)(ONYXKEYS_1.default.IS_LOADING_APP, { canBeMissing: true })[0];
    var isOffline = (0, useNetwork_1.default)().isOffline;
    var submitRef = (0, react_1.useRef)(null);
    // Extract the reportActionID from the attachmentID (format: reportActionID_index)
    var reportActionID = (0, react_1.useMemo)(function () { var _a; return (_a = attachmentID === null || attachmentID === void 0 ? void 0 : attachmentID.split('_')) === null || _a === void 0 ? void 0 : _a[0]; }, [attachmentID]);
    var shouldFetchReport = (0, react_1.useMemo)(function () {
        return (0, EmptyObject_1.isEmptyObject)(reportActions === null || reportActions === void 0 ? void 0 : reportActions[reportActionID !== null && reportActionID !== void 0 ? reportActionID : CONST_1.default.DEFAULT_NUMBER_ID]);
    }, [reportActions, reportActionID]);
    var fetchReport = (0, react_1.useCallback)(function () {
        (0, Report_1.openReport)(reportID, reportActionID);
    }, [reportID, reportActionID]);
    (0, react_1.useEffect)(function () {
        if (!reportID || !shouldFetchReport) {
            return;
        }
        fetchReport();
    }, [reportID, fetchReport, shouldFetchReport]);
    var _d = (0, react_1.useState)(function () { return (0, AvatarUtils_1.getValidatedImageSource)(sourceParam); }), source = _d[0], setSource = _d[1];
    var _e = (0, react_1.useState)(fileParam), validFiles = _e[0], setValidFiles = _e[1];
    (0, react_1.useEffect)(function () {
        if (!fileParam) {
            return;
        }
        function updateState(result) {
            var _a;
            if (Array.isArray(result)) {
                var validResults = result.filter(function (r) { return r.isValid; });
                if (validResults.length === 0) {
                    return;
                }
                var validatedFiles = validResults.map(function (r) { return r.file; });
                var firstValidSource = (_a = validResults.at(0)) === null || _a === void 0 ? void 0 : _a.source;
                setSource(firstValidSource);
                setValidFiles(validatedFiles);
                return;
            }
            if (!result.isValid) {
                return;
            }
            setSource(result.source);
            setValidFiles(result.file);
        }
        if (Array.isArray(fileParam)) {
            Promise.all(fileParam.map(function (f) { return (0, AttachmentUtils_1.default)(f); })).then(updateState);
            return;
        }
        (0, AttachmentUtils_1.default)(fileParam).then(updateState);
    }, [fileParam]);
    var modalType = (0, useReportAttachmentModalType_1.default)(source, validFiles);
    (0, useNavigateToReportOnRefresh_1.default)({ source: sourceParam, file: validFiles, reportID: reportID });
    var isLoading = (0, react_1.useMemo)(function () {
        if (isOffline || (0, ReportUtils_1.isReportNotFound)(report) || !reportID) {
            return false;
        }
        var isEmptyReport = (0, EmptyObject_1.isEmptyObject)(report);
        return !!isLoadingApp || isEmptyReport || ((reportMetadata === null || reportMetadata === void 0 ? void 0 : reportMetadata.isLoadingInitialReportActions) !== false && shouldFetchReport) || (Array.isArray(validFiles) && validFiles.length === 0);
    }, [isOffline, report, reportID, isLoadingApp, reportMetadata === null || reportMetadata === void 0 ? void 0 : reportMetadata.isLoadingInitialReportActions, shouldFetchReport, validFiles]);
    var onConfirm = (0, react_1.useCallback)(function (f) {
        if (Array.isArray(validFiles) && validFiles.length > 0) {
            onConfirmParam === null || onConfirmParam === void 0 ? void 0 : onConfirmParam(validFiles);
        }
        else {
            onConfirmParam === null || onConfirmParam === void 0 ? void 0 : onConfirmParam(f);
        }
    }, [validFiles, onConfirmParam]);
    var onDownloadAttachment = (0, useDownloadAttachment_1.default)({
        isAuthTokenRequired: isAuthTokenRequired,
    });
    (0, useNavigateToReportOnRefresh_1.default)({ source: sourceParam, file: validFiles, reportID: reportID });
    var contentProps = (0, react_1.useMemo)(function () {
        if (validFiles === undefined || (Array.isArray(validFiles) && validFiles.length === 0)) {
            return {
                isLoading: true,
            };
        }
        return {
            file: validFiles,
            source: source,
            isLoading: isLoading,
            isAuthTokenRequired: isAuthTokenRequired,
            attachmentLink: attachmentLink,
            originalFileName: originalFileName,
            attachmentID: attachmentID,
            accountID: accountID,
            headerTitle: headerTitle,
            shouldDisableSendButton: shouldDisableSendButton,
            submitRef: submitRef,
            onConfirm: onConfirm,
            onDownloadAttachment: onDownloadAttachment,
            AttachmentContent: AddAttachmentModalCarouselView_1.default,
        };
    }, [
        validFiles,
        source,
        isLoading,
        isAuthTokenRequired,
        attachmentLink,
        originalFileName,
        attachmentID,
        accountID,
        headerTitle,
        shouldDisableSendButton,
        onConfirm,
        onDownloadAttachment,
    ]);
    return (<AttachmentModalContainer_1.default navigation={navigation} contentProps={contentProps} modalType={modalType} onShow={onShow} onClose={onClose}/>);
}
ReportAddAttachmentModalContent.displayName = 'ReportAddAttachmentModalContent';
exports.default = ReportAddAttachmentModalContent;
