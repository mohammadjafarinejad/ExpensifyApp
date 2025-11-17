"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @jest-environment node
 */
var child_process_1 = require("child_process");
var path_1 = require("path");
var SCRIPT_PATH = path_1.default.resolve(__dirname, '../../.github/scripts/parseAndCollectJSONs.rb');
function runScript(input) {
    var result = (0, child_process_1.execSync)("ruby ".concat(SCRIPT_PATH, " '").concat(input, "'"), {
        encoding: 'utf-8',
    });
    return JSON.parse(result);
}
describe('Test if parseAndCollectJSONs works correctly', function () {
    test('returns empty array if no JSON objects present', function () {
        var result = runScript('hello world without json');
        expect(result).toEqual([]);
    });
    test('extracts single JSON object', function () {
        var json = '{"foo": "bar"}';
        var result = runScript("Some text ".concat(json, " more text"));
        expect(result).toEqual([{ foo: 'bar' }]);
    });
    test('extracts multiple JSON objects', function () {
        var text = "prefix {\"a\":1} middle {\"b\":2} end";
        var result = runScript(text);
        expect(result).toEqual([{ a: 1 }, { b: 2 }]);
    });
    test('ignores invalid JSON objects and parses valid ones', function () {
        var text = "some {invalid json} text {\"valid\": 123}";
        var result = runScript(text);
        expect(result).toEqual([{ valid: 123 }]);
    });
    test('handles nested JSON correctly', function () {
        var text = "start {\"outer\": {\"inner\": 42}} end";
        var result = runScript(text);
        expect(result).toEqual([{ outer: { inner: 42 } }]);
    });
});
