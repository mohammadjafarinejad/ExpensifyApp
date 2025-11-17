"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var native_1 = require("@react-navigation/native");
var react_1 = require("react");
var react_native_1 = require("react-native");
var useLocalize_1 = require("@hooks/useLocalize");
var usePopoverPosition_1 = require("@hooks/usePopoverPosition");
var useThemeStyles_1 = require("@hooks/useThemeStyles");
var AvatarUtils_1 = require("@libs/AvatarUtils");
var Browser_1 = require("@libs/Browser");
var CONST_1 = require("@src/CONST");
var AttachmentPicker_1 = require("./AttachmentPicker");
var AvatarButtonWithIcon_1 = require("./AvatarButtonWithIcon");
var AvatarCropModal_1 = require("./AvatarCropModal/AvatarCropModal");
var DotIndicatorMessage_1 = require("./DotIndicatorMessage");
var Expensicons = require("./Icon/Expensicons");
var OfflineWithFeedback_1 = require("./OfflineWithFeedback");
var PopoverMenu_1 = require("./PopoverMenu");
var anchorAlignment = { horizontal: CONST_1.default.MODAL.ANCHOR_ORIGIN_HORIZONTAL.CENTER, vertical: CONST_1.default.MODAL.ANCHOR_ORIGIN_VERTICAL.TOP };
function AvatarWithImagePicker(_a) {
    var _b = _a.DefaultAvatar, DefaultAvatar = _b === void 0 ? function () { return null; } : _b, style = _a.style, disabledStyle = _a.disabledStyle, editIconStyle = _a.editIconStyle, pendingAction = _a.pendingAction, errors = _a.errors, errorRowStyles = _a.errorRowStyles, _c = _a.onErrorClose, onErrorClose = _c === void 0 ? function () { } : _c, _d = _a.source, source = _d === void 0 ? '' : _d, avatarID = _a.avatarID, _e = _a.fallbackIcon, fallbackIcon = _e === void 0 ? Expensicons.FallbackAvatar : _e, _f = _a.size, size = _f === void 0 ? CONST_1.default.AVATAR_SIZE.DEFAULT : _f, _g = _a.type, type = _g === void 0 ? CONST_1.default.ICON_TYPE_AVATAR : _g, _h = _a.isUsingDefaultAvatar, isUsingDefaultAvatar = _h === void 0 ? false : _h, _j = _a.onImageSelected, onImageSelected = _j === void 0 ? function () { } : _j, _k = _a.onImageRemoved, onImageRemoved = _k === void 0 ? function () { } : _k, editorMaskImage = _a.editorMaskImage, avatarStyle = _a.avatarStyle, _l = _a.disabled, disabled = _l === void 0 ? false : _l, onViewPhotoPress = _a.onViewPhotoPress, _m = _a.enablePreview, enablePreview = _m === void 0 ? false : _m, _o = _a.editIcon, editIcon = _o === void 0 ? Expensicons.Pencil : _o, _p = _a.name, name = _p === void 0 ? '' : _p;
    var styles = (0, useThemeStyles_1.default)();
    var isFocused = (0, native_1.useIsFocused)();
    var _q = (0, react_1.useState)({ horizontal: 0, vertical: 0 }), popoverPosition = _q[0], setPopoverPosition = _q[1];
    var _r = (0, react_1.useState)(false), isMenuVisible = _r[0], setIsMenuVisible = _r[1];
    var _s = (0, react_1.useState)({ validationError: null, phraseParam: {} }), errorData = _s[0], setErrorData = _s[1];
    var _t = (0, react_1.useState)(false), isAvatarCropModalOpen = _t[0], setIsAvatarCropModalOpen = _t[1];
    var _u = (0, react_1.useState)({
        uri: '',
        name: '',
        type: '',
    }), imageData = _u[0], setImageData = _u[1];
    var calculatePopoverPosition = (0, usePopoverPosition_1.default)().calculatePopoverPosition;
    var anchorRef = (0, react_1.useRef)(null);
    var translate = (0, useLocalize_1.default)().translate;
    var setError = function (error, phraseParam) {
        setErrorData({
            validationError: error,
            phraseParam: phraseParam,
        });
    };
    (0, react_1.useEffect)(function () {
        if (isFocused) {
            return;
        }
        // Reset the error if the component is no longer focused.
        setError(null, {});
    }, [isFocused]);
    (0, react_1.useEffect)(function () {
        setError(null, {});
    }, [source, avatarID]);
    /**
     * Validates an image and opens avatar crop modal if valid
     */
    var showAvatarCropModal = (0, react_1.useCallback)(function (image) {
        (0, AvatarUtils_1.validateAvatarImage)(image)
            .then(function (validationResult) {
            var _a, _b, _c, _d, _e;
            if (!validationResult.isValid) {
                setError((_a = validationResult.errorKey) !== null && _a !== void 0 ? _a : null, (_b = validationResult.errorParams) !== null && _b !== void 0 ? _b : {});
                return;
            }
            setIsAvatarCropModalOpen(true);
            setError(null, {});
            setIsMenuVisible(false);
            setImageData({
                uri: (_c = image.uri) !== null && _c !== void 0 ? _c : '',
                name: (_d = image.name) !== null && _d !== void 0 ? _d : '',
                type: (_e = image.type) !== null && _e !== void 0 ? _e : '',
            });
        })
            .catch(function () {
            setError('attachmentPicker.errorWhileSelectingCorruptedAttachment', {});
        });
    }, []);
    var hideAvatarCropModal = function () {
        setIsAvatarCropModalOpen(false);
    };
    /**
     * Create menu items list for avatar menu
     */
    var createMenuItems = function (openPicker) {
        var menuItems = [
            {
                icon: Expensicons.Upload,
                text: translate('avatarWithImagePicker.uploadPhoto'),
                onSelected: function () {
                    if ((0, Browser_1.isSafari)()) {
                        return;
                    }
                    openPicker({
                        onPicked: function (data) { var _a; return showAvatarCropModal((_a = data.at(0)) !== null && _a !== void 0 ? _a : {}); },
                    });
                },
                shouldCallAfterModalHide: true,
            },
        ];
        // If current avatar isn't a default avatar, allow Remove Photo option
        if (!isUsingDefaultAvatar) {
            menuItems.push({
                icon: Expensicons.Trashcan,
                text: translate('avatarWithImagePicker.removePhoto'),
                onSelected: function () {
                    setError(null, {});
                    onImageRemoved();
                },
            });
        }
        return menuItems;
    };
    var onPressAvatar = (0, react_1.useCallback)(function (openPicker) {
        var _a;
        (_a = anchorRef.current) === null || _a === void 0 ? void 0 : _a.blur();
        if (disabled && enablePreview && onViewPhotoPress) {
            onViewPhotoPress();
            return;
        }
        if (isUsingDefaultAvatar) {
            openPicker({
                onPicked: function (data) { var _a; return showAvatarCropModal((_a = data.at(0)) !== null && _a !== void 0 ? _a : {}); },
            });
            return;
        }
        setIsMenuVisible(function (prev) { return !prev; });
    }, [disabled, enablePreview, isUsingDefaultAvatar, onViewPhotoPress, showAvatarCropModal]);
    (0, react_1.useLayoutEffect)(function () {
        if (!anchorRef.current || !isMenuVisible) {
            return;
        }
        calculatePopoverPosition(anchorRef, anchorAlignment).then(setPopoverPosition);
    }, [calculatePopoverPosition, isMenuVisible]);
    return (<react_native_1.View style={[styles.w100, style]}>
            <react_native_1.View style={styles.w100}>
                <AttachmentPicker_1.default type={CONST_1.default.ATTACHMENT_PICKER_TYPE.IMAGE} 
    // We need to skip the validation in AttachmentPicker because it is handled in this component itself
    shouldValidateImage={false}>
                    {function (_a) {
            var openPicker = _a.openPicker;
            var menuItems = createMenuItems(openPicker);
            // If the current avatar isn't a default avatar and we are not overriding this behavior allow the "View Photo" option
            if (onViewPhotoPress && !isUsingDefaultAvatar) {
                menuItems.push({
                    icon: Expensicons.Eye,
                    text: translate('avatarWithImagePicker.viewPhoto'),
                    onSelected: onViewPhotoPress,
                    shouldCallAfterModalHide: true,
                });
            }
            return (<>
                                <OfflineWithFeedback_1.default errors={errors} errorRowStyles={errorRowStyles} onClose={onErrorClose}>
                                    <AvatarButtonWithIcon_1.default text={translate('avatarWithImagePicker.editImage')} source={source} avatarID={avatarID} onPress={function () { return onPressAvatar(openPicker); }} avatarStyle={avatarStyle} pendingAction={pendingAction} fallbackIcon={fallbackIcon} anchorRef={anchorRef} DefaultAvatar={DefaultAvatar} editIcon={editIcon} size={size} type={type} disabledStyle={disabledStyle} editIconStyle={editIconStyle} name={name}/>
                                </OfflineWithFeedback_1.default>
                                <PopoverMenu_1.default anchorPosition={popoverPosition} isVisible={isMenuVisible} onClose={function () { return setIsMenuVisible(false); }} onItemSelected={function (item, index) {
                    setIsMenuVisible(false);
                    // In order for the file picker to open dynamically, the click
                    // function must be called from within an event handler that was initiated
                    // by the user on Safari.
                    if (index === 0 && (0, Browser_1.isSafari)()) {
                        openPicker({
                            onPicked: function (data) { var _a; return showAvatarCropModal((_a = data.at(0)) !== null && _a !== void 0 ? _a : {}); },
                        });
                    }
                }} menuItems={menuItems} anchorAlignment={anchorAlignment} anchorRef={anchorRef}/>
                            </>);
        }}
                </AttachmentPicker_1.default>
            </react_native_1.View>
            {!!errorData.validationError && (<DotIndicatorMessage_1.default style={styles.mt6} 
        // eslint-disable-next-line @typescript-eslint/naming-convention
        messages={{ 0: translate(errorData.validationError, errorData.phraseParam) }} type="error"/>)}
            <AvatarCropModal_1.default onClose={hideAvatarCropModal} isVisible={isAvatarCropModalOpen} onSave={onImageSelected} imageUri={imageData.uri} imageName={imageData.name} imageType={imageData.type} maskImage={editorMaskImage}/>
        </react_native_1.View>);
}
AvatarWithImagePicker.displayName = 'AvatarWithImagePicker';
exports.default = AvatarWithImagePicker;
