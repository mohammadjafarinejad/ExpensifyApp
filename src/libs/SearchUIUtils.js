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
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSuggestedSearches = getSuggestedSearches;
exports.getListItem = getListItem;
exports.getSections = getSections;
exports.getSuggestedSearchesVisibility = getSuggestedSearchesVisibility;
exports.getShouldShowMerchant = getShouldShowMerchant;
exports.getSortedSections = getSortedSections;
exports.isTransactionGroupListItemType = isTransactionGroupListItemType;
exports.isTransactionReportGroupListItemType = isTransactionReportGroupListItemType;
exports.isTransactionMemberGroupListItemType = isTransactionMemberGroupListItemType;
exports.isTransactionCardGroupListItemType = isTransactionCardGroupListItemType;
exports.isTransactionWithdrawalIDGroupListItemType = isTransactionWithdrawalIDGroupListItemType;
exports.isSearchResultsEmpty = isSearchResultsEmpty;
exports.isTransactionListItemType = isTransactionListItemType;
exports.isReportActionListItemType = isReportActionListItemType;
exports.shouldShowYear = shouldShowYear;
exports.getExpenseTypeTranslationKey = getExpenseTypeTranslationKey;
exports.getOverflowMenu = getOverflowMenu;
exports.isCorrectSearchUserName = isCorrectSearchUserName;
exports.isReportActionEntry = isReportActionEntry;
exports.isTaskListItemType = isTaskListItemType;
exports.getActions = getActions;
exports.createTypeMenuSections = createTypeMenuSections;
exports.createBaseSavedSearchMenuItem = createBaseSavedSearchMenuItem;
exports.shouldShowEmptyState = shouldShowEmptyState;
exports.compareValues = compareValues;
exports.isSearchDataLoaded = isSearchDataLoaded;
exports.getStatusOptions = getStatusOptions;
exports.getTypeOptions = getTypeOptions;
exports.getGroupByOptions = getGroupByOptions;
exports.getGroupCurrencyOptions = getGroupCurrencyOptions;
exports.getFeedOptions = getFeedOptions;
exports.getWideAmountIndicators = getWideAmountIndicators;
exports.isTransactionAmountTooLong = isTransactionAmountTooLong;
exports.isTransactionTaxAmountTooLong = isTransactionTaxAmountTooLong;
exports.getDatePresets = getDatePresets;
exports.createAndOpenSearchTransactionThread = createAndOpenSearchTransactionThread;
exports.getWithdrawalTypeOptions = getWithdrawalTypeOptions;
exports.getActionOptions = getActionOptions;
exports.getColumnsToShow = getColumnsToShow;
exports.getHasOptions = getHasOptions;
var LottieAnimations_1 = require("@components/LottieAnimations");
var ChatListItem_1 = require("@components/SelectionListWithSections/ChatListItem");
var ExpenseReportListItem_1 = require("@components/SelectionListWithSections/Search/ExpenseReportListItem");
var TaskListItem_1 = require("@components/SelectionListWithSections/Search/TaskListItem");
var TransactionGroupListItem_1 = require("@components/SelectionListWithSections/Search/TransactionGroupListItem");
var TransactionListItem_1 = require("@components/SelectionListWithSections/Search/TransactionListItem");
var Expensicons = require("@src/components/Icon/Expensicons");
var CONST_1 = require("@src/CONST");
var ONYXKEYS_1 = require("@src/ONYXKEYS");
var ROUTES_1 = require("@src/ROUTES");
var connections_1 = require("./actions/connections");
var IOU_1 = require("./actions/IOU");
var Report_1 = require("./actions/Report");
var Search_1 = require("./actions/Search");
var CardFeedUtils_1 = require("./CardFeedUtils");
var CurrencyUtils_1 = require("./CurrencyUtils");
var DateUtils_1 = require("./DateUtils");
var interceptAnonymousUser_1 = require("./interceptAnonymousUser");
// eslint-disable-next-line @typescript-eslint/no-deprecated
var Localize_1 = require("./Localize");
var Navigation_1 = require("./Navigation/Navigation");
var Parser_1 = require("./Parser");
var PersonalDetailsUtils_1 = require("./PersonalDetailsUtils");
var PolicyUtils_1 = require("./PolicyUtils");
var ReportActionsUtils_1 = require("./ReportActionsUtils");
var ReportPreviewActionUtils_1 = require("./ReportPreviewActionUtils");
var ReportPrimaryActionUtils_1 = require("./ReportPrimaryActionUtils");
var ReportUtils_1 = require("./ReportUtils");
var SearchQueryUtils_1 = require("./SearchQueryUtils");
var StringUtils_1 = require("./StringUtils");
var SubscriptionUtils_1 = require("./SubscriptionUtils");
var TransactionPreviewUtils_1 = require("./TransactionPreviewUtils");
var TransactionUtils_1 = require("./TransactionUtils");
var shouldShowTransactionYear_1 = require("./TransactionUtils/shouldShowTransactionYear");
var ViolationsUtils_1 = require("./Violations/ViolationsUtils");
var transactionColumnNamesToSortingProperty = (_a = {},
    _a[CONST_1.default.SEARCH.TABLE_COLUMNS.TO] = 'formattedTo',
    _a[CONST_1.default.SEARCH.TABLE_COLUMNS.FROM] = 'formattedFrom',
    _a[CONST_1.default.SEARCH.TABLE_COLUMNS.DATE] = 'date',
    _a[CONST_1.default.SEARCH.TABLE_COLUMNS.TAG] = 'tag',
    _a[CONST_1.default.SEARCH.TABLE_COLUMNS.MERCHANT] = 'formattedMerchant',
    _a[CONST_1.default.SEARCH.TABLE_COLUMNS.TOTAL_AMOUNT] = 'formattedTotal',
    _a[CONST_1.default.SEARCH.TABLE_COLUMNS.CATEGORY] = 'category',
    _a[CONST_1.default.SEARCH.TABLE_COLUMNS.TYPE] = 'transactionType',
    _a[CONST_1.default.SEARCH.TABLE_COLUMNS.ACTION] = 'action',
    _a[CONST_1.default.SEARCH.TABLE_COLUMNS.DESCRIPTION] = 'comment',
    _a[CONST_1.default.SEARCH.TABLE_COLUMNS.TAX_AMOUNT] = null,
    _a[CONST_1.default.SEARCH.TABLE_COLUMNS.RECEIPT] = null,
    _a);
var taskColumnNamesToSortingProperty = (_b = {},
    _b[CONST_1.default.SEARCH.TABLE_COLUMNS.DATE] = 'created',
    _b[CONST_1.default.SEARCH.TABLE_COLUMNS.DESCRIPTION] = 'description',
    _b[CONST_1.default.SEARCH.TABLE_COLUMNS.TITLE] = 'reportName',
    _b[CONST_1.default.SEARCH.TABLE_COLUMNS.FROM] = 'formattedCreatedBy',
    _b[CONST_1.default.SEARCH.TABLE_COLUMNS.ASSIGNEE] = 'formattedAssignee',
    _b[CONST_1.default.SEARCH.TABLE_COLUMNS.IN] = 'parentReportID',
    _b);
var expenseReportColumnNamesToSortingProperty = (_c = {},
    _c[CONST_1.default.SEARCH.TABLE_COLUMNS.AVATAR] = null,
    _c[CONST_1.default.SEARCH.TABLE_COLUMNS.DATE] = 'created',
    _c[CONST_1.default.SEARCH.TABLE_COLUMNS.STATUS] = 'formattedStatus',
    _c[CONST_1.default.SEARCH.TABLE_COLUMNS.TITLE] = 'reportName',
    _c[CONST_1.default.SEARCH.TABLE_COLUMNS.FROM] = 'formattedFrom',
    _c[CONST_1.default.SEARCH.TABLE_COLUMNS.TO] = 'formattedTo',
    _c[CONST_1.default.SEARCH.TABLE_COLUMNS.TOTAL] = 'total',
    _c[CONST_1.default.SEARCH.TABLE_COLUMNS.ACTION] = 'action',
    _c);
var expenseStatusActionMapping = (_d = {},
    // eslint-disable-next-line @typescript-eslint/no-deprecated
    _d[CONST_1.default.SEARCH.STATUS.EXPENSE.DRAFTS] = function (expenseReport) {
        return (expenseReport === null || expenseReport === void 0 ? void 0 : expenseReport.stateNum) === CONST_1.default.REPORT.STATE_NUM.OPEN && expenseReport.statusNum === CONST_1.default.REPORT.STATUS_NUM.OPEN;
    },
    // eslint-disable-next-line @typescript-eslint/no-deprecated
    _d[CONST_1.default.SEARCH.STATUS.EXPENSE.OUTSTANDING] = function (expenseReport) {
        return (expenseReport === null || expenseReport === void 0 ? void 0 : expenseReport.stateNum) === CONST_1.default.REPORT.STATE_NUM.SUBMITTED && expenseReport.statusNum === CONST_1.default.REPORT.STATUS_NUM.SUBMITTED;
    },
    // eslint-disable-next-line @typescript-eslint/no-deprecated
    _d[CONST_1.default.SEARCH.STATUS.EXPENSE.APPROVED] = function (expenseReport) {
        return (expenseReport === null || expenseReport === void 0 ? void 0 : expenseReport.stateNum) === CONST_1.default.REPORT.STATE_NUM.APPROVED && expenseReport.statusNum === CONST_1.default.REPORT.STATUS_NUM.APPROVED;
    },
    // eslint-disable-next-line @typescript-eslint/no-deprecated
    _d[CONST_1.default.SEARCH.STATUS.EXPENSE.PAID] = function (expenseReport) { var _a; return ((_a = expenseReport === null || expenseReport === void 0 ? void 0 : expenseReport.stateNum) !== null && _a !== void 0 ? _a : 0) >= CONST_1.default.REPORT.STATE_NUM.APPROVED && (expenseReport === null || expenseReport === void 0 ? void 0 : expenseReport.statusNum) === CONST_1.default.REPORT.STATUS_NUM.REIMBURSED; },
    // eslint-disable-next-line @typescript-eslint/no-deprecated
    _d[CONST_1.default.SEARCH.STATUS.EXPENSE.DONE] = function (expenseReport) {
        return (expenseReport === null || expenseReport === void 0 ? void 0 : expenseReport.stateNum) === CONST_1.default.REPORT.STATE_NUM.APPROVED && expenseReport.statusNum === CONST_1.default.REPORT.STATUS_NUM.CLOSED;
    },
    // eslint-disable-next-line @typescript-eslint/no-deprecated
    _d[CONST_1.default.SEARCH.STATUS.EXPENSE.UNREPORTED] = function (expenseReport) { return !expenseReport; },
    _d[CONST_1.default.SEARCH.STATUS.EXPENSE.ALL] = function () { return true; },
    _d);
function isValidExpenseStatus(status) {
    return typeof status === 'string' && status in expenseStatusActionMapping;
}
function getExpenseStatusOptions(translate) {
    return [
        { text: translate('common.unreported'), value: CONST_1.default.SEARCH.STATUS.EXPENSE.UNREPORTED },
        { text: translate('common.draft'), value: CONST_1.default.SEARCH.STATUS.EXPENSE.DRAFTS },
        { text: translate('common.outstanding'), value: CONST_1.default.SEARCH.STATUS.EXPENSE.OUTSTANDING },
        { text: translate('iou.approved'), value: CONST_1.default.SEARCH.STATUS.EXPENSE.APPROVED },
        { text: translate('iou.settledExpensify'), value: CONST_1.default.SEARCH.STATUS.EXPENSE.PAID },
        { text: translate('iou.done'), value: CONST_1.default.SEARCH.STATUS.EXPENSE.DONE },
    ];
}
function getExpenseReportedStatusOptions(translate) {
    return [
        { text: translate('common.draft'), value: CONST_1.default.SEARCH.STATUS.EXPENSE.DRAFTS },
        { text: translate('common.outstanding'), value: CONST_1.default.SEARCH.STATUS.EXPENSE.OUTSTANDING },
        { text: translate('iou.approved'), value: CONST_1.default.SEARCH.STATUS.EXPENSE.APPROVED },
        { text: translate('iou.settledExpensify'), value: CONST_1.default.SEARCH.STATUS.EXPENSE.PAID },
        { text: translate('iou.done'), value: CONST_1.default.SEARCH.STATUS.EXPENSE.DONE },
    ];
}
function getInvoiceStatusOptions(translate) {
    return [
        { text: translate('common.outstanding'), value: CONST_1.default.SEARCH.STATUS.INVOICE.OUTSTANDING },
        { text: translate('iou.settledExpensify'), value: CONST_1.default.SEARCH.STATUS.INVOICE.PAID },
    ];
}
function getTripStatusOptions(translate) {
    return [
        { text: translate('search.filters.current'), value: CONST_1.default.SEARCH.STATUS.TRIP.CURRENT },
        { text: translate('search.filters.past'), value: CONST_1.default.SEARCH.STATUS.TRIP.PAST },
    ];
}
function getTaskStatusOptions(translate) {
    return [
        { text: translate('common.outstanding'), value: CONST_1.default.SEARCH.STATUS.TASK.OUTSTANDING },
        { text: translate('search.filters.completed'), value: CONST_1.default.SEARCH.STATUS.TASK.COMPLETED },
    ];
}
var emptyPersonalDetails = {
    accountID: CONST_1.default.REPORT.OWNER_ACCOUNT_ID_FAKE,
    avatar: '',
    displayName: undefined,
    login: undefined,
};
/**
 * Returns a list of all possible searches in the LHN, along with their query & hash.
 * *NOTE* When rendering the LHN, you should use the "createTypeMenuSections" method, which
 * contains the conditionals for rendering each of these.
 *
 * Keep all suggested search declarations in this object.
 * If you are updating this function, do not add more params unless absolutely necessary for the searches. The amount of data needed to
 * get the list of searches should be as minimal as possible.
 *
 * These searches should be as static as possible, and should not contain conditionals, or any other logic.
 *
 * If you are trying to access data about a specific search, you do NOT need to subscribe to the data (such as feeds) if it does not
 * affect the specific query you are looking for
 */
