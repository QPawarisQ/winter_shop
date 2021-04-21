<template>
	<div>
		<account-component></account-component>
	</div>
</template>
<script>
	import AccountComponent from '@/components/AccountComponent.vue'
	export default{
		components: {
			"account-component": AccountComponent
		}
	};
</script>