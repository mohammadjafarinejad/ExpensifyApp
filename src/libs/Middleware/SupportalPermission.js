"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Log_1 = require("@libs/Log");
var NetworkStore_1 = require("@libs/Network/NetworkStore");
var App_1 = require("@userActions/App");
/**
 * Middleware that detects when a support token attempts an unauthorized command
 * and triggers a global modal while preventing retries for that request.
 */
var SupportalPermission = function (responsePromise, request) {
    return responsePromise.then(function (response) {
        var _a;
        var message = response === null || response === void 0 ? void 0 : response.message;
        var isUnauthorizedSupportalAction = (0, NetworkStore_1.isSupportAuthToken)() && (response === null || response === void 0 ? void 0 : response.jsonCode) === 411 && typeof message === 'string' && message.includes('You are not authorized to take this action when support logged in.');
        if (isUnauthorizedSupportalAction) {
            if (request === null || request === void 0 ? void 0 : request.data) {
                request.data.shouldRetry = false;
            }
            var command = (_a = request === null || request === void 0 ? void 0 : request.command) !== null && _a !== void 0 ? _a : 'unknown';
            Log_1.default.info('Supportal insufficient permissions; suppressing retry', false, { command: command });
            (0, App_1.showSupportalPermissionDenied)({
                command: command,
            });
        }
        return response;
    });
};
exports.default = SupportalPermission;
