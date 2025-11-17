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
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @jest-environment node
 */
var fs_1 = require("fs");
var os_1 = require("os");
var path_1 = require("path");
var dedent_1 = require("@libs/StringUtils/dedent");
var generateTranslations_1 = require("@scripts/generateTranslations");
var Git_1 = require("@scripts/utils/Git");
var Translator_1 = require("@scripts/utils/Translator/Translator");
var processExitSpy;
var consoleErrorSpy;
// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-assignment
var mockEn = jest.requireActual('@src/languages/en');
jest.mock('@src/languages/en', function () { return ({
    // eslint-disable-next-line @typescript-eslint/naming-convention
    __esModule: true,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    get default() {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return mockEn;
    },
}); });
jest.mock('openai');
jest.mock('@scripts/utils/Git');
// Mock Git methods
var mockIsValidRef = jest.fn();
var mockDiff = jest.fn();
var mockShow = jest.fn();
// Apply mocks to Git using jest.spyOn (ignore type errors for now)
// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any
jest.spyOn(Git_1.default, 'isValidRef').mockImplementation(mockIsValidRef);
// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any
jest.spyOn(Git_1.default, 'diff').mockImplementation(mockDiff);
// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any
jest.spyOn(Git_1.default, 'show').mockImplementation(mockShow);
var tempDir;
var LANGUAGES_DIR;
var EN_PATH;
var IT_PATH;
describe('generateTranslations', function () {
    var ORIGINAL_ARGV = process.argv;
    beforeEach(function () {
        processExitSpy = jest.spyOn(process, 'exit').mockImplementation(function () { return undefined; });
        consoleErrorSpy = jest.spyOn(console, 'error');
        tempDir = fs_1.default.mkdtempSync(path_1.default.join(os_1.default.tmpdir(), 'translations-test-'));
        LANGUAGES_DIR = path_1.default.join(tempDir, 'src/languages');
        EN_PATH = path_1.default.join(LANGUAGES_DIR, 'en.ts');
        IT_PATH = path_1.default.join(LANGUAGES_DIR, 'it.ts');
        fs_1.default.mkdirSync(LANGUAGES_DIR, { recursive: true });
        // Patch env to redirect script to temp path
        process.env.LANGUAGES_DIR = LANGUAGES_DIR;
        // Set dry-run flag for tests
        process.argv = ['ts-node', 'generateTranslations.ts', '--dry-run', '--verbose', '--locales', 'it'];
        // Reset Git mocks to default behavior for each test
        mockIsValidRef.mockReset();
        mockDiff.mockReset();
        mockShow.mockReset();
        // Default to invalid ref unless explicitly mocked otherwise
        mockIsValidRef.mockReturnValue(false);
        mockDiff.mockReturnValue({ files: [], hasChanges: false });
        mockShow.mockImplementation(function () {
            throw new Error('Git show not mocked for this test');
        });
    });
    afterEach(function () {
        fs_1.default.rmSync(LANGUAGES_DIR, { recursive: true, force: true });
        delete process.env.LANGUAGES_DIR;
        jest.clearAllMocks();
    });
    afterAll(function () {
        process.argv = ORIGINAL_ARGV;
        jest.restoreAllMocks();
    });
    describe('full translations', function () {
        it('translates nested structures', function () { return __awaiter(void 0, void 0, void 0, function () {
            var itContent;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        fs_1.default.writeFileSync(EN_PATH, (0, dedent_1.default)("\n                const strings = {\n                    greeting: 'Hello',\n                    farewell: 'Goodbye',\n                    unnecessaryTemplate: `This template contains no spans`,\n                    message: (username: string, count: number) => `Hi ${username}, you have ${count} messages`,\n                    some: {\n                        nested: {\n                            str: 'nested string',\n                            fnc: ({destructuredArg}) => `My template string contains a single ${destructuredArg} argument`,\n                        }\n                    }\n                };\n                export default strings;\n            "), 'utf8');
                        return [4 /*yield*/, (0, generateTranslations_1.default)()];
                    case 1:
                        _a.sent();
                        itContent = fs_1.default.readFileSync(IT_PATH, 'utf8');
                        expect(itContent).toStrictEqual("".concat(generateTranslations_1.GENERATED_FILE_PREFIX).concat((0, dedent_1.default)("\n                import type en from './en';\n\n                const strings = {\n                    greeting: '[it] Hello',\n                    farewell: '[it] Goodbye',\n                    unnecessaryTemplate: `[it] This template contains no spans`,\n                    message: (username: string, count: number) => `[it] Hi ${username}, you have ${count} messages`,\n                    some: {\n                        nested: {\n                            str: '[it] nested string',\n                            fnc: ({destructuredArg}) => `[it] My template string contains a single ${destructuredArg} argument`,\n                        },\n                    },\n                };\n                export default strings;\n            ")));
                        return [2 /*return*/];
                }
            });
        }); });
        it("doesn't translate strings or templates used in control flows", function () { return __awaiter(void 0, void 0, void 0, function () {
            var itContent;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        fs_1.default.writeFileSync(EN_PATH, (0, dedent_1.default)("\n                import Log from '@libs/Log';\n                import CONST from '@src/CONST';\n\n                if (CONST.REPORT.TYPE.EXPENSE == 'true') {\n                    Log.info('This should not be translated');\n                    console.log('This should not be translated either');\n                }\n                function myFunction(myVariable: string): boolean | string {\n                    if (myVariable === 'Hello world') {\n                        return true;\n                    } else {\n                        switch (myVariable) {\n                            case 'Hello':\n                                return true;\n                            case 'Goodbye':\n                                return false;\n                            default:\n                                return myVariable === 'Goodnight' ? 'Moon' : 'Sun';\n                        }\n                    }\n                }\n                const strings = {\n                    [`hello`]: 'world',\n                };\n                const moreStrings = {\n                    [`key${strings.hello}`]: 'more',\n                };\n            "), 'utf8');
                        return [4 /*yield*/, (0, generateTranslations_1.default)()];
                    case 1:
                        _a.sent();
                        itContent = fs_1.default.readFileSync(IT_PATH, 'utf8');
                        expect(itContent).toStrictEqual("".concat(generateTranslations_1.GENERATED_FILE_PREFIX).concat((0, dedent_1.default)("\n                import Log from '@libs/Log';\n                import CONST from '@src/CONST';\n                import type en from './en';\n\n                if (CONST.REPORT.TYPE.EXPENSE == 'true') {\n                    Log.info('This should not be translated');\n                    console.log('This should not be translated either');\n                }\n                function myFunction(myVariable: string): boolean | string {\n                    if (myVariable === 'Hello world') {\n                        return true;\n                    } else {\n                        switch (myVariable) {\n                            case 'Hello':\n                                return true;\n                            case 'Goodbye':\n                                return false;\n                            default:\n                                return myVariable === 'Goodnight' ? '[it] Moon' : '[it] Sun';\n                        }\n                    }\n                }\n                const strings = {\n                    [`hello`]: '[it] world',\n                };\n                const moreStrings = {\n                    [`key${strings.hello}`]: '[it] more',\n                };\n            ")));
                        return [2 /*return*/];
                }
            });
        }); });
        it('handles nested template expressions', function () { return __awaiter(void 0, void 0, void 0, function () {
            var itContent;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        fs_1.default.writeFileSync(EN_PATH, (0, dedent_1.default)("\n                const strings = {\n                    simple: (name: string, greeting: string) => `${greeting} good sir ${name}!`,\n                    simpleWithDotNotation: (myParams: {name: string; greeting: string}) => `${myParams.greeting} good sir ${myParams.greeting}!`,\n                    complex: (action: {actionName: string}) => `Edit ${action.actionName === 'shouldNotBeTranslated' ? 'expense' : 'comment'}`,\n                    complexWithNullishCoalesce: (name: string) => `Pay ${name ?? 'someone'}`,\n                    complexWithFalsyCoalesce: (name: string) => `Pay ${name || 'someone'}`,\n                    extraComplex: (payer: string) => `${payer ? `${payer} as payer ` : ''}paid elsewhere`,\n                    extraComplexButJustWhitespace: (payer: string) => `${payer ? `${payer} ` : ''}paid elsewhere`,\n                    whiteSpaceWithComplexSpans: (shouldBeFormal: string, name: string) => `${shouldBeFormal ? 'Salutations' : 'Sup'} ${shouldBeFormal ? `Sir ${name}` : ` ${name}`}}`,\n                    evenMoreComplex: (someBool: boolean, someOtherBool: boolean) => `${someBool ? `${someOtherBool ? 'Hello' : 'Goodbye'} moon` : 'Goodnight, moon' }, friend`,\n                    tooComplex: (numScanning: number, numPending: number) => {\n                        const statusText: string[] = [];\n                        if (numScanning > 0) {\n                            statusText.push(`${numScanning} scanning`);\n                        }\n                        if (numPending > 0) {\n                            statusText.push(`${numPending} pending`);\n                        }\n                        return statusText.length > 0 ? `1 expense (${statusText.join(', ')})` : '1 expense';\n                    },\n                    unrealisticallyComplex: (numScanning: number, numPending: number) =>\n                        `${(() => {\n                            const statusText: string[] = [];\n                            if (numScanning > 0) {\n                                statusText.push(`${numScanning} scanning`);\n                            }\n                            if (numPending > 0) {\n                                statusText.push(`${numPending} pending`);\n                            }\n                            return statusText.length > 0 ? `1 expense (${statusText.join(', ')})` : '1 expense';\n                        })()} If someone really uses an IIFE in here, then we've got bigger problems.`,\n                };\n                export default strings;\n            "), 'utf8');
                        return [4 /*yield*/, (0, generateTranslations_1.default)()];
                    case 1:
                        _a.sent();
                        itContent = fs_1.default.readFileSync(IT_PATH, 'utf8');
                        expect(itContent).toStrictEqual("".concat(generateTranslations_1.GENERATED_FILE_PREFIX).concat((0, dedent_1.default)("\n                import type en from './en';\n\n                const strings = {\n                    simple: (name: string, greeting: string) => `[it] ${greeting} good sir ${name}!`,\n                    simpleWithDotNotation: (myParams: {name: string; greeting: string}) => `[it] ${myParams.greeting} good sir ${myParams.greeting}!`,\n                    complex: (action: {actionName: string}) => `[it] Edit ${action.actionName === 'shouldNotBeTranslated' ? '[it] expense' : '[it] comment'}`,\n                    complexWithNullishCoalesce: (name: string) => `[it] Pay ${name ?? '[it] someone'}`,\n                    complexWithFalsyCoalesce: (name: string) => `[it] Pay ${name || '[it] someone'}`,\n                    extraComplex: (payer: string) => `[it] ${payer ? `[it] ${payer} as payer ` : ''}paid elsewhere`,\n                    extraComplexButJustWhitespace: (payer: string) => `[it] ${payer ? `${payer} ` : ''}paid elsewhere`,\n                    whiteSpaceWithComplexSpans: (shouldBeFormal: string, name: string) => `${shouldBeFormal ? '[it] Salutations' : '[it] Sup'} ${shouldBeFormal ? `[it] Sir ${name}` : ` ${name}`}}`,\n                    evenMoreComplex: (someBool: boolean, someOtherBool: boolean) => `[it] ${someBool ? `[it] ${someOtherBool ? '[it] Hello' : '[it] Goodbye'} moon` : '[it] Goodnight, moon'}, friend`,\n                    tooComplex: (numScanning: number, numPending: number) => {\n                        const statusText: string[] = [];\n                        if (numScanning > 0) {\n                            statusText.push(`[it] ${numScanning} scanning`);\n                        }\n                        if (numPending > 0) {\n                            statusText.push(`[it] ${numPending} pending`);\n                        }\n                        return statusText.length > 0 ? `[it] 1 expense (${statusText.join(', ')})` : '[it] 1 expense';\n                    },\n                    unrealisticallyComplex: (numScanning: number, numPending: number) =>\n                        `[it] ${(() => {\n                            const statusText: string[] = [];\n                            if (numScanning > 0) {\n                                statusText.push(`[it] ${numScanning} scanning`);\n                            }\n                            if (numPending > 0) {\n                                statusText.push(`[it] ${numPending} pending`);\n                            }\n                            return statusText.length > 0 ? `[it] 1 expense (${statusText.join(', ')})` : '[it] 1 expense';\n                        })()} If someone really uses an IIFE in here, then we've got bigger problems.`,\n                };\n                export default strings;\n            ")));
                        return [2 /*return*/];
                }
            });
        }); });
        it('handles repeated ternaries in complex expressions', function () { return __awaiter(void 0, void 0, void 0, function () {
            var itContent;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        fs_1.default.writeFileSync(EN_PATH, (0, dedent_1.default)("\n                const strings = {\n                    updateReportFieldAllOptionsDisabled: (count: number, enabled: boolean, option: string) => {\n                        if (toggledOptionsCount > 1) {\n                            return `${enabled ? 'enabled' : 'disabled'} all options for \"${option}\".`;\n                        }\n                        return `${enabled ? 'enabled' : 'disabled'} the option \"${option}\" for the report field \"${option}\", making all options ${enabled ? 'enabled' : 'disabled'}`;\n                    },\n                };\n                export default strings;\n            "), 'utf8');
                        return [4 /*yield*/, (0, generateTranslations_1.default)()];
                    case 1:
                        _a.sent();
                        itContent = fs_1.default.readFileSync(IT_PATH, 'utf8');
                        expect(itContent).toStrictEqual("".concat(generateTranslations_1.GENERATED_FILE_PREFIX).concat((0, dedent_1.default)("\n                import type en from './en';\n\n                const strings = {\n                    updateReportFieldAllOptionsDisabled: (count: number, enabled: boolean, option: string) => {\n                        if (toggledOptionsCount > 1) {\n                            return `[it] ${enabled ? '[it] enabled' : '[it] disabled'} all options for \"${option}\".`;\n                        }\n                        return `[it] ${enabled ? '[it] enabled' : '[it] disabled'} the option \"${option}\" for the report field \"${option}\", making all options ${enabled ? '[it] enabled' : '[it] disabled'}`;\n                    },\n                };\n                export default strings;\n            ")));
                        return [2 /*return*/];
                }
            });
        }); });
        it('Handles context annotations', function () { return __awaiter(void 0, void 0, void 0, function () {
            var itContent;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        fs_1.default.writeFileSync(EN_PATH, (0, dedent_1.default)("\n                const strings = {\n                    // @context As in a financial institution\n                    bank: 'Bank',\n                    // @context As in a financial institution\n                    bankTemplate: `Bank`,\n                    // @context As in an aviation maneuver\n                    aviationBank: 'Bank',\n                    // This key has regular comments mixed with context-comments\n                    // eslint-disable-next-line max-len\n                    // @context foo\n                    foo: 'Foo',\n                    // @context bar\n                    // What about if the context comment isn't the last comment?\n                    bar: 'Bar',\n                    some: {\n                        nested: {\n                            // @context nested\n                            str: 'nested string',\n                            // @context for my template function\n                            func: ({destructuredArg}) => `My template string contains a single ${destructuredArg} argument`,\n                        },\n                    },\n                    // @context will be applied to both translations\n                    boolFunc: (flag: boolean) => flag ? 'ValueIfTrue' : 'ValueIfFalse',\n                    separateContextTernaries: ((flag: boolean) => flag ? /* @context only for true */ 'True with context' : 'False without context'),\n                    // @context formal greeting, only provided to outermost template translation\n                    onlyInTopLevelOfTemplates: (name: string) =>\n                        `Salutations, ${name ?? /* @context inline context */ 'my very good friend'}`,\n                };\n                export default strings;\n            "), 'utf8');
                        return [4 /*yield*/, (0, generateTranslations_1.default)()];
                    case 1:
                        _a.sent();
                        itContent = fs_1.default.readFileSync(IT_PATH, 'utf8');
                        expect(itContent).toStrictEqual("".concat(generateTranslations_1.GENERATED_FILE_PREFIX).concat((0, dedent_1.default)("\n                import type en from './en';\n\n                const strings = {\n                    // @context As in a financial institution\n                    bank: '[it][ctx: As in a financial institution] Bank',\n                    // @context As in a financial institution\n                    bankTemplate: `[it][ctx: As in a financial institution] Bank`,\n                    // @context As in an aviation maneuver\n                    aviationBank: '[it][ctx: As in an aviation maneuver] Bank',\n                    // This key has regular comments mixed with context-comments\n                    // eslint-disable-next-line max-len\n                    // @context foo\n                    foo: '[it][ctx: foo] Foo',\n                    // @context bar\n                    // What about if the context comment isn't the last comment?\n                    bar: '[it][ctx: bar] Bar',\n                    some: {\n                        nested: {\n                            // @context nested\n                            str: '[it][ctx: nested] nested string',\n                            // @context for my template function\n                            func: ({destructuredArg}) => `[it][ctx: for my template function] My template string contains a single ${destructuredArg} argument`,\n                        },\n                    },\n                    // @context will be applied to both translations\n                    boolFunc: (flag: boolean) => (flag ? '[it][ctx: will be applied to both translations] ValueIfTrue' : '[it][ctx: will be applied to both translations] ValueIfFalse'),\n                    separateContextTernaries: (flag: boolean) => (flag ? /* @context only for true */ '[it][ctx: only for true] True with context' : '[it] False without context'),\n                    // @context formal greeting, only provided to outermost template translation\n                    onlyInTopLevelOfTemplates: (name: string) =>\n                        `[it][ctx: formal greeting, only provided to outermost template translation] Salutations, ${name ?? /* @context inline context */ '[it][ctx: inline context] my very good friend'}`,\n                };\n                export default strings;\n            ")));
                        return [2 /*return*/];
                }
            });
        }); });
        it("doesn't request duplicate translations", function () { return __awaiter(void 0, void 0, void 0, function () {
            var translateSpy, itContent;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        fs_1.default.writeFileSync(EN_PATH, (0, dedent_1.default)("\n                const strings = {\n                    greeting: 'Hello',\n                    farewell: 'Goodbye',\n                    repeatGreeting: `Hello`,\n                    nested: {\n                        anotherGreeting: 'Hello',\n                        anotherFarewell: 'Goodbye',\n                    },\n                    // @context diff\n                    greetingWithDifferentContext: 'Hello',\n                };\n                export default strings;\n            "), 'utf8');
                        translateSpy = jest.spyOn(Translator_1.default.prototype, 'translate');
                        return [4 /*yield*/, (0, generateTranslations_1.default)()];
                    case 1:
                        _a.sent();
                        itContent = fs_1.default.readFileSync(IT_PATH, 'utf8');
                        expect(itContent).toStrictEqual("".concat(generateTranslations_1.GENERATED_FILE_PREFIX).concat((0, dedent_1.default)("\n                import type en from './en';\n\n                const strings = {\n                    greeting: '[it] Hello',\n                    farewell: '[it] Goodbye',\n                    repeatGreeting: `[it] Hello`,\n                    nested: {\n                        anotherGreeting: '[it] Hello',\n                        anotherFarewell: '[it] Goodbye',\n                    },\n                    // @context diff\n                    greetingWithDifferentContext: '[it][ctx: diff] Hello',\n                };\n                export default strings;\n            ")));
                        expect(translateSpy).toHaveBeenCalledTimes(3);
                        expect(translateSpy).toHaveBeenNthCalledWith(1, 'it', 'Hello', undefined);
                        expect(translateSpy).toHaveBeenNthCalledWith(2, 'it', 'Goodbye', undefined);
                        expect(translateSpy).toHaveBeenNthCalledWith(3, 'it', 'Hello', 'diff');
                        return [2 /*return*/];
                }
            });
        }); });
        it("doesn't translate type annotations", function () { return __awaiter(void 0, void 0, void 0, function () {
            var itContent;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        fs_1.default.writeFileSync(EN_PATH, (0, dedent_1.default)("\n                const strings = {\n                    myFunc: ({brand}: {brand: 'Apple' | 'Google'}) => `${brand} Phone`,\n                };\n                export default strings;\n            "), 'utf8');
                        return [4 /*yield*/, (0, generateTranslations_1.default)()];
                    case 1:
                        _a.sent();
                        itContent = fs_1.default.readFileSync(IT_PATH, 'utf8');
                        expect(itContent).toStrictEqual("".concat(generateTranslations_1.GENERATED_FILE_PREFIX).concat((0, dedent_1.default)("\n                import type en from './en';\n\n                const strings = {\n                    myFunc: ({brand}: {brand: 'Apple' | 'Google'}) => `[it] ${brand} Phone`,\n                };\n                export default strings;\n            ")));
                        return [2 /*return*/];
                }
            });
        }); });
        it('unescapes unicode', function () { return __awaiter(void 0, void 0, void 0, function () {
            var itContent;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        fs_1.default.writeFileSync(EN_PATH, (0, dedent_1.default)("\n                const strings = {\n                    hello: '\u3053\u3093\u306B\u3061\u306F',\n                    world: 'world',\n                };\n                export default strings;\n            "), 'utf8');
                        return [4 /*yield*/, (0, generateTranslations_1.default)()];
                    case 1:
                        _a.sent();
                        itContent = fs_1.default.readFileSync(IT_PATH, 'utf8');
                        expect(itContent).toStrictEqual("".concat(generateTranslations_1.GENERATED_FILE_PREFIX).concat((0, dedent_1.default)("\n                import type en from './en';\n\n                const strings = {\n                    hello: '[it] \u3053\u3093\u306B\u3061\u306F',\n                    world: '[it] world',\n                };\n                export default strings;\n            ")));
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('incremental translations', function () {
        it('reuses existing translations from --compare-ref with git diff', function () { return __awaiter(void 0, void 0, void 0, function () {
            var translateSpy, itContent;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        // Create English source with one new string
                        fs_1.default.writeFileSync(EN_PATH, (0, dedent_1.default)("\n                const strings = {\n                    greeting: 'Hello',\n                    unchanged: 'Unchanged',\n                    func: (name: string) => `Hello ${name}`,\n                    noSubstitutionTemplate: `Salutations`,\n                    complexFunc: (numScanning: number, numPending: number) => {\n                        const statusText: string[] = [];\n                        if (numScanning > 0) {\n                            statusText.push(`${numScanning} scanning`);\n                        }\n                        if (numPending > 0) {\n                            statusText.push(`${numPending} pending`);\n                        }\n                        return statusText.length > 0 ? `1 expense (${statusText.join(', ')})` : '1 expense';\n                    },\n                    extraComplex: (payer: string) => `${payer ? `${payer} as payer ` : ''}paid elsewhere`,\n                    newKey: 'New value!',\n                };\n                export default strings;\n            "), 'utf8');
                        // Create existing Italian translation without the new key
                        fs_1.default.writeFileSync(IT_PATH, (0, dedent_1.default)("\n                import type en from './en';\n                const strings = {\n                    greeting: '[it] Hello',\n                    unchanged: '[it] Unchanged',\n                    func: (name: string) => `[it] Hello ${name}`,\n                    noSubstitutionTemplate: `[it] Salutations`,\n                    complexFunc: (numScanning: number, numPending: number) => {\n                        const statusText: string[] = [];\n                        if (numScanning > 0) {\n                            statusText.push(`[it] ${numScanning} scanning`);\n                        }\n                        if (numPending > 0) {\n                            statusText.push(`[it] ${numPending} pending`);\n                        }\n                        return statusText.length > 0 ? `[it] 1 expense (${statusText.join(', ')})` : '[it] 1 expense';\n                    },\n                    extraComplex: (payer: string) => `[it] ${payer ? `[it] ${payer} as payer ` : ''}paid elsewhere`,\n                };\n                export default strings;\n            "), 'utf8');
                        // Mock Git.diff to show only the new key was added
                        mockIsValidRef.mockReturnValue(true);
                        mockDiff.mockReturnValue({
                            files: [
                                {
                                    filePath: 'src/languages/en.ts',
                                    hunks: [],
                                    addedLines: new Set([17]), // Line with newKey
                                    removedLines: new Set(),
                                    modifiedLines: new Set(),
                                },
                            ],
                            hasChanges: true,
                        });
                        process.argv = ['ts-node', 'generateTranslations.ts', '--dry-run', '--verbose', '--locales', 'it', '--compare-ref', 'main'];
                        translateSpy = jest.spyOn(Translator_1.default.prototype, 'translate');
                        return [4 /*yield*/, (0, generateTranslations_1.default)()];
                    case 1:
                        _a.sent();
                        itContent = fs_1.default.readFileSync(IT_PATH, 'utf8');
                        // Should preserve all existing translations
                        expect(itContent).toContain('[it] Hello');
                        expect(itContent).toContain('[it] Unchanged');
                        // eslint-disable-next-line no-template-curly-in-string
                        expect(itContent).toContain('[it] Hello ${name}');
                        expect(itContent).toContain('[it] Salutations');
                        // Should add the new translation
                        expect(itContent).toContain('[it] New value!');
                        // Should only translate the new string
                        expect(translateSpy).toHaveBeenCalledTimes(1);
                        expect(translateSpy).toHaveBeenCalledWith('it', 'New value!', undefined);
                        return [2 /*return*/];
                }
            });
        }); });
        it('translates only specified paths when --paths is provided', function () { return __awaiter(void 0, void 0, void 0, function () {
            var strings, translateSpy, itContent;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        strings = {
                            greeting: 'Hello',
                            farewell: 'Goodbye',
                            common: {
                                save: 'Save',
                                cancel: 'Cancel',
                            },
                            errors: {
                                generic: 'An error occurred',
                                network: 'Network error',
                            },
                        };
                        mockEn = strings;
                        fs_1.default.writeFileSync(EN_PATH, (0, dedent_1.default)("\n                const strings = ".concat(JSON.stringify(strings), ";\n                export default strings;\n            ")), 'utf8');
                        // Create existing Italian translation file with some existing translations
                        fs_1.default.writeFileSync(IT_PATH, (0, dedent_1.default)("\n                import type en from './en';\n                const strings = {\n                    greeting: '[it] Hello',\n                    farewell: '[it] Goodbye',\n                    common: {\n                        save: '[it] Old Save Translation',\n                        cancel: '[it] Cancel',\n                    },\n                    errors: {\n                        generic: '[it] Old Error Translation',\n                        network: '[it] Network error',\n                    },\n                };\n                export default strings;\n            "), 'utf8');
                        // Override process.argv to specify only certain paths
                        process.argv = ['ts-node', 'generateTranslations.ts', '--dry-run', '--verbose', '--locales', 'it', '--paths', 'common.save,errors.generic'];
                        translateSpy = jest.spyOn(Translator_1.default.prototype, 'translate');
                        return [4 /*yield*/, (0, generateTranslations_1.default)()];
                    case 1:
                        _a.sent();
                        itContent = fs_1.default.readFileSync(IT_PATH, 'utf8');
                        // Only the specified paths should be retranslated with new translations
                        expect(itContent).toContain('[it] Save'); // Should be retranslated
                        expect(itContent).toContain('[it] An error occurred'); // Should be retranslated
                        // Other paths should remain unchanged from their existing translations
                        expect(itContent).toContain('[it] Hello'); // Should remain unchanged
                        expect(itContent).toContain('[it] Goodbye'); // Should remain unchanged
                        expect(itContent).toContain('[it] Cancel'); // Should remain unchanged
                        expect(itContent).toContain('[it] Network error'); // Should remain unchanged
                        // Old translations should be replaced
                        expect(itContent).not.toContain('[it] Old Save Translation');
                        expect(itContent).not.toContain('[it] Old Error Translation');
                        expect(translateSpy).toHaveBeenCalledTimes(2);
                        expect(translateSpy).toHaveBeenCalledWith('it', 'Save', undefined);
                        expect(translateSpy).toHaveBeenCalledWith('it', 'An error occurred', undefined);
                        return [2 /*return*/];
                }
            });
        }); });
        it('translates nested paths when parent path is specified', function () { return __awaiter(void 0, void 0, void 0, function () {
            var strings, translateSpy, itContent;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        strings = {
                            greeting: 'Hello',
                            common: {
                                save: 'Save',
                                cancel: 'Cancel',
                                nested: {
                                    deep: 'Deep value',
                                },
                            },
                            errors: {
                                generic: 'An error occurred',
                            },
                        };
                        mockEn = strings;
                        fs_1.default.writeFileSync(EN_PATH, (0, dedent_1.default)("\n                const strings = ".concat(JSON.stringify(strings), ";\n                export default strings;\n            ")), 'utf8');
                        // Create existing Italian translation file
                        fs_1.default.writeFileSync(IT_PATH, (0, dedent_1.default)("\n                import type en from './en';\n                const strings = {\n                    greeting: '[it] Hello (existing)',\n                    common: {\n                        save: '[it] Save (existing)',\n                        cancel: '[it] Cancel (existing)',\n                        nested: {\n                            deep: '[it] Deep value (existing)',\n                        },\n                    },\n                    errors: {\n                        generic: '[it] An error occurred (existing)',\n                    },\n                };\n                export default strings;\n            "), 'utf8');
                        // Override process.argv to specify parent path
                        process.argv = ['ts-node', 'generateTranslations.ts', '--dry-run', '--verbose', '--locales', 'it', '--paths', 'common'];
                        translateSpy = jest.spyOn(Translator_1.default.prototype, 'translate');
                        return [4 /*yield*/, (0, generateTranslations_1.default)()];
                    case 1:
                        _a.sent();
                        itContent = fs_1.default.readFileSync(IT_PATH, 'utf8');
                        // All nested paths under 'common' should be retranslated
                        expect(itContent).toContain('[it] Save');
                        expect(itContent).toContain('[it] Cancel');
                        expect(itContent).toContain('[it] Deep value');
                        // Other paths should remain unchanged from existing translations
                        expect(itContent).toContain('[it] Hello (existing)');
                        expect(itContent).toContain('[it] An error occurred (existing)');
                        // Old translations should be replaced
                        expect(itContent).not.toContain('[it] Save (existing)');
                        expect(itContent).not.toContain('[it] Cancel (existing)');
                        expect(itContent).not.toContain('[it] Deep value (existing)');
                        expect(translateSpy).toHaveBeenCalledTimes(3);
                        expect(translateSpy).toHaveBeenCalledWith('it', 'Save', undefined);
                        expect(translateSpy).toHaveBeenCalledWith('it', 'Cancel', undefined);
                        expect(translateSpy).toHaveBeenCalledWith('it', 'Deep value', undefined);
                        return [2 /*return*/];
                }
            });
        }); });
        it('ignores --compare-ref when --paths is provided', function () { return __awaiter(void 0, void 0, void 0, function () {
            var strings, translateSpy, itContent;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        strings = {
                            greeting: 'Hello',
                            common: {
                                save: 'Save',
                            },
                        };
                        mockEn = strings;
                        fs_1.default.writeFileSync(EN_PATH, (0, dedent_1.default)("\n                const strings = ".concat(JSON.stringify(strings), ";\n                export default strings;\n            ")), 'utf8');
                        // Create existing Italian translation file
                        fs_1.default.writeFileSync(IT_PATH, (0, dedent_1.default)("\n                import type en from './en';\n                const strings = {\n                    greeting: '[it] Hello (existing)',\n                    common: {\n                        save: '[it] Save (existing)',\n                    },\n                };\n                export default strings;\n            "), 'utf8');
                        // Override process.argv to specify both paths and compare-ref
                        process.argv = ['ts-node', 'generateTranslations.ts', '--dry-run', '--verbose', '--locales', 'it', '--paths', 'common.save', '--compare-ref', 'main'];
                        translateSpy = jest.spyOn(Translator_1.default.prototype, 'translate');
                        return [4 /*yield*/, (0, generateTranslations_1.default)()];
                    case 1:
                        _a.sent();
                        itContent = fs_1.default.readFileSync(IT_PATH, 'utf8');
                        // Only the specified path should be retranslated
                        expect(itContent).toContain('[it] Save');
                        // Other paths should remain unchanged
                        expect(itContent).toContain('[it] Hello (existing)');
                        // Old translation should be replaced
                        expect(itContent).not.toContain('[it] Save (existing)');
                        expect(translateSpy).toHaveBeenCalledTimes(1);
                        expect(translateSpy).toHaveBeenCalledWith('it', 'Save', undefined);
                        return [2 /*return*/];
                }
            });
        }); });
        it('throws error when target file does not exist for --paths', function () { return __awaiter(void 0, void 0, void 0, function () {
            var strings;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        strings = {
                            greeting: 'Hello',
                            common: {
                                save: 'Save',
                            },
                        };
                        mockEn = strings;
                        fs_1.default.writeFileSync(EN_PATH, (0, dedent_1.default)("\n                const strings = ".concat(JSON.stringify(strings), ";\n                export default strings;\n            ")), 'utf8');
                        // Don't create IT_PATH - this should cause an error
                        process.argv = ['ts-node', 'generateTranslations.ts', '--dry-run', '--verbose', '--locales', 'it', '--paths', 'common.save'];
                        return [4 /*yield*/, expect((0, generateTranslations_1.default)()).rejects.toThrow('Target file')];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('throws error for invalid paths', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        fs_1.default.writeFileSync(EN_PATH, (0, dedent_1.default)("\n                const strings = {\n                    greeting: 'Hello',\n                    common: {\n                        save: 'Save',\n                    },\n                };\n                export default strings;\n            "), 'utf8');
                        // Override process.argv to specify a non-existent path
                        process.argv = ['ts-node', 'generateTranslations.ts', '--dry-run', '--verbose', '--locales', 'it', '--paths', 'nonexistent.path'];
                        // Expect the script to throw an error during CLI parsing
                        return [4 /*yield*/, (0, generateTranslations_1.default)()];
                    case 1:
                        // Expect the script to throw an error during CLI parsing
                        _a.sent();
                        expect(consoleErrorSpy).toHaveBeenCalledWith('Invalid value for --paths: found the following invalid paths: ["nonexistent.path"]');
                        expect(processExitSpy).toHaveBeenCalledWith(1);
                        return [2 /*return*/];
                }
            });
        }); });
        it('validates paths against actual translation structure', function () { return __awaiter(void 0, void 0, void 0, function () {
            var strings, translateSpy, itContent;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        strings = {
                            greeting: 'Hello',
                            common: {
                                save: 'Save',
                            },
                            errors: {
                                generic: 'An error occurred',
                            },
                        };
                        mockEn = strings;
                        fs_1.default.writeFileSync(EN_PATH, (0, dedent_1.default)("\n                const strings = ".concat(JSON.stringify(strings), ";\n                export default strings;\n            ")), 'utf8');
                        // Create existing Italian translation file
                        fs_1.default.writeFileSync(IT_PATH, (0, dedent_1.default)("\n                import type en from './en';\n                const strings = {\n                    greeting: '[it] Hello (existing)',\n                    common: {\n                        save: '[it] Save (existing)',\n                    },\n                    errors: {\n                        generic: '[it] An error occurred (existing)',\n                    },\n                };\n                export default strings;\n            "), 'utf8');
                        // Test that valid paths work
                        process.argv = ['ts-node', 'generateTranslations.ts', '--dry-run', '--verbose', '--locales', 'it', '--paths', 'greeting,common.save'];
                        translateSpy = jest.spyOn(Translator_1.default.prototype, 'translate');
                        return [4 /*yield*/, (0, generateTranslations_1.default)()];
                    case 1:
                        _a.sent();
                        itContent = fs_1.default.readFileSync(IT_PATH, 'utf8');
                        // Should translate the specified paths
                        expect(itContent).toContain('[it] Hello');
                        expect(itContent).toContain('[it] Save');
                        // Should not translate other paths - should preserve existing translations
                        expect(itContent).toContain('[it] An error occurred (existing)');
                        // Should not contain fresh translations of unspecified paths
                        expect(itContent).not.toContain('[it] Cancel'); // This path doesn't exist, so shouldn't be added
                        expect(translateSpy).toHaveBeenCalledTimes(2);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should preserve existing translations for paths not specified in --paths', function () { return __awaiter(void 0, void 0, void 0, function () {
            var strings, itContent;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        strings = {
                            greeting: 'Hello',
                            farewell: 'Goodbye',
                            common: {
                                save: 'Save',
                                cancel: 'Cancel',
                            },
                            errors: {
                                generic: 'An error occurred',
                                network: 'Network error',
                            },
                            simpleTemplate: function (name) { return "Welcome ".concat(name, " to our app"); },
                        };
                        mockEn = strings;
                        // Create English source file
                        fs_1.default.writeFileSync(EN_PATH, (0, dedent_1.default)("\n                const strings = ".concat(JSON.stringify(strings), ";\n                export default strings;\n            ")), 'utf8');
                        // Create an existing Italian translation file with all strings already translated
                        fs_1.default.writeFileSync(IT_PATH, (0, dedent_1.default)("\n                import type en from './en';\n\n                const strings = {\n                    greeting: '[it] Hello (existing)',\n                    farewell: '[it] Goodbye (existing)',\n                    common: {\n                        save: '[it] Save (existing)',\n                        cancel: '[it] Cancel (existing)',\n                    },\n                    errors: {\n                        generic: '[it] An error occurred (existing)',\n                        network: '[it] Network error (existing)',\n                    },\n                    // eslint-disable-next-line no-template-curly-in-string\n                    simpleTemplate: (name: string) => `[it] Welcome ${name} to our app (existing)`,\n                };\n                export default strings;\n            "), 'utf8');
                        // Only retranslate specific paths - the bug is that existing translations get lost
                        process.argv = ['ts-node', 'generateTranslations.ts', '--dry-run', '--verbose', '--locales', 'it', '--paths', 'common.save,errors.generic'];
                        return [4 /*yield*/, (0, generateTranslations_1.default)()];
                    case 1:
                        _a.sent();
                        itContent = fs_1.default.readFileSync(IT_PATH, 'utf8');
                        // Specified paths should be retranslated (lose the "(existing)" suffix)
                        expect(itContent).toContain('[it] Save');
                        expect(itContent).toContain('[it] An error occurred');
                        expect(itContent).not.toContain('[it] Save (existing)');
                        expect(itContent).not.toContain('[it] An error occurred (existing)');
                        // BUG: Existing translations for paths NOT in filter should be preserved
                        expect(itContent).toContain('[it] Hello (existing)');
                        expect(itContent).toContain('[it] Goodbye (existing)');
                        expect(itContent).toContain('[it] Cancel (existing)');
                        expect(itContent).toContain('[it] Network error (existing)');
                        // eslint-disable-next-line no-template-curly-in-string
                        expect(itContent).toContain('[it] Welcome ${name} to our app (existing)');
                        // Should NOT contain English versions (which would indicate the bug)
                        expect(itContent).not.toContain("greeting: 'Hello'");
                        expect(itContent).not.toContain("farewell: 'Goodbye'");
                        expect(itContent).not.toContain("cancel: 'Cancel'");
                        expect(itContent).not.toContain("network: 'Network error'");
                        return [2 /*return*/];
                }
            });
        }); });
        it('handles incremental translation with multiple target languages', function () { return __awaiter(void 0, void 0, void 0, function () {
            var FR_PATH, translateSpy, itContent, frContent;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        // Create English source
                        fs_1.default.writeFileSync(EN_PATH, (0, dedent_1.default)("\n                    import CONST from '@src/CONST';\n\n                    const strings = {\n                        greeting: 'Hello',\n                        farewell: 'Goodbye',\n                        common: {\n                            save: 'Save',\n                            cancel: 'Cancel',\n                        },\n                        newKey: 'New value!',\n                    };\n                    export default strings;\n                "), 'utf8');
                        // Create existing Italian translation
                        fs_1.default.writeFileSync(IT_PATH, (0, dedent_1.default)("\n                    import type en from './en';\n\n                    const strings = {\n                        greeting: '[it] Hello',\n                        farewell: '[it] Goodbye',\n                        common: {\n                            save: '[it] Save',\n                            cancel: '[it] Cancel',\n                        },\n                    };\n                    export default strings;\n                "), 'utf8');
                        FR_PATH = path_1.default.join(LANGUAGES_DIR, 'fr.ts');
                        fs_1.default.writeFileSync(FR_PATH, (0, dedent_1.default)("\n                    import type en from './en';\n\n                    const strings = {\n                        greeting: '[fr] Hello',\n                        farewell: '[fr] Goodbye',\n                        common: {\n                            save: '[fr] Save',\n                            cancel: '[fr] Cancel',\n                        },\n                    };\n                    export default strings;\n                "), 'utf8');
                        // Mock Git.diff to show one new string added
                        mockIsValidRef.mockReturnValue(true);
                        mockDiff.mockReturnValue({
                            files: [
                                {
                                    filePath: 'src/languages/en.ts',
                                    hunks: [],
                                    addedLines: new Set([10]), // Line with newKey
                                    removedLines: new Set(),
                                    modifiedLines: new Set(),
                                },
                            ],
                            hasChanges: true,
                        });
                        process.argv = ['ts-node', 'generateTranslations.ts', '--dry-run', '--verbose', '--locales', 'it,fr', '--compare-ref', 'main'];
                        translateSpy = jest.spyOn(Translator_1.default.prototype, 'translate');
                        return [4 /*yield*/, (0, generateTranslations_1.default)()];
                    case 1:
                        _a.sent();
                        itContent = fs_1.default.readFileSync(IT_PATH, 'utf8');
                        frContent = fs_1.default.readFileSync(FR_PATH, 'utf8');
                        // Both files should preserve existing translations
                        expect(itContent).toContain('[it] Hello');
                        expect(itContent).toContain('[it] Goodbye');
                        expect(itContent).toContain('[it] Save');
                        expect(itContent).toContain('[it] Cancel');
                        expect(frContent).toContain('[fr] Hello');
                        expect(frContent).toContain('[fr] Goodbye');
                        expect(frContent).toContain('[fr] Save');
                        expect(frContent).toContain('[fr] Cancel');
                        // Both should have the new translation
                        expect(itContent).toContain('[it] New value!');
                        expect(frContent).toContain('[fr] New value!');
                        // Only the new string should have been translated
                        expect(translateSpy).toHaveBeenCalledTimes(2); // Once for IT, once for FR
                        expect(translateSpy).toHaveBeenCalledWith('it', 'New value!', undefined);
                        expect(translateSpy).toHaveBeenCalledWith('fr', 'New value!', undefined);
                        return [2 /*return*/];
                }
            });
        }); });
        it('validates compare-ref is a valid git reference', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        fs_1.default.writeFileSync(EN_PATH, (0, dedent_1.default)("\n                const strings = {\n                    greeting: 'Hello',\n                };\n                export default strings;\n            "), 'utf8');
                        // Test with invalid git reference
                        process.argv = ['ts-node', 'generateTranslations.ts', '--dry-run', '--verbose', '--locales', 'it', '--compare-ref', 'invalid-ref-that-does-not-exist'];
                        // Expect the script to throw an error during CLI parsing
                        return [4 /*yield*/, (0, generateTranslations_1.default)()];
                    case 1:
                        // Expect the script to throw an error during CLI parsing
                        _a.sent();
                        expect(consoleErrorSpy).toHaveBeenCalledWith('Invalid value for --compare-ref: Invalid git reference: "invalid-ref-that-does-not-exist". Please provide a valid branch, tag, or commit hash.');
                        expect(processExitSpy).toHaveBeenCalledWith(1);
                        return [2 /*return*/];
                }
            });
        }); });
        it('handles complex nested templates and ternaries with git diff', function () { return __awaiter(void 0, void 0, void 0, function () {
            var itContent;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        // Create English source with complex nested expressions
                        fs_1.default.writeFileSync(EN_PATH, (0, dedent_1.default)("\n                const strings = {\n                    deepTemplate: (user: User, settings: Settings) => `${user.isAdmin ? \n                        `Admin ${user.name}: ${settings.theme === 'dark' ? 'Dark mode' : 'Light mode'}` : \n                        `User ${user.name ?? 'Unknown'}: ${settings.notifications ? 'Notifications on' : 'Silent'}`\n                    } - ${settings.language || 'English'}`,\n                    unchanged: 'Keep this'\n                };\n                export default strings;\n            "), 'utf8');
                        // Create existing translation
                        fs_1.default.writeFileSync(IT_PATH, (0, dedent_1.default)("\n                import type en from './en';\n                const strings = {\n                    deepTemplate: (user: User, settings: Settings) => `[it] Old complex template`,\n                    unchanged: '[it] Keep this (existing)'\n                };\n                export default strings;\n            "), 'utf8');
                        // Mock git diff showing template changes
                        mockIsValidRef.mockReturnValue(true);
                        mockDiff.mockReturnValue({
                            files: [
                                {
                                    filePath: 'src/languages/en.ts',
                                    hunks: [],
                                    addedLines: new Set([2, 3, 4]), // Lines in the complex template
                                    removedLines: new Set(),
                                    modifiedLines: new Set(),
                                },
                            ],
                            hasChanges: true,
                        });
                        process.argv = ['ts-node', 'generateTranslations.ts', '--dry-run', '--locales', 'it', '--compare-ref', 'main'];
                        return [4 /*yield*/, (0, generateTranslations_1.default)()];
                    case 1:
                        _a.sent();
                        itContent = fs_1.default.readFileSync(IT_PATH, 'utf8');
                        // Should preserve unchanged string
                        expect(itContent).toContain('[it] Keep this (existing)');
                        // Should retranslate complex template - check for key parts rather than exact formatting
                        expect(itContent).toContain('deepTemplate: (user: User, settings: Settings) =>');
                        expect(itContent).toContain('[it] Admin');
                        expect(itContent).toContain('[it] Dark mode');
                        expect(itContent).toContain('[it] Light mode');
                        expect(itContent).toContain('[it] User');
                        expect(itContent).toContain('[it] Unknown');
                        expect(itContent).toContain('[it] Notifications on');
                        expect(itContent).toContain('[it] Silent');
                        expect(itContent).toContain('[it] English');
                        expect(itContent).toContain('user.isAdmin');
                        // eslint-disable-next-line no-template-curly-in-string
                        expect(itContent).toContain('${user.name}');
                        expect(itContent).toContain("settings.theme === 'dark'");
                        expect(itContent).not.toContain('[it] Old complex template');
                        return [2 /*return*/];
                }
            });
        }); });
        it('handles path removal with nested object cleanup', function () { return __awaiter(void 0, void 0, void 0, function () {
            var itContent;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        // Create English source with some sections removed
                        fs_1.default.writeFileSync(EN_PATH, (0, dedent_1.default)("\n                const strings = {\n                    keep: {\n                        this: 'Keep this section'\n                    },\n                    modify: {\n                        update: 'Updated value'\n                    }\n                };\n                export default strings;\n            "), 'utf8');
                        // Create existing translation with extra sections that will be removed
                        fs_1.default.writeFileSync(IT_PATH, (0, dedent_1.default)("\n                import type en from './en';\n                const strings = {\n                    keep: {\n                        this: '[it] Keep this section (existing)'\n                    },\n                    modify: {\n                        update: '[it] Updated value (old)',\n                        remove: '[it] Will be removed'\n                    },\n                    deleteEntire: {\n                        gone: '[it] Entire section removed',\n                        alsoGone: '[it] Also removed'\n                    }\n                };\n                export default strings;\n            "), 'utf8');
                        // Mock git diff showing modifications and removals
                        mockIsValidRef.mockReturnValue(true);
                        mockDiff.mockReturnValue({
                            files: [
                                {
                                    filePath: 'src/languages/en.ts',
                                    hunks: [],
                                    addedLines: new Set([6]), // Line with updated value
                                    removedLines: new Set([7, 9, 10, 11, 12]), // Lines where sections were removed
                                    modifiedLines: new Set(),
                                },
                            ],
                            hasChanges: true,
                        });
                        // Mock git show to return the old version of en.ts with the removed sections
                        mockShow.mockReturnValue((0, dedent_1.default)("\n                const strings = {\n                    keep: {\n                        this: 'Keep this section'\n                    },\n                    modify: {\n                        update: 'Old value',\n                        remove: 'Will be removed'\n                    },\n                    deleteEntire: {\n                        gone: 'Entire section removed',\n                        alsoGone: 'Also removed'\n                    }\n                };\n                export default strings;\n            "));
                        process.argv = ['ts-node', 'generateTranslations.ts', '--dry-run', '--locales', 'it', '--compare-ref', 'main'];
                        return [4 /*yield*/, (0, generateTranslations_1.default)()];
                    case 1:
                        _a.sent();
                        itContent = fs_1.default.readFileSync(IT_PATH, 'utf8');
                        // Should preserve unchanged sections
                        expect(itContent).toContain('[it] Keep this section (existing)');
                        // Should retranslate modified paths
                        expect(itContent).toContain('[it] Updated value');
                        expect(itContent).not.toContain('[it] Updated value (old)');
                        // Should remove deleted paths and clean up empty parent objects
                        expect(itContent).not.toContain('remove');
                        expect(itContent).not.toContain('deleteEntire');
                        expect(itContent).not.toContain('gone');
                        expect(itContent).not.toContain('alsoGone');
                        return [2 /*return*/];
                }
            });
        }); });
        it('handles adding new nested sections with --compare-ref', function () { return __awaiter(void 0, void 0, void 0, function () {
            var translateSpy, itContent;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        // Create English source with a completely new nested section
                        fs_1.default.writeFileSync(EN_PATH, (0, dedent_1.default)("\n                const strings = {\n                    existingSection: {\n                        keep: 'Keep this existing translation',\n                    },\n                    // New nested section that doesn't exist in target file yet\n                    manualTest: {\n                        simple: 'Save',\n                        templateSimple: (name: string) => `Hello ${name}`,\n                        deepTemplate: (user: {name?: string; isAdmin: boolean}, settings: {theme: 'dark' | 'light'}) =>\n                            `${user.isAdmin ? `Admin ${user.name}: ${settings.theme === 'dark' ? 'Dark mode' : 'Light mode'}` : `User ${user.name ?? 'Unknown'}`}`,\n                        typed: (n: number): string => 'Typed output',\n                    },\n                };\n                export default strings;\n            "), 'utf8');
                        // Create existing Italian translation WITHOUT the manualTest section
                        fs_1.default.writeFileSync(IT_PATH, (0, dedent_1.default)("\n                import type en from './en';\n                const strings = {\n                    existingSection: {\n                        keep: '[it] Keep this existing translation',\n                    },\n                };\n                export default strings;\n            "), 'utf8');
                        // Mock Git.diff to show the new nested section was added
                        mockIsValidRef.mockReturnValue(true);
                        mockDiff.mockReturnValue({
                            files: [
                                {
                                    filePath: 'src/languages/en.ts',
                                    hunks: [],
                                    addedLines: new Set([6, 7, 8, 9, 10, 11, 12]), // Lines with the new manualTest section
                                    removedLines: new Set(),
                                    modifiedLines: new Set(),
                                },
                            ],
                            hasChanges: true,
                        });
                        process.argv = ['ts-node', 'generateTranslations.ts', '--dry-run', '--verbose', '--locales', 'it', '--compare-ref', 'main'];
                        translateSpy = jest.spyOn(Translator_1.default.prototype, 'translate');
                        return [4 /*yield*/, (0, generateTranslations_1.default)()];
                    case 1:
                        _a.sent();
                        itContent = fs_1.default.readFileSync(IT_PATH, 'utf8');
                        // Should preserve existing translations
                        expect(itContent).toContain('[it] Keep this existing translation');
                        // BUG: Should add the new nested translations, but currently they are missing
                        expect(itContent).toContain('manualTest: {');
                        expect(itContent).toContain('[it] Save');
                        // eslint-disable-next-line no-template-curly-in-string
                        expect(itContent).toContain('[it] Hello ${name}');
                        expect(itContent).toContain('[it] Admin');
                        expect(itContent).toContain('[it] Dark mode');
                        expect(itContent).toContain('[it] Light mode');
                        expect(itContent).toContain('[it] User');
                        expect(itContent).toContain('[it] Unknown');
                        expect(itContent).toContain('[it] Typed output');
                        // Should translate the new strings
                        expect(translateSpy).toHaveBeenCalledWith('it', 'Save', undefined);
                        // eslint-disable-next-line no-template-curly-in-string
                        expect(translateSpy).toHaveBeenCalledWith('it', 'Hello ${name}', undefined);
                        expect(translateSpy).toHaveBeenCalledWith('it', 'Typed output', undefined);
                        return [2 /*return*/];
                }
            });
        }); });
        it('handles adding new properties to existing nested structures with --compare-ref', function () { return __awaiter(void 0, void 0, void 0, function () {
            var translateSpy, itContent;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        // Create English source with existing nested structure and a new property added to it
                        fs_1.default.writeFileSync(EN_PATH, (0, dedent_1.default)("\n                const strings = {\n                    existingSection: {\n                        keep: 'Keep this existing translation',\n                    },\n                    some: {\n                        nested: {\n                            existingProp: 'Existing nested value',\n                            newPath: 'New value added to existing nested structure',\n                        },\n                    },\n                };\n                export default strings;\n            "), 'utf8');
                        // Create existing Italian translation with the nested structure but WITHOUT the new property
                        fs_1.default.writeFileSync(IT_PATH, (0, dedent_1.default)("\n                import type en from './en';\n                const strings = {\n                    existingSection: {\n                        keep: '[it] Keep this existing translation',\n                    },\n                    some: {\n                        nested: {\n                            existingProp: '[it] Existing nested value',\n                        },\n                    },\n                };\n                export default strings;\n            "), 'utf8');
                        // Mock Git.diff to show only the new property was added
                        mockIsValidRef.mockReturnValue(true);
                        mockDiff.mockReturnValue({
                            files: [
                                {
                                    filePath: 'src/languages/en.ts',
                                    hunks: [],
                                    addedLines: new Set([8]), // Line with the new property
                                    removedLines: new Set(),
                                    modifiedLines: new Set(),
                                },
                            ],
                            hasChanges: true,
                        });
                        process.argv = ['ts-node', 'generateTranslations.ts', '--dry-run', '--verbose', '--locales', 'it', '--compare-ref', 'main'];
                        translateSpy = jest.spyOn(Translator_1.default.prototype, 'translate');
                        return [4 /*yield*/, (0, generateTranslations_1.default)()];
                    case 1:
                        _a.sent();
                        itContent = fs_1.default.readFileSync(IT_PATH, 'utf8');
                        // Should preserve all existing translations
                        expect(itContent).toContain('[it] Keep this existing translation');
                        expect(itContent).toContain('[it] Existing nested value');
                        // Should add the new property to the existing nested structure
                        expect(itContent).toContain('some: {');
                        expect(itContent).toContain('nested: {');
                        expect(itContent).toContain("existingProp: '[it] Existing nested value'");
                        expect(itContent).toContain("newPath: '[it] New value added to existing nested structure'");
                        // Should only translate the new string
                        expect(translateSpy).toHaveBeenCalledTimes(1);
                        expect(translateSpy).toHaveBeenCalledWith('it', 'New value added to existing nested structure', undefined);
                        return [2 /*return*/];
                }
            });
        }); });
        it('handles modifying existing string values with --compare-ref', function () { return __awaiter(void 0, void 0, void 0, function () {
            var translateSpy, itContent;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        // Create English source with a modified string value
                        fs_1.default.writeFileSync(EN_PATH, (0, dedent_1.default)("\n                const strings = {\n                    testDrive: {\n                        modal: {\n                            helpText: 'Skip it if you dare',\n                        },\n                    },\n                };\n                export default strings;\n            "), 'utf8');
                        // Create existing Italian translation with the old value
                        fs_1.default.writeFileSync(IT_PATH, (0, dedent_1.default)("\n                import type en from './en';\n                const strings = {\n                    testDrive: {\n                        modal: {\n                            helpText: '[it] Skip',\n                        },\n                    },\n                };\n                export default strings;\n            "), 'utf8');
                        // Mock Git.diff to show the string was modified
                        mockIsValidRef.mockReturnValue(true);
                        mockDiff.mockReturnValue({
                            files: [
                                {
                                    filePath: 'src/languages/en.ts',
                                    hunks: [],
                                    addedLines: new Set(),
                                    removedLines: new Set(),
                                    modifiedLines: new Set([4]), // Line with the modified string
                                },
                            ],
                            hasChanges: true,
                        });
                        // Mock Git.show to return the old version of en.ts
                        mockShow.mockReturnValue((0, dedent_1.default)("\n                const strings = {\n                    testDrive: {\n                        modal: {\n                            helpText: 'Skip',\n                        },\n                    },\n                };\n                export default strings;\n            "));
                        process.argv = ['ts-node', 'generateTranslations.ts', '--dry-run', '--verbose', '--locales', 'it', '--compare-ref', 'main'];
                        translateSpy = jest.spyOn(Translator_1.default.prototype, 'translate');
                        return [4 /*yield*/, (0, generateTranslations_1.default)()];
                    case 1:
                        _a.sent();
                        itContent = fs_1.default.readFileSync(IT_PATH, 'utf8');
                        // Should update the modified string
                        expect(itContent).toContain('[it] Skip it if you dare');
                        // The old translation should be replaced, not preserved
                        expect(itContent).not.toContain("helpText: '[it] Skip',");
                        // Should translate the modified string
                        expect(translateSpy).toHaveBeenCalledTimes(1);
                        expect(translateSpy).toHaveBeenCalledWith('it', 'Skip it if you dare', undefined);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should handle string concatenation expressions', function () { return __awaiter(void 0, void 0, void 0, function () {
            var strings, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        strings = {
                            onboarding: {
                                tasks: {
                                    inviteTeamTask: {
                                        title: 'Simple title',
                                        description: 'First part & Second part',
                                    },
                                },
                            },
                        };
                        mockEn = strings;
                        fs_1.default.writeFileSync(EN_PATH, (0, dedent_1.default)("\n                const strings = {\n                    onboarding: {\n                        tasks: {\n                            inviteTeamTask: {\n                                title: 'Simple title',\n                                description: 'First part' + ' & ' + 'Second part',\n                            },\n                        },\n                    },\n                };\n                export default strings;\n            "), 'utf8');
                        // Create existing translation file
                        fs_1.default.writeFileSync(IT_PATH, (0, dedent_1.default)("\n                import type en from './en';\n                const strings = {\n                    onboarding: {\n                        tasks: {\n                            inviteTeamTask: {\n                                title: '[it] Simple title (old)',\n                                description: '[it] First part & Second part (old)',\n                            },\n                        },\n                    },\n                };\n                export default strings;\n            "), 'utf8');
                        process.argv = ['ts-node', 'generateTranslations.ts', '--dry-run', '--verbose', '--locales', 'it', '--paths', 'onboarding.tasks.inviteTeamTask'];
                        return [4 /*yield*/, (0, generateTranslations_1.default)()];
                    case 1:
                        _a.sent();
                        result = fs_1.default.readFileSync(IT_PATH, 'utf8');
                        // Both title and description should be translated
                        expect(result).toContain('[it] Simple title');
                        // Each part of the string concatenation should be translated individually
                        expect(result).toContain('[it] First part');
                        expect(result).toContain('[it] Second part');
                        return [2 /*return*/];
                }
            });
        }); });
        it('should handle satisfies expressions in nested objects', function () { return __awaiter(void 0, void 0, void 0, function () {
            var strings, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        strings = {
                            common: {
                                tasks: 'Tasks', // String value
                            },
                            onboarding: {
                                tasks: {
                                    createWorkspaceTask: {
                                        title: 'Create a workspace',
                                        description: 'Create a workspace to get started',
                                    },
                                },
                            },
                        };
                        mockEn = strings;
                        fs_1.default.writeFileSync(EN_PATH, (0, dedent_1.default)("\n                const strings = ".concat(JSON.stringify(strings), ";\n                export default strings;\n            ")), 'utf8');
                        // Create existing translation file with satisfies expression on nested object
                        fs_1.default.writeFileSync(IT_PATH, (0, dedent_1.default)("\n                import type en from './en';\n                const strings = {\n                    common: {\n                        tasks: '[it] Tasks',\n                    },\n                    onboarding: {\n                        tasks: {\n                            someOtherTask: {\n                                title: '[it] Some other task',\n                                description: '[it] Some other description',\n                            },\n                        } satisfies Record<string, {title: string; description: string}>,\n                    },\n                };\n                export default strings;\n            "), 'utf8');
                        // Test targeting the specific nested path
                        process.argv = ['ts-node', 'generateTranslations.ts', '--dry-run', '--verbose', '--locales', 'it', '--paths', 'onboarding.tasks.createWorkspaceTask'];
                        // This currently throws an error but should succeed
                        return [4 /*yield*/, (0, generateTranslations_1.default)()];
                    case 1:
                        // This currently throws an error but should succeed
                        _a.sent();
                        result = fs_1.default.readFileSync(IT_PATH, 'utf8');
                        expect(result).toContain('createWorkspaceTask');
                        expect(result).toContain('[it] Create a workspace');
                        expect(result).toContain('satisfies Record<'); // Should preserve the satisfies expression
                        return [2 /*return*/];
                }
            });
        }); });
        it('detects modifications when only a context annotation is added with --compare-ref', function () { return __awaiter(void 0, void 0, void 0, function () {
            var translateSpy, itContent;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        // Create English source with a context annotation on one translation
                        fs_1.default.writeFileSync(EN_PATH, (0, dedent_1.default)("\n                const strings = {\n                    unchanged: 'This stays the same',\n                    // @context as a verb, not a noun\n                    pin: 'Pin',\n                    alsoUnchanged: 'Also unchanged',\n                };\n                export default strings;\n            "), 'utf8');
                        // Create existing Italian translation without the context annotation
                        fs_1.default.writeFileSync(IT_PATH, (0, dedent_1.default)("\n                import type en from './en';\n                const strings = {\n                    unchanged: '[it] This stays the same',\n                    pin: '[it] Pin',\n                    alsoUnchanged: '[it] Also unchanged',\n                };\n                export default strings;\n            "), 'utf8');
                        // Mock git diff showing only the comment line was added (line 3)
                        mockIsValidRef.mockReturnValue(true);
                        mockDiff.mockReturnValue({
                            files: [
                                {
                                    filePath: 'src/languages/en.ts',
                                    hunks: [],
                                    addedLines: new Set([3]), // Only the context comment line
                                    removedLines: new Set(),
                                    modifiedLines: new Set(),
                                },
                            ],
                            hasChanges: true,
                        });
                        // Mock Git.show to return the old version without the context annotation
                        mockShow.mockReturnValue((0, dedent_1.default)("\n                const strings = {\n                    unchanged: 'This stays the same',\n                    pin: 'Pin',\n                    alsoUnchanged: 'Also unchanged',\n                };\n                export default strings;\n            "));
                        process.argv = ['ts-node', 'generateTranslations.ts', '--dry-run', '--verbose', '--locales', 'it', '--compare-ref', 'main'];
                        translateSpy = jest.spyOn(Translator_1.default.prototype, 'translate');
                        return [4 /*yield*/, (0, generateTranslations_1.default)()];
                    case 1:
                        _a.sent();
                        itContent = fs_1.default.readFileSync(IT_PATH, 'utf8');
                        // Should preserve unchanged translations
                        expect(itContent).toContain('[it] This stays the same');
                        expect(itContent).toContain('[it] Also unchanged');
                        // BUG: The 'pin' translation should be retranslated with the new context
                        // The translation should now include the context indicator
                        expect(itContent).toContain('[it][ctx: as a verb, not a noun] Pin');
                        // Should translate the string with the new context
                        expect(translateSpy).toHaveBeenCalledTimes(1);
                        expect(translateSpy).toHaveBeenCalledWith('it', 'Pin', 'as a verb, not a noun');
                        return [2 /*return*/];
                }
            });
        }); });
        it('detects modifications when a context annotation is changed with --compare-ref', function () { return __awaiter(void 0, void 0, void 0, function () {
            var translateSpy, itContent;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        // Create English source with a modified context annotation
                        fs_1.default.writeFileSync(EN_PATH, (0, dedent_1.default)("\n                const strings = {\n                    unchanged: 'This stays the same',\n                    // @context as a verb, not a noun\n                    pin: 'Pin',\n                    alsoUnchanged: 'Also unchanged',\n                };\n                export default strings;\n            "), 'utf8');
                        // Create existing Italian translation with the old context
                        fs_1.default.writeFileSync(IT_PATH, (0, dedent_1.default)("\n                import type en from './en';\n                const strings = {\n                    unchanged: '[it] This stays the same',\n                    // @context original context\n                    pin: '[it][ctx: original context] Pin',\n                    alsoUnchanged: '[it] Also unchanged',\n                };\n                export default strings;\n            "), 'utf8');
                        // Mock git diff showing the context comment line was modified
                        mockIsValidRef.mockReturnValue(true);
                        mockDiff.mockReturnValue({
                            files: [
                                {
                                    filePath: 'src/languages/en.ts',
                                    hunks: [],
                                    addedLines: new Set([3]), // New context comment
                                    removedLines: new Set([3]), // Old context comment on same line in old version
                                    modifiedLines: new Set(),
                                },
                            ],
                            hasChanges: true,
                        });
                        // Mock Git.show to return the old version with different context
                        mockShow.mockReturnValue((0, dedent_1.default)("\n                const strings = {\n                    unchanged: 'This stays the same',\n                    // @context original context\n                    pin: 'Pin',\n                    alsoUnchanged: 'Also unchanged',\n                };\n                export default strings;\n            "));
                        process.argv = ['ts-node', 'generateTranslations.ts', '--dry-run', '--verbose', '--locales', 'it', '--compare-ref', 'main'];
                        translateSpy = jest.spyOn(Translator_1.default.prototype, 'translate');
                        return [4 /*yield*/, (0, generateTranslations_1.default)()];
                    case 1:
                        _a.sent();
                        itContent = fs_1.default.readFileSync(IT_PATH, 'utf8');
                        // Should preserve unchanged translations
                        expect(itContent).toContain('[it] This stays the same');
                        expect(itContent).toContain('[it] Also unchanged');
                        // Should retranslate with new context
                        expect(itContent).toContain('[it][ctx: as a verb, not a noun] Pin');
                        expect(itContent).not.toContain('[it][ctx: original context] Pin');
                        // Should translate the string with the new context
                        expect(translateSpy).toHaveBeenCalledTimes(1);
                        expect(translateSpy).toHaveBeenCalledWith('it', 'Pin', 'as a verb, not a noun');
                        return [2 /*return*/];
                }
            });
        }); });
        it('detects modifications when a context annotation is removed with --compare-ref', function () { return __awaiter(void 0, void 0, void 0, function () {
            var strings, translateSpy, itContent;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        strings = {
                            unchanged: 'This stays the same',
                            pin: 'Pin',
                            alsoUnchanged: 'Also unchanged',
                        };
                        mockEn = strings;
                        // Create English source without context annotation
                        fs_1.default.writeFileSync(EN_PATH, (0, dedent_1.default)("\n                const strings = {\n                    unchanged: 'This stays the same',\n                    pin: 'Pin',\n                    alsoUnchanged: 'Also unchanged',\n                };\n                export default strings;\n            "), 'utf8');
                        // Create existing Italian translation with context
                        fs_1.default.writeFileSync(IT_PATH, (0, dedent_1.default)("\n                import type en from './en';\n                const strings = {\n                    unchanged: '[it] This stays the same',\n                    // @context as a verb, not a noun\n                    pin: '[it][ctx: as a verb, not a noun] Pin',\n                    alsoUnchanged: '[it] Also unchanged',\n                };\n                export default strings;\n            "), 'utf8');
                        // Mock git diff showing the context comment line was removed
                        mockIsValidRef.mockReturnValue(true);
                        mockDiff.mockReturnValue({
                            files: [
                                {
                                    filePath: 'src/languages/en.ts',
                                    hunks: [],
                                    addedLines: new Set(),
                                    removedLines: new Set([3]), // Context comment removed
                                    modifiedLines: new Set(),
                                },
                            ],
                            hasChanges: true,
                        });
                        // Mock Git.show to return the old version with context
                        mockShow.mockReturnValue((0, dedent_1.default)("\n                const strings = {\n                    unchanged: 'This stays the same',\n                    // @context as a verb, not a noun\n                    pin: 'Pin',\n                    alsoUnchanged: 'Also unchanged',\n                };\n                export default strings;\n            "));
                        process.argv = ['ts-node', 'generateTranslations.ts', '--dry-run', '--verbose', '--locales', 'it', '--compare-ref', 'main'];
                        translateSpy = jest.spyOn(Translator_1.default.prototype, 'translate');
                        return [4 /*yield*/, (0, generateTranslations_1.default)()];
                    case 1:
                        _a.sent();
                        itContent = fs_1.default.readFileSync(IT_PATH, 'utf8');
                        // Should preserve unchanged translations
                        expect(itContent).toContain('[it] This stays the same');
                        expect(itContent).toContain('[it] Also unchanged');
                        // Should retranslate without context (no context indicator in translation)
                        expect(itContent).toContain("pin: '[it] Pin'");
                        expect(itContent).not.toContain('[it][ctx: as a verb, not a noun] Pin');
                        // Should translate the string without context
                        expect(translateSpy).toHaveBeenCalledTimes(1);
                        expect(translateSpy).toHaveBeenCalledWith('it', 'Pin', undefined);
                        // The context comment should not be in the output
                        expect(itContent).not.toContain('// @context as a verb, not a noun');
                        return [2 /*return*/];
                }
            });
        }); });
        it('does NOT trigger retranslation when only a regular comment is added with --compare-ref', function () { return __awaiter(void 0, void 0, void 0, function () {
            var translateSpy, itContent;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        // Create English source with a regular comment
                        fs_1.default.writeFileSync(EN_PATH, (0, dedent_1.default)("\n                const strings = {\n                    unchanged: 'This stays the same',\n                    // This is just a regular comment\n                    pin: 'Pin',\n                    alsoUnchanged: 'Also unchanged',\n                };\n                export default strings;\n            "), 'utf8');
                        // Create existing Italian translation without any comment
                        fs_1.default.writeFileSync(IT_PATH, (0, dedent_1.default)("\n                import type en from './en';\n                const strings = {\n                    unchanged: '[it] This stays the same',\n                    pin: '[it] Pin (existing)',\n                    alsoUnchanged: '[it] Also unchanged',\n                };\n                export default strings;\n            "), 'utf8');
                        // Mock git diff showing only the regular comment line was added
                        mockIsValidRef.mockReturnValue(true);
                        mockDiff.mockReturnValue({
                            files: [
                                {
                                    filePath: 'src/languages/en.ts',
                                    hunks: [],
                                    addedLines: new Set([3]), // Regular comment line
                                    removedLines: new Set(),
                                    modifiedLines: new Set(),
                                },
                            ],
                            hasChanges: true,
                        });
                        // Mock Git.show to return the old version without the comment
                        mockShow.mockReturnValue((0, dedent_1.default)("\n                const strings = {\n                    unchanged: 'This stays the same',\n                    pin: 'Pin',\n                    alsoUnchanged: 'Also unchanged',\n                };\n                export default strings;\n            "));
                        process.argv = ['ts-node', 'generateTranslations.ts', '--dry-run', '--verbose', '--locales', 'it', '--compare-ref', 'main'];
                        translateSpy = jest.spyOn(Translator_1.default.prototype, 'translate');
                        return [4 /*yield*/, (0, generateTranslations_1.default)()];
                    case 1:
                        _a.sent();
                        itContent = fs_1.default.readFileSync(IT_PATH, 'utf8');
                        // Should preserve all existing translations unchanged
                        expect(itContent).toContain('[it] This stays the same');
                        expect(itContent).toContain('[it] Pin (existing)');
                        expect(itContent).toContain('[it] Also unchanged');
                        // Should NOT retranslate since it's just a regular comment
                        expect(translateSpy).not.toHaveBeenCalled();
                        return [2 /*return*/];
                }
            });
        }); });
        it('does NOT trigger retranslation when a regular comment is modified with --compare-ref', function () { return __awaiter(void 0, void 0, void 0, function () {
            var translateSpy, itContent;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        // Create English source with a modified regular comment
                        fs_1.default.writeFileSync(EN_PATH, (0, dedent_1.default)("\n                const strings = {\n                    unchanged: 'This stays the same',\n                    // TODO: update this translation later\n                    pin: 'Pin',\n                    alsoUnchanged: 'Also unchanged',\n                };\n                export default strings;\n            "), 'utf8');
                        // Create existing Italian translation with different regular comment
                        fs_1.default.writeFileSync(IT_PATH, (0, dedent_1.default)("\n                import type en from './en';\n                const strings = {\n                    unchanged: '[it] This stays the same',\n                    // TODO: fix this\n                    pin: '[it] Pin (existing)',\n                    alsoUnchanged: '[it] Also unchanged',\n                };\n                export default strings;\n            "), 'utf8');
                        // Mock git diff showing the regular comment was modified
                        mockIsValidRef.mockReturnValue(true);
                        mockDiff.mockReturnValue({
                            files: [
                                {
                                    filePath: 'src/languages/en.ts',
                                    hunks: [],
                                    addedLines: new Set([3]), // Modified comment
                                    removedLines: new Set([3]), // Old comment
                                    modifiedLines: new Set(),
                                },
                            ],
                            hasChanges: true,
                        });
                        // Mock Git.show to return the old version with old comment
                        mockShow.mockReturnValue((0, dedent_1.default)("\n                const strings = {\n                    unchanged: 'This stays the same',\n                    // TODO: fix this\n                    pin: 'Pin',\n                    alsoUnchanged: 'Also unchanged',\n                };\n                export default strings;\n            "));
                        process.argv = ['ts-node', 'generateTranslations.ts', '--dry-run', '--verbose', '--locales', 'it', '--compare-ref', 'main'];
                        translateSpy = jest.spyOn(Translator_1.default.prototype, 'translate');
                        return [4 /*yield*/, (0, generateTranslations_1.default)()];
                    case 1:
                        _a.sent();
                        itContent = fs_1.default.readFileSync(IT_PATH, 'utf8');
                        // Should preserve all existing translations unchanged
                        expect(itContent).toContain('[it] This stays the same');
                        expect(itContent).toContain('[it] Pin (existing)');
                        expect(itContent).toContain('[it] Also unchanged');
                        // Should NOT retranslate since it's just a regular comment change
                        expect(translateSpy).not.toHaveBeenCalled();
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
