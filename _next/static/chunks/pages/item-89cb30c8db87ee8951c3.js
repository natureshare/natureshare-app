_N_E=(window.webpackJsonp_N_E=window.webpackJsonp_N_E||[]).push([[21],{"6C/C":function(e,t,n){"use strict";var a=n("wx14"),r=n("DSFK"),o=n("25BE"),i=n("PYwp");var l=n("ODXe"),c=n("Ff2n"),s=n("q1tI"),u=(n("TOwV"),n("17x9"),n("iuhU")),d=n("JQEk"),p=n("kKAo"),f=n("H2TA"),m=n("A7vI"),b=n("yCxk"),h=s.forwardRef((function(e,t){var n,f=e.children,h=e.classes,g=e.className,v=e.defaultExpanded,y=void 0!==v&&v,O=e.disabled,j=void 0!==O&&O,x=e.expanded,w=e.onChange,C=e.square,_=void 0!==C&&C,H=e.TransitionComponent,k=void 0===H?d.a:H,V=e.TransitionProps,I=Object(c.a)(e,["children","classes","className","defaultExpanded","disabled","expanded","onChange","square","TransitionComponent","TransitionProps"]),N=Object(b.a)({controlled:x,default:y,name:"Accordion",state:"expanded"}),M=Object(l.a)(N,2),P=M[0],E=M[1],R=s.useCallback((function(e){E(!P),w&&w(e,!P)}),[P,w,E]),A=s.Children.toArray(f),F=(n=A,Object(r.a)(n)||Object(o.a)(n)||Object(i.a)()),S=F[0],L=F.slice(1),T=s.useMemo((function(){return{expanded:P,disabled:j,toggle:R}}),[P,j,R]);return s.createElement(p.a,Object(a.a)({className:Object(u.a)(h.root,g,P&&h.expanded,j&&h.disabled,!_&&h.rounded),ref:t,square:_},I),s.createElement(m.a.Provider,{value:T},S),s.createElement(k,Object(a.a)({in:P,timeout:"auto"},V),s.createElement("div",{"aria-labelledby":S.props.id,id:S.props["aria-controls"],role:"region"},L)))}));t.a=Object(f.a)((function(e){var t={duration:e.transitions.duration.shortest};return{root:{position:"relative",transition:e.transitions.create(["margin"],t),"&:before":{position:"absolute",left:0,top:-1,right:0,height:1,content:'""',opacity:1,backgroundColor:e.palette.divider,transition:e.transitions.create(["opacity","background-color"],t)},"&:first-child":{"&:before":{display:"none"}},"&$expanded":{margin:"16px 0","&:first-child":{marginTop:0},"&:last-child":{marginBottom:0},"&:before":{opacity:0}},"&$expanded + &":{"&:before":{display:"none"}},"&$disabled":{backgroundColor:e.palette.action.disabledBackground}},rounded:{borderRadius:0,"&:first-child":{borderTopLeftRadius:e.shape.borderRadius,borderTopRightRadius:e.shape.borderRadius},"&:last-child":{borderBottomLeftRadius:e.shape.borderRadius,borderBottomRightRadius:e.shape.borderRadius,"@supports (-ms-ime-align: auto)":{borderBottomLeftRadius:0,borderBottomRightRadius:0}}},expanded:{},disabled:{}}}),{name:"MuiAccordion"})(h)},"88Gu":function(e,t){var n=800,a=16,r=Date.now;e.exports=function(e){var t=0,o=0;return function(){var i=r(),l=a-(i-o);if(o=i,l>0){if(++t>=n)return arguments[0]}else t=0;return e.apply(void 0,arguments)}}},A7vI:function(e,t,n){"use strict";var a=n("q1tI"),r=a.createContext({});t.a=r},BiGR:function(e,t,n){var a=n("nmnc"),r=n("03A+"),o=n("Z0cm"),i=a?a.isConcatSpreadable:void 0;e.exports=function(e){return o(e)||r(e)||!!(i&&e&&e[i])}},EA7m:function(e,t,n){var a=n("zZ0H"),r=n("Ioao"),o=n("wclG");e.exports=function(e,t){return o(r(e,t,a),e+"")}},ENrC:function(e,t,n){"use strict";var a=n("wx14"),r=n("Ff2n"),o=n("q1tI"),i=(n("17x9"),n("iuhU")),l=n("H2TA"),c=o.forwardRef((function(e,t){var n=e.classes,l=e.className,c=e.disableSpacing,s=void 0!==c&&c,u=Object(r.a)(e,["classes","className","disableSpacing"]);return(o.createElement("div",Object(a.a)({className:Object(i.a)(n.root,l,!s&&n.spacing),ref:t},u)))}));t.a=Object(l.a)({root:{display:"flex",alignItems:"center",padding:8,justifyContent:"flex-end"},spacing:{"& > :not(:first-child)":{marginLeft:8}}},{name:"MuiAccordionActions"})(c)},H9rN:function(e,t,n){"use strict";var a;Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=(0,((a=n("wvMB"))&&a.__esModule?a:{default:a}).default)("M7,13V11H21V13H7M7,19V17H21V19H7M7,7V5H21V7H7M3,8V5H2V4H4V8H3M2,17V16H5V20H2V19H4V18.5H3V17.5H4V17H2M4.25,10A0.75,0.75 0 0,1 5,10.75C5,10.95 4.92,11.14 4.79,11.27L3.12,13H5V14H2V13.08L4,11H2V10H4.25Z");t.default=r},Ioao:function(e,t,n){var a=n("heNW"),r=Math.max;e.exports=function(e,t,n){return t=r(void 0===t?e.length-1:t,0),function(){for(var o=arguments,i=-1,l=r(o.length-t,0),c=Array(l);++i<l;)c[i]=o[t+i];i=-1;for(var s=Array(t+1);++i<t;)s[i]=o[i];return s[t]=n(c),a(e,this,s)}}},Kpcq:function(e,t,n){"use strict";var a=n("wx14"),r=n("Ff2n"),o=n("q1tI"),i=(n("17x9"),n("iuhU")),l=n("H2TA"),c=o.forwardRef((function(e,t){var n=e.classes,l=e.className,c=Object(r.a)(e,["classes","className"]);return(o.createElement("div",Object(a.a)({className:Object(i.a)(n.root,l),ref:t},c)))}));t.a=Object(l.a)((function(e){return{root:{display:"flex",padding:e.spacing(1,2,2)}}}),{name:"MuiAccordionDetails"})(c)},LvTE:function(e,t,n){"use strict";var a=n("wx14"),r=n("Ff2n"),o=n("q1tI"),i=(n("17x9"),n("iuhU")),l=n("VD++"),c=n("PsDL"),s=n("H2TA"),u=n("A7vI"),d=o.forwardRef((function(e,t){var n=e.children,s=e.classes,d=e.className,p=e.expandIcon,f=e.IconButtonProps,m=e.onBlur,b=e.onClick,h=e.onFocusVisible,g=Object(r.a)(e,["children","classes","className","expandIcon","IconButtonProps","onBlur","onClick","onFocusVisible"]),v=o.useState(!1),y=v[0],O=v[1],j=o.useContext(u.a),x=j.disabled,w=void 0!==x&&x,C=j.expanded,_=j.toggle;return o.createElement(l.a,Object(a.a)({focusRipple:!1,disableRipple:!0,disabled:w,component:"div","aria-expanded":C,className:Object(i.a)(s.root,d,w&&s.disabled,C&&s.expanded,y&&s.focused),onFocusVisible:function(e){O(!0),h&&h(e)},onBlur:function(e){O(!1),m&&m(e)},onClick:function(e){_&&_(e),b&&b(e)},ref:t},g),o.createElement("div",{className:Object(i.a)(s.content,C&&s.expanded)},n),p&&o.createElement(c.a,Object(a.a)({className:Object(i.a)(s.expandIcon,C&&s.expanded),edge:"end",component:"div",tabIndex:null,role:null,"aria-hidden":!0},f),p))}));t.a=Object(s.a)((function(e){var t={duration:e.transitions.duration.shortest};return{root:{display:"flex",minHeight:48,transition:e.transitions.create(["min-height","background-color"],t),padding:e.spacing(0,2),"&:hover:not($disabled)":{cursor:"pointer"},"&$expanded":{minHeight:64},"&$focused":{backgroundColor:e.palette.action.focus},"&$disabled":{opacity:e.palette.action.disabledOpacity}},expanded:{},focused:{},disabled:{},content:{display:"flex",flexGrow:1,transition:e.transitions.create(["margin"],t),margin:"12px 0","&$expanded":{margin:"20px 0"}},expandIcon:{transform:"rotate(0deg)",transition:e.transitions.create("transform",t),"&:hover":{backgroundColor:"transparent"},"&$expanded":{transform:"rotate(180deg)"}}}}),{name:"MuiAccordionSummary"})(d)},ULZQ:function(e,t,n){"use strict";var a;Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=(0,((a=n("wvMB"))&&a.__esModule?a:{default:a}).default)("M4 2V8H2V2H4M2 22H4V16H2V22M5 12C5 10.9 4.11 10 3 10C1.9 10 1 10.9 1 12C1 13.11 1.9 14 3 14C4.11 14 5 13.11 5 12M24 6V18C24 19.11 23.11 20 22 20H10C8.9 20 8 19.11 8 18V14L6 12L8 10V6C8 4.89 8.9 4 10 4H22C23.11 4 24 4.89 24 6M19 13H11V15H19V13M21 9H11V11H21V9Z");t.default=r},XGnz:function(e,t,n){var a=n("CH3K"),r=n("BiGR");e.exports=function e(t,n,o,i,l){var c=-1,s=t.length;for(o||(o=r),l||(l=[]);++c<s;){var u=t[c];n>0&&o(u)?n>1?e(u,n-1,o,i,l):a(l,u):i||(l[l.length]=u)}return l}},cvCv:function(e,t){e.exports=function(e){return function(){return e}}},gb7j:function(e,t,n){var a=n("g4R6"),r=n("zoYe"),o=n("Sxd8"),i=n("dt0z");e.exports=function(e,t,n){e=i(e),t=r(t);var l=e.length,c=n=void 0===n?l:a(o(n),0,l);return(n-=t.length)>=0&&e.slice(n,c)==t}},heNW:function(e,t){e.exports=function(e,t,n){switch(n.length){case 0:return e.call(t);case 1:return e.call(t,n[0]);case 2:return e.call(t,n[0],n[1]);case 3:return e.call(t,n[0],n[1],n[2])}return e.apply(t,n)}},"mv/X":function(e,t,n){var a=n("ljhN"),r=n("MMmD"),o=n("wJg7"),i=n("GoyQ");e.exports=function(e,t,n){if(!i(n))return!1;var l=typeof t;return!!("number"==l?r(n)&&o(t,n.length):"string"==l&&t in n)&&a(n[t],e)}},nQQX:function(e,t,n){"use strict";n.d(t,"a",(function(){return h}));var a=n("rePB"),r=n("q1tI"),o=n.n(r),i=n("Z3vd"),l=n("kfFl"),c=n("yv+Y"),s=n("+JwS"),u=n("W+MB"),d=n("3hq0"),p=o.a.createElement;function f(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function m(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?f(Object(n),!0).forEach((function(t){Object(a.a)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):f(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var b={url:{type:"hidden"},action:{type:"hidden"},target:{type:"hidden"},recipient:{type:"hidden"}};function h(e){var t=e.title,n=e.description,a=e.buttonIcon,f=e.buttonVariant,h=e.url,g=e.action,v=e.target,y=e.recipient,O=e.fields,j=Object(r.useContext)(u.a)[0],x=Object(r.useState)(!1),w=x[0],C=x[1];return p(o.a.Fragment,null,p(i.a,{size:"small",color:"primary",variant:f||"outlined",startIcon:a,onClick:function(){return C(!0)}},t),j&&j.name&&p(d.a,{open:w,setOpen:C,title:t,description:n,source:{url:h||window.location.href,action:g,target:v,recipient:y},fields:m(m({},O),b),method:"POST",url:"/actions",namespace:"action"}),(!j||!j.name)&&p(l.a,{open:w,onClose:function(){return C(!1)}},p(c.a,null,"Please log in first"),p(s.a,null,p(i.a,{onClick:function(){return C(!1)},autoFocus:!0},"Ok"))))}},o4QW:function(e,t,n){"use strict";var a=n("wx14"),r=n("Ff2n"),o=n("q1tI"),i=(n("17x9"),n("iuhU")),l=n("H2TA"),c=o.forwardRef((function(e,t){var n=e.disableSpacing,l=void 0!==n&&n,c=e.classes,s=e.className,u=Object(r.a)(e,["disableSpacing","classes","className"]);return(o.createElement("div",Object(a.a)({className:Object(i.a)(c.root,s,!l&&c.spacing),ref:t},u)))}));t.a=Object(l.a)({root:{display:"flex",alignItems:"center",padding:8},spacing:{"& > :not(:first-child)":{marginLeft:8}}},{name:"MuiCardActions"})(c)},pFRH:function(e,t,n){var a=n("cvCv"),r=n("O0oS"),o=n("zZ0H"),i=r?function(e,t){return r(e,"toString",{configurable:!0,enumerable:!1,value:a(t),writable:!0})}:o;e.exports=i},pPlg:function(e,t,n){"use strict";n.r(t),n.d(t,"default",(function(){return oe}));var a=n("wx14"),r=n("q1tI"),o=n.n(r),i=n("hlFM"),l=n("tRbT"),c=n("30+C"),s=n("lFIR"),u=n("Ie8z"),d=n("9jPY"),p=n("Z3vd"),f=n("NrVZ"),m=n("o4QW"),b=n("eD//"),h=n("tVbE"),g=n("IsqK"),v=n("nOHt"),y=n("cr+I"),O=n.n(y),j=n("Xdxp"),x=n.n(j),w=n("gb7j"),C=n.n(w),_=n("xweI"),H=n.n(_),k=n("kfFl"),V=n("EQI2"),I=n("yv+Y"),N=n("+JwS"),M=n("6C/C"),P=n("LvTE"),E=n("Kpcq"),R=n("ENrC"),A=n("1iKp"),F=n.n(A),S=n("ofer"),L=n("qEN/"),T=n.n(L),B=n("H9rN"),q=n.n(B),D=n("ULZQ"),U=n.n(D),Q=n("e5ou"),Z=n("AesL"),z=n("h7RS"),G=n("oZqh"),X=n("hlie"),Y=o.a.createElement,$="CC BY 2.5 AU";function W(e){var t=e.license,n=void 0===t?$:t;return n===$?Y(X.a,{href:"https://creativecommons.org/licenses/by/2.5/au/"},n):Y(o.a.Fragment,null,n)}var K=n("nQQX"),J=n("sW4n"),ee=n("gMjp"),te=o.a.createElement;function ne(e){var t=e.original_url,n=e.thumbnail_url,a=e.source,r=e.href;return"flickr"===a?te(o.a.Fragment,null,te("a",{"data-flickr-embed":"true",href:r},te("img",{src:n,width:"640",height:"360",alt:""}))):t?te("video",{key:t,controls:!0,src:t,poster:n,style:{width:"100%"}},"[Video Not Supported]"):te(o.a.Fragment,null,"[Video Not Supported]")}var ae=o.a.createElement,re=function(e){var t=e.title,n=e.children,a=e.actions;return ae(M.a,{defaultExpanded:!0},ae(P.a,{expandIcon:ae(F.a,null)},ae(S.a,{variant:"h3"},t)),ae(E.a,null,ae("div",{style:{width:"100%"}},n)),a&&ae(R.a,null,a))};function oe(){var e=Object(v.useRouter)(),t=Object(r.useState)(),n=t[0],y=t[1],j=Object(r.useState)(),w=j[0],_=j[1],M=Object(r.useState)(null),P=M[0],E=M[1],R=Object(r.useState)(null),A=R[0],F=R[1],S=Object(r.useState)(null),L=S[0],B=S[1],D=Object(r.useState)(null),X=D[0],Y=D[1],$=Object(r.useState)(!1),te=$[0],oe=$[1],ie=Object(r.useState)(!1),le=ie[0],ce=ie[1],se=function(e){if(n){var t=Object(J.d)(w);return new URLSearchParams({i:t,t:e})}return{}};Object(r.useEffect)((function(){var t=O.a.parse(e.asPath.split("?",2)[1]).i,n=t?Object(J.c)(C()(t,".yaml")?t:"".concat(t,".yaml"),"https://files.natureshare.org/"):null;if(y(n),n){Object(J.b)(n).then((function(e){e&&(B(e),e.latitude&&e.longitude&&Y({type:"FeatureCollection",features:[{type:"Feature",geometry:{type:"Point",coordinates:[e.longitude,e.latitude]},properties:{id:Object(J.d)(n),title:(e.datetime||e.created_at).split("T")[0]}}]}))})),_(Object(J.c)("../../../items/index.json",n));var a=Object(J.c)("../../../profile.yaml",n);Object(J.b)(a).then((function(e){return e&&F(e)})),E(new URL(".",a).pathname.split("/",2)[1])}}),[]);var ue=Object(r.useMemo)((function(){return n&&x()(Object(J.d)(n),"./")?new URL(Object(J.d)(n),"https://github.com/".concat("natureshare/natureshare-files","/commits/master/")).href:null}),[n]),de=Object(r.useMemo)((function(){return n&&x()(Object(J.d)(n),"./")?new URL(Object(J.d)(n),"https://github.com/".concat("natureshare/natureshare-files","/blame/master/")).href:null}),[n]);return ae(z.a,{title:P,href:"/items?i=".concat(Object(J.d)(w))},ae(Q.d,null,L&&L.datetime&&L.datetime.replace("T"," ").replace("Z","")||L&&L.created_at&&L.created_at.replace("T"," ").replace("Z","")||"Loading..."),ae(Q.e,null,"by ",A&&A.name||P),L&&L.photos&&L.photos.length>0&&ae(i.a,{mt:3,mb:3},ae(l.a,{container:!0,direction:"row",justify:"flex-start",alignItems:"flex-start",spacing:2},H()(L.photos,["primary"]).map((function(e){var t=e.original_url,n=e.thumbnail_url,a=e.source,r=e.href,o=e.license;return ae(l.a,{key:n,item:!0,xs:12,sm:6},ae(c.a,null,ae("a",{href:n,rel:"nofollow",style:{textDecoration:"none"}},ae(s.a,null,ae(u.a,{style:{height:"33vh"},image:n}))),ae(m.a,null,ae(p.a,{size:"small",onClick:function(){return ce(t),!0}},"Full Size"),a&&r&&ae(p.a,{disabled:!r,size:"small",href:r,target:"_blank"},a||"Link"),o&&ae(p.a,{disabled:!0,size:"small"},o))))}))),ae(k.a,{open:le,onClose:function(){return ce(!1)},fullWidth:!0,maxWidth:"sm"},ae(I.a,null,"Show original photo?"),ae(V.a,null,ae(Q.h,null,"File may be very large. Are you sure?")),ae(N.a,null,ae(p.a,{onClick:function(){window.location=le}},"Ok"),ae(p.a,{onClick:function(){return ce(!1)},autoFocus:!0},"Cancel")))),L&&L.videos&&L.videos.length>0&&ae(re,{title:"Video"},!te&&ae(p.a,{variant:"outlined",onClick:function(){return oe(!0)}},"Show Video"),te&&L.videos.map((function(e){return ae(ne,Object(a.a)({key:e.thumbnail_url||"".concat(e.source).concat(e.id)},e))}))),L&&L.audio&&L.audio.length>0&&ae(re,{title:"Audio"},!te&&ae(p.a,{variant:"outlined",onClick:function(){return oe(!0)}},"Show Audio"),te&&L.audio.map((function(e){var t=e.original_url;return ae("audio",{key:t,controls:!0,src:t,style:{width:"100%"}},"[Audio Not Supported]")}))),L&&L.description&&L.description.length>0&&ae(re,{title:"Description"},ae(Q.h,null,L.description)),L&&L.id&&L.id.length>0&&ae(re,{title:"Identification"},ae(b.a,{disablePadding:!0},L.id.map((function(e){return"string"===typeof e?{name:e.split("//",1)[0].trim()}:e})).map((function(e,t){var n=e.name,a=e.common,r=e.by;return ae(h.a,{key:n,button:!0,divider:t+1!==L.id.length,component:Z.a,href:"/items",as:"/items?".concat(se("id~".concat(n)))},ae(g.a,{primary:n,secondary:ae(o.a.Fragment,null,a&&ae(Q.a,null,a),r&&ae(Q.b,null,"id. by ",r))}))})))),L&&L.tags&&L.tags.length>0&&ae(re,{title:"Tags"},ae(l.a,{container:!0,direction:"row",justify:"flex-start",alignItems:"flex-start",spacing:1},L.tags.map((function(e){return ae(l.a,{item:!0,key:e},ae(d.a,{label:e,variant:"outlined",onClick:function(){},component:Z.a,href:"/items",as:"/items?".concat(se("tag~".concat(e))),style:{wordBreak:"break-all"}}))})))),L&&L.latitude&&L.longitude&&ae(re,{title:"Location"},L.location_name&&ae(Q.h,null,L.location_name),ae(G.a,{geo:X})),L&&ae(re,{title:"Collections",actions:ae(K.a,{title:"Add to Collection",url:window.location.href,action:"itemToCollection",target:n,fields:{collection:{label:"Collection Name",autoFocus:!0,inputLabelProps:{shrink:!0},multiline:!0,helperText:"Lowercase letters, numbers, dashes and underscores are allowed."}}})},ae(b.a,{disablePadding:!0},(!L.collections||0===L.collections.length)&&ae(h.a,null,ae(g.a,{secondary:ae("em",null,"None")})),L.collections&&L.collections.length>0&&L.collections.map((function(e,t){return ae(h.a,{key:e,button:!0,divider:t+1!==L.collections.length,component:Z.a,href:"/items",as:"/items?i=".concat(encodeURIComponent(Object(J.d)(Object(J.c)("../../../collections/".concat(e,"/aggregate/index.json"),n)))),style:{wordBreak:"break-all"}},ae(g.a,{primary:e}))})))),L&&ae(re,{title:"Discussion",actions:ae(K.a,{title:"Add a Comment",url:window.location.href,action:"itemComment",target:n,recipient:P,fields:{comment:{label:"Comment",autoFocus:!0,inputLabelProps:{shrink:!0},multiline:!0}}})},ae(b.a,{disablePadding:!0},(!L.comments||0===L.comments.length)&&ae(h.a,null,ae(g.a,{secondary:ae("em",null,"None")})),L.comments&&0!==L.comments.length&&L.comments.map((function(e,t){var n=e.created_at,a=e.username,r=e.text;return ae(h.a,{key:a+n,divider:t+1!==L.comments.length},ae(g.a,{primary:ae(Z.a,{href:"/profile",as:"/profile?i=".concat(encodeURIComponent("./".concat(a)))},a),secondary:ae(o.a.Fragment,null,ae(Q.b,null,n&&n.split("T")[0]),ae(Q.a,null,'"',r,'"'))}))})))),L&&ae(re,{title:"Meta"},ae(b.a,{disablePadding:!0},L.datetime&&ae(h.a,null,ae(g.a,{primary:"Observation",secondary:"".concat(L.datetime).replace("T"," ")})),L.photos&&L.photos.length>0&&ae(o.a.Fragment,null,ae(h.a,null,ae(g.a,{primary:"Date-Time from Camera",secondary:L.photo_datetime_used?"Yes":"No"})),L.non_identifying_photo&&ae(h.a,null,ae(g.a,{primary:"Non-Identifying Photo",secondary:"Yes"})),L.photo_quality&&ae(h.a,null,ae(g.a,{primay:"Photo Quality",secondary:L.photo_quality}))),L.latitude&&L.longitude&&ae(o.a.Fragment,null,ae(h.a,null,ae(g.a,{primary:"Location",secondary:"".concat(parseFloat(L.latitude).toFixed(6)," ").concat(parseFloat(L.longitude).toFixed(6))})),ae(h.a,null,ae(g.a,{primary:"Location from Camera (Geotag)",secondary:L.photo_geotag_used?"Yes":"No"}))),ae(h.a,null,ae(g.a,{primary:"Created",secondary:L.created_at&&L.created_at.split("T")[0]})),ae(h.a,null,ae(g.a,{primary:"Updated",secondary:L.updated_at&&L.updated_at.split("T")[0]})),ae(h.a,null,ae(g.a,{primary:"Photo(s) License",secondary:ae(W,{license:L.photos&&L.photos.map((function(e){return e.license})).filter(Boolean).join(", ")||L.license})})),ae(h.a,null,ae(g.a,{primary:"Document License",secondary:ae(W,{license:L.license})})))),ae(i.a,{mt:3,mb:5,style:{textAlign:"center"}},ae(f.a,{size:"small",variant:"outlined"},ae(p.a,{href:n,target:"_blank",startIcon:ae(ee.a,{type:"yaml"})},"YAML"),de&&ae(p.a,{href:de,target:"_blank",startIcon:ae(q.a,null)},"History"),ue&&ae(p.a,{href:ue,target:"_blank",startIcon:ae(U.a,null)},"Changelog"),L&&L.source&&L.source.map((function(e){return ae(p.a,{href:e.href,target:"_blank",startIcon:ae(T.a,null)},e.name)})))))}},"qEN/":function(e,t,n){"use strict";var a;Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=(0,((a=n("wvMB"))&&a.__esModule?a:{default:a}).default)("M14,3V5H17.59L7.76,14.83L9.17,16.24L19,6.41V10H21V3M19,19H5V5H12V3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V12H19V19Z");t.default=r},qQ6C:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/item",function(){return n("pPlg")}])},wclG:function(e,t,n){var a=n("pFRH"),r=n("88Gu")(a);e.exports=r},xweI:function(e,t,n){var a=n("XGnz"),r=n("alwl"),o=n("EA7m"),i=n("mv/X"),l=o((function(e,t){if(null==e)return[];var n=t.length;return n>1&&i(e,t[0],t[1])?t=[]:n>2&&i(t[0],t[1],t[2])&&(t=[t[0]]),r(e,a(t,1),[])}));e.exports=l}},[["qQ6C",0,2,5,1,3,4,6,7,8,9]]]);