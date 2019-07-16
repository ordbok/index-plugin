"use strict";
/*---------------------------------------------------------------------------*/
/* Copyright (c) ORDBOK contributors. All rights reserved.                   */
/* Licensed under the MIT License. See the LICENSE file in the project root. */
/*---------------------------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", { value: true });
var FS = require("fs");
var Path = require("path");
var core_1 = require("@ordbok/core");
var plugin_1 = require("@ordbok/core/dist/plugin");
var lib_1 = require("../lib");
/* *
 *
 *  Classes
 *
 * */
/**
 * Plugin to create index files.
 */
var IndexPlugin = /** @class */ (function () {
    /* *
     *
     *  Constructors
     *
     * */
    /**
     * Creates a plugin instance.
     */
    function IndexPlugin() {
        this._indexes = {};
        this._targetFolder = lib_1.Index.SUBFOLDER;
    }
    /* *
     *
     *  Functions
     *
     * */
    /**
     * Gets called after the assembling has been done.
     */
    IndexPlugin.prototype.onAssembled = function () {
        var indexes = this._indexes;
        if (Object.keys(indexes).length === 0) {
            return;
        }
        var headlines = Object.keys(indexes).map(core_1.Utilities.getKey);
        var targetFolder = this._targetFolder;
        var filePath;
        filePath = Path.join(targetFolder, '_') + lib_1.Index.FILE_EXTENSION;
        plugin_1.PluginUtilities.makeFilePath(filePath);
        FS.writeFileSync(filePath, lib_1.Index.stringifyHeadlines(headlines));
        headlines.forEach(function (headline) {
            filePath = Path.join(targetFolder, headline) + lib_1.Index.FILE_EXTENSION;
            plugin_1.PluginUtilities.makeFilePath(filePath);
            FS.writeFileSync(filePath, lib_1.Index.stringify(indexes[headline]));
        });
    };
    /**
     * Gets called before the assembling begins.
     *
     * @param sourceFolder
     *        Markdown folder
     *
     * @param targetFolder
     *        Dictionary folder
     */
    IndexPlugin.prototype.onAssembling = function (sourceFolder, targetFolder) {
        this._targetFolder = Path.join(targetFolder, lib_1.Index.SUBFOLDER);
    };
    /**
     * Gets called after a markdown file has been read.
     */
    IndexPlugin.prototype.onReadFile = function () {
        // nothing to do
    };
    /**
     * Gets called before a dictionary file will be written.
     *
     * @param targetFile
     *        Dictionary file path
     *
     * @param markdownPage
     *        Logical file content
     */
    IndexPlugin.prototype.onWriteFile = function (targetFile, markdownPage) {
        var _this = this;
        targetFile = Path.basename(targetFile);
        var lastDashPosition = targetFile.lastIndexOf('-');
        if (lastDashPosition === -1) {
            return;
        }
        var targetFilePrefix = targetFile.substr(0, lastDashPosition);
        var targetFileSuffix = parseInt(targetFile.substr(lastDashPosition + 1));
        var fileIndex;
        Object
            .keys(markdownPage)
            .map(core_1.Utilities.getKey)
            .forEach(function (headline) {
            fileIndex = _this._indexes[headline];
            if (!fileIndex) {
                fileIndex = _this._indexes[headline] = {};
            }
            fileIndex[targetFilePrefix] = targetFileSuffix;
        });
    };
    return IndexPlugin;
}());
exports.IndexPlugin = IndexPlugin;
/* *
 *
 *  Plugin Export
 *
 * */
exports.ordbokPlugin = new IndexPlugin();
