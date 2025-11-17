"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var Expensicons = require("@components/Icon/Expensicons");
var Navigation_1 = require("@libs/Navigation/Navigation");
var AttachmentModalContext_1 = require("@pages/media/AttachmentModalScreen/AttachmentModalContext");
var ROUTES_1 = require("@src/ROUTES");
var useLocalize_1 = require("./useLocalize");
/**
 * Custom hook to create avatar menu items
 */
function useAvatarMenu(_a) {
    var shouldHideAvatarEdit = _a.shouldHideAvatarEdit, accountID = _a.accountID, onImageRemoved = _a.onImageRemoved, showAvatarCropModal = _a.showAvatarCropModal, clearError = _a.clearError, source = _a.source, originalFileName = _a.originalFileName;
    var translate = (0, useLocalize_1.default)().translate;
    var attachmentContext = (0, react_1.useContext)(AttachmentModalContext_1.default);
    /**
     * Create menu items list for avatar menu
     */
    var createMenuItems = (0, react_1.useCallback)(function (openPicker) {
        var menuItems = [
            {
                icon: Expensicons.Upload,
                text: translate('avatarWithImagePicker.uploadPhoto'),
                onSelected: function () {
                    openPicker({
                        onPicked: function (data) { var _a; return showAvatarCropModal((_a = data.at(0)) !== null && _a !== void 0 ? _a : {}); },
                    });
                },
                value: null,
            },
        ];
        // If current avatar is a default avatar and for avatar is selected in the form, only show upload option
        if (shouldHideAvatarEdit) {
            return menuItems;
        }
        if (!source) {
            menuItems.push({
                icon: Expensicons.Trashcan,
                text: translate('avatarWithImagePicker.removePhoto'),
                value: null,
                onSelected: function () {
                    clearError();
                    onImageRemoved();
                },
            });
        }
        return __spreadArray(__spreadArray([], menuItems, true), [
            {
                value: null,
                icon: Expensicons.Eye,
                text: translate('avatarWithImagePicker.viewPhoto'),
                onSelected: function () {
                    attachmentContext.setCurrentAttachment({ source: source, originalFileName: originalFileName });
                    Navigation_1.default.navigate(ROUTES_1.default.PROFILE_AVATAR.getRoute(accountID));
                },
            },
        ], false);
    }, [translate, shouldHideAvatarEdit, source, showAvatarCropModal, clearError, onImageRemoved, attachmentContext, originalFileName, accountID]);
    return { createMenuItems: createMenuItems };
}
exports.default = useAvatarMenu;
