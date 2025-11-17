"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var ColoredLetterAvatar_1 = require("@components/ColoredLetterAvatar");
var PresetAvatarCatalog_1 = require("@libs/Avatars/PresetAvatarCatalog");
var getFirstAlphaNumericCharacter_1 = require("@libs/getFirstAlphaNumericCharacter");
/**
 * Generates letter avatars based on a user's name initial in all available color combinations.
 *
 * @param name - The user's name from which the first alphanumeric character is extracted
 * @param size - Optional size for the avatars
 * @returns Object with avatarList (array for AvatarSelector) and avatarMap (lookup for AvatarPage)
 */
function useLetterAvatars(name, size) {
    return (0, react_1.useMemo)(function () {
        var avatarComponent = (0, PresetAvatarCatalog_1.getLetterAvatar)(name);
        if (!avatarComponent) {
            return { avatarList: [], avatarMap: {} };
        }
        var avatarList = [];
        var avatarMap = {};
        PresetAvatarCatalog_1.LETTER_AVATAR_COLOR_OPTIONS.forEach(function (_a) {
            var fillColor = _a.fillColor, backgroundColor = _a.backgroundColor;
            function StyledLetterAvatar() {
                return (<ColoredLetterAvatar_1.default fillColor={fillColor} backgroundColor={backgroundColor} 
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                component={avatarComponent} size={size}/>);
            }
            var id = "letter-avatar-".concat(backgroundColor, "-").concat(fillColor, "-").concat((0, getFirstAlphaNumericCharacter_1.default)(name));
            avatarList.push({
                id: id,
                StyledLetterAvatar: StyledLetterAvatar,
            });
            avatarMap[id] = StyledLetterAvatar;
        });
        return {
            avatarList: avatarList,
            avatarMap: avatarMap,
        };
    }, [name, size]);
}
exports.default = useLetterAvatars;
