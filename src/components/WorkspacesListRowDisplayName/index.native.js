"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var Text_1 = require("@components/Text");
var useThemeStyles_1 = require("@hooks/useThemeStyles");
var EmojiUtils_1 = require("@libs/EmojiUtils");
function WorkspacesListRowDisplayName(_a) {
    var isDeleted = _a.isDeleted, ownerName = _a.ownerName;
    var styles = (0, useThemeStyles_1.default)();
    var processedOwnerName = (0, EmojiUtils_1.splitTextWithEmojis)(ownerName);
    return (<Text_1.default numberOfLines={1} style={[styles.labelStrong, isDeleted ? styles.offlineFeedbackDeleted : {}]}>
            {processedOwnerName.length !== 0
            ? (0, EmojiUtils_1.getProcessedText)(processedOwnerName, [styles.labelStrong, isDeleted ? styles.offlineFeedbackDeleted : {}, styles.emojisWithTextFontFamily])
            : ownerName}
        </Text_1.default>);
}
WorkspacesListRowDisplayName.displayName = 'WorkspacesListRowDisplayName';
exports.default = WorkspacesListRowDisplayName;
