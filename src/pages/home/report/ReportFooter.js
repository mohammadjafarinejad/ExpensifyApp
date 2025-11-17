"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var BlockedFromChat_1 = require("@selectors/BlockedFromChat");
var expensify_common_1 = require("expensify-common");
var fast_equals_1 = require("fast-equals");
var react_1 = require("react");
var react_native_1 = require("react-native");
var AnonymousReportFooter_1 = require("@components/AnonymousReportFooter");
var ArchivedReportFooter_1 = require("@components/ArchivedReportFooter");
var Banner_1 = require("@components/Banner");
var BlockedReportFooter_1 = require("@components/BlockedReportFooter");
var Expensicons = require("@components/Icon/Expensicons");
var OfflineIndicator_1 = require("@components/OfflineIndicator");
var OnyxListItemProvider_1 = require("@components/OnyxListItemProvider");
var SwipeableView_1 = require("@components/SwipeableView");
var useAncestors_1 = require("@hooks/useAncestors");
var useCurrentUserPersonalDetails_1 = require("@hooks/useCurrentUserPersonalDetails");
var useIsAnonymousUser_1 = require("@hooks/useIsAnonymousUser");
var useLocalize_1 = require("@hooks/useLocalize");
var useNetwork_1 = require("@hooks/useNetwork");
var useOnyx_1 = require("@hooks/useOnyx");
var useReportIsArchived_1 = require("@hooks/useReportIsArchived");
var useResponsiveLayout_1 = require("@hooks/useResponsiveLayout");
var useShortMentionsList_1 = require("@hooks/useShortMentionsList");
var useThemeStyles_1 = require("@hooks/useThemeStyles");
var useWindowDimensions_1 = require("@hooks/useWindowDimensions");
var Report_1 = require("@libs/actions/Report");
var Task_1 = require("@libs/actions/Task");
var LoginUtils_1 = require("@libs/LoginUtils");
var ParsingUtils_1 = require("@libs/ParsingUtils");
var PolicyUtils_1 = require("@libs/PolicyUtils");
var ReportUtils_1 = require("@libs/ReportUtils");
var UserUtils_1 = require("@libs/UserUtils");
var variables_1 = require("@styles/variables");
var CONST_1 = require("@src/CONST");
var ONYXKEYS_1 = require("@src/ONYXKEYS");
var ReportActionCompose_1 = require("./ReportActionCompose/ReportActionCompose");
var SystemChatReportFooterMessage_1 = require("./SystemChatReportFooterMessage");
function ReportFooter(_a) {
    var _b, _c;
    var lastReportAction = _a.lastReportAction, pendingAction = _a.pendingAction, _d = _a.report, report = _d === void 0 ? { reportID: '-1' } : _d, reportMetadata = _a.reportMetadata, policy = _a.policy, _e = _a.isComposerFullSize, isComposerFullSize = _e === void 0 ? false : _e, onComposerBlur = _a.onComposerBlur, onComposerFocus = _a.onComposerFocus, reportTransactions = _a.reportTransactions, transactionThreadReportID = _a.transactionThreadReportID;
    var styles = (0, useThemeStyles_1.default)();
    var isOffline = (0, useNetwork_1.default)().isOffline;
    var translate = (0, useLocalize_1.default)().translate;
    var windowWidth = (0, useWindowDimensions_1.default)().windowWidth;
    var _f = (0, useResponsiveLayout_1.default)(), isSmallScreenWidth = _f.isSmallScreenWidth, shouldUseNarrowLayout = _f.shouldUseNarrowLayout;
    var personalDetail = (0, useCurrentUserPersonalDetails_1.default)();
    var _g = (0, useOnyx_1.default)(ONYXKEYS_1.default.SHOULD_SHOW_COMPOSE_INPUT, { canBeMissing: true })[0], shouldShowComposeInput = _g === void 0 ? false : _g;
    var quickAction = (0, useOnyx_1.default)(ONYXKEYS_1.default.NVP_QUICK_ACTION_GLOBAL_CREATE, { canBeMissing: true })[0];
    var isAnonymousUser = (0, useIsAnonymousUser_1.default)();
    var isBlockedFromChat = (0, useOnyx_1.default)(ONYXKEYS_1.default.NVP_BLOCKED_FROM_CHAT, {
        selector: BlockedFromChat_1.isBlockedFromChatSelector,
        canBeMissing: true,
    })[0];
    var chatFooterStyles = __assign(__assign({}, styles.chatFooter), { minHeight: !isOffline ? CONST_1.default.CHAT_FOOTER_MIN_HEIGHT : 0 });
    var isReportArchived = (0, useReportIsArchived_1.default)(report === null || report === void 0 ? void 0 : report.reportID);
    var ancestors = (0, useAncestors_1.default)(report);
    var isArchivedRoom = (0, ReportUtils_1.isArchivedNonExpenseReport)(report, isReportArchived);
    var isSmallSizeLayout = windowWidth - (shouldUseNarrowLayout ? 0 : variables_1.default.sideBarWithLHBWidth) < variables_1.default.anonymousReportFooterBreakpoint;
    // If a user just signed in and is viewing a public report, optimistically show the composer while loading the report, since they will have write access when the response comes back.
    var shouldShowComposerOptimistically = !isAnonymousUser && (0, ReportUtils_1.isPublicRoom)(report) && !!(reportMetadata === null || reportMetadata === void 0 ? void 0 : reportMetadata.isLoadingInitialReportActions);
    var canPerformWriteAction = (_b = (0, ReportUtils_1.canUserPerformWriteAction)(report, isReportArchived)) !== null && _b !== void 0 ? _b : shouldShowComposerOptimistically;
    var shouldHideComposer = !canPerformWriteAction || isBlockedFromChat;
    var canWriteInReport = (0, ReportUtils_1.canWriteInReport)(report);
    var isSystemChat = (0, ReportUtils_1.isSystemChat)(report);
    var isAdminsOnlyPostingRoom = (0, ReportUtils_1.isAdminsOnlyPostingRoom)(report);
    var isUserPolicyAdmin = (0, PolicyUtils_1.isPolicyAdmin)(policy);
    var allPersonalDetails = (0, OnyxListItemProvider_1.usePersonalDetails)();
    var availableLoginsList = (0, useShortMentionsList_1.default)().availableLoginsList;
    var currentUserEmail = (_c = personalDetail.email) !== null && _c !== void 0 ? _c : '';
    var handleCreateTask = (0, react_1.useCallback)(function (text) {
        var _a, _b, _c;
        var match = text.match(CONST_1.default.REGEX.TASK_TITLE_WITH_OPTIONAL_SHORT_MENTION);
        if (!match) {
            return false;
        }
        var title = match[3] ? match[3].trim().replace(/\n/g, ' ') : undefined;
        if (!title) {
            return false;
        }
        var mention = match[1] ? match[1].trim() : '';
        var currentUserPrivateDomain = (0, LoginUtils_1.isEmailPublicDomain)(currentUserEmail !== null && currentUserEmail !== void 0 ? currentUserEmail : '') ? '' : expensify_common_1.Str.extractEmailDomain(currentUserEmail !== null && currentUserEmail !== void 0 ? currentUserEmail : '');
        var mentionWithDomain = (_a = (0, ParsingUtils_1.addDomainToShortMention)(mention, availableLoginsList, currentUserPrivateDomain)) !== null && _a !== void 0 ? _a : mention;
        var isValidMention = expensify_common_1.Str.isValidEmail(mentionWithDomain);
        var assignee;
        var assigneeChatReport;
        if (mentionWithDomain) {
            if (isValidMention) {
                assignee = (_b = Object.values(allPersonalDetails !== null && allPersonalDetails !== void 0 ? allPersonalDetails : {}).find(function (value) { return (value === null || value === void 0 ? void 0 : value.login) === mentionWithDomain; })) !== null && _b !== void 0 ? _b : undefined;
                if (!Object.keys(assignee !== null && assignee !== void 0 ? assignee : {}).length) {
                    var optimisticDataForNewAssignee = (0, Task_1.setNewOptimisticAssignee)(personalDetail.accountID, {
                        accountID: (0, UserUtils_1.generateAccountID)(mentionWithDomain),
                        login: mentionWithDomain,
                    });
                    assignee = optimisticDataForNewAssignee.assignee;
                    assigneeChatReport = optimisticDataForNewAssignee.assigneeReport;
                }
            }
            else {
                // If the mention is not valid, include it on the title.
                // The mention could be invalid if it's a short mention and failed to be converted to a full mention.
                title = "@".concat(mentionWithDomain, " ").concat(title);
            }
        }
        (0, Task_1.createTaskAndNavigate)({
            parentReportID: report.reportID,
            title: title,
            description: '',
            assigneeEmail: (_c = assignee === null || assignee === void 0 ? void 0 : assignee.login) !== null && _c !== void 0 ? _c : '',
            currentUserAccountID: personalDetail.accountID,
            currentUserEmail: currentUserEmail,
            assigneeAccountID: assignee === null || assignee === void 0 ? void 0 : assignee.accountID,
            assigneeChatReport: assigneeChatReport,
            policyID: report.policyID,
            isCreatedUsingMarkdown: true,
            quickAction: quickAction,
            ancestors: ancestors,
        });
        return true;
    }, [allPersonalDetails, ancestors, availableLoginsList, currentUserEmail, personalDetail.accountID, quickAction, report.policyID, report.reportID]);
    var onSubmitComment = (0, react_1.useCallback)(function (text) {
        var _a;
        var isTaskCreated = handleCreateTask(text);
        if (isTaskCreated) {
            return;
        }
        // If we are adding an action on an expense report that only has a single transaction thread child report, we need to add the action to the transaction thread instead.
        // This is because we need it to be associated with the transaction thread and not the expense report in order for conversational corrections to work as expected.
        var targetReportID = transactionThreadReportID !== null && transactionThreadReportID !== void 0 ? transactionThreadReportID : report.reportID;
        (0, Report_1.addComment)(targetReportID, report.reportID, text, (_a = personalDetail.timezone) !== null && _a !== void 0 ? _a : CONST_1.default.DEFAULT_TIME_ZONE, true);
    }, 
    // eslint-disable-next-line react-compiler/react-compiler, react-hooks/exhaustive-deps
    [report.reportID, handleCreateTask, transactionThreadReportID]);
    var _h = (0, react_1.useState)(!shouldShowComposeInput), didHideComposerInput = _h[0], setDidHideComposerInput = _h[1];
    (0, react_1.useEffect)(function () {
        if (didHideComposerInput || shouldShowComposeInput) {
            return;
        }
        setDidHideComposerInput(true);
    }, [shouldShowComposeInput, didHideComposerInput]);
    return (<>
            {!!shouldHideComposer && (<react_native_1.View style={[
                styles.chatFooter,
                isArchivedRoom || isAnonymousUser || !canWriteInReport || (isAdminsOnlyPostingRoom && !isUserPolicyAdmin) ? styles.mt4 : {},
                shouldUseNarrowLayout ? styles.mb5 : null,
            ]}>
                    {isAnonymousUser && !isArchivedRoom && (<AnonymousReportFooter_1.default report={report} isSmallSizeLayout={isSmallSizeLayout}/>)}
                    {isArchivedRoom && <ArchivedReportFooter_1.default report={report}/>}
                    {!isArchivedRoom && !!isBlockedFromChat && <BlockedReportFooter_1.default />}
                    {!isAnonymousUser && !canWriteInReport && isSystemChat && <SystemChatReportFooterMessage_1.default />}
                    {isAdminsOnlyPostingRoom && !isUserPolicyAdmin && !isArchivedRoom && !isAnonymousUser && !isBlockedFromChat && (<Banner_1.default containerStyles={[styles.chatFooterBanner]} text={translate('adminOnlyCanPost')} icon={Expensicons.Lightbulb} shouldShowIcon/>)}
                    {!shouldUseNarrowLayout && (<react_native_1.View style={styles.offlineIndicatorContainer}>{shouldHideComposer && <OfflineIndicator_1.default containerStyles={[styles.chatItemComposeSecondaryRow]}/>}</react_native_1.View>)}
                </react_native_1.View>)}
            {!shouldHideComposer && (!!shouldShowComposeInput || !isSmallScreenWidth) && (<react_native_1.View style={[chatFooterStyles, isComposerFullSize && styles.chatFooterFullCompose]}>
                    <SwipeableView_1.default onSwipeDown={react_native_1.Keyboard.dismiss}>
                        <ReportActionCompose_1.default onSubmit={onSubmitComment} onComposerFocus={onComposerFocus} onComposerBlur={onComposerBlur} reportID={report.reportID} report={report} lastReportAction={lastReportAction} pendingAction={pendingAction} isComposerFullSize={isComposerFullSize} didHideComposerInput={didHideComposerInput} reportTransactions={reportTransactions} transactionThreadReportID={transactionThreadReportID}/>
                    </SwipeableView_1.default>
                </react_native_1.View>)}
        </>);
}
ReportFooter.displayName = 'ReportFooter';
exports.default = (0, react_1.memo)(ReportFooter, function (prevProps, nextProps) {
    var _a, _b, _c, _d;
    return (0, fast_equals_1.deepEqual)(prevProps.report, nextProps.report) &&
        prevProps.pendingAction === nextProps.pendingAction &&
        prevProps.isComposerFullSize === nextProps.isComposerFullSize &&
        prevProps.lastReportAction === nextProps.lastReportAction &&
        (0, fast_equals_1.deepEqual)(prevProps.reportMetadata, nextProps.reportMetadata) &&
        (0, fast_equals_1.deepEqual)((_a = prevProps.policy) === null || _a === void 0 ? void 0 : _a.employeeList, (_b = nextProps.policy) === null || _b === void 0 ? void 0 : _b.employeeList) &&
        (0, fast_equals_1.deepEqual)((_c = prevProps.policy) === null || _c === void 0 ? void 0 : _c.role, (_d = nextProps.policy) === null || _d === void 0 ? void 0 : _d.role) &&
        (0, fast_equals_1.deepEqual)(prevProps.reportTransactions, nextProps.reportTransactions);
});
