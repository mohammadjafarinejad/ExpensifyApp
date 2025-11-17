"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SmallAvatar = exports.FallbackAvatar = exports.WorkspaceAvatar = exports.Default = void 0;
var react_1 = require("react");
var react_native_1 = require("react-native");
var Avatar_1 = require("@components/Avatar");
var Expensicons = require("@components/Icon/Expensicons");
var PresetAvatarCatalog_1 = require("@libs/Avatars/PresetAvatarCatalog");
var CONST_1 = require("@src/CONST");
var AVATAR_URL = PresetAvatarCatalog_1.PRESET_AVATAR_CATALOG['car-blue100'].url;
var story = {
    title: 'Components/Avatar',
    component: Avatar_1.default,
};
function Template(props) {
    return (<react_native_1.View style={{ flexDirection: 'row', padding: 10 }}>
            <Avatar_1.default {...props}/>
        </react_native_1.View>);
}
var Default = Template.bind({});
exports.Default = Default;
Default.args = {
    type: CONST_1.default.ICON_TYPE_AVATAR,
    source: AVATAR_URL,
    name: 'John Doe',
    size: CONST_1.default.AVATAR_SIZE.DEFAULT,
};
var WorkspaceAvatar = Template.bind({});
exports.WorkspaceAvatar = WorkspaceAvatar;
WorkspaceAvatar.args = {
    type: CONST_1.default.ICON_TYPE_WORKSPACE,
    name: 'Cathy’s Croissants',
    avatarID: 'policy_123',
    size: CONST_1.default.AVATAR_SIZE.LARGE,
};
var FallbackAvatar = Template.bind({});
exports.FallbackAvatar = FallbackAvatar;
FallbackAvatar.args = {
    type: CONST_1.default.ICON_TYPE_AVATAR,
    fallbackIcon: Expensicons.FallbackAvatar,
    name: 'Offline User',
    size: CONST_1.default.AVATAR_SIZE.DEFAULT,
};
var SmallAvatar = Template.bind({});
exports.SmallAvatar = SmallAvatar;
SmallAvatar.args = {
    type: CONST_1.default.ICON_TYPE_AVATAR,
    source: AVATAR_URL,
    name: 'Jane',
    size: CONST_1.default.AVATAR_SIZE.SMALL,
};
exports.default = story;
