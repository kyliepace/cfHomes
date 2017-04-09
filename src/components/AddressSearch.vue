<template>
	<div>
		<input v-model= 'address' placeholder='city'>
		<button v-on:click='findCounty'>Search</button>
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
			findCounty: function() {
				var county = this.address;
				// send this.address to google

				// send coordinates to App so that App compares to crossfit coordinates
				//this.$parent.findRealEstate(coords);
			}
		}
	}
</script>