(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[726],{4587:function(e,i,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/researcher",function(){return t(7375)}])},7657:function(e,i,t){"use strict";t.d(i,{Z:function(){return a}});var r=t(5893),n=t(2610),s=t(9090);function a(e){var i=e.messagePrefix,t=(0,s.Z)(i),a=t.f,c=t.fShared;return(0,r.jsx)("nav",{className:"breadcrumb mt-6","aria-label":"breadcrumbs",children:(0,r.jsxs)("ul",{children:[(0,r.jsx)("li",{children:(0,r.jsx)(n.Z,{href:"/",children:(0,r.jsx)("a",{href:"#",children:c("navbar.home")})})}),(0,r.jsx)("li",{className:"is-active",children:(0,r.jsx)("a",{href:"#","aria-current":"page",children:a("title")})})]})})}},6151:function(e,i,t){"use strict";t.d(i,{Z:function(){return a}});var r=t(5893),n=t(5675),s=t(9090);function a(){var e=(0,s.Z)().fShared;return(0,r.jsx)("footer",{className:"footer",children:(0,r.jsxs)("div",{className:"content has-text-centered",children:[(0,r.jsx)("span",{children:e("footer.title")}),(0,r.jsxs)("a",{href:"https://github.com/rafaeleiki",target:"_blank",children:[(0,r.jsx)(n.default,{src:"/images/icons/github.svg",width:28,height:28,className:"p-1 testeste"}),e("footer.github")]}),(0,r.jsxs)("a",{href:"https://www.linkedin.com/in/rafaelimamura/",target:"_blank",children:[(0,r.jsx)(n.default,{src:"/images/icons/linkedin.svg",width:28,height:28,className:"p-1 testeste"}),e("footer.linkedin")]})]})})}},7709:function(e,i,t){"use strict";t.d(i,{om:function(){return m},iX:function(){return d},ZP:function(){return h}});var r=t(5893),n=t(7294),s=t(5675),a=t(9090);function c(e){var i=e.prefix,t=e.title,n=e.subtitle,c=e.time,o=e.description,l=e.imageSrc,u=e.long,d=(0,a.Z)(i),m=d.f,p=d.fShared;return(0,r.jsxs)("article",{className:"media grid-media",children:[l&&(0,r.jsx)("figure",{className:"media-left",children:(0,r.jsx)("p",{className:"image is-64x64",children:(0,r.jsx)(s.default,{src:l,width:64,height:64})})}),(0,r.jsx)("div",{className:"media-content",children:(0,r.jsxs)("div",{className:"content",children:[(0,r.jsxs)("p",{className:"mb-1",children:[(0,r.jsx)("strong",{children:m(t)})," ",(0,r.jsxs)("small",{className:"is-block",children:[m(n),"  ",m(c)]})]}),u?(0,r.jsxs)("details",{children:[(0,r.jsx)("summary",{children:p("grid-media.more")}),m(o)]}):(0,r.jsx)("p",{className:"mt-1",children:m(o)})]})})]})}function o(e,i,t){return i in e?Object.defineProperty(e,i,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[i]=t,e}function l(e,i){return function(e){if(Array.isArray(e))return e}(e)||function(e,i){var t=[],r=!0,n=!1,s=void 0;try{for(var a,c=e[Symbol.iterator]();!(r=(a=c.next()).done)&&(t.push(a.value),!i||t.length!==i);r=!0);}catch(o){n=!0,s=o}finally{try{r||null==c.return||c.return()}finally{if(n)throw s}}return t}(e,i)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}function u(e){return function(e){if(Array.isArray(e)){for(var i=0,t=new Array(e.length);i<e.length;i++)t[i]=e[i];return t}}(e)||function(e){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e))return Array.from(e)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}var d=1,m=2,p={threshold:0};function f(e){var i=e.title,t=e.prefix,n=(0,a.Z)(t).f;return(0,r.jsx)("h1",{className:"special title is-size-1 block fade-in",children:n(i)})}function h(e){var i=e.initialGrid,t=e.messagesPrefix,a=(0,n.useState)(i),h=a[0],v=a[1],b=(0,n.useRef)(null),g=function(e){return e.some((function(e){return e.type===m}))};return(0,n.useEffect)((function(){var e=new IntersectionObserver((function(i){var t=l(i,1)[0];if(t.isIntersecting){var r=t.target.dataset.index,n=u(h);n[r].show=!0,v(n),e.unobserve(t.target)}}),p);return b.current&&b.current.querySelectorAll(".columns:not(.show)").forEach((function(i){return e.observe(i)})),function(){return e.disconnect()}}),[b,h]),(0,r.jsx)("div",{ref:b,children:h.map((function(e,i){var a=e.show,l=e.title,u=e.columns;return(0,r.jsxs)("div",{className:"section",children:[l&&(0,r.jsx)(f,{prefix:t,title:l}),(0,r.jsx)("div",{className:"columns grid ".concat(a?"show":""," ").concat(g(u)?"has-image":""),"data-index":i,children:u.map((function(e,i){return e.type===d?(0,r.jsxs)("div",{className:"column text-column",children:[e.title&&(0,r.jsx)(f,{prefix:t,title:e.title}),e.experiences.map((function(e,i){return(0,n.createElement)(c,function(e){for(var i=1;i<arguments.length;i++){var t=null!=arguments[i]?arguments[i]:{},r=Object.keys(t);"function"===typeof Object.getOwnPropertySymbols&&(r=r.concat(Object.getOwnPropertySymbols(t).filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable})))),r.forEach((function(i){o(e,i,t[i])}))}return e}({},e,{key:i,prefix:t}))}))]},i):(0,r.jsx)("div",{className:"column image-column",children:(0,r.jsx)(s.default,{src:e.imageSrc,layout:"fill",objectFit:"cover",objectPosition:e.objectPosition,priority:e.priority})},i)}))})]},i)}))})}},7375:function(e,i,t){"use strict";t.r(i),t.d(i,{default:function(){return o}});var r=t(5893),n=t(7657),s=t(6151),a=t(7709),c=(t(9090),[{show:!0,title:"papers.title",columns:[{type:a.iX,experiences:[{title:"papers.1.title",subtitle:"papers.1.conference",time:"papers.1.time",description:"papers.1.description",long:!0},{title:"papers.2.title",subtitle:"papers.2.conference",time:"papers.2.time",description:"papers.2.description",long:!0}]},{type:a.iX,experiences:[{title:"papers.3.title",subtitle:"papers.3.conference",time:"papers.3.time",description:"papers.3.description",long:!0},{title:"papers.4.title",subtitle:"papers.4.conference",time:"papers.4.time",description:"papers.4.description",long:!0}]}]},{show:!1,columns:[{type:a.om,imageSrc:"/images/research/isef.webp",objectPosition:"70%",priority:!0},{type:a.iX,title:"initiatives.title",experiences:[{title:"initiatives.febrace.title",subtitle:"initiatives.febrace.subtitle",time:"initiatives.febrace.time",description:"initiatives.febrace.description",imageSrc:"/images/icons/febrace.webp"},{title:"initiatives.devy.title",subtitle:"initiatives.devy.subtitle",time:"initiatives.devy.time",description:"initiatives.devy.description",imageSrc:"/images/icons/devy.webp"},{title:"initiatives.cientistabeta.title",subtitle:"initiatives.cientistabeta.subtitle",time:"initiatives.cientistabeta.time",description:"initiatives.cientistabeta.description",imageSrc:"/images/icons/cientista-beta.webp"},{title:"initiatives.mostracotuca.title",subtitle:"initiatives.mostracotuca.subtitle",time:"initiatives.mostracotuca.time",description:"initiatives.mostracotuca.description",imageSrc:"/images/icons/mostra-tecnica.webp"}]}]},{show:!1,title:"advising.title",columns:[{type:a.iX,experiences:[{title:"advising.unicamp.title",subtitle:"advising.unicamp.subtitle",time:"advising.unicamp.time",description:"advising.unicamp.description"}]},{type:a.iX,experiences:[{title:"advising.cotuca.title",subtitle:"advising.cotuca.subtitle",time:"advising.cotuca.time",description:"advising.cotuca.description"}]}]}]);function o(){return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsxs)("main",{className:"navbar-padded-container container",children:[(0,r.jsx)(n.Z,{messagePrefix:"/researcher"}),(0,r.jsx)("div",{className:"section",children:(0,r.jsx)(a.ZP,{messagesPrefix:"/researcher",initialGrid:c},"experiences-section")})]}),(0,r.jsx)(s.Z,{})]})}}},function(e){e.O(0,[774,888,179],(function(){return i=4587,e(e.s=i);var i}));var i=e.O();_N_E=i}]);