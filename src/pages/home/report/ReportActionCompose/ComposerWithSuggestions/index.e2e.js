"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetRerenderCount = exports.getRerenderCount = void 0;
/* eslint-disable react-compiler/react-compiler */
var react_1 = require("react");
var react_native_1 = require("react-native");
var client_1 = require("@libs/E2E/client");
var ComposerWithSuggestions_1 = require("./ComposerWithSuggestions");
var rerenderCount = 0;
var getRerenderCount = function () { return rerenderCount; };
exports.getRerenderCount = getRerenderCount;
var resetRerenderCount = function () {
    rerenderCount = 0;
};
exports.resetRerenderCount = resetRerenderCount;
function IncrementRenderCount() {
    rerenderCount += 1;
    return null;
}
function ComposerWithSuggestionsE2e(_a) {
    'use no memo';
    var ref = _a.ref, props = __rest(_a, ["ref"]);
    // we rely on waterfall rendering in react, so we intentionally disable compiler
    // for this component. This file is only used for e2e tests, so it's okay to
    // disable compiler for this file.
    var textInputRef = (0, react_1.useRef)(null);
    var hasFocusBeenRequested = (0, react_1.useRef)(false);
    var onLayout = (0, react_1.useCallback)(function (event) {
        var testConfig = client_1.default.getCurrentActiveTestConfig();
        if ((testConfig === null || testConfig === void 0 ? void 0 : testConfig.reportScreen) && typeof testConfig.reportScreen !== 'string' && !(testConfig === null || testConfig === void 0 ? void 0 : testConfig.reportScreen.autoFocus)) {
            return;
        }
        var canRequestFocus = event.nativeEvent.layout.width > 0 && !hasFocusBeenRequested.current;
        if (!canRequestFocus) {
            return;
        }
        hasFocusBeenRequested.current = true;
        var setFocus = function () {
            var _a;
            console.debug('[E2E] Requesting focus for ComposerWithSuggestions');
            if (!(textInputRef && 'current' in textInputRef)) {
                console.error('[E2E] textInputRef is not available, failed to focus');
                return;
            }
            (_a = textInputRef.current) === null || _a === void 0 ? void 0 : _a.focus(true);
            setTimeout(function () {
                var _a;
                // and actually let's verify that the keyboard is visible
                if (react_native_1.Keyboard.isVisible()) {
                    return;
                }
                (_a = textInputRef.current) === null || _a === void 0 ? void 0 : _a.blur();
                setFocus();
                // 1000ms is enough time for any keyboard to open
            }, 1000);
        };
        // Simulate user behavior and don't set focus immediately
        setTimeout(setFocus, 2000);
    }, []);
    return (<ComposerWithSuggestions_1.default 
    // eslint-disable-next-line react/jsx-props-no-spreading
    {...props} ref={function (composerRef) {
            textInputRef.current = composerRef;
            if (typeof ref === 'function') {
                ref(composerRef);
            }
        }} onLayout={onLayout}>
            {/* Important:
                this has to be a child, as this container might not
                re-render while the actual ComposerWithSuggestions will.
        */}
            <IncrementRenderCount />
        </ComposerWithSuggestions_1.default>);
}
ComposerWithSuggestionsE2e.displayName = 'ComposerWithSuggestionsE2e';
exports.default = ComposerWithSuggestionsE2e;
