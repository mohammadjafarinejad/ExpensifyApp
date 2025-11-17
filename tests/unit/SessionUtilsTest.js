"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SessionUtils_1 = require("@src/libs/SessionUtils");
function mockHybridAppConfig(isHybridApp) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    var CONFIG = require('@src/CONFIG');
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    var originalValue = CONFIG.default.IS_HYBRID_APP;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    CONFIG.default.IS_HYBRID_APP = isHybridApp;
    // Return cleanup function
    return function () {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment
        CONFIG.default.IS_HYBRID_APP = originalValue;
    };
}
function testPartnerNameBehavior(isHybridApp, partnerUserID, expectedResult) {
    var cleanup = mockHybridAppConfig(isHybridApp);
    try {
        var result = (0, SessionUtils_1.checkIfShouldUseNewPartnerName)(partnerUserID);
        expect(result).toBe(expectedResult);
    }
    finally {
        cleanup();
    }
}
describe('SessionUtils', function () {
    describe('checkIfShouldUseNewPartnerName', function () {
        test.each([
            // [description, isHybridApp, partnerUserID, expectedResult]
            ['should return true for any partnerUserID when not in HybridApp', false, 'any-user-id', true],
            ['should return true for undefined partnerUserID when not in HybridApp', false, undefined, true],
            ['should return true for empty partnerUserID when not in HybridApp', false, '', true],
            ['should return true for expensify.cash- prefix when not in HybridApp', false, 'expensify.cash-12345', true],
            ['should return true for expensify.cash- prefix when in HybridApp', true, 'expensify.cash-12345', true],
            ['should return false for legacy partnerUserID when in HybridApp', true, 'legacy-user-12345', false],
            ['should return false for undefined partnerUserID when in HybridApp', true, undefined, false],
            ['should return false for empty partnerUserID when in HybridApp', true, '', false],
            ['should return true when partnerUserID starts with expensify.cash- prefix when in HybridApp', true, 'expensify.cash-user123', true],
            ['should return false when partnerUserID contains but does not start with expensify.cash- when in HybridApp', true, 'some-prefix-expensify.cash-12345', false],
            [
                'should return false for similar but different prefix when in HybridApp',
                true,
                'expensify-cash-12345', // missing dot
                false,
            ],
            ['should be case sensitive for expensify.cash- prefix when in HybridApp', true, 'EXPENSIFY.CASH-12345', false],
        ])('%s', function (description, isHybridApp, partnerUserID, expectedResult) {
            testPartnerNameBehavior(isHybridApp, partnerUserID, expectedResult);
        });
    });
});
