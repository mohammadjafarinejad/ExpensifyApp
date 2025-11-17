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
var useDebouncedState_1 = require("@hooks/useDebouncedState");
var useLocalize_1 = require("@hooks/useLocalize");
var useOnyx_1 = require("@hooks/useOnyx");
var useThemeStyles_1 = require("@hooks/useThemeStyles");
var DeviceCapabilities_1 = require("@libs/DeviceCapabilities");
var OptionsListUtils_1 = require("@libs/OptionsListUtils");
var PolicyUtils_1 = require("@libs/PolicyUtils");
var tokenizedSearch_1 = require("@libs/tokenizedSearch");
var variables_1 = require("@styles/variables");
var CONST_1 = require("@src/CONST");
var ONYXKEYS_1 = require("@src/ONYXKEYS");
var EmptyObject_1 = require("@src/types/utils/EmptyObject");
var BlockingView_1 = require("./BlockingViews/BlockingView");
var FullPageNotFoundView_1 = require("./BlockingViews/FullPageNotFoundView");
var HeaderWithBackButton_1 = require("./HeaderWithBackButton");
var Illustrations = require("./Icon/Illustrations");
var ScreenWrapper_1 = require("./ScreenWrapper");
var SelectionListWithSections_1 = require("./SelectionListWithSections");
var InviteMemberListItem_1 = require("./SelectionListWithSections/InviteMemberListItem");
function ApproverSelectionList(_a) {
    var _b;
    var testID = _a.testID, headerTitle = _a.headerTitle, subtitle = _a.subtitle, isLoadingReportData = _a.isLoadingReportData, policy = _a.policy, onBackButtonPress = _a.onBackButtonPress, initiallyFocusedOptionKey = _a.initiallyFocusedOptionKey, shouldShowTextInputProp = _a.shouldShowTextInput, _c = _a.shouldShowNotFoundView, shouldShowNotFoundViewProp = _c === void 0 ? false : _c, _d = _a.shouldShowNotFoundViewLink, shouldShowNotFoundViewLink = _d === void 0 ? true : _d, listEmptyContentSubtitle = _a.listEmptyContentSubtitle, _e = _a.footerContent, footerContent = _e === void 0 ? null : _e, allApprovers = _a.allApprovers, _f = _a.shouldShowListEmptyContent, shouldShowListEmptyContentProp = _f === void 0 ? true : _f, _g = _a.allowMultipleSelection, allowMultipleSelection = _g === void 0 ? false : _g, onSelectApprover = _a.onSelectApprover, shouldShowLoadingPlaceholder = _a.shouldShowLoadingPlaceholder, shouldEnableHeaderMaxHeight = _a.shouldEnableHeaderMaxHeight;
    var styles = (0, useThemeStyles_1.default)();
    var _h = (0, useLocalize_1.default)(), translate = _h.translate, localeCompare = _h.localeCompare;
    var _j = (0, useDebouncedState_1.default)(''), searchTerm = _j[0], debouncedSearchTerm = _j[1], setSearchTerm = _j[2];
    var _k = (0, useOnyx_1.default)(ONYXKEYS_1.default.COUNTRY_CODE, { canBeMissing: false })[0], countryCode = _k === void 0 ? CONST_1.default.DEFAULT_COUNTRY_CODE : _k;
    var shouldShowTextInput = shouldShowTextInputProp !== null && shouldShowTextInputProp !== void 0 ? shouldShowTextInputProp : (allApprovers === null || allApprovers === void 0 ? void 0 : allApprovers.length) >= CONST_1.default.STANDARD_LIST_ITEM_LIMIT;
    var _l = (0, react_1.useState)([]), selectedMembers = _l[0], setSelectedMembers = _l[1];
    // eslint-disable-next-line rulesdir/no-negated-variables
    var shouldShowNotFoundView = ((0, EmptyObject_1.isEmptyObject)(policy) && !isLoadingReportData) || !(0, PolicyUtils_1.isPolicyAdmin)(policy) || (0, PolicyUtils_1.isPendingDeletePolicy)(policy) || shouldShowNotFoundViewProp;
    var sections = (0, react_1.useMemo)(function () {
        var filteredApprovers = debouncedSearchTerm !== ''
            ? (0, tokenizedSearch_1.default)(allApprovers, (0, OptionsListUtils_1.getSearchValueForPhoneOrEmail)(debouncedSearchTerm, countryCode), function (option) { var _a, _b; return [(_a = option.text) !== null && _a !== void 0 ? _a : '', (_b = option.login) !== null && _b !== void 0 ? _b : '']; })
            : allApprovers;
        var data = (0, OptionsListUtils_1.sortAlphabetically)(filteredApprovers, 'text', localeCompare);
        return [
            {
                title: undefined,
                data: data,
                shouldShow: true,
            },
        ];
    }, [allApprovers, debouncedSearchTerm, countryCode, localeCompare]);
    var shouldShowListEmptyContent = !debouncedSearchTerm && !((_b = sections.at(0)) === null || _b === void 0 ? void 0 : _b.data.length) && shouldShowListEmptyContentProp;
    var toggleApprover = function (member) {
        var isAlreadySelected = selectedMembers.some(function (selectedOption) { return selectedOption.login === member.login; });
        var newSelectedApprovers = [];
        if (!allowMultipleSelection) {
            newSelectedApprovers = isAlreadySelected ? [] : [__assign(__assign({}, member), { isSelected: true })];
        }
        else {
            newSelectedApprovers = isAlreadySelected
                ? selectedMembers.filter(function (selectedOption) { return selectedOption.login !== member.login; })
                : __spreadArray(__spreadArray([], selectedMembers, true), [__assign(__assign({}, member), { isSelected: true })], false);
        }
        setSelectedMembers(newSelectedApprovers);
        if (onSelectApprover) {
            onSelectApprover(newSelectedApprovers);
        }
    };
    var headerMessage = (0, react_1.useMemo)(function () { var _a, _b; return (searchTerm && !((_b = (_a = sections.at(0)) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.length) ? translate('common.noResultsFound') : ''); }, [searchTerm, sections, translate]);
    var listEmptyContent = (0, react_1.useMemo)(function () { return (<BlockingView_1.default icon={Illustrations.TurtleInShell} iconWidth={variables_1.default.emptyListIconWidth} iconHeight={variables_1.default.emptyListIconHeight} title={translate('workflowsPage.emptyContent.title')} subtitle={listEmptyContentSubtitle} subtitleStyle={styles.textSupporting} containerStyle={styles.pb10} contentFitImage="contain"/>); }, [translate, listEmptyContentSubtitle, styles.textSupporting, styles.pb10]);
    return (<ScreenWrapper_1.default testID={testID} enableEdgeToEdgeBottomSafeAreaPadding shouldEnableMaxHeight={shouldEnableHeaderMaxHeight}>
            <FullPageNotFoundView_1.default shouldShow={shouldShowNotFoundView} subtitleKey={(0, EmptyObject_1.isEmptyObject)(policy) ? undefined : 'workspace.common.notAuthorized'} shouldShowLink={shouldShowNotFoundViewLink} onBackButtonPress={PolicyUtils_1.goBackFromInvalidPolicy} onLinkPress={PolicyUtils_1.goBackFromInvalidPolicy} addBottomSafeAreaPadding>
                <HeaderWithBackButton_1.default title={headerTitle} onBackButtonPress={onBackButtonPress}/>
                {subtitle}
                <SelectionListWithSections_1.default canSelectMultiple={allowMultipleSelection} sections={sections} ListItem={InviteMemberListItem_1.default} textInputLabel={shouldShowListEmptyContent ? undefined : translate('selectionList.findMember')} textInputValue={searchTerm} onChangeText={setSearchTerm} headerMessage={headerMessage} onSelectRow={toggleApprover} showScrollIndicator shouldPreventDefaultFocusOnSelectRow={!(0, DeviceCapabilities_1.canUseTouchScreen)()} listEmptyContent={listEmptyContent} shouldShowListEmptyContent={shouldShowListEmptyContent} initiallyFocusedOptionKey={initiallyFocusedOptionKey} shouldUpdateFocusedIndex shouldShowTextInput={shouldShowTextInput} addBottomSafeAreaPadding showLoadingPlaceholder={shouldShowLoadingPlaceholder} footerContent={footerContent}/>
            </FullPageNotFoundView_1.default>
        </ScreenWrapper_1.default>);
}
ApproverSelectionList.displayName = 'ApproverSelectionList';
exports.default = ApproverSelectionList;
