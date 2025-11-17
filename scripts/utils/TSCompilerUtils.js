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
exports.TransformerAction = void 0;
var typescript_1 = require("typescript");
/**
 * Actions that can be taken when visiting a node in a transformer.
 */
var TransformerAction;
(function (TransformerAction) {
    /** Keep the existing node unchanged and continue visiting its children */
    TransformerAction["Continue"] = "continue";
    /** First recurse into children to transform them, then replace with the provided node/callback result */
    TransformerAction["Replace"] = "replace";
    /** Remove the node entirely and stop visiting its children */
    TransformerAction["Remove"] = "remove";
})(TransformerAction || (exports.TransformerAction = TransformerAction = {}));
/**
 * Walk up the AST from a given node and return the nearest ancestor that matches a predicate.
 *
 * @param node The starting node.
 * @param predicate A function that returns true for the desired ancestor type.
 * @returns The nearest matching ancestor node, or undefined if none found.
 */
function findAncestor(node, predicate) {
    var current = node.parent;
    while (current) {
        if (predicate(current)) {
            return current;
        }
        current = current.parent;
    }
    return undefined;
}
/**
 * Adds a default import statement to the provided SourceFile.
 */
function addImport(sourceFile, identifierName, modulePath, isTypeOnly) {
    var _a;
    if (isTypeOnly === void 0) { isTypeOnly = false; }
    // Check if the import already exists
    for (var _i = 0, _b = sourceFile.statements; _i < _b.length; _i++) {
        var statement = _b[_i];
        if (typescript_1.default.isImportDeclaration(statement) && statement.importClause) {
            var importClause = statement.importClause;
            // Check for default import with matching name and module path
            var isExistingImportTypeOnly = importClause.phaseModifier === typescript_1.default.SyntaxKind.TypeKeyword;
            if (((_a = importClause.name) === null || _a === void 0 ? void 0 : _a.text) === identifierName &&
                statement.moduleSpecifier &&
                typescript_1.default.isStringLiteral(statement.moduleSpecifier) &&
                statement.moduleSpecifier.text === modulePath &&
                isExistingImportTypeOnly === isTypeOnly) {
                return sourceFile; // Import already exists, return unchanged
            }
        }
    }
    var phaseModifier = isTypeOnly ? typescript_1.default.SyntaxKind.TypeKeyword : undefined;
    var newImport = typescript_1.default.factory.createImportDeclaration(undefined, typescript_1.default.factory.createImportClause(phaseModifier, typescript_1.default.factory.createIdentifier(identifierName), undefined), typescript_1.default.factory.createStringLiteral(modulePath));
    // Find the index of the last import declaration
    var lastImportIndex = -1;
    for (var i = sourceFile.statements.length - 1; i >= 0; i--) {
        if (typescript_1.default.isImportDeclaration(sourceFile.statements[i])) {
            lastImportIndex = i;
            break;
        }
    }
    var updatedStatements = typescript_1.default.factory.createNodeArray(__spreadArray(__spreadArray(__spreadArray([], sourceFile.statements.slice(0, lastImportIndex + 1), true), [newImport], false), sourceFile.statements.slice(lastImportIndex + 1), true));
    return typescript_1.default.factory.updateSourceFile(sourceFile, updatedStatements);
}
/**
 * Finds the node that is exported as the default export.
 * Returns null if not found.
 */
function findDefaultExport(sourceFile) {
    for (var _i = 0, _a = sourceFile.statements; _i < _a.length; _i++) {
        var statement = _a[_i];
        if (typescript_1.default.isExportAssignment(statement) && !statement.isExportEquals) {
            return statement.expression;
        }
        if (typescript_1.default.isExportDeclaration(statement) && statement.exportClause && typescript_1.default.isNamedExports(statement.exportClause)) {
            for (var _b = 0, _c = statement.exportClause.elements; _b < _c.length; _b++) {
                var element = _c[_b];
                if (element.name.text === 'default') {
                    return element.name;
                }
            }
        }
    }
    return null;
}
/**
 * Resolves the identifier name to its declaration node within the source file.
 */