function getSuggestedSearches(accountID, defaultFeedID) {
    var _a;
    if (accountID === void 0) { accountID = CONST_1.default.DEFAULT_NUMBER_ID; }
    return _a = {},
        _a[CONST_1.default.SEARCH.SEARCH_KEYS.EXPENSES] = {
            key: CONST_1.default.SEARCH.SEARCH_KEYS.EXPENSES,
            translationPath: 'common.expenses',
            type: CONST_1.default.SEARCH.DATA_TYPES.EXPENSE,
            icon: Expensicons.Receipt,
            searchQuery: (0, SearchQueryUtils_1.buildCannedSearchQuery)(),
            get searchQueryJSON() {
                return (0, SearchQueryUtils_1.buildSearchQueryJSON)(this.searchQuery);
            },
            get hash() {
                var _a, _b;
                return (_b = (_a = this.searchQueryJSON) === null || _a === void 0 ? void 0 : _a.hash) !== null && _b !== void 0 ? _b : CONST_1.default.DEFAULT_NUMBER_ID;
            },
            get similarSearchHash() {
                var _a, _b;
                return (_b = (_a = this.searchQueryJSON) === null || _a === void 0 ? void 0 : _a.similarSearchHash) !== null && _b !== void 0 ? _b : CONST_1.default.DEFAULT_NUMBER_ID;
            },
        },
        _a[CONST_1.default.SEARCH.SEARCH_KEYS.REPORTS] = {
            key: CONST_1.default.SEARCH.SEARCH_KEYS.REPORTS,
            translationPath: 'common.reports',
            type: CONST_1.default.SEARCH.DATA_TYPES.EXPENSE_REPORT,
            icon: Expensicons.Document,
            searchQuery: (0, SearchQueryUtils_1.buildCannedSearchQuery)({ type: CONST_1.default.SEARCH.DATA_TYPES.EXPENSE_REPORT }),
            get searchQueryJSON() {
                return (0, SearchQueryUtils_1.buildSearchQueryJSON)(this.searchQuery);
            },
            get hash() {
                var _a, _b;
                return (_b = (_a = this.searchQueryJSON) === null || _a === void 0 ? void 0 : _a.hash) !== null && _b !== void 0 ? _b : CONST_1.default.DEFAULT_NUMBER_ID;
            },
            get similarSearchHash() {
                var _a, _b;
                return (_b = (_a = this.searchQueryJSON) === null || _a === void 0 ? void 0 : _a.similarSearchHash) !== null && _b !== void 0 ? _b : CONST_1.default.DEFAULT_NUMBER_ID;
            },
        },
        _a[CONST_1.default.SEARCH.SEARCH_KEYS.CHATS] = {
            key: CONST_1.default.SEARCH.SEARCH_KEYS.CHATS,
            translationPath: 'common.chats',
            type: CONST_1.default.SEARCH.DATA_TYPES.CHAT,
            icon: Expensicons.ChatBubbles,
            searchQuery: (0, SearchQueryUtils_1.buildCannedSearchQuery)({ type: CONST_1.default.SEARCH.DATA_TYPES.CHAT }),
            get searchQueryJSON() {
                return (0, SearchQueryUtils_1.buildSearchQueryJSON)(this.searchQuery);
            },
            get hash() {
                var _a, _b;
                return (_b = (_a = this.searchQueryJSON) === null || _a === void 0 ? void 0 : _a.hash) !== null && _b !== void 0 ? _b : CONST_1.default.DEFAULT_NUMBER_ID;
            },
            get similarSearchHash() {
                var _a, _b;
                return (_b = (_a = this.searchQueryJSON) === null || _a === void 0 ? void 0 : _a.similarSearchHash) !== null && _b !== void 0 ? _b : CONST_1.default.DEFAULT_NUMBER_ID;
            },
        },
        _a[CONST_1.default.SEARCH.SEARCH_KEYS.SUBMIT] = {
            key: CONST_1.default.SEARCH.SEARCH_KEYS.SUBMIT,
            translationPath: 'common.submit',
            type: CONST_1.default.SEARCH.DATA_TYPES.EXPENSE_REPORT,
            icon: Expensicons.Pencil,
            searchQuery: (0, SearchQueryUtils_1.buildQueryStringFromFilterFormValues)({
                type: CONST_1.default.SEARCH.DATA_TYPES.EXPENSE_REPORT,
                action: CONST_1.default.SEARCH.ACTION_FILTERS.SUBMIT,
                from: ["".concat(accountID)],
            }),
            get searchQueryJSON() {
                return (0, SearchQueryUtils_1.buildSearchQueryJSON)(this.searchQuery);
            },
            get hash() {
                var _a, _b;
                return (_b = (_a = this.searchQueryJSON) === null || _a === void 0 ? void 0 : _a.hash) !== null && _b !== void 0 ? _b : CONST_1.default.DEFAULT_NUMBER_ID;
            },
            get similarSearchHash() {
                var _a, _b;
                return (_b = (_a = this.searchQueryJSON) === null || _a === void 0 ? void 0 : _a.similarSearchHash) !== null && _b !== void 0 ? _b : CONST_1.default.DEFAULT_NUMBER_ID;
            },
        },
        _a[CONST_1.default.SEARCH.SEARCH_KEYS.APPROVE] = {
            key: CONST_1.default.SEARCH.SEARCH_KEYS.APPROVE,
            translationPath: 'search.bulkActions.approve',
            type: CONST_1.default.SEARCH.DATA_TYPES.EXPENSE_REPORT,
            icon: Expensicons.ThumbsUp,
            searchQuery: (0, SearchQueryUtils_1.buildQueryStringFromFilterFormValues)({
                type: CONST_1.default.SEARCH.DATA_TYPES.EXPENSE_REPORT,
                action: CONST_1.default.SEARCH.ACTION_FILTERS.APPROVE,
                to: ["".concat(accountID)],
            }),
            get searchQueryJSON() {
                return (0, SearchQueryUtils_1.buildSearchQueryJSON)(this.searchQuery);
            },
            get hash() {
                var _a, _b;
                return (_b = (_a = this.searchQueryJSON) === null || _a === void 0 ? void 0 : _a.hash) !== null && _b !== void 0 ? _b : CONST_1.default.DEFAULT_NUMBER_ID;
            },
            get similarSearchHash() {
                var _a, _b;
                return (_b = (_a = this.searchQueryJSON) === null || _a === void 0 ? void 0 : _a.similarSearchHash) !== null && _b !== void 0 ? _b : CONST_1.default.DEFAULT_NUMBER_ID;
            },
        },
        _a[CONST_1.default.SEARCH.SEARCH_KEYS.PAY] = {
            key: CONST_1.default.SEARCH.SEARCH_KEYS.PAY,
            translationPath: 'search.bulkActions.pay',
            type: CONST_1.default.SEARCH.DATA_TYPES.EXPENSE_REPORT,
            icon: Expensicons.MoneyBag,
            searchQuery: (0, SearchQueryUtils_1.buildQueryStringFromFilterFormValues)({
                type: CONST_1.default.SEARCH.DATA_TYPES.EXPENSE_REPORT,
                action: CONST_1.default.SEARCH.ACTION_FILTERS.PAY,
                reimbursable: CONST_1.default.SEARCH.BOOLEAN.YES,
                payer: accountID === null || accountID === void 0 ? void 0 : accountID.toString(),
            }),
            get searchQueryJSON() {
                return (0, SearchQueryUtils_1.buildSearchQueryJSON)(this.searchQuery);
            },
            get hash() {
                var _a, _b;
                return (_b = (_a = this.searchQueryJSON) === null || _a === void 0 ? void 0 : _a.hash) !== null && _b !== void 0 ? _b : CONST_1.default.DEFAULT_NUMBER_ID;
            },
            get similarSearchHash() {
                var _a, _b;
                return (_b = (_a = this.searchQueryJSON) === null || _a === void 0 ? void 0 : _a.similarSearchHash) !== null && _b !== void 0 ? _b : CONST_1.default.DEFAULT_NUMBER_ID;
            },
        },
        _a[CONST_1.default.SEARCH.SEARCH_KEYS.EXPORT] = {
            key: CONST_1.default.SEARCH.SEARCH_KEYS.EXPORT,
            translationPath: 'common.export',
            type: CONST_1.default.SEARCH.DATA_TYPES.EXPENSE_REPORT,
            icon: Expensicons.CheckCircle,
            searchQuery: (0, SearchQueryUtils_1.buildQueryStringFromFilterFormValues)({
                type: CONST_1.default.SEARCH.DATA_TYPES.EXPENSE_REPORT,
                action: CONST_1.default.SEARCH.ACTION_FILTERS.EXPORT,
                exporter: ["".concat(accountID)],
                exportedOn: CONST_1.default.SEARCH.DATE_PRESETS.NEVER,
            }),
            get searchQueryJSON() {
                return (0, SearchQueryUtils_1.buildSearchQueryJSON)(this.searchQuery);
            },
            get hash() {
                var _a, _b;
                return (_b = (_a = this.searchQueryJSON) === null || _a === void 0 ? void 0 : _a.hash) !== null && _b !== void 0 ? _b : CONST_1.default.DEFAULT_NUMBER_ID;
            },
            get similarSearchHash() {
                var _a, _b;
                return (_b = (_a = this.searchQueryJSON) === null || _a === void 0 ? void 0 : _a.similarSearchHash) !== null && _b !== void 0 ? _b : CONST_1.default.DEFAULT_NUMBER_ID;
            },
        },
        _a[CONST_1.default.SEARCH.SEARCH_KEYS.STATEMENTS] = {
            key: CONST_1.default.SEARCH.SEARCH_KEYS.STATEMENTS,
            translationPath: 'search.statements',
            type: CONST_1.default.SEARCH.DATA_TYPES.EXPENSE,
            icon: Expensicons.CreditCard,
            searchQuery: (0, SearchQueryUtils_1.buildQueryStringFromFilterFormValues)({
                type: CONST_1.default.SEARCH.DATA_TYPES.EXPENSE,
                feed: defaultFeedID ? [defaultFeedID] : [''],
                groupBy: CONST_1.default.SEARCH.GROUP_BY.CARD,
                postedOn: CONST_1.default.SEARCH.DATE_PRESETS.LAST_STATEMENT,
            }),
            get searchQueryJSON() {
                return (0, SearchQueryUtils_1.buildSearchQueryJSON)(this.searchQuery);
            },
            get hash() {
                var _a, _b;
                return (_b = (_a = this.searchQueryJSON) === null || _a === void 0 ? void 0 : _a.hash) !== null && _b !== void 0 ? _b : CONST_1.default.DEFAULT_NUMBER_ID;
            },
            get similarSearchHash() {
                var _a, _b;
                return (_b = (_a = this.searchQueryJSON) === null || _a === void 0 ? void 0 : _a.similarSearchHash) !== null && _b !== void 0 ? _b : CONST_1.default.DEFAULT_NUMBER_ID;
            },
        },
        _a[CONST_1.default.SEARCH.SEARCH_KEYS.UNAPPROVED_CASH] = {
            key: CONST_1.default.SEARCH.SEARCH_KEYS.UNAPPROVED_CASH,
            translationPath: 'search.unapprovedCash',
            type: CONST_1.default.SEARCH.DATA_TYPES.EXPENSE,
            icon: Expensicons.MoneyHourglass,
            searchQuery: (0, SearchQueryUtils_1.buildQueryStringFromFilterFormValues)({
                type: CONST_1.default.SEARCH.DATA_TYPES.EXPENSE,
                status: [CONST_1.default.SEARCH.STATUS.EXPENSE.DRAFTS, CONST_1.default.SEARCH.STATUS.EXPENSE.OUTSTANDING],
                groupBy: CONST_1.default.SEARCH.GROUP_BY.FROM,
                reimbursable: CONST_1.default.SEARCH.BOOLEAN.YES,
            }),
            get searchQueryJSON() {
                return (0, SearchQueryUtils_1.buildSearchQueryJSON)(this.searchQuery);
            },
            get hash() {
                var _a, _b;
                return (_b = (_a = this.searchQueryJSON) === null || _a === void 0 ? void 0 : _a.hash) !== null && _b !== void 0 ? _b : CONST_1.default.DEFAULT_NUMBER_ID;
            },
            get similarSearchHash() {
                var _a, _b;
                return (_b = (_a = this.searchQueryJSON) === null || _a === void 0 ? void 0 : _a.similarSearchHash) !== null && _b !== void 0 ? _b : CONST_1.default.DEFAULT_NUMBER_ID;
            },
        },
        _a[CONST_1.default.SEARCH.SEARCH_KEYS.UNAPPROVED_CARD] = {
            key: CONST_1.default.SEARCH.SEARCH_KEYS.UNAPPROVED_CARD,
            translationPath: 'search.unapprovedCard',
            type: CONST_1.default.SEARCH.DATA_TYPES.EXPENSE,
            icon: Expensicons.CreditCardHourglass,
            searchQuery: (0, SearchQueryUtils_1.buildQueryStringFromFilterFormValues)({
                type: CONST_1.default.SEARCH.DATA_TYPES.EXPENSE,
                feed: defaultFeedID ? [defaultFeedID] : [''],
                groupBy: CONST_1.default.SEARCH.GROUP_BY.CARD,
                status: [CONST_1.default.SEARCH.STATUS.EXPENSE.DRAFTS, CONST_1.default.SEARCH.STATUS.EXPENSE.OUTSTANDING],
            }),
            get searchQueryJSON() {
                return (0, SearchQueryUtils_1.buildSearchQueryJSON)(this.searchQuery);
            },
            get hash() {
                var _a, _b;
                return (_b = (_a = this.searchQueryJSON) === null || _a === void 0 ? void 0 : _a.hash) !== null && _b !== void 0 ? _b : CONST_1.default.DEFAULT_NUMBER_ID;
            },
            get similarSearchHash() {
                var _a, _b;
                return (_b = (_a = this.searchQueryJSON) === null || _a === void 0 ? void 0 : _a.similarSearchHash) !== null && _b !== void 0 ? _b : CONST_1.default.DEFAULT_NUMBER_ID;
            },
        },
        _a[CONST_1.default.SEARCH.SEARCH_KEYS.RECONCILIATION] = {
            key: CONST_1.default.SEARCH.SEARCH_KEYS.RECONCILIATION,
            translationPath: 'search.reconciliation',
            type: CONST_1.default.SEARCH.DATA_TYPES.EXPENSE,
            icon: Expensicons.Bank,
            searchQuery: (0, SearchQueryUtils_1.buildQueryStringFromFilterFormValues)({
                type: CONST_1.default.SEARCH.DATA_TYPES.EXPENSE,
                withdrawalType: CONST_1.default.SEARCH.WITHDRAWAL_TYPE.REIMBURSEMENT,
                withdrawnOn: CONST_1.default.SEARCH.DATE_PRESETS.LAST_MONTH,
                groupBy: CONST_1.default.SEARCH.GROUP_BY.WITHDRAWAL_ID,
            }),
            get searchQueryJSON() {
                return (0, SearchQueryUtils_1.buildSearchQueryJSON)(this.searchQuery);
            },
            get hash() {
                var _a, _b;
                return (_b = (_a = this.searchQueryJSON) === null || _a === void 0 ? void 0 : _a.hash) !== null && _b !== void 0 ? _b : CONST_1.default.DEFAULT_NUMBER_ID;
            },
            get similarSearchHash() {
                var _a, _b;
                return (_b = (_a = this.searchQueryJSON) === null || _a === void 0 ? void 0 : _a.similarSearchHash) !== null && _b !== void 0 ? _b : CONST_1.default.DEFAULT_NUMBER_ID;
            },
        },
        _a;
}
function getSuggestedSearchesVisibility(currentUserEmail, cardFeedsByPolicy, policies, defaultExpensifyCard) {
    var _a;
    var shouldShowSubmitSuggestion = false;
    var shouldShowPaySuggestion = false;
    var shouldShowApproveSuggestion = false;
    var shouldShowExportSuggestion = false;
    var shouldShowStatementsSuggestion = false;
    var shouldShowUnapprovedCashSuggestion = false;
    var shouldShowUnapprovedCardSuggestion = false;
    var shouldShowReconciliationSuggestion = false;
    var hasCardFeed = Object.values(cardFeedsByPolicy !== null && cardFeedsByPolicy !== void 0 ? cardFeedsByPolicy : {}).some(function (feeds) { return feeds.length > 0; });
    Object.values(policies !== null && policies !== void 0 ? policies : {}).some(function (policy) {
        var _a, _b, _c, _d;
        if (!policy) {
            return false;
        }
        var isPaidPolicy = (0, PolicyUtils_1.isPaidGroupPolicy)(policy);
        var isPayer = (0, PolicyUtils_1.isPolicyPayer)(policy, currentUserEmail);
        var isAdmin = policy.role === CONST_1.default.POLICY.ROLE.ADMIN;
        var isExporter = policy.exporter === currentUserEmail;
        var isApprover = policy.approver === currentUserEmail;
        var isApprovalEnabled = policy.approvalMode ? policy.approvalMode !== CONST_1.default.POLICY.APPROVAL_MODE.OPTIONAL : false;
        var hasExportError = Object.keys((_a = policy.connections) !== null && _a !== void 0 ? _a : {}).some(function (connection) {
            return (0, connections_1.hasSynchronizationErrorMessage)(policy, connection, false);
        });
        var isPaymentEnabled = (0, PolicyUtils_1.arePaymentsEnabled)(policy);
        var hasVBBA = !!((_b = policy.achAccount) === null || _b === void 0 ? void 0 : _b.bankAccountID) && policy.achAccount.state === CONST_1.default.BANK_ACCOUNT.STATE.OPEN;
        var hasReimburser = !!((_c = policy.achAccount) === null || _c === void 0 ? void 0 : _c.reimburser);
        var isECardEnabled = !!policy.areExpensifyCardsEnabled;
        var isSubmittedTo = Object.values((_d = policy.employeeList) !== null && _d !== void 0 ? _d : {}).some(function (employee) {
            return employee.submitsTo === currentUserEmail || employee.forwardsTo === currentUserEmail;
        });
        var isEligibleForSubmitSuggestion = isPaidPolicy;
        var isEligibleForPaySuggestion = isPaidPolicy && isPayer;
        var isEligibleForApproveSuggestion = isPaidPolicy && isApprovalEnabled && (isApprover || isSubmittedTo);
        var isEligibleForExportSuggestion = isExporter && !hasExportError;
        var isEligibleForStatementsSuggestion = isPaidPolicy && !!policy.areCompanyCardsEnabled && hasCardFeed;
        var isEligibleForUnapprovedCashSuggestion = isPaidPolicy && isAdmin && isApprovalEnabled && isPaymentEnabled;
        var isEligibleForUnapprovedCardSuggestion = isPaidPolicy && isAdmin && isApprovalEnabled && (hasCardFeed || !!defaultExpensifyCard);
        var isEligibleForReconciliationSuggestion = isPaidPolicy && isAdmin && ((isPaymentEnabled && hasVBBA && hasReimburser) || isECardEnabled);
        shouldShowSubmitSuggestion || (shouldShowSubmitSuggestion = isEligibleForSubmitSuggestion);
        shouldShowPaySuggestion || (shouldShowPaySuggestion = isEligibleForPaySuggestion);
        shouldShowApproveSuggestion || (shouldShowApproveSuggestion = isEligibleForApproveSuggestion);
        shouldShowExportSuggestion || (shouldShowExportSuggestion = isEligibleForExportSuggestion);
        shouldShowStatementsSuggestion || (shouldShowStatementsSuggestion = isEligibleForStatementsSuggestion);
        shouldShowUnapprovedCashSuggestion || (shouldShowUnapprovedCashSuggestion = isEligibleForUnapprovedCashSuggestion);
        shouldShowUnapprovedCardSuggestion || (shouldShowUnapprovedCardSuggestion = isEligibleForUnapprovedCardSuggestion);
        shouldShowReconciliationSuggestion || (shouldShowReconciliationSuggestion = isEligibleForReconciliationSuggestion);
        // We don't need to check the rest of the policies if we already determined that all suggestions should be displayed
        return (shouldShowSubmitSuggestion &&
            shouldShowPaySuggestion &&
            shouldShowApproveSuggestion &&
            shouldShowExportSuggestion &&
            shouldShowStatementsSuggestion &&
            shouldShowUnapprovedCashSuggestion &&
            shouldShowUnapprovedCardSuggestion &&
            shouldShowReconciliationSuggestion);
    });
    return _a = {},
        _a[CONST_1.default.SEARCH.SEARCH_KEYS.EXPENSES] = true,
        _a[CONST_1.default.SEARCH.SEARCH_KEYS.REPORTS] = true,
        _a[CONST_1.default.SEARCH.SEARCH_KEYS.CHATS] = true,
        _a[CONST_1.default.SEARCH.SEARCH_KEYS.SUBMIT] = shouldShowSubmitSuggestion,
        _a[CONST_1.default.SEARCH.SEARCH_KEYS.PAY] = shouldShowPaySuggestion,
        _a[CONST_1.default.SEARCH.SEARCH_KEYS.APPROVE] = shouldShowApproveSuggestion,
        _a[CONST_1.default.SEARCH.SEARCH_KEYS.EXPORT] = shouldShowExportSuggestion,
        _a[CONST_1.default.SEARCH.SEARCH_KEYS.STATEMENTS] = shouldShowStatementsSuggestion,
        _a[CONST_1.default.SEARCH.SEARCH_KEYS.UNAPPROVED_CASH] = shouldShowUnapprovedCashSuggestion,
        _a[CONST_1.default.SEARCH.SEARCH_KEYS.UNAPPROVED_CARD] = shouldShowUnapprovedCardSuggestion,
        _a[CONST_1.default.SEARCH.SEARCH_KEYS.RECONCILIATION] = shouldShowReconciliationSuggestion,
        _a;
}
/**
 * @private
 *
 * Returns a list of properties that are common to every Search ListItem
 */
