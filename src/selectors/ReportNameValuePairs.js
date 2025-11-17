"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.archivedReportsIdSetSelector = exports.createReportNameValuePairsSelector = void 0;
var ReportUtils_1 = require("@libs/ReportUtils");
var mapOnyxCollectionItems_1 = require("@src/utils/mapOnyxCollectionItems");
var createReportNameValuePairsSelector = function (reportNameValuePairs, reportNameValuePairsSelector) {
    return (0, mapOnyxCollectionItems_1.default)(reportNameValuePairs, reportNameValuePairsSelector);
};
exports.createReportNameValuePairsSelector = createReportNameValuePairsSelector;
/**
 * Selector that creates a Set of archived report IDs from report name value pairs
 */
var archivedReportsIdSetSelector = function (all) {
    var ids = new Set();
    if (!all) {
        return ids;
    }
    for (var _i = 0, _a = Object.entries(all); _i < _a.length; _i++) {
        var _b = _a[_i], key = _b[0], value = _b[1];
        if ((0, ReportUtils_1.isArchivedReport)(value)) {
            ids.add(key);
        }
    }
    return ids;
};
exports.archivedReportsIdSetSelector = archivedReportsIdSetSelector;
