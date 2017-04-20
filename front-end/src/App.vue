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
import axios from 'axios';
import CubeSpin from 'vue-loading-spinner/src/components/Circle';

export default {
  name: 'app',
  components: {
    MyMap,
    AddressSearch,
    CubeSpin
  },
  data () {
    return {
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
  beforeMount() {
    this.showCrossfits();
    // this.findRealEstate({
    //   minPrice: 50000,
    //   maxPrice: 200000,
    //   bounds: this.currentBounds
    // })
  },
  
  methods: {
    showCrossfits() {
      axios.get('/crossfits').then(response => {
        // save response as this.crossFitGeoJson;
        this.crossFitGeoJson = response.data;
      })
      .catch(e => {
        this.errors.push(e);
      })
    },
    findRealEstate(obj) {
      this.showLoader = true;
      // get houses for sale
      axios.post('/zoopla', obj).then(response => {
        this.propertyLength = response.data.features.length;
        this.realEstateGeoJson = response.data;
        this.showLoader = false;
      })
      .catch(e => {
        this.errors.push(e)
      });
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