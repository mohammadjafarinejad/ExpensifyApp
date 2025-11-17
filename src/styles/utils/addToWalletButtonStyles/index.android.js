"use strict";
// Styles to meet Google Wallet branding guidelines
// https://developers.google.com/wallet/generic/resources/brand-guidelines?hl=pl
Object.defineProperty(exports, "__esModule", { value: true });
var addToWalletButtonStyles = {
    width: 145,
    height: 44,
    // Scaling enables rounded corners and meets min height requirement
    transform: [{ scaleX: 1.25 }, { scaleY: 1.25 }],
};
exports.default = addToWalletButtonStyles;
