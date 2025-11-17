"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var PersonalDetails_1 = require("@userActions/PersonalDetails");
var useCurrentUserPersonalDetails_1 = require("./useCurrentUserPersonalDetails");
var useAutoUpdateTimezone = function () {
    var _a;
    var currentUserPersonalDetails = (0, useCurrentUserPersonalDetails_1.default)();
    var timezone = (_a = currentUserPersonalDetails === null || currentUserPersonalDetails === void 0 ? void 0 : currentUserPersonalDetails.timezone) !== null && _a !== void 0 ? _a : {};
    (0, react_1.useEffect)(function () {
        var currentTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        var hasValidCurrentTimezone = typeof currentTimezone === 'string' && currentTimezone.trim().length > 0;
        if (hasValidCurrentTimezone && (timezone === null || timezone === void 0 ? void 0 : timezone.automatic) && (timezone === null || timezone === void 0 ? void 0 : timezone.selected) !== currentTimezone) {
            (0, PersonalDetails_1.updateAutomaticTimezone)({
                automatic: true,
                selected: currentTimezone,
            }, currentUserPersonalDetails.accountID);
        }
        // eslint-disable-next-line react-compiler/react-compiler, react-hooks/exhaustive-deps
    }, [timezone === null || timezone === void 0 ? void 0 : timezone.automatic, timezone === null || timezone === void 0 ? void 0 : timezone.selected]);
};
exports.default = useAutoUpdateTimezone;
