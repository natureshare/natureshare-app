_N_E=(window.webpackJsonp_N_E=window.webpackJsonp_N_E||[]).push([[25],{"30+C":function(e,t,a){"use strict";var n=a("wx14"),r=a("Ff2n"),o=a("q1tI"),i=(a("17x9"),a("iuhU")),s=a("kKAo"),c=a("H2TA"),l=o.forwardRef((function(e,t){var a=e.classes,c=e.className,l=e.raised,u=void 0!==l&&l,d=Object(r.a)(e,["classes","className","raised"]);return(o.createElement(s.a,Object(n.a)({className:Object(i.a)(a.root,c),elevation:u?8:1,ref:t},d)))}));t.a=Object(c.a)({root:{overflow:"hidden"}},{name:"MuiCard"})(l)},ZuSV:function(e,t,a){"use strict";var n=a("TqRt");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=n(a("q1tI")),o=(0,n(a("8/g6")).default)(r.default.createElement("path",{d:"M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"}),"MoreVert");t.default=o},"c/gK":function(e,t,a){"use strict";var n;Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=(0,((n=a("wvMB"))&&n.__esModule?n:{default:n}).default)("M8,10V13H14V18H8V21L2,15.5L8,10M22,8.5L16,3V6H10V11H16V14L22,8.5Z");t.default=r},fDz8:function(e,t,a){"use strict";a.r(t),a.d(t,"default",(function(){return U}));var n=a("q1tI"),r=a.n(n),o=a("tRbT"),i=a("30+C"),s=a("hlFM"),c=a("oa/T"),l=a("ofer"),u=a("o4QW"),d=a("Z3vd"),f=a("e5ou"),p=a("wx14"),m=a("Ff2n"),g=(a("17x9"),a("iuhU")),b=a("H2TA"),h=a("5AJ6"),v=Object(h.a)(n.createElement("path",{d:"M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"}),"Person");var x=n.forwardRef((function(e,t){var a=e.alt,r=e.children,o=e.classes,i=e.className,s=e.component,c=void 0===s?"div":s,l=e.imgProps,u=e.sizes,d=e.src,f=e.srcSet,b=e.variant,h=void 0===b?"circle":b,x=Object(m.a)(e,["alt","children","classes","className","component","imgProps","sizes","src","srcSet","variant"]),y=null,w=function(e){var t=e.src,a=e.srcSet,r=n.useState(!1),o=r[0],i=r[1];return n.useEffect((function(){if(t||a){i(!1);var e=!0,n=new Image;return n.src=t,n.srcSet=a,n.onload=function(){e&&i("loaded")},n.onerror=function(){e&&i("error")},function(){e=!1}}}),[t,a]),o}({src:d,srcSet:f}),j=d||f,O=j&&"error"!==w;return y=O?n.createElement("img",Object(p.a)({alt:a,src:d,srcSet:f,sizes:u,className:o.img},l)):null!=r?r:j&&a?a[0]:n.createElement(v,{className:o.fallback}),n.createElement(c,Object(p.a)({className:Object(g.a)(o.root,o.system,o[h],i,!O&&o.colorDefault),ref:t},x),y)})),y=Object(b.a)((function(e){return{root:{position:"relative",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,width:40,height:40,fontFamily:e.typography.fontFamily,fontSize:e.typography.pxToRem(20),lineHeight:1,borderRadius:"50%",overflow:"hidden",userSelect:"none"},colorDefault:{color:e.palette.background.default,backgroundColor:"light"===e.palette.type?e.palette.grey[400]:e.palette.grey[600]},circle:{},rounded:{borderRadius:e.shape.borderRadius},square:{borderRadius:0},img:{width:"100%",height:"100%",textAlign:"center",objectFit:"cover",color:"transparent",textIndent:1e4},fallback:{width:"75%",height:"75%"}}}),{name:"MuiAvatar"})(x),w=n.forwardRef((function(e,t){var a=e.action,r=e.avatar,o=e.classes,i=e.className,s=e.component,c=void 0===s?"div":s,u=e.disableTypography,d=void 0!==u&&u,f=e.subheader,b=e.subheaderTypographyProps,h=e.title,v=e.titleTypographyProps,x=Object(m.a)(e,["action","avatar","classes","className","component","disableTypography","subheader","subheaderTypographyProps","title","titleTypographyProps"]),y=h;null==y||y.type===l.a||d||(y=n.createElement(l.a,Object(p.a)({variant:r?"body2":"h5",className:o.title,component:"span",display:"block"},v),y));var w=f;return null==w||w.type===l.a||d||(w=n.createElement(l.a,Object(p.a)({variant:r?"body2":"body1",className:o.subheader,color:"textSecondary",component:"span",display:"block"},b),w)),n.createElement(c,Object(p.a)({className:Object(g.a)(o.root,i),ref:t},x),r&&n.createElement("div",{className:o.avatar},r),n.createElement("div",{className:o.content},y,w),a&&n.createElement("div",{className:o.action},a))})),j=Object(b.a)({root:{display:"flex",alignItems:"center",padding:16},avatar:{flex:"0 0 auto",marginRight:16},action:{flex:"0 0 auto",alignSelf:"flex-start",marginTop:-8,marginRight:-8},content:{flex:"1 1 auto"},title:{},subheader:{}},{name:"MuiCardHeader"})(w),O=a("PsDL"),S=a("ZuSV"),C=a.n(S),N=a("R8PQ"),I=a.n(N),E=a("c/gK"),M=a.n(E),k=a("v/XU"),P=a.n(k),T=a("gd/W"),A=a("jjAL"),_=a("W+MB"),z=a("nQQX"),H=r.a.createElement;function F(e){var t=e.id,a=e.avatar,r=e.title,o=e.subheader,s=e.body,f=Object(n.useContext)(_.a),m=f[0],g=f[1],b=Object(n.useState)(null),h=b[0],v=b[1],x=Object(n.useMemo)((function(){return m&&m.data&&m.data.oauth&&m.data.oauth[t]}),[m]),w=function(){v(null)};return H(i.a,null,H(T.a,{id:"simple-menu",anchorEl:h,keepMounted:!0,open:Boolean(h),onClose:w},H(A.a,{onClick:function(){if(w(),window){var e=new Headers;if(window.localStorage){var a=window.localStorage.getItem("userToken");a&&e.set("Authorization","Bearer ".concat(a))}window.fetch(new URL("/user/oauth/".concat(t),"https://api.natureshare.org/").href,{method:"DELETE",credentials:"include",headers:e}).then((function(){return g(null)})).catch((function(){}))}}},"Disconnect")),H(j,{avatar:H(y,{alt:"",src:a,variant:"square"},"F"),action:x&&H(O.a,{onClick:function(e){v(e.currentTarget)}},H(C.a,null)),title:H("strong",null,r),subheader:o}),H(c.a,{style:{minHeight:"120px"}},H(l.a,{variant:"body2",component:"div"},s)),H(u.a,null,!x&&H(d.a,{disabled:!(m&&m.name),color:"primary",startIcon:H(M.a,null),href:new URL("/connect/".concat(t),"https://api.natureshare.org/").href},"Connect"),x&&H(z.a,Object(p.a)({title:"Sync Now",description:"After clicking submit, please wait at least an hour for sync to complete.",buttonIcon:H(I.a,null),buttonVariant:"text"},{url:window.location.href,action:"runUserMediaImport",target:t,fields:{}})),H(d.a,{color:"primary",startIcon:H(P.a,null),href:"/help/upload/".concat(t)},"Help")))}var R=a("h7RS"),L=a("asfu"),W=a("zO52"),D=a("AesL"),V=r.a.createElement;function U(){var e=Object(n.useContext)(_.a),t=e[0],a=e[1],p=Object(n.useState)(!1),m=p[0],g=p[1],b=Object(n.useState)(!1),h=b[0],v=b[1];return Object(n.useEffect)((function(){a(null)}),[]),V(R.a,{title:"Upload",href:"/upload/"},V(f.d,null,"Upload"),V(f.h,null,"NatureShare is designed as a distributed and decentralised sharing hub."),V(f.h,null,V(d.a,{component:D.a,variant:"outlined",color:"primary",size:"small",href:"help/[topic]/[item]",as:"/help/d14n/info"},"More info")),t&&!t.name&&V(s.a,{mt:3},V(L.a,{open:m,setOpen:g}),V(W.a,{open:h,setOpen:v,newUser:!0}),V(i.a,null,V(c.a,null,V(l.a,{variant:"body2"},"Log in or sign up to get started.")),V(u.a,null,V(d.a,{onClick:function(){return g(!0)},color:"primary"},"Log In"),V(d.a,{onClick:function(){return v(!0)},color:"primary"},"Sign Up")))),V(s.a,{mt:4},V(o.a,{container:!0,direction:"row",justify:"flex-start",alignItems:"flex-start",spacing:2},V(o.a,{item:!0,xs:12,sm:6},V(F,{id:"inaturalist",avatar:"logos/inaturalist.png",title:"iNaturalist",subheader:"Import and Export Observations",body:V(r.a.Fragment,null,"Available soon...")})),V(o.a,{item:!0,xs:12,sm:6},V(F,{id:"flickr",avatar:"logos/flickr.png",title:"Flickr",subheader:"Import Photos and Videos",body:V(r.a.Fragment,null,"Note, when you connect your Flickr account it will ask for public and private access. Please be assured that NatureShare will only ever access and sync the photos you have already set to ",V("strong",null,"public")," visibility."," ",V("a",{href:"https://github.com/natureshare/natureshare-scripts/blob/master/importers/handler/flickr.js",target:"_blank",rel:"noreferrer"},"You can review the code here."))})),V(o.a,{item:!0,xs:12,sm:6},V(F,{id:"dropbox",avatar:"logos/dropbox.png",title:"Dropbox",subheader:"Import Photos",body:V(r.a.Fragment,null,"When you connect to DropBox, a new folder will be created under"," ",V("em",null,"Apps \xbb NatureShare"),". NatureShare will only be able to access the files you place in that new folder.")})),V(o.a,{item:!0,xs:12,sm:6},V(F,{id:"google",avatar:"logos/google.png",title:"Google",subheader:"Import Photos and YouTube Videos",body:V(r.a.Fragment,null,"Available soon...")})))))}},jjAL:function(e,t,a){"use strict";var n=a("Ff2n"),r=a("rePB"),o=a("wx14"),i=a("q1tI"),s=(a("17x9"),a("iuhU")),c=a("H2TA"),l=a("tVbE"),u=i.forwardRef((function(e,t){var a,r=e.classes,c=e.className,u=e.component,d=void 0===u?"li":u,f=e.disableGutters,p=void 0!==f&&f,m=e.ListItemClasses,g=e.role,b=void 0===g?"menuitem":g,h=e.selected,v=e.tabIndex,x=Object(n.a)(e,["classes","className","component","disableGutters","ListItemClasses","role","selected","tabIndex"]);return e.disabled||(a=void 0!==v?v:-1),i.createElement(l.a,Object(o.a)({button:!0,role:b,tabIndex:a,component:d,selected:h,disableGutters:p,classes:Object(o.a)({dense:r.dense},m),className:Object(s.a)(r.root,c,h&&r.selected,!p&&r.gutters),ref:t},x))}));t.a=Object(c.a)((function(e){return{root:Object(o.a)({},e.typography.body1,Object(r.a)({minHeight:48,paddingTop:6,paddingBottom:6,boxSizing:"border-box",width:"auto",overflow:"hidden",whiteSpace:"nowrap"},e.breakpoints.up("sm"),{minHeight:"auto"})),gutters:{},selected:{},dense:Object(o.a)({},e.typography.body2,{minHeight:"auto"})}}),{name:"MuiMenuItem"})(u)},nQQX:function(e,t,a){"use strict";a.d(t,"a",(function(){return b}));var n=a("rePB"),r=a("q1tI"),o=a.n(r),i=a("Z3vd"),s=a("kfFl"),c=a("yv+Y"),l=a("+JwS"),u=a("W+MB"),d=a("3hq0"),f=o.a.createElement;function p(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function m(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?p(Object(a),!0).forEach((function(t){Object(n.a)(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):p(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}var g={url:{type:"hidden"},action:{type:"hidden"},target:{type:"hidden"},recipient:{type:"hidden"}};function b(e){var t=e.title,a=e.description,n=e.buttonIcon,p=e.buttonVariant,b=e.url,h=e.action,v=e.target,x=e.recipient,y=e.fields,w=Object(r.useContext)(u.a)[0],j=Object(r.useState)(!1),O=j[0],S=j[1];return f(o.a.Fragment,null,f(i.a,{size:"small",color:"primary",variant:p||"outlined",startIcon:n,onClick:function(){return S(!0)}},t),w&&w.name&&f(d.a,{open:O,setOpen:S,title:t,description:a,source:{url:b||window.location.href,action:h,target:v,recipient:x},fields:m(m({},y),g),method:"POST",url:"/actions",namespace:"action"}),(!w||!w.name)&&f(s.a,{open:O,onClose:function(){return S(!1)}},f(c.a,null,"Please log in first"),f(l.a,null,f(i.a,{onClick:function(){return S(!1)},autoFocus:!0},"Ok"))))}},o4QW:function(e,t,a){"use strict";var n=a("wx14"),r=a("Ff2n"),o=a("q1tI"),i=(a("17x9"),a("iuhU")),s=a("H2TA"),c=o.forwardRef((function(e,t){var a=e.disableSpacing,s=void 0!==a&&a,c=e.classes,l=e.className,u=Object(r.a)(e,["disableSpacing","classes","className"]);return(o.createElement("div",Object(n.a)({className:Object(i.a)(c.root,l,!s&&c.spacing),ref:t},u)))}));t.a=Object(s.a)({root:{display:"flex",alignItems:"center",padding:8},spacing:{"& > :not(:first-child)":{marginLeft:8}}},{name:"MuiCardActions"})(c)},"oa/T":function(e,t,a){"use strict";var n=a("wx14"),r=a("Ff2n"),o=a("q1tI"),i=(a("17x9"),a("iuhU")),s=a("H2TA"),c=o.forwardRef((function(e,t){var a=e.classes,s=e.className,c=e.component,l=void 0===c?"div":c,u=Object(r.a)(e,["classes","className","component"]);return(o.createElement(l,Object(n.a)({className:Object(i.a)(a.root,s),ref:t},u)))}));t.a=Object(s.a)({root:{padding:16,"&:last-child":{paddingBottom:24}}},{name:"MuiCardContent"})(c)},sf5q:function(e,t,a){(window.__NEXT_P=window.__NEXT_P||[]).push(["/upload",function(){return a("fDz8")}])},tRbT:function(e,t,a){"use strict";var n=a("Ff2n"),r=a("wx14"),o=a("q1tI"),i=(a("17x9"),a("iuhU")),s=a("H2TA"),c=[0,1,2,3,4,5,6,7,8,9,10],l=["auto",!0,1,2,3,4,5,6,7,8,9,10,11,12];function u(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1,a=parseFloat(e);return"".concat(a/t).concat(String(e).replace(String(a),"")||"px")}var d=o.forwardRef((function(e,t){var a=e.alignContent,s=void 0===a?"stretch":a,c=e.alignItems,l=void 0===c?"stretch":c,u=e.classes,d=e.className,f=e.component,p=void 0===f?"div":f,m=e.container,g=void 0!==m&&m,b=e.direction,h=void 0===b?"row":b,v=e.item,x=void 0!==v&&v,y=e.justify,w=void 0===y?"flex-start":y,j=e.lg,O=void 0!==j&&j,S=e.md,C=void 0!==S&&S,N=e.sm,I=void 0!==N&&N,E=e.spacing,M=void 0===E?0:E,k=e.wrap,P=void 0===k?"wrap":k,T=e.xl,A=void 0!==T&&T,_=e.xs,z=void 0!==_&&_,H=e.zeroMinWidth,F=void 0!==H&&H,R=Object(n.a)(e,["alignContent","alignItems","classes","className","component","container","direction","item","justify","lg","md","sm","spacing","wrap","xl","xs","zeroMinWidth"]),L=Object(i.a)(u.root,d,g&&[u.container,0!==M&&u["spacing-xs-".concat(String(M))]],x&&u.item,F&&u.zeroMinWidth,"row"!==h&&u["direction-xs-".concat(String(h))],"wrap"!==P&&u["wrap-xs-".concat(String(P))],"stretch"!==l&&u["align-items-xs-".concat(String(l))],"stretch"!==s&&u["align-content-xs-".concat(String(s))],"flex-start"!==w&&u["justify-xs-".concat(String(w))],!1!==z&&u["grid-xs-".concat(String(z))],!1!==I&&u["grid-sm-".concat(String(I))],!1!==C&&u["grid-md-".concat(String(C))],!1!==O&&u["grid-lg-".concat(String(O))],!1!==A&&u["grid-xl-".concat(String(A))]);return o.createElement(p,Object(r.a)({className:L,ref:t},R))})),f=Object(s.a)((function(e){return Object(r.a)({root:{},container:{boxSizing:"border-box",display:"flex",flexWrap:"wrap",width:"100%"},item:{boxSizing:"border-box",margin:"0"},zeroMinWidth:{minWidth:0},"direction-xs-column":{flexDirection:"column"},"direction-xs-column-reverse":{flexDirection:"column-reverse"},"direction-xs-row-reverse":{flexDirection:"row-reverse"},"wrap-xs-nowrap":{flexWrap:"nowrap"},"wrap-xs-wrap-reverse":{flexWrap:"wrap-reverse"},"align-items-xs-center":{alignItems:"center"},"align-items-xs-flex-start":{alignItems:"flex-start"},"align-items-xs-flex-end":{alignItems:"flex-end"},"align-items-xs-baseline":{alignItems:"baseline"},"align-content-xs-center":{alignContent:"center"},"align-content-xs-flex-start":{alignContent:"flex-start"},"align-content-xs-flex-end":{alignContent:"flex-end"},"align-content-xs-space-between":{alignContent:"space-between"},"align-content-xs-space-around":{alignContent:"space-around"},"justify-xs-center":{justifyContent:"center"},"justify-xs-flex-end":{justifyContent:"flex-end"},"justify-xs-space-between":{justifyContent:"space-between"},"justify-xs-space-around":{justifyContent:"space-around"},"justify-xs-space-evenly":{justifyContent:"space-evenly"}},function(e,t){var a={};return c.forEach((function(n){var r=e.spacing(n);0!==r&&(a["spacing-".concat(t,"-").concat(n)]={margin:"-".concat(u(r,2)),width:"calc(100% + ".concat(u(r),")"),"& > $item":{padding:u(r,2)}})})),a}(e,"xs"),e.breakpoints.keys.reduce((function(t,a){return function(e,t,a){var n={};l.forEach((function(e){var t="grid-".concat(a,"-").concat(e);if(!0!==e)if("auto"!==e){var r="".concat(Math.round(e/12*1e8)/1e6,"%");n[t]={flexBasis:r,flexGrow:0,maxWidth:r}}else n[t]={flexBasis:"auto",flexGrow:0,maxWidth:"none"};else n[t]={flexBasis:0,flexGrow:1,maxWidth:"100%"}})),"xs"===a?Object(r.a)(e,n):e[t.breakpoints.up(a)]=n}(t,e,a),t}),{}))}),{name:"MuiGrid"})(d);t.a=f},"v/XU":function(e,t,a){"use strict";var n;Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=(0,((n=a("wvMB"))&&n.__esModule?n:{default:n}).default)("M15.07,11.25L14.17,12.17C13.45,12.89 13,13.5 13,15H11V14.5C11,13.39 11.45,12.39 12.17,11.67L13.41,10.41C13.78,10.05 14,9.55 14,9C14,7.89 13.1,7 12,7A2,2 0 0,0 10,9H8A4,4 0 0,1 12,5A4,4 0 0,1 16,9C16,9.88 15.64,10.67 15.07,11.25M13,19H11V17H13M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12C22,6.47 17.5,2 12,2Z");t.default=r}},[["sf5q",0,2,1,3,4]]]);