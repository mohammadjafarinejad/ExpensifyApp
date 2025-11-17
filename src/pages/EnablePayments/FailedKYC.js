"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_native_1 = require("react-native");
var RenderHTML_1 = require("@components/RenderHTML");
var useLocalize_1 = require("@hooks/useLocalize");
var useThemeStyles_1 = require("@hooks/useThemeStyles");
var CONST_1 = require("@src/CONST");
function FailedKYC() {
    var translate = (0, useLocalize_1.default)().translate;
    var styles = (0, useThemeStyles_1.default)();
    return (<react_native_1.View style={styles.flex1}>
            <react_native_1.View style={[styles.ph5, styles.flexRow, styles.renderHTML]}>
                <RenderHTML_1.default html={translate('additionalDetailsStep.failedKYCMessage', {
            conciergeEmail: CONST_1.default.EMAIL.CONCIERGE,
        })}/>
            </react_native_1.View>
        </react_native_1.View>);
}
FailedKYC.displayName = 'FailedKYC';
exports.default = FailedKYC;
