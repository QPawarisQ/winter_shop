<template>
  <div>
  	<product-component :productId="$route.params.productId"></product-component>
  </div>
</template>

<script>
import ProductComponent from '@/components/ProductComponent.vue';
export default {
  name: 'Product',
  components: {
  	'product-component': ProductComponent
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
