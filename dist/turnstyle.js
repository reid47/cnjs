!function(e,r){"object"==typeof exports&&"undefined"!=typeof module?r(exports):"function"==typeof define&&define.amd?define(["exports"],r):r(e.turnstyle={})}(this,function(e){"use strict";var r="-webkit-",n="-ms-",t={"flex-start":"start","flex-end":"end","space-between":"justify","space-around":"distribute"},i={"horizontal-tb":"lr-tb","vertical-lr":"tb-lr","vertical-rl":"tb-rl"},f="@media",o=function e(o,l,u){l[u]=l[u]||[];var a=!0,s="",c=function(c){for(var x=o[c],d=c.replace(/[A-Z]/g,"-$&").toLowerCase(),p=function(e,f){if("display"===e&&("flex"===f||"inline-flex"===f)){var o="inline-flex"===f?"inline-":"";return[[e,r+o+"box"],[e,n+o+"flexbox"],[e,f]]}if("flex"===e){var l=(""+f).split(" "),u="none"===l[0]?0:"auto"===l[0]?1:l[0],a=3===l.length&&"0"===l[2]?f+"px":f;return[[r+"box-"+e,u],[n+e,a],[e,f]]}if("align-content"===e)return[[n+"flex-line-pack",t[f]||f],[e,f]];if("justify-content"===e)return["space-around"!==f&&[r+"box-pack",t[f]||f],[n+"flex-pack",t[f]||f],[e,f]];if("align-self"===e)return[[n+"flex-item-align",t[f]||f],"flex-start"!==f&&"flex-end"!==f&&"baseline"!==f&&[n+"grid-row-align",t[f]||f],[e,f]];if("align-items"===e)return[[r+"box-align",t[f]||f],[n+"flex-align",t[f]||f],[e,f]];if("flex-basis"===e)return[[n+"flex-preferred-size",f],[e,f]];if("flex-direction"===e)return[[r+"box-orient",f.indexOf("row")>-1?"horizontal":"vertical"],[r+"box-direction",f.indexOf("reverse")>-1?"reverse":"normal"],[n+e,f],[e,f]];if("flex-wrap"===e)return[[n+e,f],[e,f]];if("flex-grow"===e)return[[r+"box-flex",f],[n+"flex-positive",f],[e,f]];if("flex-shrink"===e)return[[n+"flex-negative",f],[e,f]];if("flex-flow"===e){var s=(f+"").split(" ")[0]||"";return[[r+"box-orient",s.indexOf("row")>-1?"horizontal":"vertical"],[r+"box-direction",s.indexOf("reverse")>-1?"reverse":"normal"],[n+e,f],[e,f]]}if("order"===e){var c=/[0-9]/.test(f)?(+f||0)+1:f;return[[r+"box-ordinal-group",c],[n+"flex-order",f],[e,f]]}return"appearance"===e?[[r+e,f],["-moz-"+e,f],[e,f]]:"writing-mode"===e?[[r+e,f],[n+e,i[f]||f],[e,f]]:/^mask-border/.test(e)?[[r+e.replace("border","box-image"),f],[e,f]]:/^(box-sizing|animation|text-emphasis|mask)/.test(e)?[[r+e,f],[e,f]]:"&:fullscreen"===e?[["&:-webkit-full-screen",f],["&:-moz-full-screen",f],["&:-ms-fullscreen",f],[e,f]]:"&::placeholder"===e?[["&::-webkit-input-placeholder",f],["&:-ms-input-placeholder",f],["&::-ms-input-placeholder",f],[e,f]]:[[e,f]]}(d,x),v=function(r){var n=p[r][0],t=p[r][1];if(!n)return"continue";var i,o,x=typeof t;if("function"===x)a=!1,l[u].push(function(e){return d+":"+t(e)+";"}),s+=c+":<fn>;";else if("object"===x){var v=e(t,l,(o=n,(i=u)+(i.indexOf(f)>-1?o.replace(f," and"):o.replace(/&/g,"")))),b=v.st,h=v.ck;a=a&&b,s+=h}else l[u].push(n+":"+t+";"),s+=l[u]},b=0;b<p.length;b++)v(b)};for(var x in o)c(x);return{defs:l,st:a,ck:s}},l=[],u={},a=function(e){return l.push(e)},s=function(){return"cls_"+l.length.toString(36)},c=function(e,r){return e.map(function(e){return"function"==typeof(n=e)?n(r):n;var n}).join("")},x=document;if(void 0!==x){var d=x.head.appendChild(x.createElement("style")).sheet;a=function(e){l.push(e),d.insertRule(e,d.cssRules.length)}}e.rule=function(e){if(!e)return"";var r=o(e,{},""),n=r.defs,t=r.st,i=r.ck;if(u[i])return u[i];if(t){var f=u[i]=s();for(var l in n){var x=n[l].join("");l.indexOf("@")>-1?a(l+"{."+f+"{"+x+"}}"):a("."+f+l+"{"+x+"}")}return f}var d=[],p=function(e){if(e.indexOf("@")>-1)return d.push(function(r,t){return e+"{."+r+"{"+c(n[e],t)+"}}"}),"continue";d.push(function(r,t){return"."+r+e+"{"+c(n[e],t)+"}"})};for(var v in n)p(v);return function(e){var r=i+JSON.stringify(e);if(u[r])return u[r];var n=u[r]=s();for(var t in d)a(d[t](n,e));return n}},e.css=function(){return l.sort().join("\n")},e.reset=function(){l=[],u={}},Object.defineProperty(e,"__esModule",{value:!0})});
