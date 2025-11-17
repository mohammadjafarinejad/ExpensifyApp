"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CategoryUtils_1 = require("@libs/CategoryUtils");
describe("isMissingCategory", function () {
    it('returns true if category is undefined', function () {
        expect((0, CategoryUtils_1.isCategoryMissing)(undefined)).toBe(true);
    });
    it('returns true if category is an empty string', function () {
        expect((0, CategoryUtils_1.isCategoryMissing)('')).toBe(true);
    });
    it('returns true if category "none" or "Uncategorized"', function () {
        expect((0, CategoryUtils_1.isCategoryMissing)('none')).toBe(true);
        expect((0, CategoryUtils_1.isCategoryMissing)('Uncategorized')).toBe(true);
    });
    it('returns false if category is a valid string', function () {
        expect((0, CategoryUtils_1.isCategoryMissing)('Travel')).toBe(false);
        expect((0, CategoryUtils_1.isCategoryMissing)('Meals')).toBe(false);
    });
});
describe('isCategoryDescriptionRequired', function () {
    var mockPolicyCategories = {
        Travel: {
            areCommentsRequired: true,
            enabled: true,
            name: 'Travel',
            pendingAction: null,
        },
        Meals: {
            areCommentsRequired: false,
            enabled: true,
            name: 'Meals',
            pendingAction: null,
        },
        Office: {
            areCommentsRequired: true,
            enabled: false,
            name: 'Office',
            pendingAction: null,
        },
    };
    it('returns false when policyCategories is undefined', function () {
        expect((0, CategoryUtils_1.isCategoryDescriptionRequired)(undefined, 'Travel', true)).toBe(false);
    });
    it('returns false when category is undefined', function () {
        expect((0, CategoryUtils_1.isCategoryDescriptionRequired)(mockPolicyCategories, undefined, true)).toBe(false);
    });
    it('returns false when category is empty string', function () {
        expect((0, CategoryUtils_1.isCategoryDescriptionRequired)(mockPolicyCategories, '', true)).toBe(false);
    });
    it('returns false when areRulesEnabled is undefined', function () {
        expect((0, CategoryUtils_1.isCategoryDescriptionRequired)(mockPolicyCategories, 'Travel', undefined)).toBe(false);
    });
    it('returns false when areRulesEnabled is false', function () {
        expect((0, CategoryUtils_1.isCategoryDescriptionRequired)(mockPolicyCategories, 'Travel', false)).toBe(false);
    });
    it('returns true when category has areCommentsRequired set to true and rules are enabled', function () {
        expect((0, CategoryUtils_1.isCategoryDescriptionRequired)(mockPolicyCategories, 'Travel', true)).toBe(true);
    });
    it('returns false when category has areCommentsRequired set to false even if rules are enabled', function () {
        expect((0, CategoryUtils_1.isCategoryDescriptionRequired)(mockPolicyCategories, 'Meals', true)).toBe(false);
    });
    it('returns true when category has areCommentsRequired set to true regardless of enabled status', function () {
        expect((0, CategoryUtils_1.isCategoryDescriptionRequired)(mockPolicyCategories, 'Office', true)).toBe(true);
    });
    it('returns false when category does not exist in policyCategories', function () {
        expect((0, CategoryUtils_1.isCategoryDescriptionRequired)(mockPolicyCategories, 'NonExistentCategory', true)).toBe(false);
    });
    it('returns false when all parameters are valid but areCommentsRequired is falsy', function () {
        var categoriesWithFalsyComments = {
            TestCategory: {
                areCommentsRequired: false,
                enabled: true,
                name: 'TestCategory',
                pendingAction: null,
            },
        };
        expect((0, CategoryUtils_1.isCategoryDescriptionRequired)(categoriesWithFalsyComments, 'TestCategory', true)).toBe(false);
    });
    it('handles edge case with undefined areCommentsRequired', function () {
        var categoriesWithUndefinedComments = {
            TestCategory: {
                enabled: true,
                name: 'TestCategory',
                pendingAction: null,
            },
        };
        expect((0, CategoryUtils_1.isCategoryDescriptionRequired)(categoriesWithUndefinedComments, 'TestCategory', true)).toBe(false);
    });
});
