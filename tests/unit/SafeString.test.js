"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SafeString_1 = require("../../src/utils/SafeString");
describe('SafeString', function () {
    test('returns empty string for undefined and null', function () {
        expect((0, SafeString_1.default)(undefined)).toBe('');
        expect((0, SafeString_1.default)(null)).toBe('');
    });
    test('handles strings directly', function () {
        expect((0, SafeString_1.default)('hello')).toBe('hello');
        expect((0, SafeString_1.default)('')).toBe('');
    });
    test('handles numbers, booleans, functions, bigint, symbol', function () {
        expect((0, SafeString_1.default)(123)).toBe('123');
        expect((0, SafeString_1.default)(0)).toBe('0');
        expect((0, SafeString_1.default)(true)).toBe('true');
        expect((0, SafeString_1.default)(false)).toBe('false');
        expect((0, SafeString_1.default)(function () { return 1; })).toBe("function () {\n      return 1;\n    }");
        expect((0, SafeString_1.default)(BigInt(10))).toBe('10');
        var sym = Symbol('x');
        expect((0, SafeString_1.default)(sym)).toBe(String(sym));
    });
    test('handles arrays via JSON, including nested', function () {
        expect((0, SafeString_1.default)([1, 'a', true])).toBe('[1,"a",true]');
        expect((0, SafeString_1.default)([1, { a: 2 }])).toBe('[1,{"a":2}]');
    });
    test('arrays with circular refs fall back to [object Array]', function () {
        var arr = [1];
        arr.push(arr);
        expect((0, SafeString_1.default)(arr)).toBe('[object Array]');
    });
    test('Plain JavaScript objects stringify to JSON', function () {
        expect((0, SafeString_1.default)({ a: 1, b: 'x' })).toBe('{"a":1,"b":"x"}');
    });
    test('objects with custom toString use it', function () {
        var obj = {
            toString: function () {
                return 'custom';
            },
        };
        expect((0, SafeString_1.default)(obj)).toBe('custom');
    });
    test('objects with circular refs fall back to [object Object]', function () {
        var obj = { a: 1 };
        obj.self = obj;
        expect((0, SafeString_1.default)(obj)).toBe('[object Object]');
    });
    test('comparisons should fallback the same way as value?.toString() for undefined', function () {
        var _a;
        var testValue = undefined;
        var comparisonWithSafeString = (0, SafeString_1.default)(testValue) || 'fallback';
        var comparisonWithToString = (_a = testValue === null || testValue === void 0 ? void 0 : testValue.toString()) !== null && _a !== void 0 ? _a : 'fallback';
        expect(comparisonWithSafeString).toBe('fallback');
        expect(comparisonWithToString).toBe('fallback');
        expect(comparisonWithSafeString).toBe(comparisonWithToString);
    });
    test('comparisons with nullish coalescing operator should fallback the same way for undefined', function () {
        var testValue = undefined;
        var comparisonWithSafeString = (0, SafeString_1.default)(testValue);
        // eslint-disable-next-line @typescript-eslint/no-base-to-string
        var comparisonWithToString = String(testValue !== null && testValue !== void 0 ? testValue : '');
        expect(comparisonWithSafeString).toBe('');
        expect(comparisonWithToString).toBe('');
        expect(comparisonWithSafeString).toBe(comparisonWithToString);
    });
    test('returns same results as String() for dates', function () {
        var now = new Date();
        expect((0, SafeString_1.default)(now)).toBe(String(now));
    });
    test('returns same results as String() for errors', function () {
        var error = new Error('test');
        expect((0, SafeString_1.default)(error)).toBe(String(error));
    });
    test('returns same results as String() for collection objects', function () {
        expect((0, SafeString_1.default)(new Map())).toBe('[object Map]');
        // eslint-disable-next-line @typescript-eslint/no-base-to-string
        expect((0, SafeString_1.default)(new Map())).toBe(String(new Map()));
        expect((0, SafeString_1.default)(new Set())).toBe('[object Set]');
        // eslint-disable-next-line @typescript-eslint/no-base-to-string
        expect((0, SafeString_1.default)(new Set())).toBe(String(new Set()));
    });
    test('returns same results as String() for regexes', function () {
        var regex = /test/;
        expect((0, SafeString_1.default)(regex)).toBe(String(regex));
    });
});
