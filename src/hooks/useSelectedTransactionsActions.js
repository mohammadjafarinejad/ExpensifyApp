"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var Expensicons = require("@components/Icon/Expensicons");
var SearchContext_1 = require("@components/Search/SearchContext");
var IOU_1 = require("@libs/actions/IOU");
var MergeTransaction_1 = require("@libs/actions/MergeTransaction");
var Report_1 = require("@libs/actions/Report");
var Search_1 = require("@libs/actions/Search");
var Navigation_1 = require("@libs/Navigation/Navigation");
var ReportActionsUtils_1 = require("@libs/ReportActionsUtils");
var ReportSecondaryActionUtils_1 = require("@libs/ReportSecondaryActionUtils");
var ReportUtils_1 = require("@libs/ReportUtils");
var CONST_1 = require("@src/CONST");
var ONYXKEYS_1 = require("@src/ONYXKEYS");
var ROUTES_1 = require("@src/ROUTES");
var useDeleteTransactions_1 = require("./useDeleteTransactions");
var useDuplicateTransactionsAndViolations_1 = require("./useDuplicateTransactionsAndViolations");
var useLocalize_1 = require("./useLocalize");
var useNetworkWithOfflineStatus_1 = require("./useNetworkWithOfflineStatus");
var useOnyx_1 = require("./useOnyx");
var useReportIsArchived_1 = require("./useReportIsArchived");
// We do not use PRIMARY_REPORT_ACTIONS or SECONDARY_REPORT_ACTIONS because they weren't meant to be used in this situation. `value` property of returned options is later ignored.
var HOLD = 'HOLD';
var UNHOLD = 'UNHOLD';
var MOVE = 'MOVE';
var MERGE = 'MERGE';
function useSelectedTransactionsActions(_a) {
    var report = _a.report, reportActions = _a.reportActions, allTransactionsLength = _a.allTransactionsLength, session = _a.session, onExportFailed = _a.onExportFailed, onExportOffline = _a.onExportOffline, policy = _a.policy, beginExportWithTemplate = _a.beginExportWithTemplate;
    var isOffline = (0, useNetworkWithOfflineStatus_1.default)().isOffline;
    var _b = (0, SearchContext_1.useSearchContext)(), selectedTransactionIDs = _b.selectedTransactionIDs, clearSelectedTransactions = _b.clearSelectedTransactions, currentSearchHash = _b.currentSearchHash, selectedTransactionsMeta = _b.selectedTransactions;
    var allTransactions = (0, useOnyx_1.default)(ONYXKEYS_1.default.COLLECTION.TRANSACTION, { canBeMissing: false })[0];
    var outstandingReportsByPolicyID = (0, useOnyx_1.default)(ONYXKEYS_1.default.DERIVED.OUTSTANDING_REPORTS_BY_POLICY_ID, { canBeMissing: true })[0];
    var lastVisitedPath = (0, useOnyx_1.default)(ONYXKEYS_1.default.LAST_VISITED_PATH, { canBeMissing: true })[0];
    var integrationsExportTemplates = (0, useOnyx_1.default)(ONYXKEYS_1.default.NVP_INTEGRATION_SERVER_EXPORT_TEMPLATES, { canBeMissing: true })[0];
    var csvExportLayouts = (0, useOnyx_1.default)(ONYXKEYS_1.default.NVP_CSV_EXPORT_LAYOUTS, { canBeMissing: true })[0];
    var _c = (0, useDuplicateTransactionsAndViolations_1.default)(selectedTransactionIDs), duplicateTransactions = _c.duplicateTransactions, duplicateTransactionViolations = _c.duplicateTransactionViolations;
    var isReportArchived = (0, useReportIsArchived_1.default)(report === null || report === void 0 ? void 0 : report.reportID);
    var deleteTransactions = (0, useDeleteTransactions_1.default)({ report: report, reportActions: reportActions, policy: policy }).deleteTransactions;
    var selectedTransactionsList = (0, react_1.useMemo)(function () {
        return selectedTransactionIDs.reduce(function (acc, transactionID) {
            var transaction = allTransactions === null || allTransactions === void 0 ? void 0 : allTransactions["".concat(ONYXKEYS_1.default.COLLECTION.TRANSACTION).concat(transactionID)];
            if (transaction) {
                acc.push(transaction);
            }
            return acc;
        }, []);
    }, [allTransactions, selectedTransactionIDs]);
    var hasTransactionsFromMultipleOwners = (0, react_1.useMemo)(function () {
        var knownOwnerIDs = new Set();
        var hasUnknownOwner = false;
        for (var _i = 0, _a = Object.values(selectedTransactionsMeta !== null && selectedTransactionsMeta !== void 0 ? selectedTransactionsMeta : {}); _i < _a.length; _i++) {
            var selectedTransactionInfo = _a[_i];
            var ownerAccountID = selectedTransactionInfo === null || selectedTransactionInfo === void 0 ? void 0 : selectedTransactionInfo.ownerAccountID;
            if (typeof ownerAccountID === 'number') {
                knownOwnerIDs.add(ownerAccountID);
                if (knownOwnerIDs.size > 1) {
                    return true;
                }
            }
            else {
                hasUnknownOwner = true;
            }
        }
        for (var _b = 0, selectedTransactionsList_1 = selectedTransactionsList; _b < selectedTransactionsList_1.length; _b++) {
            var selectedTransaction = selectedTransactionsList_1[_b];
            var reportID = selectedTransaction === null || selectedTransaction === void 0 ? void 0 : selectedTransaction.reportID;
            if (!reportID || reportID === CONST_1.default.REPORT.UNREPORTED_REPORT_ID) {
                hasUnknownOwner = true;
                continue;
            }
            var parentReport = (0, ReportUtils_1.getReportOrDraftReport)(reportID);
            var ownerAccountID = parentReport === null || parentReport === void 0 ? void 0 : parentReport.ownerAccountID;
            if (typeof ownerAccountID === 'number') {
                knownOwnerIDs.add(ownerAccountID);
                if (knownOwnerIDs.size > 1) {
                    return true;
                }
            }
            else {
                hasUnknownOwner = true;
            }
        }
        if (hasUnknownOwner) {
            return knownOwnerIDs.size > 0 || selectedTransactionIDs.length > 1;
        }
        return false;
    }, [selectedTransactionsList, selectedTransactionsMeta, selectedTransactionIDs]);
    var translate = (0, useLocalize_1.default)().translate;
    var _d = (0, react_1.useState)(false), isDeleteModalVisible = _d[0], setIsDeleteModalVisible = _d[1];
    var isTrackExpenseThread = (0, ReportUtils_1.isTrackExpenseReport)(report);
    var isInvoice = (0, ReportUtils_1.isInvoiceReport)(report);
    var iouType = CONST_1.default.IOU.TYPE.SUBMIT;
    if (isTrackExpenseThread) {
        iouType = CONST_1.default.IOU.TYPE.TRACK;
    }
    if (isInvoice) {
        iouType = CONST_1.default.IOU.TYPE.INVOICE;
    }
    var handleDeleteTransactions = (0, react_1.useCallback)(function () {
        var deletedThreadReportIDs = deleteTransactions(selectedTransactionIDs, duplicateTransactions, duplicateTransactionViolations, currentSearchHash, false);
        clearSelectedTransactions(true);
        setIsDeleteModalVisible(false);
        Navigation_1.default.removeReportScreen(new Set(deletedThreadReportIDs));
    }, [deleteTransactions, selectedTransactionIDs, duplicateTransactions, duplicateTransactionViolations, currentSearchHash, clearSelectedTransactions]);
    var showDeleteModal = (0, react_1.useCallback)(function () {
        setIsDeleteModalVisible(true);
    }, []);
    var hideDeleteModal = (0, react_1.useCallback)(function () {
        setIsDeleteModalVisible(false);
    }, []);
    var computedOptions = (0, react_1.useMemo)(function () {
        if (!selectedTransactionIDs.length) {
            return [];
        }
        var options = [];
        var isMoneyRequestReport = (0, ReportUtils_1.isMoneyRequestReport)(report);
        var isReportReimbursed = (report === null || report === void 0 ? void 0 : report.stateNum) === CONST_1.default.REPORT.STATE_NUM.APPROVED && (report === null || report === void 0 ? void 0 : report.statusNum) === CONST_1.default.REPORT.STATUS_NUM.REIMBURSED;
        var canHoldTransactions = selectedTransactionsList.length > 0 && isMoneyRequestReport && !isReportReimbursed;
        var canUnholdTransactions = selectedTransactionsList.length > 0 && isMoneyRequestReport;
        selectedTransactionsList.forEach(function (selectedTransaction) {
            if (!canHoldTransactions && !canUnholdTransactions) {
                return;
            }
            if (!(selectedTransaction === null || selectedTransaction === void 0 ? void 0 : selectedTransaction.transactionID)) {
                canHoldTransactions = false;
                canUnholdTransactions = false;
                return;
            }
            var iouReportAction = (0, ReportActionsUtils_1.getIOUActionForTransactionID)(reportActions, selectedTransaction.transactionID);
            var _a = (0, ReportUtils_1.canHoldUnholdReportAction)(iouReportAction), canHoldRequest = _a.canHoldRequest, canUnholdRequest = _a.canUnholdRequest;
            canHoldTransactions = canHoldTransactions && canHoldRequest;
            canUnholdTransactions = canUnholdTransactions && canUnholdRequest;
        });
        if (canHoldTransactions) {
            options.push({
                text: translate('iou.hold'),
                icon: Expensicons.Stopwatch,
                value: HOLD,
                onSelected: function () {
                    if (!(report === null || report === void 0 ? void 0 : report.reportID)) {
                        return;
                    }
                    Navigation_1.default.navigate(ROUTES_1.default.SEARCH_MONEY_REQUEST_REPORT_HOLD_TRANSACTIONS.getRoute({ reportID: report.reportID }));
                },
            });
        }
        if (canUnholdTransactions) {
            options.push({
                text: translate('iou.unhold'),
                icon: Expensicons.Stopwatch,
                value: UNHOLD,
                onSelected: function () {
                    selectedTransactionIDs.forEach(function (transactionID) {
                        var action = (0, ReportActionsUtils_1.getIOUActionForTransactionID)(reportActions, transactionID);
                        if (!(action === null || action === void 0 ? void 0 : action.childReportID)) {
                            return;
                        }
                        (0, IOU_1.unholdRequest)(transactionID, action === null || action === void 0 ? void 0 : action.childReportID);
                    });
                    clearSelectedTransactions(true);
                },
            });
        }
        // Gets the list of options for the export sub-menu
        var getExportOptions = function () {
            // We provide the basic and expense level export options by default
            var exportOptions = [
                {
                    text: translate('export.basicExport'),
                    icon: Expensicons.Table,
                    onSelected: function () {
                        if (!report) {
                            return;
                        }
                        if (isOffline) {
                            onExportOffline === null || onExportOffline === void 0 ? void 0 : onExportOffline();
                            return;
                        }
                        (0, Report_1.exportReportToCSV)({ reportID: report.reportID, transactionIDList: selectedTransactionIDs }, function () {
                            onExportFailed === null || onExportFailed === void 0 ? void 0 : onExportFailed();
                        });
                        clearSelectedTransactions(true);
                    },
                },
            ];
            // If we've selected all the transactions on the report, we can also provide the report level export option
            var includeReportLevelExport = allTransactionsLength === selectedTransactionIDs.length;
            // If the user has any custom integration export templates, add them as export options
            var exportTemplates = (0, Search_1.getExportTemplates)(integrationsExportTemplates !== null && integrationsExportTemplates !== void 0 ? integrationsExportTemplates : [], csvExportLayouts !== null && csvExportLayouts !== void 0 ? csvExportLayouts : {}, translate, policy, includeReportLevelExport);
            var _loop_1 = function (template) {
                exportOptions.push({
                    text: template.name,
                    icon: Expensicons.Table,
                    description: template.description,
                    onSelected: function () { return beginExportWithTemplate(template.templateName, template.type, selectedTransactionIDs, template.policyID); },
                });
            };
            for (var _i = 0, exportTemplates_1 = exportTemplates; _i < exportTemplates_1.length; _i++) {
                var template = exportTemplates_1[_i];
                _loop_1(template);
            }
            return exportOptions;
        };
        options.push({
            value: CONST_1.default.REPORT.SECONDARY_ACTIONS.EXPORT,
            text: translate('common.export'),
            backButtonText: translate('common.export'),
            icon: Expensicons.Export,
            rightIcon: Expensicons.ArrowRight,
            subMenuItems: getExportOptions(),
        });
        var canSelectedExpensesBeMoved = selectedTransactionsList.every(function (transaction) {
            if (!transaction) {
                return false;
            }
            var iouReportAction = (0, ReportActionsUtils_1.getIOUActionForTransactionID)(reportActions, transaction.transactionID);
            var canMoveExpense = (0, ReportUtils_1.canEditFieldOfMoneyRequest)(iouReportAction, CONST_1.default.EDIT_REQUEST_FIELD.REPORT, undefined, undefined, outstandingReportsByPolicyID);
            return canMoveExpense;
        });
        var canUserPerformWriteAction = (0, ReportUtils_1.canUserPerformWriteAction)(report, isReportArchived);
        if (canSelectedExpensesBeMoved && canUserPerformWriteAction && !hasTransactionsFromMultipleOwners) {
            options.push({
                text: translate('iou.moveExpenses', { count: selectedTransactionIDs.length }),
                icon: Expensicons.DocumentMerge,
                value: MOVE,
                onSelected: function () {
                    var shouldTurnOffSelectionMode = allTransactionsLength - selectedTransactionIDs.length <= 1;
                    var route = ROUTES_1.default.MONEY_REQUEST_EDIT_REPORT.getRoute(CONST_1.default.IOU.ACTION.EDIT, iouType, report === null || report === void 0 ? void 0 : report.reportID, shouldTurnOffSelectionMode, lastVisitedPath);
                    Navigation_1.default.navigate(route);
                },
            });
        }
        // In phase 1, we only show merge action if report is eligible for merge and only one transaction is selected
        var canMergeTransaction = selectedTransactionsList.length === 1 && report && (0, ReportSecondaryActionUtils_1.isMergeAction)(report, selectedTransactionsList, policy);
        if (canMergeTransaction) {
            options.push({
                text: translate('common.merge'),
                icon: Expensicons.ArrowCollapse,
                value: MERGE,
                onSelected: function () {
                    var targetTransaction = selectedTransactionsList.at(0);
                    if (!report || !targetTransaction) {
                        return;
                    }
                    (0, MergeTransaction_1.setupMergeTransactionData)(targetTransaction.transactionID, { targetTransactionID: targetTransaction.transactionID });
                    Navigation_1.default.navigate(ROUTES_1.default.MERGE_TRANSACTION_LIST_PAGE.getRoute(targetTransaction.transactionID, Navigation_1.default.getActiveRoute()));
                },
            });
        }
        var canAllSelectedTransactionsBeRemoved = selectedTransactionsList.every(function (transaction) {
            var canRemoveTransaction = (0, ReportUtils_1.canDeleteCardTransactionByLiabilityType)(transaction);
            var action = (0, ReportActionsUtils_1.getIOUActionForTransactionID)(reportActions, transaction.transactionID);
            var isActionDeleted = (0, ReportActionsUtils_1.isDeletedAction)(action);
            var isIOUActionOwner = typeof (action === null || action === void 0 ? void 0 : action.actorAccountID) === 'number' && typeof (session === null || session === void 0 ? void 0 : session.accountID) === 'number' && action.actorAccountID === (session === null || session === void 0 ? void 0 : session.accountID);
            return canRemoveTransaction && isIOUActionOwner && !isActionDeleted;
        });
        var canRemoveReportTransaction = (0, ReportUtils_1.canDeleteTransaction)(report, isReportArchived);
        if (canRemoveReportTransaction && canAllSelectedTransactionsBeRemoved) {
            options.push({
                text: translate('common.delete'),
                icon: Expensicons.Trashcan,
                value: CONST_1.default.REPORT.SECONDARY_ACTIONS.DELETE,
                onSelected: showDeleteModal,
            });
        }
        return options;
    }, [
        selectedTransactionIDs,
        report,
        selectedTransactionsList,
        translate,
        isReportArchived,
        policy,
        reportActions,
        clearSelectedTransactions,
        allTransactionsLength,
        integrationsExportTemplates,
        csvExportLayouts,
        isOffline,
        onExportOffline,
        onExportFailed,
        beginExportWithTemplate,
        outstandingReportsByPolicyID,
        iouType,
        lastVisitedPath,
        session === null || session === void 0 ? void 0 : session.accountID,
        showDeleteModal,
        hasTransactionsFromMultipleOwners,
    ]);
    return {
        options: computedOptions,
        handleDeleteTransactions: handleDeleteTransactions,
        isDeleteModalVisible: isDeleteModalVisible,
        showDeleteModal: showDeleteModal,
        hideDeleteModal: hideDeleteModal,
    };
}
exports.default = useSelectedTransactionsActions;
