"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var getCurrentPosition_types_1 = require("./getCurrentPosition.types");
var locationPermission_1 = require("./locationPermission");
var makeError = function (code, message) { return ({
    code: code,
    message: message,
    PERMISSION_DENIED: getCurrentPosition_types_1.GeolocationErrorCode.PERMISSION_DENIED,
    POSITION_UNAVAILABLE: getCurrentPosition_types_1.GeolocationErrorCode.POSITION_UNAVAILABLE,
    TIMEOUT: getCurrentPosition_types_1.GeolocationErrorCode.TIMEOUT,
    NOT_SUPPORTED: getCurrentPosition_types_1.GeolocationErrorCode.NOT_SUPPORTED,
}); };
var isLocationPermissionState = function (status) {
    return typeof status === 'string' && Object.values(locationPermission_1.LOCATION_PERMISSION_STATES).includes(status);
};
var getCurrentPosition = function (success, error, options) {
    var _a;
    var doGeoRequest = function () {
        try {
            navigator.geolocation.getCurrentPosition(success, error, options);
        }
        catch (caughtError) {
            var reason = 'Geolocation call failed';
            if (caughtError instanceof Error) {
                reason = caughtError.message;
            }
            else if (typeof caughtError === 'string') {
                reason = caughtError;
            }
            error(makeError(getCurrentPosition_types_1.GeolocationErrorCode.POSITION_UNAVAILABLE, reason));
        }
    };
    // IPC-based permission checking
    if (typeof window !== 'undefined' && ((_a = window.electron) === null || _a === void 0 ? void 0 : _a.invoke)) {
        window.electron
            .invoke('check-location-permission')
            .then(function (permissionStatus) {
            if (!isLocationPermissionState(permissionStatus)) {
                error(makeError(getCurrentPosition_types_1.GeolocationErrorCode.PERMISSION_DENIED, 'Unable to verify location permissions. Enable location access and try again.'));
                return;
            }
            if (permissionStatus === locationPermission_1.LOCATION_PERMISSION_STATES.DENIED) {
                error(makeError(getCurrentPosition_types_1.GeolocationErrorCode.PERMISSION_DENIED, 'Location access denied. Enable location permissions in system settings.'));
                return;
            }
            doGeoRequest();
        })
            .catch(function () {
            error(makeError(getCurrentPosition_types_1.GeolocationErrorCode.PERMISSION_DENIED, 'Unable to verify location permissions. Enable location access and try again.'));
        });
        return; // handled via IPC
    }
    doGeoRequest(); // Fallback to direct geolocation
};
exports.default = getCurrentPosition;
