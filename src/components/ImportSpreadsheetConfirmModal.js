"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var useLocalize_1 = require("@hooks/useLocalize");
var useOnyx_1 = require("@hooks/useOnyx");
var ONYXKEYS_1 = require("@src/ONYXKEYS");
var ConfirmModal_1 = require("./ConfirmModal");
function ImportSpreadsheetConfirmModal(_a) {
    var _b, _c;
    var isVisible = _a.isVisible, closeImportPageAndModal = _a.closeImportPageAndModal, onModalHide = _a.onModalHide;
    var translate = (0, useLocalize_1.default)().translate;
    var spreadsheet = (0, useOnyx_1.default)(ONYXKEYS_1.default.IMPORTED_SPREADSHEET, { canBeMissing: true })[0];
    var titleText = ((_b = spreadsheet === null || spreadsheet === void 0 ? void 0 : spreadsheet.importFinalModal) === null || _b === void 0 ? void 0 : _b.titleKey) ? translate(spreadsheet.importFinalModal.titleKey) : '';
    var promptText = ((_c = spreadsheet === null || spreadsheet === void 0 ? void 0 : spreadsheet.importFinalModal) === null || _c === void 0 ? void 0 : _c.promptKey)
        ? translate(spreadsheet.importFinalModal.promptKey, spreadsheet.importFinalModal.promptKeyParams)
        : '';
    return (<ConfirmModal_1.default isVisible={isVisible} title={titleText} prompt={promptText} onConfirm={closeImportPageAndModal} onCancel={closeImportPageAndModal} confirmText={translate('common.buttonConfirm')} shouldShowCancelButton={false} shouldHandleNavigationBack onModalHide={onModalHide}/>);
}
ImportSpreadsheetConfirmModal.displayName = 'ImportSpreadsheetConfirmModal';
exports.default = ImportSpreadsheetConfirmModal;
