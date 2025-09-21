import type {FormInputErrors} from '@components/Form/types';
import CONST from '@src/CONST';
import type {TranslationPaths} from '@src/languages/types';
import type ONYXKEYS from '@src/ONYXKEYS';
import type {InputID} from '@src/types/form/WorkspaceReportFieldForm';
import type {PolicyReportField, PolicyReportFieldType} from '@src/types/onyx/Policy';
import {addErrorMessage} from './ErrorUtils';
import {translateLocal} from './Localize';
import {isRequiredFulfilled} from './ValidationUtils';

/**
 * Gets the translation key for the report field type.
 */
function getReportFieldTypeTranslationKey(reportFieldType: PolicyReportFieldType): TranslationPaths {
    const typeTranslationKeysStrategy: Record<PolicyReportFieldType, TranslationPaths> = {
        formula: 'workspace.reportFields.formulaType',
        [CONST.REPORT_FIELD_TYPES.TEXT]: 'workspace.reportFields.textType',
        [CONST.REPORT_FIELD_TYPES.DATE]: 'workspace.reportFields.dateType',
        [CONST.REPORT_FIELD_TYPES.LIST]: 'workspace.reportFields.dropdownType',
    };

    return typeTranslationKeysStrategy[reportFieldType];
}

/**
 * Gets the translation key for the alternative text for the report field.
 */
function getReportFieldAlternativeTextTranslationKey(reportFieldType: PolicyReportFieldType): TranslationPaths {
    const typeTranslationKeysStrategy: Record<PolicyReportFieldType, TranslationPaths> = {
        formula: 'workspace.reportFields.textAlternateText',
        [CONST.REPORT_FIELD_TYPES.TEXT]: 'workspace.reportFields.textAlternateText',
        [CONST.REPORT_FIELD_TYPES.DATE]: 'workspace.reportFields.dateAlternateText',
        [CONST.REPORT_FIELD_TYPES.LIST]: 'workspace.reportFields.dropdownAlternateText',
    };

    return typeTranslationKeysStrategy[reportFieldType];
}

/**
 * Validates the list value name.
 */
function validateReportFieldListValueName(
    valueName: string,
    priorValueName: string,
    listValues: string[],
    inputID: InputID,
): FormInputErrors<typeof ONYXKEYS.FORMS.WORKSPACE_REPORT_FIELDS_FORM> {
    const errors: FormInputErrors<typeof ONYXKEYS.FORMS.WORKSPACE_REPORT_FIELDS_FORM> = {};

    if (!isRequiredFulfilled(valueName)) {
        errors[inputID] = translateLocal('workspace.reportFields.listValueRequiredError');
    } else if (priorValueName !== valueName && listValues.some((currentValueName) => currentValueName === valueName)) {
        errors[inputID] = translateLocal('workspace.reportFields.existingListValueError');
    } else if ([...valueName].length > CONST.WORKSPACE_REPORT_FIELD_POLICY_MAX_LENGTH) {
        // Uses the spread syntax to count the number of Unicode code points instead of the number of UTF-16 code units.
        addErrorMessage(errors, inputID, translateLocal('common.error.characterLimitExceedCounter', {length: [...valueName].length, limit: CONST.WORKSPACE_REPORT_FIELD_POLICY_MAX_LENGTH}));
    }

    return errors;
}

/**
 * Generates a field ID based on the field name.
 * Generates field ID from field name, including automatic/system field names.
 * Use this when retrieving field IDs from existing field names.
 */
function generateFieldID(name: string) {
    if (name.toLowerCase() === CONST.AUTOMATIC_REPORT_TITLE_NAME) {
        return CONST.REPORT_FIELD_TITLE_FIELD_ID;
    }
    return generateUserFieldID(name);
}

/**
 * Generates field ID for user fields (always adds "field_id_" prefix).
 * Use this when creating new field instances to ensure user-generated fields don't intersect with automatic ones.
 */
function generateUserFieldID(name: string) {
    if (!name) {
        return '';
    }
    return `${CONST.REPORT_FIELD_ID_PREFIX}${name.replace(CONST.REGEX.ANY_SPACE, '_').toUpperCase()}`;
}

/**
 * Gets the initial value for a report field.
 */
function getReportFieldInitialValue(reportField: PolicyReportField | null): string {
    if (!reportField) {
        return '';
    }

    if (reportField.type === CONST.REPORT_FIELD_TYPES.LIST) {
        return reportField.defaultValue ?? '';
    }

    if (reportField.type === CONST.REPORT_FIELD_TYPES.DATE) {
        return translateLocal('common.currentDate');
    }

    return reportField.value ?? reportField.defaultValue;
}

function isStringBasedReportField(type?: PolicyReportFieldType) {
    return type === CONST.REPORT_FIELD_TYPES.TEXT || type === 'formula';
}

export {
    getReportFieldTypeTranslationKey,
    getReportFieldAlternativeTextTranslationKey,
    validateReportFieldListValueName,
    generateFieldID,
    generateUserFieldID,
    getReportFieldInitialValue,
    isStringBasedReportField,
};
