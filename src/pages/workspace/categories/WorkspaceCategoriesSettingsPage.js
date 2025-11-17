"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_native_1 = require("react-native");
var CategorySelectorModal_1 = require("@components/CategorySelector/CategorySelectorModal");
var HeaderWithBackButton_1 = require("@components/HeaderWithBackButton");
var ScreenWrapper_1 = require("@components/ScreenWrapper");
var ScrollView_1 = require("@components/ScrollView");
var SelectionList_1 = require("@components/SelectionList");
var SpendCategorySelectorListItem_1 = require("@components/SelectionList/ListItem/SpendCategorySelectorListItem");
var Text_1 = require("@components/Text");
var useLocalize_1 = require("@hooks/useLocalize");
var usePolicyData_1 = require("@hooks/usePolicyData");
var useThemeStyles_1 = require("@hooks/useThemeStyles");
var Navigation_1 = require("@libs/Navigation/Navigation");
var OptionsListUtils_1 = require("@libs/OptionsListUtils");
var PolicyUtils_1 = require("@libs/PolicyUtils");
var AccessOrNotFoundWrapper_1 = require("@pages/workspace/AccessOrNotFoundWrapper");
var withPolicyConnections_1 = require("@pages/workspace/withPolicyConnections");
var ToggleSettingsOptionRow_1 = require("@pages/workspace/workflows/ToggleSettingsOptionRow");
var Category_1 = require("@userActions/Policy/Category");
var Policy_1 = require("@userActions/Policy/Policy");
var CONST_1 = require("@src/CONST");
var ROUTES_1 = require("@src/ROUTES");
var SCREENS_1 = require("@src/SCREENS");
function WorkspaceCategoriesSettingsPage(_a) {
    var _b, _c, _d, _e, _f, _g;
    var policy = _a.policy, route = _a.route;
    var _h = route.params, policyID = _h.policyID, backTo = _h.backTo;
    var styles = (0, useThemeStyles_1.default)();
    var translate = (0, useLocalize_1.default)().translate;
    var policyData = (0, usePolicyData_1.default)(policyID);
    var isConnectedToAccounting = Object.keys((_b = policy === null || policy === void 0 ? void 0 : policy.connections) !== null && _b !== void 0 ? _b : {}).length > 0;
    var currentConnectionName = (0, PolicyUtils_1.getCurrentConnectionName)(policy);
    var _j = (0, react_1.useState)(false), isSelectorModalVisible = _j[0], setIsSelectorModalVisible = _j[1];
    var _k = (0, react_1.useState)(), categoryID = _k[0], setCategoryID = _k[1];
    var _l = (0, react_1.useState)(), groupID = _l[0], setGroupID = _l[1];
    var isQuickSettingsFlow = route.name === SCREENS_1.default.SETTINGS_CATEGORIES.SETTINGS_CATEGORIES_SETTINGS;
    var toggleSubtitle = isConnectedToAccounting && currentConnectionName ? translate('workspace.categories.needCategoryForExportToIntegration', { connectionName: currentConnectionName }) : undefined;
    var updateWorkspaceRequiresCategory = (0, react_1.useCallback)(function (value) {
        (0, Category_1.setWorkspaceRequiresCategory)(policyData, value);
    }, [policyData]);
    var data = (0, react_1.useMemo)(function () {
        var _a, _b;
        if (!(policyData.policy && ((_a = policyData.policy) === null || _a === void 0 ? void 0 : _a.mccGroup))) {
            return [];
        }
        return Object.entries((_b = policyData.policy) === null || _b === void 0 ? void 0 : _b.mccGroup).map(function (_a) {
            var mccKey = _a[0], mccGroup = _a[1];
            return ({
                categoryID: mccGroup.category,
                keyForList: mccKey,
                groupID: mccKey,
                tabIndex: -1,
                pendingAction: mccGroup === null || mccGroup === void 0 ? void 0 : mccGroup.pendingAction,
            });
        });
    }, [policyData.policy]);
    var hasEnabledCategories = (0, OptionsListUtils_1.hasEnabledOptions)(policyData.categories);
    var isToggleDisabled = !(policy === null || policy === void 0 ? void 0 : policy.areCategoriesEnabled) || !hasEnabledCategories || isConnectedToAccounting;
    var setNewCategory = function (selectedCategory, currentGroupID) {
        if (!selectedCategory.keyForList) {
            return;
        }
        if (categoryID !== selectedCategory.keyForList) {
            (0, Policy_1.setWorkspaceDefaultSpendCategory)(policyID, currentGroupID, selectedCategory.keyForList);
        }
        react_native_1.Keyboard.dismiss();
        // eslint-disable-next-line @typescript-eslint/no-deprecated
        react_native_1.InteractionManager.runAfterInteractions(function () {
            setIsSelectorModalVisible(false);
        });
    };
    var onSelectItem = function (item) {
        if (!item.groupID || !item.categoryID) {
            return;
        }
        setIsSelectorModalVisible(true);
        setCategoryID(item.categoryID);
        setGroupID(item.groupID);
    };
    var selectionListHeaderContent = (<react_native_1.View style={[styles.mh5, styles.mt2, styles.mb1]}>
            <Text_1.default style={[styles.headerText]}>{translate('workspace.categories.defaultSpendCategories')}</Text_1.default>
            <Text_1.default style={[styles.mt1, styles.lh20]}>{translate('workspace.categories.spendCategoriesDescription')}</Text_1.default>
        </react_native_1.View>);
    return (<AccessOrNotFoundWrapper_1.default policyID={policyID} accessVariants={[CONST_1.default.POLICY.ACCESS_VARIANTS.ADMIN, CONST_1.default.POLICY.ACCESS_VARIANTS.PAID]} featureName={CONST_1.default.POLICY.MORE_FEATURES.ARE_CATEGORIES_ENABLED}>
            <ScreenWrapper_1.default enableEdgeToEdgeBottomSafeAreaPadding style={[styles.defaultModalContainer]} testID={WorkspaceCategoriesSettingsPage.displayName}>
                <HeaderWithBackButton_1.default title={translate('common.settings')} onBackButtonPress={function () { return Navigation_1.default.goBack(isQuickSettingsFlow ? ROUTES_1.default.SETTINGS_CATEGORIES_ROOT.getRoute(policyID, backTo) : undefined); }}/>
                <ScrollView_1.default contentContainerStyle={[styles.flexGrow1]}>
                    <ToggleSettingsOptionRow_1.default title={translate('workspace.categories.requiresCategory')} subtitle={toggleSubtitle} switchAccessibilityLabel={translate('workspace.categories.requiresCategory')} isActive={(_c = policy === null || policy === void 0 ? void 0 : policy.requiresCategory) !== null && _c !== void 0 ? _c : false} onToggle={updateWorkspaceRequiresCategory} pendingAction={(_d = policy === null || policy === void 0 ? void 0 : policy.pendingFields) === null || _d === void 0 ? void 0 : _d.requiresCategory} disabled={isToggleDisabled} wrapperStyle={[styles.pv2, styles.mh5]} errors={(_f = (_e = policy === null || policy === void 0 ? void 0 : policy.errorFields) === null || _e === void 0 ? void 0 : _e.requiresCategory) !== null && _f !== void 0 ? _f : undefined} onCloseError={function () { return (0, Policy_1.clearPolicyErrorField)(policy === null || policy === void 0 ? void 0 : policy.id, 'requiresCategory'); }} shouldPlaceSubtitleBelowSwitch/>
                    <react_native_1.View style={[styles.sectionDividerLine, styles.mh5, styles.mv6]}/>
                    <react_native_1.View style={[styles.containerWithSpaceBetween]}>
                        {!!policyData.policy && ((_g = data === null || data === void 0 ? void 0 : data.length) !== null && _g !== void 0 ? _g : 0) > 0 && (<SelectionList_1.default addBottomSafeAreaPadding customListHeaderContent={selectionListHeaderContent} data={data} ListItem={SpendCategorySelectorListItem_1.default} onSelectRow={onSelectItem}/>)}
                    </react_native_1.View>
                </ScrollView_1.default>
                {!!categoryID && !!groupID && (<CategorySelectorModal_1.default policyID={policyID} isVisible={isSelectorModalVisible} currentCategory={categoryID} onClose={function () { return setIsSelectorModalVisible(false); }} onCategorySelected={function (selectedCategory) { return setNewCategory(selectedCategory, groupID); }} label={groupID[0].toUpperCase() + groupID.slice(1)}/>)}
            </ScreenWrapper_1.default>
        </AccessOrNotFoundWrapper_1.default>);
}
WorkspaceCategoriesSettingsPage.displayName = 'WorkspaceCategoriesSettingsPage';
exports.default = (0, withPolicyConnections_1.default)(WorkspaceCategoriesSettingsPage);
