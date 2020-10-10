<template>
  <div id="main">
    <h3>Crossfit Homes</h3>
    <p v-if='showLoader' id='loading' />

    <!-- <cube-spin v-if='showLoader' id='loading'></cube-spin> -->
    <p v-if='propertyLength > 0'>{{propertyLength}} results</p>
    <p v-else >{{instructions}}</p>
    <!-- <AddressSearch id='searchForm' :handleClick='findVenues' :obj='searchObject' @submit='findRealEstate'/> -->
    <MyMap :cfGeoJson='crossFitGeoJson' :reGeoJson='locationGeoJson' :handleMove='findVenuesByCenter'/>
  </div>
</template>

<script>
import CubeSpin from 'vue-loading-spinner/dist/vue-loading-spinner';
import MyMap from '../components/MyMap'
import AddressSearch from '../components/AddressSearch'
import getCrossfits from '../functions/getCrossfits';
import getHouses from '../functions/getHouses';

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
      locationGeoJson: '',
      showLoader: false,
      propertyLength: '',
    }
  },

  async mounted() {
    // get crossfits on mount
    await this.getCrossfits();
  },
  
  methods: {
    findVenuesByCenter(newCenter){
      const center = `${newCenter.lat},${newCenter.lng}`;
      return this.findVenues({center})
    },

    async getCrossfits() {
      try{
        this.crossFitGeoJson = await getCrossfits();
        console.log('got crossfits: ', this.crossFitGeoJson)
      }
      catch(err){
        console.log(err.message)
        this.errors.push(err);
      }
    },

    /*
    * search venues from foursquare
    */
    async findVenues(obj) {
      if (!obj){ return; }
      this.showLoader = true;
      try{
        // get locations
        this.locationGeoJson = await getHouses(obj);
        this.propertyLength = this.locationGeoJson.length;
        this.showLoader = false;
      }
      catch(err){
        console.log(err.message)
        this.errors.push(err)
        this.showLoader = false;
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