"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var DateFilterBase_1 = require("@components/Search/FilterComponents/DateFilterBase");
var Search_1 = require("@libs/actions/Search");
var CONST_1 = require("@src/CONST");
function ReportFieldDate(_a) {
    var field = _a.field, close = _a.close;
    var formKey = "".concat(CONST_1.default.SEARCH.REPORT_FIELD.DEFAULT_PREFIX).concat(field.name.toLowerCase().replaceAll(' ', '-'));
    var updateFilter = function (values) {
        (0, Search_1.updateAdvancedFilters)(values);
        close();
    };
    return (<DateFilterBase_1.default title={field.name} dateKey={formKey} back={close} onSubmit={updateFilter}/>);
}
ReportFieldDate.displayName = 'ReportFieldDate';
exports.default = ReportFieldDate;
