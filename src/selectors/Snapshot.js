"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchResultsErrorSelector = exports.searchResultsSelector = void 0;
var searchResultsSelector = function (snapshot) { return snapshot === null || snapshot === void 0 ? void 0 : snapshot.search; };
exports.searchResultsSelector = searchResultsSelector;
var searchResultsErrorSelector = function (snapshot) { return snapshot === null || snapshot === void 0 ? void 0 : snapshot.errors; };
exports.searchResultsErrorSelector = searchResultsErrorSelector;
