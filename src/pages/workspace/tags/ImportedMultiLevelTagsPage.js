"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var HeaderWithBackButton_1 = require("@components/HeaderWithBackButton");
var ImportSpreadsheetColumns_1 = require("@components/ImportSpreadsheetColumns");
var ImportSpreadsheetConfirmModal_1 = require("@components/ImportSpreadsheetConfirmModal");
var ScreenWrapper_1 = require("@components/ScreenWrapper");
var useCloseImportPage_1 = require("@hooks/useCloseImportPage");
var useLocalize_1 = require("@hooks/useLocalize");
var useOnyx_1 = require("@hooks/useOnyx");
var Tag_1 = require("@libs/actions/Policy/Tag");
var importSpreadsheetUtils_1 = require("@libs/importSpreadsheetUtils");
var Navigation_1 = require("@libs/Navigation/Navigation");
var NotFoundPage_1 = require("@pages/ErrorPage/NotFoundPage");
var CONST_1 = require("@src/CONST");
var ONYXKEYS_1 = require("@src/ONYXKEYS");
var ROUTES_1 = require("@src/ROUTES");
var isLoadingOnyxValue_1 = require("@src/types/utils/isLoadingOnyxValue");
function ImportedMultiLevelTagsPage(_a) {
    var _b, _c;
    var route = _a.route;
    var translate = (0, useLocalize_1.default)().translate;
    var _d = (0, useOnyx_1.default)(ONYXKEYS_1.default.IMPORTED_SPREADSHEET, { canBeMissing: true }), spreadsheet = _d[0], spreadsheetMetadata = _d[1];
    var _e = (0, react_1.useState)(false), isImportingTags = _e[0], setIsImportingTags = _e[1];
    var policyID = route.params.policyID;
    var columnNames = (0, importSpreadsheetUtils_1.generateColumnNames)((_c = (_b = spreadsheet === null || spreadsheet === void 0 ? void 0 : spreadsheet.data) === null || _b === void 0 ? void 0 : _b.length) !== null && _c !== void 0 ? _c : 0);
    var setIsClosing = (0, useCloseImportPage_1.default)().setIsClosing;
    var importTags = (0, react_1.useCallback)(function () {
        setIsImportingTags(true);
        (0, Tag_1.importMultiLevelTags)(policyID, spreadsheet);
    }, [spreadsheet, policyID]);
    if (!spreadsheet && (0, isLoadingOnyxValue_1.default)(spreadsheetMetadata)) {
        return;
    }
    var spreadsheetColumns = spreadsheet === null || spreadsheet === void 0 ? void 0 : spreadsheet.data;
    if (!spreadsheetColumns) {
        return <NotFoundPage_1.default />;
    }
    var closeImportPageAndModal = function () {
        setIsClosing(true);
        setIsImportingTags(false);
        Navigation_1.default.goBack(ROUTES_1.default.WORKSPACE_TAGS.getRoute(policyID));
    };
    return (<ScreenWrapper_1.default testID={ImportedMultiLevelTagsPage.displayName} enableEdgeToEdgeBottomSafeAreaPadding shouldShowOfflineIndicatorInWideScreen>
            <HeaderWithBackButton_1.default title={translate('workspace.tags.importTags')} onBackButtonPress={function () { return Navigation_1.default.goBack(ROUTES_1.default.WORKSPACE_MULTI_LEVEL_TAGS_IMPORT_SETTINGS.getRoute(policyID)); }}/>
            <ImportSpreadsheetColumns_1.default spreadsheetColumns={spreadsheetColumns} columnNames={columnNames} importFunction={importTags} isButtonLoading={isImportingTags} learnMoreLink={CONST_1.default.IMPORT_SPREADSHEET.MULTI_LEVEL_TAGS_ARTICLE_LINK} shouldShowColumnHeader={false} shouldShowDropdownMenu={false} customHeaderText={translate('workspace.tags.importMultiLevelTagsSupportingText')}/>

            <ImportSpreadsheetConfirmModal_1.default isVisible={spreadsheet === null || spreadsheet === void 0 ? void 0 : spreadsheet.shouldFinalModalBeOpened} closeImportPageAndModal={closeImportPageAndModal}/>
        </ScreenWrapper_1.default>);
}
ImportedMultiLevelTagsPage.displayName = 'ImportedMultiLevelTagsPage';
exports.default = ImportedMultiLevelTagsPage;
