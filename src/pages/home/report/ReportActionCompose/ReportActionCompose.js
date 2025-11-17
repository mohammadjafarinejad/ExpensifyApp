"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.onSubmitAction = void 0;
var debounce_1 = require("lodash/debounce");
var noop_1 = require("lodash/noop");
var react_1 = require("react");
var react_native_1 = require("react-native");
var react_native_reanimated_1 = require("react-native-reanimated");
var Consumer_1 = require("@components/DragAndDrop/Consumer");
var DropZoneUI_1 = require("@components/DropZone/DropZoneUI");
var DualDropZone_1 = require("@components/DropZone/DualDropZone");
var EmojiPickerButton_1 = require("@components/EmojiPicker/EmojiPickerButton");
var ExceededCommentLength_1 = require("@components/ExceededCommentLength");
var Expensicons = require("@components/Icon/Expensicons");
var ImportedStateIndicator_1 = require("@components/ImportedStateIndicator");
var OfflineIndicator_1 = require("@components/OfflineIndicator");
var OfflineWithFeedback_1 = require("@components/OfflineWithFeedback");
var OnyxListItemProvider_1 = require("@components/OnyxListItemProvider");
var useCurrentUserPersonalDetails_1 = require("@hooks/useCurrentUserPersonalDetails");
var useHandleExceedMaxCommentLength_1 = require("@hooks/useHandleExceedMaxCommentLength");
var useHandleExceedMaxTaskTitleLength_1 = require("@hooks/useHandleExceedMaxTaskTitleLength");
var useIsScrollLikelyLayoutTriggered_1 = require("@hooks/useIsScrollLikelyLayoutTriggered");
var useLocalize_1 = require("@hooks/useLocalize");
var useNetwork_1 = require("@hooks/useNetwork");
var useOnyx_1 = require("@hooks/useOnyx");
var usePreferredPolicy_1 = require("@hooks/usePreferredPolicy");
var useReportIsArchived_1 = require("@hooks/useReportIsArchived");
var useResponsiveLayout_1 = require("@hooks/useResponsiveLayout");
var useTheme_1 = require("@hooks/useTheme");
var useThemeStyles_1 = require("@hooks/useThemeStyles");
var canFocusInputOnScreenFocus_1 = require("@libs/canFocusInputOnScreenFocus");
var ComposerFocusManager_1 = require("@libs/ComposerFocusManager");
var DeviceCapabilities_1 = require("@libs/DeviceCapabilities");
var DomUtils_1 = require("@libs/DomUtils");
var getNonEmptyStringOnyxID_1 = require("@libs/getNonEmptyStringOnyxID");
var Performance_1 = require("@libs/Performance");
var ReportActionsUtils_1 = require("@libs/ReportActionsUtils");
var ReportUtils_1 = require("@libs/ReportUtils");
var TransactionUtils_1 = require("@libs/TransactionUtils");
var willBlurTextInputOnTapOutside_1 = require("@libs/willBlurTextInputOnTapOutside");
var AgentZeroProcessingRequestIndicator_1 = require("@pages/home/report/AgentZeroProcessingRequestIndicator");
var ParticipantLocalTime_1 = require("@pages/home/report/ParticipantLocalTime");
var ReportTypingIndicator_1 = require("@pages/home/report/ReportTypingIndicator");
var EmojiPickerAction_1 = require("@userActions/EmojiPickerAction");
var Report_1 = require("@userActions/Report");
var Timing_1 = require("@userActions/Timing");
var User_1 = require("@userActions/User");
var CONST_1 = require("@src/CONST");
var ONYXKEYS_1 = require("@src/ONYXKEYS");
var EmptyObject_1 = require("@src/types/utils/EmptyObject");
var AttachmentPickerWithMenuItems_1 = require("./AttachmentPickerWithMenuItems");
var ComposerWithSuggestions_1 = require("./ComposerWithSuggestions");
var SendButton_1 = require("./SendButton");
var useAttachmentUploadValidation_1 = require("./useAttachmentUploadValidation");
// We want consistent auto focus behavior on input between native and mWeb so we have some auto focus management code that will
// prevent auto focus on existing chat for mobile device
var shouldFocusInputOnScreenFocus = (0, canFocusInputOnScreenFocus_1.default)();
var willBlurTextInputOnTapOutside = (0, willBlurTextInputOnTapOutside_1.default)();
// eslint-disable-next-line import/no-mutable-exports
var onSubmitAction = noop_1.default;
exports.onSubmitAction = onSubmitAction;
function ReportActionCompose(_a) {
    var _b;
    var _c = _a.isComposerFullSize, isComposerFullSize = _c === void 0 ? false : _c, onSubmit = _a.onSubmit, pendingAction = _a.pendingAction, report = _a.report, reportID = _a.reportID, lastReportAction = _a.lastReportAction, onComposerFocus = _a.onComposerFocus, onComposerBlur = _a.onComposerBlur, didHideComposerInput = _a.didHideComposerInput, reportTransactions = _a.reportTransactions, transactionThreadReportID = _a.transactionThreadReportID;
    var styles = (0, useThemeStyles_1.default)();
    var theme = (0, useTheme_1.default)();
    var translate = (0, useLocalize_1.default)().translate;
    // eslint-disable-next-line rulesdir/prefer-shouldUseNarrowLayout-instead-of-isSmallScreenWidth
    var _d = (0, useResponsiveLayout_1.default)(), isSmallScreenWidth = _d.isSmallScreenWidth, isMediumScreenWidth = _d.isMediumScreenWidth, shouldUseNarrowLayout = _d.shouldUseNarrowLayout;
    var isOffline = (0, useNetwork_1.default)().isOffline;
    var actionButtonRef = (0, react_1.useRef)(null);
    var currentUserPersonalDetails = (0, useCurrentUserPersonalDetails_1.default)();
    var personalDetails = (0, OnyxListItemProvider_1.usePersonalDetails)();
    var blockedFromConcierge = (0, useOnyx_1.default)(ONYXKEYS_1.default.NVP_BLOCKED_FROM_CONCIERGE, { canBeMissing: true })[0];
    var currentDate = (0, useOnyx_1.default)(ONYXKEYS_1.default.CURRENT_DATE, { canBeMissing: true })[0];
    var _e = (0, useOnyx_1.default)(ONYXKEYS_1.default.SHOULD_SHOW_COMPOSE_INPUT, { canBeMissing: true })[0], shouldShowComposeInput = _e === void 0 ? true : _e;
    var isRestrictedToPreferredPolicy = (0, usePreferredPolicy_1.default)().isRestrictedToPreferredPolicy;
    var policy = (0, useOnyx_1.default)("".concat(ONYXKEYS_1.default.COLLECTION.POLICY).concat(report === null || report === void 0 ? void 0 : report.policyID), { canBeMissing: true })[0];
    var initialModalState = (0, useOnyx_1.default)(ONYXKEYS_1.default.MODAL, { canBeMissing: true })[0];
    var newParentReport = (0, useOnyx_1.default)("".concat(ONYXKEYS_1.default.COLLECTION.REPORT).concat(report === null || report === void 0 ? void 0 : report.parentReportID), { canBeMissing: true })[0];
    var draftComment = (0, useOnyx_1.default)("".concat(ONYXKEYS_1.default.COLLECTION.REPORT_DRAFT_COMMENT).concat(reportID), { canBeMissing: true })[0];
    /**
     * Updates the Highlight state of the composer
     */
    var _f = (0, react_1.useState)(function () {
        return shouldFocusInputOnScreenFocus && shouldShowComposeInput && !(initialModalState === null || initialModalState === void 0 ? void 0 : initialModalState.isVisible) && !(initialModalState === null || initialModalState === void 0 ? void 0 : initialModalState.willAlertModalBecomeVisible);
    }), isFocused = _f[0], setIsFocused = _f[1];
    var _g = (0, react_1.useState)(isComposerFullSize), isFullComposerAvailable = _g[0], setIsFullComposerAvailable = _g[1];
    var _h = (0, useIsScrollLikelyLayoutTriggered_1.default)(), isScrollLayoutTriggered = _h.isScrollLayoutTriggered, raiseIsScrollLayoutTriggered = _h.raiseIsScrollLayoutTriggered;
    var _j = (0, react_1.useState)(function () {
        return !draftComment || !!draftComment.match(CONST_1.default.REGEX.EMPTY_COMMENT);
    }), isCommentEmpty = _j[0], setIsCommentEmpty = _j[1];
    /**
     * Updates the visibility state of the menu
     */
    var _k = (0, react_1.useState)(false), isMenuVisible = _k[0], setMenuVisibility = _k[1];
    var _l = (0, react_1.useState)(false), isAttachmentPreviewActive = _l[0], setIsAttachmentPreviewActive = _l[1];
    /**
     * Updates the composer when the comment length is exceeded
     * Shows red borders and prevents the comment from being sent
     */
    var _m = (0, useHandleExceedMaxCommentLength_1.default)(), hasExceededMaxCommentLength = _m.hasExceededMaxCommentLength, validateCommentMaxLength = _m.validateCommentMaxLength, setHasExceededMaxCommentLength = _m.setHasExceededMaxCommentLength;
    var _o = (0, useHandleExceedMaxTaskTitleLength_1.default)(), hasExceededMaxTaskTitleLength = _o.hasExceededMaxTaskTitleLength, validateTaskTitleMaxLength = _o.validateTaskTitleMaxLength, setHasExceededMaxTitleLength = _o.setHasExceededMaxTitleLength;
    var _p = (0, react_1.useState)(null), exceededMaxLength = _p[0], setExceededMaxLength = _p[1];
    var suggestionsRef = (0, react_1.useRef)(null);
    var composerRef = (0, react_1.useRef)(undefined);
    var reportParticipantIDs = (0, react_1.useMemo)(function () {
        var _a;
        return Object.keys((_a = report === null || report === void 0 ? void 0 : report.participants) !== null && _a !== void 0 ? _a : {})
            .map(Number)
            .filter(function (accountID) { return accountID !== currentUserPersonalDetails.accountID; });
    }, [currentUserPersonalDetails.accountID, report === null || report === void 0 ? void 0 : report.participants]);
    var shouldShowReportRecipientLocalTime = (0, react_1.useMemo)(function () { return (0, ReportUtils_1.canShowReportRecipientLocalTime)(personalDetails, report, currentUserPersonalDetails.accountID) && !isComposerFullSize; }, [personalDetails, report, currentUserPersonalDetails.accountID, isComposerFullSize]);
    var includesConcierge = (0, react_1.useMemo)(function () { return (0, ReportUtils_1.chatIncludesConcierge)({ participants: report === null || report === void 0 ? void 0 : report.participants }); }, [report === null || report === void 0 ? void 0 : report.participants]);
    var userBlockedFromConcierge = (0, react_1.useMemo)(function () { return (0, User_1.isBlockedFromConcierge)(blockedFromConcierge); }, [blockedFromConcierge]);
    var isBlockedFromConcierge = (0, react_1.useMemo)(function () { return includesConcierge && userBlockedFromConcierge; }, [includesConcierge, userBlockedFromConcierge]);
    var isReportArchived = (0, useReportIsArchived_1.default)(report === null || report === void 0 ? void 0 : report.reportID);
    var isTransactionThreadView = (0, react_1.useMemo)(function () { return (0, ReportUtils_1.isReportTransactionThread)(report); }, [report]);
    var isExpensesReport = (0, react_1.useMemo)(function () { return reportTransactions && reportTransactions.length > 1; }, [reportTransactions]);
    var reportActions = (0, useOnyx_1.default)("".concat(ONYXKEYS_1.default.COLLECTION.REPORT_ACTIONS).concat(report === null || report === void 0 ? void 0 : report.reportID), {
        canEvict: false,
        canBeMissing: true,
    })[0];
    var personalDetail = (0, useCurrentUserPersonalDetails_1.default)();
    var iouAction = reportActions ? Object.values(reportActions).find(function (action) { return (0, ReportActionsUtils_1.isMoneyRequestAction)(action); }) : null;
    var linkedTransactionID = iouAction && !isExpensesReport ? (0, ReportActionsUtils_1.getLinkedTransactionID)(iouAction) : undefined;
    var transactionID = (0, react_1.useMemo)(function () { var _a; return (_a = (0, TransactionUtils_1.getTransactionID)(reportID)) !== null && _a !== void 0 ? _a : linkedTransactionID; }, [reportID, linkedTransactionID]);
    var transaction = (0, useOnyx_1.default)("".concat(ONYXKEYS_1.default.COLLECTION.TRANSACTION).concat((0, getNonEmptyStringOnyxID_1.default)(transactionID)), { canBeMissing: true })[0];
    var isSingleTransactionView = (0, react_1.useMemo)(function () { return !!transaction && !!reportTransactions && reportTransactions.length === 1; }, [transaction, reportTransactions]);
    var parentReportAction = isSingleTransactionView ? iouAction : (0, ReportActionsUtils_1.getReportAction)(report === null || report === void 0 ? void 0 : report.parentReportID, report === null || report === void 0 ? void 0 : report.parentReportActionID);
    var canUserPerformWriteAction = !!(0, ReportUtils_1.canUserPerformWriteAction)(report, isReportArchived);
    var canEditReceipt = canUserPerformWriteAction && (0, ReportUtils_1.canEditFieldOfMoneyRequest)(parentReportAction, CONST_1.default.EDIT_REQUEST_FIELD.RECEIPT) && !((_b = transaction === null || transaction === void 0 ? void 0 : transaction.receipt) === null || _b === void 0 ? void 0 : _b.isTestDriveReceipt);
    var shouldAddOrReplaceReceipt = (isTransactionThreadView || isSingleTransactionView) && canEditReceipt;
    var hasReceipt = (0, react_1.useMemo)(function () { return (0, TransactionUtils_1.hasReceipt)(transaction); }, [transaction]);
    var shouldDisplayDualDropZone = (0, react_1.useMemo)(function () {
        var parentReport = (0, ReportUtils_1.getParentReport)(report);
        var isSettledOrApproved = (0, ReportUtils_1.isSettled)(report) || (0, ReportUtils_1.isSettled)(parentReport) || (0, ReportUtils_1.isReportApproved)({ report: report }) || (0, ReportUtils_1.isReportApproved)({ report: parentReport });
        var hasMoneyRequestOptions = !!(0, ReportUtils_1.temporary_getMoneyRequestOptions)(report, policy, reportParticipantIDs, isReportArchived, isRestrictedToPreferredPolicy).length;
        var canModifyReceipt = shouldAddOrReplaceReceipt && !isSettledOrApproved;
        var isRoomOrGroupChat = (0, ReportUtils_1.isChatRoom)(report) || (0, ReportUtils_1.isGroupChat)(report);
        return !isRoomOrGroupChat && (canModifyReceipt || hasMoneyRequestOptions) && !(0, ReportUtils_1.isInvoiceReport)(report);
    }, [shouldAddOrReplaceReceipt, report, reportParticipantIDs, policy, isReportArchived, isRestrictedToPreferredPolicy]);
    // Placeholder to display in the chat input.
    var inputPlaceholder = (0, react_1.useMemo)(function () {
        if (includesConcierge && userBlockedFromConcierge) {
            return translate('reportActionCompose.blockedFromConcierge');
        }
        return translate('reportActionCompose.writeSomething');
    }, [includesConcierge, translate, userBlockedFromConcierge]);
    var focus = function () {
        var _a;
        if (composerRef.current === null) {
            return;
        }
        (_a = composerRef.current) === null || _a === void 0 ? void 0 : _a.focus(true);
    };
    var isKeyboardVisibleWhenShowingModalRef = (0, react_1.useRef)(false);
    var isNextModalWillOpenRef = (0, react_1.useRef)(false);
    var containerRef = (0, react_1.useRef)(null);
    var measureContainer = (0, react_1.useCallback)(function (callback) {
        if (!containerRef.current) {
            return;
        }
        containerRef.current.measureInWindow(callback);
    }, 
    // We added isComposerFullSize in dependencies so that when this value changes, we recalculate the position of the popup
    // eslint-disable-next-line react-compiler/react-compiler, react-hooks/exhaustive-deps
    [isComposerFullSize]);
    var onAddActionPressed = (0, react_1.useCallback)(function () {
        var _a, _b;
        if (!willBlurTextInputOnTapOutside) {
            isKeyboardVisibleWhenShowingModalRef.current = !!((_a = composerRef.current) === null || _a === void 0 ? void 0 : _a.isFocused());
        }
        (_b = composerRef.current) === null || _b === void 0 ? void 0 : _b.blur();
    }, []);
    var onItemSelected = (0, react_1.useCallback)(function () {
        isKeyboardVisibleWhenShowingModalRef.current = false;
    }, []);
    var updateShouldShowSuggestionMenuToFalse = (0, react_1.useCallback)(function () {
        if (!suggestionsRef.current) {
            return;
        }
        suggestionsRef.current.updateShouldShowSuggestionMenuToFalse(false);
    }, []);
    var attachmentFileRef = (0, react_1.useRef)(null);
    var addAttachment = (0, react_1.useCallback)(function (file) {
        var _a;
        attachmentFileRef.current = file;
        var clear = (_a = composerRef.current) === null || _a === void 0 ? void 0 : _a.clear;
        if (!clear) {
            throw new Error('The composerRef.clear function is not set yet. This should never happen, and indicates a developer error.');
        }
        (0, react_native_reanimated_1.runOnUI)(clear)();
    }, []);
    /**
     * Event handler to update the state after the attachment preview is closed.
     */
    var onAttachmentPreviewClose = (0, react_1.useCallback)(function () {
        updateShouldShowSuggestionMenuToFalse();
        setIsAttachmentPreviewActive(false);
        // This enables Composer refocus when the attachments modal is closed by the browser navigation
        ComposerFocusManager_1.default.setReadyToFocus();
    }, [updateShouldShowSuggestionMenuToFalse]);
    /**
     * Add a new comment to this chat
     */
    var submitForm = (0, react_1.useCallback)(function (newComment) {
        var newCommentTrimmed = newComment.trim();
        if (attachmentFileRef.current) {
            (0, Report_1.addAttachmentWithComment)(transactionThreadReportID !== null && transactionThreadReportID !== void 0 ? transactionThreadReportID : reportID, reportID, attachmentFileRef.current, newCommentTrimmed, personalDetail.timezone, true);
            attachmentFileRef.current = null;
        }
        else {
            Performance_1.default.markStart(CONST_1.default.TIMING.SEND_MESSAGE, { message: newCommentTrimmed });
            Timing_1.default.start(CONST_1.default.TIMING.SEND_MESSAGE);
            onSubmit(newCommentTrimmed);
        }
    }, [onSubmit, reportID, personalDetail.timezone, transactionThreadReportID]);
    var onTriggerAttachmentPicker = (0, react_1.useCallback)(function () {
        isNextModalWillOpenRef.current = true;
        isKeyboardVisibleWhenShowingModalRef.current = true;
    }, []);
    var onBlur = (0, react_1.useCallback)(function (event) {
        var webEvent = event;
        setIsFocused(false);
        onComposerBlur === null || onComposerBlur === void 0 ? void 0 : onComposerBlur();
        if (suggestionsRef.current) {
            suggestionsRef.current.resetSuggestions();
        }
        if (webEvent.relatedTarget && webEvent.relatedTarget === actionButtonRef.current) {
            isKeyboardVisibleWhenShowingModalRef.current = true;
        }
    }, [onComposerBlur]);
    var onFocus = (0, react_1.useCallback)(function () {
        setIsFocused(true);
        onComposerFocus === null || onComposerFocus === void 0 ? void 0 : onComposerFocus();
    }, [onComposerFocus]);
    (0, react_1.useEffect)(function () {
        if (hasExceededMaxTaskTitleLength) {
            setExceededMaxLength(CONST_1.default.TITLE_CHARACTER_LIMIT);
        }
        else if (hasExceededMaxCommentLength) {
            setExceededMaxLength(CONST_1.default.MAX_COMMENT_LENGTH);
        }
        else {
            setExceededMaxLength(null);
        }
    }, [hasExceededMaxTaskTitleLength, hasExceededMaxCommentLength]);
    // We are returning a callback here as we want to invoke the method on unmount only
    (0, react_1.useEffect)(function () { return function () {
        if (!(0, EmojiPickerAction_1.isActive)(report === null || report === void 0 ? void 0 : report.reportID)) {
            return;
        }
        (0, EmojiPickerAction_1.hideEmojiPicker)();
    }; }, 
    // eslint-disable-next-line react-compiler/react-compiler, react-hooks/exhaustive-deps
    []);
    // When we invite someone to a room they don't have the policy object, but we still want them to be able to mention other reports they are members of, so we only check if the policyID in the report is from a workspace
    var isGroupPolicyReport = (0, react_1.useMemo)(function () { return !!(report === null || report === void 0 ? void 0 : report.policyID) && report.policyID !== CONST_1.default.POLICY.ID_FAKE; }, [report]);
    var reportRecipientAccountIDs = (0, ReportUtils_1.getReportRecipientAccountIDs)(report, currentUserPersonalDetails.accountID);
    var reportRecipient = personalDetails === null || personalDetails === void 0 ? void 0 : personalDetails[reportRecipientAccountIDs[0]];
    var shouldUseFocusedColor = !isBlockedFromConcierge && isFocused;
    var hasReportRecipient = !(0, EmptyObject_1.isEmptyObject)(reportRecipient);
    var isSendDisabled = isCommentEmpty || isBlockedFromConcierge || !!exceededMaxLength;
    var validateMaxLength = (0, react_1.useCallback)(function (value) {
        var taskCommentMatch = value === null || value === void 0 ? void 0 : value.match(CONST_1.default.REGEX.TASK_TITLE_WITH_OPTIONAL_SHORT_MENTION);
        if (taskCommentMatch) {
            var title = (taskCommentMatch === null || taskCommentMatch === void 0 ? void 0 : taskCommentMatch[3]) ? taskCommentMatch[3].trim().replace(/\n/g, ' ') : '';
            setHasExceededMaxCommentLength(false);
            return validateTaskTitleMaxLength(title);
        }
        setHasExceededMaxTitleLength(false);
        return validateCommentMaxLength(value, { reportID: reportID });
    }, [setHasExceededMaxCommentLength, setHasExceededMaxTitleLength, validateTaskTitleMaxLength, validateCommentMaxLength, reportID]);
    var debouncedValidate = (0, react_1.useMemo)(function () { return (0, debounce_1.default)(validateMaxLength, CONST_1.default.TIMING.COMMENT_LENGTH_DEBOUNCE_TIME, { leading: true }); }, [validateMaxLength]);
    // Note: using JS refs is not well supported in reanimated, thus we need to store the function in a shared value
    // useSharedValue on web doesn't support functions, so we need to wrap it in an object.
    var composerRefShared = (0, react_native_reanimated_1.useSharedValue)({ clear: undefined });
    var handleSendMessage = (0, react_1.useCallback)(function () {
        if (isSendDisabled || !debouncedValidate.flush()) {
            return;
        }
        (0, react_native_reanimated_1.runOnUI)(function () {
            'worklet';
            var clearComposer = composerRefShared.get().clear;
            if (!clearComposer) {
                throw new Error('The composerRefShared.clear function is not set yet. This should never happen, and indicates a developer error.');
            }
            // This will cause onCleared to be triggered where we actually send the message
            clearComposer === null || clearComposer === void 0 ? void 0 : clearComposer();
        })();
    }, [isSendDisabled, debouncedValidate, composerRefShared]);
    // eslint-disable-next-line react-compiler/react-compiler
    exports.onSubmitAction = onSubmitAction = handleSendMessage;
    var emojiPositionValues = (0, react_1.useMemo)(function () { return ({
        secondaryRowHeight: styles.chatItemComposeSecondaryRow.height,
        secondaryRowMarginTop: styles.chatItemComposeSecondaryRow.marginTop,
        secondaryRowMarginBottom: styles.chatItemComposeSecondaryRow.marginBottom,
        composeBoxMinHeight: styles.chatItemComposeBox.minHeight,
        emojiButtonHeight: styles.chatItemEmojiButton.height,
    }); }, [
        styles.chatItemComposeSecondaryRow.height,
        styles.chatItemComposeSecondaryRow.marginTop,
        styles.chatItemComposeSecondaryRow.marginBottom,
        styles.chatItemComposeBox.minHeight,
        styles.chatItemEmojiButton.height,
    ]);
    var emojiShiftVertical = (0, react_1.useMemo)(function () {
        var chatItemComposeSecondaryRowHeight = emojiPositionValues.secondaryRowHeight + emojiPositionValues.secondaryRowMarginTop + emojiPositionValues.secondaryRowMarginBottom;
        var reportActionComposeHeight = emojiPositionValues.composeBoxMinHeight + chatItemComposeSecondaryRowHeight;
        var emojiOffsetWithComposeBox = (emojiPositionValues.composeBoxMinHeight - emojiPositionValues.emojiButtonHeight) / 2;
        return reportActionComposeHeight - emojiOffsetWithComposeBox - CONST_1.default.MENU_POSITION_REPORT_ACTION_COMPOSE_BOTTOM;
    }, [emojiPositionValues]);
    var onValueChange = (0, react_1.useCallback)(function (value) {
        if (value.length === 0 && isComposerFullSize) {
            (0, Report_1.setIsComposerFullSize)(reportID, false);
        }
        debouncedValidate(value);
    }, [isComposerFullSize, reportID, debouncedValidate]);
    var _q = (0, useAttachmentUploadValidation_1.default)({
        policy: policy,
        reportID: reportID,
        addAttachment: addAttachment,
        onAttachmentPreviewClose: onAttachmentPreviewClose,
        exceededMaxLength: exceededMaxLength,
        shouldAddOrReplaceReceipt: shouldAddOrReplaceReceipt,
        transactionID: transactionID,
        report: report,
        newParentReport: newParentReport,
        currentDate: currentDate,
        currentUserPersonalDetails: currentUserPersonalDetails,
        isAttachmentPreviewActive: isAttachmentPreviewActive,
        setIsAttachmentPreviewActive: setIsAttachmentPreviewActive,
    }), validateAttachments = _q.validateAttachments, onReceiptDropped = _q.onReceiptDropped, PDFValidationComponent = _q.PDFValidationComponent, ErrorModal = _q.ErrorModal;
    return (<react_native_1.View style={[shouldShowReportRecipientLocalTime && !isOffline && styles.chatItemComposeWithFirstRow, isComposerFullSize && styles.chatItemFullComposeRow]}>
            <OfflineWithFeedback_1.default pendingAction={pendingAction}>
                {shouldShowReportRecipientLocalTime && hasReportRecipient && <ParticipantLocalTime_1.default participant={reportRecipient}/>}
            </OfflineWithFeedback_1.default>
            <react_native_1.View style={isComposerFullSize ? styles.flex1 : {}}>
                <OfflineWithFeedback_1.default shouldDisableOpacity pendingAction={pendingAction} style={isComposerFullSize ? styles.chatItemFullComposeRow : {}} contentContainerStyle={isComposerFullSize ? styles.flex1 : {}}>
                    <react_native_1.View ref={containerRef} style={[
            shouldUseFocusedColor ? styles.chatItemComposeBoxFocusedColor : styles.chatItemComposeBoxColor,
            styles.flexRow,
            styles.chatItemComposeBox,
            isComposerFullSize && styles.chatItemFullComposeBox,
            !!exceededMaxLength && styles.borderColorDanger,
        ]}>
                        {PDFValidationComponent}
                        <AttachmentPickerWithMenuItems_1.default onAttachmentPicked={function (files) { return validateAttachments({ files: files }); }} reportID={reportID} report={report} currentUserPersonalDetails={currentUserPersonalDetails} reportParticipantIDs={reportParticipantIDs} isFullComposerAvailable={isFullComposerAvailable} isComposerFullSize={isComposerFullSize} disabled={isBlockedFromConcierge} setMenuVisibility={setMenuVisibility} isMenuVisible={isMenuVisible} onTriggerAttachmentPicker={onTriggerAttachmentPicker} raiseIsScrollLikelyLayoutTriggered={raiseIsScrollLayoutTriggered} onAddActionPressed={onAddActionPressed} onItemSelected={onItemSelected} onCanceledAttachmentPicker={function () {
            if (!shouldFocusInputOnScreenFocus) {
                return;
            }
            focus();
        }} actionButtonRef={actionButtonRef} shouldDisableAttachmentItem={!!exceededMaxLength}/>
                        <ComposerWithSuggestions_1.default ref={function (ref) {
            composerRef.current = ref !== null && ref !== void 0 ? ref : undefined;
            composerRefShared.set({
                clear: ref === null || ref === void 0 ? void 0 : ref.clear,
            });
        }} suggestionsRef={suggestionsRef} isNextModalWillOpenRef={isNextModalWillOpenRef} isScrollLikelyLayoutTriggered={isScrollLayoutTriggered} raiseIsScrollLikelyLayoutTriggered={raiseIsScrollLayoutTriggered} reportID={reportID} policyID={report === null || report === void 0 ? void 0 : report.policyID} includeChronos={(0, ReportUtils_1.chatIncludesChronos)(report)} isGroupPolicyReport={isGroupPolicyReport} lastReportAction={lastReportAction} isMenuVisible={isMenuVisible} inputPlaceholder={inputPlaceholder} isComposerFullSize={isComposerFullSize} setIsFullComposerAvailable={setIsFullComposerAvailable} onPasteFile={function (files) { return validateAttachments({ files: files }); }} onCleared={submitForm} disabled={isBlockedFromConcierge} setIsCommentEmpty={setIsCommentEmpty} handleSendMessage={handleSendMessage} shouldShowComposeInput={shouldShowComposeInput} onFocus={onFocus} onBlur={onBlur} measureParentContainer={measureContainer} onValueChange={onValueChange} didHideComposerInput={didHideComposerInput}/>
                        {shouldDisplayDualDropZone && (<DualDropZone_1.default isEditing={shouldAddOrReplaceReceipt && hasReceipt} onAttachmentDrop={function (dragEvent) { return validateAttachments({ dragEvent: dragEvent }); }} onReceiptDrop={onReceiptDropped} shouldAcceptSingleReceipt={shouldAddOrReplaceReceipt}/>)}
                        {!shouldDisplayDualDropZone && (<Consumer_1.default onDrop={function (dragEvent) { return validateAttachments({ dragEvent: dragEvent }); }}>
                                <DropZoneUI_1.default icon={Expensicons.MessageInABottle} dropTitle={translate('dropzone.addAttachments')} dropStyles={styles.attachmentDropOverlay(true)} dropTextStyles={styles.attachmentDropText} dashedBorderStyles={[styles.dropzoneArea, styles.easeInOpacityTransition, styles.activeDropzoneDashedBorder(theme.attachmentDropBorderColorActive, true)]}/>
                            </Consumer_1.default>)}
                        {(0, DeviceCapabilities_1.canUseTouchScreen)() && isMediumScreenWidth ? null : (<EmojiPickerButton_1.default isDisabled={isBlockedFromConcierge} onModalHide={function (isNavigating) {
                var _a;
                if (isNavigating) {
                    return;
                }
                var activeElementId = (_a = DomUtils_1.default.getActiveElement()) === null || _a === void 0 ? void 0 : _a.id;
                if (activeElementId === CONST_1.default.COMPOSER.NATIVE_ID || activeElementId === CONST_1.default.EMOJI_PICKER_BUTTON_NATIVE_ID) {
                    return;
                }
                focus();
            }} onEmojiSelected={function () {
            var _a;
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return (_a = composerRef.current) === null || _a === void 0 ? void 0 : _a.replaceSelectionWithText.apply(_a, args);
        }} emojiPickerID={report === null || report === void 0 ? void 0 : report.reportID} shiftVertical={emojiShiftVertical}/>)}
                        <SendButton_1.default isDisabled={isSendDisabled} handleSendMessage={handleSendMessage}/>
                    </react_native_1.View>
                    {ErrorModal}
                    <react_native_1.View style={[
            styles.flexRow,
            styles.justifyContentBetween,
            styles.alignItemsCenter,
            (!isSmallScreenWidth || (isSmallScreenWidth && !isOffline)) && styles.chatItemComposeSecondaryRow,
        ]}>
                        {!shouldUseNarrowLayout && <OfflineIndicator_1.default containerStyles={[styles.chatItemComposeSecondaryRow]}/>}
                        <AgentZeroProcessingRequestIndicator_1.default reportID={reportID}/>
                        <ReportTypingIndicator_1.default reportID={reportID}/>
                        {!!exceededMaxLength && (<ExceededCommentLength_1.default maxCommentLength={exceededMaxLength} isTaskTitle={hasExceededMaxTaskTitleLength}/>)}
                    </react_native_1.View>
                </OfflineWithFeedback_1.default>
                {!isSmallScreenWidth && (<react_native_1.View style={[styles.mln5, styles.mrn5]}>
                        <ImportedStateIndicator_1.default />
                    </react_native_1.View>)}
            </react_native_1.View>
        </react_native_1.View>);
}
ReportActionCompose.displayName = 'ReportActionCompose';
exports.default = (0, react_1.memo)(ReportActionCompose);
