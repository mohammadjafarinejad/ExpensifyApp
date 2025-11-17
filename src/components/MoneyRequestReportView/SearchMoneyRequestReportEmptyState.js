"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_native_1 = require("react-native");
var EmptyStateComponent_1 = require("@components/EmptyStateComponent");
var Expensicons = require("@components/Icon/Expensicons");
var LottieAnimations_1 = require("@components/LottieAnimations");
var useLocalize_1 = require("@hooks/useLocalize");
var useOnyx_1 = require("@hooks/useOnyx");
var useThemeStyles_1 = require("@hooks/useThemeStyles");
var ReportUtils_1 = require("@libs/ReportUtils");
var SubscriptionUtils_1 = require("@libs/SubscriptionUtils");
var Navigation_1 = require("@navigation/Navigation");
var IOU_1 = require("@userActions/IOU");
var Report_1 = require("@userActions/Report");
var CONST_1 = require("@src/CONST");
var ONYXKEYS_1 = require("@src/ONYXKEYS");
var ROUTES_1 = require("@src/ROUTES");
var minModalHeight = 380;
function SearchMoneyRequestReportEmptyState(_a) {
    var report = _a.report, policy = _a.policy;
    var reportNameValuePairs = (0, useOnyx_1.default)("".concat(ONYXKEYS_1.default.COLLECTION.REPORT_NAME_VALUE_PAIRS).concat(report.reportID), { canBeMissing: true })[0];
    var translate = (0, useLocalize_1.default)().translate;
    var styles = (0, useThemeStyles_1.default)();
    var lastDistanceExpenseType = (0, useOnyx_1.default)(ONYXKEYS_1.default.NVP_LAST_DISTANCE_EXPENSE_TYPE, { canBeMissing: true })[0];
    var reportId = report.reportID;
    var isReportArchived = (0, ReportUtils_1.isArchivedReport)(reportNameValuePairs);
    var canAddTransactionToReport = (0, ReportUtils_1.canAddTransaction)(report, isReportArchived);
    var addExpenseDropdownOptions = [
        {
            value: CONST_1.default.REPORT.ADD_EXPENSE_OPTIONS.CREATE_NEW_EXPENSE,
            text: translate('iou.createExpense'),
            icon: Expensicons.Plus,
            onSelected: function () {
                if (!reportId) {
                    return;
                }
                if (policy && (0, SubscriptionUtils_1.shouldRestrictUserBillableActions)(policy.id)) {
                    Navigation_1.default.navigate(ROUTES_1.default.RESTRICTED_ACTION.getRoute(policy.id));
                    return;
                }
                (0, IOU_1.startMoneyRequest)(CONST_1.default.IOU.TYPE.SUBMIT, reportId);
            },
        },
        {
            value: CONST_1.default.REPORT.ADD_EXPENSE_OPTIONS.TRACK_DISTANCE_EXPENSE,
            text: translate('iou.trackDistance'),
            icon: Expensicons.Location,
            onSelected: function () {
                if (!reportId) {
                    return;
                }
                if (policy && (0, SubscriptionUtils_1.shouldRestrictUserBillableActions)(policy.id)) {
                    Navigation_1.default.navigate(ROUTES_1.default.RESTRICTED_ACTION.getRoute(policy.id));
                    return;
                }
                (0, IOU_1.startDistanceRequest)(CONST_1.default.IOU.TYPE.SUBMIT, reportId, lastDistanceExpenseType);
            },
        },
        {
            value: CONST_1.default.REPORT.ADD_EXPENSE_OPTIONS.ADD_UNREPORTED_EXPENSE,
            text: translate('iou.addUnreportedExpense'),
            icon: Expensicons.ReceiptPlus,
            onSelected: function () {
                if (policy && (0, SubscriptionUtils_1.shouldRestrictUserBillableActions)(policy.id)) {
                    Navigation_1.default.navigate(ROUTES_1.default.RESTRICTED_ACTION.getRoute(policy.id));
                    return;
                }
                (0, Report_1.openUnreportedExpense)(reportId);
            },
        },
    ];
    return (<react_native_1.View style={styles.flex1}>
            <EmptyStateComponent_1.default cardStyles={[styles.appBG]} cardContentStyles={[styles.pt5, styles.pb0]} headerMediaType={CONST_1.default.EMPTY_STATE_MEDIA.ANIMATION} headerMedia={LottieAnimations_1.default.GenericEmptyState} title={translate('search.moneyRequestReport.emptyStateTitle')} headerStyles={[styles.emptyStateMoneyRequestReport]} lottieWebViewStyles={styles.emptyStateFolderWebStyles} headerContentStyles={styles.emptyStateFolderWebStyles} minModalHeight={minModalHeight} buttons={canAddTransactionToReport
            ? [{ buttonText: translate('iou.addExpense'), buttonAction: function () { }, success: true, isDisabled: false, dropDownOptions: addExpenseDropdownOptions }]
            : []}/>
        </react_native_1.View>);
}
SearchMoneyRequestReportEmptyState.displayName = 'SearchMoneyRequestReportEmptyState';
exports.default = SearchMoneyRequestReportEmptyState;
