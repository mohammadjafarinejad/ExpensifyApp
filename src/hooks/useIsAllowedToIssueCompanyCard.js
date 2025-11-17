"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CardUtils_1 = require("@libs/CardUtils");
var PolicyUtils_1 = require("@libs/PolicyUtils");
var ONYXKEYS_1 = require("@src/ONYXKEYS");
var useCardFeeds_1 = require("./useCardFeeds");
var useOnyx_1 = require("./useOnyx");
var usePolicy_1 = require("./usePolicy");
function useIsAllowedToIssueCompanyCard(_a) {
    var policyID = _a.policyID;
    var lastSelectedFeed = (0, useOnyx_1.default)("".concat(ONYXKEYS_1.default.COLLECTION.LAST_SELECTED_FEED).concat(policyID), { canBeMissing: true })[0];
    var policy = (0, usePolicy_1.default)(policyID);
    var isPolicyAdmin = (0, PolicyUtils_1.isPolicyAdmin)(policy);
    var cardFeeds = (0, useCardFeeds_1.default)(policyID)[0];
    var companyCards = (0, CardUtils_1.getCompanyFeeds)(cardFeeds);
    var selectedFeed = (0, CardUtils_1.getSelectedFeed)(lastSelectedFeed, cardFeeds);
    var selectedFeedData = selectedFeed && companyCards[selectedFeed];
    var adminAccess = (0, useOnyx_1.default)("".concat(ONYXKEYS_1.default.COLLECTION.SHARED_NVP_PRIVATE_ADMIN_ACCESS).concat(selectedFeedData === null || selectedFeedData === void 0 ? void 0 : selectedFeedData.domainID), { canBeMissing: true })[0];
    return (selectedFeedData === null || selectedFeedData === void 0 ? void 0 : selectedFeedData.domainID) ? !!adminAccess : isPolicyAdmin;
}
exports.default = useIsAllowedToIssueCompanyCard;
