/*! Built with http://stenciljs.com */
(function(Context,appNamespace,hydratedCssClass,publicPath){"use strict";
var s=document.querySelector("script[data-namespace='app']");if(s){publicPath=s.getAttribute('data-path');}
(function(publicPath){
    /** @stencil/router global **/

    Context.activeRouter = (function () {
        let state = {};
        let groups = {};
        let matchedGroups = {};
        const nextListeners = [];
        function getDefaultState() {
            return {
                location: {
                    pathname: Context.window.location.pathname,
                    search: Context.window.location.search
                }
            };
        }
        function set(value) {
            state = Object.assign({}, state, value);
            clearGroups();
            dispatch();
        }
        function get(attrName) {
            if (Object.keys(state).length === 0) {
                return getDefaultState();
            }
            if (!attrName) {
                return state;
            }
            return state[attrName];
        }
        /**
         *  When we get a new location, clear matching groups
         *  so we give them a chance to re-match and re-render.
         */
        function clearGroups() {
            matchedGroups = {};
        }
        function dispatch() {
            const listeners = nextListeners;
            for (let i = 0; i < listeners.length; i++) {
                const listener = listeners[i];
                listener();
            }
        }
        function subscribe(listener) {
            if (typeof listener !== 'function') {
                throw new Error('Expected listener to be a function.');
            }
            let isSubscribed = true;
            nextListeners.push(listener);
            return function unsubscribe() {
                if (!isSubscribed) {
                    return;
                }
                isSubscribed = false;
                const index = nextListeners.indexOf(listener);
                nextListeners.splice(index, 1);
            };
        }
        /**
         * Remove a Route from all groups
         */
        function removeFromGroups(route) {
            for (let groupName in groups) {
                const group = groups[groupName];
                groups[groupName] = group.filter(r => r !== route);
            }
        }
        /**
         * Add a Route to the given group
         */
        function addToGroup(route, groupName) {
            if (!(groupName in groups)) {
                groups[groupName] = [];
            }
            groups[groupName].push(route);
        }
        /**
         * Check if a group already matched once
         */
        function didGroupAlreadyMatch(groupName) {
            if (!groupName) {
                return false;
            }
            return matchedGroups[groupName] === true;
        }
        /**
         * Set that a group has matched
         */
        function setGroupMatched(groupName) {
            matchedGroups[groupName] = true;
        }
        return {
            set,
            get,
            subscribe,
            addToGroup,
            removeFromGroups,
            didGroupAlreadyMatch,
            setGroupMatched
        };
    })();
})(publicPath);
(function(n,t,e,o,i){"use strict";function c(n,t,e,o,i,c,f){let r=e.n+(o||W),s=e[r];if(s||(s=e[r=e.n+W]),s){let o=t.t;if(t.e)if(1===e.encapsulation)o=i.shadowRoot;else for(;i=t.o(i);)if(i.host&&i.host.shadowRoot){o=i.host.shadowRoot;break}const c=n.i.get(o)||{};if(!c[r]){f=s.content.cloneNode(!0);const e=o.querySelectorAll("[data-styles]");t.c(o,f,e.length&&e[e.length-1].nextSibling||o.f),c[r]=!0,n.i.set(o,c)}}}function f(n){return{r:n[0],s:n[1],l:!!n[2],u:!!n[3],a:!!n[4]}}function r(n,t){if(O(t)){if(n===Boolean||3===n)return"false"!==t&&(""===t||!!t);if(n===Number||4===n)return parseFloat(t)}return t}function s(n,t,e,o){const i=n.p.get(t);i&&((o=i.$activeLoading)&&((e=o.indexOf(t))>-1&&o.splice(e,1),!o.length&&i.$initLoad()),n.p.delete(t))}function l(n,t,e){let o,i=!1,c=!1;for(var f=arguments.length;f-- >2;)L.push(arguments[f]);for(;L.length;)if((e=L.pop())&&void 0!==e.pop)for(f=e.length;f--;)L.push(e[f]);else"boolean"==typeof e&&(e=null),(c="function"!=typeof n)&&(null==e?e="":"number"==typeof e?e=String(e):"string"!=typeof e&&(c=!1)),c&&i?o[o.length-1].d+=e:void 0===o?o=[c?u(e):e]:o.push(c?u(e):e),i=c;const r=new A;if(r.m=n,r.v=o,t&&(r.w=t,r.y=t.b,r.M=t.ref,t.className&&(t.class=t.className),"object"==typeof t.class)){for(f in t.class)t.class[f]&&L.push(f);t.class=L.join(" "),L.length=0}return r}function u(n){const t=new A;return t.d=n,t}function a(n,t){n.g.has(t)||(n.g.set(t,!0),n.k.add(()=>{(function n(t,e,o,i,c){if(t.g.delete(e),!t.C.has(e)){let f;if(i=t.W.get(e),o=!i){if((c=t.p.get(e))&&!c.$rendered)return void(c.$onRender=c.$onRender||[]).push(()=>{n(t,e)});i=function f(n,t,e,o,i,c){try{(function f(n,t,e,o,i,c){for(c in n.N.set(o,e),n.j.has(e)||n.j.set(e,{}),(i=Object.assign({color:{type:String}},t.properties)).mode={type:String},i)d(n,i[c],e,o,c)})(n,o=n.x(t).O,t,e=new o)}catch(o){e={},n.S(o,7,t,!0)}return n.W.set(t,e),e}(t,e);try{i.componentWillLoad&&(f=i.componentWillLoad())}catch(n){t.S(n,3,e)}}f&&f.then?f.then(()=>p(t,e,i,o)):p(t,e,i,o)}})(n,t)}))}function p(n,t,e,o){(function i(n,t,e,o,c){try{const i=t.O.host;if(o.render||o.hostData||i){n.T=!0;const i=o.render&&o.render();let f;n.T=!1;const r=n.A.get(e)||new A;r.L=e,n.A.set(e,n.render(r,l(null,f,i),c,n.P.get(e),n.R.get(e),t.O.encapsulation))}n.q(n,n.B,t,o.mode,e),e.$rendered=!0,e.$onRender&&(e.$onRender.forEach(n=>n()),e.$onRender=null)}catch(t){n.T=!1,n.S(t,8,e,!0)}})(n,n.x(t),t,e,!o);try{o&&t.$initLoad()}catch(e){n.S(e,6,t,!0)}}function d(n,t,e,o,i){if(t.type||t.state){const c=n.j.get(e);if(!t.state){if(t.attr&&(void 0===c[i]||""===c[i])){const o=n.B.D(e,t.attr);null!=o&&(c[i]=r(t.type,o))}e.hasOwnProperty(i)&&(void 0===c[i]&&(c[i]=e[i]),delete e[i])}o.hasOwnProperty(i)&&void 0===c[i]&&(c[i]=o[i]),t.watchCallbacks&&(c[P+i]=t.watchCallbacks.slice()),h(o,i,function c(t){return(t=n.j.get(n.N.get(this)))&&t[i]},function f(e,o){(o=n.N.get(this))&&(t.state||t.mutable)&&m(n,o,i,e)})}else if(t.elementRef)v(o,i,e);else if(t.context){const c=n.H(t.context);void 0!==c&&v(o,i,c.F&&c.F(e)||c)}}function m(n,t,e,o,i,c,f){(i=n.j.get(t))||n.j.set(t,i={});const r=i[e];if(o!==r&&(i[e]=o,c=n.W.get(t))){if(f=i[P+e])for(let n=0;n<f.length;n++)try{c[f[n]].call(c,o,r,e)}catch(n){}!n.T&&t.$rendered&&a(n,t)}}function v(n,t,e){Object.defineProperty(n,t,{configurable:!0,value:e})}function h(n,t,e,o){Object.defineProperty(n,t,{configurable:!0,get:e,set:o})}function w(n,t,e,o,i){const c=11===e.L.nodeType&&e.L.host?e.L.host:e.L,f=t&&t.w||E,r=e.w||E;for(i in f)r&&null!=r[i]||null==f[i]||y(n,c,i,f[i],void 0,o);for(i in r)i in f&&r[i]===("value"===i||"checked"===i?c[i]:f[i])||y(n,c,i,f[i],r[i],o)}function y(n,t,e,o,i,c,f,r){if("class"!==e||c)if("style"===e){for(f in o=o||E,i=i||E,o)i[f]||(t.style[f]="");for(f in i)i[f]!==o[f]&&(t.style[f]=i[f])}else if("o"!==e[0]||"n"!==e[1]||e in t)if("list"!==e&&"type"!==e&&!c&&(e in t||-1!==["object","function"].indexOf(typeof i)&&null!==i)){const o=n.x(t);o&&o.z&&o.z[e]?b(t,e,i):"ref"!==e&&(b(t,e,null==i?"":i),null!=i&&!1!==i||t.removeAttribute(e))}else null!=i&&(f=e!==(e=e.replace(/^xlink\:?/,"")),1!==R[e]||i&&"false"!==i?"function"!=typeof i&&(f?t.setAttributeNS(q,S(e),i):t.setAttribute(e,i)):f?t.removeAttributeNS(q,S(e)):t.removeAttribute(e));else e=S(e.substring(2)),i?i!==o&&n.B.I(t,e,i):n.B.Q(t,e);else if(o!==i){const n=null==o||""===o?N:o.trim().split(/\s+/),e=null==i||""===i?N:i.trim().split(/\s+/);let c=null==t.className||""===t.className?N:t.className.trim().split(/\s+/);for(f=0,r=n.length;f<r;f++)-1===e.indexOf(n[f])&&(c=c.filter(t=>t!==n[f]));for(f=0,r=e.length;f<r;f++)-1===n.indexOf(e[f])&&(c=[...c,e[f]]);t.className=c.join(" ")}}function b(n,t,e){try{n[t]=e}catch(n){}}function M(n,t){n&&(n.M&&n.M(t?null:n.L),n.v&&n.v.forEach(n=>{M(n,t)}))}function g(n,t,e,o,i){const c=n.U(t);let f,r,s,l;if(i&&1===c){(r=n.D(t,C))&&(s=r.split("."))[0]===o&&((l=new A).m=n.G(l.L=t),e.v||(e.v=[]),e.v[s[1]]=l,e=l,i=""!==s[2]);for(let c=0;c<t.childNodes.length;c++)g(n,t.childNodes[c],e,o,i)}else 3===c&&(f=t.previousSibling)&&8===n.U(f)&&"s"===(s=n.J(f).split("."))[0]&&s[1]===o&&((l=u(n.J(t))).L=t,e.v||(e.v=[]),e.v[s[2]]=l)}function $(n,t,e,o){return function(){const i=arguments;return function c(n,t,e){return new Promise(o=>{let i=t[e];i||(i=n.K.querySelector(e)),i||(i=t[e]=n.V(e),n.X(n.K,i)),i.componentOnReady(o)})}(n,t,e).then(n=>n[o].apply(n,i))}}const k="data-ssrv",C="data-ssrc",W="$",E={},N=[],j={enter:13,escape:27,space:32,tab:9,left:37,up:38,right:39,down:40},O=n=>void 0!==n&&null!==n,x=n=>void 0===n||null===n,S=n=>n.toLowerCase(),T=()=>{};class A{}const L=[],P="wc-",R={allowfullscreen:1,async:1,autofocus:1,autoplay:1,checked:1,controls:1,disabled:1,enabled:1,formnovalidate:1,hidden:1,multiple:1,noresize:1,readonly:1,required:1,selected:1,spellcheck:1},q="http://www.w3.org/1999/xlink";let B=!1;const D=n[o]=n[o]||{};{const o=function H(t,e,o,i,u,p){const d={html:{}},y={},b=function C(n,t){const e=new WeakMap,o={Y:t.documentElement,t:t.head,K:t.body,Z:!1,U:n=>n.nodeType,V:n=>t.createElement(n),_:(n,e)=>t.createElementNS(n,e),nn:n=>t.createTextNode(n),tn:n=>t.createComment(n),c:(n,t,e)=>n.insertBefore(t,e),en:n=>n.remove(),X:(n,t)=>n.appendChild(t),on:n=>n.childNodes,o:n=>n.parentNode,in:n=>n.nextSibling,G:n=>S(n.tagName),J:n=>n.textContent,cn:(n,t)=>n.textContent=t,D:(n,t)=>n.getAttribute(t),fn:(n,t,e)=>n.setAttribute(t,e),rn:(n,t,e,o)=>n.setAttributeNS(t,e,o),sn:(n,t)=>n.removeAttribute(t),ln:(e,i)=>"child"===i?e.firstElementChild:"parent"===i?o.un(e):"body"===i?o.K:"document"===i?t:"window"===i?n:e,I:(n,t,i,c,f,r,s,l)=>{const u=t;let a=n,p=e.get(n);if(p&&p[u]&&p[u](),"string"==typeof r?a=o.ln(n,r):"object"==typeof r?a=r:(l=t.split(":")).length>1&&(a=o.ln(n,l[0]),t=l[1]),!a)return;let d=i;(l=t.split(".")).length>1&&(t=l[0],d=(n=>{n.keyCode===j[l[1]]&&i(n)})),s=o.Z?{capture:!!c,passive:!!f}:!!c,a.addEventListener(t,d,s),p||e.set(n,p={}),p[u]=(()=>{a&&a.removeEventListener(t,d,s),p[u]=null})},Q:(n,t)=>{const o=e.get(n);o&&(t?o[t]&&o[t]():Object.keys(o).forEach(n=>{o[n]&&o[n]()}))},un:(n,t)=>(t=o.o(n))&&11===o.U(t)?t.host:t};return o}(o,i);t.isServer=t.isPrerender=!(t.isClient=!0),t.window=o,t.location=o.location,t.document=i,t.publicPath=u,e.h=l,e.Context=t;const E=o.$definedCmps=o.$definedCmps||{},N={an:function L(n,e){e.mode||(e.mode=b.D(e,"mode")||t.mode),b.D(e,k)||function o(n,t){return n&&1===t.encapsulation}(b.e,n)||function i(n,t,e,o,c,f,r,s,l){for(e.$defaultHolder||t.c(e,e.$defaultHolder=t.tn(""),o[0]),l=0;l<o.length;l++)c=o[l],1===t.U(c)&&null!=(f=t.D(c,"slot"))?(s=s||{})[f]?s[f].push(c):s[f]=[c]:r?r.push(c):r=[c];n.P.set(e,r),n.R.set(e,s)}(N,b,e,e.childNodes),b.e||1!==n.encapsulation||(e.shadowRoot=e)},B:b,pn:function P(n,t){if(!E[n.n]){E[n.n]=!0,function e(n,t,o,i){o.connectedCallback=function(){(function e(n,t,o){n.C.delete(o),n.dn.has(o)||(n.dn.set(o,!0),function i(n,t,e){for(e=t;e=n.B.un(e);)if(n.mn(e)){n.vn.has(t)||(n.p.set(t,e),(e.$activeLoading=e.$activeLoading||[]).push(t));break}}(n,o),n.k.add(()=>{n.an(t,o),n.loadBundle(t,o.mode,()=>a(n,o))},3))})(n,t,this)},o.attributeChangedCallback=function(n,e,o){(function i(n,t,e,o,c,f){if(o!==c&&n)for(f in e=S(e),n)if(n[f].hn===e){t[f]=r(n[f].wn,c);break}})(t.z,this,n,e,o)},o.disconnectedCallback=function(){(function t(n,e,o){!n.yn&&function i(n,t){for(;t;){if(!n.o(t))return 9!==n.U(t);t=n.o(t)}}(n.B,e)&&(n.C.set(e,!0),s(n,e),M(n.A.get(e),!0),n.B.Q(e),n.bn.delete(e),(o=n.W.get(e))&&o.componentDidUnload&&o.componentDidUnload())})(n,this)},o.componentOnReady=function(t,e){return t||(e=new Promise(n=>t=n)),function o(n,t,e,i){n.C.has(t)||(n.vn.has(t)?e(t):((i=n.Mn.get(t)||[]).push(e),n.Mn.set(t,i)))}(n,this,t),e},o.$initLoad=function(){(function t(n,e,o,i,c){if(!n.vn.has(e)&&(i=n.W.get(e))&&!n.C.has(e)&&(!e.$activeLoading||!e.$activeLoading.length)){delete e.$activeLoading,n.vn.set(e,!0);try{M(n.A.get(e)),(c=n.Mn.get(e))&&(c.forEach(n=>n(e)),n.Mn.delete(e)),i.componentDidLoad&&i.componentDidLoad()}catch(t){n.S(t,4,e)}e.classList.add(o),s(n,e)}})(n,this,i)},o.gn=function(){a(n,this)},function c(n,t,e){t&&Object.keys(t).forEach(o=>{const i=t[o].$n;1===i||2===i?h(e,o,function t(){return(n.j.get(this)||{})[o]},function t(e){m(n,this,o,e)}):6===i&&v(e,o,T)})}(n,t.z,o)}(N,n,t.prototype,p);{const e=[];for(const t in n.z)n.z[t].hn&&e.push(n.z[t].hn);t.observedAttributes=e}o.customElements.define(n.n,t)}},kn:t.emit,x:n=>d[b.G(n)],H:n=>t[n],isClient:!0,mn:n=>!(!E[b.G(n)]&&!N.x(n)),loadBundle:function R(n,t,e){if(n.O)e();else{const o="string"==typeof n.Cn?n.Cn:n.Cn[t],i=u+o+(function o(n,t){return 2===t.encapsulation||1===t.encapsulation&&!n}(b.e,n)?".sc":"")+".js";import(i).then(t=>{try{n.O=t[(n=>S(n).split("-").map(n=>n.charAt(0).toUpperCase()+n.slice(1)).join(""))(n.n)],function o(n,t,e){const o=e.style;if(o){const i=e.is+(e.styleMode||W);if(!t[i]){const e=n.V("template");t[i]=e,e.innerHTML=`<style>${o}</style>`,n.X(n.t,e)}}}(b,n,n.O)}catch(t){n.O=class{}}e()}).catch(n=>void 0)}},S:(n,t,e)=>void 0,Wn:n=>(function t(n,e,o){return{create:$(n,e,o,"create"),componentOnReady:$(n,e,o,"componentOnReady")}})(b,y,n),k:function q(t,e,o){function i(){for(;u.length>0;)u.shift()();e=!1}function c(n){for(n=r(),i();a.length>0&&r()-n<40;)a.shift()();(o=a.length>0)&&s(f)}function f(n){for(i(),n=4+r();a.length>0&&r()<n;)a.shift()();(o=a.length>0)&&s(c)}const r=()=>t.performance.now(),s=t=>n.requestAnimationFrame(t),l=Promise.resolve(),u=[],a=[];return{add:(n,t)=>{3===t?(u.push(n),e||(e=!0,l.then(i))):(a.push(n),o||(o=!0,s(c)))}}}(o),En:n=>(n||[]).map(n=>(function t(n,e,o,i){const c={n:n[0],z:{color:{hn:"color"}}};c.Cn=n[1];const r=n[3];if(r)for(o=0;o<r.length;o++)i=r[o],c.z[i[0]]={$n:i[1],hn:"string"==typeof i[2]?i[2]:i[2]?i[0]:0,wn:i[3]};return c.encapsulation=n[4],n[5]&&(c.Nn=n[5].map(f)),e[c.n]=c})(n,d)),p:new WeakMap,i:new WeakMap,P:new WeakMap,dn:new WeakMap,bn:new WeakMap,vn:new WeakMap,N:new WeakMap,W:new WeakMap,C:new WeakMap,g:new WeakMap,R:new WeakMap,Mn:new WeakMap,jn:new WeakMap,A:new WeakMap,j:new WeakMap};N.render=function D(n,t){function e(o,i,f,r,s,l,m,v,h){if("function"==typeof o.m&&(o=o.m(Object.assign({},o.w,{On:o.v}))),!p&&"slot"===o.m){if((u||a)&&(d&&t.fn(i,d+"-slot",""),m=o.w&&o.w.name,v=O(m)?a&&a[m]:u,O(v))){for(n.yn=!0,r=0;r<v.length;r++)l=v[r],t.en(l),t.X(i,l),8!==l.nodeType&&(h=!0);!h&&o.v&&c(i,[],o.v),n.yn=!1}return null}if(O(o.d))o.L=t.nn(o.d);else{s=o.L=B||"svg"===o.m?t._("http://www.w3.org/2000/svg",o.m):t.V(o.m),B="svg"===o.m||"foreignObject"!==o.m&&B,w(n,null,o,B),null!==d&&s.xn!==d&&t.fn(s,s.xn=d,"");const i=o.v;if(i)for(r=0;r<i.length;++r)(l=e(i[r],s))&&t.X(s,l);"svg"===o.m&&(B=!1)}return o.L}function o(n,o,i,c,f,r,s){const l=n.$defaultHolder&&t.o(n.$defaultHolder)||n;for(;c<=f;++c)s=i[c],O(s)&&(r=O(s.d)?t.nn(s.d):e(s,n),O(r)&&(s.L=r,t.c(l,r,o)))}function i(n,e,o){for(;e<=o;++e)O(n[e])&&t.en(n[e].L)}function c(n,c,l){let u,a,p,d,m=0,v=0,h=c.length-1,w=c[0],y=c[h],b=l.length-1,M=l[0],g=l[b];for(;m<=h&&v<=b;)null==w?w=c[++m]:null==y?y=c[--h]:null==M?M=l[++v]:null==g?g=l[--b]:f(w,M)?(s(w,M),w=c[++m],M=l[++v]):f(y,g)?(s(y,g),y=c[--h],g=l[--b]):f(w,g)?(s(w,g),t.c(n,w.L,t.in(y.L)),w=c[++m],g=l[--b]):f(y,M)?(s(y,M),t.c(n,y.L,w.L),y=c[--h],M=l[++v]):(x(u)&&(u=r(c,m,h)),a=u[M.y],x(a)?(d=e(M,n),M=l[++v]):((p=c[a]).m!==M.m?d=e(M,n):(s(p,M),c[a]=void 0,d=p.L),M=l[++v]),d&&t.c(w.L&&w.L.parentNode||n,d,w.L));m>h?o(n,null==l[b+1]?null:l[b+1].L,l,v,b):v>b&&i(c,m,h)}function f(n,t){return n.m===t.m&&n.y===t.y}function r(n,t,e){const o={};let i,c,f;for(i=t;i<=e;++i)null!=(f=n[i])&&void 0!==(c=f.y)&&(o.Sn=i);return o}function s(e,f){const r=f.L=e.L,s=e.v,l=f.v;let u;if(B=f.L&&null!=f.L.parentElement&&void 0!==f.L.Tn,B="svg"===f.m||"foreignObject"!==f.m&&B,x(f.d))"slot"!==f.m&&w(n,e,f,B),O(s)&&O(l)?c(r,s,l):O(l)?(O(e.d)&&t.cn(r,""),o(r,null,l,0,l.length-1)):O(s)&&i(s,0,s.length-1);else if(u=n.P.get(r)){const e=u[0].parentElement;t.cn(e,f.d),n.P.set(r,[e.childNodes[0]])}else e.d!==f.d&&t.cn(r,f.d);B&&"svg"===f.m&&(B=!1)}let l,u,a,p,d;return function n(e,o,i,c,f,r,p){return l=i,u=c,a=f,d="scoped"===r||"shadow"===r&&!t.e?"data-"+t.G(e.L):null,l||d&&t.fn(e.L,d+"-host",""),s(e,o),o}}(N,b);const H=b.Y;return H.$rendered=!0,H.$activeLoading=[],H.$initLoad=(()=>N.vn.set(H,!0)),function F(n,t,e){const o=e.querySelectorAll(`[${k}]`),i=o.length;let c,f,r,s,l,u;if(i>0)for(n.vn.set(e,!0),s=0;s<i;s++)for(c=o[s],f=t.D(c,k),(r=new A).m=t.G(r.L=c),n.A.set(c,r),l=0,u=c.childNodes.length;l<u;l++)g(t,c.childNodes[l],r,f,!0)}(N,b,H),N.q=c,N}(e,D,n,t,i,hydratedCssClass);o.En(D.components).forEach(n=>o.pn(n,class extends HTMLElement{}))}})(window,document,Context,appNamespace,publicPath);
})({},"App","hydrated","/build/app/");