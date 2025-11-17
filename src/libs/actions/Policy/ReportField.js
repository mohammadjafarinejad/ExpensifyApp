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
exports.setInitialCreateReportFieldsForm = setInitialCreateReportFieldsForm;
exports.createReportFieldsListValue = createReportFieldsListValue;
exports.renameReportFieldsListValue = renameReportFieldsListValue;
exports.setReportFieldsListValueEnabled = setReportFieldsListValueEnabled;
exports.deleteReportFieldsListValue = deleteReportFieldsListValue;
exports.createReportField = createReportField;
exports.deleteReportFields = deleteReportFields;
exports.updateReportFieldInitialValue = updateReportFieldInitialValue;
exports.updateReportFieldListValueEnabled = updateReportFieldListValueEnabled;
exports.openPolicyReportFieldsPage = openPolicyReportFieldsPage;
exports.addReportFieldListValue = addReportFieldListValue;
exports.removeReportFieldListValue = removeReportFieldListValue;
var cloneDeep_1 = require("lodash/cloneDeep");
var react_native_onyx_1 = require("react-native-onyx");
var API = require("@libs/API");
var types_1 = require("@libs/API/types");
var ErrorUtils = require("@libs/ErrorUtils");
var Log_1 = require("@libs/Log");
var ReportUtils = require("@libs/ReportUtils");
var WorkspaceReportFieldUtils = require("@libs/WorkspaceReportFieldUtils");
var CONST_1 = require("@src/CONST");
var ONYXKEYS_1 = require("@src/ONYXKEYS");
var WorkspaceReportFieldForm_1 = require("@src/types/form/WorkspaceReportFieldForm");
function openPolicyReportFieldsPage(policyID) {
    if (!policyID) {
        Log_1.default.warn('openPolicyReportFieldsPage invalid params', { policyID: policyID });
        return;
    }
    var params = {
        policyID: policyID,
    };
    API.read(types_1.READ_COMMANDS.OPEN_POLICY_REPORT_FIELDS_PAGE, params);
}
/**
 * Sets the initial form values for the workspace report fields form.
 */
function setInitialCreateReportFieldsForm() {
    var _a;
    react_native_onyx_1.default.set(ONYXKEYS_1.default.FORMS.WORKSPACE_REPORT_FIELDS_FORM_DRAFT, (_a = {},
        _a[WorkspaceReportFieldForm_1.default.INITIAL_VALUE] = '',
        _a));
}
/**
 * Creates a new list value in the workspace report fields form.
 */
function createReportFieldsListValue(_a) {
    var _b;
    var valueName = _a.valueName, listValues = _a.listValues, disabledListValues = _a.disabledListValues;
    react_native_onyx_1.default.merge(ONYXKEYS_1.default.FORMS.WORKSPACE_REPORT_FIELDS_FORM_DRAFT, (_b = {},
        _b[WorkspaceReportFieldForm_1.default.LIST_VALUES] = __spreadArray(__spreadArray([], listValues, true), [valueName], false),
        _b[WorkspaceReportFieldForm_1.default.DISABLED_LIST_VALUES] = __spreadArray(__spreadArray([], disabledListValues, true), [false], false),
        _b));
}
/**
 * Renames a list value in the workspace report fields form.
 */
function renameReportFieldsListValue(_a) {
    var _b;
    var valueIndex = _a.valueIndex, newValueName = _a.newValueName, listValues = _a.listValues;
    var listValuesCopy = __spreadArray([], listValues, true);
    listValuesCopy[valueIndex] = newValueName;
    react_native_onyx_1.default.merge(ONYXKEYS_1.default.FORMS.WORKSPACE_REPORT_FIELDS_FORM_DRAFT, (_b = {},
        _b[WorkspaceReportFieldForm_1.default.LIST_VALUES] = listValuesCopy,
        _b));
}
/**
 * Sets the enabled state of a list value in the workspace report fields form.
 */
function setReportFieldsListValueEnabled(_a) {
    var _b;
    var valueIndexes = _a.valueIndexes, enabled = _a.enabled, disabledListValues = _a.disabledListValues;
    var disabledListValuesCopy = __spreadArray([], disabledListValues, true);
    valueIndexes.forEach(function (valueIndex) {
        disabledListValuesCopy[valueIndex] = !enabled;
    });
    react_native_onyx_1.default.merge(ONYXKEYS_1.default.FORMS.WORKSPACE_REPORT_FIELDS_FORM_DRAFT, (_b = {},
        _b[WorkspaceReportFieldForm_1.default.DISABLED_LIST_VALUES] = disabledListValuesCopy,
        _b));
}
/**
 * Deletes a list value from the workspace report fields form.
 */
