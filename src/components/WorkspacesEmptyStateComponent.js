"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var useLocalize_1 = require("@hooks/useLocalize");
var usePreferredPolicy_1 = require("@hooks/usePreferredPolicy");
var useStyleUtils_1 = require("@hooks/useStyleUtils");
var useThemeStyles_1 = require("@hooks/useThemeStyles");
var interceptAnonymousUser_1 = require("@libs/interceptAnonymousUser");
var Navigation_1 = require("@libs/Navigation/Navigation");
var colors_1 = require("@styles/theme/colors");
var variables_1 = require("@styles/variables");
var CONST_1 = require("@src/CONST");
var ROUTES_1 = require("@src/ROUTES");
var EmptyStateComponent_1 = require("./EmptyStateComponent");
var LottieAnimations_1 = require("./LottieAnimations");
var WorkspaceRowSkeleton_1 = require("./Skeletons/WorkspaceRowSkeleton");
function WorkspacesEmptyStateComponent() {
    var styles = (0, useThemeStyles_1.default)();
    var translate = (0, useLocalize_1.default)().translate;
    var StyleUtils = (0, useStyleUtils_1.default)();
    var isRestrictedPolicyCreation = (0, usePreferredPolicy_1.default)().isRestrictedPolicyCreation;
    return (<EmptyStateComponent_1.default SkeletonComponent={WorkspaceRowSkeleton_1.default} headerMediaType={CONST_1.default.EMPTY_STATE_MEDIA.ANIMATION} headerMedia={LottieAnimations_1.default.WorkspacePlanet} title={translate('workspace.emptyWorkspace.title')} subtitle={translate('workspace.emptyWorkspace.subtitle')} titleStyles={styles.pt2} headerStyles={[styles.overflowHidden, StyleUtils.getBackgroundColorStyle(colors_1.default.pink800), StyleUtils.getHeight(variables_1.default.sectionIllustrationHeight)]} lottieWebViewStyles={styles.emptyWorkspaceListIllustrationStyle} headerContentStyles={styles.emptyWorkspaceListIllustrationStyle} buttons={isRestrictedPolicyCreation
            ? []
            : [
                {
                    success: true,
                    buttonAction: function () { return (0, interceptAnonymousUser_1.default)(function () { return Navigation_1.default.navigate(ROUTES_1.default.WORKSPACE_CONFIRMATION.getRoute(ROUTES_1.default.WORKSPACES_LIST.route)); }); },
                    buttonText: translate('workspace.new.newWorkspace'),
                },
            ]}/>);
}
WorkspacesEmptyStateComponent.displayName = 'WorkspacesEmptyStateComponent';
exports.default = WorkspacesEmptyStateComponent;
