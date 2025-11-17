"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_native_1 = require("react-native");
var OfflineWithFeedback_1 = require("@components/OfflineWithFeedback");
var useAncestors_1 = require("@hooks/useAncestors");
var useNetwork_1 = require("@hooks/useNetwork");
var useOnyx_1 = require("@hooks/useOnyx");
var useResponsiveLayout_1 = require("@hooks/useResponsiveLayout");
var useThemeStyles_1 = require("@hooks/useThemeStyles");
var ReportActionsUtils_1 = require("@libs/ReportActionsUtils");
var ReportUtils_1 = require("@libs/ReportUtils");
var Report_1 = require("@userActions/Report");
var ONYXKEYS_1 = require("@src/ONYXKEYS");
var AnimatedEmptyStateBackground_1 = require("./AnimatedEmptyStateBackground");
var RepliesDivider_1 = require("./RepliesDivider");
var ReportActionItem_1 = require("./ReportActionItem");
var ThreadDivider_1 = require("./ThreadDivider");
function ReportActionItemParentAction(_a) {
    var _b;
    var allReports = _a.allReports, policies = _a.policies, report = _a.report, transactionThreadReport = _a.transactionThreadReport, reportActions = _a.reportActions, parentReportAction = _a.parentReportAction, _c = _a.index, index = _c === void 0 ? 0 : _c, _d = _a.shouldHideThreadDividerLine, shouldHideThreadDividerLine = _d === void 0 ? false : _d, shouldDisplayReplyDivider = _a.shouldDisplayReplyDivider, _e = _a.isFirstVisibleReportAction, isFirstVisibleReportAction = _e === void 0 ? false : _e, _f = _a.shouldUseThreadDividerLine, shouldUseThreadDividerLine = _f === void 0 ? false : _f, userWalletTierName = _a.userWalletTierName, isUserValidated = _a.isUserValidated, personalDetails = _a.personalDetails, allDraftMessages = _a.allDraftMessages, allEmojiReactions = _a.allEmojiReactions, linkedTransactionRouteError = _a.linkedTransactionRouteError, userBillingFundID = _a.userBillingFundID, _g = _a.isTryNewDotNVPDismissed, isTryNewDotNVPDismissed = _g === void 0 ? false : _g, _h = _a.isReportArchived, isReportArchived = _h === void 0 ? false : _h;
    var styles = (0, useThemeStyles_1.default)();
    var ancestors = (0, useAncestors_1.default)(report, ReportUtils_1.shouldExcludeAncestorReportAction);
    var isOffline = (0, useNetwork_1.default)().isOffline;
    var isInNarrowPaneModal = (0, useResponsiveLayout_1.default)().isInNarrowPaneModal;
    var ancestorReportNameValuePairsSelector = (0, react_1.useCallback)(function (allReportNameValuePairs) {
        if (!allReportNameValuePairs) {
            return {};
        }
        var ancestorReportNameValuePairs = {};
        ancestors.forEach(function (ancestor) {
            ancestorReportNameValuePairs["".concat(ONYXKEYS_1.default.COLLECTION.REPORT_NAME_VALUE_PAIRS).concat(ancestor.report.reportID)] =
                allReportNameValuePairs["".concat(ONYXKEYS_1.default.COLLECTION.REPORT_NAME_VALUE_PAIRS).concat(ancestor.report.reportID)];
        });
        return ancestorReportNameValuePairs;
    }, [ancestors]);
    var ancestorsReportNameValuePairs = (0, useOnyx_1.default)(ONYXKEYS_1.default.COLLECTION.REPORT_NAME_VALUE_PAIRS, {
        canBeMissing: true,
        selector: ancestorReportNameValuePairsSelector,
    }, [ancestors])[0];
    return (<react_native_1.View style={[styles.pRelative]}>
            <AnimatedEmptyStateBackground_1.default />
            <OfflineWithFeedback_1.default shouldDisableOpacity errors={(_b = report === null || report === void 0 ? void 0 : report.errorFields) === null || _b === void 0 ? void 0 : _b.createChatThread} errorRowStyles={[styles.ml10, styles.mr2]} onClose={function () { return (0, Report_1.navigateToConciergeChatAndDeleteReport)(report === null || report === void 0 ? void 0 : report.reportID, undefined, true); }}>
                {/* eslint-disable-next-line react-compiler/react-compiler */}
                {ancestors.map(function (ancestor) {
            var _a, _b, _c, _d, _e, _f;
            var ancestorReport = ancestor.report, ancestorReportAction = ancestor.reportAction;
            var canUserPerformWriteAction = (0, ReportUtils_1.canUserPerformWriteAction)(ancestorReport, isReportArchived);
            var shouldDisplayThreadDivider = !(0, ReportActionsUtils_1.isTripPreview)(ancestorReportAction);
            var isAncestorReportArchived = (0, ReportUtils_1.isArchivedReport)(ancestorsReportNameValuePairs === null || ancestorsReportNameValuePairs === void 0 ? void 0 : ancestorsReportNameValuePairs["".concat(ONYXKEYS_1.default.COLLECTION.REPORT_NAME_VALUE_PAIRS).concat(ancestorReport.reportID)]);
            var originalReportID = (0, ReportUtils_1.getOriginalReportID)(ancestorReport.reportID, ancestorReportAction);
            var reportDraftMessages = originalReportID ? allDraftMessages === null || allDraftMessages === void 0 ? void 0 : allDraftMessages["".concat(ONYXKEYS_1.default.COLLECTION.REPORT_ACTIONS_DRAFTS).concat(originalReportID)] : undefined;
            var matchingDraftMessage = reportDraftMessages === null || reportDraftMessages === void 0 ? void 0 : reportDraftMessages[ancestorReportAction.reportActionID];
            var matchingDraftMessageString = matchingDraftMessage === null || matchingDraftMessage === void 0 ? void 0 : matchingDraftMessage.message;
            var actionEmojiReactions = allEmojiReactions === null || allEmojiReactions === void 0 ? void 0 : allEmojiReactions["".concat(ONYXKEYS_1.default.COLLECTION.REPORT_ACTIONS_REACTIONS).concat(ancestorReportAction.reportActionID)];
            return (<OfflineWithFeedback_1.default key={ancestorReportAction.reportActionID} shouldDisableOpacity={!!(ancestorReportAction === null || ancestorReportAction === void 0 ? void 0 : ancestorReportAction.pendingAction)} pendingAction={(_b = (_a = ancestorReport === null || ancestorReport === void 0 ? void 0 : ancestorReport.pendingFields) === null || _a === void 0 ? void 0 : _a.addWorkspaceRoom) !== null && _b !== void 0 ? _b : (_c = ancestorReport === null || ancestorReport === void 0 ? void 0 : ancestorReport.pendingFields) === null || _c === void 0 ? void 0 : _c.createChat} errors={(_e = (_d = ancestorReport === null || ancestorReport === void 0 ? void 0 : ancestorReport.errorFields) === null || _d === void 0 ? void 0 : _d.addWorkspaceRoom) !== null && _e !== void 0 ? _e : (_f = ancestorReport === null || ancestorReport === void 0 ? void 0 : ancestorReport.errorFields) === null || _f === void 0 ? void 0 : _f.createChat} errorRowStyles={[styles.ml10, styles.mr2]} onClose={function () { return (0, Report_1.navigateToConciergeChatAndDeleteReport)(ancestorReport.reportID); }}>
                            {shouldDisplayThreadDivider && (<ThreadDivider_1.default ancestor={ancestor} isLinkDisabled={!(0, ReportUtils_1.canCurrentUserOpenReport)(ancestorReport, isAncestorReportArchived)}/>)}
                            <ReportActionItem_1.default allReports={allReports} policies={policies} onPress={(0, ReportUtils_1.canCurrentUserOpenReport)(ancestorReport, isAncestorReportArchived)
                    ? function () { return (0, ReportUtils_1.navigateToLinkedReportAction)(ancestor, isInNarrowPaneModal, canUserPerformWriteAction, isOffline); }
                    : undefined} parentReportAction={parentReportAction} report={ancestorReport} reportActions={reportActions} transactionThreadReport={transactionThreadReport} action={ancestorReportAction} displayAsGroup={false} isMostRecentIOUReportAction={false} shouldDisplayNewMarker={ancestor.shouldDisplayNewMarker} index={index} isFirstVisibleReportAction={isFirstVisibleReportAction} shouldUseThreadDividerLine={shouldUseThreadDividerLine} isThreadReportParentAction userWalletTierName={userWalletTierName} isUserValidated={isUserValidated} personalDetails={personalDetails} draftMessage={matchingDraftMessageString} emojiReactions={actionEmojiReactions} linkedTransactionRouteError={linkedTransactionRouteError} userBillingFundID={userBillingFundID} isTryNewDotNVPDismissed={isTryNewDotNVPDismissed}/>
                        </OfflineWithFeedback_1.default>);
        })}
            </OfflineWithFeedback_1.default>
            {shouldDisplayReplyDivider && <RepliesDivider_1.default shouldHideThreadDividerLine={shouldHideThreadDividerLine}/>}
        </react_native_1.View>);
}
ReportActionItemParentAction.displayName = 'ReportActionItemParentAction';
exports.default = ReportActionItemParentAction;