function deleteReportFieldsListValue(_a) {
    var _b;
    var valueIndexes = _a.valueIndexes, listValues = _a.listValues, disabledListValues = _a.disabledListValues;
    var listValuesCopy = __spreadArray([], listValues, true);
    var disabledListValuesCopy = __spreadArray([], disabledListValues, true);
    valueIndexes
        .sort(function (a, b) { return b - a; })
        .forEach(function (valueIndex) {
        listValuesCopy.splice(valueIndex, 1);
        disabledListValuesCopy.splice(valueIndex, 1);
    });
    react_native_onyx_1.default.merge(ONYXKEYS_1.default.FORMS.WORKSPACE_REPORT_FIELDS_FORM_DRAFT, (_b = {},
        _b[WorkspaceReportFieldForm_1.default.LIST_VALUES] = listValuesCopy,
        _b[WorkspaceReportFieldForm_1.default.DISABLED_LIST_VALUES] = disabledListValuesCopy,
        _b));
}
/**
 * Creates a new report field.
 */
function createReportField(_a) {
    var _b, _c, _d, _e;
    var _f;
    var name = _a.name, type = _a.type, initialValue = _a.initialValue, listValues = _a.listValues, disabledListValues = _a.disabledListValues, policyExpenseReportIDs = _a.policyExpenseReportIDs, policy = _a.policy;
    if (!policy) {
        Log_1.default.warn('Policy data is not present');
        return;
    }
    var previousFieldList = (_f = policy === null || policy === void 0 ? void 0 : policy.fieldList) !== null && _f !== void 0 ? _f : {};
    var fieldID = WorkspaceReportFieldUtils.generateFieldID(name);
    var fieldKey = ReportUtils.getReportFieldKey(fieldID);
    // User selected type Text but entered a formula Initial value, treat it as a Formula type for optimistic UI
    var shouldTreatTextAsFormula = type === CONST_1.default.REPORT_FIELD_TYPES.TEXT && WorkspaceReportFieldUtils.hasFormulaPartsInInitialValue(initialValue);
    var optimisticType = shouldTreatTextAsFormula ? CONST_1.default.REPORT_FIELD_TYPES.FORMULA : type;
    var optimisticReportFieldDataForPolicy = {
        name: name,
        type: optimisticType,
        target: 'expense',
        defaultValue: initialValue,
        values: listValues,
        disabledOptions: disabledListValues,
        fieldID: fieldID,
        orderWeight: Object.keys(previousFieldList).length + 1,
        deletable: false,
        keys: [],
        externalIDs: [],
        isTax: false,
    };
    var optimisticData = __spreadArray([
        {
            key: "".concat(ONYXKEYS_1.default.COLLECTION.POLICY).concat(policy === null || policy === void 0 ? void 0 : policy.id),
            onyxMethod: react_native_onyx_1.default.METHOD.MERGE,
            value: {
                fieldList: (_b = {},
                    _b[fieldKey] = __assign(__assign({}, optimisticReportFieldDataForPolicy), { pendingAction: CONST_1.default.RED_BRICK_ROAD_PENDING_ACTION.ADD }),
                    _b),
                errorFields: null,
            },
        }
    ], (policyExpenseReportIDs !== null && policyExpenseReportIDs !== void 0 ? policyExpenseReportIDs : []).map(function (reportID) {
        var _a;
        return ({
            key: "".concat(ONYXKEYS_1.default.COLLECTION.REPORT).concat(reportID),
            onyxMethod: react_native_onyx_1.default.METHOD.MERGE,
            value: {
                fieldList: (_a = {},
                    _a[fieldKey] = __assign(__assign({}, optimisticReportFieldDataForPolicy), { pendingAction: CONST_1.default.RED_BRICK_ROAD_PENDING_ACTION.ADD }),
                    _a),
            },
        });
    }), true);
    var failureData = __spreadArray([
        {
            key: "".concat(ONYXKEYS_1.default.COLLECTION.POLICY).concat(policy === null || policy === void 0 ? void 0 : policy.id),
            onyxMethod: react_native_onyx_1.default.METHOD.MERGE,
            value: {
                fieldList: (_c = {},
                    _c[fieldKey] = null,
                    _c),
                errorFields: (_d = {},
                    _d[fieldKey] = ErrorUtils.getMicroSecondOnyxErrorWithTranslationKey('workspace.reportFields.genericFailureMessage'),
                    _d),
            },
        }
    ], (policyExpenseReportIDs !== null && policyExpenseReportIDs !== void 0 ? policyExpenseReportIDs : []).map(function (reportID) {
        var _a;
        return ({
            key: "".concat(ONYXKEYS_1.default.COLLECTION.REPORT).concat(reportID),
            onyxMethod: react_native_onyx_1.default.METHOD.MERGE,
            value: {
                fieldList: (_a = {},
                    _a[fieldKey] = null,
                    _a),
            },
        });
    }), true);
    var onyxData = {
        optimisticData: optimisticData,
        successData: [
            {
                key: "".concat(ONYXKEYS_1.default.COLLECTION.POLICY).concat(policy === null || policy === void 0 ? void 0 : policy.id),
                onyxMethod: react_native_onyx_1.default.METHOD.MERGE,
                value: {
                    fieldList: (_e = {},
                        _e[fieldKey] = { pendingAction: null },
                        _e),
                    errorFields: null,
                },
            },
        ],
        failureData: failureData,
    };
    var parameters = {
        policyID: policy === null || policy === void 0 ? void 0 : policy.id,
        reportFields: JSON.stringify([optimisticReportFieldDataForPolicy]),
    };
    API.write(types_1.WRITE_COMMANDS.CREATE_WORKSPACE_REPORT_FIELD, parameters, onyxData);
}
function deleteReportFields(_a) {
    var _b;
    var policy = _a.policy, reportFieldsToUpdate = _a.reportFieldsToUpdate;
    if (!policy) {
        Log_1.default.warn('Policy data is not present');
        return;
    }
    var allReportFields = (_b = policy === null || policy === void 0 ? void 0 : policy.fieldList) !== null && _b !== void 0 ? _b : {};
    var updatedReportFields = Object.fromEntries(Object.entries(allReportFields).filter(function (_a) {
        var key = _a[0];
        return !reportFieldsToUpdate.includes(key);
    }));
    var optimisticReportFields = reportFieldsToUpdate.reduce(function (acc, reportFieldKey) {
        acc[reportFieldKey] = { pendingAction: CONST_1.default.RED_BRICK_ROAD_PENDING_ACTION.DELETE };
        return acc;
    }, {});
    var successReportFields = reportFieldsToUpdate.reduce(function (acc, reportFieldKey) {
        acc[reportFieldKey] = null;
        return acc;
    }, {});
    var failureReportFields = reportFieldsToUpdate.reduce(function (acc, reportFieldKey) {
        acc[reportFieldKey] = { pendingAction: null };
        return acc;
    }, {});
    var onyxData = {
        optimisticData: [
            {
                onyxMethod: react_native_onyx_1.default.METHOD.MERGE,
                key: "".concat(ONYXKEYS_1.default.COLLECTION.POLICY).concat(policy === null || policy === void 0 ? void 0 : policy.id),
                value: {
                    fieldList: optimisticReportFields,
                },
            },
        ],
        successData: [
            {
                onyxMethod: react_native_onyx_1.default.METHOD.MERGE,
                key: "".concat(ONYXKEYS_1.default.COLLECTION.POLICY).concat(policy === null || policy === void 0 ? void 0 : policy.id),
                value: {
                    fieldList: successReportFields,
                    errorFields: null,
                },
            },
        ],
        failureData: [
            {
                onyxMethod: react_native_onyx_1.default.METHOD.MERGE,
                key: "".concat(ONYXKEYS_1.default.COLLECTION.POLICY).concat(policy === null || policy === void 0 ? void 0 : policy.id),
                value: {
                    fieldList: failureReportFields,
                    errorFields: {
                        fieldList: ErrorUtils.getMicroSecondOnyxErrorWithTranslationKey('common.genericErrorMessage'),
                    },
                },
            },
        ],
    };
    var parameters = {
        policyID: policy === null || policy === void 0 ? void 0 : policy.id,
        reportFields: JSON.stringify(Object.values(updatedReportFields)),
    };
    API.write(types_1.WRITE_COMMANDS.DELETE_POLICY_REPORT_FIELD, parameters, onyxData);
}
/**
 * Updates the initial value of a report field.
 */
