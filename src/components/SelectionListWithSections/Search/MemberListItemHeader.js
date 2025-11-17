"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_native_1 = require("react-native");
var Avatar_1 = require("@components/Avatar");
var Checkbox_1 = require("@components/Checkbox");
var Icon_1 = require("@components/Icon");
var Expensicons = require("@components/Icon/Expensicons");
var Pressable_1 = require("@components/Pressable");
var TextWithTooltip_1 = require("@components/TextWithTooltip");
var UserDetailsTooltip_1 = require("@components/UserDetailsTooltip");
var useLocalize_1 = require("@hooks/useLocalize");
var useResponsiveLayout_1 = require("@hooks/useResponsiveLayout");
var useTheme_1 = require("@hooks/useTheme");
var useThemeStyles_1 = require("@hooks/useThemeStyles");
var PersonalDetailsUtils_1 = require("@libs/PersonalDetailsUtils");
var CONST_1 = require("@src/CONST");
var TotalCell_1 = require("./TotalCell");
function MemberListItemHeader(_a) {
    var memberItem = _a.member, onCheckboxPress = _a.onCheckboxPress, isDisabled = _a.isDisabled, canSelectMultiple = _a.canSelectMultiple, isSelectAllChecked = _a.isSelectAllChecked, isIndeterminate = _a.isIndeterminate, isExpanded = _a.isExpanded, onDownArrowClick = _a.onDownArrowClick;
    var theme = (0, useTheme_1.default)();
    var styles = (0, useThemeStyles_1.default)();
    var isLargeScreenWidth = (0, useResponsiveLayout_1.default)().isLargeScreenWidth;
    var _b = (0, useLocalize_1.default)(), translate = _b.translate, formatPhoneNumber = _b.formatPhoneNumber;
    var _c = (0, react_1.useMemo)(function () { var _a; return [formatPhoneNumber((0, PersonalDetailsUtils_1.getDisplayNameOrDefault)(memberItem)), formatPhoneNumber((_a = memberItem.login) !== null && _a !== void 0 ? _a : '')]; }, [memberItem, formatPhoneNumber]), formattedDisplayName = _c[0], formattedLogin = _c[1];
    return (<react_native_1.View>
            <react_native_1.View style={[styles.pv1Half, styles.pl3, styles.flexRow, styles.alignItemsCenter, styles.justifyContentStart]}>
                <react_native_1.View style={[styles.flexRow, styles.alignItemsCenter, styles.mnh40, styles.flex1, styles.gap3]}>
                    {!!canSelectMultiple && (<Checkbox_1.default onPress={function () { return onCheckboxPress === null || onCheckboxPress === void 0 ? void 0 : onCheckboxPress(memberItem); }} isChecked={isSelectAllChecked} isIndeterminate={isIndeterminate} disabled={!!isDisabled || memberItem.isDisabledCheckbox} accessibilityLabel={translate('common.select')}/>)}
                    <react_native_1.View style={[styles.flexRow, styles.flex1, styles.gap3]}>
                        <UserDetailsTooltip_1.default accountID={memberItem.accountID}>
                            <react_native_1.View>
                                <Avatar_1.default source={memberItem.avatar} type={CONST_1.default.ICON_TYPE_AVATAR} name={formattedDisplayName} avatarID={memberItem.accountID}/>
                            </react_native_1.View>
                        </UserDetailsTooltip_1.default>
                        <react_native_1.View style={[styles.gap1, styles.flexShrink1]}>
                            <TextWithTooltip_1.default text={formattedDisplayName} style={[styles.optionDisplayName, styles.sidebarLinkTextBold, styles.pre, styles.fontWeightNormal]}/>
                            <TextWithTooltip_1.default text={formattedLogin || formattedDisplayName} style={[styles.textLabelSupporting, styles.lh16, styles.pre]}/>
                        </react_native_1.View>
                    </react_native_1.View>
                </react_native_1.View>
                <react_native_1.View style={[styles.flexShrink0, styles.mr3, styles.gap1]}>
                    <TotalCell_1.default total={memberItem.total} currency={memberItem.currency}/>
                    {!isLargeScreenWidth && !!onDownArrowClick && (<react_native_1.View>
                            <Pressable_1.PressableWithFeedback onPress={onDownArrowClick} style={[styles.pl3, styles.justifyContentCenter, styles.alignItemsEnd]} accessibilityRole={CONST_1.default.ROLE.BUTTON} accessibilityLabel={isExpanded ? CONST_1.default.ACCESSIBILITY_LABELS.COLLAPSE : CONST_1.default.ACCESSIBILITY_LABELS.EXPAND}>
                                {function (_a) {
                var hovered = _a.hovered;
                return (<Icon_1.default src={isExpanded ? Expensicons.UpArrow : Expensicons.DownArrow} fill={theme.icon} additionalStyles={!hovered && styles.opacitySemiTransparent} small/>);
            }}
                            </Pressable_1.PressableWithFeedback>
                        </react_native_1.View>)}
                </react_native_1.View>
            </react_native_1.View>
        </react_native_1.View>);
}
MemberListItemHeader.displayName = 'MemberListItemHeader';
exports.default = MemberListItemHeader;
