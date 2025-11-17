"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var FullscreenLoadingIndicator_1 = require("@components/FullscreenLoadingIndicator");
var HeaderWithBackButton_1 = require("@components/HeaderWithBackButton");
var OnyxListItemProvider_1 = require("@components/OnyxListItemProvider");
var ScreenWrapper_1 = require("@components/ScreenWrapper");
var SelectionListWithSections_1 = require("@components/SelectionListWithSections");
var UserListItem_1 = require("@components/SelectionListWithSections/UserListItem");
var useDebouncedState_1 = require("@hooks/useDebouncedState");
var useLocalize_1 = require("@hooks/useLocalize");
var useNetwork_1 = require("@hooks/useNetwork");
var useOnyx_1 = require("@hooks/useOnyx");
var useThemeStyles_1 = require("@hooks/useThemeStyles");
var useWorkspaceList_1 = require("@hooks/useWorkspaceList");
var Log_1 = require("@libs/Log");
var Navigation_1 = require("@libs/Navigation/Navigation");
var PolicyUtils_1 = require("@libs/PolicyUtils");
var User_1 = require("@userActions/User");
var ONYXKEYS_1 = require("@src/ONYXKEYS");
function SetDefaultWorkspacePage(_a) {
    var _b;
    var route = _a.route;
    var navigateTo = ((_b = route.params) !== null && _b !== void 0 ? _b : {}).navigateTo;
    var isOffline = (0, useNetwork_1.default)().isOffline;
    var styles = (0, useThemeStyles_1.default)();
    var _c = (0, useDebouncedState_1.default)(''), searchTerm = _c[0], debouncedSearchTerm = _c[1], setSearchTerm = _c[2];
    var _d = (0, useLocalize_1.default)(), translate = _d.translate, localeCompare = _d.localeCompare;
    var _e = (0, useOnyx_1.default)(ONYXKEYS_1.default.COLLECTION.POLICY, { canBeMissing: false }), policies = _e[0], fetchStatus = _e[1];
    var isLoadingApp = (0, useOnyx_1.default)(ONYXKEYS_1.default.IS_LOADING_APP, { canBeMissing: false })[0];
    var activePolicyID = (0, useOnyx_1.default)(ONYXKEYS_1.default.NVP_ACTIVE_POLICY_ID, { canBeMissing: false })[0];
    var shouldShowLoadingIndicator = isLoadingApp && !isOffline;
    var session = (0, OnyxListItemProvider_1.useSession)();
    var selectPolicy = function (selectedPolicyID) {
        if (!selectedPolicyID) {
            return;
        }
        if (!navigateTo) {
            Log_1.default.hmmm("[SetDefaultWorkspacePage] navigateTo is undefined. Cannot navigate after setting default workspace to ".concat(selectedPolicyID));
            return;
        }
        var policy = policies === null || policies === void 0 ? void 0 : policies["".concat(ONYXKEYS_1.default.COLLECTION.POLICY).concat(selectedPolicyID)];
        // eslint-disable-next-line rulesdir/no-default-id-values
        (0, User_1.setNameValuePair)(ONYXKEYS_1.default.NVP_ACTIVE_POLICY_ID, selectedPolicyID, activePolicyID !== null && activePolicyID !== void 0 ? activePolicyID : '');
        if (policy === null || policy === void 0 ? void 0 : policy.areCategoriesEnabled) {
            Navigation_1.default.navigate(navigateTo);
            return;
        }
        Navigation_1.default.goBack();
    };
    var _f = (0, useWorkspaceList_1.default)({
        policies: policies,
        currentUserLogin: session === null || session === void 0 ? void 0 : session.email,
        shouldShowPendingDeletePolicy: false,
        selectedPolicyIDs: undefined,
        searchTerm: debouncedSearchTerm,
        localeCompare: localeCompare,
        additionalFilter: function (newPolicy) { return (0, PolicyUtils_1.isPaidGroupPolicy)(newPolicy); },
    }), sections = _f.sections, shouldShowNoResultsFoundMessage = _f.shouldShowNoResultsFoundMessage, shouldShowSearchInput = _f.shouldShowSearchInput;
    return (<ScreenWrapper_1.default testID={SetDefaultWorkspacePage.displayName} includeSafeAreaPaddingBottom shouldEnableMaxHeight>
            {function (_a) {
            var didScreenTransitionEnd = _a.didScreenTransitionEnd;
            return (<>
                    <HeaderWithBackButton_1.default title={translate('workspace.common.setAsDefault')} onBackButtonPress={Navigation_1.default.goBack}/>
                    {shouldShowLoadingIndicator ? (<FullscreenLoadingIndicator_1.default style={[styles.flex1, styles.pRelative]}/>) : (<SelectionListWithSections_1.default ListItem={UserListItem_1.default} sections={sections} onSelectRow={function (option) { return selectPolicy(option.policyID); }} textInputLabel={shouldShowSearchInput ? translate('common.search') : undefined} textInputValue={searchTerm} onChangeText={setSearchTerm} headerMessage={shouldShowNoResultsFoundMessage ? translate('common.noResultsFound') : ''} showLoadingPlaceholder={fetchStatus.status === 'loading' || !didScreenTransitionEnd}/>)}
                </>);
        }}
        </ScreenWrapper_1.default>);
}
SetDefaultWorkspacePage.displayName = 'SetDefaultWorkspacePage';
exports.default = SetDefaultWorkspacePage;
