<template>
	<div>
		<section id="login">
			<br>
			<div class="container">
				<div class="row justify-content-center">
					<div class="col-lg-7"></div>
					<div class="col-lg-5 text-center" style="padding-top: 15rem">
						<b-alert
					      :show="dismissCountDown"
					      dismissible
					      variant="warning"
					      @dismissed="dismissCountDown=0"
					      @dismiss-count-down="countDownChanged"
					    >
					      <p class="text-left">{{ alert.text }} ,Changing Page in {{ dismissCountDown }} seconds...</p>
					      <b-progress
					        variant="warning"
					        :max="dismissSecs"
					        :value="dismissCountDown"
					        height="4px"
					      ></b-progress>
					    </b-alert>
						<h1 style="font-weight: bold;color: #000">Log In</h1>
						<br>
						<form action="javascript:void(0)" @submit="loginSubmit()">
						  <div class="form-group">
						    <input type="email" class="form-control" id="inputEmail" placeholder="Enter email" v-model="email" required="">
						  </div>
						  <div class="form-group">
						    <input type="password" class="form-control" id="inputPassword" placeholder="Password" v-model="password" required="">
						  </div>
						  <br>
						  <button type="submit" class="btn btn-danger btn-block">Log In</button>
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
				password: "",
				alert: {
					text: ""
				},
		        dismissSecs: 2,
		        dismissCountDown: 0,
		        showDismissibleAlert: false
			}
		},
		methods: {
			loginSubmit(){
				axios.post('https://winterserver.herokuapp.com/api/user/login',{
	                email: this.email,
	                password: this.password
	            }).then((response)=>{
	                if(response.data == "ERROR|WRONGPASSWORD"){
	                    this.alert.text = "Wrong Password"
	                	this.showAlert()
	                }else{
	                    for (let index = 0; index < response.data.length; index++) {
	                        localStorage.setItem('user_id', response.data[index].id);
	                        localStorage.setItem('email', response.data[index].email);
	                        localStorage.setItem('role', response.data[index].role);
	                    }
	                    this.alert.text = "Success"
	                	this.showAlert()
	                	if(localStorage.getItem('role') == 1){
		                    setTimeout(()=>{
		                        return window.location.href = ""
		                    },2000)
	                	}else{
		                    setTimeout(()=>{
		                        return window.location.href = ""
		                    },2000)
	                	}
	                }
	            })
			},
			countDownChanged(dismissCountDown) {
				this.dismissCountDown = dismissCountDown
			},
			showAlert() {
				this.dismissCountDown = this.dismissSecs
			}
		}
	};
</script>
<style scoped>
	#login{
		height: 100vh;
		background-image: url(../assets/loginbg2.png); 
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