"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var GetStateForActionHandlers_1 = require("@libs/Navigation/AppNavigator/createRootStackNavigator/GetStateForActionHandlers");
var animation_1 = require("@libs/Navigation/PlatformStackNavigation/navigationOptions/animation");
/**
 * Ensures that workspace/domain split navigator pages open without the animation
 * when accessing them by selecting the Workspace tab in the navigation tab bar,
 * to make it look like a bottom tab navigation.
 */
function useNoAnimationWhenOpenedFromTabBar(navigation, routeKey) {
    (0, react_1.useEffect)(function () {
        var unsubscribe = navigation.addListener('transitionEnd', function () {
            // We want to call this function only once.
            unsubscribe();
            // If we open this screen from a different tab, then it won't have animation.
            if (!GetStateForActionHandlers_1.workspaceOrDomainSplitsWithoutEnteringAnimation.has(routeKey)) {
                return;
            }
            // We want to set animation after mounting so it will animate on going UP to the settings split.
            navigation.setOptions({ animation: animation_1.default.SLIDE_FROM_RIGHT });
        });
        return unsubscribe;
    }, [navigation, routeKey]);
}
exports.default = useNoAnimationWhenOpenedFromTabBar;
