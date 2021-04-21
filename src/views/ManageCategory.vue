<template>
  <div>
  	<mcategory-component></mcategory-component>
  </div>
</template>

<script>
import ManageCategory from '@/components/ManageCategory.vue'
export default {
  name: 'Home',
  components: {
  	'mcategory-component': ManageCategory,
  }
}
</script>
