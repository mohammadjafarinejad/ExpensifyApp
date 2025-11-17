"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TaskUtils_1 = require("../../../src/libs/TaskUtils");
var reports_1 = require("../../utils/collections/reports");
jest.mock('../../../src/libs/Localize');
describe('TaskUtils', function () {
    describe('getTaskTitle', function () {
        it('should return the task title from the report', function () {
            var taskReport = (0, reports_1.createRegularTaskReport)(1, 123);
            taskReport.reportName = '<b>Task</b> Title';
            expect((0, TaskUtils_1.getTaskTitle)(taskReport)).toBe('Task Title');
        });
        it('should return the fallback title if reportName is not present', function () {
            var taskReport = { reportID: '123' };
            expect((0, TaskUtils_1.getTaskTitle)(taskReport, 'Fallback Title')).toBe('Fallback Title');
        });
        it('should return the fallback title if reportID is not present', function () {
            var taskReport = (0, reports_1.createRegularTaskReport)(1, 123);
            taskReport.reportID = '';
            expect((0, TaskUtils_1.getTaskTitle)(taskReport, 'Fallback Title')).toBe('Fallback Title');
        });
        it('should return the title in markdown if shouldReturnMarkdown is true', function () {
            var taskReport = (0, reports_1.createRegularTaskReport)(1, 123);
            taskReport.reportName = '<b>Task</b> Title';
            expect((0, TaskUtils_1.getTaskTitle)(taskReport, '', true)).toBe('*Task* Title');
        });
    });
});
