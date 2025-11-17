"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var shouldRenderTransferOwnerButton_1 = require("@libs/shouldRenderTransferOwnerButton");
var CONST_1 = require("@src/CONST");
var shouldShowChangeWorkspaceOwnerPage = function (fundList, error) {
    return (0, shouldRenderTransferOwnerButton_1.default)(fundList) && error !== CONST_1.default.POLICY.OWNERSHIP_ERRORS.NO_BILLING_CARD;
};
exports.default = shouldShowChangeWorkspaceOwnerPage;
