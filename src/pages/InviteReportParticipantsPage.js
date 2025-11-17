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
var native_1 = require("@react-navigation/native");
var react_1 = require("react");
var FormAlertWithSubmitButton_1 = require("@components/FormAlertWithSubmitButton");
var HeaderWithBackButton_1 = require("@components/HeaderWithBackButton");
var ScreenWrapper_1 = require("@components/ScreenWrapper");
var SelectionListWithSections_1 = require("@components/SelectionListWithSections");
var InviteMemberListItem_1 = require("@components/SelectionListWithSections/InviteMemberListItem");
var withNavigationTransitionEnd_1 = require("@components/withNavigationTransitionEnd");
var useLocalize_1 = require("@hooks/useLocalize");
var useOnyx_1 = require("@hooks/useOnyx");
var useSearchSelector_1 = require("@hooks/useSearchSelector");
var useThemeStyles_1 = require("@hooks/useThemeStyles");
var Report_1 = require("@libs/actions/Report");
var RoomMembersUserSearchPhrase_1 = require("@libs/actions/RoomMembersUserSearchPhrase");
var DeviceCapabilities_1 = require("@libs/DeviceCapabilities");
var LoginUtils_1 = require("@libs/LoginUtils");
var Navigation_1 = require("@libs/Navigation/Navigation");
var OptionsListUtils_1 = require("@libs/OptionsListUtils");
var PersonalDetailsUtils_1 = require("@libs/PersonalDetailsUtils");
var PhoneNumber_1 = require("@libs/PhoneNumber");
var ReportUtils_1 = require("@libs/ReportUtils");
var CONST_1 = require("@src/CONST");
var ONYXKEYS_1 = require("@src/ONYXKEYS");
var ROUTES_1 = require("@src/ROUTES");
var withReportOrNotFound_1 = require("./home/report/withReportOrNotFound");
function InviteReportParticipantsPage(_a) {
    var report = _a.report;
    var route = (0, native_1.useRoute)();
    var styles = (0, useThemeStyles_1.default)();
    var _b = (0, useLocalize_1.default)(), translate = _b.translate, formatPhoneNumber = _b.formatPhoneNumber;
    var _c = (0, useOnyx_1.default)(ONYXKEYS_1.default.COUNTRY_CODE, { canBeMissing: false })[0], countryCode = _c === void 0 ? CONST_1.default.DEFAULT_COUNTRY_CODE : _c;
    var _d = (0, react_1.useState)(false), didScreenTransitionEnd = _d[0], setDidScreenTransitionEnd = _d[1];
    // Any existing participants and Expensify emails should not be eligible for invitation
    var excludedUsers = (0, react_1.useMemo)(function () {
        var res = __assign({}, CONST_1.default.EXPENSIFY_EMAILS_OBJECT);
        var participantsAccountIDs = (0, ReportUtils_1.getParticipantsAccountIDsForDisplay)(report, false, true);
        var loginsByAccountIDs = (0, PersonalDetailsUtils_1.getLoginsByAccountIDs)(participantsAccountIDs);
        for (var _i = 0, loginsByAccountIDs_1 = loginsByAccountIDs; _i < loginsByAccountIDs_1.length; _i++) {
            var login = loginsByAccountIDs_1[_i];
            res[login] = true;
        }
        return res;
    }, [report]);
    var _e = (0, useSearchSelector_1.default)({
        selectionMode: CONST_1.default.SEARCH_SELECTOR.SELECTION_MODE_MULTI,
        searchContext: CONST_1.default.SEARCH_SELECTOR.SEARCH_CONTEXT_MEMBER_INVITE,
        includeUserToInvite: true,
        excludeLogins: excludedUsers,
        includeRecentReports: true,
        shouldInitialize: didScreenTransitionEnd,
    }), searchTerm = _e.searchTerm, setSearchTerm = _e.setSearchTerm, availableOptions = _e.availableOptions, selectedOptions = _e.selectedOptions, selectedOptionsForDisplay = _e.selectedOptionsForDisplay, toggleSelection = _e.toggleSelection, areOptionsInitialized = _e.areOptionsInitialized, onListEndReached = _e.onListEndReached;
    (0, react_1.useEffect)(function () {
        (0, RoomMembersUserSearchPhrase_1.updateUserSearchPhrase)(searchTerm);
        (0, Report_1.searchInServer)(searchTerm);
    }, [searchTerm]);
    var sections = (0, react_1.useMemo)(function () {
        var sectionsArray = [];
        if (!areOptionsInitialized) {
            return [];
        }
        // Selected options section
        if (selectedOptionsForDisplay.length > 0) {
            sectionsArray.push({
                title: undefined,
                data: selectedOptionsForDisplay,
            });
        }
        // Recent reports section
        if (availableOptions.recentReports.length > 0) {
            sectionsArray.push({
                title: translate('common.recents'),
                data: availableOptions.recentReports,
            });
        }
        // Contacts section
        if (availableOptions.personalDetails.length > 0) {
            sectionsArray.push({
                title: translate('common.contacts'),
                data: availableOptions.personalDetails,
            });
        }
        // User to invite section
        if (availableOptions.userToInvite) {
            sectionsArray.push({
                title: undefined,
                data: [availableOptions.userToInvite],
            });
        }
        return sectionsArray;
    }, [areOptionsInitialized, selectedOptionsForDisplay, availableOptions, translate]);
    var handleToggleSelection = (0, react_1.useCallback)(function (option) {
        toggleSelection(option);
    }, [toggleSelection]);
    var validate = (0, react_1.useCallback)(function () { return selectedOptions.length > 0; }, [selectedOptions]);
    var reportID = report.reportID;
    var reportName = (0, react_1.useMemo)(function () { return (0, ReportUtils_1.getGroupChatName)(undefined, true, report); }, [report]);
    var goBack = (0, react_1.useCallback)(function () {
        Navigation_1.default.goBack(ROUTES_1.default.REPORT_PARTICIPANTS.getRoute(reportID, route.params.backTo));
    }, [reportID, route.params.backTo]);
    var inviteUsers = (0, react_1.useCallback)(function () {
        if (!validate()) {
            return;
        }
        var invitedEmailsToAccountIDs = {};
        selectedOptions.forEach(function (option) {
            var _a;
            var login = (_a = option.login) !== null && _a !== void 0 ? _a : '';
            var accountID = option.accountID;
            if (!login.toLowerCase().trim() || !accountID) {
                return;
            }
            invitedEmailsToAccountIDs[login] = accountID;
        });
        (0, Report_1.inviteToGroupChat)(reportID, invitedEmailsToAccountIDs, formatPhoneNumber);
        goBack();
    }, [selectedOptions, goBack, reportID, validate, formatPhoneNumber]);
    var headerMessage = (0, react_1.useMemo)(function () {
        var processedLogin = searchTerm.trim().toLowerCase();
        var expensifyEmails = CONST_1.default.EXPENSIFY_EMAILS;
        if (!availableOptions.userToInvite && expensifyEmails.includes(processedLogin)) {
            return translate('messages.errorMessageInvalidEmail');
        }
        if (!availableOptions.userToInvite &&
            excludedUsers[(0, PhoneNumber_1.parsePhoneNumber)((0, LoginUtils_1.appendCountryCode)(processedLogin, countryCode)).possible ? (0, PhoneNumber_1.addSMSDomainIfPhoneNumber)((0, LoginUtils_1.appendCountryCode)(processedLogin, countryCode)) : processedLogin]) {
            return translate('messages.userIsAlreadyMember', { login: processedLogin, name: reportName !== null && reportName !== void 0 ? reportName : '' });
        }
        return (0, OptionsListUtils_1.getHeaderMessage)(selectedOptionsForDisplay.length + availableOptions.recentReports.length + availableOptions.personalDetails.length !== 0, !!availableOptions.userToInvite, processedLogin, countryCode, false);
    }, [searchTerm, availableOptions, selectedOptionsForDisplay, excludedUsers, translate, reportName, countryCode]);
    var footerContent = (0, react_1.useMemo)(function () { return (<FormAlertWithSubmitButton_1.default isDisabled={!selectedOptions.length} buttonText={translate('common.invite')} onSubmit={function () {
            (0, RoomMembersUserSearchPhrase_1.clearUserSearchPhrase)();
            inviteUsers();
        }} containerStyles={[styles.flexReset, styles.flexGrow0, styles.flexShrink0, styles.flexBasisAuto]} enabledWhenOffline/>); }, [selectedOptions.length, inviteUsers, translate, styles]);
    return (<ScreenWrapper_1.default shouldEnableMaxHeight testID={InviteReportParticipantsPage.displayName} onEntryTransitionEnd={function () { return setDidScreenTransitionEnd(true); }}>
            <HeaderWithBackButton_1.default title={translate('workspace.invite.members')} subtitle={reportName} onBackButtonPress={goBack}/>

            <SelectionListWithSections_1.default canSelectMultiple sections={sections} ListItem={InviteMemberListItem_1.default} textInputLabel={translate('selectionList.nameEmailOrPhoneNumber')} textInputValue={searchTerm} onChangeText={setSearchTerm} headerMessage={headerMessage} onSelectRow={handleToggleSelection} onConfirm={inviteUsers} showScrollIndicator shouldPreventDefaultFocusOnSelectRow={!(0, DeviceCapabilities_1.canUseTouchScreen)()} showLoadingPlaceholder={!areOptionsInitialized || !didScreenTransitionEnd} footerContent={footerContent} onEndReached={onListEndReached}/>
        </ScreenWrapper_1.default>);
}
InviteReportParticipantsPage.displayName = 'InviteReportParticipantsPage';
exports.default = (0, withNavigationTransitionEnd_1.default)((0, withReportOrNotFound_1.default)()(InviteReportParticipantsPage));
