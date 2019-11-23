(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.OrdbokIndexPlugin = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
/*!---------------------------------------------------------------------------*/
/*! Copyright (c) ORDBOK contributors. All rights reserved.                   */
/*! Licensed under the MIT License. See the LICENSE file in the project root. */
/*!---------------------------------------------------------------------------*/
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(require("./lib"));

},{"./lib":2}],2:[function(require,module,exports){
"use strict";
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
var Index = (function (_super) {
    __extends(Index, _super);
    function Index(baseUrl, cacheTimeout, responseTimeout) {
        if (baseUrl === void 0) { baseUrl = ''; }
        return _super.call(this, (baseUrl + Index.SUBFOLDER), cacheTimeout, responseTimeout) || this;
    }
    Index.parse = function (stringified) {
        var fileIndex = {};
        var pair;
        stringified
            .split(core_1.Dictionary.LINE_SEPARATOR)
            .forEach(function (line) {
            if (line.indexOf(core_1.Dictionary.PAIR_SEPARATOR) === -1) {
                return;
            }
            pair = line.split(core_1.Dictionary.PAIR_SEPARATOR);
            if (pair.length < 2) {
                return;
            }
            fileIndex[pair[0]] = parseInt(pair[1]);
        });
        return fileIndex;
    };
    Index.stringify = function (fileIndex) {
        return Object
            .keys(fileIndex)
            .map(function (fileTarget) {
            return core_1.Utilities.getKey(fileTarget) +
                core_1.Dictionary.PAIR_SEPARATOR +
                fileIndex[fileTarget];
        })
            .join(core_1.Dictionary.LINE_SEPARATOR);
    };
    Index.stringifyHeadlines = function (headlines) {
        return headlines.join(core_1.Dictionary.LINE_SEPARATOR);
    };
    Index.prototype.loadHeadlines = function () {
        return this
            .request('index' + core_1.Dictionary.FILE_EXTENSION)
            .then(function (response) {
            if (response instanceof Error ||
                response.serverStatus >= 400) {
                throw new Error('HTTP ' + response.serverStatus);
            }
            return response.result.split(core_1.Dictionary.LINE_SEPARATOR);
        });
    };
    Index.prototype.loadFileIndex = function (headline) {
        return this
            .request(core_1.Utilities.getKey(headline) + core_1.Dictionary.FILE_EXTENSION)
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
    Index.SUBFOLDER = 'index/';
    return Index;
}(core_1.Ajax));
exports.Index = Index;

},{"@ordbok/core":"@ordbok/core"}]},{},[1])(1)
});
