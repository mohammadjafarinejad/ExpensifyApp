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
var flash_list_1 = require("@shopify/flash-list");
var fast_equals_1 = require("fast-equals");
var react_1 = require("react");
var react_native_1 = require("react-native");
var OptionsListSkeletonView_1 = require("@components/OptionsListSkeletonView");
var useActiveElementRole_1 = require("@hooks/useActiveElementRole");
var useArrowKeyFocusManager_1 = require("@hooks/useArrowKeyFocusManager");
var useDebounce_1 = require("@hooks/useDebounce");
var useKeyboardShortcut_1 = require("@hooks/useKeyboardShortcut");
var useKeyboardState_1 = require("@hooks/useKeyboardState");
var useSafeAreaPaddings_1 = require("@hooks/useSafeAreaPaddings");
var useScrollEnabled_1 = require("@hooks/useScrollEnabled");
var useSingleExecution_1 = require("@hooks/useSingleExecution");
var useSyncFocusImplementation_1 = require("@hooks/useSyncFocus/useSyncFocusImplementation");
var useThemeStyles_1 = require("@hooks/useThemeStyles");
var CONST_1 = require("@src/CONST");
var Footer_1 = require("./components/Footer");
var ListHeader_1 = require("./components/ListHeader");
var TextInput_1 = require("./components/TextInput");
var ListItemRenderer_1 = require("./ListItem/ListItemRenderer");
var ANIMATED_HIGHLIGHT_DURATION = CONST_1.default.ANIMATED_HIGHLIGHT_ENTRY_DELAY +
    CONST_1.default.ANIMATED_HIGHLIGHT_ENTRY_DURATION +
    CONST_1.default.ANIMATED_HIGHLIGHT_START_DELAY +
    CONST_1.default.ANIMATED_HIGHLIGHT_START_DURATION +
    CONST_1.default.ANIMATED_HIGHLIGHT_END_DELAY +
    CONST_1.default.ANIMATED_HIGHLIGHT_END_DURATION;
