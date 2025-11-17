"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var useBeforeRemove_1 = require("@hooks/useBeforeRemove");
var useLocalize_1 = require("@hooks/useLocalize");
var useThemeStyles_1 = require("@hooks/useThemeStyles");
var variables_1 = require("@styles/variables");
var CONST_1 = require("@src/CONST");
var FeatureTrainingModal_1 = require("./FeatureTrainingModal");
var HoldMenuSectionList_1 = require("./HoldMenuSectionList");
var Illustrations = require("./Icon/Illustrations");
function HoldSubmitterEducationalModal(_a) {
    var onClose = _a.onClose, onConfirm = _a.onConfirm;
    var translate = (0, useLocalize_1.default)().translate;
    var styles = (0, useThemeStyles_1.default)();
    (0, useBeforeRemove_1.default)(onClose);
    return (<FeatureTrainingModal_1.default title={translate('iou.holdEducationalTitle')} description={translate('iou.whatIsHoldExplain')} confirmText={translate('common.buttonConfirm')} image={Illustrations.HoldExpense} contentFitImage="cover" width={variables_1.default.holdEducationModalWidth} illustrationAspectRatio={CONST_1.default.ILLUSTRATION_ASPECT_RATIO} contentInnerContainerStyles={styles.mb5} modalInnerContainerStyle={styles.pt0} illustrationOuterContainerStyle={styles.p0} onClose={onClose} onConfirm={onConfirm} shouldCloseOnConfirm={false}>
            <HoldMenuSectionList_1.default />
        </FeatureTrainingModal_1.default>);
}
HoldSubmitterEducationalModal.displayName = 'HoldSubmitterEducationalModal';
exports.default = HoldSubmitterEducationalModal;
