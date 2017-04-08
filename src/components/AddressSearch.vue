<template>
	<div>
		<input v-model= 'address' placeholder='city'>
		<button v-on:click='findCity'>Search</button>
		<p>{{geocode}}</p>
	</div>
</template>

<script>
	export default {
		name: 'AddressSearch',
		data () {
			return {
				address: ''
			}
		},
		props: ['geocode'],
		methods: {
			findCity: function() {
				var city = this.address;
				
				this.$parent.findCity(city);
				// send this.address to google

				// send coordinates to App so that App compares to crossfit coordinates
			}
		}
	}
</script>