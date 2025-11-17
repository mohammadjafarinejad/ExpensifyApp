"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var SelectionList_1 = require("@components/SelectionList");
var RadioListItem_1 = require("@components/SelectionList/ListItem/RadioListItem");
var useLocalize_1 = require("@hooks/useLocalize");
function ReportFieldsInitialListValuePicker(_a) {
    var _b;
    var listValues = _a.listValues, disabledOptions = _a.disabledOptions, value = _a.value, onValueChange = _a.onValueChange;
    var localeCompare = (0, useLocalize_1.default)().localeCompare;
    var listValueOptions = (0, react_1.useMemo)(function () {
        return Object.values(listValues !== null && listValues !== void 0 ? listValues : {})
            .filter(function (listValue, index) { return !disabledOptions.at(index); })
            .sort(localeCompare)
            .map(function (listValue) { return ({
            keyForList: listValue,
            value: listValue,
            isSelected: value === listValue,
            text: listValue,
        }); });
    }, [value, listValues, disabledOptions, localeCompare]);
    return (<SelectionList_1.default data={listValueOptions} ListItem={RadioListItem_1.default} onSelectRow={function (item) { return onValueChange(item.value); }} initiallyFocusedItemKey={(_b = listValueOptions.find(function (listValue) { return listValue.isSelected; })) === null || _b === void 0 ? void 0 : _b.keyForList} addBottomSafeAreaPadding/>);
}
ReportFieldsInitialListValuePicker.displayName = 'ReportFieldsInitialListValuePicker';
exports.default = ReportFieldsInitialListValuePicker;
