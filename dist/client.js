/* Copyright (c) ORDBOK contributors. All rights reserved.                   */


var __extends=this&&this.__extends||function(){var t=function(n,e){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,n){t.__proto__=n}||function(t,n){for(var e in n)n.hasOwnProperty(e)&&(t[e]=n[e])})(n,e)};return function(n,e){function r(){this.constructor=n}t(n,e),n.prototype=null===e?Object.create(e):(r.prototype=e.prototype,new r)}}();define("@ordbok/index-plugin/index",["require","exports","@ordbok/core"],function(t,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var r=function(t){function n(e,r,o){return t.call(this,(e||"")+n.SUBFOLDER,r,o)||this}return __extends(n,t),n.parse=function(t){var n,e={};return t.split("\n").forEach(function(t){-1!==t.indexOf(":")&&(n=t.split(":"),n.length<2||(e[n[0]]=parseInt(n[1])))}),e},n.stringify=function(t){return Object.keys(t).map(function(n){return e.Utilities.getKey(n)+":"+t[n]}).join("\n")},n.stringifyHeadlines=function(t){return t.join("\n")},n.prototype.loadHeadlines=function(){return this.request("index"+n.FILE_EXTENSION).then(function(t){if(t instanceof Error||t.serverStatus>=400)throw new Error("HTTP "+t.serverStatus);return t.result.split("\n")})},n.prototype.loadFileIndex=function(t){return this.request(e.Utilities.getKey(t)+n.FILE_EXTENSION).then(function(t){return t instanceof Error||t.serverStatus>=400?{}:n.parse(t.result)}).catch(function(t){return console.error(t),{}})},n.FILE_EXTENSION=".txt",n.SUBFOLDER="index/",n}(e.Ajax);n.Index=r}),define("@ordbok/index-plugin",["@ordbok/index-plugin/index"],function(t){return t});
//# sourceMappingURL=client.js.map