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
}(core_1.AJAX));
exports.Index = Index;
