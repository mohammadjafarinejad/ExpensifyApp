import type {OnyxEntry} from 'react-native-onyx';
import type {ValueOf} from 'type-fest';
import CONST from '@src/CONST';
import type {Policy, PolicyReportField, Report, Transaction} from '@src/types/onyx';
import {convertToDisplayString, convertToDisplayStringWithoutCurrency, getCurrencySymbol, isValidCurrencyCode} from './CurrencyUtils';
import Log from './Log';
import {getAllReportActions} from './ReportActionsUtils';
// eslint-disable-next-line import/no-cycle
import {getMoneyRequestSpendBreakdown, getPersonalDetailsForAccountID, getReportFieldKey, getReportFieldsByPolicyID, getReportTransactions} from './ReportUtils';
import {getCreated, isPartialTransaction} from './TransactionUtils';
import {generateFieldID} from './WorkspaceReportFieldUtils';

type FormulaPart = {
    /** The original definition from the formula */
    definition: string;

    /** The type of formula part (report, field, user, etc.) */
    type: ValueOf<typeof FORMULA_PART_TYPES>;

    /** The field path for accessing data (e.g., ['type'], ['startdate'], ['total']) */
    fieldPath: string[];

    /** Functions to apply to the computed value (e.g., ['frontPart']) */
    functions: string[];
};

type FormulaContext = {
    report: Report;
    policy: OnyxEntry<Policy>;
    transaction?: Transaction;
};

type FormulaFieldRecursionContext = {
    visitedFieldIDs: Set<string>;
    depth: number;
};

const FORMULA_PART_TYPES = {
    REPORT: 'report',
    FIELD: 'field',
    USER: 'user',
    FREETEXT: 'freetext',
} as const;

/**
 * Extract formula parts from a formula string, handling nested braces and escapes
 * Based on OldDot Formula.extract method
 */
function extract(formula: string, opener = '{', closer = '}'): string[] {
    if (!formula || typeof formula !== 'string') {
        return [];
    }

    const letters = formula.split('');
    const sections: string[] = [];
    let nesting = 0;
    let start = 0;

    for (let i = 0; i < letters.length; i++) {
        // Found an escape character, skip the next character
        if (letters.at(i) === '\\') {
            i++;
            continue;
        }

        // Found an opener, save the spot
        if (letters.at(i) === opener) {
            if (nesting === 0) {
                start = i;
            }
            nesting++;
        }

        // Found a closer, decrement the nesting and possibly extract it
        if (letters.at(i) === closer && nesting > 0) {
            nesting--;
            if (nesting === 0) {
                sections.push(formula.substring(start, i + 1));
            }
        }
    }

    return sections;
}

/**
 * Parse a formula string into an array of formula parts
 * Based on OldDot Formula.parse method
 */
function parse(formula: string): FormulaPart[] {
    if (!formula || typeof formula !== 'string') {
        return [];
    }

    const parts: FormulaPart[] = [];
    const formulaParts = extract(formula);

    // If no formula parts found, treat the entire string as free text
    if (formulaParts.length === 0) {
        if (formula.trim()) {
            parts.push({
                definition: formula,
                type: FORMULA_PART_TYPES.FREETEXT,
                fieldPath: [],
                functions: [],
            });
        }
        return parts;
    }

    // Process the formula by splitting on formula parts to preserve free text
    let lastIndex = 0;

    formulaParts.forEach((part) => {
        const partIndex = formula.indexOf(part, lastIndex);

        // Add any free text before this formula part
        if (partIndex > lastIndex) {
            const freeText = formula.substring(lastIndex, partIndex);
            if (freeText) {
                parts.push({
                    definition: freeText,
                    type: FORMULA_PART_TYPES.FREETEXT,
                    fieldPath: [],
                    functions: [],
                });
            }
        }

        // Add the formula part
        parts.push(parsePart(part));
        lastIndex = partIndex + part.length;
    });

    // Add any remaining free text after the last formula part
    if (lastIndex < formula.length) {
        const freeText = formula.substring(lastIndex);
        if (freeText) {
            parts.push({
                definition: freeText,
                type: FORMULA_PART_TYPES.FREETEXT,
                fieldPath: [],
                functions: [],
            });
        }
    }

    return parts;
}

