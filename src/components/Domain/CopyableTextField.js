"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_native_1 = require("react-native");
var ActivityIndicator_1 = require("@components/ActivityIndicator");
var CopyTextToClipboard_1 = require("@components/CopyTextToClipboard");
var Text_1 = require("@components/Text");
var useTheme_1 = require("@hooks/useTheme");
var useThemeStyles_1 = require("@hooks/useThemeStyles");
function CopyableTextField(_a) {
    var value = _a.value, _b = _a.isLoading, isLoading = _b === void 0 ? false : _b;
    var styles = (0, useThemeStyles_1.default)();
    var theme = (0, useTheme_1.default)();
    return (<react_native_1.View style={[styles.qbdSetupLinkBox, styles.border, styles.flexRow, styles.gap2, styles.justifyContentCenter, styles.alignItemsCenter]}>
            {isLoading ? (<ActivityIndicator_1.default color={theme.text}/>) : (<>
                    <Text_1.default style={styles.copyableTextField}>{value !== null && value !== void 0 ? value : ''}</Text_1.default>
                    <react_native_1.View style={[styles.reportActionContextMenuMiniButton, styles.overflowHidden, styles.buttonHoveredBG]}>
                        <CopyTextToClipboard_1.default urlToCopy={value !== null && value !== void 0 ? value : ''}/>
                    </react_native_1.View>
                </>)}
        </react_native_1.View>);
}
CopyableTextField.displayName = 'CopyableTextField';
exports.default = CopyableTextField;
