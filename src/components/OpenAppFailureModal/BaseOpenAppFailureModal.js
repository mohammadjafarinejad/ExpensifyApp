"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_native_1 = require("react-native");
var Button_1 = require("@components/Button");
var Header_1 = require("@components/Header");
var Modal_1 = require("@components/Modal");
var Text_1 = require("@components/Text");
var TextLink_1 = require("@components/TextLink");
var useLocalize_1 = require("@hooks/useLocalize");
var useOnyx_1 = require("@hooks/useOnyx");
var useResponsiveLayout_1 = require("@hooks/useResponsiveLayout");
var useThemeStyles_1 = require("@hooks/useThemeStyles");
var isOpenAppFailureModalOpen_1 = require("@libs/actions/isOpenAppFailureModalOpen");
var CONST_1 = require("@src/CONST");
var ONYXKEYS_1 = require("@src/ONYXKEYS");
function BaseOpenAppFailureModal(_a) {
    var onRefreshAndTryAgainButtonPress = _a.onRefreshAndTryAgainButtonPress;
    var _b = (0, useOnyx_1.default)(ONYXKEYS_1.default.IS_OPEN_APP_FAILURE_MODAL_OPEN, { canBeMissing: true })[0], isOpenAppFailureModalOpen = _b === void 0 ? false : _b;
    var styles = (0, useThemeStyles_1.default)();
    var translate = (0, useLocalize_1.default)().translate;
    // We need to use isSmallScreenWidth instead of shouldUseNarrowLayout to be consistent with BaseModal component
    // eslint-disable-next-line rulesdir/prefer-shouldUseNarrowLayout-instead-of-isSmallScreenWidth
    var isSmallScreenWidth = (0, useResponsiveLayout_1.default)().isSmallScreenWidth;
    return (<Modal_1.default type={isSmallScreenWidth ? CONST_1.default.MODAL.MODAL_TYPE.BOTTOM_DOCKED : CONST_1.default.MODAL.MODAL_TYPE.CONFIRM} isVisible={isOpenAppFailureModalOpen} innerContainerStyle={styles.pv0} onClose={function () { return (0, isOpenAppFailureModalOpen_1.setIsOpenAppFailureModalOpen)(false); }}>
            <react_native_1.View style={[styles.p6]}>
                <Header_1.default title={translate('openAppFailureModal.title')} textStyles={[styles.mb2]}/>
                <Text_1.default style={[styles.mb6]}>
                    {"".concat(translate('openAppFailureModal.subtitle'), " ")}
                    <TextLink_1.default href={"mailto:".concat(CONST_1.default.EMAIL.CONCIERGE)} style={[styles.link]}>
                        {CONST_1.default.EMAIL.CONCIERGE}
                    </TextLink_1.default>
                </Text_1.default>
                <Button_1.default large success style={[styles.mb3]} text={translate('openAppFailureModal.refreshAndTryAgain')} onPress={onRefreshAndTryAgainButtonPress}/>
                <Button_1.default large text={translate('common.close')} onPress={function () { return (0, isOpenAppFailureModalOpen_1.setIsOpenAppFailureModalOpen)(false); }}/>
            </react_native_1.View>
        </Modal_1.default>);
}
BaseOpenAppFailureModal.displayName = 'BaseOpenAppFailureModal';
exports.default = BaseOpenAppFailureModal;
