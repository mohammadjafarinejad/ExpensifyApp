"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_native_1 = require("react-native");
var Checkbox_1 = require("@components/Checkbox");
var Pressable_1 = require("@components/Pressable");
var Text_1 = require("@components/Text");
var useLocalize_1 = require("@hooks/useLocalize");
var useThemeStyles_1 = require("@hooks/useThemeStyles");
var CONST_1 = require("@src/CONST");
function ListHeader(_a) {
    var _b;
    var dataDetails = _a.dataDetails, aboveListHeaderMessage = _a.aboveListHeaderMessage, customListHeader = _a.customListHeader, canSelectMultiple = _a.canSelectMultiple, onSelectAll = _a.onSelectAll, shouldPreventDefaultFocusOnSelectRow = _a.shouldPreventDefaultFocusOnSelectRow;
    var styles = (0, useThemeStyles_1.default)();
    var translate = (0, useLocalize_1.default)().translate;
    if (aboveListHeaderMessage) {
        return null;
    }
    if (!canSelectMultiple || !onSelectAll) {
        return customListHeader;
    }
    var allDisabled = dataDetails.data.length === dataDetails.disabledIndexes.length;
    var handleMouseDown = function (e) {
        if (!shouldPreventDefaultFocusOnSelectRow) {
            return;
        }
        e.preventDefault();
    };
    return (<react_native_1.View style={[styles.userSelectNone, styles.peopleRow, styles.ph5, styles.pb3, styles.selectionListStickyHeader]} accessibilityRole="header">
            <react_native_1.View style={[styles.flexRow, styles.alignItemsCenter]}>
                <Checkbox_1.default accessibilityLabel={translate('workspace.people.selectAll')} isChecked={dataDetails.allSelected} isIndeterminate={dataDetails.someSelected} onPress={onSelectAll} disabled={allDisabled}/>

                {!customListHeader && (<Pressable_1.PressableWithFeedback style={[styles.userSelectNone, styles.flexRow, styles.alignItemsCenter]} onPress={onSelectAll} accessibilityLabel={translate('workspace.people.selectAll')} accessibilityRole="button" accessibilityState={{ checked: dataDetails.allSelected, disabled: allDisabled }} disabled={allDisabled} dataSet={_b = {}, _b[CONST_1.default.SELECTION_SCRAPER_HIDDEN_ELEMENT] = true, _b} onMouseDown={handleMouseDown}>
                        <Text_1.default style={[styles.textStrong, styles.ph3]}>{translate('workspace.people.selectAll')}</Text_1.default>
                    </Pressable_1.PressableWithFeedback>)}
            </react_native_1.View>
            {customListHeader}
        </react_native_1.View>);
}
exports.default = react_1.default.memo(ListHeader);
