<template>
	<div>
		<input v-model= 'county' placeholder='city'>
	
		<button v-on:click='findCounty'>Search</button>
		<p>{{geocode}}</p>
	</div>
</template>

<script>
	export default {
		name: 'AddressSearch',
		data () {
			return {
				county: ''
			}
		},
		props: ['geocode'],
		methods: {
			findCounty: function() {
				var county = this.address;
				// send this.address to google

				// send coordinates to App so that App compares to crossfit coordinates
				//this.$parent.findRealEstate(county);
			}
		}
	}
</script>