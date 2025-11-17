"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useMemoizedLazyAsset = useMemoizedLazyAsset;
exports.useMemoizedLazyIllustrations = useMemoizedLazyIllustrations;
exports.useMemoizedLazyExpensifyIcons = useMemoizedLazyExpensifyIcons;
var react_1 = require("react");
var ExpensifyIconLoader_1 = require("@components/Icon/ExpensifyIconLoader");
var IllustrationLoader_1 = require("@components/Icon/IllustrationLoader");
var PlaceholderIcon_1 = require("@components/Icon/PlaceholderIcon");
/**
 * Hook for lazy loading any type of asset
 */
function useLazyAsset(importFn, fallback) {
    var assetRef = (0, react_1.useRef)(undefined);
    var versionRef = (0, react_1.useRef)(0);
    var _a = (0, react_1.useState)(false), isLoaded = _a[0], setIsLoaded = _a[1];
    var _b = (0, react_1.useState)(true), isLoading = _b[0], setIsLoading = _b[1];
    var _c = (0, react_1.useState)(false), hasError = _c[0], setHasError = _c[1];
    var memoizedImportFn = (0, react_1.useMemo)(function () { return importFn; }, [importFn]);
    (0, react_1.useEffect)(function () {
        var isMounted = true;
        var currentVersion = ++versionRef.current;
        var loadAsset = function () {
            setIsLoading(true);
            setHasError(false);
            memoizedImportFn()
                .then(function (module) {
                // Check if this is still the latest request and component is mounted
                if (!isMounted || currentVersion !== versionRef.current) {
                    return;
                }
                assetRef.current = module.default;
                setIsLoaded(true);
                setIsLoading(false);
            })
                .catch(function () {
                // Check if this is still the latest request and component is mounted
                if (!isMounted || currentVersion !== versionRef.current) {
                    return;
                }
                setHasError(true);
                setIsLoading(false);
                // Use fallback if available
                if (fallback) {
                    assetRef.current = fallback;
                    setIsLoaded(true);
                }
            });
        };
        loadAsset();
        return function () {
            isMounted = false;
        };
    }, [memoizedImportFn, fallback]);
    return {
        asset: isLoaded ? assetRef === null || assetRef === void 0 ? void 0 : assetRef.current : undefined,
        isLoaded: isLoaded,
        isLoading: isLoading,
        hasError: hasError,
    };
}
/**
 * Hook that automatically memoizes the import function
 * This prevents the need for callers to manually use useCallback
 * Returns guaranteed non-null assets for existing components compatibility
 */
function useMemoizedLazyAsset(importFn, fallback) {
    var stableImportFn = (0, react_1.useCallback)(function () { return importFn(); }, [importFn]);
    var _a = useLazyAsset(stableImportFn, fallback), asset = _a.asset, isLoaded = _a.isLoaded;
    return {
        // eslint-disable-next-line @typescript-eslint/non-nullable-type-assertion-style
        asset: (isLoaded ? asset : PlaceholderIcon_1.default),
    };
}
/**
 * Hook for loading multiple illustrations at once
 * Loads the illustrations chunk once and returns an object keyed by illustration names
 * @param names - Array of illustration names (use `as const` for type safety)
 * @returns Object with illustration names as keys and IconAsset as values
 */
function useMemoizedLazyIllustrations(names) {
    var _a = (0, react_1.useState)({}), assets = _a[0], setAssets = _a[1];
    var namesKey = (0, react_1.useMemo)(function () { return names.join(','); }, [names]);
    var namesList = (0, react_1.useMemo)(function () { return namesKey.split(','); }, [namesKey]);
    (0, react_1.useEffect)(function () {
        var isMounted = true;
        (0, IllustrationLoader_1.loadIllustrationsChunk)()
            .then(function (chunk) {
            if (!isMounted) {
                return;
            }
            var loaded = {};
            namesList.forEach(function (name) {
                var _a;
                loaded[name] = (_a = chunk.getIllustration(name)) !== null && _a !== void 0 ? _a : PlaceholderIcon_1.default;
            });
            setAssets(loaded);
        })
            .catch(function () {
            if (!isMounted) {
                return;
            }
            var fallback = {};
            namesList.forEach(function (name) {
                fallback[name] = PlaceholderIcon_1.default;
            });
            setAssets(fallback);
        });
        return function () {
            isMounted = false;
        };
    }, [namesList]);
    return (0, react_1.useMemo)(function () { return Object.fromEntries(namesList.map(function (name) { var _a; return [name, (_a = assets[name]) !== null && _a !== void 0 ? _a : PlaceholderIcon_1.default]; })); }, [assets, namesList]);
}
/**
 * Hook for loading multiple Expensify icons at once
 * Loads the Expensify icons chunk once and returns an object keyed by icon names
 * @param names - Array of Expensify icon names (use `as const` for type safety)
 * @returns Object with icon names as keys and IconAsset as values
 */
function useMemoizedLazyExpensifyIcons(names) {
    var _a = (0, react_1.useState)({}), assets = _a[0], setAssets = _a[1];
    var namesKey = (0, react_1.useMemo)(function () { return names.join(','); }, [names]);
    var namesList = (0, react_1.useMemo)(function () { return namesKey.split(','); }, [namesKey]);
    (0, react_1.useEffect)(function () {
        var isMounted = true;
        (0, ExpensifyIconLoader_1.loadExpensifyIconsChunk)()
            .then(function (chunk) {
            if (!isMounted) {
                return;
            }
            var loaded = {};
            namesList.forEach(function (name) {
                var _a;
                loaded[name] = (_a = chunk.getExpensifyIcon(name)) !== null && _a !== void 0 ? _a : PlaceholderIcon_1.default;
            });
            setAssets(loaded);
        })
            .catch(function () {
            if (!isMounted) {
                return;
            }
            var fallback = {};
            namesList.forEach(function (name) {
                fallback[name] = PlaceholderIcon_1.default;
            });
            setAssets(fallback);
        });
        return function () {
            isMounted = false;
        };
    }, [namesList]);
    return (0, react_1.useMemo)(function () { return Object.fromEntries(namesList.map(function (name) { var _a; return [name, (_a = assets[name]) !== null && _a !== void 0 ? _a : PlaceholderIcon_1.default]; })); }, [assets, namesList]);
}
exports.default = useLazyAsset;
