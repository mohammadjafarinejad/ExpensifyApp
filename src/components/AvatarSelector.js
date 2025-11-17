"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_native_1 = require("react-native");
var useLetterAvatars_1 = require("@hooks/useLetterAvatars");
var useLocalize_1 = require("@hooks/useLocalize");
var useStyleUtils_1 = require("@hooks/useStyleUtils");
var useTheme_1 = require("@hooks/useTheme");
var useThemeStyles_1 = require("@hooks/useThemeStyles");
var PresetAvatarCatalog_1 = require("@libs/Avatars/PresetAvatarCatalog");
var CONST_1 = require("@src/CONST");
var Avatar_1 = require("./Avatar");
var Pressable_1 = require("./Pressable");
var Text_1 = require("./Text");
/**
 * AvatarSelector — renders a grid of selectable avatars.
 */
function AvatarSelector(_a) {
    var selectedID = _a.selectedID, onSelect = _a.onSelect, label = _a.label, name = _a.name, _b = _a.size, size = _b === void 0 ? CONST_1.default.AVATAR_SIZE.MEDIUM : _b;
    var translate = (0, useLocalize_1.default)().translate;
    var styles = (0, useThemeStyles_1.default)();
    var theme = (0, useTheme_1.default)();
    var StyleUtils = (0, useStyleUtils_1.default)();
    var avatarList = (0, useLetterAvatars_1.default)(name, size).avatarList;
    return (<>
            {!!label && (avatarList === null || avatarList === void 0 ? void 0 : avatarList.length) > 0 && (<Text_1.default style={StyleUtils.combineStyles([styles.sidebarLinkText, styles.optionAlternateText, styles.textLabelSupporting, styles.pre, styles.ph2])}>{label}</Text_1.default>)}
            <react_native_1.View style={styles.avatarSelectorListContainer}>
                {PresetAvatarCatalog_1.PRESET_AVATAR_CATALOG_ORDERED.map(function (_a) {
            var id = _a.id, local = _a.local;
            var isSelected = selectedID === id;
            return (<Pressable_1.PressableWithFeedback key={id} accessible accessibilityRole="button" accessibilityLabel={translate('avatarPage.selectAvatar')} onPress={function () { return onSelect(id); }} style={[styles.avatarSelectorWrapper, isSelected && { borderColor: theme.success, borderWidth: 2 }]}>
                            <Avatar_1.default type={CONST_1.default.ICON_TYPE_AVATAR} source={local} size={size} containerStyles={styles.avatarSelectorContainer} testID={"AvatarSelector_".concat(id)}/>
                        </Pressable_1.PressableWithFeedback>);
        })}
                {avatarList.map(function (_a) {
            var id = _a.id, StyledLetterAvatar = _a.StyledLetterAvatar;
            var isSelected = selectedID === id;
            return (<Pressable_1.PressableWithFeedback key={id} accessible accessibilityRole="button" accessibilityLabel={translate('avatarPage.selectAvatar')} onPress={function () { return onSelect(id); }} style={[styles.avatarSelectorWrapper, isSelected && styles.avatarSelected]}>
                            <Avatar_1.default type={CONST_1.default.ICON_TYPE_AVATAR} source={StyledLetterAvatar} size={size} containerStyles={styles.avatarSelectorContainer} testID={"AvatarSelector_".concat(id)}/>
                        </Pressable_1.PressableWithFeedback>);
        })}
            </react_native_1.View>
        </>);
}
AvatarSelector.displayName = 'AvatarSelector';
exports.default = AvatarSelector;
