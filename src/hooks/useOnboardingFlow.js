"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var HybridApp_1 = require("@selectors/HybridApp");
var Onboarding_1 = require("@selectors/Onboarding");
var Session_1 = require("@selectors/Session");
var react_1 = require("react");
var react_native_1 = require("react-native");
var OnboardingFlow_1 = require("@libs/actions/Welcome/OnboardingFlow");
var currentUrl_1 = require("@libs/Navigation/currentUrl");
var Navigation_1 = require("@libs/Navigation/Navigation");
var SearchQueryUtils_1 = require("@libs/SearchQueryUtils");
var SessionUtils_1 = require("@libs/SessionUtils");
var TooltipUtils_1 = require("@libs/TooltipUtils");
var CONFIG_1 = require("@src/CONFIG");
var NAVIGATORS_1 = require("@src/NAVIGATORS");
var ONYXKEYS_1 = require("@src/ONYXKEYS");
var ROUTES_1 = require("@src/ROUTES");
var isLoadingOnyxValue_1 = require("@src/types/utils/isLoadingOnyxValue");
var useOnyx_1 = require("./useOnyx");
var useSearchTypeMenuSections_1 = require("./useSearchTypeMenuSections");
/**
 * Hook to handle redirection to the onboarding flow based on the user's onboarding status
 *
 * Warning: This hook should be used only once in the app
 */
