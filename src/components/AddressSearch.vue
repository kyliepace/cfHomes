<template>
	<div>
		<input v-model= 'address' placeholder='city'>
		<p>{{address}}</p>
	</div>
</template>

<script>
	export default {
		name: 'AddressSearch',
		data () {
			return {
				address: ''
			}
		}
	}
</script>