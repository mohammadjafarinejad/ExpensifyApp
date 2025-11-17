"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertSecondsToTime = convertSecondsToTime;
exports.addSkipTimeTagToURL = addSkipTimeTagToURL;
var Browser_1 = require("@libs/Browser");
/**
 * Converts seconds to '[hours:]minutes:seconds' format
 */
function convertSecondsToTime(secondsTotal) {
    var hours = Math.floor(secondsTotal / 3600);
    var minutes = Math.floor((secondsTotal / 60) % 60);
    var seconds = Math.floor(secondsTotal % 60)
        .toFixed(0)
        .padStart(2, '0');
    return hours > 0 ? "".concat(hours, ":").concat(String(minutes).padStart(2, '0'), ":").concat(seconds) : "".concat(minutes, ":").concat(seconds);
}
/**
 * Adds a #t=seconds tag to the end of the URL to skip first seconds of the video
 */
function addSkipTimeTagToURL(url, seconds) {
    // On iOS: mWeb (WebKit-based browser engines), we don't add the time fragment
    // because it's not supported and will throw (WebKitBlobResource error 1).
    if ((0, Browser_1.isMobileWebKit)() || url.includes('#t=')) {
        return url;
    }
    return "".concat(url, "#t=").concat(seconds);
}