function getTransactionItemCommonFormattedProperties(transactionItem, from, to, policy, formatPhoneNumber, report) {
    var isExpenseReport = (report === null || report === void 0 ? void 0 : report.type) === CONST_1.default.REPORT.TYPE.EXPENSE;
    var fromName = (0, PersonalDetailsUtils_1.getDisplayNameOrDefault)(from);
    var formattedFrom = formatPhoneNumber(fromName);
    // Sometimes the search data personal detail for the 'to' account might not hold neither the display name nor the login
    // so for those cases we fallback to the display name of the personal detail data from onyx.
    var toName = (0, PersonalDetailsUtils_1.getDisplayNameOrDefault)(to, '', false);
    if (!toName && (to === null || to === void 0 ? void 0 : to.accountID)) {
        toName = (0, PersonalDetailsUtils_1.getDisplayNameOrDefault)((0, ReportUtils_1.getPersonalDetailsForAccountID)(to === null || to === void 0 ? void 0 : to.accountID));
    }
    var formattedTo = formatPhoneNumber(toName);
    var formattedTotal = (0, TransactionUtils_1.getAmount)(transactionItem, isExpenseReport);
    var date = (transactionItem === null || transactionItem === void 0 ? void 0 : transactionItem.modifiedCreated) ? transactionItem.modifiedCreated : transactionItem === null || transactionItem === void 0 ? void 0 : transactionItem.created;
    var merchant = (0, TransactionUtils_1.getMerchant)(transactionItem, policy);
    var formattedMerchant = merchant === CONST_1.default.TRANSACTION.PARTIAL_TRANSACTION_MERCHANT ? '' : merchant;
    return {
        formattedFrom: formattedFrom,
        formattedTo: formattedTo,
        date: date,
        formattedTotal: formattedTotal,
        formattedMerchant: formattedMerchant,
    };
}
/**
 * @private
 */
function isReportEntry(key) {
    return key.startsWith(ONYXKEYS_1.default.COLLECTION.REPORT);
}
/**
 * @private
 */
function isGroupEntry(key) {
    return key.startsWith(CONST_1.default.SEARCH.GROUP_PREFIX);
}
/**
 * @private
 */
function isPolicyEntry(key) {
    return key.startsWith(ONYXKEYS_1.default.COLLECTION.POLICY);
}
function isViolationEntry(key) {
    return key.startsWith(ONYXKEYS_1.default.COLLECTION.TRANSACTION_VIOLATIONS);
}
/**
 * @private
 */
function isReportActionEntry(key) {
    return key.startsWith(ONYXKEYS_1.default.COLLECTION.REPORT_ACTIONS);
}
/**
 * @private
 */
function isTransactionEntry(key) {
    return key.startsWith(ONYXKEYS_1.default.COLLECTION.TRANSACTION);
}
/**
 * Determines whether to display the merchant field based on the transactions in the search results.
 */
function getShouldShowMerchant(data) {
    return Object.keys(data).some(function (key) {
        var _a;
        if (isTransactionEntry(key)) {
            var item = data[key];
            var merchant = item.modifiedMerchant ? item.modifiedMerchant : ((_a = item.merchant) !== null && _a !== void 0 ? _a : '');
            return merchant !== '' && merchant !== CONST_1.default.TRANSACTION.PARTIAL_TRANSACTION_MERCHANT;
        }
        return false;
    });
}
/**
 * Type guard that checks if something is a TransactionGroupListItemType
 */
function isTransactionGroupListItemType(item) {
    return 'transactions' in item;
}
/**
 * Type guard that checks if something is a TransactionReportGroupListItemType
 */
function isTransactionReportGroupListItemType(item) {
    return isTransactionGroupListItemType(item) && 'groupedBy' in item && item.groupedBy === CONST_1.default.SEARCH.DATA_TYPES.EXPENSE_REPORT;
}
/**
 * Type guard that checks if something is a TransactionMemberGroupListItemType
 */
function isTransactionMemberGroupListItemType(item) {
    return isTransactionGroupListItemType(item) && 'groupedBy' in item && item.groupedBy === CONST_1.default.SEARCH.GROUP_BY.FROM;
}
/**
 * Type guard that checks if something is a TransactionCardGroupListItemType
 */
function isTransactionCardGroupListItemType(item) {
    return isTransactionGroupListItemType(item) && 'groupedBy' in item && item.groupedBy === CONST_1.default.SEARCH.GROUP_BY.CARD;
}
/**
 * Type guard that checks if something is a TransactionWithdrawalIDGroupListItemType
 */
function isTransactionWithdrawalIDGroupListItemType(item) {
    return isTransactionGroupListItemType(item) && 'groupedBy' in item && item.groupedBy === CONST_1.default.SEARCH.GROUP_BY.WITHDRAWAL_ID;
}
/**
 * Type guard that checks if something is a TransactionListItemType
 */
function isTransactionListItemType(item) {
    var transactionListItem = item;
    return transactionListItem.transactionID !== undefined;
}
/**
 * Type guard that check if something is a TaskListItemType
 */
function isTaskListItemType(item) {
    return 'type' in item && item.type === CONST_1.default.REPORT.TYPE.TASK;
}
/**
 * Type guard that checks if something is a ReportActionListItemType
 */
function isReportActionListItemType(item) {
    var reportActionListItem = item;
    return reportActionListItem.reportActionID !== undefined;
}
function isAmountTooLong(amount, maxLength) {
    if (maxLength === void 0) { maxLength = 8; }
    return Math.abs(amount).toString().length >= maxLength;
}
function isTransactionAmountTooLong(transactionItem) {
    // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
    var amount = Math.abs(transactionItem.modifiedAmount || transactionItem.amount);
    return isAmountTooLong(amount);
}
function isTransactionTaxAmountTooLong(transactionItem) {
    // it won't matter if pass true or false as second argument to getTaxAmount here because isAmountTooLong function uses Math.abs on the returned value of getTaxAmount
    var taxAmount = (0, TransactionUtils_1.getTaxAmount)(transactionItem, false);
    return isAmountTooLong(taxAmount);
}
function getWideAmountIndicators(data) {
    var isAmountWide = false;
    var isTaxAmountWide = false;
    var processTransaction = function (transaction) {
        isAmountWide || (isAmountWide = isTransactionAmountTooLong(transaction));
        isTaxAmountWide || (isTaxAmountWide = isTransactionTaxAmountTooLong(transaction));
    };
    if (Array.isArray(data)) {
        data.some(function (item) {
            var _a;
            if (isTransactionGroupListItemType(item)) {
                var transactions = (_a = item.transactions) !== null && _a !== void 0 ? _a : [];
                for (var _i = 0, transactions_1 = transactions; _i < transactions_1.length; _i++) {
                    var transaction = transactions_1[_i];
                    processTransaction(transaction);
                    if (isAmountWide && isTaxAmountWide) {
                        break;
                    }
                }
            }
            else if (isTransactionListItemType(item)) {
                processTransaction(item);
            }
            return isAmountWide && isTaxAmountWide;
        });
    }
    else {
        Object.keys(data).some(function (key) {
            if (isTransactionEntry(key)) {
                var item = data[key];
                processTransaction(item);
            }
            return isAmountWide && isTaxAmountWide;
        });
    }
    return {
        shouldShowAmountInWideColumn: isAmountWide,
        shouldShowTaxAmountInWideColumn: isTaxAmountWide,
    };
}
/**
 * Checks if the date of transactions or reports indicate the need to display the year because they are from a past year.
 * @param data - The search results data (array or object)
 * @param checkOnlyReports - When true and data is an object, only check report dates (skip transactions and report actions)
 */
function shouldShowYear(data, checkOnlyReports) {
    if (checkOnlyReports === void 0) { checkOnlyReports = false; }
    var currentYear = new Date().getFullYear();
    if (Array.isArray(data)) {
        return data.some(function (item) {
            if (isTaskListItemType(item)) {
                var taskYear = new Date(item.created).getFullYear();
                return taskYear !== currentYear;
            }
            if (isTransactionGroupListItemType(item)) {
                // If the item is a TransactionGroupListItemType, iterate over its transactions and check them
                return item.transactions.some(function (transaction) {
                    var transactionYear = new Date((0, TransactionUtils_1.getCreated)(transaction)).getFullYear();
                    return transactionYear !== currentYear;
                });
            }
            var createdYear = new Date((item === null || item === void 0 ? void 0 : item.modifiedCreated) ? item.modifiedCreated : (item === null || item === void 0 ? void 0 : item.created) || '').getFullYear();
            return createdYear !== currentYear;
        });
    }
    for (var key in data) {
        if (!checkOnlyReports && isTransactionEntry(key)) {
            var item = data[key];
            if ((0, shouldShowTransactionYear_1.default)(item)) {
                return true;
            }
        }
        else if (!checkOnlyReports && isReportActionEntry(key)) {
            var item = data[key];
            for (var _i = 0, _a = Object.values(item); _i < _a.length; _i++) {
                var action = _a[_i];
                var date = action.created;
                if (DateUtils_1.default.doesDateBelongToAPastYear(date)) {
                    return true;
                }
            }
        }
        else if (isReportEntry(key)) {
            var item = data[key];
            var date = item.created;
            if (date && DateUtils_1.default.doesDateBelongToAPastYear(date)) {
                return true;
            }
        }
    }
    return false;
}
/**
 * @private
 * Extracts all transaction violations from the search data.
 */
function getViolations(data) {
    return Object.fromEntries(Object.entries(data).filter(function (_a) {
        var key = _a[0];
        return isViolationEntry(key);
    }));
}
/**
 * @private
 * Generates a display name for IOU reports considering the personal details of the payer and the transaction details.
 */
function getIOUReportName(data, reportItem) {
    var _a, _b, _c, _d, _e;
    var payerPersonalDetails = reportItem.managerID ? (_a = data.personalDetailsList) === null || _a === void 0 ? void 0 : _a[reportItem.managerID] : emptyPersonalDetails;
    // For cases where the data personal detail for manager ID do not exist in search data.personalDetailsList
    // we fallback to the display name of the personal detail data from onyx.
    var payerName = (_c = (_b = payerPersonalDetails === null || payerPersonalDetails === void 0 ? void 0 : payerPersonalDetails.displayName) !== null && _b !== void 0 ? _b : payerPersonalDetails === null || payerPersonalDetails === void 0 ? void 0 : payerPersonalDetails.login) !== null && _c !== void 0 ? _c : (0, PersonalDetailsUtils_1.getDisplayNameOrDefault)((0, ReportUtils_1.getPersonalDetailsForAccountID)(reportItem.managerID));
    var formattedAmount = (0, CurrencyUtils_1.convertToDisplayString)((_d = reportItem.total) !== null && _d !== void 0 ? _d : 0, (_e = reportItem.currency) !== null && _e !== void 0 ? _e : CONST_1.default.CURRENCY.USD);
    if (reportItem.action === CONST_1.default.SEARCH.ACTION_TYPES.PAID) {
        // eslint-disable-next-line @typescript-eslint/no-deprecated
        return (0, Localize_1.translateLocal)('iou.payerPaidAmount', {
            payer: payerName,
            amount: formattedAmount,
        });
    }
    // eslint-disable-next-line @typescript-eslint/no-deprecated
    return (0, Localize_1.translateLocal)('iou.payerOwesAmount', {
        payer: payerName,
        amount: formattedAmount,
    });
}
function getTransactionViolations(allViolations, transaction, currentUserEmail) {
    var transactionViolations = allViolations === null || allViolations === void 0 ? void 0 : allViolations["".concat(ONYXKEYS_1.default.COLLECTION.TRANSACTION_VIOLATIONS).concat(transaction.transactionID)];
    if (!transactionViolations) {
        return [];
    }
    return transactionViolations.filter(function (violation) { return !(0, TransactionUtils_1.isViolationDismissed)(transaction, violation, currentUserEmail); });
}
/**
 * @private
 * Creates an optimized lookup map for report actions indexed by transaction ID.
 */
function createReportActionsByTransactionIDMap(data) {
    var reportActionsByTransactionID = new Map();
    for (var _i = 0, _a = Object.keys(data); _i < _a.length; _i++) {
        var key = _a[_i];
        if (isReportActionEntry(key)) {
            var actions = Object.values(data[key]);
            for (var _b = 0, actions_1 = actions; _b < actions_1.length; _b++) {
                var action = actions_1[_b];
                if ((0, ReportActionsUtils_1.isMoneyRequestAction)(action)) {
                    var originalMessage = (0, ReportActionsUtils_1.getOriginalMessage)(action);
                    var transactionID = originalMessage === null || originalMessage === void 0 ? void 0 : originalMessage.IOUTransactionID;
                    if (transactionID) {
                        reportActionsByTransactionID.set(transactionID, action);
                    }
                }
            }
        }
    }
    return reportActionsByTransactionID;
}
/**
 * Calculates the "to" field value for a given transaction item based on the associated report and search data.
 */
