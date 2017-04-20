<template>
  <div id="main">
    <h3>Crossfit Homes</h3>
    <!-- <AddressSearch :geocode="city"></AddressSearch> -->
    <MyMap :cfGeoJson="crossFitGeoJson" :reGeoJson="realEstateGeoJson"></MyMap>
  </div>
</template>

<script>
import MyMap from './components/MyMap'
import AddressSearch from './components/AddressSearch'
import axios from 'axios';

export default {
  name: 'app',
  components: {
    MyMap,
    AddressSearch
  },
  data () {
    return {
      city: 'Find houses for sale near a crossfit',
      crossFitGeoJson: '',
      realEstateGeoJson: ''
    }
  },
  beforeMount() {
    this.showCrossfits();
    this.findRealEstate('England');
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
    findRealEstate(string) {
      // get houses for sale
      axios.get('/zoopla', {
        country: string
      }).then(response => {
        console.log(response.data);
        this.realEstateGeoJson = response.data;
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
</style>