function resolveDeclaration(name, sourceFile) {
    var _a, _b;
    for (var _i = 0, _c = sourceFile.statements; _i < _c.length; _i++) {
        var statement = _c[_i];
        if (typescript_1.default.isVariableStatement(statement)) {
            for (var _d = 0, _e = statement.declarationList.declarations; _d < _e.length; _d++) {
                var decl = _e[_d];
                if (typescript_1.default.isIdentifier(decl.name) && decl.name.text === name) {
                    return decl;
                }
            }
        }
        if (typescript_1.default.isFunctionDeclaration(statement) && ((_a = statement.name) === null || _a === void 0 ? void 0 : _a.text) === name) {
            return statement;
        }
        if (typescript_1.default.isClassDeclaration(statement) && ((_b = statement.name) === null || _b === void 0 ? void 0 : _b.text) === name) {
            return statement;
        }
    }
    return null;
}
/**
 * Check if a node is an expression that has both 'expression' and 'type' properties.
 * This is useful for satisfies expressions and type assertions.
 */
function isExpressionWithType(node) {
    return 'expression' in node && 'type' in node && node.expression !== undefined && node.type !== undefined;
}
/**
 * Check if a node is a satisfies expression by examining its structure.
 * This is more robust than checking SyntaxKind numbers which might vary between TS versions.
 */
function isSatisfiesExpression(node) {
    // Check if the node text contains 'satisfies' and has the expected structure
    var nodeText = node.getText();
    if (!nodeText.includes(' satisfies ')) {
        return false;
    }
    return isExpressionWithType(node);
}
/**
 * Extracts the identifier name from various expression types.
 * Handles cases like:
 * - Simple identifier: `translations`
 * - Satisfies expression: `translations satisfies SomeType`
 * - As expression: `translations as SomeType`
 * - Parenthesized expression: `(translations)`
 * - Type assertion: `<SomeType>translations`
 */
function extractIdentifierFromExpression(node) {
    // Direct identifier
    if (typescript_1.default.isIdentifier(node)) {
        return node.text;
    }
    // Check for satisfies expression by looking at the node structure
    // A satisfies expression has the form: expression satisfies type
    if (isSatisfiesExpression(node)) {
        return extractIdentifierFromExpression(node.expression);
    }
    // As expression: `translations as SomeType`
    if (typescript_1.default.isAsExpression(node)) {
        return extractIdentifierFromExpression(node.expression);
    }
    // Parenthesized expression: `(translations)`
    if (typescript_1.default.isParenthesizedExpression(node)) {
        return extractIdentifierFromExpression(node.expression);
    }
    // Type assertion: `<SomeType>translations`
    // Check for type assertion by looking for angle bracket syntax and structure
    var nodeText = node.getText();
    if (nodeText.includes('<') && nodeText.includes('>') && 'expression' in node && 'type' in node && node.expression !== undefined && node.type !== undefined) {
        return extractIdentifierFromExpression(node.expression);
    }
    return null;
}
/**
 * Extracts the key name from a TypeScript property assignment or method declaration node.
 * Handles cases like:
 * - Property assignment: `key: value` -> "key"
 * - String literal property: `"key": value` -> "key"
 * - Method declaration: `key() { ... }` -> "key"
 *
 * @param node The PropertyAssignment or MethodDeclaration node to extract the key from
 * @returns The key name as a string, or undefined if the key cannot be extracted
 */
function extractKeyFromPropertyNode(node) {
    if (typescript_1.default.isPropertyAssignment(node)) {
        if (typescript_1.default.isIdentifier(node.name) || typescript_1.default.isStringLiteral(node.name)) {
            return node.name.text;
        }
    }
    else if (typescript_1.default.isMethodDeclaration(node) && typescript_1.default.isIdentifier(node.name)) {
        return node.name.text;
    }
    return undefined;
}
/**
 * Build a dot-notation path from a node by traversing up the AST to find property assignments.
 * Useful for building paths like "common.save" from a string literal node.
 */
