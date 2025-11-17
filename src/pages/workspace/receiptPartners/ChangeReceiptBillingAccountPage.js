"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var HeaderWithBackButton_1 = require("@components/HeaderWithBackButton");
var Expensicons = require("@components/Icon/Expensicons");
var ScreenWrapper_1 = require("@components/ScreenWrapper");
var SelectionListWithSections_1 = require("@components/SelectionListWithSections");
var InviteMemberListItem_1 = require("@components/SelectionListWithSections/InviteMemberListItem");
var Text_1 = require("@components/Text");
var useDebouncedState_1 = require("@hooks/useDebouncedState");
var useLocalize_1 = require("@hooks/useLocalize");
var useNetwork_1 = require("@hooks/useNetwork");
var useOnyx_1 = require("@hooks/useOnyx");
var usePolicy_1 = require("@hooks/usePolicy");
var useThemeStyles_1 = require("@hooks/useThemeStyles");
var Policy_1 = require("@libs/actions/Policy/Policy");
var DeviceCapabilities_1 = require("@libs/DeviceCapabilities");
var LocalePhoneNumber_1 = require("@libs/LocalePhoneNumber");
var Navigation_1 = require("@libs/Navigation/Navigation");
var OptionsListUtils_1 = require("@libs/OptionsListUtils");
var PersonalDetailsUtils_1 = require("@libs/PersonalDetailsUtils");
var PolicyUtils_1 = require("@libs/PolicyUtils");
var tokenizedSearch_1 = require("@libs/tokenizedSearch");
var AccessOrNotFoundWrapper_1 = require("@pages/workspace/AccessOrNotFoundWrapper");
var CONST_1 = require("@src/CONST");
var ONYXKEYS_1 = require("@src/ONYXKEYS");
function ChangeReceiptBillingAccountPage(_a) {
    var _b, _c, _d;
    var route = _a.route;
    var styles = (0, useThemeStyles_1.default)();
    var _e = (0, useLocalize_1.default)(), translate = _e.translate, localeCompare = _e.localeCompare;
    var isOffline = (0, useNetwork_1.default)().isOffline;
    var _f = (0, useDebouncedState_1.default)(''), searchTerm = _f[0], debouncedSearchTerm = _f[1], setSearchTerm = _f[2];
    var _g = (0, react_1.useState)(''), selectedOption = _g[0], setSelectedOption = _g[1];
    var _h = (0, useOnyx_1.default)(ONYXKEYS_1.default.COUNTRY_CODE, { canBeMissing: false })[0], countryCode = _h === void 0 ? CONST_1.default.DEFAULT_COUNTRY_CODE : _h;
    var policyID = (_b = route.params) === null || _b === void 0 ? void 0 : _b.policyID;
    var integration = (_c = route.params) === null || _c === void 0 ? void 0 : _c.integration;
    var policy = (0, usePolicy_1.default)(policyID);
    var integrations = policy === null || policy === void 0 ? void 0 : policy.receiptPartners;
    var centralBillingAccountEmail = integration ? (_d = integrations === null || integrations === void 0 ? void 0 : integrations[integration]) === null || _d === void 0 ? void 0 : _d.centralBillingAccountEmail : undefined;
    var shouldShowTextInput = (policy === null || policy === void 0 ? void 0 : policy.employeeList) && Object.keys(policy.employeeList).length >= CONST_1.default.STANDARD_LIST_ITEM_LIMIT;
    var textInputLabel = shouldShowTextInput ? translate('common.search') : undefined;
    var workspaceMembers = (0, react_1.useMemo)(function () {
        var membersList = [];
        if (!(policy === null || policy === void 0 ? void 0 : policy.employeeList)) {
            return membersList;
        }
        Object.entries(policy.employeeList).forEach(function (_a) {
            var _b, _c;
            var email = _a[0], policyEmployee = _a[1];
            if ((0, PolicyUtils_1.isDeletedPolicyEmployee)(policyEmployee, isOffline)) {
                return;
            }
            var personalDetail = (0, PersonalDetailsUtils_1.getPersonalDetailByEmail)(email);
            if (personalDetail) {
                var memberForList = (0, OptionsListUtils_1.formatMemberForList)({
                    text: (_b = personalDetail === null || personalDetail === void 0 ? void 0 : personalDetail.displayName) !== null && _b !== void 0 ? _b : email,
                    alternateText: email,
                    login: email,
                    accountID: personalDetail === null || personalDetail === void 0 ? void 0 : personalDetail.accountID,
                    icons: [
                        {
                            source: (_c = personalDetail === null || personalDetail === void 0 ? void 0 : personalDetail.avatar) !== null && _c !== void 0 ? _c : Expensicons.FallbackAvatar,
                            name: (0, LocalePhoneNumber_1.formatPhoneNumber)(email),
                            type: CONST_1.default.ICON_TYPE_AVATAR,
                            id: personalDetail === null || personalDetail === void 0 ? void 0 : personalDetail.accountID,
                        },
                    ],
                    reportID: '',
                    keyForList: email,
                    isSelected: email === selectedOption || (personalDetail === null || personalDetail === void 0 ? void 0 : personalDetail.login) === selectedOption,
                });
                membersList.push(memberForList);
            }
        });
        membersList = (0, OptionsListUtils_1.sortAlphabetically)(membersList, 'text', localeCompare);
        return membersList;
    }, [isOffline, policy === null || policy === void 0 ? void 0 : policy.employeeList, localeCompare, selectedOption]);
    var sections = (0, react_1.useMemo)(function () {
        if (workspaceMembers.length === 0) {
            return [];
        }
        var membersToDisplay = workspaceMembers;
        // Apply search filter if there's a search term
        if (debouncedSearchTerm) {
            var searchValue = (0, OptionsListUtils_1.getSearchValueForPhoneOrEmail)(debouncedSearchTerm, countryCode).toLowerCase();
            membersToDisplay = (0, tokenizedSearch_1.default)(workspaceMembers, searchValue, function (option) { var _a, _b; return [(_a = option.text) !== null && _a !== void 0 ? _a : '', (_b = option.alternateText) !== null && _b !== void 0 ? _b : '']; });
        }
        return [
            {
                title: undefined,
                data: membersToDisplay,
                shouldShow: true,
            },
        ];
    }, [workspaceMembers, countryCode, debouncedSearchTerm]);
    (0, react_1.useEffect)(function () {
        if (!centralBillingAccountEmail) {
            return;
        }
        setSelectedOption(centralBillingAccountEmail);
    }, [centralBillingAccountEmail]);
    var toggleOption = (0, react_1.useCallback)(function (option) {
        if (!centralBillingAccountEmail) {
            return;
        }
        setSelectedOption(option.login);
        (0, Policy_1.changePolicyUberBillingAccount)(policyID, option.login, centralBillingAccountEmail);
        Navigation_1.default.goBack();
    }, [policyID, centralBillingAccountEmail]);
    var headerMessage = (0, react_1.useMemo)(function () {
        var _a;
        var searchValue = debouncedSearchTerm.trim().toLowerCase();
        return (0, OptionsListUtils_1.getHeaderMessage)(((_a = sections === null || sections === void 0 ? void 0 : sections.at(0)) === null || _a === void 0 ? void 0 : _a.data.length) !== 0, false, searchValue, countryCode);
    }, [debouncedSearchTerm, sections, countryCode]);
    return (<AccessOrNotFoundWrapper_1.default accessVariants={[CONST_1.default.POLICY.ACCESS_VARIANTS.ADMIN]} policyID={policyID} featureName={CONST_1.default.POLICY.MORE_FEATURES.ARE_RECEIPT_PARTNERS_ENABLED}>
            <ScreenWrapper_1.default testID={ChangeReceiptBillingAccountPage.displayName}>
                <HeaderWithBackButton_1.default title={translate('workspace.receiptPartners.uber.centralBillingAccount')}/>
                <Text_1.default style={[styles.ph5, styles.pb3]}>{translate('workspace.receiptPartners.uber.centralBillingDescription')}</Text_1.default>
                <SelectionListWithSections_1.default sections={sections} ListItem={InviteMemberListItem_1.default} textInputLabel={textInputLabel} textInputValue={searchTerm} onChangeText={setSearchTerm} headerMessage={headerMessage} onSelectRow={toggleOption} showScrollIndicator shouldPreventDefaultFocusOnSelectRow={!(0, DeviceCapabilities_1.canUseTouchScreen)()} initiallyFocusedOptionKey={centralBillingAccountEmail} shouldUpdateFocusedIndex shouldShowTextInput={shouldShowTextInput} addBottomSafeAreaPadding/>
            </ScreenWrapper_1.default>
        </AccessOrNotFoundWrapper_1.default>);
}
ChangeReceiptBillingAccountPage.displayName = 'ChangeReceiptBillingAccountPage';
exports.default = ChangeReceiptBillingAccountPage;
