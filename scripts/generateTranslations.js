#!/usr/bin/env npx ts-node
"use strict";
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
exports.GENERATED_FILE_PREFIX = void 0;
/*
 * This script uses src/languages/en.ts as the source of truth, and leverages ChatGPT to generate translations for other languages.
 */
var dotenv = require("dotenv");
var fs_1 = require("fs");
// eslint-disable-next-line you-dont-need-lodash-underscore/get
var get_1 = require("lodash/get");
var path_1 = require("path");
var typescript_1 = require("typescript");
var decodeUnicode_1 = require("@libs/StringUtils/decodeUnicode");
var dedent_1 = require("@libs/StringUtils/dedent");
var hash_1 = require("@libs/StringUtils/hash");
var LOCALES_1 = require("@src/CONST/LOCALES");
var en_1 = require("@src/languages/en");
var CLI_1 = require("./utils/CLI");
var Git_1 = require("./utils/Git");
var Prettier_1 = require("./utils/Prettier");
var PromisePool_1 = require("./utils/PromisePool");
var ChatGPTTranslator_1 = require("./utils/Translator/ChatGPTTranslator");
var DummyTranslator_1 = require("./utils/Translator/DummyTranslator");
var TSCompilerUtils_1 = require("./utils/TSCompilerUtils");
var GENERATED_FILE_PREFIX = (0, dedent_1.default)("\n    /**\n     *   _____                      __         __\n     *  / ___/__ ___  ___ _______ _/ /____ ___/ /\n     * / (_ / -_) _ \\/ -_) __/ _ \\`/ __/ -_) _  /\n     * \\___/\\__/_//_/\\__/_/  \\_,_/\\__/\\__/\\_,_/\n     *\n     * This file was automatically generated. Please consider these alternatives before manually editing it:\n     *\n     * - Improve the prompts in prompts/translation, or\n     * - Improve context annotations in src/languages/en.ts\n     */\n");
exports.GENERATED_FILE_PREFIX = GENERATED_FILE_PREFIX;
var tsPrinter = typescript_1.default.createPrinter();
/**
 * This class encapsulates most of the non-CLI logic to generate translations.
 * The primary reason it exists as a class is so we can import this file with no side effects at the top level of the script.
 * This is useful for unit testing.
 *
 * At a high level, this is how it works:
 *  - It takes in a set of languages to generate translations for, a directory where translations are stored, and a file to use as the source of truth for translations.
 *  - It then uses the source file to recursively extract all string literals and template expressions, and uses ChatGPT to generate translations for each of them.
 *  - It then replaces the original string literals and template expressions with the translated ones, and writes the resulting code to a file.
 *  - It also formats the files using prettier.
 */
