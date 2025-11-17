"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var typescript_1 = require("typescript");
var TSCompilerUtils_1 = require("../../scripts/utils/TSCompilerUtils");
var dedent_1 = require("../../src/libs/StringUtils/dedent");
function createSourceFile(content) {
    return typescript_1.default.createSourceFile('test.ts', content, typescript_1.default.ScriptTarget.Latest, true);
}
function printSourceFile(sourceFile) {
    return typescript_1.default.createPrinter().printFile(sourceFile);
}
describe('TSCompilerUtils', function () {
    describe('addImport', function () {
        it('adds a default import after an existing import', function () {
            var source = createSourceFile((0, dedent_1.default)("\n                    import fs from 'fs';\n                    console.log('hello');\n                "));
            var updated = TSCompilerUtils_1.default.addImport(source, 'myModule', 'some-path');
            var output = printSourceFile(updated);
            expect(output).toBe((0, dedent_1.default)("\n                    import fs from 'fs';\n                    import myModule from \"some-path\";\n                    console.log('hello');\n                "));
        });
        it('adds a default import at the top when there are no imports', function () {
            var source = createSourceFile((0, dedent_1.default)("\n                    console.log('hello');\n                "));
            var updated = TSCompilerUtils_1.default.addImport(source, 'myModule', 'some-path');
            var output = printSourceFile(updated);
            expect(output).toBe((0, dedent_1.default)("\n                    import myModule from \"some-path\";\n                    console.log('hello');\n                "));
        });
        it('adds after multiple imports', function () {
            var source = createSourceFile((0, dedent_1.default)("\n                    import fs from 'fs';\n                    import path from 'path';\n\n                    function main() {\n                        console.log('hi');\n                    }\n                "));
            var updated = TSCompilerUtils_1.default.addImport(source, 'myModule', 'some-path');
            var output = printSourceFile(updated);
            expect(output).toBe((0, dedent_1.default)("\n                    import fs from 'fs';\n                    import path from 'path';\n                    import myModule from \"some-path\";\n                    function main() {\n                        console.log('hi');\n                    }\n                "));
        });
        it('adds to an empty file', function () {
            var source = createSourceFile("");
            var updated = TSCompilerUtils_1.default.addImport(source, 'init', './init');
            var output = printSourceFile(updated);
            expect(output).toBe((0, dedent_1.default)("\n                    import init from \"./init\";\n                "));
        });
        it('supports type-only imports', function () {
            var source = createSourceFile((0, dedent_1.default)("\n                    import fs from 'fs';\n                    console.log('hello');\n                "));
            var updated = TSCompilerUtils_1.default.addImport(source, 'MyType', 'some-path', true);
            var output = printSourceFile(updated);
            expect(output).toBe((0, dedent_1.default)("\n                    import fs from 'fs';\n                    import type MyType from \"some-path\";\n                    console.log('hello');\n                "));
        });
    });
    describe('findDefaultExport', function () {
        it('returns the identifier in `export default` statement', function () {
            var code = (0, dedent_1.default)("\n                const strings = { greeting: 'Hello' };\n                export default strings;\n            ");
            var ast = createSourceFile(code);
            var result = TSCompilerUtils_1.default.findDefaultExport(ast);
            expect(result === null || result === void 0 ? void 0 : result.getText()).toBe('strings');
        });
        it('returns the object literal if directly exported', function () {
            var code = (0, dedent_1.default)("\n                export default { farewell: 'Goodbye' };\n            ");
            var ast = createSourceFile(code);
            var result = TSCompilerUtils_1.default.findDefaultExport(ast);
            expect(result).not.toBeNull();
            if (!result) {
                return;
            }
            expect(typescript_1.default.isObjectLiteralExpression(result)).toBe(true);
            expect(result === null || result === void 0 ? void 0 : result.getText()).toContain('farewell');
        });
        it('returns null if no default export is present', function () {
            var code = (0, dedent_1.default)("\n                const foo = 'bar';\n                export const greeting = 'Hello';\n            ");
            var ast = createSourceFile(code);
            var result = TSCompilerUtils_1.default.findDefaultExport(ast);
            expect(result).toBeNull();
        });
        it('returns identifier for `export { foo as default }`', function () {
            var code = (0, dedent_1.default)("\n                const foo = { bar: 'baz' };\n                export { foo as default };\n            ");
            var ast = createSourceFile(code);
            var result = TSCompilerUtils_1.default.findDefaultExport(ast);
            expect(result === null || result === void 0 ? void 0 : result.getText()).toBe('default');
        });
    });
    describe('resolveDeclaration', function () {
        it('resolves a variable declaration', function () {
            var code = (0, dedent_1.default)("\n                const foo = { message: 'hi' };\n            ");
            var ast = createSourceFile(code);
            var node = TSCompilerUtils_1.default.resolveDeclaration('foo', ast);
            expect(node).not.toBeNull();
            if (!node) {
                return;
            }
            expect(typescript_1.default.isVariableDeclaration(node)).toBe(true);
            expect(node.getText()).toContain('message');
        });
        it('resolves a function declaration', function () {
            var code = (0, dedent_1.default)("\n                function greet() {\n                    return 'hello';\n                }\n            ");
            var ast = createSourceFile(code);
            var node = TSCompilerUtils_1.default.resolveDeclaration('greet', ast);
            expect(node).not.toBeNull();
            if (!node) {
                return;
            }
            expect(typescript_1.default.isFunctionDeclaration(node)).toBe(true);
            expect(node.getText()).toContain('hello');
        });
        it('resolves a class declaration', function () {
            var code = (0, dedent_1.default)("\n                class MyClass {\n                    method() {}\n                }\n            ");
            var ast = createSourceFile(code);
            var node = TSCompilerUtils_1.default.resolveDeclaration('MyClass', ast);
            expect(node).not.toBeNull();
            if (!node) {
                return;
            }
            expect(typescript_1.default.isClassDeclaration(node)).toBe(true);
            expect(node.getText()).toContain('method');
        });
        it('returns null for unknown identifier', function () {
            var code = (0, dedent_1.default)("\n                const foo = 123;\n            ");
            var ast = createSourceFile(code);
            var node = TSCompilerUtils_1.default.resolveDeclaration('bar', ast);
            expect(node).toBeNull();
        });
        it('returns declaration even if variable has no initializer', function () {
            var code = (0, dedent_1.default)("\n                let foo;\n            ");
            var ast = createSourceFile(code);
            var node = TSCompilerUtils_1.default.resolveDeclaration('foo', ast);
            expect(node).not.toBeNull();
            if (!node) {
                return;
            }
            expect(typescript_1.default.isVariableDeclaration(node)).toBe(true);
        });
    });
    describe('extractIdentifierFromExpression', function () {
        it('extracts identifier from simple identifier', function () {
            var code = 'translations';
            var ast = createSourceFile(code);
            var expression = ast.statements[0];
            var result = TSCompilerUtils_1.default.extractIdentifierFromExpression(expression.expression);
            expect(result).toBe('translations');
        });
        it('extracts identifier from satisfies expression', function () {
            var code = 'translations satisfies TranslationDeepObject<typeof translations>;';
            var ast = createSourceFile(code);
            var expression = ast.statements[0];
            var result = TSCompilerUtils_1.default.extractIdentifierFromExpression(expression.expression);
            expect(result).toBe('translations');
        });
        it('extracts identifier from as expression', function () {
            var code = 'translations as SomeType;';
            var ast = createSourceFile(code);
            var expression = ast.statements[0];
            var result = TSCompilerUtils_1.default.extractIdentifierFromExpression(expression.expression);
            expect(result).toBe('translations');
        });
        it('extracts identifier from parenthesized expression', function () {
            var code = '(translations);';
            var ast = createSourceFile(code);
            var expression = ast.statements[0];
            var result = TSCompilerUtils_1.default.extractIdentifierFromExpression(expression.expression);
            expect(result).toBe('translations');
        });
        it('extracts identifier from nested parenthesized expression', function () {
            var code = '((translations));';
            var ast = createSourceFile(code);
            var expression = ast.statements[0];
            var result = TSCompilerUtils_1.default.extractIdentifierFromExpression(expression.expression);
            expect(result).toBe('translations');
        });
        it('extracts identifier from type assertion (angle bracket syntax)', function () {
            var code = '<SomeType>translations;';
            var ast = createSourceFile(code);
            var expression = ast.statements[0];
            var result = TSCompilerUtils_1.default.extractIdentifierFromExpression(expression.expression);
            // Note: This might be 'translations' or null depending on how TypeScript parses angle bracket syntax in JSX-enabled contexts
            expect(result).toEqual(expect.any(String));
        });
        it('extracts identifier from complex nested expression', function () {
            var code = '(translations as SomeType);';
            var ast = createSourceFile(code);
            var expression = ast.statements[0];
            var result = TSCompilerUtils_1.default.extractIdentifierFromExpression(expression.expression);
            expect(result).toBe('translations');
        });
        it('extracts identifier from satisfies expression with nested parentheses', function () {
            var code = '(translations) satisfies TranslationDeepObject<typeof translations>;';
            var ast = createSourceFile(code);
            var expression = ast.statements[0];
            var result = TSCompilerUtils_1.default.extractIdentifierFromExpression(expression.expression);
            expect(result).toBe('translations');
        });
        it('returns null for non-identifier expressions', function () {
            var code = '"hello world";';
            var ast = createSourceFile(code);
            var expression = ast.statements[0];
            var result = TSCompilerUtils_1.default.extractIdentifierFromExpression(expression.expression);
            expect(result).toBeNull();
        });
        it('returns null for complex expressions that do not contain identifiers', function () {
            var code = '42 + 24;';
            var ast = createSourceFile(code);
            var expression = ast.statements[0];
            var result = TSCompilerUtils_1.default.extractIdentifierFromExpression(expression.expression);
            expect(result).toBeNull();
        });
        it('returns null for call expressions', function () {
            var code = 'someFunction();';
            var ast = createSourceFile(code);
            var expression = ast.statements[0];
            var result = TSCompilerUtils_1.default.extractIdentifierFromExpression(expression.expression);
            expect(result).toBeNull();
        });
        it('returns null for member expressions', function () {
            var code = 'obj.property;';
            var ast = createSourceFile(code);
            var expression = ast.statements[0];
            var result = TSCompilerUtils_1.default.extractIdentifierFromExpression(expression.expression);
            expect(result).toBeNull();
        });
        it('handles deeply nested expression types', function () {
            var code = '((translations as SomeType) satisfies AnotherType);';
            var ast = createSourceFile(code);
            var expression = ast.statements[0];
            var result = TSCompilerUtils_1.default.extractIdentifierFromExpression(expression.expression);
            expect(result).toBe('translations');
        });
    });
    describe('extractKeyFromPropertyNode', function () {
        it('extracts key from property assignment with identifier', function () {
            var code = (0, dedent_1.default)("\n                const obj = {\n                    myKey: 'value'\n                };\n            ");
            var ast = createSourceFile(code);
            var varDecl = ast.statements[0];
            var objLiteral = varDecl.declarationList.declarations[0].initializer;
            var propertyAssignment = objLiteral.properties[0];
            var result = TSCompilerUtils_1.default.extractKeyFromPropertyNode(propertyAssignment);
            expect(result).toBe('myKey');
        });
        it('extracts key from property assignment with string literal', function () {
            var code = (0, dedent_1.default)("\n                const obj = {\n                    \"myStringKey\": 'value'\n                };\n            ");
            var ast = createSourceFile(code);
            var varDecl = ast.statements[0];
            var objLiteral = varDecl.declarationList.declarations[0].initializer;
            var propertyAssignment = objLiteral.properties[0];
            var result = TSCompilerUtils_1.default.extractKeyFromPropertyNode(propertyAssignment);
            expect(result).toBe('myStringKey');
        });
        it('extracts key from method declaration', function () {
            var code = (0, dedent_1.default)("\n                const obj = {\n                    myMethod() {\n                        return 'hello';\n                    }\n                };\n            ");
            var ast = createSourceFile(code);
            var varDecl = ast.statements[0];
            var objLiteral = varDecl.declarationList.declarations[0].initializer;
            var methodDeclaration = objLiteral.properties[0];
            var result = TSCompilerUtils_1.default.extractKeyFromPropertyNode(methodDeclaration);
            expect(result).toBe('myMethod');
        });
        it('handles computed property names by returning undefined', function () {
            var code = (0, dedent_1.default)("\n                const obj = {\n                    [computedKey]: 'value'\n                };\n            ");
            var ast = createSourceFile(code);
            var varDecl = ast.statements[0];
            var objLiteral = varDecl.declarationList.declarations[0].initializer;
            var propertyAssignment = objLiteral.properties[0];
            var result = TSCompilerUtils_1.default.extractKeyFromPropertyNode(propertyAssignment);
            expect(result).toBeUndefined();
        });
        it('handles numeric literal property names by returning undefined', function () {
            var code = (0, dedent_1.default)("\n                const obj = {\n                    123: 'value'\n                };\n            ");
            var ast = createSourceFile(code);
            var varDecl = ast.statements[0];
            var objLiteral = varDecl.declarationList.declarations[0].initializer;
            var propertyAssignment = objLiteral.properties[0];
            var result = TSCompilerUtils_1.default.extractKeyFromPropertyNode(propertyAssignment);
            expect(result).toBeUndefined();
        });
        it('handles method declaration with complex name by returning undefined', function () {
            var code = (0, dedent_1.default)("\n                const obj = {\n                    [Symbol.iterator]() {\n                        return {};\n                    }\n                };\n            ");
            var ast = createSourceFile(code);
            var varDecl = ast.statements[0];
            var objLiteral = varDecl.declarationList.declarations[0].initializer;
            var methodDeclaration = objLiteral.properties[0];
            var result = TSCompilerUtils_1.default.extractKeyFromPropertyNode(methodDeclaration);
            expect(result).toBeUndefined();
        });
        it('handles arrow function property assignment', function () {
            var code = (0, dedent_1.default)("\n                const obj = {\n                    arrowFunc: () => 'hello'\n                };\n            ");
            var ast = createSourceFile(code);
            var varDecl = ast.statements[0];
            var objLiteral = varDecl.declarationList.declarations[0].initializer;
            var propertyAssignment = objLiteral.properties[0];
            var result = TSCompilerUtils_1.default.extractKeyFromPropertyNode(propertyAssignment);
            expect(result).toBe('arrowFunc');
        });
    });
    describe('addImport', function () {
        it('adds import when it does not exist', function () {
            var sourceCode = (0, dedent_1.default)("\n                const strings = {\n                    greeting: 'Hello'\n                };\n                export default strings;\n            ");
            var sourceFile = typescript_1.default.createSourceFile('test.ts', sourceCode, typescript_1.default.ScriptTarget.Latest, true);
            var result = TSCompilerUtils_1.default.addImport(sourceFile, 'en', './en', true);
            var resultCode = typescript_1.default.createPrinter().printFile(result);
            expect(resultCode).toContain('import type en from "./en";');
            expect(resultCode).toContain('const strings = {');
        });
        it('does not add duplicate import when it already exists', function () {
            var sourceCode = (0, dedent_1.default)("\n                import type en from './en';\n                const strings = {\n                    greeting: 'Hello'\n                };\n                export default strings;\n            ");
            var sourceFile = typescript_1.default.createSourceFile('test.ts', sourceCode, typescript_1.default.ScriptTarget.Latest, true);
            var result = TSCompilerUtils_1.default.addImport(sourceFile, 'en', './en', true);
            var resultCode = typescript_1.default.createPrinter().printFile(result);
            // Should not have duplicate imports
            var importMatches = resultCode.match(/import type en from/g);
            expect(importMatches).toHaveLength(1);
        });
        it('distinguishes between type and value imports', function () {
            var sourceCode = (0, dedent_1.default)("\n                import en from './en';\n                const strings = {\n                    greeting: 'Hello'\n                };\n                export default strings;\n            ");
            var sourceFile = typescript_1.default.createSourceFile('test.ts', sourceCode, typescript_1.default.ScriptTarget.Latest, true);
            var result = TSCompilerUtils_1.default.addImport(sourceFile, 'en', './en', true);
            var resultCode = typescript_1.default.createPrinter().printFile(result);
            // Should add type import even though value import exists
            expect(resultCode).toContain("import en from './en';");
            expect(resultCode).toContain('import type en from "./en";');
        });
        it('handles different module paths', function () {
            var sourceCode = (0, dedent_1.default)("\n                import type en from './other';\n                const strings = {\n                    greeting: 'Hello'\n                };\n                export default strings;\n            ");
            var sourceFile = typescript_1.default.createSourceFile('test.ts', sourceCode, typescript_1.default.ScriptTarget.Latest, true);
            var result = TSCompilerUtils_1.default.addImport(sourceFile, 'en', './en', true);
            var resultCode = typescript_1.default.createPrinter().printFile(result);
            // Should add new import with different path
            expect(resultCode).toContain("import type en from './other';");
            expect(resultCode).toContain('import type en from "./en";');
        });
    });
    describe('buildDotNotationPath', function () {
        it('builds path from nested property assignment', function () {
            var sourceCode = (0, dedent_1.default)("\n                const strings = {\n                    common: {\n                        save: 'Save'\n                    }\n                };\n            ");
            var sourceFile = typescript_1.default.createSourceFile('test.ts', sourceCode, typescript_1.default.ScriptTarget.Latest, true);
            var variableDeclaration = sourceFile.statements[0];
            if (!typescript_1.default.isVariableStatement(variableDeclaration)) {
                throw new Error('Expected variable statement');
            }
            var objectLiteral = variableDeclaration.declarationList.declarations[0].initializer;
            if (!objectLiteral || !typescript_1.default.isObjectLiteralExpression(objectLiteral)) {
                throw new Error('Expected object literal');
            }
            var commonProperty = objectLiteral.properties[0];
            if (!typescript_1.default.isPropertyAssignment(commonProperty)) {
                throw new Error('Expected property assignment');
            }
            var commonObject = commonProperty.initializer;
            if (!typescript_1.default.isObjectLiteralExpression(commonObject)) {
                throw new Error('Expected object literal');
            }
            var saveProperty = commonObject.properties[0];
            if (!typescript_1.default.isPropertyAssignment(saveProperty)) {
                throw new Error('Expected property assignment');
            }
            var saveStringLiteral = saveProperty.initializer;
            if (!typescript_1.default.isStringLiteral(saveStringLiteral)) {
                throw new Error('Expected string literal');
            }
            var result = TSCompilerUtils_1.default.buildDotNotationPath(saveStringLiteral);
            expect(result).toBe('common.save');
        });
        it('builds path from top-level property', function () {
            var sourceCode = (0, dedent_1.default)("\n                const strings = {\n                    greeting: 'Hello'\n                };\n            ");
            var sourceFile = typescript_1.default.createSourceFile('test.ts', sourceCode, typescript_1.default.ScriptTarget.Latest, true);
            var variableDeclaration = sourceFile.statements[0];
            if (!typescript_1.default.isVariableStatement(variableDeclaration)) {
                throw new Error('Expected variable statement');
            }
            var objectLiteral = variableDeclaration.declarationList.declarations[0].initializer;
            if (!objectLiteral || !typescript_1.default.isObjectLiteralExpression(objectLiteral)) {
                throw new Error('Expected object literal');
            }
            var greetingProperty = objectLiteral.properties[0];
            if (!typescript_1.default.isPropertyAssignment(greetingProperty)) {
                throw new Error('Expected property assignment');
            }
            var greetingStringLiteral = greetingProperty.initializer;
            if (!typescript_1.default.isStringLiteral(greetingStringLiteral)) {
                throw new Error('Expected string literal');
            }
            var result = TSCompilerUtils_1.default.buildDotNotationPath(greetingStringLiteral);
            expect(result).toBe('greeting');
        });
        it('builds path with custom root node', function () {
            var sourceCode = (0, dedent_1.default)("\n                const strings = {\n                    common: {\n                        save: 'Save'\n                    }\n                };\n            ");
            var sourceFile = typescript_1.default.createSourceFile('test.ts', sourceCode, typescript_1.default.ScriptTarget.Latest, true);
            var variableDeclaration = sourceFile.statements[0];
            if (!typescript_1.default.isVariableStatement(variableDeclaration)) {
                throw new Error('Expected variable statement');
            }
            var objectLiteral = variableDeclaration.declarationList.declarations[0].initializer;
            if (!objectLiteral || !typescript_1.default.isObjectLiteralExpression(objectLiteral)) {
                throw new Error('Expected object literal');
            }
            var commonProperty = objectLiteral.properties[0];
            if (!typescript_1.default.isPropertyAssignment(commonProperty)) {
                throw new Error('Expected property assignment');
            }
            var commonObject = commonProperty.initializer;
            if (!typescript_1.default.isObjectLiteralExpression(commonObject)) {
                throw new Error('Expected object literal');
            }
            var saveProperty = commonObject.properties[0];
            if (!typescript_1.default.isPropertyAssignment(saveProperty)) {
                throw new Error('Expected property assignment');
            }
            var saveStringLiteral = saveProperty.initializer;
            if (!typescript_1.default.isStringLiteral(saveStringLiteral)) {
                throw new Error('Expected string literal');
            }
            // Use commonObject as root - should only get "save", not "common.save"
            var result = TSCompilerUtils_1.default.buildDotNotationPath(saveStringLiteral, commonObject);
            expect(result).toBe('save');
        });
        it('returns null for nodes without property assignments', function () {
            var sourceCode = (0, dedent_1.default)("\n                const greeting = 'Hello';\n            ");
            var sourceFile = typescript_1.default.createSourceFile('test.ts', sourceCode, typescript_1.default.ScriptTarget.Latest, true);
            var variableDeclaration = sourceFile.statements[0];
            if (!typescript_1.default.isVariableStatement(variableDeclaration)) {
                throw new Error('Expected variable statement');
            }
            var stringLiteral = variableDeclaration.declarationList.declarations[0].initializer;
            if (!stringLiteral || !typescript_1.default.isStringLiteral(stringLiteral)) {
                throw new Error('Expected string literal');
            }
            var result = TSCompilerUtils_1.default.buildDotNotationPath(stringLiteral);
            expect(result).toBeNull();
        });
        it('handles deeply nested paths', function () {
            var sourceCode = (0, dedent_1.default)("\n                const strings = {\n                    level1: {\n                        level2: {\n                            level3: {\n                                deep: 'Deep value'\n                            }\n                        }\n                    }\n                };\n            ");
            var sourceFile = typescript_1.default.createSourceFile('test.ts', sourceCode, typescript_1.default.ScriptTarget.Latest, true);
            // Navigate to the deeply nested string literal with proper type checking
            var variableDeclaration = sourceFile.statements[0];
            if (!typescript_1.default.isVariableStatement(variableDeclaration)) {
                throw new Error('Expected variable statement');
            }
            var objectLiteral = variableDeclaration.declarationList.declarations[0].initializer;
            if (!objectLiteral || !typescript_1.default.isObjectLiteralExpression(objectLiteral)) {
                throw new Error('Expected object literal');
            }
            var level1Property = objectLiteral.properties[0];
            if (!typescript_1.default.isPropertyAssignment(level1Property)) {
                throw new Error('Expected property assignment');
            }
            var level1Object = level1Property.initializer;
            if (!typescript_1.default.isObjectLiteralExpression(level1Object)) {
                throw new Error('Expected object literal');
            }
            var level2Property = level1Object.properties[0];
            if (!typescript_1.default.isPropertyAssignment(level2Property)) {
                throw new Error('Expected property assignment');
            }
            var level2Object = level2Property.initializer;
            if (!typescript_1.default.isObjectLiteralExpression(level2Object)) {
                throw new Error('Expected object literal');
            }
            var level3Property = level2Object.properties[0];
            if (!typescript_1.default.isPropertyAssignment(level3Property)) {
                throw new Error('Expected property assignment');
            }
            var level3Object = level3Property.initializer;
            if (!typescript_1.default.isObjectLiteralExpression(level3Object)) {
                throw new Error('Expected object literal');
            }
            var deepProperty = level3Object.properties[0];
            if (!typescript_1.default.isPropertyAssignment(deepProperty)) {
                throw new Error('Expected property assignment');
            }
            var deepStringLiteral = deepProperty.initializer;
            if (!typescript_1.default.isStringLiteral(deepStringLiteral)) {
                throw new Error('Expected string literal');
            }
            var result = TSCompilerUtils_1.default.buildDotNotationPath(deepStringLiteral);
            expect(result).toBe('level1.level2.level3.deep');
        });
    });
    describe('parseCodeStringToExpression', function () {
        it('parses simple string literal', function () {
            var result = TSCompilerUtils_1.default.parseCodeStringToAST('"Hello World"');
            expect(typescript_1.default.isStringLiteral(result)).toBe(true);
            if (typescript_1.default.isStringLiteral(result)) {
                expect(result.text).toBe('Hello World');
            }
        });
        it('parses template literal', function () {
            // eslint-disable-next-line no-template-curly-in-string
            var result = TSCompilerUtils_1.default.parseCodeStringToAST('`Hello ${name}`');
            expect(typescript_1.default.isTemplateExpression(result)).toBe(true);
        });
        it('parses complex expression', function () {
            var result = TSCompilerUtils_1.default.parseCodeStringToAST('user.name ?? "Unknown"');
            expect(typescript_1.default.isBinaryExpression(result)).toBe(true);
        });
        it('parses arrow function', function () {
            // eslint-disable-next-line no-template-curly-in-string
            var result = TSCompilerUtils_1.default.parseCodeStringToAST('(name: string) => `Hello ${name}`');
            expect(typescript_1.default.isArrowFunction(result)).toBe(true);
        });
        it('throws error for malformed code string', function () {
            expect(function () {
                TSCompilerUtils_1.default.parseCodeStringToAST('invalid syntax {');
            }).toThrow('Malformed code string');
        });
        it('throws error for empty code string', function () {
            expect(function () {
                TSCompilerUtils_1.default.parseCodeStringToAST('/* just a comment */');
            }).toThrow('Malformed code string');
        });
    });
    describe('createPathAwareVisitor', function () {
        it('should create visitor that builds correct paths for property assignments', function () {
            var sourceCode = (0, dedent_1.default)("\n                const strings = {\n                    greeting: 'Hello',\n                    common: {\n                        save: 'Save'\n                    }\n                };\n            ");
            var sourceFile = typescript_1.default.createSourceFile('test.ts', sourceCode, typescript_1.default.ScriptTarget.Latest, true);
            var variableStatement = sourceFile.statements[0];
            if (!typescript_1.default.isVariableStatement(variableStatement)) {
                throw new Error('Expected variable statement');
            }
            var objectLiteral = variableStatement.declarationList.declarations[0].initializer;
            if (!objectLiteral || !typescript_1.default.isObjectLiteralExpression(objectLiteral)) {
                throw new Error('Expected object literal');
            }
            var visitedPaths = [];
            var visitor = TSCompilerUtils_1.default.createPathAwareVisitor(function (node, path) {
                if (typescript_1.default.isPropertyAssignment(node)) {
                    visitedPaths.push(path);
                }
                return node;
            }, '');
            // Use the visitor with ts.visitEachChild
            // @ts-expect-error nullTransformationContext exists but isn't a public API
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
            typescript_1.default.visitEachChild(objectLiteral, visitor, typescript_1.default.nullTransformationContext);
            expect(visitedPaths).toContain('greeting');
            expect(visitedPaths).toContain('common');
        });
        it('should handle nested paths correctly', function () {
            var sourceCode = (0, dedent_1.default)("\n                const strings = {\n                    common: {\n                        save: 'Save',\n                        cancel: 'Cancel'\n                    }\n                };\n            ");
            var sourceFile = typescript_1.default.createSourceFile('test.ts', sourceCode, typescript_1.default.ScriptTarget.Latest, true);
            var variableStatement = sourceFile.statements[0];
            if (!typescript_1.default.isVariableStatement(variableStatement)) {
                throw new Error('Expected variable statement');
            }
            var objectLiteral = variableStatement.declarationList.declarations[0].initializer;
            if (!objectLiteral || !typescript_1.default.isObjectLiteralExpression(objectLiteral)) {
                throw new Error('Expected object literal');
            }
            var commonProperty = objectLiteral.properties[0];
            if (!typescript_1.default.isPropertyAssignment(commonProperty)) {
                throw new Error('Expected property assignment');
            }
            var commonObject = commonProperty.initializer;
            if (!typescript_1.default.isObjectLiteralExpression(commonObject)) {
                throw new Error('Expected object literal');
            }
            var visitedPaths = [];
            var visitor = TSCompilerUtils_1.default.createPathAwareVisitor(function (node, path) {
                if (typescript_1.default.isPropertyAssignment(node)) {
                    visitedPaths.push(path);
                }
                return node;
            }, 'common');
            // @ts-expect-error nullTransformationContext exists but isn't a public API
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
            typescript_1.default.visitEachChild(commonObject, visitor, typescript_1.default.nullTransformationContext);
            expect(visitedPaths).toContain('common.save');
            expect(visitedPaths).toContain('common.cancel');
        });
        it('should work with forEachChild for non-transforming traversal', function () {
            var sourceCode = (0, dedent_1.default)("\n                const strings = {\n                    greeting: 'Hello',\n                    farewell: 'Goodbye'\n                };\n            ");
            var sourceFile = typescript_1.default.createSourceFile('test.ts', sourceCode, typescript_1.default.ScriptTarget.Latest, true);
            var variableStatement = sourceFile.statements[0];
            if (!typescript_1.default.isVariableStatement(variableStatement)) {
                throw new Error('Expected variable statement');
            }
            var objectLiteral = variableStatement.declarationList.declarations[0].initializer;
            if (!objectLiteral || !typescript_1.default.isObjectLiteralExpression(objectLiteral)) {
                throw new Error('Expected object literal');
            }
            var visitedPaths = [];
            var visitor = TSCompilerUtils_1.default.createPathAwareVisitor(function (node, path) {
                if (!typescript_1.default.isPropertyAssignment(node)) {
                    return;
                }
                visitedPaths.push(path);
            }, '');
            // Use the same visitor with forEachChild - should visit both properties
            objectLiteral.forEachChild(visitor);
            expect(visitedPaths).toHaveLength(2);
            expect(visitedPaths).toContain('greeting');
            expect(visitedPaths).toContain('farewell');
        });
    });
    describe('objectHas', function () {
        it('returns true for top-level property that exists', function () {
            var source = createSourceFile((0, dedent_1.default)("\n                    const obj = {\n                        greeting: 'Hello',\n                        farewell: 'Goodbye',\n                    };\n                "));
            // Find the object literal
            var objectLiteral = findObjectLiteral(source);
            expect(TSCompilerUtils_1.default.objectHas(objectLiteral, 'greeting')).toBe(true);
            expect(TSCompilerUtils_1.default.objectHas(objectLiteral, 'farewell')).toBe(true);
        });
        it('returns false for top-level property that does not exist', function () {
            var source = createSourceFile((0, dedent_1.default)("\n                    const obj = {\n                        greeting: 'Hello',\n                        farewell: 'Goodbye',\n                    };\n                "));
            var objectLiteral = findObjectLiteral(source);
            expect(TSCompilerUtils_1.default.objectHas(objectLiteral, 'nonexistent')).toBe(false);
        });
        it('returns true for nested property that exists', function () {
            var source = createSourceFile((0, dedent_1.default)("\n                    const obj = {\n                        common: {\n                            save: 'Save',\n                            cancel: 'Cancel',\n                        },\n                        errors: {\n                            generic: 'An error occurred',\n                        },\n                    };\n                "));
            var objectLiteral = findObjectLiteral(source);
            expect(TSCompilerUtils_1.default.objectHas(objectLiteral, 'common.save')).toBe(true);
            expect(TSCompilerUtils_1.default.objectHas(objectLiteral, 'common.cancel')).toBe(true);
            expect(TSCompilerUtils_1.default.objectHas(objectLiteral, 'errors.generic')).toBe(true);
        });
        it('returns false for nested property that does not exist', function () {
            var source = createSourceFile((0, dedent_1.default)("\n                    const obj = {\n                        common: {\n                            save: 'Save',\n                            cancel: 'Cancel',\n                        },\n                        errors: {\n                            generic: 'An error occurred',\n                        },\n                    };\n                "));
            var objectLiteral = findObjectLiteral(source);
            expect(TSCompilerUtils_1.default.objectHas(objectLiteral, 'common.nonexistent')).toBe(false);
            expect(TSCompilerUtils_1.default.objectHas(objectLiteral, 'nonexistent.save')).toBe(false);
            expect(TSCompilerUtils_1.default.objectHas(objectLiteral, 'errors.nonexistent')).toBe(false);
        });
        it('returns false when trying to traverse into a non-object property', function () {
            var source = createSourceFile((0, dedent_1.default)("\n                    const obj = {\n                        greeting: 'Hello',\n                        common: {\n                            save: 'Save',\n                        },\n                    };\n                "));
            var objectLiteral = findObjectLiteral(source);
            // 'greeting' is a string, not an object, so 'greeting.something' should return false
            expect(TSCompilerUtils_1.default.objectHas(objectLiteral, 'greeting.something')).toBe(false);
        });
        it('returns true for deeply nested properties', function () {
            var source = createSourceFile((0, dedent_1.default)("\n                    const obj = {\n                        level1: {\n                            level2: {\n                                level3: {\n                                    deepProperty: 'Deep value',\n                                },\n                            },\n                        },\n                    };\n                "));
            var objectLiteral = findObjectLiteral(source);
            expect(TSCompilerUtils_1.default.objectHas(objectLiteral, 'level1.level2.level3.deepProperty')).toBe(true);
        });
        it('returns false for partially correct deeply nested paths', function () {
            var source = createSourceFile((0, dedent_1.default)("\n                    const obj = {\n                        level1: {\n                            level2: {\n                                level3: {\n                                    deepProperty: 'Deep value',\n                                },\n                            },\n                        },\n                    };\n                "));
            var objectLiteral = findObjectLiteral(source);
            expect(TSCompilerUtils_1.default.objectHas(objectLiteral, 'level1.level2.level3.wrongProperty')).toBe(false);
            expect(TSCompilerUtils_1.default.objectHas(objectLiteral, 'level1.level2.wrongLevel.deepProperty')).toBe(false);
        });
        it('handles empty object', function () {
            var source = createSourceFile((0, dedent_1.default)("\n                    const obj = {};\n                "));
            var objectLiteral = findObjectLiteral(source);
            expect(TSCompilerUtils_1.default.objectHas(objectLiteral, 'anything')).toBe(false);
        });
        // Helper function to find the first object literal in a source file
        function findObjectLiteral(sourceFile) {
            var objectLiteral;
            function visit(node) {
                if (typescript_1.default.isObjectLiteralExpression(node) && !objectLiteral) {
                    objectLiteral = node;
                    return;
                }
                typescript_1.default.forEachChild(node, visit);
            }
            visit(sourceFile);
            if (!objectLiteral) {
                throw new Error('No object literal found in source file');
            }
            return objectLiteral;
        }
    });
    describe('injectDeepObjectValue', function () {
        it('should inject value into basic nested structure', function () {
            // Start with empty object
            var objectLiteral = typescript_1.default.factory.createObjectLiteralExpression([]);
            // Create a final value
            var finalValue = typescript_1.default.factory.createStringLiteral('test value');
            // Add nested path
            var updatedObject = TSCompilerUtils_1.default.injectDeepObjectValue(objectLiteral, 'test.nested', finalValue);
            // Verify structure was created
            expect(updatedObject.properties).toHaveLength(1);
            var testProp = updatedObject.properties.at(0);
            expect(typescript_1.default.isPropertyAssignment(testProp)).toBe(true);
            expect(testProp.name.text).toBe('test');
            var testValue = testProp.initializer;
            expect(typescript_1.default.isObjectLiteralExpression(testValue)).toBe(true);
            expect(testValue.properties).toHaveLength(1);
            var nestedProp = testValue.properties[0];
            expect(nestedProp.name.text).toBe('nested');
            expect(typescript_1.default.isStringLiteral(nestedProp.initializer)).toBe(true);
            expect(nestedProp.initializer.text).toBe('test value');
        });
        it('should throw error when trying to inject into non-object property', function () {
            // Start with existing property that's not an object
            var existingProperty = typescript_1.default.factory.createPropertyAssignment('existing', typescript_1.default.factory.createStringLiteral('value'));
            var objectLiteral = typescript_1.default.factory.createObjectLiteralExpression([existingProperty]);
            var finalValue = typescript_1.default.factory.createStringLiteral('new value');
            // Try to add nested path under a non-object property
            expect(function () {
                TSCompilerUtils_1.default.injectDeepObjectValue(objectLiteral, 'existing.nested', finalValue);
            }).toThrow('Cannot inject into path "existing.nested": property "existing" exists but is not an object');
        });
        it('should inject into existing nested object structure', function () {
            // Start with existing nested structure
            var nestedObj = typescript_1.default.factory.createObjectLiteralExpression([typescript_1.default.factory.createPropertyAssignment('existingNested', typescript_1.default.factory.createStringLiteral('existing value'))]);
            var existingProperty = typescript_1.default.factory.createPropertyAssignment('existing', nestedObj);
            var objectLiteral = typescript_1.default.factory.createObjectLiteralExpression([existingProperty]);
            var finalValue = typescript_1.default.factory.createStringLiteral('new value');
            // Add new path under existing structure
            var updatedObject = TSCompilerUtils_1.default.injectDeepObjectValue(objectLiteral, 'existing.newNested', finalValue);
            // Should preserve existing structure and add new value
            expect(updatedObject.properties).toHaveLength(1);
            var updatedProperty = updatedObject.properties.at(0);
            expect(updatedProperty.name.text).toBe('existing');
            var updatedNestedObj = updatedProperty.initializer;
            expect(updatedNestedObj.properties).toHaveLength(2);
            // Check existing property is preserved
            var existingNestedProp = updatedNestedObj.properties.find(function (prop) { return typescript_1.default.isPropertyAssignment(prop) && typescript_1.default.isIdentifier(prop.name) && prop.name.text === 'existingNested'; });
            expect(existingNestedProp).toBeDefined();
            expect(existingNestedProp.initializer.text).toBe('existing value');
            // Check new property was added
            var newNestedProp = updatedNestedObj.properties.find(function (prop) { return typescript_1.default.isPropertyAssignment(prop) && typescript_1.default.isIdentifier(prop.name) && prop.name.text === 'newNested'; });
            expect(newNestedProp).toBeDefined();
            expect(newNestedProp.initializer.text).toBe('new value');
        });
        it('should replace existing value when path points to existing property', function () {
            // Start with existing nested structure
            var existingProperty = typescript_1.default.factory.createPropertyAssignment('existing', typescript_1.default.factory.createStringLiteral('old value'));
            var objectLiteral = typescript_1.default.factory.createObjectLiteralExpression([existingProperty]);
            var newValue = typescript_1.default.factory.createStringLiteral('new value');
            // Replace existing value
            var updatedObject = TSCompilerUtils_1.default.injectDeepObjectValue(objectLiteral, 'existing', newValue);
            // Should replace the existing value
            expect(updatedObject.properties).toHaveLength(1);
            var updatedProperty = updatedObject.properties.at(0);
            expect(updatedProperty.name.text).toBe('existing');
            expect(updatedProperty.initializer.text).toBe('new value');
        });
        it('should handle single-level paths', function () {
            var objectLiteral = typescript_1.default.factory.createObjectLiteralExpression([]);
            var finalValue = typescript_1.default.factory.createStringLiteral('single value');
            var updatedObject = TSCompilerUtils_1.default.injectDeepObjectValue(objectLiteral, 'single', finalValue);
            expect(updatedObject.properties).toHaveLength(1);
            var prop = updatedObject.properties.at(0);
            expect(prop.name.text).toBe('single');
            expect(typescript_1.default.isStringLiteral(prop.initializer)).toBe(true);
            expect(prop.initializer.text).toBe('single value');
        });
        it('should handle deep nested paths', function () {
            var objectLiteral = typescript_1.default.factory.createObjectLiteralExpression([]);
            var finalValue = typescript_1.default.factory.createStringLiteral('deep value');
            var updatedObject = TSCompilerUtils_1.default.injectDeepObjectValue(objectLiteral, 'a.b.c.d', finalValue);
            expect(updatedObject.properties).toHaveLength(1);
            // Navigate down the nested structure
            var aProp = updatedObject.properties.at(0);
            expect(aProp.name.text).toBe('a');
            var bObj = aProp.initializer;
            var bProp = bObj.properties[0];
            expect(bProp.name.text).toBe('b');
            var cObj = bProp.initializer;
            var cProp = cObj.properties[0];
            expect(cProp.name.text).toBe('c');
            var dObj = cProp.initializer;
            var dProp = dObj.properties[0];
            expect(dProp.name.text).toBe('d');
            expect(typescript_1.default.isStringLiteral(dProp.initializer)).toBe(true);
            expect(dProp.initializer.text).toBe('deep value');
        });
        it('should preserve existing properties when adding new ones', function () {
            // Start with multiple existing properties
            var existingProps = [
                typescript_1.default.factory.createPropertyAssignment('first', typescript_1.default.factory.createStringLiteral('first value')),
                typescript_1.default.factory.createPropertyAssignment('second', typescript_1.default.factory.createStringLiteral('second value')),
            ];
            var objectLiteral = typescript_1.default.factory.createObjectLiteralExpression(existingProps);
            var finalValue = typescript_1.default.factory.createStringLiteral('new nested value');
            var updatedObject = TSCompilerUtils_1.default.injectDeepObjectValue(objectLiteral, 'newSection.nested', finalValue);
            // Should have all original properties plus the new one
            expect(updatedObject.properties).toHaveLength(3);
            // Check that existing properties are preserved
            expect(updatedObject.properties.at(0)).toBe(existingProps.at(0));
            expect(updatedObject.properties.at(1)).toBe(existingProps.at(1));
            // Check the new nested property
            var newProp = updatedObject.properties.at(2);
            expect(newProp.name.text).toBe('newSection');
            var nestedObj = newProp.initializer;
            var nestedProp = nestedObj.properties[0];
            expect(nestedProp.name.text).toBe('nested');
            expect(nestedProp.initializer.text).toBe('new nested value');
        });
        it('should handle complex expressions as final values', function () {
            var objectLiteral = typescript_1.default.factory.createObjectLiteralExpression([]);
            // Create a template literal expression
            var finalValue = typescript_1.default.factory.createTemplateExpression(typescript_1.default.factory.createTemplateHead('Hello '), [
                typescript_1.default.factory.createTemplateSpan(typescript_1.default.factory.createIdentifier('name'), typescript_1.default.factory.createTemplateTail('!')),
            ]);
            var updatedObject = TSCompilerUtils_1.default.injectDeepObjectValue(objectLiteral, 'test.greeting', finalValue);
            expect(updatedObject.properties).toHaveLength(1);
            var testProp = updatedObject.properties.at(0);
            var testObj = testProp.initializer;
            var greetingProp = testObj.properties[0];
            expect(typescript_1.default.isTemplateExpression(greetingProp.initializer)).toBe(true);
        });
        it('should handle arrow function expressions as final values', function () {
            var objectLiteral = typescript_1.default.factory.createObjectLiteralExpression([]);
            // Create an arrow function expression
            var finalValue = typescript_1.default.factory.createArrowFunction(undefined, undefined, [typescript_1.default.factory.createParameterDeclaration(undefined, undefined, 'name')], undefined, typescript_1.default.factory.createToken(typescript_1.default.SyntaxKind.EqualsGreaterThanToken), typescript_1.default.factory.createStringLiteral('Hello'));
            var updatedObject = TSCompilerUtils_1.default.injectDeepObjectValue(objectLiteral, 'test.func', finalValue);
            expect(updatedObject.properties).toHaveLength(1);
            var testProp = updatedObject.properties.at(0);
            var testObj = testProp.initializer;
            var funcProp = testObj.properties[0];
            expect(typescript_1.default.isArrowFunction(funcProp.initializer)).toBe(true);
        });
        it('should throw error for empty path', function () {
            var existingProperty = typescript_1.default.factory.createPropertyAssignment('existing', typescript_1.default.factory.createStringLiteral('value'));
            var objectLiteral = typescript_1.default.factory.createObjectLiteralExpression([existingProperty]);
            var finalValue = typescript_1.default.factory.createStringLiteral('ignored');
            expect(function () {
                TSCompilerUtils_1.default.injectDeepObjectValue(objectLiteral, '', finalValue);
            }).toThrow('Invalid path: empty path provided');
        });
        it('should throw error for paths with empty parts', function () {
            var objectLiteral = typescript_1.default.factory.createObjectLiteralExpression([]);
            var finalValue = typescript_1.default.factory.createStringLiteral('test value');
            // Path with empty part (double dot) should throw error
            expect(function () {
                TSCompilerUtils_1.default.injectDeepObjectValue(objectLiteral, 'test..nested', finalValue);
            }).toThrow('Invalid path: empty key found in path "test..nested"');
        });
        it('should throw error for paths starting with dot', function () {
            var objectLiteral = typescript_1.default.factory.createObjectLiteralExpression([]);
            var finalValue = typescript_1.default.factory.createStringLiteral('test value');
            // Path starting with dot should throw error
            expect(function () {
                TSCompilerUtils_1.default.injectDeepObjectValue(objectLiteral, '.test.nested', finalValue);
            }).toThrow('Invalid path: empty key found in path ".test.nested"');
        });
        it('should handle numeric-like property names', function () {
            var objectLiteral = typescript_1.default.factory.createObjectLiteralExpression([]);
            var finalValue = typescript_1.default.factory.createStringLiteral('numeric value');
            var updatedObject = TSCompilerUtils_1.default.injectDeepObjectValue(objectLiteral, '123.456', finalValue);
            expect(updatedObject.properties).toHaveLength(1);
            var numericProp = updatedObject.properties.at(0);
            expect(numericProp.name.text).toBe('123');
            var nestedObj = numericProp.initializer;
            var nestedProp = nestedObj.properties[0];
            expect(nestedProp.name.text).toBe('456');
            expect(nestedProp.initializer.text).toBe('numeric value');
        });
        it('should handle satisfies expressions in nested objects', function () {
            // Create object: { tasks: { existing: 'value' } satisfies Record<string, string> }
            var satisfiesExpr = typescript_1.default.factory.createSatisfiesExpression(typescript_1.default.factory.createObjectLiteralExpression([typescript_1.default.factory.createPropertyAssignment(typescript_1.default.factory.createIdentifier('existing'), typescript_1.default.factory.createStringLiteral('value'))]), typescript_1.default.factory.createTypeReferenceNode(typescript_1.default.factory.createIdentifier('Record'), [
                typescript_1.default.factory.createKeywordTypeNode(typescript_1.default.SyntaxKind.StringKeyword),
                typescript_1.default.factory.createKeywordTypeNode(typescript_1.default.SyntaxKind.StringKeyword),
            ]));
            var objectLiteral = typescript_1.default.factory.createObjectLiteralExpression([typescript_1.default.factory.createPropertyAssignment(typescript_1.default.factory.createIdentifier('tasks'), satisfiesExpr)]);
            var newValue = typescript_1.default.factory.createStringLiteral('new value');
            var updatedObject = TSCompilerUtils_1.default.injectDeepObjectValue(objectLiteral, 'tasks.newKey', newValue);
            // Verify satisfies expression is preserved
            var tasksProp = updatedObject.properties[0];
            expect(typescript_1.default.isSatisfiesExpression(tasksProp.initializer)).toBe(true);
            // Verify both existing and new properties exist
            var tasksObj = tasksProp.initializer.expression;
            expect(tasksObj.properties).toHaveLength(2);
        });
        it('should replace existing values in satisfies expressions', function () {
            // Create object: { nested: { existingKey: 'old value' } satisfies Record<string, string> }
            var satisfiesExpr = typescript_1.default.factory.createSatisfiesExpression(typescript_1.default.factory.createObjectLiteralExpression([typescript_1.default.factory.createPropertyAssignment(typescript_1.default.factory.createIdentifier('existingKey'), typescript_1.default.factory.createStringLiteral('old value'))]), typescript_1.default.factory.createTypeReferenceNode(typescript_1.default.factory.createIdentifier('Record'), [
                typescript_1.default.factory.createKeywordTypeNode(typescript_1.default.SyntaxKind.StringKeyword),
                typescript_1.default.factory.createKeywordTypeNode(typescript_1.default.SyntaxKind.StringKeyword),
            ]));
            var objectLiteral = typescript_1.default.factory.createObjectLiteralExpression([typescript_1.default.factory.createPropertyAssignment(typescript_1.default.factory.createIdentifier('nested'), satisfiesExpr)]);
            var newValue = typescript_1.default.factory.createStringLiteral('new value');
            var updatedObject = TSCompilerUtils_1.default.injectDeepObjectValue(objectLiteral, 'nested.existingKey', newValue);
            // Verify satisfies expression is preserved and value is replaced
            var nestedProp = updatedObject.properties[0];
            expect(typescript_1.default.isSatisfiesExpression(nestedProp.initializer)).toBe(true);
            var nestedObj = nestedProp.initializer.expression;
            var existingKeyProp = nestedObj.properties[0];
            expect(existingKeyProp.initializer.text).toBe('new value');
        });
    });
    describe('isStringConcatenationChain', function () {
        it('should return true for simple string concatenation', function () {
            // 'hello' + 'world'
            var binaryExpr = typescript_1.default.factory.createBinaryExpression(typescript_1.default.factory.createStringLiteral('hello'), typescript_1.default.SyntaxKind.PlusToken, typescript_1.default.factory.createStringLiteral('world'));
            expect(TSCompilerUtils_1.default.isStringConcatenationChain(binaryExpr)).toBe(true);
        });
        it('should return true for string + template literal', function () {
            // 'hello' + `world`
            var binaryExpr = typescript_1.default.factory.createBinaryExpression(typescript_1.default.factory.createStringLiteral('hello'), typescript_1.default.SyntaxKind.PlusToken, typescript_1.default.factory.createNoSubstitutionTemplateLiteral('world'));
            expect(TSCompilerUtils_1.default.isStringConcatenationChain(binaryExpr)).toBe(true);
        });
        it('should return true for template literal + string', function () {
            // `hello` + 'world'
            var binaryExpr = typescript_1.default.factory.createBinaryExpression(typescript_1.default.factory.createNoSubstitutionTemplateLiteral('hello'), typescript_1.default.SyntaxKind.PlusToken, typescript_1.default.factory.createStringLiteral('world'));
            expect(TSCompilerUtils_1.default.isStringConcatenationChain(binaryExpr)).toBe(true);
        });
        it('should return true for complex string concatenation chain', function () {
            // 'a' + 'b' + 'c'
            var innerBinary = typescript_1.default.factory.createBinaryExpression(typescript_1.default.factory.createStringLiteral('a'), typescript_1.default.SyntaxKind.PlusToken, typescript_1.default.factory.createStringLiteral('b'));
            var outerBinary = typescript_1.default.factory.createBinaryExpression(innerBinary, typescript_1.default.SyntaxKind.PlusToken, typescript_1.default.factory.createStringLiteral('c'));
            expect(TSCompilerUtils_1.default.isStringConcatenationChain(outerBinary)).toBe(true);
        });
        it('should return true for left-nested string concatenation', function () {
            // ('a' + 'b') + variable
            var leftBinary = typescript_1.default.factory.createBinaryExpression(typescript_1.default.factory.createStringLiteral('a'), typescript_1.default.SyntaxKind.PlusToken, typescript_1.default.factory.createStringLiteral('b'));
            var outerBinary = typescript_1.default.factory.createBinaryExpression(leftBinary, typescript_1.default.SyntaxKind.PlusToken, typescript_1.default.factory.createIdentifier('variable'));
            expect(TSCompilerUtils_1.default.isStringConcatenationChain(outerBinary)).toBe(true);
        });
        it('should return false for variable + string concatenation (ambiguous)', function () {
            // variable + ('a' + 'b') - could be numeric or string, so should return false
            var rightBinary = typescript_1.default.factory.createBinaryExpression(typescript_1.default.factory.createStringLiteral('a'), typescript_1.default.SyntaxKind.PlusToken, typescript_1.default.factory.createStringLiteral('b'));
            var outerBinary = typescript_1.default.factory.createBinaryExpression(typescript_1.default.factory.createIdentifier('variable'), typescript_1.default.SyntaxKind.PlusToken, rightBinary);
            expect(TSCompilerUtils_1.default.isStringConcatenationChain(outerBinary)).toBe(false);
        });
        it('should return true for string + variable concatenation', function () {
            // 'hello' + variable - definitely string concatenation
            var binaryExpr = typescript_1.default.factory.createBinaryExpression(typescript_1.default.factory.createStringLiteral('hello'), typescript_1.default.SyntaxKind.PlusToken, typescript_1.default.factory.createIdentifier('variable'));
            expect(TSCompilerUtils_1.default.isStringConcatenationChain(binaryExpr)).toBe(true);
        });
        it('should return false for numeric addition', function () {
            // 1 + 2
            var binaryExpr = typescript_1.default.factory.createBinaryExpression(typescript_1.default.factory.createNumericLiteral('1'), typescript_1.default.SyntaxKind.PlusToken, typescript_1.default.factory.createNumericLiteral('2'));
            expect(TSCompilerUtils_1.default.isStringConcatenationChain(binaryExpr)).toBe(false);
        });
        it('should return false for variable addition', function () {
            // a + b
            var binaryExpr = typescript_1.default.factory.createBinaryExpression(typescript_1.default.factory.createIdentifier('a'), typescript_1.default.SyntaxKind.PlusToken, typescript_1.default.factory.createIdentifier('b'));
            expect(TSCompilerUtils_1.default.isStringConcatenationChain(binaryExpr)).toBe(false);
        });
        it('should return false for non-plus operators', function () {
            // 'hello' - 'world'
            var binaryExpr = typescript_1.default.factory.createBinaryExpression(typescript_1.default.factory.createStringLiteral('hello'), typescript_1.default.SyntaxKind.MinusToken, typescript_1.default.factory.createStringLiteral('world'));
            expect(TSCompilerUtils_1.default.isStringConcatenationChain(binaryExpr)).toBe(false);
        });
        it('should return true for template expressions with substitutions', function () {
            // 'hello' + `world ${variable}`
            var templateExpr = typescript_1.default.factory.createTemplateExpression(typescript_1.default.factory.createTemplateHead('world '), [
                typescript_1.default.factory.createTemplateSpan(typescript_1.default.factory.createIdentifier('variable'), typescript_1.default.factory.createTemplateTail('')),
            ]);
            var binaryExpr = typescript_1.default.factory.createBinaryExpression(typescript_1.default.factory.createStringLiteral('hello'), typescript_1.default.SyntaxKind.PlusToken, templateExpr);
            expect(TSCompilerUtils_1.default.isStringConcatenationChain(binaryExpr)).toBe(true);
        });
        it('should return false for complex nested non-string expressions', function () {
            // (a + b) + (c + d) where all are variables
            var leftBinary = typescript_1.default.factory.createBinaryExpression(typescript_1.default.factory.createIdentifier('a'), typescript_1.default.SyntaxKind.PlusToken, typescript_1.default.factory.createIdentifier('b'));
            var rightBinary = typescript_1.default.factory.createBinaryExpression(typescript_1.default.factory.createIdentifier('c'), typescript_1.default.SyntaxKind.PlusToken, typescript_1.default.factory.createIdentifier('d'));
            var outerBinary = typescript_1.default.factory.createBinaryExpression(leftBinary, typescript_1.default.SyntaxKind.PlusToken, rightBinary);
            expect(TSCompilerUtils_1.default.isStringConcatenationChain(outerBinary)).toBe(false);
        });
    });
});
