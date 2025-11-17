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
var DelegateNoAccessWrapper_1 = require("@components/DelegateNoAccessWrapper");
var HeaderWithBackButton_1 = require("@components/HeaderWithBackButton");
var ScreenWrapper_1 = require("@components/ScreenWrapper");
var SelectionListWithSections_1 = require("@components/SelectionListWithSections");
var UserListItem_1 = require("@components/SelectionListWithSections/UserListItem");
var useLocalize_1 = require("@hooks/useLocalize");
var useOnyx_1 = require("@hooks/useOnyx");
var useSearchSelector_1 = require("@hooks/useSearchSelector");
var useThemeStyles_1 = require("@hooks/useThemeStyles");
var Report_1 = require("@libs/actions/Report");
var Navigation_1 = require("@libs/Navigation/Navigation");
var OptionsListUtils_1 = require("@libs/OptionsListUtils");
var CONST_1 = require("@src/CONST");
var ONYXKEYS_1 = require("@src/ONYXKEYS");
var ROUTES_1 = require("@src/ROUTES");
function AddDelegatePage() {
    var _a;
    var translate = (0, useLocalize_1.default)().translate;
    var styles = (0, useThemeStyles_1.default)();
    var isSearchingForReports = (0, useOnyx_1.default)(ONYXKEYS_1.default.IS_SEARCHING_FOR_REPORTS, { initWithStoredValues: false, canBeMissing: true })[0];
    var account = (0, useOnyx_1.default)(ONYXKEYS_1.default.ACCOUNT, { canBeMissing: true })[0];
    var _b = (0, useOnyx_1.default)(ONYXKEYS_1.default.COUNTRY_CODE, { canBeMissing: false })[0], countryCode = _b === void 0 ? CONST_1.default.DEFAULT_COUNTRY_CODE : _b;
    var existingDelegates = (0, react_1.useMemo)(function () {
        var _a, _b, _c;
        return (_c = (_b = (_a = account === null || account === void 0 ? void 0 : account.delegatedAccess) === null || _a === void 0 ? void 0 : _a.delegates) === null || _b === void 0 ? void 0 : _b.reduce(function (prev, _a) {
            var email = _a.email;
            // eslint-disable-next-line no-param-reassign
            prev[email] = true;
            return prev;
        }, {})) !== null && _c !== void 0 ? _c : {};
    }, [(_a = account === null || account === void 0 ? void 0 : account.delegatedAccess) === null || _a === void 0 ? void 0 : _a.delegates]);
    var _c = (0, useSearchSelector_1.default)({
        selectionMode: CONST_1.default.SEARCH_SELECTOR.SELECTION_MODE_SINGLE,
        searchContext: CONST_1.default.SEARCH_SELECTOR.SEARCH_CONTEXT_GENERAL,
        includeUserToInvite: true,
        excludeLogins: __assign(__assign({}, CONST_1.default.EXPENSIFY_EMAILS_OBJECT), existingDelegates),
        includeRecentReports: true,
        maxRecentReportsToShow: CONST_1.default.IOU.MAX_RECENT_REPORTS_TO_SHOW,
        onSingleSelect: function (option) {
            var _a;
            Navigation_1.default.navigate(ROUTES_1.default.SETTINGS_DELEGATE_ROLE.getRoute((_a = option.login) !== null && _a !== void 0 ? _a : ''));
        },
    }), searchTerm = _c.searchTerm, debouncedSearchTerm = _c.debouncedSearchTerm, setSearchTerm = _c.setSearchTerm, availableOptions = _c.availableOptions, areOptionsInitialized = _c.areOptionsInitialized, toggleSelection = _c.toggleSelection;
    var headerMessage = (0, react_1.useMemo)(function () {
        var _a, _b;
        return (0, OptionsListUtils_1.getHeaderMessage)((((_a = availableOptions.recentReports) === null || _a === void 0 ? void 0 : _a.length) || 0) + (((_b = availableOptions.personalDetails) === null || _b === void 0 ? void 0 : _b.length) || 0) !== 0, !!availableOptions.userToInvite, debouncedSearchTerm, countryCode);
    }, [availableOptions, debouncedSearchTerm, countryCode]);
    var sections = (0, react_1.useMemo)(function () {
        var _a, _b;
        var sectionsList = [];
        sectionsList.push({
            title: translate('common.recents'),
            data: availableOptions.recentReports,
            shouldShow: ((_a = availableOptions.recentReports) === null || _a === void 0 ? void 0 : _a.length) > 0,
        });
        sectionsList.push({
            title: translate('common.contacts'),
            data: availableOptions.personalDetails,
            shouldShow: ((_b = availableOptions.personalDetails) === null || _b === void 0 ? void 0 : _b.length) > 0,
        });
        if (availableOptions.userToInvite) {
            sectionsList.push({
                title: undefined,
                data: [availableOptions.userToInvite],
                shouldShow: true,
            });
        }
        return sectionsList.map(function (section) { return (__assign(__assign({}, section), { data: section.data.map(function (option) {
                var _a, _b, _c, _d, _e, _f;
                return (__assign(__assign({}, option), { text: (_a = option.text) !== null && _a !== void 0 ? _a : '', alternateText: (_b = option.alternateText) !== null && _b !== void 0 ? _b : undefined, keyForList: (_c = option.keyForList) !== null && _c !== void 0 ? _c : '', isDisabled: (_d = option.isDisabled) !== null && _d !== void 0 ? _d : undefined, login: (_e = option.login) !== null && _e !== void 0 ? _e : undefined, shouldShowSubscript: (_f = option.shouldShowSubscript) !== null && _f !== void 0 ? _f : undefined }));
            }) })); });
    }, [availableOptions, translate]);
    (0, react_1.useEffect)(function () {
        (0, Report_1.searchInServer)(debouncedSearchTerm);
    }, [debouncedSearchTerm]);
    return (<ScreenWrapper_1.default includeSafeAreaPaddingBottom={false} testID={AddDelegatePage.displayName}>
            <DelegateNoAccessWrapper_1.default accessDeniedVariants={[CONST_1.default.DELEGATE.DENIED_ACCESS_VARIANTS.DELEGATE]}>
                <HeaderWithBackButton_1.default title={translate('delegate.addCopilot')} onBackButtonPress={function () { return Navigation_1.default.goBack(); }}/>
                <react_native_1.View style={[styles.flex1, styles.w100, styles.pRelative]}>
                    <SelectionListWithSections_1.default sections={areOptionsInitialized ? sections : []} ListItem={UserListItem_1.default} onSelectRow={toggleSelection} shouldSingleExecuteRowSelect onChangeText={setSearchTerm} textInputValue={searchTerm} headerMessage={headerMessage} textInputLabel={translate('selectionList.nameEmailOrPhoneNumber')} showLoadingPlaceholder={!areOptionsInitialized} isLoadingNewOptions={!!isSearchingForReports}/>
                </react_native_1.View>
            </DelegateNoAccessWrapper_1.default>
        </ScreenWrapper_1.default>);
}
AddDelegatePage.displayName = 'AddDelegatePage';
exports.default = AddDelegatePage;
