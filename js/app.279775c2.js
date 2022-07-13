(function(){"use strict";var t={8004:function(t,i,e){var s=e(144),n=e(998),a=e(8762),o=e(9582),l=e(4886),r=e(2631),c=e(9223),f=e(1088),u=e(896),d=e(8718),h=function(){var t=this,i=t._self._c;return i(n.Z,{attrs:{id:"app"}},[i("div",{staticClass:"text-right dots"},[i("font-awesome-icon",{attrs:{icon:"fa-solid fa-ellipsis-vertical"},on:{click:function(i){t.dialog=!0}}})],1),i("div",{staticClass:"text-left grey--text"},[i("span",{staticClass:"title-begin",on:{click:t.redirect}},[t._v("闹钟")]),i("span",{staticClass:"title-font",on:{click:t.redirect}},[t._v("时钟")]),i("span",{staticClass:"title-font",staticStyle:{color:"#2382f3"}},[t._v("秒表")]),i("span",{staticClass:"title-font",on:{click:t.redirect}},[t._v("计时")])]),i(f.Z,{staticClass:"time-font"},[i(d.Z),i("div",[i("div",{staticClass:"time-fix"},[i("span",[t._v(t._s("0".repeat(2).concat(t.minute).slice(-2)))]),i("span",{staticClass:"sign-font"},[t._v(":")]),i("span",[t._v(t._s("0".repeat(2).concat(t.second).slice(-2)))]),i("span",{staticClass:"sign-font"},[t._v(".")]),i("span",[t._v(t._s("0".repeat(2).concat(t.millisecond).slice(-2)))])]),i("div",{staticClass:"display-slider text-center"},[i(u.Z,{attrs:{min:0,max:59,step:1,ticks:"always","tick-size":2,value:t.second,"track-color":"white","track-fill-color":"white","thumb-size":"20",readonly:""}})],1)]),i(d.Z)],1),i("div",{staticClass:"text-center footer-fix"},[0===t.state?i(a.Z,{attrs:{color:"white",fab:"",large:"",elevation:"3"},on:{click:t.begin}},[i("font-awesome-icon",{staticClass:"ml-1 button-icon",attrs:{icon:"fa-solid fa-play"}})],1):t._e(),1===t.state?i("div",[i(a.Z,{attrs:{color:"white",fab:"",large:"",elevation:"3"},on:{click:t.flag}},[i("font-awesome-icon",{staticClass:"button-icon",staticStyle:{"font-size":"20px"},attrs:{icon:"fa-solid fa-flag"}})],1),i("span",{staticClass:"button-gap"}),i(a.Z,{attrs:{color:"white",fab:"",large:"",elevation:"3"},on:{click:t.pause}},[i("font-awesome-icon",{staticClass:"button-icon",staticStyle:{"font-size":"28px"},attrs:{icon:"fa-solid fa-pause"}})],1)],1):t._e(),2===t.state?i("div",[i(a.Z,{attrs:{color:"white",fab:"",large:"",elevation:"3"},on:{click:t.stop}},[i("font-awesome-icon",{staticClass:"button-icon",attrs:{icon:"fa-solid fa-stop"}})],1),i("span",{staticClass:"button-gap"}),i(a.Z,{attrs:{color:"white",fab:"",large:"",elevation:"3"},on:{click:t.begin}},[i("font-awesome-icon",{staticClass:"ml-1 button-icon",attrs:{icon:"fa-solid fa-play"}})],1)],1):t._e()],1),i(r.Z,{on:{"click:outside":function(i){t.dialog=!1}},model:{value:t.dialog,callback:function(i){t.dialog=i},expression:"dialog"}},[i(o.Z,[i(l.EB,[t._v("倍率选择")]),i(c.Z),i(l.ZB,{staticClass:"text-center"},[i(u.Z,{staticClass:"mt-10",attrs:{step:5,max:400,min:25},model:{value:t.slide,callback:function(i){t.slide=i},expression:"slide"}}),t._v(" "+t._s("当前倍率: "+t.fixValue(t.ratio))+" "),i("span",{staticClass:"mx-4"},[t._v("|")]),t._v(" "+t._s("更新倍率: "+t.fixValue(t.slide/100))+" ")],1),i(c.Z),i(l.h7,[i(d.Z),i(a.Z,{attrs:{color:"error",text:"",dark:""},on:{click:t.resetRatio}},[t._v("取消")]),i(a.Z,{attrs:{color:"success",text:"",dark:""},on:{click:t.setRatio}},[t._v("确认")])],1)],1)],1)],1)},v=[],p={data:function(){return{fix:0,minute:0,second:0,millisecond:0,state:0,ratio:1,slide:100,dialog:!1,mainInterval:null,fixInterval:null,timeStamp:null}},methods:{async updateTime(){this.millisecond++,this.millisecond>99&&(this.millisecond=0,this.second++,this.second>59&&(this.second=0,this.minute++,this.minute>59&&(this.minute=0)))},async fixTime(){const t=Math.round((+new Date-this.timeStamp)*this.ratio)+this.fix;this.minute=Math.floor(t/6e4)%60,this.second=Math.floor(t/1e3)%60,this.millisecond=Math.floor(t%1e3/10)},redirect(){window.location="https://www.bilibili.com/video/BV1uT4y1P7CX"},setRatio(){this.stop(),this.ratio=this.slide/100,this.dialog=!1,this.slide=100},resetRatio(){this.dialog=!1,this.slide=100},fixValue(t){const i=t.toString(),e=i.indexOf(".");return-1===e?i+".00":e+2===i.length?i+"0":i},begin(){this.fix=6e4*this.minute+1e3*this.second+10*this.millisecond,this.mainInterval=setInterval(this.updateTime,10/this.ratio),this.fixInterval=setInterval(this.fixTime,5e3),this.timeStamp=+new Date,this.state=1},flag(){this.redirect()},pause(){clearInterval(this.mainInterval),clearInterval(this.fixInterval),this.fixTime(),this.state=2},stop(){clearInterval(this.mainInterval),clearInterval(this.fixInterval),this.minute=this.second=this.millisecond=0,this.state=0}}},m=p,g=e(1001),b=(0,g.Z)(m,h,v,!1,null,"7a86436a",null),x=b.exports,w=e(8864),_=(e(8556),e(8947)),k=e(7810),y=e(1436);s.ZP.component("font-awesome-icon",k.GN),_.vI.add(y.mRB),s.ZP.use(w.Z);var Z=new w.Z({breakpoint:{mobileBreakpoint:"sm"},icons:{iconfont:"faSvg"}});s.ZP.config.productionTip=!1,new s.ZP({vuetify:Z,render:t=>t(x)}).$mount("#app")}},i={};function e(s){var n=i[s];if(void 0!==n)return n.exports;var a=i[s]={exports:{}};return t[s](a,a.exports,e),a.exports}e.m=t,function(){var t=[];e.O=function(i,s,n,a){if(!s){var o=1/0;for(f=0;f<t.length;f++){s=t[f][0],n=t[f][1],a=t[f][2];for(var l=!0,r=0;r<s.length;r++)(!1&a||o>=a)&&Object.keys(e.O).every((function(t){return e.O[t](s[r])}))?s.splice(r--,1):(l=!1,a<o&&(o=a));if(l){t.splice(f--,1);var c=n();void 0!==c&&(i=c)}}return i}a=a||0;for(var f=t.length;f>0&&t[f-1][2]>a;f--)t[f]=t[f-1];t[f]=[s,n,a]}}(),function(){e.n=function(t){var i=t&&t.__esModule?function(){return t["default"]}:function(){return t};return e.d(i,{a:i}),i}}(),function(){e.d=function(t,i){for(var s in i)e.o(i,s)&&!e.o(t,s)&&Object.defineProperty(t,s,{enumerable:!0,get:i[s]})}}(),function(){e.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"===typeof window)return window}}()}(),function(){e.o=function(t,i){return Object.prototype.hasOwnProperty.call(t,i)}}(),function(){e.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})}}(),function(){var t={143:0};e.O.j=function(i){return 0===t[i]};var i=function(i,s){var n,a,o=s[0],l=s[1],r=s[2],c=0;if(o.some((function(i){return 0!==t[i]}))){for(n in l)e.o(l,n)&&(e.m[n]=l[n]);if(r)var f=r(e)}for(i&&i(s);c<o.length;c++)a=o[c],e.o(t,a)&&t[a]&&t[a][0](),t[a]=0;return e.O(f)},s=self["webpackChunksuper_timer"]=self["webpackChunksuper_timer"]||[];s.forEach(i.bind(null,0)),s.push=i.bind(null,s.push.bind(s))}();var s=e.O(void 0,[998],(function(){return e(8004)}));s=e.O(s)})();