// eslint-disable-next-line rulesdir/no-negated-variables
function buildDotNotationPath(node, rootNode) {
    var pathParts = [];
    var current = node;
    // Traverse up the tree until we reach the root node or source file
    while (current && current !== rootNode && !typescript_1.default.isSourceFile(current)) {
        if (typescript_1.default.isPropertyAssignment(current)) {
            var key = extractKeyFromPropertyNode(current);
            if (key) {
                pathParts.unshift(key);
            }
        }
        current = current.parent;
    }
    return pathParts.length > 0 ? pathParts.join('.') : null;
}
/**
 * Parse a code string back to a TypeScript expression.
 * Useful for converting serialized expressions back to AST nodes.
 * @disclaimer This is intended to work only for single expressions of code, not entire files or multiple statements.
 */
function parseCodeStringToAST(codeString) {
    try {
        var tempSourceFile = typescript_1.default.createSourceFile('temp.ts', "const temp = ".concat(codeString, ";"), typescript_1.default.ScriptTarget.Latest);
        // Check for parsing errors
        // @ts-expect-error parseDiagnostics is not a public property of the SourceFile type, but this works.
        // The "correct" way to do this is with `ts.createProgram`, but it's more complicated and it makes the translation script at least ~4x slower.
        if (tempSourceFile.parseDiagnostics && tempSourceFile.parseDiagnostics.length > 0) {
            throw new Error("Malformed code string: ".concat(codeString));
        }
        var tempStatement = tempSourceFile.statements.at(0);
        if (!tempStatement || !typescript_1.default.isVariableStatement(tempStatement)) {
            throw new Error("Malformed code string: ".concat(codeString));
        }
        var declaration = tempStatement.declarationList.declarations.at(0);
        if (!(declaration === null || declaration === void 0 ? void 0 : declaration.initializer)) {
            throw new Error("No initializer found in code string: ".concat(codeString));
        }
        return declaration.initializer;
    }
    catch (error) {
        if (error instanceof Error && error.message.includes('code string')) {
            throw error; // Re-throw our custom errors
        }
        throw new Error("Malformed code string: ".concat(codeString));
    }
}
/**
 * Create a visitor function for ts.visitEachChild that builds dot-notation paths.
 */
function createPathAwareVisitor(visitWithPath, currentPath) {
    return function (child) {
        var childPath = currentPath;
        // If the child is a property assignment, update the path
        if (typescript_1.default.isPropertyAssignment(child)) {
            var propName = extractKeyFromPropertyNode(child);
            if (propName) {
                childPath = currentPath ? "".concat(currentPath, ".").concat(propName) : propName;
            }
        }
        return visitWithPath(child, childPath);
    };
}
/**
 * Create a path-aware transformer that provides clear action-based control over node transformation.
 * Makes transformer logic more explicit and easier to understand.
 */
function createPathAwareTransformer(visitor) {
    return function (context) {
        var visitWithPath = function (node, currentPath) {
            if (currentPath === void 0) { currentPath = ''; }
            var result = visitor(node, currentPath);
            if (result.action === TransformerAction.Remove) {
                return undefined;
            }
            var transformedNode = typescript_1.default.visitEachChild(node, createPathAwareVisitor(visitWithPath, currentPath), context);
            if (result.action === TransformerAction.Replace) {
                return result.newNode(transformedNode);
            }
            // Continue, leaving the existing node unchanged
            return transformedNode;
        };
        return function (sourceFile) {
            var _a;
            return (_a = typescript_1.default.visitNode(sourceFile, visitWithPath)) !== null && _a !== void 0 ? _a : sourceFile;
        };
    };
}
/**
 * Check if a dot-notation path exists in an object literal expression.
 *
 * @param objectLiteral The object literal expression to search in
 * @param dotNotationPath The path to look for (e.g., "common.save" or "errors.generic")
 * @returns true if the path exists, false otherwise
 * @disclaimer This does not handle computed properties.
 */
