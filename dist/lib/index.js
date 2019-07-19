"use strict";
/*---------------------------------------------------------------------------*/
/* Copyright (c) ORDBOK contributors. All rights reserved.                   */
/* Licensed under the MIT License. See the LICENSE file in the project root. */
/*---------------------------------------------------------------------------*/
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@ordbok/core");
/* *
 *
 *  Constants
 *
 * */
var LINE_SEPARATOR = '\n';
var PAIR_SEPARATOR = '\t';
/* *
 *
 *  Classes
 *
 * */
/**
 * Manages index communication with a server
 */
var Index = /** @class */ (function (_super) {
    __extends(Index, _super);
    /* *
     *
     *  Constructor
     *
     * */
    /**
     * Creates a new managed inex instance.
     *
     * @param baseUrl
     *        Base URL of the server
     *
     * @param cacheTimeout
     *        Use 0 milliseconds to turn off all cache systems
     *
     * @param responseTimeout
     *        Time in milliseconds to wait for a server response
     */
    function Index(baseUrl, cacheTimeout, responseTimeout) {
        return _super.call(this, (baseUrl || '') + Index.SUBFOLDER, cacheTimeout, responseTimeout) || this;
    }
    /* *
     *
     *  Static Functions
     *
     * */
    /**
     * Converts a text into a file index.
     *
     * @param stringified
     *        Index text
     */
    Index.parse = function (stringified) {
        var fileIndex = {};
        var pair;
        stringified
            .split(LINE_SEPARATOR)
            .forEach(function (line) {
            if (line.indexOf(PAIR_SEPARATOR) === -1) {
                return;
            }
            pair = line.split(PAIR_SEPARATOR);
            if (pair.length < 2) {
                return;
            }
            fileIndex[pair[0]] = parseInt(pair[1]);
        });
        return fileIndex;
    };
    /**
     * Converts a file index into a text.
     *
     * @param fileIndex
     *        File index
     */
    Index.stringify = function (fileIndex) {
        return Object
            .keys(fileIndex)
            .map(function (fileTarget) { return (core_1.Utilities.getKey(fileTarget) + PAIR_SEPARATOR + fileIndex[fileTarget]); })
            .join(LINE_SEPARATOR);
    };
    /**
     * Converts the headline index into a text.
     *
     * @param headlines
     *        Headlines index
     */
    Index.stringifyHeadlines = function (headlines) {
        return headlines.join(LINE_SEPARATOR);
    };
    /* *
     *
     *  Functions
     *
     * */
    /**
     * Loads the index of headline keys from the server.
     */
    Index.prototype.loadHeadlines = function () {
        return this
            .request('index' + Index.FILE_EXTENSION)
            .then(function (response) {
            if (response instanceof Error ||
                response.serverStatus >= 400) {
                throw new Error('HTTP ' + response.serverStatus);
            }
            return response.result.split(LINE_SEPARATOR);
        });
    };
    /**
     * Loads an index file from the server.
     *
     * @param headline
     *        Headline of the index
     */
    Index.prototype.loadFileIndex = function (headline) {
        return this
            .request(core_1.Utilities.getKey(headline) + Index.FILE_EXTENSION)
            .then(function (response) {
            if (response instanceof Error ||
                response.serverStatus >= 400) {
                return {};
            }
            return Index.parse(response.result);
        })
            .catch(function (error) {
            console.error(error);
            return {};
        });
    };
    /* *
     *
     *  Static Variables
     *
     * */
    /**
     * File extension of index files
     */
    Index.FILE_EXTENSION = '.txt';
    /**
     * Subfolder of index files
     */
    Index.SUBFOLDER = 'index/';
    return Index;
}(core_1.Ajax));
exports.Index = Index;
