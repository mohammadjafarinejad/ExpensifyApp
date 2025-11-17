"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var AttachmentCarouselView_1 = require("@components/Attachments/AttachmentCarousel/AttachmentCarouselView");
var useCarouselArrows_1 = require("@components/Attachments/AttachmentCarousel/useCarouselArrows");
var useAttachmentErrors_1 = require("@components/Attachments/AttachmentView/useAttachmentErrors");
var convertFileToAttachment = function (file) {
    var _a;
    if (!file) {
        return { source: '' };
    }
    return {
        file: file,
        source: (_a = file.uri) !== null && _a !== void 0 ? _a : '',
    };
};
function AddAttachmentModalCarouselView(_a) {
    var fileToDisplay = _a.fileToDisplay, files = _a.files;
    var _b = (0, useAttachmentErrors_1.default)(), setAttachmentError = _b.setAttachmentError, clearAttachmentErrors = _b.clearAttachmentErrors;
    var _c = (0, useCarouselArrows_1.default)(), shouldShowArrows = _c.shouldShowArrows, setShouldShowArrows = _c.setShouldShowArrows, autoHideArrows = _c.autoHideArrows, cancelAutoHideArrows = _c.cancelAutoHideArrows;
    var _d = (0, react_1.useState)(0), page = _d[0], setPage = _d[1];
    var attachments = (0, react_1.useMemo)(function () {
        var _a;
        if (Array.isArray(files)) {
            return (_a = files === null || files === void 0 ? void 0 : files.map(function (file) { return convertFileToAttachment(file); })) !== null && _a !== void 0 ? _a : [];
        }
        if (!files) {
            return [];
        }
        return [convertFileToAttachment(files)];
    }, [files]);
    var currentAttachment = (0, react_1.useMemo)(function () { return convertFileToAttachment(fileToDisplay); }, [fileToDisplay]);
    (0, react_1.useEffect)(function () {
        clearAttachmentErrors();
    }, [clearAttachmentErrors]);
    if (attachments.length === 0 || !currentAttachment) {
        return null;
    }
    return (<AttachmentCarouselView_1.default attachments={attachments} source={currentAttachment.source} page={page} setPage={setPage} autoHideArrows={autoHideArrows} cancelAutoHideArrow={cancelAutoHideArrows} setShouldShowArrows={setShouldShowArrows} onAttachmentError={setAttachmentError} shouldShowArrows={shouldShowArrows}/>);
}
AddAttachmentModalCarouselView.displayName = 'AddAttachmentModalCarouselView';
exports.default = AddAttachmentModalCarouselView;
