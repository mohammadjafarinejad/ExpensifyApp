"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KYCWallContext = void 0;
var react_1 = require("react");
var KYCWallContext = (0, react_1.createContext)({ current: null });
exports.KYCWallContext = KYCWallContext;
function KYCWallContextProvider(_a) {
    var children = _a.children;
    var kycWallRef = (0, react_1.useRef)(null);
    return <KYCWallContext.Provider value={kycWallRef}>{children}</KYCWallContext.Provider>;
}
exports.default = KYCWallContextProvider;
