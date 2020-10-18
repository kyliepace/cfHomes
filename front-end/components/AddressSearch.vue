<template>
	<div>
		<select v-model='minPrice'>
			<option>Min Price</option>
			<option value='0'>0</option>
			<option selected value='50000'>50,000</option>
			<option value='100000'>100,000</option>
		</select>
		<select v-model='maxPrice'>
			<option >Max Price</option>
			<option value='100000'>100,000</option>
			<option selected value='250000'>250,000</option>
			<option value='1000000'>1,000,000</option>
		</select>

		<button @click='onClick' @enter='onClick'>Update Prices</button>
	</div>
</template>

<script>
	export default {
		name: 'AddressSearch',
		data () {
			return {
				categoryId: []
			}
		},
		props: ['handleClick', 'obj'],
		methods: {
			onClick() {
				console.log(this.minPrice);
				this.handleClick({
					categoryId: this.categoryId
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