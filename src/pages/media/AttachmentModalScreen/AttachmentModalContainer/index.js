"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var Modal_1 = require("@components/Modal");
var Navigation_1 = require("@libs/Navigation/Navigation");
var AttachmentModalBaseContent_1 = require("@pages/media/AttachmentModalScreen/AttachmentModalBaseContent");
var AttachmentStateContextProvider_1 = require("@pages/media/AttachmentModalScreen/AttachmentModalBaseContent/AttachmentStateContextProvider");
var AttachmentModalContext_1 = require("@pages/media/AttachmentModalScreen/AttachmentModalContext");
var CONST_1 = require("@src/CONST");
function AttachmentModalContainer(_a) {
    var contentProps = _a.contentProps, modalType = _a.modalType, onShow = _a.onShow, onClose = _a.onClose, shouldHandleNavigationBack = _a.shouldHandleNavigationBack, ExtraContent = _a.ExtraContent;
    var _b = (0, react_1.useState)(true), isVisible = _b[0], setIsVisible = _b[1];
    var attachmentsContext = (0, react_1.useContext)(AttachmentModalContext_1.default);
    var resetAttachmentModalAndClose = (0, react_1.useCallback)(function () {
        attachmentsContext.setCurrentAttachment(undefined);
        setIsVisible(false);
        onClose === null || onClose === void 0 ? void 0 : onClose();
    }, [attachmentsContext, onClose]);
    var closeModal = (0, react_1.useCallback)(function () {
        Navigation_1.default.dismissModal();
        resetAttachmentModalAndClose();
    }, [resetAttachmentModalAndClose]);
    (0, react_1.useEffect)(function () {
        onShow === null || onShow === void 0 ? void 0 : onShow();
        return function () {
            resetAttachmentModalAndClose === null || resetAttachmentModalAndClose === void 0 ? void 0 : resetAttachmentModalAndClose();
        };
    }, [resetAttachmentModalAndClose, onShow]);
    return (<>
            <Modal_1.default isVisible={isVisible} type={modalType !== null && modalType !== void 0 ? modalType : CONST_1.default.MODAL.MODAL_TYPE.CENTERED_UNSWIPEABLE} initialFocus={function () {
            var _a;
            if (!((_a = contentProps.submitRef) === null || _a === void 0 ? void 0 : _a.current)) {
                return false;
            }
            return contentProps.submitRef.current;
        }} shouldHandleNavigationBack={shouldHandleNavigationBack} onClose={closeModal} enableEdgeToEdgeBottomSafeAreaPadding>
                <AttachmentStateContextProvider_1.default>
                    <AttachmentModalBaseContent_1.default 
    // eslint-disable-next-line react/jsx-props-no-spreading
    {...contentProps} shouldDisplayHelpButton={false} onClose={closeModal}/>
                </AttachmentStateContextProvider_1.default>
            </Modal_1.default>
            {ExtraContent}
        </>);
}
AttachmentModalContainer.displayName = 'AttachmentModalContainer';
exports.default = AttachmentModalContainer;
