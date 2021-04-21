<template>
	<div>
		<cart-component></cart-component>
	</div>
</template>
<script>
	import CartComponent from '@/components/CartComponent.vue'
	export default{
		components: {
			"cart-component": CartComponent
		}
	};
</script>