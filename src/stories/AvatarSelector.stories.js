"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SmallAvatars = exports.LargeAvatars = exports.WithPreselectedLetterAvatar = exports.WithPreselectedAvatar = exports.Default = void 0;
var react_1 = require("react");
var AvatarSelector_1 = require("@components/AvatarSelector");
var CONST_1 = require("@src/CONST");
var story = {
    title: 'Components/AvatarSelector',
    component: AvatarSelector_1.default,
};
function Template(props) {
    var _a = (0, react_1.useState)(props.selectedID), selected = _a[0], setSelected = _a[1];
    // eslint-disable-next-line react/jsx-props-no-spreading
    return (<AvatarSelector_1.default {...props} selectedID={selected} onSelect={setSelected}/>);
}
var Default = Template.bind({});
exports.Default = Default;
Default.args = {
    selectedID: undefined,
    label: 'Or choose an avatar',
    name: 'A',
};
var WithPreselectedAvatar = Template.bind({});
exports.WithPreselectedAvatar = WithPreselectedAvatar;
WithPreselectedAvatar.args = {
    selectedID: 'default-avatar_3',
    label: 'With preselected avatar',
    name: 'A',
};
var WithPreselectedLetterAvatar = Template.bind({});
exports.WithPreselectedLetterAvatar = WithPreselectedLetterAvatar;
WithPreselectedLetterAvatar.args = {
    selectedID: 'letter-avatar-#B0D9FF-#0164BF-A',
    label: 'With preselected avatar',
    name: 'A',
};
var LargeAvatars = Template.bind({});
exports.LargeAvatars = LargeAvatars;
LargeAvatars.args = {
    selectedID: 'helmet-blue400',
    size: CONST_1.default.AVATAR_SIZE.LARGE,
    label: 'Large avatars',
    name: 'A',
};
var SmallAvatars = Template.bind({});
exports.SmallAvatars = SmallAvatars;
SmallAvatars.args = {
    size: CONST_1.default.AVATAR_SIZE.SMALL,
    label: 'Small avatars',
    name: 'A',
};
exports.default = story;
