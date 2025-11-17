"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CONST_1 = require("@src/CONST");
var UserUtils = require("@src/libs/UserUtils");
var TestHelper_1 = require("../utils/TestHelper");
describe('UserUtils', function () {
    describe('getContactMethodsOptions', function () {
        var TEST_CASES = [
            {
                name: 'shows error indicator when any errorFields are present',
                loginList: {
                    // eslint-disable-next-line @typescript-eslint/naming-convention
                    'user@example.com': {
                        partnerUserID: 'user@example.com',
                        errorFields: { addedLogin: { message: 'err' } },
                    },
                },
                defaultEmail: 'user@example.com',
                expectedIndicators: [CONST_1.default.BRICK_ROAD_INDICATOR_STATUS.ERROR],
            },
            {
                name: 'shows info indicator for unvalidated non-default contact method',
                loginList: {
                    // eslint-disable-next-line @typescript-eslint/naming-convention
                    'primary@example.com': {
                        partnerUserID: 'primary@example.com',
                        validatedDate: '2024-01-01',
                    },
                    // eslint-disable-next-line @typescript-eslint/naming-convention
                    'secondary@example.com': {
                        partnerUserID: 'secondary@example.com',
                        // no validatedDate => unvalidated
                    },
                },
                defaultEmail: 'primary@example.com',
                // Sorted order puts default first, then secondary
                expectedIndicators: [undefined, CONST_1.default.BRICK_ROAD_INDICATOR_STATUS.INFO],
            },
            {
                name: 'shows no indicator when validated and no errors',
                loginList: {
                    // eslint-disable-next-line @typescript-eslint/naming-convention
                    'ok@example.com': {
                        partnerUserID: 'ok@example.com',
                        validatedDate: '2024-01-01',
                    },
                    // eslint-disable-next-line @typescript-eslint/naming-convention
                    'another@example.com': {
                        partnerUserID: 'another@example.com',
                        validatedDate: '2024-03-03',
                    },
                },
                defaultEmail: 'ok@example.com',
                expectedIndicators: [undefined],
            },
        ];
        describe.each(TEST_CASES)('$name', function (_a) {
            var loginList = _a.loginList, defaultEmail = _a.defaultEmail, expectedIndicators = _a.expectedIndicators;
            test('verifies indicator states', function () {
                var options = UserUtils.getContactMethodsOptions(TestHelper_1.translateLocal, loginList, defaultEmail);
                var indicators = options.map(function (o) { return o === null || o === void 0 ? void 0 : o.indicator; });
                expect(indicators).toEqual(expectedIndicators);
            });
        });
    });
    describe('getLoginListBrickRoadIndicator', function () {
        var TEST_CASES = [
            {
                name: 'returns ERROR when any login has errorFields',
                loginList: {
                    // eslint-disable-next-line @typescript-eslint/naming-convention
                    'a@example.com': {
                        partnerUserID: 'a@example.com',
                        errorFields: { validateCodeSent: { code: 'oops' } },
                    },
                },
                email: 'a@example.com',
                expected: CONST_1.default.BRICK_ROAD_INDICATOR_STATUS.ERROR,
            },
            {
                name: 'returns INFO when there is unvalidated non-default login and no errors',
                loginList: {
                    // eslint-disable-next-line @typescript-eslint/naming-convention
                    'primary@example.com': {
                        partnerUserID: 'primary@example.com',
                        validatedDate: '2024-01-01',
                    },
                    // eslint-disable-next-line @typescript-eslint/naming-convention
                    'pending@example.com': {
                        partnerUserID: 'pending@example.com',
                        // missing validatedDate => unvalidated
                    },
                },
                email: 'primary@example.com',
                expected: CONST_1.default.BRICK_ROAD_INDICATOR_STATUS.INFO,
            },
            {
                name: 'returns undefined when all validated and no errors',
                loginList: {
                    // eslint-disable-next-line @typescript-eslint/naming-convention
                    'a@example.com': {
                        partnerUserID: 'a@example.com',
                        validatedDate: '2024-01-01',
                    },
                    // eslint-disable-next-line @typescript-eslint/naming-convention
                    'b@example.com': {
                        partnerUserID: 'b@example.com',
                        validatedDate: '2024-03-03',
                    },
                },
                email: 'a@example.com',
                expected: undefined,
            },
        ];
        describe.each(TEST_CASES)('$name', function (_a) {
            var loginList = _a.loginList, email = _a.email, expected = _a.expected;
            test('verifies brick road indicator', function () {
                var result = UserUtils.getLoginListBrickRoadIndicator(loginList, email);
                expect(result).toBe(expected);
            });
        });
    });
});
