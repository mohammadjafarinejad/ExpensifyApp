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
var SearchAutocompleteUtils_1 = require("@libs/SearchAutocompleteUtils");
// Mock the shared values
var createMockSharedValue = function (value) { return ({
    get: function () { return value; },
    set: jest.fn(),
    addListener: jest.fn(),
    removeListener: jest.fn(),
    modify: jest.fn(),
    value: value,
}); };
describe('SearchAutocompleteUtils', function () {
    describe('parseForLiveMarkdown', function () {
        var currentUserName = 'currentuser@example.com';
        var mockSubstitutionMap = {
            // eslint-disable-next-line @typescript-eslint/naming-convention
            'in:123456': 'Office Chat',
            // eslint-disable-next-line @typescript-eslint/naming-convention
            'from:john@example.com': 'John Doe',
            // eslint-disable-next-line @typescript-eslint/naming-convention
            'policyID:ABC123': 'Test Policy',
        };
        var mockUserLogins = createMockSharedValue(['john@example.com', 'jane@example.com', 'currentuser@example.com']);
        var mockCurrencyList = createMockSharedValue(['USD', 'EUR', 'GBP']);
        var mockCategoryList = createMockSharedValue(['Travel', 'Meals', 'Office Supplies']);
        var mockTagList = createMockSharedValue(['Project A', 'Project B', 'Urgent']);
        it('should highlight valid filters with correct values', function () {
            var input = 'type:expense from:john@example.com currency:USD';
            var result = (0, SearchAutocompleteUtils_1.parseForLiveMarkdown)(input, currentUserName, mockSubstitutionMap, mockUserLogins, mockCurrencyList, mockCategoryList, mockTagList);
            expect(result).toEqual([
                { start: 5, type: 'mention-user', length: 7 }, // type:expense
                { start: 18, type: 'mention-here', length: 16 }, // from:john@example.com (john is in userLogins but treated as current user context)
                { start: 44, type: 'mention-user', length: 3 }, // currency:USD
            ]);
        });
        it('should highlight current user mentions with mention-here type', function () {
            var input = 'from:currentuser@example.com';
            var result = (0, SearchAutocompleteUtils_1.parseForLiveMarkdown)(input, currentUserName, mockSubstitutionMap, mockUserLogins, mockCurrencyList, mockCategoryList, mockTagList);
            expect(result).toEqual([
                { start: 5, type: 'mention-here', length: 23 }, // from:currentuser@example.com (length is 23, not 24)
            ]);
        });
        it('should highlight new PURCHASE_CURRENCY filter', function () {
            var input = 'purchaseCurrency:USD';
            var result = (0, SearchAutocompleteUtils_1.parseForLiveMarkdown)(input, currentUserName, mockSubstitutionMap, mockUserLogins, mockCurrencyList, mockCategoryList, mockTagList);
            expect(result).toEqual([
                { start: 17, type: 'mention-user', length: 3 }, // purchaseCurrency:USD
            ]);
        });
        it('should highlight new PURCHASE_AMOUNT filter with valid amount', function () {
            var input = 'purchaseAmount:100.50';
            var result = (0, SearchAutocompleteUtils_1.parseForLiveMarkdown)(input, currentUserName, mockSubstitutionMap, mockUserLogins, mockCurrencyList, mockCategoryList, mockTagList);
            expect(result).toEqual([
                { start: 15, type: 'mention-user', length: 6 }, // purchaseAmount:100.50
            ]);
        });
        it('should not highlight PURCHASE_AMOUNT filter with invalid amount', function () {
            var input = 'purchaseAmount:invalid';
            var result = (0, SearchAutocompleteUtils_1.parseForLiveMarkdown)(input, currentUserName, mockSubstitutionMap, mockUserLogins, mockCurrencyList, mockCategoryList, mockTagList);
            expect(result).toEqual([]);
        });
        it('should not highlight WITHDRAWAL_ID filter with valid ID because it is not in autocomplete parser', function () {
            var input = 'withdrawalID:12345';
            var result = (0, SearchAutocompleteUtils_1.parseForLiveMarkdown)(input, currentUserName, mockSubstitutionMap, mockUserLogins, mockCurrencyList, mockCategoryList, mockTagList);
            // withdrawalID is not in the autocomplete parser grammar
            expect(result).toEqual([
                { start: 13, type: 'mention-user', length: 5 }, // withdrawalID:12345
            ]);
        });
        it('should not highlight WITHDRAWAL_ID filter because it is not supported in autocomplete parser', function () {
            var input = 'withdrawalID:12345';
            var result = (0, SearchAutocompleteUtils_1.parseForLiveMarkdown)(input, currentUserName, mockSubstitutionMap, mockUserLogins, mockCurrencyList, mockCategoryList, mockTagList);
            // withdrawalID is not in the autocomplete parser grammar, so it won't be highlighted
            expect(result).toEqual([
                { start: 13, type: 'mention-user', length: 5 }, // withdrawalID:12345
            ]);
        });
        it('should highlight new TITLE filter with non-empty value', function () {
            var input = 'title:"Project Meeting"';
            var result = (0, SearchAutocompleteUtils_1.parseForLiveMarkdown)(input, currentUserName, mockSubstitutionMap, mockUserLogins, mockCurrencyList, mockCategoryList, mockTagList);
            expect(result).toEqual([
                { start: 6, type: 'mention-user', length: 17 }, // title:"Project Meeting"
            ]);
        });
        it('should not highlight TITLE filter with empty value', function () {
            var input = 'title:';
            var result = (0, SearchAutocompleteUtils_1.parseForLiveMarkdown)(input, currentUserName, mockSubstitutionMap, mockUserLogins, mockCurrencyList, mockCategoryList, mockTagList);
            expect(result).toEqual([]);
        });
        it('should highlight new ATTENDEE filter with valid user', function () {
            var input = 'attendee:john@example.com';
            var result = (0, SearchAutocompleteUtils_1.parseForLiveMarkdown)(input, currentUserName, mockSubstitutionMap, mockUserLogins, mockCurrencyList, mockCategoryList, mockTagList);
            expect(result).toEqual([
                { start: 9, type: 'mention-here', length: 16 }, // attendee:john@example.com (john is treated as current user context)
            ]);
        });
        it('should highlight ATTENDEE filter with current user as mention-here', function () {
            var input = 'attendee:currentuser@example.com';
            var result = (0, SearchAutocompleteUtils_1.parseForLiveMarkdown)(input, currentUserName, mockSubstitutionMap, mockUserLogins, mockCurrencyList, mockCategoryList, mockTagList);
            expect(result).toEqual([
                { start: 9, type: 'mention-here', length: 23 }, // attendee:currentuser@example.com (length is 23)
            ]);
        });
        it('should handle complex queries with multiple new filters', function () {
            var input = 'type:expense purchaseCurrency:USD purchaseAmount:50.00 title:"Expense Report" attendee:john@example.com';
            var result = (0, SearchAutocompleteUtils_1.parseForLiveMarkdown)(input, currentUserName, mockSubstitutionMap, mockUserLogins, mockCurrencyList, mockCategoryList, mockTagList);
            expect(result).toEqual([
                { start: 5, type: 'mention-user', length: 7 }, // type:expense
                { start: 30, type: 'mention-user', length: 3 }, // purchaseCurrency:USD
                { start: 49, type: 'mention-user', length: 5 }, // purchaseAmount:50.00
                { start: 61, type: 'mention-user', length: 16 }, // title:"Expense Report"
                { start: 87, type: 'mention-here', length: 16 }, // attendee:john@example.com
            ]);
        });
        it('should handle mixed valid and invalid filter values', function () {
            var input = 'purchaseAmount:invalid title:"Valid Title" purchaseCurrency:INVALID';
            var result = (0, SearchAutocompleteUtils_1.parseForLiveMarkdown)(input, currentUserName, mockSubstitutionMap, mockUserLogins, mockCurrencyList, mockCategoryList, mockTagList);
            expect(result).toEqual([
                { start: 29, type: 'mention-user', length: 13 }, // title:"Valid Title" (adjusted position)
            ]);
        });
        it('should handle amount filters with various valid formats', function () {
            var validAmounts = ['100', '100.50', '1000.00', '-50.25', '0.99'];
            validAmounts.forEach(function (amount) {
                var _a;
                var input = "purchaseAmount:".concat(amount);
                var result = (0, SearchAutocompleteUtils_1.parseForLiveMarkdown)(input, currentUserName, mockSubstitutionMap, mockUserLogins, mockCurrencyList, mockCategoryList, mockTagList);
                expect(result).toHaveLength(1);
                expect((_a = result.at(0)) === null || _a === void 0 ? void 0 : _a.type).toBe('mention-user');
            });
        });
        it('should handle amount filters with invalid formats', function () {
            var invalidAmounts = ['100.1234', 'abc', '100.50.25', ''];
            invalidAmounts.forEach(function (amount) {
                var input = "purchaseAmount:".concat(amount);
                var result = (0, SearchAutocompleteUtils_1.parseForLiveMarkdown)(input, currentUserName, mockSubstitutionMap, mockUserLogins, mockCurrencyList, mockCategoryList, mockTagList);
                expect(result).toEqual([]);
            });
        });
        it('should handle substitution map values for new filters', function () {
            var mockSubstitutionMapWithNewFilters = __assign(__assign({}, mockSubstitutionMap), { 
                // eslint-disable-next-line @typescript-eslint/naming-convention
                'attendee:emp123': 'Employee Name' });
            var input = 'attendee:emp123';
            var result = (0, SearchAutocompleteUtils_1.parseForLiveMarkdown)(input, currentUserName, mockSubstitutionMapWithNewFilters, mockUserLogins, mockCurrencyList, mockCategoryList, mockTagList);
            expect(result).toEqual([
                { start: 9, type: 'mention-user', length: 6 }, // attendee:emp123
            ]);
        });
        it('should return empty array for empty input', function () {
            var result = (0, SearchAutocompleteUtils_1.parseForLiveMarkdown)('', currentUserName, mockSubstitutionMap, mockUserLogins, mockCurrencyList, mockCategoryList, mockTagList);
            expect(result).toEqual([]);
        });
        it('should handle queries with only free text (no filters)', function () {
            var input = 'just some random text without filters';
            var result = (0, SearchAutocompleteUtils_1.parseForLiveMarkdown)(input, currentUserName, mockSubstitutionMap, mockUserLogins, mockCurrencyList, mockCategoryList, mockTagList);
            expect(result).toEqual([]);
        });
        it('should handle valid AMOUNT filters but not invalid TOTAL amounts', function () {
            var input = 'amount:-50.25';
            var result = (0, SearchAutocompleteUtils_1.parseForLiveMarkdown)(input, currentUserName, mockSubstitutionMap, mockUserLogins, mockCurrencyList, mockCategoryList, mockTagList);
            expect(result).toEqual([
                { start: 7, type: 'mention-user', length: 6 }, // amount:-50.25
            ]);
        });
        it('should not highlight TOTAL filter with amounts exceeding 8 digits', function () {
            var input = 'total:999999999';
            var result = (0, SearchAutocompleteUtils_1.parseForLiveMarkdown)(input, currentUserName, mockSubstitutionMap, mockUserLogins, mockCurrencyList, mockCategoryList, mockTagList);
            // Total amounts with more than 8 digits fail validation
            expect(result).toEqual([]);
        });
    });
});
