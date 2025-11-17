"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var ScreenWrapper_1 = require("@components/ScreenWrapper");
var WorkspaceConfirmationForm_1 = require("@components/WorkspaceConfirmationForm");
var useOnyx_1 = require("@hooks/useOnyx");
var Policy_1 = require("@libs/actions/Policy/Policy");
var Navigation_1 = require("@libs/Navigation/Navigation");
var ONYXKEYS_1 = require("@src/ONYXKEYS");
function WorkspaceConfirmationForTravelPage() {
    var introSelected = (0, useOnyx_1.default)(ONYXKEYS_1.default.NVP_INTRO_SELECTED, { canBeMissing: true })[0];
    var onSubmit = function (params) {
        (0, Policy_1.createDraftWorkspace)(introSelected, '', false, params.name, params.policyID, params.currency, params.avatarFile);
        (0, Policy_1.createWorkspace)({
            policyOwnerEmail: '',
            makeMeAdmin: false,
            policyName: params.name,
            policyID: params.policyID,
            engagementChoice: undefined,
            currency: params.currency,
            file: params.avatarFile,
        });
        Navigation_1.default.goBack();
    };
    return (<ScreenWrapper_1.default enableEdgeToEdgeBottomSafeAreaPadding testID={WorkspaceConfirmationForTravelPage.displayName}>
            <WorkspaceConfirmationForm_1.default onSubmit={onSubmit}/>
        </ScreenWrapper_1.default>);
}
WorkspaceConfirmationForTravelPage.displayName = 'WorkspaceConfirmationForTravelPage';
exports.default = WorkspaceConfirmationForTravelPage;
