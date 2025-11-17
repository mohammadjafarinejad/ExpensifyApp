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
var useOnyx_1 = require("@hooks/useOnyx");
var ReportUtils_1 = require("@libs/ReportUtils");
var UserAvatarUtils_1 = require("@libs/UserAvatarUtils");
var AttachmentModalContainer_1 = require("@pages/media/AttachmentModalScreen/AttachmentModalContainer");
var useDownloadAttachment_1 = require("@pages/media/AttachmentModalScreen/routes/hooks/useDownloadAttachment");
var ONYXKEYS_1 = require("@src/ONYXKEYS");
function ReportAvatarModalContent(_a) {
    var navigation = _a.navigation, route = _a.route;
    var _b = route.params, reportID = _b.reportID, policyID = _b.policyID;
    var report = (0, useOnyx_1.default)("".concat(ONYXKEYS_1.default.COLLECTION.REPORT).concat(reportID), { canBeMissing: false })[0];
    var policy = (0, useOnyx_1.default)("".concat(ONYXKEYS_1.default.COLLECTION.POLICY).concat(policyID), { canBeMissing: true })[0];
    var _c = (0, useOnyx_1.default)(ONYXKEYS_1.default.IS_LOADING_APP, { canBeMissing: true })[0], isLoadingApp = _c === void 0 ? true : _c;
    var attachment = (0, react_1.useMemo)(function () {
        var _a, _b;
        if ((0, ReportUtils_1.isGroupChat)(report) && !(0, ReportUtils_1.isThread)(report)) {
            return {
                source: (report === null || report === void 0 ? void 0 : report.avatarUrl) ? (0, UserAvatarUtils_1.getFullSizeAvatar)({ avatarSource: report.avatarUrl }) : (0, ReportUtils_1.getDefaultGroupAvatar)(report === null || report === void 0 ? void 0 : report.reportID),
                headerTitle: (0, ReportUtils_1.getReportName)(report),
                isWorkspaceAvatar: false,
            };
        }
        if ((0, ReportUtils_1.isUserCreatedPolicyRoom)(report) && (report === null || report === void 0 ? void 0 : report.avatarUrl)) {
            return {
                source: (0, UserAvatarUtils_1.getFullSizeAvatar)({ avatarSource: report.avatarUrl }),
                headerTitle: (0, ReportUtils_1.getReportName)(report),
                isWorkspaceAvatar: false,
            };
        }
        if ((0, ReportUtils_1.isUserCreatedPolicyRoom)(report) && (report === null || report === void 0 ? void 0 : report.avatarUrl)) {
            return {
                source: (0, UserAvatarUtils_1.getFullSizeAvatar)({ avatarSource: report.avatarUrl }),
                headerTitle: (0, ReportUtils_1.getReportName)(report),
                isWorkspaceAvatar: false,
            };
        }
        return {
            source: (0, UserAvatarUtils_1.getFullSizeAvatar)({ avatarSource: (0, ReportUtils_1.getWorkspaceIcon)(report, policy).source }),
            headerTitle: (0, ReportUtils_1.getPolicyName)({ report: report, policy: policy }),
            // In the case of default workspace avatar, originalFileName prop takes policyID as value to get the color of the avatar
            originalFileName: (_b = (_a = policy === null || policy === void 0 ? void 0 : policy.originalFileName) !== null && _a !== void 0 ? _a : policy === null || policy === void 0 ? void 0 : policy.id) !== null && _b !== void 0 ? _b : report === null || report === void 0 ? void 0 : report.policyID,
            isWorkspaceAvatar: true,
        };
    }, [policy, report]);
    var onDownloadAttachment = (0, useDownloadAttachment_1.default)();
    // eslint-disable-next-line rulesdir/no-negated-variables
    var shouldShowNotFoundPage = !(report === null || report === void 0 ? void 0 : report.reportID) && !isLoadingApp;
    var isLoading = (!(report === null || report === void 0 ? void 0 : report.reportID) || !(policy === null || policy === void 0 ? void 0 : policy.id)) && !!isLoadingApp;
    var contentProps = (0, react_1.useMemo)(function () { return (__assign(__assign({}, attachment), { shouldShowNotFoundPage: shouldShowNotFoundPage, isLoading: isLoading, maybeIcon: true, onDownloadAttachment: onDownloadAttachment })); }, [attachment, shouldShowNotFoundPage, isLoading, onDownloadAttachment]);
    return (<AttachmentModalContainer_1.default navigation={navigation} contentProps={contentProps}/>);
}
ReportAvatarModalContent.displayName = 'ReportAvatarModalContent';
exports.default = ReportAvatarModalContent;
