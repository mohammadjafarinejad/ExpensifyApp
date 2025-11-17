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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var OptionListContextProvider_1 = require("@components/OptionListContextProvider");
var SelectionListWithSections_1 = require("@components/SelectionListWithSections");
var InviteMemberListItem_1 = require("@components/SelectionListWithSections/InviteMemberListItem");
var useDebouncedState_1 = require("@hooks/useDebouncedState");
var useLocalize_1 = require("@hooks/useLocalize");
var useNetwork_1 = require("@hooks/useNetwork");
var useOnyx_1 = require("@hooks/useOnyx");
var useScreenWrapperTransitionStatus_1 = require("@hooks/useScreenWrapperTransitionStatus");
var useThemeStyles_1 = require("@hooks/useThemeStyles");
var Report_1 = require("@libs/actions/Report");
var Share_1 = require("@libs/actions/Share");
var Navigation_1 = require("@libs/Navigation/Navigation");
var OptionsListUtils_1 = require("@libs/OptionsListUtils");
var StringUtils_1 = require("@libs/StringUtils");
var CONST_1 = require("@src/CONST");
var ONYXKEYS_1 = require("@src/ONYXKEYS");
var ROUTES_1 = require("@src/ROUTES");
var defaultListOptions = {
    userToInvite: null,
    recentReports: [],
    personalDetails: [],
    currentUserOption: null,
    categoryOptions: [],
};
function ShareTab(_a) {
    var ref = _a.ref;
    var styles = (0, useThemeStyles_1.default)();
    var translate = (0, useLocalize_1.default)().translate;
    var isOffline = (0, useNetwork_1.default)().isOffline;
    var _b = (0, useDebouncedState_1.default)(''), textInputValue = _b[0], debouncedTextInputValue = _b[1], setTextInputValue = _b[2];
    var betas = (0, useOnyx_1.default)(ONYXKEYS_1.default.BETAS, { canBeMissing: true })[0];
    var selectionListRef = (0, react_1.useRef)(null);
    var _c = (0, useOnyx_1.default)(ONYXKEYS_1.default.COUNTRY_CODE, { canBeMissing: false })[0], countryCode = _c === void 0 ? CONST_1.default.DEFAULT_COUNTRY_CODE : _c;
    var draftComments = (0, useOnyx_1.default)(ONYXKEYS_1.default.COLLECTION.REPORT_DRAFT_COMMENT, { canBeMissing: true })[0];
    var nvpDismissedProductTraining = (0, useOnyx_1.default)(ONYXKEYS_1.default.NVP_DISMISSED_PRODUCT_TRAINING, { canBeMissing: true })[0];
    (0, react_1.useImperativeHandle)(ref, function () {
        var _a;
        return ({
            focus: (_a = selectionListRef.current) === null || _a === void 0 ? void 0 : _a.focusTextInput,
        });
    });
    var _d = (0, OptionListContextProvider_1.useOptionsList)(), options = _d.options, areOptionsInitialized = _d.areOptionsInitialized;
    var didScreenTransitionEnd = (0, useScreenWrapperTransitionStatus_1.default)().didScreenTransitionEnd;
    var isSearchingForReports = (0, useOnyx_1.default)(ONYXKEYS_1.default.IS_SEARCHING_FOR_REPORTS, { initWithStoredValues: false, canBeMissing: true })[0];
    var offlineMessage = isOffline ? "".concat(translate('common.youAppearToBeOffline'), " ").concat(translate('search.resultsAreLimited')) : '';
    var showLoadingPlaceholder = (0, react_1.useMemo)(function () { return !areOptionsInitialized || !didScreenTransitionEnd; }, [areOptionsInitialized, didScreenTransitionEnd]);
    var searchOptions = (0, react_1.useMemo)(function () {
        if (!areOptionsInitialized) {
            return defaultListOptions;
        }
        return (0, OptionsListUtils_1.getSearchOptions)({
            options: options,
            draftComments: draftComments,
            nvpDismissedProductTraining: nvpDismissedProductTraining,
            betas: betas !== null && betas !== void 0 ? betas : [],
            isUsedInChatFinder: false,
            includeReadOnly: false,
            searchQuery: textInputValue,
            maxResults: 20,
            includeUserToInvite: true,
            countryCode: countryCode,
        });
    }, [areOptionsInitialized, betas, draftComments, nvpDismissedProductTraining, options, textInputValue, countryCode]);
    var recentReportsOptions = (0, react_1.useMemo)(function () {
        if (textInputValue.trim() === '') {
            return (0, OptionsListUtils_1.optionsOrderBy)(searchOptions.recentReports, OptionsListUtils_1.recentReportComparator, 20);
        }
        var orderedOptions = (0, OptionsListUtils_1.combineOrderingOfReportsAndPersonalDetails)(searchOptions, textInputValue, {
            sortByReportTypeInSearch: true,
            preferChatRoomsOverThreads: true,
        });
        var reportOptions = __spreadArray(__spreadArray([], orderedOptions.recentReports, true), orderedOptions.personalDetails, true);
        if (searchOptions.userToInvite) {
            reportOptions.push(searchOptions.userToInvite);
        }
        return reportOptions.slice(0, 20);
    }, [searchOptions, textInputValue]);
    (0, react_1.useEffect)(function () {
        (0, Report_1.searchInServer)(debouncedTextInputValue.trim());
    }, [debouncedTextInputValue]);
    var styledRecentReports = recentReportsOptions.map(function (item) { return (__assign(__assign({}, item), { pressableStyle: styles.br2, text: StringUtils_1.default.lineBreaksToSpaces(item.text), wrapperStyle: [styles.pr3, styles.pl3] })); });
    var _e = (0, react_1.useMemo)(function () {
        var newSections = [];
        newSections.push({ title: textInputValue.trim() === '' ? translate('search.recentChats') : undefined, data: styledRecentReports });
        var headerMessage = (0, OptionsListUtils_1.getHeaderMessage)(styledRecentReports.length !== 0, false, textInputValue.trim(), countryCode, false);
        return [newSections, headerMessage];
    }, [textInputValue, styledRecentReports, translate, countryCode]), sections = _e[0], header = _e[1];
    var onSelectRow = function (item) {
        var _a;
        var reportID = (_a = item === null || item === void 0 ? void 0 : item.reportID) !== null && _a !== void 0 ? _a : CONST_1.default.DEFAULT_NUMBER_ID;
        var accountID = item === null || item === void 0 ? void 0 : item.accountID;
        if (accountID && !reportID) {
            (0, Share_1.saveUnknownUserDetails)(item);
            var optimisticReport = (0, Report_1.getOptimisticChatReport)(accountID);
            reportID = optimisticReport.reportID;
            (0, Report_1.saveReportDraft)(reportID, optimisticReport).then(function () {
                Navigation_1.default.navigate(ROUTES_1.default.SHARE_DETAILS.getRoute(reportID.toString()));
            });
        }
        else {
            (0, Share_1.clearUnknownUserDetails)();
            Navigation_1.default.navigate(ROUTES_1.default.SHARE_DETAILS.getRoute(reportID.toString()));
        }
    };
    return (<SelectionListWithSections_1.default sections={areOptionsInitialized ? sections : CONST_1.default.EMPTY_ARRAY} textInputValue={textInputValue} textInputLabel={translate('selectionList.nameEmailOrPhoneNumber')} textInputHint={offlineMessage} onChangeText={setTextInputValue} headerMessage={header} sectionListStyle={[styles.ph2, styles.pb2, styles.overscrollBehaviorContain]} ListItem={InviteMemberListItem_1.default} showLoadingPlaceholder={showLoadingPlaceholder} shouldSingleExecuteRowSelect onSelectRow={onSelectRow} isLoadingNewOptions={!!isSearchingForReports} textInputAutoFocus={false} ref={selectionListRef}/>);
}
exports.default = ShareTab;
