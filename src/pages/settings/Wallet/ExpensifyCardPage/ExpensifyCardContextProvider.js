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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpensifyCardContext = void 0;
var react_1 = require("react");
var useOnyx_1 = require("@hooks/useOnyx");
var ONYXKEYS_1 = require("@src/ONYXKEYS");
var ExpensifyCardContext = (0, react_1.createContext)({
    cardsDetails: {},
    setCardsDetails: function () { },
    isCardDetailsLoading: {},
    setIsCardDetailsLoading: function () { },
    cardsDetailsErrors: {},
    setCardsDetailsErrors: function () { },
});
exports.ExpensifyCardContext = ExpensifyCardContext;
/**
 * Context to display revealed expensify card data and pass it between screens.
 */
function ExpensifyCardContextProvider(_a) {
    var children = _a.children;
    var cardList = (0, useOnyx_1.default)(ONYXKEYS_1.default.CARD_LIST, { canBeMissing: false })[0];
    var _b = (0, react_1.useState)({}), cardsDetails = _b[0], setCardsDetails = _b[1];
    var _c = (0, react_1.useState)({}), isCardDetailsLoading = _c[0], setIsCardDetailsLoading = _c[1];
    var _d = (0, react_1.useState)({}), cardsDetailsErrors = _d[0], setCardsDetailsErrors = _d[1];
    var cardListErrors = (0, react_1.useMemo)(function () {
        if (!cardList) {
            return {};
        }
        var errors = {};
        Object.keys(cardList).forEach(function (cardID) {
            var _a;
            errors[cardID] = (_a = cardList[cardID]) === null || _a === void 0 ? void 0 : _a.errors;
        });
        return errors;
    }, [cardList]);
    // Update error state when error is cleared in Onyx DB
    (0, react_1.useEffect)(function () {
        setCardsDetailsErrors(function (prevErrors) {
            var clearedErrors = __assign({}, prevErrors);
            Object.keys(clearedErrors).forEach(function (cardID) {
                if (cardListErrors[cardID] && Object.keys(cardListErrors[cardID]).length > 0) {
                    return;
                }
                delete clearedErrors[Number(cardID)];
            });
            return clearedErrors;
        });
    }, [cardListErrors]);
    var value = (0, react_1.useMemo)(function () { return ({
        cardsDetails: cardsDetails,
        setCardsDetails: setCardsDetails,
        isCardDetailsLoading: isCardDetailsLoading,
        setIsCardDetailsLoading: setIsCardDetailsLoading,
        cardsDetailsErrors: cardsDetailsErrors,
        setCardsDetailsErrors: setCardsDetailsErrors,
    }); }, [cardsDetails, setCardsDetails, isCardDetailsLoading, setIsCardDetailsLoading, cardsDetailsErrors, setCardsDetailsErrors]);
    return <ExpensifyCardContext.Provider value={value}>{children}</ExpensifyCardContext.Provider>;
}
exports.default = ExpensifyCardContextProvider;