function getToFieldValueForTransaction(transactionItem, report, personalDetailsList, reportAction) {
    var _a, _b, _c, _d, _e, _f;
    var shouldShowBlankTo = !report || (0, ReportUtils_1.isOpenExpenseReport)(report);
    if (shouldShowBlankTo) {
        return emptyPersonalDetails;
    }
    if (reportAction) {
        var originalMessage = (0, ReportActionsUtils_1.isMoneyRequestAction)(reportAction) ? (0, ReportActionsUtils_1.getOriginalMessage)(reportAction) : undefined;
        if ((originalMessage === null || originalMessage === void 0 ? void 0 : originalMessage.type) === CONST_1.default.IOU.REPORT_ACTION_TYPE.PAY && report.ownerAccountID) {
            return (_a = personalDetailsList === null || personalDetailsList === void 0 ? void 0 : personalDetailsList[report.ownerAccountID]) !== null && _a !== void 0 ? _a : emptyPersonalDetails;
        }
    }
    if (report === null || report === void 0 ? void 0 : report.managerID) {
        var isIOUReport = (report === null || report === void 0 ? void 0 : report.type) === CONST_1.default.REPORT.TYPE.IOU;
        if (isIOUReport) {
            return ((_e = (_d = (0, TransactionPreviewUtils_1.getIOUPayerAndReceiver)((_b = report === null || report === void 0 ? void 0 : report.managerID) !== null && _b !== void 0 ? _b : CONST_1.default.DEFAULT_NUMBER_ID, (_c = report === null || report === void 0 ? void 0 : report.ownerAccountID) !== null && _c !== void 0 ? _c : CONST_1.default.DEFAULT_NUMBER_ID, personalDetailsList, transactionItem.amount)) === null || _d === void 0 ? void 0 : _d.to) !== null && _e !== void 0 ? _e : emptyPersonalDetails);
        }
        return (_f = personalDetailsList === null || personalDetailsList === void 0 ? void 0 : personalDetailsList[report === null || report === void 0 ? void 0 : report.managerID]) !== null && _f !== void 0 ? _f : emptyPersonalDetails;
    }
    return emptyPersonalDetails;
}
/**
 * @private
 * Organizes data into List Sections for display, for the TransactionListItemType of Search Results.
 *
 * Do not use directly, use only via `getSections()` facade.
 */
function getTransactionsSections(data, currentSearch, currentAccountID, currentUserEmail, formatPhoneNumber) {
    var _a, _b;
    var shouldShowMerchant = getShouldShowMerchant(data);
    var doesDataContainAPastYearTransaction = shouldShowYear(data);
    var _c = getWideAmountIndicators(data), shouldShowAmountInWideColumn = _c.shouldShowAmountInWideColumn, shouldShowTaxAmountInWideColumn = _c.shouldShowTaxAmountInWideColumn;
    // Pre-filter transaction keys to avoid repeated checks
    var transactionKeys = Object.keys(data).filter(isTransactionEntry);
    // Get violations - optimize by using a Map for faster lookups
    var allViolations = getViolations(data);
    // Use Map for faster lookups of personal details and reportActions
    var personalDetailsMap = new Map(Object.entries(data.personalDetailsList || {}));
    var reportActionsByTransactionIDMap = createReportActionsByTransactionIDMap(data);
    var transactionsSections = [];
    var queryJSON = (0, SearchQueryUtils_1.getCurrentSearchQueryJSON)();
    var _loop_1 = function (key) {
        var transactionItem = data[key];
        // eslint-disable-next-line @typescript-eslint/no-deprecated
        var report = data["".concat(ONYXKEYS_1.default.COLLECTION.REPORT).concat(transactionItem.reportID)];
        var shouldShow = true;
        if (queryJSON && !transactionItem.isActionLoading) {
            if (queryJSON.type === CONST_1.default.SEARCH.DATA_TYPES.EXPENSE) {
                var status_1 = queryJSON.status;
                if (Array.isArray(status_1)) {
                    shouldShow = status_1.some(function (expenseStatus) {
                        return isValidExpenseStatus(expenseStatus) ? expenseStatusActionMapping[expenseStatus](report) : false;
                    });
                }
                else {
                    shouldShow = isValidExpenseStatus(status_1) ? expenseStatusActionMapping[status_1](report) : false;
                }
            }
        }
        if (!transactionItem.transactionID) {
            shouldShow = false;
        }
        if (shouldShow) {
            var reportAction = reportActionsByTransactionIDMap.get(transactionItem.transactionID);
            var policy = data["".concat(ONYXKEYS_1.default.COLLECTION.POLICY).concat(report === null || report === void 0 ? void 0 : report.policyID)];
            var shouldShowBlankTo = !report || (0, ReportUtils_1.isOpenExpenseReport)(report);
            var transactionViolations = getTransactionViolations(allViolations, transactionItem, currentUserEmail);
            // Use Map.get() for faster lookups with default values
            var from = (reportAction === null || reportAction === void 0 ? void 0 : reportAction.actorAccountID) ? ((_a = personalDetailsMap.get(reportAction.actorAccountID.toString())) !== null && _a !== void 0 ? _a : emptyPersonalDetails) : emptyPersonalDetails;
            var to = getToFieldValueForTransaction(transactionItem, report, data.personalDetailsList, reportAction);
            var _d = getTransactionItemCommonFormattedProperties(transactionItem, from, to, policy, formatPhoneNumber, report), formattedFrom = _d.formattedFrom, formattedTo = _d.formattedTo, formattedTotal = _d.formattedTotal, formattedMerchant = _d.formattedMerchant, date = _d.date;
            var allActions = getActions(data, allViolations, key, currentSearch, currentAccountID, currentUserEmail);
            var transactionSection = __assign(__assign({}, transactionItem), { keyForList: transactionItem.transactionID, action: (_b = allActions.at(0)) !== null && _b !== void 0 ? _b : CONST_1.default.SEARCH.ACTION_TYPES.VIEW, allActions: allActions, report: report, policy: policy, reportAction: reportAction, from: from, to: to, formattedFrom: formattedFrom, formattedTo: shouldShowBlankTo ? '' : formattedTo, formattedTotal: formattedTotal, formattedMerchant: formattedMerchant, date: date, shouldShowMerchant: shouldShowMerchant, shouldShowYear: doesDataContainAPastYearTransaction, isAmountColumnWide: shouldShowAmountInWideColumn, isTaxAmountColumnWide: shouldShowTaxAmountInWideColumn, violations: transactionViolations });
            transactionsSections.push(transactionSection);
        }
    };
    for (var _i = 0, transactionKeys_1 = transactionKeys; _i < transactionKeys_1.length; _i++) {
        var key = transactionKeys_1[_i];
        _loop_1(key);
    }
    return transactionsSections;
}
/**
 * @private
 * Retrieves all transactions associated with a specific report ID from the search data.

 */
function getTransactionsForReport(data, reportID) {
    return Object.entries(data)
        .filter(function (_a) {
        var key = _a[0], value = _a[1];
        return isTransactionEntry(key) && (value === null || value === void 0 ? void 0 : value.reportID) === reportID;
    })
        .map(function (_a) {
        var value = _a[1];
        return value;
    });
}
/**
 * @private
 * Retrieves a report from the search data based on the provided key.
 */
function getReportFromKey(data, key) {
    if (isTransactionEntry(key)) {
        var transaction = data[key];
        return data["".concat(ONYXKEYS_1.default.COLLECTION.REPORT).concat(transaction === null || transaction === void 0 ? void 0 : transaction.reportID)];
    }
    if (isReportEntry(key)) {
        return data[key];
    }
    return undefined;
}
/**
 * @private
 * Retrieves the chat report associated with a given report.
 */
function getChatReport(data, report) {
    var _a;
    return (_a = data["".concat(ONYXKEYS_1.default.COLLECTION.REPORT).concat(report === null || report === void 0 ? void 0 : report.chatReportID)]) !== null && _a !== void 0 ? _a : {};
}
/**
 * @private
 * Retrieves the policy associated with a given report.
 */
function getPolicyFromKey(data, report) {
    var _a;
    return (_a = data["".concat(ONYXKEYS_1.default.COLLECTION.POLICY).concat(report === null || report === void 0 ? void 0 : report.policyID)]) !== null && _a !== void 0 ? _a : {};
}
/**
 * @private
 * Retrieves the report name-value pairs associated with a given report.
 */
function getReportNameValuePairsFromKey(data, report) {
    var _a;
    return (_a = data["".concat(ONYXKEYS_1.default.COLLECTION.REPORT_NAME_VALUE_PAIRS).concat(report === null || report === void 0 ? void 0 : report.reportID)]) !== null && _a !== void 0 ? _a : undefined;
}
/**
 * @private
 * Determines the permission flags for a user reviewing a report.
 */
function getReviewerPermissionFlags(report, policy, currentAccountID) {
    return {
        isSubmitter: report.ownerAccountID === currentAccountID,
        isAdmin: policy.role === CONST_1.default.POLICY.ROLE.ADMIN,
        isApprover: report.managerID === currentAccountID,
    };
}
/**
 * Returns the action that can be taken on a given transaction or report
 *
 * Do not use directly, use only via `getSections()` facade.
 */
function getActions(data, allViolations, key, currentSearch, currentAccountID, currentUserEmail, reportActions) {
    var _a, _b, _c;
    if (reportActions === void 0) { reportActions = []; }
    var isTransaction = isTransactionEntry(key);
    var report = getReportFromKey(data, key);
    if (currentSearch === CONST_1.default.SEARCH.SEARCH_KEYS.EXPORT) {
        return [CONST_1.default.SEARCH.ACTION_TYPES.EXPORT_TO_ACCOUNTING];
    }
    if (!isTransaction && !isReportEntry(key)) {
        return [CONST_1.default.SEARCH.ACTION_TYPES.VIEW];
    }
    var transaction = isTransaction ? data[key] : undefined;
    if ((0, TransactionUtils_1.isUnreportedAndHasInvalidDistanceRateTransaction)(transaction)) {
        return [CONST_1.default.SEARCH.ACTION_TYPES.REVIEW];
    }
    // Tracked and unreported expenses don't have a report, so we return early.
    if (!report) {
        return [CONST_1.default.SEARCH.ACTION_TYPES.VIEW];
    }
    var policy = getPolicyFromKey(data, report);
    var isExportAvailable = (0, ReportPrimaryActionUtils_1.isExportAction)(report, policy, reportActions) && !isTransaction;
    if ((0, ReportUtils_1.isSettled)(report) && !isExportAvailable) {
        return [CONST_1.default.SEARCH.ACTION_TYPES.PAID];
    }
    // We need to check both options for a falsy value since the transaction might not have an error but the report associated with it might. We return early if there are any errors for performance reasons, so we don't need to compute any other possible actions.
    // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
    if ((transaction === null || transaction === void 0 ? void 0 : transaction.errors) || (report === null || report === void 0 ? void 0 : report.errors)) {
        return [CONST_1.default.SEARCH.ACTION_TYPES.REVIEW];
    }
    // We don't need to run the logic if this is not a transaction or iou/expense report, so let's shortcut the logic for performance reasons
    if (!(0, ReportUtils_1.isMoneyRequestReport)(report) && !(0, ReportUtils_1.isInvoiceReport)(report)) {
        return [CONST_1.default.SEARCH.ACTION_TYPES.VIEW];
    }
    var allActions = [];
    var allReportTransactions;
    if (isReportEntry(key)) {
        allReportTransactions = getTransactionsForReport(data, report.reportID);
    }
    else {
        allReportTransactions = transaction ? [transaction] : [];
    }
    var _d = getReviewerPermissionFlags(report, policy, currentAccountID), isSubmitter = _d.isSubmitter, isAdmin = _d.isAdmin, isApprover = _d.isApprover;
    var reportNVP = getReportNameValuePairsFromKey(data, report);
    var isIOUReportArchived = (0, ReportUtils_1.isArchivedReport)(reportNVP);
    var chatReportRNVP = (_a = data["".concat(ONYXKEYS_1.default.COLLECTION.REPORT_NAME_VALUE_PAIRS).concat(report.chatReportID)]) !== null && _a !== void 0 ? _a : undefined;
    var isChatReportArchived = (0, ReportUtils_1.isArchivedReport)(chatReportRNVP);
    var hasAnyViolationsForReport = (0, ReportUtils_1.hasAnyViolations)(report.reportID, allViolations, allReportTransactions);
    var hasVisibleViolationsForReport = hasAnyViolationsForReport && ViolationsUtils_1.default.hasVisibleViolationsForUser(report, allViolations, currentUserEmail, policy, allReportTransactions);
    // Only check for violations if we need to (when user has permission to review)
    if ((isSubmitter || isApprover || isAdmin) && hasVisibleViolationsForReport) {
        if (isSubmitter && !isApprover && !isAdmin && !(0, ReportPreviewActionUtils_1.canReview)(report, allViolations, isIOUReportArchived || isChatReportArchived, currentUserEmail, policy, allReportTransactions)) {
            allActions.push(CONST_1.default.SEARCH.ACTION_TYPES.VIEW);
        }
        else {
            allActions.push(CONST_1.default.SEARCH.ACTION_TYPES.REVIEW);
        }
    }
    // Submit/Approve/Pay can only be taken on transactions if the transaction is the only one on the report, otherwise `View` is the only option.
    // If this condition is not met, return early for performance reasons
    if (isTransaction && !(transaction === null || transaction === void 0 ? void 0 : transaction.isFromOneTransactionReport)) {
        return allActions.length > 0 ? allActions : [CONST_1.default.SEARCH.ACTION_TYPES.VIEW];
    }
    var invoiceReceiverPolicy = (0, ReportUtils_1.isInvoiceReport)(report) && ((_b = report === null || report === void 0 ? void 0 : report.invoiceReceiver) === null || _b === void 0 ? void 0 : _b.type) === CONST_1.default.REPORT.INVOICE_RECEIVER_TYPE.BUSINESS
        ? data["".concat(ONYXKEYS_1.default.COLLECTION.POLICY).concat((_c = report === null || report === void 0 ? void 0 : report.invoiceReceiver) === null || _c === void 0 ? void 0 : _c.policyID)]
        : undefined;
    var chatReport = getChatReport(data, report);
    var canBePaid = (0, IOU_1.canIOUBePaid)(report, chatReport, policy, allReportTransactions, false, chatReportRNVP, invoiceReceiverPolicy);
    var shouldOnlyShowElsewhere = !canBePaid && (0, IOU_1.canIOUBePaid)(report, chatReport, policy, allReportTransactions, true, chatReportRNVP, invoiceReceiverPolicy);
    if ((canBePaid || shouldOnlyShowElsewhere) && !(0, ReportUtils_1.hasOnlyHeldExpenses)(report.reportID, allReportTransactions)) {
        allActions.push(CONST_1.default.SEARCH.ACTION_TYPES.PAY);
    }
    if (isExportAvailable) {
        allActions.push(CONST_1.default.SEARCH.ACTION_TYPES.EXPORT_TO_ACCOUNTING);
    }
    if ((0, ReportUtils_1.isClosedReport)(report)) {
        return allActions.length > 0 ? allActions : [CONST_1.default.SEARCH.ACTION_TYPES.DONE];
    }
    var hasOnlyPendingCardOrScanningTransactions = allReportTransactions.length > 0 && allReportTransactions.every(function (t) { return (0, TransactionUtils_1.isScanning)(t) || (0, TransactionUtils_1.isPending)(t); });
    var isAllowedToApproveExpenseReport = (0, ReportUtils_1.isAllowedToApproveExpenseReport)(report, undefined, policy);
    if ((0, IOU_1.canApproveIOU)(report, policy, allReportTransactions) &&
        isAllowedToApproveExpenseReport &&
        !hasOnlyPendingCardOrScanningTransactions &&
        !(0, ReportUtils_1.hasOnlyHeldExpenses)(report.reportID, allReportTransactions)) {
        allActions.push(CONST_1.default.SEARCH.ACTION_TYPES.APPROVE);
    }
    // We check for isAllowedToApproveExpenseReport because if the policy has preventSelfApprovals enabled, we disable the Submit action and in that case we want to show the View action instead
    if ((0, IOU_1.canSubmitReport)(report, policy, allReportTransactions, allViolations, isIOUReportArchived || isChatReportArchived) && isAllowedToApproveExpenseReport) {
        allActions.push(CONST_1.default.SEARCH.ACTION_TYPES.SUBMIT);
    }
    if (reportNVP === null || reportNVP === void 0 ? void 0 : reportNVP.exportFailedTime) {
        return allActions.length > 0 ? allActions : [CONST_1.default.SEARCH.ACTION_TYPES.REVIEW];
    }
    return allActions.length > 0 ? allActions : [CONST_1.default.SEARCH.ACTION_TYPES.VIEW];
}
/**
 * @private
 * Organizes data into List Sections for display, for the TaskListItemType of Search Results.
 *
 * Do not use directly, use only via `getSections()` facade.
 */
