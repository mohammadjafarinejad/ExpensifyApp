"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_native_1 = require("react-native");
var useEnvironment_1 = require("@hooks/useEnvironment");
var useHasLoggedIntoMobileApp_1 = require("@hooks/useHasLoggedIntoMobileApp");
var useHasPhoneNumberLogin_1 = require("@hooks/useHasPhoneNumberLogin");
var useLocalize_1 = require("@hooks/useLocalize");
var useTheme_1 = require("@hooks/useTheme");
var useThemeStyles_1 = require("@hooks/useThemeStyles");
var CONST_1 = require("@src/CONST");
var Url_1 = require("@src/libs/Url");
var ROUTES_1 = require("@src/ROUTES");
var Icon_1 = require("./Icon");
var Expensicons_1 = require("./Icon/Expensicons");
var RenderHTML_1 = require("./RenderHTML");
var Text_1 = require("./Text");
function ReceiptAlternativeMethods(_a) {
    var onLayout = _a.onLayout;
    var styles = (0, useThemeStyles_1.default)();
    var theme = (0, useTheme_1.default)();
    var environmentURL = (0, useEnvironment_1.default)().environmentURL;
    var translate = (0, useLocalize_1.default)().translate;
    var _b = (0, useHasLoggedIntoMobileApp_1.default)(), hasLoggedIntoMobileApp = _b.hasLoggedIntoMobileApp, isLastMobileAppLoginLoaded = _b.isLastMobileAppLoginLoaded;
    var _c = (0, useHasPhoneNumberLogin_1.default)(), hasPhoneNumberLogin = _c.hasPhoneNumberLogin, isPhoneNumberLoaded = _c.isPhoneNumberLoaded;
    var downloadAppHref = "".concat(environmentURL).concat((0, Url_1.addLeadingForwardSlash)(ROUTES_1.default.SETTINGS_APP_DOWNLOAD_LINKS));
    var contactMethodsHref = "".concat(environmentURL).concat((0, Url_1.addLeadingForwardSlash)(ROUTES_1.default.SETTINGS_CONTACT_METHODS.route));
    if (!isLastMobileAppLoginLoaded || !isPhoneNumberLoaded) {
        return null;
    }
    return (<react_native_1.View style={[styles.mt6, styles.mh5, styles.alignSelfStart, styles.alignItemsBaseline]} onLayout={onLayout}>
            <Text_1.default style={[styles.textMicroSupporting, styles.mb3]}>{translate('receipt.alternativeMethodsTitle')}</Text_1.default>

            {!hasLoggedIntoMobileApp && (<react_native_1.View style={[styles.flexRow, styles.alignItemsCenter, styles.mb3]}>
                    <react_native_1.View style={[styles.mr3]}>
                        <Icon_1.default src={Expensicons_1.Download} width={16} height={16} fill={theme.icon}/>
                    </react_native_1.View>
                    <react_native_1.View style={[styles.flex1]}>
                        <RenderHTML_1.default html={translate('receipt.alternativeMethodsDownloadApp', { downloadUrl: downloadAppHref })}/>
                    </react_native_1.View>
                </react_native_1.View>)}

            <react_native_1.View style={[styles.flexRow, styles.alignItemsCenter, styles.mb3]}>
                <react_native_1.View style={[styles.mr3]}>
                    <Icon_1.default src={Expensicons_1.Mail} width={16} height={16} fill={theme.icon}/>
                </react_native_1.View>
                <react_native_1.View style={[styles.flex1]}>
                    <RenderHTML_1.default html={translate('receipt.alternativeMethodsForwardReceipts', { email: CONST_1.default.EMAIL.RECEIPTS })}/>
                </react_native_1.View>
            </react_native_1.View>

            {!hasPhoneNumberLogin && (<react_native_1.View style={[styles.flexRow, styles.alignItemsCenter, styles.mb0]}>
                    <react_native_1.View style={[styles.mr3]}>
                        <Icon_1.default src={Expensicons_1.ChatBubbles} width={16} height={16} fill={theme.icon}/>
                    </react_native_1.View>
                    <react_native_1.View style={[styles.flex1]}>
                        <RenderHTML_1.default html={translate('receipt.alternativeMethodsAddPhoneNumber', { phoneNumber: CONST_1.default.SMS.RECEIPTS_PHONE_NUMBER, contactMethodsUrl: contactMethodsHref })}/>
                    </react_native_1.View>
                </react_native_1.View>)}

            {hasPhoneNumberLogin && (<react_native_1.View style={[styles.flexRow, styles.alignItemsCenter, styles.mb0]}>
                    <react_native_1.View style={[styles.mr3]}>
                        <Icon_1.default src={Expensicons_1.ChatBubbles} width={16} height={16} fill={theme.icon}/>
                    </react_native_1.View>
                    <react_native_1.View style={[styles.flex1]}>
                        <RenderHTML_1.default html={translate('receipt.alternativeMethodsTextReceipts', { phoneNumber: CONST_1.default.SMS.RECEIPTS_PHONE_NUMBER })}/>
                    </react_native_1.View>
                </react_native_1.View>)}
        </react_native_1.View>);
}
ReceiptAlternativeMethods.displayName = 'ReceiptAlternativeMethods';
exports.default = ReceiptAlternativeMethods;
