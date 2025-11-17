"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var native_1 = require("@react-navigation/native");
var expensify_common_1 = require("expensify-common");
var react_1 = require("react");
var ConnectionLayout_1 = require("@components/ConnectionLayout");
var MenuItemWithTopDescription_1 = require("@components/MenuItemWithTopDescription");
var OfflineWithFeedback_1 = require("@components/OfflineWithFeedback");
var useLocalize_1 = require("@hooks/useLocalize");
var useThemeStyles_1 = require("@hooks/useThemeStyles");
var QuickbooksDesktop_1 = require("@libs/actions/connections/QuickbooksDesktop");
var ErrorUtils_1 = require("@libs/ErrorUtils");
var Navigation_1 = require("@libs/Navigation/Navigation");
var PolicyUtils_1 = require("@libs/PolicyUtils");
var withPolicyConnections_1 = require("@pages/workspace/withPolicyConnections");
var ToggleSettingsOptionRow_1 = require("@pages/workspace/workflows/ToggleSettingsOptionRow");
var Policy_1 = require("@userActions/Policy/Policy");
var CONST_1 = require("@src/CONST");
var ROUTES_1 = require("@src/ROUTES");
function QuickbooksDesktopAdvancedPage(_a) {
    var _b, _c, _d, _e, _f;
    var policy = _a.policy;
    var styles = (0, useThemeStyles_1.default)();
    var translate = (0, useLocalize_1.default)().translate;
    var policyID = policy === null || policy === void 0 ? void 0 : policy.id;
    var qbdConfig = (_c = (_b = policy === null || policy === void 0 ? void 0 : policy.connections) === null || _b === void 0 ? void 0 : _b.quickbooksDesktop) === null || _c === void 0 ? void 0 : _c.config;
    var route = (0, native_1.useRoute)();
    var accountingMethod = (_e = (_d = qbdConfig === null || qbdConfig === void 0 ? void 0 : qbdConfig.export) === null || _d === void 0 ? void 0 : _d.accountingMethod) !== null && _e !== void 0 ? _e : expensify_common_1.CONST.INTEGRATIONS.ACCOUNTING_METHOD.CASH;
    var qbdToggleSettingItems = [
        {
            title: translate('workspace.qbd.advancedConfig.createEntities'),
            subtitle: translate('workspace.qbd.advancedConfig.createEntitiesDescription'),
            switchAccessibilityLabel: translate('workspace.qbd.advancedConfig.createEntitiesDescription'),
            isActive: !!(qbdConfig === null || qbdConfig === void 0 ? void 0 : qbdConfig.shouldAutoCreateVendor),
            onToggle: function (isOn) {
                (0, QuickbooksDesktop_1.updateQuickbooksDesktopShouldAutoCreateVendor)(policyID, isOn);
            },
            subscribedSetting: CONST_1.default.QUICKBOOKS_DESKTOP_CONFIG.SHOULD_AUTO_CREATE_VENDOR,
            errors: (0, ErrorUtils_1.getLatestErrorField)(qbdConfig, CONST_1.default.QUICKBOOKS_DESKTOP_CONFIG.SHOULD_AUTO_CREATE_VENDOR),
            pendingAction: (0, PolicyUtils_1.settingsPendingAction)([CONST_1.default.QUICKBOOKS_DESKTOP_CONFIG.SHOULD_AUTO_CREATE_VENDOR], qbdConfig === null || qbdConfig === void 0 ? void 0 : qbdConfig.pendingFields),
        },
    ];
    return (<ConnectionLayout_1.default displayName={QuickbooksDesktopAdvancedPage.displayName} headerTitle="workspace.accounting.advanced" accessVariants={[CONST_1.default.POLICY.ACCESS_VARIANTS.ADMIN, CONST_1.default.POLICY.ACCESS_VARIANTS.CONTROL]} policyID={policyID} featureName={CONST_1.default.POLICY.MORE_FEATURES.ARE_CONNECTIONS_ENABLED} contentContainerStyle={[styles.pb2, styles.ph5]} connectionName={CONST_1.default.POLICY.CONNECTIONS.NAME.QBD} onBackButtonPress={function () { var _a, _b; return Navigation_1.default.goBack((_b = (_a = route.params) === null || _a === void 0 ? void 0 : _a.backTo) !== null && _b !== void 0 ? _b : ROUTES_1.default.POLICY_ACCOUNTING.getRoute(policyID)); }}>
            <OfflineWithFeedback_1.default pendingAction={(0, PolicyUtils_1.settingsPendingAction)([CONST_1.default.QUICKBOOKS_DESKTOP_CONFIG.AUTO_SYNC, CONST_1.default.QUICKBOOKS_CONFIG.ACCOUNTING_METHOD], qbdConfig === null || qbdConfig === void 0 ? void 0 : qbdConfig.pendingFields)}>
                <MenuItemWithTopDescription_1.default title={((_f = qbdConfig === null || qbdConfig === void 0 ? void 0 : qbdConfig.autoSync) === null || _f === void 0 ? void 0 : _f.enabled) ? translate('common.enabled') : translate('common.disabled')} description={translate('workspace.accounting.autoSync')} shouldShowRightIcon wrapperStyle={[styles.sectionMenuItemTopDescription]} onPress={function () { return Navigation_1.default.navigate(ROUTES_1.default.POLICY_ACCOUNTING_QUICKBOOKS_DESKTOP_AUTO_SYNC.getRoute(policyID)); }} brickRoadIndicator={(0, PolicyUtils_1.areSettingsInErrorFields)([CONST_1.default.QUICKBOOKS_DESKTOP_CONFIG.AUTO_SYNC, CONST_1.default.QUICKBOOKS_DESKTOP_CONFIG.ACCOUNTING_METHOD], qbdConfig === null || qbdConfig === void 0 ? void 0 : qbdConfig.errorFields)
            ? CONST_1.default.BRICK_ROAD_INDICATOR_STATUS.ERROR
            : undefined} hintText={(function () {
            var _a;
            if (!((_a = qbdConfig === null || qbdConfig === void 0 ? void 0 : qbdConfig.autoSync) === null || _a === void 0 ? void 0 : _a.enabled)) {
                return undefined;
            }
            return translate("workspace.qbd.accountingMethods.alternateText.".concat(accountingMethod));
        })()}/>
            </OfflineWithFeedback_1.default>

            {qbdToggleSettingItems.map(function (item) { return (<ToggleSettingsOptionRow_1.default key={item.title} title={item.title} subtitle={item.subtitle} switchAccessibilityLabel={item.switchAccessibilityLabel} shouldPlaceSubtitleBelowSwitch wrapperStyle={styles.mv3} isActive={item.isActive} onToggle={item.onToggle} pendingAction={item.pendingAction} errors={item.errors} onCloseError={function () { return (0, Policy_1.clearQBDErrorField)(policyID, item.subscribedSetting); }}/>); })}
        </ConnectionLayout_1.default>);
}
QuickbooksDesktopAdvancedPage.displayName = 'QuickbooksDesktopAdvancedPage';
exports.default = (0, withPolicyConnections_1.default)(QuickbooksDesktopAdvancedPage);
