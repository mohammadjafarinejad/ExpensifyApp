"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DEFAULT_INITIAL = void 0;
exports.getInitialAvatarSvg = getInitialAvatarSvg;
exports.getInitialFromText = getInitialFromText;
var WorkspaceDefaultAvatars = require("@components/Icon/WorkspaceDefaultAvatars");
var DEFAULT_INITIAL = 'A';
exports.DEFAULT_INITIAL = DEFAULT_INITIAL;
var INITIAL_AVATARS = {
    A: WorkspaceDefaultAvatars.WorkspaceA,
    B: WorkspaceDefaultAvatars.WorkspaceB,
    C: WorkspaceDefaultAvatars.WorkspaceC,
    D: WorkspaceDefaultAvatars.WorkspaceD,
    E: WorkspaceDefaultAvatars.WorkspaceE,
    F: WorkspaceDefaultAvatars.WorkspaceF,
    G: WorkspaceDefaultAvatars.WorkspaceG,
    H: WorkspaceDefaultAvatars.WorkspaceH,
    I: WorkspaceDefaultAvatars.WorkspaceI,
    J: WorkspaceDefaultAvatars.WorkspaceJ,
    K: WorkspaceDefaultAvatars.WorkspaceK,
    L: WorkspaceDefaultAvatars.WorkspaceL,
    M: WorkspaceDefaultAvatars.WorkspaceM,
    N: WorkspaceDefaultAvatars.WorkspaceN,
    O: WorkspaceDefaultAvatars.WorkspaceO,
    P: WorkspaceDefaultAvatars.WorkspaceP,
    Q: WorkspaceDefaultAvatars.WorkspaceQ,
    R: WorkspaceDefaultAvatars.WorkspaceR,
    S: WorkspaceDefaultAvatars.WorkspaceS,
    T: WorkspaceDefaultAvatars.WorkspaceT,
    U: WorkspaceDefaultAvatars.WorkspaceU,
    V: WorkspaceDefaultAvatars.WorkspaceV,
    W: WorkspaceDefaultAvatars.WorkspaceW,
    X: WorkspaceDefaultAvatars.WorkspaceX,
    Y: WorkspaceDefaultAvatars.WorkspaceY,
    Z: WorkspaceDefaultAvatars.WorkspaceZ,
    '0': WorkspaceDefaultAvatars.Workspace0,
    '1': WorkspaceDefaultAvatars.Workspace1,
    '2': WorkspaceDefaultAvatars.Workspace2,
    '3': WorkspaceDefaultAvatars.Workspace3,
    '4': WorkspaceDefaultAvatars.Workspace4,
    '5': WorkspaceDefaultAvatars.Workspace5,
    '6': WorkspaceDefaultAvatars.Workspace6,
    '7': WorkspaceDefaultAvatars.Workspace7,
    '8': WorkspaceDefaultAvatars.Workspace8,
    '9': WorkspaceDefaultAvatars.Workspace9,
};
function getInitialFromText(text) {
    var match = text === null || text === void 0 ? void 0 : text.toUpperCase().match(/[A-Z0-9]/);
    var initial = match === null || match === void 0 ? void 0 : match[0];
    return initial !== null && initial !== void 0 ? initial : DEFAULT_INITIAL;
}
function getInitialAvatarSvg(initialOrText) {
    return INITIAL_AVATARS[getInitialFromText(initialOrText)];
}
