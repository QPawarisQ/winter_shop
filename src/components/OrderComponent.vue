<template>
	<div style="margin-top: 6rem">
		<h1 class="text-center title">{{ title }}</h1>
		<div class="container">
			<div class="row">
				<div class="col-3">
					<br>
					<br>
					<br>
					<a href="javascript:void(0)" class="menu-font" @click="orderPage()" style="color: red">ORDERS</a>
					<br>
					<a href="javascript:void(0)" class="menu-font" @click="accountPage()">ACCOUNT</a>
					<br>
					<br>
					<br>
					<br>
					<br>
					<br>
					<a href="javascript:void(0)" class="menu-font" @click="logout()">LOGOUT</a>
				</div>
				<div class="col-9">
					<div class="row text-center">
						<div class="col-4">
							<a href="javascript:void(0)" class="menu-font" @click="unpaidPage()">UNPAID</a>
						</div>
						<div class="col-4">
							<a href="javascript:void(0)" class="menu-font" @click="progressPage()">IN PROGRESS</a>
						</div>
						<div class="col-4">
							<a href="javascript:void(0)" class="menu-font" @click="donePage()">DONE</a>
						</div>
						<div class="col-12"><hr></div>
					</div>
					<div class="row">
						<div class="col-12" v-if="page == 'unpaid'">
							<br>
							<h3>Unpaid Order</h3><br>
							<div class="card">
								<div class="card-body">
								
									<div v-for="group, groupName in groups">
	 									<b>Order Number, {{groupName}}</b>
										<b-button v-b-toggle="groupName" variant="dark" style="float: right">Open Details</b-button>
										<b-collapse :id="groupName" class="mt-2">
											<br>
											<h3>Order Detail</h3>
											<table class="table">
												<thead>
													<th>Picture</th>
													<th>Product Name</th>
													<th>Category</th>
													<th>Price</th>
													<th>Quantity</th>
												</thead>
												<tbody>
													<tr v-for="item in group">
														<td>
															<img :src="'https://winterserver.herokuapp.com/product_picture/'+item.product_picture" style="width: 100%;max-width: 50px;">
														</td>
														<td>{{item.product_name}}</td>
														<td>{{item.category_name}}</td>
														<td>{{item.product_price}}</td>
														<td>{{item.quantity}}</td>
													</tr>
												</tbody>
											</table>
											<b-button @click="checkOut(groupName)" variant="success" style="float: right">Check Out</b-button>
										</b-collapse>
										<br>
										<br>
									</div>
								</div>
							</div>
						</div>
						<div class="col-12" v-if="page == 'progress'">
							<br>
							<h3>In Progress</h3><br>
							<div class="card">
								<div class="card-body">
									<div v-for="group, groupName in pgroups">
	 									<b>Order Number, {{groupName}}</b>
										<b-button v-b-toggle="groupName" variant="dark" style="float: right">Open Details</b-button>
										<b-collapse :id="groupName" class="mt-2">
											<br>
											<h3>Shipping Detail</h3>
											<br>
											<div class="row text-center">
												<div class="col-3" style="color: green">Preparing</div>
												<div class="col-3">Out for delivery</div>
												<div class="col-3">On the way</div>
												<div class="col-3">Delivered</div>
											</div>
											<br>
											<br>
											<br>
											<h3>Order Detail</h3>
											<table class="table">
												<thead>
													<th>Picture</th>
													<th>Product Name</th>
													<th>Category</th>
													<th>Price</th>
													<th>Quantity</th>
												</thead>
												<tbody>
													<tr v-for="item in group">
														<td>
															<img :src="'https://winterserver.herokuapp.com/product_picture/'+item.product_picture" style="width: 100%;max-width: 50px;">
														</td>
														<td>{{item.product_name}}</td>
														<td>{{item.category_name}}</td>
														<td>{{item.product_price}}</td>
														<td>{{item.quantity}}</td>
													</tr>
												</tbody>
											</table>
										</b-collapse>
										<br>
										<br>
									</div>
								</div>
							</div>
						</div>
						<div class="col-12" v-if="page == 'done'">
							<br>
							<h3>Done</h3><br>
							
						</div>
						<div class="col-12" v-if="page == 'cancel'">
							<br>
							<h3>Canceled</h3><br>
							
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	function groupBy(array, key){
	  const result = {}
	  array.forEach(item => {
	    if (!result[item[key]]){
	      result[item[key]] = []
	    }
	    result[item[key]].push(item)
	  })
	  return result
	}
	import axios from 'axios'
	export default{
		data(){
			return{
				title: "My Orders",
				email: "",
				firstname: "",
				lastname: "",
				page: "unpaid",
				all_products: [],
				all_progress: [],
			}
		},
		methods: {
			unpaidPage() {
				this.page = "unpaid"
			},
			progressPage() {
				this.page = "progress"
				this.getProgressInfo()
			},
			donePage() {
				this.page = "done"
			},
			cancelPage() {
				this.page = "cancel"
			},
			accountPage() {
        		this.$router.push('account')
			},
			getInfo(){
				this.all_products.length = 0
				this.all_products = []
				axios.post('https://winterserver.herokuapp.com/api/order/all',{
					user_id: localStorage.getItem("user_id")
				})
				.then((response)=>{
					if(response.data != "ERROR|EMPTY"){
						for (var i = 0; i < response.data.length; i++) {
							this.all_products.push({
								order_id: response.data[i].order_id,
								order_key: response.data[i].order_key,
								product_id: response.data[i].product_id,
								product_name: response.data[i].product_name,
								product_detail: response.data[i].product_detail,
								product_price: response.data[i].product_price,
								product_picture: response.data[i].product_picture,
								quantity: response.data[i].quantity,
								category_name: response.data[i].cat_name,
							})
						}
					}
				})
			},
			getProgressInfo(){
				this.all_progress.length = 0
				axios.post('https://winterserver.herokuapp.com/api/order/progress',{
					user_id: localStorage.getItem("user_id")
				})
				.then((response)=>{
					if(response.data != "ERROR|EMPTY"){
						for (var i = 0; i < response.data.length; i++) {
							this.all_progress.push({
								order_id: response.data[i].order_id,
								order_key: response.data[i].order_key,
								product_id: response.data[i].product_id,
								product_name: response.data[i].product_name,
								product_detail: response.data[i].product_detail,
								product_price: response.data[i].product_price,
								product_picture: response.data[i].product_picture,
								quantity: response.data[i].quantity,
								category_name: response.data[i].cat_name,
							})
						}
					}
				})
			},
			toast(toaster, append = true) {
				this.$bvToast.toast(`Checkout this order`, {
				  title: `Success`,
				  toaster: "b-toaster-bottom-right",
				  solid: true,
				  appendToast: append,
				  variant: "success"
				})
			},
			checkOut(order_key){
				axios.post('https://winterserver.herokuapp.com/api/order/pay',{
					order_key: order_key
				})
				.then((response)=>{
					if(response.data == "SUCCESS|PAID"){
						this.getInfo()
						this.toast()
					}
				})
			},
			logout(){
				localStorage.removeItem('user_id');
				localStorage.removeItem('email');
				localStorage.removeItem('role');
				return window.location.href = ""
			}
		},
		computed:{
		  groups(){
		    return groupBy(this.all_products, 'order_key')
		  },
		  pgroups(){
		    return groupBy(this.all_progress, 'order_key')
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
	.menu-font{
		font-size: 1.2rem;
		color: #000;
		text-decoration: none;
	}
</style>