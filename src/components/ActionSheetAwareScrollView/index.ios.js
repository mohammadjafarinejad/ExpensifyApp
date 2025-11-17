"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Actions = exports.ActionSheetAwareScrollViewProvider = exports.ActionSheetAwareScrollViewContext = exports.renderScrollComponent = void 0;
var react_1 = require("react");
var react_native_reanimated_1 = require("react-native-reanimated");
var ActionSheetAwareScrollViewContext_1 = require("./ActionSheetAwareScrollViewContext");
Object.defineProperty(exports, "Actions", { enumerable: true, get: function () { return ActionSheetAwareScrollViewContext_1.Actions; } });
Object.defineProperty(exports, "ActionSheetAwareScrollViewContext", { enumerable: true, get: function () { return ActionSheetAwareScrollViewContext_1.ActionSheetAwareScrollViewContext; } });
Object.defineProperty(exports, "ActionSheetAwareScrollViewProvider", { enumerable: true, get: function () { return ActionSheetAwareScrollViewContext_1.ActionSheetAwareScrollViewProvider; } });
var useActionSheetKeyboardSpacing_1 = require("./useActionSheetKeyboardSpacing");
var ActionSheetAwareScrollView = (0, react_1.forwardRef)(function (_a, ref) {
    var style = _a.style, children = _a.children, props = __rest(_a, ["style", "children"]);
    var scrollViewAnimatedRef = (0, react_native_reanimated_1.useAnimatedRef)();
    var onRef = (0, react_1.useCallback)(function (assignedRef) {
        if (typeof ref === 'function') {
            ref(assignedRef);
        }
        else if (ref) {
            // eslint-disable-next-line no-param-reassign
            ref.current = assignedRef;
        }
        scrollViewAnimatedRef(assignedRef);
    }, [ref, scrollViewAnimatedRef]);
    var spacing = (0, useActionSheetKeyboardSpacing_1.default)(scrollViewAnimatedRef);
    var animatedStyle = (0, react_native_reanimated_1.useAnimatedStyle)(function () { return ({
        paddingTop: spacing.get(),
    }); });
    return (<react_native_reanimated_1.default.ScrollView ref={onRef} 
    // eslint-disable-next-line react/jsx-props-no-spreading
    {...props} style={[style, animatedStyle]}>
            {children}
        </react_native_reanimated_1.default.ScrollView>);
});
exports.default = ActionSheetAwareScrollView;
/**
 * This function should be used as renderScrollComponent prop for FlatList
 * @param props - props that will be passed to the ScrollView from FlatList
 * @returns - ActionSheetAwareScrollView
 */
var renderScrollComponent = function (props) {
    // eslint-disable-next-line react/jsx-props-no-spreading
    return <ActionSheetAwareScrollView {...props}/>;
};
exports.renderScrollComponent = renderScrollComponent;
