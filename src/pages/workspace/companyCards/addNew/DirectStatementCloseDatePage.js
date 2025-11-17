"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var FullscreenLoadingIndicator_1 = require("@components/FullscreenLoadingIndicator");
var useCardFeeds_1 = require("@hooks/useCardFeeds");
var useLocalize_1 = require("@hooks/useLocalize");
var useOnyx_1 = require("@hooks/useOnyx");
var useWorkspaceAccountID_1 = require("@hooks/useWorkspaceAccountID");
var CompanyCards_1 = require("@libs/actions/CompanyCards");
var CardUtils_1 = require("@libs/CardUtils");
var Navigation_1 = require("@libs/Navigation/Navigation");
var WorkspaceCompanyCardStatementCloseDateSelectionList_1 = require("@pages/workspace/companyCards/WorkspaceCompanyCardStatementCloseDateSelectionList");
var ONYXKEYS_1 = require("@src/ONYXKEYS");
var ROUTES_1 = require("@src/ROUTES");
var isLoadingOnyxValue_1 = require("@src/types/utils/isLoadingOnyxValue");
function DirectStatementCloseDateStep(_a) {
    var _b, _c;
    var policyID = _a.policyID;
    var translate = (0, useLocalize_1.default)().translate;
    var _d = (0, useOnyx_1.default)("".concat(ONYXKEYS_1.default.COLLECTION.LAST_SELECTED_FEED).concat(policyID), { canBeMissing: true }), lastSelectedFeed = _d[0], lastSelectedFeedResult = _d[1];
    var _e = (0, useCardFeeds_1.default)(policyID), cardFeeds = _e[0], cardFeedsResult = _e[1];
    var selectedFeed = (0, CardUtils_1.getSelectedFeed)(lastSelectedFeed, cardFeeds);
    var workspaceAccountID = (0, useWorkspaceAccountID_1.default)(policyID);
    var companyFeeds = (0, CardUtils_1.getCompanyFeeds)(cardFeeds);
    var selectedFeedData = selectedFeed ? companyFeeds[selectedFeed] : undefined;
    var domainOrWorkspaceAccountID = (0, CardUtils_1.getDomainOrWorkspaceAccountID)(workspaceAccountID, selectedFeedData);
    var statementPeriodEndDay = selectedFeedData === null || selectedFeedData === void 0 ? void 0 : selectedFeedData.statementPeriodEndDay;
    var _f = (0, react_1.useMemo)(function () {
        if (!statementPeriodEndDay) {
            return [undefined, undefined];
        }
        if (typeof statementPeriodEndDay === 'number') {
            return [undefined, statementPeriodEndDay];
        }
        return [statementPeriodEndDay, undefined];
    }, [statementPeriodEndDay]), defaultStatementPeriodEnd = _f[0], defaultStatementPeriodEndDay = _f[1];
    var goBack = (0, react_1.useCallback)(function () {
        Navigation_1.default.closeRHPFlow();
        Navigation_1.default.navigate(ROUTES_1.default.WORKSPACE_COMPANY_CARDS.getRoute(policyID), { forceReplace: true });
    }, [policyID]);
    var submit = (0, react_1.useCallback)(function (newStatementPeriodEnd, newStatementPeriodEndDay) {
        if (!policyID) {
            return;
        }
        var isChangedValue = (newStatementPeriodEndDay !== null && newStatementPeriodEndDay !== void 0 ? newStatementPeriodEndDay : newStatementPeriodEnd) !== statementPeriodEndDay;
        if (selectedFeed && isChangedValue) {
            (0, CompanyCards_1.setFeedStatementPeriodEndDay)(policyID, selectedFeed, domainOrWorkspaceAccountID, newStatementPeriodEnd, newStatementPeriodEndDay, statementPeriodEndDay);
        }
        goBack();
    }, [policyID, statementPeriodEndDay, selectedFeed, goBack, domainOrWorkspaceAccountID]);
    var clearError = (0, react_1.useCallback)(function () {
        if (!selectedFeed) {
            return;
        }
        (0, CompanyCards_1.clearErrorField)(selectedFeed, domainOrWorkspaceAccountID, 'statementPeriodEndDay');
    }, [selectedFeed, domainOrWorkspaceAccountID]);
    if ((0, isLoadingOnyxValue_1.default)(cardFeedsResult) || (0, isLoadingOnyxValue_1.default)(lastSelectedFeedResult)) {
        return <FullscreenLoadingIndicator_1.default />;
    }
    return (<WorkspaceCompanyCardStatementCloseDateSelectionList_1.default confirmText={translate('common.apply')} onSubmit={submit} onBackButtonPress={goBack} enabledWhenOffline defaultStatementPeriodEnd={defaultStatementPeriodEnd} defaultStatementPeriodEndDay={defaultStatementPeriodEndDay} pendingAction={(_b = selectedFeedData === null || selectedFeedData === void 0 ? void 0 : selectedFeedData.pendingFields) === null || _b === void 0 ? void 0 : _b.statementPeriodEndDay} errors={(_c = selectedFeedData === null || selectedFeedData === void 0 ? void 0 : selectedFeedData.errorFields) === null || _c === void 0 ? void 0 : _c.statementPeriodEndDay} onCloseError={clearError}/>);
}
DirectStatementCloseDateStep.displayName = 'DirectStatementCloseDateStep';
exports.default = DirectStatementCloseDateStep;
