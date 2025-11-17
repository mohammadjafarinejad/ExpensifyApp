"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_native_1 = require("react-native");
var Checkbox_1 = require("@components/Checkbox");
var ReportActionAvatars_1 = require("@components/ReportActionAvatars");
var ReportSearchHeader_1 = require("@components/ReportSearchHeader");
var useResponsiveLayout_1 = require("@hooks/useResponsiveLayout");
var useStyleUtils_1 = require("@hooks/useStyleUtils");
var useTheme_1 = require("@hooks/useTheme");
var useThemeStyles_1 = require("@hooks/useThemeStyles");
var variables_1 = require("@styles/variables");
var CONST_1 = require("@src/CONST");
var ActionCell_1 = require("./ActionCell");
var DateCell_1 = require("./DateCell");
var StatusCell_1 = require("./StatusCell");
var TitleCell_1 = require("./TitleCell");
var TotalCell_1 = require("./TotalCell");
var UserInfoAndActionButtonRow_1 = require("./UserInfoAndActionButtonRow");
var UserInfoCell_1 = require("./UserInfoCell");
function ExpenseReportListItemRow(_a) {
    var _b, _c, _d, _e, _f, _g, _h, _j;
    var item = _a.item, _k = _a.onCheckboxPress, onCheckboxPress = _k === void 0 ? function () { } : _k, _l = _a.onButtonPress, onButtonPress = _l === void 0 ? function () { } : _l, isActionLoading = _a.isActionLoading, containerStyle = _a.containerStyle, showTooltip = _a.showTooltip, canSelectMultiple = _a.canSelectMultiple, avatarBorderColor = _a.avatarBorderColor, isSelectAllChecked = _a.isSelectAllChecked, isIndeterminate = _a.isIndeterminate, isDisabled = _a.isDisabled, _m = _a.isHovered, isHovered = _m === void 0 ? false : _m, _o = _a.isFocused, isFocused = _o === void 0 ? false : _o;
    var StyleUtils = (0, useStyleUtils_1.default)();
    var styles = (0, useThemeStyles_1.default)();
    var theme = (0, useTheme_1.default)();
    var _p = (0, useResponsiveLayout_1.default)(), isLargeScreenWidth = _p.isLargeScreenWidth, shouldUseNarrowLayout = _p.shouldUseNarrowLayout;
    var _q = (0, react_1.useMemo)(function () {
        var _a, _b;
        var reportTotal = (_a = item.total) !== null && _a !== void 0 ? _a : 0;
        if (reportTotal) {
            if (item.type === CONST_1.default.REPORT.TYPE.IOU) {
                reportTotal = Math.abs(reportTotal !== null && reportTotal !== void 0 ? reportTotal : 0);
            }
            else {
                reportTotal *= item.type === CONST_1.default.REPORT.TYPE.EXPENSE || item.type === CONST_1.default.REPORT.TYPE.INVOICE ? -1 : 1;
            }
        }
        var reportCurrency = (_b = item.currency) !== null && _b !== void 0 ? _b : CONST_1.default.CURRENCY.USD;
        return { total: reportTotal, currency: reportCurrency };
    }, [item.type, item.total, item.currency]), total = _q.total, currency = _q.currency;
    var thereIsFromAndTo = !!(item === null || item === void 0 ? void 0 : item.from) && !!(item === null || item === void 0 ? void 0 : item.to);
    var showUserInfo = (item.type === CONST_1.default.REPORT.TYPE.IOU && thereIsFromAndTo) || (item.type === CONST_1.default.REPORT.TYPE.EXPENSE && !!(item === null || item === void 0 ? void 0 : item.from));
    // Calculate the correct border color for avatars based on hover and focus states
    var finalAvatarBorderColor = isHovered && !isFocused ? theme.border : avatarBorderColor;
    if (!isLargeScreenWidth) {
        return (<react_native_1.View>
                <UserInfoAndActionButtonRow_1.default item={item} handleActionButtonPress={onButtonPress} shouldShowUserInfo={showUserInfo} containerStyles={[styles.mb2, styles.ph0]} isInMobileSelectionMode={shouldUseNarrowLayout && !!canSelectMultiple}/>
                <react_native_1.View style={[styles.pt0, styles.flexRow, styles.alignItemsCenter, styles.justifyContentStart]}>
                    <react_native_1.View style={[styles.flexRow, styles.alignItemsCenter, styles.mnh40, styles.flex1, styles.gap3]}>
                        {!!canSelectMultiple && (<Checkbox_1.default onPress={onCheckboxPress} isChecked={isSelectAllChecked} isIndeterminate={isIndeterminate} containerStyle={[StyleUtils.getCheckboxContainerStyle(20), StyleUtils.getMultiselectListStyles(!!item.isSelected, !!item.isDisabled)]} disabled={!!isDisabled || item.isDisabledCheckbox} accessibilityLabel={(_b = item.text) !== null && _b !== void 0 ? _b : ''} shouldStopMouseDownPropagation style={[styles.cursorUnset, StyleUtils.getCheckboxPressableStyle(), item.isDisabledCheckbox && styles.cursorDisabled]}/>)}
                        <react_native_1.View style={[styles.flexShrink1, styles.flexGrow1, styles.mnw0, styles.mr2]}>
                            <ReportSearchHeader_1.default report={item} style={[{ maxWidth: variables_1.default.reportSearchHeaderMaxWidth }]} transactions={item.transactions} avatarBorderColor={finalAvatarBorderColor}/>
                        </react_native_1.View>
                    </react_native_1.View>
                    <react_native_1.View style={[styles.flexShrink0, styles.flexColumn, styles.alignItemsEnd, styles.gap1]}>
                        <TotalCell_1.default total={total} currency={currency}/>
                    </react_native_1.View>
                </react_native_1.View>
            </react_native_1.View>);
    }
    return (<react_native_1.View style={[styles.flex1, styles.flexRow, styles.alignItemsCenter, containerStyle]}>
            <react_native_1.View style={[styles.flex1, styles.flexRow, styles.alignItemsCenter, styles.gap3, styles.pr2]}>
                {!!canSelectMultiple && (<Checkbox_1.default onPress={onCheckboxPress} isChecked={isSelectAllChecked} isIndeterminate={isIndeterminate} containerStyle={[StyleUtils.getCheckboxContainerStyle(20), StyleUtils.getMultiselectListStyles(!!item.isSelected, !!item.isDisabled)]} disabled={!!isDisabled || item.isDisabledCheckbox} accessibilityLabel={(_c = item.text) !== null && _c !== void 0 ? _c : ''} shouldStopMouseDownPropagation style={[styles.cursorUnset, StyleUtils.getCheckboxPressableStyle(), item.isDisabledCheckbox && styles.cursorDisabled, styles.mr1]}/>)}
                <react_native_1.View style={[StyleUtils.getReportTableColumnStyles(CONST_1.default.SEARCH.TABLE_COLUMNS.AVATAR), { alignItems: 'stretch' }]}>
                    <ReportActionAvatars_1.default reportID={item.reportID} shouldShowTooltip={showTooltip} subscriptAvatarBorderColor={finalAvatarBorderColor}/>
                </react_native_1.View>
                <react_native_1.View style={[StyleUtils.getReportTableColumnStyles(CONST_1.default.SEARCH.TABLE_COLUMNS.DATE, item.shouldShowYear)]}>
                    <DateCell_1.default created={(_d = item.created) !== null && _d !== void 0 ? _d : ''} showTooltip isLargeScreenWidth/>
                </react_native_1.View>
                <react_native_1.View style={[StyleUtils.getReportTableColumnStyles(CONST_1.default.SEARCH.TABLE_COLUMNS.STATUS)]}>
                    <StatusCell_1.default stateNum={item.stateNum} statusNum={item.statusNum}/>
                </react_native_1.View>
                <react_native_1.View style={[StyleUtils.getReportTableColumnStyles(CONST_1.default.SEARCH.TABLE_COLUMNS.TITLE)]}>
                    <TitleCell_1.default text={(_e = item.reportName) !== null && _e !== void 0 ? _e : ''} isLargeScreenWidth={isLargeScreenWidth}/>
                </react_native_1.View>
                <react_native_1.View style={[StyleUtils.getReportTableColumnStyles(CONST_1.default.SEARCH.TABLE_COLUMNS.FROM)]}>
                    {!!item.from && (<UserInfoCell_1.default accountID={item.from.accountID} avatar={item.from.avatar} displayName={(_g = (_f = item.from.displayName) !== null && _f !== void 0 ? _f : item.from.login) !== null && _g !== void 0 ? _g : ''}/>)}
                </react_native_1.View>
                <react_native_1.View style={[StyleUtils.getReportTableColumnStyles(CONST_1.default.SEARCH.TABLE_COLUMNS.TO)]}>
                    {!!item.to && (<UserInfoCell_1.default accountID={item.to.accountID} avatar={item.to.avatar} displayName={(_j = (_h = item.to.displayName) !== null && _h !== void 0 ? _h : item.to.login) !== null && _j !== void 0 ? _j : ''}/>)}
                </react_native_1.View>
                <react_native_1.View style={[StyleUtils.getReportTableColumnStyles(CONST_1.default.SEARCH.TABLE_COLUMNS.TOTAL)]}>
                    <TotalCell_1.default total={total} currency={currency}/>
                </react_native_1.View>
                <react_native_1.View style={[StyleUtils.getReportTableColumnStyles(CONST_1.default.SEARCH.TABLE_COLUMNS.ACTION)]}>
                    <ActionCell_1.default action={item.action} goToItem={onButtonPress} isSelected={item.isSelected} isLoading={isActionLoading} policyID={item.policyID} reportID={item.reportID} hash={item.hash} amount={item.total}/>
                </react_native_1.View>
            </react_native_1.View>
        </react_native_1.View>);
}
ExpenseReportListItemRow.displayName = 'ExpenseReportListItemRow';
exports.default = ExpenseReportListItemRow;
