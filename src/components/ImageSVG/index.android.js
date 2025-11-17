"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var expo_image_1 = require("expo-image");
var react_1 = require("react");
function ImageSVG(_a) {
    var src = _a.src, _b = _a.width, width = _b === void 0 ? '100%' : _b, _c = _a.height, height = _c === void 0 ? '100%' : _c, fill = _a.fill, _d = _a.contentFit, contentFit = _d === void 0 ? 'cover' : _d, style = _a.style, onLoadEnd = _a.onLoadEnd;
    var tintColorProp = fill ? { tintColor: fill } : {};
    var isReactComponent = typeof src === 'function';
    // Clear memory cache when unmounting images to avoid memory overload
    (0, react_1.useEffect)(function () {
        var clearMemoryCache = function () { return expo_image_1.Image.clearMemoryCache(); };
        return function () {
            clearMemoryCache();
        };
    }, []);
    // Call onLoadEnd immediately for React components since they don't have a loading state
    (0, react_1.useEffect)(function () {
        if (!isReactComponent) {
            return;
        }
        onLoadEnd === null || onLoadEnd === void 0 ? void 0 : onLoadEnd();
    }, [isReactComponent, onLoadEnd]);
    if (!src) {
        return null;
    }
    // Check if src is a React component (from dynamic loading) or a static image source
    if (isReactComponent) {
        // Handle React SVG components (from dynamic loading)
        var ImageSvgComponent = src;
        var additionalProps = {};
        if (fill) {
            additionalProps.fill = fill;
        }
        return (<ImageSvgComponent width={width} height={height} style={style} 
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...additionalProps}/>);
    }
    // Handle static image sources (traditional approach)
    return (<expo_image_1.Image onLoadEnd={onLoadEnd} 
    // Caching images to memory since some SVGs are being displayed with delay
    // See issue: https://github.com/Expensify/App/issues/34881
    cachePolicy="memory" contentFit={contentFit} source={src} style={[{ width: width, height: height }, style]} 
    // eslint-disable-next-line react/jsx-props-no-spreading
    {...tintColorProp}/>);
}
ImageSVG.displayName = 'ImageSVG';
exports.default = ImageSVG;
