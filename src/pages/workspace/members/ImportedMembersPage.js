"use strict";
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
var react_1 = require("react");
var react_native_1 = require("react-native");
var HeaderWithBackButton_1 = require("@components/HeaderWithBackButton");
var ImportSpreadsheetColumns_1 = require("@components/ImportSpreadsheetColumns");
var ImportSpreadsheetConfirmModal_1 = require("@components/ImportSpreadsheetConfirmModal");
var ScreenWrapper_1 = require("@components/ScreenWrapper");
var useCloseImportPage_1 = require("@hooks/useCloseImportPage");
var useLocalize_1 = require("@hooks/useLocalize");
var useOnyx_1 = require("@hooks/useOnyx");
var usePolicy_1 = require("@hooks/usePolicy");
var Member_1 = require("@libs/actions/Policy/Member");
var importSpreadsheetUtils_1 = require("@libs/importSpreadsheetUtils");
var Navigation_1 = require("@libs/Navigation/Navigation");
var PolicyUtils_1 = require("@libs/PolicyUtils");
var NotFoundPage_1 = require("@pages/ErrorPage/NotFoundPage");
var CONST_1 = require("@src/CONST");
var ONYXKEYS_1 = require("@src/ONYXKEYS");
var ROUTES_1 = require("@src/ROUTES");
var isLoadingOnyxValue_1 = require("@src/types/utils/isLoadingOnyxValue");
function ImportedMembersPage(_a) {
    var _b, _c;
    var route = _a.route;
    var translate = (0, useLocalize_1.default)().translate;
    var _d = (0, useOnyx_1.default)(ONYXKEYS_1.default.IMPORTED_SPREADSHEET, { canBeMissing: true }), spreadsheet = _d[0], spreadsheetMetadata = _d[1];
    var _e = (0, react_1.useState)(false), isImporting = _e[0], setIsImporting = _e[1];
    var _f = (0, react_1.useState)(false), isValidationEnabled = _f[0], setIsValidationEnabled = _f[1];
    var setIsClosing = (0, useCloseImportPage_1.default)().setIsClosing;
    var _g = (0, react_1.useState)(true), shouldShowConfirmModal = _g[0], setShouldShowConfirmModal = _g[1];
    var policyID = route.params.policyID;
    var policy = (0, usePolicy_1.default)(policyID);
    var columnNames = (0, importSpreadsheetUtils_1.generateColumnNames)((_c = (_b = spreadsheet === null || spreadsheet === void 0 ? void 0 : spreadsheet.data) === null || _b === void 0 ? void 0 : _b.length) !== null && _c !== void 0 ? _c : 0);
    var _h = (spreadsheet !== null && spreadsheet !== void 0 ? spreadsheet : {}).containsHeader, containsHeader = _h === void 0 ? true : _h;
    var columnRoles = [
        { text: translate('common.ignore'), value: CONST_1.default.CSV_IMPORT_COLUMNS.IGNORE },
        { text: translate('common.email'), value: CONST_1.default.CSV_IMPORT_COLUMNS.EMAIL, isRequired: true },
        { text: translate('common.role'), value: CONST_1.default.CSV_IMPORT_COLUMNS.ROLE },
        { text: translate('common.submitTo'), value: CONST_1.default.CSV_IMPORT_COLUMNS.SUBMIT_TO },
        { text: translate('common.forwardTo'), value: CONST_1.default.CSV_IMPORT_COLUMNS.APPROVE_TO },
    ];
    var requiredColumns = columnRoles.filter(function (role) { return role.isRequired; }).map(function (role) { return role; });
    // checks if all required columns are mapped and no column is mapped more than once
    // returns found errors or empty object if both conditions are met
    var validate = (0, react_1.useCallback)(function () {
        var _a;
        var columns = Object.values((_a = spreadsheet === null || spreadsheet === void 0 ? void 0 : spreadsheet.columns) !== null && _a !== void 0 ? _a : {});
        var errors = {};
        var missingRequiredColumns = requiredColumns.find(function (requiredColumn) { return !columns.includes(requiredColumn.value); });
        if (missingRequiredColumns) {
            errors.required = translate('spreadsheet.fieldNotMapped', { fieldName: missingRequiredColumns.text });
        }
        else {
            var duplicate = (0, importSpreadsheetUtils_1.findDuplicate)(columns);
            if (duplicate) {
                errors.duplicates = translate('spreadsheet.singleFieldMultipleColumns', { fieldName: duplicate });
            }
            else {
                errors = {};
            }
        }
        return errors;
    }, [requiredColumns, spreadsheet === null || spreadsheet === void 0 ? void 0 : spreadsheet.columns, translate]);
    var importMembers = (0, react_1.useCallback)(function () {
        var _a, _b, _c;
        setIsValidationEnabled(true);
        var errors = validate();
        if (Object.keys(errors).length > 0) {
            return;
        }
        var isRoleMissing = false;
        var columns = Object.values((_a = spreadsheet === null || spreadsheet === void 0 ? void 0 : spreadsheet.columns) !== null && _a !== void 0 ? _a : {});
        var containsAdvanceApprovalColumns = columns.includes(CONST_1.default.CSV_IMPORT_COLUMNS.SUBMIT_TO) || columns.includes(CONST_1.default.CSV_IMPORT_COLUMNS.APPROVE_TO);
        var membersRolesColumn = columns.findIndex(function (column) { return column === CONST_1.default.CSV_IMPORT_COLUMNS.ROLE; });
        var hasAuditorRole = membersRolesColumn !== -1 &&
            ((_c = (_b = spreadsheet === null || spreadsheet === void 0 ? void 0 : spreadsheet.data) === null || _b === void 0 ? void 0 : _b.at(membersRolesColumn)) === null || _c === void 0 ? void 0 : _c.some(function (role, index) { var _a, _b; return (containsHeader ? (_b = (_a = spreadsheet === null || spreadsheet === void 0 ? void 0 : spreadsheet.data) === null || _a === void 0 ? void 0 : _a.at(membersRolesColumn)) === null || _b === void 0 ? void 0 : _b.at(index + 1) : (role !== null && role !== void 0 ? role : '')) === CONST_1.default.POLICY.ROLE.AUDITOR; }));
        if (containsAdvanceApprovalColumns && !(0, PolicyUtils_1.isControlPolicy)(policy)) {
            Navigation_1.default.navigate(ROUTES_1.default.WORKSPACE_UPGRADE.getRoute(route.params.policyID, CONST_1.default.UPGRADE_FEATURE_INTRO_MAPPING.approvals.alias, Navigation_1.default.getActiveRoute()));
            return;
        }
        if (hasAuditorRole && !(0, PolicyUtils_1.isControlPolicy)(policy)) {
            Navigation_1.default.navigate(ROUTES_1.default.WORKSPACE_UPGRADE.getRoute(route.params.policyID, CONST_1.default.UPGRADE_FEATURE_INTRO_MAPPING.auditor.alias, Navigation_1.default.getActiveRoute()));
            return;
        }
        var membersEmailsColumn = columns.findIndex(function (column) { return column === CONST_1.default.CSV_IMPORT_COLUMNS.EMAIL; });
        var membersEmails = spreadsheet === null || spreadsheet === void 0 ? void 0 : spreadsheet.data[membersEmailsColumn].map(function (email) { return email; });
        var membersRoles = membersRolesColumn !== -1 ? spreadsheet === null || spreadsheet === void 0 ? void 0 : spreadsheet.data[membersRolesColumn].map(function (role) { return role; }) : [];
        var membersSubmitsToColumn = columns.findIndex(function (column) { return column === CONST_1.default.CSV_IMPORT_COLUMNS.SUBMIT_TO; });
        var membersForwardsToColumn = columns.findIndex(function (column) { return column === CONST_1.default.CSV_IMPORT_COLUMNS.APPROVE_TO; });
        var membersSubmitsTo = membersSubmitsToColumn !== -1 ? spreadsheet === null || spreadsheet === void 0 ? void 0 : spreadsheet.data[membersSubmitsToColumn].map(function (submitsTo) { return submitsTo; }) : [];
        var membersForwardsTo = membersForwardsToColumn !== -1 ? spreadsheet === null || spreadsheet === void 0 ? void 0 : spreadsheet.data[membersForwardsToColumn].map(function (forwardsTo) { return forwardsTo; }) : [];
        var members = membersEmails === null || membersEmails === void 0 ? void 0 : membersEmails.slice(containsHeader ? 1 : 0).map(function (email, index) {
            var _a, _b, _c;
            var isPolicyMember = (0, PolicyUtils_1.isPolicyMemberWithoutPendingDelete)(email, policy);
            var role = isPolicyMember ? ((_c = (_b = (_a = policy === null || policy === void 0 ? void 0 : policy.employeeList) === null || _a === void 0 ? void 0 : _a[email]) === null || _b === void 0 ? void 0 : _b.role) !== null && _c !== void 0 ? _c : '') : '';
            if (membersRolesColumn !== -1 && (membersRoles === null || membersRoles === void 0 ? void 0 : membersRoles[containsHeader ? index + 1 : index])) {
                role = membersRoles === null || membersRoles === void 0 ? void 0 : membersRoles[containsHeader ? index + 1 : index];
            }
            if (membersRolesColumn !== -1 && !role) {
                isRoleMissing = true;
            }
            var submitsTo = '';
            if (membersSubmitsToColumn !== -1 && (membersSubmitsTo === null || membersSubmitsTo === void 0 ? void 0 : membersSubmitsTo[containsHeader ? index + 1 : index])) {
                submitsTo = membersSubmitsTo === null || membersSubmitsTo === void 0 ? void 0 : membersSubmitsTo[containsHeader ? index + 1 : index];
            }
            var forwardsTo = '';
            if (membersForwardsToColumn !== -1 && (membersForwardsTo === null || membersForwardsTo === void 0 ? void 0 : membersForwardsTo[containsHeader ? index + 1 : index])) {
                forwardsTo = membersForwardsTo === null || membersForwardsTo === void 0 ? void 0 : membersForwardsTo[containsHeader ? index + 1 : index];
            }
            return {
                email: email,
                role: role,
                submitsTo: submitsTo,
                forwardsTo: forwardsTo,
            };
        });
        var allMembers = __spreadArray([], (members !== null && members !== void 0 ? members : []), true);
        // Add submitsTo and forwardsTo members if they are not in the workspace
        members === null || members === void 0 ? void 0 : members.forEach(function (member) {
            var _a, _b, _c;
            if (member.submitsTo && !allMembers.some(function (m) { return m.email === member.submitsTo; }) && !(0, PolicyUtils_1.isPolicyMemberWithoutPendingDelete)(member.submitsTo, policy)) {
                isRoleMissing = true;
                allMembers.push({
                    email: member.submitsTo,
                    role: '',
                    submitsTo: '',
                    forwardsTo: '',
                });
            }
            if (member.forwardsTo && !allMembers.some(function (m) { return m.email === member.forwardsTo; }) && !(0, PolicyUtils_1.isPolicyMemberWithoutPendingDelete)(member.forwardsTo, policy)) {
                isRoleMissing = true;
                allMembers.push({
                    email: member.forwardsTo,
                    role: (_c = (_b = (_a = policy === null || policy === void 0 ? void 0 : policy.employeeList) === null || _a === void 0 ? void 0 : _a[member.forwardsTo]) === null || _b === void 0 ? void 0 : _b.role) !== null && _c !== void 0 ? _c : '',
                    submitsTo: '',
                    forwardsTo: '',
                });
            }
        });
        if (isRoleMissing) {
            (0, Member_1.setImportedSpreadsheetMemberData)(allMembers);
            Navigation_1.default.navigate(ROUTES_1.default.WORKSPACE_MEMBERS_IMPORTED_CONFIRMATION.getRoute(policyID));
        }
        else {
            setIsImporting(true);
            (0, Member_1.importPolicyMembers)(policyID, allMembers);
        }
    }, [validate, spreadsheet === null || spreadsheet === void 0 ? void 0 : spreadsheet.columns, spreadsheet === null || spreadsheet === void 0 ? void 0 : spreadsheet.data, policy, containsHeader, route.params.policyID, policyID]);
    if (!spreadsheet && (0, isLoadingOnyxValue_1.default)(spreadsheetMetadata)) {
        return;
    }
    var spreadsheetColumns = spreadsheet === null || spreadsheet === void 0 ? void 0 : spreadsheet.data;
    if (!spreadsheetColumns) {
        return <NotFoundPage_1.default />;
    }
    var closeImportPageAndModal = function () {
        setIsClosing(true);
        setIsImporting(false);
        setShouldShowConfirmModal(false);
    };
    return (<ScreenWrapper_1.default testID={ImportedMembersPage.displayName} enableEdgeToEdgeBottomSafeAreaPadding shouldShowOfflineIndicatorInWideScreen>
            <HeaderWithBackButton_1.default title={translate('workspace.people.importMembers')} onBackButtonPress={function () { return Navigation_1.default.goBack(ROUTES_1.default.WORKSPACE_MEMBERS_IMPORT.getRoute(policyID)); }}/>
            <ImportSpreadsheetColumns_1.default spreadsheetColumns={spreadsheetColumns} columnNames={columnNames} importFunction={importMembers} errors={isValidationEnabled ? validate() : undefined} columnRoles={columnRoles} isButtonLoading={isImporting} learnMoreLink={CONST_1.default.IMPORT_SPREADSHEET.MEMBERS_ARTICLE_LINK}/>
            <ImportSpreadsheetConfirmModal_1.default isVisible={(spreadsheet === null || spreadsheet === void 0 ? void 0 : spreadsheet.shouldFinalModalBeOpened) && shouldShowConfirmModal} closeImportPageAndModal={closeImportPageAndModal} onModalHide={function () {
            // eslint-disable-next-line @typescript-eslint/no-deprecated
            react_native_1.InteractionManager.runAfterInteractions(function () { return Navigation_1.default.goBack(ROUTES_1.default.WORKSPACE_MEMBERS.getRoute(policyID)); });
        }}/>
        </ScreenWrapper_1.default>);
}
ImportedMembersPage.displayName = 'ImportedMembersPage';
exports.default = ImportedMembersPage;
