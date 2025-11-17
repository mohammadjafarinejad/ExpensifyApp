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
var fast_equals_1 = require("fast-equals");
var react_1 = require("react");
var react_native_1 = require("react-native");
var react_native_keyboard_controller_1 = require("react-native-keyboard-controller");
var FullPageNotFoundView_1 = require("@components/BlockingViews/FullPageNotFoundView");
var Button_1 = require("@components/Button");
var ConfirmModal_1 = require("@components/ConfirmModal");
var FormHelpMessage_1 = require("@components/FormHelpMessage");
var HeaderWithBackButton_1 = require("@components/HeaderWithBackButton");
var Expensicons = require("@components/Icon/Expensicons");
var MenuItem_1 = require("@components/MenuItem");
var ScreenWrapper_1 = require("@components/ScreenWrapper");
var SearchContext_1 = require("@components/Search/SearchContext");
var SelectionListWithSections_1 = require("@components/SelectionListWithSections");
var useDisplayFocusedInputUnderKeyboard_1 = require("@hooks/useDisplayFocusedInputUnderKeyboard");
var useGetIOUReportFromReportAction_1 = require("@hooks/useGetIOUReportFromReportAction");
var useLocalize_1 = require("@hooks/useLocalize");
var useOnyx_1 = require("@hooks/useOnyx");
var usePermissions_1 = require("@hooks/usePermissions");
var usePolicy_1 = require("@hooks/usePolicy");
var useResponsiveLayout_1 = require("@hooks/useResponsiveLayout");
var useThemeStyles_1 = require("@hooks/useThemeStyles");
var IOU_1 = require("@libs/actions/IOU");
var CurrencyUtils_1 = require("@libs/CurrencyUtils");
var DateUtils_1 = require("@libs/DateUtils");
var DeviceCapabilities_1 = require("@libs/DeviceCapabilities");
var ErrorUtils_1 = require("@libs/ErrorUtils");
var getNonEmptyStringOnyxID_1 = require("@libs/getNonEmptyStringOnyxID");
var Navigation_1 = require("@libs/Navigation/Navigation");
var ReportSecondaryActionUtils_1 = require("@libs/ReportSecondaryActionUtils");
var ReportUtils_1 = require("@libs/ReportUtils");
var TransactionUtils_1 = require("@libs/TransactionUtils");
var CONST_1 = require("@src/CONST");
var ONYXKEYS_1 = require("@src/ONYXKEYS");
var EmptyObject_1 = require("@src/types/utils/EmptyObject");
function SplitExpensePage(_a) {
    var _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o;
    var route = _a.route;
    var styles = (0, useThemeStyles_1.default)();
    var translate = (0, useLocalize_1.default)().translate;
    var _p = (0, useDisplayFocusedInputUnderKeyboard_1.default)(), listRef = _p.listRef, viewRef = _p.viewRef, footerRef = _p.footerRef, bottomOffset = _p.bottomOffset, scrollToFocusedInput = _p.scrollToFocusedInput, SplitListItem = _p.SplitListItem;
    var _q = route.params, reportID = _q.reportID, transactionID = _q.transactionID, splitExpenseTransactionID = _q.splitExpenseTransactionID, backTo = _q.backTo;
    var shouldUseNarrowLayout = (0, useResponsiveLayout_1.default)().shouldUseNarrowLayout;
    var _r = (0, react_1.useState)(false), cannotBeEditedModalVisible = _r[0], setCannotBeEditedModalVisible = _r[1];
    var _s = react_1.default.useState(''), errorMessage = _s[0], setErrorMessage = _s[1];
    var currentSearchHash = (0, SearchContext_1.useSearchContext)().currentSearchHash;
    var draftTransaction = (0, useOnyx_1.default)("".concat(ONYXKEYS_1.default.COLLECTION.SPLIT_TRANSACTION_DRAFT).concat(transactionID), { canBeMissing: false })[0];
    var transactionReport = (0, ReportUtils_1.getReportOrDraftReport)(draftTransaction === null || draftTransaction === void 0 ? void 0 : draftTransaction.reportID);
    var parentTransactionReport = (0, ReportUtils_1.getReportOrDraftReport)(transactionReport === null || transactionReport === void 0 ? void 0 : transactionReport.parentReportID);
    var expenseReport = (transactionReport === null || transactionReport === void 0 ? void 0 : transactionReport.type) === CONST_1.default.REPORT.TYPE.EXPENSE ? transactionReport : parentTransactionReport;
    var policyCategories = (0, useOnyx_1.default)("".concat(ONYXKEYS_1.default.COLLECTION.POLICY_CATEGORIES).concat((0, getNonEmptyStringOnyxID_1.default)(expenseReport === null || expenseReport === void 0 ? void 0 : expenseReport.policyID)), { canBeMissing: true })[0];
    var expenseReportPolicy = (0, useOnyx_1.default)("".concat(ONYXKEYS_1.default.COLLECTION.POLICY).concat((0, getNonEmptyStringOnyxID_1.default)(expenseReport === null || expenseReport === void 0 ? void 0 : expenseReport.policyID)), { canBeMissing: true })[0];
    var transaction = (0, useOnyx_1.default)("".concat(ONYXKEYS_1.default.COLLECTION.TRANSACTION).concat((0, getNonEmptyStringOnyxID_1.default)(transactionID)), { canBeMissing: false })[0];
    var currencyList = (0, useOnyx_1.default)(ONYXKEYS_1.default.CURRENCY_LIST, { canBeMissing: true })[0];
    var allTransactions = (0, useOnyx_1.default)(ONYXKEYS_1.default.COLLECTION.TRANSACTION, { canBeMissing: false })[0];
    var allReports = (0, useOnyx_1.default)(ONYXKEYS_1.default.COLLECTION.REPORT, { canBeMissing: false })[0];
    var allReportNameValuePairs = (0, useOnyx_1.default)(ONYXKEYS_1.default.COLLECTION.REPORT_NAME_VALUE_PAIRS, { canBeMissing: true })[0];
    var report = (0, useOnyx_1.default)("".concat(ONYXKEYS_1.default.COLLECTION.REPORT).concat((0, getNonEmptyStringOnyxID_1.default)(reportID)), { canBeMissing: true })[0];
    var policyRecentlyUsedCategories = (0, useOnyx_1.default)("".concat(ONYXKEYS_1.default.COLLECTION.POLICY_RECENTLY_USED_CATEGORIES).concat((0, IOU_1.getIOURequestPolicyID)(transaction, report)), { canBeMissing: true })[0];
    var policy = (0, usePolicy_1.default)(report === null || report === void 0 ? void 0 : report.policyID);
    var isSplitAvailable = report && transaction && (0, ReportSecondaryActionUtils_1.isSplitAction)(report, [transaction], policy);
    var transactionDetails = (0, react_1.useMemo)(function () { var _a; return (_a = (0, ReportUtils_1.getTransactionDetails)(transaction)) !== null && _a !== void 0 ? _a : {}; }, [transaction]);
    var transactionDetailsAmount = (_b = transactionDetails === null || transactionDetails === void 0 ? void 0 : transactionDetails.amount) !== null && _b !== void 0 ? _b : 0;
    var sumOfSplitExpenses = (0, react_1.useMemo)(function () { var _a, _b; return ((_b = (_a = draftTransaction === null || draftTransaction === void 0 ? void 0 : draftTransaction.comment) === null || _a === void 0 ? void 0 : _a.splitExpenses) !== null && _b !== void 0 ? _b : []).reduce(function (acc, item) { var _a; return acc + ((_a = item.amount) !== null && _a !== void 0 ? _a : 0); }, 0); }, [draftTransaction]);
    var splitExpenses = (0, react_1.useMemo)(function () { var _a, _b; return (_b = (_a = draftTransaction === null || draftTransaction === void 0 ? void 0 : draftTransaction.comment) === null || _a === void 0 ? void 0 : _a.splitExpenses) !== null && _b !== void 0 ? _b : []; }, [(_c = draftTransaction === null || draftTransaction === void 0 ? void 0 : draftTransaction.comment) === null || _c === void 0 ? void 0 : _c.splitExpenses]);
    var currencySymbol = (_g = (_f = (_e = currencyList === null || currencyList === void 0 ? void 0 : currencyList[(_d = transactionDetails.currency) !== null && _d !== void 0 ? _d : '']) === null || _e === void 0 ? void 0 : _e.symbol) !== null && _f !== void 0 ? _f : transactionDetails.currency) !== null && _g !== void 0 ? _g : CONST_1.default.CURRENCY.USD;
    var isPerDiem = (0, TransactionUtils_1.isPerDiemRequest)(transaction);
    var isCard = (0, TransactionUtils_1.isManagedCardTransaction)(transaction);
    var originalTransactionID = (_j = (_h = draftTransaction === null || draftTransaction === void 0 ? void 0 : draftTransaction.comment) === null || _h === void 0 ? void 0 : _h.originalTransactionID) !== null && _j !== void 0 ? _j : CONST_1.default.IOU.OPTIMISTIC_TRANSACTION_ID;
    var iouActions = (0, IOU_1.getIOUActionForTransactions)([originalTransactionID], expenseReport === null || expenseReport === void 0 ? void 0 : expenseReport.reportID);
    var iouReport = (0, useGetIOUReportFromReportAction_1.default)(iouActions.at(0)).iouReport;
    var childTransactions = (0, react_1.useMemo)(function () { return (0, TransactionUtils_1.getChildTransactions)(allTransactions, allReports, transactionID); }, [allReports, allTransactions, transactionID]);
    var splitFieldDataFromChildTransactions = (0, react_1.useMemo)(function () { return childTransactions.map(function (currentTransaction) { return (0, IOU_1.initSplitExpenseItemData)(currentTransaction); }); }, [childTransactions]);
    var splitFieldDataFromOriginalTransaction = (0, react_1.useMemo)(function () { return (0, IOU_1.initSplitExpenseItemData)(transaction); }, [transaction]);
    var isBetaEnabled = (0, usePermissions_1.default)().isBetaEnabled;
    (0, react_1.useEffect)(function () {
        var errorString = (0, ErrorUtils_1.getLatestErrorMessage)(draftTransaction !== null && draftTransaction !== void 0 ? draftTransaction : {});
        if (errorString) {
            setErrorMessage(errorString);
        }
    }, [draftTransaction, draftTransaction === null || draftTransaction === void 0 ? void 0 : draftTransaction.errors]);
    (0, react_1.useEffect)(function () {
        setErrorMessage('');
    }, [sumOfSplitExpenses, splitExpenses]);
    var onAddSplitExpense = (0, react_1.useCallback)(function () {
        if (draftTransaction === null || draftTransaction === void 0 ? void 0 : draftTransaction.errors) {
            (0, IOU_1.clearSplitTransactionDraftErrors)(transactionID);
        }
        (0, IOU_1.addSplitExpenseField)(transaction, draftTransaction);
    }, [draftTransaction, transaction, transactionID]);
    var onMakeSplitsEven = (0, react_1.useCallback)(function () {
        if (!draftTransaction) {
            return;
        }
        (0, IOU_1.evenlyDistributeSplitExpenseAmounts)(draftTransaction);
    }, [draftTransaction]);
    var onSaveSplitExpense = (0, react_1.useCallback)(function () {
        var _a, _b, _c, _d, _e;
        if (splitExpenses.length <= 1 && !childTransactions.length) {
            var splitFieldDataFromOriginalTransactionWithoutID = __assign(__assign({}, splitFieldDataFromOriginalTransaction), { transactionID: '' });
            var splitExpenseWithoutID = __assign(__assign({}, splitExpenses.at(0)), { transactionID: '' });
            // When we try to save one split during splits creation and if the data is identical to the original transaction we should close the split flow
            if (!childTransactions.length && (0, fast_equals_1.deepEqual)(splitFieldDataFromOriginalTransactionWithoutID, splitExpenseWithoutID)) {
                Navigation_1.default.dismissModal();
                return;
            }
            // When we try to save splits during editing splits and if the data is identical to the already created transactions we should close the split flow
            if (childTransactions.length && (0, fast_equals_1.deepEqual)(splitFieldDataFromChildTransactions, splitExpenses)) {
                Navigation_1.default.dismissModal();
                return;
            }
            // When we try to save one split during splits creation and if the data is not identical to the original transaction we should show the error
            setErrorMessage(translate('iou.splitExpenseOneMoreSplit'));
            return;
        }
        if (draftTransaction === null || draftTransaction === void 0 ? void 0 : draftTransaction.errors) {
            (0, IOU_1.clearSplitTransactionDraftErrors)(transactionID);
        }
        if (sumOfSplitExpenses > transactionDetailsAmount) {
            var difference = sumOfSplitExpenses - transactionDetailsAmount;
            setErrorMessage(translate('iou.totalAmountGreaterThanOriginal', { amount: (0, CurrencyUtils_1.convertToDisplayString)(difference, transactionDetails === null || transactionDetails === void 0 ? void 0 : transactionDetails.currency) }));
            return;
        }
        if (sumOfSplitExpenses < transactionDetailsAmount && (isPerDiem || isCard)) {
            var difference = transactionDetailsAmount - sumOfSplitExpenses;
            setErrorMessage(translate('iou.totalAmountLessThanOriginal', { amount: (0, CurrencyUtils_1.convertToDisplayString)(difference, transactionDetails === null || transactionDetails === void 0 ? void 0 : transactionDetails.currency) }));
            return;
        }
        if (splitExpenses.find(function (item) { return item.amount === 0; })) {
            setErrorMessage(translate('iou.splitExpenseZeroAmount'));
            return;
        }
        // When we try to save splits during editing splits and if the data is identical to the already created transactions we should close the split flow
        if ((0, fast_equals_1.deepEqual)(splitFieldDataFromChildTransactions, splitExpenses)) {
            Navigation_1.default.dismissModal();
            return;
        }
        (0, IOU_1.updateSplitTransactionsFromSplitExpensesFlow)({
            allTransactionsList: allTransactions,
            allReportsList: allReports,
            allReportNameValuePairsList: allReportNameValuePairs,
            transactionData: {
                reportID: (_a = draftTransaction === null || draftTransaction === void 0 ? void 0 : draftTransaction.reportID) !== null && _a !== void 0 ? _a : String(CONST_1.default.DEFAULT_NUMBER_ID),
                originalTransactionID: (_c = (_b = draftTransaction === null || draftTransaction === void 0 ? void 0 : draftTransaction.comment) === null || _b === void 0 ? void 0 : _b.originalTransactionID) !== null && _c !== void 0 ? _c : String(CONST_1.default.DEFAULT_NUMBER_ID),
                splitExpenses: splitExpenses,
                splitExpensesTotal: (_e = (_d = draftTransaction === null || draftTransaction === void 0 ? void 0 : draftTransaction.comment) === null || _d === void 0 ? void 0 : _d.splitExpensesTotal) !== null && _e !== void 0 ? _e : 0,
            },
            hash: currentSearchHash,
            policyCategories: policyCategories,
            policy: expenseReportPolicy,
            policyRecentlyUsedCategories: policyRecentlyUsedCategories,
            iouReport: iouReport,
            firstIOU: iouActions.at(0),
            isASAPSubmitBetaEnabled: isBetaEnabled(CONST_1.default.BETAS.ASAP_SUBMIT),
        });
    }, [
        splitExpenses,
        childTransactions.length,
        draftTransaction === null || draftTransaction === void 0 ? void 0 : draftTransaction.errors,
        draftTransaction === null || draftTransaction === void 0 ? void 0 : draftTransaction.reportID,
        (_k = draftTransaction === null || draftTransaction === void 0 ? void 0 : draftTransaction.comment) === null || _k === void 0 ? void 0 : _k.originalTransactionID,
        (_l = draftTransaction === null || draftTransaction === void 0 ? void 0 : draftTransaction.comment) === null || _l === void 0 ? void 0 : _l.splitExpensesTotal,
        sumOfSplitExpenses,
        transactionDetailsAmount,
        isPerDiem,
        isCard,
        splitFieldDataFromChildTransactions,
        allTransactions,
        allReports,
        allReportNameValuePairs,
        currentSearchHash,
        policyCategories,
        expenseReportPolicy,
        policyRecentlyUsedCategories,
        iouReport,
        iouActions,
        splitFieldDataFromOriginalTransaction,
        translate,
        transactionID,
        transactionDetails === null || transactionDetails === void 0 ? void 0 : transactionDetails.currency,
        isBetaEnabled,
    ]);
    var onSplitExpenseAmountChange = (0, react_1.useCallback)(function (currentItemTransactionID, value) {
        var amountInCents = (0, CurrencyUtils_1.convertToBackendAmount)(value);
        (0, IOU_1.updateSplitExpenseAmountField)(draftTransaction, currentItemTransactionID, amountInCents);
    }, [draftTransaction]);
    var getTranslatedText = (0, react_1.useCallback)(function (item) { var _a; return (item.translationPath ? translate(item.translationPath) : ((_a = item.text) !== null && _a !== void 0 ? _a : '')); }, [translate]);
    var sections = (0, react_1.useMemo)(function () {
        var _a, _b;
        var dotSeparator = { text: " ".concat(CONST_1.default.DOT_SEPARATOR, " ") };
        var isTransactionMadeWithCard = (0, TransactionUtils_1.isManagedCardTransaction)(transaction);
        var showCashOrCard = { translationPath: isTransactionMadeWithCard ? 'iou.card' : 'iou.cash' };
        var items = ((_b = (_a = draftTransaction === null || draftTransaction === void 0 ? void 0 : draftTransaction.comment) === null || _a === void 0 ? void 0 : _a.splitExpenses) !== null && _b !== void 0 ? _b : []).map(function (item) {
            var _a, _b, _c, _d;
            var previewHeaderText = [showCashOrCard];
            var currentTransaction = allTransactions === null || allTransactions === void 0 ? void 0 : allTransactions["".concat(ONYXKEYS_1.default.COLLECTION.TRANSACTION).concat(item === null || item === void 0 ? void 0 : item.transactionID)];
            var currentReport = (0, ReportUtils_1.getReportOrDraftReport)(currentTransaction === null || currentTransaction === void 0 ? void 0 : currentTransaction.reportID);
            var isApproved = (0, ReportUtils_1.isReportApproved)({ report: currentReport });
            var isSettled = (0, ReportUtils_1.isSettled)(currentReport === null || currentReport === void 0 ? void 0 : currentReport.reportID);
            var isCancelled = currentReport && (currentReport === null || currentReport === void 0 ? void 0 : currentReport.isCancelledIOU);
            var date = DateUtils_1.default.formatWithUTCTimeZone(item.created, DateUtils_1.default.doesDateBelongToAPastYear(item.created) ? CONST_1.default.DATE.MONTH_DAY_YEAR_ABBR_FORMAT : CONST_1.default.DATE.MONTH_DAY_ABBR_FORMAT);
            previewHeaderText.unshift({ text: date }, dotSeparator);
            if (isCancelled) {
                previewHeaderText.push(dotSeparator, { text: translate('iou.canceled') });
            }
            else if (isApproved) {
                previewHeaderText.push(dotSeparator, { text: translate('iou.approved') });
            }
            else if (isSettled) {
                previewHeaderText.push(dotSeparator, { text: translate('iou.settledExpensify') });
            }
            var headerText = previewHeaderText.reduce(function (text, currentKey) {
                return "".concat(text).concat(getTranslatedText(currentKey));
            }, '');
            return __assign(__assign({}, item), { headerText: headerText, originalAmount: transactionDetailsAmount, amount: Number(item.amount), merchant: (_a = item === null || item === void 0 ? void 0 : item.merchant) !== null && _a !== void 0 ? _a : '', currency: (_b = draftTransaction === null || draftTransaction === void 0 ? void 0 : draftTransaction.currency) !== null && _b !== void 0 ? _b : CONST_1.default.CURRENCY.USD, transactionID: (_c = item === null || item === void 0 ? void 0 : item.transactionID) !== null && _c !== void 0 ? _c : CONST_1.default.IOU.OPTIMISTIC_TRANSACTION_ID, currencySymbol: currencySymbol, onSplitExpenseAmountChange: onSplitExpenseAmountChange, isSelected: splitExpenseTransactionID === item.transactionID, keyForList: item === null || item === void 0 ? void 0 : item.transactionID, isEditable: ((_d = item.statusNum) !== null && _d !== void 0 ? _d : 0) < CONST_1.default.REPORT.STATUS_NUM.CLOSED });
        });
        var newSections = [{ data: items }];
        return [newSections];
    }, [
        transaction,
        (_m = draftTransaction === null || draftTransaction === void 0 ? void 0 : draftTransaction.comment) === null || _m === void 0 ? void 0 : _m.splitExpenses,
        draftTransaction === null || draftTransaction === void 0 ? void 0 : draftTransaction.currency,
        allTransactions,
        transactionDetailsAmount,
        currencySymbol,
        onSplitExpenseAmountChange,
        splitExpenseTransactionID,
        translate,
        getTranslatedText,
    ])[0];
    var listFooterContent = (0, react_1.useMemo)(function () {
        var shouldShowMakeSplitsEven = childTransactions.length === 0;
        return (<react_native_1.View style={[styles.w100, styles.flexColumn, styles.mt1, shouldUseNarrowLayout && styles.mb3]}>
                <MenuItem_1.default onPress={onAddSplitExpense} title={translate('iou.addSplit')} icon={Expensicons.Plus} style={[styles.ph4]}/>
                {shouldShowMakeSplitsEven && (<MenuItem_1.default onPress={onMakeSplitsEven} title={translate('iou.makeSplitsEven')} icon={Expensicons.ArrowsLeftRight} style={[styles.ph4]}/>)}
            </react_native_1.View>);
    }, [onAddSplitExpense, onMakeSplitsEven, translate, childTransactions, shouldUseNarrowLayout, styles.w100, styles.ph4, styles.flexColumn, styles.mt1, styles.mb3]);
    var footerContent = (0, react_1.useMemo)(function () {
        var shouldShowWarningMessage = sumOfSplitExpenses < transactionDetailsAmount;
        var warningMessage = shouldShowWarningMessage
            ? translate('iou.totalAmountLessThanOriginal', { amount: (0, CurrencyUtils_1.convertToDisplayString)(transactionDetailsAmount - sumOfSplitExpenses, transactionDetails.currency) })
            : '';
        return (<react_native_1.View ref={footerRef}>
                {(!!errorMessage || !!warningMessage) && (<FormHelpMessage_1.default style={[styles.ph1, styles.mb2]} isError={!!errorMessage} isInfo={!errorMessage && shouldShowWarningMessage} message={errorMessage || warningMessage}/>)}
                <Button_1.default success large style={[styles.w100]} text={translate('common.save')} onPress={onSaveSplitExpense} pressOnEnter enterKeyEventListenerPriority={1}/>
            </react_native_1.View>);
    }, [sumOfSplitExpenses, transactionDetailsAmount, translate, transactionDetails.currency, errorMessage, styles.ph1, styles.mb2, styles.w100, onSaveSplitExpense, footerRef]);
    var initiallyFocusedOptionKey = (0, react_1.useMemo)(function () { var _a, _b; return (_b = (_a = sections.at(0)) === null || _a === void 0 ? void 0 : _a.data.find(function (option) { return option.transactionID === splitExpenseTransactionID; })) === null || _b === void 0 ? void 0 : _b.keyForList; }, [sections, splitExpenseTransactionID]);
    return (<ScreenWrapper_1.default testID={SplitExpensePage.displayName} shouldEnableMaxHeight={(0, DeviceCapabilities_1.canUseTouchScreen)()} keyboardAvoidingViewBehavior="height" shouldDismissKeyboardBeforeClose={false}>
            <FullPageNotFoundView_1.default shouldShow={!reportID || (0, EmptyObject_1.isEmptyObject)(draftTransaction) || !isSplitAvailable}>
                <react_native_1.View ref={viewRef} style={styles.flex1} onLayout={function () {
            scrollToFocusedInput();
        }}>
                    <HeaderWithBackButton_1.default title={splitExpenseTransactionID ? translate('iou.editSplits') : translate('iou.split')} subtitle={translate('iou.splitExpenseSubtitle', {
            amount: (0, CurrencyUtils_1.convertToDisplayString)(transactionDetailsAmount, transactionDetails === null || transactionDetails === void 0 ? void 0 : transactionDetails.currency),
            merchant: (_o = draftTransaction === null || draftTransaction === void 0 ? void 0 : draftTransaction.merchant) !== null && _o !== void 0 ? _o : '',
        })} onBackButtonPress={function () { return Navigation_1.default.goBack(backTo); }}/>

                    <SelectionListWithSections_1.default 
    /* Keeps input fields visible above keyboard on mobile */
    renderScrollComponent={function (props) { return (<react_native_keyboard_controller_1.KeyboardAwareScrollView 
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...props} bottomOffset={bottomOffset.current} /* Bottom offset ensures inputs stay above the "save" button *//>); }} onSelectRow={function (item) {
            if (!item.isEditable) {
                setCannotBeEditedModalVisible(true);
                return;
            }
            react_native_1.Keyboard.dismiss();
            // eslint-disable-next-line @typescript-eslint/no-deprecated
            react_native_1.InteractionManager.runAfterInteractions(function () {
                var _a;
                (0, IOU_1.initDraftSplitExpenseDataForEdit)(draftTransaction, item.transactionID, (_a = item.reportID) !== null && _a !== void 0 ? _a : reportID);
            });
        }} ref={listRef} sections={sections} initiallyFocusedOptionKey={initiallyFocusedOptionKey} ListItem={SplitListItem} containerStyle={[styles.flexBasisAuto]} footerContent={footerContent} listFooterContent={listFooterContent} disableKeyboardShortcuts shouldSingleExecuteRowSelect canSelectMultiple={false} shouldPreventDefaultFocusOnSelectRow removeClippedSubviews={false}/>
                </react_native_1.View>
                <ConfirmModal_1.default title={translate('iou.splitExpenseCannotBeEditedModalTitle')} prompt={translate('iou.splitExpenseCannotBeEditedModalDescription')} onConfirm={function () { return setCannotBeEditedModalVisible(false); }} onCancel={function () { return setCannotBeEditedModalVisible(false); }} confirmText={translate('common.buttonConfirm')} isVisible={cannotBeEditedModalVisible} shouldShowCancelButton={false}/>
            </FullPageNotFoundView_1.default>
        </ScreenWrapper_1.default>);
}
SplitExpensePage.displayName = 'SplitExpensePage';
exports.default = SplitExpensePage;
