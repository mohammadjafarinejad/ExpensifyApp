"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_native_view_shot_1 = require("react-native-view-shot");
/**
 * Native implementation of AvatarCapture using react-native-view-shot
 */
function AvatarCapture(_a, ref) {
    var children = _a.children, fileName = _a.fileName;
    var viewShotRef = (0, react_1.useRef)(null);
    (0, react_1.useImperativeHandle)(ref, function () { return ({
        capture: function () {
            var _a, _b, _c;
            return (_c = (_b = (_a = viewShotRef.current) === null || _a === void 0 ? void 0 : _a.capture) === null || _b === void 0 ? void 0 : _b.call(_a)) === null || _c === void 0 ? void 0 : _c.then(function (uri) {
                return ({
                    uri: uri,
                    name: "".concat(fileName, ".png"),
                    type: 'image/png',
                });
            });
        },
    }); }, [fileName]);
    return (<react_native_view_shot_1.default ref={viewShotRef} options={{ fileName: fileName, format: 'png' }}>
            {children}
        </react_native_view_shot_1.default>);
}
var AvatarCaptureWithRef = (0, react_1.forwardRef)(AvatarCapture);
AvatarCapture.displayName = 'AvatarCapture';
exports.default = AvatarCaptureWithRef;
