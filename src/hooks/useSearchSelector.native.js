"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_native_1 = require("react-native");
var react_native_permissions_1 = require("react-native-permissions");
var useContactImport_1 = require("./useContactImport");
var useSearchSelector_base_1 = require("./useSearchSelector.base");
/**
 * Hook that combines search functionality with selection logic for option lists.
 * Leverages heap optimization for performance with large datasets.
 * Native version includes phone contacts integration.
 *
 * @param config - Configuration object for the hook
 * @returns Object with search and selection utilities
 */
function useSearchSelector(config) {
    var _a = config.enablePhoneContacts, enablePhoneContacts = _a === void 0 ? false : _a;
    // Phone contacts logic
    var _b = (0, useContactImport_1.default)(), contacts = _b.contacts, contactPermissionState = _b.contactPermissionState, importAndSaveContacts = _b.importAndSaveContacts, setContactPermissionState = _b.setContactPermissionState;
    var memoizedContacts = (0, react_1.useMemo)(function () { return (contacts.length ? contacts : []); }, [contacts]);
    var showImportContacts = enablePhoneContacts && !(contactPermissionState === react_native_permissions_1.RESULTS.GRANTED || contactPermissionState === react_native_permissions_1.RESULTS.LIMITED);
    var initiateContactImportAndSetState = (0, react_1.useCallback)(function () {
        setContactPermissionState(react_native_permissions_1.RESULTS.GRANTED);
        // eslint-disable-next-line @typescript-eslint/no-deprecated
        react_native_1.InteractionManager.runAfterInteractions(importAndSaveContacts);
    }, [importAndSaveContacts, setContactPermissionState]);
    // Use base hook with contact options
    var baseResult = (0, useSearchSelector_base_1.default)(__assign(__assign({}, config), { contactOptions: enablePhoneContacts ? memoizedContacts : undefined }));
    // Build contact state if enabled
    var contactState = enablePhoneContacts
        ? {
            permissionStatus: contactPermissionState,
            contactOptions: contacts,
            showImportUI: showImportContacts,
            importContacts: importAndSaveContacts,
            initiateContactImportAndSetState: initiateContactImportAndSetState,
            setContactPermissionState: setContactPermissionState,
        }
        : undefined;
    return __assign(__assign({}, baseResult), { contactState: contactState });
}
exports.default = useSearchSelector;
