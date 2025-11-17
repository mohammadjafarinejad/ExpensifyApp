"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_native_svg_1 = require("react-native-svg");
/**
 * Empty placeholder icon that maintains dimensions without showing any visible content.
 * Used during lazy loading to prevent layout shifting while keeping clean appearance.
 */
function PlaceholderIcon(_a) {
    var _b = _a.width, width = _b === void 0 ? 24 : _b, _c = _a.height, height = _c === void 0 ? 24 : _c, fill = _a.fill, style = _a.style, testID = _a.testID;
    return (<react_native_svg_1.default width={width} height={height} viewBox="0 0 24 24" fill={fill} style={style} testID={testID}>
            {/* Completely empty - no visible content, just maintains dimensions */}
        </react_native_svg_1.default>);
}
PlaceholderIcon.displayName = 'PlaceholderIcon';
exports.default = PlaceholderIcon;
