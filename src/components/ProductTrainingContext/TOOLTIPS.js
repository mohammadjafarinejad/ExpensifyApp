"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
var Welcome_1 = require("@libs/actions/Welcome");
var CONST_1 = require("@src/CONST");
var _b = CONST_1.default.PRODUCT_TRAINING_TOOLTIP_NAMES, CONCIERGE_LHN_GBR = _b.CONCIERGE_LHN_GBR, RENAME_SAVED_SEARCH = _b.RENAME_SAVED_SEARCH, SCAN_TEST_TOOLTIP = _b.SCAN_TEST_TOOLTIP, SCAN_TEST_TOOLTIP_MANAGER = _b.SCAN_TEST_TOOLTIP_MANAGER, SCAN_TEST_CONFIRMATION = _b.SCAN_TEST_CONFIRMATION, OUTSTANDING_FILTER = _b.OUTSTANDING_FILTER, ACCOUNT_SWITCHER = _b.ACCOUNT_SWITCHER, SCAN_TEST_DRIVE_CONFIRMATION = _b.SCAN_TEST_DRIVE_CONFIRMATION;
var TOOLTIPS = (_a = {},
    _a[CONCIERGE_LHN_GBR] = {
        content: 'productTrainingTooltip.conciergeLHNGBR',
        onHideTooltip: function (isDismissedUsingCloseButton) {
            if (isDismissedUsingCloseButton === void 0) { isDismissedUsingCloseButton = false; }
            return (0, Welcome_1.dismissProductTraining)(CONCIERGE_LHN_GBR, isDismissedUsingCloseButton);
        },
        name: CONCIERGE_LHN_GBR,
        priority: 1300,
        // TODO: CONCIERGE_LHN_GBR tooltip will be replaced by a tooltip in the #admins room
        // https://github.com/Expensify/App/issues/57045#issuecomment-2701455668
        shouldShow: function () { return false; },
    },
    _a[RENAME_SAVED_SEARCH] = {
        content: 'productTrainingTooltip.saveSearchTooltip',
        onHideTooltip: function (isDismissedUsingCloseButton) {
            if (isDismissedUsingCloseButton === void 0) { isDismissedUsingCloseButton = false; }
            return (0, Welcome_1.dismissProductTraining)(RENAME_SAVED_SEARCH, isDismissedUsingCloseButton);
        },
        name: RENAME_SAVED_SEARCH,
        priority: 1250,
        shouldShow: function (_a) {
            var shouldUseNarrowLayout = _a.shouldUseNarrowLayout;
            return !shouldUseNarrowLayout;
        },
    },
    _a[ACCOUNT_SWITCHER] = {
        content: 'productTrainingTooltip.accountSwitcher',
        onHideTooltip: function () { return (0, Welcome_1.dismissProductTraining)(ACCOUNT_SWITCHER); },
        name: ACCOUNT_SWITCHER,
        priority: 1600,
        shouldShow: function () { return true; },
    },
    _a[SCAN_TEST_TOOLTIP] = {
        content: 'productTrainingTooltip.scanTestTooltip.main',
        onHideTooltip: function () { return (0, Welcome_1.dismissProductTraining)(SCAN_TEST_TOOLTIP); },
        name: SCAN_TEST_TOOLTIP,
        priority: 900,
        shouldShow: function (_a) {
            var isUserInPaidPolicy = _a.isUserInPaidPolicy, hasBeenAddedToNudgeMigration = _a.hasBeenAddedToNudgeMigration;
            return !isUserInPaidPolicy && !hasBeenAddedToNudgeMigration;
        },
        shouldRenderActionButtons: true,
    },
    _a[SCAN_TEST_TOOLTIP_MANAGER] = {
        content: 'productTrainingTooltip.scanTestTooltip.manager',
        onHideTooltip: function (isDismissedUsingCloseButton) {
            if (isDismissedUsingCloseButton === void 0) { isDismissedUsingCloseButton = false; }
            return (0, Welcome_1.dismissProductTraining)(SCAN_TEST_TOOLTIP_MANAGER, isDismissedUsingCloseButton);
        },
        name: SCAN_TEST_TOOLTIP_MANAGER,
        priority: 1000,
        shouldShow: function (_a) {
            var hasBeenAddedToNudgeMigration = _a.hasBeenAddedToNudgeMigration;
            return !hasBeenAddedToNudgeMigration;
        },
    },
    _a[SCAN_TEST_CONFIRMATION] = {
        content: 'productTrainingTooltip.scanTestTooltip.confirmation',
        onHideTooltip: function (isDismissedUsingCloseButton) {
            if (isDismissedUsingCloseButton === void 0) { isDismissedUsingCloseButton = false; }
            return (0, Welcome_1.dismissProductTraining)(SCAN_TEST_CONFIRMATION, isDismissedUsingCloseButton);
        },
        name: SCAN_TEST_CONFIRMATION,
        priority: 1100,
        shouldShow: function (_a) {
            var hasBeenAddedToNudgeMigration = _a.hasBeenAddedToNudgeMigration;
            return !hasBeenAddedToNudgeMigration;
        },
    },
    _a[OUTSTANDING_FILTER] = {
        content: 'productTrainingTooltip.outstandingFilter',
        onHideTooltip: function () { return (0, Welcome_1.dismissProductTraining)(OUTSTANDING_FILTER); },
        name: OUTSTANDING_FILTER,
        priority: 1925,
        shouldShow: function (_a) {
            var isUserPolicyAdmin = _a.isUserPolicyAdmin;
            return isUserPolicyAdmin;
        },
    },
    _a[SCAN_TEST_DRIVE_CONFIRMATION] = {
        content: 'productTrainingTooltip.scanTestDriveTooltip',
        onHideTooltip: function (isDismissedUsingCloseButton) {
            if (isDismissedUsingCloseButton === void 0) { isDismissedUsingCloseButton = false; }
            return (0, Welcome_1.dismissProductTraining)(SCAN_TEST_DRIVE_CONFIRMATION, isDismissedUsingCloseButton);
        },
        name: SCAN_TEST_DRIVE_CONFIRMATION,
        priority: 1200,
        shouldShow: function () { return true; },
    },
    _a);
exports.default = TOOLTIPS;
