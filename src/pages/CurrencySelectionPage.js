"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_native_1 = require("react-native");
var CurrencySelectionList_1 = require("@components/CurrencySelectionList");
var HeaderWithBackButton_1 = require("@components/HeaderWithBackButton");
var ScreenWrapper_1 = require("@components/ScreenWrapper");
var useCurrentUserPersonalDetails_1 = require("@hooks/useCurrentUserPersonalDetails");
var useLocalize_1 = require("@hooks/useLocalize");
var useOnyx_1 = require("@hooks/useOnyx");
var useThemeStyles_1 = require("@hooks/useThemeStyles");
var Policy_1 = require("@libs/actions/Policy/Policy");
var Navigation_1 = require("@libs/Navigation/Navigation");
var CONST_1 = require("@src/CONST");
var ONYXKEYS_1 = require("@src/ONYXKEYS");
function CurrencySelectionPage(_a) {
    var _b, _c, _d;
    var route = _a.route;
    var styles = (0, useThemeStyles_1.default)();
    var translate = (0, useLocalize_1.default)().translate;
    var currentUserPersonalDetails = (0, useCurrentUserPersonalDetails_1.default)();
    var workspaceConfirmationFormDraft = (0, useOnyx_1.default)(ONYXKEYS_1.default.FORMS.WORKSPACE_CONFIRMATION_FORM_DRAFT, { canBeMissing: true })[0];
    var value = (_c = (_b = workspaceConfirmationFormDraft === null || workspaceConfirmationFormDraft === void 0 ? void 0 : workspaceConfirmationFormDraft.currency) !== null && _b !== void 0 ? _b : currentUserPersonalDetails === null || currentUserPersonalDetails === void 0 ? void 0 : currentUserPersonalDetails.localCurrencyCode) !== null && _c !== void 0 ? _c : CONST_1.default.CURRENCY.USD;
    var goBack = (0, react_1.useCallback)(function () {
        var _a;
        var backTo = (_a = route === null || route === void 0 ? void 0 : route.params) === null || _a === void 0 ? void 0 : _a.backTo;
        Navigation_1.default.goBack(backTo);
    }, [(_d = route === null || route === void 0 ? void 0 : route.params) === null || _d === void 0 ? void 0 : _d.backTo]);
    var onSelect = (0, react_1.useCallback)(function (option) {
        (0, Policy_1.setWorkspaceConfirmationCurrency)(option.currencyCode);
        goBack();
    }, [goBack]);
    return (<ScreenWrapper_1.default testID={CurrencySelectionPage.displayName}>
            <HeaderWithBackButton_1.default title={translate('workspace.editor.currencyInputLabel')} onBackButtonPress={goBack}/>
            <react_native_1.View style={styles.flex1}>
                <CurrencySelectionList_1.default onSelect={onSelect} searchInputLabel={translate('common.search')} initiallySelectedCurrencyCode={value}/>
            </react_native_1.View>
        </ScreenWrapper_1.default>);
}
CurrencySelectionPage.displayName = 'CurrencySelectionPage';
exports.default = CurrencySelectionPage;
