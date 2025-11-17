"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_native_1 = require("react-native");
var useLocalize_1 = require("@hooks/useLocalize");
var useThemeStyles_1 = require("@hooks/useThemeStyles");
var Navigation_1 = require("@libs/Navigation/Navigation");
var CONST_1 = require("@src/CONST");
var ActivityIndicator_1 = require("./ActivityIndicator");
var Button_1 = require("./Button");
var Text_1 = require("./Text");
function FullScreenLoadingIndicator(_a) {
    var style = _a.style, _b = _a.iconSize, iconSize = _b === void 0 ? CONST_1.default.ACTIVITY_INDICATOR_SIZE.LARGE : _b, _c = _a.shouldUseGoBackButton, shouldUseGoBackButton = _c === void 0 ? false : _c, _d = _a.testID, testID = _d === void 0 ? '' : _d, extraLoadingContext = _a.extraLoadingContext;
    var styles = (0, useThemeStyles_1.default)();
    var translate = (0, useLocalize_1.default)().translate;
    var _e = (0, react_1.useState)(false), showGoBackButton = _e[0], setShowGoBackButton = _e[1];
    (0, react_1.useEffect)(function () {
        if (!shouldUseGoBackButton) {
            return;
        }
        var timeoutId = setTimeout(function () {
            setShowGoBackButton(true);
        }, CONST_1.default.TIMING.ACTIVITY_INDICATOR_TIMEOUT);
        return function () { return clearTimeout(timeoutId); };
    }, [shouldUseGoBackButton]);
    return (<react_native_1.View style={[react_native_1.StyleSheet.absoluteFillObject, styles.fullScreenLoading, styles.w100, style]}>
            <react_native_1.View style={styles.w100}>
                <ActivityIndicator_1.default size={iconSize} testID={testID} extraLoadingContext={extraLoadingContext}/>
                {showGoBackButton && shouldUseGoBackButton && (<react_native_1.View style={styles.loadingMessage}>
                        <react_native_1.View style={styles.pv4}>
                            <Text_1.default>{translate('common.thisIsTakingLongerThanExpected')}</Text_1.default>
                        </react_native_1.View>
                        <Button_1.default text={translate('common.goBack')} onPress={function () { return Navigation_1.default.goBack(); }}/>
                    </react_native_1.View>)}
            </react_native_1.View>
        </react_native_1.View>);
}
FullScreenLoadingIndicator.displayName = 'FullScreenLoadingIndicator';
exports.default = FullScreenLoadingIndicator;
