_N_E=(window.webpackJsonp_N_E=window.webpackJsonp_N_E||[]).push([[23],{"1TBh":function(e,t,a){(window.__NEXT_P=window.__NEXT_P||[]).push(["/items",function(){return a("zAlb")}])},"6C/C":function(e,t,a){"use strict";var n=a("wx14"),r=a("DSFK"),o=a("25BE"),i=a("PYwp");var c=a("ODXe"),s=a("Ff2n"),l=a("q1tI"),u=(a("TOwV"),a("17x9"),a("iuhU")),d=a("JQEk"),f=a("kKAo"),m=a("H2TA"),p=a("A7vI"),g=a("yCxk"),b=l.forwardRef((function(e,t){var a,m=e.children,b=e.classes,h=e.className,v=e.defaultExpanded,x=void 0!==v&&v,y=e.disabled,j=void 0!==y&&y,O=e.expanded,C=e.onChange,w=e.square,k=void 0!==w&&w,E=e.TransitionComponent,L=void 0===E?d.a:E,N=e.TransitionProps,R=Object(s.a)(e,["children","classes","className","defaultExpanded","disabled","expanded","onChange","square","TransitionComponent","TransitionProps"]),A=Object(g.a)({controlled:O,default:x,name:"Accordion",state:"expanded"}),H=Object(c.a)(A,2),I=H[0],T=H[1],M=l.useCallback((function(e){T(!I),C&&C(e,!I)}),[I,C,T]),_=l.Children.toArray(m),B=(a=_,Object(r.a)(a)||Object(o.a)(a)||Object(i.a)()),F=B[0],S=B.slice(1),q=l.useMemo((function(){return{expanded:I,disabled:j,toggle:M}}),[I,j,M]);return l.createElement(f.a,Object(n.a)({className:Object(u.a)(b.root,h,I&&b.expanded,j&&b.disabled,!k&&b.rounded),ref:t,square:k},R),l.createElement(p.a.Provider,{value:q},F),l.createElement(L,Object(n.a)({in:I,timeout:"auto"},N),l.createElement("div",{"aria-labelledby":F.props.id,id:F.props["aria-controls"],role:"region"},S)))}));t.a=Object(m.a)((function(e){var t={duration:e.transitions.duration.shortest};return{root:{position:"relative",transition:e.transitions.create(["margin"],t),"&:before":{position:"absolute",left:0,top:-1,right:0,height:1,content:'""',opacity:1,backgroundColor:e.palette.divider,transition:e.transitions.create(["opacity","background-color"],t)},"&:first-child":{"&:before":{display:"none"}},"&$expanded":{margin:"16px 0","&:first-child":{marginTop:0},"&:last-child":{marginBottom:0},"&:before":{opacity:0}},"&$expanded + &":{"&:before":{display:"none"}},"&$disabled":{backgroundColor:e.palette.action.disabledBackground}},rounded:{borderRadius:0,"&:first-child":{borderTopLeftRadius:e.shape.borderRadius,borderTopRightRadius:e.shape.borderRadius},"&:last-child":{borderBottomLeftRadius:e.shape.borderRadius,borderBottomRightRadius:e.shape.borderRadius,"@supports (-ms-ime-align: auto)":{borderBottomLeftRadius:0,borderBottomRightRadius:0}}},expanded:{},disabled:{}}}),{name:"MuiAccordion"})(b)},A7vI:function(e,t,a){"use strict";var n=a("q1tI"),r=n.createContext({});t.a=r},ENrC:function(e,t,a){"use strict";var n=a("wx14"),r=a("Ff2n"),o=a("q1tI"),i=(a("17x9"),a("iuhU")),c=a("H2TA"),s=o.forwardRef((function(e,t){var a=e.classes,c=e.className,s=e.disableSpacing,l=void 0!==s&&s,u=Object(r.a)(e,["classes","className","disableSpacing"]);return(o.createElement("div",Object(n.a)({className:Object(i.a)(a.root,c,!l&&a.spacing),ref:t},u)))}));t.a=Object(c.a)({root:{display:"flex",alignItems:"center",padding:8,justifyContent:"flex-end"},spacing:{"& > :not(:first-child)":{marginLeft:8}}},{name:"MuiAccordionActions"})(s)},J2m7:function(e,t,a){var n=a("XKAG")(a("UfWW"));e.exports=n},Kpcq:function(e,t,a){"use strict";var n=a("wx14"),r=a("Ff2n"),o=a("q1tI"),i=(a("17x9"),a("iuhU")),c=a("H2TA"),s=o.forwardRef((function(e,t){var a=e.classes,c=e.className,s=Object(r.a)(e,["classes","className"]);return(o.createElement("div",Object(n.a)({className:Object(i.a)(a.root,c),ref:t},s)))}));t.a=Object(c.a)((function(e){return{root:{display:"flex",padding:e.spacing(1,2,2)}}}),{name:"MuiAccordionDetails"})(s)},KwMD:function(e,t){e.exports=function(e,t,a,n){for(var r=e.length,o=a+(n?1:-1);n?o--:++o<r;)if(t(e[o],o,e))return o;return-1}},LvTE:function(e,t,a){"use strict";var n=a("wx14"),r=a("Ff2n"),o=a("q1tI"),i=(a("17x9"),a("iuhU")),c=a("VD++"),s=a("PsDL"),l=a("H2TA"),u=a("A7vI"),d=o.forwardRef((function(e,t){var a=e.children,l=e.classes,d=e.className,f=e.expandIcon,m=e.IconButtonProps,p=e.onBlur,g=e.onClick,b=e.onFocusVisible,h=Object(r.a)(e,["children","classes","className","expandIcon","IconButtonProps","onBlur","onClick","onFocusVisible"]),v=o.useState(!1),x=v[0],y=v[1],j=o.useContext(u.a),O=j.disabled,C=void 0!==O&&O,w=j.expanded,k=j.toggle;return o.createElement(c.a,Object(n.a)({focusRipple:!1,disableRipple:!0,disabled:C,component:"div","aria-expanded":w,className:Object(i.a)(l.root,d,C&&l.disabled,w&&l.expanded,x&&l.focused),onFocusVisible:function(e){y(!0),b&&b(e)},onBlur:function(e){y(!1),p&&p(e)},onClick:function(e){k&&k(e),g&&g(e)},ref:t},h),o.createElement("div",{className:Object(i.a)(l.content,w&&l.expanded)},a),f&&o.createElement(s.a,Object(n.a)({className:Object(i.a)(l.expandIcon,w&&l.expanded),edge:"end",component:"div",tabIndex:null,role:null,"aria-hidden":!0},m),f))}));t.a=Object(l.a)((function(e){var t={duration:e.transitions.duration.shortest};return{root:{display:"flex",minHeight:48,transition:e.transitions.create(["min-height","background-color"],t),padding:e.spacing(0,2),"&:hover:not($disabled)":{cursor:"pointer"},"&$expanded":{minHeight:64},"&$focused":{backgroundColor:e.palette.action.focus},"&$disabled":{opacity:e.palette.action.disabledOpacity}},expanded:{},focused:{},disabled:{},content:{display:"flex",flexGrow:1,transition:e.transitions.create(["margin"],t),margin:"12px 0","&$expanded":{margin:"20px 0"}},expandIcon:{transform:"rotate(0deg)",transition:e.transitions.create("transform",t),"&:hover":{backgroundColor:"transparent"},"&$expanded":{transform:"rotate(180deg)"}}}}),{name:"MuiAccordionSummary"})(d)},UfWW:function(e,t,a){var n=a("KwMD"),r=a("ut/Y"),o=a("Sxd8"),i=Math.max;e.exports=function(e,t,a){var c=null==e?0:e.length;if(!c)return-1;var s=null==a?0:o(a);return s<0&&(s=i(c+s,0)),n(e,r(t,3),s)}},XKAG:function(e,t,a){var n=a("ut/Y"),r=a("MMmD"),o=a("7GkX");e.exports=function(e){return function(t,a,i){var c=Object(t);if(!r(t)){var s=n(a,3);t=o(t),a=function(e){return s(c[e],e,c)}}var l=e(t,a,i);return l>-1?c[s?t[l]:l]:void 0}}},bo4g:function(e,t,a){"use strict";var n=a("TqRt");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=n(a("q1tI")),o=(0,n(a("8/g6")).default)(r.default.createElement("path",{d:"M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"}),"NavigateNext");t.default=o},gb7j:function(e,t,a){var n=a("g4R6"),r=a("zoYe"),o=a("Sxd8"),i=a("dt0z");e.exports=function(e,t,a){e=i(e),t=r(t);var c=e.length,s=a=void 0===a?c:n(o(a),0,c);return(a-=t.length)>=0&&e.slice(a,s)==t}},"ux/f":function(e,t,a){"use strict";var n;Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=(0,((n=a("wvMB"))&&n.__esModule?n:{default:n}).default)("M15.25,13H17.25L16.75,15H14.75L15.25,13M22,8V18A2,2 0 0,1 20,20H4A2,2 0 0,1 2,18V6C2,4.89 2.89,4 4,4H10L12,6H20A2,2 0 0,1 22,8M20,12H18.5L19,10H18L17.5,12H15.5L16,10H15L14.5,12H13V13H14.25L13.75,15H12V16H13.5L13,18H14L14.5,16H16.5L16,18H17L17.5,16H19V15H17.75L18.25,13H20V12Z");t.default=r},zAlb:function(e,t,a){"use strict";a.r(t),a.d(t,"default",(function(){return ce}));var n=a("KQm4"),r=a("q1tI"),o=a.n(r),i=a("hlFM"),c=a("Z3vd"),s=a("tRbT"),l=a("gb7j"),u=a.n(l),d=a("J2m7"),f=a.n(d),m=a("RBan"),p=a.n(m),g=a("Xdxp"),b=a.n(g),h=a("wx14"),v=a("Ff2n"),x=(a("TOwV"),a("17x9"),a("iuhU")),y=a("H2TA"),j=a("ofer"),O=a("ye/S"),C=a("5AJ6"),w=Object(C.a)(r.createElement("path",{d:"M6 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm12 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"}),"MoreHoriz"),k=a("VD++");var E=Object(y.a)((function(e){return{root:{display:"flex",marginLeft:e.spacing(.5),marginRight:e.spacing(.5),backgroundColor:e.palette.grey[100],color:e.palette.grey[700],borderRadius:2,cursor:"pointer","&:hover, &:focus":{backgroundColor:e.palette.grey[200]},"&:active":{boxShadow:e.shadows[0],backgroundColor:Object(O.b)(e.palette.grey[200],.12)}},icon:{width:24,height:16}}}),{name:"PrivateBreadcrumbCollapsed"})((function(e){var t=e.classes,a=Object(v.a)(e,["classes"]);return(r.createElement(k.a,Object(h.a)({component:"li",className:t.root,focusRipple:!0},a),r.createElement(w,{className:t.icon})))}));var L=r.forwardRef((function(e,t){var a=e.children,o=e.classes,i=e.className,c=e.component,s=void 0===c?"nav":c,l=e.expandText,u=void 0===l?"Show path":l,d=e.itemsAfterCollapse,f=void 0===d?1:d,m=e.itemsBeforeCollapse,p=void 0===m?1:m,g=e.maxItems,b=void 0===g?8:g,y=e.separator,O=void 0===y?"/":y,C=Object(v.a)(e,["children","classes","className","component","expandText","itemsAfterCollapse","itemsBeforeCollapse","maxItems","separator"]),w=r.useState(!1),k=w[0],L=w[1],N=r.Children.toArray(a).filter((function(e){return r.isValidElement(e)})).map((function(e,t){return r.createElement("li",{className:o.li,key:"child-".concat(t)},e)}));return r.createElement(j.a,Object(h.a)({ref:t,component:s,color:"textSecondary",className:Object(x.a)(o.root,i)},C),r.createElement("ol",{className:o.ol},function(e,t,a){return e.reduce((function(n,o,i){return i<e.length-1?n=n.concat(o,r.createElement("li",{"aria-hidden":!0,key:"separator-".concat(i),className:t},a)):n.push(o),n}),[])}(k||b&&N.length<=b?N:function(e){return p+f>=e.length?e:[].concat(Object(n.a)(e.slice(0,p)),[r.createElement(E,{"aria-label":u,key:"ellipsis",onClick:function(e){L(!0);var t=e.currentTarget.parentNode.querySelector("a[href],button,[tabindex]");t&&t.focus()}})],Object(n.a)(e.slice(e.length-f,e.length)))}(N),o.separator,O)))})),N=Object(y.a)({root:{},ol:{display:"flex",flexWrap:"wrap",alignItems:"center",padding:0,margin:0,listStyle:"none"},li:{},separator:{display:"flex",userSelect:"none",marginLeft:8,marginRight:8}},{name:"MuiBreadcrumbs"})(L),R=a("bo4g"),A=a.n(R),H=a("zxih"),I=a("sW4n"),T=a("AesL"),M=a("9jPY"),_=a("6C/C"),B=a("LvTE"),F=a("Kpcq"),S=a("ENrC"),q=a("1iKp"),P=a.n(q),U=a("e5ou"),V=a("gMjp"),z=o.a.createElement,K=function(e){return e.toLowerCase().replace(/\s/g,"_")},D=function(e){return[e[0].toLowerCase(),e.split(" ",1)[0].toLowerCase(),K(e).replace(/\//g,"~").replace(/[.'"`]/g,"")].join("/")};function $(e){var t=e.indexUrl,a=e.id,n=Object(r.useState)(null),i=n[0],l=n[1];Object(r.useEffect)((function(){if(a&&"unidentified"!==a.toLowerCase()){l(null);var e="/".concat(D(a),".yaml");Object(I.b)(e,"https://species.natureshare.org/").then((function(e){return l(e||{})}))}else l(!1)}),[a]);var u=Object(r.useMemo)((function(){return a?"https://github.com/".concat("natureshare/natureshare-species-wiki","/tree/master/").concat(D(a),".yaml"):""}),[a]);return z(o.a.Fragment,null,!1!==i&&z(_.a,null,z(B.a,{expandIcon:z(P.a,null)},z(j.a,{variant:"h3"},a)),z(F.a,{style:{marginTop:"-30px",marginBottom:"-10px"}},i&&z("div",null,i.common_names&&i.common_names.length>0&&z(o.a.Fragment,null,z(U.g,null,"Common Names"),z(s.a,{container:!0,spacing:1},i.common_names.map((function(e){return z(s.a,{item:!0,key:e},z(M.a,{label:e,variant:"outlined"}))})))),i.synonyms&&i.synonyms.length>0&&z(o.a.Fragment,null,z(U.g,null,"Synonyms"),z(s.a,{container:!0,spacing:1},i.synonyms.map((function(e){return z(s.a,{item:!0,key:e},z(M.a,{label:e,variant:"outlined",component:T.a,onClick:function(){},href:"/items",as:"/items?".concat(new URLSearchParams({i:t,t:"id~".concat(e)}))}))})))),i.classification&&i.classification.length>0&&z(o.a.Fragment,null,z(U.g,null,"Classification"),z(s.a,{container:!0,spacing:1},i.classification.map((function(e){var t=e.rank,a=e.name;return z(s.a,{item:!0,key:t+a},z(M.a,{label:"".concat(t,": ").concat(a),variant:"outlined"}))})))),i.categories&&i.categories.length>0&&z(o.a.Fragment,null,z(U.g,null,"Categories"),z(s.a,{container:!0,spacing:1},i.categories.map((function(e){return z(s.a,{item:!0,key:e},z(M.a,{label:e,variant:"outlined"}))})))),i.features&&i.features.length>0&&z(o.a.Fragment,null,z(U.g,null,"Features"),z(s.a,{container:!0,spacing:1},i.features.map((function(e){var t=e.feature,a=e.description;return z(s.a,{item:!0,key:t+a},z(M.a,{label:"".concat(t,": ").concat(a),variant:"outlined"}))})))))),z(S.a,null,z(c.a,{href:u,target:"_blank",startIcon:z(V.a,{type:"yaml"})},"Edit"))))}var X=a("//Mq"),J=a.n(X),W=a("AeLt"),Y=a.n(W),G=a("LZiF"),Z=a.n(G),Q=a("ux/f"),ee=a.n(Q),te=a("O3kt"),ae=a.n(te),ne=o.a.createElement;function re(e){var t=e.category;return ne(o.a.Fragment,null,"profile"===t&&ne(ae.a,null),"collections"===t&&ne(ee.a,null),"ids"===t&&ne(J.a,null),"items"===t&&ne(Y.a,null),"tags"===t&&ne(Z.a,null))}var oe=o.a.createElement,ie=function(e){var t=e.text,a=e.href,n=e.as;return oe(s.a,{key:t,item:!0},oe(c.a,{component:T.a,href:a,as:n,variant:"outlined",color:"primary",startIcon:oe(re,{category:t})},t))};function ce(){return oe(H.a,null,(function(e){var t=e.feedUrl,a=e.getParams,r=e.filterTags,c=e.items;return oe(o.a.Fragment,null,r&&0!==r.length&&oe(i.a,{mt:1},oe(N,{separator:oe(A.a,{fontSize:"small"})},oe(j.a,{variant:"h4"},oe(T.a,{href:"/items",as:"/items?".concat(a({g:"",t:[]}))},"Items")),r&&r.map((function(e,t){return oe(j.a,{key:e,variant:"h4"},oe(T.a,{href:"/items",as:"/items?".concat(a({g:"",t:r.slice(0,t+1)}))},p()(e.split("~").filter(Boolean))))})))),t&&oe(i.a,{mt:2},oe(s.a,{container:!0,direction:"row",justify:"flex-start",alignItems:"center",spacing:2},(!r||0===r.length)&&u()(t,"/items/index.json")&&oe(o.a.Fragment,null,oe(ie,{text:"profile",href:"/profile",as:"/profile?i=".concat(encodeURIComponent(Object(I.d)(new URL("../../profile.yaml",t).href)))}),oe(ie,{text:"collections",href:"/items",as:"/items?".concat(a({i:Object(I.d)(new URL("../collections/index.json",t).href)}))})),f()(c,(function(e){return e.tags&&f()(e.tags,(function(e){return b()(e,"id~")}))}))&&oe(ie,{text:"ids",href:"/items",as:"/items?".concat(a({t:[].concat(Object(n.a)(r||[]),["id~"])}))}),f()(c,(function(e){return e.tags&&f()(e.tags,(function(e){return b()(e,"tag~")}))}))&&oe(ie,{text:"tags",href:"/items",as:"/items?".concat(a({t:[].concat(Object(n.a)(r||[]),["tag~"])}))}))),r&&0!==r.filter((function(e){return b()(e,"id~")})).length&&oe(i.a,{mt:2},r.filter((function(e){return b()(e,"id~")})).map((function(e){return oe($,{key:e,indexUrl:t,id:e.split("~",2)[1]})}))))}))}}},[["1TBh",0,2,5,1,3,4,6,7,8,9,10]]]);