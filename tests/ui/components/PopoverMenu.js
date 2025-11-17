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
var react_native_1 = require("@testing-library/react-native");
var react_1 = require("react");
var PopoverMenu_1 = require("@components/PopoverMenu");
describe('PopoverMenu utils', function () {
    var menuItems = [
        { text: 'Item 1' },
        {
            text: 'Item 2',
            subMenuItems: [{ text: 'Sub 1' }, { text: 'Sub 2', subMenuItems: [{ text: 'Deep 1' }] }],
        },
        { text: 'Item 3' },
    ];
    describe('getItemKey', function () {
        test('returns explicit key if defined', function () {
            var item = { text: 'Hello', key: 'custom-key' };
            expect((0, PopoverMenu_1.getItemKey)(item)).toBe('custom-key');
        });
        test('falls back to text if no key provided', function () {
            var item = { text: 'Fallback' };
            expect((0, PopoverMenu_1.getItemKey)(item)).toBe('Fallback');
        });
        test('handles items with empty text and no key', function () {
            var item = { text: '' };
            expect((0, PopoverMenu_1.getItemKey)(item)).toBe('');
        });
    });
    describe('buildKeyPathFromIndexPath', function () {
        test('builds correct path for deep nested item', function () {
            var path = (0, PopoverMenu_1.buildKeyPathFromIndexPath)(menuItems, [1, 1, 0]);
            expect(path).toEqual(['Item 2', 'Sub 2', 'Deep 1']);
        });
        test('returns empty array for empty index path', function () {
            var path = (0, PopoverMenu_1.buildKeyPathFromIndexPath)(menuItems, []);
            expect(path).toEqual([]);
        });
        test('returns partial path when out of bounds occurs mid-way', function () {
            var path = (0, PopoverMenu_1.buildKeyPathFromIndexPath)(menuItems, [1, 10]);
            expect(path).toEqual(['Item 2']);
        });
        test('returns full path when indexes are valid', function () {
            var path = (0, PopoverMenu_1.buildKeyPathFromIndexPath)(menuItems, [1, 0]);
            expect(path).toEqual(['Item 2', 'Sub 1']);
        });
        test('returns [] when first index out of bounds', function () {
            var path = (0, PopoverMenu_1.buildKeyPathFromIndexPath)(menuItems, [99]);
            expect(path).toEqual([]);
        });
    });
    describe('resolveIndexPathByKeyPath', function () {
        test('resolves deep nested key path correctly', function () {
            var result = (0, PopoverMenu_1.resolveIndexPathByKeyPath)(menuItems, ['Item 2', 'Sub 2', 'Deep 1']);
            expect(result).toEqual({
                found: true,
                indexes: [1, 1, 0],
                itemsAtLeaf: [],
            });
        });
        test('returns itemsAtLeaf containing subMenuItems at the last valid node', function () {
            var result = (0, PopoverMenu_1.resolveIndexPathByKeyPath)(menuItems, ['Item 2']);
            expect(result).toEqual({
                found: true,
                indexes: [1],
                itemsAtLeaf: [{ text: 'Sub 1' }, { text: 'Sub 2', subMenuItems: [{ text: 'Deep 1' }] }],
            });
        });
        test('returns not found if path partially invalid', function () {
            var result = (0, PopoverMenu_1.resolveIndexPathByKeyPath)(menuItems, ['Item 2', 'Missing']);
            expect(result).toEqual({ found: false });
        });
        test('returns not found if first key does not exist', function () {
            var result = (0, PopoverMenu_1.resolveIndexPathByKeyPath)(menuItems, ['Invalid']);
            expect(result).toEqual({ found: false });
        });
        test('handles empty key path and returns empty indexes', function () {
            var result = (0, PopoverMenu_1.resolveIndexPathByKeyPath)(menuItems, []);
            expect(result).toEqual({
                found: true,
                indexes: [],
                itemsAtLeaf: menuItems,
            });
        });
        test('returns not found if same text keys appear in different levels but mismatch path', function () {
            var nestedMenu = [
                { text: 'A', subMenuItems: [{ text: 'B' }] },
                { text: 'B' }, // same text at root
            ];
            var result = (0, PopoverMenu_1.resolveIndexPathByKeyPath)(nestedMenu, ['B', 'C']);
            expect(result).toEqual({ found: false });
        });
    });
    describe('buildKeyPathFromIndexPath + resolveIndexPathByKeyPath integration', function () {
        test('resolves to the same indexes after building and resolving', function () {
            var indexPath = [1, 1, 0];
            var keyPath = (0, PopoverMenu_1.buildKeyPathFromIndexPath)(menuItems, indexPath);
            var result = (0, PopoverMenu_1.resolveIndexPathByKeyPath)(menuItems, keyPath);
            expect(result.found).toBe(true);
            expect(result.indexes).toEqual(indexPath);
        });
        test('round-trip works for top-level items', function () {
            var indexPath = [2];
            var keyPath = (0, PopoverMenu_1.buildKeyPathFromIndexPath)(menuItems, indexPath);
            var result = (0, PopoverMenu_1.resolveIndexPathByKeyPath)(menuItems, keyPath);
            expect(result.found).toBe(true);
            expect(result.indexes).toEqual(indexPath);
        });
        test('returns consistent empty result when index path is invalid', function () {
            var keyPath = (0, PopoverMenu_1.buildKeyPathFromIndexPath)(menuItems, [5, 0]);
            expect(keyPath).toEqual([]);
            var result = (0, PopoverMenu_1.resolveIndexPathByKeyPath)(menuItems, keyPath);
            expect(result).toEqual({
                found: true,
                indexes: [],
                itemsAtLeaf: menuItems,
            });
        });
    });
});
jest.mock('@components/PopoverWithMeasuredContent', function () {
    return {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        __esModule: true,
        default: function (props) { return props.children; },
    };
});
jest.mock('@components/FocusableMenuItem', function () {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    var _a = require('react-native'), Pressable = _a.Pressable, Text = _a.Text;
    return {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        __esModule: true,
        default: function (props) { return (<Pressable testID={props.pressableTestID} onPress={props.onPress} accessibilityLabel="Pressable">
                <Text>{props.title}</Text>
            </Pressable>); },
    };
});
describe('PopoverMenu integration — submenu open/close behaviors', function () {
    var baseMenu = [
        { text: 'Item A', key: 'A' },
        {
            text: 'Item B',
            key: 'B',
            subMenuItems: [
                { text: 'Sub B1', key: 'B1' },
                { text: 'Sub B2', key: 'B2' },
            ],
        },
        { text: 'Item C', key: 'C' },
    ];
    var anchorRef = react_1.default.createRef();
    var anchorPosition = { horizontal: 0, vertical: 0 };
    var renderPopover = function (menuItems) {
        return (0, react_native_1.render)(<PopoverMenu_1.default isVisible menuItems={menuItems} onClose={function () { }} anchorPosition={anchorPosition} anchorRef={anchorRef}/>);
    };
    it('keeps submenu open when root item is added', function () { return __awaiter(void 0, void 0, void 0, function () {
        var rerender, newMenu;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    rerender = renderPopover(baseMenu).rerender;
                    // Click on B
                    react_native_1.fireEvent.press(react_native_1.screen.getByTestId('PopoverMenuItem-Item B'));
                    // Expect submenu to open
                    return [4 /*yield*/, (0, react_native_1.waitFor)(function () {
                            expect(react_native_1.screen.getByTestId('PopoverMenuItem-Sub B1')).toBeTruthy();
                        })];
                case 1:
                    // Expect submenu to open
                    _a.sent();
                    newMenu = __spreadArray(__spreadArray([], baseMenu, true), [{ text: 'Item D', key: 'D' }], false);
                    rerender(<PopoverMenu_1.default isVisible menuItems={newMenu} onClose={function () { }} anchorPosition={anchorPosition} anchorRef={anchorRef}/>);
                    // Check that submenu is still open
                    return [4 /*yield*/, (0, react_native_1.waitFor)(function () {
                            expect(react_native_1.screen.getByTestId('PopoverMenuItem-Sub B1')).toBeTruthy();
                        })];
                case 2:
                    // Check that submenu is still open
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('closes submenu when parent is removed', function () { return __awaiter(void 0, void 0, void 0, function () {
        var rerender, newMenu;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    rerender = renderPopover(baseMenu).rerender;
                    react_native_1.fireEvent.press(react_native_1.screen.getByTestId('PopoverMenuItem-Item B'));
                    return [4 /*yield*/, (0, react_native_1.waitFor)(function () {
                            expect(react_native_1.screen.getByTestId('PopoverMenuItem-Sub B1')).toBeTruthy();
                        })];
                case 1:
                    _a.sent();
                    newMenu = baseMenu.filter(function (item) { return item.key !== 'B'; });
                    rerender(<PopoverMenu_1.default isVisible menuItems={newMenu} onClose={function () { }} anchorPosition={anchorPosition} anchorRef={anchorRef}/>);
                    // Submenu should close
                    return [4 /*yield*/, (0, react_native_1.waitFor)(function () {
                            expect(react_native_1.screen.queryByTestId('PopoverMenuItem-Sub B1')).toBeNull();
                        })];
                case 2:
                    // Submenu should close
                    _a.sent();
                    // And only main menu (Item A, Item C) should be displayed
                    expect(react_native_1.screen.getByTestId('PopoverMenuItem-Item A')).toBeTruthy();
                    expect(react_native_1.screen.getByTestId('PopoverMenuItem-Item C')).toBeTruthy();
                    return [2 /*return*/];
            }
        });
    }); });
    it('keeps submenu open when sibling root item is removed', function () { return __awaiter(void 0, void 0, void 0, function () {
        var rerender, newMenu;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    rerender = renderPopover(baseMenu).rerender;
                    // Open submenu for Item B
                    react_native_1.fireEvent.press(react_native_1.screen.getByTestId('PopoverMenuItem-Item B'));
                    // Make sure submenu is open
                    return [4 /*yield*/, (0, react_native_1.waitFor)(function () {
                            expect(react_native_1.screen.getByTestId('PopoverMenuItem-Sub B1')).toBeTruthy();
                        })];
                case 1:
                    // Make sure submenu is open
                    _a.sent();
                    newMenu = baseMenu.filter(function (item) { return item.key !== 'A'; });
                    rerender(<PopoverMenu_1.default isVisible menuItems={newMenu} onClose={function () { }} anchorPosition={anchorPosition} anchorRef={anchorRef}/>);
                    // Check that submenu is still open
                    return [4 /*yield*/, (0, react_native_1.waitFor)(function () {
                            expect(react_native_1.screen.getByTestId('PopoverMenuItem-Sub B1')).toBeTruthy();
                        })];
                case 2:
                    // Check that submenu is still open
                    _a.sent();
                    // Check that Item A is no longer displayed
                    expect(react_native_1.screen.queryByTestId('PopoverMenuItem-Item A')).toBeNull();
                    return [2 /*return*/];
            }
        });
    }); });
    it('keeps submenu open when submenu items are updated', function () { return __awaiter(void 0, void 0, void 0, function () {
        var rerender, newMenu;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    rerender = renderPopover(baseMenu).rerender;
                    // Open submenu for Item B
                    react_native_1.fireEvent.press(react_native_1.screen.getByTestId('PopoverMenuItem-Item B'));
                    // Make sure submenu is open
                    return [4 /*yield*/, (0, react_native_1.waitFor)(function () {
                            expect(react_native_1.screen.getByTestId('PopoverMenuItem-Sub B1')).toBeTruthy();
                        })];
                case 1:
                    // Make sure submenu is open
                    _a.sent();
                    newMenu = baseMenu.map(function (item) {
                        if (item.key === 'B' && item.subMenuItems) {
                            return __assign(__assign({}, item), { subMenuItems: __spreadArray(__spreadArray([], item.subMenuItems, true), [{ text: 'Sub B3', key: 'B3' }], false) });
                        }
                        return item;
                    });
                    rerender(<PopoverMenu_1.default isVisible menuItems={newMenu} onClose={function () { }} anchorPosition={anchorPosition} anchorRef={anchorRef}/>);
                    // Check that submenu is still open
                    return [4 /*yield*/, (0, react_native_1.waitFor)(function () {
                            expect(react_native_1.screen.getByTestId('PopoverMenuItem-Sub B1')).toBeTruthy();
                        })];
                case 2:
                    // Check that submenu is still open
                    _a.sent();
                    // Check that the new submenu item is displayed
                    return [4 /*yield*/, (0, react_native_1.waitFor)(function () {
                            expect(react_native_1.screen.getByTestId('PopoverMenuItem-Sub B3')).toBeTruthy();
                        })];
                case 3:
                    // Check that the new submenu item is displayed
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
});
