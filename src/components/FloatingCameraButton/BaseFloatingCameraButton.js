"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_native_1 = require("react-native");
var Icon_1 = require("@components/Icon");
var Pressable_1 = require("@components/Pressable");
var useLocalize_1 = require("@hooks/useLocalize");
var useOnyx_1 = require("@hooks/useOnyx");
var useTheme_1 = require("@hooks/useTheme");
var useThemeStyles_1 = require("@hooks/useThemeStyles");
var IOU_1 = require("@libs/actions/IOU");
var DeviceCapabilities_1 = require("@libs/DeviceCapabilities");
var interceptAnonymousUser_1 = require("@libs/interceptAnonymousUser");
var Navigation_1 = require("@libs/Navigation/Navigation");
var ReportUtils_1 = require("@libs/ReportUtils");
var SubscriptionUtils_1 = require("@libs/SubscriptionUtils");
var variables_1 = require("@styles/variables");
var Tab_1 = require("@userActions/Tab");
var CONST_1 = require("@src/CONST");
var ONYXKEYS_1 = require("@src/ONYXKEYS");
var ROUTES_1 = require("@src/ROUTES");
var EmptyObject_1 = require("@src/types/utils/EmptyObject");
var sessionSelector = function (session) { return ({ email: session === null || session === void 0 ? void 0 : session.email, accountID: session === null || session === void 0 ? void 0 : session.accountID }); };
function BaseFloatingCameraButton(_a) {
    var icon = _a.icon;
    var textLight = (0, useTheme_1.default)().textLight;
    var styles = (0, useThemeStyles_1.default)();
    var translate = (0, useLocalize_1.default)().translate;
    var activePolicyID = (0, useOnyx_1.default)(ONYXKEYS_1.default.NVP_ACTIVE_POLICY_ID, { canBeMissing: true })[0];
    var activePolicy = (0, useOnyx_1.default)("".concat(ONYXKEYS_1.default.COLLECTION.POLICY).concat(activePolicyID), { canBeMissing: true })[0];
    var session = (0, useOnyx_1.default)(ONYXKEYS_1.default.SESSION, { canBeMissing: false, selector: sessionSelector })[0];
    var allTransactionDrafts = (0, useOnyx_1.default)(ONYXKEYS_1.default.COLLECTION.TRANSACTION_DRAFT, { canBeMissing: true })[0];
    var reportID = (0, react_1.useMemo)(function () { return (0, ReportUtils_1.generateReportID)(); }, []);
    var policyChatForActivePolicySelector = (0, react_1.useCallback)(function (reports) {
        var _a;
        if ((0, EmptyObject_1.isEmptyObject)(activePolicy) || !(activePolicy === null || activePolicy === void 0 ? void 0 : activePolicy.isPolicyExpenseChatEnabled)) {
            return undefined;
        }
        var policyChatsForActivePolicy = (0, ReportUtils_1.getWorkspaceChats)(activePolicyID, [(_a = session === null || session === void 0 ? void 0 : session.accountID) !== null && _a !== void 0 ? _a : CONST_1.default.DEFAULT_NUMBER_ID], reports);
        return policyChatsForActivePolicy.at(0);
    }, [activePolicy, activePolicyID, session === null || session === void 0 ? void 0 : session.accountID]);
    var policyChatForActivePolicy = (0, useOnyx_1.default)(ONYXKEYS_1.default.COLLECTION.REPORT, { canBeMissing: true, selector: policyChatForActivePolicySelector }, [policyChatForActivePolicySelector])[0];
    var onPress = function () {
        (0, interceptAnonymousUser_1.default)(function () {
            var _a;
            if ((policyChatForActivePolicy === null || policyChatForActivePolicy === void 0 ? void 0 : policyChatForActivePolicy.policyID) && (0, SubscriptionUtils_1.shouldRestrictUserBillableActions)(policyChatForActivePolicy.policyID)) {
                Navigation_1.default.navigate(ROUTES_1.default.RESTRICTED_ACTION.getRoute(policyChatForActivePolicy.policyID));
                return;
            }
            var quickActionReportID = (_a = policyChatForActivePolicy === null || policyChatForActivePolicy === void 0 ? void 0 : policyChatForActivePolicy.reportID) !== null && _a !== void 0 ? _a : reportID;
            Tab_1.default.setSelectedTab(CONST_1.default.TAB.IOU_REQUEST_TYPE, CONST_1.default.IOU.REQUEST_TYPE.SCAN);
            (0, IOU_1.startMoneyRequest)(CONST_1.default.IOU.TYPE.CREATE, quickActionReportID, CONST_1.default.IOU.REQUEST_TYPE.SCAN, !!(policyChatForActivePolicy === null || policyChatForActivePolicy === void 0 ? void 0 : policyChatForActivePolicy.reportID), undefined, allTransactionDrafts);
        });
    };
    return (<Pressable_1.PressableWithoutFeedback style={[
            styles.navigationTabBarFABItem,
            styles.ph0,
            // Prevent text selection on touch devices (e.g. on long press)
            (0, DeviceCapabilities_1.canUseTouchScreen)() && styles.userSelectNone,
            styles.floatingCameraButton,
        ]} accessibilityLabel={translate('sidebarScreen.fabScanReceiptExplained')} onPress={onPress} role={CONST_1.default.ROLE.BUTTON} testID="floating-camera-button">
            <react_native_1.View style={styles.floatingActionButton} testID="floating-camera-button-container">
                <Icon_1.default fill={textLight} src={icon} width={variables_1.default.iconSizeNormal} height={variables_1.default.iconSizeNormal}/>
            </react_native_1.View>
        </Pressable_1.PressableWithoutFeedback>);
}
BaseFloatingCameraButton.displayName = 'BaseFloatingCameraButton';
exports.default = BaseFloatingCameraButton;
