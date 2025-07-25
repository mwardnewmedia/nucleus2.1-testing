/*!
 * handlebars.min.js
 */
/*!
handlebars v1.3.0

Copyright (C) 2011 by Yehuda Katz

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

@license
*/
// var Handlebars=function(){var t=function(){"use strict";function t(t){this.string=t}var e;return t.prototype.toString=function(){return""+this.string},e=t}(),e=function(t){"use strict";function e(t){return a[t]||"&"}function n(t,e){for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n])}function i(t){return t instanceof s?t.toString():t||0===t?(t=""+t,l.test(t)?t.replace(c,e):t):""}function r(t){return!t&&0!==t||!(!h(t)||0!==t.length)}var o={},s=t,a={"&":"&","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#x27;","`":"&#x60;"},c=/[&<>"'`]/g,l=/[&<>"'`]/;o.extend=n;var u=Object.prototype.toString;o.toString=u;var p=function(t){return"function"==typeof t};p(/x/)&&(p=function(t){return"function"==typeof t&&"[object Function]"===u.call(t)});var p;o.isFunction=p;var h=Array.isArray||function(t){return!(!t||"object"!=typeof t)&&"[object Array]"===u.call(t)};return o.isArray=h,o.escapeExpression=i,o.isEmpty=r,o}(t),n=function(){"use strict";function t(t,e){var i;e&&e.firstLine&&(i=e.firstLine,t+=" - "+i+":"+e.firstColumn);for(var r=Error.prototype.constructor.call(this,t),o=0;o<n.length;o++)this[n[o]]=r[n[o]];i&&(this.lineNumber=i,this.column=e.firstColumn)}var e,n=["description","fileName","lineNumber","message","name","number","stack"];return t.prototype=new Error,e=t}(),i=function(t,e){"use strict";function n(t,e){this.helpers=t||{},this.partials=e||{},i(this)}function i(t){t.registerHelper("helperMissing",function(t){if(2!==arguments.length)throw new a("Missing helper: '"+t+"'")}),t.registerHelper("blockHelperMissing",function(e,n){var i=n.inverse||function(){},r=n.fn;return h(e)&&(e=e.call(this)),e===!0?r(this):e===!1||null==e?i(this):p(e)?e.length>0?t.helpers.each(e,n):i(this):r(e)}),t.registerHelper("each",function(t,e){var n,i=e.fn,r=e.inverse,o=0,s="";if(h(t)&&(t=t.call(this)),e.data&&(n=v(e.data)),t&&"object"==typeof t)if(p(t))for(var a=t.length;o<a;o++)n&&(n.index=o,n.first=0===o,n.last=o===t.length-1),s+=i(t[o],{data:n});else for(var c in t)t.hasOwnProperty(c)&&(n&&(n.key=c,n.index=o,n.first=0===o),s+=i(t[c],{data:n}),o++);return 0===o&&(s=r(this)),s}),t.registerHelper("if",function(t,e){return h(t)&&(t=t.call(this)),!e.hash.includeZero&&!t||s.isEmpty(t)?e.inverse(this):e.fn(this)}),t.registerHelper("unless",function(e,n){return t.helpers.if.call(this,e,{fn:n.inverse,inverse:n.fn,hash:n.hash})}),t.registerHelper("with",function(t,e){if(h(t)&&(t=t.call(this)),!s.isEmpty(t))return e.fn(t)}),t.registerHelper("log",function(e,n){var i=n.data&&null!=n.data.level?parseInt(n.data.level,10):1;t.log(i,e)})}function r(t,e){m.log(t,e)}var o={},s=t,a=e,c="1.3.0";o.VERSION=c;var l=4;o.COMPILER_REVISION=l;var u={1:"<= 1.0.rc.2",2:"== 1.0.0-rc.3",3:"== 1.0.0-rc.4",4:">= 1.0.0"};o.REVISION_CHANGES=u;var p=s.isArray,h=s.isFunction,d=s.toString,f="[object Object]";o.HandlebarsEnvironment=n,n.prototype={constructor:n,logger:m,log:r,registerHelper:function(t,e,n){if(d.call(t)===f){if(n||e)throw new a("Arg not supported with multiple helpers");s.extend(this.helpers,t)}else n&&(e.not=n),this.helpers[t]=e},registerPartial:function(t,e){d.call(t)===f?s.extend(this.partials,t):this.partials[t]=e}};var m={methodMap:{0:"debug",1:"info",2:"warn",3:"error"},DEBUG:0,INFO:1,WARN:2,ERROR:3,level:3,log:function(t,e){if(m.level<=t){var n=m.methodMap[t];"undefined"!=typeof console&&console[n]&&console[n].call(console,e)}}};o.logger=m,o.log=r;var v=function(t){var e={};return s.extend(e,t),e};return o.createFrame=v,o}(e,n),r=function(t,e,n){"use strict";function i(t){var e=t&&t[0]||1,n=h;if(e!==n){if(e<n){var i=d[n],r=d[e];throw new p("Template was precompiled with an older version of Handlebars than the current runtime. Please update your precompiler to a newer version ("+i+") or downgrade your runtime to an older version ("+r+").")}throw new p("Template was precompiled with a newer version of Handlebars than the current runtime. Please update your runtime to a newer version ("+t[1]+").")}}function r(t,e){if(!e)throw new p("No environment passed to template");var n=function(t,n,i,r,o,s){var a=e.VM.invokePartial.apply(this,arguments);if(null!=a)return a;if(e.compile){var c={helpers:r,partials:o,data:s};return o[n]=e.compile(t,{data:void 0!==s},e),o[n](i,c)}throw new p("The partial "+n+" could not be compiled when running in runtime-only mode")},i={escapeExpression:u.escapeExpression,invokePartial:n,programs:[],program:function(t,e,n){var i=this.programs[t];return n?i=s(t,e,n):i||(i=this.programs[t]=s(t,e)),i},merge:function(t,e){var n=t||e;return t&&e&&t!==e&&(n={},u.extend(n,e),u.extend(n,t)),n},programWithDepth:e.VM.programWithDepth,noop:e.VM.noop,compilerInfo:null};return function(n,r){r=r||{};var o,s,a=r.partial?r:e;r.partial||(o=r.helpers,s=r.partials);var c=t.call(i,a,n,o,s,r.data);return r.partial||e.VM.checkRevision(i.compilerInfo),c}}function o(t,e,n){var i=Array.prototype.slice.call(arguments,3),r=function(t,r){return r=r||{},e.apply(this,[t,r.data||n].concat(i))};return r.program=t,r.depth=i.length,r}function s(t,e,n){var i=function(t,i){return i=i||{},e(t,i.data||n)};return i.program=t,i.depth=0,i}function a(t,e,n,i,r,o){var s={partial:!0,helpers:i,partials:r,data:o};if(void 0===t)throw new p("The partial "+e+" could not be found");if(t instanceof Function)return t(n,s)}function c(){return""}var l={},u=t,p=e,h=n.COMPILER_REVISION,d=n.REVISION_CHANGES;return l.checkRevision=i,l.template=r,l.programWithDepth=o,l.program=s,l.invokePartial=a,l.noop=c,l}(e,n,i),o=function(t,e,n,i,r){"use strict";var o,s=t,a=e,c=n,l=i,u=r,p=function(){var t=new s.HandlebarsEnvironment;return l.extend(t,s),t.SafeString=a,t.Exception=c,t.Utils=l,t.VM=u,t.template=function(e){return u.template(e,t)},t},h=p();return h.create=p,o=h}(i,t,n,e,r),s=function(t){"use strict";function e(t){t=t||{},this.firstLine=t.first_line,this.firstColumn=t.first_column,this.lastColumn=t.last_column,this.lastLine=t.last_line}var n,i=t,r={ProgramNode:function(t,n,i,o){var s,a;3===arguments.length?(o=i,i=null):2===arguments.length&&(o=n,n=null),e.call(this,o),this.type="program",this.statements=t,this.strip={},i?(a=i[0],a?(s={first_line:a.firstLine,last_line:a.lastLine,last_column:a.lastColumn,first_column:a.firstColumn},this.inverse=new r.ProgramNode(i,n,s)):this.inverse=new r.ProgramNode(i,n),this.strip.right=n.left):n&&(this.strip.left=n.right)},MustacheNode:function(t,n,i,o,s){if(e.call(this,s),this.type="mustache",this.strip=o,null!=i&&i.charAt){var a=i.charAt(3)||i.charAt(2);this.escaped="{"!==a&&"&"!==a}else this.escaped=!!i;t instanceof r.SexprNode?this.sexpr=t:this.sexpr=new r.SexprNode(t,n),this.sexpr.isRoot=!0,this.id=this.sexpr.id,this.params=this.sexpr.params,this.hash=this.sexpr.hash,this.eligibleHelper=this.sexpr.eligibleHelper,this.isHelper=this.sexpr.isHelper},SexprNode:function(t,n,i){e.call(this,i),this.type="sexpr",this.hash=n;var r=this.id=t[0],o=this.params=t.slice(1),s=this.eligibleHelper=r.isSimple;this.isHelper=s&&(o.length||n)},PartialNode:function(t,n,i,r){e.call(this,r),this.type="partial",this.partialName=t,this.context=n,this.strip=i},BlockNode:function(t,n,r,o,s){if(e.call(this,s),t.sexpr.id.original!==o.path.original)throw new i(t.sexpr.id.original+" doesn't match "+o.path.original,this);this.type="block",this.mustache=t,this.program=n,this.inverse=r,this.strip={left:t.strip.left,right:o.strip.right},(n||r).strip.left=t.strip.right,(r||n).strip.right=o.strip.left,r&&!n&&(this.isInverse=!0)},ContentNode:function(t,n){e.call(this,n),this.type="content",this.string=t},HashNode:function(t,n){e.call(this,n),this.type="hash",this.pairs=t},IdNode:function(t,n){e.call(this,n),this.type="ID";for(var r="",o=[],s=0,a=0,c=t.length;a<c;a++){var l=t[a].part;if(r+=(t[a].separator||"")+l,".."===l||"."===l||"this"===l){if(o.length>0)throw new i("Invalid path: "+r,this);".."===l?s++:this.isScoped=!0}else o.push(l)}this.original=r,this.parts=o,this.string=o.join("."),this.depth=s,this.isSimple=1===t.length&&!this.isScoped&&0===s,this.stringModeValue=this.string},PartialNameNode:function(t,n){e.call(this,n),this.type="PARTIAL_NAME",this.name=t.original},DataNode:function(t,n){e.call(this,n),this.type="DATA",this.id=t},StringNode:function(t,n){e.call(this,n),this.type="STRING",this.original=this.string=this.stringModeValue=t},IntegerNode:function(t,n){e.call(this,n),this.type="INTEGER",this.original=this.integer=t,this.stringModeValue=Number(t)},BooleanNode:function(t,n){e.call(this,n),this.type="BOOLEAN",this.bool=t,this.stringModeValue="true"===t},CommentNode:function(t,n){e.call(this,n),this.type="comment",this.comment=t}};return n=r}(n),a=function(){"use strict";var t,e=function(){function t(t,e){return{left:"~"===t.charAt(2),right:"~"===e.charAt(0)||"~"===e.charAt(1)}}function e(){this.yy={}}var n={trace:function(){},yy:{},symbols_:{error:2,root:3,statements:4,EOF:5,program:6,simpleInverse:7,statement:8,openInverse:9,closeBlock:10,openBlock:11,mustache:12,partial:13,CONTENT:14,COMMENT:15,OPEN_BLOCK:16,sexpr:17,CLOSE:18,OPEN_INVERSE:19,OPEN_ENDBLOCK:20,path:21,OPEN:22,OPEN_UNESCAPED:23,CLOSE_UNESCAPED:24,OPEN_PARTIAL:25,partialName:26,partial_option0:27,sexpr_repetition0:28,sexpr_option0:29,dataName:30,param:31,STRING:32,INTEGER:33,BOOLEAN:34,OPEN_SEXPR:35,CLOSE_SEXPR:36,hash:37,hash_repetition_plus0:38,hashSegment:39,ID:40,EQUALS:41,DATA:42,pathSegments:43,SEP:44,$accept:0,$end:1},terminals_:{2:"error",5:"EOF",14:"CONTENT",15:"COMMENT",16:"OPEN_BLOCK",18:"CLOSE",19:"OPEN_INVERSE",20:"OPEN_ENDBLOCK",22:"OPEN",23:"OPEN_UNESCAPED",24:"CLOSE_UNESCAPED",25:"OPEN_PARTIAL",32:"STRING",33:"INTEGER",34:"BOOLEAN",35:"OPEN_SEXPR",36:"CLOSE_SEXPR",40:"ID",41:"EQUALS",42:"DATA",44:"SEP"},productions_:[0,[3,2],[3,1],[6,2],[6,3],[6,2],[6,1],[6,1],[6,0],[4,1],[4,2],[8,3],[8,3],[8,1],[8,1],[8,1],[8,1],[11,3],[9,3],[10,3],[12,3],[12,3],[13,4],[7,2],[17,3],[17,1],[31,1],[31,1],[31,1],[31,1],[31,1],[31,3],[37,1],[39,3],[26,1],[26,1],[26,1],[30,2],[21,1],[43,3],[43,1],[27,0],[27,1],[28,0],[28,2],[29,0],[29,1],[38,1],[38,2]],performAction:function(e,n,i,r,o,s,a){var c=s.length-1;switch(o){case 1:return new r.ProgramNode(s[c-1],this._$);case 2:return new r.ProgramNode([],this._$);case 3:this.$=new r.ProgramNode([],s[c-1],s[c],this._$);break;case 4:this.$=new r.ProgramNode(s[c-2],s[c-1],s[c],this._$);break;case 5:this.$=new r.ProgramNode(s[c-1],s[c],[],this._$);break;case 6:this.$=new r.ProgramNode(s[c],this._$);break;case 7:this.$=new r.ProgramNode([],this._$);break;case 8:this.$=new r.ProgramNode([],this._$);break;case 9:this.$=[s[c]];break;case 10:s[c-1].push(s[c]),this.$=s[c-1];break;case 11:this.$=new r.BlockNode(s[c-2],s[c-1].inverse,s[c-1],s[c],this._$);break;case 12:this.$=new r.BlockNode(s[c-2],s[c-1],s[c-1].inverse,s[c],this._$);break;case 13:this.$=s[c];break;case 14:this.$=s[c];break;case 15:this.$=new r.ContentNode(s[c],this._$);break;case 16:this.$=new r.CommentNode(s[c],this._$);break;case 17:this.$=new r.MustacheNode(s[c-1],null,s[c-2],t(s[c-2],s[c]),this._$);break;case 18:this.$=new r.MustacheNode(s[c-1],null,s[c-2],t(s[c-2],s[c]),this._$);break;case 19:this.$={path:s[c-1],strip:t(s[c-2],s[c])};break;case 20:this.$=new r.MustacheNode(s[c-1],null,s[c-2],t(s[c-2],s[c]),this._$);break;case 21:this.$=new r.MustacheNode(s[c-1],null,s[c-2],t(s[c-2],s[c]),this._$);break;case 22:this.$=new r.PartialNode(s[c-2],s[c-1],t(s[c-3],s[c]),this._$);break;case 23:this.$=t(s[c-1],s[c]);break;case 24:this.$=new r.SexprNode([s[c-2]].concat(s[c-1]),s[c],this._$);break;case 25:this.$=new r.SexprNode([s[c]],null,this._$);break;case 26:this.$=s[c];break;case 27:this.$=new r.StringNode(s[c],this._$);break;case 28:this.$=new r.IntegerNode(s[c],this._$);break;case 29:this.$=new r.BooleanNode(s[c],this._$);break;case 30:this.$=s[c];break;case 31:s[c-1].isHelper=!0,this.$=s[c-1];break;case 32:this.$=new r.HashNode(s[c],this._$);break;case 33:this.$=[s[c-2],s[c]];break;case 34:this.$=new r.PartialNameNode(s[c],this._$);break;case 35:this.$=new r.PartialNameNode(new r.StringNode(s[c],this._$),this._$);break;case 36:this.$=new r.PartialNameNode(new r.IntegerNode(s[c],this._$));break;case 37:this.$=new r.DataNode(s[c],this._$);break;case 38:this.$=new r.IdNode(s[c],this._$);break;case 39:s[c-2].push({part:s[c],separator:s[c-1]}),this.$=s[c-2];break;case 40:this.$=[{part:s[c]}];break;case 43:this.$=[];break;case 44:s[c-1].push(s[c]);break;case 47:this.$=[s[c]];break;case 48:s[c-1].push(s[c])}},table:[{3:1,4:2,5:[1,3],8:4,9:5,11:6,12:7,13:8,14:[1,9],15:[1,10],16:[1,12],19:[1,11],22:[1,13],23:[1,14],25:[1,15]},{1:[3]},{5:[1,16],8:17,9:5,11:6,12:7,13:8,14:[1,9],15:[1,10],16:[1,12],19:[1,11],22:[1,13],23:[1,14],25:[1,15]},{1:[2,2]},{5:[2,9],14:[2,9],15:[2,9],16:[2,9],19:[2,9],20:[2,9],22:[2,9],23:[2,9],25:[2,9]},{4:20,6:18,7:19,8:4,9:5,11:6,12:7,13:8,14:[1,9],15:[1,10],16:[1,12],19:[1,21],20:[2,8],22:[1,13],23:[1,14],25:[1,15]},{4:20,6:22,7:19,8:4,9:5,11:6,12:7,13:8,14:[1,9],15:[1,10],16:[1,12],19:[1,21],20:[2,8],22:[1,13],23:[1,14],25:[1,15]},{5:[2,13],14:[2,13],15:[2,13],16:[2,13],19:[2,13],20:[2,13],22:[2,13],23:[2,13],25:[2,13]},{5:[2,14],14:[2,14],15:[2,14],16:[2,14],19:[2,14],20:[2,14],22:[2,14],23:[2,14],25:[2,14]},{5:[2,15],14:[2,15],15:[2,15],16:[2,15],19:[2,15],20:[2,15],22:[2,15],23:[2,15],25:[2,15]},{5:[2,16],14:[2,16],15:[2,16],16:[2,16],19:[2,16],20:[2,16],22:[2,16],23:[2,16],25:[2,16]},{17:23,21:24,30:25,40:[1,28],42:[1,27],43:26},{17:29,21:24,30:25,40:[1,28],42:[1,27],43:26},{17:30,21:24,30:25,40:[1,28],42:[1,27],43:26},{17:31,21:24,30:25,40:[1,28],42:[1,27],43:26},{21:33,26:32,32:[1,34],33:[1,35],40:[1,28],43:26},{1:[2,1]},{5:[2,10],14:[2,10],15:[2,10],16:[2,10],19:[2,10],20:[2,10],22:[2,10],23:[2,10],25:[2,10]},{10:36,20:[1,37]},{4:38,8:4,9:5,11:6,12:7,13:8,14:[1,9],15:[1,10],16:[1,12],19:[1,11],20:[2,7],22:[1,13],23:[1,14],25:[1,15]},{7:39,8:17,9:5,11:6,12:7,13:8,14:[1,9],15:[1,10],16:[1,12],19:[1,21],20:[2,6],22:[1,13],23:[1,14],25:[1,15]},{17:23,18:[1,40],21:24,30:25,40:[1,28],42:[1,27],43:26},{10:41,20:[1,37]},{18:[1,42]},{18:[2,43],24:[2,43],28:43,32:[2,43],33:[2,43],34:[2,43],35:[2,43],36:[2,43],40:[2,43],42:[2,43]},{18:[2,25],24:[2,25],36:[2,25]},{18:[2,38],24:[2,38],32:[2,38],33:[2,38],34:[2,38],35:[2,38],36:[2,38],40:[2,38],42:[2,38],44:[1,44]},{21:45,40:[1,28],43:26},{18:[2,40],24:[2,40],32:[2,40],33:[2,40],34:[2,40],35:[2,40],36:[2,40],40:[2,40],42:[2,40],44:[2,40]},{18:[1,46]},{18:[1,47]},{24:[1,48]},{18:[2,41],21:50,27:49,40:[1,28],43:26},{18:[2,34],40:[2,34]},{18:[2,35],40:[2,35]},{18:[2,36],40:[2,36]},{5:[2,11],14:[2,11],15:[2,11],16:[2,11],19:[2,11],20:[2,11],22:[2,11],23:[2,11],25:[2,11]},{21:51,40:[1,28],43:26},{8:17,9:5,11:6,12:7,13:8,14:[1,9],15:[1,10],16:[1,12],19:[1,11],20:[2,3],22:[1,13],23:[1,14],25:[1,15]},{4:52,8:4,9:5,11:6,12:7,13:8,14:[1,9],15:[1,10],16:[1,12],19:[1,11],20:[2,5],22:[1,13],23:[1,14],25:[1,15]},{14:[2,23],15:[2,23],16:[2,23],19:[2,23],20:[2,23],22:[2,23],23:[2,23],25:[2,23]},{5:[2,12],14:[2,12],15:[2,12],16:[2,12],19:[2,12],20:[2,12],22:[2,12],23:[2,12],25:[2,12]},{14:[2,18],15:[2,18],16:[2,18],19:[2,18],20:[2,18],22:[2,18],23:[2,18],25:[2,18]},{18:[2,45],21:56,24:[2,45],29:53,30:60,31:54,32:[1,57],33:[1,58],34:[1,59],35:[1,61],36:[2,45],37:55,38:62,39:63,40:[1,64],42:[1,27],43:26},{40:[1,65]},{18:[2,37],24:[2,37],32:[2,37],33:[2,37],34:[2,37],35:[2,37],36:[2,37],40:[2,37],42:[2,37]},{14:[2,17],15:[2,17],16:[2,17],19:[2,17],20:[2,17],22:[2,17],23:[2,17],25:[2,17]},{5:[2,20],14:[2,20],15:[2,20],16:[2,20],19:[2,20],20:[2,20],22:[2,20],23:[2,20],25:[2,20]},{5:[2,21],14:[2,21],15:[2,21],16:[2,21],19:[2,21],20:[2,21],22:[2,21],23:[2,21],25:[2,21]},{18:[1,66]},{18:[2,42]},{18:[1,67]},{8:17,9:5,11:6,12:7,13:8,14:[1,9],15:[1,10],16:[1,12],19:[1,11],20:[2,4],22:[1,13],23:[1,14],25:[1,15]},{18:[2,24],24:[2,24],36:[2,24]},{18:[2,44],24:[2,44],32:[2,44],33:[2,44],34:[2,44],35:[2,44],36:[2,44],40:[2,44],42:[2,44]},{18:[2,46],24:[2,46],36:[2,46]},{18:[2,26],24:[2,26],32:[2,26],33:[2,26],34:[2,26],35:[2,26],36:[2,26],40:[2,26],42:[2,26]},{18:[2,27],24:[2,27],32:[2,27],33:[2,27],34:[2,27],35:[2,27],36:[2,27],40:[2,27],42:[2,27]},{18:[2,28],24:[2,28],32:[2,28],33:[2,28],34:[2,28],35:[2,28],36:[2,28],40:[2,28],42:[2,28]},{18:[2,29],24:[2,29],32:[2,29],33:[2,29],34:[2,29],35:[2,29],36:[2,29],40:[2,29],42:[2,29]},{18:[2,30],24:[2,30],32:[2,30],33:[2,30],34:[2,30],35:[2,30],36:[2,30],40:[2,30],42:[2,30]},{17:68,21:24,30:25,40:[1,28],42:[1,27],43:26},{18:[2,32],24:[2,32],36:[2,32],39:69,40:[1,70]},{18:[2,47],24:[2,47],36:[2,47],40:[2,47]},{18:[2,40],24:[2,40],32:[2,40],33:[2,40],34:[2,40],35:[2,40],36:[2,40],40:[2,40],41:[1,71],42:[2,40],44:[2,40]},{18:[2,39],24:[2,39],32:[2,39],33:[2,39],34:[2,39],35:[2,39],36:[2,39],40:[2,39],42:[2,39],44:[2,39]},{5:[2,22],14:[2,22],15:[2,22],16:[2,22],19:[2,22],20:[2,22],22:[2,22],23:[2,22],25:[2,22]},{5:[2,19],14:[2,19],15:[2,19],16:[2,19],19:[2,19],20:[2,19],22:[2,19],23:[2,19],25:[2,19]},{36:[1,72]},{18:[2,48],24:[2,48],36:[2,48],40:[2,48]},{41:[1,71]},{21:56,30:60,31:73,32:[1,57],33:[1,58],34:[1,59],35:[1,61],40:[1,28],42:[1,27],43:26},{18:[2,31],24:[2,31],32:[2,31],33:[2,31],34:[2,31],35:[2,31],36:[2,31],40:[2,31],42:[2,31]},{18:[2,33],24:[2,33],36:[2,33],40:[2,33]}],defaultActions:{3:[2,2],16:[2,1],50:[2,42]},parseError:function(t,e){throw new Error(t)},parse:function(t){function e(){var t;return t=n.lexer.lex()||1,"number"!=typeof t&&(t=n.symbols_[t]||t),t}var n=this,i=[0],r=[null],o=[],s=this.table,a="",c=0,l=0,u=0;this.lexer.setInput(t),this.lexer.yy=this.yy,this.yy.lexer=this.lexer,this.yy.parser=this,"undefined"==typeof this.lexer.yylloc&&(this.lexer.yylloc={});var p=this.lexer.yylloc;o.push(p);var h=this.lexer.options&&this.lexer.options.ranges;"function"==typeof this.yy.parseError&&(this.parseError=this.yy.parseError);for(var d,f,m,v,g,y,S,b,x,w={};;){if(m=i[i.length-1],this.defaultActions[m]?v=this.defaultActions[m]:(null!==d&&"undefined"!=typeof d||(d=e()),v=s[m]&&s[m][d]),"undefined"==typeof v||!v.length||!v[0]){var C="";if(!u){x=[];for(y in s[m])this.terminals_[y]&&y>2&&x.push("'"+this.terminals_[y]+"'");C=this.lexer.showPosition?"Parse error on line "+(c+1)+":\n"+this.lexer.showPosition()+"\nExpecting "+x.join(", ")+", got '"+(this.terminals_[d]||d)+"'":"Parse error on line "+(c+1)+": Unexpected "+(1==d?"end of input":"'"+(this.terminals_[d]||d)+"'"),this.parseError(C,{text:this.lexer.match,token:this.terminals_[d]||d,line:this.lexer.yylineno,loc:p,expected:x})}}if(v[0]instanceof Array&&v.length>1)throw new Error("Parse Error: multiple actions possible at state: "+m+", token: "+d);switch(v[0]){case 1:i.push(d),r.push(this.lexer.yytext),o.push(this.lexer.yylloc),i.push(v[1]),d=null,f?(d=f,f=null):(l=this.lexer.yyleng,a=this.lexer.yytext,c=this.lexer.yylineno,p=this.lexer.yylloc,u>0&&u--);break;case 2:if(S=this.productions_[v[1]][1],w.$=r[r.length-S],w._$={first_line:o[o.length-(S||1)].first_line,last_line:o[o.length-1].last_line,first_column:o[o.length-(S||1)].first_column,last_column:o[o.length-1].last_column},h&&(w._$.range=[o[o.length-(S||1)].range[0],o[o.length-1].range[1]]),g=this.performAction.call(w,a,l,c,this.yy,v[1],r,o),"undefined"!=typeof g)return g;S&&(i=i.slice(0,-1*S*2),r=r.slice(0,-1*S),o=o.slice(0,-1*S)),i.push(this.productions_[v[1]][0]),r.push(w.$),o.push(w._$),b=s[i[i.length-2]][i[i.length-1]],i.push(b);break;case 3:return!0}}return!0}},i=function(){var t={EOF:1,parseError:function(t,e){if(!this.yy.parser)throw new Error(t);this.yy.parser.parseError(t,e)},setInput:function(t){return this._input=t,this._more=this._less=this.done=!1,this.yylineno=this.yyleng=0,this.yytext=this.matched=this.match="",this.conditionStack=["INITIAL"],this.yylloc={first_line:1,first_column:0,last_line:1,last_column:0},this.options.ranges&&(this.yylloc.range=[0,0]),this.offset=0,this},input:function(){var t=this._input[0];this.yytext+=t,this.yyleng++,this.offset++,this.match+=t,this.matched+=t;var e=t.match(/(?:\r\n?|\n).*/g);return e?(this.yylineno++,this.yylloc.last_line++):this.yylloc.last_column++,this.options.ranges&&this.yylloc.range[1]++,this._input=this._input.slice(1),t},unput:function(t){var e=t.length,n=t.split(/(?:\r\n?|\n)/g);this._input=t+this._input,this.yytext=this.yytext.substr(0,this.yytext.length-e-1),this.offset-=e;var i=this.match.split(/(?:\r\n?|\n)/g);this.match=this.match.substr(0,this.match.length-1),this.matched=this.matched.substr(0,this.matched.length-1),n.length-1&&(this.yylineno-=n.length-1);var r=this.yylloc.range;return this.yylloc={first_line:this.yylloc.first_line,last_line:this.yylineno+1,first_column:this.yylloc.first_column,last_column:n?(n.length===i.length?this.yylloc.first_column:0)+i[i.length-n.length].length-n[0].length:this.yylloc.first_column-e},this.options.ranges&&(this.yylloc.range=[r[0],r[0]+this.yyleng-e]),this},more:function(){return this._more=!0,this},less:function(t){this.unput(this.match.slice(t))},pastInput:function(){var t=this.matched.substr(0,this.matched.length-this.match.length);return(t.length>20?"...":"")+t.substr(-20).replace(/\n/g,"")},upcomingInput:function(){var t=this.match;return t.length<20&&(t+=this._input.substr(0,20-t.length)),(t.substr(0,20)+(t.length>20?"...":"")).replace(/\n/g,"")},showPosition:function(){var t=this.pastInput(),e=new Array(t.length+1).join("-");return t+this.upcomingInput()+"\n"+e+"^"},next:function(){if(this.done)return this.EOF;this._input||(this.done=!0);var t,e,n,i,r;this._more||(this.yytext="",this.match="");for(var o=this._currentRules(),s=0;s<o.length&&(n=this._input.match(this.rules[o[s]]),!n||e&&!(n[0].length>e[0].length)||(e=n,i=s,this.options.flex));s++);return e?(r=e[0].match(/(?:\r\n?|\n).*/g),r&&(this.yylineno+=r.length),this.yylloc={first_line:this.yylloc.last_line,last_line:this.yylineno+1,first_column:this.yylloc.last_column,last_column:r?r[r.length-1].length-r[r.length-1].match(/\r?\n?/)[0].length:this.yylloc.last_column+e[0].length},this.yytext+=e[0],this.match+=e[0],this.matches=e,this.yyleng=this.yytext.length,this.options.ranges&&(this.yylloc.range=[this.offset,this.offset+=this.yyleng]),this._more=!1,this._input=this._input.slice(e[0].length),this.matched+=e[0],t=this.performAction.call(this,this.yy,this,o[i],this.conditionStack[this.conditionStack.length-1]),this.done&&this._input&&(this.done=!1),t?t:void 0):""===this._input?this.EOF:this.parseError("Lexical error on line "+(this.yylineno+1)+". Unrecognized text.\n"+this.showPosition(),{text:"",token:null,line:this.yylineno})},lex:function(){var t=this.next();return"undefined"!=typeof t?t:this.lex()},begin:function(t){this.conditionStack.push(t)},popState:function(){return this.conditionStack.pop()},_currentRules:function(){return this.conditions[this.conditionStack[this.conditionStack.length-1]].rules},topState:function(){return this.conditionStack[this.conditionStack.length-2]},pushState:function(t){this.begin(t)}};return t.options={},t.performAction=function(t,e,n,i){function r(t,n){return e.yytext=e.yytext.substr(t,e.yyleng-n)}switch(n){case 0:if("\\\\"===e.yytext.slice(-2)?(r(0,1),this.begin("mu")):"\\"===e.yytext.slice(-1)?(r(0,1),this.begin("emu")):this.begin("mu"),e.yytext)return 14;break;case 1:return 14;case 2:return this.popState(),14;case 3:return r(0,4),this.popState(),15;case 4:return 35;case 5:return 36;case 6:return 25;case 7:return 16;case 8:return 20;case 9:return 19;case 10:return 19;case 11:return 23;case 12:return 22;case 13:this.popState(),this.begin("com");break;case 14:return r(3,5),this.popState(),15;case 15:return 22;case 16:return 41;case 17:return 40;case 18:return 40;case 19:return 44;case 20:break;case 21:return this.popState(),24;case 22:return this.popState(),18;case 23:return e.yytext=r(1,2).replace(/\\"/g,'"'),32;case 24:return e.yytext=r(1,2).replace(/\\'/g,"'"),32;case 25:return 42;case 26:return 34;case 27:return 34;case 28:return 33;case 29:return 40;case 30:return e.yytext=r(1,2),40;case 31:return"INVALID";case 32:return 5}},t.rules=[/^(?:[^\x00]*?(?=(\{\{)))/,/^(?:[^\x00]+)/,/^(?:[^\x00]{2,}?(?=(\{\{|\\\{\{|\\\\\{\{|$)))/,/^(?:[\s\S]*?--\}\})/,/^(?:\()/,/^(?:\))/,/^(?:\{\{(~)?>)/,/^(?:\{\{(~)?#)/,/^(?:\{\{(~)?\/)/,/^(?:\{\{(~)?\^)/,/^(?:\{\{(~)?\s*else\b)/,/^(?:\{\{(~)?\{)/,/^(?:\{\{(~)?&)/,/^(?:\{\{!--)/,/^(?:\{\{![\s\S]*?\}\})/,/^(?:\{\{(~)?)/,/^(?:=)/,/^(?:\.\.)/,/^(?:\.(?=([=~}\s\/.)])))/,/^(?:[\/.])/,/^(?:\s+)/,/^(?:\}(~)?\}\})/,/^(?:(~)?\}\})/,/^(?:"(\\["]|[^"])*")/,/^(?:'(\\[']|[^'])*')/,/^(?:@)/,/^(?:true(?=([~}\s)])))/,/^(?:false(?=([~}\s)])))/,/^(?:-?[0-9]+(?=([~}\s)])))/,/^(?:([^\s!"#%-,\.\/;->@\[-\^`\{-~]+(?=([=~}\s\/.)]))))/,/^(?:\[[^\]]*\])/,/^(?:.)/,/^(?:$)/],t.conditions={mu:{rules:[4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32],inclusive:!1},emu:{rules:[2],inclusive:!1},com:{rules:[3],inclusive:!1},INITIAL:{rules:[0,1,32],inclusive:!0}},t}();return n.lexer=i,e.prototype=n,n.Parser=e,new e}();return t=e}(),c=function(t,e){"use strict";function n(t){return t.constructor===o.ProgramNode?t:(r.yy=o,r.parse(t))}var i={},r=t,o=e;return i.parser=r,i.parse=n,i}(a,s),l=function(t){"use strict";function e(){}function n(t,e,n){if(null==t||"string"!=typeof t&&t.constructor!==n.AST.ProgramNode)throw new o("You must pass a string or Handlebars AST to Handlebars.precompile. You passed "+t);e=e||{},"data"in e||(e.data=!0);var i=n.parse(t),r=(new n.Compiler).compile(i,e);return(new n.JavaScriptCompiler).compile(r,e)}function i(t,e,n){function i(){var i=n.parse(t),r=(new n.Compiler).compile(i,e),o=(new n.JavaScriptCompiler).compile(r,e,void 0,!0);return n.template(o)}if(null==t||"string"!=typeof t&&t.constructor!==n.AST.ProgramNode)throw new o("You must pass a string or Handlebars AST to Handlebars.compile. You passed "+t);e=e||{},"data"in e||(e.data=!0);var r;return function(t,e){return r||(r=i()),r.call(this,t,e)}}var r={},o=t;return r.Compiler=e,e.prototype={compiler:e,disassemble:function(){for(var t,e,n,i=this.opcodes,r=[],o=0,s=i.length;o<s;o++)if(t=i[o],"DECLARE"===t.opcode)r.push("DECLARE "+t.name+"="+t.value);else{e=[];for(var a=0;a<t.args.length;a++)n=t.args[a],"string"==typeof n&&(n='"'+n.replace("\n","\\n")+'"'),e.push(n);r.push(t.opcode+" "+e.join(" "))}return r.join("\n")},equals:function(t){var e=this.opcodes.length;if(t.opcodes.length!==e)return!1;for(var n=0;n<e;n++){var i=this.opcodes[n],r=t.opcodes[n];if(i.opcode!==r.opcode||i.args.length!==r.args.length)return!1;for(var o=0;o<i.args.length;o++)if(i.args[o]!==r.args[o])return!1}if(e=this.children.length,t.children.length!==e)return!1;for(n=0;n<e;n++)if(!this.children[n].equals(t.children[n]))return!1;return!0},guid:0,compile:function(t,e){this.opcodes=[],this.children=[],this.depths={list:[]},this.options=e;var n=this.options.knownHelpers;if(this.options.knownHelpers={helperMissing:!0,blockHelperMissing:!0,each:!0,if:!0,unless:!0,with:!0,log:!0},n)for(var i in n)this.options.knownHelpers[i]=n[i];return this.accept(t)},accept:function(t){var e,n=t.strip||{};return n.left&&this.opcode("strip"),e=this[t.type](t),n.right&&this.opcode("strip"),e},program:function(t){for(var e=t.statements,n=0,i=e.length;n<i;n++)this.accept(e[n]);return this.isSimple=1===i,this.depths.list=this.depths.list.sort(function(t,e){return t-e}),this},compileProgram:function(t){var e,n=(new this.compiler).compile(t,this.options),i=this.guid++;this.usePartial=this.usePartial||n.usePartial,this.children[i]=n;for(var r=0,o=n.depths.list.length;r<o;r++)e=n.depths.list[r],e<2||this.addDepth(e-1);return i},block:function(t){var e=t.mustache,n=t.program,i=t.inverse;n&&(n=this.compileProgram(n)),i&&(i=this.compileProgram(i));var r=e.sexpr,o=this.classifySexpr(r);"helper"===o?this.helperSexpr(r,n,i):"simple"===o?(this.simpleSexpr(r),this.opcode("pushProgram",n),this.opcode("pushProgram",i),this.opcode("emptyHash"),this.opcode("blockValue")):(this.ambiguousSexpr(r,n,i),this.opcode("pushProgram",n),this.opcode("pushProgram",i),this.opcode("emptyHash"),this.opcode("ambiguousBlockValue")),this.opcode("append")},hash:function(t){var e,n,i=t.pairs;this.opcode("pushHash");for(var r=0,o=i.length;r<o;r++)e=i[r],n=e[1],this.options.stringParams?(n.depth&&this.addDepth(n.depth),this.opcode("getContext",n.depth||0),this.opcode("pushStringParam",n.stringModeValue,n.type),"sexpr"===n.type&&this.sexpr(n)):this.accept(n),this.opcode("assignToHash",e[0]);this.opcode("popHash")},partial:function(t){var e=t.partialName;this.usePartial=!0,t.context?this.ID(t.context):this.opcode("push","depth0"),this.opcode("invokePartial",e.name),this.opcode("append")},content:function(t){this.opcode("appendContent",t.string)},mustache:function(t){this.sexpr(t.sexpr),t.escaped&&!this.options.noEscape?this.opcode("appendEscaped"):this.opcode("append")},ambiguousSexpr:function(t,e,n){var i=t.id,r=i.parts[0],o=null!=e||null!=n;this.opcode("getContext",i.depth),this.opcode("pushProgram",e),this.opcode("pushProgram",n),this.opcode("invokeAmbiguous",r,o)},simpleSexpr:function(t){var e=t.id;"DATA"===e.type?this.DATA(e):e.parts.length?this.ID(e):(this.addDepth(e.depth),this.opcode("getContext",e.depth),this.opcode("pushContext")),this.opcode("resolvePossibleLambda")},helperSexpr:function(t,e,n){var i=this.setupFullMustacheParams(t,e,n),r=t.id.parts[0];if(this.options.knownHelpers[r])this.opcode("invokeKnownHelper",i.length,r);else{if(this.options.knownHelpersOnly)throw new o("You specified knownHelpersOnly, but used the unknown helper "+r,t);this.opcode("invokeHelper",i.length,r,t.isRoot)}},sexpr:function(t){var e=this.classifySexpr(t);"simple"===e?this.simpleSexpr(t):"helper"===e?this.helperSexpr(t):this.ambiguousSexpr(t)},ID:function(t){this.addDepth(t.depth),this.opcode("getContext",t.depth);var e=t.parts[0];e?this.opcode("lookupOnContext",t.parts[0]):this.opcode("pushContext");for(var n=1,i=t.parts.length;n<i;n++)this.opcode("lookup",t.parts[n])},DATA:function(t){if(this.options.data=!0,t.id.isScoped||t.id.depth)throw new o("Scoped data references are not supported: "+t.original,t);this.opcode("lookupData");for(var e=t.id.parts,n=0,i=e.length;n<i;n++)this.opcode("lookup",e[n])},STRING:function(t){this.opcode("pushString",t.string)},INTEGER:function(t){this.opcode("pushLiteral",t.integer)},BOOLEAN:function(t){this.opcode("pushLiteral",t.bool)},comment:function(){},opcode:function(t){this.opcodes.push({opcode:t,args:[].slice.call(arguments,1)})},declare:function(t,e){this.opcodes.push({opcode:"DECLARE",name:t,value:e})},addDepth:function(t){0!==t&&(this.depths[t]||(this.depths[t]=!0,this.depths.list.push(t)))},classifySexpr:function(t){var e=t.isHelper,n=t.eligibleHelper,i=this.options;if(n&&!e){var r=t.id.parts[0];i.knownHelpers[r]?e=!0:i.knownHelpersOnly&&(n=!1)}return e?"helper":n?"ambiguous":"simple"},pushParams:function(t){for(var e,n=t.length;n--;)e=t[n],this.options.stringParams?(e.depth&&this.addDepth(e.depth),this.opcode("getContext",e.depth||0),this.opcode("pushStringParam",e.stringModeValue,e.type),"sexpr"===e.type&&this.sexpr(e)):this[e.type](e)},setupFullMustacheParams:function(t,e,n){var i=t.params;return this.pushParams(i),this.opcode("pushProgram",e),this.opcode("pushProgram",n),t.hash?this.hash(t.hash):this.opcode("emptyHash"),i}},r.precompile=n,r.compile=i,r}(n),u=function(t,e){"use strict";function n(t){this.value=t}function i(){}var r,o=t.COMPILER_REVISION,s=t.REVISION_CHANGES,a=t.log,c=e;i.prototype={nameLookup:function(t,e){var n,r;return 0===t.indexOf("depth")&&(n=!0),r=/^[0-9]+$/.test(e)?t+"["+e+"]":i.isValidJavaScriptVariableName(e)?t+"."+e:t+"['"+e+"']",n?"("+t+" && "+r+")":r},compilerInfo:function(){var t=o,e=s[t];return"this.compilerInfo = ["+t+",'"+e+"'];\n"},appendToBuffer:function(t){return this.environment.isSimple?"return "+t+";":{appendToBuffer:!0,content:t,toString:function(){return"buffer += "+t+";"}}},initializeBuffer:function(){return this.quotedString("")},namespace:"Handlebars",compile:function(t,e,n,i){this.environment=t,this.options=e||{},a("debug",this.environment.disassemble()+"\n\n"),this.name=this.environment.name,this.isChild=!!n,this.context=n||{programs:[],environments:[],aliases:{}},this.preamble(),this.stackSlot=0,this.stackVars=[],this.registers={list:[]},this.hashes=[],this.compileStack=[],this.inlineStack=[],
// this.compileChildren(t,e);var r,o=t.opcodes;this.i=0;for(var s=o.length;this.i<s;this.i++)r=o[this.i],"DECLARE"===r.opcode?this[r.name]=r.value:this[r.opcode].apply(this,r.args),r.opcode!==this.stripNext&&(this.stripNext=!1);if(this.pushSource(""),this.stackSlot||this.inlineStack.length||this.compileStack.length)throw new c("Compile completed with content left on stack");return this.createFunctionContext(i)},preamble:function(){var t=[];if(this.isChild)t.push("");else{var e=this.namespace,n="helpers = this.merge(helpers, "+e+".helpers);";this.environment.usePartial&&(n=n+" partials = this.merge(partials, "+e+".partials);"),this.options.data&&(n+=" data = data || {};"),t.push(n)}this.environment.isSimple?t.push(""):t.push(", buffer = "+this.initializeBuffer()),this.lastContext=0,this.source=t},createFunctionContext:function(t){var e=this.stackVars.concat(this.registers.list);if(e.length>0&&(this.source[1]=this.source[1]+", "+e.join(", ")),!this.isChild)for(var n in this.context.aliases)this.context.aliases.hasOwnProperty(n)&&(this.source[1]=this.source[1]+", "+n+"="+this.context.aliases[n]);this.source[1]&&(this.source[1]="var "+this.source[1].substring(2)+";"),this.isChild||(this.source[1]+="\n"+this.context.programs.join("\n")+"\n"),this.environment.isSimple||this.pushSource("return buffer;");for(var i=this.isChild?["depth0","data"]:["Handlebars","depth0","helpers","partials","data"],r=0,o=this.environment.depths.list.length;r<o;r++)i.push("depth"+this.environment.depths.list[r]);var s=this.mergeSource();if(this.isChild||(s=this.compilerInfo()+s),t)return i.push(s),Function.apply(this,i);var c="function "+(this.name||"")+"("+i.join(",")+") {\n  "+s+"}";return a("debug",c+"\n\n"),c},mergeSource:function(){for(var t,e="",n=0,i=this.source.length;n<i;n++){var r=this.source[n];r.appendToBuffer?t=t?t+"\n    + "+r.content:r.content:(t&&(e+="buffer += "+t+";\n  ",t=void 0),e+=r+"\n  ")}return e},blockValue:function(){this.context.aliases.blockHelperMissing="helpers.blockHelperMissing";var t=["depth0"];this.setupParams(0,t),this.replaceStack(function(e){return t.splice(1,0,e),"blockHelperMissing.call("+t.join(", ")+")"})},ambiguousBlockValue:function(){this.context.aliases.blockHelperMissing="helpers.blockHelperMissing";var t=["depth0"];this.setupParams(0,t);var e=this.topStack();t.splice(1,0,e),this.pushSource("if (!"+this.lastHelper+") { "+e+" = blockHelperMissing.call("+t.join(", ")+"); }")},appendContent:function(t){this.pendingContent&&(t=this.pendingContent+t),this.stripNext&&(t=t.replace(/^\s+/,"")),this.pendingContent=t},strip:function(){this.pendingContent&&(this.pendingContent=this.pendingContent.replace(/\s+$/,"")),this.stripNext="strip"},append:function(){this.flushInline();var t=this.popStack();this.pushSource("if("+t+" || "+t+" === 0) { "+this.appendToBuffer(t)+" }"),this.environment.isSimple&&this.pushSource("else { "+this.appendToBuffer("''")+" }")},appendEscaped:function(){this.context.aliases.escapeExpression="this.escapeExpression",this.pushSource(this.appendToBuffer("escapeExpression("+this.popStack()+")"))},getContext:function(t){this.lastContext!==t&&(this.lastContext=t)},lookupOnContext:function(t){this.push(this.nameLookup("depth"+this.lastContext,t,"context"))},pushContext:function(){this.pushStackLiteral("depth"+this.lastContext)},resolvePossibleLambda:function(){this.context.aliases.functionType='"function"',this.replaceStack(function(t){return"typeof "+t+" === functionType ? "+t+".apply(depth0) : "+t+".apply(depth0);"})},lookup:function(t){this.replaceStack(function(e){return e+" == null || "+e+" === false ? "+e+" : "+this.nameLookup(e,t,"context")})},lookupData:function(){this.pushStackLiteral("data")},pushStringParam:function(t,e){this.pushStackLiteral("depth"+this.lastContext),this.pushString(e),"sexpr"!==e&&("string"==typeof t?this.pushString(t):this.pushStackLiteral(t))},emptyHash:function(){this.pushStackLiteral("{}"),this.options.stringParams&&(this.push("{}"),this.push("{}"))},pushHash:function(){this.hash&&this.hashes.push(this.hash),this.hash={values:[],types:[],contexts:[]}},popHash:function(){var t=this.hash;this.hash=this.hashes.pop(),this.options.stringParams&&(this.push("{"+t.contexts.join(",")+"}"),this.push("{"+t.types.join(",")+"}")),this.push("{\n    "+t.values.join(",\n    ")+"\n  }")},pushString:function(t){this.pushStackLiteral(this.quotedString(t))},push:function(t){return this.inlineStack.push(t),t},pushLiteral:function(t){this.pushStackLiteral(t)},pushProgram:function(t){null!=t?this.pushStackLiteral(this.programExpression(t)):this.pushStackLiteral(null)},invokeHelper:function(t,e,n){this.context.aliases.helperMissing="helpers.helperMissing",this.useRegister("helper");var i=this.lastHelper=this.setupHelper(t,e,!0),r=this.nameLookup("depth"+this.lastContext,e,"context"),o="helper = "+i.name+" || "+r;i.paramsInit&&(o+=","+i.paramsInit),this.push("("+o+",helper ? helper.call("+i.callParams+") : helperMissing.call("+i.helperMissingParams+"))"),n||this.flushInline()},invokeKnownHelper:function(t,e){var n=this.setupHelper(t,e);this.push(n.name+".call("+n.callParams+")")},invokeAmbiguous:function(t,e){this.context.aliases.functionType='"function"',this.useRegister("helper"),this.emptyHash();var n=this.setupHelper(0,t,e),i=this.lastHelper=this.nameLookup("helpers",t,"helper"),r=this.nameLookup("depth"+this.lastContext,t,"context"),o=this.nextStack();n.paramsInit&&this.pushSource(n.paramsInit),this.pushSource("if (helper = "+i+") { "+o+" = helper.call("+n.callParams+"); }"),this.pushSource("else { helper = "+r+"; "+o+" = typeof helper === functionType ? helper.call("+n.callParams+") : helper; }")},invokePartial:function(t){var e=[this.nameLookup("partials",t,"partial"),"'"+t+"'",this.popStack(),"helpers","partials"];this.options.data&&e.push("data"),this.context.aliases.self="this",this.push("self.invokePartial("+e.join(", ")+")")},assignToHash:function(t){var e,n,i=this.popStack();this.options.stringParams&&(n=this.popStack(),e=this.popStack());var r=this.hash;e&&r.contexts.push("'"+t+"': "+e),n&&r.types.push("'"+t+"': "+n),r.values.push("'"+t+"': ("+i+")")},compiler:i,compileChildren:function(t,e){for(var n,i,r=t.children,o=0,s=r.length;o<s;o++){n=r[o],i=new this.compiler;var a=this.matchExistingProgram(n);null==a?(this.context.programs.push(""),a=this.context.programs.length,n.index=a,n.name="program"+a,this.context.programs[a]=i.compile(n,e,this.context),this.context.environments[a]=n):(n.index=a,n.name="program"+a)}},matchExistingProgram:function(t){for(var e=0,n=this.context.environments.length;e<n;e++){var i=this.context.environments[e];if(i&&i.equals(t))return e}},programExpression:function(t){if(this.context.aliases.self="this",null==t)return"self.noop";for(var e,n=this.environment.children[t],i=n.depths.list,r=[n.index,n.name,"data"],o=0,s=i.length;o<s;o++)e=i[o],1===e?r.push("depth0"):r.push("depth"+(e-1));return(0===i.length?"self.program(":"self.programWithDepth(")+r.join(", ")+")"},register:function(t,e){this.useRegister(t),this.pushSource(t+" = "+e+";")},useRegister:function(t){this.registers[t]||(this.registers[t]=!0,this.registers.list.push(t))},pushStackLiteral:function(t){return this.push(new n(t))},pushSource:function(t){this.pendingContent&&(this.source.push(this.appendToBuffer(this.quotedString(this.pendingContent))),this.pendingContent=void 0),t&&this.source.push(t)},pushStack:function(t){this.flushInline();var e=this.incrStack();return t&&this.pushSource(e+" = "+t+";"),this.compileStack.push(e),e},replaceStack:function(t){var e,i,r,o="",s=this.isInline();if(s){var a=this.popStack(!0);if(a instanceof n)e=a.value,r=!0;else{i=!this.stackSlot;var c=i?this.incrStack():this.topStackName();o="("+this.push(c)+" = "+a+"),",e=this.topStack()}}else e=this.topStack();var l=t.call(this,e);return s?(r||this.popStack(),i&&this.stackSlot--,this.push("("+o+l+")")):(/^stack/.test(e)||(e=this.nextStack()),this.pushSource(e+" = ("+o+l+");")),e},nextStack:function(){return this.pushStack()},incrStack:function(){return this.stackSlot++,this.stackSlot>this.stackVars.length&&this.stackVars.push("stack"+this.stackSlot),this.topStackName()},topStackName:function(){return"stack"+this.stackSlot},flushInline:function(){var t=this.inlineStack;if(t.length){this.inlineStack=[];for(var e=0,i=t.length;e<i;e++){var r=t[e];r instanceof n?this.compileStack.push(r):this.pushStack(r)}}},isInline:function(){return this.inlineStack.length},popStack:function(t){var e=this.isInline(),i=(e?this.inlineStack:this.compileStack).pop();if(!t&&i instanceof n)return i.value;if(!e){if(!this.stackSlot)throw new c("Invalid stack pop");this.stackSlot--}return i},topStack:function(t){var e=this.isInline()?this.inlineStack:this.compileStack,i=e[e.length-1];return!t&&i instanceof n?i.value:i},quotedString:function(t){return'"'+t.replace(/\\/g,"\\\\").replace(/"/g,'\\"').replace(/\n/g,"\\n").replace(/\r/g,"\\r").replace(/\u2028/g,"\\u2028").replace(/\u2029/g,"\\u2029")+'"'},setupHelper:function(t,e,n){var i=[],r=this.setupParams(t,i,n),o=this.nameLookup("helpers",e,"helper");return{params:i,paramsInit:r,name:o,callParams:["depth0"].concat(i).join(", "),helperMissingParams:n&&["depth0",this.quotedString(e)].concat(i).join(", ")}},setupOptions:function(t,e){var n,i,r,o=[],s=[],a=[];o.push("hash:"+this.popStack()),this.options.stringParams&&(o.push("hashTypes:"+this.popStack()),o.push("hashContexts:"+this.popStack())),i=this.popStack(),r=this.popStack(),(r||i)&&(r||(this.context.aliases.self="this",r="self.noop"),i||(this.context.aliases.self="this",i="self.noop"),o.push("inverse:"+i),o.push("fn:"+r));for(var c=0;c<t;c++)n=this.popStack(),e.push(n),this.options.stringParams&&(a.push(this.popStack()),s.push(this.popStack()));return this.options.stringParams&&(o.push("contexts:["+s.join(",")+"]"),o.push("types:["+a.join(",")+"]")),this.options.data&&o.push("data:data"),o},setupParams:function(t,e,n){var i="{"+this.setupOptions(t,e).join(",")+"}";return n?(this.useRegister("options"),e.push("options"),"options="+i):(e.push(i),"")}};for(var l="break else new var case finally return void catch for switch while continue function this with default if throw delete in try do instanceof typeof abstract enum int short boolean export interface static byte extends long super char final native synchronized class float package throws const goto private transient debugger implements protected volatile double import public let yield".split(" "),u=i.RESERVED_WORDS={},p=0,h=l.length;p<h;p++)u[l[p]]=!0;return i.isValidJavaScriptVariableName=function(t){return!(i.RESERVED_WORDS[t]||!/^[a-zA-Z_$][0-9a-zA-Z_$]*$/.test(t))},r=i}(i,n),p=function(t,e,n,i,r){"use strict";var o,s=t,a=e,c=n.parser,l=n.parse,u=i.Compiler,p=i.compile,h=i.precompile,d=r,f=s.create,m=function(){var t=f();return t.compile=function(e,n){return p(e,n,t)},t.precompile=function(e,n){return h(e,n,t)},t.AST=a,t.Compiler=u,t.JavaScriptCompiler=d,t.Parser=c,t.parse=l,t};return s=m(),s.create=m,o=s}(o,s,c,l,u);return p}();

