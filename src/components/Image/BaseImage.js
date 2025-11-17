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
var react_1 = require("react");
var react_native_1 = require("react-native");
var AttachmentStateContextProvider_1 = require("@pages/media/AttachmentModalScreen/AttachmentModalBaseContent/AttachmentStateContextProvider");
function BaseImage(_a) {
    var onLoad = _a.onLoad, source = _a.source, props = __rest(_a, ["onLoad", "source"]);
    var setAttachmentLoaded = (0, react_1.useContext)(AttachmentStateContextProvider_1.AttachmentStateContext).setAttachmentLoaded;
    (0, react_1.useEffect)(function () {
        setAttachmentLoaded === null || setAttachmentLoaded === void 0 ? void 0 : setAttachmentLoaded(source, false);
        // eslint-disable-next-line react-compiler/react-compiler
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    var imageLoadedSuccessfully = (0, react_1.useCallback)(function (event) {
        setAttachmentLoaded === null || setAttachmentLoaded === void 0 ? void 0 : setAttachmentLoaded(source, true);
        if (!onLoad) {
            return;
        }
        // We override `onLoad`, so both web and native have the same signature
        var _a = event.nativeEvent.source, width = _a.width, height = _a.height;
        onLoad({ nativeEvent: { width: width, height: height } });
    }, [onLoad, source, setAttachmentLoaded]);
    return (<react_native_1.Image 
    // Only subscribe to onLoad when a handler is provided to avoid unnecessary event registrations, optimizing performance.
    onLoad={onLoad ? imageLoadedSuccessfully : undefined} source={source} 
    // eslint-disable-next-line react/jsx-props-no-spreading
    {...props}/>);
}
BaseImage.displayName = 'BaseImage';
exports.default = BaseImage;
