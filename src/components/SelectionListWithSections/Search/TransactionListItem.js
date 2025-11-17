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
// Use the original useOnyx hook to get the real-time data from Onyx and not from the snapshot
// eslint-disable-next-line no-restricted-imports
var react_native_onyx_1 = require("react-native-onyx");
var utils_1 = require("@components/Button/utils");
var OfflineWithFeedback_1 = require("@components/OfflineWithFeedback");
var PressableWithFeedback_1 = require("@components/Pressable/PressableWithFeedback");
var SearchContext_1 = require("@components/Search/SearchContext");
var TransactionItemRow_1 = require("@components/TransactionItemRow");
var useAnimatedHighlightStyle_1 = require("@hooks/useAnimatedHighlightStyle");
var useCurrentUserPersonalDetails_1 = require("@hooks/useCurrentUserPersonalDetails");
var useOnyx_1 = require("@hooks/useOnyx");
var useResponsiveLayout_1 = require("@hooks/useResponsiveLayout");
var useStyleUtils_1 = require("@hooks/useStyleUtils");
var useSyncFocus_1 = require("@hooks/useSyncFocus");
var useTheme_1 = require("@hooks/useTheme");
var useThemeStyles_1 = require("@hooks/useThemeStyles");
var Search_1 = require("@libs/actions/Search");
var TransactionUtils_1 = require("@libs/TransactionUtils");
var variables_1 = require("@styles/variables");
var CONST_1 = require("@src/CONST");
var ONYXKEYS_1 = require("@src/ONYXKEYS");
var ReportMetaData_1 = require("@src/selectors/ReportMetaData");
var UserInfoAndActionButtonRow_1 = require("./UserInfoAndActionButtonRow");
function TransactionListItem(_a) {
    var _b;
    var _c, _d, _e, _f;
    var item = _a.item, isFocused = _a.isFocused, showTooltip = _a.showTooltip, isDisabled = _a.isDisabled, canSelectMultiple = _a.canSelectMultiple, onSelectRow = _a.onSelectRow, onCheckboxPress = _a.onCheckboxPress, onFocus = _a.onFocus, onLongPressRow = _a.onLongPressRow, shouldSyncFocus = _a.shouldSyncFocus, columns = _a.columns, isLoading = _a.isLoading, areAllOptionalColumnsHidden = _a.areAllOptionalColumnsHidden, violations = _a.violations, onDEWModalOpen = _a.onDEWModalOpen;
    var transactionItem = item;
    var styles = (0, useThemeStyles_1.default)();
    var theme = (0, useTheme_1.default)();
    var _g = (0, useResponsiveLayout_1.default)(), isLargeScreenWidth = _g.isLargeScreenWidth, shouldUseNarrowLayout = _g.shouldUseNarrowLayout;
    var _h = (0, SearchContext_1.useSearchContext)(), currentSearchHash = _h.currentSearchHash, currentSearchKey = _h.currentSearchKey;
    var snapshot = (0, useOnyx_1.default)("".concat(ONYXKEYS_1.default.COLLECTION.SNAPSHOT).concat(currentSearchHash), { canBeMissing: true })[0];
    var snapshotReport = (0, react_1.useMemo)(function () {
        var _a, _b;
        // eslint-disable-next-line @typescript-eslint/no-deprecated
        return ((_b = (_a = snapshot === null || snapshot === void 0 ? void 0 : snapshot.data) === null || _a === void 0 ? void 0 : _a["".concat(ONYXKEYS_1.default.COLLECTION.REPORT).concat(transactionItem.reportID)]) !== null && _b !== void 0 ? _b : {});
    }, [snapshot, transactionItem.reportID]);
    var isActionLoading = (0, useOnyx_1.default)("".concat(ONYXKEYS_1.default.COLLECTION.REPORT_METADATA).concat(transactionItem.reportID), { canBeMissing: true, selector: ReportMetaData_1.isActionLoadingSelector })[0];
    var snapshotPolicy = (0, react_1.useMemo)(function () {
        var _a, _b;
        return ((_b = (_a = snapshot === null || snapshot === void 0 ? void 0 : snapshot.data) === null || _a === void 0 ? void 0 : _a["".concat(ONYXKEYS_1.default.COLLECTION.POLICY).concat(transactionItem.policyID)]) !== null && _b !== void 0 ? _b : {});
    }, [snapshot, transactionItem.policyID]);
    var lastPaymentMethod = (0, useOnyx_1.default)("".concat(ONYXKEYS_1.default.NVP_LAST_PAYMENT_METHOD), { canBeMissing: true })[0];
    var parentReport = (0, react_native_onyx_1.useOnyx)("".concat(ONYXKEYS_1.default.COLLECTION.REPORT).concat(transactionItem.reportID), { canBeMissing: true })[0];
    var transactionThreadReport = (0, react_native_onyx_1.useOnyx)("".concat(ONYXKEYS_1.default.COLLECTION.REPORT).concat(transactionItem.transactionThreadReportID), { canBeMissing: true })[0];
    var transaction = (0, react_native_onyx_1.useOnyx)("".concat(ONYXKEYS_1.default.COLLECTION.TRANSACTION).concat(transactionItem.transactionID), { canBeMissing: true })[0];
    var parentReportActionSelector = (0, react_1.useCallback)(function (reportActions) { return reportActions === null || reportActions === void 0 ? void 0 : reportActions["".concat(transactionItem === null || transactionItem === void 0 ? void 0 : transactionItem.moneyRequestReportActionID)]; }, [transactionItem]);
    var parentReportAction = (0, react_native_onyx_1.useOnyx)("".concat(ONYXKEYS_1.default.COLLECTION.REPORT_ACTIONS).concat(transactionItem.reportID), { selector: parentReportActionSelector, canBeMissing: true }, [
        transactionItem,
    ])[0];
    var currentUserDetails = (0, useCurrentUserPersonalDetails_1.default)();
    var transactionPreviewData = (0, react_1.useMemo)(function () { return ({ hasParentReport: !!parentReport, hasTransaction: !!transaction, hasParentReportAction: !!parentReportAction, hasTransactionThreadReport: !!transactionThreadReport }); }, [parentReport, transaction, parentReportAction, transactionThreadReport]);
    var pressableStyle = [
        styles.transactionListItemStyle,
        !isLargeScreenWidth && styles.pt3,
        item.isSelected && styles.activeComponentBG,
        isLargeScreenWidth ? __assign(__assign(__assign({}, styles.flexRow), styles.justifyContentBetween), styles.alignItemsCenter) : __assign(__assign({}, styles.flexColumn), styles.alignItemsStretch),
    ];
    var animatedHighlightStyle = (0, useAnimatedHighlightStyle_1.default)({
        borderRadius: variables_1.default.componentBorderRadius,
        shouldHighlight: (_c = item === null || item === void 0 ? void 0 : item.shouldAnimateInHighlight) !== null && _c !== void 0 ? _c : false,
        highlightColor: theme.messageHighlightBG,
        backgroundColor: theme.highlightBG,
    });
    var _j = (0, react_1.useMemo)(function () {
        return {
            amountColumnSize: transactionItem.isAmountColumnWide ? CONST_1.default.SEARCH.TABLE_COLUMN_SIZES.WIDE : CONST_1.default.SEARCH.TABLE_COLUMN_SIZES.NORMAL,
            taxAmountColumnSize: transactionItem.isTaxAmountColumnWide ? CONST_1.default.SEARCH.TABLE_COLUMN_SIZES.WIDE : CONST_1.default.SEARCH.TABLE_COLUMN_SIZES.NORMAL,
            dateColumnSize: transactionItem.shouldShowYear ? CONST_1.default.SEARCH.TABLE_COLUMN_SIZES.WIDE : CONST_1.default.SEARCH.TABLE_COLUMN_SIZES.NORMAL,
        };
    }, [transactionItem]), amountColumnSize = _j.amountColumnSize, dateColumnSize = _j.dateColumnSize, taxAmountColumnSize = _j.taxAmountColumnSize;
    var transactionViolations = (0, react_1.useMemo)(function () {
        var _a;
        return ((_a = violations === null || violations === void 0 ? void 0 : violations["".concat(ONYXKEYS_1.default.COLLECTION.TRANSACTION_VIOLATIONS).concat(transactionItem.transactionID)]) !== null && _a !== void 0 ? _a : []).filter(function (violation) {
            var _a, _b;
            return !(0, TransactionUtils_1.isViolationDismissed)(transactionItem, violation, (_a = currentUserDetails.email) !== null && _a !== void 0 ? _a : '') &&
                (0, TransactionUtils_1.shouldShowViolation)(snapshotReport, snapshotPolicy, violation.name, (_b = currentUserDetails.email) !== null && _b !== void 0 ? _b : '', false);
        });
    }, [snapshotPolicy, snapshotReport, transactionItem, violations, currentUserDetails.email]);
    var handleActionButtonPress = (0, react_1.useCallback)(function () {
        (0, Search_1.handleActionButtonPress)(currentSearchHash, transactionItem, function () { return onSelectRow(item, transactionPreviewData); }, snapshotReport, snapshotPolicy, lastPaymentMethod, currentSearchKey, onDEWModalOpen);
    }, [currentSearchHash, transactionItem, transactionPreviewData, snapshotReport, snapshotPolicy, lastPaymentMethod, currentSearchKey, onSelectRow, item, onDEWModalOpen]);
    var handleCheckboxPress = (0, react_1.useCallback)(function () {
        onCheckboxPress === null || onCheckboxPress === void 0 ? void 0 : onCheckboxPress(item);
    }, [item, onCheckboxPress]);
    var onPress = (0, react_1.useCallback)(function () {
        onSelectRow(item, transactionPreviewData);
    }, [item, onSelectRow, transactionPreviewData]);
    var onLongPress = (0, react_1.useCallback)(function () {
        onLongPressRow === null || onLongPressRow === void 0 ? void 0 : onLongPressRow(item);
    }, [item, onLongPressRow]);
    var StyleUtils = (0, useStyleUtils_1.default)();
    var pressableRef = (0, react_1.useRef)(null);
    (0, useSyncFocus_1.default)(pressableRef, !!isFocused, shouldSyncFocus);
    return (<OfflineWithFeedback_1.default pendingAction={item.pendingAction}>
            <PressableWithFeedback_1.default ref={pressableRef} onLongPress={onLongPress} onPress={onPress} disabled={isDisabled && !item.isSelected} accessibilityLabel={(_d = item.text) !== null && _d !== void 0 ? _d : ''} role={(0, utils_1.getButtonRole)(true)} isNested onMouseDown={function (e) { return e.preventDefault(); }} hoverStyle={[!item.isDisabled && styles.hoveredComponentBG, item.isSelected && styles.activeComponentBG]} dataSet={_b = {}, _b[CONST_1.default.SELECTION_SCRAPER_HIDDEN_ELEMENT] = true, _b[CONST_1.default.INNER_BOX_SHADOW_ELEMENT] = false, _b} id={(_e = item.keyForList) !== null && _e !== void 0 ? _e : ''} style={[
            pressableStyle,
            isFocused && StyleUtils.getItemBackgroundColorStyle(!!item.isSelected, !!isFocused, !!item.isDisabled, theme.activeComponentBG, theme.hoverComponentBG),
        ]} onFocus={onFocus} wrapperStyle={[styles.mb2, styles.mh5, styles.flex1, animatedHighlightStyle, styles.userSelectNone]}>
                {!isLargeScreenWidth && (<UserInfoAndActionButtonRow_1.default item={transactionItem} handleActionButtonPress={handleActionButtonPress} shouldShowUserInfo={!!(transactionItem === null || transactionItem === void 0 ? void 0 : transactionItem.from)} isInMobileSelectionMode={shouldUseNarrowLayout && !!canSelectMultiple}/>)}
                <TransactionItemRow_1.default transactionItem={transactionItem} report={transactionItem.report} shouldShowTooltip={showTooltip} onButtonPress={handleActionButtonPress} onCheckboxPress={handleCheckboxPress} shouldUseNarrowLayout={!isLargeScreenWidth} columns={columns} isActionLoading={(_f = isLoading !== null && isLoading !== void 0 ? isLoading : transactionItem.isActionLoading) !== null && _f !== void 0 ? _f : isActionLoading} isSelected={!!transactionItem.isSelected} dateColumnSize={dateColumnSize} amountColumnSize={amountColumnSize} taxAmountColumnSize={taxAmountColumnSize} shouldShowCheckbox={!!canSelectMultiple} style={[styles.p3, styles.pv2, shouldUseNarrowLayout ? styles.pt2 : {}, isLargeScreenWidth && styles.pr0]} areAllOptionalColumnsHidden={areAllOptionalColumnsHidden} violations={transactionViolations} onArrowRightPress={onPress}/>
            </PressableWithFeedback_1.default>
        </OfflineWithFeedback_1.default>);
}
TransactionListItem.displayName = 'TransactionListItem';
exports.default = TransactionListItem;
