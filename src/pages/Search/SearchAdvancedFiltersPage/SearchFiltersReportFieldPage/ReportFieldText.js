"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var HeaderWithBackButton_1 = require("@components/HeaderWithBackButton");
var TextFilterBase_1 = require("@components/Search/FilterComponents/TextFilterBase");
var Search_1 = require("@libs/actions/Search");
var CONST_1 = require("@src/CONST");
function ReportFieldText(_a) {
    var field = _a.field, close = _a.close;
    var formKey = "".concat(CONST_1.default.SEARCH.REPORT_FIELD.DEFAULT_PREFIX).concat(field.name.toLowerCase().replaceAll(' ', '-'));
    var updateFilter = function (values) {
        (0, Search_1.updateAdvancedFilters)(values);
        close();
    };
    return (<>
            <HeaderWithBackButton_1.default title={field.name} onBackButtonPress={close}/>
            <TextFilterBase_1.default filterKey={formKey} title={field.name} characterLimit={CONST_1.default.MAX_COMMENT_LENGTH} onSubmit={updateFilter}/>
        </>);
}
ReportFieldText.displayName = 'ReportFieldText';
exports.default = ReportFieldText;
