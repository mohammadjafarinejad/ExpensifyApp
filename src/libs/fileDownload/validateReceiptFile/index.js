"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var IOU_1 = require("@libs/actions/IOU");
/**
 * Validates a receipt file and processes it for upload
 * Uses readFileAsync to load the file into memory for processing
 */
function validateReceiptFile(receiptFilename, receiptPath, receiptType, onSuccess, onFailure) {
    return (0, IOU_1.checkIfScanFileCanBeRead)(receiptFilename, receiptPath, receiptType, onSuccess, onFailure);
}
exports.default = validateReceiptFile;
