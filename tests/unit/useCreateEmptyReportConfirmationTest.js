"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_native_1 = require("@testing-library/react-native");
var useCreateEmptyReportConfirmation_1 = require("@hooks/useCreateEmptyReportConfirmation");
var Navigation_1 = require("@libs/Navigation/Navigation");
var SearchQueryUtils_1 = require("@libs/SearchQueryUtils");
var CONST_1 = require("@src/CONST");
var ROUTES_1 = require("@src/ROUTES");
var mockTranslate = jest.fn(function (key, params) { return ((params === null || params === void 0 ? void 0 : params.workspaceName) ? "".concat(key, ":").concat(params.workspaceName) : key); });
var mockTextLinkProps;
jest.mock('@hooks/useLocalize', function () { return function () { return ({
    translate: mockTranslate,
}); }; });
jest.mock('@components/ConfirmModal', function () {
    var mockReact = jest.requireActual('react');
    return function (_a) {
        var prompt = _a.prompt, confirmText = _a.confirmText, cancelText = _a.cancelText, isVisible = _a.isVisible, onConfirm = _a.onConfirm, onCancel = _a.onCancel, title = _a.title;
        return mockReact.createElement('mock-confirm-modal', { prompt: prompt, confirmText: confirmText, cancelText: cancelText, isVisible: isVisible, onConfirm: onConfirm, onCancel: onCancel, title: title }, null);
    };
});
jest.mock('@components/Text', function () {
    var mockReact = jest.requireActual('react');
    return function (_a) {
        var children = _a.children;
        return mockReact.createElement('mock-text', null, children);
    };
});
jest.mock('@components/TextLink', function () {
    var mockReact = jest.requireActual('react');
    return function (props) {
        mockTextLinkProps = props;
        var children = props.children, onPress = props.onPress, onLongPress = props.onLongPress;
        return mockReact.createElement('mock-text-link', { onPress: onPress, onLongPress: onLongPress }, children);
    };
});
jest.mock('@libs/Navigation/Navigation', function () { return ({
    navigate: jest.fn(),
}); });
function getModal(hookValue) {
    return hookValue.CreateReportConfirmationModal;
}
function getRequiredHandler(handler, name) {
    if (!handler) {
        throw new Error("".concat(name, " handler was not provided"));
    }
    return handler;
}
var policyID = 'policy-123';
var policyName = 'Engineering Team';
var expectedSearchRoute = ROUTES_1.default.SEARCH_ROOT.getRoute({
    query: (0, SearchQueryUtils_1.buildCannedSearchQuery)({ type: CONST_1.default.SEARCH.DATA_TYPES.EXPENSE_REPORT }),
});
describe('useCreateEmptyReportConfirmation', function () {
    beforeEach(function () {
        jest.clearAllMocks();
        mockTranslate.mockClear();
        mockTextLinkProps = undefined;
    });
    it('modal is hidden by default and opens on demand', function () {
        var onConfirm = jest.fn();
        var result = (0, react_native_1.renderHook)(function () {
            return (0, useCreateEmptyReportConfirmation_1.default)({
                policyID: policyID,
                policyName: policyName,
                onConfirm: onConfirm,
            });
        }).result;
        var modal = getModal(result.current);
        expect(modal.props.isVisible).toBe(false);
        (0, react_native_1.act)(function () {
            result.current.openCreateReportConfirmation();
        });
        modal = getModal(result.current);
        expect(modal.props.isVisible).toBe(true);
    });
    it('invokes onConfirm and resets state after completion', function () {
        var onConfirm = jest.fn();
        var result = (0, react_native_1.renderHook)(function () {
            return (0, useCreateEmptyReportConfirmation_1.default)({
                policyID: policyID,
                policyName: policyName,
                onConfirm: onConfirm,
            });
        }).result;
        (0, react_native_1.act)(function () {
            result.current.openCreateReportConfirmation();
        });
        var modal = getModal(result.current);
        var confirmHandler = getRequiredHandler(modal.props.onConfirm, 'onConfirm');
        (0, react_native_1.act)(function () {
            confirmHandler();
        });
        expect(onConfirm).toHaveBeenCalledTimes(1);
        modal = getModal(result.current);
        expect(modal.props.isVisible).toBe(false);
    });
    it('calls onCancel when cancellation occurs', function () {
        var onConfirm = jest.fn();
        var onCancel = jest.fn();
        var result = (0, react_native_1.renderHook)(function () {
            return (0, useCreateEmptyReportConfirmation_1.default)({
                policyID: policyID,
                policyName: policyName,
                onConfirm: onConfirm,
                onCancel: onCancel,
            });
        }).result;
        (0, react_native_1.act)(function () {
            result.current.openCreateReportConfirmation();
        });
        var modal = getModal(result.current);
        var cancelHandler = getRequiredHandler(modal.props.onCancel, 'onCancel');
        (0, react_native_1.act)(function () {
            cancelHandler();
        });
        expect(onConfirm).not.toHaveBeenCalled();
        expect(onCancel).toHaveBeenCalledTimes(1);
        var updatedModal = getModal(result.current);
        expect(updatedModal.props.isVisible).toBe(false);
    });
    it('navigates to reports search when link in prompt is pressed', function () {
        var onConfirm = jest.fn();
        var result = (0, react_native_1.renderHook)(function () {
            return (0, useCreateEmptyReportConfirmation_1.default)({
                policyID: policyID,
                policyName: '',
                onConfirm: onConfirm,
            });
        }).result;
        var modal = getModal(result.current);
        var unmount = (0, react_native_1.render)(modal.props.prompt).unmount;
        var onPress = mockTextLinkProps === null || mockTextLinkProps === void 0 ? void 0 : mockTextLinkProps.onPress;
        expect(onPress).toBeDefined();
        (0, react_native_1.act)(function () {
            onPress === null || onPress === void 0 ? void 0 : onPress();
        });
        expect(Navigation_1.default.navigate).toHaveBeenCalledWith(expectedSearchRoute);
        unmount();
    });
    it('calls onCancel when reports link in prompt is pressed', function () {
        var onConfirm = jest.fn();
        var onCancel = jest.fn();
        var result = (0, react_native_1.renderHook)(function () {
            return (0, useCreateEmptyReportConfirmation_1.default)({
                policyID: policyID,
                policyName: policyName,
                onConfirm: onConfirm,
                onCancel: onCancel,
            });
        }).result;
        (0, react_native_1.act)(function () {
            result.current.openCreateReportConfirmation();
        });
        var modal = getModal(result.current);
        var unmount = (0, react_native_1.render)(modal.props.prompt).unmount;
        var onPress = mockTextLinkProps === null || mockTextLinkProps === void 0 ? void 0 : mockTextLinkProps.onPress;
        expect(onPress).toBeDefined();
        (0, react_native_1.act)(function () {
            onPress === null || onPress === void 0 ? void 0 : onPress();
        });
        expect(onCancel).toHaveBeenCalledTimes(1);
        unmount();
    });
    it('retains displayed workspace name while parent clears selection', function () {
        var onConfirm = jest.fn();
        var onCancel = jest.fn();
        var initialPolicyName = policyName;
        var _a = (0, react_native_1.renderHook)(function (_a) {
            var currentPolicyName = _a.policyName, currentOnCancel = _a.onCancel;
            return (0, useCreateEmptyReportConfirmation_1.default)({
                policyID: policyID,
                policyName: currentPolicyName,
                onConfirm: onConfirm,
                onCancel: currentOnCancel,
            });
        }, {
            initialProps: {
                policyName: initialPolicyName,
                onCancel: onCancel,
            },
        }), result = _a.result, rerender = _a.rerender;
        (0, react_native_1.act)(function () {
            result.current.openCreateReportConfirmation();
        });
        var modal = getModal(result.current);
        var renderedPrompt = (0, react_native_1.render)(modal.props.prompt);
        expect(JSON.stringify(renderedPrompt.toJSON())).toContain("report.newReport.emptyReportConfirmationPrompt:".concat(initialPolicyName));
        renderedPrompt.unmount();
        rerender({ policyName: '', onCancel: onCancel });
        var updatedModal = getModal(result.current);
        var renderedPromptAfterClear = (0, react_native_1.render)(updatedModal.props.prompt);
        expect(JSON.stringify(renderedPromptAfterClear.toJSON())).toContain("report.newReport.emptyReportConfirmationPrompt:".concat(initialPolicyName));
        renderedPromptAfterClear.unmount();
    });
    it('uses updated workspace name on subsequent opens', function () {
        var onConfirm = jest.fn();
        var onCancel = jest.fn();
        var initialPolicyName = policyName;
        var updatedPolicyName = 'Finance Team';
        var _a = (0, react_native_1.renderHook)(function (_a) {
            var currentPolicyName = _a.policyName, currentOnCancel = _a.onCancel;
            return (0, useCreateEmptyReportConfirmation_1.default)({
                policyID: policyID,
                policyName: currentPolicyName,
                onConfirm: onConfirm,
                onCancel: currentOnCancel,
            });
        }, {
            initialProps: {
                policyName: initialPolicyName,
                onCancel: onCancel,
            },
        }), result = _a.result, rerender = _a.rerender;
        (0, react_native_1.act)(function () {
            result.current.openCreateReportConfirmation();
        });
        var modal = getModal(result.current);
        var renderedPrompt = (0, react_native_1.render)(modal.props.prompt);
        expect(JSON.stringify(renderedPrompt.toJSON())).toContain("report.newReport.emptyReportConfirmationPrompt:".concat(initialPolicyName));
        renderedPrompt.unmount();
        var cancelHandler = getRequiredHandler(modal.props.onCancel, 'onCancel');
        (0, react_native_1.act)(function () {
            cancelHandler();
        });
        rerender({ policyName: updatedPolicyName, onCancel: onCancel });
        (0, react_native_1.act)(function () {
            result.current.openCreateReportConfirmation();
        });
        modal = getModal(result.current);
        var renderedPromptAfterUpdate = (0, react_native_1.render)(modal.props.prompt);
        expect(JSON.stringify(renderedPromptAfterUpdate.toJSON())).toContain("report.newReport.emptyReportConfirmationPrompt:".concat(updatedPolicyName));
        renderedPromptAfterUpdate.unmount();
    });
    it('falls back to generic workspace name in translations when necessary', function () {
        var onConfirm = jest.fn();
        (0, react_native_1.renderHook)(function () {
            return (0, useCreateEmptyReportConfirmation_1.default)({
                policyID: policyID,
                policyName: '   ',
                onConfirm: onConfirm,
            });
        });
        expect(mockTranslate).toHaveBeenCalledWith('report.newReport.genericWorkspaceName');
    });
});
