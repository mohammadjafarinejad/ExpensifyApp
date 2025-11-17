"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var BasePopoverReactionList_1 = require("./BasePopoverReactionList");
function PopoverReactionList(_a) {
    var ref = _a.ref;
    var innerReactionListRef = (0, react_1.useRef)(null);
    var _b = (0, react_1.useState)(''), reactionListReportActionID = _b[0], setReactionListReportActionID = _b[1];
    var _c = (0, react_1.useState)(''), reactionListEmojiName = _c[0], setReactionListEmojiName = _c[1];
    var showReactionList = function (event, reactionListAnchor, emojiName, reportActionID) {
        var _a;
        setReactionListReportActionID(reportActionID);
        setReactionListEmojiName(emojiName);
        (_a = innerReactionListRef.current) === null || _a === void 0 ? void 0 : _a.showReactionList(event, reactionListAnchor);
    };
    var hideReactionList = function () {
        var _a;
        (_a = innerReactionListRef.current) === null || _a === void 0 ? void 0 : _a.hideReactionList();
    };
    var isActiveReportAction = function (actionID) { return !!actionID && reactionListReportActionID === actionID; };
    (0, react_1.useImperativeHandle)(ref, function () { return ({ showReactionList: showReactionList, hideReactionList: hideReactionList, isActiveReportAction: isActiveReportAction }); });
    return (<BasePopoverReactionList_1.default ref={innerReactionListRef} reportActionID={reactionListReportActionID} emojiName={reactionListEmojiName}/>);
}
PopoverReactionList.displayName = 'PopoverReactionList';
exports.default = react_1.default.memo(PopoverReactionList);
