"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var Icon_1 = require("@components/Icon");
var Expensicons = require("@components/Icon/Expensicons");
var OfflineWithFeedback_1 = require("@components/OfflineWithFeedback");
var Pressable_1 = require("@components/Pressable");
var useLocalize_1 = require("@hooks/useLocalize");
var useTheme_1 = require("@hooks/useTheme");
var useThemeStyles_1 = require("@hooks/useThemeStyles");
var Navigation_1 = require("@libs/Navigation/Navigation");
var CONST_1 = require("@src/CONST");
var ROUTES_1 = require("@src/ROUTES");
var DomainsListRow_1 = require("./DomainsListRow");
function DomainMenuItem(_a) {
    var item = _a.item, index = _a.index;
    var styles = (0, useThemeStyles_1.default)();
    var translate = (0, useLocalize_1.default)().translate;
    var isAdmin = item.isAdmin, isValidated = item.isValidated;
    var theme = (0, useTheme_1.default)();
    var threeDotsMenuItems = !isValidated && isAdmin
        ? [
            {
                icon: Expensicons.Globe,
                text: translate('domain.goToDomain'),
                onSelected: item.action,
            },
            {
                icon: Expensicons.Globe,
                text: translate('domain.verifyDomain.title'),
                onSelected: function () { return Navigation_1.default.navigate(ROUTES_1.default.WORKSPACES_VERIFY_DOMAIN.getRoute(item.accountID)); },
            },
        ]
        : undefined;
    return (<OfflineWithFeedback_1.default key={"domain_".concat(item.title, "_").concat(index)} pendingAction={item.pendingAction} style={styles.mb2}>
            <Pressable_1.PressableWithoutFeedback role={CONST_1.default.ROLE.BUTTON} accessibilityLabel="row" style={styles.mh5} onPress={item.action} disabled={!isAdmin}>
                {function (_a) {
            var hovered = _a.hovered;
            return (<DomainsListRow_1.default title={item.title} badgeText={isAdmin && !isValidated ? translate('domain.notVerified') : undefined} isHovered={hovered} menuItems={threeDotsMenuItems} rightIcon={isValidated ? (<Icon_1.default src={Expensicons.NewWindow} fill={hovered ? theme.iconHovered : theme.icon} isButtonIcon/>) : (<Icon_1.default src={Expensicons.ArrowRight} fill={theme.icon} additionalStyles={[styles.alignSelfCenter, !hovered && styles.opacitySemiTransparent]} isButtonIcon medium/>)}/>);
        }}
            </Pressable_1.PressableWithoutFeedback>
        </OfflineWithFeedback_1.default>);
}
DomainMenuItem.displayName = 'DomainMenuItem';
exports.default = DomainMenuItem;
