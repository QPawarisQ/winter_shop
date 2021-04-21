<template>
	<div>
		<order-component></order-component>
	</div>
</template>
<script>
	import OrderComponent from '@/components/OrderComponent.vue'
	export default{
		components: {
			"order-component": OrderComponent
		}
	};
</script>