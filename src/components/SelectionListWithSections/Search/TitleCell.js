"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var TextWithTooltip_1 = require("@components/TextWithTooltip");
var useThemeStyles_1 = require("@hooks/useThemeStyles");
function TitleCell(_a) {
    var text = _a.text, isLargeScreenWidth = _a.isLargeScreenWidth;
    var styles = (0, useThemeStyles_1.default)();
    return (<TextWithTooltip_1.default text={text} shouldShowTooltip style={[isLargeScreenWidth ? styles.lineHeightLarge : styles.lh20, styles.pre, styles.justifyContentCenter]}/>);
}
exports.default = TitleCell;