function getTaskSections(data, formatPhoneNumber, archivedReportsIDList) {
    return (Object.keys(data)
        .filter(isReportEntry)
        // Ensure that the reports that were passed are tasks, and not some other
        // type of report that was sent as the parent
        .filter(function (key) { return isTaskListItemType(data[key]); })
        .map(function (key) {
        var _a, _b, _c;
        var taskItem = data[key];
        var personalDetails = data.personalDetailsList;
        var assignee = (_a = personalDetails === null || personalDetails === void 0 ? void 0 : personalDetails[taskItem.managerID]) !== null && _a !== void 0 ? _a : emptyPersonalDetails;
        var createdBy = (_b = personalDetails === null || personalDetails === void 0 ? void 0 : personalDetails[taskItem.accountID]) !== null && _b !== void 0 ? _b : emptyPersonalDetails;
        var formattedAssignee = formatPhoneNumber((0, PersonalDetailsUtils_1.getDisplayNameOrDefault)(assignee));
        var formattedCreatedBy = formatPhoneNumber((0, PersonalDetailsUtils_1.getDisplayNameOrDefault)(createdBy));
        var report = (_c = (0, ReportUtils_1.getReportOrDraftReport)(taskItem.reportID)) !== null && _c !== void 0 ? _c : taskItem;
        var parentReport = (0, ReportUtils_1.getReportOrDraftReport)(taskItem.parentReportID);
        var doesDataContainAPastYearTransaction = shouldShowYear(data);
        var reportName = StringUtils_1.default.lineBreaksToSpaces(Parser_1.default.htmlToText(taskItem.reportName));
        var description = StringUtils_1.default.lineBreaksToSpaces(Parser_1.default.htmlToText(taskItem.description));
        var result = __assign(__assign({}, taskItem), { reportName: reportName, description: description, assignee: assignee, formattedAssignee: formattedAssignee, createdBy: createdBy, formattedCreatedBy: formattedCreatedBy, keyForList: taskItem.reportID, shouldShowYear: doesDataContainAPastYearTransaction });
        if (parentReport && personalDetails) {
            // This will be fixed as part of https://github.com/Expensify/Expensify/issues/507850
            // eslint-disable-next-line @typescript-eslint/no-deprecated
            var policy = (0, PolicyUtils_1.getPolicy)(parentReport.policyID);
            var isParentReportArchived = archivedReportsIDList === null || archivedReportsIDList === void 0 ? void 0 : archivedReportsIDList.has("".concat(ONYXKEYS_1.default.COLLECTION.REPORT_NAME_VALUE_PAIRS).concat(parentReport === null || parentReport === void 0 ? void 0 : parentReport.reportID));
            var parentReportName = (0, ReportUtils_1.getReportName)(parentReport, policy, undefined, undefined, undefined, undefined, undefined, isParentReportArchived);
            var icons = (0, ReportUtils_1.getIcons)(parentReport, personalDetails, null, '', -1, policy, undefined, isParentReportArchived);
            var parentReportIcon = icons === null || icons === void 0 ? void 0 : icons.at(0);
            result.parentReportName = parentReportName;
            result.parentReportIcon = parentReportIcon;
        }
        if (report) {
            result.report = report;
        }
        return result;
    }));
}
/** Creates transaction thread report and navigates to it from the search page */
function createAndOpenSearchTransactionThread(item, hash, backTo, transactionPreviewData, shouldNavigate) {
    if (shouldNavigate === void 0) { shouldNavigate = true; }
    var previewData = transactionPreviewData
        ? __assign(__assign({}, transactionPreviewData), { hasTransactionThreadReport: true }) : { hasTransaction: false, hasParentReport: false, hasParentReportAction: false, hasTransactionThreadReport: true };
    (0, Search_1.setOptimisticDataForTransactionThreadPreview)(item, previewData);
    var transactionThreadReport = (0, Report_1.createTransactionThreadReport)(item.report, { reportActionID: item.moneyRequestReportActionID });
    if (transactionThreadReport === null || transactionThreadReport === void 0 ? void 0 : transactionThreadReport.reportID) {
        (0, Search_1.updateSearchResultsWithTransactionThreadReportID)(hash, item.transactionID, transactionThreadReport === null || transactionThreadReport === void 0 ? void 0 : transactionThreadReport.reportID);
    }
    if (shouldNavigate) {
        Navigation_1.default.navigate(ROUTES_1.default.SEARCH_REPORT.getRoute({ reportID: transactionThreadReport === null || transactionThreadReport === void 0 ? void 0 : transactionThreadReport.reportID, backTo: backTo }));
    }
}
/**
 * @private
 * Organizes data into List Sections for display, for the ReportActionListItemType of Search Results.
 *
 * Do not use directly, use only via `getSections()` facade.
 */
function getReportActionsSections(data) {
    var _a, _b, _c, _d, _e, _f, _g;
    var reportActionItems = [];
    var transactions = Object.keys(data)
        .filter(isTransactionEntry)
        .map(function (key) { return data[key]; });
    var reports = Object.keys(data)
        .filter(isReportEntry)
        .map(function (key) { return data[key]; });
    var policies = Object.keys(data)
        .filter(isPolicyEntry)
        .map(function (key) { return data[key]; });
    for (var key in data) {
        if (isReportActionEntry(key)) {
            var reportActions = data[key];
            for (var _i = 0, _h = Object.values(reportActions); _i < _h.length; _i++) {
                var reportAction = _h[_i];
                var from = reportAction.accountID ? ((_b = (_a = data.personalDetailsList) === null || _a === void 0 ? void 0 : _a[reportAction.accountID]) !== null && _b !== void 0 ? _b : emptyPersonalDetails) : emptyPersonalDetails;
                var report = (_c = data["".concat(ONYXKEYS_1.default.COLLECTION.REPORT).concat(reportAction.reportID)]) !== null && _c !== void 0 ? _c : {};
                var policy = (_d = data["".concat(ONYXKEYS_1.default.COLLECTION.POLICY).concat(report.policyID)]) !== null && _d !== void 0 ? _d : {};
                var originalMessage = (0, ReportActionsUtils_1.isMoneyRequestAction)(reportAction) ? (0, ReportActionsUtils_1.getOriginalMessage)(reportAction) : undefined;
                var isSendingMoney = (0, ReportActionsUtils_1.isMoneyRequestAction)(reportAction) && (originalMessage === null || originalMessage === void 0 ? void 0 : originalMessage.type) === CONST_1.default.IOU.REPORT_ACTION_TYPE.PAY && (originalMessage === null || originalMessage === void 0 ? void 0 : originalMessage.IOUDetails);
                var isReportArchived = (0, ReportUtils_1.isArchivedReport)(data["".concat(ONYXKEYS_1.default.COLLECTION.REPORT_NAME_VALUE_PAIRS).concat(report.reportID)]);
                var invoiceReceiverPolicy = ((_e = report === null || report === void 0 ? void 0 : report.invoiceReceiver) === null || _e === void 0 ? void 0 : _e.type) === CONST_1.default.REPORT.INVOICE_RECEIVER_TYPE.BUSINESS ? data["".concat(ONYXKEYS_1.default.COLLECTION.POLICY).concat(report.invoiceReceiver.policyID)] : undefined;
                if (!(0, ReportActionsUtils_1.shouldReportActionBeVisible)(reportAction, reportAction.reportActionID, (0, ReportUtils_1.canUserPerformWriteAction)(report, isReportArchived)) ||
                    (0, ReportActionsUtils_1.isDeletedAction)(reportAction) ||
                    (0, ReportActionsUtils_1.isResolvedActionableWhisper)(reportAction) ||
                    reportAction.actionName === CONST_1.default.REPORT.ACTIONS.TYPE.CLOSED ||
                    (0, ReportActionsUtils_1.isCreatedAction)(reportAction) ||
                    (0, ReportActionsUtils_1.isWhisperActionTargetedToOthers)(reportAction) ||
                    ((0, ReportActionsUtils_1.isMoneyRequestAction)(reportAction) && !!(report === null || report === void 0 ? void 0 : report.isWaitingOnBankAccount) && (originalMessage === null || originalMessage === void 0 ? void 0 : originalMessage.type) === CONST_1.default.IOU.REPORT_ACTION_TYPE.PAY && !isSendingMoney)) {
                    continue;
                }
                reportActionItems.push(__assign(__assign({}, reportAction), { from: from, reportName: (0, ReportUtils_1.getSearchReportName)({ report: report, policy: policy, personalDetails: data.personalDetailsList, transactions: transactions, invoiceReceiverPolicy: invoiceReceiverPolicy, reports: reports, policies: policies, isReportArchived: isReportArchived }), formattedFrom: (_g = (_f = from === null || from === void 0 ? void 0 : from.displayName) !== null && _f !== void 0 ? _f : from === null || from === void 0 ? void 0 : from.login) !== null && _g !== void 0 ? _g : '', date: reportAction.created, keyForList: reportAction.reportActionID }));
            }
        }
    }
    return reportActionItems;
}
/**
 * @private
 * Organizes data into List Sections grouped by report for display, for the TransactionGroupListItemType of Search Results.
 *
 * Do not use directly, use only via `getSections()` facade.
 */
function getReportSections(data, currentSearch, currentAccountID, currentUserEmail, formatPhoneNumber, isActionLoadingSet, reportActions) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r;
    if (reportActions === void 0) { reportActions = {}; }
    var shouldShowMerchant = getShouldShowMerchant(data);
    var doesDataContainAPastYearTransaction = shouldShowYear(data);
    var _s = getWideAmountIndicators(data), shouldShowAmountInWideColumn = _s.shouldShowAmountInWideColumn, shouldShowTaxAmountInWideColumn = _s.shouldShowTaxAmountInWideColumn;
    var reportActionsByTransactionIDMap = createReportActionsByTransactionIDMap(data);
    // Get violations - optimize by using a Map for faster lookups
    var allViolations = getViolations(data);
    var queryJSON = (0, SearchQueryUtils_1.getCurrentSearchQueryJSON)();
    var reportIDToTransactions = {};
    var _t = Object.keys(data).reduce(function (acc, key) {
        if (isReportEntry(key)) {
            acc.reportKeys.push(key);
        }
        else if (isTransactionEntry(key)) {
            acc.transactionKeys.push(key);
        }
        return acc;
    }, { reportKeys: [], transactionKeys: [] }), reportKeys = _t.reportKeys, transactionKeys = _t.transactionKeys;
    var orderedKeys = __spreadArray(__spreadArray([], reportKeys, true), transactionKeys, true);
    var doesDataContainAPastYearReport = shouldShowYear(data, true);
    var _loop_2 = function (key) {
        if (isReportEntry(key) && (data[key].type === CONST_1.default.REPORT.TYPE.IOU || data[key].type === CONST_1.default.REPORT.TYPE.EXPENSE || data[key].type === CONST_1.default.REPORT.TYPE.INVOICE)) {
            var reportItem_1 = __assign({}, data[key]);
            var reportKey = "".concat(ONYXKEYS_1.default.COLLECTION.REPORT).concat(reportItem_1.reportID);
            var transactions = (_b = (_a = reportIDToTransactions[reportKey]) === null || _a === void 0 ? void 0 : _a.transactions) !== null && _b !== void 0 ? _b : [];
            var isIOUReport = reportItem_1.type === CONST_1.default.REPORT.TYPE.IOU;
            var actions = reportActions["".concat(ONYXKEYS_1.default.COLLECTION.REPORT_ACTIONS).concat(reportItem_1.reportID)];
            var shouldShow = true;
            if (queryJSON && (isActionLoadingSet === null || isActionLoadingSet === void 0 ? void 0 : isActionLoadingSet.has("".concat(ONYXKEYS_1.default.COLLECTION.REPORT_METADATA).concat(reportItem_1.reportID)))) {
                if (queryJSON.type === CONST_1.default.SEARCH.DATA_TYPES.EXPENSE) {
                    var status_2 = queryJSON.status;
                    if (Array.isArray(status_2)) {
                        shouldShow = status_2.some(function (expenseStatus) {
                            return isValidExpenseStatus(expenseStatus) ? expenseStatusActionMapping[expenseStatus](reportItem_1) : false;
                        });
                    }
                    else {
                        shouldShow = isValidExpenseStatus(status_2) ? expenseStatusActionMapping[status_2](reportItem_1) : false;
                    }
                }
            }
            if (shouldShow) {
                var reportPendingAction = (_c = reportItem_1 === null || reportItem_1 === void 0 ? void 0 : reportItem_1.pendingAction) !== null && _c !== void 0 ? _c : (_d = reportItem_1 === null || reportItem_1 === void 0 ? void 0 : reportItem_1.pendingFields) === null || _d === void 0 ? void 0 : _d.preview;
                var shouldShowBlankTo = !reportItem_1 || (0, ReportUtils_1.isOpenExpenseReport)(reportItem_1);
                var allActions = getActions(data, allViolations, key, currentSearch, currentAccountID, currentUserEmail, actions);
                var fromDetails = data.personalDetailsList[(_e = reportItem_1.ownerAccountID) !== null && _e !== void 0 ? _e : CONST_1.default.DEFAULT_NUMBER_ID];
                var toDetails = !shouldShowBlankTo && reportItem_1.managerID ? (_f = data.personalDetailsList) === null || _f === void 0 ? void 0 : _f[reportItem_1.managerID] : emptyPersonalDetails;
                var formattedFrom = fromDetails === emptyPersonalDetails ? '' : formatPhoneNumber((0, PersonalDetailsUtils_1.getDisplayNameOrDefault)(fromDetails));
                var formattedTo = shouldShowBlankTo ? '' : formatPhoneNumber((0, PersonalDetailsUtils_1.getDisplayNameOrDefault)(toDetails));
                // eslint-disable-next-line @typescript-eslint/no-deprecated
                var formattedStatus = (0, ReportUtils_1.getReportStatusTranslation)({ stateNum: reportItem_1.stateNum, statusNum: reportItem_1.statusNum, translate: Localize_1.translateLocal });
                reportIDToTransactions[reportKey] = __assign(__assign(__assign(__assign({}, reportItem_1), { action: (_g = allActions.at(0)) !== null && _g !== void 0 ? _g : CONST_1.default.SEARCH.ACTION_TYPES.VIEW, allActions: allActions, keyForList: String(reportItem_1.reportID), groupedBy: CONST_1.default.SEARCH.DATA_TYPES.EXPENSE_REPORT, from: fromDetails, to: toDetails, formattedFrom: formattedFrom, formattedTo: formattedTo, formattedStatus: formattedStatus, transactions: transactions }), (reportPendingAction ? { pendingAction: reportPendingAction } : {})), { shouldShowYear: doesDataContainAPastYearReport });
                if (isIOUReport) {
                    reportIDToTransactions[reportKey].reportName = getIOUReportName(data, reportIDToTransactions[reportKey]);
                }
            }
        }
        else if (isTransactionEntry(key)) {
            var transactionItem = __assign({}, data[key]);
            var reportAction = reportActionsByTransactionIDMap.get(transactionItem.transactionID);
            var reportKey = "".concat(ONYXKEYS_1.default.COLLECTION.REPORT).concat(transactionItem.reportID);
            // eslint-disable-next-line @typescript-eslint/no-deprecated
            var report = data["".concat(ONYXKEYS_1.default.COLLECTION.REPORT).concat(transactionItem.reportID)];
            var policy = data["".concat(ONYXKEYS_1.default.COLLECTION.POLICY).concat(report === null || report === void 0 ? void 0 : report.policyID)];
            var shouldShowBlankTo = !report || (0, ReportUtils_1.isOpenExpenseReport)(report);
            var transactionViolations = getTransactionViolations(allViolations, transactionItem, currentUserEmail);
            var actions = Object.values((_h = reportActions["".concat(ONYXKEYS_1.default.COLLECTION.REPORT_ACTIONS).concat(transactionItem.reportID)]) !== null && _h !== void 0 ? _h : {});
            var from = (reportAction === null || reportAction === void 0 ? void 0 : reportAction.actorAccountID) ? ((_k = (_j = data.personalDetailsList) === null || _j === void 0 ? void 0 : _j[reportAction.actorAccountID]) !== null && _k !== void 0 ? _k : emptyPersonalDetails) : emptyPersonalDetails;
            var to = getToFieldValueForTransaction(transactionItem, report, data.personalDetailsList, reportAction);
            var _u = getTransactionItemCommonFormattedProperties(transactionItem, from, to, policy, formatPhoneNumber, report), formattedFrom = _u.formattedFrom, formattedTo = _u.formattedTo, formattedTotal = _u.formattedTotal, formattedMerchant = _u.formattedMerchant, date = _u.date;
            var allActions = getActions(data, allViolations, key, currentSearch, currentAccountID, currentUserEmail, actions);
            var transaction = __assign(__assign({}, transactionItem), { action: (_l = allActions.at(0)) !== null && _l !== void 0 ? _l : CONST_1.default.SEARCH.ACTION_TYPES.VIEW, allActions: allActions, report: report, reportAction: reportAction, policy: policy, from: from, to: to, formattedFrom: formattedFrom, formattedTo: shouldShowBlankTo ? '' : formattedTo, formattedTotal: formattedTotal, formattedMerchant: formattedMerchant, date: date, shouldShowMerchant: shouldShowMerchant, shouldShowYear: doesDataContainAPastYearTransaction, keyForList: transactionItem.transactionID, violations: transactionViolations, isAmountColumnWide: shouldShowAmountInWideColumn, isTaxAmountColumnWide: shouldShowTaxAmountInWideColumn });
            if ((_m = reportIDToTransactions[reportKey]) === null || _m === void 0 ? void 0 : _m.transactions) {
                reportIDToTransactions[reportKey].transactions.push(transaction);
                reportIDToTransactions[reportKey].from = data.personalDetailsList[(_p = (_o = data === null || data === void 0 ? void 0 : data[reportKey]) === null || _o === void 0 ? void 0 : _o.ownerAccountID) !== null && _p !== void 0 ? _p : CONST_1.default.DEFAULT_NUMBER_ID];
            }
            else if (reportIDToTransactions[reportKey]) {
                reportIDToTransactions[reportKey].transactions = [transaction];
                reportIDToTransactions[reportKey].from = data.personalDetailsList[(_r = (_q = data === null || data === void 0 ? void 0 : data[reportKey]) === null || _q === void 0 ? void 0 : _q.ownerAccountID) !== null && _r !== void 0 ? _r : CONST_1.default.DEFAULT_NUMBER_ID];
            }
        }
    };
    for (var _i = 0, orderedKeys_1 = orderedKeys; _i < orderedKeys_1.length; _i++) {
        var key = orderedKeys_1[_i];
        _loop_2(key);
    }
    return Object.values(reportIDToTransactions);
}
/**
 * @private
 * Organizes data into List Sections grouped by member for display, for the TransactionGroupListItemType of Search Results.
 *
 * Do not use directly, use only via `getSections()` facade.
 */
