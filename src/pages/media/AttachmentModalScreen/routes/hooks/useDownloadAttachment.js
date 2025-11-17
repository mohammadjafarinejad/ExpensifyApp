"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_native_1 = require("react-native");
var addEncryptedAuthTokenToURL_1 = require("@libs/addEncryptedAuthTokenToURL");
var fileDownload_1 = require("@libs/fileDownload");
var FileUtils_1 = require("@libs/fileDownload/FileUtils");
var CONST_1 = require("@src/CONST");
function useDownloadAttachment(_a) {
    var _b = _a === void 0 ? {} : _a, isAuthTokenRequired = _b.isAuthTokenRequired, type = _b.type, draftTransactionID = _b.draftTransactionID;
    /**
     * Download the currently viewed attachment.
     */
    var downloadAttachment = (0, react_1.useCallback)(function (_a) {
        var source = _a.source, file = _a.file;
        var sourceURL = source;
        if (isAuthTokenRequired && typeof sourceURL === 'string') {
            sourceURL = (0, addEncryptedAuthTokenToURL_1.default)(sourceURL);
        }
        if (typeof sourceURL === 'string') {
            var fileName = type === CONST_1.default.ATTACHMENT_TYPE.SEARCH ? (0, FileUtils_1.getFileName)("".concat(sourceURL)) : file === null || file === void 0 ? void 0 : file.name;
            var shouldUnlink = !draftTransactionID;
            (0, fileDownload_1.default)(sourceURL, fileName !== null && fileName !== void 0 ? fileName : '', undefined, undefined, undefined, undefined, undefined, shouldUnlink);
        }
        // At ios, if the keyboard is open while opening the attachment, then after downloading
        // the attachment keyboard will show up. So, to fix it we need to dismiss the keyboard.
        react_native_1.Keyboard.dismiss();
    }, [isAuthTokenRequired, type, draftTransactionID]);
    return downloadAttachment;
}
exports.default = useDownloadAttachment;
