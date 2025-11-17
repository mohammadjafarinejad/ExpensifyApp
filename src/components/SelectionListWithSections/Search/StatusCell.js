"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_native_1 = require("react-native");
var Text_1 = require("@components/Text");
var useLocalize_1 = require("@hooks/useLocalize");
var useTheme_1 = require("@hooks/useTheme");
var useThemeStyles_1 = require("@hooks/useThemeStyles");
var ReportUtils_1 = require("@libs/ReportUtils");
function StatusCell(_a) {
    var stateNum = _a.stateNum, statusNum = _a.statusNum;
    var styles = (0, useThemeStyles_1.default)();
    var theme = (0, useTheme_1.default)();
    var translate = (0, useLocalize_1.default)().translate;
    var statusText = (0, react_1.useMemo)(function () { return (0, ReportUtils_1.getReportStatusTranslation)({ stateNum: stateNum, statusNum: statusNum, translate: translate }); }, [stateNum, statusNum, translate]);
    var reportStatusColorStyle = (0, react_1.useMemo)(function () { return (0, ReportUtils_1.getReportStatusColorStyle)(theme, stateNum, statusNum); }, [theme, stateNum, statusNum]);
    if (!statusText || !reportStatusColorStyle) {
        return null;
    }
    return (<react_native_1.View style={[styles.w100, styles.justifyContentCenter]}>
            <react_native_1.View style={[
            styles.reportStatusContainer,
            {
                backgroundColor: reportStatusColorStyle.backgroundColor,
            },
        ]}>
                <Text_1.default style={[styles.reportStatusText, { color: reportStatusColorStyle.textColor }]}>{statusText}</Text_1.default>
            </react_native_1.View>
        </react_native_1.View>);
}
StatusCell.displayName = 'StatusCell';
exports.default = StatusCell;