function getMemberSections(data, queryJSON) {
    var memberSections = {};
    for (var key in data) {
        if (isGroupEntry(key)) {
            var memberGroup = data[key];
            var personalDetails = data.personalDetailsList[memberGroup.accountID];
            var transactionsQueryJSON = void 0;
            if (queryJSON && memberGroup.accountID) {
                var newFlatFilters = queryJSON.flatFilters.filter(function (filter) { return filter.key !== CONST_1.default.SEARCH.SYNTAX_FILTER_KEYS.FROM; });
                newFlatFilters.push({ key: CONST_1.default.SEARCH.SYNTAX_FILTER_KEYS.FROM, filters: [{ operator: CONST_1.default.SEARCH.SYNTAX_OPERATORS.EQUAL_TO, value: memberGroup.accountID }] });
                var newQueryJSON = __assign(__assign({}, queryJSON), { groupBy: undefined, flatFilters: newFlatFilters });
                var newQuery = (0, SearchQueryUtils_1.buildSearchQueryString)(newQueryJSON);
                transactionsQueryJSON = (0, SearchQueryUtils_1.buildSearchQueryJSON)(newQuery);
            }
            memberSections[key] = __assign(__assign({ groupedBy: CONST_1.default.SEARCH.GROUP_BY.FROM, transactions: [], transactionsQueryJSON: transactionsQueryJSON }, personalDetails), memberGroup);
        }
    }
    return Object.values(memberSections);
}
/**
 * @private
 * Organizes data into List Sections grouped by card for display, for the TransactionGroupListItemType of Search Results.
 *
 * Do not use directly, use only via `getSections()` facade.
 */
function getCardSections(data, queryJSON) {
    var cardSections = {};
    for (var key in data) {
        if (isGroupEntry(key)) {
            var cardGroup = data[key];
            var personalDetails = data.personalDetailsList[cardGroup.accountID];
            var transactionsQueryJSON = void 0;
            if (queryJSON && cardGroup.cardID) {
                var newFlatFilters = queryJSON.flatFilters.filter(function (filter) { return filter.key !== CONST_1.default.SEARCH.SYNTAX_FILTER_KEYS.CARD_ID; });
                newFlatFilters.push({ key: CONST_1.default.SEARCH.SYNTAX_FILTER_KEYS.CARD_ID, filters: [{ operator: CONST_1.default.SEARCH.SYNTAX_OPERATORS.EQUAL_TO, value: cardGroup.cardID }] });
                var newQueryJSON = __assign(__assign({}, queryJSON), { groupBy: undefined, flatFilters: newFlatFilters });
                var newQuery = (0, SearchQueryUtils_1.buildSearchQueryString)(newQueryJSON);
                transactionsQueryJSON = (0, SearchQueryUtils_1.buildSearchQueryJSON)(newQuery);
            }
            cardSections[key] = __assign(__assign({ groupedBy: CONST_1.default.SEARCH.GROUP_BY.CARD, transactions: [], transactionsQueryJSON: transactionsQueryJSON }, personalDetails), cardGroup);
        }
    }
    return Object.values(cardSections);
}
/**
 * @private
 * Organizes data into List Sections grouped by card for display, for the TransactionWithdrawalIDGroupListItemType of Search Results.
 *
 * Do not use directly, use only via `getSections()` facade.
 */
function getWithdrawalIDSections(data, queryJSON) {
    var withdrawalIDSections = {};
    for (var key in data) {
        if (isGroupEntry(key)) {
            var withdrawalIDGroup = data[key];
            var transactionsQueryJSON = void 0;
            if (queryJSON && withdrawalIDGroup.entryID) {
                var newFlatFilters = queryJSON.flatFilters.filter(function (filter) { return filter.key !== CONST_1.default.SEARCH.SYNTAX_FILTER_KEYS.WITHDRAWAL_ID; });
                newFlatFilters.push({ key: CONST_1.default.SEARCH.SYNTAX_FILTER_KEYS.WITHDRAWAL_ID, filters: [{ operator: CONST_1.default.SEARCH.SYNTAX_OPERATORS.EQUAL_TO, value: withdrawalIDGroup.entryID }] });
                var newQueryJSON = __assign(__assign({}, queryJSON), { groupBy: undefined, flatFilters: newFlatFilters });
                var newQuery = (0, SearchQueryUtils_1.buildSearchQueryString)(newQueryJSON);
                transactionsQueryJSON = (0, SearchQueryUtils_1.buildSearchQueryJSON)(newQuery);
            }
            withdrawalIDSections[key] = __assign({ groupedBy: CONST_1.default.SEARCH.GROUP_BY.WITHDRAWAL_ID, transactions: [], transactionsQueryJSON: transactionsQueryJSON }, withdrawalIDGroup);
        }
    }
    return Object.values(withdrawalIDSections);
}
/**
 * Returns the appropriate list item component based on the type and status of the search data.
 */
function getListItem(type, status, groupBy) {
    if (type === CONST_1.default.SEARCH.DATA_TYPES.CHAT) {
        return ChatListItem_1.default;
    }
    if (type === CONST_1.default.SEARCH.DATA_TYPES.TASK) {
        return TaskListItem_1.default;
    }
    if (type === CONST_1.default.SEARCH.DATA_TYPES.EXPENSE_REPORT) {
        return ExpenseReportListItem_1.default;
    }
    if (groupBy) {
        return TransactionGroupListItem_1.default;
    }
    return TransactionListItem_1.default;
}
/**
 * Organizes data into appropriate list sections for display based on the type of search results.
 */
function getSections(_a) {
    var type = _a.type, data = _a.data, currentAccountID = _a.currentAccountID, currentUserEmail = _a.currentUserEmail, formatPhoneNumber = _a.formatPhoneNumber, groupBy = _a.groupBy, _b = _a.reportActions, reportActions = _b === void 0 ? {} : _b, _c = _a.currentSearch, currentSearch = _c === void 0 ? CONST_1.default.SEARCH.SEARCH_KEYS.EXPENSES : _c, archivedReportsIDList = _a.archivedReportsIDList, queryJSON = _a.queryJSON, isActionLoadingSet = _a.isActionLoadingSet;
    if (type === CONST_1.default.SEARCH.DATA_TYPES.CHAT) {
        return getReportActionsSections(data);
    }
    if (type === CONST_1.default.SEARCH.DATA_TYPES.TASK) {
        return getTaskSections(data, formatPhoneNumber, archivedReportsIDList);
    }
    if (type === CONST_1.default.SEARCH.DATA_TYPES.EXPENSE_REPORT) {
        return getReportSections(data, currentSearch, currentAccountID, currentUserEmail, formatPhoneNumber, isActionLoadingSet, reportActions);
    }
    if (groupBy) {
        // Disabling the default-case lint rule here is actually safer as this forces us to make the switch cases exhaustive
        // eslint-disable-next-line default-case
        switch (groupBy) {
            case CONST_1.default.SEARCH.GROUP_BY.FROM:
                return getMemberSections(data, queryJSON);
            case CONST_1.default.SEARCH.GROUP_BY.CARD:
                return getCardSections(data, queryJSON);
            case CONST_1.default.SEARCH.GROUP_BY.WITHDRAWAL_ID:
                return getWithdrawalIDSections(data, queryJSON);
        }
    }
    return getTransactionsSections(data, currentSearch, currentAccountID, currentUserEmail, formatPhoneNumber);
}
/**
 * Sorts sections of data based on a specified column and sort order for displaying sorted results.
 */
function getSortedSections(type, status, data, localeCompare, sortBy, sortOrder, groupBy) {
    if (type === CONST_1.default.SEARCH.DATA_TYPES.CHAT) {
        return getSortedReportActionData(data, localeCompare);
    }
    if (type === CONST_1.default.SEARCH.DATA_TYPES.TASK) {
        return getSortedTaskData(data, localeCompare, sortBy, sortOrder);
    }
    if (type === CONST_1.default.SEARCH.DATA_TYPES.EXPENSE_REPORT) {
        return getSortedReportData(data, localeCompare, sortBy, sortOrder);
    }
    if (groupBy) {
        // Disabling the default-case lint rule here is actually safer as this forces us to make the switch cases exhaustive
        // eslint-disable-next-line default-case
        switch (groupBy) {
            case CONST_1.default.SEARCH.GROUP_BY.FROM:
                return getSortedMemberData(data, localeCompare);
            case CONST_1.default.SEARCH.GROUP_BY.CARD:
                return getSortedCardData(data, localeCompare);
            case CONST_1.default.SEARCH.GROUP_BY.WITHDRAWAL_ID:
                return getSortedWithdrawalIDData(data, localeCompare);
        }
    }
    return getSortedTransactionData(data, localeCompare, sortBy, sortOrder);
}
/**
 * Compares two values based on a specified sorting order and column.
 * Handles both string and numeric comparisons.
 */
function compareValues(a, b, sortOrder, sortBy, localeCompare, shouldCompareOriginalValue) {
    if (shouldCompareOriginalValue === void 0) { shouldCompareOriginalValue = false; }
    var isAsc = sortOrder === CONST_1.default.SEARCH.SORT_ORDER.ASC;
    if (a === undefined || b === undefined) {
        return 0;
    }
    if (typeof a === 'string' && typeof b === 'string') {
        return isAsc ? localeCompare(a, b) : localeCompare(b, a);
    }
    if (typeof a === 'number' && typeof b === 'number') {
        var aValue = sortBy === CONST_1.default.SEARCH.TABLE_COLUMNS.TOTAL_AMOUNT && !shouldCompareOriginalValue ? Math.abs(a) : a;
        var bValue = sortBy === CONST_1.default.SEARCH.TABLE_COLUMNS.TOTAL_AMOUNT && !shouldCompareOriginalValue ? Math.abs(b) : b;
        return isAsc ? aValue - bValue : bValue - aValue;
    }
    return 0;
}
/**
 * @private
 * Sorts transaction sections based on a specified column and sort order.
 */
function getSortedTransactionData(data, localeCompare, sortBy, sortOrder) {
    if (!sortBy || !sortOrder) {
        return data;
    }
    var sortingProperty = transactionColumnNamesToSortingProperty[sortBy];
    if (!sortingProperty) {
        return data;
    }
    return data.sort(function (a, b) {
        var _a, _b;
        var aValue = sortingProperty === 'comment' ? (_a = a.comment) === null || _a === void 0 ? void 0 : _a.comment : a[sortingProperty];
        var bValue = sortingProperty === 'comment' ? (_b = b.comment) === null || _b === void 0 ? void 0 : _b.comment : b[sortingProperty];
        return compareValues(aValue, bValue, sortOrder, sortingProperty, localeCompare);
    });
}
function getSortedTaskData(data, localeCompare, sortBy, sortOrder) {
    if (!sortBy || !sortOrder) {
        return data;
    }
    var sortingProperty = taskColumnNamesToSortingProperty[sortBy];
    if (!sortingProperty) {
        return data;
    }
    return data.sort(function (a, b) {
        var aValue = a[sortingProperty];
        var bValue = b[sortingProperty];
        return compareValues(aValue, bValue, sortOrder, sortingProperty, localeCompare);
    });
}
/**
 * @private
 * Sorts report sections based on a specified column and sort order.
 */
function getSortedReportData(data, localeCompare, sortBy, sortOrder) {
    for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
        var report = data_1[_i];
        report.transactions = getSortedTransactionData(report.transactions, localeCompare, CONST_1.default.SEARCH.TABLE_COLUMNS.DATE, CONST_1.default.SEARCH.SORT_ORDER.DESC);
    }
    if (!sortBy || !sortOrder) {
        return data.sort(function (a, b) {
            if (!a.created || !b.created) {
                return 0;
            }
            return localeCompare(b.created.toLowerCase(), a.created.toLowerCase());
        });
    }
    var sortingProperty = expenseReportColumnNamesToSortingProperty[sortBy];
    if (!sortingProperty) {
        return data;
    }
    return data.sort(function (a, b) {
        var aValue = a[sortingProperty];
        var bValue = b[sortingProperty];
        // When sorting by total, apply the backend logic:
        // IOU reports have positive amounts, expense reports have negative amounts
        if (sortingProperty === 'total' && typeof aValue === 'number' && typeof bValue === 'number') {
            aValue = a.type === CONST_1.default.REPORT.TYPE.IOU ? aValue : -aValue;
            bValue = b.type === CONST_1.default.REPORT.TYPE.IOU ? bValue : -bValue;
        }
        return compareValues(aValue, bValue, sortOrder, sortingProperty, localeCompare);
    });
}
/**
 * @private
 * Sorts member sections based on a specified column and sort order.
 */
function getSortedMemberData(data, localeCompare) {
    return data.sort(function (a, b) { var _a, _b, _c, _d; return localeCompare((_b = (_a = a.displayName) !== null && _a !== void 0 ? _a : a.login) !== null && _b !== void 0 ? _b : '', (_d = (_c = b.displayName) !== null && _c !== void 0 ? _c : b.login) !== null && _d !== void 0 ? _d : ''); });
}
/**
 * @private
 * Sorts card sections based on a specified column and sort order.
 */
function getSortedCardData(data, localeCompare) {
    return data.sort(function (a, b) { var _a, _b, _c, _d; return localeCompare((_b = (_a = a.displayName) !== null && _a !== void 0 ? _a : a.login) !== null && _b !== void 0 ? _b : '', (_d = (_c = b.displayName) !== null && _c !== void 0 ? _c : b.login) !== null && _d !== void 0 ? _d : ''); });
}
/**
 * @private
 * Sorts withdrawal ID sections based on a specified column and sort order.
 */
function getSortedWithdrawalIDData(data, localeCompare) {
    return data.sort(function (a, b) { return localeCompare(b.debitPosted, a.debitPosted); });
}
/**
 * @private
 * Sorts report actions sections based on a specified column and sort order.
 */
