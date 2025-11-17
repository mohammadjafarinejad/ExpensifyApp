"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * On mobile, there is no concept of hovering, so we return a plain wrapper around the component's children,
 * where the hover state is always false.
 */
function Hoverable(_a) {
    var children = _a.children;
    var childrenWithHoverState = typeof children === 'function' ? children(false) : children;
    return childrenWithHoverState;
}
Hoverable.displayName = 'Hoverable';
exports.default = Hoverable;
