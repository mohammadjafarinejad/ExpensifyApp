"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.startTestDrive = startTestDrive;
var react_native_1 = require("react-native");
var Navigation_1 = require("@libs/Navigation/Navigation");
var CONST_1 = require("@src/CONST");
var ROUTES_1 = require("@src/ROUTES");
function startTestDrive(introSelected, hasUserBeenAddedToNudgeMigration, isUserPaidPolicyMember) {
    // eslint-disable-next-line @typescript-eslint/no-deprecated
    react_native_1.InteractionManager.runAfterInteractions(function () {
        if (hasUserBeenAddedToNudgeMigration ||
            isUserPaidPolicyMember ||
            (introSelected === null || introSelected === void 0 ? void 0 : introSelected.choice) === CONST_1.default.ONBOARDING_CHOICES.MANAGE_TEAM ||
            (introSelected === null || introSelected === void 0 ? void 0 : introSelected.choice) === CONST_1.default.ONBOARDING_CHOICES.TEST_DRIVE_RECEIVER ||
            (introSelected === null || introSelected === void 0 ? void 0 : introSelected.choice) === CONST_1.default.ONBOARDING_CHOICES.TRACK_WORKSPACE ||
            ((introSelected === null || introSelected === void 0 ? void 0 : introSelected.choice) === CONST_1.default.ONBOARDING_CHOICES.SUBMIT && introSelected.inviteType === CONST_1.default.ONBOARDING_INVITE_TYPES.WORKSPACE)) {
            Navigation_1.default.navigate(ROUTES_1.default.TEST_DRIVE_DEMO_ROOT);
        }
        else {
            Navigation_1.default.navigate(ROUTES_1.default.TEST_DRIVE_MODAL_ROOT.route);
        }
    });
}
