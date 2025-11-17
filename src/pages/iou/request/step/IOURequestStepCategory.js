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
var isEmpty_1 = require("lodash/isEmpty");
var react_1 = require("react");
var react_native_1 = require("react-native");
var ActivityIndicator_1 = require("@components/ActivityIndicator");
var FullPageOfflineBlockingView_1 = require("@components/BlockingViews/FullPageOfflineBlockingView");
var Button_1 = require("@components/Button");
var CategoryPicker_1 = require("@components/CategoryPicker");
var FixedFooter_1 = require("@components/FixedFooter");
var Illustrations = require("@components/Icon/Illustrations");
var SearchContext_1 = require("@components/Search/SearchContext");
var Text_1 = require("@components/Text");
var WorkspaceEmptyStateSection_1 = require("@components/WorkspaceEmptyStateSection");
var useLocalize_1 = require("@hooks/useLocalize");
var useNetwork_1 = require("@hooks/useNetwork");
var useOnyx_1 = require("@hooks/useOnyx");
var usePolicyData_1 = require("@hooks/usePolicyData");
var usePolicyForMovingExpenses_1 = require("@hooks/usePolicyForMovingExpenses");
var useRestartOnReceiptFailure_1 = require("@hooks/useRestartOnReceiptFailure");
var useShowNotFoundPageInIOUStep_1 = require("@hooks/useShowNotFoundPageInIOUStep");
var useThemeStyles_1 = require("@hooks/useThemeStyles");
var IOU_1 = require("@libs/actions/IOU");
var Category_1 = require("@libs/actions/Policy/Category");
var CategoryUtils_1 = require("@libs/CategoryUtils");
var Navigation_1 = require("@libs/Navigation/Navigation");
var OptionsListUtils_1 = require("@libs/OptionsListUtils");
var PolicyUtils_1 = require("@libs/PolicyUtils");
var ReportUtils_1 = require("@libs/ReportUtils");
var TransactionUtils_1 = require("@libs/TransactionUtils");
var CONST_1 = require("@src/CONST");
var ONYXKEYS_1 = require("@src/ONYXKEYS");
var ROUTES_1 = require("@src/ROUTES");
var StepScreenWrapper_1 = require("./StepScreenWrapper");
var withFullTransactionOrNotFound_1 = require("./withFullTransactionOrNotFound");
var withWritableReportOrNotFound_1 = require("./withWritableReportOrNotFound");
function IOURequestStepCategory(_a) {
    var _b, _c, _d;
    var reportReal = _a.report, reportDraft = _a.reportDraft, _e = _a.route.params, transactionID = _e.transactionID, backTo = _e.backTo, action = _e.action, iouType = _e.iouType, reportActionID = _e.reportActionID, routeReportID = _e.reportID, transaction = _a.transaction;
    var styles = (0, useThemeStyles_1.default)();
    var translate = (0, useLocalize_1.default)().translate;
    var isUnreportedExpense = (0, TransactionUtils_1.isExpenseUnreported)(transaction);
    var _f = (0, usePolicyForMovingExpenses_1.default)(), policyForMovingExpenses = _f.policyForMovingExpenses, policyForMovingExpensesID = _f.policyForMovingExpensesID;
    var isCreatingTrackExpense = action === CONST_1.default.IOU.ACTION.CREATE && iouType === CONST_1.default.IOU.TYPE.TRACK;
    var policyIdReal = (0, IOU_1.getIOURequestPolicyID)(transaction, reportReal);
    var policyIdDraft = (0, IOU_1.getIOURequestPolicyID)(transaction, reportDraft);
    var policyReal = (0, useOnyx_1.default)("".concat(ONYXKEYS_1.default.COLLECTION.POLICY).concat(policyIdReal), { canBeMissing: true })[0];
    var policyDraft = (0, useOnyx_1.default)("".concat(ONYXKEYS_1.default.COLLECTION.POLICY_DRAFTS).concat(policyIdDraft), { canBeMissing: true })[0];
    var policy = isUnreportedExpense || isCreatingTrackExpense ? policyForMovingExpenses : (policyReal !== null && policyReal !== void 0 ? policyReal : policyDraft);
    var policyID = isUnreportedExpense || isCreatingTrackExpense ? policyForMovingExpensesID : policy === null || policy === void 0 ? void 0 : policy.id;
    var splitDraftTransaction = (0, useOnyx_1.default)("".concat(ONYXKEYS_1.default.COLLECTION.SPLIT_TRANSACTION_DRAFT).concat(transactionID), { canBeMissing: true })[0];
    var policyCategoriesReal = (0, useOnyx_1.default)("".concat(ONYXKEYS_1.default.COLLECTION.POLICY_CATEGORIES).concat(policyID), { canBeMissing: true })[0];
    var policyCategoriesDraft = (0, useOnyx_1.default)("".concat(ONYXKEYS_1.default.COLLECTION.POLICY_CATEGORIES_DRAFT).concat(policyIdDraft), { canBeMissing: true })[0];
    var policyTags = (0, useOnyx_1.default)("".concat(ONYXKEYS_1.default.COLLECTION.POLICY_TAGS).concat(policyID), { canBeMissing: true })[0];
    var policyRecentlyUsedCategories = (0, useOnyx_1.default)("".concat(ONYXKEYS_1.default.COLLECTION.POLICY_RECENTLY_USED_CATEGORIES).concat(policyID), { canBeMissing: true })[0];
    var report = reportReal !== null && reportReal !== void 0 ? reportReal : reportDraft;
    var policyCategories = policyCategoriesReal !== null && policyCategoriesReal !== void 0 ? policyCategoriesReal : policyCategoriesDraft;
    var policyData = (0, usePolicyData_1.default)(policy === null || policy === void 0 ? void 0 : policy.id);
    var currentSearchHash = (0, SearchContext_1.useSearchContext)().currentSearchHash;
    var isEditing = action === CONST_1.default.IOU.ACTION.EDIT;
    var isEditingSplit = (iouType === CONST_1.default.IOU.TYPE.SPLIT || iouType === CONST_1.default.IOU.TYPE.SPLIT_EXPENSE) && isEditing;
    var currentTransaction = isEditingSplit && !(0, isEmpty_1.default)(splitDraftTransaction) ? splitDraftTransaction : transaction;
    var transactionCategory = (_c = (_b = (0, ReportUtils_1.getTransactionDetails)(currentTransaction)) === null || _b === void 0 ? void 0 : _b.category) !== null && _c !== void 0 ? _c : '';
    (0, useRestartOnReceiptFailure_1.default)(transaction, routeReportID, iouType, action);
    var categoryForDisplay = (0, CategoryUtils_1.isCategoryMissing)(transactionCategory) ? '' : transactionCategory;
    var shouldShowCategory = ((0, ReportUtils_1.isReportInGroupPolicy)(report) || (0, ReportUtils_1.isGroupPolicy)((_d = policy === null || policy === void 0 ? void 0 : policy.type) !== null && _d !== void 0 ? _d : '')) &&
        // The transactionCategory can be an empty string, so to maintain the logic we'd like to keep it in this shape until utils refactor
        // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
        (!!categoryForDisplay || (0, OptionsListUtils_1.hasEnabledOptions)(Object.values(policyCategories !== null && policyCategories !== void 0 ? policyCategories : {})));
    // eslint-disable-next-line rulesdir/no-negated-variables
    var shouldShowNotFoundPage = (0, useShowNotFoundPageInIOUStep_1.default)(action, iouType, reportActionID, report, transaction);
    var fetchData = function () {
        if ((!!policy && !!policyCategories) || !policyID) {
            return;
        }
        (0, Category_1.getPolicyCategories)(policyID);
    };
    var isOffline = (0, useNetwork_1.default)({ onReconnect: fetchData }).isOffline;
    var isLoading = !isOffline && policyCategories === undefined;
    var shouldShowEmptyState = policyCategories !== undefined && !shouldShowCategory;
    var shouldShowOfflineView = policyCategories === undefined && isOffline;
    (0, react_1.useEffect)(function () {
        fetchData();
        // eslint-disable-next-line react-compiler/react-compiler, react-hooks/exhaustive-deps
    }, []);
    var navigateBack = function () {
        Navigation_1.default.goBack(backTo);
    };
    var updateCategory = function (category) {
        var _a;
        var categorySearchText = (_a = category.searchText) !== null && _a !== void 0 ? _a : '';
        var isSelectedCategory = categorySearchText === categoryForDisplay;
        var updatedCategory = isSelectedCategory ? '' : categorySearchText;
        if (transaction) {
            // In the split flow, when editing we use SPLIT_TRANSACTION_DRAFT to save draft value
            if (isEditingSplit) {
                (0, IOU_1.setDraftSplitTransaction)(transaction.transactionID, splitDraftTransaction, { category: updatedCategory }, policy);
                navigateBack();
                return;
            }
            if (isEditing && report) {
                (0, IOU_1.updateMoneyRequestCategory)(transaction.transactionID, report.reportID, updatedCategory, policy, policyTags, policyCategories, policyRecentlyUsedCategories, currentSearchHash);
                navigateBack();
                return;
            }
        }
        (0, IOU_1.setMoneyRequestCategory)(transactionID, updatedCategory, policyID);
        if (action === CONST_1.default.IOU.ACTION.CATEGORIZE && !backTo) {
            if (report === null || report === void 0 ? void 0 : report.reportID) {
                Navigation_1.default.navigate(ROUTES_1.default.MONEY_REQUEST_STEP_CONFIRMATION.getRoute(action, iouType, transactionID, report.reportID));
            }
            return;
        }
        navigateBack();
    };
    return (<StepScreenWrapper_1.default headerTitle={translate('common.category')} onBackButtonPress={navigateBack} shouldShowWrapper shouldShowNotFoundPage={shouldShowNotFoundPage} shouldShowOfflineIndicator={policyCategories !== undefined} testID={IOURequestStepCategory.displayName} shouldEnableKeyboardAvoidingView={false}>
            {isLoading && (<ActivityIndicator_1.default size={CONST_1.default.ACTIVITY_INDICATOR_SIZE.LARGE} style={[styles.flex1]}/>)}
            {shouldShowOfflineView && <FullPageOfflineBlockingView_1.default>{null}</FullPageOfflineBlockingView_1.default>}
            {shouldShowEmptyState && (<react_native_1.View style={[styles.flex1]}>
                    <WorkspaceEmptyStateSection_1.default shouldStyleAsCard={false} icon={Illustrations.EmptyStateExpenses} title={translate('workspace.categories.emptyCategories.title')} subtitle={translate('workspace.categories.emptyCategories.subtitle')} containerStyle={[styles.flex1, styles.justifyContentCenter]}/>
                    {(0, PolicyUtils_1.isPolicyAdmin)(policy) && (<FixedFooter_1.default style={[styles.mtAuto, styles.pt5]}>
                            <Button_1.default large success style={[styles.w100]} onPress={function () {
                    if (!policyID || !(report === null || report === void 0 ? void 0 : report.reportID)) {
                        return;
                    }
                    if (!(policy === null || policy === void 0 ? void 0 : policy.areCategoriesEnabled)) {
                        (0, Category_1.enablePolicyCategories)(__assign(__assign({}, policyData), { categories: policyCategories }), true, false);
                    }
                    // eslint-disable-next-line @typescript-eslint/no-deprecated
                    react_native_1.InteractionManager.runAfterInteractions(function () {
                        Navigation_1.default.navigate(ROUTES_1.default.SETTINGS_CATEGORIES_ROOT.getRoute(policyID, ROUTES_1.default.MONEY_REQUEST_STEP_CATEGORY.getRoute(action, iouType, transactionID, report.reportID, backTo, reportActionID)));
                    });
                }} text={translate('workspace.categories.editCategories')} pressOnEnter/>
                        </FixedFooter_1.default>)}
                </react_native_1.View>)}
            {!shouldShowEmptyState && !isLoading && !shouldShowOfflineView && (<>
                    <Text_1.default style={[styles.ph5, styles.pv3]}>{translate('iou.categorySelection')}</Text_1.default>
                    <CategoryPicker_1.default selectedCategory={categoryForDisplay} policyID={policyID !== null && policyID !== void 0 ? policyID : report === null || report === void 0 ? void 0 : report.policyID} onSubmit={updateCategory}/>
                </>)}
        </StepScreenWrapper_1.default>);
}
IOURequestStepCategory.displayName = 'IOURequestStepCategory';
/* eslint-disable rulesdir/no-negated-variables */
var IOURequestStepCategoryWithFullTransactionOrNotFound = (0, withFullTransactionOrNotFound_1.default)(IOURequestStepCategory);
/* eslint-disable rulesdir/no-negated-variables */
var IOURequestStepCategoryWithWritableReportOrNotFound = (0, withWritableReportOrNotFound_1.default)(IOURequestStepCategoryWithFullTransactionOrNotFound);
exports.default = IOURequestStepCategoryWithWritableReportOrNotFound;
