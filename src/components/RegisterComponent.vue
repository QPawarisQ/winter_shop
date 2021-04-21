<template>
	<div>
		<section id="register">
			<div class="container">
				<div class="row justify-content-center">
					<div class="col-lg-7"></div>
					<div class="col-lg-5 text-center" style="padding-top: 10rem">
						<h1>Register</h1>
						<br>
						<form action="javascript:void(0)" @submit="registerSubmit()">
						  <div class="form-group">
						    <input type="email" class="form-control" id="inputEmail" placeholder="Enter email" v-model="email" required="">
						  </div>
						  <div class="form-group">
						    <input type="text" class="form-control" id="inputFirstname" placeholder="Enter First name" v-model="firstname" required="">
						  </div>
						  <div class="form-group">
						    <input type="text" class="form-control" id="inputLastname" placeholder="Enter Last name" v-model="lastname" required="">
						  </div>
						  <div class="form-group">
						    <input type="password" class="form-control" id="inputPassword" placeholder="Password" v-model="password" required="">
						  </div>
						  <div class="form-group">
						    <input type="password" class="form-control" id="inputConfirmPassword" placeholder="Confirm Password" v-model="confirmpassword" required="">
						  </div>
						  <br>
						  <button type="submit" class="btn btn-danger btn-block">SIGN UP</button>
						</form>
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
				email: "",
				firstname: "",
				lastname: "",
				password: "",
				confirmpassword: ""
			}
		},
		methods: {
			registerSubmit(){
				if (this.password !== this.confirmpassword) {
	                this.$bvToast.toast(`ผิดพลาด`, {
			          title: 'รหัสผ่านไม่ตรงกัน',
			          autoHideDelay: 5000
			        })
	            }else{
	                axios.post('https://winterserver.herokuapp.com/api/user/register',{
	                    firstname: this.firstname,
	                    lastname: this.lastname,
	                    email: this.email,
	                    password: this.password
	                }).then((response)=>{
	                    if(response.data == "SUCCESS|REGISTERED"){
	                        this.$bvToast.toast(`สำเร็จ`, {
					          title: 'ลงทะเบียนแล้วครับ',
					          autoHideDelay: 5000
					        })
	                    }else if(response.data == "ERROR|DUPLICATED"){
	                        this.$bvToast.toast(`ผิดพลาด`, {
					          title: 'อีเมลนี้ถูกใช้งานแล้วครับ',
					          autoHideDelay: 5000
					        })
	                    }
	                })
	            }
			}
		}
	};
</script>
<style scoped>
	#register{
		height: 100vh;
		background-image: url(../assets/registerbg2.png); 
		background-repeat: no-repeat;
		background-size: 50% auto;
	}
	button{
		font-weight: bold;
		border-radius: 0px;
	}
	input{
		border-radius: 0px;
	}
</style>