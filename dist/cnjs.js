!function(e,n){"object"==typeof exports&&"undefined"!=typeof module?n(exports):"function"==typeof define&&define.amd?define(["exports"],n):n(e.cnjs={})}(this,function(e){"use strict";var n=[],t={},r=function(e){return n.push(e)},u="@media",i=function(){return"cls_"+n.length},f=function(e,n){return"function"==typeof e?e(n):e},o=function e(n,t,r){t[r]=t[r]||[];var i=!0,f="",o=function(o){var c,s,a=n[o],d=o.replace(/[A-Z]/g,"-$&").toLowerCase(),p=typeof a;if("function"===p)i=!1,t[r].push(function(e){return d+":"+a(e)+";"}),f+=o+":<func>;";else if("object"===p){var l=e(a,t,(s=o,(c=r)+(c.indexOf(u)>-1?s.replace(u," and"):s.replace(/&:/g,":")))),h=l.st,v=l.cacheKey;i=i&&h,f+=v}else t[r].push(d+":"+a+";"),f+=t[r];t[r].length||delete t[r]};for(var c in n)o(c);return{defs:t,st:i,cacheKey:f}},c=document;if(void 0!==c){var s=c.head.appendChild(c.createElement("style")).sheet;r=function(e){n.push(e),s.insertRule(e,s.cssRules.length)}}e.rule=function(e){if(!e)return"";var n=o(e,{},""),u=n.defs,c=n.st,s=n.cacheKey;if(c){if(t[s])return t[s];var a=t[s]=i();for(var d in u){var p=u[d].join(""),l=d.indexOf("@")>-1?d+"{."+a+"{"+p+"}}":"."+a+d+"{"+p+"}";r(l)}return a}var h=[],v=function(e){var n=u[e];if(e.indexOf("@")>-1)return h.push(function(t,r){return e+"{."+t+"{"+n.map(function(e){return f(e,r)}).join("")+"}}"}),"continue";h.push(function(t,r){return"."+t+e+"{"+n.map(function(e){return f(e,r)}).join("")+"}"})};for(var y in u)v(y);return function(e){var n=s+JSON.stringify(e);if(t[n])return t[n];var u=t[n]=i();return h.forEach(function(n){r(n(u,e))}),u}},e.css=function(){return n.sort().join("\n")},e.reset=function(){n=[],t={}},Object.defineProperty(e,"__esModule",{value:!0})});
