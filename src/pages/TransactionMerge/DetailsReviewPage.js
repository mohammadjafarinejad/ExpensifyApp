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
var Session_1 = require("@selectors/Session");
var react_1 = require("react");
var react_native_1 = require("react-native");
var FullPageNotFoundView_1 = require("@components/BlockingViews/FullPageNotFoundView");
var Button_1 = require("@components/Button");
var FixedFooter_1 = require("@components/FixedFooter");
var FormHelpMessage_1 = require("@components/FormHelpMessage");
var FullscreenLoadingIndicator_1 = require("@components/FullscreenLoadingIndicator");
var HeaderWithBackButton_1 = require("@components/HeaderWithBackButton");
var ScreenWrapper_1 = require("@components/ScreenWrapper");
var ScrollView_1 = require("@components/ScrollView");
var Text_1 = require("@components/Text");
var useLocalize_1 = require("@hooks/useLocalize");
var useOnyx_1 = require("@hooks/useOnyx");
var useThemeStyles_1 = require("@hooks/useThemeStyles");
var MergeTransaction_1 = require("@libs/actions/MergeTransaction");
var MergeTransactionUtils_1 = require("@libs/MergeTransactionUtils");
var Navigation_1 = require("@libs/Navigation/Navigation");
var ReportActionsUtils_1 = require("@libs/ReportActionsUtils");
var ReportUtils_1 = require("@libs/ReportUtils");
var Report_1 = require("@userActions/Report");
var ONYXKEYS_1 = require("@src/ONYXKEYS");
var ROUTES_1 = require("@src/ROUTES");
var EmptyObject_1 = require("@src/types/utils/EmptyObject");
var isLoadingOnyxValue_1 = require("@src/types/utils/isLoadingOnyxValue");
var MergeFieldReview_1 = require("./MergeFieldReview");
var hasOnceLoadedTransactionThreadReportActionsSelector = function (value) { return value === null || value === void 0 ? void 0 : value.hasOnceLoadedReportActions; };
function DetailsReviewPage(_a) {
    var route = _a.route;
    var _b = (0, useLocalize_1.default)(), translate = _b.translate, localeCompare = _b.localeCompare;
    var styles = (0, useThemeStyles_1.default)();
    var _c = route.params, transactionID = _c.transactionID, backTo = _c.backTo;
    var _d = (0, useOnyx_1.default)("".concat(ONYXKEYS_1.default.COLLECTION.MERGE_TRANSACTION).concat(transactionID), { canBeMissing: true }), mergeTransaction = _d[0], mergeTransactionMetadata = _d[1];
    var _e = (0, useOnyx_1.default)("".concat(ONYXKEYS_1.default.COLLECTION.TRANSACTION).concat(mergeTransaction === null || mergeTransaction === void 0 ? void 0 : mergeTransaction.targetTransactionID), {
        canBeMissing: true,
    })[0], targetTransaction = _e === void 0 ? (0, MergeTransactionUtils_1.getTargetTransactionFromMergeTransaction)(mergeTransaction) : _e;
    var hasOnceLoadedTransactionThreadReportActions = (0, useOnyx_1.default)("".concat(ONYXKEYS_1.default.COLLECTION.REPORT_METADATA).concat(targetTransaction === null || targetTransaction === void 0 ? void 0 : targetTransaction.reportID), {
        selector: hasOnceLoadedTransactionThreadReportActionsSelector,
        canBeMissing: true,
    })[0];
    var targetTransactionThreadReportID = (0, MergeTransactionUtils_1.getTransactionThreadReportID)(targetTransaction);
    var iouReportForTargetTransaction = (0, useOnyx_1.default)("".concat(ONYXKEYS_1.default.COLLECTION.REPORT).concat(targetTransaction === null || targetTransaction === void 0 ? void 0 : targetTransaction.reportID), { canBeMissing: true })[0];
    var iouActionForTargetTransactionSelector = (0, react_1.useCallback)(function (value) {
        if (!hasOnceLoadedTransactionThreadReportActions || !!targetTransactionThreadReportID || !(targetTransaction === null || targetTransaction === void 0 ? void 0 : targetTransaction.transactionID)) {
            return undefined;
        }
        return (0, ReportActionsUtils_1.getIOUActionForTransactionID)(Object.values(value !== null && value !== void 0 ? value : {}), targetTransaction === null || targetTransaction === void 0 ? void 0 : targetTransaction.transactionID);
    }, [hasOnceLoadedTransactionThreadReportActions, targetTransaction === null || targetTransaction === void 0 ? void 0 : targetTransaction.transactionID, targetTransactionThreadReportID]);
    var iouActionForTargetTransaction = (0, useOnyx_1.default)("".concat(ONYXKEYS_1.default.COLLECTION.REPORT_ACTIONS).concat(targetTransaction === null || targetTransaction === void 0 ? void 0 : targetTransaction.reportID), {
        selector: iouActionForTargetTransactionSelector,
        canBeMissing: true,
    }, [iouActionForTargetTransactionSelector])[0];
    var _f = (0, useOnyx_1.default)("".concat(ONYXKEYS_1.default.COLLECTION.TRANSACTION).concat(mergeTransaction === null || mergeTransaction === void 0 ? void 0 : mergeTransaction.sourceTransactionID), {
        canBeMissing: true,
    })[0], sourceTransaction = _f === void 0 ? (0, MergeTransactionUtils_1.getSourceTransactionFromMergeTransaction)(mergeTransaction) : _f;
    var targetTransactionThreadReport = (0, useOnyx_1.default)("".concat(ONYXKEYS_1.default.COLLECTION.REPORT).concat(targetTransactionThreadReportID), { canBeMissing: true })[0];
    var currentUserEmail = (0, useOnyx_1.default)(ONYXKEYS_1.default.SESSION, { selector: Session_1.emailSelector, canBeMissing: false })[0];
    var _g = (0, react_1.useState)({}), hasErrors = _g[0], setHasErrors = _g[1];
    var _h = (0, react_1.useState)([]), conflictFields = _h[0], setConflictFields = _h[1];
    var _j = (0, react_1.useState)(false), isCheckingDataBeforeGoNext = _j[0], setIsCheckingDataBeforeGoNext = _j[1];
    (0, react_1.useEffect)(function () {
        if (!transactionID || !targetTransaction || !sourceTransaction) {
            return;
        }
        var _a = (0, MergeTransactionUtils_1.getMergeableDataAndConflictFields)(targetTransaction, sourceTransaction, localeCompare), detectedConflictFields = _a.conflictFields, mergeableData = _a.mergeableData;
        (0, MergeTransaction_1.setMergeTransactionKey)(transactionID, mergeableData);
        setConflictFields(detectedConflictFields);
    }, [targetTransaction, sourceTransaction, transactionID, localeCompare]);
    (0, react_1.useEffect)(function () {
        if (!isCheckingDataBeforeGoNext) {
            return;
        }
        // When user selects a card transaction to merge, that card transaction becomes the target transaction.
        // The App may not have the transaction thread report loaded for card transactions, so we need to trigger
        // OpenReport to ensure the transaction thread report is available for confirmation page
        if (!targetTransactionThreadReportID && (targetTransaction === null || targetTransaction === void 0 ? void 0 : targetTransaction.reportID)) {
            // If the report was already loaded before, but there are still no transaction thread report info, it means it hasn't been created yet.
            // So we should create it.
            if (hasOnceLoadedTransactionThreadReportActions) {
                (0, Report_1.createTransactionThreadReport)(iouReportForTargetTransaction, iouActionForTargetTransaction);
                setIsCheckingDataBeforeGoNext(false);
                Navigation_1.default.navigate(ROUTES_1.default.MERGE_TRANSACTION_CONFIRMATION_PAGE.getRoute(transactionID, Navigation_1.default.getActiveRoute()));
                return;
            }
            return (0, Report_1.openReport)(targetTransaction.reportID);
        }
        if (targetTransactionThreadReportID && !targetTransactionThreadReport) {
            return (0, Report_1.openReport)(targetTransactionThreadReportID);
        }
        // We need to wait for report to be loaded completely, avoid still optimistic loading
        if (!(targetTransactionThreadReport === null || targetTransactionThreadReport === void 0 ? void 0 : targetTransactionThreadReport.reportID)) {
            return;
        }
        Navigation_1.default.navigate(ROUTES_1.default.MERGE_TRANSACTION_CONFIRMATION_PAGE.getRoute(transactionID, Navigation_1.default.getActiveRoute()));
        setIsCheckingDataBeforeGoNext(false);
    }, [
        isCheckingDataBeforeGoNext,
        targetTransactionThreadReportID,
        targetTransaction === null || targetTransaction === void 0 ? void 0 : targetTransaction.reportID,
        targetTransactionThreadReport,
        transactionID,
        hasOnceLoadedTransactionThreadReportActions,
        iouActionForTargetTransaction,
        iouReportForTargetTransaction,
        currentUserEmail,
        targetTransaction === null || targetTransaction === void 0 ? void 0 : targetTransaction.transactionID,
    ]);
    // Handle selection
    var handleSelect = (0, react_1.useCallback)(function (transaction, field) {
        var _a;
        var _b;
        var fieldValue = (0, MergeTransactionUtils_1.getMergeFieldValue)((0, ReportUtils_1.getTransactionDetails)(transaction), transaction, field);
        // Clear error if it has
        setHasErrors(function (prev) {
            var newErrors = __assign({}, prev);
            delete newErrors[field];
            return newErrors;
        });
        // Update both the field value and track which transaction was selected (persisted in Onyx)
        var currentSelections = (_b = mergeTransaction === null || mergeTransaction === void 0 ? void 0 : mergeTransaction.selectedTransactionByField) !== null && _b !== void 0 ? _b : {};
        var updatedValues = (0, MergeTransactionUtils_1.getMergeFieldUpdatedValues)(transaction, field, fieldValue);
        (0, MergeTransaction_1.setMergeTransactionKey)(transactionID, __assign(__assign({}, updatedValues), { selectedTransactionByField: __assign(__assign({}, currentSelections), (_a = {}, _a[field] = transaction.transactionID, _a)) }));
    }, [mergeTransaction, transactionID]);
    // Handle continue
    var handleContinue = (0, react_1.useCallback)(function () {
        if (!mergeTransaction) {
            return;
        }
        var newHasErrors = {};
        conflictFields.forEach(function (field) {
            if (!(0, MergeTransactionUtils_1.isEmptyMergeValue)(mergeTransaction[field])) {
                return;
            }
            newHasErrors[field] = true;
        });
        setHasErrors(newHasErrors);
        if ((0, EmptyObject_1.isEmptyObject)(newHasErrors)) {
            setIsCheckingDataBeforeGoNext(true);
        }
    }, [mergeTransaction, conflictFields]);
    // Build merge fields array with all necessary information
    var mergeFields = (0, react_1.useMemo)(function () { return (0, MergeTransactionUtils_1.buildMergeFieldsData)(conflictFields, targetTransaction, sourceTransaction, mergeTransaction, translate); }, [conflictFields, targetTransaction, sourceTransaction, mergeTransaction, translate]);
    // If this screen has multiple "selection cards" on it and the user skips one or more, show an error above the footer button
    var shouldShowSubmitError = conflictFields.length > 1 && !(0, EmptyObject_1.isEmptyObject)(hasErrors);
    if ((0, isLoadingOnyxValue_1.default)(mergeTransactionMetadata)) {
        return <FullscreenLoadingIndicator_1.default />;
    }
    return (<ScreenWrapper_1.default testID={DetailsReviewPage.displayName} shouldEnableMaxHeight includeSafeAreaPaddingBottom>
            <FullPageNotFoundView_1.default shouldShow={!mergeTransaction}>
                <HeaderWithBackButton_1.default title={translate('transactionMerge.detailsPage.header')} onBackButtonPress={function () {
            Navigation_1.default.goBack(backTo);
        }}/>
                <ScrollView_1.default style={[styles.flex1, styles.ph5]}>
                    <react_native_1.View style={[styles.mb5]}>
                        <Text_1.default>{translate('transactionMerge.detailsPage.pageTitle')}</Text_1.default>
                    </react_native_1.View>
                    {mergeFields.map(function (mergeField) { return (<MergeFieldReview_1.default key={mergeField.field} mergeField={mergeField} onValueSelected={handleSelect} errorText={hasErrors[mergeField.field] ? (0, MergeTransactionUtils_1.getMergeFieldErrorText)(translate, mergeField) : undefined}/>); })}
                </ScrollView_1.default>
                <FixedFooter_1.default style={styles.ph5}>
                    {shouldShowSubmitError && (<FormHelpMessage_1.default message={translate('transactionMerge.detailsPage.selectAllDetailsError')} style={[styles.pv2]}/>)}
                    <Button_1.default large success text={translate('common.continue')} onPress={handleContinue} isDisabled={!(0, EmptyObject_1.isEmptyObject)(hasErrors)} isLoading={isCheckingDataBeforeGoNext} pressOnEnter/>
                </FixedFooter_1.default>
            </FullPageNotFoundView_1.default>
        </ScreenWrapper_1.default>);
}
DetailsReviewPage.displayName = 'DetailsReviewPage';
exports.default = DetailsReviewPage;
