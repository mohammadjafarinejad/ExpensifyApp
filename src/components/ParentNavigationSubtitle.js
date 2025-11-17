"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var native_1 = require("@react-navigation/native");
var react_1 = require("react");
var react_native_1 = require("react-native");
var useHover_1 = require("@hooks/useHover");
var useLocalize_1 = require("@hooks/useLocalize");
var useOnyx_1 = require("@hooks/useOnyx");
var useReportIsArchived_1 = require("@hooks/useReportIsArchived");
var useRootNavigationState_1 = require("@hooks/useRootNavigationState");
var useStyleUtils_1 = require("@hooks/useStyleUtils");
var useTheme_1 = require("@hooks/useTheme");
var useThemeStyles_1 = require("@hooks/useThemeStyles");
var isNavigatorName_1 = require("@libs/Navigation/helpers/isNavigatorName");
var Navigation_1 = require("@libs/Navigation/Navigation");
var ReportActionsUtils_1 = require("@libs/ReportActionsUtils");
var ReportUtils_1 = require("@libs/ReportUtils");
var CONST_1 = require("@src/CONST");
var NAVIGATORS_1 = require("@src/NAVIGATORS");
var ONYXKEYS_1 = require("@src/ONYXKEYS");
var ROUTES_1 = require("@src/ROUTES");
var SCREENS_1 = require("@src/SCREENS");
var Text_1 = require("./Text");
var TextLink_1 = require("./TextLink");
function ParentNavigationSubtitle(_a) {
    var _b;
    var parentNavigationSubtitleData = _a.parentNavigationSubtitleData, parentReportActionID = _a.parentReportActionID, _c = _a.parentReportID, parentReportID = _c === void 0 ? '' : _c, pressableStyles = _a.pressableStyles, _d = _a.openParentReportInCurrentTab, openParentReportInCurrentTab = _d === void 0 ? false : _d, statusText = _a.statusText, textStyles = _a.textStyles, statusTextBackgroundColor = _a.statusTextBackgroundColor, statusTextColor = _a.statusTextColor, statusTextContainerStyles = _a.statusTextContainerStyles;
    var currentRoute = (0, native_1.useRoute)();
    var styles = (0, useThemeStyles_1.default)();
    var theme = (0, useTheme_1.default)();
    var StyleUtils = (0, useStyleUtils_1.default)();
    var _e = (0, useHover_1.default)(), hovered = _e.hovered, _f = _e.bind, onMouseEnter = _f.onMouseEnter, onMouseLeave = _f.onMouseLeave;
    var workspaceName = parentNavigationSubtitleData.workspaceName, reportName = parentNavigationSubtitleData.reportName;
    var translate = (0, useLocalize_1.default)().translate;
    var report = (0, useOnyx_1.default)("".concat(ONYXKEYS_1.default.COLLECTION.REPORT).concat(parentReportID), { canBeMissing: false })[0];
    var isReportArchived = (0, useReportIsArchived_1.default)(report === null || report === void 0 ? void 0 : report.reportID);
    var canUserPerformWriteAction = (0, ReportUtils_1.canUserPerformWriteAction)(report, isReportArchived);
    var isReportInRHP = currentRoute.name === SCREENS_1.default.SEARCH.REPORT_RHP;
    var currentFullScreenRoute = (0, useRootNavigationState_1.default)(function (state) { var _a; return (_a = state === null || state === void 0 ? void 0 : state.routes) === null || _a === void 0 ? void 0 : _a.findLast(function (route) { return (0, isNavigatorName_1.isFullScreenName)(route.name); }); });
    // We should not display the parent navigation subtitle if the user does not have access to the parent chat (the reportName is empty in this case)
    if (!reportName) {
        return;
    }
    var onPress = function () {
        var _a, _b, _c, _d;
        var parentAction = (0, ReportActionsUtils_1.getReportAction)(parentReportID, parentReportActionID);
        var isVisibleAction = (0, ReportActionsUtils_1.shouldReportActionBeVisible)(parentAction, (_a = parentAction === null || parentAction === void 0 ? void 0 : parentAction.reportActionID) !== null && _a !== void 0 ? _a : CONST_1.default.DEFAULT_NUMBER_ID, canUserPerformWriteAction);
        if (openParentReportInCurrentTab && isReportInRHP) {
            // If the report is displayed in RHP in Reports tab, we want to stay in the current tab after opening the parent report
            if ((currentFullScreenRoute === null || currentFullScreenRoute === void 0 ? void 0 : currentFullScreenRoute.name) === NAVIGATORS_1.default.SEARCH_FULLSCREEN_NAVIGATOR) {
                var lastRoute = (_b = currentFullScreenRoute === null || currentFullScreenRoute === void 0 ? void 0 : currentFullScreenRoute.state) === null || _b === void 0 ? void 0 : _b.routes.at(-1);
                if ((lastRoute === null || lastRoute === void 0 ? void 0 : lastRoute.name) === SCREENS_1.default.SEARCH.MONEY_REQUEST_REPORT) {
                    var moneyRequestReportID = (_c = lastRoute === null || lastRoute === void 0 ? void 0 : lastRoute.params) === null || _c === void 0 ? void 0 : _c.reportID;
                    // If the parent report is already displayed underneath RHP, simply dismiss the modal
                    if (moneyRequestReportID === parentReportID) {
                        Navigation_1.default.dismissModal();
                        return;
                    }
                }
                Navigation_1.default.navigate(ROUTES_1.default.SEARCH_MONEY_REQUEST_REPORT.getRoute({ reportID: parentReportID }));
                return;
            }
            // If the parent report is already displayed underneath RHP, simply dismiss the modal
            if (Navigation_1.default.getTopmostReportId() === parentReportID) {
                Navigation_1.default.dismissModal();
                return;
            }
        }
        // When viewing a money request in the search navigator, open the parent report in a right-hand pane (RHP)
        // to preserve the search context instead of navigating away.
        if (openParentReportInCurrentTab && (currentFullScreenRoute === null || currentFullScreenRoute === void 0 ? void 0 : currentFullScreenRoute.name) === NAVIGATORS_1.default.SEARCH_FULLSCREEN_NAVIGATOR) {
            var lastRoute = (_d = currentFullScreenRoute === null || currentFullScreenRoute === void 0 ? void 0 : currentFullScreenRoute.state) === null || _d === void 0 ? void 0 : _d.routes.at(-1);
            if ((lastRoute === null || lastRoute === void 0 ? void 0 : lastRoute.name) === SCREENS_1.default.SEARCH.MONEY_REQUEST_REPORT) {
                Navigation_1.default.navigate(ROUTES_1.default.SEARCH_REPORT.getRoute({ reportID: parentReportID, reportActionID: parentReportActionID }));
                return;
            }
        }
        if (isVisibleAction) {
            Navigation_1.default.navigate(ROUTES_1.default.REPORT_WITH_ID.getRoute(parentReportID, parentReportActionID));
        }
        else {
            Navigation_1.default.navigate(ROUTES_1.default.REPORT_WITH_ID.getRoute(parentReportID));
        }
    };
    return (<react_native_1.View style={[styles.flexRow, styles.alignItemsCenter]}>
            {!!statusText && (<react_native_1.View style={[
                styles.reportStatusContainer,
                styles.mr1,
                {
                    backgroundColor: statusTextBackgroundColor,
                },
                statusTextContainerStyles,
            ]}>
                    <Text_1.default style={[styles.reportStatusText, { color: statusTextColor }]}>{statusText}</Text_1.default>
                </react_native_1.View>)}
            <Text_1.default style={[styles.optionAlternateText, styles.textLabelSupporting, styles.flex1, textStyles]} numberOfLines={1}>
                {!!reportName && (<>
                        <Text_1.default style={[styles.optionAlternateText, styles.textLabelSupporting, textStyles]}>{"".concat(translate('threads.from'), " ")}</Text_1.default>
                        <TextLink_1.default onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} onPress={onPress} accessibilityLabel={translate('threads.parentNavigationSummary', { reportName: reportName, workspaceName: workspaceName })} style={[pressableStyles, styles.optionAlternateText, styles.textLabelSupporting, hovered ? StyleUtils.getColorStyle(theme.linkHover) : styles.link, textStyles]} dataSet={_b = {}, _b[CONST_1.default.SELECTION_SCRAPER_HIDDEN_ELEMENT] = true, _b}>
                            {reportName}
                        </TextLink_1.default>
                    </>)}
                {!!workspaceName && workspaceName !== reportName && (<Text_1.default style={[styles.optionAlternateText, styles.textLabelSupporting, textStyles]}>{" ".concat(translate('threads.in'), " ").concat(workspaceName)}</Text_1.default>)}
            </Text_1.default>
        </react_native_1.View>);
}
ParentNavigationSubtitle.displayName = 'ParentNavigationSubtitle';
exports.default = ParentNavigationSubtitle;
