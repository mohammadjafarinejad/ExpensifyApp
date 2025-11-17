"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var useLocalize_1 = require("@hooks/useLocalize");
var useOnyx_1 = require("@hooks/useOnyx");
var PersonalDetails_1 = require("@libs/actions/PersonalDetails");
var PersonalDetailsUtils_1 = require("@libs/PersonalDetailsUtils");
var UserAvatarUtils_1 = require("@libs/UserAvatarUtils");
var ValidationUtils_1 = require("@libs/ValidationUtils");
var AttachmentModalContainer_1 = require("@pages/media/AttachmentModalScreen/AttachmentModalContainer");
var CONST_1 = require("@src/CONST");
var ONYXKEYS_1 = require("@src/ONYXKEYS");
var useDownloadAttachment_1 = require("./hooks/useDownloadAttachment");
function ProfileAvatarModalContent(_a) {
    var _b, _c, _d, _e;
    var navigation = _a.navigation, route = _a.route;
    var _f = route.params, _g = _f.accountID, accountID = _g === void 0 ? CONST_1.default.DEFAULT_NUMBER_ID : _g, tempSource = _f.source, tempOriginalFileName = _f.originalFileName;
    var formatPhoneNumber = (0, useLocalize_1.default)().formatPhoneNumber;
    var personalDetails = (0, useOnyx_1.default)(ONYXKEYS_1.default.PERSONAL_DETAILS_LIST, { canBeMissing: true })[0];
    var personalDetail = personalDetails === null || personalDetails === void 0 ? void 0 : personalDetails[accountID];
    var personalDetailsMetadata = (0, useOnyx_1.default)(ONYXKEYS_1.default.PERSONAL_DETAILS_METADATA, { canBeMissing: true })[0];
    var avatarURL = (_b = personalDetail === null || personalDetail === void 0 ? void 0 : personalDetail.avatar) !== null && _b !== void 0 ? _b : '';
    var displayName = (0, PersonalDetailsUtils_1.getDisplayNameOrDefault)(personalDetail);
    var _h = (0, useOnyx_1.default)(ONYXKEYS_1.default.IS_LOADING_APP, { canBeMissing: true })[0], isLoadingApp = _h === void 0 ? true : _h;
    var isLoading = (_d = (_c = personalDetailsMetadata === null || personalDetailsMetadata === void 0 ? void 0 : personalDetailsMetadata[accountID]) === null || _c === void 0 ? void 0 : _c.isLoading) !== null && _d !== void 0 ? _d : (isLoadingApp && !Object.keys(personalDetail !== null && personalDetail !== void 0 ? personalDetail : {}).length);
    (0, react_1.useEffect)(function () {
        if (!(0, ValidationUtils_1.isValidAccountRoute)(Number(accountID))) {
            return;
        }
        (0, PersonalDetails_1.openPublicProfilePage)(accountID);
    }, [accountID]);
    // Temp variables are coming as '' therefore || is needed
    // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
    var source = tempSource || (0, UserAvatarUtils_1.getFullSizeAvatar)({ avatarSource: avatarURL, accountID: accountID });
    // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
    var originalFileName = tempOriginalFileName || ((_e = personalDetail === null || personalDetail === void 0 ? void 0 : personalDetail.originalFileName) !== null && _e !== void 0 ? _e : '');
    var headerTitle = formatPhoneNumber(displayName);
    // eslint-disable-next-line rulesdir/no-negated-variables
    var shouldShowNotFoundPage = !avatarURL;
    var onDownloadAttachment = (0, useDownloadAttachment_1.default)();
    var contentProps = (0, react_1.useMemo)(function () { return ({
        source: source,
        originalFileName: originalFileName,
        headerTitle: headerTitle,
        isLoading: isLoading,
        shouldShowNotFoundPage: shouldShowNotFoundPage,
        maybeIcon: true,
        onDownloadAttachment: onDownloadAttachment,
    }); }, [headerTitle, isLoading, onDownloadAttachment, originalFileName, shouldShowNotFoundPage, source]);
    return (<AttachmentModalContainer_1.default navigation={navigation} contentProps={contentProps}/>);
}
ProfileAvatarModalContent.displayName = 'ProfileAvatarModalContent';
exports.default = ProfileAvatarModalContent;
