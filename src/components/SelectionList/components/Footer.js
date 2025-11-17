"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var Button_1 = require("@components/Button");
var FixedFooter_1 = require("@components/FixedFooter");
var useThemeStyles_1 = require("@hooks/useThemeStyles");
function Footer(_a) {
    var footerContent = _a.footerContent, confirmButtonConfig = _a.confirmButtonConfig, _b = _a.addBottomSafeAreaPadding, addBottomSafeAreaPadding = _b === void 0 ? false : _b;
    var styles = (0, useThemeStyles_1.default)();
    if (footerContent) {
        return (<FixedFooter_1.default style={styles.mtAuto} addBottomSafeAreaPadding={addBottomSafeAreaPadding}>
                {footerContent}
            </FixedFooter_1.default>);
    }
    if (confirmButtonConfig === null || confirmButtonConfig === void 0 ? void 0 : confirmButtonConfig.showButton) {
        return (<FixedFooter_1.default style={styles.mtAuto} addBottomSafeAreaPadding={addBottomSafeAreaPadding}>
                <Button_1.default success large style={[styles.w100, confirmButtonConfig === null || confirmButtonConfig === void 0 ? void 0 : confirmButtonConfig.style]} text={confirmButtonConfig === null || confirmButtonConfig === void 0 ? void 0 : confirmButtonConfig.text} onPress={confirmButtonConfig === null || confirmButtonConfig === void 0 ? void 0 : confirmButtonConfig.onConfirm} pressOnEnter enterKeyEventListenerPriority={1} isDisabled={confirmButtonConfig === null || confirmButtonConfig === void 0 ? void 0 : confirmButtonConfig.isDisabled}/>
            </FixedFooter_1.default>);
    }
    return null;
}
Footer.displayName = 'Footer';
exports.default = react_1.default.memo(Footer);
