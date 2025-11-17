"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_native_1 = require("react-native");
var AttachmentPicker_1 = require("@components/AttachmentPicker");
var Avatar_1 = require("@components/Avatar");
var AvatarCropModal_1 = require("@components/AvatarCropModal/AvatarCropModal");
var AvatarSelector_1 = require("@components/AvatarSelector");
var Button_1 = require("@components/Button");
var ButtonWithDropdownMenu_1 = require("@components/ButtonWithDropdownMenu");
var DotIndicatorMessage_1 = require("@components/DotIndicatorMessage");
var FixedFooter_1 = require("@components/FixedFooter");
var HeaderWithBackButton_1 = require("@components/HeaderWithBackButton");
var Expensicons = require("@components/Icon/Expensicons");
var ScreenWrapper_1 = require("@components/ScreenWrapper");
var ScrollView_1 = require("@components/ScrollView");
var useAvatarMenu_1 = require("@hooks/useAvatarMenu");
var useCurrentUserPersonalDetails_1 = require("@hooks/useCurrentUserPersonalDetails");
var useLetterAvatars_1 = require("@hooks/useLetterAvatars");
var useLocalize_1 = require("@hooks/useLocalize");
var useThemeStyles_1 = require("@hooks/useThemeStyles");
var PresetAvatarCatalog_1 = require("@libs/Avatars/PresetAvatarCatalog");
var AvatarUtils_1 = require("@libs/AvatarUtils");
var Navigation_1 = require("@libs/Navigation/Navigation");
var UserAvatarUtils_1 = require("@libs/UserAvatarUtils");
var DiscardChangesConfirmation_1 = require("@pages/iou/request/step/DiscardChangesConfirmation");
var PersonalDetails_1 = require("@userActions/PersonalDetails");
var CONST_1 = require("@src/CONST");
var AvatarCapture_1 = require("./AvatarCapture");
var EMPTY_FILE = { uri: '', name: '', type: '', file: null };
function ProfileAvatar() {
    var _a, _b;
    var _c = (0, react_1.useState)({ validationError: null, phraseParam: {} }), errorData = _c[0], setErrorData = _c[1];
    var _d = (0, react_1.useState)(false), isAvatarCropModalOpen = _d[0], setIsAvatarCropModalOpen = _d[1];
    var _e = (0, react_1.useState)(), selected = _e[0], setSelected = _e[1];
    var avatarCaptureRef = (0, react_1.useRef)(null);
    var isSavingRef = (0, react_1.useRef)(false);
    var styles = (0, useThemeStyles_1.default)();
    var translate = (0, useLocalize_1.default)().translate;
    var _f = (0, react_1.useState)(__assign({}, EMPTY_FILE)), cropImageData = _f[0], setCropImageData = _f[1];
    var _g = (0, react_1.useState)(__assign({}, EMPTY_FILE)), imageData = _g[0], setImageData = _g[1];
    var isDirty = imageData.uri !== '' || !!selected;
    var avatarStyle = [styles.avatarXLarge, styles.alignSelfStart, styles.alignSelfCenter];
    var currentUserPersonalDetails = (0, useCurrentUserPersonalDetails_1.default)();
    var avatars = (0, useLetterAvatars_1.default)(currentUserPersonalDetails === null || currentUserPersonalDetails === void 0 ? void 0 : currentUserPersonalDetails.displayName, CONST_1.default.AVATAR_SIZE.X_LARGE).avatarMap;
    var accountID = (_a = currentUserPersonalDetails === null || currentUserPersonalDetails === void 0 ? void 0 : currentUserPersonalDetails.accountID) !== null && _a !== void 0 ? _a : CONST_1.default.DEFAULT_NUMBER_ID;
    // eslint-disable-next-line no-nested-ternary
    var avatarURL = '';
    if (selected && (0, PresetAvatarCatalog_1.isPresetAvatarID)(selected)) {
        avatarURL = (0, PresetAvatarCatalog_1.getAvatarLocal)(selected);
    }
    else if (selected) {
        avatarURL = avatars[selected];
    }
    else if (imageData.uri) {
        avatarURL = imageData.uri;
    }
    else {
        avatarURL = (_b = currentUserPersonalDetails === null || currentUserPersonalDetails === void 0 ? void 0 : currentUserPersonalDetails.avatar) !== null && _b !== void 0 ? _b : '';
    }
    // Weather avatar view & edit options should be hidden. False if user uploaded their own avatar.
    var shouldHideAvatarEdit = (!imageData.uri && ((0, UserAvatarUtils_1.isPresetAvatar)(currentUserPersonalDetails === null || currentUserPersonalDetails === void 0 ? void 0 : currentUserPersonalDetails.avatar) || (0, UserAvatarUtils_1.isLetterAvatar)(currentUserPersonalDetails === null || currentUserPersonalDetails === void 0 ? void 0 : currentUserPersonalDetails.originalFileName))) || !!selected;
    var setError = function (error, phraseParam) {
        setErrorData({
            validationError: error,
            phraseParam: phraseParam,
        });
    };
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
            setCropImageData({
                uri: (_c = image.uri) !== null && _c !== void 0 ? _c : '',
                name: (_d = image.name) !== null && _d !== void 0 ? _d : '',
                type: (_e = image.type) !== null && _e !== void 0 ? _e : '',
                file: null,
            });
        })
            .catch(function () {
            setError('attachmentPicker.errorWhileSelectingCorruptedAttachment', {});
        });
    }, []);
    var onImageSelected = (0, react_1.useCallback)(function (file) {
        var _a;
        setSelected(undefined);
        setImageData({
            uri: (_a = file === null || file === void 0 ? void 0 : file.uri) !== null && _a !== void 0 ? _a : '',
            name: file === null || file === void 0 ? void 0 : file.name,
            file: file,
            type: '',
        });
        setIsAvatarCropModalOpen(false);
    }, []);
    var onImageRemoved = (0, react_1.useCallback)(function () {
        setSelected((0, UserAvatarUtils_1.getDefaultAvatarName)({
            accountID: currentUserPersonalDetails === null || currentUserPersonalDetails === void 0 ? void 0 : currentUserPersonalDetails.accountID,
            accountEmail: currentUserPersonalDetails === null || currentUserPersonalDetails === void 0 ? void 0 : currentUserPersonalDetails.email,
        }));
        setImageData(__assign({}, EMPTY_FILE));
    }, [currentUserPersonalDetails === null || currentUserPersonalDetails === void 0 ? void 0 : currentUserPersonalDetails.accountID, currentUserPersonalDetails === null || currentUserPersonalDetails === void 0 ? void 0 : currentUserPersonalDetails.email]);
    var clearError = (0, react_1.useCallback)(function () {
        setError(null, {});
    }, []);
    var createMenuItems = (0, useAvatarMenu_1.default)({
        shouldHideAvatarEdit: shouldHideAvatarEdit,
        accountID: accountID,
        onImageRemoved: onImageRemoved,
        showAvatarCropModal: showAvatarCropModal,
        clearError: clearError,
        source: imageData.uri,
        originalFileName: imageData.name,
    }).createMenuItems;
    var onPress = (0, react_1.useCallback)(function () {
        var _a;
        isSavingRef.current = true;
        if (imageData.file) {
            (0, PersonalDetails_1.updateAvatar)(imageData.file, {
                avatar: currentUserPersonalDetails === null || currentUserPersonalDetails === void 0 ? void 0 : currentUserPersonalDetails.avatar,
                avatarThumbnail: currentUserPersonalDetails === null || currentUserPersonalDetails === void 0 ? void 0 : currentUserPersonalDetails.avatarThumbnail,
                accountID: currentUserPersonalDetails === null || currentUserPersonalDetails === void 0 ? void 0 : currentUserPersonalDetails.accountID,
            });
            setImageData(__assign({}, EMPTY_FILE));
            Navigation_1.default.dismissModal();
            isSavingRef.current = false;
            return;
        }
        if (selected && (0, PresetAvatarCatalog_1.isPresetAvatarID)(selected)) {
            (0, PersonalDetails_1.updateAvatar)({
                uri: (0, PresetAvatarCatalog_1.getAvatarURL)(selected),
                name: selected,
                customExpensifyAvatarID: selected,
            }, {
                avatar: currentUserPersonalDetails === null || currentUserPersonalDetails === void 0 ? void 0 : currentUserPersonalDetails.avatar,
                avatarThumbnail: currentUserPersonalDetails === null || currentUserPersonalDetails === void 0 ? void 0 : currentUserPersonalDetails.avatarThumbnail,
                accountID: currentUserPersonalDetails === null || currentUserPersonalDetails === void 0 ? void 0 : currentUserPersonalDetails.accountID,
            });
            setSelected(undefined);
            Navigation_1.default.dismissModal();
            isSavingRef.current = false;
            return;
        }
        if (!selected || !avatarCaptureRef.current) {
            isSavingRef.current = false;
            return;
        }
        // User selected a letter avatar
        (_a = avatarCaptureRef.current.capture()) === null || _a === void 0 ? void 0 : _a.then(function (file) {
            (0, PersonalDetails_1.updateAvatar)(file, {
                avatar: currentUserPersonalDetails === null || currentUserPersonalDetails === void 0 ? void 0 : currentUserPersonalDetails.avatar,
                avatarThumbnail: currentUserPersonalDetails === null || currentUserPersonalDetails === void 0 ? void 0 : currentUserPersonalDetails.avatarThumbnail,
                accountID: currentUserPersonalDetails === null || currentUserPersonalDetails === void 0 ? void 0 : currentUserPersonalDetails.accountID,
            });
            setSelected(undefined);
            setImageData(__assign({}, EMPTY_FILE));
            Navigation_1.default.dismissModal();
            isSavingRef.current = false;
        });
    }, [currentUserPersonalDetails === null || currentUserPersonalDetails === void 0 ? void 0 : currentUserPersonalDetails.accountID, currentUserPersonalDetails === null || currentUserPersonalDetails === void 0 ? void 0 : currentUserPersonalDetails.avatar, currentUserPersonalDetails === null || currentUserPersonalDetails === void 0 ? void 0 : currentUserPersonalDetails.avatarThumbnail, imageData.file, selected]);
    return (<ScreenWrapper_1.default includeSafeAreaPaddingBottom includePaddingTop shouldEnableMaxHeight testID={ProfileAvatar.displayName} offlineIndicatorStyle={styles.mtAuto} shouldShowOfflineIndicatorInWideScreen>
            <HeaderWithBackButton_1.default title={translate('avatarPage.title')}/>
            <react_native_1.View style={[styles.flexColumn, styles.gap5, styles.alignItemsCenter, styles.pb10]}>
                <AvatarCapture_1.default ref={avatarCaptureRef} fileName={selected !== null && selected !== void 0 ? selected : 'avatar'}>
                    <Avatar_1.default containerStyles={avatarStyle} imageStyles={avatarStyle} source={avatarURL} avatarID={accountID} fallbackIcon={currentUserPersonalDetails === null || currentUserPersonalDetails === void 0 ? void 0 : currentUserPersonalDetails.fallbackIcon} size={CONST_1.default.AVATAR_SIZE.X_LARGE} type={CONST_1.default.ICON_TYPE_AVATAR}/>
                </AvatarCapture_1.default>
                <AttachmentPicker_1.default type={CONST_1.default.ATTACHMENT_PICKER_TYPE.IMAGE} 
    // We need to skip the validation in AttachmentPicker because it is handled in this component itself
    shouldValidateImage={false}>
                    {function (_a) {
            var openPicker = _a.openPicker;
            var menuItems = createMenuItems(openPicker);
            if ((menuItems === null || menuItems === void 0 ? void 0 : menuItems.length) <= 1) {
                return (<Button_1.default icon={Expensicons.Upload} text={translate('avatarPage.uploadPhoto')} accessibilityLabel={translate('avatarPage.uploadPhoto')} isDisabled={isAvatarCropModalOpen} onPress={function () {
                        openPicker({
                            onPicked: function (data) { var _a; return showAvatarCropModal((_a = data.at(0)) !== null && _a !== void 0 ? _a : {}); },
                        });
                    }}/>);
            }
            return (<ButtonWithDropdownMenu_1.default success={false} shouldUseOptionIcon isDisabled={isAvatarCropModalOpen} onPress={function () { }} anchorAlignment={{ horizontal: CONST_1.default.MODAL.ANCHOR_ORIGIN_HORIZONTAL.CENTER, vertical: CONST_1.default.MODAL.ANCHOR_ORIGIN_VERTICAL.TOP }} customText={translate('common.edit')} options={menuItems} isSplitButton={false}/>);
        }}
                </AttachmentPicker_1.default>
            </react_native_1.View>

            <ScrollView_1.default style={styles.flex1} contentContainerStyle={styles.flexGrow1} keyboardShouldPersistTaps="handled">
                <react_native_1.View style={[styles.ph5, styles.pb5, styles.flexColumn, styles.flex1, styles.gap3]}>
                    <AvatarSelector_1.default label={translate('avatarPage.choosePresetAvatar')} name={currentUserPersonalDetails === null || currentUserPersonalDetails === void 0 ? void 0 : currentUserPersonalDetails.displayName} selectedID={selected} onSelect={function (id) {
            setImageData(__assign({}, EMPTY_FILE));
            setSelected(id);
        }}/>
                </react_native_1.View>
            </ScrollView_1.default>
            <FixedFooter_1.default style={styles.mtAuto}>
                {!!errorData.validationError && (<DotIndicatorMessage_1.default style={styles.mv5} 
        // eslint-disable-next-line @typescript-eslint/naming-convention
        messages={{ 0: translate(errorData.validationError, errorData.phraseParam) }} type="error"/>)}
                <Button_1.default large success text={translate('common.save')} isDisabled={!isDirty} onPress={onPress} pressOnEnter/>
            </FixedFooter_1.default>
            <AvatarCropModal_1.default onClose={function () {
            if (!isAvatarCropModalOpen) {
                return;
            }
            setCropImageData(__assign({}, EMPTY_FILE));
            setIsAvatarCropModalOpen(false);
        }} isVisible={isAvatarCropModalOpen} onSave={onImageSelected} imageUri={cropImageData.uri} imageName={cropImageData.name} imageType={cropImageData.type} buttonLabel={translate('avatarPage.upload')}/>
            <DiscardChangesConfirmation_1.default getHasUnsavedChanges={function () { return !isSavingRef.current && isDirty; }}/>
        </ScreenWrapper_1.default>);
}
ProfileAvatar.displayName = 'ProfileAvatar';
exports.default = ProfileAvatar;
