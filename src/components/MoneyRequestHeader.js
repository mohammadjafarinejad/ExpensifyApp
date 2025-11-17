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
var native_1 = require("@react-navigation/native");
var react_1 = require("react");
var react_native_1 = require("react-native");
var useCurrentUserPersonalDetails_1 = require("@hooks/useCurrentUserPersonalDetails");
var useDeleteTransactions_1 = require("@hooks/useDeleteTransactions");
var useDuplicateTransactionsAndViolations_1 = require("@hooks/useDuplicateTransactionsAndViolations");
var useGetIOUReportFromReportAction_1 = require("@hooks/useGetIOUReportFromReportAction");
var useLoadingBarVisibility_1 = require("@hooks/useLoadingBarVisibility");
var useLocalize_1 = require("@hooks/useLocalize");
var useOnyx_1 = require("@hooks/useOnyx");
var useReportIsArchived_1 = require("@hooks/useReportIsArchived");
var useResponsiveLayout_1 = require("@hooks/useResponsiveLayout");
var useTheme_1 = require("@hooks/useTheme");
var useThemeStyles_1 = require("@hooks/useThemeStyles");
var useTransactionViolations_1 = require("@hooks/useTransactionViolations");
var IOU_1 = require("@libs/actions/IOU");
var MergeTransaction_1 = require("@libs/actions/MergeTransaction");
var User_1 = require("@libs/actions/User");
var getNonEmptyStringOnyxID_1 = require("@libs/getNonEmptyStringOnyxID");
var Navigation_1 = require("@libs/Navigation/Navigation");
var ReportActionsUtils_1 = require("@libs/ReportActionsUtils");
var ReportPrimaryActionUtils_1 = require("@libs/ReportPrimaryActionUtils");
var ReportSecondaryActionUtils_1 = require("@libs/ReportSecondaryActionUtils");
var ReportUtils_1 = require("@libs/ReportUtils");
var TransactionPreviewUtils_1 = require("@libs/TransactionPreviewUtils");
var TransactionUtils_1 = require("@libs/TransactionUtils");
var variables_1 = require("@styles/variables");
var IOU_2 = require("@userActions/IOU");
var Transaction_1 = require("@userActions/Transaction");
var CONST_1 = require("@src/CONST");
var ONYXKEYS_1 = require("@src/ONYXKEYS");
var ROUTES_1 = require("@src/ROUTES");
var SCREENS_1 = require("@src/SCREENS");
var BrokenConnectionDescription_1 = require("./BrokenConnectionDescription");
var Button_1 = require("./Button");
var ButtonWithDropdownMenu_1 = require("./ButtonWithDropdownMenu");
var ConfirmModal_1 = require("./ConfirmModal");
var DecisionModal_1 = require("./DecisionModal");
var DelegateNoAccessModalProvider_1 = require("./DelegateNoAccessModalProvider");
var HeaderWithBackButton_1 = require("./HeaderWithBackButton");
var HoldOrRejectEducationalModal_1 = require("./HoldOrRejectEducationalModal");
var HoldSubmitterEducationalModal_1 = require("./HoldSubmitterEducationalModal");
var Icon_1 = require("./Icon");
var Expensicons = require("./Icon/Expensicons");
var LoadingBar_1 = require("./LoadingBar");
var MoneyRequestHeaderStatusBar_1 = require("./MoneyRequestHeaderStatusBar");
var MoneyRequestReportTransactionsNavigation_1 = require("./MoneyRequestReportView/MoneyRequestReportTransactionsNavigation");
var SearchContext_1 = require("./Search/SearchContext");
var WideRHPContextProvider_1 = require("./WideRHPContextProvider");
function MoneyRequestHeader(_a) {
    var _b, _c;
    var _d, _e, _f;
    var report = _a.report, parentReportAction = _a.parentReportAction, policy = _a.policy, onBackButtonPress = _a.onBackButtonPress;
    // We need to use isSmallScreenWidth instead of shouldUseNarrowLayout to use a correct layout for the hold expense modal https://github.com/Expensify/App/pull/47990#issuecomment-2362382026
    // eslint-disable-next-line rulesdir/prefer-shouldUseNarrowLayout-instead-of-isSmallScreenWidth
    var _g = (0, useResponsiveLayout_1.default)(), shouldUseNarrowLayout = _g.shouldUseNarrowLayout, isSmallScreenWidth = _g.isSmallScreenWidth;
    var route = (0, native_1.useRoute)();
    var parentReport = (0, useOnyx_1.default)("".concat(ONYXKEYS_1.default.COLLECTION.REPORT).concat(report === null || report === void 0 ? void 0 : report.parentReportID), {
        canBeMissing: false,
    })[0];
    var transaction = (0, useOnyx_1.default)("".concat(ONYXKEYS_1.default.COLLECTION.TRANSACTION).concat((0, ReportActionsUtils_1.isMoneyRequestAction)(parentReportAction) ? ((_e = (_d = (0, ReportActionsUtils_1.getOriginalMessage)(parentReportAction)) === null || _d === void 0 ? void 0 : _d.IOUTransactionID) !== null && _e !== void 0 ? _e : CONST_1.default.DEFAULT_NUMBER_ID) : CONST_1.default.DEFAULT_NUMBER_ID), { canBeMissing: true })[0];
    var transactionReport = (0, useOnyx_1.default)("".concat(ONYXKEYS_1.default.COLLECTION.REPORT).concat((0, getNonEmptyStringOnyxID_1.default)(transaction === null || transaction === void 0 ? void 0 : transaction.reportID)), { canBeMissing: true })[0];
    var policyCategories = (0, useOnyx_1.default)("".concat(ONYXKEYS_1.default.COLLECTION.POLICY_CATEGORIES).concat((0, getNonEmptyStringOnyxID_1.default)(transactionReport === null || transactionReport === void 0 ? void 0 : transactionReport.policyID)), { canBeMissing: true })[0];
    var transactionViolations = (0, useTransactionViolations_1.default)(transaction === null || transaction === void 0 ? void 0 : transaction.transactionID);
    var _h = (0, useDuplicateTransactionsAndViolations_1.default)((transaction === null || transaction === void 0 ? void 0 : transaction.transactionID) ? [transaction.transactionID] : []), duplicateTransactions = _h.duplicateTransactions, duplicateTransactionViolations = _h.duplicateTransactionViolations;
    var _j = (0, react_1.useState)(false), isDeleteModalVisible = _j[0], setIsDeleteModalVisible = _j[1];
    var _k = (0, react_1.useState)(false), downloadErrorModalVisible = _k[0], setDownloadErrorModalVisible = _k[1];
    var _l = (0, react_1.useState)(false), isHoldEducationalModalVisible = _l[0], setIsHoldEducationalModalVisible = _l[1];
    var _m = (0, react_1.useState)(null), rejectModalAction = _m[0], setRejectModalAction = _m[1];
    var dismissedRejectUseExplanation = (0, useOnyx_1.default)(ONYXKEYS_1.default.NVP_DISMISSED_REJECT_USE_EXPLANATION, { canBeMissing: true })[0];
    var dismissedHoldUseExplanation = (0, useOnyx_1.default)(ONYXKEYS_1.default.NVP_DISMISSED_HOLD_USE_EXPLANATION, { canBeMissing: true })[0];
    var shouldShowLoadingBar = (0, useLoadingBarVisibility_1.default)();
    var styles = (0, useThemeStyles_1.default)();
    var theme = (0, useTheme_1.default)();
    var translate = (0, useLocalize_1.default)().translate;
    var currentUserLogin = (0, useCurrentUserPersonalDetails_1.default)().login;
    var isOnHold = (0, TransactionUtils_1.isOnHold)(transaction);
    var isDuplicate = (0, TransactionUtils_1.isDuplicate)(transaction);
    var reportID = report === null || report === void 0 ? void 0 : report.reportID;
    var _o = (0, SearchContext_1.useSearchContext)(), removeTransaction = _o.removeTransaction, currentSearchHash = _o.currentSearchHash;
    var isExpenseSplit = (0, TransactionUtils_1.getOriginalTransactionWithSplitInfo)(transaction).isExpenseSplit;
    var allTransactions = (0, useOnyx_1.default)(ONYXKEYS_1.default.COLLECTION.TRANSACTION, { canBeMissing: false })[0];
    var allReports = (0, useOnyx_1.default)(ONYXKEYS_1.default.COLLECTION.REPORT, { canBeMissing: false })[0];
    var deleteTransactions = (0, useDeleteTransactions_1.default)({ report: parentReport, reportActions: parentReportAction ? [parentReportAction] : [], policy: policy }).deleteTransactions;
    var _p = (0, react_1.useContext)(DelegateNoAccessModalProvider_1.DelegateNoAccessContext), isDelegateAccessRestricted = _p.isDelegateAccessRestricted, showDelegateNoAccessModal = _p.showDelegateNoAccessModal;
    var isReportInRHP = route.name === SCREENS_1.default.SEARCH.REPORT_RHP;
    var isFromReviewDuplicates = !!((_f = route.params.backTo) === null || _f === void 0 ? void 0 : _f.replace(/\?.*/g, '').endsWith('/duplicates/review'));
    var shouldDisplayTransactionNavigation = !!(reportID && isReportInRHP);
    var isParentReportArchived = (0, useReportIsArchived_1.default)(report === null || report === void 0 ? void 0 : report.parentReportID);
    var _q = (0, useGetIOUReportFromReportAction_1.default)(parentReportAction), iouReport = _q.iouReport, chatIOUReport = _q.chatReport, isChatIOUReportArchived = _q.isChatIOUReportArchived;
    var hasPendingRTERViolation = (0, TransactionUtils_1.hasPendingRTERViolation)(transactionViolations);
    var shouldShowBrokenConnectionViolation = (0, TransactionUtils_1.shouldShowBrokenConnectionViolation)(parentReport, policy, transactionViolations);
    var isReportSubmitter = (0, ReportUtils_1.isCurrentUserSubmitter)(chatIOUReport);
    // If the parent report is a selfDM, it should always be opened in the Inbox tab
    var shouldOpenParentReportInCurrentTab = !(0, ReportUtils_1.isSelfDM)(parentReport);
    var wideRHPRouteKeys = (0, react_1.useContext)(WideRHPContextProvider_1.WideRHPContext).wideRHPRouteKeys;
    var network = (0, useOnyx_1.default)(ONYXKEYS_1.default.NETWORK, { canBeMissing: true })[0];
    var markAsCash = (0, react_1.useCallback)(function () {
        (0, Transaction_1.markAsCash)(transaction === null || transaction === void 0 ? void 0 : transaction.transactionID, reportID);
    }, [reportID, transaction === null || transaction === void 0 ? void 0 : transaction.transactionID]);
    var getStatusIcon = function (src) { return (<Icon_1.default src={src} height={variables_1.default.iconSizeSmall} width={variables_1.default.iconSizeSmall} fill={theme.icon}/>); };
    var getStatusBarProps = function () {
        if (isOnHold) {
            return { icon: getStatusIcon(Expensicons.Stopwatch), description: translate('iou.expenseOnHold') };
        }
        if ((0, ReportPrimaryActionUtils_1.isMarkAsResolvedAction)(parentReport, transactionViolations, policy)) {
            return { icon: getStatusIcon(Expensicons.Hourglass), description: translate('iou.reject.rejectedStatus') };
        }
        if (isDuplicate) {
            return { icon: getStatusIcon(Expensicons.Flag), description: translate('iou.expenseDuplicate') };
        }
        if ((0, TransactionUtils_1.isExpensifyCardTransaction)(transaction) && (0, TransactionUtils_1.isPending)(transaction)) {
            return { icon: getStatusIcon(Expensicons.CreditCardHourglass), description: translate('iou.transactionPendingDescription') };
        }
        if (shouldShowBrokenConnectionViolation) {
            return {
                icon: getStatusIcon(Expensicons.Hourglass),
                description: (<BrokenConnectionDescription_1.default transactionID={transaction === null || transaction === void 0 ? void 0 : transaction.transactionID} report={parentReport} policy={policy}/>),
            };
        }
        if (hasPendingRTERViolation) {
            return { icon: getStatusIcon(Expensicons.Hourglass), description: translate('iou.pendingMatchWithCreditCardDescription') };
        }
        if ((0, TransactionUtils_1.isScanning)(transaction)) {
            return { icon: getStatusIcon(Expensicons.ReceiptScan), description: translate('iou.receiptScanInProgressDescription') };
        }
    };
    var statusBarProps = getStatusBarProps();
    var primaryAction = (0, react_1.useMemo)(function () {
        if (!report || !parentReport || !transaction) {
            return '';
        }
        return (0, ReportPrimaryActionUtils_1.getTransactionThreadPrimaryAction)(currentUserLogin !== null && currentUserLogin !== void 0 ? currentUserLogin : '', report, parentReport, transaction, transactionViolations, policy, isFromReviewDuplicates);
    }, [parentReport, policy, report, transaction, transactionViolations, isFromReviewDuplicates, currentUserLogin]);
    var primaryActionImplementation = (_b = {},
        _b[CONST_1.default.REPORT.TRANSACTION_PRIMARY_ACTIONS.REMOVE_HOLD] = (<Button_1.default success text={translate('iou.unhold')} onPress={function () {
                (0, ReportUtils_1.changeMoneyRequestHoldStatus)(parentReportAction);
            }}/>),
        _b[CONST_1.default.REPORT.TRANSACTION_PRIMARY_ACTIONS.MARK_AS_RESOLVED] = (<Button_1.default success onPress={function () {
                if (!(transaction === null || transaction === void 0 ? void 0 : transaction.transactionID)) {
                    return;
                }
                (0, IOU_1.markRejectViolationAsResolved)(transaction === null || transaction === void 0 ? void 0 : transaction.transactionID, reportID);
            }} text={translate('iou.reject.markAsResolved')}/>),
        _b[CONST_1.default.REPORT.TRANSACTION_PRIMARY_ACTIONS.REVIEW_DUPLICATES] = (<Button_1.default success text={translate('iou.reviewDuplicates')} onPress={function () {
                if (!reportID) {
                    return;
                }
                Navigation_1.default.navigate(ROUTES_1.default.TRANSACTION_DUPLICATE_REVIEW_PAGE.getRoute(reportID, Navigation_1.default.getReportRHPActiveRoute()));
            }}/>),
        _b[CONST_1.default.REPORT.TRANSACTION_PRIMARY_ACTIONS.KEEP_THIS_ONE] = (<Button_1.default success text={translate('violations.keepThisOne')} onPress={function () {
                if (!reportID) {
                    return;
                }
                Navigation_1.default.navigate((0, TransactionPreviewUtils_1.getReviewNavigationRoute)(Navigation_1.default.getActiveRoute(), reportID, transaction, (0, TransactionUtils_1.removeSettledAndApprovedTransactions)(Object.values(duplicateTransactions !== null && duplicateTransactions !== void 0 ? duplicateTransactions : {}).filter(function (t) { return (t === null || t === void 0 ? void 0 : t.transactionID) !== (transaction === null || transaction === void 0 ? void 0 : transaction.transactionID); })), policyCategories));
            }}/>),
        _b[CONST_1.default.REPORT.TRANSACTION_PRIMARY_ACTIONS.MARK_AS_CASH] = (<Button_1.default success text={translate('iou.markAsCash')} onPress={markAsCash}/>),
        _b);
    var secondaryActions = (0, react_1.useMemo)(function () {
        if (!transaction || !parentReportAction || !parentReport) {
            return [];
        }
        return (0, ReportSecondaryActionUtils_1.getSecondaryTransactionThreadActions)(currentUserLogin !== null && currentUserLogin !== void 0 ? currentUserLogin : '', parentReport, transaction, parentReportAction, policy, report);
    }, [parentReport, transaction, parentReportAction, currentUserLogin, policy, report]);
    var dismissModalAndUpdateUseHold = function () {
        setIsHoldEducationalModalVisible(false);
        (0, User_1.setNameValuePair)(ONYXKEYS_1.default.NVP_DISMISSED_HOLD_USE_EXPLANATION, true, false, !(network === null || network === void 0 ? void 0 : network.shouldFailAllRequests));
        if (parentReportAction) {
            (0, ReportUtils_1.changeMoneyRequestHoldStatus)(parentReportAction);
        }
    };
    var dismissRejectModalBasedOnAction = function () {
        if (rejectModalAction === CONST_1.default.REPORT.TRANSACTION_SECONDARY_ACTIONS.HOLD) {
            (0, IOU_2.dismissRejectUseExplanation)();
            if (parentReportAction) {
                (0, ReportUtils_1.changeMoneyRequestHoldStatus)(parentReportAction);
            }
        }
        else {
            (0, IOU_2.dismissRejectUseExplanation)();
            if (parentReportAction) {
                (0, ReportUtils_1.rejectMoneyRequestReason)(parentReportAction);
            }
        }
        setRejectModalAction(null);
    };
    var secondaryActionsImplementation = (_c = {},
        _c[CONST_1.default.REPORT.TRANSACTION_SECONDARY_ACTIONS.HOLD] = {
            text: translate('iou.hold'),
            icon: Expensicons.Stopwatch,
            value: CONST_1.default.REPORT.TRANSACTION_SECONDARY_ACTIONS.HOLD,
            onSelected: function () {
                if (!parentReportAction) {
                    throw new Error('Parent action does not exist');
                }
                if (isDelegateAccessRestricted) {
                    showDelegateNoAccessModal();
                    return;
                }
                var isDismissed = isReportSubmitter ? dismissedHoldUseExplanation : dismissedRejectUseExplanation;
                if (isDismissed) {
                    (0, ReportUtils_1.changeMoneyRequestHoldStatus)(parentReportAction);
                }
                else if (isReportSubmitter) {
                    setIsHoldEducationalModalVisible(true);
                }
                else {
                    setRejectModalAction(CONST_1.default.REPORT.TRANSACTION_SECONDARY_ACTIONS.HOLD);
                }
            },
        },
        _c[CONST_1.default.REPORT.TRANSACTION_SECONDARY_ACTIONS.REMOVE_HOLD] = {
            text: translate('iou.unhold'),
            icon: Expensicons.Stopwatch,
            value: CONST_1.default.REPORT.TRANSACTION_SECONDARY_ACTIONS.REMOVE_HOLD,
            onSelected: function () {
                if (!parentReportAction) {
                    throw new Error('Parent action does not exist');
                }
                (0, ReportUtils_1.changeMoneyRequestHoldStatus)(parentReportAction);
            },
        },
        _c[CONST_1.default.REPORT.TRANSACTION_SECONDARY_ACTIONS.SPLIT] = {
            text: isExpenseSplit ? translate('iou.editSplits') : translate('iou.split'),
            icon: Expensicons.ArrowSplit,
            value: CONST_1.default.REPORT.SECONDARY_ACTIONS.SPLIT,
            onSelected: function () {
                (0, IOU_1.initSplitExpense)(allTransactions, allReports, transaction);
            },
        },
        _c[CONST_1.default.REPORT.TRANSACTION_SECONDARY_ACTIONS.MERGE] = {
            text: translate('common.merge'),
            icon: Expensicons.ArrowCollapse,
            value: CONST_1.default.REPORT.TRANSACTION_SECONDARY_ACTIONS.MERGE,
            onSelected: function () {
                if (!transaction) {
                    return;
                }
                (0, MergeTransaction_1.setupMergeTransactionData)(transaction.transactionID, { targetTransactionID: transaction.transactionID });
                Navigation_1.default.navigate(ROUTES_1.default.MERGE_TRANSACTION_LIST_PAGE.getRoute(transaction.transactionID, Navigation_1.default.getActiveRoute()));
            },
        },
        _c[CONST_1.default.REPORT.TRANSACTION_SECONDARY_ACTIONS.VIEW_DETAILS] = {
            value: CONST_1.default.REPORT.SECONDARY_ACTIONS.VIEW_DETAILS,
            text: translate('iou.viewDetails'),
            icon: Expensicons.Info,
            onSelected: function () {
                (0, ReportUtils_1.navigateToDetailsPage)(report, Navigation_1.default.getActiveRoute());
            },
        },
        _c[CONST_1.default.REPORT.TRANSACTION_SECONDARY_ACTIONS.DELETE] = {
            text: translate('common.delete'),
            icon: Expensicons.Trashcan,
            value: CONST_1.default.REPORT.SECONDARY_ACTIONS.DELETE,
            onSelected: function () {
                setIsDeleteModalVisible(true);
            },
        },
        _c[CONST_1.default.REPORT.TRANSACTION_SECONDARY_ACTIONS.REJECT] = {
            text: translate('common.reject'),
            icon: Expensicons.ThumbsDown,
            value: CONST_1.default.REPORT.TRANSACTION_SECONDARY_ACTIONS.REJECT,
            onSelected: function () {
                if (dismissedRejectUseExplanation) {
                    if (parentReportAction) {
                        (0, ReportUtils_1.rejectMoneyRequestReason)(parentReportAction);
                    }
                }
                else {
                    setRejectModalAction(CONST_1.default.REPORT.TRANSACTION_SECONDARY_ACTIONS.REJECT);
                }
            },
        },
        _c);
    var applicableSecondaryActions = secondaryActions.map(function (action) { return secondaryActionsImplementation[action]; });
    var shouldDisplayNarrowMoreButton = !shouldUseNarrowLayout || (wideRHPRouteKeys.length > 0 && !isSmallScreenWidth);
    return (<react_native_1.View style={[styles.pl0, styles.borderBottom]}>
            <HeaderWithBackButton_1.default shouldShowBorderBottom={false} shouldShowReportAvatarWithDisplay shouldShowPinButton={false} report={reportID
            ? __assign(__assign({}, report), { reportID: reportID, ownerAccountID: parentReport === null || parentReport === void 0 ? void 0 : parentReport.ownerAccountID }) : undefined} shouldShowBackButton={shouldUseNarrowLayout} shouldDisplaySearchRouter={!isReportInRHP} shouldDisplayHelpButton={!isReportInRHP} onBackButtonPress={function () { return onBackButtonPress(isFromReviewDuplicates); }} shouldEnableDetailPageNavigation openParentReportInCurrentTab={shouldOpenParentReportInCurrentTab}>
                {shouldDisplayNarrowMoreButton && (<react_native_1.View style={[styles.flexRow, styles.gap2, shouldDisplayTransactionNavigation && styles.mr3]}>
                        {!!primaryAction && primaryActionImplementation[primaryAction]}
                        {!!applicableSecondaryActions.length && (<ButtonWithDropdownMenu_1.default success={false} onPress={function () { }} shouldAlwaysShowDropdownMenu customText={translate('common.more')} options={applicableSecondaryActions} isSplitButton={false}/>)}
                    </react_native_1.View>)}
                {shouldDisplayTransactionNavigation && !!transaction && (<MoneyRequestReportTransactionsNavigation_1.default currentTransactionID={transaction.transactionID} isFromReviewDuplicates={isFromReviewDuplicates}/>)}
            </HeaderWithBackButton_1.default>
            {!shouldDisplayNarrowMoreButton && (<react_native_1.View style={[styles.flexRow, styles.gap2, styles.pb3, styles.ph5, styles.w100, styles.alignItemsCenter, styles.justifyContentCenter]}>
                    {!!primaryAction && <react_native_1.View style={[styles.flexGrow4]}>{primaryActionImplementation[primaryAction]}</react_native_1.View>}
                    {!!applicableSecondaryActions.length && (<ButtonWithDropdownMenu_1.default success={false} onPress={function () { }} shouldAlwaysShowDropdownMenu customText={translate('common.more')} options={applicableSecondaryActions} isSplitButton={false} wrapperStyle={[!primaryAction && styles.flexGrow4]}/>)}
                </react_native_1.View>)}
            {!!statusBarProps && (<react_native_1.View style={[styles.ph5, styles.pb3]}>
                    <MoneyRequestHeaderStatusBar_1.default icon={statusBarProps.icon} description={statusBarProps.description}/>
                </react_native_1.View>)}
            <LoadingBar_1.default shouldShow={shouldShowLoadingBar && shouldUseNarrowLayout}/>
            <DecisionModal_1.default title={translate('common.downloadFailedTitle')} prompt={translate('common.downloadFailedDescription')} isSmallScreenWidth={isSmallScreenWidth} onSecondOptionSubmit={function () { return setDownloadErrorModalVisible(false); }} secondOptionText={translate('common.buttonConfirm')} isVisible={downloadErrorModalVisible} onClose={function () { return setDownloadErrorModalVisible(false); }}/>
            <ConfirmModal_1.default title={translate('iou.deleteExpense', { count: 1 })} isVisible={isDeleteModalVisible} onConfirm={function () {
            setIsDeleteModalVisible(false);
            if (!parentReportAction || !transaction) {
                throw new Error('Data missing');
            }
            if ((0, ReportActionsUtils_1.isTrackExpenseAction)(parentReportAction)) {
                (0, IOU_1.deleteTrackExpense)({
                    chatReportID: report === null || report === void 0 ? void 0 : report.parentReportID,
                    chatReport: parentReport,
                    transactionID: transaction.transactionID,
                    reportAction: parentReportAction,
                    iouReport: iouReport,
                    chatIOUReport: chatIOUReport,
                    transactions: duplicateTransactions,
                    violations: duplicateTransactionViolations,
                    isSingleTransactionView: true,
                    isChatReportArchived: isParentReportArchived,
                    isChatIOUReportArchived: isChatIOUReportArchived,
                });
            }
            else {
                deleteTransactions([transaction.transactionID], duplicateTransactions, duplicateTransactionViolations, currentSearchHash, true);
                removeTransaction(transaction.transactionID);
            }
            onBackButtonPress();
        }} onCancel={function () { return setIsDeleteModalVisible(false); }} prompt={translate('iou.deleteConfirmation', { count: 1 })} confirmText={translate('common.delete')} cancelText={translate('common.cancel')} danger shouldEnableNewFocusManagement/>
            {!!rejectModalAction && (<HoldOrRejectEducationalModal_1.default onClose={dismissRejectModalBasedOnAction} onConfirm={dismissRejectModalBasedOnAction}/>)}
            {!!isHoldEducationalModalVisible && (<HoldSubmitterEducationalModal_1.default onClose={dismissModalAndUpdateUseHold} onConfirm={dismissModalAndUpdateUseHold}/>)}
        </react_native_1.View>);
}
MoneyRequestHeader.displayName = 'MoneyRequestHeader';
exports.default = MoneyRequestHeader;
