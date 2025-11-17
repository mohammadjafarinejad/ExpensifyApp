"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var checkFileExists_1 = require("@libs/fileDownload/checkFileExists");
/**
 * Validates a receipt file and processes it for upload
 * Uses checkFileExists for memory-efficient file validation without loading the entire file
 */
function validateReceiptFile(receiptFilename, receiptPath, receiptType, onSuccess, onFailure) {
    var receiptPathString = receiptPath === null || receiptPath === void 0 ? void 0 : receiptPath.toString();
    return (0, checkFileExists_1.default)(receiptPathString).then(function (exists) {
        if (!exists) {
            onFailure();
            return;
        }
        onSuccess({ uri: receiptPathString, name: receiptFilename, type: receiptType, source: receiptPathString });
    });
}
exports.default = validateReceiptFile;
