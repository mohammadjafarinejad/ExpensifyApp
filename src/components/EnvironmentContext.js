"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnvironmentContext = void 0;
exports.EnvironmentProvider = EnvironmentProvider;
var htmlparser2_1 = require("htmlparser2");
var react_1 = require("react");
var Environment_1 = require("@libs/Environment/Environment");
var getEnvironment_1 = require("@libs/Environment/getEnvironment");
var CONST_1 = require("@src/CONST");
var EnvironmentContext = (0, react_1.createContext)({
    environment: CONST_1.default.ENVIRONMENT.PRODUCTION,
    environmentURL: CONST_1.default.NEW_EXPENSIFY_URL,
    adjustExpensifyLinksForEnv: function () { return ''; },
});
exports.EnvironmentContext = EnvironmentContext;
function EnvironmentProvider(_a) {
    var children = _a.children;
    var _b = (0, react_1.useState)(CONST_1.default.ENVIRONMENT.PRODUCTION), environment = _b[0], setEnvironment = _b[1];
    var _c = (0, react_1.useState)(CONST_1.default.NEW_EXPENSIFY_URL), environmentURL = _c[0], setEnvironmentURL = _c[1];
    var environmentURLWithoutTrailingSlash = (0, react_1.useMemo)(function () { return [environmentURL.replace(/\/+$/, '')]; }, [environmentURL])[0];
    (0, react_1.useEffect)(function () {
        (0, getEnvironment_1.default)().then(setEnvironment);
        (0, Environment_1.getEnvironmentURL)().then(setEnvironmentURL);
    }, []);
    /**
     * Adjusts Expensify links in HTML content to use the current environment URL
     * instead of the production URL (new.expensify.com).
     */
    var adjustExpensifyLinksForEnv = (0, react_1.useCallback)(function (html) {
        var _a;
        if (!environmentURLWithoutTrailingSlash || !html) {
            return html;
        }
        try {
            var dom = (0, htmlparser2_1.parseDocument)(html);
            var anchorTags = htmlparser2_1.DomUtils.findAll(function (el) { var _a; return ((_a = el.name) === null || _a === void 0 ? void 0 : _a.toLowerCase()) === 'a'; }, dom);
            var adjustedHtml = html;
            for (var _i = 0, anchorTags_1 = anchorTags; _i < anchorTags_1.length; _i++) {
                var anchorTag = anchorTags_1[_i];
                var href = (_a = anchorTag.attribs) === null || _a === void 0 ? void 0 : _a.href;
                if (href === null || href === void 0 ? void 0 : href.startsWith('https://new.expensify.com')) {
                    var newHref = href.replace('https://new.expensify.com', environmentURLWithoutTrailingSlash);
                    var oldSnippet = "href=\"".concat(href, "\"");
                    var newSnippet = "href=\"".concat(newHref, "\"");
                    adjustedHtml = adjustedHtml.replace(oldSnippet, newSnippet);
                }
            }
            return adjustedHtml;
        }
        catch (_b) {
            return html;
        }
    }, [environmentURLWithoutTrailingSlash]);
    var contextValue = (0, react_1.useMemo)(function () { return ({
        environment: environment,
        environmentURL: environmentURL,
        adjustExpensifyLinksForEnv: adjustExpensifyLinksForEnv,
    }); }, [environment, environmentURL, adjustExpensifyLinksForEnv]);
    return <EnvironmentContext.Provider value={contextValue}>{children}</EnvironmentContext.Provider>;
}
EnvironmentProvider.displayName = 'EnvironmentProvider';
