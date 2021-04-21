<template>
  <div>
  	<backend-component></backend-component>
  </div>
</template>

<script>
import BackendComponent from '@/components/BackendComponent.vue'
export default {
  name: 'Home',
  components: {
  	'backend-component': BackendComponent,
  }
}
</script>
