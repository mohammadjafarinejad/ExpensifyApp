"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_native_1 = require("react-native");
var ActivityIndicator_1 = require("@components/ActivityIndicator");
var Button_1 = require("@components/Button");
var OfflineWithFeedback_1 = require("@components/OfflineWithFeedback");
var SearchContext_1 = require("@components/Search/SearchContext");
var SearchTableHeader_1 = require("@components/SelectionListWithSections/SearchTableHeader");
var Text_1 = require("@components/Text");
var TransactionItemRow_1 = require("@components/TransactionItemRow");
var WideRHPContextProvider_1 = require("@components/WideRHPContextProvider");
var useCurrentUserPersonalDetails_1 = require("@hooks/useCurrentUserPersonalDetails");
var useLocalize_1 = require("@hooks/useLocalize");
var useResponsiveLayout_1 = require("@hooks/useResponsiveLayout");
var useTheme_1 = require("@hooks/useTheme");
var useThemeStyles_1 = require("@hooks/useThemeStyles");
var MoneyRequestReportUtils_1 = require("@libs/MoneyRequestReportUtils");
var Navigation_1 = require("@libs/Navigation/Navigation");
var SearchUIUtils_1 = require("@libs/SearchUIUtils");
var TransactionUtils_1 = require("@libs/TransactionUtils");
var TransactionThreadNavigation_1 = require("@userActions/TransactionThreadNavigation");
var CONST_1 = require("@src/CONST");
var ROUTES_1 = require("@src/ROUTES");
function TransactionGroupListExpanded(_a) {
    var _b;
    var transactionsQueryJSON = _a.transactionsQueryJSON, showTooltip = _a.showTooltip, canSelectMultiple = _a.canSelectMultiple, onCheckboxPress = _a.onCheckboxPress, columns = _a.columns, groupBy = _a.groupBy, accountID = _a.accountID, isOffline = _a.isOffline, violations = _a.violations, areAllOptionalColumnsHiddenProp = _a.areAllOptionalColumnsHidden, transactions = _a.transactions, transactionsVisibleLimit = _a.transactionsVisibleLimit, setTransactionsVisibleLimit = _a.setTransactionsVisibleLimit, isEmpty = _a.isEmpty, isExpenseReportType = _a.isExpenseReportType, transactionsSnapshot = _a.transactionsSnapshot, shouldDisplayEmptyView = _a.shouldDisplayEmptyView, searchTransactions = _a.searchTransactions, isInSingleTransactionReport = _a.isInSingleTransactionReport;
    var theme = (0, useTheme_1.default)();
    var styles = (0, useThemeStyles_1.default)();
    var currentUserDetails = (0, useCurrentUserPersonalDetails_1.default)();
    var translate = (0, useLocalize_1.default)().translate;
    var currentSearchHash = (0, SearchContext_1.useSearchContext)().currentSearchHash;
    var transactionsSnapshotMetadata = (0, react_1.useMemo)(function () {
        return transactionsSnapshot === null || transactionsSnapshot === void 0 ? void 0 : transactionsSnapshot.search;
    }, [transactionsSnapshot]);
    var visibleTransactions = (0, react_1.useMemo)(function () {
        if (isExpenseReportType) {
            return transactions.slice(0, transactionsVisibleLimit);
        }
        return transactions;
    }, [transactions, transactionsVisibleLimit, isExpenseReportType]);
    var isLastTransaction = (0, react_1.useCallback)(function (index) {
        return index === visibleTransactions.length - 1;
    }, [visibleTransactions]);
    var currentColumns = (0, react_1.useMemo)(function () {
        if (isExpenseReportType) {
            return columns !== null && columns !== void 0 ? columns : [];
        }
        if (!(transactionsSnapshot === null || transactionsSnapshot === void 0 ? void 0 : transactionsSnapshot.data)) {
            return [];
        }
        var columnsToShow = (0, SearchUIUtils_1.getColumnsToShow)(accountID, transactionsSnapshot === null || transactionsSnapshot === void 0 ? void 0 : transactionsSnapshot.data, false, transactionsSnapshot === null || transactionsSnapshot === void 0 ? void 0 : transactionsSnapshot.search.type);
        return Object.keys(columnsToShow).filter(function (col) { return columnsToShow[col]; });
    }, [accountID, columns, isExpenseReportType, transactionsSnapshot === null || transactionsSnapshot === void 0 ? void 0 : transactionsSnapshot.data, transactionsSnapshot === null || transactionsSnapshot === void 0 ? void 0 : transactionsSnapshot.search.type]);
    var areAllOptionalColumnsHidden = (0, react_1.useMemo)(function () {
        if (isExpenseReportType) {
            return areAllOptionalColumnsHiddenProp !== null && areAllOptionalColumnsHiddenProp !== void 0 ? areAllOptionalColumnsHiddenProp : false;
        }
        var canBeMissingColumns = (0, SearchTableHeader_1.getExpenseHeaders)(groupBy)
            .filter(function (header) { return header.canBeMissing; })
            .map(function (header) { return header.columnName; });
        return canBeMissingColumns.every(function (column) { return !currentColumns.includes(column); });
    }, [areAllOptionalColumnsHiddenProp, currentColumns, groupBy, isExpenseReportType]);
    // Currently only the transaction report groups have transactions where the empty view makes sense
    var shouldDisplayShowMoreButton = isExpenseReportType ? transactions.length > transactionsVisibleLimit : !!(transactionsSnapshotMetadata === null || transactionsSnapshotMetadata === void 0 ? void 0 : transactionsSnapshotMetadata.hasMoreResults) && !isOffline;
    var currentOffset = (_b = transactionsSnapshotMetadata === null || transactionsSnapshotMetadata === void 0 ? void 0 : transactionsSnapshotMetadata.offset) !== null && _b !== void 0 ? _b : 0;
    var shouldShowLoadingOnSearch = !!(!(transactions === null || transactions === void 0 ? void 0 : transactions.length) && (transactionsSnapshotMetadata === null || transactionsSnapshotMetadata === void 0 ? void 0 : transactionsSnapshotMetadata.isLoading)) || currentOffset > 0;
    var shouldDisplayLoadingIndicator = !isExpenseReportType && !!(transactionsSnapshotMetadata === null || transactionsSnapshotMetadata === void 0 ? void 0 : transactionsSnapshotMetadata.isLoading) && shouldShowLoadingOnSearch;
    var isLargeScreenWidth = (0, useResponsiveLayout_1.default)().isLargeScreenWidth;
    var _c = (0, react_1.useMemo)(function () {
        var isAmountColumnWide = transactions.some(function (transaction) { return transaction.isAmountColumnWide; });
        var isTaxAmountColumnWide = transactions.some(function (transaction) { return transaction.isTaxAmountColumnWide; });
        var shouldShowYearForSomeTransaction = transactions.some(function (transaction) { return transaction.shouldShowYear; });
        return {
            amountColumnSize: isAmountColumnWide ? CONST_1.default.SEARCH.TABLE_COLUMN_SIZES.WIDE : CONST_1.default.SEARCH.TABLE_COLUMN_SIZES.NORMAL,
            taxAmountColumnSize: isTaxAmountColumnWide ? CONST_1.default.SEARCH.TABLE_COLUMN_SIZES.WIDE : CONST_1.default.SEARCH.TABLE_COLUMN_SIZES.NORMAL,
            dateColumnSize: shouldShowYearForSomeTransaction ? CONST_1.default.SEARCH.TABLE_COLUMN_SIZES.WIDE : CONST_1.default.SEARCH.TABLE_COLUMN_SIZES.NORMAL,
        };
    }, [transactions]), amountColumnSize = _c.amountColumnSize, dateColumnSize = _c.dateColumnSize, taxAmountColumnSize = _c.taxAmountColumnSize;
    var markReportIDAsExpense = (0, react_1.useContext)(WideRHPContextProvider_1.WideRHPContext).markReportIDAsExpense;
    var openReportInRHP = function (transactionItem) {
        var backTo = Navigation_1.default.getActiveRoute();
        var reportID = (0, MoneyRequestReportUtils_1.getReportIDForTransaction)(transactionItem);
        var navigateToTransactionThread = function () {
            if (transactionItem.transactionThreadReportID === CONST_1.default.REPORT.UNREPORTED_REPORT_ID) {
                (0, SearchUIUtils_1.createAndOpenSearchTransactionThread)(transactionItem, currentSearchHash, backTo);
                return;
            }
            markReportIDAsExpense(reportID);
            Navigation_1.default.navigate(ROUTES_1.default.SEARCH_REPORT.getRoute({ reportID: reportID, backTo: backTo }));
        };
        // The arrow navigation in RHP is only allowed for group-by:reports
        if (!isExpenseReportType) {
            navigateToTransactionThread();
            return;
        }
        var siblingTransactionIDs = transactions
            .filter(function (transaction) { var _a; return ((_a = transaction.reportAction) === null || _a === void 0 ? void 0 : _a.pendingAction) !== CONST_1.default.RED_BRICK_ROAD_PENDING_ACTION.DELETE; })
            .map(function (transaction) { return transaction.transactionID; });
        // When opening the transaction thread in RHP we need to find every other ID for the rest of transactions
        // to display prev/next arrows in RHP for navigation
        (0, TransactionThreadNavigation_1.setActiveTransactionIDs)(siblingTransactionIDs).then(function () {
            // If we're trying to open a transaction without a transaction thread, let's create the thread and navigate the user
            navigateToTransactionThread();
        });
    };
    var onShowMoreButtonPress = (0, react_1.useCallback)(function () {
        if (isExpenseReportType) {
            setTransactionsVisibleLimit(function (currentPageSize) { return currentPageSize + CONST_1.default.TRANSACTION.RESULTS_PAGE_SIZE; });
        }
        else if (!isOffline && transactionsQueryJSON) {
            searchTransactions(CONST_1.default.SEARCH.RESULTS_PAGE_SIZE);
        }
    }, [isExpenseReportType, isOffline, transactionsQueryJSON, setTransactionsVisibleLimit, searchTransactions]);
    if (shouldDisplayEmptyView) {
        return (<react_native_1.View style={[styles.alignItemsCenter, styles.justifyContentCenter, styles.mnh13]}>
                <Text_1.default style={[styles.textLabelSupporting]} numberOfLines={1}>
                    {translate('search.moneyRequestReport.emptyStateTitle')}
                </Text_1.default>
            </react_native_1.View>);
    }
    return (<>
            {isLargeScreenWidth && (<react_native_1.View style={[styles.searchListHeaderContainerStyle, styles.groupSearchListTableContainerStyle, styles.bgTransparent, styles.pl9, styles.pr11]}>
                    <SearchTableHeader_1.default canSelectMultiple type={CONST_1.default.SEARCH.DATA_TYPES.EXPENSE} onSortPress={function () { }} sortOrder={undefined} sortBy={undefined} shouldShowYear={dateColumnSize === CONST_1.default.SEARCH.TABLE_COLUMN_SIZES.WIDE} isAmountColumnWide={amountColumnSize === CONST_1.default.SEARCH.TABLE_COLUMN_SIZES.WIDE} isTaxAmountColumnWide={taxAmountColumnSize === CONST_1.default.SEARCH.TABLE_COLUMN_SIZES.WIDE} shouldShowSorting={false} columns={currentColumns} areAllOptionalColumnsHidden={areAllOptionalColumnsHidden !== null && areAllOptionalColumnsHidden !== void 0 ? areAllOptionalColumnsHidden : false} groupBy={groupBy}/>
                </react_native_1.View>)}
            {visibleTransactions.map(function (transaction, index) {
            var _a;
            var shouldShowBottomBorder = !isLastTransaction(index) && !isLargeScreenWidth;
            return (<OfflineWithFeedback_1.default pendingAction={transaction.pendingAction} key={transaction.transactionID}>
                        <TransactionItemRow_1.default report={transaction.report} transactionItem={transaction} violations={(0, TransactionUtils_1.getTransactionViolations)(transaction, violations, (_a = currentUserDetails.email) !== null && _a !== void 0 ? _a : '')} isSelected={!!transaction.isSelected} dateColumnSize={dateColumnSize} amountColumnSize={amountColumnSize} taxAmountColumnSize={taxAmountColumnSize} shouldShowTooltip={showTooltip} shouldUseNarrowLayout={!isLargeScreenWidth} shouldShowCheckbox={!!canSelectMultiple} onCheckboxPress={function () { return onCheckboxPress === null || onCheckboxPress === void 0 ? void 0 : onCheckboxPress(transaction); }} columns={currentColumns} onButtonPress={function () {
                    openReportInRHP(transaction);
                }} style={[styles.noBorderRadius, !isLargeScreenWidth ? [styles.p3, styles.pt3] : [styles.pl3, styles.pv1Half], styles.flex1]} isReportItemChild isInSingleTransactionReport={isInSingleTransactionReport} areAllOptionalColumnsHidden={areAllOptionalColumnsHidden} shouldShowBottomBorder={shouldShowBottomBorder} onArrowRightPress={function () { return openReportInRHP(transaction); }}/>
                    </OfflineWithFeedback_1.default>);
        })}
            {shouldDisplayShowMoreButton && !shouldDisplayLoadingIndicator && (<react_native_1.View style={[styles.w100, styles.flexRow, isLargeScreenWidth && styles.pl10]}>
                    <Button_1.default text={translate('common.showMore')} onPress={onShowMoreButtonPress} link shouldUseDefaultHover={false} isNested medium innerStyles={[styles.ph3]} textStyles={[styles.fontSizeNormal]}/>
                </react_native_1.View>)}
            {shouldDisplayLoadingIndicator && (<react_native_1.View style={[isLargeScreenWidth && styles.pl10, styles.pt3, isEmpty && styles.pb3]}>
                    <ActivityIndicator_1.default color={theme.spinner} size={25} style={[styles.pl3, !isEmpty && styles.alignItemsStart]}/>
                </react_native_1.View>)}
        </>);
}
TransactionGroupListExpanded.displayName = 'TransactionGroupListExpanded';
exports.default = TransactionGroupListExpanded;
