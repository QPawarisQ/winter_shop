<template>
	<div>
		<section id="category">
			<div class="top-bar">
				<div class="padding-bottom">
					<div class="row justify-content-center">
						<div class="col-lg-12">
							<center>
								<div class="separator">
									<span style="font-size: 1.3rem;color: white;font-weight: bold">Category</span>
								</div>
							</center>
						</div>
					</div>
				</div>
				<div class="red-bar"></div>
			</div>
			<div class="container stock-show">
				<div class="row">
					<div class="col-lg-4 col-6" v-for="(cat, index) in all_cats" @click="catInfo(cat.category_id)" style="cursor: pointer;">
						<img :src="'https://winterserver.herokuapp.com/product_picture/'+cat.category_picture" style="width: 100%;max-height: 460px;">
						<div class="img-title">{{ cat.category_name }}</div>
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
				all_cats: []
			}
		},
		methods: {
			catInfo(cat_id){
				this.$router.push({ name: 'cat', params: { catId: cat_id }})
			},
			getInfo(){
				this.all_cats.length = 0
				axios.get('https://winterserver.herokuapp.com/api/cat/all')
				.then((response)=>{
					if(response.data != "ERROR|EMPTY"){
						for (var i = 0; i < response.data.length; i++) {
							this.all_cats.push({
								category_id: response.data[i].cat_id,
								category_name: response.data[i].cat_name,
								category_picture: response.data[i].cat_picture,
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
	#category{
		background-color: white;
		min-height: 100vh;
	}
	.top-bar{
		background-color: #000;
		padding-top: 1rem;
		padding-bottom: 1rem;
	}
	.red-bar{
		background-color: #A91126;
		padding-top: 0.8rem;
		padding-bottom: 0.8rem;
		width: 100%;
	}
	.padding-bottom{
		padding-bottom: 10rem;
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
		text-align: center;
		margin-top: 5px;
	}
	.img-price{
		color: red;
		font-size: 1.1rem;
		font-weight: bold;
	}
	.separator {
	    display: flex;
	    align-items: center;
	    text-align: center;
	    border-color: white;
	}
	.separator::before, .separator::after {
	    content: '';
	    flex: 1;
	    border-bottom: 1px solid #000;
	    border-color: white;
	}
	.separator::before {
	    margin-right: .25em;
	}
	.separator::after {
	    margin-left: .25em;
	}
	.stock-show{
		margin-top: -11rem;
	}
</style>