"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var group_ib_fp_1 = require("group-ib-fp");
var log_1 = require("./log");
function enableCapabilities(fp) {
    fp.enableCapability(group_ib_fp_1.Capability.BatteryStatus, function (e, isRun) {
        (0, log_1.default)('BatteryStatus', e, isRun);
    });
    fp.enableCapability(group_ib_fp_1.Capability.Cellular, function (e, isRun) {
        (0, log_1.default)('Cellular', e, isRun);
    });
    fp.enableCapability(group_ib_fp_1.Capability.Passcode, function (e, isRun) {
        (0, log_1.default)('Passcode', e, isRun);
    });
    fp.enableCapability(group_ib_fp_1.Capability.WebView, function (e, isRun) {
        (0, log_1.default)('WebView', e, isRun);
    });
    fp.enableCapability(group_ib_fp_1.Capability.Swizzle, function (e, isRun) {
        (0, log_1.default)('Swizzle', e, isRun);
    });
    fp.enableCapability(group_ib_fp_1.Capability.Network, function (e, isRun) {
        (0, log_1.default)('Network', e, isRun);
    });
    fp.enableCapability(group_ib_fp_1.Capability.Location, function (e, isRun) {
        (0, log_1.default)('Location', e, isRun);
    });
    fp.enableCapability(group_ib_fp_1.Capability.Audio, function (e, isRun) {
        (0, log_1.default)('Audio', e, isRun);
    });
    fp.enableCapability(group_ib_fp_1.Capability.CloudIdentifier, function (e, isRun) {
        (0, log_1.default)('CloudIdentifier', e, isRun);
    });
    fp.enableCapability(group_ib_fp_1.Capability.DeviceStatus, function (e, isRun) {
        (0, log_1.default)('DeviceStatus', e, isRun);
    });
    fp.enableCapability(group_ib_fp_1.Capability.Capture, function (e, isRun) {
        (0, log_1.default)('Capture', e, isRun);
    });
    fp.enableCapability(group_ib_fp_1.Capability.Apps, function (e, isRun) {
        (0, log_1.default)('Apps', e, isRun);
    });
    fp.enableCapability(group_ib_fp_1.Capability.Proxy, function (e, isRun) {
        (0, log_1.default)('Proxy', e, isRun);
    });
    fp.enableCapability(group_ib_fp_1.Capability.Keyboard, function (e, isRun) {
        (0, log_1.default)('Keyboard', e, isRun);
    });
    fp.enableCapability(group_ib_fp_1.Capability.Behavior, function (e, isRun) {
        (0, log_1.default)('Behavior', e, isRun);
    });
    fp.enableCapability(group_ib_fp_1.Capability.Security, function (e, isRun) {
        (0, log_1.default)('Security', e, isRun);
    });
    fp.enableCapability(group_ib_fp_1.Capability.Advertise, function (e, isRun) {
        (0, log_1.default)('Advertise', e, isRun);
    });
    fp.enableCapability(group_ib_fp_1.Capability.PortScan, function (e, isRun) {
        (0, log_1.default)('PortScan', e, isRun);
    });
    fp.enableCapability(group_ib_fp_1.Capability.GlobalId, function (e, isRun) {
        (0, log_1.default)('GlobalId', e, isRun);
    });
}
exports.default = enableCapabilities;
