"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var native_1 = require("@react-navigation/native");
var react_1 = require("react");
var react_native_1 = require("react-native");
var react_native_reanimated_1 = require("react-native-reanimated");
var Text_1 = require("@components/Text");
var useLocalize_1 = require("@hooks/useLocalize");
var useResponsiveLayout_1 = require("@hooks/useResponsiveLayout");
var useThemeStyles_1 = require("@hooks/useThemeStyles");
var CurrencyUtils_1 = require("@libs/CurrencyUtils");
function MoneyRequestReportTotalSpend(_a) {
    var _b = _a.hasComments, hasComments = _b === void 0 ? false : _b, _c = _a.isLoadingReportActions, isLoadingReportActions = _c === void 0 ? false : _c, isEmptyTransactions = _a.isEmptyTransactions, totalDisplaySpend = _a.totalDisplaySpend, report = _a.report, hasPendingAction = _a.hasPendingAction, textContainerStyle = _a.textContainerStyle;
    var styles = (0, useThemeStyles_1.default)();
    var translate = (0, useLocalize_1.default)().translate;
    var shouldUseNarrowLayout = (0, useResponsiveLayout_1.default)().shouldUseNarrowLayout;
    var isFocused = (0, native_1.useIsFocused)();
    var shouldShowComments = hasComments || isLoadingReportActions;
    var commentContainerStyle = [styles.ph5, styles.justifyContentBetween, styles.mb2];
    return (<react_native_1.View style={[styles.dFlex, styles.flexRow, styles.justifyContentEnd, shouldShowComments && commentContainerStyle]}>
            <react_native_reanimated_1.default.Text style={[styles.textLabelSupporting]} entering={hasComments ? undefined : react_native_reanimated_1.FadeIn} exiting={isFocused ? react_native_reanimated_1.FadeOut : undefined}>
                {shouldShowComments ? translate('common.comments') : ''}
            </react_native_reanimated_1.default.Text>
            {!isEmptyTransactions && (<react_native_1.View style={[styles.dFlex, styles.flexRow, styles.alignItemsCenter, styles.pr3, textContainerStyle, shouldUseNarrowLayout && [styles.justifyContentBetween, styles.w100]]}>
                    <Text_1.default style={[styles.mr3, styles.textLabelSupporting]}>{translate('common.total')}</Text_1.default>
                    <Text_1.default style={[shouldUseNarrowLayout ? styles.mnw64p : styles.mnw100p, styles.textAlignRight, styles.textBold, hasPendingAction && styles.opacitySemiTransparent]}>
                        {(0, CurrencyUtils_1.convertToDisplayString)(totalDisplaySpend, report === null || report === void 0 ? void 0 : report.currency)}
                    </Text_1.default>
                </react_native_1.View>)}
        </react_native_1.View>);
}
MoneyRequestReportTotalSpend.displayName = 'MoneyRequestReportTotalSpend';
exports.default = MoneyRequestReportTotalSpend;
