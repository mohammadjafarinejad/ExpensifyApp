"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_native_1 = require("react-native");
var Checkbox_1 = require("@components/Checkbox");
var Icon_1 = require("@components/Icon");
var Expensicons = require("@components/Icon/Expensicons");
var Pressable_1 = require("@components/Pressable");
var ReportSearchHeader_1 = require("@components/ReportSearchHeader");
var SearchContext_1 = require("@components/Search/SearchContext");
var useOnyx_1 = require("@hooks/useOnyx");
var useResponsiveLayout_1 = require("@hooks/useResponsiveLayout");
var useStyleUtils_1 = require("@hooks/useStyleUtils");
var useTheme_1 = require("@hooks/useTheme");
var useThemeStyles_1 = require("@hooks/useThemeStyles");
var Search_1 = require("@userActions/Search");
var CONST_1 = require("@src/CONST");
var ONYXKEYS_1 = require("@src/ONYXKEYS");
var ReportMetaData_1 = require("@src/selectors/ReportMetaData");
var ActionCell_1 = require("./ActionCell");
var TotalCell_1 = require("./TotalCell");
var UserInfoAndActionButtonRow_1 = require("./UserInfoAndActionButtonRow");
function HeaderFirstRow(_a) {
    var _b;
    var reportItem = _a.report, onCheckboxPress = _a.onCheckboxPress, isDisabled = _a.isDisabled, canSelectMultiple = _a.canSelectMultiple, _c = _a.handleOnButtonPress, handleOnButtonPress = _c === void 0 ? function () { } : _c, avatarBorderColor = _a.avatarBorderColor, isSelectAllChecked = _a.isSelectAllChecked, isIndeterminate = _a.isIndeterminate, onDownArrowClick = _a.onDownArrowClick, isExpanded = _a.isExpanded;
    var styles = (0, useThemeStyles_1.default)();
    var StyleUtils = (0, useStyleUtils_1.default)();
    var isLargeScreenWidth = (0, useResponsiveLayout_1.default)().isLargeScreenWidth;
    var theme = (0, useTheme_1.default)();
    var isActionLoading = (0, useOnyx_1.default)("".concat(ONYXKEYS_1.default.COLLECTION.REPORT_METADATA).concat(reportItem.reportID), { canBeMissing: true, selector: ReportMetaData_1.isActionLoadingSelector })[0];
    var _d = (0, react_1.useMemo)(function () {
        var _a, _b;
        var reportTotal = (_a = reportItem.total) !== null && _a !== void 0 ? _a : 0;
        if (reportTotal) {
            if (reportItem.type === CONST_1.default.REPORT.TYPE.IOU) {
                reportTotal = Math.abs(reportTotal !== null && reportTotal !== void 0 ? reportTotal : 0);
            }
            else {
                reportTotal *= reportItem.type === CONST_1.default.REPORT.TYPE.EXPENSE || reportItem.type === CONST_1.default.REPORT.TYPE.INVOICE ? -1 : 1;
            }
        }
        var reportCurrency = (_b = reportItem.currency) !== null && _b !== void 0 ? _b : CONST_1.default.CURRENCY.USD;
        return { total: reportTotal, currency: reportCurrency };
    }, [reportItem.type, reportItem.total, reportItem.currency]), total = _d.total, currency = _d.currency;
    return (<react_native_1.View style={[styles.pt0, styles.flexRow, styles.alignItemsCenter, styles.justifyContentStart, styles.pl3]}>
            <react_native_1.View style={[styles.flexRow, styles.alignItemsCenter, styles.mnh40, styles.flex1, styles.gap3]}>
                {!!canSelectMultiple && (<Checkbox_1.default onPress={function () { return onCheckboxPress === null || onCheckboxPress === void 0 ? void 0 : onCheckboxPress(reportItem); }} isChecked={isSelectAllChecked} isIndeterminate={isIndeterminate} containerStyle={[StyleUtils.getCheckboxContainerStyle(20), StyleUtils.getMultiselectListStyles(!!reportItem.isSelected, !!reportItem.isDisabled)]} disabled={!!isDisabled || reportItem.isDisabledCheckbox} accessibilityLabel={(_b = reportItem.text) !== null && _b !== void 0 ? _b : ''} shouldStopMouseDownPropagation style={[styles.cursorUnset, StyleUtils.getCheckboxPressableStyle(), reportItem.isDisabledCheckbox && styles.cursorDisabled]}/>)}
                <react_native_1.View style={[{ flexShrink: 1, flexGrow: 1, minWidth: 0 }, styles.mr2]}>
                    <ReportSearchHeader_1.default report={reportItem} style={[{ maxWidth: 700 }]} transactions={reportItem.transactions} avatarBorderColor={avatarBorderColor}/>
                </react_native_1.View>
            </react_native_1.View>
            <react_native_1.View style={[styles.flexShrink0, styles.gap1, styles.pr3]}>
                <TotalCell_1.default total={total} currency={currency}/>
                {!isLargeScreenWidth && !!onDownArrowClick && (<react_native_1.View>
                        <Pressable_1.PressableWithFeedback onPress={onDownArrowClick} style={[styles.pl3, styles.justifyContentCenter, styles.alignItemsEnd]} accessibilityRole={CONST_1.default.ROLE.BUTTON} accessibilityLabel={isExpanded ? CONST_1.default.ACCESSIBILITY_LABELS.COLLAPSE : CONST_1.default.ACCESSIBILITY_LABELS.EXPAND}>
                            {function (_a) {
                var hovered = _a.hovered;
                return (<Icon_1.default src={isExpanded ? Expensicons.UpArrow : Expensicons.DownArrow} fill={theme.icon} additionalStyles={!hovered && styles.opacitySemiTransparent} small/>);
            }}
                        </Pressable_1.PressableWithFeedback>
                    </react_native_1.View>)}
            </react_native_1.View>
            {isLargeScreenWidth && (<react_native_1.View style={[StyleUtils.getReportTableColumnStyles(CONST_1.default.SEARCH.TABLE_COLUMNS.ACTION)]}>
                    <ActionCell_1.default action={reportItem.action} goToItem={handleOnButtonPress} isSelected={reportItem.isSelected} isLoading={isActionLoading} policyID={reportItem.policyID} reportID={reportItem.reportID} hash={reportItem.hash} amount={reportItem.total} extraSmall={!isLargeScreenWidth}/>
                </react_native_1.View>)}
        </react_native_1.View>);
}
function ReportListItemHeader(_a) {
    var _b, _c;
    var reportItem = _a.report, onSelectRow = _a.onSelectRow, onCheckboxPress = _a.onCheckboxPress, isDisabled = _a.isDisabled, isFocused = _a.isFocused, canSelectMultiple = _a.canSelectMultiple, isSelectAllChecked = _a.isSelectAllChecked, isIndeterminate = _a.isIndeterminate, onDownArrowClick = _a.onDownArrowClick, isExpanded = _a.isExpanded, isHovered = _a.isHovered, onDEWModalOpen = _a.onDEWModalOpen;
    var StyleUtils = (0, useStyleUtils_1.default)();
    var styles = (0, useThemeStyles_1.default)();
    var theme = (0, useTheme_1.default)();
    var _d = (0, SearchContext_1.useSearchContext)(), currentSearchHash = _d.currentSearchHash, currentSearchKey = _d.currentSearchKey;
    var _e = (0, useResponsiveLayout_1.default)(), isLargeScreenWidth = _e.isLargeScreenWidth, shouldUseNarrowLayout = _e.shouldUseNarrowLayout;
    var lastPaymentMethod = (0, useOnyx_1.default)(ONYXKEYS_1.default.NVP_LAST_PAYMENT_METHOD, { canBeMissing: true })[0];
    var thereIsFromAndTo = !!(reportItem === null || reportItem === void 0 ? void 0 : reportItem.from) && !!(reportItem === null || reportItem === void 0 ? void 0 : reportItem.to);
    var showUserInfo = (reportItem.type === CONST_1.default.REPORT.TYPE.IOU && thereIsFromAndTo) || (reportItem.type === CONST_1.default.REPORT.TYPE.EXPENSE && !!(reportItem === null || reportItem === void 0 ? void 0 : reportItem.from));
    var snapshot = (0, useOnyx_1.default)("".concat(ONYXKEYS_1.default.COLLECTION.SNAPSHOT).concat(currentSearchHash), { canBeMissing: true })[0];
    var snapshotReport = (0, react_1.useMemo)(function () {
        var _a, _b;
        // eslint-disable-next-line @typescript-eslint/no-deprecated
        return ((_b = (_a = snapshot === null || snapshot === void 0 ? void 0 : snapshot.data) === null || _a === void 0 ? void 0 : _a["".concat(ONYXKEYS_1.default.COLLECTION.REPORT).concat(reportItem.reportID)]) !== null && _b !== void 0 ? _b : {});
    }, [snapshot, reportItem.reportID]);
    var snapshotPolicy = (0, react_1.useMemo)(function () {
        var _a, _b;
        return ((_b = (_a = snapshot === null || snapshot === void 0 ? void 0 : snapshot.data) === null || _a === void 0 ? void 0 : _a["".concat(ONYXKEYS_1.default.COLLECTION.POLICY).concat(reportItem.policyID)]) !== null && _b !== void 0 ? _b : {});
    }, [snapshot, reportItem.policyID]);
    var avatarBorderColor = (_c = (_b = StyleUtils.getItemBackgroundColorStyle(!!reportItem.isSelected, !!isFocused || !!isHovered, !!isDisabled, theme.activeComponentBG, theme.hoverComponentBG)) === null || _b === void 0 ? void 0 : _b.backgroundColor) !== null && _c !== void 0 ? _c : theme.highlightBG;
    var handleOnButtonPress = function () {
        (0, Search_1.handleActionButtonPress)(currentSearchHash, reportItem, function () { return onSelectRow(reportItem); }, snapshotReport, snapshotPolicy, lastPaymentMethod, currentSearchKey, onDEWModalOpen);
    };
    return !isLargeScreenWidth ? (<react_native_1.View style={[styles.pv1Half]}>
            <UserInfoAndActionButtonRow_1.default item={reportItem} handleActionButtonPress={handleOnButtonPress} shouldShowUserInfo={showUserInfo} containerStyles={[styles.pr3, styles.mb2]} isInMobileSelectionMode={shouldUseNarrowLayout && !!canSelectMultiple}/>
            <HeaderFirstRow report={reportItem} onCheckboxPress={onCheckboxPress} isDisabled={isDisabled} canSelectMultiple={canSelectMultiple} avatarBorderColor={avatarBorderColor} isSelectAllChecked={isSelectAllChecked} isIndeterminate={isIndeterminate} onDownArrowClick={onDownArrowClick} isExpanded={isExpanded}/>
        </react_native_1.View>) : (<react_native_1.View>
            <HeaderFirstRow report={reportItem} onCheckboxPress={onCheckboxPress} isDisabled={isDisabled} canSelectMultiple={canSelectMultiple} handleOnButtonPress={handleOnButtonPress} avatarBorderColor={avatarBorderColor} isSelectAllChecked={isSelectAllChecked} isIndeterminate={isIndeterminate} onDownArrowClick={onDownArrowClick} isExpanded={isExpanded}/>
        </react_native_1.View>);
}
ReportListItemHeader.displayName = 'ReportListItemHeader';
exports.default = ReportListItemHeader;
