"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadIllustration = loadIllustration;
exports.loadIllustrationsChunk = loadIllustrationsChunk;
var illustrationsChunk = null;
var chunkLoadingPromise = null;
/**
 * Load the illustrations chunk eagerly
 */
function loadIllustrationsChunk() {
    if (illustrationsChunk) {
        return Promise.resolve(illustrationsChunk);
    }
    if (chunkLoadingPromise) {
        return chunkLoadingPromise;
    }
    chunkLoadingPromise = Promise.resolve().then(function () { return require(
    /* webpackChunkName: "illustrations" */
    /* webpackPreload: true */
    './chunks/illustrations.chunk'); }).then(function (chunk) {
        var typedChunk = chunk;
        illustrationsChunk = typedChunk;
        return typedChunk;
    })
        .catch(function (error) {
        chunkLoadingPromise = null; // Reset on error to allow retry
        throw new Error("Failed to load Illustrations chunk: ".concat(String(error)));
    });
    return chunkLoadingPromise;
}
/**
 * Get an Illustration by name from the eagerly loaded chunk
 * This function provides immediate access once the chunk is loaded
 */
function loadIllustration(illustrationName) {
    return loadIllustrationsChunk()
        .then(function (chunk) {
        var illustration = chunk.getIllustration(illustrationName);
        if (!illustration) {
            throw new Error("Illustration \"".concat(illustrationName, "\" not found"));
        }
        return { default: illustration }; // Changed to return {default: illustration}
    })
        .catch(function (error) {
        // eslint-disable-next-line no-console
        console.error("Failed to load Illustration: ".concat(illustrationName), error);
        throw error;
    });
}
