"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadExpensifyIcon = loadExpensifyIcon;
exports.loadExpensifyIconsChunk = loadExpensifyIconsChunk;
var expensifyIconsChunk = null;
var chunkLoadingPromise = null;
/**
 * Load the ExpensifyIcons chunk eagerly
 */
function loadExpensifyIconsChunk() {
    if (expensifyIconsChunk) {
        return Promise.resolve(expensifyIconsChunk);
    }
    if (chunkLoadingPromise) {
        return chunkLoadingPromise;
    }
    chunkLoadingPromise = Promise.resolve().then(function () { return require(
    /* webpackChunkName: "expensifyIcons" */
    /* webpackPreload: true */
    './chunks/expensify-icons.chunk'); }).then(function (chunk) {
        var typedChunk = chunk;
        expensifyIconsChunk = typedChunk;
        return typedChunk;
    })
        .catch(function (error) {
        chunkLoadingPromise = null; // Reset on error to allow retry
        throw new Error("Failed to load ExpensifyIcons chunk: ".concat(String(error)));
    });
    return chunkLoadingPromise;
}
/**
 * Get an ExpensifyIcon by name from the eagerly loaded chunk
 * This function provides immediate access once the chunk is loaded
 */
function loadExpensifyIcon(iconName) {
    return loadExpensifyIconsChunk()
        .then(function (chunk) {
        var icon = chunk.getExpensifyIcon(iconName);
        if (!icon) {
            throw new Error("ExpensifyIcon \"".concat(iconName, "\" not found"));
        }
        return { default: icon };
    })
        .catch(function (error) {
        // eslint-disable-next-line no-console
        console.error("Failed to load ExpensifyIcon: ".concat(iconName), error);
        throw error;
    });
}
