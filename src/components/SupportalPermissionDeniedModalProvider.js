"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var useLocalize_1 = require("@hooks/useLocalize");
var useOnyx_1 = require("@hooks/useOnyx");
var App_1 = require("@userActions/App");
var ONYXKEYS_1 = require("@src/ONYXKEYS");
var ConfirmModal_1 = require("./ConfirmModal");
function SupportalPermissionDeniedModalProvider(_a) {
    var children = _a.children;
    var translate = (0, useLocalize_1.default)().translate;
    var payload = (0, useOnyx_1.default)(ONYXKEYS_1.default.SUPPORTAL_PERMISSION_DENIED, { canBeMissing: true })[0];
    var isVisible = !!payload;
    var title = (0, react_1.useMemo)(function () { return translate('supportalNoAccess.title'); }, [translate]);
    var prompt = (0, react_1.useMemo)(function () { return translate('supportalNoAccess.descriptionWithCommand', { command: payload === null || payload === void 0 ? void 0 : payload.command }); }, [translate, payload === null || payload === void 0 ? void 0 : payload.command]);
    var close = (0, react_1.useCallback)(function () {
        // Clear the flag so it doesn't re-open
        (0, App_1.clearSupportalPermissionDenied)();
    }, []);
    return (<>
            {children}
            <ConfirmModal_1.default isVisible={isVisible} onConfirm={close} onCancel={close} title={title} prompt={prompt} confirmText={translate('common.buttonConfirm')} shouldShowCancelButton={false}/>
        </>);
}
SupportalPermissionDeniedModalProvider.displayName = 'SupportalPermissionDeniedModalProvider';
exports.default = SupportalPermissionDeniedModalProvider;
