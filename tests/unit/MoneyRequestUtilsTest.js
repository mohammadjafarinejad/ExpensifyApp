"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MoneyRequestUtils_1 = require("@libs/MoneyRequestUtils");
describe('ReportActionsUtils', function () {
    describe('validateAmount', function () {
        it('should pass the validation when amount is within the max digit and decimal', function () {
            expect((0, MoneyRequestUtils_1.validateAmount)('12345678', 2, 8)).toBe(true);
            expect((0, MoneyRequestUtils_1.validateAmount)('12345678', 0, 8)).toBe(true);
            expect((0, MoneyRequestUtils_1.validateAmount)('12345678.12', 2, 8)).toBe(true);
            expect((0, MoneyRequestUtils_1.validateAmount)('1234567.1', 2, 8)).toBe(true);
            expect((0, MoneyRequestUtils_1.validateAmount)('12345678.123', 3, 8)).toBe(true);
            expect((0, MoneyRequestUtils_1.validateAmount)('1234.1234', 4, 4)).toBe(true);
        });
        it("shouldn't pass the validation when amount is bigger than the max digit and decimal", function () {
            expect((0, MoneyRequestUtils_1.validateAmount)('12345678.123', 2, 8)).toBe(false);
            expect((0, MoneyRequestUtils_1.validateAmount)('12345678.1', 0, 8)).toBe(false);
            expect((0, MoneyRequestUtils_1.validateAmount)('123456789.12', 2, 8)).toBe(false);
            expect((0, MoneyRequestUtils_1.validateAmount)('123456789.1234', 3, 8)).toBe(false);
            expect((0, MoneyRequestUtils_1.validateAmount)('1234.12345', 4, 4)).toBe(false);
        });
    });
    describe('handleNegativeAmountFlipping', function () {
        it('should toggle negative and remove dash when allowFlippingAmount is true and amount starts with -', function () {
            var mockToggleNegative = jest.fn();
            var result = (0, MoneyRequestUtils_1.handleNegativeAmountFlipping)('-123.45', true, mockToggleNegative);
            expect(mockToggleNegative).toHaveBeenCalledTimes(1);
            expect(result).toBe('123.45');
        });
        it('should not toggle negative when allowFlippingAmount is false', function () {
            var mockToggleNegative = jest.fn();
            var result = (0, MoneyRequestUtils_1.handleNegativeAmountFlipping)('-123.45', false, mockToggleNegative);
            expect(mockToggleNegative).not.toHaveBeenCalled();
            expect(result).toBe('-123.45');
        });
        it('should not toggle negative when amount does not start with -', function () {
            var mockToggleNegative = jest.fn();
            var result = (0, MoneyRequestUtils_1.handleNegativeAmountFlipping)('123.45', true, mockToggleNegative);
            expect(mockToggleNegative).not.toHaveBeenCalled();
            expect(result).toBe('123.45');
        });
        it('should work without toggleNegative function', function () {
            var result = (0, MoneyRequestUtils_1.handleNegativeAmountFlipping)('-123.45', true);
            expect(result).toBe('123.45');
        });
        it('should return original amount when allowFlippingAmount is false and no dash', function () {
            var mockToggleNegative = jest.fn();
            var result = (0, MoneyRequestUtils_1.handleNegativeAmountFlipping)('123.45', false, mockToggleNegative);
            expect(mockToggleNegative).not.toHaveBeenCalled();
            expect(result).toBe('123.45');
        });
        it('should handle empty string', function () {
            var mockToggleNegative = jest.fn();
            var result = (0, MoneyRequestUtils_1.handleNegativeAmountFlipping)('', true, mockToggleNegative);
            expect(mockToggleNegative).not.toHaveBeenCalled();
            expect(result).toBe('');
        });
        it('should handle string with only dash', function () {
            var mockToggleNegative = jest.fn();
            var result = (0, MoneyRequestUtils_1.handleNegativeAmountFlipping)('-', true, mockToggleNegative);
            expect(mockToggleNegative).toHaveBeenCalledTimes(1);
            expect(result).toBe('');
        });
    });
});
