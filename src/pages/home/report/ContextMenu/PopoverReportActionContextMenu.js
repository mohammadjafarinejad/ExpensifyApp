"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_native_1 = require("react-native");
var ActionSheetAwareScrollView_1 = require("@components/ActionSheetAwareScrollView");
var ConfirmModal_1 = require("@components/ConfirmModal");
var PopoverWithMeasuredContent_1 = require("@components/PopoverWithMeasuredContent");
var SearchContext_1 = require("@components/Search/SearchContext");
var useAncestors_1 = require("@hooks/useAncestors");
var useDeleteTransactions_1 = require("@hooks/useDeleteTransactions");
var useDuplicateTransactionsAndViolations_1 = require("@hooks/useDuplicateTransactionsAndViolations");
var useGetIOUReportFromReportAction_1 = require("@hooks/useGetIOUReportFromReportAction");
var useLocalize_1 = require("@hooks/useLocalize");
var useOnyx_1 = require("@hooks/useOnyx");
var useReportIsArchived_1 = require("@hooks/useReportIsArchived");
var IOU_1 = require("@libs/actions/IOU");
var Report_1 = require("@libs/actions/Report");
var calculateAnchorPosition_1 = require("@libs/calculateAnchorPosition");
var refocusComposerAfterPreventFirstResponder_1 = require("@libs/refocusComposerAfterPreventFirstResponder");
var ReportActionComposeFocusManager_1 = require("@libs/ReportActionComposeFocusManager");
var ReportActionsUtils_1 = require("@libs/ReportActionsUtils");
var ReportUtils_1 = require("@libs/ReportUtils");
var CONST_1 = require("@src/CONST");
var ONYXKEYS_1 = require("@src/ONYXKEYS");
var BaseReportActionContextMenu_1 = require("./BaseReportActionContextMenu");
function extractPointerEvent(event) {
    if ('nativeEvent' in event) {
        return event.nativeEvent;
    }
    return event;
}
function PopoverReportActionContextMenu(_a) {
    var ref = _a.ref;
    var translate = (0, useLocalize_1.default)().translate;
    var reportIDRef = (0, react_1.useRef)(undefined);
    var typeRef = (0, react_1.useRef)(undefined);
    var reportActionRef = (0, react_1.useRef)(null);
    var reportActionIDRef = (0, react_1.useRef)(undefined);
    var originalReportIDRef = (0, react_1.useRef)(undefined);
    var selectionRef = (0, react_1.useRef)('');
    var reportActionDraftMessageRef = (0, react_1.useRef)(undefined);
    var isReportArchived = (0, useReportIsArchived_1.default)(reportIDRef.current);
    var isOriginalReportArchived = (0, useReportIsArchived_1.default)((0, ReportUtils_1.getOriginalReportID)(reportIDRef.current, reportActionRef.current));
    var _b = (0, useGetIOUReportFromReportAction_1.default)(reportActionRef.current), iouReport = _b.iouReport, chatReport = _b.chatReport, isChatIOUReportArchived = _b.isChatIOUReportArchived;
    var cursorRelativePosition = (0, react_1.useRef)({
        horizontal: 0,
        vertical: 0,
    });
    // The horizontal and vertical position (relative to the screen) where the popover will display.
    var popoverAnchorPosition = (0, react_1.useRef)({
        horizontal: 0,
        vertical: 0,
    });
    var actionSheetAwareScrollViewContext = (0, react_1.useContext)(ActionSheetAwareScrollView_1.ActionSheetAwareScrollViewContext);
    var instanceIDRef = (0, react_1.useRef)('');
    var _c = (0, react_1.useState)(false), isPopoverVisible = _c[0], setIsPopoverVisible = _c[1];
    var _d = (0, react_1.useState)(false), isDeleteCommentConfirmModalVisible = _d[0], setIsDeleteCommentConfirmModalVisible = _d[1];
    var _e = (0, react_1.useState)(true), shouldSetModalVisibilityForDeleteConfirmation = _e[0], setShouldSetModalVisibilityForDeleteConfirmation = _e[1];
    var _f = (0, react_1.useState)(false), isRoomArchived = _f[0], setIsRoomArchived = _f[1];
    var _g = (0, react_1.useState)(false), isChronosReportEnabled = _g[0], setIsChronosReportEnabled = _g[1];
    var _h = (0, react_1.useState)(false), isChatPinned = _h[0], setIsChatPinned = _h[1];
    var _j = (0, react_1.useState)(false), hasUnreadMessages = _j[0], setHasUnreadMessages = _j[1];
    var _k = (0, react_1.useState)(false), isThreadReportParentAction = _k[0], setIsThreadReportParentAction = _k[1];
    var _l = (0, react_1.useState)([]), disabledActions = _l[0], setDisabledActions = _l[1];
    var _m = (0, react_1.useState)(false), shouldSwitchPositionIfOverflow = _m[0], setShouldSwitchPositionIfOverflow = _m[1];
    var _o = (0, react_1.useState)(true), isWithoutOverlay = _o[0], setIsWithoutOverlay = _o[1];
    var contentRef = (0, react_1.useRef)(null);
    var anchorRef = (0, react_1.useRef)(null);
    var dimensionsEventListener = (0, react_1.useRef)(null);
    var contextMenuAnchorRef = (0, react_1.useRef)(null);
    var contextMenuTargetNode = (0, react_1.useRef)(null);
    var contextMenuDimensions = (0, react_1.useRef)({
        width: 0,
        height: 0,
    });
    var _p = (0, react_1.useState)(), composerToRefocusOnClose = _p[0], setComposerToRefocusOnClose = _p[1];
    var onPopoverShow = (0, react_1.useRef)(function () { });
    var _q = (0, react_1.useState)(false), isContextMenuOpening = _q[0], setIsContextMenuOpening = _q[1];
    var onPopoverHide = (0, react_1.useRef)(function () { });
    var onEmojiPickerToggle = (0, react_1.useRef)(undefined);
    var onCancelDeleteModal = (0, react_1.useRef)(function () { });
    var onConfirmDeleteModal = (0, react_1.useRef)(function () { });
    var onPopoverHideActionCallback = (0, react_1.useRef)(function () { });
    var callbackWhenDeleteModalHide = (0, react_1.useRef)(function () { });
    /** Get the Context menu anchor position. We calculate the anchor coordinates from measureInWindow async method */
    var getContextMenuMeasuredLocation = (0, react_1.useCallback)(function () {
        return new Promise(function (resolve) {
            if (contextMenuAnchorRef.current && 'measureInWindow' in contextMenuAnchorRef.current && typeof contextMenuAnchorRef.current.measureInWindow === 'function') {
                contextMenuAnchorRef.current.measureInWindow(function (x, y) { return resolve({ x: x, y: y }); });
            }
            else {
                resolve({ x: 0, y: 0 });
            }
        });
    }, []);
    /** This gets called on Dimensions change to find the anchor coordinates for the action context menu. */
    var measureContextMenuAnchorPosition = (0, react_1.useCallback)(function () {
        if (!isPopoverVisible) {
            return;
        }
        getContextMenuMeasuredLocation().then(function (_a) {
            var x = _a.x, y = _a.y;
            if (!x || !y) {
                return;
            }
            popoverAnchorPosition.current = {
                horizontal: cursorRelativePosition.current.horizontal + x,
                vertical: cursorRelativePosition.current.vertical + y,
            };
        });
    }, [isPopoverVisible, getContextMenuMeasuredLocation]);
    (0, react_1.useEffect)(function () {
        dimensionsEventListener.current = react_native_1.Dimensions.addEventListener('change', measureContextMenuAnchorPosition);
        return function () {
            if (!dimensionsEventListener.current) {
                return;
            }
            dimensionsEventListener.current.remove();
        };
    }, [measureContextMenuAnchorPosition]);
    /** Whether Context Menu is active for the Report Action. */
    var isActiveReportAction = function (actionID) { var _a; return !!actionID && (reportActionIDRef.current === actionID || ((_a = reportActionRef.current) === null || _a === void 0 ? void 0 : _a.reportActionID) === actionID); };
    var clearActiveReportAction = function () {
        reportActionIDRef.current = undefined;
        reportActionRef.current = null;
    };
    /**
     * Show the ReportActionContextMenu modal popover.
     *
     * @param type - context menu type [EMAIL, LINK, REPORT_ACTION]
     * @param [event] - A press event.
     * @param [selection] - Copied content.
     * @param contextMenuAnchor - popoverAnchor
     * @param reportID - Active Report Id
     * @param reportActionID - ReportAction for ContextMenu
     * @param originalReportID - The current Report Id of the reportAction
     * @param draftMessage - ReportAction draft message
     * @param [onShow] - Run a callback when Menu is shown
     * @param [onHide] - Run a callback when Menu is hidden
     * @param isArchivedRoom - Whether the provided report is an archived room
     * @param isChronosReport - Flag to check if the chat participant is Chronos
     * @param isPinnedChat - Flag to check if the chat is pinned in the LHN. Used for the Pin/Unpin action
     * @param isUnreadChat - Flag to check if the chat is unread in the LHN. Used for the Mark as Read/Unread action
     */
    var showContextMenu = function (showContextMenuParams) {
        var type = showContextMenuParams.type, event = showContextMenuParams.event, selection = showContextMenuParams.selection, contextMenuAnchor = showContextMenuParams.contextMenuAnchor, _a = showContextMenuParams.report, currentReport = _a === void 0 ? {} : _a, _b = showContextMenuParams.reportAction, reportAction = _b === void 0 ? {} : _b, _c = showContextMenuParams.callbacks, callbacks = _c === void 0 ? {} : _c, _d = showContextMenuParams.disabledOptions, disabledOptions = _d === void 0 ? [] : _d, _e = showContextMenuParams.shouldCloseOnTarget, shouldCloseOnTarget = _e === void 0 ? false : _e, _f = showContextMenuParams.isOverflowMenu, isOverflowMenu = _f === void 0 ? false : _f, _g = showContextMenuParams.withoutOverlay, withoutOverlay = _g === void 0 ? true : _g;
        if (ReportActionComposeFocusManager_1.default.isFocused()) {
            setComposerToRefocusOnClose('main');
        }
        else if (ReportActionComposeFocusManager_1.default.isEditFocused()) {
            setComposerToRefocusOnClose('edit');
        }
        var reportID = currentReport.reportID, originalReportID = currentReport.originalReportID, _h = currentReport.isArchivedRoom, isArchivedRoom = _h === void 0 ? false : _h, _j = currentReport.isChronos, isChronos = _j === void 0 ? false : _j, _k = currentReport.isPinnedChat, isPinnedChat = _k === void 0 ? false : _k, _l = currentReport.isUnreadChat, isUnreadChat = _l === void 0 ? false : _l;
        var reportActionID = reportAction.reportActionID, draftMessage = reportAction.draftMessage, _m = reportAction.isThreadReportParentAction, isThreadReportParentActionParam = _m === void 0 ? false : _m;
        var _o = callbacks.onShow, onShow = _o === void 0 ? function () { } : _o, _p = callbacks.onHide, onHide = _p === void 0 ? function () { } : _p, _q = callbacks.setIsEmojiPickerActive, setIsEmojiPickerActive = _q === void 0 ? function () { } : _q;
        setIsContextMenuOpening(true);
        setIsWithoutOverlay(withoutOverlay);
        var _r = extractPointerEvent(event), _s = _r.pageX, pageX = _s === void 0 ? 0 : _s, _t = _r.pageY, pageY = _t === void 0 ? 0 : _t;
        contextMenuAnchorRef.current = contextMenuAnchor;
        contextMenuTargetNode.current = event.target;
        if (shouldCloseOnTarget) {
            anchorRef.current = event.target;
        }
        else {
            anchorRef.current = null;
        }
        onPopoverShow.current = onShow;
        onPopoverHide.current = onHide;
        onEmojiPickerToggle.current = setIsEmojiPickerActive;
        new Promise(function (resolve) {
            if (!!(!pageX && !pageY && contextMenuAnchorRef.current) || isOverflowMenu) {
                (0, calculateAnchorPosition_1.default)(contextMenuAnchorRef.current).then(function (position) {
                    popoverAnchorPosition.current = { horizontal: position.horizontal, vertical: position.vertical };
                    contextMenuDimensions.current = { width: position.vertical, height: position.height };
                    resolve();
                });
            }
            else {
                getContextMenuMeasuredLocation().then(function (_a) {
                    var x = _a.x, y = _a.y;
                    cursorRelativePosition.current = {
                        horizontal: pageX - x,
                        vertical: pageY - y,
                    };
                    popoverAnchorPosition.current = {
                        horizontal: pageX,
                        vertical: pageY,
                    };
                    resolve();
                });
            }
        }).then(function () {
            setDisabledActions(disabledOptions);
            typeRef.current = type;
            reportIDRef.current = reportID;
            reportActionIDRef.current = reportActionID;
            // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
            originalReportIDRef.current = originalReportID || undefined;
            selectionRef.current = selection;
            setIsPopoverVisible(true);
            reportActionDraftMessageRef.current = draftMessage;
            setIsRoomArchived(isArchivedRoom);
            setIsChronosReportEnabled(isChronos);
            setIsChatPinned(isPinnedChat);
            setHasUnreadMessages(isUnreadChat);
            setIsThreadReportParentAction(isThreadReportParentActionParam);
            setShouldSwitchPositionIfOverflow(isOverflowMenu);
        });
    };
    /** After Popover shows, call the registered onPopoverShow callback and reset it */
    var runAndResetOnPopoverShow = function () {
        instanceIDRef.current = Math.random().toString(36).slice(2, 7);
        onPopoverShow.current();
        // After we have called the action, reset it.
        onPopoverShow.current = function () { };
        // After the context menu opening animation ends reset isContextMenuOpening.
        setTimeout(function () {
            setIsContextMenuOpening(false);
        }, CONST_1.default.ANIMATED_TRANSITION);
    };
    /** Run the callback and return a noop function to reset it */
    var runAndResetCallback = function (callback) {
        callback();
        return function () { };
    };
    /** After Popover hides, call the registered onPopoverHide & onPopoverHideActionCallback callback and reset it */
    var runAndResetOnPopoverHide = function () {
        reportIDRef.current = undefined;
        reportActionIDRef.current = undefined;
        originalReportIDRef.current = undefined;
        instanceIDRef.current = '';
        selectionRef.current = '';
        onPopoverHide.current = runAndResetCallback(onPopoverHide.current);
        onPopoverHideActionCallback.current = runAndResetCallback(onPopoverHideActionCallback.current);
    };
    /**
     * Hide the ReportActionContextMenu modal popover.
     * @param onHideActionCallback Callback to be called after popover is completely hidden
     */
    var hideContextMenu = function (hideContextMenuParams) {
        var _a = (hideContextMenuParams !== null && hideContextMenuParams !== void 0 ? hideContextMenuParams : {}).callbacks, callbacks = _a === void 0 ? {} : _a;
        if (typeof callbacks.onHide === 'function') {
            onPopoverHideActionCallback.current = callbacks.onHide;
        }
        selectionRef.current = '';
        reportActionDraftMessageRef.current = undefined;
        setIsPopoverVisible(false);
        actionSheetAwareScrollViewContext.transitionActionSheetState({
            type: ActionSheetAwareScrollView_1.Actions.CLOSE_POPOVER,
        });
        (0, refocusComposerAfterPreventFirstResponder_1.default)(composerToRefocusOnClose).then(function () {
            setComposerToRefocusOnClose(undefined);
        });
    };
    var transactionIDs = [];
    if ((0, ReportActionsUtils_1.isMoneyRequestAction)(reportActionRef.current)) {
        var originalMessage = (0, ReportActionsUtils_1.getOriginalMessage)(reportActionRef.current);
        if (originalMessage && 'IOUTransactionID' in originalMessage && !!originalMessage.IOUTransactionID) {
            transactionIDs.push(originalMessage.IOUTransactionID);
        }
    }
    var _r = (0, useDuplicateTransactionsAndViolations_1.default)(transactionIDs), duplicateTransactions = _r.duplicateTransactions, duplicateTransactionViolations = _r.duplicateTransactionViolations;
    var report = (0, useOnyx_1.default)("".concat(ONYXKEYS_1.default.COLLECTION.REPORT).concat(reportIDRef.current), {
        canBeMissing: true,
    })[0];
    var policy = (0, useOnyx_1.default)("".concat(ONYXKEYS_1.default.COLLECTION.POLICY).concat(report === null || report === void 0 ? void 0 : report.policyID), { canBeMissing: true })[0];
    var currentSearchHash = (0, SearchContext_1.useSearchContext)().currentSearchHash;
    var deleteTransactions = (0, useDeleteTransactions_1.default)({
        report: report,
        reportActions: reportActionRef.current ? [reportActionRef.current] : [],
        policy: policy,
    }).deleteTransactions;
    var originalReport = (0, useOnyx_1.default)("".concat(ONYXKEYS_1.default.COLLECTION.REPORT).concat((0, ReportUtils_1.getOriginalReportID)(reportIDRef.current, reportActionRef.current)), {
        canBeMissing: true,
    })[0];
    var ancestorsRef = (0, react_1.useRef)([]);
    var ancestors = (0, useAncestors_1.default)(originalReport);
    (0, react_1.useEffect)(function () {
        if (!originalReport) {
            return;
        }
        ancestorsRef.current = ancestors;
    }, [originalReport, ancestors]);
    var confirmDeleteAndHideModal = (0, react_1.useCallback)(function () {
        callbackWhenDeleteModalHide.current = runAndResetCallback(onConfirmDeleteModal.current);
        var reportAction = reportActionRef.current;
        if ((0, ReportActionsUtils_1.isMoneyRequestAction)(reportAction)) {
            var originalMessage = (0, ReportActionsUtils_1.getOriginalMessage)(reportAction);
            if ((0, ReportActionsUtils_1.isTrackExpenseAction)(reportAction)) {
                (0, IOU_1.deleteTrackExpense)({
                    chatReportID: reportIDRef.current,
                    chatReport: report,
                    transactionID: originalMessage === null || originalMessage === void 0 ? void 0 : originalMessage.IOUTransactionID,
                    reportAction: reportAction,
                    iouReport: iouReport,
                    chatIOUReport: chatReport,
                    transactions: duplicateTransactions,
                    violations: duplicateTransactionViolations,
                    isSingleTransactionView: undefined,
                    isChatReportArchived: isReportArchived,
                    isChatIOUReportArchived: isChatIOUReportArchived,
                });
            }
            else if (originalMessage === null || originalMessage === void 0 ? void 0 : originalMessage.IOUTransactionID) {
                deleteTransactions([originalMessage.IOUTransactionID], duplicateTransactions, duplicateTransactionViolations, currentSearchHash);
            }
        }
        else if ((0, ReportActionsUtils_1.isReportPreviewAction)(reportAction)) {
            (0, Report_1.deleteAppReport)(reportAction.childReportID);
        }
        else if (reportAction) {
            // eslint-disable-next-line @typescript-eslint/no-deprecated
            react_native_1.InteractionManager.runAfterInteractions(function () {
                (0, Report_1.deleteReportComment)(reportIDRef.current, reportAction, ancestorsRef.current, isReportArchived, isOriginalReportArchived);
            });
        }
        react_native_1.DeviceEventEmitter.emit("deletedReportAction_".concat(reportIDRef.current), reportAction === null || reportAction === void 0 ? void 0 : reportAction.reportActionID);
        setIsDeleteCommentConfirmModalVisible(false);
    }, [
        report,
        iouReport,
        chatReport,
        duplicateTransactions,
        duplicateTransactionViolations,
        isReportArchived,
        isChatIOUReportArchived,
        deleteTransactions,
        currentSearchHash,
        isOriginalReportArchived,
    ]);
    var hideDeleteModal = function () {
        callbackWhenDeleteModalHide.current = function () { return (onCancelDeleteModal.current = runAndResetCallback(onCancelDeleteModal.current)); };
        setIsDeleteCommentConfirmModalVisible(false);
        setShouldSetModalVisibilityForDeleteConfirmation(true);
        setIsRoomArchived(false);
        setIsChronosReportEnabled(false);
        setIsChatPinned(false);
        setHasUnreadMessages(false);
    };
    /** Opens the Confirm delete action modal */
    var showDeleteModal = function (reportID, reportAction, shouldSetModalVisibility, onConfirm, onCancel) {
        if (shouldSetModalVisibility === void 0) { shouldSetModalVisibility = true; }
        if (onConfirm === void 0) { onConfirm = function () { }; }
        if (onCancel === void 0) { onCancel = function () { }; }
        onCancelDeleteModal.current = onCancel;
        onConfirmDeleteModal.current = onConfirm;
        reportIDRef.current = reportID;
        reportActionRef.current = reportAction !== null && reportAction !== void 0 ? reportAction : null;
        setShouldSetModalVisibilityForDeleteConfirmation(shouldSetModalVisibility);
        setIsDeleteCommentConfirmModalVisible(true);
    };
    (0, react_1.useImperativeHandle)(ref, function () { return ({
        showContextMenu: showContextMenu,
        hideContextMenu: hideContextMenu,
        showDeleteModal: showDeleteModal,
        hideDeleteModal: hideDeleteModal,
        isActiveReportAction: isActiveReportAction,
        instanceIDRef: instanceIDRef,
        runAndResetOnPopoverHide: runAndResetOnPopoverHide,
        clearActiveReportAction: clearActiveReportAction,
        contentRef: contentRef,
        isContextMenuOpening: isContextMenuOpening,
        composerToRefocusOnCloseEmojiPicker: composerToRefocusOnClose,
    }); });
    var reportAction = reportActionRef.current;
    return (<>
            <PopoverWithMeasuredContent_1.default isVisible={isPopoverVisible} onClose={function () { return hideContextMenu(); }} onModalShow={runAndResetOnPopoverShow} onModalHide={runAndResetOnPopoverHide} anchorPosition={popoverAnchorPosition.current} animationIn="fadeIn" disableAnimation={false} shouldSetModalVisibility={false} fullscreen withoutOverlay={isWithoutOverlay} anchorDimensions={contextMenuDimensions.current} anchorRef={anchorRef} shouldSwitchPositionIfOverflow={shouldSwitchPositionIfOverflow}>
                <BaseReportActionContextMenu_1.default isVisible={isPopoverVisible} type={typeRef.current} reportID={reportIDRef.current} reportActionID={reportActionIDRef.current} draftMessage={reportActionDraftMessageRef.current} selection={selectionRef.current} isArchivedRoom={isRoomArchived} isChronosReport={isChronosReportEnabled} isPinnedChat={isChatPinned} isUnreadChat={hasUnreadMessages} isThreadReportParentAction={isThreadReportParentAction} anchor={contextMenuTargetNode} contentRef={contentRef} originalReportID={originalReportIDRef.current} disabledActions={disabledActions} setIsEmojiPickerActive={onEmojiPickerToggle.current}/>
            </PopoverWithMeasuredContent_1.default>
            <ConfirmModal_1.default title={translate('reportActionContextMenu.deleteAction', { action: reportAction })} isVisible={isDeleteCommentConfirmModalVisible} shouldSetModalVisibility={shouldSetModalVisibilityForDeleteConfirmation} onConfirm={confirmDeleteAndHideModal} onCancel={hideDeleteModal} onModalHide={function () {
            clearActiveReportAction();
            callbackWhenDeleteModalHide.current();
        }} prompt={translate('reportActionContextMenu.deleteConfirmation', { action: reportAction })} confirmText={translate('common.delete')} cancelText={translate('common.cancel')} danger/>
        </>);
}
PopoverReportActionContextMenu.displayName = 'PopoverReportActionContextMenu';
exports.default = PopoverReportActionContextMenu;
