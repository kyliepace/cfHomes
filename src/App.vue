<template>
  <div id="main">
    <h3>Crossfit Homes</h3>
    <AddressSearch :geocode="city"></AddressSearch>
    <MyMap :geoJson="geoJson"></MyMap>
  </div>
</template>

<script>
import MyMap from './components/MyMap'
import AddressSearch from './components/AddressSearch'
import cfData from './assets/UKCrossfits.json'; 

export default {
  name: 'app',
  components: {
    MyMap,
    AddressSearch
  },
  data () {
    return {
      city: 'Find houses for sale near a crossfit',
      affiliateList: cfData,
      geoJson: {
        "type": "FeatureCollection",
        "features": []
      }
    }
  },
  beforeMount() {
    this.makeGeoJson(this.affiliateList.affiliates);
  },
  methods: {
    makeGeoJson(arr) {
      var that = this;

      for(var i = 0; i < arr.length; i ++){
        if(arr[i].hasOwnProperty('latlon')){
          var latlonArr = arr[i].latlon.split(',');
          var feature = {
            "type": "Feature",
            "geometry" : {
              "type" : "Point",
              "coordinates" : [parseFloat(latlonArr[1]), parseFloat(latlonArr[0])]
            },
            "properties" : {
              "name" : arr[i].name,
              "website" : arr[i].website
            }
          };
          that.geoJson.features.push(feature);
        }
      }
    },
    findCity(city) {
   
      console.log('find coordinates for '+city);
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