function updateReportFieldInitialValue(_a) {
    var _b, _c, _d, _e;
    var _f;
    var policy = _a.policy, reportFieldID = _a.reportFieldID, newInitialValue = _a.newInitialValue;
    if (!policy) {
        Log_1.default.warn('Policy data is not present');
        return;
    }
    var previousFieldList = (_f = policy === null || policy === void 0 ? void 0 : policy.fieldList) !== null && _f !== void 0 ? _f : {};
    var fieldKey = ReportUtils.getReportFieldKey(reportFieldID);
    var existingField = previousFieldList[fieldKey];
    // Dynamically adjust type for text/formula fields based on the new initial value for optimistic UI
    var nextType = existingField === null || existingField === void 0 ? void 0 : existingField.type;
    var isTextOrFormula = (existingField === null || existingField === void 0 ? void 0 : existingField.type) === CONST_1.default.REPORT_FIELD_TYPES.TEXT || (existingField === null || existingField === void 0 ? void 0 : existingField.type) === CONST_1.default.REPORT_FIELD_TYPES.FORMULA;
    if (isTextOrFormula || !existingField) {
        nextType = WorkspaceReportFieldUtils.hasFormulaPartsInInitialValue(newInitialValue) ? CONST_1.default.REPORT_FIELD_TYPES.FORMULA : CONST_1.default.REPORT_FIELD_TYPES.TEXT;
    }
    var updatedReportField = __assign(__assign({}, existingField), { type: nextType, defaultValue: newInitialValue });
    var onyxData = {
        optimisticData: [
            {
                key: "".concat(ONYXKEYS_1.default.COLLECTION.POLICY).concat(policy === null || policy === void 0 ? void 0 : policy.id),
                onyxMethod: react_native_onyx_1.default.METHOD.MERGE,
                value: {
                    fieldList: (_b = {},
                        _b[fieldKey] = __assign(__assign({}, updatedReportField), { pendingAction: CONST_1.default.RED_BRICK_ROAD_PENDING_ACTION.UPDATE }),
                        _b),
                    errorFields: null,
                },
            },
        ],
        successData: [
            {
                key: "".concat(ONYXKEYS_1.default.COLLECTION.POLICY).concat(policy === null || policy === void 0 ? void 0 : policy.id),
                onyxMethod: react_native_onyx_1.default.METHOD.MERGE,
                value: {
                    fieldList: (_c = {},
                        _c[fieldKey] = { pendingAction: null },
                        _c),
                    errorFields: null,
                },
            },
        ],
        failureData: [
            {
                key: "".concat(ONYXKEYS_1.default.COLLECTION.POLICY).concat(policy === null || policy === void 0 ? void 0 : policy.id),
                onyxMethod: react_native_onyx_1.default.METHOD.MERGE,
                value: {
                    fieldList: (_d = {},
                        _d[fieldKey] = __assign(__assign({}, previousFieldList[fieldKey]), { pendingAction: null }),
                        _d),
                    errorFields: (_e = {},
                        _e[fieldKey] = ErrorUtils.getMicroSecondOnyxErrorWithTranslationKey('workspace.reportFields.genericFailureMessage'),
                        _e),
                },
            },
        ],
    };
    var parameters = {
        policyID: policy === null || policy === void 0 ? void 0 : policy.id,
        reportFields: JSON.stringify([updatedReportField]),
    };
    API.write(types_1.WRITE_COMMANDS.UPDATE_WORKSPACE_REPORT_FIELD_INITIAL_VALUE, parameters, onyxData);
}
function updateReportFieldListValueEnabled(_a) {
    var _b;
    var _c;
    var policy = _a.policy, reportFieldID = _a.reportFieldID, valueIndexes = _a.valueIndexes, enabled = _a.enabled;
    if (!policy) {
        Log_1.default.warn('Policy data is not present');
        return;
    }
    var previousFieldList = (_c = policy === null || policy === void 0 ? void 0 : policy.fieldList) !== null && _c !== void 0 ? _c : {};
    var fieldKey = ReportUtils.getReportFieldKey(reportFieldID);
    var reportField = previousFieldList[fieldKey];
    var updatedReportField = (0, cloneDeep_1.default)(reportField);
    valueIndexes.forEach(function (valueIndex) {
        updatedReportField.disabledOptions[valueIndex] = !enabled;
        var shouldResetDefaultValue = !enabled && reportField.defaultValue === reportField.values.at(valueIndex);
        if (shouldResetDefaultValue) {
            updatedReportField.defaultValue = '';
        }
    });
    // We are using the offline pattern A (optimistic without feedback)
    var onyxData = {
        optimisticData: [
            {
                key: "".concat(ONYXKEYS_1.default.COLLECTION.POLICY).concat(policy === null || policy === void 0 ? void 0 : policy.id),
                onyxMethod: react_native_onyx_1.default.METHOD.MERGE,
                value: {
                    fieldList: (_b = {},
                        _b[fieldKey] = updatedReportField,
                        _b),
                },
            },
        ],
    };
    var parameters = {
        policyID: policy === null || policy === void 0 ? void 0 : policy.id,
        reportFields: JSON.stringify([updatedReportField]),
    };
    API.write(types_1.WRITE_COMMANDS.ENABLE_WORKSPACE_REPORT_FIELD_LIST_VALUE, parameters, onyxData);
}
/**
 * Adds a new option to the list type report field on a workspace.
 */
