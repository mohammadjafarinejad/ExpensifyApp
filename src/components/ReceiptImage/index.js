"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_native_1 = require("react-native");
var EReceiptThumbnail_1 = require("@components/EReceiptThumbnail");
var EReceiptWithSizeCalculation_1 = require("@components/EReceiptWithSizeCalculation");
var ImageWithLoading_1 = require("@components/ImageWithLoading");
var PDFThumbnail_1 = require("@components/PDFThumbnail");
var ReceiptEmptyState_1 = require("@components/ReceiptEmptyState");
var ThumbnailImage_1 = require("@components/ThumbnailImage");
var useThemeStyles_1 = require("@hooks/useThemeStyles");
var CONST_1 = require("@src/CONST");
var shouldUseAspectRatioForEReceipts_1 = require("./shouldUseAspectRatioForEReceipts");
// It is used to avoid updating the image width in a loop.
var MIN_UPDATE_WIDTH_DIFF = 1000;
function ReceiptImage(_a) {
    var transactionID = _a.transactionID, isPDFThumbnail = _a.isPDFThumbnail, _b = _a.isThumbnail, isThumbnail = _b === void 0 ? false : _b, _c = _a.shouldUseThumbnailImage, shouldUseThumbnailImage = _c === void 0 ? false : _c, _d = _a.isEReceipt, isEReceipt = _d === void 0 ? false : _d, source = _a.source, isAuthTokenRequired = _a.isAuthTokenRequired, style = _a.style, fileExtension = _a.fileExtension, iconSize = _a.iconSize, loadingIconSize = _a.loadingIconSize, fallbackIcon = _a.fallbackIcon, fallbackIconSize = _a.fallbackIconSize, _e = _a.shouldUseInitialObjectPosition, shouldUseInitialObjectPosition = _e === void 0 ? false : _e, fallbackIconColor = _a.fallbackIconColor, fallbackIconBackground = _a.fallbackIconBackground, _f = _a.isEmptyReceipt, isEmptyReceipt = _f === void 0 ? false : _f, onPress = _a.onPress, transactionItem = _a.transactionItem, isPerDiemRequest = _a.isPerDiemRequest, shouldUseFullHeight = _a.shouldUseFullHeight, loadingIndicatorStyles = _a.loadingIndicatorStyles, thumbnailContainerStyles = _a.thumbnailContainerStyles, onLoad = _a.onLoad, onLoadFailure = _a.onLoadFailure;
    var styles = (0, useThemeStyles_1.default)();
    var _g = (0, react_1.useState)(undefined), receiptImageWidth = _g[0], setReceiptImageWidth = _g[1];
    var lastUpdateWidthTimestampRef = (0, react_1.useRef)(new Date().getTime());
    if (isEmptyReceipt) {
        return (<ReceiptEmptyState_1.default isThumbnail onPress={onPress} disabled={!onPress} shouldUseFullHeight={shouldUseFullHeight} onLoad={onLoad}/>);
    }
    if (isPDFThumbnail) {
        return (<PDFThumbnail_1.default previewSourceURL={source !== null && source !== void 0 ? source : ''} style={[styles.w100, styles.h100]} onLoadSuccess={onLoad}/>);
    }
    if (isEReceipt && !isPerDiemRequest) {
        return (<EReceiptWithSizeCalculation_1.default transactionID={transactionID} transactionItem={transactionItem} shouldUseAspectRatio={shouldUseFullHeight && shouldUseAspectRatioForEReceipts_1.default} onLoad={onLoad}/>);
    }
    if (isThumbnail || (isEReceipt && isPerDiemRequest)) {
        var props = isThumbnail && { borderRadius: style === null || style === void 0 ? void 0 : style.borderRadius, fileExtension: fileExtension, isReceiptThumbnail: true };
        return (<react_native_1.View style={style !== null && style !== void 0 ? style : [styles.w100, styles.h100]}>
                <EReceiptThumbnail_1.default transactionID={transactionID} iconSize={iconSize} 
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...props}/>
            </react_native_1.View>);
    }
    if (shouldUseThumbnailImage) {
        return (<ThumbnailImage_1.default previewSourceURL={source !== null && source !== void 0 ? source : ''} style={[styles.w100, styles.h100, thumbnailContainerStyles]} isAuthTokenRequired={isAuthTokenRequired !== null && isAuthTokenRequired !== void 0 ? isAuthTokenRequired : false} shouldDynamicallyResize={false} loadingIconSize={loadingIconSize} loadingIndicatorStyles={loadingIndicatorStyles} fallbackIcon={fallbackIcon} fallbackIconSize={fallbackIconSize} fallbackIconColor={fallbackIconColor} fallbackIconBackground={fallbackIconBackground} objectPosition={shouldUseInitialObjectPosition ? CONST_1.default.IMAGE_OBJECT_POSITION.INITIAL : CONST_1.default.IMAGE_OBJECT_POSITION.TOP} onLoad={onLoad} onLoadFailure={onLoadFailure}/>);
    }
    return (<ImageWithLoading_1.default onLayout={function (e) {
            if (e.nativeEvent.layout.width !== receiptImageWidth && e.timeStamp - lastUpdateWidthTimestampRef.current > MIN_UPDATE_WIDTH_DIFF) {
                setReceiptImageWidth(e.nativeEvent.layout.width);
            }
            lastUpdateWidthTimestampRef.current = e.timeStamp;
        }} source={typeof source === 'string' ? { uri: source } : source} style={[style !== null && style !== void 0 ? style : [styles.w100, styles.h100], styles.overflowHidden]} isAuthTokenRequired={!!isAuthTokenRequired} loadingIconSize={loadingIconSize} loadingIndicatorStyles={loadingIndicatorStyles} shouldShowOfflineIndicator={false} objectPosition={shouldUseInitialObjectPosition ? CONST_1.default.IMAGE_OBJECT_POSITION.INITIAL : CONST_1.default.IMAGE_OBJECT_POSITION.TOP} onLoad={onLoad} shouldCalculateAspectRatioForWideImage={shouldUseFullHeight} imageWidthToCalculateHeight={receiptImageWidth} onError={onLoadFailure}/>);
}
exports.default = ReceiptImage;
