_N_E=(window.webpackJsonp_N_E=window.webpackJsonp_N_E||[]).push([[25],{Djcv:function(e,n){e.exports=function(e){return null==e?[]:String(e).split(/\r\n?|\n/)}},U0lu:function(e,n,t){"use strict";t.r(n),t.d(n,"default",(function(){return h}));var r=t("q1tI"),u=t.n(r),i=t("nOHt"),a=t("cr+I"),o=t.n(a),s=t("Djcv"),c=t.n(s),l=t("sW4n"),f=t("e5ou"),b=t("h7RS"),p=u.a.createElement;function h(){var e=Object(i.useRouter)(),n=Object(r.useState)(),t=n[0],a=n[1],s=Object(r.useState)(),h=s[0],w=s[1],j=Object(r.useState)(),_=j[0],d=j[1];return Object(r.useEffect)((function(){var n=o.a.parse(e.asPath.split(/\?/)[1]).i;if(n){a(new URL(n,"https://files.natureshare.org/").pathname.split("/",2)[1]);var t=Object(l.c)(n,"https://files.natureshare.org/");w(Object(l.d)(Object(l.c)("./items/index.json",t))),Object(l.b)(t).then((function(e){return e&&d(e)}))}}),[]),p(b.a,{title:t,href:"/items?i=".concat(encodeURIComponent(h))},p(f.d,null,"Profile"),p(f.e,null,_&&_.name),_&&_.organisation&&p(u.a.Fragment,null,p(f.h,null,p("strong",null,_.organisation))),_&&_.bio&&p(u.a.Fragment,null,c()(_.bio).filter(Boolean).map((function(e,n){return p(f.h,{key:n},e)}))),_&&_.website&&p(u.a.Fragment,null,p("a",{href:_.website},_.website)))}},xflu:function(e,n,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/profile",function(){return t("U0lu")}])}},[["xflu",0,2,5,1,3,4,6,8]]]);