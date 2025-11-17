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
var Onboarding_1 = require("@selectors/Onboarding");
var react_1 = require("react");
var react_native_1 = require("react-native");
var FullPageOfflineBlockingView_1 = require("@components/BlockingViews/FullPageOfflineBlockingView");
var EmbeddedDemo_1 = require("@components/EmbeddedDemo");
var Modal_1 = require("@components/Modal");
var SafeAreaConsumer_1 = require("@components/SafeAreaConsumer");
var useCurrentUserPersonalDetails_1 = require("@hooks/useCurrentUserPersonalDetails");
var useIsPaidPolicyAdmin_1 = require("@hooks/useIsPaidPolicyAdmin");
var useOnboardingMessages_1 = require("@hooks/useOnboardingMessages");
var useOnboardingTaskInformation_1 = require("@hooks/useOnboardingTaskInformation");
var useOnyx_1 = require("@hooks/useOnyx");
var useResponsiveLayout_1 = require("@hooks/useResponsiveLayout");
var useThemeStyles_1 = require("@hooks/useThemeStyles");
var Task_1 = require("@libs/actions/Task");
var Navigation_1 = require("@libs/Navigation/Navigation");
var ReportUtils_1 = require("@libs/ReportUtils");
var TourUtils_1 = require("@libs/TourUtils");
var CONST_1 = require("@src/CONST");
var ONYXKEYS_1 = require("@src/ONYXKEYS");
var ROUTES_1 = require("@src/ROUTES");
var TestDriveBanner_1 = require("./TestDriveBanner");
function TestDriveDemo() {
    var shouldUseNarrowLayout = (0, useResponsiveLayout_1.default)().shouldUseNarrowLayout;
    var _a = (0, react_1.useState)(false), isVisible = _a[0], setIsVisible = _a[1];
    var styles = (0, useThemeStyles_1.default)();
    var onboarding = (0, useOnyx_1.default)(ONYXKEYS_1.default.NVP_ONBOARDING, { canBeMissing: false })[0];
    var onboardingReport = (0, useOnyx_1.default)("".concat(ONYXKEYS_1.default.COLLECTION.REPORT).concat(onboarding === null || onboarding === void 0 ? void 0 : onboarding.chatReportID), { canBeMissing: true })[0];
    var introSelected = (0, useOnyx_1.default)(ONYXKEYS_1.default.NVP_INTRO_SELECTED, { canBeMissing: true })[0];
    var _b = (0, useOnboardingTaskInformation_1.default)(CONST_1.default.ONBOARDING_TASK_TYPE.VIEW_TOUR), viewTourTaskReport = _b.taskReport, viewTourTaskParentReport = _b.taskParentReport, isViewTourTaskParentReportArchived = _b.isOnboardingTaskParentReportArchived;
    var testDrive = (0, useOnboardingMessages_1.default)().testDrive;
    var currentUserPersonalDetails = (0, useCurrentUserPersonalDetails_1.default)();
    var isCurrentUserPolicyAdmin = (0, useIsPaidPolicyAdmin_1.default)();
    var _c = (0, useOnyx_1.default)(ONYXKEYS_1.default.NVP_ONBOARDING, {
        selector: Onboarding_1.hasSeenTourSelector,
        canBeMissing: true,
    })[0], hasSeenTour = _c === void 0 ? false : _c;
    (0, react_1.useEffect)(function () {
        if (hasSeenTour || !viewTourTaskReport || viewTourTaskReport.stateNum === CONST_1.default.REPORT.STATE_NUM.APPROVED) {
            return;
        }
        (0, Task_1.completeTestDriveTask)(viewTourTaskReport, viewTourTaskParentReport, isViewTourTaskParentReportArchived, currentUserPersonalDetails.accountID);
    }, [hasSeenTour, viewTourTaskReport, viewTourTaskParentReport, isViewTourTaskParentReportArchived, currentUserPersonalDetails.accountID]);
    (0, react_1.useEffect)(function () {
        // eslint-disable-next-line @typescript-eslint/no-deprecated
        react_native_1.InteractionManager.runAfterInteractions(function () {
            setIsVisible(true);
        });
    }, []);
    var closeModal = (0, react_1.useCallback)(function () {
        setIsVisible(false);
        // eslint-disable-next-line @typescript-eslint/no-deprecated
        react_native_1.InteractionManager.runAfterInteractions(function () {
            Navigation_1.default.goBack();
            if ((0, ReportUtils_1.isAdminRoom)(onboardingReport)) {
                Navigation_1.default.navigate(ROUTES_1.default.REPORT_WITH_ID.getRoute(onboardingReport === null || onboardingReport === void 0 ? void 0 : onboardingReport.reportID));
            }
        });
    }, [onboardingReport]);
    return (<SafeAreaConsumer_1.default>
            {function (_a) {
            var paddingTop = _a.paddingTop, paddingBottom = _a.paddingBottom;
            return (<Modal_1.default isVisible={isVisible} onClose={closeModal} type={CONST_1.default.MODAL.MODAL_TYPE.FULLSCREEN} style={styles.backgroundWhite} innerContainerStyle={__assign(__assign({}, styles.flex1), { marginTop: paddingTop, marginBottom: paddingBottom })}>
                    <TestDriveBanner_1.default onPress={closeModal}/>
                    <FullPageOfflineBlockingView_1.default>
                        <EmbeddedDemo_1.default url={(0, TourUtils_1.getTestDriveURL)(shouldUseNarrowLayout, introSelected, isCurrentUserPolicyAdmin)} iframeTitle={testDrive.EMBEDDED_DEMO_IFRAME_TITLE}/>
                    </FullPageOfflineBlockingView_1.default>
                </Modal_1.default>);
        }}
        </SafeAreaConsumer_1.default>);
}
TestDriveDemo.displayName = 'TestDriveDemo';
exports.default = TestDriveDemo;
