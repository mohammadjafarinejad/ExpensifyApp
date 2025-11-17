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
exports.FORMULA_PART_TYPES = void 0;
exports.compute = compute;
exports.extract = extract;
exports.getAutoReportingDates = getAutoReportingDates;
exports.parse = parse;
exports.hasCircularReferences = hasCircularReferences;
var date_fns_1 = require("date-fns");
var CONST_1 = require("@src/CONST");
var EmptyObject_1 = require("@src/types/utils/EmptyObject");
var CurrencyUtils_1 = require("./CurrencyUtils");
var FormulaDatetime_1 = require("./FormulaDatetime");
var getBase62ReportID_1 = require("./getBase62ReportID");
var ReportActionsUtils_1 = require("./ReportActionsUtils");
var ReportUtils_1 = require("./ReportUtils");
var TransactionUtils_1 = require("./TransactionUtils");
var FORMULA_PART_TYPES = {
    REPORT: 'report',
    FIELD: 'field',
    USER: 'user',
    FREETEXT: 'freetext',
};
exports.FORMULA_PART_TYPES = FORMULA_PART_TYPES;
/**
 * Extract formula parts from a formula string, handling nested braces and escapes
 * Based on OldDot Formula.extract method
 */
function extract(formula, opener, closer) {
    if (opener === void 0) { opener = '{'; }
    if (closer === void 0) { closer = '}'; }
    if (!formula || typeof formula !== 'string') {
        return [];
    }
    var letters = formula.split('');
    var sections = [];
    var nesting = 0;
    var start = 0;
    for (var i = 0; i < letters.length; i++) {
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
function parse(formula) {
    if (!formula || typeof formula !== 'string') {
        return [];
    }
    var parts = [];
    var formulaParts = extract(formula);
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
    var lastIndex = 0;
    formulaParts.forEach(function (part) {
        var partIndex = formula.indexOf(part, lastIndex);
        // Add any free text before this formula part
        if (partIndex > lastIndex) {
            var freeText = formula.substring(lastIndex, partIndex);
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
        var freeText = formula.substring(lastIndex);
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
function parsePart(definition) {
    var _a, _b;
    var part = {
        definition: definition,
        type: FORMULA_PART_TYPES.FREETEXT,
        fieldPath: [],
        functions: [],
    };
    // If it doesn't start and end with braces, it's free text
    if (!definition.startsWith('{') || !definition.endsWith('}')) {
        return part;
    }
    // Remove the braces and trim
    var cleanDefinition = definition.slice(1, -1).trim();
    if (!cleanDefinition) {
        return part;
    }
    // Split on | to separate functions
    var segments = cleanDefinition.split('|');
    var fieldSegment = segments.at(0);
    var functions = segments.slice(1);
    // Split the field segment on : to get the field path
    var fieldPath = fieldSegment === null || fieldSegment === void 0 ? void 0 : fieldSegment.split(':');
    var type = (_a = fieldPath === null || fieldPath === void 0 ? void 0 : fieldPath.at(0)) === null || _a === void 0 ? void 0 : _a.toLowerCase();
    // Determine the formula part type
    if (type === 'report') {
        part.type = FORMULA_PART_TYPES.REPORT;
    }
    else if (type === 'field') {
        part.type = FORMULA_PART_TYPES.FIELD;
    }
    else if (type === 'user') {
        part.type = FORMULA_PART_TYPES.USER;
    }
    // Set field path (excluding the type)
    part.fieldPath = (_b = fieldPath === null || fieldPath === void 0 ? void 0 : fieldPath.slice(1)) !== null && _b !== void 0 ? _b : [];
    part.functions = functions;
    return part;
}
/**
 * Check if the report field formula value is containing circular references, e.g example:  A -> A,  A->B->A,  A->B->C->A, etc
 */
function hasCircularReferences(fieldValue, fieldName, fieldList) {
    var formulaPartDefinitions = extract(fieldValue);
    if (formulaPartDefinitions.length === 0 || (0, EmptyObject_1.isEmptyObject)(fieldList)) {
        return false;
    }
    var visitedFields = new Set();
    var fieldsByName = new Map(Object.values(fieldList).map(function (field) { return [field.name, field]; }));
    // Helper function to check if a field has circular references
    var hasCircularReferencesRecursive = function (currentFieldValue, currentFieldName) {
        var _a;
        // If we've already visited this field in the current path, return true
        if (visitedFields.has(currentFieldName)) {
            return true;
        }
        // Add current field to the visited lists
        visitedFields.add(currentFieldName);
        // Extract all formula part definitions
        var currentFormulaPartDefinitions = extract(currentFieldValue);
        for (var _i = 0, currentFormulaPartDefinitions_1 = currentFormulaPartDefinitions; _i < currentFormulaPartDefinitions_1.length; _i++) {
            var formulaPartDefinition = currentFormulaPartDefinitions_1[_i];
            var part = parsePart(formulaPartDefinition);
            // Only check field references (skip report, user, or freetext)
            if (part.type !== FORMULA_PART_TYPES.FIELD) {
                continue;
            }
            // Get the referenced field name (first element in fieldPath)
            var referencedFieldName = (_a = part.fieldPath.at(0)) === null || _a === void 0 ? void 0 : _a.trim();
            if (!referencedFieldName) {
                continue;
            }
            // Check if this reference creates a cycle
            if (referencedFieldName === fieldName || visitedFields.has(referencedFieldName)) {
                return true;
            }
            var referencedField = fieldsByName.get(referencedFieldName);
            if (referencedField === null || referencedField === void 0 ? void 0 : referencedField.defaultValue) {
                // Recursively check the referenced field
                if (hasCircularReferencesRecursive(referencedField.defaultValue, referencedFieldName)) {
                    return true;
                }
            }
        }
        // Remove current field from visited lists
        visitedFields.delete(currentFieldName);
        return false;
    };
    return hasCircularReferencesRecursive(fieldValue, fieldName);
}
/**
 * Compute the value of a formula given a context
 */
function compute(formula, context) {
    if (!formula || typeof formula !== 'string') {
        return '';
    }
    if (!context) {
        return '';
    }
    var parts = parse(formula);
    var result = '';
    for (var _i = 0, parts_1 = parts; _i < parts_1.length; _i++) {
        var part = parts_1[_i];
        var value = '';
        switch (part.type) {
            case FORMULA_PART_TYPES.REPORT:
                value = computeReportPart(part, context);
                value = value === '' ? part.definition : value;
                break;
            case FORMULA_PART_TYPES.FIELD:
                value = computeFieldPart(part);
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
 * Compute auto-reporting info for a report formula part
 */
function computeAutoReportingInfo(part, context, subField, format) {
    var report = context.report, policy = context.policy;
    if (!subField) {
        return part.definition;
    }
    var _a = getAutoReportingDates(policy, report), startDate = _a.startDate, endDate = _a.endDate;
    switch (subField.toLowerCase()) {
        case 'start':
            return (0, FormulaDatetime_1.formatDate)(startDate === null || startDate === void 0 ? void 0 : startDate.toISOString(), format);
        case 'end':
            return (0, FormulaDatetime_1.formatDate)(endDate === null || endDate === void 0 ? void 0 : endDate.toISOString(), format);
        default:
            return part.definition;
    }
}
/**
 * Compute the value of a report formula part
 */
function computeReportPart(part, context) {
    var _a, _b, _c, _d, _e, _f;
    var report = context.report, policy = context.policy, allTransactions = context.allTransactions;
    var _g = part.fieldPath, field = _g[0], additionalPath = _g.slice(1);
    // Reconstruct format string by joining additional path elements with ':'
    // This handles format strings with colons like 'HH:mm:ss'
    var format = additionalPath.length > 0 ? additionalPath.join(':') : undefined;
    if (!field) {
        return part.definition;
    }
    switch (field.toLowerCase()) {
        case 'id':
            return (0, getBase62ReportID_1.default)(Number(report.reportID));
        case 'status':
            return formatStatus(report.statusNum);
        case 'expensescount':
            return String(getExpensesCount(report, allTransactions));
        case 'type':
            return formatType(report.type);
        case 'startdate':
            return (0, FormulaDatetime_1.formatDate)(getOldestTransactionDate(report.reportID, context), format);
        case 'enddate':
            return (0, FormulaDatetime_1.formatDate)(getNewestTransactionDate(report.reportID, context), format);
        case 'total':
            return formatAmount(report.total, (_b = (0, CurrencyUtils_1.getCurrencySymbol)((_a = report.currency) !== null && _a !== void 0 ? _a : '')) !== null && _b !== void 0 ? _b : report.currency);
        case 'reimbursable':
            return formatAmount((0, ReportUtils_1.getMoneyRequestSpendBreakdown)(report).reimbursableSpend, (_d = (0, CurrencyUtils_1.getCurrencySymbol)((_c = report.currency) !== null && _c !== void 0 ? _c : '')) !== null && _d !== void 0 ? _d : report.currency);
        case 'currency':
            return (_e = report.currency) !== null && _e !== void 0 ? _e : '';
        case 'policyname':
        case 'workspacename':
            return (_f = policy === null || policy === void 0 ? void 0 : policy.name) !== null && _f !== void 0 ? _f : '';
        case 'created':
            // Backend will always return at least one report action (of type created) and its date is equal to report's creation date
            // We can make it slightly more efficient in the future by ensuring report.created is always present in backend's responses
            return (0, FormulaDatetime_1.formatDate)(getOldestReportActionDate(report.reportID), format);
        case 'autoreporting': {
            var subField = additionalPath.at(0);
            // For multi-part formulas, format is everything after the subfield
            var autoReportingFormat = additionalPath.length > 1 ? additionalPath.slice(1).join(':') : undefined;
            return computeAutoReportingInfo(part, context, subField, autoReportingFormat);
        }
        default:
            return part.definition;
    }
}
/**
 * Get the number of expenses in a report
 * @param report - The report to get expenses for
 * @param allTransactions - Optional map of all transactions. If provided, uses this instead of fetching from Onyx
 */
function getExpensesCount(report, allTransactions) {
    var _a, _b, _c;
    if (!report.reportID) {
        return 0;
    }
    if (allTransactions) {
        var transactions = Object.values(allTransactions).filter(function (transaction) { return !!transaction && transaction.reportID === report.reportID; });
        return (_b = (_a = transactions === null || transactions === void 0 ? void 0 : transactions.filter(function (transaction) { return !(0, TransactionUtils_1.isTransactionPendingDelete)(transaction); })) === null || _a === void 0 ? void 0 : _a.length) !== null && _b !== void 0 ? _b : 0;
    }
    return (_c = report.transactionCount) !== null && _c !== void 0 ? _c : 0;
}
/**
 * Format a report status number to human-readable string
 */
function formatStatus(statusNum) {
    if (statusNum === undefined) {
        return '';
    }
    return (0, ReportUtils_1.getHumanReadableStatus)(statusNum);
}
/**
 * Compute the value of a field formula part
 */
function computeFieldPart(part) {
    // Field computation will be implemented later
    return part.definition;
}
/**
 * Compute the value of a user formula part
 */
function computeUserPart(part) {
    // User computation will be implemented later
    return part.definition;
}
/**
 * Apply functions to a computed value
 */
function applyFunctions(value, functions) {
    var result = value;
    for (var _i = 0, functions_1 = functions; _i < functions_1.length; _i++) {
        var func = functions_1[_i];
        var _a = func.split(':'), functionName = _a[0], args = _a.slice(1);
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
function getFrontPart(value) {
    var _a, _b;
    var trimmed = value.trim();
    // If it's an email, return the part before @
    if (trimmed.includes('@')) {
        return (_a = trimmed.split('@').at(0)) !== null && _a !== void 0 ? _a : '';
    }
    // Otherwise, return the first word
    return (_b = trimmed.split(' ').at(0)) !== null && _b !== void 0 ? _b : '';
}
/**
 * Get the domain name of an email or URL
 */
function getDomainName(value) {
    var _a;
    var trimmed = value.trim();
    // If it's an email, return the part after @
    if (trimmed.includes('@')) {
        return (_a = trimmed.split('@').at(1)) !== null && _a !== void 0 ? _a : '';
    }
    return '';
}
/**
 * Get substring of a value
 */
function getSubstring(value, args) {
    var _a, _b;
    var start = parseInt((_a = args.at(0)) !== null && _a !== void 0 ? _a : '', 10) || 0;
    var length = args.at(1) ? parseInt((_b = args.at(1)) !== null && _b !== void 0 ? _b : '', 10) : undefined;
    if (length !== undefined) {
        return value.substring(start, start + length);
    }
    return value.substring(start);
}
/**
 * Format an amount value
 */
function formatAmount(amount, currency) {
    if (amount === undefined) {
        return '';
    }
    var absoluteAmount = Math.abs(amount);
    var formattedAmount = (absoluteAmount / 100).toFixed(2);
    if (currency) {
        return "".concat(currency).concat(formattedAmount);
    }
    return formattedAmount;
}
/**
 * Get the date of the oldest report action for a given report
 */
function getOldestReportActionDate(reportID) {
    if (!reportID) {
        return undefined;
    }
    var reportActions = (0, ReportActionsUtils_1.getAllReportActions)(reportID);
    if (!reportActions || Object.keys(reportActions).length === 0) {
        return undefined;
    }
    var oldestDate;
    Object.values(reportActions).forEach(function (action) {
        if (!(action === null || action === void 0 ? void 0 : action.created)) {
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
function formatType(type) {
    var _a;
    if (!type) {
        return '';
    }
    var typeMapping = (_a = {},
        _a[CONST_1.default.REPORT.TYPE.EXPENSE] = 'Expense Report',
        _a[CONST_1.default.REPORT.TYPE.INVOICE] = 'Invoice',
        _a[CONST_1.default.REPORT.TYPE.CHAT] = 'Chat',
        _a[CONST_1.default.REPORT.UNSUPPORTED_TYPE.BILL] = 'Bill',
        _a[CONST_1.default.REPORT.UNSUPPORTED_TYPE.PAYCHECK] = 'Paycheck',
        _a[CONST_1.default.REPORT.TYPE.IOU] = 'IOU',
        _a[CONST_1.default.REPORT.TYPE.TASK] = 'Task',
        _a.trip = 'Trip',
        _a);
    return typeMapping[type.toLowerCase()] || type;
}
/**
 * Get all transactions for a report, including any context transaction.
 * Updates an existing transaction if it matches the context or adds it if new.
 */
function getAllReportTransactionsWithContext(reportID, context) {
    var transactions = __spreadArray([], (0, ReportUtils_1.getReportTransactions)(reportID), true);
    var contextTransaction = context === null || context === void 0 ? void 0 : context.transaction;
    if ((contextTransaction === null || contextTransaction === void 0 ? void 0 : contextTransaction.transactionID) && contextTransaction.reportID === reportID) {
        var transactionIndex = transactions.findIndex(function (transaction) { return (transaction === null || transaction === void 0 ? void 0 : transaction.transactionID) === contextTransaction.transactionID; });
        if (transactionIndex >= 0) {
            transactions[transactionIndex] = contextTransaction;
        }
        else {
            transactions.push(contextTransaction);
        }
    }
    return transactions;
}
/**
 * Get the date of the oldest transaction for a given report
 */
function getOldestTransactionDate(reportID, context) {
    if (!reportID) {
        return undefined;
    }
    var transactions = getAllReportTransactionsWithContext(reportID, context);
    if (!transactions || transactions.length === 0) {
        return new Date().toISOString();
    }
    var oldestDate;
    transactions.forEach(function (transaction) {
        var created = (0, TransactionUtils_1.getCreated)(transaction);
        if (!created) {
            return;
        }
        // Skip transactions with pending deletion (offline deletes) to calculate dates properly.
        if (transaction.pendingAction === CONST_1.default.RED_BRICK_ROAD_PENDING_ACTION.DELETE) {
            return;
        }
        if (oldestDate && created >= oldestDate) {
            return;
        }
        if ((0, TransactionUtils_1.isPartialTransaction)(transaction)) {
            return;
        }
        oldestDate = created;
    });
    return oldestDate;
}
/**
 * Calculate monthly reporting period for a specific day offset
 */
function getMonthlyReportingPeriod(currentDate, offsetDay) {
    var currentDay = currentDate.getDate();
    var currentYear = currentDate.getFullYear();
    var currentMonth = currentDate.getMonth();
    if (currentDay <= offsetDay) {
        // We haven't reached the reporting day yet - period is from last month's offset+1 to this month's offset
        var prevMonth = currentMonth - 1;
        var prevYear = prevMonth < 0 ? currentYear - 1 : currentYear;
        var adjustedPrevMonth = prevMonth < 0 ? 11 : prevMonth;
        var prevMonthDays = (0, date_fns_1.lastDayOfMonth)(new Date(prevYear, adjustedPrevMonth, 1)).getDate();
        var prevOffsetDay = Math.min(offsetDay, prevMonthDays);
        var currentMonthDays_1 = (0, date_fns_1.lastDayOfMonth)(currentDate).getDate();
        var currentOffsetDay_1 = Math.min(offsetDay, currentMonthDays_1);
        return {
            startDate: new Date(prevYear, adjustedPrevMonth, prevOffsetDay + 1, 0, 0, 0, 0),
            endDate: new Date(currentYear, currentMonth, currentOffsetDay_1, 23, 59, 59, 999),
        };
    }
    // We've passed the reporting day - period is from this month's offset+1 to next month's offset
    var nextMonth = currentMonth + 1;
    var nextYear = nextMonth > 11 ? currentYear + 1 : currentYear;
    var adjustedNextMonth = nextMonth > 11 ? 0 : nextMonth;
    var currentMonthDays = (0, date_fns_1.lastDayOfMonth)(currentDate).getDate();
    var currentOffsetDay = Math.min(offsetDay, currentMonthDays);
    var nextMonthDays = (0, date_fns_1.lastDayOfMonth)(new Date(nextYear, adjustedNextMonth, 1)).getDate();
    var nextOffsetDay = Math.min(offsetDay, nextMonthDays);
    return {
        startDate: new Date(currentYear, currentMonth, currentOffsetDay + 1, 0, 0, 0, 0),
        endDate: new Date(nextYear, adjustedNextMonth, nextOffsetDay, 23, 59, 59, 999),
    };
}
/**
 * Calculate monthly reporting period for last business day
 */
function getMonthlyLastBusinessDayPeriod(currentDate) {
    var endDate = (0, date_fns_1.endOfMonth)(currentDate);
    // Move backward to find last business day (Mon-Fri)
    while ((0, date_fns_1.getDay)(endDate) === 0 || (0, date_fns_1.getDay)(endDate) === 6) {
        endDate = (0, date_fns_1.subDays)(endDate, 1);
    }
    return {
        startDate: (0, date_fns_1.startOfMonth)(currentDate),
        endDate: (0, date_fns_1.endOfDay)(endDate),
    };
}
/**
 * Calculate the start and end dates for auto-reporting based on the frequency and current date
 */
function getAutoReportingDates(policy, report, currentDate) {
    if (currentDate === void 0) { currentDate = new Date(); }
    var frequency = policy === null || policy === void 0 ? void 0 : policy.autoReportingFrequency;
    var offset = policy === null || policy === void 0 ? void 0 : policy.autoReportingOffset;
    // Return undefined if no frequency is set
    if (!frequency || !policy) {
        return { startDate: undefined, endDate: undefined };
    }
    var startDate;
    var endDate;
    switch (frequency) {
        case CONST_1.default.POLICY.AUTO_REPORTING_FREQUENCIES.WEEKLY: {
            // Weekly: use the app's configured week start convention (Monday)
            var weekStartsOn = CONST_1.default.WEEK_STARTS_ON;
            startDate = (0, date_fns_1.startOfWeek)(currentDate, { weekStartsOn: weekStartsOn });
            endDate = (0, date_fns_1.endOfWeek)(currentDate, { weekStartsOn: weekStartsOn });
            break;
        }
        case CONST_1.default.POLICY.AUTO_REPORTING_FREQUENCIES.SEMI_MONTHLY: {
            // Semi-monthly: 1st-15th or 16th-end of month
            var dayOfMonth = currentDate.getDate();
            if (dayOfMonth <= 15) {
                startDate = (0, date_fns_1.startOfMonth)(currentDate);
                endDate = (0, date_fns_1.set)(currentDate, { date: 15, hours: 23, minutes: 59, seconds: 59, milliseconds: 999 });
            }
            else {
                startDate = (0, date_fns_1.set)(currentDate, { date: 16, hours: 0, minutes: 0, seconds: 0, milliseconds: 0 });
                endDate = (0, date_fns_1.endOfMonth)(currentDate);
            }
            break;
        }
        case CONST_1.default.POLICY.AUTO_REPORTING_FREQUENCIES.MONTHLY: {
            // Monthly reporting with different offset configurations
            if (offset === CONST_1.default.POLICY.AUTO_REPORTING_OFFSET.LAST_BUSINESS_DAY_OF_MONTH) {
                var period = getMonthlyLastBusinessDayPeriod(currentDate);
                startDate = period.startDate;
                endDate = period.endDate;
            }
            else if (typeof offset === 'number') {
                var period = getMonthlyReportingPeriod(currentDate, offset);
                startDate = period.startDate;
                endDate = period.endDate;
            }
            else {
                // Default to full month
                startDate = (0, date_fns_1.startOfMonth)(currentDate);
                endDate = (0, date_fns_1.endOfMonth)(currentDate);
            }
            break;
        }
        case CONST_1.default.POLICY.AUTO_REPORTING_FREQUENCIES.TRIP: {
            // For trip-based, use oldest transaction as start
            var oldestTransactionDateString = getOldestTransactionDate(report.reportID);
            startDate = oldestTransactionDateString ? new Date(oldestTransactionDateString) : currentDate;
            endDate = currentDate;
            break;
        }
        default:
            // For any other frequency, use current date as both start and end
            startDate = currentDate;
            endDate = currentDate;
            break;
    }
    return { startDate: startDate, endDate: endDate };
}
/**
 * Get the date of the newest transaction for a given report
 */
function getNewestTransactionDate(reportID, context) {
    if (!reportID) {
        return undefined;
    }
    var transactions = getAllReportTransactionsWithContext(reportID, context);
    if (!transactions || transactions.length === 0) {
        return new Date().toISOString();
    }
    var newestDate;
    transactions.forEach(function (transaction) {
        var created = (0, TransactionUtils_1.getCreated)(transaction);
        if (!created) {
            return;
        }
        // Skip transactions with pending deletion (offline deletes) to calculate dates properly.
        if (transaction.pendingAction === CONST_1.default.RED_BRICK_ROAD_PENDING_ACTION.DELETE) {
            return;
        }
        if (newestDate && created <= newestDate) {
            return;
        }
        if ((0, TransactionUtils_1.isPartialTransaction)(transaction)) {
            return;
        }
        newestDate = created;
    });
    return newestDate;
}
