"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_native_1 = require("react-native");
var react_native_gesture_handler_1 = require("react-native-gesture-handler");
var react_native_reanimated_1 = require("react-native-reanimated");
var AttachmentCarousel_1 = require("@components/Attachments/AttachmentCarousel");
var AttachmentCarouselPagerContext_1 = require("@components/Attachments/AttachmentCarousel/Pager/AttachmentCarouselPagerContext");
var AttachmentView_1 = require("@components/Attachments/AttachmentView");
var useAttachmentErrors_1 = require("@components/Attachments/AttachmentView/useAttachmentErrors");
var BlockingView_1 = require("@components/BlockingViews/BlockingView");
var Button_1 = require("@components/Button");
var FullscreenLoadingIndicator_1 = require("@components/FullscreenLoadingIndicator");
var HeaderGap_1 = require("@components/HeaderGap");
var HeaderWithBackButton_1 = require("@components/HeaderWithBackButton");
var Illustrations = require("@components/Icon/Illustrations");
var SafeAreaConsumer_1 = require("@components/SafeAreaConsumer");
var useLocalize_1 = require("@hooks/useLocalize");
var useNetwork_1 = require("@hooks/useNetwork");
var useOnyx_1 = require("@hooks/useOnyx");
var useResponsiveLayout_1 = require("@hooks/useResponsiveLayout");
var useThemeStyles_1 = require("@hooks/useThemeStyles");
var KeyboardShortcut_1 = require("@libs/KeyboardShortcut");
var ReportActionsUtils_1 = require("@libs/ReportActionsUtils");
var variables_1 = require("@styles/variables");
var CONST_1 = require("@src/CONST");
var ONYXKEYS_1 = require("@src/ONYXKEYS");
var EmptyObject_1 = require("@src/types/utils/EmptyObject");
var viewRef_1 = require("@src/types/utils/viewRef");
var AttachmentStateContextProvider_1 = require("./AttachmentStateContextProvider");
function AttachmentModalBaseContent(_a) {
    var _b, _c;
    var _d = _a.source, sourceProp = _d === void 0 ? '' : _d, fallbackSource = _a.fallbackSource, filesProp = _a.file, _e = _a.fileToDisplayIndex, fileToDisplayIndex = _e === void 0 ? 0 : _e, _f = _a.originalFileName, originalFileName = _f === void 0 ? '' : _f, attachmentID = _a.attachmentID, _g = _a.isAuthTokenRequired, isAuthTokenRequired = _g === void 0 ? false : _g, _h = _a.maybeIcon, maybeIcon = _h === void 0 ? false : _h, type = _a.type, accountID = _a.accountID, _j = _a.attachmentLink, attachmentLink = _j === void 0 ? '' : _j, report = _a.report, reportID = _a.reportID, _k = _a.isWorkspaceAvatar, isWorkspaceAvatar = _k === void 0 ? false : _k, headerTitle = _a.headerTitle, threeDotsMenuItemsProp = _a.threeDotsMenuItems, _l = _a.isLoading, isLoading = _l === void 0 ? false : _l, _m = _a.shouldShowNotFoundPage, shouldShowNotFoundPage = _m === void 0 ? false : _m, _o = _a.shouldShowCarousel, shouldShowCarousel = _o === void 0 ? true : _o, _p = _a.shouldDisableSendButton, shouldDisableSendButton = _p === void 0 ? false : _p, _q = _a.shouldDisplayHelpButton, shouldDisplayHelpButton = _q === void 0 ? false : _q, submitRef = _a.submitRef, onDownloadAttachment = _a.onDownloadAttachment, onClose = _a.onClose, onConfirm = _a.onConfirm, AttachmentContent = _a.AttachmentContent, _r = _a.onCarouselAttachmentChange, onCarouselAttachmentChange = _r === void 0 ? function () { } : _r, transactionProp = _a.transaction;
    var styles = (0, useThemeStyles_1.default)();
    var shouldUseNarrowLayout = (0, useResponsiveLayout_1.default)().shouldUseNarrowLayout;
    var translate = (0, useLocalize_1.default)().translate;
    var isOffline = (0, useNetwork_1.default)().isOffline;
    // This logic is used to ensure that the source is updated when the source changes and
    // that the initially provided source is always used as a fallback.
    var _s = (0, react_1.useState)(function () { return sourceProp; }), source = _s[0], setSource = _s[1];
    var isLocalSource = typeof source === 'string' && /^file:|^blob:/.test(source);
    var sourceForAttachmentView = source || sourceProp;
    (0, react_1.useEffect)(function () {
        setSource(function () { return sourceProp; });
    }, [sourceProp]);
    var _t = (0, react_1.useState)(isAuthTokenRequired), isAuthTokenRequiredState = _t[0], setIsAuthTokenRequiredState = _t[1];
    (0, react_1.useEffect)(function () {
        setIsAuthTokenRequiredState(isAuthTokenRequired);
    }, [isAuthTokenRequired]);
    var _u = (0, react_1.useState)(false), isConfirmButtonDisabled = _u[0], setIsConfirmButtonDisabled = _u[1];
    var parentReportAction = (0, ReportActionsUtils_1.getReportAction)(report === null || report === void 0 ? void 0 : report.parentReportID, report === null || report === void 0 ? void 0 : report.parentReportActionID);
    var transactionID = (_c = ((0, ReportActionsUtils_1.isMoneyRequestAction)(parentReportAction) && ((_b = (0, ReportActionsUtils_1.getOriginalMessage)(parentReportAction)) === null || _b === void 0 ? void 0 : _b.IOUTransactionID))) !== null && _c !== void 0 ? _c : CONST_1.default.DEFAULT_NUMBER_ID;
    var transactionFromOnyx = (0, useOnyx_1.default)("".concat(ONYXKEYS_1.default.COLLECTION.TRANSACTION).concat(transactionID), { canBeMissing: true })[0];
    var transaction = transactionProp !== null && transactionProp !== void 0 ? transactionProp : transactionFromOnyx;
    var _v = (0, react_1.useState)(attachmentLink), currentAttachmentLink = _v[0], setCurrentAttachmentLink = _v[1];
    var fallbackFile = (0, react_1.useMemo)(function () { return (originalFileName ? { name: originalFileName } : undefined); }, [originalFileName]);
    var _w = (0, react_1.useState)(function () { return filesProp !== null && filesProp !== void 0 ? filesProp : fallbackFile; }), files = _w[0], setFilesInternal = _w[1];
    var _x = (0, react_1.useState)(function () { return Array.isArray(files); }), isMultipleFiles = _x[0], setIsMultipleFiles = _x[1];
    var fileToDisplay = (0, react_1.useMemo)(function () {
        if (isMultipleFiles) {
            return files === null || files === void 0 ? void 0 : files.at(fileToDisplayIndex);
        }
        return files;
    }, [files, fileToDisplayIndex, isMultipleFiles]);
    var setFile = (0, react_1.useCallback)(function (newFile) {
        if (Array.isArray(newFile)) {
            setFilesInternal(newFile);
            setIsMultipleFiles(true);
        }
        else {
            setFilesInternal(newFile);
            setIsMultipleFiles(false);
        }
    }, []);
    (0, react_1.useEffect)(function () {
        setFile(filesProp !== null && filesProp !== void 0 ? filesProp : fallbackFile);
    }, [filesProp, fallbackFile, setFile]);
    /**
     * Keeps the attachment source in sync with the attachment displayed currently in the carousel.
     */
    var onNavigate = (0, react_1.useCallback)(function (attachment) {
        var _a, _b;
        setSource(attachment.source);
        setFile(attachment.file);
        setIsAuthTokenRequiredState((_a = attachment.isAuthTokenRequired) !== null && _a !== void 0 ? _a : false);
        onCarouselAttachmentChange(attachment);
        setCurrentAttachmentLink((_b = attachment === null || attachment === void 0 ? void 0 : attachment.attachmentLink) !== null && _b !== void 0 ? _b : '');
    }, [onCarouselAttachmentChange, setFile]);
    var threeDotsMenuItems = (0, react_1.useMemo)(function () { return (typeof threeDotsMenuItemsProp === 'function' ? threeDotsMenuItemsProp({ file: fileToDisplay, source: source, isLocalSource: isLocalSource }) : (threeDotsMenuItemsProp !== null && threeDotsMenuItemsProp !== void 0 ? threeDotsMenuItemsProp : [])); }, [fileToDisplay, isLocalSource, source, threeDotsMenuItemsProp]);
    var _y = (0, react_1.useState)(true), isDownloadButtonReadyToBeShown = _y[0], setIsDownloadButtonReadyToBeShown = _y[1];
    var setDownloadButtonVisibility = (0, react_1.useCallback)(function (isButtonVisible) {
        if (isDownloadButtonReadyToBeShown === isButtonVisible) {
            return;
        }
        setIsDownloadButtonReadyToBeShown(isButtonVisible);
    }, [isDownloadButtonReadyToBeShown]);
    /**
     * Execute the onConfirm callback and close the modal.
     */
    var submitAndClose = (0, react_1.useCallback)(function () {
        // If the modal has already been closed or the confirm button is disabled
        // do not submit.
        if (isConfirmButtonDisabled) {
            return;
        }
        if (onConfirm) {
            onConfirm(Object.assign(files !== null && files !== void 0 ? files : {}, { source: source }));
        }
        onClose === null || onClose === void 0 ? void 0 : onClose();
    }, [isConfirmButtonDisabled, onConfirm, onClose, files, source]);
    // Close the modal when the escape key is pressed
    (0, react_1.useEffect)(function () {
        var shortcutConfig = CONST_1.default.KEYBOARD_SHORTCUTS.ESCAPE;
        var unsubscribeEscapeKey = KeyboardShortcut_1.default.subscribe(shortcutConfig.shortcutKey, function () {
            onClose === null || onClose === void 0 ? void 0 : onClose();
        }, shortcutConfig.descriptionKey, shortcutConfig.modifiers, true, true);
        return unsubscribeEscapeKey;
    }, [onClose]);
    var _z = (0, useAttachmentErrors_1.default)(), setAttachmentError = _z.setAttachmentError, isErrorInAttachment = _z.isErrorInAttachment, clearAttachmentErrors = _z.clearAttachmentErrors;
    (0, react_1.useEffect)(function () {
        return function () {
            clearAttachmentErrors();
        };
    }, [clearAttachmentErrors]);
    var isAttachmentLoaded = (0, react_1.useContext)(AttachmentStateContextProvider_1.AttachmentStateContext).isAttachmentLoaded;
    var shouldShowDownloadButton = (0, react_1.useMemo)(function () {
        var isValidContext = !(0, EmptyObject_1.isEmptyObject)(report) || type === CONST_1.default.ATTACHMENT_TYPE.SEARCH;
        if (!isValidContext || isErrorInAttachment(source)) {
            return false;
        }
        return !!onDownloadAttachment && isDownloadButtonReadyToBeShown && !shouldShowNotFoundPage && !isOffline && !isLocalSource && (isAttachmentLoaded === null || isAttachmentLoaded === void 0 ? void 0 : isAttachmentLoaded(source));
    }, [isAttachmentLoaded, isDownloadButtonReadyToBeShown, isErrorInAttachment, isLocalSource, isOffline, onDownloadAttachment, report, shouldShowNotFoundPage, source, type]);
    // We need to pass a shared value of type boolean to the context, so `falseSV` acts as a default value.
    var falseSV = (0, react_native_reanimated_1.useSharedValue)(false);
    var context = (0, react_1.useMemo)(function () { return ({
        pagerItems: [{ source: sourceForAttachmentView, index: 0, isActive: true }],
        activePage: 0,
        pagerRef: undefined,
        isPagerScrolling: falseSV,
        isScrollEnabled: falseSV,
        onTap: function () { },
        onScaleChanged: function () { },
        onAttachmentError: setAttachmentError,
    }); }, [falseSV, sourceForAttachmentView, setAttachmentError]);
    var shouldDisplayContent = !shouldShowNotFoundPage && !isLoading;
    var Content = (0, react_1.useMemo)(function () {
        if (AttachmentContent) {
            return (<AttachmentContent fileToDisplay={fileToDisplay} files={files}/>);
        }
        return !(0, EmptyObject_1.isEmptyObject)(report) && shouldShowCarousel && type !== CONST_1.default.ATTACHMENT_TYPE.SEARCH ? (<AttachmentCarousel_1.default accountID={accountID} type={type} attachmentID={attachmentID} report={report} onNavigate={onNavigate} source={sourceProp} setDownloadButtonVisibility={setDownloadButtonVisibility} attachmentLink={currentAttachmentLink} onAttachmentError={setAttachmentError}/>) : (!!sourceForAttachmentView && (<AttachmentCarouselPagerContext_1.default.Provider value={context}>
                    <AttachmentView_1.default containerStyles={[styles.mh5]} source={sourceForAttachmentView} isAuthTokenRequired={isAuthTokenRequiredState} file={fileToDisplay} onToggleKeyboard={setIsConfirmButtonDisabled} isWorkspaceAvatar={isWorkspaceAvatar} maybeIcon={maybeIcon} fallbackSource={fallbackSource} isUsedInAttachmentModal transactionID={transaction === null || transaction === void 0 ? void 0 : transaction.transactionID} transaction={transaction} isUploaded={!(0, EmptyObject_1.isEmptyObject)(report)} reportID={reportID !== null && reportID !== void 0 ? reportID : (!(0, EmptyObject_1.isEmptyObject)(report) ? report.reportID : undefined)}/>
                </AttachmentCarouselPagerContext_1.default.Provider>));
    }, [
        AttachmentContent,
        accountID,
        attachmentID,
        context,
        currentAttachmentLink,
        fallbackSource,
        fileToDisplay,
        files,
        isAuthTokenRequiredState,
        isWorkspaceAvatar,
        maybeIcon,
        onNavigate,
        report,
        reportID,
        setAttachmentError,
        setDownloadButtonVisibility,
        shouldShowCarousel,
        sourceForAttachmentView,
        sourceProp,
        styles.mh5,
        transaction,
        type,
    ]);
    return (<react_native_gesture_handler_1.GestureHandlerRootView style={styles.flex1}>
            {shouldUseNarrowLayout && <HeaderGap_1.default />}
            <HeaderWithBackButton_1.default shouldMinimizeMenuButton title={headerTitle !== null && headerTitle !== void 0 ? headerTitle : translate('common.attachment')} shouldShowBorderBottom shouldShowDownloadButton={shouldShowDownloadButton} shouldDisplayHelpButton={shouldDisplayHelpButton} onDownloadButtonPress={function () { return onDownloadAttachment === null || onDownloadAttachment === void 0 ? void 0 : onDownloadAttachment({ file: fileToDisplay, source: source }); }} shouldShowCloseButton={!shouldUseNarrowLayout} shouldShowBackButton={shouldUseNarrowLayout} onBackButtonPress={onClose} onCloseButtonPress={onClose} shouldShowThreeDotsButton={threeDotsMenuItems.length > 0} threeDotsMenuItems={threeDotsMenuItems} threeDotsAnchorAlignment={{
            horizontal: CONST_1.default.MODAL.ANCHOR_ORIGIN_HORIZONTAL.LEFT,
            vertical: CONST_1.default.MODAL.ANCHOR_ORIGIN_VERTICAL.TOP,
        }} shouldSetModalVisibility={false} shouldOverlayDots subTitleLink={currentAttachmentLink !== null && currentAttachmentLink !== void 0 ? currentAttachmentLink : ''}/>
            <react_native_1.View style={styles.imageModalImageCenterContainer}>
                {isLoading && <FullscreenLoadingIndicator_1.default testID="attachment-loading-spinner"/>}
                {shouldShowNotFoundPage && !isLoading && (<BlockingView_1.default icon={Illustrations.ToddBehindCloud} iconWidth={variables_1.default.modalTopIconWidth} iconHeight={variables_1.default.modalTopIconHeight} title={translate('notFound.notHere')} subtitle={translate('notFound.pageNotFound')} linkTranslationKey="notFound.goBackHome" onLinkPress={onClose}/>)}
                {shouldDisplayContent && Content}
            </react_native_1.View>
            {/* If we have an onConfirm method show a confirmation button */}
            {!!onConfirm && !isConfirmButtonDisabled && (<react_native_reanimated_1.LayoutAnimationConfig skipEntering>
                    {!!onConfirm && !isConfirmButtonDisabled && (<SafeAreaConsumer_1.default>
                            {function (_a) {
                    var safeAreaPaddingBottomStyle = _a.safeAreaPaddingBottomStyle;
                    return (<react_native_reanimated_1.default.View style={safeAreaPaddingBottomStyle} entering={react_native_reanimated_1.FadeIn}>
                                    <Button_1.default ref={submitRef ? (0, viewRef_1.default)(submitRef) : undefined} success large style={[styles.buttonConfirm, shouldUseNarrowLayout ? {} : styles.attachmentButtonBigScreen]} textStyles={[styles.buttonConfirmText]} text={translate('common.send')} onPress={submitAndClose} isDisabled={isConfirmButtonDisabled || shouldDisableSendButton} pressOnEnter/>
                                </react_native_reanimated_1.default.View>);
                }}
                        </SafeAreaConsumer_1.default>)}
                </react_native_reanimated_1.LayoutAnimationConfig>)}
        </react_native_gesture_handler_1.GestureHandlerRootView>);
}
AttachmentModalBaseContent.displayName = 'AttachmentModalBaseContent';
exports.default = (0, react_1.memo)(AttachmentModalBaseContent);
