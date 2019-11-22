"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Path = require("path");
var internals_1 = require("@ordbok/core/internals");
var lib_1 = require("./lib");
var IndexPlugin = (function () {
    function IndexPlugin() {
        this._indexes = {};
        this._targetFolder = lib_1.Index.SUBFOLDER;
    }
    IndexPlugin.prototype.onAssembled = function () {
        var indexes = this._indexes;
        if (Object.keys(indexes).length === 0) {
            return;
        }
        var headlineKeys = Object.keys(indexes);
        var targetFolder = this._targetFolder;
        internals_1.Internals.writeFile((Path.join(targetFolder, 'index') + internals_1.Dictionary.FILE_EXTENSION), lib_1.Index.stringifyHeadlines(headlineKeys.map(function (headlineKey) { return indexes[headlineKey].headline; })));
        headlineKeys.forEach(function (headline) { return internals_1.Internals.writeFile((Path.join(targetFolder, headline) + internals_1.Dictionary.FILE_EXTENSION), lib_1.Index.stringify(indexes[headline].fileIndex)); });
    };
    IndexPlugin.prototype.onAssembling = function (sourceFolder, targetFolder) {
        this._targetFolder = Path.join(targetFolder, lib_1.Index.SUBFOLDER);
    };
    IndexPlugin.prototype.onWriteFile = function (targetFile, markdownPage) {
        var _this = this;
        targetFile = Path.basename(targetFile);
        var lastDashPosition = targetFile.lastIndexOf(internals_1.Dictionary.FILE_SEPARATOR);
        if (lastDashPosition === -1) {
            return;
        }
        var targetFilePrefix = targetFile.substr(0, lastDashPosition);
        var targetFileSuffix = parseInt(targetFile.substr(lastDashPosition + 1));
        var headlineEntry;
        var headlineKey;
        Object
            .keys(markdownPage)
            .forEach(function (headline) {
            headlineKey = internals_1.Utilities.getKey(headline);
            headlineEntry = _this._indexes[headlineKey];
            if (!headlineEntry) {
                headlineEntry = _this._indexes[headlineKey] = {
                    headline: headline,
                    fileIndex: {}
                };
            }
            headlineEntry.fileIndex[targetFilePrefix] = targetFileSuffix;
        });
    };
    return IndexPlugin;
}());
exports.IndexPlugin = IndexPlugin;
exports.ordbokPlugin = new IndexPlugin();