function addReportFieldListValue(_a) {
    var _b;
    var _c;
    var policy = _a.policy, reportFieldID = _a.reportFieldID, valueName = _a.valueName;
    if (!policy) {
        Log_1.default.warn('Policy data is not present');
        return;
    }
    var previousFieldList = (_c = policy === null || policy === void 0 ? void 0 : policy.fieldList) !== null && _c !== void 0 ? _c : {};
    var reportFieldKey = ReportUtils.getReportFieldKey(reportFieldID);
    var reportField = previousFieldList[reportFieldKey];
    var updatedReportField = (0, cloneDeep_1.default)(reportField);
    updatedReportField.values.push(valueName);
    updatedReportField.disabledOptions.push(false);
    // We are using the offline pattern A (optimistic without feedback)
    var onyxData = {
        optimisticData: [
            {
                key: "".concat(ONYXKEYS_1.default.COLLECTION.POLICY).concat(policy === null || policy === void 0 ? void 0 : policy.id),
                onyxMethod: react_native_onyx_1.default.METHOD.MERGE,
                value: {
                    fieldList: (_b = {},
                        _b[reportFieldKey] = updatedReportField,
                        _b),
                },
            },
        ],
    };
    var parameters = {
        policyID: policy === null || policy === void 0 ? void 0 : policy.id,
        reportFields: JSON.stringify([updatedReportField]),
    };
    API.write(types_1.WRITE_COMMANDS.CREATE_WORKSPACE_REPORT_FIELD_LIST_VALUE, parameters, onyxData);
}
/**
 * Removes a list value from the workspace report fields.
 */
