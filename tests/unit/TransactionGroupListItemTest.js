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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var NativeNavigation = require("@react-navigation/native");
var react_native_1 = require("@testing-library/react-native");
var react_1 = require("react");
var react_native_onyx_1 = require("react-native-onyx");
var ComposeProviders_1 = require("@components/ComposeProviders");
var LocaleContextProvider_1 = require("@components/LocaleContextProvider");
var OnyxListItemProvider_1 = require("@components/OnyxListItemProvider");
var ScreenWrapper_1 = require("@components/ScreenWrapper");
var SearchContext_1 = require("@components/Search/SearchContext");
var TransactionGroupListItem_1 = require("@src/components/SelectionListWithSections/Search/TransactionGroupListItem");
var CONST_1 = require("@src/CONST");
var ONYXKEYS_1 = require("@src/ONYXKEYS");
var waitForBatchedUpdatesWithAct_1 = require("../utils/waitForBatchedUpdatesWithAct");
jest.mock('@libs/actions/Search', function () { return ({
    search: jest.fn(),
    handleActionButtonPress: jest.fn(),
}); });
jest.mock('@libs/SearchUIUtils', function () { return ({
    getSections: jest.fn(function () { return []; }),
    isCorrectSearchUserName: jest.fn(function () { return true; }),
}); });
var mockTransaction = {
    accountID: 1,
    amount: 0,
    canDelete: true,
    canHold: true,
    canUnhold: false,
    category: '',
    convertedAmount: 1284,
    convertedCurrency: 'USD',
    created: '2025-09-19',
    currency: 'USD',
    policy: {
        id: '06F34677820A4D07',
        type: 'team',
        role: 'admin',
        owner: 'test@test.com',
        name: 'Policy',
        outputCurrency: 'USD',
        isPolicyExpenseChatEnabled: true,
    },
    reportAction: {
        reportActionID: '2454187434077044186',
        actionName: 'IOU',
        created: '2025-09-19',
    },
    merchant: '(none)',
    modifiedAmount: -1284,
    modifiedCreated: '2025-09-07',
    modifiedCurrency: 'USD',
    modifiedMerchant: 'The Home Depot',
    policyID: '06F34677820A4D07',
    reportID: '515146912679679',
    tag: '',
    transactionID: '1',
    transactionThreadReportID: '2925191332104975',
    transactionType: 'cash',
    action: 'approve',
    allActions: ['approve'],
    formattedFrom: 'Main Applause QA',
    formattedTo: 'Main Applause QA',
    formattedTotal: -1284,
    formattedMerchant: 'The Home Depot',
    date: '2025-09-07',
    shouldShowMerchant: true,
    shouldShowYear: true,
    keyForList: '1',
    isAmountColumnWide: false,
    isTaxAmountColumnWide: false,
    shouldAnimateInHighlight: false,
    report: {
        reportID: '515146912679679',
    },
    from: {
        accountID: 1,
        avatar: 'https://d2k5nsl2zxldvw.cloudfront.net/images/avatars/default-avatar_15.png',
        displayName: 'Main Applause QA',
    },
    to: {
        accountID: 1,
        avatar: 'https://d2k5nsl2zxldvw.cloudfront.net/images/avatars/default-avatar_15.png',
        displayName: 'Main Applause QA',
    },
};
var mockReport = {
    accountID: 1,
    chatReportID: '4735435600700077',
    chatType: undefined,
    created: '2025-09-19 20:00:47',
    currency: 'USD',
    isOneTransactionReport: true,
    isOwnPolicyExpenseChat: false,
    isWaitingOnBankAccount: false,
    managerID: 1,
    nonReimbursableTotal: 0,
    oldPolicyName: '',
    ownerAccountID: 1,
    parentReportActionID: '2454187434077044186',
    parentReportID: '4735435600700077',
    policyID: '06F34677820A4D07',
    reportID: '515146912679679',
    reportName: 'Expense Report #515146912679679',
    stateNum: 1,
    statusNum: 1,
    total: -1284,
    type: 'expense',
    unheldTotal: -1284,
    from: {
        accountID: 1,
        avatar: 'https://d2k5nsl2zxldvw.cloudfront.net/images/avatars/default-avatar_15.png',
        displayName: 'Main Applause QA',
    },
    to: {
        accountID: 1,
        avatar: 'https://d2k5nsl2zxldvw.cloudfront.net/images/avatars/default-avatar_15.png',
        displayName: 'Main Applause QA',
    },
    shouldShowYear: false,
    action: 'view',
    transactions: [],
    groupedBy: 'expense-report',
    keyForList: '515146912679679',
};
var createFakeTransactions = function (numberOfTransactions) {
    return Array.from({ length: numberOfTransactions }, function (_, index) { return (__assign(__assign({}, mockTransaction), { transactionID: index.toString() })); });
};
var createFakeReport = function (numberOfTransactions) {
    return __assign(__assign({}, mockReport), { transactions: createFakeTransactions(numberOfTransactions) });
};
describe('TransactionGroupListItem', function () {
    beforeAll(function () {
        react_native_onyx_1.default.init({
            keys: ONYXKEYS_1.default,
            evictableKeys: [ONYXKEYS_1.default.COLLECTION.REPORT_ACTIONS],
        });
        jest.spyOn(NativeNavigation, 'useRoute').mockReturnValue({ key: '', name: '' });
    });
    beforeEach(function () {
        jest.clearAllMocks();
        return (0, react_1.act)(function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, react_native_onyx_1.default.clear()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, (0, waitForBatchedUpdatesWithAct_1.default)()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
    });
    var mockOnSelectRow = jest.fn();
    var numberOfTransactions = 21;
    var report = createFakeReport(numberOfTransactions);
    var defaultProps = {
        item: report,
        showTooltip: false,
        onSelectRow: mockOnSelectRow,
        searchType: CONST_1.default.SEARCH.DATA_TYPES.EXPENSE_REPORT,
        canSelectMultiple: true,
    };
    function TestWrapper(_a) {
        var children = _a.children;
        return (<ComposeProviders_1.default components={[OnyxListItemProvider_1.default, LocaleContextProvider_1.LocaleContextProvider]}>
                <ScreenWrapper_1.default testID="test">
                    <SearchContext_1.SearchContextProvider>{children}</SearchContext_1.SearchContextProvider>
                </ScreenWrapper_1.default>
            </ComposeProviders_1.default>);
    }
    var renderTransactionGroupListItem = function () {
        return (0, react_native_1.render)(<TransactionGroupListItem_1.default 
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...defaultProps}/>, { wrapper: TestWrapper });
    };
    var expand = function () { return __awaiter(void 0, void 0, void 0, function () {
        var expandButton;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    expandButton = react_native_1.screen.getByLabelText('Expand');
                    react_native_1.fireEvent.press(expandButton);
                    return [4 /*yield*/, (0, waitForBatchedUpdatesWithAct_1.default)()];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); };
    var collapse = function () { return __awaiter(void 0, void 0, void 0, function () {
        var collapseButton;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    collapseButton = react_native_1.screen.getByLabelText('Collapse');
                    react_native_1.fireEvent.press(collapseButton);
                    return [4 /*yield*/, (0, waitForBatchedUpdatesWithAct_1.default)()];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); };
    var showMore = function () { return __awaiter(void 0, void 0, void 0, function () {
        var showMoreButton;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    showMoreButton = react_native_1.screen.getByText('Show more');
                    react_native_1.fireEvent.press(showMoreButton);
                    return [4 /*yield*/, (0, waitForBatchedUpdatesWithAct_1.default)()];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); };
    var getVisibleTransactionRowsCount = function () { return react_native_1.screen.getAllByTestId('transaction-item-row').length; };
    it('should render TransactionGroupListItem with groupBy reports', function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    renderTransactionGroupListItem();
                    return [4 /*yield*/, (0, waitForBatchedUpdatesWithAct_1.default)()];
                case 1:
                    _a.sent();
                    expect(react_native_1.screen.getByRole(CONST_1.default.ROLE.CHECKBOX)).toBeTruthy();
                    expect(react_native_1.screen.getByRole(CONST_1.default.ROLE.CHECKBOX)).not.toBeChecked();
                    expect(react_native_1.screen.getByTestId('ReportSearchHeader')).toBeTruthy();
                    expect(react_native_1.screen.getByTestId('TotalCell')).toBeTruthy();
                    expect(react_native_1.screen.getByTestId('ActionCell')).toBeTruthy();
                    expect(react_native_1.screen.getByLabelText('Expand')).toBeTruthy();
                    expect(react_native_1.screen.queryByTestId(CONST_1.default.ANIMATED_COLLAPSIBLE_CONTENT_TEST_ID)).toBeNull();
                    return [2 /*return*/];
            }
        });
    }); });
    it("should toggle expansion state with ".concat(CONST_1.default.TRANSACTION.RESULTS_PAGE_SIZE, " items when Expand is triggered"), function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    renderTransactionGroupListItem();
                    return [4 /*yield*/, (0, waitForBatchedUpdatesWithAct_1.default)()];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, expand()];
                case 2:
                    _a.sent();
                    expect(react_native_1.screen.getByLabelText('Collapse')).toBeTruthy();
                    expect(react_native_1.screen.getByTestId(CONST_1.default.ANIMATED_COLLAPSIBLE_CONTENT_TEST_ID)).toBeTruthy();
                    expect(getVisibleTransactionRowsCount()).toBe(CONST_1.default.TRANSACTION.RESULTS_PAGE_SIZE);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should show more transactions and hide button when show more button is triggered and limit of transactions is reached', function () { return __awaiter(void 0, void 0, void 0, function () {
        var showMoreButtonSecond;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    renderTransactionGroupListItem();
                    return [4 /*yield*/, (0, waitForBatchedUpdatesWithAct_1.default)()];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, expand()];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, showMore()];
                case 3:
                    _a.sent();
                    expect(getVisibleTransactionRowsCount()).toBe(numberOfTransactions);
                    showMoreButtonSecond = react_native_1.screen.queryByText('Show more');
                    expect(showMoreButtonSecond).toBeNull();
                    return [2 /*return*/];
            }
        });
    }); });
    it('should collapse the list when Collapse is triggered', function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    renderTransactionGroupListItem();
                    return [4 /*yield*/, (0, waitForBatchedUpdatesWithAct_1.default)()];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, expand()];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, collapse()];
                case 3:
                    _a.sent();
                    expect(react_native_1.screen.getByLabelText('Expand')).toBeTruthy();
                    return [2 /*return*/];
            }
        });
    }); });
    it("should show only ".concat(CONST_1.default.TRANSACTION.RESULTS_PAGE_SIZE, " transactions when collapsed and expanded again"), function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    renderTransactionGroupListItem();
                    return [4 /*yield*/, (0, waitForBatchedUpdatesWithAct_1.default)()];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, expand()];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, showMore()];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, collapse()];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, expand()];
                case 5:
                    _a.sent();
                    expect(getVisibleTransactionRowsCount()).toBe(CONST_1.default.TRANSACTION.RESULTS_PAGE_SIZE);
                    expect(react_native_1.screen.getByText('Show more')).toBeTruthy();
                    return [2 /*return*/];
            }
        });
    }); });
    it('should pass onDEWModalOpen callback to ReportListItemHeader for SUBMIT action', function () { return __awaiter(void 0, void 0, void 0, function () {
        var mockOnDEWModalOpen, reportWithSubmitAction, propsWithDEWCallback;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    mockOnDEWModalOpen = jest.fn();
                    reportWithSubmitAction = __assign(__assign({}, report), { action: 'submit', hash: 0 });
                    propsWithDEWCallback = __assign(__assign({}, defaultProps), { item: reportWithSubmitAction, onDEWModalOpen: mockOnDEWModalOpen });
                    (0, react_native_1.render)(<TransactionGroupListItem_1.default 
                    // eslint-disable-next-line react/jsx-props-no-spreading
                    {...propsWithDEWCallback}/>, { wrapper: TestWrapper });
                    return [4 /*yield*/, (0, waitForBatchedUpdatesWithAct_1.default)()];
                case 1:
                    _a.sent();
                    // Verify that the component renders with the callback prop
                    expect(react_native_1.screen.getByTestId('ReportSearchHeader')).toBeTruthy();
                    return [2 /*return*/];
            }
        });
    }); });
    it('should pass onDEWModalOpen callback to ReportListItemHeader for APPROVE action', function () { return __awaiter(void 0, void 0, void 0, function () {
        var mockOnDEWModalOpen, reportWithApproveAction, propsWithDEWCallback;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    mockOnDEWModalOpen = jest.fn();
                    reportWithApproveAction = __assign(__assign({}, report), { action: 'approve', hash: 0 });
                    propsWithDEWCallback = __assign(__assign({}, defaultProps), { item: reportWithApproveAction, onDEWModalOpen: mockOnDEWModalOpen });
                    (0, react_native_1.render)(<TransactionGroupListItem_1.default 
                    // eslint-disable-next-line react/jsx-props-no-spreading
                    {...propsWithDEWCallback}/>, { wrapper: TestWrapper });
                    return [4 /*yield*/, (0, waitForBatchedUpdatesWithAct_1.default)()];
                case 1:
                    _a.sent();
                    // Verify that the component renders with the callback prop
                    expect(react_native_1.screen.getByTestId('ReportSearchHeader')).toBeTruthy();
                    return [2 /*return*/];
            }
        });
    }); });
});
