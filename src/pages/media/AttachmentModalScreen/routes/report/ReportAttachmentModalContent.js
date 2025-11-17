"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var useNetwork_1 = require("@hooks/useNetwork");
var useOnyx_1 = require("@hooks/useOnyx");
var useOriginalReportID_1 = require("@hooks/useOriginalReportID");
var Report_1 = require("@libs/actions/Report");
var AvatarUtils_1 = require("@libs/AvatarUtils");
var Navigation_1 = require("@libs/Navigation/Navigation");
var ReportUtils_1 = require("@libs/ReportUtils");
var AttachmentModalContainer_1 = require("@pages/media/AttachmentModalScreen/AttachmentModalContainer");
var useDownloadAttachment_1 = require("@pages/media/AttachmentModalScreen/routes/hooks/useDownloadAttachment");
var useNavigateToReportOnRefresh_1 = require("@pages/media/AttachmentModalScreen/routes/hooks/useNavigateToReportOnRefresh");
var useReportAttachmentModalType_1 = require("@pages/media/AttachmentModalScreen/routes/hooks/useReportAttachmentModalType");
var CONST_1 = require("@src/CONST");
var ONYXKEYS_1 = require("@src/ONYXKEYS");
var ROUTES_1 = require("@src/ROUTES");
var EmptyObject_1 = require("@src/types/utils/EmptyObject");
var SafeString_1 = require("@src/utils/SafeString");
function ReportAttachmentModalContent(_a) {
    var _b;
    var route = _a.route, navigation = _a.navigation;
    var _c = route.params, attachmentID = _c.attachmentID, type = _c.type, sourceParam = _c.source, isAuthTokenRequired = _c.isAuthTokenRequired, attachmentLink = _c.attachmentLink, originalFileName = _c.originalFileName, accountID = _c.accountID, reportID = _c.reportID, hashKey = _c.hashKey, headerTitle = _c.headerTitle, onShow = _c.onShow, onClose = _c.onClose;
    var reportActions = (0, useOnyx_1.default)("".concat(ONYXKEYS_1.default.COLLECTION.REPORT_ACTIONS).concat(reportID), {
        canEvict: false,
        canBeMissing: true,
    })[0];
    var reportActionID = (0, react_1.useMemo)(function () { var _a; return (_a = attachmentID === null || attachmentID === void 0 ? void 0 : attachmentID.split('_')) === null || _a === void 0 ? void 0 : _a[0]; }, [attachmentID]);
    var originalReportID = (0, useOriginalReportID_1.default)(reportID, reportActionID ? ((_b = reportActions === null || reportActions === void 0 ? void 0 : reportActions[reportActionID !== null && reportActionID !== void 0 ? reportActionID : CONST_1.default.DEFAULT_NUMBER_ID]) !== null && _b !== void 0 ? _b : { reportActionID: reportActionID }) : undefined);
    var reportActionReportID = originalReportID !== null && originalReportID !== void 0 ? originalReportID : reportID;
    var report = (0, useOnyx_1.default)("".concat(ONYXKEYS_1.default.COLLECTION.REPORT).concat(reportActionReportID), { canBeMissing: false })[0];
    var reportMetadata = (0, useOnyx_1.default)("".concat(ONYXKEYS_1.default.COLLECTION.REPORT_METADATA).concat(reportActionReportID), {
        canBeMissing: false,
    })[0];
    (0, useNavigateToReportOnRefresh_1.default)({ source: sourceParam, reportID: reportID });
    var isLoadingApp = (0, useOnyx_1.default)(ONYXKEYS_1.default.IS_LOADING_APP, { canBeMissing: true })[0];
    var isOffline = (0, useNetwork_1.default)().isOffline;
    var submitRef = (0, react_1.useRef)(null);
    var shouldFetchReport = (0, react_1.useMemo)(function () {
        return (0, EmptyObject_1.isEmptyObject)(reportActions === null || reportActions === void 0 ? void 0 : reportActions[reportActionID !== null && reportActionID !== void 0 ? reportActionID : CONST_1.default.DEFAULT_NUMBER_ID]);
    }, [reportActions, reportActionID]);
    var isLoading = (0, react_1.useMemo)(function () {
        if (isOffline || (0, ReportUtils_1.isReportNotFound)(report) || !reportActionReportID) {
            return false;
        }
        var isEmptyReport = (0, EmptyObject_1.isEmptyObject)(report);
        return !!isLoadingApp || isEmptyReport || ((reportMetadata === null || reportMetadata === void 0 ? void 0 : reportMetadata.isLoadingInitialReportActions) !== false && shouldFetchReport);
    }, [isOffline, reportActionReportID, isLoadingApp, report, reportMetadata, shouldFetchReport]);
    var fetchReport = (0, react_1.useCallback)(function () {
        (0, Report_1.openReport)(reportActionReportID, reportActionID);
    }, [reportActionReportID, reportActionID]);
    (0, react_1.useEffect)(function () {
        if (!reportActionReportID || !shouldFetchReport) {
            return;
        }
        fetchReport();
    }, [reportActionReportID, fetchReport, shouldFetchReport]);
    var onCarouselAttachmentChange = (0, react_1.useCallback)(function (attachment) {
        var _a;
        var routeToNavigate = ROUTES_1.default.REPORT_ATTACHMENTS.getRoute({
            reportID: reportID,
            attachmentID: attachment.attachmentID,
            type: type,
            source: (0, SafeString_1.default)(attachment.source),
            accountID: accountID,
            isAuthTokenRequired: attachment === null || attachment === void 0 ? void 0 : attachment.isAuthTokenRequired,
            originalFileName: (_a = attachment === null || attachment === void 0 ? void 0 : attachment.file) === null || _a === void 0 ? void 0 : _a.name,
            attachmentLink: attachment === null || attachment === void 0 ? void 0 : attachment.attachmentLink,
            hashKey: hashKey,
        });
        Navigation_1.default.navigate(routeToNavigate);
    }, [reportID, type, accountID, hashKey]);
    var onDownloadAttachment = (0, useDownloadAttachment_1.default)({
        isAuthTokenRequired: isAuthTokenRequired,
    });
    var source = (0, react_1.useMemo)(function () { return (0, AvatarUtils_1.getValidatedImageSource)(sourceParam); }, [sourceParam]);
    var modalType = (0, useReportAttachmentModalType_1.default)(source);
    // eslint-disable-next-line rulesdir/no-negated-variables
    var shouldShowNotFoundPage = !isLoading && type !== CONST_1.default.ATTACHMENT_TYPE.SEARCH && !(report === null || report === void 0 ? void 0 : report.reportID);
    var contentProps = (0, react_1.useMemo)(function () { return ({
        // In native the imported images sources are of type number. Ref: https://reactnative.dev/docs/image#imagesource
        type: type,
        report: report,
        shouldShowNotFoundPage: shouldShowNotFoundPage,
        isAuthTokenRequired: !!isAuthTokenRequired,
        attachmentLink: attachmentLink !== null && attachmentLink !== void 0 ? attachmentLink : '',
        originalFileName: originalFileName !== null && originalFileName !== void 0 ? originalFileName : '',
        isLoading: isLoading,
        source: source,
        attachmentID: attachmentID,
        accountID: accountID,
        headerTitle: headerTitle,
        submitRef: submitRef,
        onDownloadAttachment: onDownloadAttachment,
        onCarouselAttachmentChange: onCarouselAttachmentChange,
    }); }, [
        accountID,
        attachmentID,
        attachmentLink,
        headerTitle,
        isAuthTokenRequired,
        isLoading,
        onCarouselAttachmentChange,
        onDownloadAttachment,
        originalFileName,
        report,
        shouldShowNotFoundPage,
        source,
        type,
    ]);
    return (<AttachmentModalContainer_1.default navigation={navigation} contentProps={contentProps} modalType={modalType} onShow={onShow} onClose={onClose}/>);
}
ReportAttachmentModalContent.displayName = 'ReportAttachmentModalContent';
exports.default = ReportAttachmentModalContent;
