(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{300:function(e,t,n){"use strict";n.r(t);var r=n(68),o=n.n(r),c=n(29),a=n.n(c),s=(n(307),n(54),n(55),n(7)),l=s.a.getData(["design","colors"]),u=l.design,i=l.colors,g=document.querySelector(".prev-step"),v=document.querySelector(".next-step"),f=function(e){if(!e)throw new Error("MessageView's RootElement is not defined");var t=e.querySelector(".canvas__layer--color-bg"),n=e.querySelector(".canvas__layer--color-groupa"),r=e.querySelector(".canvas__layer--color-groupb"),c=e.querySelector(".canvas__layer--color-groupc"),s=e.querySelector(".canvas__layer--sketch"),l=e.querySelector(".message__to"),u=e.querySelector(".message__body");return{init:function(e){!function(e){var o,l,u,i,g=e.design,v=e.colors;(s.src="images/ct".concat(g+1,"_bg_0.svg"),v)&&(t.src=a()(o="images/ct".concat(g+1,"_bg_")).call(o,v.bg,".svg"),n.src=a()(l="images/ct".concat(g+1,"_1_")).call(l,v.groupa,".svg"),r.src=a()(u="images/ct".concat(g+1,"_2_")).call(u,v.groupb,".svg"),c.src=a()(i="images/ct".concat(g+1,"_3_")).call(i,v.groupc,".svg"))}({design:e.design,colors:e.colors})},getMessage:function(){var e,t;return{to:o()(e=l.value).call(e),body:o()(t=u.value).call(t)}},validate:function(){var e,t;return!(!o()(e=l.value).call(e)||!o()(t=u.value).call(t))}}}(document.querySelector(".message"));f.init({design:u,colors:i}),g.addEventListener("click",(function(e){u>1&&(e.preventDefault(),location.href="step1.html")}),!1),v.addEventListener("click",(function(e){if(!f.validate())return e.preventDefault(),void alert("메세지를 입력해주세요");s.a.setMesssage(f.getMessage())}),!1)},307:function(e,t,n){},7:function(e,t,n){"use strict";var r=n(12),o=n.n(r),c=n(13),a=n.n(c),s=n(2),l=n.n(s),u=n(0),i=n.n(u),g=n(3),v=n.n(g),f=n(8),d=n.n(f),_=n(4),m=n.n(_),y=n(14),p=n.n(y),S=n(19),b=n.n(S),q=n(15),w=n.n(q),h=n(18),k=n.n(h);function D(e,t){var n=p()(e);if(m.a){var r=m()(e);t&&(r=d()(r).call(r,(function(t){return v()(e,t).enumerable}))),n.push.apply(n,r)}return n}function M(e){for(var t=1;t<arguments.length;t++){var n,r=null!=arguments[t]?arguments[t]:{};if(t%2)i()(n=D(Object(r),!0)).call(n,(function(t){w()(e,t,r[t])}));else if(l.a)a()(e,l()(r));else{var c;i()(c=D(Object(r))).call(c,(function(t){o()(e,t,v()(r,t))}))}}return e}var E=JSON.parse(sessionStorage.getItem("customed-oreo"))||{},I=function(e){sessionStorage.setItem("customed-oreo",k()(e))},J={clear:function(){sessionStorage.removeItem("customed-oreo")},getData:function(){return E},setSelectedDesign:function(e){return E=M({},E,{design:e}),I(E),E},setSelectedColor:function(e){return E=M({},E,{colors:e}),I(E),E},setMesssage:function(e){return E=M({},E,{message:e}),I(E),E},resetSelectedItems:function(e){var t=!0,n=!1,r=void 0;try{for(var o,c=b()(e);!(t=(o=c.next()).done);t=!0){var a=o.value;delete E[a]}}catch(e){n=!0,r=e}finally{try{t||null==c.return||c.return()}finally{if(n)throw r}}return I(E),E}};t.a=J}},[[300,1,0]]]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvc2NyaXB0cy9zdGVwMy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NyaXB0cy9TdG9yZS9pbmRleC5qcyJdLCJuYW1lcyI6WyJzdG9yZSIsImdldERhdGEiLCJkZXNpZ24iLCJjb2xvcnMiLCJwcmV2U3RlcEJ0biIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsIm5leHRTdGVwQnRuIiwibWVzc2FnZSIsImVsIiwiRXJyb3IiLCJiZ0ltZyIsImdyb3VwQUltZyIsImdyb3VwQkltZyIsImdyb3VwQ0ltZyIsInNrZXRjaExheWVyIiwibXNnVG8iLCJtc2dCb2R5IiwiaW5pdCIsInNyYyIsImJnIiwiZ3JvdXBhIiwiZ3JvdXBiIiwiZ3JvdXBjIiwibG9hZExheWVycyIsImdldE1lc3NhZ2UiLCJ0byIsInZhbHVlIiwiYm9keSIsInZhbGlkYXRlIiwiTWVzc2FnZVZpZXciLCJhZGRFdmVudExpc3RlbmVyIiwiZXZlbnQiLCJwcmV2ZW50RGVmYXVsdCIsImxvY2F0aW9uIiwiaHJlZiIsImFsZXJ0Iiwic2V0TWVzc3NhZ2UiLCJkYXRhIiwiSlNPTiIsInBhcnNlIiwic2Vzc2lvblN0b3JhZ2UiLCJnZXRJdGVtIiwidXBkYXRlU3RvcmUiLCJzZXRJdGVtIiwiY2xlYXIiLCJyZW1vdmVJdGVtIiwic2V0U2VsZWN0ZWREZXNpZ24iLCJzZXRTZWxlY3RlZENvbG9yIiwicmVzZXRTZWxlY3RlZEl0ZW1zIiwiaXRlbXMiLCJpdGVtIl0sIm1hcHBpbmdzIjoicUtBS3lCQSxJQUFNQyxRQUFRLENBQUMsU0FBRCxXQUFoQ0MsRSxFQUFBQSxPQUFRQyxFLEVBQUFBLE9BQ1RDLEVBQWNDLFNBQVNDLGNBQVQsY0FDZEMsRUFBY0YsU0FBU0MsY0FBVCxjQXVDZEUsRUFyQ2MsU0FBQ0MsR0FDbkIsSUFBSUEsRUFBSSxNQUFNLElBQUlDLE1BQUosNENBQ2QsSUFBTUMsRUFBUUYsRUFBR0gsY0FBYyw0QkFDekJNLEVBQVlILEVBQUdILGNBQWMsZ0NBQzdCTyxFQUFZSixFQUFHSCxjQUFjLGdDQUM3QlEsRUFBWUwsRUFBR0gsY0FBYyxnQ0FDN0JTLEVBQWNOLEVBQUdILGNBQWMsMEJBQy9CVSxFQUFRUCxFQUFHSCxjQUFjLGdCQUN6QlcsRUFBVVIsRUFBR0gsY0FBYyxrQkFhakMsTUFBTyxDQUNMWSxLQURLLGFBWFksU0FBQyxHQUFxQixJQUU3QixRQUZTaEIsRUFBb0IsRUFBcEJBLE9BQVFDLEVBQVksRUFBWkEsUUFDM0JZLEVBQVlJLElBQVosbUJBQTZCakIsRUFBUyxFQUF0QyxhQUNHQyxLQUNEUSxFQUFNUSxJQUFOLHlCQUF3QmpCLEVBQVMsRUFBakMsZ0JBQXlDQyxFQUFPaUIsR0FBaEQsUUFDQVIsRUFBVU8sSUFBVix5QkFBNEJqQixFQUFTLEVBQXJDLGVBQTRDQyxFQUFPa0IsT0FBbkQsUUFDQVIsRUFBVU0sSUFBVix5QkFBNEJqQixFQUFTLEVBQXJDLGVBQTRDQyxFQUFPbUIsT0FBbkQsUUFDQVIsRUFBVUssSUFBVix5QkFBNEJqQixFQUFTLEVBQXJDLGVBQTRDQyxFQUFPb0IsT0FBbkQsU0FPQUMsQ0FBVyxDQUFDdEIsT0FEUyxFQUFqQkEsT0FDZ0JDLE9BREMsRUFBVEEsVUFHZHNCLFdBSkssV0FJUSxRQUNYLE1BQU8sQ0FDTEMsR0FBSSxNQUFBVixFQUFNVyxPQUFOLFFBQ0pDLEtBQU0sTUFBQVgsRUFBUVUsT0FBUixVQUdWRSxTQVZLLFdBVU0sUUFDVCxTQUFVLE1BQUFiLEVBQU1XLE9BQU4sVUFBc0IsTUFBQVYsRUFBUVUsT0FBUixXQUt0QkcsQ0FBWXpCLFNBQVNDLGNBQVQsYUFDNUJFLEVBQVFVLEtBQUssQ0FBQ2hCLFNBQVFDLFdBQ3RCQyxFQUFZMkIsaUJBQVosU0FBc0MsU0FBQUMsR0FDakM5QixFQUFTLElBQ1Y4QixFQUFNQyxpQkFDTkMsU0FBU0MsS0FBVCxpQkFFRCxHQUNINUIsRUFBWXdCLGlCQUFaLFNBQXNDLFNBQUFDLEdBQ3BDLElBQUl4QixFQUFRcUIsV0FHVixPQUZBRyxFQUFNQyxzQkFDTkcsTUFBTSxlQUdScEMsSUFBTXFDLFlBQVk3QixFQUFRaUIsaUJBQ3pCLEksd29CQzdESCxJQUFJYSxFQUFPQyxLQUFLQyxNQUFNQyxlQUFlQyxRQUFmLG1CQUE0QyxHQUU1REMsRUFBYyxTQUFBTCxHQUNsQkcsZUFBZUcsUUFBZixnQkFBd0MsSUFBZU4sS0FHbkR0QyxFQUFRLENBQ1o2QyxNQURZLFdBRVZKLGVBQWVLLFdBQWYsa0JBRUY3QyxRQUpZLFdBS1YsT0FBT3FDLEdBRVRTLGtCQVBZLFNBT003QyxHQUdoQixPQUZBb0MsRUFBTyxFQUFILEdBQU9BLEVBQVAsQ0FBYXBDLFdBQ2pCeUMsRUFBWUwsR0FDTEEsR0FFVFUsaUJBWlksU0FZSzdDLEdBR2YsT0FGQW1DLEVBQU8sRUFBSCxHQUFPQSxFQUFQLENBQWFuQyxXQUNqQndDLEVBQVlMLEdBQ0xBLEdBRVRELFlBakJZLFNBaUJBN0IsR0FHVixPQUZBOEIsRUFBTyxFQUFILEdBQU9BLEVBQVAsQ0FBYTlCLFlBQ2pCbUMsRUFBWUwsR0FDTEEsR0FFVFcsbUJBdEJZLFNBc0JPQyxHQUFPLDJCQUN4QixnQkFBZ0JBLEtBQWhCLDBCQUF1QixLQUFmQyxFQUFlLGVBQ2RiLEVBQUthLElBRlUsa0ZBS3hCLE9BREFSLEVBQVlMLEdBQ0xBLElBSUl0QyxRIiwiZmlsZSI6InNjcmlwdC9zdGVwMy4xMTFhMTcxYi5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBcIi4uL3Njc3Mvc3RlcDMuc2Nzc1wiO1xuaW1wb3J0IFwiTW9kdWxlcy9AZm9ydGF3ZXNvbWUvZm9udGF3ZXNvbWUtZnJlZS9zY3NzL2ZvbnRhd2Vzb21lLnNjc3NcIjtcbmltcG9ydCBcIk1vZHVsZXMvQGZvcnRhd2Vzb21lL2ZvbnRhd2Vzb21lLWZyZWUvc2Nzcy9zb2xpZC5zY3NzXCI7XG5pbXBvcnQgc3RvcmUgZnJvbSAnLi9TdG9yZSc7XG5cbmNvbnN0IHtkZXNpZ24sIGNvbG9yc30gPSBzdG9yZS5nZXREYXRhKFtgZGVzaWduYCwgYGNvbG9yc2BdKTtcbmNvbnN0IHByZXZTdGVwQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgLnByZXYtc3RlcGApO1xuY29uc3QgbmV4dFN0ZXBCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAubmV4dC1zdGVwYCk7XG5cbmNvbnN0IE1lc3NhZ2VWaWV3ID0gKGVsKSA9PiB7XG4gIGlmKCFlbCkgdGhyb3cgbmV3IEVycm9yKGBNZXNzYWdlVmlldydzIFJvb3RFbGVtZW50IGlzIG5vdCBkZWZpbmVkYCk7XG4gIGNvbnN0IGJnSW1nID0gZWwucXVlcnlTZWxlY3RvcignLmNhbnZhc19fbGF5ZXItLWNvbG9yLWJnJyk7XG4gIGNvbnN0IGdyb3VwQUltZyA9IGVsLnF1ZXJ5U2VsZWN0b3IoJy5jYW52YXNfX2xheWVyLS1jb2xvci1ncm91cGEnKTtcbiAgY29uc3QgZ3JvdXBCSW1nID0gZWwucXVlcnlTZWxlY3RvcignLmNhbnZhc19fbGF5ZXItLWNvbG9yLWdyb3VwYicpO1xuICBjb25zdCBncm91cENJbWcgPSBlbC5xdWVyeVNlbGVjdG9yKCcuY2FudmFzX19sYXllci0tY29sb3ItZ3JvdXBjJyk7XG4gIGNvbnN0IHNrZXRjaExheWVyID0gZWwucXVlcnlTZWxlY3RvcignLmNhbnZhc19fbGF5ZXItLXNrZXRjaCcpO1xuICBjb25zdCBtc2dUbyA9IGVsLnF1ZXJ5U2VsZWN0b3IoJy5tZXNzYWdlX190bycpO1xuICBjb25zdCBtc2dCb2R5ID0gZWwucXVlcnlTZWxlY3RvcignLm1lc3NhZ2VfX2JvZHknKTtcblxuICBjb25zdCBsb2FkTGF5ZXJzID0gKHtkZXNpZ24sIGNvbG9yc30pID0+IHtcbiAgICBza2V0Y2hMYXllci5zcmM9IGBpbWFnZXMvY3Qke2Rlc2lnbiArIDF9X2JnXzAuc3ZnYDtcbiAgICBpZihjb2xvcnMpe1xuICAgICAgYmdJbWcuc3JjID0gYGltYWdlcy9jdCR7ZGVzaWduICsgMX1fYmdfJHtjb2xvcnMuYmd9LnN2Z2A7XG4gICAgICBncm91cEFJbWcuc3JjID0gYGltYWdlcy9jdCR7ZGVzaWduICsgMX1fMV8ke2NvbG9ycy5ncm91cGF9LnN2Z2A7XG4gICAgICBncm91cEJJbWcuc3JjID0gYGltYWdlcy9jdCR7ZGVzaWduICsgMX1fMl8ke2NvbG9ycy5ncm91cGJ9LnN2Z2A7XG4gICAgICBncm91cENJbWcuc3JjID0gYGltYWdlcy9jdCR7ZGVzaWduICsgMX1fM18ke2NvbG9ycy5ncm91cGN9LnN2Z2A7XG4gICAgfVxuICB9XG5cblxuICByZXR1cm4ge1xuICAgIGluaXQoe2Rlc2lnbiwgY29sb3JzfSkge1xuICAgICAgbG9hZExheWVycyh7ZGVzaWduLCBjb2xvcnN9KTtcbiAgICB9LFxuICAgIGdldE1lc3NhZ2UoKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICB0bzogbXNnVG8udmFsdWUudHJpbSgpLFxuICAgICAgICBib2R5OiBtc2dCb2R5LnZhbHVlLnRyaW0oKSxcbiAgICAgIH1cbiAgICB9LFxuICAgIHZhbGlkYXRlKCkge1xuICAgICAgcmV0dXJuICEhKG1zZ1RvLnZhbHVlLnRyaW0oKSAmJiBtc2dCb2R5LnZhbHVlLnRyaW0oKSk7XG4gICAgfVxuICB9XG59O1xuXG5jb25zdCBtZXNzYWdlID0gTWVzc2FnZVZpZXcoZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgLm1lc3NhZ2VgKSk7XG5tZXNzYWdlLmluaXQoe2Rlc2lnbiwgY29sb3JzfSk7XG5wcmV2U3RlcEJ0bi5hZGRFdmVudExpc3RlbmVyKGBjbGlja2AsIGV2ZW50ID0+IHtcbiAgaWYoZGVzaWduID4gMSkge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgbG9jYXRpb24uaHJlZiA9IGBzdGVwMS5odG1sYDtcbiAgfVxufSwgZmFsc2UpO1xubmV4dFN0ZXBCdG4uYWRkRXZlbnRMaXN0ZW5lcihgY2xpY2tgLCBldmVudCA9PiB7XG4gIGlmKCFtZXNzYWdlLnZhbGlkYXRlKCkpIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGFsZXJ0KGDrqZTshLjsp4Drpbwg7J6F66Cl7ZW07KO87IS47JqUYCk7XG4gICAgcmV0dXJuO1xuICB9XG4gIHN0b3JlLnNldE1lc3NzYWdlKG1lc3NhZ2UuZ2V0TWVzc2FnZSgpKTtcbn0sIGZhbHNlKTsiLCJsZXQgZGF0YSA9IEpTT04ucGFyc2Uoc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbShgY3VzdG9tZWQtb3Jlb2ApKSB8fCB7fTtcblxuY29uc3QgdXBkYXRlU3RvcmUgPSBkYXRhID0+IHtcbiAgc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbShgY3VzdG9tZWQtb3Jlb2AsIEpTT04uc3RyaW5naWZ5KGRhdGEpKTtcbn1cblxuY29uc3Qgc3RvcmUgPSB7XG4gIGNsZWFyKCkge1xuICAgIHNlc3Npb25TdG9yYWdlLnJlbW92ZUl0ZW0oYGN1c3RvbWVkLW9yZW9gKTtcbiAgfSxcbiAgZ2V0RGF0YSgpIHtcbiAgICByZXR1cm4gZGF0YTtcbiAgfSxcbiAgc2V0U2VsZWN0ZWREZXNpZ24oZGVzaWduKSB7XG4gICAgZGF0YSA9IHsuLi5kYXRhLCBkZXNpZ259O1xuICAgIHVwZGF0ZVN0b3JlKGRhdGEpO1xuICAgIHJldHVybiBkYXRhO1xuICB9LFxuICBzZXRTZWxlY3RlZENvbG9yKGNvbG9ycykge1xuICAgIGRhdGEgPSB7Li4uZGF0YSwgY29sb3JzfTtcbiAgICB1cGRhdGVTdG9yZShkYXRhKTtcbiAgICByZXR1cm4gZGF0YTtcbiAgfSxcbiAgc2V0TWVzc3NhZ2UobWVzc2FnZSkge1xuICAgIGRhdGEgPSB7Li4uZGF0YSwgbWVzc2FnZX07XG4gICAgdXBkYXRlU3RvcmUoZGF0YSk7XG4gICAgcmV0dXJuIGRhdGE7XG4gIH0sXG4gIHJlc2V0U2VsZWN0ZWRJdGVtcyhpdGVtcykge1xuICAgIGZvcihsZXQgaXRlbSBvZiBpdGVtcykge1xuICAgICAgZGVsZXRlIGRhdGFbaXRlbV07XG4gICAgfVxuICAgIHVwZGF0ZVN0b3JlKGRhdGEpO1xuICAgIHJldHVybiBkYXRhO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IHN0b3JlOyJdLCJzb3VyY2VSb290IjoiIn0=