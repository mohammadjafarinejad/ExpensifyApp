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
var react_native_1 = require("react-native");
var useStyleUtils_1 = require("@hooks/useStyleUtils");
var useThemeStyles_1 = require("@hooks/useThemeStyles");
var Report_1 = require("@libs/actions/Report");
var Navigation_1 = require("@libs/Navigation/Navigation");
var ReportUtils_1 = require("@libs/ReportUtils");
var UserAvatarUtils_1 = require("@libs/UserAvatarUtils");
var CONST_1 = require("@src/CONST");
var ROUTES_1 = require("@src/ROUTES");
var Avatar_1 = require("./Avatar");
var AvatarWithImagePicker_1 = require("./AvatarWithImagePicker");
var Expensicons = require("./Icon/Expensicons");
var PressableWithoutFocus_1 = require("./Pressable/PressableWithoutFocus");
var Text_1 = require("./Text");
function RoomHeaderAvatars(_a) {
    var _b, _c, _d, _e;
    var icons = _a.icons, report = _a.report, policy = _a.policy, participants = _a.participants;
    var navigateToAvatarPage = function (icon) {
        if (icon.type === CONST_1.default.ICON_TYPE_WORKSPACE && icon.id) {
            Navigation_1.default.navigate(ROUTES_1.default.REPORT_AVATAR.getRoute(report === null || report === void 0 ? void 0 : report.reportID, icon.id.toString()));
            return;
        }
        if (icon.id) {
            Navigation_1.default.navigate(ROUTES_1.default.PROFILE_AVATAR.getRoute(Number(icon.id), Navigation_1.default.getActiveRoute()));
        }
    };
    var styles = (0, useThemeStyles_1.default)();
    var StyleUtils = (0, useStyleUtils_1.default)();
    var currentUserAccountID = (0, Report_1.getCurrentUserAccountID)();
    var canEditRoomAvatar = (0, ReportUtils_1.isUserCreatedPolicyRoom)(report) && participants.includes(currentUserAccountID) && !!policy && policy.role !== CONST_1.default.POLICY.ROLE.AUDITOR;
    if (!icons.length) {
        return null;
    }
    if (icons.length === 1) {
        var icon_1 = icons.at(0);
        if (!icon_1) {
            return;
        }
        if (canEditRoomAvatar) {
            return (<AvatarWithImagePicker_1.default source={icon_1.source || report.avatarUrl} avatarID={icon_1.id} isUsingDefaultAvatar={!report.avatarUrl || (0, UserAvatarUtils_1.isDefaultAvatar)(icon_1.source)} size={CONST_1.default.AVATAR_SIZE.X_LARGE} avatarStyle={[styles.avatarXLarge, styles.alignSelfCenter]} onViewPhotoPress={function () { return Navigation_1.default.navigate(ROUTES_1.default.REPORT_AVATAR.getRoute(report.reportID)); }} onImageRemoved={function () { return (0, Report_1.updatePolicyRoomAvatar)(report.reportID); }} onImageSelected={function (file) { return (0, Report_1.updatePolicyRoomAvatar)(report.reportID, file); }} editIcon={Expensicons.Camera} editIconStyle={styles.smallEditIconAccount} pendingAction={(_b = report.pendingFields) === null || _b === void 0 ? void 0 : _b.avatar} errors={(_d = (_c = report.errorFields) === null || _c === void 0 ? void 0 : _c.avatar) !== null && _d !== void 0 ? _d : null} errorRowStyles={styles.mt6} onErrorClose={function () { return (0, Report_1.clearAvatarErrors)(report.reportID); }} style={[styles.w100, styles.mb3, styles.alignItemsStart, styles.sectionMenuItemTopDescription]} type={icon_1.type} editorMaskImage={Expensicons.ImageCropSquareMask} name={icon_1.name}/>);
        }
        return (<PressableWithoutFocus_1.default style={styles.noOutline} onPress={function () { return navigateToAvatarPage(icon_1); }} accessibilityRole={CONST_1.default.ROLE.BUTTON} accessibilityLabel={(_e = icon_1.name) !== null && _e !== void 0 ? _e : ''} disabled={icon_1.source === Expensicons.FallbackAvatar}>
                <Avatar_1.default source={icon_1.source} imageStyles={styles.avatarXLarge} size={CONST_1.default.AVATAR_SIZE.X_LARGE} name={icon_1.name} avatarID={icon_1.id} type={icon_1.type} fallbackIcon={icon_1.fallbackIcon}/>
            </PressableWithoutFocus_1.default>);
    }
    var iconsToDisplay = icons.slice(0, CONST_1.default.REPORT.MAX_PREVIEW_AVATARS);
    var iconStyle = [
        styles.roomHeaderAvatar,
        // Due to border-box box-sizing, the Avatars have to be larger when bordered to visually match size with non-bordered Avatars
        StyleUtils.getAvatarStyle(CONST_1.default.AVATAR_SIZE.LARGE_BORDERED),
    ];
    return (<react_native_1.View style={styles.pointerEventsBoxNone}>
            <react_native_1.View style={[styles.flexRow, styles.wAuto, styles.ml3]}>
                {iconsToDisplay.map(function (icon, index) {
            var _a;
            return (<react_native_1.View 
            // eslint-disable-next-line react/no-array-index-key
            key={"".concat(icon.id).concat(index)} style={[styles.justifyContentCenter, styles.alignItemsCenter]}>
                        <PressableWithoutFocus_1.default style={[styles.mln4, StyleUtils.getAvatarBorderRadius(CONST_1.default.AVATAR_SIZE.LARGE_BORDERED, icon.type)]} onPress={function () { return navigateToAvatarPage(icon); }} accessibilityRole={CONST_1.default.ROLE.BUTTON} accessibilityLabel={(_a = icon.name) !== null && _a !== void 0 ? _a : ''} disabled={icon.source === Expensicons.FallbackAvatar}>
                            <Avatar_1.default source={icon.source} size={CONST_1.default.AVATAR_SIZE.LARGE} containerStyles={__spreadArray(__spreadArray([], iconStyle, true), [StyleUtils.getAvatarBorderRadius(CONST_1.default.AVATAR_SIZE.LARGE_BORDERED, icon.type)], false)} name={icon.name} avatarID={icon.id} type={icon.type} fallbackIcon={icon.fallbackIcon}/>
                        </PressableWithoutFocus_1.default>
                        {index === CONST_1.default.REPORT.MAX_PREVIEW_AVATARS - 1 && icons.length - CONST_1.default.REPORT.MAX_PREVIEW_AVATARS !== 0 && (<>
                                <react_native_1.View style={__spreadArray(__spreadArray([
                        styles.roomHeaderAvatarSize,
                        styles.roomHeaderAvatar,
                        styles.mln4
                    ], iconStyle, true), [
                        StyleUtils.getAvatarBorderRadius(CONST_1.default.AVATAR_SIZE.LARGE_BORDERED, icon.type),
                        styles.roomHeaderAvatarOverlay,
                    ], false)}/>
                                <Text_1.default style={styles.avatarInnerTextChat}>{"+".concat(icons.length - CONST_1.default.REPORT.MAX_PREVIEW_AVATARS)}</Text_1.default>
                            </>)}
                    </react_native_1.View>);
        })}
            </react_native_1.View>
        </react_native_1.View>);
}
RoomHeaderAvatars.displayName = 'RoomHeaderAvatars';
exports.default = (0, react_1.memo)(RoomHeaderAvatars);
