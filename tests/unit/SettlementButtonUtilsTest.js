"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Expensicons = require("@components/Icon/Expensicons");
var useLocalize_1 = require("@hooks/useLocalize");
var Navigation_1 = require("@libs/Navigation/Navigation");
var SettlementButtonUtils_1 = require("@libs/SettlementButtonUtils");
var CONST_1 = require("@src/CONST");
var ROUTES_1 = require("@src/ROUTES");
jest.mock('@libs/Navigation/Navigation');
var mockTranslate = jest.fn(function (key) { return key; });
jest.mock('@hooks/useLocalize', function () { return ({
    // eslint-disable-next-line @typescript-eslint/naming-convention
    __esModule: true,
    default: function () { return ({
        translate: mockTranslate,
    }); },
}); });
describe('handleUnvalidatedUserNavigation', function () {
    var mockReportID = '123456789';
    var mockChatReportID = '987654321';
    beforeEach(function () {
        jest.clearAllMocks();
    });
    // handleUnvalidatedUserNavigation navigates to the correct route
    it.each([
        {
            description: 'navigate to ROUTES.SEARCH_ROOT_VERIFY_ACCOUNT when active route is ROUTES.SEARCH_ROOT',
            mockActiveRoute: ROUTES_1.default.SEARCH_ROOT.getRoute({ query: '' }),
            expectedRouteToNavigate: ROUTES_1.default.SEARCH_ROOT_VERIFY_ACCOUNT,
        },
        {
            description: 'navigate to ROUTES.SEARCH_REPORT_VERIFY_ACCOUNT when active route is ROUTES.SEARCH_REPORT',
            mockActiveRoute: ROUTES_1.default.SEARCH_REPORT.getRoute({ reportID: mockReportID }),
            expectedRouteToNavigate: ROUTES_1.default.SEARCH_REPORT_VERIFY_ACCOUNT.getRoute(mockReportID),
        },
        {
            description: 'navigate to ROUTES.SEARCH_MONEY_REQUEST_REPORT_VERIFY_ACCOUNT when active route is ROUTES.SEARCH_MONEY_REQUEST_REPORT',
            mockActiveRoute: ROUTES_1.default.SEARCH_MONEY_REQUEST_REPORT.getRoute({ reportID: mockReportID }),
            expectedRouteToNavigate: ROUTES_1.default.SEARCH_MONEY_REQUEST_REPORT_VERIFY_ACCOUNT.getRoute(mockReportID),
        },
        {
            description: 'navigate to ROUTES.REPORT_VERIFY_ACCOUNT.getRoute(chatReportID) when active route is ROUTES.REPORT_WITH_ID.getRoute(chatReportID)',
            mockActiveRoute: ROUTES_1.default.REPORT_WITH_ID.getRoute(mockChatReportID),
            expectedRouteToNavigate: ROUTES_1.default.REPORT_VERIFY_ACCOUNT.getRoute(mockChatReportID),
        },
        {
            description: 'navigate to ROUTES.REPORT_VERIFY_ACCOUNT.getRoute(reportID) when active route is ROUTES.REPORT_WITH_ID.getRoute(reportID)',
            mockActiveRoute: ROUTES_1.default.REPORT_WITH_ID.getRoute(mockReportID),
            expectedRouteToNavigate: ROUTES_1.default.REPORT_VERIFY_ACCOUNT.getRoute(mockReportID),
        },
        {
            description: 'navigate to ROUTES.MONEY_REQUEST_STEP_CONFIRMATION_VERIFY_ACCOUNT when active route is ROUTES.MONEY_REQUEST_STEP_CONFIRMATION',
            mockActiveRoute: ROUTES_1.default.MONEY_REQUEST_STEP_CONFIRMATION.getRoute(CONST_1.default.IOU.ACTION.CREATE, CONST_1.default.IOU.TYPE.PAY, CONST_1.default.IOU.OPTIMISTIC_TRANSACTION_ID, mockChatReportID),
            expectedRouteToNavigate: ROUTES_1.default.MONEY_REQUEST_STEP_CONFIRMATION_VERIFY_ACCOUNT.getRoute(CONST_1.default.IOU.ACTION.CREATE, CONST_1.default.IOU.TYPE.PAY, CONST_1.default.IOU.OPTIMISTIC_TRANSACTION_ID, mockChatReportID),
        },
    ])('$description', function (_a) {
        var mockActiveRoute = _a.mockActiveRoute, expectedRouteToNavigate = _a.expectedRouteToNavigate;
        Navigation_1.default.getActiveRoute.mockReturnValue(mockActiveRoute);
        (0, SettlementButtonUtils_1.handleUnvalidatedUserNavigation)(mockChatReportID, mockReportID);
        expect(Navigation_1.default.navigate).toHaveBeenCalledWith(expectedRouteToNavigate);
        expect(Navigation_1.default.navigate).toHaveBeenCalledTimes(1);
    });
    // handleUnvalidatedUserNavigation does not navigate to the route that require reportID, when reportID is undefined
    it.each([
        {
            description: 'do not navigate to ROUTES.SEARCH_MONEY_REQUEST_REPORT_VERIFY_ACCOUNT when reportID is undefined',
            mockActiveRoute: ROUTES_1.default.SEARCH_MONEY_REQUEST_REPORT.getRoute({ reportID: mockReportID }),
        },
        {
            description: 'do not navigate to ROUTES.SEARCH_REPORT_VERIFY_ACCOUNT when reportID is undefined',
            mockActiveRoute: ROUTES_1.default.SEARCH_REPORT.getRoute({ reportID: mockReportID }),
        },
        {
            description: 'do not navigate when active route is ROUTES.REPORT_WITH_ID.getRoute(reportID) and reportID is undefined',
            mockActiveRoute: ROUTES_1.default.REPORT_WITH_ID.getRoute(mockReportID),
        },
    ])('$description', function (_a) {
        var mockActiveRoute = _a.mockActiveRoute;
        Navigation_1.default.getActiveRoute.mockReturnValue(mockActiveRoute);
        (0, SettlementButtonUtils_1.handleUnvalidatedUserNavigation)(mockChatReportID);
        expect(Navigation_1.default.navigate).not.toHaveBeenCalled();
    });
    // handleUnvalidatedUserNavigation matches the first applicable route when multiple conditions could match
    it('match ROUTES.SEARCH_MONEY_REQUEST_REPORT over ROUTES.REPORT_WITH_ID', function () {
        var mockActiveRoute = ROUTES_1.default.SEARCH_MONEY_REQUEST_REPORT.getRoute({ reportID: mockReportID });
        Navigation_1.default.getActiveRoute.mockReturnValue(mockActiveRoute);
        (0, SettlementButtonUtils_1.handleUnvalidatedUserNavigation)(mockChatReportID, mockReportID);
        expect(Navigation_1.default.navigate).toHaveBeenCalledTimes(1);
        expect(Navigation_1.default.navigate).toHaveBeenCalledWith(ROUTES_1.default.SEARCH_MONEY_REQUEST_REPORT_VERIFY_ACCOUNT.getRoute(mockReportID));
        expect(Navigation_1.default.navigate).not.toHaveBeenCalledWith(ROUTES_1.default.REPORT_VERIFY_ACCOUNT.getRoute(mockReportID));
    });
    // handleUnvalidatedUserNavigation does not navigate when no route mapping matches
    it('when no route mapping matches, user should not be navigated', function () {
        Navigation_1.default.getActiveRoute.mockReturnValue('/just/unmatched/route');
        (0, SettlementButtonUtils_1.handleUnvalidatedUserNavigation)(mockChatReportID, mockReportID);
        expect(Navigation_1.default.navigate).not.toHaveBeenCalled();
    });
});
describe('getSettlementButtonPaymentMethods', function () {
    var translate = (0, useLocalize_1.default)().translate;
    beforeEach(function () {
        jest.clearAllMocks();
    });
    it('should return payment method with wallet for PERSONAL_BANK_ACCOUNT when hasActivatedWallet is true', function () {
        var result = (0, SettlementButtonUtils_1.getSettlementButtonPaymentMethods)(true, translate);
        expect(result[CONST_1.default.PAYMENT_METHODS.PERSONAL_BANK_ACCOUNT]).toEqual({
            text: translate('iou.settleWallet', { formattedAmount: '' }),
            icon: Expensicons.User,
            value: CONST_1.default.PAYMENT_METHODS.PERSONAL_BANK_ACCOUNT,
        });
    });
    it('should return payment method with personal bank account for PERSONAL_BANK_ACCOUNT when hasActivatedWallet is false', function () {
        var result = (0, SettlementButtonUtils_1.getSettlementButtonPaymentMethods)(false, translate);
        expect(result[CONST_1.default.PAYMENT_METHODS.PERSONAL_BANK_ACCOUNT]).toEqual({
            text: translate('iou.settlePersonal', { formattedAmount: '' }),
            icon: Expensicons.User,
            value: CONST_1.default.PAYMENT_METHODS.PERSONAL_BANK_ACCOUNT,
        });
    });
    it('should return payment method with business bank account for BUSINESS_BANK_ACCOUNT', function () {
        var result = (0, SettlementButtonUtils_1.getSettlementButtonPaymentMethods)(true, translate);
        expect(result[CONST_1.default.PAYMENT_METHODS.BUSINESS_BANK_ACCOUNT]).toEqual({
            text: translate('iou.settleBusiness', { formattedAmount: '' }),
            icon: Expensicons.Building,
            value: CONST_1.default.PAYMENT_METHODS.BUSINESS_BANK_ACCOUNT,
        });
    });
    it('should return payment method elsewhere for ELSEWHERE', function () {
        var result = (0, SettlementButtonUtils_1.getSettlementButtonPaymentMethods)(true, translate);
        expect(result[CONST_1.default.IOU.PAYMENT_TYPE.ELSEWHERE]).toEqual({
            text: translate('iou.payElsewhere', { formattedAmount: '' }),
            icon: Expensicons.CheckCircle,
            value: CONST_1.default.IOU.PAYMENT_TYPE.ELSEWHERE,
            shouldUpdateSelectedIndex: false,
        });
    });
    it('should return all three payment methods', function () {
        var result = (0, SettlementButtonUtils_1.getSettlementButtonPaymentMethods)(true, translate);
        expect(Object.keys(result)).toHaveLength(3);
        expect(result).toHaveProperty(CONST_1.default.PAYMENT_METHODS.PERSONAL_BANK_ACCOUNT);
        expect(result).toHaveProperty(CONST_1.default.PAYMENT_METHODS.BUSINESS_BANK_ACCOUNT);
        expect(result).toHaveProperty(CONST_1.default.IOU.PAYMENT_TYPE.ELSEWHERE);
    });
    it.each([
        { hasActivatedWallet: true, expectedPersonalKey: 'iou.settleWallet' },
        { hasActivatedWallet: false, expectedPersonalKey: 'iou.settlePersonal' },
    ])('should use correct texts for each payment method when hasActivatedWallet is $hasActivatedWallet', function (_a) {
        var hasActivatedWallet = _a.hasActivatedWallet, expectedPersonalKey = _a.expectedPersonalKey;
        var result = (0, SettlementButtonUtils_1.getSettlementButtonPaymentMethods)(hasActivatedWallet, translate);
        expect(translate).toHaveBeenCalledTimes(3);
        expect(translate).toHaveBeenCalledWith(expectedPersonalKey, { formattedAmount: '' });
        expect(translate).toHaveBeenCalledWith('iou.settleBusiness', { formattedAmount: '' });
        expect(translate).toHaveBeenCalledWith('iou.payElsewhere', { formattedAmount: '' });
        expect(result[CONST_1.default.PAYMENT_METHODS.PERSONAL_BANK_ACCOUNT].text).toBe(expectedPersonalKey);
        expect(result[CONST_1.default.PAYMENT_METHODS.BUSINESS_BANK_ACCOUNT].text).toBe('iou.settleBusiness');
        expect(result[CONST_1.default.IOU.PAYMENT_TYPE.ELSEWHERE].text).toBe('iou.payElsewhere');
    });
    it.each([
        {
            method: CONST_1.default.PAYMENT_METHODS.PERSONAL_BANK_ACCOUNT,
            expectedIcon: Expensicons.User,
            expectedValue: CONST_1.default.PAYMENT_METHODS.PERSONAL_BANK_ACCOUNT,
            description: 'PERSONAL_BANK_ACCOUNT',
        },
        {
            method: CONST_1.default.PAYMENT_METHODS.BUSINESS_BANK_ACCOUNT,
            expectedIcon: Expensicons.Building,
            expectedValue: CONST_1.default.PAYMENT_METHODS.BUSINESS_BANK_ACCOUNT,
            description: 'BUSINESS_BANK_ACCOUNT',
        },
        {
            method: CONST_1.default.IOU.PAYMENT_TYPE.ELSEWHERE,
            expectedIcon: Expensicons.CheckCircle,
            expectedValue: CONST_1.default.IOU.PAYMENT_TYPE.ELSEWHERE,
            description: 'ELSEWHERE',
        },
    ])('should use correct icon and value for $description regardless of hasActivatedWallet', function (_a) {
        var method = _a.method, expectedIcon = _a.expectedIcon, expectedValue = _a.expectedValue;
        var resultWithWallet = (0, SettlementButtonUtils_1.getSettlementButtonPaymentMethods)(true, translate);
        var resultWithoutWallet = (0, SettlementButtonUtils_1.getSettlementButtonPaymentMethods)(false, translate);
        [resultWithWallet, resultWithoutWallet].forEach(function (result) {
            var paymentMethod = result[method];
            expect(paymentMethod.icon).toBe(expectedIcon);
            expect(paymentMethod.value).toBe(expectedValue);
        });
    });
    it('should only set shouldUpdateSelectedIndex for elsewhere payment type', function () {
        var result = (0, SettlementButtonUtils_1.getSettlementButtonPaymentMethods)(true, translate);
        expect(result[CONST_1.default.PAYMENT_METHODS.PERSONAL_BANK_ACCOUNT]).not.toHaveProperty('shouldUpdateSelectedIndex');
        expect(result[CONST_1.default.PAYMENT_METHODS.BUSINESS_BANK_ACCOUNT]).not.toHaveProperty('shouldUpdateSelectedIndex');
        expect(result[CONST_1.default.IOU.PAYMENT_TYPE.ELSEWHERE].shouldUpdateSelectedIndex).toBe(false);
    });
});
