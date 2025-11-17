"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var CopyTextToClipboard_1 = require("@components/CopyTextToClipboard");
var useThemeStyles_1 = require("@hooks/useThemeStyles");
function CopyTextRenderer(_a) {
    var tnode = _a.tnode;
    var styles = (0, useThemeStyles_1.default)();
    var textToCopy = tnode.attributes.text || '';
    if (!textToCopy) {
        return null;
    }
    return (<CopyTextToClipboard_1.default text={textToCopy} textStyles={[styles.textBlue]}/>);
}
CopyTextRenderer.displayName = 'CopyTextRenderer';
exports.default = CopyTextRenderer;
