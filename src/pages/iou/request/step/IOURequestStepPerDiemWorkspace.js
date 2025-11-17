"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_native_1 = require("react-native");
var Expensicons = require("@components/Icon/Expensicons");
var SearchBar_1 = require("@components/SearchBar");
var SelectionList_1 = require("@components/SelectionList");
var UserListItem_1 = require("@components/SelectionList/ListItem/UserListItem");
var Text_1 = require("@components/Text");
var useCurrentUserPersonalDetails_1 = require("@hooks/useCurrentUserPersonalDetails");
var useLocalize_1 = require("@hooks/useLocalize");
var useOnyx_1 = require("@hooks/useOnyx");
var useSearchResults_1 = require("@hooks/useSearchResults");
var useThemeStyles_1 = require("@hooks/useThemeStyles");
var Navigation_1 = require("@libs/Navigation/Navigation");
var PolicyUtils_1 = require("@libs/PolicyUtils");
var ReportUtils_1 = require("@libs/ReportUtils");
var tokenizedSearch_1 = require("@libs/tokenizedSearch");
var IOU_1 = require("@userActions/IOU");
var CONST_1 = require("@src/CONST");
var ONYXKEYS_1 = require("@src/ONYXKEYS");
var ROUTES_1 = require("@src/ROUTES");
var withFullTransactionOrNotFound_1 = require("./withFullTransactionOrNotFound");
var withWritableReportOrNotFound_1 = require("./withWritableReportOrNotFound");
function IOURequestStepPerDiemWorkspace(_a) {
    var _b = _a.route.params, transactionID = _b.transactionID, action = _b.action, iouType = _b.iouType, transaction = _a.transaction;
    var styles = (0, useThemeStyles_1.default)();
    var _c = (0, useLocalize_1.default)(), translate = _c.translate, localeCompare = _c.localeCompare;
    var _d = (0, useCurrentUserPersonalDetails_1.default)(), currentUserLogin = _d.login, accountID = _d.accountID;
    var allPolicies = (0, useOnyx_1.default)(ONYXKEYS_1.default.COLLECTION.POLICY, { canBeMissing: true })[0];
    var selectedWorkspace = (0, react_1.useMemo)(function () { var _a; return (_a = transaction === null || transaction === void 0 ? void 0 : transaction.participants) === null || _a === void 0 ? void 0 : _a[0]; }, [transaction]);
    var workspaceOptions = (0, react_1.useMemo)(function () {
        var availableWorkspaces = (0, PolicyUtils_1.getActivePoliciesWithExpenseChatAndPerDiemEnabled)(allPolicies, currentUserLogin);
        return availableWorkspaces
            .sort(function (policy1, policy2) {
            return (0, PolicyUtils_1.sortWorkspacesBySelected)({ policyID: policy1.id, name: policy1.name }, { policyID: policy2.id, name: policy2.name }, (selectedWorkspace === null || selectedWorkspace === void 0 ? void 0 : selectedWorkspace.policyID) ? [selectedWorkspace === null || selectedWorkspace === void 0 ? void 0 : selectedWorkspace.policyID] : [], localeCompare);
        })
            .map(function (policy) { return ({
            text: policy.name,
            value: policy.id,
            keyForList: policy.id,
            icons: [
                {
                    id: policy.id,
                    source: (policy === null || policy === void 0 ? void 0 : policy.avatarURL) ? policy.avatarURL : (0, ReportUtils_1.getDefaultWorkspaceAvatar)(policy.name),
                    fallbackIcon: Expensicons.FallbackWorkspaceAvatar,
                    name: policy.name,
                    type: CONST_1.default.ICON_TYPE_WORKSPACE,
                },
            ],
            isSelected: (selectedWorkspace === null || selectedWorkspace === void 0 ? void 0 : selectedWorkspace.policyID) === policy.id,
        }); });
    }, [allPolicies, currentUserLogin, selectedWorkspace, localeCompare]);
    var filterWorkspace = (0, react_1.useCallback)(function (workspaceOption, searchInput) {
        var results = (0, tokenizedSearch_1.default)([workspaceOption], searchInput, function (option) { var _a; return [(_a = option.text) !== null && _a !== void 0 ? _a : '']; });
        return results.length > 0;
    }, []);
    var sortWorkspaces = (0, react_1.useCallback)(function (data) {
        return data.sort(function (a, b) { var _a, _b; return localeCompare((_a = a.text) !== null && _a !== void 0 ? _a : '', (_b = b === null || b === void 0 ? void 0 : b.text) !== null && _b !== void 0 ? _b : ''); });
    }, [localeCompare]);
    var _e = (0, useSearchResults_1.default)(workspaceOptions, filterWorkspace, sortWorkspaces), inputValue = _e[0], setInputValue = _e[1], filteredWorkspaceOptions = _e[2];
    var selectWorkspace = function (item) {
        var _a, _b, _c;
        var policyExpenseReportID = (_a = (0, ReportUtils_1.getPolicyExpenseChat)(accountID, item.value)) === null || _a === void 0 ? void 0 : _a.reportID;
        if (!policyExpenseReportID) {
            return;
        }
        // This will be fixed as part of https://github.com/Expensify/Expensify/issues/507850
        // eslint-disable-next-line @typescript-eslint/no-deprecated
        var selectedPolicy = (0, PolicyUtils_1.getPolicy)(item.value, allPolicies);
        var perDiemUnit = (0, PolicyUtils_1.getPerDiemCustomUnit)(selectedPolicy);
        (0, IOU_1.setMoneyRequestParticipants)(transactionID, [
            {
                selected: true,
                accountID: 0,
                isPolicyExpenseChat: true,
                reportID: policyExpenseReportID,
                policyID: item.value,
            },
        ]);
        (0, IOU_1.setCustomUnitID)(transactionID, (_b = perDiemUnit === null || perDiemUnit === void 0 ? void 0 : perDiemUnit.customUnitID) !== null && _b !== void 0 ? _b : CONST_1.default.CUSTOM_UNITS.FAKE_P2P_ID);
        (0, IOU_1.setMoneyRequestCategory)(transactionID, (_c = perDiemUnit === null || perDiemUnit === void 0 ? void 0 : perDiemUnit.defaultCategory) !== null && _c !== void 0 ? _c : '');
        Navigation_1.default.navigate(ROUTES_1.default.MONEY_REQUEST_STEP_DESTINATION.getRoute(action, iouType, transactionID, policyExpenseReportID));
    };
    return (<>
            {workspaceOptions.length > CONST_1.default.SEARCH_ITEM_LIMIT ? (<SearchBar_1.default label={translate('workspace.common.findWorkspace')} inputValue={inputValue} onChangeText={setInputValue} shouldShowEmptyState={workspaceOptions.length > 0 && filteredWorkspaceOptions.length === 0}/>) : (<react_native_1.View style={[styles.optionsListSectionHeader]}>
                    <Text_1.default style={[styles.ph5, styles.textLabelSupporting]}>{translate('iou.chooseWorkspace')}</Text_1.default>
                </react_native_1.View>)}
            <SelectionList_1.default key={selectedWorkspace === null || selectedWorkspace === void 0 ? void 0 : selectedWorkspace.policyID} data={filteredWorkspaceOptions} onSelectRow={selectWorkspace} shouldSingleExecuteRowSelect ListItem={UserListItem_1.default} initiallyFocusedItemKey={selectedWorkspace === null || selectedWorkspace === void 0 ? void 0 : selectedWorkspace.policyID}/>
        </>);
}
IOURequestStepPerDiemWorkspace.displayName = 'IOURequestStepPerDiemWorkspace';
exports.default = (0, withWritableReportOrNotFound_1.default)((0, withFullTransactionOrNotFound_1.default)(IOURequestStepPerDiemWorkspace));
