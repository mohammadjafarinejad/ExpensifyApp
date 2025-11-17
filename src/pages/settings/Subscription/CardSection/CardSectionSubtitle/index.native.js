"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getSectionSubtitle(_a) {
    var translate = _a.translate, hasDefaultCard = _a.hasDefaultCard, nextPaymentDate = _a.nextPaymentDate;
    if (hasDefaultCard && nextPaymentDate) {
        return translate('subscription.cardSection.cardNextPayment', { nextPaymentDate: nextPaymentDate });
    }
    return translate('subscription.mobileReducedFunctionalityMessage');
}
exports.default = getSectionSubtitle;
