"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var ExpensifyCardContextProvider_1 = require("./ExpensifyCardContextProvider");
/**
 * Hook to display revealed expensify card data and pass it between screens.

 */
var useExpensifyCardContext = function () { return (0, react_1.useContext)(ExpensifyCardContextProvider_1.ExpensifyCardContext); };
exports.default = useExpensifyCardContext;
