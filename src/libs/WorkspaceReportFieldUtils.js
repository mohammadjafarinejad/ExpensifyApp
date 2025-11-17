"use strict";
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
exports.getReportFieldTypeTranslationKey = getReportFieldTypeTranslationKey;
exports.getReportFieldAlternativeTextTranslationKey = getReportFieldAlternativeTextTranslationKey;
exports.validateReportFieldListValueName = validateReportFieldListValueName;
exports.generateFieldID = generateFieldID;
exports.getReportFieldInitialValue = getReportFieldInitialValue;
exports.hasFormulaPartsInInitialValue = hasFormulaPartsInInitialValue;
var CONST_1 = require("@src/CONST");
var ErrorUtils_1 = require("./ErrorUtils");
// eslint-disable-next-line @typescript-eslint/no-deprecated
var Localize_1 = require("./Localize");
var ValidationUtils_1 = require("./ValidationUtils");
/**
 * Gets the translation key for the report field type.
 */
function getReportFieldTypeTranslationKey(reportFieldType) {
    var _a;
    var typeTranslationKeysStrategy = (_a = {},
        _a[CONST_1.default.REPORT_FIELD_TYPES.TEXT] = 'workspace.reportFields.textType',
        _a[CONST_1.default.REPORT_FIELD_TYPES.DATE] = 'workspace.reportFields.dateType',
        _a[CONST_1.default.REPORT_FIELD_TYPES.LIST] = 'workspace.reportFields.dropdownType',
        _a[CONST_1.default.REPORT_FIELD_TYPES.FORMULA] = 'workspace.reportFields.formulaType',
        _a);
    return typeTranslationKeysStrategy[reportFieldType];
}
/**
 * Gets the translation key for the alternative text for the report field.
 */
function getReportFieldAlternativeTextTranslationKey(reportFieldType) {
    var _a;
    var typeTranslationKeysStrategy = (_a = {},
        _a[CONST_1.default.REPORT_FIELD_TYPES.TEXT] = 'workspace.reportFields.textAlternateText',
        _a[CONST_1.default.REPORT_FIELD_TYPES.DATE] = 'workspace.reportFields.dateAlternateText',
        _a[CONST_1.default.REPORT_FIELD_TYPES.LIST] = 'workspace.reportFields.dropdownAlternateText',
        _a[CONST_1.default.REPORT_FIELD_TYPES.FORMULA] = 'workspace.reportFields.formulaAlternateText',
        _a);
    return typeTranslationKeysStrategy[reportFieldType];
}
/**
 * Validates the list value name.
 */
function validateReportFieldListValueName(valueName, priorValueName, listValues, inputID) {
    var errors = {};
    if (!(0, ValidationUtils_1.isRequiredFulfilled)(valueName)) {
        // eslint-disable-next-line @typescript-eslint/no-deprecated
        errors[inputID] = (0, Localize_1.translateLocal)('workspace.reportFields.listValueRequiredError');
    }
    else if (priorValueName !== valueName && listValues.some(function (currentValueName) { return currentValueName === valueName; })) {
        // eslint-disable-next-line @typescript-eslint/no-deprecated
        errors[inputID] = (0, Localize_1.translateLocal)('workspace.reportFields.existingListValueError');
    }
    else if (__spreadArray([], valueName, true).length > CONST_1.default.WORKSPACE_REPORT_FIELD_POLICY_MAX_LENGTH) {
        // Uses the spread syntax to count the number of Unicode code points instead of the number of UTF-16 code units.
        // eslint-disable-next-line @typescript-eslint/no-deprecated
        (0, ErrorUtils_1.addErrorMessage)(errors, inputID, (0, Localize_1.translateLocal)('common.error.characterLimitExceedCounter', { length: __spreadArray([], valueName, true).length, limit: CONST_1.default.WORKSPACE_REPORT_FIELD_POLICY_MAX_LENGTH }));
    }
    return errors;
}
/**
 * Generates a field ID based on the field name.
 */
function generateFieldID(name) {
    return "field_id_".concat(name.replace(CONST_1.default.REGEX.ANY_SPACE, '_').toUpperCase());
}
/**
 * Gets the initial value for a report field.
 */
function getReportFieldInitialValue(reportField) {
    var _a, _b;
    if (!reportField) {
        return '';
    }
    if (reportField.type === CONST_1.default.REPORT_FIELD_TYPES.LIST) {
        return (_a = reportField.defaultValue) !== null && _a !== void 0 ? _a : '';
    }
    if (reportField.type === CONST_1.default.REPORT_FIELD_TYPES.DATE) {
        // eslint-disable-next-line @typescript-eslint/no-deprecated
        return (0, Localize_1.translateLocal)('common.currentDate');
    }
    return (_b = reportField.value) !== null && _b !== void 0 ? _b : reportField.defaultValue;
}
/**
 * Determine if a string contains any recognized formula parts (e.g., {report:id}).
 * Only returns true when at least one parsed part is not free text.
 */
function hasFormulaPartsInInitialValue(initialValue) {
    if (!initialValue || typeof initialValue !== 'string') {
        return false;
    }
    // Dynamically require to avoid circular dependency with ReportActionsUtils
    var _a = require('./Formula'), parse = _a.parse, FORMULA_PART_TYPES = _a.FORMULA_PART_TYPES;
    return parse(initialValue).some(function (part) { return part.type !== FORMULA_PART_TYPES.FREETEXT; });
}
