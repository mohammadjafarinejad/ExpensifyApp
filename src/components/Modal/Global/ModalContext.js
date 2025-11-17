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
exports.ModalActions = exports.useModal = void 0;
exports.ModalProvider = ModalProvider;
var noop_1 = require("lodash/noop");
var react_1 = require("react");
var Log_1 = require("@libs/Log");
var CONST_1 = require("@src/CONST");
var ModalActions = {
    CONFIRM: 'CONFIRM',
    CLOSE: 'CLOSE',
};
exports.ModalActions = ModalActions;
var ModalContext = react_1.default.createContext({
    showModal: function () { return Promise.resolve({ action: 'CLOSE' }); },
    closeModal: noop_1.default,
});
var useModal = function () { return (0, react_1.useContext)(ModalContext); };
exports.useModal = useModal;
var modalID = 1;
function ModalProvider(_a) {
    var children = _a.children;
    var _b = (0, react_1.useState)({ modals: [] }), modalStack = _b[0], setModalStack = _b[1];
    var showModal = (0, react_1.useCallback)(function (_a) {
        var component = _a.component, props = _a.props, id = _a.id, _b = _a.isCloseable, isCloseable = _b === void 0 ? true : _b;
        // This is a promise that will resolve when the modal is closed
        var closeModalPromise = null;
        setModalStack(function (prevState) {
            // Check current state for existing modal
            var existingModal = id ? prevState.modals.find(function (modal) { return modal.id === id; }) : undefined;
            if (existingModal) {
                // There is already a modal with this ID. Return the existing promise and don't modify state.
                closeModalPromise = existingModal.promiseWithResolvers.promise;
                return prevState; // No state change needed
            }
            // Create a new promise with resolvers to be resolved when the modal is closed
            var promiseWithResolvers = Promise.withResolvers();
            closeModalPromise = promiseWithResolvers.promise;
            return __assign(__assign({}, prevState), { modals: __spreadArray(__spreadArray([], prevState.modals, true), [{ component: component, props: props, promiseWithResolvers: promiseWithResolvers, isCloseable: isCloseable, id: id !== null && id !== void 0 ? id : String(modalID++) }], false) });
        });
        // At this point, closeModalPromise should always be assigned
        if (!closeModalPromise) {
            Log_1.default.alert("".concat(CONST_1.default.ERROR.ENSURE_BUG_BOT, " Failed to create modal promise. This should never happen."));
            throw new Error('Failed to create modal promise');
        }
        return closeModalPromise;
    }, []);
    var closeModal = (0, react_1.useCallback)(function (data) {
        if (data === void 0) { data = { action: 'CLOSE' }; }
        setModalStack(function (prevState) {
            var lastModal = prevState.modals.at(-1);
            lastModal === null || lastModal === void 0 ? void 0 : lastModal.promiseWithResolvers.resolve(data);
            return __assign(__assign({}, prevState), { modals: prevState.modals.slice(0, -1) });
        });
    }, []);
    var contextValue = (0, react_1.useMemo)(function () { return ({ showModal: showModal, closeModal: closeModal }); }, [closeModal, showModal]);
    var modalToRender = modalStack.modals.length > 0 ? modalStack.modals.at(modalStack.modals.length - 1) : null;
    var ModalComponent = modalToRender === null || modalToRender === void 0 ? void 0 : modalToRender.component;
    return (<ModalContext.Provider value={contextValue}>
            {children}
            {!!ModalComponent && (<ModalComponent 
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...modalToRender.props} key={modalToRender.id} closeModal={closeModal}/>)}
        </ModalContext.Provider>);
}
