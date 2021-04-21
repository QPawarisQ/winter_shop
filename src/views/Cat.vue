<template>
  <div>
  	<header-component></header-component>
  	<cat-component :catId="$route.params.catId"></cat-component>
  </div>
</template>

<script>
import HeaderComponent from '@/components/HeaderComponent.vue'
import CatComponent from '@/components/CatComponent.vue';
export default {
  name: 'Home',
  components: {
  	'header-component': HeaderComponent,
  	'cat-component': CatComponent,
  },
  methods: {
    checkUser(){
      if(localStorage.getItem("role") == 1){
        return window.location.href = "/#/backend"
      }
    }
  },
  mounted() {
    this.checkUser()
  }
};
</script>
