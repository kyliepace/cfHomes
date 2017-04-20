<template>
	<div>
		<select v-model='minPrice'>
			<option>Min Price</option>
			<option>0</option>
			<option selected value='50000'>50,000</option>
			<option>100,000</option>
		</select>
		<select v-model='maxPrice'>
			<option>Max Price</option>
			<option>100,000</option>
			<option selected value='250000'>250,000</option>
			<option>1,000,000</option>
		</select>

		<button @click='onClick' @enter='onClick'>Update Prices</button>
	</div>
</template>

<script>
	export default {
		name: 'AddressSearch',
		data () {
			return {
				minPrice: this.obj.minPrice,
				maxPrice: this.obj.maxPrice,
				bounds: this.obj.bounds
			}
		},
		props: ['handleClick', 'obj'],
		methods: {
			onClick() {
				console.log(this.minPrice);
				this.handleClick({
					minPrice: this.minPrice,
					maxPrice: this.maxPrice,
					bounds: this.bounds
				});
			}
		}
	}
</script>

<style scoped>
input{
	padding: 5px;
}
</style>