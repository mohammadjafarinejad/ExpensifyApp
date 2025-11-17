"use strict";
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
var react_1 = require("react");
var react_native_1 = require("react-native");
var Button_1 = require("@components/Button");
var EmptyStateComponent_1 = require("@components/EmptyStateComponent");
var FormHelpMessage_1 = require("@components/FormHelpMessage");
var HeaderWithBackButton_1 = require("@components/HeaderWithBackButton");
var LottieAnimations_1 = require("@components/LottieAnimations");
var OnyxListItemProvider_1 = require("@components/OnyxListItemProvider");
var ScreenWrapper_1 = require("@components/ScreenWrapper");
var SelectionListWithSections_1 = require("@components/SelectionListWithSections");
var UnreportedExpensesSkeleton_1 = require("@components/Skeletons/UnreportedExpensesSkeleton");
var useDebouncedState_1 = require("@hooks/useDebouncedState");
var useLocalize_1 = require("@hooks/useLocalize");
var useNetwork_1 = require("@hooks/useNetwork");
var useOnyx_1 = require("@hooks/useOnyx");
var usePermissions_1 = require("@hooks/usePermissions");
var usePolicy_1 = require("@hooks/usePolicy");
var useThemeStyles_1 = require("@hooks/useThemeStyles");
var UnreportedExpenses_1 = require("@libs/actions/UnreportedExpenses");
var CurrencyUtils_1 = require("@libs/CurrencyUtils");
var getNonEmptyStringOnyxID_1 = require("@libs/getNonEmptyStringOnyxID");
var interceptAnonymousUser_1 = require("@libs/interceptAnonymousUser");
var PolicyUtils_1 = require("@libs/PolicyUtils");
var ReportUtils_1 = require("@libs/ReportUtils");
var SubscriptionUtils_1 = require("@libs/SubscriptionUtils");
var tokenizedSearch_1 = require("@libs/tokenizedSearch");
var TransactionUtils_1 = require("@libs/TransactionUtils");
var Navigation_1 = require("@navigation/Navigation");
var IOU_1 = require("@userActions/IOU");
var Transaction_1 = require("@userActions/Transaction");
var CONST_1 = require("@src/CONST");
var ONYXKEYS_1 = require("@src/ONYXKEYS");
var ROUTES_1 = require("@src/ROUTES");
var getEmptyArray_1 = require("@src/types/utils/getEmptyArray");
var NewChatSelectorPage_1 = require("./NewChatSelectorPage");
var UnreportedExpenseListItem_1 = require("./UnreportedExpenseListItem");
function AddUnreportedExpense(_a) {
    var _b;
    var route = _a.route;
    var translate = (0, useLocalize_1.default)().translate;
    var _c = (0, react_1.useState)(''), errorMessage = _c[0], setErrorMessage = _c[1];
    var _d = (0, react_1.useState)(0), offset = _d[0], setOffset = _d[1];
    var isOffline = (0, useNetwork_1.default)().isOffline;
    var _e = (0, react_1.useState)(new Set()), selectedIds = _e[0], setSelectedIds = _e[1];
    var _f = (0, useDebouncedState_1.default)(''), searchValue = _f[0], debouncedSearchValue = _f[1], setSearchValue = _f[2];
    var _g = route.params, reportID = _g.reportID, backToReport = _g.backToReport;
    var report = (0, useOnyx_1.default)("".concat(ONYXKEYS_1.default.COLLECTION.REPORT).concat(reportID), { canBeMissing: true })[0];
    var reportToConfirm = (0, useOnyx_1.default)("".concat(ONYXKEYS_1.default.COLLECTION.REPORT).concat((_b = report === null || report === void 0 ? void 0 : report.reportID) !== null && _b !== void 0 ? _b : CONST_1.default.REPORT.UNREPORTED_REPORT_ID), { canBeMissing: true })[0];
    var reportNextStep = (0, useOnyx_1.default)("".concat(ONYXKEYS_1.default.COLLECTION.NEXT_STEP).concat(reportID), { canBeMissing: true })[0];
    var policy = (0, usePolicy_1.default)(report === null || report === void 0 ? void 0 : report.policyID);
    var policyCategories = (0, useOnyx_1.default)("".concat(ONYXKEYS_1.default.COLLECTION.POLICY_CATEGORIES).concat((0, getNonEmptyStringOnyxID_1.default)(report === null || report === void 0 ? void 0 : report.policyID)), { canBeMissing: true })[0];
    var hasMoreUnreportedTransactionsResults = (0, useOnyx_1.default)(ONYXKEYS_1.default.HAS_MORE_UNREPORTED_TRANSACTIONS_RESULTS, { canBeMissing: true })[0];
    var isLoadingUnreportedTransactions = (0, useOnyx_1.default)(ONYXKEYS_1.default.IS_LOADING_UNREPORTED_TRANSACTIONS, { canBeMissing: true })[0];
    var isBetaEnabled = (0, usePermissions_1.default)().isBetaEnabled;
    var isASAPSubmitBetaEnabled = isBetaEnabled(CONST_1.default.BETAS.ASAP_SUBMIT);
    var session = (0, OnyxListItemProvider_1.useSession)();
    var shouldShowUnreportedTransactionsSkeletons = isLoadingUnreportedTransactions && hasMoreUnreportedTransactionsResults && !isOffline;
    var getUnreportedTransactions = (0, react_1.useCallback)(function (transactions) {
        if (!transactions) {
            return [];
        }
        return Object.values(transactions || {}).filter(function (item) {
            var _a, _b, _c, _d;
            var isUnreported = (item === null || item === void 0 ? void 0 : item.reportID) === CONST_1.default.REPORT.UNREPORTED_REPORT_ID || (item === null || item === void 0 ? void 0 : item.reportID) === '';
            if (!isUnreported) {
                return false;
            }
            // Negative values are not allowed for unreported expenses
            if (((_b = (_a = (0, ReportUtils_1.getTransactionDetails)(item)) === null || _a === void 0 ? void 0 : _a.amount) !== null && _b !== void 0 ? _b : 0) < 0) {
                return false;
            }
            if ((0, TransactionUtils_1.isPerDiemRequest)(item)) {
                // Only show per diem expenses if the target workspace has per diem enabled and the per diem expense was created in the same workspace
                var workspacePerDiemUnit = (0, PolicyUtils_1.getPerDiemCustomUnit)(policy);
                var perDiemCustomUnitID = (_d = (_c = item === null || item === void 0 ? void 0 : item.comment) === null || _c === void 0 ? void 0 : _c.customUnit) === null || _d === void 0 ? void 0 : _d.customUnitID;
                return (0, PolicyUtils_1.canSubmitPerDiemExpenseFromWorkspace)(policy) && (!perDiemCustomUnitID || perDiemCustomUnitID === (workspacePerDiemUnit === null || workspacePerDiemUnit === void 0 ? void 0 : workspacePerDiemUnit.customUnitID));
            }
            return true;
        });
    }, [policy]);
    var _h = (0, useOnyx_1.default)(ONYXKEYS_1.default.COLLECTION.TRANSACTION, {
        selector: getUnreportedTransactions,
        canBeMissing: true,
    }, [getUnreportedTransactions])[0], transactions = _h === void 0 ? (0, getEmptyArray_1.default)() : _h;
    var fetchMoreUnreportedTransactions = function () {
        if (!hasMoreUnreportedTransactionsResults || isLoadingUnreportedTransactions) {
            return;
        }
        (0, UnreportedExpenses_1.fetchUnreportedExpenses)(offset + CONST_1.default.UNREPORTED_EXPENSES_PAGE_SIZE);
        setOffset(function (prevOffset) { return prevOffset + CONST_1.default.UNREPORTED_EXPENSES_PAGE_SIZE; });
    };
    (0, react_1.useEffect)(function () {
        (0, UnreportedExpenses_1.fetchUnreportedExpenses)(0);
    }, []);
    var styles = (0, useThemeStyles_1.default)();
    var selectionListRef = (0, react_1.useRef)(null);
    var shouldShowTextInput = (0, react_1.useMemo)(function () {
        return transactions.length >= CONST_1.default.SEARCH_ITEM_LIMIT;
    }, [transactions.length]);
    var filteredTransactions = (0, react_1.useMemo)(function () {
        if (!debouncedSearchValue.trim() || !shouldShowTextInput) {
            return transactions;
        }
        return (0, tokenizedSearch_1.default)(transactions, debouncedSearchValue, function (transaction) {
            var searchableFields = [];
            var merchant = (0, TransactionUtils_1.getMerchant)(transaction);
            if (merchant !== CONST_1.default.TRANSACTION.PARTIAL_TRANSACTION_MERCHANT) {
                searchableFields.push(merchant);
            }
            var description = (0, TransactionUtils_1.getDescription)(transaction);
            if (description.trim()) {
                searchableFields.push(description);
            }
            var amount = (0, TransactionUtils_1.getAmount)(transaction);
            var currency = (0, TransactionUtils_1.getCurrency)(transaction);
            var formattedAmount = (0, CurrencyUtils_1.convertToDisplayString)(amount, currency);
            searchableFields.push(formattedAmount);
            // This allows users to search "2000" and find "$2,000.00" for example
            var normalizedAmount = (amount / 100).toString();
            searchableFields.push(normalizedAmount);
            return searchableFields;
        });
    }, [debouncedSearchValue, shouldShowTextInput, transactions]);
    var sections = (0, react_1.useMemo)(function () { return (0, TransactionUtils_1.createUnreportedExpenseSections)(filteredTransactions); }, [filteredTransactions]);
    var handleConfirm = (0, react_1.useCallback)(function () {
        if (selectedIds.size === 0) {
            setErrorMessage(translate('iou.selectUnreportedExpense'));
            return;
        }
        Navigation_1.default.dismissModal();
        // eslint-disable-next-line @typescript-eslint/no-deprecated
        react_native_1.InteractionManager.runAfterInteractions(function () {
            var _a, _b;
            if (report && (0, ReportUtils_1.isIOUReport)(report)) {
                (0, IOU_1.convertBulkTrackedExpensesToIOU)(__spreadArray([], selectedIds, true), report.reportID, isASAPSubmitBetaEnabled);
            }
            else {
                (0, Transaction_1.changeTransactionsReport)(__spreadArray([], selectedIds, true), isASAPSubmitBetaEnabled, (_a = session === null || session === void 0 ? void 0 : session.accountID) !== null && _a !== void 0 ? _a : CONST_1.default.DEFAULT_NUMBER_ID, (_b = session === null || session === void 0 ? void 0 : session.email) !== null && _b !== void 0 ? _b : '', reportToConfirm, policy, reportNextStep, policyCategories);
            }
        });
        setErrorMessage('');
    }, [selectedIds, translate, report, isASAPSubmitBetaEnabled, session === null || session === void 0 ? void 0 : session.accountID, session === null || session === void 0 ? void 0 : session.email, reportToConfirm, policy, reportNextStep, policyCategories]);
    var footerContent = (0, react_1.useMemo)(function () {
        return (<>
                {!!errorMessage && (<FormHelpMessage_1.default style={[styles.ph1, styles.mb2]} isError message={errorMessage}/>)}
                <Button_1.default success large style={[styles.w100, styles.justifyContentCenter]} text={translate('iou.addUnreportedExpenseConfirm')} onPress={handleConfirm} pressOnEnter enterKeyEventListenerPriority={1}/>
            </>);
    }, [errorMessage, styles, translate, handleConfirm]);
    var headerMessage = (0, react_1.useMemo)(function () {
        var _a;
        if (debouncedSearchValue.trim() && ((_a = sections.at(0)) === null || _a === void 0 ? void 0 : _a.data.length) === 0) {
            return translate('common.noResultsFound');
        }
        return '';
    }, [debouncedSearchValue, sections, translate]);
    var hasSearchTerm = debouncedSearchValue.trim().length > 0;
    var isShowingEmptyState = !hasSearchTerm && transactions.length === 0;
    if (isShowingEmptyState && isLoadingUnreportedTransactions) {
        return (<ScreenWrapper_1.default shouldEnableKeyboardAvoidingView={false} includeSafeAreaPaddingBottom shouldShowOfflineIndicator={false} shouldEnablePickerAvoiding={false} testID={NewChatSelectorPage_1.default.displayName} focusTrapSettings={{ active: false }}>
                <HeaderWithBackButton_1.default title={translate('iou.addUnreportedExpense')} onBackButtonPress={Navigation_1.default.goBack}/>
                <UnreportedExpensesSkeleton_1.default />
            </ScreenWrapper_1.default>);
    }
    if (isShowingEmptyState) {
        return (<ScreenWrapper_1.default shouldEnableKeyboardAvoidingView={false} includeSafeAreaPaddingBottom shouldEnablePickerAvoiding={false} testID={NewChatSelectorPage_1.default.displayName} focusTrapSettings={{ active: false }}>
                <HeaderWithBackButton_1.default title={translate('iou.addUnreportedExpense')} onBackButtonPress={Navigation_1.default.goBack}/>
                <EmptyStateComponent_1.default cardStyles={[styles.appBG]} cardContentStyles={[styles.pt5, styles.pb0]} headerMediaType={CONST_1.default.EMPTY_STATE_MEDIA.ANIMATION} headerMedia={LottieAnimations_1.default.GenericEmptyState} title={translate('iou.emptyStateUnreportedExpenseTitle')} subtitle={translate('iou.emptyStateUnreportedExpenseSubtitle')} headerStyles={[styles.emptyStateMoneyRequestReport]} lottieWebViewStyles={styles.emptyStateFolderWebStyles} headerContentStyles={styles.emptyStateFolderWebStyles} buttons={[
                {
                    buttonText: translate('iou.createExpense'),
                    buttonAction: function () {
                        if (report && report.policyID && (0, SubscriptionUtils_1.shouldRestrictUserBillableActions)(report.policyID)) {
                            Navigation_1.default.navigate(ROUTES_1.default.RESTRICTED_ACTION.getRoute(report.policyID));
                            return;
                        }
                        (0, interceptAnonymousUser_1.default)(function () {
                            (0, IOU_1.startMoneyRequest)(CONST_1.default.IOU.TYPE.SUBMIT, reportID, undefined, false, backToReport);
                        });
                    },
                    success: true,
                },
            ]}/>
            </ScreenWrapper_1.default>);
    }
    return (<ScreenWrapper_1.default shouldEnableKeyboardAvoidingView includeSafeAreaPaddingBottom shouldEnablePickerAvoiding={false} shouldEnableMaxHeight enableEdgeToEdgeBottomSafeAreaPadding testID={NewChatSelectorPage_1.default.displayName} focusTrapSettings={{ active: false }}>
            <HeaderWithBackButton_1.default title={translate('iou.addUnreportedExpense')} onBackButtonPress={Navigation_1.default.goBack}/>
            <SelectionListWithSections_1.default ref={selectionListRef} onSelectRow={function (item) {
            setSelectedIds(function (prevIds) {
                var newIds = new Set(prevIds);
                if (newIds.has(item.transactionID)) {
                    newIds.delete(item.transactionID);
                }
                else {
                    newIds.add(item.transactionID);
                    if (errorMessage) {
                        setErrorMessage('');
                    }
                }
                return newIds;
            });
        }} isSelected={function (item) { return selectedIds.has(item.transactionID); }} shouldShowTextInput={shouldShowTextInput} textInputValue={searchValue} textInputLabel={shouldShowTextInput ? translate('iou.findExpense') : undefined} onChangeText={setSearchValue} headerMessage={headerMessage} canSelectMultiple sections={sections} ListItem={UnreportedExpenseListItem_1.default} onEndReached={fetchMoreUnreportedTransactions} onEndReachedThreshold={0.75} addBottomSafeAreaPadding listFooterContent={shouldShowUnreportedTransactionsSkeletons ? <UnreportedExpensesSkeleton_1.default fixedNumberOfItems={3}/> : undefined} footerContent={footerContent}/>
        </ScreenWrapper_1.default>);
}
AddUnreportedExpense.displayName = 'AddUnreportedExpense';
exports.default = AddUnreportedExpense;
