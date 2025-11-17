#!/usr/bin/env ts-node
"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var github = require("@actions/github");
var fs = require("fs");
var path = require("path");
var svgo_1 = require("svgo");
var GithubUtils_1 = require("@github/libs/GithubUtils");
// Suffix for files to be ignored from compression eg. file-ignore-compression.svg
var IGNORE_SUFFIX = '-ignore-compression';
// SVGO Default plugins
var svgoConfig = {
    plugins: [
        'removeDoctype',
        'removeXMLProcInst',
        'removeComments',
        'removeDeprecatedAttrs',
        'removeMetadata',
        'removeEditorsNSData',
        'cleanupAttrs',
        'mergeStyles',
        // 'inlineStyles', // Cause issues with fill on Android
        'minifyStyles',
        'cleanupIds',
        'removeUselessDefs',
        'cleanupNumericValues',
        'convertColors',
        'removeNonInheritableGroupAttrs',
        'removeUnknownsAndDefaults',
        'removeUselessStrokeAndFill',
        'cleanupEnableBackground',
        'removeHiddenElems',
        'removeEmptyText',
        'convertShapeToPath',
        'convertEllipseToCircle',
        'moveElemsAttrsToGroup',
        'moveGroupAttrsToElems',
        'collapseGroups',
        'convertPathData',
        'convertTransform',
        'removeEmptyAttrs',
        'removeEmptyContainers',
        'mergePaths',
        'removeUnusedNS',
        'sortAttrs',
        'sortDefsChildren',
        'removeDesc',
    ],
};
function findSvgFiles(dir) {
    var svgFiles = [];
    function scanDirectory(currentDir) {
        var items = fs.readdirSync(currentDir, { withFileTypes: true });
        for (var _i = 0, items_1 = items; _i < items_1.length; _i++) {
            var item = items_1[_i];
            var fullPath = path.join(currentDir, item.name);
            if (item.isDirectory()) {
                scanDirectory(fullPath);
            }
            else if (item.isFile() && path.extname(item.name).toLowerCase() === '.svg') {
                svgFiles.push(fullPath);
            }
        }
    }
    scanDirectory(dir);
    return svgFiles;
}
function formatBytes(bytes) {
    return (bytes / 1024).toFixed(2);
}
function compressSvgFile(filePath, isSavingFile) {
    var originalContent = fs.readFileSync(filePath, 'utf8');
    var originalSize = Buffer.byteLength(originalContent, 'utf8');
    try {
        var currentContent = originalContent;
        var currentSize = originalSize;
        var totalSavings = 0;
        // Perform 5 iterations, as additional savings could be gained with another pass (2–3 are usually enough).
        // For checking if file is compressed, we only need to run once.
        var maxPasses = isSavingFile ? 5 : 1;
        for (var pass = 1; pass <= maxPasses; pass++) {
            var result = (0, svgo_1.optimize)(currentContent, __assign({ path: filePath }, svgoConfig));
            var compressedContent = result.data;
            var compressedSize = Buffer.byteLength(compressedContent, 'utf8');
            var passSavings = currentSize - compressedSize;
            if (passSavings <= 0) {
                break;
            }
            totalSavings += passSavings;
            currentContent = compressedContent;
            currentSize = compressedSize;
            if (pass === maxPasses || passSavings < 10) {
                break;
            }
        }
        var finalSavingsPercent = originalSize > 0 ? (totalSavings / originalSize) * 100 : 0;
        if (isSavingFile) {
            fs.writeFileSync(filePath, currentContent, 'utf8');
        }
        return {
            filePath: filePath,
            originalSize: originalSize,
            compressedSize: currentSize,
            savings: totalSavings,
            savingsPercent: finalSavingsPercent,
        };
    }
    catch (error) {
        console.error("\u274C Error compressing ".concat(filePath, ":"), error);
        return {
            filePath: filePath,
            originalSize: originalSize,
            compressedSize: originalSize,
            savings: 0,
            savingsPercent: 0,
        };
    }
}
function validateSvgFiles(filePaths) {
    var validFiles = [];
    var errors = [];
    for (var _i = 0, filePaths_1 = filePaths; _i < filePaths_1.length; _i++) {
        var filePath = filePaths_1[_i];
        var resolvedPath = path.resolve(filePath);
        if (!fs.existsSync(resolvedPath)) {
            errors.push("\u274C File does not exist: ".concat(filePath));
            continue;
        }
        var stat = fs.statSync(resolvedPath);
        if (!stat.isFile()) {
            errors.push("\u274C Not a file: ".concat(filePath));
            continue;
        }
        if (path.extname(filePath).toLowerCase() !== '.svg') {
            errors.push("\u274C Not an SVG file: ".concat(filePath));
            continue;
        }
        validFiles.push(resolvedPath);
    }
    if (errors.length) {
        console.error('Validation errors:');
        errors.forEach(function (error) { return console.error("   ".concat(error)); });
        throw new Error('SVG file validation failed');
    }
    return validFiles;
}
function createResultsSummary(results, ignoredFiles) {
    if (ignoredFiles === void 0) { ignoredFiles = []; }
    var compressedFiles = results.filter(function (r) { return !!r.savings; });
    var totalCompressedFilesLength = compressedFiles.length;
    var totalOriginalSize = compressedFiles.reduce(function (sum, r) { return sum + r.originalSize; }, 0);
    var totalCompressedSize = compressedFiles.reduce(function (sum, r) { return sum + r.compressedSize; }, 0);
    var totalSavings = compressedFiles.reduce(function (sum, r) { return sum + r.savings; }, 0);
    var totalSavingsPercent = totalOriginalSize > 0 ? (totalSavings / totalOriginalSize) * 100 : 0;
    return {
        totalFiles: results.length + ignoredFiles.length,
        totalCompressedFilesLength: totalCompressedFilesLength,
        totalOriginalSize: totalOriginalSize,
        totalCompressedSize: totalCompressedSize,
        totalSavings: totalSavings,
        totalSavingsPercent: totalSavingsPercent,
        results: results,
        ignoredFiles: ignoredFiles,
    };
}
function getSummarySavingString(_a) {
    var prefix = _a.prefix, originalSize = _a.originalSize, compressedSize = _a.compressedSize, savings = _a.savings, savingsPercent = _a.savingsPercent;
    return "".concat(prefix, " ").concat(formatBytes(originalSize), " KB \u2192 ").concat(formatBytes(compressedSize), " KB | ").concat("".concat(formatBytes(savings), " KB (").concat(savingsPercent.toFixed(2), "%)"));
}
function logIgnoredFiles(ignoredFiles) {
    if (!ignoredFiles.length) {
        return;
    }
    console.log('\nFiles skipped (ignore-compression):');
    ignoredFiles.forEach(function (filePath) {
        console.log("".concat(filePath, ": \u23ED\uFE0F  Skipped"));
    });
}
function logSummary(summary) {
    var totalFiles = summary.totalFiles, totalCompressedFilesLength = summary.totalCompressedFilesLength, totalOriginalSize = summary.totalOriginalSize, totalCompressedSize = summary.totalCompressedSize, totalSavings = summary.totalSavings, totalSavingsPercent = summary.totalSavingsPercent, results = summary.results, ignoredFiles = summary.ignoredFiles;
    logIgnoredFiles(ignoredFiles);
    if (totalCompressedFilesLength) {
        console.log('\nFiles compressed:');
        results.forEach(function (result) {
            var compressedSize = result.compressedSize, originalSize = result.originalSize, savings = result.savings, savingsPercent = result.savingsPercent, filePath = result.filePath;
            if (!result.savings) {
                return;
            }
            var prefix = "".concat(filePath, ": \u2705");
            console.log(getSummarySavingString({
                prefix: prefix,
                compressedSize: compressedSize,
                originalSize: originalSize,
                savings: savings,
                savingsPercent: savingsPercent,
            }));
        });
        var ignoreFilesLength = ignoredFiles.length;
        console.log("\nFiles processed: ".concat(totalFiles));
        console.log("Files already properly compressed: ".concat(totalFiles - ignoreFilesLength - totalCompressedFilesLength));
        console.log("Files compressed: ".concat(totalCompressedFilesLength));
        console.log("Files ignored: ".concat(ignoreFilesLength));
        console.log(getSummarySavingString({
            prefix: 'Savings:',
            originalSize: totalOriginalSize,
            compressedSize: totalCompressedSize,
            savings: totalSavings,
            savingsPercent: totalSavingsPercent,
        }));
    }
    else {
        console.log('\n✅ All files already compressed');
    }
}
function logSummaryCheck(summary) {
    var totalFiles = summary.totalFiles, totalCompressedFilesLength = summary.totalCompressedFilesLength, results = summary.results, ignoredFiles = summary.ignoredFiles;
    console.log('');
    results.forEach(function (result) {
        var filePath = result.filePath, savings = result.savings;
        console.log("".concat(filePath, ": ").concat(savings > 0 ? 'Not properly compressed ❌' : 'Compressed ✅'));
    });
    logIgnoredFiles(ignoredFiles);
    console.log("\nFiles processed: ".concat(totalFiles));
    console.log("Files ignored: ".concat(ignoredFiles.length));
    console.log("Files not properly compressed: ".concat(totalCompressedFilesLength));
}
function processFiles(svgFiles, isSavingFile) {
    var results = [];
    for (var _i = 0, svgFiles_1 = svgFiles; _i < svgFiles_1.length; _i++) {
        var file = svgFiles_1[_i];
        var result = compressSvgFile(file, isSavingFile);
        results.push(result);
    }
    return results;
}
function compressSvgFiles(regularSvgFiles, ignoredFiles) {
    if (ignoredFiles === void 0) { ignoredFiles = []; }
    console.log("\uD83D\uDE80 Starting compression ".concat(regularSvgFiles.length, " SVG file(s)"));
    var results = processFiles(regularSvgFiles, true);
    var summary = createResultsSummary(results, ignoredFiles);
    logSummary(summary);
    return summary;
}
function checkCompressedSvgFiles(regularSvgFiles, ignoredFiles) {
    if (ignoredFiles === void 0) { ignoredFiles = []; }
    console.log("\uD83D\uDE80 Checking if all SVG files are compressed...");
    var results = processFiles(regularSvgFiles, false);
    var summary = createResultsSummary(results, ignoredFiles);
    logSummaryCheck(summary);
    return summary;
}
function getChangedSvgFilesFromGithub() {
    return __awaiter(this, void 0, void 0, function () {
        var pullRequestNumber, changedFiles, svgFiles, error_1;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    pullRequestNumber = (_a = github.context.payload.pull_request) === null || _a === void 0 ? void 0 : _a.number;
                    if (!pullRequestNumber) {
                        console.log('No pull request number found');
                        return [2 /*return*/, []];
                    }
                    return [4 /*yield*/, GithubUtils_1.default.getPullRequestChangedSVGFileNames(pullRequestNumber)];
                case 1:
                    changedFiles = _b.sent();
                    svgFiles = changedFiles
                        .filter(function (file) { return path.extname(file.toLowerCase()) === '.svg'; })
                        .map(function (file) { return path.resolve(file); })
                        .filter(function (file) { return fs.existsSync(file); });
                    console.log("Found ".concat(svgFiles.length, " changed SVG file(s) in PR"));
                    return [2 /*return*/, svgFiles];
                case 2:
                    error_1 = _b.sent();
                    console.error('❌ Error getting files from GitHub:', error_1);
                    return [2 /*return*/, []];
                case 3: return [2 /*return*/];
            }
        });
    });
}
function logHelp() {
    console.log('');
    console.log('Usage:');
    console.log('  Mode 1 - Directory scan:');
    console.log('    npm run compress-svg -- --dir assets/images');
    console.log('');
    console.log('  Mode 2 - Specific files:');
    console.log('    npm run compress-svg -- --files file1.svg file2.svg ...');
    console.log('');
    console.log('Options:');
    console.log('  --help, -h    Show this help message');
    console.log('  --dir         Compress all SVG files in specified directory');
    console.log('  --files       Compress specified SVG files');
    console.log('');
    console.log('To ignore compression for a file, add "-ignore-compression" to the file name: file-ignore-compression.svg');
    console.log('');
}
function splitFilesBySuffix(files) {
    var regularFiles = [];
    var ignoredFiles = [];
    for (var _i = 0, files_1 = files; _i < files_1.length; _i++) {
        var file = files_1[_i];
        var fileName = path.basename(file);
        if (fileName.endsWith("".concat(IGNORE_SUFFIX, ".svg"))) {
            ignoredFiles.push(file);
        }
        else {
            regularFiles.push(file);
        }
    }
    return { regular: regularFiles, ignored: ignoredFiles };
}
function run(mode, options) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, svgFiles, _b, regularSvgFiles, ignoredFiles, svgFiles, _c, regularSvgFiles, ignoredFiles, svgFiles, _d, regularSvgFiles, ignoredFiles;
        var _e;
        return __generator(this, function (_f) {
            switch (_f.label) {
                case 0:
                    console.log('🔍 Searching for SVG files...');
                    _a = mode;
                    switch (_a) {
                        case 'directory': return [3 /*break*/, 1];
                        case 'files': return [3 /*break*/, 2];
                        case 'pullRequest': return [3 /*break*/, 3];
                    }
                    return [3 /*break*/, 5];
                case 1:
                    {
                        if (!(options === null || options === void 0 ? void 0 : options.targetDir)) {
                            throw new Error('targetDir is required for directory mode');
                        }
                        svgFiles = findSvgFiles(options.targetDir);
                        if (!svgFiles.length) {
                            console.log('❌ No SVG files found in the specified directory.');
                        }
                        _b = splitFilesBySuffix(svgFiles), regularSvgFiles = _b.regular, ignoredFiles = _b.ignored;
                        return [2 /*return*/, compressSvgFiles(regularSvgFiles, ignoredFiles)];
                    }
                    _f.label = 2;
                case 2:
                    {
                        if (!((_e = options === null || options === void 0 ? void 0 : options.filePaths) === null || _e === void 0 ? void 0 : _e.length)) {
                            throw new Error('filePaths is required for files mode');
                        }
                        svgFiles = validateSvgFiles(options.filePaths);
                        if (!svgFiles.length) {
                            console.log('❌ No valid SVG files provided.');
                        }
                        _c = splitFilesBySuffix(svgFiles), regularSvgFiles = _c.regular, ignoredFiles = _c.ignored;
                        return [2 /*return*/, compressSvgFiles(regularSvgFiles, ignoredFiles)];
                    }
                    _f.label = 3;
                case 3: return [4 /*yield*/, getChangedSvgFilesFromGithub()];
                case 4:
                    svgFiles = _f.sent();
                    if (!svgFiles.length) {
                        console.log('❌ No changed SVG files found in Pull Request');
                    }
                    _d = splitFilesBySuffix(svgFiles), regularSvgFiles = _d.regular, ignoredFiles = _d.ignored;
                    return [2 /*return*/, checkCompressedSvgFiles(regularSvgFiles, ignoredFiles)];
                case 5: throw new Error("Unknown compression mode: ".concat(mode));
            }
        });
    });
}
if (require.main === module) {
    var args = process.argv.slice(2);
    var firstArg = args.at(0);
    if (firstArg === '--help' || firstArg === '-h') {
        logHelp();
        process.exit(0);
    }
    if (firstArg === '--dir' || firstArg === '-d') {
        var targetDir = args.at(1);
        if (!targetDir) {
            console.error('❌ No directory specified after --dir flag');
            console.log('');
            logHelp();
            process.exit(1);
        }
        if (!fs.existsSync(targetDir)) {
            console.error("\u274C Directory '".concat(targetDir, "' does not exist."));
            process.exit(1);
        }
        var stat = fs.statSync(targetDir);
        if (!stat.isDirectory()) {
            console.error("\u274C '".concat(targetDir, "' is not a directory."));
            console.log('Use --files flag to compress specific files');
            process.exit(1);
        }
        console.log("Target directory: ".concat(path.resolve(targetDir)));
        run('directory', { targetDir: targetDir })
            .then(function () {
            console.log('\n✅ SVG compression completed successfully');
            process.exit(0);
        })
            .catch(function (error) {
            var errorMessage = error instanceof Error ? error.message : String(error);
            console.error("Fatal error: ".concat(errorMessage));
            process.exit(1);
        });
    }
    else if (firstArg === '--files' || firstArg === '-f') {
        if (args.length < 2) {
            console.error('❌ No files specified after --files flag');
            console.log('');
            logHelp();
            process.exit(1);
        }
        var filePaths = args.slice(1);
        console.log("Specific files (".concat(filePaths.length, " files provided)"));
        run('files', { filePaths: filePaths })
            .then(function () {
            console.log('\n✅ SVG compression completed successfully');
            process.exit(0);
        })
            .catch(function (error) {
            var errorMessage = error instanceof Error ? error.message : String(error);
            console.error("Fatal error: ".concat(errorMessage));
            process.exit(1);
        });
    }
    // No arguments provided - show help
    else {
        logHelp();
        process.exit(0);
    }
}
exports.default = run;
