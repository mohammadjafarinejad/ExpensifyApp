"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var WorkspaceReportFieldUtils_1 = require("@libs/WorkspaceReportFieldUtils");
describe('WorkspaceReportFieldUtils.hasFormulaPartsInInitialValue', function () {
    it('returns true for recognized formula tokens', function () {
        var truthyCases = [
            '{report:id}',
            'prefix {report:type} suffix',
            'Report created on {report:created}',
            'User email {user:email}',
            'Formatted date {report:created:yyyy-MM-dd}',
            'Field value {field:customField}',
        ];
        truthyCases.forEach(function (value) {
            expect((0, WorkspaceReportFieldUtils_1.hasFormulaPartsInInitialValue)(value)).toBe(true);
        });
    });
    it('returns false for plain text and non-formula braces', function () {
        var falsyCases = [
            '',
            'plain text',
            '{}',
            '{ not a formula }',
            '{foo}',
            '{abc:def}',
            // escaped braces should not be treated as formula
            '\\{report:id\\}',
        ];
        falsyCases.forEach(function (value) {
            expect((0, WorkspaceReportFieldUtils_1.hasFormulaPartsInInitialValue)(value)).toBe(false);
        });
    });
    it('handles multiple parts and mixed content correctly', function () {
        expect((0, WorkspaceReportFieldUtils_1.hasFormulaPartsInInitialValue)('{report:id}{report:type}')).toBe(true);
        expect((0, WorkspaceReportFieldUtils_1.hasFormulaPartsInInitialValue)('text {abc} text')).toBe(false);
        expect((0, WorkspaceReportFieldUtils_1.hasFormulaPartsInInitialValue)('text {user:email|frontPart} text')).toBe(true);
    });
});
