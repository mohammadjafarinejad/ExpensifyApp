"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
// eslint-disable-next-line no-restricted-syntax -- disabled because we need CurrencyUtils to mock
var CurrencyUtils = require("@libs/CurrencyUtils");
var Formula_1 = require("@libs/Formula");
// eslint-disable-next-line no-restricted-syntax -- disabled because we need ReportActionsUtils to mock
var ReportActionsUtils = require("@libs/ReportActionsUtils");
// eslint-disable-next-line no-restricted-syntax -- disabled because we need ReportUtils to mock
var ReportUtils = require("@libs/ReportUtils");
var CONST_1 = require("@src/CONST");
jest.mock('@libs/ReportActionsUtils', function () { return ({
    getAllReportActions: jest.fn(),
}); });
jest.mock('@libs/ReportUtils', function () { return (__assign(__assign({}, jest.requireActual('@libs/ReportUtils')), { getReportTransactions: jest.fn() })); });
jest.mock('@libs/CurrencyUtils', function () { return ({
    getCurrencySymbol: jest.fn(),
}); });
var mockReportActionsUtils = ReportActionsUtils;
var mockReportUtils = ReportUtils;
var mockCurrencyUtils = CurrencyUtils;
describe('CustomFormula', function () {
    describe('extract()', function () {
        test('should extract formula parts with default braces', function () {
            expect((0, Formula_1.extract)('{report:type} - {report:total}')).toEqual(['{report:type}', '{report:total}']);
        });
        test('should handle nested braces', function () {
            expect((0, Formula_1.extract)('{report:{report:submit:from:firstName|substr:2}}')).toEqual(['{report:{report:submit:from:firstName|substr:2}}']);
        });
        test('should handle escaped braces', function () {
            expect((0, Formula_1.extract)('\\{not-formula} {report:type}')).toEqual(['{report:type}']);
        });
        test('should handle empty formula', function () {
            expect((0, Formula_1.extract)('')).toEqual([]);
        });
        test('should handle formula without braces', function () {
            expect((0, Formula_1.extract)('no braces here')).toEqual([]);
        });
    });
    describe('parse()', function () {
        test('should parse report formula parts', function () {
            var parts = (0, Formula_1.parse)('{report:type} {report:startdate}');
            expect(parts).toHaveLength(3);
            expect(parts.at(0)).toEqual({
                definition: '{report:type}',
                type: 'report',
                fieldPath: ['type'],
                functions: [],
            });
            expect(parts.at(2)).toEqual({
                definition: '{report:startdate}',
                type: 'report',
                fieldPath: ['startdate'],
                functions: [],
            });
        });
        test('should parse field formula parts', function () {
            var parts = (0, Formula_1.parse)('{field:custom_field}');
            expect(parts.at(0)).toEqual({
                definition: '{field:custom_field}',
                type: 'field',
                fieldPath: ['custom_field'],
                functions: [],
            });
        });
        test('should parse user formula parts with functions', function () {
            var parts = (0, Formula_1.parse)('{user:email|frontPart}');
            expect(parts.at(0)).toEqual({
                definition: '{user:email|frontPart}',
                type: 'user',
                fieldPath: ['email'],
                functions: ['frontPart'],
            });
        });
        test('should handle empty formula', function () {
            expect((0, Formula_1.parse)('')).toEqual([]);
        });
        test('should treat formula without braces as free text', function () {
            var _a;
            var parts = (0, Formula_1.parse)('no braces here');
            expect(parts).toHaveLength(1);
            expect((_a = parts.at(0)) === null || _a === void 0 ? void 0 : _a.type).toBe('freetext');
        });
    });
    describe('compute()', function () {
        var mockContext = {
            report: {
                reportID: '123',
                reportName: '',
                type: 'expense',
                total: -10000, // -$100.00
                currency: 'USD',
                lastVisibleActionCreated: '2025-01-15T10:30:00Z',
                policyID: 'policy1',
            },
            policy: {
                name: 'Test Policy',
            },
        };
        beforeEach(function () {
            jest.clearAllMocks();
            mockCurrencyUtils.getCurrencySymbol.mockImplementation(function (currency) {
                if (currency === 'USD') {
                    return '$';
                }
                if (currency === 'EUR') {
                    return '€';
                }
                return currency;
            });
            var mockReportActions = {
                // eslint-disable-next-line @typescript-eslint/naming-convention
                '1': {
                    reportActionID: '1',
                    created: '2025-01-10T08:00:00Z', // Oldest action
                    actionName: 'CREATED',
                },
                // eslint-disable-next-line @typescript-eslint/naming-convention
                '2': {
                    reportActionID: '2',
                    created: '2025-01-15T10:30:00Z', // Later action
                    actionName: 'IOU',
                },
                // eslint-disable-next-line @typescript-eslint/naming-convention
                '3': {
                    reportActionID: '3',
                    created: '2025-01-12T14:20:00Z', // Middle action
                    actionName: 'COMMENT',
                },
            };
            var mockTransactions = [
                {
                    transactionID: 'trans1',
                    created: '2025-01-08T12:00:00Z', // Oldest transaction
                    amount: 5000,
                    merchant: 'ACME Ltd.',
                },
                {
                    transactionID: 'trans2',
                    created: '2025-01-14T16:45:00Z', // Later transaction
                    amount: 3000,
                    merchant: 'ACME Ltd.',
                },
                {
                    transactionID: 'trans3',
                    created: '2025-01-11T09:15:00Z', // Middle transaction
                    amount: 2000,
                    merchant: 'ACME Ltd.',
                },
            ];
            mockReportActionsUtils.getAllReportActions.mockReturnValue(mockReportActions);
            mockReportUtils.getReportTransactions.mockReturnValue(mockTransactions);
        });
        test('should compute basic report formula', function () {
            var result = (0, Formula_1.compute)('{report:type} {report:total}', mockContext);
            expect(result).toBe('Expense Report $100.00'); // No space between parts
        });
        test('should compute startdate formula using transactions', function () {
            var result = (0, Formula_1.compute)('{report:startdate}', mockContext);
            expect(result).toBe('2025-01-08'); // Should use oldest transaction date (2025-01-08)
        });
        test('should compute enddate formula using transactions', function () {
            var result = (0, Formula_1.compute)('{report:enddate}', mockContext);
            expect(result).toBe('2025-01-14'); // Should use newest transaction date (2025-01-14)
        });
        test('should compute created formula using report actions', function () {
            var result = (0, Formula_1.compute)('{report:created}', mockContext);
            expect(result).toBe('2025-01-10'); // Should use oldest report action date (2025-01-10)
        });
        test('should compute startdate with custom format', function () {
            var result = (0, Formula_1.compute)('{report:startdate:MM/dd/yyyy}', mockContext);
            expect(result).toBe('01/08/2025'); // Should use oldest transaction date with yyyy-MM-dd format
        });
        test('should compute enddate with custom format', function () {
            var result = (0, Formula_1.compute)('{report:enddate:MM/dd/yyyy}', mockContext);
            expect(result).toBe('01/14/2025'); // Should use newest transaction date with MM/dd/yyyy format
        });
        test('should compute created with custom format', function () {
            var result = (0, Formula_1.compute)('{report:created:MMMM dd, yyyy}', mockContext);
            expect(result).toBe('January 10, 2025'); // Should use oldest report action date with MMMM dd, yyyy format
        });
        test('should compute startdate with short month format', function () {
            var result = (0, Formula_1.compute)('{report:startdate:dd MMM yyyy}', mockContext);
            expect(result).toBe('08 Jan 2025'); // Should use oldest transaction date with dd MMM yyyy format
        });
        test('should compute enddate with short month format', function () {
            var result = (0, Formula_1.compute)('{report:enddate:dd MMM yyyy}', mockContext);
            expect(result).toBe('14 Jan 2025'); // Should use newest transaction date with dd MMM yyyy format
        });
        test('should compute policy name', function () {
            var result = (0, Formula_1.compute)('{report:policyname}', mockContext);
            expect(result).toBe('Test Policy');
        });
        test('should compute report ID in base62 format', function () {
            var result = (0, Formula_1.compute)('{report:id}', mockContext);
            expect(result).toBe('R0000000001z');
        });
        test('should compute report status', function () {
            var contextWithStatus = __assign(__assign({}, mockContext), { report: __assign(__assign({}, mockContext.report), { statusNum: CONST_1.default.REPORT.STATUS_NUM.SUBMITTED }) });
            var result = (0, Formula_1.compute)('{report:status}', contextWithStatus);
            expect(result).toBe('Submitted');
        });
        test('should compute expenses count', function () {
            var result = (0, Formula_1.compute)('{report:expensescount}', mockContext);
            expect(result).toBe('0');
        });
        test('should compute expenses count using allTransactions from context', function () {
            var allTransactions = {
                // eslint-disable-next-line @typescript-eslint/naming-convention
                transactions_trans1: {
                    transactionID: 'trans1',
                    reportID: '123',
                    created: '2025-01-08T12:00:00Z',
                    amount: 5000,
                    merchant: 'ACME Ltd.',
                },
                // eslint-disable-next-line @typescript-eslint/naming-convention
                transactions_trans2: {
                    transactionID: 'trans2',
                    reportID: '123',
                    created: '2025-01-14T16:45:00Z',
                    amount: 3000,
                    merchant: 'ACME Ltd.',
                },
                // eslint-disable-next-line @typescript-eslint/naming-convention
                transactions_trans3: {
                    transactionID: 'trans3',
                    reportID: '123',
                    created: '2025-01-11T09:15:00Z',
                    amount: 2000,
                    merchant: 'ACME Ltd.',
                },
            };
            var contextWithAllTransactions = __assign(__assign({}, mockContext), { allTransactions: allTransactions });
            var result = (0, Formula_1.compute)('{report:expensescount}', contextWithAllTransactions);
            expect(result).toBe('3');
            // Verify that getReportTransactions was NOT called when allTransactions is provided
            expect(mockReportUtils.getReportTransactions).not.toHaveBeenCalled();
        });
        test('should handle empty formula', function () {
            expect((0, Formula_1.compute)('', mockContext)).toBe('');
        });
        test('should handle unknown formula parts', function () {
            var result = (0, Formula_1.compute)('{report:unknown}', mockContext);
            expect(result).toBe('{report:unknown}');
        });
        test('should handle missing report data gracefully', function () {
            var contextWithMissingData = {
                report: {},
                policy: null,
            };
            var result = (0, Formula_1.compute)('{report:total} {report:policyname}', contextWithMissingData);
            expect(result).toBe('{report:total} {report:policyname}'); // Empty data is replaced with definition
        });
        test('should preserve free text', function () {
            var result = (0, Formula_1.compute)('Expense Report - {report:total}', mockContext);
            expect(result).toBe('Expense Report - $100.00');
        });
        test('should preserve exact spacing around formula parts', function () {
            var result = (0, Formula_1.compute)('Report with type after 4 spaces   {report:type}-and no space after computed part', mockContext);
            expect(result).toBe('Report with type after 4 spaces   Expense Report-and no space after computed part');
        });
        test('should compute complex formula with multiple new parts', function () {
            var contextWithStatus = __assign(__assign({}, mockContext), { report: __assign(__assign({}, mockContext.report), { transactionCount: 3, statusNum: CONST_1.default.REPORT.STATUS_NUM.APPROVED }) });
            var result = (0, Formula_1.compute)('Report {report:id} has {report:expensescount} expenses and is {report:status}', contextWithStatus);
            expect(result).toBe('Report R0000000001z has 3 expenses and is Approved');
        });
        test('should handle combination of new and existing formula parts', function () {
            var contextWithStatus = __assign(__assign({}, mockContext), { report: __assign(__assign({}, mockContext.report), { statusNum: CONST_1.default.REPORT.STATUS_NUM.SUBMITTED, transactionCount: 3 }) });
            var result = (0, Formula_1.compute)('{report:type} {report:id} - {report:status} - Total: {report:total} ({report:expensescount} expenses)', contextWithStatus);
            expect(result).toBe('Expense Report R0000000001z - Submitted - Total: $100.00 (3 expenses)');
        });
        test('should handle different status numbers', function () {
            var testCases = [
                { statusNum: CONST_1.default.REPORT.STATUS_NUM.OPEN, expected: 'Open' },
                { statusNum: CONST_1.default.REPORT.STATUS_NUM.SUBMITTED, expected: 'Submitted' },
                { statusNum: CONST_1.default.REPORT.STATUS_NUM.CLOSED, expected: 'Closed' },
                { statusNum: CONST_1.default.REPORT.STATUS_NUM.APPROVED, expected: 'Approved' },
                { statusNum: CONST_1.default.REPORT.STATUS_NUM.REIMBURSED, expected: 'Reimbursed' },
            ];
            testCases.forEach(function (_a) {
                var statusNum = _a.statusNum, expected = _a.expected;
                var contextWithStatus = __assign(__assign({}, mockContext), { report: __assign(__assign({}, mockContext.report), { statusNum: statusNum }) });
                var result = (0, Formula_1.compute)('{report:status}', contextWithStatus);
                expect(result).toBe(expected);
            });
        });
        test('should handle undefined status number', function () {
            var contextWithUndefinedStatus = __assign(__assign({}, mockContext), { report: __assign(__assign({}, mockContext.report), { statusNum: undefined }) });
            var result = (0, Formula_1.compute)('{report:status}', contextWithUndefinedStatus);
            expect(result).toBe('{report:status}');
        });
        test('should return 0 for expensescount when no transactions exist', function () {
            mockReportUtils.getReportTransactions.mockReturnValue([]);
            var result = (0, Formula_1.compute)('{report:expensescount}', mockContext);
            expect(result).toBe('0');
        });
        test('should return 0 for expensescount when reportID is empty', function () {
            var contextWithEmptyReportID = __assign(__assign({}, mockContext), { report: __assign(__assign({}, mockContext.report), { reportID: '' }) });
            var result = (0, Formula_1.compute)('{report:expensescount}', contextWithEmptyReportID);
            expect(result).toBe('0');
        });
        test('should compute report ID with different reportID values', function () {
            var contextWithDifferentID = __assign(__assign({}, mockContext), { report: __assign(__assign({}, mockContext.report), { reportID: '456789' }) });
            var result = (0, Formula_1.compute)('{report:id}', contextWithDifferentID);
            expect(result).toBe('R00000001upZ');
        });
    });
    describe('Reimbursable Amount', function () {
        var reimbursableContext = {
            report: {
                reportID: '123',
                reportName: '',
                type: 'expense',
                policyID: 'policy1',
            },
            policy: {
                name: 'Test Policy',
            },
        };
        var calculateExpectedReimbursable = function (total, nonReimbursableTotal) {
            var reimbursableAmount = total - nonReimbursableTotal;
            return Math.abs(reimbursableAmount) / 100;
        };
        beforeEach(function () {
            jest.clearAllMocks();
        });
        test('should compute reimbursable amount', function () {
            reimbursableContext.report.currency = 'USD';
            reimbursableContext.report.total = -10000; // -$100.00
            reimbursableContext.report.nonReimbursableTotal = -2500; // -$25.00
            var expectedReimbursable = calculateExpectedReimbursable(reimbursableContext.report.total, reimbursableContext.report.nonReimbursableTotal);
            var result = (0, Formula_1.compute)('{report:reimbursable}', reimbursableContext);
            expect(result).toBe("$".concat(expectedReimbursable.toFixed(2)));
        });
        test('should compute reimbursable amount with different currency', function () {
            reimbursableContext.report.currency = 'EUR';
            reimbursableContext.report.total = -8000; // -€80.00
            reimbursableContext.report.nonReimbursableTotal = -3000; // -€30.00
            var expectedReimbursable = calculateExpectedReimbursable(reimbursableContext.report.total, reimbursableContext.report.nonReimbursableTotal);
            var result = (0, Formula_1.compute)('{report:reimbursable}', reimbursableContext);
            expect(result).toBe("\u20AC".concat(expectedReimbursable.toFixed(2)));
        });
        test('should handle zero reimbursable amount', function () {
            reimbursableContext.report.currency = 'USD';
            reimbursableContext.report.total = -10000; // -$100.00
            reimbursableContext.report.nonReimbursableTotal = -10000; // -$100.00 (all non-reimbursable)
            var expectedReimbursable = calculateExpectedReimbursable(reimbursableContext.report.total, reimbursableContext.report.nonReimbursableTotal);
            var result = (0, Formula_1.compute)('{report:reimbursable}', reimbursableContext);
            expect(result).toBe("$".concat(expectedReimbursable.toFixed(2)));
        });
        test('should handle undefined reimbursable amount', function () {
            reimbursableContext.report.currency = 'USD';
            reimbursableContext.report.total = undefined;
            reimbursableContext.report.nonReimbursableTotal = undefined;
            var result = (0, Formula_1.compute)('{report:reimbursable}', reimbursableContext);
            expect(result).toBe('$0.00');
        });
        test('should handle missing currency gracefully', function () {
            reimbursableContext.report.currency = undefined;
            reimbursableContext.report.total = -10000; // -100.00
            reimbursableContext.report.nonReimbursableTotal = -2500; // -25.00
            var expectedReimbursable = calculateExpectedReimbursable(reimbursableContext.report.total, reimbursableContext.report.nonReimbursableTotal);
            mockCurrencyUtils.getCurrencySymbol.mockReturnValue(undefined);
            var result = (0, Formula_1.compute)('{report:reimbursable}', reimbursableContext);
            expect(result).toBe("".concat(expectedReimbursable.toFixed(2)));
        });
    });
    describe('Function Modifiers', function () {
        var mockContext = {
            report: {
                reportID: 'report123456789',
                reportName: '',
                type: 'expense',
                total: -10000, // -$100.00
                currency: 'USD',
                lastVisibleActionCreated: '2025-01-15T10:30:00Z',
                policyID: 'policy1',
            },
            policy: {
                name: 'Engineering Department Rules',
            },
        };
        beforeEach(function () {
            jest.clearAllMocks();
        });
        describe('frontpart modifier', function () {
            test('should extract front part of email', function () {
                var result = (0, Formula_1.compute)('{report:submit:from:email|frontpart}', mockContext);
                // Submit part extraction not implemented yet; for now, it returns the definition
                // Once implemented, this should return 'frontpart' of the email
                expect(result).toBe('{report:submit:from:email|frontpart}');
            });
            test('should extract first word from non-email text', function () {
                var result = (0, Formula_1.compute)('{report:policyname|frontpart}', mockContext);
                expect(result).toBe('Engineering'); // First word of "Engineering Department Rules"
            });
            test('should handle empty strings', function () {
                var contextWithEmpty = {
                    report: {},
                    policy: { name: '' },
                };
                var result = (0, Formula_1.compute)('{report:policyname|frontpart}', contextWithEmpty);
                expect(result).toBe('{report:policyname|frontpart}'); // Falls back to formula definition
            });
        });
        describe('domain modifier', function () {
            test('should extract domain from email', function () {
                var result = (0, Formula_1.compute)('{report:submit:from:email|domain}', mockContext);
                // Submit part extraction not implemented yet; for now, it returns the definition
                // Once implemented, this should return 'domain' of the email
                expect(result).toBe('');
            });
            test('should return empty for non-email text', function () {
                var result = (0, Formula_1.compute)('{report:policyname|domain}', mockContext);
                expect(result).toBe(''); // "Engineering Department Rules" has no @ symbol
            });
            test('should handle empty strings', function () {
                var contextWithEmpty = {
                    report: {},
                    policy: { name: '' },
                };
                var result = (0, Formula_1.compute)('{report:policyname|domain}', contextWithEmpty);
                expect(result).toBe(''); // Empty policy name
            });
        });
        describe('substr modifier', function () {
            test('should extract substring with start and length', function () {
                var result = (0, Formula_1.compute)('{report:policyname|substr:0:11}', mockContext);
                expect(result).toBe('Engineering'); // First 11 characters of "Engineering Department Rules"
            });
            test('should extract substring with only start position', function () {
                var result = (0, Formula_1.compute)('{report:policyname|substr:12}', mockContext);
                expect(result).toBe('Department Rules'); // From position 12 to end
            });
            test('should handle start position beyond string length', function () {
                var result = (0, Formula_1.compute)('{report:policyname|substr:50:10}', mockContext);
                expect(result).toBe(''); // Start position 50 is beyond string length
            });
            test('should handle length larger than remaining string', function () {
                var result = (0, Formula_1.compute)('{report:policyname|substr:23:50}', mockContext);
                expect(result).toBe('Rules'); // Only remaining characters
            });
            test('should handle invalid length parameter', function () {
                var result = (0, Formula_1.compute)('{report:policyname|substr:0:abc}', mockContext);
                expect(result).toBe(''); // Invalid length, returns empty
            });
        });
    });
    describe('Auto-reporting Frequency', function () {
        var mockReport = { reportID: '123' };
        var createMockContext = function (policy) { return ({ report: mockReport, policy: policy }); };
        beforeEach(function () {
            jest.clearAllMocks();
            jest.useFakeTimers();
            jest.setSystemTime(new Date('2025-01-19T14:23:45Z'));
        });
        afterEach(function () {
            jest.useRealTimers();
        });
        test('should compute weekly frequency dates', function () {
            var policy = { autoReportingFrequency: CONST_1.default.POLICY.AUTO_REPORTING_FREQUENCIES.WEEKLY };
            var context = createMockContext(policy);
            expect((0, Formula_1.compute)('{report:autoreporting:start}', context)).toBe('2025-01-13');
            expect((0, Formula_1.compute)('{report:autoreporting:end}', context)).toBe('2025-01-19');
        });
        test('should compute semi-monthly frequency dates', function () {
            jest.setSystemTime(new Date('2025-01-10T12:00:00Z'));
            var policy = { autoReportingFrequency: CONST_1.default.POLICY.AUTO_REPORTING_FREQUENCIES.SEMI_MONTHLY };
            var context = createMockContext(policy);
            expect((0, Formula_1.compute)('{report:autoreporting:start}', context)).toBe('2025-01-01');
            expect((0, Formula_1.compute)('{report:autoreporting:end}', context)).toBe('2025-01-15');
            jest.setSystemTime(new Date('2025-01-20T12:00:00Z'));
            expect((0, Formula_1.compute)('{report:autoreporting:start}', context)).toBe('2025-01-16');
            expect((0, Formula_1.compute)('{report:autoreporting:end}', context)).toBe('2025-01-31');
        });
        test('should compute monthly frequency with specific offset', function () {
            var policy = {
                autoReportingFrequency: CONST_1.default.POLICY.AUTO_REPORTING_FREQUENCIES.MONTHLY,
                autoReportingOffset: 25,
            };
            var context = createMockContext(policy);
            expect((0, Formula_1.compute)('{report:autoreporting:start}', context)).toBe('2024-12-26');
            expect((0, Formula_1.compute)('{report:autoreporting:end}', context)).toBe('2025-01-25');
        });
        test('should compute monthly frequency with last business day', function () {
            var policy = {
                autoReportingFrequency: CONST_1.default.POLICY.AUTO_REPORTING_FREQUENCIES.MONTHLY,
                autoReportingOffset: CONST_1.default.POLICY.AUTO_REPORTING_OFFSET.LAST_BUSINESS_DAY_OF_MONTH,
            };
            var context = createMockContext(policy);
            expect((0, Formula_1.compute)('{report:autoreporting:start}', context)).toBe('2025-01-01');
            expect((0, Formula_1.compute)('{report:autoreporting:end}', context)).toBe('2025-01-31');
        });
        test('should compute trip frequency dates', function () {
            var mockTransactions = [
                { transactionID: 'trans1', created: '2025-01-08T12:00:00Z', merchant: 'Hotel', amount: 5000 },
                { transactionID: 'trans2', created: '2025-01-14T16:45:00Z', merchant: 'Restaurant', amount: 3000 },
            ];
            mockReportUtils.getReportTransactions.mockReturnValue(mockTransactions);
            var policy = { autoReportingFrequency: CONST_1.default.POLICY.AUTO_REPORTING_FREQUENCIES.TRIP };
            var context = createMockContext(policy);
            expect((0, Formula_1.compute)('{report:autoreporting:start}', context)).toBe('2025-01-08');
            expect((0, Formula_1.compute)('{report:autoreporting:end}', context)).toBe('2025-01-19');
        });
        test('should apply custom date formats', function () {
            var policy = { autoReportingFrequency: CONST_1.default.POLICY.AUTO_REPORTING_FREQUENCIES.WEEKLY };
            var context = createMockContext(policy);
            expect((0, Formula_1.compute)('{report:autoreporting:start:MMMM dd, yyyy}', context)).toBe('January 13, 2025');
            expect((0, Formula_1.compute)('{report:autoreporting:end:MM/dd/yyyy}', context)).toBe('01/19/2025');
        });
        test('should return formula definition when policy or frequency is missing', function () {
            expect((0, Formula_1.compute)('{report:autoreporting:start}', { report: mockReport, policy: undefined })).toBe('{report:autoreporting:start}');
            expect((0, Formula_1.compute)('{report:autoreporting:end}', createMockContext({}))).toBe('{report:autoreporting:end}');
        });
    });
    describe('Edge Cases', function () {
        test('should handle malformed braces', function () {
            var _a;
            var parts = (0, Formula_1.parse)('{incomplete');
            expect((_a = parts.at(0)) === null || _a === void 0 ? void 0 : _a.type).toBe('freetext');
        });
        test('should handle undefined amounts', function () {
            var context = {
                report: { total: undefined },
                policy: null,
            };
            var result = (0, Formula_1.compute)('{report:total}', context);
            expect(result).toBe('{report:total}');
        });
        test('should handle missing report actions for created', function () {
            mockReportActionsUtils.getAllReportActions.mockReturnValue({});
            var context = {
                report: { reportID: '123' },
                policy: null,
            };
            var result = (0, Formula_1.compute)('{report:created}', context);
            expect(result).toBe('{report:created}');
        });
        test('should handle missing transactions for startdate', function () {
            mockReportUtils.getReportTransactions.mockReturnValue([]);
            var context = {
                report: { reportID: '123' },
                policy: null,
            };
            var today = new Date();
            var expected = "".concat(today.getFullYear(), "-").concat(String(today.getMonth() + 1).padStart(2, '0'), "-").concat(String(today.getDate()).padStart(2, '0'));
            var result = (0, Formula_1.compute)('{report:startdate}', context);
            expect(result).toBe(expected);
        });
        test('should handle missing transactions for enddate', function () {
            mockReportUtils.getReportTransactions.mockReturnValue([]);
            var context = {
                report: { reportID: '123' },
                policy: null,
            };
            var today = new Date();
            var expected = "".concat(today.getFullYear(), "-").concat(String(today.getMonth() + 1).padStart(2, '0'), "-").concat(String(today.getDate()).padStart(2, '0'));
            var result = (0, Formula_1.compute)('{report:enddate}', context);
            expect(result).toBe(expected);
        });
        test('should call getReportTransactions with correct reportID for startdate', function () {
            var context = {
                report: { reportID: 'test-report-123' },
                policy: null,
            };
            (0, Formula_1.compute)('{report:startdate}', context);
            expect(mockReportUtils.getReportTransactions).toHaveBeenCalledWith('test-report-123');
        });
        test('should call getAllReportActions with correct reportID for created', function () {
            var context = {
                report: { reportID: 'test-report-456' },
                policy: null,
            };
            (0, Formula_1.compute)('{report:created}', context);
            expect(mockReportActionsUtils.getAllReportActions).toHaveBeenCalledWith('test-report-456');
        });
        test('should skip partial transactions (empty merchant)', function () {
            var mockTransactions = [
                {
                    transactionID: 'trans1',
                    created: '2025-01-15T12:00:00Z',
                    amount: 5000,
                    merchant: 'ACME Ltd.',
                },
                {
                    transactionID: 'trans2',
                    created: '2025-01-08T16:45:00Z', // Older but partial
                    amount: 3000,
                    merchant: '', // Empty merchant = partial
                },
                {
                    transactionID: 'trans3',
                    created: '2025-01-12T09:15:00Z', // Should be oldest valid
                    amount: 2000,
                    merchant: 'Gamma Inc.',
                },
            ];
            mockReportUtils.getReportTransactions.mockReturnValue(mockTransactions);
            var context = {
                report: { reportID: 'test-report-123' },
                policy: null,
            };
            var result = (0, Formula_1.compute)('{report:startdate}', context);
            expect(result).toBe('2025-01-12');
            var endResult = (0, Formula_1.compute)('{report:enddate}', context);
            expect(endResult).toBe('2025-01-15');
        });
        test('should skip partial transactions (zero amount)', function () {
            var mockTransactions = [
                {
                    transactionID: 'trans1',
                    created: '2025-01-15T12:00:00Z',
                    amount: 5000,
                    merchant: 'ACME Ltd.',
                },
                {
                    transactionID: 'trans2',
                    created: '2025-01-08T16:45:00Z', // Older but partial
                    amount: 0, // Zero amount = partial
                    merchant: 'Beta Corp.',
                    iouRequestType: CONST_1.default.IOU.REQUEST_TYPE.SCAN,
                },
                {
                    transactionID: 'trans3',
                    created: '2025-01-12T09:15:00Z', // Should be oldest valid
                    amount: 2000,
                    merchant: 'Gamma Inc.',
                },
            ];
            mockReportUtils.getReportTransactions.mockReturnValue(mockTransactions);
            var context = {
                report: { reportID: 'test-report-123' },
                policy: null,
            };
            var result = (0, Formula_1.compute)('{report:startdate}', context);
            expect(result).toBe('2025-01-12');
            var endResult = (0, Formula_1.compute)('{report:enddate}', context);
            expect(endResult).toBe('2025-01-15');
        });
    });
    describe('Date Format Tokens', function () {
        // Test date: Wednesday, January 8, 2025, 3:30:45 PM (15:30:45) UTC
        var testDate = '2025-01-08T15:30:45.123Z';
        var morningDate = '2025-01-08T09:05:02.123Z'; // 9:05:02 AM for leading zero tests
        var mockContextWithDate = {
            report: { reportID: '123' },
            policy: null,
        };
        var setupMockDate = function (date) {
            var mockTransaction = {
                transactionID: 'trans1',
                created: date,
                amount: -5000,
                merchant: 'Test Store',
            };
            mockReportUtils.getReportTransactions.mockReturnValue([mockTransaction]);
            var mockReportAction = {
                created: date,
                actionName: CONST_1.default.REPORT.ACTIONS.TYPE.CREATED,
            };
            mockReportActionsUtils.getAllReportActions.mockReturnValue({ action1: mockReportAction });
        };
        beforeEach(function () { return setupMockDate(testDate); });
        test('year formats - yyyy/yy/Y/y/YYYY', function () {
            expect((0, Formula_1.compute)('{report:startdate:yyyy}', mockContextWithDate)).toBe('2025');
            expect((0, Formula_1.compute)('{report:startdate:YYYY}', mockContextWithDate)).toBe('2025');
            expect((0, Formula_1.compute)('{report:startdate:Y}', mockContextWithDate)).toBe('2025');
            expect((0, Formula_1.compute)('{report:startdate:yy}', mockContextWithDate)).toBe('25');
            expect((0, Formula_1.compute)('{report:startdate:y}', mockContextWithDate)).toBe('25');
        });
        test('month formats - names and numbers', function () {
            expect((0, Formula_1.compute)('{report:startdate:MMMM}', mockContextWithDate)).toBe('January');
            expect((0, Formula_1.compute)('{report:startdate:F}', mockContextWithDate)).toBe('January');
            expect((0, Formula_1.compute)('{report:startdate:MMM}', mockContextWithDate)).toBe('Jan');
            expect((0, Formula_1.compute)('{report:startdate:M}', mockContextWithDate)).toBe('Jan');
            expect((0, Formula_1.compute)('{report:startdate:MM}', mockContextWithDate)).toBe('01');
            expect((0, Formula_1.compute)('{report:startdate:n}', mockContextWithDate)).toBe('1');
            expect((0, Formula_1.compute)('{report:startdate:t}', mockContextWithDate)).toBe('31');
        });
        test('day formats - numbers and names', function () {
            expect((0, Formula_1.compute)('{report:startdate:dd}', mockContextWithDate)).toBe('08');
            expect((0, Formula_1.compute)('{report:startdate:d}', mockContextWithDate)).toBe('08');
            expect((0, Formula_1.compute)('{report:startdate:j}', mockContextWithDate)).toBe('8');
            expect((0, Formula_1.compute)('{report:startdate:S}', mockContextWithDate)).toBe('th');
            expect((0, Formula_1.compute)('{report:startdate:jS}', mockContextWithDate)).toBe('8th');
            expect((0, Formula_1.compute)('{report:startdate:dddd}', mockContextWithDate)).toBe('Wednesday');
            expect((0, Formula_1.compute)('{report:startdate:l}', mockContextWithDate)).toBe('Wednesday');
            expect((0, Formula_1.compute)('{report:startdate:ddd}', mockContextWithDate)).toBe('Wed');
            expect((0, Formula_1.compute)('{report:startdate:D}', mockContextWithDate)).toBe('Wed');
            expect((0, Formula_1.compute)('{report:startdate:w}', mockContextWithDate)).toBe('3');
            expect((0, Formula_1.compute)('{report:startdate:N}', mockContextWithDate)).toBe('3');
            expect((0, Formula_1.compute)('{report:startdate:z}', mockContextWithDate)).toBe('7');
            expect((0, Formula_1.compute)('{report:startdate:W}', mockContextWithDate)).toBe('02');
        });
        test('ISO week number - first Thursday rule', function () {
            // January 1, 2021 is a Friday
            // Week 1 of 2021 contains the first Thursday (Jan 7)
            // So Jan 1-3 (Fri, Sat, Sun) belong to week 53 of 2020
            setupMockDate('2021-01-01T12:00:00Z'); // Friday, Jan 1, 2021
            expect((0, Formula_1.compute)('{report:startdate:W}', mockContextWithDate)).toBe('53');
            // January 4 is Monday, which is in week 1
            setupMockDate('2021-01-04T12:00:00Z'); // Monday, Jan 4, 2021
            expect((0, Formula_1.compute)('{report:startdate:W}', mockContextWithDate)).toBe('01');
            // December 31, 2020 is Thursday, should be week 53
            setupMockDate('2020-12-31T12:00:00Z'); // Thursday, Dec 31, 2020
            expect((0, Formula_1.compute)('{report:startdate:W}', mockContextWithDate)).toBe('53');
        });
        test('complex date formats', function () {
            expect((0, Formula_1.compute)('{report:startdate:MMMM dd, yyyy}', mockContextWithDate)).toBe('January 08, 2025');
            expect((0, Formula_1.compute)('{report:startdate:dd MMM yyyy}', mockContextWithDate)).toBe('08 Jan 2025');
            expect((0, Formula_1.compute)('{report:startdate:yyyy-MM-dd}', mockContextWithDate)).toBe('2025-01-08');
        });
        test('time formats - hours', function () {
            // 24-hour format: 15:30:45 (afternoon) and 09:05:02 (morning with leading zero)
            expect((0, Formula_1.compute)('{report:startdate:HH}', mockContextWithDate)).toBe('15');
            expect((0, Formula_1.compute)('{report:startdate:H}', mockContextWithDate)).toBe('15');
            expect((0, Formula_1.compute)('{report:startdate:G}', mockContextWithDate)).toBe('15');
            setupMockDate(morningDate);
            expect((0, Formula_1.compute)('{report:startdate:HH}', mockContextWithDate)).toBe('09');
            expect((0, Formula_1.compute)('{report:startdate:H}', mockContextWithDate)).toBe('09'); // H has leading zeros per spec
            expect((0, Formula_1.compute)('{report:startdate:G}', mockContextWithDate)).toBe('9'); // G has NO leading zeros
            // 12-hour format: 3:30 PM (afternoon) and 9:05 AM (morning)
            setupMockDate(testDate);
            expect((0, Formula_1.compute)('{report:startdate:hh}', mockContextWithDate)).toBe('03');
            expect((0, Formula_1.compute)('{report:startdate:h}', mockContextWithDate)).toBe('03'); // h has leading zeros per spec
            expect((0, Formula_1.compute)('{report:startdate:g}', mockContextWithDate)).toBe('3'); // g has NO leading zeros
            setupMockDate(morningDate);
            expect((0, Formula_1.compute)('{report:startdate:hh}', mockContextWithDate)).toBe('09');
            expect((0, Formula_1.compute)('{report:startdate:h}', mockContextWithDate)).toBe('09'); // h has leading zeros per spec
            expect((0, Formula_1.compute)('{report:startdate:g}', mockContextWithDate)).toBe('9'); // g has NO leading zeros
        });
        test('time formats - minutes and seconds', function () {
            // Minutes: 30 (double digit) and 05 (single digit with leading zero)
            setupMockDate(testDate);
            expect((0, Formula_1.compute)('{report:startdate:mm}', mockContextWithDate)).toBe('30');
            expect((0, Formula_1.compute)('{report:startdate:i}', mockContextWithDate)).toBe('30');
            setupMockDate(morningDate);
            expect((0, Formula_1.compute)('{report:startdate:mm}', mockContextWithDate)).toBe('05');
            expect((0, Formula_1.compute)('{report:startdate:i}', mockContextWithDate)).toBe('05');
            // Seconds: 45 (double digit) and 02 (single digit with leading zero)
            setupMockDate(testDate);
            expect((0, Formula_1.compute)('{report:startdate:ss}', mockContextWithDate)).toBe('45');
            expect((0, Formula_1.compute)('{report:startdate:s}', mockContextWithDate)).toBe('45');
            setupMockDate(morningDate);
            expect((0, Formula_1.compute)('{report:startdate:ss}', mockContextWithDate)).toBe('02');
            expect((0, Formula_1.compute)('{report:startdate:s}', mockContextWithDate)).toBe('02');
        });
        test('time formats - AM/PM', function () {
            expect((0, Formula_1.compute)('{report:startdate:tt}', mockContextWithDate)).toBe('PM');
            expect((0, Formula_1.compute)('{report:startdate:A}', mockContextWithDate)).toBe('PM');
            expect((0, Formula_1.compute)('{report:startdate:a}', mockContextWithDate)).toBe('pm');
        });
        test('full date/time formats - c, r, U', function () {
            // ISO 8601 format (c token)
            var cResult = (0, Formula_1.compute)('{report:startdate:c}', mockContextWithDate);
            expect(cResult).toBe('2025-01-08T15:30:45.123Z');
            // RFC 2822 format (r token)
            var rResult = (0, Formula_1.compute)('{report:startdate:r}', mockContextWithDate);
            expect(rResult).toMatch(/^Wed, 08 Jan 2025 \d{2}:\d{2}:\d{2} [+-]\d{4}$/);
            // Unix timestamp (U token)
            var uResult = (0, Formula_1.compute)('{report:startdate:U}', mockContextWithDate);
            var expectedTimestamp = Math.floor(new Date(testDate).getTime() / 1000).toString();
            expect(uResult).toBe(expectedTimestamp);
        });
        test('format strings with colons', function () {
            expect((0, Formula_1.compute)('{report:startdate:HH:mm}', mockContextWithDate)).toBe('15:30');
            expect((0, Formula_1.compute)('{report:startdate:HH:mm:ss}', mockContextWithDate)).toBe('15:30:45');
            expect((0, Formula_1.compute)('{report:startdate:hh:mm tt}', mockContextWithDate)).toBe('03:30 PM');
            expect((0, Formula_1.compute)('{report:startdate:yyyy-MM-dd HH:mm:ss}', mockContextWithDate)).toBe('2025-01-08 15:30:45');
            expect((0, Formula_1.compute)('{report:created:HH:mm:ss}', mockContextWithDate)).toBe('15:30:45');
            expect((0, Formula_1.compute)('{report:startdate:g:i a}', mockContextWithDate)).toBe('3:30 pm');
        });
    });
    describe('hasCircularReferences()', function () {
        // Given the example data of consisting of report field lists
        var fieldList = {
            test0: { name: 'test-o', defaultValue: 'test value' },
            test1: { name: 'test-a', defaultValue: '{field:test-example}' },
            test2: { name: 'test-b', defaultValue: '{field:test-a}' },
            test3: { name: 'test-c', defaultValue: '{field:test-b}' },
            test4: { name: 'test-d', defaultValue: '' },
            test6: { name: 'test-f', defaultValue: '{field:test-d}' },
        };
        // Then make sure the circular references work as expected
        test('should detect 2-level circular reference', function () {
            expect((0, Formula_1.hasCircularReferences)('{field:test-b}', 'test-example', fieldList)).toBe(true);
        });
        test('should detect circular reference with mixed text', function () {
            expect((0, Formula_1.hasCircularReferences)('text {field:test-a}', 'test-example', fieldList)).toBe(true);
        });
        test('should detect direct self-reference', function () {
            expect((0, Formula_1.hasCircularReferences)('{field:test-example}', 'test-example', fieldList)).toBe(true);
        });
        test('should detect more than > 2 level circular reference', function () {
            expect((0, Formula_1.hasCircularReferences)('{field:test-c}', 'test-example', fieldList)).toBe(true);
        });
        test('should allow when there is no circular references', function () {
            expect((0, Formula_1.hasCircularReferences)('{field:test-o}', 'test-example', fieldList)).toBe(false);
        });
        test('should return false when there is no formula field', function () {
            expect((0, Formula_1.hasCircularReferences)('hi test', 'test-example', fieldList)).toBe(false);
        });
    });
});
