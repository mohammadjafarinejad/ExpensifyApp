"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = getSynchronizationErrorMessage;
var react_1 = require("react");
var Text_1 = require("@components/Text");
function getSynchronizationErrorMessage(receiptPartnerName, translate, styles) {
    return (<Text_1.default style={[styles === null || styles === void 0 ? void 0 : styles.formError]}>
            <Text_1.default style={[styles === null || styles === void 0 ? void 0 : styles.formError]}>{translate('workspace.common.authenticationError', { connectionName: receiptPartnerName })}</Text_1.default>
        </Text_1.default>);
}
