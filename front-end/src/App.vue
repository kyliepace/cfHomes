<template>
  <div id="main">
    <h3>Crossfit Homes</h3>
    <cube-spin v-if='showLoader' id='loading'></cube-spin>
    <p v-if='propertyLength > 0'>{{propertyLength}} results</p>
    <p v-else >{{instructions}}</p>
    <AddressSearch id='searchForm' :handleClick='findRealEstate' :obj='searchObject' @submit='findRealEstate'></AddressSearch>
    <MyMap :cfGeoJson="crossFitGeoJson" :reGeoJson="realEstateGeoJson"></MyMap>
  </div>
</template>

<script>
import MyMap from './components/MyMap'
import AddressSearch from './components/AddressSearch'
import CubeSpin from 'vue-loading-spinner/src/components/Circle';
import getCrossfits from './functions/getCrossfits';
import getHouses from './functions/getHouses';

export default {
  name: 'app',
  components: {
    MyMap,
    AddressSearch,
    CubeSpin
  },
  data () {
    return {
      errors: [],
      instructions: 'Find houses for sale near a crossfit',
      crossFitGeoJson: '',
      realEstateGeoJson: '',
      showLoader: false,
      propertyLength: '',
      searchObject: {
        minPrice: 50000,
        maxPrice: 250000,
        bounds: [49.97, 58.5, -8.05, 1.72] //lat min, lat max, lon min, lon max
      }
    }
  },
  async beforeMount() {
    await this.getCrossfits();
    await this.findRealEstate({
      minPrice: this.searchObject.minPrice,
      maxPrice: this.searchObject.maxPrice,
      bounds: this.searchObject.bounds
    })
  },
  
  methods: {
    async getCrossfits() {
      try{
        this.crossFitGeoJson = await getCrossfits();
      }
      catch(err){
        console.log(err.message)
        this.errors.push(err);
      }
    },
    async findRealEstate(obj) {
      this.showLoader = true;
      try{
        // get houses for sale
        this.realEstateGeoJson = await getHouses(obj);
        this.propertyLength = this.realEstateGeoJson.length;
        this.showLoader = false;
      }
      catch(err){
        this.errors.push(err)
      }
    }
  }
}
</script>

<style>
#main {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
#loading{
  position: absolute;
  top: 150px;
  right: 51%;
  left: 49%;
}
#searchForm{
  margin: 70px auto 40px;
}
</style>