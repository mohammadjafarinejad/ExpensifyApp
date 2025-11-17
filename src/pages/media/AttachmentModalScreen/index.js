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
var react_1 = require("react");
var Log_1 = require("@libs/Log");
var SCREENS_1 = require("@src/SCREENS");
var AttachmentModalContext_1 = require("./AttachmentModalContext");
var ProfileAvatarModalContent_1 = require("./routes/ProfileAvatarModalContent");
var ReportAddAttachmentModalContent_1 = require("./routes/report/ReportAddAttachmentModalContent");
var ReportAttachmentModalContent_1 = require("./routes/report/ReportAttachmentModalContent");
var ReportAvatarModalContent_1 = require("./routes/report/ReportAvatarModalContent");
var ShareDetailsAttachmentModalContent_1 = require("./routes/ShareDetailsAttachmentModalContent");
var TransactionReceiptModalContent_1 = require("./routes/TransactionReceiptModalContent");
var WorkspaceAvatarModalContent_1 = require("./routes/WorkspaceAvatarModalContent");
/**
 * The attachment modal screen can take various different shapes. This is the main screen component that receives the route and
 * navigation props from the parent screen and renders the correct modal content based on the route.
 */
function AttachmentModalScreen(_a) {
    var route = _a.route, navigation = _a.navigation;
    var attachmentsContext = (0, react_1.useContext)(AttachmentModalContext_1.default);
    var routeWithContext = (0, react_1.useMemo)(function () {
        var currentAttachment = attachmentsContext.getCurrentAttachment();
        if (currentAttachment) {
            return __assign(__assign({}, route), { params: __assign(__assign({}, route.params), currentAttachment) });
        }
        return route;
    }, [attachmentsContext, route]);
    if (route.name === SCREENS_1.default.REPORT_ATTACHMENTS) {
        return (<ReportAttachmentModalContent_1.default route={routeWithContext} navigation={navigation}/>);
    }
    if (route.name === SCREENS_1.default.REPORT_ADD_ATTACHMENT) {
        return (<ReportAddAttachmentModalContent_1.default route={routeWithContext} navigation={navigation}/>);
    }
    if (route.name === SCREENS_1.default.TRANSACTION_RECEIPT || route.name === SCREENS_1.default.MONEY_REQUEST.RECEIPT_PREVIEW) {
        return (<TransactionReceiptModalContent_1.default route={routeWithContext} navigation={navigation}/>);
    }
    if (route.name === SCREENS_1.default.PROFILE_AVATAR) {
        return (<ProfileAvatarModalContent_1.default route={routeWithContext} navigation={navigation}/>);
    }
    if (route.name === SCREENS_1.default.WORKSPACE_AVATAR) {
        return (<WorkspaceAvatarModalContent_1.default route={routeWithContext} navigation={navigation}/>);
    }
    if (route.name === SCREENS_1.default.REPORT_AVATAR) {
        return (<ReportAvatarModalContent_1.default route={routeWithContext} navigation={navigation}/>);
    }
    if (route.name === SCREENS_1.default.SHARE.SHARE_DETAILS_ATTACHMENT) {
        return (<ShareDetailsAttachmentModalContent_1.default route={routeWithContext} navigation={navigation}/>);
    }
    Log_1.default.warn('Unknown attachment modal screen. Make sure to add the new screen as a route to the AttachmentModalScreen component.', { route: route });
    return null;
}
AttachmentModalScreen.displayName = 'AttachmentModalScreen';
exports.default = AttachmentModalScreen;
