<template>
  <div>
  	<login-component></login-component>
  </div>
</template>

<script>
import LoginComponent from '@/components/LoginComponent.vue'
export default {
  name: 'Login',
  components: {
  	'login-component': LoginComponent,
  }
}
</script>
