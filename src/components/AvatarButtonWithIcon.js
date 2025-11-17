"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_native_1 = require("react-native");
var useTheme_1 = require("@hooks/useTheme");
var useThemeStyles_1 = require("@hooks/useThemeStyles");
var variables_1 = require("@styles/variables");
var CONST_1 = require("@src/CONST");
var Avatar_1 = require("./Avatar");
var Icon_1 = require("./Icon");
var Expensicons = require("./Icon/Expensicons");
var OfflineWithFeedback_1 = require("./OfflineWithFeedback");
var PressableWithoutFeedback_1 = require("./Pressable/PressableWithoutFeedback");
var Tooltip_1 = require("./Tooltip");
/**
 * Avatar button with an edit icon overlay
 */
function AvatarButtonWithIcon(_a) {
    var _b = _a.DefaultAvatar, DefaultAvatar = _b === void 0 ? function () { return null; } : _b, disabledStyle = _a.disabledStyle, editIconStyle = _a.editIconStyle, pendingAction = _a.pendingAction, text = _a.text, onPress = _a.onPress, _c = _a.source, source = _c === void 0 ? '' : _c, avatarID = _a.avatarID, _d = _a.fallbackIcon, fallbackIcon = _d === void 0 ? Expensicons.FallbackAvatar : _d, _e = _a.size, size = _e === void 0 ? CONST_1.default.AVATAR_SIZE.DEFAULT : _e, _f = _a.type, type = _f === void 0 ? CONST_1.default.ICON_TYPE_AVATAR : _f, avatarStyle = _a.avatarStyle, _g = _a.disabled, disabled = _g === void 0 ? false : _g, _h = _a.editIcon, editIcon = _h === void 0 ? Expensicons.Pencil : _h, anchorRef = _a.anchorRef, _j = _a.name, name = _j === void 0 ? '' : _j;
    var theme = (0, useTheme_1.default)();
    var styles = (0, useThemeStyles_1.default)();
    return (<Tooltip_1.default shouldRender={!disabled} text={text}>
            <PressableWithoutFeedback_1.default onPress={onPress} accessibilityRole={CONST_1.default.ROLE.BUTTON} accessibilityLabel={text} disabled={disabled} disabledStyle={disabledStyle} style={[styles.pRelative, type === CONST_1.default.ICON_TYPE_AVATAR && styles.alignSelfCenter, avatarStyle]} ref={anchorRef}>
                <OfflineWithFeedback_1.default pendingAction={pendingAction}>
                    {source ? (<Avatar_1.default containerStyles={avatarStyle} imageStyles={[styles.alignSelfCenter, avatarStyle]} source={source} avatarID={avatarID} fallbackIcon={fallbackIcon} size={size} type={type} name={name}/>) : (<DefaultAvatar />)}
                </OfflineWithFeedback_1.default>
                {!disabled && (<react_native_1.View style={react_native_1.StyleSheet.flatten([styles.smallEditIcon, styles.smallAvatarEditIcon, editIconStyle])}>
                        <Icon_1.default testID="avatar-button-edit-icon" src={editIcon} width={variables_1.default.iconSizeSmall} height={variables_1.default.iconSizeSmall} fill={theme.icon}/>
                    </react_native_1.View>)}
            </PressableWithoutFeedback_1.default>
        </Tooltip_1.default>);
}
AvatarButtonWithIcon.displayName = 'AvatarButtonWithIcon';
exports.default = AvatarButtonWithIcon;
