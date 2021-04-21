<template>
	<div style="margin-top: 6rem">
		<h1 class="text-center title">{{ title }}</h1>
		<div class="container">
			<div class="row">
				<div class="col-3">
					<br>
					<br>
					<br>
					<a href="javascript:void(0)" class="menu-font" @click="orderPage()">ORDERS</a>
					<br>
					<a href="javascript:void(0)" class="menu-font" style="color: red">ACCOUNT</a>
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
						<div class="col-6">
							<a href="javascript:void(0)" class="menu-font" @click="profilePage()">MY PROFILE</a>
						</div>
						<div class="col-6">
							<a href="javascript:void(0)" class="menu-font" @click="addressPage()">MY ADDRESS</a>
						</div>
						<div class="col-12"><hr></div>
					</div>
					<div class="row">
						<div class="col-12" v-if="page == 'profile'">
							<br>
							<h3>My Profile</h3><br>
							<form action="javascript:void(0)" @submit="manageInfo()">
							  <div class="form-group">
							    <label for="inputEmail">Email address</label>
							    <input type="email" class="form-control" id="inputEmail" placeholder="Enter email" v-model="email">
							  </div>
							  <div class="form-group">
							    <label for="inputFirstname">First name</label>
							    <input type="text" class="form-control" id="inputFirstname" placeholder="Enter First name" v-model="firstname">
							  </div>
							  <div class="form-group">
							    <label for="inputLastname">Last name</label>
							    <input type="text" class="form-control" id="inputLastname" placeholder="Enter Last name" v-model="lastname">
							  </div>
							  <hr>
							  <button type="submit" class="btn btn-primary btn-block">Submit</button>
							</form>
						</div>
						<div class="col-12" v-if="page == 'address'">
							<br>
							<h3>My Address</h3><br>
							<form action="javascript:void(0)" @submit="addressSubmit()">
							  <div class="form-group">
							    <label for="address">Address Info</label>
							    <textarea type="text" class="form-control" id="address" placeholder="Enter Address..." v-model="address"></textarea>
							  </div>
							  <hr>
							  <button type="submit" class="btn btn-primary btn-block">Submit</button>
							</form>
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
				title: "My Account",
				email: "",
				firstname: "",
				lastname: "",
				address: "",
				page: "profile"
			}
		},
		methods: {
			profilePage() {
				this.page = "profile"
			},
			addressPage() {
				this.page = "address"
			},
			orderPage() {
        		this.$router.push('order')
			},
			logout(){
				localStorage.removeItem('user_id');
				localStorage.removeItem('email');
				localStorage.removeItem('role');
				return window.location.href = ""
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
			manageInfo(){
				axios.post('https://winterserver.herokuapp.com/api/user/update',{
					user_id: localStorage.getItem('user_id'),
					email: this.email,
					firstname: this.firstname,
					lastname: this.lastname
				})
				.then((response)=>{
					if(response.data == "SUCCESS|UPDATED"){
						this.updateToast()
						this.getInfo()
					}
				})
			},
			updateToast(toaster, append = true) {
				this.$bvToast.toast(`Information Updated`, {
				  title: `Success`,
				  toaster: "b-toaster-bottom-right",
				  solid: true,
				  appendToast: append,
				  variant: "success"
				})
			},
			addressSubmit(){
				this.updateToast()
			}
		},
		mounted(){
			this.getUserInfo()
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