"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_native_fs_1 = require("react-native-fs");
/**
 * Checks if a file exists at the given path without loading it into memory.
 * This is a memory-safe alternative to readFileAsync for validation.
 *
 * @param path - The file path to check (typically starts with file://)
 * @returns Promise that resolves to true if file exists, false otherwise
 */
function checkFileExists(path) {
    if (!path) {
        return Promise.resolve(false);
    }
    // Decode URI if it's URL-encoded (handles special characters in filenames)
    var decodedPath = path;
    try {
        decodedPath = decodeURI(path);
    }
    catch (e) {
        // If decoding fails, use the original path
        decodedPath = path;
    }
    // RNFS.stat() returns file info without loading the file content
    return react_native_fs_1.default.stat(decodedPath)
        .then(function (fileStat) {
        // File exists if we get stats and it's actually a file (not directory)
        return fileStat.isFile();
    })
        .catch(function () {
        // File doesn't exist or can't be accessed
        return false;
    });
}
exports.default = checkFileExists;
