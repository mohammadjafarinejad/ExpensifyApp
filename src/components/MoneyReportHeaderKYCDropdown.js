"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var useLocalize_1 = require("@hooks/useLocalize");
var useNetwork_1 = require("@hooks/useNetwork");
var useResponsiveLayout_1 = require("@hooks/useResponsiveLayout");
var useThemeStyles_1 = require("@hooks/useThemeStyles");
var PaymentUtils_1 = require("@libs/PaymentUtils");
var CONST_1 = require("@src/CONST");
var ROUTES_1 = require("@src/ROUTES");
var ButtonWithDropdownMenu_1 = require("./ButtonWithDropdownMenu");
var KYCWall_1 = require("./KYCWall");
function MoneyReportHeaderKYCDropdown(_a) {
    var onSuccessfulKYC = _a.onSuccessfulKYC, primaryAction = _a.primaryAction, chatReportID = _a.chatReportID, applicableSecondaryActions = _a.applicableSecondaryActions, iouReport = _a.iouReport, onPaymentSelect = _a.onPaymentSelect, ref = _a.ref, props = __rest(_a, ["onSuccessfulKYC", "primaryAction", "chatReportID", "applicableSecondaryActions", "iouReport", "onPaymentSelect", "ref"]);
    var styles = (0, useThemeStyles_1.default)();
    var translate = (0, useLocalize_1.default)().translate;
    var _b = (0, useResponsiveLayout_1.default)(), shouldUseNarrowLayout = _b.shouldUseNarrowLayout, isMediumScreenWidth = _b.isMediumScreenWidth;
    var isOffline = (0, useNetwork_1.default)().isOffline;
    var shouldDisplayNarrowVersion = shouldUseNarrowLayout || isMediumScreenWidth;
    return (<KYCWall_1.default 
    // eslint-disable-next-line react/jsx-props-no-spreading
    {...props} onSuccessfulKYC={onSuccessfulKYC} enablePaymentsRoute={ROUTES_1.default.ENABLE_PAYMENTS} isDisabled={isOffline} source={CONST_1.default.KYC_WALL_SOURCE.REPORT} chatReportID={chatReportID} iouReport={iouReport} anchorAlignment={{
            horizontal: CONST_1.default.MODAL.ANCHOR_ORIGIN_HORIZONTAL.LEFT, // button is at left, so horizontal anchor is at LEFT
            vertical: CONST_1.default.MODAL.ANCHOR_ORIGIN_VERTICAL.TOP, // we assume that popover menu opens below the button, anchor is at TOP
        }} ref={ref}>
            {function (triggerKYCFlow, buttonRef) { return (<ButtonWithDropdownMenu_1.default success={false} onPress={function () { }} onSubItemSelected={function (item, index, event) {
                if (!(0, PaymentUtils_1.isSecondaryActionAPaymentOption)(item)) {
                    return;
                }
                onPaymentSelect(event, item.value, triggerKYCFlow);
            }} buttonRef={buttonRef} shouldAlwaysShowDropdownMenu shouldPopoverUseScrollView={applicableSecondaryActions.length >= 5} customText={translate('common.more')} options={applicableSecondaryActions} isSplitButton={false} wrapperStyle={shouldDisplayNarrowVersion && [!primaryAction && styles.flex1]} shouldUseModalPaddingStyle/>); }}
        </KYCWall_1.default>);
}
MoneyReportHeaderKYCDropdown.displayName = 'MoneyReportHeaderKYCDropdown';
exports.default = (0, react_1.memo)(MoneyReportHeaderKYCDropdown);
