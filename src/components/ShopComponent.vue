<template>
	<div>
		<section id="shop">
			<div class="top-bar">
				<div class="container">
					<div class="row justify-content-center">
						<div class="col-lg-4">
							<form action="javascript:void(0)" @submit="search()">
								<div class="input-group">
									<input class="form-control" placeholder="Search Items..." type="text" style="border-radius: 0px;" v-model="search_key">
									<div class="input-group-prepend">
										<button type="submit" class="input-group-text">Search</button>
									</div>							  
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
			<ol class="breadcrumb justify-content-center" style="background-color: white;margin-bottom: 2rem;margin-top: 2rem;font-size: 1.3rem">
			    <li class="breadcrumb-item"><a href="#" class="link">MOST POPULAR</a></li>
			    <li class="breadcrumb-item"><a href="#" class="link">SALE ITEM</a></li>
			    <li class="breadcrumb-item active" aria-current="page">NEW ARRIVE</li>
			</ol>
			<div class="container">
				<div class="row">
					<div class="col-lg-3 col-4" v-for="(product, index) in all_products" style="cursor: pointer;">
						<a href="javascript:void(0)" @click="productInfo(product.product_id)">
							<img :src="'https://winterserver.herokuapp.com/product_picture/'+product.product_picture" style="width: 100%;">
							<div class="img-category">{{ product.category_name }}</div>
							<div class="img-title">{{ product.product_name }}</div>
							<div class="img-price">$ {{ product.product_price }}</div>
						</a>
					</div>
				</div>
			</div>
		</section>
	</div>
</template>
<script>
	import axios from 'axios'
	export default{
		data(){
			return{
				all_products: [],
				search_key: "",
				email: "",
				firstname: "",
				lastname: ""
			}
		},
		methods: {
			productInfo(product_id){
				this.$router.push({ name: 'product', params: { productId: product_id }})
			},
			getInfo(){
				this.all_products.length = 0
				axios.get('https://winterserver.herokuapp.com/api/product/all')
				.then((response)=>{
					if(response.data != "ERROR|EMPTY"){
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
			getUserInfo(){
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
			},
			search(){
				if(this.search_key == ""){
					this.getInfo()
				}else{
					this.all_products.length = 0
					axios.post('https://winterserver.herokuapp.com/api/product/search',{
						search_key: this.search_key
					})
					.then((response)=>{
						if(response.data != "ERROR|EMPTY"){
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
						}else{
							this.getInfo()
						}
					})
				}
			}
		},
		mounted(){
			this.getInfo()
			this.getUserInfo()
		}
	};
</script>
<style scoped>
	#shop{
		background-color: white;
		min-height: 100vh;
		padding-bottom: 2rem;
	}
	.top-bar{
		background-color: #000;
		padding-top: 1rem;
		padding-bottom: 1rem;
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
	.link{
		color: #000;
		text-decoration: none;
	}
</style>