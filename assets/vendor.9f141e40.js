var _,e,n,t,o,r,l={},u=[],i=/acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i;function c(_,e){for(var n in e)_[n]=e[n];return _}function f(_){var e=_.parentNode;e&&e.removeChild(_)}function s(e,n,t){var o,r,l,u={};for(l in n)"key"==l?o=n[l]:"ref"==l?r=n[l]:u[l]=n[l];if(arguments.length>2&&(u.children=arguments.length>3?_.call(arguments,2):t),"function"==typeof e&&null!=e.defaultProps)for(l in e.defaultProps)void 0===u[l]&&(u[l]=e.defaultProps[l]);return a(e,u,o,r,null)}function a(_,t,o,r,l){var u={type:_,props:t,key:o,ref:r,__k:null,__:null,__b:0,__e:null,__d:void 0,__c:null,__h:null,constructor:void 0,__v:null==l?++n:l};return null!=e.vnode&&e.vnode(u),u}function p(_){return _.children}function h(_,e){this.props=_,this.context=e}function d(_,e){if(null==e)return _.__?d(_.__,_.__.__k.indexOf(_)+1):null;for(var n;e<_.__k.length;e++)if(null!=(n=_.__k[e])&&null!=n.__e)return n.__e;return"function"==typeof _.type?d(_):null}function v(_){var e,n;if(null!=(_=_.__)&&null!=_.__c){for(_.__e=_.__c.base=null,e=0;e<_.__k.length;e++)if(null!=(n=_.__k[e])&&null!=n.__e){_.__e=_.__c.base=n.__e;break}return v(_)}}function y(_){(!_.__d&&(_.__d=!0)&&t.push(_)&&!m.__r++||r!==e.debounceRendering)&&((r=e.debounceRendering)||o)(m)}function m(){for(var _;m.__r=t.length;)_=t.sort((function(_,e){return _.__v.__b-e.__v.__b})),t=[],_.some((function(_){var e,n,t,o,r,l;_.__d&&(r=(o=(e=_).__v).__e,(l=e.__P)&&(n=[],(t=c({},o)).__v=o.__v+1,P(l,o,t,e.__n,void 0!==l.ownerSVGElement,null!=o.__h?[r]:null,n,null==r?d(o):r,o.__h),C(n,o),o.__e!=r&&v(o)))}))}function k(_,e,n,t,o,r,i,c,f,s){var h,v,y,m,k,H,x,E=t&&t.__k||u,S=E.length;for(n.__k=[],h=0;h<e.length;h++)if(null!=(m=n.__k[h]=null==(m=e[h])||"boolean"==typeof m?null:"string"==typeof m||"number"==typeof m||"bigint"==typeof m?a(null,m,null,null,m):Array.isArray(m)?a(p,{children:m},null,null,null):m.__b>0?a(m.type,m.props,m.key,null,m.__v):m)){if(m.__=n,m.__b=n.__b+1,null===(y=E[h])||y&&m.key==y.key&&m.type===y.type)E[h]=void 0;else for(v=0;v<S;v++){if((y=E[v])&&m.key==y.key&&m.type===y.type){E[v]=void 0;break}y=null}P(_,m,y=y||l,o,r,i,c,f,s),k=m.__e,(v=m.ref)&&y.ref!=v&&(x||(x=[]),y.ref&&x.push(y.ref,null,m),x.push(v,m.__c||k,m)),null!=k?(null==H&&(H=k),"function"==typeof m.type&&null!=m.__k&&m.__k===y.__k?m.__d=f=g(m,f,_):f=b(_,m,y,E,k,f),s||"option"!==n.type?"function"==typeof n.type&&(n.__d=f):_.value=""):f&&y.__e==f&&f.parentNode!=_&&(f=d(y))}for(n.__e=H,h=S;h--;)null!=E[h]&&("function"==typeof n.type&&null!=E[h].__e&&E[h].__e==n.__d&&(n.__d=d(t,h+1)),T(E[h],E[h]));if(x)for(h=0;h<x.length;h++)w(x[h],x[++h],x[++h])}function g(_,e,n){var t,o;for(t=0;t<_.__k.length;t++)(o=_.__k[t])&&(o.__=_,e="function"==typeof o.type?g(o,e,n):b(n,o,o,_.__k,o.__e,e));return e}function b(_,e,n,t,o,r){var l,u,i;if(void 0!==e.__d)l=e.__d,e.__d=void 0;else if(null==n||o!=r||null==o.parentNode)_:if(null==r||r.parentNode!==_)_.appendChild(o),l=null;else{for(u=r,i=0;(u=u.nextSibling)&&i<t.length;i+=2)if(u==o)break _;_.insertBefore(o,r),l=r}return void 0!==l?l:o.nextSibling}function H(_,e,n){"-"===e[0]?_.setProperty(e,n):_[e]=null==n?"":"number"!=typeof n||i.test(e)?n:n+"px"}function x(_,e,n,t,o){var r;_:if("style"===e)if("string"==typeof n)_.style.cssText=n;else{if("string"==typeof t&&(_.style.cssText=t=""),t)for(e in t)n&&e in n||H(_.style,e,"");if(n)for(e in n)t&&n[e]===t[e]||H(_.style,e,n[e])}else if("o"===e[0]&&"n"===e[1])r=e!==(e=e.replace(/Capture$/,"")),e=e.toLowerCase()in _?e.toLowerCase().slice(2):e.slice(2),_.l||(_.l={}),_.l[e+r]=n,n?t||_.addEventListener(e,r?S:E,r):_.removeEventListener(e,r?S:E,r);else if("dangerouslySetInnerHTML"!==e){if(o)e=e.replace(/xlink[H:h]/,"h").replace(/sName$/,"s");else if("href"!==e&&"list"!==e&&"form"!==e&&"tabIndex"!==e&&"download"!==e&&e in _)try{_[e]=null==n?"":n;break _}catch(l){}"function"==typeof n||(null!=n&&(!1!==n||"a"===e[0]&&"r"===e[1])?_.setAttribute(e,n):_.removeAttribute(e))}}function E(_){this.l[_.type+!1](e.event?e.event(_):_)}function S(_){this.l[_.type+!0](e.event?e.event(_):_)}function P(n,t,o,r,u,i,s,a,v){var y,m,g,b,H,E,S,P,C,w,T,D=t.type;if(void 0!==t.constructor)return null;null!=o.__h&&(v=o.__h,a=t.__e=o.__e,t.__h=null,i=[a]),(y=e.__b)&&y(t);try{_:if("function"==typeof D){if(P=t.props,C=(y=D.contextType)&&r[y.__c],w=y?C?C.props.value:y.__:r,o.__c?S=(m=t.__c=o.__c).__=m.__E:("prototype"in D&&D.prototype.render?t.__c=m=new D(P,w):(t.__c=m=new h(P,w),m.constructor=D,m.render=A),C&&C.sub(m),m.props=P,m.state||(m.state={}),m.context=w,m.__n=r,g=m.__d=!0,m.__h=[]),null==m.__s&&(m.__s=m.state),null!=D.getDerivedStateFromProps&&(m.__s==m.state&&(m.__s=c({},m.__s)),c(m.__s,D.getDerivedStateFromProps(P,m.__s))),b=m.props,H=m.state,g)null==D.getDerivedStateFromProps&&null!=m.componentWillMount&&m.componentWillMount(),null!=m.componentDidMount&&m.__h.push(m.componentDidMount);else{if(null==D.getDerivedStateFromProps&&P!==b&&null!=m.componentWillReceiveProps&&m.componentWillReceiveProps(P,w),!m.__e&&null!=m.shouldComponentUpdate&&!1===m.shouldComponentUpdate(P,m.__s,w)||t.__v===o.__v){m.props=P,m.state=m.__s,t.__v!==o.__v&&(m.__d=!1),m.__v=t,t.__e=o.__e,t.__k=o.__k,t.__k.forEach((function(_){_&&(_.__=t)})),m.__h.length&&s.push(m);break _}null!=m.componentWillUpdate&&m.componentWillUpdate(P,m.__s,w),null!=m.componentDidUpdate&&m.__h.push((function(){m.componentDidUpdate(b,H,E)}))}m.context=w,m.props=P,m.state=m.__s,(y=e.__r)&&y(t),m.__d=!1,m.__v=t,m.__P=n,y=m.render(m.props,m.state,m.context),m.state=m.__s,null!=m.getChildContext&&(r=c(c({},r),m.getChildContext())),g||null==m.getSnapshotBeforeUpdate||(E=m.getSnapshotBeforeUpdate(b,H)),T=null!=y&&y.type===p&&null==y.key?y.props.children:y,k(n,Array.isArray(T)?T:[T],t,o,r,u,i,s,a,v),m.base=t.__e,t.__h=null,m.__h.length&&s.push(m),S&&(m.__E=m.__=null),m.__e=!1}else null==i&&t.__v===o.__v?(t.__k=o.__k,t.__e=o.__e):t.__e=function(e,n,t,o,r,u,i,c){var s,a,p,h=t.props,v=n.props,y=n.type,m=0;if("svg"===y&&(r=!0),null!=u)for(;m<u.length;m++)if((s=u[m])&&(s===e||(y?s.localName==y:3==s.nodeType))){e=s,u[m]=null;break}if(null==e){if(null===y)return document.createTextNode(v);e=r?document.createElementNS("http://www.w3.org/2000/svg",y):document.createElement(y,v.is&&v),u=null,c=!1}if(null===y)h===v||c&&e.data===v||(e.data=v);else{if(u=u&&_.call(e.childNodes),a=(h=t.props||l).dangerouslySetInnerHTML,p=v.dangerouslySetInnerHTML,!c){if(null!=u)for(h={},m=0;m<e.attributes.length;m++)h[e.attributes[m].name]=e.attributes[m].value;(p||a)&&(p&&(a&&p.__html==a.__html||p.__html===e.innerHTML)||(e.innerHTML=p&&p.__html||""))}if(function(_,e,n,t,o){var r;for(r in n)"children"===r||"key"===r||r in e||x(_,r,null,n[r],t);for(r in e)o&&"function"!=typeof e[r]||"children"===r||"key"===r||"value"===r||"checked"===r||n[r]===e[r]||x(_,r,e[r],n[r],t)}(e,v,h,r,c),p)n.__k=[];else if(m=n.props.children,k(e,Array.isArray(m)?m:[m],n,t,o,r&&"foreignObject"!==y,u,i,u?u[0]:t.__k&&d(t,0),c),null!=u)for(m=u.length;m--;)null!=u[m]&&f(u[m]);c||("value"in v&&void 0!==(m=v.value)&&(m!==e.value||"progress"===y&&!m)&&x(e,"value",m,h.value,!1),"checked"in v&&void 0!==(m=v.checked)&&m!==e.checked&&x(e,"checked",m,h.checked,!1))}return e}(o.__e,t,o,r,u,i,s,v);(y=e.diffed)&&y(t)}catch(F){t.__v=null,(v||null!=i)&&(t.__e=a,t.__h=!!v,i[i.indexOf(a)]=null),e.__e(F,t,o)}}function C(_,n){e.__c&&e.__c(n,_),_.some((function(n){try{_=n.__h,n.__h=[],_.some((function(_){_.call(n)}))}catch(t){e.__e(t,n.__v)}}))}function w(_,n,t){try{"function"==typeof _?_(n):_.current=n}catch(o){e.__e(o,t)}}function T(_,n,t){var o,r;if(e.unmount&&e.unmount(_),(o=_.ref)&&(o.current&&o.current!==_.__e||w(o,null,n)),null!=(o=_.__c)){if(o.componentWillUnmount)try{o.componentWillUnmount()}catch(l){e.__e(l,n)}o.base=o.__P=null}if(o=_.__k)for(r=0;r<o.length;r++)o[r]&&T(o[r],n,"function"!=typeof _.type);t||null==_.__e||f(_.__e),_.__e=_.__d=void 0}function A(_,e,n){return this.constructor(_,n)}function D(n,t,o){var r,u,i;e.__&&e.__(n,t),u=(r="function"==typeof o)?null:o&&o.__k||t.__k,i=[],P(t,n=(!r&&o||t).__k=s(p,null,[n]),u||l,l,void 0!==t.ownerSVGElement,!r&&o?[o]:u?null:t.firstChild?_.call(t.childNodes):null,i,!r&&o?o:u?u.__e:t.firstChild,r),C(i,n)}_=u.slice,e={__e:function(_,e){for(var n,t,o;e=e.__;)if((n=e.__c)&&!n.__)try{if((t=n.constructor)&&null!=t.getDerivedStateFromError&&(n.setState(t.getDerivedStateFromError(_)),o=n.__d),null!=n.componentDidCatch&&(n.componentDidCatch(_),o=n.__d),o)return n.__E=n}catch(r){_=r}throw _}},n=0,h.prototype.setState=function(_,e){var n;n=null!=this.__s&&this.__s!==this.state?this.__s:this.__s=c({},this.state),"function"==typeof _&&(_=_(c({},n),this.props)),_&&c(n,_),null!=_&&this.__v&&(e&&this.__h.push(e),y(this))},h.prototype.forceUpdate=function(_){this.__v&&(this.__e=!0,_&&this.__h.push(_),y(this))},h.prototype.render=p,t=[],o="function"==typeof Promise?Promise.prototype.then.bind(Promise.resolve()):setTimeout,m.__r=0;var F,U,N,L=0,M=[],W=e.__b,q=e.__r,I=e.diffed,R=e.__c,B=e.unmount;function O(_,n){e.__h&&e.__h(U,_,L||n),L=0;var t=U.__H||(U.__H={__:[],__h:[]});return _>=t.__.length&&t.__.push({}),t.__[_]}function $(_){return L=1,G(Y,_)}function G(_,e,n){var t=O(F++,2);return t.t=_,t.__c||(t.__=[n?n(e):Y(void 0,e),function(_){var e=t.t(t.__[0],_);t.__[0]!==e&&(t.__=[e,t.__[1]],t.__c.setState({}))}],t.__c=U),t.__}function V(_,n){var t=O(F++,3);!e.__s&&X(t.__H,n)&&(t.__=_,t.__H=n,U.__H.__h.push(t))}function j(_){return L=5,function(_,e){var n=O(F++,7);return X(n.__H,e)&&(n.__=_(),n.__H=e,n.__h=_),n.__}((function(){return{current:_}}),[])}function z(){M.forEach((function(_){if(_.__P)try{_.__H.__h.forEach(K),_.__H.__h.forEach(Q),_.__H.__h=[]}catch(n){_.__H.__h=[],e.__e(n,_.__v)}})),M=[]}e.__b=function(_){U=null,W&&W(_)},e.__r=function(_){q&&q(_),F=0;var e=(U=_.__c).__H;e&&(e.__h.forEach(K),e.__h.forEach(Q),e.__h=[])},e.diffed=function(_){I&&I(_);var n=_.__c;n&&n.__H&&n.__H.__h.length&&(1!==M.push(n)&&N===e.requestAnimationFrame||((N=e.requestAnimationFrame)||function(_){var e,n=function(){clearTimeout(t),J&&cancelAnimationFrame(e),setTimeout(_)},t=setTimeout(n,100);J&&(e=requestAnimationFrame(n))})(z)),U=void 0},e.__c=function(_,n){n.some((function(_){try{_.__h.forEach(K),_.__h=_.__h.filter((function(_){return!_.__||Q(_)}))}catch(t){n.some((function(_){_.__h&&(_.__h=[])})),n=[],e.__e(t,_.__v)}})),R&&R(_,n)},e.unmount=function(_){B&&B(_);var n=_.__c;if(n&&n.__H)try{n.__H.__.forEach(K)}catch(t){e.__e(t,n.__v)}};var J="function"==typeof requestAnimationFrame;function K(_){var e=U;"function"==typeof _.__c&&_.__c(),U=e}function Q(_){var e=U;_.__c=_.__(),U=e}function X(_,e){return!_||_.length!==e.length||e.some((function(e,n){return e!==_[n]}))}function Y(_,e){return"function"==typeof e?e(_):e}export{D as S,$ as l,G as p,j as s,s as v,V as y};
