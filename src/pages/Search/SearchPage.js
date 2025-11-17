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
var react_1 = require("react");
var react_native_1 = require("react-native");
var FullPageNotFoundView_1 = require("@components/BlockingViews/FullPageNotFoundView");
var ConfirmModal_1 = require("@components/ConfirmModal");
var DecisionModal_1 = require("@components/DecisionModal");
var Consumer_1 = require("@components/DragAndDrop/Consumer");
var Provider_1 = require("@components/DragAndDrop/Provider");
var DropZoneUI_1 = require("@components/DropZone/DropZoneUI");
var Expensicons = require("@components/Icon/Expensicons");
var ScreenWrapper_1 = require("@components/ScreenWrapper");
var ScrollOffsetContextProvider_1 = require("@components/ScrollOffsetContextProvider");
var Search_1 = require("@components/Search");
var SearchContext_1 = require("@components/Search/SearchContext");
var SearchPageFooter_1 = require("@components/Search/SearchPageFooter");
var SearchFiltersBar_1 = require("@components/Search/SearchPageHeader/SearchFiltersBar");
var SearchPageHeader_1 = require("@components/Search/SearchPageHeader/SearchPageHeader");
var PlaybackContext_1 = require("@components/VideoPlayerContexts/PlaybackContext");
var useBulkPayOptions_1 = require("@hooks/useBulkPayOptions");
var useCurrentUserPersonalDetails_1 = require("@hooks/useCurrentUserPersonalDetails");
var useFilesValidation_1 = require("@hooks/useFilesValidation");
var useLocalize_1 = require("@hooks/useLocalize");
var useMobileSelectionMode_1 = require("@hooks/useMobileSelectionMode");
var useNetwork_1 = require("@hooks/useNetwork");
var useOnyx_1 = require("@hooks/useOnyx");
var usePermissions_1 = require("@hooks/usePermissions");
var usePersonalPolicy_1 = require("@hooks/usePersonalPolicy");
var usePrevious_1 = require("@hooks/usePrevious");
var useResponsiveLayout_1 = require("@hooks/useResponsiveLayout");
var useTheme_1 = require("@hooks/useTheme");
var useThemeStyles_1 = require("@hooks/useThemeStyles");
var App_1 = require("@libs/actions/App");
var Report_1 = require("@libs/actions/Report");
var Search_2 = require("@libs/actions/Search");
var Transaction_1 = require("@libs/actions/Transaction");
var IOUUtils_1 = require("@libs/IOUUtils");
var Navigation_1 = require("@libs/Navigation/Navigation");
var PolicyUtils_1 = require("@libs/PolicyUtils");
var ReportUtils_1 = require("@libs/ReportUtils");
var SearchQueryUtils_1 = require("@libs/SearchQueryUtils");
var SubscriptionUtils_1 = require("@libs/SubscriptionUtils");
var variables_1 = require("@styles/variables");
var IOU_1 = require("@userActions/IOU");
var Link_1 = require("@userActions/Link");
var TransactionEdit_1 = require("@userActions/TransactionEdit");
var CONST_1 = require("@src/CONST");
var ONYXKEYS_1 = require("@src/ONYXKEYS");
var ROUTES_1 = require("@src/ROUTES");
var SearchPageNarrow_1 = require("./SearchPageNarrow");
function SearchPage(_a) {
    var _b, _c, _d, _e, _f, _g, _h;
    var route = _a.route;
    var _j = (0, useLocalize_1.default)(), translate = _j.translate, localeCompare = _j.localeCompare, formatPhoneNumber = _j.formatPhoneNumber;
    var isBetaEnabled = (0, usePermissions_1.default)().isBetaEnabled;
    // We need to use isSmallScreenWidth instead of shouldUseNarrowLayout to apply the correct modal type for the decision modal
    // eslint-disable-next-line rulesdir/prefer-shouldUseNarrowLayout-instead-of-isSmallScreenWidth
    var _k = (0, useResponsiveLayout_1.default)(), shouldUseNarrowLayout = _k.shouldUseNarrowLayout, isSmallScreenWidth = _k.isSmallScreenWidth;
    var styles = (0, useThemeStyles_1.default)();
    var theme = (0, useTheme_1.default)();
    var isOffline = (0, useNetwork_1.default)().isOffline;
    var _l = (0, SearchContext_1.useSearchContext)(), selectedTransactions = _l.selectedTransactions, clearSelectedTransactions = _l.clearSelectedTransactions, selectedReports = _l.selectedReports, lastSearchType = _l.lastSearchType, setLastSearchType = _l.setLastSearchType, areAllMatchingItemsSelected = _l.areAllMatchingItemsSelected, selectAllMatchingItems = _l.selectAllMatchingItems;
    var currentUserPersonalDetails = (0, useCurrentUserPersonalDetails_1.default)();
    var isMobileSelectionModeEnabled = (0, useMobileSelectionMode_1.default)();
    var lastPaymentMethods = (0, useOnyx_1.default)(ONYXKEYS_1.default.NVP_LAST_PAYMENT_METHOD, { canBeMissing: true })[0];
    var currentDate = (0, useOnyx_1.default)(ONYXKEYS_1.default.CURRENT_DATE, { canBeMissing: true })[0];
    var newReportID = (0, ReportUtils_1.generateReportID)();
    var newReport = (0, useOnyx_1.default)("".concat(ONYXKEYS_1.default.COLLECTION.REPORT).concat(newReportID), { canBeMissing: true })[0];
    var newParentReport = (0, useOnyx_1.default)("".concat(ONYXKEYS_1.default.COLLECTION.REPORT).concat(newReport === null || newReport === void 0 ? void 0 : newReport.parentReportID), { canBeMissing: true })[0];
    var activePolicyID = (0, useOnyx_1.default)(ONYXKEYS_1.default.NVP_ACTIVE_POLICY_ID, { canBeMissing: false })[0];
    var activePolicy = (0, useOnyx_1.default)("".concat(ONYXKEYS_1.default.COLLECTION.POLICY).concat(activePolicyID), { canBeMissing: true })[0];
    var personalPolicy = (0, usePersonalPolicy_1.default)();
    var policies = (0, useOnyx_1.default)(ONYXKEYS_1.default.COLLECTION.POLICY, { canBeMissing: true })[0];
    var integrationsExportTemplates = (0, useOnyx_1.default)(ONYXKEYS_1.default.NVP_INTEGRATION_SERVER_EXPORT_TEMPLATES, { canBeMissing: true })[0];
    var csvExportLayouts = (0, useOnyx_1.default)(ONYXKEYS_1.default.NVP_CSV_EXPORT_LAYOUTS, { canBeMissing: true })[0];
    var _m = (0, react_1.useState)(false), isOfflineModalVisible = _m[0], setIsOfflineModalVisible = _m[1];
    var _o = (0, react_1.useState)(false), isDownloadErrorModalVisible = _o[0], setIsDownloadErrorModalVisible = _o[1];
    var _p = (0, react_1.useState)(false), isDeleteExpensesConfirmModalVisible = _p[0], setIsDeleteExpensesConfirmModalVisible = _p[1];
    var _q = (0, react_1.useState)(false), isDownloadExportModalVisible = _q[0], setIsDownloadExportModalVisible = _q[1];
    var _r = (0, react_1.useState)(false), isExportWithTemplateModalVisible = _r[0], setIsExportWithTemplateModalVisible = _r[1];
    var _s = (0, react_1.useState)(null), searchRequestResponseStatusCode = _s[0], setSearchRequestResponseStatusCode = _s[1];
    var _t = (0, react_1.useState)(false), isDEWModalVisible = _t[0], setIsDEWModalVisible = _t[1];
    var queryJSON = (0, react_1.useMemo)(function () { return (0, SearchQueryUtils_1.buildSearchQueryJSON)(route.params.q); }, [route.params.q]);
    var saveScrollOffset = (0, react_1.useContext)(ScrollOffsetContextProvider_1.ScrollOffsetContext).saveScrollOffset;
    var activeAdminPolicies = (0, PolicyUtils_1.getActiveAdminWorkspaces)(policies, currentUserPersonalDetails === null || currentUserPersonalDetails === void 0 ? void 0 : currentUserPersonalDetails.accountID.toString()).sort(function (a, b) { return localeCompare(a.name || '', b.name || ''); });
    // eslint-disable-next-line rulesdir/no-default-id-values
    var currentSearchResults = (0, useOnyx_1.default)("".concat(ONYXKEYS_1.default.COLLECTION.SNAPSHOT).concat((_b = queryJSON === null || queryJSON === void 0 ? void 0 : queryJSON.hash) !== null && _b !== void 0 ? _b : CONST_1.default.DEFAULT_NUMBER_ID), { canBeMissing: true })[0];
    var lastNonEmptySearchResults = (0, react_1.useRef)(undefined);
    var selectedTransactionReportIDs = (0, react_1.useMemo)(function () { return __spreadArray([], new Set(Object.values(selectedTransactions).map(function (transaction) { return transaction.reportID; })), true); }, [selectedTransactions]);
    var selectedReportIDs = Object.values(selectedReports).map(function (report) { return report.reportID; });
    var isCurrencySupportedBulkWallet = (0, Search_2.isCurrencySupportWalletBulkPay)(selectedReports, selectedTransactions);
    var isBetaBulkPayEnabled = isBetaEnabled(CONST_1.default.BETAS.PAYMENT_BUTTONS);
    // Collate a list of policyIDs from the selected transactions
    var selectedPolicyIDs = (0, react_1.useMemo)(function () { return __spreadArray([], new Set(Object.values(selectedTransactions)
        .map(function (transaction) { return transaction.policyID; })
        .filter(Boolean)), true); }, [selectedTransactions]);
    var selectedBulkCurrency = (_d = (_c = selectedReports.at(0)) === null || _c === void 0 ? void 0 : _c.currency) !== null && _d !== void 0 ? _d : (_e = Object.values(selectedTransactions).at(0)) === null || _e === void 0 ? void 0 : _e.currency;
    var totalFormattedAmount = (0, Search_2.getTotalFormattedAmount)(selectedReports, selectedTransactions, selectedBulkCurrency);
    var _u = (0, useBulkPayOptions_1.default)({
        selectedPolicyID: selectedPolicyIDs.at(0),
        selectedReportID: (_f = selectedTransactionReportIDs.at(0)) !== null && _f !== void 0 ? _f : selectedReportIDs.at(0),
        activeAdminPolicies: activeAdminPolicies,
        isCurrencySupportedWallet: isCurrencySupportedBulkWallet,
        currency: selectedBulkCurrency,
        formattedAmount: totalFormattedAmount,
    }), bulkPayButtonOptions = _u.bulkPayButtonOptions, latestBankItems = _u.latestBankItems;
    (0, react_1.useEffect)(function () {
        (0, App_1.confirmReadyToOpenApp)();
    }, []);
    (0, react_1.useEffect)(function () {
        var _a;
        if (!((_a = currentSearchResults === null || currentSearchResults === void 0 ? void 0 : currentSearchResults.search) === null || _a === void 0 ? void 0 : _a.type)) {
            return;
        }
        setLastSearchType(currentSearchResults.search.type);
        if (currentSearchResults.data) {
            lastNonEmptySearchResults.current = currentSearchResults;
        }
    }, [lastSearchType, queryJSON, setLastSearchType, currentSearchResults]);
    var _v = queryJSON !== null && queryJSON !== void 0 ? queryJSON : {}, status = _v.status, hash = _v.hash;
    var selectedTransactionsKeys = Object.keys(selectedTransactions !== null && selectedTransactions !== void 0 ? selectedTransactions : {});
    var beginExportWithTemplate = (0, react_1.useCallback)(function (templateName, templateType, policyID) {
        // If the user has selected a large number of items, we'll use the queryJSON to search for the reportIDs and transactionIDs necessary for the export
        if (areAllMatchingItemsSelected) {
            (0, Search_2.queueExportSearchWithTemplate)({ templateName: templateName, templateType: templateType, jsonQuery: JSON.stringify(queryJSON), reportIDList: [], transactionIDList: [], policyID: policyID });
        }
        else {
            // Otherwise, we will use the selected transactionIDs and reportIDs directly
            (0, Search_2.queueExportSearchWithTemplate)({
                templateName: templateName,
                templateType: templateType,
                jsonQuery: '{}',
                reportIDList: selectedTransactionReportIDs,
                transactionIDList: selectedTransactionsKeys,
                policyID: policyID,
            });
        }
        setIsExportWithTemplateModalVisible(true);
    }, [queryJSON, selectedTransactionsKeys, areAllMatchingItemsSelected, selectedTransactionReportIDs]);
    var onBulkPaySelected = (0, react_1.useCallback)(function (paymentMethod, additionalData) {
        var _a, _b;
        if (!hash) {
            return;
        }
        if (isOffline) {
            setIsOfflineModalVisible(true);
            return;
        }
        var activeRoute = Navigation_1.default.getActiveRoute();
        var transactionIDList = selectedReports.length ? undefined : Object.keys(selectedTransactions);
        var selectedOptions = selectedReports.length ? selectedReports : Object.values(selectedTransactions);
        for (var _i = 0, selectedOptions_1 = selectedOptions; _i < selectedOptions_1.length; _i++) {
            var item = selectedOptions_1[_i];
            var itemPolicyID = item.policyID;
            var itemReportID = item.reportID;
            var isExpenseReport = (0, ReportUtils_1.isExpenseReport)(itemReportID);
            var isIOUReport = (0, ReportUtils_1.isIOUReport)(itemReportID);
            var reportType = (0, Search_2.getReportType)(itemReportID);
            var lastPolicyPaymentMethod = (_a = (0, Search_2.getLastPolicyPaymentMethod)(itemPolicyID, lastPaymentMethods, reportType)) !== null && _a !== void 0 ? _a : paymentMethod;
            if (!lastPolicyPaymentMethod) {
                Navigation_1.default.navigate(ROUTES_1.default.SEARCH_REPORT.getRoute({
                    reportID: itemReportID,
                    backTo: activeRoute,
                }));
                return;
            }
            var hasPolicyVBBA = (0, PolicyUtils_1.hasVBBA)(itemPolicyID);
            if (isExpenseReport && lastPolicyPaymentMethod !== CONST_1.default.IOU.PAYMENT_TYPE.ELSEWHERE && !hasPolicyVBBA) {
                Navigation_1.default.navigate(ROUTES_1.default.SEARCH_REPORT.getRoute({
                    reportID: item.reportID,
                    backTo: activeRoute,
                }));
                return;
            }
            var isPolicyPaymentMethod = !Object.values(CONST_1.default.IOU.PAYMENT_TYPE).includes(lastPolicyPaymentMethod);
            // If lastPolicyPaymentMethod is not type of CONST.IOU.PAYMENT_TYPE, we're using workspace to pay the IOU
            // Then we should move it to that workspace.
            if (isPolicyPaymentMethod && isIOUReport) {
                var adminPolicy = policies === null || policies === void 0 ? void 0 : policies["".concat(ONYXKEYS_1.default.COLLECTION.POLICY).concat(lastPolicyPaymentMethod)];
                if (!adminPolicy) {
                    Navigation_1.default.navigate(ROUTES_1.default.SEARCH_REPORT.getRoute({
                        reportID: item.reportID,
                        backTo: activeRoute,
                    }));
                    return;
                }
                var invite = (0, Report_1.moveIOUReportToPolicyAndInviteSubmitter)(itemReportID, adminPolicy, formatPhoneNumber);
                if (!(invite === null || invite === void 0 ? void 0 : invite.policyExpenseChatReportID)) {
                    (0, Report_1.moveIOUReportToPolicy)(itemReportID, adminPolicy);
                }
            }
        }
        var paymentAdditionalData = (_b = additionalData) !== null && _b !== void 0 ? _b : {};
        var paymentData = (selectedReports.length
            ? selectedReports.map(function (report) {
                var _a, _b, _c;
                return __assign({ reportID: report.reportID, amount: report.total, paymentType: (_a = (0, Search_2.getLastPolicyPaymentMethod)(report.policyID, lastPaymentMethods)) !== null && _a !== void 0 ? _a : paymentMethod }, ((0, ReportUtils_1.isInvoiceReport)(report.reportID)
                    ? (0, Search_2.getPayMoneyOnSearchInvoiceParams)(report.policyID, (_b = paymentAdditionalData === null || paymentAdditionalData === void 0 ? void 0 : paymentAdditionalData.payAsBusiness) !== null && _b !== void 0 ? _b : (0, ReportUtils_1.isBusinessInvoiceRoom)(report.chatReportID), (_c = paymentAdditionalData === null || paymentAdditionalData === void 0 ? void 0 : paymentAdditionalData.bankAccountID) !== null && _c !== void 0 ? _c : (0, Search_2.getLastPolicyBankAccountID)(report.policyID, lastPaymentMethods), CONST_1.default.PAYMENT_METHODS.PERSONAL_BANK_ACCOUNT)
                    : {}));
            })
            : Object.values(selectedTransactions).map(function (transaction) {
                var _a, _b, _c;
                return (__assign({ reportID: transaction.reportID, amount: transaction.amount, paymentType: (_a = (0, Search_2.getLastPolicyPaymentMethod)(transaction.policyID, lastPaymentMethods)) !== null && _a !== void 0 ? _a : paymentMethod }, ((0, ReportUtils_1.isInvoiceReport)(transaction.reportID)
                    ? (0, Search_2.getPayMoneyOnSearchInvoiceParams)(transaction.policyID, (_b = paymentAdditionalData === null || paymentAdditionalData === void 0 ? void 0 : paymentAdditionalData.payAsBusiness) !== null && _b !== void 0 ? _b : (0, ReportUtils_1.isBusinessInvoiceRoom)(transaction.reportID), (_c = paymentAdditionalData === null || paymentAdditionalData === void 0 ? void 0 : paymentAdditionalData.bankAccountID) !== null && _c !== void 0 ? _c : (0, Search_2.getLastPolicyBankAccountID)(transaction.policyID, lastPaymentMethods), CONST_1.default.PAYMENT_METHODS.PERSONAL_BANK_ACCOUNT)
                    : {})));
            }));
        (0, Search_2.payMoneyRequestOnSearch)(hash, paymentData, transactionIDList);
        // eslint-disable-next-line @typescript-eslint/no-deprecated
        react_native_1.InteractionManager.runAfterInteractions(function () {
            clearSelectedTransactions();
        });
    }, [clearSelectedTransactions, hash, isOffline, lastPaymentMethods, selectedReports, selectedTransactions, policies, formatPhoneNumber]);
    var headerButtonsOptions = (0, react_1.useMemo)(function () {
        var _a, _b;
        if (selectedTransactionsKeys.length === 0 || status == null || !hash) {
            return CONST_1.default.EMPTY_ARRAY;
        }
        var options = [];
        var isAnyTransactionOnHold = Object.values(selectedTransactions).some(function (transaction) { return transaction.isHeld; });
        // Gets the list of options for the export sub-menu
        var getExportOptions = function () {
            // We provide the basic and expense level export options by default
            var exportOptions = [
                {
                    text: translate('export.basicExport'),
                    icon: Expensicons.Table,
                    onSelected: function () {
                        var _a;
                        if (isOffline) {
                            setIsOfflineModalVisible(true);
                            return;
                        }
                        if (areAllMatchingItemsSelected) {
                            setIsDownloadExportModalVisible(true);
                            return;
                        }
                        (0, Search_2.exportSearchItemsToCSV)({
                            query: status,
                            jsonQuery: JSON.stringify(queryJSON),
                            reportIDList: (_a = selectedReports === null || selectedReports === void 0 ? void 0 : selectedReports.filter(function (report) { return !!report; }).map(function (report) { return report.reportID; })) !== null && _a !== void 0 ? _a : [],
                            transactionIDList: selectedTransactionsKeys,
                        }, function () {
                            setIsDownloadErrorModalVisible(true);
                        });
                        clearSelectedTransactions(undefined, true);
                    },
                    shouldCloseModalOnSelect: true,
                    shouldCallAfterModalHide: true,
                },
            ];
            // Determine if only full reports are selected by comparing the reportIDs of the selected transactions and the reportIDs of the selected reports
            var areFullReportsSelected = selectedTransactionReportIDs.length === selectedReportIDs.length && selectedTransactionReportIDs.every(function (id) { return selectedReportIDs.includes(id); });
            var typeExpenseReport = (queryJSON === null || queryJSON === void 0 ? void 0 : queryJSON.type) === CONST_1.default.SEARCH.DATA_TYPES.EXPENSE_REPORT;
            var typeInvoice = (queryJSON === null || queryJSON === void 0 ? void 0 : queryJSON.type) === CONST_1.default.REPORT.TYPE.INVOICE;
            var typeExpense = (queryJSON === null || queryJSON === void 0 ? void 0 : queryJSON.type) === CONST_1.default.REPORT.TYPE.EXPENSE;
            var isAllOneTransactionReport = Object.values(selectedTransactions).every(function (transaction) { return transaction.isFromOneTransactionReport; });
            // If we're grouping by invoice or report, and all the expenses on the report are selected, or if all
            // the selected expenses are the only expenses of their parent expense report include the report level export option.
            var includeReportLevelExport = ((typeExpenseReport || typeInvoice) && areFullReportsSelected) || (typeExpense && !typeExpenseReport && isAllOneTransactionReport);
            // Collect a list of export templates available to the user from their account, policy, and custom integrations templates
            var policy = selectedPolicyIDs.length === 1 ? policies === null || policies === void 0 ? void 0 : policies["".concat(ONYXKEYS_1.default.COLLECTION.POLICY).concat(selectedPolicyIDs.at(0))] : undefined;
            var exportTemplates = (0, Search_2.getExportTemplates)(integrationsExportTemplates !== null && integrationsExportTemplates !== void 0 ? integrationsExportTemplates : [], csvExportLayouts !== null && csvExportLayouts !== void 0 ? csvExportLayouts : {}, translate, policy, includeReportLevelExport);
            var _loop_1 = function (template) {
                exportOptions.push({
                    text: template.name,
                    icon: Expensicons.Table,
                    description: template.description,
                    onSelected: function () {
                        beginExportWithTemplate(template.templateName, template.type, template.policyID);
                    },
                    shouldCloseModalOnSelect: true,
                    shouldCallAfterModalHide: true,
                });
            };
            for (var _i = 0, exportTemplates_1 = exportTemplates; _i < exportTemplates_1.length; _i++) {
                var template = exportTemplates_1[_i];
                _loop_1(template);
            }
            return exportOptions;
        };
        var exportButtonOption = {
            icon: Expensicons.Export,
            rightIcon: Expensicons.ArrowRight,
            text: translate('common.export'),
            backButtonText: translate('common.export'),
            value: CONST_1.default.SEARCH.BULK_ACTION_TYPES.EXPORT,
            shouldCloseModalOnSelect: true,
            subMenuItems: getExportOptions(),
        };
        // If all matching items are selected, we don't give the user additional options, we only allow them to export the selected items
        if (areAllMatchingItemsSelected) {
            return [exportButtonOption];
        }
        // Otherwise, we provide the full set of options depending on the state of the selected transactions and reports
        var areSelectedTransactionsIncludedInReports = selectedTransactionsKeys.every(function (id) { return selectedReportIDs.includes(selectedTransactions[id].reportID); });
        var shouldShowApproveOption = !isOffline &&
            !isAnyTransactionOnHold &&
            areSelectedTransactionsIncludedInReports &&
            (selectedReports.length
                ? selectedReports.every(function (report) { return report.allActions.includes(CONST_1.default.SEARCH.ACTION_TYPES.APPROVE); })
                : selectedTransactionsKeys.every(function (id) { return selectedTransactions[id].action === CONST_1.default.SEARCH.ACTION_TYPES.APPROVE; }));
        if (shouldShowApproveOption) {
            options.push({
                icon: Expensicons.ThumbsUp,
                text: translate('search.bulkActions.approve'),
                value: CONST_1.default.SEARCH.BULK_ACTION_TYPES.APPROVE,
                shouldCloseModalOnSelect: true,
                onSelected: function () {
                    var _a;
                    if (isOffline) {
                        setIsOfflineModalVisible(true);
                        return;
                    }
                    // Check if any of the selected items have DEW enabled
                    var selectedPolicyIDList = selectedReports.length
                        ? selectedReports.map(function (report) { return report.policyID; })
                        : Object.values(selectedTransactions).map(function (transaction) { return transaction.policyID; });
                    var hasDEWPolicy = selectedPolicyIDList.some(function (policyID) {
                        var policy = policies === null || policies === void 0 ? void 0 : policies["".concat(ONYXKEYS_1.default.COLLECTION.POLICY).concat(policyID)];
                        return (0, PolicyUtils_1.hasDynamicExternalWorkflow)(policy);
                    });
                    if (hasDEWPolicy) {
                        setIsDEWModalVisible(true);
                        return;
                    }
                    var transactionIDList = selectedReports.length ? undefined : Object.keys(selectedTransactions);
                    var reportIDList = !selectedReports.length
                        ? Object.values(selectedTransactions).map(function (transaction) { return transaction.reportID; })
                        : ((_a = selectedReports === null || selectedReports === void 0 ? void 0 : selectedReports.filter(function (report) { return !!report; }).map(function (report) { return report.reportID; })) !== null && _a !== void 0 ? _a : []);
                    (0, Search_2.approveMoneyRequestOnSearch)(hash, reportIDList, transactionIDList);
                    // eslint-disable-next-line @typescript-eslint/no-deprecated
                    react_native_1.InteractionManager.runAfterInteractions(function () {
                        clearSelectedTransactions();
                    });
                },
            });
        }
        var shouldShowSubmitOption = !isOffline &&
            areSelectedTransactionsIncludedInReports &&
            (selectedReports.length
                ? selectedReports.every(function (report) { return report.allActions.includes(CONST_1.default.SEARCH.ACTION_TYPES.SUBMIT); })
                : selectedTransactionsKeys.every(function (id) { return selectedTransactions[id].action === CONST_1.default.SEARCH.ACTION_TYPES.SUBMIT; }));
        if (shouldShowSubmitOption) {
            options.push({
                icon: Expensicons.Send,
                text: translate('common.submit'),
                value: CONST_1.default.SEARCH.BULK_ACTION_TYPES.SUBMIT,
                shouldCloseModalOnSelect: true,
                onSelected: function () {
                    var _a;
                    if (isOffline) {
                        setIsOfflineModalVisible(true);
                        return;
                    }
                    var itemList = !selectedReports.length ? Object.values(selectedTransactions).map(function (transaction) { return transaction; }) : ((_a = selectedReports === null || selectedReports === void 0 ? void 0 : selectedReports.filter(function (report) { return !!report; })) !== null && _a !== void 0 ? _a : []);
                    itemList.forEach(function (item) {
                        var policy = policies === null || policies === void 0 ? void 0 : policies["".concat(ONYXKEYS_1.default.COLLECTION.POLICY).concat(item.policyID)];
                        if (policy) {
                            var reportTransactionIDs = selectedReports.length
                                ? undefined
                                : Object.keys(selectedTransactions).filter(function (id) { return selectedTransactions[id].reportID === item.reportID; });
                            (0, Search_2.submitMoneyRequestOnSearch)(hash, [item], [policy], reportTransactionIDs);
                        }
                    });
                    clearSelectedTransactions();
                },
            });
        }
        var shouldEnableExpenseBulk = selectedReports.length
            ? selectedReports.every(function (report) { return report.allActions.includes(CONST_1.default.SEARCH.ACTION_TYPES.PAY) && report.policyID && (0, Search_2.getLastPolicyPaymentMethod)(report.policyID, lastPaymentMethods); })
            : selectedTransactionsKeys.every(function (id) {
                return selectedTransactions[id].action === CONST_1.default.SEARCH.ACTION_TYPES.PAY &&
                    selectedTransactions[id].policyID &&
                    (0, Search_2.getLastPolicyPaymentMethod)(selectedTransactions[id].policyID, lastPaymentMethods);
            });
        var _c = (0, Search_2.getPayOption)(selectedReports, selectedTransactions, lastPaymentMethods, selectedReportIDs), shouldEnableBulkPayOption = _c.shouldEnableBulkPayOption, isFirstTimePayment = _c.isFirstTimePayment;
        var shouldShowPayOption = !isOffline && !isAnyTransactionOnHold && (isBetaBulkPayEnabled ? shouldEnableBulkPayOption : shouldEnableExpenseBulk);
        if (shouldShowPayOption) {
            var payButtonOption = {
                icon: Expensicons.MoneyBag,
                text: translate('search.bulkActions.pay'),
                rightIcon: isFirstTimePayment ? Expensicons.ArrowRight : undefined,
                value: CONST_1.default.SEARCH.BULK_ACTION_TYPES.PAY,
                shouldCloseModalOnSelect: true,
                subMenuItems: isFirstTimePayment ? bulkPayButtonOptions : undefined,
                onSelected: function () { return onBulkPaySelected(undefined); },
            };
            options.push(payButtonOption);
        }
        options.push(exportButtonOption);
        var shouldShowHoldOption = !isOffline && selectedTransactionsKeys.every(function (id) { return selectedTransactions[id].canHold; });
        if (shouldShowHoldOption) {
            options.push({
                icon: Expensicons.Stopwatch,
                text: translate('search.bulkActions.hold'),
                value: CONST_1.default.SEARCH.BULK_ACTION_TYPES.HOLD,
                shouldCloseModalOnSelect: true,
                onSelected: function () {
                    if (isOffline) {
                        setIsOfflineModalVisible(true);
                        return;
                    }
                    Navigation_1.default.navigate(ROUTES_1.default.TRANSACTION_HOLD_REASON_RHP);
                },
            });
        }
        var shouldShowUnholdOption = !isOffline && selectedTransactionsKeys.every(function (id) { return selectedTransactions[id].canUnhold; });
        if (shouldShowUnholdOption) {
            options.push({
                icon: Expensicons.Stopwatch,
                text: translate('search.bulkActions.unhold'),
                value: CONST_1.default.SEARCH.BULK_ACTION_TYPES.UNHOLD,
                shouldCloseModalOnSelect: true,
                onSelected: function () {
                    if (isOffline) {
                        setIsOfflineModalVisible(true);
                        return;
                    }
                    (0, Search_2.unholdMoneyRequestOnSearch)(hash, selectedTransactionsKeys);
                    // eslint-disable-next-line @typescript-eslint/no-deprecated
                    react_native_1.InteractionManager.runAfterInteractions(function () {
                        clearSelectedTransactions();
                    });
                },
            });
        }
        var ownerAccountIDs = new Set();
        var hasUnknownOwner = false;
        for (var _i = 0, selectedTransactionsKeys_1 = selectedTransactionsKeys; _i < selectedTransactionsKeys_1.length; _i++) {
            var id = selectedTransactionsKeys_1[_i];
            var transactionEntry = selectedTransactions[id];
            if (!transactionEntry) {
                continue;
            }
            var ownerAccountID = (_a = transactionEntry.ownerAccountID) !== null && _a !== void 0 ? _a : (_b = (0, ReportUtils_1.getReportOrDraftReport)(transactionEntry.reportID)) === null || _b === void 0 ? void 0 : _b.ownerAccountID;
            if (typeof ownerAccountID === 'number') {
                ownerAccountIDs.add(ownerAccountID);
                if (ownerAccountIDs.size > 1) {
                    break;
                }
            }
            else {
                hasUnknownOwner = true;
            }
        }
        var hasMultipleOwners = ownerAccountIDs.size > 1 || (hasUnknownOwner && (ownerAccountIDs.size > 0 || selectedTransactionsKeys.length > 1));
        var canAllTransactionsBeMoved = selectedTransactionsKeys.every(function (id) { return selectedTransactions[id].canChangeReport; });
        if (canAllTransactionsBeMoved && !hasMultipleOwners) {
            options.push({
                text: translate('iou.moveExpenses', { count: selectedTransactionsKeys.length }),
                icon: Expensicons.DocumentMerge,
                value: CONST_1.default.SEARCH.BULK_ACTION_TYPES.CHANGE_REPORT,
                shouldCloseModalOnSelect: true,
                onSelected: function () { return Navigation_1.default.navigate(ROUTES_1.default.MOVE_TRANSACTIONS_SEARCH_RHP); },
            });
        }
        var shouldShowDeleteOption = !isOffline && selectedTransactionsKeys.every(function (id) { return selectedTransactions[id].canDelete; });
        if (shouldShowDeleteOption) {
            options.push({
                icon: Expensicons.Trashcan,
                text: translate('search.bulkActions.delete'),
                value: CONST_1.default.SEARCH.BULK_ACTION_TYPES.DELETE,
                shouldCloseModalOnSelect: true,
                onSelected: function () {
                    if (isOffline) {
                        setIsOfflineModalVisible(true);
                        return;
                    }
                    // Use InteractionManager to ensure this runs after the dropdown modal closes
                    // eslint-disable-next-line @typescript-eslint/no-deprecated
                    react_native_1.InteractionManager.runAfterInteractions(function () {
                        setIsDeleteExpensesConfirmModalVisible(true);
                    });
                },
            });
        }
        if (options.length === 0) {
            var emptyOptionStyle = {
                interactive: false,
                iconFill: theme.icon,
                iconHeight: variables_1.default.iconSizeLarge,
                iconWidth: variables_1.default.iconSizeLarge,
                numberOfLinesTitle: 2,
                titleStyle: __assign(__assign(__assign({}, styles.colorMuted), styles.fontWeightNormal), styles.textWrap),
            };
            options.push(__assign({ icon: Expensicons.Exclamation, text: translate('search.bulkActions.noOptionsAvailable'), value: undefined }, emptyOptionStyle));
        }
        return options;
    }, [
        selectedTransactionsKeys,
        status,
        hash,
        selectedTransactions,
        translate,
        areAllMatchingItemsSelected,
        isOffline,
        selectedReports,
        queryJSON,
        clearSelectedTransactions,
        lastPaymentMethods,
        theme.icon,
        styles.colorMuted,
        styles.fontWeightNormal,
        styles.textWrap,
        beginExportWithTemplate,
        integrationsExportTemplates,
        csvExportLayouts,
        policies,
        bulkPayButtonOptions,
        onBulkPaySelected,
        selectedPolicyIDs,
        selectedReportIDs,
        selectedTransactionReportIDs,
        isBetaBulkPayEnabled,
    ]);
    var handleDeleteExpenses = function () {
        if (selectedTransactionsKeys.length === 0 || !hash) {
            return;
        }
        setIsDeleteExpensesConfirmModalVisible(false);
        // Translations copy for delete modal depends on amount of selected items,
        // We need to wait for modal to fully disappear before clearing them to avoid translation flicker between singular vs plural
        // eslint-disable-next-line @typescript-eslint/no-deprecated
        react_native_1.InteractionManager.runAfterInteractions(function () {
            (0, Search_2.deleteMoneyRequestOnSearch)(hash, selectedTransactionsKeys, currentSearchResults);
            clearSelectedTransactions();
        });
    };
    var saveFileAndInitMoneyRequest = function (files) {
        var initialTransaction = (0, IOU_1.initMoneyRequest)({
            isFromGlobalCreate: true,
            reportID: newReportID,
            newIouRequestType: CONST_1.default.IOU.REQUEST_TYPE.SCAN,
            report: newReport,
            parentReport: newParentReport,
            currentDate: currentDate,
            currentUserPersonalDetails: currentUserPersonalDetails,
        });
        var newReceiptFiles = [];
        files.forEach(function (file, index) {
            var _a, _b;
            var source = URL.createObjectURL(file);
            var transaction = index === 0
                ? initialTransaction
                : (0, TransactionEdit_1.buildOptimisticTransactionAndCreateDraft)({
                    initialTransaction: initialTransaction,
                    currentUserPersonalDetails: currentUserPersonalDetails,
                    reportID: newReportID,
                });
            var transactionID = (_a = transaction.transactionID) !== null && _a !== void 0 ? _a : CONST_1.default.IOU.OPTIMISTIC_TRANSACTION_ID;
            newReceiptFiles.push({
                file: file,
                source: source,
                transactionID: transactionID,
            });
            (0, IOU_1.setMoneyRequestReceipt)(transactionID, source, (_b = file.name) !== null && _b !== void 0 ? _b : '', true, file.type);
        });
        if ((0, PolicyUtils_1.isPaidGroupPolicy)(activePolicy) && (activePolicy === null || activePolicy === void 0 ? void 0 : activePolicy.isPolicyExpenseChatEnabled) && !(0, SubscriptionUtils_1.shouldRestrictUserBillableActions)(activePolicy.id)) {
            var activePolicyExpenseChat_1 = (0, ReportUtils_1.getPolicyExpenseChat)(currentUserPersonalDetails.accountID, activePolicy === null || activePolicy === void 0 ? void 0 : activePolicy.id);
            var shouldAutoReport = !!(activePolicy === null || activePolicy === void 0 ? void 0 : activePolicy.autoReporting) || !!(personalPolicy === null || personalPolicy === void 0 ? void 0 : personalPolicy.autoReporting);
            var transactionReportID_1 = shouldAutoReport ? activePolicyExpenseChat_1 === null || activePolicyExpenseChat_1 === void 0 ? void 0 : activePolicyExpenseChat_1.reportID : CONST_1.default.REPORT.UNREPORTED_REPORT_ID;
            var setParticipantsPromises = newReceiptFiles.map(function (receiptFile) {
                (0, Transaction_1.setTransactionReport)(receiptFile.transactionID, { reportID: transactionReportID_1 }, true);
                return (0, IOU_1.setMoneyRequestParticipantsFromReport)(receiptFile.transactionID, activePolicyExpenseChat_1);
            });
            Promise.all(setParticipantsPromises).then(function () {
                var _a;
                return Navigation_1.default.navigate(ROUTES_1.default.MONEY_REQUEST_STEP_CONFIRMATION.getRoute(CONST_1.default.IOU.ACTION.CREATE, CONST_1.default.IOU.TYPE.SUBMIT, (_a = initialTransaction === null || initialTransaction === void 0 ? void 0 : initialTransaction.transactionID) !== null && _a !== void 0 ? _a : CONST_1.default.IOU.OPTIMISTIC_TRANSACTION_ID, activePolicyExpenseChat_1 === null || activePolicyExpenseChat_1 === void 0 ? void 0 : activePolicyExpenseChat_1.reportID));
            });
        }
        else {
            (0, IOUUtils_1.navigateToParticipantPage)(CONST_1.default.IOU.TYPE.CREATE, CONST_1.default.IOU.OPTIMISTIC_TRANSACTION_ID, newReportID);
        }
    };
    var _w = (0, useFilesValidation_1.default)(saveFileAndInitMoneyRequest), validateFiles = _w.validateFiles, PDFValidationComponent = _w.PDFValidationComponent, ErrorModal = _w.ErrorModal;
    var initScanRequest = function (e) {
        var _a, _b, _c, _d;
        var files = Array.from((_b = (_a = e === null || e === void 0 ? void 0 : e.dataTransfer) === null || _a === void 0 ? void 0 : _a.files) !== null && _b !== void 0 ? _b : []);
        if (files.length === 0) {
            return;
        }
        files.forEach(function (file) {
            // eslint-disable-next-line no-param-reassign
            file.uri = URL.createObjectURL(file);
        });
        validateFiles(files, Array.from((_d = (_c = e.dataTransfer) === null || _c === void 0 ? void 0 : _c.items) !== null && _d !== void 0 ? _d : []));
    };
    var createExportAll = (0, react_1.useCallback)(function () {
        var _a;
        if (selectedTransactionsKeys.length === 0 || status == null || !hash) {
            return [];
        }
        setIsDownloadExportModalVisible(false);
        var reportIDList = (_a = selectedReports === null || selectedReports === void 0 ? void 0 : selectedReports.filter(function (report) { return !!report; }).map(function (report) { return report.reportID; })) !== null && _a !== void 0 ? _a : [];
        (0, Search_2.queueExportSearchItemsToCSV)({
            query: status,
            jsonQuery: JSON.stringify(queryJSON),
            reportIDList: reportIDList,
            transactionIDList: selectedTransactionsKeys,
        });
        selectAllMatchingItems(false);
        clearSelectedTransactions();
    }, [selectedTransactionsKeys, status, hash, selectedReports, queryJSON, selectAllMatchingItems, clearSelectedTransactions]);
    var handleOnBackButtonPress = function () { return Navigation_1.default.goBack(ROUTES_1.default.SEARCH_ROOT.getRoute({ query: (0, SearchQueryUtils_1.buildCannedSearchQuery)() })); };
    var resetVideoPlayerData = (0, PlaybackContext_1.usePlaybackContext)().resetVideoPlayerData;
    var _x = (0, react_1.useState)(false), isSorting = _x[0], setIsSorting = _x[1];
    var searchResults;
    if (currentSearchResults === null || currentSearchResults === void 0 ? void 0 : currentSearchResults.data) {
        searchResults = currentSearchResults;
    }
    else if (isSorting) {
        searchResults = lastNonEmptySearchResults.current;
    }
    var metadata = searchResults === null || searchResults === void 0 ? void 0 : searchResults.search;
    var shouldShowOfflineIndicator = !!(searchResults === null || searchResults === void 0 ? void 0 : searchResults.data);
    var shouldShowFooter = !!(metadata === null || metadata === void 0 ? void 0 : metadata.count) || selectedTransactionsKeys.length > 0;
    var offlineIndicatorStyle = (0, react_1.useMemo)(function () {
        if (shouldShowFooter) {
            return [styles.mtAuto, styles.pAbsolute, styles.h10, styles.b0];
        }
        return [styles.mtAuto];
    }, [shouldShowFooter, styles]);
    // Handles video player cleanup:
    // 1. On mount: Resets player if navigating from report screen
    // 2. On unmount: Stops video when leaving this screen
    // in narrow layout, the reset will be handled by the attachment modal, so we don't need to do it here to preserve autoplay
    (0, react_1.useEffect)(function () {
        if (shouldUseNarrowLayout) {
            return;
        }
        resetVideoPlayerData();
        return function () {
            if (shouldUseNarrowLayout) {
                return;
            }
            resetVideoPlayerData();
        };
        // eslint-disable-next-line react-compiler/react-compiler
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    var prevIsLoading = (0, usePrevious_1.default)(currentSearchResults === null || currentSearchResults === void 0 ? void 0 : currentSearchResults.isLoading);
    (0, react_1.useEffect)(function () {
        if (!isSorting || !prevIsLoading || (currentSearchResults === null || currentSearchResults === void 0 ? void 0 : currentSearchResults.isLoading)) {
            return;
        }
        setIsSorting(false);
    }, [currentSearchResults === null || currentSearchResults === void 0 ? void 0 : currentSearchResults.isLoading, isSorting, prevIsLoading]);
    var handleSearchAction = (0, react_1.useCallback)(function (value) {
        if (typeof value === 'string') {
            (0, Report_1.searchInServer)(value);
        }
        else {
            (0, Search_2.search)(value).then(function (jsonCode) { return setSearchRequestResponseStatusCode(Number(jsonCode !== null && jsonCode !== void 0 ? jsonCode : 0)); });
        }
    }, []);
    var footerData = (0, react_1.useMemo)(function () {
        var _a, _b;
        var shouldUseClientTotal = !(metadata === null || metadata === void 0 ? void 0 : metadata.count) || (selectedTransactionsKeys.length > 0 && !areAllMatchingItemsSelected);
        var selectedTransactionItems = Object.values(selectedTransactions);
        var currency = (_a = metadata === null || metadata === void 0 ? void 0 : metadata.currency) !== null && _a !== void 0 ? _a : (_b = selectedTransactionItems.at(0)) === null || _b === void 0 ? void 0 : _b.convertedCurrency;
        var count = shouldUseClientTotal ? selectedTransactionsKeys.length : metadata === null || metadata === void 0 ? void 0 : metadata.count;
        var total = shouldUseClientTotal ? selectedTransactionItems.reduce(function (acc, transaction) { var _a; return acc - ((_a = transaction.convertedAmount) !== null && _a !== void 0 ? _a : 0); }, 0) : metadata === null || metadata === void 0 ? void 0 : metadata.total;
        return { count: count, total: total, currency: currency };
    }, [areAllMatchingItemsSelected, metadata === null || metadata === void 0 ? void 0 : metadata.count, metadata === null || metadata === void 0 ? void 0 : metadata.currency, metadata === null || metadata === void 0 ? void 0 : metadata.total, selectedTransactions, selectedTransactionsKeys.length]);
    if (shouldUseNarrowLayout) {
        return (<>
                <Provider_1.default>
                    {PDFValidationComponent}
                    <SearchPageNarrow_1.default queryJSON={queryJSON} metadata={metadata} headerButtonsOptions={headerButtonsOptions} searchResults={searchResults} isMobileSelectionModeEnabled={isMobileSelectionModeEnabled} footerData={footerData} currentSelectedPolicyID={selectedPolicyIDs === null || selectedPolicyIDs === void 0 ? void 0 : selectedPolicyIDs.at(0)} currentSelectedReportID={(_g = selectedTransactionReportIDs === null || selectedTransactionReportIDs === void 0 ? void 0 : selectedTransactionReportIDs.at(0)) !== null && _g !== void 0 ? _g : selectedReportIDs === null || selectedReportIDs === void 0 ? void 0 : selectedReportIDs.at(0)} confirmPayment={onBulkPaySelected} latestBankItems={latestBankItems}/>
                    <Consumer_1.default onDrop={initScanRequest}>
                        <DropZoneUI_1.default icon={Expensicons.SmartScan} dropTitle={translate('dropzone.scanReceipts')} dropStyles={styles.receiptDropOverlay(true)} dropTextStyles={styles.receiptDropText} dropWrapperStyles={{ marginBottom: variables_1.default.bottomTabHeight }} dashedBorderStyles={[styles.dropzoneArea, styles.easeInOpacityTransition, styles.activeDropzoneDashedBorder(theme.receiptDropBorderColorActive, true)]}/>
                    </Consumer_1.default>
                    {ErrorModal}
                </Provider_1.default>
                {!!isMobileSelectionModeEnabled && (<react_native_1.View>
                        <ConfirmModal_1.default isVisible={isDeleteExpensesConfirmModalVisible} onConfirm={handleDeleteExpenses} onCancel={function () {
                    setIsDeleteExpensesConfirmModalVisible(false);
                }} title={translate('iou.deleteExpense', { count: selectedTransactionsKeys.length })} prompt={translate('iou.deleteConfirmation', { count: selectedTransactionsKeys.length })} confirmText={translate('common.delete')} cancelText={translate('common.cancel')} danger/>
                        <DecisionModal_1.default title={translate('common.youAppearToBeOffline')} prompt={translate('common.offlinePrompt')} isSmallScreenWidth={isSmallScreenWidth} onSecondOptionSubmit={function () { return setIsOfflineModalVisible(false); }} secondOptionText={translate('common.buttonConfirm')} isVisible={isOfflineModalVisible} onClose={function () { return setIsOfflineModalVisible(false); }}/>
                        <DecisionModal_1.default title={translate('common.downloadFailedTitle')} prompt={translate('common.downloadFailedDescription')} isSmallScreenWidth={isSmallScreenWidth} onSecondOptionSubmit={function () { return setIsDownloadErrorModalVisible(false); }} secondOptionText={translate('common.buttonConfirm')} isVisible={isDownloadErrorModalVisible} onClose={function () { return setIsDownloadErrorModalVisible(false); }}/>
                        <ConfirmModal_1.default isVisible={isExportWithTemplateModalVisible} onConfirm={function () {
                    setIsExportWithTemplateModalVisible(false);
                    clearSelectedTransactions(undefined, true);
                }} onCancel={function () { return setIsExportWithTemplateModalVisible(false); }} title={translate('export.exportInProgress')} prompt={translate('export.conciergeWillSend')} confirmText={translate('common.buttonConfirm')} shouldShowCancelButton={false}/>
                        <ConfirmModal_1.default title={translate('customApprovalWorkflow.title')} isVisible={isDEWModalVisible} onConfirm={function () {
                    setIsDEWModalVisible(false);
                    (0, Link_1.openOldDotLink)(CONST_1.default.OLDDOT_URLS.INBOX);
                }} onCancel={function () { return setIsDEWModalVisible(false); }} prompt={translate('customApprovalWorkflow.description')} confirmText={translate('customApprovalWorkflow.goToExpensifyClassic')} shouldShowCancelButton={false}/>
                    </react_native_1.View>)}
            </>);
    }
    return (<ScreenWrapper_1.default testID={Search_1.default.displayName} shouldEnableMaxHeight headerGapStyles={[styles.searchHeaderGap, styles.h0]}>
            <FullPageNotFoundView_1.default shouldForceFullScreen shouldShow={!queryJSON} onBackButtonPress={handleOnBackButtonPress} shouldShowLink={false}>
                {!!queryJSON && (<react_native_1.View style={styles.searchSplitContainer}>
                        <ScreenWrapper_1.default testID={Search_1.default.displayName} shouldShowOfflineIndicatorInWideScreen={!!shouldShowOfflineIndicator} offlineIndicatorStyle={offlineIndicatorStyle}>
                            <Provider_1.default>
                                {PDFValidationComponent}
                                <SearchPageHeader_1.default queryJSON={queryJSON} headerButtonsOptions={headerButtonsOptions} handleSearch={handleSearchAction} isMobileSelectionModeEnabled={isMobileSelectionModeEnabled}/>
                                <SearchFiltersBar_1.default queryJSON={queryJSON} headerButtonsOptions={headerButtonsOptions} isMobileSelectionModeEnabled={isMobileSelectionModeEnabled} currentSelectedPolicyID={selectedPolicyIDs === null || selectedPolicyIDs === void 0 ? void 0 : selectedPolicyIDs.at(0)} currentSelectedReportID={(_h = selectedTransactionReportIDs === null || selectedTransactionReportIDs === void 0 ? void 0 : selectedTransactionReportIDs.at(0)) !== null && _h !== void 0 ? _h : selectedReportIDs === null || selectedReportIDs === void 0 ? void 0 : selectedReportIDs.at(0)} confirmPayment={onBulkPaySelected} latestBankItems={latestBankItems}/>
                                <Search_1.default key={queryJSON.hash} queryJSON={queryJSON} searchResults={searchResults} handleSearch={handleSearchAction} isMobileSelectionModeEnabled={isMobileSelectionModeEnabled} onSearchListScroll={function (e) {
                if (!e.nativeEvent.contentOffset.y) {
                    return;
                }
                saveScrollOffset(route, e.nativeEvent.contentOffset.y);
            }} onSortPressedCallback={function () {
                setIsSorting(true);
            }} searchRequestResponseStatusCode={searchRequestResponseStatusCode}/>
                                {shouldShowFooter && (<SearchPageFooter_1.default count={footerData.count} total={footerData.total} currency={footerData.currency}/>)}
                                <Consumer_1.default onDrop={initScanRequest}>
                                    <DropZoneUI_1.default icon={Expensicons.SmartScan} dropTitle={translate('dropzone.scanReceipts')} dropStyles={styles.receiptDropOverlay(true)} dropTextStyles={styles.receiptDropText} dashedBorderStyles={[
                styles.dropzoneArea,
                styles.easeInOpacityTransition,
                styles.activeDropzoneDashedBorder(theme.receiptDropBorderColorActive, true),
            ]}/>
                                </Consumer_1.default>
                            </Provider_1.default>
                        </ScreenWrapper_1.default>
                        {ErrorModal}
                    </react_native_1.View>)}
                <ConfirmModal_1.default isVisible={isDeleteExpensesConfirmModalVisible} onConfirm={handleDeleteExpenses} onCancel={function () {
            setIsDeleteExpensesConfirmModalVisible(false);
        }} title={translate('iou.deleteExpense', { count: selectedTransactionsKeys.length })} prompt={translate('iou.deleteConfirmation', { count: selectedTransactionsKeys.length })} confirmText={translate('common.delete')} cancelText={translate('common.cancel')} danger/>
                <ConfirmModal_1.default isVisible={isDownloadExportModalVisible} onConfirm={createExportAll} onCancel={function () {
            setIsDownloadExportModalVisible(false);
        }} title={translate('search.exportSearchResults.title')} prompt={translate('search.exportSearchResults.description')} confirmText={translate('search.exportSearchResults.title')} cancelText={translate('common.cancel')}/>
                <ConfirmModal_1.default isVisible={isExportWithTemplateModalVisible} onConfirm={function () {
            setIsExportWithTemplateModalVisible(false);
            clearSelectedTransactions(undefined, true);
        }} onCancel={function () { return setIsExportWithTemplateModalVisible(false); }} title={translate('export.exportInProgress')} prompt={translate('export.conciergeWillSend')} confirmText={translate('common.buttonConfirm')} shouldShowCancelButton={false}/>
                <DecisionModal_1.default title={translate('common.youAppearToBeOffline')} prompt={translate('common.offlinePrompt')} isSmallScreenWidth={isSmallScreenWidth} onSecondOptionSubmit={function () { return setIsOfflineModalVisible(false); }} secondOptionText={translate('common.buttonConfirm')} isVisible={isOfflineModalVisible} onClose={function () { return setIsOfflineModalVisible(false); }}/>
                <DecisionModal_1.default title={translate('common.downloadFailedTitle')} prompt={translate('common.downloadFailedDescription')} isSmallScreenWidth={isSmallScreenWidth} onSecondOptionSubmit={function () { return setIsDownloadErrorModalVisible(false); }} secondOptionText={translate('common.buttonConfirm')} isVisible={isDownloadErrorModalVisible} onClose={function () { return setIsDownloadErrorModalVisible(false); }}/>
                <ConfirmModal_1.default title={translate('customApprovalWorkflow.title')} isVisible={isDEWModalVisible} onConfirm={function () {
            setIsDEWModalVisible(false);
            (0, Link_1.openOldDotLink)(CONST_1.default.OLDDOT_URLS.INBOX);
        }} onCancel={function () { return setIsDEWModalVisible(false); }} prompt={translate('customApprovalWorkflow.description')} confirmText={translate('customApprovalWorkflow.goToExpensifyClassic')} shouldShowCancelButton={false}/>
            </FullPageNotFoundView_1.default>
        </ScreenWrapper_1.default>);
}
SearchPage.displayName = 'SearchPage';
SearchPage.whyDidYouRender = true;
exports.default = SearchPage;
