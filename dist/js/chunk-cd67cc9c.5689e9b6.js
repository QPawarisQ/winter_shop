(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-cd67cc9c"],{"5b60":function(t,a,e){},"6b95":function(t,a,e){"use strict";e("5b60")},b789:function(t,a,e){"use strict";e.r(a);var r=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",[e("cart-component")],1)},o=[],c=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticStyle:{"margin-top":"4rem"}},[e("h1",{staticClass:"text-center title"},[t._v(t._s(t.title))]),e("div",{staticClass:"container"},[e("div",{staticClass:"row"},[t._l(t.all_products,(function(a,r){return e("div",{staticClass:"col-lg-3 col-4"},[e("img",{staticStyle:{width:"100%"},attrs:{src:"https://winterserver.herokuapp.com/product_picture/"+a.product_picture}}),e("div",{staticClass:"img-category"},[t._v(t._s(a.category_name)+" "),e("a",{staticStyle:{"text-decoration":"none",color:"red",float:"right"},attrs:{href:"javascript:void(0)"},on:{click:function(e){return t.removeCart(a.product_id)}}},[t._v("(Remove)")])]),e("div",{staticClass:"img-title"},[t._v(t._s(a.product_name))]),e("div",{staticClass:"img-price"},[t._v("$ "+t._s(a.product_price))]),e("div",{staticClass:"img-ea"},[t._v("x"+t._s(a.product_quantity)+" ea (Total $"+t._s(a.product_price*a.product_quantity)+")")])])})),e("div",{staticClass:"col-lg-12"},[e("br"),e("br"),e("br"),0!=this.all_products.length?e("h1",{staticClass:"checkout"},[t._v("Total $"+t._s(this.total)+" "),e("a",{staticClass:"btn btn-success",staticStyle:{"font-weight":"bold","font-size":"2rem",float:"right"},attrs:{href:"javascript:void(0)"},on:{click:function(a){return t.checkOut()}}},[t._v("Check Out")])]):t._e()])],2)])])},i=[],s=e("bc3a"),n=e.n(s);function u(t){for(var a="",e="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",r=e.length,o=0;o<t;o++)a+=e.charAt(Math.floor(Math.random()*r));return a}var d={data:function(){return{title:"My Cart",all_products:[],total:0,order_key:""}},methods:{getInfo:function(){var t=this;this.total=0,this.all_products.length=0,n.a.post("https://winterserver.herokuapp.com/api/cart/all",{user_id:localStorage.getItem("user_id")}).then((function(a){if("ERROR|EMPTY"!=a.data)for(var e=0;e<a.data.length;e++)t.all_products.push({product_id:a.data[e].product_id,product_name:a.data[e].product_name,product_detail:a.data[e].product_detail,product_quantity:a.data[e].quantity,product_price:a.data[e].product_price,product_picture:a.data[e].product_picture,category_name:a.data[e].cat_name}),t.total=t.total+a.data[e].product_price*a.data[e].quantity}))},removeCart:function(t){var a=this;n.a.post("https://winterserver.herokuapp.com/api/cart/remove",{user_id:localStorage.getItem("user_id"),product_id:t}).then((function(t){"SUCCESS|REMOVED"==t.data&&(a.toast(),a.getInfo())}))},checkOut:function(){var t=this;this.order_key=u(15),n.a.post("https://winterserver.herokuapp.com/api/order/checkout",{user_id:localStorage.getItem("user_id"),order_key:this.order_key}).then((function(a){"SUCCESS|ORDERED"==a.data&&(t.checkouttoast(),t.getInfo())}))},toast:function(t){var a=!(arguments.length>1&&void 0!==arguments[1])||arguments[1];this.$bvToast.toast("Product removed from cart",{title:"Success",toaster:"b-toaster-bottom-right",solid:!0,appendToast:a,variant:"success"})},checkouttoast:function(t){var a=!(arguments.length>1&&void 0!==arguments[1])||arguments[1];this.$bvToast.toast("Checked Out, Check in order page",{title:"Success",toaster:"b-toaster-bottom-right",solid:!0,appendToast:a,variant:"success"})}},mounted:function(){this.getInfo()}},l=d,p=(e("6b95"),e("2877")),_=Object(p["a"])(l,c,i,!1,null,"470cbc44",null),h=_.exports,v={components:{"cart-component":h}},f=v,m=Object(p["a"])(f,r,o,!1,null,null,null);a["default"]=m.exports}}]);
//# sourceMappingURL=chunk-cd67cc9c.5689e9b6.js.map