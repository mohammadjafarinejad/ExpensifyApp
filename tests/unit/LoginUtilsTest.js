"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_native_onyx_1 = require("react-native-onyx");
var LoginUtils_1 = require("@libs/LoginUtils");
var CONST_1 = require("@src/CONST");
var ONYXKEYS_1 = require("@src/ONYXKEYS");
var waitForBatchedUpdates_1 = require("../utils/waitForBatchedUpdates");
describe('LoginUtils', function () {
    beforeAll(function () {
        var _a;
        react_native_onyx_1.default.init({
            keys: ONYXKEYS_1.default,
            initialKeyStates: (_a = {},
                _a[ONYXKEYS_1.default.COUNTRY_CODE] = 1,
                _a),
        });
        return (0, waitForBatchedUpdates_1.default)();
    });
    afterEach(function () {
        jest.useRealTimers();
        react_native_onyx_1.default.clear();
    });
    describe('getPhoneNumberWithoutSpecialChars', function () {
        it('Should return valid phone number', function () {
            var givenPhone = '+12345678901';
            var parsedPhone = (0, LoginUtils_1.getPhoneNumberWithoutSpecialChars)(givenPhone);
            expect(parsedPhone).toBe('+12345678901');
        });
        it('Should return valid phone number even if received special chars', function () {
            var givenPhone = '+1(234) 56-7\t8-9 01';
            var parsedPhone = (0, LoginUtils_1.getPhoneNumberWithoutSpecialChars)(givenPhone);
            expect(parsedPhone).toBe('+12345678901');
        });
    });
    describe('appendCountryCode', function () {
        it('Should return valid phone number with country code when received a phone with country code', function () {
            var givenPhone = '+12345678901';
            var countryCode = CONST_1.default.DEFAULT_COUNTRY_CODE;
            var parsedPhone = (0, LoginUtils_1.appendCountryCode)(givenPhone, countryCode);
            expect(parsedPhone).toBe('+12345678901');
        });
        it('Should return valid phone number with country code when received a phone without country code', function () {
            var givenPhone = '2345678901';
            var countryCode = CONST_1.default.DEFAULT_COUNTRY_CODE;
            var parsedPhone = (0, LoginUtils_1.appendCountryCode)(givenPhone, countryCode);
            expect(parsedPhone).toBe('+12345678901');
        });
    });
    describe('isEmailPublicDomain', function () {
        it('Should return true if email is from public domain', function () {
            var givenEmail = 'test@gmail.com';
            var parsedEmail = (0, LoginUtils_1.isEmailPublicDomain)(givenEmail);
            expect(parsedEmail).toBe(true);
        });
        it('Should return false if email is not from public domain', function () {
            var givenEmail = 'test@test.com';
            var parsedEmail = (0, LoginUtils_1.isEmailPublicDomain)(givenEmail);
            expect(parsedEmail).toBe(false);
        });
        it("Should return false if provided string isn't email", function () {
            var givenEmail = 'test';
            var parsedEmail = (0, LoginUtils_1.isEmailPublicDomain)(givenEmail);
            expect(parsedEmail).toBe(false);
        });
    });
    describe('validateNumber', function () {
        it("Should return valid phone number with '@expensify.sms' suffix if provided phone number is valid", function () {
            var givenPhone = '+12345678901';
            var parsedPhone = (0, LoginUtils_1.validateNumber)(givenPhone);
            expect(parsedPhone).toBe('+12345678901@expensify.sms');
        });
        it('Should return empty string if provided phone number is not valid', function () {
            var givenPhone = '786';
            var parsedPhone = (0, LoginUtils_1.validateNumber)(givenPhone);
            expect(parsedPhone).toBe('');
        });
        it('Should return empty string if provided phone number is empty', function () {
            var givenPhone = '';
            var parsedPhone = (0, LoginUtils_1.validateNumber)(givenPhone);
            expect(parsedPhone).toBe('');
        });
    });
    describe('getPhoneLogin', function () {
        it('Should return valid phone number with country code if provided phone number is valid and with country code', function () {
            var givenPhone = '+12345678901';
            var countryCode = CONST_1.default.DEFAULT_COUNTRY_CODE;
            var parsedPhone = (0, LoginUtils_1.getPhoneLogin)(givenPhone, countryCode);
            expect(parsedPhone).toBe('+12345678901');
        });
        it('Should return valid phone number with country code if provided phone number is valid and without country code', function () {
            var givenPhone = '2345678901';
            var countryCode = CONST_1.default.DEFAULT_COUNTRY_CODE;
            var parsedPhone = (0, LoginUtils_1.getPhoneLogin)(givenPhone, countryCode);
            expect(parsedPhone).toBe('+12345678901');
        });
        it('Should return empty string if provided phone number is empty', function () {
            var givenPhone = '';
            var countryCode = CONST_1.default.DEFAULT_COUNTRY_CODE;
            var parsedPhone = (0, LoginUtils_1.getPhoneLogin)(givenPhone, countryCode);
            expect(parsedPhone).toBe('');
        });
    });
    describe('isDomainPublic', function () {
        it('Should return true for public domains', function () {
            expect((0, LoginUtils_1.isDomainPublic)('gmail.com')).toBe(true);
            expect((0, LoginUtils_1.isDomainPublic)('yahoo.com')).toBe(true);
            expect((0, LoginUtils_1.isDomainPublic)('hotmail.com')).toBe(true);
        });
        it('Should return false for private/custom domains', function () {
            expect((0, LoginUtils_1.isDomainPublic)('expensify.com')).toBe(false);
            expect((0, LoginUtils_1.isDomainPublic)('customdomain.com')).toBe(false);
            expect((0, LoginUtils_1.isDomainPublic)('test.org')).toBe(false);
        });
        it('Should return false for empty string', function () {
            expect((0, LoginUtils_1.isDomainPublic)('')).toBe(false);
        });
        it('Should handle case sensitivity correctly', function () {
            expect((0, LoginUtils_1.isDomainPublic)('GMAIL.COM')).toBe(false);
            expect((0, LoginUtils_1.isDomainPublic)('Gmail.Com')).toBe(false);
        });
    });
    describe('getEmailDomain', function () {
        it('Should extract domain from valid email addresses', function () {
            expect((0, LoginUtils_1.getEmailDomain)('user@gmail.com')).toBe('gmail.com');
            expect((0, LoginUtils_1.getEmailDomain)('test@example.org')).toBe('example.org');
            expect((0, LoginUtils_1.getEmailDomain)('admin@company.co.uk')).toBe('company.co.uk');
        });
        it('Should handle emails with multiple dots in domain', function () {
            expect((0, LoginUtils_1.getEmailDomain)('user@sub.domain.com')).toBe('sub.domain.com');
        });
        it('Should return lowercase domain', function () {
            expect((0, LoginUtils_1.getEmailDomain)('user@GMAIL.COM')).toBe('gmail.com');
            expect((0, LoginUtils_1.getEmailDomain)('test@Example.ORG')).toBe('example.org');
        });
        it('Should handle emails with uppercase local part', function () {
            expect((0, LoginUtils_1.getEmailDomain)('USER@gmail.com')).toBe('gmail.com');
        });
        it('Should handle invalid email formats gracefully', function () {
            expect((0, LoginUtils_1.getEmailDomain)('email')).toBe('email');
            expect((0, LoginUtils_1.getEmailDomain)('')).toBe('');
            expect((0, LoginUtils_1.getEmailDomain)('@gmail.com')).toBe('gmail.com');
            expect((0, LoginUtils_1.getEmailDomain)('user@')).toBe('');
        });
        it('Should handle emails with special characters', function () {
            expect((0, LoginUtils_1.getEmailDomain)('user+tag@gmail.com')).toBe('gmail.com');
            expect((0, LoginUtils_1.getEmailDomain)('user.name@example.com')).toBe('example.com');
        });
    });
});
