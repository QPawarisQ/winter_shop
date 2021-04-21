<template>
	<div style="margin-top: 6rem;">
		<div class="container">
			<div class="row">
				<div class="col-lg-12">
					<div class="card">
						<div class="card-header">
							<b>DASHBOARD</b>
						</div>
						<div class="card-body">
							<div class="row">
								<div class="col-6">
									<div class="card text-center">
										<div class="card-header bg-info text-white" style="font-weight: bold;font-size: 20px;">
											Categories Amount
										</div>
										<div class="card-body" style="font-size: 20px;">
											{{ all_cats.length }} Categories
										</div>
									</div>
								</div>
								<div class="col-6">
									<div class="card text-center">
										<div class="card-header bg-info text-white" style="font-weight: bold;font-size: 20px;">
											Products Amount
										</div>
										<div class="card-body" style="font-size: 20px;">
											{{ all_products.length }} Products
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import axios from 'axios'
	export default{
		data(){
			return{
				all_products: [],
				all_cats: []
			}
		},
		methods:{
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
								category_id: response.data[i].category_id,
							})
						}
					}
				})
			},
			getCatInfo(){
				this.all_cats.length = 0
				axios.get('https://winterserver.herokuapp.com/api/cat/all')
				.then((response)=>{
					if(response.data != "ERROR|EMPTY"){
						for (var i = 0; i < response.data.length; i++) {
							this.all_cats.push({
								cat_id: response.data[i].cat_id,
								cat_name: response.data[i].cat_name
							})
						}
					}
				})
			},
		},
		mounted(){
			this.getInfo()
			this.getCatInfo()
		}
	};
</script>