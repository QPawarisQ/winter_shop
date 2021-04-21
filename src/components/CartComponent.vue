<template>
	<div style="margin-top: 4rem">
		<h1 class="text-center title">{{ title }}</h1>
		<div class="container">
			<div class="row">
				<div class="col-lg-3 col-4" v-for="(product, index) in all_products">
					<img :src="'https://winterserver.herokuapp.com/product_picture/'+product.product_picture" style="width: 100%;">
					<div class="img-category">{{ product.category_name }} <a href="javascript:void(0)" style="text-decoration: none;color: red;float: right" @click="removeCart(product.product_id)">(Remove)</a></div>
					<div class="img-title">{{ product.product_name }}</div>
					<div class="img-price">$ {{ product.product_price }}</div>
					<div class="img-ea">x{{ product.product_quantity }} ea (Total ${{ product.product_price*product.product_quantity }})</div>
				</div>
				<div class="col-lg-12">
					<br>
					<br>
					<br>
					<h1 class="checkout" v-if="this.all_products.length != 0">Total ${{ this.total }} <a @click="checkOut()" href="javascript:void(0)" class="btn btn-success" style="font-weight: bold;font-size: 2rem;float: right">Check Out</a></h1>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import axios from 'axios'
	function makeid(length) {
	   var result           = '';
	   var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
	   var charactersLength = characters.length;
	   for ( var i = 0; i < length; i++ ) {
	      result += characters.charAt(Math.floor(Math.random() * charactersLength));
	   }
	   return result;
	}
	export default{
		data(){
			return{
				title: "My Cart",
				all_products: [],
				total: 0,
				order_key: ""
			}
		},
		methods: {
			getInfo(){
				this.total = 0
				this.all_products.length = 0
				axios.post('https://winterserver.herokuapp.com/api/cart/all',{
					user_id: localStorage.getItem('user_id')
				})
				.then((response)=>{
					if(response.data != "ERROR|EMPTY"){
						for (var i = 0; i < response.data.length; i++) {
							this.all_products.push({
								product_id: response.data[i].product_id,
								product_name: response.data[i].product_name,
								product_detail: response.data[i].product_detail,
								product_quantity: response.data[i].quantity,
								product_price: response.data[i].product_price,
								product_picture: response.data[i].product_picture,
								category_name: response.data[i].cat_name,
							})
							this.total = this.total + (response.data[i].product_price*response.data[i].quantity)
						}
					}
				})
			},
			removeCart(product_id){
				axios.post('https://winterserver.herokuapp.com/api/cart/remove', {
					user_id: localStorage.getItem('user_id'),
					product_id: product_id
				}).then((response)=>{
					if(response.data == "SUCCESS|REMOVED"){
						this.toast()
						this.getInfo()
					}
				})
			},
			checkOut(){
				this.order_key = makeid(15)
				axios.post('https://winterserver.herokuapp.com/api/order/checkout',{
					user_id: localStorage.getItem('user_id'),
					order_key: this.order_key
				})
				.then((response)=>{
					if(response.data == "SUCCESS|ORDERED"){
						this.checkouttoast()
						this.getInfo()
					}
				})
			},
			toast(toaster, append = true) {
				this.$bvToast.toast(`Product removed from cart`, {
				  title: `Success`,
				  toaster: "b-toaster-bottom-right",
				  solid: true,
				  appendToast: append,
				  variant: "success"
				})
			},
			checkouttoast(toaster, append = true) {
				this.$bvToast.toast(`Checked Out, Check in order page`, {
				  title: `Success`,
				  toaster: "b-toaster-bottom-right",
				  solid: true,
				  appendToast: append,
				  variant: "success"
				})
			}
		},
		mounted(){
			this.getInfo()
		}
	};
</script>
<style scoped>
	.title{
		font-size: 6rem;
		font-weight: bold;
	}
	.checkout{
		font-size: 3rem;
		font-weight: bold;
	}
	.img-category{
		margin-top: 0.5rem;
		color: #555;
		font-size: 0.9rem
	}
	.img-title{
		color: #000;
		font-size: 1.1rem;
		font-weight: bold;
	}
	.img-price{
		color: red;
		font-size: 1.1rem;
		font-weight: bold;
	}
	.img-ea{
		font-size: 0.9rem;
	}
</style>