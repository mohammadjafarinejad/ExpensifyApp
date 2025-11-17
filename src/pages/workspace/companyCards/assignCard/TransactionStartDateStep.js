"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var date_fns_1 = require("date-fns");
var react_1 = require("react");
var react_native_1 = require("react-native");
var Button_1 = require("@components/Button");
var DatePicker_1 = require("@components/DatePicker");
var InteractiveStepWrapper_1 = require("@components/InteractiveStepWrapper");
var SelectionList_1 = require("@components/SelectionList");
var SingleSelectListItem_1 = require("@components/SelectionListWithSections/SingleSelectListItem");
var Text_1 = require("@components/Text");
var useLocalize_1 = require("@hooks/useLocalize");
var useOnyx_1 = require("@hooks/useOnyx");
var useThemeStyles_1 = require("@hooks/useThemeStyles");
var PersonalDetailsUtils_1 = require("@libs/PersonalDetailsUtils");
var ValidationUtils_1 = require("@libs/ValidationUtils");
var CompanyCards_1 = require("@userActions/CompanyCards");
var CONST_1 = require("@src/CONST");
var ONYXKEYS_1 = require("@src/ONYXKEYS");
function TransactionStartDateStep() {
    var _a, _b, _c, _d;
    var translate = (0, useLocalize_1.default)().translate;
    var styles = (0, useThemeStyles_1.default)();
    var assignCard = (0, useOnyx_1.default)(ONYXKEYS_1.default.ASSIGN_CARD, { canBeMissing: true })[0];
    var isEditing = assignCard === null || assignCard === void 0 ? void 0 : assignCard.isEditing;
    var data = assignCard === null || assignCard === void 0 ? void 0 : assignCard.data;
    var assigneeDisplayName = (_c = (_b = (0, PersonalDetailsUtils_1.getPersonalDetailByEmail)((_a = data === null || data === void 0 ? void 0 : data.email) !== null && _a !== void 0 ? _a : '')) === null || _b === void 0 ? void 0 : _b.displayName) !== null && _c !== void 0 ? _c : '';
    var _e = (0, react_1.useState)((_d = data === null || data === void 0 ? void 0 : data.dateOption) !== null && _d !== void 0 ? _d : CONST_1.default.COMPANY_CARD.TRANSACTION_START_DATE_OPTIONS.CUSTOM), dateOptionSelected = _e[0], setDateOptionSelected = _e[1];
    var _f = (0, react_1.useState)(''), errorText = _f[0], setErrorText = _f[1];
    var _g = (0, react_1.useState)(function () { var _a, _b; return (_b = (_a = assignCard === null || assignCard === void 0 ? void 0 : assignCard.startDate) !== null && _a !== void 0 ? _a : data === null || data === void 0 ? void 0 : data.startDate) !== null && _b !== void 0 ? _b : (0, date_fns_1.format)(new Date(), CONST_1.default.DATE.FNS_FORMAT_STRING); }), startDate = _g[0], setStartDate = _g[1];
    var handleBackButtonPress = function () {
        if (isEditing) {
            (0, CompanyCards_1.setAssignCardStepAndData)({
                currentStep: CONST_1.default.COMPANY_CARD.STEP.CONFIRMATION,
                isEditing: false,
            });
            return;
        }
        (0, CompanyCards_1.setAssignCardStepAndData)({ currentStep: CONST_1.default.COMPANY_CARD.STEP.CARD });
    };
    var handleSelectDateOption = function (dateOption) {
        setErrorText('');
        setDateOptionSelected(dateOption);
        if (dateOption === CONST_1.default.COMPANY_CARD.TRANSACTION_START_DATE_OPTIONS.FROM_BEGINNING) {
            return;
        }
        setStartDate((0, date_fns_1.format)(new Date(), CONST_1.default.DATE.FNS_FORMAT_STRING));
    };
    var submit = function () {
        if (dateOptionSelected === CONST_1.default.COMPANY_CARD.TRANSACTION_START_DATE_OPTIONS.CUSTOM && !(0, ValidationUtils_1.isRequiredFulfilled)(startDate)) {
            setErrorText(translate('common.error.fieldRequired'));
            return;
        }
        var date90DaysBack = (0, date_fns_1.format)((0, date_fns_1.subDays)(new Date(), 90), CONST_1.default.DATE.FNS_FORMAT_STRING);
        (0, CompanyCards_1.setAssignCardStepAndData)({
            currentStep: CONST_1.default.COMPANY_CARD.STEP.CONFIRMATION,
            data: {
                dateOption: dateOptionSelected,
                startDate: dateOptionSelected === CONST_1.default.COMPANY_CARD.TRANSACTION_START_DATE_OPTIONS.FROM_BEGINNING ? date90DaysBack : startDate,
            },
            isEditing: false,
        });
    };
    var dateOptions = (0, react_1.useMemo)(function () { return [
        {
            value: CONST_1.default.COMPANY_CARD.TRANSACTION_START_DATE_OPTIONS.FROM_BEGINNING,
            text: translate('workspace.companyCards.fromTheBeginning'),
            keyForList: CONST_1.default.COMPANY_CARD.TRANSACTION_START_DATE_OPTIONS.FROM_BEGINNING,
            isSelected: dateOptionSelected === CONST_1.default.COMPANY_CARD.TRANSACTION_START_DATE_OPTIONS.FROM_BEGINNING,
        },
        {
            value: CONST_1.default.COMPANY_CARD.TRANSACTION_START_DATE_OPTIONS.CUSTOM,
            text: translate('workspace.companyCards.customStartDate'),
            keyForList: CONST_1.default.COMPANY_CARD.TRANSACTION_START_DATE_OPTIONS.CUSTOM,
            isSelected: dateOptionSelected === CONST_1.default.COMPANY_CARD.TRANSACTION_START_DATE_OPTIONS.CUSTOM,
        },
    ]; }, [dateOptionSelected, translate]);
    return (<InteractiveStepWrapper_1.default wrapperID={TransactionStartDateStep.displayName} handleBackButtonPress={handleBackButtonPress} startStepIndex={2} stepNames={CONST_1.default.COMPANY_CARD.STEP_NAMES} headerTitle={translate('workspace.companyCards.assignCard')} headerSubtitle={assigneeDisplayName} enableEdgeToEdgeBottomSafeAreaPadding>
            <Text_1.default style={[styles.textHeadlineLineHeightXXL, styles.ph5, styles.mt3]}>{translate('workspace.companyCards.chooseTransactionStartDate')}</Text_1.default>
            <Text_1.default style={[styles.textSupporting, styles.ph5, styles.mv3]}>{translate('workspace.companyCards.startDateDescription')}</Text_1.default>
            <react_native_1.View style={styles.flex1}>
                <SelectionList_1.default ListItem={SingleSelectListItem_1.default} onSelectRow={function (_a) {
        var value = _a.value;
        return handleSelectDateOption(value);
    }} data={dateOptions} shouldSingleExecuteRowSelect initiallyFocusedItemKey={dateOptionSelected} shouldUpdateFocusedIndex addBottomSafeAreaPadding shouldHighlightSelectedItem={false} footerContent={<Button_1.default success large pressOnEnter text={translate(isEditing ? 'common.confirm' : 'common.next')} onPress={submit}/>} listFooterContent={dateOptionSelected === CONST_1.default.COMPANY_CARD.TRANSACTION_START_DATE_OPTIONS.CUSTOM ? (<react_native_1.View style={[styles.ph5]}>
                                <DatePicker_1.default inputID="" value={startDate} label={translate('iou.startDate')} onInputChange={function (value) {
                setErrorText('');
                setStartDate(value);
            }} minDate={CONST_1.default.CALENDAR_PICKER.MIN_DATE} maxDate={new Date()} errorText={errorText}/>
                            </react_native_1.View>) : null}/>
            </react_native_1.View>
        </InteractiveStepWrapper_1.default>);
}
TransactionStartDateStep.displayName = 'TransactionStartDateStep';
exports.default = TransactionStartDateStep;
