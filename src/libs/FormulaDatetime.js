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
exports.formatDate = formatDate;
exports.getOrdinalSuffix = getOrdinalSuffix;
exports.calculateISOWeekNumber = calculateISOWeekNumber;
exports.calculateDayOfYear = calculateDayOfYear;
exports.getLocalizedNames = getLocalizedNames;
exports.getUTCTimeComponents = getUTCTimeComponents;
exports.createDateTokens = createDateTokens;
exports.applyTokenReplacement = applyTokenReplacement;
var date_fns_1 = require("date-fns");
/**
 * Get ordinal suffix for a day (st, nd, rd, th)
 */
function getOrdinalSuffix(day) {
    if (day >= 11 && day <= 13) {
        return 'th';
    }
    switch (day % 10) {
        case 1:
            return 'st';
        case 2:
            return 'nd';
        case 3:
            return 'rd';
        default:
            return 'th';
    }
}
/**
 * Calculate ISO week number for a given date
 * Uses the "first Thursday" rule: Week 1 is the week containing the year's first Thursday
 */
function calculateISOWeekNumber(date) {
    // Create a copy to avoid modifying the original date
    var target = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));
    // Set to nearest Thursday: current date + 4 - current day number
    // Make Sunday's day number 7 (getUTCDay returns 0 for Sunday)
    // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
    var dayNum = target.getUTCDay() || 7;
    target.setUTCDate(target.getUTCDate() + 4 - dayNum);
    // Get first day of year for the Thursday's year (in UTC)
    var yearStart = new Date(Date.UTC(target.getUTCFullYear(), 0, 1));
    // Calculate full weeks to nearest Thursday
    var weekNum = Math.ceil(((target.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
    return weekNum;
}
/**
 * Calculate day of year (0-indexed)
 */
function calculateDayOfYear(date) {
    var year = date.getFullYear();
    var yearStart = new Date(year, 0, 1);
    return Math.floor((date.getTime() - yearStart.getTime()) / (1000 * 60 * 60 * 24));
}
/**
 * Get localized month and day names using date-fns
 */
function getLocalizedNames(date) {
    return {
        fullMonthName: (0, date_fns_1.format)(date, 'MMMM'),
        shortMonthName: (0, date_fns_1.format)(date, 'MMM'),
        fullDayName: (0, date_fns_1.format)(date, 'EEEE'),
        shortDayName: (0, date_fns_1.format)(date, 'EEE'),
    };
}
/**
 * Get time components in UTC timezone (to match Classic/OldDot behavior)
 */
function getUTCTimeComponents(date) {
    // Use UTC methods to match Classic behavior
    var hours = date.getUTCHours();
    var minutes = date.getUTCMinutes();
    var seconds = date.getUTCSeconds();
    var hours12 = hours;
    if (hours === 0) {
        hours12 = 12;
    }
    else if (hours > 12) {
        hours12 = hours - 12;
    }
    var meridiem = hours >= 12 ? 'pm' : 'am';
    var meridiemUpperCase = hours >= 12 ? 'PM' : 'AM';
    return {
        hours: hours,
        minutes: minutes,
        seconds: seconds,
        hours12: hours12,
        meridiem: meridiem,
        meridiemUpperCase: meridiemUpperCase,
    };
}
/**
 * Format date as RFC 2822/RFC 5322 format
 * Example: "Thu, 08 Jan 2025 15:30:45 +0000"
 */
function formatRFC2822(date) {
    var _a = getLocalizedNames(date), shortDayName = _a.shortDayName, shortMonthName = _a.shortMonthName;
    var day = date.getDate().toString().padStart(2, '0');
    var year = date.getFullYear();
    var hours = date.getUTCHours().toString().padStart(2, '0');
    var minutes = date.getUTCMinutes().toString().padStart(2, '0');
    var seconds = date.getUTCSeconds().toString().padStart(2, '0');
    // Get timezone offset in format +0000 or -0500
    var timezoneOffset = -date.getTimezoneOffset();
    var offsetSign = timezoneOffset >= 0 ? '+' : '-';
    var offsetHours = Math.floor(Math.abs(timezoneOffset) / 60)
        .toString()
        .padStart(2, '0');
    var offsetMinutes = (Math.abs(timezoneOffset) % 60).toString().padStart(2, '0');
    var timezoneString = "".concat(offsetSign).concat(offsetHours).concat(offsetMinutes);
    return "".concat(shortDayName, ", ").concat(day, " ").concat(shortMonthName, " ").concat(year, " ").concat(hours, ":").concat(minutes, ":").concat(seconds, " ").concat(timezoneString);
}
/**
 * Create token definitions for date formatting
 */
function createDateTokens(date) {
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var dayOfWeek = date.getDay(); // 0 = Sunday, 6 = Saturday
    var isoDayOfWeek = dayOfWeek === 0 ? 7 : dayOfWeek; // 1 = Monday, 7 = Sunday
    var dayOfYear = calculateDayOfYear(date);
    var daysInMonth = new Date(year, month, 0).getDate();
    var weekNumber = calculateISOWeekNumber(date);
    // Get localized names
    var _a = getLocalizedNames(date), fullMonthName = _a.fullMonthName, shortMonthName = _a.shortMonthName, fullDayName = _a.fullDayName, shortDayName = _a.shortDayName;
    // Get time components in UTC timezone (to match Classic/OldDot behavior)
    var _b = getUTCTimeComponents(date), hours = _b.hours, minutes = _b.minutes, seconds = _b.seconds, hours12 = _b.hours12, meridiem = _b.meridiem, meridiemUpperCase = _b.meridiemUpperCase;
    return [
        // Year formats (longest to shortest)
        { token: 'yyyy', value: year.toString() },
        { token: 'YYYY', value: year.toString() },
        { token: 'yy', value: year.toString().slice(-2) },
        { token: 'Y', value: year.toString() },
        { token: 'y', value: year.toString().slice(-2) },
        // Month formats (longest to shortest)
        { token: 'MMMM', value: fullMonthName },
        { token: 'MMM', value: shortMonthName },
        { token: 'MM', value: month.toString().padStart(2, '0') },
        { token: 'M', value: shortMonthName }, // Short textual representation (Jan-Dec)
        { token: 'F', value: fullMonthName },
        { token: 'n', value: month.toString() },
        // Day formats (longest to shortest)
        { token: 'dddd', value: fullDayName },
        { token: 'ddd', value: shortDayName },
        { token: 'dd', value: day.toString().padStart(2, '0') },
        { token: 'd', value: day.toString().padStart(2, '0') },
        { token: 'j', value: day.toString() },
        { token: 'l', value: fullDayName },
        { token: 'D', value: shortDayName },
        { token: 'w', value: dayOfWeek.toString() },
        { token: 'N', value: isoDayOfWeek.toString() },
        { token: 'z', value: dayOfYear.toString() },
        { token: 'W', value: weekNumber.toString().padStart(2, '0') },
        { token: 'S', value: getOrdinalSuffix(day) },
        // Time formats (longest to shortest)
        { token: 'tt', value: meridiemUpperCase },
        { token: 'hh', value: hours12.toString().padStart(2, '0') },
        { token: 'HH', value: hours.toString().padStart(2, '0') },
        { token: 'mm', value: minutes.toString().padStart(2, '0') },
        { token: 'ss', value: seconds.toString().padStart(2, '0') },
        { token: 'H', value: hours.toString().padStart(2, '0') }, // WITH leading zeros (00-23)
        { token: 'h', value: hours12.toString().padStart(2, '0') }, // WITH leading zeros (01-12)
        { token: 'G', value: hours.toString() }, // WITHOUT leading zeros (0-23)
        { token: 'g', value: hours12.toString() }, // WITHOUT leading zeros (1-12)
        { token: 'i', value: minutes.toString().padStart(2, '0') },
        { token: 't', value: daysInMonth.toString() },
        { token: 's', value: seconds.toString().padStart(2, '0') },
        { token: 'A', value: meridiemUpperCase },
        { token: 'a', value: meridiem },
        // Full Date/Time formats
        { token: 'c', value: date.toISOString() }, // ISO 8601: 2025-01-08T15:30:45.123Z
        { token: 'r', value: formatRFC2822(date) }, // RFC 2822: Thu, 08 Jan 2025 15:30:45 +0000
        { token: 'U', value: Math.floor(date.getTime() / 1000).toString() }, // Unix timestamp
    ];
}
/**
 * Apply two-phase token replacement to prevent conflicts
 */
function applyTokenReplacement(format, tokens) {
    var result = format;
    // Sort tokens by length (longest first) to prevent conflicts
    var sortedTokens = __spreadArray([], tokens, true).sort(function (a, b) { return b.token.length - a.token.length; });
    // Phase 1: Replace tokens with unique placeholders
    var placeholderMap = {};
    for (var i = 0; i < sortedTokens.length; i++) {
        var tokenData = sortedTokens.at(i);
        if (!tokenData) {
            continue;
        }
        var token = tokenData.token, value = tokenData.value;
        var placeholder = "###".concat(i.toString().padStart(3, '0'), "###");
        var regex = new RegExp(token.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
        if (result.includes(token)) {
            result = result.replace(regex, placeholder);
            placeholderMap[placeholder] = value;
        }
    }
    // Phase 2: Replace placeholders with actual values
    for (var _i = 0, _a = Object.entries(placeholderMap); _i < _a.length; _i++) {
        var _b = _a[_i], placeholder = _b[0], value = _b[1];
        result = result.replace(new RegExp(placeholder.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), value);
    }
    return result;
}
/**
 * Format a date value with comprehensive token-based date format support
 * Supports 40+ date format tokens with localization and timezone handling
 */
function formatDate(dateString, format) {
    if (format === void 0) { format = 'yyyy-MM-dd'; }
    if (!dateString) {
        return '';
    }
    try {
        var date = new Date(dateString);
        if (Number.isNaN(date.getTime())) {
            return '';
        }
        // Create tokens for the date
        var tokens = createDateTokens(date);
        // Apply token replacement
        return applyTokenReplacement(format, tokens);
    }
    catch (_a) {
        return '';
    }
}
