"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_native_1 = require("react-native");
function OptionRowRendererComponent(props, ref) {
    return (<react_native_1.View 
    // eslint-disable-next-line react/jsx-props-no-spreading
    {...props} ref={ref} style={[props.style, { zIndex: -props.index }]}/>);
}
OptionRowRendererComponent.displayName = 'OptionRowRendererComponent';
exports.default = (0, react_1.forwardRef)(OptionRowRendererComponent);
