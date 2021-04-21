<template>
  <nav id="navbar" class="navbar navbar-expand-md navbar-light fixed-top" style="z-index: 9999">
    <div class="container">
      <!-- Brand -->
      <a class="navbar-brand" href="javascript:void(0)" @click="homePage()" style="font-size: 2rem"><b>{{ title }}</b></a>

      <!-- Toggler/collapsibe Button -->
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
        <span class="navbar-toggler-icon"></span>
      </button>

      <!-- Navbar links -->
      <div class="collapse navbar-collapse" id="collapsibleNavbar" v-if="user.email != '' && user.role == 0">
        <ul class="navbar-nav ml-auto mr-sm-2">
          <li class="nav-item">
            <a class="nav-link" href="javascript:void(0)" style="font-size: 1.2rem" @click="cartPage()"><b>Cart</b></a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="javascript:void(0)" style="font-size: 1.2rem" @click="accountPage()"><b>Account</b></a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="javascript:void(0)" style="font-size: 1.2rem" @click="logout()"><b>Log Out </b></a>
          </li>
        </ul>
      </div>

      <!-- Navbar links -->
      <div class="collapse navbar-collapse" id="collapsibleNavbar" v-else-if="user.email != '' && user.role == 1">
        <ul class="navbar-nav ml-auto mr-sm-2">
          <li class="nav-item">
            <a class="nav-link" href="javascript:void(0)" style="font-size: 1.2rem" @click="mcatPage()"><b>Categories</b></a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="javascript:void(0)" style="font-size: 1.2rem" @click="mProductPage()"><b>Products </b></a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="javascript:void(0)" style="font-size: 1.2rem" @click="logout()"><b>Log Out </b></a>
          </li>
        </ul>
      </div>

      <!-- Navbar links -->
      <div class="collapse navbar-collapse" id="collapsibleNavbar" v-else>
        <ul class="navbar-nav ml-auto mr-sm-2">
          <li class="nav-item">
            <a class="nav-link" href="javascript:void(0)" @click="loginPage()" style="font-size: 1.2rem"><b>{{ login }}</b></a>
          </li>
        </ul>
        <form class="form-inline">
          <button class="btn btn-dark" type="button" style="font-size: 1.2rem" href="javascript:void(0)" @click="registerPage()"><b>{{ signup }}</b></button>
        </form>
      </div>
    </div>
  </nav>
</template>
<script>
  window.onscroll = function() {scrollFunction()};
  function scrollFunction() {
    if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
      document.getElementById("navbar").style.backgroundColor = "#f5f5f5";
      document.getElementById("navbar").style.transition = "0.3s";
    } else {
      document.getElementById("navbar").style.backgroundColor = "transparent";
      document.getElementById("navbar").style.transition = "0.3s";
    }
  }
  export default{
    data(){
      return{
        title: "WIN*TER",
        login: "LOGIN",
        signup: "SIGN UP",
        user: {
          email: "",
          role: ""
        }
      }
    },
    methods: {
      homePage(){
        this.$router.push('/')
      },
      loginPage(){
        this.$router.push('/login')
      },
      registerPage(){
        this.$router.push('/register')
      },
      accountPage(){
        this.$router.push('/account')
      },
      cartPage(){
        this.$router.push('/cart')
      },
      mcatPage(){
        this.$router.push('/mcat')
      },
      mProductPage(){
        this.$router.push('/mproduct')
      },
      getInfo(){
        if(localStorage.getItem('email') != null && localStorage.getItem('role') != null){
          this.user.email = localStorage.getItem('email')
          this.user.role = localStorage.getItem('role')
        }
      },
      logout(){
        localStorage.removeItem('user_id');
        localStorage.removeItem('email');
        localStorage.removeItem('role');
        return window.location.href = ""
      }
    },
    mounted(){
      this.getInfo()
    }
  };
</script>