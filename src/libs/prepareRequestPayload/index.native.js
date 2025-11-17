"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var checkFileExists_1 = require("@libs/fileDownload/checkFileExists");
var FileUtils_1 = require("@libs/fileDownload/FileUtils");
var validateFormDataParameter_1 = require("@libs/validateFormDataParameter");
/**
 * Prepares the request payload (body) for a given command and data.
 * This function is specifically designed for native platforms (IOS and Android) to handle the regeneration of blob files. It ensures that files, such as receipts, are properly read and appended to the FormData object before the request is sent.
 */
var prepareRequestPayload = function (command, data, initiatedOffline) {
    var formData = new FormData();
    var promiseChain = Promise.resolve();
    Object.keys(data).forEach(function (key) {
        promiseChain = promiseChain.then(function () {
            var value = data[key];
            if (value === undefined) {
                return Promise.resolve();
            }
            if (key === 'receipt') {
                var _a = value, source = _a.source, name_1 = _a.name, type_1 = _a.type, uri_1 = _a.uri;
                if (source) {
                    return (0, checkFileExists_1.default)(source).then(function (exists) {
                        if (!exists) {
                            return;
                        }
                        var receiptFormData = {
                            uri: uri_1,
                            name: name_1,
                            type: type_1,
                        };
                        (0, validateFormDataParameter_1.default)(command, key, receiptFormData);
                        formData.append(key, receiptFormData);
                    });
                }
            }
            if (key === 'file' && initiatedOffline) {
                var _b = value, _c = _b.uri, path = _c === void 0 ? '' : _c, source = _b.source;
                if (!source) {
                    (0, validateFormDataParameter_1.default)(command, key, value);
                    formData.append(key, value);
                    return Promise.resolve();
                }
                return (0, FileUtils_1.readFileAsync)(source, path, function () { }).then(function (file) {
                    if (!file) {
                        return;
                    }
                    (0, validateFormDataParameter_1.default)(command, key, file);
                    formData.append(key, file);
                });
            }
            (0, validateFormDataParameter_1.default)(command, key, value);
            formData.append(key, value);
            return Promise.resolve();
        });
    });
    return promiseChain.then(function () { return formData; });
};
exports.default = prepareRequestPayload;