/*!
 * jquery.flexslider.min.js
 */
/*
 * jQuery FlexSlider v2.6.3
 * Copyright 2012 WooThemes
 * Contributing Author: Tyler Smith
 */
! function (t) {
	var e = !0;
	t.flexslider = function (n, i) {
		var r = t(n);
		r.vars = t.extend({}, t.flexslider.defaults, i);
		var o, s = r.vars.namespace,
			a = window.navigator && window.navigator.msPointerEnabled && window.MSGesture,
			c = ("ontouchstart" in window || a || window.DocumentTouch && document instanceof DocumentTouch) && r.vars.touch,
			l = "click touchend MSPointerUp keyup",
			u = "",
			p = "vertical" === r.vars.direction,
			h = r.vars.reverse,
			d = r.vars.itemWidth > 0,
			f = "fade" === r.vars.animation,
			m = "" !== r.vars.asNavFor,
			v = {};
		t.data(n, "flexslider", r), v = {
			init: function () {
				r.animating = !1, r.currentSlide = parseInt(r.vars.startAt ? r.vars.startAt : 0, 10), isNaN(r.currentSlide) && (r.currentSlide = 0), r.animatingTo = r.currentSlide, r.atEnd = 0 === r.currentSlide || r.currentSlide === r.last, r.containerSelector = r.vars.selector.substr(0, r.vars.selector.search(" ")), r.slides = t(r.vars.selector, r), r.container = t(r.containerSelector, r), r.count = r.slides.length, r.syncExists = t(r.vars.sync).length > 0, "slide" === r.vars.animation && (r.vars.animation = "swing"), r.prop = p ? "top" : "marginLeft", r.args = {}, r.manualPause = !1, r.stopped = !1, r.started = !1, r.startTimeout = null, r.transitions = !r.vars.video && !f && r.vars.useCSS && function () {
					var t = document.createElement("div"),
						e = ["perspectiveProperty", "WebkitPerspective", "MozPerspective", "OPerspective", "msPerspective"];
					for (var n in e)
						if (void 0 !== t.style[e[n]]) return r.pfx = e[n].replace("Perspective", "").toLowerCase(), r.prop = "-" + r.pfx + "-transform", !0;
					return !1
				}(), r.ensureAnimationEnd = "", "" !== r.vars.controlsContainer && (r.controlsContainer = t(r.vars.controlsContainer).length > 0 && t(r.vars.controlsContainer)), "" !== r.vars.manualControls && (r.manualControls = t(r.vars.manualControls).length > 0 && t(r.vars.manualControls)), "" !== r.vars.customDirectionNav && (r.customDirectionNav = 2 === t(r.vars.customDirectionNav).length && t(r.vars.customDirectionNav)), r.vars.randomize && (r.slides.sort(function () {
					return Math.round(Math.random()) - .5
				}), r.container.empty().append(r.slides)), r.doMath(), r.setup("init"), r.vars.controlNav && v.controlNav.setup(), r.vars.directionNav && v.directionNav.setup(), r.vars.keyboard && (1 === t(r.containerSelector).length || r.vars.multipleKeyboard) && t(document).bind("keyup", function (t) {
					var e = t.keyCode;
					if (!r.animating && (39 === e || 37 === e)) {
						var n = 39 === e ? r.getTarget("next") : 37 === e && r.getTarget("prev");
						r.flexAnimate(n, r.vars.pauseOnAction)
					}
				}), r.vars.mousewheel && r.bind("mousewheel", function (t, e, n, i) {
					t.preventDefault();
					var o = 0 > e ? r.getTarget("next") : r.getTarget("prev");
					r.flexAnimate(o, r.vars.pauseOnAction)
				}), r.vars.pausePlay && v.pausePlay.setup(), r.vars.slideshow && r.vars.pauseInvisible && v.pauseInvisible.init(), r.vars.slideshow && (r.vars.pauseOnHover && r.hover(function () {
					r.manualPlay || r.manualPause || r.pause()
				}, function () {
					r.manualPause || r.manualPlay || r.stopped || r.play()
				}), r.vars.pauseInvisible && v.pauseInvisible.isHidden() || (r.vars.initDelay > 0 ? r.startTimeout = setTimeout(r.play, r.vars.initDelay) : r.play())), m && v.asNav.setup(), c && r.vars.touch && v.touch(), (!f || f && r.vars.smoothHeight) && t(window).bind("resize orientationchange focus", v.resize), r.find("img").attr("draggable", "false"), setTimeout(function () {
					r.vars.start(r)
				}, 200)
			},
			asNav: {
				setup: function () {
					r.asNav = !0, r.animatingTo = Math.floor(r.currentSlide / r.move), r.currentItem = r.currentSlide, r.slides.removeClass(s + "active-slide").eq(r.currentItem).addClass(s + "active-slide"), a ? (n._slider = r, r.slides.each(function () {
						var e = this;
						e._gesture = new MSGesture, e._gesture.target = e, e.addEventListener("MSPointerDown", function (t) {
							t.preventDefault(), t.currentTarget._gesture && t.currentTarget._gesture.addPointer(t.pointerId)
						}, !1), e.addEventListener("MSGestureTap", function (e) {
							e.preventDefault();
							var n = t(this),
								i = n.index();
							t(r.vars.asNavFor).data("flexslider").animating || n.hasClass("active") || (r.direction = r.currentItem < i ? "next" : "prev", r.flexAnimate(i, r.vars.pauseOnAction, !1, !0, !0))
						})
					})) : r.slides.on(l, function (e) {
						e.preventDefault();
						var n = t(this),
							i = n.index(),
							o = n.offset().left - t(r).scrollLeft();
						0 >= o && n.hasClass(s + "active-slide") ? r.flexAnimate(r.getTarget("prev"), !0) : t(r.vars.asNavFor).data("flexslider").animating || n.hasClass(s + "active-slide") || (r.direction = r.currentItem < i ? "next" : "prev", r.flexAnimate(i, r.vars.pauseOnAction, !1, !0, !0))
					})
				}
			},
			controlNav: {
				setup: function () {
					r.manualControls ? v.controlNav.setupManual() : v.controlNav.setupPaging()
				},
				setupPaging: function () {
					var e, n, i = "thumbnails" === r.vars.controlNav ? "control-thumbs" : "control-paging",
						o = 1;
					if (r.controlNavScaffold = t('<ol class="' + s + "control-nav " + s + i + '"></ol>'), r.pagingCount > 1)
						for (var a = 0; a < r.pagingCount; a++) {
							n = r.slides.eq(a), void 0 === n.attr("data-thumb-alt") && n.attr("data-thumb-alt", "");
							var c = "" !== n.attr("data-thumb-alt") ? c = ' alt="' + n.attr("data-thumb-alt") + '"' : "";
							if (e = "thumbnails" === r.vars.controlNav ? '<img src="' + n.attr("data-thumb") + '"' + c + "/>" : '<a href="#">' + o + "</a>", "thumbnails" === r.vars.controlNav && !0 === r.vars.thumbCaptions) {
								var p = n.attr("data-thumbcaption");
								"" !== p && void 0 !== p && (e += '<span class="' + s + 'caption">' + p + "</span>")
							}
							r.controlNavScaffold.append("<li>" + e + "</li>"), o++
						}
					r.controlsContainer ? t(r.controlsContainer).append(r.controlNavScaffold) : r.append(r.controlNavScaffold), v.controlNav.set(), v.controlNav.active(), r.controlNavScaffold.delegate("a, img", l, function (e) {
						if (e.preventDefault(), "" === u || u === e.type) {
							var n = t(this),
								i = r.controlNav.index(n);
							n.hasClass(s + "active") || (r.direction = i > r.currentSlide ? "next" : "prev", r.flexAnimate(i, r.vars.pauseOnAction))
						}
						"" === u && (u = e.type), v.setToClearWatchedEvent()
					})
				},
				setupManual: function () {
					r.controlNav = r.manualControls, v.controlNav.active(), r.controlNav.bind(l, function (e) {
						if (e.preventDefault(), "" === u || u === e.type) {
							var n = t(this),
								i = r.controlNav.index(n);
							n.hasClass(s + "active") || (i > r.currentSlide ? r.direction = "next" : r.direction = "prev", r.flexAnimate(i, r.vars.pauseOnAction))
						}
						"" === u && (u = e.type), v.setToClearWatchedEvent()
					})
				},
				set: function () {
					var e = "thumbnails" === r.vars.controlNav ? "img" : "a";
					r.controlNav = t("." + s + "control-nav li " + e, r.controlsContainer ? r.controlsContainer : r)
				},
				active: function () {
					r.controlNav.removeClass(s + "active").eq(r.animatingTo).addClass(s + "active")
				},
				update: function (e, n) {
					r.pagingCount > 1 && "add" === e ? r.controlNavScaffold.append(t('<li><a href="#">' + r.count + "</a></li>")) : 1 === r.pagingCount ? r.controlNavScaffold.find("li").remove() : r.controlNav.eq(n).closest("li").remove(), v.controlNav.set(), r.pagingCount > 1 && r.pagingCount !== r.controlNav.length ? r.update(n, e) : v.controlNav.active()
				}
			},
			directionNav: {
				setup: function () {
					var e = t('<ul class="' + s + 'direction-nav"><li class="' + s + 'nav-prev"><a class="' + s + 'prev" href="#">' + r.vars.prevText + '</a></li><li class="' + s + 'nav-next"><a class="' + s + 'next" href="#">' + r.vars.nextText + "</a></li></ul>");
					r.customDirectionNav ? r.directionNav = r.customDirectionNav : r.controlsContainer ? (t(r.controlsContainer).append(e), r.directionNav = t("." + s + "direction-nav li a", r.controlsContainer)) : (r.append(e), r.directionNav = t("." + s + "direction-nav li a", r)), v.directionNav.update(), r.directionNav.bind(l, function (e) {
						e.preventDefault();
						var n;
						"" !== u && u !== e.type || (n = t(this).hasClass(s + "next") ? r.getTarget("next") : r.getTarget("prev"), r.flexAnimate(n, r.vars.pauseOnAction)), "" === u && (u = e.type), v.setToClearWatchedEvent()
					})
				},
				update: function () {
					var t = s + "disabled";
					1 === r.pagingCount ? r.directionNav.addClass(t).attr("tabindex", "-1") : r.vars.animationLoop ? r.directionNav.removeClass(t).removeAttr("tabindex") : 0 === r.animatingTo ? r.directionNav.removeClass(t).filter("." + s + "prev").addClass(t).attr("tabindex", "-1") : r.animatingTo === r.last ? r.directionNav.removeClass(t).filter("." + s + "next").addClass(t).attr("tabindex", "-1") : r.directionNav.removeClass(t).removeAttr("tabindex")
				}
			},
			pausePlay: {
				setup: function () {
					var e = t('<div class="' + s + 'pauseplay"><a href="#"></a></div>');
					r.controlsContainer ? (r.controlsContainer.append(e), r.pausePlay = t("." + s + "pauseplay a", r.controlsContainer)) : (r.append(e), r.pausePlay = t("." + s + "pauseplay a", r)), v.pausePlay.update(r.vars.slideshow ? s + "pause" : s + "play"), r.pausePlay.bind(l, function (e) {
						e.preventDefault(), "" !== u && u !== e.type || (t(this).hasClass(s + "pause") ? (r.manualPause = !0, r.manualPlay = !1, r.pause()) : (r.manualPause = !1, r.manualPlay = !0, r.play())), "" === u && (u = e.type), v.setToClearWatchedEvent()
					})
				},
				update: function (t) {
					"play" === t ? r.pausePlay.removeClass(s + "pause").addClass(s + "play").html(r.vars.playText) : r.pausePlay.removeClass(s + "play").addClass(s + "pause").html(r.vars.pauseText)
				}
			},
			touch: function () {
				function t(t) {
					t.stopPropagation(), r.animating ? t.preventDefault() : (r.pause(), n._gesture.addPointer(t.pointerId), w = 0, l = p ? r.h : r.w, m = Number(new Date), c = d && h && r.animatingTo === r.last ? 0 : d && h ? r.limit - (r.itemW + r.vars.itemMargin) * r.move * r.animatingTo : d && r.currentSlide === r.last ? r.limit : d ? (r.itemW + r.vars.itemMargin) * r.move * r.currentSlide : h ? (r.last - r.currentSlide + r.cloneOffset) * l : (r.currentSlide + r.cloneOffset) * l)
				}

				function e(t) {
					t.stopPropagation();
					var e = t.target._slider;
					if (e) {
						var i = -t.translationX,
							r = -t.translationY;
						return w += p ? r : i, u = w, S = p ? Math.abs(w) < Math.abs(-i) : Math.abs(w) < Math.abs(-r), t.detail === t.MSGESTURE_FLAG_INERTIA ? void setImmediate(function () {
							n._gesture.stop()
						}) : void ((!S || Number(new Date) - m > 500) && (t.preventDefault(), !f && e.transitions && (e.vars.animationLoop || (u = w / (0 === e.currentSlide && 0 > w || e.currentSlide === e.last && w > 0 ? Math.abs(w) / l + 2 : 1)), e.setProps(c + u, "setTouch"))))
					}
				}

				function i(t) {
					t.stopPropagation();
					var e = t.target._slider;
					if (e) {
						if (e.animatingTo === e.currentSlide && !S && null !== u) {
							var n = h ? -u : u,
								i = n > 0 ? e.getTarget("next") : e.getTarget("prev");
							e.canAdvance(i) && (Number(new Date) - m < 550 && Math.abs(n) > 50 || Math.abs(n) > l / 2) ? e.flexAnimate(i, e.vars.pauseOnAction) : f || e.flexAnimate(e.currentSlide, e.vars.pauseOnAction, !0)
						}
						o = null, s = null, u = null, c = null, w = 0
					}
				}
				var o, s, c, l, u, m, v, g, y, S = !1,
					b = 0,
					x = 0,
					w = 0;
				a ? (n.style.msTouchAction = "none", n._gesture = new MSGesture, n._gesture.target = n, n.addEventListener("MSPointerDown", t, !1), n._slider = r, n.addEventListener("MSGestureChange", e, !1), n.addEventListener("MSGestureEnd", i, !1)) : (v = function (t) {
					r.animating ? t.preventDefault() : (window.navigator.msPointerEnabled || 1 === t.touches.length) && (r.pause(), l = p ? r.h : r.w, m = Number(new Date), b = t.touches[0].pageX, x = t.touches[0].pageY, c = d && h && r.animatingTo === r.last ? 0 : d && h ? r.limit - (r.itemW + r.vars.itemMargin) * r.move * r.animatingTo : d && r.currentSlide === r.last ? r.limit : d ? (r.itemW + r.vars.itemMargin) * r.move * r.currentSlide : h ? (r.last - r.currentSlide + r.cloneOffset) * l : (r.currentSlide + r.cloneOffset) * l, o = p ? x : b, s = p ? b : x, n.addEventListener("touchmove", g, !1), n.addEventListener("touchend", y, !1))
				}, g = function (t) {
					b = t.touches[0].pageX, x = t.touches[0].pageY, u = p ? o - x : o - b, S = p ? Math.abs(u) < Math.abs(b - s) : Math.abs(u) < Math.abs(x - s);
					var e = 500;
					(!S || Number(new Date) - m > e) && (t.preventDefault(), !f && r.transitions && (r.vars.animationLoop || (u /= 0 === r.currentSlide && 0 > u || r.currentSlide === r.last && u > 0 ? Math.abs(u) / l + 2 : 1), r.setProps(c + u, "setTouch")))
				}, y = function (t) {
					if (n.removeEventListener("touchmove", g, !1), r.animatingTo === r.currentSlide && !S && null !== u) {
						var e = h ? -u : u,
							i = e > 0 ? r.getTarget("next") : r.getTarget("prev");
						r.canAdvance(i) && (Number(new Date) - m < 550 && Math.abs(e) > 50 || Math.abs(e) > l / 2) ? r.flexAnimate(i, r.vars.pauseOnAction) : f || r.flexAnimate(r.currentSlide, r.vars.pauseOnAction, !0)
					}
					n.removeEventListener("touchend", y, !1), o = null, s = null, u = null, c = null
				}, n.addEventListener("touchstart", v, !1))
			},
			resize: function () {
				!r.animating && r.is(":visible") && (d || r.doMath(), f ? v.smoothHeight() : d ? (r.slides.width(r.computedW), r.update(r.pagingCount), r.setProps()) : p ? (r.viewport.height(r.h), r.setProps(r.h, "setTotal")) : (r.vars.smoothHeight && v.smoothHeight(), r.newSlides.width(r.computedW), r.setProps(r.computedW, "setTotal")))
			},
			smoothHeight: function (t) {
				if (!p || f) {
					var e = f ? r : r.viewport;
					t ? e.animate({
						height: r.slides.eq(r.animatingTo).innerHeight()
					}, t) : e.innerHeight(r.slides.eq(r.animatingTo).innerHeight())
				}
			},
			sync: function (e) {
				var n = t(r.vars.sync).data("flexslider"),
					i = r.animatingTo;
				switch (e) {
					case "animate":
						n.flexAnimate(i, r.vars.pauseOnAction, !1, !0);
						break;
					case "play":
						n.playing || n.asNav || n.play();
						break;
					case "pause":
						n.pause()
				}
			},
			uniqueID: function (e) {
				return e.filter("[id]").add(e.find("[id]")).each(function () {
					var e = t(this);
					e.attr("id", e.attr("id") + "_clone")
				}), e
			},
			pauseInvisible: {
				visProp: null,
				init: function () {
					var t = v.pauseInvisible.getHiddenProp();
					if (t) {
						var e = t.replace(/[H|h]idden/, "") + "visibilitychange";
						document.addEventListener(e, function () {
							v.pauseInvisible.isHidden() ? r.startTimeout ? clearTimeout(r.startTimeout) : r.pause() : r.started ? r.play() : r.vars.initDelay > 0 ? setTimeout(r.play, r.vars.initDelay) : r.play()
						})
					}
				},
				isHidden: function () {
					var t = v.pauseInvisible.getHiddenProp();
					return !!t && document[t]
				},
				getHiddenProp: function () {
					var t = ["webkit", "moz", "ms", "o"];
					if ("hidden" in document) return "hidden";
					for (var e = 0; e < t.length; e++)
						if (t[e] + "Hidden" in document) return t[e] + "Hidden";
					return null
				}
			},
			setToClearWatchedEvent: function () {
				clearTimeout(o), o = setTimeout(function () {
					u = ""
				}, 3e3)
			}
		}, r.flexAnimate = function (e, n, i, o, a) {
			if (r.vars.animationLoop || e === r.currentSlide || (r.direction = e > r.currentSlide ? "next" : "prev"), m && 1 === r.pagingCount && (r.direction = r.currentItem < e ? "next" : "prev"), !r.animating && (r.canAdvance(e, a) || i) && r.is(":visible")) {
				if (m && o) {
					var l = t(r.vars.asNavFor).data("flexslider");
					if (r.atEnd = 0 === e || e === r.count - 1, l.flexAnimate(e, !0, !1, !0, a), r.direction = r.currentItem < e ? "next" : "prev", l.direction = r.direction, Math.ceil((e + 1) / r.visible) - 1 === r.currentSlide || 0 === e) return r.currentItem = e, r.slides.removeClass(s + "active-slide").eq(e).addClass(s + "active-slide"), !1;
					r.currentItem = e, r.slides.removeClass(s + "active-slide").eq(e).addClass(s + "active-slide"), e = Math.floor(e / r.visible)
				}
				if (r.animating = !0, r.animatingTo = e, n && r.pause(), r.vars.before(r), r.syncExists && !a && v.sync("animate"), r.vars.controlNav && v.controlNav.active(), d || r.slides.removeClass(s + "active-slide").eq(e).addClass(s + "active-slide"), r.atEnd = 0 === e || e === r.last, r.vars.directionNav && v.directionNav.update(), e === r.last && (r.vars.end(r), r.vars.animationLoop || r.pause()), f) c ? (r.slides.eq(r.currentSlide).css({
					opacity: 0,
					zIndex: 1
				}), r.slides.eq(e).css({
					opacity: 1,
					zIndex: 2
				}), r.wrapup(S)) : (r.slides.eq(r.currentSlide).css({
					zIndex: 1
				}).animate({
					opacity: 0
				}, r.vars.animationSpeed, r.vars.easing), r.slides.eq(e).css({
					zIndex: 2
				}).animate({
					opacity: 1
				}, r.vars.animationSpeed, r.vars.easing, r.wrapup));
				else {
					var u, g, y, S = p ? r.slides.filter(":first").height() : r.computedW;
					d ? (u = r.vars.itemMargin, y = (r.itemW + u) * r.move * r.animatingTo, g = y > r.limit && 1 !== r.visible ? r.limit : y) : g = 0 === r.currentSlide && e === r.count - 1 && r.vars.animationLoop && "next" !== r.direction ? h ? (r.count + r.cloneOffset) * S : 0 : r.currentSlide === r.last && 0 === e && r.vars.animationLoop && "prev" !== r.direction ? h ? 0 : (r.count + 1) * S : h ? (r.count - 1 - e + r.cloneOffset) * S : (e + r.cloneOffset) * S, r.setProps(g, "", r.vars.animationSpeed), r.transitions ? (r.vars.animationLoop && r.atEnd || (r.animating = !1, r.currentSlide = r.animatingTo), r.container.unbind("webkitTransitionEnd transitionend"), r.container.bind("webkitTransitionEnd transitionend", function () {
						clearTimeout(r.ensureAnimationEnd), r.wrapup(S)
					}), clearTimeout(r.ensureAnimationEnd), r.ensureAnimationEnd = setTimeout(function () {
						r.wrapup(S)
					}, r.vars.animationSpeed + 100)) : r.container.animate(r.args, r.vars.animationSpeed, r.vars.easing, function () {
						r.wrapup(S)
					})
				}
				r.vars.smoothHeight && v.smoothHeight(r.vars.animationSpeed)
			}
		}, r.wrapup = function (t) {
			f || d || (0 === r.currentSlide && r.animatingTo === r.last && r.vars.animationLoop ? r.setProps(t, "jumpEnd") : r.currentSlide === r.last && 0 === r.animatingTo && r.vars.animationLoop && r.setProps(t, "jumpStart")), r.animating = !1, r.currentSlide = r.animatingTo, r.vars.after(r)
		}, r.animateSlides = function () {
			!r.animating && e && r.flexAnimate(r.getTarget("next"))
		}, r.pause = function () {
			clearInterval(r.animatedSlides), r.animatedSlides = null, r.playing = !1, r.vars.pausePlay && v.pausePlay.update("play"), r.syncExists && v.sync("pause")
		}, r.play = function () {
			r.playing && clearInterval(r.animatedSlides), r.animatedSlides = r.animatedSlides || setInterval(r.animateSlides, r.vars.slideshowSpeed), r.started = r.playing = !0, r.vars.pausePlay && v.pausePlay.update("pause"), r.syncExists && v.sync("play")
		}, r.stop = function () {
			r.pause(), r.stopped = !0
		}, r.canAdvance = function (t, e) {
			var n = m ? r.pagingCount - 1 : r.last;
			return !!e || (!(!m || r.currentItem !== r.count - 1 || 0 !== t || "prev" !== r.direction) || (!m || 0 !== r.currentItem || t !== r.pagingCount - 1 || "next" === r.direction) && (!(t === r.currentSlide && !m) && (!!r.vars.animationLoop || (!r.atEnd || 0 !== r.currentSlide || t !== n || "next" === r.direction) && (!r.atEnd || r.currentSlide !== n || 0 !== t || "next" !== r.direction))))
		}, r.getTarget = function (t) {
			return r.direction = t, "next" === t ? r.currentSlide === r.last ? 0 : r.currentSlide + 1 : 0 === r.currentSlide ? r.last : r.currentSlide - 1
		}, r.setProps = function (t, e, n) {
			var i = function () {
				var n = t ? t : (r.itemW + r.vars.itemMargin) * r.move * r.animatingTo,
					i = function () {
						if (d) return "setTouch" === e ? t : h && r.animatingTo === r.last ? 0 : h ? r.limit - (r.itemW + r.vars.itemMargin) * r.move * r.animatingTo : r.animatingTo === r.last ? r.limit : n;
						switch (e) {
							case "setTotal":
								return h ? (r.count - 1 - r.currentSlide + r.cloneOffset) * t : (r.currentSlide + r.cloneOffset) * t;
							case "setTouch":
								return h ? t : t;
							case "jumpEnd":
								return h ? t : r.count * t;
							case "jumpStart":
								return h ? r.count * t : t;
							default:
								return t
						}
					}();
				return -1 * i + "px"
			}();
			r.transitions && (i = p ? "translate3d(0," + i + ",0)" : "translate3d(" + i + ",0,0)", n = void 0 !== n ? n / 1e3 + "s" : "0s", r.container.css("-" + r.pfx + "-transition-duration", n), r.container.css("transition-duration", n)), r.args[r.prop] = i, (r.transitions || void 0 === n) && r.container.css(r.args), r.container.css("transform", i)
		}, r.setup = function (e) {
			if (f) r.slides.css({
				width: "100%",
				float: "left",
				marginRight: "-100%",
				position: "relative"
			}), "init" === e && (c ? r.slides.css({
				opacity: 0,
				display: "block",
				webkitTransition: "opacity " + r.vars.animationSpeed / 1e3 + "s ease",
				zIndex: 1
			}).eq(r.currentSlide).css({
				opacity: 1,
				zIndex: 2
			}) : 0 == r.vars.fadeFirstSlide ? r.slides.css({
				opacity: 0,
				display: "block",
				zIndex: 1
			}).eq(r.currentSlide).css({
				zIndex: 2
			}).css({
				opacity: 1
			}) : r.slides.css({
				opacity: 0,
				display: "block",
				zIndex: 1
			}).eq(r.currentSlide).css({
				zIndex: 2
			}).animate({
				opacity: 1
			}, r.vars.animationSpeed, r.vars.easing)), r.vars.smoothHeight && v.smoothHeight();
			else {
				var n, i;
				"init" === e && (r.viewport = t('<div class="' + s + 'viewport"></div>').css({
					overflow: "hidden",
					position: "relative"
				}).appendTo(r).append(r.container), r.cloneCount = 0, r.cloneOffset = 0, h && (i = t.makeArray(r.slides).reverse(), r.slides = t(i), r.container.empty().append(r.slides))), r.vars.animationLoop && !d && (r.cloneCount = 2, r.cloneOffset = 1, "init" !== e && r.container.find(".clone").remove(), r.container.append(v.uniqueID(r.slides.first().clone().addClass("clone")).attr("aria-hidden", "true")).prepend(v.uniqueID(r.slides.last().clone().addClass("clone")).attr("aria-hidden", "true"))), r.newSlides = t(r.vars.selector, r), n = h ? r.count - 1 - r.currentSlide + r.cloneOffset : r.currentSlide + r.cloneOffset, p && !d ? (r.container.height(200 * (r.count + r.cloneCount) + "%").css("position", "absolute").width("100%"), setTimeout(function () {
					r.newSlides.css({
						display: "block"
					}), r.doMath(), r.viewport.height(r.h), r.setProps(n * r.h, "init")
				}, "init" === e ? 100 : 0)) : (r.container.width(200 * (r.count + r.cloneCount) + "%"), r.setProps(n * r.computedW, "init"), setTimeout(function () {
					r.doMath(), r.newSlides.css({
						width: r.computedW,
						marginRight: r.computedM,
						float: "left",
						display: "block"
					}), r.vars.smoothHeight && v.smoothHeight()
				}, "init" === e ? 100 : 0))
			}
			d || r.slides.removeClass(s + "active-slide").eq(r.currentSlide).addClass(s + "active-slide"), r.vars.init(r)
		}, r.doMath = function () {
			var t = r.slides.first(),
				e = r.vars.itemMargin,
				n = r.vars.minItems,
				i = r.vars.maxItems;
			r.w = void 0 === r.viewport ? r.width() : r.viewport.width(), r.h = t.height(), r.boxPadding = t.outerWidth() - t.width(), d ? (r.itemT = r.vars.itemWidth + e, r.itemM = e, r.minW = n ? n * r.itemT : r.w, r.maxW = i ? i * r.itemT - e : r.w, r.itemW = r.minW > r.w ? (r.w - e * (n - 1)) / n : r.maxW < r.w ? (r.w - e * (i - 1)) / i : r.vars.itemWidth > r.w ? r.w : r.vars.itemWidth, r.visible = Math.floor(r.w / r.itemW), r.move = r.vars.move > 0 && r.vars.move < r.visible ? r.vars.move : r.visible, r.pagingCount = Math.ceil((r.count - r.visible) / r.move + 1), r.last = r.pagingCount - 1, r.limit = 1 === r.pagingCount ? 0 : r.vars.itemWidth > r.w ? r.itemW * (r.count - 1) + e * (r.count - 1) : (r.itemW + e) * r.count - r.w - e) : (r.itemW = r.w, r.itemM = e, r.pagingCount = r.count, r.last = r.count - 1), r.computedW = r.itemW - r.boxPadding, r.computedM = r.itemM
		}, r.update = function (t, e) {
			r.doMath(), d || (t < r.currentSlide ? r.currentSlide += 1 : t <= r.currentSlide && 0 !== t && (r.currentSlide -= 1), r.animatingTo = r.currentSlide), r.vars.controlNav && !r.manualControls && ("add" === e && !d || r.pagingCount > r.controlNav.length ? v.controlNav.update("add") : ("remove" === e && !d || r.pagingCount < r.controlNav.length) && (d && r.currentSlide > r.last && (r.currentSlide -= 1, r.animatingTo -= 1), v.controlNav.update("remove", r.last))), r.vars.directionNav && v.directionNav.update()
		}, r.addSlide = function (e, n) {
			var i = t(e);
			r.count += 1, r.last = r.count - 1, p && h ? void 0 !== n ? r.slides.eq(r.count - n).after(i) : r.container.prepend(i) : void 0 !== n ? r.slides.eq(n).before(i) : r.container.append(i), r.update(n, "add"), r.slides = t(r.vars.selector + ":not(.clone)", r), r.setup(), r.vars.added(r)
		}, r.removeSlide = function (e) {
			var n = isNaN(e) ? r.slides.index(t(e)) : e;
			r.count -= 1, r.last = r.count - 1, isNaN(e) ? t(e, r.slides).remove() : p && h ? r.slides.eq(r.last).remove() : r.slides.eq(e).remove(), r.doMath(), r.update(n, "remove"), r.slides = t(r.vars.selector + ":not(.clone)", r), r.setup(), r.vars.removed(r)
		}, v.init()
	}, t(window).blur(function (t) {
		e = !1
	}).focus(function (t) {
		e = !0
	}), t.flexslider.defaults = {
		namespace: "flex-",
		selector: ".slides > li",
		animation: "fade",
		easing: "swing",
		direction: "horizontal",
		reverse: !1,
		animationLoop: !0,
		smoothHeight: !1,
		startAt: 0,
		slideshow: !0,
		slideshowSpeed: 7e3,
		animationSpeed: 600,
		initDelay: 0,
		randomize: !1,
		fadeFirstSlide: !0,
		thumbCaptions: !1,
		pauseOnAction: !0,
		pauseOnHover: !1,
		pauseInvisible: !0,
		useCSS: !0,
		touch: !0,
		video: !1,
		controlNav: !0,
		directionNav: !0,
		prevText: "Previous",
		nextText: "Next",
		keyboard: !0,
		multipleKeyboard: !1,
		mousewheel: !1,
		pausePlay: !1,
		pauseText: "Pause",
		playText: "Play",
		controlsContainer: "",
		manualControls: "",
		customDirectionNav: "",
		sync: "",
		asNavFor: "",
		itemWidth: 0,
		itemMargin: 0,
		minItems: 1,
		maxItems: 0,
		move: 0,
		allowOneSlide: !0,
		start: function () { },
		before: function () { },
		after: function () { },
		end: function () { },
		added: function () { },
		removed: function () { },
		init: function () { }
	}, t.fn.flexslider = function (e) {
		if (void 0 === e && (e = {}), "object" == typeof e) return this.each(function () {
			var n = t(this),
				i = e.selector ? e.selector : ".slides > li",
				r = n.find(i);
			1 === r.length && e.allowOneSlide === !1 || 0 === r.length ? (r.fadeIn(400), e.start && e.start(n)) : void 0 === n.data("flexslider") && new t.flexslider(this, e)
		});
		var n = t(this).data("flexslider");
		switch (e) {
			case "play":
				n.play();
				break;
			case "pause":
				n.pause();
				break;
			case "stop":
				n.stop();
				break;
			case "next":
				n.flexAnimate(n.getTarget("next"), !0);
				break;
			case "prev":
			case "previous":
				n.flexAnimate(n.getTarget("prev"), !0);
				break;
			default:
				"number" == typeof e && n.flexAnimate(e, !0)
		}
	}
}(jQuery),
	/*!
	 * jquery.zoom.min.js
	 */
	/*!
		Zoom 1.7.14
		license: MIT
		http://www.jacklmoore.com/zoom
	
		Modified to include fixes on 2015-09-14.
	*/
	! function (t) {
		var e = {
			url: !1,
			callback: !1,
			target: !1,
			duration: 120,
			on: "mouseover",
			touch: !0,
			onZoomIn: !1,
			onZoomOut: !1,
			magnify: 1
		};
		t.zoom = function (e, n, i, r) {
			var o, s, a, c, l, u, p, h = t(e),
				d = h.css("position"),
				f = t(n);
			return h.css("position", /(absolute|fixed)/.test(d) ? d : "relative"), h.css("overflow", "hidden"), i.style.width = i.style.height = "", t(i).addClass("zoomImg").css({
				position: "absolute",
				top: 0,
				left: 0,
				opacity: 0,
				width: i.width * r,
				height: i.height * r,
				border: "none",
				maxWidth: "none",
				maxHeight: "none"
			}).appendTo(e), {
				init: function () {
					s = h.outerWidth(), o = h.outerHeight(), n === h[0] ? (c = s, a = o) : (c = f.outerWidth(), a = f.outerHeight()), l = (i.width - s) / c, u = (i.height - o) / a, p = f.offset()
				},
				move: function (t) {
					var e = t.pageX - p.left,
						n = t.pageY - p.top;
					n = Math.max(Math.min(n, a), 0), e = Math.max(Math.min(e, c), 0), i.style.left = e * -l + "px", i.style.top = n * -u + "px"
				}
			}
		}, t.fn.zoom = function (n) {
			return this.each(function () {
				var i, r = t.extend({}, e, n || {}),
					o = r.target || this,
					s = this,
					a = t(s),
					c = t(o),
					l = document.createElement("img"),
					u = t(l),
					p = "mousemove.zoom",
					h = !1,
					d = !1;
				(r.url || (i = a.find("img"), i[0] && (r.url = i.data("src") || i.attr("src")), r.url)) && (! function () {
					var t = c.css("position"),
						e = c.css("overflow");
					a.one("zoom.destroy", function () {
						a.off(".zoom"), c.css("position", t), c.css("overflow", e), u.remove(), l.onload = null
					})
				}(), l.onload = function () {
					function e(e) {
						i.init(), i.move(e), u.stop().fadeTo(t.support.opacity ? r.duration : 0, 1, !!t.isFunction(r.onZoomIn) && r.onZoomIn.call(l))
					}

					function n() {
						u.stop().fadeTo(r.duration, 0, !!t.isFunction(r.onZoomOut) && r.onZoomOut.call(l))
					}
					var i = t.zoom(o, s, l, r.magnify);
					"grab" === r.on ? a.on("mousedown.zoom", function (r) {
						1 === r.which && (t(document).one("mouseup.zoom", function () {
							n(), t(document).off(p, i.move)
						}), e(r), t(document).on(p, i.move), r.preventDefault())
					}) : "click" === r.on ? a.on("click.zoom", function (r) {
						return h ? void 0 : (h = !0, e(r), t(document).on(p, i.move), t(document).one("click.zoom", function () {
							n(), h = !1, t(document).off(p, i.move)
						}), !1)
					}) : "toggle" === r.on ? a.on("click.zoom", function (t) {
						h ? n() : e(t), h = !h
					}) : "mouseover" === r.on && (i.init(), a.on("mouseover.zoom", e).on("mouseleave.zoom", n).on(p, i.move)), r.touch && a.on("touchstart.zoom", function (t) {
						t.preventDefault(), d ? (d = !1, n()) : (d = !0, e(t.originalEvent.touches[0] || t.originalEvent.changedTouches[0]))
					}).on("touchmove.zoom", function (t) {
						t.preventDefault(), i.move(t.originalEvent.touches[0] || t.originalEvent.changedTouches[0])
					}), t.isFunction(r.callback) && r.callback.call(l)
				}, l.src = r.url)
			})
		}, t.fn.zoom.defaults = e
	}(window.jQuery),
	function () {
		function t(t, e) {
			for (var n = -1, i = e.length, r = t.length; ++n < i;) t[r + n] = e[n];
			return t
		}

		function e(t, e, n) {
			for (var i = -1, r = t.length; ++i < r;) {
				var o = t[i],
					s = e(o);
				if (null != s && (a === ct ? s === s : n(s, a))) var a = s,
					c = o
			}
			return c
		}

		function n(t, e, n) {
			var i;
			return n(t, function (t, n, r) {
				return e(t, n, r) ? (i = t, !1) : void 0
			}), i
		}

		function i(t, e, n, i, r) {
			return r(t, function (t, r, o) {
				n = i ? (i = !1, t) : e(n, t, r, o)
			}), n
		}

		function r(t, e) {
			return C(e, function (e) {
				return t[e]
			})
		}

		function o(t) {
			return t && t.Object === Object ? t : null
		}

		function s(t) {
			return dt[t]
		}

		function a(t) {
			var e = !1;
			if (null != t && "function" != typeof t.toString) try {
				e = !!(t + "")
			} catch (t) { }
			return e
		}

		function c(t, e) {
			return t = "number" == typeof t || ht.test(t) ? +t : -1, t > -1 && 0 == t % 1 && (null == e ? 9007199254740991 : e) > t
		}

		function l(t) {
			if (Q(t) && !Bt(t)) {
				if (t instanceof u) return t;
				if (kt.call(t, "__wrapped__")) {
					var e = new u(t.__wrapped__, t.__chain__);
					return e.__actions__ = I(t.__actions__), e
				}
			}
			return new u(t)
		}

		function u(t, e) {
			this.__wrapped__ = t, this.__actions__ = [], this.__chain__ = !!e
		}

		function p(t, e, n, i) {
			var r;
			return (r = t === ct) || (r = Ct[n], r = (t === r || t !== t && r !== r) && !kt.call(i, n)), r ? e : t
		}

		function h(t) {
			return X(t) ? Tt(t) : {}
		}

		function d(t, e, n) {
			if ("function" != typeof t) throw new TypeError("Expected a function");
			return setTimeout(function () {
				t.apply(ct, n)
			}, e)
		}

		function f(t, e) {
			var n = !0;
			return Lt(t, function (t, i, r) {
				return n = !!e(t, i, r)
			}), n
		}

		function m(t, e) {
			var n = [];
			return Lt(t, function (t, i, r) {
				e(t, i, r) && n.push(t)
			}), n
		}

		function v(e, n, i, r) {
			r || (r = []);
			for (var o = -1, s = e.length; ++o < s;) {
				var a = e[o];
				n > 0 && Q(a) && Z(a) && (i || Bt(a) || U(a)) ? n > 1 ? v(a, n - 1, i, r) : t(r, a) : i || (r[r.length] = a)
			}
			return r
		}

		function g(t, e) {
			return t && jt(t, e, it)
		}

		function y(t, e) {
			return m(e, function (e) {
				return Y(t[e])
			})
		}

		function S(t, e, n, i, r) {
			return t === e || (null == t || null == e || !X(t) && !Q(e) ? t !== t && e !== e : b(t, e, S, n, i, r))
		}

		function b(t, e, n, i, r, o) {
			var s = Bt(t),
				c = Bt(e),
				l = "[object Array]",
				u = "[object Array]";
			s || (l = Et.call(t), "[object Arguments]" == l && (l = "[object Object]")), c || (u = Et.call(e), "[object Arguments]" == u && (u = "[object Object]"));
			var p = "[object Object]" == l && !a(t),
				c = "[object Object]" == u && !a(e);
			return !(u = l == u) || s || p ? 2 & r || (l = p && kt.call(t, "__wrapped__"), c = c && kt.call(e, "__wrapped__"), !l && !c) ? !!u && (o || (o = []), (l = R(o, function (e) {
				return e[0] === t
			})) && l[1] ? l[1] == e : (o.push([t, e]), e = (s ? L : D)(t, e, n, i, r, o), o.pop(), e)) : n(l ? t.value() : t, c ? e.value() : e, i, r, o) : j(t, e, l)
		}

		function x(t) {
			var e = typeof t;
			return "function" == e ? t : null == t ? st : ("object" == e ? k : E)(t)
		}

		function w(t) {
			t = null == t ? t : Object(t);
			var e, n = [];
			for (e in t) n.push(e);
			return n
		}

		function C(t, e) {
			var n = -1,
				i = Z(t) ? Array(t.length) : [];
			return Lt(t, function (t, r, o) {
				i[++n] = e(t, r, o)
			}), i
		}

		function k(t) {
			var e = it(t);
			return function (n) {
				var i = e.length;
				if (null == n) return !i;
				for (n = Object(n); i--;) {
					var r = e[i];
					if (!(r in n && S(t[r], n[r], ct, 3))) return !1
				}
				return !0
			}
		}

		function _(t, e) {
			return t = Object(t), V(e, function (e, n) {
				return n in t && (e[n] = t[n]), e
			}, {})
		}

		function E(t) {
			return function (e) {
				return null == e ? ct : e[t]
			}
		}

		function P(t, e, n) {
			var i = -1,
				r = t.length;
			for (0 > e && (e = -e > r ? 0 : r + e), n = n > r ? r : n, 0 > n && (n += r), r = e > n ? 0 : n - e >>> 0, e >>>= 0, n = Array(r); ++i < r;) n[i] = t[i + e];
			return n
		}

		function I(t) {
			return P(t, 0, t.length)
		}

		function N(t, e) {
			var n;
			return Lt(t, function (t, i, r) {
				return n = e(t, i, r), !n
			}), !!n
		}

		function T(e, n) {
			return V(n, function (e, n) {
				return n.func.apply(n.thisArg, t([e], n.args))
			}, e)
		}

		function O(t, e, n, i) {
			n || (n = {});
			for (var r = -1, o = e.length; ++r < o;) {
				var s = e[r],
					a = i ? i(n[s], t[s], s, n, t) : t[s],
					c = n,
					l = c[s];
				kt.call(c, s) && (l === a || l !== l && a !== a) && (a !== ct || s in c) || (c[s] = a)
			}
			return n
		}

		function A(t) {
			return q(function (e, n) {
				var i = -1,
					r = n.length,
					o = r > 1 ? n[r - 1] : ct,
					o = "function" == typeof o ? (r--, o) : ct;
				for (e = Object(e); ++i < r;) {
					var s = n[i];
					s && t(e, s, i, o)
				}
				return e
			})
		}

		function M(t) {
			return function () {
				var e = arguments,
					n = h(t.prototype),
					e = t.apply(n, e);
				return X(e) ? e : n
			}
		}

		function H(t, e, n) {
			function i() {
				for (var o = -1, s = arguments.length, a = -1, c = n.length, l = Array(c + s), u = this && this !== xt && this instanceof i ? r : t; ++a < c;) l[a] = n[a];
				for (; s--;) l[a++] = arguments[++o];
				return u.apply(e, l)
			}
			if ("function" != typeof t) throw new TypeError("Expected a function");
			var r = M(t);
			return i
		}

		function L(t, e, n, i, r, o) {
			var s = -1,
				a = 1 & r,
				c = t.length,
				l = e.length;
			if (c != l && !(2 & r && l > c)) return !1;
			for (l = !0; ++s < c;) {
				var u = t[s],
					p = e[s];
				if (void 0 !== ct) {
					l = !1;
					break
				}
				if (a) {
					if (!N(e, function (t) {
						return u === t || n(u, t, i, r, o)
					})) {
						l = !1;
						break
					}
				} else if (u !== p && !n(u, p, i, r, o)) {
					l = !1;
					break
				}
			}
			return l
		}

		function j(t, e, n) {
			switch (n) {
				case "[object Boolean]":
				case "[object Date]":
					return +t == +e;
				case "[object Error]":
					return t.name == e.name && t.message == e.message;
				case "[object Number]":
					return t != +t ? e != +e : t == +e;
				case "[object RegExp]":
				case "[object String]":
					return t == e + ""
			}
			return !1
		}

		function D(t, e, n, i, r, o) {
			var s = 2 & r,
				a = it(t),
				c = a.length,
				l = it(e).length;
			if (c != l && !s) return !1;
			for (var u = c; u--;) {
				var p = a[u];
				if (!(s ? p in e : kt.call(e, p))) return !1
			}
			for (l = !0; ++u < c;) {
				var p = a[u],
					h = t[p],
					d = e[p];
				if (void 0 !== ct || h !== d && !n(h, d, i, r, o)) {
					l = !1;
					break
				}
				s || (s = "constructor" == p)
			}
			return l && !s && (n = t.constructor, i = e.constructor, n != i && "constructor" in t && "constructor" in e && !("function" == typeof n && n instanceof n && "function" == typeof i && i instanceof i) && (l = !1)), l
		}

		function z(t) {
			var e = t ? t.length : ct;
			if (K(e) && (Bt(t) || tt(t) || U(t))) {
				t = String;
				for (var n = -1, i = Array(e); ++n < e;) i[n] = t(n);
				e = i
			} else e = null;
			return e
		}

		function $(t) {
			var e = t && t.constructor,
				e = Y(e) && e.prototype || Ct;
			return t === e
		}

		function F(t) {
			return t ? t[0] : ct
		}

		function R(t, e) {
			return n(t, x(e), Lt)
		}

		function B(t, e) {
			return Lt(t, "function" == typeof e ? e : st)
		}

		function V(t, e, n) {
			return i(t, x(e), n, 3 > arguments.length, Lt)
		}

		function W(t, e) {
			var n;
			if ("function" != typeof e) throw new TypeError("Expected a function");
			return t = Vt(t),
				function () {
					return 0 < --t && (n = e.apply(this, arguments)), 1 >= t && (e = ct), n
				}
		}

		function q(t) {
			var e;
			if ("function" != typeof t) throw new TypeError("Expected a function");
			return e = Ht(e === ct ? t.length - 1 : Vt(e), 0),
				function () {
					for (var n = arguments, i = -1, r = Ht(n.length - e, 0), o = Array(r); ++i < r;) o[i] = n[e + i];
					for (r = Array(e + 1), i = -1; ++i < e;) r[i] = n[i];
					return r[e] = o, t.apply(this, r)
				}
		}

		function G(t, e) {
			return t > e
		}

		function U(t) {
			return Q(t) && Z(t) && kt.call(t, "callee") && (!Ot.call(t, "callee") || "[object Arguments]" == Et.call(t))
		}

		function Z(t) {
			return null != t && !("function" == typeof t && Y(t)) && K(Dt(t))
		}

		function Y(t) {
			return t = X(t) ? Et.call(t) : "", "[object Function]" == t || "[object GeneratorFunction]" == t
		}

		function K(t) {
			return "number" == typeof t && t > -1 && 0 == t % 1 && 9007199254740991 >= t
		}

		function X(t) {
			var e = typeof t;
			return !!t && ("object" == e || "function" == e)
		}

		function Q(t) {
			return !!t && "object" == typeof t
		}

		function J(t) {
			return "number" == typeof t || Q(t) && "[object Number]" == Et.call(t)
		}

		function tt(t) {
			return "string" == typeof t || !Bt(t) && Q(t) && "[object String]" == Et.call(t)
		}

		function et(t, e) {
			return e > t
		}

		function nt(t) {
			return "string" == typeof t ? t : null == t ? "" : t + ""
		}

		function it(t) {
			var e = $(t);
			if (!e && !Z(t)) return Mt(Object(t));
			var n, i = z(t),
				r = !!i,
				i = i || [],
				o = i.length;
			for (n in t) !kt.call(t, n) || r && ("length" == n || c(n, o)) || e && "constructor" == n || i.push(n);
			return i
		}

		function rt(t) {
			for (var e = -1, n = $(t), i = w(t), r = i.length, o = z(t), s = !!o, o = o || [], a = o.length; ++e < r;) {
				var l = i[e];
				s && ("length" == l || c(l, a)) || "constructor" == l && (n || !kt.call(t, l)) || o.push(l)
			}
			return o
		}

		function ot(t) {
			return t ? r(t, it(t)) : []
		}

		function st(t) {
			return t
		}

		function at(e, n, i) {
			var r = it(n),
				o = y(n, r);
			null != i || X(n) && (o.length || !r.length) || (i = n, n = e, e = this, o = y(n, it(n)));
			var s = !(X(i) && "chain" in i) || i.chain,
				a = Y(e);
			return Lt(o, function (i) {
				var r = n[i];
				e[i] = r, a && (e.prototype[i] = function () {
					var n = this.__chain__;
					if (s || n) {
						var i = e(this.__wrapped__);
						return (i.__actions__ = I(this.__actions__)).push({
							func: r,
							args: arguments,
							thisArg: e
						}), i.__chain__ = n, i
					}
					return r.apply(e, t([this.value()], arguments))
				})
			}), e
		}
		var ct, lt = 1 / 0,
			ut = /[&<>"'`]/g,
			pt = RegExp(ut.source),
			ht = /^(?:0|[1-9]\d*)$/,
			dt = {
				"&": "&amp;",
				"<": "&lt;",
				">": "&gt;",
				'"': "&quot;",
				"'": "&#39;",
				"`": "&#96;"
			},
			ft = {
				function: !0,
				object: !0
			},
			mt = ft[typeof exports] && exports && !exports.nodeType ? exports : ct,
			vt = ft[typeof module] && module && !module.nodeType ? module : ct,
			gt = vt && vt.exports === mt ? mt : ct,
			yt = o(ft[typeof self] && self),
			St = o(ft[typeof window] && window),
			bt = o(ft[typeof this] && this),
			xt = o(mt && vt && "object" == typeof global && global) || St !== (bt && bt.window) && St || yt || bt || Function("return this")(),
			wt = Array.prototype,
			Ct = Object.prototype,
			kt = Ct.hasOwnProperty,
			_t = 0,
			Et = Ct.toString,
			Pt = xt._,
			It = xt.Reflect,
			Nt = It ? It.f : ct,
			Tt = Object.create,
			Ot = Ct.propertyIsEnumerable,
			At = xt.isFinite,
			Mt = Object.keys,
			Ht = Math.max,
			Lt = function (t, e) {
				return function (n, i) {
					if (null == n) return n;
					if (!Z(n)) return t(n, i);
					for (var r = n.length, o = e ? r : -1, s = Object(n);
						(e ? o-- : ++o < r) && !1 !== i(s[o], o, s););
					return n
				}
			}(g),
			jt = function (t) {
				return function (e, n, i) {
					var r = -1,
						o = Object(e);
					i = i(e);
					for (var s = i.length; s--;) {
						var a = i[t ? s : ++r];
						if (!1 === n(o[a], a, o)) break
					}
					return e
				}
			}();
		Nt && !Ot.call({
			valueOf: 1
		}, "valueOf") && (w = function (t) {
			t = Nt(t);
			for (var e, n = []; !(e = t.next()).done;) n.push(e.value);
			return n
		});
		var Dt = E("length"),
			zt = q(function (e, n) {
				return Bt(e) || (e = null == e ? [] : [Object(e)]), v(n, 1), t(I(e), ot)
			}),
			$t = q(function (t, e, n) {
				return H(t, e, n)
			}),
			Ft = q(function (t, e) {
				return d(t, 1, e)
			}),
			Rt = q(function (t, e, n) {
				return d(t, Wt(e) || 0, n)
			}),
			Bt = Array.isArray,
			Vt = Number,
			Wt = Number,
			qt = A(function (t, e) {
				O(e, it(e), t)
			}),
			Gt = A(function (t, e) {
				O(e, rt(e), t)
			}),
			Ut = A(function (t, e, n, i) {
				O(e, rt(e), t, i)
			}),
			Zt = q(function (t) {
				return t.push(ct, p), Ut.apply(ct, t)
			}),
			Yt = q(function (t, e) {
				return null == t ? {} : _(t, v(e, 1))
			}),
			Kt = x;
		u.prototype = h(l.prototype), u.prototype.constructor = u, l.assignIn = Gt, l.before = W, l.bind = $t, l.chain = function (t) {
			return t = l(t), t.__chain__ = !0, t
		}, l.compact = function (t) {
			return m(t, Boolean)
		}, l.concat = zt, l.create = function (t, e) {
			var n = h(t);
			return e ? qt(n, e) : n
		}, l.defaults = Zt, l.defer = Ft, l.delay = Rt, l.filter = function (t, e) {
			return m(t, x(e))
		}, l.flatten = function (t) {
			return t && t.length ? v(t, 1) : []
		}, l.flattenDeep = function (t) {
			return t && t.length ? v(t, lt) : []
		}, l.iteratee = Kt, l.keys = it, l.map = function (t, e) {
			return C(t, x(e))
		}, l.matches = function (t) {
			return k(qt({}, t))
		}, l.mixin = at, l.negate = function (t) {
			if ("function" != typeof t) throw new TypeError("Expected a function");
			return function () {
				return !t.apply(this, arguments)
			}
		}, l.once = function (t) {
			return W(2, t)
		}, l.pick = Yt, l.slice = function (t, e, n) {
			var i = t ? t.length : 0;
			return n = n === ct ? i : +n, i ? P(t, null == e ? 0 : +e, n) : []
		}, l.sortBy = function (t, e) {
			var n = 0;
			return e = x(e), C(C(t, function (t, i, r) {
				return {
					c: t,
					b: n++,
					a: e(t, i, r)
				}
			}).sort(function (t, e) {
				var n;
				t: {
					n = t.a;
					var i = e.a;
					if (n !== i) {
						var r = null === n,
							o = n === ct,
							s = n === n,
							a = null === i,
							c = i === ct,
							l = i === i;
						if (n > i && !a || !s || r && !c && l || o && l) {
							n = 1;
							break t
						}
						if (i > n && !r || !l || a && !o && s || c && s) {
							n = -1;
							break t
						}
					}
					n = 0
				}
				return n || t.b - e.b
			}), E("c"))
		}, l.tap = function (t, e) {
			return e(t), t
		}, l.thru = function (t, e) {
			return e(t)
		}, l.toArray = function (t) {
			return Z(t) ? t.length ? I(t) : [] : ot(t)
		}, l.values = ot, l.extend = Gt, at(l, l), l.clone = function (t) {
			return X(t) ? Bt(t) ? I(t) : O(t, it(t)) : t
		}, l.escape = function (t) {
			return (t = nt(t)) && pt.test(t) ? t.replace(ut, s) : t
		}, l.every = function (t, e, n) {
			return e = n ? ct : e, f(t, x(e))
		}, l.find = R, l.forEach = B, l.has = function (t, e) {
			return null != t && kt.call(t, e)
		}, l.head = F, l.identity = st, l.indexOf = function (t, e, n) {
			var i = t ? t.length : 0;
			n = "number" == typeof n ? 0 > n ? Ht(i + n, 0) : n : 0, n = (n || 0) - 1;
			for (var r = e === e; ++n < i;) {
				var o = t[n];
				if (r ? o === e : o !== o) return n
			}
			return -1
		}, l.isArguments = U, l.isArray = Bt, l.isBoolean = function (t) {
			return !0 === t || !1 === t || Q(t) && "[object Boolean]" == Et.call(t)
		}, l.isDate = function (t) {
			return Q(t) && "[object Date]" == Et.call(t)
		}, l.isEmpty = function (t) {
			if (Z(t) && (Bt(t) || tt(t) || Y(t.splice) || U(t))) return !t.length;
			for (var e in t)
				if (kt.call(t, e)) return !1;
			return !0
		}, l.isEqual = function (t, e) {
			return S(t, e)
		}, l.isFinite = function (t) {
			return "number" == typeof t && At(t)
		}, l.isFunction = Y, l.isNaN = function (t) {
			return J(t) && t != +t
		}, l.isNull = function (t) {
			return null === t
		}, l.isNumber = J, l.isObject = X, l.isRegExp = function (t) {
			return X(t) && "[object RegExp]" == Et.call(t)
		}, l.isString = tt, l.isUndefined = function (t) {
			return t === ct
		}, l.last = function (t) {
			var e = t ? t.length : 0;
			return e ? t[e - 1] : ct
		}, l.max = function (t) {
			return t && t.length ? e(t, st, G) : ct
		}, l.min = function (t) {
			return t && t.length ? e(t, st, et) : ct
		}, l.noConflict = function () {
			return xt._ === this && (xt._ = Pt), this
		}, l.noop = function () { }, l.reduce = V, l.result = function (t, e, n) {
			return e = null == t ? ct : t[e], e === ct && (e = n), Y(e) ? e.call(t) : e
		}, l.size = function (t) {
			return null == t ? 0 : (t = Z(t) ? t : it(t), t.length)
		}, l.some = function (t, e, n) {
			return e = n ? ct : e, N(t, x(e))
		}, l.uniqueId = function (t) {
			var e = ++_t;
			return nt(t) + e
		}, l.each = B, l.first = F, at(l, function () {
			var t = {};
			return g(l, function (e, n) {
				kt.call(l.prototype, n) || (t[n] = e)
			}), t
		}(), {
			chain: !1
		}), l.VERSION = "4.5.1", Lt("pop join replace reverse split push shift sort splice unshift".split(" "), function (t) {
			var e = (/^(?:replace|split)$/.test(t) ? String.prototype : wt)[t],
				n = /^(?:push|sort|unshift)$/.test(t) ? "tap" : "thru",
				i = /^(?:pop|join|replace|shift)$/.test(t);
			l.prototype[t] = function () {
				var t = arguments;
				return i && !this.__chain__ ? e.apply(this.value(), t) : this[n](function (n) {
					return e.apply(n, t)
				})
			}
		}), l.prototype.toJSON = l.prototype.valueOf = l.prototype.value = function () {
			return T(this.__wrapped__, this.__actions__)
		}, (St || yt || {})._ = l, "function" == typeof define && "object" == typeof define.amd && define.amd ? define(function () {
			return l
		}) : mt && vt ? (gt && ((vt.exports = l)._ = l), mt._ = l) : xt._ = l
	}.call(this),
	/*!
	 * magnific-popup.min.js
	 */
	/*! Magnific Popup - v1.0.0 - 2015-03-30
	 * http://dimsemenov.com/plugins/magnific-popup/
	 * Copyright (c) 2015 Dmitry Semenov; */
	! function (t) {
		"function" == typeof define && define.amd ? define(["jquery"], t) : t("object" == typeof exports ? require("jquery") : window.jQuery || window.Zepto)
	}(function (t) {
		var e, n, i, r, o, s, a = "Close",
			c = "BeforeClose",
			l = "AfterClose",
			u = "BeforeAppend",
			p = "MarkupParse",
			h = "Open",
			d = "Change",
			f = "mfp",
			m = "." + f,
			v = "mfp-ready",
			g = "mfp-removing",
			y = "mfp-prevent-close",
			S = function () { },
			b = !!window.jQuery,
			x = t(window),
			w = function (t, n) {
				e.ev.on(f + t + m, n)
			},
			C = function (e, n, i, r) {
				var o = document.createElement("div");
				return o.className = "mfp-" + e, i && (o.innerHTML = i), r ? n && n.appendChild(o) : (o = t(o), n && o.appendTo(n)), o
			},
			k = function (n, i) {
				e.ev.triggerHandler(f + n, i), e.st.callbacks && (n = n.charAt(0).toLowerCase() + n.slice(1), e.st.callbacks[n] && e.st.callbacks[n].apply(e, t.isArray(i) ? i : [i]))
			},
			_ = function (n) {
				return n === s && e.currTemplate.closeBtn || (e.currTemplate.closeBtn = t(e.st.closeMarkup.replace("%title%", e.st.tClose)), s = n), e.currTemplate.closeBtn
			},
			E = function () {
				t.magnificPopup.instance || (e = new S, e.init(), t.magnificPopup.instance = e)
			},
			P = function () {
				var t = document.createElement("p").style,
					e = ["ms", "O", "Moz", "Webkit"];
				if (void 0 !== t.transition) return !0;
				for (; e.length;)
					if (e.pop() + "Transition" in t) return !0;
				return !1
			};
		S.prototype = {
			constructor: S,
			init: function () {
				var n = navigator.appVersion;
				e.isIE7 = -1 !== n.indexOf("MSIE 7."), e.isIE8 = -1 !== n.indexOf("MSIE 8."), e.isLowIE = e.isIE7 || e.isIE8, e.isAndroid = /android/gi.test(n), e.isIOS = /iphone|ipad|ipod/gi.test(n), e.supportsTransition = P(), e.probablyMobile = e.isAndroid || e.isIOS || /(Opera Mini)|Kindle|webOS|BlackBerry|(Opera Mobi)|(Windows Phone)|IEMobile/i.test(navigator.userAgent), i = t(document), e.popupsCache = {}
			},
			open: function (n) {
				var r;
				if (n.isObj === !1) {
					e.items = n.items.toArray(), e.index = 0;
					var s, a = n.items;
					for (r = 0; r < a.length; r++)
						if (s = a[r], s.parsed && (s = s.el[0]), s === n.el[0]) {
							e.index = r;
							break
						}
				} else e.items = t.isArray(n.items) ? n.items : [n.items], e.index = n.index || 0;
				if (e.isOpen) return void e.updateItemHTML();
				e.types = [], o = "", e.ev = n.mainEl && n.mainEl.length ? n.mainEl.eq(0) : i, n.key ? (e.popupsCache[n.key] || (e.popupsCache[n.key] = {}), e.currTemplate = e.popupsCache[n.key]) : e.currTemplate = {}, e.st = t.extend(!0, {}, t.magnificPopup.defaults, n), e.fixedContentPos = "auto" === e.st.fixedContentPos ? !e.probablyMobile : e.st.fixedContentPos, e.st.modal && (e.st.closeOnContentClick = !1, e.st.closeOnBgClick = !1, e.st.showCloseBtn = !1, e.st.enableEscapeKey = !1), e.bgOverlay || (e.bgOverlay = C("bg").on("click" + m, function () {
					e.close()
				}), e.wrap = C("wrap").attr("tabindex", -1).on("click" + m, function (t) {
					e._checkIfClose(t.target) && e.close()
				}), e.container = C("container", e.wrap)), e.contentContainer = C("content"), e.st.preloader && (e.preloader = C("preloader", e.container, e.st.tLoading));
				var c = t.magnificPopup.modules;
				for (r = 0; r < c.length; r++) {
					var l = c[r];
					l = l.charAt(0).toUpperCase() + l.slice(1), e["init" + l].call(e)
				}
				k("BeforeOpen"), e.st.showCloseBtn && (e.st.closeBtnInside ? (w(p, function (t, e, n, i) {
					n.close_replaceWith = _(i.type)
				}), o += " mfp-close-btn-in") : e.wrap.append(_())), e.st.alignTop && (o += " mfp-align-top"), e.wrap.css(e.fixedContentPos ? {
					overflow: e.st.overflowY,
					overflowX: "hidden",
					overflowY: e.st.overflowY
				} : {
					top: x.scrollTop(),
					position: "absolute"
				}), (e.st.fixedBgPos === !1 || "auto" === e.st.fixedBgPos && !e.fixedContentPos) && e.bgOverlay.css({
					height: i.height(),
					position: "absolute"
				}), e.st.enableEscapeKey && i.on("keyup" + m, function (t) {
					27 === t.keyCode && e.close()
				}), x.on("resize" + m, function () {
					e.updateSize()
				}), e.st.closeOnContentClick || (o += " mfp-auto-cursor"), o && e.wrap.addClass(o);
				var u = e.wH = x.height(),
					d = {};
				if (e.fixedContentPos && e._hasScrollBar(u)) {
					var f = e._getScrollbarSize();
					f && (d.marginRight = f)
				}
				e.fixedContentPos && (e.isIE7 ? t("body, html").css("overflow", "hidden") : d.overflow = "hidden");
				var g = e.st.mainClass;
				return e.isIE7 && (g += " mfp-ie7"), g && e._addClassToMFP(g), e.updateItemHTML(), k("BuildControls"), t("html").css(d), e.bgOverlay.add(e.wrap).prependTo(e.st.prependTo || t(document.body)), e._lastFocusedEl = document.activeElement, setTimeout(function () {
					e.content ? (e._addClassToMFP(v), e._setFocus()) : e.bgOverlay.addClass(v), i.on("focusin" + m, e._onFocusIn)
				}, 16), e.isOpen = !0, e.updateSize(u), k(h), n
			},
			close: function () {
				e.isOpen && (k(c), e.isOpen = !1, e.st.removalDelay && !e.isLowIE && e.supportsTransition ? (e._addClassToMFP(g), setTimeout(function () {
					e._close()
				}, e.st.removalDelay)) : e._close())
			},
			_close: function () {
				k(a);
				var n = g + " " + v + " ";
				if (e.bgOverlay.detach(), e.wrap.detach(), e.container.empty(), e.st.mainClass && (n += e.st.mainClass + " "), e._removeClassFromMFP(n), e.fixedContentPos) {
					var r = {
						marginRight: ""
					};
					e.isIE7 ? t("body, html").css("overflow", "") : r.overflow = "", t("html").css(r)
				}
				i.off("keyup" + m + " focusin" + m), e.ev.off(m), e.wrap.attr("class", "mfp-wrap").removeAttr("style"), e.bgOverlay.attr("class", "mfp-bg"), e.container.attr("class", "mfp-container"), !e.st.showCloseBtn || e.st.closeBtnInside && e.currTemplate[e.currItem.type] !== !0 || e.currTemplate.closeBtn && e.currTemplate.closeBtn.detach(), e._lastFocusedEl && t(e._lastFocusedEl).focus(), e.currItem = null, e.content = null, e.currTemplate = null, e.prevHeight = 0, k(l)
			},
			updateSize: function (t) {
				if (e.isIOS) {
					var n = document.documentElement.clientWidth / window.innerWidth,
						i = window.innerHeight * n;
					e.wrap.css("height", i), e.wH = i
				} else e.wH = t || x.height();
				e.fixedContentPos || e.wrap.css("height", e.wH), k("Resize")
			},
			updateItemHTML: function () {
				var n = e.items[e.index];
				e.contentContainer.detach(), e.content && e.content.detach(), n.parsed || (n = e.parseEl(e.index));
				var i = n.type;
				if (k("BeforeChange", [e.currItem ? e.currItem.type : "", i]), e.currItem = n, !e.currTemplate[i]) {
					var o = !!e.st[i] && e.st[i].markup;
					k("FirstMarkupParse", o), e.currTemplate[i] = !o || t(o)
				}
				r && r !== n.type && e.container.removeClass("mfp-" + r + "-holder");
				var s = e["get" + i.charAt(0).toUpperCase() + i.slice(1)](n, e.currTemplate[i]);
				e.appendContent(s, i), n.preloaded = !0, k(d, n), r = n.type, e.container.prepend(e.contentContainer), k("AfterChange")
			},
			appendContent: function (t, n) {
				e.content = t, t ? e.st.showCloseBtn && e.st.closeBtnInside && e.currTemplate[n] === !0 ? e.content.find(".mfp-close").length || e.content.append(_()) : e.content = t : e.content = "", k(u), e.container.addClass("mfp-" + n + "-holder"), e.contentContainer.append(e.content)
			},
			parseEl: function (n) {
				var i, r = e.items[n];
				if (r.tagName ? r = {
					el: t(r)
				} : (i = r.type, r = {
					data: r,
					src: r.src
				}), r.el) {
					for (var o = e.types, s = 0; s < o.length; s++)
						if (r.el.hasClass("mfp-" + o[s])) {
							i = o[s];
							break
						} r.src = r.el.attr("data-mfp-src"), r.src || (r.src = r.el.attr("href"))
				}
				return r.type = i || e.st.type || "inline", r.index = n, r.parsed = !0, e.items[n] = r, k("ElementParse", r), e.items[n]
			},
			addGroup: function (t, n) {
				var i = function (i) {
					i.mfpEl = this, e._openClick(i, t, n)
				};
				n || (n = {});
				var r = "click.magnificPopup";
				n.mainEl = t, n.items ? (n.isObj = !0, t.off(r).on(r, i)) : (n.isObj = !1, n.delegate ? t.off(r).on(r, n.delegate, i) : (n.items = t, t.off(r).on(r, i)))
			},
			_openClick: function (n, i, r) {
				var o = void 0 !== r.midClick ? r.midClick : t.magnificPopup.defaults.midClick;
				if (o || 2 !== n.which && !n.ctrlKey && !n.metaKey) {
					var s = void 0 !== r.disableOn ? r.disableOn : t.magnificPopup.defaults.disableOn;
					if (s)
						if (t.isFunction(s)) {
							if (!s.call(e)) return !0
						} else if (x.width() < s) return !0;
					n.type && (n.preventDefault(), e.isOpen && n.stopPropagation()), r.el = t(n.mfpEl), r.delegate && (r.items = i.find(r.delegate)), e.open(r)
				}
			},
			updateStatus: function (t, i) {
				if (e.preloader) {
					n !== t && e.container.removeClass("mfp-s-" + n), i || "loading" !== t || (i = e.st.tLoading);
					var r = {
						status: t,
						text: i
					};
					k("UpdateStatus", r), t = r.status, i = r.text, e.preloader.html(i), e.preloader.find("a").on("click", function (t) {
						t.stopImmediatePropagation()
					}), e.container.addClass("mfp-s-" + t), n = t
				}
			},
			_checkIfClose: function (n) {
				if (!t(n).hasClass(y)) {
					var i = e.st.closeOnContentClick,
						r = e.st.closeOnBgClick;
					if (i && r) return !0;
					if (!e.content || t(n).hasClass("mfp-close") || e.preloader && n === e.preloader[0]) return !0;
					if (n === e.content[0] || t.contains(e.content[0], n)) {
						if (i) return !0
					} else if (r && t.contains(document, n)) return !0;
					return !1
				}
			},
			_addClassToMFP: function (t) {
				e.bgOverlay.addClass(t), e.wrap.addClass(t)
			},
			_removeClassFromMFP: function (t) {
				this.bgOverlay.removeClass(t), e.wrap.removeClass(t)
			},
			_hasScrollBar: function (t) {
				return (e.isIE7 ? i.height() : document.body.scrollHeight) > (t || x.height())
			},
			_setFocus: function () {
				(e.st.focus ? e.content.find(e.st.focus).eq(0) : e.wrap).focus()
			},
			_onFocusIn: function (n) {
				return n.target === e.wrap[0] || t.contains(e.wrap[0], n.target) ? void 0 : (e._setFocus(), !1)
			},
			_parseMarkup: function (e, n, i) {
				var r;
				i.data && (n = t.extend(i.data, n)), k(p, [e, n, i]), t.each(n, function (t, n) {
					if (void 0 === n || n === !1) return !0;
					if (r = t.split("_"), r.length > 1) {
						var i = e.find(m + "-" + r[0]);
						if (i.length > 0) {
							var o = r[1];
							"replaceWith" === o ? i[0] !== n[0] && i.replaceWith(n) : "img" === o ? i.is("img") ? i.attr("src", n) : i.replaceWith('<img src="' + n + '" class="' + i.attr("class") + '" />') : i.attr(r[1], n)
						}
					} else e.find(m + "-" + t).html(n)
				})
			},
			_getScrollbarSize: function () {
				if (void 0 === e.scrollbarSize) {
					var t = document.createElement("div");
					t.style.cssText = "width: 99px; height: 99px; overflow: scroll; position: absolute; top: -9999px;", document.body.appendChild(t), e.scrollbarSize = t.offsetWidth - t.clientWidth, document.body.removeChild(t)
				}
				return e.scrollbarSize
			}
		}, t.magnificPopup = {
			instance: null,
			proto: S.prototype,
			modules: [],
			open: function (e, n) {
				return E(), e = e ? t.extend(!0, {}, e) : {}, e.isObj = !0, e.index = n || 0, this.instance.open(e)
			},
			close: function () {
				return t.magnificPopup.instance && t.magnificPopup.instance.close()
			},
			registerModule: function (e, n) {
				n.options && (t.magnificPopup.defaults[e] = n.options), t.extend(this.proto, n.proto), this.modules.push(e)
			},
			defaults: {
				disableOn: 0,
				key: null,
				midClick: !1,
				mainClass: "",
				preloader: !0,
				focus: "",
				closeOnContentClick: !1,
				closeOnBgClick: !0,
				closeBtnInside: !0,
				showCloseBtn: !0,
				enableEscapeKey: !0,
				modal: !1,
				alignTop: !1,
				removalDelay: 0,
				prependTo: null,
				fixedContentPos: "auto",
				fixedBgPos: "auto",
				overflowY: "auto",
				closeMarkup: '<button title="%title%" type="button" class="mfp-close">&times;</button>',
				tClose: "Close (Esc)",
				tLoading: "Loading..."
			}
		}, t.fn.magnificPopup = function (n) {
			E();
			var i = t(this);
			if ("string" == typeof n)
				if ("open" === n) {
					var r, o = b ? i.data("magnificPopup") : i[0].magnificPopup,
						s = parseInt(arguments[1], 10) || 0;
					o.items ? r = o.items[s] : (r = i, o.delegate && (r = r.find(o.delegate)), r = r.eq(s)), e._openClick({
						mfpEl: r
					}, i, o)
				} else e.isOpen && e[n].apply(e, Array.prototype.slice.call(arguments, 1));
			else n = t.extend(!0, {}, n), b ? i.data("magnificPopup", n) : i[0].magnificPopup = n, e.addGroup(i, n);
			return i
		};
		var I, N, T, O = "inline",
			A = function () {
				T && (N.after(T.addClass(I)).detach(), T = null)
			};
		t.magnificPopup.registerModule(O, {
			options: {
				hiddenClass: "hide",
				markup: "",
				tNotFound: "Content not found"
			},
			proto: {
				initInline: function () {
					e.types.push(O), w(a + "." + O, function () {
						A()
					})
				},
				getInline: function (n, i) {
					if (A(), n.src) {
						var r = e.st.inline,
							o = t(n.src);
						if (o.length) {
							var s = o[0].parentNode;
							s && s.tagName && (N || (I = r.hiddenClass, N = C(I), I = "mfp-" + I), T = o.after(N).detach().removeClass(I)), e.updateStatus("ready")
						} else e.updateStatus("error", r.tNotFound), o = t("<div>");
						return n.inlineElement = o, o
					}
					return e.updateStatus("ready"), e._parseMarkup(i, {}, n), i
				}
			}
		});
		var M, H = "ajax",
			L = function () {
				M && t(document.body).removeClass(M)
			},
			j = function () {
				L(), e.req && e.req.abort()
			};
		t.magnificPopup.registerModule(H, {
			options: {
				settings: null,
				cursor: "mfp-ajax-cur",
				tError: '<a href="%url%">The content</a> could not be loaded.'
			},
			proto: {
				initAjax: function () {
					e.types.push(H), M = e.st.ajax.cursor, w(a + "." + H, j), w("BeforeChange." + H, j)
				},
				getAjax: function (n) {
					M && t(document.body).addClass(M), e.updateStatus("loading");
					var i = t.extend({
						url: n.src,
						success: function (i, r, o) {
							var s = {
								data: i,
								xhr: o
							};
							k("ParseAjax", s), e.appendContent(t(s.data), H), n.finished = !0, L(), e._setFocus(), setTimeout(function () {
								e.wrap.addClass(v)
							}, 16), e.updateStatus("ready"), k("AjaxContentAdded")
						},
						error: function () {
							L(), n.finished = n.loadError = !0, e.updateStatus("error", e.st.ajax.tError.replace("%url%", n.src))
						}
					}, e.st.ajax.settings);
					return e.req = t.ajax(i), ""
				}
			}
		});
		var D, z = function (n) {
			if (n.data && void 0 !== n.data.title) return n.data.title;
			var i = e.st.image.titleSrc;
			if (i) {
				if (t.isFunction(i)) return i.call(e, n);
				if (n.el) return n.el.attr(i) || ""
			}
			return ""
		};
		t.magnificPopup.registerModule("image", {
			options: {
				markup: '<div class="mfp-figure"><div class="mfp-close"></div><figure><div class="mfp-img"></div><figcaption><div class="mfp-bottom-bar"><div class="mfp-title"></div><div class="mfp-counter"></div></div></figcaption></figure></div>',
				cursor: "mfp-zoom-out-cur",
				titleSrc: "title",
				verticalFit: !0,
				tError: '<a href="%url%">The image</a> could not be loaded.'
			},
			proto: {
				initImage: function () {
					var n = e.st.image,
						i = ".image";
					e.types.push("image"), w(h + i, function () {
						"image" === e.currItem.type && n.cursor && t(document.body).addClass(n.cursor)
					}), w(a + i, function () {
						n.cursor && t(document.body).removeClass(n.cursor), x.off("resize" + m)
					}), w("Resize" + i, e.resizeImage), e.isLowIE && w("AfterChange", e.resizeImage)
				},
				resizeImage: function () {
					var t = e.currItem;
					if (t && t.img && e.st.image.verticalFit) {
						var n = 0;
						e.isLowIE && (n = parseInt(t.img.css("padding-top"), 10) + parseInt(t.img.css("padding-bottom"), 10)), t.img.css("max-height", e.wH - n)
					}
				},
				_onImageHasSize: function (t) {
					t.img && (t.hasSize = !0, D && clearInterval(D), t.isCheckingImgSize = !1, k("ImageHasSize", t), t.imgHidden && (e.content && e.content.removeClass("mfp-loading"), t.imgHidden = !1))
				},
				findImageSize: function (t) {
					var n = 0,
						i = t.img[0],
						r = function (o) {
							D && clearInterval(D), D = setInterval(function () {
								return i.naturalWidth > 0 ? void e._onImageHasSize(t) : (n > 200 && clearInterval(D), n++, void (3 === n ? r(10) : 40 === n ? r(50) : 100 === n && r(500)))
							}, o)
						};
					r(1)
				},
				getImage: function (n, i) {
					var r = 0,
						o = function () {
							n && (n.img[0].complete ? (n.img.off(".mfploader"), n === e.currItem && (e._onImageHasSize(n), e.updateStatus("ready")), n.hasSize = !0, n.loaded = !0, k("ImageLoadComplete")) : (r++, 200 > r ? setTimeout(o, 100) : s()))
						},
						s = function () {
							n && (n.img.off(".mfploader"), n === e.currItem && (e._onImageHasSize(n), e.updateStatus("error", a.tError.replace("%url%", n.src))), n.hasSize = !0, n.loaded = !0, n.loadError = !0)
						},
						a = e.st.image,
						c = i.find(".mfp-img");
					if (c.length) {
						var l = document.createElement("img");
						l.className = "mfp-img", n.el && n.el.find("img").length && (l.alt = n.el.find("img").attr("alt")), n.img = t(l).on("load.mfploader", o).on("error.mfploader", s), l.src = n.src, c.is("img") && (n.img = n.img.clone()), l = n.img[0], l.naturalWidth > 0 ? n.hasSize = !0 : l.width || (n.hasSize = !1)
					}
					return e._parseMarkup(i, {
						title: z(n),
						img_replaceWith: n.img
					}, n), e.resizeImage(), n.hasSize ? (D && clearInterval(D), n.loadError ? (i.addClass("mfp-loading"), e.updateStatus("error", a.tError.replace("%url%", n.src))) : (i.removeClass("mfp-loading"), e.updateStatus("ready")), i) : (e.updateStatus("loading"), n.loading = !0, n.hasSize || (n.imgHidden = !0, i.addClass("mfp-loading"), e.findImageSize(n)), i)
				}
			}
		});
		var $, F = function () {
			return void 0 === $ && ($ = void 0 !== document.createElement("p").style.MozTransform), $
		};
		t.magnificPopup.registerModule("zoom", {
			options: {
				enabled: !1,
				easing: "ease-in-out",
				duration: 300,
				opener: function (t) {
					return t.is("img") ? t : t.find("img")
				}
			},
			proto: {
				initZoom: function () {
					var t, n = e.st.zoom,
						i = ".zoom";
					if (n.enabled && e.supportsTransition) {
						var r, o, s = n.duration,
							l = function (t) {
								var e = t.clone().removeAttr("style").removeAttr("class").addClass("mfp-animated-image"),
									i = "all " + n.duration / 1e3 + "s " + n.easing,
									r = {
										position: "fixed",
										zIndex: 9999,
										left: 0,
										top: 0,
										"-webkit-backface-visibility": "hidden"
									},
									o = "transition";
								return r["-webkit-" + o] = r["-moz-" + o] = r["-o-" + o] = r[o] = i, e.css(r), e
							},
							u = function () {
								e.content.css("visibility", "visible")
							};
						w("BuildControls" + i, function () {
							if (e._allowZoom()) {
								if (clearTimeout(r), e.content.css("visibility", "hidden"), t = e._getItemToZoom(), !t) return void u();
								o = l(t), o.css(e._getOffset()), e.wrap.append(o), r = setTimeout(function () {
									o.css(e._getOffset(!0)), r = setTimeout(function () {
										u(), setTimeout(function () {
											o.remove(), t = o = null, k("ZoomAnimationEnded")
										}, 16)
									}, s)
								}, 16)
							}
						}), w(c + i, function () {
							if (e._allowZoom()) {
								if (clearTimeout(r), e.st.removalDelay = s, !t) {
									if (t = e._getItemToZoom(), !t) return;
									o = l(t)
								}
								o.css(e._getOffset(!0)), e.wrap.append(o), e.content.css("visibility", "hidden"), setTimeout(function () {
									o.css(e._getOffset())
								}, 16)
							}
						}), w(a + i, function () {
							e._allowZoom() && (u(), o && o.remove(), t = null)
						})
					}
				},
				_allowZoom: function () {
					return "image" === e.currItem.type
				},
				_getItemToZoom: function () {
					return !!e.currItem.hasSize && e.currItem.img
				},
				_getOffset: function (n) {
					var i;
					i = n ? e.currItem.img : e.st.zoom.opener(e.currItem.el || e.currItem);
					var r = i.offset(),
						o = parseInt(i.css("padding-top"), 10),
						s = parseInt(i.css("padding-bottom"), 10);
					r.top -= t(window).scrollTop() - o;
					var a = {
						width: i.width(),
						height: (b ? i.innerHeight() : i[0].offsetHeight) - s - o
					};
					return F() ? a["-moz-transform"] = a.transform = "translate(" + r.left + "px," + r.top + "px)" : (a.left = r.left, a.top = r.top), a
				}
			}
		});
		var R = "iframe",
			B = "//about:blank",
			V = function (t) {
				if (e.currTemplate[R]) {
					var n = e.currTemplate[R].find("iframe");
					n.length && (t || (n[0].src = B), e.isIE8 && n.css("display", t ? "block" : "none"))
				}
			};
		t.magnificPopup.registerModule(R, {
			options: {
				markup: '<div class="mfp-iframe-scaler"><div class="mfp-close"></div><iframe class="mfp-iframe" src="//about:blank" frameborder="0" allowfullscreen></iframe></div>',
				srcAction: "iframe_src",
				patterns: {
					youtube: {
						index: "youtube.com",
						id: "v=",
						src: "//www.youtube.com/embed/%id%?autoplay=1"
					},
					vimeo: {
						index: "vimeo.com/",
						id: "/",
						src: "//player.vimeo.com/video/%id%?autoplay=1"
					},
					gmaps: {
						index: "//maps.google.",
						src: "%id%&output=embed"
					}
				}
			},
			proto: {
				initIframe: function () {
					e.types.push(R), w("BeforeChange", function (t, e, n) {
						e !== n && (e === R ? V() : n === R && V(!0))
					}), w(a + "." + R, function () {
						V()
					})
				},
				getIframe: function (n, i) {
					var r = n.src,
						o = e.st.iframe;
					t.each(o.patterns, function () {
						return r.indexOf(this.index) > -1 ? (this.id && (r = "string" == typeof this.id ? r.substr(r.lastIndexOf(this.id) + this.id.length, r.length) : this.id.call(this, r)), r = this.src.replace("%id%", r), !1) : void 0
					});
					var s = {};
					return o.srcAction && (s[o.srcAction] = r), e._parseMarkup(i, s, n), e.updateStatus("ready"), i
				}
			}
		});
		var W = function (t) {
			var n = e.items.length;
			return t > n - 1 ? t - n : 0 > t ? n + t : t
		},
			q = function (t, e, n) {
				return t.replace(/%curr%/gi, e + 1).replace(/%total%/gi, n)
			};
		t.magnificPopup.registerModule("gallery", {
			options: {
				enabled: !1,
				arrowMarkup: '<button title="%title%" type="button" class="mfp-arrow mfp-arrow-%dir%"></button>',
				preload: [0, 2],
				navigateByImgClick: !0,
				arrows: !0,
				tPrev: "Previous (Left arrow key)",
				tNext: "Next (Right arrow key)",
				tCounter: "%curr% of %total%"
			},
			proto: {
				initGallery: function () {
					var n = e.st.gallery,
						r = ".mfp-gallery",
						s = Boolean(t.fn.mfpFastClick);
					return e.direction = !0, !(!n || !n.enabled) && (o += " mfp-gallery", w(h + r, function () {
						n.navigateByImgClick && e.wrap.on("click" + r, ".mfp-img", function () {
							return e.items.length > 1 ? (e.next(), !1) : void 0
						}), i.on("keydown" + r, function (t) {
							37 === t.keyCode ? e.prev() : 39 === t.keyCode && e.next()
						})
					}), w("UpdateStatus" + r, function (t, n) {
						n.text && (n.text = q(n.text, e.currItem.index, e.items.length))
					}), w(p + r, function (t, i, r, o) {
						var s = e.items.length;
						r.counter = s > 1 ? q(n.tCounter, o.index, s) : ""
					}), w("BuildControls" + r, function () {
						if (e.items.length > 1 && n.arrows && !e.arrowLeft) {
							var i = n.arrowMarkup,
								r = e.arrowLeft = t(i.replace(/%title%/gi, n.tPrev).replace(/%dir%/gi, "left")).addClass(y),
								o = e.arrowRight = t(i.replace(/%title%/gi, n.tNext).replace(/%dir%/gi, "right")).addClass(y),
								a = s ? "mfpFastClick" : "click";
							r[a](function () {
								e.prev()
							}), o[a](function () {
								e.next()
							}), e.isIE7 && (C("b", r[0], !1, !0), C("a", r[0], !1, !0), C("b", o[0], !1, !0), C("a", o[0], !1, !0)), e.container.append(r.add(o))
						}
					}), w(d + r, function () {
						e._preloadTimeout && clearTimeout(e._preloadTimeout), e._preloadTimeout = setTimeout(function () {
							e.preloadNearbyImages(), e._preloadTimeout = null
						}, 16)
					}), void w(a + r, function () {
						i.off(r), e.wrap.off("click" + r), e.arrowLeft && s && e.arrowLeft.add(e.arrowRight).destroyMfpFastClick(), e.arrowRight = e.arrowLeft = null
					}))
				},
				next: function () {
					e.direction = !0, e.index = W(e.index + 1), e.updateItemHTML()
				},
				prev: function () {
					e.direction = !1, e.index = W(e.index - 1), e.updateItemHTML()
				},
				goTo: function (t) {
					e.direction = t >= e.index, e.index = t, e.updateItemHTML()
				},
				preloadNearbyImages: function () {
					var t, n = e.st.gallery.preload,
						i = Math.min(n[0], e.items.length),
						r = Math.min(n[1], e.items.length);
					for (t = 1; t <= (e.direction ? r : i); t++) e._preloadItem(e.index + t);
					for (t = 1; t <= (e.direction ? i : r); t++) e._preloadItem(e.index - t)
				},
				_preloadItem: function (n) {
					if (n = W(n), !e.items[n].preloaded) {
						var i = e.items[n];
						i.parsed || (i = e.parseEl(n)), k("LazyLoad", i), "image" === i.type && (i.img = t('<img class="mfp-img" />').on("load.mfploader", function () {
							i.hasSize = !0
						}).on("error.mfploader", function () {
							i.hasSize = !0, i.loadError = !0, k("LazyLoadError", i)
						}).attr("src", i.src)), i.preloaded = !0
					}
				}
			}
		});
		var G = "retina";
		t.magnificPopup.registerModule(G, {
			options: {
				replaceSrc: function (t) {
					return t.src.replace(/\.\w+$/, function (t) {
						return "@2x" + t
					})
				},
				ratio: 1
			},
			proto: {
				initRetina: function () {
					if (window.devicePixelRatio > 1) {
						var t = e.st.retina,
							n = t.ratio;
						n = isNaN(n) ? n() : n, n > 1 && (w("ImageHasSize." + G, function (t, e) {
							e.img.css({
								"max-width": e.img[0].naturalWidth / n,
								width: "100%"
							})
						}), w("ElementParse." + G, function (e, i) {
							i.src = t.replaceSrc(i, n)
						}))
					}
				}
			}
		}),
			function () {
				var e = 1e3,
					n = "ontouchstart" in window,
					i = function () {
						x.off("touchmove" + o + " touchend" + o)
					},
					r = "mfpFastClick",
					o = "." + r;
				t.fn.mfpFastClick = function (r) {
					return t(this).each(function () {
						var s, a = t(this);
						if (n) {
							var c, l, u, p, h, d;
							a.on("touchstart" + o, function (t) {
								p = !1, d = 1, h = t.originalEvent ? t.originalEvent.touches[0] : t.touches[0], l = h.clientX, u = h.clientY, x.on("touchmove" + o, function (t) {
									h = t.originalEvent ? t.originalEvent.touches : t.touches, d = h.length, h = h[0], (Math.abs(h.clientX - l) > 10 || Math.abs(h.clientY - u) > 10) && (p = !0, i())
								}).on("touchend" + o, function (t) {
									i(), p || d > 1 || (s = !0, t.preventDefault(), clearTimeout(c), c = setTimeout(function () {
										s = !1
									}, e), r())
								})
							})
						}
						a.on("click" + o, function () {
							s || r()
						})
					})
				}, t.fn.destroyMfpFastClick = function () {
					t(this).off("touchstart" + o + " click" + o), n && x.off("touchmove" + o + " touchend" + o)
				}
			}(), E()
	}), window.Modernizr = function (t, e, n) {
		function i(t) {
			y.cssText = t
		}

		function r(t, e) {
			return typeof t === e
		}

		function o(t, e) {
			return !!~("" + t).indexOf(e)
		}

		function s(t, e) {
			for (var i in t) {
				var r = t[i];
				if (!o(r, "-") && y[r] !== n) return "pfx" != e || r
			}
			return !1
		}

		function a(t, e, i) {
			for (var o in t) {
				var s = e[t[o]];
				if (s !== n) return i === !1 ? t[o] : r(s, "function") ? s.bind(i || e) : s
			}
			return !1
		}

		function c(t, e, n) {
			var i = t.charAt(0).toUpperCase() + t.slice(1),
				o = (t + " " + x.join(i + " ") + i).split(" ");
			return r(e, "string") || r(e, "undefined") ? s(o, e) : (o = (t + " " + w.join(i + " ") + i).split(" "), a(o, e, n))
		}
		var l, u, p, h = "2.8.2",
			d = {},
			f = !0,
			m = e.documentElement,
			v = "modernizr",
			g = e.createElement(v),
			y = g.style,
			S = ({}.toString, " -webkit- -moz- -o- -ms- ".split(" ")),
			b = "Webkit Moz O ms",
			x = b.split(" "),
			w = b.toLowerCase().split(" "),
			C = {},
			k = [],
			_ = k.slice,
			E = function (t, n, i, r) {
				var o, s, a, c, l = e.createElement("div"),
					u = e.body,
					p = u || e.createElement("body");
				if (parseInt(i, 10))
					for (; i--;) a = e.createElement("div"), a.id = r ? r[i] : v + (i + 1), l.appendChild(a);
				return o = ["&#173;", '<style id="s', v, '">', t, "</style>"].join(""), l.id = v, (u ? l : p).innerHTML += o, p.appendChild(l), u || (p.style.background = "", p.style.overflow = "hidden", c = m.style.overflow, m.style.overflow = "hidden", m.appendChild(p)), s = n(l, t), u ? l.parentNode.removeChild(l) : (p.parentNode.removeChild(p), m.style.overflow = c), !!s
			},
			P = {}.hasOwnProperty;
		p = r(P, "undefined") || r(P.call, "undefined") ? function (t, e) {
			return e in t && r(t.constructor.prototype[e], "undefined")
		} : function (t, e) {
			return P.call(t, e)
		}, Function.prototype.bind || (Function.prototype.bind = function (t) {
			var e = this;
			if ("function" != typeof e) throw new TypeError;
			var n = _.call(arguments, 1),
				i = function () {
					if (this instanceof i) {
						var r = function () { };
						r.prototype = e.prototype;
						var o = new r,
							s = e.apply(o, n.concat(_.call(arguments)));
						return Object(s) === s ? s : o
					}
					return e.apply(t, n.concat(_.call(arguments)))
				};
			return i
		}), C.touch = function () {
			var n;
			return "ontouchstart" in t || t.DocumentTouch && e instanceof DocumentTouch ? n = !0 : E(["@media (", S.join("touch-enabled),("), v, ")", "{#modernizr{top:9px;position:absolute}}"].join(""), function (t) {
				n = 9 === t.offsetTop
			}), n
		}, C.csstransforms = function () {
			return !!c("transform")
		}, C.csstransforms3d = function () {
			var t = !!c("perspective");
			return t && "webkitPerspective" in m.style && E("@media (transform-3d),(-webkit-transform-3d){#modernizr{left:9px;position:absolute;height:3px;}}", function (e, n) {
				t = 9 === e.offsetLeft && 3 === e.offsetHeight
			}), t
		}, C.fontface = function () {
			var t;
			return E('@font-face {font-family:"font";src:url("https://")}', function (n, i) {
				var r = e.getElementById("smodernizr"),
					o = r.sheet || r.styleSheet,
					s = o ? o.cssRules && o.cssRules[0] ? o.cssRules[0].cssText : o.cssText || "" : "";
				t = /src/i.test(s) && 0 === s.indexOf(i.split(" ")[0])
			}), t
		};
		for (var I in C) p(C, I) && (u = I.toLowerCase(), d[u] = C[I](), k.push((d[u] ? "" : "no-") + u));
		return d.addTest = function (t, e) {
			if ("object" == typeof t)
				for (var i in t) p(t, i) && d.addTest(i, t[i]);
			else {
				if (t = t.toLowerCase(), d[t] !== n) return d;
				e = "function" == typeof e ? e() : e, "undefined" != typeof f && f && (m.className += " supports-" + (e ? "" : "no-") + t), d[t] = e
			}
			return d
		}, i(""), g = l = null, d._version = h, d._prefixes = S, d._domPrefixes = w, d._cssomPrefixes = x, d.testProp = function (t) {
			return s([t])
		}, d.testAllProps = c, d.testStyles = E, m.className = m.className.replace(/(^|\s)no-js(\s|$)/, "$1$2") + (f ? " supports-js supports-" + k.join(" supports-") : ""), d
	}(this, this.document),
	/*!
	 * option_selector.js
	 */
	function () {
		"undefined" == typeof window.Shopify && (window.Shopify = {}), Shopify.each = function (t, e) {
			for (var n = 0; n < t.length; n++) e(t[n], n)
		}, Shopify.map = function (t, e) {
			for (var n = [], i = 0; i < t.length; i++) n.push(e(t[i], i));
			return n
		}, Shopify.arrayIncludes = function (t, e) {
			for (var n = 0; n < t.length; n++)
				if (t[n] == e) return !0;
			return !1
		}, Shopify.uniq = function (t) {
			for (var e = [], n = 0; n < t.length; n++) Shopify.arrayIncludes(e, t[n]) || e.push(t[n]);
			return e
		}, Shopify.isDefined = function (t) {
			return "undefined" != typeof t
		}, Shopify.getClass = function (t) {
			return Object.prototype.toString.call(t).slice(8, -1)
		}, Shopify.extend = function (t, e) {
			function n() { }
			n.prototype = e.prototype, t.prototype = new n, t.prototype.constructor = t, t.baseConstructor = e, t.superClass = e.prototype
		}, Shopify.locationSearch = function () {
			return window.location.search
		}, Shopify.locationHash = function () {
			return window.location.hash
		}, Shopify.replaceState = function (t) {
			window.history.replaceState({}, document.title, t)
		}, Shopify.urlParam = function (t) {
			var e = RegExp("[?&]" + t + "=([^&#]*)").exec(Shopify.locationSearch());
			return e && decodeURIComponent(e[1].replace(/\+/g, " "))
		}, Shopify.newState = function (t, e) {
			var n;
			return n = Shopify.urlParam(t) ? Shopify.locationSearch().replace(RegExp("(" + t + "=)[^&#]+"), "$1" + e) : "" === Shopify.locationSearch() ? "?" + t + "=" + e : Shopify.locationSearch() + "&" + t + "=" + e, n + Shopify.locationHash()
		}, Shopify.setParam = function (t, e) {
			Shopify.replaceState(Shopify.newState(t, e))
		}, Shopify.Product = function (t) {
			Shopify.isDefined(t) && this.update(t)
		}, Shopify.Product.prototype.update = function (t) {
			for (property in t) this[property] = t[property]
		}, Shopify.Product.prototype.optionNames = function () {
			return "Array" == Shopify.getClass(this.options) ? this.options : []
		}, Shopify.Product.prototype.optionValues = function (t) {
			if (!Shopify.isDefined(this.variants)) return null;
			var e = Shopify.map(this.variants, function (e) {
				var n = "option" + (t + 1);
				return void 0 == e[n] ? null : e[n]
			});
			return null == e[0] ? null : Shopify.uniq(e)
		}, Shopify.Product.prototype.getVariant = function (t) {
			var e = null;
			return t.length != this.options.length ? e : (Shopify.each(this.variants, function (n) {
				for (var i = !0, r = 0; r < t.length; r++) {
					var o = "option" + (r + 1);
					n[o] != t[r] && (i = !1)
				}
				if (1 == i) return void (e = n)
			}), e)
		}, Shopify.Product.prototype.getVariantById = function (t) {
			for (var e = 0; e < this.variants.length; e++) {
				var n = this.variants[e];
				if (t == n.id) return n
			}
			return null
		}, Shopify.money_format = "${{amount}}", Shopify.formatMoney = function (t, e) {
			function n(t, e) {
				return "undefined" == typeof t ? e : t
			}

			function i(t, e, i, r) {
				if (e = n(e, 2), i = n(i, ","), r = n(r, "."), isNaN(t) || null == t) return 0;
				t = (t / 100).toFixed(e);
				var o = t.split("."),
					s = o[0].replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1" + i),
					a = o[1] ? r + o[1] : "";
				return s + a
			}
			"string" == typeof t && (t = t.replace(".", ""));
			var r = "",
				o = /\{\{\s*(\w+)\s*\}\}/,
				s = e || this.money_format;
			switch (s.match(o)[1]) {
				case "amount":
					r = i(t, 2);
					break;
				case "amount_no_decimals":
					r = i(t, 0);
					break;
				case "amount_with_comma_separator":
					r = i(t, 2, ".", ",");
					break;
				case "amount_no_decimals_with_comma_separator":
					r = i(t, 0, ".", ",");
					break;
				case "amount_no_decimals_with_space_separator":
					r = i(t, 0, " ");
					break;
				case "amount_with_apostrophe_separator":
					r = i(t, 2, "'")
			}
			return s.replace(o, r)
		}, Shopify.OptionSelectors = function (t, e) {
			return this.selectorDivClass = "selector-wrapper", this.selectorClass = "single-option-selector", this.variantIdFieldIdSuffix = "-variant-id", this.variantIdField = null, this.historyState = null, this.selectors = [], this.domIdPrefix = t, this.product = new Shopify.Product(e.product), this.onVariantSelected = Shopify.isDefined(e.onVariantSelected) ? e.onVariantSelected : function () { }, this.setActiveThumbnail = e.setActiveThumbnail, this.switchProductImage = e.switchProductImage, this.settings = e.settings, this.replaceSelector(t), this.initDropdown(), e.enableHistoryState && (this.historyState = new Shopify.OptionSelectors.HistoryState(this)), !0
		}, Shopify.OptionSelectors.prototype.initDropdown = function () {
			var t = {
				initialLoad: !0
			},
				e = this.selectVariantFromDropdown(t);
			if (!e) {
				var n = this;
				setTimeout(function () {
					n.selectVariantFromParams(t) || n.fireOnChangeForFirstDropdown.call(n, t)
				})
			}
		}, Shopify.OptionSelectors.prototype.fireOnChangeForFirstDropdown = function (t) {
			this.selectors[0].element.onchange(t)
		}, Shopify.OptionSelectors.prototype.selectVariantFromParamsOrDropdown = function (t) {
			var e = this.selectVariantFromParams(t);
			e || this.selectVariantFromDropdown(t)
		}, Shopify.OptionSelectors.prototype.replaceSelector = function (t) {
			var e = document.getElementById(t),
				n = e.parentNode;
			Shopify.each(this.buildSelectors(), function (t) {
				n.insertBefore(t, e)
			}), e.style.display = "none", this.variantIdField = e
		}, Shopify.OptionSelectors.prototype.selectVariantFromDropdown = function (t) {
			var e = document.getElementById(this.domIdPrefix).querySelector("[selected]");
			if (e || (e = document.getElementById(this.domIdPrefix).querySelector('[selected="selected"]')), !e) return !1;
			var n = e.value;
			return this.selectVariant(n, t)
		}, Shopify.OptionSelectors.prototype.selectVariantFromParams = function (t) {
			var e = Shopify.urlParam("variant");
			return this.selectVariant(e, t)
		}, Shopify.OptionSelectors.prototype.selectVariant = function (t, e) {
			var n = this.product.getVariantById(t);
			if (null == n) return !1;
			for (var i = 0; i < this.selectors.length; i++) {
				var r = this.selectors[i].element,
					o = r.getAttribute("data-option"),
					s = n[o];
				null != s && this.optionExistInSelect(r, s) && (r.value = s)
			}
			return "undefined" != typeof jQuery ? jQuery(this.selectors[0].element).trigger("change", e) : this.selectors[0].element.onchange(e), !0
		}, Shopify.OptionSelectors.prototype.optionExistInSelect = function (t, e) {
			for (var n = 0; n < t.options.length; n++)
				if (t.options[n].value == e) return !0
		}, Shopify.OptionSelectors.prototype.insertSelectors = function (t, e) {
			Shopify.isDefined(e) && this.setMessageElement(e), this.domIdPrefix = "product-" + this.product.id + "-variant-selector";
			var n = document.getElementById(t);
			Shopify.each(this.buildSelectors(), function (t) {
				n.appendChild(t)
			})
		}, Shopify.OptionSelectors.prototype.buildSelectors = function () {
			for (var t = 0; t < this.product.optionNames().length; t++) {
				var e = new Shopify.SingleOptionSelector(this, t, this.product.optionNames()[t], this.product.optionValues(t));
				e.element.disabled = !1, this.selectors.push(e)
			}
			var n = this.selectorDivClass,
				i = this.product.optionNames(),
				r = Shopify.map(this.selectors, function (t) {
					var e = document.createElement("div");
					if (e.setAttribute("class", n), i.length >= 1 && "Title" !== i[0]) {
						var r = document.createElement("label");
						r.htmlFor = t.element.id, r.innerHTML = t.name, e.appendChild(r)
					}
					return e.appendChild(t.element), e
				});
			return r
		}, Shopify.OptionSelectors.prototype.selectedValues = function () {
			for (var t = [], e = 0; e < this.selectors.length; e++) {
				var n = this.selectors[e].element.value;
				t.push(n)
			}
			return t
		}, Shopify.OptionSelectors.prototype.updateSelectors = function (t, e) {
			var n = this.selectedValues(),
				i = this.product.getVariant(n);
			i ? (this.variantIdField.disabled = !1, this.variantIdField.value = i.id) : this.variantIdField.disabled = !0, this.onVariantSelected(i, this, e), null != this.historyState && this.historyState.onVariantChange(i, this, e)
		}, Shopify.OptionSelectorsFromDOM = function (t, e) {
			var n = e.optionNames || [],
				i = e.priceFieldExists || !0,
				r = e.delimiter || "/",
				o = this.createProductFromSelector(t, n, i, r);
			e.product = o, Shopify.OptionSelectorsFromDOM.baseConstructor.call(this, t, e)
		}, Shopify.extend(Shopify.OptionSelectorsFromDOM, Shopify.OptionSelectors), Shopify.OptionSelectorsFromDOM.prototype.createProductFromSelector = function (t, e, n, i) {
			if (!Shopify.isDefined(n)) var n = !0;
			if (!Shopify.isDefined(i)) var i = "/";
			var r = document.getElementById(t),
				o = r.childNodes,
				s = (r.parentNode, e.length),
				a = [];
			Shopify.each(o, function (t, r) {
				if (1 == t.nodeType && "option" == t.tagName.toLowerCase()) {
					var o = t.innerHTML.split(new RegExp("\\s*\\" + i + "\\s*"));
					0 == e.length && (s = o.length - (n ? 1 : 0));
					var c = o.slice(0, s),
						l = n ? o[s] : "",
						u = (t.getAttribute("value"), {
							available: !t.disabled,
							id: parseFloat(t.value),
							price: l,
							option1: c[0],
							option2: c[1],
							option3: c[2]
						});
					a.push(u)
				}
			});
			var c = {
				variants: a
			};
			if (0 == e.length) {
				c.options = [];
				for (var l = 0; l < s; l++) c.options[l] = "option " + (l + 1)
			} else c.options = e;
			return c
		}, Shopify.SingleOptionSelector = function (t, e, n, i) {
			this.multiSelector = t;
			this.values = i;
			this.index = e;
			this.name = n;
			this.element = document.createElement("select");

			// Add Alpine.js attribute to the <select>
			this.element.setAttribute("x-on:change", `
				const selectedOption = $event.target.options[$event.target.selectedIndex];
				const mediaId = selectedOption.dataset.featuredMediaId;
				if (mediaId) {
					selectedId = Number(mediaId);
				}
			`);

			// Iterate through the option values and variants
			for (var r = 0; r < i.length; r++) {
				var o = document.createElement("option");
				o.value = i[r];
				o.innerHTML = i[r];

				// Get the variant that matches this option value
				var variant = t.product.variants.find(variant => variant[`option${e + 1}`] === i[r]);
				if (variant && variant.featured_media) {
					// Add the featured_media.id as a data attribute
					o.setAttribute("data-featured-media-id", variant.featured_media.id);
				}

				this.element.appendChild(o);
			}

			return (
				this.element.setAttribute("class", this.multiSelector.selectorClass),
				this.element.setAttribute("data-option", "option" + (e + 1)),
				(this.element.id = t.domIdPrefix + "-option-" + e),
				(this.element.onchange = function (n, i) {
					i = i || {};
					t.updateSelectors(e, i);
				}),
				!0
			);
		}, Shopify.Image = {
			preload: function (t, e) {
				for (var n = 0; n < t.length; n++) {
					var i = t[n];
					this.loadImage(this.getSizedImageUrl(i, e))
				}
			},
			loadImage: function (t) {
				(new Image).src = t
			},
			switchImage: function (t, e, n) {
				if (t && e) {
					var i = this.imageSize(e.src),
						r = this.getSizedImageUrl(t.src, i);
					n ? n(r, t, e) : e.src = r
				}
			},
			imageSize: function (t) {
				var e = t.match(/.+_((?:pico|icon|thumb|small|compact|medium|large|grande)|\d{1,4}x\d{0,4}|x\d{1,4})[_\.@]/);
				return null !== e ? e[1] : null
			},
			getSizedImageUrl: function (t, e) {
				if (null == e) return t;
				if ("master" == e) return this.removeProtocol(t);
				var n = t.match(/\.(jpg|jpeg|gif|png|bmp|bitmap|tiff|tif)(\?v=\d+)?$/i);
				if (null != n) {
					var i = t.split(n[0]),
						r = n[0];
					return this.removeProtocol(i[0] + "_" + e + r)
				}
				return null
			},
			removeProtocol: function (t) {
				return t.replace(/http(s)?:/, "")
			}
		}, Shopify.OptionSelectors.HistoryState = function (t) {
			this.browserSupports() && this.register(t)
		}, Shopify.OptionSelectors.HistoryState.prototype.register = function (t) {
			window.addEventListener("popstate", function (e) {
				t.selectVariantFromParamsOrDropdown({
					popStateCall: !0
				})
			})
		}, Shopify.OptionSelectors.HistoryState.prototype.onVariantChange = function (t, e, n) {
			this.browserSupports() && (!t || n.initialLoad || n.popStateCall || Shopify.setParam("variant", t.id))
		}, Shopify.OptionSelectors.HistoryState.prototype.browserSupports = function () {
			return window.history && window.history.replaceState
		}
	}();