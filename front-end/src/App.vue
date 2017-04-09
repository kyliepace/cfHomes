<template>
  <div id="main">
    <h3>Crossfit Homes</h3>
    <AddressSearch :geocode="city"></AddressSearch>
    <MyMap :cfGeoJson="crossFitGeoJson" :reGeoJson="realEstateGeoJson"></MyMap>
  </div>
</template>

<script>
import MyMap from './components/MyMap'
import AddressSearch from './components/AddressSearch'
import cfData from './assets/UKCrossfits.json'; 
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
      affiliateList: cfData,
      crossFitGeoJson: {
        "type": "FeatureCollection",
        "features": []
      },
      realEstateGeoJson: {
        'type' : 'FeatureCollection',
        'features' : []
      }
    }
  },
  beforeMount() {
    this.makeGeoJson(this.affiliateList.affiliates);
    this.findRealEstate();
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
          that.crossFitGeoJson.features.push(feature);
        }
      }
    },
    findRealEstate() {
      // get houses for sale
      axios.get(`http://api.zoopla.co.uk/api/v1/property_listings.js?api_key=24hmsrwtvhzeemqd7gfk3qam&country=England`)
        .then(response => {
          // JSON responses are automatically parsed.
          this.posts = response.data
          console.log(response.data[0]);
          for (var j = 0; j < response.data.length; j ++) {
            var feature = {
              'type' : 'Feature',
              'geometry' : {
                'type' : 'Point',
                'coordinates' : []
              },
              'properties' : {

              }
            }
          };
        })
        .then(

        )
        .catch(e => {
          this.errors.push(e)
        })
    }
  },
  computed: {
    filteredRealEstate () {
      // filter real estate results by crossfits
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