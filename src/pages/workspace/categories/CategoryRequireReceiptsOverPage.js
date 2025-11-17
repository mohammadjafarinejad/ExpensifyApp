"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var HeaderWithBackButton_1 = require("@components/HeaderWithBackButton");
var ScreenWrapper_1 = require("@components/ScreenWrapper");
var SelectionList_1 = require("@components/SelectionList");
var RadioListItem_1 = require("@components/SelectionList/ListItem/RadioListItem");
var useLocalize_1 = require("@hooks/useLocalize");
var usePolicyData_1 = require("@hooks/usePolicyData");
var useThemeStyles_1 = require("@hooks/useThemeStyles");
var CurrencyUtils_1 = require("@libs/CurrencyUtils");
var Navigation_1 = require("@libs/Navigation/Navigation");
var AccessOrNotFoundWrapper_1 = require("@pages/workspace/AccessOrNotFoundWrapper");
var Category_1 = require("@userActions/Policy/Category");
var CONST_1 = require("@src/CONST");
var ROUTES_1 = require("@src/ROUTES");
function getInitiallyFocusedOptionKey(isAlwaysSelected, isNeverSelected) {
    if (isAlwaysSelected) {
        return CONST_1.default.POLICY.REQUIRE_RECEIPTS_OVER_OPTIONS.ALWAYS;
    }
    if (isNeverSelected) {
        return CONST_1.default.POLICY.REQUIRE_RECEIPTS_OVER_OPTIONS.NEVER;
    }
    return CONST_1.default.POLICY.REQUIRE_RECEIPTS_OVER_OPTIONS.DEFAULT;
}
function CategoryRequireReceiptsOverPage(_a) {
    var _b, _c, _d;
    var _e = _a.route.params, policyID = _e.policyID, categoryName = _e.categoryName;
    var styles = (0, useThemeStyles_1.default)();
    var translate = (0, useLocalize_1.default)().translate;
    var policyData = (0, usePolicyData_1.default)(policyID);
    var policy = policyData.policy, policyCategories = policyData.categories;
    var isAlwaysSelected = ((_b = policyCategories === null || policyCategories === void 0 ? void 0 : policyCategories[categoryName]) === null || _b === void 0 ? void 0 : _b.maxAmountNoReceipt) === 0;
    var isNeverSelected = ((_c = policyCategories === null || policyCategories === void 0 ? void 0 : policyCategories[categoryName]) === null || _c === void 0 ? void 0 : _c.maxAmountNoReceipt) === CONST_1.default.DISABLED_MAX_EXPENSE_VALUE;
    var maxExpenseAmountToDisplay = (policy === null || policy === void 0 ? void 0 : policy.maxExpenseAmountNoReceipt) === CONST_1.default.DISABLED_MAX_EXPENSE_VALUE ? 0 : policy === null || policy === void 0 ? void 0 : policy.maxExpenseAmountNoReceipt;
    var requireReceiptsOverListData = [
        {
            value: null,
            text: translate("workspace.rules.categoryRules.requireReceiptsOverList.default", {
                defaultAmount: (0, CurrencyUtils_1.convertToShortDisplayString)(maxExpenseAmountToDisplay, (_d = policy === null || policy === void 0 ? void 0 : policy.outputCurrency) !== null && _d !== void 0 ? _d : CONST_1.default.CURRENCY.USD),
            }),
            keyForList: CONST_1.default.POLICY.REQUIRE_RECEIPTS_OVER_OPTIONS.DEFAULT,
            isSelected: !isAlwaysSelected && !isNeverSelected,
        },
        {
            value: CONST_1.default.DISABLED_MAX_EXPENSE_VALUE,
            text: translate("workspace.rules.categoryRules.requireReceiptsOverList.never"),
            keyForList: CONST_1.default.POLICY.REQUIRE_RECEIPTS_OVER_OPTIONS.NEVER,
            isSelected: isNeverSelected,
        },
        {
            value: 0,
            text: translate("workspace.rules.categoryRules.requireReceiptsOverList.always"),
            keyForList: CONST_1.default.POLICY.REQUIRE_RECEIPTS_OVER_OPTIONS.ALWAYS,
            isSelected: isAlwaysSelected,
        },
    ];
    var initiallyFocusedOptionKey = getInitiallyFocusedOptionKey(isAlwaysSelected, isNeverSelected);
    return (<AccessOrNotFoundWrapper_1.default accessVariants={[CONST_1.default.POLICY.ACCESS_VARIANTS.ADMIN, CONST_1.default.POLICY.ACCESS_VARIANTS.CONTROL]} policyID={policyID} featureName={CONST_1.default.POLICY.MORE_FEATURES.ARE_CATEGORIES_ENABLED}>
            <ScreenWrapper_1.default enableEdgeToEdgeBottomSafeAreaPadding style={[styles.defaultModalContainer]} testID={CategoryRequireReceiptsOverPage.displayName} shouldEnableMaxHeight>
                <HeaderWithBackButton_1.default title={translate('workspace.rules.categoryRules.requireReceiptsOver')} onBackButtonPress={function () { return Navigation_1.default.goBack(ROUTES_1.default.WORKSPACE_CATEGORY_SETTINGS.getRoute(policyID, categoryName)); }}/>
                <SelectionList_1.default data={requireReceiptsOverListData} ListItem={RadioListItem_1.default} onSelectRow={function (item) {
            if (typeof item.value === 'number') {
                (0, Category_1.setPolicyCategoryReceiptsRequired)(policyData, categoryName, item.value);
            }
            else {
                (0, Category_1.removePolicyCategoryReceiptsRequired)(policyData, categoryName);
            }
            Navigation_1.default.setNavigationActionToMicrotaskQueue(function () { return Navigation_1.default.goBack(ROUTES_1.default.WORKSPACE_CATEGORY_SETTINGS.getRoute(policyID, categoryName)); });
        }} style={{ containerStyle: styles.pt3 }} shouldSingleExecuteRowSelect initiallyFocusedItemKey={initiallyFocusedOptionKey} addBottomSafeAreaPadding/>
            </ScreenWrapper_1.default>
        </AccessOrNotFoundWrapper_1.default>);
}
CategoryRequireReceiptsOverPage.displayName = 'CategoryRequireReceiptsOverPage';
exports.default = CategoryRequireReceiptsOverPage;
