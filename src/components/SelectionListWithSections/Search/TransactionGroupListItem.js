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
var react_native_1 = require("react-native");
// Use the original useOnyx hook to get the real-time data from Onyx and not from the snapshot
// eslint-disable-next-line no-restricted-imports
var react_native_onyx_1 = require("react-native-onyx");
var AnimatedCollapsible_1 = require("@components/AnimatedCollapsible");
var utils_1 = require("@components/Button/utils");
var OfflineWithFeedback_1 = require("@components/OfflineWithFeedback");
var Pressable_1 = require("@components/Pressable");
var SearchContext_1 = require("@components/Search/SearchContext");
var useAnimatedHighlightStyle_1 = require("@hooks/useAnimatedHighlightStyle");
var useCurrentUserPersonalDetails_1 = require("@hooks/useCurrentUserPersonalDetails");
var useLocalize_1 = require("@hooks/useLocalize");
var useOnyx_1 = require("@hooks/useOnyx");
var useResponsiveLayout_1 = require("@hooks/useResponsiveLayout");
var useStyleUtils_1 = require("@hooks/useStyleUtils");
var useSyncFocus_1 = require("@hooks/useSyncFocus");
var useTheme_1 = require("@hooks/useTheme");
var useThemeStyles_1 = require("@hooks/useThemeStyles");
var Search_1 = require("@libs/actions/Search");
var SearchUIUtils_1 = require("@libs/SearchUIUtils");
var variables_1 = require("@styles/variables");
var CONST_1 = require("@src/CONST");
var ONYXKEYS_1 = require("@src/ONYXKEYS");
var ReportMetaData_1 = require("@src/selectors/ReportMetaData");
var CardListItemHeader_1 = require("./CardListItemHeader");
var MemberListItemHeader_1 = require("./MemberListItemHeader");
var ReportListItemHeader_1 = require("./ReportListItemHeader");
var TransactionGroupListExpanded_1 = require("./TransactionGroupListExpanded");
var WithdrawalIDListItemHeader_1 = require("./WithdrawalIDListItemHeader");
function TransactionGroupListItem(_a) {
    var _b;
    var _c, _d, _e, _f, _g, _h;
    var item = _a.item, isFocused = _a.isFocused, showTooltip = _a.showTooltip, isDisabled = _a.isDisabled, canSelectMultiple = _a.canSelectMultiple, onCheckboxPressRow = _a.onCheckboxPress, onSelectRow = _a.onSelectRow, onFocus = _a.onFocus, onLongPressRow = _a.onLongPressRow, shouldSyncFocus = _a.shouldSyncFocus, columns = _a.columns, groupBy = _a.groupBy, searchType = _a.searchType, accountID = _a.accountID, isOffline = _a.isOffline, areAllOptionalColumnsHidden = _a.areAllOptionalColumnsHidden, newTransactionID = _a.newTransactionID, violations = _a.violations, onDEWModalOpen = _a.onDEWModalOpen;
    var groupItem = item;
    var theme = (0, useTheme_1.default)();
    var styles = (0, useThemeStyles_1.default)();
    var formatPhoneNumber = (0, useLocalize_1.default)().formatPhoneNumber;
    var selectedTransactions = (0, SearchContext_1.useSearchContext)().selectedTransactions;
    var isLargeScreenWidth = (0, useResponsiveLayout_1.default)().isLargeScreenWidth;
    var currentUserDetails = (0, useCurrentUserPersonalDetails_1.default)();
    var oneTransactionItem = groupItem.isOneTransactionReport ? groupItem.transactions.at(0) : undefined;
    var parentReport = (0, react_native_onyx_1.useOnyx)("".concat(ONYXKEYS_1.default.COLLECTION.REPORT).concat(oneTransactionItem === null || oneTransactionItem === void 0 ? void 0 : oneTransactionItem.reportID), { canBeMissing: true })[0];
    var oneTransactionThreadReport = (0, react_native_onyx_1.useOnyx)("".concat(ONYXKEYS_1.default.COLLECTION.REPORT).concat(oneTransactionItem === null || oneTransactionItem === void 0 ? void 0 : oneTransactionItem.transactionThreadReportID), { canBeMissing: true })[0];
    var oneTransaction = (0, react_native_onyx_1.useOnyx)("".concat(ONYXKEYS_1.default.COLLECTION.TRANSACTION).concat(oneTransactionItem === null || oneTransactionItem === void 0 ? void 0 : oneTransactionItem.transactionID), { canBeMissing: true })[0];
    var parentReportActionSelector = (0, react_1.useCallback)(function (reportActions) { return reportActions === null || reportActions === void 0 ? void 0 : reportActions["".concat(oneTransactionItem === null || oneTransactionItem === void 0 ? void 0 : oneTransactionItem.moneyRequestReportActionID)]; }, [oneTransactionItem]);
    var parentReportAction = (0, react_native_onyx_1.useOnyx)("".concat(ONYXKEYS_1.default.COLLECTION.REPORT_ACTIONS).concat(oneTransactionItem === null || oneTransactionItem === void 0 ? void 0 : oneTransactionItem.reportID), { selector: parentReportActionSelector, canBeMissing: true }, [
        oneTransactionItem,
    ])[0];
    var transactionPreviewData = (0, react_1.useMemo)(function () { return ({ hasParentReport: !!parentReport, hasTransaction: !!oneTransaction, hasParentReportAction: !!parentReportAction, hasTransactionThreadReport: !!oneTransactionThreadReport }); }, [parentReport, oneTransaction, parentReportAction, oneTransactionThreadReport]);
    var selectedTransactionIDs = Object.keys(selectedTransactions);
    var selectedTransactionIDsSet = (0, react_1.useMemo)(function () { return new Set(selectedTransactionIDs); }, [selectedTransactionIDs]);
    var transactionsSnapshot = (0, useOnyx_1.default)("".concat(ONYXKEYS_1.default.COLLECTION.SNAPSHOT).concat((_c = groupItem.transactionsQueryJSON) === null || _c === void 0 ? void 0 : _c.hash), { canBeMissing: true })[0];
    var isExpenseReportType = searchType === CONST_1.default.SEARCH.DATA_TYPES.EXPENSE_REPORT;
    var _j = (0, react_1.useState)(CONST_1.default.TRANSACTION.RESULTS_PAGE_SIZE), transactionsVisibleLimit = _j[0], setTransactionsVisibleLimit = _j[1];
    var _k = (0, react_1.useState)(false), isExpanded = _k[0], setIsExpanded = _k[1];
    var _l = (0, useOnyx_1.default)("".concat(ONYXKEYS_1.default.COLLECTION.REPORT_METADATA), { canBeMissing: true, selector: ReportMetaData_1.isActionLoadingSetSelector })[0], isActionLoadingSet = _l === void 0 ? new Set() : _l;
    var transactions = (0, react_1.useMemo)(function () {
        var _a;
        if (isExpenseReportType) {
            return groupItem.transactions;
        }
        if (!(transactionsSnapshot === null || transactionsSnapshot === void 0 ? void 0 : transactionsSnapshot.data)) {
            return [];
        }
        var sectionData = (0, SearchUIUtils_1.getSections)({
            type: CONST_1.default.SEARCH.DATA_TYPES.EXPENSE,
            data: transactionsSnapshot === null || transactionsSnapshot === void 0 ? void 0 : transactionsSnapshot.data,
            currentAccountID: accountID,
            currentUserEmail: (_a = currentUserDetails.email) !== null && _a !== void 0 ? _a : '',
            formatPhoneNumber: formatPhoneNumber,
            isActionLoadingSet: isActionLoadingSet,
        });
        return sectionData.map(function (transactionItem) { return (__assign(__assign({}, transactionItem), { isSelected: selectedTransactionIDsSet.has(transactionItem.transactionID) })); });
    }, [isExpenseReportType, transactionsSnapshot === null || transactionsSnapshot === void 0 ? void 0 : transactionsSnapshot.data, accountID, formatPhoneNumber, groupItem.transactions, selectedTransactionIDsSet, currentUserDetails.email, isActionLoadingSet]);
    var selectedItemsLength = (0, react_1.useMemo)(function () {
        return transactions.reduce(function (acc, transaction) {
            return transaction.isSelected ? acc + 1 : acc;
        }, 0);
    }, [transactions]);
    var transactionsWithoutPendingDelete = (0, react_1.useMemo)(function () {
        return transactions.filter(function (transaction) { return transaction.pendingAction !== CONST_1.default.RED_BRICK_ROAD_PENDING_ACTION.DELETE; });
    }, [transactions]);
    var isSelectAllChecked = selectedItemsLength === transactions.length && transactions.length > 0;
    var isIndeterminate = selectedItemsLength > 0 && selectedItemsLength !== transactionsWithoutPendingDelete.length;
    var isEmpty = transactions.length === 0;
    // Currently only the transaction report groups have transactions where the empty view makes sense
    var shouldDisplayEmptyView = isEmpty && isExpenseReportType;
    var isDisabledOrEmpty = isEmpty || isDisabled;
    var searchTransactions = (0, react_1.useCallback)(function (pageSize) {
        var _a, _b;
        if (pageSize === void 0) { pageSize = 0; }
        if (!groupItem.transactionsQueryJSON) {
            return;
        }
        (0, Search_1.search)({
            queryJSON: groupItem.transactionsQueryJSON,
            searchKey: undefined,
            offset: ((_b = (_a = transactionsSnapshot === null || transactionsSnapshot === void 0 ? void 0 : transactionsSnapshot.search) === null || _a === void 0 ? void 0 : _a.offset) !== null && _b !== void 0 ? _b : 0) + pageSize,
            shouldCalculateTotals: false,
        });
    }, [groupItem.transactionsQueryJSON, (_d = transactionsSnapshot === null || transactionsSnapshot === void 0 ? void 0 : transactionsSnapshot.search) === null || _d === void 0 ? void 0 : _d.offset]);
    var animatedHighlightStyle = (0, useAnimatedHighlightStyle_1.default)({
        borderRadius: variables_1.default.componentBorderRadius,
        shouldHighlight: (_e = item === null || item === void 0 ? void 0 : item.shouldAnimateInHighlight) !== null && _e !== void 0 ? _e : false,
        highlightColor: theme.messageHighlightBG,
        backgroundColor: theme.highlightBG,
    });
    var isItemSelected = isSelectAllChecked || (item === null || item === void 0 ? void 0 : item.isSelected);
    var pressableStyle = [styles.transactionGroupListItemStyle, isItemSelected && styles.activeComponentBG];
    var StyleUtils = (0, useStyleUtils_1.default)();
    var pressableRef = (0, react_1.useRef)(null);
    (0, react_1.useEffect)(function () {
        if (!newTransactionID || !isExpanded) {
            return;
        }
        searchTransactions();
    }, [newTransactionID, isExpanded, searchTransactions]);
    var handleToggle = (0, react_1.useCallback)(function () {
        setIsExpanded(!isExpanded);
        if (isExpanded) {
            setTransactionsVisibleLimit(CONST_1.default.TRANSACTION.RESULTS_PAGE_SIZE);
        }
    }, [isExpanded]);
    var onPress = (0, react_1.useCallback)(function () {
        if (isExpenseReportType || transactions.length === 0) {
            onSelectRow(item, transactionPreviewData);
        }
        if (!isExpenseReportType) {
            handleToggle();
        }
    }, [isExpenseReportType, transactions.length, onSelectRow, transactionPreviewData, item, handleToggle]);
    var onLongPress = (0, react_1.useCallback)(function () {
        if (isEmpty) {
            return;
        }
        onLongPressRow === null || onLongPressRow === void 0 ? void 0 : onLongPressRow(item, isExpenseReportType ? undefined : transactions);
    }, [isEmpty, isExpenseReportType, item, onLongPressRow, transactions]);
    var onCheckboxPress = (0, react_1.useCallback)(function (val) {
        onCheckboxPressRow === null || onCheckboxPressRow === void 0 ? void 0 : onCheckboxPressRow(val, isExpenseReportType ? undefined : transactions);
    }, [onCheckboxPressRow, transactions, isExpenseReportType]);
    var onExpandIconPress = (0, react_1.useCallback)(function () {
        if (isEmpty && !shouldDisplayEmptyView) {
            onPress();
        }
        else if (groupItem.transactionsQueryJSON && !isExpanded) {
            searchTransactions();
        }
        handleToggle();
    }, [isEmpty, shouldDisplayEmptyView, groupItem.transactionsQueryJSON, isExpanded, handleToggle, onPress, searchTransactions]);
    var getHeader = (0, react_1.useCallback)(function (hovered) {
        var _a;
        var headers = (_a = {},
            _a[CONST_1.default.SEARCH.GROUP_BY.FROM] = (<MemberListItemHeader_1.default member={groupItem} onCheckboxPress={onCheckboxPress} isDisabled={isDisabledOrEmpty} canSelectMultiple={canSelectMultiple} isSelectAllChecked={isSelectAllChecked} isIndeterminate={isIndeterminate} onDownArrowClick={onExpandIconPress} isExpanded={isExpanded}/>),
            _a[CONST_1.default.SEARCH.GROUP_BY.CARD] = (<CardListItemHeader_1.default card={groupItem} onCheckboxPress={onCheckboxPress} isDisabled={isDisabledOrEmpty} isFocused={isFocused} canSelectMultiple={canSelectMultiple} isSelectAllChecked={isSelectAllChecked} isIndeterminate={isIndeterminate} onDownArrowClick={onExpandIconPress} isExpanded={isExpanded}/>),
            _a[CONST_1.default.SEARCH.GROUP_BY.WITHDRAWAL_ID] = (<WithdrawalIDListItemHeader_1.default withdrawalID={groupItem} onCheckboxPress={onCheckboxPress} isDisabled={isDisabledOrEmpty} canSelectMultiple={canSelectMultiple} isSelectAllChecked={isSelectAllChecked} isIndeterminate={isIndeterminate} onDownArrowClick={onExpandIconPress} isExpanded={isExpanded}/>),
            _a);
        if (searchType === CONST_1.default.SEARCH.DATA_TYPES.EXPENSE_REPORT) {
            return (<ReportListItemHeader_1.default report={groupItem} onSelectRow={function (listItem) { return onSelectRow(listItem, transactionPreviewData); }} onCheckboxPress={onCheckboxPress} isDisabled={isDisabledOrEmpty} isFocused={isFocused} canSelectMultiple={canSelectMultiple} isSelectAllChecked={isSelectAllChecked} isIndeterminate={isIndeterminate} isHovered={hovered} onDEWModalOpen={onDEWModalOpen} onDownArrowClick={onExpandIconPress} isExpanded={isExpanded}/>);
        }
        if (!groupBy) {
            return null;
        }
        return headers[groupBy];
    }, [
        groupItem,
        onSelectRow,
        transactionPreviewData,
        onCheckboxPress,
        isDisabledOrEmpty,
        isFocused,
        canSelectMultiple,
        isSelectAllChecked,
        isIndeterminate,
        onDEWModalOpen,
        groupBy,
        isExpanded,
        onExpandIconPress,
        searchType,
    ]);
    (0, useSyncFocus_1.default)(pressableRef, !!isFocused, shouldSyncFocus);
    var pendingAction = (_f = item.pendingAction) !== null && _f !== void 0 ? _f : (groupItem.transactions.length > 0 && groupItem.transactions.every(function (transaction) { return transaction.pendingAction === CONST_1.default.RED_BRICK_ROAD_PENDING_ACTION.DELETE; })
        ? CONST_1.default.RED_BRICK_ROAD_PENDING_ACTION.DELETE
        : undefined);
    return (<OfflineWithFeedback_1.default pendingAction={pendingAction}>
            <Pressable_1.PressableWithFeedback ref={pressableRef} onLongPress={onLongPress} onPress={onPress} disabled={isDisabled && !isItemSelected} accessibilityLabel={(_g = item.text) !== null && _g !== void 0 ? _g : ''} role={(0, utils_1.getButtonRole)(true)} isNested hoverStyle={[!item.isDisabled && styles.hoveredComponentBG, isItemSelected && styles.activeComponentBG]} dataSet={_b = {}, _b[CONST_1.default.SELECTION_SCRAPER_HIDDEN_ELEMENT] = true, _b[CONST_1.default.INNER_BOX_SHADOW_ELEMENT] = false, _b} onMouseDown={function (e) { return e.preventDefault(); }} id={(_h = item.keyForList) !== null && _h !== void 0 ? _h : ''} style={[
            pressableStyle,
            isFocused && StyleUtils.getItemBackgroundColorStyle(!!isItemSelected, !!isFocused, !!item.isDisabled, theme.activeComponentBG, theme.hoverComponentBG),
        ]} onFocus={onFocus} wrapperStyle={[styles.mb2, styles.mh5, animatedHighlightStyle, styles.userSelectNone]}>
                {function (_a) {
            var hovered = _a.hovered;
            return (<react_native_1.View style={styles.flex1}>
                        <AnimatedCollapsible_1.default isExpanded={isExpanded} header={getHeader(hovered)} onPress={onExpandIconPress} expandButtonStyle={styles.pv4Half} shouldShowToggleButton={isLargeScreenWidth}>
                            <TransactionGroupListExpanded_1.default showTooltip={showTooltip} canSelectMultiple={canSelectMultiple} onCheckboxPress={onCheckboxPress} columns={columns} groupBy={groupBy} accountID={accountID} isOffline={isOffline} areAllOptionalColumnsHidden={areAllOptionalColumnsHidden} violations={violations} transactions={transactions} transactionsVisibleLimit={transactionsVisibleLimit} setTransactionsVisibleLimit={setTransactionsVisibleLimit} isEmpty={isEmpty} shouldDisplayEmptyView={shouldDisplayEmptyView} isExpenseReportType={isExpenseReportType} transactionsSnapshot={transactionsSnapshot} transactionsQueryJSON={groupItem.transactionsQueryJSON} searchTransactions={searchTransactions} isInSingleTransactionReport={groupItem.transactions.length === 1}/>
                        </AnimatedCollapsible_1.default>
                    </react_native_1.View>);
        }}
            </Pressable_1.PressableWithFeedback>
        </OfflineWithFeedback_1.default>);
}
TransactionGroupListItem.displayName = 'TransactionGroupListItem';
exports.default = TransactionGroupListItem;