var TranslationGenerator = /** @class */ (function () {
    function TranslationGenerator(config) {
        var _a;
        /**
         * If a complex template expression comes from an existing translation file rather than ChatGPT, then the hashes of its spans will be serialized from the translated version of those spans.
         * This map provides us a way to look up the English hash for each translated span hash, so that when we're transforming the English file and we encounter a translated expression hash,
         * we can look up English hash and use it to look up the translation for that hash (since the translation map is keyed by English string hashes).
         */
        this.translatedSpanHashToEnglishSpanHash = new Map();
        this.targetLanguages = config.targetLanguages;
        this.languagesDir = config.languagesDir;
        var sourceCode = fs_1.default.readFileSync(config.sourceFile, 'utf8');
        this.sourceFile = typescript_1.default.createSourceFile(config.sourceFile, sourceCode, typescript_1.default.ScriptTarget.Latest, true);
        this.translator = config.translator;
        this.compareRef = config.compareRef;
        this.pathsToAdd = new Set();
        this.pathsToModify = (_a = config.paths) !== null && _a !== void 0 ? _a : new Set();
        this.pathsToRemove = new Set();
        this.verbose = config.verbose;
        this.isIncremental = this.pathsToModify.size > 0 || !!this.compareRef;
    }
    TranslationGenerator.prototype.generateTranslations = function () {
        return __awaiter(this, void 0, void 0, function () {
            var promisePool, translations, _loop_1, this_1, _i, _a, targetLanguage;
            var _this = this;
            var _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        promisePool = new PromisePool_1.default();
                        translations = new Map();
                        if (this.isIncremental && this.pathsToModify.size === 0) {
                            // If compareRef is provided (and no specific paths), use git diff to find changed lines and build dot-notation paths
                            this.buildPathsFromGitDiff();
                        }
                        if (this.verbose) {
                            console.log("\uD83C\uDFAF Initial path sets:");
                            console.log("   pathsToModify: ".concat(Array.from(this.pathsToModify).join(', ')));
                            console.log("   pathsToAdd: ".concat(Array.from(this.pathsToAdd).join(', ')));
                            console.log("   pathsToRemove: ".concat(Array.from(this.pathsToRemove).join(', ')));
                        }
                        _loop_1 = function (targetLanguage) {
                            var translationsForLocale, stringsToTranslate, translationPromises, _loop_2, _e, stringsToTranslate_1, _f, key, _g, text, context, transformedSourceFile, targetPath, enResult, transformedEnSourceFile, translatedCodeMap, existingContent, existingSourceFile, targetTransformer, targetResult, transformedTargetResult, transformer, result, translatedCode, outputPath, finalFileContent;
                            return __generator(this, function (_h) {
                                switch (_h.label) {
                                    case 0:
                                        translationsForLocale = (_b = translations.get(targetLanguage)) !== null && _b !== void 0 ? _b : new Map();
                                        stringsToTranslate = new Map();
                                        this_1.extractStringsToTranslate(this_1.sourceFile, stringsToTranslate);
                                        translationPromises = [];
                                        _loop_2 = function (key, text, context) {
                                            if (translationsForLocale.has(key)) {
                                                return "continue";
                                            }
                                            var translationPromise = promisePool.add(function () { return _this.translator.translate(targetLanguage, text, context).then(function (result) { return translationsForLocale.set(key, result); }); });
                                            translationPromises.push(translationPromise);
                                        };
                                        for (_e = 0, stringsToTranslate_1 = stringsToTranslate; _e < stringsToTranslate_1.length; _e++) {
                                            _f = stringsToTranslate_1[_e], key = _f[0], _g = _f[1], text = _g.text, context = _g.context;
                                            _loop_2(key, text, context);
                                        }
                                        return [4 /*yield*/, Promise.allSettled(translationPromises)];
                                    case 1:
                                        _h.sent();
                                        transformedSourceFile = void 0;
                                        if (this_1.isIncremental) {
                                            targetPath = path_1.default.join(this_1.languagesDir, "".concat(targetLanguage, ".ts"));
                                            if (!fs_1.default.existsSync(targetPath)) {
                                                throw new Error("Target file ".concat(targetPath, " does not exist for incremental translation"));
                                            }
                                            enResult = typescript_1.default.transform(this_1.sourceFile, [this_1.createTranslationTransformer(translationsForLocale)]);
                                            transformedEnSourceFile = enResult.transformed.at(0);
                                            if (!transformedEnSourceFile) {
                                                throw new Error('Failed to create translated patch from en.ts');
                                            }
                                            translatedCodeMap = new Map();
                                            this_1.extractTranslatedNodes(transformedEnSourceFile, translatedCodeMap);
                                            enResult.dispose();
                                            existingContent = fs_1.default.readFileSync(targetPath, 'utf8');
                                            existingSourceFile = typescript_1.default.createSourceFile(targetPath, existingContent, typescript_1.default.ScriptTarget.Latest, true);
                                            targetTransformer = this_1.createIncrementalTargetTransformer(translatedCodeMap);
                                            targetResult = typescript_1.default.transform(existingSourceFile, [targetTransformer]);
                                            transformedTargetResult = targetResult.transformed.at(0);
                                            if (!transformedTargetResult) {
                                                throw new Error('Failed to transform target file');
                                            }
                                            transformedSourceFile = transformedTargetResult;
                                            targetResult.dispose();
                                        }
                                        else {
                                            transformer = this_1.createTranslationTransformer(translationsForLocale);
                                            result = typescript_1.default.transform(this_1.sourceFile, [transformer]);
                                            transformedSourceFile = (_c = result.transformed.at(0)) !== null && _c !== void 0 ? _c : this_1.sourceFile;
                                            result.dispose();
                                        }
                                        // Import en.ts (addImport will check if it already exists)
                                        transformedSourceFile = TSCompilerUtils_1.default.addImport(transformedSourceFile, 'en', './en', true);
                                        translatedCode = (0, decodeUnicode_1.default)(tsPrinter.printFile(transformedSourceFile));
                                        outputPath = path_1.default.join(this_1.languagesDir, "".concat(targetLanguage, ".ts"));
                                        fs_1.default.writeFileSync(outputPath, translatedCode, 'utf8');
                                        finalFileContent = fs_1.default.readFileSync(outputPath, 'utf8');
                                        finalFileContent = finalFileContent.replace('const translations = {', 'const translations: TranslationDeepObject<typeof en> = {');
                                        finalFileContent = finalFileContent.replace('export default translations satisfies TranslationDeepObject<typeof translations>;', 'export default translations;');
                                        // Add a fun ascii art touch with a helpful message
                                        if (!finalFileContent.startsWith(GENERATED_FILE_PREFIX)) {
                                            finalFileContent = "".concat(GENERATED_FILE_PREFIX).concat(finalFileContent);
                                        }
                                        fs_1.default.writeFileSync(outputPath, finalFileContent, 'utf8');
                                        // Format the file with prettier
                                        return [4 /*yield*/, Prettier_1.default.format(outputPath)];
                                    case 2:
                                        // Format the file with prettier
                                        _h.sent();
                                        console.log("\u2705 Translated file created: ".concat(outputPath));
                                        return [2 /*return*/];
                                }
                            });
                        };
                        this_1 = this;
                        _i = 0, _a = this.targetLanguages;
                        _d.label = 1;
                    case 1:
                        if (!(_i < _a.length)) return [3 /*break*/, 4];
                        targetLanguage = _a[_i];
                        return [5 /*yield**/, _loop_1(targetLanguage)];
                    case 2:
                        _d.sent();
                        _d.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Each translation file should have an object called translations that's later default-exported.
     * This function finds that object for a given SourceFile
     */
    TranslationGenerator.prototype.findTranslationsNode = function (sourceFile) {
        var defaultExport = TSCompilerUtils_1.default.findDefaultExport(sourceFile);
        if (!defaultExport) {
            throw new Error('Could not find default export in source file');
        }
        var defaultExportIdentifier = TSCompilerUtils_1.default.extractIdentifierFromExpression(defaultExport);
        var variableDeclaration = TSCompilerUtils_1.default.resolveDeclaration(defaultExportIdentifier !== null && defaultExportIdentifier !== void 0 ? defaultExportIdentifier : '', sourceFile);
        if (!variableDeclaration || !typescript_1.default.isVariableDeclaration(variableDeclaration) || !variableDeclaration.initializer) {
            throw new Error('Could not find translations object literal in source file');
        }
        if (!typescript_1.default.isObjectLiteralExpression(variableDeclaration.initializer)) {
            throw new Error('Default export is not an object literal expression');
        }
        return variableDeclaration.initializer;
    };
    /**
     * Should we translate the given node?
     */
    TranslationGenerator.prototype.shouldTranslateNode = function (node) {
        // We only translate string literals and template expressions
        if (!typescript_1.default.isStringLiteral(node) && !typescript_1.default.isTemplateExpression(node) && !typescript_1.default.isNoSubstitutionTemplateLiteral(node)) {
            return false;
        }
        // Don't translate property keys (the name part of property assignments)
        if (node.parent && typescript_1.default.isPropertyAssignment(node.parent) && node.parent.name === node) {
            return false;
        }
        // Don't translate any strings or expressions that affect code execution by being part of control flow.
        // We want to translate only strings that are "leaves" or "results" of any expression or code block
        var isPartOfControlFlow = node.parent &&
            // imports and exports
            (typescript_1.default.isImportDeclaration(node.parent) ||
                typescript_1.default.isExportDeclaration(node.parent) ||
                // Switch/case clause
                typescript_1.default.isCaseClause(node.parent) ||
                // any binary expression except coalescing operators, += operators, and string concatenation
                (typescript_1.default.isBinaryExpression(node.parent) &&
                    node.parent.operatorToken.kind !== typescript_1.default.SyntaxKind.QuestionQuestionToken &&
                    node.parent.operatorToken.kind !== typescript_1.default.SyntaxKind.BarBarToken &&
                    node.parent.operatorToken.kind !== typescript_1.default.SyntaxKind.PlusEqualsToken &&
                    // Allow string concatenation with +
                    !(node.parent.operatorToken.kind === typescript_1.default.SyntaxKind.PlusToken && TSCompilerUtils_1.default.isStringConcatenationChain(node.parent))));
        if (isPartOfControlFlow) {
            return false;
        }
        // Don't translate any logs
        var isArgumentToLogFunction = node.parent &&
            typescript_1.default.isCallExpression(node.parent) &&
            typescript_1.default.isPropertyAccessExpression(node.parent.expression) &&
            ((typescript_1.default.isIdentifier(node.parent.expression.expression) && node.parent.expression.expression.getText() === 'console') ||
                (typescript_1.default.isIdentifier(node.parent.expression.expression) && node.parent.expression.expression.getText() === 'Log'));
        if (isArgumentToLogFunction) {
            return false;
        }
        // Don't translate a string that's a literal type annotation
        if (typescript_1.default.isLiteralTypeNode(node.parent)) {
            return false;
        }
        // Don't translate object keys
        if (typescript_1.default.isComputedPropertyName(node.parent)) {
            return false;
        }
        // Only translate string literals if they contain at least one real letter
        if (typescript_1.default.isStringLiteral(node) || typescript_1.default.isNoSubstitutionTemplateLiteral(node)) {
            // \p{L} matches a-z, à-ö, Α-Ω, Ж, 文, …  – but NOT digits, emoji, punctuation, etc.
            return /\p{L}/u.test(node.text);
        }
        // Only translate a template expression if it contains alphabet characters outside the spans
        var staticText = node.head.text;
        for (var _i = 0, _a = node.templateSpans; _i < _a.length; _i++) {
            var span = _a[_i];
            staticText += span.literal.text;
        }
        return /[a-zA-Z]/.test(staticText);
    };
    /**
     * Check if a given translation path should be translated based on the paths filter.
     * If no paths are specified, all paths should be translated.
     * If paths are specified, only paths that match exactly or are nested under a specified path should be translated.
     */
    TranslationGenerator.prototype.shouldTranslatePath = function (currentPath) {
        if (!this.isIncremental) {
            return true;
        }
        // Check if path is in either pathsToModify or pathsToAdd
        var allPathsToTranslate = new Set(__spreadArray(__spreadArray([], this.pathsToModify, true), this.pathsToAdd, true));
        for (var _i = 0, allPathsToTranslate_1 = allPathsToTranslate; _i < allPathsToTranslate_1.length; _i++) {
            var targetPath = allPathsToTranslate_1[_i];
            if (currentPath.startsWith(targetPath)) {
                return true;
            }
        }
        return false;
    };
    /**
     * Is a given expression (i.e: template placeholder) "simple"?
     * We define an expression as "simple" if it is an identifier or property access expression. Anything else is complex.
     *
     * @example ${name} => true
     * @example ${user.firstName} => true
     * @example ${CONST.REPORT.TYPES.EXPENSE} => true
     * @example ${name ?? 'someone'} => false
     * @example ${condition ? 'A' : 'B'} => false
     */
    TranslationGenerator.prototype.isSimpleExpression = function (expr) {
        return typescript_1.default.isIdentifier(expr) || typescript_1.default.isPropertyAccessExpression(expr) || typescript_1.default.isElementAccessExpression(expr);
    };
    /**
     * Is the given template expression "simple"? (i.e: can it be sent directly to ChatGPT to be translated)
     * We define a template expression as "simple" if each of its spans' expressions are simple (as defined by this.isSimpleTemplateSpan)
     *
     * @example `Hello, ${name}!` => true
     * @example `Welcome ${user.firstName}` => true
     * @example `Submit ${CONST.REPORT.TYPES.EXPENSE} report` => true
     * @example `Pay ${name ?? 'someone'}` => false
     * @example `Edit ${condition ? 'A' : 'B'}` => false
     */
    TranslationGenerator.prototype.isSimpleTemplateExpression = function (node) {
        var _this = this;
        return node.templateSpans.every(function (span) { return _this.isSimpleExpression(span.expression); });
    };
    /**
     * Extract context annotation value from a string (comment or text).
     * Returns the context value if found, undefined otherwise.
     */
    TranslationGenerator.prototype.extractContextAnnotationFromString = function (text) {
        var match = text.match(TranslationGenerator.CONTEXT_REGEX);
        return match === null || match === void 0 ? void 0 : match[1].trim();
    };
    /**
     * Check if a specific line in the source file contains a context annotation.
     */
    TranslationGenerator.prototype.lineContainsContextAnnotation = function (lineNumber, sourceFile) {
        var lines = sourceFile.getFullText().split('\n');
        var line = lines.at(lineNumber - 1); // Convert to 0-based index
        if (!line) {
            return false;
        }
        return this.extractContextAnnotationFromString(line) !== undefined;
    };
    /**
     * Extract any leading context annotation for a given node.
     */
    TranslationGenerator.prototype.getContextForNode = function (node) {
        var _a;
        // First, check for an inline context comment
        var inlineContext = this.extractContextAnnotationFromString(node.getFullText());
        if (inlineContext) {
            return inlineContext;
        }
        // Otherwise, look for the nearest ancestor that may have a comment attached.
        // For now, we only support property assignments.
        var nearestPropertyAssignmentAncestor = TSCompilerUtils_1.default.findAncestor(node, function (n) { return typescript_1.default.isPropertyAssignment(n); });
        if (!nearestPropertyAssignmentAncestor) {
            return undefined;
        }
        // Search through comments looking for a context comment
        var commentRanges = (_a = typescript_1.default.getLeadingCommentRanges(this.sourceFile.getFullText(), nearestPropertyAssignmentAncestor.getFullStart())) !== null && _a !== void 0 ? _a : [];
        for (var _i = 0, _b = commentRanges.reverse(); _i < _b.length; _i++) {
            var range = _b[_i];
            var commentText = this.sourceFile.getFullText().slice(range.pos, range.end);
            var context = this.extractContextAnnotationFromString(commentText);
            if (context) {
                return context;
            }
        }
        // No context comments were found
        return undefined;
    };
    /**
     * Generate a hash of the string representation of a node along with any context comments.
     */
    TranslationGenerator.prototype.getTranslationKey = function (node) {
        if (!typescript_1.default.isStringLiteral(node) && !typescript_1.default.isNoSubstitutionTemplateLiteral(node) && !typescript_1.default.isTemplateExpression(node)) {
            throw new Error("Cannot generate translation key for node: ".concat(node.getText()));
        }
        // Trim leading whitespace, quotation marks, and backticks
        var keyBase = node
            .getText()
            .trim()
            .replace(/^['"`]/, '')
            .replace(/['"`]$/, '');
        var context = this.getContextForNode(node);
        if (context) {
            keyBase += context;
        }
        return (0, hash_1.default)(keyBase);
    };
    /**
     * Recursively extract all string literals and templates to translate from the subtree rooted at the given node.
     * Simple templates (as defined by this.isSimpleTemplateExpression) can be translated directly.
     * Complex templates must have each of their spans recursively translated first, so we'll extract all the lowest-level strings to translate.
     * Then complex templates will be serialized with a hash of complex spans in place of the span text, and we'll translate that.
     */
    TranslationGenerator.prototype.extractStringsToTranslate = function (node, stringsToTranslate, currentPath) {
        var _this = this;
        if (currentPath === void 0) { currentPath = ''; }
        if (this.shouldTranslateNode(node)) {
            // Check if this translation path should be included based on the paths filter
            if (!this.shouldTranslatePath(currentPath)) {
                return; // Skip this node and its children if the path doesn't match
            }
            var context = this.getContextForNode(node);
            var translationKey = this.getTranslationKey(node);
            // String literals and no-substitution templates can be translated directly
            if (typescript_1.default.isStringLiteral(node) || typescript_1.default.isNoSubstitutionTemplateLiteral(node)) {
                stringsToTranslate.set(translationKey, { text: node.text, context: context });
            }
            // Template expressions must be encoded directly before they can be translated
            else if (typescript_1.default.isTemplateExpression(node)) {
                if (this.isSimpleTemplateExpression(node)) {
                    stringsToTranslate.set(translationKey, { text: this.templateExpressionToString(node), context: context });
                }
                else {
                    if (this.verbose) {
                        console.debug('😵‍💫 Encountered complex template, recursively translating its spans first:', node.getText());
                    }
                    node.templateSpans.forEach(function (span) { return _this.extractStringsToTranslate(span, stringsToTranslate, currentPath); });
                    stringsToTranslate.set(translationKey, { text: this.templateExpressionToString(node), context: context });
                }
            }
        }
        node.forEachChild(TSCompilerUtils_1.default.createPathAwareVisitor(function (child, childPath) {
            _this.extractStringsToTranslate(child, stringsToTranslate, childPath);
        }, currentPath));
    };
    /**
     * Convert a template expression into a plain string representation that can be predictably serialized.
     * All ${...} spans containing complex expressions are replaced in the string by hashes of the expression text.
     *
     * @example templateExpressionToString(`Edit ${action?.type === 'IOU' ? 'expense' : 'comment'} on ${date}`)
     *       => `Edit ${HASH1} on ${date}`
     */
    TranslationGenerator.prototype.templateExpressionToString = function (expression) {
        var result = expression.head.text;
        for (var _i = 0, _a = expression.templateSpans; _i < _a.length; _i++) {
            var span = _a[_i];
            if (this.isSimpleExpression(span.expression)) {
                result += "${".concat(span.expression.getText(), "}");
            }
            else {
                result += "${".concat((0, hash_1.default)(span.expression.getText()), "}");
            }
            result += span.literal.text;
        }
        return result;
    };
    /**
     * Convert our string-encoded template expression to a template expression.
     * If the template contains any complex spans, those must be translated first, and those translations need to be passed in.
     */
    TranslationGenerator.prototype.stringToTemplateExpression = function (input, translatedComplexExpressions) {
        var _a, _b, _c, _d, _e;
        if (translatedComplexExpressions === void 0) { translatedComplexExpressions = new Map(); }
        var regex = /\$\{([^}]*)}/g;
        var matches = __spreadArray([], input.matchAll(regex), true);
        var headText = input.slice(0, (_b = (_a = matches.at(0)) === null || _a === void 0 ? void 0 : _a.index) !== null && _b !== void 0 ? _b : input.length);
        var templateHead = typescript_1.default.factory.createTemplateHead(headText);
        var spans = [];
        for (var i = 0; i < matches.length; i++) {
            var match = matches.at(i);
            if (!match) {
                continue;
            }
            var fullMatch = match[0], placeholder = match[1];
            var expression = void 0;
            var trimmed = placeholder.trim();
            if (/^\d+$/.test(trimmed)) {
                // It's a hash reference to a complex span
                var hashed = Number(trimmed);
                // If the translated, serialized template expression came from an existing translation file, then the hash of the complex expression will be a hash of the translated expression.
                // If the translated, serialized template expression came from ChatGPT, then the hash of the complex expression will be a hash of the English expression.
                // Meanwhile, translatedComplexExpressions is keyed by English hashes, because it comes from createTransformer, which is parsing and transforming an English file.
                // So when rebuilding the template expression from its serialized form, we first search for the translated expression assuming the expression is serialized with English hashes.
                // If that fails, we look up the English expression hash associated with the translated expression hash, then look up the translated expression using the English hash.
                var translatedExpression = (_c = translatedComplexExpressions.get(hashed)) !== null && _c !== void 0 ? _c : translatedComplexExpressions.get((_d = this.translatedSpanHashToEnglishSpanHash.get(hashed)) !== null && _d !== void 0 ? _d : hashed);
                if (!translatedExpression) {
                    throw new Error("No template found for hash: ".concat(hashed));
                }
                expression = translatedExpression;
            }
            else {
                // Assume it's a simple identifier or property access
                expression = typescript_1.default.factory.createIdentifier(trimmed);
            }
            var startOfMatch = match.index;
            var nextStaticTextStart = startOfMatch + fullMatch.length;
            var nextStaticTextEnd = i + 1 < matches.length ? (_e = matches.at(i + 1)) === null || _e === void 0 ? void 0 : _e.index : input.length;
            var staticText = input.slice(nextStaticTextStart, nextStaticTextEnd);
            var literal = i === matches.length - 1 ? typescript_1.default.factory.createTemplateTail(staticText) : typescript_1.default.factory.createTemplateMiddle(staticText);
            spans.push(typescript_1.default.factory.createTemplateSpan(expression, literal));
        }
        return typescript_1.default.factory.createTemplateExpression(templateHead, spans);
    };
    /**
     * Build dot-notation paths from git diff by analyzing changed lines.
     */
    TranslationGenerator.prototype.buildPathsFromGitDiff = function () {
        try {
            // Get the relative path from the git repo root
            var relativePath = path_1.default.relative(process.cwd(), path_1.default.join(this.languagesDir, 'en.ts'));
            // Run git diff to find changed lines
            var diffResult = Git_1.default.diff(this.compareRef, undefined, relativePath);
            if (!diffResult.hasChanges) {
                if (this.verbose) {
                    console.log('🔍 No changes detected in git diff');
                }
                return;
            }
            // Find the main translation object in en.ts
            var translationsNode = this.findTranslationsNode(this.sourceFile);
            // Get changed lines from the diff
            var changedLines = diffResult.files.at(0);
            if (!changedLines) {
                return;
            }
            if (this.verbose) {
                console.log("\uD83D\uDD0D Found ".concat(changedLines.addedLines.size, " added lines, ").concat(changedLines.removedLines.size, " removed lines, ").concat(changedLines.modifiedLines.size, " modified lines"));
            }
            // Traverse current en.ts for added and modified paths
            this.extractPathsFromChangedLines(translationsNode, new Set(__spreadArray(__spreadArray([], changedLines.addedLines, true), changedLines.modifiedLines, true)), changedLines.removedLines);
            // For removed paths, we need to traverse the old version of en.ts
            if (changedLines.removedLines.size > 0 || changedLines.modifiedLines.size > 0) {
                this.extractRemovedPaths(new Set(__spreadArray(__spreadArray([], changedLines.removedLines, true), changedLines.modifiedLines, true)));
            }
            // Handle the case where the same path has both additions and removals (treat as modified, not deleted)
            // Also check if removed paths still exist in en.ts (partial removal within function)
            for (var _i = 0, _a = this.pathsToRemove; _i < _a.length; _i++) {
                var removedPath = _a[_i];
                if (this.pathsToModify.has(removedPath)) {
                    this.pathsToRemove.delete(removedPath); // It's modified, not removed
                }
                else if ((0, get_1.default)(en_1.default, removedPath) !== undefined) {
                    // Path still exists in en.ts, so it's modified not removed
                    this.pathsToRemove.delete(removedPath);
                    this.pathsToModify.add(removedPath);
                }
            }
            // Classify pathsToModify into actual modify vs add based on target file existence
            // We need to check against each target language file to properly classify paths
            for (var _b = 0, _c = this.targetLanguages; _b < _c.length; _b++) {
                var targetLanguage = _c[_b];
                var targetPath = path_1.default.join(this.languagesDir, "".concat(targetLanguage, ".ts"));
                if (fs_1.default.existsSync(targetPath)) {
                    var existingContent = fs_1.default.readFileSync(targetPath, 'utf8');
                    var existingSourceFile = typescript_1.default.createSourceFile(targetPath, existingContent, typescript_1.default.ScriptTarget.Latest, true);
                    // Check each path in pathsToModify to see if it actually exists in this target file
                    var existingTranslationsNode = this.findTranslationsNode(existingSourceFile);
                    for (var _d = 0, _e = this.pathsToModify; _d < _e.length; _d++) {
                        var pathToCheck = _e[_d];
                        if (!TSCompilerUtils_1.default.objectHas(existingTranslationsNode, pathToCheck)) {
                            this.pathsToModify.delete(pathToCheck);
                            this.pathsToAdd.add(pathToCheck);
                        }
                    }
                    // Break after first existing target file since path classification should be consistent
                    break;
                }
            }
            if (this.verbose) {
                console.log("\uD83D\uDD04 Paths to modify: ".concat(Array.from(this.pathsToModify).join(', ')));
                console.log("\u2795 Paths to add: ".concat(Array.from(this.pathsToAdd).join(', ')));
                console.log("\uD83D\uDDD1\uFE0F Paths to remove: ".concat(Array.from(this.pathsToRemove).join(', ')));
            }
        }
        catch (error) {
            throw new Error('Error building paths from git diff, giving up on --compare-ref incremental translation');
        }
    };
    /**
     * Extract dot-notation paths from nodes that are on changed lines.
     */
    TranslationGenerator.prototype.extractPathsFromChangedLines = function (node, addedLines, removedLines, isOldVersion) {
        var _this = this;
        var _a, _b;
        if (isOldVersion === void 0) { isOldVersion = false; }
        // Check if this node is on a changed line
        var sourceFile = node.getSourceFile();
        var start = sourceFile.getLineAndCharacterOfPosition(node.getStart());
        var end = sourceFile.getLineAndCharacterOfPosition(node.getEnd());
        // Check if any line of this node is in the changed lines
        var nodeLines = Array.from({ length: end.line - start.line + 1 }, function (_, i) { return start.line + i + 1; });
        var isOnAddedLine = nodeLines.some(function (lineNumber) { return addedLines.has(lineNumber); });
        var isOnRemovedLine = nodeLines.some(function (lineNumber) { return removedLines.has(lineNumber); });
        // Also check if this node has context annotation changes in its leading comments
        var hasContextChange = false;
        if (this.shouldTranslateNode(node)) {
            // Find the nearest property assignment ancestor (same logic as getContextForNode)
            var nearestPropertyAssignmentAncestor = TSCompilerUtils_1.default.findAncestor(node, function (n) { return typescript_1.default.isPropertyAssignment(n); });
            if (nearestPropertyAssignmentAncestor) {
                // Get leading comment ranges for this property assignment
                var commentRanges = (_a = typescript_1.default.getLeadingCommentRanges(sourceFile.getFullText(), nearestPropertyAssignmentAncestor.getFullStart())) !== null && _a !== void 0 ? _a : [];
                var _loop_3 = function (range) {
                    var commentStart = sourceFile.getLineAndCharacterOfPosition(range.pos);
                    var commentEnd = sourceFile.getLineAndCharacterOfPosition(range.end);
                    // Check if any line of this comment is in the changed lines
                    var commentLines = Array.from({ length: commentEnd.line - commentStart.line + 1 }, function (_, i) { return commentStart.line + i + 1; });
                    for (var _c = 0, commentLines_1 = commentLines; _c < commentLines_1.length; _c++) {
                        var commentLineNumber = commentLines_1[_c];
                        if ((addedLines.has(commentLineNumber) || removedLines.has(commentLineNumber)) && this_2.lineContainsContextAnnotation(commentLineNumber, sourceFile)) {
                            hasContextChange = true;
                            break;
                        }
                    }
                    if (hasContextChange) {
                        return "break";
                    }
                };
                var this_2 = this;
                for (var _i = 0, commentRanges_1 = commentRanges; _i < commentRanges_1.length; _i++) {
                    var range = commentRanges_1[_i];
                    var state_1 = _loop_3(range);
                    if (state_1 === "break")
                        break;
                }
            }
        }
        var hasChanges = isOnAddedLine || isOnRemovedLine || hasContextChange;
        if (hasChanges && this.shouldTranslateNode(node)) {
            // This node is on a changed line and should be translated
            // Traverse up the tree to build the dot notation path
            var translationsNode = this.findTranslationsNode((_b = node.getSourceFile()) !== null && _b !== void 0 ? _b : this.sourceFile);
            var dotPath = TSCompilerUtils_1.default.buildDotNotationPath(node, translationsNode !== null && translationsNode !== void 0 ? translationsNode : undefined);
            if (dotPath) {
                if (isOldVersion && (isOnRemovedLine || hasContextChange)) {
                    // When traversing old version, removed lines indicate paths to remove
                    this.pathsToRemove.add(dotPath);
                }
                else if (!isOldVersion && (isOnAddedLine || hasContextChange)) {
                    // When traversing current version, added lines indicate paths to modify/add
                    this.pathsToModify.add(dotPath);
                }
                if (this.verbose) {
                    console.log("\uD83D\uDD04 Found changed path: ".concat(dotPath, " (added: ").concat(isOnAddedLine, ", removed: ").concat(isOnRemovedLine, ", contextChange: ").concat(hasContextChange, ")"));
                }
            }
        }
        // Continue traversing children
        node.forEachChild(function (child) {
            _this.extractPathsFromChangedLines(child, addedLines, removedLines, isOldVersion);
        });
    };
    /**
     * Apply translation to a translatable node, using already-transformed children if available.
     */
    TranslationGenerator.prototype.translateNode = function (node, translations, transformedNode) {
        // Use the transformed node if provided, otherwise use the original
        var nodeToUse = transformedNode !== null && transformedNode !== void 0 ? transformedNode : node;
        // String literals and no-substitution templates can be translated directly
        if (typescript_1.default.isStringLiteral(node)) {
            var translatedText = translations.get(this.getTranslationKey(node));
            return translatedText ? typescript_1.default.factory.createStringLiteral(translatedText) : nodeToUse;
        }
        if (typescript_1.default.isNoSubstitutionTemplateLiteral(node)) {
            var translatedText = translations.get(this.getTranslationKey(node));
            return translatedText ? typescript_1.default.factory.createNoSubstitutionTemplateLiteral(translatedText) : nodeToUse;
        }
        if (typescript_1.default.isTemplateExpression(node)) {
            var translatedTemplate = translations.get(this.getTranslationKey(node));
            if (!translatedTemplate) {
                console.warn('⚠️ No translation found for template expression', node.getText());
                return nodeToUse;
            }
            // Extract complex expressions from the transformed node (which already has translations applied)
            var translatedComplexExpressions = new Map();
            // Use the transformed expressions - they'll have nested translations applied for complex expressions
            // and be identical to originals for simple expressions
            var transformedTemplateNode = transformedNode && typescript_1.default.isTemplateExpression(transformedNode) ? transformedNode : node;
            for (var i = 0; i < node.templateSpans.length; i++) {
                var originalExpression = node.templateSpans[i].expression;
                var transformedExpression = transformedTemplateNode.templateSpans[i].expression;
                if (!this.isSimpleExpression(originalExpression)) {
                    var hash = (0, hash_1.default)(originalExpression.getText());
                    translatedComplexExpressions.set(hash, transformedExpression);
                }
            }
            // Build the translated template expression, referencing the translated template spans as necessary
            return this.stringToTemplateExpression(translatedTemplate, translatedComplexExpressions);
        }
        return nodeToUse;
    };
    /**
     * Extract translated code strings from a transformed AST for the specified paths.
     */
    TranslationGenerator.prototype.extractTranslatedNodes = function (sourceFile, translatedCodeMap) {
        var _this = this;
        var visitWithPath = function (node, currentPath) {
            if (currentPath === void 0) { currentPath = ''; }
            // Only extract code strings for exact paths in our sets (not hierarchical matches)
            var isAddedPath = _this.pathsToAdd.has(currentPath);
            var isModifiedPath = _this.pathsToModify.has(currentPath);
            if ((isAddedPath || isModifiedPath) && typescript_1.default.isPropertyAssignment(node)) {
                if (!node.initializer) {
                    throw new Error('Found a dangling property without an initializer in a translation object. This should never happen.');
                }
                // Extract the value (property initializer) as code string
                var codeString = tsPrinter.printNode(typescript_1.default.EmitHint.Expression, node.initializer, sourceFile);
                translatedCodeMap.set(currentPath, codeString);
                return; // Stop recursing into children
            }
            // Continue traversing children, updating path for property assignments
            node.forEachChild(TSCompilerUtils_1.default.createPathAwareVisitor(visitWithPath, currentPath));
        };
        visitWithPath(sourceFile);
    };
    /**
     * Extract removed paths by traversing the old version of en.ts.
     */
    TranslationGenerator.prototype.extractRemovedPaths = function (removedLines) {
        try {
            // Get the old version of en.ts from the compare ref
            var relativePath = path_1.default.relative(process.cwd(), this.sourceFile.fileName);
            var oldEnContent = Git_1.default.show(this.compareRef, relativePath);
            var oldSourceFile = typescript_1.default.createSourceFile(this.sourceFile.fileName, oldEnContent, typescript_1.default.ScriptTarget.Latest, true);
            var oldTranslationsNode = this.findTranslationsNode(oldSourceFile);
            // Traverse the old AST to find nodes on removed lines
            this.extractPathsFromChangedLines(oldTranslationsNode, new Set(), removedLines, true);
        }
        catch (error) {
            if (this.verbose) {
                console.warn('⚠️ Error extracting removed paths:', error);
            }
        }
    };
    /**
     * Create a transformer factory for translating English code into another language.
     * For incremental translations, only translates paths that are in pathsToModify or pathsToAdd.
     */
    TranslationGenerator.prototype.createTranslationTransformer = function (translations) {
        var _this = this;
        return TSCompilerUtils_1.default.createPathAwareTransformer(function (node, currentPath) {
            if (currentPath === void 0) { currentPath = ''; }
            if (_this.shouldTranslateNode(node) && _this.shouldTranslatePath(currentPath)) {
                return {
                    action: TSCompilerUtils_1.TransformerAction.Replace,
                    newNode: function (transformedChildNode) { return _this.translateNode(node, translations, transformedChildNode); },
                };
            }
            return { action: TSCompilerUtils_1.TransformerAction.Continue };
        });
    };
    /**
     * Create a transformer factory for incremental translations of target files.
     * Injects pathsToAdd and pathsToModify directly into the target file by parsing the code strings for the translated paths.
     * Removes pathsToRemove from the target file.
     * Also cleans up any empty object literals that result from the removals.
     */
    TranslationGenerator.prototype.createIncrementalTargetTransformer = function (translatedCodeMap) {
        var _this = this;
        var mainTranslationsNode;
        return TSCompilerUtils_1.default.createPathAwareTransformer(function (node, currentPath) {
            if (!mainTranslationsNode) {
                mainTranslationsNode = _this.findTranslationsNode(node.getSourceFile());
            }
            // Check if this path should be removed
            if (currentPath && _this.pathsToRemove.has(currentPath)) {
                return { action: TSCompilerUtils_1.TransformerAction.Remove };
            }
            // Check if this is a property assignment that should be modified (exact match only)
            if (typescript_1.default.isPropertyAssignment(node) && currentPath && translatedCodeMap.has(currentPath)) {
                var translatedCodeString = translatedCodeMap.get(currentPath);
                if (!translatedCodeString) {
                    // This should never happen
                    throw new Error('An unknown error occurred');
                }
                // Parse the code string back to an AST expression
                var translatedExpression_1 = TSCompilerUtils_1.default.parseCodeStringToAST(translatedCodeString);
                return {
                    action: TSCompilerUtils_1.TransformerAction.Replace,
                    newNode: function () { return typescript_1.default.factory.createPropertyAssignment(node.name, translatedExpression_1); },
                };
            }
            // For object literals, handle additions and cleanup using bottom-up recursion
            if (typescript_1.default.isObjectLiteralExpression(node)) {
                return {
                    action: TSCompilerUtils_1.TransformerAction.Replace,
                    newNode: function (transformedNode) {
                        if (!typescript_1.default.isObjectLiteralExpression(transformedNode)) {
                            return transformedNode;
                        }
                        var properties = __spreadArray([], transformedNode.properties, true);
                        var hasChanges = false;
                        // Remove empty object literals (cleanup after path removals during recursion)
                        properties = properties.filter(function (prop) {
                            if (typescript_1.default.isPropertyAssignment(prop) && typescript_1.default.isObjectLiteralExpression(prop.initializer)) {
                                var isEmpty = prop.initializer.properties.length === 0;
                                if (isEmpty) {
                                    hasChanges = true;
                                    if (_this.verbose) {
                                        var propName = typescript_1.default.isIdentifier(prop.name) ? prop.name.text : prop.getText();
                                        console.log("\uD83E\uDDF9 Removing empty object after incremental update: \"".concat(propName, "\""));
                                    }
                                    return false; // Remove empty objects
                                }
                            }
                            return true; // Keep non-object properties and non-empty objects
                        });
                        // Add new properties (if this is the main translations node)
                        if (node === mainTranslationsNode) {
                            // Start with current properties
                            var updatedProperties = __spreadArray([], properties, true);
                            for (var _i = 0, translatedCodeMap_1 = translatedCodeMap; _i < translatedCodeMap_1.length; _i++) {
                                var _a = translatedCodeMap_1[_i], addPath = _a[0], translatedCodeString = _a[1];
                                // Parse the translated code string back to an AST expression
                                var translatedExpression = TSCompilerUtils_1.default.parseCodeStringToAST(translatedCodeString);
                                // Inject the value at the correct nested path
                                var currentObject = typescript_1.default.factory.createObjectLiteralExpression(updatedProperties);
                                var updatedObject = TSCompilerUtils_1.default.injectDeepObjectValue(currentObject, addPath, translatedExpression);
                                updatedProperties = __spreadArray([], updatedObject.properties, true);
                                hasChanges = true;
                            }
                            // Update properties with the final result
                            properties = updatedProperties;
                        }
                        // Only create a new node if something actually changed
                        return hasChanges ? typescript_1.default.factory.createObjectLiteralExpression(properties) : transformedNode;
                    },
                };
            }
            return { action: TSCompilerUtils_1.TransformerAction.Continue };
        });
    };
    /**
     * Regex to match context annotations.
     */
    TranslationGenerator.CONTEXT_REGEX = /^\s*(?:\/{2}|\*|\/\*)?\s*@context\s+([^\n*/]+)/;
    return TranslationGenerator;
}());
/**
 * The main function mostly contains CLI and file I/O logic, while TS parsing and translation logic is encapsulated in TranslationGenerator.
 */
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var languagesDir, enSourceFile, cli, translator, generator;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    languagesDir = (_a = process.env.LANGUAGES_DIR) !== null && _a !== void 0 ? _a : path_1.default.join(__dirname, '../src/languages');
                    enSourceFile = path_1.default.join(languagesDir, 'en.ts');
                    cli = new CLI_1.default({
                        flags: {
                            'dry-run': {
                                description: 'If true, just do local mocked translations rather than making real requests to an AI translator.',
                            },
                            verbose: {
                                description: 'Should we print verbose logs?',
                            },
                        },
                        namedArgs: {
                            // By default, generate translations for all supported languages. Can be overridden with the --locales flag
                            locales: {
                                description: 'Locales to generate translations for.',
                                default: Object.values(LOCALES_1.TRANSLATION_TARGET_LOCALES).filter(function (locale) { return locale !== LOCALES_1.LOCALES.ES; }),
                                parse: function (val) {
                                    var rawLocales = val.split(',');
                                    var validatedLocales = [];
                                    for (var _i = 0, rawLocales_1 = rawLocales; _i < rawLocales_1.length; _i++) {
                                        var locale = rawLocales_1[_i];
                                        if (!(0, LOCALES_1.isTranslationTargetLocale)(locale)) {
                                            throw new Error("Invalid locale ".concat(String(locale)));
                                        }
                                        validatedLocales.push(locale);
                                    }
                                    return validatedLocales;
                                },
                            },
                            'compare-ref': {
                                description: 'For incremental translations, this ref is the previous version of the codebase to compare to. Only strings that changed or had their context changed since this ref will be retranslated.',
                                default: '',
                                parse: function (val) {
                                    if (!val.trim()) {
                                        return val; // Empty string is valid (means no comparison)
                                    }
                                    // Validate that the ref exists using our Git utility
                                    if (!Git_1.default.isValidRef(val)) {
                                        throw new Error("Invalid git reference: \"".concat(val, "\". Please provide a valid branch, tag, or commit hash."));
                                    }
                                    return val;
                                },
                            },
                            paths: {
                                description: 'Comma-separated list of specific translation paths to retranslate (e.g., "common.save,errors.generic").',
                                parse: function (val) {
                                    var rawPaths = val.split(',').map(function (translationPath) { return translationPath.trim(); });
                                    var validatedPaths = new Set();
                                    var invalidPaths = [];
                                    for (var _i = 0, rawPaths_1 = rawPaths; _i < rawPaths_1.length; _i++) {
                                        var rawPath = rawPaths_1[_i];
                                        if ((0, get_1.default)(en_1.default, rawPath)) {
                                            validatedPaths.add(rawPath);
                                        }
                                        else {
                                            invalidPaths.push(rawPath);
                                        }
                                    }
                                    if (invalidPaths.length > 0) {
                                        throw new Error("found the following invalid paths: ".concat(JSON.stringify(invalidPaths)));
                                    }
                                    return validatedPaths;
                                },
                                supersedes: ['compare-ref'],
                                required: false,
                            },
                        },
                    });
                    if (cli.flags['dry-run']) {
                        console.log('🍸 Dry run enabled');
                        translator = new DummyTranslator_1.default();
                    }
                    else {
                        // Ensure OPEN_AI_KEY is set in environment
                        if (!process.env.OPENAI_API_KEY) {
                            // If not, try to load it from .env
                            dotenv.config({ path: path_1.default.resolve(__dirname, '../.env') });
                            if (!process.env.OPENAI_API_KEY) {
                                throw new Error('❌ OPENAI_API_KEY not found in environment.');
                            }
                        }
                        translator = new ChatGPTTranslator_1.default(process.env.OPENAI_API_KEY);
                    }
                    generator = new TranslationGenerator({
                        targetLanguages: cli.namedArgs.locales,
                        languagesDir: languagesDir,
                        sourceFile: enSourceFile,
                        translator: translator,
                        compareRef: cli.namedArgs['compare-ref'],
                        paths: cli.namedArgs.paths,
                        verbose: cli.flags.verbose,
                    });
                    return [4 /*yield*/, generator.generateTranslations()];
                case 1:
                    _b.sent();
                    return [2 /*return*/];
            }
        });
    });
}
if (require.main === module) {
    main();
}
exports.default = main;