function getSortedReportActionData(data, localeCompare) {
    return data.sort(function (a, b) {
        var aValue = a === null || a === void 0 ? void 0 : a.created;
        var bValue = b === null || b === void 0 ? void 0 : b.created;
        if (aValue === undefined || bValue === undefined) {
            return 0;
        }
        return localeCompare(bValue.toLowerCase(), aValue.toLowerCase());
    });
}
/**
 * Checks if the search results contain any data, useful for determining if the search results are empty.
 */
function isSearchResultsEmpty(searchResults, groupBy) {
    if (groupBy) {
        return !Object.keys(searchResults === null || searchResults === void 0 ? void 0 : searchResults.data).some(function (key) { return isGroupEntry(key); });
    }
    return !Object.keys(searchResults === null || searchResults === void 0 ? void 0 : searchResults.data).some(function (key) {
        var _a;
        return key.startsWith(ONYXKEYS_1.default.COLLECTION.TRANSACTION) &&
            ((_a = searchResults === null || searchResults === void 0 ? void 0 : searchResults.data[key]) === null || _a === void 0 ? void 0 : _a.pendingAction) !== CONST_1.default.RED_BRICK_ROAD_PENDING_ACTION.DELETE;
    });
}
/**
 * Returns the corresponding translation key for expense type
 */
function getExpenseTypeTranslationKey(expenseType) {
    // eslint-disable-next-line default-case
    switch (expenseType) {
        case CONST_1.default.SEARCH.TRANSACTION_TYPE.DISTANCE:
            return 'common.distance';
        case CONST_1.default.SEARCH.TRANSACTION_TYPE.CARD:
            return 'common.card';
        case CONST_1.default.SEARCH.TRANSACTION_TYPE.CASH:
            return 'iou.cash';
        case CONST_1.default.SEARCH.TRANSACTION_TYPE.PER_DIEM:
            return 'common.perDiem';
    }
}
/**
 * Constructs and configures the overflow menu for search items, handling interactions such as renaming or deleting items.
 */
function getOverflowMenu(itemName, hash, inputQuery, showDeleteModal, isMobileMenu, closeMenu) {
    return [
        {
            // eslint-disable-next-line @typescript-eslint/no-deprecated
            text: (0, Localize_1.translateLocal)('common.rename'),
            onSelected: function () {
                if (isMobileMenu && closeMenu) {
                    closeMenu();
                }
                Navigation_1.default.navigate(ROUTES_1.default.SEARCH_SAVED_SEARCH_RENAME.getRoute({ name: encodeURIComponent(itemName), jsonQuery: inputQuery }));
            },
            icon: Expensicons.Pencil,
            shouldShowRightIcon: false,
            shouldShowRightComponent: false,
            shouldCallAfterModalHide: true,
        },
        {
            // eslint-disable-next-line @typescript-eslint/no-deprecated
            text: (0, Localize_1.translateLocal)('common.delete'),
            onSelected: function () {
                if (isMobileMenu && closeMenu) {
                    closeMenu();
                }
                showDeleteModal(hash);
            },
            icon: Expensicons.Trashcan,
            shouldShowRightIcon: false,
            shouldShowRightComponent: false,
            shouldCallAfterModalHide: true,
            shouldCloseAllModals: true,
        },
    ];
}
/**
 * Checks if the passed username is a correct standard username, and not a placeholder
 */
function isCorrectSearchUserName(displayName) {
    return displayName && displayName.toUpperCase() !== CONST_1.default.REPORT.OWNER_EMAIL_FAKE;
}
// eslint-disable-next-line @typescript-eslint/max-params
function createTypeMenuSections(currentUserEmail, currentUserAccountID, cardFeedsByPolicy, defaultCardFeed, policies, activePolicyID, savedSearches, isOffline, defaultExpensifyCard, isASAPSubmitBetaEnabled, hasViolations, createReportWithConfirmation) {
    var typeMenuSections = [];
    var suggestedSearches = getSuggestedSearches(currentUserAccountID, defaultCardFeed === null || defaultCardFeed === void 0 ? void 0 : defaultCardFeed.id);
    var suggestedSearchesVisibility = getSuggestedSearchesVisibility(currentUserEmail, cardFeedsByPolicy, policies, defaultExpensifyCard);
    // Todo section
    {
        var todoSection = {
            translationPath: 'common.todo',
            menuItems: [],
        };
        if (suggestedSearchesVisibility[CONST_1.default.SEARCH.SEARCH_KEYS.SUBMIT]) {
            var groupPoliciesWithChatEnabled_1 = (0, PolicyUtils_1.getGroupPaidPoliciesWithExpenseChatEnabled)(policies);
            todoSection.menuItems.push(__assign(__assign({}, suggestedSearches[CONST_1.default.SEARCH.SEARCH_KEYS.SUBMIT]), { emptyState: {
                    headerMedia: LottieAnimations_1.default.Fireworks,
                    title: 'search.searchResults.emptySubmitResults.title',
                    subtitle: 'search.searchResults.emptySubmitResults.subtitle',
                    buttons: groupPoliciesWithChatEnabled_1.length > 0
                        ? [
                            {
                                success: true,
                                buttonText: 'report.newReport.createReport',
                                buttonAction: function () {
                                    (0, interceptAnonymousUser_1.default)(function () {
                                        var _a, _b, _c, _d, _e, _f;
                                        var activePolicy = policies === null || policies === void 0 ? void 0 : policies["".concat(ONYXKEYS_1.default.COLLECTION.POLICY).concat(activePolicyID)];
                                        var personalDetails = (0, ReportUtils_1.getPersonalDetailsForAccountID)(currentUserAccountID);
                                        var workspaceIDForReportCreation;
                                        // If the user's default workspace is a paid group workspace with chat enabled, we create a report with it by default
                                        if (activePolicy && activePolicy.isPolicyExpenseChatEnabled && (0, PolicyUtils_1.isPaidGroupPolicy)(activePolicy)) {
                                            workspaceIDForReportCreation = activePolicy.id;
                                        }
                                        else if (groupPoliciesWithChatEnabled_1.length === 1) {
                                            workspaceIDForReportCreation = (_a = groupPoliciesWithChatEnabled_1.at(0)) === null || _a === void 0 ? void 0 : _a.id;
                                        }
                                        if (workspaceIDForReportCreation && !(0, SubscriptionUtils_1.shouldRestrictUserBillableActions)(workspaceIDForReportCreation) && personalDetails) {
                                            var policyForCreation = (_b = policies === null || policies === void 0 ? void 0 : policies["".concat(ONYXKEYS_1.default.COLLECTION.POLICY).concat(workspaceIDForReportCreation)]) !== null && _b !== void 0 ? _b : groupPoliciesWithChatEnabled_1.find(function (policy) { return (policy === null || policy === void 0 ? void 0 : policy.id) === workspaceIDForReportCreation; });
                                            var policyName = (_f = (_d = (_c = policyForCreation === null || policyForCreation === void 0 ? void 0 : policyForCreation.name) !== null && _c !== void 0 ? _c : activePolicy === null || activePolicy === void 0 ? void 0 : activePolicy.name) !== null && _d !== void 0 ? _d : (_e = groupPoliciesWithChatEnabled_1.at(0)) === null || _e === void 0 ? void 0 : _e.name) !== null && _f !== void 0 ? _f : '';
                                            if (createReportWithConfirmation) {
                                                createReportWithConfirmation({
                                                    policyID: workspaceIDForReportCreation,
                                                    policyName: policyName,
                                                    personalDetails: personalDetails,
                                                    onSuccess: function (createdReportID) {
                                                        Navigation_1.default.setNavigationActionToMicrotaskQueue(function () {
                                                            Navigation_1.default.navigate(ROUTES_1.default.SEARCH_MONEY_REQUEST_REPORT.getRoute({ reportID: createdReportID, backTo: Navigation_1.default.getActiveRoute() }));
                                                        });
                                                    },
                                                });
                                            }
                                            else {
                                                var createdReportID_1 = (0, Report_1.createNewReport)(personalDetails, isASAPSubmitBetaEnabled, hasViolations, workspaceIDForReportCreation).reportID;
                                                Navigation_1.default.setNavigationActionToMicrotaskQueue(function () {
                                                    Navigation_1.default.navigate(ROUTES_1.default.SEARCH_MONEY_REQUEST_REPORT.getRoute({ reportID: createdReportID_1, backTo: Navigation_1.default.getActiveRoute() }));
                                                });
                                            }
                                            return;
                                        }
                                        if (workspaceIDForReportCreation &&
                                            (0, SubscriptionUtils_1.shouldRestrictUserBillableActions)(workspaceIDForReportCreation) &&
                                            groupPoliciesWithChatEnabled_1.length === 1) {
                                            Navigation_1.default.navigate(ROUTES_1.default.RESTRICTED_ACTION.getRoute(workspaceIDForReportCreation));
                                            return;
                                        }
                                        // If the user's default workspace is personal and the user has more than one group workspace, which is paid and has chat enabled, or a chosen workspace is past the grace period, we need to redirect them to the workspace selection screen
                                        Navigation_1.default.navigate(ROUTES_1.default.NEW_REPORT_WORKSPACE_SELECTION.getRoute());
                                    });
                                },
                            },
                        ]
                        : [],
                } }));
        }
        if (suggestedSearchesVisibility[CONST_1.default.SEARCH.SEARCH_KEYS.APPROVE]) {
            todoSection.menuItems.push(__assign(__assign({}, suggestedSearches[CONST_1.default.SEARCH.SEARCH_KEYS.APPROVE]), { emptyState: {
                    headerMedia: LottieAnimations_1.default.Fireworks,
                    title: 'search.searchResults.emptyApproveResults.title',
                    subtitle: 'search.searchResults.emptyApproveResults.subtitle',
                } }));
        }
        if (suggestedSearchesVisibility[CONST_1.default.SEARCH.SEARCH_KEYS.PAY]) {
            todoSection.menuItems.push(__assign(__assign({}, suggestedSearches[CONST_1.default.SEARCH.SEARCH_KEYS.PAY]), { emptyState: {
                    headerMedia: LottieAnimations_1.default.Fireworks,
                    title: 'search.searchResults.emptyPayResults.title',
                    subtitle: 'search.searchResults.emptyPayResults.subtitle',
                } }));
        }
        if (suggestedSearchesVisibility[CONST_1.default.SEARCH.SEARCH_KEYS.EXPORT]) {
            todoSection.menuItems.push(__assign(__assign({}, suggestedSearches[CONST_1.default.SEARCH.SEARCH_KEYS.EXPORT]), { emptyState: {
                    headerMedia: LottieAnimations_1.default.Fireworks,
                    title: 'search.searchResults.emptyExportResults.title',
                    subtitle: 'search.searchResults.emptyExportResults.subtitle',
                } }));
        }
        if (todoSection.menuItems.length > 0) {
            typeMenuSections.push(todoSection);
        }
    }
    // Accounting section
    {
        var accountingSection = {
            translationPath: 'workspace.common.accounting',
            menuItems: [],
        };
        if (suggestedSearchesVisibility[CONST_1.default.SEARCH.SEARCH_KEYS.STATEMENTS]) {
            accountingSection.menuItems.push(__assign(__assign({}, suggestedSearches[CONST_1.default.SEARCH.SEARCH_KEYS.STATEMENTS]), { emptyState: {
                    headerMedia: LottieAnimations_1.default.Fireworks,
                    title: 'search.searchResults.emptyStatementsResults.title',
                    subtitle: 'search.searchResults.emptyStatementsResults.subtitle',
                } }));
        }
        if (suggestedSearchesVisibility[CONST_1.default.SEARCH.SEARCH_KEYS.UNAPPROVED_CASH]) {
            accountingSection.menuItems.push(__assign(__assign({}, suggestedSearches[CONST_1.default.SEARCH.SEARCH_KEYS.UNAPPROVED_CASH]), { emptyState: {
                    headerMedia: LottieAnimations_1.default.Fireworks,
                    title: 'search.searchResults.emptyUnapprovedResults.title',
                    subtitle: 'search.searchResults.emptyUnapprovedResults.subtitle',
                } }));
        }
        if (suggestedSearchesVisibility[CONST_1.default.SEARCH.SEARCH_KEYS.UNAPPROVED_CARD]) {
            accountingSection.menuItems.push(__assign(__assign({}, suggestedSearches[CONST_1.default.SEARCH.SEARCH_KEYS.UNAPPROVED_CARD]), { emptyState: {
                    headerMedia: LottieAnimations_1.default.Fireworks,
                    title: 'search.searchResults.emptyUnapprovedResults.title',
                    subtitle: 'search.searchResults.emptyUnapprovedResults.subtitle',
                } }));
        }
        if (suggestedSearchesVisibility[CONST_1.default.SEARCH.SEARCH_KEYS.RECONCILIATION]) {
            accountingSection.menuItems.push(__assign(__assign({}, suggestedSearches[CONST_1.default.SEARCH.SEARCH_KEYS.RECONCILIATION]), { emptyState: {
                    headerMedia: LottieAnimations_1.default.Fireworks,
                    title: 'search.searchResults.emptyStatementsResults.title',
                    subtitle: 'search.searchResults.emptyStatementsResults.subtitle',
                } }));
        }
        if (accountingSection.menuItems.length > 0) {
            typeMenuSections.push(accountingSection);
        }
    }
    // Saved section
    {
        var shouldShowSavedSearchesMenuItemTitle = Object.values(savedSearches !== null && savedSearches !== void 0 ? savedSearches : {}).filter(function (s) { return s.pendingAction !== CONST_1.default.RED_BRICK_ROAD_PENDING_ACTION.DELETE || isOffline; }).length > 0;
        if (shouldShowSavedSearchesMenuItemTitle) {
            var savedSection = {
                translationPath: 'search.savedSearchesMenuItemTitle',
                menuItems: [],
            };
            typeMenuSections.push(savedSection);
        }
    }
    // Explore section
    {
        var exploreSection = {
            translationPath: 'common.explore',
            menuItems: [],
        };
        if (suggestedSearchesVisibility[CONST_1.default.SEARCH.SEARCH_KEYS.EXPENSES]) {
            exploreSection.menuItems.push(suggestedSearches[CONST_1.default.SEARCH.SEARCH_KEYS.EXPENSES]);
        }
        if (suggestedSearchesVisibility[CONST_1.default.SEARCH.SEARCH_KEYS.REPORTS]) {
            exploreSection.menuItems.push(suggestedSearches[CONST_1.default.SEARCH.SEARCH_KEYS.REPORTS]);
        }
        if (suggestedSearchesVisibility[CONST_1.default.SEARCH.SEARCH_KEYS.CHATS]) {
            exploreSection.menuItems.push(suggestedSearches[CONST_1.default.SEARCH.SEARCH_KEYS.CHATS]);
        }
        if (exploreSection.menuItems.length > 0) {
            typeMenuSections.push(exploreSection);
        }
    }
    return typeMenuSections;
}
function createBaseSavedSearchMenuItem(item, key, index, title, isFocused) {
    return {
        key: key,
        title: title,
        hash: key,
        query: item.query,
        shouldShowRightComponent: true,
        focused: isFocused,
        pendingAction: item.pendingAction,
        disabled: item.pendingAction === CONST_1.default.RED_BRICK_ROAD_PENDING_ACTION.DELETE,
        shouldIconUseAutoWidthStyle: true,
    };
}
/**
 * Whether to show the empty state or not
 */
