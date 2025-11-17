"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var expensify_common_1 = require("expensify-common");
var react_1 = require("react");
var react_native_1 = require("react-native");
var Text_1 = require("@components/Text");
var useThemeStyles_1 = require("@hooks/useThemeStyles");
var EmojiUtils_1 = require("@libs/EmojiUtils");
var TextWithEmojiFragment_1 = require("./comment/TextWithEmojiFragment");
function ReportActionItemBasicMessage(_a) {
    var message = _a.message, children = _a.children;
    var styles = (0, useThemeStyles_1.default)();
    var messageContainsCustomEmojiWithText = (0, react_1.useMemo)(function () { return (0, EmojiUtils_1.containsCustomEmoji)(message) && !(0, EmojiUtils_1.containsOnlyCustomEmoji)(message); }, [message]);
    return (<react_native_1.View>
            {!!message &&
            (messageContainsCustomEmojiWithText ? (<TextWithEmojiFragment_1.default message={expensify_common_1.Str.htmlDecode(message)} style={[styles.chatItemMessage, styles.colorMuted]} alignCustomEmoji/>) : (<Text_1.default style={[styles.chatItemMessage, styles.colorMuted]}>{expensify_common_1.Str.htmlDecode(message)}</Text_1.default>))}
            {children}
        </react_native_1.View>);
}
ReportActionItemBasicMessage.displayName = 'ReportActionBasicMessage';
exports.default = ReportActionItemBasicMessage;
