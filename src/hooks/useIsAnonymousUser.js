"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var CONST_1 = require("@src/CONST");
var ONYXKEYS_1 = require("@src/ONYXKEYS");
var useOnyx_1 = require("./useOnyx");
/**
 * Hook to check if the current user is anonymous
 * Returns true if the user's auth token type is ANONYMOUS, false otherwise
 */
function useIsAnonymousUser() {
    var session = (0, useOnyx_1.default)(ONYXKEYS_1.default.SESSION, { canBeMissing: false })[0];
    var isAnonymousUser = (0, react_1.useMemo)(function () {
        return (session === null || session === void 0 ? void 0 : session.authTokenType) === CONST_1.default.AUTH_TOKEN_TYPES.ANONYMOUS;
    }, [session === null || session === void 0 ? void 0 : session.authTokenType]);
    return isAnonymousUser !== null && isAnonymousUser !== void 0 ? isAnonymousUser : false;
}
exports.default = useIsAnonymousUser;