/**
 * Parse a single formula part definition into a FormulaPart object
 * Based on OldDot Formula.parsePart method
 */
function parsePart(definition: string): FormulaPart {
    const part: FormulaPart = {
        definition,
        type: FORMULA_PART_TYPES.FREETEXT,
        fieldPath: [],
        functions: [],
    };

    // If it doesn't start and end with braces, it's free text
    if (!definition.startsWith('{') || !definition.endsWith('}')) {
        return part;
    }

    // Remove the braces and trim
    const cleanDefinition = definition.slice(1, -1).trim();
    if (!cleanDefinition) {
        return part;
    }

    // Split on | to separate functions
    const segments = cleanDefinition.split('|');
    const fieldSegment = segments.at(0);
    const functions = segments.slice(1);

    // Split the field segment on : to get the field path
    const fieldPath = fieldSegment?.split(':');
    const type = fieldPath?.at(0)?.toLowerCase();

    // Determine the formula part type
    if (type === 'report') {
        part.type = FORMULA_PART_TYPES.REPORT;
    } else if (type === 'field') {
        part.type = FORMULA_PART_TYPES.FIELD;
    } else if (type === 'user') {
        part.type = FORMULA_PART_TYPES.USER;
    }

    // Set field path (excluding the type)
    part.fieldPath = fieldPath?.slice(1) ?? [];
    part.functions = functions;

    return part;
}

/**
 * Compute the value of a formula given a context
 */
function compute(formula: string, context: FormulaContext, recursionContext?: FormulaFieldRecursionContext): string {
    if (!formula || typeof formula !== 'string') {
        return '';
    }

    const parts = parse(formula);
    let result = '';

    for (const part of parts) {
        let value = '';

        switch (part.type) {
            case FORMULA_PART_TYPES.REPORT:
                value = computeReportPart(part, context, recursionContext);
                value = value === '' && part.fieldPath.at(0)?.toLowerCase() !== 'title' ? part.definition : value;
                break;
            case FORMULA_PART_TYPES.FIELD:
                value = computeFieldPart(part, context, recursionContext);
                break;
            case FORMULA_PART_TYPES.USER:
                value = computeUserPart(part);
                break;
            case FORMULA_PART_TYPES.FREETEXT:
                value = part.definition;
                break;
            default:
                // If we don't recognize the part type, use the original definition
                value = part.definition;
        }

        // Apply any functions to the computed value
        value = applyFunctions(value, part.functions);
        result += value;
    }

    return result;
}

/**
 * Compute the value of a report formula part
 */
function computeReportPart(part: FormulaPart, context: FormulaContext, recursionContext?: FormulaFieldRecursionContext): string {
    const {report, policy} = context;
    const [field, format] = part.fieldPath;

    if (!field) {
        return part.definition;
    }

    switch (field.toLowerCase()) {
        case 'title': {
            const titleFieldID = generateFieldID(field);
            recursionContext?.visitedFieldIDs.add(titleFieldID);
            return '';
        }
        case 'type':
            return formatType(report.type);
        case 'startdate':
            return formatDate(getOldestTransactionDate(report.reportID, context), format);
        case 'enddate':
            return formatDate(getNewestTransactionDate(report.reportID, context), format);
        case 'total':
            return formatAmount(report.total, getCurrencySymbol(report.currency ?? '') ?? report.currency, format);
        case 'reimbursable':
            return formatAmount(getMoneyRequestSpendBreakdown(report).reimbursableSpend, getCurrencySymbol(report.currency ?? '') ?? report.currency);
        case 'currency':
            return report.currency ?? '';
        case 'policyname':
        case 'workspacename':
            return policy?.name ?? '';
        case 'created':
            // Backend will always return at least one report action (of type created) and its date is equal to report's creation date
            // We can make it slightly more efficient in the future by ensuring report.created is always present in backend's responses
            return formatDate(getOldestReportActionDate(report.reportID), format);
        case 'submit':
            return computeSubmitPart(part, context);
        default:
            return part.definition;
    }
}

