"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = useCreateEmptyReportConfirmation;
var react_1 = require("react");
var ConfirmModal_1 = require("@components/ConfirmModal");
var Text_1 = require("@components/Text");
var TextLink_1 = require("@components/TextLink");
var Navigation_1 = require("@libs/Navigation/Navigation");
var SearchQueryUtils_1 = require("@libs/SearchQueryUtils");
var CONST_1 = require("@src/CONST");
var ROUTES_1 = require("@src/ROUTES");
var useLocalize_1 = require("./useLocalize");
/**
 * A React hook that provides a confirmation modal for creating empty reports.
 * When a user attempts to create a new report in a workspace where they already have an empty report,
 * this hook displays a confirmation modal to prevent accidental duplicate empty reports.
 *
 * @param params - Configuration object for the hook
 * @param params.policyName - The display name of the policy/workspace
 * @param params.onConfirm - Callback function to execute when user confirms report creation
 * @returns An object containing:
 *          - openCreateReportConfirmation: Function to open the confirmation modal
 *          - CreateReportConfirmationModal: The confirmation modal React component to render
 *
 * @example
 * const {openCreateReportConfirmation, CreateReportConfirmationModal} = useCreateEmptyReportConfirmation({
 *     policyID: 'policy123',
 *     policyName: 'Engineering Team',
 *     onConfirm: handleCreateReport,
 * });
 *
 */
function useCreateEmptyReportConfirmation(_a) {
    var policyName = _a.policyName, onConfirm = _a.onConfirm, onCancel = _a.onCancel;
    var translate = (0, useLocalize_1.default)().translate;
    var workspaceDisplayName = (0, react_1.useMemo)(function () { return ((policyName === null || policyName === void 0 ? void 0 : policyName.trim().length) ? policyName : translate('report.newReport.genericWorkspaceName')); }, [policyName, translate]);
    var _b = (0, react_1.useState)(false), isVisible = _b[0], setIsVisible = _b[1];
    var _c = (0, react_1.useState)(workspaceDisplayName), modalWorkspaceName = _c[0], setModalWorkspaceName = _c[1];
    var handleConfirm = (0, react_1.useCallback)(function () {
        onConfirm();
        setIsVisible(false);
    }, [onConfirm]);
    var handleCancel = (0, react_1.useCallback)(function () {
        onCancel === null || onCancel === void 0 ? void 0 : onCancel();
        setIsVisible(false);
    }, [onCancel]);
    var handleReportsLinkPress = (0, react_1.useCallback)(function () {
        onCancel === null || onCancel === void 0 ? void 0 : onCancel();
        setIsVisible(false);
        Navigation_1.default.navigate(ROUTES_1.default.SEARCH_ROOT.getRoute({ query: (0, SearchQueryUtils_1.buildCannedSearchQuery)({ type: CONST_1.default.SEARCH.DATA_TYPES.EXPENSE_REPORT }) }));
    }, [onCancel]);
    var openCreateReportConfirmation = (0, react_1.useCallback)(function () {
        // The caller is responsible for determining if empty report confirmation
        // should be shown. We simply open the modal when called.
        setModalWorkspaceName(workspaceDisplayName);
        setIsVisible(true);
    }, [workspaceDisplayName]);
    var prompt = (0, react_1.useMemo)(function () { return (<Text_1.default>
                {translate('report.newReport.emptyReportConfirmationPrompt', { workspaceName: modalWorkspaceName })}{' '}
                <TextLink_1.default onPress={handleReportsLinkPress}>{translate('report.newReport.emptyReportConfirmationPromptLink')}.</TextLink_1.default>
            </Text_1.default>); }, [handleReportsLinkPress, modalWorkspaceName, translate]);
    var CreateReportConfirmationModal = (0, react_1.useMemo)(function () { return (<ConfirmModal_1.default confirmText={translate('report.newReport.createReport')} cancelText={translate('common.cancel')} isVisible={isVisible} onConfirm={handleConfirm} onCancel={handleCancel} prompt={prompt} title={"".concat(translate('report.newReport.emptyReportConfirmationTitle'), " ")} // Adding a space at the end because of this bug in react-native: https://github.com/facebook/react-native/issues/53286
    />); }, [handleCancel, handleConfirm, isVisible, prompt, translate]);
    return {
        openCreateReportConfirmation: openCreateReportConfirmation,
        CreateReportConfirmationModal: CreateReportConfirmationModal,
    };
}
