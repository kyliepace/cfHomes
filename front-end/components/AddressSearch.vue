<template>
	<div>
    <select v-model='categoryId' multiple>
			<option disabled>Categories</option>
      <option value='4bf58dd8d48988d114951735' selected>Bookstore</option>
      <option value='4bf58dd8d48988d1f9941735' selected>Snacks</option>
			<option value='4d4b7104d754a06370d81259'>Arts & Entertainment</option>
			<option value='4d4b7105d754a06374d81259'>Food</option>
      <option value='4bf58dd8d48988d10a951735'>Bank</option>
      <option value='4bf58dd8d48988d10d951735'>Record Shop</option>
      <option value='4bf58dd8d48988d1ed941735'>Spa</option>
		</select>

    <input v-model.number="distance" type="number">		

		<select v-model='units'>
			<option selected disabled>Units</option>
			<option value='miles'>miles</option>
			<option value='kilometers'>kilometers</option>
		</select>

		<button @click='onClick' @enter='onClick'>Search</button>
	</div>
</template>

<script>
	export default {
		name: 'AddressSearch',
		data () {
			return {
        distance: 10,
        units: 'miles',
				categoryId: ['4bf58dd8d48988d114951735', '4bf58dd8d48988d1f9941735']
			}
		},
		props: ['handleClick'],
		methods: {
			onClick() {
				this.handleClick({
          categoryId: this.categoryId,
          radiusOptions: {
            distance: this.distance,
            units: this.units
          }
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