function shouldShowEmptyState(isDataLoaded, dataLength, type) {
    return !isDataLoaded || dataLength === 0 || !Object.values(CONST_1.default.SEARCH.DATA_TYPES).includes(type);
}
function isSearchDataLoaded(searchResults, queryJSON) {
    var _a, _b, _c, _d, _e, _f;
    var status = (queryJSON !== null && queryJSON !== void 0 ? queryJSON : {}).status;
    var sortedSearchResultStatus = !Array.isArray((_a = searchResults === null || searchResults === void 0 ? void 0 : searchResults.search) === null || _a === void 0 ? void 0 : _a.status)
        ? (_c = (_b = searchResults === null || searchResults === void 0 ? void 0 : searchResults.search) === null || _b === void 0 ? void 0 : _b.status) === null || _c === void 0 ? void 0 : _c.split(',').sort().join(',')
        : (_e = (_d = searchResults === null || searchResults === void 0 ? void 0 : searchResults.search) === null || _d === void 0 ? void 0 : _d.status) === null || _e === void 0 ? void 0 : _e.sort().join(',');
    var sortedQueryJSONStatus = Array.isArray(status) ? status.sort().join(',') : status;
    var isDataLoaded = (searchResults === null || searchResults === void 0 ? void 0 : searchResults.data) !== undefined && ((_f = searchResults === null || searchResults === void 0 ? void 0 : searchResults.search) === null || _f === void 0 ? void 0 : _f.type) === (queryJSON === null || queryJSON === void 0 ? void 0 : queryJSON.type) && sortedSearchResultStatus === sortedQueryJSONStatus;
    return isDataLoaded;
}
function getStatusOptions(translate, type) {
    switch (type) {
        case CONST_1.default.SEARCH.DATA_TYPES.INVOICE:
            return getInvoiceStatusOptions(translate);
        case CONST_1.default.SEARCH.DATA_TYPES.TRIP:
            return getTripStatusOptions(translate);
        case CONST_1.default.SEARCH.DATA_TYPES.TASK:
            return getTaskStatusOptions(translate);
        case CONST_1.default.SEARCH.DATA_TYPES.EXPENSE_REPORT:
            return getExpenseReportedStatusOptions(translate);
        case CONST_1.default.SEARCH.DATA_TYPES.EXPENSE:
        default:
            return getExpenseStatusOptions(translate);
    }
}
function getHasOptions(type) {
    switch (type) {
        case CONST_1.default.SEARCH.DATA_TYPES.EXPENSE:
            return [
                // eslint-disable-next-line @typescript-eslint/no-deprecated
                { text: (0, Localize_1.translateLocal)('common.receipt'), value: CONST_1.default.SEARCH.HAS_VALUES.RECEIPT },
                // eslint-disable-next-line @typescript-eslint/no-deprecated
                { text: (0, Localize_1.translateLocal)('common.attachment'), value: CONST_1.default.SEARCH.HAS_VALUES.ATTACHMENT },
                // eslint-disable-next-line @typescript-eslint/no-deprecated
                { text: (0, Localize_1.translateLocal)('common.tag'), value: CONST_1.default.SEARCH.HAS_VALUES.TAG },
                // eslint-disable-next-line @typescript-eslint/no-deprecated
                { text: (0, Localize_1.translateLocal)('common.category'), value: CONST_1.default.SEARCH.HAS_VALUES.CATEGORY },
            ];
        case CONST_1.default.SEARCH.DATA_TYPES.CHAT:
            return [
                // eslint-disable-next-line @typescript-eslint/no-deprecated
                { text: (0, Localize_1.translateLocal)('common.link'), value: CONST_1.default.SEARCH.HAS_VALUES.LINK },
                // eslint-disable-next-line @typescript-eslint/no-deprecated
                { text: (0, Localize_1.translateLocal)('common.attachment'), value: CONST_1.default.SEARCH.HAS_VALUES.ATTACHMENT },
            ];
        default:
            return [];
    }
}
function getTypeOptions(policies, currentUserLogin) {
    var typeOptions = [
        // eslint-disable-next-line @typescript-eslint/no-deprecated
        { text: (0, Localize_1.translateLocal)('common.expense'), value: CONST_1.default.SEARCH.DATA_TYPES.EXPENSE },
        // eslint-disable-next-line @typescript-eslint/no-deprecated
        { text: (0, Localize_1.translateLocal)('common.expenseReport'), value: CONST_1.default.SEARCH.DATA_TYPES.EXPENSE_REPORT },
        // eslint-disable-next-line @typescript-eslint/no-deprecated
        { text: (0, Localize_1.translateLocal)('common.chat'), value: CONST_1.default.SEARCH.DATA_TYPES.CHAT },
        // eslint-disable-next-line @typescript-eslint/no-deprecated
        { text: (0, Localize_1.translateLocal)('common.invoice'), value: CONST_1.default.SEARCH.DATA_TYPES.INVOICE },
        // eslint-disable-next-line @typescript-eslint/no-deprecated
        { text: (0, Localize_1.translateLocal)('common.trip'), value: CONST_1.default.SEARCH.DATA_TYPES.TRIP },
        // eslint-disable-next-line @typescript-eslint/no-deprecated
        { text: (0, Localize_1.translateLocal)('common.task'), value: CONST_1.default.SEARCH.DATA_TYPES.TASK },
    ];
    var shouldHideInvoiceOption = !(0, PolicyUtils_1.canSendInvoice)(policies, currentUserLogin) && !(0, ReportUtils_1.hasInvoiceReports)();
    // Remove the invoice option if the user is not allowed to send invoices
    return shouldHideInvoiceOption ? typeOptions.filter(function (typeOption) { return typeOption.value !== CONST_1.default.SEARCH.DATA_TYPES.INVOICE; }) : typeOptions;
}
function getGroupByOptions() {
    // eslint-disable-next-line @typescript-eslint/no-deprecated
    return Object.values(CONST_1.default.SEARCH.GROUP_BY).map(function (value) { return ({ text: (0, Localize_1.translateLocal)("search.filters.groupBy.".concat(value)), value: value }); });
}
function getGroupCurrencyOptions(currencyList) {
    return Object.keys(currencyList).reduce(function (options, currencyCode) {
        var _a;
        if (!((_a = currencyList === null || currencyList === void 0 ? void 0 : currencyList[currencyCode]) === null || _a === void 0 ? void 0 : _a.retired)) {
            options.push({ text: "".concat(currencyCode, " - ").concat((0, CurrencyUtils_1.getCurrencySymbol)(currencyCode)), value: currencyCode });
        }
        return options;
    }, []);
}
function getFeedOptions(allCardFeeds, allCards) {
    return Object.values((0, CardFeedUtils_1.getCardFeedsForDisplay)(allCardFeeds, allCards)).map(function (cardFeed) { return ({
        text: cardFeed.name,
        value: cardFeed.id,
    }); });
}
function getDatePresets(filterKey, hasFeed) {
    var defaultPresets = [CONST_1.default.SEARCH.DATE_PRESETS.THIS_MONTH, CONST_1.default.SEARCH.DATE_PRESETS.LAST_MONTH, CONST_1.default.SEARCH.DATE_PRESETS.NEVER];
    if (filterKey.startsWith(CONST_1.default.SEARCH.REPORT_FIELD.GLOBAL_PREFIX)) {
        return [CONST_1.default.SEARCH.DATE_PRESETS.THIS_MONTH, CONST_1.default.SEARCH.DATE_PRESETS.LAST_MONTH];
    }
    switch (filterKey) {
        case CONST_1.default.SEARCH.SYNTAX_FILTER_KEYS.POSTED:
            return __spreadArray([CONST_1.default.SEARCH.DATE_PRESETS.THIS_MONTH, CONST_1.default.SEARCH.DATE_PRESETS.LAST_MONTH], (hasFeed ? [CONST_1.default.SEARCH.DATE_PRESETS.LAST_STATEMENT] : []), true);
        case CONST_1.default.SEARCH.SYNTAX_FILTER_KEYS.DATE:
            return [CONST_1.default.SEARCH.DATE_PRESETS.THIS_MONTH, CONST_1.default.SEARCH.DATE_PRESETS.LAST_MONTH];
        default:
            return defaultPresets;
    }
}
function getWithdrawalTypeOptions(translate) {
    return Object.values(CONST_1.default.SEARCH.WITHDRAWAL_TYPE).map(function (value) { return ({ text: translate("search.filters.withdrawalType.".concat(value)), value: value }); });
}
function getActionOptions(translate) {
    return Object.values(CONST_1.default.SEARCH.ACTION_FILTERS).map(function (value) { return ({ text: translate("search.filters.action.".concat(value)), value: value }); });
}
/**
 * Determines what columns to show based on available data
 * @param isExpenseReportView: true when we are inside an expense report view, false if we're in the Reports page.
 */
function getColumnsToShow(currentAccountID, data, isExpenseReportView, type) {
    var _a, _b, _c, _d;
    if (isExpenseReportView === void 0) { isExpenseReportView = false; }
    if (type === CONST_1.default.SEARCH.DATA_TYPES.EXPENSE_REPORT) {
        return _a = {},
            _a[CONST_1.default.SEARCH.TABLE_COLUMNS.AVATAR] = true,
            _a[CONST_1.default.SEARCH.TABLE_COLUMNS.DATE] = true,
            _a[CONST_1.default.SEARCH.TABLE_COLUMNS.STATUS] = true,
            _a[CONST_1.default.SEARCH.TABLE_COLUMNS.TITLE] = true,
            _a[CONST_1.default.SEARCH.TABLE_COLUMNS.FROM] = true,
            _a[CONST_1.default.SEARCH.TABLE_COLUMNS.TO] = true,
            _a[CONST_1.default.SEARCH.TABLE_COLUMNS.TOTAL] = true,
            _a[CONST_1.default.SEARCH.TABLE_COLUMNS.ACTION] = true,
            _a;
    }
    if (type === CONST_1.default.SEARCH.DATA_TYPES.TASK) {
        return _b = {},
            _b[CONST_1.default.SEARCH.TABLE_COLUMNS.DATE] = true,
            _b[CONST_1.default.SEARCH.TABLE_COLUMNS.TITLE] = true,
            _b[CONST_1.default.SEARCH.TABLE_COLUMNS.DESCRIPTION] = true,
            _b[CONST_1.default.SEARCH.TABLE_COLUMNS.FROM] = true,
            _b[CONST_1.default.SEARCH.TABLE_COLUMNS.IN] = true,
            _b[CONST_1.default.SEARCH.TABLE_COLUMNS.ASSIGNEE] = true,
            _b[CONST_1.default.SEARCH.TABLE_COLUMNS.ACTION] = true,
            _b[CONST_1.default.SEARCH.TABLE_COLUMNS.RECEIPT] = false,
            _b[CONST_1.default.SEARCH.TABLE_COLUMNS.MERCHANT] = false,
            _b[CONST_1.default.SEARCH.TABLE_COLUMNS.TO] = false,
            _b[CONST_1.default.SEARCH.TABLE_COLUMNS.CATEGORY] = false,
            _b[CONST_1.default.SEARCH.TABLE_COLUMNS.TAG] = false,
            _b[CONST_1.default.SEARCH.TABLE_COLUMNS.TAX_AMOUNT] = false,
            _b[CONST_1.default.SEARCH.TABLE_COLUMNS.TOTAL_AMOUNT] = false,
            _b[CONST_1.default.SEARCH.TABLE_COLUMNS.COMMENTS] = false,
            _b[CONST_1.default.SEARCH.TABLE_COLUMNS.TYPE] = false,
            _b[CONST_1.default.SEARCH.TABLE_COLUMNS.CARD] = false,
            _b[CONST_1.default.SEARCH.TABLE_COLUMNS.WITHDRAWAL_ID] = false,
            _b;
    }
    var columns = isExpenseReportView
        ? (_c = {},
            _c[CONST_1.default.REPORT.TRANSACTION_LIST.COLUMNS.RECEIPT] = true,
            _c[CONST_1.default.REPORT.TRANSACTION_LIST.COLUMNS.TYPE] = true,
            _c[CONST_1.default.REPORT.TRANSACTION_LIST.COLUMNS.DATE] = true,
            _c[CONST_1.default.REPORT.TRANSACTION_LIST.COLUMNS.MERCHANT] = false,
            _c[CONST_1.default.REPORT.TRANSACTION_LIST.COLUMNS.DESCRIPTION] = false,
            _c[CONST_1.default.REPORT.TRANSACTION_LIST.COLUMNS.CATEGORY] = false,
            _c[CONST_1.default.REPORT.TRANSACTION_LIST.COLUMNS.TAG] = false,
            _c[CONST_1.default.REPORT.TRANSACTION_LIST.COLUMNS.COMMENTS] = true,
            _c[CONST_1.default.REPORT.TRANSACTION_LIST.COLUMNS.TOTAL_AMOUNT] = true,
            _c) : (_d = {},
        _d[CONST_1.default.SEARCH.TABLE_COLUMNS.RECEIPT] = true,
        _d[CONST_1.default.SEARCH.TABLE_COLUMNS.TYPE] = true,
        _d[CONST_1.default.SEARCH.TABLE_COLUMNS.DATE] = true,
        _d[CONST_1.default.SEARCH.TABLE_COLUMNS.MERCHANT] = false,
        _d[CONST_1.default.SEARCH.TABLE_COLUMNS.DESCRIPTION] = false,
        _d[CONST_1.default.SEARCH.TABLE_COLUMNS.FROM] = false,
        _d[CONST_1.default.SEARCH.TABLE_COLUMNS.TO] = false,
        _d[CONST_1.default.SEARCH.TABLE_COLUMNS.CATEGORY] = false,
        _d[CONST_1.default.SEARCH.TABLE_COLUMNS.TAG] = false,
        _d[CONST_1.default.SEARCH.TABLE_COLUMNS.TAX_AMOUNT] = false,
        _d[CONST_1.default.SEARCH.TABLE_COLUMNS.TOTAL_AMOUNT] = true,
        _d[CONST_1.default.SEARCH.TABLE_COLUMNS.ACTION] = true,
        _d[CONST_1.default.SEARCH.TABLE_COLUMNS.TITLE] = true,
        _d);
    var reportActionsByTransactionIDMap = Array.isArray(data) ? undefined : createReportActionsByTransactionIDMap(data);
    var updateColumns = function (transaction) {
        var _a;
        var merchant = transaction.modifiedMerchant ? transaction.modifiedMerchant : ((_a = transaction.merchant) !== null && _a !== void 0 ? _a : '');
        if ((merchant !== '' && merchant !== CONST_1.default.TRANSACTION.PARTIAL_TRANSACTION_MERCHANT) || (0, TransactionUtils_1.isScanning)(transaction)) {
            columns[CONST_1.default.REPORT.TRANSACTION_LIST.COLUMNS.MERCHANT] = true;
        }
        if ((0, TransactionUtils_1.getDescription)(transaction) !== '') {
            columns[CONST_1.default.REPORT.TRANSACTION_LIST.COLUMNS.DESCRIPTION] = true;
        }
        var category = (0, TransactionUtils_1.getCategory)(transaction);
        var categoryEmptyValues = CONST_1.default.SEARCH.CATEGORY_EMPTY_VALUE.split(',');
        if (category !== '' && !categoryEmptyValues.includes(category)) {
            columns[CONST_1.default.REPORT.TRANSACTION_LIST.COLUMNS.CATEGORY] = true;
        }
        var tag = (0, TransactionUtils_1.getTag)(transaction);
        if (tag !== '' && tag !== CONST_1.default.SEARCH.TAG_EMPTY_VALUE) {
            columns[CONST_1.default.REPORT.TRANSACTION_LIST.COLUMNS.TAG] = true;
        }
        if (isExpenseReportView) {
            return;
        }
        // The From/To columns display logic depends on the passed report/reportAction i.e. if data is SearchResults and not an array (Transaction[])
        if (!Array.isArray(data)) {
            // eslint-disable-next-line @typescript-eslint/no-deprecated
            var report = data["".concat(ONYXKEYS_1.default.COLLECTION.REPORT).concat(transaction.reportID)];
            var reportAction = reportActionsByTransactionIDMap === null || reportActionsByTransactionIDMap === void 0 ? void 0 : reportActionsByTransactionIDMap.get(transaction.transactionID);
            // Handle From&To columns that are only shown in the Reports page
            // if From or To differ from current user in any transaction, show the columns
            var accountID = reportAction === null || reportAction === void 0 ? void 0 : reportAction.actorAccountID;
            if (accountID && accountID !== currentAccountID) {
                columns[CONST_1.default.REPORT.TRANSACTION_LIST.COLUMNS.FROM] = true;
            }
            var toFieldValue = getToFieldValueForTransaction(transaction, report, data.personalDetailsList, reportAction);
            if (toFieldValue.accountID && toFieldValue.accountID !== currentAccountID && !columns[CONST_1.default.REPORT.TRANSACTION_LIST.COLUMNS.TO]) {
                columns[CONST_1.default.REPORT.TRANSACTION_LIST.COLUMNS.TO] = !!report && !(0, ReportUtils_1.isOpenReport)(report);
            }
        }
    };
    if (Array.isArray(data)) {
        data.forEach(updateColumns);
    }
    else {
        Object.keys(data).forEach(function (key) {
            if (!isTransactionEntry(key)) {
                return;
            }
            updateColumns(data[key]);
        });
    }
    return columns;
}