function useOnboardingFlowRouter() {
    var currentUrl = (0, currentUrl_1.default)();
    var _a = (0, useOnyx_1.default)(ONYXKEYS_1.default.IS_LOADING_APP, { canBeMissing: true })[0], isLoadingApp = _a === void 0 ? true : _a;
    var _b = (0, useOnyx_1.default)(ONYXKEYS_1.default.NVP_ONBOARDING, {
        canBeMissing: true,
    }), onboardingValues = _b[0], isOnboardingCompletedMetadata = _b[1];
    var currentOnboardingPurposeSelected = (0, useOnyx_1.default)(ONYXKEYS_1.default.ONBOARDING_PURPOSE_SELECTED, { canBeMissing: true })[0];
    var currentOnboardingCompanySize = (0, useOnyx_1.default)(ONYXKEYS_1.default.ONBOARDING_COMPANY_SIZE, { canBeMissing: true })[0];
    var _c = (0, useOnyx_1.default)(ONYXKEYS_1.default.ONBOARDING_LAST_VISITED_PATH, { canBeMissing: true }), onboardingInitialPath = _c[0], onboardingInitialPathMetadata = _c[1];
    var _d = (0, useOnyx_1.default)(ONYXKEYS_1.default.ACCOUNT, { canBeMissing: true }), account = _d[0], accountMetadata = _d[1];
    var isOnboardingLoading = (0, isLoadingOnyxValue_1.default)(onboardingInitialPathMetadata, accountMetadata);
    var sessionEmail = (0, useOnyx_1.default)(ONYXKEYS_1.default.SESSION, { canBeMissing: true, selector: Session_1.emailSelector })[0];
    var isLoggingInAsNewSessionUser = (0, SessionUtils_1.isLoggingInAsNewUser)(currentUrl, sessionEmail);
    var startedOnboardingFlowRef = (0, react_1.useRef)(false);
    var started2FAFlowRef = (0, react_1.useRef)(false);
    var _e = (0, useOnyx_1.default)(ONYXKEYS_1.default.NVP_TRY_NEW_DOT, {
        selector: Onboarding_1.tryNewDotOnyxSelector,
        canBeMissing: true,
    }), tryNewDot = _e[0], tryNewDotMetadata = _e[1];
    var _f = tryNewDot !== null && tryNewDot !== void 0 ? tryNewDot : {}, isHybridAppOnboardingCompleted = _f.isHybridAppOnboardingCompleted, hasBeenAddedToNudgeMigration = _f.hasBeenAddedToNudgeMigration;
    var _g = (0, useOnyx_1.default)(ONYXKEYS_1.default.NVP_DISMISSED_PRODUCT_TRAINING, { canBeMissing: true }), dismissedProductTraining = _g[0], dismissedProductTrainingMetadata = _g[1];
    var _h = (0, useOnyx_1.default)(ONYXKEYS_1.default.HYBRID_APP, { selector: HybridApp_1.isSingleNewDotEntrySelector, canBeMissing: true }), isSingleNewDotEntry = _h[0], isSingleNewDotEntryMetadata = _h[1];
    var typeMenuSections = (0, useSearchTypeMenuSections_1.default)().typeMenuSections;
    var shouldShowRequire2FAPage = (0, react_1.useMemo)(function () { return (!!(account === null || account === void 0 ? void 0 : account.needsTwoFactorAuthSetup) && !(account === null || account === void 0 ? void 0 : account.requiresTwoFactorAuth)) || (!!(account === null || account === void 0 ? void 0 : account.twoFactorAuthSetupInProgress) && !(0, Onboarding_1.hasCompletedGuidedSetupFlowSelector)(onboardingValues)); }, [account === null || account === void 0 ? void 0 : account.needsTwoFactorAuthSetup, account === null || account === void 0 ? void 0 : account.requiresTwoFactorAuth, account === null || account === void 0 ? void 0 : account.twoFactorAuthSetupInProgress, onboardingValues]);
    (0, react_1.useEffect)(function () {
        // This should delay opening the onboarding modal so it does not interfere with the ongoing ReportScreen params changes
        // eslint-disable-next-line @typescript-eslint/no-deprecated
        react_native_1.InteractionManager.runAfterInteractions(function () {
            var _a, _b;
            // Prevent starting the onboarding flow if we are logging in as a new user with short lived token
            if ((currentUrl === null || currentUrl === void 0 ? void 0 : currentUrl.includes(ROUTES_1.default.TRANSITION_BETWEEN_APPS)) && isLoggingInAsNewSessionUser) {
                return;
            }
            if (isLoadingApp !== false || isOnboardingLoading) {
                return;
            }
            if ((0, isLoadingOnyxValue_1.default)(isOnboardingCompletedMetadata, tryNewDotMetadata, dismissedProductTrainingMetadata)) {
                return;
            }
            if (CONFIG_1.default.IS_HYBRID_APP && (0, isLoadingOnyxValue_1.default)(isSingleNewDotEntryMetadata)) {
                return;
            }
            if (currentUrl.endsWith('/r')) {
                // Don't trigger onboarding if we are in the middle of a redirect to a report
                return;
            }
            if (shouldShowRequire2FAPage) {
                if (started2FAFlowRef.current) {
                    startedOnboardingFlowRef.current = false;
                    return;
                }
                started2FAFlowRef.current = true;
                Navigation_1.default.navigate(ROUTES_1.default.REQUIRE_TWO_FACTOR_AUTH);
                return;
            }
            if (hasBeenAddedToNudgeMigration && !(0, TooltipUtils_1.default)('migratedUserWelcomeModal', dismissedProductTraining)) {
                var navigationState = Navigation_1.navigationRef.getRootState();
                var lastRoute = navigationState.routes.at(-1);
                // Prevent duplicate navigation if the migrated user modal is already shown.
                if ((lastRoute === null || lastRoute === void 0 ? void 0 : lastRoute.name) !== NAVIGATORS_1.default.MIGRATED_USER_MODAL_NAVIGATOR) {
                    var nonExploreTypeQuery = (_b = (_a = typeMenuSections.at(0)) === null || _a === void 0 ? void 0 : _a.menuItems.at(0)) === null || _b === void 0 ? void 0 : _b.searchQuery;
                    Navigation_1.default.navigate(ROUTES_1.default.SEARCH_ROOT.getRoute({ query: nonExploreTypeQuery !== null && nonExploreTypeQuery !== void 0 ? nonExploreTypeQuery : (0, SearchQueryUtils_1.buildCannedSearchQuery)() }));
                    Navigation_1.default.navigate(ROUTES_1.default.MIGRATED_USER_WELCOME_MODAL.getRoute(true));
                }
                return;
            }
            if (hasBeenAddedToNudgeMigration) {
                return;
            }
            var isOnboardingCompleted = (0, Onboarding_1.hasCompletedGuidedSetupFlowSelector)(onboardingValues) && (onboardingValues === null || onboardingValues === void 0 ? void 0 : onboardingValues.testDriveModalDismissed) !== false;
            if (CONFIG_1.default.IS_HYBRID_APP) {
                // For single entries, such as using the Travel feature from OldDot, we don't want to show onboarding
                if (isSingleNewDotEntry) {
                    return;
                }
                // When user is transitioning from OldDot to NewDot, we usually show the explanation modal
                if (isHybridAppOnboardingCompleted === false) {
                    Navigation_1.default.navigate(ROUTES_1.default.EXPLANATION_MODAL_ROOT);
                }
                // But if the hybrid app onboarding is completed, but NewDot onboarding is not completed, we start NewDot onboarding flow
                // This is a special case when user created an account from NewDot without finishing the onboarding flow and then logged in from OldDot
                if (isHybridAppOnboardingCompleted === true && isOnboardingCompleted === false && !startedOnboardingFlowRef.current) {
                    startedOnboardingFlowRef.current = true;
                    (0, OnboardingFlow_1.startOnboardingFlow)({
                        onboardingValuesParam: onboardingValues,
                        isUserFromPublicDomain: !!(account === null || account === void 0 ? void 0 : account.isFromPublicDomain),
                        hasAccessiblePolicies: !!(account === null || account === void 0 ? void 0 : account.hasAccessibleDomainPolicies),
                        currentOnboardingCompanySize: currentOnboardingCompanySize,
                        currentOnboardingPurposeSelected: currentOnboardingPurposeSelected,
                        onboardingInitialPath: onboardingInitialPath,
                        onboardingValues: onboardingValues,
                    });
                }
            }
            // If the user is not transitioning from OldDot to NewDot, we should start NewDot onboarding flow if it's not completed yet
            if (!CONFIG_1.default.IS_HYBRID_APP && isOnboardingCompleted === false && !startedOnboardingFlowRef.current) {
                startedOnboardingFlowRef.current = true;
                (0, OnboardingFlow_1.startOnboardingFlow)({
                    onboardingValuesParam: onboardingValues,
                    isUserFromPublicDomain: !!(account === null || account === void 0 ? void 0 : account.isFromPublicDomain),
                    hasAccessiblePolicies: !!(account === null || account === void 0 ? void 0 : account.hasAccessibleDomainPolicies),
                    currentOnboardingCompanySize: currentOnboardingCompanySize,
                    currentOnboardingPurposeSelected: currentOnboardingPurposeSelected,
                    onboardingInitialPath: onboardingInitialPath,
                    onboardingValues: onboardingValues,
                });
            }
        });
    }, [
        isLoadingApp,
        isHybridAppOnboardingCompleted,
        isOnboardingCompletedMetadata,
        tryNewDotMetadata,
        isSingleNewDotEntryMetadata,
        isSingleNewDotEntry,
        hasBeenAddedToNudgeMigration,
        dismissedProductTrainingMetadata,
        dismissedProductTraining === null || dismissedProductTraining === void 0 ? void 0 : dismissedProductTraining.migratedUserWelcomeModal,
        onboardingValues,
        dismissedProductTraining,
        account === null || account === void 0 ? void 0 : account.isFromPublicDomain,
        account === null || account === void 0 ? void 0 : account.hasAccessibleDomainPolicies,
        currentUrl,
        isLoggingInAsNewSessionUser,
        currentOnboardingCompanySize,
        currentOnboardingPurposeSelected,
        onboardingInitialPath,
        isOnboardingLoading,
        typeMenuSections,
        shouldShowRequire2FAPage,
    ]);
    return {
        isOnboardingCompleted: (0, Onboarding_1.hasCompletedGuidedSetupFlowSelector)(onboardingValues),
        isHybridAppOnboardingCompleted: isHybridAppOnboardingCompleted,
        shouldShowRequire2FAPage: shouldShowRequire2FAPage,
        isOnboardingLoading: !!(onboardingValues === null || onboardingValues === void 0 ? void 0 : onboardingValues.isLoading),
    };
}
exports.default = useOnboardingFlowRouter;
