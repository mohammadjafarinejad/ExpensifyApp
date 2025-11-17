"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_native_1 = require("react-native");
var react_native_svg_1 = require("react-native-svg");
var useResponsiveLayout_1 = require("@hooks/useResponsiveLayout");
var useThemeStyles_1 = require("@hooks/useThemeStyles");
var useWindowDimensions_1 = require("@hooks/useWindowDimensions");
var variables_1 = require("@styles/variables");
var CONST_1 = require("@src/CONST");
var ItemListSkeletonView_1 = require("./ItemListSkeletonView");
var barHeight = 8;
var longBarWidth = 120;
var leftPaneWidth = variables_1.default.sideBarWithLHBWidth + variables_1.default.navigationTabBarSize;
// 12 is the gap between the element and the right button
var gapWidth = 12;
// 80 is the width of the element itself
var rightSideElementWidth = 80;
// 24 is the padding of the central pane summing two sides
var centralPanePadding = 40;
// 80 is the width of the button on the right side
var rightButtonWidth = 80;
function SearchRowSkeleton(_a) {
    var _b = _a.shouldAnimate, shouldAnimate = _b === void 0 ? true : _b, fixedNumItems = _a.fixedNumItems, _c = _a.gradientOpacityEnabled, gradientOpacityEnabled = _c === void 0 ? false : _c, containerStyle = _a.containerStyle;
    var styles = (0, useThemeStyles_1.default)();
    var windowWidth = (0, useWindowDimensions_1.default)().windowWidth;
    var _d = (0, useResponsiveLayout_1.default)(), shouldUseNarrowLayout = _d.shouldUseNarrowLayout, isLargeScreenWidth = _d.isLargeScreenWidth;
    if (shouldUseNarrowLayout) {
        return (<react_native_1.View style={[styles.flex1, containerStyle]}>
                <ItemListSkeletonView_1.default itemViewHeight={CONST_1.default.SEARCH_SKELETON_VIEW_ITEM_HEIGHT_SMALL} itemViewStyle={[styles.highlightBG, styles.mb2, styles.br3, styles.ml5]} gradientOpacityEnabled={gradientOpacityEnabled} shouldAnimate={shouldAnimate} fixedNumItems={fixedNumItems} renderSkeletonItem={function () { return (<>
                            <react_native_svg_1.Circle cx={24} cy={22} r={6}/>

                            <react_native_svg_1.Rect width={40} height={4} transform={[{ translateX: 40 }, { translateY: 20 }]}/>
                            <react_native_svg_1.Circle cx={96} cy={22} r={6}/>

                            <react_native_svg_1.Rect width={40} height={4} transform={[{ translateX: 112 }, { translateY: 20 }]}/>
                            <react_native_svg_1.Rect transform={[{ translateX: windowWidth - 122 }, { translateY: 8 }]} width={72} height={20} rx={10} ry={14}/>

                            <react_native_svg_1.Rect transform={[{ translateX: 16 }, { translateY: 44 }]} width={36} height={40} rx={4} ry={4}/>
                            <react_native_svg_1.Rect transform={[{ translateX: 64 }, { translateY: 53 }]} width={124} height={8}/>
                            <react_native_svg_1.Rect transform={[{ translateX: 64 }, { translateY: 67 }]} width={60} height={8}/>
                            <react_native_svg_1.Rect transform={[{ translateX: windowWidth - 130 }, { translateY: 53 }]} width={80} height={8}/>
                            <react_native_svg_1.Rect transform={[{ translateX: windowWidth - 110 }, { translateY: 67 }]} width={60} height={8}/>
                        </>); }}/>
            </react_native_1.View>);
    }
    return (<react_native_1.View style={[styles.flex1, containerStyle]}>
            <ItemListSkeletonView_1.default shouldAnimate={shouldAnimate} fixedNumItems={fixedNumItems} gradientOpacityEnabled={gradientOpacityEnabled} itemViewStyle={[styles.highlightBG, styles.mb2, styles.br3, styles.ml5]} renderSkeletonItem={function () { return (<>
                        <react_native_svg_1.Rect transform={[{ translateX: 12 }, { translateY: 12 }]} rx={5} ry={5} width={36} height={40}/>
                        <react_native_svg_1.Rect transform={[{ translateX: 60 }, { translateY: 28 }]} width={30} height={barHeight}/>
                        <react_native_svg_1.Rect transform={[{ translateX: 102 }, { translateY: 28 }]} width={longBarWidth} height={barHeight}/>
                        {isLargeScreenWidth && (<>
                                <react_native_svg_1.Rect transform={[{ translateX: 234 }, { translateY: 28 }]} width={longBarWidth} height={barHeight}/>

                                <react_native_svg_1.Rect transform={[{ translateX: 366 }, { translateY: 28 }]} width={60} height={barHeight}/>
                            </>)}

                        <react_native_svg_1.Rect 
        // We have to calculate this value to make sure the element is aligned to the button on the right side.
        transform={[{ translateX: windowWidth - leftPaneWidth - rightButtonWidth - gapWidth - centralPanePadding - gapWidth - rightSideElementWidth }, { translateY: 28 }]} width={80} height={barHeight}/>

                        <react_native_svg_1.Rect 
        // We have to calculate this value to make sure the element is aligned to the right border.
        transform={[{ translateX: windowWidth - leftPaneWidth - rightSideElementWidth - gapWidth - centralPanePadding }, { translateY: 18 }]} rx={15} ry={15} width={80} height={28}/>
                    </>); }}/>
        </react_native_1.View>);
}
SearchRowSkeleton.displayName = 'SearchRowSkeleton';
exports.default = SearchRowSkeleton;
