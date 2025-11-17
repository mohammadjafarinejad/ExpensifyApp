"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_native_1 = require("@testing-library/react-native");
var react_1 = require("react");
var react_native_onyx_1 = require("react-native-onyx");
var ComposeProviders_1 = require("@components/ComposeProviders");
var ContactMethodsPage_1 = require("@pages/settings/Profile/Contacts/ContactMethodsPage");
var DelegateNoAccessModalProvider_1 = require("@src/components/DelegateNoAccessModalProvider");
var LockedAccountModalProvider_1 = require("@src/components/LockedAccountModalProvider");
var ONYXKEYS_1 = require("@src/ONYXKEYS");
var waitForBatchedUpdates_1 = require("../utils/waitForBatchedUpdates");
// Mock navigation used by the page
jest.mock('@libs/Navigation/Navigation', function () { return ({
    navigate: jest.fn(),
    goBack: jest.fn(),
    getActiveRoute: jest.fn(function () { return ''; }),
}); });
// Mock RenderHTML component
jest.mock('@components/RenderHTML', function () {
    var ReactMock = require('react');
    var Text = require('react-native').Text;
    return function (_a) {
        var html = _a.html;
        var plainText = html.replace(/<[^>]*>/g, '');
        return ReactMock.createElement(Text, null, plainText);
    };
});
// Replace MenuItem with a simple test double that exposes props in the tree
jest.mock('@components/MenuItem', function () {
    var ReactMock = require('react');
    var Text = require('react-native').Text;
    return function (_a) {
        var title = _a.title, brickRoadIndicator = _a.brickRoadIndicator;
        return ReactMock.createElement(Text, { testID: "menu-".concat(String(title)) }, "".concat(brickRoadIndicator !== null && brickRoadIndicator !== void 0 ? brickRoadIndicator : 'none', "-brickRoadIndicator"));
    };
});
describe('ContactMethodsPage', function () {
    beforeAll(function () {
        react_native_onyx_1.default.init({
            keys: ONYXKEYS_1.default,
        });
    });
    beforeEach(function () {
        return react_native_onyx_1.default.clear();
    });
    function renderPage() {
        return (0, react_native_1.render)(<ComposeProviders_1.default components={[LockedAccountModalProvider_1.default, DelegateNoAccessModalProvider_1.default]}>
                {/* @ts-expect-error - route typing is not necessary for this test */}
                <ContactMethodsPage_1.default route={{ params: {} }}/>
            </ComposeProviders_1.default>);
    }
    it('sets error indicator when login has error fields', function () { return __awaiter(void 0, void 0, void 0, function () {
        var defaultEmail, otherEmail, node;
        var _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    defaultEmail = 'default@example.com';
                    otherEmail = 'other@example.com';
                    react_native_onyx_1.default.merge(ONYXKEYS_1.default.SESSION, { email: defaultEmail });
                    react_native_onyx_1.default.merge(ONYXKEYS_1.default.LOGIN_LIST, (_a = {},
                        _a[defaultEmail] = {
                            partnerUserID: defaultEmail,
                            validatedDate: '2024-01-01',
                        },
                        _a[otherEmail] = {
                            partnerUserID: otherEmail,
                            validatedDate: '',
                            errorFields: {
                                error: { field: 'dummy' },
                            },
                        },
                        _a));
                    return [4 /*yield*/, (0, waitForBatchedUpdates_1.default)()];
                case 1:
                    _c.sent();
                    renderPage();
                    node = react_native_1.screen.getByTestId("menu-".concat(defaultEmail));
                    // ContactMethodsPage doesn't set any BR for validated logins
                    expect(node).toHaveTextContent('none-brickRoadIndicator');
                    node = react_native_1.screen.getByTestId("menu-".concat(otherEmail));
                    // ContactMethodsPage sets brickRoadIndicator to 'error' when any errorFields are present
                    expect(node).toHaveTextContent('error-brickRoadIndicator');
                    // Verify that RBR disappears
                    react_native_onyx_1.default.merge(ONYXKEYS_1.default.LOGIN_LIST, (_b = {},
                        _b[otherEmail] = {
                            partnerUserID: otherEmail,
                            validatedDate: '2024-02-02',
                            errorFields: null,
                        },
                        _b));
                    return [4 /*yield*/, (0, react_native_1.waitFor)(function () {
                            node = react_native_1.screen.getByTestId("menu-".concat(otherEmail));
                            // ContactMethodsPage sets brickRoadIndicator to 'info' for non-default unvalidated logins
                            expect(node).toHaveTextContent('none-brickRoadIndicator');
                        })];
                case 2:
                    _c.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('sets info indicator when login is unvalidated and not default', function () { return __awaiter(void 0, void 0, void 0, function () {
        var defaultEmail, otherEmail, node;
        var _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    defaultEmail = 'default@example.com';
                    otherEmail = 'other@example.com';
                    react_native_onyx_1.default.merge(ONYXKEYS_1.default.SESSION, { email: defaultEmail });
                    react_native_onyx_1.default.merge(ONYXKEYS_1.default.LOGIN_LIST, (_a = {},
                        _a[defaultEmail] = {
                            partnerUserID: defaultEmail,
                            validatedDate: '2024-01-01',
                        },
                        _a[otherEmail] = {
                            partnerUserID: otherEmail,
                            validatedDate: '',
                        },
                        _a));
                    return [4 /*yield*/, (0, waitForBatchedUpdates_1.default)()];
                case 1:
                    _c.sent();
                    renderPage();
                    node = react_native_1.screen.getByTestId("menu-".concat(defaultEmail));
                    // ContactMethodsPage doesn't set any BR for validated logins
                    expect(node).toHaveTextContent('none-brickRoadIndicator');
                    node = react_native_1.screen.getByTestId("menu-".concat(otherEmail));
                    // ContactMethodsPage sets brickRoadIndicator to 'info' for non-default unvalidated logins
                    expect(node).toHaveTextContent('info-brickRoadIndicator');
                    // Verify that GBR disappears
                    react_native_onyx_1.default.merge(ONYXKEYS_1.default.LOGIN_LIST, (_b = {},
                        _b[otherEmail] = {
                            partnerUserID: otherEmail,
                            validatedDate: '2024-02-02',
                        },
                        _b));
                    return [4 /*yield*/, (0, react_native_1.waitFor)(function () {
                            node = react_native_1.screen.getByTestId("menu-".concat(otherEmail));
                            // ContactMethodsPage sets brickRoadIndicator to 'info' for non-default unvalidated logins
                            expect(node).toHaveTextContent('none-brickRoadIndicator');
                        })];
                case 2:
                    _c.sent();
                    return [2 /*return*/];
            }
        });
    }); });
});
