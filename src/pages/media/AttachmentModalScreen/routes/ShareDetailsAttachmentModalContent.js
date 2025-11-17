"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var tryResolveUrlFromApiRoot_1 = require("@libs/tryResolveUrlFromApiRoot");
var AttachmentModalContainer_1 = require("@pages/media/AttachmentModalScreen/AttachmentModalContainer");
var useDownloadAttachment_1 = require("./hooks/useDownloadAttachment");
var useReportAttachmentModalType_1 = require("./hooks/useReportAttachmentModalType");
function ShareDetailsAttachmentModalContent(_a) {
    var route = _a.route, navigation = _a.navigation;
    var _b = route.params, sourceParam = _b.source, originalFileNameParam = _b.originalFileName, headerTitle = _b.headerTitle, onShow = _b.onShow, onClose = _b.onClose;
    var source = (0, react_1.useMemo)(function () { return Number(sourceParam) || (typeof sourceParam === 'string' ? (0, tryResolveUrlFromApiRoot_1.default)(decodeURIComponent(sourceParam)) : undefined); }, [sourceParam]);
    var originalFileName = originalFileNameParam !== null && originalFileNameParam !== void 0 ? originalFileNameParam : '';
    var onDownloadAttachment = (0, useDownloadAttachment_1.default)({});
    var contentProps = (0, react_1.useMemo)(function () { return ({
        source: source,
        originalFileName: originalFileName,
        headerTitle: headerTitle,
        onDownloadAttachment: onDownloadAttachment,
    }); }, [headerTitle, onDownloadAttachment, originalFileName, source]);
    var modalType = (0, useReportAttachmentModalType_1.default)(source);
    return (<AttachmentModalContainer_1.default navigation={navigation} contentProps={contentProps} modalType={modalType} onShow={onShow} onClose={onClose}/>);
}
ShareDetailsAttachmentModalContent.displayName = 'ShareDetailsAttachmentModalContent';
exports.default = ShareDetailsAttachmentModalContent;
