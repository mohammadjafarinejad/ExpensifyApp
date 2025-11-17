"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var isWindowReadyToFocus_1 = require("./isWindowReadyToFocus");
var ReportActionComposeFocusManager_1 = require("./ReportActionComposeFocusManager");
function refocusComposerAfterPreventFirstResponder(composerToRefocusOnClose) {
    return (0, isWindowReadyToFocus_1.default)().then(function () {
        var _a, _b;
        if (composerToRefocusOnClose === 'main') {
            (_a = ReportActionComposeFocusManager_1.default.composerRef.current) === null || _a === void 0 ? void 0 : _a.focus();
        }
        else if (composerToRefocusOnClose === 'edit') {
            (_b = ReportActionComposeFocusManager_1.default.editComposerRef.current) === null || _b === void 0 ? void 0 : _b.focus();
        }
    });
}
exports.default = refocusComposerAfterPreventFirstResponder;
