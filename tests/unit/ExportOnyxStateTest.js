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
var common_1 = require("@libs/ExportOnyxState/common");
var ONYXKEYS_1 = require("@src/ONYXKEYS");
describe('maskOnyxState', function () {
    var mockSession = {
        authToken: 'sensitive-auth-token',
        encryptedAuthToken: 'sensitive-encrypted-token',
        email: 'user@example.com',
        accountID: 12345,
        loading: false,
        creationDate: '2024-01-01',
    };
    describe('whitelist functionality', function () {
        it('should only export whitelisted fields from session', function () {
            var input = { session: mockSession };
            var result = (0, common_1.maskOnyxState)(input);
            // Whitelisted fields should be preserved
            expect(result.session.email).toBe('user@example.com');
            expect(result.session.accountID).toBe(12345);
            expect(result.session.loading).toBe(false);
            expect(result.session.creationDate).toBe('2024-01-01');
            // Non-whitelisted fields should be intelligently redacted
            expect(result.session.authToken).not.toBe('sensitive-auth-token');
            expect(result.session.authToken).toHaveLength('sensitive-auth-token'.length);
            expect(result.session.encryptedAuthToken).not.toBe('sensitive-encrypted-token');
            expect(result.session.encryptedAuthToken).toHaveLength('sensitive-encrypted-token'.length);
        });
        it('should mask fields in maskList while preserving structure', function () {
            var _a;
            var mockAccount = {
                validated: true,
                isFromPublicDomain: false,
                isUsingExpensifyCard: true,
                primaryLogin: 'user@example.com',
                requiresTwoFactorAuth: true,
            };
            var input = (_a = {}, _a[ONYXKEYS_1.default.ACCOUNT] = mockAccount, _a);
            var result = (0, common_1.maskOnyxState)(input);
            // Whitelisted fields should be preserved
            expect(result.account.validated).toBe(true);
            expect(result.account.isFromPublicDomain).toBe(false);
            expect(result.account.isUsingExpensifyCard).toBe(true);
            // Masked fields should be masked but preserved
            expect(result.account.primaryLogin).not.toBe('user@example.com');
            expect(result.account.primaryLogin).toHaveLength('user@example.com'.length);
            // Non-whitelisted, non-masked fields should be redacted
            expect(result.account.requiresTwoFactorAuth).toBe('***');
        });
        it('should redact fields not in allowList or maskList', function () {
            var input = {
                session: __assign(__assign({}, mockSession), { customField: 'should-be-redacted', anotherField: 'also-redacted' }),
            };
            var result = (0, common_1.maskOnyxState)(input);
            // Whitelisted fields should be preserved
            expect(result.session.email).toBe('user@example.com');
            expect(result.session.accountID).toBe(12345);
            // Non-whitelisted fields should be intelligently redacted
            expect(result.session.customField).not.toBe('should-be-redacted');
            expect(result.session.customField).toHaveLength('should-be-redacted'.length);
            expect(result.session.anotherField).not.toBe('also-redacted');
            expect(result.session.anotherField).toHaveLength('also-redacted'.length);
        });
        it('should handle collection keys correctly', function () {
            var _a;
            var mockReport = {
                reportID: '123',
                type: 'expense',
                chatType: 'policyExpenseChat',
                stateNum: 1,
                statusNum: 0,
                reportName: 'Test Report',
                description: 'Test Description',
                ownerAccountID: 12345,
                customField: 'should-be-redacted',
            };
            var input = (_a = {},
                _a["".concat(ONYXKEYS_1.default.COLLECTION.REPORT, "123")] = mockReport,
                _a);
            var result = (0, common_1.maskOnyxState)(input);
            var processedReport = result["".concat(ONYXKEYS_1.default.COLLECTION.REPORT, "123")];
            // Whitelisted fields should be preserved
            expect(processedReport.reportID).toBe('123');
            expect(processedReport.type).toBe('expense');
            expect(processedReport.chatType).toBe('policyExpenseChat');
            expect(processedReport.stateNum).toBe(1);
            expect(processedReport.statusNum).toBe(0);
            // Masked fields should be masked
            expect(processedReport.reportName).not.toBe('Test Report');
            expect(processedReport.reportName).toHaveLength('Test Report'.length);
            expect(processedReport.description).not.toBe('Test Description');
            // Non-whitelisted, non-masked fields should be intelligently redacted
            expect(processedReport.customField).not.toBe('should-be-redacted');
            expect(processedReport.customField).toHaveLength('should-be-redacted'.length);
        });
        it('should remove sensitive keys from export', function () {
            var _a;
            var input = (_a = {
                    session: mockSession
                },
                _a[ONYXKEYS_1.default.NVP_PRIVATE_PUSH_NOTIFICATION_ID] = 'sensitive-id',
                _a[ONYXKEYS_1.default.NVP_PRIVATE_STRIPE_CUSTOMER_ID] = 'stripe-id',
                _a[ONYXKEYS_1.default.PLAID_LINK_TOKEN] = 'plaid-token',
                _a[ONYXKEYS_1.default.ONFIDO_TOKEN] = 'onfido-token',
                _a);
            var result = (0, common_1.maskOnyxState)(input);
            // Sensitive keys should be removed
            expect(result[ONYXKEYS_1.default.NVP_PRIVATE_PUSH_NOTIFICATION_ID]).toBeUndefined();
            expect(result[ONYXKEYS_1.default.NVP_PRIVATE_STRIPE_CUSTOMER_ID]).toBeUndefined();
            expect(result[ONYXKEYS_1.default.PLAID_LINK_TOKEN]).toBeUndefined();
            expect(result[ONYXKEYS_1.default.ONFIDO_TOKEN]).toBeUndefined();
            // Session should still be present
            expect(result.session).toBeDefined();
        });
        it('should handle keys without export policies', function () {
            var input = {
                session: mockSession,
                unknownKey: {
                    field1: 'value1',
                    field2: 'value2',
                },
            };
            var result = (0, common_1.maskOnyxState)(input);
            // Keys without policies should be left as-is
            expect(result.unknownKey).toEqual({
                field1: 'value1',
                field2: 'value2',
            });
        });
    });
    it('should mask session details by default', function () {
        var input = { session: mockSession };
        var result = (0, common_1.maskOnyxState)(input);
        expect(result.session.authToken).not.toBe('sensitive-auth-token');
        expect(result.session.authToken).toHaveLength('sensitive-auth-token'.length);
        expect(result.session.encryptedAuthToken).not.toBe('sensitive-encrypted-token');
        expect(result.session.encryptedAuthToken).toHaveLength('sensitive-encrypted-token'.length);
    });
    it('should not mask fragile data when isMaskingFragileDataEnabled is false', function () {
        var input = {
            session: mockSession,
        };
        var result = (0, common_1.maskOnyxState)(input);
        expect(result.session.authToken).not.toBe('sensitive-auth-token');
        expect(result.session.authToken).toHaveLength('sensitive-auth-token'.length);
        expect(result.session.encryptedAuthToken).not.toBe('sensitive-encrypted-token');
        expect(result.session.encryptedAuthToken).toHaveLength('sensitive-encrypted-token'.length);
        expect(result.session.email).toBe('user@example.com');
    });
    it('should mask fragile data when isMaskingFragileDataEnabled is true', function () {
        var input = {
            session: mockSession,
        };
        var result = (0, common_1.maskOnyxState)(input, true);
        expect(result.session.authToken).not.toBe('sensitive-auth-token');
        expect(result.session.authToken).toHaveLength('sensitive-auth-token'.length);
        expect(result.session.encryptedAuthToken).not.toBe('sensitive-encrypted-token');
        expect(result.session.encryptedAuthToken).toHaveLength('sensitive-encrypted-token'.length);
    });
    it('should mask emails as a string value in property with a random email', function () {
        var input = {
            session: mockSession,
        };
        var result = (0, common_1.maskOnyxState)(input);
        expect(result.session.email).toMatch(common_1.emailRegex);
    });
    it('should mask array of emails with random emails', function () {
        var input = {
            session: mockSession,
            emails: ['user@example.com', 'user2@example.com'],
        };
        var result = (0, common_1.maskOnyxState)(input, true);
        expect(result.emails.at(0)).toMatch(common_1.emailRegex);
        expect(result.emails.at(1)).toMatch(common_1.emailRegex);
    });
    it('should mask emails in keys of objects', function () {
        var input = {
            // eslint-disable-next-line @typescript-eslint/naming-convention
            'user@example.com': 'value',
            session: mockSession,
        };
        var result = (0, common_1.maskOnyxState)(input, true);
        expect(Object.keys(result).at(0)).toMatch(common_1.emailRegex);
    });
    it('should mask emails that are part of a string', function () {
        var input = {
            session: mockSession,
            emailString: 'user@example.com is a test string',
        };
        var result = (0, common_1.maskOnyxState)(input, true);
        expect(result.emailString).not.toContain('user@example.com');
    });
    it('should mask keys that are in the fixed list', function () {
        var input = {
            session: mockSession,
            edits: ['hey', 'hi'],
            lastMessageHtml: 'hey',
        };
        var result = (0, common_1.maskOnyxState)(input, true);
        expect(result.edits).toEqual(['***', '***']);
        expect(result.lastMessageHtml).not.toEqual(input.lastMessageHtml);
    });
});
