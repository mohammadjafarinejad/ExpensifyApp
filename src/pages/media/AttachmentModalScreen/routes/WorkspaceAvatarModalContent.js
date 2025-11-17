"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var useOnyx_1 = require("@hooks/useOnyx");
var usePolicy_1 = require("@hooks/usePolicy");
var ReportUtils_1 = require("@libs/ReportUtils");
var UserAvatarUtils_1 = require("@libs/UserAvatarUtils");
var AttachmentModalContainer_1 = require("@pages/media/AttachmentModalScreen/AttachmentModalContainer");
var ONYXKEYS_1 = require("@src/ONYXKEYS");
var useDownloadAttachment_1 = require("./hooks/useDownloadAttachment");
function WorkspaceAvatarModalContent(_a) {
    var _b, _c, _d, _e, _f;
    var navigation = _a.navigation, route = _a.route;
    var _g = route.params, policyID = _g.policyID, fallbackLetter = _g.letter;
    var policy = (0, usePolicy_1.default)(policyID);
    var _h = (0, useOnyx_1.default)(ONYXKEYS_1.default.IS_LOADING_APP, { canBeMissing: true, initWithStoredValues: false })[0], isLoadingApp = _h === void 0 ? false : _h;
    var avatarURL = (_b = policy === null || policy === void 0 ? void 0 : policy.avatarURL) !== null && _b !== void 0 ? _b : (0, ReportUtils_1.getDefaultWorkspaceAvatar)((_c = policy === null || policy === void 0 ? void 0 : policy.name) !== null && _c !== void 0 ? _c : fallbackLetter);
    var source = (0, UserAvatarUtils_1.getFullSizeAvatar)({ avatarSource: avatarURL });
    var policyKeysLength = Object.keys(policy !== null && policy !== void 0 ? policy : {}).length;
    // eslint-disable-next-line rulesdir/no-negated-variables
    var shouldShowNotFoundPage = policyKeysLength === 0 && !isLoadingApp && (!policyID || !fallbackLetter);
    var isLoading = policyKeysLength === 0 && !!isLoadingApp;
    var originalFileName = (_e = (_d = policy === null || policy === void 0 ? void 0 : policy.originalFileName) !== null && _d !== void 0 ? _d : policy === null || policy === void 0 ? void 0 : policy.id) !== null && _e !== void 0 ? _e : policyID;
    var headerTitle = (_f = policy === null || policy === void 0 ? void 0 : policy.name) !== null && _f !== void 0 ? _f : '';
    var onDownloadAttachment = (0, useDownloadAttachment_1.default)();
    var contentProps = (0, react_1.useMemo)(function () { return ({
        source: source,
        headerTitle: headerTitle,
        originalFileName: originalFileName,
        shouldShowNotFoundPage: shouldShowNotFoundPage,
        isLoading: isLoading,
        isWorkspaceAvatar: true,
        maybeIcon: true,
        onDownloadAttachment: onDownloadAttachment,
    }); }, [headerTitle, isLoading, onDownloadAttachment, originalFileName, shouldShowNotFoundPage, source]);
    return (<AttachmentModalContainer_1.default navigation={navigation} contentProps={contentProps}/>);
}
WorkspaceAvatarModalContent.displayName = 'WorkspaceAvatarModalContent';
exports.default = WorkspaceAvatarModalContent;
