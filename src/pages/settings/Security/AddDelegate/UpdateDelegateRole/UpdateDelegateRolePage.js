"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var DelegateNoAccessWrapper_1 = require("@components/DelegateNoAccessWrapper");
var HeaderWithBackButton_1 = require("@components/HeaderWithBackButton");
var ScreenWrapper_1 = require("@components/ScreenWrapper");
var SelectionList_1 = require("@components/SelectionList");
var RadioListItem_1 = require("@components/SelectionList/ListItem/RadioListItem");
var Text_1 = require("@components/Text");
var TextLink_1 = require("@components/TextLink");
var useLocalize_1 = require("@hooks/useLocalize");
var useThemeStyles_1 = require("@hooks/useThemeStyles");
var Navigation_1 = require("@libs/Navigation/Navigation");
var CONST_1 = require("@src/CONST");
var ROUTES_1 = require("@src/ROUTES");
function UpdateDelegateRoleSelectionListHeader() {
    var styles = (0, useThemeStyles_1.default)();
    var translate = (0, useLocalize_1.default)().translate;
    return (<Text_1.default style={[styles.ph5, styles.pb5, styles.pt3]}>
            <>
                {translate('delegate.accessLevelDescription')}{' '}
                <TextLink_1.default style={[styles.link]} href={CONST_1.default.COPILOT_HELP_URL}>
                    {translate('common.learnMore')}
                </TextLink_1.default>
                .
            </>
        </Text_1.default>);
}
function UpdateDelegateRolePage(_a) {
    var route = _a.route;
    var translate = (0, useLocalize_1.default)().translate;
    var _b = route.params, currentRole = _b.currentRole, login = _b.login;
    var roleOptions = Object.values(CONST_1.default.DELEGATE_ROLE).map(function (role) { return ({
        value: role,
        text: translate('delegate.role', { role: role }),
        keyForList: role,
        alternateText: translate('delegate.roleDescription', { role: role }),
        isSelected: role === currentRole,
    }); });
    return (<ScreenWrapper_1.default includeSafeAreaPaddingBottom={false} testID={UpdateDelegateRolePage.displayName}>
            <DelegateNoAccessWrapper_1.default accessDeniedVariants={[CONST_1.default.DELEGATE.DENIED_ACCESS_VARIANTS.DELEGATE]}>
                <HeaderWithBackButton_1.default title={translate('delegate.accessLevel')} onBackButtonPress={function () { return Navigation_1.default.goBack(); }}/>
                <SelectionList_1.default alternateNumberOfSupportedLines={4} initiallyFocusedItemKey={currentRole} shouldUpdateFocusedIndex customListHeader={<UpdateDelegateRoleSelectionListHeader />} onSelectRow={function (option) {
            if (!option.value || option.isSelected) {
                Navigation_1.default.dismissModal();
                return;
            }
            Navigation_1.default.navigate(ROUTES_1.default.SETTINGS_UPDATE_DELEGATE_ROLE_CONFIRM_MAGIC_CODE.getRoute(login, option === null || option === void 0 ? void 0 : option.value));
        }} data={roleOptions} ListItem={RadioListItem_1.default}/>
            </DelegateNoAccessWrapper_1.default>
        </ScreenWrapper_1.default>);
}
UpdateDelegateRolePage.displayName = 'UpdateDelegateRolePage';
exports.default = UpdateDelegateRolePage;
