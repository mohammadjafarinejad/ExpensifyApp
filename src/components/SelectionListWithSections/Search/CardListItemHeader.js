"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_native_1 = require("react-native");
var Checkbox_1 = require("@components/Checkbox");
var Icon_1 = require("@components/Icon");
var Expensicons = require("@components/Icon/Expensicons");
var Pressable_1 = require("@components/Pressable");
var ReportActionAvatars_1 = require("@components/ReportActionAvatars");
var TextWithTooltip_1 = require("@components/TextWithTooltip");
var useLocalize_1 = require("@hooks/useLocalize");
var useResponsiveLayout_1 = require("@hooks/useResponsiveLayout");
var useStyleUtils_1 = require("@hooks/useStyleUtils");
var useTheme_1 = require("@hooks/useTheme");
var useThemeStyles_1 = require("@hooks/useThemeStyles");
var PersonalDetailsUtils_1 = require("@libs/PersonalDetailsUtils");
var CONST_1 = require("@src/CONST");
var TotalCell_1 = require("./TotalCell");
function CardListItemHeader(_a) {
    var _b, _c;
    var cardItem = _a.card, onCheckboxPress = _a.onCheckboxPress, isDisabled = _a.isDisabled, isFocused = _a.isFocused, canSelectMultiple = _a.canSelectMultiple, isSelectAllChecked = _a.isSelectAllChecked, isIndeterminate = _a.isIndeterminate, onDownArrowClick = _a.onDownArrowClick, isExpanded = _a.isExpanded;
    var theme = (0, useTheme_1.default)();
    var styles = (0, useThemeStyles_1.default)();
    var isLargeScreenWidth = (0, useResponsiveLayout_1.default)().isLargeScreenWidth;
    var StyleUtils = (0, useStyleUtils_1.default)();
    var _d = (0, useLocalize_1.default)(), translate = _d.translate, formatPhoneNumber = _d.formatPhoneNumber;
    var formattedDisplayName = (0, react_1.useMemo)(function () { return formatPhoneNumber((0, PersonalDetailsUtils_1.getDisplayNameOrDefault)(cardItem)); }, [cardItem, formatPhoneNumber]);
    var backgroundColor = (_c = (_b = StyleUtils.getItemBackgroundColorStyle(!!cardItem.isSelected, !!isFocused, !!isDisabled, theme.activeComponentBG, theme.hoverComponentBG)) === null || _b === void 0 ? void 0 : _b.backgroundColor) !== null && _c !== void 0 ? _c : theme.highlightBG;
    return (<react_native_1.View>
            <react_native_1.View style={[styles.pv1Half, styles.pl3, styles.flexRow, styles.alignItemsCenter, styles.justifyContentStart]}>
                <react_native_1.View style={[styles.flexRow, styles.alignItemsCenter, styles.mnh40, styles.flex1, styles.gap3]}>
                    {!!canSelectMultiple && (<Checkbox_1.default onPress={function () { return onCheckboxPress === null || onCheckboxPress === void 0 ? void 0 : onCheckboxPress(cardItem); }} isChecked={isSelectAllChecked} isIndeterminate={isIndeterminate} disabled={!!isDisabled || cardItem.isDisabledCheckbox} accessibilityLabel={translate('common.select')}/>)}
                    <react_native_1.View style={[styles.flexRow, styles.flex1, styles.gap3]}>
                        <ReportActionAvatars_1.default subscriptCardFeed={cardItem.bank} subscriptAvatarBorderColor={backgroundColor} noRightMarginOnSubscriptContainer accountIDs={[cardItem.accountID]}/>
                        <react_native_1.View style={[styles.gapHalf, styles.flexShrink1]}>
                            <TextWithTooltip_1.default text={formattedDisplayName} style={[styles.optionDisplayName, styles.sidebarLinkTextBold, styles.pre, styles.fontWeightNormal]}/>
                            <TextWithTooltip_1.default text={"".concat(cardItem.cardName).concat(cardItem.lastFourPAN ? " ".concat(CONST_1.default.DOT_SEPARATOR, " ") : '').concat(cardItem.lastFourPAN)} style={[styles.textLabelSupporting, styles.lh16, styles.pre]}/>
                        </react_native_1.View>
                    </react_native_1.View>
                </react_native_1.View>
                <react_native_1.View style={[styles.flexShrink0, styles.mr3, styles.gap1]}>
                    <TotalCell_1.default total={cardItem.total} currency={cardItem.currency}/>
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
CardListItemHeader.displayName = 'CardListItemHeader';
exports.default = CardListItemHeader;
