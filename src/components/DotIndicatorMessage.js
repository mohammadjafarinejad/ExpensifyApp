"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_native_1 = require("react-native");
var useLocalize_1 = require("@hooks/useLocalize");
var useStyleUtils_1 = require("@hooks/useStyleUtils");
var useTheme_1 = require("@hooks/useTheme");
var useThemeStyles_1 = require("@hooks/useThemeStyles");
var ErrorUtils_1 = require("@libs/ErrorUtils");
var fileDownload_1 = require("@libs/fileDownload");
var ReceiptUploadRetryHandler_1 = require("@libs/ReceiptUploadRetryHandler");
var ConfirmModal_1 = require("./ConfirmModal");
var Icon_1 = require("./Icon");
var Expensicons = require("./Icon/Expensicons");
var RenderHTML_1 = require("./RenderHTML");
var Text_1 = require("./Text");
function DotIndicatorMessage(_a) {
    var _b = _a.messages, messages = _b === void 0 ? {} : _b, style = _a.style, type = _a.type, textStyles = _a.textStyles, _c = _a.dismissError, dismissError = _c === void 0 ? function () { } : _c;
    var theme = (0, useTheme_1.default)();
    var styles = (0, useThemeStyles_1.default)();
    var StyleUtils = (0, useStyleUtils_1.default)();
    var translate = (0, useLocalize_1.default)().translate;
    var _d = (0, react_1.useState)(false), shouldShowErrorModal = _d[0], setShouldShowErrorModal = _d[1];
    if (Object.keys(messages).length === 0) {
        return null;
    }
    // Fetch the keys, sort them, and map through each key to get the corresponding message
    var sortedMessages = Object.keys(messages)
        .sort()
        .map(function (key) { return messages[key]; })
        .filter(function (message) { return message !== null; });
    // Removing duplicates using Set and transforming the result into an array
    var uniqueMessages = __spreadArray([], new Set(sortedMessages), true).map(function (message) { return message; });
    var isErrorMessage = type === 'error';
    var receiptError = uniqueMessages.find(ErrorUtils_1.isReceiptError);
    var handleLinkPress = function (href) {
        if (!receiptError) {
            return;
        }
        if (href.endsWith('retry')) {
            (0, ReceiptUploadRetryHandler_1.default)(receiptError, dismissError, setShouldShowErrorModal);
        }
        else if (href.endsWith('download')) {
            (0, fileDownload_1.default)(receiptError.source, receiptError.filename).finally(function () { return dismissError(); });
        }
    };
    var renderMessage = function (message, index) {
        if ((0, ErrorUtils_1.isReceiptError)(message)) {
            return (<>
                    <react_native_1.View style={[styles.renderHTML, styles.flexRow]}>
                        <RenderHTML_1.default html={translate('iou.error.receiptFailureMessage')} onLinkPress={function (_evt, href) { return handleLinkPress(href); }}/>
                    </react_native_1.View>

                    <ConfirmModal_1.default isVisible={shouldShowErrorModal} onConfirm={function () {
                    setShouldShowErrorModal(false);
                }} prompt={translate('common.genericErrorMessage')} confirmText={translate('common.ok')} shouldShowCancelButton={false}/>
                </>);
        }
        return (<Text_1.default 
        // eslint-disable-next-line react/no-array-index-key
        key={index} style={[StyleUtils.getDotIndicatorTextStyles(isErrorMessage), textStyles]}>
                {(0, ErrorUtils_1.isTranslationKeyError)(message) ? translate(message.translationKey) : message}
            </Text_1.default>);
    };
    return (<react_native_1.View style={[styles.dotIndicatorMessage, style]}>
            <react_native_1.View style={styles.offlineFeedbackErrorDot}>
                <Icon_1.default src={Expensicons.DotIndicator} fill={isErrorMessage ? theme.danger : theme.success}/>
            </react_native_1.View>
            <react_native_1.View style={styles.offlineFeedbackTextContainer}>{uniqueMessages.map(renderMessage)}</react_native_1.View>
        </react_native_1.View>);
}
DotIndicatorMessage.displayName = 'DotIndicatorMessage';
exports.default = DotIndicatorMessage;