function BaseSelectionList(_a) {
    var data = _a.data, ref = _a.ref, ListItem = _a.ListItem, textInputOptions = _a.textInputOptions, initiallyFocusedItemKey = _a.initiallyFocusedItemKey, onSelectRow = _a.onSelectRow, onSelectAll = _a.onSelectAll, onCheckboxPress = _a.onCheckboxPress, onScrollBeginDrag = _a.onScrollBeginDrag, onEndReached = _a.onEndReached, onEndReachedThreshold = _a.onEndReachedThreshold, confirmButtonConfig = _a.confirmButtonConfig, customListHeader = _a.customListHeader, customListHeaderContent = _a.customListHeaderContent, footerContent = _a.footerContent, listEmptyContent = _a.listEmptyContent, listFooterContent = _a.listFooterContent, rightHandSideComponent = _a.rightHandSideComponent, alternateNumberOfSupportedLines = _a.alternateNumberOfSupportedLines, _b = _a.selectedItems, selectedItems = _b === void 0 ? CONST_1.default.EMPTY_ARRAY : _b, style = _a.style, isSelected = _a.isSelected, _c = _a.isDisabled, isDisabled = _c === void 0 ? false : _c, isSmallScreenWidth = _a.isSmallScreenWidth, isLoadingNewOptions = _a.isLoadingNewOptions, _d = _a.isRowMultilineSupported, isRowMultilineSupported = _d === void 0 ? false : _d, addBottomSafeAreaPadding = _a.addBottomSafeAreaPadding, _e = _a.showListEmptyContent, showListEmptyContent = _e === void 0 ? true : _e, showLoadingPlaceholder = _a.showLoadingPlaceholder, _f = _a.showScrollIndicator, showScrollIndicator = _f === void 0 ? true : _f, _g = _a.canSelectMultiple, canSelectMultiple = _g === void 0 ? false : _g, _h = _a.disableKeyboardShortcuts, disableKeyboardShortcuts = _h === void 0 ? false : _h, shouldUseUserSkeletonView = _a.shouldUseUserSkeletonView, _j = _a.shouldShowTooltips, shouldShowTooltips = _j === void 0 ? true : _j, _k = _a.shouldIgnoreFocus, shouldIgnoreFocus = _k === void 0 ? false : _k, _l = _a.shouldStopPropagation, shouldStopPropagation = _l === void 0 ? false : _l, _m = _a.shouldScrollToFocusedIndex, shouldScrollToFocusedIndex = _m === void 0 ? true : _m, _o = _a.shouldDebounceScrolling, shouldDebounceScrolling = _o === void 0 ? false : _o, _p = _a.shouldUpdateFocusedIndex, shouldUpdateFocusedIndex = _p === void 0 ? false : _p, _q = _a.shouldSingleExecuteRowSelect, shouldSingleExecuteRowSelect = _q === void 0 ? false : _q, _r = _a.shouldPreventDefaultFocusOnSelectRow, shouldPreventDefaultFocusOnSelectRow = _r === void 0 ? false : _r, _s = _a.shouldShowTextInput, shouldShowTextInput = _s === void 0 ? !!(textInputOptions === null || textInputOptions === void 0 ? void 0 : textInputOptions.label) : _s, _t = _a.shouldHighlightSelectedItem, shouldHighlightSelectedItem = _t === void 0 ? true : _t;
    var styles = (0, useThemeStyles_1.default)();
    var isFocused = (0, native_1.useIsFocused)();
    var scrollEnabled = (0, useScrollEnabled_1.default)();
    var singleExecution = (0, useSingleExecution_1.default)().singleExecution;
    var activeElementRole = (0, useActiveElementRole_1.default)();
    var isKeyboardShown = (0, useKeyboardState_1.default)().isKeyboardShown;
    var safeAreaPaddingBottomStyle = (0, useSafeAreaPaddings_1.default)().safeAreaPaddingBottomStyle;
    var innerTextInputRef = (0, react_1.useRef)(null);
    var isTextInputFocusedRef = (0, react_1.useRef)(false);
    var hasKeyBeenPressed = (0, react_1.useRef)(false);
    var listRef = (0, react_1.useRef)(null);
    var itemFocusTimeoutRef = (0, react_1.useRef)(null);
    var initialFocusedIndex = (0, react_1.useMemo)(function () { return data.findIndex(function (i) { return i.keyForList === initiallyFocusedItemKey; }); }, [data, initiallyFocusedItemKey]);
    var _u = (0, react_1.useState)(null), itemsToHighlight = _u[0], setItemsToHighlight = _u[1];
    var isItemSelected = (0, react_1.useCallback)(function (item) { var _a, _b, _c; return (_a = item.isSelected) !== null && _a !== void 0 ? _a : (((_b = isSelected === null || isSelected === void 0 ? void 0 : isSelected(item)) !== null && _b !== void 0 ? _b : selectedItems.includes((_c = item.keyForList) !== null && _c !== void 0 ? _c : '')) && canSelectMultiple); }, [isSelected, selectedItems, canSelectMultiple]);
    var paddingBottomStyle = (0, react_1.useMemo)(function () { return !isKeyboardShown && safeAreaPaddingBottomStyle; }, [isKeyboardShown, safeAreaPaddingBottomStyle]);
    var hasFooter = !!footerContent || (confirmButtonConfig === null || confirmButtonConfig === void 0 ? void 0 : confirmButtonConfig.showButton);
    var dataDetails = (0, react_1.useMemo)(function () {
        var _a = data.reduce(function (acc, item, index) {
            var _a;
            var idx = (_a = item.index) !== null && _a !== void 0 ? _a : index;
            var isItemDisabled = isDisabled || (!!(item === null || item === void 0 ? void 0 : item.isDisabled) && !isItemSelected(item));
            if (isItemSelected(item)) {
                acc.selectedOptions.push(item);
            }
            if (isItemDisabled) {
                acc.disabledIndexes.push(idx);
                if (!(item === null || item === void 0 ? void 0 : item.isDisabledCheckbox)) {
                    acc.disabledArrowKeyIndexes.push(idx);
                }
            }
            return acc;
        }, { disabledIndexes: [], disabledArrowKeyIndexes: [], selectedOptions: [] }), disabledIndexes = _a.disabledIndexes, disabledArrowKeyIndexes = _a.disabledArrowKeyIndexes, selectedOptions = _a.selectedOptions;
        var totalSelectable = data.length - disabledIndexes.length;
        var allSelected = selectedOptions.length > 0 && selectedOptions.length === totalSelectable;
        var someSelected = selectedOptions.length > 0 && selectedOptions.length < totalSelectable;
        return { data: data, allSelected: allSelected, someSelected: someSelected, selectedOptions: selectedOptions, disabledIndexes: disabledIndexes, disabledArrowKeyIndexes: disabledArrowKeyIndexes };
    }, [data, isDisabled, isItemSelected]);
    var setHasKeyBeenPressed = (0, react_1.useCallback)(function () {
        if (hasKeyBeenPressed.current) {
            return;
        }
        hasKeyBeenPressed.current = true;
    }, []);
    var scrollToIndex = (0, react_1.useCallback)(function (index) {
        var item = data.at(index);
        if (!listRef.current || !item || index === -1) {
            return;
        }
        listRef.current.scrollToIndex({ index: index });
    }, [data]);
    var debouncedScrollToIndex = (0, useDebounce_1.default)(scrollToIndex, CONST_1.default.TIMING.LIST_SCROLLING_DEBOUNCE_TIME, { leading: true, trailing: true });
    var _v = (0, useArrowKeyFocusManager_1.default)(__assign(__assign({ initialFocusedIndex: initialFocusedIndex, maxIndex: data.length - 1, disabledIndexes: dataDetails.disabledArrowKeyIndexes, isActive: isFocused, onFocusedIndexChange: function (index) {
            if (!shouldScrollToFocusedIndex) {
                return;
            }
            (shouldDebounceScrolling ? debouncedScrollToIndex : scrollToIndex)(index);
        } }, (!hasKeyBeenPressed.current && { setHasKeyBeenPressed: setHasKeyBeenPressed })), { isFocused: isFocused })), focusedIndex = _v[0], setFocusedIndex = _v[1];
    var selectRow = (0, react_1.useCallback)(function (item, indexToFocus) {
        var _a;
        if (!isFocused) {
            return;
        }
        if (canSelectMultiple) {
            if (shouldShowTextInput) {
                (_a = textInputOptions === null || textInputOptions === void 0 ? void 0 : textInputOptions.onChangeText) === null || _a === void 0 ? void 0 : _a.call(textInputOptions, '');
            }
            else if (isSmallScreenWidth) {
                if (!item.isDisabledCheckbox) {
                    onCheckboxPress === null || onCheckboxPress === void 0 ? void 0 : onCheckboxPress(item);
                }
                return;
            }
        }
        if (shouldUpdateFocusedIndex && typeof indexToFocus === 'number') {
            setFocusedIndex(indexToFocus);
        }
        onSelectRow(item);
        if (shouldShowTextInput && shouldPreventDefaultFocusOnSelectRow && innerTextInputRef.current) {
            innerTextInputRef.current.focus();
        }
    }, [
        isFocused,
        canSelectMultiple,
        shouldUpdateFocusedIndex,
        onSelectRow,
        shouldShowTextInput,
        shouldPreventDefaultFocusOnSelectRow,
        isSmallScreenWidth,
        textInputOptions,
        onCheckboxPress,
        setFocusedIndex,
    ]);
    var focusedOption = (0, react_1.useMemo)(function () {
        if (focusedIndex < 0 || focusedIndex >= data.length) {
            return;
        }
        var option = data.at(focusedIndex);
        if (!option || (option.isDisabled && !isItemSelected(option))) {
            return;
        }
        return option;
    }, [data, focusedIndex, isItemSelected]);
    var selectFocusedOption = function () {
        if (!focusedOption) {
            return;
        }
        selectRow(focusedOption);
    };
    // Disable `Enter` shortcut if the active element is a button or checkbox
    var disableEnterShortcut = activeElementRole && [CONST_1.default.ROLE.BUTTON, CONST_1.default.ROLE.CHECKBOX].includes(activeElementRole);
    (0, useKeyboardShortcut_1.default)(CONST_1.default.KEYBOARD_SHORTCUTS.ENTER, selectFocusedOption, {
        captureOnInputs: true,
        shouldBubble: !focusedOption,
        shouldStopPropagation: shouldStopPropagation,
        isActive: !disableKeyboardShortcuts && isFocused && !disableEnterShortcut && focusedIndex >= 0,
    });
    (0, useKeyboardShortcut_1.default)(CONST_1.default.KEYBOARD_SHORTCUTS.CTRL_ENTER, function (e) {
        if (confirmButtonConfig === null || confirmButtonConfig === void 0 ? void 0 : confirmButtonConfig.onConfirm) {
            confirmButtonConfig === null || confirmButtonConfig === void 0 ? void 0 : confirmButtonConfig.onConfirm(e, focusedOption);
            return;
        }
        selectFocusedOption();
    }, {
        captureOnInputs: true,
        shouldBubble: !focusedOption,
        isActive: !disableKeyboardShortcuts && isFocused && !(confirmButtonConfig === null || confirmButtonConfig === void 0 ? void 0 : confirmButtonConfig.isDisabled),
    });
    var textInputKeyPress = (0, react_1.useCallback)(function (event) {
        var key = event.nativeEvent.key;
        if (key === CONST_1.default.KEYBOARD_SHORTCUTS.TAB.shortcutKey) {
            useSyncFocusImplementation_1.focusedItemRef === null || useSyncFocusImplementation_1.focusedItemRef === void 0 ? void 0 : useSyncFocusImplementation_1.focusedItemRef.focus();
        }
    }, []);
    var handleTextInputRef = function (element) {
        innerTextInputRef.current = element;
        var textInputRef = textInputOptions === null || textInputOptions === void 0 ? void 0 : textInputOptions.ref;
        if (!textInputRef) {
            return;
        }
        if (typeof textInputRef === 'function') {
            textInputRef(element);
        }
        else {
            // eslint-disable-next-line react-compiler/react-compiler
            textInputRef.current = element;
        }
    };
    var textInputComponent = function (_a) {
        var _b;
        var shouldBeInsideList = _a.shouldBeInsideList;
        if (shouldBeInsideList !== ((_b = textInputOptions === null || textInputOptions === void 0 ? void 0 : textInputOptions.shouldBeInsideList) !== null && _b !== void 0 ? _b : false)) {
            return null;
        }
        return (<TextInput_1.default shouldShowTextInput={shouldShowTextInput} onKeyPress={textInputKeyPress} accessibilityLabel={textInputOptions === null || textInputOptions === void 0 ? void 0 : textInputOptions.label} ref={handleTextInputRef} options={textInputOptions} onSubmit={selectFocusedOption} dataLength={data.length} isLoading={isLoadingNewOptions} onFocusChange={function (v) { return (isTextInputFocusedRef.current = v); }} showLoadingPlaceholder={showLoadingPlaceholder} isLoadingNewOptions={isLoadingNewOptions}/>);
    };
    var renderItem = function (_a) {
        var item = _a.item, index = _a.index;
        var isItemDisabled = isDisabled || item.isDisabled;
        var selected = isItemSelected(item);
        var isItemFocused = (!isDisabled || selected) && focusedIndex === index;
        return (<ListItemRenderer_1.default ListItem={ListItem} selectRow={selectRow} keyForList={item.keyForList} showTooltip={shouldShowTooltips} item={item} setFocusedIndex={setFocusedIndex} index={index} normalizedIndex={index} isFocused={isItemFocused} isDisabled={isItemDisabled} canSelectMultiple={canSelectMultiple} shouldSingleExecuteRowSelect={shouldSingleExecuteRowSelect} shouldPreventDefaultFocusOnSelectRow={shouldPreventDefaultFocusOnSelectRow} rightHandSideComponent={rightHandSideComponent} isMultilineSupported={isRowMultilineSupported} isAlternateTextMultilineSupported={(alternateNumberOfSupportedLines !== null && alternateNumberOfSupportedLines !== void 0 ? alternateNumberOfSupportedLines : 0) > 1} alternateTextNumberOfLines={alternateNumberOfSupportedLines} shouldIgnoreFocus={shouldIgnoreFocus} wrapperStyle={style === null || style === void 0 ? void 0 : style.listItemWrapperStyle} titleStyles={style === null || style === void 0 ? void 0 : style.listItemTitleStyles} singleExecution={singleExecution} shouldHighlightSelectedItem={shouldHighlightSelectedItem} shouldSyncFocus={!isTextInputFocusedRef.current && hasKeyBeenPressed.current}/>);
    };
    var renderListEmptyContent = function () {
        if (showLoadingPlaceholder) {
            return <OptionsListSkeletonView_1.default shouldStyleAsTable={shouldUseUserSkeletonView}/>;
        }
        if (showListEmptyContent) {
            return listEmptyContent;
        }
    };
    var scrollAndHighlightItem = (0, react_1.useCallback)(function (items) {
        var newItemsToHighlight = new Set(items);
        if ((0, fast_equals_1.deepEqual)(itemsToHighlight, newItemsToHighlight)) {
            return;
        }
        var index = data.findIndex(function (option) { return newItemsToHighlight.has(option.keyForList); });
        scrollToIndex(index);
        setItemsToHighlight(newItemsToHighlight);
        if (itemFocusTimeoutRef.current) {
            clearTimeout(itemFocusTimeoutRef.current);
        }
        itemFocusTimeoutRef.current = setTimeout(function () {
            setItemsToHighlight(null);
        }, ANIMATED_HIGHLIGHT_DURATION);
    }, [data, itemsToHighlight, scrollToIndex]);
    var updateFocusedIndex = (0, react_1.useCallback)(function (newFocusedIndex, shouldScroll) {
        if (shouldScroll === void 0) { shouldScroll = false; }
        if (newFocusedIndex < 0 || newFocusedIndex >= data.length) {
            return;
        }
        setFocusedIndex(newFocusedIndex);
        if (shouldScroll) {
            scrollToIndex(newFocusedIndex);
        }
    }, [data.length, scrollToIndex, setFocusedIndex]);
    (0, react_1.useEffect)(function () {
        if (!itemFocusTimeoutRef.current) {
            return;
        }
        clearTimeout(itemFocusTimeoutRef.current);
    }, []);
    var handleSelectAll = (0, react_1.useCallback)(function () {
        onSelectAll === null || onSelectAll === void 0 ? void 0 : onSelectAll();
        if (shouldShowTextInput && shouldPreventDefaultFocusOnSelectRow && innerTextInputRef.current) {
            innerTextInputRef.current.focus();
        }
    }, [onSelectAll, shouldShowTextInput, shouldPreventDefaultFocusOnSelectRow]);
    (0, react_1.useImperativeHandle)(ref, function () { return ({ scrollAndHighlightItem: scrollAndHighlightItem, scrollToIndex: scrollToIndex, updateFocusedIndex: updateFocusedIndex }); }, [scrollAndHighlightItem, scrollToIndex, updateFocusedIndex]);
    return (<react_native_1.View style={[styles.flex1, addBottomSafeAreaPadding && !hasFooter && paddingBottomStyle, style === null || style === void 0 ? void 0 : style.containerStyle]}>
            {textInputComponent({ shouldBeInsideList: false })}
            {data.length === 0 ? (renderListEmptyContent()) : (<>
                    <ListHeader_1.default dataDetails={dataDetails} aboveListHeaderMessage={textInputOptions === null || textInputOptions === void 0 ? void 0 : textInputOptions.headerMessage} customListHeader={customListHeader} canSelectMultiple={canSelectMultiple} onSelectAll={handleSelectAll} shouldPreventDefaultFocusOnSelectRow={shouldPreventDefaultFocusOnSelectRow}/>
                    <flash_list_1.FlashList data={data} renderItem={renderItem} ref={listRef} keyExtractor={function (item) { return item.keyForList; }} ListFooterComponent={listFooterContent} scrollEnabled={scrollEnabled} indicatorStyle="white" keyboardShouldPersistTaps="always" showsVerticalScrollIndicator={showScrollIndicator} onEndReached={onEndReached} onEndReachedThreshold={onEndReachedThreshold} style={style === null || style === void 0 ? void 0 : style.listStyle} initialScrollIndex={initialFocusedIndex} onScrollBeginDrag={onScrollBeginDrag} ListHeaderComponent={<>
                                {customListHeaderContent}
                                {textInputComponent({ shouldBeInsideList: true })}
                            </>}/>
                </>)}

            <Footer_1.default footerContent={footerContent} confirmButtonConfig={confirmButtonConfig} addBottomSafeAreaPadding={addBottomSafeAreaPadding}/>
        </react_native_1.View>);
}
BaseSelectionList.displayName = 'BaseSelectionList';
exports.default = BaseSelectionList;
