"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = createRandomPolicyTags;
var falso_1 = require("@ngneat/falso");
function createRandomPolicyTags(tagListName, numberOfTags) {
    var _a;
    if (numberOfTags === void 0) { numberOfTags = 0; }
    var tags = {};
    for (var i = 0; i < numberOfTags; i++) {
        // Prevent the tag name from being duplicated, which can happen when a lot of tests are being ran
        // and can cause tests to fail because tag lists must always contain a unique set of tags
        var tagName = "".concat((0, falso_1.randWord)()).concat(i);
        tags[tagName] = {
            name: tagName,
            enabled: true,
        };
    }
    return _a = {},
        _a[tagListName] = {
            name: tagListName,
            orderWeight: 0,
            required: false,
            tags: tags,
        },
        _a;
}
