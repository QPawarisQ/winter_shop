<template>
  <div>
  	<mproduct-component></mproduct-component>
  </div>
</template>

<script>
import ManageProduct from '@/components/ManageProduct.vue'
export default {
  name: 'Home',
  components: {
  	'mproduct-component': ManageProduct,
  }
}
</script>
