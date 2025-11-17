"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_native_1 = require("react-native");
var useStyleUtils_1 = require("@hooks/useStyleUtils");
var CONST_1 = require("@src/CONST");
var ImageSVG_1 = require("./ImageSVG");
/**
 * ColoredLetterAvatar renders an SVG component with a colored circular background.
 * Used for letter avatars and other colored icon avatars.
 */
function ColoredLetterAvatar(_a) {
    var component = _a.component, backgroundColor = _a.backgroundColor, fillColor = _a.fillColor, _b = _a.size, size = _b === void 0 ? CONST_1.default.AVATAR_SIZE.MEDIUM : _b;
    var StyleUtils = (0, useStyleUtils_1.default)();
    var avatarSize = StyleUtils.getAvatarSize(size);
    return (<react_native_1.View style={{ width: avatarSize, height: avatarSize, backgroundColor: backgroundColor }} dataSet={{ id: 'colored-avatar' }}>
            <ImageSVG_1.default src={component} width={avatarSize} height={avatarSize} fill={fillColor}/>
        </react_native_1.View>);
}
ColoredLetterAvatar.displayName = 'ColoredLetterAvatar';
exports.default = ColoredLetterAvatar;
