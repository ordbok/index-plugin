"use strict";
/*---------------------------------------------------------------------------*/
/* Copyright (c) ORDBOK contributors. All rights reserved.                   */
/* Licensed under the MIT License. See the LICENSE file in the project root. */
/*---------------------------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", { value: true });
var Path = require("path");
var dist_1 = require("@ordbok/core/dist");
var lib_1 = require("./lib");
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
        var headlineKeys = Object.keys(indexes);
        var targetFolder = this._targetFolder;
        var filePath;
        dist_1.Internals.writeFile((Path.join(targetFolder, 'index') + dist_1.Dictionary.FILE_EXTENSION), lib_1.Index.stringifyHeadlines(headlineKeys.map(function (headlineKey) { return indexes[headlineKey].headline; })));
        headlineKeys.forEach(function (headline) { return dist_1.Internals.writeFile((Path.join(targetFolder, headline) + dist_1.Dictionary.FILE_EXTENSION), lib_1.Index.stringify(indexes[headline].fileIndex)); });
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
        var lastDashPosition = targetFile.lastIndexOf(dist_1.Dictionary.FILE_SEPARATOR);
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
            headlineKey = dist_1.Utilities.getKey(headline);
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
/* *
 *
 *  Plugin Export
 *
 * */
exports.ordbokPlugin = new IndexPlugin();
