"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var group_ib_fp_1 = require("group-ib-fp");
var log_1 = require("./log");
function enableCapabilities(fp) {
    fp.enableAndroidCapability(group_ib_fp_1.AndroidCapability.CellsCollection, function (e, isRun) {
        (0, log_1.default)('CellsCollection', e, isRun);
    });
    fp.enableAndroidCapability(group_ib_fp_1.AndroidCapability.AccessPointsCollection, function (e, isRun) {
        (0, log_1.default)('AccessPointsCollection', e, isRun);
    });
    fp.enableAndroidCapability(group_ib_fp_1.AndroidCapability.Location, function (e, isRun) {
        (0, log_1.default)('Location', e, isRun);
    });
    fp.enableAndroidCapability(group_ib_fp_1.AndroidCapability.GlobalIdentification, function (e, isRun) {
        (0, log_1.default)('GlobalIdentification', e, isRun);
    });
    fp.enableAndroidCapability(group_ib_fp_1.AndroidCapability.CloudIdentification, function (e, isRun) {
        (0, log_1.default)('CloudIdentification', e, isRun);
    });
    fp.enableAndroidCapability(group_ib_fp_1.AndroidCapability.CallIdentification, function (e, isRun) {
        (0, log_1.default)('CallIdentification', e, isRun);
    });
    fp.enableAndroidCapability(group_ib_fp_1.AndroidCapability.ActivityCollection, function (e, isRun) {
        (0, log_1.default)('ActivityCollection', e, isRun);
    });
    fp.enableAndroidCapability(group_ib_fp_1.AndroidCapability.MotionCollection, function (e, isRun) {
        (0, log_1.default)('MotionCollection', e, isRun);
    });
    fp.enableAndroidCapability(group_ib_fp_1.AndroidCapability.PackageCollection, function (e, isRun) {
        (0, log_1.default)('PackageCollection', e, isRun);
    });
}
exports.default = enableCapabilities;
