"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getScriptURL() {
    // On web, load from the origin root so deep links like /r/123 don't request /r/123/gib.js
    return "".concat(window.location.origin, "/gib.js");
}
exports.default = getScriptURL;
