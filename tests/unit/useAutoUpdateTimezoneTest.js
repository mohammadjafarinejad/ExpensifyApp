"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_native_1 = require("@testing-library/react-native");
var react_1 = require("react");
var useAutoUpdateTimezone_1 = require("@hooks/useAutoUpdateTimezone");
var useCurrentUserPersonalDetails_1 = require("@hooks/useCurrentUserPersonalDetails");
// eslint-disable-next-line no-restricted-syntax
var PersonalDetails = require("@userActions/PersonalDetails");
jest.mock('@hooks/useCurrentUserPersonalDetails');
describe('useAutoUpdateTimezone', function () {
    var mockUseCurrentUserPersonalDetails = useCurrentUserPersonalDetails_1.default;
    var updateAutomaticTimezoneSpy = jest.spyOn(PersonalDetails, 'updateAutomaticTimezone');
    var originalDateTimeFormat = Intl.DateTimeFormat;
    function setSystemTimezone(tz) {
        // @ts-expect-error overriding for tests
        Intl.DateTimeFormat = jest.fn().mockReturnValue({
            resolvedOptions: function () { return ({ timeZone: tz }); },
        });
    }
    function TestComponent() {
        (0, useAutoUpdateTimezone_1.default)();
        return null;
    }
    beforeEach(function () {
        jest.clearAllMocks();
        setSystemTimezone('America/New_York');
    });
    afterAll(function () {
        Intl.DateTimeFormat = originalDateTimeFormat;
    });
    it('updates timezone when automatic and mismatch', function () {
        setSystemTimezone('America/Los_Angeles');
        mockUseCurrentUserPersonalDetails.mockReturnValue({
            accountID: 1,
            timezone: {
                automatic: true,
                selected: 'Europe/Warsaw',
            },
        });
        (0, react_native_1.render)(<TestComponent />);
        expect(updateAutomaticTimezoneSpy).toHaveBeenCalledWith({
            automatic: true,
            selected: 'America/Los_Angeles',
        }, 1);
    });
    it('does not call update when selected matches system timezone', function () {
        mockUseCurrentUserPersonalDetails.mockReturnValue({
            accountID: 1,
            timezone: {
                automatic: true,
                selected: 'America/New_York',
            },
        });
        (0, react_native_1.render)(<TestComponent />);
        expect(updateAutomaticTimezoneSpy).not.toHaveBeenCalled();
    });
    it('does not call update when automatic is false', function () {
        mockUseCurrentUserPersonalDetails.mockReturnValue({
            accountID: 1,
            timezone: {
                automatic: false,
                selected: 'America/Los_Angeles',
            },
        });
        (0, react_native_1.render)(<TestComponent />);
        expect(updateAutomaticTimezoneSpy).not.toHaveBeenCalled();
    });
    it('does not call update when system timezone is invalid', function () {
        setSystemTimezone('');
        mockUseCurrentUserPersonalDetails.mockReturnValue({
            accountID: 1,
            timezone: {
                automatic: true,
                selected: 'America/Los_Angeles',
            },
        });
        (0, react_native_1.render)(<TestComponent />);
        expect(updateAutomaticTimezoneSpy).not.toHaveBeenCalled();
    });
});
