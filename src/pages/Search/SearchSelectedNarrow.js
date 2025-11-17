"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Account_1 = require("@selectors/Account");
var react_1 = require("react");
var react_native_1 = require("react-native");
var ButtonWithDropdownMenu_1 = require("@components/ButtonWithDropdownMenu");
var KYCWall_1 = require("@components/KYCWall");
var KYCWallContext_1 = require("@components/KYCWall/KYCWallContext");
var LockedAccountModalProvider_1 = require("@components/LockedAccountModalProvider");
var useCurrentUserPersonalDetails_1 = require("@hooks/useCurrentUserPersonalDetails");
var useLocalize_1 = require("@hooks/useLocalize");
var useOnyx_1 = require("@hooks/useOnyx");
var usePolicy_1 = require("@hooks/usePolicy");
var useThemeStyles_1 = require("@hooks/useThemeStyles");
var Search_1 = require("@libs/actions/Search");
var Navigation_1 = require("@libs/Navigation/Navigation");
var PolicyUtils_1 = require("@libs/PolicyUtils");
var ReportUtils_1 = require("@libs/ReportUtils");
var CONST_1 = require("@src/CONST");
var ONYXKEYS_1 = require("@src/ONYXKEYS");
var ROUTES_1 = require("@src/ROUTES");
function SearchSelectedNarrow(_a) {
    var options = _a.options, itemsLength = _a.itemsLength, currentSelectedPolicyID = _a.currentSelectedPolicyID, currentSelectedReportID = _a.currentSelectedReportID, confirmPayment = _a.confirmPayment, latestBankItems = _a.latestBankItems;
    var styles = (0, useThemeStyles_1.default)();
    var allPolicies = (0, useOnyx_1.default)(ONYXKEYS_1.default.COLLECTION.POLICY, { canBeMissing: true })[0];
    var selectedIouReport = (0, useOnyx_1.default)("".concat(ONYXKEYS_1.default.COLLECTION.REPORT).concat(currentSelectedReportID), { canBeMissing: true })[0];
    var _b = (0, useLocalize_1.default)(), translate = _b.translate, localeCompare = _b.localeCompare;
    var kycWallRef = (0, react_1.useContext)(KYCWallContext_1.KYCWallContext);
    var currentPolicy = (0, usePolicy_1.default)(currentSelectedPolicyID);
    var isUserValidated = (0, useOnyx_1.default)(ONYXKEYS_1.default.ACCOUNT, { selector: Account_1.isUserValidatedSelector, canBeMissing: true })[0];
    var isCurrentSelectedExpenseReport = (0, ReportUtils_1.isExpenseReport)(currentSelectedReportID);
    var _c = (0, react_1.useContext)(LockedAccountModalProvider_1.LockedAccountContext), isAccountLocked = _c.isAccountLocked, showLockedAccountModal = _c.showLockedAccountModal;
    // Stores an option to execute after modal closes when using deferred execution
    var selectedOptionRef = (0, react_1.useRef)(null);
    var accountID = (0, useCurrentUserPersonalDetails_1.default)().accountID;
    var activeAdminPolicies = (0, PolicyUtils_1.getActiveAdminWorkspaces)(allPolicies, accountID.toString()).sort(function (a, b) { return localeCompare(a.name || '', b.name || ''); });
    var handleOnMenuItemPress = function (option) {
        var _a;
        if (option === null || option === void 0 ? void 0 : option.shouldCloseModalOnSelect) {
            selectedOptionRef.current = option;
            return;
        }
        (_a = option === null || option === void 0 ? void 0 : option.onSelected) === null || _a === void 0 ? void 0 : _a.call(option);
    };
    return (<KYCWall_1.default ref={kycWallRef} chatReportID={currentSelectedReportID} iouReport={selectedIouReport} enablePaymentsRoute={ROUTES_1.default.ENABLE_PAYMENTS} addBankAccountRoute={isCurrentSelectedExpenseReport ? ROUTES_1.default.BANK_ACCOUNT_WITH_STEP_TO_OPEN.getRoute(currentSelectedPolicyID, undefined, Navigation_1.default.getActiveRoute()) : undefined} onSuccessfulKYC={function (paymentType) { return confirmPayment === null || confirmPayment === void 0 ? void 0 : confirmPayment(paymentType); }}>
            {function (triggerKYCFlow, buttonRef) { return (<react_native_1.View style={[styles.pb3]}>
                    <ButtonWithDropdownMenu_1.default buttonRef={buttonRef} options={options} customText={translate('workspace.common.selected', { count: itemsLength })} shouldAlwaysShowDropdownMenu isDisabled={options.length === 0} onPress={function () { return null; }} onOptionSelected={function (item) { return handleOnMenuItemPress(item); }} onSubItemSelected={function (subItem) {
                return (0, Search_1.handleBulkPayItemSelected)(subItem, triggerKYCFlow, isAccountLocked, showLockedAccountModal, currentPolicy, latestBankItems, activeAdminPolicies, isUserValidated, confirmPayment);
            }} success isSplitButton={false} style={[styles.w100, styles.ph5]} anchorAlignment={{
                horizontal: CONST_1.default.MODAL.ANCHOR_ORIGIN_HORIZONTAL.LEFT,
                vertical: CONST_1.default.MODAL.ANCHOR_ORIGIN_VERTICAL.BOTTOM,
            }} shouldUseModalPaddingStyle/>
                </react_native_1.View>); }}
        </KYCWall_1.default>);
}
SearchSelectedNarrow.displayName = 'SearchSelectedNarrow';
exports.default = SearchSelectedNarrow;
