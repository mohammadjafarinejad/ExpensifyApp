import React, {useCallback} from 'react';
import {EditableCell, useInlineEditState} from '@components/Table/EditableCell';
import TextInput from '@components/TextInput';
import TextWithTooltip from '@components/TextWithTooltip';
import useLocalize from '@hooks/useLocalize';
import useThemeStyles from '@hooks/useThemeStyles';
import {convertToDisplayString} from '@libs/CurrencyUtils';
import {parseFloatAnyLocale, roundToTwoDecimalPlaces} from '@libs/NumberUtils';
import {getTransactionDetails} from '@libs/ReportUtils';
import {getCurrency as getTransactionCurrency, isScanning} from '@libs/TransactionUtils';
import type TransactionDataCellProps from './TransactionDataCellProps';

type TotalCellProps = TransactionDataCellProps & {
    canEdit?: boolean;
    onSave?: (amount: number) => void;
};

function TotalCell({shouldShowTooltip, transactionItem, canEdit, onSave}: TotalCellProps) {
    const styles = useThemeStyles();
    const {translate} = useLocalize();
    const currency = getTransactionCurrency(transactionItem);

    const amount = getTransactionDetails(transactionItem)?.amount;
    let amountToDisplay = convertToDisplayString(amount, currency);
    if (isScanning(transactionItem)) {
        amountToDisplay = translate('iou.receiptStatusTitle');
    }

    // Amount is stored in cents — convert to display units for editing
    const editableAmount = Math.abs(amount ?? 0) / 100;

    const handleAmountSave = useCallback(
        (value: string) => {
            const parsedValue = parseFloatAnyLocale(value);
            if (!Number.isNaN(parsedValue)) {
                const normalizedValue = roundToTwoDecimalPlaces(Math.max(0, parsedValue));
                // Convert back to cents for the save callback
                onSave?.(Math.round(normalizedValue * 100));
            }
        },
        [onSave],
    );

    const {isEditing, localValue, setLocalValue, startEditing, save} = useInlineEditState(String(editableAmount), handleAmountSave);

    const handleChangeText = useCallback(
        (text: string) => {
            // Allow only digits and a single decimal point
            const cleaned = text.replaceAll(/[^0-9.]/g, '');
            // Prevent multiple decimal points
            const parts = cleaned.split('.');
            const sanitized = parts.length > 1 ? `${parts.at(0)}.${parts.slice(1).join('')}` : cleaned;
            setLocalValue(sanitized);
        },
        [setLocalValue],
    );

    const handleBlur = useCallback(() => {
        save();
    }, [save]);

    const displayContent = (
        <TextWithTooltip
            shouldShowTooltip={shouldShowTooltip}
            text={amountToDisplay}
            style={[styles.optionDisplayName, styles.justifyContentCenter, styles.flexShrink0]}
        />
    );

    if (!canEdit || isScanning(transactionItem)) {
        return displayContent;
    }

    return (
        <EditableCell
            canEdit={canEdit}
            isEditing={isEditing}
            onStartEditing={startEditing}
            editContent={
                <TextInput
                    accessibilityLabel="Amount input"
                    autoFocus
                    value={localValue}
                    onChangeText={handleChangeText}
                    onBlur={handleBlur}
                    onSubmitEditing={handleBlur}
                    keyboardType="decimal-pad"
                    inputStyle={[styles.textAlignRight]}
                    touchableInputWrapperStyle={[styles.ph2, {height: '32px'}]}
                    containerStyles={[styles.flex1]}
                />
            }
        >
            {displayContent}
        </EditableCell>
    );
}

export default TotalCell;
