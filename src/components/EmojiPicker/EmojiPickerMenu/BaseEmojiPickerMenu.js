"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var flash_list_1 = require("@shopify/flash-list");
var react_1 = require("react");
var react_native_1 = require("react-native");
var CategoryShortcutBar_1 = require("@components/EmojiPicker/CategoryShortcutBar");
var EmojiSkinToneList_1 = require("@components/EmojiPicker/EmojiSkinToneList");
var Text_1 = require("@components/Text");
var useLocalize_1 = require("@hooks/useLocalize");
var useThemeStyles_1 = require("@hooks/useThemeStyles");
var CONST_1 = require("@src/CONST");
/**
 * Improves FlashList's recycling when there are different types of items
 */
var getItemType = function (item) {
    // item is undefined only when list is empty
    if (!item) {
        return;
    }
    if ('name' in item && item.name) {
        return CONST_1.default.EMOJI_PICKER_ITEM_TYPES.EMOJI;
    }
    if ('header' in item && item.header) {
        return CONST_1.default.EMOJI_PICKER_ITEM_TYPES.HEADER;
    }
    return CONST_1.default.EMOJI_PICKER_ITEM_TYPES.SPACER;
};
/**
 * Return a unique key for each emoji item
 *
 */
var keyExtractor = function (item, index) { return "emoji_picker_".concat(item.code, "_").concat(index); };
/**
 * Renders the list empty component
 */
function ListEmptyComponent() {
    var styles = (0, useThemeStyles_1.default)();
    var translate = (0, useLocalize_1.default)().translate;
    return <Text_1.default style={[styles.textLabel, styles.colorMuted]}>{translate('common.noResultsFound')}</Text_1.default>;
}
function BaseEmojiPickerMenu(_a) {
    var headerEmojis = _a.headerEmojis, scrollToHeader = _a.scrollToHeader, isFiltered = _a.isFiltered, _b = _a.listWrapperStyle, listWrapperStyle = _b === void 0 ? [] : _b, data = _a.data, renderItem = _a.renderItem, _c = _a.stickyHeaderIndices, stickyHeaderIndices = _c === void 0 ? [] : _c, _d = _a.extraData, extraData = _d === void 0 ? [] : _d, _e = _a.alwaysBounceVertical, alwaysBounceVertical = _e === void 0 ? false : _e, ref = _a.ref;
    var styles = (0, useThemeStyles_1.default)();
    return (<>
            {!isFiltered && (<CategoryShortcutBar_1.default headerEmojis={headerEmojis} onPress={scrollToHeader}/>)}
            <react_native_1.View style={listWrapperStyle}>
                <flash_list_1.FlashList ref={ref} keyboardShouldPersistTaps="handled" data={data} drawDistance={CONST_1.default.EMOJI_DRAW_AMOUNT} renderItem={renderItem} keyExtractor={keyExtractor} numColumns={CONST_1.default.EMOJI_NUM_PER_ROW} stickyHeaderIndices={stickyHeaderIndices} ListEmptyComponent={ListEmptyComponent} alwaysBounceVertical={alwaysBounceVertical} contentContainerStyle={styles.ph4} extraData={extraData} getItemType={getItemType} overrideProps={{
            // scrollPaddingTop set to consider sticky header while scrolling, https://github.com/Expensify/App/issues/36883
            style: {
                minHeight: 1,
                minWidth: 1,
                scrollPaddingTop: isFiltered ? 0 : CONST_1.default.EMOJI_PICKER_ITEM_HEIGHT,
            },
        }} scrollEnabled={data.length > 0}/>
            </react_native_1.View>
            <EmojiSkinToneList_1.default />
        </>);
}
BaseEmojiPickerMenu.displayName = 'BaseEmojiPickerMenu';
exports.default = BaseEmojiPickerMenu;
