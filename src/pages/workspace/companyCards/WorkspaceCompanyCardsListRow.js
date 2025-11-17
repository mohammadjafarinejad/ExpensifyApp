"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_native_1 = require("react-native");
var Avatar_1 = require("@components/Avatar");
var Icon_1 = require("@components/Icon");
var Expensicons = require("@components/Icon/Expensicons");
var Text_1 = require("@components/Text");
var useTheme_1 = require("@hooks/useTheme");
var useThemeStyles_1 = require("@hooks/useThemeStyles");
var PersonalDetailsUtils_1 = require("@libs/PersonalDetailsUtils");
var UserAvatarUtils_1 = require("@libs/UserAvatarUtils");
var CONST_1 = require("@src/CONST");
function WorkspaceCompanyCardsListRow(_a) {
    var _b;
    var cardholder = _a.cardholder, name = _a.name, cardNumber = _a.cardNumber, isHovered = _a.isHovered;
    var styles = (0, useThemeStyles_1.default)();
    var cardholderName = (0, react_1.useMemo)(function () { return (0, PersonalDetailsUtils_1.getDisplayNameOrDefault)(cardholder); }, [cardholder]);
    var theme = (0, useTheme_1.default)();
    return (<react_native_1.View style={[styles.flexRow, styles.justifyContentBetween, styles.alignItemsCenter, styles.br3, styles.p4]}>
            <react_native_1.View style={[styles.flexRow, styles.gap3, styles.alignItemsCenter, styles.flex3]}>
                <Avatar_1.default source={(_b = cardholder === null || cardholder === void 0 ? void 0 : cardholder.avatar) !== null && _b !== void 0 ? _b : (0, UserAvatarUtils_1.getDefaultAvatarURL)({
            accountID: cardholder === null || cardholder === void 0 ? void 0 : cardholder.accountID,
        })} avatarID={cardholder === null || cardholder === void 0 ? void 0 : cardholder.accountID} type={CONST_1.default.ICON_TYPE_AVATAR} size={CONST_1.default.AVATAR_SIZE.DEFAULT}/>
                <react_native_1.View style={[styles.flex1, styles.pr2]}>
                    <Text_1.default numberOfLines={1} style={[styles.optionDisplayName, styles.textStrong, styles.pre]}>
                        {cardholderName}
                    </Text_1.default>
                    <Text_1.default numberOfLines={1} style={[styles.textLabelSupporting, styles.lh16]}>
                        {name}
                    </Text_1.default>
                </react_native_1.View>
            </react_native_1.View>
            <react_native_1.View style={[styles.flex1, styles.alignItemsEnd]}>
                <Text_1.default numberOfLines={1} style={[styles.textLabelSupporting, styles.lh16]}>
                    {cardNumber}
                </Text_1.default>
            </react_native_1.View>
            <react_native_1.View style={[styles.justifyContentCenter, styles.alignItemsCenter, styles.ml2]}>
                <Icon_1.default src={Expensicons.ArrowRight} fill={theme.icon} additionalStyles={[styles.alignSelfCenter, !isHovered && styles.opacitySemiTransparent]} medium isButtonIcon/>
            </react_native_1.View>
        </react_native_1.View>);
}
WorkspaceCompanyCardsListRow.displayName = 'WorkspaceCompanyCardsListRow';
exports.default = WorkspaceCompanyCardsListRow;
