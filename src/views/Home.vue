<template>
  <div>
  	<header-component></header-component>
  	<shop-component></shop-component>
  	<category-component></category-component>
  </div>
</template>

<script>
import HeaderComponent from '@/components/HeaderComponent.vue'
import ShopComponent from '@/components/ShopComponent.vue';
import CategoryComponent from '@/components/CategoryComponent.vue';
export default {
  name: 'Home',
  components: {
  	'header-component': HeaderComponent,
  	'shop-component': ShopComponent,
  	'category-component': CategoryComponent
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
