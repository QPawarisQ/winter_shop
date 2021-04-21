<template>
	<div style="margin-top: 6rem">
		<div class="container">
			<div class="row justify-content-center">
				<div class="col-lg-5">
					<img :src="'https://winterserver.herokuapp.com/product_picture/'+all_products[0].product_picture" style="width: 100%;">
				</div>
				<div class="col-lg-1"></div>
				<div class="col-lg-4 my-auto">
					<div class="img-category">{{ all_products[0].category_name }}</div>
					<div class="img-title">{{ all_products[0].product_name }}</div>
					<div class="img-price">$ {{ all_products[0].product_price }}</div>
					<hr>
					<br>
					<div class="detail">Detail</div>
					<div class="detail_desc">{{ all_products[0].product_detail }}</div><br>
					<button v-if='email != "undefined"' class="btn btn-dark btn-block" style="border-radius: 0px;font-size: 1.5rem;font-weight: bold;" @click="addCart(all_products[0].product_id)">
						Add to Cart
					</button>
					<button v-if='email == "undefined"' class="btn btn-danger btn-block" style="border-radius: 0px;font-size: 1.5rem;font-weight: bold;" disabled="">
						Please Login
					</button>
				</div>
				<div class="col-lg-2"></div>
			</div>
		</div>
	</div>
</template>
<script>
import axios from 'axios'
export default{
	props: ["productId"],
	data(){
		return{
			all_products: [],
			email: "",
			firstname: "",
			lastname: ""
		}
	},
	methods: {
		addCart(product_id){
			axios.post('https://winterserver.herokuapp.com/api/cart/add',{
				product_id: this.productId,
				user_id: localStorage.getItem("user_id")
			})
			.then((response)=>{
				if(response.data == "SUCCESS|ADDED"){
					this.toast()
				}
			})
		},
		getInfo(){
			this.all_products.length = 0
			axios.post('https://winterserver.herokuapp.com/api/product/id',{
				product_id: this.productId
			})
			.then((response)=>{
				if(response.data != "ERROR|NOTFOUND"){
					for (var i = 0; i < response.data.length; i++) {
						this.all_products.push({
							product_id: response.data[i].product_id,
							product_name: response.data[i].product_name,
							product_detail: response.data[i].product_detail,
							product_price: response.data[i].product_price,
							product_picture: response.data[i].product_picture,
							category_name: response.data[i].cat_name,
						})
					}
				}
			})
		},
		toast(toaster, append = true) {
			this.$bvToast.toast(`Product added to cart`, {
			  title: `Success`,
			  toaster: "b-toaster-bottom-right",
			  solid: true,
			  appendToast: append,
			  variant: "success"
			})
		},
		getUserInfo(){
			if (localStorage.getItem('user_id') !== null) {
				axios.post('https://winterserver.herokuapp.com/api/user/id',{
					user_id: localStorage.getItem('user_id')
				})
				.then((response)=>{
					if(response.data != "SUCCESS|NOTFOUND"){
						for (var i = 0; i < response.data.length; i++) {
							this.email = response.data[i].email
							this.firstname = response.data[i].firstname
							this.lastname = response.data[i].lastname
						}
					}
				})			
			}else{
				this.email = "undefined"
				this.firstname = "undefined"
				this.lastname = "undefined"
			}
		},
	},
	mounted(){
		this.getInfo()
		this.getUserInfo()
	}
};
</script>
<style scoped>
	.img-category{
		margin-top: 0.5rem;
		color: #555;
		font-size: 1.3rem
	}
	.img-title{
		color: #000;
		font-size: 3rem;
		font-weight: bold;
	}
	.img-price{
		color: red;
		font-size: 2rem;
		font-weight: bold;
	}
	.detail{
		font-size: 2.3rem;
		font-weight: bold;
	}
	.detail_desc{
		font-size: 1.5rem;
		font-weight: normal;
		color: #555;
	}
</style>