function removeReportFieldListValue(_a) {
    var _b;
    var _c;
    var policy = _a.policy, reportFieldID = _a.reportFieldID, valueIndexes = _a.valueIndexes;
    if (!policy) {
        Log_1.default.warn('Policy data is not present');
        return;
    }
    var previousFieldList = (_c = policy === null || policy === void 0 ? void 0 : policy.fieldList) !== null && _c !== void 0 ? _c : {};
    var reportFieldKey = ReportUtils.getReportFieldKey(reportFieldID);
    var reportField = previousFieldList[reportFieldKey];
    var updatedReportField = (0, cloneDeep_1.default)(reportField);
    valueIndexes
        .sort(function (a, b) { return b - a; })
        .forEach(function (valueIndex) {
        var shouldResetDefaultValue = reportField.defaultValue === reportField.values.at(valueIndex);
        if (shouldResetDefaultValue) {
            updatedReportField.defaultValue = '';
        }
        updatedReportField.values.splice(valueIndex, 1);
        updatedReportField.disabledOptions.splice(valueIndex, 1);
    });
    // We are using the offline pattern A (optimistic without feedback)
    var onyxData = {
        optimisticData: [
            {
                key: "".concat(ONYXKEYS_1.default.COLLECTION.POLICY).concat(policy === null || policy === void 0 ? void 0 : policy.id),
                onyxMethod: react_native_onyx_1.default.METHOD.MERGE,
                value: {
                    fieldList: (_b = {},
                        _b[reportFieldKey] = updatedReportField,
                        _b),
                },
            },
        ],
    };
    var parameters = {
        policyID: policy === null || policy === void 0 ? void 0 : policy.id,
        reportFields: JSON.stringify([updatedReportField]),
    };
    API.write(types_1.WRITE_COMMANDS.REMOVE_WORKSPACE_REPORT_FIELD_LIST_VALUE, parameters, onyxData);
}
