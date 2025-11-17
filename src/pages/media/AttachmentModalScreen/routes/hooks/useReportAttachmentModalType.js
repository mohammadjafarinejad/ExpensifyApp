"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var expensify_common_1 = require("expensify-common");
var react_1 = require("react");
var CONST_1 = require("@src/CONST");
function isPdfFile(source, fileObject) {
    if (!source) {
        return false;
    }
    var isSourcePdf = typeof source === 'string' ? expensify_common_1.Str.isPDF(source) : false;
    var isFilePdf = (fileObject === null || fileObject === void 0 ? void 0 : fileObject.name) ? expensify_common_1.Str.isPDF(fileObject.name) : false;
    return isSourcePdf || isFilePdf;
}
function useReportAttachmentModalType(source, file) {
    var _a = (0, react_1.useState)(CONST_1.default.MODAL.MODAL_TYPE.CENTERED_UNSWIPEABLE), modalType = _a[0], setModalType = _a[1];
    (0, react_1.useEffect)(function () {
        var _a;
        if (!file && !source) {
            setModalType(CONST_1.default.MODAL.MODAL_TYPE.CENTERED);
            return;
        }
        var isPdf = false;
        if (Array.isArray(file)) {
            isPdf = file.some(function (f) { var _a; return isPdfFile((_a = source !== null && source !== void 0 ? source : f.uri) !== null && _a !== void 0 ? _a : '', f); });
        }
        else {
            isPdf = isPdfFile((_a = source !== null && source !== void 0 ? source : file === null || file === void 0 ? void 0 : file.uri) !== null && _a !== void 0 ? _a : '', file !== null && file !== void 0 ? file : {});
        }
        // If our attachment is a PDF, return the unswipeable Modal type.
        setModalType(isPdf ? CONST_1.default.MODAL.MODAL_TYPE.CENTERED_UNSWIPEABLE : CONST_1.default.MODAL.MODAL_TYPE.CENTERED);
    }, [file, source]);
    return modalType;
}
exports.default = useReportAttachmentModalType;