/**
 * Compute the value of a submit formula part (e.g., {report:submit:from:firstname})
 */
function computeSubmitPart(part: FormulaPart, context: FormulaContext): string {
    const {report} = context;
    const [, target, property] = part.fieldPath;

    if (!target) {
        return part.definition;
    }

    let result: string | undefined;

    switch (target.toLowerCase()) {
        case 'from':
            result = computeSubmitterInfo(context, property);
            break;
        case 'to':
            result = computeManagerInfo(context, property);
            break;
        case 'date': {
            const format = property;
            result = formatDate(getReportSubmissionDate(report.reportID), format);
            break;
        }
        default:
            result = part.definition;
    }

    return result ?? part.definition;
}

/**
 * Compute submitter information
 */
function computeSubmitterInfo(context: FormulaContext, property?: string): string | undefined {
    const {report, policy} = context;
    const submitterID = report.ownerAccountID;
    const submitterDetails = getPersonalDetailsForAccountID(submitterID);
    const submitterEmail = submitterDetails?.login;
    const submitterFullName = submitterDetails?.displayName;

    if (!property) {
        // {report:submit:from}
        return (submitterFullName ?? '') || submitterEmail;
    }

    switch (property.toLowerCase()) {
        case 'firstname':
            return submitterDetails?.firstName;
        case 'lastname':
            return submitterDetails?.lastName;
        case 'fullname':
            return submitterFullName;
        case 'email':
            return submitterEmail;
        case 'userid':
            return submitterID?.toString();
        case 'customfield1':
        case 'customfield2': {
            // Get custom field from policy's employeeList
            if (!submitterEmail || !policy?.employeeList) {
                return undefined;
            }
            const customFieldKey = CONST.CUSTOM_FIELD_KEYS[property.toLowerCase() as keyof typeof CONST.CUSTOM_FIELD_KEYS];
            return policy.employeeList[submitterEmail]?.[customFieldKey];
        }
        default:
            return undefined;
    }
}

/**
 * Compute user information from account ID
 */
// Is the email address of the last person who the report was submitted to.
function computeManagerInfo(context: FormulaContext, property?: string): string | undefined {
    const {report} = context;
    const managerID = report.managerID;
    const managerDetails = getPersonalDetailsForAccountID(managerID);
    const managerEmail = managerDetails?.login;

    if (!property) {
        // {report:submit:to}
        return managerEmail;
    }

    switch (property.toLowerCase()) {
        case 'firstname':
            return managerDetails?.firstName;
        case 'lastname':
            return managerDetails?.lastName;
        case 'fullname':
            return managerDetails?.displayName;
        case 'email':
            return managerEmail;
        case 'userid':
            return managerID?.toString();
        default:
            return undefined;
    }
}

/**
 * Compute the value of a field formula part
 */
function computeFieldPart(part: FormulaPart, context: FormulaContext, recursionContext?: FormulaFieldRecursionContext): string {
    const {report} = context;
    const [fieldName, format] = part.fieldPath;

    const fieldID = fieldName ? generateFieldID(fieldName) : undefined;
    const fieldKey = getReportFieldKey(fieldID);
    // On a newly created report in offline mode, fieldList may not be populated yet
    const reportFieldList = report.fieldList ?? getReportFieldsByPolicyID(report.policyID);
    const reportField = reportFieldList[fieldKey];
    if (!reportField) {
        Log.hmmm('[Formula] Report field used in formula not found in the report', {reportID: report.reportID, field: fieldName, formula: part.definition});
        return part.definition;
    }

    let formulaValue = String(reportField.value ?? reportField.defaultValue ?? '');
    if (reportField.type === CONST.REPORT_FIELD_TYPES.DATE) {
        formulaValue = formatDate(formulaValue || new Date().toString(), format);
    }

    if (reportField.type === CONST.REPORT_FIELD_TYPES.LIST) {
        // Ensure selected dropdown value exists in available options (We can also check `disabledOptions`)
        if (Array.isArray(reportField.values) && !reportField.values.includes(formulaValue)) {
            Log.hmmm('[Formula] Invalid dropdown field value', {reportID: report.reportID, field: fieldName, selectedValue: formulaValue, availableOptions: reportField.values});
        }
    }

    if (reportField.type === 'formula') {
        const computedValue = computeFormulaField(reportField, context, recursionContext);
        formulaValue = computedValue ?? '';
    }

    // Get default value from formula definition (fallback)
    const defaultFallback = getDefaultFromDefinition(part.definition) ?? '';
    return formulaValue === '' ? defaultFallback : formulaValue;
}

