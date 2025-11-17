"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_native_1 = require("@testing-library/react-native");
var react_1 = require("react");
require("react-native");
var App_1 = require("@src/App");
describe('AppComponent', function () {
    it('renders correctly', function () {
        (0, react_native_1.render)(<App_1.default />);
    });
});
