"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = afterPack;
var node_fs_1 = require("node:fs");
var node_path_1 = require("node:path");
var getAssetSuffix = function () {
    if (process.env.ELECTRON_ENV === 'adhoc') {
        return 'Adhoc';
    }
    if (process.env.ELECTRON_ENV === 'development') {
        return 'Dev';
    }
    if (process.env.ELECTRON_ENV === 'staging') {
        return 'Staging';
    }
    return '';
};
// This will copy Assets.car with MacOS Liquid Glass icon
// and will be removed after Electron builder supports this natively
function afterPack(context) {
    var _a;
    if (context.electronPlatformName !== 'darwin') {
        return Promise.resolve();
    }
    var appName = (_a = context === null || context === void 0 ? void 0 : context.packager) === null || _a === void 0 ? void 0 : _a.appInfo.productFilename;
    var appRoot = node_path_1.default.join(context.appOutDir, "".concat(appName, ".app"), 'Contents');
    var resourcesDir = node_path_1.default.join(appRoot, 'Resources');
    var assetSource = node_path_1.default.resolve(__dirname, "../Assets".concat(getAssetSuffix(), ".car"));
    return node_fs_1.promises.mkdir(resourcesDir, { recursive: true }).then(function () { return node_fs_1.promises.copyFile(assetSource, node_path_1.default.join(resourcesDir, 'Assets.car')); });
}
