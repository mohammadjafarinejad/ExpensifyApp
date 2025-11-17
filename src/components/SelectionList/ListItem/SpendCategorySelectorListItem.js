"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var MenuItemWithTopDescription_1 = require("@components/MenuItemWithTopDescription");
var useThemeStyles_1 = require("@hooks/useThemeStyles");
var CategoryUtils_1 = require("@libs/CategoryUtils");
var BaseListItem_1 = require("./BaseListItem");
function SpendCategorySelectorListItem(_a) {
    var item = _a.item, onSelectRow = _a.onSelectRow, isFocused = _a.isFocused;
    var styles = (0, useThemeStyles_1.default)();
    var groupID = item.groupID, category = item.categoryID;
    if (!groupID) {
        return;
    }
    return (<BaseListItem_1.default item={item} pressableStyle={[styles.mt2]} onSelectRow={onSelectRow} isFocused={isFocused} showTooltip keyForList={item.keyForList} pendingAction={item.pendingAction}>
            <MenuItemWithTopDescription_1.default shouldShowRightIcon title={(0, CategoryUtils_1.getDecodedCategoryName)(category !== null && category !== void 0 ? category : '')} description={groupID[0].toUpperCase() + groupID.slice(1)} descriptionTextStyle={[styles.textNormal]} wrapperStyle={[styles.ph5]} onPress={function () { return onSelectRow(item); }} focused={isFocused}/>
        </BaseListItem_1.default>);
}
SpendCategorySelectorListItem.displayName = 'SpendCategorySelectorListItem';
exports.default = SpendCategorySelectorListItem;
