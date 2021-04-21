<template>
  <div>
  	<register-component></register-component>
  </div>
</template>

<script>
import RegisterComponent from '@/components/RegisterComponent.vue'
export default {
  name: 'Register',
  components: {
  	'register-component': RegisterComponent,
  }
}
</script>
