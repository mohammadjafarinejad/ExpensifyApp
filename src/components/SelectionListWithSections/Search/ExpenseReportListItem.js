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
var SearchContext_1 = require("@components/Search/SearchContext");
var BaseListItem_1 = require("@components/SelectionListWithSections/BaseListItem");
var useAnimatedHighlightStyle_1 = require("@hooks/useAnimatedHighlightStyle");
var useOnyx_1 = require("@hooks/useOnyx");
var useResponsiveLayout_1 = require("@hooks/useResponsiveLayout");
var useTheme_1 = require("@hooks/useTheme");
var useThemeStyles_1 = require("@hooks/useThemeStyles");
var Search_1 = require("@libs/actions/Search");
var variables_1 = require("@styles/variables");
var ONYXKEYS_1 = require("@src/ONYXKEYS");
var ExpenseReportListItemRow_1 = require("./ExpenseReportListItemRow");
function ExpenseReportListItem(_a) {
    var _b;
    var item = _a.item, isLoading = _a.isLoading, isFocused = _a.isFocused, showTooltip = _a.showTooltip, isDisabled = _a.isDisabled, canSelectMultiple = _a.canSelectMultiple, onSelectRow = _a.onSelectRow, onFocus = _a.onFocus, onLongPressRow = _a.onLongPressRow, shouldSyncFocus = _a.shouldSyncFocus, onCheckboxPress = _a.onCheckboxPress, onDEWModalOpen = _a.onDEWModalOpen;
    var reportItem = item;
    var styles = (0, useThemeStyles_1.default)();
    var theme = (0, useTheme_1.default)();
    var isLargeScreenWidth = (0, useResponsiveLayout_1.default)().isLargeScreenWidth;
    var _c = (0, SearchContext_1.useSearchContext)(), currentSearchHash = _c.currentSearchHash, currentSearchKey = _c.currentSearchKey;
    var lastPaymentMethod = (0, useOnyx_1.default)(ONYXKEYS_1.default.NVP_LAST_PAYMENT_METHOD, { canBeMissing: true })[0];
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
    var handleOnButtonPress = (0, react_1.useCallback)(function () {
        (0, Search_1.handleActionButtonPress)(currentSearchHash, reportItem, function () { return onSelectRow(reportItem); }, snapshotReport, snapshotPolicy, lastPaymentMethod, currentSearchKey, onDEWModalOpen);
    }, [currentSearchHash, reportItem, onSelectRow, snapshotReport, snapshotPolicy, lastPaymentMethod, currentSearchKey, onDEWModalOpen]);
    var listItemPressableStyle = [
        styles.selectionListPressableItemWrapper,
        styles.pv3,
        styles.ph3,
        // Removing background style because they are added to the parent OpacityView via animatedHighlightStyle
        styles.bgTransparent,
        item.isSelected && styles.activeComponentBG,
        styles.mh0,
    ];
    var listItemWrapperStyle = [
        styles.flex1,
        styles.userSelectNone,
        isLargeScreenWidth ? __assign(__assign(__assign({}, styles.flexRow), styles.justifyContentBetween), styles.alignItemsCenter) : __assign(__assign({}, styles.flexColumn), styles.alignItemsStretch),
    ];
    var animatedHighlightStyle = (0, useAnimatedHighlightStyle_1.default)({
        borderRadius: variables_1.default.componentBorderRadius,
        shouldHighlight: (_b = item === null || item === void 0 ? void 0 : item.shouldAnimateInHighlight) !== null && _b !== void 0 ? _b : false,
        highlightColor: theme.messageHighlightBG,
        backgroundColor: theme.highlightBG,
    });
    return (<BaseListItem_1.default item={item} pressableStyle={listItemPressableStyle} wrapperStyle={listItemWrapperStyle} containerStyle={[styles.mb2]} isFocused={isFocused} isDisabled={isDisabled} showTooltip={showTooltip} canSelectMultiple={canSelectMultiple} onSelectRow={onSelectRow} pendingAction={item.pendingAction} keyForList={item.keyForList} onFocus={onFocus} onLongPressRow={onLongPressRow} shouldSyncFocus={shouldSyncFocus} hoverStyle={item.isSelected && styles.activeComponentBG} pressableWrapperStyle={[styles.mh5, animatedHighlightStyle]} shouldShowRightCaret={isLargeScreenWidth}>
            {function (hovered) { return (<ExpenseReportListItemRow_1.default item={reportItem} isActionLoading={isLoading !== null && isLoading !== void 0 ? isLoading : reportItem.isActionLoading} showTooltip={showTooltip} canSelectMultiple={canSelectMultiple} onCheckboxPress={function () { return onCheckboxPress === null || onCheckboxPress === void 0 ? void 0 : onCheckboxPress(reportItem); }} onButtonPress={handleOnButtonPress} avatarBorderColor={theme.highlightBG} isSelectAllChecked={!!reportItem.isSelected} isIndeterminate={false} isDisabled={!!isDisabled} isHovered={hovered} isFocused={isFocused}/>); }}
        </BaseListItem_1.default>);
}
ExpenseReportListItem.displayName = 'ExpenseReportListItem';
exports.default = ExpenseReportListItem;
