"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_native_1 = require("react-native");
var Checkbox_1 = require("@components/Checkbox");
var Icon_1 = require("@components/Icon");
var BankIcons_1 = require("@components/Icon/BankIcons");
var Expensicons = require("@components/Icon/Expensicons");
var Pressable_1 = require("@components/Pressable");
var TextWithTooltip_1 = require("@components/TextWithTooltip");
var useLocalize_1 = require("@hooks/useLocalize");
var useResponsiveLayout_1 = require("@hooks/useResponsiveLayout");
var useTheme_1 = require("@hooks/useTheme");
var useThemeStyles_1 = require("@hooks/useThemeStyles");
var DateUtils_1 = require("@libs/DateUtils");
var CONST_1 = require("@src/CONST");
var TotalCell_1 = require("./TotalCell");
function WithdrawalIDListItemHeader(_a) {
    var _b;
    var withdrawalIDItem = _a.withdrawalID, onCheckboxPress = _a.onCheckboxPress, isDisabled = _a.isDisabled, canSelectMultiple = _a.canSelectMultiple, isIndeterminate = _a.isIndeterminate, isSelectAllChecked = _a.isSelectAllChecked, onDownArrowClick = _a.onDownArrowClick, isExpanded = _a.isExpanded;
    var isLargeScreenWidth = (0, useResponsiveLayout_1.default)().isLargeScreenWidth;
    var theme = (0, useTheme_1.default)();
    var styles = (0, useThemeStyles_1.default)();
    var translate = (0, useLocalize_1.default)().translate;
    var _c = (0, BankIcons_1.default)({ bankName: withdrawalIDItem.bankName, styles: styles }), icon = _c.icon, iconSize = _c.iconSize, iconStyles = _c.iconStyles;
    var formattedBankName = (_b = CONST_1.default.BANK_NAMES_USER_FRIENDLY[withdrawalIDItem.bankName]) !== null && _b !== void 0 ? _b : CONST_1.default.BANK_NAMES_USER_FRIENDLY[CONST_1.default.BANK_NAMES.GENERIC_BANK];
    var formattedWithdrawalDate = DateUtils_1.default.formatWithUTCTimeZone(withdrawalIDItem.debitPosted, DateUtils_1.default.doesDateBelongToAPastYear(withdrawalIDItem.debitPosted) ? CONST_1.default.DATE.MONTH_DAY_YEAR_ABBR_FORMAT : CONST_1.default.DATE.MONTH_DAY_ABBR_FORMAT);
    return (<react_native_1.View>
            <react_native_1.View style={[styles.pv1Half, styles.pl3, styles.flexRow, styles.alignItemsCenter, styles.justifyContentStart]}>
                <react_native_1.View style={[styles.flexRow, styles.alignItemsCenter, styles.mnh40, styles.flex1, styles.gap3]}>
                    {!!canSelectMultiple && (<Checkbox_1.default onPress={function () { return onCheckboxPress === null || onCheckboxPress === void 0 ? void 0 : onCheckboxPress(withdrawalIDItem); }} isChecked={isSelectAllChecked} disabled={!!isDisabled || withdrawalIDItem.isDisabledCheckbox} accessibilityLabel={translate('common.select')} isIndeterminate={isIndeterminate}/>)}
                    <react_native_1.View style={[styles.flexRow, styles.flex1, styles.gap3]}>
                        <Icon_1.default src={icon} width={iconSize} height={iconSize} additionalStyles={iconStyles}/>
                        <react_native_1.View style={[styles.gapHalf, styles.flexShrink1]}>
                            <TextWithTooltip_1.default text={"".concat(formattedBankName, " xx").concat(withdrawalIDItem.accountNumber.slice(-4))} style={[styles.optionDisplayName, styles.sidebarLinkTextBold, styles.pre, styles.fontWeightNormal]}/>
                            <TextWithTooltip_1.default text={"".concat(formattedWithdrawalDate, "  ").concat(translate('common.withdrawalID'), ": ").concat(withdrawalIDItem.entryID)} style={[styles.textLabelSupporting, styles.lh16, styles.pre]}/>
                        </react_native_1.View>
                    </react_native_1.View>
                </react_native_1.View>
                <react_native_1.View style={[styles.flexShrink0, styles.mr3, styles.gap1]}>
                    <TotalCell_1.default total={withdrawalIDItem.total} currency={withdrawalIDItem.currency}/>
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
WithdrawalIDListItemHeader.displayName = 'WithdrawalIDListItemHeader';
exports.default = WithdrawalIDListItemHeader;
