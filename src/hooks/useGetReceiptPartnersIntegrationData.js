"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = useGetReceiptPartnersIntegrationData;
var react_1 = require("react");
var Expensicons = require("@components/Icon/Expensicons");
var CONST_1 = require("@src/CONST");
var useIsPolicyConnectedToUberReceiptPartner_1 = require("./useIsPolicyConnectedToUberReceiptPartner");
var useLocalize_1 = require("./useLocalize");
var usePolicy_1 = require("./usePolicy");
function useGetReceiptPartnersIntegrationData(policyID) {
    var _a;
    var policy = (0, usePolicy_1.default)(policyID);
    var translate = (0, useLocalize_1.default)().translate;
    var uber = (_a = policy === null || policy === void 0 ? void 0 : policy.receiptPartners) === null || _a === void 0 ? void 0 : _a.uber;
    var isUberConnected = (0, useIsPolicyConnectedToUberReceiptPartner_1.default)({ policyID: policyID });
    var shouldShowEnterCredentialsError = !!(uber === null || uber === void 0 ? void 0 : uber.error);
    var getReceiptPartnersIntegrationData = (0, react_1.useCallback)(function (receiptPartnerName) {
        var _a;
        switch (receiptPartnerName) {
            case CONST_1.default.POLICY.RECEIPT_PARTNERS.NAME.UBER: {
                return {
                    title: CONST_1.default.POLICY.RECEIPT_PARTNERS.NAME_USER_FRIENDLY[CONST_1.default.POLICY.RECEIPT_PARTNERS.NAME.UBER],
                    description: translate('workspace.receiptPartners.uber.subtitle', { organizationName: (_a = uber === null || uber === void 0 ? void 0 : uber.organizationName) !== null && _a !== void 0 ? _a : '' }),
                    icon: Expensicons.Uber,
                    errorFields: uber === null || uber === void 0 ? void 0 : uber.errorFields,
                    errors: uber === null || uber === void 0 ? void 0 : uber.errors,
                };
            }
            default:
                return undefined;
        }
    }, [translate, uber === null || uber === void 0 ? void 0 : uber.errorFields, uber === null || uber === void 0 ? void 0 : uber.errors, uber === null || uber === void 0 ? void 0 : uber.organizationName]);
    return { getReceiptPartnersIntegrationData: getReceiptPartnersIntegrationData, shouldShowEnterCredentialsError: shouldShowEnterCredentialsError, isUberConnected: isUberConnected };
}
