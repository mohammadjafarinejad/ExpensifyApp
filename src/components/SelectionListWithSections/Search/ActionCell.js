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
var react_1 = require("react");
var react_native_1 = require("react-native");
var Badge_1 = require("@components/Badge");
var Button_1 = require("@components/Button");
var Expensicons = require("@components/Icon/Expensicons");
var SearchScopeProvider_1 = require("@components/Search/SearchScopeProvider");
var SettlementButton_1 = require("@components/SettlementButton");
var useLocalize_1 = require("@hooks/useLocalize");
var useNetwork_1 = require("@hooks/useNetwork");
var useOnyx_1 = require("@hooks/useOnyx");
var usePolicy_1 = require("@hooks/usePolicy");
var useReportWithTransactionsAndViolations_1 = require("@hooks/useReportWithTransactionsAndViolations");
var useStyleUtils_1 = require("@hooks/useStyleUtils");
var useTheme_1 = require("@hooks/useTheme");
var useThemeStyles_1 = require("@hooks/useThemeStyles");
var IOU_1 = require("@libs/actions/IOU");
var Search_1 = require("@libs/actions/Search");
var CurrencyUtils_1 = require("@libs/CurrencyUtils");
var ReportUtils_1 = require("@libs/ReportUtils");
var variables_1 = require("@styles/variables");
var CONST_1 = require("@src/CONST");
var ONYXKEYS_1 = require("@src/ONYXKEYS");
var ROUTES_1 = require("@src/ROUTES");
var actionTranslationsMap = {
    view: 'common.view',
    review: 'common.review',
    submit: 'common.submit',
    approve: 'iou.approve',
    pay: 'iou.pay',
    exportToAccounting: 'common.export',
    done: 'common.done',
    paid: 'iou.settledExpensify',
};
function ActionCell(_a) {
    var _b;
    var _c = _a.action, action = _c === void 0 ? CONST_1.default.SEARCH.ACTION_TYPES.VIEW : _c, _d = _a.isLargeScreenWidth, isLargeScreenWidth = _d === void 0 ? true : _d, _e = _a.isSelected, isSelected = _e === void 0 ? false : _e, goToItem = _a.goToItem, _f = _a.isChildListItem, isChildListItem = _f === void 0 ? false : _f, _g = _a.parentAction, parentAction = _g === void 0 ? '' : _g, _h = _a.isLoading, isLoading = _h === void 0 ? false : _h, _j = _a.policyID, policyID = _j === void 0 ? '' : _j, _k = _a.reportID, reportID = _k === void 0 ? '' : _k, hash = _a.hash, amount = _a.amount, _l = _a.extraSmall, extraSmall = _l === void 0 ? false : _l, shouldDisablePointerEvents = _a.shouldDisablePointerEvents;
    var translate = (0, useLocalize_1.default)().translate;
    var theme = (0, useTheme_1.default)();
    var styles = (0, useThemeStyles_1.default)();
    var StyleUtils = (0, useStyleUtils_1.default)();
    var isOffline = (0, useNetwork_1.default)().isOffline;
    var _m = (0, useReportWithTransactionsAndViolations_1.default)(reportID), iouReport = _m[0], transactions = _m[1];
    var policy = (0, usePolicy_1.default)(policyID);
    var chatReport = (0, useOnyx_1.default)("".concat(ONYXKEYS_1.default.COLLECTION.REPORT).concat(iouReport === null || iouReport === void 0 ? void 0 : iouReport.chatReportID), { canBeMissing: true })[0];
    var canBePaid = (0, IOU_1.canIOUBePaid)(iouReport, chatReport, policy, transactions, false, undefined, undefined, true);
    var shouldOnlyShowElsewhere = !canBePaid && (0, IOU_1.canIOUBePaid)(iouReport, chatReport, policy, transactions, true, undefined, undefined, true);
    var text = isChildListItem ? translate(actionTranslationsMap[CONST_1.default.SEARCH.ACTION_TYPES.VIEW]) : translate(actionTranslationsMap[action]);
    var shouldUseViewAction = action === CONST_1.default.SEARCH.ACTION_TYPES.VIEW || (parentAction === CONST_1.default.SEARCH.ACTION_TYPES.PAID && action === CONST_1.default.SEARCH.ACTION_TYPES.PAID);
    var currency = (iouReport !== null && iouReport !== void 0 ? iouReport : {}).currency;
    var confirmPayment = (0, react_1.useCallback)(function (type, payAsBusiness, methodID, paymentMethod) {
        if (!type || !reportID || !hash || !amount) {
            return;
        }
        var invoiceParams = (0, Search_1.getPayMoneyOnSearchInvoiceParams)(policyID, payAsBusiness, methodID, paymentMethod);
        (0, Search_1.payMoneyRequestOnSearch)(hash, [__assign({ amount: amount, paymentType: type, reportID: reportID }, ((0, ReportUtils_1.isInvoiceReport)(iouReport) ? invoiceParams : {}))]);
    }, [reportID, hash, amount, policyID, iouReport]);
    if (!isChildListItem && ((parentAction !== CONST_1.default.SEARCH.ACTION_TYPES.PAID && action === CONST_1.default.SEARCH.ACTION_TYPES.PAID) || action === CONST_1.default.SEARCH.ACTION_TYPES.DONE)) {
        return (<react_native_1.View style={[StyleUtils.getHeight(variables_1.default.h20), styles.justifyContentCenter, shouldDisablePointerEvents && styles.pointerEventsNone]} accessible={!shouldDisablePointerEvents} accessibilityState={{ disabled: shouldDisablePointerEvents }}>
                <Badge_1.default text={text} icon={action === CONST_1.default.SEARCH.ACTION_TYPES.DONE ? Expensicons.Checkbox : Expensicons.Checkmark} badgeStyles={[
                styles.ml0,
                styles.ph2,
                styles.gap1,
                isLargeScreenWidth ? styles.alignSelfCenter : styles.alignSelfEnd,
                StyleUtils.getHeight(variables_1.default.h20),
                StyleUtils.getMinimumHeight(variables_1.default.h20),
                isSelected ? StyleUtils.getBorderColorStyle(theme.buttonHoveredBG) : StyleUtils.getBorderColorStyle(theme.border),
            ]} textStyles={StyleUtils.getFontSizeStyle(extraSmall ? variables_1.default.fontSizeExtraSmall : variables_1.default.fontSizeSmall)} iconStyles={styles.mr0} success shouldUseXXSmallIcon={extraSmall}/>
            </react_native_1.View>);
    }
    if (action === CONST_1.default.SEARCH.ACTION_TYPES.VIEW || action === CONST_1.default.SEARCH.ACTION_TYPES.REVIEW || shouldUseViewAction || isChildListItem) {
        var buttonInnerStyles = isSelected ? styles.buttonDefaultSelected : {};
        return isLargeScreenWidth ? (<Button_1.default testID={ActionCell.displayName} text={text} onPress={goToItem} small={!extraSmall} extraSmall={extraSmall} style={[styles.w100, shouldDisablePointerEvents && styles.pointerEventsNone]} isDisabled={shouldDisablePointerEvents} shouldStayNormalOnDisable={shouldDisablePointerEvents} innerStyles={buttonInnerStyles} link={isChildListItem} shouldUseDefaultHover={!isChildListItem} icon={!isChildListItem && action === CONST_1.default.SEARCH.ACTION_TYPES.REVIEW ? Expensicons.DotIndicator : undefined} iconFill={theme.danger} iconHoverFill={theme.dangerHover} isNested/>) : null;
    }
    if (action === CONST_1.default.SEARCH.ACTION_TYPES.PAY) {
        return (<SearchScopeProvider_1.SearchScopeProvider isOnSearch={false}>
                <SettlementButton_1.default shouldUseShortForm buttonSize={extraSmall ? CONST_1.default.DROPDOWN_BUTTON_SIZE.EXTRA_SMALL : CONST_1.default.DROPDOWN_BUTTON_SIZE.SMALL} currency={currency} formattedAmount={(0, CurrencyUtils_1.convertToDisplayString)(Math.abs((_b = iouReport === null || iouReport === void 0 ? void 0 : iouReport.total) !== null && _b !== void 0 ? _b : 0), currency)} 
        // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
        policyID={policyID || (iouReport === null || iouReport === void 0 ? void 0 : iouReport.policyID)} iouReport={iouReport} chatReportID={iouReport === null || iouReport === void 0 ? void 0 : iouReport.chatReportID} enablePaymentsRoute={ROUTES_1.default.ENABLE_PAYMENTS} onPress={function (type, payAsBusiness, methodID, paymentMethod) { return confirmPayment(type, payAsBusiness, methodID, paymentMethod); }} style={[styles.w100, shouldDisablePointerEvents && styles.pointerEventsNone]} wrapperStyle={[styles.w100]} shouldShowPersonalBankAccountOption={!policyID && !(iouReport === null || iouReport === void 0 ? void 0 : iouReport.policyID)} isDisabled={isOffline || shouldDisablePointerEvents} shouldStayNormalOnDisable={shouldDisablePointerEvents} isLoading={isLoading} onlyShowPayElsewhere={shouldOnlyShowElsewhere}/>
            </SearchScopeProvider_1.SearchScopeProvider>);
    }
    return (<Button_1.default text={text} onPress={goToItem} small={!extraSmall} extraSmall={extraSmall} style={[styles.w100, shouldDisablePointerEvents && styles.pointerEventsNone]} isLoading={isLoading} success isDisabled={isOffline || shouldDisablePointerEvents} shouldStayNormalOnDisable={shouldDisablePointerEvents} isNested/>);
}
ActionCell.displayName = 'ActionCell';
exports.default = ActionCell;
