"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var SelectionList_1 = require("@components/SelectionList");
var RadioListItem_1 = require("@components/SelectionList/ListItem/RadioListItem");
var useLocalize_1 = require("@hooks/useLocalize");
var WorkspaceReportFieldUtils_1 = require("@libs/WorkspaceReportFieldUtils");
var CONST_1 = require("@src/CONST");
function ReportFieldTypePicker(_a) {
    var _b;
    var defaultValue = _a.defaultValue, onOptionSelected = _a.onOptionSelected;
    var translate = (0, useLocalize_1.default)().translate;
    var typeOptions = Object.values(CONST_1.default.REPORT_FIELD_TYPES).map(function (reportFieldType) { return ({
        keyForList: reportFieldType,
        value: reportFieldType,
        isSelected: defaultValue === reportFieldType,
        text: translate((0, WorkspaceReportFieldUtils_1.getReportFieldTypeTranslationKey)(reportFieldType)),
        alternateText: translate((0, WorkspaceReportFieldUtils_1.getReportFieldAlternativeTextTranslationKey)(reportFieldType)),
    }); });
    var selectedOption = (_b = typeOptions.find(function (reportField) { return reportField.isSelected; })) === null || _b === void 0 ? void 0 : _b.keyForList;
    return (<SelectionList_1.default data={typeOptions} ListItem={RadioListItem_1.default} onSelectRow={onOptionSelected} addBottomSafeAreaPadding initiallyFocusedItemKey={selectedOption}/>);
}
ReportFieldTypePicker.displayName = 'ReportFieldTypePicker';
exports.default = ReportFieldTypePicker;
