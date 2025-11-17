"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_native_1 = require("react-native");
var react_native_reanimated_1 = require("react-native-reanimated");
var FormHelpMessage_1 = require("@components/FormHelpMessage");
var TextInput_1 = require("@components/TextInput");
var useCurrentUserPersonalDetails_1 = require("@hooks/useCurrentUserPersonalDetails");
var useFocusAfterNav_1 = require("@hooks/useFocusAfterNav");
var useLocalize_1 = require("@hooks/useLocalize");
var useNetwork_1 = require("@hooks/useNetwork");
var useOnyx_1 = require("@hooks/useOnyx");
var useTheme_1 = require("@hooks/useTheme");
var useThemeStyles_1 = require("@hooks/useThemeStyles");
var Search_1 = require("@libs/actions/Search");
var Navigation_1 = require("@libs/Navigation/Navigation");
var runOnLiveMarkdownRuntime_1 = require("@libs/runOnLiveMarkdownRuntime");
var SearchAutocompleteUtils_1 = require("@libs/SearchAutocompleteUtils");
var SearchQueryUtils_1 = require("@libs/SearchQueryUtils");
var variables_1 = require("@styles/variables");
var CONST_1 = require("@src/CONST");
var ONYXKEYS_1 = require("@src/ONYXKEYS");
var ROUTES_1 = require("@src/ROUTES");
function SearchAutocompleteInput(_a) {
    var value = _a.value, onSearchQueryChange = _a.onSearchQueryChange, _b = _a.onSubmit, onSubmit = _b === void 0 ? function () { } : _b, autocompleteListRef = _a.autocompleteListRef, isFullWidth = _a.isFullWidth, _c = _a.disabled, disabled = _c === void 0 ? false : _c, _d = _a.shouldDelayFocus, shouldDelayFocus = _d === void 0 ? false : _d, _e = _a.autoFocus, autoFocus = _e === void 0 ? true : _e, _f = _a.shouldShowOfflineMessage, shouldShowOfflineMessage = _f === void 0 ? false : _f, onFocus = _a.onFocus, onBlur = _a.onBlur, _g = _a.caretHidden, caretHidden = _g === void 0 ? false : _g, wrapperStyle = _a.wrapperStyle, _h = _a.wrapperFocusedStyle, wrapperFocusedStyle = _h === void 0 ? {} : _h, outerWrapperStyle = _a.outerWrapperStyle, isSearchingForReports = _a.isSearchingForReports, selection = _a.selection, substitutionMap = _a.substitutionMap, ref = _a.ref;
    var styles = (0, useThemeStyles_1.default)();
    var theme = (0, useTheme_1.default)();
    var translate = (0, useLocalize_1.default)().translate;
    var isOffline = (0, useNetwork_1.default)().isOffline;
    var currentUserPersonalDetails = (0, useCurrentUserPersonalDetails_1.default)();
    var inputRef = (0, react_1.useRef)(null);
    var autoFocusAfterNav = (0, useFocusAfterNav_1.default)(inputRef, shouldDelayFocus);
    var currencyList = (0, useOnyx_1.default)(ONYXKEYS_1.default.CURRENCY_LIST, { canBeMissing: false })[0];
    var currencyAutocompleteList = Object.keys(currencyList !== null && currencyList !== void 0 ? currencyList : {}).filter(function (currencyCode) { var _a; return !((_a = currencyList === null || currencyList === void 0 ? void 0 : currencyList[currencyCode]) === null || _a === void 0 ? void 0 : _a.retired); });
    var currencySharedValue = (0, react_native_reanimated_1.useSharedValue)(currencyAutocompleteList);
    var allPolicyCategories = (0, useOnyx_1.default)(ONYXKEYS_1.default.COLLECTION.POLICY_CATEGORIES, { canBeMissing: false })[0];
    var categoryAutocompleteList = (0, react_1.useMemo)(function () {
        return (0, SearchAutocompleteUtils_1.getAutocompleteCategories)(allPolicyCategories);
    }, [allPolicyCategories]);
    var categorySharedValue = (0, react_native_reanimated_1.useSharedValue)(categoryAutocompleteList);
    var allPoliciesTags = (0, useOnyx_1.default)(ONYXKEYS_1.default.COLLECTION.POLICY_TAGS, { canBeMissing: false })[0];
    var tagAutocompleteList = (0, react_1.useMemo)(function () {
        return (0, SearchAutocompleteUtils_1.getAutocompleteTags)(allPoliciesTags);
    }, [allPoliciesTags]);
    var tagSharedValue = (0, react_native_reanimated_1.useSharedValue)(tagAutocompleteList);
    var loginList = (0, useOnyx_1.default)(ONYXKEYS_1.default.LOGIN_LIST, { canBeMissing: false })[0];
    var emailList = Object.keys(loginList !== null && loginList !== void 0 ? loginList : {});
    var emailListSharedValue = (0, react_native_reanimated_1.useSharedValue)(emailList);
    var offlineMessage = isOffline && shouldShowOfflineMessage ? "".concat(translate('common.youAppearToBeOffline'), " ").concat(translate('search.resultsAreLimited')) : '';
    var _j = wrapperFocusedStyle.borderColor, focusedBorderColor = _j === void 0 ? theme.border : _j, restWrapperFocusedStyle = __rest(wrapperFocusedStyle, ["borderColor"]);
    var _k = wrapperStyle !== null && wrapperStyle !== void 0 ? wrapperStyle : {}, _l = _k.borderColor, wrapperBorderColor = _l === void 0 ? theme.border : _l, restWrapperStyle = __rest(_k, ["borderColor"]);
    // we are handling focused/unfocused style using shared value instead of using state to avoid re-rendering. Otherwise layout animation in `Animated.View` will lag.
    var focusedSharedValue = (0, react_native_reanimated_1.useSharedValue)(false);
    var wrapperAnimatedStyle = (0, react_native_reanimated_1.useAnimatedStyle)(function () {
        return focusedSharedValue.get() ? restWrapperFocusedStyle : (restWrapperStyle !== null && restWrapperStyle !== void 0 ? restWrapperStyle : {});
    });
    var wrapperBorderColorAnimatedStyle = (0, react_native_reanimated_1.useAnimatedStyle)(function () {
        return {
            borderColor: (0, react_native_reanimated_1.interpolateColor)(focusedSharedValue.get() ? 1 : 0, [0, 1], [wrapperBorderColor, focusedBorderColor], 'RGB'),
        };
    });
    (0, react_1.useEffect)(function () {
        (0, runOnLiveMarkdownRuntime_1.default)(function () {
            'worklet';
            emailListSharedValue.set(emailList);
        })();
    }, [emailList, emailListSharedValue]);
    (0, react_1.useEffect)(function () {
        (0, runOnLiveMarkdownRuntime_1.default)(function () {
            'worklet';
            currencySharedValue.set(currencyAutocompleteList);
        })();
    }, [currencyAutocompleteList, currencySharedValue]);
    (0, react_1.useEffect)(function () {
        (0, runOnLiveMarkdownRuntime_1.default)(function () {
            'worklet';
            categorySharedValue.set(categoryAutocompleteList);
        })();
    }, [categorySharedValue, categoryAutocompleteList]);
    (0, react_1.useEffect)(function () {
        (0, runOnLiveMarkdownRuntime_1.default)(function () {
            'worklet';
            tagSharedValue.set(tagAutocompleteList);
        })();
    }, [tagSharedValue, tagAutocompleteList]);
    var parser = (0, react_1.useCallback)(function (input) {
        'worklet';
        var _a;
        return (0, SearchAutocompleteUtils_1.parseForLiveMarkdown)(input, (_a = currentUserPersonalDetails.displayName) !== null && _a !== void 0 ? _a : '', substitutionMap, emailListSharedValue, currencySharedValue, categorySharedValue, tagSharedValue);
    }, [currentUserPersonalDetails.displayName, substitutionMap, currencySharedValue, categorySharedValue, tagSharedValue, emailListSharedValue]);
    var clearFilters = (0, react_1.useCallback)(function () {
        (0, Search_1.clearAdvancedFilters)();
        onSearchQueryChange('');
        // Check if we are on the search page before clearing query. If we are using the popup search menu,
        // then the clear button is ONLY available when the search is *not* saved, so we don't have to navigate
        var currentRoute = Navigation_1.default.getActiveRouteWithoutParams();
        var isSearchPage = currentRoute === "/".concat(ROUTES_1.default.SEARCH_ROOT.route);
        if (isSearchPage) {
            Navigation_1.default.navigate(ROUTES_1.default.SEARCH_ROOT.getRoute({
                query: (0, SearchQueryUtils_1.buildCannedSearchQuery)(),
            }));
        }
    }, [onSearchQueryChange]);
    var inputWidth = isFullWidth ? styles.w100 : { width: variables_1.default.popoverWidth };
    return (<react_native_1.View style={[outerWrapperStyle]}>
            <react_native_reanimated_1.default.View style={[styles.flexRow, styles.alignItemsCenter, wrapperStyle !== null && wrapperStyle !== void 0 ? wrapperStyle : styles.searchRouterTextInputContainer, wrapperAnimatedStyle, wrapperBorderColorAnimatedStyle]}>
                <react_native_1.View style={styles.flex1}>
                    <TextInput_1.default testID="search-autocomplete-text-input" value={value} onChangeText={onSearchQueryChange} autoFocus={shouldDelayFocus ? autoFocusAfterNav : autoFocus} caretHidden={caretHidden} role={CONST_1.default.ROLE.PRESENTATION} placeholder={translate('search.searchPlaceholder')} autoCapitalize="none" autoCorrect={false} spellCheck={false} enterKeyHint="search" accessibilityLabel={translate('search.searchPlaceholder')} disabled={disabled} maxLength={CONST_1.default.SEARCH_QUERY_LIMIT} onSubmitEditing={onSubmit} shouldUseDisabledStyles={false} textInputContainerStyles={[styles.borderNone, styles.pb0, styles.pl3]} inputStyle={[inputWidth, styles.lineHeightUndefined]} placeholderTextColor={theme.textSupporting} loadingSpinnerStyle={[styles.mt0, styles.mr1, styles.justifyContentCenter]} onFocus={function () {
            var _a;
            onFocus === null || onFocus === void 0 ? void 0 : onFocus();
            (_a = autocompleteListRef === null || autocompleteListRef === void 0 ? void 0 : autocompleteListRef.current) === null || _a === void 0 ? void 0 : _a.updateExternalTextInputFocus(true);
            focusedSharedValue.set(true);
        }} onBlur={function () {
            var _a;
            (_a = autocompleteListRef === null || autocompleteListRef === void 0 ? void 0 : autocompleteListRef.current) === null || _a === void 0 ? void 0 : _a.updateExternalTextInputFocus(false);
            focusedSharedValue.set(false);
            onBlur === null || onBlur === void 0 ? void 0 : onBlur();
        }} isLoading={isSearchingForReports} ref={function (element) {
            if (!ref) {
                return;
            }
            inputRef.current = element;
            if (typeof ref === 'function') {
                ref(element);
                return;
            }
            // eslint-disable-next-line no-param-reassign
            ref.current = element;
        }} type="markdown" multiline={false} parser={parser} selection={selection} shouldShowClearButton={!!value && !isSearchingForReports} shouldHideClearButton={false} onClearInput={clearFilters} forwardedFSClass={CONST_1.default.FULLSTORY.CLASS.UNMASK}/>
                </react_native_1.View>
            </react_native_reanimated_1.default.View>
            <FormHelpMessage_1.default style={styles.ph3} isError={false} message={offlineMessage}/>
        </react_native_1.View>);
}
SearchAutocompleteInput.displayName = 'SearchAutocompleteInput';
exports.default = SearchAutocompleteInput;
