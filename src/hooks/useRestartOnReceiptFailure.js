"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var IOU_1 = require("@libs/actions/IOU");
var TransactionEdit_1 = require("@libs/actions/TransactionEdit");
var FileUtils_1 = require("@libs/fileDownload/FileUtils");
var IOUUtils_1 = require("@libs/IOUUtils");
var TransactionUtils_1 = require("@libs/TransactionUtils");
var CONST_1 = require("@src/CONST");
var useRestartOnReceiptFailure = function (transaction, reportID, iouType, action) {
    // When the component mounts, if there is a receipt, see if the image can be read from the disk. If not, redirect the user to the starting step of the flow.
    // This is because until the request is saved, the receipt file is only stored in the browsers memory as a blob:// and if the browser is refreshed, then
    // the image ceases to exist. The best way for the user to recover from this is to start over from the start of the request process.
    // skip this in case user is moving the transaction as the receipt path will be valid in that case
    (0, react_1.useEffect)(function () {
        var _a, _b, _c;
        var isScanFilesCanBeRead = true;
        if (!transaction || action !== CONST_1.default.IOU.ACTION.CREATE) {
            return;
        }
        var itemReceiptFilename = transaction.filename;
        var itemReceiptPath = (_a = transaction.receipt) === null || _a === void 0 ? void 0 : _a.source;
        var itemReceiptType = (_b = transaction.receipt) === null || _b === void 0 ? void 0 : _b.type;
        var isLocalFile = (0, FileUtils_1.isLocalFile)(itemReceiptPath);
        if (!itemReceiptPath || !isLocalFile) {
            return;
        }
        var onFailure = function () {
            isScanFilesCanBeRead = false;
            (0, IOU_1.setMoneyRequestReceipt)(transaction.transactionID, '', '', true);
        };
        (_c = (0, IOU_1.checkIfScanFileCanBeRead)(itemReceiptFilename, itemReceiptPath, itemReceiptType, function () { }, onFailure)) === null || _c === void 0 ? void 0 : _c.then(function () {
            var requestType = (0, TransactionUtils_1.getRequestType)(transaction);
            if (isScanFilesCanBeRead || requestType !== CONST_1.default.IOU.REQUEST_TYPE.SCAN) {
                return;
            }
            (0, TransactionEdit_1.removeDraftTransactions)(true);
            (0, IOUUtils_1.navigateToStartMoneyRequestStep)(requestType, iouType, transaction.transactionID, reportID);
        });
        // We want this hook to run on mounting only
        // eslint-disable-next-line react-compiler/react-compiler, react-hooks/exhaustive-deps
    }, []);
};
exports.default = useRestartOnReceiptFailure;
