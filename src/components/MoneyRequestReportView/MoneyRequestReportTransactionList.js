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
var native_1 = require("@react-navigation/native");
var isEmpty_1 = require("lodash/isEmpty");
var react_1 = require("react");
var react_native_1 = require("react-native");
var ButtonWithDropdownMenu_1 = require("@components/ButtonWithDropdownMenu");
var Checkbox_1 = require("@components/Checkbox");
var Expensicons = require("@components/Icon/Expensicons");
var MenuItem_1 = require("@components/MenuItem");
var Modal_1 = require("@components/Modal");
var OfflineWithFeedback_1 = require("@components/OfflineWithFeedback");
var OnyxListItemProvider_1 = require("@components/OnyxListItemProvider");
var SearchContext_1 = require("@components/Search/SearchContext");
var Text_1 = require("@components/Text");
var WideRHPContextProvider_1 = require("@components/WideRHPContextProvider");
var useCopySelectionHelper_1 = require("@hooks/useCopySelectionHelper");
var useCurrentUserPersonalDetails_1 = require("@hooks/useCurrentUserPersonalDetails");
var useHandleSelectionMode_1 = require("@hooks/useHandleSelectionMode");
var useLocalize_1 = require("@hooks/useLocalize");
var useMobileSelectionMode_1 = require("@hooks/useMobileSelectionMode");
var useReportIsArchived_1 = require("@hooks/useReportIsArchived");
var useResponsiveLayout_1 = require("@hooks/useResponsiveLayout");
var useStyleUtils_1 = require("@hooks/useStyleUtils");
var useThemeStyles_1 = require("@hooks/useThemeStyles");
var MobileSelectionMode_1 = require("@libs/actions/MobileSelectionMode");
var Report_1 = require("@libs/actions/Report");
var TransactionThreadNavigation_1 = require("@libs/actions/TransactionThreadNavigation");
var CurrencyUtils_1 = require("@libs/CurrencyUtils");
var Fullstory_1 = require("@libs/Fullstory");
var Navigation_1 = require("@libs/Navigation/Navigation");
var Parser_1 = require("@libs/Parser");
var ReportActionsUtils_1 = require("@libs/ReportActionsUtils");
var ReportUtils_1 = require("@libs/ReportUtils");
var SearchUIUtils_1 = require("@libs/SearchUIUtils");
var TransactionUtils_1 = require("@libs/TransactionUtils");
var shouldShowTransactionYear_1 = require("@libs/TransactionUtils/shouldShowTransactionYear");
var Navigation_2 = require("@navigation/Navigation");
var variables_1 = require("@styles/variables");
var Report_2 = require("@userActions/Report");
var CONST_1 = require("@src/CONST");
var NAVIGATORS_1 = require("@src/NAVIGATORS");
var ONYXKEYS_1 = require("@src/ONYXKEYS");
var ROUTES_1 = require("@src/ROUTES");
var MoneyRequestReportTableHeader_1 = require("./MoneyRequestReportTableHeader");
var MoneyRequestReportTotalSpend_1 = require("./MoneyRequestReportTotalSpend");
var MoneyRequestReportTransactionItem_1 = require("./MoneyRequestReportTransactionItem");
var SearchMoneyRequestReportEmptyState_1 = require("./SearchMoneyRequestReportEmptyState");
var sortableColumnNames = [
    CONST_1.default.SEARCH.TABLE_COLUMNS.DATE,
    CONST_1.default.SEARCH.TABLE_COLUMNS.MERCHANT,
    CONST_1.default.SEARCH.TABLE_COLUMNS.DESCRIPTION,
    CONST_1.default.SEARCH.TABLE_COLUMNS.CATEGORY,
    CONST_1.default.SEARCH.TABLE_COLUMNS.TAG,
    CONST_1.default.SEARCH.TABLE_COLUMNS.TOTAL_AMOUNT,
];
var isSortableColumnName = function (key) { return !!sortableColumnNames.find(function (val) { return val === key; }); };
var getTransactionValue = function (transaction, key, reportToSort) {
    var _a, _b;
    switch (key) {
        case CONST_1.default.SEARCH.TABLE_COLUMNS.DATE:
            return (0, TransactionUtils_1.getCreated)(transaction);
        case CONST_1.default.SEARCH.TABLE_COLUMNS.MERCHANT:
            return (0, TransactionUtils_1.getMerchant)(transaction);
        case CONST_1.default.SEARCH.TABLE_COLUMNS.CATEGORY:
            return (0, TransactionUtils_1.getCategory)(transaction);
        case CONST_1.default.SEARCH.TABLE_COLUMNS.TAG:
            return (0, TransactionUtils_1.getTag)(transaction);
        case CONST_1.default.SEARCH.TABLE_COLUMNS.TOTAL_AMOUNT:
            return (0, TransactionUtils_1.getAmount)(transaction, (0, ReportUtils_1.isExpenseReport)(reportToSort), transaction.reportID === CONST_1.default.REPORT.UNREPORTED_REPORT_ID);
        case CONST_1.default.SEARCH.TABLE_COLUMNS.DESCRIPTION:
            return Parser_1.default.htmlToText((_b = (_a = transaction.comment) === null || _a === void 0 ? void 0 : _a.comment) !== null && _b !== void 0 ? _b : '');
        default:
            return transaction[key];
    }
};
function MoneyRequestReportTransactionList(_a) {
    var report = _a.report, transactions = _a.transactions, newTransactions = _a.newTransactions, reportActions = _a.reportActions, violations = _a.violations, _b = _a.hasPendingDeletionTransaction, hasPendingDeletionTransaction = _b === void 0 ? false : _b, scrollToNewTransaction = _a.scrollToNewTransaction, policy = _a.policy, hasComments = _a.hasComments, _c = _a.isLoadingInitialReportActions, isLoadingInitialReportActions = _c === void 0 ? false : _c;
    (0, useCopySelectionHelper_1.default)();
    var styles = (0, useThemeStyles_1.default)();
    var StyleUtils = (0, useStyleUtils_1.default)();
    var _d = (0, useLocalize_1.default)(), translate = _d.translate, localeCompare = _d.localeCompare;
    // eslint-disable-next-line rulesdir/prefer-shouldUseNarrowLayout-instead-of-isSmallScreenWidth
    var _e = (0, useResponsiveLayout_1.default)(), shouldUseNarrowLayout = _e.shouldUseNarrowLayout, isSmallScreenWidth = _e.isSmallScreenWidth, isMediumScreenWidth = _e.isMediumScreenWidth;
    var markReportIDAsExpense = (0, react_1.useContext)(WideRHPContextProvider_1.WideRHPContext).markReportIDAsExpense;
    var _f = (0, react_1.useState)(false), isModalVisible = _f[0], setIsModalVisible = _f[1];
    var _g = (0, react_1.useState)(''), selectedTransactionID = _g[0], setSelectedTransactionID = _g[1];
    var reportPendingAction = (0, ReportUtils_1.getReportOfflinePendingActionAndErrors)(report).reportPendingAction;
    var _h = (0, ReportUtils_1.getMoneyRequestSpendBreakdown)(report), totalDisplaySpend = _h.totalDisplaySpend, nonReimbursableSpend = _h.nonReimbursableSpend, reimbursableSpend = _h.reimbursableSpend;
    var formattedOutOfPocketAmount = (0, CurrencyUtils_1.convertToDisplayString)(reimbursableSpend, report === null || report === void 0 ? void 0 : report.currency);
    var formattedCompanySpendAmount = (0, CurrencyUtils_1.convertToDisplayString)(nonReimbursableSpend, report === null || report === void 0 ? void 0 : report.currency);
    var shouldShowBreakdown = !!nonReimbursableSpend && !!reimbursableSpend;
    var transactionsWithoutPendingDelete = (0, react_1.useMemo)(function () { return transactions.filter(function (t) { return !(0, TransactionUtils_1.isTransactionPendingDelete)(t); }); }, [transactions]);
    var currentUserDetails = (0, useCurrentUserPersonalDetails_1.default)();
    var isReportArchived = (0, useReportIsArchived_1.default)(report === null || report === void 0 ? void 0 : report.reportID);
    var shouldShowAddExpenseButton = (0, ReportUtils_1.canAddTransaction)(report, isReportArchived) && (0, ReportUtils_1.isCurrentUserSubmitter)(report);
    var addExpenseDropdownOptions = (0, react_1.useMemo)(function () { return (0, ReportUtils_1.getAddExpenseDropdownOptions)(report === null || report === void 0 ? void 0 : report.reportID, policy); }, [report === null || report === void 0 ? void 0 : report.reportID, policy]);
    var hasPendingAction = (0, react_1.useMemo)(function () {
        return hasPendingDeletionTransaction || transactions.some(TransactionUtils_1.getTransactionPendingAction);
    }, [hasPendingDeletionTransaction, transactions]);
    var _j = (0, SearchContext_1.useSearchContext)(), selectedTransactionIDs = _j.selectedTransactionIDs, setSelectedTransactions = _j.setSelectedTransactions, clearSelectedTransactions = _j.clearSelectedTransactions;
    (0, useHandleSelectionMode_1.default)(selectedTransactionIDs);
    var isMobileSelectionModeEnabled = (0, useMobileSelectionMode_1.default)();
    var personalDetailsList = (0, OnyxListItemProvider_1.usePersonalDetails)();
    // Filter violations based on user visibility
    var filteredViolations = (0, react_1.useMemo)(function () {
        if (!violations || !report || !policy || !transactions) {
            return violations;
        }
        var filtered = {};
        for (var _i = 0, transactions_1 = transactions; _i < transactions_1.length; _i++) {
            var transaction = transactions_1[_i];
            var transactionViolations = violations["".concat(ONYXKEYS_1.default.COLLECTION.TRANSACTION_VIOLATIONS).concat(transaction.transactionID)];
            if (transactionViolations) {
                var filteredTransactionViolations = (0, TransactionUtils_1.mergeProhibitedViolations)(transactionViolations.filter(function (violation) { var _a; return (0, TransactionUtils_1.shouldShowViolation)(report, policy, violation.name, (_a = currentUserDetails.email) !== null && _a !== void 0 ? _a : ''); }));
                if (filteredTransactionViolations.length > 0) {
                    filtered["".concat(ONYXKEYS_1.default.COLLECTION.TRANSACTION_VIOLATIONS).concat(transaction.transactionID)] = filteredTransactionViolations;
                }
            }
        }
        return filtered;
    }, [violations, report, policy, transactions, currentUserDetails.email]);
    var toggleTransaction = (0, react_1.useCallback)(function (transactionID) {
        var newSelectedTransactionIDs = selectedTransactionIDs;
        if (selectedTransactionIDs.includes(transactionID)) {
            newSelectedTransactionIDs = selectedTransactionIDs.filter(function (t) { return t !== transactionID; });
        }
        else {
            newSelectedTransactionIDs = __spreadArray(__spreadArray([], selectedTransactionIDs, true), [transactionID], false);
        }
        setSelectedTransactions(newSelectedTransactionIDs);
    }, [setSelectedTransactions, selectedTransactionIDs]);
    var isTransactionSelected = (0, react_1.useCallback)(function (transactionID) { return selectedTransactionIDs.includes(transactionID); }, [selectedTransactionIDs]);
    (0, native_1.useFocusEffect)((0, react_1.useCallback)(function () {
        return function () {
            var _a, _b;
            if (((_b = (_a = Navigation_1.navigationRef === null || Navigation_1.navigationRef === void 0 ? void 0 : Navigation_1.navigationRef.getRootState()) === null || _a === void 0 ? void 0 : _a.routes.at(-1)) === null || _b === void 0 ? void 0 : _b.name) === NAVIGATORS_1.default.RIGHT_MODAL_NAVIGATOR) {
                return;
            }
            clearSelectedTransactions(true);
        };
    }, [clearSelectedTransactions]));
    var _k = (0, react_1.useState)({
        sortBy: CONST_1.default.SEARCH.TABLE_COLUMNS.DATE,
        sortOrder: CONST_1.default.SEARCH.SORT_ORDER.ASC,
    }), sortConfig = _k[0], setSortConfig = _k[1];
    var sortBy = sortConfig.sortBy, sortOrder = sortConfig.sortOrder;
    var sortedTransactions = (0, react_1.useMemo)(function () {
        return __spreadArray([], transactions, true).sort(function (a, b) { return (0, SearchUIUtils_1.compareValues)(getTransactionValue(a, sortBy, report), getTransactionValue(b, sortBy, report), sortOrder, sortBy, localeCompare, true); })
            .map(function (transaction) { return (__assign(__assign({}, transaction), { shouldBeHighlighted: newTransactions === null || newTransactions === void 0 ? void 0 : newTransactions.includes(transaction) })); });
    }, [newTransactions, sortBy, sortOrder, transactions, localeCompare, report]);
    var columnsToShow = (0, react_1.useMemo)(function () {
        var columns = (0, SearchUIUtils_1.getColumnsToShow)(currentUserDetails === null || currentUserDetails === void 0 ? void 0 : currentUserDetails.accountID, transactions, true);
        return Object.keys(columns).filter(function (column) { return columns[column]; });
    }, [transactions, currentUserDetails === null || currentUserDetails === void 0 ? void 0 : currentUserDetails.accountID]);
    /**
     * Navigate to the transaction thread for a transaction, creating one optimistically if it doesn't yet exist.
     */
    var navigateToTransaction = (0, react_1.useCallback)(function (activeTransactionID) {
        var iouAction = (0, ReportActionsUtils_1.getIOUActionForTransactionID)(reportActions, activeTransactionID);
        var backTo = Navigation_2.default.getActiveRoute();
        var reportIDToNavigate = iouAction === null || iouAction === void 0 ? void 0 : iouAction.childReportID;
        var routeParams = {
            reportID: reportIDToNavigate,
            backTo: backTo,
        };
        if (!reportIDToNavigate) {
            var transactionThreadReport = (0, Report_2.createTransactionThreadReport)(report, iouAction);
            if (transactionThreadReport) {
                reportIDToNavigate = transactionThreadReport.reportID;
                routeParams.reportID = reportIDToNavigate;
            }
        }
        else {
            (0, Report_1.setOptimisticTransactionThread)(reportIDToNavigate, report === null || report === void 0 ? void 0 : report.reportID, iouAction === null || iouAction === void 0 ? void 0 : iouAction.reportActionID, report === null || report === void 0 ? void 0 : report.policyID);
        }
        // Single transaction report will open in RHP, and we need to find every other report ID for the rest of transactions
        // to display prev/next arrows in RHP for navigation
        var sortedSiblingTransactionIDs = sortedTransactions.filter(function (transaction) { return !(0, TransactionUtils_1.isTransactionPendingDelete)(transaction); }).map(function (transaction) { return transaction.transactionID; });
        (0, TransactionThreadNavigation_1.setActiveTransactionIDs)(sortedSiblingTransactionIDs).then(function () {
            if (reportIDToNavigate) {
                markReportIDAsExpense(reportIDToNavigate);
            }
            Navigation_2.default.navigate(ROUTES_1.default.SEARCH_REPORT.getRoute(routeParams));
        });
    }, [report, reportActions, sortedTransactions, markReportIDAsExpense]);
    var _l = (0, react_1.useMemo)(function () {
        var isAmountColumnWide = transactions.some(function (transaction) { return (0, SearchUIUtils_1.isTransactionAmountTooLong)(transaction); });
        var isTaxAmountColumnWide = transactions.some(function (transaction) { return (0, SearchUIUtils_1.isTransactionTaxAmountTooLong)(transaction); });
        var shouldShowYearForSomeTransaction = transactions.some(function (transaction) { return (0, shouldShowTransactionYear_1.default)(transaction); });
        return {
            amountColumnSize: isAmountColumnWide ? CONST_1.default.SEARCH.TABLE_COLUMN_SIZES.WIDE : CONST_1.default.SEARCH.TABLE_COLUMN_SIZES.NORMAL,
            taxAmountColumnSize: isTaxAmountColumnWide ? CONST_1.default.SEARCH.TABLE_COLUMN_SIZES.WIDE : CONST_1.default.SEARCH.TABLE_COLUMN_SIZES.NORMAL,
            dateColumnSize: shouldShowYearForSomeTransaction ? CONST_1.default.SEARCH.TABLE_COLUMN_SIZES.WIDE : CONST_1.default.SEARCH.TABLE_COLUMN_SIZES.NORMAL,
        };
    }, [transactions]), amountColumnSize = _l.amountColumnSize, dateColumnSize = _l.dateColumnSize, taxAmountColumnSize = _l.taxAmountColumnSize;
    var isEmptyTransactions = (0, isEmpty_1.default)(transactions);
    var handleLongPress = (0, react_1.useCallback)(function (transactionID) {
        if (!isSmallScreenWidth) {
            return;
        }
        if (isMobileSelectionModeEnabled) {
            toggleTransaction(transactionID);
            return;
        }
        setSelectedTransactionID(transactionID);
        setIsModalVisible(true);
    }, [isSmallScreenWidth, isMobileSelectionModeEnabled, toggleTransaction, setSelectedTransactionID, setIsModalVisible]);
    var handleOnPress = (0, react_1.useCallback)(function (transactionID) {
        if (isMobileSelectionModeEnabled) {
            toggleTransaction(transactionID);
            return;
        }
        navigateToTransaction(transactionID);
    }, [isMobileSelectionModeEnabled, toggleTransaction, navigateToTransaction]);
    var handleArrowRightPress = (0, react_1.useCallback)(function (transactionID) {
        navigateToTransaction(transactionID);
    }, [navigateToTransaction]);
    var listHorizontalPadding = styles.ph5;
    var transactionItemFSClass = Fullstory_1.default.getChatFSClass(personalDetailsList, report);
    if (isEmptyTransactions) {
        return (<>
                <SearchMoneyRequestReportEmptyState_1.default report={report} policy={policy}/>
                <MoneyRequestReportTotalSpend_1.default isEmptyTransactions={isEmptyTransactions} totalDisplaySpend={totalDisplaySpend} report={report} hasPendingAction={hasPendingAction} hasComments={hasComments} isLoadingReportActions={isLoadingInitialReportActions}/>
            </>);
    }
    return (<>
            {!shouldUseNarrowLayout && (<react_native_1.View style={[styles.dFlex, styles.flexRow, styles.pl5, styles.pr16, styles.alignItemsCenter]}>
                    <react_native_1.View style={[styles.dFlex, styles.flexRow, styles.pv2, styles.pr4, StyleUtils.getPaddingLeft(variables_1.default.w12)]}>
                        <Checkbox_1.default onPress={function () {
                if (selectedTransactionIDs.length !== 0) {
                    clearSelectedTransactions(true);
                }
                else {
                    setSelectedTransactions(transactionsWithoutPendingDelete.map(function (t) { return t.transactionID; }));
                }
            }} accessibilityLabel={CONST_1.default.ROLE.CHECKBOX} isIndeterminate={selectedTransactionIDs.length > 0 && selectedTransactionIDs.length !== transactionsWithoutPendingDelete.length} isChecked={selectedTransactionIDs.length > 0 && selectedTransactionIDs.length === transactionsWithoutPendingDelete.length}/>
                        {isMediumScreenWidth && <Text_1.default style={[styles.textStrong, styles.ph3]}>{translate('workspace.people.selectAll')}</Text_1.default>}
                    </react_native_1.View>
                    {!isMediumScreenWidth && (<MoneyRequestReportTableHeader_1.default shouldShowSorting sortBy={sortBy} sortOrder={sortOrder} columns={columnsToShow} dateColumnSize={dateColumnSize} amountColumnSize={amountColumnSize} taxAmountColumnSize={taxAmountColumnSize} onSortPress={function (selectedSortBy, selectedSortOrder) {
                    if (!isSortableColumnName(selectedSortBy)) {
                        return;
                    }
                    setSortConfig(function (prevState) { return (__assign(__assign({}, prevState), { sortBy: selectedSortBy, sortOrder: selectedSortOrder })); });
                }}/>)}
                </react_native_1.View>)}
            <react_native_1.View style={[listHorizontalPadding, styles.gap2, styles.pb4]}>
                {sortedTransactions.map(function (transaction) {
            var _a;
            return (<MoneyRequestReportTransactionItem_1.default key={transaction.transactionID} transaction={transaction} violations={filteredViolations === null || filteredViolations === void 0 ? void 0 : filteredViolations["".concat(ONYXKEYS_1.default.COLLECTION.TRANSACTION_VIOLATIONS).concat(transaction.transactionID)]} columns={columnsToShow} report={report} isSelectionModeEnabled={isMobileSelectionModeEnabled} toggleTransaction={toggleTransaction} isSelected={isTransactionSelected(transaction.transactionID)} handleOnPress={handleOnPress} handleLongPress={handleLongPress} dateColumnSize={dateColumnSize} amountColumnSize={amountColumnSize} taxAmountColumnSize={taxAmountColumnSize} 
            // if we add few new transactions, then we need to scroll to the first one
            scrollToNewTransaction={transaction.transactionID === ((_a = newTransactions === null || newTransactions === void 0 ? void 0 : newTransactions.at(0)) === null || _a === void 0 ? void 0 : _a.transactionID) ? scrollToNewTransaction : undefined} forwardedFSClass={transactionItemFSClass} onArrowRightPress={handleArrowRightPress}/>);
        })}
            </react_native_1.View>
            <react_native_1.View style={[
            styles.dFlex,
            styles.flexRow,
            shouldShowAddExpenseButton ? styles.justifyContentBetween : styles.justifyContentEnd,
            styles.gap6,
            listHorizontalPadding,
            styles.mb2,
            styles.alignItemsStart,
            styles.minHeight7,
            shouldUseNarrowLayout && styles.flexColumn,
        ]}>
                {shouldShowAddExpenseButton && (<OfflineWithFeedback_1.default pendingAction={reportPendingAction}>
                        <ButtonWithDropdownMenu_1.default onPress={function () { }} shouldAlwaysShowDropdownMenu customText={translate('iou.addExpense')} options={addExpenseDropdownOptions} isSplitButton={false} buttonSize={CONST_1.default.DROPDOWN_BUTTON_SIZE.SMALL} success={false} anchorAlignment={{
                horizontal: CONST_1.default.MODAL.ANCHOR_ORIGIN_HORIZONTAL.LEFT,
                vertical: CONST_1.default.MODAL.ANCHOR_ORIGIN_VERTICAL.TOP,
            }}/>
                    </OfflineWithFeedback_1.default>)}
                <react_native_1.View style={[styles.flexShrink1, shouldUseNarrowLayout && styles.w100]}>
                    {shouldShowBreakdown && (<react_native_1.View style={[styles.dFlex, styles.alignItemsEnd, styles.gap2, styles.mb2, styles.flex1]}>
                            {[
                { text: 'cardTransactions.outOfPocket', value: formattedOutOfPocketAmount },
                { text: 'cardTransactions.companySpend', value: formattedCompanySpendAmount },
            ].map(function (_a) {
                var text = _a.text, value = _a.value;
                return (<react_native_1.View key={text} style={[
                        styles.dFlex,
                        styles.flexRow,
                        styles.alignItemsCenter,
                        styles.pr3,
                        styles.mw100,
                        shouldUseNarrowLayout && [styles.justifyContentBetween, styles.w100],
                    ]}>
                                    <Text_1.default style={[styles.textLabelSupporting, styles.mr3]} numberOfLines={1}>
                                        {translate(text)}
                                    </Text_1.default>
                                    <Text_1.default numberOfLines={1} style={[styles.textLabelSupporting, styles.textNormal, shouldUseNarrowLayout ? styles.mnw64p : styles.mnw100p, styles.textAlignRight]}>
                                        {value}
                                    </Text_1.default>
                                </react_native_1.View>);
            })}
                        </react_native_1.View>)}

                    <MoneyRequestReportTotalSpend_1.default isEmptyTransactions={isEmptyTransactions} totalDisplaySpend={totalDisplaySpend} report={report} hasPendingAction={hasPendingAction}/>
                </react_native_1.View>
            </react_native_1.View>
            <Modal_1.default isVisible={isModalVisible} type={CONST_1.default.MODAL.MODAL_TYPE.BOTTOM_DOCKED} onClose={function () { return setIsModalVisible(false); }} shouldPreventScrollOnFocus>
                <MenuItem_1.default title={translate('common.select')} icon={Expensicons.CheckSquare} onPress={function () {
            if (!isMobileSelectionModeEnabled) {
                (0, MobileSelectionMode_1.turnOnMobileSelectionMode)();
            }
            toggleTransaction(selectedTransactionID);
            setIsModalVisible(false);
        }}/>
            </Modal_1.default>
        </>);
}
MoneyRequestReportTransactionList.displayName = 'MoneyRequestReportTransactionList';
exports.default = (0, react_1.memo)(MoneyRequestReportTransactionList);