/**
 * Extract default value from a field formula definition when the field is not found.
 * This gets the whole thing inside the {field:}
 */
function getDefaultFromDefinition(definition: string | undefined): string | undefined {
    if (!definition || typeof definition !== 'string') {
        return undefined;
    }

    const regex = /^\{(field:.*)\}$/;
    const matches = definition.match(regex);

    if (matches?.[1]) {
        return matches[1];
    }

    return undefined;
}

/**
 * Recursively computes and sets the value for a formula field.
 */
function computeFormulaField(
    reportField: PolicyReportField,
    context: FormulaContext,
    recursionContext: FormulaFieldRecursionContext = {visitedFieldIDs: new Set(), depth: 0},
): string | null {
    const {visitedFieldIDs, depth} = recursionContext;

    if (recursionContext.visitedFieldIDs.size === 0) {
        recursionContext.visitedFieldIDs.add(reportField.fieldID);
        const titleFieldID = generateFieldID('title');
        recursionContext?.visitedFieldIDs.add(titleFieldID);
    }

    // Check recursion depth limit
    if (depth >= CONST.FORMULA_MAX_RECURSIVE_DEPTH) {
        Log.hmmm('Maximum recursive formula depth reached', {
            reportID: context.report.reportID,
            fieldID: reportField.fieldID,
            maxDepth: CONST.FORMULA_MAX_RECURSIVE_DEPTH,
            formula: reportField.defaultValue,
            depth,
        });
        return reportField.defaultValue || null;
    }

    // Check for circular references
    const titleFieldID = generateFieldID(CONST.AUTOMATIC_REPORT_TITLE_NAME);
    if ((reportField.fieldID && visitedFieldIDs.has(reportField.fieldID)) || visitedFieldIDs.has(titleFieldID)) {
        Log.hmmm('Circular reference detected in formula field', {
            reportID: context.report.reportID,
            fieldID: reportField.fieldID,
            visitedFields: Array.from(visitedFieldIDs),
            formula: reportField.defaultValue,
            depth,
        });
        return '';
    }

    // Base case: not a formula field
    if (reportField.type !== 'formula' || !reportField.defaultValue) {
        return reportField.defaultValue || null;
    }

    if (reportField.fieldID) {
        visitedFieldIDs.add(reportField.fieldID);
    }

    // Compute the formula
    const formula = reportField.defaultValue;
    const computed = compute(formula, context, {visitedFieldIDs, depth: recursionContext.depth + 1});

    // If computation failed or resulted in the same formula, return default
    if (!computed || computed === formula) {
        return reportField.defaultValue || null;
    }

    return computed;
}

/**
 * Compute the value of a user formula part
 */
function computeUserPart(part: FormulaPart): string {
    // User computation will be implemented later
    return part.definition;
}

/**
 * Apply functions to a computed value
 */
function applyFunctions(value: string, functions: string[]): string {
    let result = value;

    for (const func of functions) {
        const [functionName, ...args] = func.split(':');

        switch (functionName.toLowerCase()) {
            case 'frontpart':
                result = getFrontPart(result);
                break;
            case 'substr':
                result = getSubstring(result, args);
                break;
            case 'domain':
                result = getDomainName(result);
                break;
            case 'leftpad':
                result = leftPadString(result, args);
                break;
            default:
                // Unknown function, leave value as is
                break;
        }
    }

    return result;
}