function objectHas(objectLiteral, dotNotationPath) {
    var pathParts = dotNotationPath.split('.');
    var currentNode = objectLiteral;
    // Traverse the path parts to see if the full path exists
    for (var _i = 0, pathParts_1 = pathParts; _i < pathParts_1.length; _i++) {
        var pathPart = pathParts_1[_i];
        var found = false;
        for (var _a = 0, _b = currentNode.properties; _a < _b.length; _a++) {
            var property = _b[_a];
            if (typescript_1.default.isPropertyAssignment(property)) {
                var propertyKey = extractKeyFromPropertyNode(property);
                if (propertyKey === pathPart) {
                    // Found this path part
                    if (pathPart === pathParts.at(-1)) {
                        // This is the final path part - we found the complete path
                        return true;
                    }
                    // Continue traversing - check if the next level is an object
                    if (typescript_1.default.isObjectLiteralExpression(property.initializer)) {
                        currentNode = property.initializer;
                        found = true;
                        break;
                    }
                    else {
                        // Next level is not an object, so path doesn't exist
                        return false;
                    }
                }
            }
        }
        if (!found) {
            // Didn't find this path part
            return false;
        }
    }
    return false; // Shouldn't reach here, but just in case
}
/**
 * Injects a value into a deeply nested object structure based on a dot-notation path.
 * Creates the nested structure if it doesn't exist, and returns a new ObjectLiteralExpression.
 *
 * @param objectLiteral - The ObjectLiteralExpression to inject the value into
 * @param dotPath - The dot-notation path (e.g., "manualTest.simple.deep")
 * @param value - The value to inject at the end of the path
 * @returns New ObjectLiteralExpression with the injected value
 */
