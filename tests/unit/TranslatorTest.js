"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Translator_1 = require("@scripts/utils/Translator/Translator");
var TestTranslator = /** @class */ (function (_super) {
    __extends(TestTranslator, _super);
    function TestTranslator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TestTranslator.prototype.performTranslation = function () {
        return Promise.resolve('');
    };
    return TestTranslator;
}(Translator_1.default));
describe('Translator - Chinese Brackets Fix', function () {
    var translator;
    beforeEach(function () {
        translator = new TestTranslator();
    });
    describe('fixChineseBracketsInMarkdown', function () {
        it('should fix Chinese brackets in markdown links', function () {
            var input = '【Click here】(https://example.com)';
            var expected = '[Click here](https://example.com)';
            var result = translator.fixChineseBracketsInMarkdown(input);
            expect(result).toBe(expected);
        });
        it('should fix Chinese brackets in markdown images', function () {
            var input = '!【Alt text】(https://example.com/image.png)';
            var expected = '![Alt text](https://example.com/image.png)';
            var result = translator.fixChineseBracketsInMarkdown(input);
            expect(result).toBe(expected);
        });
        it('should fix Chinese brackets in reference-style links', function () {
            var input = '【Link text】【ref-id】';
            var expected = '[Link text][ref-id]';
            var result = translator.fixChineseBracketsInMarkdown(input);
            expect(result).toBe(expected);
        });
        it('should fix Chinese brackets in reference definitions', function () {
            var input = '【ref-id】: https://example.com "Title"';
            var expected = '[ref-id]: https://example.com "Title"';
            var result = translator.fixChineseBracketsInMarkdown(input);
            expect(result).toBe(expected);
        });
        it('should fix Chinese brackets for URLs', function () {
            var input = '【https://example.com】';
            var expected = '[https://example.com]';
            var result = translator.fixChineseBracketsInMarkdown(input);
            expect(result).toBe(expected);
        });
        it('should fix Chinese brackets in task list items', function () {
            var input = '- 【x】 Completed task\n- 【 】 Incomplete task';
            var expected = '- [x] Completed task\n- [ ] Incomplete task';
            var result = translator.fixChineseBracketsInMarkdown(input);
            expect(result).toBe(expected);
        });
        it('should handle multiple markdown patterns in one text', function () {
            var input = "\n                Check out \u3010this link\u3011(https://example.com) and this image !\u3010screenshot\u3011(image.png).\n                Also see \u3010reference\u3011\u30101\u3011 and the definition:\n                \u30101\u3011: https://reference.com\n\n                Tasks:\n                - \u3010x\u3011 Done\n                - \u3010 \u3011 Todo\n            ".trim();
            var expected = "\n                Check out [this link](https://example.com) and this image ![screenshot](image.png).\n                Also see [reference][1] and the definition:\n                [1]: https://reference.com\n\n                Tasks:\n                - [x] Done\n                - [ ] Todo\n            ".trim();
            var result = translator.fixChineseBracketsInMarkdown(input);
            expect(result).toBe(expected);
        });
        it('should return original text if no Chinese brackets present', function () {
            var input = '[Normal link](https://example.com) and regular text';
            var expected = '[Normal link](https://example.com) and regular text';
            var result = translator.fixChineseBracketsInMarkdown(input);
            expect(result).toBe(expected);
        });
        it('should handle empty string', function () {
            var input = '';
            var expected = '';
            var result = translator.fixChineseBracketsInMarkdown(input);
            expect(result).toBe(expected);
        });
        it('should handle nested markdown structures', function () {
            var input = '【【nested】】(url)';
            var expected = '[[nested]](url)';
            var result = translator.fixChineseBracketsInMarkdown(input);
            expect(result).toBe(expected);
        });
        it('should handle task lists with different bullet points', function () {
            var input = '* 【x】 Task 1\n+ 【 】 Task 2\n- 【x】 Task 3';
            var expected = '* [x] Task 1\n+ [ ] Task 2\n- [x] Task 3';
            var result = translator.fixChineseBracketsInMarkdown(input);
            expect(result).toBe(expected);
        });
        it('should handle indented task lists', function () {
            var input = '  - 【x】 Indented task\n    - 【 】 More indented';
            var expected = '  - [x] Indented task\n    - [ ] More indented';
            var result = translator.fixChineseBracketsInMarkdown(input);
            expect(result).toBe(expected);
        });
    });
});
