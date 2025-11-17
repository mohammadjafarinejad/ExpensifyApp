"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_native_1 = require("react-native");
var Badge_1 = require("@components/Badge");
var Icon_1 = require("@components/Icon");
var Expensicons = require("@components/Icon/Expensicons");
var TextWithTooltip_1 = require("@components/TextWithTooltip");
var ThreeDotsMenu_1 = require("@components/ThreeDotsMenu");
var useTheme_1 = require("@hooks/useTheme");
var useThemeStyles_1 = require("@hooks/useThemeStyles");
var CONST_1 = require("@src/CONST");
function DomainsListRow(_a) {
    var title = _a.title, isHovered = _a.isHovered, badgeText = _a.badgeText, brickRoadIndicator = _a.brickRoadIndicator, menuItems = _a.menuItems, rightIcon = _a.rightIcon;
    var styles = (0, useThemeStyles_1.default)();
    var theme = (0, useTheme_1.default)();
    return (<react_native_1.View style={[styles.flexRow, styles.highlightBG, styles.br3, styles.p5, styles.pr3, styles.alignItemsCenter, styles.gap3, isHovered && styles.hoveredComponentBG]}>
            <react_native_1.View style={[styles.flex1, styles.flexRow, styles.bgTransparent, styles.gap3, styles.alignItemsCenter, styles.justifyContentStart]}>
                <Icon_1.default src={Expensicons.Globe} fill={theme.icon} additionalStyles={styles.domainIcon}/>
                <TextWithTooltip_1.default text={title} shouldShowTooltip style={styles.textStrong}/>

                {!!badgeText && (<react_native_1.View style={[styles.flexRow, styles.gap2, styles.alignItemsCenter, styles.justifyContentEnd]}>
                        <Badge_1.default text={badgeText} textStyles={styles.textStrong} badgeStyles={[styles.alignSelfCenter, styles.badgeBordered]}/>
                    </react_native_1.View>)}
            </react_native_1.View>

            <react_native_1.View style={[styles.flexRow, styles.alignItemsCenter]}>
                <react_native_1.View style={[styles.flexRow, styles.justifyContentEnd]}>
                    <react_native_1.View style={[styles.flexRow, styles.ml2, styles.alignItemsCenter]}>
                        <react_native_1.View style={[styles.flexRow, styles.alignItemsCenter, styles.workspaceListRBR, styles.pr3, styles.mt0]}>
                            {!!brickRoadIndicator && (<Icon_1.default src={Expensicons.DotIndicator} fill={brickRoadIndicator === CONST_1.default.BRICK_ROAD_INDICATOR_STATUS.ERROR ? theme.danger : theme.iconSuccessFill}/>)}
                        </react_native_1.View>
                        {!!(menuItems === null || menuItems === void 0 ? void 0 : menuItems.length) && (<ThreeDotsMenu_1.default shouldSelfPosition menuItems={menuItems} anchorAlignment={{ horizontal: CONST_1.default.MODAL.ANCHOR_ORIGIN_HORIZONTAL.RIGHT, vertical: CONST_1.default.MODAL.ANCHOR_ORIGIN_VERTICAL.TOP }} shouldOverlay isNested/>)}
                    </react_native_1.View>
                </react_native_1.View>
                <react_native_1.View style={styles.touchableButtonImage}>{rightIcon}</react_native_1.View>
            </react_native_1.View>
        </react_native_1.View>);
}
DomainsListRow.displayName = 'DomainsListRow';
exports.default = DomainsListRow;
