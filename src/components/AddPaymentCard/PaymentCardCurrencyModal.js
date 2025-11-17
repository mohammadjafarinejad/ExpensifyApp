"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var HeaderWithBackButton_1 = require("@components/HeaderWithBackButton");
var Modal_1 = require("@components/Modal");
var ScreenWrapper_1 = require("@components/ScreenWrapper");
var SelectionList_1 = require("@components/SelectionList");
var RadioListItem_1 = require("@components/SelectionList/ListItem/RadioListItem");
var useLocalize_1 = require("@hooks/useLocalize");
var useThemeStyles_1 = require("@hooks/useThemeStyles");
var Navigation_1 = require("@libs/Navigation/Navigation");
var CONST_1 = require("@src/CONST");
function PaymentCardCurrencyModal(_a) {
    var isVisible = _a.isVisible, currencies = _a.currencies, _b = _a.currentCurrency, currentCurrency = _b === void 0 ? CONST_1.default.PAYMENT_CARD_CURRENCY.USD : _b, onCurrencyChange = _a.onCurrencyChange, onClose = _a.onClose;
    var styles = (0, useThemeStyles_1.default)();
    var translate = (0, useLocalize_1.default)().translate;
    var currencyOptions = (0, react_1.useMemo)(function () {
        return currencies.map(function (currency) { return ({
            text: currency,
            value: currency,
            keyForList: currency,
            isSelected: currency === currentCurrency,
        }); }, []);
    }, [currencies, currentCurrency]);
    return (<Modal_1.default type={CONST_1.default.MODAL.MODAL_TYPE.RIGHT_DOCKED} isVisible={isVisible} onClose={onClose} onModalHide={onClose} onBackdropPress={function () {
            onClose();
            Navigation_1.default.dismissModal();
        }}>
            <ScreenWrapper_1.default style={styles.pb0} includePaddingTop={false} includeSafeAreaPaddingBottom={false} testID={PaymentCardCurrencyModal.displayName}>
                <HeaderWithBackButton_1.default title={translate('common.currency')} onBackButtonPress={onClose}/>
                <SelectionList_1.default data={currencyOptions} ListItem={RadioListItem_1.default} onSelectRow={function (option) {
            onCurrencyChange(option.value);
        }} initiallyFocusedItemKey={currentCurrency} showScrollIndicator/>
            </ScreenWrapper_1.default>
        </Modal_1.default>);
}
PaymentCardCurrencyModal.displayName = 'PaymentCardCurrencyModal';
exports.default = PaymentCardCurrencyModal;
