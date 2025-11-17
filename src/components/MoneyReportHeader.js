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
var native_1 = require("@react-navigation/native");
var Account_1 = require("@selectors/Account");
var Report_1 = require("@selectors/Report");
var react_1 = require("react");
var react_native_1 = require("react-native");
var useConfirmModal_1 = require("@hooks/useConfirmModal");
var useCurrentUserPersonalDetails_1 = require("@hooks/useCurrentUserPersonalDetails");
var useDeleteTransactions_1 = require("@hooks/useDeleteTransactions");
var useDuplicateTransactionsAndViolations_1 = require("@hooks/useDuplicateTransactionsAndViolations");
var useGetIOUReportFromReportAction_1 = require("@hooks/useGetIOUReportFromReportAction");
var useLazyAsset_1 = require("@hooks/useLazyAsset");
var useLoadingBarVisibility_1 = require("@hooks/useLoadingBarVisibility");
var useLocalize_1 = require("@hooks/useLocalize");
var useMobileSelectionMode_1 = require("@hooks/useMobileSelectionMode");
var useNetwork_1 = require("@hooks/useNetwork");
var useOnyx_1 = require("@hooks/useOnyx");
var useParticipantsInvoiceReport_1 = require("@hooks/useParticipantsInvoiceReport");
var usePaymentAnimations_1 = require("@hooks/usePaymentAnimations");
var usePaymentOptions_1 = require("@hooks/usePaymentOptions");
var usePermissions_1 = require("@hooks/usePermissions");
var usePolicy_1 = require("@hooks/usePolicy");
var useReportIsArchived_1 = require("@hooks/useReportIsArchived");
var useResponsiveLayout_1 = require("@hooks/useResponsiveLayout");
var useSearchShouldCalculateTotals_1 = require("@hooks/useSearchShouldCalculateTotals");
var useSelectedTransactionsActions_1 = require("@hooks/useSelectedTransactionsActions");
var useStrictPolicyRules_1 = require("@hooks/useStrictPolicyRules");
var useTheme_1 = require("@hooks/useTheme");
var useThemeStyles_1 = require("@hooks/useThemeStyles");
var useTransactionsAndViolationsForReport_1 = require("@hooks/useTransactionsAndViolationsForReport");
var useTransactionViolations_1 = require("@hooks/useTransactionViolations");
var Link_1 = require("@libs/actions/Link");
var MergeTransaction_1 = require("@libs/actions/MergeTransaction");
var MobileSelectionMode_1 = require("@libs/actions/MobileSelectionMode");
var Report_2 = require("@libs/actions/Report");
var Search_1 = require("@libs/actions/Search");
var User_1 = require("@libs/actions/User");
var getNonEmptyStringOnyxID_1 = require("@libs/getNonEmptyStringOnyxID");
var getPlatform_1 = require("@libs/getPlatform");
var Log_1 = require("@libs/Log");
var MoneyRequestReportUtils_1 = require("@libs/MoneyRequestReportUtils");
var Navigation_1 = require("@libs/Navigation/Navigation");
var NextStepUtils_1 = require("@libs/NextStepUtils");
var PaymentUtils_1 = require("@libs/PaymentUtils");
var PolicyUtils_1 = require("@libs/PolicyUtils");
var ReportActionsUtils_1 = require("@libs/ReportActionsUtils");
var ReportPrimaryActionUtils_1 = require("@libs/ReportPrimaryActionUtils");
var ReportSecondaryActionUtils_1 = require("@libs/ReportSecondaryActionUtils");
var ReportUtils_1 = require("@libs/ReportUtils");
var SubscriptionUtils_1 = require("@libs/SubscriptionUtils");
var TransactionUtils_1 = require("@libs/TransactionUtils");
var variables_1 = require("@styles/variables");
var IOU_1 = require("@userActions/IOU");
var Transaction_1 = require("@userActions/Transaction");
var CONST_1 = require("@src/CONST");
var ONYXKEYS_1 = require("@src/ONYXKEYS");
var ROUTES_1 = require("@src/ROUTES");
var SCREENS_1 = require("@src/SCREENS");
var ActivityIndicator_1 = require("./ActivityIndicator");
var AnimatedSubmitButton_1 = require("./AnimatedSubmitButton");
var BrokenConnectionDescription_1 = require("./BrokenConnectionDescription");
var Button_1 = require("./Button");
var ButtonWithDropdownMenu_1 = require("./ButtonWithDropdownMenu");
var DecisionModal_1 = require("./DecisionModal");
var DelegateNoAccessModalProvider_1 = require("./DelegateNoAccessModalProvider");
var Header_1 = require("./Header");
var HeaderWithBackButton_1 = require("./HeaderWithBackButton");
var HoldOrRejectEducationalModal_1 = require("./HoldOrRejectEducationalModal");
var HoldSubmitterEducationalModal_1 = require("./HoldSubmitterEducationalModal");
var Icon_1 = require("./Icon");
var Expensicons = require("./Icon/Expensicons");
var KYCWallContext_1 = require("./KYCWall/KYCWallContext");
var LoadingBar_1 = require("./LoadingBar");
var Modal_1 = require("./Modal");
var ModalContext_1 = require("./Modal/Global/ModalContext");
var MoneyReportHeaderKYCDropdown_1 = require("./MoneyReportHeaderKYCDropdown");
var MoneyReportHeaderStatusBar_1 = require("./MoneyReportHeaderStatusBar");
var MoneyReportHeaderStatusBarSkeleton_1 = require("./MoneyReportHeaderStatusBarSkeleton");
var MoneyRequestHeaderStatusBar_1 = require("./MoneyRequestHeaderStatusBar");
var MoneyRequestReportNavigation_1 = require("./MoneyRequestReportView/MoneyRequestReportNavigation");
var ProcessMoneyReportHoldMenu_1 = require("./ProcessMoneyReportHoldMenu");
var SearchContext_1 = require("./Search/SearchContext");
var AnimatedSettlementButton_1 = require("./SettlementButton/AnimatedSettlementButton");
var Text_1 = require("./Text");
var WideRHPContextProvider_1 = require("./WideRHPContextProvider");
function MoneyReportHeader(_a) {
    var _b, _c;
    var _this = this;
    var _d, _e, _f, _g, _h, _j;
    var policy = _a.policy, moneyRequestReport = _a.report, transactionThreadReportID = _a.transactionThreadReportID, reportActions = _a.reportActions, isLoadingInitialReportActions = _a.isLoadingInitialReportActions, _k = _a.shouldDisplayBackButton, shouldDisplayBackButton = _k === void 0 ? false : _k, onBackButtonPress = _a.onBackButtonPress;
    // We need to use isSmallScreenWidth instead of shouldUseNarrowLayout to use a correct layout for the hold expense modal https://github.com/Expensify/App/pull/47990#issuecomment-2362382026
    // eslint-disable-next-line rulesdir/prefer-shouldUseNarrowLayout-instead-of-isSmallScreenWidth
    var _l = (0, useResponsiveLayout_1.default)(), shouldUseNarrowLayout = _l.shouldUseNarrowLayout, isSmallScreenWidth = _l.isSmallScreenWidth, isMediumScreenWidth = _l.isMediumScreenWidth;
    var shouldDisplayNarrowVersion = shouldUseNarrowLayout || isMediumScreenWidth;
    var route = (0, native_1.useRoute)();
    var _m = (0, useCurrentUserPersonalDetails_1.default)(), currentUserLogin = _m.login, accountID = _m.accountID, email = _m.email;
    var chatReport = (0, useOnyx_1.default)("".concat(ONYXKEYS_1.default.COLLECTION.REPORT).concat(moneyRequestReport === null || moneyRequestReport === void 0 ? void 0 : moneyRequestReport.chatReportID), { canBeMissing: true })[0];
    var nextStep = (0, useOnyx_1.default)("".concat(ONYXKEYS_1.default.COLLECTION.NEXT_STEP).concat(moneyRequestReport === null || moneyRequestReport === void 0 ? void 0 : moneyRequestReport.reportID), { canBeMissing: true })[0];
    var isUserValidated = (0, useOnyx_1.default)(ONYXKEYS_1.default.ACCOUNT, { selector: Account_1.isUserValidatedSelector, canBeMissing: true })[0];
    var transactionThreadReport = (0, useOnyx_1.default)("".concat(ONYXKEYS_1.default.COLLECTION.REPORT).concat(transactionThreadReportID), { canBeMissing: true })[0];
    var reportPDFFilename = ((_d = (0, useOnyx_1.default)("".concat(ONYXKEYS_1.default.COLLECTION.NVP_EXPENSIFY_REPORT_PDF_FILENAME).concat(moneyRequestReport === null || moneyRequestReport === void 0 ? void 0 : moneyRequestReport.reportID), { canBeMissing: true })) !== null && _d !== void 0 ? _d : null)[0];
    var download = (0, useOnyx_1.default)("".concat(ONYXKEYS_1.default.COLLECTION.DOWNLOAD).concat(reportPDFFilename), { canBeMissing: true })[0];
    var isDownloadingPDF = (_e = download === null || download === void 0 ? void 0 : download.isDownloading) !== null && _e !== void 0 ? _e : false;
    var session = (0, useOnyx_1.default)(ONYXKEYS_1.default.SESSION, { canBeMissing: false })[0];
    var activePolicyID = (0, useOnyx_1.default)(ONYXKEYS_1.default.NVP_ACTIVE_POLICY_ID, { canBeMissing: true })[0];
    var activePolicy = (0, usePolicy_1.default)(activePolicyID);
    var integrationsExportTemplates = (0, useOnyx_1.default)(ONYXKEYS_1.default.NVP_INTEGRATION_SERVER_EXPORT_TEMPLATES, { canBeMissing: true })[0];
    var csvExportLayouts = (0, useOnyx_1.default)(ONYXKEYS_1.default.NVP_CSV_EXPORT_LAYOUTS, { canBeMissing: true })[0];
    var expensifyIcons = (0, useLazyAsset_1.useMemoizedLazyExpensifyIcons)(['Buildings']);
    var lastDistanceExpenseType = (0, useOnyx_1.default)(ONYXKEYS_1.default.NVP_LAST_DISTANCE_EXPENSE_TYPE, { canBeMissing: true })[0];
    var translate = (0, useLocalize_1.default)().translate;
    var exportTemplates = (0, react_1.useMemo)(function () { return (0, Search_1.getExportTemplates)(integrationsExportTemplates !== null && integrationsExportTemplates !== void 0 ? integrationsExportTemplates : [], csvExportLayouts !== null && csvExportLayouts !== void 0 ? csvExportLayouts : {}, translate, policy); }, [integrationsExportTemplates, csvExportLayouts, policy, translate]);
    var areStrictPolicyRulesEnabled = (0, useStrictPolicyRules_1.default)().areStrictPolicyRulesEnabled;
    var allTransactions = (0, useOnyx_1.default)(ONYXKEYS_1.default.COLLECTION.TRANSACTION, { canBeMissing: false })[0];
    var allReports = (0, useOnyx_1.default)(ONYXKEYS_1.default.COLLECTION.REPORT, { canBeMissing: false })[0];
    var requestParentReportAction = (0, react_1.useMemo)(function () {
        if (!reportActions || !(transactionThreadReport === null || transactionThreadReport === void 0 ? void 0 : transactionThreadReport.parentReportActionID)) {
            return null;
        }
        return reportActions.find(function (action) { return action.reportActionID === transactionThreadReport.parentReportActionID; });
    }, [reportActions, transactionThreadReport === null || transactionThreadReport === void 0 ? void 0 : transactionThreadReport.parentReportActionID]);
    var _o = (0, useGetIOUReportFromReportAction_1.default)(requestParentReportAction), iouReport = _o.iouReport, chatIOUReport = _o.chatReport, isChatIOUReportArchived = _o.isChatIOUReportArchived;
    var _p = (0, useTransactionsAndViolationsForReport_1.default)(moneyRequestReport === null || moneyRequestReport === void 0 ? void 0 : moneyRequestReport.reportID), reportTransactions = _p.transactions, violations = _p.violations;
    var transactions = (0, react_1.useMemo)(function () {
        return Object.values(reportTransactions);
    }, [reportTransactions]);
    var shouldBlockSubmit = (0, react_1.useMemo)(function () {
        return (0, ReportUtils_1.shouldBlockSubmitDueToStrictPolicyRules)(moneyRequestReport === null || moneyRequestReport === void 0 ? void 0 : moneyRequestReport.reportID, violations, areStrictPolicyRulesEnabled, transactions);
    }, [moneyRequestReport === null || moneyRequestReport === void 0 ? void 0 : moneyRequestReport.reportID, violations, areStrictPolicyRulesEnabled, transactions]);
    var iouTransactionID = (0, ReportActionsUtils_1.isMoneyRequestAction)(requestParentReportAction) ? (_f = (0, ReportActionsUtils_1.getOriginalMessage)(requestParentReportAction)) === null || _f === void 0 ? void 0 : _f.IOUTransactionID : undefined;
    var transaction = (0, useOnyx_1.default)("".concat(ONYXKEYS_1.default.COLLECTION.TRANSACTION).concat((0, getNonEmptyStringOnyxID_1.default)(iouTransactionID)), {
        canBeMissing: true,
    })[0];
    var dismissedRejectUseExplanation = (0, useOnyx_1.default)(ONYXKEYS_1.default.NVP_DISMISSED_REJECT_USE_EXPLANATION, { canBeMissing: true })[0];
    var dismissedHoldUseExplanation = (0, useOnyx_1.default)(ONYXKEYS_1.default.NVP_DISMISSED_HOLD_USE_EXPLANATION, { canBeMissing: true })[0];
    var invoiceReceiverPolicy = (0, useOnyx_1.default)("".concat(ONYXKEYS_1.default.COLLECTION.POLICY).concat((chatReport === null || chatReport === void 0 ? void 0 : chatReport.invoiceReceiver) && 'policyID' in chatReport.invoiceReceiver ? chatReport.invoiceReceiver.policyID : undefined), { canBeMissing: true })[0];
    var _q = (0, useDuplicateTransactionsAndViolations_1.default)(transactions.map(function (t) { return t.transactionID; })), duplicateTransactions = _q.duplicateTransactions, duplicateTransactionViolations = _q.duplicateTransactionViolations;
    var deleteTransactions = (0, useDeleteTransactions_1.default)({ report: chatReport, reportActions: reportActions, policy: policy }).deleteTransactions;
    var isExported = (0, react_1.useMemo)(function () { return (0, ReportUtils_1.isExported)(reportActions); }, [reportActions]);
    // wrapped in useMemo to improve performance because this is an operation on array
    var integrationNameFromExportMessage = (0, react_1.useMemo)(function () {
        if (!isExported) {
            return null;
        }
        return (0, ReportUtils_1.getIntegrationNameFromExportMessage)(reportActions);
    }, [isExported, reportActions]);
    var transactionViolations = (0, useTransactionViolations_1.default)(transaction === null || transaction === void 0 ? void 0 : transaction.transactionID);
    var _r = (0, react_1.useState)(false), downloadErrorModalVisible = _r[0], setDownloadErrorModalVisible = _r[1];
    var _s = (0, react_1.useState)(false), isPDFModalVisible = _s[0], setIsPDFModalVisible = _s[1];
    var introSelected = (0, useOnyx_1.default)(ONYXKEYS_1.default.NVP_INTRO_SELECTED, { canBeMissing: true })[0];
    var allTransactionViolations = (0, useOnyx_1.default)(ONYXKEYS_1.default.COLLECTION.TRANSACTION_VIOLATIONS, { canBeMissing: true })[0];
    var isBetaEnabled = (0, usePermissions_1.default)().isBetaEnabled;
    var isASAPSubmitBetaEnabled = isBetaEnabled(CONST_1.default.BETAS.ASAP_SUBMIT);
    var hasViolations = (0, ReportUtils_1.hasViolations)(moneyRequestReport === null || moneyRequestReport === void 0 ? void 0 : moneyRequestReport.reportID, allTransactionViolations);
    var _t = (0, react_1.useState)(null), exportModalStatus = _t[0], setExportModalStatus = _t[1];
    var showConfirmModal = (0, useConfirmModal_1.default)().showConfirmModal;
    var _u = (0, usePaymentAnimations_1.default)(), isPaidAnimationRunning = _u.isPaidAnimationRunning, isApprovedAnimationRunning = _u.isApprovedAnimationRunning, isSubmittingAnimationRunning = _u.isSubmittingAnimationRunning, startAnimation = _u.startAnimation, stopAnimation = _u.stopAnimation, startApprovedAnimation = _u.startApprovedAnimation, startSubmittingAnimation = _u.startSubmittingAnimation;
    var styles = (0, useThemeStyles_1.default)();
    var theme = (0, useTheme_1.default)();
    var isOffline = (0, useNetwork_1.default)().isOffline;
    var isExpenseSplit = (0, TransactionUtils_1.getOriginalTransactionWithSplitInfo)(transaction).isExpenseSplit;
    var policies = (0, useOnyx_1.default)(ONYXKEYS_1.default.COLLECTION.POLICY, { canBeMissing: true })[0];
    var _v = (0, react_1.useState)(false), isHoldMenuVisible = _v[0], setIsHoldMenuVisible = _v[1];
    var _w = (0, react_1.useState)(), paymentType = _w[0], setPaymentType = _w[1];
    var _x = (0, react_1.useState)(), requestType = _x[0], setRequestType = _x[1];
    var canAllowSettlement = (0, ReportUtils_1.hasUpdatedTotal)(moneyRequestReport, policy);
    var policyType = policy === null || policy === void 0 ? void 0 : policy.type;
    var connectedIntegration = (0, PolicyUtils_1.getValidConnectedIntegration)(policy);
    var connectedIntegrationFallback = (0, PolicyUtils_1.getConnectedIntegration)(policy);
    var hasScanningReceipt = (0, ReportUtils_1.getTransactionsWithReceipts)(moneyRequestReport === null || moneyRequestReport === void 0 ? void 0 : moneyRequestReport.reportID).some(function (t) { return (0, TransactionUtils_1.isScanning)(t); });
    var hasOnlyPendingTransactions = (0, react_1.useMemo)(function () {
        return !!transactions && transactions.length > 0 && transactions.every(function (t) { return (0, TransactionUtils_1.isExpensifyCardTransaction)(t) && (0, TransactionUtils_1.isPending)(t); });
    }, [transactions]);
    var transactionIDs = (0, react_1.useMemo)(function () { var _a; return (_a = transactions === null || transactions === void 0 ? void 0 : transactions.map(function (t) { return t.transactionID; })) !== null && _a !== void 0 ? _a : []; }, [transactions]);
    var messagePDF = (0, react_1.useMemo)(function () {
        if (reportPDFFilename === CONST_1.default.REPORT_DETAILS_MENU_ITEM.ERROR) {
            return translate('reportDetailsPage.errorPDF');
        }
        return translate('reportDetailsPage.waitForPDF');
    }, [reportPDFFilename, translate]);
    // Check if there is pending rter violation in all transactionViolations with given transactionIDs.
    // wrapped in useMemo to avoid unnecessary re-renders and for better performance (array operation inside of function)
    var hasAllPendingRTERViolations = (0, react_1.useMemo)(function () { return (0, TransactionUtils_1.allHavePendingRTERViolation)(transactions, violations); }, [transactions, violations]);
    // Check if user should see broken connection violation warning.
    var shouldShowBrokenConnectionViolation = (0, TransactionUtils_1.shouldShowBrokenConnectionViolationForMultipleTransactions)(transactionIDs, moneyRequestReport, policy, violations);
    var hasOnlyHeldExpenses = (0, ReportUtils_1.hasOnlyHeldExpenses)(moneyRequestReport === null || moneyRequestReport === void 0 ? void 0 : moneyRequestReport.reportID);
    var isPayAtEndExpense = (0, TransactionUtils_1.isPayAtEndExpense)(transaction);
    var isArchivedReport = (0, useReportIsArchived_1.default)(moneyRequestReport === null || moneyRequestReport === void 0 ? void 0 : moneyRequestReport.reportID);
    var isChatReportArchived = (0, useReportIsArchived_1.default)(chatReport === null || chatReport === void 0 ? void 0 : chatReport.reportID);
    var archiveReason = (0, useOnyx_1.default)("".concat(ONYXKEYS_1.default.COLLECTION.REPORT_ACTIONS).concat(moneyRequestReport === null || moneyRequestReport === void 0 ? void 0 : moneyRequestReport.reportID), { selector: Report_1.default, canBeMissing: true })[0];
    var reportNameValuePairs = (0, useOnyx_1.default)("".concat(ONYXKEYS_1.default.COLLECTION.REPORT_NAME_VALUE_PAIRS).concat(moneyRequestReport === null || moneyRequestReport === void 0 ? void 0 : moneyRequestReport.reportID), { canBeMissing: true })[0];
    var getCanIOUBePaid = (0, react_1.useCallback)(function (onlyShowPayElsewhere, shouldCheckApprovedState) {
        if (onlyShowPayElsewhere === void 0) { onlyShowPayElsewhere = false; }
        if (shouldCheckApprovedState === void 0) { shouldCheckApprovedState = true; }
        return (0, IOU_1.canIOUBePaid)(moneyRequestReport, chatReport, policy, transaction ? [transaction] : undefined, onlyShowPayElsewhere, undefined, undefined, shouldCheckApprovedState);
    }, [moneyRequestReport, chatReport, policy, transaction]);
    var isInvoiceReport = (0, ReportUtils_1.isInvoiceReport)(moneyRequestReport);
    var _y = (0, react_1.useState)(false), isDownloadErrorModalVisible = _y[0], setIsDownloadErrorModalVisible = _y[1];
    var _z = (0, react_1.useState)(false), isHoldEducationalModalVisible = _z[0], setIsHoldEducationalModalVisible = _z[1];
    var _0 = (0, react_1.useState)(null), rejectModalAction = _0[0], setRejectModalAction = _0[1];
    var _1 = (0, SearchContext_1.useSearchContext)(), selectedTransactionIDs = _1.selectedTransactionIDs, removeTransaction = _1.removeTransaction, clearSelectedTransactions = _1.clearSelectedTransactions, currentSearchQueryJSON = _1.currentSearchQueryJSON, currentSearchKey = _1.currentSearchKey, currentSearchHash = _1.currentSearchHash;
    var shouldCalculateTotals = (0, useSearchShouldCalculateTotals_1.default)(currentSearchKey, currentSearchQueryJSON === null || currentSearchQueryJSON === void 0 ? void 0 : currentSearchQueryJSON.similarSearchHash, true);
    var wideRHPRouteKeys = (0, react_1.useContext)(WideRHPContextProvider_1.WideRHPContext).wideRHPRouteKeys;
    var network = (0, useOnyx_1.default)(ONYXKEYS_1.default.NETWORK, { canBeMissing: true })[0];
    var shouldDisplayNarrowMoreButton = !shouldDisplayNarrowVersion || (wideRHPRouteKeys.length > 0 && !isSmallScreenWidth);
    var showExportProgressModal = (0, react_1.useCallback)(function () {
        return showConfirmModal({
            title: translate('export.exportInProgress'),
            prompt: translate('export.conciergeWillSend'),
            confirmText: translate('common.buttonConfirm'),
            shouldShowCancelButton: false,
        });
    }, [showConfirmModal, translate]);
    var beginExportWithTemplate = (0, react_1.useCallback)(function (templateName, templateType, transactionIDList, policyID) {
        if (!moneyRequestReport) {
            return;
        }
        showExportProgressModal().then(function (result) {
            if (result.action !== ModalContext_1.ModalActions.CONFIRM) {
                return;
            }
            clearSelectedTransactions(undefined, true);
        });
        (0, Search_1.queueExportSearchWithTemplate)({
            templateName: templateName,
            templateType: templateType,
            jsonQuery: '{}',
            reportIDList: [moneyRequestReport.reportID],
            transactionIDList: transactionIDList,
            policyID: policyID,
        });
    }, [moneyRequestReport, showExportProgressModal, clearSelectedTransactions]);
    var _2 = (0, react_1.useState)(false), offlineModalVisible = _2[0], setOfflineModalVisible = _2[1];
    var _3 = (0, useSelectedTransactionsActions_1.default)({
        report: moneyRequestReport,
        reportActions: reportActions,
        allTransactionsLength: transactions.length,
        session: session,
        onExportFailed: function () { return setIsDownloadErrorModalVisible(true); },
        onExportOffline: function () { return setOfflineModalVisible(true); },
        policy: policy,
        beginExportWithTemplate: function (templateName, templateType, transactionIDList, policyID) { return beginExportWithTemplate(templateName, templateType, transactionIDList, policyID); },
    }), originalSelectedTransactionsOptions = _3.options, handleDeleteTransactions = _3.handleDeleteTransactions;
    var canIOUBePaid = (0, react_1.useMemo)(function () { return getCanIOUBePaid(); }, [getCanIOUBePaid]);
    var onlyShowPayElsewhere = (0, react_1.useMemo)(function () { return !canIOUBePaid && getCanIOUBePaid(true); }, [canIOUBePaid, getCanIOUBePaid]);
    var shouldShowPayButton = isPaidAnimationRunning || canIOUBePaid || onlyShowPayElsewhere;
    var shouldShowApproveButton = (0, react_1.useMemo)(function () { return ((0, IOU_1.canApproveIOU)(moneyRequestReport, policy, transactions) && !hasOnlyPendingTransactions) || isApprovedAnimationRunning; }, [moneyRequestReport, policy, transactions, hasOnlyPendingTransactions, isApprovedAnimationRunning]);
    var shouldDisableApproveButton = shouldShowApproveButton && !(0, ReportUtils_1.isAllowedToApproveExpenseReport)(moneyRequestReport);
    var isFromPaidPolicy = policyType === CONST_1.default.POLICY.TYPE.TEAM || policyType === CONST_1.default.POLICY.TYPE.CORPORATE;
    var hasDuplicates = (0, TransactionUtils_1.hasDuplicateTransactions)(moneyRequestReport === null || moneyRequestReport === void 0 ? void 0 : moneyRequestReport.reportID);
    var shouldShowMarkAsResolved = (0, ReportPrimaryActionUtils_1.isMarkAsResolvedAction)(moneyRequestReport, transactionViolations);
    var shouldShowStatusBar = hasAllPendingRTERViolations ||
        shouldShowBrokenConnectionViolation ||
        hasOnlyHeldExpenses ||
        hasScanningReceipt ||
        isPayAtEndExpense ||
        hasOnlyPendingTransactions ||
        hasDuplicates ||
        shouldShowMarkAsResolved;
    // When prevent self-approval is enabled & the current user is submitter AND they're submitting to themselves, we need to show the optimistic next step
    // We should always show this optimistic message for policies with preventSelfApproval
    // to avoid any flicker during transitions between online/offline states
    var nextApproverAccountID = (0, ReportUtils_1.getNextApproverAccountID)(moneyRequestReport);
    var isSubmitterSameAsNextApprover = (0, ReportUtils_1.isReportOwner)(moneyRequestReport) && nextApproverAccountID === (moneyRequestReport === null || moneyRequestReport === void 0 ? void 0 : moneyRequestReport.ownerAccountID);
    var optimisticNextStep = isSubmitterSameAsNextApprover && (policy === null || policy === void 0 ? void 0 : policy.preventSelfApproval) ? (0, NextStepUtils_1.buildOptimisticNextStepForPreventSelfApprovalsEnabled)() : nextStep;
    if (shouldBlockSubmit && (0, ReportUtils_1.isReportOwner)(moneyRequestReport)) {
        optimisticNextStep = (0, NextStepUtils_1.buildOptimisticNextStepForStrictPolicyRuleViolations)();
    }
    var shouldShowNextStep = isFromPaidPolicy && !isInvoiceReport && !shouldShowStatusBar;
    var _4 = (0, ReportUtils_1.getNonHeldAndFullAmount)(moneyRequestReport, shouldShowPayButton), nonHeldAmount = _4.nonHeldAmount, fullAmount = _4.fullAmount, hasValidNonHeldAmount = _4.hasValidNonHeldAmount;
    var isAnyTransactionOnHold = (0, ReportUtils_1.hasHeldExpenses)(moneyRequestReport === null || moneyRequestReport === void 0 ? void 0 : moneyRequestReport.reportID);
    var _5 = (0, react_1.useContext)(DelegateNoAccessModalProvider_1.DelegateNoAccessContext), isDelegateAccessRestricted = _5.isDelegateAccessRestricted, showDelegateNoAccessModal = _5.showDelegateNoAccessModal;
    var shouldShowLoadingBar = (0, useLoadingBarVisibility_1.default)();
    var kycWallRef = (0, react_1.useContext)(KYCWallContext_1.KYCWallContext);
    var isReportInRHP = route.name === SCREENS_1.default.SEARCH.REPORT_RHP;
    var shouldDisplaySearchRouter = !isReportInRHP || isSmallScreenWidth;
    var isReportInSearch = route.name === SCREENS_1.default.SEARCH.MONEY_REQUEST_REPORT;
    var isReportSubmitter = (0, ReportUtils_1.isCurrentUserSubmitter)(chatIOUReport);
    var existingB2BInvoiceReport = (0, useParticipantsInvoiceReport_1.default)(activePolicyID, CONST_1.default.REPORT.INVOICE_RECEIVER_TYPE.BUSINESS, chatReport === null || chatReport === void 0 ? void 0 : chatReport.policyID);
    var confirmPayment = (0, react_1.useCallback)(function (type, payAsBusiness, methodID, paymentMethod) {
        if (!type || !chatReport) {
            return;
        }
        setPaymentType(type);
        setRequestType(CONST_1.default.IOU.REPORT_ACTION_TYPE.PAY);
        if (isDelegateAccessRestricted) {
            showDelegateNoAccessModal();
        }
        else if (isAnyTransactionOnHold) {
            if ((0, getPlatform_1.default)() === CONST_1.default.PLATFORM.IOS) {
                // eslint-disable-next-line @typescript-eslint/no-deprecated
                react_native_1.InteractionManager.runAfterInteractions(function () { return setIsHoldMenuVisible(true); });
            }
            else {
                setIsHoldMenuVisible(true);
            }
        }
        else if (isInvoiceReport) {
            startAnimation();
            (0, IOU_1.payInvoice)(type, chatReport, moneyRequestReport, introSelected, payAsBusiness, existingB2BInvoiceReport, methodID, paymentMethod, activePolicy);
        }
        else {
            startAnimation();
            (0, IOU_1.payMoneyRequest)(type, chatReport, moneyRequestReport, introSelected, undefined, true, activePolicy);
            if (currentSearchQueryJSON) {
                (0, Search_1.search)({
                    searchKey: currentSearchKey,
                    shouldCalculateTotals: shouldCalculateTotals,
                    offset: 0,
                    queryJSON: currentSearchQueryJSON,
                    isOffline: isOffline,
                });
            }
        }
    }, [
        chatReport,
        isDelegateAccessRestricted,
        isAnyTransactionOnHold,
        isInvoiceReport,
        showDelegateNoAccessModal,
        startAnimation,
        moneyRequestReport,
        introSelected,
        existingB2BInvoiceReport,
        shouldCalculateTotals,
        activePolicy,
        currentSearchQueryJSON,
        currentSearchKey,
        isOffline,
    ]);
    var showDWEModal = function () { return __awaiter(_this, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, showConfirmModal({
                        confirmText: translate('customApprovalWorkflow.goToExpensifyClassic'),
                        title: translate('customApprovalWorkflow.title'),
                        prompt: translate('customApprovalWorkflow.description'),
                        shouldShowCancelButton: false,
                    })];
                case 1:
                    result = _a.sent();
                    if (result.action === ModalContext_1.ModalActions.CONFIRM) {
                        (0, Link_1.openOldDotLink)(CONST_1.default.OLDDOT_URLS.INBOX);
                    }
                    return [2 /*return*/];
            }
        });
    }); };
    var confirmApproval = function () {
        if ((0, PolicyUtils_1.hasDynamicExternalWorkflow)(policy)) {
            showDWEModal();
            return;
        }
        setRequestType(CONST_1.default.IOU.REPORT_ACTION_TYPE.APPROVE);
        if (isDelegateAccessRestricted) {
            showDelegateNoAccessModal();
        }
        else if (isAnyTransactionOnHold) {
            setIsHoldMenuVisible(true);
        }
        else {
            startApprovedAnimation();
            (0, IOU_1.approveMoneyRequest)(moneyRequestReport, policy, accountID, email !== null && email !== void 0 ? email : '', hasViolations, isASAPSubmitBetaEnabled, true);
        }
    };
    var markAsCash = (0, react_1.useCallback)(function () {
        if (!requestParentReportAction) {
            return;
        }
        var reportID = transactionThreadReport === null || transactionThreadReport === void 0 ? void 0 : transactionThreadReport.reportID;
        if (!iouTransactionID || !reportID) {
            return;
        }
        (0, Transaction_1.markAsCash)(iouTransactionID, reportID);
    }, [iouTransactionID, requestParentReportAction, transactionThreadReport === null || transactionThreadReport === void 0 ? void 0 : transactionThreadReport.reportID]);
    var getStatusIcon = function (src) { return (<Icon_1.default src={src} height={variables_1.default.iconSizeSmall} width={variables_1.default.iconSizeSmall} fill={theme.icon}/>); };
    var getStatusBarProps = function () {
        if (shouldShowMarkAsResolved) {
            return { icon: getStatusIcon(Expensicons.Hourglass), description: translate('iou.reject.rejectedStatus') };
        }
        if (isPayAtEndExpense) {
            if (!isArchivedReport) {
                return { icon: getStatusIcon(Expensicons.Hourglass), description: translate('iou.bookingPendingDescription') };
            }
            if (isArchivedReport && archiveReason === CONST_1.default.REPORT.ARCHIVE_REASON.BOOKING_END_DATE_HAS_PASSED) {
                return { icon: getStatusIcon(Expensicons.Box), description: translate('iou.bookingArchivedDescription') };
            }
        }
        if (hasOnlyHeldExpenses) {
            return { icon: getStatusIcon(Expensicons.Stopwatch), description: translate(transactions.length > 1 ? 'iou.expensesOnHold' : 'iou.expenseOnHold') };
        }
        if (hasDuplicates) {
            return { icon: getStatusIcon(Expensicons.Flag), description: translate('iou.duplicateTransaction', { isSubmitted: (0, ReportUtils_1.isProcessingReport)(moneyRequestReport) }) };
        }
        if (!!(transaction === null || transaction === void 0 ? void 0 : transaction.transactionID) && shouldShowBrokenConnectionViolation) {
            return {
                icon: getStatusIcon(Expensicons.Hourglass),
                description: (<BrokenConnectionDescription_1.default transactionID={transaction === null || transaction === void 0 ? void 0 : transaction.transactionID} report={moneyRequestReport} policy={policy}/>),
            };
        }
        if (hasAllPendingRTERViolations) {
            return { icon: getStatusIcon(Expensicons.Hourglass), description: translate('iou.pendingMatchWithCreditCardDescription') };
        }
        if (hasOnlyPendingTransactions) {
            return { icon: getStatusIcon(Expensicons.CreditCardHourglass), description: translate('iou.transactionPendingDescription') };
        }
        if (hasScanningReceipt) {
            return { icon: getStatusIcon(Expensicons.ReceiptScan), description: translate('iou.receiptScanInProgressDescription') };
        }
    };
    var getFirstDuplicateThreadID = function (transactionsList, allReportActions) {
        var duplicateTransaction = transactionsList.find(function (reportTransaction) { return (0, TransactionUtils_1.isDuplicate)(reportTransaction); });
        if (!duplicateTransaction) {
            return null;
        }
        return (0, MoneyRequestReportUtils_1.getThreadReportIDsForTransactions)(allReportActions, [duplicateTransaction]).at(0);
    };
    var statusBarProps = getStatusBarProps();
    var dismissModalAndUpdateUseHold = function () {
        setIsHoldEducationalModalVisible(false);
        (0, User_1.setNameValuePair)(ONYXKEYS_1.default.NVP_DISMISSED_HOLD_USE_EXPLANATION, true, false, !(network === null || network === void 0 ? void 0 : network.shouldFailAllRequests));
        if (requestParentReportAction) {
            (0, ReportUtils_1.changeMoneyRequestHoldStatus)(requestParentReportAction);
        }
    };
    var dismissRejectModalBasedOnAction = function () {
        if (rejectModalAction === CONST_1.default.REPORT.TRANSACTION_SECONDARY_ACTIONS.HOLD) {
            (0, IOU_1.dismissRejectUseExplanation)();
            if (requestParentReportAction) {
                (0, ReportUtils_1.changeMoneyRequestHoldStatus)(requestParentReportAction);
            }
        }
        else {
            (0, IOU_1.dismissRejectUseExplanation)();
            if (requestParentReportAction) {
                (0, ReportUtils_1.rejectMoneyRequestReason)(requestParentReportAction);
            }
        }
        setRejectModalAction(null);
    };
    var primaryAction = (0, react_1.useMemo)(function () {
        return (0, ReportPrimaryActionUtils_1.getReportPrimaryAction)({
            currentUserEmail: currentUserLogin !== null && currentUserLogin !== void 0 ? currentUserLogin : '',
            report: moneyRequestReport,
            chatReport: chatReport,
            reportTransactions: transactions,
            violations: violations,
            policy: policy,
            reportNameValuePairs: reportNameValuePairs,
            reportActions: reportActions,
            isChatReportArchived: isChatReportArchived,
            invoiceReceiverPolicy: invoiceReceiverPolicy,
            isPaidAnimationRunning: isPaidAnimationRunning,
            isApprovedAnimationRunning: isApprovedAnimationRunning,
            isSubmittingAnimationRunning: isSubmittingAnimationRunning,
        });
    }, [
        isPaidAnimationRunning,
        isApprovedAnimationRunning,
        isSubmittingAnimationRunning,
        moneyRequestReport,
        chatReport,
        transactions,
        violations,
        policy,
        reportNameValuePairs,
        reportActions,
        isChatReportArchived,
        invoiceReceiverPolicy,
        currentUserLogin,
    ]);
    var confirmExport = (0, react_1.useCallback)(function () {
        setExportModalStatus(null);
        if (!(moneyRequestReport === null || moneyRequestReport === void 0 ? void 0 : moneyRequestReport.reportID) || !connectedIntegration) {
            return;
        }
        if (exportModalStatus === CONST_1.default.REPORT.EXPORT_OPTIONS.EXPORT_TO_INTEGRATION) {
            (0, Report_2.exportToIntegration)(moneyRequestReport === null || moneyRequestReport === void 0 ? void 0 : moneyRequestReport.reportID, connectedIntegration);
        }
        else if (exportModalStatus === CONST_1.default.REPORT.EXPORT_OPTIONS.MARK_AS_EXPORTED) {
            (0, Report_2.markAsManuallyExported)(moneyRequestReport === null || moneyRequestReport === void 0 ? void 0 : moneyRequestReport.reportID, connectedIntegration);
        }
    }, [connectedIntegration, exportModalStatus, moneyRequestReport === null || moneyRequestReport === void 0 ? void 0 : moneyRequestReport.reportID]);
    var getAmount = function (actionType) { return ({
        formattedAmount: (0, MoneyRequestReportUtils_1.getTotalAmountForIOUReportPreviewButton)(moneyRequestReport, policy, actionType),
    }); };
    var totalAmount = (hasOnlyHeldExpenses ? getAmount(CONST_1.default.REPORT.REPORT_PREVIEW_ACTIONS.REVIEW) : getAmount(CONST_1.default.REPORT.PRIMARY_ACTIONS.PAY)).formattedAmount;
    var paymentButtonOptions = (0, usePaymentOptions_1.default)({
        currency: moneyRequestReport === null || moneyRequestReport === void 0 ? void 0 : moneyRequestReport.currency,
        iouReport: moneyRequestReport,
        chatReportID: chatReport === null || chatReport === void 0 ? void 0 : chatReport.reportID,
        formattedAmount: totalAmount,
        policyID: moneyRequestReport === null || moneyRequestReport === void 0 ? void 0 : moneyRequestReport.policyID,
        onPress: confirmPayment,
        shouldHidePaymentOptions: !shouldShowPayButton,
        shouldShowApproveButton: shouldShowApproveButton,
        shouldDisableApproveButton: shouldDisableApproveButton,
        onlyShowPayElsewhere: onlyShowPayElsewhere,
    });
    var addExpenseDropdownOptions = (0, react_1.useMemo)(function () { return (0, ReportUtils_1.getAddExpenseDropdownOptions)(moneyRequestReport === null || moneyRequestReport === void 0 ? void 0 : moneyRequestReport.reportID, policy, undefined, undefined, lastDistanceExpenseType); }, [moneyRequestReport === null || moneyRequestReport === void 0 ? void 0 : moneyRequestReport.reportID, policy, lastDistanceExpenseType]);
    var exportSubmenuOptions = (0, react_1.useMemo)(function () {
        var _a;
        var options = (_a = {},
            _a[CONST_1.default.REPORT.EXPORT_OPTIONS.DOWNLOAD_CSV] = {
                text: translate('export.basicExport'),
                icon: Expensicons.Table,
                value: CONST_1.default.REPORT.EXPORT_OPTIONS.DOWNLOAD_CSV,
                onSelected: function () {
                    if (!moneyRequestReport) {
                        return;
                    }
                    if (isOffline) {
                        setOfflineModalVisible(true);
                        return;
                    }
                    (0, Report_2.exportReportToCSV)({ reportID: moneyRequestReport.reportID, transactionIDList: transactionIDs }, function () {
                        setDownloadErrorModalVisible(true);
                    });
                },
            },
            _a[CONST_1.default.REPORT.EXPORT_OPTIONS.EXPORT_TO_INTEGRATION] = {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                text: translate('workspace.common.exportIntegrationSelected', { connectionName: connectedIntegrationFallback }),
                icon: (0, ReportUtils_1.getIntegrationExportIcon)(connectedIntegration !== null && connectedIntegration !== void 0 ? connectedIntegration : connectedIntegrationFallback),
                value: CONST_1.default.REPORT.EXPORT_OPTIONS.EXPORT_TO_INTEGRATION,
                onSelected: function () {
                    if (!connectedIntegration || !moneyRequestReport) {
                        return;
                    }
                    if (isExported) {
                        setExportModalStatus(CONST_1.default.REPORT.EXPORT_OPTIONS.EXPORT_TO_INTEGRATION);
                        return;
                    }
                    (0, Report_2.exportToIntegration)(moneyRequestReport === null || moneyRequestReport === void 0 ? void 0 : moneyRequestReport.reportID, connectedIntegration);
                },
            },
            _a[CONST_1.default.REPORT.EXPORT_OPTIONS.MARK_AS_EXPORTED] = {
                text: translate('workspace.common.markAsExported'),
                icon: (0, ReportUtils_1.getIntegrationExportIcon)(connectedIntegration !== null && connectedIntegration !== void 0 ? connectedIntegration : connectedIntegrationFallback),
                value: CONST_1.default.REPORT.EXPORT_OPTIONS.MARK_AS_EXPORTED,
                onSelected: function () {
                    if (!connectedIntegration || !moneyRequestReport) {
                        return;
                    }
                    if (isExported) {
                        setExportModalStatus(CONST_1.default.REPORT.EXPORT_OPTIONS.MARK_AS_EXPORTED);
                        return;
                    }
                    (0, Report_2.markAsManuallyExported)(moneyRequestReport === null || moneyRequestReport === void 0 ? void 0 : moneyRequestReport.reportID, connectedIntegration);
                },
            },
            _a);
        var _loop_1 = function (template) {
            options[template.name] = {
                text: template.name,
                icon: Expensicons.Table,
                value: template.templateName,
                description: template.description,
                onSelected: function () { return beginExportWithTemplate(template.templateName, template.type, transactionIDs, template.policyID); },
            };
        };
        for (var _i = 0, exportTemplates_1 = exportTemplates; _i < exportTemplates_1.length; _i++) {
            var template = exportTemplates_1[_i];
            _loop_1(template);
        }
        return options;
    }, [translate, connectedIntegrationFallback, connectedIntegration, moneyRequestReport, isOffline, transactionIDs, isExported, beginExportWithTemplate, exportTemplates]);
    var primaryActionsImplementation = (_b = {},
        _b[CONST_1.default.REPORT.PRIMARY_ACTIONS.SUBMIT] = (<AnimatedSubmitButton_1.default success text={translate('common.submit')} onPress={function () {
                if (!moneyRequestReport || shouldBlockSubmit) {
                    return;
                }
                if ((0, PolicyUtils_1.hasDynamicExternalWorkflow)(policy)) {
                    showDWEModal();
                    return;
                }
                startSubmittingAnimation();
                (0, IOU_1.submitReport)(moneyRequestReport, policy, accountID, email !== null && email !== void 0 ? email : '', hasViolations, isASAPSubmitBetaEnabled);
                if (currentSearchQueryJSON) {
                    (0, Search_1.search)({
                        searchKey: currentSearchKey,
                        shouldCalculateTotals: shouldCalculateTotals,
                        offset: 0,
                        queryJSON: currentSearchQueryJSON,
                        isOffline: isOffline,
                    });
                }
            }} isSubmittingAnimationRunning={isSubmittingAnimationRunning} onAnimationFinish={stopAnimation} isDisabled={shouldBlockSubmit}/>),
        _b[CONST_1.default.REPORT.PRIMARY_ACTIONS.APPROVE] = (<Button_1.default success onPress={confirmApproval} text={translate('iou.approve')}/>),
        _b[CONST_1.default.REPORT.PRIMARY_ACTIONS.PAY] = (<AnimatedSettlementButton_1.default isPaidAnimationRunning={isPaidAnimationRunning} isApprovedAnimationRunning={isApprovedAnimationRunning} onAnimationFinish={stopAnimation} formattedAmount={totalAmount} canIOUBePaid onlyShowPayElsewhere={onlyShowPayElsewhere} currency={moneyRequestReport === null || moneyRequestReport === void 0 ? void 0 : moneyRequestReport.currency} confirmApproval={confirmApproval} policyID={moneyRequestReport === null || moneyRequestReport === void 0 ? void 0 : moneyRequestReport.policyID} chatReportID={chatReport === null || chatReport === void 0 ? void 0 : chatReport.reportID} iouReport={moneyRequestReport} onPress={confirmPayment} enablePaymentsRoute={ROUTES_1.default.ENABLE_PAYMENTS} shouldHidePaymentOptions={!shouldShowPayButton} shouldShowApproveButton={shouldShowApproveButton} shouldDisableApproveButton={shouldDisableApproveButton} isDisabled={isOffline && !canAllowSettlement} isLoading={!isOffline && !canAllowSettlement}/>),
        _b[CONST_1.default.REPORT.PRIMARY_ACTIONS.EXPORT_TO_ACCOUNTING] = (<Button_1.default success 
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        text={translate('workspace.common.exportIntegrationSelected', { connectionName: connectedIntegration })} onPress={function () {
                if (!connectedIntegration || !moneyRequestReport) {
                    return;
                }
                if (isExported) {
                    setExportModalStatus(CONST_1.default.REPORT.EXPORT_OPTIONS.EXPORT_TO_INTEGRATION);
                    return;
                }
                (0, Report_2.exportToIntegration)(moneyRequestReport === null || moneyRequestReport === void 0 ? void 0 : moneyRequestReport.reportID, connectedIntegration);
            }}/>),
        _b[CONST_1.default.REPORT.PRIMARY_ACTIONS.REMOVE_HOLD] = (<Button_1.default success text={translate('iou.unhold')} onPress={function () {
                var parentReportAction = (0, ReportActionsUtils_1.getReportAction)(moneyRequestReport === null || moneyRequestReport === void 0 ? void 0 : moneyRequestReport.parentReportID, moneyRequestReport === null || moneyRequestReport === void 0 ? void 0 : moneyRequestReport.parentReportActionID);
                var IOUActions = (0, ReportPrimaryActionUtils_1.getAllExpensesToHoldIfApplicable)(moneyRequestReport, reportActions);
                if (IOUActions.length) {
                    IOUActions.forEach(ReportUtils_1.changeMoneyRequestHoldStatus);
                    return;
                }
                var moneyRequestAction = transactionThreadReportID ? requestParentReportAction : parentReportAction;
                if (!moneyRequestAction) {
                    return;
                }
                (0, ReportUtils_1.changeMoneyRequestHoldStatus)(moneyRequestAction);
            }}/>),
        _b[CONST_1.default.REPORT.PRIMARY_ACTIONS.MARK_AS_CASH] = (<Button_1.default success text={translate('iou.markAsCash')} onPress={markAsCash}/>),
        _b[CONST_1.default.REPORT.TRANSACTION_PRIMARY_ACTIONS.MARK_AS_RESOLVED] = (<Button_1.default success onPress={function () {
                if (!(transaction === null || transaction === void 0 ? void 0 : transaction.transactionID)) {
                    return;
                }
                (0, IOU_1.markRejectViolationAsResolved)(transaction === null || transaction === void 0 ? void 0 : transaction.transactionID, transactionThreadReport === null || transactionThreadReport === void 0 ? void 0 : transactionThreadReport.reportID);
            }} text={translate('iou.reject.markAsResolved')}/>),
        _b[CONST_1.default.REPORT.PRIMARY_ACTIONS.REVIEW_DUPLICATES] = (<Button_1.default success text={translate('iou.reviewDuplicates')} onPress={function () {
                var threadID = transactionThreadReportID !== null && transactionThreadReportID !== void 0 ? transactionThreadReportID : getFirstDuplicateThreadID(transactions, reportActions);
                if (!threadID) {
                    var duplicateTransaction = transactions.find(function (reportTransaction) { return (0, TransactionUtils_1.isDuplicate)(reportTransaction); });
                    var transactionID = duplicateTransaction === null || duplicateTransaction === void 0 ? void 0 : duplicateTransaction.transactionID;
                    var iouAction = (0, ReportActionsUtils_1.getIOUActionForReportID)(moneyRequestReport === null || moneyRequestReport === void 0 ? void 0 : moneyRequestReport.reportID, transactionID);
                    var createdTransactionThreadReport = (0, Report_2.createTransactionThreadReport)(moneyRequestReport, iouAction);
                    threadID = createdTransactionThreadReport === null || createdTransactionThreadReport === void 0 ? void 0 : createdTransactionThreadReport.reportID;
                }
                Navigation_1.default.navigate(ROUTES_1.default.TRANSACTION_DUPLICATE_REVIEW_PAGE.getRoute(threadID));
            }}/>),
        _b);
    var beginPDFExport = function (reportID) {
        setIsPDFModalVisible(true);
        (0, Report_2.exportReportToPDF)({ reportID: reportID });
    };
    var secondaryActions = (0, react_1.useMemo)(function () {
        if (!moneyRequestReport) {
            return [];
        }
        return (0, ReportSecondaryActionUtils_1.getSecondaryReportActions)({
            currentUserEmail: currentUserLogin !== null && currentUserLogin !== void 0 ? currentUserLogin : '',
            report: moneyRequestReport,
            chatReport: chatReport,
            reportTransactions: transactions,
            violations: violations,
            policy: policy,
            reportNameValuePairs: reportNameValuePairs,
            reportActions: reportActions,
            policies: policies,
            isChatReportArchived: isChatReportArchived,
        });
    }, [moneyRequestReport, currentUserLogin, chatReport, transactions, violations, policy, reportNameValuePairs, reportActions, policies, isChatReportArchived]);
    var secondaryExportActions = (0, react_1.useMemo)(function () {
        if (!moneyRequestReport) {
            return [];
        }
        return (0, ReportSecondaryActionUtils_1.getSecondaryExportReportActions)(moneyRequestReport, policy, exportTemplates);
    }, [moneyRequestReport, policy, exportTemplates]);
    var connectedIntegrationName = connectedIntegration ? translate('workspace.accounting.connectionName', { connectionName: connectedIntegration }) : '';
    var unapproveWarningText = (0, react_1.useMemo)(function () { return (<Text_1.default>
                <Text_1.default style={[styles.textStrong, styles.noWrap]}>{translate('iou.headsUp')}</Text_1.default>{' '}
                <Text_1.default>{translate('iou.unapproveWithIntegrationWarning', { accountingIntegration: connectedIntegrationName })}</Text_1.default>
            </Text_1.default>); }, [connectedIntegrationName, styles.noWrap, styles.textStrong, translate]);
    var reopenExportedReportWarningText = (<Text_1.default>
            <Text_1.default style={[styles.textStrong, styles.noWrap]}>{translate('iou.headsUp')} </Text_1.default>
            <Text_1.default>{translate('iou.reopenExportedReportConfirmation', { connectionName: integrationNameFromExportMessage !== null && integrationNameFromExportMessage !== void 0 ? integrationNameFromExportMessage : '' })}</Text_1.default>
        </Text_1.default>);
    var secondaryActionsImplementation = (_c = {},
        _c[CONST_1.default.REPORT.SECONDARY_ACTIONS.VIEW_DETAILS] = {
            value: CONST_1.default.REPORT.SECONDARY_ACTIONS.VIEW_DETAILS,
            text: translate('iou.viewDetails'),
            icon: Expensicons.Info,
            onSelected: function () {
                (0, ReportUtils_1.navigateToDetailsPage)(moneyRequestReport, Navigation_1.default.getReportRHPActiveRoute());
            },
        },
        _c[CONST_1.default.REPORT.SECONDARY_ACTIONS.EXPORT] = {
            value: CONST_1.default.REPORT.SECONDARY_ACTIONS.EXPORT,
            text: translate('common.export'),
            backButtonText: translate('common.export'),
            icon: Expensicons.Export,
            rightIcon: Expensicons.ArrowRight,
            subMenuItems: secondaryExportActions.map(function (action) { return exportSubmenuOptions[action]; }),
        },
        _c[CONST_1.default.REPORT.SECONDARY_ACTIONS.DOWNLOAD_PDF] = {
            value: CONST_1.default.REPORT.SECONDARY_ACTIONS.DOWNLOAD_PDF,
            text: translate('common.downloadAsPDF'),
            icon: Expensicons.Document,
            onSelected: function () {
                if (!moneyRequestReport) {
                    return;
                }
                beginPDFExport(moneyRequestReport.reportID);
            },
        },
        _c[CONST_1.default.REPORT.SECONDARY_ACTIONS.SUBMIT] = {
            value: CONST_1.default.REPORT.SECONDARY_ACTIONS.SUBMIT,
            text: translate('common.submit'),
            icon: Expensicons.Send,
            onSelected: function () {
                if (!moneyRequestReport) {
                    return;
                }
                if ((0, PolicyUtils_1.hasDynamicExternalWorkflow)(policy)) {
                    showDWEModal();
                    return;
                }
                (0, IOU_1.submitReport)(moneyRequestReport, policy, accountID, email !== null && email !== void 0 ? email : '', hasViolations, isASAPSubmitBetaEnabled);
            },
        },
        _c[CONST_1.default.REPORT.SECONDARY_ACTIONS.APPROVE] = {
            text: translate('iou.approve'),
            icon: Expensicons.ThumbsUp,
            value: CONST_1.default.REPORT.SECONDARY_ACTIONS.APPROVE,
            onSelected: confirmApproval,
        },
        _c[CONST_1.default.REPORT.SECONDARY_ACTIONS.UNAPPROVE] = {
            text: translate('iou.unapprove'),
            icon: Expensicons.CircularArrowBackwards,
            value: CONST_1.default.REPORT.SECONDARY_ACTIONS.UNAPPROVE,
            onSelected: function () { return __awaiter(_this, void 0, void 0, function () {
                var result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (isDelegateAccessRestricted) {
                                showDelegateNoAccessModal();
                                return [2 /*return*/];
                            }
                            if (!isExported) return [3 /*break*/, 2];
                            return [4 /*yield*/, showConfirmModal({
                                    title: translate('iou.unapproveReport'),
                                    prompt: unapproveWarningText,
                                    confirmText: translate('iou.unapproveReport'),
                                    cancelText: translate('common.cancel'),
                                    danger: true,
                                })];
                        case 1:
                            result = _a.sent();
                            if (result.action !== ModalContext_1.ModalActions.CONFIRM) {
                                return [2 /*return*/];
                            }
                            (0, IOU_1.unapproveExpenseReport)(moneyRequestReport, policy, accountID, email !== null && email !== void 0 ? email : '', hasViolations, isASAPSubmitBetaEnabled);
                            return [2 /*return*/];
                        case 2:
                            (0, IOU_1.unapproveExpenseReport)(moneyRequestReport, policy, accountID, email !== null && email !== void 0 ? email : '', hasViolations, isASAPSubmitBetaEnabled);
                            return [2 /*return*/];
                    }
                });
            }); },
        },
        _c[CONST_1.default.REPORT.SECONDARY_ACTIONS.CANCEL_PAYMENT] = {
            text: translate('iou.cancelPayment'),
            icon: Expensicons.Clear,
            value: CONST_1.default.REPORT.SECONDARY_ACTIONS.CANCEL_PAYMENT,
            onSelected: function () { return __awaiter(_this, void 0, void 0, function () {
                var result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, showConfirmModal({
                                title: translate('iou.cancelPayment'),
                                prompt: translate('iou.cancelPaymentConfirmation'),
                                confirmText: translate('iou.cancelPayment'),
                                cancelText: translate('common.dismiss'),
                                danger: true,
                            })];
                        case 1:
                            result = _a.sent();
                            if (result.action !== ModalContext_1.ModalActions.CONFIRM || !chatReport) {
                                return [2 /*return*/];
                            }
                            (0, IOU_1.cancelPayment)(moneyRequestReport, chatReport, policy, isASAPSubmitBetaEnabled, accountID, email !== null && email !== void 0 ? email : '', hasViolations);
                            return [2 /*return*/];
                    }
                });
            }); },
        },
        _c[CONST_1.default.REPORT.SECONDARY_ACTIONS.HOLD] = {
            text: translate('iou.hold'),
            icon: Expensicons.Stopwatch,
            value: CONST_1.default.REPORT.SECONDARY_ACTIONS.HOLD,
            onSelected: function () {
                if (!requestParentReportAction) {
                    throw new Error('Parent action does not exist');
                }
                if (isDelegateAccessRestricted) {
                    showDelegateNoAccessModal();
                    return;
                }
                var isDismissed = isReportSubmitter ? dismissedHoldUseExplanation : dismissedRejectUseExplanation;
                if (isDismissed) {
                    (0, ReportUtils_1.changeMoneyRequestHoldStatus)(requestParentReportAction);
                }
                else if (isReportSubmitter) {
                    setIsHoldEducationalModalVisible(true);
                }
                else {
                    setRejectModalAction(CONST_1.default.REPORT.TRANSACTION_SECONDARY_ACTIONS.HOLD);
                }
            },
        },
        _c[CONST_1.default.REPORT.SECONDARY_ACTIONS.REMOVE_HOLD] = {
            text: translate('iou.unhold'),
            icon: Expensicons.Stopwatch,
            value: CONST_1.default.REPORT.SECONDARY_ACTIONS.REMOVE_HOLD,
            onSelected: function () {
                if (!requestParentReportAction) {
                    throw new Error('Parent action does not exist');
                }
                (0, ReportUtils_1.changeMoneyRequestHoldStatus)(requestParentReportAction);
            },
        },
        _c[CONST_1.default.REPORT.SECONDARY_ACTIONS.SPLIT] = {
            text: isExpenseSplit ? translate('iou.editSplits') : translate('iou.split'),
            icon: Expensicons.ArrowSplit,
            value: CONST_1.default.REPORT.SECONDARY_ACTIONS.SPLIT,
            onSelected: function () {
                if (Number(transactions === null || transactions === void 0 ? void 0 : transactions.length) !== 1) {
                    return;
                }
                var currentTransaction = transactions.at(0);
                (0, IOU_1.initSplitExpense)(allTransactions, allReports, currentTransaction);
            },
        },
        _c[CONST_1.default.REPORT.SECONDARY_ACTIONS.MERGE] = {
            text: translate('common.merge'),
            icon: Expensicons.ArrowCollapse,
            value: CONST_1.default.REPORT.SECONDARY_ACTIONS.MERGE,
            onSelected: function () {
                var currentTransaction = transactions.at(0);
                if (!currentTransaction) {
                    return;
                }
                (0, MergeTransaction_1.setupMergeTransactionData)(currentTransaction.transactionID, { targetTransactionID: currentTransaction.transactionID });
                Navigation_1.default.navigate(ROUTES_1.default.MERGE_TRANSACTION_LIST_PAGE.getRoute(currentTransaction.transactionID, Navigation_1.default.getActiveRoute()));
            },
        },
        _c[CONST_1.default.REPORT.SECONDARY_ACTIONS.CHANGE_WORKSPACE] = {
            text: translate('iou.changeWorkspace'),
            icon: expensifyIcons.Buildings,
            value: CONST_1.default.REPORT.SECONDARY_ACTIONS.CHANGE_WORKSPACE,
            onSelected: function () {
                if (!moneyRequestReport) {
                    return;
                }
                Navigation_1.default.navigate(ROUTES_1.default.REPORT_WITH_ID_CHANGE_WORKSPACE.getRoute(moneyRequestReport.reportID, Navigation_1.default.getActiveRoute()));
            },
        },
        _c[CONST_1.default.REPORT.SECONDARY_ACTIONS.CHANGE_APPROVER] = {
            text: translate('iou.changeApprover.title'),
            icon: Expensicons.Workflows,
            value: CONST_1.default.REPORT.SECONDARY_ACTIONS.CHANGE_APPROVER,
            onSelected: function () {
                if (!moneyRequestReport) {
                    Log_1.default.warn('Change approver secondary action triggered without moneyRequestReport data.');
                    return;
                }
                Navigation_1.default.navigate(ROUTES_1.default.REPORT_CHANGE_APPROVER.getRoute(moneyRequestReport.reportID, Navigation_1.default.getActiveRoute()));
            },
        },
        _c[CONST_1.default.REPORT.SECONDARY_ACTIONS.DELETE] = {
            text: translate('common.delete'),
            icon: Expensicons.Trashcan,
            value: CONST_1.default.REPORT.SECONDARY_ACTIONS.DELETE,
            onSelected: function () { return __awaiter(_this, void 0, void 0, function () {
                var transactionCount, result_1, goBackRoute_1, result;
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            transactionCount = Object.keys(transactions).length;
                            if (!(transactionCount === 1)) return [3 /*break*/, 2];
                            return [4 /*yield*/, showConfirmModal({
                                    title: translate('iou.deleteExpense', { count: 1 }),
                                    prompt: translate('iou.deleteConfirmation', { count: 1 }),
                                    confirmText: translate('common.delete'),
                                    cancelText: translate('common.cancel'),
                                    danger: true,
                                })];
                        case 1:
                            result_1 = _b.sent();
                            if (result_1.action !== ModalContext_1.ModalActions.CONFIRM) {
                                return [2 /*return*/];
                            }
                            if (transactionThreadReportID) {
                                if (!requestParentReportAction || !(transaction === null || transaction === void 0 ? void 0 : transaction.transactionID)) {
                                    throw new Error('Missing data!');
                                }
                                // it's deleting transaction but not the report which leads to bug (that is actually also on staging)
                                // Money request should be deleted when interactions are done, to not show the not found page before navigating to goBackRoute
                                // eslint-disable-next-line @typescript-eslint/no-deprecated
                                react_native_1.InteractionManager.runAfterInteractions(function () {
                                    deleteTransactions([transaction.transactionID], duplicateTransactions, duplicateTransactionViolations, currentSearchHash, false);
                                    removeTransaction(transaction.transactionID);
                                });
                                goBackRoute_1 = (0, IOU_1.getNavigationUrlOnMoneyRequestDelete)(transaction.transactionID, requestParentReportAction, iouReport, chatIOUReport, isChatIOUReportArchived, false);
                            }
                            if (goBackRoute_1) {
                                Navigation_1.default.setNavigationActionToMicrotaskQueue(function () { return (0, ReportUtils_1.navigateOnDeleteExpense)(goBackRoute_1); });
                            }
                            return [2 /*return*/];
                        case 2: return [4 /*yield*/, showConfirmModal({
                                title: translate('iou.deleteReport'),
                                prompt: translate('iou.deleteReportConfirmation'),
                                confirmText: translate('common.delete'),
                                cancelText: translate('common.cancel'),
                                danger: true,
                            })];
                        case 3:
                            result = _b.sent();
                            if (result.action !== ModalContext_1.ModalActions.CONFIRM) {
                                return [2 /*return*/];
                            }
                            Navigation_1.default.goBack((_a = route.params) === null || _a === void 0 ? void 0 : _a.backTo);
                            // eslint-disable-next-line @typescript-eslint/no-deprecated
                            react_native_1.InteractionManager.runAfterInteractions(function () {
                                (0, Report_2.deleteAppReport)(moneyRequestReport === null || moneyRequestReport === void 0 ? void 0 : moneyRequestReport.reportID);
                            });
                            return [2 /*return*/];
                    }
                });
            }); },
        },
        _c[CONST_1.default.REPORT.SECONDARY_ACTIONS.RETRACT] = {
            text: translate('iou.retract'),
            icon: Expensicons.CircularArrowBackwards,
            value: CONST_1.default.REPORT.SECONDARY_ACTIONS.RETRACT,
            onSelected: function () {
                (0, IOU_1.retractReport)(moneyRequestReport, chatReport, policy, accountID, email !== null && email !== void 0 ? email : '', hasViolations, isASAPSubmitBetaEnabled);
            },
        },
        _c[CONST_1.default.REPORT.SECONDARY_ACTIONS.REOPEN] = {
            text: translate('iou.retract'),
            icon: Expensicons.CircularArrowBackwards,
            value: CONST_1.default.REPORT.SECONDARY_ACTIONS.REOPEN,
            onSelected: function () { return __awaiter(_this, void 0, void 0, function () {
                var result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!isExported) return [3 /*break*/, 2];
                            return [4 /*yield*/, showConfirmModal({
                                    title: translate('iou.reopenReport'),
                                    prompt: reopenExportedReportWarningText,
                                    confirmText: translate('iou.reopenReport'),
                                    cancelText: translate('common.cancel'),
                                    danger: true,
                                })];
                        case 1:
                            result = _a.sent();
                            if (result.action !== ModalContext_1.ModalActions.CONFIRM) {
                                return [2 /*return*/];
                            }
                            (0, IOU_1.reopenReport)(moneyRequestReport, policy, accountID, email !== null && email !== void 0 ? email : '', hasViolations, isASAPSubmitBetaEnabled);
                            return [2 /*return*/];
                        case 2:
                            (0, IOU_1.reopenReport)(moneyRequestReport, policy, accountID, email !== null && email !== void 0 ? email : '', hasViolations, isASAPSubmitBetaEnabled);
                            return [2 /*return*/];
                    }
                });
            }); },
        },
        _c[CONST_1.default.REPORT.SECONDARY_ACTIONS.REJECT] = {
            text: translate('common.reject'),
            icon: Expensicons.ThumbsDown,
            value: CONST_1.default.REPORT.SECONDARY_ACTIONS.REJECT,
            onSelected: function () {
                if (dismissedRejectUseExplanation) {
                    if (requestParentReportAction) {
                        (0, ReportUtils_1.rejectMoneyRequestReason)(requestParentReportAction);
                    }
                }
                else {
                    setRejectModalAction(CONST_1.default.REPORT.TRANSACTION_SECONDARY_ACTIONS.REJECT);
                }
            },
            shouldShow: transactions.length === 1,
        },
        _c[CONST_1.default.REPORT.SECONDARY_ACTIONS.ADD_EXPENSE] = {
            text: translate('iou.addExpense'),
            backButtonText: translate('iou.addExpense'),
            icon: Expensicons.Plus,
            rightIcon: Expensicons.ArrowRight,
            value: CONST_1.default.REPORT.SECONDARY_ACTIONS.ADD_EXPENSE,
            subMenuItems: addExpenseDropdownOptions,
            onSelected: function () {
                if (!(moneyRequestReport === null || moneyRequestReport === void 0 ? void 0 : moneyRequestReport.reportID)) {
                    return;
                }
                if (policy && (0, SubscriptionUtils_1.shouldRestrictUserBillableActions)(policy.id)) {
                    Navigation_1.default.navigate(ROUTES_1.default.RESTRICTED_ACTION.getRoute(policy.id));
                    return;
                }
                (0, IOU_1.startMoneyRequest)(CONST_1.default.IOU.TYPE.SUBMIT, moneyRequestReport === null || moneyRequestReport === void 0 ? void 0 : moneyRequestReport.reportID);
            },
        },
        _c[CONST_1.default.REPORT.SECONDARY_ACTIONS.PAY] = {
            text: translate('iou.settlePayment', { formattedAmount: totalAmount }),
            icon: Expensicons.Cash,
            value: CONST_1.default.REPORT.SECONDARY_ACTIONS.PAY,
            backButtonText: translate('iou.settlePayment', { formattedAmount: totalAmount }),
            subMenuItems: Object.values(paymentButtonOptions),
        },
        _c);
    var applicableSecondaryActions = secondaryActions
        .map(function (action) { return secondaryActionsImplementation[action]; })
        .filter(function (action) { return (action === null || action === void 0 ? void 0 : action.shouldShow) !== false && (action === null || action === void 0 ? void 0 : action.value) !== primaryAction; });
    (0, react_1.useEffect)(function () {
        if (!transactionThreadReportID) {
            return;
        }
        clearSelectedTransactions(true);
        // We don't need to run the effect on change of clearSelectedTransactions since it can cause the infinite loop.
        // eslint-disable-next-line react-compiler/react-compiler
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [transactionThreadReportID]);
    (0, react_1.useEffect)(function () {
        var _a;
        if (!isPDFModalVisible || !reportPDFFilename || reportPDFFilename === CONST_1.default.REPORT_DETAILS_MENU_ITEM.ERROR || isDownloadingPDF) {
            return;
        }
        (0, Report_2.downloadReportPDF)(reportPDFFilename, (_a = moneyRequestReport === null || moneyRequestReport === void 0 ? void 0 : moneyRequestReport.reportName) !== null && _a !== void 0 ? _a : '');
        setIsPDFModalVisible(false);
    }, [isPDFModalVisible, reportPDFFilename, isDownloadingPDF, moneyRequestReport === null || moneyRequestReport === void 0 ? void 0 : moneyRequestReport.reportName]);
    var shouldShowBackButton = shouldDisplayBackButton || shouldUseNarrowLayout;
    var isMobileSelectionModeEnabled = (0, useMobileSelectionMode_1.default)();
    (0, react_1.useEffect)(function () {
        return function () {
            (0, MobileSelectionMode_1.turnOffMobileSelectionMode)();
        };
    }, []);
    var showDeleteModal = (0, react_1.useCallback)(function () {
        showConfirmModal({
            title: translate('iou.deleteExpense', { count: selectedTransactionIDs.length }),
            prompt: translate('iou.deleteConfirmation', { count: selectedTransactionIDs.length }),
            confirmText: translate('common.delete'),
            cancelText: translate('common.cancel'),
            danger: true,
        }).then(function (result) {
            var _a, _b;
            if (result.action !== ModalContext_1.ModalActions.CONFIRM) {
                return;
            }
            if (transactions.filter(function (trans) { return trans.pendingAction !== CONST_1.default.RED_BRICK_ROAD_PENDING_ACTION.DELETE; }).length === selectedTransactionIDs.length) {
                var backToRoute = (_b = (_a = route.params) === null || _a === void 0 ? void 0 : _a.backTo) !== null && _b !== void 0 ? _b : ((chatReport === null || chatReport === void 0 ? void 0 : chatReport.reportID) ? ROUTES_1.default.REPORT_WITH_ID.getRoute(chatReport.reportID) : undefined);
                Navigation_1.default.goBack(backToRoute);
            }
            handleDeleteTransactions();
        });
    }, [showConfirmModal, translate, selectedTransactionIDs.length, transactions, handleDeleteTransactions, (_g = route.params) === null || _g === void 0 ? void 0 : _g.backTo, chatReport === null || chatReport === void 0 ? void 0 : chatReport.reportID]);
    var showExportAgainModal = (0, react_1.useCallback)(function () {
        var _a;
        if (!connectedIntegration) {
            return;
        }
        showConfirmModal({
            title: translate('workspace.exportAgainModal.title'),
            prompt: translate('workspace.exportAgainModal.description', {
                connectionName: connectedIntegration !== null && connectedIntegration !== void 0 ? connectedIntegration : connectedIntegrationFallback,
                reportName: (_a = moneyRequestReport === null || moneyRequestReport === void 0 ? void 0 : moneyRequestReport.reportName) !== null && _a !== void 0 ? _a : '',
            }),
            confirmText: translate('workspace.exportAgainModal.confirmText'),
            cancelText: translate('workspace.exportAgainModal.cancelText'),
        }).then(function (result) {
            if (result.action !== ModalContext_1.ModalActions.CONFIRM) {
                setExportModalStatus(null);
                return;
            }
            confirmExport();
        });
    }, [showConfirmModal, translate, connectedIntegration, connectedIntegrationFallback, moneyRequestReport === null || moneyRequestReport === void 0 ? void 0 : moneyRequestReport.reportName, confirmExport]);
    (0, react_1.useEffect)(function () {
        if (!exportModalStatus) {
            return;
        }
        showExportAgainModal();
    }, [exportModalStatus, showExportAgainModal]);
    var selectedTransactionsOptions = (0, react_1.useMemo)(function () {
        return originalSelectedTransactionsOptions.map(function (option) {
            if (option.text === translate('common.delete')) {
                return __assign(__assign({}, option), { onSelected: showDeleteModal });
            }
            return option;
        });
    }, [originalSelectedTransactionsOptions, translate, showDeleteModal]);
    var shouldShowSelectedTransactionsButton = !!selectedTransactionsOptions.length && !transactionThreadReportID;
    if (isMobileSelectionModeEnabled && shouldUseNarrowLayout) {
        // If mobile selection mode is enabled but only one or no transactions remain, turn it off
        var visibleTransactions = transactions.filter(function (t) { return t.pendingAction !== CONST_1.default.RED_BRICK_ROAD_PENDING_ACTION.DELETE || isOffline; });
        if (visibleTransactions.length <= 1) {
            (0, MobileSelectionMode_1.turnOffMobileSelectionMode)();
        }
        return (<HeaderWithBackButton_1.default title={translate('common.selectMultiple')} onBackButtonPress={function () {
                clearSelectedTransactions(true);
                (0, MobileSelectionMode_1.turnOffMobileSelectionMode)();
            }}/>);
    }
    var onPaymentSelect = function (event, iouPaymentType, triggerKYCFlow) {
        return (0, PaymentUtils_1.selectPaymentType)({
            event: event,
            iouPaymentType: iouPaymentType,
            triggerKYCFlow: triggerKYCFlow,
            policy: policy,
            onPress: confirmPayment,
            currentAccountID: accountID,
            currentEmail: email !== null && email !== void 0 ? email : '',
            hasViolations: hasViolations,
            isASAPSubmitBetaEnabled: isASAPSubmitBetaEnabled,
            isUserValidated: isUserValidated,
            confirmApproval: confirmApproval,
            iouReport: moneyRequestReport,
        });
    };
    var showNextStepBar = shouldShowNextStep && !!((_h = optimisticNextStep === null || optimisticNextStep === void 0 ? void 0 : optimisticNextStep.message) === null || _h === void 0 ? void 0 : _h.length);
    var showNextStepSkeleton = shouldShowNextStep && !optimisticNextStep && !!isLoadingInitialReportActions && !isOffline;
    var shouldShowMoreContent = showNextStepBar || showNextStepSkeleton || !!statusBarProps || isReportInSearch;
    return (<react_native_1.View style={[styles.pt0, styles.borderBottom]}>
            <HeaderWithBackButton_1.default shouldShowReportAvatarWithDisplay shouldDisplayStatus shouldShowPinButton={false} report={moneyRequestReport} shouldShowBackButton={shouldShowBackButton} shouldDisplaySearchRouter={shouldDisplaySearchRouter} onBackButtonPress={onBackButtonPress} shouldShowBorderBottom={false} shouldEnableDetailPageNavigation openParentReportInCurrentTab>
                {shouldDisplayNarrowMoreButton && (<react_native_1.View style={[styles.flexRow, styles.gap2]}>
                        {!!primaryAction && !shouldShowSelectedTransactionsButton && primaryActionsImplementation[primaryAction]}
                        {!!applicableSecondaryActions.length && !shouldShowSelectedTransactionsButton && (<MoneyReportHeaderKYCDropdown_1.default chatReportID={chatReport === null || chatReport === void 0 ? void 0 : chatReport.reportID} iouReport={moneyRequestReport} onPaymentSelect={onPaymentSelect} onSuccessfulKYC={function (payment) { return confirmPayment(payment); }} primaryAction={primaryAction} applicableSecondaryActions={applicableSecondaryActions} ref={kycWallRef}/>)}
                        {shouldShowSelectedTransactionsButton && (<react_native_1.View>
                                <ButtonWithDropdownMenu_1.default onPress={function () { return null; }} options={selectedTransactionsOptions} customText={translate('workspace.common.selected', { count: selectedTransactionIDs.length })} isSplitButton={false} shouldAlwaysShowDropdownMenu/>
                            </react_native_1.View>)}
                    </react_native_1.View>)}
            </HeaderWithBackButton_1.default>
            {!shouldDisplayNarrowMoreButton &&
            (shouldShowSelectedTransactionsButton ? (<react_native_1.View style={[styles.dFlex, styles.w100, styles.ph5, styles.pb3]}>
                        <ButtonWithDropdownMenu_1.default onPress={function () { return null; }} options={selectedTransactionsOptions} customText={translate('workspace.common.selected', { count: selectedTransactionIDs.length })} isSplitButton={false} shouldAlwaysShowDropdownMenu wrapperStyle={styles.w100}/>
                    </react_native_1.View>) : (<react_native_1.View style={[styles.flexRow, styles.gap2, styles.pb3, styles.ph5, styles.w100, styles.alignItemsCenter, styles.justifyContentCenter]}>
                        {!!primaryAction && <react_native_1.View style={[styles.flex1]}>{primaryActionsImplementation[primaryAction]}</react_native_1.View>}
                        {!!applicableSecondaryActions.length && (<MoneyReportHeaderKYCDropdown_1.default chatReportID={chatReport === null || chatReport === void 0 ? void 0 : chatReport.reportID} iouReport={moneyRequestReport} onPaymentSelect={onPaymentSelect} onSuccessfulKYC={function (payment) { return confirmPayment(payment); }} primaryAction={primaryAction} applicableSecondaryActions={applicableSecondaryActions} ref={kycWallRef}/>)}
                    </react_native_1.View>))}

            {shouldShowMoreContent && (<react_native_1.View style={[styles.flexRow, styles.gap2, styles.justifyContentStart, styles.flexNoWrap, styles.ph5, styles.pb3]}>
                    <react_native_1.View style={[styles.flexShrink1, styles.flexGrow1, styles.mnw0, styles.flexWrap, styles.justifyContentCenter]}>
                        {showNextStepBar && <MoneyReportHeaderStatusBar_1.default nextStep={optimisticNextStep}/>}
                        {showNextStepSkeleton && <MoneyReportHeaderStatusBarSkeleton_1.default />}
                        {!!statusBarProps && (<MoneyRequestHeaderStatusBar_1.default icon={statusBarProps.icon} description={statusBarProps.description}/>)}
                    </react_native_1.View>
                    {isReportInSearch && (<MoneyRequestReportNavigation_1.default reportID={moneyRequestReport === null || moneyRequestReport === void 0 ? void 0 : moneyRequestReport.reportID} shouldDisplayNarrowVersion={shouldDisplayNarrowVersion}/>)}
                </react_native_1.View>)}

            <LoadingBar_1.default shouldShow={shouldShowLoadingBar && shouldUseNarrowLayout}/>
            {isHoldMenuVisible && requestType !== undefined && (<ProcessMoneyReportHoldMenu_1.default nonHeldAmount={!hasOnlyHeldExpenses && hasValidNonHeldAmount ? nonHeldAmount : undefined} requestType={requestType} fullAmount={fullAmount} onClose={function () { return setIsHoldMenuVisible(false); }} isVisible={isHoldMenuVisible} paymentType={paymentType} chatReport={chatReport} moneyRequestReport={moneyRequestReport} startAnimation={function () {
                if (requestType === CONST_1.default.IOU.REPORT_ACTION_TYPE.APPROVE) {
                    startApprovedAnimation();
                }
                else {
                    startAnimation();
                }
            }} transactionCount={(_j = transactionIDs === null || transactionIDs === void 0 ? void 0 : transactionIDs.length) !== null && _j !== void 0 ? _j : 0}/>)}
            <DecisionModal_1.default title={translate('common.downloadFailedTitle')} prompt={translate('common.downloadFailedDescription')} isSmallScreenWidth={isSmallScreenWidth} onSecondOptionSubmit={function () { return setDownloadErrorModalVisible(false); }} secondOptionText={translate('common.buttonConfirm')} isVisible={downloadErrorModalVisible} onClose={function () { return setDownloadErrorModalVisible(false); }}/>
            <DecisionModal_1.default title={translate('common.downloadFailedTitle')} prompt={translate('common.downloadFailedDescription')} isSmallScreenWidth={isSmallScreenWidth} onSecondOptionSubmit={function () { return setIsDownloadErrorModalVisible(false); }} secondOptionText={translate('common.buttonConfirm')} isVisible={isDownloadErrorModalVisible} onClose={function () { return setIsDownloadErrorModalVisible(false); }}/>
            {!!rejectModalAction && (<HoldOrRejectEducationalModal_1.default onClose={dismissRejectModalBasedOnAction} onConfirm={dismissRejectModalBasedOnAction}/>)}
            {!!isHoldEducationalModalVisible && (<HoldSubmitterEducationalModal_1.default onClose={dismissModalAndUpdateUseHold} onConfirm={dismissModalAndUpdateUseHold}/>)}
            <DecisionModal_1.default title={translate('common.youAppearToBeOffline')} prompt={translate('common.offlinePrompt')} isSmallScreenWidth={isSmallScreenWidth} onSecondOptionSubmit={function () { return setOfflineModalVisible(false); }} secondOptionText={translate('common.buttonConfirm')} isVisible={offlineModalVisible} onClose={function () { return setOfflineModalVisible(false); }}/>
            <Modal_1.default onClose={function () { return setIsPDFModalVisible(false); }} isVisible={isPDFModalVisible} type={isSmallScreenWidth ? CONST_1.default.MODAL.MODAL_TYPE.BOTTOM_DOCKED : CONST_1.default.MODAL.MODAL_TYPE.CONFIRM} innerContainerStyle={styles.pv0}>
                <react_native_1.View style={[styles.m5]}>
                    <react_native_1.View style={[styles.flexRow, styles.mb4]}>
                        <react_native_1.View style={[styles.flex1]}>
                            <react_native_1.View style={[styles.flexRow]}>
                                <Header_1.default title={translate('reportDetailsPage.generatingPDF')}/>
                            </react_native_1.View>
                            <Text_1.default style={[styles.mt3]}>{messagePDF}</Text_1.default>
                        </react_native_1.View>
                        <react_native_1.View style={[styles.dFlex, styles.justifyContentCenter]}>
                            <ActivityIndicator_1.default size={CONST_1.default.ACTIVITY_INDICATOR_SIZE.SMALL} color={theme.textSupporting} style={styles.ml3}/>
                        </react_native_1.View>
                    </react_native_1.View>
                    {(!reportPDFFilename || reportPDFFilename === 'error') && (<Button_1.default style={[styles.mt3, styles.noSelect]} onPress={function () { return setIsPDFModalVisible(false); }} text={translate('common.cancel')}/>)}
                </react_native_1.View>
            </Modal_1.default>
        </react_native_1.View>);
}
MoneyReportHeader.displayName = 'MoneyReportHeader';
exports.default = MoneyReportHeader;
