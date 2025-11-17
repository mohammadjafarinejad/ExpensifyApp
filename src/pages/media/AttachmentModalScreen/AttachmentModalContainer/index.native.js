"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var ScreenWrapper_1 = require("@components/ScreenWrapper");
var AttachmentModalHandler_1 = require("@libs/AttachmentModalHandler");
var Navigation_1 = require("@libs/Navigation/Navigation");
var AttachmentModalBaseContent_1 = require("@pages/media/AttachmentModalScreen/AttachmentModalBaseContent");
var AttachmentStateContextProvider_1 = require("@pages/media/AttachmentModalScreen/AttachmentModalBaseContent/AttachmentStateContextProvider");
var AttachmentModalContext_1 = require("@pages/media/AttachmentModalScreen/AttachmentModalContext");
var SafeString_1 = require("@src/utils/SafeString");
function AttachmentModalContainer(_a) {
    var contentProps = _a.contentProps, navigation = _a.navigation, onShow = _a.onShow, onClose = _a.onClose, ExtraContent = _a.ExtraContent;
    var attachmentsContext = (0, react_1.useContext)(AttachmentModalContext_1.default);
    var testID = typeof contentProps.source === 'string' ? contentProps.source : (0, SafeString_1.default)(contentProps.source);
    var resetAttachmentModalAndClose = (0, react_1.useCallback)(function () {
        attachmentsContext.setCurrentAttachment(undefined);
        onClose === null || onClose === void 0 ? void 0 : onClose();
    }, [attachmentsContext, onClose]);
    /**
     * Closes the modal.
     * @param {boolean} [shouldCallDirectly] If true, directly calls `onModalClose`.
     * This is useful when you plan to continue navigating to another page after closing the modal, to avoid freezing the app due to navigating to another page first and dismissing the modal later.
     * If `shouldCallDirectly` is false or undefined, it calls `attachmentModalHandler.handleModalClose` to close the modal.
     * This ensures smooth modal closing behavior without causing delays in closing.
     */
    var closeScreen = (0, react_1.useCallback)(function (options) {
        var close = function () {
            resetAttachmentModalAndClose();
            Navigation_1.default.goBack();
        };
        if (options === null || options === void 0 ? void 0 : options.shouldCallDirectly) {
            close();
        }
        else {
            AttachmentModalHandler_1.default.handleModalClose(close);
        }
    }, [resetAttachmentModalAndClose]);
    (0, react_1.useEffect)(function () {
        onShow === null || onShow === void 0 ? void 0 : onShow();
        return function () {
            resetAttachmentModalAndClose === null || resetAttachmentModalAndClose === void 0 ? void 0 : resetAttachmentModalAndClose();
        };
    }, [resetAttachmentModalAndClose, onShow]);
    return (<>
            <ScreenWrapper_1.default navigation={navigation} testID={"attachment-modal-".concat(testID)} enableEdgeToEdgeBottomSafeAreaPadding>
                <AttachmentStateContextProvider_1.default>
                    <AttachmentModalBaseContent_1.default 
    // eslint-disable-next-line react/jsx-props-no-spreading
    {...contentProps} onClose={closeScreen}/>
                </AttachmentStateContextProvider_1.default>
            </ScreenWrapper_1.default>
            {ExtraContent}
        </>);
}
AttachmentModalContainer.displayName = 'AttachmentModalContainer';
exports.default = (0, react_1.memo)(AttachmentModalContainer);
