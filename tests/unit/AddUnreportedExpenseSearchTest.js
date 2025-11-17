"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CurrencyUtils_1 = require("@libs/CurrencyUtils");
var tokenizedSearch_1 = require("@libs/tokenizedSearch");
var TransactionUtils_1 = require("@libs/TransactionUtils");
var CONST_1 = require("@src/CONST");
// Mock the dependencies
jest.mock('@libs/CurrencyUtils');
jest.mock('@libs/TransactionUtils');
var mockConvertToDisplayString = CurrencyUtils_1.convertToDisplayString;
var mockGetMerchant = TransactionUtils_1.getMerchant;
var mockGetDescription = TransactionUtils_1.getDescription;
var mockGetAmount = TransactionUtils_1.getAmount;
var mockGetCurrency = TransactionUtils_1.getCurrency;
describe('AddUnreportedExpense Search Functionality', function () {
    var mockTransaction1 = {
        transactionID: '1',
        merchant: 'Starbucks',
        comment: { comment: 'Coffee meeting' },
        amount: 500, // $5.00
        currency: 'USD',
    };
    var mockTransaction2 = {
        transactionID: '2',
        merchant: 'Uber',
        comment: { comment: 'Taxi to airport' },
        amount: 2500, // $25.00
        currency: 'USD',
    };
    var mockTransaction3 = {
        transactionID: '3',
        merchant: 'Hotel California',
        comment: { comment: 'Business trip accommodation' },
        amount: 15000, // $150.00
        currency: 'USD',
    };
    var transactions = [mockTransaction1, mockTransaction2, mockTransaction3];
    beforeEach(function () {
        // Setup mocks
        mockGetMerchant.mockImplementation(function (transaction) {
            if ((transaction === null || transaction === void 0 ? void 0 : transaction.transactionID) === '1') {
                return 'Starbucks';
            }
            if ((transaction === null || transaction === void 0 ? void 0 : transaction.transactionID) === '2') {
                return 'Uber';
            }
            if ((transaction === null || transaction === void 0 ? void 0 : transaction.transactionID) === '3') {
                return 'Hotel California';
            }
            return '';
        });
        mockGetDescription.mockImplementation(function (transaction) {
            if ((transaction === null || transaction === void 0 ? void 0 : transaction.transactionID) === '1') {
                return 'Coffee meeting';
            }
            if ((transaction === null || transaction === void 0 ? void 0 : transaction.transactionID) === '2') {
                return 'Taxi to airport';
            }
            if ((transaction === null || transaction === void 0 ? void 0 : transaction.transactionID) === '3') {
                return 'Business trip accommodation';
            }
            return '';
        });
        mockGetAmount.mockImplementation(function (transaction) {
            if ((transaction === null || transaction === void 0 ? void 0 : transaction.transactionID) === '1') {
                return 500;
            }
            if ((transaction === null || transaction === void 0 ? void 0 : transaction.transactionID) === '2') {
                return 2500;
            }
            if ((transaction === null || transaction === void 0 ? void 0 : transaction.transactionID) === '3') {
                return 15000;
            }
            return 0;
        });
        mockGetCurrency.mockImplementation(function () { return 'USD'; });
        mockConvertToDisplayString.mockImplementation(function (amount) {
            if (amount === 500) {
                return '$5.00';
            }
            if (amount === 2500) {
                return '$25.00';
            }
            if (amount === 15000) {
                return '$150.00';
            }
            return '$0.00';
        });
    });
    afterEach(function () {
        jest.clearAllMocks();
    });
    var getSearchableFields = function (transaction) {
        var searchableFields = [];
        // Add merchant to searchable fields
        var merchant = (0, TransactionUtils_1.getMerchant)(transaction);
        if (merchant !== CONST_1.default.TRANSACTION.PARTIAL_TRANSACTION_MERCHANT) {
            searchableFields.push(merchant);
        }
        // Add description to searchable fields
        var description = (0, TransactionUtils_1.getDescription)(transaction);
        if (description.trim()) {
            searchableFields.push(description);
        }
        // Add formatted amount to searchable fields
        var amount = (0, TransactionUtils_1.getAmount)(transaction);
        var currency = (0, TransactionUtils_1.getCurrency)(transaction);
        var formattedAmount = (0, CurrencyUtils_1.convertToDisplayString)(amount, currency);
        searchableFields.push(formattedAmount);
        // This allows users to search "2000" and find "$2,000.00" for example
        var normalizedAmount = (amount / 100).toString();
        searchableFields.push(normalizedAmount);
        return searchableFields;
    };
    it('should search by merchant name', function () {
        var _a;
        var searchTerm = 'Starbucks';
        var result = (0, tokenizedSearch_1.default)(transactions, searchTerm, getSearchableFields);
        expect(result).toHaveLength(1);
        expect((_a = result.at(0)) === null || _a === void 0 ? void 0 : _a.transactionID).toBe('1');
    });
    it('should search by description', function () {
        var _a;
        var searchTerm = 'Coffee meeting';
        var result = (0, tokenizedSearch_1.default)(transactions, searchTerm, getSearchableFields);
        expect(result).toHaveLength(1);
        expect((_a = result.at(0)) === null || _a === void 0 ? void 0 : _a.transactionID).toBe('1');
    });
    it('should search by amount', function () {
        var _a;
        var searchTerm = '$25.00';
        var result = (0, tokenizedSearch_1.default)(transactions, searchTerm, getSearchableFields);
        expect(result).toHaveLength(1);
        expect((_a = result.at(0)) === null || _a === void 0 ? void 0 : _a.transactionID).toBe('2');
    });
    it('should search by partial terms', function () {
        var _a;
        var searchTerm = 'Hotel';
        var result = (0, tokenizedSearch_1.default)(transactions, searchTerm, getSearchableFields);
        expect(result).toHaveLength(1);
        expect((_a = result.at(0)) === null || _a === void 0 ? void 0 : _a.transactionID).toBe('3');
    });
    it('should search across multiple fields', function () {
        var _a;
        var searchTerm = 'trip';
        var result = (0, tokenizedSearch_1.default)(transactions, searchTerm, getSearchableFields);
        expect(result).toHaveLength(1);
        expect((_a = result.at(0)) === null || _a === void 0 ? void 0 : _a.transactionID).toBe('3');
    });
    it('should return all transactions when search term is empty', function () {
        var searchTerm = '';
        var result = (0, tokenizedSearch_1.default)(transactions, searchTerm, getSearchableFields);
        expect(result).toHaveLength(3);
    });
    it('should return no results for non-matching search term', function () {
        var searchTerm = 'nonexistent';
        var result = (0, tokenizedSearch_1.default)(transactions, searchTerm, getSearchableFields);
        expect(result).toHaveLength(0);
    });
    it('should handle case-insensitive search', function () {
        var _a;
        var searchTerm = 'STARBUCKS';
        var result = (0, tokenizedSearch_1.default)(transactions, searchTerm, getSearchableFields);
        expect(result).toHaveLength(1);
        expect((_a = result.at(0)) === null || _a === void 0 ? void 0 : _a.transactionID).toBe('1');
    });
    it('should search by unformatted numeric amount', function () {
        var _a;
        var searchTerm = '25';
        var result = (0, tokenizedSearch_1.default)(transactions, searchTerm, getSearchableFields);
        expect(result).toHaveLength(1);
        expect((_a = result.at(0)) === null || _a === void 0 ? void 0 : _a.transactionID).toBe('2');
    });
    it('should search by unformatted numeric amount for large values', function () {
        var _a;
        var searchTerm = '150';
        var result = (0, tokenizedSearch_1.default)(transactions, searchTerm, getSearchableFields);
        expect(result).toHaveLength(1);
        expect((_a = result.at(0)) === null || _a === void 0 ? void 0 : _a.transactionID).toBe('3');
    });
    it('should search by formatted amount with comma', function () {
        var _a;
        var searchTerm = '$25.00';
        var result = (0, tokenizedSearch_1.default)(transactions, searchTerm, getSearchableFields);
        expect(result).toHaveLength(1);
        expect((_a = result.at(0)) === null || _a === void 0 ? void 0 : _a.transactionID).toBe('2');
    });
});