function injectDeepObjectValue(objectLiteral, dotPath, value) {
    if (!dotPath) {
        throw new Error("Invalid path: empty path provided");
    }
    var pathParts = dotPath.split('.');
    // Check for empty parts anywhere in the path
    if (pathParts.some(function (part) { return !part; })) {
        throw new Error("Invalid path: empty key found in path \"".concat(dotPath, "\""));
    }
    var topLevelKey = pathParts.at(0);
    if (!topLevelKey) {
        throw new Error("Invalid path: empty key found in path \"".concat(dotPath, "\""));
    }
    var remainingPath = pathParts.slice(1).join('.');
    // Check if top-level key already exists
    var existingProperty = objectLiteral.properties.find(function (prop) { return typescript_1.default.isPropertyAssignment(prop) && typescript_1.default.isIdentifier(prop.name) && prop.name.text === topLevelKey; });
    if (existingProperty) {
        // Key exists - we need to recursively inject into the existing structure
        if (!remainingPath) {
            // This is the final key, replace the existing value
            var updatedProperty_1 = typescript_1.default.factory.createPropertyAssignment(topLevelKey, value);
            var updatedProperties_1 = objectLiteral.properties.map(function (prop) { return (prop === existingProperty ? updatedProperty_1 : prop); });
            return typescript_1.default.factory.createObjectLiteralExpression(updatedProperties_1);
        }
        // Recursively inject into the existing nested structure
        // Handle both direct ObjectLiteralExpression and SatisfiesExpression wrapping an object
        var nestedObject = void 0;
        var satisfiesType = void 0;
        if (typescript_1.default.isObjectLiteralExpression(existingProperty.initializer)) {
            nestedObject = existingProperty.initializer;
        }
        else if (typescript_1.default.isSatisfiesExpression(existingProperty.initializer) && typescript_1.default.isObjectLiteralExpression(existingProperty.initializer.expression)) {
            nestedObject = existingProperty.initializer.expression;
            satisfiesType = existingProperty.initializer.type;
        }
        if (!nestedObject) {
            throw new Error("Cannot inject into path \"".concat(dotPath, "\": property \"").concat(topLevelKey, "\" exists but is not an object"));
        }
        var updatedNestedObject = injectDeepObjectValue(nestedObject, remainingPath, value);
        // Re-wrap with satisfies if it was originally wrapped
        var finalValue = satisfiesType ? typescript_1.default.factory.createSatisfiesExpression(updatedNestedObject, satisfiesType) : updatedNestedObject;
        var updatedProperty_2 = typescript_1.default.factory.createPropertyAssignment(topLevelKey, finalValue);
        var updatedProperties = objectLiteral.properties.map(function (prop) { return (prop === existingProperty ? updatedProperty_2 : prop); });
        return typescript_1.default.factory.createObjectLiteralExpression(updatedProperties);
    }
    // Key doesn't exist - create new nested structure
    if (!remainingPath) {
        // This is a direct property, just add it
        var newProperty_1 = typescript_1.default.factory.createPropertyAssignment(topLevelKey, value);
        return typescript_1.default.factory.createObjectLiteralExpression(__spreadArray(__spreadArray([], objectLiteral.properties, true), [newProperty_1], false));
    }
    // Create nested structure recursively by creating an empty object and injecting into it
    var emptyNestedObject = typescript_1.default.factory.createObjectLiteralExpression([]);
    var nestedObjectWithValue = injectDeepObjectValue(emptyNestedObject, remainingPath, value);
    var newProperty = typescript_1.default.factory.createPropertyAssignment(topLevelKey, nestedObjectWithValue);
    // Return new ObjectLiteralExpression with the added property
    return typescript_1.default.factory.createObjectLiteralExpression(__spreadArray(__spreadArray([], objectLiteral.properties, true), [newProperty], false));
}
/**
 * Recursively check if a binary expression represents string concatenation
 */
function isStringConcatenationChain(node) {
    // Only check + operators
    if (node.operatorToken.kind !== typescript_1.default.SyntaxKind.PlusToken) {
        return false;
    }
    // If either operand is a string literal or template, this is string concatenation
    if (typescript_1.default.isStringLiteral(node.left) ||
        typescript_1.default.isTemplateExpression(node.left) ||
        typescript_1.default.isNoSubstitutionTemplateLiteral(node.left) ||
        typescript_1.default.isStringLiteral(node.right) ||
        typescript_1.default.isTemplateExpression(node.right) ||
        typescript_1.default.isNoSubstitutionTemplateLiteral(node.right)) {
        return true;
    }
    // If either operand is another binary expression with +, check recursively
    if (typescript_1.default.isBinaryExpression(node.left) && node.left.operatorToken.kind === typescript_1.default.SyntaxKind.PlusToken) {
        return isStringConcatenationChain(node.left);
    }
    if (typescript_1.default.isBinaryExpression(node.right) && node.right.operatorToken.kind === typescript_1.default.SyntaxKind.PlusToken) {
        return isStringConcatenationChain(node.right);
    }
    return false;
}
exports.default = {
    findAncestor: findAncestor,
    addImport: addImport,
    findDefaultExport: findDefaultExport,
    resolveDeclaration: resolveDeclaration,
    extractIdentifierFromExpression: extractIdentifierFromExpression,
    extractKeyFromPropertyNode: extractKeyFromPropertyNode,
    buildDotNotationPath: buildDotNotationPath,
    parseCodeStringToAST: parseCodeStringToAST,
    createPathAwareVisitor: createPathAwareVisitor,
    createPathAwareTransformer: createPathAwareTransformer,
    objectHas: objectHas,
    injectDeepObjectValue: injectDeepObjectValue,
    isStringConcatenationChain: isStringConcatenationChain,
};
