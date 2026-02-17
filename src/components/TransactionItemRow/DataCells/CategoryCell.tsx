import React, {useCallback} from 'react';
import CategoryPicker from '@components/CategoryPicker';
import PopoverWithMeasuredContent from '@components/PopoverWithMeasuredContent';
import type {ListItem} from '@components/SelectionList/types';
import TextWithIconCell from '@components/SelectionListWithSections/Search/TextWithIconCell';
import {EditableCell, usePopoverEditState} from '@components/Table/EditableCell';
import TextWithTooltip from '@components/TextWithTooltip';
import {useMemoizedLazyExpensifyIcons} from '@hooks/useLazyAsset';
import useResponsiveLayout from '@hooks/useResponsiveLayout';
import useThemeStyles from '@hooks/useThemeStyles';
import {getDecodedCategoryName, isCategoryMissing} from '@libs/CategoryUtils';
import CONST from '@src/CONST';
import type TransactionDataCellProps from './TransactionDataCellProps';

type CategoryCellProps = TransactionDataCellProps & {
    canEdit?: boolean;
    onSave?: (category: string) => void;
    policyID?: string;
};

const DEFAULT_ANCHOR_ORIGIN = {
    horizontal: CONST.MODAL.ANCHOR_ORIGIN_HORIZONTAL.RIGHT,
    vertical: CONST.MODAL.ANCHOR_ORIGIN_VERTICAL.TOP,
};

const POPOVER_DIMENSIONS = {
    height: 450,
    width: 350,
};

function CategoryCell({shouldUseNarrowLayout, shouldShowTooltip, transactionItem, canEdit, onSave, policyID}: CategoryCellProps) {
    const icons = useMemoizedLazyExpensifyIcons(['Folder']);
    const styles = useThemeStyles();
    // We need to use isSmallScreenWidth instead of shouldUseNarrowLayout to distinguish RHL and narrow layout
    // eslint-disable-next-line rulesdir/prefer-shouldUseNarrowLayout-instead-of-isSmallScreenWidth
    const {isSmallScreenWidth} = useResponsiveLayout();
    const {isEditing, anchorRef, isPopoverVisible, popoverPosition, isInverted, startEditing, closePopover} = usePopoverEditState({
        popoverHeight: POPOVER_DIMENSIONS.height,
    });

    const categoryForDisplay = isCategoryMissing(transactionItem?.category) ? '' : getDecodedCategoryName(transactionItem?.category ?? '');

    const handleCategorySelected = useCallback(
        (item: ListItem) => {
            if (item.keyForList) {
                onSave?.(String(item.keyForList));
            }
            closePopover();
        },
        [onSave, closePopover],
    );

    const displayContent = shouldUseNarrowLayout ? (
        <TextWithIconCell
            icon={icons.Folder}
            showTooltip={shouldShowTooltip}
            text={categoryForDisplay}
            textStyle={[styles.textMicro, styles.mnh0]}
        />
    ) : (
        <TextWithTooltip
            shouldShowTooltip={shouldShowTooltip}
            text={categoryForDisplay}
            style={[styles.optionDisplayName, styles.lineHeightLarge, styles.pre, styles.justifyContentCenter]}
        />
    );

    return (
        <>
            <EditableCell
                canEdit={canEdit && !!policyID}
                isEditing={isEditing}
                onStartEditing={startEditing}
                anchorRef={anchorRef}
            >
                {displayContent}
            </EditableCell>

            <PopoverWithMeasuredContent
                anchorRef={anchorRef}
                isVisible={isPopoverVisible}
                onClose={closePopover}
                anchorPosition={popoverPosition}
                popoverDimensions={POPOVER_DIMENSIONS}
                innerContainerStyle={isSmallScreenWidth ? styles.w100 : {width: POPOVER_DIMENSIONS.width}}
                anchorAlignment={DEFAULT_ANCHOR_ORIGIN}
                restoreFocusType={CONST.MODAL.RESTORE_FOCUS_TYPE.DELETE}
                shouldSwitchPositionIfOverflow
                shouldEnableNewFocusManagement
                shouldMeasureAnchorPositionFromTop={!isInverted}
                shouldSkipRemeasurement
                shouldDisplayBelowModals
            >
                <CategoryPicker
                    policyID={policyID}
                    selectedCategory={transactionItem?.category ?? ''}
                    onSubmit={handleCategorySelected}
                />
            </PopoverWithMeasuredContent>
        </>
    );
}

export default CategoryCell;