/**
 * Get the front part of an email or first word of a string
 */
function getFrontPart(value: string): string {
    const trimmed = value.trim();

    // If it's an email, return the part before @
    if (trimmed.includes('@')) {
        return trimmed.split('@').at(0) ?? '';
    }

    // Otherwise, return the first word
    return trimmed.split(' ').at(0) ?? '';
}

/**
 * Get the domain name of an email or URL
 */
function getDomainName(value: string): string {
    const trimmed = value.trim();

    // If it's an email, return the part after @
    if (trimmed.includes('@')) {
        return trimmed.split('@').at(1) ?? '';
    }

    return '';
}

/**
 * Get substring of a value
 */
function getSubstring(value: string, args: string[]): string {
    const start = parseInt(args.at(0) ?? '', 10) || 0;
    const length = args.at(1) ? parseInt(args.at(1) ?? '', 10) : undefined;

    if (length !== undefined) {
        return value.substring(start, start + length);
    }

    return value.substring(start);
}

/**
 * Left-pad a string to a given length with a specified character
 */
function leftPadString(value: string, args: string[]): string {
    const char = args.at(0) ?? ' ';
    const length = args.at(1) ? parseInt(args.at(1) ?? '', 10) : undefined;

    if (!length || length <= value.length) {
        return value;
    }

    return value.padStart(length, char);
}

/**
 * Format a date value with support for multiple date formats
 */
