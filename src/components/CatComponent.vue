<template>
	<div>
		<section id="shop">
			<div class="top-bar">
				<div class="container">
					<div class="row justify-content-center">
						<div class="col-lg-4 text-center">
							<h3 class="text-white">{{ all_products[0].category_name }}</h3>
						</div>
					</div>
				</div>
			</div>
			<div class="container" style="margin-top: 2rem">
				<div class="row">
					<div class="col-lg-3 col-4" v-for="(product, index) in all_products" @click="productInfo(product.product_id)">
						<img :src="'https://winterserver.herokuapp.com/product_picture/'+product.product_picture" style="width: 100%;">
						<div class="img-category">{{ product.category_name }}</div>
						<div class="img-title">{{ product.product_name }}</div>
						<div class="img-price">$ {{ product.product_price }}</div>
					</div>
				</div>
			</div>
		</section>
	</div>
</template>
<script>
	import axios from 'axios'
	export default{
		props: ["catId"],
		data(){
			return{
				all_products: []
			}
		},
		methods: {
			productInfo(product_id){
				this.$router.push({ name: 'product', params: { productId: product_id }})
			},
			getInfo(){
				this.all_products.length = 0
				axios.post('https://winterserver.herokuapp.com/api/product/cat',{
					cat_id: this.catId
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
			}
		},
		mounted(){
			this.getInfo()
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