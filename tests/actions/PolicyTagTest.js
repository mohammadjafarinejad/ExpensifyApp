"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var react_native_onyx_1 = require("react-native-onyx");
var OnyxUtils_1 = require("react-native-onyx/dist/OnyxUtils");
var OnyxListItemProvider_1 = require("@components/OnyxListItemProvider");
var useOnyx_1 = require("@hooks/useOnyx");
var usePolicyData_1 = require("@hooks/usePolicyData");
var OnyxUpdateManager_1 = require("@libs/actions/OnyxUpdateManager");
var Tag_1 = require("@libs/actions/Policy/Tag");
var CONST_1 = require("@src/CONST");
var ONYXKEYS_1 = require("@src/ONYXKEYS");
var policies_1 = require("../utils/collections/policies");
var policyTags_1 = require("../utils/collections/policyTags");
var TestHelper = require("../utils/TestHelper");
var waitForBatchedUpdates_1 = require("../utils/waitForBatchedUpdates");
(0, OnyxUpdateManager_1.default)();
describe('actions/Policy', function () {
    beforeAll(function () {
        react_native_onyx_1.default.init({
            keys: ONYXKEYS_1.default,
        });
    });
    var mockFetch;
    beforeEach(function () {
        global.fetch = TestHelper.getGlobalFetchMock();
        mockFetch = fetch;
        return react_native_onyx_1.default.clear().then(waitForBatchedUpdates_1.default);
    });
    describe('SetPolicyRequiresTag', function () {
        it('enable require tag', function () {
            var _a;
            var fakePolicy = (0, policies_1.default)(0);
            fakePolicy.requiresTag = false;
            (_a = mockFetch === null || mockFetch === void 0 ? void 0 : mockFetch.pause) === null || _a === void 0 ? void 0 : _a.call(mockFetch);
            return react_native_onyx_1.default.set("".concat(ONYXKEYS_1.default.COLLECTION.POLICY).concat(fakePolicy.id), fakePolicy)
                .then(function () {
                var policyData = (0, react_native_1.renderHook)(function () { return (0, usePolicyData_1.default)(fakePolicy.id); }, { wrapper: OnyxListItemProvider_1.default }).result;
                (0, Tag_1.setPolicyRequiresTag)(policyData.current, true);
                return (0, waitForBatchedUpdates_1.default)();
            })
                .then(function () {
                return new Promise(function (resolve) {
                    var connection = react_native_onyx_1.default.connect({
                        key: "".concat(ONYXKEYS_1.default.COLLECTION.POLICY).concat(fakePolicy.id),
                        waitForCollectionCallback: false,
                        callback: function (policy) {
                            var _a;
                            react_native_onyx_1.default.disconnect(connection);
                            // RequiresTag is enabled and pending
                            expect(policy === null || policy === void 0 ? void 0 : policy.requiresTag).toBeTruthy();
                            expect((_a = policy === null || policy === void 0 ? void 0 : policy.pendingFields) === null || _a === void 0 ? void 0 : _a.requiresTag).toBe(CONST_1.default.RED_BRICK_ROAD_PENDING_ACTION.UPDATE);
                            resolve();
                        },
                    });
                });
            })
                .then(mockFetch === null || mockFetch === void 0 ? void 0 : mockFetch.resume)
                .then(waitForBatchedUpdates_1.default)
                .then(function () {
                return new Promise(function (resolve) {
                    var connection = react_native_onyx_1.default.connect({
                        key: "".concat(ONYXKEYS_1.default.COLLECTION.POLICY).concat(fakePolicy.id),
                        waitForCollectionCallback: false,
                        callback: function (policy) {
                            var _a;
                            react_native_onyx_1.default.disconnect(connection);
                            expect((_a = policy === null || policy === void 0 ? void 0 : policy.pendingFields) === null || _a === void 0 ? void 0 : _a.requiresTag).toBeFalsy();
                            resolve();
                        },
                    });
                });
            });
        });
        it('disable require tag', function () {
            var _a;
            var fakePolicy = (0, policies_1.default)(0);
            fakePolicy.requiresTag = true;
            (_a = mockFetch === null || mockFetch === void 0 ? void 0 : mockFetch.pause) === null || _a === void 0 ? void 0 : _a.call(mockFetch);
            return react_native_onyx_1.default.set("".concat(ONYXKEYS_1.default.COLLECTION.POLICY).concat(fakePolicy.id), fakePolicy)
                .then(function () {
                var policyData = (0, react_native_1.renderHook)(function () { return (0, usePolicyData_1.default)(fakePolicy.id); }, { wrapper: OnyxListItemProvider_1.default }).result;
                (0, Tag_1.setPolicyRequiresTag)(policyData.current, false);
                return (0, waitForBatchedUpdates_1.default)();
            })
                .then(function () {
                return new Promise(function (resolve) {
                    var connection = react_native_onyx_1.default.connect({
                        key: "".concat(ONYXKEYS_1.default.COLLECTION.POLICY).concat(fakePolicy.id),
                        waitForCollectionCallback: false,
                        callback: function (policy) {
                            var _a;
                            react_native_onyx_1.default.disconnect(connection);
                            // RequiresTag is disabled and pending
                            expect(policy === null || policy === void 0 ? void 0 : policy.requiresTag).toBeFalsy();
                            expect((_a = policy === null || policy === void 0 ? void 0 : policy.pendingFields) === null || _a === void 0 ? void 0 : _a.requiresTag).toBe(CONST_1.default.RED_BRICK_ROAD_PENDING_ACTION.UPDATE);
                            resolve();
                        },
                    });
                });
            })
                .then(mockFetch === null || mockFetch === void 0 ? void 0 : mockFetch.resume)
                .then(waitForBatchedUpdates_1.default)
                .then(function () {
                return new Promise(function (resolve) {
                    var connection = react_native_onyx_1.default.connect({
                        key: "".concat(ONYXKEYS_1.default.COLLECTION.POLICY).concat(fakePolicy.id),
                        waitForCollectionCallback: false,
                        callback: function (policy) {
                            var _a;
                            react_native_onyx_1.default.disconnect(connection);
                            expect((_a = policy === null || policy === void 0 ? void 0 : policy.pendingFields) === null || _a === void 0 ? void 0 : _a.requiresTag).toBeFalsy();
                            resolve();
                        },
                    });
                });
            });
        });
        it('reset require tag when api returns an error', function () {
            var _a;
            var fakePolicy = (0, policies_1.default)(0);
            fakePolicy.requiresTag = true;
            (_a = mockFetch === null || mockFetch === void 0 ? void 0 : mockFetch.pause) === null || _a === void 0 ? void 0 : _a.call(mockFetch);
            return react_native_onyx_1.default.set("".concat(ONYXKEYS_1.default.COLLECTION.POLICY).concat(fakePolicy.id), fakePolicy)
                .then(function () {
                var _a;
                (_a = mockFetch === null || mockFetch === void 0 ? void 0 : mockFetch.fail) === null || _a === void 0 ? void 0 : _a.call(mockFetch);
                var policyData = (0, react_native_1.renderHook)(function () { return (0, usePolicyData_1.default)(fakePolicy.id); }, { wrapper: OnyxListItemProvider_1.default }).result;
                (0, Tag_1.setPolicyRequiresTag)(policyData.current, false);
                return (0, waitForBatchedUpdates_1.default)();
            })
                .then(mockFetch === null || mockFetch === void 0 ? void 0 : mockFetch.resume)
                .then(waitForBatchedUpdates_1.default)
                .then(function () {
                return new Promise(function (resolve) {
                    var connection = react_native_onyx_1.default.connect({
                        key: "".concat(ONYXKEYS_1.default.COLLECTION.POLICY).concat(fakePolicy.id),
                        waitForCollectionCallback: false,
                        callback: function (policy) {
                            var _a;
                            react_native_onyx_1.default.disconnect(connection);
                            expect((_a = policy === null || policy === void 0 ? void 0 : policy.pendingFields) === null || _a === void 0 ? void 0 : _a.requiresTag).toBeFalsy();
                            expect(policy === null || policy === void 0 ? void 0 : policy.errors).toBeTruthy();
                            expect(policy === null || policy === void 0 ? void 0 : policy.requiresTag).toBeTruthy();
                            resolve();
                        },
                    });
                });
            });
        });
        it('should update required field in policy tag list', function () { return __awaiter(void 0, void 0, void 0, function () {
            var fakePolicy, tagListName, fakePolicyTags, policyData, updatePolicyTags;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        fakePolicy = (0, policies_1.default)(0);
                        tagListName = 'Tag';
                        fakePolicy.requiresTag = false;
                        fakePolicyTags = (0, policyTags_1.default)(tagListName);
                        return [4 /*yield*/, react_native_onyx_1.default.set("".concat(ONYXKEYS_1.default.COLLECTION.POLICY).concat(fakePolicy.id), fakePolicy)];
                    case 1:
                        _b.sent();
                        return [4 /*yield*/, react_native_onyx_1.default.set("".concat(ONYXKEYS_1.default.COLLECTION.POLICY_TAGS).concat(fakePolicy.id), fakePolicyTags)];
                    case 2:
                        _b.sent();
                        policyData = (0, react_native_1.renderHook)(function () { return (0, usePolicyData_1.default)(fakePolicy.id); }, { wrapper: OnyxListItemProvider_1.default }).result;
                        (0, Tag_1.setPolicyRequiresTag)(policyData.current, true);
                        return [4 /*yield*/, (0, waitForBatchedUpdates_1.default)()];
                    case 3:
                        _b.sent();
                        return [4 /*yield*/, TestHelper.getOnyxData({
                                key: "".concat(ONYXKEYS_1.default.COLLECTION.POLICY_TAGS).concat(fakePolicy.id),
                                callback: function (val) { return (updatePolicyTags = val); },
                            })];
                    case 4:
                        _b.sent();
                        expect((_a = updatePolicyTags === null || updatePolicyTags === void 0 ? void 0 : updatePolicyTags[tagListName]) === null || _a === void 0 ? void 0 : _a.required).toBeTruthy();
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('renamePolicyTagList', function () {
        it('rename policy tag list', function () { return __awaiter(void 0, void 0, void 0, function () {
            var fakePolicy, oldTagListName, newTagListName, fakePolicyTags, policyTags;
            var _a, _b, _c, _d, _e, _f, _g, _h;
            return __generator(this, function (_j) {
                switch (_j.label) {
                    case 0:
                        fakePolicy = (0, policies_1.default)(0);
                        fakePolicy.areTagsEnabled = true;
                        oldTagListName = 'Old tag list name';
                        newTagListName = 'New tag list name';
                        fakePolicyTags = (0, policyTags_1.default)(oldTagListName);
                        (_a = mockFetch === null || mockFetch === void 0 ? void 0 : mockFetch.pause) === null || _a === void 0 ? void 0 : _a.call(mockFetch);
                        react_native_onyx_1.default.set("".concat(ONYXKEYS_1.default.COLLECTION.POLICY).concat(fakePolicy.id), fakePolicy);
                        react_native_onyx_1.default.set("".concat(ONYXKEYS_1.default.COLLECTION.POLICY_TAGS).concat(fakePolicy.id), fakePolicyTags);
                        (0, Tag_1.renamePolicyTagList)(fakePolicy.id, {
                            oldName: oldTagListName,
                            newName: newTagListName,
                        }, fakePolicyTags, (_c = (_b = Object.values(fakePolicyTags).at(0)) === null || _b === void 0 ? void 0 : _b.orderWeight) !== null && _c !== void 0 ? _c : 0);
                        return [4 /*yield*/, (0, waitForBatchedUpdates_1.default)()];
                    case 1:
                        _j.sent();
                        return [4 /*yield*/, OnyxUtils_1.default.get("".concat(ONYXKEYS_1.default.COLLECTION.POLICY_TAGS).concat(fakePolicy.id))];
                    case 2:
                        policyTags = _j.sent();
                        // Tag list name is updated and pending
                        expect(Object.keys((_d = policyTags === null || policyTags === void 0 ? void 0 : policyTags[oldTagListName]) !== null && _d !== void 0 ? _d : {}).length).toBe(0);
                        expect((_e = policyTags === null || policyTags === void 0 ? void 0 : policyTags[newTagListName]) === null || _e === void 0 ? void 0 : _e.name).toBe(newTagListName);
                        expect((_f = policyTags === null || policyTags === void 0 ? void 0 : policyTags[newTagListName]) === null || _f === void 0 ? void 0 : _f.pendingAction).toBe(CONST_1.default.RED_BRICK_ROAD_PENDING_ACTION.ADD);
                        mockFetch === null || mockFetch === void 0 ? void 0 : mockFetch.resume();
                        return [4 /*yield*/, (0, waitForBatchedUpdates_1.default)()];
                    case 3:
                        _j.sent();
                        return [4 /*yield*/, OnyxUtils_1.default.get("".concat(ONYXKEYS_1.default.COLLECTION.POLICY_TAGS).concat(fakePolicy.id))];
                    case 4:
                        policyTags = _j.sent();
                        expect((_g = policyTags === null || policyTags === void 0 ? void 0 : policyTags[newTagListName]) === null || _g === void 0 ? void 0 : _g.pendingAction).toBeFalsy();
                        expect(Object.keys((_h = policyTags === null || policyTags === void 0 ? void 0 : policyTags[oldTagListName]) !== null && _h !== void 0 ? _h : {}).length).toBe(0);
                        return [2 /*return*/];
                }
            });
        }); });
        it('reset the policy tag list name when api returns error', function () { return __awaiter(void 0, void 0, void 0, function () {
            var fakePolicy, oldTagListName, newTagListName, fakePolicyTags, policyTags;
            var _a, _b, _c, _d, _e;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0:
                        fakePolicy = (0, policies_1.default)(0);
                        fakePolicy.areTagsEnabled = true;
                        oldTagListName = 'Old tag list name';
                        newTagListName = 'New tag list name';
                        fakePolicyTags = (0, policyTags_1.default)(oldTagListName);
                        (_a = mockFetch === null || mockFetch === void 0 ? void 0 : mockFetch.pause) === null || _a === void 0 ? void 0 : _a.call(mockFetch);
                        react_native_onyx_1.default.set("".concat(ONYXKEYS_1.default.COLLECTION.POLICY).concat(fakePolicy.id), fakePolicy);
                        react_native_onyx_1.default.set("".concat(ONYXKEYS_1.default.COLLECTION.POLICY_TAGS).concat(fakePolicy.id), fakePolicyTags);
                        return [4 /*yield*/, (0, waitForBatchedUpdates_1.default)()];
                    case 1:
                        _f.sent();
                        (_b = mockFetch === null || mockFetch === void 0 ? void 0 : mockFetch.fail) === null || _b === void 0 ? void 0 : _b.call(mockFetch);
                        (0, Tag_1.renamePolicyTagList)(fakePolicy.id, {
                            oldName: oldTagListName,
                            newName: newTagListName,
                        }, fakePolicyTags, (_d = (_c = Object.values(fakePolicyTags).at(0)) === null || _c === void 0 ? void 0 : _c.orderWeight) !== null && _d !== void 0 ? _d : 0);
                        mockFetch === null || mockFetch === void 0 ? void 0 : mockFetch.resume();
                        return [4 /*yield*/, (0, waitForBatchedUpdates_1.default)()];
                    case 2:
                        _f.sent();
                        return [4 /*yield*/, OnyxUtils_1.default.get("".concat(ONYXKEYS_1.default.COLLECTION.POLICY_TAGS).concat(fakePolicy.id))];
                    case 3:
                        policyTags = _f.sent();
                        expect(policyTags === null || policyTags === void 0 ? void 0 : policyTags[newTagListName]).toBeFalsy();
                        expect(policyTags === null || policyTags === void 0 ? void 0 : policyTags[oldTagListName]).toBeTruthy();
                        expect((_e = policyTags === null || policyTags === void 0 ? void 0 : policyTags[oldTagListName]) === null || _e === void 0 ? void 0 : _e.errors).toBeTruthy();
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('CreatePolicyTag', function () {
        it('create new policy tag', function () { return __awaiter(void 0, void 0, void 0, function () {
            var fakePolicy, tagListName, newTagName, fakePolicyTags, policyTagsOptimistic, newTagOptimistic, policyTagsSuccess, newTagSuccess;
            var _a, _b, _c, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        fakePolicy = (0, policies_1.default)(0);
                        fakePolicy.areTagsEnabled = true;
                        tagListName = 'Fake tag';
                        newTagName = 'new tag';
                        fakePolicyTags = (0, policyTags_1.default)(tagListName);
                        mockFetch.pause();
                        return [4 /*yield*/, (0, waitForBatchedUpdates_1.default)()];
                    case 1:
                        _e.sent();
                        // When creating a new tag
                        (0, Tag_1.createPolicyTag)(fakePolicy.id, newTagName, fakePolicyTags);
                        return [4 /*yield*/, (0, waitForBatchedUpdates_1.default)()];
                    case 2:
                        _e.sent();
                        return [4 /*yield*/, OnyxUtils_1.default.get("".concat(ONYXKEYS_1.default.COLLECTION.POLICY_TAGS).concat(fakePolicy.id))];
                    case 3:
                        policyTagsOptimistic = _e.sent();
                        newTagOptimistic = (_b = (_a = policyTagsOptimistic === null || policyTagsOptimistic === void 0 ? void 0 : policyTagsOptimistic[tagListName]) === null || _a === void 0 ? void 0 : _a.tags) === null || _b === void 0 ? void 0 : _b[newTagName];
                        expect(newTagOptimistic === null || newTagOptimistic === void 0 ? void 0 : newTagOptimistic.name).toBe(newTagName);
                        expect(newTagOptimistic === null || newTagOptimistic === void 0 ? void 0 : newTagOptimistic.enabled).toBe(true);
                        expect(newTagOptimistic === null || newTagOptimistic === void 0 ? void 0 : newTagOptimistic.errors).toBeFalsy();
                        expect(newTagOptimistic === null || newTagOptimistic === void 0 ? void 0 : newTagOptimistic.pendingAction).toBe(CONST_1.default.RED_BRICK_ROAD_PENDING_ACTION.ADD);
                        mockFetch.resume();
                        return [4 /*yield*/, (0, waitForBatchedUpdates_1.default)()];
                    case 4:
                        _e.sent();
                        return [4 /*yield*/, OnyxUtils_1.default.get("".concat(ONYXKEYS_1.default.COLLECTION.POLICY_TAGS).concat(fakePolicy.id))];
                    case 5:
                        policyTagsSuccess = _e.sent();
                        newTagSuccess = (_d = (_c = policyTagsSuccess === null || policyTagsSuccess === void 0 ? void 0 : policyTagsSuccess[tagListName]) === null || _c === void 0 ? void 0 : _c.tags) === null || _d === void 0 ? void 0 : _d[newTagName];
                        expect(newTagSuccess === null || newTagSuccess === void 0 ? void 0 : newTagSuccess.errors).toBeFalsy();
                        expect(newTagSuccess === null || newTagSuccess === void 0 ? void 0 : newTagSuccess.pendingAction).toBeFalsy();
                        return [2 /*return*/];
                }
            });
        }); });
        it('reset new policy tag when api returns error', function () { return __awaiter(void 0, void 0, void 0, function () {
            var fakePolicy, tagListName, newTagName, fakePolicyTags, policyTags, newTag;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        fakePolicy = (0, policies_1.default)(0);
                        fakePolicy.areTagsEnabled = true;
                        tagListName = 'Fake tag';
                        newTagName = 'new tag';
                        fakePolicyTags = (0, policyTags_1.default)(tagListName);
                        mockFetch.pause();
                        return [4 /*yield*/, (0, waitForBatchedUpdates_1.default)()];
                    case 1:
                        _c.sent();
                        mockFetch.fail();
                        // When the API fails
                        (0, Tag_1.createPolicyTag)(fakePolicy.id, newTagName, fakePolicyTags);
                        return [4 /*yield*/, (0, waitForBatchedUpdates_1.default)()];
                    case 2:
                        _c.sent();
                        mockFetch.resume();
                        return [4 /*yield*/, (0, waitForBatchedUpdates_1.default)()];
                    case 3:
                        _c.sent();
                        return [4 /*yield*/, OnyxUtils_1.default.get("".concat(ONYXKEYS_1.default.COLLECTION.POLICY_TAGS).concat(fakePolicy.id))];
                    case 4:
                        policyTags = _c.sent();
                        newTag = (_b = (_a = policyTags === null || policyTags === void 0 ? void 0 : policyTags[tagListName]) === null || _a === void 0 ? void 0 : _a.tags) === null || _b === void 0 ? void 0 : _b[newTagName];
                        expect(newTag === null || newTag === void 0 ? void 0 : newTag.errors).toBeTruthy();
                        return [2 /*return*/];
                }
            });
        }); });
        it('should handle empty policy tags object', function () { return __awaiter(void 0, void 0, void 0, function () {
            var fakePolicy, newTagName, policyTagsOptimistic, tagListKeys, firstTagList, newTagOptimistic, policyTagsSuccess, tagListKeysSuccess, firstTagListSuccess, newTagSuccess;
            var _a, _b, _c, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        fakePolicy = (0, policies_1.default)(0);
                        fakePolicy.areTagsEnabled = true;
                        newTagName = 'new tag';
                        mockFetch.pause();
                        return [4 /*yield*/, (0, waitForBatchedUpdates_1.default)()];
                    case 1:
                        _e.sent();
                        // When adding the first tag
                        (0, Tag_1.createPolicyTag)(fakePolicy.id, newTagName, {});
                        return [4 /*yield*/, (0, waitForBatchedUpdates_1.default)()];
                    case 2:
                        _e.sent();
                        return [4 /*yield*/, OnyxUtils_1.default.get("".concat(ONYXKEYS_1.default.COLLECTION.POLICY_TAGS).concat(fakePolicy.id))];
                    case 3:
                        policyTagsOptimistic = _e.sent();
                        tagListKeys = Object.keys(policyTagsOptimistic !== null && policyTagsOptimistic !== void 0 ? policyTagsOptimistic : {});
                        firstTagList = tagListKeys.at(0);
                        if (firstTagList != null) {
                            newTagOptimistic = (_b = (_a = policyTagsOptimistic === null || policyTagsOptimistic === void 0 ? void 0 : policyTagsOptimistic[firstTagList]) === null || _a === void 0 ? void 0 : _a.tags) === null || _b === void 0 ? void 0 : _b[newTagName];
                            expect(newTagOptimistic === null || newTagOptimistic === void 0 ? void 0 : newTagOptimistic.name).toBe(newTagName);
                            expect(newTagOptimistic === null || newTagOptimistic === void 0 ? void 0 : newTagOptimistic.enabled).toBe(true);
                            expect(newTagOptimistic === null || newTagOptimistic === void 0 ? void 0 : newTagOptimistic.errors).toBeFalsy();
                            expect(newTagOptimistic === null || newTagOptimistic === void 0 ? void 0 : newTagOptimistic.pendingAction).toBe(CONST_1.default.RED_BRICK_ROAD_PENDING_ACTION.ADD);
                        }
                        mockFetch.resume();
                        return [4 /*yield*/, (0, waitForBatchedUpdates_1.default)()];
                    case 4:
                        _e.sent();
                        return [4 /*yield*/, OnyxUtils_1.default.get("".concat(ONYXKEYS_1.default.COLLECTION.POLICY_TAGS).concat(fakePolicy.id))];
                    case 5:
                        policyTagsSuccess = _e.sent();
                        tagListKeysSuccess = Object.keys(policyTagsSuccess !== null && policyTagsSuccess !== void 0 ? policyTagsSuccess : {});
                        firstTagListSuccess = tagListKeysSuccess.at(0);
                        if (firstTagListSuccess != null) {
                            newTagSuccess = (_d = (_c = policyTagsSuccess === null || policyTagsSuccess === void 0 ? void 0 : policyTagsSuccess[firstTagListSuccess]) === null || _c === void 0 ? void 0 : _c.tags) === null || _d === void 0 ? void 0 : _d[newTagName];
                            expect(newTagSuccess === null || newTagSuccess === void 0 ? void 0 : newTagSuccess.errors).toBeFalsy();
                            expect(newTagSuccess === null || newTagSuccess === void 0 ? void 0 : newTagSuccess.pendingAction).toBeFalsy();
                        }
                        return [2 /*return*/];
                }
            });
        }); });
        it('should work with data from useOnyx hook', function () { return __awaiter(void 0, void 0, void 0, function () {
            var fakePolicy, tagListName, newTagName, fakePolicyTags, result, policyTagsOptimistic, newTagOptimistic, policyTagsSuccess, newTagSuccess;
            var _a, _b, _c, _d, _e;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0:
                        fakePolicy = (0, policies_1.default)(0);
                        fakePolicy.areTagsEnabled = true;
                        tagListName = 'Integration tag';
                        newTagName = 'useOnyx tag';
                        fakePolicyTags = (0, policyTags_1.default)(tagListName);
                        mockFetch.pause();
                        return [4 /*yield*/, react_native_onyx_1.default.set("".concat(ONYXKEYS_1.default.COLLECTION.POLICY_TAGS).concat(fakePolicy.id), fakePolicyTags)];
                    case 1:
                        _f.sent();
                        return [4 /*yield*/, (0, waitForBatchedUpdates_1.default)()];
                    case 2:
                        _f.sent();
                        result = (0, react_native_1.renderHook)(function () { return (0, useOnyx_1.default)("".concat(ONYXKEYS_1.default.COLLECTION.POLICY_TAGS).concat(fakePolicy.id)); }).result;
                        return [4 /*yield*/, (0, react_native_1.waitFor)(function () {
                                expect(result.current[0]).toBeDefined();
                            })];
                    case 3:
                        _f.sent();
                        // When using data from useOnyx hook
                        (0, Tag_1.createPolicyTag)(fakePolicy.id, newTagName, (_a = result.current[0]) !== null && _a !== void 0 ? _a : {});
                        return [4 /*yield*/, (0, waitForBatchedUpdates_1.default)()];
                    case 4:
                        _f.sent();
                        return [4 /*yield*/, OnyxUtils_1.default.get("".concat(ONYXKEYS_1.default.COLLECTION.POLICY_TAGS).concat(fakePolicy.id))];
                    case 5:
                        policyTagsOptimistic = _f.sent();
                        newTagOptimistic = (_c = (_b = policyTagsOptimistic === null || policyTagsOptimistic === void 0 ? void 0 : policyTagsOptimistic[tagListName]) === null || _b === void 0 ? void 0 : _b.tags) === null || _c === void 0 ? void 0 : _c[newTagName];
                        expect(newTagOptimistic === null || newTagOptimistic === void 0 ? void 0 : newTagOptimistic.name).toBe(newTagName);
                        expect(newTagOptimistic === null || newTagOptimistic === void 0 ? void 0 : newTagOptimistic.enabled).toBe(true);
                        expect(newTagOptimistic === null || newTagOptimistic === void 0 ? void 0 : newTagOptimistic.errors).toBeFalsy();
                        expect(newTagOptimistic === null || newTagOptimistic === void 0 ? void 0 : newTagOptimistic.pendingAction).toBe(CONST_1.default.RED_BRICK_ROAD_PENDING_ACTION.ADD);
                        mockFetch.resume();
                        return [4 /*yield*/, (0, waitForBatchedUpdates_1.default)()];
                    case 6:
                        _f.sent();
                        return [4 /*yield*/, OnyxUtils_1.default.get("".concat(ONYXKEYS_1.default.COLLECTION.POLICY_TAGS).concat(fakePolicy.id))];
                    case 7:
                        policyTagsSuccess = _f.sent();
                        newTagSuccess = (_e = (_d = policyTagsSuccess === null || policyTagsSuccess === void 0 ? void 0 : policyTagsSuccess[tagListName]) === null || _d === void 0 ? void 0 : _d.tags) === null || _e === void 0 ? void 0 : _e[newTagName];
                        expect(newTagSuccess === null || newTagSuccess === void 0 ? void 0 : newTagSuccess.errors).toBeFalsy();
                        expect(newTagSuccess === null || newTagSuccess === void 0 ? void 0 : newTagSuccess.pendingAction).toBeFalsy();
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('SetWorkspaceTagEnabled', function () {
        it('set policy tag enable', function () { return __awaiter(void 0, void 0, void 0, function () {
            var fakePolicy, tagListName, fakePolicyTags, tagsToUpdate, policyData, optimisticPolicyTags, successPolicyTags;
            var _a, _b, _c, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        fakePolicy = (0, policies_1.default)(0);
                        fakePolicy.areTagsEnabled = true;
                        tagListName = 'Fake tag';
                        fakePolicyTags = (0, policyTags_1.default)(tagListName, 2);
                        tagsToUpdate = Object.keys((_b = (_a = fakePolicyTags === null || fakePolicyTags === void 0 ? void 0 : fakePolicyTags[tagListName]) === null || _a === void 0 ? void 0 : _a.tags) !== null && _b !== void 0 ? _b : {}).reduce(function (acc, key) {
                            var _a;
                            acc[key] = {
                                name: (_a = fakePolicyTags === null || fakePolicyTags === void 0 ? void 0 : fakePolicyTags[tagListName]) === null || _a === void 0 ? void 0 : _a.tags[key].name,
                                enabled: false,
                            };
                            return acc;
                        }, {});
                        (_c = mockFetch === null || mockFetch === void 0 ? void 0 : mockFetch.pause) === null || _c === void 0 ? void 0 : _c.call(mockFetch);
                        return [4 /*yield*/, react_native_onyx_1.default.set("".concat(ONYXKEYS_1.default.COLLECTION.POLICY).concat(fakePolicy.id), fakePolicy)];
                    case 1:
                        _e.sent();
                        return [4 /*yield*/, react_native_onyx_1.default.set("".concat(ONYXKEYS_1.default.COLLECTION.POLICY_TAGS).concat(fakePolicy.id), fakePolicyTags)];
                    case 2:
                        _e.sent();
                        policyData = (0, react_native_1.renderHook)(function () { return (0, usePolicyData_1.default)(fakePolicy.id); }, { wrapper: OnyxListItemProvider_1.default }).result;
                        return [4 /*yield*/, (0, waitForBatchedUpdates_1.default)()];
                    case 3:
                        _e.sent();
                        (0, Tag_1.setWorkspaceTagEnabled)(policyData.current, tagsToUpdate, 0);
                        return [4 /*yield*/, (0, waitForBatchedUpdates_1.default)()];
                    case 4:
                        _e.sent();
                        return [4 /*yield*/, TestHelper.getOnyxData({
                                key: "".concat(ONYXKEYS_1.default.COLLECTION.POLICY_TAGS).concat(fakePolicy.id),
                                callback: function (val) { return (optimisticPolicyTags = val); },
                            })];
                    case 5:
                        _e.sent();
                        Object.keys(tagsToUpdate).forEach(function (key) {
                            var _a, _b;
                            var updatedTag = (_a = optimisticPolicyTags === null || optimisticPolicyTags === void 0 ? void 0 : optimisticPolicyTags[tagListName]) === null || _a === void 0 ? void 0 : _a.tags[key];
                            expect(updatedTag === null || updatedTag === void 0 ? void 0 : updatedTag.enabled).toBeFalsy();
                            expect(updatedTag === null || updatedTag === void 0 ? void 0 : updatedTag.errors).toBeFalsy();
                            expect(updatedTag === null || updatedTag === void 0 ? void 0 : updatedTag.pendingAction).toBe(CONST_1.default.RED_BRICK_ROAD_PENDING_ACTION.UPDATE);
                            expect((_b = updatedTag === null || updatedTag === void 0 ? void 0 : updatedTag.pendingFields) === null || _b === void 0 ? void 0 : _b.enabled).toBe(CONST_1.default.RED_BRICK_ROAD_PENDING_ACTION.UPDATE);
                        });
                        (_d = mockFetch === null || mockFetch === void 0 ? void 0 : mockFetch.resume) === null || _d === void 0 ? void 0 : _d.call(mockFetch);
                        return [4 /*yield*/, (0, waitForBatchedUpdates_1.default)()];
                    case 6:
                        _e.sent();
                        return [4 /*yield*/, TestHelper.getOnyxData({
                                key: "".concat(ONYXKEYS_1.default.COLLECTION.POLICY_TAGS).concat(fakePolicy.id),
                                callback: function (val) { return (successPolicyTags = val); },
                            })];
                    case 7:
                        _e.sent();
                        Object.keys(tagsToUpdate).forEach(function (key) {
                            var _a, _b;
                            var updatedTag = (_a = successPolicyTags === null || successPolicyTags === void 0 ? void 0 : successPolicyTags[tagListName]) === null || _a === void 0 ? void 0 : _a.tags[key];
                            expect(updatedTag === null || updatedTag === void 0 ? void 0 : updatedTag.errors).toBeFalsy();
                            expect(updatedTag === null || updatedTag === void 0 ? void 0 : updatedTag.pendingAction).toBeFalsy();
                            expect((_b = updatedTag === null || updatedTag === void 0 ? void 0 : updatedTag.pendingFields) === null || _b === void 0 ? void 0 : _b.enabled).toBeFalsy();
                        });
                        return [2 /*return*/];
                }
            });
        }); });
        it('reset policy tag enable when api returns error', function () { return __awaiter(void 0, void 0, void 0, function () {
            var fakePolicy, tagListName, fakePolicyTags, tagsToUpdate, policyData, failurePolicyTags;
            var _a, _b, _c, _d, _e;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0:
                        fakePolicy = (0, policies_1.default)(0);
                        fakePolicy.areTagsEnabled = true;
                        tagListName = 'Fake tag';
                        fakePolicyTags = (0, policyTags_1.default)(tagListName, 2);
                        tagsToUpdate = Object.keys((_b = (_a = fakePolicyTags === null || fakePolicyTags === void 0 ? void 0 : fakePolicyTags[tagListName]) === null || _a === void 0 ? void 0 : _a.tags) !== null && _b !== void 0 ? _b : {}).reduce(function (acc, key) {
                            var _a;
                            acc[key] = {
                                name: (_a = fakePolicyTags === null || fakePolicyTags === void 0 ? void 0 : fakePolicyTags[tagListName]) === null || _a === void 0 ? void 0 : _a.tags[key].name,
                                enabled: false,
                            };
                            return acc;
                        }, {});
                        (_c = mockFetch === null || mockFetch === void 0 ? void 0 : mockFetch.pause) === null || _c === void 0 ? void 0 : _c.call(mockFetch);
                        return [4 /*yield*/, react_native_onyx_1.default.set("".concat(ONYXKEYS_1.default.COLLECTION.POLICY).concat(fakePolicy.id), fakePolicy)];
                    case 1:
                        _f.sent();
                        return [4 /*yield*/, react_native_onyx_1.default.set("".concat(ONYXKEYS_1.default.COLLECTION.POLICY_TAGS).concat(fakePolicy.id), fakePolicyTags)];
                    case 2:
                        _f.sent();
                        (_d = mockFetch === null || mockFetch === void 0 ? void 0 : mockFetch.fail) === null || _d === void 0 ? void 0 : _d.call(mockFetch);
                        policyData = (0, react_native_1.renderHook)(function () { return (0, usePolicyData_1.default)(fakePolicy.id); }, { wrapper: OnyxListItemProvider_1.default }).result;
                        (0, Tag_1.setWorkspaceTagEnabled)(policyData.current, tagsToUpdate, 0);
                        return [4 /*yield*/, (0, waitForBatchedUpdates_1.default)()];
                    case 3:
                        _f.sent();
                        (_e = mockFetch === null || mockFetch === void 0 ? void 0 : mockFetch.resume) === null || _e === void 0 ? void 0 : _e.call(mockFetch);
                        return [4 /*yield*/, (0, waitForBatchedUpdates_1.default)()];
                    case 4:
                        _f.sent();
                        return [4 /*yield*/, TestHelper.getOnyxData({
                                key: "".concat(ONYXKEYS_1.default.COLLECTION.POLICY_TAGS).concat(fakePolicy.id),
                                callback: function (val) { return (failurePolicyTags = val); },
                            })];
                    case 5:
                        _f.sent();
                        Object.keys(tagsToUpdate).forEach(function (key) {
                            var _a, _b;
                            var updatedTag = (_a = failurePolicyTags === null || failurePolicyTags === void 0 ? void 0 : failurePolicyTags[tagListName]) === null || _a === void 0 ? void 0 : _a.tags[key];
                            expect(updatedTag === null || updatedTag === void 0 ? void 0 : updatedTag.errors).toBeTruthy();
                            expect(updatedTag === null || updatedTag === void 0 ? void 0 : updatedTag.pendingAction).toBeFalsy();
                            expect((_b = updatedTag === null || updatedTag === void 0 ? void 0 : updatedTag.pendingFields) === null || _b === void 0 ? void 0 : _b.enabled).toBeFalsy();
                        });
                        return [2 /*return*/];
                }
            });
        }); });
        it('should work with data from useOnyx hook', function () { return __awaiter(void 0, void 0, void 0, function () {
            var fakePolicy, tagListName, fakePolicyTags, tagName, result, policyData, optimisticPolicyTags, optimisticTag, successPolicyTags, successTag;
            var _a;
            var _b, _c, _d, _e, _f, _g, _h;
            return __generator(this, function (_j) {
                switch (_j.label) {
                    case 0:
                        fakePolicy = (0, policies_1.default)(0);
                        tagListName = 'Test tag';
                        fakePolicyTags = (0, policyTags_1.default)(tagListName, 1);
                        tagName = (_d = Object.keys((_c = (_b = fakePolicyTags === null || fakePolicyTags === void 0 ? void 0 : fakePolicyTags[tagListName]) === null || _b === void 0 ? void 0 : _b.tags) !== null && _c !== void 0 ? _c : {}).at(0)) !== null && _d !== void 0 ? _d : '';
                        (_e = mockFetch === null || mockFetch === void 0 ? void 0 : mockFetch.pause) === null || _e === void 0 ? void 0 : _e.call(mockFetch);
                        return [4 /*yield*/, react_native_onyx_1.default.set("".concat(ONYXKEYS_1.default.COLLECTION.POLICY).concat(fakePolicy.id), fakePolicy)];
                    case 1:
                        _j.sent();
                        return [4 /*yield*/, react_native_onyx_1.default.set("".concat(ONYXKEYS_1.default.COLLECTION.POLICY_TAGS).concat(fakePolicy.id), fakePolicyTags)];
                    case 2:
                        _j.sent();
                        result = (0, react_native_1.renderHook)(function () { return (0, useOnyx_1.default)("".concat(ONYXKEYS_1.default.COLLECTION.POLICY_TAGS).concat(fakePolicy.id)); }).result;
                        policyData = (0, react_native_1.renderHook)(function () { return (0, usePolicyData_1.default)(fakePolicy.id); }, { wrapper: OnyxListItemProvider_1.default }).result;
                        return [4 /*yield*/, (0, waitForBatchedUpdates_1.default)()];
                    case 3:
                        _j.sent();
                        return [4 /*yield*/, (0, react_native_1.waitFor)(function () {
                                expect(result.current[0]).toBeDefined();
                            })];
                    case 4:
                        _j.sent();
                        (0, Tag_1.setWorkspaceTagEnabled)(policyData.current, (_a = {}, _a[tagName] = { name: tagName, enabled: false }, _a), 0);
                        return [4 /*yield*/, (0, waitForBatchedUpdates_1.default)()];
                    case 5:
                        _j.sent();
                        return [4 /*yield*/, TestHelper.getOnyxData({
                                key: "".concat(ONYXKEYS_1.default.COLLECTION.POLICY_TAGS).concat(fakePolicy.id),
                                callback: function (val) { return (optimisticPolicyTags = val); },
                            })];
                    case 6:
                        _j.sent();
                        optimisticTag = (_f = optimisticPolicyTags === null || optimisticPolicyTags === void 0 ? void 0 : optimisticPolicyTags[tagListName]) === null || _f === void 0 ? void 0 : _f.tags[tagName];
                        expect(optimisticTag === null || optimisticTag === void 0 ? void 0 : optimisticTag.enabled).toBe(false);
                        expect(optimisticTag === null || optimisticTag === void 0 ? void 0 : optimisticTag.pendingAction).toBe(CONST_1.default.RED_BRICK_ROAD_PENDING_ACTION.UPDATE);
                        // Check success updates
                        (_g = mockFetch === null || mockFetch === void 0 ? void 0 : mockFetch.resume) === null || _g === void 0 ? void 0 : _g.call(mockFetch);
                        return [4 /*yield*/, (0, waitForBatchedUpdates_1.default)()];
                    case 7:
                        _j.sent();
                        return [4 /*yield*/, TestHelper.getOnyxData({
                                key: "".concat(ONYXKEYS_1.default.COLLECTION.POLICY_TAGS).concat(fakePolicy.id),
                                callback: function (val) { return (successPolicyTags = val); },
                            })];
                    case 8:
                        _j.sent();
                        successTag = (_h = successPolicyTags === null || successPolicyTags === void 0 ? void 0 : successPolicyTags[tagListName]) === null || _h === void 0 ? void 0 : _h.tags[tagName];
                        expect(successTag === null || successTag === void 0 ? void 0 : successTag.enabled).toBe(false);
                        expect(successTag === null || successTag === void 0 ? void 0 : successTag.pendingAction).toBeFalsy();
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('RenamePolicyTag', function () {
        it('rename policy tag', function () {
            var _a, _b;
            var fakePolicy = (0, policies_1.default)(0);
            fakePolicy.areTagsEnabled = true;
            var tagListName = 'Fake tag';
            var fakePolicyTags = (0, policyTags_1.default)(tagListName, 2);
            var oldTagName = Object.keys((_a = fakePolicyTags === null || fakePolicyTags === void 0 ? void 0 : fakePolicyTags[tagListName]) === null || _a === void 0 ? void 0 : _a.tags).at(0);
            var newTagName = 'New tag';
            (_b = mockFetch === null || mockFetch === void 0 ? void 0 : mockFetch.pause) === null || _b === void 0 ? void 0 : _b.call(mockFetch);
            return react_native_onyx_1.default.set("".concat(ONYXKEYS_1.default.COLLECTION.POLICY).concat(fakePolicy.id), fakePolicy)
                .then(function () {
                react_native_onyx_1.default.set("".concat(ONYXKEYS_1.default.COLLECTION.POLICY_TAGS).concat(fakePolicy.id), fakePolicyTags);
            })
                .then(function () {
                var policyData = (0, react_native_1.renderHook)(function () { return (0, usePolicyData_1.default)(fakePolicy.id); }, { wrapper: OnyxListItemProvider_1.default }).result;
                (0, Tag_1.renamePolicyTag)(policyData.current, {
                    oldName: oldTagName !== null && oldTagName !== void 0 ? oldTagName : '',
                    newName: newTagName,
                }, 0);
                return (0, waitForBatchedUpdates_1.default)();
            })
                .then(function () {
                return new Promise(function (resolve) {
                    var connection = react_native_onyx_1.default.connect({
                        key: "".concat(ONYXKEYS_1.default.COLLECTION.POLICY_TAGS).concat(fakePolicy.id),
                        waitForCollectionCallback: false,
                        callback: function (policyTags) {
                            var _a, _b, _c, _d, _e;
                            react_native_onyx_1.default.disconnect(connection);
                            var tags = (_a = policyTags === null || policyTags === void 0 ? void 0 : policyTags[tagListName]) === null || _a === void 0 ? void 0 : _a.tags;
                            expect(tags === null || tags === void 0 ? void 0 : tags[oldTagName !== null && oldTagName !== void 0 ? oldTagName : '']).toBeFalsy();
                            expect((_b = tags === null || tags === void 0 ? void 0 : tags[newTagName]) === null || _b === void 0 ? void 0 : _b.name).toBe(newTagName);
                            expect((_c = tags === null || tags === void 0 ? void 0 : tags[newTagName]) === null || _c === void 0 ? void 0 : _c.pendingAction).toBe(CONST_1.default.RED_BRICK_ROAD_PENDING_ACTION.UPDATE);
                            expect((_e = (_d = tags === null || tags === void 0 ? void 0 : tags[newTagName]) === null || _d === void 0 ? void 0 : _d.pendingFields) === null || _e === void 0 ? void 0 : _e.name).toBe(CONST_1.default.RED_BRICK_ROAD_PENDING_ACTION.UPDATE);
                            resolve();
                        },
                    });
                });
            })
                .then(mockFetch === null || mockFetch === void 0 ? void 0 : mockFetch.resume)
                .then(waitForBatchedUpdates_1.default)
                .then(function () {
                return new Promise(function (resolve) {
                    var connection = react_native_onyx_1.default.connect({
                        key: "".concat(ONYXKEYS_1.default.COLLECTION.POLICY_TAGS).concat(fakePolicy.id),
                        waitForCollectionCallback: false,
                        callback: function (policyTags) {
                            var _a, _b, _c, _d;
                            react_native_onyx_1.default.disconnect(connection);
                            var tags = (_a = policyTags === null || policyTags === void 0 ? void 0 : policyTags[tagListName]) === null || _a === void 0 ? void 0 : _a.tags;
                            expect((_b = tags === null || tags === void 0 ? void 0 : tags[newTagName]) === null || _b === void 0 ? void 0 : _b.pendingAction).toBeFalsy();
                            expect((_d = (_c = tags === null || tags === void 0 ? void 0 : tags[newTagName]) === null || _c === void 0 ? void 0 : _c.pendingFields) === null || _d === void 0 ? void 0 : _d.name).toBeFalsy();
                            resolve();
                        },
                    });
                });
            });
        });
        it('reset policy tag name when api returns error', function () {
            var _a, _b, _c;
            var fakePolicy = (0, policies_1.default)(0);
            fakePolicy.areTagsEnabled = true;
            var tagListName = 'Fake tag';
            var fakePolicyTags = (0, policyTags_1.default)(tagListName, 2);
            var oldTagName = (_b = Object.keys((_a = fakePolicyTags === null || fakePolicyTags === void 0 ? void 0 : fakePolicyTags[tagListName]) === null || _a === void 0 ? void 0 : _a.tags).at(0)) !== null && _b !== void 0 ? _b : '';
            var newTagName = 'New tag';
            (_c = mockFetch === null || mockFetch === void 0 ? void 0 : mockFetch.pause) === null || _c === void 0 ? void 0 : _c.call(mockFetch);
            return react_native_onyx_1.default.set("".concat(ONYXKEYS_1.default.COLLECTION.POLICY).concat(fakePolicy.id), fakePolicy)
                .then(function () {
                react_native_onyx_1.default.set("".concat(ONYXKEYS_1.default.COLLECTION.POLICY_TAGS).concat(fakePolicy.id), fakePolicyTags);
            })
                .then(function () {
                var _a;
                (_a = mockFetch === null || mockFetch === void 0 ? void 0 : mockFetch.fail) === null || _a === void 0 ? void 0 : _a.call(mockFetch);
                var policyData = (0, react_native_1.renderHook)(function () { return (0, usePolicyData_1.default)(fakePolicy.id); }, { wrapper: OnyxListItemProvider_1.default }).result;
                (0, Tag_1.renamePolicyTag)(policyData.current, {
                    oldName: oldTagName,
                    newName: newTagName,
                }, 0);
                return (0, waitForBatchedUpdates_1.default)();
            })
                .then(mockFetch === null || mockFetch === void 0 ? void 0 : mockFetch.resume)
                .then(waitForBatchedUpdates_1.default)
                .then(function () {
                return new Promise(function (resolve) {
                    var connection = react_native_onyx_1.default.connect({
                        key: "".concat(ONYXKEYS_1.default.COLLECTION.POLICY_TAGS).concat(fakePolicy.id),
                        waitForCollectionCallback: false,
                        callback: function (policyTags) {
                            var _a, _b;
                            react_native_onyx_1.default.disconnect(connection);
                            var tags = (_a = policyTags === null || policyTags === void 0 ? void 0 : policyTags[tagListName]) === null || _a === void 0 ? void 0 : _a.tags;
                            expect(tags === null || tags === void 0 ? void 0 : tags[newTagName]).toBeFalsy();
                            expect((_b = tags === null || tags === void 0 ? void 0 : tags[oldTagName]) === null || _b === void 0 ? void 0 : _b.errors).toBeTruthy();
                            resolve();
                        },
                    });
                });
            });
        });
    });
    describe('DeletePolicyTags', function () {
        it('should not modify Onyx data when policyTags is empty', function () { return __awaiter(void 0, void 0, void 0, function () {
            var fakePolicy, tagListName, existingPolicyTags, tagsToDelete, policyData, updatedPolicyTags;
            var _a, _b, _c, _d, _e, _f;
            return __generator(this, function (_g) {
                switch (_g.label) {
                    case 0:
                        fakePolicy = (0, policies_1.default)(0);
                        tagListName = 'ExistingTagList';
                        existingPolicyTags = (0, policyTags_1.default)(tagListName, 3);
                        existingPolicyTags[tagListName] = __assign(__assign({}, existingPolicyTags[tagListName]), { required: true, orderWeight: 1 });
                        (_a = mockFetch === null || mockFetch === void 0 ? void 0 : mockFetch.pause) === null || _a === void 0 ? void 0 : _a.call(mockFetch);
                        tagsToDelete = ['tag1', 'tag2'];
                        return [4 /*yield*/, react_native_onyx_1.default.set("".concat(ONYXKEYS_1.default.COLLECTION.POLICY).concat(fakePolicy.id), fakePolicy)];
                    case 1:
                        _g.sent();
                        return [4 /*yield*/, react_native_onyx_1.default.set("".concat(ONYXKEYS_1.default.COLLECTION.POLICY_TAGS).concat(fakePolicy.id), existingPolicyTags)];
                    case 2:
                        _g.sent();
                        return [4 /*yield*/, (0, waitForBatchedUpdates_1.default)()];
                    case 3:
                        _g.sent();
                        policyData = (0, react_native_1.renderHook)(function () { return (0, usePolicyData_1.default)(fakePolicy.id); }, { wrapper: OnyxListItemProvider_1.default }).result;
                        expect(function () {
                            (0, Tag_1.deletePolicyTags)(policyData.current, tagsToDelete);
                        }).not.toThrow();
                        return [4 /*yield*/, ((_b = mockFetch === null || mockFetch === void 0 ? void 0 : mockFetch.resume) === null || _b === void 0 ? void 0 : _b.call(mockFetch))];
                    case 4:
                        _g.sent();
                        return [4 /*yield*/, (0, waitForBatchedUpdates_1.default)()];
                    case 5:
                        _g.sent();
                        return [4 /*yield*/, TestHelper.getOnyxData({
                                key: "".concat(ONYXKEYS_1.default.COLLECTION.POLICY_TAGS).concat(fakePolicy.id),
                                callback: function (val) { return (updatedPolicyTags = val); },
                            })];
                    case 6:
                        _g.sent();
                        expect(updatedPolicyTags).toEqual(existingPolicyTags);
                        expect(Object.keys((_d = (_c = updatedPolicyTags === null || updatedPolicyTags === void 0 ? void 0 : updatedPolicyTags[tagListName]) === null || _c === void 0 ? void 0 : _c.tags) !== null && _d !== void 0 ? _d : {}).length).toBe(3);
                        expect((_e = updatedPolicyTags === null || updatedPolicyTags === void 0 ? void 0 : updatedPolicyTags[tagListName]) === null || _e === void 0 ? void 0 : _e.required).toBe(true);
                        expect((_f = updatedPolicyTags === null || updatedPolicyTags === void 0 ? void 0 : updatedPolicyTags[tagListName]) === null || _f === void 0 ? void 0 : _f.orderWeight).toBe(1);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should not modify Onyx data when tagsToDelete do not exist', function () { return __awaiter(void 0, void 0, void 0, function () {
            var fakePolicy, tagListName, existingPolicyTags, tagsToDelete, policyData, updatedPolicyTags;
            var _a, _b, _c, _d, _e, _f;
            return __generator(this, function (_g) {
                switch (_g.label) {
                    case 0:
                        fakePolicy = (0, policies_1.default)(0);
                        tagListName = 'ExistingTagList';
                        existingPolicyTags = (0, policyTags_1.default)(tagListName, 3);
                        existingPolicyTags[tagListName] = __assign(__assign({}, existingPolicyTags[tagListName]), { required: true, orderWeight: 1 });
                        tagsToDelete = ['NonExistentTag1', 'NonExistentTag2', 'NonExistentTag3'];
                        (_a = mockFetch === null || mockFetch === void 0 ? void 0 : mockFetch.pause) === null || _a === void 0 ? void 0 : _a.call(mockFetch);
                        return [4 /*yield*/, react_native_onyx_1.default.set("".concat(ONYXKEYS_1.default.COLLECTION.POLICY).concat(fakePolicy.id), existingPolicyTags)];
                    case 1:
                        _g.sent();
                        return [4 /*yield*/, react_native_onyx_1.default.set("".concat(ONYXKEYS_1.default.COLLECTION.POLICY_TAGS).concat(fakePolicy.id), existingPolicyTags)];
                    case 2:
                        _g.sent();
                        return [4 /*yield*/, (0, waitForBatchedUpdates_1.default)()];
                    case 3:
                        _g.sent();
                        policyData = (0, react_native_1.renderHook)(function () { return (0, usePolicyData_1.default)(fakePolicy.id); }, { wrapper: OnyxListItemProvider_1.default }).result;
                        expect(function () {
                            (0, Tag_1.deletePolicyTags)(policyData.current, tagsToDelete);
                        }).not.toThrow();
                        return [4 /*yield*/, ((_b = mockFetch === null || mockFetch === void 0 ? void 0 : mockFetch.resume) === null || _b === void 0 ? void 0 : _b.call(mockFetch))];
                    case 4:
                        _g.sent();
                        return [4 /*yield*/, (0, waitForBatchedUpdates_1.default)()];
                    case 5:
                        _g.sent();
                        return [4 /*yield*/, TestHelper.getOnyxData({
                                key: "".concat(ONYXKEYS_1.default.COLLECTION.POLICY_TAGS).concat(fakePolicy.id),
                                callback: function (val) { return (updatedPolicyTags = val); },
                            })];
                    case 6:
                        _g.sent();
                        expect(updatedPolicyTags).toEqual(existingPolicyTags);
                        expect(Object.keys((_d = (_c = updatedPolicyTags === null || updatedPolicyTags === void 0 ? void 0 : updatedPolicyTags[tagListName]) === null || _c === void 0 ? void 0 : _c.tags) !== null && _d !== void 0 ? _d : {}).length).toBe(3);
                        expect((_e = updatedPolicyTags === null || updatedPolicyTags === void 0 ? void 0 : updatedPolicyTags[tagListName]) === null || _e === void 0 ? void 0 : _e.required).toBe(true);
                        expect((_f = updatedPolicyTags === null || updatedPolicyTags === void 0 ? void 0 : updatedPolicyTags[tagListName]) === null || _f === void 0 ? void 0 : _f.orderWeight).toBe(1);
                        return [2 /*return*/];
                }
            });
        }); });
        it('delete policy tag', function () { return __awaiter(void 0, void 0, void 0, function () {
            var fakePolicy, tagListName, fakePolicyTags, tagsToDelete, policyData, updatePolicyTags;
            var _a, _b, _c, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        fakePolicy = (0, policies_1.default)(0);
                        fakePolicy.areTagsEnabled = true;
                        tagListName = 'Fake tag';
                        fakePolicyTags = (0, policyTags_1.default)(tagListName, 2);
                        tagsToDelete = Object.keys((_b = (_a = fakePolicyTags === null || fakePolicyTags === void 0 ? void 0 : fakePolicyTags[tagListName]) === null || _a === void 0 ? void 0 : _a.tags) !== null && _b !== void 0 ? _b : {});
                        (_c = mockFetch === null || mockFetch === void 0 ? void 0 : mockFetch.pause) === null || _c === void 0 ? void 0 : _c.call(mockFetch);
                        return [4 /*yield*/, react_native_onyx_1.default.set("".concat(ONYXKEYS_1.default.COLLECTION.POLICY).concat(fakePolicy.id), fakePolicy)];
                    case 1:
                        _e.sent();
                        return [4 /*yield*/, react_native_onyx_1.default.set("".concat(ONYXKEYS_1.default.COLLECTION.POLICY_TAGS).concat(fakePolicy.id), fakePolicyTags)];
                    case 2:
                        _e.sent();
                        policyData = (0, react_native_1.renderHook)(function () { return (0, usePolicyData_1.default)(fakePolicy.id); }, { wrapper: OnyxListItemProvider_1.default }).result;
                        (0, Tag_1.deletePolicyTags)(policyData.current, tagsToDelete);
                        return [4 /*yield*/, (0, waitForBatchedUpdates_1.default)()];
                    case 3:
                        _e.sent();
                        return [4 /*yield*/, TestHelper.getOnyxData({
                                key: "".concat(ONYXKEYS_1.default.COLLECTION.POLICY_TAGS).concat(fakePolicy.id),
                                callback: function (val) { return (updatePolicyTags = val); },
                            })];
                    case 4:
                        _e.sent();
                        tagsToDelete.forEach(function (tagName) {
                            var _a, _b;
                            expect((_b = (_a = updatePolicyTags === null || updatePolicyTags === void 0 ? void 0 : updatePolicyTags[tagListName]) === null || _a === void 0 ? void 0 : _a.tags[tagName]) === null || _b === void 0 ? void 0 : _b.pendingAction).toBe(CONST_1.default.RED_BRICK_ROAD_PENDING_ACTION.DELETE);
                        });
                        return [4 /*yield*/, ((_d = mockFetch === null || mockFetch === void 0 ? void 0 : mockFetch.resume) === null || _d === void 0 ? void 0 : _d.call(mockFetch))];
                    case 5:
                        _e.sent();
                        return [4 /*yield*/, (0, waitForBatchedUpdates_1.default)()];
                    case 6:
                        _e.sent();
                        // Verify success data
                        return [4 /*yield*/, TestHelper.getOnyxData({
                                key: "".concat(ONYXKEYS_1.default.COLLECTION.POLICY_TAGS).concat(fakePolicy.id),
                                callback: function (val) { return (updatePolicyTags = val); },
                            })];
                    case 7:
                        // Verify success data
                        _e.sent();
                        tagsToDelete.forEach(function (tagName) {
                            var _a;
                            expect((_a = updatePolicyTags === null || updatePolicyTags === void 0 ? void 0 : updatePolicyTags[tagListName]) === null || _a === void 0 ? void 0 : _a.tags[tagName]).toBeFalsy();
                        });
                        return [2 /*return*/];
                }
            });
        }); });
        it('reset the deleted policy tag when api returns error', function () { return __awaiter(void 0, void 0, void 0, function () {
            var fakePolicy, tagListName, fakePolicyTags, tagsToDelete, policyData, updatePolicyTags;
            var _a, _b, _c, _d, _e;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0:
                        fakePolicy = (0, policies_1.default)(0);
                        fakePolicy.areTagsEnabled = true;
                        tagListName = 'Fake tag';
                        fakePolicyTags = (0, policyTags_1.default)(tagListName, 2);
                        tagsToDelete = Object.keys((_b = (_a = fakePolicyTags === null || fakePolicyTags === void 0 ? void 0 : fakePolicyTags[tagListName]) === null || _a === void 0 ? void 0 : _a.tags) !== null && _b !== void 0 ? _b : {});
                        (_c = mockFetch === null || mockFetch === void 0 ? void 0 : mockFetch.pause) === null || _c === void 0 ? void 0 : _c.call(mockFetch);
                        return [4 /*yield*/, react_native_onyx_1.default.set("".concat(ONYXKEYS_1.default.COLLECTION.POLICY).concat(fakePolicy.id), fakePolicy)];
                    case 1:
                        _f.sent();
                        return [4 /*yield*/, react_native_onyx_1.default.set("".concat(ONYXKEYS_1.default.COLLECTION.POLICY_TAGS).concat(fakePolicy.id), fakePolicyTags)];
                    case 2:
                        _f.sent();
                        return [4 /*yield*/, (0, waitForBatchedUpdates_1.default)()];
                    case 3:
                        _f.sent();
                        policyData = (0, react_native_1.renderHook)(function () { return (0, usePolicyData_1.default)(fakePolicy.id); }, { wrapper: OnyxListItemProvider_1.default }).result;
                        (_d = mockFetch === null || mockFetch === void 0 ? void 0 : mockFetch.fail) === null || _d === void 0 ? void 0 : _d.call(mockFetch);
                        (0, Tag_1.deletePolicyTags)(policyData.current, tagsToDelete);
                        return [4 /*yield*/, (0, waitForBatchedUpdates_1.default)()];
                    case 4:
                        _f.sent();
                        return [4 /*yield*/, ((_e = mockFetch === null || mockFetch === void 0 ? void 0 : mockFetch.resume) === null || _e === void 0 ? void 0 : _e.call(mockFetch))];
                    case 5:
                        _f.sent();
                        return [4 /*yield*/, (0, waitForBatchedUpdates_1.default)()];
                    case 6:
                        _f.sent();
                        return [4 /*yield*/, TestHelper.getOnyxData({
                                key: "".concat(ONYXKEYS_1.default.COLLECTION.POLICY_TAGS).concat(fakePolicy.id),
                                callback: function (val) { return (updatePolicyTags = val); },
                            })];
                    case 7:
                        _f.sent();
                        tagsToDelete.forEach(function (tagName) {
                            var _a, _b;
                            expect((_a = updatePolicyTags === null || updatePolicyTags === void 0 ? void 0 : updatePolicyTags[tagListName]) === null || _a === void 0 ? void 0 : _a.tags[tagName].pendingAction).toBeFalsy();
                            expect((_b = updatePolicyTags === null || updatePolicyTags === void 0 ? void 0 : updatePolicyTags[tagListName]) === null || _b === void 0 ? void 0 : _b.tags[tagName].errors).toBeTruthy();
                        });
                        return [2 /*return*/];
                }
            });
        }); });
        it('should work with data from useOnyx hook', function () { return __awaiter(void 0, void 0, void 0, function () {
            var fakePolicy, tagListName, fakePolicyTags, tagsToDelete, policyData, updatePolicyTags;
            var _a, _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        fakePolicy = (0, policies_1.default)(0);
                        tagListName = 'Test tag';
                        fakePolicyTags = (0, policyTags_1.default)(tagListName, 2);
                        tagsToDelete = Object.keys((_b = (_a = fakePolicyTags === null || fakePolicyTags === void 0 ? void 0 : fakePolicyTags[tagListName]) === null || _a === void 0 ? void 0 : _a.tags) !== null && _b !== void 0 ? _b : {});
                        return [4 /*yield*/, react_native_onyx_1.default.set("".concat(ONYXKEYS_1.default.COLLECTION.POLICY).concat(fakePolicy.id), fakePolicy)];
                    case 1:
                        _d.sent();
                        return [4 /*yield*/, react_native_onyx_1.default.set("".concat(ONYXKEYS_1.default.COLLECTION.POLICY_TAGS).concat(fakePolicy.id), fakePolicyTags)];
                    case 2:
                        _d.sent();
                        policyData = (0, react_native_1.renderHook)(function () { return (0, usePolicyData_1.default)(fakePolicy.id); }, { wrapper: OnyxListItemProvider_1.default }).result;
                        (0, Tag_1.deletePolicyTags)(policyData.current, tagsToDelete);
                        return [4 /*yield*/, ((_c = mockFetch === null || mockFetch === void 0 ? void 0 : mockFetch.resume) === null || _c === void 0 ? void 0 : _c.call(mockFetch))];
                    case 3:
                        _d.sent();
                        return [4 /*yield*/, (0, waitForBatchedUpdates_1.default)()];
                    case 4:
                        _d.sent();
                        return [4 /*yield*/, TestHelper.getOnyxData({
                                key: "".concat(ONYXKEYS_1.default.COLLECTION.POLICY_TAGS).concat(fakePolicy.id),
                                callback: function (val) { return (updatePolicyTags = val); },
                            })];
                    case 5:
                        _d.sent();
                        tagsToDelete.forEach(function (tagName) {
                            var _a;
                            expect((_a = updatePolicyTags === null || updatePolicyTags === void 0 ? void 0 : updatePolicyTags[tagListName]) === null || _a === void 0 ? void 0 : _a.tags[tagName]).toBeFalsy();
                        });
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('ClearPolicyTagListErrors', function () {
        it('should clear errors for a tag list', function () { return __awaiter(void 0, void 0, void 0, function () {
            var fakePolicy, tagListName, fakePolicyTags, updatedPolicyTags;
            var _a, _b, _c, _d, _e;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0:
                        fakePolicy = (0, policies_1.default)(0);
                        tagListName = 'Test tag list';
                        fakePolicyTags = (0, policyTags_1.default)(tagListName, 2);
                        fakePolicyTags[tagListName] = __assign(__assign({}, fakePolicyTags[tagListName]), { errors: { field1: 'Error on tag list' } });
                        return [4 /*yield*/, react_native_onyx_1.default.set("".concat(ONYXKEYS_1.default.COLLECTION.POLICY_TAGS).concat(fakePolicy.id), fakePolicyTags)];
                    case 1:
                        _f.sent();
                        // When clearing the errors from the tag list
                        (0, Tag_1.clearPolicyTagListErrors)({ policyID: fakePolicy.id, tagListIndex: 0, policyTags: fakePolicyTags });
                        return [4 /*yield*/, (0, waitForBatchedUpdates_1.default)()];
                    case 2:
                        _f.sent();
                        return [4 /*yield*/, TestHelper.getOnyxData({
                                key: "".concat(ONYXKEYS_1.default.COLLECTION.POLICY_TAGS).concat(fakePolicy.id),
                                callback: function (val) { return (updatedPolicyTags = val); },
                            })];
                    case 3:
                        _f.sent();
                        // Then the errors should be cleared while other properties remain unchanged
                        expect(updatedPolicyTags === null || updatedPolicyTags === void 0 ? void 0 : updatedPolicyTags[tagListName]).toBeDefined();
                        expect((_a = updatedPolicyTags === null || updatedPolicyTags === void 0 ? void 0 : updatedPolicyTags[tagListName]) === null || _a === void 0 ? void 0 : _a.errors).toBeUndefined();
                        expect((_b = updatedPolicyTags === null || updatedPolicyTags === void 0 ? void 0 : updatedPolicyTags[tagListName]) === null || _b === void 0 ? void 0 : _b.name).toBe(tagListName);
                        expect((_c = updatedPolicyTags === null || updatedPolicyTags === void 0 ? void 0 : updatedPolicyTags[tagListName]) === null || _c === void 0 ? void 0 : _c.orderWeight).toBe(0);
                        expect(Object.keys((_e = (_d = updatedPolicyTags === null || updatedPolicyTags === void 0 ? void 0 : updatedPolicyTags[tagListName]) === null || _d === void 0 ? void 0 : _d.tags) !== null && _e !== void 0 ? _e : {}).length).toBe(2);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should not modify Onyx data when tag list does not exist at given index', function () { return __awaiter(void 0, void 0, void 0, function () {
            var fakePolicy, tagListName, fakePolicyTags, updatedPolicyTags;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        fakePolicy = (0, policies_1.default)(0);
                        tagListName = 'Test tag list';
                        fakePolicyTags = (0, policyTags_1.default)(tagListName, 2);
                        return [4 /*yield*/, react_native_onyx_1.default.set("".concat(ONYXKEYS_1.default.COLLECTION.POLICY_TAGS).concat(fakePolicy.id), fakePolicyTags)];
                    case 1:
                        _a.sent();
                        // When attempting to clear errors for a non-existent tag list using an invalid index
                        (0, Tag_1.clearPolicyTagListErrors)({ policyID: fakePolicy.id, tagListIndex: 99, policyTags: fakePolicyTags });
                        return [4 /*yield*/, (0, waitForBatchedUpdates_1.default)()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, TestHelper.getOnyxData({
                                key: "".concat(ONYXKEYS_1.default.COLLECTION.POLICY_TAGS).concat(fakePolicy.id),
                                callback: function (val) { return (updatedPolicyTags = val); },
                            })];
                    case 3:
                        _a.sent();
                        // Then the policy tags should remain unchanged because the index is invalid
                        expect(updatedPolicyTags).toEqual(fakePolicyTags);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should not modify Onyx data when tag list name is empty', function () { return __awaiter(void 0, void 0, void 0, function () {
            var fakePolicy, tagListName, fakePolicyTags, updatedPolicyTags;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        fakePolicy = (0, policies_1.default)(0);
                        tagListName = 'Test tag list';
                        fakePolicyTags = (0, policyTags_1.default)(tagListName, 2);
                        fakePolicyTags[tagListName] = __assign(__assign({}, fakePolicyTags[tagListName]), { name: '' });
                        return [4 /*yield*/, react_native_onyx_1.default.set("".concat(ONYXKEYS_1.default.COLLECTION.POLICY_TAGS).concat(fakePolicy.id), fakePolicyTags)];
                    case 1:
                        _a.sent();
                        // When attempting to clear errors for the tag list with empty name
                        (0, Tag_1.clearPolicyTagListErrors)({ policyID: fakePolicy.id, tagListIndex: 0, policyTags: fakePolicyTags });
                        return [4 /*yield*/, (0, waitForBatchedUpdates_1.default)()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, TestHelper.getOnyxData({
                                key: "".concat(ONYXKEYS_1.default.COLLECTION.POLICY_TAGS).concat(fakePolicy.id),
                                callback: function (val) { return (updatedPolicyTags = val); },
                            })];
                    case 3:
                        _a.sent();
                        // Then the policy tags should remain unchanged because the tag list name is empty
                        expect(updatedPolicyTags).toEqual(fakePolicyTags);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should clear multiple errors from a tag list', function () { return __awaiter(void 0, void 0, void 0, function () {
            var fakePolicy, tagListName, fakePolicyTags, updatedPolicyTags;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        fakePolicy = (0, policies_1.default)(0);
                        tagListName = 'Test tag list';
                        fakePolicyTags = (0, policyTags_1.default)(tagListName, 3);
                        fakePolicyTags[tagListName] = __assign(__assign({}, fakePolicyTags[tagListName]), { errors: {
                                field1: 'Error 1',
                                field2: 'Error 2',
                                field3: 'Error 3',
                            } });
                        return [4 /*yield*/, react_native_onyx_1.default.set("".concat(ONYXKEYS_1.default.COLLECTION.POLICY_TAGS).concat(fakePolicy.id), fakePolicyTags)];
                    case 1:
                        _b.sent();
                        // When clearing errors from the tag list
                        (0, Tag_1.clearPolicyTagListErrors)({ policyID: fakePolicy.id, tagListIndex: 0, policyTags: fakePolicyTags });
                        return [4 /*yield*/, (0, waitForBatchedUpdates_1.default)()];
                    case 2:
                        _b.sent();
                        return [4 /*yield*/, TestHelper.getOnyxData({
                                key: "".concat(ONYXKEYS_1.default.COLLECTION.POLICY_TAGS).concat(fakePolicy.id),
                                callback: function (val) { return (updatedPolicyTags = val); },
                            })];
                    case 3:
                        _b.sent();
                        // Then all errors should be cleared from the tag list
                        expect((_a = updatedPolicyTags === null || updatedPolicyTags === void 0 ? void 0 : updatedPolicyTags[tagListName]) === null || _a === void 0 ? void 0 : _a.errors).toBeUndefined();
                        return [2 /*return*/];
                }
            });
        }); });
        it('should handle multiple tag lists correctly', function () { return __awaiter(void 0, void 0, void 0, function () {
            var fakePolicy, tagListName1, tagListName2, fakePolicyTags, updatedPolicyTags;
            var _a;
            var _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        fakePolicy = (0, policies_1.default)(0);
                        tagListName1 = 'Tag list 1';
                        tagListName2 = 'Tag list 2';
                        fakePolicyTags = (_a = {},
                            _a[tagListName1] = {
                                name: tagListName1,
                                orderWeight: 0,
                                required: false,
                                tags: {
                                    tag1: { name: 'tag1', enabled: true },
                                },
                                errors: { field: 'Error on list 1' },
                            },
                            _a[tagListName2] = {
                                name: tagListName2,
                                orderWeight: 1,
                                required: false,
                                tags: {
                                    tag2: { name: 'tag2', enabled: true },
                                },
                                errors: { field: 'Error on list 2' },
                            },
                            _a);
                        return [4 /*yield*/, react_native_onyx_1.default.set("".concat(ONYXKEYS_1.default.COLLECTION.POLICY_TAGS).concat(fakePolicy.id), fakePolicyTags)];
                    case 1:
                        _d.sent();
                        // When clearing errors only for the second tag list
                        (0, Tag_1.clearPolicyTagListErrors)({ policyID: fakePolicy.id, tagListIndex: 1, policyTags: fakePolicyTags });
                        return [4 /*yield*/, (0, waitForBatchedUpdates_1.default)()];
                    case 2:
                        _d.sent();
                        return [4 /*yield*/, TestHelper.getOnyxData({
                                key: "".concat(ONYXKEYS_1.default.COLLECTION.POLICY_TAGS).concat(fakePolicy.id),
                                callback: function (val) { return (updatedPolicyTags = val); },
                            })];
                    case 3:
                        _d.sent();
                        // Then only the second list should have errors cleared while the first list keeps its errors
                        expect((_b = updatedPolicyTags === null || updatedPolicyTags === void 0 ? void 0 : updatedPolicyTags[tagListName1]) === null || _b === void 0 ? void 0 : _b.errors).toEqual({ field: 'Error on list 1' });
                        expect((_c = updatedPolicyTags === null || updatedPolicyTags === void 0 ? void 0 : updatedPolicyTags[tagListName2]) === null || _c === void 0 ? void 0 : _c.errors).toBeUndefined();
                        return [2 /*return*/];
                }
            });
        }); });
        it('should work with data from useOnyx hook', function () { return __awaiter(void 0, void 0, void 0, function () {
            var fakePolicy, tagListName, fakePolicyTags, result, updatedPolicyTags;
            var _a, _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        fakePolicy = (0, policies_1.default)(0);
                        tagListName = 'Test tag list';
                        fakePolicyTags = (0, policyTags_1.default)(tagListName, 2);
                        fakePolicyTags[tagListName] = __assign(__assign({}, fakePolicyTags[tagListName]), { errors: { field: 'Test error' } });
                        return [4 /*yield*/, react_native_onyx_1.default.set("".concat(ONYXKEYS_1.default.COLLECTION.POLICY_TAGS).concat(fakePolicy.id), fakePolicyTags)];
                    case 1:
                        _d.sent();
                        result = (0, react_native_1.renderHook)(function () { return (0, useOnyx_1.default)("".concat(ONYXKEYS_1.default.COLLECTION.POLICY_TAGS).concat(fakePolicy.id)); }).result;
                        return [4 /*yield*/, (0, react_native_1.waitFor)(function () {
                                expect(result.current[0]).toBeDefined();
                            })];
                    case 2:
                        _d.sent();
                        // When clearing errors using data from the useOnyx hook
                        (0, Tag_1.clearPolicyTagListErrors)({ policyID: fakePolicy.id, tagListIndex: 0, policyTags: result.current[0] });
                        return [4 /*yield*/, (0, waitForBatchedUpdates_1.default)()];
                    case 3:
                        _d.sent();
                        return [4 /*yield*/, TestHelper.getOnyxData({
                                key: "".concat(ONYXKEYS_1.default.COLLECTION.POLICY_TAGS).concat(fakePolicy.id),
                                callback: function (val) { return (updatedPolicyTags = val); },
                            })];
                    case 4:
                        _d.sent();
                        // Then the errors should be cleared and other properties should remain unchanged
                        expect(updatedPolicyTags === null || updatedPolicyTags === void 0 ? void 0 : updatedPolicyTags[tagListName]).toBeDefined();
                        expect((_a = updatedPolicyTags === null || updatedPolicyTags === void 0 ? void 0 : updatedPolicyTags[tagListName]) === null || _a === void 0 ? void 0 : _a.errors).toBeUndefined();
                        expect((_b = updatedPolicyTags === null || updatedPolicyTags === void 0 ? void 0 : updatedPolicyTags[tagListName]) === null || _b === void 0 ? void 0 : _b.name).toBe(tagListName);
                        expect((_c = updatedPolicyTags === null || updatedPolicyTags === void 0 ? void 0 : updatedPolicyTags[tagListName]) === null || _c === void 0 ? void 0 : _c.orderWeight).toBe(0);
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('ClearPolicyTagErrors', function () {
        it('should clear errors for a tag', function () { return __awaiter(void 0, void 0, void 0, function () {
            var fakePolicy, tagListName, fakePolicyTags, tagNames, tagToClear, tagToKeep, updatedPolicyTags;
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p;
            return __generator(this, function (_q) {
                switch (_q.label) {
                    case 0:
                        fakePolicy = (0, policies_1.default)(0);
                        tagListName = 'Test tag';
                        fakePolicyTags = (0, policyTags_1.default)(tagListName, 2);
                        tagNames = Object.keys((_b = (_a = fakePolicyTags === null || fakePolicyTags === void 0 ? void 0 : fakePolicyTags[tagListName]) === null || _a === void 0 ? void 0 : _a.tags) !== null && _b !== void 0 ? _b : {});
                        tagToClear = (_c = tagNames.at(0)) !== null && _c !== void 0 ? _c : '';
                        tagToKeep = (_d = tagNames.at(1)) !== null && _d !== void 0 ? _d : '';
                        // Add errors to both tags
                        fakePolicyTags[tagListName].tags[tagToClear] = __assign(__assign({}, fakePolicyTags[tagListName].tags[tagToClear]), { errors: { field: 'Error on first tag' }, pendingAction: CONST_1.default.RED_BRICK_ROAD_PENDING_ACTION.UPDATE });
                        fakePolicyTags[tagListName].tags[tagToKeep] = __assign(__assign({}, fakePolicyTags[tagListName].tags[tagToKeep]), { errors: { field: 'Error on second tag' }, pendingAction: CONST_1.default.RED_BRICK_ROAD_PENDING_ACTION.UPDATE });
                        return [4 /*yield*/, react_native_onyx_1.default.set("".concat(ONYXKEYS_1.default.COLLECTION.POLICY_TAGS).concat(fakePolicy.id), fakePolicyTags)];
                    case 1:
                        _q.sent();
                        // Clear errors only for the first tag
                        (0, Tag_1.clearPolicyTagErrors)({ policyID: fakePolicy.id, tagName: tagToClear, tagListIndex: 0, policyTags: fakePolicyTags });
                        return [4 /*yield*/, (0, waitForBatchedUpdates_1.default)()];
                    case 2:
                        _q.sent();
                        return [4 /*yield*/, TestHelper.getOnyxData({
                                key: "".concat(ONYXKEYS_1.default.COLLECTION.POLICY_TAGS).concat(fakePolicy.id),
                                callback: function (val) { return (updatedPolicyTags = val); },
                            })];
                    case 3:
                        _q.sent();
                        // Verify that the first tag has errors cleared
                        expect((_e = updatedPolicyTags === null || updatedPolicyTags === void 0 ? void 0 : updatedPolicyTags[tagListName]) === null || _e === void 0 ? void 0 : _e.tags[tagToClear]).toBeDefined();
                        expect((_f = updatedPolicyTags === null || updatedPolicyTags === void 0 ? void 0 : updatedPolicyTags[tagListName]) === null || _f === void 0 ? void 0 : _f.tags[tagToClear].name).toBe(tagToClear);
                        expect((_g = updatedPolicyTags === null || updatedPolicyTags === void 0 ? void 0 : updatedPolicyTags[tagListName]) === null || _g === void 0 ? void 0 : _g.tags[tagToClear].enabled).toBe(true);
                        expect((_h = updatedPolicyTags === null || updatedPolicyTags === void 0 ? void 0 : updatedPolicyTags[tagListName]) === null || _h === void 0 ? void 0 : _h.tags[tagToClear].errors).toBeUndefined();
                        expect((_j = updatedPolicyTags === null || updatedPolicyTags === void 0 ? void 0 : updatedPolicyTags[tagListName]) === null || _j === void 0 ? void 0 : _j.tags[tagToClear].pendingAction).toBeUndefined();
                        // Verify that the second tag still has errors
                        expect((_k = updatedPolicyTags === null || updatedPolicyTags === void 0 ? void 0 : updatedPolicyTags[tagListName]) === null || _k === void 0 ? void 0 : _k.tags[tagToKeep]).toBeDefined();
                        expect((_l = updatedPolicyTags === null || updatedPolicyTags === void 0 ? void 0 : updatedPolicyTags[tagListName]) === null || _l === void 0 ? void 0 : _l.tags[tagToKeep].name).toBe(tagToKeep);
                        expect((_m = updatedPolicyTags === null || updatedPolicyTags === void 0 ? void 0 : updatedPolicyTags[tagListName]) === null || _m === void 0 ? void 0 : _m.tags[tagToKeep].enabled).toBe(true);
                        expect((_o = updatedPolicyTags === null || updatedPolicyTags === void 0 ? void 0 : updatedPolicyTags[tagListName]) === null || _o === void 0 ? void 0 : _o.tags[tagToKeep].errors).toEqual({ field: 'Error on second tag' });
                        expect((_p = updatedPolicyTags === null || updatedPolicyTags === void 0 ? void 0 : updatedPolicyTags[tagListName]) === null || _p === void 0 ? void 0 : _p.tags[tagToKeep].pendingAction).toBe(CONST_1.default.RED_BRICK_ROAD_PENDING_ACTION.UPDATE);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should delete tag when pendingAction is ADD', function () { return __awaiter(void 0, void 0, void 0, function () {
            var fakePolicy, tagListName, fakePolicyTags, tagName, updatedPolicyTags;
            var _a, _b, _c, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        fakePolicy = (0, policies_1.default)(0);
                        tagListName = 'Test tag';
                        fakePolicyTags = (0, policyTags_1.default)(tagListName, 1);
                        tagName = (_c = Object.keys((_b = (_a = fakePolicyTags === null || fakePolicyTags === void 0 ? void 0 : fakePolicyTags[tagListName]) === null || _a === void 0 ? void 0 : _a.tags) !== null && _b !== void 0 ? _b : {}).at(0)) !== null && _c !== void 0 ? _c : '';
                        fakePolicyTags[tagListName].tags[tagName] = __assign(__assign({}, fakePolicyTags[tagListName].tags[tagName]), { pendingAction: CONST_1.default.RED_BRICK_ROAD_PENDING_ACTION.ADD });
                        return [4 /*yield*/, react_native_onyx_1.default.set("".concat(ONYXKEYS_1.default.COLLECTION.POLICY_TAGS).concat(fakePolicy.id), fakePolicyTags)];
                    case 1:
                        _e.sent();
                        (0, Tag_1.clearPolicyTagErrors)({ policyID: fakePolicy.id, tagName: tagName, tagListIndex: 0, policyTags: fakePolicyTags });
                        return [4 /*yield*/, (0, waitForBatchedUpdates_1.default)()];
                    case 2:
                        _e.sent();
                        return [4 /*yield*/, TestHelper.getOnyxData({
                                key: "".concat(ONYXKEYS_1.default.COLLECTION.POLICY_TAGS).concat(fakePolicy.id),
                                callback: function (val) { return (updatedPolicyTags = val); },
                            })];
                    case 3:
                        _e.sent();
                        expect((_d = updatedPolicyTags === null || updatedPolicyTags === void 0 ? void 0 : updatedPolicyTags[tagListName]) === null || _d === void 0 ? void 0 : _d.tags[tagName]).toBeUndefined();
                        return [2 /*return*/];
                }
            });
        }); });
        it('should return early if tag does not exist', function () {
            var fakePolicy = (0, policies_1.default)(0);
            var tagListName = 'Test tag';
            var fakePolicyTags = (0, policyTags_1.default)(tagListName, 2);
            var nonExistentTagName = 'nonExistentTag';
            (0, Tag_1.clearPolicyTagErrors)({ policyID: fakePolicy.id, tagName: nonExistentTagName, tagListIndex: 0, policyTags: fakePolicyTags });
            var existingTagNames = Object.keys(fakePolicyTags[tagListName].tags);
            expect(existingTagNames).toHaveLength(2);
            expect(fakePolicyTags[tagListName].tags[nonExistentTagName]).toBeUndefined();
        });
        it('should work with data from useOnyx hook', function () { return __awaiter(void 0, void 0, void 0, function () {
            var fakePolicy, tagListName, fakePolicyTags, tagName, result, updatedPolicyTags;
            var _a, _b, _c, _d, _e, _f, _g, _h;
            return __generator(this, function (_j) {
                switch (_j.label) {
                    case 0:
                        fakePolicy = (0, policies_1.default)(0);
                        tagListName = 'Test tag';
                        fakePolicyTags = (0, policyTags_1.default)(tagListName, 1);
                        tagName = (_c = Object.keys((_b = (_a = fakePolicyTags === null || fakePolicyTags === void 0 ? void 0 : fakePolicyTags[tagListName]) === null || _a === void 0 ? void 0 : _a.tags) !== null && _b !== void 0 ? _b : {}).at(0)) !== null && _c !== void 0 ? _c : '';
                        fakePolicyTags[tagListName].tags[tagName] = __assign(__assign({}, fakePolicyTags[tagListName].tags[tagName]), { errors: { field: 'Test error' }, pendingAction: CONST_1.default.RED_BRICK_ROAD_PENDING_ACTION.UPDATE });
                        return [4 /*yield*/, react_native_onyx_1.default.set("".concat(ONYXKEYS_1.default.COLLECTION.POLICY_TAGS).concat(fakePolicy.id), fakePolicyTags)];
                    case 1:
                        _j.sent();
                        result = (0, react_native_1.renderHook)(function () { return (0, useOnyx_1.default)("".concat(ONYXKEYS_1.default.COLLECTION.POLICY_TAGS).concat(fakePolicy.id)); }).result;
                        (0, Tag_1.clearPolicyTagErrors)({ policyID: fakePolicy.id, tagName: tagName, tagListIndex: 0, policyTags: result.current[0] });
                        return [4 /*yield*/, (0, waitForBatchedUpdates_1.default)()];
                    case 2:
                        _j.sent();
                        return [4 /*yield*/, TestHelper.getOnyxData({
                                key: "".concat(ONYXKEYS_1.default.COLLECTION.POLICY_TAGS).concat(fakePolicy.id),
                                callback: function (val) { return (updatedPolicyTags = val); },
                            })];
                    case 3:
                        _j.sent();
                        expect((_d = updatedPolicyTags === null || updatedPolicyTags === void 0 ? void 0 : updatedPolicyTags[tagListName]) === null || _d === void 0 ? void 0 : _d.tags[tagName]).toBeDefined();
                        expect((_e = updatedPolicyTags === null || updatedPolicyTags === void 0 ? void 0 : updatedPolicyTags[tagListName]) === null || _e === void 0 ? void 0 : _e.tags[tagName].name).toBe(tagName);
                        expect((_f = updatedPolicyTags === null || updatedPolicyTags === void 0 ? void 0 : updatedPolicyTags[tagListName]) === null || _f === void 0 ? void 0 : _f.tags[tagName].enabled).toBe(true);
                        expect((_g = updatedPolicyTags === null || updatedPolicyTags === void 0 ? void 0 : updatedPolicyTags[tagListName]) === null || _g === void 0 ? void 0 : _g.tags[tagName].errors).toBeUndefined();
                        expect((_h = updatedPolicyTags === null || updatedPolicyTags === void 0 ? void 0 : updatedPolicyTags[tagListName]) === null || _h === void 0 ? void 0 : _h.tags[tagName].pendingAction).toBeUndefined();
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('ClearPolicyTagListErrorField', function () {
        it('should clear specific error field from tag list', function () { return __awaiter(void 0, void 0, void 0, function () {
            var fakePolicy, tagListName, fakePolicyTags, updatedPolicyTags;
            var _a, _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        fakePolicy = (0, policies_1.default)(0);
                        tagListName = 'Test tag list';
                        fakePolicyTags = (0, policyTags_1.default)(tagListName, 2);
                        fakePolicyTags[tagListName] = __assign(__assign({}, fakePolicyTags[tagListName]), { errorFields: {
                                name: { genericError: 'Name error' },
                                required: { genericError: 'Required error' },
                                maxTagsSelected: { genericError: 'Max tags error' },
                            } });
                        return [4 /*yield*/, react_native_onyx_1.default.set("".concat(ONYXKEYS_1.default.COLLECTION.POLICY_TAGS).concat(fakePolicy.id), fakePolicyTags)];
                    case 1:
                        _d.sent();
                        // When clearing only the 'required' error field from the tag list
                        (0, Tag_1.clearPolicyTagListErrorField)({ policyID: fakePolicy.id, tagListIndex: 0, errorField: 'required', policyTags: fakePolicyTags });
                        return [4 /*yield*/, (0, waitForBatchedUpdates_1.default)()];
                    case 2:
                        _d.sent();
                        return [4 /*yield*/, TestHelper.getOnyxData({
                                key: "".concat(ONYXKEYS_1.default.COLLECTION.POLICY_TAGS).concat(fakePolicy.id),
                                callback: function (val) { return (updatedPolicyTags = val); },
                            })];
                    case 3:
                        _d.sent();
                        // Then only the 'required' error field should be cleared while other error fields remain
                        expect(updatedPolicyTags === null || updatedPolicyTags === void 0 ? void 0 : updatedPolicyTags[tagListName]).toBeDefined();
                        expect((_a = updatedPolicyTags === null || updatedPolicyTags === void 0 ? void 0 : updatedPolicyTags[tagListName].errorFields) === null || _a === void 0 ? void 0 : _a.required).toBeUndefined();
                        expect((_b = updatedPolicyTags === null || updatedPolicyTags === void 0 ? void 0 : updatedPolicyTags[tagListName].errorFields) === null || _b === void 0 ? void 0 : _b.name).toEqual({ genericError: 'Name error' });
                        expect((_c = updatedPolicyTags === null || updatedPolicyTags === void 0 ? void 0 : updatedPolicyTags[tagListName].errorFields) === null || _c === void 0 ? void 0 : _c.maxTagsSelected).toEqual({ genericError: 'Max tags error' });
                        return [2 /*return*/];
                }
            });
        }); });
        it('should not modify Onyx data when tag list does not exist', function () { return __awaiter(void 0, void 0, void 0, function () {
            var fakePolicy, fakePolicyTags, updatedPolicyTags;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        fakePolicy = (0, policies_1.default)(0);
                        fakePolicyTags = {};
                        return [4 /*yield*/, react_native_onyx_1.default.set("".concat(ONYXKEYS_1.default.COLLECTION.POLICY_TAGS).concat(fakePolicy.id), fakePolicyTags)];
                    case 1:
                        _a.sent();
                        // When attempting to clear an error field from a non-existent tag list
                        expect(function () {
                            (0, Tag_1.clearPolicyTagListErrorField)({ policyID: fakePolicy.id, tagListIndex: 0, errorField: 'required', policyTags: fakePolicyTags });
                        }).not.toThrow();
                        return [4 /*yield*/, TestHelper.getOnyxData({
                                key: "".concat(ONYXKEYS_1.default.COLLECTION.POLICY_TAGS).concat(fakePolicy.id),
                                callback: function (val) { return (updatedPolicyTags = val); },
                            })];
                    case 2:
                        _a.sent();
                        // Then the policy tags should remain unchanged because the tag list does not exist
                        expect(updatedPolicyTags).toEqual(fakePolicyTags);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should not modify Onyx data when tag list has no name', function () { return __awaiter(void 0, void 0, void 0, function () {
            var fakePolicy, tagListName, fakePolicyTags, updatedPolicyTags;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        fakePolicy = (0, policies_1.default)(0);
                        tagListName = 'Test tag list';
                        fakePolicyTags = (0, policyTags_1.default)(tagListName, 1);
                        fakePolicyTags[tagListName] = __assign(__assign({}, fakePolicyTags[tagListName]), { name: '', errorFields: {
                                required: { genericError: 'This error should not be cleared' },
                                name: { genericError: 'This error should also remain' },
                            } });
                        return [4 /*yield*/, react_native_onyx_1.default.set("".concat(ONYXKEYS_1.default.COLLECTION.POLICY_TAGS).concat(fakePolicy.id), fakePolicyTags)];
                    case 1:
                        _c.sent();
                        // When attempting to clear an error field from a tag list with no name
                        expect(function () {
                            (0, Tag_1.clearPolicyTagListErrorField)({ policyID: fakePolicy.id, tagListIndex: 0, errorField: 'required', policyTags: fakePolicyTags });
                        }).not.toThrow();
                        return [4 /*yield*/, (0, waitForBatchedUpdates_1.default)()];
                    case 2:
                        _c.sent();
                        return [4 /*yield*/, TestHelper.getOnyxData({
                                key: "".concat(ONYXKEYS_1.default.COLLECTION.POLICY_TAGS).concat(fakePolicy.id),
                                callback: function (val) { return (updatedPolicyTags = val); },
                            })];
                    case 3:
                        _c.sent();
                        // Then the error fields should remain unchanged because the tag list name is empty
                        expect((_a = updatedPolicyTags === null || updatedPolicyTags === void 0 ? void 0 : updatedPolicyTags[tagListName].errorFields) === null || _a === void 0 ? void 0 : _a.required).toEqual({ genericError: 'This error should not be cleared' });
                        expect((_b = updatedPolicyTags === null || updatedPolicyTags === void 0 ? void 0 : updatedPolicyTags[tagListName].errorFields) === null || _b === void 0 ? void 0 : _b.name).toEqual({ genericError: 'This error should also remain' });
                        expect(updatedPolicyTags === null || updatedPolicyTags === void 0 ? void 0 : updatedPolicyTags[tagListName].name).toBe('');
                        return [2 /*return*/];
                }
            });
        }); });
        it('should work with data from useOnyx hook', function () { return __awaiter(void 0, void 0, void 0, function () {
            var fakePolicy, tagListName, fakePolicyTags, result, updatedPolicyTags;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        fakePolicy = (0, policies_1.default)(0);
                        tagListName = 'Test tag list';
                        fakePolicyTags = (0, policyTags_1.default)(tagListName, 1);
                        fakePolicyTags[tagListName] = __assign(__assign({}, fakePolicyTags[tagListName]), { errorFields: {
                                required: { genericError: 'Required field error' },
                                name: { genericError: 'Name field error' },
                            } });
                        return [4 /*yield*/, react_native_onyx_1.default.set("".concat(ONYXKEYS_1.default.COLLECTION.POLICY_TAGS).concat(fakePolicy.id), fakePolicyTags)];
                    case 1:
                        _c.sent();
                        result = (0, react_native_1.renderHook)(function () { return (0, useOnyx_1.default)("".concat(ONYXKEYS_1.default.COLLECTION.POLICY_TAGS).concat(fakePolicy.id)); }).result;
                        return [4 /*yield*/, (0, react_native_1.waitFor)(function () {
                                expect(result.current[0]).toBeDefined();
                            })];
                    case 2:
                        _c.sent();
                        // When clearing the 'name' error field using data from the useOnyx hook
                        (0, Tag_1.clearPolicyTagListErrorField)({ policyID: fakePolicy.id, tagListIndex: 0, errorField: 'name', policyTags: result.current[0] });
                        return [4 /*yield*/, (0, waitForBatchedUpdates_1.default)()];
                    case 3:
                        _c.sent();
                        return [4 /*yield*/, TestHelper.getOnyxData({
                                key: "".concat(ONYXKEYS_1.default.COLLECTION.POLICY_TAGS).concat(fakePolicy.id),
                                callback: function (val) { return (updatedPolicyTags = val); },
                            })];
                    case 4:
                        _c.sent();
                        // Then only the 'name' error field should be cleared while the 'required' error field remains
                        expect((_a = updatedPolicyTags === null || updatedPolicyTags === void 0 ? void 0 : updatedPolicyTags[tagListName].errorFields) === null || _a === void 0 ? void 0 : _a.name).toBeUndefined();
                        expect((_b = updatedPolicyTags === null || updatedPolicyTags === void 0 ? void 0 : updatedPolicyTags[tagListName].errorFields) === null || _b === void 0 ? void 0 : _b.required).toEqual({ genericError: 'Required field error' });
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('buildOptimisticPolicyRecentlyUsedTags', function () {
        it('should return empty object when transactionTags is undefined', function () {
            var result = (0, Tag_1.buildOptimisticPolicyRecentlyUsedTags)({
                policyTags: {},
                policyRecentlyUsedTags: {},
                transactionTags: undefined,
            });
            expect(result).toEqual({});
        });
        it('should return empty object when transactionTags is empty string', function () {
            var result = (0, Tag_1.buildOptimisticPolicyRecentlyUsedTags)({
                policyTags: {
                    Tag: {
                        name: 'Tag',
                        orderWeight: 0,
                        required: false,
                        tags: {
                            Engineering: { name: 'Engineering', enabled: true },
                            Marketing: { name: 'Marketing', enabled: true },
                            Sales: { name: 'Sales', enabled: true },
                        },
                    },
                },
                policyRecentlyUsedTags: {
                    Tag: ['Marketing', 'Sales'],
                },
                transactionTags: '',
            });
            expect(result).toEqual({});
        });
        it('should build optimistic recently used tags', function () {
            var result = (0, Tag_1.buildOptimisticPolicyRecentlyUsedTags)({
                policyTags: {
                    Tag: {
                        name: 'Tag',
                        orderWeight: 0,
                        required: false,
                        tags: {
                            Engineering: { name: 'Engineering', enabled: true },
                            Marketing: { name: 'Marketing', enabled: true },
                            Sales: { name: 'Sales', enabled: true },
                        },
                    },
                },
                policyRecentlyUsedTags: {
                    Tag: ['Marketing', 'Sales'],
                },
                transactionTags: 'Engineering',
            });
            expect(result).toEqual({
                Tag: ['Engineering', 'Marketing', 'Sales'],
            });
        });
        it('should handle multi-level tags', function () {
            var result = (0, Tag_1.buildOptimisticPolicyRecentlyUsedTags)({
                policyTags: {
                    Tag: {
                        name: 'Tag',
                        orderWeight: 0,
                        required: false,
                        tags: {
                            Engineering: { name: 'Engineering', enabled: true },
                            Marketing: { name: 'Marketing', enabled: true },
                        },
                    },
                    Team: {
                        name: 'Team',
                        orderWeight: 1,
                        required: false,
                        tags: {
                            Frontend: { name: 'Frontend', enabled: true },
                            Backend: { name: 'Backend', enabled: true },
                        },
                    },
                },
                policyRecentlyUsedTags: {
                    Tag: ['Marketing'],
                    Team: ['Backend', 'DevOps'],
                },
                transactionTags: 'Engineering:Frontend',
            });
            expect(result).toEqual({
                Tag: ['Engineering', 'Marketing'],
                Team: ['Frontend', 'Backend', 'DevOps'],
            });
        });
        it('should handle missing recently used tags', function () {
            var result = (0, Tag_1.buildOptimisticPolicyRecentlyUsedTags)({
                policyTags: {
                    Tag: {
                        name: 'Tag',
                        orderWeight: 0,
                        required: false,
                        tags: {
                            Engineering: { name: 'Engineering', enabled: true },
                        },
                    },
                },
                policyRecentlyUsedTags: {},
                transactionTags: 'Engineering',
            });
            expect(result).toEqual({
                Tag: ['Engineering'],
            });
        });
        it('should prevent duplicate tags in recently used array', function () {
            var result = (0, Tag_1.buildOptimisticPolicyRecentlyUsedTags)({
                policyTags: {
                    Tag: {
                        name: 'Tag',
                        orderWeight: 0,
                        required: false,
                        tags: {
                            Engineering: { name: 'Engineering', enabled: true },
                        },
                    },
                },
                policyRecentlyUsedTags: {
                    Tag: ['Engineering', 'Marketing', 'Sales'],
                },
                transactionTags: 'Engineering',
            });
            expect(result).toEqual({
                Tag: ['Engineering', 'Marketing', 'Sales'],
            });
        });
        it('should handle mismatched recently used tags keys', function () {
            var result = (0, Tag_1.buildOptimisticPolicyRecentlyUsedTags)({
                policyTags: {
                    Tag: {
                        name: 'Tag',
                        orderWeight: 0,
                        required: false,
                        tags: {
                            Engineering: { name: 'Engineering', enabled: true },
                        },
                    },
                    Team: {
                        name: 'Team',
                        orderWeight: 1,
                        required: false,
                        tags: {
                            Frontend: { name: 'Frontend', enabled: true },
                        },
                    },
                },
                policyRecentlyUsedTags: {
                    OldTag: ['Marketing'],
                    Team: ['Backend'],
                    AnotherOldList: ['SomeTag'],
                },
                transactionTags: 'Engineering:Frontend',
            });
            expect(result).toEqual({
                Tag: ['Engineering'],
                Team: ['Frontend', 'Backend'],
            });
        });
        it('should handle empty policy tags', function () {
            var result = (0, Tag_1.buildOptimisticPolicyRecentlyUsedTags)({
                policyTags: {},
                policyRecentlyUsedTags: {},
                transactionTags: 'Engineering',
            });
            expect(result).toEqual({
                // eslint-disable-next-line @typescript-eslint/naming-convention
                '': ['Engineering'],
            });
        });
        it('should work with useOnyx data integration', function () { return __awaiter(void 0, void 0, void 0, function () {
            function useTestHook() {
                var policyTagsFromOnyx = (0, useOnyx_1.default)("".concat(ONYXKEYS_1.default.COLLECTION.POLICY_TAGS).concat(policyID), { canBeMissing: true })[0];
                var policyRecentlyUsedTagsFromOnyx = (0, useOnyx_1.default)("".concat(ONYXKEYS_1.default.COLLECTION.POLICY_RECENTLY_USED_TAGS).concat(policyID), { canBeMissing: true })[0];
                return (0, Tag_1.buildOptimisticPolicyRecentlyUsedTags)({
                    policyTags: policyTagsFromOnyx !== null && policyTagsFromOnyx !== void 0 ? policyTagsFromOnyx : {},
                    policyRecentlyUsedTags: policyRecentlyUsedTagsFromOnyx !== null && policyRecentlyUsedTagsFromOnyx !== void 0 ? policyRecentlyUsedTagsFromOnyx : {},
                    transactionTags: transactionTags,
                });
            }
            var policyID, transactionTags, policyTags, existingRecentlyUsedTags, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        policyID = 'policy123';
                        transactionTags = 'Engineering';
                        policyTags = {
                            Tag: {
                                name: 'Tag',
                                orderWeight: 0,
                                required: false,
                                tags: {
                                    Engineering: { name: 'Engineering', enabled: true },
                                    Marketing: { name: 'Marketing', enabled: true },
                                    Sales: { name: 'Sales', enabled: true },
                                },
                            },
                        };
                        existingRecentlyUsedTags = {
                            Tag: ['Marketing', 'Sales'],
                        };
                        return [4 /*yield*/, react_native_onyx_1.default.set("".concat(ONYXKEYS_1.default.COLLECTION.POLICY_TAGS).concat(policyID), policyTags)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, react_native_onyx_1.default.set("".concat(ONYXKEYS_1.default.COLLECTION.POLICY_RECENTLY_USED_TAGS).concat(policyID), existingRecentlyUsedTags)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, (0, waitForBatchedUpdates_1.default)()];
                    case 3:
                        _a.sent();
                        result = (0, react_native_1.renderHook)(function () { return useTestHook(); }).result;
                        return [4 /*yield*/, (0, react_native_1.waitFor)(function () {
                                expect(result.current).toEqual({
                                    Tag: ['Engineering', 'Marketing', 'Sales'],
                                });
                            })];
                    case 4:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('EnablePolicyTags', function () {
        it('should enable tags and create default tag list if none exists', function () { return __awaiter(void 0, void 0, void 0, function () {
            var fakePolicy, _a, policyData, rerender, defaultTag;
            var _b, _c, _d, _e, _f, _g, _h;
            return __generator(this, function (_j) {
                switch (_j.label) {
                    case 0:
                        fakePolicy = (0, policies_1.default)(0);
                        fakePolicy.areTagsEnabled = false;
                        mockFetch.pause();
                        return [4 /*yield*/, react_native_onyx_1.default.set("".concat(ONYXKEYS_1.default.COLLECTION.POLICY).concat(fakePolicy.id), fakePolicy)];
                    case 1:
                        _j.sent();
                        return [4 /*yield*/, (0, waitForBatchedUpdates_1.default)()];
                    case 2:
                        _j.sent();
                        _a = (0, react_native_1.renderHook)(function () { return (0, usePolicyData_1.default)(fakePolicy.id); }, { wrapper: OnyxListItemProvider_1.default }), policyData = _a.result, rerender = _a.rerender;
                        // When enabling tags
                        (0, Tag_1.enablePolicyTags)(policyData.current, true);
                        return [4 /*yield*/, (0, waitForBatchedUpdates_1.default)()];
                    case 3:
                        _j.sent();
                        rerender(fakePolicy.id);
                        // Then the policy should be updated optimistically
                        expect((_b = policyData.current.policy) === null || _b === void 0 ? void 0 : _b.areTagsEnabled).toBe(true);
                        expect((_d = (_c = policyData.current.policy) === null || _c === void 0 ? void 0 : _c.pendingFields) === null || _d === void 0 ? void 0 : _d.areTagsEnabled).toBe(CONST_1.default.RED_BRICK_ROAD_PENDING_ACTION.UPDATE);
                        defaultTag = Object.values((_f = (_e = policyData.current) === null || _e === void 0 ? void 0 : _e.tags) !== null && _f !== void 0 ? _f : {}).at(0);
                        expect(defaultTag === null || defaultTag === void 0 ? void 0 : defaultTag.name).toBe('Tag');
                        expect(defaultTag === null || defaultTag === void 0 ? void 0 : defaultTag.orderWeight).toBe(0);
                        expect(defaultTag === null || defaultTag === void 0 ? void 0 : defaultTag.required).toBe(false);
                        expect(defaultTag === null || defaultTag === void 0 ? void 0 : defaultTag.tags).toEqual({});
                        mockFetch.resume();
                        return [4 /*yield*/, (0, waitForBatchedUpdates_1.default)()];
                    case 4:
                        _j.sent();
                        rerender(fakePolicy.id);
                        // And after API success, pending fields should be cleared
                        expect((_h = (_g = policyData.current.policy) === null || _g === void 0 ? void 0 : _g.pendingFields) === null || _h === void 0 ? void 0 : _h.areTagsEnabled).toBeFalsy();
                        return [2 /*return*/];
                }
            });
        }); });
        it('should disable tags and update existing tag list', function () { return __awaiter(void 0, void 0, void 0, function () {
            var fakePolicy, tagListName, fakePolicyTags, existingTags, _a, policyData, rerender;
            var _b, _c, _d, _e, _f, _g, _h;
            return __generator(this, function (_j) {
                switch (_j.label) {
                    case 0:
                        fakePolicy = (0, policies_1.default)(0);
                        fakePolicy.areTagsEnabled = true;
                        tagListName = 'Tag';
                        fakePolicyTags = (0, policyTags_1.default)(tagListName, 2);
                        existingTags = (_c = (_b = fakePolicyTags[tagListName]) === null || _b === void 0 ? void 0 : _b.tags) !== null && _c !== void 0 ? _c : {};
                        mockFetch.pause();
                        return [4 /*yield*/, react_native_onyx_1.default.set("".concat(ONYXKEYS_1.default.COLLECTION.POLICY).concat(fakePolicy.id), fakePolicy)];
                    case 1:
                        _j.sent();
                        return [4 /*yield*/, react_native_onyx_1.default.set("".concat(ONYXKEYS_1.default.COLLECTION.POLICY_TAGS).concat(fakePolicy.id), fakePolicyTags)];
                    case 2:
                        _j.sent();
                        return [4 /*yield*/, (0, waitForBatchedUpdates_1.default)()];
                    case 3:
                        _j.sent();
                        _a = (0, react_native_1.renderHook)(function () { return (0, usePolicyData_1.default)(fakePolicy.id); }, { wrapper: OnyxListItemProvider_1.default }), policyData = _a.result, rerender = _a.rerender;
                        // When disabling tags
                        (0, Tag_1.enablePolicyTags)(policyData.current, false);
                        return [4 /*yield*/, (0, waitForBatchedUpdates_1.default)()];
                    case 4:
                        _j.sent();
                        // Then the policy should be updated optimistically
                        rerender(fakePolicy.id);
                        expect((_d = policyData.current.policy) === null || _d === void 0 ? void 0 : _d.areTagsEnabled).toBe(false);
                        expect((_e = policyData.current.policy) === null || _e === void 0 ? void 0 : _e.requiresTag).toBe(false);
                        expect((_g = (_f = policyData.current.policy) === null || _f === void 0 ? void 0 : _f.pendingFields) === null || _g === void 0 ? void 0 : _g.areTagsEnabled).toBe(CONST_1.default.RED_BRICK_ROAD_PENDING_ACTION.UPDATE);
                        // And all tags should be disabled
                        Object.keys(existingTags).forEach(function (tagName) {
                            var _a, _b, _c, _d;
                            expect((_d = (_c = (_b = (_a = policyData.current) === null || _a === void 0 ? void 0 : _a.tags) === null || _b === void 0 ? void 0 : _b[tagListName]) === null || _c === void 0 ? void 0 : _c.tags[tagName]) === null || _d === void 0 ? void 0 : _d.enabled).toBe(false);
                        });
                        return [4 /*yield*/, mockFetch.resume()];
                    case 5:
                        _j.sent();
                        return [4 /*yield*/, (0, waitForBatchedUpdates_1.default)()];
                    case 6:
                        _j.sent();
                        // And after API success, pending fields should be cleared
                        rerender(fakePolicy.id);
                        expect((_h = policyData.current.policy) === null || _h === void 0 ? void 0 : _h.pendingFields).toBeDefined();
                        return [2 /*return*/];
                }
            });
        }); });
        it('should reset changes when API returns error', function () { return __awaiter(void 0, void 0, void 0, function () {
            var fakePolicy, _a, policyData, rerender;
            var _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        fakePolicy = (0, policies_1.default)(0);
                        fakePolicy.areTagsEnabled = false;
                        return [4 /*yield*/, react_native_onyx_1.default.set("".concat(ONYXKEYS_1.default.COLLECTION.POLICY).concat(fakePolicy.id), fakePolicy)];
                    case 1:
                        _c.sent();
                        return [4 /*yield*/, (0, waitForBatchedUpdates_1.default)()];
                    case 2:
                        _c.sent();
                        _a = (0, react_native_1.renderHook)(function () { return (0, usePolicyData_1.default)(fakePolicy.id); }, { wrapper: OnyxListItemProvider_1.default }), policyData = _a.result, rerender = _a.rerender;
                        mockFetch.fail();
                        // When enabling tags fails
                        (0, Tag_1.enablePolicyTags)(policyData.current, true);
                        return [4 /*yield*/, (0, waitForBatchedUpdates_1.default)()];
                    case 3:
                        _c.sent();
                        return [4 /*yield*/, mockFetch.resume()];
                    case 4:
                        _c.sent();
                        return [4 /*yield*/, (0, waitForBatchedUpdates_1.default)()];
                    case 5:
                        _c.sent();
                        rerender(fakePolicy.id);
                        // After the API request failure, the policy should be reset to original state
                        expect(policyData.current.policy.areTagsEnabled).toBe(false);
                        expect((_b = policyData.current.policy.pendingFields) === null || _b === void 0 ? void 0 : _b.areTagsEnabled).toBeUndefined();
                        expect(policyData.current.tags).toMatchObject({});
                        return [2 /*return*/];
                }
            });
        }); });
        it('should work with data from useOnyx hook', function () { return __awaiter(void 0, void 0, void 0, function () {
            var fakePolicy, _a, policyData, rerender;
            var _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        fakePolicy = (0, policies_1.default)(0);
                        fakePolicy.areTagsEnabled = false;
                        mockFetch.pause();
                        return [4 /*yield*/, react_native_onyx_1.default.set("".concat(ONYXKEYS_1.default.COLLECTION.POLICY).concat(fakePolicy.id), fakePolicy)];
                    case 1:
                        _d.sent();
                        return [4 /*yield*/, (0, waitForBatchedUpdates_1.default)()];
                    case 2:
                        _d.sent();
                        _a = (0, react_native_1.renderHook)(function () { return (0, usePolicyData_1.default)(fakePolicy.id); }, { wrapper: OnyxListItemProvider_1.default }), policyData = _a.result, rerender = _a.rerender;
                        expect(policyData.current.policy).toBeDefined();
                        (0, Tag_1.enablePolicyTags)(policyData.current, true);
                        return [4 /*yield*/, (0, waitForBatchedUpdates_1.default)()];
                    case 3:
                        _d.sent();
                        rerender(fakePolicy.id);
                        // Then the policy should be updated optimistically
                        expect(policyData.current.policy.areTagsEnabled).toBe(true);
                        expect((_b = policyData.current.policy.pendingFields) === null || _b === void 0 ? void 0 : _b.areTagsEnabled).toBe(CONST_1.default.RED_BRICK_ROAD_PENDING_ACTION.UPDATE);
                        return [4 /*yield*/, mockFetch.resume()];
                    case 4:
                        _d.sent();
                        return [4 /*yield*/, (0, waitForBatchedUpdates_1.default)()];
                    case 5:
                        _d.sent();
                        rerender(fakePolicy.id);
                        // And after API success, policy should be enabled
                        expect(policyData.current.policy.areTagsEnabled).toBe(true);
                        expect((_c = policyData.current.policy.pendingFields) === null || _c === void 0 ? void 0 : _c.areTagsEnabled).toBeUndefined();
                        // And default tag list should be created
                        expect(policyData.current.tags.Tag).toBeDefined();
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('SetPolicyTagsRequired', function () {
        it('should set tag list as required when requiresTag is true', function () { return __awaiter(void 0, void 0, void 0, function () {
            var fakePolicy, tagListName, fakePolicyTags, _a, policyData, rerender, updatedPolicyTags;
            var _b, _c, _d, _e, _f, _g;
            return __generator(this, function (_h) {
                switch (_h.label) {
                    case 0:
                        fakePolicy = (0, policies_1.default)(0);
                        tagListName = 'Test Tag List';
                        fakePolicyTags = (0, policyTags_1.default)(tagListName, 2);
                        fakePolicyTags[tagListName] = __assign(__assign({}, fakePolicyTags[tagListName]), { required: false, orderWeight: 0 });
                        mockFetch.pause();
                        return [4 /*yield*/, react_native_onyx_1.default.set("".concat(ONYXKEYS_1.default.COLLECTION.POLICY).concat(fakePolicy.id), fakePolicy)];
                    case 1:
                        _h.sent();
                        return [4 /*yield*/, react_native_onyx_1.default.set("".concat(ONYXKEYS_1.default.COLLECTION.POLICY_TAGS).concat(fakePolicy.id), fakePolicyTags)];
                    case 2:
                        _h.sent();
                        return [4 /*yield*/, (0, waitForBatchedUpdates_1.default)()];
                    case 3:
                        _h.sent();
                        _a = (0, react_native_1.renderHook)(function () { return (0, usePolicyData_1.default)(fakePolicy.id); }, { wrapper: OnyxListItemProvider_1.default }), policyData = _a.result, rerender = _a.rerender;
                        // When setPolicyTagsRequired is called with requiresTag = true
                        (0, Tag_1.setPolicyTagsRequired)(policyData.current, true, 0);
                        return [4 /*yield*/, (0, waitForBatchedUpdates_1.default)()];
                    case 4:
                        _h.sent();
                        rerender(fakePolicy.id);
                        updatedPolicyTags = policyData.current.tags;
                        expect((_b = updatedPolicyTags === null || updatedPolicyTags === void 0 ? void 0 : updatedPolicyTags[tagListName]) === null || _b === void 0 ? void 0 : _b.required).toBe(true);
                        // Check optimistic data - pendingFields should be set
                        if ((_d = (_c = updatedPolicyTags === null || updatedPolicyTags === void 0 ? void 0 : updatedPolicyTags[tagListName]) === null || _c === void 0 ? void 0 : _c.pendingFields) === null || _d === void 0 ? void 0 : _d.required) {
                            expect(updatedPolicyTags[tagListName].pendingFields.required).toBe(CONST_1.default.RED_BRICK_ROAD_PENDING_ACTION.UPDATE);
                        }
                        mockFetch.resume();
                        return [4 /*yield*/, (0, waitForBatchedUpdates_1.default)()];
                    case 5:
                        _h.sent();
                        rerender(fakePolicy.id);
                        // Then after API success, pending fields should be cleared
                        updatedPolicyTags = policyData.current.tags;
                        expect((_e = updatedPolicyTags === null || updatedPolicyTags === void 0 ? void 0 : updatedPolicyTags[tagListName]) === null || _e === void 0 ? void 0 : _e.required).toBe(true);
                        expect((_g = (_f = updatedPolicyTags === null || updatedPolicyTags === void 0 ? void 0 : updatedPolicyTags[tagListName]) === null || _f === void 0 ? void 0 : _f.pendingFields) === null || _g === void 0 ? void 0 : _g.required).toBeUndefined();
                        return [2 /*return*/];
                }
            });
        }); });
        it('should set tag list as not required when requiresTag is false', function () { return __awaiter(void 0, void 0, void 0, function () {
            var fakePolicy, tagListName, fakePolicyTags, _a, policyData, rerender, updatedPolicyTags;
            var _b, _c, _d, _e, _f, _g;
            return __generator(this, function (_h) {
                switch (_h.label) {
                    case 0:
                        fakePolicy = (0, policies_1.default)(0);
                        tagListName = 'Test Tag List';
                        fakePolicyTags = (0, policyTags_1.default)(tagListName, 2);
                        fakePolicyTags[tagListName] = __assign(__assign({}, fakePolicyTags[tagListName]), { required: true, orderWeight: 0 });
                        mockFetch.pause();
                        return [4 /*yield*/, react_native_onyx_1.default.set("".concat(ONYXKEYS_1.default.COLLECTION.POLICY).concat(fakePolicy.id), fakePolicy)];
                    case 1:
                        _h.sent();
                        return [4 /*yield*/, react_native_onyx_1.default.set("".concat(ONYXKEYS_1.default.COLLECTION.POLICY_TAGS).concat(fakePolicy.id), fakePolicyTags)];
                    case 2:
                        _h.sent();
                        _a = (0, react_native_1.renderHook)(function () { return (0, usePolicyData_1.default)(fakePolicy.id); }, { wrapper: OnyxListItemProvider_1.default }), policyData = _a.result, rerender = _a.rerender;
                        // When setPolicyTagsRequired is called with requiresTag = false
                        (0, Tag_1.setPolicyTagsRequired)(policyData.current, false, 0);
                        return [4 /*yield*/, (0, waitForBatchedUpdates_1.default)()];
                    case 3:
                        _h.sent();
                        rerender(fakePolicy.id);
                        updatedPolicyTags = policyData.current.tags;
                        expect((_b = updatedPolicyTags === null || updatedPolicyTags === void 0 ? void 0 : updatedPolicyTags[tagListName]) === null || _b === void 0 ? void 0 : _b.required).toBe(false);
                        // Check optimistic data - pendingFields should be set
                        if ((_d = (_c = updatedPolicyTags === null || updatedPolicyTags === void 0 ? void 0 : updatedPolicyTags[tagListName]) === null || _c === void 0 ? void 0 : _c.pendingFields) === null || _d === void 0 ? void 0 : _d.required) {
                            expect(updatedPolicyTags[tagListName].pendingFields.required).toBe(CONST_1.default.RED_BRICK_ROAD_PENDING_ACTION.UPDATE);
                        }
                        mockFetch.resume();
                        return [4 /*yield*/, (0, waitForBatchedUpdates_1.default)()];
                    case 4:
                        _h.sent();
                        rerender(fakePolicy.id);
                        // Then after API success, pending fields should be cleared
                        updatedPolicyTags = policyData.current.tags;
                        expect((_e = updatedPolicyTags === null || updatedPolicyTags === void 0 ? void 0 : updatedPolicyTags[tagListName]) === null || _e === void 0 ? void 0 : _e.required).toBe(false);
                        expect((_g = (_f = updatedPolicyTags === null || updatedPolicyTags === void 0 ? void 0 : updatedPolicyTags[tagListName]) === null || _f === void 0 ? void 0 : _f.pendingFields) === null || _g === void 0 ? void 0 : _g.required).toBeUndefined();
                        return [2 /*return*/];
                }
            });
        }); });
        it('should handle API failure and restore original state with error', function () { return __awaiter(void 0, void 0, void 0, function () {
            var fakePolicy, tagListName, fakePolicyTags, _a, policyData, rerender, updatedPolicyTags;
            var _b, _c, _d, _e, _f;
            return __generator(this, function (_g) {
                switch (_g.label) {
                    case 0:
                        fakePolicy = (0, policies_1.default)(0);
                        tagListName = 'Test Tag List';
                        fakePolicyTags = (0, policyTags_1.default)(tagListName, 2);
                        fakePolicyTags[tagListName] = __assign(__assign({}, fakePolicyTags[tagListName]), { required: false, orderWeight: 0 });
                        mockFetch.pause();
                        return [4 /*yield*/, react_native_onyx_1.default.set("".concat(ONYXKEYS_1.default.COLLECTION.POLICY).concat(fakePolicy.id), fakePolicy)];
                    case 1:
                        _g.sent();
                        return [4 /*yield*/, react_native_onyx_1.default.set("".concat(ONYXKEYS_1.default.COLLECTION.POLICY_TAGS).concat(fakePolicy.id), fakePolicyTags)];
                    case 2:
                        _g.sent();
                        _a = (0, react_native_1.renderHook)(function () { return (0, usePolicyData_1.default)(fakePolicy.id); }, { wrapper: OnyxListItemProvider_1.default }), policyData = _a.result, rerender = _a.rerender;
                        // When setPolicyTagsRequired is called and API fails
                        mockFetch.fail();
                        (0, Tag_1.setPolicyTagsRequired)(policyData.current, true, 0);
                        return [4 /*yield*/, (0, waitForBatchedUpdates_1.default)()];
                    case 3:
                        _g.sent();
                        mockFetch.resume();
                        return [4 /*yield*/, (0, waitForBatchedUpdates_1.default)()];
                    case 4:
                        _g.sent();
                        rerender(fakePolicy.id);
                        updatedPolicyTags = policyData.current.tags;
                        expect((_b = updatedPolicyTags === null || updatedPolicyTags === void 0 ? void 0 : updatedPolicyTags[tagListName]) === null || _b === void 0 ? void 0 : _b.required).toBe(false);
                        expect((_d = (_c = updatedPolicyTags === null || updatedPolicyTags === void 0 ? void 0 : updatedPolicyTags[tagListName]) === null || _c === void 0 ? void 0 : _c.pendingFields) === null || _d === void 0 ? void 0 : _d.required).toBeUndefined();
                        expect((_f = (_e = updatedPolicyTags === null || updatedPolicyTags === void 0 ? void 0 : updatedPolicyTags[tagListName]) === null || _e === void 0 ? void 0 : _e.errorFields) === null || _f === void 0 ? void 0 : _f.required).toBeTruthy();
                        return [2 /*return*/];
                }
            });
        }); });
        it('should work with data from useOnyx hook', function () { return __awaiter(void 0, void 0, void 0, function () {
            var fakePolicy, tagListName, fakePolicyTags, result, _a, policyData, rerender, updatedPolicyTags;
            var _b, _c, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        fakePolicy = (0, policies_1.default)(0);
                        tagListName = 'Test Tag List';
                        fakePolicyTags = (0, policyTags_1.default)(tagListName, 2);
                        fakePolicyTags[tagListName] = __assign(__assign({}, fakePolicyTags[tagListName]), { required: false, orderWeight: 0 });
                        return [4 /*yield*/, react_native_onyx_1.default.set("".concat(ONYXKEYS_1.default.COLLECTION.POLICY).concat(fakePolicy.id), fakePolicy)];
                    case 1:
                        _e.sent();
                        return [4 /*yield*/, react_native_onyx_1.default.set("".concat(ONYXKEYS_1.default.COLLECTION.POLICY_TAGS).concat(fakePolicy.id), fakePolicyTags)];
                    case 2:
                        _e.sent();
                        result = (0, react_native_1.renderHook)(function () { return (0, useOnyx_1.default)("".concat(ONYXKEYS_1.default.COLLECTION.POLICY_TAGS).concat(fakePolicy.id)); }).result;
                        return [4 /*yield*/, (0, react_native_1.waitFor)(function () {
                                expect(result.current[0]).toBeDefined();
                            })];
                    case 3:
                        _e.sent();
                        _a = (0, react_native_1.renderHook)(function () { return (0, usePolicyData_1.default)(fakePolicy.id); }, { wrapper: OnyxListItemProvider_1.default }), policyData = _a.result, rerender = _a.rerender;
                        return [4 /*yield*/, (0, react_native_1.act)(function () { return __awaiter(void 0, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            // When setPolicyTagsRequired is called with data from useOnyx
                                            (0, Tag_1.setPolicyTagsRequired)(policyData.current, true, 0);
                                            return [4 /*yield*/, (0, waitForBatchedUpdates_1.default)()];
                                        case 1:
                                            _a.sent();
                                            return [2 /*return*/];
                                    }
                                });
                            }); })];
                    case 4:
                        _e.sent();
                        rerender(fakePolicy.id);
                        updatedPolicyTags = policyData.current.tags;
                        expect((_b = updatedPolicyTags === null || updatedPolicyTags === void 0 ? void 0 : updatedPolicyTags[tagListName]) === null || _b === void 0 ? void 0 : _b.required).toBe(true);
                        // Check optimistic data - pendingFields should be set
                        if ((_d = (_c = updatedPolicyTags === null || updatedPolicyTags === void 0 ? void 0 : updatedPolicyTags[tagListName]) === null || _c === void 0 ? void 0 : _c.pendingFields) === null || _d === void 0 ? void 0 : _d.required) {
                            expect(updatedPolicyTags[tagListName].pendingFields.required).toBe(CONST_1.default.RED_BRICK_ROAD_PENDING_ACTION.UPDATE);
                        }
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('SetPolicyTagGLCode', function () {
        it('should update GL code for a tag with optimistic and success data', function () { return __awaiter(void 0, void 0, void 0, function () {
            var fakePolicy, tagListName, fakePolicyTags, tagName, newGLCode, updatedPolicyTags;
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
            return __generator(this, function (_o) {
                switch (_o.label) {
                    case 0:
                        fakePolicy = (0, policies_1.default)(0);
                        tagListName = 'Test Tag List';
                        fakePolicyTags = (0, policyTags_1.default)(tagListName, 1);
                        tagName = (_c = Object.keys((_b = (_a = fakePolicyTags === null || fakePolicyTags === void 0 ? void 0 : fakePolicyTags[tagListName]) === null || _a === void 0 ? void 0 : _a.tags) !== null && _b !== void 0 ? _b : {}).at(0)) !== null && _c !== void 0 ? _c : '';
                        newGLCode = 'NEW_GL_CODE_123';
                        // Set initial GL Code
                        fakePolicyTags[tagListName].tags[tagName] = __assign(__assign({}, fakePolicyTags[tagListName].tags[tagName]), { 
                            // eslint-disable-next-line @typescript-eslint/naming-convention
                            'GL Code': 'OLD_GL_CODE_456' });
                        mockFetch.pause();
                        return [4 /*yield*/, react_native_onyx_1.default.set("".concat(ONYXKEYS_1.default.COLLECTION.POLICY_TAGS).concat(fakePolicy.id), fakePolicyTags)];
                    case 1:
                        _o.sent();
                        // When setPolicyTagGLCode is called with a new GL code
                        (0, Tag_1.setPolicyTagGLCode)({ policyID: fakePolicy.id, tagName: tagName, tagListIndex: 0, glCode: newGLCode, policyTags: fakePolicyTags });
                        return [4 /*yield*/, (0, waitForBatchedUpdates_1.default)()];
                    case 2:
                        _o.sent();
                        return [4 /*yield*/, OnyxUtils_1.default.get("".concat(ONYXKEYS_1.default.COLLECTION.POLICY_TAGS).concat(fakePolicy.id))];
                    case 3:
                        updatedPolicyTags = _o.sent();
                        expect((_d = updatedPolicyTags === null || updatedPolicyTags === void 0 ? void 0 : updatedPolicyTags[tagListName]) === null || _d === void 0 ? void 0 : _d.tags[tagName]['GL Code']).toBe(newGLCode);
                        expect((_e = updatedPolicyTags === null || updatedPolicyTags === void 0 ? void 0 : updatedPolicyTags[tagListName]) === null || _e === void 0 ? void 0 : _e.tags[tagName].pendingAction).toBe(CONST_1.default.RED_BRICK_ROAD_PENDING_ACTION.UPDATE);
                        expect((_g = (_f = updatedPolicyTags === null || updatedPolicyTags === void 0 ? void 0 : updatedPolicyTags[tagListName]) === null || _f === void 0 ? void 0 : _f.tags[tagName].pendingFields) === null || _g === void 0 ? void 0 : _g['GL Code']).toBe(CONST_1.default.RED_BRICK_ROAD_PENDING_ACTION.UPDATE);
                        mockFetch.resume();
                        return [4 /*yield*/, (0, waitForBatchedUpdates_1.default)()];
                    case 4:
                        _o.sent();
                        return [4 /*yield*/, OnyxUtils_1.default.get("".concat(ONYXKEYS_1.default.COLLECTION.POLICY_TAGS).concat(fakePolicy.id))];
                    case 5:
                        // Then after API success, pending fields should be cleared
                        updatedPolicyTags = _o.sent();
                        expect((_h = updatedPolicyTags === null || updatedPolicyTags === void 0 ? void 0 : updatedPolicyTags[tagListName]) === null || _h === void 0 ? void 0 : _h.tags[tagName]['GL Code']).toBe(newGLCode);
                        expect((_j = updatedPolicyTags === null || updatedPolicyTags === void 0 ? void 0 : updatedPolicyTags[tagListName]) === null || _j === void 0 ? void 0 : _j.tags[tagName].pendingAction).toBeUndefined();
                        expect((_l = (_k = updatedPolicyTags === null || updatedPolicyTags === void 0 ? void 0 : updatedPolicyTags[tagListName]) === null || _k === void 0 ? void 0 : _k.tags[tagName].pendingFields) === null || _l === void 0 ? void 0 : _l['GL Code']).toBeUndefined();
                        expect((_m = updatedPolicyTags === null || updatedPolicyTags === void 0 ? void 0 : updatedPolicyTags[tagListName]) === null || _m === void 0 ? void 0 : _m.tags[tagName].errors).toBeUndefined();
                        return [2 /*return*/];
                }
            });
        }); });
        it('should handle empty GL code update', function () { return __awaiter(void 0, void 0, void 0, function () {
            var fakePolicy, tagListName, fakePolicyTags, tagName, emptyGLCode, updatedPolicyTags;
            var _a, _b, _c, _d, _e;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0:
                        fakePolicy = (0, policies_1.default)(0);
                        tagListName = 'Test Tag List';
                        fakePolicyTags = (0, policyTags_1.default)(tagListName, 1);
                        tagName = (_c = Object.keys((_b = (_a = fakePolicyTags === null || fakePolicyTags === void 0 ? void 0 : fakePolicyTags[tagListName]) === null || _a === void 0 ? void 0 : _a.tags) !== null && _b !== void 0 ? _b : {}).at(0)) !== null && _c !== void 0 ? _c : '';
                        emptyGLCode = '';
                        fakePolicyTags[tagListName].tags[tagName] = __assign(__assign({}, fakePolicyTags[tagListName].tags[tagName]), { 
                            // eslint-disable-next-line @typescript-eslint/naming-convention
                            'GL Code': 'EXISTING_GL_CODE' });
                        mockFetch.pause();
                        return [4 /*yield*/, react_native_onyx_1.default.set("".concat(ONYXKEYS_1.default.COLLECTION.POLICY_TAGS).concat(fakePolicy.id), fakePolicyTags)];
                    case 1:
                        _f.sent();
                        // When setPolicyTagGLCode is called with empty GL code to clear it
                        (0, Tag_1.setPolicyTagGLCode)({ policyID: fakePolicy.id, tagName: tagName, tagListIndex: 0, glCode: emptyGLCode, policyTags: fakePolicyTags });
                        return [4 /*yield*/, (0, waitForBatchedUpdates_1.default)()];
                    case 2:
                        _f.sent();
                        return [4 /*yield*/, OnyxUtils_1.default.get("".concat(ONYXKEYS_1.default.COLLECTION.POLICY_TAGS).concat(fakePolicy.id))];
                    case 3:
                        updatedPolicyTags = _f.sent();
                        expect((_d = updatedPolicyTags === null || updatedPolicyTags === void 0 ? void 0 : updatedPolicyTags[tagListName]) === null || _d === void 0 ? void 0 : _d.tags[tagName]['GL Code']).toBe(emptyGLCode);
                        expect((_e = updatedPolicyTags === null || updatedPolicyTags === void 0 ? void 0 : updatedPolicyTags[tagListName]) === null || _e === void 0 ? void 0 : _e.tags[tagName].pendingAction).toBe(CONST_1.default.RED_BRICK_ROAD_PENDING_ACTION.UPDATE);
                        mockFetch.resume();
                        return [4 /*yield*/, (0, waitForBatchedUpdates_1.default)()];
                    case 4:
                        _f.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('should handle API failure and restore original state with error', function () { return __awaiter(void 0, void 0, void 0, function () {
            var fakePolicy, tagListName, fakePolicyTags, tagName, originalGLCode, newGLCode, updatedPolicyTags;
            var _a, _b, _c, _d, _e;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0:
                        fakePolicy = (0, policies_1.default)(0);
                        tagListName = 'Test Tag List';
                        fakePolicyTags = (0, policyTags_1.default)(tagListName, 1);
                        tagName = (_c = Object.keys((_b = (_a = fakePolicyTags === null || fakePolicyTags === void 0 ? void 0 : fakePolicyTags[tagListName]) === null || _a === void 0 ? void 0 : _a.tags) !== null && _b !== void 0 ? _b : {}).at(0)) !== null && _c !== void 0 ? _c : '';
                        originalGLCode = 'ORIGINAL_GL_CODE_789';
                        newGLCode = 'NEW_GL_CODE_123';
                        fakePolicyTags[tagListName].tags[tagName] = __assign(__assign({}, fakePolicyTags[tagListName].tags[tagName]), { 
                            // eslint-disable-next-line @typescript-eslint/naming-convention
                            'GL Code': originalGLCode });
                        mockFetch.pause();
                        return [4 /*yield*/, react_native_onyx_1.default.set("".concat(ONYXKEYS_1.default.COLLECTION.POLICY_TAGS).concat(fakePolicy.id), fakePolicyTags)];
                    case 1:
                        _f.sent();
                        // When setPolicyTagGLCode is called and API fails
                        mockFetch.fail();
                        (0, Tag_1.setPolicyTagGLCode)({ policyID: fakePolicy.id, tagName: tagName, tagListIndex: 0, glCode: newGLCode, policyTags: fakePolicyTags });
                        return [4 /*yield*/, (0, waitForBatchedUpdates_1.default)()];
                    case 2:
                        _f.sent();
                        mockFetch.resume();
                        return [4 /*yield*/, (0, waitForBatchedUpdates_1.default)()];
                    case 3:
                        _f.sent();
                        return [4 /*yield*/, OnyxUtils_1.default.get("".concat(ONYXKEYS_1.default.COLLECTION.POLICY_TAGS).concat(fakePolicy.id))];
                    case 4:
                        updatedPolicyTags = _f.sent();
                        expect((_d = updatedPolicyTags === null || updatedPolicyTags === void 0 ? void 0 : updatedPolicyTags[tagListName]) === null || _d === void 0 ? void 0 : _d.tags[tagName]['GL Code']).toBe(originalGLCode);
                        expect((_e = updatedPolicyTags === null || updatedPolicyTags === void 0 ? void 0 : updatedPolicyTags[tagListName]) === null || _e === void 0 ? void 0 : _e.tags[tagName].errors).toBeTruthy();
                        return [2 /*return*/];
                }
            });
        }); });
        it('should work with data from useOnyx hook', function () { return __awaiter(void 0, void 0, void 0, function () {
            var fakePolicy, tagListName, fakePolicyTags, tagName, newGLCode, result, updatedPolicyTags;
            var _a, _b, _c, _d, _e;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0:
                        fakePolicy = (0, policies_1.default)(0);
                        tagListName = 'Test Tag List';
                        fakePolicyTags = (0, policyTags_1.default)(tagListName, 1);
                        tagName = (_c = Object.keys((_b = (_a = fakePolicyTags === null || fakePolicyTags === void 0 ? void 0 : fakePolicyTags[tagListName]) === null || _a === void 0 ? void 0 : _a.tags) !== null && _b !== void 0 ? _b : {}).at(0)) !== null && _c !== void 0 ? _c : '';
                        newGLCode = 'NEW_GL_CODE_123';
                        fakePolicyTags[tagListName].tags[tagName] = __assign(__assign({}, fakePolicyTags[tagListName].tags[tagName]), { 
                            // eslint-disable-next-line @typescript-eslint/naming-convention
                            'GL Code': 'OLD_GL_CODE' });
                        return [4 /*yield*/, react_native_onyx_1.default.set("".concat(ONYXKEYS_1.default.COLLECTION.POLICY_TAGS).concat(fakePolicy.id), fakePolicyTags)];
                    case 1:
                        _f.sent();
                        result = (0, react_native_1.renderHook)(function () { return (0, useOnyx_1.default)("".concat(ONYXKEYS_1.default.COLLECTION.POLICY_TAGS).concat(fakePolicy.id)); }).result;
                        return [4 /*yield*/, (0, react_native_1.waitFor)(function () {
                                expect(result.current[0]).toBeDefined();
                            })];
                    case 2:
                        _f.sent();
                        return [4 /*yield*/, (0, react_native_1.act)(function () { return __awaiter(void 0, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            // When setPolicyTagGLCode is called with data from useOnyx
                                            (0, Tag_1.setPolicyTagGLCode)({ policyID: fakePolicy.id, tagName: tagName, tagListIndex: 0, glCode: newGLCode, policyTags: result.current[0] });
                                            return [4 /*yield*/, (0, waitForBatchedUpdates_1.default)()];
                                        case 1:
                                            _a.sent();
                                            return [2 /*return*/];
                                    }
                                });
                            }); })];
                    case 3:
                        _f.sent();
                        return [4 /*yield*/, OnyxUtils_1.default.get("".concat(ONYXKEYS_1.default.COLLECTION.POLICY_TAGS).concat(fakePolicy.id))];
                    case 4:
                        updatedPolicyTags = _f.sent();
                        expect((_d = updatedPolicyTags === null || updatedPolicyTags === void 0 ? void 0 : updatedPolicyTags[tagListName]) === null || _d === void 0 ? void 0 : _d.tags[tagName]['GL Code']).toBe(newGLCode);
                        // Check optimistic data - pendingAction should be set
                        if ((_e = updatedPolicyTags === null || updatedPolicyTags === void 0 ? void 0 : updatedPolicyTags[tagListName]) === null || _e === void 0 ? void 0 : _e.tags[tagName].pendingAction) {
                            expect(updatedPolicyTags[tagListName].tags[tagName].pendingAction).toBe(CONST_1.default.RED_BRICK_ROAD_PENDING_ACTION.UPDATE);
                        }
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