function formatDate(dateString: string | undefined, format = 'yyyy-MM-dd'): string {
    if (!dateString) {
        return '';
    }

    try {
        const date = new Date(dateString);
        if (Number.isNaN(date.getTime())) {
            return '';
        }

        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        const shortMonthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

        switch (format) {
            case 'M/dd/yyyy':
                return `${month}/${day.toString().padStart(2, '0')}/${year}`;
            case 'MMMM dd, yyyy':
                return `${monthNames.at(month - 1)} ${day.toString().padStart(2, '0')}, ${year}`;
            case 'dd MMM yyyy':
                return `${day.toString().padStart(2, '0')} ${shortMonthNames.at(month - 1)} ${year}`;
            case 'yyyy/MM/dd':
                return `${year}/${month.toString().padStart(2, '0')}/${day.toString().padStart(2, '0')}`;
            case 'MMMM, yyyy':
                return `${monthNames.at(month - 1)}, ${year}`;
            case 'yy/MM/dd':
                return `${year.toString().slice(-2)}/${month.toString().padStart(2, '0')}/${day.toString().padStart(2, '0')}`;
            case 'dd/MM/yy':
                return `${day.toString().padStart(2, '0')}/${month.toString().padStart(2, '0')}/${year.toString().slice(-2)}`;
            case 'yyyy':
                return year.toString();
            case 'MM/dd/yyyy':
                return `${month.toString().padStart(2, '0')}/${day.toString().padStart(2, '0')}/${year}`;
            case 'yyyy-MM-dd':
            default:
                return `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
        }
    } catch {
        return '';
    }
}

/**
 * Format an amount value
 */
function formatAmount(amount: number | undefined, currency: string | undefined, format?: string): string {
    if (amount === undefined) {
        return '';
    }

    const absoluteAmount = Math.abs(amount);

    if (format === 'nosymbol') {
        return convertToDisplayStringWithoutCurrency(absoluteAmount, currency);
    }

    // Check for specific currency code (e.g., USD, EUR)
    if (format && isValidCurrencyCode(format)) {
        return convertToDisplayString(absoluteAmount, format);
    }

    if (currency) {
        return convertToDisplayString(absoluteAmount, currency);
    }

    return convertToDisplayStringWithoutCurrency(absoluteAmount, currency);
}

/**
 * Get the submission date for a given report by finding the submit action
 */
function getReportSubmissionDate(reportID: string): string | undefined {
    if (!reportID) {
        return undefined;
    }

    const reportActions = getAllReportActions(reportID);
    if (!reportActions || Object.keys(reportActions).length === 0) {
        return undefined;
    }

    // Look for the submit action
    const submitAction = Object.values(reportActions).find((action) => action?.actionName === CONST.REPORT.ACTIONS.TYPE.SUBMITTED);

    return submitAction?.created;
}

/**
 * Get the date of the oldest report action for a given report
 */
function getOldestReportActionDate(reportID: string): string | undefined {
    if (!reportID) {
        return undefined;
    }

    const reportActions = getAllReportActions(reportID);
    if (!reportActions || Object.keys(reportActions).length === 0) {
        return undefined;
    }

    let oldestDate: string | undefined;

    Object.values(reportActions).forEach((action) => {
        if (!action?.created) {
            return;
        }

        if (oldestDate && action.created > oldestDate) {
            return;
        }
        oldestDate = action.created;
    });

    return oldestDate;
}

/**
 * Format a report type to its human-readable string
 */
function formatType(type: string | undefined): string {
    if (!type) {
        return '';
    }

    const typeMapping: Record<string, string> = {
        [CONST.REPORT.TYPE.EXPENSE]: 'Expense Report',
        [CONST.REPORT.TYPE.INVOICE]: 'Invoice',
        [CONST.REPORT.TYPE.CHAT]: 'Chat',
        [CONST.REPORT.UNSUPPORTED_TYPE.BILL]: 'Bill',
        [CONST.REPORT.UNSUPPORTED_TYPE.PAYCHECK]: 'Paycheck',
        [CONST.REPORT.TYPE.IOU]: 'IOU',
        [CONST.REPORT.TYPE.TASK]: 'Task',
        trip: 'Trip',
    };

    return typeMapping[type.toLowerCase()] || type;
}

function getAllReportTransactionsWithContext(reportID: string, context?: FormulaContext): Transaction[] {
    const transactions = [...getReportTransactions(reportID)];
    const ctxTxn = context?.transaction;

    if (ctxTxn?.transactionID && ctxTxn.reportID === reportID) {
        const idx = transactions.findIndex((t) => t?.transactionID === ctxTxn.transactionID);
        if (idx >= 0) {
            transactions[idx] = ctxTxn;
        } else {
            transactions.push(ctxTxn);
        }
    }

    return transactions;
}

/**
 * Get the date of the oldest transaction for a given report
 */
function getOldestTransactionDate(reportID: string, context?: FormulaContext): string | undefined {
    if (!reportID) {
        return undefined;
    }

    const transactions = getAllReportTransactionsWithContext(reportID, context);
    if (!transactions || transactions.length === 0) {
        return new Date().toISOString();
    }

    let oldestDate: string | undefined;

    transactions.forEach((transaction) => {
        // Use updated transaction data if available and matches this transaction
        const currentTransaction = context?.transaction && transaction.transactionID === context.transaction.transactionID ? context.transaction : transaction;

        const created = getCreated(currentTransaction);
        if (!created) {
            return;
        }
        if (oldestDate && created >= oldestDate) {
            return;
        }
        if (isPartialTransaction(currentTransaction)) {
            return;
        }
        oldestDate = created;
    });

    return oldestDate;
}

/**
 * Get the date of the newest transaction for a given report
 */
function getNewestTransactionDate(reportID: string, context?: FormulaContext): string | undefined {
    if (!reportID) {
        return undefined;
    }

    const transactions = getAllReportTransactionsWithContext(reportID, context);
    if (!transactions || transactions.length === 0) {
        return new Date().toISOString();
    }

    let newestDate: string | undefined;

    transactions.forEach((transaction) => {
        // Use updated transaction data if available and matches this transaction
        const currentTransaction = context?.transaction && transaction.transactionID === context.transaction.transactionID ? context.transaction : transaction;

        const created = getCreated(currentTransaction);
        if (!created) {
            return;
        }
        if (newestDate && created <= newestDate) {
            return;
        }
        if (isPartialTransaction(currentTransaction)) {
            return;
        }
        newestDate = created;
    });

    return newestDate;
}

export {FORMULA_PART_TYPES, compute, extract, parse};

export type {FormulaContext, FormulaPart};
