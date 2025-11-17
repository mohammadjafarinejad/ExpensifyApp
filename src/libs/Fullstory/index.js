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
var browser_1 = require("@fullstory/browser");
var expensify_common_1 = require("expensify-common");
var Session = require("@userActions/Session");
var CONST_1 = require("@src/CONST");
var getEnvironment_1 = require("@src/libs/Environment/getEnvironment");
var common_1 = require("./common");
// Placeholder Browser API does not support Manual Page definition
var FSPage = /** @class */ (function () {
    function FSPage() {
    }
    FSPage.prototype.start = function () { };
    return FSPage;
}());
var FS = {
    Page: FSPage,
    getChatFSClass: common_1.default,
    init: function () { },
    onReady: function () {
        return new Promise(function (resolve) {
            if (!(0, browser_1.isInitialized)()) {
                (0, browser_1.init)({ orgId: 'o-1WN56P-na1' }, resolve);
                // FS init function might have a race condition with the head snippet. If the head snipped is loaded first,
                // then the init function will not call the resolve function, and we'll never identify the user logging in,
                // and we need to call resolve manually. We're adding a 1s timeout to make sure the init function has enough
                // time to call the resolve function in case it ran successfully.
                setTimeout(resolve, 1000);
            }
            else {
                (0, browser_1.FullStory)(CONST_1.default.FULLSTORY.OPERATION.OBSERVE, { type: 'start', callback: resolve });
            }
        });
    },
    consent: function (shouldConsent) { return (0, browser_1.FullStory)(CONST_1.default.FULLSTORY.OPERATION.SET_IDENTITY, { consent: shouldConsent }); },
    identify: function (userMetadata) {
        /**
         * Sets the FullStory user identity based on the provided metadata information.
         * If the metadata does not contain an email, the user identity is anonymized.
         * If the metadata contains an accountID, the user identity is defined with it.
         */
        (0, browser_1.FullStory)(CONST_1.default.FULLSTORY.OPERATION.SET_IDENTITY, {
            uid: String(userMetadata.accountID),
            properties: userMetadata,
        });
    },
    consentAndIdentify: function (userMetadata) {
        // On the first subscribe for UserMetadata, this function will be called. We need
        // to confirm that we actually have any value here before proceeding.
        if (!(userMetadata === null || userMetadata === void 0 ? void 0 : userMetadata.accountID)) {
            return;
        }
        try {
            (0, getEnvironment_1.default)().then(function (envName) {
                var _a;
                var isTestEmail = userMetadata.email !== undefined && userMetadata.email.startsWith('fullstory') && userMetadata.email.endsWith(CONST_1.default.EMAIL.QA_DOMAIN);
                if ((CONST_1.default.ENVIRONMENT.PRODUCTION !== envName && !isTestEmail) ||
                    expensify_common_1.Str.extractEmailDomain((_a = userMetadata.email) !== null && _a !== void 0 ? _a : '') === CONST_1.default.EXPENSIFY_PARTNER_NAME ||
                    Session.isSupportAuthToken()) {
                    // On web, if we started FS at some point in a browser, it will run forever. So let's shut it down if we don't want it to run.
                    if ((0, browser_1.isInitialized)()) {
                        (0, browser_1.FullStory)(CONST_1.default.FULLSTORY.OPERATION.SHUTDOWN);
                    }
                    return;
                }
                // If Fullstory was already initialized, we might have shutdown the session. So let's
                // restart it before identifying the user.
                if ((0, browser_1.isInitialized)()) {
                    (0, browser_1.FullStory)(CONST_1.default.FULLSTORY.OPERATION.RESTART);
                }
                FS.onReady().then(function () {
                    FS.consent(true);
                    var localMetadata = userMetadata;
                    localMetadata.environment = envName;
                    FS.identify(localMetadata);
                });
            });
        }
        catch (e) {
            // error handler
        }
    },
    anonymize: function () { return (0, browser_1.FullStory)(CONST_1.default.FULLSTORY.OPERATION.SET_IDENTITY, { anonymous: true }); },
    getSessionId: function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            if (!(0, browser_1.isInitialized)()) {
                return [2 /*return*/];
            }
            return [2 /*return*/, (0, browser_1.FullStory)('getSessionAsync', { format: 'id' })];
        });
    }); },
};
exports.default = FS;
