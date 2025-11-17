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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildOptimisticPolicyCategories = buildOptimisticPolicyCategories;
exports.buildOptimisticMccGroup = buildOptimisticMccGroup;
exports.clearCategoryErrors = clearCategoryErrors;
exports.createPolicyCategory = createPolicyCategory;
exports.deleteWorkspaceCategories = deleteWorkspaceCategories;
exports.downloadCategoriesCSV = downloadCategoriesCSV;
exports.enablePolicyCategories = enablePolicyCategories;
exports.getPolicyCategories = getPolicyCategories;
exports.importPolicyCategories = importPolicyCategories;
exports.openPolicyCategoriesPage = openPolicyCategoriesPage;
exports.removePolicyCategoryReceiptsRequired = removePolicyCategoryReceiptsRequired;
exports.renamePolicyCategory = renamePolicyCategory;
exports.setPolicyCategoryApprover = setPolicyCategoryApprover;
exports.setPolicyCategoryDescriptionRequired = setPolicyCategoryDescriptionRequired;
exports.buildOptimisticPolicyWithExistingCategories = buildOptimisticPolicyWithExistingCategories;
exports.setPolicyCategoryGLCode = setPolicyCategoryGLCode;
exports.setPolicyCategoryMaxAmount = setPolicyCategoryMaxAmount;
exports.setPolicyCategoryPayrollCode = setPolicyCategoryPayrollCode;
exports.setPolicyCategoryReceiptsRequired = setPolicyCategoryReceiptsRequired;
exports.setPolicyCategoryTax = setPolicyCategoryTax;
exports.setPolicyCustomUnitDefaultCategory = setPolicyCustomUnitDefaultCategory;
exports.setWorkspaceCategoryDescriptionHint = setWorkspaceCategoryDescriptionHint;
exports.setWorkspaceCategoryEnabled = setWorkspaceCategoryEnabled;
exports.setWorkspaceRequiresCategory = setWorkspaceRequiresCategory;
var cloneDeep_1 = require("lodash/cloneDeep");
var react_native_onyx_1 = require("react-native-onyx");
var API = require("@libs/API");
var types_1 = require("@libs/API/types");
var ApiUtils = require("@libs/ApiUtils");
var CategoryUtils = require("@libs/CategoryUtils");
var CurrencyUtils = require("@libs/CurrencyUtils");
var ErrorUtils = require("@libs/ErrorUtils");
var fileDownload_1 = require("@libs/fileDownload");
var getIsNarrowLayout_1 = require("@libs/getIsNarrowLayout");
var Log_1 = require("@libs/Log");
var enhanceParameters_1 = require("@libs/Network/enhanceParameters");
var OptionsListUtils_1 = require("@libs/OptionsListUtils");
var PolicyUtils_1 = require("@libs/PolicyUtils");
var ReportUtils_1 = require("@libs/ReportUtils");
var Task_1 = require("@userActions/Task");
var CONST_1 = require("@src/CONST");
var ONYXKEYS_1 = require("@src/ONYXKEYS");
function appendSetupCategoriesOnboardingData(onyxData, setupCategoryTaskReport, setupCategoryTaskParentReport, isSetupCategoriesTaskParentReportArchived, currentUserAccountID) {
    var _a, _b, _c, _d, _e, _f;
    var finishOnboardingTaskData = (0, Task_1.getFinishOnboardingTaskOnyxData)(setupCategoryTaskReport, setupCategoryTaskParentReport, isSetupCategoriesTaskParentReportArchived, currentUserAccountID);
    (_a = onyxData.optimisticData) === null || _a === void 0 ? void 0 : _a.push.apply(_a, ((_b = finishOnboardingTaskData.optimisticData) !== null && _b !== void 0 ? _b : []));
    (_c = onyxData.successData) === null || _c === void 0 ? void 0 : _c.push.apply(_c, ((_d = finishOnboardingTaskData.successData) !== null && _d !== void 0 ? _d : []));
    (_e = onyxData.failureData) === null || _e === void 0 ? void 0 : _e.push.apply(_e, ((_f = finishOnboardingTaskData.failureData) !== null && _f !== void 0 ? _f : []));
    return onyxData;
}
function buildOptimisticPolicyWithExistingCategories(policyID, categories) {
    var categoriesValues = Object.values(categories);
    var optimisticCategoryMap = categoriesValues.reduce(function (acc, category) {
        acc[category.name] = __assign(__assign({}, category), { errors: null, pendingAction: CONST_1.default.RED_BRICK_ROAD_PENDING_ACTION.ADD });
        return acc;
    }, {});
    var successCategoryMap = categoriesValues.reduce(function (acc, category) {
        acc[category.name] = {
            errors: null,
            pendingAction: null,
        };
        return acc;
    }, {});
    var failureCategoryMap = categoriesValues.reduce(function (acc, category) {
        acc[category.name] = {
            errors: ErrorUtils.getMicroSecondOnyxErrorWithTranslationKey('workspace.categories.createFailureMessage'),
        };
        return acc;
    }, {});
    var onyxData = {
        optimisticData: [
            {
                onyxMethod: react_native_onyx_1.default.METHOD.MERGE,
                key: "".concat(ONYXKEYS_1.default.COLLECTION.POLICY_CATEGORIES).concat(policyID),
                value: optimisticCategoryMap,
            },
            {
                onyxMethod: react_native_onyx_1.default.METHOD.SET,
                key: "".concat(ONYXKEYS_1.default.COLLECTION.POLICY_CATEGORIES_DRAFT).concat(policyID),
                value: null,
            },
        ],
        successData: [
            {
                onyxMethod: react_native_onyx_1.default.METHOD.MERGE,
                key: "".concat(ONYXKEYS_1.default.COLLECTION.POLICY_CATEGORIES).concat(policyID),
                value: successCategoryMap,
            },
        ],
        failureData: [
            {
                onyxMethod: react_native_onyx_1.default.METHOD.MERGE,
                key: "".concat(ONYXKEYS_1.default.COLLECTION.POLICY_CATEGORIES).concat(policyID),
                value: failureCategoryMap,
            },
        ],
    };
    return onyxData;
}
function buildOptimisticPolicyCategories(policyID, categories) {
    var optimisticCategoryMap = categories.reduce(function (acc, category) {
        acc[category] = {
            name: category,
            enabled: true,
            errors: null,
            pendingAction: CONST_1.default.RED_BRICK_ROAD_PENDING_ACTION.ADD,
        };
        return acc;
    }, {});
    var successCategoryMap = categories.reduce(function (acc, category) {
        acc[category] = {
            errors: null,
            pendingAction: null,
        };
        return acc;
    }, {});
    var failureCategoryMap = categories.reduce(function (acc, category) {
        acc[category] = {
            errors: ErrorUtils.getMicroSecondOnyxErrorWithTranslationKey('workspace.categories.createFailureMessage'),
        };
        return acc;
    }, {});
    var onyxData = {
        optimisticData: [
            {
                onyxMethod: react_native_onyx_1.default.METHOD.MERGE,
                key: "".concat(ONYXKEYS_1.default.COLLECTION.POLICY_CATEGORIES).concat(policyID),
                value: optimisticCategoryMap,
            },
            {
                onyxMethod: react_native_onyx_1.default.METHOD.SET,
                key: "".concat(ONYXKEYS_1.default.COLLECTION.POLICY_CATEGORIES_DRAFT).concat(policyID),
                value: null,
            },
        ],
        successData: [
            {
                onyxMethod: react_native_onyx_1.default.METHOD.MERGE,
                key: "".concat(ONYXKEYS_1.default.COLLECTION.POLICY_CATEGORIES).concat(policyID),
                value: successCategoryMap,
            },
        ],
        failureData: [
            {
                onyxMethod: react_native_onyx_1.default.METHOD.MERGE,
                key: "".concat(ONYXKEYS_1.default.COLLECTION.POLICY_CATEGORIES).concat(policyID),
                value: failureCategoryMap,
            },
        ],
    };
    return onyxData;
}
function buildOptimisticMccGroup() {
    var optimisticMccGroup = {
        mccGroup: {
            airlines: {
                category: CONST_1.default.POLICY.DEFAULT_CATEGORIES.TRAVEL,
                groupID: 'airlines',
                pendingAction: CONST_1.default.RED_BRICK_ROAD_PENDING_ACTION.ADD,
            },
            commuter: {
                category: CONST_1.default.POLICY.DEFAULT_CATEGORIES.CAR,
                groupID: 'commuter',
                pendingAction: CONST_1.default.RED_BRICK_ROAD_PENDING_ACTION.ADD,
            },
            gas: {
                category: CONST_1.default.POLICY.DEFAULT_CATEGORIES.CAR,
                groupID: 'gas',
                pendingAction: CONST_1.default.RED_BRICK_ROAD_PENDING_ACTION.ADD,
            },
            goods: {
                category: CONST_1.default.POLICY.DEFAULT_CATEGORIES.MATERIALS,
                groupID: 'goods',
                pendingAction: CONST_1.default.RED_BRICK_ROAD_PENDING_ACTION.ADD,
            },
            groceries: {
                category: CONST_1.default.POLICY.DEFAULT_CATEGORIES.MEALS_AND_ENTERTAINMENT,
                groupID: 'groceries',
                pendingAction: CONST_1.default.RED_BRICK_ROAD_PENDING_ACTION.ADD,
            },
            hotel: {
                category: CONST_1.default.POLICY.DEFAULT_CATEGORIES.TRAVEL,
                groupID: 'hotel',
                pendingAction: CONST_1.default.RED_BRICK_ROAD_PENDING_ACTION.ADD,
            },
            mail: {
                category: CONST_1.default.POLICY.DEFAULT_CATEGORIES.OFFICE_SUPPLIES,
                groupID: 'mail',
                pendingAction: CONST_1.default.RED_BRICK_ROAD_PENDING_ACTION.ADD,
            },
            meals: {
                category: CONST_1.default.POLICY.DEFAULT_CATEGORIES.MEALS_AND_ENTERTAINMENT,
                groupID: 'meals',
                pendingAction: CONST_1.default.RED_BRICK_ROAD_PENDING_ACTION.ADD,
            },
            rental: {
                category: CONST_1.default.POLICY.DEFAULT_CATEGORIES.TRAVEL,
                groupID: 'rental',
                pendingAction: CONST_1.default.RED_BRICK_ROAD_PENDING_ACTION.ADD,
            },
            services: {
                category: CONST_1.default.POLICY.DEFAULT_CATEGORIES.PROFESSIONAL_SERVICES,
                groupID: 'services',
                pendingAction: CONST_1.default.RED_BRICK_ROAD_PENDING_ACTION.ADD,
            },
            taxi: {
                category: CONST_1.default.POLICY.DEFAULT_CATEGORIES.TRAVEL,
                groupID: 'taxi',
                pendingAction: CONST_1.default.RED_BRICK_ROAD_PENDING_ACTION.ADD,
            },
            uncategorized: {
                category: CONST_1.default.POLICY.DEFAULT_CATEGORIES.OTHER,
                groupID: 'uncategorized',
                pendingAction: CONST_1.default.RED_BRICK_ROAD_PENDING_ACTION.ADD,
            },
            utilities: {
                category: CONST_1.default.POLICY.DEFAULT_CATEGORIES.UTILITIES,
                groupID: 'utilities',
                pendingAction: CONST_1.default.RED_BRICK_ROAD_PENDING_ACTION.ADD,
            },
        },
    };
    var successMccGroup = { mccGroup: {} };
    Object.keys(optimisticMccGroup.mccGroup).forEach(function (key) { return (successMccGroup.mccGroup[key] = { pendingAction: null }); });
    var mccGroupData = {
        optimisticData: optimisticMccGroup,
        successData: successMccGroup,
        failureData: { mccGroup: null },
    };
    return mccGroupData;
}
function updateImportSpreadsheetData(categoriesLength) {
    var onyxData = {
        successData: [
            {
                onyxMethod: react_native_onyx_1.default.METHOD.MERGE,
                key: ONYXKEYS_1.default.IMPORTED_SPREADSHEET,
                value: {
                    shouldFinalModalBeOpened: true,
                    importFinalModal: {
                        titleKey: 'spreadsheet.importSuccessfulTitle',
                        promptKey: 'spreadsheet.importCategoriesSuccessfulDescription',
                        promptKeyParams: {
                            categories: categoriesLength,
                        },
                    },
                },
            },
        ],
        failureData: [
            {
                onyxMethod: react_native_onyx_1.default.METHOD.MERGE,
                key: ONYXKEYS_1.default.IMPORTED_SPREADSHEET,
                value: {
                    shouldFinalModalBeOpened: true,
                    importFinalModal: {
                        titleKey: 'spreadsheet.importFailedTitle',
                        promptKey: 'spreadsheet.importFailedDescription',
                    },
                },
            },
        ],
    };
    return onyxData;
}
function openPolicyCategoriesPage(policyID) {
    if (!policyID) {
        Log_1.default.warn('openPolicyCategoriesPage invalid params', { policyID: policyID });
        return;
    }
    var params = {
        policyID: policyID,
    };
    API.read(types_1.READ_COMMANDS.OPEN_POLICY_CATEGORIES_PAGE, params);
}
function getPolicyCategories(policyID) {
    if (!policyID || policyID === '-1' || policyID === CONST_1.default.POLICY.ID_FAKE) {
        Log_1.default.warn('GetPolicyCategories invalid params', { policyID: policyID });
        return;
    }
    var params = {
        policyID: policyID,
    };
    API.read(types_1.READ_COMMANDS.GET_POLICY_CATEGORIES, params);
}
function setWorkspaceCategoryEnabled(policyData, categoriesToUpdate, isSetupCategoriesTaskParentReportArchived, setupCategoryTaskReport, setupCategoryTaskParentReport, currentUserAccountID) {
    var _a;
    var policyID = (_a = policyData.policy) === null || _a === void 0 ? void 0 : _a.id;
    var policyCategoriesOptimisticData = __assign({}, Object.keys(categoriesToUpdate).reduce(function (acc, key) {
        acc[key] = __assign(__assign({}, categoriesToUpdate[key]), { errors: null, pendingFields: {
                enabled: CONST_1.default.RED_BRICK_ROAD_PENDING_ACTION.UPDATE,
            }, pendingAction: CONST_1.default.RED_BRICK_ROAD_PENDING_ACTION.UPDATE });
        return acc;
    }, {}));
    var onyxData = {
        optimisticData: [
            {
                onyxMethod: react_native_onyx_1.default.METHOD.MERGE,
                key: "".concat(ONYXKEYS_1.default.COLLECTION.POLICY_CATEGORIES).concat(policyID),
                value: policyCategoriesOptimisticData,
            },
        ],
        successData: [
            {
                onyxMethod: react_native_onyx_1.default.METHOD.MERGE,
                key: "".concat(ONYXKEYS_1.default.COLLECTION.POLICY_CATEGORIES).concat(policyID),
                value: __assign({}, Object.keys(categoriesToUpdate).reduce(function (acc, key) {
                    acc[key] = {
                        errors: null,
                        pendingFields: {
                            enabled: null,
                        },
                        pendingAction: null,
                    };
                    return acc;
                }, {})),
            },
        ],
        failureData: [
            {
                onyxMethod: react_native_onyx_1.default.METHOD.MERGE,
                key: "".concat(ONYXKEYS_1.default.COLLECTION.POLICY_CATEGORIES).concat(policyID),
                value: __assign({}, Object.keys(categoriesToUpdate).reduce(function (acc, key) {
                    acc[key] = __assign(__assign({}, policyData.categories[key]), { errors: ErrorUtils.getMicroSecondOnyxErrorWithTranslationKey('workspace.categories.updateFailureMessage'), pendingFields: {
                            enabled: null,
                        }, pendingAction: null });
                    return acc;
                }, {})),
            },
        ],
    };
    (0, ReportUtils_1.pushTransactionViolationsOnyxData)(onyxData, policyData, {}, policyCategoriesOptimisticData);
    appendSetupCategoriesOnboardingData(onyxData, setupCategoryTaskReport, setupCategoryTaskParentReport, isSetupCategoriesTaskParentReportArchived, currentUserAccountID);
    var parameters = {
        policyID: policyID,
        categories: JSON.stringify(Object.keys(categoriesToUpdate).map(function (key) { return categoriesToUpdate[key]; })),
    };
    API.write(types_1.WRITE_COMMANDS.SET_WORKSPACE_CATEGORIES_ENABLED, parameters, onyxData);
}
function setPolicyCategoryDescriptionRequired(policyID, categoryName, areCommentsRequired, policyCategories) {
    var _a, _b, _c;
    var _d;
    if (policyCategories === void 0) { policyCategories = {}; }
    var policyCategoryToUpdate = policyCategories === null || policyCategories === void 0 ? void 0 : policyCategories[categoryName];
    var originalAreCommentsRequired = policyCategoryToUpdate === null || policyCategoryToUpdate === void 0 ? void 0 : policyCategoryToUpdate.areCommentsRequired;
    var originalCommentHint = policyCategoryToUpdate === null || policyCategoryToUpdate === void 0 ? void 0 : policyCategoryToUpdate.commentHint;
    // When areCommentsRequired is set to false, commentHint has to be reset
    var updatedCommentHint = areCommentsRequired ? (_d = policyCategories === null || policyCategories === void 0 ? void 0 : policyCategories[categoryName]) === null || _d === void 0 ? void 0 : _d.commentHint : '';
    var onyxData = {
        optimisticData: [
            {
                onyxMethod: react_native_onyx_1.default.METHOD.MERGE,
                key: "".concat(ONYXKEYS_1.default.COLLECTION.POLICY_CATEGORIES).concat(policyID),
                value: (_a = {},
                    _a[categoryName] = {
                        pendingAction: CONST_1.default.RED_BRICK_ROAD_PENDING_ACTION.UPDATE,
                        pendingFields: {
                            areCommentsRequired: CONST_1.default.RED_BRICK_ROAD_PENDING_ACTION.UPDATE,
                        },
                        areCommentsRequired: areCommentsRequired,
                        commentHint: updatedCommentHint,
                    },
                    _a),
            },
        ],
        successData: [
            {
                onyxMethod: react_native_onyx_1.default.METHOD.MERGE,
                key: "".concat(ONYXKEYS_1.default.COLLECTION.POLICY_CATEGORIES).concat(policyID),
                value: (_b = {},
                    _b[categoryName] = {
                        pendingAction: null,
                        pendingFields: {
                            areCommentsRequired: null,
                        },
                        areCommentsRequired: areCommentsRequired,
                        commentHint: updatedCommentHint,
                    },
                    _b),
            },
        ],
        failureData: [
            {
                onyxMethod: react_native_onyx_1.default.METHOD.MERGE,
                key: "".concat(ONYXKEYS_1.default.COLLECTION.POLICY_CATEGORIES).concat(policyID),
                value: (_c = {},
                    _c[categoryName] = {
                        errors: ErrorUtils.getMicroSecondOnyxErrorWithTranslationKey('common.genericErrorMessage'),
                        pendingAction: null,
                        pendingFields: {
                            areCommentsRequired: null,
                        },
                        areCommentsRequired: originalAreCommentsRequired,
                        commentHint: originalCommentHint,
                    },
                    _c),
            },
        ],
    };
    var parameters = {
        policyID: policyID,
        categoryName: categoryName,
        areCommentsRequired: areCommentsRequired,
    };
    API.write(types_1.WRITE_COMMANDS.SET_POLICY_CATEGORY_DESCRIPTION_REQUIRED, parameters, onyxData);
}
function setPolicyCategoryReceiptsRequired(policyData, categoryName, maxAmountNoReceipt) {
    var _a, _b, _c;
    var _d, _e;
    var policyID = (_d = policyData.policy) === null || _d === void 0 ? void 0 : _d.id;
    var originalMaxAmountNoReceipt = (_e = policyData.categories[categoryName]) === null || _e === void 0 ? void 0 : _e.maxAmountNoReceipt;
    var policyCategoriesOptimisticData = (_a = {},
        _a[categoryName] = {
            pendingAction: CONST_1.default.RED_BRICK_ROAD_PENDING_ACTION.UPDATE,
            pendingFields: {
                maxAmountNoReceipt: CONST_1.default.RED_BRICK_ROAD_PENDING_ACTION.UPDATE,
            },
            maxAmountNoReceipt: maxAmountNoReceipt,
        },
        _a);
    var onyxData = {
        optimisticData: [
            {
                onyxMethod: react_native_onyx_1.default.METHOD.MERGE,
                key: "".concat(ONYXKEYS_1.default.COLLECTION.POLICY_CATEGORIES).concat(policyID),
                value: policyCategoriesOptimisticData,
            },
        ],
        successData: [
            {
                onyxMethod: react_native_onyx_1.default.METHOD.MERGE,
                key: "".concat(ONYXKEYS_1.default.COLLECTION.POLICY_CATEGORIES).concat(policyID),
                value: (_b = {},
                    _b[categoryName] = {
                        pendingAction: null,
                        pendingFields: {
                            maxAmountNoReceipt: null,
                        },
                        maxAmountNoReceipt: maxAmountNoReceipt,
                    },
                    _b),
            },
        ],
        failureData: [
            {
                onyxMethod: react_native_onyx_1.default.METHOD.MERGE,
                key: "".concat(ONYXKEYS_1.default.COLLECTION.POLICY_CATEGORIES).concat(policyID),
                value: (_c = {},
                    _c[categoryName] = {
                        errors: ErrorUtils.getMicroSecondOnyxErrorWithTranslationKey('common.genericErrorMessage'),
                        pendingAction: null,
                        pendingFields: {
                            maxAmountNoReceipt: null,
                        },
                        maxAmountNoReceipt: originalMaxAmountNoReceipt,
                    },
                    _c),
            },
        ],
    };
    (0, ReportUtils_1.pushTransactionViolationsOnyxData)(onyxData, policyData, {}, policyCategoriesOptimisticData);
    var parameters = {
        policyID: policyID,
        categoryName: categoryName,
        maxExpenseAmountNoReceipt: maxAmountNoReceipt,
    };
    API.write(types_1.WRITE_COMMANDS.SET_POLICY_CATEGORY_RECEIPTS_REQUIRED, parameters, onyxData);
}
function removePolicyCategoryReceiptsRequired(policyData, categoryName) {
    var _a, _b, _c;
    var _d, _e;
    var policyID = (_d = policyData.policy) === null || _d === void 0 ? void 0 : _d.id;
    var originalMaxAmountNoReceipt = (_e = policyData.categories[categoryName]) === null || _e === void 0 ? void 0 : _e.maxAmountNoReceipt;
    var policyCategoriesOptimisticData = (_a = {},
        _a[categoryName] = {
            pendingAction: CONST_1.default.RED_BRICK_ROAD_PENDING_ACTION.UPDATE,
            pendingFields: {
                maxAmountNoReceipt: CONST_1.default.RED_BRICK_ROAD_PENDING_ACTION.UPDATE,
            },
            maxAmountNoReceipt: null,
        },
        _a);
    var onyxData = {
        optimisticData: [
            {
                onyxMethod: react_native_onyx_1.default.METHOD.MERGE,
                key: "".concat(ONYXKEYS_1.default.COLLECTION.POLICY_CATEGORIES).concat(policyID),
                value: policyCategoriesOptimisticData,
            },
        ],
        successData: [
            {
                onyxMethod: react_native_onyx_1.default.METHOD.MERGE,
                key: "".concat(ONYXKEYS_1.default.COLLECTION.POLICY_CATEGORIES).concat(policyID),
                value: (_b = {},
                    _b[categoryName] = {
                        pendingAction: null,
                        pendingFields: {
                            maxAmountNoReceipt: null,
                        },
                        maxAmountNoReceipt: null,
                    },
                    _b),
            },
        ],
        failureData: [
            {
                onyxMethod: react_native_onyx_1.default.METHOD.MERGE,
                key: "".concat(ONYXKEYS_1.default.COLLECTION.POLICY_CATEGORIES).concat(policyID),
                value: (_c = {},
                    _c[categoryName] = {
                        errors: ErrorUtils.getMicroSecondOnyxErrorWithTranslationKey('common.genericErrorMessage'),
                        pendingAction: null,
                        pendingFields: {
                            maxAmountNoReceipt: null,
                        },
                        maxAmountNoReceipt: originalMaxAmountNoReceipt,
                    },
                    _c),
            },
        ],
    };
    (0, ReportUtils_1.pushTransactionViolationsOnyxData)(onyxData, policyData, {}, policyCategoriesOptimisticData);
    var parameters = {
        policyID: policyID,
        categoryName: categoryName,
    };
    API.write(types_1.WRITE_COMMANDS.REMOVE_POLICY_CATEGORY_RECEIPTS_REQUIRED, parameters, onyxData);
}
function createPolicyCategory(policyID, categoryName, isSetupCategoriesTaskParentReportArchived, setupCategoryTaskReport, setupCategoryTaskParentReport, currentUserAccountID) {
    var onyxData = buildOptimisticPolicyCategories(policyID, [categoryName]);
    appendSetupCategoriesOnboardingData(onyxData, setupCategoryTaskReport, setupCategoryTaskParentReport, isSetupCategoriesTaskParentReportArchived, currentUserAccountID);
    var parameters = {
        policyID: policyID,
        categories: JSON.stringify([{ name: categoryName }]),
    };
    API.write(types_1.WRITE_COMMANDS.CREATE_WORKSPACE_CATEGORIES, parameters, onyxData);
}
function importPolicyCategories(policyID, categories) {
    var uniqueCategories = categories.reduce(function (acc, category) {
        if (!category.name) {
            return acc;
        }
        acc[category.name] = category;
        return acc;
    }, {});
    var categoriesLength = Object.keys(uniqueCategories).length;
    var onyxData = updateImportSpreadsheetData(categoriesLength);
    var parameters = {
        policyID: policyID,
        // eslint-disable-next-line @typescript-eslint/naming-convention
        categories: JSON.stringify(__spreadArray([], categories.map(function (category) { return ({ name: category.name, enabled: category.enabled, 'GL Code': String(category['GL Code']) }); }), true)),
    };
    API.write(types_1.WRITE_COMMANDS.IMPORT_CATEGORIES_SPREADSHEET, parameters, onyxData);
}
function renamePolicyCategory(policyData, policyCategory) {
    var _a, _b, _c, _d, _e;
    var _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s;
    var policy = policyData.policy;
    var policyID = policy.id;
    var policyCategoryToUpdate = (_f = policyData.categories) === null || _f === void 0 ? void 0 : _f[policyCategory.oldName];
    var policyCategoryApproverRule = CategoryUtils.getCategoryApproverRule((_h = (_g = policy === null || policy === void 0 ? void 0 : policy.rules) === null || _g === void 0 ? void 0 : _g.approvalRules) !== null && _h !== void 0 ? _h : [], policyCategory.oldName);
    var policyCategoryExpenseRule = CategoryUtils.getCategoryExpenseRule((_k = (_j = policy === null || policy === void 0 ? void 0 : policy.rules) === null || _j === void 0 ? void 0 : _j.expenseRules) !== null && _k !== void 0 ? _k : [], policyCategory.oldName);
    var approvalRules = (_m = (_l = policy === null || policy === void 0 ? void 0 : policy.rules) === null || _l === void 0 ? void 0 : _l.approvalRules) !== null && _m !== void 0 ? _m : [];
    var expenseRules = (_p = (_o = policy === null || policy === void 0 ? void 0 : policy.rules) === null || _o === void 0 ? void 0 : _o.expenseRules) !== null && _p !== void 0 ? _p : [];
    var mccGroup = (_q = policy === null || policy === void 0 ? void 0 : policy.mccGroup) !== null && _q !== void 0 ? _q : {};
    var updatedApprovalRules = (0, cloneDeep_1.default)(approvalRules);
    var updatedExpenseRules = (0, cloneDeep_1.default)(expenseRules);
    var clonedMccGroup = (0, cloneDeep_1.default)(mccGroup);
    var updatedMccGroup = CategoryUtils.updateCategoryInMccGroup(clonedMccGroup, policyCategory.oldName, policyCategory.newName);
    var updatedMccGroupWithClearedPendingAction = CategoryUtils.updateCategoryInMccGroup(clonedMccGroup, policyCategory.oldName, policyCategory.newName, true);
    if (policyCategoryExpenseRule) {
        var ruleIndex = updatedExpenseRules.findIndex(function (rule) { return rule.id === policyCategoryExpenseRule.id; });
        policyCategoryExpenseRule.applyWhen = policyCategoryExpenseRule.applyWhen.map(function (applyWhen) { return (__assign(__assign({}, applyWhen), (applyWhen.field === CONST_1.default.POLICY.FIELDS.CATEGORY && applyWhen.value === policyCategory.oldName && { value: policyCategory.newName }))); });
        updatedExpenseRules[ruleIndex] = policyCategoryExpenseRule;
    }
    // Its related by name, so the corresponding rule has to be updated to handle offline scenario
    if (policyCategoryApproverRule) {
        var indexToUpdate = updatedApprovalRules.findIndex(function (rule) { return rule.id === policyCategoryApproverRule.id; });
        policyCategoryApproverRule.applyWhen = policyCategoryApproverRule.applyWhen.map(function (ruleCondition) {
            var value = ruleCondition.value, field = ruleCondition.field, condition = ruleCondition.condition;
            if (value === policyCategory.oldName && field === CONST_1.default.POLICY.FIELDS.CATEGORY && condition === CONST_1.default.POLICY.RULE_CONDITIONS.MATCHES) {
                return __assign(__assign({}, ruleCondition), { value: policyCategory.newName });
            }
            return ruleCondition;
        });
        updatedApprovalRules[indexToUpdate] = policyCategoryApproverRule;
    }
    var policyOptimisticData = {
        rules: {
            approvalRules: updatedApprovalRules,
            expenseRules: updatedExpenseRules,
        },
        mccGroup: updatedMccGroup,
    };
    var policyCategoriesOptimisticData = (_a = {},
        _a[policyCategory.newName] = __assign(__assign({}, policyCategoryToUpdate), { errors: null, name: policyCategory.newName, pendingAction: CONST_1.default.RED_BRICK_ROAD_PENDING_ACTION.UPDATE, pendingFields: __assign(__assign({}, ((_r = policyCategoryToUpdate === null || policyCategoryToUpdate === void 0 ? void 0 : policyCategoryToUpdate.pendingFields) !== null && _r !== void 0 ? _r : {})), { name: CONST_1.default.RED_BRICK_ROAD_PENDING_ACTION.UPDATE }), previousCategoryName: policyCategory.oldName }),
        _a);
    var onyxData = {
        optimisticData: [
            {
                onyxMethod: react_native_onyx_1.default.METHOD.MERGE,
                key: "".concat(ONYXKEYS_1.default.COLLECTION.POLICY_CATEGORIES).concat(policyID),
                value: __assign((_b = {}, _b[policyCategory.oldName] = null, _b), policyCategoriesOptimisticData),
            },
            {
                onyxMethod: react_native_onyx_1.default.METHOD.MERGE,
                key: "".concat(ONYXKEYS_1.default.COLLECTION.POLICY).concat(policyID),
                value: policyOptimisticData,
            },
        ],
        successData: [
            {
                onyxMethod: react_native_onyx_1.default.METHOD.MERGE,
                key: "".concat(ONYXKEYS_1.default.COLLECTION.POLICY).concat(policyID),
                value: {
                    mccGroup: updatedMccGroupWithClearedPendingAction,
                },
            },
            {
                onyxMethod: react_native_onyx_1.default.METHOD.MERGE,
                key: "".concat(ONYXKEYS_1.default.COLLECTION.POLICY_CATEGORIES).concat(policyID),
                value: (_c = {},
                    _c[policyCategory.newName] = {
                        pendingAction: null,
                        pendingFields: {
                            name: null,
                        },
                    },
                    _c),
            },
        ],
        failureData: [
            {
                onyxMethod: react_native_onyx_1.default.METHOD.MERGE,
                key: "".concat(ONYXKEYS_1.default.COLLECTION.POLICY_CATEGORIES).concat(policyID),
                value: (_d = {},
                    _d[policyCategory.newName] = null,
                    _d[policyCategory.oldName] = __assign(__assign({}, policyCategoryToUpdate), { errors: ErrorUtils.getMicroSecondOnyxErrorWithTranslationKey('workspace.categories.updateFailureMessage') }),
                    _d),
            },
            {
                onyxMethod: react_native_onyx_1.default.METHOD.MERGE,
                key: "".concat(ONYXKEYS_1.default.COLLECTION.POLICY).concat(policyID),
                value: {
                    rules: {
                        approvalRules: approvalRules,
                    },
                    mccGroup: mccGroup,
                },
            },
        ],
    };
    var policyCategories = Object.values((_s = policyData.categories) !== null && _s !== void 0 ? _s : {}).reduce(function (acc, category) {
        if (category.name === policyCategory.oldName) {
            return acc;
        }
        acc[category.name] = category;
        return acc;
    }, {});
    (0, ReportUtils_1.pushTransactionViolationsOnyxData)(onyxData, __assign(__assign({}, policyData), { categories: policyCategories }), policyOptimisticData, policyCategoriesOptimisticData);
    var parameters = {
        policyID: policyID,
        categories: JSON.stringify((_e = {}, _e[policyCategory.oldName] = policyCategory.newName, _e)),
    };
    API.write(types_1.WRITE_COMMANDS.RENAME_WORKSPACE_CATEGORY, parameters, onyxData);
}
function setPolicyCategoryPayrollCode(policyID, categoryName, payrollCode, policyCategories) {
    var _a, _b, _c;
    var _d;
    if (policyCategories === void 0) { policyCategories = {}; }
    var policyCategoryToUpdate = (_d = policyCategories === null || policyCategories === void 0 ? void 0 : policyCategories[categoryName]) !== null && _d !== void 0 ? _d : {};
    var onyxData = {
        optimisticData: [
            {
                onyxMethod: react_native_onyx_1.default.METHOD.MERGE,
                key: "".concat(ONYXKEYS_1.default.COLLECTION.POLICY_CATEGORIES).concat(policyID),
                value: (_a = {},
                    _a[categoryName] = __assign(__assign({}, policyCategoryToUpdate), { pendingAction: CONST_1.default.RED_BRICK_ROAD_PENDING_ACTION.UPDATE, pendingFields: {
                            // eslint-disable-next-line @typescript-eslint/naming-convention
                            'Payroll Code': CONST_1.default.RED_BRICK_ROAD_PENDING_ACTION.UPDATE,
                        }, 
                        // eslint-disable-next-line @typescript-eslint/naming-convention
                        'Payroll Code': payrollCode }),
                    _a),
            },
        ],
        successData: [
            {
                onyxMethod: react_native_onyx_1.default.METHOD.MERGE,
                key: "".concat(ONYXKEYS_1.default.COLLECTION.POLICY_CATEGORIES).concat(policyID),
                value: (_b = {},
                    _b[categoryName] = __assign(__assign({}, policyCategoryToUpdate), { pendingAction: null, pendingFields: {
                            // eslint-disable-next-line @typescript-eslint/naming-convention
                            'Payroll Code': null,
                        }, 
                        // eslint-disable-next-line @typescript-eslint/naming-convention
                        'Payroll Code': payrollCode }),
                    _b),
            },
        ],
        failureData: [
            {
                onyxMethod: react_native_onyx_1.default.METHOD.MERGE,
                key: "".concat(ONYXKEYS_1.default.COLLECTION.POLICY_CATEGORIES).concat(policyID),
                value: (_c = {},
                    _c[categoryName] = __assign(__assign({}, policyCategoryToUpdate), { errors: ErrorUtils.getMicroSecondOnyxErrorWithTranslationKey('workspace.categories.updatePayrollCodeFailureMessage'), pendingAction: null, pendingFields: {
                            // eslint-disable-next-line @typescript-eslint/naming-convention
                            'Payroll Code': null,
                        } }),
                    _c),
            },
        ],
    };
    var parameters = {
        policyID: policyID,
        categoryName: categoryName,
        payrollCode: payrollCode,
    };
    API.write(types_1.WRITE_COMMANDS.UPDATE_POLICY_CATEGORY_PAYROLL_CODE, parameters, onyxData);
}
function setPolicyCategoryGLCode(policyID, categoryName, glCode, policyCategories) {
    var _a, _b, _c;
    var _d;
    if (policyCategories === void 0) { policyCategories = {}; }
    var policyCategoryToUpdate = (_d = policyCategories === null || policyCategories === void 0 ? void 0 : policyCategories[categoryName]) !== null && _d !== void 0 ? _d : {};
    var onyxData = {
        optimisticData: [
            {
                onyxMethod: react_native_onyx_1.default.METHOD.MERGE,
                key: "".concat(ONYXKEYS_1.default.COLLECTION.POLICY_CATEGORIES).concat(policyID),
                value: (_a = {},
                    _a[categoryName] = __assign(__assign({}, policyCategoryToUpdate), { pendingAction: CONST_1.default.RED_BRICK_ROAD_PENDING_ACTION.UPDATE, pendingFields: {
                            // eslint-disable-next-line @typescript-eslint/naming-convention
                            'GL Code': CONST_1.default.RED_BRICK_ROAD_PENDING_ACTION.UPDATE,
                        }, 
                        // eslint-disable-next-line @typescript-eslint/naming-convention
                        'GL Code': glCode }),
                    _a),
            },
        ],
        successData: [
            {
                onyxMethod: react_native_onyx_1.default.METHOD.MERGE,
                key: "".concat(ONYXKEYS_1.default.COLLECTION.POLICY_CATEGORIES).concat(policyID),
                value: (_b = {},
                    _b[categoryName] = __assign(__assign({}, policyCategoryToUpdate), { pendingAction: null, pendingFields: {
                            // eslint-disable-next-line @typescript-eslint/naming-convention
                            'GL Code': null,
                        }, 
                        // eslint-disable-next-line @typescript-eslint/naming-convention
                        'GL Code': glCode }),
                    _b),
            },
        ],
        failureData: [
            {
                onyxMethod: react_native_onyx_1.default.METHOD.MERGE,
                key: "".concat(ONYXKEYS_1.default.COLLECTION.POLICY_CATEGORIES).concat(policyID),
                value: (_c = {},
                    _c[categoryName] = __assign(__assign({}, policyCategoryToUpdate), { errors: ErrorUtils.getMicroSecondOnyxErrorWithTranslationKey('workspace.categories.updateGLCodeFailureMessage'), pendingAction: null, pendingFields: {
                            // eslint-disable-next-line @typescript-eslint/naming-convention
                            'GL Code': null,
                        } }),
                    _c),
            },
        ],
    };
    var parameters = {
        policyID: policyID,
        categoryName: categoryName,
        glCode: glCode,
    };
    API.write(types_1.WRITE_COMMANDS.UPDATE_POLICY_CATEGORY_GL_CODE, parameters, onyxData);
}
function setWorkspaceRequiresCategory(policyData, requiresCategory) {
    var _a;
    var policyID = (_a = policyData.policy) === null || _a === void 0 ? void 0 : _a.id;
    var policyOptimisticData = {
        requiresCategory: requiresCategory,
        errors: {
            requiresCategory: null,
        },
        pendingFields: {
            requiresCategory: CONST_1.default.RED_BRICK_ROAD_PENDING_ACTION.UPDATE,
        },
    };
    var onyxData = {
        optimisticData: [
            {
                onyxMethod: react_native_onyx_1.default.METHOD.MERGE,
                key: "".concat(ONYXKEYS_1.default.COLLECTION.POLICY).concat(policyID),
                value: policyOptimisticData,
            },
        ],
        successData: [
            {
                onyxMethod: react_native_onyx_1.default.METHOD.MERGE,
                key: "".concat(ONYXKEYS_1.default.COLLECTION.POLICY).concat(policyID),
                value: {
                    errors: {
                        requiresCategory: null,
                    },
                    pendingFields: {
                        requiresCategory: null,
                    },
                },
            },
        ],
        failureData: [
            {
                onyxMethod: react_native_onyx_1.default.METHOD.MERGE,
                key: "".concat(ONYXKEYS_1.default.COLLECTION.POLICY).concat(policyID),
                value: {
                    requiresCategory: !requiresCategory,
                    errors: ErrorUtils.getMicroSecondOnyxErrorWithTranslationKey('workspace.categories.updateFailureMessage'),
                    pendingFields: {
                        requiresCategory: null,
                    },
                },
            },
        ],
    };
    (0, ReportUtils_1.pushTransactionViolationsOnyxData)(onyxData, policyData, policyOptimisticData);
    var parameters = {
        policyID: policyID,
        requiresCategory: requiresCategory,
    };
    API.write(types_1.WRITE_COMMANDS.SET_WORKSPACE_REQUIRES_CATEGORY, parameters, onyxData);
}
function clearCategoryErrors(policyID, categoryName, policyCategories) {
    var _a, _b;
    if (policyCategories === void 0) { policyCategories = {}; }
    var category = policyCategories === null || policyCategories === void 0 ? void 0 : policyCategories[categoryName];
    if (!category) {
        return;
    }
    if (category.pendingAction === CONST_1.default.RED_BRICK_ROAD_PENDING_ACTION.ADD) {
        react_native_onyx_1.default.merge("".concat(ONYXKEYS_1.default.COLLECTION.POLICY_CATEGORIES).concat(policyID), (_a = {},
            _a[category.name] = null,
            _a));
        return;
    }
    react_native_onyx_1.default.merge("".concat(ONYXKEYS_1.default.COLLECTION.POLICY_CATEGORIES).concat(policyID), (_b = {},
        _b[category.name] = {
            errors: null,
        },
        _b));
}
function deleteWorkspaceCategories(policyData, categoryNamesToDelete, isSetupCategoriesTaskParentReportArchived, setupCategoryTaskReport, setupCategoryTaskParentReport, currentUserAccountID) {
    var _a;
    var policyID = (_a = policyData.policy) === null || _a === void 0 ? void 0 : _a.id;
    var optimisticPolicyCategoriesData = categoryNamesToDelete.reduce(function (acc, categoryName) {
        acc[categoryName] = { pendingAction: CONST_1.default.RED_BRICK_ROAD_PENDING_ACTION.DELETE, enabled: false };
        return acc;
    }, {});
    var shouldDisableRequiresCategory = !(0, OptionsListUtils_1.hasEnabledOptions)(Object.values(policyData.categories).filter(function (category) { return !categoryNamesToDelete.includes(category.name) && category.pendingAction !== CONST_1.default.RED_BRICK_ROAD_PENDING_ACTION.DELETE; }));
    var optimisticPolicyData = shouldDisableRequiresCategory
        ? {
            requiresCategory: false,
        }
        : {};
    var onyxData = {
        optimisticData: [
            {
                onyxMethod: react_native_onyx_1.default.METHOD.MERGE,
                key: "".concat(ONYXKEYS_1.default.COLLECTION.POLICY_CATEGORIES).concat(policyID),
                value: optimisticPolicyCategoriesData,
            },
        ],
        successData: [
            {
                onyxMethod: react_native_onyx_1.default.METHOD.MERGE,
                key: "".concat(ONYXKEYS_1.default.COLLECTION.POLICY_CATEGORIES).concat(policyID),
                value: categoryNamesToDelete.reduce(function (acc, categoryName) {
                    acc[categoryName] = null;
                    return acc;
                }, {}),
            },
        ],
        failureData: [
            {
                onyxMethod: react_native_onyx_1.default.METHOD.MERGE,
                key: "".concat(ONYXKEYS_1.default.COLLECTION.POLICY_CATEGORIES).concat(policyID),
                value: categoryNamesToDelete.reduce(function (acc, categoryName) {
                    var _a, _b;
                    acc[categoryName] = {
                        pendingAction: null,
                        errors: ErrorUtils.getMicroSecondOnyxErrorWithTranslationKey('workspace.categories.deleteFailureMessage'),
                        enabled: !!((_b = (_a = policyData.categories) === null || _a === void 0 ? void 0 : _a[categoryName]) === null || _b === void 0 ? void 0 : _b.enabled),
                    };
                    return acc;
                }, {}),
            },
        ],
    };
    (0, ReportUtils_1.pushTransactionViolationsOnyxData)(onyxData, policyData, optimisticPolicyData, optimisticPolicyCategoriesData);
    appendSetupCategoriesOnboardingData(onyxData, setupCategoryTaskReport, setupCategoryTaskParentReport, isSetupCategoriesTaskParentReportArchived, currentUserAccountID);
    var parameters = {
        policyID: policyID,
        categories: JSON.stringify(categoryNamesToDelete),
    };
    API.write(types_1.WRITE_COMMANDS.DELETE_WORKSPACE_CATEGORIES, parameters, onyxData);
}
function enablePolicyCategories(policyData, enabled, shouldGoBack) {
    var _a, _b;
    if (shouldGoBack === void 0) { shouldGoBack = true; }
    var policyID = (_a = policyData.policy) === null || _a === void 0 ? void 0 : _a.id;
    var policyUpdate = {
        areCategoriesEnabled: enabled,
        pendingFields: {
            areCategoriesEnabled: CONST_1.default.RED_BRICK_ROAD_PENDING_ACTION.UPDATE,
        },
    };
    var onyxData = {
        optimisticData: [
            {
                onyxMethod: react_native_onyx_1.default.METHOD.MERGE,
                key: "".concat(ONYXKEYS_1.default.COLLECTION.POLICY).concat(policyID),
                value: policyUpdate,
            },
        ],
        successData: [
            {
                onyxMethod: react_native_onyx_1.default.METHOD.MERGE,
                key: "".concat(ONYXKEYS_1.default.COLLECTION.POLICY).concat(policyID),
                value: {
                    pendingFields: {
                        areCategoriesEnabled: null,
                    },
                },
            },
        ],
        failureData: [
            {
                onyxMethod: react_native_onyx_1.default.METHOD.MERGE,
                key: "".concat(ONYXKEYS_1.default.COLLECTION.POLICY).concat(policyID),
                value: {
                    areCategoriesEnabled: !enabled,
                    pendingFields: {
                        areCategoriesEnabled: null,
                    },
                },
            },
        ],
    };
    var policyCategoriesUpdate = {};
    if (!enabled) {
        policyCategoriesUpdate = Object.fromEntries(Object.entries(policyData.categories).map(function (_a) {
            var categoryName = _a[0];
            return [
                categoryName,
                {
                    enabled: false,
                },
            ];
        }));
        (_b = onyxData.optimisticData) === null || _b === void 0 ? void 0 : _b.push({
            onyxMethod: react_native_onyx_1.default.METHOD.MERGE,
            key: "".concat(ONYXKEYS_1.default.COLLECTION.POLICY_CATEGORIES).concat(policyID),
            value: policyCategoriesUpdate,
        });
    }
    (0, ReportUtils_1.pushTransactionViolationsOnyxData)(onyxData, policyData, policyUpdate, policyCategoriesUpdate);
    var parameters = { policyID: policyID, enabled: enabled };
    // We can't use writeWithNoDuplicatesEnableFeatureConflicts because the categories data is also changed when disabling/enabling this feature
    API.write(types_1.WRITE_COMMANDS.ENABLE_POLICY_CATEGORIES, parameters, onyxData);
    if (enabled && (0, getIsNarrowLayout_1.default)() && shouldGoBack) {
        (0, PolicyUtils_1.goBackWhenEnableFeature)(policyID);
    }
}
function setPolicyCustomUnitDefaultCategory(policyID, customUnitID, oldCategory, category) {
    var _a, _b, _c;
    var optimisticData = [
        {
            onyxMethod: react_native_onyx_1.default.METHOD.MERGE,
            key: "".concat(ONYXKEYS_1.default.COLLECTION.POLICY).concat(policyID),
            value: {
                customUnits: (_a = {},
                    _a[customUnitID] = {
                        defaultCategory: category,
                        pendingFields: { defaultCategory: CONST_1.default.RED_BRICK_ROAD_PENDING_ACTION.UPDATE },
                    },
                    _a),
            },
        },
    ];
    var successData = [
        {
            onyxMethod: react_native_onyx_1.default.METHOD.MERGE,
            key: "".concat(ONYXKEYS_1.default.COLLECTION.POLICY).concat(policyID),
            value: {
                customUnits: (_b = {},
                    _b[customUnitID] = {
                        pendingFields: { defaultCategory: null },
                    },
                    _b),
            },
        },
    ];
    var failureData = [
        {
            onyxMethod: react_native_onyx_1.default.METHOD.MERGE,
            key: "".concat(ONYXKEYS_1.default.COLLECTION.POLICY).concat(policyID),
            value: {
                customUnits: (_c = {},
                    _c[customUnitID] = {
                        defaultCategory: oldCategory,
                        errorFields: { defaultCategory: ErrorUtils.getMicroSecondOnyxErrorWithTranslationKey('common.genericErrorMessage') },
                        pendingFields: { defaultCategory: null },
                    },
                    _c),
            },
        },
    ];
    var params = {
        policyID: policyID,
        customUnitID: customUnitID,
        category: category,
    };
    API.write(types_1.WRITE_COMMANDS.SET_CUSTOM_UNIT_DEFAULT_CATEGORY, params, { optimisticData: optimisticData, successData: successData, failureData: failureData });
}
function downloadCategoriesCSV(policyID, onDownloadFailed) {
    var finalParameters = (0, enhanceParameters_1.default)(types_1.WRITE_COMMANDS.EXPORT_CATEGORIES_CSV, {
        policyID: policyID,
    });
    var fileName = 'Categories.csv';
    var formData = new FormData();
    Object.entries(finalParameters).forEach(function (_a) {
        var key = _a[0], value = _a[1];
        formData.append(key, String(value));
    });
    (0, fileDownload_1.default)(ApiUtils.getCommandURL({ command: types_1.WRITE_COMMANDS.EXPORT_CATEGORIES_CSV }), fileName, '', false, formData, CONST_1.default.NETWORK.METHOD.POST, onDownloadFailed);
}
function setWorkspaceCategoryDescriptionHint(policyID, categoryName, commentHint, policyCategories) {
    var _a, _b, _c;
    var _d;
    if (policyCategories === void 0) { policyCategories = {}; }
    var originalCommentHint = (_d = policyCategories === null || policyCategories === void 0 ? void 0 : policyCategories[categoryName]) === null || _d === void 0 ? void 0 : _d.commentHint;
    var onyxData = {
        optimisticData: [
            {
                onyxMethod: react_native_onyx_1.default.METHOD.MERGE,
                key: "".concat(ONYXKEYS_1.default.COLLECTION.POLICY_CATEGORIES).concat(policyID),
                value: (_a = {},
                    _a[categoryName] = {
                        pendingAction: CONST_1.default.RED_BRICK_ROAD_PENDING_ACTION.UPDATE,
                        pendingFields: {
                            commentHint: CONST_1.default.RED_BRICK_ROAD_PENDING_ACTION.UPDATE,
                        },
                        commentHint: commentHint,
                    },
                    _a),
            },
        ],
        successData: [
            {
                onyxMethod: react_native_onyx_1.default.METHOD.MERGE,
                key: "".concat(ONYXKEYS_1.default.COLLECTION.POLICY_CATEGORIES).concat(policyID),
                value: (_b = {},
                    _b[categoryName] = {
                        pendingAction: null,
                        pendingFields: {
                            commentHint: null,
                        },
                        commentHint: commentHint,
                    },
                    _b),
            },
        ],
        failureData: [
            {
                onyxMethod: react_native_onyx_1.default.METHOD.MERGE,
                key: "".concat(ONYXKEYS_1.default.COLLECTION.POLICY_CATEGORIES).concat(policyID),
                value: (_c = {},
                    _c[categoryName] = {
                        errors: ErrorUtils.getMicroSecondOnyxErrorWithTranslationKey('common.genericErrorMessage'),
                        pendingAction: null,
                        pendingFields: {
                            commentHint: null,
                        },
                        commentHint: originalCommentHint,
                    },
                    _c),
            },
        ],
    };
    var parameters = {
        policyID: policyID,
        categoryName: categoryName,
        commentHint: commentHint,
    };
    API.write(types_1.WRITE_COMMANDS.SET_WORKSPACE_CATEGORY_DESCRIPTION_HINT, parameters, onyxData);
}
function setPolicyCategoryMaxAmount(policyID, categoryName, maxExpenseAmount, expenseLimitType, policyCategories) {
    var _a, _b, _c;
    if (policyCategories === void 0) { policyCategories = {}; }
    var policyCategoryToUpdate = policyCategories === null || policyCategories === void 0 ? void 0 : policyCategories[categoryName];
    var originalMaxExpenseAmount = policyCategoryToUpdate === null || policyCategoryToUpdate === void 0 ? void 0 : policyCategoryToUpdate.maxExpenseAmount;
    var originalExpenseLimitType = policyCategoryToUpdate === null || policyCategoryToUpdate === void 0 ? void 0 : policyCategoryToUpdate.expenseLimitType;
    var parsedMaxExpenseAmount = maxExpenseAmount === '' ? null : CurrencyUtils.convertToBackendAmount(parseFloat(maxExpenseAmount));
    var onyxData = {
        optimisticData: [
            {
                onyxMethod: react_native_onyx_1.default.METHOD.MERGE,
                key: "".concat(ONYXKEYS_1.default.COLLECTION.POLICY_CATEGORIES).concat(policyID),
                value: (_a = {},
                    _a[categoryName] = {
                        pendingAction: CONST_1.default.RED_BRICK_ROAD_PENDING_ACTION.UPDATE,
                        pendingFields: {
                            maxExpenseAmount: CONST_1.default.RED_BRICK_ROAD_PENDING_ACTION.UPDATE,
                            expenseLimitType: CONST_1.default.RED_BRICK_ROAD_PENDING_ACTION.UPDATE,
                        },
                        maxExpenseAmount: parsedMaxExpenseAmount,
                        expenseLimitType: expenseLimitType,
                    },
                    _a),
            },
        ],
        successData: [
            {
                onyxMethod: react_native_onyx_1.default.METHOD.MERGE,
                key: "".concat(ONYXKEYS_1.default.COLLECTION.POLICY_CATEGORIES).concat(policyID),
                value: (_b = {},
                    _b[categoryName] = {
                        pendingAction: null,
                        pendingFields: {
                            maxExpenseAmount: null,
                            expenseLimitType: null,
                        },
                        maxExpenseAmount: parsedMaxExpenseAmount,
                        expenseLimitType: expenseLimitType,
                    },
                    _b),
            },
        ],
        failureData: [
            {
                onyxMethod: react_native_onyx_1.default.METHOD.MERGE,
                key: "".concat(ONYXKEYS_1.default.COLLECTION.POLICY_CATEGORIES).concat(policyID),
                value: (_c = {},
                    _c[categoryName] = {
                        errors: ErrorUtils.getMicroSecondOnyxErrorWithTranslationKey('common.genericErrorMessage'),
                        pendingAction: null,
                        pendingFields: {
                            maxExpenseAmount: null,
                            expenseLimitType: null,
                        },
                        maxExpenseAmount: originalMaxExpenseAmount,
                        expenseLimitType: originalExpenseLimitType,
                    },
                    _c),
            },
        ],
    };
    var parameters = {
        policyID: policyID,
        categoryName: categoryName,
        maxExpenseAmount: parsedMaxExpenseAmount,
        expenseLimitType: expenseLimitType,
    };
    API.write(types_1.WRITE_COMMANDS.SET_POLICY_CATEGORY_MAX_AMOUNT, parameters, onyxData);
}
function setPolicyCategoryApprover(policyID, categoryName, approver, approvalRules) {
    var updatedApprovalRules = (0, cloneDeep_1.default)(approvalRules);
    var existingCategoryApproverRule = CategoryUtils.getCategoryApproverRule(updatedApprovalRules, categoryName);
    var newApprover = approver;
    if (!existingCategoryApproverRule) {
        updatedApprovalRules.push({
            approver: approver,
            applyWhen: [
                {
                    condition: CONST_1.default.POLICY.RULE_CONDITIONS.MATCHES,
                    field: 'category',
                    value: categoryName,
                },
            ],
        });
    }
    else if ((existingCategoryApproverRule === null || existingCategoryApproverRule === void 0 ? void 0 : existingCategoryApproverRule.approver) === approver) {
        updatedApprovalRules = updatedApprovalRules.filter(function (rule) { return rule.approver !== approver; });
        newApprover = '';
    }
    else {
        var indexToUpdate = updatedApprovalRules.indexOf(existingCategoryApproverRule);
        var approvalRule = updatedApprovalRules.at(indexToUpdate);
        if (approvalRule && indexToUpdate !== -1) {
            approvalRule.approver = approver;
        }
    }
    var onyxData = {
        optimisticData: [
            {
                onyxMethod: react_native_onyx_1.default.METHOD.MERGE,
                key: "".concat(ONYXKEYS_1.default.COLLECTION.POLICY).concat(policyID),
                value: {
                    rules: {
                        approvalRules: updatedApprovalRules,
                    },
                },
            },
        ],
        failureData: [
            {
                onyxMethod: react_native_onyx_1.default.METHOD.MERGE,
                key: "".concat(ONYXKEYS_1.default.COLLECTION.POLICY).concat(policyID),
                value: {
                    rules: {
                        approvalRules: approvalRules,
                    },
                },
            },
        ],
    };
    var parameters = {
        policyID: policyID,
        categoryName: categoryName,
        approver: newApprover,
    };
    API.write(types_1.WRITE_COMMANDS.SET_POLICY_CATEGORY_APPROVER, parameters, onyxData);
}
function setPolicyCategoryTax(policyID, categoryName, taxID) {
    var _a, _b;
    // This will be fixed as part of https://github.com/Expensify/Expensify/issues/507850
    // eslint-disable-next-line @typescript-eslint/no-deprecated
    var policy = (0, PolicyUtils_1.getPolicy)(policyID);
    var expenseRules = (_b = (_a = policy === null || policy === void 0 ? void 0 : policy.rules) === null || _a === void 0 ? void 0 : _a.expenseRules) !== null && _b !== void 0 ? _b : [];
    var updatedExpenseRules = (0, cloneDeep_1.default)(expenseRules);
    var existingCategoryExpenseRule = updatedExpenseRules.find(function (rule) { return rule.applyWhen.some(function (when) { return when.value === categoryName; }); });
    if (!existingCategoryExpenseRule) {
        updatedExpenseRules.push({
            tax: {
                // eslint-disable-next-line @typescript-eslint/naming-convention
                field_id_TAX: {
                    externalID: taxID,
                },
            },
            applyWhen: [
                {
                    condition: CONST_1.default.POLICY.RULE_CONDITIONS.MATCHES,
                    field: 'category',
                    value: categoryName,
                },
            ],
        });
    }
    else {
        var indexToUpdate = updatedExpenseRules.indexOf(existingCategoryExpenseRule);
        var expenseRule = updatedExpenseRules.at(indexToUpdate);
        if (expenseRule && indexToUpdate !== -1) {
            expenseRule.tax.field_id_TAX.externalID = taxID;
        }
    }
    var onyxData = {
        optimisticData: [
            {
                onyxMethod: react_native_onyx_1.default.METHOD.MERGE,
                key: "".concat(ONYXKEYS_1.default.COLLECTION.POLICY).concat(policyID),
                value: {
                    rules: {
                        expenseRules: updatedExpenseRules,
                    },
                },
            },
        ],
        failureData: [
            {
                onyxMethod: react_native_onyx_1.default.METHOD.MERGE,
                key: "".concat(ONYXKEYS_1.default.COLLECTION.POLICY).concat(policyID),
                value: {
                    rules: {
                        expenseRules: expenseRules,
                    },
                },
            },
        ],
    };
    var parameters = {
        policyID: policyID,
        categoryName: categoryName,
        taxID: taxID,
    };
    API.write(types_1.WRITE_COMMANDS.SET_POLICY_CATEGORY_TAX, parameters, onyxData);
}
