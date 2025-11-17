"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CountryUtils_1 = require("@libs/CountryUtils");
describe('CountryUtils', function () {
    describe('getCountryCode', function () {
        it('should return the same value if it is already a valid country code', function () {
            expect((0, CountryUtils_1.getCountryCode)('US')).toBe('US');
            expect((0, CountryUtils_1.getCountryCode)('CA')).toBe('CA');
            expect((0, CountryUtils_1.getCountryCode)('GB')).toBe('GB');
            expect((0, CountryUtils_1.getCountryCode)('EG')).toBe('EG');
        });
        it('should return the country code when given a country name', function () {
            expect((0, CountryUtils_1.getCountryCode)('United States')).toBe('US');
            expect((0, CountryUtils_1.getCountryCode)('Canada')).toBe('CA');
            expect((0, CountryUtils_1.getCountryCode)('United Kingdom')).toBe('GB');
            expect((0, CountryUtils_1.getCountryCode)('Egypt')).toBe('EG');
        });
        it('should return original value for invalid country names or codes', function () {
            expect((0, CountryUtils_1.getCountryCode)('Invalid Country')).toBe('Invalid Country');
            expect((0, CountryUtils_1.getCountryCode)('XX')).toBe('XX');
            expect((0, CountryUtils_1.getCountryCode)('123')).toBe('123');
            expect((0, CountryUtils_1.getCountryCode)('MISSING TRANSLATION')).toBe('MISSING TRANSLATION');
        });
        it('should handle edge cases with special characters', function () {
            expect((0, CountryUtils_1.getCountryCode)('Bosnia & Herzegovina')).toBe('BA');
        });
        it('should be case sensitive for country names', function () {
            expect((0, CountryUtils_1.getCountryCode)('united states')).toBe('united states');
            expect((0, CountryUtils_1.getCountryCode)('UNITED STATES')).toBe('UNITED STATES');
            expect((0, CountryUtils_1.getCountryCode)('United States')).toBe('US');
        });
        it('should convert common country names to codes', function () {
            expect((0, CountryUtils_1.getCountryCode)('United States')).toBe('US');
        });
        it('should handle multiple country formats correctly', function () {
            var testCases = [
                { name: 'Afghanistan', code: 'AF' },
                { name: 'Australia', code: 'AU' },
                { name: 'Brazil', code: 'BR' },
                { name: 'China', code: 'CN' },
                { name: 'France', code: 'FR' },
                { name: 'Germany', code: 'DE' },
                { name: 'India', code: 'IN' },
                { name: 'Japan', code: 'JP' },
                { name: 'Mexico', code: 'MX' },
                { name: 'Russia', code: 'RU' },
            ];
            testCases.forEach(function (_a) {
                var name = _a.name, code = _a.code;
                expect((0, CountryUtils_1.getCountryCode)(name)).toBe(code);
                expect((0, CountryUtils_1.getCountryCode)(code)).toBe(code);
            });
        });
    });
    describe('normalizeCountryCode', function () {
        it('should return undefined when data is undefined', function () {
            expect((0, CountryUtils_1.normalizeCountryCode)(undefined)).toBeUndefined();
        });
        it('should return data unchanged when country field is missing', function () {
            var data = { street: '123 Main St', city: 'New York', state: 'NY' };
            expect((0, CountryUtils_1.normalizeCountryCode)(data)).toEqual(data);
        });
        it('should return data unchanged when country is undefined', function () {
            var data = { street: '123 Main St', city: 'New York', state: 'NY', country: undefined };
            expect((0, CountryUtils_1.normalizeCountryCode)(data)).toEqual(data);
        });
        it('should convert country name to country code', function () {
            var data = { street: '123 Main St', city: 'New York', state: 'NY', country: 'United States' };
            var result = (0, CountryUtils_1.normalizeCountryCode)(data);
            expect(result).toEqual({ street: '123 Main St', city: 'New York', state: 'NY', country: 'US' });
        });
        it('should preserve country code if already a valid code', function () {
            var data = { street: '456 Oak Ave', city: 'Toronto', state: 'ON', country: 'CA' };
            var result = (0, CountryUtils_1.normalizeCountryCode)(data);
            expect(result).toEqual({ street: '456 Oak Ave', city: 'Toronto', state: 'ON', country: 'CA' });
        });
        it('should handle multiple country name conversions', function () {
            var testCases = [
                { input: 'United States', expected: 'US' },
                { input: 'Canada', expected: 'CA' },
                { input: 'United Kingdom', expected: 'GB' },
                { input: 'Germany', expected: 'DE' },
                { input: 'France', expected: 'FR' },
                { input: 'Japan', expected: 'JP' },
                { input: 'Australia', expected: 'AU' },
            ];
            testCases.forEach(function (_a) {
                var input = _a.input, expected = _a.expected;
                var data = { street: '789 Test St', city: 'Test City', country: input };
                var result = (0, CountryUtils_1.normalizeCountryCode)(data);
                expect(result === null || result === void 0 ? void 0 : result.country).toBe(expected);
            });
        });
        it('should preserve invalid country values', function () {
            var data = { street: '789 Test St', city: 'Test City', country: 'Invalid Country' };
            var result = (0, CountryUtils_1.normalizeCountryCode)(data);
            expect(result).toEqual({ street: '789 Test St', city: 'Test City', country: 'Invalid Country' });
        });
        it('should handle special characters in country names', function () {
            var data = { street: '123 Main St', city: 'Sarajevo', country: 'Bosnia & Herzegovina' };
            var result = (0, CountryUtils_1.normalizeCountryCode)(data);
            expect(result).toEqual({ street: '123 Main St', city: 'Sarajevo', country: 'BA' });
        });
        it('should be case sensitive when normalizing country names', function () {
            var dataLowerCase = { street: '789 Test St', city: 'Test City', country: 'united states' };
            var dataUpperCase = { street: '789 Test St', city: 'Test City', country: 'UNITED STATES' };
            var dataProperCase = { street: '789 Test St', city: 'Test City', country: 'United States' };
            expect((0, CountryUtils_1.normalizeCountryCode)(dataLowerCase)).toEqual({ street: '789 Test St', city: 'Test City', country: 'united states' });
            expect((0, CountryUtils_1.normalizeCountryCode)(dataUpperCase)).toEqual({ street: '789 Test St', city: 'Test City', country: 'UNITED STATES' });
            expect((0, CountryUtils_1.normalizeCountryCode)(dataProperCase)).toEqual({ street: '789 Test St', city: 'Test City', country: 'US' });
        });
        it('should preserve all other fields in the data object', function () {
            var data = {
                street: '123 Main St',
                city: 'Los Angeles',
                state: 'CA',
                zipCode: '90001',
                country: 'United States',
            };
            var result = (0, CountryUtils_1.normalizeCountryCode)(data);
            expect(result).toEqual({
                street: '123 Main St',
                city: 'Los Angeles',
                state: 'CA',
                zipCode: '90001',
                country: 'US',
            });
        });
        it('should handle MISSING TRANSLATION value', function () {
            var data = { street: '789 Test St', city: 'Test City', country: 'MISSING TRANSLATION' };
            var result = (0, CountryUtils_1.normalizeCountryCode)(data);
            expect(result).toEqual({ street: '789 Test St', city: 'Test City', country: 'MISSING TRANSLATION' });
        });
    });
});
