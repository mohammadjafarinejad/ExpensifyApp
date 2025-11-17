"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clearMiddlewares = clearMiddlewares;
exports.processWithMiddleware = processWithMiddleware;
exports.addMiddleware = addMiddleware;
var HttpUtils_1 = require("./HttpUtils");
var enhanceParameters_1 = require("./Network/enhanceParameters");
var NetworkStore_1 = require("./Network/NetworkStore");
var middlewares = [];
function makeXHR(request) {
    var _a;
    var finalParameters = (0, enhanceParameters_1.default)(request.command, (_a = request === null || request === void 0 ? void 0 : request.data) !== null && _a !== void 0 ? _a : {});
    return (0, NetworkStore_1.hasReadRequiredDataFromStorage)().then(function () {
        return HttpUtils_1.default.xhr(request.command, finalParameters, request.type, request.shouldUseSecure, request.initiatedOffline);
    });
}
function processWithMiddleware(request, isFromSequentialQueue) {
    if (isFromSequentialQueue === void 0) { isFromSequentialQueue = false; }
    return middlewares.reduce(function (last, middleware) { return middleware(last, request, isFromSequentialQueue); }, makeXHR(request));
}
function addMiddleware(middleware) {
    middlewares.push(middleware);
}
function clearMiddlewares() {
    middlewares = [];
}
